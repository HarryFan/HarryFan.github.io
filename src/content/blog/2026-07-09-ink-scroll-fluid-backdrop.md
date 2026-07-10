---
title: '拆解一個 demo：讓水墨背景「被捲動攪動」的互動頁'
description: '我做了一頁水墨舞劇的活動頁，整片背景是日式墨流し（suminagashi），而且你往下捲動的時候，墨會被你攪動、跟著漂。這篇把這個效果拆開講：canvas 怎麼當固定背景又不擋捲動、指標事件怎麼路由、以及最關鍵的——捲動的位移怎麼變成注入流體的速度。'
pubDate: 2026-07-09
category: 'frontend'
heroImage: '/blog/2026-07-09-ink-scroll-fluid-backdrop.png'
tags: ['WebGL', '流體模擬', '互動網頁', 'Canvas', '前端筆記']
---

我做了一個小 demo：一頁「水墨舞劇」的活動頁，有節目、陣容、場次、訂票這些很普通的區塊。特別的地方在背景——整片是日式**墨流し（suminagashi）**的水墨，而且它不是一張貼圖，是**真的在跑流體模擬**。你往下捲動的時候，墨會被你攪動、跟著漂散。

> 先講清楚來源：這個效果的靈感來自最近社群上有人分享的 **Fable 5** 應用。我看到覺得有意思，就借來自己重寫一版、把原理拆開，寫成這篇筆記。發想不是我原創，這篇的價值在「講清楚它怎麼運作」。

這篇不談「我做了什麼」，只把這個效果拆開來講怎麼做。整個 demo 是單一 HTML 檔，一顆 `<canvas>` 加一段 WebGL。重點有四個：canvas 怎麼同時當背景又不擋你捲動、指標事件怎麼路由、墨為什麼看起來像墨、以及最有意思的——**捲動怎麼變成攪動流體的力**。

先看效果（就是這頁活動頁本身：`墨流` 掛軸可以直接落墨，往下捲動時，捲動的位移會被灌進流體當成一股水流，把墨攪散、往上帶）：

<video src="/blog/2026-07-09-ink-scroll-fluid-backdrop.mp4" poster="/blog/2026-07-09-ink-scroll-fluid-backdrop.png" autoplay muted loop playsinline preload="metadata" style="width:100%;height:auto;display:block;margin:1.5rem 0;border:3px solid #2a2620;">你的瀏覽器不支援內嵌影片，<a href="/blog/2026-07-09-ink-scroll-fluid-backdrop.mp4">點這裡直接觀看</a>。</video>

## 一、canvas 當固定背景，內容浮在上面

第一個決定是版面分層。墨要當「背景」，內容要能正常捲動，兩者不能打架。做法是把 canvas 釘死成一張全螢幕的固定背景：

```css
#ink {
  position: fixed; inset: 0;
  width: 100vw; height: 100vh;
  z-index: 0;
  pointer-events: none;   /* 關鍵：背景不吃任何指標事件 */
}
main, header { position: relative; z-index: 1; }
```

`pointer-events: none` 是整個分層的樞紐——它讓所有點擊、捲動、觸控都**穿過**背景、直接落到上層的內容。所以頁面本身是原生捲動，順到不行，背景卻鋪滿整個視窗。

還有兩個容易忽略的細節：

- `body` 的背景色要**跟 canvas 的紙色調成一樣**（這裡是 `#e9e0cd`）。不然 canvas 邊緣或還沒畫好的瞬間會閃一下白，很出戲。
- 內容卡片用半透明的和紙質感（`rgba(240,233,217,0.55)` 加 `backdrop-filter: blur`），這樣墨在卡片後面漂的時候看得到，又不會糊到字。

## 二、整片背景不吃事件，那要怎麼畫？

這裡有個矛盾：既然 canvas 是 `pointer-events: none`，使用者要怎麼在上面「落墨」互動？

答案是**不要讓整片 canvas 接事件，只開一個小窗口**。hero 區放一塊「掛軸」面板 `#draw`，只有它捕捉指標：

