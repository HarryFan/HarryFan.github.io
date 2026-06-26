import { l as createVNode, H as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "卡通渲染 Cel Shading",
  "description": "用色塊取代漸層、加上乾淨描邊的 3D 卡通渲染，讓立體模型看起來像會動的手繪動畫。",
  "category": "game",
  "tags": ["卡通渲染", "CelShading", "3D動畫", "描邊", "平塗陰影"],
  "difficulty": "medium",
  "prompt_zh": "卡通渲染風格 cel shading，3D 模型搭配平塗的色塊陰影，乾淨的黑色描邊輪廓，鮮明的亮暗分界，飽和的色彩，類似罪惡裝備與龍珠電玩的視覺，硬邊陰影，動漫感的卡通著色，非寫實渲染",
  "prompt_en": "cel shading, toon shading, 3d model with flat color shading, hard-edged cel shadows, clean black outline, bold ink lines, anime style render, vibrant saturated colors, two-tone shading, non-photorealistic rendering NPR, Guilty Gear style",
  "negative_prompt": "photorealistic, soft gradient shading, smooth shading, realistic lighting, blurry, no outline, 2d flat sketch, text, watermark, painterly, muddy colors",
  "seo_title": "卡通渲染 Cel Shading 風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整 Cel Shading 卡通渲染 AI 提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用平塗色塊、硬邊陰影與描邊做出罪惡裝備式 NPR 質感，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/cel-shading.webp",
  "related_styles": ["genshin-style", "arcane-style", "anime", "mecha", "blender-3d", "fantasy-rpg-art"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["遊戲角色立繪", "戰鬥動作場景", "動漫風海報", "吉祥物渲染", "概念角色設計", "社群貼文"],
  "mistakes": ["陰影做成漸層失去色塊感", "缺少描邊看起來像普通3D", "亮暗分界太多顯得雜亂", "色彩飽和度不足顯灰", "把寫實光照混進來破壞卡通感"],
  "prompt_breakdown": [{
    "term": "cel shading",
    "effect": "鎖定整體 3D 卡通渲染的核心關鍵詞，等同 toon shading"
  }, {
    "term": "flat color shading",
    "effect": "指定平塗色塊陰影，避免模型用寫實漸層"
  }, {
    "term": "hard-edged cel shadows",
    "effect": "強調陰影的硬邊分界，這是卡通渲染的靈魂"
  }, {
    "term": "clean black outline",
    "effect": "加上乾淨的黑色描邊輪廓，強化手繪動畫感"
  }, {
    "term": "two-tone shading",
    "effect": "限制成亮暗兩階色塊，讓畫面乾淨不雜亂"
  }, {
    "term": "non-photorealistic rendering NPR",
    "effect": "點明非寫實渲染管線，鎖定整體美術方向"
  }],
  "faq": [{
    "q": "Cel Shading 在哪個 AI 工具效果最好？",
    "a": "Midjourney 對描邊與色塊分界最直覺，Flux 線條乾淨穩定，GPT Image 適合對話調整光影分界。"
  }, {
    "q": "Cel Shading 和一般動漫風差在哪？",
    "a": "動漫風常是 2D 平面繪製，Cel Shading 是 3D 模型用平塗著色與描邊「偽裝成」手繪動畫，兼具立體與卡通感。"
  }, {
    "q": "為什麼陰影變成柔和漸層？",
    "a": "把 soft gradient shading、smooth shading 放進 Negative Prompt，並在正向強調 hard-edged cel shadows、two-tone。"
  }, {
    "q": "怎麼做出罪惡裝備那種電玩質感？",
    "a": "直接寫 Guilty Gear style 搭配 NPR、bold ink lines 與 vibrant saturated colors，會非常接近。"
  }, {
    "q": "描邊怎麼控制粗細？",
    "a": "用 clean black outline 或 thick ink outline 描述粗細，Stable Diffusion 可搭配 NPR LoRA 微調線寬。"
  }, {
    "q": "中文 prompt 還是英文好？",
    "a": "英文對 cel shading、NPR 等術語理解更準，建議英文為主、中文補充角色與動作。"
  }, {
    "q": "適合做遊戲角色立繪嗎？",
    "a": "非常適合，亮暗分明的色塊讓角色辨識度高，動作場景張力強，是動作遊戲與動漫手遊的常見選擇。"
  }, {
    "q": "為什麼看起來像普通 3D 渲染？",
    "a": "多半是缺少描邊與硬邊陰影，加上 clean black outline 與 hard-edged cel shadows，立刻變成卡通著色。"
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
      children: ["卡通渲染（Cel Shading，又稱 toon shading）的名字來自傳統動畫的賽璐珞片（cel）。手繪動畫時，畫師會在透明賽璐珞上塗滿平整的色塊，陰影是一塊一塊明確切出來的，而非連續漸層。當 3D 技術成熟後，工程師反過來思考：能不能讓立體模型「渲染得像手繪」？於是非寫實渲染（", createVNode(_components.code, {
        children: "NPR, non-photorealistic rendering"
      }), "）誕生。", createVNode(_components.code, {
        children: "Jet Set Radio"
      }), "、", createVNode(_components.code, {
        children: "罪惡裝備 Guilty Gear"
      }), "、", createVNode(_components.code, {
        children: "七龍珠電玩"
      }), " 把這套語彙推到極致。理解這層由來很重要——下提示詞時，你不是要一張寫實 3D 圖，而是請 AI 模擬「3D 立體結構 + 2D 平塗著色 + 描邊」這套刻意反寫實的渲染管線。"]
    }), "\n", createVNode(_components.p, {
      children: ["技術核心有兩塊撐起 Cel Shading 的辨識度。第一是", createVNode(_components.strong, {
        children: "平塗色塊陰影"
      }), "，關鍵詞 ", createVNode(_components.code, {
        children: "flat color shading"
      }), "、", createVNode(_components.code, {
        children: "hard-edged cel shadows"
      }), "、", createVNode(_components.code, {
        children: "two-tone shading"
      }), " 會把連續的光影量化成幾個明確階層，亮面就是亮面、暗面就是暗面，中間有一條清楚的分界線；這正是它跟寫實渲染最大的差別。第二是", createVNode(_components.strong, {
        children: "描邊"
      }), "，", createVNode(_components.code, {
        children: "clean black outline"
      }), "、", createVNode(_components.code, {
        children: "bold ink lines"
      }), " 沿著模型輪廓與結構線勾勒，讓立體物體瞬間有手繪動畫的線稿感。兩者缺一不可——沒色塊會太寫實，沒描邊則少了動畫味。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合張力強、節奏快、辨識度高的內容：動作遊戲角色、戰鬥場景、動漫手遊立繪、機甲對決。它能承載熱血、酷炫與戲劇化的情緒，但不擅長細膩寫實的氛圍敘事。做角色立繪時建議限制成兩到三階色塊，避免分界過多顯得雜亂，並用飽和色彩強化卡通感。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對描邊與色塊分界的還原最直覺，短 prompt 就有 ", createVNode(_components.code, {
        children: "Guilty Gear"
      }), " 那種質感，鎖系列風格時固定 ", createVNode(_components.code, {
        children: "--seed"
      }), "、用 ", createVNode(_components.code, {
        children: "--ar 2:3"
      }), " 做立繪，並可降低 ", createVNode(_components.code, {
        children: "--stylize"
      }), " 避免太繪畫化。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在開源陣營裡線條最乾淨穩定，對長句理解佳，適合描述具體姿勢與光源方向，但偶爾會偷偷加漸層，這時把 ", createVNode(_components.code, {
        children: "hard-edged"
      }), "、", createVNode(_components.code, {
        children: "flat shading"
      }), " 往前放並加重。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配 NPR/cel LoRA）可控性最高，能精準調描邊粗細與色階數，建議 CFG 抓 6～8、負面寫滿 ", createVNode(_components.code, {
        children: "soft gradient, smooth shading, realistic lighting"
      }), "。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代，可以邊生邊要「陰影分界更硬」「描邊加粗」「光從左上打」，對新手最友善，但描邊一致性略遜前三者。實務上常先用 GPT Image 定角色與光向，再拿到 Midjourney 或 Flux 量產高品質終稿。"]
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

const url = "src/content/styles/cel-shading.mdx";
const file = "C:/Users/GS/Documents/Astro/HarryFan.github.io/src/content/styles/cel-shading.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/GS/Documents/Astro/HarryFan.github.io/src/content/styles/cel-shading.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
