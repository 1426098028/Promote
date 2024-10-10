import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
// Element-Plus(自动)按需加载 配置
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// 添加依赖打包分析功能
import { visualizer } from "rollup-plugin-visualizer";

// https://github.com/MMF-FE/vite-plugin-cdn-import/blob/master/README.zh-CN.md
import importToCDN from 'vite-plugin-cdn-import';
// 开启 Br 压缩模式
import viteCompression from 'vite-plugin-compression';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
    visualizer(), // npm rum build 会在根目录下生成一个stats.html(默认配置)文件
    importToCDN({
      enableInDevMode: true, // 开发模式也开启cdn
      modules: [
        {
          name: 'echarts',
          var: 'echarts', // 全局分配给模块的变量
          // alias: ['echarts'], // 局部分配给模块的变量
          path: `https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js`
        },
      ]
    }),
    viteCompression({
      algorithm: 'brotliCompress', // 使用 br 压缩
      threshold: 10240, // 只有大小大于这个值的文件才会被压缩，单位为字节
      deleteOriginFile: true, // 是否删除原始文件
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'js-cookie': `https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/+esm`
    }
  },
  build: {
    // 兼容的目标浏览器版本
    target: ['es2015', 'chrome70', 'firefox60'], // 自定义需要兼容的目标浏览器版本,
    // reportCompressedSize: true, 开启 gzip 压缩 默认是开启的 br 压缩和gzip压缩只需要开启一个
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 将 Element-Plus 组件库 单独打包到一个文件 
          if (id.includes('node_modules/element-plus')) {
            console.log('element-plus', id, id.includes('node_modules/element-plus'));
            return 'element-plus';
          }
          // 将 Lodash js库 单独打包到一个文件 
          if (id.includes('node_modules/lodash')) {
            console.log('lodash', id, id.includes('node_modules/lodash'));
            return 'lodash';
          }
          // 除了 Element-Plus 和 Lodash 库 ，其它的库统一打包到一个文件 
          if (id.includes('node_modules')) {
            console.log('vendor', id, id.includes('node_modules'));
            return 'vendor';
          }
        },
      }
    }, 
  }
});
