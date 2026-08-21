---
title: 'Weebly 要停止服務了？搬到 WordPress 前先做這份備份清單'
description: 'Weebly 在包含台灣在內的 67 個國家逐步停止服務。這篇整理官方期限、資料備份、Weebly 轉 WordPress 的幾種做法，以及網域、SEO、表單、商店資料切換時最容易漏掉的地方。'
pubDate: 2026-08-22
heroImage: '/blog/2026-08-22-weebly-to-wordpress-migration-note/cover.png'
category: 'frontend'
---

今天在 Threads 看到有人說 Weebly 即將停止服務，下面接著就是「免費搬家」、「一鍵套版」、「WordPress 主機」之類的服務文。

第一反應是：這種文不能只看標題。

我去查了一輪官方文件，重點是這樣：Weebly 不是全世界同一天消失，而是會在 **67 個國家逐步終止服務**，名單裡有台灣。官方公告寫到幾個關鍵日期：

<table class="qa-table">
	<thead>
		<tr>
			<th>時間</th>
			<th>影響</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-label="時間">2026-06-29</td>
			<td data-label="影響">受影響地區的帳號不能再發布新頁面</td>
		</tr>
		<tr>
			<td data-label="時間">2026-09-27</td>
			<td data-label="影響">現有 Weebly 網站會被取消發布</td>
		</tr>
		<tr>
			<td data-label="時間">2026-12-26</td>
			<td data-label="影響">還能登入帳號搬資料、搬網域；之後就不能登入 Weebly 帳號</td>
		</tr>
	</tbody>
</table>

所以這不是「明天網站就爆炸」，但也不是可以拖到年底再想。真正要怕的不是頁面今天還在不在，而是你有沒有拿到一份完整、可驗證、能重建的資料。

這篇先不談任何搬家服務怎麼賣，只整理一份我會怎麼把 Weebly 搬到 WordPress 的實戰筆記。

## 先講結論

如果你只是五到十頁的公司形象網站，不要迷信自動轉移。最快、最乾淨的做法通常是：

1. 把 Weebly 站整站備份下來
2. 把每個頁面的文字、圖片、表單、SEO title、description 另外整理成清單
3. 在 WordPress 重建版型
4. 把網址結構盡量保留
5. 最後再切網域和設定 301 轉址

如果你有大量部落格文章，可以用 WordPress.com 官方文件提到的 Weebly XML / WXR 路線，把內容匯入 WordPress。

如果你是電商，事情要拆開處理：頁面、商品、訂單、會員、付款、物流、稅務、Email 名單都不是同一份備份可以解決。

## 第一步：不要先搬，先備份

Weebly 官方提供兩種資料取得方式。

第一種是帳號層級的資料下載：到 `Account Settings > My Data > Download My Data`，先把帳號資料下載回來。

第二種是單一網站封存：進入網站編輯器，到 `Settings > General`，找到 `Archive` 區塊，輸入 Email，Weebly 會寄一個 ZIP 下載連結給你。

但這裡有一個很重要的限制：**這個 ZIP 不是完整搬家包**。

官方備份文件有特別提醒，ZIP 可以拿來離線保存或到其他主機重建網站，但不能匯回 Weebly；而且 Blog 頁、商店頁不會包含在這份匯出裡，因為它們依賴 Weebly 的資料庫。有些元件，例如聯絡表單、輪播，也不一定能在 Weebly 編輯器外正常運作。

所以備份不能只按一個下載按鈕就結束。你至少要再補這份清單：

- 所有公開頁面網址
- 每頁標題、段落文字、圖片
- 每頁 SEO title、meta description
- 導覽列結構
- 頁尾資訊
- 表單欄位、收件人、成功送出訊息
- 嵌入碼，例如 Google Analytics、Meta Pixel、客服、地圖
- 部落格文章清單
- 商品、訂單、庫存、優惠券
- 會員、訂閱者、Email 名單
- DNS 設定截圖，特別是 Email 用的 MX、SPF、DKIM、DMARC

