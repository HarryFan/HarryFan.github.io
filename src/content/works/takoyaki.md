---
title: 士林夜市五大名物
subtitle: 程序化 3D 滾動導覽
description: 五種夜市小吃，五個獨立的 Three.js 場景，全部用幾何體長出來，沒有一張貼圖。
origin: self-directed
brand_basis: fictional
year: 2026
pubDate: 2026-07-11
cover: /works/takoyaki.webp
video: /works/takoyaki.mp4
video_loop: /works/takoyaki-loop.mp4
repo_private: true
blog_post: 2026-07-11-threejs-night-market-flagship-3d
tech: ['Three.js (ESM)', 'RoomEnvironment', 'Selective Bloom', 'Clearcoat', 'Node (zero-dep server)']
category: collection
featured: true
role: 五個場景的 3D 建模邏輯、滾動鏡頭、以及零依賴的靜態伺服器，全部獨立完成。
challenge: 食物是最難用幾何體做的東西 — 章魚燒的焦痕、珍珠的透光、雪花冰的鬆散，都不是幾何形狀能直接表達的。要在單檔 Three.js 的限制下，只靠材質參數把「好吃」做出來。
outcome: 五個小吃各自一個獨立場景，從 r128 遷移到 ESM 版本，用 RoomEnvironment 建立環境反射、selective bloom 只讓該亮的地方亮、clearcoat 做出食物表面的油光。
subworks:
  - name: 章魚燒
    note: 主場景，柴魚片飄動與焦痕材質是重點，技術文完整拆解這一站。
  - name: 珍珠奶茶
    note: 珍珠的半透光與液體分層。
  - name: 大雞排
    note: 酥脆表面的凹凸與油光。
  - name: 芒果雪花冰
    note: 鬆散冰體的堆疊與次表面散射感。
  - name: 臭豆腐
    note: 蒸氣粒子與泡菜的色彩對比。
seo_title: 士林夜市五大名物 3D 導覽 | Harry Fan 作品集
seo_description: 五種台灣夜市小吃的程序化 Three.js 場景，零貼圖、滾動驅動鏡頭，含 RoomEnvironment 與 selective bloom。
---

## 為什麼做這個

想做一件**台灣的**東西。3D 產品頁滿街都是球鞋和手錶，沒人做鹹酥雞。

五個小吃，五個獨立場景，共用一支零依賴的 Node 靜態伺服器。

## 技術重點

- **零貼圖**：所有質感靠材質參數，不用任何 texture 檔。
- **r128 → ESM 遷移**：舊版 Three.js 的 script tag 寫法換成 importmap + ESM。
- **RoomEnvironment**：不用 HDR 檔就有環境反射。
- **Selective bloom**：只有該發光的地方發光，不是整個畫面糊成一片。

技術拆解全文見下方連結（該文聚焦章魚燒這一站）。
