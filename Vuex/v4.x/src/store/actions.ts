// Actions 使用方式 类似 mutation;
// 但是 Actions 是不可以直接修改 state 状态值的 ， Actions 是通过触发 commit 让 mutation 去修改 状态
// Actions 支持任意的异步操作

// 需要通过 dispatch 方法进行触发调用，不可以直接调用、



// 触发方式

// Store.dispatch({ type: 'Actions中函数名', payload: '任意内容，一般为对象', });
// 或者
// Store.dispatch('Actions中函数名', '有数据就填变量');


import { ONACTIONCOMPLETEDECREMENT, ONACTIONCOMPLETEINCREASE, } from '@/store/Actions-types';
import { ONCOMPLETEDECREMENT, ONCOMPLETEINCREASE, } from '@/store/Mutation-types';
import type { State } from '@/store/state'; // 你自己的 State 类型
import type { ActionContext } from 'vuex';
type ActionContextType =ActionContext<State,State>
export default {
    [ONACTIONCOMPLETEINCREASE](context:ActionContextType, payload:number) {
        // 异步操作 这里不暂时不实现异步的操作
        // context.commit({ type: ONCOMPLETEDECREMENT, Cardinality: payload });
        context.commit({ type: ONCOMPLETEINCREASE, Cardinality: payload });
    },
    [ONACTIONCOMPLETEDECREMENT](context:ActionContextType, payload:{Cardinality:number}) {
        // 异步操作 这里不暂时不实现异步的操作
        context.commit({ type: ONCOMPLETEDECREMENT, Cardinality: payload.Cardinality });
        // context.commit({ type: ONCOMPLETEDECREMENT, Cardinality: payload });

    },
};
