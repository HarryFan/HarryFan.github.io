import { n as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "扁平向量插畫風格",
  "description": "簡潔色塊、無漸層輪廓與幾何造型，現代扁平向量插畫的乾淨設計感。",
  "category": "illustration",
  "tags": ["扁平設計", "向量插畫", "幾何造型", "UI插圖"],
  "difficulty": "easy",
  "prompt_zh": "扁平向量插畫風格，簡潔的色塊填色，幾何化的造型，無漸層或極簡漸層，乾淨俐落的輪廓，現代企業插畫風，有限色票，無外框線，留白構圖，柔和的品牌色調，向量質感",
  "prompt_en": "flat vector illustration, clean solid color shapes, geometric simplified forms, minimal or no gradients, crisp outlines, modern corporate illustration style, limited color palette, no outline strokes, generous negative space, soft brand colors, vector art",
  "negative_prompt": "photorealistic, 3d render, texture, gradient mesh, noise, sketch, hand drawn, realistic shadow, low quality, blurry, text, watermark, cluttered",
  "seo_title": "扁平向量插畫風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整扁平向量插畫風格 AI 提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用色塊、幾何造型與有限色票做出乾淨設計感，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/flat-illustration.webp",
  "related_styles": ["line-art", "isometric", "sticker", "pop-art", "childrens-book", "papercut"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["網站插圖", "App介面插畫", "簡報配圖", "品牌識別", "社群貼文", "資訊圖表"],
  "mistakes": ["意外出現漸層或陰影破壞扁平感", "色票太多顯得雜亂", "造型細節過多失去簡化精神", "出現寫實質感與光影", "構圖太滿沒有留白"],
  "prompt_breakdown": [{
    "term": "flat vector illustration",
    "effect": "鎖定扁平向量插畫的核心美術風格關鍵詞"
  }, {
    "term": "clean solid color shapes",
    "effect": "指定純色色塊填色，是扁平風的視覺基礎"
  }, {
    "term": "geometric simplified forms",
    "effect": "把造型幾何化簡化，凸顯設計感"
  }, {
    "term": "minimal or no gradients",
    "effect": "抑制漸層，避免畫面變立體破壞扁平"
  }, {
    "term": "limited color palette",
    "effect": "限制色票數量，維持品牌一致的乾淨感"
  }, {
    "term": "generous negative space",
    "effect": "保留留白構圖，讓畫面呼吸更現代"
  }],
  "faq": [{
    "q": "扁平插畫在哪個 AI 工具效果最好？",
    "a": "Flux 對乾淨色塊與構圖最穩，Midjourney 風格化強但偶爾加陰影，GPT Image 最適合用對話控制色票與留白。"
  }, {
    "q": "為什麼生出來有漸層或陰影？",
    "a": "把 gradient、realistic shadow、3d render 放進負面提示，正向加強 flat、solid color、no gradient。"
  }, {
    "q": "如何控制色票數量？",
    "a": "在 prompt 直接指定如 limited 3-color palette 或寫出具體色碼描述，並加 limited color palette 約束整體。"
  }, {
    "q": "扁平插畫可以商用嗎？",
    "a": "風格本身不受著作權保護，建議建立品牌色票統一風格，並確認所用模型授權條款。"
  }, {
    "q": "為什麼造型太複雜不夠簡潔？",
    "a": "強調 geometric simplified forms、minimalist，避免要求 highly detailed，扁平風的精神是減法。"
  }, {
    "q": "適合做企業官網插圖嗎？",
    "a": "非常適合，扁平風是現代 SaaS 與企業官網主流，建議固定色票與造型語言維持系列一致。"
  }, {
    "q": "要不要保留外框線？",
    "a": "視風格而定，無框更純粹現代，細框則偏插畫感，可用 no outline strokes 或 thin outline 明確指定。"
  }, {
    "q": "中文還是英文 prompt 比較好？",
    "a": "多數模型對英文理解更精準，建議以英文為主，中文補充情境與用途說明。"
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
      children: "扁平向量插畫是數位時代最具代表性的視覺語言，它的崛起與行動裝置、UI 設計、簡報文化緊密相連。核心哲學是「減法」——去掉寫實的光影、材質與透視，只保留最能傳達訊息的色塊與輪廓。這種克制不是偷懶，而是為了在小螢幕、快速瀏覽的情境下，讓資訊一眼就被讀懂。當你下提示詞時，本質上是在請 AI 模擬「設計師用向量軟體拉出純色形狀」的結果，而不是畫一張寫實插畫。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心在於「壓平立體感」。", createVNode(_components.code, {
        children: "clean solid color shapes"
      }), " 是基礎，要求 AI 用整片純色填色而非漸層堆疊；", createVNode(_components.code, {
        children: "minimal or no gradients"
      }), " 則是關鍵約束，因為生成模型天生愛加陰影與漸層，不主動抑制就會破壞扁平感。造型上用 ", createVNode(_components.code, {
        children: "geometric simplified forms"
      }), " 把物件幾何化、去除多餘細節。色彩上 ", createVNode(_components.code, {
        children: "limited color palette"
      }), " 控制色票數量，是維持現代乾淨感的訣竅；再配 ", createVNode(_components.code, {
        children: "generous negative space"
      }), " 留白，畫面立刻有專業設計的呼吸感。"]
    }), "\n", createVNode(_components.p, {
      children: "題材上，扁平風最適合需要清楚溝通的場景：網站主視覺、App 引導頁、簡報配圖、資訊圖表、品牌吉祥物。它擅長表達概念與流程，情緒上偏理性、友善、現代，卻不適合需要氛圍與材質的敘事性畫面——扁平的本質就是抽象化。實作時記得克制細節、固定色票，讓系列插圖風格統一，這對品牌一致性尤其重要。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Flux"
      }), " 對乾淨色塊與留白構圖掌握最穩，自然語言理解佳，是扁平風的首選。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 風格化能力強、配色漂亮，但偶爾自作主張加陰影或材質，記得把 ", createVNode(_components.code, {
        children: "--no gradient, shadow, texture"
      }), " 寫進負面、並調低 ", createVNode(_components.code, {
        children: "--stylize"
      }), "。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配 flat illustration LoRA）可控性最高，建議 CFG 抓 6～8、負面寫滿 ", createVNode(_components.code, {
        children: "gradient, 3d, realistic shadow"
      }), "，適合需要精準色票的品牌專案。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話控制，可以一步步要「再少一個顏色」「左邊多留白」，對新手與快速產出最友善。我的流程通常是用 GPT Image 定調與色票，再到 Flux 量產一致的系列稿。"]
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

const url = "src/content/styles/flat-illustration.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/flat-illustration.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/flat-illustration.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
