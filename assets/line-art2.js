import { v as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';

const frontmatter = {
  "title": "極簡線稿風格",
  "description": "單一線重、連續筆觸與留白構圖，極簡線稿的優雅與克制美學。",
  "category": "illustration",
  "tags": ["線稿", "極簡", "單線畫", "黑白插畫"],
  "difficulty": "easy",
  "prompt_zh": "極簡線稿插畫風格，單一線重的連續筆觸，乾淨的黑色線條，純白背景，大量留白，無填色或極少填色，優雅流暢的輪廓，現代極簡設計，單線畫風格，精準俐落的描線",
  "prompt_en": "minimalist line art, single weight continuous line, clean black outline, pure white background, generous negative space, no fill or minimal fill, elegant flowing contour, modern minimal design, one line drawing style, crisp precise strokes",
  "negative_prompt": "photorealistic, 3d render, color, shading, gradient, texture, sketchy, messy lines, low quality, blurry, text, watermark, cluttered, heavy detail",
  "seo_title": "極簡線稿風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整極簡線稿風格 AI 提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用單一線重、連續筆觸與留白做出優雅線條插畫，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/line-art.webp",
  "related_styles": ["flat-illustration", "ink-wash", "art-nouveau", "sticker", "isometric", "comic-book"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["Logo設計", "刺青圖樣", "品牌識別", "包裝插圖", "社群貼文", "編輯配圖"],
  "mistakes": ["線條粗細不一破壞單線美感", "意外出現填色或陰影", "細節太多失去極簡精神", "背景不夠乾淨", "線條斷裂或抖動不流暢"],
  "prompt_breakdown": [{
    "term": "minimalist line art",
    "effect": "鎖定極簡線稿的核心美術風格關鍵詞"
  }, {
    "term": "single weight continuous line",
    "effect": "指定單一線重的連續筆觸，是線稿純粹感的關鍵"
  }, {
    "term": "clean black outline",
    "effect": "要求乾淨黑色線條，避免雜亂草稿感"
  }, {
    "term": "pure white background",
    "effect": "純白背景凸顯線條，是極簡風的基礎"
  }, {
    "term": "no fill or minimal fill",
    "effect": "抑制填色，維持線稿的輕盈與留白"
  }, {
    "term": "elegant flowing contour",
    "effect": "強調優雅流暢的輪廓，提升線條質感"
  }],
  "faq": [{
    "q": "線稿風格在哪個 AI 工具效果最好？",
    "a": "Flux 對乾淨線條與背景控制最穩，Midjourney 線條優雅但偶爾加陰影，GPT Image 最適合用對話控制線重與留白。"
  }, {
    "q": "為什麼線條粗細不一致？",
    "a": "強調 single weight continuous line、even stroke，並把 sketchy、variable width 放進負面提示。"
  }, {
    "q": "如何避免出現填色或陰影？",
    "a": "正向寫 no fill、line art only，負面加 shading、color、gradient，並指定 pure white background。"
  }, {
    "q": "線稿適合做刺青圖樣嗎？",
    "a": "非常適合，單線連續的特性天生適合刺青，建議用 fine line tattoo style 強化並確認模型授權。"
  }, {
    "q": "為什麼細節太多不夠極簡？",
    "a": "極簡是減法。強調 minimalist、simple，避免 highly detailed，只保留最能表達主體的輪廓。"
  }, {
    "q": "怎麼做出一筆畫的效果？",
    "a": "用 one line drawing、single continuous line，並要求線條不中斷，描述主體可被一條線連貫繪出。"
  }, {
    "q": "線稿可以加一點顏色嗎？",
    "a": "可以，用 minimal fill 或單一強調色點綴，但保持大面積留白，避免破壞極簡調性。"
  }, {
    "q": "中文還是英文 prompt 比較好？",
    "a": "多數模型對英文理解更精準，建議以英文為主，中文補充主體與構圖說明。"
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
      children: "極簡線稿是一種高度自律的視覺語言，它把所有資訊壓縮到最純粹的線條裡。畢卡索的單線公牛、馬蒂斯的連續輪廓都是經典範例——用最少的筆觸捕捉物件的神韻。這種風格的迷人之處在於「留白比線條更重要」，畫面中大量的空白讓觀者的想像力參與進來。當你下提示詞時，本質上是在請 AI 模擬「設計師用一支筆連貫描出的優雅輪廓」，而不是堆疊細節的完整插畫。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心在於線條的純粹與一致。", createVNode(_components.code, {
        children: "single weight continuous line"
      }), " 是靈魂，要求線條粗細均勻、盡量連貫不中斷，這正是生成模型最容易出錯的地方——它天生愛加粗細變化與陰影。所以 ", createVNode(_components.code, {
        children: "clean black outline"
      }), " 與 ", createVNode(_components.code, {
        children: "no fill or minimal fill"
      }), " 必須明確約束，前者保證線條乾淨，後者抑制填色衝動。背景上 ", createVNode(_components.code, {
        children: "pure white background"
      }), " 搭配大量留白是基礎，再用 ", createVNode(_components.code, {
        children: "elegant flowing contour"
      }), " 提升線條的優雅度，避免僵硬或抖動。"]
    }), "\n", createVNode(_components.p, {
      children: "題材上，線稿最適合需要俐落質感的場景：Logo、刺青圖樣、品牌識別、雜誌編輯配圖、極簡包裝。它擅長表達優雅、冷靜、現代的氣質，情緒上偏理性與藝術感，卻不適合需要氛圍、材質或敘事縱深的主題——線稿的本質就是抽離與抽象。實作時記得克制細節，只保留最能定義主體的輪廓，並讓背景徹底乾淨，留白才能發揮力量。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Flux"
      }), " 對乾淨線條與純白背景的控制最穩，自然語言理解佳，是線稿風的首選。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 線條優雅、構圖有美感，但偶爾自作主張加陰影或填色，記得把 ", createVNode(_components.code, {
        children: "--no shading, color, fill"
      }), " 寫進負面、調低 ", createVNode(_components.code, {
        children: "--stylize"
      }), "。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配 line art LoRA 或 ControlNet 的 lineart 模式）可控性最高，能精準鎖定線條走向，建議 CFG 抓 6～8、負面寫滿 ", createVNode(_components.code, {
        children: "shading, color, sketchy"
      }), "。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話控制，可以一步步要「線再細一點」「背景全白」「去掉陰影」，對新手與快速產出最友善。我的流程通常是用 GPT Image 定構圖與線條風格，再到 Flux 或 SD 產出乾淨終稿。"]
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

const url = "src/content/styles/line-art.mdx";
const file = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/line-art.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/line-art.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
