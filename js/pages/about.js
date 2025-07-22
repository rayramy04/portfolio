// About ページ専用 JavaScript
class AboutPage extends PageBase {
    constructor() {
        super('About');
    }

    // ページ固有の初期化
    async initializePageContent() {
        await this.populatePersonalInfo();
        await this.populateStoryContent();
        await this.populateTimelineContent();
        await this.populateInterestsContent();
        await this.populateFooterSocial();
    }

    // 個人情報の設定
    async populatePersonalInfo() {
        try {
            const personalData = window.aboutData.personal;
            
            const aboutName = document.getElementById('about-name');
            const aboutPosition = document.getElementById('about-position');
            const aboutDescription = document.getElementById('about-description');

            DOMHelpers.setText(aboutName, personalData.name);
            DOMHelpers.setText(aboutPosition, personalData.position);
            // HTMLとして設定することで<br>タグが有効になる
            if (aboutDescription) {
                aboutDescription.innerHTML = personalData.description;
            }

            // Personal section にトランジション効果を適用
            const aboutSection = aboutName.closest('.about-section');
            if (aboutSection) {
                DOMHelpers.addLoadedClass(aboutSection, 100);
            }

        } catch (error) {
            this.handleError(error);
        }
    }

    // Story コンテンツ
    async populateStoryContent() {
        try {
            const storyData = window.aboutData.story;
            const storyContent = await DOMHelpers.getElement('story-content-inner');
            const storyHTML = storyData.paragraphs
                .map(paragraph => `<p>${paragraph}</p>`)
                .join('');

            DOMHelpers.setHTML(storyContent, storyHTML);
            
            // Story section にトランジション効果を適用
            const storySection = storyContent.closest('.about-section');
            if (storySection) {
                DOMHelpers.addLoadedClass(storySection, 200);
            }
            
            DOMHelpers.loadSection('.story-section', 300);

        } catch (error) {
            this.handleError(error, 'story-content');
        }
    }

    // Timeline コンテンツ
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

    // Interests コンテンツ
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

    // フッターソーシャルリンク
    async populateFooterSocial() {
        try {
            const footerSocial = document.getElementById('footer-social');
            if (footerSocial && window.commonData.socialLinks) {
                const socialHTML = window.commonData.socialLinks
                    .map(social => `
                        <a href="${social.url}" target="_blank" title="${social.title}">
                            <i class="${social.icon}"></i>
                        </a>
                    `)
                    .join('');

                DOMHelpers.setHTML(footerSocial, socialHTML);
            }
        } catch (error) {
            console.error('Failed to populate footer social links:', error);
        }
    }
}

// ページ初期化
document.addEventListener('DOMContentLoaded', async () => {
    const aboutPage = new AboutPage();
    await aboutPage.init();
});