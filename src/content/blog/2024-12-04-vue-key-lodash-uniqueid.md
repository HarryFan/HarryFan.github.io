---
title: '讓列表渲染不再重複！用 Lodash 的 uniqueId 解決 Vue 的 key 衝突'
description: 'v-for 的 key 重複時，Vue 會跳 Duplicate keys detected，刪除項目後畫面還會亂動。用 Lodash 的 uniqueId 給每個元素一個真正唯一的 key 就解決了。'
pubDate: 2024-12-04
---

## 技術紀錄

今天在處理一個 Vue 專案時，遇到一個頗讓人頭大的問題。在列表渲染中，`v-for` 的 `key` 屬性出現了問題：當畫面上有多個數據動態渲染時，會出現 Vue 警告 `Duplicate keys detected`，導致某些畫面行為怪怪的，例如刪除項目後其他項目跟著亂動。

## 問題情境

畫面上有一堆動態生成的標籤 (tag)，每個標籤代表一個數字，從一個字串轉換過來，例如 `"1,2,3"` 變成三個標籤。但當我用 `:key="number"` 時，Vue 無法保證這些 key 的唯一性，因為數字本身可能重複。例如 `1,2,3,3`，會讓 key 的值產生衝突。

看起來很小的問題，實際卻很嚴重。如果 key 重複了，Vue 的虛擬 DOM 會搞不清楚哪些元素需要重新渲染，結果畫面可能完全錯亂。

## 解決方式

最簡單的解法就是給每個標籤加一個真正**唯一的 key**。這時候，Lodash 的 `uniqueId` 就派上用場了，它可以根據給定的前綴自動生成唯一 ID：

```vue
<template>
  <div>
    <a-tag
      v-for="number in numbers"
      :key="uniqueId(number)"
      class="ticket-result"
    >
      {{ number }}
    </a-tag>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { uniqueId } from 'lodash-es';

const numbers = ref(['1', '2', '3', '3']);
</script>
```

我們用 `uniqueId` 為每個數字生成一個獨特的 key，例如 `1_1`、`2_2`、`3_3`，即使數字重複，也能避免 Vue 發生 key 衝突。

## 背後的思考

一開始覺得這問題挺「無聊」的，後來發現它是 Vue 效率優化的核心邏輯之一。`key` 就像 Vue 虛擬 DOM 的「身份證」，如果 key 重複了，Vue 的「大腦」會無法辨認哪些元素應該更新、移除或保持原樣。

所以無論是這種列表渲染，還是更複雜的動態表單，保證 `key` 的唯一性都非常重要。用 `uniqueId` 這種簡單又直覺的方法，真的可以讓開發效率提升很多。
