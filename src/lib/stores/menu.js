import { writable } from 'svelte/store';

/**
 * Menu state store
 */
function createMenuStore() {
    const { subscribe, set, update } = writable(false);

    return {
        subscribe,
        open: () => {
            set(true);
            if (typeof document !== 'undefined') {
                document.body.style.overflow = 'hidden';
            }
        },
        close: () => {
            set(false);
            if (typeof document !== 'undefined') {
                document.body.style.overflow = 'auto';
            }
        },
        toggle: () => update(isOpen => {
            const newState = !isOpen;
            if (typeof document !== 'undefined') {
                document.body.style.overflow = newState ? 'hidden' : 'auto';
            }
            return newState;
        })
    };
}

export const menuStore = createMenuStore();
