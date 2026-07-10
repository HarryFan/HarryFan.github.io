import { n as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "蒸氣波 Vaporwave",
  "description": "紫粉霓虹漸層、80 年代復古數位殘響與懷舊網路美學交織的迷幻視覺風格。",
  "category": "illustration",
  "tags": ["蒸氣波", "復古未來", "霓虹", "80年代"],
  "difficulty": "easy",
  "prompt_zh": "蒸氣波美學，紫色與粉紅霓虹漸層，80 年代復古未來感，幾何網格地面，希臘石膏雕像，棕櫚樹剪影，VHS 掃描線雜訊，故障藝術效果，落日漸層天空，迷幻懷舊氛圍",
  "prompt_en": "vaporwave aesthetic, purple and pink neon gradient, 80s retro-futurism, geometric grid floor, greek marble bust statue, palm tree silhouette, VHS scanline noise, glitch art effect, sunset gradient sky, dreamy nostalgic mood, chrome text",
  "negative_prompt": "photorealistic, natural lighting, muted colors, modern minimalism, sharp focus everywhere, dull, monochrome, realistic shadows, text errors, watermark",
  "seo_title": "蒸氣波 Vaporwave 風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整蒸氣波 Vaporwave AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用霓虹漸層、網格地面、石膏雕像與 VHS 雜訊做出復古未來感，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/vaporwave.webp",
  "related_styles": ["cyberpunk-anime", "retro-anime-80s", "pop-art", "risograph", "pixel-art", "art-deco"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["音樂專輯封面", "社群貼文", "桌布背景", "復古海報", "串流直播背景", "品牌活動主視覺"],
  "mistakes": ["配色不夠飽和顯得髒", "缺少網格與雕像等標誌符號", "漸層方向混亂破壞氛圍", "VHS 雜訊過量蓋掉主體", "構圖太寫實失去迷幻感"],
  "prompt_breakdown": [{
    "term": "purple and pink neon gradient",
    "effect": "鎖定蒸氣波最核心的紫粉霓虹配色與漸層"
  }, {
    "term": "geometric grid floor",
    "effect": "加入向遠方延伸的網格地面，建立復古數位空間感"
  }, {
    "term": "greek marble bust statue",
    "effect": "放入希臘石膏雕像，是蒸氣波最具辨識度的符號"
  }, {
    "term": "VHS scanline noise",
    "effect": "疊上錄影帶掃描線雜訊，營造類比媒材的懷舊質感"
  }, {
    "term": "sunset gradient sky",
    "effect": "用落日漸層天空強化夢幻與迷幻氛圍"
  }, {
    "term": "glitch art effect",
    "effect": "加入故障藝術錯位效果，呼應數位殘響美學"
  }],
  "faq": [{
    "q": "蒸氣波風格在哪個 AI 工具效果最好？",
    "a": "Midjourney 對霓虹漸層與氛圍掌握最直覺，Flux 對網格與文字排版較穩，GPT Image 適合用對話快速調整配色與符號。"
  }, {
    "q": "為什麼顏色看起來很髒不夠迷幻？",
    "a": "蒸氣波要高飽和的紫、粉、青。把 muted colors 放進 Negative Prompt，並強調 neon gradient、high saturation。"
  }, {
    "q": "一定要放石膏雕像嗎？",
    "a": "不一定，但石膏胸像、棕櫚樹、海豚、網格是高辨識度符號，放一兩個能立刻讓人認出這是蒸氣波。"
  }, {
    "q": "蒸氣波可以商用嗎？",
    "a": "風格本身不受著作權保護，但避免直接使用真實品牌 logo 與既有專輯視覺，並確認模型授權條款。"
  }, {
    "q": "VHS 雜訊要加多少才對？",
    "a": "適量即可，建議當作疊加質感而非主體。雜訊過量會蓋掉主視覺，反而顯得雜亂。"
  }, {
    "q": "怎麼做出向遠方延伸的網格地面？",
    "a": "直接寫 geometric grid floor",
    "perspective grid": null,
    "retro synthwave landscape，並指定地平線位置與消失點。": null
  }, {
    "q": "中文 prompt 和英文 prompt 哪個好？",
    "a": "英文對 vaporwave、glitch、scanline 等術語理解更精準，建議以英文為主、中文補充情緒與構圖。"
  }, {
    "q": "怎麼讓系列圖風格一致？",
    "a": "固定同一組配色與符號關鍵詞與 seed，Midjourney 可用 sref 鎖定風格參考圖維持一致調性。"
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
      children: "蒸氣波（Vaporwave）誕生於 2010 年代初的網路次文化，它本質上是一種對 80、90 年代消費主義、早期電腦圖形與商場音樂的「懷舊再加工」。它刻意挪用過時的科技美感——VHS 錄影帶的色偏、Windows 95 的視窗、購物頻道的字體、希臘石膏像的高雅符號——再用迷幻的紫粉霓虹重新混音，產生一種既熟悉又疏離的夢境感。理解這層「諷刺中帶鄉愁」的精神很關鍵，因為你下提示詞時，其實是在拼貼一組互相矛盾卻又和諧的復古符號，而不是單純套濾鏡。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心在於配色與符號。配色上，蒸氣波幾乎被 ", createVNode(_components.code, {
        children: "purple and pink neon gradient"
      }), " 定義——高飽和的洋紅、青藍、夕陽橘交織成漸層，務必把 ", createVNode(_components.code, {
        children: "muted colors"
      }), " 放進負面提示，否則畫面會變灰髒。符號上，", createVNode(_components.code, {
        children: "geometric grid floor"
      }), "（向遠方延伸的網格地面）、", createVNode(_components.code, {
        children: "greek marble bust statue"
      }), "（石膏胸像）、棕櫚樹剪影、海豚與羅馬柱是高辨識度元素，放一兩個就能立刻被認出。再疊上 ", createVNode(_components.code, {
        children: "VHS scanline noise"
      }), " 與 ", createVNode(_components.code, {
        children: "glitch art effect"
      }), "，類比媒材的雜訊與數位故障感讓畫面有了時代的「殘響」。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合慵懶、迷幻、帶點空虛與鄉愁的氛圍：午夜的城市、無人的商場、夕陽下的泳池、漂浮的 3D 物件。它擅長承載「美麗的衰敗感」，但不適合需要清晰資訊傳達或溫暖寫實的場景。做音樂封面、桌布或直播背景時，建議讓構圖留白、主體單純，把氛圍交給漸層與光暈。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對霓虹漸層與夢幻氛圍最直覺，短 prompt 就能出味道，建議用 ", createVNode(_components.code, {
        children: "--ar 1:1"
      }), " 做專輯封面、", createVNode(_components.code, {
        children: "--ar 16:9"
      }), " 做桌布，並用 ", createVNode(_components.code, {
        children: "--sref"
      }), " 鎖定同一組調性。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在網格透視與文字排版上最穩，對長句理解佳，要做帶 ", createVNode(_components.code, {
        children: "chrome text"
      }), " 標題或日文片假名點綴時表現出色，但偶爾飽和度偏低，記得加重 ", createVNode(_components.code, {
        children: "high saturation, neon"
      }), "。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配 vaporwave LoRA）可控性最高，能靠 LoRA 與負面提示精調故障與雜訊強度，CFG 抓 6～8 較穩。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 最適合對話迭代，可以一句句要「天空再粉一點」「加一座石膏像」「網格往後延伸」，對新手最友善，但細膩質感略遜前三者。實務上我會先用 GPT Image 定調與符號配置，再拿到 Midjourney 量產高品質終稿。"]
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

const url = "src/content/styles/vaporwave.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/vaporwave.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/vaporwave.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
