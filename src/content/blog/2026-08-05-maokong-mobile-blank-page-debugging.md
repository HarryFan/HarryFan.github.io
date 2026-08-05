---
title: '手機開起來一片空白，LINE 卻正常：一次挖到底的除錯日誌'
description: '同一個網址，手機 Chrome 一片空白，LINE 內建瀏覽器卻好好的。這篇是完整的除錯過程：SPA rewrite 讓死掉的檔案回 200 text/html、沒有 Error Boundary 讓例外變成白畫面、three.js 把首屏 bundle 撐到 1 MB，以及最後那個只有使用者看得見、我在自己機器上永遠重現不了的 z-fighting。中間我還自己製造了一個 regression。'
pubDate: 2026-08-05
category: 'frontend'
heroImage: '/blog/2026-08-05-maokong-mobile-blank-page-debugging/cover.png'
tags: ['除錯', 'three.js', 'Vercel', '效能優化', 'WebGL', '前端筆記']
---

貓空聚會的邀請函上線一陣子了。某天收到一句回報：

> 用手機的 Chrome 開起來一片空白，但 LINE 的瀏覽器又正常。

這句話裡有一個很珍貴的東西：**對照組**。同一個網址、同一支手機、兩個瀏覽器，一個死一個活。有對照組的 bug 比「它壞了」好查一百倍。

結果這條線挖下去，總共挖出四個彼此無關的問題，其中一個是我在修前三個的時候自己造出來的。這篇按照實際發生的順序記錄，包含我猜錯的部分。

## 先講結論

| # | 問題 | 症狀 | 為什麼難查 |
|---|---|---|---|
| 1 | SPA rewrite 吃掉 404 | 舊快取指向已刪除的 JS，伺服器回 `200 text/html` | module 被 MIME 檢查擋掉，**不執行也不報錯** |
| 2 | 沒有 Error Boundary | 任何 render 例外 → React 卸載整棵樹 | 手機沒有 devtools，白畫面等於零資訊 |
| 3 | `localStorage` 會 throw | 瀏覽器封鎖 site data 時 `getItem` 丟 `SecurityError` | 錯在 `useEffect` 裡，直接炸掉整頁 |
| 4 | z-fighting | 桌面第三道山一直閃 | 我在自己機器上**永遠重現不了** |

## 一、Vercel 的 SPA rewrite 是靜默失敗製造機

`vercel.json` 原本長這樣，是每個 SPA 教學都會叫你貼的那段：

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

它的用途是讓 `/gallery`、`/rsvp` 這種前端路由不要 404。但 `/(.*)`  的意思是**所有路徑**，包含 `/assets/index-abc123.js`。

於是我試著打一個不存在的檔案：

```bash
curl -sI https://<站台>/assets/index-OLDHASH.js
```

```
HTTP/2 200
content-type: text/html; charset=utf-8
```

**200，而且 content-type 是 `text/html`。** 內容是 `index.html`。

這就是空白頁的機制。瀏覽器留著舊版的 `index.html`，裡面寫著上一次部署的檔名雜湊；那個檔已經被刪了，伺服器把首頁當成 JS 餵回去。而 `<script type="module">` 有嚴格的 MIME 檢查：拿到 `text/html` 就**直接拒絕執行**。

不執行。不報錯。畫面全白。

LINE 的內建瀏覽器有自己獨立的快取，第一次開就是全新載入，拿到的是正確的檔名——所以它好好的。對照組解釋完畢。

修法是把 `/assets` 排除在 rewrite 之外，讓不存在的檔案回真正的 404：

