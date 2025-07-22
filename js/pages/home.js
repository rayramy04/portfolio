// Home ページ専用 JavaScript
class HomePage extends PageBase {
    constructor() {
        super('Home');
    }

    // ページ固有の初期化
    async initializePageContent() {
        await this.populateHeroContent();
        await this.populateFooterSocial();
        this.initializeParticles();
    }

    // Hero コンテンツの生成
    async populateHeroContent() {
        try {
            const heroData = window.homeData.hero;
            
            const heroName = await DOMHelpers.getElement('hero-name');
            const heroTitle = await DOMHelpers.getElement('hero-title'); 
            const keywordsList = await DOMHelpers.getElement('keywords-list');

            // コンテンツ設定
            DOMHelpers.setText(heroName, heroData.name);
            DOMHelpers.setText(heroTitle, heroData.subtitle);

            // Keywords リスト生成
            const keywordsHTML = heroData.keywords
                .map(keyword => `<li class="keyword-item">${keyword}</li>`)
                .join('');
            DOMHelpers.setHTML(keywordsList, keywordsHTML);

            // トランジション効果
            const heroContent = document.querySelector('.hero-content');
            DOMHelpers.addLoadedClass(heroContent, 100);

            console.log('Home: Hero content populated successfully');

        } catch (error) {
            this.handleError(error, 'hero-content');
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
                console.log('Home: Footer social links populated');
            }
        } catch (error) {
            console.error('Failed to populate footer social links:', error);
        }
    }

    // Particles.js 初期化
    initializeParticles() {
        if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: ['#059669', '#14b8a6', '#06b6d4', '#34d399'] },
                    shape: { type: ['circle', 'triangle'], stroke: { width: 1, color: '#059669' } },
                    opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1.5, opacity_min: 0.1, sync: false } },
                    size: { value: 4, random: true, anim: { enable: true, speed: 2, size_min: 1, sync: false } },
                    line_linked: { enable: true, distance: 120, color: '#059669', opacity: 0.3, width: 1.5 },
                    move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false, attract: { enable: true, rotateX: 600, rotateY: 1200 } }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                    modes: { repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 } }
                },
                retina_detect: true
            });
            console.log('Home: Particles initialized successfully');
        }
    }
}

// ページ初期化
document.addEventListener('DOMContentLoaded', async () => {
    const homePage = new HomePage();
    await homePage.init();
});