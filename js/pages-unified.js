// Animation and configuration constants
const ANIMATION_DELAYS = {
    PAGE_TITLE: 200,
    SECTION_BASE: 400,
    SECTION_STORY: 500,
    SECTION_TIMELINE: 600,
    SECTION_INTERESTS: 700,
    LINKS_SECTION: 200,
    PROJECT_FILTER: 200
};

const FILTER_CONFIG = {
    NO_RESULTS_THRESHOLD: 0,
    REFLOW_DELAY: 10
};

const EMPTY_STATE_CONFIG = {
    message: 'No items found.',
    icon: 'fas fa-inbox'
};

async function initializePage() {
    const pageName = getCurrentPageName();
    await initializeBase();
    switch (pageName) {
        case 'index': await initHome(); break;
        case 'about': await initAbout(); break;
        case 'cv': await initCV(); break;
        case 'projects': await initProjects(); break;
        case 'links': await initLinks(); break;
    }
}

async function initializeBase() {
    const pageBase = new PageBase('current');
    await pageBase.loadCommonComponents();
    initializeSEO();
    setTimeout(() => {
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle) pageTitle.classList.add('loaded');
    }, ANIMATION_DELAYS.PAGE_TITLE);
}

function initializeSEO() {
    if (!window.seoConfig) return;
    const pageName = getCurrentPageName();
    const head = document.head;
    const personScript = document.createElement('script');
    personScript.type = 'application/ld+json';
    personScript.textContent = JSON.stringify(window.seoConfig.person);
    head.appendChild(personScript);
    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.textContent = JSON.stringify(window.seoConfig.website);
    head.appendChild(websiteScript);
    if (window.seoConfig.pages[pageName]) {
        const pageScript = document.createElement('script');
        pageScript.type = 'application/ld+json';
        pageScript.textContent = JSON.stringify(window.seoConfig.pages[pageName]);
        head.appendChild(pageScript);
    }
}

async function initHome() {
    const { name, subtitle, keywords } = window.homeData.hero;
    const heroName = document.getElementById('hero-name');
    const heroTitle = document.getElementById('hero-title');
    const keywordsList = document.getElementById('keywords-list');
    if (heroName) heroName.textContent = name;
    if (heroTitle) heroTitle.textContent = subtitle;
    if (keywordsList) {
        keywordsList.innerHTML = keywords.map(keyword => 
            `<li class="keyword-item">${keyword}</li>`
        ).join('');
    }
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        const rootStyles = getComputedStyle(document.documentElement);
        const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
        const primaryLight = rootStyles.getPropertyValue('--color-primary-light').trim();
        const accentColors = [primaryColor, '#14b8a6', '#06b6d4', primaryLight];
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: accentColors },
                shape: { type: ['circle', 'triangle'], stroke: { width: 1, color: primaryColor } },
                opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1.5, opacity_min: 0.1, sync: false } },
                size: { value: 4, random: true, anim: { enable: true, speed: 2, size_min: 1, sync: false } },
                line_linked: { enable: true, distance: 120, color: primaryColor, opacity: 0.3, width: 1.5 },
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
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) heroContent.classList.add('loaded');
    }, 100);
}

async function initAbout() {
    if (!window.aboutData) {
        console.error('aboutData not loaded');
        return;
    }
    const whoIAmContent = document.getElementById('who-i-am-content');
    if (whoIAmContent) {
        if (window.aboutData.personal) {
            whoIAmContent.innerHTML = HTMLGenerator.profileCard(window.aboutData.personal);
        } else {
            showEmptyState(whoIAmContent, {
                type: 'personal',
                icon: EMPTY_STATE_CONFIG.icon,
                message: EMPTY_STATE_CONFIG.message
            });
        }
    }
    const storyContent = document.getElementById('story-content-inner');
    if (storyContent) {
        if (window.aboutData?.story?.paragraphs && window.aboutData.story.paragraphs.length > 0) {
            storyContent.innerHTML = window.aboutData.story.paragraphs
                .map(p => `<p>${p}</p>`).join('');
        } else {
            storyContent.innerHTML = HTMLGenerator.emptyStateMessage({
                icon: EMPTY_STATE_CONFIG.icon,
                message: 'No story available.',
                className: 'no-story-message'
            });
        }
    }
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        if (window.aboutData.timeline && window.aboutData.timeline.length > 0) {
            timelineContainer.innerHTML = window.aboutData.timeline.map(item => HTMLGenerator.unifiedCardTemplate(item)).join('');
        } else {
            showEmptyState(timelineContainer, {
                type: 'timeline',
                icon: EMPTY_STATE_CONFIG.icon,
                message: EMPTY_STATE_CONFIG.message
            });
        }
    }
    
    const interestsContainer = document.getElementById('interests-container');
    if (interestsContainer) {
        interestsContainer.className = 'interests-grid grid-3-cols gap-sm';
        if (window.aboutData.interests && window.aboutData.interests.length > 0) {
            interestsContainer.innerHTML = window.aboutData.interests.map(item => HTMLGenerator.unifiedCardTemplate(item)).join('');
        } else {
            showEmptyState(interestsContainer, {
                type: 'interests',
                icon: EMPTY_STATE_CONFIG.icon,
                message: EMPTY_STATE_CONFIG.message
            });
        }
    }
    animateElements([
        { selector: '.about-section', delay: ANIMATION_DELAYS.SECTION_BASE },
        { selector: '.story-section', delay: ANIMATION_DELAYS.SECTION_STORY },
        { selector: '.timeline-section', delay: ANIMATION_DELAYS.SECTION_TIMELINE },
        { selector: '.interests-section', delay: ANIMATION_DELAYS.SECTION_INTERESTS }
    ]);
}

