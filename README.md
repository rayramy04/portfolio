# Portfolio Website Template

A modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. This template features a sophisticated utility-class architecture, data-driven content management, and comprehensive SEO optimization.

## ✨ Key Features

- **Zero Dependencies** - Pure HTML, CSS, and JavaScript with no build process
- **Data-Driven Architecture** - Easy content updates through JavaScript data files
- **Unified Design System** - Consistent components powered by CSS custom properties
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **SEO Optimized** - Structured data, meta tags, and technical SEO best practices
- **Performance Focused** - Optimized loading, animations, and resource management
- **Accessibility Ready** - Semantic HTML, ARIA labels, and keyboard navigation

## 🚀 Quick Start

### Local Development

```bash
# Clone or download the repository
git clone <repository-url>
cd portfolio

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
   - Modify colors in CSS custom properties

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
├── template-base.html      # Template for new pages
├── css/
│   └── style.css          # Complete stylesheet (1,191 lines)
├── js/
│   ├── pages-unified.js   # Central page initialization
│   └── utils/             # Utility class library
│       ├── dom-helpers.js    # DOM utilities + PageBase class
│       ├── html-generator.js # Template rendering
│       └── data-populator.js # Data-to-DOM population
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

## 🎨 Design System

### CSS Custom Properties

The design system is built on CSS custom properties for easy theming:

```css
:root {
  /* Primary colors - change these to customize your theme */
  --color-primary: #059669;        /* Main green */
  --color-primary-light: #34d399;  /* Light green */
  --color-primary-dark: #047857;   /* Dark green */
  
  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --font-heading: 'Poppins', sans-serif;
  
  /* Spacing scale */
  --space-4: 1rem;    /* 16px */
  --space-8: 2rem;    /* 32px */
  --space-16: 4rem;   /* 64px */
}
```

### Utility Classes

Consistent styling through utility classes:

- **Layout**: `.grid-auto-fit`, `.flex-between`, `.container`
- **Spacing**: `.gap-sm`, `.mb-section`, `.p-4`
- **Interactive**: `.hover-lift`, `.card`, `.btn-primary`

## 📝 Content Management

### Adding New Content

Content is managed through JavaScript data files. No HTML editing required!

**Add a new project:**

```javascript
// In data/projects.js
{
    name: "My New Project",
    description: "Project description here",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/username/project",
    liveUrl: "https://project-demo.com",
    image: "assets/projects/new-project.jpg"
}
```

**Add work experience:**

```javascript
// In data/cv.js - experience array
{
    company: "Company Name",
    position: "Job Title",
    period: "2024.01 - Present",
    description: "Role description and achievements",
    url: "https://company.com"
}
```

**Update personal information:**

```javascript
// In data/about.js
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

### Supported Content Types

The unified card template automatically handles:

- **Education** - institution, degree, period, description, url
- **Experience** - company, position, period, description, url  
- **Projects** - name/title, description, technologies, githubUrl, liveUrl, image
- **Timeline Events** - period, title, description, icon
- **Awards** - title, organization, date, description, link
- **Certifications** - title, organization, date, url
- **Grants** - title, organization, amount, date, description

## 🔧 Architecture Overview

### Utility-Class Design Pattern

The codebase follows a utility-class architecture:

- **HTMLGenerator** - Template rendering and HTML generation
- **PageBase** - Common page functionality (navigation, scroll effects)
- **DOMHelpers** - Safe DOM manipulation utilities
- **DataPopulator** - Data-to-DOM population with error handling

### Page Initialization Flow

```javascript
// 1. Detect current page
const pageName = getCurrentPageName();

// 2. Initialize common components
await initializeBase(); // Navigation, footer, SEO

// 3. Initialize page-specific content
switch (pageName) {
    case 'about': await initAbout(); break;
    case 'cv': await initCV(); break;
    // ... other pages
}

// 4. Trigger animations
animateElements([{ selector: '.section', delay: 400 }]);
```

### Unified Card Template

One template handles multiple content types through intelligent field mapping:

