<template>
  <div style="font-size: 50px">
    编译器宏 defineProps defineEmits
    {{ foo }}
    <button @click='onChangeF'>子传父</button>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
/**
 * 
 * defineProps   是用于组件Props传值和获取值，使用方式和vue2 是一样的    接收与 props 选项相同的值
 *               同时接收返回父级全部的props(属性),但是不包括父级的自定义事件
 *            语法
 *               defineProps({父级传送参数:类型})
 * 
 */

/**
 * 
 * defineEmits   是用于组件Props自定义事件，使用方式和vue2 是一样的     接收与 emits 选项相同的值
 *               同时接收返回父级全部的emits(自定义事件)
 *              语法
 *                    defineEmits(['自定义事件名字'])
 *                    defineEmits({自定义事件名字:'一些配置'})
 * 
 * 
 * 
 */


const props = defineProps<{
  foo: String
}>()
const emits = defineEmits<{
  onChange: ([String] | [String, Object])
}>()
const onChangeF = () => {
  console.log('子组件传数据到父组件')
  emits('onChange', '子组件传数据到父组件')
}



</script>
<style scoped></style>