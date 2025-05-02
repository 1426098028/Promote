// mutation 属性 是 Vuex 中唯一可以直接修改 state 状态的方式，同时该函数必须是同步函数;
// 需要通过 commit 方法进行触发调用，不可以直接调用
import { ONBDECREMENT, ONBINCREASE } from './Mutation-types';

// 触发方式

// Store.commit({ type: 'Mutations函数名', payload: '任意内容一般为对象', });
// // 或者
// Store.commit('Mutations函数名', '有数据就填变量');

import type { State } from './state';
export default {
    [ONBINCREASE](state:State, payload:{Cardinality:number}) {
        state.BCalcResult += payload.Cardinality;
    },
    [ONBDECREMENT](state:State, payload:{Cardinality:number}) {
        state.BCalcResult -= payload.Cardinality;
    },
};
