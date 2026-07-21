import { v as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';

const frontmatter = {
  "title": "黑色電影",
  "description": "高反差黑白光影、百葉窗陰影與低調打光，重現 1940 年代黑色電影的宿命氛圍。",
  "category": "realistic",
  "tags": ["黑色電影", "黑白", "高反差", "低調打光", "復古"],
  "difficulty": "medium",
  "prompt_zh": "黑色電影風格，高反差黑白攝影，低調打光，硬光單側光源，百葉窗條紋陰影，濃重的菸霧氛圍，1940 年代偵探片場景，深邃的暗部與明亮高光，雨夜街頭，戲劇性的明暗對比，膠片顆粒",
  "prompt_en": "film noir, high-contrast black and white, low-key lighting, hard single key light, venetian blind shadows, smoky atmosphere, 1940s detective scene, deep blacks and bright highlights, rain-soaked night street, dramatic chiaroscuro, film grain",
  "negative_prompt": "cartoon, illustration, painting, anime, color photo, flat lighting, soft pastel, oversaturated, modern clothing, deformed hands, blurry, low quality, watermark, text",
  "seo_title": "黑色電影風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整黑色電影 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、高反差黑白與低調打光拆解，教你用硬光、百葉窗陰影做出 1940 年代偵探片氛圍，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/film-noir.webp",
  "related_styles": ["cinematic", "photorealistic", "analog-film", "street-photography", "portrait-photography", "double-exposure"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["偵探角色海報", "復古劇照", "黑白人像", "唱片封面", "懸疑書封", "短片視覺參考"],
  "mistakes": ["反差不足顯得灰濛濛沒力道", "用了柔光失去硬光稜角", "誤加色彩破壞黑白基調", "服裝道具現代化失去年代感", "暗部死黑沒有層次細節"],
  "prompt_breakdown": [{
    "term": "film noir",
    "effect": "鎖定黑色電影的整體類型與年代美學"
  }, {
    "term": "high-contrast black and white",
    "effect": "高反差黑白是 noir 的視覺骨架，沒有它就不成立"
  }, {
    "term": "low-key lighting",
    "effect": "低調打光讓畫面大面積落入陰影，營造壓抑神祕"
  }, {
    "term": "hard single key light",
    "effect": "硬光單側光源製造銳利稜角與深邃陰影"
  }, {
    "term": "venetian blind shadows",
    "effect": "百葉窗條紋陰影是 noir 的招牌符號"
  }, {
    "term": "dramatic chiaroscuro",
    "effect": "強調明暗對比的明暗法，強化宿命與張力"
  }],
  "faq": [{
    "q": "黑色電影在哪個 AI 工具效果最好？",
    "a": "Midjourney 對高反差黑白與氛圍光最到位，Flux 光影層次穩定，GPT Image 適合用對話調整陰影與構圖。"
  }, {
    "q": "為什麼黑白照看起來灰灰的沒張力？",
    "a": "反差不足。加重 high-contrast、low-key lighting、deep blacks，並用硬光而非柔光。"
  }, {
    "q": "百葉窗陰影怎麼穩定生成？",
    "a": "明確寫 venetian blind shadows，並描述光源從窗外側射入，必要時提到光條落在臉上或牆上。"
  }, {
    "q": "可以做彩色的黑色電影嗎？",
    "a": "可以，叫 neo-noir，保留低調硬光與高反差，但允許霓虹冷色，把 black and white 換成 desaturated neon。"
  }, {
    "q": "黑色電影和一般黑白照差在哪？",
    "a": "noir 強調戲劇性的低調打光與明暗法，不是單純去飽和，光影本身就是敘事。"
  }, {
    "q": "怎麼避免暗部死黑沒細節？",
    "a": "加入 deep blacks with detail 或補一盞微弱補光描述，讓陰影裡仍保留輪廓層次。"
  }, {
    "q": "中文還是英文 prompt 比較準？",
    "a": "打光與類型術語英文最精準，建議以英文 low-key、chiaroscuro 等詞為主，中文輔助描述場景。"
  }, {
    "q": "怎麼維持系列劇照風格一致？",
    "a": "固定黑白、硬光與年代關鍵詞與 seed，Midjourney 可用 sref 鎖定整體視覺調性。"
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
      children: "黑色電影（Film Noir）誕生於 1940 至 50 年代的好萊塢，深受德國表現主義影響，是一種以光影本身為敘事工具的類型美學。它的世界觀是宿命、墮落與道德灰色地帶，視覺上則用大面積陰影與銳利高光，把這份壓抑與不安直接打在畫面上。對 AI 下這類提示詞時，你不是在描述「黑白照片」，而是在重建一整套打光哲學——光從哪來、留多少給陰影，比畫了什麼還重要。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心全壓在光上。最關鍵的是 ", createVNode(_components.code, {
        children: "high-contrast black and white"
      }), " 與 ", createVNode(_components.code, {
        children: "low-key lighting"
      }), "：noir 刻意讓畫面大半落入黑暗，只用少量硬光點亮關鍵區域，製造壓抑與神祕。光質一定要硬——", createVNode(_components.code, {
        children: "hard single key light"
      }), " 帶來銳利的明暗交界與深邃陰影，柔光會立刻瓦解那種稜角分明的張力。再來是招牌符號 ", createVNode(_components.code, {
        children: "venetian blind shadows"
      }), "，百葉窗條紋打在臉上或牆上，暗示囚禁與窺視。整體靠 ", createVNode(_components.code, {
        children: "dramatic chiaroscuro"
      }), "（明暗法）統合，並用 ", createVNode(_components.code, {
        children: "film grain"
      }), " 與菸霧、雨夜街景補足年代氛圍。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，noir 天生適合偵探、蛇蠍美人、犯罪、背叛與孤獨的故事，情緒偏向緊張、宿命與曖昧。它最適合角色海報、黑白人像、懸疑書封與唱片封面。要拍得對味，記得讓服裝道具回到 1940 年代——風衣、軟呢帽、老式電話，現代元素會立刻破功；同時別讓暗部死黑，保留一絲輪廓層次，畫面才有呼吸。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型差異如下。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對高反差黑白與氛圍最有感覺，短 prompt 就能出宿命味，用 ", createVNode(_components.code, {
        children: "--style raw"
      }), " 避免過度美化，比例可用 ", createVNode(_components.code, {
        children: "--ar 4:5"
      }), " 或 ", createVNode(_components.code, {
        children: "2.39:1"
      }), "。", createVNode(_components.strong, {
        children: "Flux"
      }), " 光影層次與構圖最穩，自然語言理解佳，適合精準控制硬光方向與百葉窗位置，偏灰時加重 ", createVNode(_components.code, {
        children: "high-contrast"
      }), "、", createVNode(_components.code, {
        children: "deep blacks"
      }), "。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 搭 noir 風 LoRA）可控性最高，CFG 抓 6～8、負面寫滿 ", createVNode(_components.code, {
        children: "color photo, flat lighting, soft pastel"
      }), "，並用黑白校正讓反差到位。", createVNode(_components.strong, {
        children: "GPT Image"
      }), " 強在對話迭代，能逐句要「陰影再重一點」「百葉窗光條打在臉上」「加點菸霧」，對氛圍微調最直覺，但極致顆粒與層次略遜前三者。實務上我常先用 GPT Image 定構圖與光向，再交給 Midjourney 或 Flux 出高質感終稿。"]
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

const url = "src/content/styles/film-noir.mdx";
const file = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/film-noir.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/film-noir.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