我會把這些整理成一份 Google Sheet。不是為了好看，是因為搬家到一半一定會有人問：「這頁原本網址是什麼？」「這個表單原本寄給誰？」「這張圖去哪裡了？」沒有表格就會靠記憶力救火。

![窗仔拿著搬站清單，逐項檢查網址、SEO、表單、圖片、商品、訂單和 DNS，旁邊的舊網站資料正被整理進新網站箱子](/blog/2026-08-22-weebly-to-wordpress-migration-note/01-chuangzai-migration-checklist.png)

## 第二步：選 WordPress 路線

「搬到 WordPress」其實有兩種意思。

一種是 **WordPress.com**：主機、更新、安全、備份由 WordPress.com 平台處理，管理成本低，但外掛和客製化能力取決於方案。

另一種是 **自架 WordPress**：你自己買主機，安裝 WordPress.org 版本，可以完整使用外掛、佈景主題、WooCommerce、客製程式，但主機維護、安全、備份也都要自己負責。

這兩條路的內容匯入概念類似，但後續管理成本不同。

我自己的判斷會是：

<table class="qa-table">
	<thead>
		<tr>
			<th>網站類型</th>
			<th>建議</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-label="網站類型">小型形象站</td>
			<td data-label="建議">直接在 WordPress 重建，別硬轉版型</td>
		</tr>
		<tr>
			<td data-label="網站類型">有大量部落格</td>
			<td data-label="建議">先用 WXR 匯入文章，再人工整理版面</td>
		</tr>
		<tr>
			<td data-label="網站類型">電商網站</td>
			<td data-label="建議">商品、訂單、會員、金物流獨立規劃，不要只當成頁面搬家</td>
		</tr>
		<tr>
			<td data-label="網站類型">很依賴 Weebly 拖拉版型</td>
			<td data-label="建議">當成重新設計專案，不要期待 1:1 自動還原</td>
		</tr>
	</tbody>
</table>

## 第三步：把 Weebly 內容轉成 WordPress 能吃的格式

WordPress.com 官方文件提供三種路線：

1. 複製貼上
2. 使用支援 Weebly 匯入的外掛
3. 建立 Weebly XML 檔，再用 WordPress 匯入器匯入

小站用第一種就好。大型站才值得嘗試第三種。

比較常見的做法是用 `weeblytowp.com` 這類轉換工具，把 Weebly 網站轉成 WordPress WXR XML 檔。WordPress.com 文件裡的流程是：

1. 先在 Weebly 的 `Settings > General` 關閉 SSL
2. 到 `weeblytowp.com`
3. 輸入 Weebly 網站網址
4. 匯出格式選 WXR
5. 如果頁面也要匯入，記得勾選包含 pages
6. 下載產生的 XML 檔
7. 到 WordPress 後台 `Tools > Import`
8. 選 WordPress 匯入器
9. 上傳 XML
10. 指派作者
11. 開始匯入

自架 WordPress 也是類似流程。WordPress.org 的文件寫法是：到 `Tools > Import`，在 WordPress 匯入器底下安裝或執行 importer，上傳 WXR 檔，然後匯入文章、留言、分類；如果要抓附件，記得勾選下載並匯入附件。

但我會先提醒一件事：**不要把匯入成功當成搬家完成**。

WXR 比較像是把內容資料搬過去，不是把整個網站原封不動搬過去。佈景主題、版面、表單邏輯、第三方小工具、自訂網域、追蹤碼、個人設定都要重新處理。

## 部落格：Weebly ZIP 通常救不到

如果你的 Weebly 有部落格，這是最容易踩雷的地方。

Weebly 的網站封存 ZIP 不包含 Blog 頁，因為 Blog 文章存在 Weebly 的資料庫裡，不是靜態 HTML 檔案而已。

所以部落格有三種處理方式：

第一種，文章少的話手動搬。逐篇複製標題、日期、內文、圖片、分類、slug。慢，但最穩。

第二種，用 Weebly to WordPress 的 WXR 工具匯出文章，再匯入 WordPress。匯入後要抽查圖片、內部連結、分類、日期、留言。

