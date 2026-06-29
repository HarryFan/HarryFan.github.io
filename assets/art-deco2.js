import { l as createVNode, H as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "裝飾藝術 Art Deco",
  "description": "幾何對稱、金屬光澤與奢華階梯紋，1920 年代裝飾藝術的摩登美學。",
  "category": "illustration",
  "tags": ["裝飾藝術", "ArtDeco", "幾何對稱", "摩登復古"],
  "difficulty": "medium",
  "prompt_zh": "裝飾藝術風格，對稱的幾何造型與直線結構，階梯狀的扇形與放射紋飾，金色與黑色配色帶金屬光澤，奢華的爵士時代摩登感，俐落的粗線條與streamline流線造型，扁平裝飾性構圖，1920 年代海報設計，幾何花卉與閃電紋",
  "prompt_en": "Art Deco style, symmetrical geometric forms and linear structure, stepped fan and sunburst motifs, gold and black palette with metallic sheen, luxurious Jazz Age glamour, bold lines and streamline shapes, flat decorative composition, 1920s poster design, geometric florals and zigzag patterns",
  "negative_prompt": "photorealistic, 3d render, organic curves, hand drawn, sketchy, dull colors, cluttered, low quality, blurry, text artifacts, watermark, rustic, asymmetric",
  "seo_title": "裝飾藝術 Art Deco 風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整裝飾藝術 Art Deco 風格 AI 提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用幾何對稱、金屬光澤與放射紋做出爵士時代海報，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/art-deco.webp",
  "related_styles": ["art-nouveau", "flat-illustration", "isometric", "vaporwave", "pop-art", "line-art"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["海報設計", "品牌識別", "包裝設計", "婚禮邀請函", "空間掛畫", "餐廳菜單"],
  "mistakes": ["造型不夠幾何對稱失去秩序感", "出現有機曲線混入新藝術風", "缺少金屬光澤顯得平淡", "配色太柔失去奢華對比", "構圖太隨意破壞放射結構"],
  "prompt_breakdown": [{
    "term": "Art Deco style",
    "effect": "鎖定裝飾藝術的核心美術風格關鍵詞"
  }, {
    "term": "symmetrical geometric forms",
    "effect": "對稱幾何造型，是裝飾藝術的秩序骨架"
  }, {
    "term": "stepped fan and sunburst motifs",
    "effect": "階梯扇形與放射紋飾，最標誌的裝飾母題"
  }, {
    "term": "gold and black palette with metallic sheen",
    "effect": "金黑配色與金屬光澤，營造奢華感"
  }, {
    "term": "bold lines and streamline shapes",
    "effect": "俐落粗線與流線造型，呼應機械摩登精神"
  }, {
    "term": "1920s poster design",
    "effect": "鎖定爵士時代的海報構圖與年代氛圍"
  }],
  "faq": [{
    "q": "Art Deco 在哪個 AI 工具效果最好？",
    "a": "Midjourney 對金屬光澤與奢華氛圍最有感，Flux 對稱幾何最穩，GPT Image 最適合用對話調整紋飾與配色。"
  }, {
    "q": "為什麼造型不夠幾何？",
    "a": "強調 symmetrical geometric forms、stepped motifs、bold straight lines，避免有機曲線與隨意筆觸。"
  }, {
    "q": "如何做出金屬奢華感？",
    "a": "加入 gold and black palette、metallic sheen、art deco luxury，並用強對比配色凸顯金箔質感。"
  }, {
    "q": "Art Deco 風格可以商用嗎？",
    "a": "風格本身不受著作權保護，很適合品牌與包裝，但建議確認所用模型授權條款。"
  }, {
    "q": "裝飾藝術和新藝術差在哪？",
    "a": "裝飾藝術走幾何對稱與機械摩登，新藝術走有機流動曲線，兩者方向相反不要混用。"
  }, {
    "q": "配色怎麼抓才地道？",
    "a": "經典是金黑配，也可加深翡翠綠、寶藍、酒紅等飽和寶石色，搭配強對比與金屬光澤。"
  }, {
    "q": "適合做哪些題材？",
    "a": "海報、菜單、邀請函、建築立面、汽車與機械主題都很對味，現代物件也能 Art Deco 化。"
  }, {
    "q": "中文還是英文 prompt 比較好？",
    "a": "英文模型理解較精準，建議以英文為主，並用 Art Deco、Jazz Age 等專名強化年代定位。"
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
      children: "裝飾藝術（Art Deco）誕生於 1920 至 30 年代的爵士時代，是對前一波新藝術有機曲線的反動。它擁抱機械、速度與現代性，把工業時代的秩序感轉化為視覺語言——幾何、對稱、直線與放射狀的結構，傳達的是繁榮、奢華與對未來的樂觀。從紐約克萊斯勒大廈的尖頂、郵輪的流線造型到電影海報，Art Deco 是那個黃金年代最自信的美學宣言。當你下提示詞時，本質上是在請 AI 模擬「機械摩登時代的裝飾設計師」的俐落手筆，而這與新藝術的柔美曲線恰好相反。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心在於幾何秩序與金屬質感。", createVNode(_components.code, {
        children: "symmetrical geometric forms"
      }), " 是骨架——Art Deco 的一切都建立在對稱與直線之上，圓、三角、階梯與放射狀重複構成嚴謹的秩序。", createVNode(_components.code, {
        children: "stepped fan and sunburst motifs"
      }), " 是最標誌的裝飾母題，扇形與旭日放射紋幾乎是它的簽名。質感上 ", createVNode(_components.code, {
        children: "gold and black palette with metallic sheen"
      }), " 營造奢華，金箔的金屬光澤與黑色的強對比是經典組合。再加 ", createVNode(_components.code, {
        children: "bold lines and streamline shapes"
      }), " 的流線造型，機械摩登的速度感立刻成形。"]
    }), "\n", createVNode(_components.p, {
      children: "題材上，Art Deco 最適合海報、品牌識別、包裝、菜單、邀請函等需要奢華秩序感的場景，建築、汽車、機械與爵士時代人物也很對味。情緒上偏自信、華麗、現代摩登，卻不適合鄉村、手作或有機自然的主題——一旦混入柔和曲線或隨意筆觸，Art Deco 的秩序感就瓦解了。實作時記得讓造型嚴格對稱、線條俐落，並善用放射紋與階梯結構強化裝飾節奏。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對金屬光澤與奢華氛圍最有感，配色漂亮，短 prompt 就有年代味，但要把 ", createVNode(_components.code, {
        children: "--no organic curves"
      }), " 寫進負面避免它偏新藝術。", createVNode(_components.strong, {
        children: "Flux"
      }), " 對稱幾何與直線結構最穩，自然語言理解佳，適合描述精密的放射紋與邊框，但偶爾偏寫實，記得把 ", createVNode(_components.code, {
        children: "Art Deco"
      }), "、", createVNode(_components.code, {
        children: "flat geometric"
      }), " 往前放。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配 Art Deco LoRA）可控性最高，能精準還原幾何秩序，建議 CFG 抓 6～8、負面寫滿 ", createVNode(_components.code, {
        children: "organic, hand drawn, asymmetric"
      }), "。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代，先生一版再要「加旭日放射紋」「金色更亮」，對不熟裝飾語彙者最友善，但金屬質感的細膩度略遜前三者。我的流程是用 GPT Image 定構圖與紋飾，再到 Midjourney 或 SD 追求最奢華的金屬終稿。"]
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

const url = "src/content/styles/art-deco.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/art-deco.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/art-deco.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
