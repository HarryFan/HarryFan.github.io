---
title: 末日戰術 RPG 概念宣傳站
subtitle: WebGL 粒子核心 × 滾動鏡頭敘事
description: 作為最後的調律者，喚醒以殘存晶片為心的矽魂。滾動驅動的 WebGL 粒子晶片核心，加一整套自成 canon 的世界觀。
origin: self-directed
brand_basis: fictional
year: 2026
pubDate: 2026-07-21
cover: /works/silica-hollow.webp
demo: https://harryfan.github.io/demos/silica-hollow/
repo_private: true
tech:
  - 'Three.js 0.160'
  - 'WebGL 粒子著色器'
  - 'ES Module + importmap'
  - 'Scroll-driven 動效'
  - 'WebAudio 程序化音效'
  - 'gpt-image-2 美術生成'
  - 'Vanilla JS（零框架）'
category: interactive
role: 從世界觀 canon、視覺方向、美術到 WebGL 前端與音效，全部一人完成。
challenge: 要在無 build step、無外部 3D 檔案的前提下，只靠 CDN 載入的 Three.js，做出一個會隨滾動流動、看起來有遊戲級質感的晶片核心背景，並讓整站以 AI 批次生成的美術維持統一畫風，而不是十幾種風格拼盤。
outcome: 純靜態單頁，開瀏覽器即跑。晶片核心是 WebGL 粒子著色器，鏡頭隨 scroll 穿過世界觀、核心系統到預約各區塊。美術以共用 style DNA 批次生成、腳本具冪等性；讖頌區做成主從式舞台，切象有解碼動畫與合成音效，並與預約里程碑連動（每滿一萬人解一象）。
seo_title: 末日戰術 RPG 概念宣傳站 | Harry Fan 作品集
seo_description: Three.js WebGL 粒子晶片核心、滾動鏡頭敘事、gpt-image-2 批次生成的統一美術，加完整世界觀 canon 的末日 RPG 概念宣傳站。
---

## 為什麼做這個

想試一件事：**一個人能不能把「一款遊戲的宣傳站該有的樣子」整套長出來** — 不只是排版好看，而是世界觀、視覺、互動、音效彼此咬合，像真的有一支團隊在背後。

題目是自己虛構的末日戰術 RPG。你是最後的**調律者**，在訊號死寂的島上，喚醒以殘存晶片為心的**矽魂**，一個一個把散落的意志接回來。

## 技術重點

- **WebGL 粒子核心**：HERO 背景的晶片核心不是影片也不是圖，是 Three.js 粒子著色器即時算的，鏡頭隨滾動進度穿過它。
- **零 build、零框架**：一份 `index.html` + `css` + 一支 ES module，透過 importmap 從 CDN 載 Three.js。開瀏覽器就跑，沒有打包步驟。
- **美術一致性**：`gen_images.py` 用 gpt-image-2 批次產美術，共用同一組 style DNA，讓所有圖維持統一畫風而非拼盤；腳本冪等，已存在的圖跳過。
- **讖頌主從舞台**：棄掉廉價的 flip card，改成左清單／右大舞台，切象交叉淡入、白話用「解碼」逐字動畫呈現，並配合成的 signal-ping 音效。
- **里程碑連動**：預約人數是單一數據源，每滿一萬人解一象，改一個數字整站的解封狀態跟著動。

## 不只是網頁

真正花時間的地方在**世界觀**：歷史、地理、派系、民俗寫成一份 canon bible，網站上每段文案背後都有一條說得通的設定線。矽魂被定義成一種「狀態」而非固定形象，性別、族類、形態全開放，為之後任何角色留白。