第三種，文章非常多或格式很亂，就寫爬蟲或轉檔腳本，把公開頁面解析成 WordPress XML。這比較適合工程師或有預算的網站，否則維護腳本的成本可能比手動整理還高。

我會抓三種頁面做抽查：

- 最新文章
- 最舊文章
- 圖片最多、嵌入最多的一篇文章

這三種都正常，才比較能相信整批匯入結果。

## 電商：商品和訂單要分開匯

如果 Weebly 是商店，不要只備份頁面。

Weebly 的商品可以透過 CSV 匯出。官方文件提到，商品匯出後會變成 CSV，每一列是一個品項；如果商品有尺寸、顏色這類選項，會依不同組合拆成多列。

訂單也可以從 Orders 匯出，格式可以選 CSV，或 QuickBooks 用的 IIF。這份資料很重要，因為它是歷史交易紀錄，不一定會完整搬進 WooCommerce。

搬到 WordPress / WooCommerce 時，我會把電商拆成這幾塊：

<table class="qa-table">
	<thead>
		<tr>
			<th>資料</th>
			<th>做法</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-label="資料">商品</td>
			<td data-label="做法">從 Weebly 匯出 CSV，整理欄位後匯入 WooCommerce</td>
		</tr>
		<tr>
			<td data-label="資料">商品圖片</td>
			<td data-label="做法">不要只相信 CSV 裡的圖片 URL，最好另外下載原圖</td>
		</tr>
		<tr>
			<td data-label="資料">訂單</td>
			<td data-label="做法">匯出保存，必要時再評估是否匯入 WooCommerce</td>
		</tr>
		<tr>
			<td data-label="資料">會員</td>
			<td data-label="做法">確認 Weebly 是否可匯出，並注意個資與同意狀態</td>
		</tr>
		<tr>
			<td data-label="資料">付款</td>
			<td data-label="做法">在新站重新串接金流</td>
		</tr>
		<tr>
			<td data-label="資料">物流</td>
			<td data-label="做法">在新站重新設定運費、配送方式</td>
		</tr>
		<tr>
			<td data-label="資料">稅務</td>
			<td data-label="做法">在新站重新設定稅率，不要沿用猜測</td>
		</tr>
		<tr>
			<td data-label="資料">優惠券</td>
			<td data-label="做法">逐項重建，順便淘汰過期活動</td>
		</tr>
	</tbody>
</table>

最務實的做法通常是：**商品可以匯，訂單先封存，付款物流重設。**

## 網域：先確認是在 Weebly 買，還是只連到 Weebly

網域和網站是兩件事。

你可能是在 Weebly 買網域，也可能是在 GoDaddy、Namecheap、Cloudflare、PChome、戰國策或其他註冊商買網域，只是把 DNS 指到 Weebly。

先確認這件事，因為流程不同：

<table class="qa-table">
	<thead>
		<tr>
			<th>情況</th>
			<th>做法</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-label="情況">網域在 Weebly 註冊</td>
			<td data-label="做法">需要解除 registrar lock，取得 EPP authorization code，再到新註冊商發起轉移</td>
		</tr>
		<tr>
			<td data-label="情況">網域在其他註冊商</td>
			<td data-label="做法">不必轉移網域，只要切 DNS 到新 WordPress 主機</td>
		</tr>
		<tr>
			<td data-label="情況">網域有企業信箱</td>
			<td data-label="做法">不要亂改 nameserver，先備份 MX、SPF、DKIM、DMARC</td>
		</tr>
	</tbody>
</table>

Weebly 官方文件也提醒，網域註冊後 60 天內通常不能轉移；如果你在轉移前改了註冊人聯絡資訊，也可能觸發 60 天鎖定。這件事很容易被忽略。

所以我的建議是：**資料先搬、WordPress 新站先做好、DNS 記錄先截圖，最後才切網域。**

不要一開始就急著轉網域。網域轉走了，舊站還沒好，才是最尷尬的停機。

## SEO：不要只求「看起來一樣」

網站搬家最常見的 SEO 問題不是版面跑掉，而是 URL 掛掉。

搬之前先把舊站 URL 全部盤點出來：

