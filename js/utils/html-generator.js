class HTMLGenerator {
    static renderList(data, template) {
        if (!Array.isArray(data) || data.length === 0) return '';
        return data.map(template).join('');
    }
    static renderIf(condition, template) {
        return condition ? template : '';
    }

    static unifiedCardTemplate(item, config = {}) {
        const title = item.institution || item.company || item.title;
        const subtitle = item.degree || item.position || item.organization || item.funder;
        const date = item.period || item.date || item.year;
        const description = item.description || '';
        const link = item.url || item.link;
        const amount = item.amount;
        const icon = item.icon;
        const cardHeader = `
            <div class="card-header">
                <h3>${icon ? `<i class="${icon}"></i> ` : ''}${title}${link ? ' <i class="fas fa-external-link-alt card-external-icon"></i>' : ''}</h3>
                ${date ? `<p class="text-meta">${date}</p>` : ''}
            </div>
        `;
        const cardMeta = subtitle || amount ? `
            <div class="card-meta-row flex-between">
                ${subtitle ? `<p class="text-meta">${subtitle}</p>` : ''}
                ${amount ? `<p class="text-meta">${amount}</p>` : ''}
            </div>
        ` : '';
        const cardDescription = description ? `<p>${description}</p>` : '';
        const itemContent = cardHeader + cardMeta + cardDescription;
        if (link) {
            return `<a href="${link}" target="_blank" class="card hover-lift">${itemContent}</a>`;
        }
        return `<div class="card hover-lift">${itemContent}</div>`;
    }

    static cvItem(item, config = {}) {
        return HTMLGenerator.unifiedCardTemplate(item, config);
    }

    static linkCard(link, config = {}) {
        const external = config.external ? 'target="_blank"' : '';
        const cardClass = config.cardClass || 'link-card';
        const rightIcon = link.rightIcon || 'fas fa-external-link-alt';
        return `
            <a href="${link.url}" ${external} class="card hover-lift">
                <div class="card-header">
                    <h3>${link.icon ? `<i class="${link.icon}"></i> ` : ''}${link.title}</h3>
                    ${rightIcon ? `<i class="${rightIcon} card-external-icon"></i>` : ''}
                </div>
                ${link.username ? `<p class="text-meta">${link.username}</p>` : ''}
            </a>
        `;
    }

    static certificationItem(cert) {
        return HTMLGenerator.unifiedCardTemplate(cert);
    }

    static grantItem(grant) {
        return HTMLGenerator.unifiedCardTemplate(grant);
    }


    static skillsSection(skillsData, generateStars) {
        return skillsData.map(category => {
            const isSpecialized = category.category === "Specialized Skills";
            const gridClass = isSpecialized ? "specialized-skills-grid gap-sm" : "skills-grid grid-auto-fit-compact gap-sm";
            const itemClass = isSpecialized ? "specialized-skill-item card hover-lift" : "card hover-lift";
            return `
            <div class="skills-category card hover-lift">
                <h3>${category.category}</h3>
                <div class="${gridClass}">
                    ${category.skills.map(skill => `
                        <div class="${itemClass}">
                            <div class="skill-header mb-2">
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

    static projectCard(project) {
        const hasLinks = project.githubUrl || project.liveUrl;
        const cardContent = `
            ${project.image ? `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.name || project.title}" loading="lazy">
                </div>
            ` : ''}
            <div class="project-content">
                <div class="card-header">
                    <h3>${project.name || project.title}</h3>
                </div>
                ${project.description ? `<p>${project.description}</p>` : ''}
                ${project.categories?.length ? `
                    <div class="project-categories">
                        ${project.categories.map(category => `<span class="category-tag text-meta">${category}</span>`).join('')}
                    </div>
                ` : ''}
                ${hasLinks ? `
                    <div class="project-links">
                        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link hover-lift"><i class="fab fa-github"></i> GitHub</a>` : ''}
                        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-link hover-lift"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                    </div>
                ` : ''}
            </div>
        `;
        
        return `<div class="card hover-lift project-card">${cardContent}</div>`;
    }

    static profileCard(personalData) {
        const description = Array.isArray(personalData.description) 
            ? personalData.description.map(p => `<p>${p}</p>`).join('')
            : `<p>${personalData.description}</p>`;
        return `
            <div class="about-profile-layout">
                <div class="card hover-lift">
                    <h3>${personalData.name}</h3>
                    <p class="text-meta">${personalData.position}</p>
                    ${description}
                </div>
                <div class="about-image-content">
                    <img src="assets/about-photo.jpg" alt="About ${personalData.name}" class="about-photo"
                        onerror="this.style.display='none';">
                </div>
            </div>
        `;
    }

    static linksSection(title, icon, data, config) {
        return `
            <section class="links-section fade-in-up mb-section">
                <h2 class="section-title">
                    <i class="${icon}"></i>
                    ${title}
                </h2>
                <div class="links-grid grid-auto-fit gap-sm">
                    ${data.map(link => HTMLGenerator.linkCard(link, config)).join('')}
                </div>
            </section>
        `;
    }

    static awardsSection(awardsData) {
        const years = Object.keys(awardsData).sort((a, b) => parseInt(b) - parseInt(a));
        return years.map(year => `
            <div class="awards-year-group">
                <h3 class="awards-year">${year}</h3>
                ${awardsData[year].map(award => HTMLGenerator.unifiedCardTemplate(award)).join('')}
            </div>
        `).join('');
    }
}