import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from 'postcss-pxtorem'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 375 / 10, // 根元素的字体大小  基准值750  设计图大小
          unitPrecision: 5, // 小数点后精度
          propList: ["*"], // 可以从px改变为rem的属性
          exclude: /node_modules/, // 要忽略并保留为px的文件路径
          minPixelValue: 0, // 最小的px转化值（小于这个值的不转化）
          mediaQuery: false, //  允许在媒体查询中转换px
          selectorBlackList: [], // 要忽略并保留为px的选择器
          replace: true, // 直接在css规则上替换值而不是添加备用
        })
      ]
    }
  }
})
