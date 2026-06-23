# AI 圖片風格提示詞圖鑑 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 harryfan.github.io 部落格新增 SEO 導向的 AI 風格提示詞圖鑑區段（`/styles` 總覽 + `/style/[slug]` 詳情），含 JSON-LD、內鏈、廣告/聯盟佔位，並交付 5 篇精品風格內容。

**Architecture:** 新增 Astro content collection `styles`（frontmatter 放結構化欄位、MDX body 放散文），一個動態路由頁產出每個風格頁，一個總覽頁分組列出。共用既有 `BaseHead`/`Header`/`Footer`。純 CSS、靜態輸出、最小 JS（僅複製按鈕行內 script）。

**Tech Stack:** Astro 5.7、MDX、`@astrojs/sitemap`、zod schema、純 CSS（無 Tailwind）。無單元測試框架 → 驗證採 `pnpm run build` + grep 產出 `dist/` HTML。

**Repo / 分支:** 在 `/Users/harry/Documents/Astro/harryfan.github.io` 操作。實作前先開分支 `feat/style-prompt-encyclopedia`，避免污染部署用 `main`。所有指令的工作目錄皆為 repo 根。

---

## 檔案結構

新增：
- `src/content/styles/{ghibli,pixar,makoto-shinkai,watercolor,pixel-art}.mdx` — 5 篇內容
- `src/layouts/StylePost.astro` — 詳情頁版型（14 區塊）
- `src/components/CopyButton.astro` — 一鍵複製
- `src/components/AdSlot.astro` — 廣告佔位
- `src/components/AffiliateBlock.astro` — 聯盟推薦卡
- `src/components/StyleJsonLd.astro` — JSON-LD 注入
- `src/components/StyleCard.astro` — 列表/相關風格共用卡片
- `src/pages/styles/index.astro` — `/styles` 總覽
- `src/pages/style/[slug].astro` — `/style/:slug` 詳情

修改：
- `src/content.config.ts` — 新增 `styles` collection
- `src/components/Header.astro` — 加「風格圖鑑」導覽連結

---

## Task 0: 開分支

- [ ] **Step 1: 建立並切換分支**

Run:
```bash
git checkout -b feat/style-prompt-encyclopedia
git branch --show-current
```
Expected: 輸出 `feat/style-prompt-encyclopedia`

---

## Task 1: 新增 styles content collection schema

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: 在既有 blog collection 之後加入 styles collection**

把 `src/content.config.ts` 改為（保留既有 blog 定義，新增 styles 與更新 export）：

```ts
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const styles = defineCollection({
	loader: glob({ base: './src/content/styles', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.enum(['anime', 'illustration', 'realistic', 'game']),
		tags: z.array(z.string()).default([]),
		difficulty: z.enum(['easy', 'medium', 'hard']).default('easy'),
		prompt_zh: z.string(),
		prompt_en: z.string(),
		negative_prompt: z.string().default(''),
		seo_title: z.string(),
		seo_description: z.string().max(160),
		cover_image: z.string().optional(),
		related_styles: z.array(z.string()).default([]),
		pubDate: z.coerce.date(),
		updated_at: z.coerce.date().optional(),
		featured: z.boolean().default(false),
		models: z.array(z.string()).default([]),
		use_cases: z.array(z.string()).default([]),
		mistakes: z.array(z.string()).default([]),
		faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
		prompt_breakdown: z.array(z.object({ term: z.string(), effect: z.string() })).default([]),
	}),
});

export const collections = { blog, styles };
```

- [ ] **Step 2: 建立空目錄佔位（避免 glob 找不到目錄報錯）**

Run:
```bash
mkdir -p src/content/styles
```

- [ ] **Step 3: 型別檢查（sync）**

Run:
```bash
npx astro sync
```
Expected: 無錯誤結束（產生 `.astro/` 型別）。collection 暫無檔案不會報錯。

- [ ] **Step 4: Commit**

```bash
git add src/content.config.ts
git commit -m "feat(styles): add styles content collection schema"
```

---

## Task 2: CopyButton 元件

**Files:**
- Create: `src/components/CopyButton.astro`

- [ ] **Step 1: 寫元件**

`src/components/CopyButton.astro`：

