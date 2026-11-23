#!/bin/bash
# ==========================================
# TEMPLATE SYNC SCRIPT
# ==========================================
# Pulls updates from the upstream portfolio template into a fork while
# keeping YOUR content: the files marked `merge=ours` in .gitattributes
# (data/, assets/, resume/, colors, generated pages, robots.txt, ...)
# always end up exactly as they are in your fork. Everything else
# (generator, templates, js/, css/style.css, docs, ...) takes the upstream version.
#
# Why not rely on `merge=ours` alone? Git only uses it when BOTH sides changed
# a file. A protected file that only upstream changed would be overwritten.
# So after merging, this script restores every protected path from your side,
# regenerates the pages, and commits.
#
# Usage: ./sync-template.sh
# Override the upstream for testing: UPSTREAM_REPO=<url or path> ./sync-template.sh

set -e  # Exit on error
set -o pipefail  # A failing command inside a pipeline fails the script too

UPSTREAM_REPO="${UPSTREAM_REPO:-https://github.com/rayramy04/portfolio.git}"
UPSTREAM_NAME="template-upstream"

# Normalize a git URL to "host/owner/repo" so https, ssh and scp-style forms compare equal
normalize_repo() {
    printf '%s' "$1" | sed -E 's#^[a-zA-Z][a-zA-Z0-9+.-]*://##; s#^[^@/]+@##; s#:#/#; s#/+$##; s#\.git$##; s#/+$##' | tr '[:upper:]' '[:lower:]'
}

echo "🔄 Portfolio Template Sync"
echo "=========================="
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not a git repository"
    exit 1
fi

# Always work from the repository root (the protected paths are relative to it)
cd "$(git rev-parse --show-toplevel)"

# The upstream template itself has nothing to sync from
ORIGIN_URL=$(git remote get-url origin 2>/dev/null || true)
if [ -n "$ORIGIN_URL" ] && [ "$(normalize_repo "$ORIGIN_URL")" = "$(normalize_repo "$UPSTREAM_REPO")" ]; then
    echo "ℹ️  This repository is the upstream template itself."
    echo "   sync-template.sh is for forks. Nothing to sync."
    exit 0
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes."
    echo "   Please commit or stash your changes before syncing."
    echo ""
    git status --short
    exit 1
fi

# `merge=ours` in .gitattributes needs this driver (harmless if already set)
git config --local merge.ours.driver true

# Add upstream remote if it doesn't exist
if ! git remote get-url "${UPSTREAM_NAME}" > /dev/null 2>&1; then
    echo "➕ Adding upstream remote: ${UPSTREAM_REPO}"
    git remote add "${UPSTREAM_NAME}" "${UPSTREAM_REPO}"
else
    echo "✓ Upstream remote already exists"
fi

# Fetch upstream changes
echo "📥 Fetching updates from template..."
git fetch "${UPSTREAM_NAME}"

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

echo ""
echo "📊 Checking for updates..."
BEHIND_COUNT=$(git rev-list --count HEAD.."${UPSTREAM_NAME}/main")

if [ "$BEHIND_COUNT" -eq 0 ]; then
    echo "✅ Already up to date with template!"
    exit 0
fi

echo "📦 Found ${BEHIND_COUNT} update(s) from template"
echo ""
echo "Changes in upstream:"
git log -10 --oneline --decorate --graph HEAD.."${UPSTREAM_NAME}/main"
echo ""

# Confirm merge
REPLY=""
read -p "Do you want to merge these updates? [y/N] " -n 1 -r || true
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Sync cancelled"
    exit 0
fi

# Protected paths = every `merge=ours` pattern in OUR .gitattributes
PATHSPECS=()
while IFS= read -r line; do
    case "$line" in ''|'#'*) continue ;; esac
    case "$line" in *merge=ours*) ;; *) continue ;; esac
    pattern="${line%%[[:space:]]*}"
    pattern="${pattern#/}"
    case "$pattern" in
        */*) PATHSPECS+=(":(glob)${pattern}") ;;
        *)   PATHSPECS+=(":(glob)**/${pattern}") ;;
    esac
done < <(git show HEAD:.gitattributes 2>/dev/null)

if [ "${#PATHSPECS[@]}" -eq 0 ]; then
    echo "❌ No protected paths found in .gitattributes. Refusing to merge."
    exit 1
fi

# Merge without committing, so protected files can be restored first
echo "🔀 Merging template updates..."
git merge --no-commit --no-ff "${UPSTREAM_NAME}/main" > /dev/null 2>&1 || true

if ! git rev-parse -q --verify MERGE_HEAD > /dev/null; then
    echo "❌ The merge could not be started. Check 'git status' and try again."
    exit 1
fi

# Protected files that differ from YOUR version right now: changed, added, deleted or
# unmerged (no rename detection, so a rename shows up as a delete + an add)
list_protected_changes() {
    {
        git -c core.quotePath=false diff --no-renames --name-only HEAD -- "${PATHSPECS[@]}"
        git -c core.quotePath=false diff --name-only --diff-filter=U -- "${PATHSPECS[@]}"
    } | sort -u
}

# Restore protected files to YOUR version (or remove files upstream added there)
echo "🛡️  Restoring your protected files..."
list_protected_changes | while IFS= read -r file; do
    [ -z "$file" ] && continue
    if git cat-file -e "HEAD:${file}" 2>/dev/null; then
        git checkout HEAD -- "$file" || { echo "❌ Could not restore: ${file}"; exit 1; }
    else
        git rm -q -f -- "$file" || { echo "❌ Could not remove: ${file}"; exit 1; }
    fi
done

if [ -n "$(list_protected_changes)" ]; then
    echo "❌ Some protected files could not be restored:"
    list_protected_changes | sed 's/^/   - /'
    echo ""
    echo "💡 Nothing was committed. Undo the merge with:  git merge --abort"
    exit 1
fi

# Conflicts left in non-protected files must be resolved by hand
CONFLICTS=$(git -c core.quotePath=false diff --name-only --diff-filter=U)
if [ -n "$CONFLICTS" ]; then
    echo "❌ Conflicts remain in files that are not protected:"
    echo "$CONFLICTS" | sed 's/^/   - /'
    echo ""
    echo "💡 Resolve them, then run:"
    echo "   node generate-pages.js && git add -A && git commit"
    exit 1
fi

# Rebuild generated pages from your data + the merged template
if [ -f generate-pages.js ]; then
    if ! command -v node > /dev/null 2>&1; then
        echo "❌ Node.js is required to regenerate the pages, but it was not found."
        echo "   Install Node.js, then run:  node generate-pages.js && git add -A && git commit"
        exit 1
    fi
    echo "🏗️  Regenerating pages..."
    node generate-pages.js > /dev/null
    git add -- index.html about.html summary.html cv.html projects.html links.html sitemap.xml
else
    echo "⚠️  generate-pages.js not found; skipped page regeneration."
fi

git commit --no-edit -m "Sync template updates from upstream" > /dev/null

echo "✅ Template sync completed successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Review the changes: git show --stat HEAD"
echo "   2. Test your site locally"
echo "   3. Push changes: git push origin ${CURRENT_BRANCH}"
