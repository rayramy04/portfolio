// HTML Component Templates
const ComponentTemplates = {
    header: `
        <!-- Navigation -->
        <nav class="navbar" id="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="index.html">Ray's Portfolio</a>
                </div>
                <div class="nav-menu" id="nav-menu">
                    <a href="index.html" class="nav-link">Home</a>
                    <a href="about.html" class="nav-link">About</a>
                    <a href="cv.html" class="nav-link">CV</a>
                    <a href="projects.html" class="nav-link">Projects</a>
                    <a href="links.html" class="nav-link">Links</a>
                </div>
                <div class="nav-toggle" id="nav-toggle">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>
        </nav>
    `,
    
    footer: `
        <!-- Footer -->
        <footer class="footer">
            <div class="footer-content">
                <p class="copyright">&copy; Ray. All rights reserved.</p>
                <div class="footer-social" id="footer-social">
                    <!-- Social links will be populated dynamically -->
                </div>
            </div>
            <div class="back-to-top" id="back-to-top">
                <i class="fas fa-chevron-up"></i>
            </div>
        </footer>
    `
};

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Load header and footer components first
    loadComponents();
    
    // Initialize data
    await initializeData();
    
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize mobile menu and back-to-top functionality
    initializeMobileMenu();
    initializeBackToTop();
    
    // Initialize page-specific content after data is loaded
    initializePageContent();
});

function loadComponents() {
    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = ComponentTemplates.header;
    }
    
    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = ComponentTemplates.footer;
        // Setup footer social links (will populate when data is loaded)
        populateFooterSocial();
    }
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function initializeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

function initializeBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        // Scroll to top when clicked
        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initializePageContent() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    console.log('Initializing page content for:', currentPage);
    
    if (currentPage === 'index.html' || currentPage === '') {
        populateHeroContent();
    } else if (currentPage === 'about.html') {
        populateAboutContent();
        populateStoryContent();
        populateTimelineContent();
        populateInterestsContent();
    } else if (currentPage === 'cv.html') {
        populateCVContent();
    } else if (currentPage === 'projects.html') {
        populateProjectsContent();
    } else if (currentPage === 'links.html') {
        populateLinksContent();
    }
}

// Track if hero content has been populated to prevent duplicates
let heroContentPopulated = false;

// Page-specific content population functions
function populateHeroContent() {
    console.log('Hero: populateHeroContent function called');
    console.log('Hero: heroContentPopulated flag:', heroContentPopulated);
    
    if (heroContentPopulated) {
        console.log('Hero: Content already populated, skipping');
        return;
    }
    
    // First, check if DOM elements exist
    const heroName = document.getElementById('hero-name');
    const heroTitle = document.getElementById('hero-title');
    const keywordsList = document.getElementById('keywords-list');
    
    console.log('Hero: DOM elements check:', {
        heroName: !!heroName,
        heroTitle: !!heroTitle,
        keywordsList: !!keywordsList
    });
    
    if (!heroName || !heroTitle || !keywordsList) {
        console.error('Hero: Some required DOM elements are missing, retrying immediately');
        setTimeout(populateHeroContent, 0);
        return;
    }
    
    // Check if data is already available
    const existingData = getPortfolioData();
    if (existingData && existingData.hero && Object.keys(existingData.hero).length > 0) {
        console.log('Hero: Using existing data:', existingData.hero);
        updateHeroContent(existingData);
        return;
    }
    
    // Otherwise, wait for dataLoaded event
    document.addEventListener('dataLoaded', function(event) {
        const data = event.detail;
        console.log('Hero: Data loaded event received:', data);
        updateHeroContent(data);
    }, { once: true });
}

