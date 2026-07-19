---
title: AirPods Pro 概念頁
subtitle: 聲音，從此有了深度
description: 零 3D 檔案，用幾何基元拼出一支會隨滾動旋轉的耳機，重現旗艦產品頁的鏡頭語言。
origin: self-directed
brand_basis: unofficial-concept
disclaimer: 非官方概念作品，與 Apple Inc. 無關。所有內容為個人技術練習。
year: 2026
pubDate: 2026-07-11
cover: /works/apple-hero.webp
video: /works/apple-hero.mp4
video_loop: /works/apple-hero-loop.mp4
demo: https://apple-hero-cyan.vercel.app
repo_private: true
blog_post: 2026-07-11-threejs-airpods-pro-flagship-3d
tech: ['Three.js 0.160 (ESM)', 'GSAP', 'ScrollTrigger', 'Lenis']
category: product
role: 獨立完成 3D 場景、滾動時間軸與全部前端實作，並寫成一篇技術拆解文。
challenge: 旗艦產品頁的難點在鏡頭 — 滾動與相機運動要像被同一隻手推動，不能是「捲到某處就跳一下」。另外中文排版在這種大字級標題下會出現斷行錯位。
outcome: 耳機由幾何基元組合而成，無任何外部 3D 資產。滾動經 Lenis 平滑化後餵給 ScrollTrigger 驅動相機時間軸。過程寫成技術文，含 v1 與 v2 的設計檢討。
seo_title: AirPods Pro 概念頁 Three.js 實作 | Harry Fan 作品集
seo_description: 用幾何基元拼出的 AirPods Pro 概念頁，Three.js 0.160 + GSAP ScrollTrigger + Lenis 驅動滾動鏡頭。非官方概念作品。
---

## 為什麼做這個

Apple 的產品頁是滾動敘事的標竿。我想知道**在不下載任何 3D 模型的前提下，這種鏡頭語言能還原到什麼程度**。

## 技術重點

- **幾何基元組裝**：耳機不是模型，是一堆 `Capsule`、`Sphere`、`Cylinder` 拼出來的。
- **滾動三層**：Lenis 平滑化原始滾動 → ScrollTrigger 換算進度 → 相機時間軸。少了 Lenis，相機會跟著滑鼠滾輪一格一格跳。
- **CJK 斷行**：大字級中文標題的斷行錯位，是這個專案花最多時間 debug 的地方，跟 3D 完全無關。

技術拆解全文見 [零 3D 檔案，用幾何基元拼一支會滾動的 AirPods Pro 旗艦頁](/blog/2026-07-11-threejs-airpods-pro-flagship-3d/)。
