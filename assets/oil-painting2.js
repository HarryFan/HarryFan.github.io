import { l as createVNode, H as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "古典油畫",
  "description": "厚塗筆觸、明暗對照與細膩釉染層次，重現大師級古典油畫的質感與光影。",
  "category": "realistic",
  "tags": ["油畫", "古典繪畫", "厚塗", "明暗對照", "大師風格"],
  "difficulty": "hard",
  "prompt_zh": "古典油畫，厚塗筆觸，可見的畫刀痕跡，明暗對照法，溫暖的大地色調，細膩的釉染層次，林布蘭式光線，畫布紋理，文藝復興大師風格，肖像油畫，戲劇性光影",
  "prompt_en": "classical oil painting, visible brushstrokes, impasto texture, chiaroscuro lighting, warm earthy palette, glazing layers, Rembrandt lighting, canvas texture, old master style, baroque portrait, dramatic light and shadow, fine art",
  "negative_prompt": "digital art, flat colors, 3d render, photograph, anime, cartoon, smooth gradient, low detail, text, watermark, oversaturated, plastic",
  "seo_title": "古典油畫風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整古典油畫 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用厚塗筆觸、明暗對照、釉染層次與林布蘭光做出大師級油畫，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/oil-painting.webp",
  "related_styles": ["photorealistic", "portrait-photography", "gouache", "watercolor", "concept-art", "ink-wash"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": true,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["古典肖像", "靜物畫", "歷史場景", "藝術海報", "書籍封面", "牆面裝飾畫"],
  "mistakes": ["筆觸太平滑像數位繪圖", "缺少明暗對照顯得平淡", "色調過於鮮豔失去古典感", "沒有畫布紋理像照片", "釉染層次不足顯得單薄"],
  "prompt_breakdown": [{
    "term": "classical oil painting",
    "effect": "鎖定古典油畫的整體媒材與美術語彙"
  }, {
    "term": "visible brushstrokes",
    "effect": "強調可見的筆觸痕跡，避免畫面被磨成數位平滑感"
  }, {
    "term": "impasto texture",
    "effect": "指定厚塗質感，讓顏料堆疊出立體的物理層次"
  }, {
    "term": "chiaroscuro lighting",
    "effect": "套用明暗對照法，製造強烈的光影戲劇張力"
  }, {
    "term": "glazing layers",
    "effect": "重現釉染的多層透明罩染，營造深邃通透的色彩"
  }, {
    "term": "Rembrandt lighting",
    "effect": "指定林布蘭式光線，臉頰陰影側出現三角光區"
  }],
  "faq": [{
    "q": "古典油畫在哪個 AI 工具效果最好？",
    "a": "Midjourney 對筆觸與光影氛圍最有大師味，Flux 對畫布紋理最穩，GPT Image 適合對話迭代構圖與主題。"
  }, {
    "q": "為什麼畫面太平滑像數位繪圖？",
    "a": "加強 visible brushstrokes、impasto texture、canvas texture，並把 smooth gradient、digital art 放進 Negative。"
  }, {
    "q": "怎麼做出戲劇性光影？",
    "a": "用 chiaroscuro lighting、Rembrandt lighting、dramatic light and shadow，描述單一光源從側面射入暗背景。"
  }, {
    "q": "為什麼顏色太鮮豔不像古典畫？",
    "a": "改用 warm earthy palette、muted tones，把 oversaturated 放進 Negative，古典油畫偏沉穩的大地色。"
  }, {
    "q": "釉染層次是什麼？要怎麼指定？",
    "a": "glazing layers 指多層透明罩染累積出的深度，加入此詞並描述 deep luminous color 能讓色彩更通透。"
  }, {
    "q": "古典油畫適合商用嗎？",
    "a": "風格不受著作權保護，但別直接重現特定名畫構圖，並確認所用模型授權條款。"
  }, {
    "q": "可以指定特定大師風格嗎？",
    "a": "可以加 old master style 或 baroque，但建議用「風格」語彙而非直接點名在世藝術家，較安全也較通用。"
  }, {
    "q": "中文還是英文 prompt 較好？",
    "a": "英文對繪畫術語理解更準，建議英文為主、中文補充主題與情緒。"
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
      children: ["古典油畫是西方美術史累積數百年的媒材語言，從文藝復興到巴洛克，畫家以亞麻仁油調和顏料，在畫布上一層層堆疊與罩染。它的魅力不在於「畫得像照片」，而在於顏料本身的物質性——厚塗處的隆起、釉染處的通透、筆刀刮過的痕跡，全都記錄了畫家的手勢。理解這點很重要，因為你下提示詞時，本質上是在請 AI 模擬「油彩堆疊在畫布上的物理結果」，而不是套一個繪畫濾鏡。", createVNode(_components.code, {
        children: "classical oil painting"
      }), " 搭配 ", createVNode(_components.code, {
        children: "visible brushstrokes"
      }), "、", createVNode(_components.code, {
        children: "canvas texture"
      }), "，才能把畫面從光滑的數位質感拉回真實媒材。"]
    }), "\n", createVNode(_components.p, {
      children: ["技術核心有兩塊。第一是", createVNode(_components.strong, {
        children: "筆觸與厚度"
      }), "：油畫最迷人的是 ", createVNode(_components.code, {
        children: "impasto"
      }), "（厚塗）——顏料厚厚堆起，在側光下產生真實的凹凸與陰影，配上可見的 ", createVNode(_components.code, {
        children: "brushstrokes"
      }), "，畫面才有手工溫度。與之相對的是 ", createVNode(_components.code, {
        children: "glazing layers"
      }), "（釉染），用透明罩染一層層疊出深邃通透的色彩，這是古典暗部之所以「黑得有顏色」的原因。第二是", createVNode(_components.strong, {
        children: "光影"
      }), "：古典大師偏愛 ", createVNode(_components.code, {
        children: "chiaroscuro"
      }), "（明暗對照法），讓主體從深暗背景中被一道側光照亮；其中最經典的是 ", createVNode(_components.code, {
        children: "Rembrandt lighting"
      }), "（林布蘭光），在臉頰陰影側留下一塊倒三角的亮區。這套光影是古典油畫戲劇張力的來源。"]
    }), "\n", createVNode(_components.p, {
      children: ["題材與情緒上，這個風格最適合莊重、深沉、帶歷史厚度的敘事：古典肖像、靜物（花卉、水果、器皿）、歷史與神話場景。色調上偏好 ", createVNode(_components.code, {
        children: "warm earthy palette"
      }), "（溫暖的大地色），沉穩而非鮮豔，能承載凝重、優雅與一絲憂鬱，卻不太適合明亮輕快或科技未來的主題。畫肖像時讓背景沉入暗部、用單一側光打亮臉部，戲劇感立刻成立。"]
    }), "\n", createVNode(_components.p, {
      children: ["各模型實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對筆觸與光影氛圍最有大師味，常常短 prompt 就能出濃厚的油畫質感與巴洛克光感，建議 ", createVNode(_components.code, {
        children: "--ar 3:4"
      }), " 拍直幅肖像、加 ", createVNode(_components.code, {
        children: "--stylize"
      }), " 提高藝術性。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在畫布紋理與筆觸細節上最穩，自然語言描述「厚塗的高光、釉染的暗部」執行得準，偶爾偏乾淨可加重 ", createVNode(_components.code, {
        children: "impasto"
      }), "、", createVNode(_components.code, {
        children: "textured"
      }), "。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配油畫 LoRA）可控性最高，能靠 LoRA 權重精細調整筆觸強度，CFG 抓 5～7、負面寫滿 ", createVNode(_components.code, {
        children: "digital art, smooth gradient, photograph"
      }), "，並用較高張數挑選質感最厚實的一張。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代——先生一版，再用自然語言要「筆觸更明顯」「暗部更深」「光從左側打進來」，對不熟繪畫術語的人最友善，但極致的顏料質感與一致性略遜前三者。實務上我會先用 GPT Image 定構圖與光源，再交給 Midjourney 或 Flux 量產高品質終稿。"]
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

const url = "src/content/styles/oil-painting.mdx";
const file = "C:/Users/GS/Documents/Astro/HarryFan.github.io/src/content/styles/oil-painting.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/GS/Documents/Astro/HarryFan.github.io/src/content/styles/oil-painting.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
