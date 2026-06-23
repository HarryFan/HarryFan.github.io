import { e as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderTemplate } from './astro/server.js';
/* empty css                */

const $$Astro$1 = createAstro("https://harryfan.github.io");
const $$AdSlot = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AdSlot;
  const { slot } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<aside class="ad-slot"${addAttribute(slot, "data-ad-slot")} aria-label="廣告版位" data-astro-cid-fgwukgf6> <span class="ad-slot__note" data-astro-cid-fgwukgf6>廣告版位（AdSense 待接）· ${slot}</span> <!-- 上線 AdSense 時，替換此元件內部為 <ins class="adsbygoogle"> 程式碼 --> </aside> `;
}, "/Users/harry/Documents/Astro/harryfan.github.io/src/components/AdSlot.astro", void 0);

const $$Astro = createAstro("https://harryfan.github.io");
const $$StyleCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$StyleCard;
  const { slug, title, description, cover_image } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a class="style-card"${addAttribute(`${"/"}style/${slug}`, "href")} data-astro-cid-6yomozta> ${cover_image && renderTemplate`<img class="style-card__img"${addAttribute(cover_image, "src")}${addAttribute(title, "alt")} loading="lazy" data-astro-cid-6yomozta>`} <div class="style-card__body" data-astro-cid-6yomozta> <h3 class="style-card__title" data-astro-cid-6yomozta>${title}</h3> <p class="style-card__desc" data-astro-cid-6yomozta>${description}</p> </div> </a> `;
}, "/Users/harry/Documents/Astro/harryfan.github.io/src/components/StyleCard.astro", void 0);

export { $$AdSlot as $, $$StyleCard as a };
