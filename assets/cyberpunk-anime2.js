import { v as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';

const frontmatter = {
  "title": "賽博龐克動畫",
  "description": "霓虹光暈、雨夜街景與高反差光影，賽博龐克未來都市的動畫質感。",
  "category": "anime",
  "tags": ["賽博龐克", "霓虹", "未來都市", "動畫"],
  "difficulty": "medium",
  "prompt_zh": "賽博龐克動畫風格，霓虹燈光暈，雨夜的未來都市街景，全像投影廣告，高反差冷暖對比光影，潮濕反光的地面，賽璐璐上色，電影感構圖，深藍與洋紅霓虹色調",
  "prompt_en": "cyberpunk anime style, neon glow, rainy futuristic cityscape, holographic advertisements, high contrast lighting, wet reflective streets, cel shading, cinematic composition, magenta and cyan neon palette, dystopian megacity, dramatic rim light",
  "negative_prompt": "bright daylight, pastel colors, rural scenery, photorealistic, 3d render, low quality, blurry, extra fingers, deformed hands, text, watermark, flat lighting",
  "seo_title": "賽博龐克動畫風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整賽博龐克動畫風格 AI 提示詞教學，附中英文 Prompt、Negative Prompt、霓虹光暈與雨夜街景關鍵詞拆解，教你做出未來都市質感，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/cyberpunk-anime.webp",
  "related_styles": ["anime", "makoto-shinkai", "mecha", "retro-anime-80s", "shonen-manga", "vaporwave"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["角色立繪", "場景概念圖", "專輯封面", "遊戲視覺", "社群貼文", "海報設計"],
  "mistakes": ["霓虹色過多顯髒亂", "光影對比不足失去氛圍", "街景缺乏細節顯空洞", "配色偏暖失去冷冽感", "主體被環境光淹沒"],
  "prompt_breakdown": [{
    "term": "cyberpunk anime style",
    "effect": "鎖定賽博龐克動畫的整體美術走向"
  }, {
    "term": "neon glow",
    "effect": "加入霓虹燈的發光暈染，這是風格的標誌"
  }, {
    "term": "rainy futuristic cityscape",
    "effect": "建立雨夜未來都市的場景基調"
  }, {
    "term": "high contrast lighting",
    "effect": "強化明暗高反差，營造戲劇張力"
  }, {
    "term": "wet reflective streets",
    "effect": "讓地面潮濕反光，倍增霓虹氛圍"
  }, {
    "term": "magenta and cyan neon palette",
    "effect": "鎖定洋紅與青色的經典賽博龐克配色"
  }],
  "faq": [{
    "q": "賽博龐克動畫在哪個 AI 工具效果最好？",
    "a": "Midjourney 對霓虹氛圍與電影感光影還原最強，Flux 場景細節穩定，SD 配賽博龐克 LoRA 可控性高，GPT Image 適合對話調整氛圍。"
  }, {
    "q": "為什麼畫面顯得髒亂？",
    "a": "霓虹色種類太多會互相打架，建議鎖定 magenta and cyan 為主色，其餘當點綴，並保留足夠暗部。"
  }, {
    "q": "怎麼讓霓虹更有氛圍？",
    "a": "加上 neon glow、wet reflective streets，讓燈光在潮濕地面反射延伸，光暈才會有層次。"
  }, {
    "q": "為什麼少了那種冷冽未來感？",
    "a": "把 bright daylight、warm colors 放進負面，正向加重 high contrast lighting 與冷色霓虹調。"
  }, {
    "q": "角色被環境光淹沒怎麼辦？",
    "a": "加上 dramatic rim light 替角色打輪廓光，並用淺景深虛化背景霓虹，把主體拉回前景。"
  }, {
    "q": "中文 prompt 和英文 prompt 哪個好？",
    "a": "英文對賽博龐克專用術語理解更準，建議英文為主、中文補充構圖與情緒。"
  }, {
    "q": "怎麼做出電影分鏡的構圖感？",
    "a": "加入 cinematic composition、low angle、wide shot 等鏡頭語言，並用 16:9 比例強化電影框景。"
  }, {
    "q": "適合做專輯封面或海報嗎？",
    "a": "非常適合，高反差霓虹天生有視覺衝擊力，建議預留文字排版空間並固定主色調。"
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
      children: "賽博龐克動畫的視覺語言，誕生於《阿基拉》《攻殼機動隊》一脈相承的反烏托邦想像，核心是「高科技、低生活」的矛盾美學。它描繪的是一座永遠在下雨、被霓虹與全像廣告淹沒的巨型都市，光鮮的科技表象下藏著陰暗與疏離。理解這層精神很重要：當你下提示詞時，本質上是在請 AI 構築一個「資訊過載、光影濃烈、情緒孤獨」的未來都市，而不只是把角色塗上幾道螢光色。氛圍的厚度，遠比霓虹的數量更重要。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心可拆成三塊。第一是光，", createVNode(_components.code, {
        children: "neon glow"
      }), " 與 ", createVNode(_components.code, {
        children: "high contrast lighting"
      }), " 是風格命脈，霓虹必須會發光暈染、明暗對比要拉到極致，暗部要夠暗才能襯出光的銳利。第二是環境，", createVNode(_components.code, {
        children: "rainy futuristic cityscape"
      }), " 配上 ", createVNode(_components.code, {
        children: "wet reflective streets"
      }), "，潮濕地面把霓虹反射延伸成第二層光源，這是賽博龐克最迷人的細節。第三是配色，", createVNode(_components.code, {
        children: "magenta and cyan neon palette"
      }), " 鎖定洋紅與青的冷冽對比，再用 ", createVNode(_components.code, {
        children: "dramatic rim light"
      }), " 替角色打輪廓光，避免主體被環境吞沒。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格擅長表達孤獨、疏離、躁動與反抗：街頭駭客、義體傭兵、雨夜獨行的角色、滿是廣告的後巷。它能承載冷峻、神秘與張力，但不適合溫馨治癒或明亮日常的題材——一旦放進大白天的暖光，整個賽博龐克的靈魂就消失了。做場景概念圖或專輯封面時，記得保留大面積暗部，讓霓虹在黑暗中發亮，並善用淺景深製造都市縱深。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對霓虹氛圍與電影感光影的還原最強，雨夜質感、反光地面都很到位，短 prompt 就有大片感，用 ", createVNode(_components.code, {
        children: "--ar 16:9"
      }), " 強化電影框景。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在開源陣營場景細節與構圖最穩，自然語言理解佳，複雜街景不易崩，但霓虹有時偏弱，這時把 ", createVNode(_components.code, {
        children: "neon glow"
      }), "、", createVNode(_components.code, {
        children: "high contrast"
      }), " 往前放、加重語氣。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配賽博龐克 LoRA）可控性最高，能精調霓虹密度與色調，建議 CFG 抓 6～8、負面寫滿 ", createVNode(_components.code, {
        children: "bright daylight, flat lighting"
      }), "，並大量出圖挑光影最戲劇化的一張。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代，先生一版再要「霓虹再冷一點」「加上雨」「背景虛化多一些」，對新手最友善，但細膩度略遜前三者。我的實務流程是：用 GPT Image 快速定氛圍與構圖，再拿到 Midjourney 或 SD 量產高品質終稿。"]
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

const url = "src/content/styles/cyberpunk-anime.mdx";
const file = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/cyberpunk-anime.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/cyberpunk-anime.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
