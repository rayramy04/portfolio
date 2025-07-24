async function initializePage() {
    const pageName = getCurrentPageName();
    
    await initializeBase();
    
    switch (pageName) {
        case 'home':
            await initHome();
            break;
        case 'about':
            await initAbout();
            break;
        case 'cv':
            await initCV();
            break;
        case 'projects':
            await initProjects();
            break;
        case 'links':
            await initLinks();
            break;
    }
}

async function initializeBase() {
    const pageBase = new PageBase('current');
    await pageBase.loadCommonComponents();
    
    // Animate page title
    setTimeout(() => {
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle) pageTitle.classList.add('loaded');
    }, 200);
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
            `<li class="keyword-item hover-lift">${keyword}</li>`
        ).join('');
    }
    
    // Initialize particles
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        // Get colors from CSS variables
        const rootStyles = getComputedStyle(document.documentElement);
        const primaryColor = rootStyles.getPropertyValue('--color-primary').trim();
        const primaryLight = rootStyles.getPropertyValue('--color-primary-light').trim();
        const accentColors = [primaryColor, '#14b8a6', '#06b6d4', primaryLight]; // Keep some variety for particles
        
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: accentColors }, /* Dynamic colors from CSS variables */
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
    
    // Animate hero content
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) heroContent.classList.add('loaded');
    }, 100);
}

async function initAbout() {
    const personalData = window.aboutData.personal;
    
    const aboutName = document.getElementById('about-name');
    const aboutPosition = document.getElementById('about-position');
    const aboutDescription = document.getElementById('about-description');
    
    if (aboutName) aboutName.textContent = personalData.name;
    if (aboutPosition) aboutPosition.textContent = personalData.position;
    if (aboutDescription) aboutDescription.innerHTML = personalData.description;
    
    // Story content
    const storyContent = document.getElementById('story-content-inner');
    if (storyContent && window.aboutData?.story?.paragraphs) {
        storyContent.innerHTML = window.aboutData.story.paragraphs
            .map(p => `<p>${p}</p>`).join('');
    }
    
    // Timeline
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        timelineContainer.innerHTML = window.aboutData.timeline.map(item => `
            <div class="timeline-item hover-lift">
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h3>${item.period}</h3>
                        <h4>${item.title}</h4>
                    </div>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Interests
    const interestsContainer = document.getElementById('interests-container');
    if (interestsContainer) {
        interestsContainer.innerHTML = window.aboutData.interests.map(interest => `
            <div class="interest-card hover-lift">
                <div class="interest-icon">
                    <i class="${interest.icon}"></i>
                </div>
                <h3>${interest.title}</h3>
                <p>${interest.description}</p>
            </div>
        `).join('');
    }
    
    // Animate sections
    setTimeout(() => {
        document.querySelectorAll('.about-section').forEach(section => section.classList.add('loaded'));
    }, 100);
    setTimeout(() => document.querySelector('.timeline-section')?.classList.add('loaded'), 200);
    setTimeout(() => document.querySelector('.interests-section')?.classList.add('loaded'), 300);
}

async function initCV() {
    // Education
    const educationContainer = document.getElementById('education-container');
    if (educationContainer) {
        educationContainer.innerHTML = window.cvData.education.map(item => 
            HTMLGenerator.cvItem(item)
        ).join('');
    }
    
    // Experience
    const experienceContainer = document.getElementById('experience-container');
    if (experienceContainer) {
        experienceContainer.innerHTML = window.cvData.experience.map(item => 
            HTMLGenerator.cvItem(item)
        ).join('');
    }
    
    // Skills
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        skillsContainer.innerHTML = HTMLGenerator.skillsSection(window.cvData.skills, generateStars);
        // Add hover-lift class to skills categories
        skillsContainer.querySelectorAll('.skills-category').forEach(cat => {
            cat.classList.add('hover-lift');
        });
        skillsContainer.querySelectorAll('.skill-item').forEach(item => {
            item.classList.add('hover-lift');
        });
    }
    
    // Certifications
    const certificationsContainer = document.getElementById('certifications-container');
    if (certificationsContainer) {
        certificationsContainer.innerHTML = window.cvData.certifications.map(cert => 
            HTMLGenerator.certificationItem(cert)
        ).join('');
    }
    
    // Awards
    const awardsContainer = document.getElementById('awards-container');
    if (awardsContainer) {
        awardsContainer.innerHTML = HTMLGenerator.awardsSection(window.cvData.awards);
    }
    
    // Grants
    const grantsContainer = document.getElementById('grants-container');
    if (grantsContainer) {
        grantsContainer.innerHTML = window.cvData.grants.map(grant => 
            HTMLGenerator.grantItem(grant)
        ).join('');
    }
    
    // Animate sections
    setTimeout(() => {
        document.querySelectorAll('.cv-section').forEach((section, index) => {
            setTimeout(() => section.classList.add('loaded'), index * 100);
        });
    }, 400);
}

async function initProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = window.projectsData.map(project => `
            <div class="project-card hover-lift">
                ${project.image ? `
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.name || project.title}">
                    </div>
                ` : ''}
                <div class="project-content">
                    <h3>${project.name || project.title}</h3>
                    ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
                    ${project.technologies?.length ? `
                        <div class="project-technologies">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    ` : ''}
                    ${project.githubUrl || project.liveUrl ? `
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
                    ` : ''}
                </div>
            </div>
        `).join('');
    }
    
    // Animate projects section
    setTimeout(() => {
        document.querySelector('.projects-section')?.classList.add('loaded');
    }, 400);
}

async function initLinks() {
    const linksContainer = document.getElementById('links-content');
    if (linksContainer) {
        const contactLinksData = window.linksData.contact;
        const socialLinksData = window.linksData.social;
        
        linksContainer.innerHTML = `
            <section class="links-section">
                <h2 class="section-title" style="text-align: center;">
                    <i class="fas fa-globe"></i>
                    Website & Contact
                </h2>
                <div class="links-grid">
                    ${contactLinksData.map(link => HTMLGenerator.linkCard(link, { cardClass: 'link-card website-card', external: true })).join('')}
                </div>
            </section>
            
            <section class="links-section">
                <h2 class="section-title" style="text-align: center;">
                    <i class="fas fa-share-alt"></i>
                    Social Media
                </h2>
                <div class="links-grid">
                    ${socialLinksData.map(link => HTMLGenerator.linkCard(link, { cardClass: 'link-card social-card', external: true })).join('')}
                </div>
            </section>
            
            <section class="links-section">
                <h2 class="section-title" style="text-align: center;">
                    <i class="fas fa-briefcase"></i>
                    Portfolio
                </h2>
                <div class="links-grid">
                    ${window.linksData.portfolio.map(link => HTMLGenerator.linkCard(link, { 
                        cardClass: 'link-card portfolio-card', 
                        external: link.url.startsWith('http'),
                        showArrow: true 
                    })).join('')}
                </div>
            </section>
        `;
    }
    
    // Animate links sections
    setTimeout(() => {
        document.querySelectorAll('.links-section').forEach((section, index) => {
            setTimeout(() => section.classList.add('loaded'), index * 200);
        });
    }, 200);
}

function getCurrentPageName() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop();
    
    if (fileName === 'index.html' || fileName === '') return 'home';
    if (fileName === 'about.html') return 'about';
    if (fileName === 'cv.html') return 'cv';
    if (fileName === 'projects.html') return 'projects';
    if (fileName === 'links.html') return 'links';
    
    return 'home';
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