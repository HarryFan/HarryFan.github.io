import { v as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';

const frontmatter = {
  "title": "HDR 風光攝影",
  "description": "高動態範圍的風景攝影，亮部與暗部細節兼顧，色彩飽滿、層次豐富的壯麗風光。",
  "category": "realistic",
  "tags": ["HDR", "風光攝影", "高動態範圍", "風景", "廣角"],
  "difficulty": "medium",
  "prompt_zh": "HDR 風光攝影，高動態範圍，亮部與暗部細節兼顧，色彩飽滿層次豐富，戲劇性天空與雲彩，廣角鏡頭，超高清晰度，前景中景遠景分明，自然光，壯麗的山川湖海，銳利通透",
  "prompt_en": "HDR landscape photography, high dynamic range, balanced highlights and shadows, vivid rich colors, dramatic sky and clouds, wide angle lens, ultra sharp, foreground midground background depth, natural light, majestic scenery, crisp and clear, 14mm",
  "negative_prompt": "flat lighting, blown highlights, crushed blacks, low detail, dull colors, soft focus, noise, oversaturated halo, text, watermark, motion blur",
  "seo_title": "HDR 風光攝影風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整 HDR 風光攝影 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用高動態範圍、戲劇天空、廣角縱深與通透色彩做出壯麗風景，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/hdr-landscape.webp",
  "related_styles": ["photorealistic", "golden-hour", "cinematic", "concept-art", "analog-film", "macro-photography"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["風景桌布", "旅遊攝影", "自然海報", "戶外品牌視覺", "月曆插圖", "環境主視覺"],
  "mistakes": ["飽和度過頭出現假假的 HDR 暈光", "亮部過曝細節全失", "暗部死黑沒層次", "構圖缺少前景縱深顯得平淡", "天空與地面光線方向不一致"],
  "prompt_breakdown": [{
    "term": "HDR landscape photography",
    "effect": "鎖定高動態範圍的風光攝影核心風格"
  }, {
    "term": "high dynamic range",
    "effect": "強調同時保留亮部與暗部細節的寬廣明暗範圍"
  }, {
    "term": "balanced highlights and shadows",
    "effect": "平衡高光與陰影，避免過曝與死黑"
  }, {
    "term": "dramatic sky and clouds",
    "effect": "加入戲劇性的天空雲彩，提升畫面張力"
  }, {
    "term": "wide angle lens",
    "effect": "用廣角鏡頭納入壯闊視野與前景縱深"
  }, {
    "term": "foreground midground background depth",
    "effect": "建立前中遠景的層次，強化空間縱深"
  }],
  "faq": [{
    "q": "HDR 風光攝影在哪個 AI 工具效果最好？",
    "a": "Midjourney 對壯麗氛圍與天空最討喜，Flux 對細節與動態範圍最自然，GPT Image 適合對話迭代構圖與地點。"
  }, {
    "q": "為什麼畫面有假假的 HDR 暈光？",
    "a": "把 oversaturated halo 放進 Negative，並用 balanced、natural light，避免過度 HDR 的邊緣光暈與假飽和。"
  }, {
    "q": "怎麼讓亮部暗部都有細節？",
    "a": "用 high dynamic range、balanced highlights and shadows，並把 blown highlights、crushed blacks 放進 Negative。"
  }, {
    "q": "怎麼營造空間縱深？",
    "a": "用 foreground midground background depth、wide angle，安排前景岩石或花草作引導，縱深立刻成立。"
  }, {
    "q": "天空怎麼拍得更有張力？",
    "a": "用 dramatic sky and clouds、godrays，描述雲層厚重或光束穿透，天空就是風光照的靈魂。"
  }, {
    "q": "HDR 和一般風景照差在哪？",
    "a": "HDR 同時保留極亮天空與極暗陰影的細節，動態範圍更寬，色彩與層次比單張曝光更豐富。"
  }, {
    "q": "為什麼顏色看起來不真實？",
    "a": "適度即可，把 oversaturated 放進 Negative，改用 vivid rich colors 而非 hyper saturated，保持通透自然。"
  }, {
    "q": "中文還是英文 prompt 較好？",
    "a": "英文對攝影與鏡頭術語理解更準，建議英文為主、中文補充地點、季節與天氣氛圍。"
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
      children: ["HDR（High Dynamic Range，高動態範圍）風光攝影解決的是相機的根本限制：單張曝光無法同時記錄極亮的天空與極暗的陰影。傳統做法是包圍曝光多張、再合成出亮暗皆有細節的成品。它的目標是讓畫面更接近人眼所見的豐富層次——天空的雲不死白、樹蔭下的岩石不死黑。理解這點很重要，因為你下提示詞時，本質上是在請 AI 模擬「動態範圍被擴展、亮暗細節都保留」的影像結果，而不是把照片暴力拉飽和。", createVNode(_components.code, {
        children: "HDR landscape photography"
      }), " 搭配 ", createVNode(_components.code, {
        children: "high dynamic range"
      }), "、", createVNode(_components.code, {
        children: "balanced highlights and shadows"
      }), "，才能導向真實而非假假的 HDR。"]
    }), "\n", createVNode(_components.p, {
      children: ["技術核心有兩塊。第一是", createVNode(_components.strong, {
        children: "動態範圍的平衡"
      }), "：HDR 最容易翻車的地方，就是過度處理導致 ", createVNode(_components.code, {
        children: "oversaturated halo"
      }), "（假飽和與邊緣暈光），那種「塑膠感」正是業餘 HDR 的標誌。正確做法是強調 ", createVNode(_components.code, {
        children: "balanced"
      }), " 與 ", createVNode(_components.code, {
        children: "natural light"
      }), "，讓亮部如雲彩、暗部如陰影各自保有細節與通透感。第二是", createVNode(_components.strong, {
        children: "構圖縱深"
      }), "：風光攝影的魅力來自空間感，需要 ", createVNode(_components.code, {
        children: "wide angle lens"
      }), "（廣角）納入壯闊視野，並刻意安排 ", createVNode(_components.code, {
        children: "foreground midground background depth"
      }), "——前景的岩石、花草或水流作引導線，把視線一路帶向遠方的山稜，縱深就出來了。", createVNode(_components.code, {
        children: "dramatic sky and clouds"
      }), "（戲劇性天空）則往往是整張照片的靈魂。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合壯麗、開闊、帶敬畏感的自然敘事：高山雪峰、湖泊倒影、海岸峭壁、雲海與星空。它能承載寧靜、磅礡與遼闊的情緒，常用於桌布、月曆、旅遊與戶外品牌視覺。構圖時務必設好前景引導、確保天空與地面的光線方向一致，避免畫面變成兩塊拼貼。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對壯麗氛圍、天空與色彩最討喜，常常短 prompt 就有明信片級的張力，建議 ", createVNode(_components.code, {
        children: "--ar 16:9"
      }), " 或 ", createVNode(_components.code, {
        children: "--ar 3:2"
      }), "，想更寫實可加 ", createVNode(_components.code, {
        children: "--style raw"
      }), " 壓掉過度藝術化。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在動態範圍與細節還原上最自然，亮暗過渡平順、不易出現假暈光，自然語言描述「天空雲層有細節、陰影裡的岩石也看得見」執行得很準。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配風光 LoRA）可控性最高，適合用 ControlNet 鎖地平線與構圖，CFG 抓 5～7、負面寫滿 ", createVNode(_components.code, {
        children: "flat lighting, blown highlights, oversaturated halo"
      }), "，並用較高張數挑選層次最通透的一張。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代——先生一版，再用自然語言要「天空雲彩更戲劇」「前景加塊岩石做引導」「飽和度收一點」，對不熟參數的人最友善，但極致的細節與一致性略遜前三者。實務上我會先用 GPT Image 定構圖與地點，再交給 Midjourney 或 Flux 量產高解析終稿。"]
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

const url = "src/content/styles/hdr-landscape.mdx";
const file = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/hdr-landscape.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/hdr-landscape.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
