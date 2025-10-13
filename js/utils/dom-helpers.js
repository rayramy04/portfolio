class DOMHelpers {
    static setHTML(element, html) {
        if (element) element.innerHTML = html;
    }
}
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
        if (this.pageName === 'CV' || this.pageName === 'About' || document.querySelector('.section-title-collapsible')) {
            this.initializeCVToggle();
        }
    }
    async initializePageContent() {}
    initializeNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active', 'clicked');
        });
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
        document.querySelectorAll('.section-title-collapsible').forEach(title => {
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
                        <a href="${social.url}" target="_blank" title="${typeof getText === 'function' ? getText(social.title) : social.title}">
                            <i class="${social.icon}"></i>
                        </a>
                    `)
                    .join('');
                DOMHelpers.setHTML(footerSocial, socialHTML);
            }
        } catch (error) {}
    }
}