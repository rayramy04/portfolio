// Animation and configuration constants
const ANIMATION_DELAYS = {
    PAGE_TITLE: 200,
    SECTION_BASE: 400,
    SECTION_STORY: 500,
    SECTION_STRENGTHS: 550,
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

const RESUME_FILES = {
    JA: 'resume/resume-ja.pdf',
    EN: 'resume/resume-en.pdf'
};

// ===== LANGUAGE SYSTEM =====
function getCurrentLang() {
    return localStorage.getItem('siteLang') || window.commonData?.lang?.current || 'en';
}

function getText(obj) {
    if (typeof obj === 'string') return obj; // Fixed text
    const lang = getCurrentLang();
    return obj[lang] || obj['en'] || obj['ja'] || ''; // Fallback chain
}

function switchLanguage(lang) {
    localStorage.setItem('siteLang', lang);

    // Add fade-out animation
    document.body.style.opacity = '0.5';
    document.body.style.transition = 'opacity 0.3s ease-in-out';

    setTimeout(() => {
        location.reload();
    }, 300);
}

function initLanguageSwitcher() {
    const langSwitch = document.getElementById('lang-switch');
    if (!langSwitch || !window.commonData?.ui?.langSwitch) return;

    const currentLang = getCurrentLang();
    const langs = window.commonData.lang.available;

    langSwitch.innerHTML = langs.map(lang => {
        const config = window.commonData.ui.langSwitch[lang];
        const activeClass = lang === currentLang ? 'active' : '';
        return `
            <button class="lang-btn ${activeClass}" data-lang="${lang}">
                <span class="flag">${config.flag}</span>
                <span class="label">${config.label}</span>
            </button>
        `;
    }).join('');

    langSwitch.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang !== currentLang) {
                switchLanguage(lang);
            }
        });
    });
}

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
    initLanguageSwitcher();
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
    if (heroTitle) heroTitle.textContent = getText(subtitle);
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
    await initResumeButtons();
}

async function initAbout() {
    if (!window.aboutData) {
        console.error('aboutData not loaded');
        return;
    }
    const whoIAmContent = document.getElementById('who-i-am-content');
    if (whoIAmContent) {
        if (window.aboutData.personal) {
            const personalData = {
                ...window.aboutData.personal,
                description: window.aboutData.personal.description.map(item => getText(item))
            };
            whoIAmContent.innerHTML = HTMLGenerator.profileCard(personalData);
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
                .map(p => `<p>${getText(p)}</p>`).join('');
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
            timelineContainer.innerHTML = window.aboutData.timeline.map(item => {
                const transformedItem = {
                    ...item,
                    title: getText(item.title),
                    description: getText(item.description)
                };
                return HTMLGenerator.unifiedCardTemplate(transformedItem);
            }).join('');
        } else {
            showEmptyState(timelineContainer, {
                type: 'timeline',
                icon: EMPTY_STATE_CONFIG.icon,
                message: EMPTY_STATE_CONFIG.message
            });
        }
    }
    
    const strengthsContainer = document.getElementById('strengths-container');
    if (strengthsContainer) {
        strengthsContainer.className = 'grid-2-cols gap-sm cards-equal-height card-icons-primary';
        if (window.aboutData.strengths && window.aboutData.strengths.length > 0) {
            strengthsContainer.innerHTML = window.aboutData.strengths.map(item => {
                const highlightsList = item.highlights ?
                    `${item.highlights.map(h => `<p>• ${getText(h)}</p>`).join('')}` : '';
                const customDescription = `<p class="text-meta">${getText(item.description)}</p>${highlightsList}`;
                return HTMLGenerator.unifiedCardTemplate({
                    ...item,
                    description: customDescription
                });
            }).join('');
        } else {
            showEmptyState(strengthsContainer, {
                type: 'strengths',
                icon: EMPTY_STATE_CONFIG.icon,
                message: EMPTY_STATE_CONFIG.message
            });
        }
    }
    
    const interestsContainer = document.getElementById('interests-container');
    if (interestsContainer) {
        interestsContainer.className = 'interests-grid grid-3-cols gap-sm cards-equal-height card-icons-primary';
        if (window.aboutData.interests && window.aboutData.interests.length > 0) {
            interestsContainer.innerHTML = window.aboutData.interests.map(item => {
                const transformedItem = {
                    ...item,
                    description: getText(item.description)
                };
                return HTMLGenerator.unifiedCardTemplate(transformedItem);
            }).join('');
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
        { selector: '.strengths-section', delay: ANIMATION_DELAYS.SECTION_STRENGTHS },
        { selector: '.timeline-section', delay: ANIMATION_DELAYS.SECTION_TIMELINE },
        { selector: '.interests-section', delay: ANIMATION_DELAYS.SECTION_INTERESTS }
    ]);
}

