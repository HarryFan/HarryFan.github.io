---
title: '為什麼我們團隊開始用 Repomix：把「AI 沒看過我們的 code」這件事一次解決'
description: '新開一個 AI 對話，它就是不認識你的專案——這是團隊用 AI 修 bug 最大的幻覺來源。這篇記錄我們前端團隊怎麼用 Repomix 把模組程式碼打包成單一上下文檔，搭配 .cursor/rules 形成固定工作流：每模組一份設定、@ 一下就把整個模組餵給 AI，還附上我們實際的 bug 報告模板。'
pubDate: 2026-07-20
heroImage: '/blog/2026-07-20-repomix-team-ai-context.png'
category: 'ai'
tags: ['Repomix', 'Cursor', 'AI 工作流', '前端筆記', '團隊協作']
---

我們團隊維護兩個中大型電商管理後台（Vue 3 + Vite + TypeScript + ant-design-vue），最近把 [Repomix](https://github.com/yamadashy/repomix) 正式納入團隊工作流。這篇記錄為什麼要用、怎麼用，以及我們實際落地的設定方式。

## 問題：新對話的 AI 不認識你的專案

用 Cursor 或 Claude 修 bug 的人都遇過這個循環：

1. 開新對話描述 bug
2. AI 開始「猜」你的專案結構——猜錯的 import 路徑、不存在的工具函式、跟鄰近頁面完全不同的寫法
3. 你花半小時把相關檔案一個一個貼進去
4. 下次開新對話，重來一遍

根因很單純：**新對話沒有舊聊天紀錄，AI 的上下文是空的**。幻覺不是模型笨，是它真的沒看過你的 code。

![每次開新對話，AI 的上下文都是空的，只能一張張貼檔案、每次歸零](/blog/2026-07-20-repomix-team-ai-context/01-empty-context.webp)

我們試過幾種解法。整包 repo 貼上去，token 直接爆掉。讓 AI 自己翻檔案，翻得慢，還常漏掉關聯檔。口頭描述架構？描述本身就會漏。最後收斂到 Repomix。

## Repomix 是什麼

一句話：把整個 repo（或指定子集）打包成單一份 AI-friendly 的檔案（XML / Markdown / 純文字），專門設計來餵 LLM。

幾個對團隊使用很關鍵的特性：

- 自動遵守 `.gitignore`，不會把 `node_modules`、build 產物打進去
- 可用 glob 精準框範圍，也支援設定檔
- 產出附目錄結構，AI 拿到的不只是程式碼，還有「這個模組長什麼樣」
- 附 token 統計，貼之前就知道會不會爆上下文
- 內建 [Secretlint](https://github.com/secretlint/secretlint) 安全掃描，防止 API key、憑證被打包進去

![Repomix 像一個漏斗，把整個模組的檔案打包成單一檔案](/blog/2026-07-20-repomix-team-ai-context/02-pack-into-one.webp)

## 基本用法

不用安裝，`npx` 直接跑：

```bash
# 當前目錄整包 → repomix-output.xml
npx repomix@latest

# 只打包某個模組（可多個 glob，逗號分隔）
npx repomix@latest --include "src/views/orderManage/**,src/api/order/**"

# 額外排除測試檔
npx repomix@latest --include "src/views/orderManage/**" --ignore "**/*.spec.ts"

# 產出改用 Markdown（預設 xml）
npx repomix@latest --style markdown

# 用設定檔
npx repomix@latest -c repomix/repomix.config.order.json
```

跑完會印出檔案數、總 token 數、疑似敏感資訊警告。先看 token 數，再決定要不要縮範圍。

## 設定檔逐欄位解說

以訂單模組為例，一份我們實際在用的 `repomix.config.order.json`：

```jsonc
{
  // 打包範圍：頁面 + API 層 + 模組共用元件——bug 常跨這三層
  "include": [
    "src/views/orderManage/**",
    "src/api/order/**",
    "src/components/order/**"
  ],

  "ignore": {
    // 續用 .gitignore 的排除規則（預設 true，保持就好）
    "useGitignore": true,
    // 額外排除：測試、mock、快照
    "customPatterns": ["**/*.spec.ts", "**/__mocks__/**", "**/*.snap"]
  },

  "output": {
    // 產出路徑：集中放 repomix/，好加 .gitignore、@ 引用也好記
    "filePath": "repomix/repomix-output-order.xml",
    // xml | markdown | plain。XML 給 LLM 解析最穩，我們統一用 xml
    "style": "xml",
    // 附目錄樹，AI 先看結構再看 code
    "directoryStructure": true,
    // 移除註解/空行可以省 token；我們選擇保留——註解常是業務規則所在
    "removeComments": false,
    "removeEmptyLines": false,
    // 每個檔案附行號，AI 回報位置更準
    "showLineNumbers": true
  },

  "security": {
    // Secretlint 掃描，防 key/token 進打包檔（預設開，別關）
    "enableSecurityCheck": true
  },

  "tokenCount": {
    // token 估算用的 tokenizer
    "encoding": "o200k_base"
  }
}
```

幾個踩過的點：

- **`include` 記得把 API 層框進來**。只打包 view，AI 就會開始幻想 API 函式簽名。
- **`removeComments` 別急著開**。省下的 token 不多，但註解裡的業務規則（「後端這個欄位可能回字串」）正是 AI 最需要的。
- **產出集中放一個目錄**。`.gitignore` 一行解決，同事 `@` 引用時路徑也統一。

## 我們的落地方式：每模組一份設定

整包打出來還是太大，而且修訂單的 bug 根本不需要金流模組的 code。所以我們按業務模組拆設定：

```
repomix/
├── repomix.config.json               # 整站（少用）
├── repomix.config.order.json         # 訂單模組
├── repomix.config.product.json       # 商品模組
├── repomix.config.statistics.json    # 報表模組
├── repomix.config.permissionManage.json
└── repomix-output-*.xml              # 產出（.gitignore 排除）
```

![整包打出來太大推不動，按業務模組拆成每模組一箱](/blog/2026-07-20-repomix-team-ai-context/03-one-box-per-module.webp)

每份設定除了模組頁面，還會把對應的 `src/api/`、共用元件一起框進來，因為 bug 常常跨這三層。

產出的 `repomix-output-*.xml` 是 build 產物，進 `.gitignore` 不進版控（我們為這個往返過一輪：一開始有人把 92,000 行的 xml commit 上去了）。要用之前跑一次指令重新產，保證上下文是最新的。

## 搭配 .cursor/rules：兩支柱工作流

Repomix 解決「AI 沒看過 code」，但還有另一半問題：AI 不知道我們的規矩。commit 格式、i18n 三語系、空值顯示 `--`、權限要用 `hasPermission`，這些放在 `.cursor/rules/`（含一份 33 點的 Review 檢查清單，`alwaysApply: true`），Cursor 每次對話自動遵守。

![新對話由兩支柱撐起：程式碼（Repomix）與規矩（.cursor/rules）](/blog/2026-07-20-repomix-team-ai-context/04-two-pillars.webp)

所以現在團隊開新對話修 bug 的固定流程是：

1. 開場說清楚範圍：類型（修 bug／做需求）、位置（哪個模組）、期望（怎樣算完成）、附檔（截圖、錯誤訊息、重現步驟）
2. 掛上對應的 Repomix（必要）：`@repomix/repomix-output-order.xml`
3. 規範不用講，`.cursor/rules` 自動生效

實際的 bug 報告長這樣（同事的真實範例，去識別化後）：

```
【Bug】訂單批次出貨彈窗：搜尋訂單後勾選狀態會跑掉。
步驟：打開批次出貨 → 搜尋訂單編號 → 勾選 → 再搜尋一次。
期望：已勾選的訂單應保留。

@repomix/repomix-output-order.xml
@src/views/orderManage/components/BatchShipping.vue

請先讀相關邏輯再改，改完說明驗證方式。
```

五個要素：【Bug】標題、重現步驟、期望行為、`@` 上下文，加上最後那句「先讀再改，改完說明驗證方式」。那句特別重要，它強迫 AI 先讀 Repomix 裡的既有邏輯，而不是憑印象直接寫；改完要能說出驗證方式，也就過濾掉「看起來能動」的改法。

## 用了兩週的體感

- 幻覺明顯變少。AI 引用的函式、路徑、寫法都是模組裡真實存在的，因為它真的讀過整個模組
- 對齊既有寫法。以前 AI 愛自創模式，現在它看得到鄰近頁面怎麼寫，會跟著寫
- 新人友善。bug 報告模板 + 固定流程，資淺同事也能發出高品質的 AI 任務
- 成本是要記得重新打包：xml 不進版控，改完 code 要跑一次指令。這是刻意的取捨，寧可多打一行指令，也不要拿舊上下文餵 AI

如果你的團隊也在用 Cursor / Claude 協作中大型專案，Repomix + rules 這套組合的導入成本非常低（一個下午），但把「每次都要重新解釋專案」這個最大的摩擦直接拿掉了。

工具連結：[github.com/yamadashy/repomix](https://github.com/yamadashy/repomix)
