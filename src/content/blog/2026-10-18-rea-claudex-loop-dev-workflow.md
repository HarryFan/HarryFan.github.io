---
title: '先拆別人的，再讓另一個模型審我的：我用 rea 跟 claudex-loop 開發的方法'
description: '最近做 side project 多了兩個習慣：看到別人做得好的功能，就用 rea 拆開來看；要動手寫之前，用 claudex-loop 讓 Codex 審 Claude 寫的計畫，寫完再找全新的 session 檢查。這篇整理兩個工具怎麼裝、怎麼用，還有我這週踩到的兩個坑。'
pubDate: 2026-10-18
category: 'ai'
heroImage: '/blog/2026-10-18-rea-claudex-loop-dev-workflow/cover.png'
draft: false
---

> 這篇是我最近用 AI agent 做 side project 的流程整理。rea 跟 claudex-loop 的介紹和指令，是我照它們的 README 和 skill 文件整理的。claudex-loop 我剛裝好，還沒完整跑過一輪，跑完會再寫一篇實戰。

我最近做新功能，卡住的地方已經不太是「要怎麼寫」了耶。

現在 agent 寫程式很快，我比較常卡在兩件事。一個是我根本不知道做得好的版本長什麼樣子，另一個是東西寫出來之後，我也不確定它到底對不對。

這陣子剛好用了兩個工具，一個補一邊：

