---
title: '為什麼我們團隊開始用 Repomix：把「AI 沒看過我們的 code」這件事一次解決'
description: '新開一個 AI 對話，它就是不認識你的專案，這是團隊用 AI 修 bug 最大的幻覺來源。這篇記錄我們前端團隊怎麼用 Repomix 把模組程式碼打包成單一上下文檔，搭配 .cursor/rules 形成固定工作流：一支腳本按頁面自動打包、@ 一下就把整個模組餵給 AI，還附上我們實際的 bug 報告模板。'
pubDate: 2026-07-20
heroImage: '/blog/2026-07-20-repomix-team-ai-context.png'
category: 'ai'
tags: ['Repomix', 'Cursor', 'AI 工作流', '前端筆記', '團隊協作']
---

我們團隊維護兩個中大型電商管理後台（Vue 3 + Vite + TypeScript + ant-design-vue），最近把 [Repomix](https://github.com/yamadashy/repomix) 正式納入團隊工作流。這篇記錄為什麼要用、怎麼用，以及我們實際落地的設定方式。

## 問題：新對話的 AI 不認識你的專案

用 Cursor 或 Claude 修 bug 的人都遇過這個循環：

1. 開新對話描述 bug
2. AI 開始「猜」你的專案結構：猜錯的 import 路徑、不存在的工具函式、跟鄰近頁面完全不同的寫法
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
npx repomix@latest -c repomix/repomix.config.json
```

跑完會印出檔案數、總 token 數、疑似敏感資訊警告。先看 token 數，再決定要不要縮範圍。

## 設定檔逐欄位解說

一份我們實際在用的整站設定 `repomix/repomix.config.json`：

```jsonc
{
  "$schema": "https://repomix.com/schemas/latest/schema.json",

  "output": {
    // 產出路徑：集中放 repomix/，好加 .gitignore、@ 引用也好記
    "filePath": "repomix/repomix-output.xml",
    // xml | markdown | plain。XML 給 LLM 解析最穩，我們統一用 xml
    "style": "xml",
    // 附檔案摘要與目錄樹，AI 先看結構再看 code
    "fileSummary": true,
    "directoryStructure": true,
    "files": true,
    // 移除註解/空行可以省 token；我們選擇保留——註解常是業務規則所在
    "removeComments": false,
    "removeEmptyLines": false,
    // tree-sitter 壓縮。Vue 專案開了反而變大，後面「進階」會講
    "compress": false,
    // 摘要列出最大的 10 個檔案，先抓出 token 大戶
    "topFilesLength": 10,
    // 截斷內嵌 base64（圖片、字型），這種東西 AI 讀不懂還超佔 token
    "truncateBase64": true
  },

  // 打包範圍：原始碼 + 型別 + 規則檔 + 依賴清單
  "include": [
    "src/**/*.{vue,ts,tsx,js,jsx}",
    "types/**/*.d.ts",
    ".cursor/rules/**/*.mdc",   // 規矩一起進包，跨 IDE 也吃得到
    "package.json",             // 讓 AI 知道有哪些依賴、什麼版本
    "README.zh-CN.md"
  ],

  "ignore": {
    // 續用 .gitignore 的排除規則（預設 true，保持就好）
    "useGitignore": true,
    "useDefaultPatterns": true,
    // 額外排除：跟邏輯無關、量又大的目錄
    "customPatterns": [
      "src/locales/**",   // 多語系字典，幾千行 key-value
      "src/assets/**",    // 靜態資源
      "mock/**",
      "docs/**",
      "repomix/**",       // 別把上一次的產出又打進下一包
      ".env",
      ".env.*"            // 環境變數絕不進包
    ]
  },

  "security": {
    // Secretlint 掃描，防 key/token 進打包檔（預設開，別關）
    "enableSecurityCheck": true
  }
}
```

幾個踩過的點：

- **框範圍時記得把 API 層帶上**。只打包 view，AI 就會開始幻想 API 函式簽名。
- **`removeComments` 別急著開**。省下的 token 不多，但註解裡的業務規則（「後端這個欄位可能回字串」）正是 AI 最需要的。
- **產出集中放一個目錄，並把它自己 ignore 掉**。`.gitignore` 一行解決，同事 `@` 引用時路徑也統一；`customPatterns` 記得排除 `repomix/**`，不然上次的 xml 會被打進這次的包裡，大小直接翻倍。
- **`truncateBase64` 開起來**。內嵌圖片的 base64 對 AI 是純噪音。

## 我們的落地方式：一支打包腳本，按頁面自動切

整包打出來還是太大，而且修訂單的 bug 根本不需要金流模組的 code。一開始我們是按業務模組手寫多份設定檔（`repomix.config.order.json`、`repomix.config.product.json`……），後來設定檔越長越多、每加一個頁面就得維護一份，乾脆收斂成一支打包腳本 `scripts/repomix-builder.mjs`：掃 `src/views` 的目錄結構，自動幫每個「模組／頁面」產一包，不用再手寫設定。掛進 `package.json` 之後只剩三個指令：

```bash
# 只打包指定檔案/資料夾（日常最常用，需要時自己產）
pnpm run pack src/views/orderManage/orderList

# 全站打包：掃 src/views 每個頁面 + api，各自成包
pnpm run pack:all

# 監聽 src/views、src/api，存檔自動重打對應那一包
pnpm run pack:watch
```

![整包打出來太大推不動，按業務模組拆成每模組一箱](/blog/2026-07-20-repomix-team-ai-context/03-one-box-per-module.webp)

產出鏡射 `src/views` 的目錄結構，路徑好記、`@` 起來直覺：

```
repomix/
├── api.xml                  # 全域 API 獨立一包（需要才掛）
├── orderManage/
│   ├── orderList.xml        # 一頁一包
│   └── orderSearch.xml
├── productManage/
│   └── ...
└── ...                      # 全部 .gitignore 排除
```

腳本裡藏了幾個取捨：

- **頁面包自動夾帶模組層的 `components/`、`hooks/` 等共用目錄**——bug 常常跨頁面與共用元件
- **每包都附上 `.cursor/rules/**/*.mdc`**——Cursor 以外的工具（網頁版 Claude、Copilot）拿到快照時，規矩也一起進上下文
- **`pnpm run pack <路徑>` 會順便夾帶全域 API 與規則檔**——丟給網頁版 AI 時一包就夠

產出的 xml 是 build 產物，進 `.gitignore` 不進版控（我們為這個往返過一輪：一開始有人把 92,000 行的 xml commit 上去了）。要用之前跑一次指令重新產——或者開著 `pack:watch` 讓它自己保持最新。

## 搭配 .cursor/rules：兩支柱工作流

Repomix 解決「AI 沒看過 code」，但還有另一半問題：AI 不知道我們的規矩。commit 格式、i18n 三語系、空值顯示 `--`、權限要用 `hasPermission`，這些放在 `.cursor/rules/`（含一份 33 點的 Review 檢查清單，`alwaysApply: true`），Cursor 每次對話自動遵守。

![新對話由兩支柱撐起：程式碼（Repomix）與規矩（.cursor/rules）](/blog/2026-07-20-repomix-team-ai-context/04-two-pillars.webp)

所以現在團隊開新對話修 bug 的固定流程是：

1. 開場說清楚範圍：類型（修 bug／做需求）、位置（哪個模組）、期望（怎樣算完成）、附檔（截圖、錯誤訊息、重現步驟）
2. 掛上上下文：本機 IDE **優先直接 `@src/...`**（IDE 讀的是硬碟上最新的檔案，沒有過期問題）；整頁不熟、或用網頁版 AI，才掛剛 pack 的 `@repomix/orderManage/orderList.xml`
3. 規範不用講，`.cursor/rules` 自動生效

實際的 bug 報告長這樣（同事的真實範例，去識別化後）：

```
【Bug】訂單批次出貨彈窗：搜尋訂單後勾選狀態會跑掉。
步驟：打開批次出貨 → 搜尋訂單編號 → 勾選 → 再搜尋一次。
期望：已勾選的訂單應保留。

@repomix/orderManage/orderList.xml
@src/views/orderManage/components/BatchShipping.vue

請先讀相關邏輯再改，改完說明驗證方式。
```

五個要素：【Bug】標題、重現步驟、期望行為、`@` 上下文，加上最後那句「先讀再改，改完說明驗證方式」。那句特別重要，它強迫 AI 先讀 Repomix 裡的既有邏輯，而不是憑印象直接寫；改完要能說出驗證方式，也就過濾掉「看起來能動」的改法。

## 不只 Cursor：同一套規則跨 IDE 通用

`.cursor/rules` 的自動載入是 Cursor 專屬的，但團隊不會人人都用 Cursor。有人用 VS Code + Cline/Roo Code，有人用 Copilot Chat，複雜重構時甚至有人開網頁版 Claude。規則檔跟 Repomix 快照都是純文字檔，**每個工具都讀得到，差別只在「怎麼把它塞進上下文」**。所以我們補了一份跨 IDE 協作手冊，核心流程不變，只列各工具的載入方式：

- **Cursor**：`.cursor/rules/*.mdc` 自動載入；本機開發優先 `@src/...`，需要整頁地圖才 `@repomix/<模組>/<頁面>.xml`
- **VS Code + Cline / Roo Code**：在專案根目錄放一份 `.clinerules`，內容寫「開始任務前先讀 `.cursor/rules/` 下所有 mdc 規範；程式真相以 src 為準、過期 repomix 勿當邏輯依據」；沒設定就在首輪 prompt 手動 `@.cursor/rules/core-principles.mdc` + 對應 src 檔
- **Copilot Chat**：無法自動載入，用 `#file:` 指令手動附規則檔與原始碼，例如 `#file:.cursor/rules/core-principles.mdc #file:src/views/orderManage/orderList/index.vue`
- **網頁版 Claude / ChatGPT**：本機硬碟連不到，這才是 Repomix 快照的主場——把 `core-principles.mdc` 與**剛打包**的 `repomix/<模組>/<頁面>.xml` 當附件上傳，再輸入需求並註明「以 src 為準」

手冊裡我們把上下文優先級寫死成三條，比工具差異更重要：

1. **`src/` 永遠是真相**——已知檔案直接引用原始碼
2. **Repomix xml 是快照**——僅在剛 pack 後、需要整頁地圖或餵網頁版 AI 時使用
3. **過期 xml 勿掛**——比沒掛更糟；與 `src` 衝突時以 `src` 為準

不管哪個工具，後面兩步都一樣：**交付前對照 Review 清單自檢、大改後重跑 Repomix 更新快照**（或本機開著 `pnpm run pack:watch`，存檔即自動重打，不然下一個人或下一次對話又拿到過期上下文）。

把這份手冊放進 repo（我們放 `docs/ai-collaboration.md`）還有個附帶效果：規則檔本身變成「工具無關」的團隊資產，換 IDE、換 AI 供應商都不用重寫工作流。

## 進階：當「單頁包」也開始爆上下文

模組級拆分用了一陣子後，我們踩到下一個坎：**有些單一頁面包自己就 2 萬多行、20 萬 token，直接超過模型的 200k 上下文**。最肥的是會員列表，一開它就頂到天花板。

追下去發現根因很蠢：我們的打包腳本，把**全域 `src/api`（幾十個 API 檔、6 萬 token）灌進每一個頁面包**。也就是說，改會員列表的 bug，卻順便把訂單、金流、報表的所有 API 都塞了進來。會員列表那一包 = 頁面本身 15k 行 + 全站 API 7.6k 行，加起來爆掉。

修法是把 API 抽出來單獨打一包：

```js
// 打包腳本裡，每個頁面包原本都做這件事——這是元凶
includeList.push('src/api/**/*.{ts,js}');

// 改成：頁面包不含 API，API 另外打一包 repomix/api.xml（順手去掉 demo mock 噪音）
const API_TARGET = {
  name: 'api',
  include: ['src/api/**/*.{ts,js}'],
  ignore: ['src/api/demo/**'],
  outputPath: 'repomix/api.xml',
};
```

效果直接：會員列表從 **215k token 掉到 152k**，穩穩進 200k。改到 API 接法時，頁面包 + `@repomix/api.xml` 一起掛就好——需要才載入，而不是每包都預先塞。

過程中還撞到兩個反直覺的教訓：

**一、`--compress` 對 Vue 專案是反效果。** Repomix 有個 `--compress`，號稱用 tree-sitter 只留函式簽名、砍掉 function body，通常能省 7 成。我興沖沖開下去，結果那一包從 1.4MB **變大到 1.8MB**。原因：Vue 的 SFC 主體是 `<template>` 跟 `<style>`，tree-sitter 只壓得動 `<script>` 裡的 JS，模板樣式原封不動，還多加了一堆分隔符。對 template-heavy 的前端專案，compress 是負優化。實測比想像重要。

**二、空目錄會產出「空包」。** 腳本掃 `src/views` 每個子目錄打包，但有些是空目錄（改到一半的殘留、打錯字的資料夾），照樣產出一個只有標頭、沒內容的 348 行空 xml。加一道守衛，打包前先確認目錄底下真的有 `.vue/.ts` 原始檔，沒有就跳過：

```js
const hasSource = dir => {
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    for (const e of fs.readdirSync(cur, { withFileTypes: true })) {
      if (e.isDirectory()) stack.push(path.join(cur, e.name));
      else if (/\.(vue|ts|tsx|js|jsx)$/.test(e.name)) return true;
    }
  }
  return false;
};
```

一句話總結這輪優化：**上下文不是「塞越多越好」**。全站 API 每包都帶，看似方便，實際上讓大頁面直接失去可用性。該共用的東西（API）獨立成一包、需要才掛，比無腦全帶更有用。

## 用了兩週的體感

- 幻覺明顯變少。AI 引用的函式、路徑、寫法都是模組裡真實存在的，因為它真的讀過整個模組
- 對齊既有寫法。以前 AI 愛自創模式，現在它看得到鄰近頁面怎麼寫，會跟著寫
- 新人友善。bug 報告模板 + 固定流程，資淺同事也能發出高品質的 AI 任務
- 成本是要記得重新打包：xml 不進版控，改完 code 要跑一次指令（或乾脆開著 `pack:watch` 自動重打）。這是刻意的取捨，寧可多打一行指令，也不要拿舊上下文餵 AI

如果你的團隊也在用 Cursor / Claude 協作中大型專案，Repomix + rules 這套組合的導入成本非常低（一個下午），但把「每次都要重新解釋專案」這個最大的摩擦直接拿掉了。

工具連結：[github.com/yamadashy/repomix](https://github.com/yamadashy/repomix)