- 首頁
- 主要服務頁
- 部落格文章
- 商品頁
- 分類頁
- 高流量落地頁
- 有外部連結導入的頁面

能保留原本 slug 就保留。例如：

```plain
https://example.com/about.html
https://example.com/services.html
https://example.com/blog/my-old-post.html
```

如果 WordPress 新網址真的不同，就要設定 301 redirect。不要讓使用者和 Google 直接撞 404。

切站後我會馬上檢查：

- 首頁能不能正常開
- HTTPS 憑證是否正常
- 舊網址是否 301 到新網址
- 表單是否真的寄得出去
- Google Analytics 是否有收到 page_view
- Google Search Console 是否還驗證成功
- sitemap 是否更新
- robots.txt 沒有擋到正式站
- 圖片是否有遺失
- 手機版導覽是否正常

這些都是搬家當天就要檢查，不是過一週流量掉了才回頭找。

## 我會怎麼排時程

如果網站不大，我會這樣排：

<table class="qa-table">
	<thead>
		<tr>
			<th>天數</th>
			<th>工作</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-label="天數">Day 1</td>
			<td data-label="工作">匯出 Weebly 帳號資料、網站 ZIP、商品／訂單 CSV，建立 URL 清單</td>
		</tr>
		<tr>
			<td data-label="天數">Day 2</td>
			<td data-label="工作">架 WordPress 測試站，選佈景主題，建立主要頁面</td>
		</tr>
		<tr>
			<td data-label="天數">Day 3</td>
			<td data-label="工作">搬文字、圖片、表單、SEO metadata</td>
		</tr>
		<tr>
			<td data-label="天數">Day 4</td>
			<td data-label="工作">匯入部落格或商品，逐頁抽查</td>
		</tr>
		<tr>
			<td data-label="天數">Day 5</td>
			<td data-label="工作">設定 redirects、Analytics、Search Console、備份外掛</td>
		</tr>
		<tr>
			<td data-label="天數">Day 6</td>
			<td data-label="工作">用暫時網址驗收手機版和表單</td>
		</tr>
		<tr>
			<td data-label="天數">Day 7</td>
			<td data-label="工作">降低 DNS TTL，切網域，觀察錯誤</td>
		</tr>
	</tbody>
</table>

電商站不要用七天估。只要牽涉付款、物流、訂單紀錄、會員資料、稅務，就應該當成正式遷移專案處理。

## 搬完後不要立刻刪 Weebly

只要還能登入 Weebly，就先留著。

至少等新站跑過一到兩週，確認搜尋流量、表單、訂單、Email、轉址都正常，再考慮關閉舊服務。因為搬家最怕的不是上線那一刻，而是三天後才發現某個冷門頁面、某個表單、某個商品圖片根本沒搬到。

我的底線是：

- 新站完整備份一份
- Weebly 原始備份保留一份
- DNS 設定截圖保留一份
- 所有 CSV、XML、ZIP 放到雲端硬碟
- 密碼、主機、網域、WordPress 管理員權限整理好

這樣才算真的搬完。

## 參考資料

- [Weebly：Upcoming Changes to Weebly's Global Operations](https://www.weebly.com/app/help/us/en/topics/changes-to-weebly-global-operations)
- [Weebly：Back Up Your Site](https://www.weebly.com/app/help/us/en/topics/back-up-your-site)
- [WordPress.com：Import from Weebly](https://wordpress.com/support/import/import-from-weebly/)
- [WordPress.org：Importing Content](https://developer.wordpress.org/advanced-administration/wordpress/import/)
- [Weebly：Unlock Your Domain and Get the EPP Code](https://www.weebly.com/app/help/us/en/topics/unlock-your-domain-and-get-the-epp-code)
- [Weebly：Import, Export, and Batch Update Items with a CSV File](https://www.weebly.com/app/help/topics/import-export-and-batch-update-products-with-a-csv-file)
- [Weebly：Export Orders](https://www.weebly.com/app/help/us/en/topics/export-your-store-order-history-to-csv-excel-numbers-or-quickbooks)
