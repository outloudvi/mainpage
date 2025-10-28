import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  build: {
    // 生产环境启用压缩（默认使用 esbuild 压缩JS，CSS自动压缩）
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // CSS 合并为一个文件，默认行为，通常不需要特别配置
        // 这里留空，Vite 会自动合并 CSS
      },
    },
  },
  plugins: [
    // 压缩并优化 index.html
    createHtmlPlugin({
      minify: true, // 启用HTML压缩
      template: 'public/index.html',
    }),
  ],
})
