import { e as createAstro, c as createComponent, d as addAttribute, r as renderTemplate, a as renderComponent, F as Fragment, q as defineScriptVars } from './astro/server.js';
/* empty css               */
import { S as SITE_TITLE, G as GA_MEASUREMENT_ID } from './consts.js';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://harryfan.github.io");
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { title, description, image = "/blog-placeholder-1.jpg", preloadImage } = Astro2.props;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="sitemap" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml"${addAttribute(SITE_TITLE, "title")}${addAttribute(new URL("rss.xml", Astro2.site), "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Font preloads --><link rel="preload"${addAttribute(`${"/"}fonts/atkinson-regular.woff`, "href")} as="font" type="font/woff" crossorigin><link rel="preload"${addAttribute(`${"/"}fonts/atkinson-bold.woff`, "href")} as="font" type="font/woff" crossorigin><!-- LCP 圖 preload：與字型同時被發現，不必排在它們後面 -->${preloadImage && renderTemplate`<link rel="preload"${addAttribute(preloadImage, "href")} as="image" fetchpriority="high">`}<!-- 開發環境的 base URL 處理 -->${false}<!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Google Analytics 4：僅在正式環境且已設定 GA_MEASUREMENT_ID 時載入 -->${renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["<script async", "></script><script>(function(){", "\n			window.dataLayer = window.dataLayer || [];\n			function gtag(){dataLayer.push(arguments);}\n			gtag('js', new Date());\n			gtag('config', GA_MEASUREMENT_ID);\n		})();</script>"])), addAttribute(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, "src"), defineScriptVars({ GA_MEASUREMENT_ID })) })}`}`;
}, "/Users/harry/Documents/Astro/harryfan.github.io/src/components/BaseHead.astro", void 0);

export { $$BaseHead as $ };