```css
#draw {
  position: relative;
  touch-action: none;   /* 在這塊裡拖曳不會捲到頁面 */
  cursor: crosshair;
}
```

它疊在 canvas 上方，接到 `pointerdown/move/up` 之後，用 canvas（不是這塊 draw 元素）的 `getBoundingClientRect` 把座標換算成整片畫布的 UV 座標：

```js
function toCanvasUV(e) {
  const r = canvas.getBoundingClientRect();
  return { x: (e.clientX - r.left) / r.width,
           y: 1 - (e.clientY - r.top) / r.height };  // y 翻轉成 GL 座標
}
```

點一下是放射狀滴一滴墨（`dropInk` 往六個方向噴細流），拖曳則是往拖動方向注入一道帶方向的墨。**掛軸以外的地方，因為 canvas 不吃事件，頁面就照常捲動**。一塊小窗口負責「畫」，其他全部負責「讀」，兩種手勢完全不打架。

## 三、核心：捲動怎麼攪動墨

這是整個 demo 的靈魂，也是它跟一般「背景放個影片」最不一樣的地方。原理其實一句話：**把捲動的位移，換算成注入流體場的速度**。

先掛一個 passive 的捲動監聽，再用 `requestAnimationFrame` 節流，避免一秒觸發幾十次 GL 運算：

```js
let lastScroll = window.scrollY, scrollPending = false;
function onScroll() {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(applyScroll); }
}
window.addEventListener('scroll', onScroll, { passive: true });
```

`{ passive: true }` 很重要——它告訴瀏覽器這個 listener 不會 `preventDefault`，捲動就不會被它卡住。真正做事的是下一幀的 `applyScroll`：

```js
function applyScroll() {
  scrollPending = false;
  const y = window.scrollY, dy = y - lastScroll;   // 這一幀捲了多少
  lastScroll = y;
  const mag = Math.max(-1, Math.min(1, dy / 40));   // 正規化成 -1~1
  for (let i = 0; i < 2; i++) {
    const px = 0.2 + Math.random() * 0.6, py = 0.15 + Math.random() * 0.7;
    splat(px, py,
          (Math.random() - 0.5) * 120,   // 一點左右擾動
          -mag * 260,                    // 主要是垂直的水流
          INKS[/* 隨機挑一種墨 */], Math.min(0.5, Math.abs(mag) * 0.5));
  }
}
```

拆開看：算出這一幀捲動的差值 `dy`，正規化成 `mag`，然後在畫面上隨機挑兩個點，各注入一發 `splat`（速度 + 一點點墨）。捲得越快，`mag` 越大，注入的水流越強、墨也越明顯；停下來不動，就不再注入，墨靠流體本身的耗散慢慢靜下來。

`splat` 做的事就是往流體的速度場跟染料場各蓋一團高斯：

```glsl
// splat 的 fragment shader（核心一行）
vec2 p = vUv - point.xy; p.x *= aspectRatio;
vec3 s = exp(-dot(p, p) / radius) * color;   // 以 point 為中心的高斯
gl_FragColor = vec4(texture2D(uTarget, vUv).xyz + s, 1.);
```

所以「捲動攪動墨」不是什麼特效濾鏡，就是**把 scroll delta 當成外力，餵給流體解算器**。這也是它跟頁面內容真正耦合的點：你在讀、在滑，背景就一直被你影響，而不是自顧自播放。

## 四、墨為什麼看起來像墨

流體會動之後，還得讓它「像墨」而不是像顏料或發光的煙。關鍵在最後的顯示著色器用了 **Beer–Lambert（比爾-朗伯）吸收模型**：

```glsl
vec3 absorb = max(texture2D(uDye, vUv).rgb, 0.);
vec3 paper = uPaper * pv;                    // pv 是程序生成的紙紋
vec3 col = paper * exp(-absorb * uDensity);  // 墨是「吸掉光」，不是「疊上色」
```

差別在觀念：一般 canvas 玩具是把顏色 alpha 疊上去，這裡是讓墨**吸收**打在紙上的光。墨越濃，`exp(-absorb)` 越小，紙就越暗。這才是墨在宣紙上的物理行為。

