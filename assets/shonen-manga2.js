import { v as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';

const frontmatter = {
  "title": "少年熱血漫畫",
  "description": "動感速度線、粗黑墨線與爆發張力，少年熱血漫畫的戰鬥質感。",
  "category": "anime",
  "tags": ["少年漫畫", "速度線", "熱血", "戰鬥"],
  "difficulty": "medium",
  "prompt_zh": "少年熱血漫畫風格，剛勁有力的粗黑墨線，動感速度線與爆炸效果，誇張的戰鬥動作姿勢，強烈的情緒表情，黑白網點上色，戲劇性的視角與分鏡，能量爆發的氣場特效",
  "prompt_en": "shonen manga style, bold dynamic ink linework, dramatic speed lines, explosive action pose, intense determined expression, screentone shading, high energy aura effects, low angle dramatic perspective, manga panel composition, motion impact lines",
  "negative_prompt": "soft pastel, delicate thin lines, calm static pose, photorealistic, 3d render, low quality, blurry, extra fingers, deformed hands, text, watermark, dull",
  "seo_title": "少年熱血漫畫風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整少年熱血漫畫風格 AI 提示詞教學，附中英文 Prompt、Negative Prompt、速度線與爆發特效關鍵詞拆解，教你做出動感戰鬥質感，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/shonen-manga.webp",
  "related_styles": ["anime", "shoujo-manga", "mecha", "cyberpunk-anime", "comic-book", "line-art"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["角色立繪", "戰鬥場面", "漫畫分鏡", "海報設計", "社群貼文", "同人創作"],
  "mistakes": ["線條太細失去力量感", "缺乏速度線顯靜態", "姿勢僵硬沒有張力", "視角平淡缺乏戲劇性", "特效不足能量感薄弱"],
  "prompt_breakdown": [{
    "term": "shonen manga style",
    "effect": "鎖定少年熱血漫畫的整體動感美術走向"
  }, {
    "term": "bold dynamic ink linework",
    "effect": "指定剛勁有力的粗黑墨線，奠定力量感"
  }, {
    "term": "dramatic speed lines",
    "effect": "加入速度線，營造高速動感"
  }, {
    "term": "explosive action pose",
    "effect": "指定誇張的爆發戰鬥姿勢"
  }, {
    "term": "high energy aura effects",
    "effect": "加入能量氣場特效，強化爆發張力"
  }, {
    "term": "low angle dramatic perspective",
    "effect": "用仰角戲劇視角放大氣勢"
  }],
  "faq": [{
    "q": "少年熱血漫畫在哪個 AI 工具效果最好？",
    "a": "Midjourney 對動感氛圍與墨線質感還原最強，Flux 構圖穩定，SD 配少年漫 LoRA 可控性高，GPT Image 適合對話調整姿勢。"
  }, {
    "q": "為什麼畫面顯得太靜態？",
    "a": "加上 dramatic speed lines、motion impact lines 與 explosive action pose，速度線是製造動感的關鍵。"
  }, {
    "q": "線條怎麼更有力量感？",
    "a": "強調 bold dynamic ink linework，少年漫的線條偏粗黑、有輕重變化，把 delicate thin lines 放進負面。"
  }, {
    "q": "怎麼放大角色氣勢？",
    "a": "用 low angle dramatic perspective 仰角構圖，並加上 high energy aura effects 能量氣場，氣場一出氣勢立刻翻倍。"
  }, {
    "q": "想要黑白漫畫感怎麼辦？",
    "a": "加上 screentone shading、black and white manga，少年漫原稿多為黑白網點，彩色版則保留強烈線條。"
  }, {
    "q": "中文 prompt 和英文 prompt 哪個好？",
    "a": "英文對少年漫術語理解更準，建議英文為主、中文補充動作與情緒。"
  }, {
    "q": "怎麼做出分鏡頁面感？",
    "a": "加入 manga panel composition、dynamic panel layout，把多格分鏡與對角線構圖納入畫面。"
  }, {
    "q": "適合做活動海報嗎？",
    "a": "非常適合，爆發張力天生有視覺衝擊力，建議用仰角構圖把主角放大並預留標題空間。"
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
      children: "少年熱血漫畫的視覺語言，源自《週刊少年JUMP》一脈「努力、友情、勝利」的敘事傳統，核心是「用最動感的線條與最誇張的張力，點燃讀者的熱血」。它不講究纖細優雅，而是把力量、速度與情緒推到極致——一拳、一吼、一道能量氣場，都要畫得讓人腎上腺素飆升。理解這層精神很重要：當你下提示詞時，本質上是在請 AI 製造一種「動態被無限放大、氣勢直衝畫面外」的爆發感，而不只是畫個擺姿勢的角色。張力與動感，才是少年漫的命脈。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心可拆成三塊。第一是墨線，", createVNode(_components.code, {
        children: "bold dynamic ink linework"
      }), " 偏粗黑、有強烈的輕重變化，輪廓乾脆俐落，這是力量感的基礎。第二是動感特效，", createVNode(_components.code, {
        children: "dramatic speed lines"
      }), " 與 ", createVNode(_components.code, {
        children: "motion impact lines"
      }), " 製造高速衝擊，搭配 ", createVNode(_components.code, {
        children: "explosive action pose"
      }), " 把肢體拉到誇張的爆發姿勢。第三是氣勢，", createVNode(_components.code, {
        children: "high energy aura effects"
      }), " 替角色加上能量氣場，再用 ", createVNode(_components.code, {
        children: "low angle dramatic perspective"
      }), " 仰角構圖把主角放大到天，氣勢瞬間翻倍。原稿常用 ", createVNode(_components.code, {
        children: "screentone shading"
      }), " 黑白網點來補光影。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格專精熱血、激昂、決心與爆發：戰鬥對決、必殺技釋放、覺醒瞬間、熱血宣言。它能承載強烈的動感與情緒張力，但不適合靜謐治癒或纖細浪漫的題材——一旦線條變細、姿勢變靜，少年漫的熱血就洩了氣。做戰鬥場面或角色立繪時，記得用粗黑墨線、誇張姿勢與速度線，並善用仰角與對角線構圖製造衝擊。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對動感氛圍與墨線質感的還原最強，速度線、能量特效都很到位，短 prompt 就有衝擊力，用 ", createVNode(_components.code, {
        children: "--ar 2:3"
      }), " 或 ", createVNode(_components.code, {
        children: "--ar 16:9"
      }), " 視構圖選擇。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在開源陣營構圖與線條最穩，自然語言理解佳，複雜動作不易崩，但氣場特效有時偏弱，這時把 ", createVNode(_components.code, {
        children: "aura effects"
      }), "、", createVNode(_components.code, {
        children: "speed lines"
      }), " 往前放、加重語氣。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（配少年漫風 LoRA）可控性最高，能精調墨線粗細與網點，建議 CFG 抓 6～8、負面寫滿 ", createVNode(_components.code, {
        children: "soft pastel, calm static pose"
      }), "，並大量出圖挑姿勢最有張力的一張。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代，先生一版再要「姿勢再誇張」「加上速度線」「視角壓低一點」，對新手最友善，但細膩度略遜前三者。我的實務流程是：用 GPT Image 快速定姿勢與構圖，再拿到 Midjourney 或 SD 量產高品質終稿。"]
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

const url = "src/content/styles/shonen-manga.mdx";
const file = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/shonen-manga.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/harry/Documents/Astro/harryfan.github.io/src/content/styles/shonen-manga.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
