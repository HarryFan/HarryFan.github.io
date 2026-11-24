---
title: 'Railway 環境變數外洩之後：我花 13 分鐘換掉一個同步服務的所有金鑰'
description: '2026 年 10 月 Railway 公告環境變數可能遭未授權存取。我維護的一個電商會員同步服務照官方建議輪替了全部憑證：盤點、備份、把中斷壓到 13 分鐘、驗證、收尾，還順便挖出更早就存在的外洩跟一個沉默了好幾個月的 bug。'
pubDate: 2026-11-05
category: 'frontend'
heroImage: '/blog/2026-11-05-railway-incident-credential-rotation/cover.png'
---

> 本文的專案已去識別化：不提客戶、品牌與平台帳號細節，只保留技術流程。文中不含任何真實金鑰。

先講結論：**平台說「事故已經處理完」，不代表你放在上面的金鑰是安全的。** 該換的還是要換，而且真正動手之後，你會發現風險常常不只來自平台。

這次我換掉一個小型同步服務的四組憑證，同步只中斷 13 分鐘，沒有漏資料。過程中還挖出兩件更早就存在的事：舊憑證早就躺在 Git 歷史裡，以及「即時同步」其實從來沒有運作過。

---

## 事情是怎麼開始的

2026 年 10 月 21 日，Railway 公告：攻擊者取得內部系統存取權，查詢了加密的環境變數，其中一部分被解密。官方說受影響的最多是 1.85% 的 workspace，但沒辦法確定是哪幾把 key 被讀到，所以建議 **10/21 以前註冊的用戶，把放在 Railway 的敏感變數全部換掉**。

10/26 官方更新說事故已經對既有用戶解除、部署也恢復了。

很多人看到「已解除」就鬆一口氣。但仔細看，這句話的意思是「平台現在安全了」，不是「你之前那幾把 key 沒被拿走」。被讀走的 key，平台修好也收不回來。

我維護的服務剛好就在 Railway 上：一個把電商平台會員資料同步到客服 CRM 的中介程式，Node.js + PostgreSQL，Webhook 加上每 15 分鐘輪詢。規模不大，但裡面有四組敏感憑證：

| 憑證 | 用途 |
|---|---|
| 電商平台存取權杖 | 讀會員資料、註冊 Webhook |
| 電商平台 App Secret | 驗證 Webhook 簽章 |
| CRM API Token | 寫入會員資料 |
| 資料庫密碼 | 同步紀錄、重試佇列、輪詢進度 |

四組都要換。

---

## 第一步不是換，是盤點

我一開始以為「換金鑰」就是到後台按「重新產生」，然後貼回去。

實際盤點完才發現，**三個平台的換法完全不一樣，而這直接決定了切換順序**：

**資料庫密碼：可以重新產生。** Railway Postgres 有 Regenerate Password，一鍵搞定。但同步服務的 `DATABASE_URL` 是寫死的字串，不會跟著自動更新。重產的那一刻，服務就連不上資料庫了。

**電商平台的權杖跟 App Secret：不能重新產生。** 後台只有「複製」和「解除安裝」。官方文件寫得很清楚：外洩時要建一個新的自訂 App，換好設定，再把舊 App 解除安裝。好消息是新舊 App 可以並存，建新 App 的時候，同步完全不受影響。

**CRM 的 API Token：上限一個。** 「新增 Token」按鈕是灰的，因為方案只允許一個。也就是說，**一定要先刪舊的才能建新的**，刪掉那一刻同步就斷了，而且回不去。

<figure>
  <img src="/blog/2026-11-05-railway-incident-credential-rotation/01-three-keys.png" alt="窗仔面前有三扇門：第一扇門上有「重產」按鈕，第二扇門旁邊站著一扇一模一樣的新門，第三扇門前面只能放一把鑰匙，窗仔拿著清單在旁邊做筆記" loading="lazy" />
  <figcaption>三把鑰匙，三種換法。先搞清楚哪一把換了就回不去。</figcaption>
</figure>

盤點還順便確認了幾件事：線上 `DATABASE_URL` 走的是內網、CRM Token 設定「允許所有 IP」（Railway 沒有固定出口 IP，鎖 IP 反而會讓新 Token 被擋），以及 Railway 這個方案在後台**不能建立新備份**。

---

## 第二個發現：外洩早就發生了