```astro
---
interface Props {
	text: string;
	label?: string;
}
const { text, label = '複製' } = Astro.props;
---
<button class="copy-btn" type="button" data-copy={text} data-label={label}>
	<span class="copy-label">{label}</span>
</button>

<style>
	.copy-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		padding: 0.4em 0.9em;
		font-size: 0.85rem;
		border: 1px solid var(--accent, #2337ff);
		border-radius: 6px;
		background: transparent;
		color: var(--accent, #2337ff);
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}
	.copy-btn:hover { background: var(--accent, #2337ff); color: #fff; }
	.copy-btn.copied { background: #1a7f37; border-color: #1a7f37; color: #fff; }
</style>

<script>
	function initCopyButtons() {
		document.querySelectorAll<HTMLButtonElement>('.copy-btn').forEach((btn) => {
			if (btn.dataset.bound) return;
			btn.dataset.bound = 'true';
			const original = btn.dataset.label || '複製';
			btn.addEventListener('click', async () => {
				const text = btn.dataset.copy || '';
				try {
					await navigator.clipboard.writeText(text);
				} catch {
					const ta = document.createElement('textarea');
					ta.value = text;
					document.body.appendChild(ta);
					ta.select();
					document.execCommand('copy');
					ta.remove();
				}
				const labelEl = btn.querySelector('.copy-label');
				if (labelEl) labelEl.textContent = '已複製';
				btn.classList.add('copied');
				setTimeout(() => {
					if (labelEl) labelEl.textContent = original;
					btn.classList.remove('copied');
				}, 1500);
			});
		});
	}
	initCopyButtons();
	document.addEventListener('astro:page-load', initCopyButtons);
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CopyButton.astro
git commit -m "feat(styles): add CopyButton component"
```

---

## Task 3: AdSlot 元件

**Files:**
- Create: `src/components/AdSlot.astro`

- [ ] **Step 1: 寫元件**

`src/components/AdSlot.astro`：

```astro
---
interface Props {
	slot: 'hero' | 'in-article' | 'article-end' | 'sidebar';
}
const { slot } = Astro.props;
---
<aside class="ad-slot" data-ad-slot={slot} aria-label="廣告版位">
	<span class="ad-slot__note">廣告版位（AdSense 待接）· {slot}</span>
	<!-- 上線 AdSense 時，替換此元件內部為 <ins class="adsbygoogle"> 程式碼 -->
</aside>

<style>
	.ad-slot {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 90px;
		margin: 2rem 0;
		border: 1px dashed rgba(var(--gray, 96 115 159), 0.5);
		border-radius: 8px;
		background: rgba(var(--gray-light, 229 233 240), 0.4);
	}
	.ad-slot__note {
		font-size: 0.8rem;
		color: rgb(var(--gray, 96 115 159));
		letter-spacing: 0.02em;
	}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AdSlot.astro
git commit -m "feat(styles): add AdSlot placeholder component"
```

---

## Task 4: AffiliateBlock 元件

**Files:**
- Create: `src/components/AffiliateBlock.astro`

- [ ] **Step 1: 寫元件**

`src/components/AffiliateBlock.astro`：

```astro
---
const tools = [
	{ name: 'ChatGPT Plus', blurb: 'GPT Image 生圖、對話調 prompt 最順手', url: 'https://chat.openai.com/' },
	{ name: 'Claude Pro', blurb: '長文 prompt 拆解與批量改寫的好幫手', url: 'https://claude.ai/' },
	{ name: 'Midjourney', blurb: '藝術感與風格一致性的標竿生圖工具', url: 'https://www.midjourney.com/' },
	{ name: 'Flux', blurb: '開源高品質生圖，細節與文字渲染強', url: 'https://blackforestlabs.ai/' },
];
---
<section class="affiliate" aria-label="推薦工具">
	<h2>推薦 AI 工具</h2>
	<div class="affiliate__grid">
		{tools.map((t) => (
			<a class="affiliate__card" href={t.url} target="_blank" rel="sponsored nofollow noopener">
				<span class="affiliate__name">{t.name}</span>
				<span class="affiliate__blurb">{t.blurb}</span>
				<span class="affiliate__cta">前往 →</span>
			</a>
		))}
	</div>
</section>

<style>
	.affiliate { margin: 2.5rem 0; }
	.affiliate__grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1rem;
	}
	.affiliate__card {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 1rem 1.1rem;
		border: 1px solid rgba(var(--gray, 96 115 159), 0.3);
		border-radius: 10px;
		text-decoration: none;
		color: inherit;
		background: #fff;
		transition: box-shadow 0.15s, transform 0.15s;
	}
	.affiliate__card:hover { box-shadow: var(--box-shadow, 0 2px 6px rgba(0,0,0,0.1)); transform: translateY(-2px); }
	.affiliate__name { font-weight: 700; }
	.affiliate__blurb { font-size: 0.85rem; color: rgb(var(--gray, 96 115 159)); }
	.affiliate__cta { font-size: 0.85rem; color: var(--accent, #2337ff); }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AffiliateBlock.astro
git commit -m "feat(styles): add AffiliateBlock component"
```

