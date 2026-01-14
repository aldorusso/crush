import { writable, derived } from 'svelte/store';

/**
 * Scroll state store
 */
function createScrollStore() {
    const { subscribe, set, update } = writable({
        y: 0,
        lastY: 0,
        direction: 'down',
        progress: 0,
        isHeaderVisible: true
    });

    return {
        subscribe,
        /**
         * Update scroll position
         * @param {number} scrollY - Current scroll Y position
         */
        updateScroll: (scrollY) => update(state => {
            const direction = scrollY > state.y ? 'down' : 'up';
            const height = typeof document !== 'undefined'
                ? document.documentElement.scrollHeight - window.innerHeight
                : 1;
            const progress = (scrollY / height) * 100;
            const isHeaderVisible = scrollY <= state.y || scrollY <= 100;

            return {
                y: scrollY,
                lastY: state.y,
                direction,
                progress,
                isHeaderVisible
            };
        }),
        reset: () => set({
            y: 0,
            lastY: 0,
            direction: 'down',
            progress: 0,
            isHeaderVisible: true
        })
    };
}

export const scrollStore = createScrollStore();

// Derived stores for specific values
export const scrollProgress = derived(scrollStore, $scroll => $scroll.progress);
export const isHeaderVisible = derived(scrollStore, $scroll => $scroll.isHeaderVisible);
