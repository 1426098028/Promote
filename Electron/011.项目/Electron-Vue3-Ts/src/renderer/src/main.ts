import '@/assets/main.css'

import { createApp } from 'vue'
import App from '@renderer/App.vue';
import { router } from '@/router';
import { pinia } from '@/pinia';
// 导入全部图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

// 导入全部图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
import 'element-plus/theme-chalk/index.css'

app.use(router);
app.use(pinia);
app.mount('#app');
