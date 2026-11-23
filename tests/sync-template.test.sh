#!/bin/bash
# Run: bash tests/sync-template.test.sh
# End-to-end tests for sync-template.sh with throwaway git repos in a temp dir.
# The real repository is never touched.
set -u

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT="$REPO_ROOT/sync-template.sh"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/sync-test.XXXXXX")" || { echo "Could not create a temp directory" >&2; exit 1; }
if [ -z "$WORK" ] || [ ! -d "$WORK" ]; then echo "Could not create a temp directory" >&2; exit 1; fi
trap 'rm -rf "$WORK"' EXIT

export GIT_AUTHOR_NAME=test GIT_AUTHOR_EMAIL=test@example.com
export GIT_COMMITTER_NAME=test GIT_COMMITTER_EMAIL=test@example.com
export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1
# Never touch the real repo, never reach the network or prompt for credentials
unset GIT_DIR GIT_WORK_TREE GIT_INDEX_FILE GIT_OBJECT_DIRECTORY GIT_COMMON_DIR
export GIT_ALLOW_PROTOCOL=file GIT_TERMINAL_PROMPT=0

PASS=0
FAIL=0
pass() { PASS=$((PASS + 1)); echo "  ok    $1"; }
fail() { FAIL=$((FAIL + 1)); echo "  FAIL  $1"; }
check_eq() { if [ "$(cat "$1" 2>/dev/null)" = "$2" ]; then pass "$1 = '$2'"; else fail "$1 = '$(cat "$1" 2>/dev/null)' (expected '$2')"; fi; }
check_absent() { if [ ! -e "$1" ]; then pass "$1 absent"; else fail "$1 should be absent"; fi; }
check_present() { if [ -e "$1" ]; then pass "$1 present"; else fail "$1 should be present"; fi; }
check() { if eval "$2"; then pass "$1"; else fail "$1"; fi; }
mk() { mkdir -p "$(dirname "$1")"; printf '%s\n' "$2" > "$1"; }
merge_commit() { [ "$(git rev-list --parents -n1 HEAD | wc -w | tr -d ' ')" = 3 ]; }
clean_tree() { [ -z "$(git status --porcelain)" ]; }

# Protected list: this repo's .gitattributes plus fork-only lines (a fork that keeps its own README and drops LICENSE)
FORK_ATTRIBUTES="$(cat "$REPO_ROOT/.gitattributes")
README.md merge=ours
LICENSE merge=ours"

new_upstream() {
    rm -rf "$WORK/up"
    git init -q -b main "$WORK/up"
    (
        cd "$WORK/up"
        cp "$REPO_ROOT/.gitattributes" .gitattributes
        mk data/x.js "upstream x"
        mk data/y.js "y: long enough text so git can detect a rename of this file 0123456789"
        mk data/ren.js "ren: long enough text so git can detect a rename of this file abcdefghij"
        mk assets/a.txt "asset: long enough text so git can detect a rename of this file klmnopqrst"
        mk css/palette.css green
        mk css/style.css "style v1"
        mk js/app.js "app v1"
        mk content/page-content.html "content v1"
        mk template-base.html "template v1"
        mk robots.txt allow
        mk README.md "readme v1"
        mk LICENSE "license v1"
        for page in index about summary cv projects links; do mk "$page.html" "$page v1"; done
        mk sitemap.xml "sitemap v1"
        cat > generate-pages.js <<'EOF'
const fs = require('fs');
const read = file => fs.readFileSync(file, 'utf8').trim();
fs.writeFileSync('index.html', `GEN ${read('data/x.js')} | ${read('template-base.html')}\n`);
fs.writeFileSync('sitemap.xml', 'sitemap regenerated\n');
EOF
        git add -A && git commit -qm "upstream v1"
    )
}

