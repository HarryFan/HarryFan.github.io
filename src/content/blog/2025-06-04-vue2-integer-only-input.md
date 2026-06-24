---
title: 'Vue2 輸入元件優化實戰：讓使用者只能輸入整數'
description: '管理系統常見需求：某些欄位只能填整數。與其新寫一個元件，不如在現有 editInput.vue 加個開關。分享我的 props 開關 + 驗證 + 即時提示做法。'
pubDate: 2025-06-04
heroImage: '/blog/2025-06-04-vue2-integer-only-input.webp'
---

## 遇到的問題

最近做管理系統時，碰到一個很常見的需求：某些設定欄位只能輸入整數，不能有小數點。聽起來很簡單，但實際做下去要考慮的東西還不少。

主要是不想為了這個小功能又寫一個新元件，希望能在現有的 `editInput.vue` 上加個開關就搞定。

## 解決方案

### 1. 在元件裡加個開關

在原本的 props 加一個 `isIntegerOnly` 參數：

```javascript
props: {
  // 其他屬性...
  isIntegerOnly: {
    type: Boolean,
    default: false,
    required: false,
  },
}
```

這樣就能決定這個輸入框是「純整數模式」還是「一般模式」。

### 2. 根據模式做不同的驗證

在處理輸入和送出時，用條件判斷決定要怎麼檢查：

```javascript
changeCurrentValue() {
  if (this.isIntegerOnly) {
    // 整數模式：只允許輸入整數
  } else {
    // 一般數字的處理邏輯
  }
}
```

### 3. 給使用者友善的錯誤提示

當使用者輸入不符合規定時，立刻跳出提示：

```javascript
submit() {
  if (this.isIntegerOnly) {
    if (
      this.currentValue === '' ||
      isNaN(Number(this.currentValue)) ||
      !Number.isInteger(Number(this.currentValue)) ||
      (this.currentValue.toString().includes('.') &&
       parseFloat(this.currentValue) !== parseInt(this.currentValue, 10))
    ) {
      this.warnText = '請輸入有效的整數';
      this.warnShow = true;
      return;
    }
  }
  // 其他驗證...
}
```

### 4. 使用起來超簡單

在要用的地方，只要加個 `:isIntegerOnly="true"`：

```html
<edit-input
  :unit="scope.row.unitName"
  @submit="updateAction(scope.row, scope.$index)"
  :min="0"
  :digits="0"
  :isIntegerOnly="true"
  v-model="scope.row.minValue"
/>
```

## 為什麼這樣設計？

一開始也想過要不要另外寫一個專門處理整數的元件，但後來覺得在現有元件加開關更好：

- **省事**：不用維護兩套類似的程式碼
- **一致性**：介面和行為一樣，使用者比較不會搞混
- **好擴充**：以後要加其他限制，加個參數就行

用 `if-else` 處理不同模式，在 Vue2 裡特別好用，不用搞複雜的元件結構，效能也比較好。

## 實際效果

1. **資料品質變好**：不會再有奇怪的小數點跑進設定
2. **使用者體驗提升**：輸入錯誤馬上知道，不用等送出才發現
3. **程式碼更乾淨**：一個元件處理多種情況
4. **維護更輕鬆**：改 bug 或加功能只要改一個地方

## 心得

- **能擴充就不要重寫**：先想想能不能在現有元件加開關，通常比重寫一個省事。
- **使用者體驗很重要**：即時的錯誤提示差很多，使用者不用一直猜哪裡打錯。
- **模組化設計**：一個元件職責清楚，要改東西就很容易。

這種做法在 Vue2 + Element UI 的專案很實用。以後要加其他限制（只能輸入正數、限制位數等），用同樣方式加個參數就搞定。
