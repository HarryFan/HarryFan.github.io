---
title: '原來 Vant UI 的繁體中文是這樣設置的！告別簡體中文的困擾'
description: 'Vant UI 預設顯示簡體中文「确认」「取消」，身為台灣開發者總覺得怪。其實只要幾行 Locale 設定就能切成正體中文，還能客製化按鈕文字。'
pubDate: 2025-05-19
heroImage: '/blog/2025-05-19-vant-ui-traditional-chinese.webp'
---

## 前言：一個台灣開發者的小煩惱

第一次用 Vant UI 開發專案時，明明是個很棒的 Vue 組件庫，但一打開就看到滿滿簡體中文：「确认」、「取消」、「选择时间」。身為台灣開發者，看到這些字眼總覺得怪怪的。

經過一番搜尋和摸索，終於找到了完美的解決方案，分享給有同樣困擾的朋友。

## 安裝步驟：三分鐘搞定繁體中文

### 1. 安裝 Vant

```shell
npm install vant@latest-v4
```

### 2. 在 main.js 加入語言設定

只要在專案入口檔案加入以下程式碼，就能讓 Vant 變成正體中文：

```javascript
// 導入 Vant 的國際化組件
import { Locale } from 'vant'
// 載入繁體中文語言包
import zhTW from 'vant/es/locale/lang/zh-TW'

Locale.use('zh-TW', zhTW)
```

重新整理頁面後，原本的「确认」就會變成「確認」。

## 進階技巧：客製化按鈕文字

有時候預設文字還是太正式？可以這樣客製化：

```javascript
Locale.use('zh-TW', {
  ...zhTW, // 保留其他翻譯（不然其他地方會壞掉）
  button: {
    confirm: '我知道了',
    cancel: '算了吧',
  },
  datePicker: {
    confirm: '就決定是你了！',
    cancel: '讓我再想想...'
  }
})
```

## 疑難排解

### 為什麼有些地方還是簡體字？

1. **檢查語言包導入**：確認 `import zhTW from 'vant/es/locale/lang/zh-TW'` 寫對
2. **組件支援度**：有些較新組件可能還沒完全支援國際化
3. **瀏覽器快取**：試試 `Ctrl+F5` 強制重新整理，或用無痕模式
4. **載入順序**：確保語言設置在組件載入之前執行

### 想支援多種語言怎麼辦？

Vant 支援動態切換：

```javascript
import { Locale } from 'vant'
import zhTW from 'vant/es/locale/lang/zh-TW'
import enUS from 'vant/es/locale/lang/en-US'
import jaJP from 'vant/es/locale/lang/ja-JP'

const userLang = localStorage.getItem('userLanguage') || 'zh-TW'

switch (userLang) {
  case 'zh-TW':
    Locale.use('zh-TW', zhTW)
    break
  case 'en-US':
    Locale.use('en-US', enUS)
    break
  case 'ja-JP':
    Locale.use('ja-JP', jaJP)
    break
}
```

## 為台灣使用者優化

### 日期格式

```javascript
Locale.use('zh-TW', {
  ...zhTW,
  calendar: {
    ...zhTW.calendar,
    monthTitle: (year, month) => `${year}年${month}月`,
    rangePrompt: (maxRange) => `選擇天數不能超過 ${maxRange} 天`
  }
})
```

### 金額顯示

```javascript
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD'
  }).format(amount)
}
```

## 後記：小細節，大體驗

原本以為改語言會很複雜，沒想到 Vant 的國際化做得這麼貼心，短短幾行就解決了。當台灣使用者看到熟悉的繁體中文，那種親切感是無法言喻的。

### 延伸閱讀

- [Vant 4 國際化文檔](https://vant-contrib.gitee.io/vant/v4/#/zh-CN/locale)
- [Vue 國際化最佳實踐 vue-i18n](https://vue-i18n.intlify.dev/)
