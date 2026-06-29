import { l as createVNode, H as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "少女漫畫",
  "description": "閃亮大眼、花卉網點與夢幻氛圍，少女漫畫纖細浪漫的手繪質感。",
  "category": "anime",
  "tags": ["少女漫畫", "網點", "浪漫", "大眼睛"],
  "difficulty": "medium",
  "prompt_zh": "少女漫畫風格，閃亮的大眼睛佈滿星光，纖細優雅的線條，花卉與網點背景，柔和的粉彩色調，夢幻浪漫氛圍，飄逸的長髮，細膩的情感表情，少女漫畫扉頁插圖質感",
  "prompt_en": "shoujo manga style, large sparkling eyes with star highlights, delicate elegant linework, floral and screentone background, soft pastel colors, dreamy romantic atmosphere, flowing hair, emotional expression, shoujo title page illustration, flower petals floating",
  "negative_prompt": "thick bold lines, dark gritty, muscular, photorealistic, 3d render, harsh shadows, low quality, blurry, extra fingers, deformed hands, text, watermark",
  "seo_title": "少女漫畫風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整少女漫畫風格 AI 提示詞教學，附中英文 Prompt、Negative Prompt、星光大眼與花卉網點關鍵詞拆解，教你做出浪漫夢幻的少女漫風格，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/shoujo-manga.webp",
  "related_styles": ["anime", "shonen-manga", "webtoon", "chibi", "retro-anime-80s", "watercolor"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["角色插畫", "言情小說封面", "同人創作", "社群貼文", "貼圖設計", "故事扉頁"],
  "mistakes": ["線條過粗失去纖細感", "眼睛缺乏星光顯呆滯", "配色過濃失去粉嫩感", "背景太空缺少花卉網點", "表情僵硬缺乏情感"],
  "prompt_breakdown": [{
    "term": "shoujo manga style",
    "effect": "鎖定少女漫畫的整體浪漫美術走向"
  }, {
    "term": "large sparkling eyes with star highlights",
    "effect": "強調佈滿星光的閃亮大眼，這是少女漫的標誌"
  }, {
    "term": "delicate elegant linework",
    "effect": "指定纖細優雅的線條，奠定柔美氣質"
  }, {
    "term": "floral and screentone background",
    "effect": "加入花卉與網點背景，還原扉頁插圖質感"
  }, {
    "term": "soft pastel colors",
    "effect": "鎖定柔和粉嫩的色調"
  }, {
    "term": "flower petals floating",
    "effect": "加入飄落花瓣，營造夢幻浪漫氛圍"
  }],
  "faq": [{
    "q": "少女漫畫在哪個 AI 工具效果最好？",
    "a": "Midjourney 對浪漫氛圍與粉彩質感還原最佳，Flux 線條纖細穩定，SD 配少女漫 LoRA 可控性高，GPT Image 適合對話迭代表情。"
  }, {
    "q": "為什麼眼睛不夠閃亮？",
    "a": "加上 large sparkling eyes with star highlights，明確指定星光與多層反光，少女漫的眼睛通常比一般動畫更大更亮。"
  }, {
    "q": "怎麼讓畫面更夢幻？",
    "a": "加上 flower petals floating、floral background、soft pastel colors，並用柔光與淡淡光暈包裹整體氛圍。"
  }, {
    "q": "線條太粗顯得不對怎麼辦？",
    "a": "把 thick bold lines 放進負面，正向強調 delicate elegant linework，少女漫的線條偏纖細飄逸。"
  }, {
    "q": "配色怎麼避免顯濁？",
    "a": "用 soft pastel colors 並避免過飽和，粉嫩、低彩度的色調最能營造少女氛圍。"
  }, {
    "q": "中文 prompt 和英文 prompt 哪個好？",
    "a": "英文對少女漫術語理解更準，建議英文為主、中文補充情緒與場景。"
  }, {
    "q": "怎麼做出扉頁插圖那種裝飾感？",
    "a": "加入 title page illustration、decorative frame、screentone，並讓花卉與裝飾元素環繞角色。"
  }, {
    "q": "適合做言情小說封面嗎？",
    "a": "非常適合，浪漫氛圍與細膩表情天生契合，建議預留書名排版空間並固定角色造型。"
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
      children: "少女漫畫的視覺語言，源自日本針對少女讀者發展出的一整套浪漫美學，核心是「用最纖細的線條與最閃亮的眼睛，捕捉最細微的心動」。它不追求動態或力量，而是極致地放大情感——一個臉紅、一次對視、一片飄落的花瓣，都能撐起整個畫面。理解這層精神很重要：當你下提示詞時，本質上是在請 AI 描繪一種「情緒被無限放大、氛圍被裝飾包裹」的纖美畫風，而不只是畫個大眼女孩。情感的細膩度，是少女漫的真正核心。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心可拆成三塊。第一是眼睛，", createVNode(_components.code, {
        children: "large sparkling eyes with star highlights"
      }), " 是少女漫最強烈的辨識特徵，瞳孔裡常有星光、多層反光與漸層，幾乎佔據臉部最大資訊量。第二是線條，", createVNode(_components.code, {
        children: "delicate elegant linework"
      }), " 偏纖細、飄逸，髮絲與衣褶都畫得輕盈優雅。第三是裝飾與氛圍，", createVNode(_components.code, {
        children: "floral and screentone background"
      }), " 配上 ", createVNode(_components.code, {
        children: "flower petals floating"
      }), " 與 ", createVNode(_components.code, {
        children: "soft pastel colors"
      }), "，營造扉頁插圖那種被花卉與光暈環繞的夢幻感。這三者缺一，少女漫的味道就會走樣。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格專精浪漫、悸動、純真與淡淡哀愁：校園戀愛、初戀心動、唯美告白、夢幻場景。它能承載細膩溫柔的情感張力，但不適合激烈打鬥、硬派寫實或陰暗題材——一旦線條變粗、色調變濁，少女漫的氣質就蕩然無存。做角色插畫或小說封面時，記得讓線條纖細、配色粉嫩，並用花卉與光暈把角色溫柔包覆。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對浪漫氛圍與粉彩質感的還原最佳，花瓣、光暈、柔光都很到位，短 prompt 就有唯美感，用 ", createVNode(_components.code, {
        children: "--ar 2:3"
      }), " 適配封面直幅。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在開源陣營線條纖細與構圖最穩，自然語言理解佳，飄逸髮絲掌握得好，但眼睛有時不夠閃，這時把 ", createVNode(_components.code, {
        children: "sparkling eyes"
      }), "、", createVNode(_components.code, {
        children: "star highlights"
      }), " 往前放、加重語氣。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（配少女漫風 LoRA）可控性最高，能精調眼睛大小與網點密度，建議 CFG 抓 5～7、負面寫滿 ", createVNode(_components.code, {
        children: "thick bold lines, dark gritty"
      }), "，並大量出圖挑表情最動人的一張。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代，先生一版再要「眼睛再亮一點」「加上飄落花瓣」「臉再紅一些」，對新手最友善，但細膩度略遜前三者。我的實務流程是：用 GPT Image 快速定角色與情緒，再拿到 Midjourney 或 SD 量產高品質終稿。"]
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

const url = "src/content/styles/shoujo-manga.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/shoujo-manga.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/shoujo-manga.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
