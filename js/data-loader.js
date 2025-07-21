// Data Loader for Portfolio JSON Files
class DataLoader {
    constructor() {
        this.cache = new Map();
        this.loadingPromises = new Map();
    }

    // Load JSON data with caching
    async loadJSON(filePath) {
        // Return cached data if available
        if (this.cache.has(filePath)) {
            return this.cache.get(filePath);
        }

        // Return existing promise if already loading
        if (this.loadingPromises.has(filePath)) {
            return this.loadingPromises.get(filePath);
        }

        // Create new loading promise
        const loadingPromise = this.fetchJSON(filePath);
        this.loadingPromises.set(filePath, loadingPromise);

        try {
            const data = await loadingPromise;
            this.cache.set(filePath, data);
            this.loadingPromises.delete(filePath);
            return data;
        } catch (error) {
            this.loadingPromises.delete(filePath);
            throw error;
        }
    }

    // Fetch JSON data from file
    async fetchJSON(filePath) {
        try {
            console.log(`Fetching JSON from: ${filePath}`);
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.status}`);
            }
            const data = await response.json();
            console.log(`Successfully loaded ${filePath}:`, data);
            return data;
        } catch (error) {
            console.error(`Error loading JSON from ${filePath}:`, error);
            // Return empty structure as fallback
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

// Initialize data loading
async function initializeData() {
    try {
        console.log('Starting data initialization...');
        portfolioData = await dataLoader.loadAllData();
        console.log('Site data loaded successfully:', portfolioData);
        console.log('Hero data specifically:', portfolioData.hero);
        
        // Trigger custom event when data is loaded
        document.dispatchEvent(new CustomEvent('dataLoaded', { 
            detail: portfolioData 
        }));
        console.log('DataLoaded event dispatched');
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