---
title: '金融專案不准用 setTimeout？先弄清楚你到底在等什麼'
description: '閒置登出、交易倒數、等待 API、DOM 更新與交易輪詢，各自需要不同的處理方式。整理金融前端如何減少對 setTimeout 的依賴，也釐清 CSP、Web Worker 與 async／await 幾個容易被說錯的觀念。'
pubDate: 2026-11-12
category: 'frontend'
draft: true
---

前端有一種很容易寫出來的程式碼：

```js
loadData();

setTimeout(() => {
  openConfirmDialog();
}, 500);
```

資料應該載完了吧？畫面應該長出來了吧？等半秒，通常就可以動了。

但換一台慢一點的電腦、遇到網路塞車，或者使用者把分頁切到背景，這個「應該」就不一定成立。放在交易確認、保單送件、登入逾時這些流程裡，問題會更明顯。

如果專案規範要求避免 `setTimeout`，我會先確認兩件事：**規範到底限制哪種寫法，以及這段程式真正想等的是什麼。**

等 API、等 DOM、等動畫，跟等登入到期，是不同的需求。先拆清楚，才知道該換成哪個工具。

---

## 先釐清：CSP 並沒有全面禁止 setTimeout

下面兩段程式碼，看起來只差一點點：

```js
// 把字串當成程式碼執行
setTimeout('refreshStatus()', 1000);

// 傳入一個函式
setTimeout(() => refreshStatus(), 1000);
```

差別其實很大。第一種需要把字串解析成 JavaScript；第二種是排程一個既有的函式。

