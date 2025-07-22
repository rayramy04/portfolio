class AboutPage extends PageBase {
    constructor() {
        super('About');
    }

    async initializePageContent() {
        await this.populatePersonalInfo();
        await this.populateStoryContent();
        await this.populateTimelineContent();
        await this.populateInterestsContent();
    }

    async populatePersonalInfo() {
        await ErrorHandler.safeExecute(async () => {
            const personalData = window.aboutData.personal;
            
            const aboutName = document.getElementById('about-name');
            const aboutPosition = document.getElementById('about-position');
            const aboutDescription = document.getElementById('about-description');

            DOMHelpers.setText(aboutName, personalData.name);
            DOMHelpers.setText(aboutPosition, personalData.position);
            if (aboutDescription) {
                aboutDescription.innerHTML = personalData.description;
            }

            const aboutSection = aboutName.closest('.about-section');
            if (aboutSection) {
                DOMHelpers.addLoadedClass(aboutSection, 100);
            }
        }, null, this);
    }

    async populateStoryContent() {
        await ErrorHandler.safeExecute(async () => {
            const storyData = window.aboutData.story;
            const storyContent = await DOMHelpers.getElement('story-content-inner');
            const storyHTML = storyData.paragraphs
                .map(paragraph => `<p>${paragraph}</p>`)
                .join('');

            DOMHelpers.setHTML(storyContent, storyHTML);
            
            const storySection = storyContent.closest('.about-section');
            if (storySection) {
                DOMHelpers.addLoadedClass(storySection, 200);
            }
            
            DOMHelpers.loadSection('.story-section', 300);
        }, 'story-content', this);
    }

    async populateTimelineContent() {
        await DataPopulator.populateList({
            dataPath: 'aboutData.timeline',
            containerId: 'timeline-container',
            itemRenderer: (item) => `
                <div class="timeline-item">
                    <div class="timeline-content">
                        <div class="timeline-header">
                            <h3>${item.period}</h3>
                            <h4>${item.title}</h4>
                        </div>
                        <p>${item.description}</p>
                    </div>
                </div>
            `,
            options: { delay: 500, sectionSelector: '.timeline-section' }
        }, this);
    }

    async populateInterestsContent() {
        await DataPopulator.populateList({
            dataPath: 'aboutData.interests',
            containerId: 'interests-container',
            itemRenderer: (interest) => `
                <div class="interest-card">
                    <div class="interest-icon">
                        <i class="${interest.icon}"></i>
                    </div>
                    <h3>${interest.title}</h3>
                    <p>${interest.description}</p>
                </div>
            `,
            options: { delay: 700, sectionSelector: '.interests-section' }
        }, this);
    }

}

document.addEventListener('DOMContentLoaded', async () => {
    const aboutPage = new AboutPage();
    await aboutPage.init();
});