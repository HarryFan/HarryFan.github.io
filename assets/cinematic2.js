import { v as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';

const frontmatter = {
  "title": "電影感畫面",
  "description": "以寬畫幅構圖、戲劇打光與電影調色，賦予畫面如劇照般的敘事張力。",
  "category": "realistic",
  "tags": ["電影感", "調色", "寬畫幅", "戲劇打光", "劇照"],
  "difficulty": "medium",
  "prompt_zh": "電影感畫面，寬畫幅 2.39:1 構圖，電影級燈光，柔和的逆光與邊緣光，淺景深背景虛化，電影調色橘藍色調，35mm 變形寬螢幕鏡頭，膠片顆粒質感，戲劇性氛圍，劇照般的構圖",
  "prompt_en": "cinematic film still, anamorphic widescreen 2.39:1, dramatic cinematic lighting, soft backlight and rim light, shallow depth of field, teal and orange color grade, 35mm anamorphic lens, subtle film grain, moody atmosphere, professional movie cinematography",
  "negative_prompt": "cartoon, illustration, painting, anime, flat lighting, oversaturated, snapshot, amateur, cluttered background, deformed hands, blurry, low quality, watermark, text",
  "seo_title": "電影感畫面風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整電影感 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、寬畫幅構圖與戲劇打光拆解，教你用變形鏡頭、橘藍調色做出劇照質感，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/cinematic.webp",
  "related_styles": ["photorealistic", "film-noir", "golden-hour", "analog-film", "concept-art", "portrait-photography"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["電影海報", "角色劇照", "廣告分鏡", "概念視覺", "社群封面", "短片視覺參考"],
  "mistakes": ["打光太平缺乏戲劇對比", "忘記寬畫幅比例失去電影感", "調色過頭橘藍假到出戲", "背景雜亂搶走敘事焦點", "構圖置中沒有運用負空間"],
  "prompt_breakdown": [{
    "term": "cinematic film still",
    "effect": "把畫面定位成電影劇照，引導模型走向敘事性而非快照"
  }, {
    "term": "anamorphic widescreen 2.39:1",
    "effect": "寬畫幅比例是電影感最直接的視覺訊號"
  }, {
    "term": "dramatic cinematic lighting",
    "effect": "強調光影對比與動機光源，建立戲劇張力"
  }, {
    "term": "soft backlight and rim light",
    "effect": "逆光與邊緣光勾勒主體輪廓，營造立體與氛圍"
  }, {
    "term": "teal and orange color grade",
    "effect": "好萊塢經典橘藍調色，膚色暖、暗部冷"
  }, {
    "term": "subtle film grain",
    "effect": "加入細微膠片顆粒，去除數位的死板乾淨感"
  }],
  "faq": [{
    "q": "電影感在哪個 AI 工具效果最好？",
    "a": "Midjourney 對電影調色與氛圍光最有天分，Flux 構圖與光線穩定，GPT Image 適合用對話調整鏡位與情緒。"
  }, {
    "q": "為什麼畫面看起來像隨手拍而非電影？",
    "a": "缺少寬畫幅比例與戲劇打光。加入 2.39:1、rim light、moody atmosphere，並避免正面平光。"
  }, {
    "q": "橘藍調色怎麼用才不會太假？",
    "a": "把 teal and orange 當作微調而非主導，膚色保留暖調、暗部偏冷即可，過頭會塑膠化。"
  }, {
    "q": "變形鏡頭（anamorphic）有什麼用？",
    "a": "它帶來橫向散景、水平耀光與寬螢幕擠壓感，是電影鏡頭的招牌質感。"
  }, {
    "q": "電影感和超寫實差在哪？",
    "a": "超寫實追求中性真實，電影感刻意加調色、寬畫幅與戲劇光來說故事，兩者可疊加。"
  }, {
    "q": "如何讓畫面更有敘事感？",
    "a": "善用負空間、前景遮擋與動機光源，讓觀者感覺畫面外還有故事在發生。"
  }, {
    "q": "中文還是英文 prompt 比較準？",
    "a": "攝影與調色術語英文最精準，建議以英文鏡頭、光線、色調詞為主，中文輔助描述情境。"
  }, {
    "q": "怎麼維持一部短片多張劇照風格統一？",
    "a": "固定調色、比例與鏡頭關鍵詞與 seed，Midjourney 可用 sref 鎖定整體視覺風格。"
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
      children: "電影感（Cinematic）不是某種特定畫風，而是一整套「用畫面說故事」的視覺語言。它源自電影攝影指導（DP）的工作：如何用鏡頭、光線、調色與構圖，在一格靜止畫面裡傳遞情緒與敘事。對 AI 下這類提示詞時，你其實是在扮演 DP——先想這個畫面要傳達什麼情緒，再決定光從哪來、用什麼比例框住它。理解這層差別很重要，因為電影感的關鍵不在「畫得多寫實」，而在「氛圍與張力」。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心由幾個關鍵詞撐起。最直接的是", createVNode(_components.strong, {
        children: "寬畫幅比例"
      }), " ", createVNode(_components.code, {
        children: "anamorphic widescreen 2.39:1"
      }), "，這是大腦辨識「電影」最快的訊號，一改比例氣質立變。再來是", createVNode(_components.strong, {
        children: "戲劇打光"
      }), "：", createVNode(_components.code, {
        children: "dramatic cinematic lighting"
      }), " 搭配 ", createVNode(_components.code, {
        children: "soft backlight and rim light"
      }), "，靠逆光與邊緣光把主體從背景中剝離，製造立體與神祕感，這跟超寫實偏好的柔和自然光是兩種思路。", createVNode(_components.strong, {
        children: "調色"
      }), "則是 ", createVNode(_components.code, {
        children: "teal and orange color grade"
      }), "——好萊塢經典的橘藍對比，讓膚色溫暖、暗部偏冷；但這味精要少放，過頭就出戲。最後 ", createVNode(_components.code, {
        children: "subtle film grain"
      }), " 與 ", createVNode(_components.code, {
        children: "35mm anamorphic lens"
      }), " 補上膠片質感與橫向散景，去除數位的乾淨死板。"]
    }), "\n", createVNode(_components.p, {
      children: "題材上，電影感幾乎能罩住所有需要情緒與張力的場景：角色劇照、電影海報、廣告分鏡、概念視覺。它特別擅長孤獨、緊張、史詩、懸疑等情緒，靠光影對比與負空間說話。要拍得好，記得用前景遮擋與動機光源，讓畫面外彷彿還有故事在延伸；構圖避免死板置中，多用三分法與留白。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對電影氛圍與調色最有靈氣，短 prompt 就能出味，想要更真實時加 ", createVNode(_components.code, {
        children: "--style raw"
      }), "、比例用 ", createVNode(_components.code, {
        children: "--ar 21:9"
      }), "，並加重 ", createVNode(_components.code, {
        children: "cinematic lighting"
      }), "。", createVNode(_components.strong, {
        children: "Flux"
      }), " 構圖與光線最穩，自然語言理解佳，適合需要精準控制鏡位與光源方向的場景，偶爾偏平時把 ", createVNode(_components.code, {
        children: "dramatic lighting"
      }), "、", createVNode(_components.code, {
        children: "rim light"
      }), " 往前放。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 搭電影風 LoRA）可控性高，CFG 抓 5～7、負面寫滿 ", createVNode(_components.code, {
        children: "flat lighting, snapshot"
      }), "，並用調色 LoRA 微調橘藍平衡。", createVNode(_components.strong, {
        children: "GPT Image"
      }), " 強在對話迭代，可以逐句要「逆光再強一點」「背景再暗」「比例改寬螢幕」，對情緒微調最直覺，但極致質感仍略遜前三者。實務上我常用 GPT Image 定鏡位與情緒，再交給 Midjourney 或 Flux 量產高品質劇照。"]
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

const url = "src/content/styles/cinematic.mdx";
const file = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/cinematic.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/cinematic.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
