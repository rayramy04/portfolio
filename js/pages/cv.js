// CV ページ専用 JavaScript
class CVPage extends PageBase {
    constructor() {
        super('CV');
    }

    // ページ固有の初期化
    async initializePageContent() {
        
        await this.populateEducationContent();
        await this.populateExperienceContent();
        await this.populateSkillsContent();
        await this.populateCertificationsContent();
        await this.populateAwardsContent();
        await this.populateGrantsContent();
        await this.populateFooterSocial();
        
    }

    // Education コンテンツ
    async populateEducationContent() {
        try {
            const educationData = window.cvData.education;
            
            const educationContainer = await DOMHelpers.getElement('education-container');
            
            const educationHTML = educationData.map(edu => `
                <div class="cv-item">
                    <div class="cv-item-header">
                        <div>
                            <h3>${edu.institution}</h3>
                            <p class="cv-degree">${edu.degree}</p>
                        </div>
                        <div>
                            <p class="cv-date">${edu.period}</p>
                        </div>
                    </div>
                    <div class="cv-item-content">
                        ${edu.description ? `<p>${edu.description}</p>` : ''}
                    </div>
                </div>
            `).join('');

            DOMHelpers.setHTML(educationContainer, educationHTML);
            
            // セクション全体にロード効果を適用
            const educationSection = educationContainer.closest('.cv-section');
            if (educationSection) {
                DOMHelpers.addLoadedClass(educationSection, 200);
            }

        } catch (error) {
            this.handleError(error, 'education-container');
        }
    }

