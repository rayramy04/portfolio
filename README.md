# Portfolio Website Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D15.0.0-brightgreen)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**[🇯🇵 日本語版はこちら (Japanese README)](README.ja.md)**

---

A clean, responsive, **bilingual** portfolio template built with vanilla HTML, CSS, and JavaScript.
**Free to use** - Fork, customize, and make it your own!

**🌟 [Live Demo](https://rayramy04.github.io/portfolio/index.html)** | **📄 [MIT License](LICENSE)**

![Portfolio Preview](assets/og-image.jpg)
*Clean, modern design optimized for all devices with English/Japanese language switching*

## 🎯 Perfect For
- Students building their first portfolio
- Developers wanting a clean, professional site
- International professionals needing bilingual support
- Anyone needing a fast, customizable portfolio

## ✨ Key Features

- **🌐 Bilingual** - Full English/Japanese support with localStorage language switching
- **🔧 Data-driven** - Edit content via simple JavaScript files, no HTML needed
- **🎯 Purposeful Sections** - About (values) vs CV (skills) with clear separation
- **🎨 Customizable** - Easy color themes, responsive design
- **📱 Mobile-first** - Looks great on all devices with optimized mobile menu
- **🔍 SEO Optimized** - Structured data and meta tags included
- **📄 Resume Downloads** - Auto-detects and displays bilingual resume download buttons
- **🍴 Fork-friendly** - Sync upstream updates without losing your customizations
- **🚀 Zero Dependencies** - Pure HTML/CSS/JS, works anywhere

## 📋 Requirements

- **Node.js 15.0.0+** (for running `generate-pages.js`)
- Modern web browser (Chrome 60+, Firefox 60+, Safari 12+, Edge 79+)
- Git (for cloning and version control)

## 🚀 Quick Start

```bash
# 1. Fork this repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/portfolio.git
cd portfolio

# 3. Edit data files (see "What to Customize" below)
vim data/seo-config.js    # Your name, URLs, meta tags
vim data/common.js        # Language settings, social links
vim data/about.js         # Your story and values
vim data/cv.js            # Your experience and skills
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
- `resume/**` - Your resume PDFs
- `content/**` - Generated content HTML

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
| **Language & Common** | `data/common.js` | Default language, social links, navigation |
| **Page Content** | `data/*.js` | About, CV, projects, links, homepage |
| **Visual Theme** | `css/palette.css` | Brand colors |
| **Media Assets** | `assets/**` | Profile photos, project images |
| **Resume Files** | `resume/**` | `resume-ja.pdf`, `resume-en.pdf` (optional) |
| **Search Settings** | `robots.txt` | Public/private visibility (see below) |

**Don't edit these** (template logic, auto-synced):
- `generate-pages.js`, `template-base.html`, `css/style.css`, `js/**`

## 🌐 Bilingual Support

This template includes full English/Japanese language support:

### Language Settings

Edit `data/common.js`:
```javascript
lang: {
    current: 'en', // Default language: 'en' or 'ja'
    available: ['en', 'ja']
}
```

### Adding Bilingual Content

All data files support bilingual objects:
```javascript
{
    title: {
        en: "My Project",
        ja: "私のプロジェクト"
    },
    description: {
        en: "Project description",
        ja: "プロジェクトの説明"
    }
}
```

The template automatically:
- Displays content in the selected language
- Saves language preference to localStorage
- Shows language switcher in navigation

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
│   ├── common.js          #    Language, social links, navigation
│   ├── about.js           #    Your story and values
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

### Add a Bilingual Project

Edit `data/projects.js`:
```javascript
{
    name: {
        en: "My New Project",
        ja: "新しいプロジェクト"
    },
    description: {
        en: "Project description",
        ja: "プロジェクトの説明"
    },
    categories: ["Web Development", "AI"],
    githubUrl: "https://github.com/username/project",
    image: "assets/projects/my-project.jpg"
}
```

### Add CV Experience

Edit `data/cv.js`:
```javascript
{
    company: {
        en: "Company Name Inc.",
        ja: "会社名株式会社"
    },
    position: {
        en: "Software Engineer",
        ja: "ソフトウェアエンジニア"
    },
    period: "2024.01 - Present",
    description: {
        en: "What you did and achieved",
        ja: "担当業務と成果"
    }
}
```

### About vs CV: Purpose Separation

This template separates personal values from professional skills:

**About - My Strengths** (Values & Personality):
- Focus on "who you are" and "what you value"
- Personal philosophy, approach, mindset
- Example: "Problem Solver with Technology", "Embracing Diversity"

**CV - Key Strengths** (Skills & Achievements):
- Focus on "what you can do" and measurable results
- Concrete skills, quantitative achievements
- Example: "Data Science & AI: 5th Place Nationally", "15,000+ YouTube subscribers"

### Add Resume Downloads

Add bilingual resume PDFs to the `resume/` folder:
```bash
mkdir resume
# Place your files:
# - resume-ja.pdf (Japanese)
# - resume-en.pdf (English)
```

Download buttons will automatically appear on the homepage and CV page when files are detected.

### Generate Sitemap

Sitemap is automatically generated from your SEO config:

```bash
node generate-pages.js  # Generates sitemap.xml with correct URLs
```

The sitemap uses `baseUrl` from `data/seo-config.js` and includes all pages with appropriate priorities and change frequencies.

## 🚀 Deployment

**GitHub Pages:**
1. Push to GitHub → Settings → Pages → Enable
2. Set source to `main` branch

**Other platforms:** Netlify, Vercel, any static hosting - just upload the files!

💡 Don't forget to update URLs in `data/seo-config.js` after deployment.

## 🐛 Troubleshooting

**Images not showing?** Check file paths in `data/` files match your `assets/` folder.

**Page not updating?** Run `node generate-pages.js` after editing data files.

**Language not switching?** Clear browser localStorage and refresh.

**Mobile menu not showing HOME?** This was fixed in v1.3 - sync your fork to get the latest fixes.

**Need help?** Open an issue on GitHub.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Note:** This is a template project. When contributing:
- Focus on improving template logic, not personal data
- Ensure changes work with `.gitattributes` merge strategy
- Update documentation if adding new features
- Test with both English and Japanese content

## 📄 License

MIT License - Free for personal and commercial use.

## 🙏 Acknowledgments

This template uses the following open-source resources:

- [Font Awesome](https://fontawesome.com/) - Icon library
- [Google Fonts](https://fonts.google.com/) - Poppins & Inter typefaces
- [Particles.js](https://vincentgarreau.com/particles.js/) - Interactive background animations
- [Schema.org](https://schema.org/) - Structured data standards

---

**Template Version**: 1.3
**Requires**: Node.js 15.0+ | Modern browser with ES6+ and CSS Grid support
**New in 1.3**: Full bilingual support, mobile menu fixes, About/CV purpose separation
