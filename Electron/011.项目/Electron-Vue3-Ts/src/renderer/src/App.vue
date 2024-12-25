<template>
  <el-config-provider :locale="locale">
    <RouterView></RouterView>
  </el-config-provider>

</template>
<script  setup lang='ts'>
import { ref, onBeforeMount, computed, getCurrentInstance } from 'vue';
import { VueI18n } from 'vue-i18n';


const configDark = (): void => {
  const dark = ref<string | null>(localStorage.getItem('dark'));
  const element = document.querySelector('html') as HTMLElbment | null;
  if (element) {
    element.className = (dark.value == 'dark') ? 'dark' : '';
  }
};
onBeforeMount(configDark);

// 配置全局国际化
const { proxy } = getCurrentInstance();
const locale = computed(() => {
  const { locale, messages } = (proxy.$i18n) as VueI18n;
  return messages[locale].el;
});
</script>
<style lang='scss'></style>
