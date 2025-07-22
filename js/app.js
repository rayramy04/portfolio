// Main application controller
// This module coordinates the loading and rendering of different page types

class App {
    constructor() {
        this.data = null;
        this.currentPage = this.getCurrentPage();
    }

    // Determine current page from URL
    getCurrentPage() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        if (path === 'index.html' || path === '') return 'home';
        return path.replace('.html', '');
    }

    // Initialize the application
    async init() {
        try {
            // Load reusable components
            ComponentManager.loadComponents();
            
            // Initialize data loading
            await initializeData();
            this.data = getPortfolioData();
            
            // Wait a bit for data to be fully processed
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Debug: Log data for links page
            if (this.currentPage === 'links') {
                console.log('Links page - Available data:', this.data);
                console.log('contactLinks:', this.data.contactLinks);
                console.log('socialLinks:', this.data.socialLinks);
            }
            
            // Populate footer with social links
            ComponentManager.populateFooterSocial(this.data.socialLinks);
            
            // Render page-specific content
            this.renderCurrentPage();
            
        } catch (error) {
            console.error('Application initialization failed:', error);
            this.handleError(error);
        }
    }

    // Render content based on current page
    renderCurrentPage() {
        if (!this.data) {
            console.error('No data available for rendering');
            return;
        }

        switch (this.currentPage) {
            case 'home':
                PageRenderers.renderHero(this.data);
                break;
                
            case 'about':
                PageRenderers.renderPersonal(this.data);
                PageRenderers.renderStory(this.data);
                PageRenderers.renderTimeline(this.data);
                PageRenderers.renderInterests(this.data);
                break;
                
            case 'cv':
                PageRenderers.renderEducation(this.data);
                PageRenderers.renderExperience(this.data);
                PageRenderers.renderSkills(this.data);
                this.renderCVExtras();
                break;
                
            case 'projects':
                PageRenderers.renderProjects(this.data);
                break;
                
            case 'links':
                PageRenderers.renderLinks(this.data);
                break;
                
            default:
                console.warn(`Unknown page: ${this.currentPage}`);
        }
    }

    // Render additional CV sections (awards, certifications, etc.)
    renderCVExtras() {
        // Awards
        const awardsSection = document.getElementById('awards-content');
        if (awardsSection && this.data.awards) {
            const awards = this.data.awards;
            awardsSection.innerHTML = `
                <div class="cv-section">
                    <h2><i class="fas fa-trophy"></i> Awards & Achievements</h2>
                    <div class="cv-items">
                        ${Object.entries(awards).map(([key, awardGroup]) => `
                            <div class="cv-item">
                                <h3>${awardGroup.title}</h3>
                                ${awardGroup.items ? awardGroup.items.map(award => `
                                    <div class="award-item">
                                        <h4>${award.title}</h4>
                                        <span class="cv-date">${award.date}</span>
                                        ${award.description ? `<p>${award.description}</p>` : ''}
                                    </div>
                                `).join('') : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Certifications
        const certificationsSection = document.getElementById('certifications-content');
        if (certificationsSection && this.data.certifications) {
            const certifications = Array.isArray(this.data.certifications) ? this.data.certifications : [];
            certificationsSection.innerHTML = `
                <div class="cv-section">
                    <h2><i class="fas fa-certificate"></i> Certifications</h2>
                    <div class="cv-items">
                        ${certifications.map(cert => `
                            <div class="cv-item">
                                <div class="cv-item-header">
                                    <h3>${cert.title}</h3>
                                    <span class="cv-date">${cert.date}</span>
                                </div>
                                <h4>${cert.issuer}</h4>
                                ${cert.credentialId ? `<p><strong>ID:</strong> ${cert.credentialId}</p>` : ''}
                                ${cert.url ? `<a href="${cert.url}" target="_blank">View Certificate</a>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Grants
        const grantsSection = document.getElementById('grants-content');
        if (grantsSection && this.data.grants) {
            const grants = Array.isArray(this.data.grants) ? this.data.grants : [];
            grantsSection.innerHTML = `
                <div class="cv-section">
                    <h2><i class="fas fa-hand-holding-usd"></i> Grants & Funding</h2>
                    <div class="cv-items">
                        ${grants.map(grant => `
                            <div class="cv-item">
                                <div class="cv-item-header">
                                    <h3>${grant.title}</h3>
                                    <span class="cv-date">${grant.date}</span>
                                </div>
                                <h4>${grant.source}</h4>
                                ${grant.amount ? `<p><strong>Amount:</strong> ${grant.amount}</p>` : ''}
                                ${grant.description ? `<p>${grant.description}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }

    // Handle application errors
    handleError(error) {
        const errorMessage = `Application Error: ${error.message}`;
        
        // Try to show error in main content areas
        const contentIds = ['hero-content', 'personal-content', 'projects-content', 'links-content'];
        contentIds.forEach(id => {
            ComponentManager.showError(id, errorMessage);
        });
    }

    // Reload application data
    async reload() {
        try {
            dataLoader.clearCache();
            await this.init();
        } catch (error) {
            console.error('Application reload failed:', error);
            this.handleError(error);
        }
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    const app = new App();
    await app.init();
    
    // Make app globally available for debugging
    window.portfolioApp = app;
});