    // Skills コンテンツ
    async populateSkillsContent() {
        try {
            const skillsData = window.cvData.skills;
            const skillsContainer = await DOMHelpers.getElement('skills-container');
            
            // Specialized Skillsとそれ以外を分ける
            const specializedSkills = skillsData.find(cat => cat.category === 'Specialized Skills');
            const basicSkillsCategories = skillsData.filter(cat => cat.category !== 'Specialized Skills');
            
            let skillsHTML = '';
            
            // 基本スキルカテゴリをコンパクトに表示
            if (basicSkillsCategories.length > 0) {
                skillsHTML += basicSkillsCategories.map(skillCategory => `
                    <div class="skills-category compact">
                        <h3>${skillCategory.category}</h3>
                        <div class="skills-grid-compact">
                            ${skillCategory.skills.map(skill => `
                                <div class="skill-item-compact">
                                    <div class="skill-name">${skill.name}</div>
                                    ${skill.level ? `
                                        <div class="skill-stars-small">
                                            ${this.generateStars(skill.level)}
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('');
            }
            
            // Specialized Skills を詳細表示
            if (specializedSkills) {
                skillsHTML += `
                    <div class="skills-category specialized">
                        <h3>${specializedSkills.category}</h3>
                        <div class="specialized-skills-grid">
                            ${specializedSkills.skills.map(skill => `
                                <div class="specialized-skill-item">
                                    <div class="skill-header">
                                        <h4>${skill.name}</h4>
                                        ${skill.level ? `
                                            <div class="skill-stars">
                                                ${this.generateStars(skill.level)}
                                            </div>
                                        ` : ''}
                                    </div>
                                    ${skill.description ? `
                                        <div class="skill-description">
                                            <ul>
                                                ${skill.description.map(desc => `<li>${desc}</li>`).join('')}
                                            </ul>
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            DOMHelpers.setHTML(skillsContainer, skillsHTML);
            
            // セクション全体にロード効果を適用
            const skillsSection = skillsContainer.closest('.cv-section');
            if (skillsSection) {
                DOMHelpers.addLoadedClass(skillsSection, 400);
            }

        } catch (error) {
            this.handleError(error, 'skills-container');
        }
    }

    // Experience コンテンツ
    async populateExperienceContent() {
        try {
            const experienceData = window.cvData.experience || [];
            const experienceContainer = await DOMHelpers.getElement('experience-container');
            
            if (experienceData && experienceData.length > 0) {
                const experienceHTML = experienceData.map(exp => `
                    <div class="cv-item ${exp.url ? 'cv-item-linkable' : ''}">
                        ${exp.url ? `
                            <a href="${exp.url}" target="_blank" class="cv-item-overlay">
                                <div class="cv-item-overlay-content">
                                    <div class="cv-item-link-icon">
                                        <i class="fas fa-external-link-alt"></i>
                                    </div>
                                </div>
                            </a>
                        ` : ''}
                        <div class="cv-item-header">
                            <div>
                                <h3>${exp.company || exp.organization}</h3>
                                <p class="cv-company">${exp.position || exp.title}</p>
                            </div>
                            <div>
                                <p class="cv-date">${exp.period || exp.date}</p>
                            </div>
                        </div>
                        <div class="cv-item-content">
                            ${exp.description ? `<p>${exp.description}</p>` : ''}
                        </div>
                    </div>
                `).join('');

                DOMHelpers.setHTML(experienceContainer, experienceHTML);
            }
            
            const experienceSection = experienceContainer.closest('.cv-section');
            if (experienceSection) {
                DOMHelpers.addLoadedClass(experienceSection, 300);
            }

        } catch (error) {
        }
    }

    // Certifications コンテンツ
    async populateCertificationsContent() {
        try {
            const certificationsData = window.cvData.certifications || [];
            const certificationsContainer = await DOMHelpers.getElement('certifications-container');
            
            if (certificationsData && certificationsData.length > 0) {
                const certificationsHTML = certificationsData.map(cert => `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <h3>${cert.name || cert.title}</h3>
                            <span class="cv-item-date">${cert.date || cert.year}</span>
                        </div>
                        <div class="cv-item-details">
                            <h4>${cert.issuer || cert.organization}</h4>
                            ${cert.description ? `<p class="cv-item-description">${cert.description}</p>` : ''}
                        </div>
                    </div>
                `).join('');

                DOMHelpers.setHTML(certificationsContainer, certificationsHTML);
            }
            
            const certificationsSection = certificationsContainer.closest('.cv-section');
            if (certificationsSection) {
                DOMHelpers.addLoadedClass(certificationsSection, 500);
            }

        } catch (error) {
        }
    }

    // Awards コンテンツ
    async populateAwardsContent() {
        try {
            const awardsData = window.cvData.awards;
            const awardsContainer = await DOMHelpers.getElement('awards-container');
            
            if (awardsData && typeof awardsData === 'object') {
                // 年度別のデータを統合して表示
                let awardsHTML = '';
                
                // 年度順にソート (降順)
                const years = Object.keys(awardsData).sort((a, b) => {
                    if (a === '~2023') return 1; // ~2023は最後に
                    if (b === '~2023') return -1;
                    return parseInt(b) - parseInt(a);
                });
                
                years.forEach(year => {
                    const yearAwards = awardsData[year];
                    if (yearAwards && yearAwards.length > 0) {
                        awardsHTML += `<div class="awards-year-group">
                            <h3 class="awards-year">${year}</h3>`;
                        
                        yearAwards.forEach(award => {
                            awardsHTML += `
                                <div class="cv-item ${award.link ? 'cv-item-linkable' : ''}">
                                    ${award.link ? `
                                        <a href="${award.link}" target="_blank" class="cv-item-overlay">
                                            <div class="cv-item-overlay-content">
                                                <div class="cv-item-link-icon">
                                                    <i class="fas fa-external-link-alt"></i>
                                                </div>
                                            </div>
                                        </a>
                                    ` : ''}
                                    <div class="cv-item-header">
                                        <div>
                                            <h4>${award.title}</h4>
                                            <p class="cv-company">${award.organization}</p>
                                        </div>
                                        <div>
                                            <p class="cv-date">${award.date}</p>
                                        </div>
                                    </div>
                                    <div class="cv-item-content">
                                        ${award.description ? `<p>${award.description}</p>` : ''}
                                    </div>
                                </div>
                            `;
                        });
                        
                        awardsHTML += '</div>';
                    }
                });

                DOMHelpers.setHTML(awardsContainer, awardsHTML);
            }
            
            const awardsSection = awardsContainer.closest('.cv-section');
            if (awardsSection) {
                DOMHelpers.addLoadedClass(awardsSection, 600);
            }

        } catch (error) {
        }
    }

    // Grants コンテンツ
    async populateGrantsContent() {
        try {
            const grantsData = window.cvData.grants || [];
            const grantsContainer = await DOMHelpers.getElement('grants-container');
            
            if (grantsData && grantsData.length > 0) {
                const grantsHTML = grantsData.map(grant => `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <div>
                                <h3>${grant.name || grant.title}</h3>
                                <h4>${grant.organization || grant.funder}</h4>
                            </div>
                            <div>
                                <p class="cv-date">${grant.date || grant.year}</p>
                                ${grant.amount ? `<p class="cv-amount">${grant.amount}</p>` : ''}
                            </div>
                        </div>
                        <div class="cv-item-content">
                            ${grant.description ? `<p>${grant.description}</p>` : ''}
                        </div>
                    </div>
                `).join('');

                DOMHelpers.setHTML(grantsContainer, grantsHTML);
            }
            
            const grantsSection = grantsContainer.closest('.cv-section');
            if (grantsSection) {
                DOMHelpers.addLoadedClass(grantsSection, 700);
            }

        } catch (error) {
        }
    }

    // 星評価を生成するヘルパーメソッド
    generateStars(level) {
        const maxStars = 5;
        let starsHTML = '';
        
        for (let i = 1; i <= maxStars; i++) {
            if (i <= level) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        
        return starsHTML;
    }

    // フッターソーシャルリンク
    async populateFooterSocial() {
        try {
            const footerSocial = document.getElementById('footer-social');
            if (footerSocial && window.commonData.socialLinks) {
                const socialHTML = window.commonData.socialLinks
                    .map(social => `
                        <a href="${social.url}" target="_blank" title="${social.title}">
                            <i class="${social.icon}"></i>
                        </a>
                    `)
                    .join('');
                
                DOMHelpers.setHTML(footerSocial, socialHTML);
            }
        } catch (error) {
            console.error('Failed to populate footer social links:', error);
        }
    }
}

// ページ初期化
document.addEventListener('DOMContentLoaded', async () => {
    const cvPage = new CVPage();
    await cvPage.init();
});