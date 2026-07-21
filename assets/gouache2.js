import { v as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';

const frontmatter = {
  "title": "水粉不透明畫",
  "description": "不透明顏料、絲絨般平塗色面與可見筆觸構成的水粉畫質感視覺風格。",
  "category": "illustration",
  "tags": ["水粉", "不透明顏料", "筆觸", "傳統媒材"],
  "difficulty": "medium",
  "prompt_zh": "水粉不透明畫風格，不透明顏料覆蓋筆觸，絲絨般霧面平塗色面，可見的乾刷筆觸質感，柔和飽滿的色彩層疊，啞光無光澤表面，溫暖的傳統媒材手感，輕微紙紋，富層次的厚塗",
  "prompt_en": "gouache painting, opaque paint matte finish, velvety flat color fields, visible dry brush strokes, soft layered colors, no gloss chalky surface, warm traditional media feel, subtle paper texture, painterly hand-painted look, rich layered opaque paint",
  "negative_prompt": "photorealistic, glossy, 3d render, digital smooth gradient, transparent watercolor wash, neon, sharp vector edges, flat lifeless color, watermark, text errors",
  "seo_title": "水粉不透明畫風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整水粉不透明畫 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用不透明顏料、霧面平塗與可見筆觸做出水粉畫質感，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/gouache.webp",
  "related_styles": ["watercolor", "oil-painting", "childrens-book", "storybook-vintage", "ghibli", "flat-illustration"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["繪本插圖", "風景插畫", "編輯雜誌插圖", "包裝設計", "海報主視覺", "角色概念設計"],
  "mistakes": ["畫面太透明像水彩失去不透明感", "表面太光澤不像啞面水粉", "筆觸全被抹平顯得數位", "顏色太鮮豔失去溫潤厚度", "色面缺乏層疊顯得單薄"],
  "prompt_breakdown": [{
    "term": "opaque paint matte finish",
    "effect": "鎖定水粉不透明且霧面的核心特性，區別於水彩"
  }, {
    "term": "velvety flat color fields",
    "effect": "製造絲絨般的霧面平塗色面，是水粉的招牌質感"
  }, {
    "term": "visible dry brush strokes",
    "effect": "保留可見的乾刷筆觸，呈現手繪媒材的痕跡"
  }, {
    "term": "soft layered colors",
    "effect": "用柔和的色彩層疊，營造水粉特有的厚實層次"
  }, {
    "term": "chalky surface",
    "effect": "指定粉質啞面表面，避免出現塑膠般的光澤"
  }, {
    "term": "subtle paper texture",
    "effect": "加入輕微紙紋，強化傳統紙上作畫的真實觸感"
  }],
  "faq": [{
    "q": "水粉風在哪個 AI 工具效果最好？",
    "a": "Midjourney 對筆觸與霧面質感最直覺，Flux 對配色與構圖較穩，GPT Image 適合用對話調整厚度與題材。"
  }, {
    "q": "水粉和水彩差在哪？",
    "a": "水彩透明、會留白與暈染；水粉不透明、可覆蓋、表面霧面。要水粉就強調 opaque、matte、velvety，並把 transparent watercolor 放進負面。"
  }, {
    "q": "為什麼看起來太數位太光滑？",
    "a": "缺少筆觸與紙紋。加入 visible dry brush strokes、chalky surface、subtle paper texture，並把 digital smooth gradient 放進負面。"
  }, {
    "q": "水粉風可以商用嗎？",
    "a": "風格本身不受著作權保護，但避免重現特定畫家作品，並確認所用模型授權條款。"
  }, {
    "q": "怎麼做出厚實的色彩層次？",
    "a": "寫 soft layered colors、rich opaque paint，並用相近色相層層堆疊，避免單層平塗顯得單薄。"
  }, {
    "q": "想要絲絨般的霧面要怎麼下？",
    "a": "強調 velvety flat color fields、matte no gloss，並把 glossy 放進負面提示，表面才會呈現粉質的柔霧感。"
  }, {
    "q": "中文 prompt 和英文 prompt 哪個好？",
    "a": "英文對 gouache、opaque、matte、dry brush 等術語理解更精準，建議以英文為主、中文補充題材與情緒。"
  }, {
    "q": "怎麼讓系列圖風格一致？",
    "a": "固定同一組筆觸、配色與紙紋關鍵詞與 seed，Midjourney 可用 sref 鎖定整體質感維持一致。"
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
      children: "水粉不透明畫（Gouache）介於水彩與壓克力之間，是一種以阿拉伯膠調和、加入白色顏料而變得不透明的水性媒材。它最迷人的特性是「霧面平塗」——顏料乾後呈現絲絨般的粉質啞光表面，沒有油畫的光澤，也沒有水彩的透明暈染，而是飽滿、均勻、帶著淡淡筆觸的色面。理解這層「不透明、可覆蓋、表面啞光」的物理特性很重要，因為你下提示詞時，最常見的誤區就是被 AI 拉去水彩的透明暈染，你得明確把它往「不透明、霧面」推。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心有三塊。第一是不透明與啞面：", createVNode(_components.code, {
        children: "opaque paint matte finish"
      }), " 與 ", createVNode(_components.code, {
        children: "chalky surface"
      }), " 是水粉的根本，務必把 ", createVNode(_components.code, {
        children: "transparent watercolor wash"
      }), " 與 ", createVNode(_components.code, {
        children: "glossy"
      }), " 放進負面提示，這是區分水粉與水彩、油畫的關鍵。第二是色面與筆觸：", createVNode(_components.code, {
        children: "velvety flat color fields"
      }), "（絲絨平塗色面）營造水粉招牌的柔霧質感，", createVNode(_components.code, {
        children: "visible dry brush strokes"
      }), "（可見乾刷筆觸）則保留手繪痕跡，讓畫面不至於變成數位平塗。第三是層次：", createVNode(_components.code, {
        children: "soft layered colors"
      }), "（柔和色彩層疊）與 ", createVNode(_components.code, {
        children: "subtle paper texture"
      }), "（輕微紙紋）讓色彩有厚度、有媒材的真實觸感。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合溫潤、文藝、帶手感的內容：風景、靜物、繪本、編輯插畫與角色概念。它擅長承載沉穩飽滿的情緒與傳統媒材的溫度，介於童趣與成熟之間，但不適合需要高光澤或冷硬科技感的場景。做插畫時，建議用相近色相層層堆疊製造厚度，並保留筆觸方向感，讓畫面有「真的有人畫過」的痕跡。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對水粉的筆觸與霧面質感最直覺，短 prompt 就有手繪味，建議 ", createVNode(_components.code, {
        children: "--ar 4:5"
      }), " 做插畫，並用 ", createVNode(_components.code, {
        children: "--sref"
      }), " 鎖定筆觸與配色調性。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在配色與構圖控制上最穩，對長句理解佳，要精確描述色相層疊與構圖時表現出色，但偶爾會偏向水彩透明感，記得加重 ", createVNode(_components.code, {
        children: "opaque, matte, chalky"
      }), "。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配 gouache LoRA）可控性最高，能靠 LoRA 與負面提示精調筆觸與紙紋強度，CFG 抓 5～7，負面寫滿 ", createVNode(_components.code, {
        children: "watercolor, glossy, digital"
      }), "。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 最適合對話迭代，可以逐句要「再不透明一點」「筆觸明顯些」「表面霧面」，對不熟媒材術語的人最友善，但霧面與筆觸的細膩度略遜前三者。實務上我會先用 GPT Image 定構圖與配色，再拿到 Midjourney 或 Flux 量產質感最佳的終稿。"]
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

const url = "src/content/styles/gouache.mdx";
const file = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/gouache.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/gouache.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
