#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read base template
const baseTemplate = fs.readFileSync('templates/base.html', 'utf8');

// Pages to process
const pages = ['index', 'about', 'cv', 'projects', 'links'];

console.log('🚀 Building HTML files from templates...\n');

pages.forEach(page => {
    try {
        // Read page configuration
        const configPath = `pages/${page}.config.json`;
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        
        // Read content files
        const mainContent = fs.readFileSync(config.MAIN_CONTENT, 'utf8');
        const scripts = fs.readFileSync(config.SCRIPTS, 'utf8');
        
        // Replace placeholders in template
        let html = baseTemplate
            .replace('{{META_DESCRIPTION}}', config.META_DESCRIPTION)
            .replace('{{META_KEYWORDS}}', config.META_KEYWORDS)
            .replace('{{PAGE_TITLE}}', config.PAGE_TITLE)
            .replace('{{ADDITIONAL_HEAD}}', config.ADDITIONAL_HEAD)
            .replace('{{MAIN_CONTENT}}', mainContent)
            .replace('{{SCRIPTS}}', scripts);
        
        // Write final HTML file
        const outputFile = page === 'index' ? 'index.html' : `${page}.html`;
        fs.writeFileSync(outputFile, html);
        
        console.log(`✅ Built ${outputFile}`);
        
    } catch (error) {
        console.error(`❌ Error building ${page}.html:`, error.message);
    }
});

console.log('\n🎉 Template build completed!');