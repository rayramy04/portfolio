// =============================================================================
// LINKS PAGE DATA CONFIGURATION
// =============================================================================
// External links organized by category for the Links page.
// Links are displayed in separate sections with specific card styling.
//
// TEMPLATE USAGE GUIDE:
// =====================
// When using this template, you can safely modify the data below:
//
// 1. To remove a section entirely:
//    - Set the array to empty: contact: []
//    - Do NOT delete the property completely
//
// 2. To add new links:
//    - Follow the existing object structure
//    - Use FontAwesome icons (https://fontawesome.com/icons)
//
// 3. Safe modification examples:
//    ✅ contact: []                    // Empty but safe
//    ✅ contact: [{ title: "...", ... }]  // Add your links
//    ❌ delete window.linksData.contact   // Will break the page
//
// The page will automatically hide empty sections and show a helpful
// message if no links are configured.

window.linksData = {
    // Website and contact links - primary external sites
    // To disable this section: set to empty array []
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
    // To disable this section: set to empty array []
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
    // To disable this section: set to empty array []
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

// =============================================================================
// TEMPLATE CUSTOMIZATION EXAMPLES
// =============================================================================
//
// Example: Minimal configuration (empty all sections)
// window.linksData = {
//     contact: [],
//     social: [],
//     portfolio: []
// };
//
// Example: Add your own GitHub link
// social: [
//     {
//         name: "github",
//         url: "https://github.com/YOUR-USERNAME",
//         username: "@YOUR-USERNAME", 
//         title: "GitHub",
//         icon: "fab fa-github"
//     }
// ]
//
// Example: Add custom contact methods
// contact: [
//     {
//         title: "Email",
//         url: "mailto:your-email@example.com",
//         icon: "fas fa-envelope"
//     },
//     {
//         title: "LinkedIn",
//         url: "https://linkedin.com/in/your-profile",
//         icon: "fab fa-linkedin"
//     }
// ]