---

## Task 5: StyleCard 元件（列表 / 相關風格共用）

**Files:**
- Create: `src/components/StyleCard.astro`

- [ ] **Step 1: 寫元件**

`src/components/StyleCard.astro`：

```astro
---
interface Props {
	slug: string;
	title: string;
	description: string;
	cover_image?: string;
}
const { slug, title, description, cover_image } = Astro.props;
---
<a class="style-card" href={`${import.meta.env.BASE_URL}style/${slug}`}>
	{cover_image && <img class="style-card__img" src={cover_image} alt={title} loading="lazy" />}
	<div class="style-card__body">
		<h3 class="style-card__title">{title}</h3>
		<p class="style-card__desc">{description}</p>
	</div>
</a>

<style>
	.style-card {
		display: flex;
		flex-direction: column;
		border: 1px solid rgba(var(--gray, 96 115 159), 0.25);
		border-radius: 12px;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		background: #fff;
		transition: box-shadow 0.15s, transform 0.15s;
	}
	.style-card:hover { box-shadow: var(--box-shadow, 0 2px 6px rgba(0,0,0,0.1)); transform: translateY(-2px); }
	.style-card__img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
	.style-card__body { padding: 0.9rem 1rem; }
	.style-card__title { margin: 0 0 0.3rem; font-size: 1.1rem; }
	.style-card__desc { margin: 0; font-size: 0.88rem; color: rgb(var(--gray, 96 115 159)); }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/StyleCard.astro
git commit -m "feat(styles): add StyleCard component"
```

---

## Task 6: StyleJsonLd 元件

**Files:**
- Create: `src/components/StyleJsonLd.astro`

- [ ] **Step 1: 寫元件**

`src/components/StyleJsonLd.astro`。注意：用 `set:html` 輸出 JSON 字串，避免 Astro 對 `<script type="application/ld+json">` 內容做 HTML 轉義。

```astro
---
interface FaqItem { q: string; a: string; }
interface Props {
	title: string;
	description: string;
	url: string;
	image?: string;
	datePublished: string;
	dateModified?: string;
	faq: FaqItem[];
	siteUrl: string;
}
const { title, description, url, image, datePublished, dateModified, faq, siteUrl } = Astro.props;

const graph: any[] = [
	{
		'@type': 'Article',
		headline: title,
		description,
		datePublished,
		dateModified: dateModified ?? datePublished,
		...(image ? { image } : {}),
		mainEntityOfPage: { '@type': 'WebPage', '@id': url },
	},
	{
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: '首頁', item: siteUrl },
			{ '@type': 'ListItem', position: 2, name: '風格圖鑑', item: `${siteUrl}styles` },
			{ '@type': 'ListItem', position: 3, name: title, item: url },
		],
	},
];

if (faq.length > 0) {
	graph.push({
		'@type': 'FAQPage',
		mainEntity: faq.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a },
		})),
	});
}

const jsonld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
---
<script type="application/ld+json" set:html={jsonld} />
```

- [ ] **Step 2: Commit**

```bash
git add src/components/StyleJsonLd.astro
git commit -m "feat(styles): add StyleJsonLd structured data component"
```

---

## Task 7: StylePost 版型（14 區塊）

**Files:**
- Create: `src/layouts/StylePost.astro`

- [ ] **Step 1: 寫版型**

`src/layouts/StylePost.astro`。接收 frontmatter `data`、`slug`、prev/next、resolved related entries，slot 放 MDX body（風格介紹）。

