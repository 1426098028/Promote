import { createPinia, defineStore } from 'pinia';

const useUserStore = defineStore('userid', {
    state: () => {
        return {
            userName: '张三'
        };
    },
    getters: {},
    actions: {}
});

// const pinia = createPinia();
export { useUserStore };
