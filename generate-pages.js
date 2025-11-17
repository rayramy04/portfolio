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
    'summary': `    <script src="js/utils/dom-helpers.js"></script>
    <script src="js/utils/html-generator.js"></script>
    <script src="js/utils/data-populator.js"></script>
    <script src="data/common.js"></script>
    <script src="data/summary.js"></script>
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
// GENERATE SITEMAP
// ==========================================
function generateSitemap() {
    const pages = [
        { name: 'index', priority: '1.0', changefreq: 'monthly' },
        { name: 'summary', priority: '0.85', changefreq: 'monthly' },
        { name: 'about', priority: '0.8', changefreq: 'monthly' },
        { name: 'cv', priority: '0.9', changefreq: 'monthly' },
        { name: 'projects', priority: '0.9', changefreq: 'weekly' },
        { name: 'links', priority: '0.7', changefreq: 'monthly' }
    ];

    const lastmod = new Date().toISOString().split('T')[0];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    pages.forEach(page => {
        const url = page.name === 'index'
            ? seoConfig.baseUrl
            : `${seoConfig.baseUrl}${page.name}.html`;

        sitemap += `    <url>
        <loc>${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>
`;
    });

    sitemap += `</urlset>
`;

    const sitemapPath = path.join(__dirname, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);

    console.log('✓ Generated sitemap.xml');
}

// ==========================================
// MAIN
// ==========================================
// Generate all pages
const pages = ['index', 'summary', 'about', 'cv', 'projects', 'links'];
pages.forEach(pageName => {
    generatePage(pageName);
});

// Generate sitemap
generateSitemap();

console.log('\n✓ All pages generated successfully!');
