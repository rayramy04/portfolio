class ErrorHandler {
    static async safeExecute(fn, containerId = null) {
        try {
            return await fn();
        } catch (error) {
            // Log errors only in development environment
            if (this.isDevelopment()) {
                console.error('Error:', error);
            }
            
            // Show user-friendly error message
            if (containerId) {
                const element = document.getElementById(containerId);
                if (element) {
                    element.innerHTML = '<div class="error">Failed to load content</div>';
                }
            }
        }
    }
    
    // Check if running in development environment
    static isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname.includes('github.io') === false;
    }
}