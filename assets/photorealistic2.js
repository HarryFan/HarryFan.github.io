import { v as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';

const frontmatter = {
  "title": "超寫實攝影",
  "description": "以全片幅相機質感與精準光影，逼近肉眼難辨真偽的超寫實照片風格。",
  "category": "realistic",
  "tags": ["超寫實", "攝影", "相機質感", "光影", "高解析"],
  "difficulty": "hard",
  "prompt_zh": "超寫實攝影，全片幅相機拍攝，85mm 定焦鏡頭，f/1.8 大光圈淺景深，柔和的自然窗光，逼真的皮膚毛孔與次表面散射，8K 高解析細節，真實的膚色與質感，銳利對焦的眼睛，電影感色調",
  "prompt_en": "hyperrealistic photography, shot on full-frame DSLR, 85mm prime lens, f/1.8 shallow depth of field, soft natural window light, photorealistic skin pores and subsurface scattering, ultra-detailed 8K, realistic skin texture, sharp focus on eyes, true-to-life color, professional photo retouching",
  "negative_prompt": "cartoon, illustration, painting, anime, 3d render, cgi, plastic skin, oversaturated, deformed hands, extra fingers, blurry, low quality, watermark, text, airbrushed",
  "seo_title": "超寫實攝影風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整超寫實攝影 AI 提示詞教學，附中英文 Prompt、Negative Prompt、鏡頭光圈與打光拆解，教你用全片幅相機質感、次表面散射做出逼真照片，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/photorealistic.webp",
  "related_styles": ["portrait-photography", "cinematic", "analog-film", "street-photography", "golden-hour", "hdr-landscape"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": true,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["人像寫真", "商品攝影", "形象照", "廣告視覺", "證件照修圖", "模特兒作品集"],
  "mistakes": ["皮膚過度磨皮失去毛孔顯塑膠感", "缺少明確鏡頭與光圈導致景深平淡", "光源方向矛盾產生不自然陰影", "飽和度過高失去真實膚色", "眼睛失焦讓整張照片失去說服力"],
  "prompt_breakdown": [{
    "term": "hyperrealistic photography",
    "effect": "鎖定超寫實照片的整體基調，告訴模型這是相片而非插畫"
  }, {
    "term": "shot on full-frame DSLR",
    "effect": "指定全片幅相機，帶來更淺景深與更乾淨的高光暗部過渡"
  }, {
    "term": "85mm prime lens f/1.8",
    "effect": "經典人像鏡焦段與大光圈，營造壓縮感與奶油般散景"
  }, {
    "term": "soft natural window light",
    "effect": "柔和窗光是寫實感的核心，避免死板的棚燈塑膠味"
  }, {
    "term": "photorealistic skin pores and subsurface scattering",
    "effect": "保留毛孔與皮膚透光，是真偽分界的關鍵細節"
  }, {
    "term": "sharp focus on eyes",
    "effect": "把對焦點壓在眼睛，建立照片的銳利錨點與真實感"
  }],
  "faq": [{
    "q": "超寫實攝影在哪個 AI 工具效果最好？",
    "a": "Flux 對皮膚毛孔與光線物理的還原最自然，Midjourney 質感華麗但偶爾偏修圖味，GPT Image 適合用對話微調光線與構圖。"
  }, {
    "q": "為什麼生成的人臉看起來像塑膠或蠟像？",
    "a": "多半是磨皮過頭。把 photorealistic skin pores、subsurface scattering 寫進正向，並在負面加入 plastic skin、airbrushed。"
  }, {
    "q": "怎麼避免一看就知道是 AI 圖？",
    "a": "指定具體相機、鏡頭、光圈與光源方向，保留瑕疵與毛孔，避免過高飽和度與完美對稱。"
  }, {
    "q": "該選哪顆鏡頭焦段？",
    "a": "人像用 85mm 或 50mm，環境帶景用 35mm，商品特寫用 100mm 微距，焦段會直接影響透視與景深。"
  }, {
    "q": "超寫實和電影感差在哪？",
    "a": "超寫實追求中性真實的色彩與光線，電影感則刻意加入調色、寬畫幅與戲劇打光，兩者可疊加但目標不同。"
  }, {
    "q": "為什麼手指常常畫錯？",
    "a": "這是模型通病，建議固定 seed 多生幾張挑選，並把 deformed hands、extra fingers 放進負面提示。"
  }, {
    "q": "中文還是英文 prompt 比較準？",
    "a": "攝影術語英文最精準，建議以英文鏡頭光圈詞為主，中文僅輔助描述情緒與場景。"
  }, {
    "q": "如何維持同一個人多張照片一致？",
    "a": "固定臉部描述與 seed，Midjourney 用 cref，Flux 與 SD 可搭配 LoRA 或 IP-Adapter 鎖定人物。"
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
      children: "超寫實攝影（Hyperrealism）的目標不是「漂亮」，而是「以假亂真」——讓觀者第一眼相信這是一張用真實相機拍下的照片。它的根源來自商業攝影與後期修圖工業：精準的曝光、可信的膚色、符合物理的光影衰減。當你對 AI 下這類提示詞時，本質上是在描述一整套攝影器材與現場條件，而不是套濾鏡。因此最關鍵的心法是「像個攝影師一樣思考」：先決定相機與鏡頭，再決定光，最後才談氛圍。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心在於三件事如何協同運作。第一是", createVNode(_components.strong, {
        children: "鏡頭語彙"
      }), "：", createVNode(_components.code, {
        children: "85mm prime lens"
      }), " 帶來人像最討喜的透視壓縮，", createVNode(_components.code, {
        children: "f/1.8"
      }), " 大光圈製造奶油散景與主體分離，焦段與光圈一改，整張照片的空間感就完全不同。第二是", createVNode(_components.strong, {
        children: "光線"
      }), "：", createVNode(_components.code, {
        children: "soft natural window light"
      }), " 之所以是寫實照片的靈魂，是因為它有方向、有衰減、有柔和的過渡，避免棚燈那種死板的塑膠味。第三是", createVNode(_components.strong, {
        children: "皮膚質感"
      }), "：真實皮膚會有毛孔、細紋與 ", createVNode(_components.code, {
        children: "subsurface scattering"
      }), "（光穿入皮膚再透出），這是區分照片與 3D 渲染的分水嶺，磨皮過頭立刻變蠟像。"]
    }), "\n", createVNode(_components.p, {
      children: "題材上，超寫實最適合人像寫真、形象照、商品廣告與時尚視覺，凡是需要「讓人相信這是真的」的場景都適用；但它不擅長奇幻、誇張或情緒化的戲劇張力，那是電影感與概念藝術的舞台。情緒上它偏向中性、克制、可信，靠細節而非戲劇取勝。實拍時記得把對焦錨點放在眼睛，保留適度瑕疵，反而比完美無瑕更有說服力。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型實戰差異明顯。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在開源陣營對皮膚物理與自然光的還原最強，長句自然語言理解佳，直接寫滿相機、鏡頭、光源就有照片感，是目前超寫實首選。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 質感華麗、細節豐富，但內建調色偏向「雜誌修圖」，想要中性真實時要加 ", createVNode(_components.code, {
        children: "--style raw"
      }), " 並降低風格化，比例用 ", createVNode(_components.code, {
        children: "--ar 3:2"
      }), " 貼近相機。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 搭寫實 LoRA 如 RealVis）可控性最高，CFG 抓 4～6、配上 ADetailer 修臉與手、負面寫滿 ", createVNode(_components.code, {
        children: "cartoon, illustration, plastic skin"
      }), "，能逼出極高細節。", createVNode(_components.strong, {
        children: "GPT Image"
      }), " 勝在對話迭代，可以一句句要「光再側一點」「皮膚別磨太兇」「景深更淺」，對不懂參數的人最友善，但極致細節與一致性仍略遜前三者。我的流程通常是：Flux 或 SD 出高細節終稿，GPT Image 做快速構圖試驗。"]
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

const url = "src/content/styles/photorealistic.mdx";
const file = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/photorealistic.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/photorealistic.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
