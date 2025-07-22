// Page-specific rendering functions for better organization
// This module contains all rendering logic separated by page domains

class PageRenderers {
    // Home page rendering
    static renderHero(data) {
        const heroSection = document.getElementById('hero-content');
        if (!heroSection || !data.hero) return;

        const hero = data.hero;
        const profile = data.profile || {};
        
        heroSection.innerHTML = `
            <div class="hero-container">
                <div class="hero-content">
                    <div class="hero-text">
                        <h1 class="hero-title">${hero.title || profile.name || 'Welcome'}</h1>
                        <p class="hero-subtitle">${hero.subtitle || profile.title || ''}</p>
                        <p class="hero-description">${hero.description || ''}</p>
                        ${hero.cta ? `
                            <div class="hero-cta">
                                <a href="${hero.cta.url}" class="cta-button">
                                    <i class="${hero.cta.icon}"></i>
                                    ${hero.cta.text}
                                </a>
                            </div>
                        ` : ''}
                    </div>
                    ${profile.photo ? `
                        <div class="hero-image">
                            <img src="${profile.photo}" alt="${profile.name}" class="profile-photo">
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // About page rendering functions
    static renderPersonal(data) {
        const personalSection = document.getElementById('personal-content');
        if (!personalSection || !data.personal) return;

        const personal = data.personal;
        personalSection.innerHTML = `
            <div class="personal-container">
                <h2>About Me</h2>
                <div class="personal-content">
                    <div class="personal-text">
                        <p>${personal.introduction || ''}</p>
                        ${personal.highlights ? `
                            <ul class="personal-highlights">
                                ${personal.highlights.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        ` : ''}
                    </div>
                    ${personal.image ? `
                        <div class="personal-image">
                            <img src="${personal.image}" alt="About me" class="about-photo">
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    static renderStory(data) {
        const storySection = document.getElementById('story-content');
        if (!storySection || !data.story) return;

        storySection.innerHTML = `
            <div class="story-container">
                <h2>My Story</h2>
                <div class="story-content">
                    ${data.story.content ? `<p>${data.story.content}</p>` : ''}
                </div>
            </div>
        `;
    }

    static renderTimeline(data) {
        const timelineSection = document.getElementById('timeline-content');
        if (!timelineSection || !data.timeline) return;

        const timelineItems = Array.isArray(data.timeline) ? data.timeline : [];
        
        timelineSection.innerHTML = `
            <div class="timeline-container">
                <h2>Timeline</h2>
                <div class="timeline">
                    ${timelineItems.map(item => `
                        <div class="timeline-item">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h3>${item.title}</h3>
                                <span class="timeline-date">${item.date}</span>
                                <p>${item.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    static renderInterests(data) {
        const interestsSection = document.getElementById('interests-content');
        if (!interestsSection || !data.interests) return;

        const interests = Array.isArray(data.interests) ? data.interests : [];
        
        interestsSection.innerHTML = `
            <div class="interests-container">
                <h2>Interests & Hobbies</h2>
                <div class="interests-grid">
                    ${interests.map(interest => `
                        <div class="interest-card">
                            <div class="interest-icon">
                                <i class="${interest.icon}"></i>
                            </div>
                            <h3>${interest.title}</h3>
                            <p>${interest.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // CV page rendering functions
    static renderEducation(data) {
        const educationSection = document.getElementById('education-content');
        if (!educationSection || !data.education) return;

        const education = Array.isArray(data.education) ? data.education : [];
        
        educationSection.innerHTML = `
            <div class="cv-section">
                <h2><i class="fas fa-graduation-cap"></i> Education</h2>
                <div class="cv-items">
                    ${education.map(edu => `
                        <div class="cv-item">
                            <div class="cv-item-header">
                                <h3>${edu.degree}</h3>
                                <span class="cv-date">${edu.period}</span>
                            </div>
                            <h4>${edu.institution}</h4>
                            ${edu.location ? `<p class="cv-location">${edu.location}</p>` : ''}
                            ${edu.description ? `<p>${edu.description}</p>` : ''}
                            ${edu.gpa ? `<p><strong>GPA:</strong> ${edu.gpa}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    static renderExperience(data) {
        const experienceSection = document.getElementById('experience-content');
        if (!experienceSection || !data.experience) return;

        const experience = Array.isArray(data.experience) ? data.experience : [];
        
        experienceSection.innerHTML = `
            <div class="cv-section">
                <h2><i class="fas fa-briefcase"></i> Experience</h2>
                <div class="cv-items">
                    ${experience.map(exp => `
                        <div class="cv-item">
                            <div class="cv-item-header">
                                <h3>${exp.position}</h3>
                                <span class="cv-date">${exp.period}</span>
                            </div>
                            <h4>${exp.company}</h4>
                            ${exp.location ? `<p class="cv-location">${exp.location}</p>` : ''}
                            ${exp.description ? `<p>${exp.description}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    static renderSkills(data) {
        const skillsSection = document.getElementById('skills-content');
        if (!skillsSection || !data.skills) return;

        const skills = Array.isArray(data.skills) ? data.skills : [];
        
        skillsSection.innerHTML = `
            <div class="cv-section">
                <h2><i class="fas fa-cogs"></i> Skills</h2>
                <div class="skills-grid">
                    ${skills.map(skill => `
                        <div class="skill-card">
                            <div class="skill-header">
                                <div class="skill-icon">
                                    <i class="${skill.icon}"></i>
                                </div>
                                <h3>${skill.category}</h3>
                            </div>
                            ${skill.items ? `
                                <ul class="skill-list">
                                    ${skill.items.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            ` : ''}
                            ${skill.description ? `
                                <div class="skill-description">
                                    ${Array.isArray(skill.description) ? 
                                        `<ul>${skill.description.map(item => `<li>${item}</li>`).join('')}</ul>` :
                                        `<p>${skill.description}</p>`
                                    }
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Projects page rendering
    static renderProjects(data) {
        const projectsSection = document.getElementById('projects-content');
        if (!projectsSection || !data.projects) return;

        const projects = Array.isArray(data.projects) ? data.projects : [];
        
        projectsSection.innerHTML = `
            <div class="projects-container">
                <div class="projects-grid">
                    ${projects.map(project => `
                        <div class="project-card">
                            ${project.image ? `
                                <div class="project-image">
                                    <img src="${project.image}" alt="${project.title}">
                                </div>
                            ` : ''}
                            <div class="project-content">
                                <h3>${project.title}</h3>
                                <p>${project.description}</p>
                                ${project.technologies ? `
                                    <div class="project-tech">
                                        ${project.technologies.map(tech => 
                                            `<span class="tech-tag">${tech}</span>`
                                        ).join('')}
                                    </div>
                                ` : ''}
                                ${project.links ? `
                                    <div class="project-links">
                                        ${project.links.map(link => `
                                            <a href="${link.url}" target="_blank" class="project-link">
                                                <i class="${link.icon}"></i>
                                                ${link.text}
                                            </a>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Links page rendering
    static renderLinks(data) {
        console.log('renderLinks called with data:', data);
        const linksContent = document.getElementById('links-content');
        if (!linksContent) {
            console.error('links-content element not found');
            return;
        }

        let html = '';

        // Website & Contact Section
        console.log('Checking contactLinks:', data.contactLinks);
        if (data.contactLinks && Array.isArray(data.contactLinks) && data.contactLinks.length > 0) {
            html += `
                <section class="links-section">
                    <h2 class="links-section-title">
                        <i class="fas fa-globe"></i>
                        Website & Contact
                    </h2>
                    <div class="links-grid">
            `;
            
            data.contactLinks.forEach((link) => {
                html += `
                    <a href="${link.url}" target="_blank" class="link-card website-card">
                        <div class="link-card-content">
                            <div class="link-icon">
                                <i class="${link.icon}"></i>
                            </div>
                            <h3>${link.title}</h3>
                        </div>
                        <div class="link-arrow">
                            <i class="fas fa-external-link-alt"></i>
                        </div>
                    </a>
                `;
            });
            
            html += `
                    </div>
                </section>
            `;
        }

        // Social Media Section
        console.log('Checking socialLinks:', data.socialLinks);
        if (data.socialLinks && Array.isArray(data.socialLinks) && data.socialLinks.length > 0) {
            html += `
                <section class="links-section">
                    <h2 class="links-section-title">
                        <i class="fas fa-share-alt"></i>
                        SNS & Media
                    </h2>
                    <div class="links-grid">
            `;
            
            data.socialLinks.forEach((social) => {
                html += `
                    <a href="${social.url}" target="_blank" class="link-card social-card">
                        <div class="link-card-content">
                            <div class="link-icon">
                                <i class="${social.icon}"></i>
                            </div>
                            <h3>${social.title}</h3>
                        </div>
                        <div class="link-arrow">
                            <i class="fas fa-external-link-alt"></i>
                        </div>
                    </a>
                `;
            });
            
            html += `
                    </div>
                </section>
            `;
        }

        // Portfolio Links Section
        if (data.portfolioLinks) {
            html += `
                <section class="links-section">
                    <h2 class="links-section-title">
                        <i class="fas fa-folder-open"></i>
                        Portfolio
                    </h2>
                    <div class="links-grid">
            `;
            
            data.portfolioLinks.forEach((link) => {
                html += `
                    <a href="${link.url}" class="link-card portfolio-card">
                        <div class="link-card-content">
                            <div class="link-icon">
                                <i class="${link.icon}"></i>
                            </div>
                            <h3>${link.title}</h3>
                        </div>
                        <div class="link-arrow">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </a>
                `;
            });
            
            html += `
                    </div>
                </section>
            `;
        }

        if (html.trim() === '') {
            html = '<div class="no-links">No links data available</div>';
            console.warn('No links data found, showing placeholder');
        }
        
        console.log('Setting innerHTML with html:', html);
        linksContent.innerHTML = html;
        
        // Add loaded class to make sections visible
        setTimeout(() => {
            const linksSections = linksContent.querySelectorAll('.links-section');
            linksSections.forEach(section => {
                section.classList.add('loaded');
            });
        }, 100);
    }
}