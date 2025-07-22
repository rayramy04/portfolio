// About ページ専用 JavaScript (最適化版)
class AboutPage extends PageBase {
    constructor() {
        super('About');
    }

    async initializePageContent() {
        const data = window.aboutData;
        
        // 並列処理で高速化
        await Promise.all([
            this.setPersonalInfo(data.personal),
            this.setStoryContent(data.story),
            this.setTimelineContent(data.timeline),
            this.setInterestsContent(data.interests)
        ]);
        
        await this.populateFooterSocial();
    }

    // 個人情報 - 1つのメソッドに集約
    async setPersonalInfo(data) {
        this.setElements({
            'about-name': data.name,
            'about-position': data.position,
            'about-description': data.description
        });
        this.addLoadedClass('.about-section', 100);
    }

    // ストーリー - シンプル化
    async setStoryContent(data) {
        const html = data.paragraphs.map(p => `<p>${p}</p>`).join('');
        this.setHTML('story-content-inner', html);
        this.addLoadedClass('.story-section', 200);
    }

    // タイムライン - テンプレート関数化
    async setTimelineContent(data) {
        const html = data.map(this.timelineTemplate).join('');
        this.setHTML('timeline-container', html);
        this.addLoadedClass('.timeline-section', 300);
    }

    // 興味 - テンプレート関数化
    async setInterestsContent(data) {
        const html = data.map(this.interestTemplate).join('');
        this.setHTML('interests-container', html);
        this.addLoadedClass('.interests-section', 400);
    }

    // テンプレート関数
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
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </div>`;
}

// ページ初期化
document.addEventListener('DOMContentLoaded', async () => {
    new AboutPage().init();
});