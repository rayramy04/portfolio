# Template Setup Guide

This portfolio is designed as a **forkable template** with built-in protection for your customizations.

## Design Philosophy

- **Template code** (HTML generator, CSS, JS) syncs from upstream
- **User content** (data files, images, colors) is protected from overwrites

## Protected vs Synced Files

**Protected (never overwritten):**
- `data/**` - Your portfolio content
- `assets/**`, `resume/**` - Your images and PDFs
- `css/palette.css` - Your brand colors
- `*.html`, `sitemap.xml` - Generated from your data

**Synced (receives updates):**
- `generate-pages.js`, `template-base.html` - HTML generator
- `js/**`, `css/style.css` - Core functionality
- `.gitattributes` - Merge strategy config

## Quick Start

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR-USERNAME/portfolio.git
cd portfolio
```

### 2. Configure Merge Strategy

```bash
git config --local merge.ours.driver true
cp .github/hooks/post-merge .git/hooks/post-merge
chmod +x .git/hooks/post-merge
```

### 3. Customize Your Content

```bash
vim data/seo-config.js    # Your name, URLs, meta tags
vim data/common.js        # Social links, settings
vim data/about.js         # Your story
vim data/cv.js            # Experience and skills
vim data/projects.js      # Your projects
vim css/palette.css       # Brand colors
```

### 4. Add Your Assets

Replace placeholder images in `assets/` and add resume PDFs to `resume/`.

### 5. Regenerate and Deploy

```bash
node generate-pages.js
git add . && git commit -m "Initial setup" && git push
```

Enable GitHub Pages: Settings → Pages → Source: main branch

## Syncing Template Updates

**Recommended:**
```bash
./sync-template.sh
```

**Manual:**
```bash
git remote add template-upstream https://github.com/rayramy04/portfolio.git
git fetch template-upstream
git merge template-upstream/main
node generate-pages.js  # If post-merge hook not set up
```

## How It Works

### Protection Mechanism

`.gitattributes` defines merge strategies:

```gitattributes
data/** merge=ours
assets/** merge=ours
css/palette.css merge=ours
```

- `merge=ours` = Always keep local version during conflicts
- Configured via `git config merge.ours.driver true`

### Example Sync

**Upstream updates:**
- Bug fixes in `generate-pages.js`
- New features in `js/pages-unified.js`

**Your customizations:**
- Personal info in `data/seo-config.js`
- Projects in `data/projects.js`
- Colors in `css/palette.css`

**Result after sync:**
- You get bug fixes and new features
- Your data and colors remain unchanged
- HTML regenerates with new template + your data

## Troubleshooting

**Merge conflict in protected files:**
```bash
git checkout --ours data/
git add data/
git merge --continue
```

**HTML looks broken:**
```bash
node generate-pages.js
git add *.html && git commit -m "Regenerate HTML"
```

**Post-merge hook not running:**
```bash
chmod +x .git/hooks/post-merge
```

## For Template Maintainers

### Publishing Updates

1. Modify template files (`generate-pages.js`, `js/`, `css/style.css`)
2. **Do not** modify user files (`data/`, `assets/`, `css/palette.css`)
3. Test sync in a fork
4. Document in `CHANGELOG.md`
5. Tag releases: `git tag v1.4.0`

### Breaking Changes

For data structure changes:
- Add **optional** new fields
- Use fallbacks in `generate-pages.js`
- Document migration in `CHANGELOG.md`

Example:
```javascript
const title = data.newTitle || data.oldTitle || 'Default'
```

## Support

- [README.md](README.md) - Full documentation
- [Issues](https://github.com/rayramy04/portfolio/issues) - Bug reports
- [CHANGELOG.md](CHANGELOG.md) - Version history

---

**Version**: 1.3 | **Last Updated**: 2025-11-14
