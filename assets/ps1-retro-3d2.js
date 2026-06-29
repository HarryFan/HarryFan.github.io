import { l as createVNode, H as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "PS1 復古低多邊形",
  "description": "還原初代 PlayStation 的低面數 3D，貼圖晃動、頂點抖動與點陣材質，滿滿懷舊感的復古電玩美學。",
  "category": "game",
  "tags": ["PS1", "低多邊形", "復古3D", "像素貼圖", "懷舊"],
  "difficulty": "medium",
  "prompt_zh": "PS1 初代 PlayStation 復古 3D 風格，低多邊形模型，粗糙的點陣貼圖材質，頂點抖動與貼圖晃動，低解析度，仿射貼圖扭曲，有限的色彩，1990 年代家用主機畫質，CRT 螢幕質感，懷舊的數位顆粒感",
  "prompt_en": "PS1 graphics, retro low poly 3d, PlayStation 1 era render, low polygon count, pixelated low-res textures, vertex jitter, affine texture warping, dithering, limited color palette, 90s console game, CRT scanlines, nostalgic digital grain, chunky models",
  "negative_prompt": "high poly, smooth textures, modern graphics, ray tracing, photorealistic, high resolution, clean render, 4k, text, watermark, anti-aliasing",
  "seo_title": "PS1 復古低多邊形風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整 PS1 復古低多邊形 3D AI 提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用低面數、點陣貼圖與頂點抖動還原初代 PlayStation 畫質，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/ps1-retro-3d.webp",
  "related_styles": ["voxel", "pixel-art", "retro-anime-80s", "vaporwave", "blender-3d", "cel-shading"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["復古遊戲場景", "角色模型設計", "恐怖遊戲氛圍", "懷舊海報", "社群貼文", "遊戲截圖風"],
  "mistakes": ["面數太高失去稜角感", "貼圖太精緻不夠粗糙", "缺少點陣與抖動顯得太乾淨", "解析度過高破壞復古味", "色彩太豐富不符合當年硬體限制"],
  "prompt_breakdown": [{
    "term": "PS1 graphics",
    "effect": "鎖定初代 PlayStation 畫質的核心關鍵詞"
  }, {
    "term": "low polygon count",
    "effect": "指定低面數模型，保留稜角分明的粗糙造型"
  }, {
    "term": "pixelated low-res textures",
    "effect": "加入粗糙的低解析點陣貼圖，還原當年材質"
  }, {
    "term": "vertex jitter",
    "effect": "模擬 PS1 著名的頂點抖動，這是辨識度極高的特徵"
  }, {
    "term": "affine texture warping",
    "effect": "重現仿射貼圖扭曲，貼圖會隨透視晃動變形"
  }, {
    "term": "limited color palette",
    "effect": "限制色彩數量，符合當年硬體的顯色限制"
  }],
  "faq": [{
    "q": "PS1 復古 3D 在哪個 AI 工具效果最好？",
    "a": "Midjourney 對復古顆粒與氛圍最直覺，Flux 低面造型穩定，GPT Image 適合對話調整懷舊細節。"
  }, {
    "q": "怎麼做出頂點抖動那種特徵？",
    "a": "直接寫 vertex jitter 搭配 affine texture warping，這兩個是 PS1 最具辨識度的技術瑕疵，模型對它們反應不錯。"
  }, {
    "q": "為什麼生出來太精緻不夠復古？",
    "a": "把 high poly、smooth textures、4k 放進 Negative Prompt，並在正向強調 low poly、pixelated textures、low resolution。"
  }, {
    "q": "PS1 風和體素風差在哪？",
    "a": "體素由立方體堆疊、邊緣呈階梯狀；PS1 風是低面數三角網格加粗糙貼圖，造型有尖銳稜角而非方塊。"
  }, {
    "q": "為什麼很多恐怖遊戲愛用這風格？",
    "a": "低解析的模糊與貼圖晃動天生製造「看不清」的不安感，加上懷舊濾鏡，恐怖氛圍格外強烈。"
  }, {
    "q": "中文 prompt 還是英文好？",
    "a": "英文對 low poly、affine warping 等術語理解更準，建議英文為主、中文補充場景與年代感。"
  }, {
    "q": "適合做復古遊戲截圖風嗎？",
    "a": "非常適合，加上 CRT scanlines 與 limited palette 能仿出當年電視螢幕的截圖質感，懷舊感十足。"
  }, {
    "q": "為什麼模型太圓滑沒有稜角？",
    "a": "多半是面數設定不夠低，加重 low polygon count、chunky models 並把 smooth 放進負面，稜角就會回來。"
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
      children: ["PS1 復古低多邊形（PS1 retro low poly）是一種「擁抱技術限制」的懷舊美學。1994 年初代 ", createVNode(_components.code, {
        children: "PlayStation"
      }), " 問世時，硬體算力極為有限：模型只能由極少的多邊形構成，貼圖解析度低得可憐，更因為缺乏浮點運算與 Z-buffer，產生了兩個著名的「瑕疵」——頂點隨距離抖動（", createVNode(_components.code, {
        children: "vertex jitter"
      }), "）與貼圖隨透視扭曲（", createVNode(_components.code, {
        children: "affine texture warping"
      }), "）。當年這些都是工程師頭痛的限制，但時隔三十年，獨立遊戲圈反而把它們當作風格特徵刻意還原。理解這層由來很重要：下提示詞時，你不是要做一個「畫質差的 3D 圖」，而是精準復刻一套特定硬體世代的視覺指紋，那些抖動與粗糙正是靈魂所在。"]
    }), "\n", createVNode(_components.p, {
      children: ["技術核心有三塊撐起這個風格。第一是", createVNode(_components.strong, {
        children: "低面數造型"
      }), "，", createVNode(_components.code, {
        children: "low polygon count"
      }), "、", createVNode(_components.code, {
        children: "chunky models"
      }), " 讓模型保留尖銳稜角與簡化輪廓，曲面被切成可見的三角面——這是與圓滑現代 3D 最大的差別。第二是", createVNode(_components.strong, {
        children: "粗糙點陣貼圖"
      }), "，", createVNode(_components.code, {
        children: "pixelated low-res textures"
      }), "、", createVNode(_components.code, {
        children: "dithering"
      }), " 還原當年塞進有限顯存的低解析材質，連漸層都得用點陣抖色來偽裝。第三是", createVNode(_components.strong, {
        children: "那些著名瑕疵"
      }), "，", createVNode(_components.code, {
        children: "vertex jitter"
      }), " 與 ", createVNode(_components.code, {
        children: "affine texture warping"
      }), " 是 PS1 最具辨識度的招牌，少了它們就只是普通的低面建模而已。再加上 ", createVNode(_components.code, {
        children: "CRT scanlines"
      }), " 與 ", createVNode(_components.code, {
        children: "limited color palette"
      }), "，整體就有了走進 90 年代客廳電視的錯覺。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合懷舊、神秘、帶詭異感的內容：復古冒險場景、低面角色、恐怖遊戲氛圍、像素風截圖。低解析帶來的模糊天生適合恐怖題材——看不清的怪物比看得清的更可怕。做場景時建議搭配 CRT 質感與有限色盤，並用昏暗光線強化年代與不安感。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對復古顆粒與整體氛圍的還原最直覺，短 prompt 就能跑出 ", createVNode(_components.code, {
        children: "90s console game"
      }), " 的味道，鎖風格時固定 ", createVNode(_components.code, {
        children: "--seed"
      }), "、用 ", createVNode(_components.code, {
        children: "--ar 4:3"
      }), " 還原當年螢幕比例，並可加 ", createVNode(_components.code, {
        children: "--style raw"
      }), " 減少過度美化。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在開源陣營裡低面造型最穩，對長句理解佳，適合描述具體場景與材質，但偶爾會偷偷提升解析度，這時把 ", createVNode(_components.code, {
        children: "low poly"
      }), "、", createVNode(_components.code, {
        children: "low resolution"
      }), " 往前放並加重。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配 PS1/low poly LoRA）可控性最高，能精準調面數感與貼圖粗糙度，建議 CFG 抓 5～7、負面寫滿 ", createVNode(_components.code, {
        children: "high poly, smooth, 4k"
      }), "。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代，可以邊生邊要「貼圖再粗糙點」「加 CRT 掃描線」「色彩更有限」，新手最友善，但復古一致性略遜前三者。實務上常先用 GPT Image 定場景，再拿到 Midjourney 或 SD 加重復古質感做終稿。"]
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

const url = "src/content/styles/ps1-retro-3d.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/ps1-retro-3d.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/ps1-retro-3d.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
