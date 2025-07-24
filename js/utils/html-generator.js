class HTMLGenerator {
    static renderList(data, template) {
        if (!Array.isArray(data) || data.length === 0) return '';
        return data.map(template).join('');
    }

    static renderIf(condition, template) {
        return condition ? template : '';
    }

    static cvItem(item, config = {}) {
        const title = item.institution || item.company || item.title;
        const subtitle = item.degree || item.position || item.organization;
        const date = item.period || item.date || item.year;
        const description = item.description || '';
        const link = item.url || item.link;
        
        const itemContent = `
            <div class="card-header">
                <h3>${title}</h3>
                <p class="text-meta">${date}</p>
            </div>
            <div class="card-meta-row">
                <p class="text-meta">${subtitle}</p>
            </div>
            ${description ? `<p>${description}</p>` : ''}
        `;
        
        if (link) {
            return `
                <a href="${link}" target="_blank" class="card hover-lift">
                    ${itemContent}
                </a>
            `;
        }
        
        return `
            <div class="card hover-lift">
                ${itemContent}
            </div>
        `;
    }

    static linkCard(link, config = {}) {
        const external = config.external ? 'target="_blank"' : '';
        const cardClass = config.cardClass || 'link-card';
        
        return `
            <a href="${link.url}" ${external} class="card hover-lift">
                <h3>${link.title}</h3>
                ${link.username ? `<p class="text-meta">${link.username}</p>` : ''}
            </a>
        `;
    }

    static certificationItem(cert) {
        return this.cvItem(cert);
    }

    static grantItem(grant) {
        return `
            <div class="card hover-lift">
                <div class="card-header">
                    <h3>${grant.title}</h3>
                    <p class="text-meta">${grant.date || grant.year}</p>
                </div>
                <div class="card-meta-row">
                    <p class="text-meta">${grant.organization || grant.funder}</p>
                    ${grant.amount ? `<p class="text-meta grant-amount">${grant.amount}</p>` : ''}
                </div>
                ${grant.description ? `<p>${grant.description}</p>` : ''}
            </div>
        `;
    }

    static skillsSection(skillsData, generateStars) {
        return skillsData.map(category => {
            const isSpecialized = category.category === "Specialized Skills";
            const gridClass = isSpecialized ? "specialized-skills-grid" : "skills-grid grid-auto-fit-compact";
            const itemClass = isSpecialized ? "specialized-skill-item card hover-lift" : "card hover-lift";
            
            return `
            <div class="skills-category card">
                <h3>${category.category}</h3>
                <div class="${gridClass}">
                    ${category.skills.map(skill => `
                        <div class="${itemClass}">
                            <div class="skill-header">
                                <p class="skill-name">${skill.name}</p>
                                ${skill.level ? `<div class="skill-stars">${generateStars(skill.level)}</div>` : ''}
                            </div>
                            ${skill.description ? (isSpecialized 
                                ? `<div class="skill-description">
                                    <ul>
                                        ${skill.description.map(item => `<li>${item}</li>`).join('')}
                                    </ul>
                                   </div>`
                                : `<p class="skill-description-text">${skill.description.join(', ')}</p>`
                            ) : ''}
                        </div>
                    `).join('')}
                </div>
            </div>`;
        }).join('');
    }

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