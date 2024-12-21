import { createPinia, defineStore } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';

// 创建单独的 用户 Store模块
import { useUserStore } from '@/pinia/useUserStore';

// 创建单独的 菜单 Store模块
import { useMenuStore } from '@/pinia/useMenuStore';

// 创建单独的 路由标签 Store模块
import { useTagStore } from '@/pinia/useTagStore';

const useStore = defineStore('storeid', {
    state: () => {
        return {
            creator: `Powered by electron-vite`,
            User: useUserStore(), // 用户
            Menu: useMenuStore(), // 菜单
            Tag: useTagStore(), // 路由标签
        };
    },
    getters: {},
    actions: {},

    // persist 属性并非 pinia 自带的，是使用了 pinia-plugin-persist 插件，插件添加上的
    // pinia-plugin-persist 作用的是使 pinia 状态数据持久化
    persist: {
        enabled: true, // 开启数据缓存
        strategies: [ // 开启数据缓存
            {
                storage: localStorage, // 缓存的方式 默认是 session
                paths: ['creator', 'User', 'Menu', "Tag"], // 希望进行数据持久化的字段，只需要传递字段即可
            }
        ],
    }
});

const pinia = createPinia();
// 使用 pinia-plugin-persist 插件
pinia.use(piniaPluginPersist);
export { pinia, useStore };