```astro
---
import BaseHead from '../components/BaseHead.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import CopyButton from '../components/CopyButton.astro';
import AdSlot from '../components/AdSlot.astro';
import AffiliateBlock from '../components/AffiliateBlock.astro';
import StyleCard from '../components/StyleCard.astro';
import StyleJsonLd from '../components/StyleJsonLd.astro';

interface RelatedEntry { slug: string; title: string; description: string; cover_image?: string; }
interface AdjacentEntry { slug: string; title: string; }

interface Props {
	data: any;
	slug: string;
	related: RelatedEntry[];
	prev?: AdjacentEntry;
	next?: AdjacentEntry;
}
const { data, slug, related, prev, next } = Astro.props;
const base = import.meta.env.BASE_URL;
const pageUrl = new URL(`style/${slug}`, Astro.site ?? Astro.url).toString();
const siteUrl = (Astro.site ?? new URL('/', Astro.url)).toString();
const fmtDate = (d?: Date) => d ? new Date(d).toISOString().slice(0, 10) : undefined;
---
<!doctype html>
<html lang="zh-Hant">
	<head>
		<BaseHead title={data.seo_title} description={data.seo_description} image={data.cover_image} />
		<StyleJsonLd
			title={data.title}
			description={data.seo_description}
			url={pageUrl}
			image={data.cover_image}
			datePublished={fmtDate(data.pubDate)!}
			dateModified={fmtDate(data.updated_at)}
			faq={data.faq}
			siteUrl={siteUrl}
		/>
	</head>
	<body>
		<Header />
		<main class="style-main">
			<article>
				<nav class="breadcrumb" aria-label="麵包屑">
					<a href={base}>首頁</a> ›
					<a href={`${base}styles`}>風格圖鑑</a> ›
					<span>{data.title}</span>
				</nav>

				<h1>{data.title}</h1>

				{data.use_cases.length > 0 && (
					<section class="use-cases">
						<h2>適合使用情境</h2>
						<ul class="tag-list">
							{data.use_cases.map((u: string) => <li>{u}</li>)}
						</ul>
					</section>
				)}

				<section class="intro">
					<h2>風格介紹</h2>
					<slot />
				</section>

				<AdSlot slot="in-article" />

				<section class="prompt-block">
					<div class="prompt-block__head">
						<h2>中文 Prompt</h2>
						<CopyButton text={data.prompt_zh} />
					</div>
					<pre class="prompt-text">{data.prompt_zh}</pre>
				</section>

				<section class="prompt-block">
					<div class="prompt-block__head">
						<h2>英文 Prompt</h2>
						<CopyButton text={data.prompt_en} />
					</div>
					<pre class="prompt-text">{data.prompt_en}</pre>
				</section>

				{data.negative_prompt && (
					<section class="prompt-block">
						<div class="prompt-block__head">
							<h2>Negative Prompt</h2>
							<CopyButton text={data.negative_prompt} />
						</div>
						<pre class="prompt-text">{data.negative_prompt}</pre>
					</section>
				)}

				{data.prompt_breakdown.length > 0 && (
					<section>
						<h2>Prompt 拆解教學</h2>
						<table class="breakdown">
							<thead><tr><th>關鍵詞</th><th>作用</th></tr></thead>
							<tbody>
								{data.prompt_breakdown.map((b: any) => (
									<tr><td>{b.term}</td><td>{b.effect}</td></tr>
								))}
							</tbody>
						</table>
					</section>
				)}

				{data.mistakes.length > 0 && (
					<section>
						<h2>常見錯誤</h2>
						<ul>{data.mistakes.map((m: string) => <li>{m}</li>)}</ul>
					</section>
				)}

				{data.models.length > 0 && (
					<section>
						<h2>推薦模型</h2>
						<ul class="tag-list">{data.models.map((m: string) => <li>{m}</li>)}</ul>
					</section>
				)}

				<AffiliateBlock />

				{related.length > 0 && (
					<section>
						<h2>相關風格</h2>
						<div class="related-grid">
							{related.map((r) => (
								<StyleCard slug={r.slug} title={r.title} description={r.description} cover_image={r.cover_image} />
							))}
						</div>
					</section>
				)}

				<nav class="adjacent" aria-label="同分類導覽">
					{prev && <a href={`${base}style/${prev.slug}`}>← {prev.title}</a>}
					{next && <a class="adjacent__next" href={`${base}style/${next.slug}`}>{next.title} →</a>}
				</nav>

				{data.faq.length > 0 && (
					<section class="faq">
						<h2>常見問題 FAQ</h2>
						{data.faq.map((f: any) => (
							<details>
								<summary>{f.q}</summary>
								<p>{f.a}</p>
							</details>
						))}
					</section>
				)}

				<AdSlot slot="article-end" />
			</article>
		</main>
		<Footer />
	</body>
</html>

<style>
	.style-main { max-width: 760px; margin: 0 auto; padding: 1rem; }
	.breadcrumb { font-size: 0.85rem; color: rgb(var(--gray, 96 115 159)); margin-bottom: 1rem; }
	.breadcrumb a { color: rgb(var(--gray, 96 115 159)); }
	.tag-list { list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; }
	.tag-list li {
		padding: 0.3em 0.8em;
		background: rgba(var(--gray-light, 229 233 240), 0.6);
		border-radius: 999px;
		font-size: 0.85rem;
	}
	.prompt-block { margin: 1.5rem 0; }
	.prompt-block__head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
	.prompt-text {
		white-space: pre-wrap;
		word-break: break-word;
		background: rgba(var(--gray-light, 229 233 240), 0.5);
		border-radius: 8px;
		padding: 1rem;
		font-size: 0.9rem;
		line-height: 1.6;
	}
	.breakdown { width: 100%; border-collapse: collapse; }
	.breakdown th, .breakdown td { text-align: left; padding: 0.5rem; border-bottom: 1px solid rgba(var(--gray,96 115 159),0.2); vertical-align: top; }
	.related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
	.adjacent { display: flex; justify-content: space-between; gap: 1rem; margin: 2rem 0; }
	.adjacent__next { margin-left: auto; }
	.faq details { border-bottom: 1px solid rgba(var(--gray,96 115 159),0.2); padding: 0.7rem 0; }
	.faq summary { cursor: pointer; font-weight: 600; }
	.faq p { margin: 0.6rem 0 0; color: rgb(var(--gray-dark, 34 41 57)); }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/StylePost.astro
git commit -m "feat(styles): add StylePost layout with 14 sections"
```