```javascript
static unifiedCardTemplate(item, config = {}) {
    // Smart field detection
    const title = item.institution || item.company || item.title;
    const subtitle = item.degree || item.position || item.organization;
    const date = item.period || item.date || item.year;
    
    // Generate consistent card HTML
    return `<div class="card hover-lift">...</div>`;
}
```

## 🎯 SEO & Performance

### SEO Features

- **Structured Data** - JSON-LD schema.org markup for Person, Website, and page types
- **Meta Tags** - Dynamic page-specific descriptions and keywords
- **Social Media** - Open Graph and Twitter Card support
- **Technical SEO** - XML sitemap, robots.txt, canonical URLs

### Performance Optimizations

- **CSS Custom Properties** - Efficient styling with minimal recalculation
- **Lazy Loading** - Images load only when needed
- **Batch DOM Updates** - Efficient rendering with innerHTML
- **Hardware Acceleration** - CSS transforms for smooth animations
- **Resource Hints** - Preconnect to external font services

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile-first approach */
.grid-auto-fit {
    grid-template-columns: 1fr; /* Mobile: single column */
}

@media (min-width: 768px) {
    .grid-auto-fit {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
}
```

### Adaptive Layouts

- **Navigation** - Hamburger menu on mobile, full menu on desktop
- **Cards** - Stack vertically on mobile, grid layout on larger screens
- **Typography** - Fluid font sizes with rem units
- **Images** - Responsive with aspect ratio preservation

## 🎨 Customization Guide

### Changing Colors

Update the primary color system in CSS:

```css
:root {
    --color-primary: #your-color;        /* Main brand color */
    --color-primary-light: #lighter-shade; /* Hover states */
    --color-primary-dark: #darker-shade;   /* Active states */
}
```

### Adding New Pages

1. **Create HTML file** (copy from `template-base.html`)
2. **Add navigation** in `data/common.js`
3. **Add page handler** in `js/pages-unified.js`
4. **Create data file** in `data/` directory

### Custom Animations

```javascript
// Add to page initialization
animateElements([
    { selector: '.my-section', delay: 400 },
    { selector: '.my-cards', delay: 600 }
]);
```

### Image Management

- **Profile photos** - Replace `assets/profile.jpg`
- **Project images** - Add to `assets/projects/`
- **Background images** - Update CSS background-image properties
- **Icons** - Uses Font Awesome 6.4.0 (included via CDN)

## 🔧 Development Tips

### Debugging

```javascript
// Enable console logging in data-populator.js
console.log('Populating container:', containerId, 'with data:', data);
```

### Browser Support

- **Modern browsers** - Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **CSS Features** - CSS Grid, Custom Properties, Flexbox
- **JavaScript Features** - ES6 classes, async/await, template literals

### Performance Monitoring

- **Core Web Vitals** - LCP, FID, CLS optimized
- **Lighthouse** - Typically scores 95+ in all categories
- **Bundle Size** - ~50KB total (CSS + JS + HTML)

## 🚀 Deployment

### GitHub Pages

1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch / root directory
4. Access at `https://username.github.io/repository-name`

### Other Platforms

- **Netlify** - Drag and drop the folder
- **Vercel** - Connect GitHub repository
- **Traditional hosting** - Upload files via FTP

### Environment Configuration

No environment variables needed. Update URLs in:
- `data/seo-config.js` - Main site URL
- Social media links in `data/common.js` and `data/links.js`

## 📄 License

MIT License - feel free to use this template for personal or commercial projects.

## 🤝 Contributing

This template is designed to be easily customizable. Common improvements:

- Additional page templates
- New card types or layouts
- Enhanced animations
- Additional utility classes
- Accessibility improvements

## 💡 Credits

Built with modern web standards and best practices:
- **CSS Grid & Flexbox** for layouts
- **CSS Custom Properties** for theming
- **Font Awesome** for icons
- **Google Fonts** for typography
- **Schema.org** for structured data

---

**Template Version**: 1.0  
**Last Updated**: 2025  
**Compatible With**: Modern browsers supporting ES6+ and CSS Grid