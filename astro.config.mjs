// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://harryfan.github.io',
  base: '/HarryFan.github.io/',
  
  build: {
    assets: 'assets'
  },
  
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name][extname]'
        }
      }
    }
  },
  
  integrations: [tailwind()],
  
  server: {
    port: 3000,
    host: true
  }
});
