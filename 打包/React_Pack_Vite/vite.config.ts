import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import importToCdn from 'vite-plugin-cdn-import';
import { viteExternalsPlugin } from 'vite-plugin-externals';
console.log('externals', viteExternalsPlugin);
import vitePluginCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
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

