/**
 * HTML Generation Utilities
 * Provides reusable template rendering for common patterns
 */
class HTMLGenerator {
    /**
     * Renders array data into HTML using a template function
     * @param {Array} data - Array of data objects
     * @param {Function} template - Template function that takes (item, index) and returns HTML string
     * @param {Object} options - Additional options for rendering
     * @returns {string} Combined HTML string
     */
    static renderList(data, template, options = {}) {
        if (!Array.isArray(data) || data.length === 0) {
            return options.emptyMessage || '';
        }
        
        return data.map((item, index) => template(item, index, options)).join(options.separator || '');
    }

    /**
     * Renders conditional HTML section
     * @param {boolean} condition - Condition to check
     * @param {string|Function} template - HTML string or function that returns HTML
     * @param {*} data - Data to pass to template function
     * @returns {string} HTML string or empty string
     */
    static renderIf(condition, template, data = null) {
        if (!condition) return '';
        return typeof template === 'function' ? template(data) : template;
    }

    /**
     * Common CV item template
     * @param {Object} item - CV item data
     * @param {Object} config - Configuration for rendering
     * @returns {string} CV item HTML
     */
    static cvItem(item, config = {}) {
        const {
            showLink = false,
            titleField = 'title',
            subtitleField = 'organization', 
            dateField = 'date',
            descriptionField = 'description'
        } = config;

        const linkUrl = item.url || item.link;
        const showLinkOverlay = showLink && linkUrl;

        return `
            <div class="cv-item ${showLinkOverlay ? 'cv-item-linkable' : ''}">
                ${this.renderIf(showLinkOverlay, `
                    <a href="${linkUrl}" target="_blank" class="cv-item-overlay">
                        <div class="cv-item-overlay-content">
                            <div class="cv-item-link-icon">
                                <i class="fas fa-external-link-alt"></i>
                            </div>
                        </div>
                    </a>
                `)}
                <div class="cv-item-header">
                    <div>
                        <h3>${item[titleField] || item.title || item.name || item.institution}</h3>
                        <p class="cv-company">${item[subtitleField] || item.organization || item.company || item.position || item.degree}</p>
                    </div>
                    <div>
                        <p class="cv-date">${item[dateField] || item.date || item.period}</p>
                    </div>
                </div>
                <div class="cv-item-content">
                    ${this.renderIf(item[descriptionField] || item.description, `<p>${item[descriptionField] || item.description}</p>`)}
                </div>
            </div>
        `;
    }

    /**
     * Link card template
     * @param {Object} link - Link data
     * @param {Object} config - Configuration for link card
     * @returns {string} Link card HTML
     */
    static linkCard(link, config = {}) {
        const { cardClass = 'link-card', showArrow = true, external = true, style = 'padding: 20px;' } = config;
        
        return `
            <a href="${link.url}" ${external ? 'target="_blank"' : ''} class="${cardClass}" style="${style}">
                <div class="link-card-content">
                    <div class="link-icon">
                        <i class="${link.icon}"></i>
                    </div>
                    <div>
                        <h3>${link.title}</h3>
                        ${this.renderIf(link.username, `<p style="margin: 4px 0 0 0; color: var(--text-light); font-size: 14px;">${link.username}</p>`)}
                    </div>
                </div>
                ${this.renderIf(showArrow, `
                    <div class="link-arrow">
                        <i class="fas fa-${external ? 'external-link-alt' : 'arrow-right'}"></i>
                    </div>
                `)}
            </a>
        `;
    }

    /**
     * Certification item template
     * @param {Object} cert - Certification data
     * @returns {string} Certification HTML
     */
    static certificationItem(cert) {
        return `
            <div class="cv-item">
                <div class="cv-item-header">
                    <h3>${cert.name || cert.title}</h3>
                    <span class="cv-item-date">${cert.date || cert.year}</span>
                </div>
                <div class="cv-item-details">
                    <h4>${cert.issuer || cert.organization}</h4>
                    ${this.renderIf(cert.description, `<p class="cv-item-description">${cert.description}</p>`)}
                </div>
            </div>
        `;
    }

    /**
     * Grant item template with amount field
     * @param {Object} grant - Grant data
     * @returns {string} Grant HTML
     */
    static grantItem(grant) {
        return `
            <div class="cv-item">
                <div class="cv-item-header">
                    <div>
                        <h3>${grant.name || grant.title}</h3>
                        <h4>${grant.organization || grant.funder}</h4>
                    </div>
                    <div>
                        <p class="cv-date">${grant.date || grant.year}</p>
                        ${this.renderIf(grant.amount, `<p class="cv-amount">${grant.amount}</p>`)}
                    </div>
                </div>
                <div class="cv-item-content">
                    ${this.renderIf(grant.description, `<p>${grant.description}</p>`)}
                </div>
            </div>
        `;
    }
}