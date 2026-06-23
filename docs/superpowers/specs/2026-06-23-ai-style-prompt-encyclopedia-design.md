# AI 圖片風格提示詞圖鑑 — 設計文件（Phase 1）

- 日期：2026-06-23
- 狀態：已核准，待實作
- 所在 repo：`harryfan.github.io`（根網域 `https://harryfan.github.io/`，base `/`）

## 目標

在現有部落格 `harryfan.github.io` 中新增一個 SEO 導向的 AI 圖片風格提示詞圖鑑區段，作為廣告與聯盟行銷的內容基礎。讀者搜尋「吉卜力風格提示詞」「水彩風格提示詞」等關鍵字時，能透過 Google 找到本站。

未來收入來源（非本階段實作）：Google AdSense、AI 工具聯盟行銷、Prompt Pack 數位商品、會員訂閱。本階段只為前兩者預留版位。

## 範圍（Phase 1）

**做：**
- 新 content collection `styles`
- `/styles` 總覽列表頁
- `/style/[slug]` 風格詳情動態頁
- `StylePost.astro` layout、`CopyButton`、`AdSlot`、`AffiliateBlock`、`StyleJsonLd` 元件
- Header 新增 `風格圖鑑` 導覽連結
- JSON-LD（Article + FAQPage + BreadcrumbList）、內部連結
- 5 篇精品風格內容：吉卜力、皮克斯、新海誠、水彩、像素

**不做（延後 Phase 2+）：**
- Pagefind 站內搜尋（5 篇不需要；binary + postbuild + ~20MB，磁碟吃緊）
- `generate:style` 批量產生腳本
- subject × style 長尾程式化頁面（如「貓咪 + 水彩風格」）
- 分類瀏覽頁（如 `/style-anime`）
- 真實 AdSense 程式碼（尚未過審）
- 會員訂閱、Prompt Pack 商品

## 決策

- **併入現有 repo**：根網域對 SEO 最佳、依賴已安裝、與部落格共用版型與導覽，磁碟省。
- **沿用純 CSS**：延伸 `src/styles/global.css`，不加 Tailwind；圖鑑頁用 scoped `<style>`。
- **Pagefind 延後**：見上。
- **路由**：`/styles` 為總覽，`/style/[slug]` 為詳情；分類瀏覽頁延後。

## 架構

### 檔案結構（新增）

```
src/
  content/
    styles/
      ghibli.mdx
      pixar.mdx
      makoto-shinkai.mdx
      watercolor.mdx
      pixel-art.mdx
  content.config.ts        # 既有，新增 styles collection
  layouts/
    StylePost.astro        # 風格詳情版型
  components/
    CopyButton.astro       # 一鍵複製（client island）
    AdSlot.astro           # 廣告佔位
    AffiliateBlock.astro   # 聯盟推薦卡
    StyleJsonLd.astro      # 注入 JSON-LD
  pages/
    styles/
      index.astro          # /styles 總覽
    style/
      [slug].astro         # /style/:slug 詳情
```

### Content Collection Schema（`src/content.config.ts` 新增）

```ts
const styles = defineCollection({
  loader: glob({ base: './src/content/styles', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),                 // 例：吉卜力風格
    description: z.string(),           // 簡短描述（列表卡片用）
    category: z.enum([
      'anime', 'illustration', 'realistic', 'game',
    ]),                                // 對應首頁區塊；可擴充
    tags: z.array(z.string()).default([]),
    difficulty: z.enum(['easy', 'medium', 'hard']).default('easy'),
    prompt_zh: z.string(),
    prompt_en: z.string(),
    negative_prompt: z.string().default(''),
    seo_title: z.string(),             // 例：吉卜力風格提示詞｜ChatGPT、Midjourney、Flux 完整教學
    seo_description: z.string().max(160),
    cover_image: z.string().optional(),
    related_styles: z.array(z.string()).default([]),  // slug 陣列，至少 6
    pubDate: z.coerce.date(),          // 最新排序用
    updated_at: z.coerce.date().optional(),
    featured: z.boolean().default(false),  // 熱門區塊用
    models: z.array(z.string()).default([]),  // 推薦模型，例：['GPT Image','Midjourney','Flux','Stable Diffusion']
    use_cases: z.array(z.string()).default([]),  // 適合情境
    mistakes: z.array(z.string()).default([]),   // 常見錯誤
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),  // 至少 8 題
    prompt_breakdown: z.array(z.object({ term: z.string(), effect: z.string() })).default([]),
  }),
});

export const collections = { blog, styles };
```

說明：散文型內容（風格介紹 500 字+、Prompt 拆解補充）放 MDX body；高度結構化內容（FAQ、use_cases、mistakes、prompt_breakdown）放 frontmatter，方便產 JSON-LD 與一致排版。

### 元件契約

**`CopyButton.astro`**
- Props：`text: string`、`label?: string`（預設「複製」）
- 渲染按鈕，行內 `<script>` 用 `navigator.clipboard.writeText` 複製，複製後短暫顯示「已複製」。
- 無外部依賴；每個 prompt 區塊一顆。

**`AdSlot.astro`**
- Props：`slot: 'hero' | 'in-article' | 'article-end' | 'sidebar'`
- 本階段渲染一個有虛線邊框、置中標示「廣告版位（AdSense 待接）」的 div，帶 `data-ad-slot={slot}`。
- 之後接 AdSense 時，只改此元件內部即可全站生效。

