import { n as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "機甲動畫",
  "description": "精密機械結構、金屬反光與壯闊比例，機甲動畫的硬派科幻質感。",
  "category": "anime",
  "tags": ["機甲", "機器人", "科幻", "動畫"],
  "difficulty": "hard",
  "prompt_zh": "機甲動畫風格，精密複雜的機械結構與裝甲分件，金屬與磨砂材質的反光，巨大壯闊的比例感，動感的戰鬥姿態，推進器噴焰與能量特效，賽璐璐上色，戲劇性的低角度構圖，科幻機甲設定圖質感",
  "prompt_en": "mecha anime style, intricate mechanical panel lines, metallic and matte armor reflections, massive imposing scale, dynamic battle pose, thruster flames and energy effects, cel shading, dramatic low angle, hard surface robot design, sci-fi cockpit details",
  "negative_prompt": "organic soft shapes, cute chibi, simple flat design, photorealistic, 3d render, low quality, blurry, melted metal, deformed mechanics, text, watermark, messy details",
  "seo_title": "機甲動畫風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整機甲動畫風格 AI 提示詞教學，附中英文 Prompt、Negative Prompt、機械分件與金屬反光關鍵詞拆解，教你做出硬派科幻機甲質感，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/mecha.webp",
  "related_styles": ["anime", "cyberpunk-anime", "shonen-manga", "concept-art", "blender-3d", "retro-anime-80s"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["機甲設定圖", "戰鬥場面", "海報設計", "遊戲概念圖", "模型參考", "社群貼文"],
  "mistakes": ["機械結構含糊不夠精密", "金屬缺乏反光顯塑膠", "比例不夠壯闊缺乏氣勢", "裝甲分件混亂不合理", "姿勢僵硬缺乏動感"],
  "prompt_breakdown": [{
    "term": "mecha anime style",
    "effect": "鎖定機甲動畫的整體硬派科幻走向"
  }, {
    "term": "intricate mechanical panel lines",
    "effect": "指定精密的機械結構與裝甲分件"
  }, {
    "term": "metallic and matte armor reflections",
    "effect": "還原金屬與磨砂材質的反光質感"
  }, {
    "term": "massive imposing scale",
    "effect": "營造巨大壯闊的比例與氣勢"
  }, {
    "term": "thruster flames and energy effects",
    "effect": "加入推進器噴焰與能量特效"
  }, {
    "term": "dramatic low angle",
    "effect": "用低角度構圖放大機甲的壓迫感"
  }],
  "faq": [{
    "q": "機甲動畫在哪個 AI 工具效果最好？",
    "a": "Midjourney 對金屬質感與氣勢還原最強，Flux 機械結構最穩定，SD 配機甲 LoRA 可控性高，GPT Image 適合對話迭代設計。"
  }, {
    "q": "為什麼機械結構含糊不清？",
    "a": "加上 intricate mechanical panel lines、hard surface design，並把 messy details 放進負面，機甲講求結構清晰合理。"
  }, {
    "q": "怎麼讓金屬有質感？",
    "a": "用 metallic and matte armor reflections，明確指定金屬與磨砂的反光對比，避免整片同一質感顯塑膠。"
  }, {
    "q": "怎麼放大機甲氣勢？",
    "a": "用 massive imposing scale 與 dramatic low angle 低角度仰拍，並加上推進器噴焰製造動感與壯闊感。"
  }, {
    "q": "機甲是這幾個風格裡最難的嗎？",
    "a": "是，複雜機械結構最容易崩，建議多出圖、用清晰構圖，必要時分件描述或借助 SD 機甲專用模型。"
  }, {
    "q": "中文 prompt 和英文 prompt 哪個好？",
    "a": "英文對機甲術語理解更準，建議英文為主、中文補充姿態與場景。"
  }, {
    "q": "想做設定圖那種多視角怎麼辦？",
    "a": "加上 character sheet、multiple views、turnaround，並固定造型與 seed 維持一致。"
  }, {
    "q": "適合做遊戲概念圖嗎？",
    "a": "非常適合，精密結構與壯闊比例天生適合概念設計，建議搭配 concept art 關鍵詞並保留設計細節。"
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
      children: "機甲動畫的視覺語言，源自《機動戰士鋼彈》《新世紀福音戰士》一脈的硬派科幻傳統，核心是「用最精密的機械結構與最壯闊的比例，傳達鋼鐵的重量與力量」。它不講究柔美，而是把工業設計的邏輯搬進畫面——每一道裝甲分件、每一個關節結構、每一束推進器噴焰，都要看起來「合理且能運作」。理解這層精神很重要：當你下提示詞時，本質上是在請 AI 設計一台「結構嚴謹、材質真實、氣勢逼人」的戰鬥機器，而不只是畫個機器人輪廓。結構的可信度，是機甲最難也最關鍵的部分。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心可拆成三塊。第一是結構，", createVNode(_components.code, {
        children: "intricate mechanical panel lines"
      }), " 與 ", createVNode(_components.code, {
        children: "hard surface robot design"
      }), " 是命脈，裝甲要有清晰的分件、線條、螺絲與接縫，結構越合理越有說服力。第二是材質，", createVNode(_components.code, {
        children: "metallic and matte armor reflections"
      }), " 讓金屬與磨砂面形成反光對比，避免整台同一質感顯得像塑膠玩具。第三是氣勢，", createVNode(_components.code, {
        children: "massive imposing scale"
      }), " 配上 ", createVNode(_components.code, {
        children: "dramatic low angle"
      }), " 低角度仰拍，再加 ", createVNode(_components.code, {
        children: "thruster flames and energy effects"
      }), " 推進器噴焰，壯闊感與動感瞬間到位。這也是這個風格被列為高難度的原因——機械結構最容易崩壞。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格專精壯闊、硬派、戰鬥與科幻：機甲對決、出擊待機、機庫設定、能量爆發。它能承載沉重的史詩感與張力，但不適合柔軟可愛或溫馨日常的題材——一旦結構含糊、比例縮小，機甲的鋼鐵魂就垮了。做設定圖或戰鬥場面時，記得讓機械分件清晰、材質有反光對比，並善用低角度與噴焰特效放大氣勢與動感。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對金屬質感與壯闊氣勢的還原最強，反光、噴焰、戲劇光影都很到位，短 prompt 就有大片感，用 ", createVNode(_components.code, {
        children: "--ar 16:9"
      }), " 強化電影框景。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在開源陣營機械結構與構圖最穩，自然語言理解佳，複雜分件不易崩，是畫機甲最可靠的選擇之一，但材質有時偏弱，這時把 ", createVNode(_components.code, {
        children: "metallic reflections"
      }), "、", createVNode(_components.code, {
        children: "hard surface"
      }), " 往前放。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（配機甲 LoRA 與 ControlNet）可控性最高，能用線稿精準控制結構與多視角，建議 CFG 抓 6～8、負面寫滿 ", createVNode(_components.code, {
        children: "messy details, deformed mechanics"
      }), "，並大量出圖挑結構最合理的一張。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代，先生一版再要「裝甲分件更多」「加上推進器噴焰」「視角壓低」，對新手最友善，但複雜結構的細膩度略遜前三者。我的實務流程是：用 Flux 或 SD 把結構打穩，再拿到 Midjourney 強化質感與氣勢，產出高品質終稿。"]
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

const url = "src/content/styles/mecha.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/mecha.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/mecha.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
