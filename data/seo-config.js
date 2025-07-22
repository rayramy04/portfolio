// SEO structured data configuration
window.seoConfig = {
    // Person data
    person: {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ray",
        "jobTitle": "Computer Science & Data Science Student",
        "description": "Computer Science & Data Science student at Monash University Malaysia with expertise in AI/ML, full-stack development, and research.",
        "url": "https://yoursite.com",
        "image": "https://yoursite.com/assets/profile.jpg",
        "sameAs": [
            "https://github.com/yourusername",
            "https://linkedin.com/in/yourusername"
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

    // Website data
    website: {
        "@context": "https://schema.org",
        "@type": "Website",
        "name": "Ray's Portfolio",
        "description": "Portfolio website showcasing computer science and data science projects, AI/ML applications, and professional experience.",
        "url": "https://yoursite.com",
        "author": {
            "@type": "Person",
            "name": "Ray"
        },
        "inLanguage": "ja"
    },

    // Page-specific data
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
        }
    }
};