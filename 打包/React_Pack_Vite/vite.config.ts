import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import importToCdn from 'vite-plugin-cdn-import';
import { viteExternalsPlugin } from 'vite-plugin-externals';
console.log('externals', viteExternalsPlugin);
import vitePluginCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    // 开启 全局 CDN
    importToCdn({
      enableInDevMode: true,
      modules: [
  //   {
  //    name:'需要 CDN 加速的包名称',
  //    alias:'名称的别名 -- 局部分配',
  //    var:'全局分配给模块的变量',
  //    path:'指定 CDN 上的加载路径',
  //    css:'指定从 CDN 地址上加载多个样式表',
  //    prodUrl:'覆盖全局的 prodUrl',
  //   },

        // 全局 引入 CDN 模块
        {
          name: '@antv/g6',
          var: '@antv/g6',
          path: `https://cdn.jsdelivr.net/npm/@antv/g6@5.0.25/dist/g6.min.js`
        },
        // 局部 引入 CDN 模块   目前支持在打包模式下使用 ， 开发模式启动时直接报错目前还没有找到处理方式
        // {
        //   name: 'js-cookie',
        //   alias: 'js-cookie',
        //   path: `https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js`
        // }
      ],
    }),

    // 开启 图片压缩 https://github.com/vbenjs/vite-plugin-imagemin/blob/main/README.zh_CN.md
    viteImagemin({
      // 对 svg 进行压缩
      svgo: {
        plugins: [
          { name: 'removeViewBox', },
          { name: 'removeEmptyAttrs', active: false, },
        ],
      },
      // 对 GIF 进行压缩
      gifsicle: {
        interlaced: true,
        optimizationLevel: 7
      },
      // 对 JPEG 进行压缩
      mozjpeg: {
        quality: 200
      },
      // 对 PNG 进行压缩
      optipng: {
        interlaced: true,
        optimizationLevel: 7
      },
      // 对 PNG 进行压缩
      pngquant: {
        quality: [0.65, 0.8],
        speed: 4,
      },
      // 对 GIF 进行压缩
      webp: {
        size: 10
      },
    }),

    // 开启 br 压缩模式
    vitePluginCompression({
      algorithm: 'brotliCompress', // 使用 br 压缩
      threshold: 1024, // 只有大小大于这个值的文件才会被压缩，单位为字节
      deleteOriginFile: false, // 是否删除原始文件
    }),
  ],
  resolve: {
    // 局部 CDN
    alias: {
      // 其它别名配置
      '@antv/g': `https://cdn.jsdelivr.net/npm/@antv/g@6.0.14/+esm`,// 网络链接(需要引入库的链接) CDN
      '@antv/g-canvas': `https://cdn.jsdelivr.net/npm/@antv/g-canvas@2.0.15/+esm`, // 网络链接(需要引入库的链接) CDN
      '@antv/g-svg': `https://cdn.jsdelivr.net/npm/@antv/g-svg@2.0.12/+esm`, // 网络链接(需要引入库的链接) CDN
      '@antv/g-webgl': `https://cdn.jsdelivr.net/npm/@antv/g-webgl@2.0.19/+esm`, // 网络链接(需要引入库的链接) CDN
      // 'js-cookie': `https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/+esm`, // 网络链接(需要引入库的链接) CDN
    }
  },

  build: {
    // 配置需要兼容的浏览器版本
    target: ['es2015', 'chrome70', 'firefox60'],

    // 配置代码分割打包
    rollupOptions: {
      output: {
        // 分割 成一个个小的模块
        manualChunks: (FileId: string) => {
          console.log(FileId);
          // if (FileId.includes('node_modules/js-cookie')) {
          //   return 'js-cookie';
          // }
          if (FileId.includes('node_modules/dagre')) {
            return 'dagre';
          }
          if (FileId.includes('node_modules/lodash')) {
            return 'lodash';
          }
          if (FileId.includes('node_modules/@ant-design/icons-svg')) {
            return 'icons-svg';
          }
          return 'vendor';
        }
      }
    }
  }
});

