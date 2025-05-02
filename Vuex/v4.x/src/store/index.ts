// Vuex 采用 单向数据流，确保状态管理的可预测性和可维护性
import { createStore } from 'vuex';
import state from '@/store/state';
import actions from '@/store/actions';
import mutations from '@/store/mutations';
import getters from '@/store/getters';
import ModuleA from '@/store/Module/A'; // 状态模块化
import ModuleB from '@/store/Module/B'; // 状态模块化
import ModuleC from '@/store/Module/C'; // 状态模块化
const Store = createStore({
    state,
    actions,
    mutations,
    getters,
    modules: {
        ModuleA, ModuleB, ModuleC
    },
});
// const Store = createStore({ state:{}|()=>{}, actions:{}, mutations:{}, getters:{},modules:{},plugins:[],strict:false,devtools: false});

export default Store;
