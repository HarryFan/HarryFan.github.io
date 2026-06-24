---
title: '把專案靜態圖片搬到 Cloudflare R2'
description: '圖片塞在 src/assets，每次 deploy 都要連著幾 MB 的圖一起打包上傳——明明圖片根本沒動。選 R2 的理由只有一個：出口流量免費，CDN 還是內建的。'
pubDate: 2026-05-28
heroImage: '/blog/2026-05-28-static-images-to-cloudflare-r2.webp'
---

最近把專案的靜態圖片搬到 Cloudflare R2，順手寫了一篇。

## 起因

圖片塞在 `src/assets/`，每次 deploy 都要連著幾 MB 的圖一起打包上傳——明明圖片根本沒動。

選 R2 的理由只有一個：**出口流量免費**。S3 每次把圖片送給用戶都要計費，R2 不收，CDN 還是內建的。

## 改完之後

- `dist` 大幅縮水
- CI deploy 速度變快
- 換圖不用重新 deploy

我抽了一個小工具函式統一處理 CDN URL：有設 base 就走 CDN，沒設就 fallback 本地，開發環境照常跑。

## 缺點也要講

當然也有缺點：

- 圖片沒有版本控制
- 多一個服務要管
- 環境變數要記得同步

整體來說，對「圖片多、又不常變動」的專案，搬到 R2 很值得。