---

## Task 8: 第一篇內容 ghibli.mdx（解鎖路由建置）

**Files:**
- Create: `src/content/styles/ghibli.mdx`

> 注：此任務先放第一篇，讓 Task 9 動態路由能 build。其餘 4 篇在 Task 11 補齊。related_styles 先指向尚未建立的 slug，Astro 不會因此報錯（只是該卡片在解析時略過）。

- [ ] **Step 1: 寫內容**

`src/content/styles/ghibli.mdx`（風格介紹 body ≥ 500 字；以下示意需填滿，實作時擴寫足量繁中內容）：

```mdx
---
title: 吉卜力風格
description: 溫暖手繪、柔和光線與自然細節，宮崎駿動畫的療癒美學。
category: anime
tags: [吉卜力, 宮崎駿, 手繪, 動畫]
difficulty: easy
prompt_zh: 吉卜力工作室風格，溫暖柔和的手繪動畫質感，細膩的自然光線，蓬鬆的雲朵與翠綠草原，懷舊溫馨的色調，水彩般的背景，柔焦景深，2D 賽璐珞上色
prompt_en: Studio Ghibli style, warm hand-drawn animation, soft natural lighting, fluffy clouds over lush green meadows, nostalgic cozy color palette, watercolor-like backgrounds, soft depth of field, 2D cel shading, anime film aesthetic
negative_prompt: 3d render, photorealistic, low quality, blurry, extra fingers, deformed hands, text, watermark, oversaturated
seo_title: 吉卜力風格提示詞｜ChatGPT、Midjourney、Flux 完整教學
seo_description: 完整吉卜力風格 AI 圖片提示詞教學，附中文與英文 Prompt、Negative Prompt、關鍵詞拆解、常見錯誤與推薦模型，適用 ChatGPT、GPT Image、Midjourney、Flux、Stable Diffusion。
cover_image: /blog-placeholder-1.jpg
related_styles: [makoto-shinkai, watercolor, pixar, pixel-art, oil-painting, anime]
pubDate: 2026-06-23
updated_at: 2026-06-23
featured: true
models: [GPT Image, Midjourney, Flux, Stable Diffusion]
use_cases: [頭像, 桌布, 海報, 社群貼文, YouTube Thumbnail]
mistakes: [畫面太亂導致主體不明確, 顏色過度飽和失去溫潤感, 角色臉部崩壞或手指異常, 加入寫實光影破壞手繪質感]
prompt_breakdown:
  - { term: Studio Ghibli style, effect: 鎖定整體吉卜力美術風格的核心關鍵詞 }
  - { term: soft natural lighting, effect: 營造柔和自然的光影，避免硬陰影 }
  - { term: watercolor-like backgrounds, effect: 讓背景呈現水彩暈染的手繪感 }
  - { term: 2D cel shading, effect: 指定平塗賽璐珞上色，避免 3D 渲染 }
  - { term: nostalgic cozy color palette, effect: 控制成懷舊溫暖的色調 }
faq:
  - { q: 吉卜力風格在哪個 AI 工具效果最好？, a: Midjourney 與 Flux 對手繪動畫質感的還原最佳，GPT Image 則最容易用對話微調構圖。 }
  - { q: 為什麼生出來的圖太寫實？, a: 在 prompt 強調 2D cel shading、hand-drawn，並把 photorealistic、3d render 放進 Negative Prompt。 }
  - { q: 如何讓畫面更療癒？, a: 加入 warm lighting、cozy、pastoral 等詞，並降低飽和度關鍵詞。 }
  - { q: 可以商用嗎？, a: 風格本身不受著作權保護，但請避免直接重現特定電影畫面或角色，並確認所用模型的授權條款。 }
  - { q: 角色手指畫崩怎麼辦？, a: 加 deformed hands、extra fingers 到 Negative Prompt，並提高生成張數挑選。 }
  - { q: 適合做 YouTube 縮圖嗎？, a: 適合，溫暖高辨識度的色調在縮圖中很吸睛，建議搭配大字標題。 }
  - { q: 中文 prompt 和英文 prompt 哪個好？, a: 多數模型對英文理解更精準，建議以英文為主、中文輔助說明。 }
  - { q: 要怎麼保持多張圖風格一致？, a: 固定同一組風格關鍵詞與 seed，或在 Midjourney 使用 style reference。 }
---

（此處撰寫 ≥500 字繁體中文風格介紹：吉卜力美學的起源與特色、手繪與光影的處理、適合的題材與情緒、在各 AI 模型中的表現差異與調校心得。實作時務必寫滿，勿留佔位。）
```