```json
{
  "rewrites": [
    { "source": "/((?!assets/).*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

順手把 `/assets` 標成 `immutable`——檔名本來就帶內容雜湊，永遠不需要重新驗證。Vercel 預設給的是 `max-age=0, must-revalidate`，等於每次都多一趟往返。

這個修正**沒辦法在本機驗證**（起不了 Vercel 的路由層），只能部署後 curl 確認。上線後回 `404 text/plain`，同時 `/gallery` 還是回 `200 text/html`——兩邊都要驗，只驗一邊很容易改壞路由。

## 二、白畫面的真正問題是它不會說話

上面那個修好了，但我意識到更嚴重的事：**這個網站沒有任何機制能告訴使用者出了什麼事。**

React 只要在 render 或 lifecycle 裡拋出例外，就會卸載整棵樹。手機上沒有 devtools，使用者看到的永遠是一片白，回報回來也永遠是「打不開」。

所以加了兩層。第一層是 React 的 Error Boundary，這個很標準。第二層比較少見，但它才是真正救到這次的關鍵——**一段跑在 module 之前的 classic script**：

```html
<script>
  (function () {
    var booted = false;
    var timer = null;

    function show(title, detail) { /* 把訊息塞進 #root */ }

    // main.tsx 執行到就會呼叫，代表 module 成功載入
    window.__maokongBooted = function () {
      booted = true;
      if (timer) clearTimeout(timer);
    };

    window.addEventListener('error', function (e) {
      var t = e.target;
      // 資源載入失敗（script/link）沒有 e.error，只有 target
      if (t && t !== window && (t.tagName === 'SCRIPT' || t.tagName === 'LINK')) {
        show('資源載入失敗', '無法載入：' + (t.src || t.href));
        return;
      }
      show('程式發生錯誤', (e.error && e.error.stack) || e.message);
    }, true);

    timer = setTimeout(function () {
      show('頁面沒有載入完成', '主程式在 10 秒內沒有啟動。\nUA: ' + navigator.userAgent);
    }, 10000);
  })();
