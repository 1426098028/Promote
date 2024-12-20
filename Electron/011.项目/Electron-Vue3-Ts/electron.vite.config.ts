import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

// 引入ElementPlus组件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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
        '@/interface': resolve('src/renderer/src/interface'),
        '@/locales': resolve('src/renderer/src/locales'),
        '@/hooks': resolve('src/renderer/src/hooks'),
      }
    },
    plugins: [
      vue(),
      AutoImport({resolvers: [ElementPlusResolver()]}),
      Components({resolvers: [ElementPlusResolver()]}),
    ],
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
