const fs = require('fs');
const path = require('path');

// Page configurations
const pageConfigs = {
    'index': {
        title: "Ray's Portfolio | Computer Science & Data Science",
        metaDescription: "Ray's portfolio - Computer Science & Data Science student at Monash University Malaysia. AI, ML, web development, research.",
        metaKeywords: "Ray, portfolio, computer science, data science, AI, machine learning, web development, Monash University Malaysia",
        additionalHead: '',
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
        metaDescription: "About Ray - Computer Science & Data Science Student at Monash University Malaysia",
        metaKeywords: "Ray, about, computer science, data science, Monash University Malaysia",
        additionalHead: '',
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
        metaDescription: "Curriculum Vitae - Education, Experience, Skills, and Achievements of Ray",
        metaKeywords: "Ray, CV, curriculum vitae, education, experience, skills",
        additionalHead: '',
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
        metaDescription: "Projects - Portfolio of development work and technical achievements",
        metaKeywords: "Ray, projects, portfolio, development, programming, web development",
        additionalHead: '',
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
        metaDescription: "Links - Social media, contact information, and online presence",
        metaKeywords: "Ray, links, social media, contact, GitHub, Twitter, LinkedIn",
        additionalHead: '',
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
    
    console.log(`Generated ${pageName}.html`);
}

// Generate all pages
console.log('Generating optimized HTML pages...');
Object.keys(pageConfigs).forEach(pageName => {
    generatePage(pageName, pageConfigs[pageName]);
});
console.log('All pages generated successfully!');