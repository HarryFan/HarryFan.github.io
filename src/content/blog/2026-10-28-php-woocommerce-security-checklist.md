---
title: '你的 PHP 網站，上次更新是什麼時候？從國外 WooCommerce 案例看電商資安'
description: '2026 年 10 月 PHP 本身出了可遠端執行的漏洞（PHP2Shell），WooCommerce 外掛也接連被拿來側錄結帳頁、植入後門。整理幾個國外公開案例，以及經營 PHP／WordPress 電商這週就該做的檢查。'
pubDate: 2026-10-28
category: 'frontend'
heroImage: '/blog/2026-10-28-php-woocommerce-security-checklist/cover.png'
---

> 本文整理的都是國外已公開的資安報告與新聞，來源列在文末。文中提到的漏洞與攻擊手法，都是為了讓網站管理者知道該檢查什麼，請不要拿去掃描或測試不屬於你的網站。

這兩週，我的 WordPress 社群群組裡一直有人在聊電商外洩。

聊到最後，大家的結論都差不多：**PHP 網站出事，很少是因為 PHP 寫得爛，大多是因為「沒更新」。** PHP 本身沒更新、外掛沒更新、主機上那套沒人記得的內部工具沒更新。

剛好這個月國外有幾個案例，把這件事講得很清楚。

---

## PHP 本身也會破：PHP2Shell

10 月 21 日，PHP 官方發了緊急更新，修掉兩個漏洞（CVE-2026-109618、CVE-2026-109619），被叫做 **PHP2Shell**。

重點有三個：

- CVSS v4.0 都是 9.2，**不用登入就可能遠端執行程式碼**。
- 影響 Apache mod_php 和 PHP-FPM。在 mod_php 上，攻擊可以在你的網站程式碼執行之前就觸發。也就是說，你的 WordPress 寫得再乾淨都沒用。
- 修補版本是 **8.5.12、8.4.27、8.3.36、8.2.35**。8.1、8.0、7.4 沒有新的正式版，只有最小的原始碼回補，更舊的版本什麼都沒有。

資安公司 Brandefense 做了一個免費檢查工具，10 月 21 日到 25 日有三萬多個網站被拿去檢查。在看得到 PHP 版本號的網站裡，**59% 還停在修補前的版本**，其中超過一半是已經停止支援的 8.1 以下。

這個數字要打個折：樣本是使用者自己選的網站，不是隨機抽樣；很多網站把版本號藏起來，有些發行版也會在舊版本號裡偷偷補上修正。但方向很清楚：**很多人根本不知道自己主機上跑的是哪一版 PHP。**

還有一個很多 WordPress 站長會誤會的地方：**更新 WordPress 核心，不會幫你更新 PHP。** PHP 是主機的事，要另外確認。

<figure>
  <img src="/blog/2026-10-28-php-woocommerce-security-checklist/01-old-door.png" alt="一整排門裡有一扇鎖頭生鏽、門半開、標著「舊版」，窗仔拿著新的鎖衝過去，後面三隻拿放大鏡的小機器人正沿著門自動掃描" loading="lazy" />
  <figcaption>一整排門只要有一扇是舊鎖，掃描器就會找到它。</figcaption>
</figure>

---

## 外掛是最大的破口

WordPress 核心其實更新得很勤，真正的破口通常在外掛。今年國外有兩個 WooCommerce 案例很典型。

### 結帳頁被側錄：FunnelKit Funnel Builder

Funnel Builder 是一個 WooCommerce 結帳與加購外掛，有四萬多個商店在用。

資安公司 Sansec 在 5 月發現，它有一個公開的結帳端點，**不用登入就能決定要執行哪個內部方法**，而且沒有權限檢查（CVE-2026-47100）。攻擊者拿它來改外掛的全域設定，在「外部腳本」欄位裡塞進一段假的 Google Tag Manager。

那段程式碼長得跟正常的追蹤碼很像，混在店家真正的追蹤碼旁邊。實際上它會載入一支側錄程式，把結帳時輸入的卡號、CVV、帳單資料傳出去。

廠商在接到回報 36 小時內就修好了（3.15.0.3）。但修好之前被寫進去的那段腳本，**不會因為你更新外掛就自己消失**，要自己進設定頁一行一行看。

<figure>
  <img src="/blog/2026-10-28-php-woocommerce-security-checklist/02-checkout-skimmer.png" alt="窗仔拿著放大鏡，發現結帳櫃台的收銀機上一排便條紙裡，有一張接著細線通往窗外，標著「假腳本」" loading="lazy" />
  <figcaption>側錄程式最喜歡躲在你以為是追蹤碼的地方。</figcaption>
</figure>

### 上傳功能變後門：Wholesale Lead Capture

另一個是 WooCommerce Wholesale Lead Capture，一個批發客戶申請外掛。

