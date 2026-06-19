// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// 判斷是否為生產環境
const isProduction = process.env.NODE_ENV === 'production';
// 根目錄部署到 HarryFan.github.io（使用者主頁 repo），base 一律為 '/'
const basePath = '/';

// https://astro.build/config
export default defineConfig({
  // 設定站點 URL
  site: isProduction ? 'https://harryfan.github.io' : 'http://localhost:4324',

  // 設定基礎路徑
  base: basePath,

  // 設定資源檔案處理
  build: {
    assets: 'assets',
    assetsPrefix: ''
  },
  
  // Vite 配置
  vite: {
    base: basePath,
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
  
  // 整合插件
  integrations: [
    mdx(),
    sitemap({
      customPages: ['https://harryfan.github.io/']
    })
  ],
  
  // 開發服務器配置
  server: {
    port: 4324, // 使用指定端口
    host: true
  }
});
