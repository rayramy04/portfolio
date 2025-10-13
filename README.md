# Portfolio Website Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D15.0.0-brightgreen)](https://nodejs.org/)

**[🇯🇵 日本語版 / Japanese](README.ja.md)**

---

A clean, responsive, and **bilingual** portfolio template built with vanilla HTML, CSS, and JavaScript. Free to fork, customize, and deploy.

**[🌟 Live Demo](https://rayramy04.github.io/portfolio/)** | **[📝 Changelog](CHANGELOG.md)**

![Portfolio Preview](assets/og-image.jpg)

## Features

- **Bilingual** - Full English/Japanese support with localStorage
- **Data-driven** - Edit content via JSON-like JavaScript files
- **Responsive** - Mobile-first design, works on all devices
- **Zero Dependencies** - Pure HTML/CSS/JS, no build step required
- **SEO Optimized** - Meta tags, sitemap, structured data
- **Customizable** - Easy color themes and content updates
- **Fork-friendly** - Merge strategy protects your customizations

## Quick Start

```bash
# 1. Fork this repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/portfolio.git
cd portfolio

# 3. Edit your content
vim data/seo-config.js    # Your name, URLs, meta tags
vim data/common.js        # Social links, navigation
vim data/about.js         # Your story and values
vim data/cv.js            # Experience and skills
vim data/projects.js      # Your projects

# 4. Regenerate HTML pages
node generate-pages.js

# 5. Test locally
python -m http.server 8000
# Open http://localhost:8000

# 6. Deploy to GitHub Pages
git add . && git commit -m "Update portfolio content" && git push
```

## Customization

### Essential Files to Edit

| File | Purpose |
|------|---------|
| `data/seo-config.js` | Name, URLs, meta descriptions |
| `data/common.js` | Language settings, social links |
| `data/about.js` | Personal story and values |
| `data/cv.js` | Work experience, skills, achievements |
| `data/projects.js` | Your projects |
| `css/palette.css` | Brand colors |
| `assets/**` | Replace with your images |
| `resume/**` | Add `resume-en.pdf` and `resume-ja.pdf` (optional) |

### Bilingual Content Format

All data files support bilingual objects:

```javascript
{
    title: {
        en: "Software Engineer",
        ja: "ソフトウェアエンジニア"
    },
    description: {
        en: "Built scalable web applications",
        ja: "スケーラブルなWebアプリケーションを構築"
    }
}
```

### Change Colors

Edit `css/palette.css`:

```css
:root {
  --color-primary: #059669;        /* Your brand color */
  --color-primary-light: #34d399;
  --color-primary-dark: #047857;
}
```

### Set Default Language

Edit `data/common.js`:

```javascript
lang: {
    current: 'en',  // 'en' or 'ja'
    available: ['en', 'ja']
}
```

## Fork & Update Workflow

This template uses `.gitattributes` with `merge=ours` strategy to protect your content:

**Protected** (won't be overwritten):
- `data/**` - Your content
- `css/palette.css` - Your colors
- `assets/**` - Your images
- `resume/**` - Your resume files

**Synced** (template updates):
- `generate-pages.js`, `template-base.html`, `js/**`, `css/style.css`

**To sync template updates:**
```bash
# On GitHub: Click "Sync fork" button
# Or manually:
git remote add upstream https://github.com/rayramy04/portfolio.git
git fetch upstream
git merge upstream/main

# IMPORTANT: Regenerate HTML pages after merging
node generate-pages.js
```

## Project Structure

```
portfolio/
├── data/              # ← Edit these for your content
│   ├── seo-config.js
│   ├── common.js
│   ├── about.js
│   ├── cv.js
│   └── projects.js
├── assets/            # ← Your images
├── css/
│   └── palette.css    # ← Your colors
├── resume/            # ← resume-en.pdf, resume-ja.pdf
├── generate-pages.js  # ← Run to regenerate HTML
└── *.html             # Generated pages
```

## Deployment

### GitHub Pages

1. Push to GitHub
2. Go to Settings → Pages
3. Set source to `main` branch → Save
4. Update `baseUrl` in `data/seo-config.js` with your GitHub Pages URL

Works on any static hosting (Netlify, Vercel, Cloudflare Pages, etc.).

## SEO Settings

Control search engine visibility with `robots.txt`:

**Public** (default):
```txt
User-agent: *
Allow: /
```

**Private** (direct link only):
```txt
User-agent: *
Disallow: /
```

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Test with both English and Japanese content
4. Submit a pull request

## License

MIT License - Free for personal and commercial use. See [LICENSE](LICENSE) for details.

## Credits

- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography
- [Particles.js](https://vincentgarreau.com/particles.js/) - Background animations

---

**Version**: 1.3 | **Requires**: Node.js 15.0+
