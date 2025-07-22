// About ページ専用 JavaScript (現実的最適化版)
class AboutPage extends PageBase {
    constructor() {
        super('About');
    }

    async initializePageContent() {
        // 段階的な初期化（アニメーション維持）
        await this.populatePersonalInfo();
        await this.populateStoryContent();
        await this.populateTimelineContent();
        await this.populateInterestsContent();
        await this.populateFooterSocial();
    }

    async populatePersonalInfo() {
        try {
            const { name, position, description } = window.aboutData.personal;
            
            this.setElements({
                'about-name': name,
                'about-position': position,
                'about-description': description
            });

            this.addLoadedClass('.about-section', 100);
        } catch (error) {
            this.handleError(error, 'personal info');
        }
    }

    async populateStoryContent() {
        try {
            const storyHTML = window.aboutData.story.paragraphs
                .map(p => `<p>${p}</p>`).join('');
                
            await this.setHTML('story-content-inner', storyHTML);
            this.addLoadedClass('.story-section', 200);
        } catch (error) {
            this.handleError(error, 'story content');
        }
    }

    async populateTimelineContent() {
        try {
            const timelineHTML = window.aboutData.timeline
                .map(this.timelineTemplate).join('');
                
            await this.setHTML('timeline-container', timelineHTML);
            this.addLoadedClass('.timeline-section', 300);
        } catch (error) {
            this.handleError(error, 'timeline');
        }
    }

    async populateInterestsContent() {
        try {
            const interestsHTML = window.aboutData.interests
                .map(this.interestTemplate).join('');
                
            await this.setHTML('interests-container', interestsHTML);
            this.addLoadedClass('.interests-section', 400);
        } catch (error) {
            this.handleError(error, 'interests');
        }
    }

    // テンプレート関数（機能維持）
    timelineTemplate = (item) => `
        <div class="timeline-item">
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-header">
                <h3>${item.title}</h3>
                <h4>${item.subtitle}</h4>
            </div>
            <div class="timeline-content">
                <p>${item.description}</p>
            </div>
        </div>`;

    interestTemplate = (item) => `
        <div class="interest-card">
            <div class="interest-icon"><i class="${item.icon}"></i></div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>`;

    // ヘルパーメソッド
    setElements(mapping) {
        Object.entries(mapping).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.innerHTML = value;
        });
    }

    async setHTML(id, html) {
        const element = await DOMHelpers.getElement(id);
        DOMHelpers.setHTML(element, html);
    }

    addLoadedClass(selector, delay) {
        setTimeout(() => {
            document.querySelector(selector)?.classList.add('loaded');
        }, delay);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    new AboutPage().init();
});