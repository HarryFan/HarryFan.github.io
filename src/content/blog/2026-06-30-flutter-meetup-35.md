---
title: '久違回天瓏：Flutter Meetup #35 參與筆記'
description: '六月底回天瓏二樓參加 Flutter Meetup #35，記下 Flutter 3.44、AI 進工作流、SoFi 砍掉百萬行 Native，還有麥克熊用純 Dart 刻出來的 3D 引擎 macbear_3d。一個前端老人在 Flutter 社群的觀察筆記。'
pubDate: 2026-06-30
heroImage: '/blog/2026-06-30-flutter-meetup-35.png'
---

> 今晚又回到天瓏二樓，這次是 Flutter 場。

久違地回到天瓏書局 2 樓，參加 Flutter Meetup #35，GDG Taipei 跟 Flutter Taipei 合辦。場地收了 100 元清潔費，但能跟一整屋子熱愛 Flutter 的開發者擠在同一個空間，這錢花得超值。

主辦準備了 Flutter 帽子跟紀念 Pin 針，當作上台分享的獎勵（一人一年限領一次），氣氛一下就被帶起來。會中掛了 Slido，問問題、互動都走線上，Q&A 跑起來順很多。

## 六月 Flutter 大小事

開場 warm-up 把這陣子的社群動態掃了一輪。

**研討會雷達**：下半年兩場大的。瑞典斯德哥爾摩的 Flutter & Friends（09/03-05），還有東京的 FlutterKaigi 2026（10/29-30）。後者今年跟 Flutter Ninjas 合併，主題叫「Assemble」，CFP 7/12 截止。

### Flutter 3.44 重點

- **iOS/macOS**：Swift Package Manager 變預設，原生依賴管理交給 SPM，CocoaPods 時代慢慢翻頁。
- **架構**：Material & Cupertino 跟核心解耦，框架瘦身，未來可以只帶需要的模組。
- **Desktop**：多視窗支援（preview）；Linux 桌面維護由 Canonical 接手。
- **Android**：Impeller Vulkan 加上混合渲染強化，效能跟相容性再往上。

### AI 直接住進開發流程

這段是今晚資訊量最濃的部分之一：

- **Agentic Hot Reload**：透過 Dart/Flutter MCP server，讓 Claude Code、Cursor、Gemini CLI、Google Antigravity 這些 AI 工具直接連上正在跑的 App，改完碼自動 Hot Reload，真正做到流暢的 Vibe Coding。
- **Agent Skills**：官方正式釋出 Flutter / Dart 的 Agent Skills，讓 AI 助理產出更貼最佳實踐的 Flutter 碼。
- **GenUI + Genkit Dart**：用 Dart 寫全端 / Agentic AI App，模型支援 Google、Anthropic、OpenAI 多家。
- **其他**：DevTools 預設改用 WASM 跑；Apple Silicon 原生執行，不用再過 Rosetta。

