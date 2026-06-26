import { l as createVNode, H as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "新藝術風（慕夏）",
  "description": "流動曲線、裝飾邊框與優雅女性，慕夏新藝術運動的華麗裝飾美學。",
  "category": "illustration",
  "tags": ["新藝術", "慕夏", "裝飾藝術", "海報設計"],
  "difficulty": "hard",
  "prompt_zh": "新藝術運動風格，慕夏式裝飾插畫，流動的有機曲線與藤蔓紋飾，優雅的女性主角配飄逸長髮，環繞的裝飾性圓框與幾何邊框，柔和的粉彩與金色，繁複對稱的花卉圖樣，扁平的彩繪玻璃質感，Belle Époque 黃金時代海報",
  "prompt_en": "Art Nouveau style, Alphonse Mucha decorative illustration, flowing organic curves and vine ornaments, elegant woman with flowing hair, ornamental circular frame and geometric border, soft pastel and gold palette, intricate symmetrical floral patterns, flat stained glass quality, Belle Époque poster",
  "negative_prompt": "photorealistic, 3d render, modern, minimalist, harsh shadow, dark, gritty, low quality, blurry, text artifacts, watermark, asymmetric clutter, neon colors",
  "seo_title": "新藝術慕夏風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整新藝術運動慕夏風格 AI 提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用流動曲線、裝飾邊框與優雅女性做出 Belle Époque 海報，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/art-nouveau.webp",
  "related_styles": ["art-deco", "ukiyo-e", "line-art", "ink-wash", "pop-art", "flat-illustration"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["海報設計", "書封裝幀", "品牌識別", "包裝設計", "婚禮邀請函", "空間掛畫"],
  "mistakes": ["曲線不夠流動顯得僵硬", "缺少裝飾邊框失去慕夏感", "構圖不對稱破壞裝飾平衡", "配色太現代不夠典雅", "加入寫實光影破壞平面裝飾性"],
  "prompt_breakdown": [{
    "term": "Art Nouveau style",
    "effect": "鎖定新藝術運動的核心美術風格關鍵詞"
  }, {
    "term": "Alphonse Mucha decorative illustration",
    "effect": "指定慕夏式裝飾插畫，是風格的標竿"
  }, {
    "term": "flowing organic curves and vine ornaments",
    "effect": "流動有機曲線與藤蔓紋飾，新藝術的視覺靈魂"
  }, {
    "term": "ornamental circular frame",
    "effect": "裝飾性圓框，慕夏海報最標誌的構圖元素"
  }, {
    "term": "soft pastel and gold palette",
    "effect": "柔和粉彩配金色，營造典雅華麗的調性"
  }, {
    "term": "intricate symmetrical floral patterns",
    "effect": "繁複對稱花卉圖樣，強化裝飾密度與平衡"
  }],
  "faq": [{
    "q": "慕夏風格在哪個 AI 工具效果最好？",
    "a": "Midjourney 對裝飾曲線與華麗構圖最有感覺，Flux 對稱性穩定，GPT Image 最適合用對話調整邊框與配色。"
  }, {
    "q": "為什麼曲線不夠流動？",
    "a": "強調 flowing organic curves、whiplash line、vine ornaments，避免僵硬直線與機械式幾何。"
  }, {
    "q": "如何做出慕夏標誌的圓框構圖？",
    "a": "加入 ornamental circular frame、decorative arch，讓主角被裝飾性框架環繞，是慕夏海報的招牌。"
  }, {
    "q": "慕夏風格可以商用嗎？",
    "a": "慕夏作品多已進入公共領域，風格本身不受著作權保護，但建議確認所用模型授權條款。"
  }, {
    "q": "配色怎麼抓才典雅？",
    "a": "用 soft pastel and gold，偏暖米、淡綠、玫瑰金與金箔，避免高飽和螢光破壞 Belle Époque 的優雅。"
  }, {
    "q": "為什麼畫面太現代不夠古典？",
    "a": "強調 Belle Époque、Art Nouveau poster，並加裝飾紋樣與對稱構圖，避免極簡與現代扁平語言。"
  }, {
    "q": "新藝術和裝飾藝術差在哪？",
    "a": "新藝術走有機流動曲線與自然紋飾，裝飾藝術走幾何對稱與機械現代感，方向相反不要混用。"
  }, {
    "q": "中文還是英文 prompt 比較好？",
    "a": "英文模型理解較精準，建議以英文為主，並用 Mucha、Art Nouveau 等專名強化風格定位。"
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
      children: "新藝術運動是十九世紀末橫掃歐洲的裝飾藝術浪潮，而捷克畫家慕夏（Alphonse Mucha）幾乎成了這個風格的代名詞。它的核心精神是「向自然取法」——藤蔓、花卉、流水的有機曲線取代了工業時代的生硬直線，藝術家相信美應該滲透到日常生活的每個物件，從海報、珠寶到建築鐵件無所不包。慕夏為女演員莎拉·伯恩哈特設計的劇場海報，把優雅女性、繁複裝飾與柔和色彩融為一體，奠定了延續至今的視覺典範。當你下提示詞時，本質上是在請 AI 模擬「世紀末巴黎的裝飾海報畫師」的華麗手筆。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心在於曲線與裝飾結構。", createVNode(_components.code, {
        children: "flowing organic curves and vine ornaments"
      }), " 是靈魂——新藝術最標誌的是被稱為「鞭索線」的流動曲線，它應該蜿蜒、優雅、充滿生命力，而非僵硬的幾何。構圖上 ", createVNode(_components.code, {
        children: "ornamental circular frame"
      }), " 是慕夏的招牌，主角女性常被裝飾性的圓框、拱門與花環環繞，形成對稱而華麗的版面。再加 ", createVNode(_components.code, {
        children: "intricate symmetrical floral patterns"
      }), " 填滿背景的裝飾密度，以及 ", createVNode(_components.code, {
        children: "soft pastel and gold palette"
      }), " 的典雅配色，Belle Époque 的氣息立刻浮現。"]
    }), "\n", createVNode(_components.p, {
      children: "題材上，慕夏風最適合海報、書封、包裝、婚禮邀請函等需要華麗裝飾的場景，主角常是飄逸長髮的優雅女性，搭配花卉與季節象徵。情緒上偏典雅、夢幻、帶古典浪漫，卻不適合極簡、科技或冷硬的主題——一旦去掉裝飾與曲線，新藝術的靈魂就消失了。實作時記得讓曲線流動、構圖對稱平衡，並用裝飾邊框環繞主體，這是區分慕夏與一般美人插畫的關鍵。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對裝飾曲線與華麗氛圍最有靈氣，短 prompt 就有慕夏味，但要把 ", createVNode(_components.code, {
        children: "--no modern, minimalist"
      }), " 寫進負面、適度提高 ", createVNode(_components.code, {
        children: "--stylize"
      }), " 讓裝飾更繁複。", createVNode(_components.strong, {
        children: "Flux"
      }), " 對稱構圖與細節密度最穩，自然語言理解佳，適合描述複雜的邊框與花飾，但偶爾偏寫實，記得把 ", createVNode(_components.code, {
        children: "Art Nouveau"
      }), "、", createVNode(_components.code, {
        children: "Mucha"
      }), " 往前放、加重語氣。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配 Mucha LoRA）可控性最高，能精準還原裝飾質感，建議 CFG 抓 6～8、負面寫滿 ", createVNode(_components.code, {
        children: "photorealistic, modern, harsh shadow"
      }), "，多張挑對稱最平衡的一張。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代，先生一版再要「加裝飾圓框」「配色更金一點」，對不熟新藝術語彙者最友善，但裝飾的繁複細膩度略遜前三者。我的流程是用 GPT Image 定構圖與主角，再到 Midjourney 或 SD 追求最華麗的裝飾終稿。"]
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

const url = "src/content/styles/art-nouveau.mdx";
const file = "C:/Users/GS/Documents/Astro/HarryFan.github.io/src/content/styles/art-nouveau.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/GS/Documents/Astro/HarryFan.github.io/src/content/styles/art-nouveau.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
