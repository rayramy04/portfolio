class CVPage extends PageBase {
    constructor() {
        super('CV');
    }

    async initializePageContent() {
        
        await this.populateEducationContent();
        await this.populateExperienceContent();
        await this.populateSkillsContent();
        await this.populateCertificationsContent();
        await this.populateAwardsContent();
        await this.populateGrantsContent();
    }

    async populateEducationContent() {
        await DataPopulator.populateCVItems({
            dataPath: 'cvData.education',
            containerId: 'education-container',
            cvItemConfig: {
                titleField: 'institution',
                subtitleField: 'degree',
                dateField: 'period',
                descriptionField: 'description'
            },
            delay: 200
        }, this);
    }

    async populateSkillsContent() {
        await DataPopulator.populate({
            dataPath: 'cvData.skills',
            containerId: 'skills-container',
            renderer: (skillsData) => HTMLGenerator.skillsSection(skillsData, this.generateStars.bind(this)),
            options: { delay: 400 }
        }, this);
    }

    async populateExperienceContent() {
        await DataPopulator.populateCVItems({
            dataPath: 'cvData.experience',
            containerId: 'experience-container',
            cvItemConfig: {
                showLink: true,
                titleField: 'company',
                subtitleField: 'position',
                dateField: 'period'
            },
            delay: 300
        }, this);
    }

    async populateCertificationsContent() {
        await DataPopulator.populateList({
            dataPath: 'cvData.certifications',
            containerId: 'certifications-container',
            itemRenderer: (cert) => HTMLGenerator.certificationItem(cert),
            options: { delay: 500 }
        }, this);
    }

    async populateAwardsContent() {
        await DataPopulator.populate({
            dataPath: 'cvData.awards',
            containerId: 'awards-container',
            renderer: (awardsData) => HTMLGenerator.awardsSection(awardsData),
            options: { delay: 600 }
        }, this);
    }

    async populateGrantsContent() {
        await DataPopulator.populateList({
            dataPath: 'cvData.grants',
            containerId: 'grants-container', 
            itemRenderer: (grant) => HTMLGenerator.grantItem(grant),
            options: { delay: 700 }
        }, this);
    }

    generateStars(level) {
        const maxStars = 5;
        let starsHTML = '';
        
        for (let i = 1; i <= maxStars; i++) {
            if (i <= level) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        
        return starsHTML;
    }

}

document.addEventListener('DOMContentLoaded', async () => {
    const cvPage = new CVPage();
    await cvPage.init();
});