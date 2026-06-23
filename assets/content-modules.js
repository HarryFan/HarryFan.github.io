const contentModules = new Map([
["src/content/styles/ghibli.mdx", () => import('./ghibli.js')],
["src/content/styles/pixar.mdx", () => import('./pixar.js')],
["src/content/styles/makoto-shinkai.mdx", () => import('./makoto-shinkai.js')],
["src/content/styles/pixel-art.mdx", () => import('./pixel-art.js')],
["src/content/styles/watercolor.mdx", () => import('./watercolor.js')]]);

export { contentModules as default };
