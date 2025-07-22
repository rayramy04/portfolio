/**
 * Error Handling Utilities
 * Provides decorators and utilities for consistent error handling across pages
 */
class ErrorHandler {
    /**
     * Safe execution wrapper for async functions
     * @param {Function} fn - Async function to execute
     * @param {string} containerId - Container ID for error display
     * @param {Object} context - Context object (usually 'this' from page class)
     * @returns {Promise<any>} Result of function or undefined on error
     */
    static async safeExecute(fn, containerId = null, context = null) {
        try {
            return await fn();
        } catch (error) {
            if (context && typeof context.handleError === 'function') {
                context.handleError(error, containerId);
            } else {
                console.error('Error in safe execution:', error);
                if (containerId) {
                    const element = document.getElementById(containerId);
                    if (element) {
                        element.innerHTML = `<div class="error">Failed to load content</div>`;
                    }
                }
            }
        }
    }

    /**
     * Create a safe async method decorator
     * @param {string} containerId - Container ID for error display
     * @returns {Function} Decorator function
     */
    static withErrorHandling(containerId = null) {
        return function(target, propertyName, descriptor) {
            const method = descriptor.value;
            
            descriptor.value = async function(...args) {
                return await ErrorHandler.safeExecute(
                    () => method.apply(this, args),
                    containerId,
                    this
                );
            };
            
            return descriptor;
        };
    }

    /**
     * Batch safe execution for multiple async functions (parallel execution)
     * @param {Array} operations - Array of {fn, containerId} objects
     * @param {Object} context - Context object
     * @param {boolean} parallel - Execute in parallel (default: true)
     * @returns {Promise<Array>} Array of results
     */
    static async safeExecuteAll(operations, context = null, parallel = true) {
        if (parallel) {
            return await Promise.all(
                operations.map(op => this.safeExecute(op.fn, op.containerId, context))
            );
        }
        
        const results = [];
        for (const op of operations) {
            const result = await this.safeExecute(op.fn, op.containerId, context);
            results.push(result);
        }
        return results;
    }
}