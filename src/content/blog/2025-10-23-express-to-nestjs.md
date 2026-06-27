---
title: '前端寫後端的真心話：從 Express 升級成 NestJS 心得'
description: '用 Express 開 API 一開始很爽，專案變大就變痛苦。換成 NestJS 後，那種模組化、controller / service 分離的結構，根本就是給前端工程師設計的後端框架。'
pubDate: 2025-10-23
heroImage: '/blog/2025-10-23-express-to-nestjs.png'
---

## 用 Express 開 API 一開始很爽，後來就變痛苦了

我原本只是個老實寫前端的工程師。有時候前端要串資料、後端又忙，所以就自己開個 Express 伺服器來玩。一開始超爽，開個 `app.js`，加幾個 route，馬上就能跑。那時我心裡想：「後端哪有這麼難？」

結果兩個月後，事情開始走鐘。

## 當專案變大，Express 就變「壓力山大」

專案從三支 API 變成三十支，從一個人維護變成三個人一起改。問題全都浮出來：

- 每個人寫的 API 風格都不一樣
- 想找某個功能在哪裡，要翻半天
- 一個檔案動到三個地方，忘了改就炸掉
- 加 TypeScript 後，錯誤爆成一片
- Swagger 文件自己手動寫，還常忘記更新

Express 的自由度雖然高，但自由到後來變成混亂，根本就是「前期快樂、後期地獄」。

## 然後我遇到 NestJS，心情瞬間平靜了

看到 Leapcell 的文章[《NestJS in 2025》](https://leapcell.io/blog/nestjs-2025-backend-developers-worth-it)，裡面一句話超中肯：

> 「NestJS 幫 Node.js 找回架構的秩序。」

我去試用了一下——這根本是給前端工程師設計的後端框架。它長得很像 Vue 或 Nuxt：一個模組包一個功能，controller 負責接請求、service 處理邏輯、module 負責組起來。就像你在前端寫 component 一樣，畫面是畫面，邏輯是邏輯，不會混在一起。

## 以前用 Express 時長這樣

```javascript
app.post('/login', (req, res) => {
  const { user, pass } = req.body
  const u = db.find(user)
  if (!u) return res.status(401).send('No user')
  if (u.pass !== pass) return res.status(401).send('Wrong pass')
  res.send({ token: jwt.sign({ id: u.id }, 'secret') })
})
```

又臭又長，還全擠在一起。如果回來改個 token 規則，整個檔案都要滾一遍。

## 換成 NestJS 以後

```typescript
@Post('login')
async login(@Body() loginDto: LoginDto) {
  return this.authService.validateUser(loginDto)
}
```

乾淨、短、好讀。所有邏輯都丟去 `authService` 處理，controller 只負責接資料。這就像 Vue 元件裡把邏輯抽出去寫 composable 一樣乾淨。

## 我最愛 NestJS 的三個地方

1. **Swagger 自動生成**：寫好註解，API 文件自己生出來。前端不用再等後端更新文件。
2. **TypeScript 深度整合**：不用每支函式都自己寫型別，NestJS 幫你推斷，少掉超多 `any` 地獄。
3. **架構清楚又好維護**：模組化到爆炸，就算半年沒碰專案，打開還看得懂。

## Express vs NestJS

| | Express | NestJS |
| --- | --- | --- |
| 一開始 | 快、自由、爽 | 稍微要學一下，但規範清楚 |
| 做久了 | 亂、難維護 | 穩定、有架構 |
| 適合 | 小專案、Side project | 正式產品、團隊協作 |
| 型別支援 | 勉強有 | 原生支援 |
| Swagger 文件 | 要自己寫 | 自動幫你生 |
| 團隊合作 | 靠默契 | 框架幫你規範 |

## 不用重寫，NestJS 也能「漸進升級」

最酷的是，你不一定要一次全改。NestJS 可以跟 Express 共存，你可以慢慢把舊 API 搬過去。這點真的超像 Vue 2 → Vue 3，不用怕「一換就要重構整包」。先在新功能試試 NestJS，等熟了再全面轉換。

## 最後一句真心話

如果你是前端工程師、也常自己開 API，那絕對要試試 NestJS。Express 是「我今天想快速搞出個結果」的選擇，NestJS 則是「我想做個能長期維護的產品」的選擇。

> 用 Express 我是在「寫 API」，用 NestJS 我是在「設計系統」。
