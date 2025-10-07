// ==========================================
// SEO CONFIGURATION
// ==========================================
// This file contains all customizable SEO settings.
// Edit this file to personalize your portfolio.

const seoConfig = {
    // Basic site information
    baseUrl: "https://rayramy04.github.io/portfolio/",
    author: "Ray",
    siteName: "Ray's Portfolio",

    // Page-specific SEO settings
    pages: {
        index: {
            title: "Ray's Portfolio | Computer Science & Data Science",
            metaDescription: "Ray - Computer Science & Data Science student at Monash University Malaysia. AI/ML projects, full-stack development, award-winning research experience. Explore innovative tech solutions.",
            metaKeywords: "Ray, portfolio, computer science, data science, AI, machine learning, web development, Monash University Malaysia",
            ogImage: "assets/og-image.jpg"
        },
        about: {
            title: "About - Ray's Portfolio",
            metaDescription: "Meet Ray - CS & Data Science student with awards in AI research, music production, and international competitions. From Japan to Malaysia, discover my journey in tech innovation.",
            metaKeywords: "Ray, about, computer science, data science, Monash University Malaysia, AI research, international student",
            ogImage: "assets/about-photo.jpg"
        },
        cv: {
            title: "CV - Ray's Portfolio",
            metaDescription: "Ray's CV - Monash University CS/Data Science student with scholarships, AI research awards, full-stack development skills. Python, JavaScript, Machine Learning expertise.",
            metaKeywords: "Ray, CV, curriculum vitae, computer science, data science, scholarship, AI research, full-stack developer",
            ogImage: "assets/profile.jpg"
        },
        projects: {
            title: "Projects - Ray's Portfolio",
            metaDescription: "Ray's Tech Projects - AI/ML applications, full-stack web development, data analysis tools. Explore innovative solutions built with Python, JavaScript, and modern frameworks.",
            metaKeywords: "Ray, projects, AI, machine learning, web development, Python, JavaScript, full-stack development, data analysis",
            ogImage: "assets/projects/portfolio.jpg"
        },
        links: {
            title: "Links - Ray's Portfolio",
            metaDescription: "Connect with Ray - Find my GitHub projects, LinkedIn profile, social media, and contact information. Let's collaborate on innovative tech solutions and AI research.",
            metaKeywords: "Ray, contact, GitHub, LinkedIn, social media, collaboration, networking, tech professional",
            ogImage: "assets/profile.jpg"
        }
    },

    // JSON-LD structured data configuration using schema.org markup
    structuredData: {
        person: {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ray",
            "jobTitle": "Computer Science & Data Science Student",
            "description": "Computer Science & Data Science student at Monash University Malaysia with expertise in AI/ML, full-stack development, and research.",
            "url": "https://rayramy04.github.io/portfolio/",
            "image": "https://rayramy04.github.io/portfolio/assets/profile.jpg",
            "sameAs": [
                "https://github.com/rayramy04",
                "https://x.com/rayramy04",
                "https://note.com/ll_0013py",
                "https://www.youtube.com/@ray_pianocover"
            ],
            "affiliation": {
                "@type": "Organization",
                "name": "Monash University Malaysia"
            },
            "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "Full-stack Development",
                "Python Programming",
                "JavaScript",
                "Data Science"
            ],
            "alumniOf": {
                "@type": "Organization",
                "name": "Monash University Malaysia"
            }
        },
        website: {
            "@context": "https://schema.org",
            "@type": "Website",
            "name": "Ray's Portfolio",
            "description": "Portfolio website showcasing computer science and data science projects, AI/ML applications, and professional experience.",
            "url": "https://rayramy04.github.io/portfolio/",
            "author": {
                "@type": "Person",
                "name": "Ray"
            },
            "inLanguage": "ja"
        },
        // Page-specific structured data
        pages: {
            index: {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                "mainEntity": {
                    "@type": "Person",
                    "name": "Ray"
                }
            },
            about: {
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "mainEntity": {
                    "@type": "Person",
                    "name": "Ray"
                }
            },
            projects: {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "Ray's Projects",
                "description": "Collection of AI/ML and web development projects"
            },
            cv: {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                "mainEntity": {
                    "@type": "Person",
                    "name": "Ray"
                }
            },
            links: {
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "mainEntity": {
                    "@type": "Person",
                    "name": "Ray"
                }
            }
        }
    }
};

// Export for Node.js (generate-pages.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = seoConfig;
}

// Export for browser (pages-unified.js)
if (typeof window !== 'undefined') {
    window.seoConfig = seoConfig.structuredData;
}