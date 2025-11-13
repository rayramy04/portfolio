#!/bin/bash
# ==========================================
# TEMPLATE SYNC SCRIPT
# ==========================================
# Safely syncs updates from the upstream portfolio template
# while preserving your custom content and configurations.
#
# Usage: ./sync-template.sh

set -e  # Exit on error

UPSTREAM_REPO="https://github.com/rayramy04/portfolio.git"
UPSTREAM_NAME="template-upstream"

echo "🔄 Portfolio Template Sync"
echo "=========================="
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not a git repository"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes."
    echo "   Please commit or stash your changes before syncing."
    echo ""
    git status --short
    exit 1
fi

# Add upstream remote if it doesn't exist
if ! git remote | grep -q "^${UPSTREAM_NAME}$"; then
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
git log --oneline --decorate --graph HEAD.."${UPSTREAM_NAME}/main" | head -10
echo ""

# Confirm merge
read -p "Do you want to merge these updates? [y/N] " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Sync cancelled"
    exit 0
fi

# Merge upstream changes
echo "🔀 Merging template updates..."
if git merge "${UPSTREAM_NAME}/main" -m "Sync template updates from upstream"; then
    echo "✅ Template sync completed successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Review the changes: git log -1"
    echo "   2. Test your site locally"
    echo "   3. Push changes: git push origin ${CURRENT_BRANCH}"
else
    echo "❌ Merge failed. Please resolve conflicts manually."
    echo ""
    echo "💡 Tips:"
    echo "   - Check 'git status' for conflicting files"
    echo "   - Your custom data/ files should be protected by .gitattributes"
    echo "   - After resolving conflicts, run: git merge --continue"
    exit 1
fi