async function initCV() {
    initContainer('education-container', window.cvData.education, HTMLGenerator.cvItem, {
        emptyState: { type: 'education', icon: EMPTY_STATE_CONFIG.icon, message: EMPTY_STATE_CONFIG.message }
    });
    initContainer('experience-container', window.cvData.experience, HTMLGenerator.cvItem, {
        emptyState: { type: 'experience', icon: EMPTY_STATE_CONFIG.icon, message: EMPTY_STATE_CONFIG.message }
    });
    
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        if (window.cvData.skills && window.cvData.skills.length > 0) {
            skillsContainer.innerHTML = HTMLGenerator.skillsSection(window.cvData.skills, generateStars);
            skillsContainer.querySelectorAll('.skills-category').forEach(cat => {
                cat.classList.add('hover-lift');
            });
        } else {
            showEmptyState(skillsContainer, {
                type: 'skills',
                icon: EMPTY_STATE_CONFIG.icon,
                message: EMPTY_STATE_CONFIG.message
            });
        }
    }
    
    initContainer('certifications-container', window.cvData.certifications, HTMLGenerator.certificationItem, {
        emptyState: { type: 'certifications', icon: EMPTY_STATE_CONFIG.icon, message: EMPTY_STATE_CONFIG.message }
    });
    
    const awardsContainer = document.getElementById('awards-container');
    if (awardsContainer) {
        if (window.cvData.awards && Object.keys(window.cvData.awards).length > 0) {
            awardsContainer.innerHTML = HTMLGenerator.awardsSection(window.cvData.awards);
        } else {
            showEmptyState(awardsContainer, {
                type: 'awards',
                icon: EMPTY_STATE_CONFIG.icon,
                message: EMPTY_STATE_CONFIG.message
            });
        }
    }
    
    initContainer('grants-container', window.cvData.grants, HTMLGenerator.grantItem, {
        emptyState: { type: 'grants', icon: EMPTY_STATE_CONFIG.icon, message: EMPTY_STATE_CONFIG.message }
    });
    
    animateElements([
        { selector: '.cv-section', delay: ANIMATION_DELAYS.SECTION_BASE }
    ]);
}

async function initProjects() {
    generateFilterButtons();
    
    initContainer('projects-container', window.projectsData, HTMLGenerator.projectCard, {
        containerClass: 'projects-grid grid-fixed gap-sm fade-in-up mb-section',
        emptyState: { type: 'projects', icon: EMPTY_STATE_CONFIG.icon, message: EMPTY_STATE_CONFIG.message }
    });
    
    initProjectFilters();
    
    animateElements([
        { selector: '.project-filters', delay: ANIMATION_DELAYS.SECTION_BASE },
        { selector: '.projects-grid', delay: ANIMATION_DELAYS.SECTION_BASE + 100 }
    ]);
}

function generateFilterButtons() {
    const filterContainer = document.querySelector('.project-filters');
    if (!filterContainer || !window.projectCategories) return;
    
    const allButton = '<button class="filter-btn active" data-category="all">All</button>';
    const categoryButtons = window.projectCategories.map(category => 
        `<button class="filter-btn" data-category="${category}">${category}</button>`
    ).join('');
    
    filterContainer.innerHTML = allButton + categoryButtons;
}

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            renderFilteredProjects(category);
        });
    });
}