async function initCV() {
    // Transform education data
    const educationData = window.cvData.education.map(item => ({
        ...item,
        institution: getText(item.institution),
        degree: getText(item.degree),
        description: getText(item.description)
    }));
    initContainer('education-container', educationData, HTMLGenerator.cvItem, {
        emptyState: { type: 'education', icon: EMPTY_STATE_CONFIG.icon, message: EMPTY_STATE_CONFIG.message }
    });

    // Transform experience data
    const experienceData = window.cvData.experience.map(item => ({
        ...item,
        position: getText(item.position),
        description: getText(item.description)
    }));
    initContainer('experience-container', experienceData, HTMLGenerator.cvItem, {
        emptyState: { type: 'experience', icon: EMPTY_STATE_CONFIG.icon, message: EMPTY_STATE_CONFIG.message }
    });

    const awardsContainer = document.getElementById('awards-container');
    if (awardsContainer) {
        if (window.cvData.awards && Object.keys(window.cvData.awards).length > 0) {
            // Transform awards data
            const transformedAwards = {};
            Object.keys(window.cvData.awards).forEach(year => {
                transformedAwards[year] = window.cvData.awards[year].map(award => ({
                    ...award,
                    title: getText(award.title),
                    description: getText(award.description)
                }));
            });
            awardsContainer.innerHTML = HTMLGenerator.awardsSection(transformedAwards);
        } else {
            showEmptyState(awardsContainer, {
                type: 'awards',
                icon: EMPTY_STATE_CONFIG.icon,
                message: EMPTY_STATE_CONFIG.message
            });
        }
    }

    // Transform certifications data
    const certificationsData = window.cvData.certifications.map(item => ({
        ...item,
        title: getText(item.title)
    }));
    initContainer('certifications-container', certificationsData, HTMLGenerator.certificationItem, {
        emptyState: { type: 'certifications', icon: EMPTY_STATE_CONFIG.icon, message: EMPTY_STATE_CONFIG.message }
    });

    // Transform grants data
    const grantsData = window.cvData.grants.map(item => ({
        ...item,
        description: getText(item.description)
    }));
    initContainer('grants-container', grantsData, HTMLGenerator.grantItem, {
        emptyState: { type: 'grants', icon: EMPTY_STATE_CONFIG.icon, message: EMPTY_STATE_CONFIG.message }
    });

    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        if (window.cvData.skills && window.cvData.skills.length > 0) {
            // Transform specialized skills descriptions
            const transformedSkills = window.cvData.skills.map(category => {
                if (category.category === "Specialized Skills") {
                    return {
                        ...category,
                        skills: category.skills.map(skill => ({
                            ...skill,
                            description: skill.description ? skill.description.map(desc => getText(desc)) : undefined
                        }))
                    };
                }
                return category;
            });
            skillsContainer.innerHTML = HTMLGenerator.skillsSection(transformedSkills, generateStars);
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

    animateElements([
        { selector: '.cv-section', delay: ANIMATION_DELAYS.SECTION_BASE }
    ]);
    await initResumeButtons('cv');
}

async function initProjects() {
    generateFilterButtons();

    // Transform projects data
    const transformedProjects = window.projectsData.map(project => ({
        ...project,
        description: getText(project.description)
    }));

    initContainer('projects-container', transformedProjects, HTMLGenerator.projectCard, {
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
        // Transform projects data
        const transformedProjects = filteredProjects.map(project => ({
            ...project,
            description: getText(project.description)
        }));
        projectsContainer.innerHTML = transformedProjects.map(project => HTMLGenerator.projectCard(project)).join('');
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

    // Transform contact links
    const contactLinks = window.linksData.contact?.length > 0
        ? window.linksData.contact.map(link => ({
            ...link,
            title: getText(link.title)
        }))
        : [];
    sections.push(HTMLGenerator.linksSection('Website & Contact', 'fas fa-globe',
        contactLinks, { cardClass: 'link-card website-card', external: true }));

    // Transform social links
    const socialLinks = window.linksData.social?.length > 0
        ? window.linksData.social.map(link => ({
            ...link,
            title: getText(link.title)
        }))
        : [];
    sections.push(HTMLGenerator.linksSection('Social Media', 'fas fa-share-alt',
        socialLinks, { cardClass: 'link-card social-card', external: true }));

    // Transform portfolio links
    const portfolioLinks = window.linksData.portfolio?.length > 0
        ? window.linksData.portfolio.map(link => ({
            ...link,
            title: getText(link.title)
        }))
        : [];
    sections.push(HTMLGenerator.linksSection('Portfolio', 'fas fa-briefcase',
        portfolioLinks, { cardClass: 'link-card portfolio-card', external: false }));

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

async function checkFileExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

async function initResumeButtons(suffix = '') {
    const containerIdSuffix = suffix ? `-${suffix}` : '';
    const btnIdSuffix = suffix ? `-${suffix}` : '';

    const container = document.getElementById(`resume-buttons${containerIdSuffix}`);
    const btnJA = document.getElementById(`resume-btn-ja${btnIdSuffix}`);
    const btnEN = document.getElementById(`resume-btn-en${btnIdSuffix}`);

    if (!container || !window.commonData?.resumeButtons) return;

    const [jaExists, enExists] = await Promise.all([
        checkFileExists(RESUME_FILES.JA),
        checkFileExists(RESUME_FILES.EN)
    ]);

    let hasVisibleButton = false;

    if (jaExists && btnJA) {
        const jaConfig = window.commonData.resumeButtons.ja;
        btnJA.innerHTML = `<i class="${jaConfig.icon}"></i> ${jaConfig.text}`;
        btnJA.style.display = 'inline-flex';
        hasVisibleButton = true;
    }

    if (enExists && btnEN) {
        const enConfig = window.commonData.resumeButtons.en;
        btnEN.innerHTML = `<i class="${enConfig.icon}"></i> ${enConfig.text}`;
        btnEN.style.display = 'inline-flex';
        hasVisibleButton = true;
    }

    if (hasVisibleButton) {
        container.style.display = 'flex';
        // Trigger animation for fade-in-up (same timing as page-title)
        if (suffix) {
            setTimeout(() => {
                container.classList.add('loaded');
            }, ANIMATION_DELAYS.PAGE_TITLE);
        }
    }
}

document.addEventListener('DOMContentLoaded', initializePage);