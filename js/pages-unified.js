// Animation delays constants
const ANIMATION_DELAYS = {
    PAGE_TITLE: 200,
    SECTION_BASE: 400,
    SECTION_STORY: 500,
    SECTION_TIMELINE: 600,
    SECTION_INTERESTS: 700,
    LINKS_SECTION: 200
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
        whoIAmContent.innerHTML = HTMLGenerator.profileCard(window.aboutData.personal);
    }
    const storyContent = document.getElementById('story-content-inner');
    if (storyContent && window.aboutData?.story?.paragraphs) {
        storyContent.innerHTML = window.aboutData.story.paragraphs
            .map(p => `<p>${p}</p>`).join('');
    }
    initContainer('timeline-container', window.aboutData.timeline, HTMLGenerator.unifiedCardTemplate);
    initContainer('interests-container', window.aboutData.interests, HTMLGenerator.unifiedCardTemplate, {
        className: 'interests-grid grid-auto-fit gap-sm'
    });
    animateElements([
        { selector: '.about-section', delay: ANIMATION_DELAYS.SECTION_BASE },
        { selector: '.story-section', delay: ANIMATION_DELAYS.SECTION_STORY },
        { selector: '.timeline-section', delay: ANIMATION_DELAYS.SECTION_TIMELINE },
        { selector: '.interests-section', delay: ANIMATION_DELAYS.SECTION_INTERESTS }
    ]);
}

async function initCV() {
    initContainer('education-container', window.cvData.education, HTMLGenerator.cvItem);
    initContainer('experience-container', window.cvData.experience, HTMLGenerator.cvItem);
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer && window.cvData.skills) {
        skillsContainer.innerHTML = HTMLGenerator.skillsSection(window.cvData.skills, generateStars);
        skillsContainer.querySelectorAll('.skills-category').forEach(cat => {
            cat.classList.add('hover-lift');
        });
    }
    initContainer('certifications-container', window.cvData.certifications, HTMLGenerator.certificationItem);
    const awardsContainer = document.getElementById('awards-container');
    if (awardsContainer && window.cvData.awards) {
        awardsContainer.innerHTML = HTMLGenerator.awardsSection(window.cvData.awards);
    }
    initContainer('grants-container', window.cvData.grants, HTMLGenerator.grantItem);
    animateElements([{ selector: '.cv-section', delay: ANIMATION_DELAYS.SECTION_BASE }]);
}

async function initProjects() {
    initContainer('projects-container', window.projectsData, HTMLGenerator.projectCard, {
        containerClass: 'projects-grid grid-auto-fit gap-sm fade-in-up mb-section'
    });
    animateElements([{ selector: '.projects-grid', delay: ANIMATION_DELAYS.SECTION_BASE }]);
}

async function initLinks() {
    const linksContainer = document.getElementById('links-content');
    if (!linksContainer || !window.linksData) return;

    const sections = [];

    // Safe data access with optional chaining and length checks
    if (window.linksData.contact?.length > 0) {
        sections.push(HTMLGenerator.linksSection('Website & Contact', 'fas fa-globe', 
            window.linksData.contact, { cardClass: 'link-card website-card', external: true }));
    }

    if (window.linksData.social?.length > 0) {
        sections.push(HTMLGenerator.linksSection('Social Media', 'fas fa-share-alt', 
            window.linksData.social, { cardClass: 'link-card social-card', external: true }));
    }

    if (window.linksData.portfolio?.length > 0) {
        sections.push(HTMLGenerator.linksSection('Portfolio', 'fas fa-briefcase', 
            window.linksData.portfolio, { 
                cardClass: 'link-card portfolio-card', 
                external: false
            }));
    }

    // Fallback for when no links are configured
    linksContainer.innerHTML = sections.length > 0 
        ? sections.join('') 
        : '<div class="no-links"><p>No links configured. Edit <code>data/links.js</code> to add your links.</p></div>';
    
    animateElements([{ selector: '.links-section', delay: ANIMATION_DELAYS.LINKS_SECTION }]);
}

function initContainer(containerId, data, generator, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!data) return;
    
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