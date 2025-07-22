class LinksPage extends PageBase {
    constructor() {
        super('Links');
    }

    async initializePageContent() {
        await this.populateLinksContent();
    }

    async populateLinksContent() {
        try {
            const contactLinksData = window.linksData.contact;
            const socialLinksData = window.linksData.social;
            
            const linksContainer = await DOMHelpers.getElement('links-content');
            
            const linksHTML = `
                <!-- Website & Contact Links -->
                <section class="links-section">
                    <h2 class="links-section-title" style="text-align: center;">
                        <i class="fas fa-globe"></i>
                        Website & Contact
                    </h2>
                    <div class="links-grid">
                        ${contactLinksData.map(link => `
                            <a href="${link.url}" target="_blank" class="link-card website-card" style="padding: 20px;">
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
                        `).join('')}
                    </div>
                </section>

                <!-- Social Media Links -->
                <section class="links-section">
                    <h2 class="links-section-title" style="text-align: center;">
                        <i class="fas fa-share-alt"></i>
                        Social Media
                    </h2>
                    <div class="links-grid">
                        ${socialLinksData.map(link => `
                            <a href="${link.url}" target="_blank" class="link-card social-card" style="padding: 20px;">
                                <div class="link-card-content">
                                    <div class="link-icon">
                                        <i class="${link.icon}"></i>
                                    </div>
                                    <div>
                                        <h3>${link.title}</h3>
                                        ${link.username ? `<p style="margin: 4px 0 0 0; color: var(--text-light); font-size: 14px;">${link.username}</p>` : ''}
                                    </div>
                                </div>
                                <div class="link-arrow">
                                    <i class="fas fa-external-link-alt"></i>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </section>

                <!-- Portfolio Links -->
                <section class="links-section">
                    <h2 class="links-section-title" style="text-align: center;">
                        <i class="fas fa-briefcase"></i>
                        Portfolio
                    </h2>
                    <div class="links-grid">
                        ${window.linksData.portfolio.map(link => `
                            <a href="${link.url}" ${link.url.startsWith('http') ? 'target="_blank"' : ''} class="link-card portfolio-card" style="padding: 20px;">
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
                        `).join('')}
                    </div>
                </section>
            `;

            DOMHelpers.setHTML(linksContainer, linksHTML);
            
            const linksSections = document.querySelectorAll('.links-section');
            linksSections.forEach((section, index) => {
                DOMHelpers.addLoadedClass(section, 200 + (index * 200));
            });

        } catch (error) {
            this.handleError(error, 'links-content');
        }
    }

}

document.addEventListener('DOMContentLoaded', async () => {
    const linksPage = new LinksPage();
    await linksPage.init();
});