盤點時我順手掃了一遍 repo，比對本機 `.env` 裡的值有沒有出現在 Git 歷史。

結果四組全中。

半年前寫運維手冊時，為了方便，把環境變數連值一起貼了進去。後來雖然遮蔽了，但 commit 已經推上去了。另一份歸檔的整合筆記裡，甚至有電商後台的**登入密碼明文**。

這就是很多事故的真相：**大家盯著平台被駭，但自己的 Git 歷史可能早就外洩更久了。** 把檔案裡的字刪掉不等於憑證失效，只有到來源端撤銷、換新，才算數。

所以這次輪替不只是因為 Railway。就算 Railway 沒出事，這四組也早該換了。

<figure>
  <img src="/blog/2026-11-05-railway-incident-credential-rotation/02-git-history.png" alt="窗仔用橡皮擦擦掉紙上的一行密碼，但紙的背後有一疊標著 commit 的舊紙張，每一張上面都還印著那行字" loading="lazy" />
  <figcaption>擦掉這一頁，前面幾頁都還在。</figcaption>
</figure>

---

## 備份：平台不給，就自己來

Railway 這個方案只看得到一份平台自己做的舊備份，要新增得升級方案。

所以最新備份只能在本機用 `pg_dump` 經過公開入口做。有兩個小坑：

連線字串一定要用 `read -rs` 讀進變數，不要直接貼成指令。我就不小心貼了兩次，第二次被 zsh 當成指令執行，結果連線字串（含密碼）留在了 `~/.zsh_history`。

```bash
read -rs "PGURL?貼上 DATABASE_PUBLIC_URL："; echo
PGSSLMODE=require pg_dump "$PGURL" -Fc -f "$(date +%Y%m%d-%H%M%S).dump"
unset PGURL

# 不小心進了歷史的話（先關掉其他終端機分頁，不然關閉時會寫回去）
LC_ALL=C sed -i '' '/proxy\.rlwy\.net/d' ~/.zsh_history
```

macOS 的 sed 碰到歷史檔裡的中文會報 `illegal byte sequence`，加 `LC_ALL=C` 就好。

備份做完要驗證：`pg_restore --list` 確認每張表的資料都在，`pg_restore -f /dev/null` 確認能完整解碼。**沒驗過的備份只是一個檔案。**

---

## 切換：把中斷壓在最小的窗口

盤點完，順序就很清楚了：**能並存的先準備好，回不去的放在最後，所有變更一次部署。**

不中斷的準備：

1. 本機備份、跑一次唯讀預檢腳本，記錄切換前的狀態。
2. 電商平台建新 App，權限只勾「讀取客戶」。舊 App 照常運作。

中斷窗口：

1. 刪掉 CRM 舊 Token、建新的。**同步從這裡開始中斷。**
2. 新的三個值貼進 Railway 變數，**先不部署**。Railway 會顯示「Apply 3 changes」，變數暫存著不生效。
3. 重產資料庫密碼，把新的內網 `DATABASE_URL` 貼進服務變數。
4. 確認「Apply 4 changes」，一次 Deploy。

部署起來後，啟動日誌出現兩行我最在意的：

```text
Database schema initialized
[InitialSync] Initial sync already completed. Skipping.
```

第一行代表新密碼連得上。第二行代表初始同步的狀態有保留，**不會因為重啟就把全部會員重灌一次**。這個服務啟動時如果找不到這個狀態，會自動跑全量同步，所以這行沒出現要立刻停下來。

最後在本機幫新 App 註冊 Webhook，順序是「先查、再註冊、再查」：先確認新 App 的訂閱是 0 筆，註冊完確認變成 2 筆、沒有重複的 topic。

**實際中斷：17:28 到 17:41，13 分鐘。**

<figure>
  <img src="/blog/2026-11-05-railway-incident-credential-rotation/03-one-deploy.png" alt="窗仔把四把新鑰匙一起放進一個寫著「Deploy」的大按鈕旁的托盤，旁邊的小機器人拿著碼表，碼表上寫著 13 分" loading="lazy" />
  <figcaption>變數先暫存，最後一次部署。中斷只算真正回不去的那一段。</figcaption>
</figure>

---

## 驗證：不要相信 200

這個服務的 `/health` 只代表程式還活著，Webhook handler 就算同步失敗也會回 200。這兩個都不能拿來當驗收。

我用的驗收方式很土：在電商平台建一筆標明「測試用、可刪除」的測試客戶，看它有沒有真的出現在 CRM。

