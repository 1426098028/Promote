<template>
  <div style="font-size: 50px">
    编译器宏 defineOptions
    {{ msg }}
  </div>
</template>
<script lang="ts" setup>
/**
 * 
 * defineOptions 用来直接在 <script setup> 中声明组件选项，
 *               类似vue2的写法，语法上除了不支持 props,Emits,expose,slots 属性，其他都支持,包括生命周期  
 * 语法   
 *            defineOptions({optionsApi语法})
 * 
 * 
 */


defineOptions({
  data() {
    return {
      msg: <string>'类似vue2的写法，语法上除了不支持 props,Emits,expose,slots 属性，其他都支持,包括生命周期'
    }
  },
  created() {
    console.log('创建后')
  },
  mounted() {
    console.log(this.msg)
  },
})

// const msg = solt.data.msg
</script>
<style scoped></style>