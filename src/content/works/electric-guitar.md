---
title: IGNIS MK-I
subtitle: 旗艦電吉他單頁
description: 單一 HTML 檔，WebGL 立體背景加互動熱點，把一把手工電吉他的規格說成故事。
origin: self-directed
brand_basis: fictional
year: 2026
pubDate: 2026-07-09
cover: /works/electric-guitar.webp
video: /works/electric-guitar.mp4
video_loop: /works/electric-guitar-loop.mp4
repo_private: true
tech: ['Three.js r128', 'Vanilla JS', 'OpenSpec']
category: product
role: 產品定位、規格敘事、3D 背景與互動熱點，全部一人完成，並以 OpenSpec 管理變更。
challenge: 樂器的賣點是聽覺，但網頁只能給視覺。要讓「手工繞製拾音器」這種聽不到的規格，在畫面上變成可以理解、值得停留的東西。
outcome: 單檔 HTML，WebGL 背景襯托吉他本體，互動熱點讓規格從清單變成可探索的點。整個專案用 OpenSpec 做規格驅動的變更追蹤。
seo_title: IGNIS MK-I 電吉他產品頁 | Harry Fan 作品集
seo_description: 單檔 HTML 的手工電吉他旗艦頁，Three.js WebGL 背景與互動熱點，以 OpenSpec 做規格驅動開發。
---

## 為什麼做這個

樂器頁是個有趣的矛盾：**你要賣的是聲音，但你只有畫面**。

「手工繞製拾音器」「為舞台而生」這些話，寫在規格表裡沒人看。做成互動熱點，使用者自己點開，才會停留。

## 技術重點

- **單檔交付**：整個站就是一份 `index.html`。
- **WebGL 背景**：Three.js r128 做立體背景，不搶主體。
- **互動熱點**：規格不是清單，是散在吉他上的點。
- **OpenSpec**：這個專案用規格驅動的方式管理變更，`openspec/` 目錄留有完整軌跡。