function updateHeroContent(data) {
    console.log('Hero: Updating content with data:', data);
    console.log('Hero: data.hero =', data.hero);
    
    if (data && data.hero) {
        const heroName = document.getElementById('hero-name');
        console.log('Hero: heroName element found:', !!heroName);
        if (heroName) {
            console.log('Hero: Current hero name content before update:', heroName.textContent);
            heroName.textContent = data.hero.name || 'Ray';
            console.log('Hero: Set hero name to:', heroName.textContent);
        } else {
            console.error('Hero: hero-name element not found in DOM');
        }

        const heroTitle = document.getElementById('hero-title');
        console.log('Hero: heroTitle element found:', !!heroTitle);
        if (heroTitle) {
            heroTitle.innerHTML = data.hero.subtitle || data.hero.title || 'Computer Science & Data Science Student';
            console.log('Hero: Set hero title to:', heroTitle.innerHTML);
        } else {
            console.error('Hero: hero-title element not found in DOM');
        }

        const keywordsList = document.getElementById('keywords-list');
        console.log('Hero: keywordsList element found:', !!keywordsList);
        console.log('Hero: keywords data:', data.hero.keywords);
        if (keywordsList && data.hero.keywords) {
            keywordsList.innerHTML = data.hero.keywords
                .map(keyword => `<li class="keyword-item">${keyword}</li>`)
                .join('');
            console.log('Hero: Set keywords to:', keywordsList.innerHTML);
        } else {
            if (!keywordsList) console.error('Hero: keywords-list element not found in DOM');
            if (!data.hero.keywords) console.error('Hero: keywords data is missing');
        }
        
        // Mark as populated to prevent future duplicates
        heroContentPopulated = true;
        console.log('Hero: Content populated successfully, flag set to true');
        
        // Initialize scroll animations (same as CV page)
        initializeScrollAnimations();
    } else {
        console.error('Hero: Hero data not found or invalid:', data);
    }
}

function populateAboutContent() {
    console.log('About: populateAboutContent function called');
    
    // Check if DOM elements exist first
    const aboutTitle = document.getElementById('about-title');
    const aboutName = document.getElementById('about-name');
    const aboutPosition = document.getElementById('about-position');
    const aboutDescription = document.getElementById('about-description');
    
    console.log('About: DOM elements check:', {
        aboutTitle: !!aboutTitle,
        aboutName: !!aboutName,
        aboutPosition: !!aboutPosition,
        aboutDescription: !!aboutDescription
    });
    
    if (!aboutTitle || !aboutName || !aboutPosition || !aboutDescription) {
        console.error('About: Some required DOM elements are missing, retrying immediately');
        setTimeout(populateAboutContent, 0);
        return;
    }
    
    // Check if data is already available
    const existingData = getPortfolioData();
    if (existingData && existingData.personal && Object.keys(existingData.personal).length > 0) {
        console.log('About: Using existing data:', existingData.personal);
        updateAboutContent(existingData);
        return;
    }
    
    // Otherwise, wait for dataLoaded event
    document.addEventListener('dataLoaded', function(event) {
        const data = event.detail;
        console.log('About: Data loaded event received:', data);
        updateAboutContent(data);
    }, { once: true });
}

function updateAboutContent(data) {
    console.log('About: updateAboutContent called with data:', data);
    
    if (data && data.personal) {
        const aboutTitle = document.getElementById('about-title');
        if (aboutTitle) aboutTitle.textContent = "Who I Am";

        const aboutName = document.getElementById('about-name');
        if (aboutName) aboutName.textContent = data.personal.name;

        const aboutPosition = document.getElementById('about-position');
        if (aboutPosition) aboutPosition.textContent = data.personal.position;

        const aboutDescription = document.getElementById('about-description');
        if (aboutDescription) aboutDescription.textContent = data.personal.description;
        
        console.log('About: Personal content populated successfully');
        
        // Initialize scroll animations (same as CV page)
        initializeScrollAnimations();
    } else {
        console.error('About: Personal data not found:', data);
    }
}

function populateStoryContent() {
    console.log('Story: populateStoryContent function called');
    
    // Check if DOM elements exist first
    const storyContent = document.getElementById('story-content');
    
    if (!storyContent) {
        console.error('Story: story-content element not found, retrying immediately');
        setTimeout(populateStoryContent, 0);
        return;
    }
    
    // Check if data is already available
    const existingData = getPortfolioData();
    if (existingData && existingData.story && existingData.story.paragraphs) {
        console.log('Story: Using existing data:', existingData.story);
        updateStoryContent(existingData);
        return;
    }
    
    // Otherwise, wait for dataLoaded event
    document.addEventListener('dataLoaded', function(event) {
        const data = event.detail;
        console.log('Story: Data loaded event received:', data);
        updateStoryContent(data);
    }, { once: true });
}

function updateStoryContent(data) {
    console.log('Story: updateStoryContent called with data:', data);
    
    if (data && data.story && data.story.paragraphs) {
        const storyContent = document.getElementById('story-content');
        if (storyContent) {
            storyContent.innerHTML = data.story.paragraphs
                .map(paragraph => `<p>${paragraph}</p>`)
                .join('');
            console.log('Story: Content populated successfully');
        }
    } else {
        console.error('Story: Story data not found:', data);
    }
}

