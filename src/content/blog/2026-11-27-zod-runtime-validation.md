---
title: 'TypeScript 型別只管到編譯：用 Zod 在執行時把關資料'
description: 'TypeScript 的型別寫得再漂亮，API 真的回了奇怪的東西，它也攔不住。Zod 讓你寫一份規格，同時拿來在執行時檢查資料、又自動產生 TS 型別。這篇用白話整理 Zod 是什麼、怎麼寫、常用在哪裡，還有我踩過的一個坑。'
pubDate: 2026-11-27
category: 'frontend'
heroImage: '/blog/2026-11-27-zod-runtime-validation/cover.png'
draft: false
---

寫 TypeScript 久了，很容易有一種錯覺：型別都定義好了，資料就一定長那樣。

其實不是。TypeScript 只在**編譯的時候**檢查，程式一旦跑起來，型別就全部消失了。後端 API 回了一個字串而不是數字、少了一個欄位、多了一個你沒想到的值，TypeScript 完全不會知道，錯誤會一路流進畫面，最後變成一個很難追的 bug。

**Zod** 就是用來補這個洞的：你寫一份「資料應該長什麼樣子」的規格（schema），程式執行時拿真正的資料去對，不合就擋下來，還會告訴你哪個欄位、哪裡不對。

## TypeScript 管不到的地方

<figure>
  <img src="/blog/2026-11-27-zod-runtime-validation/01-compile-vs-runtime.png" alt="左邊窗仔在工廠設計圖上蓋章，右邊窗仔站在輸送帶旁，用尺一個一個量真的送過來的箱子" loading="lazy" />
  <figcaption>TypeScript 檢查的是設計圖，Zod 檢查的是真的送進來的貨。</figcaption>
</figure>

```ts
type User = {
  id: number
  name: string
}

const res = await fetch('/api/user/1')
const user: User = await res.json() // TypeScript 相信你，不會檢查
console.log(user.id + 1) // 如果後端回的是 "1"，這裡會變成 "11"
```

`res.json()` 回來的東西，TypeScript 只能「相信」它是 `User`。這一行寫錯了編譯器也不會叫，因為它根本看不到執行時的資料。

外部進來的資料都有這個問題：API 回應、表單輸入、URL 參數、localStorage、設定檔。這些就是 Zod 最該出場的地方。

## 寫一份規格，同時拿到型別

```ts
import { z } from 'zod'

const User = z.object({
  id: z.number(),
  name: z.string().min(1, '姓名必填'),
  email: z.email('Email 格式不對'),
  role: z.enum(['admin', 'member']),
  age: z.number().int().optional(),
})

// 從規格直接產生 TypeScript 型別，不用再寫一次
type User = z.infer<typeof User>
```

這是我覺得 Zod 最好用的地方：**規格只寫一次**。檢查用的是它，型別也是從它推出來的，不會發生「型別改了、檢查忘了改」的情況。

<figure>
  <img src="/blog/2026-11-27-zod-runtime-validation/02-one-schema.png" alt="窗仔拿著一張規格表，規格表分出兩條箭頭，一條通往寫著型別的盒子，一條通往寫著檢查的關卡" loading="lazy" />
  <figcaption>一份規格，型別和檢查都從這裡來。</figcaption>
</figure>

## 拿資料去對：safeParse 和 parse

```ts
const result = User.safeParse(data)

if (!result.success) {
  console.log(result.error.issues)
  // [
  //   { path: ['name'], message: '姓名必填' },
  //   { path: ['email'], message: 'Email 格式不對' },
  //   { path: ['role'], message: 'Invalid option: expected one of "admin"|"member"' },
  // ]
  return
}

result.data // 這裡的型別就是 User，而且已經確定是對的
```

- `safeParse`：不會丟例外，回傳 `success` 讓你自己判斷。大部分情況我都用這個。
- `parse`：不合就直接丟例外。適合「錯了就不該繼續」的地方，例如程式啟動時讀設定檔。

錯誤訊息會帶 `path`，告訴你是哪個欄位出問題，表單要把錯誤顯示在對應欄位旁邊時很方便。想快速看懂錯在哪，也可以用 `z.prettifyError(result.error)` 印出一段比較好讀的文字。

另外，`z.object` 預設會把規格裡沒寫的欄位拿掉，`result.data` 只會留下你定義過的欄位。如果想反過來「多一個欄位就算錯」，改用 `z.strictObject`。

## 常用在哪裡

**API 回應**：資料一進來就先過一次 Zod，格式不對就在這一層擋掉，畫面拿到的一定是乾淨的資料。後端改了欄位沒通知，你會第一時間在錯誤紀錄裡看到，而不是等使用者回報畫面怪怪的。

**表單**：同一份規格可以拿來做前端的欄位檢查，訊息直接寫在規格裡。很多表單套件（例如 VeeValidate、React Hook Form）都能接 Zod。

**URL 參數**：網址上的參數一律是字串，`z.coerce` 可以順便幫你轉型、給預設值：

```ts
const Query = z.object({
  page: z.coerce.number().int().min(1).default(1),
})

Query.parse({ page: '3' }) // { page: 3 }
Query.parse({})            // { page: 1 }
```

**設定檔、內容檔**：其實你可能早就在用 Zod 了。像 Astro 的內容集合（content collections）就是用 Zod 定義文章的 frontmatter，欄位寫錯，`npm run build` 直接失敗。我這個部落格就是這樣，標題少打或分類打錯字，根本發布不出去。

## 我踩過的坑：白名單太嚴，整包都被擋掉

有一次在本機開發，一份系統設定的 API 回應突然整包都沒載進來，畫面上所有依賴設定的檢查全部失效，但也沒有明顯的錯誤畫面。

查了半天才發現，回應的規格裡有一個欄位用 `z.enum([...])` 列了允許的代碼清單，而我的假資料多放了兩筆清單裡沒有的代碼。**陣列裡只要有一個值不合，整個 `safeParse` 就是失敗**，結果是整包資料都被丟掉。

```ts
const Settings = z.object({
  codes: z.array(z.enum(['A', 'B'])),
})

Settings.safeParse({ codes: ['A', 'C'] }).success // false，整包都失敗
```

<figure>
  <img src="/blog/2026-11-27-zod-runtime-validation/03-strict-gate.png" alt="窗仔守在一道閘門前，一整箱貨物因為裡面混了一顆不一樣形狀的積木，整箱被擋在門外" loading="lazy" />
  <figcaption>一個值不合，整箱都進不來。</figcaption>
</figure>

事後的做法有兩個方向，看情況選：

- 那兩筆代碼本來就該存在：把它們補進規格的清單，這是我最後的做法。
- 清單本來就會一直長：不要用 `z.enum` 鎖死，改成 `z.string()`，在後面的邏輯再判斷認不認得。

學到的事情是：Zod 擋得越嚴，資料越乾淨，但**失敗時一定要有地方把錯誤印出來**。不然它只是安靜地回了 `success: false`，你會以為是別的地方壞了。

## 什麼時候不用

Zod 不是每個地方都要加。自己程式內部傳來傳去的資料，TypeScript 已經管得到，再包一層 Zod 只是多做工。我的原則很簡單：**資料是從程式外面進來的，才需要 Zod**。

## 結語

TypeScript 和 Zod 不是二選一。TypeScript 負責寫程式時不出錯，Zod 負責執行時資料不出錯。兩個搭起來，加上 `z.infer` 讓規格只寫一次，維護起來輕鬆很多。

如果你的專案常常遇到「後端資料怪怪的，但不知道從哪裡開始壞」，從 API 回應那一層先加上 Zod，會是 CP 值很高的一步。
