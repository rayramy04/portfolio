// Page-specific rendering functions for better organization
// This module contains all rendering logic separated by page domains

class PageRenderers {
    // Home page rendering
    static renderHero(data) {
        console.log('renderHero called with data:', data);
        const heroSection = document.getElementById('hero-content');
        if (!heroSection) {
            console.error('hero-content element not found');
            return;
        }
        if (!data.hero) {
            console.error('No hero data found');
            return;
        }

        const hero = data.hero;
        const profile = data.profile || {};
        
        const htmlContent = `
            <div class="hero-container">
                <div class="hero-content">
                    <div class="hero-text">
                        <h1 class="hero-title">${hero.name || hero.title || profile.name || 'Welcome'}</h1>
                        <p class="hero-subtitle">${hero.subtitle || hero.title || profile.title || ''}</p>
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
                    ${hero.photo || profile.photo ? `
                        <div class="hero-image">
                            <img src="${hero.photo || profile.photo}" alt="${hero.name || profile.name}" class="profile-photo">
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        console.log('Generated HTML content:', htmlContent);
        heroSection.innerHTML = htmlContent;
        console.log('After setting innerHTML, heroSection content:', heroSection.innerHTML);
        
        // Add loaded class for transition effect
        setTimeout(() => {
            heroSection.classList.add('loaded');
        }, 100);
    }

    // About page rendering functions
    static renderPersonal(data) {
        console.log('renderPersonal called with data:', data);
        // About page uses different element IDs, update dynamically
        const aboutTitle = document.getElementById('about-title');
        const aboutName = document.getElementById('about-name');
        const aboutPosition = document.getElementById('about-position');
        const aboutDescription = document.getElementById('about-description');
        
        if (!aboutName || !data.personal) {
            console.error('About page personal elements not found or no personal data');
            return;
        }

        const personal = data.personal;
        
        // Update individual elements instead of innerHTML
        if (aboutName) aboutName.textContent = personal.name || '';
        if (aboutPosition) aboutPosition.textContent = personal.position || '';
        if (aboutDescription) aboutDescription.textContent = personal.description || '';
        
        // Add loaded class to about content container
        const aboutContent = document.querySelector('.about-content');
        if (aboutContent) {
            setTimeout(() => {
                aboutContent.classList.add('loaded');
            }, 100);
        }
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
        
        // Add loaded class for transition effect
        setTimeout(() => {
            storySection.classList.add('loaded');
        }, 100);
    }

    static renderTimeline(data) {
        console.log('renderTimeline called with data:', data);
        const timelineSection = document.getElementById('timeline-container');
        if (!timelineSection) {
            console.error('timeline-container element not found');
            return;
        }
        if (!data.timeline) {
            console.error('No timeline data found');
            return;
        }

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
        
        // Add loaded class for transition effect
        setTimeout(() => {
            timelineSection.classList.add('loaded');
        }, 100);
    }

    static renderInterests(data) {
        console.log('renderInterests called with data:', data);
        const interestsSection = document.getElementById('interests-container');
        if (!interestsSection) {
            console.error('interests-container element not found');
            return;
        }
        if (!data.interests) {
            console.error('No interests data found');
            return;
        }

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
        
        // Add loaded class for transition effect
        setTimeout(() => {
            interestsSection.classList.add('loaded');
        }, 100);
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
        
        // Add loaded class for transition effect
        setTimeout(() => {
            educationSection.classList.add('loaded');
        }, 100);
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
        
        // Add loaded class for transition effect
        setTimeout(() => {
            experienceSection.classList.add('loaded');
        }, 100);
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
        
        // Add loaded class for transition effect
        setTimeout(() => {
            skillsSection.classList.add('loaded');
        }, 100);
    }

    // Projects page rendering
    static renderProjects(data) {
        console.log('renderProjects called with data:', data);
        const projectsSection = document.getElementById('projects-container');
        if (!projectsSection) {
            console.error('projects-container element not found');
            return;
        }
        if (!data.projects) {
            console.error('No projects data found');
            return;
        }

        const projects = Array.isArray(data.projects) ? data.projects : [];
        console.log('Projects data:', projects);
        
        projectsSection.innerHTML = `
            <div class="projects-container">
                <div class="projects-grid">
                    ${projects.map(project => `
                        <div class="project-card">
                            ${project.image ? `
                                <div class="project-image">
                                    <img src="${project.image}" alt="${project.name || project.title}">
                                </div>
                            ` : ''}
                            <div class="project-content">
                                <h3>${project.name || project.title}</h3>
                                <p>${project.description}</p>
                                ${project.technologies ? `
                                    <div class="project-tech">
                                        ${project.technologies.map(tech => 
                                            `<span class="tech-tag">${tech}</span>`
                                        ).join('')}
                                    </div>
                                ` : ''}
                                ${project.githubUrl || project.liveUrl || project.links ? `
                                    <div class="project-links">
                                        ${project.githubUrl ? `
                                            <a href="${project.githubUrl}" target="_blank" class="project-link">
                                                <i class="fab fa-github"></i>
                                                GitHub
                                            </a>
                                        ` : ''}
                                        ${project.liveUrl ? `
                                            <a href="${project.liveUrl}" target="_blank" class="project-link">
                                                <i class="fas fa-external-link-alt"></i>
                                                Live Demo
                                            </a>
                                        ` : ''}
                                        ${project.links ? project.links.map(link => `
                                            <a href="${link.url}" target="_blank" class="project-link">
                                                <i class="${link.icon}"></i>
                                                ${link.text}
                                            </a>
                                        `).join('') : ''}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Add loaded class for transition effect
        setTimeout(() => {
            projectsSection.classList.add('loaded');
        }, 100);
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