// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  base: '/',
  site: 'https://harryfan.github.io/HarryFan.github.io',
  build: {
    assets: 'assets',
    assetsPrefix: '/'
  },
  // 確保 CSS 檔案不包含雜湊值
  vite: {
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]'
        }
      }
    }
  },
  // 開發伺服器設定
  server: {
    port: 3000,
    host: true
  }
});