**`AffiliateBlock.astro`**
- 渲染靜態推薦卡：ChatGPT Plus、Claude Pro、Midjourney、Flux。
- 每張卡含名稱、一句話、外連按鈕。外連 `rel="sponsored nofollow"`、`target="_blank"`。
- 連結網址先用官網首頁佔位，日後換聯盟連結。

**`StyleJsonLd.astro`**
- Props：完整 style entry data + canonical URL。
- 輸出一個 `<script type="application/ld+json">`，內含一個 `@graph` 陣列：
  - `Article`（headline、description、datePublished=pubDate、dateModified=updated_at、image=cover_image）
  - `FAQPage`（mainEntity 由 frontmatter `faq` 產生）
  - `BreadcrumbList`（首頁 → 風格圖鑑 → 本風格）

### 頁面行為

**`/styles`（總覽）**
- 取所有 styles，依 spec 首頁區塊分組呈現：
  - 熱門風格（`featured === true`）
  - 最新風格（依 pubDate 由新到舊取前 N）
  - 動漫風格（category `anime`）
  - 插畫風格（category `illustration`）
  - 寫實風格（category `realistic`）
  - 遊戲風格（category `game`）
- Hero：標題「AI 圖片風格提示詞圖鑑」、副標「收錄數百種 AI 圖片生成風格提示詞，支援 ChatGPT、GPT Image、Midjourney、Flux、Stable Diffusion」。
- Hero 下方放 `AdSlot slot="hero"`。
- 每個風格以卡片呈現（cover_image、title、description），連向 `/style/[slug]`。

**`/style/[slug]`（詳情）**
- `getStaticPaths` 由 styles collection 產生。
- 用 `StylePost.astro`，傳入 entry。
- 區塊順序（照 spec）：
  1. 麵包屑
  2. 標題 + 適合情境（use_cases 標籤）
  3. 風格介紹（MDX body，≥500 字）
  4. `AdSlot slot="in-article"`
  5. 中文 Prompt 區塊 + `CopyButton`
  6. 英文 Prompt 區塊 + `CopyButton`
  7. Negative Prompt 區塊 + `CopyButton`
  8. Prompt 拆解教學（prompt_breakdown 表）
  9. 常見錯誤（mistakes 列表）
  10. 推薦模型（models）
  11. `AffiliateBlock`
  12. 相關風格 ×6（related_styles → 卡片）+ 同分類上一篇/下一篇
  13. FAQ（faq，≥8 題，可摺疊 `<details>`）
  14. `AdSlot slot="article-end"`
- `StyleJsonLd` 注入結構化資料。
- `BaseHead` 餵入 `seo_title`、`seo_description`、`cover_image`。

### SEO 細節

- Title：`seo_title`（例：`吉卜力風格提示詞｜ChatGPT、Midjourney、Flux 完整教學`）
- Description：`seo_description`，150–160 字。
- Canonical / OG / Twitter Card：BaseHead 既有邏輯自動處理。
- Sitemap：`@astrojs/sitemap` 自動收錄新頁面，無需改設定。
- 內部連結：related_styles（≥6）+ 同分類 prev/next，建立強內鏈。

### 變現版位（佔位）

- AdSlot 位置：Hero 下方、文章中段、文章結尾、Sidebar（詳情頁右欄，桌機）。
- AffiliateBlock：詳情頁相關風格之前。
- 本階段皆為視覺佔位 / 靜態卡，無真實 AdSense 程式碼、無真實聯盟連結。

## 5 篇種子內容規格

每篇需完整填滿 schema 必填欄位，且：
- 風格介紹 body ≥ 500 字（繁中）
- prompt_zh / prompt_en / negative_prompt 完整可用
- use_cases ≥ 5、mistakes ≥ 3、models ≥ 3、prompt_breakdown ≥ 5、faq ≥ 8
- related_styles ≥ 6（互相指向，5 篇之間先互鏈，不足處可指向尚未建立的 slug 作為 Phase 2 佔位）

風格清單與分類：
- `ghibli` 吉卜力風格 — anime — featured
- `pixar` 皮克斯風格 — illustration — featured
- `makoto-shinkai` 新海誠風格 — anime
- `watercolor` 水彩風格 — illustration
- `pixel-art` 像素風格 — game

## 效能目標

維持現有 Lighthouse 水準。純 CSS、靜態輸出、最小 JS（僅 CopyButton 行內 script）。圖片用 `cover_image`，建議走既有資產流程。

## 風險與注意

- **磁碟空間**：根分割區僅剩 ~478Mi（97% 滿）。實作前先清點（`pnpm store prune`、清 `~/Library/Caches`、評估移除其他 repo 的 `node_modules`）。Build 5 頁應可，但 `dist/` 為 in-tree commit，需空間。
- **內容品質**：5 篇人工精修，避免 AI 模板感，保住初期 SEO 信任。
- **AdSense 過審**：版位先空置，待內容量足、流量起步再申請，避免空站送審被拒。

## 驗收標準

- `pnpm run build` 成功，產出 `/styles` 與 5 個 `/style/*` 頁面。
- 每個詳情頁含 14 區塊、3 種 JSON-LD、複製按鈕可用。
- `/styles` 六大分組正確分類。
- Header 出現「風格圖鑑」連結並可達。
- sitemap 收錄新頁面。
- 純 CSS、無新增執行期依賴。
