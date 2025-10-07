const fs = require('fs');
const path = require('path');

// ==========================================
// LOAD SEO CONFIGURATION
// ==========================================
// All SEO settings are now centralized in data/seo-config.js
const seoConfig = require('./data/seo-config.js');

// ==========================================
// SCRIPT CONFIGURATIONS
// ==========================================
// Define required scripts for each page
const pageScripts = {
    'index': `    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/data-populator.js"></script>
    <script src="data/common.js"></script>
    <script src="data/home.js"></script>
    <script src="js/pages-unified.js"></script>`,
    'about': `    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/data-populator.js"></script>
    <script src="data/common.js"></script>
    <script src="data/about.js"></script>
    <script src="js/pages-unified.js"></script>`,
    'cv': `    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/data-populator.js"></script>
    <script src="data/common.js"></script>
    <script src="data/cv.js"></script>
    <script src="js/pages-unified.js"></script>`,
    'projects': `    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/data-populator.js"></script>
    <script src="data/common.js"></script>
    <script src="data/projects.js"></script>
    <script src="js/pages-unified.js"></script>`,
    'links': `    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/data-populator.js"></script>
    <script src="data/common.js"></script>
    <script src="data/links.js"></script>
    <script src="js/pages-unified.js"></script>`
};

// ==========================================
// GENERATE OG/TWITTER TAGS
// ==========================================
function generateMetaTags(pageName, pageConfig) {
    const pageUrl = pageName === 'index'
        ? seoConfig.baseUrl
        : `${seoConfig.baseUrl}${pageName}.html`;
    const ogImageUrl = `${seoConfig.baseUrl}${pageConfig.ogImage}`;

    return `    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:title" content="${pageConfig.title}">
    <meta property="og:description" content="${pageConfig.metaDescription}">
    <meta property="og:image" content="${ogImageUrl}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${pageUrl}">
    <meta property="twitter:title" content="${pageConfig.title}">
    <meta property="twitter:description" content="${pageConfig.metaDescription}">
    <meta property="twitter:image" content="${ogImageUrl}">

`;
}

// ==========================================
// GENERATE PAGE
// ==========================================
function generatePage(pageName) {
    const pageConfig = seoConfig.pages[pageName];
    if (!pageConfig) {
        console.error(`No SEO config found for page: ${pageName}`);
        return;
    }

    // Read template and content
    const templatePath = path.join(__dirname, 'template-base.html');
    const contentPath = path.join(__dirname, 'content', `${pageName}-content.html`);

    let template = fs.readFileSync(templatePath, 'utf8');
    let content = fs.readFileSync(contentPath, 'utf8');

    // Generate meta tags
    const metaTags = generateMetaTags(pageName, pageConfig);

    // Replace placeholders (use replaceAll to handle multiple occurrences)
    template = template.replaceAll('{{TITLE}}', pageConfig.title);
    template = template.replaceAll('{{META_DESCRIPTION}}', pageConfig.metaDescription);
    template = template.replaceAll('{{META_KEYWORDS}}', pageConfig.metaKeywords);
    template = template.replaceAll('{{AUTHOR}}', seoConfig.author);
    template = template.replaceAll('{{SITE_NAME}}', seoConfig.siteName);
    template = template.replaceAll('{{ADDITIONAL_HEAD}}', metaTags);
    template = template.replaceAll('{{MAIN_CONTENT}}', content);
    template = template.replaceAll('{{SCRIPTS}}', pageScripts[pageName]);

    // Write generated page
    const outputPath = path.join(__dirname, `${pageName}.html`);
    fs.writeFileSync(outputPath, template);

    console.log(`✓ Generated ${pageName}.html`);
}

// ==========================================
// MAIN
// ==========================================
// Generate all pages
const pages = ['index', 'about', 'cv', 'projects', 'links'];
pages.forEach(pageName => {
    generatePage(pageName);
});

console.log('\n✓ All pages generated successfully!');