function renderFilteredProjects(category) {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer || !window.projectsData) return;
    
    let filteredProjects;
    if (category === 'all') {
        filteredProjects = window.projectsData;
    } else {
        filteredProjects = window.projectsData.filter(project => 
            project.categories && project.categories.includes(category)
        );
    }
    
    if (filteredProjects.length > 0) {
        projectsContainer.innerHTML = filteredProjects.map(project => HTMLGenerator.projectCard(project)).join('');
        projectsContainer.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('fade-in-up');
        });
    } else {
        projectsContainer.innerHTML = HTMLGenerator.emptyStateMessage({
            icon: EMPTY_STATE_CONFIG.icon,
            message: EMPTY_STATE_CONFIG.message,
            className: 'no-projects-message fade-in-up'
        });
    }
    
    animateElements([
        { selector: '.project-card, .no-projects-message', delay: ANIMATION_DELAYS.SECTION_BASE }
    ]);
}

async function initLinks() {
    const linksContainer = document.getElementById('links-content');
    if (!linksContainer || !window.linksData) return;

    const sections = [];

    if (window.linksData.contact?.length > 0) {
        sections.push(HTMLGenerator.linksSection('Website & Contact', 'fas fa-globe', 
            window.linksData.contact, { cardClass: 'link-card website-card', external: true }));
    } else {
        sections.push(HTMLGenerator.linksSection('Website & Contact', 'fas fa-globe', [], { cardClass: 'link-card website-card', external: true }));
    }

    if (window.linksData.social?.length > 0) {
        sections.push(HTMLGenerator.linksSection('Social Media', 'fas fa-share-alt', 
            window.linksData.social, { cardClass: 'link-card social-card', external: true }));
    } else {
        sections.push(HTMLGenerator.linksSection('Social Media', 'fas fa-share-alt', [], { cardClass: 'link-card social-card', external: true }));
    }

  
    if (window.linksData.portfolio?.length > 0) {
        sections.push(HTMLGenerator.linksSection('Portfolio', 'fas fa-briefcase', 
            window.linksData.portfolio, { cardClass: 'link-card portfolio-card', external: false }));
    } else {
        sections.push(HTMLGenerator.linksSection('Portfolio', 'fas fa-briefcase', [], { cardClass: 'link-card portfolio-card', external: false }));
    }

    linksContainer.innerHTML = sections.join('');
    animateElements([
        { selector: '.links-section', delay: ANIMATION_DELAYS.LINKS_SECTION }
    ]);
}

function createLinksSection(title, icon, data, sectionId) {
    const hasData = data?.length > 0;
    return `
        <section class="links-section fade-in-up mb-section" id="${sectionId}-section">
            <h2 class="section-title">
                <i class="${icon}"></i>
                ${title}
            </h2>
            <div class="links-grid grid-auto-fit gap-sm">
                ${hasData ? data.map(link => HTMLGenerator.linkCard(link, { external: sectionId !== 'portfolio' })).join('') : ''}
            </div>
        </section>
    `;
}

function initContainer(containerId, data, generator, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (!data || (Array.isArray(data) && data.length === 0)) {
        if (options.emptyState) {
            showEmptyState(container, options.emptyState);
        }
        return;
    }
    
    if (Array.isArray(data)) {
        container.innerHTML = data.map(item => generator(item)).join('');
    } else {
        container.innerHTML = generator(data);
    }
    if (options.className || options.containerClass) {
        container.className = options.className || options.containerClass;
    }
    if (options.postProcess) {
        options.postProcess(container);
    }
}

function animateElements(animations) {
    animations.forEach(({ selector, delay }) => {
        setTimeout(() => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                if (selector.includes('.cv-section') || selector.includes('.about-section') || selector.includes('.links-section')) {
                    setTimeout(() => element.classList.add('loaded'), index * 100);
                } else {
                    element.classList.add('loaded');
                }
            });
        }, delay);
    });
}


function showEmptyState(container, config) {
    const className = config.className || `no-${config.type || 'items'}-message`;
    if (container.querySelector(`.${className}`)) return;
    
    const messageElement = document.createElement('div');
    messageElement.innerHTML = HTMLGenerator.emptyStateMessage({
        icon: config.icon,
        message: config.message,
        description: config.description,
        className: className
    });
    
    container.appendChild(messageElement.firstElementChild);
}

function hideEmptyState(container, config) {
    const className = config.className || `no-${config.type || 'items'}-message`;
    const messageEl = container.querySelector(`.${className}`);
    if (messageEl) {
        messageEl.remove();
    }
}


function getCurrentPageName() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop();
    if (fileName === 'index.html' || fileName === '') return 'index';
    if (fileName === 'about.html') return 'about';
    if (fileName === 'cv.html') return 'cv';
    if (fileName === 'projects.html') return 'projects';
    if (fileName === 'links.html') return 'links';
    return 'index';
}

function generateStars(level) {
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
}

document.addEventListener('DOMContentLoaded', initializePage);