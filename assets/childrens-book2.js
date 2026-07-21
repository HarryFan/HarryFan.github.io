import { v as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';

const frontmatter = {
  "title": "童書繪本風格",
  "description": "溫暖手繪質感、柔和色彩與天真敘事，經典童書繪本的療癒插畫風。",
  "category": "illustration",
  "tags": ["童書繪本", "兒童插畫", "手繪質感", "故事插圖"],
  "difficulty": "easy",
  "prompt_zh": "童書繪本插畫風格，溫暖的手繪質感，柔和的水彩與蠟筆筆觸，天真可愛的角色，溫馨的故事場景，柔和的紙張紋理，明亮但不刺眼的色彩，圓潤友善的造型，留白構圖，療癒的氛圍",
  "prompt_en": "children's book illustration, warm hand-drawn texture, soft watercolor and crayon strokes, cute innocent characters, cozy storytelling scene, gentle paper grain, bright but soft colors, rounded friendly shapes, whimsical mood, picture book art, soft lighting",
  "negative_prompt": "photorealistic, 3d render, horror, dark, scary, hyperdetailed, anime, harsh outline, low quality, blurry, text, watermark, gritty, violent",
  "seo_title": "童書繪本風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整童書繪本插畫風格 AI 提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用手繪質感、柔和色彩與天真造型做出療癒繪本插圖，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/childrens-book.webp",
  "related_styles": ["watercolor", "gouache", "storybook-vintage", "clay", "flat-illustration", "ghibli"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["繪本插圖", "角色設計", "兒童教材", "賀卡設計", "社群貼文", "親子產品包裝"],
  "mistakes": ["畫面太寫實失去手繪溫度", "色彩太鮮豔刺眼不耐看", "造型太成熟不夠天真", "線條過硬破壞柔和感", "氛圍偏暗失去療癒感"],
  "prompt_breakdown": [{
    "term": "children's book illustration",
    "effect": "鎖定童書繪本的核心美術風格關鍵詞"
  }, {
    "term": "warm hand-drawn texture",
    "effect": "注入溫暖手繪質感，是繪本溫度的來源"
  }, {
    "term": "soft watercolor and crayon strokes",
    "effect": "指定水彩與蠟筆筆觸，營造童趣媒材感"
  }, {
    "term": "cute innocent characters",
    "effect": "讓角色天真可愛，貼近兒童視角"
  }, {
    "term": "gentle paper grain",
    "effect": "加入柔和紙張紋理，模擬實體繪本印刷感"
  }, {
    "term": "bright but soft colors",
    "effect": "明亮卻不刺眼的色彩，維持耐看的療癒調性"
  }],
  "faq": [{
    "q": "童書繪本風格在哪個 AI 工具效果最好？",
    "a": "Midjourney 對手繪溫度與水彩質感最自然，Flux 構圖穩定，GPT Image 最適合用對話維持系列角色一致。"
  }, {
    "q": "為什麼畫面太寫實沒有繪本感？",
    "a": "把 photorealistic、3d render 放進負面，正向加強 hand-drawn、watercolor、picture book style。"
  }, {
    "q": "如何讓色彩柔和耐看？",
    "a": "用 bright but soft colors、muted palette，避免高飽和刺眼色，並加 gentle paper grain 統一調性。"
  }, {
    "q": "童書插畫可以出版商用嗎？",
    "a": "風格本身不受著作權保護，但出版前建議確認模型授權，並避免重現特定繪本角色。"
  }, {
    "q": "為什麼角色太成熟不夠天真？",
    "a": "強調 cute innocent characters、rounded shapes，往頭大身小的可愛比例調整，避免寫實人體比例。"
  }, {
    "q": "怎麼維持整本書角色一致？",
    "a": "固定角色描述與 seed，Midjourney 用 cref 鎖角色，並統一色票與筆觸關鍵詞。"
  }, {
    "q": "適合哪些年齡層的繪本？",
    "a": "柔和明亮的調性適合幼兒到低年級，若要稍成熟可調低圓潤度、加入更細膩的場景敘事。"
  }, {
    "q": "中文還是英文 prompt 比較好？",
    "a": "多數模型對英文理解更精準，建議以英文為主，中文補充故事情境與情緒。"
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
      children: "童書繪本插畫承載的是孩子認識世界的第一印象，因此它的視覺語言天生帶著溫柔與善意。從《好餓的毛毛蟲》到《野獸國》，經典繪本的共通點是手感——你能感覺到畫家用水彩、蠟筆、色鉛筆在紙上留下的筆觸，那種不完美的溫度正是螢幕世代難以複製的魅力。當你下提示詞時，本質上是在請 AI 模擬「插畫家在紙上一筆一筆畫出的故事畫面」，而不是冷冰冰的數位渲染。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心在於媒材感與柔和度。", createVNode(_components.code, {
        children: "warm hand-drawn texture"
      }), " 與 ", createVNode(_components.code, {
        children: "soft watercolor and crayon strokes"
      }), " 是質感基礎，前者定義整體手繪調性，後者指定具體媒材的筆觸；再加 ", createVNode(_components.code, {
        children: "gentle paper grain"
      }), " 模擬實體紙張的纖維感，畫面立刻有印刷繪本的溫度。色彩上 ", createVNode(_components.code, {
        children: "bright but soft colors"
      }), " 是關鍵——童書要明亮吸引孩子，但不能高飽和刺眼，柔化後的色彩才耐看也更療癒。造型則用 ", createVNode(_components.code, {
        children: "cute innocent characters"
      }), " 與圓潤線條，貼近兒童的友善視角。"]
    }), "\n", createVNode(_components.p, {
      children: "題材上，繪本風最適合溫馨、天真、帶教育意義的敘事：動物朋友、睡前故事、四季變化、情感啟蒙。情緒應維持溫暖與安全感，因此不適合驚悚、暴力或冷硬的主題——一旦氛圍變暗，繪本的療癒本質就消失了。實作時記得讓主體單純、適度留白，並善用柔光營造安心的氣氛；做整本書時更要固定角色與色票，維持翻頁的一致性。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對手繪溫度與水彩暈染的還原最迷人，短 prompt 就有味道，維持同角色時用 ", createVNode(_components.code, {
        children: "--cref"
      }), " 配固定 ", createVNode(_components.code, {
        children: "--seed"
      }), "。", createVNode(_components.strong, {
        children: "Flux"
      }), " 構圖與敘事場景最穩，自然語言理解佳，適合描述複雜的故事畫面，但偶爾偏寫實，記得把 ", createVNode(_components.code, {
        children: "hand-drawn"
      }), "、", createVNode(_components.code, {
        children: "storybook"
      }), " 往前放。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配繪本 LoRA）可控性最高，建議 CFG 抓 5～7、負面寫滿 ", createVNode(_components.code, {
        children: "photorealistic, dark, scary"
      }), "，適合需要精準風格的出版專案。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代與角色一致，先生主角再要「換個場景但保持同一隻熊」，對製作整本繪本最友善。我的流程是用 GPT Image 定角色與調性，再到 Midjourney 或 Flux 量產各跨頁。"]
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

const url = "src/content/styles/childrens-book.mdx";
const file = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/childrens-book.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/childrens-book.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