function populateTimelineContent() {
    console.log('Timeline: populateTimelineContent function called');
    
    // Check if DOM elements exist first
    const timelineContainer = document.getElementById('timeline-container');
    
    if (!timelineContainer) {
        console.error('Timeline: timeline-container element not found, retrying immediately');
        setTimeout(populateTimelineContent, 0);
        return;
    }
    
    // Check if data is already available
    const existingData = getPortfolioData();
    if (existingData && existingData.timeline && existingData.timeline.length > 0) {
        console.log('Timeline: Using existing data:', existingData.timeline);
        updateTimelineContent(existingData);
        return;
    }
    
    // Otherwise, wait for dataLoaded event
    document.addEventListener('dataLoaded', function(event) {
        const data = event.detail;
        console.log('Timeline: Data loaded event received:', data);
        updateTimelineContent(data);
    }, { once: true });
}

function updateTimelineContent(data) {
    console.log('Timeline: updateTimelineContent called with data:', data);
    
    if (data && data.timeline) {
        const timelineContainer = document.getElementById('timeline-container');
        if (timelineContainer) {
            timelineContainer.innerHTML = data.timeline.map((item, index) => `
                <div class="timeline-item">
                    <div class="timeline-marker">
                        <i class="fas fa-${item.icon}"></i>
                    </div>
                    <div class="timeline-content">
                        <h3>${item.date}</h3>
                        <h4>${item.title}</h4>
                        <h5>${item.subtitle}</h5>
                        <p>${item.description}</p>
                    </div>
                </div>
            `).join('');
            console.log('Timeline: Content populated successfully');
        }
    } else {
        console.error('Timeline: Timeline data not found:', data);
    }
}

function populateInterestsContent() {
    console.log('Interests: populateInterestsContent function called');
    
    // Check if DOM elements exist first
    const interestsContainer = document.getElementById('interests-container');
    
    if (!interestsContainer) {
        console.error('Interests: interests-container element not found, retrying immediately');
        setTimeout(populateInterestsContent, 0);
        return;
    }
    
    // Check if data is already available
    const existingData = getPortfolioData();
    if (existingData && existingData.interests && existingData.interests.length > 0) {
        console.log('Interests: Using existing data:', existingData.interests);
        updateInterestsContent(existingData);
        return;
    }
    
    // Otherwise, wait for dataLoaded event
    document.addEventListener('dataLoaded', function(event) {
        const data = event.detail;
        console.log('Interests: Data loaded event received:', data);
        updateInterestsContent(data);
    }, { once: true });
}

function updateInterestsContent(data) {
    console.log('Interests: updateInterestsContent called with data:', data);
    
    if (data && data.interests) {
        const interestsContainer = document.getElementById('interests-container');
        if (interestsContainer) {
            interestsContainer.innerHTML = data.interests.map((interest, index) => `
                <div class="interest-card">
                    <div class="interest-icon">
                        <i class="${interest.icon}"></i>
                    </div>
                    <h3>${interest.title}</h3>
                    <p>${interest.description}</p>
                </div>
            `).join('');
            console.log('Interests: Content populated successfully');
        }
    } else {
        console.error('Interests: Interests data not found:', data);
    }
}

function populateCVContent() {
    console.log('CV: populateCVContent function called');
    
    // Check if DOM elements exist first
    const educationContainer = document.getElementById('education-container');
    const experienceContainer = document.getElementById('experience-container');
    const skillsContainer = document.getElementById('skills-container');
    const awardsContainer = document.getElementById('awards-container');
    const certificationsContainer = document.getElementById('certifications-container');
    const grantsContainer = document.getElementById('grants-container');
    
    console.log('CV: DOM elements check:', {
        educationContainer: !!educationContainer,
        experienceContainer: !!experienceContainer,
        skillsContainer: !!skillsContainer,
        awardsContainer: !!awardsContainer,
        certificationsContainer: !!certificationsContainer,
        grantsContainer: !!grantsContainer
    });
    
    console.log('CV: Grants container element:', grantsContainer);
    
    if (!educationContainer || !experienceContainer || !skillsContainer || 
        !awardsContainer || !certificationsContainer || !grantsContainer) {
        console.error('CV: Some required DOM elements are missing, retrying immediately');
        setTimeout(populateCVContent, 0);
        return;
    }
    
    // Check if data is already available
    const existingData = getPortfolioData();
    if (existingData && existingData.education && existingData.education.length > 0) {
        console.log('CV: Using existing data');
        updateCVContent(existingData);
        return;
    }
    
    // Otherwise, wait for dataLoaded event
    document.addEventListener('dataLoaded', function(event) {
        const data = event.detail;
        console.log('CV: Data loaded event received:', data);
        updateCVContent(data);
    }, { once: true });
}

