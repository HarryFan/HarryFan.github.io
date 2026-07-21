import { v as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';

const frontmatter = {
  "title": "復古繪本插畫",
  "description": "米黃紙質、有限套色與溫潤手繪線條構成的中世紀復古童書插畫風格。",
  "category": "illustration",
  "tags": ["復古繪本", "童書插畫", "中世紀插畫", "手繪"],
  "difficulty": "medium",
  "prompt_zh": "復古童書插畫風格，1950 至 60 年代中世紀繪本美學，有限套色印刷，米黃泛舊紙質，溫潤手繪線條，紋理筆觸質感，柔和大地色與低彩度配色，天真質樸的造型，懷舊溫暖氛圍，老印刷品紋理",
  "prompt_en": "vintage storybook illustration, mid-century childrens book 1950s 1960s, limited color palette print, aged cream paper texture, warm hand-drawn lines, textured brush strokes, muted earthy colors, naive charming shapes, nostalgic cozy mood, old print grain",
  "negative_prompt": "photorealistic, 3d render, neon colors, digital smooth gradient, glossy, hyper-detailed, modern flat vector, harsh contrast, watermark, text errors",
  "seo_title": "復古繪本插畫風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整復古繪本插畫 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用米黃紙質、有限套色與手繪線條做出中世紀童書質感，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/storybook-vintage.webp",
  "related_styles": ["childrens-book", "watercolor", "gouache", "papercut", "risograph", "flat-illustration"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["童書插圖", "繪本封面", "節慶賀卡", "品牌懷舊主視覺", "包裝插畫", "雜誌專欄插圖"],
  "mistakes": ["配色太鮮豔失去復古感", "線條太工整缺乏手繪味", "沒有紙質紋理顯得太數位", "造型太寫實失去天真質樸", "對比太強破壞溫潤調性"],
  "prompt_breakdown": [{
    "term": "mid-century childrens book",
    "effect": "鎖定 1950 至 60 年代中世紀童書的時代美學"
  }, {
    "term": "limited color palette print",
    "effect": "用有限套色印刷，重現當年印刷成本下的配色"
  }, {
    "term": "aged cream paper texture",
    "effect": "加上米黃泛舊紙質，營造老書翻閱的懷舊感"
  }, {
    "term": "warm hand-drawn lines",
    "effect": "指定溫潤手繪線條，保留人手繪製的不完美溫度"
  }, {
    "term": "muted earthy colors",
    "effect": "用低彩度大地色，奠定柔和懷舊的整體調性"
  }, {
    "term": "naive charming shapes",
    "effect": "採天真質樸的造型，呼應童書的純真氣質"
  }],
  "faq": [{
    "q": "復古繪本風在哪個 AI 工具效果最好？",
    "a": "Midjourney 對紙質與手繪質感最直覺，Flux 對配色與構圖較穩，GPT Image 適合用對話調整年代感與題材。"
  }, {
    "q": "為什麼看起來太新太數位？",
    "a": "缺少紙質與套色限制。加入 aged cream paper texture、limited color palette、old print grain，並把 digital smooth gradient 放進負面。"
  }, {
    "q": "怎麼抓出 1950 到 60 年代的味道？",
    "a": "明確寫 mid-century、1950s 1960s storybook，用低彩度大地色與簡化造型，避開現代鮮豔配色與超細節。"
  }, {
    "q": "復古繪本風可以商用嗎？",
    "a": "風格本身不受著作權保護，但避免重現特定插畫家作品，並確認所用模型授權條款。"
  }, {
    "q": "怎麼做整本書的插圖一致？",
    "a": "固定同一組紙質、配色與線條關鍵詞與 seed，並維持相同角色造型，逐頁只改場景與動作。"
  }, {
    "q": "線條要多工整？",
    "a": "要保留手繪的不完美。寫 warm hand-drawn lines、slightly imperfect，避免 clean vector 那種過度工整的數位線。"
  }, {
    "q": "中文 prompt 和英文 prompt 哪個好？",
    "a": "英文對 mid-century、limited palette、print grain 等術語理解更精準，建議以英文為主、中文補充故事與情緒。"
  }, {
    "q": "怎麼讓系列圖風格一致？",
    "a": "固定年代、紙質與配色關鍵詞與 seed，Midjourney 可用 sref 鎖定整體調性維持一致。"
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
      children: "復古繪本插畫（Vintage Storybook Illustration）指的是 1950 到 60 年代黃金時期童書的視覺語言，那是一個印刷成本高昂、套色數量有限的年代，反而逼出了一套極具魅力的美學。藝術家必須在三四個顏色內完成整本書，於是發展出簡化的造型、巧妙的留白、以及對紙張本身質感的善用。理解這層「在限制中創造美感」的精神很重要，因為你下提示詞時，本質上是在重現一套「套色有限、手繪溫潤、印刷帶顆粒」的老書質感，而不是套一個籠統的復古濾鏡。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心有三塊。第一是配色：", createVNode(_components.code, {
        children: "limited color palette print"
      }), "（有限套色印刷）與 ", createVNode(_components.code, {
        children: "muted earthy colors"
      }), "（低彩度大地色）是時代的根本，務必把 ", createVNode(_components.code, {
        children: "neon colors"
      }), " 與 ", createVNode(_components.code, {
        children: "harsh contrast"
      }), " 放進負面提示。第二是紙質：", createVNode(_components.code, {
        children: "aged cream paper texture"
      }), "（米黃泛舊紙質）與 ", createVNode(_components.code, {
        children: "old print grain"
      }), "（老印刷顆粒）讓畫面脫離數位的乾淨，多了翻閱舊書的溫度。第三是手感：", createVNode(_components.code, {
        children: "warm hand-drawn lines"
      }), "（溫潤手繪線條）與 ", createVNode(_components.code, {
        children: "naive charming shapes"
      }), "（天真質樸造型）保留了人手繪製的不完美與童趣，這是這個風格最動人的地方。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合溫暖、懷舊、純真與療癒的內容：童話故事、節慶場景、小動物、家庭日常。它擅長承載柔和的鄉愁與安全感，但不適合需要冷硬科技感或高張力衝突的場景。做繪本插圖時，建議維持構圖簡潔、善用留白，並讓配色集中在三四個低彩度色相內，整體才會有那股老書的和諧。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對紙質與手繪筆觸質感最直覺，短 prompt 就有懷舊味，建議 ", createVNode(_components.code, {
        children: "--ar 4:5"
      }), " 做直式繪本，並用 ", createVNode(_components.code, {
        children: "--sref"
      }), " 鎖定紙質與配色調性。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在有限配色與構圖控制上最穩，對長句理解佳，要精確指定「只用磚紅、芥末黃、灰藍三色」這類套色時表現出色，但偶爾線條偏乾淨，記得加重 ", createVNode(_components.code, {
        children: "hand-drawn, textured"
      }), "。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配 vintage storybook LoRA）可控性最高，能靠 LoRA 與負面提示精調紙紋與顆粒強度，CFG 抓 5～7，負面寫滿 ", createVNode(_components.code, {
        children: "digital, glossy, neon"
      }), "。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 最適合對話迭代與年代調整，可以逐句要「再舊一點」「配色降彩度」「線條手繪感重些」，對說故事的人最友善，但紙質細膩度略遜前三者。實務上我會先用 GPT Image 定年代與配色，再拿到 Midjourney 或 Flux 量產質感最好的終稿。"]
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

const url = "src/content/styles/storybook-vintage.mdx";
const file = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/storybook-vintage.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/storybook-vintage.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
