// Error handling utilities
class ErrorHandler {
    static async safeExecute(fn, containerId = null, context = null) {
        try {
            return await fn();
        } catch (error) {
            console.error('Error:', error);
            if (containerId) {
                const element = document.getElementById(containerId);
                if (element) element.innerHTML = '<div class="error">Failed to load content</div>';
            }
            if (context && typeof context.handleError === 'function') {
                context.handleError(error, containerId);
            }
        }
    }

    static withErrorHandling(fn) {
        return async function(...args) {
            return await ErrorHandler.safeExecute(() => fn.apply(this, args));
        };
    }

    static decorator(target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        if (typeof originalMethod === 'function') {
            descriptor.value = async function(...args) {
                return await ErrorHandler.safeExecute(
                    () => originalMethod.apply(this, args),
                    null,
                    this
                );
            };
            
            return descriptor;
        };
    }

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