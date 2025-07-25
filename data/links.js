// =============================================================================
// LINKS PAGE DATA CONFIGURATION
// =============================================================================
// External links organized by category for the Links page.
// Links are displayed in separate sections with specific card styling.

window.linksData = {
    // Website and contact links - primary external sites
    contact: [
        {
            title: "Rayの海外生活ノート", // Display name for the link
            url: "https://ray-globallife.com/", // External URL
            icon: "fas fa-home" // FontAwesome icon
        },
        {
            title: "Contact",
            url: "https://ray-globallife.com/contact/",
            icon: "fas fa-paper-plane"
        }
    ],
    // Social media platform links - matches common.js socialLinks structure
    social: [
        {
            name: "github", // Internal identifier for CSS styling
            url: "https://github.com/ll-0013py",
            username: "@ll-0013py", // Display username/handle
            title: "GitHub", // Platform display name
            icon: "fab fa-github" // FontAwesome brand icon
        },
        {
            name: "twitter",
            url: "https://x.com/ll_0013py",
            username: "@ll_0013py",
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
    // Internal portfolio navigation links - relative URLs within the site
    portfolio: [
        {
            name: "Portfolio", // Internal name identifier
            url: "index.html", // Relative URL to homepage
            title: "Portfolio", // Display title
            icon: "fas fa-home", // Left-side icon
            rightIcon: "fas fa-arrow-right" // Right-side navigation arrow
        }
        // Add additional internal portfolio links here as needed
    ]
};