---
title: '在 Vue 2 & Vue 3 專案中自動移除 console 訊息，提升安全性與效能'
description: '正式環境留著 console.log 會洩漏邏輯、增加檔案大小。教你用 Webpack（Vue 2）與 esbuild（Vue 3 + Vite）在 build 時自動清掉 console。'
pubDate: 2025-02-14
---

> 註記：由於目前正在開發 Vue 2 專案，本文主要針對 Vue 2 + Webpack，並透過 `vue.config.js` 設定 Webpack 打包時移除 `console.log`。若你用的是 Vue 3 + Vite，請參考文末的 esbuild 方案。

## 前言

開發 Vue 專案時，我們常用 `console.log` 來除錯，這在開發過程很重要。但在正式環境裡，這些訊息可能會：

1. **造成安全風險**：暴露 API 請求、內部邏輯、使用者資訊等。
2. **影響效能**：雖然 `console.log` 不太影響執行速度，但會增加 JavaScript 檔案大小，影響載入與解析。
3. **降低專業度**：正式環境的除錯訊息會讓產品顯得不夠完整。

因此，我們可以設定 Webpack 或 Vite，讓專案在正式環境（`production`）自動移除 `console`。

## Vue 2 + Webpack（使用 vue.config.js）

Vue CLI 預設用 Webpack 建置，可以用 `terser-webpack-plugin` 移除 `console.log`。先安裝：

```shell
npm install terser-webpack-plugin --save-dev
```

在專案根目錄的 `vue.config.js` 加入設定：

```javascript
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false,      // 不顯示警告訊息
              drop_console: true,   // 移除所有 console 相關函數
              drop_debugger: true,  // 移除 debugger 語句
              pure_funcs: ['console.log'] // 指定要移除的 console.log
            }
          }
        })
      ]
    }
  }
}
```

### 設定說明

| 設定 | 功能 |
| --- | --- |
| `drop_console: true` | 移除所有 `console.*`（含 `log`、`info`、`warn`） |
| `drop_debugger: true` | 移除 `debugger` 斷點 |
| `pure_funcs: ['console.log']` | 只移除 `console.log`，保留 `warn`、`info` |

### 適用場景

| 指令 | 效果 |
| --- | --- |
| `npm run serve` | 開發環境：不移除 `console`，方便除錯 |
| `npm run build` | 正式環境：自動移除 `console` |

### 驗證方式

在任意 Vue 元件加入測試訊息：

```javascript
export default {
  mounted() {
    console.log('這是一條測試訊息')
    console.info('這是一條資訊')
    console.warn('這是一條警告')
  }
}
```

執行 `npm run build`，到 `dist/js/` 搜尋 `console.log`，應該找不到。若 `console.warn` / `console.info` 仍在，代表 `pure_funcs` 生效，只移除了 `console.log`。

## Vue 3 + Vite（使用 esbuild）

> 注意：Vite 不使用 Webpack，而是用 esbuild。因此 `terser-webpack-plugin` 在 Vite 專案無效，應改用 esbuild。

在 `vite.config.js` 加入：

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
```

若只想移除 `console.log`，但保留 `console.error`：

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    pure: ['console.log'],
  },
});
```

## 結論

- **Vue 2 + Webpack**：用 `terser-webpack-plugin`，透過 `vue.config.js` 移除 `console.log`。
- **Vue 3 + Vite**：在 `vite.config.js` 用 esbuild 設定 `drop: ['console', 'debugger']`。

這樣就能在開發時自由使用 `console.log`，又不影響正式環境的安全性與效能。

### 參考資料

- [Vite 官方討論：drop console.log](https://github.com/vitejs/vite/discussions/7920)
- [Stack Overflow：Vite drop console.log but keep console.error](https://stackoverflow.com/questions/79135998/vite-drop-console-log-but-keep-console-error-on-esbuild)
