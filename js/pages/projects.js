class ProjectsPage extends PageBase {
    constructor() {
        super('Projects');
    }

    async initializePageContent() {
        await this.populateProjectsContent();
    }

    async populateProjectsContent() {
        await ErrorHandler.safeExecute(async () => {
            const projectsData = window.projectsData;
            const projectsContainer = await DOMHelpers.getElement('projects-container');
            
            const projectsHTML = HTMLGenerator.renderList(projectsData, (project) => `
                <div class="project-card">
                    ${HTMLGenerator.renderIf(project.image, `
                        <div class="project-image">
                            <img src="${project.image}" alt="${project.name || project.title}" loading="lazy">
                        </div>
                    `)}
                    <div class="project-content">
                        <h3>${project.name || project.title}</h3>
                        ${HTMLGenerator.renderIf(project.description, `<p class="project-description">${project.description}</p>`)}
                        ${HTMLGenerator.renderIf(project.technologies?.length, `
                            <div class="project-technologies">
                                ${HTMLGenerator.renderList(project.technologies, (tech) => `<span class="tech-tag">${tech}</span>`)}
                            </div>
                        `)}
                        ${HTMLGenerator.renderIf(project.links?.length, `
                            <div class="project-links">
                                ${HTMLGenerator.renderList(project.links, (link) => `
                                    <a href="${link.url}" target="_blank" class="project-link" title="${link.title}">
                                        <i class="${link.icon}"></i>
                                        ${link.title}
                                    </a>
                                `)}
                            </div>
                        `)}
                    </div>
                </div>
            `);

            DOMHelpers.setHTML(projectsContainer, projectsHTML);
            
            // Add loading animation to project cards (all at once, not sequentially)
            const projectCards = document.querySelectorAll('.project-card');
            setTimeout(() => {
                projectCards.forEach(card => {
                    card.classList.add('loaded');
                });
            }, 400);
        }, 'projects-container', this);
    }

}

document.addEventListener('DOMContentLoaded', async () => {
    const projectsPage = new ProjectsPage();
    await projectsPage.init();
});