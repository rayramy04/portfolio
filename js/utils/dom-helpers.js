/**
 * DOM manipulation utilities and page initialization framework
 * Provides safe DOM operations and base class for page-specific functionality
 */
class DOMHelpers {
    /**
     * Safely retrieves DOM element by ID with retry mechanism
     * @param {string} id - Element ID to find
     * @param {number} retryCount - Number of retry attempts
     * @returns {Promise<HTMLElement>} Resolved element or rejection
     */
    static getElement(id, retryCount = 3) {
        return new Promise((resolve, reject) => {
            const attempt = (count) => {
                const element = document.getElementById(id);
                if (element) {
                    resolve(element);
                } else if (count > 0) {
                    setTimeout(() => attempt(count - 1), 50);
                } else {
                    reject(new Error(`Element with id '${id}' not found`));
                }
            };
            attempt(retryCount);
        });
    }

    /**
     * Safely sets innerHTML with null checking
     */
    static setHTML(element, html) {
        if (!element) return false;
        element.innerHTML = html;
        return true;
    }

    /**
     * Safely sets textContent with null checking
     */
    static setText(element, text) {
        if (!element) return false;
        element.textContent = text;
        return true;
    }

    /**
     * Adds 'loaded' class with delay for transition effects
     */
    static addLoadedClass(element, delay = 100) {
        if (!element) return;
        setTimeout(() => element.classList.add('loaded'), delay);
    }

    /**
     * Convenience method to add loaded class to section by selector
     */
    static loadSection(sectionSelector, delay = 100) {
        const section = document.querySelector(sectionSelector);
        this.addLoadedClass(section, delay);
    }
}

/**
 * Base class for page initialization and common functionality
 * Handles component loading, navigation, and scroll effects
 */
class PageBase {
    constructor(pageName) {
        this.pageName = pageName;
        this.isInitialized = false;
    }

    /**
     * Main initialization method called by page instances
     */
    async init() {
        if (this.isInitialized) return;
        
        try {
            // Load common components and initialize base functionality
            await this.loadCommonComponents();
            
            // Initialize page-specific content
            await this.initializePageContent();
            
            this.isInitialized = true;
        } catch (error) {
            console.error(`Failed to initialize ${this.pageName} page:`, error);
        }
    }

    /**
     * Loads common components and initializes base functionality
     */
    async loadCommonComponents() {
        this.loadComponents();
        this.initializeNavigation();
        this.initializeScrollEffects();
        await this.populateFooterSocial();
        
        // Initialize CV toggle functionality if CV-style sections exist
        if (this.pageName === 'CV' || this.pageName === 'About' || document.querySelector('.cv-section-title')) {
            this.initializeCVToggle();
        }
    }

    /**
     * Override in child classes for page-specific initialization
     */
    async initializePageContent() {
        // Override in child classes
    }

    /**
     * Centralized error handling with optional DOM fallback
     */
    handleError(error, elementId = null) {
        console.error(`${this.pageName} page error:`, error);
        if (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `<div class="error">Failed to load content</div>`;
            }
        }
    }

    /**
     * Injects header and footer HTML templates into placeholders
     */
    loadComponents() {
        const ComponentTemplates = {
            header: `
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

        // Inject header template
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = ComponentTemplates.header;
        }
        
        // Inject footer template
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = ComponentTemplates.footer;
        }
    }

    /**
     * Initialize navigation: active links and mobile menu
     */
    initializeNavigation() {
        // Set active navigation link based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        // Initialize mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }

    /**
     * Initialize scroll-based effects: navbar and back-to-top button
     */
    initializeScrollEffects() {
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Navbar scroll effect
            if (navbar) {
                navbar.classList.toggle('scrolled', scrollY > 50);
            }
            
            // Back-to-top button visibility
            if (backToTop) {
                backToTop.classList.toggle('visible', scrollY > 300);
            }
        });
        
        // Back-to-top button click handler
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    /**
     * Initialize collapsible CV sections with toggle icons
     */
    initializeCVToggle() {
        document.querySelectorAll('.cv-section-title').forEach(title => {
            title.addEventListener('click', function() {
                const content = document.getElementById(this.dataset.section + '-content');
                const toggleIcon = this.querySelector('.toggle-icon');
                
                if (content && toggleIcon) {
                    const isCollapsed = content.classList.contains('collapsed');
                    content.classList.toggle('collapsed', !isCollapsed);
                    toggleIcon.classList.toggle('fa-chevron-down', !isCollapsed);
                    toggleIcon.classList.toggle('fa-chevron-up', isCollapsed);
                }
            });
        });
    }

    /**
     * Common footer social links population
     */
    async populateFooterSocial() {
        try {
            const footerSocial = document.getElementById('footer-social');
            if (footerSocial && window.commonData?.socialLinks) {
                const socialHTML = window.commonData.socialLinks
                    .map(social => `
                        <a href="${social.url}" target="_blank" title="${social.title}">
                            <i class="${social.icon}"></i>
                        </a>
                    `)
                    .join('');
                
                DOMHelpers.setHTML(footerSocial, socialHTML);
            }
        } catch (error) {}
    }
}