---
title: '後端 API 還沒好，前端不用等：用 MSW 在瀏覽器裡攔截請求、回假資料'
description: '前端照常打 API，MSW 在半路把請求攔下來，回一份假資料。等後端 API 好了，把 MSW 關掉就好，前端程式一行都不用改。這篇整理 MSW 在 Vue 3 + Vite 的設定、怎麼讓 vitest 共用同一份假資料，還有我踩過的幾個坑。'
pubDate: 2026-11-26
category: 'frontend'
heroImage: '/blog/2026-11-26-msw-mock-api-before-backend/cover.png'
draft: false
---

後端 API 還沒好，前端卻已經要開工，這種狀況在接案和駐點專案裡幾乎是常態。

我現在的做法是用 **MSW（Mock Service Worker）**：前端程式照常打 API，MSW 在瀏覽器裡把請求攔下來，回一份假資料。前端完全不知道對方是假的。等後端 API 真的接上，把 MSW 關掉就好，**前端程式一行都不用改**。

這篇整理我在 Vue 3 + Vite 專案裡的設定方式，還有幾個一開始沒注意到的坑。

## MSW 站在哪裡

<figure>
  <img src="/blog/2026-11-26-msw-mock-api-before-backend/01-intercept.png" alt="窗仔在畫面和後端伺服器之間攔下一封信，換成另一封信遞回去" loading="lazy" />
  <figcaption>請求還是照常發出去，只是在半路被換成假資料。</figcaption>
</figure>

名字裡的 Service Worker 就是重點。瀏覽器本來就有 Service Worker 這個機制，可以攔截網頁發出去的請求（PWA 的離線快取就是用它做的）。MSW 借用這個機制，攔到請求之後不去打真的伺服器，而是照你寫好的規則回一份假資料。

所以在 DevTools 的 Network 面板裡，你看到的還是一個正常的 HTTP 請求，只是旁邊會標註「from service worker」。

## 跟其他做法比

假資料的做法很多，我之前大概都用過：

| 做法 | 問題 |
| --- | --- |
| 在元件裡直接寫死假資料 | 之後要一個一個找出來刪，常常漏掉 |
| 另外起一個 json-server | 多一個要開的服務，測試環境也要跟著起 |
| axios 的 mock adapter | 綁在 axios 上，換成 fetch 就失效；也測不到攔截器 |
| **MSW** | 在網路層攔截，前端程式維持原樣，測試也能共用 |

MSW 最大的差別是它**不動你的程式**。API 函式、axios 攔截器、錯誤處理全部都是真的在跑，只有最後回來的資料是假的。

## 在 Vue 3 + Vite 裡設定

目前 MSW 是 2.x 版，寫法跟網路上很多 1.x 的舊文章不一樣（`rest` 換成 `http`、`res(ctx.json())` 換成 `HttpResponse.json()`），抄範例的時候要注意版本。

### 1. 安裝，並把 worker 檔案放到 public

```bash
npm install msw --save-dev
npx msw init public/ --save
```

第二行會在 `public/` 產生一個 `mockServiceWorker.js`。這個檔案要讓瀏覽器拿得到，所以一定要放在靜態檔案的資料夾。`--save` 會順便把路徑記在 `package.json`，之後升級 MSW 時會自動更新這個檔案。

### 2. 寫 handler：哪個 API 要回什麼

```ts
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'
import formRules from './data/formRules.json'

export const handlers = [
  http.get('/api/form-rules', () => {
    return HttpResponse.json(formRules)
  }),

  http.post('/api/applicant', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ success: true, data: body }, { status: 201 })
  }),
]
```

假資料我習慣放成獨立的 JSON 檔，不直接寫在 handler 裡。handler 只負責「哪個網址回哪份資料」，資料本身可以單獨改、單獨檢查。

### 3. 只在開發時啟動

```ts
// src/mocks/browser.ts
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

```ts
// src/main.ts
async function enableMocking() {
  if (!import.meta.env.DEV) return
  const { worker } = await import('./mocks/browser')
  return worker.start({ onUnhandledRequest: 'bypass' })
}

