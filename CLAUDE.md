# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server on http://localhost:4324 (port is pinned in astro.config.mjs)
npm run build     # astro build -> dist/  (also the only "test": content schema violations fail the build)
npm run preview   # serve dist/
npm run deploy    # build + gh-pages push to gh-pages branch (manual path, see Deploy below)
```

No test runner, no linter, no formatter configured. Verification = `npm run build` (Zod schemas in `src/content.config.ts` are the type gate) plus visual check via `npm run dev`.

Media/cover generation scripts (run ad hoc, not part of build):

```bash
node scripts/capture-works-media.mjs [slug] [--force]  # Playwright+ffmpeg: screenshots/records /works/ pages -> public/works/<slug>.webp|.mp4|-loop.mp4
node scripts/gen-blog-covers.mjs                       # AI cover images -> public/blog/<slug>.png, rewrites heroImage frontmatter
node scripts/gen-style-covers.mjs                      # AI cover images -> public/styles/<slug>.png
```

API keys for the two `gen-*` scripts come from env (`OPENAI_API_KEY` / `GEMINI_API_KEY`) or gitignored files `.openai_key.local` / `.gemini_key.local`. `gen-blog-covers.mjs` falls back between providers on 401/403/429; `IMAGE_PROVIDER=openai|gemini` picks which is tried first.

## Architecture

Astro 5 static site, no UI framework, no CSS framework. Deployed as the **user root site** `https://harryfan.github.io/`, so `base` is always `/` — do not reintroduce a subpath base.

**Content collections drive nearly every page.** `src/content.config.ts` defines three collections, each loaded via `glob()` from `src/content/`:

| Collection | Files | Rendered by | Purpose |
|---|---|---|---|
| `blog` | `src/content/blog/YYYY-MM-DD-slug.md` | `src/pages/blog/[...slug].astro` + `blog/category/[category].astro` | Tech posts. `category` enum must match `CATEGORIES` in `src/consts.ts`. |
| `styles` | `src/content/styles/*.mdx` | `src/pages/style/[slug].astro`, index at `/styles/` | AI-image prompt style library — heavy SEO frontmatter (`seo_title`, `faq`, `prompt_breakdown`, …) that the page and `StyleJsonLd.astro` render into structured data. |
| `works` | `src/content/works/*.md` | `src/pages/works/[slug].astro` | Portfolio. Schema is deliberately strict: `origin` is a literal, and a `.refine()` makes `disclaimer` mandatory when `brand_basis === 'unofficial-concept'` — attribution honesty is enforced by the build, not by discipline. |

Adding content = adding a file that satisfies the schema. Adding a frontmatter field means editing the schema first, or the build fails.

Shared pieces: `src/consts.ts` (site title/description, GA4 id, `CATEGORIES` map — the source of truth for blog categories), `src/components/BaseHead.astro` (all `<head>`: canonical, OG, RSS, font preloads, GA, and an optional `preloadImage` prop for LCP images — see its comment for why `fetchpriority` alone was not enough), `src/styles/global.css` (single stylesheet; the whole design system lives in the `:root` custom properties — paper/ink palette, hard offset `--box-shadow`, `--content-width`).

Design direction is documented in `.impeccable.md`: neo-brutalist / editorial minimal, stark lines and big type, explicitly no gradients / soft shadows / rounded emoji cards. Follow it when touching visuals.

## Deploy

Two paths exist and both target the same live site:

1. `.github/workflows/deploy.yml` — push to `main` builds and deploys via `actions/deploy-pages`. This is the normal path.
2. `npm run deploy` — local build + `gh-pages -d dist -b gh-pages`. Legacy manual path; running it can fight with the Actions deployment.

`astro.config.mjs` switches `site` between `https://harryfan.github.io` and `http://localhost:4324` on `NODE_ENV === 'production'`, and pins asset filenames (`assets/[name].js`, unhashed names for fonts/images) via Vite rollup output options.

## Other docs

`README.md` (contributor-facing) and `系統架構.md` (architecture in Chinese) were rewritten on 2026-08-14 to match the current stack; keep them in sync when structure changes. Both previously claimed Tailwind + Flowbite and separate `harry-blog` / `harry-portfolio` subsites — none of that was ever true of this version, so ignore those claims if they resurface from `.bak` copies. `開發挑戰.md` and `todo.md` are working notes, not verified references.
