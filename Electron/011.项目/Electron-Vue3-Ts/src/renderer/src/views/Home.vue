<script setup lang="ts">
import { onMounted } from 'vue'

import Versions from '@/components/Versions.vue';

const ipcHandle = () => window.electron.ipcRenderer.send('ping');

import { useStore } from '@/pinia';
const Store = useStore();
console.log(Store.creator, Store.User.userName);

import { useUserStore } from '@/pinia/useUserStore';
const userStore = useUserStore();
console.log(userStore.userName);
userStore.userName = '小明'


import { loginByJson } from '@/api/login';
onMounted(async () => {
  const login = await loginByJson({
    "password": "1899ddee9d860a0c452dd91844cb7a1c",//密码（需要使用AES加密）
    "username": "6a89e60b1231d61d4bf89a08e4fc6229",//用户名（需要使用AES加密）
    "key": "",//图形验证码中随机UUID
    "captcha": "2f3j"
  });
  console.log(login);
});
</script>

<template>
  <img alt="logo" class="logo" src="@/assets/electron.svg" />
  <div class="creator">{{ Store.creator }} -- {{ userStore.userName }}</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
    </div>
  </div>
  <Versions />
</template>
