# Vue3_Pack 打包优化


## 组件库按需加载
## 路由器懒加载 (已实现)
## 使用 CDN 对 第三方库进行引用(全局引用/局部引用) (已实现)
## 开启 gzip 或者 br 压缩,推荐使用br 压缩 (已实现)
## 适配需要兼容的目标浏览器版本,而且不是过度兼容,有利用减少代码的生成 (已实现)
## 打包时进行代码拆分 (已实现)



## 使用 PWA 插件 将应用转化为渐进式 Web 应用（PWA），并利用浏览器缓存 (有思路，太复杂了)

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
import HomeView from '../views/HomeView.vue' // 静态导入

// 动态导入
const HomeView = () => import('../views/HomeView.vue');
const ElementPlus = () => import('../views/Element-Plus.vue');
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
import cdn from 'vite-plugin-cdn-import'
export default {
    plugins: [
         // 插件其它配置
        cdn({
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
                  {
                    name: 'echarts',
                    var: 'echarts',
                    path: `https://cdn.jsdelivr.net/npm/echarts/+esm`
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

