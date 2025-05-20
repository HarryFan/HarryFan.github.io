// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://harryfan.github.io',
  base: '/',
  server: {
    port: 3000,
    host: true
  }
});