結果它出現了，但不是 Webhook 送來的，是下一輪輪詢抓到的。

我回頭查 Railway 的 HTTP 日誌：新 Webhook 註冊後，建客戶、改客戶，**一筆 POST 都沒有**。再往回翻資料庫裡近一週一千筆同步紀錄，連一筆「Webhook received」都沒有。

也就是說，這個服務一直以來都是靠輪詢在同步，Webhook 不知道從什麼時候開始就沒在運作了。資料沒掉，只是「即時」變成了「最慢 15 分鐘」，而且沒有人發現。

這件事讓我想了很久。當初設計 Webhook 加輪詢雙軌，就是怕 Webhook 漏接。結果雙軌確實救了資料，但也剛好把問題藏得太好。**有備援是對的，但你得知道備援什麼時候正在扛全部的量。** 這已經列進下一步要修的清單。

---

## 那三封「Deploy Crashed」

切換當天，我收到三封 Railway 的「Deploy Crashed」信，分別是 17:41、17:55、18:07。晚上整理信件的助理還很緊張地說「正式環境連續崩潰，沒看到恢復通知」。

實際上那三封對應的都是**舊版本被新部署取代**：17:41 那封是換金鑰後的部署，17:55 跟 18:07 是我推文件 commit 觸發的自動部署。舊容器被關掉時，Railway 就寄一封 crashed。而 Railway 不會寄「恢復」通知。

判斷方式很簡單：到 Deployments 頁看最上面 ACTIVE 那筆。顯示「Deployment successful」、日誌正常，就不用管。**不要看到信就按信裡的 Restart。**

---

## 讓 AI 幫忙，但不讓它碰鑰匙

這次很多盤點是我讓 AI agent 在瀏覽器裡做的：讀 Railway 的部署跟變數設定、看兩邊後台的 App 權限跟 Token 設定、比對 Git 歷史、寫唯讀預檢腳本、最後整理文件。

我給它的規則是這樣的：

- **唯讀檢查隨便做**，但讀到金鑰的頁面不截圖，用腳本把長字串遮掉才回傳；`DATABASE_URL` 只回報「內網／公網」分類。
- **不可逆的步驟一律先停下來問我**：刪 Token、重產密碼、解除安裝舊 App，每一步都等我說好。
- **金鑰由我自己複製貼上**，不經過對話。

最後它還是幫了倒忙一次：我自己把連線字串貼進了對話。好在那組密碼本來就排在幾分鐘後要重產。但這也提醒我，流程設計得再好，最容易出錯的還是人。

---

## 如果你也在 Railway（或任何 PaaS）上

這次的流程我整理成一份 SOP 放進專案。濃縮成幾句話：

1. **先盤點每把憑證怎麼換**：能不能重產、有沒有數量上限、有沒有 IP 白名單。這決定了順序跟中斷時間。
2. **順便掃 Git 歷史**。用 `git log -S"<值>"` 比對你現在的金鑰，有出現就代表平台不是唯一的風險。
3. **先備份、驗證備份，再動資料庫密碼**。平台不給備份就自己 `pg_dump`。
4. **能並存的先建好，變數先暫存，最後一次部署**。中斷時間只算真正回不去的那一段。
5. **寫死的連線字串不會跟著重產更新**，記得手動換。
6. **用真實資料驗收**，不要看 `/health` 或 HTTP 200。驗收時順便看看你的備援是不是正在扛全部的量。
7. **收尾要撤掉舊的**：舊 App 解除安裝、舊 Token 刪掉，確認舊憑證真的失效。

平台出事，是提醒你檢查自己的好時機。我這次換完金鑰，收穫最大的反而是那兩個早就存在、卻一直沒人發現的問題。

## 參考資料

- [Preliminary Report: Oct 21st Security Incident（Railway）](https://blog.railway.com/p/preliminary-report-october-security-incident)
- [Security Disclosure, Wednesday October 21st（Railway）](https://blog.railway.com/p/security-disclosure-wednesday-october-21st)
- [Railway October 2026 Incident: Treat Every Environment Variable as Exposed（GitGuardian）](https://blog.gitguardian.com/railway-october-2026-incident-environment-variables/)
- [Zeabur ENV 外洩後：不要把部署平台當成 Secret Manager（本站）](/blog/2026-08-30-zeabur-env-secret-manager-least-privilege/)
