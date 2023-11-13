<template>
  <div style="font-size: 50px">
    编译器宏 useSlots() 和 useAttrs()
    <h1>Title: <slot name="title">useSlots() 和 useAttrs() Title</slot>
    </h1>
    <h2>Content:</h2>
    <slot name="content">useSlots() 和 useAttrs() Content</slot>
  </div>
</template>
<script lang="ts" setup>
/**
 * 
 * useSlots  函数用于定义一个组件的插槽。它允许你在组件内部定义具名插槽，并且提供了类型安全的支持
 *           函数式组件中，不再支持 this.$slots 的用法   同时它还返回 slots 对象 
 *           返回内容和defineSlots是一样的     
 *               
 *                   
 * 语法   
 *              const slots= useSlots()
 * 
 * 
 */

/**
 * 
 * useAttrs  用于获取组件的未知属性,如果在defineProps 中定义了属性，那么useAttrs 返回的属性中，将不包含定义的属性 
 *           函数式组件中，不再支持 this.$attrs 的用法   同时它还返回 attrs 对象    
 * 语法   
 *              const Attrs= useAttrs()
 * 
 * 
 */

// 总结：useAttrs和useSlots 应用场景比较少，因为一般再模板中可以使用$attrs 和 $slots 直接获取 ，推荐使用$attrs 和 $slots


import { useSlots, useAttrs } from 'vue'
const prop = defineProps({
  cls: String
})


const solt = useSlots()
const Attrs = useAttrs()
console.log(solt, Attrs, prop,)


</script>
<style scoped></style>