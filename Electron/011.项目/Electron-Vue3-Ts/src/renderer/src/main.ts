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

//全局组件-分页
import pagination from '@/components/pagination/index.vue';
app.component('pagination', pagination)


import "prismjs";
import "prismjs/themes/prism.css"; // 默认主题，也可以换成 prism-dark.css 等其他主题
import "prismjs/components/prism-javascript"; // 根据需要加载的语言
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";




// 引入全局混入;
import useDicts from '@/mixins/DictsPlugin';

// 引入全局自定义指令(授权权限);
import { AuthDirectives } from '@/directives/Authorize';
// 注册自定义指令
app.directive(AuthDirectives.name, AuthDirectives);
app.use(router);
app.use(pinia);
app.use(i18n);
// 注册全局混入;
app.use(useDicts);
app.mount('#app');
