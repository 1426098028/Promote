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
// 开启 CDN 配置
import importToCDN from 'vite-plugin-cdn-import';

// 开启 图片压缩 未测试
// https://github.com/vbenjs/vite-plugin-imagemin/blob/main/README.zh_CN.md
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
// 开启 Br 压缩模式
// https://github.com/vbenjs/vite-plugin-compression/blob/main/README.zh_CN.md
import viteCompression from 'vite-plugin-compression';


// 开启 HTTPS  
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    basicSsl(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
    visualizer(), // npm rum build 会在根目录下生成一个stats.html(默认配置)文件
    // importToCDN({
    //   enableInDevMode: true, // 开发模式也开启cdn
    //   modules: [
    //     {
    //       name: 'echarts',
    //       var: 'echarts', // 全局分配给模块的变量
    //       // alias: ['echarts'], // 局部分配给模块的变量
    //       path: `https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js`
    //     },
    //   ]
    // }),
    // 开启 图片压缩 https://github.com/FatehAK/vite-plugin-image-optimizer?tab=readme-ov-file
    ViteImageOptimizer({
      // 定义要处理的图片文件类型的正则表达式
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      // 指定要排除的文件或文件夹路径
      exclude: undefined,
      // 指定要包含处理的文件或文件夹路径
      include: undefined,
      // 决定是否处理 public 文件夹中的图片
      includePublic: true,
      // 是否在控制台中输出图片优化的统计信息
      logStats: true,
      // 是否在控制台日志中使用 ANSI 颜色
      ansiColors: true,
      // 设置 SVG 文件的优化选项
      svg: {
        // 允许多次优化 SVG 文件，提高压缩效果
        multipass: true,
    // 配置 SVG 优化的插件列表
        plugins: [
          {
            // 一个默认优化设置的预设，其中的一些参数进行了覆盖
            name: 'preset-default',
            params: {
              overrides: {
                // 禁止清理数值（例如减少小数位数）
                cleanupNumericValues: false,
                // 不移除 viewBox 属性，保留 SVG 的缩放功能
                removeViewBox: false, // https://github.com/svg/svgo/issues/1128
              },
              // 禁止压缩和移除 ID 属性，避免因 ID 变化导致引用问题
              cleanupIDs: {
                minify: false,
                remove: false,
              },
              // 禁止转换路径数据
              convertPathData: false,
            },
          },
          // 将 SVG 的属性进行排序，通常有助于优化
          'sortAttrs',
          {
            name: 'addAttributesToSVGElement',
            params: {
              // 向 SVG 元素中添加额外的属性（如 xmlns 声明）
              attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
            },
          },
        ],
      },
      png: {
        // 表示 PNG 图片的压缩质量为 100%，即无损压缩
        quality: 100,
      },
      jpeg: {
        // 表示 JPEG 图片的压缩质量为 100%，即无损压缩
        quality: 100,
      },
      jpg: {
        // 表示 JPG 图片的压缩质量为 100%，即无损压缩
        quality: 100,
      },
      tiff: {
        // 表示 TIFF 图片的压缩质量为 100%，即无损压缩
        quality: 100,
      },
      gif: {
        quality: 80,                 // 压缩质量，取值范围 0-100，越高质量越好，文件越大
        interlaced: true,            // 启用交错处理，提高逐行扫描的加载效果
        optimizationLevel: 2,        // 优化级别 0-3，越高压缩效果越好，但耗时增加
        lossy: 50                    // 启用有损压缩，数值越大压缩越多，但图像可能会变形
      },
      webp: {
        // 表示 WebP 图片使用无损压缩
        lossless: true,
      },
      avif: {
        // 表示 AVIF 图片使用无损压缩
        lossless: true,
      },
      // 是否启用缓存以避免重复压缩相同的图片
      cache: false,
      // 定义缓存的存储位置
      cacheLocation: undefined,
    }),
    viteCompression({
      algorithm: 'brotliCompress', // 使用 br 压缩
      threshold: 10240, // 只有大小大于这个值的文件才会被压缩，单位为字节
      deleteOriginFile: true, // 是否删除原始文件
    }),
  ],
  server: {
    // 开启 HTTPS  
    https: true,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 'js-cookie': `https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/+esm`
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
