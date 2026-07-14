---
title: Fable 5 — Twenty Sites
subtitle: 二十個產品展示站的結構實驗
description: 二十個自成一格的產品站，探索五種結構原型與多種呈現模式的組合，一次做完。
origin: self-directed
brand_basis: fictional
year: 2026
pubDate: 2026-07-11
cover: /works/fable-five-showcase.webp
video: /works/fable-five-showcase.mp4
video_loop: /works/fable-five-showcase-loop.mp4
repo_private: true
tech: ['GSAP', 'Lenis', 'Three.js', 'Vanilla JS', 'Node (zero-dep server)']
category: collection
featured: true
role: 定義五種結構原型與呈現模式的實驗矩陣，並獨立完成全部二十個站台。
challenge: 做一個好看的產品頁不難，難的是回答「產品頁有幾種結構」。要在同一批實驗裡把變因控制住 — 每個站換的是結構與呈現手法，不是換個顏色重做一次。
outcome: 二十個獨立站台，涵蓋消費電子、食品、工具、藝術、科幻等題材，五種結構原型 A–E 交叉多種呈現模式。全部零建置、CDN 載入，共用一支零依賴伺服器。
subworks:
  - name: site1-speaker · Arbor Acoustics Grain One
    note: 木質音響。Wood remembers every note。
  - name: site2-camera · Meridian M1
    note: 相機。Focus is a decision。含 hero 影片與 gallery 組。
  - name: site3-cooler · Glacier 360 AIO
    note: 水冷散熱器。From Inferno to Ice。
  - name: site4-sake · 白澤 HAKUTAKU
    note: 純米大吟釀。日式包裝敘事。
  - name: site5-headlamp · NOX TRAIL NT-1 VANTA
    note: 越野頭燈。含 hero 情境影片。
  - name: site6-piano · Cadenza
    note: 數位直立鋼琴。
  - name: site7-watch · ESCAPEMENT CO. Calibre EC-288
    note: 機械腕錶。與此刻同步。
  - name: site8-tote · Haul & Co. The Everyday Tote
    note: 帆布包。日常物件的敘事。
  - name: site9-pen · 拾筆 Shibi
    note: 手工鋼筆。見字如晤。
  - name: site10-collar · Trailtag
    note: 狗狗 GPS 項圈。牠盡情跑，你安心看。
  - name: site11-tablet · SUMI Slate
    note: 繪圖平板。Slow is lush, fast is fine。
  - name: site12-display · VANTA RIFT OLED 240Hz
    note: 電競螢幕。一甩就懂那 180 幀。
  - name: site13-apimonitor · Pulsegrid
    note: API 監控 SaaS。唯一的開發者工具題材。
  - name: site14-artvault · Intaglio 版畫收藏院
    note: 銅版畫收藏。銅版之上，時間成藏。
  - name: site15-telescope · StarSeed 星籽
    note: 兒童望遠鏡。今晚，換你點亮一片夜空。
  - name: site16-spacelift · CAELUS 青冥天梯
    note: 太空電梯。從地面直上同步軌道。
  - name: site17-kintsugi · 継 TSUGU 金繕工房
    note: 金繕修復。以金，繕其殘缺。
  - name: site18-fractal · OROGEN
    note: 程序化地形工具。Seed a range, grow a world。
  - name: site19-swarm · MELIFERA Field-200
    note: 蜂群授粉。Lead a line, the swarm pollinates the rest。
  - name: site20-culturedmeat · CELLARE
    note: 細胞培養肉。The Fourteen-Day Loin。
seo_title: Fable 5 Twenty Sites — 二十個產品展示站 | Harry Fan 作品集
seo_description: 二十個自成一格的產品展示站，探索五種結構原型與呈現模式的組合，涵蓋消費電子、食品、工具、藝術與科幻題材。
---

## 為什麼做這個

單做一個漂亮的產品頁證明不了什麼。我想知道的是：**產品頁到底有幾種結構？**

所以一次做二十個。每個站換的是結構原型與呈現手法，不是換顏色重做。題材刻意拉開 — 從木質音響到細胞培養肉，從兒童望遠鏡到 API 監控後台。

## 二十個站的分布

消費電子六個、食品飲料三個、工具與軟體三個、藝術工藝三個、科幻概念三個、生活雜貨兩個。

## 技術重點

- **零建置**：每個站都是自足的靜態頁，CDN 載入 GSAP 與 Lenis。
- **共用伺服器**：一支零依賴的 `serve.mjs` 同時服務二十個站。
- **變因控制**：結構是實驗變因，技術棧刻意保持一致。
