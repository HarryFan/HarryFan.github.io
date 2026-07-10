---
title: '從零打造即時聊天室：用 Claude Code 完成 Vue 3 + WebSocket 全端專案'
description: '記錄從 0 到可上線的即時聊天應用——Vue 3 前端、Fastify + WebSocket 後端、PostgreSQL + Redis、完整 E2E 測試、加群退群——以及途中遇到的每一個坑。'
pubDate: 2026-06-27
category: 'ai'
heroImage: '/blog/2026-06-27-im-app-case-study.png'
draft: true
---

## TL;DR

花了約兩週的時間，用 Claude Code 協作完成一個具備即時通訊、群組管理、歷史訊息、已讀回條的聊天應用。前後端從零開始，117 個測試全過，這篇記錄整個過程——包括踩到的坑跟解法。

---

## 為什麼做這個

我想親手驗證一件事：**AI 協作開發（AI-assisted development）能不能真的從頭到尾完成一個有生產品質的專案**，不是 CRUD demo，而是包含 WebSocket、Redis pub/sub、資料庫遷移、測試容器的真實架構。

IM 應用是個好選擇——它幾乎覆蓋了全端工程的所有難點：即時性、持久化、認證、並發，還有一個需要細心設計的 UI。

---

## 技術選型

```
monorepo（npm workspaces）
├── packages/web      Vue 3 + Pinia + Vite + @tanstack/vue-virtual
├── packages/server   Fastify + ws + pg + ioredis
└── packages/shared   共用型別（Message、ServerEvent、ClientCommand）
```

**前端核心決策：**
- `store.rows` 是唯一響應式介面。`messages` Map 用 `markRaw`，每次 mutation 結束做一次 shallowRef swap，驅動 virtualizer 重算，避免 Vue 做深層 diff。
- 待發訊息（optimistic）用特殊 `sortKey` 排到最底，`message.ack` 回來後再依真實 `seq` 重排。
- `useVirtualizer` 必須傳 `computed(() => ({ count, ... }))` 包住整個 options object，單獨 `count: computed(...)` 不會被追蹤——這是跟 `@tanstack/vue-virtual` 整合的最重要細節。

**後端核心決策：**
- 單一 HTTP server 同時掛 Fastify REST 和原生 `ws`，共用一個 pg Pool + Redis。
- WebSocket 握手先於第一個 client command——server 在 buffers 裡暫存訊息，握手完成（DB query）後 replay，避免 resync 被靜默丟棄。
- `seq` 用 Redis `INCR`，冷啟動從 DB `MAX(seq)` 種進去。
- Broadcaster 透過 Redis pub/sub 跨節點廣播，用 `nodeId` 跳過自己已推過的 echo。

---

## 核心挑戰與解法

### 挑戰 1：WebSocket 成員資格快照過時

**問題：** `ConnectionManager` 在握手時從 DB 快照使用者的會話清單，存進 `meta.convIds`。之後透過 REST API 加入的新群組不在快照裡，導致：

1. `history.load` 被拒（`isMember` 檢查失敗）
2. 廣播送不到該 socket（不在 `byConv[groupId]`）

**解法：** 新增 `checkAndJoinConv()` 方法，在 `isMember` 回傳 false 時做 DB fallback，確認成員身份後同步更新 `meta.convIds` 和 `byConv`。所有 handler（`onSend`、`onHistoryLoad`、`onReadAck`、`onRevoke`）都改用這個方法，等於把 membership cache 從「只在握手時建立」改成「lazy 更新」。

```typescript
async checkAndJoinConv(ws: WebSocket, convId: string): Promise<boolean> {
  const m = this.meta.get(ws)
  if (!m) return false
  if (m.convIds.has(convId)) return true          // 快速路徑
  const r = await this.pool.query(                 // DB fallback
    `SELECT 1 FROM conversation_members WHERE conv_id=$1 AND user_id=$2`,
    [convId, m.userId])
  if (!r.rows.length) return false
  m.convIds.add(convId)
  if (!this.byConv.has(convId)) this.byConv.set(convId, new Set())
  this.byConv.get(convId)!.add(ws)
  return true
}
```

### 挑戰 2：Vue 模板存取不到 `navigator`

