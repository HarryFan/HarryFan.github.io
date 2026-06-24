---
title: '【實戰筆記】Vue SPA 下正確實作 GA4／Ads 追蹤'
description: '業主問：為什麼 Google Ads 有點擊，GA 卻看不到，跳出率還 100%？問題出在 SPA 與 GA4 的相容性。分享一套模組化、支援 GA4 + Google Ads 的追蹤架構。'
pubDate: 2025-05-13
heroImage: '/blog/2025-05-13-vue-spa-ga4-ads-tracking.webp'
---

## 前言：為什麼這篇筆記值得一看？

這份筆記的起點，來自業主的一個真實疑問：

> 「為什麼我們 Google Ads 的點擊數明明有記錄，但 Google Analytics 裡卻完全看不到？而且網站顯示使用者停留了幾分鐘，卻還是跳出率 100%？」

分析之後發現，問題出在 **SPA（Single Page Application）架構與 GA4 追蹤的相容性**。SPA 不會在每次頁面切換時重新載入，導致：

- Analytics 無法準確記錄 pageview
- 使用者實際有互動，但 GA 卻誤判為「無互動跳出」
- 看到的數據像是廣告效益不佳、跳出率 100%、轉換缺失，其實都是**技術設定問題**，不是營運做錯了什麼

## 為什麼需要特別處理 SPA？

SPA 頁面切換不會重新載入整個頁面，這會導致兩個嚴重問題：

1. **頁面追蹤失效**：GA4 預設只在「整頁載入」時發送 `page_view`，SPA 不 reload 就被略過
2. **跳出率計算異常**：只有第一個頁面被記錄，後續瀏覽都不算，導致跳出率極高、不準

## 解決方案：GA4 + Google Ads 模組化追蹤架構

支援以下功能：自動頁面追蹤、事件追蹤、轉換追蹤（Google Ads）、跳出率優化、dev/prod 環境切換。

### 路由追蹤整合

```javascript
// router/index.js
import { trackPageView } from '@/utils/analytics'

router.afterEach((to) => {
  trackPageView(to.path, to.meta.title)
})
```

### 在元件中使用事件追蹤

```javascript
import { trackEvent, trackConversion } from '@/utils/analytics'

const handleSubmit = async () => {
  await trackEvent('form_submit', {
    form_name: 'contact',
    form_type: 'inquiry'
  })

  await trackConversion('contact_form', {
    value: 100,
    currency: 'TWD'
  })
}
```

## 技術重點整理

| 功能 | 實作重點 | 效果 |
| --- | --- | --- |
| 動態載入 | 僅在 `PROD` 環境載入 GA 腳本 | 避免開發環境汙染數據 |
| 自動頁面追蹤 | `router.afterEach` | 確保每頁都觸發 pageview |
| 跳出率優化 | 首次互動（點擊）即追蹤事件 | 判斷使用者是否真的有互動 |
| 轉換追蹤 | Ads 整合 + `conversion` 事件 | 完整支援廣告效益衡量 |

## 實戰建議

### 環境變數管理 `.env.production`

```plain
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ADS_ID=AW-XXXXXXXXXX
```

### 優先追蹤的事件

頁面瀏覽（pageview）、表單提交（form_submit）、CTA 點擊（button_click）、成交轉換（conversion）。

### 除錯技巧

- 使用 Chrome GA Debugger 擴充套件
- 查看 Network → `collect` 發送情況
- 開啟 GA4 DebugView 即時追蹤效果

## 結語

這套架構解決了 SPA 無法正確追蹤頁面的問題，追蹤模組高度模組化、方便維護，同時支援 GA4 + Google Ads，並能精準衡量跳出率與使用者行為。

### 延伸閱讀

- [GA4 官方文件](https://developers.google.com/analytics/devguides/collection/ga4)
- [Vue Router 官方文件](https://router.vuejs.org/)
- [Google Ads 轉換追蹤指南](https://support.google.com/google-ads/answer/6095821)