enableMocking().then(() => {
  createApp(App).mount('#app')
})
```

兩個重點：

- **用動態 `import()`**，正式環境 build 出來的檔案裡就不會包到 MSW。
- **等 `worker.start()` 完成才掛載 App**。不然畫面一開始發的請求，會搶在 MSW 準備好之前送出去，直接打到不存在的後端。

## 測試也用同一份假資料

<figure>
  <img src="/blog/2026-11-26-msw-mock-api-before-backend/02-shared-handlers.png" alt="窗仔把同一本筆記本影印成兩份，一份給瀏覽器，一份給測試機器人" loading="lazy" />
  <figcaption>瀏覽器和測試共用同一份 handlers，假資料只要維護一份。</figcaption>
</figure>

vitest 跑在 Node 裡，沒有瀏覽器的 Service Worker，所以要改用 `msw/node`。好消息是 handlers 可以直接共用：

```ts
// src/mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

```ts
// vitest.setup.ts
import { server } from './src/mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

測試裡我把 `onUnhandledRequest` 設成 `'error'`：只要有請求沒寫 handler，測試就直接失敗，比較不會漏掉。

要測錯誤情境時，在單一測試裡臨時蓋掉 handler 就好：

```ts
server.use(
  http.get('/api/form-rules', () => new HttpResponse(null, { status: 500 })),
)
```

`afterEach` 裡的 `resetHandlers()` 會在測完後把它還原，不會影響其他測試。

## 假資料變多之後：用腳本合併，成品不手改

<figure>
  <img src="/blog/2026-11-26-msw-mock-api-before-backend/03-merge-not-edit.png" alt="窗仔把幾張小紙條放進一台機器，機器吐出一本大冊子，冊子上貼著禁止手改的標誌" loading="lazy" />
  <figcaption>要改就改上游的來源檔，再重新合併。</figcaption>
</figure>

我現在手上的專案是表單類型，每張表單都有一大堆欄位規則。如果全部塞在同一個 JSON，幾千行，好幾個人同時改一定會衝突。

所以專案的做法是：

1. 規則拆成多份**來源檔**，例如共用的規則定義一份、每張表單各自的設定一份
2. 用一個 npm script 把它們**合併**成 MSW 要回傳的那份成品
3. 成品放在 `src/mocks/data/`，MSW 回傳這份

```
共用規則定義.json
＋ 各表單設定.json
        │  npm run mock:merge
        ▼
src/mocks/data/   ← 合併後的成品，不手改
        │
        ▼
MSW 攔截請求 → 回傳成品 → 畫面拿到規則
```

這裡有一條規矩一定要講清楚：**成品不手改**。`src/mocks/data/` 是腳本產生的，你直接改它，下次有人重新跑 merge，改的東西就會被蓋掉。要改規則，就去改上游的來源檔，再跑一次合併。

新人進專案最常卡在這一步，我自己剛接手時也問過「MSW 是什麼」、「為什麼這個資料夾不能改」。把這張圖畫出來之後就好講很多。

## 我踩過的坑

**部署在子路徑時，worker 找不到**

如果網站不是放在網域根目錄，而是像 `/my-app/` 這種子路徑，預設的 `/mockServiceWorker.js` 會 404。要告訴 MSW 正確位置：

```ts
worker.start({
  serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  onUnhandledRequest: 'bypass',
})
```

**改了 handler，畫面卻沒變**

Service Worker 會被瀏覽器快取。遇到這種狀況，打開 DevTools → Application → Service Workers，勾選「Update on reload」，或直接強制重新整理。

**升級 MSW 後 console 跳警告**

`mockServiceWorker.js` 要跟套件版本一致。當初有用 `--save` 的話通常會自動更新；沒有的話，重新跑一次 `npx msw init public/` 就好。

**忘了它還開著**

後端 API 接上之後，記得確認 MSW 真的關了。最簡單的方法：Network 面板裡如果還看得到「from service worker」，就代表回來的還是假資料。

## 結語

MSW 解決的不只是「後端還沒好」這件事。它讓前端可以**照著 API 規格先把畫面和流程做完**，錯誤情境、空資料、慢回應都能自己模擬，測試也共用同一份資料。

等真的 API 接上，前端只要做一件事：把 MSW 關掉。
