// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// 判斷是否為生產環境
const isProduction = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  
  // 設定站點 URL
  site: 'https://harryfan.github.io',
  
  // 設定基礎路徑
  base: '/',
  
  // 設定輸出目錄
  output: 'static',
  
  // 設定資源檔案處理
  build: {
    format: 'directory',
    assets: 'assets',
  },
  
  // Vite 配置
  vite: {
    base: '/',
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name][extname]'
        }
      }
    }
  },
  
  server: {
    port: 3000,
    host: true
  }
});
