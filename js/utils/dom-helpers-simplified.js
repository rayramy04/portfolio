// Simplified DOM utilities - keeps essential functionality, removes bloat
class DOMHelpers {
    // Essential: Get element with retry (used 18+ times)
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

    // Essential: Safe HTML setting (used 15+ times)
    static setHTML(element, html) {
        if (!element) return false;
        element.innerHTML = html;
        return true;
    }

    // Essential: Animation loading class (used 10+ times)
    static addLoadedClass(element, delay = 100) {
        if (!element) return;
        setTimeout(() => element.classList.add('loaded'), delay);
    }

    // Keep for convenience: Section loading shorthand
    static loadSection(sectionSelector, delay = 100) {
        const section = document.querySelector(sectionSelector);
        this.addLoadedClass(section, delay);
    }
}

// Simplified page base class
class PageBase {
    constructor(pageName) {
        this.pageName = pageName;
        this.isInitialized = false;
    }

    // Essential: Main initialization
    async init() {
        if (this.isInitialized) return;
        
        try {
            console.log(`Initializing ${this.pageName} page`);
            
            // Load essential components
            this.loadComponents();
            this.initializeNavigation();
            this.initializeScrollEffects();
            
            // CV toggle only where needed
            if (this.pageName === 'CV' || this.pageName === 'About' || 
                document.querySelector('.cv-section-title')) {
                this.initializeCVToggle();
            }
            
            // Page-specific content
            await this.initializePageContent();
            
            this.isInitialized = true;
            console.log(`${this.pageName} page initialized`);
            
        } catch (error) {
            console.error(`Failed to initialize ${this.pageName}:`, error);
        }
    }

    // Essential: Error handling (used across all pages)
    handleError(error, elementId = null) {
        console.error(`${this.pageName} error:`, error);
        if (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `<div class="error">Failed to load content</div>`;
            }
        }
    }

    // Essential: Header/footer templates (saves ~50 lines per page)
    loadComponents() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = `
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
            `;
        }
        
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = `
                <footer class="footer">
                    <div class="footer-content">
                        <p class="copyright">&copy; Ray. All rights reserved.</p>
                        <div class="footer-social" id="footer-social"></div>
                    </div>
                    <div class="back-to-top" id="back-to-top">
                        <i class="fas fa-chevron-up"></i>
                    </div>
                </footer>
            `;
        }
    }

    // Essential: Combined navigation functionality
    initializeNavigation() {
        // Active nav link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        // Mobile menu
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }

    // Essential: Combined scroll effects
    initializeScrollEffects() {
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Navbar effect
            if (navbar) {
                navbar.classList.toggle('scrolled', scrollY > 50);
            }
            
            // Back to top effect
            if (backToTop) {
                backToTop.classList.toggle('visible', scrollY > 300);
            }
        });
        
        // Back to top click
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // Essential: CV toggle functionality
    initializeCVToggle() {
        document.querySelectorAll('.cv-section-title').forEach(title => {
            title.addEventListener('click', function() {
                const sectionName = this.dataset.section;
                const content = document.getElementById(sectionName + '-content');
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

    // Override in page classes
    async initializePageContent() {
        // Page-specific initialization
    }
}