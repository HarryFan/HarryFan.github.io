import { l as createVNode, H as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "皮克斯風格",
  "description": "圓潤造型、柔和全域光與細膩次表面散射，皮克斯 3D 動畫的溫暖質感。",
  "category": "illustration",
  "tags": ["皮克斯", "3D動畫", "角色設計", "渲染"],
  "difficulty": "medium",
  "prompt_zh": "皮克斯 3D 動畫風格，柔和的全域光照明，圓潤討喜的造型，誇張而有表情的角色，皮膚帶次表面散射質感，電影感淺景深，明亮飽和的色彩，乾淨的卡通渲染",
  "prompt_en": "Pixar 3D animation, soft global illumination, expressive stylized characters, subsurface scattering skin, rounded forms, cinematic depth of field, vibrant colors, clean studio render, big expressive eyes, appealing character design",
  "negative_prompt": "photorealistic, 2d flat, anime, sketch, low quality, blurry, extra fingers, deformed hands, text, watermark, dull colors, harsh shadows",
  "seo_title": "皮克斯風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整皮克斯 3D 風格 AI 圖片提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用全域光、次表面散射、圓潤造型做出討喜角色，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/pixar.webp",
  "related_styles": ["ghibli", "makoto-shinkai", "watercolor", "pixel-art", "clay", "anime"],
  "pubDate": "2026-06-23T00:00:00.000Z",
  "updated_at": "2026-06-23T00:00:00.000Z",
  "featured": true,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["角色頭像", "吉祥物設計", "海報", "繪本插圖", "社群貼文", "產品擬人化"],
  "mistakes": ["造型不夠圓潤顯得僵硬", "光線太硬失去柔和感", "皮膚缺乏次表面散射顯塑膠感", "角色比例寫實導致不討喜", "背景過於複雜搶走主體"],
  "prompt_breakdown": [{
    "term": "Pixar 3D animation",
    "effect": "鎖定整體皮克斯 3D 渲染美術風格的核心關鍵詞"
  }, {
    "term": "soft global illumination",
    "effect": "營造柔和的全域光環境，避免死黑陰影"
  }, {
    "term": "subsurface scattering skin",
    "effect": "讓皮膚呈現透光的真實質感而非塑膠感"
  }, {
    "term": "rounded forms",
    "effect": "指定圓潤造型，這是討喜角色的關鍵"
  }, {
    "term": "cinematic depth of field",
    "effect": "加入電影感淺景深，突出主體並虛化背景"
  }, {
    "term": "big expressive eyes",
    "effect": "放大眼睛與表情，強化角色親和力"
  }],
  "faq": [{
    "q": "皮克斯風格在哪個 AI 工具效果最好？",
    "a": "Midjourney 對 3D 渲染質感與材質的還原最直覺，Flux 細節穩定，GPT Image 最適合用對話迭代角色造型。"
  }, {
    "q": "為什麼角色看起來像廉價塑膠玩具？",
    "a": "缺少次表面散射與柔光。加入 subsurface scattering、soft global illumination，並避免單一硬光源。"
  }, {
    "q": "如何讓角色更討喜？",
    "a": "強調 rounded forms、big expressive eyes、appealing character design，並把比例往可愛方向誇張，頭大身小通常更討喜。"
  }, {
    "q": "皮克斯風格可以商用嗎？",
    "a": "風格本身不受著作權保護，但避免直接重現特定電影角色，並確認所用模型的授權條款。"
  }, {
    "q": "為什麼生出來偏寫實照片感？",
    "a": "把 photorealistic 放進 Negative Prompt，並在正向加強 stylized、cartoon render、Pixar style。"
  }, {
    "q": "適合做品牌吉祥物嗎？",
    "a": "非常適合，圓潤造型與高親和力天生適合吉祥物，建議固定 seed 與角色描述以維持多視角一致。"
  }, {
    "q": "中文 prompt 和英文 prompt 哪個好？",
    "a": "多數模型對英文理解更精準，建議以英文為主、中文輔助說明情緒與構圖。"
  }, {
    "q": "怎麼讓多張角色圖風格一致？",
    "a": "固定同一組造型與材質關鍵詞與 seed，Midjourney 可用 character reference（cref）鎖定同一角色。"
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
      children: "皮克斯的視覺語言是一整套工業化的 3D 動畫美學，背後是三十多年技術與藝術的累積。它並不追求把人物做得跟真人一樣，而是刻意在「可信」與「討喜」之間取得平衡——這就是業界常說的 appeal。造型上偏好圓潤的曲面、飽滿的體積與略微誇張的比例，反派常用尖銳稜角、正派多用柔和弧線。理解這層設計哲學很重要，因為你下提示詞時，本質上是在請 AI 模擬一套「物理算得很準、但造型刻意卡通化」的渲染結果，而不是套一個 3D 濾鏡。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心有兩塊撐起皮克斯的質感。第一是光照：皮克斯大量使用全域光（global illumination）與柔和的補光，場景幾乎沒有純黑的死陰影，光會在牆面、地板之間反覆彈射，營造溫暖通透的氛圍。所以 ", createVNode(_components.code, {
        children: "soft global illumination"
      }), " 幾乎是必備關鍵詞，它能把畫面從生硬的單光源推向柔和的環境光。第二是材質，尤其是 ", createVNode(_components.code, {
        children: "subsurface scattering skin"
      }), "——光線穿入皮膚再散射出來，耳朵、鼻翼、手指邊緣會透出淡淡紅光，這是區分「真實角色」與「塑膠玩具」的關鍵。再配上 ", createVNode(_components.code, {
        children: "cinematic depth of field"
      }), " 製造淺景深，畫面立刻有電影鏡頭感。"]
    }), "\n", createVNode(_components.p, {
      children: "題材與情緒上，這個風格最適合溫暖、幽默、帶童趣的敘事：擬人化的小動物、家庭情感、冒險夥伴、產品吉祥物。它能承載溫馨與輕快的喜劇感，但不太適合冷硬的賽博龐克或寫實恐怖。做頭像、繪本插圖或品牌吉祥物時，記得讓主體單純、背景留白，並善用淺景深把焦點鎖在角色臉上。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型的實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對 3D 渲染質感最直覺，材質、毛髮、次表面散射的還原很到位，通常短 prompt 就有味道；維持同一角色多視角時用 ", createVNode(_components.code, {
        children: "--cref"
      }), " 搭配固定 ", createVNode(_components.code, {
        children: "--seed"
      }), "，並以 ", createVNode(_components.code, {
        children: "--ar 16:9"
      }), " 鎖比例。", createVNode(_components.strong, {
        children: "Flux"
      }), " 在開源陣營裡細節與構圖最穩，對長句自然語言理解佳，圓潤造型與柔光掌握得好，但偶爾偏寫實，這時把 ", createVNode(_components.code, {
        children: "stylized"
      }), "、", createVNode(_components.code, {
        children: "cartoon render"
      }), " 往前放、加重語氣。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配 Pixar 風 LoRA）可控性最高，能靠 LoRA 權重與負面提示細調，建議 CFG 抓 5～7、負面寫滿 ", createVNode(_components.code, {
        children: "photorealistic, 2d flat"
      }), "，並用較高張數挑選表情最自然的一張。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代——先生一版，再用自然語言要「眼睛再大一點」「光線更暖」「背景虛化多一些」，對不熟參數的人最友善，但細膩度與一致性略遜前三者。我的實務流程是：先用 GPT Image 快速定角色造型與情緒，再拿到 Midjourney 或 Flux 量產高品質終稿。"]
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

const url = "src/content/styles/pixar.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/pixar.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/pixar.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
