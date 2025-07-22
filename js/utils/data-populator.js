/**
 * Data Population Utilities
 * Standardizes the common pattern of: get data → get element → generate HTML → set HTML
 */
class DataPopulator {
    /**
     * Standard populate pattern: data → element → render → DOM
     * @param {Object} config - Configuration object
     * @param {string|Function} config.dataPath - Path to data (string) or function that returns data
     * @param {string} config.containerId - Container element ID
     * @param {Function} config.renderer - Function that takes data and returns HTML string
     * @param {Object} config.options - Additional options
     * @param {number} config.options.delay - Delay for loaded class (optional)
     * @param {string} config.options.sectionSelector - Section selector for loaded class (optional)
     * @param {Object} context - Context object (usually 'this' from page class)
     * @returns {Promise<boolean>} Success status
     */
    static async populate(config, context = null) {
        return await ErrorHandler.safeExecute(async () => {
            // Get data
            const data = typeof config.dataPath === 'function' 
                ? config.dataPath() 
                : this.getNestedData(window, config.dataPath);
            
            // Get container element
            const container = await DOMHelpers.getElement(config.containerId);
            
            // Render HTML
            const html = config.renderer(data);
            
            // Set HTML
            DOMHelpers.setHTML(container, html);
            
            // Apply loading effects if specified
            if (config.options?.delay !== undefined) {
                if (config.options.sectionSelector) {
                    DOMHelpers.loadSection(config.options.sectionSelector, config.options.delay);
                } else {
                    const section = container.closest('.cv-section, .about-section, .section');
                    if (section) {
                        DOMHelpers.addLoadedClass(section, config.options.delay);
                    }
                }
            }
            
            return true;
        }, config.containerId, context);
    }

    /**
     * Populate multiple sections with batch processing (parallel execution)
     * @param {Array} configs - Array of populate configurations
     * @param {Object} context - Context object
     * @returns {Promise<Array>} Array of results
     */
    static async populateAll(configs, context = null) {
        return await Promise.all(
            configs.map(config => this.populate(config, context))
        );
    }

    /**
     * Specialized populate for CV items using HTMLGenerator.cvItem
     * @param {Object} config - Configuration
     * @param {string} config.dataPath - Path to CV data array
     * @param {string} config.containerId - Container ID
     * @param {Object} config.cvItemConfig - Configuration for HTMLGenerator.cvItem
     * @param {number} config.delay - Delay for animation
     * @param {Object} context - Context
     */
    static async populateCVItems(config, context = null) {
        return await this.populateList({
            dataPath: config.dataPath,
            containerId: config.containerId,
            itemRenderer: (item) => HTMLGenerator.cvItem(item, config.cvItemConfig || {}),
            options: { delay: config.delay }
        }, context);
    }

    /**
     * Get nested data from object using dot notation
     * @param {Object} obj - Source object
     * @param {string} path - Dot notation path (e.g., 'cvData.education')
     * @returns {*} Data at path
     */
    static getNestedData(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    /**
     * Populate with list rendering
     * @param {Object} config - Configuration
     * @param {string} config.dataPath - Path to array data
     * @param {string} config.containerId - Container ID
     * @param {Function} config.itemRenderer - Function that renders each item
     * @param {Object} config.options - Options including delay
     * @param {Object} context - Context
     */
    static async populateList(config, context = null) {
        return await this.populate({
            dataPath: config.dataPath,
            containerId: config.containerId,
            renderer: (data) => HTMLGenerator.renderList(data, config.itemRenderer),
            options: config.options
        }, context);
    }
}