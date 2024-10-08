import '@/assets/css/style.scss'

import { createApp } from 'vue'
import App from '@renderer/App.vue';
import { router } from '@/router';
import { pinia } from '@/pinia';
// 导入全部图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';


// 引入国际化
import i18n from '@/locales'


const app = createApp(App);

// 导入全部图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
import 'element-plus/theme-chalk/index.css'

app.use(router);
app.use(pinia);
app.use(i18n);
app.mount('#app');
