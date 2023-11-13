<template>
  <div style="font-size: 50px">
    编译器宏 defineSlots
    <h1>Title: <slot name="title">defineSlots Title</slot>
    </h1>
    <h2>Content:</h2>
    <slot name="content">defineSlots Content</slot>
  </div>
</template>
<script lang="ts" setup>
/**
 * 
 * defineSlots  函数用于定义一个组件的插槽。它允许你在组件内部定义具名插槽，并且提供了类型安全的支持
 *              函数式组件中，不再支持 this.$slots 的用法   同时它还返回 slots 对象     
 * 语法   
 *              const slots= defineSlots()
 * 
 * 
 */


const solt = defineSlots()
console.log(solt)


</script>
<style scoped></style>