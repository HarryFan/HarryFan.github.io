import { v as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';

const frontmatter = {
  "title": "Riso 孔版印刷",
  "description": "螢光油墨疊印、半色調網點與套色錯位交織的復古孔版印刷質感。",
  "category": "illustration",
  "tags": ["孔版印刷", "Riso", "半色調", "復古印刷"],
  "difficulty": "medium",
  "prompt_zh": "孔版印刷風格，螢光粉紅與藍色雙色套印，半色調網點紋理，套色輕微錯位，紙張顆粒質感，平塗有限色域，油墨疊印產生第三色，復古印刷品味，扁平插畫",
  "prompt_en": "risograph print style, two-color spot print, fluorescent pink and blue ink, halftone dot texture, slight misregistration, paper grain, limited color palette, ink overprint creating third color, flat illustration, retro print aesthetic",
  "negative_prompt": "photorealistic, smooth gradient, full color, glossy, 3d render, high detail rendering, clean vector, drop shadow, watermark, text errors",
  "seo_title": "Riso 孔版印刷風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整 Risograph 孔版印刷 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用螢光油墨、半色調網點與套色錯位做出復古印刷質感，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/risograph.webp",
  "related_styles": ["papercut", "flat-illustration", "pop-art", "vaporwave", "line-art", "gouache"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["獨立刊物封面", "活動海報", "唱片內頁", "文創周邊", "社群插畫", "小誌 zine 排版"],
  "mistakes": ["色域太多失去雙色套印感", "漸層過於平滑不像油墨", "沒有半色調網點顯得太數位", "套色完全對齊缺乏手感", "顏色用一般色而非螢光油墨色"],
  "prompt_breakdown": [{
    "term": "two-color spot print",
    "effect": "鎖定 Riso 雙色套印的核心邏輯，限制色域"
  }, {
    "term": "fluorescent pink and blue ink",
    "effect": "指定 Riso 標誌性的螢光油墨色（如螢光粉、藍）"
  }, {
    "term": "halftone dot texture",
    "effect": "加入半色調網點，是孔版印刷的關鍵紋理"
  }, {
    "term": "slight misregistration",
    "effect": "製造輕微套色錯位，模擬手工印刷的位移手感"
  }, {
    "term": "ink overprint creating third color",
    "effect": "兩色重疊產生第三色，重現 Riso 疊印特性"
  }, {
    "term": "paper grain",
    "effect": "加上紙張顆粒質感，強化實體印刷品的觸感"
  }],
  "faq": [{
    "q": "Riso 風格在哪個 AI 工具效果最好？",
    "a": "Midjourney 對油墨質感與半色調最直覺，Flux 對平塗與配色控制較穩，GPT Image 適合用對話限定雙色與調整錯位。"
  }, {
    "q": "為什麼看起來太乾淨不像印刷？",
    "a": "Riso 的靈魂是不完美。加入 halftone dot、paper grain、slight misregistration，並把 smooth gradient、clean vector 放進 Negative Prompt。"
  }, {
    "q": "Riso 一定要用螢光色嗎？",
    "a": "不一定但很關鍵。Riso 的招牌是螢光粉、螢光橘、藍等特色油墨，用一般 CMYK 色會少了那股螢光感。"
  }, {
    "q": "Riso 風格可以商用嗎？",
    "a": "風格本身不受著作權保護，但避免重現特定設計師作品，並確認所用模型授權條款。"
  }, {
    "q": "怎麼控制只用兩到三個顏色？",
    "a": "明確寫 two-color spot print 或 three-color riso，列出具體油墨色，並在負面提示加 full color 抑制多色。"
  }, {
    "q": "套色錯位要多明顯？",
    "a": "輕微即可，slight misregistration 約一兩像素的位移最自然，太大會像印壞而非風格。"
  }, {
    "q": "中文 prompt 和英文 prompt 哪個好？",
    "a": "英文對 risograph、halftone、misregistration 等術語理解更精準，建議以英文為主、中文補充題材。"
  }, {
    "q": "怎麼讓系列圖風格一致？",
    "a": "固定同一組油墨色與網點關鍵詞與 seed，Midjourney 可用 sref 鎖定風格參考維持一致調性。"
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
      children: "孔版印刷（Risograph）原本是日本理想科學工業推出的高速數位印刷機，因為成本低、速度快，在獨立出版、小誌（zine）與藝術圈被玩成一種獨特的視覺語言。它的迷人之處在於「美麗的不完美」——油墨是一層層分色套印的，因此會有輕微的套色錯位、明顯的半色調網點、以及紙張吸墨後的顆粒質感。理解這層工藝邏輯很重要，因為你下提示詞時，本質上是在模擬一套「分色印刷、限制色域、手工痕跡明顯」的實體印刷結果，而不是平滑的數位向量。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心有三塊。第一是有限色域：Riso 通常只用兩到三種特色油墨，所以 ", createVNode(_components.code, {
        children: "two-color spot print"
      }), " 與具體的 ", createVNode(_components.code, {
        children: "fluorescent pink and blue ink"
      }), " 是必備關鍵詞，務必把 ", createVNode(_components.code, {
        children: "full color"
      }), " 放進負面提示。第二是質感：", createVNode(_components.code, {
        children: "halftone dot texture"
      }), "（半色調網點）與 ", createVNode(_components.code, {
        children: "paper grain"
      }), "（紙張顆粒）讓畫面脫離數位的乾淨感。第三是手工痕跡：", createVNode(_components.code, {
        children: "slight misregistration"
      }), "（輕微套色錯位）與 ", createVNode(_components.code, {
        children: "ink overprint creating third color"
      }), "（兩色疊印產生第三色），這兩點是區分「真 Riso」與「假扁平插畫」的關鍵。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合帶手感、文藝、復古而溫暖的內容：獨立刊物、音樂活動、文創周邊、人物與植物插畫。它擅長承載手作的親切感與印刷品的實體溫度，但不適合需要寫實細節或高光澤質感的商業攝影場景。做海報或刊物時，建議保持構圖簡潔、用大面積平塗色塊，把細節交給網點與顆粒。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對油墨質感與半色調最直覺，短 prompt 就有印刷味，建議 ", createVNode(_components.code, {
        children: "--ar 3:4"
      }), " 做刊物封面，並用 ", createVNode(_components.code, {
        children: "--sref"
      }), " 鎖定油墨配色。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在平塗色塊與構圖控制上最穩，對長句理解佳，要做帶大字標題的 zine 排版時表現出色，但偶爾網點不明顯，記得加重 ", createVNode(_components.code, {
        children: "visible halftone, grainy"
      }), "。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配 riso LoRA）可控性最高，能靠 LoRA 與負面提示精調錯位與顆粒強度，CFG 抓 5～7 較穩，並建議降低過度銳化。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 最適合對話迭代，可以逐句要「只用粉藍兩色」「網點再明顯一點」「加一點套色位移」，對新手最友善，但細膩印刷質感略遜前三者。實務上我會先用 GPT Image 定色與構圖，再拿到 Midjourney 或 Flux 量產高品質終稿。"]
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

const url = "src/content/styles/risograph.mdx";
const file = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/risograph.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/risograph.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
