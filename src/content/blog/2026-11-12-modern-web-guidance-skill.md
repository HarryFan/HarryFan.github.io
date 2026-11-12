---
title: 'AI 寫前端老是停在好幾年前？我拿 Google 的 modern-web-guidance 掃了自己的部落格'
description: 'modern-web-guidance 是 Chrome 團隊跟 Edge、Firefox、MDN 一起維護的 agent skill，讓 Claude Code、Codex 這類 coding agent 寫前端之前，先查一份「現在瀏覽器已經能怎麼做」的指南。這篇整理它怎麼運作、怎麼裝、我實際跑的結果，還有裝之前要注意的三件事。'
pubDate: 2026-11-12
category: 'ai'
heroImage: '/blog/2026-11-12-modern-web-guidance-skill/cover.png'
draft: false
---

> 這篇的工具介紹是照 [modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance) 的 README 跟 SKILL.md 整理的（2026-11-10 的版本），文中的指令跟輸出都是我 11/12 實際跑過的。

先講結論：叫 AI 寫一個「點外面就會關掉的彈窗」，它很常給你一整段 JavaScript 去算滑鼠點在哪裡。但現在瀏覽器只要在 `<dialog>` 上加一個 `closedby="any"` 就好。

modern-web-guidance 就是在補這個落差。它是 Google Chrome 團隊做的 agent skill，Edge、Firefox 跟 MDN 的團隊也一起維護。裝進 Claude Code 或 Codex 之後，agent 寫 HTML、CSS、前端 JS 之前，會先去查一份「這件事現在瀏覽器原生怎麼做」的指南，再動手。

我是在 IG 滑到別人介紹才知道它的。看完 README 覺得蠻對我胃口，就拿自己的部落格來試。

---

## 為什麼 AI 寫的前端常常很舊

原因其實很單純：模型是讀網路上的程式碼長大的，而網路上的舊寫法遠比新寫法多。

就算模型「知道」某個新 API 存在，它看過的實際用法也很少，所以一寫起來還是回到最熟的那一套。結果就是用一堆 JavaScript 去做瀏覽器早就內建的事。

modern-web-guidance 的 README 說它主要補三件事：

- **新的瀏覽器 API**：模型常常知道但用錯的那些，例如 Popover、Anchor Positioning、View Transitions。
- **效能跟無障礙**：能交給瀏覽器做的就交給瀏覽器，順便拿到內建的鍵盤操作和螢幕閱讀器支援。
- **合理的 fallback**：舊瀏覽器不支援的時候，寫一小段補救，不要一口氣拉一整包 polyfill 進來。

目前收了 250 個網頁功能，CSS 跟版面 140 個、HTML 跟 DOM 36 個、JavaScript 跟 API 74 個。

<img src="/blog/2026-11-12-modern-web-guidance-skill/01-old-vs-new.png" alt="窗仔吃力地抱著一本很厚、封面寫著「舊寫法」的書，旁邊小機器人遞給他一張很薄、寫著「新指南」的小卡" width="1536" height="1024" loading="lazy" />

---

## 它怎麼運作

流程只有三步：

1. agent 判斷這次的任務跟網頁前端有關，就啟用這個 skill。
2. agent 用一句 2～5 個字的英文去搜，例如 `search "light dismiss dialog"`。
3. 從搜到的結果挑一篇，用 `retrieve` 把整份指南拿進來，照著寫。

我最在意的是第二步。README 寫得很清楚，搜尋是在本機跑的，用的是離線的 embedding 模型加 BM25，不打網路、不用 API key。

它每次都用 `npx modern-web-guidance@latest` 去叫，是為了確保指南內容是最新的。套件下載下來之後，查詢本身就是在你自己電腦上跑。

---

## 怎麼裝

最簡單的是官方的安裝精靈，一行就好：

```bash
npx modern-web-guidance@latest install
```

它會問你要裝到哪些 agent。用 Claude Code 的話，也可以直接裝成 plugin：

```text
/plugin marketplace add GoogleChrome/modern-web-guidance
/plugin install modern-web-guidance@googlechrome
/reload-plugins
```

