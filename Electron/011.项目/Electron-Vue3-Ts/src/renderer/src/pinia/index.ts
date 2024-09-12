import { createPinia, defineStore } from 'pinia';

const useStore = defineStore('storeid', {
    state: () => {
        return {
            creator: `Powered by electron-vite`
        };
    },
    getters: {},
    actions: {}
});

const pinia = createPinia();
export { pinia, useStore };
