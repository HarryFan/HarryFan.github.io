// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://harryfan.github.io', // 使用你的 GitHub 使用者網址
  base: '/', // 根目錄部署
  build: {
    assets: 'assets', // 指定資源目錄名稱
    assetsPrefix: ''
  },
  vite: {
    build: {
      // 停用資源檔案名稱的雜湊碼，避免每次構建產生不同的檔案名稱
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]'
        }
      }
    }
  },
  integrations: [tailwind()],
  server: {
    port: 3000, // 指定固定端口
    host: true
  }
});
