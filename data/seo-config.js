// SEO structured data configuration for search engine optimization
// Uses JSON-LD schema.org markup to help search engines understand content
window.seoConfig = {
    // Person schema - defines you as a person entity for search engines
    person: {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ray", // Full name as it appears in search results
        "jobTitle": "Computer Science & Data Science Student",
        "description": "Computer Science & Data Science student at Monash University Malaysia with expertise in AI/ML, full-stack development, and research.",
        "url": "https://yoursite.com", // UPDATE: Your website URL
        "image": "https://yoursite.com/assets/profile.jpg", // UPDATE: Profile photo URL
        "sameAs": [ // Social media profiles for search engine linking
            "https://github.com/yourusername", // UPDATE: Your GitHub URL
            "https://linkedin.com/in/yourusername" // UPDATE: Your LinkedIn URL
        ],
        "affiliation": {
            "@type": "Organization",
            "name": "Monash University Malaysia"
        },
        "knowsAbout": [ // Areas of expertise for search relevance
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
    // Website schema - defines site structure and metadata
    website: {
        "@context": "https://schema.org",
        "@type": "Website",
        "name": "Ray's Portfolio",
        "description": "Portfolio website showcasing computer science and data science projects, AI/ML applications, and professional experience.",
        "url": "https://yoursite.com", // UPDATE: Your domain
        "author": {
            "@type": "Person",
            "name": "Ray"
        },
        "inLanguage": "ja" // Primary language (ja=Japanese, en=English)
    },
    // Page-specific structured data for different page types
    pages: {
        index: { // Homepage schema
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "mainEntity": {
                "@type": "Person",
                "name": "Ray"
            }
        },
        about: { // About page schema
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
                "@type": "Person",
                "name": "Ray"
            }
        },
        projects: { // Projects page schema
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Ray's Projects",
            "description": "Collection of AI/ML and web development projects"
        }
    }
};