# Fork with its own data, colors, robots.txt and README, and without LICENSE
new_fork() {
    git clone -q "$WORK/up" "$WORK/$1"
    (
        cd "$WORK/$1"
        git remote set-url origin "https://example.com/someone/$1.git"
        printf '%s\n' "$FORK_ATTRIBUTES" > .gitattributes
        mk data/x.js "fork x"
        mk data/y.js "fork y"
        mk css/palette.css blue
        mk robots.txt disallow
        mk README.md "fork readme"
        git rm -q LICENSE
        cp "$SCRIPT" sync-template.sh
        chmod +x sync-template.sh
        git add -A && git commit -qm "fork customizations"
    )
}

upstream_commit() { (cd "$WORK/up" && eval "$1" && git add -A && git commit -qm "${2:-upstream change}"); }

run_sync() {  # $1 = fork dir, rest = extra env assignments
    local dir="$1"; shift
    (cd "$WORK/$dir" && echo y | env "$@" UPSTREAM_REPO="file://$WORK/up" ./sync-template.sh > "$WORK/$dir.log" 2>&1)
}

echo "1. Protected files keep the fork's version; everything else comes from upstream"
new_upstream; new_fork f1
upstream_commit '
    mk data/x.js "upstream x v2"; mk data/y.js "upstream y v2"; mk data/new.js "upstream new"
    mk css/palette.css green2; mk robots.txt allow2; mk README.md "readme v2"; mk LICENSE "license v2"
    mk css/style.css "style v2"; mk js/app.js "app v2"; mk content/page-content.html "content v2"
    mk template-base.html "template v2"; mk index.html "index upstream"; mk sitemap.xml "sitemap upstream"'
run_sync f1; status=$?
cd "$WORK/f1"
check "script exits 0" "[ $status -eq 0 ]"
check_eq data/x.js "fork x"; check_eq data/y.js "fork y"; check_absent data/new.js
check_eq css/palette.css blue; check_eq robots.txt disallow; check_eq README.md "fork readme"; check_absent LICENSE
check_eq css/style.css "style v2"; check_eq js/app.js "app v2"; check_eq content/page-content.html "content v2"; check_eq template-base.html "template v2"
check_eq index.html "GEN fork x | template v2"; check_eq sitemap.xml "sitemap regenerated"
check "result is a merge commit" merge_commit
check "worktree is clean" clean_tree
check "a second run says up to date" "(echo y | UPSTREAM_REPO=file://$WORK/up ./sync-template.sh 2>&1 | grep -q 'Already up to date')"

echo "2. Upstream renames or deletes protected files"
new_upstream; new_fork f2
upstream_commit 'git mv assets/a.txt assets/b.txt; git mv data/ren.js data/renamed.js; git mv data/y.js data/y2.js; git rm -q robots.txt; mk css/style.css "style v2"'
run_sync f2; status=$?
cd "$WORK/f2"
check "script exits 0" "[ $status -eq 0 ]"
check_present assets/a.txt; check_absent assets/b.txt; check_present data/ren.js; check_absent data/renamed.js
check_eq data/y.js "fork y"; check_absent data/y2.js; check_eq robots.txt disallow; check_eq css/style.css "style v2"
check "result is a merge commit" merge_commit
check "worktree is clean" clean_tree

echo "3. A conflict in an unprotected file stops the script before committing"
new_upstream; new_fork f3
(cd "$WORK/f3" && mk js/app.js "fork app" && git commit -qam "fork edits app")
upstream_commit 'mk js/app.js "upstream app"; mk data/x.js "upstream x v2"'
run_sync f3; status=$?
cd "$WORK/f3"
check "script exits 1" "[ $status -eq 1 ]"
check "the conflict is reported" "grep -q 'js/app.js' '$WORK/f3.log'"
check "merge is left open to resolve" "git rev-parse -q --verify MERGE_HEAD >/dev/null"
check_eq data/x.js "fork x"

echo "4. Running from a subdirectory still protects the files"
new_upstream; new_fork f4
upstream_commit 'mk data/x.js "upstream x v2"; mk data/new.js "upstream new"; mk js/app.js "app v2"'
(cd "$WORK/f4/js" && echo y | UPSTREAM_REPO="file://$WORK/up" bash ../sync-template.sh > "$WORK/f4.log" 2>&1); status=$?
cd "$WORK/f4"
check "script exits 0" "[ $status -eq 0 ]"
check_eq data/x.js "fork x"; check_absent data/new.js; check_eq js/app.js "app v2"; check_eq index.html "GEN fork x | template v1"

