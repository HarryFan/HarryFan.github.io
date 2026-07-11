---
title: '零 3D 檔案，用幾何基元拼一支會滾動的 AirPods Pro 旗艦頁'
description: '我做了一頁 AirPods Pro 概念旗艦官網，整支耳機和充電盒沒有任何 .glb 模型檔，全部用 Three.js 的球體、膠囊、圓角盒即時算出來。這篇拆三件事：怎麼用幾何基元拼出可辨識的產品、滾動怎麼刮擦一條相機時間軸做六幕運鏡，以及一個所有中文開發者都會踩、英文教學卻從不提的斷字爆版坑。'
pubDate: 2026-07-11
category: 'frontend'
heroImage: '/blog/2026-07-11-threejs-airpods-pro-flagship-3d.png'
tags: ['Three.js', 'GSAP', 'ScrollTrigger', '3D', '前端筆記']
---

上週手癢做了一頁 AirPods Pro 的概念旗艦官網：滾動時鏡頭在耳機周圍連續運鏡，六幕一鏡到底，白色塑料透著蘋果那種光。做完最爽的一點：**整支耳機、整個充電盒，沒有任何一個 `.glb` 模型檔**，全部用 Three.js 的基礎幾何體即時算出來。

這篇把三件我覺得最值得講的事拆開：用幾何基元拼產品、滾動怎麼驅動相機、以及一個踩到會很痛的中文斷字坑。

## 一、零 GLB：用國中幾何拼一支 AirPods

一般做 3D 產品頁，流程是開 Blender 建模、匯出 glb、載進來。我偏不想碰美術工具，就想試試看純程式碼能不能拼出「一眼認得出是 AirPods」的東西。

答案是可以，而且大概 50 行。一顆耳機拆解成：壓扁的球體當蛋形機身、膠囊體當耳柄、半透明球體當矽膠耳塞、圓片當揚聲器網孔。關鍵是用一個 `bud` 子群組把機身跟耳塞整個「後仰 0.3 弧度」，那個招牌傾角就出來了：

```javascript
function makeEarbud(dir) {
  const g = new THREE.Group();
  const bud = new THREE.Group();
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.42, 72, 56), whiteMat);
  body.scale.set(0.96, 1.14, 0.9);              // 球體壓成蛋形
  bud.add(body);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.31, 56, 40), tipMat);
  tip.scale.set(0.8, 0.58, 0.8);
  tip.position.set(0.0, 0.42, -0.04);
  bud.add(tip);
  bud.rotation.x = 0.3;                          // 整顆後仰 = iconic 角度
  g.add(bud);
  const stem = new THREE.Mesh(new THREE.CapsuleGeometry(0.132, 0.62, 14, 28), whiteMat);
  stem.position.set(0.02 * dir, -0.5, 0.06);
  g.add(stem);
  return g;
}
```

`dir` 參數傳 `1` / `-1` 就左右鏡像出一對，順便翻轉不對稱的細節。

有趣的是這支耳機我改了兩版。第一版耳塞直接坐在機身正上方、沒傾角，看起來就是「兩顆球疊在一起」的玩具。第二版才引入 `bud` 子群組整體後仰、把耳塞縮小內嵌到機身後上方、加上朝鏡頭的金屬網孔。**同樣的基元，靠階層跟旋轉軸重組，讀起來就從玩具變成產品。** 這件事我印象很深：3D 的細節不在多，在階層跟角度。

![我把一顆球、一個膠囊、一個圓角盒拼成一支耳機，完全不用 .glb 模型檔](/blog/2026-07-11-threejs-airpods-pro-flagship-3d-chuangzai.png)

充電盒也是。第一版用 `BoxGeometry`，直角，塑膠感很重。第二版換 `RoundedBoxGeometry` 圓角盒。圓角幾乎是蘋果工業設計的靈魂，一行 API 換掉就對了。但我留了一個防呆：

```javascript
function roundedBox(w, h, d, r) {
  if (RoundedBoxGeometry) {
    return new RoundedBoxGeometry(w, h, d, 6, r);
  }
  return new THREE.BoxGeometry(w, h, d, 4, 4, 4);  // addon 沒載進來就降級，不崩
}
```

`RoundedBoxGeometry` 是 Three.js 的 addon，動態載入偶爾會失手。與其讓它成為單點失效整頁黑掉，不如退回普通盒子，難看但活著。

### 反光不是靠加燈，是靠環境貼圖

白色塑料要有蘋果那種「透亮感」，我一開始的直覺是狂加點光源，結果越加越假。真正的解法是 IBL（影像照明）：用 `RoomEnvironment` 生一個程序化環境，經 `PMREMGenerator` 預過濾成環境貼圖，餵給 `scene.environment` 當全場景的反射來源。材質用 `MeshPhysicalMaterial` 開清漆層（clearcoat）：

```javascript
const pmrem = new THREE.PMREMGenerator(renderer);
const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
scene.environment = envRT.texture;              // 全場景反射來源
renderer.toneMapping = THREE.ACESFilmicToneMapping;
const whiteMat = new THREE.MeshPhysicalMaterial({
  color: 0xf6f6f7, roughness: 0.28, metalness: 0.0,
  clearcoat: 1.0, clearcoatRoughness: 0.18,     // 透亮清漆層
  sheen: 0.4, sheenColor: new THREE.Color(0xffffff),
});
```

塑料看起來假，通常不是燈不夠，是「表面沒有東西可以反射」。給它一個環境，它自己就亮了。

## 二、滾動敘事：一條被刮擦的時間軸

六幕運鏡我沒有用六個獨立的 ScrollTrigger，那樣幕跟幕之間會跳。核心設計是一個原則：**不直接改 3D 物件，改一個叫 `cam` 的純資料物件。**

