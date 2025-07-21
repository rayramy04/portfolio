// High-performance JSON data loader with caching and error handling
class DataLoader {
    constructor() {
        this.cache = new Map();         // Cache for loaded JSON data
        this.loadingPromises = new Map(); // Prevent duplicate requests
    }

    // Load JSON file with intelligent caching system
    async loadJSON(filePath) {
        // Return cached data immediately if available
        if (this.cache.has(filePath)) {
            return this.cache.get(filePath);
        }

        // Prevent duplicate requests by reusing existing promises
        if (this.loadingPromises.has(filePath)) {
            return this.loadingPromises.get(filePath);
        }

        // Create new loading promise and track it
        const loadingPromise = this.fetchJSON(filePath);
        this.loadingPromises.set(filePath, loadingPromise);

        try {
            const data = await loadingPromise;
            this.cache.set(filePath, data);              // Cache successful result
            this.loadingPromises.delete(filePath);       // Clean up tracking
            return data;
        } catch (error) {
            this.loadingPromises.delete(filePath);       // Clean up on error
            throw error;
        }
    }

    async fetchJSON(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error loading ${filePath}:`, error);
            return this.getEmptyStructure(filePath);
        }
    }

    // Provide fallback empty structures
    getEmptyStructure(filePath) {
        if (filePath.includes('hero')) {
            return {};
        } else if (filePath.includes('personal')) {
            return {};
        } else if (filePath.includes('projects')) {
            return [];
        }
        return {};
    }

    // Load all data files for new structure
    async loadAllData() {
        try {
            const [
                // Common data
                commonData,
                
                // Home page data
                heroData,
                
                // About page data
                personalData,
                storyData,
                timelineData,
                interestsData,
                
                // CV page data
                educationData,
                experienceData,
                skillsData,
                awardsData,
                certificationsData,
                grantsData,
                
                // Projects page data
                projectsData,
                
                // Links page data
                contactData
            ] = await Promise.all([
                // Common
                this.loadJSON('data/common.json'),
                
                // Home
                this.loadJSON('data/home/hero.json'),
                
                // About
                this.loadJSON('data/about/personal.json'),
                this.loadJSON('data/about/story.json'),
                this.loadJSON('data/about/timeline.json'),
                this.loadJSON('data/about/interests.json'),
                
                // CV
                this.loadJSON('data/cv/education.json'),
                this.loadJSON('data/cv/experience.json'),
                this.loadJSON('data/cv/skills.json'),
                this.loadJSON('data/cv/awards.json'),
                this.loadJSON('data/cv/certifications.json'),
                this.loadJSON('data/cv/grants.json'),
                
                // Projects
                this.loadJSON('data/projects/projects.json'),
                
                // Links
                this.loadJSON('data/links/contact.json')
            ]);

            return {
                // Common data
                profile: commonData.profile || {},
                socialLinks: commonData.socialLinks || [],
                portfolioLinks: commonData.portfolioLinks || [],
                navigation: commonData.navigation || [],
                
                // Home page
                hero: heroData,
                
                // About page
                personal: personalData,
                story: storyData,
                timeline: timelineData,
                interests: interestsData,
                
                // CV page
                education: educationData,
                experience: experienceData,
                skills: skillsData,
                awards: awardsData,
                certifications: certificationsData,
                grants: grantsData,
                
                // Projects page
                projects: projectsData,
                
                // Links page
                contactLinks: contactData
            };
        } catch (error) {
            console.error('Error loading data:', error);
            return {
                profile: {},
                socialLinks: [],
                portfolioLinks: [],
                navigation: [],
                hero: {},
                personal: {},
                story: {},
                timeline: [],
                interests: [],
                education: [],
                experience: [],
                skills: [],
                awards: {},
                certifications: [],
                grants: [],
                projects: [],
                contactLinks: []
            };
        }
    }

    // Clear cache (useful for development)
    clearCache() {
        this.cache.clear();
        this.loadingPromises.clear();
    }
}

// Global data loader instance
const dataLoader = new DataLoader();

// Global data storage
let portfolioData = {
    profile: {},
    socialLinks: [],
    portfolioLinks: [],
    navigation: [],
    hero: {},
    personal: {},
    story: {},
    timeline: [],
    interests: [],
    education: [],
    experience: [],
    skills: [],
    awards: {},
    certifications: [],
    grants: [],
    projects: [],
    contactLinks: []
};

async function initializeData() {
    try {
        portfolioData = await dataLoader.loadAllData();
        document.dispatchEvent(new CustomEvent('dataLoaded', { 
            detail: portfolioData 
        }));
    } catch (error) {
        console.error('Failed to initialize data:', error);
    }
}

// Helper function to get site data
function getPortfolioData() {
    return portfolioData;
}

// Data initialization is now handled by load-components.js
// to ensure proper timing with component loading