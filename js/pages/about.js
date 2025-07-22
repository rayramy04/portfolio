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
        try {
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

        } catch (error) {
            this.handleError(error);
        }
    }

    async populateStoryContent() {
        try {
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

        } catch (error) {
            this.handleError(error, 'story-content');
        }
    }

    async populateTimelineContent() {
        try {
            const timelineData = window.aboutData.timeline;
            const timelineContainer = await DOMHelpers.getElement('timeline-container');
            const timelineHTML = timelineData.map(item => `
                <div class="timeline-item">
                    <div class="timeline-content">
                        <div class="timeline-header">
                            <h3>${item.period}</h3>
                            <h4>${item.title}</h4>
                        </div>
                        <p>${item.description}</p>
                    </div>
                </div>
            `).join('');

            DOMHelpers.setHTML(timelineContainer, timelineHTML);
            DOMHelpers.loadSection('.timeline-section', 500);

        } catch (error) {
            this.handleError(error, 'timeline-container');
        }
    }

    async populateInterestsContent() {
        try {
            const interestsData = window.aboutData.interests;
            const interestsContainer = await DOMHelpers.getElement('interests-container');
            const interestsHTML = interestsData.map(interest => `
                <div class="interest-card">
                    <div class="interest-icon">
                        <i class="${interest.icon}"></i>
                    </div>
                    <h3>${interest.title}</h3>
                    <p>${interest.description}</p>
                </div>
            `).join('');

            DOMHelpers.setHTML(interestsContainer, interestsHTML);
            DOMHelpers.loadSection('.interests-section', 700);

        } catch (error) {
            this.handleError(error, 'interests-container');
        }
    }

}

document.addEventListener('DOMContentLoaded', async () => {
    const aboutPage = new AboutPage();
    await aboutPage.init();
});