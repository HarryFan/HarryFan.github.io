import { t as createVNode, S as Fragment, _ as __astro_tag_component__ } from './astro/server.js';

const frontmatter = {
  "title": "新海誠風格",
  "description": "超細緻天空、體積光與絢爛色彩，新海誠動畫的情感系電影感美學。",
  "category": "anime",
  "tags": ["新海誠", "動畫", "天空", "光影"],
  "difficulty": "medium",
  "prompt_zh": "新海誠風格，超細緻的天空與雲層，體積感的耶穌光，鏡頭光暈，鮮豔飽和的色彩，照片級寫實的雲，情感豐沛的電影感光線，黃昏逆光，閃爍的光斑，唯美都市背景",
  "prompt_en": "Makoto Shinkai style, hyper-detailed skies, volumetric god rays, lens flare, vivid saturated colors, photorealistic clouds, emotional cinematic lighting, golden hour backlight, sparkling bokeh, beautiful detailed cityscape, anime film",
  "negative_prompt": "flat colors, dull sky, low detail, photorealistic faces, sketch, low quality, blurry, extra fingers, deformed hands, text, watermark, washed out",
  "seo_title": "新海誠風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整新海誠風格 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用超細緻天空、體積光與鏡頭光暈做出情感系電影感，適用 ChatGPT、Midjourney、Flux、SD。",
  "related_styles": ["ghibli", "pixar", "watercolor", "pixel-art", "cyberpunk", "anime"],
  "pubDate": "2026-06-23T00:00:00.000Z",
  "updated_at": "2026-06-23T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["桌布", "海報", "社群貼文", "YouTube Thumbnail", "MV分鏡", "小說封面"],
  "mistakes": ["天空太單調缺乏層次", "色彩飽和過頭變廉價", "體積光過強蓋掉主體", "構圖缺乏景深透視", "角色臉部寫實破壞動畫感"],
  "prompt_breakdown": [{
    "term": "Makoto Shinkai style",
    "effect": "鎖定整體新海誠美術風格的核心關鍵詞"
  }, {
    "term": "hyper-detailed skies",
    "effect": "強化天空與雲層的細緻層次，這是風格招牌"
  }, {
    "term": "volumetric god rays",
    "effect": "加入穿透雲層或樹葉的體積光束"
  }, {
    "term": "lens flare",
    "effect": "製造鏡頭光暈，營造逆光電影感"
  }, {
    "term": "vivid saturated colors",
    "effect": "拉高色彩飽和與通透感"
  }, {
    "term": "emotional cinematic lighting",
    "effect": "控制成帶情緒張力的電影感光線"
  }],
  "faq": [{
    "q": "新海誠風格在哪個 AI 工具效果最好？",
    "a": "Midjourney 對天空與光暈的還原最華麗，Flux 在雲層細節與透視上很穩，GPT Image 適合用對話微調光線與構圖。"
  }, {
    "q": "為什麼天空畫得很單調？",
    "a": "缺少細節與層次關鍵詞。加入 hyper-detailed skies、photorealistic clouds、volumetric god rays，並指定黃昏或雨後等具體時段。"
  }, {
    "q": "如何做出招牌的逆光感？",
    "a": "強調 golden hour backlight、lens flare、rim light，讓光源在主體後方，邊緣帶高光。"
  }, {
    "q": "新海誠風格可以商用嗎？",
    "a": "風格本身不受著作權保護，但避免直接重現特定電影畫面或角色，並確認所用模型的授權條款。"
  }, {
    "q": "為什麼色彩看起來很廉價？",
    "a": "通常是飽和過頭。把 vivid 調節到適中，加入 cinematic color grading，並避免把所有顏色都推到最高飽和。"
  }, {
    "q": "適合做 YouTube 縮圖嗎？",
    "a": "很適合，絢爛天空與高對比逆光在縮圖中極吸睛，建議搭配大字標題並留出文字空間。"
  }, {
    "q": "中文 prompt 和英文 prompt 哪個好？",
    "a": "多數模型對英文理解更精準，建議以英文為主、中文輔助描述時段與情緒。"
  }, {
    "q": "怎麼讓多張圖風格一致？",
    "a": "固定同一組光線與色調關鍵詞與 seed，Midjourney 可用 style reference（sref）鎖定整體調性。"
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
      children: "新海誠的美學是把「動畫角色」放進「近乎照片的背景」裡，再用光線把整個畫面的情緒拉滿。他早年獨自製作《星之聲》時就奠定了這套路數，後來在《你的名字》《天氣之子》達到工業化的高峰。風格最大的辨識點是天空——層層堆疊、細到能看見雲的紋理與通透感，配上黃昏、雨後、夏日午後這些情緒濃度最高的時段。理解這點很關鍵：你下提示詞時，本質上是在請 AI 同時做好「細緻寫實的背景」與「乾淨的動畫角色」這兩種衝突的質感，並用光把它們黏在一起。"
    }), "\n", createVNode(_components.p, {
      children: ["光是新海誠的靈魂。他大量使用體積光（god rays）穿過雲縫與樹葉，鏡頭光暈（lens flare）製造逆光的眩光感，再加上水面、玻璃、瞳孔上的高光反射與閃爍光斑。所以 ", createVNode(_components.code, {
        children: "volumetric god rays"
      }), "、", createVNode(_components.code, {
        children: "lens flare"
      }), "、", createVNode(_components.code, {
        children: "emotional cinematic lighting"
      }), " 這幾個詞幾乎是必備：第一個給你光束，第二個給你眩光，第三個把整體調性推向有情緒張力的電影感。背景則靠 ", createVNode(_components.code, {
        children: "hyper-detailed skies"
      }), " 與 ", createVNode(_components.code, {
        children: "photorealistic clouds"
      }), " 撐起那種「美到不真實」的天空。色彩上偏鮮豔但通透，記得別把飽和度推到爆掉，那會顯廉價。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合青春、思念、淡淡哀愁與一點點奇幻：放學後的天台、雨中的車站月台、夏日電車窗外、城市夜景中的霓虹與星空。它擅長承載「想念某個人」這類細膩情緒，不太適合冷硬機械或恐怖題材。做桌布、海報、小說封面或 MV 分鏡時，記得保留透視景深，讓畫面有縱深，光才有戲。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異明顯。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對天空與光暈的渲染最華麗，niji 模式尤其擅長動畫質感，短 prompt 就能出味道；維持多張一致用 ", createVNode(_components.code, {
        children: "--sref"
      }), " 搭配固定 ", createVNode(_components.code, {
        children: "--seed"
      }), "，並以 ", createVNode(_components.code, {
        children: "--ar 16:9"
      }), " 鎖比例。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在雲層細節與都市透視上很穩，長句理解佳，那種層次分明的天空它還原得扎實，但有時光暈偏弱，這時把 ", createVNode(_components.code, {
        children: "lens flare"
      }), "、", createVNode(_components.code, {
        children: "god rays"
      }), " 加重語氣。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配新海誠 LoRA）可控性最高，能用 LoRA 權重與負面提示細調光的強弱，建議 CFG 抓 6～8、負面寫 ", createVNode(_components.code, {
        children: "flat colors, dull sky"
      }), "，並多張挑選光線最戲劇化的一張。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代——先生一版，再要「天空再戲劇化一點」「加一道逆光」「色調往黃昏走」，對新手最友善，但細膩度與一致性略遜前三者。我的做法是先用 GPT Image 定情緒與構圖方向，再到 Midjourney 或 Flux 量產高品質終稿。"]
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

const url = "src/content/styles/makoto-shinkai.mdx";
const file = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/makoto-shinkai.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/makoto-shinkai.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
