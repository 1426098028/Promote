# Vue3_Pack
添加依赖打包分析功能
安装 npm install --save-dev rollup-plugin-visualizer
在vite.config.ts文件配置
```
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
    plugins: [
        // 其他插件配置
        visualizer(), // npm rum build 会在根目录下生成一个stats.html(默认配置)文件
    ],
});
```



打包优化

组件(自动)按需加载  Element-Plus
```
npm install element-plus --save // 组件安装
npm install -D unplugin-vue-components unplugin-auto-import // 必须(自动)按需加载 
```


