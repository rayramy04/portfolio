// HTML Component Templates for dynamic injection
const ComponentTemplates = {
    header: `
        <!-- Main Navigation Bar -->
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
        <!-- Site Footer with Social Links -->
        <footer class="footer">
            <div class="footer-content">
                <p class="copyright">&copy; Ray. All rights reserved.</p>
                <div class="footer-social" id="footer-social">
                    <!-- Social media links populated dynamically -->
                </div>
            </div>
            <div class="back-to-top" id="back-to-top">
                <i class="fas fa-chevron-up"></i>
            </div>
        </footer>
    `
};

// Initialize application when DOM content is fully loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Load reusable components (header/footer)
    loadComponents();
    
    // Initialize data loading system
    await initializeData();
    
    // Highlight current page in navigation
    setActiveNavLink();
    
    // Setup interactive elements
    initializeMobileMenu();
    initializeBackToTop();
    initializeNavbarEffects();
    
    // Load page-specific content based on current page
    initializePageContent();
    
    // Initialize particles and animations
    initializeParticles();
});

function loadComponents() {
    // Inject header component into designated placeholder
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = ComponentTemplates.header;
    }
    
    // Inject footer component and initialize social links
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = ComponentTemplates.footer;
        // Social links will be populated when data loads
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

function initializeNavbarEffects() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initializeParticles() {
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

// Utility function for DOM element checking and retry logic
function ensureElementsExist(elementIds, callback, maxRetries = 3, delay = 0) {
    let retryCount = 0;
    
    const checkElements = () => {
        const elements = {};
        let allExist = true;
        
        elementIds.forEach(id => {
            elements[id] = document.getElementById(id);
            if (!elements[id]) {
                allExist = false;
            }
        });
        
        if (allExist) {
            callback(elements);
        } else if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(checkElements, delay);
        } else {
            console.error('Required DOM elements not found:', elementIds.filter(id => !elements[id]));
        }
    };
    
    checkElements();
}

// Page-specific content population functions
function populateHeroContent() {
    if (heroContentPopulated) return;
    
    ensureElementsExist(['hero-name', 'hero-title', 'keywords-list'], (elements) => {
        const existingData = getPortfolioData();
        if (existingData && existingData.hero && Object.keys(existingData.hero).length > 0) {
            updateHeroContent(existingData);
            return;
        }
        
        document.addEventListener('dataLoaded', function(event) {
            updateHeroContent(event.detail);
        }, { once: true });
    });
}

function updateHeroContent(data) {
    if (data && data.hero) {
        const heroName = document.getElementById('hero-name');
        const heroTitle = document.getElementById('hero-title');
        const keywordsList = document.getElementById('keywords-list');
        
        if (heroName) heroName.textContent = data.hero.name || 'Ray';
        if (heroTitle) heroTitle.innerHTML = data.hero.subtitle || data.hero.title || 'Computer Science & Data Science Student';
        if (keywordsList && data.hero.keywords) {
            keywordsList.innerHTML = data.hero.keywords
                .map(keyword => `<li class="keyword-item">${keyword}</li>`)
                .join('');
        }
        
        heroContentPopulated = true;
        initializeScrollAnimations();
    }
}

function populateAboutContent() {
    const elements = ['about-title', 'about-name', 'about-position', 'about-description'];
    if (!elements.every(id => document.getElementById(id))) {
        setTimeout(populateAboutContent, 0);
        return;
    }
    
    const existingData = getPortfolioData();
    if (existingData && existingData.personal && Object.keys(existingData.personal).length > 0) {
        updateAboutContent(existingData);
        return;
    }
    
    document.addEventListener('dataLoaded', function(event) {
        updateAboutContent(event.detail);
    }, { once: true });
}

