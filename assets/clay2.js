import { n as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "黏土定格動畫風格",
  "description": "手捏黏土質感、指紋痕跡與柔軟塑形，定格動畫工作室的溫暖手作美學。",
  "category": "illustration",
  "tags": ["黏土動畫", "定格動畫", "手作質感", "角色設計"],
  "difficulty": "medium",
  "prompt_zh": "黏土定格動畫風格，手捏黏土材質，表面帶細微指紋與塑形痕跡，柔軟的橡皮泥質感，可愛圓潤的角色，微縮場景佈景，柔和的攝影棚打光，淺景深微距鏡頭，溫暖飽和的手作色彩",
  "prompt_en": "claymation stop-motion style, handmade plasticine clay material, visible fingerprints and sculpting marks, soft modeling clay texture, cute rounded characters, miniature diorama set, soft studio lighting, shallow depth of field macro shot, warm handcrafted colors, Aardman style",
  "negative_prompt": "photorealistic, 2d flat, smooth plastic, cgi render, anime, vector, low quality, blurry, text, watermark, hard plastic, glossy surface",
  "seo_title": "黏土定格動畫風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整黏土定格動畫風格 AI 提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你做出指紋痕跡與橡皮泥質感的手作角色，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/clay.webp",
  "related_styles": ["pixar", "papercut", "childrens-book", "voxel", "sticker", "chibi"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": true,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["角色頭像", "吉祥物設計", "微縮場景", "繪本插圖", "社群貼文", "產品擬人化"],
  "mistakes": ["表面太光滑失去手捏感", "缺少指紋與塑形痕跡顯得像塑膠", "打光太硬破壞黏土柔軟感", "角色過於精緻不像手作", "場景沒有微縮佈景的縱深"],
  "prompt_breakdown": [{
    "term": "claymation stop-motion style",
    "effect": "鎖定黏土定格動畫的核心美術風格關鍵詞"
  }, {
    "term": "handmade plasticine clay material",
    "effect": "指定橡皮泥黏土材質，是質感的基礎"
  }, {
    "term": "visible fingerprints and sculpting marks",
    "effect": "加入指紋與塑形痕跡，這是手作感的關鍵"
  }, {
    "term": "miniature diorama set",
    "effect": "營造微縮佈景的場景縱深，呼應實體攝影棚"
  }, {
    "term": "soft studio lighting",
    "effect": "柔和攝影棚打光，凸顯黏土的軟質反光"
  }, {
    "term": "shallow depth of field macro shot",
    "effect": "淺景深微距鏡頭，模擬定格動畫的近距拍攝"
  }],
  "faq": [{
    "q": "黏土風格在哪個 AI 工具效果最好？",
    "a": "Midjourney 對黏土材質與指紋痕跡的還原最自然，Flux 細節穩定，GPT Image 最適合用對話迭代角色造型與表情。"
  }, {
    "q": "為什麼生出來像光滑塑膠玩具？",
    "a": "缺少表面痕跡。加入 visible fingerprints、sculpting marks、matte clay texture，並把 glossy、smooth plastic 放進負面提示。"
  }, {
    "q": "如何做出像 Aardman 那種味道？",
    "a": "強調 plasticine clay、handcrafted、miniature set，並用柔光與微距鏡頭，避免過度乾淨的 CGI 渲染。"
  }, {
    "q": "黏土風格可以商用嗎？",
    "a": "風格本身不受著作權保護，但避免重現特定工作室角色，並確認所用模型授權條款。"
  }, {
    "q": "為什麼角色看起來太精緻不像手作？",
    "a": "手作感來自不完美。刻意保留塑形痕跡與微微不對稱，避免要求 perfect、highly detailed 的精修。"
  }, {
    "q": "適合做品牌吉祥物嗎？",
    "a": "非常適合，黏土的溫暖手感天生親和，建議固定角色描述與 seed 維持多視角一致。"
  }, {
    "q": "怎麼讓背景有定格動畫的場景感？",
    "a": "用 miniature diorama set、handmade props、tilt-shift 強化微縮佈景，讓背景也是捏出來的。"
  }, {
    "q": "中文還是英文 prompt 比較好？",
    "a": "多數模型對英文理解更精準，建議以英文為主，中文輔助補充情緒與構圖細節。"
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
      children: ["黏土定格動畫是一門極度耗時的手工技藝，每一秒畫面背後是動畫師用指尖一格一格挪動黏土的成果。它的視覺魅力來自「看得見人手」——表面的指紋、不完美的接縫、微微不對稱的造型，這些瑕疵反而是溫度的來源。從 ", createVNode(_components.strong, {
        children: "Aardman"
      }), " 的《酷狗寶貝》到萊卡工作室的定格電影，黏土風格傳遞的是一種反工業、反精修的手作哲學。當你下提示詞時，本質上是在請 AI 模擬「橡皮泥被人捏出來、再用微距鏡頭拍下」的物理結果，而不是套一個卡通濾鏡。"]
    }), "\n", createVNode(_components.p, {
      children: ["技術核心在於材質與打光兩件事。材質上，黏土是霧面、半透、帶油脂感的，光線不會像塑膠那樣銳利反射，所以 ", createVNode(_components.code, {
        children: "matte plasticine clay texture"
      }), " 搭配 ", createVNode(_components.code, {
        children: "visible fingerprints and sculpting marks"
      }), " 幾乎是必備組合，前者定義表面質感，後者注入手作痕跡。打光則偏好 ", createVNode(_components.code, {
        children: "soft studio lighting"
      }), "，模擬實體攝影棚裡的柔光箱，讓黏土的軟質高光自然鋪開。再加上 ", createVNode(_components.code, {
        children: "shallow depth of field macro shot"
      }), "，畫面立刻有定格動畫近距拍攝的縱深與真實感。"]
    }), "\n", createVNode(_components.p, {
      children: ["題材上，黏土風格最適合溫馨、幽默、帶童趣的敘事：擬人小動物、節慶場景、療癒系吉祥物、繪本角色。它能承載輕快與溫暖的情緒，卻不適合冷硬科幻或寫實恐怖——黏土的柔軟本質會稀釋緊張感。做頭像或吉祥物時，記得讓主體單純、保留塑形痕跡，並善用微縮佈景（", createVNode(_components.code, {
        children: "miniature diorama set"
      }), "）讓背景也像捏出來的小世界。"]
    }), "\n", createVNode(_components.p, {
      children: ["各模型實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對黏土材質與指紋的還原最直覺，短 prompt 就能抓到霧面手感，維持同角色多視角時用 ", createVNode(_components.code, {
        children: "--cref"
      }), " 配固定 ", createVNode(_components.code, {
        children: "--seed"
      }), "。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在開源陣營細節最穩，對長句自然語言理解佳，但偶爾偏 CGI 光滑感，這時把 ", createVNode(_components.code, {
        children: "handmade"
      }), "、", createVNode(_components.code, {
        children: "matte clay"
      }), " 往前放、加重語氣。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配 claymation LoRA）可控性最高，建議 CFG 抓 5～7、負面寫滿 ", createVNode(_components.code, {
        children: "glossy, smooth plastic, cgi render"
      }), "，多張挑表情最自然的一張。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代，先生一版再要「指紋再明顯一點」「打光更柔」，對新手最友善，但材質細膩度略遜前三者。實務上我會用 GPT Image 快速定角色，再拿到 Midjourney 或 Flux 量產終稿。"]
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

const url = "src/content/styles/clay.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/clay.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/clay.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