**問題：** 「複製群組 ID」按鈕直接在模板寫 `@click="navigator.clipboard.writeText(convId)"`，丟出 `TypeError: Cannot read properties of undefined (reading 'clipboard')`。

**原因：** Vue 3 的模板有一份 global allowlist（包含 `Math`、`Date`、`JSON` 等），但 `navigator` 不在其中。

**解法：** 把它移到 `<script setup>` 裡的 helper function，問題直接消失。

### 挑戰 3：平行跑 testcontainers 超時

**問題：** Server 整合測試每個檔案各自起一個 PostgreSqlContainer + RedisContainer，用預設並發模式跑，大多數都在 120s 超時前搶不到 Docker 資源。

**解法：** `vitest.config.ts` 加 `pool: 'forks', poolOptions: { forks: { maxForks: 1 } }`，強制序列跑。速度變慢，但穩定。長期解法是讓所有測試共用同一對 container，但目前規模這樣夠用。

### 挑戰 4：瀏覽器自動化被 `window.confirm()` 卡死

**問題：** 「退出群組」原本用 `window.confirm()` 做二次確認，這個瀏覽器原生 dialog 會阻塞所有 browser events，讓 Chrome 擴充功能的自動化工具完全無法繼續操作。

**解法：** 改成 stateful 兩段式確認——第一次點擊設 `leaveConfirm = true`，3 秒後自動重置；第二次點擊才真的執行退出。不用 dialog，完全用 Vue 響應式狀態驅動。

```typescript
async function leaveGroup() {
  if (!leaveConfirm.value) {
    leaveConfirm.value = true
    setTimeout(() => { leaveConfirm.value = false }, 3000)
    return
  }
  leaving.value = true
  await api.leaveGroup(props.convId)
  emit('left')
}
```

---

## 功能清單

| 功能 | 實作方式 |
|------|---------|
| 即時傳訊息 | WebSocket `message.send` + 樂觀更新 |
| 歷史訊息 | `history.load` 分頁，往上捲觸發 |
| 已讀回條 | `IntersectionObserver` + `read.ack` |
| 打字狀態 | Redis TTL + `presence.typing` broadcast |
| 訊息撤回 | 任意自己的訊息，broadcast `message.patch` |
| 未讀計數 | 會話列表即時更新 |
| 建立群組 | REST `POST /conversations` |
| 加入群組 | `POST /conversations/:id/join`（貼 UUID）|
| 退出群組 | `POST /conversations/:id/leave`（兩段確認）|
| 虛擬滾動 | `@tanstack/vue-virtual`，支援萬筆訊息 |
| 跨節點廣播 | Redis pub/sub + `nodeId` dedup |
| Token 輪換 | Rotating refresh token + reuse detection |

---

## 測試覆蓋

```
packages/web   (Vitest / jsdom)   58 tests ✅
packages/server (Vitest / testcontainers) 59 tests ✅
```

Server 側包含：
- 認證流程（register、login、refresh、logout、reuse detection）
- 速率限制（Redis sliding window）
- WebSocket E2E（message send/recv、history、read ack、revoke、typing）
- 多節點廣播（兩個 server 實例，共用 Redis）
- 群組加入/退出（8 個 E2E 測試）

---

## 數字成果

- **開發時間**：約兩週（利用下班和假日）
- **Commits**：72 個
- **測試數**：117（58 + 59）
- **程式行數**：~6,000 行（不含測試）
- **Bug 修復**：13 個（在完整 E2E 跑完後發現）

---

## 這個過程學到的事

**AI 協作開發真的可以做到生產品質，但不是「說說就好」**
Claude Code 在架構設計、Debug、寫測試都很有幫助，但需要你自己清楚知道要做什麼、以及每一步的 trade-off。它是放大器，不是替代品。

**測試先想清楚再動手**
這個專案後期才補 E2E，才發現 WS 成員資格的 bug、confirm dialog 阻塞等問題。如果測試更早，這些 bug 出現得更早、修起來更便宜。

**WebSocket 的狀態管理比想像中複雜**
連線時快照、斷線重連、seq 同步、多視窗競爭——每一個都是潛在的 race condition。多畫一些 sequence diagram 值得。

---

## Source Code

→ [GitHub: HarryFan/im-app](https://github.com/HarryFan/im-app)

---

*用 Claude Code 協作完成。*
