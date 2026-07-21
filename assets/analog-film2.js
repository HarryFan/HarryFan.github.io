import { v as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';

const frontmatter = {
  "title": "底片膠捲",
  "description": "重現膠片顆粒、暖色偏移與柔和暈影的類比攝影質感，充滿懷舊溫度。",
  "category": "realistic",
  "tags": ["底片", "膠捲", "顆粒", "懷舊", "類比攝影"],
  "difficulty": "easy",
  "prompt_zh": "底片膠捲攝影，35mm 膠片質感，明顯的膠片顆粒，柔和的暖色調與輕微褪色，邊角暈影，柔和的對比，自然的光線，Kodak Portra 400 色彩，輕微的漏光，懷舊復古氛圍，類比相機拍攝",
  "prompt_en": "analog film photography, 35mm film grain, soft warm color grade with faded tones, vignette, gentle contrast, natural light, Kodak Portra 400 colors, subtle light leaks, nostalgic vintage mood, shot on film camera, halation glow",
  "negative_prompt": "cartoon, illustration, painting, anime, digital sharpness, oversaturated, hdr, clinical clean, deformed hands, blurry, low quality, watermark, text",
  "seo_title": "底片膠捲風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整底片膠捲 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、膠片顆粒與色彩拆解，教你用 Portra 色調、漏光、暈影做出懷舊類比質感，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/analog-film.webp",
  "related_styles": ["photorealistic", "street-photography", "golden-hour", "cinematic", "portrait-photography", "film-noir"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["生活紀實", "旅拍照片", "懷舊人像", "音樂專輯封面", "雜誌情緒照", "社群動態"],
  "mistakes": ["顆粒過粗變成雜訊噪點", "色彩太數位太乾淨失去膠味", "對比過硬失去膠片寬容度", "漏光暈影加太多顯廉價", "過度銳化破壞柔和質感"],
  "prompt_breakdown": [{
    "term": "analog film photography",
    "effect": "鎖定類比底片攝影的整體質感與年代氛圍"
  }, {
    "term": "35mm film grain",
    "effect": "細緻的膠片顆粒是底片感的靈魂，去除數位的乾淨"
  }, {
    "term": "Kodak Portra 400 colors",
    "effect": "指定經典膠卷色彩，膚色暖、過渡柔和"
  }, {
    "term": "soft warm color grade with faded tones",
    "effect": "暖色偏移與輕微褪色帶來懷舊感"
  }, {
    "term": "subtle light leaks",
    "effect": "輕微漏光重現底片相機的偶發瑕疵與溫度"
  }, {
    "term": "vignette",
    "effect": "邊角暈影聚焦中心並強化復古氣質"
  }],
  "faq": [{
    "q": "底片膠捲在哪個 AI 工具效果最好？",
    "a": "Midjourney 對膠片色彩與顆粒最有味道，Flux 質感自然，GPT Image 適合用對話微調色調與顆粒強度。"
  }, {
    "q": "為什麼顆粒看起來像雜訊而不像膠片？",
    "a": "顆粒過粗或過硬。寫 fine film grain、35mm grain，避免 noise 字眼，並保留柔和對比。"
  }, {
    "q": "Portra、Ektar、Fuji 怎麼選？",
    "a": "Portra 膚色暖柔適合人像，Ektar 飽和銳利適合風景，Fuji 偏青綠適合清新氛圍，直接寫膠卷名最準。"
  }, {
    "q": "漏光和暈影要加多少？",
    "a": "點到為止，subtle light leaks 與 gentle vignette 即可，過量會顯得廉價刻意。"
  }, {
    "q": "底片感和一般復古濾鏡差在哪？",
    "a": "底片是顆粒、寬容度與色彩科學的整體質感，不只是套舊調色，光暈與柔對比缺一不可。"
  }, {
    "q": "怎麼避免畫面太數位太乾淨？",
    "a": "加 film grain、halation、faded tones，並在負面寫 digital sharpness、clinical clean。"
  }, {
    "q": "中文還是英文 prompt 比較準？",
    "a": "膠卷型號與質感術語英文最精準，建議以英文膠卷名與 grain、halation 為主，中文輔助場景。"
  }, {
    "q": "怎麼讓一組旅拍照片色調一致？",
    "a": "固定膠卷名、顆粒與色調關鍵詞與 seed，Midjourney 可用 sref 鎖定整捲膠卷的色彩風格。"
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
      children: "底片膠捲（Analog Film）的魅力，來自一種數位難以複製的「不完美溫度」。膠片成像靠的是鹵化銀顆粒的化學反應，色彩由膠卷的化學配方決定，寬容度高、過渡柔，還偶爾帶點漏光與偏色——正是這些瑕疵讓照片有了人味與年代感。對 AI 下這類提示詞時，你不是在套舊濾鏡，而是在指定一套完整的「膠卷色彩科學 + 顆粒結構 + 光學瑕疵」，理解這點才能避免做出假假的數位仿舊。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心圍繞三件事。第一是", createVNode(_components.strong, {
        children: "顆粒"
      }), "：", createVNode(_components.code, {
        children: "35mm film grain"
      }), " 是底片感的靈魂，但要細緻自然，過粗就變成數位雜訊；用 fine grain 而非 noise 來描述。第二是", createVNode(_components.strong, {
        children: "色彩科學"
      }), "：直接指定膠卷型號最準，", createVNode(_components.code, {
        children: "Kodak Portra 400 colors"
      }), " 帶來暖膚色與柔過渡，想要飽和銳利可換 Ektar，清新青綠可換 Fuji。第三是", createVNode(_components.strong, {
        children: "光學瑕疵與寬容度"
      }), "：", createVNode(_components.code, {
        children: "subtle light leaks"
      }), "、", createVNode(_components.code, {
        children: "vignette"
      }), "、", createVNode(_components.code, {
        children: "halation glow"
      }), "（高光邊緣的柔光暈染）與 ", createVNode(_components.code, {
        children: "soft warm faded tones"
      }), "，這些細節合起來才有真正的膠味，但全要點到為止，過量就廉價。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，底片感天生適合生活紀實、旅拍、懷舊人像、專輯封面與雜誌情緒照，散發溫暖、慵懶、念舊的氣息。它不適合需要極致銳利與乾淨的商品或科技視覺，那是超寫實的領域。拍攝時記得保留柔和對比與適度褪色，別過度銳化，膠片的柔正是它討喜之處。這個風格門檻低、容錯高，新手很容易上手出味。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型差異如下。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對膠片色彩與顆粒最有靈氣，短 prompt 加膠卷名就有濃濃膠味，用 ", createVNode(_components.code, {
        children: "--style raw"
      }), " 避免過度數位化，比例用 ", createVNode(_components.code, {
        children: "--ar 3:2"
      }), " 貼近 35mm 片幅。", createVNode(_components.strong, {
        children: "Flux"
      }), " 質感自然、顆粒分布真實，自然語言理解佳，適合精準控制色調與漏光位置，偏乾淨時加重 ", createVNode(_components.code, {
        children: "film grain"
      }), "、", createVNode(_components.code, {
        children: "faded tones"
      }), "。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 搭膠片風 LoRA 如 Analog Madness）可控性高，CFG 抓 4～6、負面寫滿 ", createVNode(_components.code, {
        children: "digital sharpness, hdr, oversaturated"
      }), "，並用顆粒後處理微調強度。", createVNode(_components.strong, {
        children: "GPT Image"
      }), " 強在對話迭代，可逐句要「顆粒再細一點」「色調更暖」「加點漏光」，對新手最友善，但極致顆粒結構略遜前三者。實務上膠片感很吃個人偏好，建議多生幾版挑最對味的那捲。"]
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

const url = "src/content/styles/analog-film.mdx";
const file = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/analog-film.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/analog-film.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
