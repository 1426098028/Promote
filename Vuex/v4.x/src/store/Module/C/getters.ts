// getters 机制类似于Vue 中 computed 具备了缓存机制，在状态发生变化时会重新计算值
// 推荐 通过 computed 去 触发 getters ，而不是直接触发 ， 直接触发 缓存 效果不好

export default {
    CEnlarge: (state:{CCalcResult:number}) => state.CCalcResult * 100,
    CEnlargeActivity: (state:{CCalcResult:number}) => (Calc = 1) => state.CCalcResult * Calc
};
