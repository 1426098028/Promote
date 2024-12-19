import { createPinia, defineStore } from 'pinia';
import { getUserMenu } from '@/api/user';
import { useUserStore } from '@/pinia/useUserStore';
import { Parent } from '@/interface/user';
const useMenuStore = defineStore('MenuId', {
    state: (): { menu: Parent[]; } => {
        return {
            menu: []
        };
    },
    getters: {

    },
    actions: {
        async getMenu() {
            const { rolePerm } = useUserStore();
            const { data } = await getUserMenu(rolePerm);
            this.menu = data;
            console.log('获取路由', data);
        }
    },
    // persist 属性并非 pinia 自带的，是使用了 pinia-plugin-persist 插件，插件添加上的
    // pinia-plugin-persist 作用的是使 pinia 状态数据持久化
    persist: {
        enabled: true, // 开启数据缓存
        strategies: [ // 开启数据缓存
            {
                storage: localStorage, // 缓存的方式 默认是 session
                paths: ["menu"], // 希望进行数据持久化的字段，只需要传递字段即可
            }
        ],
    }
});

// const pinia = createPinia();
export { useMenuStore };
