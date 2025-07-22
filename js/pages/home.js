class HomePage extends PageBase {
    constructor() {
        super('Home');
    }

    async initializePageContent() {
        await this.populateHeroContent();
        this.initializeParticles();
    }

    async populateHeroContent() {
        try {
            const { name, subtitle, keywords } = window.homeData.hero;
            
            const [heroName, heroTitle, keywordsList] = await Promise.all([
                DOMHelpers.getElement('hero-name'),
                DOMHelpers.getElement('hero-title'),
                DOMHelpers.getElement('keywords-list')
            ]);

            DOMHelpers.setText(heroName, name);
            DOMHelpers.setText(heroTitle, subtitle);

            const keywordsHTML = keywords
                .map(keyword => `<li class="keyword-item">${keyword}</li>`)
                .join('');
            DOMHelpers.setHTML(keywordsList, keywordsHTML);

            const heroContent = document.querySelector('.hero-content');
            DOMHelpers.addLoadedClass(heroContent, 100);


        } catch (error) {
            this.handleError(error, 'hero-content');
        }
    }


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
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const homePage = new HomePage();
    await homePage.init();
});