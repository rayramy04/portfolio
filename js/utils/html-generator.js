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
     * Generic item template renderer
     * @param {Object} item - Item data
     * @param {Object} config - Configuration for rendering
     * @returns {string} Item HTML
     */
    static _renderItem(item, config = {}) {
        const {
            showLink = false,
            titleField = 'title',
            subtitleField = 'organization',
            dateField = 'date',
            descriptionField = 'description',
            template = 'cv',
            extraFields = {}
        } = config;

        const linkUrl = item.url || item.link;
        const showLinkOverlay = showLink && linkUrl;
        
        const title = item[titleField] || item.title || item.name || item.institution;
        const subtitle = item[subtitleField] || item.organization || item.company || item.position || item.degree || item.issuer || item.funder;
        const date = item[dateField] || item.date || item.period || item.year;
        const description = item[descriptionField] || item.description;

        if (template === 'cert') {
            return `
                <div class="cv-item">
                    <div class="cv-item-header">
                        <h3>${title}</h3>
                        <span class="cv-item-date">${date}</span>
                    </div>
                    <div class="cv-item-details">
                        <h4>${subtitle}</h4>
                        ${this.renderIf(description, `<p class="cv-item-description">${description}</p>`)}
                    </div>
                </div>
            `;
        }
        
        if (template === 'grant') {
            return `
                <div class="cv-item">
                    <div class="cv-item-header">
                        <div>
                            <h3>${title}</h3>
                            <h4>${subtitle}</h4>
                        </div>
                        <div>
                            <p class="cv-date">${date}</p>
                            ${this.renderIf(extraFields.amount || item.amount, `<p class="cv-amount">${extraFields.amount || item.amount}</p>`)}
                        </div>
                    </div>
                    <div class="cv-item-content">
                        ${this.renderIf(description, `<p>${description}</p>`)}
                    </div>
                </div>
            `;
        }

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
                        <h3>${title}</h3>
                        <p class="cv-company">${subtitle}</p>
                    </div>
                    <div>
                        <p class="cv-date">${date}</p>
                    </div>
                </div>
                <div class="cv-item-content">
                    ${this.renderIf(description, `<p>${description}</p>`)}
                </div>
            </div>
        `;
    }

    /**
     * Common CV item template
     * @param {Object} item - CV item data
     * @param {Object} config - Configuration for rendering
     * @returns {string} CV item HTML
     */
    static cvItem(item, config = {}) {
        return this._renderItem(item, { ...config, template: 'cv' });
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
        return this._renderItem(cert, { template: 'cert' });
    }

    /**
     * Grant item template with amount field
     * @param {Object} grant - Grant data
     * @returns {string} Grant HTML
     */
    static grantItem(grant) {
        return this._renderItem(grant, { template: 'grant' });
    }

    /**
     * Skills section with basic and specialized categories
     * @param {Array} skillsData - Skills data array
     * @param {Function} generateStars - Star generation function
     * @returns {string} Skills HTML
     */
    static skillsSection(skillsData, generateStars) {
        const specializedSkills = skillsData.find(cat => cat.category === 'Specialized Skills');
        const basicSkillsCategories = skillsData.filter(cat => cat.category !== 'Specialized Skills');
        
        let skillsHTML = '';
        
        // Basic skills
        if (basicSkillsCategories.length > 0) {
            skillsHTML += this.renderList(basicSkillsCategories, (skillCategory) => `
                <div class="skills-category compact">
                    <h3>${skillCategory.category}</h3>
                    <div class="skills-grid-compact">
                        ${this.renderList(skillCategory.skills, (skill) => `
                            <div class="skill-item-compact">
                                <div class="skill-name">${skill.name}</div>
                                ${this.renderIf(skill.level, `
                                    <div class="skill-stars-small">
                                        ${generateStars(skill.level)}
                                    </div>
                                `)}
                            </div>
                        `)}
                    </div>
                </div>
            `);
        }
        
        // Specialized skills
        if (specializedSkills) {
            skillsHTML += `
                <div class="skills-category specialized">
                    <h3>${specializedSkills.category}</h3>
                    <div class="specialized-skills-grid">
                        ${this.renderList(specializedSkills.skills, (skill) => `
                            <div class="specialized-skill-item">
                                <div class="skill-header">
                                    <h4>${skill.name}</h4>
                                    ${this.renderIf(skill.level, `
                                        <div class="skill-stars">
                                            ${generateStars(skill.level)}
                                        </div>
                                    `)}
                                </div>
                                ${this.renderIf(skill.description, `
                                    <div class="skill-description">
                                        <ul>
                                            ${this.renderList(skill.description, (desc) => `<li>${desc}</li>`)}
                                        </ul>
                                    </div>
                                `)}
                            </div>
                        `)}
                    </div>
                </div>
            `;
        }

        return skillsHTML;
    }

    /**
     * Awards section with year-based grouping
     * @param {Object} awardsData - Awards data object grouped by years
     * @returns {string} Awards HTML
     */
    static awardsSection(awardsData) {
        if (!awardsData || typeof awardsData !== 'object') return '';
        
        const years = Object.keys(awardsData).sort((a, b) => {
            if (a === '~2023') return 1;
            if (b === '~2023') return -1;
            return parseInt(b) - parseInt(a);
        });
        
        return this.renderList(years, (year) => {
            const yearAwards = awardsData[year];
            if (!yearAwards || yearAwards.length === 0) return '';
            
            return `
                <div class="awards-year-group">
                    <h3 class="awards-year">${year}</h3>
                    ${this.renderList(yearAwards, (award) => 
                        this.cvItem(award, {
                            showLink: true,
                            titleField: 'title',
                            subtitleField: 'organization',
                            dateField: 'date'
                        })
                    )}
                </div>
            `;
        });
    }
}