// Simplified page manager
class PageManager extends PageBase {
    constructor(pageName) {
        super(pageName);
        this.contentPopulators = [];
        this.animations = [];
        this.customInitializers = [];
    }

    // Add content populator
    addDOMPopulator(populatorFn) {
        this.contentPopulators.push(populatorFn);
        return this;
    }

    // Add data populator (simplified)
    addDataPopulator(config) {
        const populatorFn = async () => {
            if (config.type === 'cv') {
                await DataPopulator.populateCVItems(config);
            } else {
                await DataPopulator.populate(config);
            }
        };
        this.contentPopulators.push(populatorFn);
        return this;
    }

    // Add animation
    addAnimation(selector, delay = 100) {
        this.animations.push({ selector, delay });
        return this;
    }

    // Add sequential animations
    addSequentialAnimations(selectors, startDelay = 100, interval = 100) {
        selectors.forEach((selector, index) => {
            this.addAnimation(selector, startDelay + (index * interval));
        });
        return this;
    }

    // Add custom initializer
    addCustomInitializer(initFn) {
        this.customInitializers.push(initFn);
        return this;
    }

    // Initialize page content
    async initializePageContent() {
        // Run content populators
        for (const fn of this.contentPopulators) {
            try {
                await fn();
            } catch (error) {
                console.error('Content populator error:', error);
            }
        }

        // Animate page title
        setTimeout(() => {
            const sectionTitle = document.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.classList.add('loaded');
            }
        }, 200);

        // Apply animations
        this.animations.forEach(({ selector, delay }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                setTimeout(() => element.classList.add('loaded'), delay + (index * 50));
            });
        });

        // Run custom initializers
        for (const initFn of this.customInitializers) {
            try {
                await initFn();
            } catch (error) {
                console.error('Custom initializer error:', error);
            }
        }
    }

    // Static factory method
    static async createAndInit(pageName, configureFn) {
        const manager = new PageManager(pageName);
        
        if (configureFn) {
            await configureFn(manager);
        }

        await manager.init();
        return manager;
    }
}

window.PageManager = PageManager;