</script>
```

關鍵在**它必須是 classic script**。第一個問題的失敗模式是 module 根本沒被執行——這時候 Error Boundary 連載入都還沒載入，救不了任何東西。只有一段不依賴 module 系統的程式碼才攔得到。

順便把 UA 印出來。使用者截個圖，我就知道是哪個瀏覽器哪個版本。

## 三、`localStorage` 是會拋例外的

這是查第二層的時候順手發現的。原本的程式碼：

```js
const stored = localStorage.getItem(STORAGE_KEY);
if (!stored) { /* ... */ }
try {
  setAttendees(JSON.parse(stored));
} catch {
  setAttendees(seed);
}
```

`JSON.parse` 有包 try/catch，`getItem` 沒有。但 `getItem` 本身就會拋：瀏覽器封鎖該站 site data 時（Chrome 的「封鎖所有 Cookie」、某些企業政策、沙箱化的 iframe），它丟的是 `SecurityError`，不是回傳 `null`。

而這行在 `useEffect` 裡。一拋，整棵樹卸載，白畫面。

改成一律走安全層：

```ts
export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    console.warn(`[safeStorage] 無法讀取 ${key}，改用記憶體模式：`, err);
    return null;
  }
}
```

**讀失敗回 `null`，寫失敗靜默略過。** 功能降級（勾選狀態不會保留），但頁面必須活著。裝飾性的持久化不值得拿整頁去換。

## 四、手機根本不該跑那個 WebGL 背景

到這裡使用者提出另一個方向：會不會是效能問題？

量了才知道有多誇張：

```
dist/assets/index-xxxx.js   1,049.42 kB │ gzip: 309.62 kB
```

**單一 chunk 1 MB，其中三分之二是 three.js。** 而且每一台裝置——包含所有手機——都會下載它、解析它，然後跑一個全螢幕的 WebGL render loop。低階 Android 上，這個組合足以讓分頁被系統回收。回收之後看到的是什麼？一片白。

使用者的要求很明確：手機不用這麼 fancy，桌面保留。這是對的取捨，而且做法很直接。

先把判斷抽出來：

```ts
export function shouldRenderWebGLScene(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

    const conn = (navigator as any).connection;
    if (conn?.saveData === true) return false;
    if (typeof conn?.effectiveType === 'string' && /(^|-)2g$/.test(conn.effectiveType)) return false;

    // 觸控 + 窄螢幕 = 手機
    const isPhone =
      window.matchMedia('(pointer: coarse)').matches &&
      window.matchMedia('(max-width: 900px)').matches;
    if (isPhone) return false;

    const mem = (navigator as any).deviceMemory;
    if (typeof mem === 'number' && mem <= 4) return false;
    if (typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
```

**偵測失敗一律回 `false`。** 寧可少一層裝飾，也不要因為讀不到某個非標準 API 就讓頁面掛掉。

然後讓 three.js 成為獨立 chunk，手機根本不會去要它：

```tsx
const SceneBackground = lazy(() => import('./SceneBackground'));

// ...
{use3D ? (
  <Suspense fallback={<StaticSceneBackground mode={weatherMode} />}>
    <SceneBackground mode={weatherMode} />
  </Suspense>
) : (
  <StaticSceneBackground mode={weatherMode} />
)}
```

`StaticSceneBackground` 是一張 inline SVG，構圖跟 3D 版完全一致——四道山、太陽、山霧，共用同一組色票，晴雨切換用 CSS transition。手機看到的不是「陽春版」，是同一個設計的靜態版本。**零額外 JS、零 render loop。**

同一份 SVG 也當 Suspense 的 fallback，所以桌面在載入 three.js 那段期間，背景不會先空一塊再跳出來。

順手把四個頁面改成 route-level lazy。切分結果：

```
index.js            403.44 kB │ gzip: 129.32 kB   ← 手機只下載這個
SceneBackground.js  496.28 kB │ gzip: 127.00 kB   ← 桌面才要
GalleryPage.js       90.94 kB │ gzip:  35.92 kB
ItineraryPage.js     38.28 kB │ gzip:  14.01 kB
RsvpPage.js          22.00 kB │ gzip:   5.86 kB
```

手機首屏 JS：**1049 kB → 403 kB**（gzip 309 → 129 kB，減 58%）。

驗證方式是用 CDP 開真正的行動裝置模擬（390×844、touch、Pixel UA），確認網路請求裡**沒有 three.js 那個 chunk**。不是看程式碼推論，是看實際發出的請求。

## 五、然後我自己造了一個 regression

改效能的時候我順手做了這件事：

```ts
// 「高 DPR 螢幕本身就有足夠取樣密度，MSAA 邊際效益低但成本高」
const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
renderer = new THREE.WebGLRenderer({ antialias: dpr < 1.5, /* ... */ });
```

聽起來很合理。**它是錯的。**

回報馬上來了：桌面山巒開始閃。查線上實際的 context 屬性：

```json
{"antialias": false, "SAMPLES": 0, "backing": [2160, 1350], "dpr": 2}
```

問題在那個 `Math.min(..., 1.5)`。DPR 被鎖在 1.5，而 Retina 原生是 2——backing store 是 2160×1350，要放大到 2880×1800 的裝置像素。**畫面本來就已經是不足取樣了。** 山稜是高對比硬邊、又隨視差持續移動，MSAA 正是在壓這個。我把唯一的補償拿掉了。

改回 `antialias: true`。而且手機現在走 SVG，WebGL 只在桌面跑，MSAA 的成本完全付得起。

教訓不是「不要關 MSAA」，是**我把一個沒有量過的假設寫成了註解**。那句「高 DPR 取樣密度已足夠」讀起來像根據，其實是我腦補的——而且旁邊三行就寫著 `Math.min(dpr, 1.5)`，證據就在原地，我沒看。

## 六、真正的元凶：我永遠重現不了的那個

MSAA 修好部署上線，回報是：**還是在閃。**

這時候我做了整個過程中唯一正確的一件事：**停止猜測，開始量。**

先排除掛載問題。用 CDP 在 25 個取樣點上記錄：

| 檢查 | 結果 |
|---|---|
| canvas 數量 | 恆為 1 |
| canvas 節點身分 | 沒被重建 |
| WebGL context lost / restored | 0 / 0 |
| console 錯誤 | 無 |
| 靜止時逐幀變動像素 | 平均 0.11%，最大 0.13% |
| 捲動時頁面高度 | 恆定，視差進度無跳動 |

**我測不到那個閃。** 在我的環境裡它不存在。

這是很多人會開始亂改的時刻——反正改一改推上去問使用者好了。但每次「猜一個、推上去、等回報」的循環都很貴，而且會累積一堆沒有根據的改動。

所以我改成問，而且問能夠**分辨假設**的問題：是邊緣毛毛的像在爬，還是整片山突然變色？靜止時會不會？捲動才會？

回答只有一句，但它值一千次猜測：

> 由上而下第三個山有時候會一閃一閃。完全靜止不動時也會。

**第三個。** 打開座標表：

```ts
const RIDGES = [
  { depth: -18, ... },  // 由上而下第一道
  { depth: -12, ... },  // 第二道
  { depth:  -7, ... },  // 第三道 ← 就是它
  { depth:  -3, ... },
];
```

再看山霧：

```ts
m.position.set(x, -2 - i * 0.8, -4 - i * 3);
// i=0 → z = -4
// i=1 → z = -7   ← 跟第三道山完全共面
// i=2 → z = -10
```

**第二片山霧和第三道山脊都在 z = -7，完全共面。**

而且兩者都設了 `transparent: true`，所以都跑進 three.js 的 transparent pass，共用同一套深度排序與深度測試。24-bit 的深度緩衝分不開兩個共面的表面——重疊處就開始 z-fighting。

山霧會持續橫向飄移、山脊本身還有一個 `Math.sin` 的微幅呼吸位移，所以**就算使用者完全不動，重疊區域也一直在變**。這解釋了「靜止時也會閃」。也解釋了為什麼晴天雨天都閃——這是幾何問題，跟色盤無關。

至於為什麼我測不到：我用的是 headless 的軟體渲染，深度精度比實體 GPU 高。這種 bug 只在真的 GPU 上發生。

兩處都改，各解一半：

```ts
// 山巒改成不透明：transparent:true + opacity:0.98 視覺上跟不透明沒差別，
// 卻把山脊丟進 transparent pass 跟山霧混在一起
const mat = new THREE.MeshBasicMaterial({ color: pal0.ridges[i] });

// 山霧 z 避開 RIDGES 的 -18 / -12 / -7 / -3
m.position.set(x, -2 - i * 0.8, -5.5 - i * 2.6);  // → -5.5 / -8.1 / -10.7
```

新的間距最小 1.1 個單位。而山脊改成不透明之後，它們走 opaque pass（由近到遠、正常寫深度），完全退出那個排序，根本不再有機會跟山霧爭。

`opacity: 0.98` 這種「幾乎不透明」是很經典的陷阱：**視覺上你看不出 2% 的差別，但它足以把物件丟進完全不同的渲染路徑。** 半透明不是一個視覺參數，是一個架構決定。

## 這次學到什麼

**一、讓失敗大聲。** 三個問題裡有兩個的症狀是同一片白畫面。Error Boundary 和那段 bootstrap 看門狗沒有修好任何 bug，但它們把「未知的白畫面」變成「畫面上寫著原因和 UA」。這個轉換的價值比任何單一修正都高。

**二、重現不了就不要改。** 我在測不到的情況下改了 MSAA，結果是製造第四個 bug。等到真的量了 25 個取樣點、確認自己環境裡沒有這個現象，才去問使用者要區辨性資訊——「第三個山」這五個字直接把問題定位到一行座標。

**三、註解裡的理由要能被檢查。** 「高 DPR 取樣密度已足夠」寫在程式碼裡看起來很專業，實際上是我沒有驗證的假設，而且推翻它的證據就在同一個函式裡。註解應該寫**為什麼這樣做**，但那個「為什麼」本身要站得住。

**四、有對照組的回報是禮物。** 「手機 Chrome 空白但 LINE 正常」和「由上而下第三個山」，這兩句話各自省掉我好幾個小時。使用者不需要懂技術，但他們能提供你在自己機器上永遠拿不到的觀測。