跟我上次寫 claudex-loop 一樣，第一行只是把來源加進來，第二行才是真的安裝。README 還建議到 `/plugin` 裡把 GoogleChrome 這個 marketplace 的自動更新打開。

Codex 的話是這兩行：

```bash
codex plugin marketplace add GoogleChrome/modern-web-guidance
codex plugin add modern-web-guidance@googlechrome
```

另外它其實有兩包 skill：一包是 `modern-web-guidance` 本體，另一包是 `chrome-extensions`，專門講 Chrome 擴充功能的 Manifest V3。只想裝其中一包，就在安裝時加上 `--choose`。

之後要更新，用安裝精靈裝的就跑 `npx modern-web-guidance@latest update`。

---

## 不裝也能先試

我沒有一開始就裝，先用 `npx` 直接跑看看。這三個指令不用安裝就能用：

```bash
# 搜尋相關指南
npx modern-web-guidance@latest search "light dismiss dialog"

# 用 ID 拿整份指南
npx modern-web-guidance@latest retrieve "light-dismiss-a-dialog"

# 掃整個專案，找可以換成新寫法的地方
npx modern-web-guidance@latest legacy-scan .
```

### search：先找有哪些指南

搜「light dismiss dialog」，它回了 10 筆，前三筆是：

```json
[{"id":"light-dismiss-a-dialog","description":"Create a modal dialog that can be closed via light dismiss (i.e. clicking or tapping outside of the dialog)"},
{"id":"platform-controls-dismiss-dialog","description":"Create a modal dialog that can be closed via standard platform-specific user actions, such as pressing the `Esc` key on desktop platforms, ..."},
{"id":"dialog","description":"Build a modal or non-modal dialog component that is accessible, manages focus appropriately, ..."}]
```

回傳的只有 ID 跟一句說明，很省 token。agent 看說明挑一篇，再去拿全文。

### retrieve：拿到的指南長什麼樣子

`light-dismiss-a-dialog` 這篇，重點就是開頭講的那行：

```html
<dialog id="myDialog" closedby="any" aria-labelledby="dialogTitle">
  <form method="dialog">
    <h2 id="dialogTitle">Feedback</h2>
    <button type="submit">Close</button>
  </form>
</dialog>
```

我覺得寫得好的是後面兩段。

一段是限制。一定要用 `showModal()` 打開，焦點才會被鎖在彈窗裡，Esc 才有作用。畫面上還是要留一個看得到的關閉按鈕。

另一段是支援度。它直接寫 `closedby` 目前 Chrome 134、Edge 134、Firefox 141 支援，**Safari 還不行**，然後附上一小段 fallback：判斷瀏覽器不支援的時候，自己監聽點擊，看是不是點在彈窗外面。

這就是 README 說的「合理的 fallback」：不是叫你等 Safari，也不是叫你裝套件，而是十幾行自己補起來。

### legacy-scan：拿我自己的部落格開刀

這個最好玩。我對部落格的 `src` 跑了一次：

```text
Modern Web Guidance Analyzer — src
Found 3 modernization opportunities across 1 guide (scanned 33 guides with deterministic rules; ~20% of the guidance corpus):

* custom-text-decorations (3 findings)
  Use native CSS text-decoration shorthand, text-decoration-thickness, and text-underline-offset instead of border-bottom and padding-bottom underline hacks.
  - components/Footer.astro:46
  - pages/about.astro:109
  - pages/resume.astro:272
```

我回去翻 Footer，真的被抓到：

```css
.social-links a {
  text-decoration: none;
  border-bottom: 3px solid var(--teal);
}
```

先把底線拿掉，再用 `border-bottom` 畫一條假的底線，這是很多年前的老招。現在用 `text-decoration-thickness` 跟 `text-underline-offset` 就能直接調底線的粗細和距離，不用再拿邊框假裝。

它也很老實：只用規則掃了 33 篇指南，大約是全部的兩成。每一筆都附「什麼情況該留」「什麼情況可以不理」，像卡片、表格的外框就不算。所以它比較像幫你列一張待檢查清單，不是叫你全部照改。

<img src="/blog/2026-11-12-modern-web-guidance-skill/02-legacy-scan.png" alt="窗仔拿著放大鏡蹲在自己的網站前面，網站上三條底線旁邊標著紅色的「舊」，小機器人在旁邊拿著寫有「3」的清單打勾" width="1536" height="1024" loading="lazy" />

