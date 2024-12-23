import { createPinia, defineStore } from 'pinia';
import { ITagRoute } from '@/interface/tag';


const useTagStore = defineStore('TagId', {
    state: (): { viewTags: ITagRoute[]; } => {
        return {
            viewTags: []
        };
    },
    getters: {

    },
    actions: {
        pushViewTags(route: ITagRoute) {
            const { affix } = route;
            let target: number = this.viewTags.find(item => item.path === route.path);
            !target && this.viewTags[affix ? 'unshift' : 'push'](route);
        },
        removeViewTags(route: ITagRoute) {
            this.viewTags.forEach((item: ITagRoute, index: number) => {
                if (item.path == route.path) {
                    this.viewTags.splice(index, 1);
                }
            });
        }
    },
    // persist 属性并非 pinia 自带的，是使用了 pinia-plugin-persist 插件，插件添加上的
    // pinia-plugin-persist 作用的是使 pinia 状态数据持久化
    persist: {
        enabled: true, // 开启数据缓存
        strategies: [ // 开启数据缓存
            {
                storage: localStorage, // 缓存的方式 默认是 session
                paths: ["viewTags"], // 希望进行数据持久化的字段，只需要传递字段即可
            }
        ],
    }
});

export { useTagStore };
