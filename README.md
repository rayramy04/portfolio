# Portfolio Website Template

**[🇯🇵 日本語版はこちら (Japanese README)](README.ja.md)**

---

A clean, responsive portfolio template built with vanilla HTML, CSS, and JavaScript.
**Free to use** - Fork, customize, and make it your own!

**🌟 [Live Demo](https://rayramy04.github.io/portfolio/index.html)** | **📄 [MIT License](LICENSE)**

## 🎯 Perfect For
- Students building their first portfolio
- Developers wanting a clean, professional site
- Anyone needing a fast, customizable portfolio

## ✨ Key Features

- **🔧 Data-driven** - Edit content via simple JavaScript files, no HTML needed
- **🎨 Customizable** - Easy color themes, responsive design
- **📱 Mobile-first** - Looks great on all devices
- **🔍 SEO Optimized** - Structured data and meta tags included
- **🍴 Fork-friendly** - Sync upstream updates without losing your customizations
- **🚀 Zero Dependencies** - Pure HTML/CSS/JS, works anywhere

## 🚀 Quick Start

```bash
# 1. Fork this repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/portfolio.git
cd portfolio

# 3. Edit data files (see "What to Customize" below)
vim data/seo-config.js    # Your name, URLs, meta tags
vim data/about.js         # Your story
vim data/cv.js            # Your experience
vim data/projects.js      # Your projects

# 4. Regenerate HTML pages
node generate-pages.js

# 5. Test locally
python -m http.server 8000  # Open http://localhost:8000

# 6. Deploy to GitHub Pages / Netlify / Vercel
git add . && git commit -m "chore: personalize portfolio" && git push
```

## 🍴 Fork & Sync Workflow

This template is **fork-friendly** - sync upstream updates without losing your customizations.

### How It Works

**Protected files** (yours, won't be overwritten):
- `data/**` - Your content
- `css/palette.css` - Your colors
- `robots.txt` - Your SEO settings
- `assets/**` - Your images

**Auto-synced files** (template logic):
- `generate-pages.js`, `template-base.html`, `css/style.css`, `js/**`

### To Sync Updates

```bash
# Click GitHub's "Sync fork" button - your data stays safe!
```

This is configured via `.gitattributes` with the `merge=ours` strategy.

## 📝 What to Customize

**Edit these** (your content, protected from updates):

| Category | Files | What to Change |
|----------|-------|----------------|
| **Personal Info & SEO** | `data/seo-config.js` | Name, URLs, meta descriptions, social links |
| **Page Content** | `data/*.js` | About, CV, projects, links, homepage |
| **Visual Theme** | `css/palette.css` | Brand colors |
| **Media Assets** | `assets/**` | Profile photos, project images |
| **Search Settings** | `robots.txt` | Public/private visibility (see below) |

**Don't edit these** (template logic, auto-synced):
- `generate-pages.js`, `template-base.html`, `css/style.css`, `js/**`

## 🔍 Search Engine Visibility

Choose whether your portfolio appears in Google/Bing search results:

**Public (default)** - Recommended for most users:
```bash
cp robots.txt.public robots.txt
```

**Private** - Only accessible via direct link:
```bash
cp robots.txt.private robots.txt
```

## 📁 Project Structure

```
portfolio/
├── data/                   # ← Edit these files
│   ├── seo-config.js      #    Name, URLs, meta tags
│   ├── about.js           #    Your story
│   ├── cv.js              #    Experience & skills
│   ├── projects.js        #    Your projects
│   ├── links.js           #    Contact info
│   └── ...
├── assets/                # ← Replace with your images
├── css/
│   └── palette.css        # ← Customize colors here
├── generate-pages.js      # ← Run to regenerate HTML
├── *.html                 # Generated pages
└── ...                    # Template files (don't edit)
```

## 🎨 Customization Examples

### Change Colors

Edit `css/palette.css`:
```css
:root {
  --color-primary: #059669;     /* Change this to your brand color */
  --color-primary-light: #34d399;
  --color-primary-dark: #047857;
}
```

### Add a Project

Edit `data/projects.js`:
```javascript
{
    name: "My New Project",
    description: "Project description",
    categories: ["Web Development", "AI"],
    githubUrl: "https://github.com/username/project",
    image: "assets/projects/my-project.jpg"
}
```

### Add Work Experience

Edit `data/cv.js`:
```javascript
{
    company: "Company Name",
    position: "Job Title",
    period: "2024.01 - Present",
    description: "What you did and achieved"
}
```

All content is managed through JavaScript data files - no HTML editing needed!

## 🚀 Deployment

**GitHub Pages:**
1. Push to GitHub → Settings → Pages → Enable
2. Set source to `main` branch

**Other platforms:** Netlify, Vercel, any static hosting - just upload the files!

💡 Don't forget to update URLs in `data/seo-config.js` after deployment.

## 🐛 Troubleshooting

**Images not showing?** Check file paths in `data/` files match your `assets/` folder.

**Page not updating?** Run `node generate-pages.js` after editing data files.

**Need help?** Open an issue on GitHub.

## 📄 License

MIT License - Free for personal and commercial use.

---

**Template Version**: 1.2
**Requires**: Modern browser with ES6+ and CSS Grid support