更關鍵的是四種傳統墨色存的**不是 RGB，是逐通道的吸收向量**：

```js
const INKS = {
  sumi:    [1.00, 1.00, 1.06],  // 墨：三色都吸 → 黑
  shu:     [0.34, 0.74, 1.24],  // 朱：紅通道幾乎不吸 → 留下紅
  kon:     [1.30, 1.06, 0.52],  // 紺：主要吸紅綠 → 偏藍
  matsuba: [1.06, 0.60, 1.08],  // 松葉：吸紅藍 → 留綠
};
```

朱色之所以是朱色，是因為它**幾乎不吸紅光**、把綠藍吸掉。這跟直覺相反，但只有這樣算出來的顏色，暈開、交疊時才會有真墨的層次。偷懶改成 alpha 疊色，濃淡一交融就露餡。

紙本身也是程序生成的：顯示著色器裡用 value noise 做纖維（橫向、縱向各一層）、hash 做顆粒、再加一圈 vignette，讓紙面不是死板的一塊純色。

## 五、底層那台流體引擎（簡述）

背景會動，靠的是一個標準的 **GPU stable-fluid solver**（Jos Stam 的半拉格朗日法）。每一幀 `step(dt)` 跑這串 pass：

**curl → vorticity → divergence → 清壓力 → pressure（20 次 Jacobi 迭代）→ 減梯度 → advect 速度 → advect 染料**

全程用 ping-pong 的 framebuffer 來回讀寫。相容性上：優先 WebGL2 的 half-float（RG/R/RGBA 三種格式各探測一次能不能 render），偵測不到就退回 WebGL1 的 half-float RGBA。速度場只跑 128 解析度（物理便宜），染料場跑到 1024（墨的邊緣才夠利）——**低解析度算物理、高解析度存墨**，是這類效果省效能的常見拆法。

## 六、讓它「活著」，還有效能護欄

幾個讓體驗完整的小處理：

- **閒置自動漂**：記一個 `lastActivity` 時間戳，超過 3 秒沒互動就自己滴墨、加微弱擾流，背景永遠不會是死的一片。載入後 250ms 也先種兩滴（一墨一朱），開場就不空。
- **尊重 `prefers-reduced-motion`**：偵測到就關掉 autoplay、關掉平滑捲動跟 transition。動效要能被使用者關掉。
- **`dt` 夾在 0.016**：`Math.min((now - lastT) / 1000, 0.016)`。切分頁回來、卡頓一下的時候，不會因為 `dt` 爆大而讓整個流體炸開。
- **devicePixelRatio 夾到 2**：高 DPI 螢幕不會把畫布拉到跑不動。

## 七、怎麼確定它「真的在動」

最後一個我很在意的點：canvas 效果最難的不是做出來，是**確定它在各種狀態下都還照你想的在動**。肉眼掃一眼很容易自我感覺良好。

所以我留了一個可以被程式呼叫的驗證鉤子：把畫面縮到 64×64、渲染到一個 **8-bit 的 FBO**，再 `readPixels` 出來算平均亮度。

```js
window.__stage = {
  scrollStir() { window.scrollTo(0, window.scrollY + 600); onScroll(); },
  stats() { /* 渲染到 64×64 FBO、readPixels、回傳 {mean, min} 亮度 */ }
};
```

有了它就能自動斷言：滴一滴墨、`mean` 亮度該下降；呼叫 `scrollStir()` 捲一段之後、畫面該有變化。用 8-bit FBO readback 的好處是**不需要開 `preserveDrawingBuffer`**——無頭瀏覽器截主畫布常常抓到空白，但讀自己畫的 FBO 一定讀得到。把「它在動」變成一個量得出來的數字，而不是一句「我看它有動」。

---

整個效果拆完，其實沒有一塊是魔法：canvas 固定背景 + `pointer-events` 分層、一個小窗口收指標、passive + rAF 節流的捲動監聽把位移餵成流體外力、Beer–Lambert 讓墨像墨。難的是把這些湊在一起還要順、還要在手機上不爆效能、還要能被驗證。互動網頁的功夫，多半都花在這種「湊得剛剛好」的地方。
