import '@/assets/main.css'

import { createApp } from 'vue'
import App from '@renderer/App.vue';
import { router } from '@/router';
import { pinia } from '@/pinia';
createApp(App).use(router).use(pinia).mount('#app');
