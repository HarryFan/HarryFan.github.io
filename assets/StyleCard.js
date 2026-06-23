import { e as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderTemplate } from './astro/server.js';
import { r as resolveHeroSrc, c as coverSvgDataUri } from './contempoCover.js';
/* empty css                */

const $$Astro = createAstro("https://harryfan.github.io");
const $$StyleCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$StyleCard;
  const { slug, title, description, cover_image, categoryLabel, featured = false } = Astro2.props;
  const coverSrc = resolveHeroSrc(cover_image) ?? coverSvgDataUri(title);
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(["style-card", { "style-card--featured": featured }], "class:list")}${addAttribute(`${"/"}style/${slug}`, "href")} data-astro-cid-6yomozta> <div class="style-card__media" data-astro-cid-6yomozta> <img class="style-card__img"${addAttribute(coverSrc, "src")}${addAttribute(title, "alt")} loading="lazy" width="1440" height="720" data-astro-cid-6yomozta> ${categoryLabel && renderTemplate`<span class="style-card__cat" data-astro-cid-6yomozta>${categoryLabel}</span>`} ${featured && renderTemplate`<span class="style-card__badge" data-astro-cid-6yomozta>熱門</span>`} </div> <div class="style-card__body" data-astro-cid-6yomozta> <h3 class="style-card__title" data-astro-cid-6yomozta>${title}</h3> <p class="style-card__desc" data-astro-cid-6yomozta>${description}</p> <span class="style-card__cta" data-astro-cid-6yomozta>看提示詞 →</span> </div> </a> `;
}, "/Users/harry/Documents/Astro/harryfan.github.io/src/components/StyleCard.astro", void 0);

export { $$StyleCard as $ };
