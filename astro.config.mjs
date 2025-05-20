// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// 判斷是否為生產環境
const isProduction = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  // 設定站點 URL
  site: isProduction ? 'https://harryfan.github.io' : 'http://localhost:3000',
  
  // 設定基礎路徑
  base: '/',
  
  // 設定資源檔案處理
  build: {
    assets: 'assets',
    assetsPrefix: isProduction ? '/' : ''
  },
  
  // Vite 配置
  vite: {
    base: '/',
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: ({ name }) => {
            if (/\.(woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif|ico|webp)$/i.test(name ?? '')) {
              return 'assets/[name][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          }
        }
      }
    }
  },
  
  server: {
    port: 3000,
    host: true
  }
});