- [ ] **Step 2: Commit**

```bash
git add src/content/styles/ghibli.mdx
git commit -m "content(styles): add ghibli style entry"
```

---

## Task 9: `/style/[slug]` 動態詳情頁

**Files:**
- Create: `src/pages/style/[slug].astro`

- [ ] **Step 1: 寫動態路由頁**

`src/pages/style/[slug].astro`。負責：產出所有路徑、解析 related/prev/next、render MDX body 進 slot。

```astro
---
import { getCollection, render } from 'astro:content';
import StylePost from '../../layouts/StylePost.astro';

export async function getStaticPaths() {
	const styles = await getCollection('styles');
	return styles.map((entry) => {
		const related = (entry.data.related_styles || [])
			.map((slug: string) => styles.find((s) => s.id === slug))
			.filter(Boolean)
			.slice(0, 6)
			.map((s: any) => ({
				slug: s.id,
				title: s.data.title,
				description: s.data.description,
				cover_image: s.data.cover_image,
			}));

		const sameCat = styles
			.filter((s) => s.data.category === entry.data.category)
			.sort((a, b) => +a.data.pubDate - +b.data.pubDate);
		const idx = sameCat.findIndex((s) => s.id === entry.id);
		const prevEntry = idx > 0 ? sameCat[idx - 1] : undefined;
		const nextEntry = idx >= 0 && idx < sameCat.length - 1 ? sameCat[idx + 1] : undefined;

		return {
			params: { slug: entry.id },
			props: {
				entry,
				related,
				prev: prevEntry ? { slug: prevEntry.id, title: prevEntry.data.title } : undefined,
				next: nextEntry ? { slug: nextEntry.id, title: nextEntry.data.title } : undefined,
			},
		};
	});
}

const { entry, related, prev, next } = Astro.props;
const { Content } = await render(entry);
---
<StylePost data={entry.data} slug={entry.id} related={related} prev={prev} next={next}>
	<Content />
</StylePost>
```

- [ ] **Step 2: Build 驗證**

Run:
```bash
pnpm run build
```
Expected: build 成功，產出 `dist/style/ghibli/index.html`。

- [ ] **Step 3: 驗證頁面內容與 JSON-LD**

Run:
```bash
test -f dist/style/ghibli/index.html && echo "PAGE OK"
grep -q 'application/ld+json' dist/style/ghibli/index.html && echo "JSONLD OK"
grep -q 'FAQPage' dist/style/ghibli/index.html && echo "FAQ OK"
grep -q 'BreadcrumbList' dist/style/ghibli/index.html && echo "BREADCRUMB OK"
grep -q 'copy-btn' dist/style/ghibli/index.html && echo "COPY OK"
```
Expected: 五行皆印出 `OK`。

- [ ] **Step 4: Commit**

```bash
git add src/pages/style/[slug].astro
git commit -m "feat(styles): add dynamic style detail route"
```

---

## Task 10: `/styles` 總覽頁

**Files:**
- Create: `src/pages/styles/index.astro`

- [ ] **Step 1: 寫總覽頁**

`src/pages/styles/index.astro`。Hero + AdSlot + 六大分組。

