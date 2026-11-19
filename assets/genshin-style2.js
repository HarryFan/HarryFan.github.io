import { n as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "二次元手遊渲染",
  "description": "原神式的二次元 3D 卡通渲染，乾淨的賽璐珞著色加上唯美光效，開放世界手遊的當紅美術。",
  "category": "game",
  "tags": ["二次元", "手遊渲染", "原神風", "賽璐珞", "卡通渲染"],
  "difficulty": "medium",
  "prompt_zh": "二次元手遊風格，原神式 3D 卡通渲染，乾淨的賽璐珞平塗著色，柔和的描邊，唯美夢幻的光效，飽和明亮的色彩，精緻的角色立繪，華麗的服裝細節，動漫感大眼睛，開放世界場景，柔和的次表面光暈，高品質手遊立繪",
  "prompt_en": "anime gacha game style, Genshin Impact style, 3d cel shaded character, clean toon shading, soft outline, dreamy ethereal lighting, vibrant saturated colors, detailed character splash art, ornate costume design, big anime eyes, open world background, rim light glow, high quality mobile game render",
  "negative_prompt": "photorealistic, western cartoon, rough sketch, dull colors, hard chiaroscuro, low detail, deformed hands, extra fingers, text, watermark, grunge, painterly brushwork",
  "seo_title": "二次元手遊渲染風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整原神式二次元手遊 3D 卡通渲染 AI 提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用賽璐珞著色、唯美光效做出抽卡立繪質感，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/genshin-style.webp",
  "related_styles": ["cel-shading", "anime", "arcane-style", "fantasy-rpg-art", "shoujo-manga", "blender-3d"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": true,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["抽卡角色立繪", "角色設定圖", "手遊主視覺", "同人插畫", "社群貼文", "開放世界場景"],
  "mistakes": ["著色太寫實失去二次元感", "服裝細節含糊不夠華麗", "光效太硬失去夢幻氛圍", "眼睛畫得不夠動漫感", "描邊太重變成普通卡通渲染"],
  "prompt_breakdown": [{
    "term": "Genshin Impact style",
    "effect": "鎖定原神式二次元手遊渲染的美術核心"
  }, {
    "term": "3d cel shaded character",
    "effect": "指定 3D 卡通渲染角色，兼具立體與二次元感"
  }, {
    "term": "clean toon shading",
    "effect": "採用乾淨的賽璐珞平塗著色，避免雜亂陰影"
  }, {
    "term": "dreamy ethereal lighting",
    "effect": "加入唯美夢幻光效，這是手遊立繪的賣點"
  }, {
    "term": "ornate costume design",
    "effect": "強調華麗精緻的服裝細節，提升角色吸引力"
  }, {
    "term": "rim light glow",
    "effect": "用輪廓光暈勾出角色邊緣，增添夢幻通透感"
  }],
  "faq": [{
    "q": "二次元手遊渲染在哪個 AI 工具效果最好？",
    "a": "Midjourney 對唯美光效與服裝細節最直覺，Flux 立繪穩定，GPT Image 適合對話調整角色設定。"
  }, {
    "q": "怎麼做出原神那種質感？",
    "a": "直接寫 Genshin Impact style 搭配 3d cel shaded、clean toon shading 與 dreamy lighting，會很接近抽卡立繪。"
  }, {
    "q": "這和一般動漫風差在哪？",
    "a": "一般動漫多為 2D 繪製，二次元手遊渲染是 3D 模型做賽璐珞著色，有真實立體光影但維持二次元臉孔與配色。"
  }, {
    "q": "為什麼著色看起來太寫實？",
    "a": "把 photorealistic、painterly brushwork、hard chiaroscuro 放進 Negative Prompt，並強調 clean toon shading、anime。"
  }, {
    "q": "服裝細節怎麼變華麗？",
    "a": "在正向加 ornate costume design、intricate details，必要時用區域重繪精修飾品與布料花紋。"
  }, {
    "q": "中文 prompt 還是英文好？",
    "a": "英文對 cel shaded、gacha game 等術語理解更準，建議英文為主、中文補充角色性格與配色。"
  }, {
    "q": "適合做抽卡角色立繪嗎？",
    "a": "非常適合，這正是它的主場，建議用直幅構圖、輪廓光與華麗背景強化「值得抽」的吸引力。"
  }, {
    "q": "為什麼角色顯得平凡不夠夢幻？",
    "a": "多半缺少輪廓光與柔和光暈，加上 rim light glow 與 dreamy ethereal lighting，角色立刻有手遊立繪的通透感。"
  }]
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    code: "code",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["二次元手遊渲染是近年最具商業影響力的遊戲美術之一，代表作是 ", createVNode(_components.code, {
        children: "米哈遊 miHoYo"
      }), " 的原神、崩壞與星穹鐵道。它的技術根基是卡通渲染（cel shading），但和傳統 NPR 走的方向不同——它追求的不是罪惡裝備那種硬派戰鬥感，而是「精緻、唯美、夢幻」的抽卡立繪美學。核心矛盾在於：要用 3D 模型享受真實的光影與多視角自由，同時又要維持二次元手繪那張討喜的臉孔與配色。理解這層平衡很重要：下提示詞時，你要請 AI 模擬的是「立體模型 + 二次元賽璐珞 + 唯美光效」三者融合的結果，過於寫實或過於平面都會失味。"]
    }), "\n", createVNode(_components.p, {
      children: ["技術核心有三塊撐起這個風格。第一是", createVNode(_components.strong, {
        children: "乾淨的賽璐珞著色"
      }), "，", createVNode(_components.code, {
        children: "clean toon shading"
      }), "、", createVNode(_components.code, {
        children: "3d cel shaded character"
      }), " 用平整柔和的色塊取代寫實漸層，但分界比戰鬥系卡通渲染更柔、更乾淨，避免雜亂。第二是", createVNode(_components.strong, {
        children: "唯美光效"
      }), "，", createVNode(_components.code, {
        children: "dreamy ethereal lighting"
      }), "、", createVNode(_components.code, {
        children: "rim light glow"
      }), " 是手遊立繪的賣點——輪廓光勾出角色邊緣、柔和光暈讓畫面通透夢幻，這是「值得課金」的視覺說服力來源。第三是", createVNode(_components.strong, {
        children: "華麗的角色設計"
      }), "，", createVNode(_components.code, {
        children: "ornate costume design"
      }), "、", createVNode(_components.code, {
        children: "big anime eyes"
      }), " 把服裝飾品與五官推到精緻飽滿，這正是抽卡角色吸引力的核心。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合唯美、夢幻、帶冒險感的內容：抽卡角色立繪、開放世界場景、同人插畫、手遊主視覺。它能承載青春、奇幻與輕度史詩的情緒，但不擅長厚重寫實或陰暗壓抑的題材。做立繪時建議用直幅構圖、輪廓光勾邊、華麗背景襯托，把焦點牢牢鎖在角色的臉與服裝上。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對唯美光效與服裝細節的還原最直覺，短 prompt 就能出抽卡立繪質感，鎖角色時用 ", createVNode(_components.code, {
        children: "--cref"
      }), " 搭配固定 ", createVNode(_components.code, {
        children: "--seed"
      }), "、", createVNode(_components.code, {
        children: "--ar 2:3"
      }), " 做立繪，並可拉高 ", createVNode(_components.code, {
        children: "--stylize"
      }), " 增添夢幻感。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在開源陣營裡立繪與構圖最穩，對長句自然語言理解佳，適合精準描述服裝結構與配色，但偶爾偏寫實，這時把 ", createVNode(_components.code, {
        children: "anime"
      }), "、", createVNode(_components.code, {
        children: "cel shaded"
      }), " 往前放並加重。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配二次元/genshin LoRA）可控性最高，社群 LoRA 資源豐富，能精準還原特定角色畫風，建議 CFG 抓 6～8、負面寫滿 ", createVNode(_components.code, {
        children: "photorealistic, western cartoon, deformed hands"
      }), "。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代設定，可以邊生邊要「眼睛更大」「加輪廓光」「服裝更華麗」，發想階段最友善，但二次元臉孔與一致性略遜前三者。實務流程通常先用 GPT Image 定角色設定，再拿到 Midjourney 或 SD 量產高品質立繪終稿。"]
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/styles/genshin-style.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/genshin-style.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/genshin-style.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
