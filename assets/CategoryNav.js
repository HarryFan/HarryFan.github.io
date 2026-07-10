import { e as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderTemplate } from './astro/server.js';
import 'kleur/colors';
import 'clsx';
import { C as CATEGORIES } from './consts.js';
/* empty css                    */

const $$Astro = createAstro("https://harryfan.github.io");
const $$CategoryNav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CategoryNav;
  const { active, counts = {} } = Astro2.props;
  const base = "/";
  return renderTemplate`${maybeRenderHead()}<nav class="category-nav" aria-label="文章分類" data-astro-cid-t5k2tvbq> <a${addAttribute(["category-chip", { "is-active": !active }], "class:list")}${addAttribute(`${base}blog/`, "href")} data-astro-cid-t5k2tvbq>全部</a> ${Object.entries(CATEGORIES).map(([slug, label]) => renderTemplate`<a${addAttribute(["category-chip", { "is-active": active === slug }], "class:list")}${addAttribute(`${base}blog/category/${slug}/`, "href")} data-astro-cid-t5k2tvbq> ${label} ${counts[slug] != null && renderTemplate`<span class="category-count" data-astro-cid-t5k2tvbq>${counts[slug]}</span>`} </a>`)} </nav> `;
}, "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/components/CategoryNav.astro", void 0);

export { $$CategoryNav as $ };
