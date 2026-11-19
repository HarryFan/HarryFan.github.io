import { n as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "等距插畫",
  "description": "30 度等角視角、無透視收斂與乾淨幾何構成的等距立體插畫風格。",
  "category": "illustration",
  "tags": ["等距", "等角投影", "幾何", "立體插畫"],
  "difficulty": "medium",
  "prompt_zh": "等距插畫，等角投影視角，30 度俯視角度，無透視收斂的平行線，乾淨幾何造型，柔和柔光與微陰影，飽和扁平色塊，微縮立體場景，精緻細節的小物件，現代向量插畫風格",
  "prompt_en": "isometric illustration, isometric projection, 30 degree top-down angle, no perspective convergence parallel lines, clean geometric shapes, soft ambient lighting subtle shadows, flat saturated colors, miniature diorama scene, detailed tiny objects, modern vector style",
  "negative_prompt": "perspective distortion, vanishing point, photorealistic, painterly, blurry, organic messy shapes, harsh shadows, fisheye, watermark, text errors",
  "seo_title": "等距插畫風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整等距插畫 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用等角投影、30 度視角與幾何造型做出乾淨的等距立體場景，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/isometric.webp",
  "related_styles": ["voxel", "flat-illustration", "papercut", "clay", "blender-3d", "pixel-art"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["產品流程示意圖", "城市場景插畫", "App 登陸頁插圖", "資訊圖表", "遊戲關卡概念", "技術架構視覺化"],
  "mistakes": ["出現透視收斂破壞等距感", "視角角度不一致導致歪斜", "陰影太硬失去乾淨質感", "物件比例不協調顯得雜亂", "細節過多失去幾何簡潔"],
  "prompt_breakdown": [{
    "term": "isometric projection",
    "effect": "鎖定等角投影，這是整個風格的幾何基礎"
  }, {
    "term": "30 degree top-down angle",
    "effect": "指定 30 度俯視角度，建立標準等距視角"
  }, {
    "term": "no perspective convergence parallel lines",
    "effect": "強調平行線不收斂，避免透視變形"
  }, {
    "term": "clean geometric shapes",
    "effect": "用乾淨幾何造型維持等距插畫的俐落感"
  }, {
    "term": "soft ambient lighting subtle shadows",
    "effect": "加柔和環境光與微陰影，營造立體而不刺眼"
  }, {
    "term": "miniature diorama scene",
    "effect": "把場景做成微縮立體模型感，強化精緻趣味"
  }],
  "faq": [{
    "q": "等距插畫在哪個 AI 工具效果最好？",
    "a": "Flux 與 Stable Diffusion 對等角幾何最穩，Midjourney 質感最精緻，GPT Image 適合用對話調整物件與配置。"
  }, {
    "q": "為什麼線條會收斂變成一般透視？",
    "a": "AI 容易加透視。明確寫 isometric projection、no perspective convergence，並把 vanishing point、perspective distortion 放進負面提示。"
  }, {
    "q": "等距和 2.5D 有什麼差別？",
    "a": "嚴格的等距投影平行線完全不收斂；2.5D 偏微透視。若要工整的等距感，務必強調 isometric、parallel lines。"
  }, {
    "q": "等距插畫可以商用嗎？",
    "a": "風格本身不受著作權保護，但避免重現特定作品，並確認所用模型授權條款。"
  }, {
    "q": "怎麼做複雜的城市或辦公室場景？",
    "a": "先描述俯視構圖與主要區塊，逐步加物件，並維持統一光源與比例，避免一次塞太多細節。"
  }, {
    "q": "角度一定要 30 度嗎？",
    "a": "標準等距常用 30 度，但 45 度俯視也常見。重點是全圖角度一致，不要混用不同視角。"
  }, {
    "q": "中文 prompt 和英文 prompt 哪個好？",
    "a": "英文對 isometric projection、parallel lines 等術語理解更精準，建議以英文為主、中文補充場景內容。"
  }, {
    "q": "怎麼讓系列圖風格一致？",
    "a": "固定同一組角度、配色與光源關鍵詞與 seed，Flux 與 SD 可用相同設定批量產出維持一致。"
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
      children: "等距插畫（Isometric Illustration）源自工程製圖與早期電腦遊戲，它的核心是一種「無透視」的投影方式——畫面中的平行線永遠保持平行，不會像真實視覺那樣往消失點收斂。這帶來一種冷靜、工整、像微縮模型的觀看感受，特別適合解釋結構與流程。理解這層幾何邏輯很重要，因為你下提示詞時，最大的敵人就是 AI 內建的透視傾向，你得明確告訴它「不要透視收斂」，否則它會自動把場景畫成一般的廣角照片。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心有兩塊。第一是投影規則：", createVNode(_components.code, {
        children: "isometric projection"
      }), "、", createVNode(_components.code, {
        children: "30 degree top-down angle"
      }), " 與 ", createVNode(_components.code, {
        children: "no perspective convergence parallel lines"
      }), " 三句一起下，才能穩定鎖住等距視角，並務必把 ", createVNode(_components.code, {
        children: "vanishing point"
      }), "、", createVNode(_components.code, {
        children: "perspective distortion"
      }), " 寫進負面提示。第二是造型與光影：", createVNode(_components.code, {
        children: "clean geometric shapes"
      }), " 維持俐落感，", createVNode(_components.code, {
        children: "flat saturated colors"
      }), " 提供清晰的色面區隔，", createVNode(_components.code, {
        children: "soft ambient lighting subtle shadows"
      }), " 則用柔和的環境光與淡陰影製造立體感而不刺眼。把整體當成 ", createVNode(_components.code, {
        children: "miniature diorama scene"
      }), " 來想，畫面就會有精緻的微縮模型趣味。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合需要清晰、理性、結構化呈現的內容：產品流程、城市與建築、App 登陸頁插圖、技術架構圖、遊戲關卡。它擅長承載「條理分明」的訊息感，但不適合需要情緒張力或寫實氛圍的場景。做資訊圖表時，建議先規劃俯視構圖的主要區塊，再逐步往上堆物件，並維持統一的光源方向與物件比例。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Flux"
      }), " 與 ", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), " 對等角幾何最穩，平行線控制最好，SDXL 配 isometric LoRA 可控性最高，CFG 抓 5～7，負面寫滿 ", createVNode(_components.code, {
        children: "perspective, vanishing point"
      }), "，最適合需要工整結構的技術插畫。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 質感與配色最精緻，短 prompt 就有設計感，建議 ", createVNode(_components.code, {
        children: "--ar 1:1"
      }), "，但偶爾會偷偷加透視，需在提示中反覆強調 isometric，並用 ", createVNode(_components.code, {
        children: "--sref"
      }), " 鎖定風格。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 最適合對話迭代與物件配置，可以逐句要「左邊加一棟辦公樓」「把伺服器移到中央」，對規劃流程圖很方便，但嚴格等距的工整度略遜 Flux/SD。實務上我會先用 GPT Image 規劃場景配置與物件清單，再拿到 Flux 或 SD 量產幾何最精準的終稿。"]
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

const url = "src/content/styles/isometric.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/isometric.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/isometric.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
