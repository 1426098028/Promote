<template>
  <div style="font-size: 50px">
    编译器宏 defineExpose

    子{{ A }}
    子{{ B }}

  </div>
</template>
<script lang="ts" setup>

import { ref } from 'vue';
const A = ref(0)
const B = ref('子defineExpose')
const Add = () => {
  console.log('子defineExpose', A)
  A.value++
}


/**
 * 
 * defineExpose  是一个用于将组件内部属性暴露给父组件或外部的函数,它可以在 setup 函数内部被调用，通常用于将组件内部的一些属性或方法暴露给父组件或其他组件使用
 *                组件通信时，子组件函数导出可以被父组件调用
 * 语法   
 *            defineExpose({需要暴露出去的属性或方法})
 * 
 * 
 */

defineExpose({
  A,
  B,
  Add
})



</script>
<style scoped></style>