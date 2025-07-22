// Unified page management system using PageManager class

// Page configurations
const PAGE_CONFIGS = {
    home: async (manager) => {
        // Hero content populator
        manager.addDOMPopulator(async function() {
            const { name, subtitle, keywords } = window.homeData.hero;
            
            const [heroName, heroTitle, keywordsList] = await Promise.all([
                DOMHelpers.getElement('hero-name'),
                DOMHelpers.getElement('hero-title'),
                DOMHelpers.getElement('keywords-list')
            ]);

            DOMHelpers.setText(heroName, name);
            DOMHelpers.setText(heroTitle, subtitle);

            const keywordsHTML = HTMLGenerator.renderList(keywords, (keyword) => 
                `<li class="keyword-item">${keyword}</li>`
            );
            DOMHelpers.setHTML(keywordsList, keywordsHTML);
        }, { errorElement: 'hero-content' });

        // Particles initializer
        manager.addCustomInitializer(function() {
            if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 80, density: { enable: true, value_area: 800 } },
                        color: { value: ['#059669', '#14b8a6', '#06b6d4', '#34d399'] },
                        shape: { type: ['circle', 'triangle'], stroke: { width: 1, color: '#059669' } },
                        opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1.5, opacity_min: 0.1, sync: false } },
                        size: { value: 4, random: true, anim: { enable: true, speed: 2, size_min: 1, sync: false } },
                        line_linked: { enable: true, distance: 120, color: '#059669', opacity: 0.3, width: 1.5 },
                        move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false, attract: { enable: true, rotateX: 600, rotateY: 1200 } }
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                        modes: { repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 } }
                    },
                    retina_detect: true
                });
            }
        });

        manager.addAnimation('.hero-content', 100);
    },

    about: async (manager) => {
        // Personal info populator
        manager.addDOMPopulator(async function() {
            const personalData = window.aboutData.personal;
            
            const aboutName = document.getElementById('about-name');
            const aboutPosition = document.getElementById('about-position');
            const aboutDescription = document.getElementById('about-description');

            DOMHelpers.setText(aboutName, personalData.name);
            DOMHelpers.setText(aboutPosition, personalData.position);
            if (aboutDescription) {
                aboutDescription.innerHTML = personalData.description;
            }
        });

        // Story content populator
        manager.addDOMPopulator(async function() {
            const storyData = window.aboutData.story;
            const storyContent = await DOMHelpers.getElement('story-content-inner');
            const storyHTML = storyData.paragraphs
                .map(paragraph => `<p>${paragraph}</p>`)
                .join('');

            DOMHelpers.setHTML(storyContent, storyHTML);
        }, { errorElement: 'story-content' });

        // Timeline data populator
        manager.addDataPopulator({
            type: 'list',
            dataPath: 'aboutData.timeline',
            containerId: 'timeline-container',
            itemRenderer: (item) => `
                <div class="timeline-item">
                    <div class="timeline-content">
                        <div class="timeline-header">
                            <h3>${item.period}</h3>
                            <h4>${item.title}</h4>
                        </div>
                        <p>${item.description}</p>
                    </div>
                </div>
            `,
            options: { delay: 500, sectionSelector: '.timeline-section' }
        });

        // Interests data populator
        manager.addDataPopulator({
            type: 'list',
            dataPath: 'aboutData.interests',
            containerId: 'interests-container',
            itemRenderer: (interest) => `
                <div class="interest-card">
                    <div class="interest-icon">
                        <i class="${interest.icon}"></i>
                    </div>
                    <h3>${interest.title}</h3>
                    <p>${interest.description}</p>
                </div>
            `,
            options: { delay: 700, sectionSelector: '.interests-section' }
        });

        manager.addSequentialAnimations(['.about-section', '.timeline-section', '.interests-section'], 100, 100);
    },

    cv: async (manager) => {
        // Education populator
        manager.addDataPopulator({
            type: 'cv',
            dataPath: 'cvData.education',
            containerId: 'education-container',
            cvItemConfig: {
                titleField: 'institution',
                subtitleField: 'degree',
                dateField: 'period',
                descriptionField: 'description'
            },
            delay: 200
        });

        // Experience populator
        manager.addDataPopulator({
            type: 'cv',
            dataPath: 'cvData.experience',
            containerId: 'experience-container',
            cvItemConfig: {
                showLink: true,
                titleField: 'company',
                subtitleField: 'position',
                dateField: 'period'
            },
            delay: 300
        });

        // Skills populator with custom method
        manager.addDataPopulator({
            dataPath: 'cvData.skills',
            containerId: 'skills-container',
            renderer: (skillsData) => HTMLGenerator.skillsSection(skillsData, manager.generateStars.bind(manager)),
            options: { delay: 400 }
        });

        // Certifications populator
        manager.addDataPopulator({
            type: 'list',
            dataPath: 'cvData.certifications',
            containerId: 'certifications-container',
            itemRenderer: (cert) => HTMLGenerator.certificationItem(cert),
            options: { delay: 500 }
        });

        // Awards populator
        manager.addDataPopulator({
            dataPath: 'cvData.awards',
            containerId: 'awards-container',
            renderer: (awardsData) => HTMLGenerator.awardsSection(awardsData),
            options: { delay: 600 }
        });

        // Grants populator
        manager.addDataPopulator({
            type: 'list',
            dataPath: 'cvData.grants',
            containerId: 'grants-container',
            itemRenderer: (grant) => HTMLGenerator.grantItem(grant),
            options: { delay: 700 }
        });

        // Add generateStars method to manager
        manager.generateStars = function(level) {
            const maxStars = 5;
            let starsHTML = '';
            
            for (let i = 1; i <= maxStars; i++) {
                if (i <= level) {
                    starsHTML += '<i class="fas fa-star"></i>';
                } else {
                    starsHTML += '<i class="far fa-star"></i>';
                }
            }
            
            return starsHTML;
        };
    },

    projects: async (manager) => {
        manager.addDOMPopulator(async function() {
            console.log('Projects page loading...');
            const projectsData = window.projectsData;
            console.log('Projects data:', projectsData);
            const projectsContainer = await DOMHelpers.getElement('projects-container');
            
            const projectsHTML = HTMLGenerator.renderList(projectsData, (project) => `
                <div class="project-card">
                    ${HTMLGenerator.renderIf(project.image, `
                        <div class="project-image">
                            <img src="${project.image}" alt="${project.name || project.title}">
                        </div>
                    `)}
                    <div class="project-content">
                        <h3>${project.name || project.title}</h3>
                        ${HTMLGenerator.renderIf(project.description, `<p class="project-description">${project.description}</p>`)}
                        ${HTMLGenerator.renderIf(project.technologies?.length, `
                            <div class="project-technologies">
                                ${HTMLGenerator.renderList(project.technologies, (tech) => `<span class="tech-tag">${tech}</span>`)}
                            </div>
                        `)}
                        ${HTMLGenerator.renderIf(project.githubUrl || project.liveUrl, `
                            <div class="project-links">
                                ${project.githubUrl ? `
                                    <a href="${project.githubUrl}" target="_blank" class="project-link" title="GitHub">
                                        <i class="fab fa-github"></i>
                                        GitHub
                                    </a>
                                ` : ''}
                                ${project.liveUrl ? `
                                    <a href="${project.liveUrl}" target="_blank" class="project-link" title="Live Demo">
                                        <i class="fas fa-external-link-alt"></i>
                                        Live Demo
                                    </a>
                                ` : ''}
                            </div>
                        `)}
                    </div>
                </div>
            `);

            console.log('Generated HTML:', projectsHTML);
            DOMHelpers.setHTML(projectsContainer, projectsHTML);
            console.log('Projects content set successfully');
        }, { errorElement: 'projects-container' });

        manager.addSequentialAnimations(['.projects-section'], 400, 200);
    },

    links: async (manager) => {
        manager.addDOMPopulator(async function() {
            const contactLinksData = window.linksData.contact;
            const socialLinksData = window.linksData.social;
            
            const linksContainer = await DOMHelpers.getElement('links-content');
            
            const linksHTML = `
                <!-- Website & Contact Links -->
                <section class="links-section">
                    <h2 class="links-section-title" style="text-align: center;">
                        <i class="fas fa-globe"></i>
                        Website & Contact
                    </h2>
                    <div class="links-grid">
                        ${HTMLGenerator.renderList(contactLinksData, (link) => 
                            HTMLGenerator.linkCard(link, { cardClass: 'link-card website-card', external: true })
                        )}
                    </div>
                </section>

                <!-- Social Media Links -->
                <section class="links-section">
                    <h2 class="links-section-title" style="text-align: center;">
                        <i class="fas fa-share-alt"></i>
                        Social Media
                    </h2>
                    <div class="links-grid">
                        ${HTMLGenerator.renderList(socialLinksData, (link) => 
                            HTMLGenerator.linkCard(link, { cardClass: 'link-card social-card', external: true })
                        )}
                    </div>
                </section>

                <!-- Portfolio Links -->
                <section class="links-section">
                    <h2 class="links-section-title" style="text-align: center;">
                        <i class="fas fa-briefcase"></i>
                        Portfolio
                    </h2>
                    <div class="links-grid">
                        ${HTMLGenerator.renderList(window.linksData.portfolio, (link) => 
                            HTMLGenerator.linkCard(link, { 
                                cardClass: 'link-card portfolio-card', 
                                external: link.url.startsWith('http'),
                                showArrow: true 
                            })
                        )}
                    </div>
                </section>
            `;

            DOMHelpers.setHTML(linksContainer, linksHTML);
        }, { errorElement: 'links-content' });

        manager.addSequentialAnimations(['.links-section'], 200, 200);
    }
};