### 一個意外：有些指南要你自己同意才能看

我接著想看 `custom-text-decorations` 的全文，結果沒有直接給我，而是先跳一段警告。

原因是這篇指南裡用到 `text-decoration-skip-spaces`，這個功能目前只有一個瀏覽器引擎支援，規格還可能會改。這種「不穩定的功能」它會擋下來，要開發者自己跑這行指令同意：

```bash
npx modern-web-guidance@latest set-allow-volatile-features
```

還有特別寫給 agent 看：不准自己跑這行指令，不准自己去改設定檔繞過去。

我覺得這個設計很對。AI 最容易出事的就是看到新東西就用，結果上線之後一半的使用者看不到。實驗中的 Origin Trial API 也是一樣的處理方式。

同意之後會寫進專案根目錄的 `.mwgrc`，可以 commit 進 repo，整個團隊共用同一個設定：

```json
{
  "allowVolatileFeatures": true,
  "allowOriginTrials": true
}
```

---

## 它說有用，是真的有量過

README 有放 eval 結果。他們拿兩個完整的網頁 App 出題，題目故意不提 API 的名字，例如「讓我的圖片載入快一點」，看 agent 自己找不找得到對的做法，再用 Playwright 去驗。

11/8 那一輪，同樣 215 題：

| Agent | 沒裝 | 有裝 | 提升 |
|---|---|---|---|
| Claude Code | 57% | 88% | +31 |
| Codex CLI | 54% | 82% | +28 |
| Antigravity CLI | 58% | 94% | +36 |

我比較在意的是它怎麼用這個數字：模型本來就會的，就把那段指南刪掉；模型一直做錯的，就把指南寫得更細。所以它才能做到整個 skill 本體只佔大約 200 個 token，要用的時候才把需要的那一篇拿進來。

詳細的數字可以看它的 [Eval Dashboard](https://googlechrome.github.io/modern-web-guidance-src/)。

---

## 裝之前要知道的三件事

**第一，它會很常跳出來。**SKILL.md 的說明直接寫「所有 HTML、CSS、前端 JS 任務都要先執行」，連在 Vue、React 裡寫一般的 HTML 跟 CSS 也算。如果你覺得太頻繁，可以不要裝在全域，只放進需要的專案裡。後端、CI、改 tsconfig 這類事情它不會跳。

**第二，它會回傳使用資料。**README 寫得很清楚：會收安裝次數、是哪個 agent、拿了哪些指南，還有 agent 搜尋時下的那句查詢。你跟 agent 講的原始內容不會收。如果在公司專案用，覺得連查詢都不想外流，可以在 `.zshrc` 加這行關掉：

```bash
export DISABLE_TELEMETRY=1
```

**第三，它講的是瀏覽器原生的最佳做法，不是你專案的規則。**我現在工作的專案有自己的 UI kit，彈窗、下拉選單都已經包好了。這時候它建議用原生的 Popover，就不一定適合。我會把它當成「多問一個懂瀏覽器的人」，最後還是看專案怎麼規定。

<img src="/blog/2026-11-12-modern-web-guidance-skill/03-crossroad.png" alt="窗仔站在岔路口，一邊路牌寫「原生」，一邊寫「專案規則」，小機器人舉著指南在旁邊，窗仔摸下巴在想" width="1536" height="1024" loading="lazy" />

---

## 我會怎麼用

side project 跟這個部落格，我會直接裝。它掃出來的那 3 個底線，下次改版就順手換掉。

公司專案就先不裝在全域。要寫新元件的時候，我會先自己跑一次 `search` 看看有沒有現成的指南，有的話再叫 agent 去 `retrieve`，跟專案的寫法對照過再決定。

如果你常叫 AI 寫前端，我很推薦至少跑一次 `legacy-scan .`。不用裝、不用設定，一分鐘就知道自己的專案裡藏了多少「以前只能這樣寫」的東西。

---

**參考連結**

- GitHub：[GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance)
- 官方文件：[Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance)
- 原始碼與 issue：[GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src)
