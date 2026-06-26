import { l as createVNode, H as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "街頭攝影",
  "description": "捕捉都市瞬間的紀實風格，以自然光與決定性瞬間記錄真實的人間百態。",
  "category": "realistic",
  "tags": ["街頭攝影", "紀實", "決定性瞬間", "自然光", "都市"],
  "difficulty": "medium",
  "prompt_zh": "街頭攝影，紀實風格，35mm 廣角鏡頭，自然環境光，抓拍的決定性瞬間，真實的都市場景，路人與街景，自然不擺拍的姿態，淺景深突出主體，輕微膠片顆粒，城市生活氛圍，黑白或低調色彩",
  "prompt_en": "street photography, documentary style, 35mm lens, available natural light, candid decisive moment, authentic urban scene, passersby and cityscape, unposed natural gesture, shallow depth of field, subtle film grain, gritty city life mood, Henri Cartier-Bresson style",
  "negative_prompt": "cartoon, illustration, painting, anime, posed studio, oversaturated, hdr, staged, deformed hands, blurry, low quality, watermark, text, clean perfect",
  "seo_title": "街頭攝影風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整街頭攝影 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、廣角鏡頭與決定性瞬間拆解，教你用自然光、抓拍構圖做出紀實質感，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/street-photography.webp",
  "related_styles": ["photorealistic", "analog-film", "film-noir", "cinematic", "golden-hour", "portrait-photography"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["都市紀實", "旅遊攝影", "人文故事", "雜誌專題", "黑白街拍", "社群紀錄"],
  "mistakes": ["姿態太擺拍失去抓拍的真實感", "光線太完美像棚拍失去街頭味", "構圖死板沒有捕捉決定性瞬間", "飽和度過高破壞紀實感", "背景太乾淨缺少都市生活紋理"],
  "prompt_breakdown": [{
    "term": "street photography",
    "effect": "鎖定街頭紀實的整體類型與美學基調"
  }, {
    "term": "candid decisive moment",
    "effect": "抓拍的決定性瞬間是街拍的靈魂，強調非擺拍"
  }, {
    "term": "35mm lens",
    "effect": "廣角焦段帶景與環境，貼近街拍標準視角"
  }, {
    "term": "available natural light",
    "effect": "現場自然光，拒絕棚燈，保留街頭真實感"
  }, {
    "term": "unposed natural gesture",
    "effect": "自然不做作的姿態與表情，避免僵硬擺拍"
  }, {
    "term": "gritty city life mood",
    "effect": "帶出都市生活的粗糙紋理與真實氛圍"
  }],
  "faq": [{
    "q": "街頭攝影在哪個 AI 工具效果最好？",
    "a": "Flux 對自然光與真實場景還原最好，Midjourney 氛圍與顆粒漂亮，GPT Image 適合用對話調整構圖與瞬間感。"
  }, {
    "q": "為什麼畫面看起來像擺拍而非抓拍？",
    "a": "姿態太正、看鏡頭。寫 candid、unposed natural gesture，讓人物自然行動、不直視鏡頭。"
  }, {
    "q": "街拍該用什麼焦段？",
    "a": "經典是 35mm 或 28mm 廣角帶環境，50mm 也可，廣角能同時交代人物與街景脈絡。"
  }, {
    "q": "黑白還是彩色街拍好？",
    "a": "黑白強調光影與形式、更耐看，彩色保留生活氣息，依主題挑選，都要避免過飽和。"
  }, {
    "q": "什麼是決定性瞬間？",
    "a": "布列松提出的概念，指構圖、動作與情緒在某一刻完美交會，寫 decisive moment 引導模型捕捉動態。"
  }, {
    "q": "怎麼讓畫面更有街頭真實感？",
    "a": "加 available natural light、film grain、gritty city mood，保留招牌、人群、雜物等都市紋理。"
  }, {
    "q": "中文還是英文 prompt 比較準？",
    "a": "紀實術語英文最精準，建議以英文 candid、decisive moment 等詞為主，中文輔助描述城市與情境。"
  }, {
    "q": "怎麼維持一組街拍專題風格一致？",
    "a": "固定焦段、光線與顆粒關鍵詞與 seed，Midjourney 可用 sref 鎖定整組的視覺調性與色彩。"
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
      children: ["街頭攝影（Street Photography）是一種「在真實世界裡等待瞬間」的紀實藝術。它不佈景、不擺拍，攝影師帶著一台輕便相機走進城市，靠觀察與直覺捕捉人與環境在某一刻的偶然交會——這就是布列松所說的「決定性瞬間」。對 AI 下這類提示詞時，最大的挑戰是「製造偶然感」：你要讓畫面看起來像剛好被路過拍下，而不是精心安排，因此 ", createVNode(_components.code, {
        children: "candid"
      }), "、", createVNode(_components.code, {
        children: "unposed"
      }), " 這類關鍵詞比任何構圖描述都重要。"]
    }), "\n", createVNode(_components.p, {
      children: ["技術核心圍繞「現場感」。鏡頭上偏好 ", createVNode(_components.code, {
        children: "35mm lens"
      }), "（或 28mm）廣角，能同時容納人物與街景脈絡，建立故事的環境。光線堅持 ", createVNode(_components.code, {
        children: "available natural light"
      }), "——現場的陽光、陰影、櫥窗反光，拒絕棚燈，因為任何完美打光都會立刻破壞街頭的真實。動態上靠 ", createVNode(_components.code, {
        children: "candid decisive moment"
      }), " 與 ", createVNode(_components.code, {
        children: "unposed natural gesture"
      }), " 捕捉行進中的姿態與表情，人物最好不直視鏡頭。再用 ", createVNode(_components.code, {
        children: "subtle film grain"
      }), " 與 ", createVNode(_components.code, {
        children: "gritty city life mood"
      }), " 補上紀實的粗糙質感，讓畫面有呼吸與溫度。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，街拍適合都市紀實、旅遊攝影、人文故事與雜誌專題，氣質從幽默、孤獨到詩意都行，重點是「真實」。它不適合需要乾淨完美的商業或產品視覺。拍得好的關鍵在於保留都市紋理——招牌、人群、雜物、光影錯落，這些「不完美」正是街頭的靈魂；構圖上善用前景框架、線條引導與三分法，讓偶然的瞬間落在對的位置。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型差異如下。", createVNode(_components.strong, {
        children: "Flux"
      }), " 對自然光與真實場景的還原最強，自然語言理解佳，描述焦段、光線與動作就有濃濃紀實味，是街拍首選。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 氛圍與顆粒漂亮，街頭情緒拿捏到位，用 ", createVNode(_components.code, {
        children: "--style raw"
      }), " 避免過度美化，比例用 ", createVNode(_components.code, {
        children: "--ar 3:2"
      }), " 貼近 35mm。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 搭街拍或膠片 LoRA）可控性高，CFG 抓 4～6、負面寫滿 ", createVNode(_components.code, {
        children: "posed studio, staged, hdr"
      }), "，並可用黑白校正做經典街拍。", createVNode(_components.strong, {
        children: "GPT Image"
      }), " 強在對話迭代，能逐句要「人物別看鏡頭」「光更自然」「背景多點街景」，對構圖試驗最直覺，但極致瞬間動態與顆粒略遜前三者。實務上街拍很吃「偶然」的運氣，建議多生幾張挑最有故事感、最像被路過拍下的那一張。"]
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

const url = "src/content/styles/street-photography.mdx";
const file = "C:/Users/GS/Documents/Astro/HarryFan.github.io/src/content/styles/street-photography.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/GS/Documents/Astro/HarryFan.github.io/src/content/styles/street-photography.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