echo "5. Non-ASCII file names in protected paths"
new_upstream; new_fork f5
upstream_commit 'mk "assets/新規.png" image; mk "data/日本語.js" data; mk css/style.css "style v2"'
run_sync f5; status=$?
cd "$WORK/f5"
check "script exits 0" "[ $status -eq 0 ]"
check_absent "assets/新規.png"; check_absent "data/日本語.js"; check_eq css/style.css "style v2"

echo "6. Without Node.js the script stops before committing"
new_upstream; new_fork f6
upstream_commit 'mk css/style.css "style v2"'
mkdir -p "$WORK/bin"
for tool in git sed tr sort cat; do ln -sf "$(command -v "$tool")" "$WORK/bin/$tool"; done
(cd "$WORK/f6" && echo y | env PATH="$WORK/bin" UPSTREAM_REPO="file://$WORK/up" /bin/bash ./sync-template.sh > "$WORK/f6.log" 2>&1); status=$?
cd "$WORK/f6"
check "script exits 1" "[ $status -eq 1 ]"
check "the reason is Node.js" "grep -q 'Node.js is required' '$WORK/f6.log'"
check "nothing was committed" "! merge_commit"
check "merge is left open" "git rev-parse -q --verify MERGE_HEAD >/dev/null"

echo "7. Answering no, or closed input, cancels without changes"
new_upstream; new_fork f7
upstream_commit 'mk css/style.css "style v2"'
(cd "$WORK/f7" && UPSTREAM_REPO="file://$WORK/up" ./sync-template.sh < /dev/null > "$WORK/f7.log" 2>&1); status=$?
cd "$WORK/f7"
check "closed input exits 0" "[ $status -eq 0 ]"
check "closed input cancels" "grep -q 'cancelled' '$WORK/f7.log'"
(echo n | UPSTREAM_REPO="file://$WORK/up" ./sync-template.sh > "$WORK/f7n.log" 2>&1); status=$?
check "answer n exits 0" "[ $status -eq 0 ]"
check_eq css/style.css "style v1"
check "worktree is clean" clean_tree

echo "8. Uncommitted changes are refused"
new_upstream; new_fork f8
upstream_commit 'mk css/style.css "style v2"'
(cd "$WORK/f8" && mk data/x.js "dirty" && echo y | UPSTREAM_REPO="file://$WORK/up" ./sync-template.sh > "$WORK/f8.log" 2>&1); status=$?
check "script exits 1" "[ $status -eq 1 ]"
check "the warning is shown" "grep -q 'uncommitted changes' '$WORK/f8.log'"

echo "9. The upstream template itself does nothing"
for origin in https://github.com/rayramy04/portfolio.git git@github.com:rayramy04/portfolio.git \
              ssh://git@github.com/rayramy04/portfolio.git https://github.com/RayRamy04/Portfolio/ https://github.com/rayramy04/portfolio.git/; do
    rm -rf "$WORK/g9"; git clone -q "$WORK/up" "$WORK/g9"
    (cd "$WORK/g9" && git remote set-url origin "$origin" && "$SCRIPT" > "$WORK/g9.log" 2>&1); status=$?
    check "origin $origin is recognized as upstream" "[ $status -eq 0 ] && grep -q 'upstream template itself' '$WORK/g9.log'"
done
eval "$(sed -n '/^normalize_repo() {/,/^}/p' "$SCRIPT")"
check "a different host is not treated as upstream" "[ \"\$(normalize_repo https://gitlab.com/rayramy04/portfolio.git)\" != \"\$(normalize_repo https://github.com/rayramy04/portfolio.git)\" ]"
check "a different repo is not treated as upstream" "[ \"\$(normalize_repo https://github.com/rayramy04/another-portfolio.git)\" != \"\$(normalize_repo https://github.com/rayramy04/portfolio.git)\" ]"

echo ""
echo "passed: $PASS  failed: $FAIL"
[ "$FAIL" -eq 0 ]
