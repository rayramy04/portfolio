class CVPage extends PageBase {
    constructor() {
        super('CV');
    }

    async initializePageContent() {
        
        await this.populateEducationContent();
        await this.populateExperienceContent();
        await this.populateSkillsContent();
        await this.populateCertificationsContent();
        await this.populateAwardsContent();
        await this.populateGrantsContent();
    }

    async populateEducationContent() {
        try {
            const educationData = window.cvData.education;
            const educationContainer = await DOMHelpers.getElement('education-container');
            
            const educationHTML = HTMLGenerator.renderList(educationData, (edu) => 
                HTMLGenerator.cvItem(edu, {
                    titleField: 'institution',
                    subtitleField: 'degree', 
                    dateField: 'period',
                    descriptionField: 'description'
                })
            );

            DOMHelpers.setHTML(educationContainer, educationHTML);
            
            const educationSection = educationContainer.closest('.cv-section');
            if (educationSection) {
                DOMHelpers.addLoadedClass(educationSection, 200);
            }

        } catch (error) {
            this.handleError(error, 'education-container');
        }
    }

    async populateSkillsContent() {
        try {
            const skillsData = window.cvData.skills;
            const skillsContainer = await DOMHelpers.getElement('skills-container');
            
            const specializedSkills = skillsData.find(cat => cat.category === 'Specialized Skills');
            const basicSkillsCategories = skillsData.filter(cat => cat.category !== 'Specialized Skills');
            
            let skillsHTML = '';
            
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
            
            const skillsSection = skillsContainer.closest('.cv-section');
            if (skillsSection) {
                DOMHelpers.addLoadedClass(skillsSection, 400);
            }

        } catch (error) {
            this.handleError(error, 'skills-container');
        }
    }

    async populateExperienceContent() {
        try {
            const experienceData = window.cvData.experience || [];
            const experienceContainer = await DOMHelpers.getElement('experience-container');
            
            if (experienceData && experienceData.length > 0) {
                const experienceHTML = HTMLGenerator.renderList(experienceData, (exp) => 
                    HTMLGenerator.cvItem(exp, {
                        showLink: true,
                        titleField: 'company',
                        subtitleField: 'position',
                        dateField: 'period'
                    })
                );

                DOMHelpers.setHTML(experienceContainer, experienceHTML);
            }
            
            const experienceSection = experienceContainer.closest('.cv-section');
            if (experienceSection) {
                DOMHelpers.addLoadedClass(experienceSection, 300);
            }

        } catch (error) {}
    }

    async populateCertificationsContent() {
        try {
            const certificationsData = window.cvData.certifications || [];
            const certificationsContainer = await DOMHelpers.getElement('certifications-container');
            
            if (certificationsData && certificationsData.length > 0) {
                const certificationsHTML = HTMLGenerator.renderList(certificationsData, (cert) => 
                    HTMLGenerator.certificationItem(cert)
                );

                DOMHelpers.setHTML(certificationsContainer, certificationsHTML);
            }
            
            const certificationsSection = certificationsContainer.closest('.cv-section');
            if (certificationsSection) {
                DOMHelpers.addLoadedClass(certificationsSection, 500);
            }

        } catch (error) {}
    }

    async populateAwardsContent() {
        try {
            const awardsData = window.cvData.awards;
            const awardsContainer = await DOMHelpers.getElement('awards-container');
            
            if (awardsData && typeof awardsData === 'object') {
                let awardsHTML = '';
                
                const years = Object.keys(awardsData).sort((a, b) => {
                    if (a === '~2023') return 1;
                    if (b === '~2023') return -1;
                    return parseInt(b) - parseInt(a);
                });
                
                awardsHTML = HTMLGenerator.renderList(years, (year) => {
                    const yearAwards = awardsData[year];
                    if (!yearAwards || yearAwards.length === 0) return '';
                    
                    return `
                        <div class="awards-year-group">
                            <h3 class="awards-year">${year}</h3>
                            ${HTMLGenerator.renderList(yearAwards, (award) => 
                                HTMLGenerator.cvItem(award, {
                                    showLink: true,
                                    titleField: 'title',
                                    subtitleField: 'organization',
                                    dateField: 'date'
                                })
                            )}
                        </div>
                    `;
                });

                DOMHelpers.setHTML(awardsContainer, awardsHTML);
            }
            
            const awardsSection = awardsContainer.closest('.cv-section');
            if (awardsSection) {
                DOMHelpers.addLoadedClass(awardsSection, 600);
            }

        } catch (error) {}
    }

    async populateGrantsContent() {
        try {
            const grantsData = window.cvData.grants || [];
            const grantsContainer = await DOMHelpers.getElement('grants-container');
            
            if (grantsData && grantsData.length > 0) {
                const grantsHTML = HTMLGenerator.renderList(grantsData, (grant) => 
                    HTMLGenerator.grantItem(grant)
                );

                DOMHelpers.setHTML(grantsContainer, grantsHTML);
            }
            
            const grantsSection = grantsContainer.closest('.cv-section');
            if (grantsSection) {
                DOMHelpers.addLoadedClass(grantsSection, 700);
            }

        } catch (error) {}
    }

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

}

document.addEventListener('DOMContentLoaded', async () => {
    const cvPage = new CVPage();
    await cvPage.init();
});