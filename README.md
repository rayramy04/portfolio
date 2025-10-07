# Portfolio Website Template

A clean, responsive portfolio template built with vanilla HTML, CSS, and JavaScript.  
**Free to use** - Fork, customize, and make it your own!

**🌟 [Live Demo](https://rayramy04.github.io/portfolio/index.html)** | **📄 [MIT License](LICENSE)** | **📖 [日本語版](README.ja.md)**

## 🎯 Perfect For
- Students building their first portfolio
- Developers wanting a clean, professional site  
- Anyone needing a fast, customizable portfolio

Features a data-driven architecture for easy content management, responsive design, and SEO optimization. Includes an optional HTML generation script for development convenience. No dependencies or complex build process required.

## ✨ Features

- **Zero Dependencies** - Pure HTML, CSS, JavaScript with no build process
- **Data-driven Architecture** - Easy content updates via JavaScript data files
- **Optional HTML Generation** - Development script for generating HTML files from templates
- **Project Filtering System** - Dynamic category-based project filtering with smooth animations
- **Multiple Category Support** - Projects can belong to multiple categories with flexible filtering
- **Unified Empty State Handling** - Consistent "No items found" display across all sections and pages
- **Profile Image Support** - Automatic image handling with fallback for missing images
- **My Strengths Section** - Dedicated section for showcasing core competencies with highlights
- **Unified Card System** - Consistent card layouts with equal height and reusable styling
- **Responsive Design** - Mobile-first approach with adaptive layouts and optimized typography
- **SEO Optimized** - Structured data, meta tags, and technical SEO best practices
- **Performance Focused** - Optimized loading, animations, and resource management
- **Unified Animation System** - Consistent animation effects across all pages
- **Modular Utility Classes** - Reusable DOM helpers, HTML generators, and data populators
- **Category Classification** - Organized project categorization with visual filtering
- **Easy Deployment** - Works with any static hosting service

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/rayramy04/portfolio.git
cd portfolio

# (Optional) Generate HTML pages from templates
node generate-pages.js

# Start local development server (choose one)
python -m http.server 8000
# or
npx http-server .

# Open http://localhost:8000 in your browser
```

### One-time Setup (Recommended)

**Edit the configuration file once** - all pages will be automatically updated:

```bash
# 1. Edit SEO settings (name, URLs, meta descriptions)
vim data/seo-config.js

# 2. Regenerate all HTML pages
node generate-pages.js
```

That's it! All HTML files are now personalized with your information.

### Customization

1. **Update Personal Information**
   - Edit files in `/data/` directory
   - Replace images in `/assets/` directory
   - Customize colors in `css/palette.css`

2. **Deploy**
   - Upload files to any static hosting service
   - GitHub Pages, Netlify, Vercel all supported
   - No build process required

## 🍴 Fork & Sync Workflow

This template is **fork-friendly** - you can keep your personalized fork in sync with upstream updates without losing your customizations.

### Initial Setup

```bash
# 1. Fork this repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/portfolio.git
cd portfolio

# 3. Customize your data
vim data/seo-config.js  # Edit name, URLs, meta info
vim data/about.js       # Edit about page content
vim data/cv.js          # Edit CV content
vim data/projects.js    # Edit projects
# ... edit other data files

# 4. Replace images
# Replace files in assets/ with your own photos

# 5. Customize colors (optional)
vim css/palette.css

# 6. Regenerate HTML files
node generate-pages.js

# 7. Commit your changes
git add .
git commit -m "chore: personalize portfolio content"
git push
```

### Syncing Updates from Upstream

When the original template gets updates (bug fixes, new features, etc.), sync them to your fork:

```bash
# Use GitHub's "Sync fork" button - your customizations are protected!
```

**Protected files** (won't be overwritten during sync):
- `data/**` - All your personal data
- `css/palette.css` - Your color theme
- `robots.txt` - Your SEO settings
- `assets/**` - Your images

**Will be updated** (template logic):
- `generate-pages.js` - Page generation script
- `template-base.html` - HTML template structure
- `css/style.css` - Common styles
- `js/**` - JavaScript utilities

This is configured via `.gitattributes` with the `merge=ours` strategy.

## 📁 Project Structure

```
portfolio/
├── index.html              # Homepage
├── about.html              # About page with timeline and interests
├── cv.html                 # CV/Resume with collapsible sections
├── projects.html           # Project showcase
├── links.html              # Contact and social links
├── generate-pages.js        # HTML generation script (optional)
├── template-base.html      # Base template for new pages
├── css/
│   ├── palette.css        # Color palette variables (edit for theme colors)
│   └── style.css          # Main stylesheet
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

All color-related CSS variables are centralized in `css/palette.css` for easy theme customization:

```css
/* css/palette.css */
:root {
  /* Primary Colors */
  --color-primary: #059669;        /* Main brand color */
  --color-primary-light: #34d399;  /* Hover states */
  --color-primary-dark: #047857;   /* Active states */

  /* Base Colors */
  --color-white: #ffffff;
  --color-gray-light: #f0fdf4;
  --color-gray: #6b7280;
  --color-black: #1f2937;

  /* ... and more color variables */
}
```

**Benefits of separate palette file:**
- Easy to find and modify all colors in one place
- Simple to create alternative color themes
- Better organization and maintainability

### Add Content

Content is managed via JavaScript data files - no HTML editing required!

**Add a project** (in `data/projects.js`):
```javascript
{
    name: "My New Project",
    description: "Project description here",
    categories: ["Web Development", "Backend & API"], // Multiple categories supported
    githubUrl: "https://github.com/username/project",
    liveUrl: "https://project-demo.com",
    image: "assets/projects/new-project.jpg"
}
```

**Project categorization system**:
- **Multiple categories per project** - Projects can belong to multiple categories
- **Automatic category buttons** - Filter buttons are generated from project data
- **Predefined categories** (customizable in `data/projects.js`):
  - Web Development
  - Backend & API
  - Data Science & AI
  - App Development
  - Automation & Tools
  - Research & Others

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

**Add personal strengths** (in `data/about.js` - strengths array):
```javascript
{
    title: "Strength Category",
    description: "Brief description of this strength area",
    icon: "fas fa-icon-name",  // FontAwesome icon
    highlights: [
        "First key highlight or achievement",
        "Second key highlight or skill",
        "Third key highlight or experience"
    ]
}
```

**Configure links safely** (in `data/links.js`):
```javascript
// ✅ Empty sections show "No items found" message automatically
window.linksData = {
    contact: [],           // Always shown (website/contact info)
    social: [],            // Shows empty state if empty
    portfolio: []          // Shows empty state if empty
};

// ✅ Safe: Add your own links
social: [
    {
        title: "GitHub",
        url: "https://github.com/YOUR-USERNAME",
        username: "@YOUR-USERNAME",
        icon: "fab fa-github"
    }
]

// ❌ Dangerous: Never delete properties completely
// delete window.linksData.social;  // This will break the page!
```

**Empty state handling**:
- Social Media and Portfolio sections automatically show "No items found" when empty
- Contact section is typically always populated
- Template users can see which sections are available even when empty

**Update personal info** (in `data/about.js`):
```javascript
window.aboutData = {
    personal: {
        name: "Your Name",
        position: "Your Title",
        image: "assets/about-photo.jpg",  // Profile image (optional)
        description: [
            "First paragraph about yourself",
            "Second paragraph with more details"
        ]
    }
}
```

### Project Filtering System

The portfolio includes a dynamic filtering system for projects:

**Features:**
- Real-time category filtering with smooth animations
- Multiple category support - projects can belong to multiple categories
- Automatic button generation from project data
- Empty state handling when no projects match filter
- Unified animation timing across all interactions

**Configuration** (in `data/projects.js`):
```javascript
// Define available categories
window.projectCategories = [
    "Web Development",
    "Backend & API", 
    "Data Science & AI",
    "App Development",
    "Automation & Tools",
    "Research & Others"
];

// Assign multiple categories to projects
{
    name: "Full-stack App",
    categories: ["Web Development", "Backend & API"], // Multiple categories
    // ... other project data
}
```

**Customization:**
- Modify `window.projectCategories` array to add/remove categories
- Projects automatically support multiple categories
- Filter buttons are dynamically generated from project data
- Modify `EMPTY_STATE_CONFIG` in `js/pages-unified.js` to change empty state message

### Add New Pages

**Option 1: Use HTML Generation Script**
1. **Update page configuration** in `generate-pages.js`
2. **Add navigation** in `data/common.js`  
3. **Add page handler** in `js/pages-unified.js`
4. **Create data file** in `data/` directory
5. **Run generation script**: `node generate-pages.js`

**Option 2: Manual Creation**
1. **Create HTML file** (copy from `template-base.html`)
2. **Add navigation** in `data/common.js`
3. **Add page handler** in `js/pages-unified.js`
4. **Create data file** in `data/` directory

## 🚀 Deployment

### GitHub Pages

1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch / root directory
4. Access at `https://rayramy04.github.io/portfolio`

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
- Profile images show "No image available" if path is incorrect or missing

**Links page showing errors?**
- Ensure `data/links.js` exists and contains `window.linksData`
- Don't delete properties, use empty arrays instead: `contact: []`
- Empty sections (social, portfolio) will show "No items found" automatically
- Check JavaScript console for detailed error messages

**Empty state messages not appearing?**
- Check that `EMPTY_STATE_CONFIG` is properly defined in `js/pages-unified.js`
- Verify data arrays are truly empty (not undefined)
- Ensure page initialization functions are called correctly

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

**Template Version**: 1.2  
**Last Updated**: July 2025  
**Supported Browsers**: Modern browsers with ES6+ and CSS Grid support