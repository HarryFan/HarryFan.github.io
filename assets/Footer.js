import { e as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, s as spreadAttributes, g as renderSlot, r as renderTemplate, a as renderComponent } from './astro/server.js';
/* empty css               */
import { S as SITE_TITLE } from './consts.js';

const $$Astro = createAstro("https://harryfan.github.io");
const $$HeaderLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeaderLink;
  const { href, class: className, ...props } = Astro2.props;
  const rawHref = typeof href === "string" ? href : href?.toString() ?? "/";
  const normalizePath = (input) => {
    const base = "/";
    let path = input.startsWith(base) ? input.slice(base.length - 1) : input;
    if (!path.startsWith("/")) path = `/${path}`;
    path = path.replace(/\/+/g, "/");
    if (path.length > 1) path = path.replace(/\/$/, "");
    return path;
  };
  const currentPath = normalizePath(Astro2.url.pathname);
  const targetPath = normalizePath(rawHref);
  const currentTopLevel = `/${currentPath.split("/").filter(Boolean)[0] ?? ""}`;
  const isActive = targetPath === currentPath || targetPath !== "/" && targetPath === currentTopLevel;
  const resolvedHref = rawHref.startsWith("/") ? `${"/"}${rawHref.slice(1)}` : rawHref;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(resolvedHref, "href")}${addAttribute([className, { active: isActive }], "class:list")}${addAttribute(isActive ? "page" : void 0, "aria-current")}${spreadAttributes(props)} data-astro-cid-eimmu3lg> ${renderSlot($$result, $$slots["default"])} </a> `;
}, "/Users/harry/Documents/Astro/harryfan.github.io/src/components/HeaderLink.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-3ef6ksr2> <nav data-astro-cid-3ef6ksr2> <h2 data-astro-cid-3ef6ksr2><a${addAttribute(`${"/"}blog/`, "href")} data-astro-cid-3ef6ksr2>${SITE_TITLE}</a></h2> <div class="internal-links" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/blog/", "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`Blog` })} ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/works/", "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`作品集` })} ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/styles", "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`風格圖鑑` })} ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/today", "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`互動實驗` })} ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/about/", "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`About` })} </div> <div class="social-links" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/resume/", "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`Resume` })} </div> </nav> </header> `;
}, "/Users/harry/Documents/Astro/harryfan.github.io/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const today = /* @__PURE__ */ new Date();
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-sz7xmlte>
&copy; ${today.getFullYear()} Harry. All rights reserved.
<div class="social-links" data-astro-cid-sz7xmlte> <a${addAttribute(`${"/"}blog/`, "href")} data-astro-cid-sz7xmlte>Blog</a> <a${addAttribute(`${"/"}about/`, "href")} data-astro-cid-sz7xmlte>About</a> <a href="https://drive.google.com/drive/folders/1R9Y6o3wxsuKGQ9Apyif0nuUccLHtDHHr" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>
技術履歷
<span class="sr-only" data-astro-cid-sz7xmlte>（新分頁開啟）</span> </a> <a href="http://linktr.ee/yaonews" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>
妖你聽新聞
<span class="sr-only" data-astro-cid-sz7xmlte>（新分頁開啟）</span> </a> </div> </footer> `;
}, "/Users/harry/Documents/Astro/harryfan.github.io/src/components/Footer.astro", void 0);

export { $$Footer as $, $$Header as a };
