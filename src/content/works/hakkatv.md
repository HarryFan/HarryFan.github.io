---
title: 客家電視台首頁重製
subtitle: 公共頻道影音平台概念設計
description: 把一個 Figma Make 匯出的原型，重寫成有主張的編輯風影音首頁。這批作品裡唯一的框架實作。
origin: self-directed
brand_basis: unofficial-concept
disclaimer: 非官方概念重製，與客家電視台無關。內容與圖片皆為示意，僅供設計與前端技術展示。
year: 2026
pubDate: 2026-07-03
cover: /works/hakkatv.webp
video: /works/hakkatv.mp4
video_loop: /works/hakkatv-loop.mp4
repo_private: true
tech: ['React 18', 'Vite 6', 'Tailwind v4', 'TypeScript', 'Vitest']
category: product
role: 從 Figma Make 匯出的原型接手，重新定義視覺方向、重寫元件架構、建立無障礙與測試基礎。
challenge: 公共頻道的網站有個典型陷阱：要嘛做成政府機關的公告欄，要嘛把 Netflix 的皮換個顏色貼上去。兩條路都不對 —— 前者沒人想看，後者跟內容的文化重量不搭。要找出第三條路。
outcome: 深色編輯風首頁，用襯線字與大留白處理文化題材，而非串流平台的卡片牆。元件全部重寫，導入 ESLint flat config、jsx-a11y、Vitest 與 Testing Library，並有 skip link 與 noscript fallback。
seo_title: 客家電視台首頁重製（非官方概念作品）| Harry Fan 作品集
seo_description: 公共頻道影音平台的非官方概念重製，React 18 + Vite 6 + Tailwind v4，深色編輯風而非串流卡片牆。
---

## 為什麼做這個

這是這批作品裡**唯一不是 Three.js 的**，放進來是刻意的：3D 產品頁證明的是一種能力，把一個有文化重量的公共頻道首頁做對，證明的是另一種。

起點是一個 **Figma Make 匯出的原型** —— Vite + React + Tailwind + shadcn/ui 全量傾倒，能跑但沒有主張。我接手後重新定義視覺方向、重寫元件、補上測試與無障礙基礎。

## 設計上的取捨

公共頻道網站有兩個現成的錯誤答案：

1. **政府機關公告欄**：資訊正確，沒人想看第二眼。
2. **Netflix 換色**：卡片牆很好用，但它是為了「快速掃過大量商品」設計的，跟客家文化的內容重量互斥。

我選的是編輯風：襯線字、大留白、深色底、用排版的層次而不是卡片的數量來組織內容。

## 技術重點

- **元件重寫**：從 shadcn/ui 全量傾倒收斂成 7 個實際用到的元件。
- **測試與無障礙**：ESLint flat config + jsx-a11y、Vitest + Testing Library、skip link、noscript fallback。
- **Tailwind v4**：用新的 CSS-first 設定，不再是 `tailwind.config.js`。

## 誠實揭露

- 這**不是**客家電視台的官方網站，也不是接案成果，與該台無任何關係。
- 站上所有節目縮圖是 Unsplash 圖庫照，不是該台的實際節目畫面。
- 頁尾「合作夥伴」名單為版型示意，與列出的機構皆無合作關係。
- 頁面本身也帶有同樣的非官方聲明。
