# Portfolio Website Template

A clean, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. No build process, no dependencies - just edit data files and deploy.

**🌟 [Live Demo](https://your-username.github.io/portfolio)** | **📖 [日本語版](README.ja.md)**

## ✨ Features

- **Zero Dependencies** - Pure HTML, CSS, JavaScript with no build process
- **Data-driven Architecture** - Easy content updates via JavaScript data files
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **SEO Optimized** - Structured data, meta tags, and technical SEO best practices
- **Performance Focused** - Optimized loading, animations, and resource management
- **Easy Deployment** - Works with any static hosting service

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/portfolio-template.git
cd portfolio-template

# Start local development server (choose one)
python -m http.server 8000
# or
npx http-server .

# Open http://localhost:8000 in your browser
```

### Customization

1. **Update Personal Information**
   - Edit files in `/data/` directory
   - Replace images in `/assets/` directory
   - Customize colors via CSS custom properties

2. **Deploy**
   - Upload files to any static hosting service
   - GitHub Pages, Netlify, Vercel all supported
   - No build process required

## 📁 Project Structure

```
portfolio/
├── index.html              # Homepage
├── about.html              # About page with timeline and interests
├── cv.html                 # CV/Resume with collapsible sections
├── projects.html           # Project showcase
├── links.html              # Contact and social links
├── template-base.html      # Base template for new pages
├── css/
│   └── style.css          # Complete stylesheet
├── js/
│   ├── pages-unified.js   # Centralized page initialization
│   └── utils/             # Utility class library
│       ├── dom-helpers.js    # DOM utilities + PageBase class
│       ├── html-generator.js # Template rendering
│       └── data-populator.js # Data to DOM population
├── data/                   # Content configuration (edit these!)
│   ├── common.js          # Site navigation, social links
│   ├── home.js            # Homepage hero content
│   ├── about.js           # Personal story, timeline, interests
│   ├── cv.js              # Education, experience, skills, awards
│   ├── projects.js        # Project portfolio
│   ├── links.js           # Contact information
│   └── seo-config.js      # SEO structured data
├── assets/                # Images and media files
└── content/               # Static HTML fragments
```

## 🎨 Customization

### Change Colors

Update the CSS custom properties in `css/style.css`:

```css
:root {
  --color-primary: #059669;        /* Main brand color */
  --color-primary-light: #34d399;  /* Hover states */
  --color-primary-dark: #047857;   /* Active states */
}
```

### Add Content

Content is managed via JavaScript data files - no HTML editing required!

**Add a project** (in `data/projects.js`):
```javascript
{
    name: "My New Project",
    description: "Project description here",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/username/project",
    liveUrl: "https://project-demo.com",
    image: "assets/projects/new-project.jpg"
}
```

**Add work experience** (in `data/cv.js` - experience array):
```javascript
{
    company: "Company Name",
    position: "Job Title",
    period: "2024.01 - Present",
    description: "Role description and achievements",
    url: "https://company.com"
}
```

**Update personal info** (in `data/about.js`):
```javascript
window.aboutData = {
    personal: {
        name: "Your Name",
        position: "Your Title",
        description: [
            "First paragraph about yourself",
            "Second paragraph with more details"
        ]
    }
}
```

### Add New Pages

1. **Create HTML file** (copy from `template-base.html`)
2. **Add navigation** in `data/common.js`
3. **Add page handler** in `js/pages-unified.js`
4. **Create data file** in `data/` directory

## 🚀 Deployment

### GitHub Pages

1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch / root directory
4. Access at `https://username.github.io/repository-name`

### Other Platforms

- **Netlify** - Drag and drop the folder
- **Vercel** - Connect GitHub repository  
- **Traditional Hosting** - Upload files via FTP

### Environment Configuration

No environment variables needed. Update URLs in:
- `data/seo-config.js` - Main site URL
- Social media links in `data/common.js` and `data/links.js`

## 🛠️ Browser Support

- **Modern Browsers** - Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **CSS Features** - CSS Grid, Custom Properties, Flexbox
- **JavaScript Features** - ES6 Classes, async/await, Template Literals

## 🐛 Troubleshooting

**Local server not working?**
```bash
# Try alternative servers
python3 -m http.server 8000
# or
php -S localhost:8000
```

**Images not loading?**
- Check file paths in `data/` files
- Ensure images exist in `assets/` directory
- Use relative paths (e.g., `assets/projects/image.jpg`)

## 📄 License

MIT License - Free for personal and commercial use.

## 🤝 Contributing

Contributions welcome! This template is designed for easy customization. Common improvements:

- Additional page templates
- New card types or layouts  
- Enhanced animations
- Additional utility classes
- Accessibility improvements

Please open an issue or submit a pull request.

## 💡 Credits

Built with modern web standards and best practices:
- **CSS Grid & Flexbox** - For layouts
- **CSS Custom Properties** - For theming
- **Font Awesome** - For icons
- **Google Fonts** - For typography
- **Schema.org** - For structured data

---

**Template Version**: 1.0  
**Last Updated**: 2025  
**Supported Browsers**: Modern browsers with ES6+ and CSS Grid support