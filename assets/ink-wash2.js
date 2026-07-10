import { n as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "title": "中國水墨風格",
  "description": "墨色濃淡、留白意境與飛白筆觸，傳統中國水墨畫的東方寫意美學。",
  "category": "illustration",
  "tags": ["中國水墨", "國畫", "寫意", "留白意境"],
  "difficulty": "hard",
  "prompt_zh": "中國水墨畫風格，墨色濃淡層次的渲染，宣紙上的飛白與暈染筆觸，大面積留白意境，寫意而非寫實，單色水墨為主點綴淡彩，毛筆勾勒的線條，山水或花鳥題材，禪意空靈的氛圍，傳統東方構圖",
  "prompt_en": "traditional Chinese ink wash painting, sumi-e, gradient ink tones, dry brush and wet wash strokes on rice paper, large negative space, freehand xieyi style, monochrome ink with subtle color accents, brush calligraphy lines, shan shui landscape, zen ethereal atmosphere, oriental composition",
  "negative_prompt": "photorealistic, 3d render, oil painting, vibrant colors, hard outline, western style, cluttered, hyperdetailed, low quality, blurry, text, watermark, anime",
  "seo_title": "中國水墨風格提示詞｜ChatGPT、Midjourney、Flux 完整教學",
  "seo_description": "完整中國水墨畫風格 AI 提示詞教學，附中英文 Prompt、Negative Prompt、關鍵詞拆解與常見錯誤，教你用墨色濃淡、飛白筆觸與留白意境做出東方寫意畫，適用 ChatGPT、Midjourney、Flux、SD。",
  "cover_image": "/styles/ink-wash.webp",
  "related_styles": ["ukiyo-e", "watercolor", "line-art", "art-nouveau", "gouache", "childrens-book"],
  "pubDate": "2026-06-25T00:00:00.000Z",
  "updated_at": "2026-06-25T00:00:00.000Z",
  "featured": false,
  "models": ["GPT Image", "Midjourney", "Flux", "Stable Diffusion"],
  "use_cases": ["山水畫", "花鳥插圖", "茶藝品牌", "書封設計", "文創包裝", "空間掛畫"],
  "mistakes": ["墨色缺乏濃淡層次顯得平板", "留白不足失去意境", "線條太硬不像毛筆", "加入過多鮮豔色彩破壞素雅", "構圖太滿沒有呼吸感"],
  "prompt_breakdown": [{
    "term": "traditional Chinese ink wash painting",
    "effect": "鎖定中國水墨畫的核心美術風格關鍵詞"
  }, {
    "term": "gradient ink tones",
    "effect": "強調墨色濃淡層次，是水墨韻味的核心"
  }, {
    "term": "dry brush and wet wash strokes",
    "effect": "指定飛白與暈染筆觸，模擬毛筆在宣紙的效果"
  }, {
    "term": "large negative space",
    "effect": "大面積留白營造意境，是東方美學的關鍵"
  }, {
    "term": "freehand xieyi style",
    "effect": "寫意而非寫實，捕捉神韻而非細節"
  }, {
    "term": "rice paper texture",
    "effect": "宣紙紋理讓墨色暈染更自然真實"
  }],
  "faq": [{
    "q": "水墨風格在哪個 AI 工具效果最好？",
    "a": "Midjourney 對墨色暈染與留白意境最有感覺，Flux 構圖穩定，GPT Image 最適合用對話調整濃淡與留白。"
  }, {
    "q": "為什麼墨色看起來平板沒層次？",
    "a": "強調 gradient ink tones、ink wash gradation，並用 dry brush 與 wet wash 製造濃淡對比，避免單一灰度。"
  }, {
    "q": "如何做出宣紙暈染的效果？",
    "a": "加入 rice paper texture、wet wash、ink bleeding，模擬墨在宣紙上自然擴散的韻味。"
  }, {
    "q": "水墨風格可以商用嗎？",
    "a": "風格本身不受著作權保護，適合文創與品牌，但建議確認模型授權並避免重現特定畫家作品。"
  }, {
    "q": "為什麼意境出不來？",
    "a": "留白是關鍵。強調 large negative space、minimalist composition，少即是多，避免畫面填滿。"
  }, {
    "q": "可以加顏色嗎？",
    "a": "可以但要克制。用 subtle color accents 點綴淡彩，主體仍以墨色為主，避免高飽和破壞素雅。"
  }, {
    "q": "為什麼線條太硬不像毛筆？",
    "a": "強調 brush calligraphy lines、varied brush pressure，模擬毛筆提按的粗細變化，避免機械式硬邊。"
  }, {
    "q": "中文還是英文 prompt 比較好？",
    "a": "英文模型理解較精準，但水墨概念建議中英並用，中文補充寫意、留白等東方意境。"
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
      children: "中國水墨畫是東方美學的極致體現，它與西方繪畫最根本的差異在於「寫意」而非「寫形」。畫家追求的不是物件的逼真再現，而是神韻與氣韻的傳達——「外師造化，中得心源」。一筆墨可以是山，可以是水，留白處可以是雲，可以是無盡的天地。這種以虛代實、計白當黑的哲學，正是水墨最難也最迷人的地方。當你下提示詞時，本質上是在請 AI 模擬「文人提筆在宣紙上揮灑墨韻」的結果，而這恰恰是生成模型最不擅長的——它太愛填滿、太愛細節。"
    }), "\n", createVNode(_components.p, {
      children: ["技術核心在於墨色與留白。", createVNode(_components.code, {
        children: "gradient ink tones"
      }), " 是靈魂，水墨講究「墨分五色」——焦、濃、重、淡、清，沒有層次的墨色就是死墨。搭配 ", createVNode(_components.code, {
        children: "dry brush and wet wash strokes"
      }), "，飛白表現枯筆的蒼勁、暈染表現濕墨的潤澤，兩者對比才有韻味；再加 ", createVNode(_components.code, {
        children: "rice paper texture"
      }), " 讓墨在宣紙上自然滲化。但真正決定成敗的是 ", createVNode(_components.code, {
        children: "large negative space"
      }), "——留白不是空，而是意境的載體，這也是最需要刻意對抗模型「填滿傾向」的地方。"]
    }), "\n", createVNode(_components.p, {
      children: "題材上，水墨最適合山水、花鳥、竹石、人物等傳統母題，情緒應追求空靈、禪意、清雅。它能承載沉靜悠遠的東方氣質，卻不適合喧鬧、科技或高飽和的主題——一旦色彩濃豔、構圖擁擠，水墨的素雅本質就崩解了。實作時記得讓墨色有濃淡呼吸、構圖大膽留白，並用毛筆線條的提按變化取代生硬的描邊。"
    }), "\n", createVNode(_components.p, {
      children: ["各模型實戰差異值得分開談。", createVNode(_components.strong, {
        children: "Midjourney"
      }), " 對墨色暈染與意境氛圍最有靈氣，短 prompt 就能抓到韻味，但要把 ", createVNode(_components.code, {
        children: "--no vibrant color, hard outline"
      }), " 寫進負面，避免它加西畫光影。", createVNode(_components.strong, {
        children: "Flux"
      }), " 構圖與留白控制最穩，自然語言理解佳，適合描述複雜山水佈局，但偶爾偏寫實，記得把 ", createVNode(_components.code, {
        children: "ink wash"
      }), "、", createVNode(_components.code, {
        children: "xieyi"
      }), " 往前放、加重語氣。", createVNode(_components.strong, {
        children: "Stable Diffusion"
      }), "（SDXL 配水墨 LoRA）可控性最高，能靠 LoRA 細調墨韻，建議 CFG 抓 5～7、負面寫滿 ", createVNode(_components.code, {
        children: "oil painting, vibrant, photorealistic"
      }), "，多張挑墨色層次最自然的一張。", createVNode(_components.strong, {
        children: "ChatGPT 的 GPT Image"
      }), " 強在對話迭代，先生一版再要「左上多留白」「墨色再淡一點」，對不熟參數者最友善，但暈染的隨機韻味略遜前三者。我的流程是用 GPT Image 定構圖與意境，再到 Midjourney 或 SD 追求最地道的墨韻終稿。"]
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

const url = "src/content/styles/ink-wash.mdx";
const file = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/ink-wash.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gangshuanfan/Documents/Astro/HarryFan.github.io/src/content/styles/ink-wash.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