```javascript
const cam = { px:0, py:0.42, pz:6.8, spin:0, darken:0, ripple:0, caseY:-3.2 };
const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
tl.to(cam, { pz: 4.5, py: 0.28, spin: 0.35, duration: 0.16 });            // Act1 推近
tl.to(cam, { px: 0.55, pz: 4.05, spin: 0.35 + TWO_PI, duration: 0.18 });  // Act2 轉滿一圈
tl.to(cam, { px: 0.85, py: 0.02, pz: 2.55, darken: 1, ripple: 1, duration: 0.21 }); // Act3 ANC 貼近

ScrollTrigger.create({
  trigger: ".cinema", start: "top top", end: "bottom bottom",
  scrub: 1, animation: tl,
  onUpdate: (self) => updateActs(acts, self.progress),  // 3D 跟 HTML 疊字共用同一個進度
});
```

GSAP 時間軸每一段 tween 動的都是 `cam` 裡的數字。ScrollTrigger 的 `scrub` 把滾動進度映射到時間軸的播放頭。然後有一個獨立的 `render()` 迴圈，每一格才把 `cam` 的值套到相機位置、模型旋轉、背景色、漣漪材質上。

這種「**動畫狀態跟渲染解耦**」的好處是：滾動運鏡、緩動、還有時間驅動的待機呼吸動畫（耳機輕輕上下浮）可以疊加，互不打架。滾動控制 `cam.spin` 的目標值，`render()` 裡再加一個 `Math.sin(t)` 的呼吸，兩者相加就是最終姿態。

還有一個小細節：Lenis 的平滑滾動要把它的 `raf` 交給 GSAP 的 ticker，而不是自己跑一套 `requestAnimationFrame`：

```javascript
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

兩套 rAF 各跑各的，畫面會微微打架、掉幀。統一時鐘來源之後就順了。

## 三、中文斷字的坑：GSAP 逐字動畫為什麼會爆版

這是整個專案我最想寫的一段，因為幾乎每個做中文文字動畫的人都會踩，但英文教學從來不提。

逐字上浮的標題動畫，網路上的做法通常是先 `text.split(/(\s+)/)` 按空格切詞、把每個詞包成 `white-space: nowrap` 的 `.word`，避免單字被拆兩半。這在英文沒問題。但中文整句沒有空格，於是一整句話被當成「一個 nowrap 的詞」，窄螢幕直接爆版溢出。

我的修法是改成逐字元掃描，用 CJK 的 Unicode 區間判斷：中日韓字元各自獨立可斷行，拉丁字母才累積進 nowrap 的詞：

```javascript
const CJK = /[⺀-鿿　-〿＀-￯]/;
for (const ch of text) {
  if (/\s/.test(ch)) {
    el.appendChild(document.createTextNode(" ")); flush();
  } else if (CJK.test(ch)) {
    el.appendChild(makeChar(ch));    // 每個中文字 = 獨立可斷點
    flush();
  } else {
    if (!word) { word = document.createElement("span"); word.className = "word"; el.appendChild(word); }
    word.appendChild(makeChar(ch));  // 拉丁字母鎖進 nowrap 詞
  }
}
```

CSS 那邊每個字包在 `overflow: hidden` 的框裡，用 `translateY(112%)` 藏在框下面，靠 `--i` 索引做逐字階梯延遲上浮：

```css
.split .char > span {
  transform: translateY(112%);
  transition: transform .9s cubic-bezier(.16,1,.3,1);
  transition-delay: calc(var(--i) * 0.028s);   /* 逐字錯開 */
}
.split.is-visible .char > span { transform: translateY(0); }
```

現成的 GSAP SplitText 外掛也是按空格切，對 CJK 一樣失效。所以這段我乾脆自己寫，不依賴付費外掛。

## 幾個沒展開但值得留意的細節

- **首屏別閃白**：開場前先讀 `data-theme` 決定背景色，第一格就套對，不要先閃一下暗底再切亮。canvas 預設 `opacity: 0`，等第一格算完才加 class 淡入，避免看到未初始化的黑畫面硬彈出。
- **reduced-motion 不是全關**：偵測到使用者不要動效時，我不是把動畫關掉了事，而是走一條靜態但構圖完整的分支——把 `cam` 直接設成一個平靜的取景、疊字完整顯示。降級也要保證資訊完整、畫面仍然講究。
- **絕不留一片黑**：先動態測 WebGL context，測不到就切到有樣式的靜態 fallback hero，而不是留一塊黑畫面。

## 一個誠實的補充：這頁是我「指揮」出來的

講到這裡要老實說。這頁的 3D 跟互動，不是我一行一行手刻的，是我用 Claude Code 的 agent 做出來的。我不會美術、沒學過 3D 建模，所以我的角色其實變了：從「自己刻」變成「把想要的效果用文字講清楚」，再讓 agent 去實現。

這對非科班的我反而是一種解放。我不用先花半年去啃建模軟體，可以直接把力氣放在理解這個領域真正的基本功——PBR 材質是什麼、環境光為什麼能救塑膠感、運鏡的節奏怎麼抓——然後邊做邊學。想要一個效果，我先去搞懂它的原理，再想辦法把它描述給 agent，看它做出來，不對就調。要把效果講清楚，你得先真的懂它，所以這個過程逼著我把每個名詞背後的道理弄明白，不是抄一段程式碼貼上就算。

邊玩邊學，這句話用在這裡剛剛好。

## 收尾

當然，真要上生產、要極致的模型細節，該用 glb 還是用 glb。但作為概念頁、作為一個非科班的人練 3D 手感的方式，純幾何基元加上一個會寫程式的 agent，表達力比我原本以為的高很多。完整的迭代紀錄放在專案的製作說明頁裡，之後有機會再開一篇講六幕的分鏡怎麼設計。
