<template>
  <div>toRef的使用和特点</div>
  <div>{{ state }}</div>
  <div>{{ age }}</div>
  <div>{{ money }}</div>
  <button @click="onUp">更新</button>
  <Child :age="age" />
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRef } from 'vue'
import Child from './components/Child.vue'

export default defineComponent({
  name: 'AppName',
  components: {
    Child
  },
  setup() {
    interface DataType {
      money: number;
      age: number;
    }
    /**
     *   toRef   
     *          语法:toRef(代理对象,'属性')
     *                  作用: 把响应式数据代理对象中的某个属性变成ref类型对象
     *                        当使用了toRef去改变代理对象中的属性类型,属性值和代理对象的值始终保持同步更新
     *                  
     */

    const state = reactive<DataType>({ money: 12, age: 5 })
    // 把响应式数据代理对象(state)中的某个属性(age)变成ref类型对象
    const age = toRef(state, 'age')
    // 把响应式数据代理对象(state)中的某个属性(age),使用ref进行包装,变成了一个ref类型对象
    const money = ref(state.money)
    console.log(age, money)
    const onUp = () => {
      console.log('更新')

      // 当使用了toRef去改变代理对象中的属性类型,属性值和代理对象的值始终保持同步更新
      // state.age += 1
      age.value += 1

      // 当使用了ref去改变代理对象中的属性类型,属性值和代理对象的值始终独立互不干扰
      // state.money += 1
      // money.value += 1
    }
    return {
      state,
      age,
      money,


      onUp













    }
  },


})
</script>