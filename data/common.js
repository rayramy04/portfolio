// Site-wide shared data configuration
window.commonData = {
    // Language settings
    lang: {
        current: 'en', // Default language: 'en' or 'ja'
        available: ['en', 'ja']
    },
    // UI text for language switcher
    ui: {
        langSwitch: {
            en: { flag: '🇺🇸', label: 'EN' },
            ja: { flag: '🇯🇵', label: 'JP' }
        }
    },
    // Basic profile info displayed in headers/footers
    profile: {
        name: "Ray",
        title: {
            en: "Computer Science & Data Science Student",
            ja: "コンピュータサイエンス・データサイエンス学生"
        },
        photo: "assets/profile.jpg" // Path to profile image
    },
    // Social media links displayed in footer and links page
    socialLinks: [
        {
            name: "github", // Internal identifier (used for CSS classes)
            url: "https://github.com/rayramy04",
            username: "@rayramy04", // Display username/handle
            title: "GitHub", // Human-readable platform name
            icon: "fab fa-github" // FontAwesome icon class
        },
        {
            name: "twitter",
            url: "https://x.com/rayramy04",
            username: "@rayramy04",
            title: "X (Twitter)",
            icon: "fab fa-twitter"
        },
        {
            name: "note",
            url: "https://note.com/ll_0013py",
            username: "@ll_0013py",
            title: "note",
            icon: "fas fa-pen-nib"
        },
        {
            name: "youtube",
            url: "https://www.youtube.com/@ray_pianocover",
            username: "@ray_pianocover",
            title: "YouTube",
            icon: "fab fa-youtube"
        }
    ],
    // Internal portfolio navigation links
    portfolioLinks: [
        {
            name: "Portfolio",
            url: "index.html", // Relative URL to homepage
            title: "Portfolio",
            icon: "fas fa-home"
        }
    ],
    // Main site navigation menu - order determines display order
    navigation: [
        {
            name: "Home", // Display text in navigation
            href: "index.html", // Page file path
            icon: "fas fa-home" // FontAwesome icon for mobile/visual nav
        },
        {
            name: "About",
            href: "about.html",
            icon: "fas fa-user"
        },
        {
            name: "CV",
            href: "cv.html",
            icon: "fas fa-file-alt"
        },
        {
            name: "Projects",
            href: "projects.html",
            icon: "fas fa-briefcase"
        },
        {
            name: "Links",
            href: "links.html",
            icon: "fas fa-link"
        }
    ],
    // Resume download button labels
    resumeButtons: {
        ja: {
            text: "レジュメをダウンロード (日本語)",
            icon: "fas fa-file-download"
        },
        en: {
            text: "Download Resume (English)",
            icon: "fas fa-file-download"
        }
    }
};