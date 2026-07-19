---
title: 岫 XIU
subtitle: 香氣擴香石產品頁
description: 用程序化幾何長出一顆礦物擴香石，滾動驅動鏡頭穿過三種材質切換與粒子煙霧。
origin: self-directed
brand_basis: fictional
year: 2026
pubDate: 2026-07-12
cover: /works/xiu-stone.webp
video: /works/xiu-stone.mp4
video_loop: /works/xiu-stone-loop.mp4
demo: https://xiu-stone.vercel.app
repo_private: true
tech: ['Three.js r128', 'UnrealBloomPass', 'EffectComposer', 'Vanilla JS']
category: product
role: 從產品定位、視覺方向到 3D 場景與前端實作，全部一人完成。
challenge: 擴香石是低對比的霧面礦物，在 WebGL 裡最難的不是造型而是「看起來像石頭」。要在不用任何外部 3D 檔案的前提下，只靠程序化幾何加後處理，把粗糙的礦物感與擴散中的煙霧同時做出來。
outcome: 全站零 3D 資產、零建模軟體，只有一份 HTML。石體由程序化幾何生成，煙霧為粒子系統，質感靠 UnrealBloomPass 與自訂 shader 疊出，三種材質可即時切換。
seo_title: 岫 XIU 擴香石 3D 產品頁 | Harry Fan 作品集
seo_description: Three.js 程序化幾何打造的擴香石產品頁，滾動驅動鏡頭、粒子煙霧、三種材質即時切換，零 3D 資產。
---

## 為什麼做這個

想試一個問題：**不用任何建模軟體、不載入任何 `.glb`，能不能只靠程序化幾何做出有質感的實體產品頁？**

擴香石是刻意挑的難題。它沒有反光的金屬邊、沒有俐落的產品輪廓，就是一塊霧面的、低對比的石頭。這種材質在 WebGL 裡最容易做成「一坨灰色的東西」。

## 技術重點

- **程序化石體**：不載入外部模型，幾何體在執行期生成。
- **粒子煙霧**：擴散的香氣用粒子系統表現，跟隨滾動進度改變密度。
- **後處理**：`EffectComposer` + `UnrealBloomPass` 是質感的關鍵 — 沒有 bloom，石頭就是一塊死掉的灰。
- **三種材質**：即時切換，不重建場景。