它的檔案上傳處理**沒有檢查檔案類型**（CVE-2026-27540，CVSS 9.8）。攻擊者不用登入，直接上傳一支 `shell.php`，網站就整個被接管了。Wordfence 說，從 6 月開始他們就擋下了超過十萬次攻擊嘗試。

這種後門通常會躲在 `wp-content/uploads/` 裡。那個資料夾本來應該只放圖片，**出現 `.php` 檔就是警訊。**

<figure>
  <img src="/blog/2026-10-28-php-woocommerce-security-checklist/03-uploads-php.png" alt="窗仔拿放大鏡趴在一個寫著 uploads 的紙箱前，從一堆相片裡拉出一個標著紅色「.php」、長著小惡魔尾巴的檔案" loading="lazy" />
  <figcaption>放照片的箱子裡，不應該有會執行的東西。</figcaption>
</figure>

---

## 攻擊者也在用 AI 了

以前我們會覺得：「我的網站這麼小，誰會來打？」

這個說法越來越站不住了。

CrowdStrike 報告，9 月韓國金融機構遭到的攻擊中，有人使用一套叫 **ARTEX** 的 AI 滲透測試工具。日本 GMO 的資安部門也說，在攻擊日本企業的事件裡發現了它的痕跡。這類工具可以自己找漏洞、規劃入侵路徑、執行攻擊。

它不會挑你是大公司還是小商店。它只會一扇門一扇門試，看哪一扇的鎖是舊的。

**當攻擊變成自動化，「我太小不會被盯上」就不再是一種保護。**

---

## 看到外洩消息，先查證再轉

最後講一個比較少人提的面向。

2025 年 4 月，有駭客在論壇上宣稱拿到「WooCommerce 440 萬筆客戶資料」，很多資安新聞跟著報。後來 WooCommerce 比對後說明，這批資料**不是從 WooCommerce.com 或任何 Automattic 服務外洩的**，看起來是一個專門收集電商網站公開資訊再轉賣的服務整理出來的。

資安圈的消息常常是這樣：一開始的版本最聳動，真相要過幾天、甚至幾週才會出來。

身為工程師，我們聊這些事很正常，也應該聊。但要公開說「某家公司被駭了」「某家公司的外掛很舊」，最好等到有官方說明或可信的調查報告。**沒證實的消息，轉出去就收不回來；就算你是好意提醒，也可能傷到人，甚至替自己惹上麻煩。**

---

## 經營 PHP／WordPress 電商，這週就做這五件事

1. **確認主機上的 PHP 版本。** 用主機面板或 `php -v` 確認，不要只看 HTTP header。低於 8.2.35／8.3.36／8.4.27／8.5.12 就排更新；還在 8.1 以下的，該規劃升級了。
2. **盤點外掛，刪掉不用的。** 停用不等於安全，沒在用的外掛直接移除。剩下的確認都在更新，好幾年沒更新的外掛，要找替代方案。
3. **檢查 uploads 有沒有 `.php`。** 用主機設定禁止 `wp-content/uploads/` 執行 PHP，再搜一次裡面有沒有可疑的 `.php` 檔。
4. **看一遍結帳頁和「外部腳本」設定。** 有不認得的追蹤碼、不認得的網域，就要追到底是誰加的。
5. **金鑰不要放進程式碼庫。** 資料庫密碼、API key 放環境變數或密鑰管理服務。只要懷疑外洩過，就全部換掉。

如果你的網站是外包做的，把這五點直接丟給接手的工程師問一遍。答不出來，就是該找人看的時候了。

---

我自己也在幫家裡做 WordPress 網站，這份清單我會先拿去自己的主機跑一遍。

你也找時間看一下吧，從第一點開始就好。

## 參考資料

- [PHP2Shell Checker: 59% Show a Pre-Fix PHP Version（Brandefense）](https://brandefense.io/blog/php2shell-php-rce-cve-2026-109618-109619/)
- [PHP Security Release on 21 October 2026: What WordPress Site Owners Need to Do（Codeable）](https://www.codeable.io/blog/php-vulnerability-cve-2026-109618/)
- [Critical FunnelKit vulnerability threatens 40,000+ WooCommerce checkouts（Sansec）](https://sansec.io/research/funnelkit-woocommerce-vulnerability-exploited)
- [Attackers Exploit WooCommerce Wholesale Lead Capture Flaw to Plant PHP Web Shells（The Hacker News）](https://thehackernews.com/2026/09/attackers-exploit-woocommerce-wholesale.html)
- [Japan internet giant GMO says hackers posted stolen customer data（TechCrunch）](https://techcrunch.com/2026/10/27/japan-internet-giant-gmo-says-hackers-posted-stolen-customer-data/)
- [Hackers Claim WooCommerce Breach Exposing 4.4 Million Customer Records（GBHackers）](https://gbhackers.com/hackers-claim-woocommerce-breach/)
