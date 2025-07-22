// Simplified error handling
class ErrorHandler {
    // Basic safe execution with error logging
    static async safeExecute(fn, containerId = null) {
        try {
            return await fn();
        } catch (error) {
            console.error('Error:', error);
            if (containerId) {
                const element = document.getElementById(containerId);
                if (element) {
                    element.innerHTML = '<div class="error">Failed to load content</div>';
                }
            }
        }
    }
}