class PageManager extends PageBase {
    constructor(pageName, config = {}) {
        super(pageName);
        this.config = config;
        this.contentPopulators = [];
        this.animations = [];
        this.customInitializers = [];
        this.pageTitle = config.title || pageName.charAt(0).toUpperCase() + pageName.slice(1);
    }

    addContentPopulator(populatorFn, options = {}) {
        this.contentPopulators.push({ fn: populatorFn, options });
        return this;
    }

    addAnimation(elementSelector, delay = 100) {
        this.animations.push({ selector: elementSelector, delay });
        return this;
    }

    addCustomInitializer(initFn) {
        this.customInitializers.push(initFn);
        return this;
    }

    async initializePageContent() {
        this.setPageTitle();
        
        for (const { fn, options } of this.contentPopulators) {
            await ErrorHandler.safeExecute(fn.bind(this), options.errorElement || null, this);
        }

        this.animatePageTitle();

        this.applyAnimations();

        for (const initFn of this.customInitializers) {
            await initFn.call(this);
        }
    }

    setPageTitle() {
        const titleSelectors = ['.section-title', 'h1', '.page-title'];
        
        for (const selector of titleSelectors) {
            const titleElement = document.querySelector(selector);
            if (titleElement && !titleElement.textContent.trim()) {
                titleElement.textContent = this.pageTitle;
                break;
            }
        }
    }

    animatePageTitle() {
        setTimeout(() => {
            const sectionTitle = document.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.classList.add('loaded');
            }
        }, 200);
    }

    applyAnimations() {
        this.animations.forEach(({ selector, delay }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                DOMHelpers.addLoadedClass(element, delay + (index * 50));
            });
        });
    }

    addDataPopulator(config) {
        const populatorFn = async () => {
            if (config.type === 'list') {
                await DataPopulator.populateList(config, this);
            } else if (config.type === 'cv') {
                await DataPopulator.populateCVItems(config, this);
            } else {
                await DataPopulator.populate(config, this);
            }
        };
        return this.addContentPopulator(populatorFn, config.options);
    }

    addDOMPopulator(populatorFn, options = {}) {
        return this.addContentPopulator(populatorFn, options);
    }

    addSequentialAnimations(selectors, startDelay = 100, interval = 100) {
        selectors.forEach((selector, index) => {
            this.addAnimation(selector, startDelay + (index * interval));
        });
        return this;
    }

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