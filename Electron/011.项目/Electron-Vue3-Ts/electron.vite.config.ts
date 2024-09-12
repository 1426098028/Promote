import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
// const path = require('node:path');
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@/assets': resolve('src/renderer/src/assets'),
        '@/components': resolve('src/renderer/src/components'),
        '@/pinia': resolve('src/renderer/src/pinia'),
        '@/router': resolve('src/renderer/src/router'),
        '@/views': resolve('src/renderer/src/views'),
        '@/utils': resolve('src/renderer/src/utils'),
        '@/api': resolve('src/renderer/src/api'),
      }
    },
    plugins: [vue()],
    // 配置跨域代理
    server: {
      proxy: {
        "/api": {
          // target: `http://demo.open.xuexiluxian.cn`,
          target: `http://uat.crm.xuexiluxian.cn`,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
