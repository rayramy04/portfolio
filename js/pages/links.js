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
                        ${HTMLGenerator.renderList(contactLinksData, (link) => 
                            HTMLGenerator.linkCard(link, { cardClass: 'link-card website-card', external: true })
                        )}
                    </div>
                </section>

                <!-- Social Media Links -->
                <section class="links-section">
                    <h2 class="links-section-title" style="text-align: center;">
                        <i class="fas fa-share-alt"></i>
                        Social Media
                    </h2>
                    <div class="links-grid">
                        ${HTMLGenerator.renderList(socialLinksData, (link) => 
                            HTMLGenerator.linkCard(link, { cardClass: 'link-card social-card', external: true })
                        )}
                    </div>
                </section>

                <!-- Portfolio Links -->
                <section class="links-section">
                    <h2 class="links-section-title" style="text-align: center;">
                        <i class="fas fa-briefcase"></i>
                        Portfolio
                    </h2>
                    <div class="links-grid">
                        ${HTMLGenerator.renderList(window.linksData.portfolio, (link) => 
                            HTMLGenerator.linkCard(link, { 
                                cardClass: 'link-card portfolio-card', 
                                external: link.url.startsWith('http'),
                                showArrow: true 
                            })
                        )}
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