```astro
---
import { getCollection } from 'astro:content';
import BaseHead from '../../components/BaseHead.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import AdSlot from '../../components/AdSlot.astro';
import StyleCard from '../../components/StyleCard.astro';

const styles = await getCollection('styles');
const byDateDesc = [...styles].sort((a, b) => +b.data.pubDate - +a.data.pubDate);

const toCard = (s: any) => ({
	slug: s.id,
	title: s.data.title,
	description: s.data.description,
	cover_image: s.data.cover_image,
});

const groups = [
	{ key: 'featured', title: '熱門風格', items: styles.filter((s) => s.data.featured).map(toCard) },
	{ key: 'latest', title: '最新風格', items: byDateDesc.slice(0, 8).map(toCard) },
	{ key: 'anime', title: '動漫風格', items: styles.filter((s) => s.data.category === 'anime').map(toCard) },
	{ key: 'illustration', title: '插畫風格', items: styles.filter((s) => s.data.category === 'illustration').map(toCard) },
	{ key: 'realistic', title: '寫實風格', items: styles.filter((s) => s.data.category === 'realistic').map(toCard) },
	{ key: 'game', title: '遊戲風格', items: styles.filter((s) => s.data.category === 'game').map(toCard) },
].filter((g) => g.items.length > 0);

const seoTitle = 'AI 圖片風格提示詞圖鑑｜ChatGPT、Midjourney、Flux 提示詞大全';
const seoDesc = '收錄數百種 AI 圖片生成風格提示詞，含中英文 Prompt、Negative Prompt 與教學，支援 ChatGPT、GPT Image、Midjourney、Flux、Stable Diffusion。';
---
<!doctype html>
<html lang="zh-Hant">
	<head>
		<BaseHead title={seoTitle} description={seoDesc} />
	</head>
	<body>
		<Header />
		<main class="styles-main">
			<section class="hero">
				<h1>AI 圖片風格提示詞圖鑑</h1>
				<p class="hero__sub">收錄數百種 AI 圖片生成風格提示詞，支援 ChatGPT、GPT Image、Midjourney、Flux、Stable Diffusion</p>
			</section>

			<AdSlot slot="hero" />

			{groups.map((g) => (
				<section class="group">
					<h2>{g.title}</h2>
					<div class="group__grid">
						{g.items.map((it) => (
							<StyleCard slug={it.slug} title={it.title} description={it.description} cover_image={it.cover_image} />
						))}
					</div>
				</section>
			))}
		</main>
		<Footer />
	</body>
</html>

<style>
	.styles-main { max-width: 960px; margin: 0 auto; padding: 1rem; }
	.hero { text-align: center; padding: 2.5rem 1rem 1rem; }
	.hero h1 { margin: 0 0 0.6rem; }
	.hero__sub { color: rgb(var(--gray, 96 115 159)); max-width: 640px; margin: 0 auto; }
	.group { margin: 2.5rem 0; }
	.group__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.2rem; }
</style>
```

- [ ] **Step 2: Build + 驗證**

Run:
```bash
pnpm run build
test -f dist/styles/index.html && echo "INDEX OK"
grep -q 'AI 圖片風格提示詞圖鑑' dist/styles/index.html && echo "HERO OK"
grep -q '熱門風格' dist/styles/index.html && echo "GROUP OK"
```
Expected: 三行 `OK`。

- [ ] **Step 3: Commit**

```bash
git add src/pages/styles/index.astro
git commit -m "feat(styles): add /styles overview page"
```

---

## Task 11: 補齊其餘 4 篇內容

**Files:**
- Create: `src/content/styles/pixar.mdx`
- Create: `src/content/styles/makoto-shinkai.mdx`
- Create: `src/content/styles/watercolor.mdx`
- Create: `src/content/styles/pixel-art.mdx`

> 每篇結構與 ghibli.mdx 相同，需填滿所有必填欄位：body ≥500 字、use_cases≥5、mistakes≥3、models≥3、prompt_breakdown≥5、faq≥8、related_styles≥6（互相指向，5 篇互鏈）。category 對照：pixar=illustration(featured)、makoto-shinkai=anime、watercolor=illustration、pixel-art=game。slug=檔名。

- [ ] **Step 1: 寫 pixar.mdx**

frontmatter 重點：
```yaml
title: 皮克斯風格
category: illustration
featured: true
seo_title: 皮克斯風格提示詞｜ChatGPT、Midjourney、Flux 完整教學
related_styles: [pixar... 改為其他四篇 + 佔位]
```
（完整填滿如 ghibli；prompt_zh/en 以「Pixar 3D animation, soft global illumination, expressive characters, subsurface scattering skin...」為核心，body 寫滿皮克斯 3D 卡通美學介紹。）

- [ ] **Step 2: 寫 makoto-shinkai.mdx**

核心 prompt：`Makoto Shinkai style, hyper-detailed skies, volumetric god rays, lens flare, vivid saturated colors, photorealistic clouds, emotional cinematic lighting`。category: anime。完整填滿。

- [ ] **Step 3: 寫 watercolor.mdx**

