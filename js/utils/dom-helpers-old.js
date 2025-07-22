// DOM utilities and page framework
class DOMHelpers {
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

    static setContent(element, content, type = 'html') {
        if (!element) return false;
        if (type === 'text') {
            element.textContent = content;
        } else {
            element.innerHTML = content;
        }
        return true;
    }

    static setHTML(element, html) {
        return this.setContent(element, html, 'html');
    }

    static setText(element, text) {
        return this.setContent(element, text, 'text');
    }

    static addLoadedClass(elementOrSelector, delay = 100) {
        const element = typeof elementOrSelector === 'string' 
            ? document.querySelector(elementOrSelector)
            : elementOrSelector;
        if (!element) return;
        setTimeout(() => element.classList.add('loaded'), delay);
    }

    static loadSection(sectionSelector, delay = 100) {
        this.addLoadedClass(sectionSelector, delay);
    }
}

// Base class for page initialization
class PageBase {
    constructor(pageName) {
        this.pageName = pageName;
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;
        
        try {
            await this.loadCommonComponents();
            await this.initializePageContent();
            this.isInitialized = true;
        } catch (error) {
            console.error(`Failed to initialize ${this.pageName} page:`, error);
        }
    }

    async loadCommonComponents() {
        this.initializeNavigation();
        this.initializeScrollEffects();
        await this.populateFooterSocial();
        
        if (this.pageName === 'CV' || this.pageName === 'About' || document.querySelector('.cv-section-title')) {
            this.initializeCVToggle();
        }
    }

    async initializePageContent() {
        // Override in child classes
    }

    handleError(error, elementId = null) {
        console.error(`${this.pageName} page error:`, error);
        if (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `<div class="error">Failed to load content</div>`;
            }
        }
    }

    resetAllNavigationStates() {
        if (document.activeElement && document.activeElement !== document.body) {
            document.activeElement.blur();
        }
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active', 'clicked');
            link.blur();
            link.style.cssText = '';
        });
        
        setTimeout(() => {
            if (document.activeElement && document.activeElement !== document.body) {
                document.activeElement.blur();
            }
        }, 10);
    }

    initializeNavigation() {
        this.resetAllNavigationStates();
        
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }

    initializeScrollEffects() {
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            if (navbar) {
                navbar.classList.toggle('scrolled', scrollY > 50);
            }
            
            if (backToTop) {
                backToTop.classList.toggle('visible', scrollY > 300);
            }
        });
        
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

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

