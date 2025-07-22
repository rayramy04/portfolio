# Modern Portfolio Website

[![English](https://img.shields.io/badge/English-README-blue)](README.md) [![日本語](https://img.shields.io/badge/日本語-README-blue)](README.ja.md)

A high-performance, SEO-optimized portfolio website built from scratch with vanilla HTML, CSS, and JavaScript. Features advanced template generation, structured data, and modern web standards.

## Key Features

### SEO & Social Media Optimization
- Meta descriptions optimized for search engines
- Open Graph Protocol for rich social media previews
- Twitter Cards for professional link sharing
- Schema.org structured data (Person & Website markup)
- LinkedIn, Facebook, Twitter optimization

### Advanced Template System
- Auto-generated HTML from templates
- Automatic SEO markup injection
- Centralized content management
- Single command HTML regeneration

### Performance & Architecture
- Direct JavaScript data loading (zero CORS issues)
- Optimized 746-line JavaScript codebase
- Component-based modular design
- Robust error handling and fallbacks

### Modern Design
- Interactive particle background effects
- Zigzag timeline layout
- Mobile-first responsive design
- Professional green color scheme

## Architecture

### Template Generation System
```
Content Files → Template Engine → Generated HTML
     ↓              ↓                   ↓
  content/      generate-pages.js    index.html
                     +                about.html
               template-base.html      cv.html
                     +               projects.html
              SEO configuration       links.html
```

### File Structure
```
portfolio/
├── Generated HTML Files
│   ├── index.html          # Homepage with particles + SEO
│   ├── about.html          # About page + structured data
│   ├── cv.html             # CV + professional meta tags
│   ├── projects.html       # Projects + OGP optimization
│   └── links.html          # Contact + social optimization
├── Template System
│   ├── generate-pages.js   # HTML generation + SEO injection
│   ├── template-base.html  # Base HTML template
│   └── content/            # Page-specific content
│       ├── index-content.html
│       ├── about-content.html
│       ├── cv-content.html
│       ├── projects-content.html
│       └── links-content.html
├── Data Layer (742 lines)
│   ├── data/
│   │   ├── common.js       # Navigation, footer, social links
│   │   ├── home.js         # Hero content, keywords
│   │   ├── about.js        # Personal story, timeline, interests
│   │   ├── cv.js           # Education, experience, skills
│   │   ├── projects.js     # Portfolio projects
│   │   ├── links.js        # Contact information
│   │   └── seo-config.js   # SEO metadata configuration
├── JavaScript (746 lines)
│   ├── js/
│   │   ├── pages-unified.js    # Main page initialization (322 lines)
│   │   └── utils/
│   │       ├── html-generator.js   # Template rendering (112 lines)
│   │       ├── dom-helpers.js      # DOM utilities (137 lines)
│   │       ├── page-manager.js     # Page management (98 lines)
│   │       ├── data-populator.js   # Data population (51 lines)
│   │       └── error-handler.js    # Error handling (26 lines)
├── Styling
│   └── css/
│       └── style.css       # Complete design system (1,883 lines)
└── Assets
    ├── profile.jpg         # Main profile image
    ├── about-photo.jpg     # About page photo
    ├── og-image.jpg        # Social media preview
    └── projects/           # Project screenshots
```

## Quick Start

### 1. Clone & Setup
```bash
git clone https://github.com/username/portfolio.git
cd portfolio
```

### 2. Generate HTML Pages
```bash
# Generate all HTML files with SEO optimization
node generate-pages.js
```

### 3. Customize Your Data

#### **Personal Information**
```javascript
// data/about.js
window.aboutData = {
  personal: {
    name: "Your Name",
    position: "Your Professional Title",
    description: "Your professional bio..."
  }
};
```

#### **SEO Configuration**
```javascript
// data/seo-config.js - Auto-generated, customize as needed
window.seoConfig = {
  person: {
    "@type": "Person",
    "name": "Your Name",
    "jobTitle": "Your Job Title",
    "url": "https://yoursite.com",
    // Structured data for search engines
  }
};
```

### 4. Launch Development Server
```bash
# Python (recommended)
python -m http.server 8000

# Node.js alternative  
npx http-server .

# Or any local server
```

Visit `http://localhost:8000`

### 5. Deploy
```bash
# All HTML files are pre-generated and ready to deploy
# No build process needed - just upload to any static host

# GitHub Pages: Push to main branch
# Netlify/Vercel: Drag & drop the folder
```

## Customization Guide

### Content Management

#### Update Template Content
```html
<!-- content/about-content.html -->
<section class="about-section">
    <h1>Your Custom About Content</h1>
    <!-- Your HTML content -->
</section>
```

#### Regenerate Pages
```bash
# After making changes, regenerate HTML
node generate-pages.js
```

#### CV Data Structure
```javascript
// data/cv.js
window.cvData = {
  education: [
    {
      institution: "University Name",
      degree: "Your Degree",
      period: "2020-2024",
      description: "Education details",
      achievements: ["Award 1", "Award 2"]
    }
  ],
  experience: [
    {
      company: "Company Name",
      position: "Job Title", 
      period: "2020-Present",
      description: "Job responsibilities",
      url: "https://company.com"
    }
  ],
  skills: {
    technical: ["Python", "JavaScript", "React"],
    languages: ["English", "Japanese"]
  }
};
```

### SEO Optimization

#### Meta Tags Configuration
```javascript
// generate-pages.js - Page configurations
const pageConfigs = {
  'index': {
    title: "Your Name | Professional Title",
    metaDescription: "Your compelling 150-character description for search engines",
    metaKeywords: "your, relevant, keywords",
    // OGP and Twitter Card settings auto-generated
  }
};
```

#### Structured Data Customization
```javascript
// generate-pages.js - generateStructuredData()
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "jobTitle": "Your Position",
  "affiliation": {
    "@type": "Organization", 
    "name": "Your Company/University"
  },
  "knowsAbout": ["Your", "Key", "Skills"],
  "sameAs": [
    "https://linkedin.com/in/yourusername",
    "https://github.com/yourusername"
  ]
};
```

### Visual Customization

#### Color Scheme
```css
/* css/style.css */
:root {
  --primary-color: #059669;     /* Customize main color */
  --primary-light: #34d399;     /* Light variant */
  --primary-dark: #047857;      /* Dark variant */
  --secondary-color: #0d9488;   /* Accent color */
}
```

#### Social Media Images
- `assets/og-image.jpg` - Main social preview (1200x630px)
- `assets/about-photo.jpg` - About page preview
- `assets/profile.jpg` - Profile sections

## Technical Specifications

### Performance Metrics
- **Total Lines**: 4,433 (HTML: 1,062, JS: 746, Data: 742, CSS: 1,883)
- **JavaScript Optimization**: 57% reduction from original
- **Load Time**: < 1 second
- **SEO Score**: Optimized for search engines
- **Mobile Performance**: Fully responsive

### SEO Features
```html
<!-- Auto-generated in each page -->
<meta name="description" content="Optimized description">
<meta property="og:title" content="Social media title">
<meta property="og:image" content="Preview image">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name"
}
</script>
```

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- No external dependencies required
- Progressive enhancement approach

## Development Workflow

### Adding New Pages
1. Create content file in `content/`
2. Add page config in `generate-pages.js`
3. Run `node generate-pages.js`
4. Add navigation links in `data/common.js`

### Updating SEO
1. Modify metadata in `generate-pages.js`
2. Update structured data schemas
3. Regenerate HTML files
4. Test with SEO tools

### Performance Optimization
```bash
# Check current stats
find . -name "*.js" -path "*/js/*" -exec wc -l {} + | tail -1
# JavaScript: 746 lines total

find . -name "*.html" -exec wc -l {} + | tail -1  
# HTML: 1,062 lines total
```

## Advanced Features

### SEO Optimization
- Search engine friendly URLs
- Semantic HTML structure
- Rich snippets support
- Social media optimization
- Performance optimization

### Progressive Enhancement
- Mobile-first responsive design
- Touch-friendly interactions
- Fast loading on all devices
- Accessibility considerations

### Interactive Elements
- Particle.js background animation
- Smooth CSS transitions
- Hover effects and animations
- Collapsible CV sections
- Interactive timeline

## Deployment Options

### Static Hosting
- **GitHub Pages**: Zero configuration
- **Netlify**: Drag & drop deployment
- **Vercel**: Git-based deployment
- **Surge.sh**: Command-line deployment

### Custom Domain Setup
1. Add `CNAME` file with your domain
2. Configure DNS settings
3. Enable HTTPS in hosting platform
4. Update URLs in SEO configuration

## Contributing

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/seo-enhancement`)
3. **Modify** templates or data
4. **Regenerate** HTML (`node generate-pages.js`)
5. **Test** locally
6. **Commit** changes
7. **Create** Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Schema.org** - Structured data standards
- **Open Graph Protocol** - Social media optimization
- **Particles.js** - Interactive backgrounds
- **Font Awesome** - Professional icons
- **Google Fonts** - Typography (Poppins, Inter)

## Support & Resources

- **SEO Testing**: Google Search Console, PageSpeed Insights
- **Social Media Testing**: Facebook Debugger, Twitter Card Validator
- **Performance**: Lighthouse, GTmetrix
- **Documentation**: Inline code comments

---

**⭐ Star this repository if it helped you build your professional portfolio!**

*Built with modern web standards, SEO best practices, and performance optimization in mind.*