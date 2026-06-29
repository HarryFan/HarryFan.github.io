import { l as createVNode, H as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "Arcane 影集風",
  "description": "融合手繪厚塗與 3D 的 Arcane 影集風，筆觸質感貼圖、油畫式光影與電影級分鏡，最具辨識度的當代動畫美學。",
  "category": "game",
  "tags": ["Arcane", "手繪3D", "厚塗質感", "油畫貼圖", "電影動畫"],
  "difficulty": "hard",
  "prompt_zh": "Arcane 影集動畫風格，融合手繪厚塗與 3D 的混合渲染，可見的油畫筆觸質感貼圖，戲劇性的電影光影，豐富的材質層次，飽和而有層次的色彩，蒸氣龐克奇幻場景，繪畫感的紋理疊加，Fortiche 工作室風格，電影級構圖",
  "prompt_en": "Arcane TV show style, Fortiche animation, hand-painted 3d hybrid render, visible oil paint brushstroke textures, painterly texture overlay, dramatic cinematic lighting, rich material layering, vibrant layered colors, steampunk fantasy setting, 2d painted on 3d, film grain, cinematic composition",
  "negative_prompt": "clean cel shading, flat colors, photorealistic, smooth plastic, low detail, anime moe, simple background, blurry, text, watermark, generic 3d render",
  "seo_title": "Arcane 影集風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整 Arcane 影集風 AI 提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用手繪厚塗質感貼圖、油畫光影與電影構圖做出 Fortiche 式混合渲染，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/arcane-style.webp",
  "related_styles": ["cel-shading", "genshin-style", "fantasy-rpg-art", "oil-painting", "concept-art", "dark-fantasy"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["角色立繪", "場景概念圖", "動畫風海報", "遊戲主視覺", "分鏡氛圍圖", "同人插畫"],
  "mistakes": ["質感太乾淨失去手繪筆觸", "變成普通賽璐珞卡通渲染", "光影平淡缺乏電影張力", "色彩單調沒有層次疊加", "背景過於簡單失去蒸氣龐克氛圍"],
  "prompt_breakdown": [{
    "term": "Arcane TV show style",
    "effect": "鎖定 Arcane 影集獨特混合渲染的美術核心"
  }, {
    "term": "hand-painted 3d hybrid render",
    "effect": "點明手繪與 3D 融合的渲染管線，這是最大特徵"
  }, {
    "term": "visible oil paint brushstroke textures",
    "effect": "強調可見的油畫筆觸質感貼圖，營造繪畫感"
  }, {
    "term": "painterly texture overlay",
    "effect": "在 3D 模型上疊加繪畫紋理，避免畫面太乾淨"
  }, {
    "term": "dramatic cinematic lighting",
    "effect": "加入戲劇性電影光影，撐起影集級張力"
  }, {
    "term": "Fortiche animation",
    "effect": "借用製作工作室名稱錨定其獨特視覺語言"
  }],
  "faq": [{
    "q": "Arcane 風在哪個 AI 工具效果最好？",
    "a": "Midjourney 對厚塗質感與電影光影最強，Flux 角色細節穩定，GPT Image 適合對話調整氛圍與分鏡。"
  }, {
    "q": "Arcane 風和一般卡通渲染差在哪？",
    "a": "卡通渲染是乾淨平塗色塊，Arcane 風刻意在 3D 上疊手繪油畫筆觸，質感粗糙有層次，更像會動的油畫。"
  }, {
    "q": "怎麼做出那種手繪筆觸質感？",
    "a": "寫 visible oil paint brushstroke textures、painterly texture overlay 搭配 hand-painted 3d hybrid，模型會疊上繪畫紋理。"
  }, {
    "q": "為什麼生出來太乾淨像普通 3D？",
    "a": "把 clean cel shading、smooth plastic、generic 3d render 放進 Negative Prompt，並加重 painterly、brushstroke。"
  }, {
    "q": "想要蒸氣龐克氛圍怎麼加？",
    "a": "加 steampunk fantasy setting、industrial city，並用暖冷對比光與煙霧強化工業奇幻氛圍。"
  }, {
    "q": "中文 prompt 還是英文好？",
    "a": "英文對 Fortiche、painterly、hybrid render 等術語理解更準，建議英文為主、中文補充角色與情緒。"
  }, {
    "q": "適合做動畫風海報嗎？",
    "a": "非常適合，電影級構圖與戲劇光影天生適合主視覺，建議用寬幅或直幅並保留筆觸層次。"
  }, {
    "q": "為什麼畫面缺乏電影張力？",
    "a": "多半缺少戲劇光影與色彩層次，加上 dramatic cinematic lighting 與 vibrant layered colors，並用明暗對比聚焦主體即可。"
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
      children: ["Arcane 影集風是近年最具辨識度的動畫美學突破，出自法國 ", createVNode(_components.code, {
        children: "Fortiche"
      }), " 工作室為 Riot 製作的《奧術 Arcane》。它最了不起的地方在於解決了一個長年難題：3D 動畫雖然製作高效、運鏡自由，卻常顯得乾淨冰冷、缺乏手繪的溫度與筆觸。Fortiche 的答案是「混合渲染」——用 3D 建立模型與場景骨架，再在上面一層層疊加手繪的油畫質感貼圖與紋理，讓畫面既有 3D 的立體運鏡，又有 2D 油畫的筆觸靈魂。理解這層由來很重要：下提示詞時，你要請 AI 模擬的不是普通卡通渲染，而是「3D 結構 + 手繪繪畫質感」的融合，那些刻意保留的粗糙筆觸正是它的招牌。"]
    }), "\n", createVNode(_components.p, {
      children: ["技術核心有三塊撐起這個風格。第一是", createVNode(_components.strong, {
        children: "混合渲染思維"
      }), "，", createVNode(_components.code, {
        children: "hand-painted 3d hybrid render"
      }), "、", createVNode(_components.code, {
        children: "2d painted on 3d"
      }), " 點明它既非純 3D 也非純 2D，而是兩者的疊合，這是與二次元手遊渲染最大的區別。第二是", createVNode(_components.strong, {
        children: "油畫筆觸質感"
      }), "，", createVNode(_components.code, {
        children: "visible oil paint brushstroke textures"
      }), "、", createVNode(_components.code, {
        children: "painterly texture overlay"
      }), " 在表面疊上可見的顏料筆觸與紋理，讓每個畫面都像會動的油畫，避免 3D 的塑膠光滑。第三是", createVNode(_components.strong, {
        children: "電影語言"
      }), "，", createVNode(_components.code, {
        children: "dramatic cinematic lighting"
      }), "、", createVNode(_components.code, {
        children: "cinematic composition"
      }), " 借用電影攝影的戲劇光影與構圖，再加上 ", createVNode(_components.code, {
        children: "vibrant layered colors"
      }), " 那種飽和卻有層次的配色，撐起影集級的視覺張力。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合戲劇化、有深度、帶工業奇幻感的內容：複雜的角色、蒸氣龐克城市、衝突場面、氛圍分鏡。它能承載細膩的情感與宏大的世界觀，比一般卡通渲染更能表達內心戲與陰影。做立繪或海報時建議用電影級構圖、戲劇光影與筆觸層次，並善用暖冷對比強化情緒。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對厚塗質感與電影光影的還原最強，短 prompt 就能逼近 ", createVNode(_components.code, {
        children: "Fortiche"
      }), " 那種混合渲染味道，鎖系列風格時固定 ", createVNode(_components.code, {
        children: "--seed"
      }), "、用 ", createVNode(_components.code, {
        children: "--ar 16:9"
      }), " 做分鏡、", createVNode(_components.code, {
        children: "--ar 2:3"
      }), " 做立繪，並可拉高 ", createVNode(_components.code, {
        children: "--stylize"
      }), " 增強繪畫感。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在開源陣營裡角色細節與構圖最穩，對長句自然語言理解佳，適合精準描述角色與場景結構，但偶爾質感偏乾淨，這時把 ", createVNode(_components.code, {
        children: "painterly"
      }), "、", createVNode(_components.code, {
        children: "brushstroke"
      }), " 往前放並加重。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配 Arcane/painterly LoRA）可控性最高，能用 ControlNet 鎖姿勢、區域重繪強化筆觸，建議 CFG 抓 6～8、負面寫滿 ", createVNode(_components.code, {
        children: "clean cel shading, smooth plastic, flat colors"
      }), "。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代，可以邊生邊要「筆觸再明顯點」「光影更戲劇」「加蒸氣龐克元素」，發想分鏡氛圍時最友善，但混合質感與一致性略遜前三者。實務流程通常先用 Midjourney 定氛圍與筆觸方向，再拿到 Flux 或 SD 精修角色細節做終稿。"]
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

const url = "src/content/styles/arcane-style.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/arcane-style.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/arcane-style.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
