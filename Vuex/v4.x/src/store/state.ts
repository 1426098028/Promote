// Vuex 状态管理模块 当 state 状态 发生变化时，会自动通知 Vue 组件 进行视图的重新渲染更新
// 组件获取更新后的数据 UI 立即更新，展示最新数据
export default function () {
    return {
        CompleteCalcResult: 0,
    };
};


export interface State {
    CompleteCalcResult: number;
  }