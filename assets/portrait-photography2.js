import { l as createVNode, H as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "棚拍人像",
  "description": "以專業棚燈、柔光箱與乾淨背景，打造質感細膩、層次分明的商業人像。",
  "category": "realistic",
  "tags": ["棚拍", "人像", "棚燈", "柔光箱", "商業攝影"],
  "difficulty": "medium",
  "prompt_zh": "專業棚拍人像，85mm 人像鏡頭，f/2.8 淺景深，柔光箱主光搭配反光板補光，林布蘭式打光，乾淨的灰色無縫背景，細膩的皮膚質感與毛孔，銳利對焦的眼睛，柔和的眼神光，商業攝影質感",
  "prompt_en": "professional studio portrait, 85mm portrait lens, f/2.8 shallow depth of field, softbox key light with reflector fill, Rembrandt lighting, clean grey seamless backdrop, detailed skin texture and pores, sharp focus on eyes, soft catchlight, commercial photography quality",
  "negative_prompt": "cartoon, illustration, painting, anime, harsh shadows, plastic skin, oversaturated, cluttered background, flat lighting, deformed hands, blurry, low quality, watermark, text",
  "seo_title": "棚拍人像風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整棚拍人像 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、棚燈布光與鏡頭拆解，教你用柔光箱、林布蘭光、眼神光做出商業人像，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/portrait-photography.webp",
  "related_styles": ["photorealistic", "cinematic", "analog-film", "street-photography", "film-noir", "golden-hour"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["形象照", "演員定妝照", "領英大頭貼", "品牌人物視覺", "美妝廣告", "模特兒作品集"],
  "mistakes": ["光太硬產生難看死陰影", "缺少眼神光眼睛顯得呆滯", "皮膚磨皮過度失去質感", "背景顏色搶走主體", "構圖與裁切讓比例失衡"],
  "prompt_breakdown": [{
    "term": "professional studio portrait",
    "effect": "鎖定棚拍商業人像的整體基調與品質期待"
  }, {
    "term": "85mm portrait lens f/2.8",
    "effect": "經典人像焦段與適中光圈，臉部不變形且景深柔和"
  }, {
    "term": "softbox key light with reflector fill",
    "effect": "柔光箱主光加反光板補光，是棚拍最標準的布光"
  }, {
    "term": "Rembrandt lighting",
    "effect": "林布蘭式打光在臉頰形成三角亮區，立體又經典"
  }, {
    "term": "clean grey seamless backdrop",
    "effect": "乾淨無縫背景突顯主體，符合商業人像規範"
  }, {
    "term": "soft catchlight",
    "effect": "眼神光讓眼睛有神，是人像活與死的關鍵細節"
  }],
  "faq": [{
    "q": "棚拍人像在哪個 AI 工具效果最好？",
    "a": "Flux 對皮膚質感與棚燈布光還原最自然，Midjourney 質感華麗，GPT Image 適合用對話微調光位與表情。"
  }, {
    "q": "為什麼人像臉上有難看的死陰影？",
    "a": "主光太硬或缺補光。改用 softbox key light、加 reflector fill，必要時降低光比。"
  }, {
    "q": "眼神光（catchlight）為什麼重要？",
    "a": "它讓眼睛反射出光源、顯得有神，缺了眼睛會呆滯，寫 soft catchlight 即可。"
  }, {
    "q": "林布蘭光、蝴蝶光怎麼選？",
    "a": "林布蘭光（臉頰三角亮）顯立體有個性，蝴蝶光（鼻下蝴蝶影）顯柔美，依風格挑選。"
  }, {
    "q": "背景該用什麼顏色？",
    "a": "商業形象照多用灰色或白色無縫背景，深色顯穩重、淺色顯乾淨，避免雜亂或高彩度搶戲。"
  }, {
    "q": "怎麼避免皮膚被磨成塑膠？",
    "a": "寫 detailed skin texture and pores，並在負面加 plastic skin，保留毛孔比完美更可信。"
  }, {
    "q": "中文還是英文 prompt 比較準？",
    "a": "布光與鏡頭術語英文最精準，建議以英文 softbox、Rembrandt 等詞為主，中文輔助描述人物與情緒。"
  }, {
    "q": "怎麼讓同一個人多張形象照一致？",
    "a": "固定臉部描述、布光與 seed，Midjourney 用 cref，Flux 或 SD 可搭 LoRA 或 IP-Adapter 鎖人物。"
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
      children: "棚拍人像（Studio Portrait）是商業攝影裡最講究「控制」的一門：在沒有自然光的棚內，攝影師完全靠燈具、修飾光與背景，從零建構出一張既真實又精緻的人像。它的目標是讓主體在乾淨環境中被最有質感地呈現——形象照、定妝照、廣告大片都屬於這個範疇。對 AI 下提示詞時，你其實是在「擺燈」：決定主光從哪打、補光補多少、背景留什麼，這些比人物長相更決定成敗。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心是布光與鏡頭的搭配。鏡頭上，", createVNode(_components.code, {
        children: "85mm portrait lens"
      }), " 搭 ", createVNode(_components.code, {
        children: "f/2.8"
      }), " 是棚拍黃金組合——焦段讓臉部透視自然不變形，光圈帶來柔和又不致糊掉細節的景深。布光則以 ", createVNode(_components.code, {
        children: "softbox key light with reflector fill"
      }), " 為基礎：柔光箱當主光製造柔順的明暗過渡，反光板補回暗部細節，控制光比就是控制情緒。進一步用 ", createVNode(_components.code, {
        children: "Rembrandt lighting"
      }), "（臉頰三角亮區）增加立體與個性，或換蝴蝶光走柔美路線。別忘了 ", createVNode(_components.code, {
        children: "soft catchlight"
      }), " 眼神光，它讓眼睛活過來；背景則用 ", createVNode(_components.code, {
        children: "clean grey seamless backdrop"
      }), " 把焦點全留給人。"]
    }), "\n", createVNode(_components.p, {
      children: ["題材與情緒上，棚拍人像適合需要專業、可信與精緻感的場景：企業形象照、演員定妝、美妝廣告、模特兒作品集。情緒可以從沉穩權威到柔美親和，全靠光比與背景色調拿捏。要拍得好，記得保留 ", createVNode(_components.code, {
        children: "detailed skin texture and pores"
      }), "，磨皮過頭會變蠟像；裁切與構圖也要留意肩線與頭頂空間，避免比例失衡。"]
    }), "\n", createVNode(_components.p, {
      children: ["各模型差異如下。", createVNode(_components.strong, {
        children: "Flux"
      }), " 對棚燈布光與皮膚質感的還原最自然，自然語言理解佳，直接描述主光、補光、背景就有商業片的乾淨感，是棚拍首選。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 質感漂亮、立體感強，但內建偏修圖味，想要中性真實時加 ", createVNode(_components.code, {
        children: "--style raw"
      }), "，比例用 ", createVNode(_components.code, {
        children: "--ar 4:5"
      }), " 貼近人像直幅。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 搭寫實人像 LoRA）可控性最高，CFG 抓 4～6、配 ADetailer 修臉、負面寫滿 ", createVNode(_components.code, {
        children: "harsh shadows, plastic skin"
      }), "，能逼出極細皮膚層次。", createVNode(_components.strong, {
        children: "GPT Image"
      }), " 強在對話迭代，可逐句要「主光移到左前」「補光多一點」「加點眼神光」「背景換淺灰」，對不懂布光的人最友善，但極致細節與一致性略遜前三者。我的流程常是：GPT Image 試布光與表情，再交 Flux 或 SD 出高質感終稿。"]
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

const url = "src/content/styles/portrait-photography.mdx";
const file = "C:/Users/GS/Documents/Astro/HarryFan.github.io/src/content/styles/portrait-photography.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/GS/Documents/Astro/HarryFan.github.io/src/content/styles/portrait-photography.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
