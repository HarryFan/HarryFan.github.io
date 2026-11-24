---
title: '他連我買什麼都知道，為什麼還是假客服？工程師能在訂單系統裡做的 5 道防線'
description: '詐騙電話能念出你的姓名、商品和金額，不代表他是客服。我把「一張白板」這集的內容，換成工程師的角度寫一次：訂單資料為什麼會被拿去詐騙，以及我們在後台權限、欄位遮罩、匯出紀錄、外洩通知和 App 查證入口上，可以先做好哪些事。'
pubDate: 2026-11-20
category: 'frontend'
heroImage: '/blog/2026-11-20-fake-customer-service-order-data/cover.png'
draft: false
---

> 這篇的官方建議整理自數位發展部與資通安全署 2026/11/11 的說明（以 [CIO Taiwan](https://www.cio.com.tw/122623/)、[NOWnews](https://www.nownews.com/news/6891817) 的報導為準）。文中的收據、來電與程式碼都是虛構範例，不指涉任何特定商家，也不是法律意見。

上禮拜我在 YouTube 頻道「一張白板」做了一集兩分半的短片：**他連我買什麼都知道，為什麼還是假客服？**

<figure>
  <iframe src="https://www.youtube-nocookie.com/embed/k2KmZeqajUI?rel=0" title="他連我買什麼都知道，為什麼還是假客服？" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  <figcaption>他連我買什麼都知道，為什麼還是假客服？（一張白板）</figcaption>
</figure>

影片是講給一般人聽的，結論只有一句：**知道資料，不等於證明身分；查證入口，要自己選。**

但做完這集，我一直在想另一半的問題。電話那頭能念出姓名、商品、金額，這些資料是從哪裡來的？身為每天在寫後台、寫訂單頁的工程師，我們能不能讓資料就算外洩了，也比較難被拿來騙人？

這篇就是那一半。

---

## 先搞懂：為什麼「真資料」最好騙

假客服的劇本通常是這樣：

1. **先念出真資料**：你的名字、昨天買的耳機、金額 1,290 元。你的戒心一下就降了。
2. **再製造急迫感**：「系統設定錯誤，會變成分期重複扣款。」
3. **最後要你操作**：去 ATM、開網銀「解除設定」，或點他傳來的連結。

前兩步只是鋪陳，真正要命的是第三步。而第一步之所以有效，是因為**我們的系統，把「完成交易的資料」和「證明身分的資料」混在一起了**。

收據上的姓名、商品、電話，本來是為了出貨和對帳。可是對消費者來說，「對方知道我的訂單」聽起來就像「對方是店家」。詐騙集團就是利用這個落差。

<figure>
  <img src="/blog/2026-11-20-fake-customer-service-order-data/01-receipt-copy.png" alt="窗仔拿著一張收據，旁邊一個戴面具的人拿著同一張收據的影本在念內容" loading="lazy" />
  <figcaption>資料對得上，只代表對方手上有一份影本。</figcaption>
</figure>

根據數位部 11/11 的說明，今年 7 月以來已有十多家國內企業與平台受到攻擊，影響超過百萬筆個資，外洩內容包含姓名、電話和購買紀錄。攻擊手法包括利用已知漏洞，以及**透過高權限 API 大量撈取資料**。

最後這點，就是工程師最使得上力的地方。

---

## 防線 1：後台帳號不是每個都要看到全部

最常見的情況：後台只有「管理員」跟「一般帳號」兩種角色，一般帳號就能看全部訂單、全部欄位。

但實際上：

- **出貨人員**要收件人、地址、電話，不需要付款資訊。
- **行銷人員**要商品、數量、地區，不需要姓名跟電話。
- **客服人員**要能查單，但一次只需要看一筆。

所以權限不該只切到「頁面」，要切到「欄位」。我習慣在 API 回傳前，依角色決定欄位：

```ts
type Role = 'shipping' | 'marketing' | 'support' | 'admin'

const ORDER_FIELDS: Record<Role, (keyof Order)[]> = {
  shipping:  ['id', 'items', 'recipientName', 'phone', 'address'],
  marketing: ['id', 'items', 'amount', 'region', 'createdAt'],
  support:   ['id', 'items', 'amount', 'recipientName', 'phoneMasked', 'status'],
  admin:     ['id', 'items', 'amount', 'recipientName', 'phone', 'address', 'status', 'createdAt'],
}

export function toOrderDto(order: Order, role: Role) {
  return Object.fromEntries(
    ORDER_FIELDS[role].map((key) => [key, order[key]]),
  )
}
```

重點是**白名單**：新增欄位時，預設誰都看不到，要明確加進去才會出現。反過來用黑名單擋，遲早會漏。

前端這邊也一樣：表格欄位跟著後端回傳的資料長，不要在前端拿到全部再用 `v-if` 藏起來。藏起來的資料，打開開發者工具還是看得到。

## 防線 2：畫面上能遮就遮

客服查單的時候，不一定要看到完整電話。

```ts
export function maskPhone(phone: string) {
  // 0912345678 → 0912***678
  return phone.replace(/^(\d{4})\d{3}(\d{3})$/, '$1***$2')
}

export function maskName(name: string) {
  // 王小明 → 王○明；王明 → 王○
  if (name.length <= 2) return name[0] + '○'
  return name[0] + '○'.repeat(name.length - 2) + name.at(-1)
}
```

真的需要完整資料時，做一個「顯示完整」按鈕，點了才去後端拿，而且**這個動作要記錄下來**。這會帶到下一道防線。

## 防線 3：匯出和大量查詢要留紀錄、設上限

外洩很少是有人一筆一筆抄，多半是一次拉走一大包。所以：

- **匯出 CSV 要記錄**：誰、什麼時間、匯出哪些欄位、幾筆。
- **列表 API 要有上限**：分頁大小鎖住，不要讓一個 `?limit=999999` 就能拿走全部。
- **異常要通知**：同一個帳號短時間查詢量暴增、半夜匯出、從沒看過的 IP 登入，都該通知負責人。

```ts
await auditLog.write({
  actor: user.id,
  action: 'order.export',
  fields: requestedFields,
  rowCount: rows.length,
  ip: req.ip,
  at: new Date(),
})

if (rows.length > EXPORT_ALERT_THRESHOLD) {
  await notifySecurityChannel(`${user.name} 匯出 ${rows.length} 筆訂單`)
}
```

整合用的 API 金鑰也是同樣道理。數位部的建議裡特別提到要換掉可能外洩的金鑰、密碼和 token，改用短效憑證。給第三方的金鑰，權限開到「剛好夠用」就好，不要因為方便就給一把能讀全部訂單的萬能鑰匙。

<figure>
  <img src="/blog/2026-11-20-fake-customer-service-order-data/02-least-privilege.png" alt="窗仔站在一排抽屜前，每個角色只拿到自己那一格的鑰匙" loading="lazy" />
  <figcaption>每個角色只拿到需要的那一格。</figcaption>
</figure>

## 防線 4：少收、少留

最安全的資料，是一開始就沒收的資料。

- 結帳表單上，每個欄位都問一次：**不填這格，能不能出貨？**能就拿掉，或改成選填。
- 訂單完成、退貨期過了以後，收件人電話跟地址還需要留多久？訂好保存期限，到期刪除或去識別化。
- 外包廠商（物流、客服系統、行銷工具）拿到的資料，也要照同樣標準，合約結束要銷毀。

這些不只是工程題，也牽涉公司的營運流程。但工程師可以先把「保存期限」做成排程任務，讓刪除變成預設，而不是靠人記得。

## 防線 5：通知要讓人知道怎麼做

如果真的發生外洩，通知的寫法會直接影響客戶會不會被騙。

數位部這次提出的處置原則之一，是 72 小時內通知當事人，**並提醒可能的詐騙手法**；資安署也建議初步掌握範圍就可以先發通知，不必等全部調查完。

一封只寫「造成不便，深感抱歉」的信，對客戶沒有幫助。我會希望通知至少包含：

- **已知的影響範圍**：哪些欄位可能外洩，例如姓名、電話、訂單內容。沒外洩的也講清楚，例如信用卡號。
- **可能的詐騙劇本**：「有人可能冒充本公司客服，說出您的訂單內容。」
- **我們不會做的事**：「本公司不會要求您操作 ATM 或網路銀行來解除扣款，也不會透過 LINE 辦理退款。」
- **自己查證的入口**：請客戶打開 App 或自行輸入官網網址查詢，**不要附上可點的連結**。

最後一點很重要。外洩通知信如果附一個「點此查詢」的按鈕，等於教客戶「看到信就點連結」，下一封假通知信就更好騙了。

<figure>
  <img src="/blog/2026-11-20-fake-customer-service-order-data/03-self-check.png" alt="窗仔放下電話，自己打開手機裡的購物 App 查訂單，小機器人在旁邊比讚" loading="lazy" />
  <figcaption>查證入口要自己選：掛掉電話，打開自己的 App。</figcaption>
</figure>

---

## 加分題：在 App 裡給客戶一個查證的地方

如果你在做會員中心或 App，可以考慮一個小功能：**「客服聯絡紀錄」**。

真的客服打電話或發訊息之前，在系統裡建立一筆聯絡紀錄。客戶接到電話時，打開 App 就能看到「目前有沒有客服正在聯絡你」。App 裡查不到，就代表不是我們打的。

這比在公告裡寫一百次「請小心詐騙」還有用，因為它把「查證入口要自己選」這件事，直接做成產品的一部分。

---

## 寫在最後

做這集影片的時候，我刻意用虛構的收據和來電，不點名任何一家。因為重點不是誰漏了，而是**當資料已經在外面流動，我們的系統和通知，能不能讓客戶少被騙一次**。

給一般使用者的版本，影片裡已經講完了：掛斷、打開自己的 App、不跟著陌生來電操作，有疑慮打 165。

給工程師的版本，大概就是這 5 道防線：

1. 權限切到欄位，用白名單。
2. 畫面能遮就遮，顯示完整要留紀錄。
3. 匯出和大量查詢要記錄、設上限、有警示。
4. 少收、少留，保存期限做成排程。
5. 外洩通知要寫清楚影響範圍、詐騙劇本和自己查證的入口。

如果你身邊有常網購的朋友，也歡迎把[影片](https://www.youtube.com/watch?v=k2KmZeqajUI)傳給他。「一張白板」會繼續用白板把資安和網頁技術講白話，有想看的主題，歡迎留言告訴我。
