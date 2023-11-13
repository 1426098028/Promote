<template>
  <div style="font-size: 50px">
    编译器宏
    {{ name }}{{ list[0] }}
    <button @click='onChangeF'>子传父</button>
  </div>
</template>
<script lang="ts" setup generic="T">
// 顶层 await
const res = await fetch('/')
console.log(res)
defineProps<{
  name: T,
  list: T[]
}>()
// const Emits = defineEmits<{ (emits: string, name: string): void }>()


const Emits = defineEmits<{ 'onEnits': [name: string] }>()

const onChangeF = () => {
  Emits('onEnits', '子传父')
}






</script>
<style scoped></style>