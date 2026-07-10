---
title: '技術紀錄：解決 Ant Design Vue 表格寬度問題'
description: 'Ant Design Vue 表格在視窗縮小後不會跟著縮回來，導致版面跑掉。其實只要把外層容器設 width:100% + overflow-x:auto 就解決了。'
pubDate: 2024-08-08
category: 'frontend'
heroImage: '/blog/2024-08-08-antd-vue-table-width.png'
---

## 響應式表格寬度調整

今天遇到一個前端專案的挑戰，主要是 Ant Design Vue 表格在視窗大小改變時，寬度無法自動調整。這個問題讓表格在視窗縮小後依然保持變寬後的寬度，影響了頁面的布局和使用體驗。

## 問題描述

專案中有一個表格需要隨著視窗大小變化自動調整寬度。但我發現當視窗從窄變寬後，表格寬度會跟著變寬；當視窗再從寬縮小時，表格寬度卻不會跟著縮小，導致頁面布局不協調。

## 解決方案

經過一番嘗試，找到了一個簡單有效的解法：把表格容器的寬度設成百分比。

```html
<div style="width: 100%; overflow-x: auto;">
  <a-table
    size="small"
    :dataSource="dataSource"
    :pagination="false"
    row-key="id"
    :scroll="{ x: 'max-content', y: 400 }"
    class="custom-table"
  >
    <a-table-column title="ID" dataIndex="id" key="id" />
    <a-table-column title="Name" dataIndex="name" key="name" />
    <a-table-column title="Age" dataIndex="age" key="age" />
  </a-table>
</div>
```

把表格外層容器設成 `width: 100%`，並加上 `overflow-x: auto`，確保表格內容超出容器寬度時可以橫向滾動。這樣即使視窗縮小，表格寬度也能自動調整，保持響應式布局。
