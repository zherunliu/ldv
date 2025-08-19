// import path from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default ({ mode }: { mode: string }) =>
  defineConfig({
    base: mode == 'development' ? '/' : '/ldv/',
    plugins: [
      vue(),
      vueDevTools(),
      // 按需导入 element-plus
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // pnpm build
      visualizer({ open: true }),
      // 自定义插件
      {
        name: 'copy-404', // 插件名称（必填）
        // Rollup 的 writeBundle 钩子：在文件写入磁盘后执行
        writeBundle: () => {
          const sourcePath = path.resolve(__dirname, 'dist/index.html')
          const targetPath = path.resolve(__dirname, 'dist/404.html')

          try {
            fs.copyFileSync(sourcePath, targetPath)
          } catch (err) {
            console.error(err)
          }
        },
      },
    ],
    resolve: {
      alias: {
        // '@': path.resolve(__dirname, './src'),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  })
