import { v as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';

const frontmatter = {
  "title": "雙重曝光",
  "description": "兩個影像疊合於同一畫面的攝影手法，常以人物剪影包裹風景，富詩意與象徵性。",
  "category": "realistic",
  "tags": ["雙重曝光", "攝影", "影像疊合", "剪影", "創意構圖"],
  "difficulty": "medium",
  "prompt_zh": "雙重曝光，人物側臉剪影中疊合森林與山脈，影像融合，高對比剪影輪廓，乾淨的白色背景，黑白與單色調，詩意象徵，無縫過渡的混合，精緻細節，藝術攝影",
  "prompt_en": "double exposure, silhouette of a face blended with forest and mountains, image blending, high contrast silhouette, clean white background, monochrome, poetic and symbolic, seamless transition, fine detail, fine art photography, surreal",
  "negative_prompt": "cluttered, muddy blend, low contrast, three images, busy background, harsh edges, text, watermark, noise, deformed, bad anatomy",
  "seo_title": "雙重曝光風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整雙重曝光 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用剪影輪廓、影像疊合、高對比與乾淨背景做出詩意象徵畫面，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/double-exposure.webp",
  "related_styles": ["portrait-photography", "photorealistic", "cinematic", "analog-film", "line-art", "ink-wash"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["人像創意照", "專輯封面", "海報設計", "品牌主視覺", "書籍封面", "社群藝術貼文"],
  "mistakes": ["兩圖疊得糊成一團失去輪廓", "對比不足讓剪影不明確", "背景雜亂破壞乾淨疊合", "疊入第三張影像顯得混亂", "過渡生硬出現明顯邊界"],
  "prompt_breakdown": [{
    "term": "double exposure",
    "effect": "鎖定雙重曝光這個影像疊合的核心攝影手法"
  }, {
    "term": "silhouette",
    "effect": "指定清晰的剪影輪廓作為承載第二影像的容器"
  }, {
    "term": "image blending",
    "effect": "強調兩個影像無縫融合而非生硬拼貼"
  }, {
    "term": "high contrast",
    "effect": "拉高對比讓剪影邊緣與疊合內容都清晰可辨"
  }, {
    "term": "clean white background",
    "effect": "用乾淨背景襯托剪影，避免雜訊干擾疊合"
  }, {
    "term": "seamless transition",
    "effect": "讓兩影像的交界自然過渡，沒有明顯接縫"
  }],
  "faq": [{
    "q": "雙重曝光在哪個 AI 工具效果最好？",
    "a": "Midjourney 對藝術疊合氛圍最直覺，Flux 對輪廓與過渡最乾淨，GPT Image 適合對話指定要疊合的兩個主題。"
  }, {
    "q": "為什麼兩張圖糊成一團？",
    "a": "加強 high contrast、clean silhouette、seamless transition，並用乾淨背景，讓主剪影輪廓先成立。"
  }, {
    "q": "怎麼指定要疊合哪兩個影像？",
    "a": "明確寫出容器與內容，如「人物側臉剪影中疊合森林」，主體當輪廓、風景當填充最穩。"
  }, {
    "q": "為什麼剪影不明確？",
    "a": "用 high contrast silhouette 並指定 clean white background，避免背景與剪影同色導致輪廓消失。"
  }, {
    "q": "可以疊三張影像嗎？",
    "a": "不建議，把 three images 放進 Negative，雙重曝光的力量來自兩影像的精煉象徵，三張容易雜亂。"
  }, {
    "q": "雙重曝光適合什麼題材？",
    "a": "人像創意照、專輯與書籍封面、品牌主視覺都很適合，天生帶詩意與象徵性。"
  }, {
    "q": "怎麼讓過渡更自然？",
    "a": "用 seamless transition、fade，描述影像從輪廓邊緣漸漸融入，避免 harsh edges 的生硬接縫。"
  }, {
    "q": "中文還是英文 prompt 較好？",
    "a": "英文對攝影合成術語理解更準，建議英文為主、中文補充象徵意涵與兩個疊合主題。"
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
      children: ["雙重曝光源自底片時代的攝影技法：在同一格底片上曝光兩次，讓兩個影像疊合在一起。數位時代雖然改用後製合成，但美學核心沒變——它不是把兩張照片硬拼在一起，而是讓它們在光影中交融，產生一加一大於二的詩意。最經典的構圖是用人物的側臉剪影作為「容器」，把森林、城市或山脈「裝」進輪廓裡，象徵人物的內心、記憶或命運。理解這層象徵性很重要，因為你下提示詞時是在設計「兩個有意義的影像如何交融」，而非隨機重疊。", createVNode(_components.code, {
        children: "double exposure"
      }), " 搭配明確的容器與內容描述，效果才精準。"]
    }), "\n", createVNode(_components.p, {
      children: ["技術核心有兩塊。第一是", createVNode(_components.strong, {
        children: "剪影與對比"
      }), "：雙重曝光的成敗，幾乎取決於主剪影是否清晰。需要 ", createVNode(_components.code, {
        children: "high contrast silhouette"
      }), " 把輪廓壓得明確，並用 ", createVNode(_components.code, {
        children: "clean white background"
      }), "（乾淨背景）襯托，避免背景雜訊把疊合內容攪糊。輪廓一旦成立，第二影像才有「填充」的空間。第二是", createVNode(_components.strong, {
        children: "融合方式"
      }), "：好的雙重曝光講究 ", createVNode(_components.code, {
        children: "image blending"
      }), " 與 ", createVNode(_components.code, {
        children: "seamless transition"
      }), "——兩影像在交界處自然過渡、互相滲透，而不是生硬的邊界貼合。色調上常用 ", createVNode(_components.code, {
        children: "monochrome"
      }), " 或單色調，把注意力集中在形狀與疊合關係上，減少色彩干擾。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合內省、詩意、帶象徵意味的敘事：人與自然的連結、回憶與鄉愁、身分與夢境。它天生適合專輯封面、書籍封面、品牌主視覺與藝術人像，能承載沉靜、神祕與一絲憂傷，但因為強調精煉象徵，不適合資訊量大或熱鬧繁複的主題。設計時務必克制——一個清晰的容器、一個有意義的填充，就足夠了。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對藝術疊合的氛圍與美感最直覺，常常短 prompt 就能出有設計感的雙曝，建議 ", createVNode(_components.code, {
        children: "--ar 2:3"
      }), " 拍人像直幅、加 ", createVNode(_components.code, {
        children: "--stylize"
      }), " 提升藝術性。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在輪廓清晰度與過渡自然度上最穩，自然語言描述「側臉剪影中疊入森林、從髮絲處漸漸融入天空」執行得很準，是控制疊合關係的好選擇。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配雙曝 LoRA 或用圖層合成）可控性最高，能分別生成剪影與填充再混合，CFG 抓 5～7、負面寫滿 ", createVNode(_components.code, {
        children: "cluttered, muddy blend, three images"
      }), "，並用較高張數挑選疊合最乾淨的一張。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代——先生一版，再用自然語言要「剪影輪廓更清楚」「森林只填在臉的下半部」「背景純白」，對發想象徵組合最友善，但極致的融合質感與一致性略遜前三者。實務上我會先用 GPT Image 定容器與填充的組合，再交給 Midjourney 或 Flux 量產精緻終稿。"]
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

const url = "src/content/styles/double-exposure.mdx";
const file = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/double-exposure.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/double-exposure.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
