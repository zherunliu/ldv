import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const copy404 = (): Plugin => ({
  name: 'copy-404',
  // Rollup 的 writeBundle 钩子：在文件写入磁盘后执行
  writeBundle: () => {
    const sourcePath = resolve(__dirname, 'dist/index.html')
    const targetPath = resolve(__dirname, 'dist/404.html')
    try {
      copyFileSync(sourcePath, targetPath)
    } catch (err) {
      console.error(err)
    }
  },
})

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
      copy404(),
    ],
    resolve: {
      alias: {
        // '@': resolve(__dirname, './src'),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  })