// Page initialization function
async function initializePage() {
    // Detect current page from document title or URL
    const pageName = getCurrentPageName();
    console.log('Initializing page:', pageName);
    
    if (PAGE_CONFIGS[pageName]) {
        console.log('Found config for page:', pageName);
        await PageManager.createAndInit(pageName, PAGE_CONFIGS[pageName]);
        console.log('Page initialization complete');
    } else {
        console.warn(`No configuration found for page: ${pageName}`);
    }
}

// Helper function to detect current page
function getCurrentPageName() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop();
    
    console.log('Path detection:', { fullPath: path, fileName: fileName });
    
    if (fileName === 'index.html' || fileName === '') return 'home';
    if (fileName === 'about.html') return 'about';
    if (fileName === 'cv.html') return 'cv';
    if (fileName === 'projects.html') return 'projects';
    if (fileName === 'links.html') return 'links';
    
    console.log('No matching page found, defaulting to home');
    return 'home'; // Default fallback
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting page initialization...');
    console.log('Current URL:', window.location.href);
    console.log('Available data:', {
        projectsData: window.projectsData,
        commonData: window.commonData,
        linksData: window.linksData
    });
    console.log('Available utilities:', {
        DOMHelpers: typeof DOMHelpers,
        HTMLGenerator: typeof HTMLGenerator,
        ErrorHandler: typeof ErrorHandler,
        PageManager: typeof PageManager
    });
    initializePage();
});