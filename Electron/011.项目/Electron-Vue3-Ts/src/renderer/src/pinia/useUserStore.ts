import { createPinia, defineStore } from 'pinia';
import { getInfo } from '@/api/user';
import { Role, IUserInfo } from '@/interface/user';


const useUserStore = defineStore('UserId', {
    state: (): { roles: Role[], rolePerm: string; userInfo: Partial<IUserInfo>; } => {
        return {
            roles: [],
            rolePerm: '',
            userInfo: {}
        };
    },
    getters: {

    },
    actions: {
        async getUserInfo() {
            const res = await getInfo();
            const { userInfo, permissions, units, roles } = res.data;
            this.roles = roles;
            this.rolePerm = roles[0].rolePerm;
            this.userInfo = userInfo;
            console.log('获取用户信息', userInfo, permissions, units, roles);
        }
    },
    // persist 属性并非 pinia 自带的，是使用了 pinia-plugin-persist 插件，插件添加上的
    // pinia-plugin-persist 作用的是使 pinia 状态数据持久化
    persist: {
        enabled: true, // 开启数据缓存
        strategies: [ // 开启数据缓存
            {
                storage: localStorage, // 缓存的方式 默认是 session
                paths: ['rolePerm', "userInfo"], // 希望进行数据持久化的字段，只需要传递字段即可
            }
        ],
    }
});

// const pinia = createPinia();
export { useUserStore };
