const fs = require('fs');
const path = require('path');

// Structured data is now handled dynamically by seo-config.js and pages-unified.js

// Page configurations
const pageConfigs = {
    'index': {
        title: "Ray's Portfolio | Computer Science & Data Science",
        metaDescription: "Ray - Computer Science & Data Science student at Monash University Malaysia. AI/ML projects, full-stack development, award-winning research experience. Explore innovative tech solutions.",
        metaKeywords: "Ray, portfolio, computer science, data science, AI, machine learning, web development, Monash University Malaysia",
        additionalHead: `    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://rayramy04.github.io/portfolio/">
    <meta property="og:title" content="Ray's Portfolio | Computer Science & Data Science">
    <meta property="og:description" content="Ray - Computer Science & Data Science student at Monash University Malaysia. AI/ML projects, full-stack development, award-winning research experience.">
    <meta property="og:image" content="https://rayramy04.github.io/portfolio/assets/og-image.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://rayramy04.github.io/portfolio/">
    <meta property="twitter:title" content="Ray's Portfolio | Computer Science & Data Science">
    <meta property="twitter:description" content="Ray - Computer Science & Data Science student at Monash University Malaysia. AI/ML projects, full-stack development, award-winning research experience.">
    <meta property="twitter:image" content="https://rayramy04.github.io/portfolio/assets/og-image.jpg">
    
`,
        scripts: `    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/data-populator.js"></script>
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
    <meta property="og:url" content="https://rayramy04.github.io/portfolio/about.html">
    <meta property="og:title" content="About Ray - Computer Science & Data Science Student">
    <meta property="og:description" content="Meet Ray - CS & Data Science student with awards in AI research, music production, and international competitions. From Japan to Malaysia, discover my journey in tech innovation.">
    <meta property="og:image" content="https://rayramy04.github.io/portfolio/assets/about-photo.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://rayramy04.github.io/portfolio/about.html">
    <meta property="twitter:title" content="About Ray - Computer Science & Data Science Student">
    <meta property="twitter:description" content="Meet Ray - CS & Data Science student with awards in AI research, music production, and international competitions.">
    <meta property="twitter:image" content="https://rayramy04.github.io/portfolio/assets/about-photo.jpg">
    
`,
        scripts: `    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/data-populator.js"></script>
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
    <meta property="og:url" content="https://rayramy04.github.io/portfolio/cv.html">
    <meta property="og:title" content="Ray's CV - CS & Data Science Student">
    <meta property="og:description" content="Ray's CV - Monash University CS/Data Science student with scholarships, AI research awards, full-stack development skills. Python, JavaScript, Machine Learning expertise.">
    <meta property="og:image" content="https://rayramy04.github.io/portfolio/assets/profile.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://rayramy04.github.io/portfolio/cv.html">
    <meta property="twitter:title" content="Ray's CV - CS & Data Science Student">
    <meta property="twitter:description" content="Ray's CV - Monash University student with scholarships, AI research awards, full-stack development skills.">
    <meta property="twitter:image" content="https://rayramy04.github.io/portfolio/assets/profile.jpg">
    
`,
        scripts: `    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/data-populator.js"></script>
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
    <meta property="og:url" content="https://rayramy04.github.io/portfolio/projects.html">
    <meta property="og:title" content="Ray's Tech Projects - AI/ML & Web Development">
    <meta property="og:description" content="Ray's Tech Projects - AI/ML applications, full-stack web development, data analysis tools. Explore innovative solutions built with Python, JavaScript, and modern frameworks.">
    <meta property="og:image" content="https://rayramy04.github.io/portfolio/assets/projects/portfolio.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://rayramy04.github.io/portfolio/projects.html">
    <meta property="twitter:title" content="Ray's Tech Projects - AI/ML & Web Development">
    <meta property="twitter:description" content="Ray's Tech Projects - AI/ML applications, full-stack web development, data analysis tools. Innovative solutions with Python & JavaScript.">
    <meta property="twitter:image" content="https://rayramy04.github.io/portfolio/assets/projects/portfolio.jpg">
    
`,
        scripts: `    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/data-populator.js"></script>
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
    <meta property="og:url" content="https://rayramy04.github.io/portfolio/links.html">
    <meta property="og:title" content="Connect with Ray - Social & Professional Links">
    <meta property="og:description" content="Connect with Ray - Find my GitHub projects, LinkedIn profile, social media, and contact information. Let's collaborate on innovative tech solutions and AI research.">
    <meta property="og:image" content="https://rayramy04.github.io/portfolio/assets/profile.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://rayramy04.github.io/portfolio/links.html">
    <meta property="twitter:title" content="Connect with Ray - Social & Professional Links">
    <meta property="twitter:description" content="Connect with Ray - GitHub projects, LinkedIn profile, social media, and contact information. Let's collaborate on tech solutions.">
    <meta property="twitter:image" content="https://rayramy04.github.io/portfolio/assets/profile.jpg">
    
`,
        scripts: `    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/data-populator.js"></script>
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
