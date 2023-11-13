<template>
  <Suspense>
    <CompilerMacro name="泛型" :list="list" @onEnits='onChange'>
    </CompilerMacro>
  </Suspense>
</template>
<script lang="ts" setup>
import CompilerMacro from './components/CompilerMacro.vue'
const list = [
  '123'
]
const onChange = (e: string) => {

  console.log(e)
} 
</script>
<style scoped></style>