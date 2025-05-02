<template>
    <div class='D'>
        <h2>{{ title }}</h2>
        <h3>计算结果：{{ CalcResult }}</h3>
        <select name="SelectNumder" id="SelectNumder" v-model.number='SelectNumder'>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        <button @click='onIncrease'>
            自增一
        </button>
        <button @click='onDecrement'>
            自减一
        </button>
        <button @click='onSelectIncrease'>
            根据选择增加
        </button>
        <button @click='onSelectDecrement'>
            根据选择减少
        </button>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
const title = ref('D模块');
const SelectNumder = ref(1);
const CalcResult = ref(0);
const onIncrease = () => {
    CalcResult.value++;
};
const onDecrement = () => {
    CalcResult.value--;
};
const onSelectIncrease = () => {
    CalcResult.value += SelectNumder.value;
};
const onSelectDecrement = () => {
    CalcResult.value -= SelectNumder.value;
};
</script>
<style scoped>
.D {
    width: max-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
}

h2 {
    text-align: center;
}

button {
    margin: 10px;
}
</style>