function updateCVContent(data) {
    console.log('CV: updateCVContent called with data:', data);
    console.log('CV: Grants data specifically:', data.grants);
    
    // Education
    if (data.education && data.education.length > 0) {
        const container = document.getElementById('education-container');
        if (container) {
            container.innerHTML = data.education.map(edu => `
                <div class="cv-item">
                    <div class="cv-item-header">
                        <div>
                            <h3>${edu.institution}</h3>
                            <p class="cv-degree">${edu.degree}</p>
                        </div>
                        <div>
                            <p class="cv-date">${edu.period}</p>
                        </div>
                    </div>
                    <div class="cv-item-content">
                        <p>${edu.description}</p>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Experience
    if (data.experience && data.experience.length > 0) {
        const container = document.getElementById('experience-container');
        if (container) {
            container.innerHTML = data.experience.map(exp => `
                <div class="cv-item">
                    <div class="cv-item-header">
                        <div>
                            <h3>${exp.title}</h3>
                            <p class="cv-company">${exp.company}</p>
                        </div>
                        <div>
                            <p class="cv-date">${exp.period}</p>
                        </div>
                    </div>
                    <div class="cv-item-content">
                        <p>${exp.description}</p>
                        <ul class="cv-responsibilities">
                            ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Skills
    if (data.skills && data.skills.length > 0) {
        const container = document.getElementById('skills-container');
        if (container) {
            container.innerHTML = data.skills.map(category => `
                <div class="skill-category">
                    <h3>${category.category}</h3>
                    <div class="skills-list">
                        ${category.skills.map(skill => {
                            // Convert percentage to 5-star rating
                            const stars = Math.round(skill.level / 20);
                            const starDisplay = Array.from({length: 5}, (_, i) => 
                                i < stars ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'
                            ).join('');
                            
                            return `
                                <div class="skill-item">
                                    <div class="skill-info">
                                        <span class="skill-name">${skill.name}</span>
                                        <div class="skill-stars">
                                            ${starDisplay}
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Awards - Sort from newest to oldest
    if (data.awards && Object.keys(data.awards).length > 0) {
        const container = document.getElementById('awards-container');
        if (container) {
            // Sort years in descending order (newest first)
            const sortedYears = Object.keys(data.awards).sort((a, b) => parseInt(b) - parseInt(a));
            
            let awardsHtml = '';
            sortedYears.forEach(year => {
                awardsHtml += `<div class="awards-year"><h3>${year}</h3>`;
                
                data.awards[year].forEach(award => {
                    // Extract month and day from date if available
                    let dateDisplay = '';
                    if (award.date) {
                        const dateObj = new Date(award.date);
                        const month = dateObj.toLocaleString('default', { month: 'short' });
                        const day = dateObj.getDate();
                        dateDisplay = `${month} ${day}`;
                    }
                    
                    awardsHtml += `
                        <div class="cv-item">
                            <div class="cv-item-header">
                                <div>
                                    <h3>${award.title}</h3>
                                    <p class="award-org">${award.organization}</p>
                                </div>
                                ${dateDisplay ? `<div><p class="cv-date">${dateDisplay}</p></div>` : ''}
                            </div>
                            <p>${award.description}</p>
                        </div>
                    `;
                });
                
                awardsHtml += '</div>';
            });
            
            container.innerHTML = awardsHtml;
        }
    }
    
    // Certifications - Simplified display
    if (data.certifications && data.certifications.length > 0) {
        const container = document.getElementById('certifications-container');
        if (container) {
            container.innerHTML = data.certifications.map(cert => {
                // Extract year and month from date
                const dateObj = new Date(cert.date);
                const year = dateObj.getFullYear();
                const month = dateObj.toLocaleString('default', { month: 'short' });
                const dateDisplay = `${month} ${year}`;
                
                return `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <div>
                                <h3>${cert.title}</h3>
                                <p class="cert-org">${cert.organization}</p>
                            </div>
                            <div>
                                <p class="cv-date">${dateDisplay}</p>
                                ${cert.score ? `<p class="cert-score">${cert.score}</p>` : ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
    
    // Grants
    if (data.grants && data.grants.length > 0) {
        const container = document.getElementById('grants-container');
        if (container) {
            container.innerHTML = data.grants.map(grant => `
                <div class="cv-item">
                    <div class="cv-item-header">
                        <div>
                            <h3>${grant.title}</h3>
                            <p class="grant-org">${grant.organization}</p>
                        </div>
                        <div>
                            <p class="cv-date">${grant.year}</p>
                            <p class="grant-amount">${grant.amount}</p>
                        </div>
                    </div>
                    <p>${grant.description}</p>
                </div>
            `).join('');
        }
    }
    
    console.log('CV: All content populated successfully');
    
    // Initialize Intersection Observer for CV sections
    initializeCVScrollAnimations();
}

// Universal Scroll Animations with Intersection Observer
function initializeCVScrollAnimations() {
    initializeScrollAnimations();
}

function initializeScrollAnimations() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Create observer options
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '-20% 0px -20% 0px', // Trigger when 20% visible
        threshold: 0.1 // At least 10% visible
    };
    
    // Create the observer
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add loaded class with a slight delay for smoother effect
                setTimeout(() => {
                    entry.target.classList.add('loaded');
                }, 100);
                
                // Stop observing this element once animated
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Define selectors for each page
    let selectors = [];
    
    switch(currentPage) {
        case 'cv.html':
            selectors = ['.cv-section'];
            break;
        case 'index.html':
        case '':
            selectors = ['.hero-content'];
            break;
        case 'about.html':
            selectors = ['.about-section', '.timeline-section', '.interests-section'];
            break;
        case 'projects.html':
            selectors = ['.projects-section'];
            break;
        case 'links.html':
            selectors = ['.links-section'];
            break;
    }
    
    // Observe all matching elements
    let totalElements = 0;
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            sectionObserver.observe(element);
            totalElements++;
        });
    });
    
    console.log(`${currentPage}: Intersection Observer initialized for ${totalElements} elements`);
}

function populateProjectsContent() {
    console.log('Projects: populateProjectsContent function called');
    
    // Check if DOM elements exist first
    const projectsContainer = document.getElementById('projects-container');
    
    console.log('Projects: DOM elements check:', {
        projectsContainer: !!projectsContainer
    });
    
    if (!projectsContainer) {
        console.error('Projects: projects-container element not found, retrying immediately');
        setTimeout(populateProjectsContent, 0);
        return;
    }
    
    // Check if data is already available
    const existingData = getPortfolioData();
    if (existingData && existingData.projects && existingData.projects.length > 0) {
        console.log('Portfolio: Using existing data:', existingData.projects);
        updateProjectsContent(existingData);
        return;
    }
    
    // Otherwise, wait for dataLoaded event
    document.addEventListener('dataLoaded', function(event) {
        const data = event.detail;
        console.log('Portfolio: Data loaded event received:', data);
        updateProjectsContent(data);
    }, { once: true });
}

function updateProjectsContent(data) {
    console.log('Projects: updateProjectsContent called with data:', data);
    
    const projects = data.projects || [];
    const projectsContainer = document.getElementById('projects-container');
    
    if (projectsContainer && projects.length > 0) {
        projectsContainer.className = 'projects-grid';
        projectsContainer.innerHTML = projects.map(project => `
            <div class="project-item">
                <div class="project-card">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.name}">
                        <div class="project-overlay">
                            <div class="project-links">
                                ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link">
                                    <i class="fab fa-github"></i>
                                </a>` : ''}
                                ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-link">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>${project.name}</h3>
                        <p>${project.longDescription || project.description}</p>
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        console.log('Projects: Content populated successfully');
        
        // Initialize scroll animations (same as CV page)
        initializeScrollAnimations();
    } else {
        console.error('Projects: No projects data or container not found');
    }
}

function populateLinksContent() {
    console.log('Links: populateLinksContent function called');
    
    // Check if DOM elements exist first
    const linksContent = document.getElementById('links-content');
    
    if (!linksContent) {
        console.error('Links: links-content element not found, retrying immediately');
        setTimeout(populateLinksContent, 0);
        return;
    }
    
    // Check if data is already available
    const existingData = getPortfolioData();
    if (existingData && (existingData.contactLinks || existingData.socialLinks)) {
        console.log('Links: Using existing data');
        updateLinksContent(existingData);
        return;
    }
    
    // Otherwise, wait for dataLoaded event
    document.addEventListener('dataLoaded', function(event) {
        const data = event.detail;
        console.log('Links: Data loaded event received:', data);
        updateLinksContent(data);
    }, { once: true });
}

function updateLinksContent(data) {
    console.log('Links: updateLinksContent called with data:', data);
    
    const linksContent = document.getElementById('links-content');
    
    if (!linksContent || !data) {
        console.error('Links: Missing elements or data');
        return;
    }

        let html = '';

        // Website & Contact Section
        if (data.contactLinks) {
            html += `
                <section class="links-section">
                    <h2 class="links-section-title">
                        <i class="fas fa-globe"></i>
                        Website & Contact
                    </h2>
                    <div class="links-grid">
            `;
            
            data.contactLinks.forEach((link, index) => {
                html += `
                    <a href="${link.url}" target="_blank" class="link-card website-card">
                        <div class="link-card-content">
                            <div class="link-icon">
                                <i class="${link.icon}"></i>
                            </div>
                            <h3>${link.title}</h3>
                        </div>
                        <div class="link-arrow">
                            <i class="fas fa-external-link-alt"></i>
                        </div>
                    </a>
                `;
            });
            
            html += `
                    </div>
                </section>
            `;
        }

        // Social Media Section
        if (data.socialLinks) {
            html += `
                <section class="links-section">
                    <h2 class="links-section-title">
                        <i class="fas fa-share-alt"></i>
                        SNS & Media
                    </h2>
                    <div class="links-grid">
            `;
            
            data.socialLinks.forEach((social, index) => {
                html += `
                    <a href="${social.url}" target="_blank" class="link-card social-card">
                        <div class="link-card-content">
                            <div class="link-icon">
                                <i class="${social.icon}"></i>
                            </div>
                            <h3>${social.title}</h3>
                        </div>
                        <div class="link-arrow">
                            <i class="fas fa-external-link-alt"></i>
                        </div>
                    </a>
                `;
            });
            
            html += `
                    </div>
                </section>
            `;
        }

        // Projects Internal Link
        html += `
            <section class="links-section">
                <h2 class="links-section-title">
                    <i class="fas fa-folder-open"></i>
                    Projects
                </h2>
                <div class="links-grid">
                    <a href="projects.html" class="link-card projects-card">
                        <div class="link-card-content">
                            <div class="link-icon">
                                <i class="fas fa-code"></i>
                            </div>
                            <h3>Projects</h3>
                        </div>
                        <div class="link-arrow">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </a>
                </div>
            </section>
        `;

        linksContent.innerHTML = html;
        console.log('Links: Content populated successfully');
        
        // Initialize scroll animations (same as CV page)
        initializeScrollAnimations();
}

// Populate footer social links
function populateFooterSocial() {
    console.log('Footer: populateFooterSocial function called');
    
    // First check if footer element exists
    const footerSocial = document.getElementById('footer-social');
    if (!footerSocial) {
        console.error('Footer: footer-social element not found, retrying immediately');
        setTimeout(populateFooterSocial, 0);
        return;
    }
    
    // Check if data is already available
    const existingData = getPortfolioData();
    if (existingData && existingData.socialLinks && existingData.socialLinks.length > 0) {
        console.log('Footer: Using existing social data:', existingData.socialLinks);
        updateFooterSocial(existingData);
        return;
    }
    
    // Otherwise, wait for dataLoaded event
    document.addEventListener('dataLoaded', function(event) {
        const data = event.detail;
        console.log('Footer: Data loaded event received:', data);
        updateFooterSocial(data);
    }, { once: true });
}

function updateFooterSocial(data) {
    const footerSocial = document.getElementById('footer-social');
    
    console.log('Footer: updateFooterSocial called with data:', data);
    console.log('Footer: Social element found:', !!footerSocial);
    console.log('Footer: Social links data:', data.socialLinks);
    
    if (footerSocial && data.socialLinks && data.socialLinks.length > 0) {
        footerSocial.innerHTML = data.socialLinks.map(social => `
            <a href="${social.url}" target="_blank" title="${social.title}">
                <i class="${social.icon}"></i>
            </a>
        `).join('');
        console.log('Footer: Social links populated successfully with HTML:', footerSocial.innerHTML);
    } else {
        console.error('Footer: Failed to populate social links', {
            footerSocial: !!footerSocial,
            socialLinks: data.socialLinks,
            socialLinksLength: data.socialLinks ? data.socialLinks.length : 0
        });
    }
}