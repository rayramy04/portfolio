const fs = require('fs');
const path = require('path');

// Generate structured data
function generateStructuredData(pageName) {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ray",
        "jobTitle": "Computer Science & Data Science Student",
        "description": "Computer Science & Data Science student at Monash University Malaysia with expertise in AI/ML, full-stack development, and research.",
        "url": "https://yoursite.com",
        "image": "https://yoursite.com/assets/profile.jpg",
        "sameAs": [
            "https://github.com/yourusername",
            "https://linkedin.com/in/yourusername"
        ],
        "affiliation": {
            "@type": "Organization",
            "name": "Monash University Malaysia"
        },
        "knowsAbout": [
            "Artificial Intelligence",
            "Machine Learning",
            "Full-stack Development",
            "Python Programming",
            "JavaScript",
            "Data Science"
        ],
        "alumniOf": {
            "@type": "Organization",
            "name": "Monash University Malaysia"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "Website",
        "name": "Ray's Portfolio",
        "description": "Portfolio website showcasing computer science and data science projects, AI/ML applications, and professional experience.",
        "url": "https://yoursite.com",
        "author": {
            "@type": "Person",
            "name": "Ray"
        },
        "inLanguage": "ja"
    };

    // Page-specific schemas
    const pageSchemas = {
        index: {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "mainEntity": {
                "@type": "Person",
                "name": "Ray"
            }
        },
        about: {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
                "@type": "Person",
                "name": "Ray"
            }
        },
        projects: {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Ray's Projects",
            "description": "Collection of AI/ML and web development projects"
        }
    };

    const schemas = [personSchema, websiteSchema];
    if (pageSchemas[pageName]) {
        schemas.push(pageSchemas[pageName]);
    }

    return schemas.map(schema => 
        `    <script type="application/ld+json">\n${JSON.stringify(schema, null, 8)}\n    </script>`
    ).join('\n');
}

