// Simplified HTML utilities
class HTMLGenerator {
    // Basic list rendering
    static renderList(data, template) {
        if (!Array.isArray(data) || data.length === 0) return '';
        return data.map(template).join('');
    }

    // Conditional rendering
    static renderIf(condition, template) {
        return condition ? template : '';
    }

    // CV item (simplified)
    static cvItem(item, config = {}) {
        const title = item.institution || item.company || item.title;
        const subtitle = item.degree || item.position || item.organization;
        const date = item.period || item.date || item.year;
        const description = item.description || '';
        
        return `
            <div class="cv-item">
                <div class="cv-item-header">
                    <div>
                        <h3>${title}</h3>
                        <p class="cv-company">${subtitle}</p>
                    </div>
                    <div>
                        <p class="cv-date">${date}</p>
                    </div>
                </div>
                ${description ? `<div class="cv-item-content"><p>${description}</p></div>` : ''}
            </div>
        `;
    }

    // Link card (simplified)
    static linkCard(link, config = {}) {
        const external = config.external ? 'target="_blank"' : '';
        const cardClass = config.cardClass || 'link-card';
        
        return `
            <a href="${link.url}" ${external} class="${cardClass}">
                <div class="link-card-content">
                    <div class="link-icon">
                        <i class="${link.icon}"></i>
                    </div>
                    <div>
                        <h3>${link.title}</h3>
                        ${link.username ? `<p style="margin: 4px 0 0 0; color: var(--text-light); font-size: 14px;">${link.username}</p>` : ''}
                    </div>
                </div>
                <div class="link-arrow">
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </a>
        `;
    }

    // Certification item (simplified)
    static certificationItem(cert) {
        return this.cvItem(cert);
    }

    // Grant item (simplified)
    static grantItem(grant) {
        return `
            <div class="cv-item">
                <div class="cv-item-header">
                    <div>
                        <h3>${grant.title}</h3>
                        <h4>${grant.funder}</h4>
                    </div>
                    <div>
                        <p class="cv-date">${grant.year}</p>
                        ${grant.amount ? `<p class="cv-amount">${grant.amount}</p>` : ''}
                    </div>
                </div>
                ${grant.description ? `<div class="cv-item-content"><p>${grant.description}</p></div>` : ''}
            </div>
        `;
    }

    // Skills section (simplified)
    static skillsSection(skillsData, generateStars) {
        return skillsData.map(category => `
            <div class="skills-category">
                <h3>${category.category}</h3>
                <div class="skills-grid">
                    ${category.skills.map(skill => `
                        <div class="skill-item">
                            <div class="skill-name">${skill.name}</div>
                            ${skill.level ? `<div class="skill-stars">${generateStars(skill.level)}</div>` : ''}
                            ${skill.description ? `<p>${skill.description.join(', ')}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    // Awards section (simplified)
    static awardsSection(awardsData) {
        const years = Object.keys(awardsData).sort((a, b) => parseInt(b) - parseInt(a));
        
        return years.map(year => `
            <div class="awards-year-group">
                <h3 class="awards-year">${year}</h3>
                ${awardsData[year].map(award => this.cvItem(award)).join('')}
            </div>
        `).join('');
    }
}