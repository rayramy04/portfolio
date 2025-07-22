class PageManager extends PageBase {
    constructor(pageName, config = {}) {
        super(pageName);
        this.config = config;
        this.contentPopulators = [];
        this.animations = [];
        this.customInitializers = [];
        this.pageTitle = config.title || pageName.charAt(0).toUpperCase() + pageName.slice(1);
    }

    // Register content populator functions
    addContentPopulator(populatorFn, options = {}) {
        this.contentPopulators.push({ fn: populatorFn, options });
        return this;
    }

    // Register animation with element selector and delay
    addAnimation(elementSelector, delay = 100) {
        this.animations.push({ selector: elementSelector, delay });
        return this;
    }

    // Register custom initializer (for special cases like particles)
    addCustomInitializer(initFn) {
        this.customInitializers.push(initFn);
        return this;
    }

    // Standard page initialization
    async initializePageContent() {
        // Set page title if specified
        this.setPageTitle();
        
        // Execute all content populators
        for (const { fn, options } of this.contentPopulators) {
            await ErrorHandler.safeExecute(fn.bind(this), options.errorElement || null, this);
        }

        // Apply standard title animation
        this.animatePageTitle();

        // Apply animations
        this.applyAnimations();

        // Run custom initializers
        for (const initFn of this.customInitializers) {
            await initFn.call(this);
        }
    }

    // Set page title in DOM
    setPageTitle() {
        // Try to find common title selectors
        const titleSelectors = ['.section-title', 'h1', '.page-title'];
        
        for (const selector of titleSelectors) {
            const titleElement = document.querySelector(selector);
            if (titleElement && !titleElement.textContent.trim()) {
                titleElement.textContent = this.pageTitle;
                break;
            }
        }
    }

    // Animate page title
    animatePageTitle() {
        setTimeout(() => {
            const sectionTitle = document.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.classList.add('loaded');
                console.log('Section title animated for page:', this.pageName);
            }
        }, 200);
    }

    // Apply registered animations
    applyAnimations() {
        this.animations.forEach(({ selector, delay }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                DOMHelpers.addLoadedClass(element, delay + (index * 50));
            });
        });
    }

    // Helper method for common DataPopulator patterns
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

    // Helper method for direct DOM manipulation
    addDOMPopulator(populatorFn, options = {}) {
        return this.addContentPopulator(populatorFn, options);
    }

    // Helper method to create sequential animations
    addSequentialAnimations(selectors, startDelay = 100, interval = 100) {
        selectors.forEach((selector, index) => {
            this.addAnimation(selector, startDelay + (index * interval));
        });
        return this;
    }

    // Static factory method for creating and initializing pages
    static async createAndInit(pageName, configureFn) {
        const manager = new PageManager(pageName);
        
        // Allow configuration
        if (configureFn) {
            await configureFn(manager);
        }

        // Initialize the page
        await manager.init();
        return manager;
    }
}

// Export for global use
window.PageManager = PageManager;