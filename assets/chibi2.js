import { l as createVNode, H as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "Q版萌系",
  "description": "大頭小身、圓潤造型與超萌表情，Q版二頭身角色的可愛質感。",
  "category": "anime",
  "tags": ["Q版", "萌系", "二頭身", "角色設計"],
  "difficulty": "easy",
  "prompt_zh": "Q版萌系角色，誇張的大頭小身二頭身比例，圓潤討喜的造型，超大水汪汪的眼睛，腮紅與簡化的小手小腳，柔和的賽璐璐上色，明亮粉嫩的色彩，可愛貼圖風格，乾淨白底",
  "prompt_en": "chibi character, super deformed two-head-tall proportions, rounded cute design, huge sparkling eyes, blush cheeks, tiny simplified hands and feet, soft cel shading, bright pastel colors, kawaii sticker style, clean white background",
  "negative_prompt": "realistic proportions, tall body, detailed anatomy, photorealistic, 3d render, dark gritty, low quality, blurry, extra fingers, deformed face, text, watermark",
  "seo_title": "Q版萌系風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整Q版萌系風格 AI 提示詞教學，附中英文 Prompt、Negative Prompt、二頭身比例與大眼腮紅關鍵詞拆解，教你做出超萌貼圖角色，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/chibi.webp",
  "related_styles": ["anime", "shoujo-manga", "sticker", "webtoon", "clay", "pixar"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["貼圖設計", "角色頭像", "吉祥物", "周邊商品", "社群貼文", "表情包"],
  "mistakes": ["比例不夠誇張不夠萌", "眼睛太小失去萌感", "造型過於寫實顯僵硬", "配色太暗失去可愛感", "細節太多破壞簡化感"],
  "prompt_breakdown": [{
    "term": "chibi character",
    "effect": "鎖定Q版萌系角色的整體美術走向"
  }, {
    "term": "two-head-tall proportions",
    "effect": "指定誇張的二頭身比例，這是Q版的核心"
  }, {
    "term": "huge sparkling eyes",
    "effect": "放大水汪汪的大眼，強化萌感"
  }, {
    "term": "rounded cute design",
    "effect": "指定圓潤討喜的造型"
  }, {
    "term": "blush cheeks",
    "effect": "加上腮紅，提升角色親和力與可愛度"
  }, {
    "term": "clean white background",
    "effect": "乾淨白底，方便做貼圖與去背"
  }],
  "faq": [{
    "q": "Q版萌系在哪個 AI 工具效果最好？",
    "a": "Midjourney 造型最討喜，Flux 線條乾淨穩定，SD 配Q版 LoRA 可控性高，GPT Image 最適合對話迭代與做整套貼圖。"
  }, {
    "q": "為什麼角色不夠萌？",
    "a": "把比例推到 two-head-tall、眼睛放到 huge sparkling eyes，並加上 blush cheeks，比例越誇張通常越萌。"
  }, {
    "q": "怎麼做整套表情貼圖？",
    "a": "固定角色造型與 seed，再用同一描述換不同表情與動作，GPT Image 對話迭代最適合產整套貼圖。"
  }, {
    "q": "為什麼造型顯僵硬？",
    "a": "強調 rounded cute design，把 realistic proportions、detailed anatomy 放進負面，Q版要圓潤簡化。"
  }, {
    "q": "想要乾淨去背貼圖怎麼辦？",
    "a": "加上 clean white background 或 transparent background，方便後製去背做成 LINE 貼圖或周邊。"
  }, {
    "q": "中文 prompt 和英文 prompt 哪個好？",
    "a": "英文對 chibi、kawaii 等術語理解更準，建議英文為主、中文補充表情與動作。"
  }, {
    "q": "細節要畫多少？",
    "a": "Q版講求簡化，小手小腳、簡化五官即可，細節太多反而破壞萌感，把複雜紋理省略。"
  }, {
    "q": "適合做吉祥物或周邊嗎？",
    "a": "非常適合，圓潤討喜的造型天生適合吉祥物與周邊，建議固定造型確保多款動作一致。"
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
      children: "Q版萌系的視覺語言，源自日本動漫的「super deformed（超變形）」傳統，核心是「用最誇張的比例與最簡化的造型，把可愛推到極致」。它刻意打破真實人體比例，把頭放大到佔身體一半，把手腳縮小簡化，再配上一雙佔據半張臉的大眼睛。理解這層精神很重要：當你下提示詞時，本質上是在請 AI 把角色「壓縮、放大、圓潤化」成一團討喜的萌物，而不是畫個縮小版的正常角色。誇張的比例與簡化，才是Q版的靈魂。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心可拆成三塊。第一是比例，", createVNode(_components.code, {
        children: "two-head-tall proportions"
      }), " 是Q版的命脈，頭身比通常壓到二到三頭身，越誇張越萌。第二是五官，", createVNode(_components.code, {
        children: "huge sparkling eyes"
      }), " 配上 ", createVNode(_components.code, {
        children: "blush cheeks"
      }), "，大眼睛要水汪汪、佔臉部極大比例，腮紅則大幅提升親和力。第三是造型語言，", createVNode(_components.code, {
        children: "rounded cute design"
      }), " 把所有線條圓潤化、", createVNode(_components.code, {
        children: "tiny simplified hands and feet"
      }), " 把四肢簡化成小圓塊，再用 ", createVNode(_components.code, {
        children: "clean white background"
      }), " 方便去背做貼圖。細節越少，萌感反而越純粹。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格專精可愛、俏皮、療癒與歡樂：表情貼圖、吉祥物、周邊商品、角色頭像。它能承載輕鬆愉快的情緒，把任何角色變得親切討喜，但不適合嚴肅、寫實或陰暗的題材——一旦比例寫實、造型複雜，Q版的萌感就消失了。做貼圖或吉祥物時，記得把比例壓誇張、五官放大、背景留白，並善用腮紅與圓潤造型堆疊可愛度。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 造型最討喜，圓潤質感與可愛氛圍一流，短 prompt 就很萌，做頭像用 ", createVNode(_components.code, {
        children: "--ar 1:1"
      }), "。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在開源陣營線條乾淨與構圖最穩，自然語言理解佳，比例控制不錯，但偶爾偏寫實，這時把 ", createVNode(_components.code, {
        children: "chibi"
      }), "、", createVNode(_components.code, {
        children: "two-head-tall"
      }), " 往前放、加重語氣。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（配Q版 LoRA）可控性最高，能精調頭身比與眼睛大小，建議 CFG 抓 5～7、負面寫滿 ", createVNode(_components.code, {
        children: "realistic proportions, tall body"
      }), "，並固定 seed 做整套表情。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 最適合做整套貼圖——先定角色，再用對話換「開心」「生氣」「比愛心」等表情動作，一致性與便利性兼具，對新手最友善。我的實務流程是：用 GPT Image 定角色並產整套表情，再視需求拿到 Midjourney 或 SD 提升單張質感。"]
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

const url = "src/content/styles/chibi.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/chibi.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/chibi.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
