// Data population utilities
class DataPopulator {
    static async populate(config, context = null) {
        return await ErrorHandler.safeExecute(async () => {
            const data = this.getNestedData(window, config.dataPath);
            const container = await DOMHelpers.getElement(config.containerId);
            
            let html;
            if (config.renderer) {
                html = config.renderer(data);
            } else if (config.itemRenderer) {
                html = HTMLGenerator.renderList(data, config.itemRenderer, config.options || {});
            } else {
                html = data.toString();
            }
            
            DOMHelpers.setHTML(container, html);
            
            if (config.options && config.options.delay) {
                DOMHelpers.addLoadedClass(container, config.options.delay);
            }
            
            return true;
        }, config.containerId, context);
    }

    static async populateAll(configs, context = null) {
        return await Promise.all(
            configs.map(config => this.populate(config, context))
        );
    }

    static async populateCVItems(config, context = null) {
        return await this.populate({
            dataPath: config.dataPath,
            containerId: config.containerId,
            itemRenderer: (item) => HTMLGenerator.cvItem(item, config.cvItemConfig || {}),
            options: { delay: config.delay }
        }, context);
    }

    static getNestedData(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    static async populateList(config, context = null) {
        return await this.populate({
            ...config,
            itemRenderer: config.itemRenderer
        }, context);
    }
}