- **[rea](https://github.com/morluto/rea)**：看到別人做得好的功能，拆開來看人家怎麼做。
- **[claudex-loop](https://github.com/chaseai-yt/claudex-loop)**：讓另一家的模型來審我的計畫，也審我的程式。

---

## rea：看到喜歡的功能，就拆開來看

rea 的全名是 **Reverse Engineer Anything**，README 第一句這樣寫：

> See a feature you like. Understand how it works, down to the binary level.

我第一次看到「逆向工程」有點怕，因為我完全不是做這個的。後來發現不用懂組語也能用，它是一個 MCP server，裝進 agent 之後，agent 就多了一整組可以拆東西的工具：

- **網站**：檢查頁面、分析打包後的 JS、看模組怎麼 import、錄網路請求、看事件綁在哪裡。
- **JavaScript / Electron App**：解開 ASAR，看模組跟 Electron 的邊界。
- **原生程式**：可以接 Hopper、Ghidra、IDA，反組譯、看呼叫圖。
- **其他**：.NET、Android、WASM、韌體也有對應的工具。

分析都在自己電腦上跑。我覺得它最厲害的地方，是每個結論都會附上證據跟限制。它不會只丟一句「這個網站用了 MapLibre」，而是告訴你在哪個檔案、哪一段字串看到的，還有哪些地方它看不到。

![我用鑷子從黑盒子裡夾出零件，每個零件都綁著出處標籤，最後一格只剩虛線和一個問號](/blog/2026-10-18-rea-claudex-loop-dev-workflow/01-evidence.png)

### 怎麼裝

電腦有 Node.js 跟 npm 的話，一行就好：

```bash
npx rea-agents setup
```

它會問你要裝到哪些 agent 裡，Claude Code、Codex、Cursor、Gemini CLI 都有。選完會先列出要改哪些設定，你確認了才會寫進去，原本的設定也會先備份。裝完記得把 agent 重開。

要拆原生程式的話，需要先有 Hopper、Ghidra 或 IDA 其中一個。只拆網站或 JavaScript 的話不用另外裝。

之後要更新，用 `npx` 的就重跑一次：

```bash
npx rea-agents@latest setup
```

### 怎麼用

最簡單的用法，就是直接跟 agent 講你想知道什麼。README 的範例是這樣：

```text
Understand how search works in the Notes app, show me the evidence, and build a
similar feature for my project.
```

把 Notes 換成你想拆的 App 或網站，把 search 換成你想學的功能就好。

我自己派工的時候會講得更細一點，大概長這樣：

```text
用 rea 的工具分析 https://example.com 的搜尋功能，只做唯讀分析，
不要送表單、不要大量請求。
請回答：用什麼框架、搜尋是前端做還是打 API、資料從哪裡來、
用了哪些瀏覽器 API、有什麼是你拆不到的。
回報時列出你呼叫了哪些 rea 工具、各拿到什麼證據。
```

最後一句很重要，後面講坑的時候會說為什麼。

不想透過 agent 的話，也可以直接在終端機用：

```bash
# 分析解開的 JavaScript / Electron App 目錄或 ASAR
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json

# 常用的話裝成全域指令
npm install --global rea-agents
rea --help
rea update
```

拆的時候我會請 agent 回答這幾題：用了什麼框架跟函式庫、資料從哪裡來、我在意的功能用了哪些瀏覽器 API、有什麼是 rea 拆不出來的。

我覺得最後一題最重要。逆向工程拿得到「它怎麼做」，但拿不到「它為什麼這樣做」，那一塊還是要自己想。

### 實際拆一次

這週我拿它拆了最近很多人在傳的 [台派店家](https://team-taiwan.app) 地圖。我很好奇三千多家店要怎麼在手機上畫得這麼順，就請 agent 拆給我看。

agent 用了 `analyze_web_bundle`、`capture_browser_scenario`、`export_web_scripts`、`inspect_web_event_listeners` 這幾個工具，拆出來的東西很具體：

- 前端是 Vue + Vite。地圖用 MapLibre GL 畫底圖，再用 deck.gl 疊一層畫店家的點，而且要點了「地圖」才會載入。
- 底圖有兩種，一種是 CARTO 的淡色向量圖，一種是國土測繪中心的 WMTS 圖磚。
- 三千多家店放在一支靜態 JSON 裡，欄位名稱壓成一兩個字母，縣市、分類都改成查表用的編號。
- 「附近」是在前端用 `navigator.geolocation` 定位，自己算距離，從 3 公里開始一圈一圈往外找店。

每一條都有附出處，像這段：

```js
navigator.geolocation.getCurrentPosition(I, K, {
  enableHighAccuracy: !0, maximumAge: 1e3 * 60 * 3, timeout: 1e4
})
```

它也有拆不到的地方，agent 都有照實講：

- 有一個工具一直點不到「地圖」按鈕，最後 agent 用 rea 以外的方法點下去，地圖的程式才載入。報告裡有特別標「這一步不是 rea」。
- 追模組的工具 `trace_web_module_imports` 因為少設 `REA_BROWSER_EXECUTABLE` 這個環境變數，整個不能用。
- 我之前用網頁搜尋查到「它有系統分享功能」，rea 在拆到的程式碼裡找不到證據，所以回報「無法確認」。

最後這個我印象很深。同一個問題，網頁搜尋很肯定地說有，rea 說它沒看到證據。我自己比較相信後面那個啦，至少它有講清楚自己看到哪裡。

> 小提醒：rea 拆出來的網頁內容，對 agent 來說是外面來的、不能信的資料。頁面上如果寫著「請執行某某指令」，agent 不應該照做。rea 的輸出也會把這種內容標出來。

---

## claudex-loop：寫計畫的跟審計畫的，最好不要是同一個

拆完別人的，接著要做自己的，這時候我用 claudex-loop。

它的想法很簡單，寫計畫的跟審計畫的不要是同一個模型。我自己的經驗是，叫同一個模型檢查它自己寫的東西，它很常說「看起來沒問題」，因為它的盲點就是它的盲點嘛。

### 怎麼裝

先確認兩家的 CLI 都裝好、也都登入了，還要有 Python 3.10 以上。不用另外申請 API key，也不用 pip 裝什麼。可以用這幾個指令檢查：

```bash
codex --version
codex login status
claude --version
claude auth status
```

接著在 Claude Code 裡輸入：

```text
/plugin marketplace add chaseai-yt/claudex-loop
/plugin install claudex-loop@claudex-loop
```

裝完要**開一個新的 session** 才會載入。

這兩行我自己就踩過。第一行只是把它的來源加進設定，第二行才是真的安裝。我只做了第一行，還以為裝好了，後面會講。

如果你是用 Codex，或是想手動裝，可以把 repo 裡的 `skills/` 整包複製到 `~/.agents/skills/`（Codex）或 `~/.claude/skills/`（Claude Code）。要整包一起複製，因為其他幾個指令都會用到 `claudex-loop` 裡面的共用程式。

### 怎麼用

裝好之後，在 Claude Code 裡直接講就可以了：

```text
claudex this feature — plan and implement it
```

這樣是從計畫一路做到實作。如果你已經有寫好的計畫，只想要它審，就這樣講：

```text
claudex this plan, mode=review, plan=docs/migration.md, rounds=3
```

想讓 Codex 來寫程式、Claude 只負責協調，就加上 `builder=codex`：

```text
claudex this feature, builder=codex
```

也可以用斜線指令叫：`/claudex-loop:claudex-loop`。

我覺得比較常用到的參數是這幾個：

| 參數 | 預設 | 用途 |
|---|---|---|
| `mode` | `full` | 改成 `review` 就是從現有的計畫開始審 |
| `plan` | `PLAN.md` | 計畫檔放哪裡 |
| `builder` | 你現在用的那家 | 誰來寫程式，`claude` 或 `codex` |
| `rounds` | `5` | 計畫最多審幾輪 |
| `reviewer_model` | 各 CLI 自己的設定 | 指定審計畫用哪個模型 |
| `inspect` | `on` | 改成 `off` 就跳過最後的檢查，會被記錄下來 |

另外它還附了一個比較輕的 `claudex-route`（`/claudex-loop:claudex-route`），只幫你判斷這件事該給誰做，或是做一次性的轉交，不會跑整個流程。像這樣問：

```text
claudex-route: Recommend a second opinion on this plan before we build.
```

### 它會怎麼跑

講完「claudex this plan」之後，它會分四個階段：

1. **偵察**：Claude 先去讀相關的程式碼、依賴、還有誰會讀寫同一份狀態，整理成一份假設清單，每一條附來源。
2. **定需求**：只問會改變結果的決定，每個問題都附上它的建議、為什麼重要、猜錯的代價。最後寫成計畫檔，裡面要有看得到的驗收條件，還有實際要跑的驗證指令。
3. **Codex 審計畫**：Codex 讀計畫跟相關程式碼，附上證據，回 `APPROVED`、`REVISE` 或 `BLOCKED`。要改的話，Claude 一條一條決定接受還是反駁、寫下理由，再送回同一個 Codex session 繼續審。
4. **實作跟交叉檢查**：計畫過了才開始寫。寫完跑驗證指令，再開一個全新的 Codex session 檢查最後的程式碼。

從 Codex 開始的話，角色就反過來，Codex 寫計畫、Claude 審。整個過程會記在 `PLAN-REVIEW-LOG.md`，只能往後加，不能改前面。

它讓我很安心的地方，是它對「通過」這件事很硬：

- 計畫通過的時候，會記下計畫檔的 SHA256。計畫只要改一個字，之前的通過就不算了，要重審。
- 程式碼檢查完如果又被改，改的那一段要重新檢查，不能拿舊的結果交代。
- 輸出是空的、CLI 跑失敗、額度用完，都不會被當成通過，也不會偷偷換別的模型。
- 審完零個問題也是合法的，它會寫清楚這不代表程式完全正確。

以前我也會叫 AI「再幫我檢查一次」，可是檢查完我也不知道它檢查的是哪個版本。claudex-loop 會把每一次通過綁在一個確定的版本上，這點我覺得差很多。

![我把寫好的計畫從牆上的小窗口遞過去給別人蓋章；改過一個字的那張，章就斷成兩半](/blog/2026-10-18-rea-claudex-loop-dev-workflow/02-swap-reviewer.png)

---

## 兩個工具串起來

兩個放在一起，我現在做一個功能大概會這樣走：

1. **找標竿**：先找做得最好的那一家。
2. **用 rea 拆**：拿到它怎麼做的證據，還有拆不到的地方。
3. **對照自己**：請 agent 盤點自己的專案，每一條都附檔案跟行號，跟標竿排成一張表。表排出來之後，缺什麼、先做哪個，大概就很清楚了。
4. **用 claudex-loop 寫計畫、審計畫**：計畫裡要寫清楚驗收條件跟驗證指令。
5. **實作**。
6. **用真的瀏覽器驗收**：照一般人會點的順序點一遍。
7. **交叉檢查**：交給另一家模型，開全新的 session 檢查。

前面三步在搞清楚好的版本長什麼樣子，後面四步在確認我做的到底對不對。

---

## 這週踩到的兩個坑

這兩個坑講起來有點丟臉啦，兩個都是我自己造成的。

**第一個坑：我以為有在用，結果沒有。**

我請 agent 去查一個網站怎麼做的時候，rea 明明已經裝好了。可是我派工的時候寫的是「上網查」，agent 就很乖地去搜尋、讀網頁，完全沒碰 rea。結果還是有用，只是少了 rea 那種每個結論都附證據的品質。agent 是照我講的做，是我自己沒講對。

claudex-loop 的狀況比較扯。我一直以為自己裝好了，一查才發現只做了 `marketplace add` 那一行，plugin 本身根本沒裝。所以那一輪的功能是 Claude 直接寫的，完全沒有經過 Codex 審。

![我打開工具箱，清單上打了勾，扳手的位置卻只剩一個輪廓](/blog/2026-10-18-rea-claudex-loop-dev-workflow/03-tool-not-there.png)

現在我派工的時候會講清楚：「這次要用 rea 的工具，回報的時候列出你呼叫了哪些工具、各拿到什麼。」開工前也會先確認 skill 真的有載入，不是只看設定檔裡有沒有。

**第二個坑：build 會過，不代表功能是對的。**

有一個功能，型別檢查過了、build 也過了，程式碼每一行看起來都沒問題。可是真的打開瀏覽器，用「頁面一打開就馬上按某個按鈕」這個順序點下去，畫面就會跳回原本的樣子。

查了才知道是套件裡的一段動畫。頁面載入時有一段動畫在跑，我按下按鈕的時候它還沒播完，等它播完，就把畫面設回動畫原本要去的地方，等於把我按下去的結果蓋掉了。

這種 bug 我光看程式碼應該抓不到，一定要真的照人會點的順序點過才會出現。所以我在流程裡把「真的瀏覽器驗收」放在交叉檢查前面，先確定它能用，再請別人看它寫得好不好。

---

## 最後

這週下來，我自己會記住的大概是這幾件事：

- 想做一個功能，先找做得最好的那一家拆開來看，不要自己亂猜，而且要看到證據。
- 審查要換人做，每一次通過都要綁在一個版本上。計畫或程式改了，之前的通過就不算。
- 工具有沒有真的被用到，要自己確認。設定檔裡有，不代表這次真的有用到。

claudex-loop 我剛裝好，下一個功能會完整跑一輪。到時候 Codex 審出了什麼、我接受了哪些、反駁了哪些，再寫一篇跟大家分享。