核心 prompt：`watercolor painting, soft bleeding pigments, visible paper texture, wet-on-wet technique, delicate washes, hand-painted`。category: illustration。完整填滿。

- [ ] **Step 4: 寫 pixel-art.mdx**

核心 prompt：`pixel art, 16-bit retro game sprite, limited color palette, crisp dithering, isometric, no anti-aliasing`。category: game。完整填滿。

- [ ] **Step 5: 統一 related_styles 互鏈**

確認 5 篇的 `related_styles` 彼此互相涵蓋（每篇至少含其餘 4 篇 slug），不足 6 的補上 Phase 2 佔位 slug（如 `oil-painting`, `anime`, `cyberpunk`）。

- [ ] **Step 6: Build + 驗證全部頁面**

Run:
```bash
pnpm run build
for s in ghibli pixar makoto-shinkai watercolor pixel-art; do
  test -f dist/style/$s/index.html && echo "$s OK" || echo "$s MISSING"
done
```
Expected: 五個 `OK`。

- [ ] **Step 7: Commit**

```bash
git add src/content/styles/
git commit -m "content(styles): add pixar, makoto-shinkai, watercolor, pixel-art entries"
```

---

## Task 12: Header 導覽連結

**Files:**
- Modify: `src/components/Header.astro`

- [ ] **Step 1: 先讀檔確認現有連結結構**

Run:
```bash
cat src/components/Header.astro
```
找到 `HeaderLink` 連結列表（如 `/`、`/blog`、`/about`）。

- [ ] **Step 2: 在現有 HeaderLink 列表中加入風格圖鑑連結**

於既有連結同層級加入（依檔案實際語法調整，沿用既有 `HeaderLink` 元件）：
```astro
<HeaderLink href="/styles">風格圖鑑</HeaderLink>
```

- [ ] **Step 3: Build + 驗證導覽出現**

Run:
```bash
pnpm run build
grep -q '風格圖鑑' dist/index.html && echo "NAV OK"
```
Expected: `NAV OK`。

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat(styles): add 風格圖鑑 nav link to header"
```

---

## Task 13: 最終整體驗證

- [ ] **Step 1: 乾淨重建**

Run:
```bash
rm -rf dist && pnpm run build
```
Expected: 成功，無錯誤。

- [ ] **Step 2: 驗證 sitemap 收錄新頁面**

Run:
```bash
grep -l 'style/ghibli' dist/sitemap-*.xml && echo "SITEMAP OK"
```
Expected: 印出 sitemap 檔名 + `SITEMAP OK`。

- [ ] **Step 3: 驗證每個詳情頁含三種 JSON-LD 與複製按鈕**

Run:
```bash
for s in ghibli pixar makoto-shinkai watercolor pixel-art; do
  f=dist/style/$s/index.html
  grep -q 'Article' $f && grep -q 'FAQPage' $f && grep -q 'BreadcrumbList' $f && grep -q 'copy-btn' $f \
    && echo "$s FULL OK" || echo "$s INCOMPLETE"
done
```
Expected: 五個 `FULL OK`。

- [ ] **Step 4: 本地預覽人工檢查（選用）**

Run:
```bash
pnpm run preview
```
瀏覽 `/styles` 與 `/style/ghibli`，確認版面、複製按鈕、FAQ 摺疊、廣告佔位、聯盟卡正常。檢查後 Ctrl-C 結束。

- [ ] **Step 5: 不部署，留待人工 review**

> 部署 (`pnpm run deploy`) 與合併回 main 留給使用者決定。此計畫只完成內容與功能建置，不自動發布。

---

## Self-Review 對照

- Schema 全欄位 → Task 1 ✓
- `/styles` 六分組 → Task 10 ✓
- `/style/[slug]` 14 區塊 → Task 7 + 9 ✓
- JSON-LD Article/FAQPage/Breadcrumb → Task 6 ✓（Task 9/13 驗證）
- 一鍵複製 → Task 2 ✓
- 廣告佔位 4 位置 → Task 3（hero/in-article/article-end 用於頁面；sidebar 元件已支援，桌機側欄可於 Phase 2 版面接入）✓
- 聯盟卡 rel=sponsored nofollow → Task 4 ✓
- 內鏈 related×6 + prev/next → Task 9 ✓
- Header 導覽 → Task 12 ✓
- 5 篇內容 → Task 8 + 11 ✓
- sitemap → Task 13 ✓
- 純 CSS、無新依賴 → 全程無 `pnpm add` ✓

**已知偏差：** sidebar 廣告位元件已建立但詳情頁版面為單欄，未實際嵌入側欄；屬 spec「預留」範圍，Phase 2 改雙欄版面時接入。