當 CSP 的 `script-src` 或其 fallback 限制字串評估、沒有允許 `unsafe-eval` 時，第一種會受到限制。**這不等於 CSP 把所有函式形式的計時器都禁掉了。**當然，承載這段程式的 script 本身，仍要符合網站的載入政策。[MDN 的 CSP 說明](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src#unsafe_eval_expressions)有列出這個區別。

公司也可能另外訂出更嚴格的程式碼規範，連函式形式都不允許。這時要照專案規則走，但不能因此推論成「所有金融網站都有同一條禁令」。

Timing Attack 也要分開看。它關心的是攻擊者能否從處理時間差推測敏感資訊，例如帳號存在與不存在時，登入流程的回應時間明顯不同。OWASP 討論的處理方向包含一致的驗證流程與適當的常數時間比較；光是把前端的 `setTimeout` 刪掉，無法處理這類問題。[OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses)

---

## 登入逾時與交易倒數：先決定誰有權判定到期

倒數畫面很容易寫成「每跑一次 callback，就把剩餘秒數減一」。

問題是，callback 跑了一次，不代表現實世界剛好過了一秒。主執行緒忙碌、背景分頁節流，都可能讓計時器晚一點執行。`setTimeout(fn, 1000)` 不能保證在一秒後準時執行。[MDN：setTimeout 的延遲原因](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout#reasons_for_delays_longer_than_specified)

我會把需求拆成兩層：

- **後端判斷是否到期**：登入 Session、交易有效期限，都在伺服器驗證。
- **前端顯示剩餘時間**：每次更新畫面時，重新計算到期時間與現在的差值。

下面只示範畫面計算，假設 API 已回傳 Unix epoch 毫秒的 `expiresAtMs`：

```js
function getRemainingSeconds(expiresAtMs, nowMs = Date.now()) {
  return Math.max(0, Math.ceil((expiresAtMs - nowMs) / 1000));
}
```

它不會自己定期更新畫面；真正改變的是「剩餘時間的算法」。畫面仍需要更新觸發點，頁面恢復可見或重新載入時，也要重新取得後端狀態。若只是顯示整秒倒數，沒有必要為此每個動畫影格都重新渲染。

`Date.now()` 會受使用者的系統時鐘影響，所以這個數字只能當顯示參考。實務上可以依 API 回傳的伺服器時間估算時鐘偏移，恢復頁面時再校正，但仍有網路延遲等誤差。

`performance.now()` 適合量同一個執行環境裡的短時間間隔，不會因系統校時而突然倒退；它也不能直接和 epoch 格式的到期時間相減。跨系統休眠的行為還有瀏覽器與作業系統差異，不能把它當成所有長時間倒數的萬用解法。[MDN：performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)

### 閒置逾時跟 Token 到期，也不是同一件事

「登入後最多兩小時」跟「十分鐘沒有有效操作就登出」，需要不同的狀態。JWT 的 `exp` 表示 Token 的到期時間，單靠它不會知道使用者最後一次操作在什麼時候。[RFC 7519：exp](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.4)

OWASP 明確建議由伺服器落實 Session 的閒置與絕對逾時。前端可以顯示提醒、在驗證失效時清理畫面，但不能只靠一個可被修改的前端變數決定交易還能不能送出。[OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#automatic-session-expiration)

如果後端以 `401` 表達登入失效，就依 API 契約集中處理；有 Token 更新流程的系統，還要區分「可以更新」與「必須重新登入」。也要先定義哪些請求算有效活動，別讓背景狀態查詢一直替使用者續命。

### Web Worker 不能保證休眠時還有精準倒數

Worker 可以把工作移出主執行緒，減少主執行緒忙碌造成的影響，但它沒有提供「裝置睡著後仍準時執行」的保證。瀏覽器會管理頁面的生命週期，頁面可能被凍結，甚至被丟棄；把程式換一個執行緒，無法取消這些限制。[Chrome：Page Lifecycle API](https://developer.chrome.com/docs/web-platform/page-lifecycle-api)

所以倒數重新出現時，應該重新計算、重新查詢狀態。不能因為用了 Worker，就相信畫面上那個秒數一定等於交易剩餘時間。

---

## 等資料：讓完成的那一方告訴你

開頭那段「等半秒開確認視窗」，可以改成明確的依賴關係：

```js
async function prepareConfirmation() {
  try {
    const data = await loadData();
    openConfirmDialog(data);
  } catch (error) {
    showLoadError(error);
  }
}
```

前提是 `loadData()` 真的回傳代表載入完成的 Promise。內部如果用了 `fetch`，也要依 HTTP 狀態處理失敗，不能把收到回應一律視為成功。

這樣可以保證這一次呼叫中，確認視窗等到資料準備完成才開啟。但 `async / await` 不會自動解決所有競態：使用者連點兩次，仍可能有兩條流程同時進行。

我的做法會是另外處理送出中的狀態、過時回應與必要的取消操作。涉及真正的交易時，後端還要負責防止重複處理；前端停用按鈕只是使用體驗的一部分。

如果完成訊號來自另一個模組，可以用明確的 callback、元件事件或 `CustomEvent`。要注意監聽的註冊時機：事件已經發出才開始監聽，就收不到了。對於「初始化一次、很多地方都需要等」的需求，共用同一個 ready Promise 往往更容易管理。

---

## 等畫面：先用框架的更新機制

在 Vue 裡，常見需求是打開一個區塊後，把焦點移到輸入欄位。

如果輸入欄位是自己元件的一部分，可以等 Vue 完成 DOM 更新：

```js
import { nextTick, ref } from 'vue';

const showForm = ref(false);
const accountInput = ref(null);

async function openForm() {
  showForm.value = true;
  await nextTick();
  accountInput.value?.focus();
}
```

對應的 input 要綁定 `ref="accountInput"`。`nextTick()` 等的是 Vue 這一輪 DOM 更新，不包含還沒完成的 API 請求，也不保證 CSS 進場動畫已經播完。如果是 UI kit 的彈窗，還要遵守元件提供的開啟完成事件與焦點管理方式。[Vue：nextTick](https://vuejs.org/api/general.html#nexttick)

遇到第三方程式插入節點、自己拿不到明確完成事件時，再考慮 `MutationObserver`。它可以觀察 DOM 變動；使用時要先檢查節點是否已存在，縮小觀察範圍，完成後呼叫 `disconnect()`，頁面或元件離開時也要清理。[MDN：MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

節點出現也只代表 DOM 存在，不代表圖片載入、字型載入或元件內部初始化全部完成。真正要等什麼，就找那件事的完成訊號。

---

## 等動畫：交給瀏覽器的動畫機制

淡入、展開、位移這類效果，我會先看 CSS transition 或 animation 能不能處理。需要逐幀計算的動畫，再用 `requestAnimationFrame()`。

`requestAnimationFrame()` 會配合瀏覽器的重繪時機，頻率與螢幕更新率有關，不能寫死成每秒 60 次。計算動畫進度時要使用時間差，避免高更新率螢幕上的動畫跑得比較快；多數瀏覽器也會暫停背景分頁的 callback。[MDN：requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)

如果要知道 transition 何時結束，可以監聽 `transitionend`，但它不是每次都會到：

- transition 被取消，或元素在過程中被隱藏、移除，可能不會收到預期的結束事件。
- 沒有實際發生 transition，例如相關時間都設為零，就沒有對應事件。
- 多個屬性可能各自觸發事件，也要辨識事件來源與 `propertyName`。

因此要處理取消、沒有動畫的路徑，以及元件離開時的清理。交易狀態應該由資料結果更新，不能把「轉帳成功」綁在裝飾動畫有沒有播完上。[MDN：transitionend](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event)

---

## 查交易進度：輪詢要管的是頻率與生命週期

查轉帳結果、查送件狀態，常常會看到遞迴 `setTimeout`。這種寫法本身不等於記憶體洩漏。

反而當請求耗時不固定時，MDN 建議考慮在前一次工作完成後，再安排下一次執行，避免固定間隔造成請求堆疊。[MDN：setInterval 的使用注意](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval#ensure_that_execution_duration_is_shorter_than_interval_frequency)

真正要確認的是：上一筆回來了沒？多久再查？什麼時候停止？離開頁面後誰負責清掉？

### 後端能推送，就評估 SSE 或 WebSocket

只需要後端通知前端狀態變更時，可以考慮 SSE；需要雙向持續通訊時，再評估 WebSocket。SSE 的 `EventSource` 提供接收事件與重新連線的機制，但後端仍要支援這套介面。[MDN：使用 Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)

對交易畫面，我會把推送當作更新狀態的通知，並設計斷線重連後如何補查最新狀態。連線生命週期、驗證與重複訊息的處理，都要一起規劃。

如果既有 API 只提供一般查詢端點，前端不能單方面把它變成 SSE。為了拿掉一個計時器而改整套通訊架構，也要看需求是否值得。

### 換成 async 迴圈，還是要控制間隔

下面這段雖然一次只送一筆，仍然可能查得非常密集：

```js
// 反例：回應越快，下一次請求就越快送出
while (status === 'pending') {
  status = await fetchStatus();
}
```

`await` 等的是請求完成，沒有替你加上合理的等待時間。

如果專案允許函式形式的計時器，可以在請求完成後，透過可取消的排程安排下一次查詢，再搭配退避、重試上限與後端的頻率指示。若規範全面禁用計時器，就要和團隊確認核准的排程方式，或評估後端長輪詢與推送；把 `setTimeout` 藏進一個叫 `sleep()` 的函式裡，並沒有改變它的行為。

不管用哪種方式，都要定義成功、失敗與逾時的停止條件，並在離開頁面或切換交易時停止舊的查詢。取消前端請求，也不代表後端已經取消交易。

---

## 我會用這張表決定怎麼改

| 原本想做的事 | 優先考慮的方式 | 還要處理什麼 |
|---|---|---|
| 閒置登出、交易期限 | 後端驗證期限，前端依時間戳計算顯示 | 閒置與絕對期限、時鐘誤差、恢復頁面後重新查詢 |
| 等 API 資料 | Promise、`async / await` | 失敗、重複送出、過時回應 |
| 等自己元件的 DOM | 框架更新機制，例如 Vue `nextTick()` | 元件 ref、焦點管理、額外的非同步初始化 |
| 等第三方插入節點 | 完成事件，必要時用 `MutationObserver` | 節點已存在的情況、觀察範圍與清理 |
| UI 動畫 | CSS transition／animation、`requestAnimationFrame()` | 取消、零時長、背景分頁與減少動態效果設定 |
| 查詢交易狀態 | 後端推送，或有間隔且可停止的輪詢 | 重連、退避、重試上限、取消與終止條件 |

回頭看一段 `setTimeout` 時，我會先把它後面藏著的假設寫出來。

「資料半秒就會回來」、「畫面下一秒一定好了」、「callback 跑十次就是十秒」——只要把這些假設換成能確認的完成訊號、時間戳與後端狀態，重構的方向通常就清楚了。

金融前端需要的可靠性，要落在這些具體的流程裡。
