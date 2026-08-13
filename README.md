# Harry Fan's Digital Home

個人網站與技術部落格，Astro 5 靜態站，部署在 GitHub Pages 根網域。

🔗 https://harryfan.github.io/

## 網站內容

| 區塊 | 路徑 | 說明 |
|------|------|------|
| 首頁 | `/` | 個人主頁 |
| 部落格 | `/blog/` | 技術文章，分類：前端實戰 / AI 協作與工具 / 活動筆記 / 職涯觀點 |
| 作品集 | `/works/` | 專案與互動作品，含封面圖與滾動錄影 |
| 風格庫 | `/styles/` | AI 生圖風格提示詞資料庫 |
| 關於 / 履歷 | `/about`、`/resume` | |
| RSS | `/rss.xml` | |

## 本地開發

需要 Node.js 20（CI 使用 20，Astro 5 最低需 18.20.8）。

```bash
git clone git@github.com:HarryFan/HarryFan.github.io.git
cd HarryFan.github.io
npm install
npm run dev       # http://localhost:4324
```

| 指令 | 說明 |
|------|------|
| `npm run dev` | 開發伺服器，port 4324（寫死在 `astro.config.mjs`） |
| `npm run build` | 建置到 `dist/`。內容集合的 Zod schema 不通過就直接失敗，等同型別測試 |
| `npm run preview` | 預覽建置結果 |
| `npm run deploy` | 建置 + `gh-pages` 推到 `gh-pages` 分支（手動備援路徑） |

沒有測試框架、linter 或 formatter。驗證方式是 `npm run build` 加上 `npm run dev` 目視檢查。

## 技術棧

- **Astro 5** — 靜態網站生成，全站無前端框架
- **@astrojs/mdx / rss / sitemap** — MDX 內容、RSS feed、sitemap
- **原生 CSS** — 單一 `src/styles/global.css`，設計 token 全放在 `:root`。**沒有使用 Tailwind 或任何 CSS 框架**
- **TypeScript** — 內容集合 schema 與工具函式
- **playwright + ffmpeg** — 僅供 `scripts/` 擷取作品集封面與影片，不參與建置

## 專案結構

```
/
├─ public/                # 靜態資源（blog/ styles/ works/ 圖片影片、fonts/、favicon）
├─ scripts/               # 一次性工具腳本（作品集錄影、AI 封面生成）
├─ src/
│  ├─ components/         # BaseHead、Header/Footer、卡片、JSON-LD 等
│  ├─ content/            # 內容來源：blog/、styles/、works/
│  ├─ content.config.ts   # 三個內容集合的 Zod schema（新增欄位要先改這裡）
│  ├─ consts.ts           # 站名、描述、GA4 ID、文章分類對照表
│  ├─ layouts/            # BlogPost、StylePost
│  ├─ pages/              # 路由
│  └─ styles/global.css   # 全站唯一樣式表
├─ .github/workflows/     # GitHub Actions 自動部署
├─ astro.config.mjs
└─ tsconfig.json
```

## 新增內容

內容由集合驅動，新增一篇文章＝新增一個符合 schema 的檔案。

- **文章**：`src/content/blog/YYYY-MM-DD-slug.md`，`category` 必須是 `src/consts.ts` 中 `CATEGORIES` 的其中一個 key
- **風格**：`src/content/styles/<slug>.mdx`，SEO 欄位（`seo_title`、`faq`、`prompt_breakdown` 等）會渲染成結構化資料
- **作品**：`src/content/works/<slug>.md`，schema 刻意嚴格 —— `brand_basis` 為 `unofficial-concept` 時 `disclaimer` 為必填，漏寫直接 build 失敗

## 工具腳本

```bash
node scripts/capture-works-media.mjs [slug] [--force]  # 錄作品集頁面 -> public/works/<slug>.webp / .mp4 / -loop.mp4
node scripts/gen-blog-covers.mjs                       # 生成文章封面 -> public/blog/，並回寫 heroImage frontmatter
node scripts/gen-style-covers.mjs                      # 生成風格封面 -> public/styles/
```

生圖腳本的金鑰讀 `OPENAI_API_KEY` / `GEMINI_API_KEY` 環境變數，或 gitignore 掉的 `.openai_key.local` / `.gemini_key.local`。

## 部署

推上 `main` 後由 `.github/workflows/deploy.yml` 自動建置並部署到 GitHub Pages，這是正常路徑。`npm run deploy` 是手動備援，會直接推 `gh-pages` 分支，與 Actions 部署可能互相覆蓋，非必要不要用。

站點是使用者根網域（`HarryFan.github.io`），`astro.config.mjs` 的 `base` 永遠是 `/`，不要改成子路徑。

## 聯絡

- GitHub: [@HarryFan](https://github.com/HarryFan)
- 網站: https://harryfan.github.io

---

由 [Harry Fan](https://github.com/HarryFan) 建立與維護
