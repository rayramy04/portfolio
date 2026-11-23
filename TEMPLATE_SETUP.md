# Template Setup Guide

This portfolio is designed as a **forkable template** with built-in protection for your customizations.

## Design Philosophy

- **Template code** (HTML generator, CSS, JS) syncs from upstream
- **User content** (data files, images, colors) is protected from overwrites

## Protected vs Synced Files

**Kept as yours** (marked `merge=ours` in `.gitattributes`; `./sync-template.sh` restores them after every merge):
- `data/**` - Your portfolio content
- `assets/**`, `resume/**` - Your images and PDFs
- `css/palette.css` - Your brand colors
- `robots.txt`, `sitemap.xml` and the six generated pages (`index`, `about`, `summary`, `cv`, `projects`, `links` `.html`) - rebuilt from your data by `node generate-pages.js`

**Merged from upstream** (everything else; your own edits to these files are kept and merged, and the script stops if they conflict):
- `generate-pages.js`, `template-base.html`, `content/*.html` - HTML generator and page fragments
- `js/**`, `css/style.css` - Core functionality
- `.gitattributes`, docs, workflows (unless you add them to your own `.gitattributes`)

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

Enable GitHub Pages: Settings → Pages → Source: **GitHub Actions**. Every push to `main` runs the checks and tests in `.github/workflows/deploy.yml`, then deploys.

## Syncing Template Updates

```bash
./sync-template.sh
git push
```

The script fetches `template-upstream`, merges with `--no-commit`, restores every protected path from your side, regenerates the pages and commits. It stops and lists the files if a file that is *not* protected conflicts.

Avoid a plain `git merge template-upstream/main`: `merge=ours` alone does not protect a file that only upstream changed. If you do merge by hand, check afterwards:

```bash
git diff ORIG_HEAD HEAD --stat -- data assets resume css/palette.css robots.txt
node generate-pages.js
```

## How It Works

### Protection Mechanism

`.gitattributes` lists the protected paths:

```gitattributes
data/** merge=ours
assets/** merge=ours
resume/** merge=ours
css/palette.css merge=ours
robots.txt merge=ours
sitemap.xml merge=ours
index.html merge=ours
about.html merge=ours
summary.html merge=ours
cv.html merge=ours
projects.html merge=ours
links.html merge=ours
```

- `merge=ours` alone only decides **conflicts** (a file changed on both sides since the last common commit). A protected file that only upstream changed would be overwritten.
- That is why `sync-template.sh` reads this list and, after merging, restores every protected path from your side (and removes protected files that upstream added). Add your own lines (for example your own `README.md` or CI workflow) to protect more.
- Configured via `git config merge.ours.driver true` (the script sets it for you).

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

**The script stopped on a conflict:** it lists files that are not protected. Resolve them, then:
```bash
node generate-pages.js && git add -A && git commit
```

**HTML looks broken:**
```bash
node generate-pages.js
git add -A && git commit -m "Regenerate HTML"
```

**Post-merge hook not running:**
```bash
chmod +x .git/hooks/post-merge
```

### Tests and data rules

`tests/` is template code, so forks receive it on sync, and CI runs it before deploying. Besides the generator and sync checks, `tests/portfolio.test.js` enforces this template's data rules: every project has 1-3 categories from `window.projectCategories` (each category used at least once), periods use `YYYY.MM - YYYY.MM` / `YYYY.MM - Present`, texts have both `en` and `ja`, Japanese award/certification titles use full-width parentheses, and the committed HTML is regenerated. Adjust the data, or the test, if your fork follows different rules.

## For Template Maintainers

### Publishing Updates

1. Modify template files (`generate-pages.js`, `template-base.html`, `content/`, `js/`, `css/style.css`)
2. **Do not** rely on forks taking user files (`data/`, `assets/`, `css/palette.css`): the sync keeps the fork's versions
3. Run the tests: `node --test tests/*.test.js` and `bash tests/sync-template.test.sh` (CI runs them too)
4. Describe the change in the commit message, so forks can read it in `git log` before syncing

### Breaking Changes

For data structure changes:
- Add **optional** new fields
- Use fallbacks in `generate-pages.js` and `js/`
- Explain any manual migration in the commit message

Example:
```javascript
const title = data.newTitle || data.oldTitle || 'Default'
```

## Support

- [README.md](README.md) - Full documentation
- [Issues](https://github.com/rayramy04/portfolio/issues) - Bug reports

---

**Last Updated**: 2026-11-23
