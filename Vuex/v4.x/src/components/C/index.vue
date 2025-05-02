<template>
    <div class='C'>
        <h2>{{ title }}</h2>
        <h3>计算结果：{{ store.state.ModuleC.CCalcResult }}</h3>
        <h3>放大百倍 通过 直接 去触发 缓存机制效果不好：{{ store.getters.CEnlarge }}</h3>
        <h3>放大百倍 通过 computed 去触发 缓存机制正常：{{ CEnlarge }}</h3>
        <h3>放大百倍 通过 computed 去触发 缓存机制正常：{{ CEnlargeActivity }}</h3>
        <select name="SelectNumder" id="SelectNumder" v-model.number='SelectNumder'>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        <button @click='onIncrease'>
            Mutation 自增一
        </button>
        <button @click='onDecrement'>
            Mutation 自减一
        </button>
        <br>
        <button @click='onSelectIncrease'>
            Action 根据选择增加
        </button>
        <button @click='onSelectDecrement'>
            Action 根据选择减少
        </button>
        <button @click='onReplaceState'>
            replaceState 重置 Vuex 状态
        </button>
    </div>
</template>
<script setup lang='ts'>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { ONCINCREASE, ONCDECREMENT, } from '@/store/Module/C/Mutation-types';
import { ONACTIONCINCREASE, ONACTIONCDECREMENT, } from '@/store/Module/C/Actions-types';
const store = useStore();
console.log(store);
const title = ref('C模块');
const SelectNumder = ref(1);
const CalcResult = ref(1);
const CEnlarge = computed(() => store.getters.CEnlarge);
const CEnlargeActivity = computed(() => store.getters.CEnlargeActivity(SelectNumder.value));
const onIncrease = () => {
    store.commit({ type: ONCINCREASE, Cardinality: CalcResult.value });
};
const onDecrement = () => {
    store.commit({ type: ONCDECREMENT, Cardinality: CalcResult.value });
};
const onSelectIncrease = () => {
    store.dispatch(ONACTIONCINCREASE, SelectNumder.value);
};
const onSelectDecrement = () => {
    store.dispatch({ type: ONACTIONCDECREMENT, Cardinality: SelectNumder.value });
};
const onReplaceState = () => {
    // 替换 Store 状态，一般用于重置状态，或者新增属性，对状态进行合并
    store.replaceState({ ...store.state, ModuleC: { CCalcResult: 0 }, time: new Date() });
};

// 监听 state 和 getter 值 变化
store.watch((state, getter) => {
    // console.log('参数一', state, getter);
    return { state, getter };
}, (newValue, oldValue) => {
    // console.log('参数二', newValue, oldValue);
}, {
    // 如果监听的对象属性为对象，且希望深度监听，可设置 deep 为 true
    deep: true,
    // immediate 为 true 时，会在 watcher 初始化后立即执行一次回调
    immediate: true
});

// 订阅 Mutation 对象 调用 unSubscribe() 可以取消订阅
const unSubscribe = store.subscribe((Mutation, state) => {
    console.log('订阅 Mutation 对象', Mutation, state);
}, { prepend: true });

// 订阅 Action 对象 调用 unSubscribeAction 可以取消订阅
const unSubscribeAction = store.subscribeAction((Action, state) => {
    console.log('订阅 Action 对象', Action, state);
}, { prepend: true });
// 或者
const unSubscribeActionOption = store.subscribeAction({
    before: (action, state) => { },
    after: (action, state) => { },
    error: (action, state, error) => { },
});




</script>
<style scoped>
.C {
    width: max-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

h2 {
    text-align: center;
}

button {
    margin: 10px;
}
</style>
