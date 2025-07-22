// Reusable component templates and utilities
// This module handles header, footer, and other shared components

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

class ComponentManager {
    // Load header and footer components
    static loadComponents() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');
        
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = ComponentTemplates.header;
        }
        
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = ComponentTemplates.footer;
        }
        
        // Initialize navigation after components are loaded
        this.initializeNavigation();
        this.initializeScrollToTop();
    }

    // Navigation functionality
    static initializeNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Highlight current page
        this.highlightCurrentPage();
    }

    // Highlight current page in navigation
    static highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Scroll to top functionality
    static initializeScrollToTop() {
        const backToTop = document.getElementById('back-to-top');
        
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Populate footer social links
    static populateFooterSocial(socialLinks) {
        const footerSocial = document.getElementById('footer-social');
        
        if (footerSocial && socialLinks) {
            const socialHTML = socialLinks.map(social => `
                <a href="${social.url}" target="_blank" class="social-link" title="${social.title}">
                    <i class="${social.icon}"></i>
                </a>
            `).join('');
            
            footerSocial.innerHTML = socialHTML;
        }
    }

    // Show loading state
    static showLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = '<div class="loading">Loading...</div>';
        }
    }

    // Show error state
    static showError(elementId, message = 'Failed to load content') {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `<div class="error">${message}</div>`;
        }
    }
}