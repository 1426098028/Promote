<template>
  <RouterView></RouterView>
</template>
<script  setup lang='ts'>
import { ref, onBeforeMount } from 'vue';


const configDark = (): void => {
  const dark = ref<string | null>(localStorage.getItem('dark'));
  const element = document.querySelector('html') as HTMLElbment | null;
  if (element) {
    element.className = (dark.value == 'dark') ? 'dark' : '';
  }
};
onBeforeMount(configDark);
</script>
<style lang='scss'></style>
