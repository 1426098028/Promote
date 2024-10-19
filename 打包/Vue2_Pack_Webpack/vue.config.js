const { defineConfig } = require("@vue/cli-service");

// 开启依赖打包分析功能
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// 开启 图片压缩
// https://webpack.docschina.org/plugins/image-minimizer-webpack-plugin/
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

// 开启 gzip 和 Br(Brotli) 压缩模式
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const CompressionStatsPlugin = require("./CompressionStatsPlugin"); //此文件和压缩没有关系 gzip 和 Br(Brotli) 压缩模式 ,作用文件中有写

// 开启 CDN
// const WebpackCdnPlugin = require("webpack-cdn-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    /** 开启 图片压缩 */
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
                          // 移除 viewBox 属性
                          removeViewBox: true,
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

    /** 结束 图片压缩 */

    // 添加依赖打包分析功能
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static", // 生成静态报告，不启动服务器
        reportFilename: "report.html", // 输出的报告文件名
        openAnalyzer: false, // 关闭构建后自动打开浏览器
      })
    );

    // 开启 CDN 配置开始
    // 例如，排除特定模块
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
    // 开启 CDN 配置结束

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

          // 按需分包
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
