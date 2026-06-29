---
title: '在 Zeabur 上讓 OpenClaw 支援聯網：5 分鐘搞定 web_search'
description: 'OpenClaw 部署到 Zeabur 後問天氣、新聞都失敗，跳出 web_search is disabled。原因不是 OpenAI Key，而是少了搜尋供應商。實測用 Tavily 免費方案，三步驟開啟 OpenClaw 的網路搜尋功能。'
pubDate: 2026-06-30
heroImage: '/blog/2026-06-30-zeabur-openclaw-web-search-tavily.png'
tags: ['OpenClaw', 'Zeabur', 'Tavily', 'AI部署', '網路搜尋']
---

把 OpenClaw 部署到 Zeabur 後，問它「台灣今天天氣如何」「最新科技新聞」，結果一律失敗，後台跳出這行：

```
[tools] web_search failed: web_search is disabled or no provider is available
```

明明已經設好 `OPENAI_API_KEY` 了，為什麼還是不能查即時資訊？

## 第一個誤會：OpenAI Key 不等於聯網能力

這是最多人踩的坑。`OPENAI_API_KEY` 只負責讓模型「推理、回答」，它本身**不包含搜尋網路**的功能。

OpenClaw 的 `web_search` 工具是獨立的，需要外接第三方搜尋服務。推理跟搜尋是兩件事，要分開設定。

## 看一下 OpenClaw 支援哪些搜尋供應商

在終端機跑：

```bash
openclaw infer web providers
```

會看到支援的供應商，預設全部 `configured: false`：

- **brave** — 需要 Brave Search API Key
- **tavily** — 需要 Tavily API Key
- **searxng** — 需要自架 SearXNG 服務的 URL

預設沒設任何一個，所以每次 `web_search` 都掛掉。

## 解法：申請 Tavily（最省事）

Tavily 有免費方案（每月 1,000 次搜尋），不用自己架伺服器，5 分鐘搞定。

### 步驟一：拿 Tavily API Key

1. 到 [app.tavily.com](https://app.tavily.com) 註冊
2. 登入後在 Overview 頁面找到 **API Keys** 區塊
3. 預設有一把 `default` Key，開頭是 `tvly-dev-...`
4. 點複製圖示，把完整 Key 複製起來

### 步驟二：在 Zeabur 加環境變數

1. 進 Zeabur 後台，點 OpenClaw 服務
2. 點「環境變數」分頁
3. 新增一筆：
   - **Name**：`TAVILY_API_KEY`
   - **Value**：貼上剛剛的 `tvly-dev-xxxxxxxxx`
4. 儲存

### 步驟三：重啟服務

在 Zeabur 點「重啟目前版本」，等它重啟完。OpenClaw 會自動讀 `TAVILY_API_KEY` 並啟用網路搜尋。

## 驗證

重啟後回聊天介面問需要即時資訊的問題：

- 「台灣今天天氣如何？」
- 「最新科技新聞有哪些？」

AI 能答出即時結果，就代表聯網成功了。

## 其他供應商選項

不想用 Tavily 也可以：

- **Brave Search API** — 環境變數 `BRAVE_SEARCH_API_KEY`，免費每月 2,000 次，但需信用卡驗證
- **SearXNG** — 環境變數 `SEARXNG_BASE_URL`，要自架伺服器，適合進階玩家

## 重點整理

- AI 推理（對話）和網路搜尋是**兩個獨立功能**，要分開設定
- `OPENAI_API_KEY` ≠ 聯網能力
- 要聯網，得另外設一個專用搜尋服務的 API Key
- Tavily 最快，5 分鐘內可完成
- 環境變數設好 + 重啟服務後，聯網功能就完全自動生效
