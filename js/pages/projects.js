class ProjectsPage extends PageBase {
    constructor() {
        super('Projects');
    }

    async initializePageContent() {
        await this.populateProjectsContent();
    }

    async populateProjectsContent() {
        try {
            const projectsData = window.projectsData;
            const projectsContainer = await DOMHelpers.getElement('projects-container');
            
            const projectsHTML = projectsData.map(project => `
                <div class="project-card">
                    ${project.image ? `
                        <div class="project-image">
                            <img src="${project.image}" alt="${project.name || project.title}" loading="lazy">
                        </div>
                    ` : ''}
                    <div class="project-content">
                        <h3>${project.name || project.title}</h3>
                        ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
                        ${project.technologies && project.technologies.length > 0 ? `
                            <div class="project-technologies">
                                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        ` : ''}
                        ${project.links && project.links.length > 0 ? `
                            <div class="project-links">
                                ${project.links.map(link => `
                                    <a href="${link.url}" target="_blank" class="project-link" title="${link.title}">
                                        <i class="${link.icon}"></i>
                                        ${link.title}
                                    </a>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('');

            DOMHelpers.setHTML(projectsContainer, projectsHTML);
            DOMHelpers.loadSection('.projects-section', 200);

        } catch (error) {
            this.handleError(error, 'projects-container');
        }
    }

}

document.addEventListener('DOMContentLoaded', async () => {
    const projectsPage = new ProjectsPage();
    await projectsPage.init();
});