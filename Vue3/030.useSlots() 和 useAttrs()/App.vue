<template>
  <div>
    <CompilerMacro custom-attr="Custom Attribute" cls='已经接收'>
      <template #title>具名插槽title</template>
      <template #content>具名插槽content</template>
    </CompilerMacro>
  </div>
</template>
<script lang="ts" setup>
import CompilerMacro from './components/CompilerMacro.vue'
</script>
<style scoped></style>