function updateAboutContent(data) {
    if (data && data.personal) {
        const elements = {
            'about-title': 'Who I Am',
            'about-name': data.personal.name,
            'about-position': data.personal.position,
            'about-description': data.personal.description.replace(/\n/g, '<br>')
        };
        
        Object.entries(elements).forEach(([id, content]) => {
            const element = document.getElementById(id);
            if (element) element[id === 'about-description' ? 'innerHTML' : 'textContent'] = content;
        });
        
        initializeScrollAnimations();
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
            
            // Add loaded class to story section for transition
            const storySection = document.querySelector('.story-section');
            if (storySection) {
                setTimeout(() => {
                    storySection.classList.add('loaded');
                }, 100);
            }
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
                        <div class="timeline-header">
                            <h3>${item.date}</h3>
                            <h4>${item.title}</h4>
                        </div>
                        ${item.subtitle ? `<h5>${item.subtitle}</h5>` : ''}
                        <p>${item.description}</p>
                    </div>
                </div>
            `).join('');
            console.log('Timeline: Content populated successfully');
            
            // Add loaded class to timeline section for transition
            const timelineSection = document.querySelector('.timeline-section');
            if (timelineSection) {
                setTimeout(() => {
                    timelineSection.classList.add('loaded');
                }, 100);
            }
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
            
            // Add loaded class to interests section for transition
            const interestsSection = document.querySelector('.interests-section');
            if (interestsSection) {
                setTimeout(() => {
                    interestsSection.classList.add('loaded');
                }, 100);
            }
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
            container.innerHTML = data.experience.map(exp => {
                const cardContent = `
                    <div class="cv-item-header">
                        <div>
                            <h3>${exp.company}</h3>
                            <p class="cv-company">${exp.title}</p>
                        </div>
                        <div>
                            <p class="cv-date">${exp.period}</p>
                        </div>
                    </div>
                    <div class="cv-item-content">
                        <p>${exp.description}</p>
                    </div>
                `;
                
                if (exp.link) {
                    return `
                        <div class="cv-item cv-item-linkable">
                            <a href="${exp.link}" target="_blank" class="cv-item-overlay">
                                <div class="cv-item-overlay-content">
                                    <div class="cv-item-link-icon">
                                        <i class="fas fa-external-link-alt"></i>
                                    </div>
                                </div>
                            </a>
                            ${cardContent}
                        </div>
                    `;
                } else {
                    return `
                        <div class="cv-item">
                            ${cardContent}
                        </div>
                    `;
                }
            }).join('');
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
                            // Use direct 1-5 star rating
                            const stars = skill.level;
                            const starDisplay = Array.from({length: 5}, (_, i) => 
                                i < stars ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'
                            ).join('');
                            
                            // Handle description as array for bullet points or string for regular text
                            let descriptionHtml = '';
                            if (skill.description) {
                                if (Array.isArray(skill.description)) {
                                    descriptionHtml = `<ul class="skill-description-list">${skill.description.map(item => `<li>${item}</li>`).join('')}</ul>`;
                                } else {
                                    descriptionHtml = `<p class="skill-description">${skill.description}</p>`;
                                }
                            }
                            
                            return `
                                <div class="skill-item">
                                    <div class="skill-info">
                                        <span class="skill-name">${skill.name}</span>
                                        <div class="skill-stars">
                                            ${starDisplay}
                                        </div>
                                    </div>
                                    ${descriptionHtml}
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
                    // Use date as-is from JSON
                    const dateDisplay = award.date || '';
                    
                    const cardContent = `
                        <div class="cv-item-header">
                            <div>
                                <h3>${award.title}</h3>
                                <p class="award-org">${award.organization}</p>
                            </div>
                            ${dateDisplay ? `<div><p class="cv-date">${dateDisplay}</p></div>` : ''}
                        </div>
                        <p>${award.description}</p>
                    `;
                    
                    if (award.link) {
                        awardsHtml += `
                            <div class="cv-item cv-item-linkable">
                                <a href="${award.link}" target="_blank" class="cv-item-overlay">
                                    <div class="cv-item-overlay-content">
                                        <div class="cv-item-link-icon">
                                            <i class="fas fa-external-link-alt"></i>
                                        </div>
                                    </div>
                                </a>
                                ${cardContent}
                            </div>
                        `;
                    } else {
                        awardsHtml += `
                            <div class="cv-item">
                                ${cardContent}
                            </div>
                        `;
                    }
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
                // Use date as-is from JSON
                const dateDisplay = cert.date || '';
                
                return `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <div>
                                <h3>${cert.title}</h3>
                                <p class="cert-org">${cert.organization}</p>
                            </div>
                            <div>
                                <p class="cv-date">${dateDisplay}</p>
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
            container.innerHTML = data.grants.map(grant => {
                // Use date as-is from JSON
                const dateDisplay = grant.date || '';
                
                return `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <div>
                                <h3>${grant.title}</h3>
                                <p class="grant-org">${grant.organization}</p>
                            </div>
                            <div>
                                <p class="cv-date">${dateDisplay}</p>
                                <p class="grant-amount">${grant.amount}</p>
                            </div>
                        </div>
                        <p>${grant.description}</p>
                    </div>
                `;
            }).join('');
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
    
    // Define selectors for each page in document order
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
            // Ensure proper document order for about page sections
            selectors = ['.about-section', '.story-section', '.timeline-section', '.interests-section'];
            break;
        case 'projects.html':
            selectors = ['.projects-section'];
            break;
        case 'links.html':
            selectors = ['.links-section'];
            break;
    }
    
    // Collect all elements and sort them by their position in the document
    let allElements = [];
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        allElements = allElements.concat(Array.from(elements));
    });
    
    // Sort elements by their position in the document to ensure proper order
    allElements.sort((a, b) => {
        const position = a.compareDocumentPosition(b);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
            return -1; // a comes before b
        } else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
            return 1; // a comes after b
        }
        return 0; // same position
    });
    
    // Check if any elements are already visible and trigger animation immediately
    let hasVisibleElement = false;
    allElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            hasVisibleElement = true;
        }
    });
    
    // If elements are already visible, animate immediately
    if (hasVisibleElement) {
        allElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('loaded');
            }, index * 200);
        });
    } else {
        // Create observer that triggers sequential animation when first element becomes visible
        const sequentialObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    // Mark as animated to prevent retriggering
                    entry.target.setAttribute('data-animated', 'true');
                    
                    // Animate all elements sequentially from top to bottom
                    allElements.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('loaded');
                        }, index * 200); // 200ms delay between each section
                    });
                    
                    // Stop observing all elements once animation starts
                    allElements.forEach(el => sequentialObserver.unobserve(el));
                }
            });
        }, observerOptions);
        
        // Only observe the first element to trigger the sequence
        if (allElements.length > 0) {
            sequentialObserver.observe(allElements[0]);
        }
    }
    
    let totalElements = allElements.length;
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
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${(project.technologies || []).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
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

        // Portfolio Section
        if (data.portfolioLinks) {
            html += `
                <section class="links-section">
                    <h2 class="links-section-title">
                        <i class="fas fa-briefcase"></i>
                        Portfolio
                    </h2>
                    <div class="links-grid">
            `;
            
            data.portfolioLinks.forEach((link, index) => {
                html += `
                    <a href="${link.url}" class="link-card portfolio-card">
                        <div class="link-card-content">
                            <div class="link-icon">
                                <i class="${link.icon}"></i>
                            </div>
                            <h3>${link.title}</h3>
                        </div>
                        <div class="link-arrow">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </a>
                `;
            });
            
            html += `
                    </div>
                </section>
            `;
        }

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

// CV Section Toggle Functionality
function initializeCVToggle() {
    console.log('CV Toggle: Initializing CV section toggles');
    
    // Find all CV section titles
    const sectionTitles = document.querySelectorAll('.cv-section-title');
    console.log('CV Toggle: Found section titles:', sectionTitles.length);
    
    sectionTitles.forEach(title => {
        title.addEventListener('click', function() {
            const sectionName = this.dataset.section;
            const contentElement = document.getElementById(`${sectionName}-content`);
            
            if (!contentElement) {
                console.error('CV Toggle: Content element not found for section:', sectionName);
                return;
            }
            
            // Toggle collapsed state
            const isCollapsed = contentElement.classList.contains('collapsed');
            
            if (isCollapsed) {
                // Expand
                contentElement.classList.remove('collapsed');
                this.classList.remove('collapsed');
                console.log('CV Toggle: Expanded section:', sectionName);
            } else {
                // Collapse
                contentElement.classList.add('collapsed');
                this.classList.add('collapsed');
                console.log('CV Toggle: Collapsed section:', sectionName);
            }
        });
    });
}

// Initialize CV toggles when on CV page
if (document.querySelector('.cv-section')) {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCVToggle);
    } else {
        initializeCVToggle();
    }
}