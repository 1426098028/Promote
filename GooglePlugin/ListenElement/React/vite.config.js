import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SvgToPng } from './plugins/SvgToPng';
import { MoveManifest } from './plugins/MoveManifest';
import { PackCrx } from './plugins/PackCrx';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), SvgToPng(), MoveManifest(), PackCrx('ListenElement')],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  build: {
    target: 'es2015',  // 确保代码兼容大多数现代浏览器
    rollupOptions: {
      output: {
        format: 'iife',  // 使用 iife 格式，这会直接生成普通的浏览器脚本
      },
    },
    emptyOutDir: true, // 每次构建前清空输出目录
  },
})
