// import path from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'

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
    ],
    resolve: {
      alias: {
        // '@': path.resolve(__dirname, './src'),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  })
