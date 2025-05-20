# 🚀 個人導覽主站開發任務清單

## 🔧 專案初始化

- [x] 確認 `astro.config.mjs` 設定
  - [x] `site` 設定為 `https://harryfan.github.io/`
  - [x] `base` 設定為 `/`
- [x] 設定 `.github/workflows/deploy.yml` 自動部署
- [x] 安裝並設定 Tailwind CSS
- [ ] 設定 favicon 和網站圖示
- [ ] 設定 robots.txt 和 sitemap.xml
- [ ] 加入基本 SEO 設定（meta tags）

## 🎨 首頁設計

### 核心內容
- [x] 基本版面佈局
- [x] 個人簡介區塊
  - [x] 個人照片/頭像
  - [x] 姓名與職稱
  - [x] 簡短自我介紹（1-2 句）
  - [x] 主要技能標籤
    - [x] [作品集](https://harryfan.github.io/harry-portfolio/)
    - [x] [部落格](https://harryfan.github.io/harry-blog/)
    - [ ] [商店（未來新增）](#)
  - [x] 顯示社群與聯絡方式：
    - [x] Email
    - [x] LinkedIn
    - [x] GitHub / IG（可選）

### 導覽區塊
- [x] 主要站點卡片
  - [x] 作品集（連結至 harry-portfolio）
  - [x] 部落格（連結至 harry-blog）
  - [ ] 商店（預留位置）
  - [x] 卡片懸停動畫效果

### 聯絡方式
- [x] 聯絡資訊區塊
  - [x] Email 連結
  - [x] LinkedIn 個人檔案連結
  - [x] GitHub 個人檔案連結
  - [ ] 其他社群媒體連結（可選）

## 功能開發

### 樣式與互動
- [x] 整合 Tailwind CSS
- [x] 響應式設計
  - [x] 桌面版（>1024px）
  - [x] 平板（768px-1024px）
  - [x] 手機版（<768px）
- [x] 深色/淺色主題切換
  - [x] 主題切換按鈕
  - [x] 儲存使用者主題偏好
  - [x] 支援系統主題偵測

### 動畫與過場
- [x] 頁面載入動畫
- [x] 滾動動畫
- [x] 互動回饋動畫

## 元件化（可選）

- [x] 建立共用元件
  - [x] `NavCard.astro` - 導覽卡片
  - [x] `ContactInfo.astro` - 聯絡資訊
  - [x] `ThemeToggle.astro` - 主題切換
  - [x] `Header.astro` - 頁首
  - [x] `Footer.astro` - 頁尾
  - [x] `SocialLinks.astro` - 社群連結

## 多語系支援（未來）

- [ ] 基本架構
  - [ ] 建立 i18n 設定
  - [ ] 語言切換元件
  - [ ] 語言切換動畫
- [ ] 翻譯內容
  - [ ] 繁體中文（zh-TW）
  - [ ] 英文（en）
  - [ ] 簡體中文（zh-CN）

## 部署與測試

### 測試項目
- [x] 跨瀏覽器測試
  - [x] Chrome
  - [x] Firefox
  - [x] Safari
  - [x] Edge
- [x] 響應式測試
  - [x] 手機（iPhone/Android）
  - [x] 平板（iPad/Android）
  - [x] 桌面（Mac/Windows）
- [x] 效能測試
  - [x] Lighthouse 評分 > 90
  - [x] 載入時間優化
  - [x] 圖片最佳化

### 部署流程
```bash
git add .
git commit -m "feat: 更新導覽頁"
git push origin main
```

## 文件與維護

- [x] 更新 README.md
  - [x] 專案說明
  - [x] 開發指引
  - [x] 部署流程
- [x] 建立 CHANGELOG.md
- [x] 加入貢獻指南

## 未來功能構想

### 內容管理
- [ ] 從 CMS 動態載入內容
- [ ] 最新部落格文章預覽
- [ ] 作品集精選展示

### 進階功能
- [ ] 訪客計數器
- [ ] 聯絡表單
- [ ] 深色/淺色主題切換動畫

### 整合功能
- [ ] 電子報訂閱
- [ ] 社群媒體動態
- [ ] 作品集專案過濾與搜尋

## 追蹤進度

- 整體進度: ▰▰▰▰▰▰▰▰▰ 100%
- 最後更新: 2025-05-20

> 使用 `[x]` 來標記已完成項目，使用 `[ ]` 標記未完成項目。
