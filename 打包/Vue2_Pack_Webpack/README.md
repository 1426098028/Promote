# Vue2_Pack_Webpack 打包优化


## 组件库按需加载  (已实现)
## 路由器懒加载 (已实现)
## 添加依赖打包分析功能 (已实现)
## 使用 CDN 对 第三方库进行引用(全局引用/局部引用) (已实现)
## 开启 gzip 或者 br 压缩,推荐使用br 压缩 (已实现)
## 适配需要兼容的目标浏览器版本,而且不是过度兼容,有利用减少代码的生成 （需要配置 .browserslistrc 文件） (已实现)
## 打包时进行代码拆分 (已实现)
## 图片压缩 (已实现)



## 使用 PWA 插件 将应用转化为渐进式 Web 应用（PWA），并利用浏览器缓存 (有思路，太复杂了)      库 vite-plugin-pwa

## 安全 
 ### 代码混淆


## 添加依赖打包分析功能

### 安装 
```bash
npm install webpack-bundle-analyzer --save-dev
```
### 在vue.config.js文件配置
```javascript
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    config.plugins.push(
      // 添加依赖打包分析功能    默认会自动打开分析报告页面
      new BundleAnalyzerPlugin(),

      // 关闭自动打开分析报告页面
      new BundleAnalyzerPlugin({
        analyzerMode: "static", // 生成静态报告，不启动服务器
        openAnalyzer: false, // 关闭构建后自动打开浏览器
        reportFilename: "report.html", // 输出的报告文件名
      }),
    );
  },
});
```


## 路由(页面)懒加载
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





## CDN 加速 

### 使用 vite-plugin-cdn-import 库 对 CDN 引入   
#### 安装
```bash
npm install --save-dev html-webpack-tags-plugin
```
### 配置 vue.config.js 
```javascript
// 开启 CDN
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    // 排除模块  CDN 配置 获取不到时可以尝试配置externals  全局一般都配置 局部不需要
    // config.externals = {
    //   nanoid: "nanoid",
    //   jquery: "jquery",
    // };
    config.plugins.push(
      new HtmlWebpackTagsPlugin({
        // 不直接使用指定的 URL
        publicPath: false,
        tags: [
          // 局部 CDN 配置
          {
            append: true,
            type: "js",
            path: "https://cdn.jsdelivr.net/npm/nanoid@5.0.7/index.js",
            // attributes: { type: "module" },
            // 局部 CDN 配置 重点
            externals: {
              nanoid: "nanoid",
            },
          },
          // 全局 CDN 配置
          {
            publicPath: false,
            append: true,
            type: "js",
            path: "https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js",
          },
        ],
      })
    );
  }
});

```




## 开启 gzip 和 br 模式压缩      Vue CLI 默认没有此压缩模式        但是在命令行中 支持 使用 npm run build -- --gzip 进行开启 gzip 压缩(不推荐)

 ### br 模式压缩  全称 Brotli  模式压缩
 ### 优势 
 ### br 模式压缩  比 gzip 的小 14%
 ### 兼容性 
 ### 目前，br 压缩的兼容性并不是很好，但是随着时间的推移，br 压缩的兼容性会越来越好


### 使用 compression-webpack-plugin 增加 br 模式压缩

#### 安装
```bash
npm i compression-webpack-plugin -D
```

### 在vue.config.js文件配置

```javascript
// 开启 gzip 和 Br(Brotli) 压缩模式
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const CompressionStatsPlugin = require("./CompressionStatsPlugin"); //此文件和压缩没有关系 gzip 和 Br(Brotli) 压缩模式 ,作用文件中有写
module.exports = defineConfig({
  // 其他配置
  configureWebpack: (config) => {
    // Gzip 压缩
    config.plugins.push(
      new CompressionWebpackPlugin({
        filename: "[path][base].gz", // 输出 gzip 文件
        algorithm: "gzip", // 使用 gzip 压缩
        test: /\.(js|css|html|svg)$/, // 需要压缩的文件类型
        threshold: 1024 * 5, // 只处理大于 5KB 的文件
        minRatio: 0.5, // 压缩率小于 0.8 时才进行压缩
        deleteOriginalAssets: false, // 是否保留未压缩的文件
      })
    );
    // Brotli  压缩
    config.plugins.push(
      new CompressionWebpackPlugin({
        filename: "[path][base].br", // 输出 Brotli 文件
        algorithm: "brotliCompress", // 使用 Brotli 压缩
        test: /\.(js|css|html|svg)$/, // 需要压缩的文件类型
        compressionOptions: { level: 11 }, // Brotli 压缩等级（最高为 11）
        threshold: 1024 * 10, // 只处理大于 10KB 的文件
        minRatio: 0.8, // 压缩率小于 0.8 时才进行压缩
        deleteOriginalAssets: false, // 是否保留未压缩的文件
      })
    );
    //此文件和压缩没有关系 gzip 和 Br(Brotli) 压缩模式
    config.plugins.push(new CompressionStatsPlugin());
  },
});

```


