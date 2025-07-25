class DataPopulator {
    static async populate(config) {
        try {
            const data = this.getNestedData(window, config.dataPath);
            const container = document.getElementById(config.containerId);
            if (!container) return false;
            let html = '';
            if (config.renderer) {
                html = config.renderer(data);
            } else if (config.itemRenderer) {
                html = data.map(config.itemRenderer).join('');
            } else {
                html = data.toString();
            }
            container.innerHTML = html;
            if (config.options && config.options.delay) {
                setTimeout(() => container.classList.add('loaded'), config.options.delay);
            }
            return true;
        } catch (error) {
            console.error('Data population error:', error);
            return false;
        }
    }
    static async populateCVItems(config) {
        return this.populate({
            ...config,
            itemRenderer: (item) => HTMLGenerator.cvItem(item, config.cvItemConfig || {})
        });
    }
    static async populateList(config) {
        return this.populate(config);
    }
    static getNestedData(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }
}