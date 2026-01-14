/**
 * Debounce function to limit how often a function can fire
 * @template {(...args: any[]) => any} T
 * @param {T} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {(...args: Parameters<T>) => void} - Debounced function
 */
export function debounce(func, wait) {
    /** @type {ReturnType<typeof setTimeout> | undefined} */
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit execution rate
 * @template {(...args: any[]) => any} T
 * @param {T} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {(...args: Parameters<T>) => void} - Throttled function
 */
export function throttle(func, limit) {
    /** @type {boolean | undefined} */
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Request animation frame with fallback
 * @param {FrameRequestCallback} callback - Callback function
 * @returns {number} - Request ID
 */
export function raf(callback) {
    return window.requestAnimationFrame(callback);
}

/**
 * Cancel animation frame
 * @param {number} id - Request ID
 */
export function cancelRaf(id) {
    window.cancelAnimationFrame(id);
}
