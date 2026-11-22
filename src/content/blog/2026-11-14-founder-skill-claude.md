---
title: '花錢開店之前，先讓 Claude 開一場董事會：Founder skill 安裝與使用筆記'
description: 'Founder skill 是一組 11 個免費開源的 Claude 技能，把董事會、消費者小組、CFO、行銷總監通通變成指令，在你真的砸錢之前先把生意壓力測試一輪。整理它在做什麼、怎麼裝、該用什麼順序跑，還有我打算怎麼拿它來檢查自己的小電商副業。'
pubDate: 2026-11-14
category: 'ai'
heroImage: '/blog/2026-11-14-founder-skill-claude/cover.webp'
draft: false
---

前幾天在 IG 滑到一篇貼文，在介紹一個號稱能「開店前先問過 100 個顧客」的 Claude skill。我第一個反應是：又一個標題黨。

點進 GitHub 看完 README，我改觀了。它不是一段很長的 prompt，而是 **11 個分工清楚的技能、4 支純 Python 的計算工具，加上一套互相讀檔的流程**。最重要的是：數字算出來的，不是 AI 寫出來的。

我當天就裝到自己的 Mac 上。這篇記錄它是什麼、怎麼裝、該怎麼用。

> 專案：[Jakeschincariol/founder-skill](https://github.com/Jakeschincariol/founder-skill)，MIT 授權、免費、不用註冊、不用 API key，工具也不會連網。

## 它在解決什麼問題

大部分人開始一門生意的流程是：有個想法 → 覺得不錯 → 花錢 → 才發現沒人買、或賣越多賠越多。

Founder skill 想做的事情是把「花錢才知道」這一段往前搬，讓你在花錢之前先問過幾個角色：

- **董事會**：這個點子值不值得做？會死在哪裡？
- **消費者**：目標客人會不會買？不買的理由是什麼？
- **CFO**：每賣一單到底賺多少？一天要賣幾單才打平？
- **行銷總監**：客人在哪個平台？前 30 天要發什麼？

每個角色都是一個指令。

<figure>
  <img src="/blog/2026-11-14-founder-skill-claude/01-board.webp" alt="窗仔坐在會議桌旁，三位機器人顧問舉起打勾、問號和打叉的投票牌" width="1080" height="720" loading="lazy" decoding="async" />
  <figcaption>開店之前，先讓三位董事投一次票。</figcaption>
</figure>

## 11 個技能一覽

| 指令 | 角色 | 做什麼 |
| --- | --- | --- |
| `/founder-board` | 董事會 | 三位董事各用一套出版過的框架（Hormozi 的 Offer、Thiel 的壟斷、Jobs 的產品觀）幫點子打分、列致命風險、投票 |
| `/founder-competitors` | 競品偵察 | 從公開資料整理直接競品、間接競品、替代品，含價格、定位、顧客在評論裡抱怨什麼，每一筆附連結 |
| `/founder-consumer` | 消費者小組 | 依你的目標客群生出一群模擬買家（預設 100 位），每位收入、習慣、顧慮都不同，統計誰買、誰不買、為什麼 |
| `/founder-pricing` | 定價 | 用 Van Westendorp 價格敏感度模型算出可接受的價格區間，再對照競品和毛利 |
| `/founder-offer` | 方案設計 | 針對買家的反對理由組出方案（加贈、保證、真實的限時），再丟回小組重測 |
| `/founder-cfo` | 財務長 | 單位經濟：每單貢獻、真實利潤率、每日損益兩平、第一年逐月、需要多少現金、多久回本 |
| `/founder-marketing` | 行銷總監 | 定位、通路、有日期的 30 天上市活動、十個開場 hook、能花多少錢換一個客人 |
| `/founder-brand` | 品牌設計 | 名字候選（附商標、網域、帳號該查什麼）、語氣、品牌承諾、視覺 brief |
| `/founder-ops` | 營運 | 供應商、排班、每天的 SOP、工具、該查的執照，還有風險清單 |
| `/founder-launch` | 上市負責人 | 先做一個便宜的真實測試，再排倒數、上市當天流程、前 30 天要看的數字 |
| `/founder-plan` | 營運計畫 | 把上面全部彙整成一份計畫書，結論由數字算出來：獲利、還沒、或資料不齊 |

## 我最喜歡的三個設計

**一、結論是算出來的，不是寫出來的。**

`/founder-plan` 最後給的結論只有三種：Profitable、Not yet、Incomplete。要拿到 Profitable，必須每一單都賺錢、第一年有獲利、損益兩平點在產能範圍內、而且模擬買家的購買率夠高。缺一個數字就是 Incomplete，AI 沒有空間幫你「講得好聽一點」。

**二、計算交給 Python，不交給語言模型。**

利潤率、損益兩平、價格區間都是由 repo 裡的四支 Python 腳本算的，只用標準函式庫，不用 `pip install`。少一個欄位就直接報錯，不會自己猜一個數字補上。寫前端的我看到這個設計很有感：這就是把「AI 負責判斷，程式負責算數」分乾淨。

<figure>
  <img src="/blog/2026-11-14-founder-skill-claude/02-python-math.webp" alt="窗仔負責拿放大鏡看計畫書，旁邊一台小機器人用算盤算利潤率和損益兩平點" width="1080" height="720" loading="lazy" decoding="async" />
  <figcaption>AI 負責判斷，程式負責算數。</figcaption>
</figure>

**三、它很誠實地告訴你模擬買家不是真的客人。**

README 直接寫：語言模型天生偏好說好話，模擬出來的購買率要當成「上限」來看；模擬買家的回答是研究資料，**不能拿去當顧客見證**。所以 `/founder-launch` 第一步一定是叫你做一個真實的小測試（等候名單、預購、快閃），讓真人驗證。

## 怎麼安裝

官方給了三種方式。

**方式一：直接叫 Claude 裝。** 把 repo 網址貼給 Claude，說一句 `install skill`。

**方式二：用 Claude Code 的 plugin。**

```
/plugin marketplace add Jakeschincariol/founder-skill
/plugin install founder-skill@founder-skill
```

要注意 plugin 會加命名空間，指令會變成 `/founder-skill:founder-board` 這種長長的樣子。

**方式三：直接複製資料夾（我用這個）。** 指令就是乾淨的 `/founder-board`。

```bash
git clone https://github.com/Jakeschincariol/founder-skill.git
cp -R founder-skill/skills/founder-* ~/.claude/skills/
ls ~/.claude/skills | grep founder   # 看到 11 個就對了
```

裝完重開 Claude Code。

幾個小提醒：

- 只想在某個專案用，就複製到該專案的 `.claude/skills/`，不要放全域。
- 我的 `~/.claude/skills` 其實是一個替身（symlink），用 Finder 拖拉不太保險，用終端機 `cp -R` 最穩。
- 工具需要 Python 3.8 以上，有裝 Xcode 命令列工具的 Mac 通常就有 `python3`。
- 完全沒有 Claude Code 也能用：把任何一個 `SKILL.md` 貼在對話最前面，它就會照那套方法跑，只是少了子代理和計算工具。

## 怎麼用：照順序跑

每個技能都會把結果寫進專案裡的 `founder/` 資料夾，下一個技能再讀前面的檔案。所以順序很重要：

```
board → competitors → consumer → pricing → offer → cfo → marketing → brand → ops → launch → plan
```

一個完整流程大概是：

<figure>
  <img src="/blog/2026-11-14-founder-skill-claude/03-panel.webp" alt="窗仔站在台上展示商品，台下的模擬買家以讚、倒讚和問號回應" width="1080" height="720" loading="lazy" decoding="async" />
  <figcaption>一百個模擬買家，誰買、誰不買、為什麼。</figcaption>
</figure>

1. `/founder-board`：先把點子講清楚，它會寫成 `founder/idea.md`，三位董事打分並投票。董事開出的條件，就是後面要一個一個補齊的清單。
2. `/founder-competitors`：把同類型的對手、價格、評論抱怨整理出來。
3. `/founder-consumer`：定義目標客群，發 100 張不同的買家卡，每張卡一個子代理，各自決定買或不買、講出理由。
4. `/founder-pricing` → `/founder-offer`：用買家的價格回答算出區間，再針對反對理由改方案、重測一次。
5. `/founder-cfo`：填數字，算出每單賺多少、一天要賣幾單才打平。
6. 行銷、品牌、營運、上市四個技能把它變成能執行的計畫。
7. `/founder-plan`：彙整成 `founder/business-plan.md`，結論自動算出來。

**還在想要不要做的點子，不用跑全套。** 直接下：

```
/founder-consumer --quick
```

只跑 20 位模擬買家，很快就能看出這個點子值不值得繼續花時間。

## 我打算怎麼用

我下班後在經營一個小小的電商副業「好好入手」，在 IG 跟 Threads 上分享自己用過的保養品和美容儀器。一直以來都是靠感覺：這支影片好像不錯、這個價格應該可以。

我想拿 Founder skill 檢查三件事：

1. **`/founder-consumer --quick`**：用「早上很趕的上班族」當目標客群，看看大家不買的理由是什麼。這些理由可以直接變成下一支短影片的題目。
2. **`/founder-cfo`**：把進貨成本、運費、廣告費都填進去，算清楚每一單真正留下多少。這件事我一直沒有認真算過。
3. **`/founder-marketing`**：拿它排的 30 天內容日曆，對照我現在的發文節奏。

跑完的結果我會再寫一篇。

<figure>
  <img src="/blog/2026-11-14-founder-skill-claude/04-route.webp" alt="窗仔沿著踏腳石走向一本封面打勾的計畫書" width="1080" height="720" loading="lazy" decoding="async" />
  <figcaption>照順序一塊一塊踩過去，最後拿到一份算出來的結論。</figcaption>
</figure>

## 使用時要記得的事

- **董事會是在套用框架，不是那三個人本人。** 它不會模仿他們說話，也不代表他們背書。
- **模擬買家不是真的客人。** 拿來找反對理由、找客群、找文案切角很好用，但大決定還是要找真人驗證，更不能拿去當見證。
- **數字只會跟你填的一樣準。** 成本要找供應商報價，稅務、公司架構要問會計師。
- **它不是財務、法律或稅務建議。** 執照、商標、廣告用語各地規定不同，台灣的話賣保養品還要注意化粧品廣告相關法規，它只會告訴你該去查什麼。

一個免費、開源、不用連網的工具，能在花錢之前先幫你把生意拆開來看一遍，我覺得很值得放進工具箱。
