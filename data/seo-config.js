// SEO structured data configuration using JSON-LD schema.org markup
window.seoConfig = {
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
};