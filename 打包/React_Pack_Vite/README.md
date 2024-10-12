# React_Pack_Vite 打包优化


## 组件库按需加载  (已实现)
## 路由器懒加载 (已实现)
## 使用 CDN 对 第三方库进行引用(全局引用/局部引用) (已实现)
## 开启 gzip 或者 br 压缩,推荐使用br 压缩 (已实现)
## 适配需要兼容的目标浏览器版本,而且不是过度兼容,有利用减少代码的生成 (已实现)
## 打包时进行代码拆分 (已实现)
## 图片压缩 (已实现)



## 使用 PWA 插件 将应用转化为渐进式 Web 应用（PWA），并利用浏览器缓存 (有思路，太复杂了)      库 vite-plugin-pwa

## 安全 
 ### 代码混淆


## 添加依赖打包分析功能

### 安装 npm install --save-dev rollup-plugin-visualizer
```bash
npm install --save-dev rollup-plugin-visualizer
```
### 在vite.config.ts文件配置
```javascript
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
    plugins: [
        // 其他插件配置
        visualizer(), // npm rum build 会在根目录下生成一个stats.html(默认配置)文件
    ],
});
```



## 打包优化

### 路由(页面)懒加载
### 需要改动vue-router的配置文件，把静态导入都改为动态导入
```javascript
import HomeView from '../views/HomeView.vue' // 静态导入 Vue  React

// 动态导入 Vue
const HomeView = () => import('../views/HomeView.vue');
const ElementPlus = () => import('../views/Element-Plus.vue');

// 动态导入 React
const NestedSubtables = lazy(() => import('../NestedSubtables'));
const GlobalConfiguration = lazy(() => import('../GlobalConfiguration'));
// 使用动态组件
<Suspense fallback={<div>加载中...</div>}><NestedSubtables /></Suspense>
<Suspense fallback={<div>加载中...</div>}><GlobalConfiguration /></Suspense>
```


## 组件(自动)按需加载  Element-Plus
```bash
npm install element-plus --save // 组件安装
npm install -D unplugin-vue-components unplugin-auto-import // 必须(自动)按需加载 
```


## CDN 加速 

### 利用 vite.config.ts 中 alias 功能 (小的js库，并且需要全量引入可以使用) (局部使用，推荐此方法)

### 在vite.config.ts文件配置
```javascript
// 引入
export default defineConfig({
  resolve: {
    alias: {
      // 其它别名配置
      'echarts': `https://cdn.jsdelivr.net/npm/echarts/+esm` // 网络链接(需要引入库的链接)
    }
  }
});

// 使用 正常的 import 引入 例如     只要当前库支持引入的方式即可
import * as echarts from 'echarts'; // 'echarts' 根据别名的值
import {或者这样} from 'echarts'; // 'echarts' 根据别名的值
```



 
### 使用 vite-plugin-cdn-import 库 对 CDN 引入     (全局使用，推荐此方法) 也支持局部引入 使用 alias 不是 var
### 注意 使用改库会直接引入到全局中 所以不需要使用 import 单独引入
#### 安装
```bash
npm install vite-plugin-cdn-import --save-dev
```
### 配置 vite.config.ts 
```javascript
import importToCDN from 'vite-plugin-cdn-import'
export default {
    plugins: [
         // 插件其它配置
        importToCDN({
            enableInDevMode: true, // 开发模式也开启 cdn
            modules: [
            //   {
            //    name:'需要 CDN 加速的包名称',
            //    alias:'名称的别名',
            //    var:'全局分配给模块的变量',
            //    path:'指定 CDN 上的加载路径',
            //    css:'指定从 CDN 地址上加载多个样式表',
            //    prodUrl:'覆盖全局的 prodUrl',
            //   },

                    // 全局 引入 CDN 模块
                  {
                    name: 'echarts',
                    var: 'echarts',
                    path: `https://cdn.jsdelivr.net/npm/echarts/+esm`
                  }
                  // 如果这里配置了 局部 resolve > alias 相应的配置部需要配置
                  // 局部 引入 CDN 模块   目前支持在打包模式下使用 ， 开发模式启动时直接报错目前还没有找到处理方式
                  {
                    name: 'js-cookie',
                    alias: 'js-cookie',
                    path: `https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js`
                  }
            ],
        }),
    ],
}
```


## 开启 br 模式压缩      Vite 默认开启 gzip  模式压缩   但是不支持 br 模式压缩

 ### br 模式压缩  全称 Brotli  模式压缩
 ### 优势 
 ### br 模式压缩  比 gzip 的小 14%
 ### 兼容性 
 ### 目前，br 压缩的兼容性并不是很好，但是随着时间的推移，br 压缩的兼容性会越来越好


### 使用 vite-plugin-compression 增加 br 模式压缩
#### 安装
```bash
npm i vite-plugin-compression -D
```

### 在vite.config.ts文件配置

```javascript
import { vitePluginCompression } from 'vite-plugin-compression';


export default defineConfig({
    plugins: [
        // 其他插件配置
      // reportCompressedSize: true, 开启 gzip 压缩 默认是开启的 br 压缩和gzip压缩只需要开启一个
      vitePluginCompression({
        algorithm: 'brotliCompress', // 使用 br 压缩
        threshold: 10240, // 只有大小大于这个值的文件才会被压缩，单位为字节
        deleteOriginFile: false, // 是否删除原始文件
      }),
    ],
});

```

### 开启br压缩注意事项

### 项目上线 需要配置 Nginx 支持Br压缩模式

```nginx
server {
    ... 其它配置
    location / {
        ... 其它配置

        # 支持Br压缩模式 Brotli配置 
        brotli on;
        brotli_types text/plain text/css application/javascript application/json text/xml application/xml application/xml+rss;
    }
}

``` 




## 适配需要兼容目标浏览器版本

```javascript
export default defineConfig({
  // 其它配置
  build: {
    // 其它配置

    // 兼容的目标浏览器版本    https://cn.vite.dev/config/build-options.html#build-target    
    target: ['es2015', 'chrome70', 'firefox60'], // 自定义需要兼容的目标浏览器版本,
  }
});
```




##  代码拆分/代码分割
```javascript
export default defineConfig({
  // 其它配置
  build: {
    // 其它配置

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
```

## 图片压缩

#### 安装
```bash
# https://github.com/FatehAK/vite-plugin-image-optimizer?tab=readme-ov-file
npm install vite-plugin-image-optimizer --save-dev
# 可能需要
npm install svgo --save-dev # 需要压缩 svg 图时要使用 注意:不需要手动引入
npm install sharp --save-dev # 需要压缩 jpeg jpg png gif tiff webp avif 图时要使用 注意:不需要手动引入
```
### 配置 vite.config.ts 
```javascript
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default {
    plugins: [
      // 插件其它配置
      
      // 配置图片压缩
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
          quality: 50,
        },
        jpeg: {
          // 表示 JPEG 图片的压缩质量为 100%，即无损压缩
          quality: 50,
        },
        jpg: {
          // 表示 JPG 图片的压缩质量为 100%，即无损压缩
          quality: 50,
        },
        tiff: {
          // 表示 TIFF 图片的压缩质量为 100%，即无损压缩
          quality: 50,
        },
        gif: {
          quality: 50,                 // 压缩质量，取值范围 0-100，越高质量越好，文件越大
          interlaced: true,            // 启用交错处理，提高逐行扫描的加载效果
          optimizationLevel: 3,        // 优化级别 0-3，越高压缩效果越好，但耗时增加
          lossy: 100                    // 启用有损压缩，数值越大压缩越多，但图像可能会变形
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
    ],
}
```