// Page configurations
const pageConfigs = {
    'index': {
        title: "Ray's Portfolio | Computer Science & Data Science",
        metaDescription: "Ray - Computer Science & Data Science student at Monash University Malaysia. AI/ML projects, full-stack development, award-winning research experience. Explore innovative tech solutions.",
        metaKeywords: "Ray, portfolio, computer science, data science, AI, machine learning, web development, Monash University Malaysia",
        additionalHead: `    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yoursite.com/">
    <meta property="og:title" content="Ray's Portfolio | Computer Science & Data Science">
    <meta property="og:description" content="Ray - Computer Science & Data Science student at Monash University Malaysia. AI/ML projects, full-stack development, award-winning research experience.">
    <meta property="og:image" content="https://yoursite.com/assets/og-image.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://yoursite.com/">
    <meta property="twitter:title" content="Ray's Portfolio | Computer Science & Data Science">
    <meta property="twitter:description" content="Ray - Computer Science & Data Science student at Monash University Malaysia. AI/ML projects, full-stack development, award-winning research experience.">
    <meta property="twitter:image" content="https://yoursite.com/assets/og-image.jpg">
    
    <!-- Structured Data -->
${generateStructuredData('index')}`,
        scripts: `    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/error-handler.js"></script>
    <script src="js/utils/data-populator.js"></script>
    <script src="js/utils/page-manager.js"></script>
    <script src="data/common.js"></script>
    <script src="data/home.js"></script>
    <script src="js/pages-unified.js"></script>`
    },
    'about': {
        title: "About - Ray's Portfolio",
        metaDescription: "Meet Ray - CS & Data Science student with awards in AI research, music production, and international competitions. From Japan to Malaysia, discover my journey in tech innovation.",
        metaKeywords: "Ray, about, computer science, data science, Monash University Malaysia, AI research, international student",
        additionalHead: `    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yoursite.com/about.html">
    <meta property="og:title" content="About Ray - Computer Science & Data Science Student">
    <meta property="og:description" content="Meet Ray - CS & Data Science student with awards in AI research, music production, and international competitions. From Japan to Malaysia, discover my journey in tech innovation.">
    <meta property="og:image" content="https://yoursite.com/assets/about-photo.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://yoursite.com/about.html">
    <meta property="twitter:title" content="About Ray - Computer Science & Data Science Student">
    <meta property="twitter:description" content="Meet Ray - CS & Data Science student with awards in AI research, music production, and international competitions.">
    <meta property="twitter:image" content="https://yoursite.com/assets/about-photo.jpg">
    
    <!-- Structured Data -->
${generateStructuredData('about')}`,
        scripts: `    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/error-handler.js"></script>
    <script src="js/utils/data-populator.js"></script>
    <script src="js/utils/page-manager.js"></script>
    <script src="data/common.js"></script>
    <script src="data/about.js"></script>
    <script src="js/pages-unified.js"></script>`
    },
    'cv': {
        title: "CV - Ray's Portfolio",
        metaDescription: "Ray's CV - Monash University CS/Data Science student with scholarships, AI research awards, full-stack development skills. Python, JavaScript, Machine Learning expertise.",
        metaKeywords: "Ray, CV, curriculum vitae, computer science, data science, scholarship, AI research, full-stack developer",
        additionalHead: `    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yoursite.com/cv.html">
    <meta property="og:title" content="Ray's CV - CS & Data Science Student">
    <meta property="og:description" content="Ray's CV - Monash University CS/Data Science student with scholarships, AI research awards, full-stack development skills. Python, JavaScript, Machine Learning expertise.">
    <meta property="og:image" content="https://yoursite.com/assets/profile.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://yoursite.com/cv.html">
    <meta property="twitter:title" content="Ray's CV - CS & Data Science Student">
    <meta property="twitter:description" content="Ray's CV - Monash University student with scholarships, AI research awards, full-stack development skills.">
    <meta property="twitter:image" content="https://yoursite.com/assets/profile.jpg">
    
    <!-- Structured Data -->
${generateStructuredData('cv')}`,
        scripts: `    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/error-handler.js"></script>
    <script src="js/utils/data-populator.js"></script>
    <script src="js/utils/page-manager.js"></script>
    <script src="data/common.js"></script>
    <script src="data/cv.js"></script>
    <script src="js/pages-unified.js"></script>`
    },
    'projects': {
        title: "Projects - Ray's Portfolio",
        metaDescription: "Ray's Tech Projects - AI/ML applications, full-stack web development, data analysis tools. Explore innovative solutions built with Python, JavaScript, and modern frameworks.",
        metaKeywords: "Ray, projects, AI, machine learning, web development, Python, JavaScript, full-stack development, data analysis",
        additionalHead: `    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yoursite.com/projects.html">
    <meta property="og:title" content="Ray's Tech Projects - AI/ML & Web Development">
    <meta property="og:description" content="Ray's Tech Projects - AI/ML applications, full-stack web development, data analysis tools. Explore innovative solutions built with Python, JavaScript, and modern frameworks.">
    <meta property="og:image" content="https://yoursite.com/assets/projects/portfolio.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://yoursite.com/projects.html">
    <meta property="twitter:title" content="Ray's Tech Projects - AI/ML & Web Development">
    <meta property="twitter:description" content="Ray's Tech Projects - AI/ML applications, full-stack web development, data analysis tools. Innovative solutions with Python & JavaScript.">
    <meta property="twitter:image" content="https://yoursite.com/assets/projects/portfolio.jpg">
    
    <!-- Structured Data -->
${generateStructuredData('projects')}`,
        scripts: `    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/error-handler.js"></script>
    <script src="js/utils/data-populator.js"></script>
    <script src="js/utils/page-manager.js"></script>
    <script src="data/common.js"></script>
    <script src="data/projects.js"></script>
    <script src="js/pages-unified.js"></script>`
    },
    'links': {
        title: "Links - Ray's Portfolio",
        metaDescription: "Connect with Ray - Find my GitHub projects, LinkedIn profile, social media, and contact information. Let's collaborate on innovative tech solutions and AI research.",
        metaKeywords: "Ray, contact, GitHub, LinkedIn, social media, collaboration, networking, tech professional",
        additionalHead: `    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yoursite.com/links.html">
    <meta property="og:title" content="Connect with Ray - Social & Professional Links">
    <meta property="og:description" content="Connect with Ray - Find my GitHub projects, LinkedIn profile, social media, and contact information. Let's collaborate on innovative tech solutions and AI research.">
    <meta property="og:image" content="https://yoursite.com/assets/profile.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://yoursite.com/links.html">
    <meta property="twitter:title" content="Connect with Ray - Social & Professional Links">
    <meta property="twitter:description" content="Connect with Ray - GitHub projects, LinkedIn profile, social media, and contact information. Let's collaborate on tech solutions.">
    <meta property="twitter:image" content="https://yoursite.com/assets/profile.jpg">
    
    <!-- Structured Data -->
${generateStructuredData('links')}`,
        scripts: `    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/error-handler.js"></script>
    <script src="js/utils/data-populator.js"></script>
    <script src="js/utils/page-manager.js"></script>
    <script src="data/common.js"></script>
    <script src="data/links.js"></script>
    <script src="js/pages-unified.js"></script>`
    }
};

function generatePage(pageName, config) {
    // Read template and content
    const templatePath = path.join(__dirname, 'template-base.html');
    const contentPath = path.join(__dirname, 'content', `${pageName}-content.html`);
    
    let template = fs.readFileSync(templatePath, 'utf8');
    let content = fs.readFileSync(contentPath, 'utf8');
    
    // Replace placeholders
    template = template.replace('{{TITLE}}', config.title);
    template = template.replace('{{META_DESCRIPTION}}', config.metaDescription);
    template = template.replace('{{META_KEYWORDS}}', config.metaKeywords);
    template = template.replace('{{ADDITIONAL_HEAD}}', config.additionalHead);
    template = template.replace('{{MAIN_CONTENT}}', content);
    template = template.replace('{{SCRIPTS}}', config.scripts);
    
    // Write generated page
    const outputPath = path.join(__dirname, `${pageName}.html`);
    fs.writeFileSync(outputPath, template);
    
}

// Generate all pages
Object.keys(pageConfigs).forEach(pageName => {
    generatePage(pageName, pageConfigs[pageName]);
});
