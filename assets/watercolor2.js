import { n as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "水彩風格",
  "description": "顏料暈染、紙張紋理與濕畫法，手繪水彩的通透與留白美學。",
  "category": "illustration",
  "tags": ["水彩", "手繪", "插畫", "暈染"],
  "difficulty": "easy",
  "prompt_zh": "水彩畫風格，顏料柔和暈染，可見的紙張紋理，濕中濕技法，細膩的淡彩層疊，手繪筆觸，鬆散自由的筆法，邊緣自然滲色，大量留白，清透淡雅的色調",
  "prompt_en": "watercolor painting, soft bleeding pigments, visible paper texture, wet-on-wet technique, delicate washes, hand-painted, loose brushwork, natural color bleeding edges, generous white space, light airy palette",
  "negative_prompt": "3d render, photorealistic, digital art, hard edges, oversaturated, vector, low quality, blurry, extra fingers, deformed hands, text, watermark, heavy outlines",
  "seo_title": "水彩風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整水彩風格 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用濕畫法、紙張紋理與暈染做出通透手繪感，適用 ChatGPT、Midjourney、Flux、Stable Diffusion。",
  "cover_image": "/styles/watercolor.webp",
  "related_styles": ["ghibli", "pixar", "makoto-shinkai", "pixel-art", "oil-painting", "anime"],
  "pubDate": "2026-06-23T00:00:00.000Z",
  "updated_at": "2026-06-23T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["賀卡", "插畫海報", "食譜插圖", "婚禮設計", "社群貼文", "繪本"],
  "mistakes": ["邊緣太銳利失去暈染感", "顏色過度飽和不通透", "缺少紙張紋理顯數位感", "畫面填太滿沒有留白", "加入硬描邊破壞水彩自然感"],
  "prompt_breakdown": [{
    "term": "watercolor painting",
    "effect": "鎖定整體水彩媒材風格的核心關鍵詞"
  }, {
    "term": "soft bleeding pigments",
    "effect": "製造顏料在濕紙上柔和擴散的效果"
  }, {
    "term": "visible paper texture",
    "effect": "保留紙張的纖維紋理，避免數位平滑感"
  }, {
    "term": "wet-on-wet technique",
    "effect": "指定濕中濕技法，讓色塊自然交融"
  }, {
    "term": "loose brushwork",
    "effect": "維持鬆散自由的筆觸，避免僵硬線條"
  }, {
    "term": "generous white space",
    "effect": "保留留白，這是水彩通透感的關鍵"
  }],
  "faq": [{
    "q": "水彩風格在哪個 AI 工具效果最好？",
    "a": "Midjourney 對暈染與紙張紋理的還原最自然，Flux 在筆觸控制上很穩，GPT Image 適合用對話微調色彩與留白。"
  }, {
    "q": "為什麼看起來像數位繪圖不像真水彩？",
    "a": "缺少紙張紋理與暈染。加入 visible paper texture、soft bleeding pigments、wet-on-wet，並把 digital art、hard edges 放進 Negative Prompt。"
  }, {
    "q": "如何讓畫面更通透？",
    "a": "強調 light airy palette、delicate washes、generous white space，並降低飽和度，水彩的美在於留白與淡彩。"
  }, {
    "q": "水彩風格可以商用嗎？",
    "a": "風格本身不受著作權保護，但請確認所用模型的授權條款，避免使用受版權保護的人物或畫作。"
  }, {
    "q": "為什麼邊緣太硬不自然？",
    "a": "加入 soft edges、natural color bleeding，並把 hard edges、vector 放進 Negative Prompt，水彩邊緣應該柔和滲色。"
  }, {
    "q": "適合做賀卡或婚禮設計嗎？",
    "a": "非常適合，清透淡雅的質感天生帶溫柔感，建議留足白底方便加文字。"
  }, {
    "q": "中文 prompt 和英文 prompt 哪個好？",
    "a": "多數模型對英文理解更精準，建議以英文為主、中文輔助描述題材與色調。"
  }, {
    "q": "怎麼讓多張圖風格一致？",
    "a": "固定同一組技法與色調關鍵詞與 seed，Midjourney 可用 style reference 鎖定整體筆觸與配色。"
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
      children: "水彩是一種「水主導、顏料服從」的媒材，它的美學完全建立在不可完全掌控的偶然性上。畫家把顏料稀釋後在濕潤的紙上落筆，水會帶著色素自由擴散，邊緣形成柔和的漸層與自然的水痕，乾燥後紙張纖維還會留下細微紋理。這跟油畫的厚塗、數位繪圖的精準完全相反。理解這點很重要：你下提示詞時，本質上是在請 AI 模擬「水在紙上流動」的物理結果，包括暈染、滲色、留白與不均勻的色塊，而不是畫一張乾淨銳利的插圖。"
    }), "\n", createVNode(_components.p, {
      children: ["技術上有幾個關鍵要素。第一是濕畫法，", createVNode(_components.code, {
        children: "wet-on-wet technique"
      }), " 與 ", createVNode(_components.code, {
        children: "soft bleeding pigments"
      }), " 能讓色塊在交界處自然交融，這是水彩最迷人的部分。第二是紙張質感，", createVNode(_components.code, {
        children: "visible paper texture"
      }), " 保留纖維的粗糙感，少了它畫面立刻變得像數位填色。第三是留白，", createVNode(_components.code, {
        children: "generous white space"
      }), " 讓畫面呼吸——傳統水彩很少把整張紙塗滿，白底本身就是構圖的一部分。再配上 ", createVNode(_components.code, {
        children: "loose brushwork"
      }), " 維持鬆散自由的筆觸，避免出現僵硬的描邊。色彩上偏淡彩通透，飽和度切忌過頭。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合溫柔、清新、文藝的內容：花卉植物、食物甜點、城市速寫、人像小品、旅行風景。它擅長承載輕盈、療癒、浪漫的情緒，不太適合科幻金屬或重口味的暗黑題材。做賀卡、婚禮設計、食譜插圖或繪本時，記得讓主體單純並保留大量留白，文字才有地方放，畫面也更透氣。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對暈染與紙張紋理的還原最自然，短 prompt 就能出味道；維持多張一致用 ", createVNode(_components.code, {
        children: "--sref"
      }), " 搭配固定 ", createVNode(_components.code, {
        children: "--seed"
      }), "，並用 ", createVNode(_components.code, {
        children: "--ar"
      }), " 鎖比例。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在筆觸與構圖控制上很穩，長句理解佳，那種濕中濕的交融它還原得細膩，但有時偏數位平滑，這時把 ", createVNode(_components.code, {
        children: "paper texture"
      }), "、", createVNode(_components.code, {
        children: "hand-painted"
      }), " 加重語氣。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配水彩 LoRA）可控性最高，能用 LoRA 權重與負面提示細調暈染強度，建議 CFG 抓 4～6（偏低能保留鬆散感）、負面寫 ", createVNode(_components.code, {
        children: "digital art, hard edges"
      }), "，並多張挑選滲色最自然的一張。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代——先生一版，再要「邊緣再柔一點」「多留點白」「色調淡一些」，對新手最友善，但暈染的隨機美感略遜前三者。我的做法是先用 GPT Image 定構圖與色調，再到 Midjourney 或 Flux 量產質感最佳的終稿。"]
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

const url = "src/content/styles/watercolor.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/watercolor.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/watercolor.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
