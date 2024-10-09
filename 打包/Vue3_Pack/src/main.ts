import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 配置 Element-Plus Css样式
import 'element-plus/dist/index.css';
import 'element-plus/es/components/message/style/css';
import { ElMessage } from 'element-plus';






// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'









const app = createApp(App)

app.use(createPinia())
app.use(router)




// 注册所有图标 有优化空间
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}







app.mount('#app')


ElMessage({
    message: 'Element-Plus(自动)按需加载配置完成',
    type: 'success',
});
