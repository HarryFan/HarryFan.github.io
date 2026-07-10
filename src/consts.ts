// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Harry / Tech';
export const SITE_DESCRIPTION = '前端部署工程師 FDE · 15 年以上經驗 · 技術筆記與產品落地';

// Google Analytics 4 Measurement ID（G-XXXXXXXXXX）。留空則不載入 GA。
export const GA_MEASUREMENT_ID = 'G-WF4XKX8JEC';

// 文章分類：slug → 顯示名稱
export const CATEGORIES = {
	frontend: '前端實戰',
	ai: 'AI 協作與工具',
	events: '活動筆記',
	career: '職涯觀點',
} as const;
export type CategorySlug = keyof typeof CATEGORIES;