### 辅助函数方法是一个webpack插件 （不是重点）
```javascript

// 此文件是读取打包后的文件大小，是为了方便观察压缩体制大小
class CompressionStatsPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("CompressionStatsPlugin", (stats) => {
      console.log("\nCompression Results:");
      const assets = stats.toJson().assets || [];
      assets
        .filter((asset) => /\.(gz|br)$/.test(asset.name))
        .forEach((asset) => {
          console.log(`- ${asset.name}: ${formatBytes(asset.size)}`);
        });
      console.log(""); // 添加空行以便于阅读
    });
  }
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024,
    dm = decimals < 0 ? 0 : decimals,
    sizes = ["Bytes", "KB", "MB", "GB", "TB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

module.exports = CompressionStatsPlugin;

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








##  代码拆分/代码分割

### 以下警告 babel 代码分割
```bash
# 警告
#  Building for production...[BABEL] Note: The code generator has deoptimised the styling of F:\Promote\打包\Vue2_Pack_Webpack\node_modules\element-ui\lib\element-ui.common.js as it exceeds the max of 500KB.
#  Building for production...[BABEL] Note: The code generator has deoptimised the styling of F:\Promote\打包\Vue2_Pack_Webpack\node_modules\element-ui\lib\utils\lodash.js as it exceeds the max of 500KB.
```
### babel 配置 babel.config.js 添加
```javascript
module.exports = {
  // 其他配置
  // 开启对大文件进行优化处理(大于500KB)
  compact: true,
};
```

### 配置  vue.config.js 文件 代码分割
```javascript
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    // 代码分包
    config.optimization = {
      // https://www.webpackjs.com/plugins/split-chunks-plugin/#optimizationsplitchunks
      splitChunks: {

        /**
         * 开始 对整体分包配置
         *      注意 当 splitChunks 或者 cacheGroups 中配置了 enforce 和 enforceSizeThreshold 会忽略当前全局的一些分包配置
         */

        // 设置 all 表示 chunk 可以在异步和非异步 chunk 之间共享。
        chunks: "all",
        // // 模块根据此大小对代码进行分割 ，决定的代码大小超过多少才进行拆分   （以字节Byte为单位）
        minSize: 1024 * 10,
        // 模块根据此大小对代码进行分割 , 决定的代码拆分是否需要很细，包很小  （以字节Byte为单位）
        maxSize: 1024 * 1024 * 2,

        // 模块至少被引用的次数，才能被拆分
        minChunks: 1,
        // 按需加载时的最大并行请求数
        maxAsyncRequests: 100,
        // 入口点的最大并行请求数
        maxInitialRequests: 100,

        /**
         * 结束 对整体分包配置
         */

        // 进行配置模块拆分
        cacheGroups: {
          // 禁用任何默认缓存组
          default: false,
          // 独立分包配置 重点 enforceSizeThreshold enforce 配置
          "js-cookie": {
            // 需要匹配的文件(夹)
            test: /\\node_modules\\js-cookie/,
            // 生成的文件名
            name: "js-cookie",
            // 优先被拆分等级(数字越大，优先级越高)
            priority: 100,
            // 已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
            reuseExistingChunk: true,

            /** 独立分包配置 */
            // 忽略 splitChunks.minSize、splitChunks.minChunks、splitChunks.maxAsyncRequests 和 splitChunks.maxInitialRequests 选项，并始终为此进行独立分包
            enforce: true,
            // 强制执行拆分的体积阈值和其他限制（minRemainingSize，maxAsyncRequests，maxInitialRequests）将被忽略
            enforceSizeThreshold: 1,
          },

          // 按需分包
          echarts: {
            // 需要匹配的文件(夹)
            test: /\\node_modules\\echarts/,
            // 生成的文件名
            name: "echarts",
            // 优先被拆分等级(数字越大，优先级越高)
            priority: 100,
            // 已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
            reuseExistingChunk: true,
          },
          "element-ui": {
            // 需要匹配的文件(夹)
            test: /\\node_modules\\element/,
            // 生成的文件名
            name: "element-ui",
            // 优先被拆分等级(数字越大，优先级越高)
            priority: 100,
            // 已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
            reuseExistingChunk: true,
          },
        },
      },
    };
  },
});
```

## 图片压缩

#### 安装 image-minimizer-webpack-plugin 插件 其他为依赖(可以使用其他配置)
```bash
# https://webpack.docschina.org/plugins/image-minimizer-webpack-plugin/

npm install image-minimizer-webpack-plugin imagemin imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-mozjpeg imagemin-pngquant imagemin-svgo  --save-dev
```
### 配置 vue.config.js 

```javascript
// 开启 图片压缩
// https://webpack.docschina.org/plugins/image-minimizer-webpack-plugin/
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    // 其他配置
    config.optimization.minimizer.push(
      new ImageMinimizerPlugin({
        // 指定最小化工具的实现
        minimizer: {
          // 使用 imagemin 进行图像最小化
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // 配置图像压缩插件
            plugins: [
              // JPEG 图像压缩插件，设置质量为 10
              ["mozjpeg", { quality: 10 }],
              // PNG 图像压缩插件，设置质量范围为 60% 到 80%
              ["pngquant", { quality: [0.6, 0.8] }],
              // PNG 图像优化插件，设置优化等级为 7
              ["optipng", { optimizationLevel: 7 }],
              // GIF 图像优化插件
              [
                "gifsicle",
                {
                  // 更高的优化等级，优化 GIF 文件的体积
                  optimizationLevel: 3, 
                  // 使 GIF 图像渐进显示
                  interlaced: true,
                  // 降低颜色数量，减少 GIF 的色彩范围以减小文件大小
                  colors: 128, 
                },
              ],
              // SVG 图像优化插件
              [
                "svgo",
                {
                  plugins: [
                    {
                      // 使用默认的优化设置
                      name: "preset-default",
                      params: {
                        overrides: {
                          // 不移除 viewBox 属性
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                 // 添加 SVG 命名空间属性
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      })
    );
  },
});

```







## 适配需要兼容目标浏览器版本
### 配置 .browserslistrc 文件

```plaintext
  > 1%                # 支持全球市场份额超过 1% 的浏览器
  last 2 versions    # 支持每个浏览器的最新两个版本
  not dead           # 排除不再维护的浏览器（如过时或已被淘汰的浏览器）
```
