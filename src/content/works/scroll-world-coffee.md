---
title: Meridian Roasters 咖啡莊園飛行
subtitle: 滾動驅動的影片鏡頭飛行引擎
description: 從山坡莊園一路飛到吧檯的一杯咖啡。滾動不再翻頁，而是推著鏡頭穿越五段實拍場景 — 零依賴的 vanilla JS 影片 scrub 引擎。
origin: self-directed
brand_basis: fictional
year: 2026
pubDate: 2026-07-13
cover: /works/scroll-world-coffee.webp
repo_private: true
blog_post: 2026-07-13-scroll-world-video-scrub
tech: ['Vanilla JS（零依賴）', 'Video scrub', 'IntersectionObserver', 'rVFC 逐幀同步']
category: interactive
role: 虛構品牌敘事、五段場景腳本、scrub 引擎與全部前端實作，並整理成可攜的 scroll-world skill。
challenge: 影片 scrub 的天敵是 seek 延遲 — 滾動一快，currentTime 追不上就會卡成幻燈片。再加上手機解碼能力參差，同一份體驗要在桌機與手機都順。
outcome: 引擎做成 framework-agnostic 的單檔模組，自己長 DOM、自己注入 namespaced CSS，掛進任何容器就能跑。每段場景備妥桌機／手機雙版本影片，並支援 linger 曲線讓鏡頭在文案高峰處放慢。
seo_title: Meridian Roasters 滾動鏡頭飛行 | Harry Fan 作品集
seo_description: 零依賴 vanilla JS 的滾動影片 scrub 引擎，從咖啡莊園飛到吧檯的五段鏡頭敘事，桌機手機雙版本影片。
---

## 為什麼做這個

產品頁的滾動大多是「捲到某處就播動畫」。我想試更貪心的版本：**讓滾動直接推著鏡頭飛**，訪客控制的是時間軸，不是頁面。

咖啡剛好有一條天然的敘事線 — 莊園 → 水洗日曬 → 烘焙 → 沖煮 → 入杯。五段場景，五支實拍空拍片，滾動把它們縫成一趟連續飛行。

## 技術重點

- **Scrub 而非播放**：影片 `currentTime` 綁定滾動進度，訪客往回捲，鏡頭就倒飛。
- **零依賴引擎**：`mountScrollWorld(container, config)` 一個呼叫掛載，不吃任何框架，也提供 connector 片段銜接場景。
- **linger 曲線**：非線性時間重映射，讓鏡頭在每段文案的高峰處停留久一點、邊緣走快一點。
- **手機雙版本**：每段場景各備 `-m.mp4` 輕量版，行動裝置不用硬吃桌機碼流。

線上示範：[/demos/scroll-world-coffee/](/demos/scroll-world-coffee/index.html)（附[製作指南](/demos/scroll-world-coffee/guide/index.html)）。技術拆解全文見下方連結。