順帶一提，台灣官方繁中文件站 [docs.flutter.tw](https://docs.flutter.tw) 持續同步 3.44 內容做翻譯，降低新手語言門檻，也歡迎社群一起參與維護。

### Flutter Tech Summit 2026 亮點

接著整理了 Tech Summit 的精華，資訊量直接爆炸：

- **Keynote**：Google 的 Michael Thomsen 講「The Future of Flutter」。
- **AI / Agentic**：GenUI 雄銀行 App、Marionette MCP 點 App 這類前沿案例。
- **Server-Driven UI**：Design Governance as Code，還有用 SDUI 加速行銷頁上線。
- **測試與品質**：Sennheiser 導入 [Patrol](https://patrol.leancode.co/) 做 E2E，以及 WCAG 無障礙規範的落地。

**讓我眼睛一亮的 Flutter Go**：LeanCode 的 Sebastian Konowrocki 介紹的工具。開發中的 App，一行指令（build + 上傳輕量 UI bundle）就生出即時預覽連結加 QR code，PM、設計師、QA 掃一下就能在真機玩活生生的 App，不用等開 PR、等跑完整 CI。身為常卡在「等部署、等驗收」的人，這種把跨部門驗證瓶頸打掉的工具真的有戳到我。

**SoFi 的案例最震撼**：美國金融超級 App SoFi（1500 萬會員）把原本 iOS/Android 兩套 Native 合併成單一 Flutter codebase，**砍掉了約百萬行 Native 程式碼**（簡報並提到整體 codebase 大幅縮減）。雙平台重複開發維護的痛，這個數字講得很清楚。

官方近期影片也推了幾部必看，包括 Google I/O 新功能、Toyota 車載資訊系統用 Flutter 重新設計，還有 AI Vibe Coding 熱門題「Develop with Google Antigravity and Flutter」。

**反思**：今晚最深的感受是——Flutter 的進步早就不只是框架本身。從 AI 輔助工作流，到 Flutter Go 這種專門提升團隊協作效率的工具，整個圈子明顯在往「更成熟、更在乎開發者體驗（DX）」走。

## 閃電講：麥克熊純 Dart 刻的 3D 引擎

本來是三位 10 分鐘閃電講，但另外兩位因故沒到，於是麥克熊的 3D 引擎專題就成了主軸——結果這場乾貨多到完全撐得起整段。

他帶來自己開發的 **`macbear_3d`**，一個輕量、生產級的 3D 渲染引擎，**完全用 Dart 寫**。重點是讓 Flutter 開發者不用先懂一堆 OpenGL，就能用 Flutter-idiomatic 的 API 做出流暢的 3D 體驗。

**架構**從上層 `M3View`（綁 Widget 生命週期、Ticker、Input）、`M3AppEngine`，到中層的 Scene graph（`M3Scene` / `M3Entity` / `M3Camera` / `M3Light`）與渲染管線，底層再透過 Google ANGLE 把 OpenGL ES 轉成各平台原生 API（iOS Metal / Android Vulkan / Desktop D3D）。

**特性**也很滿：PBR + IBL 照明、CSM 級聯陰影、雙層法線貼圖水體與平面反射折射、glTF 骨骼動畫、整合 Rapier 物理引擎（Rust/WASM）、glTF/GLB/OBJ/BVH 多格式非同步載入。現場 Web 實機 demo 的金屬球反射、波浪水體折射，細節真的很漂亮。

專案健康度也拿出來攤：GStack 評估 **86 分**（功能廣度 95、結構 85、文件 88、版控 90、測試覆蓋只有 22），94 個 commit、13 個 release、89 個 Dart 檔、13k+ 行。已上 [pub.dev](https://pub.dev/packages/macbear_3d)（`v0.9.1`），開源在 [GitHub](https://github.com/macbearchen/macbear_3d)，[線上 demo](https://macbearchen.github.io/macbear_3d) 可直接玩。Roadmap 排到 v1.0.0，誠實列了「清掉 debugPrint、修 physics step、拉測試覆蓋率」這些待辦。

一個前端老人看這種「沒有就自己刻一個引擎」的專案，是真的會肅然起敬。

## 自由交流與問答

麥克熊講完，現場 QA 直接熱起來，整理幾個我覺得精彩的：

1. **為什麼要自己做 3D 引擎？** — pub.dev 首頁就寫了：因為在 Flutter 上找不到一個他自己真正想用的 3D 引擎。身為圖形愛好者，沒有就自己用 Dart 刻。
2. **怎麼加 3D 物件？** — 引擎還很早期，還沒視覺化場景編輯器，加方塊、球體這些目前得全用 Dart 程式碼宣告。
3. **CPU / 記憶體吃多兇？** — 現場開工作管理員實測，Web demo 渲染到 **50 萬個三角形、24 萬個頂點** 的複雜場景，記憶體跟 CPU 還是維持得很輕量，效能很猛。
4. **手機觸控、跟內嵌 Unity 差在哪？** — 觸控完全走 Flutter 原生手勢，手機跟網頁都很順。相比過去在 Flutter 裡內嵌整個 Unity（Unity as a Library）那種檔案肥、啟動慢、吃記憶體，`macbear_3d` 兼顧了輕量、快啟動、跟原生 UI 完美疊加，是很好的替代方案。

## 三個帶回家的 Takeaways

1. **測試品質在大廠已經成熟**：Sennheiser 把 Patrol 用在 E2E，尤其處理原生 Native UI 互動（像權限同意）那段很穩，代表這套東西能上正規專案，不是 demo 級。
2. **協作流程正在被重寫**：Flutter Go 用輕量 UI bundle 即時預覽，把跨部門驗證卡 CI/CD 的老問題直接繞過去。
3. **全球社群很有活力**：FlutterKaigi 2026 跟 Flutter Ninjas 合併，預告亞洲區會有更大規模的 Flutter 交流，生態的韌性看得出來。

收穫滿滿，期待下一場。
