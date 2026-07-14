---
title: NICE KICKS — VOLT RUNNER
subtitle: 限量球鞋發售頁
description: 純屬虛構的球鞋品牌限量發售頁。程序化 3D 鞋體、配色即時切換、候補名單流程，附 Playwright E2E。
origin: self-directed
brand_basis: fictional
year: 2026
pubDate: 2026-07-03
cover: /works/nice-nike.webp
video: /works/nice-nike.mp4
video_loop: /works/nice-nike-loop.mp4
repo_private: true
tech: ['Three.js 0.160 (ESM)', 'Vanilla JS', 'Playwright']
category: product
role: 虛構品牌設定、限量發售的轉換流程設計、3D 鞋體、以及完整的 E2E 測試。
challenge: 限量發售頁賣的不是鞋，是急迫感。要在不用一張產品照的前提下（鞋子全是幾何體長出來的），把「排隊 2847 人、名額 300」這種壓力做出來，同時不能讓它變成廉價的促銷頁。
outcome: 零圖片資產，鞋體完全由 Three.js 幾何生成（測試斷言 meshCount > 40）。配色即時切換、候補名單 modal 與號碼牌狀態皆有 Playwright E2E 覆蓋，含 10 張驗證截圖。頁尾明寫「純屬虛構品牌」。
seo_title: NICE KICKS VOLT RUNNER 限量球鞋發售頁 | Harry Fan 作品集
seo_description: 虛構球鞋品牌的限量發售頁，Three.js 程序化鞋體、配色即時切換、候補名單流程，附 Playwright E2E 測試。
---

## 為什麼做這個

限量發售頁賣的不是鞋，是**急迫感**。「已有 2,847 人排隊 · 名額 300」這行字才是產品。

想試試在零圖片資產的限制下能不能做出來 — 鞋子是 Three.js 幾何體長的，不是照片。

品牌從一開始就設定為虛構，頁尾直接寫「NICE KICKS™ · 純屬虛構品牌」。這不是事後補的免責聲明，是設計的一部分。

## 技術重點

- **程序化鞋體**：零圖片資產，測試斷言場景組出超過 40 個 mesh。
- **配色即時切換**：不重建場景。
- **完整 E2E**：這是這批作品裡唯一有真 Playwright 測試的 — 啟本機伺服器、驗 3D 場景組裝、驅動配色切換、候補 modal、號碼牌狀態、手機視窗，附 10 張截圖存證。
- **無 Nike IP**：品牌是 NICE KICKS，不是 Nike。無 Swoosh、無標語、無真實品牌素材。repo 名稱只是本機資料夾名。
