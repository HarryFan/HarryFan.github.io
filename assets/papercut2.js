import { l as createVNode, H as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "剪紙紙雕",
  "description": "多層紙張堆疊、刀模剪裁邊緣與柔和投影營造的立體紙藝視覺風格。",
  "category": "illustration",
  "tags": ["剪紙", "紙雕", "多層紙藝", "立體插畫"],
  "difficulty": "medium",
  "prompt_zh": "剪紙紙雕風格，多層紙張堆疊，分層紙藝立體感，刀模剪裁的乾淨邊緣，柔和的層間投影，紙張纖維質感，扁平色塊分層，景深層次，手工紙藝工藝感，正面俯視構圖",
  "prompt_en": "layered paper cut art, paper craft diorama, stacked paper layers, clean die-cut edges, soft drop shadows between layers, paper texture, flat color shapes, depth and dimension, handcrafted papercraft, frontal layered composition",
  "negative_prompt": "photorealistic, 3d render, smooth gradient, glossy, painterly brushstrokes, blurry, single flat layer, no shadow, watermark, text errors",
  "seo_title": "剪紙紙雕風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整剪紙紙雕 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用多層紙張堆疊、刀模邊緣與層間投影做出立體紙藝質感，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/papercut.webp",
  "related_styles": ["flat-illustration", "childrens-book", "storybook-vintage", "risograph", "isometric", "gouache"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["繪本插圖", "節慶賀卡", "品牌主視覺", "兒童內容", "海報背景", "動畫定格場景"],
  "mistakes": ["缺少層間投影顯得扁平", "邊緣不夠俐落像撕紙而非剪裁", "層數太多失去清晰結構", "用漸層破壞紙張平塗感", "光源混亂導致投影方向不一致"],
  "prompt_breakdown": [{
    "term": "stacked paper layers",
    "effect": "鎖定多層紙張堆疊的核心結構，建立立體感"
  }, {
    "term": "clean die-cut edges",
    "effect": "指定刀模剪裁的俐落邊緣，區分剪紙與撕紙"
  }, {
    "term": "soft drop shadows between layers",
    "effect": "在層與層之間加柔和投影，製造景深"
  }, {
    "term": "paper texture",
    "effect": "加上紙張纖維質感，強化手工紙藝的真實觸感"
  }, {
    "term": "flat color shapes",
    "effect": "用平塗色塊分層，維持剪紙的乾淨色面"
  }, {
    "term": "frontal layered composition",
    "effect": "採正面分層構圖，最能展現紙雕的層次堆疊"
  }],
  "faq": [{
    "q": "剪紙風格在哪個 AI 工具效果最好？",
    "a": "Midjourney 對紙張質感與投影最直覺，Flux 對乾淨邊緣與分層較穩，GPT Image 適合用對話調整層數與光源方向。"
  }, {
    "q": "為什麼看起來很扁沒有立體感？",
    "a": "缺少層間投影。加入 stacked paper layers、soft drop shadows between layers，並設定單一柔和光源讓投影一致。"
  }, {
    "q": "剪紙和撕紙效果差在哪？",
    "a": "剪紙邊緣俐落用 clean die-cut edges，撕紙邊緣毛糙用 torn paper edges，兩者觸感不同，視需求選擇。"
  }, {
    "q": "剪紙風格可以商用嗎？",
    "a": "風格本身不受著作權保護，但避免重現特定藝術家紙雕作品，並確認所用模型授權條款。"
  }, {
    "q": "怎麼控制層次清晰不雜亂？",
    "a": "限制三到五層、用對比明確的平塗色，並讓主體層浮在前、背景層後退，投影區分前後關係。"
  }, {
    "q": "一定要正面俯視構圖嗎？",
    "a": "不一定，但正面分層最能展現紙雕堆疊；若要斜角可寫 isometric paper diorama 表現盒中場景。"
  }, {
    "q": "中文 prompt 和英文 prompt 哪個好？",
    "a": "英文對 paper cut、die-cut、layered diorama 等術語理解更精準，建議以英文為主、中文補充題材與情緒。"
  }, {
    "q": "怎麼讓系列圖風格一致？",
    "a": "固定同一組紙張質感與投影關鍵詞與 seed，Midjourney 可用 sref 鎖定風格參考維持一致調性。"
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
      children: "剪紙紙雕（Paper Cut / Papercraft Diorama）把平面插畫往實體工藝推進了一層，它的核心不是「畫」而是「堆」。藝術家把不同顏色的紙裁出形狀，一層層疊出前景、中景、背景，靠層與層之間的微小高低差與投影製造景深。理解這層「分層堆疊」的邏輯很重要，因為你下提示詞時，本質上是在請 AI 模擬一個由多張紙構成的微縮立體場景，而不是貼一個扁平的剪紙濾鏡——關鍵永遠是「層次」與「投影」。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心有兩塊。第一是邊緣與色面：", createVNode(_components.code, {
        children: "clean die-cut edges"
      }), "（刀模剪裁的俐落邊緣）與 ", createVNode(_components.code, {
        children: "flat color shapes"
      }), "（平塗色塊）讓每一層都乾淨分明，這是剪紙不同於水彩或油畫的根本。若想要更手作的味道，可改用 ", createVNode(_components.code, {
        children: "torn paper edges"
      }), " 製造撕紙的毛邊。第二是立體感：", createVNode(_components.code, {
        children: "stacked paper layers"
      }), " 建立堆疊結構，", createVNode(_components.code, {
        children: "soft drop shadows between layers"
      }), " 則是靈魂——沒有層間投影，畫面就會塌成一張平面圖。再加上 ", createVNode(_components.code, {
        children: "paper texture"
      }), " 的紙張纖維質感，整體就有了實體紙藝的觸感。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合溫馨、童趣、節慶與自然的內容：森林動物、城市天際線、節日場景、繪本插圖。它擅長承載手作的溫度與療癒感，但不適合需要寫實細節或冷硬科技感的場景。做賀卡或繪本時，建議限制三到五層、用對比明確的色彩，並讓主體浮在最前層，背景層層後退。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對紙張質感與柔和投影最直覺，短 prompt 就有立體感，建議 ", createVNode(_components.code, {
        children: "--ar 4:5"
      }), " 做直式繪本，並用 ", createVNode(_components.code, {
        children: "--sref"
      }), " 鎖定紙張配色與光感。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在乾淨邊緣與分層結構上最穩，對長句理解佳，要明確指定「前景兩層、背景三層」這類結構時表現出色，但偶爾投影偏弱，記得加重 ", createVNode(_components.code, {
        children: "strong layer shadows"
      }), "。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配 papercut LoRA）可控性最高，能靠 LoRA 與負面提示精調層次與紙紋強度，CFG 抓 5～7，並把 smooth gradient 寫進負面避免糊成漸層。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 最適合對話迭代，可以逐句要「再加一層樹叢」「投影柔一點」「光從左上來」，對新手最友善，但層間質感的細膩度略遜前三者。實務上我會先用 GPT Image 定層次與光源，再拿到 Midjourney 或 Flux 量產高品質終稿。"]
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

const url = "src/content/styles/papercut.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/papercut.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/papercut.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
