---
title: '一張邀請函做到什麼程度：貓空聚會落地頁的技術拆解'
description: '一場朋友間的貓空茶會，我把邀請函做成了落地頁：程序化生成的 WebGL 山脊背景、一個 boolean 同時重畫三層渲染、拒絕 IntersectionObserver 的捲動進場、以及會從你點的那一格長出來的 FLIP 燈箱。這篇把每個效果拆到可以複製的程度。後續改版的段落一併收錄：拆成多頁時兩個自認聰明的決定當場崩掉、嵌一支 YouTube 的真實代價，以及為什麼 Wikimedia Commons 的素材比 Flickr 更自由。'
pubDate: 2026-07-19
updatedDate: 2026-07-19
category: 'frontend'
heroImage: '/blog/2026-07-19-maokong-landing-page-neubrutalism-webgl/cover.png'
tags: ['three.js', 'GSAP', 'FLIP 動畫', '新粗獷主義', '落地頁', '前端筆記']
---

<style>
.mkdemo{--mk-green:#064E3B;--mk-emerald:#10B981;--mk-amber:#F59E0B;--mk-cream:#FFFBEB;--mk-ink:#1f1b17;background:var(--mk-cream);border:4px solid var(--mk-ink);border-radius:20px;padding:1.4rem;margin:2.2rem 0;font-size:.9rem;line-height:1.6;box-shadow:8px 8px 0 var(--mk-amber)}
.mkdemo-label{display:inline-block;font-family:ui-monospace,SFMono-Regular,monospace;font-size:.62rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;background:#FEF3C7;color:#92400E;border:2px solid var(--mk-ink);border-radius:999px;padding:.2rem .7rem;margin-bottom:1rem;box-shadow:2px 2px 0 var(--mk-ink)}
.mkdemo-hint{font-size:.76rem;color:#685746;margin:.9rem 0 0}
.mkdemo-row{display:flex;flex-wrap:wrap;gap:.8rem;align-items:flex-start}
.mk-btn{font-family:inherit;font-size:.82rem;font-weight:800;color:#fff;background:var(--mk-emerald);border:2px solid var(--mk-ink);border-radius:14px;padding:.6rem 1.1rem;cursor:pointer;box-shadow:4px 4px 0 var(--mk-ink);transition:transform .12s,box-shadow .12s}
.mk-btn:hover{transform:translate(-1px,-1px);box-shadow:5px 5px 0 var(--mk-ink)}
.mk-btn:active{transform:translate(2px,2px);box-shadow:2px 2px 0 var(--mk-ink)}
.mk-btn:focus-visible{outline:4px solid var(--mk-amber);outline-offset:2px}
.mk-card{background:#fff;border:4px solid var(--mk-ink);border-radius:22px;padding:1rem 1.2rem;font-weight:800;color:var(--mk-green);box-shadow:8px 8px 0 var(--mk-emerald);transition:transform .18s,box-shadow .18s;cursor:default}
.mk-card:hover{transform:translate(-2px,-2px);box-shadow:10px 10px 0 var(--mk-emerald)}
.mk-chip{font-family:ui-monospace,monospace;font-size:.68rem;font-weight:800;background:#fff;color:var(--mk-green);border:2px solid var(--mk-ink);border-radius:999px;padding:.3rem .7rem;box-shadow:2px 2px 0 var(--mk-ink);transition:transform .12s,box-shadow .12s;cursor:default}
.mk-chip:hover{transform:translate(-1px,-1px);box-shadow:3px 3px 0 var(--mk-ink)}
.mk-chip:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--mk-ink)}
.mk-canvas{display:block;width:100%;height:220px;border:3px solid var(--mk-ink);border-radius:14px;background:#FFFBEB;touch-action:none}
.mk-reveal-stage{height:210px;overflow-y:auto;border:3px solid var(--mk-ink);border-radius:14px;background:#fff;padding:0 1rem}
.mk-reveal-spacer{height:190px;display:flex;align-items:center;justify-content:center;color:#a99;font-size:.78rem}
.mk-reveal-item{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);background:#ECFDF5;border:3px solid var(--mk-ink);border-radius:16px;padding:.8rem 1rem;margin:.7rem 0;font-weight:800;color:var(--mk-green);box-shadow:4px 4px 0 var(--mk-emerald)}
.mk-reveal-item.is-shown{opacity:1;transform:none}
.mk-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.6rem}
.mk-tile{aspect-ratio:4/3;border:3px solid var(--mk-ink);border-radius:12px;overflow:hidden;cursor:pointer;padding:0;background:#ECFDF5}
.mk-tile:focus-visible{outline:4px solid var(--mk-amber);outline-offset:2px}
.mk-tile img{width:100%;height:100%;object-fit:cover;display:block;border-radius:0}
.mk-flip-layer{position:fixed;inset:0;z-index:60;background:rgba(0,0,0,.8);display:none;align-items:center;justify-content:center;padding:1.5rem}
.mk-flip-layer.is-open{display:flex}
.mk-flip-layer img{max-width:min(90vw,760px);max-height:80dvh;width:auto;height:auto;border:4px solid #000;border-radius:16px;box-shadow:8px 8px 0 var(--mk-amber);background:#fff}
@media (max-width:620px){.mkdemo{padding:1rem;box-shadow:5px 5px 0 var(--mk-amber)}.mk-grid{grid-template-columns:repeat(3,1fr)}}
@media (prefers-reduced-motion:reduce){.mkdemo *{transition-duration:.01ms !important;animation-duration:.01ms !important}.mk-reveal-item{opacity:1;transform:none}}
</style>

八月中要跟朋友去貓空喝茶。原本只要在群組貼一句「8/15 下午三點貓空站集合」就結束的事，我把它做成了一頁網站。

理由不高尚：我想找個沒有客戶、沒有 deadline、沒人會嫌棄的沙盒，把幾個一直想試但不敢往正式案子塞的東西一次做完。程序化生成的 3D 背景、FLIP 燈箱、一個開關重畫整站配色。做完發現，這些東西單獨看都不難，難的是它們**互相之間怎麼不打架**。

這篇把每一項拆到可以複製的程度。文章裡穿插的 demo 全部是能動手玩的實作，不是截圖。

## 先看它長什麼樣

![貓空聚會落地頁的首屏：奶油色底、程序化生成的層疊綠色山脊、圓形太陽，前景是白底黑框、帶硬陰影的活動資訊卡與倒數計時板](/blog/2026-07-19-maokong-landing-page-neubrutalism-webgl/cover.png)

視覺方向是**柔角的新粗獷主義（neo-brutalism）**：粗黑框、零模糊的實色偏移陰影、飽和平塗、超粗字重。但把經典新粗獷的方角換成 `32px` 大圓角——它要當一張邀請函，不是一份稅務表格。

## 一切從陰影的物理開始

整站的手感只靠一條規則：**懸停會浮起，按下會沉下去，而光源永遠不動。**

做法是位移量和陰影偏移量**永遠等值反向**。按鈕往右下移 2px，陰影就從 `4px` 收成 `2px`——物件的頂面看起來釘在原地，只有影子被壓扁。這就是實體感的來源。

<div class="mkdemo">
<span class="mkdemo-label">Demo 01 — 按壓物理</span>
<div class="mkdemo-row">
<div class="mk-card">大卡片 8px → 10px</div>
<button class="mk-btn" type="button">主要按鈕 4px → 2px</button>
<span class="mk-chip" tabindex="0">小晶片 2px</span>
</div>
<p class="mkdemo-hint">把游標移上去、再按住不放。注意影子的長度變化，和方塊本身的位移永遠是相反且等量的。</p>
</div>

整站只用了五階，沒有第六階：

| 陰影偏移 | 懸停 / 按下 | 用在哪 |
|---|---|---|
| `8px 8px` | → `10px 10px`，位移 `-2px` | 大型內容卡 |
| `6px 6px` | → `8px 8px`，位移 `-1px` | 倒數板、行程小卡 |
| `4px 4px` | 按下 → `2px 2px`，位移 `+2px` | 按鈕、數據磚 |
| `3px 3px` | 從無到有 | FAQ 列、清單列 |
| `2px 2px` | → `3px 3px`，按下 `1px 1px` | 晶片、輸入框 |

```css
.vibrant-card-emerald {
  @apply bg-white rounded-[32px] border-4 border-[#10B981] p-6 md:p-8
         shadow-[8px_8px_0px_0px_#10B981] transition-all duration-300;
}
.vibrant-card-emerald:hover {
  @apply translate-x-[-2px] translate-y-[-2px] shadow-[10px_10px_0px_0px_#10B981];
}
```

輸入框我沒有用常見的變色框線，改成**聚焦時陰影變長**：`shadow-[2px_2px...]` → `focus:shadow-[4px_4px...]`。欄位會「彈出來」，跟整站的物理是同一套語言。

## 背景不是圖片，是算出來的山

首屏那排山脊沒有任何美術資源。每一層都是 90 段線段，用**多頻正弦疊加**再加一點抖動生出來的：

```ts
for (let i = 0; i <= segments; i++) {
  const t = i / segments;
  const x = -width / 2 + t * width;
  // 多頻正弦疊加 + 抖動 = 自然山脊
  const base = Math.sin(t * Math.PI * cfg.peaks) * 0.6;
  const mid = Math.sin(t * Math.PI * cfg.peaks * 2.3 + cfg.seed) * 0.28;
  const jitter = (rand() - 0.5) * 0.35;
  const y = (base + mid + jitter) * cfg.amp;
  shape.lineTo(x, y);
}
shape.lineTo(width / 2, -30);   // 拉到很下面，視差時不會露出底邊
shape.closePath();
```

兩個關鍵決定：

**第一，`rand` 是帶種子的 `mulberry32`，不是 `Math.random`。** 否則 React StrictMode 的雙掛載會讓山形在開發時閃一下變成另一座山。用 PRNG 之後，同一個 seed 永遠長出同一條稜線。

**第二，`lineTo(width / 2, -30)`。** 每個 shape 都往下拉到畫面外很遠的地方，這樣四層山各自以不同速率做視差位移時，永遠不會有哪一層的底邊被拉出來穿幫。

四層的視差係數是 `0.6 / 1.4 / 2.6 / 4.2`，對應深度 `-18 / -12 / -7 / -3`——越近的動越快，就這麼直觀。

下面這個 demo 是同一套演算法用 Canvas 2D 重寫的版本（正式站是 three.js 的 `ShapeGeometry`，數學完全一樣）：

<div class="mkdemo">
<span class="mkdemo-label">Demo 02 — 程序化山脊 × 視差</span>
<canvas class="mk-canvas" id="mk-ridge" width="900" height="440" aria-label="程序化生成的山脊視差示範，滑鼠移動可改變視角"></canvas>
<div class="mkdemo-row" style="margin-top:.8rem">
<button class="mk-btn" type="button" id="mk-ridge-reseed">換一組種子</button>
<span class="mk-chip" id="mk-ridge-seed">seed 20260815</span>
</div>
<p class="mkdemo-hint">在畫面上移動游標（手機直接用手指拖），四層山會以不同速率位移。每次換種子都是全新的山，但同一個種子永遠重現同一座。</p>
</div>

### 讓 3D 消失在 DOM 裡的那個小動作

這是我自己最喜歡的一手。場景的霧色設定成 `0xfffbeb`——**跟頁面 `body` 的背景色 `#FFFBEB` 完全相同**。

```ts
scene.fog = new THREE.FogExp2(pal.fog, 0.014);
scene.background = null;  // 讓 CSS 的頁面底色透出來
```

canvas 是透明的，遠處的山被霧色吃掉，而霧色就是頁面底色。結果是 3D 場景的地平線**無縫溶進 DOM 背景**，你看不到畫布的邊界在哪裡。雨天模式的霧色 `0xeef4fd` 則是同一招的冷色版本。

還有一個省資源的細節：太陽光暈、飄落的茶葉、三層霧氣，全部共用**同一張 128×128 的 CanvasTexture**——一個執行期畫出來的柔和放射狀漸層。

```ts
const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
g.addColorStop(0, 'rgba(255,255,255,1)');
g.addColorStop(0.5, 'rgba(255,255,255,0.55)');
g.addColorStop(1, 'rgba(255,255,255,0)');
```

整個場景零自訂 shader，全部是 `MeshBasicMaterial`。

## 一個 boolean，同時重畫三層渲染

活動可能遇到下雨，所以有晴天／雨天兩套方案。一個 `WeatherMode` 同時驅動**三個互不相干的渲染系統**：WebGL 場景、CSS 粒子層、還有整套 DOM 設計系統的配色。

這個狀態現在住在 Router 外面的 Context 裡（原因見本節末），控制項則放在全站共用的 header：

```tsx
<EventProvider>              {/* weatherMode 住在這 */}
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>   {/* header 的切換器讀它 */}
        <Route index element={<HomePage />} />
        <Route path="itinerary" element={<ItineraryPage />} />
        ...
```

3D 那層我沒有做狀態切換，而是**每一幀往目標色前進 4%**：

```ts
const pal = PALETTES[modeRef.current];
const k = 0.04;
if (scene.fog) lerpColor((scene.fog as THREE.FogExp2).color, pal.fog, k);
(key as THREE.DirectionalLight).color.lerp(new THREE.Color(pal.light), k);
lerpColor((sunCore.material as THREE.MeshBasicMaterial).color, pal.sun, k);
lerpColor((leafMat as THREE.MeshBasicMaterial).color, pal.leaf, k);
```

注意是 `modeRef.current` 不是 `mode`。這一個字的差別讓整個 `useEffect` 的依賴陣列可以維持 `[]`——場景**建立一次就好**，切換天氣時不會被拆掉重建。React 的狀態負責 DOM，ref 負責跨越 render 邊界把值餵給 rAF 迴圈，兩邊各司其職。

### 為什麼它非得住在 Context 不可

一開始不是這樣的。切換器放在頁面內容裡，而且**放了兩份**——`HeroSection` 的資訊卡有一個，`ItineraryTimeline` 的表頭又有一個。單頁的時候這不痛不癢，兩份都在同一個捲軸上，改哪個都一樣。

拆成多頁之後，兩份同時失效了。

首頁沒有行程時間軸，行程頁沒有那張資訊卡。於是變成：**你在首頁時，沒有任何控制項能切換你正在看的那片背景**。而背景是全站固定的——它就在那裡，藍的或綠的，但你動不了它。

問題不在於「切換器該放哪一頁」，而在於我一開始就把它歸錯類了。判準其實很直白：

> 這個狀態影響的範圍，就是它該待的層級。

`weatherMode` 驅動 WebGL 場景、CSS 粒子層、全站主題色——它從來就不是某一頁的狀態，是全站的。所以正確答案是它**哪一頁都不屬於**：控制項移到 header，狀態提升到 Context，包在 Router 外面。

```tsx
<EventProvider>        {/* weatherMode 活在這裡 */}
  <BrowserRouter>
    <Route element={<Layout />}>   {/* header 的切換器讀它 */}
      <Route index element={<HomePage />} />
      ...
```

原本那兩處改成唯讀的狀態顯示——「☀️ 目前顯示晴天行程」。使用者仍然知道自己在哪個方案，但控制項只有一個，不會出現兩份 UI 各說各話。

順帶一提，同一批狀態裡還有報名名單。它原本住在 `RsvpForm` 裡，而表單只存在於 `/rsvp`——所以首頁那個「已有 N 人完成出席登記」在使用者沒進過報名頁時永遠拿不到數字。判準一樣，處理方式一樣：提升到 Context。

**在單頁裡，「元件持有狀態」和「全站持有狀態」看起來沒差別。拆頁就是那個把差別逼出來的時刻。**

## 捲動進場：完整的 Reveal 元件

每個區塊在接近視窗時淡入上浮。這是全文最短但踩得最深的一個元件——先給你可以直接複製的完整版本，後面再說為什麼長這樣。

```tsx
export default function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let done = false;
    let observer: IntersectionObserver | null = null;

    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
      cleanup();
    };

    const check = () => {
      raf = 0;
      if (done || !ref.current) return;
      // 元素頂端進入視窗底部 92% 以內即顯示（含已捲過的情況：top < 0）
      if (ref.current.getBoundingClientRect().top < window.innerHeight * 0.92) reveal();
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };

    function cleanup() {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      observer?.disconnect();
      observer = null;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }

    // 主力：IntersectionObserver 對「掛載當下就已在視窗內」的元素必定回報一次，
    // 不需要任何捲動或互動。
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => { if (entries.some((e) => e.isIntersecting)) reveal(); },
        { rootMargin: '0px 0px -8% 0px' }
      );
      observer.observe(el);
    }

    // 備援：捲動／縮放時重測，並在下一個影格再確認一次，
    // 避免首次量測時版面尚未穩定（WebGL 畫布、圖片、字型都還沒定位）而誤判。
    check();
    raf = requestAnimationFrame(check);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return cleanup;
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}
```

呼叫端手動排 `0 / 80 / 160ms` 的階梯延遲，讓同一區的元素依序進場。easing 是 easeOutQuint，收尾夠慢才有「飄進來」的感覺。

<div class="mkdemo">
<span class="mkdemo-label">Demo 03 — 捲動進場</span>
<div class="mk-reveal-stage" id="mk-reveal">
<div class="mk-reveal-spacer">↓ 往下捲</div>
<div class="mk-reveal-item">15:00　貓空站集合</div>
<div class="mk-reveal-item">15:30　樟樹步道散策</div>
<div class="mk-reveal-item">16:30　景觀茶館品茗</div>
<div class="mk-reveal-item">18:30　夜景與收工</div>
</div>
<div class="mkdemo-row" style="margin-top:.8rem">
<button class="mk-btn" type="button" id="mk-reveal-reset">重播</button>
</div>
<p class="mkdemo-hint">在框內往下捲。每張卡片進入視窗底部 92% 就上浮淡入，各差 80ms。這裡用的是跟正式站一模一樣的判斷式與 easing 曲線。</p>
</div>


### 為什麼要 observer 加捲動兩套？

因為我一開始**只寫了捲動那套**，然後它死了。

原始版本的邏輯是：掛載時同步檢查一次 `getBoundingClientRect().top`，沒進視窗就掛 `scroll` 監聽等下次。我當時刻意避開 IntersectionObserver，理由寫在註解裡：IO 判斷的是「現在有沒有相交」，萬一使用者用 `#hash` 直接跳到頁面中段，中間的元素從沒觸發過 intersection，就會永遠卡在 `opacity: 0`。

兩個月後我把這個單頁拆成四頁。相簿獨立成頁之後：

```
相簿頁文件高度 = 779px
瀏覽器視窗高度 = 779px
```

**這一頁不能捲動。** 沒有捲軸就永遠不會有 `scroll` 事件，掛載時那次檢查一失敗，就再也沒有第二次機會。整個相簿在正式 build 上是空白的——`<img>` 全在 DOM 裡、`naturalWidth` 正常、opacity 是 1，但外層 `Reveal` 停在 `opacity: 0`，把裡面全藏了。我盯著看了二十秒，它沒有出現。

我擔心 IO 會造成的症狀，一字不差地發生在我自己寫的替代方案上。

而且那個擔心本身是錯的。**IntersectionObserver 在你呼叫 `observe()` 時，對已經在視窗內的元素必定回報一次**，不需要任何捲動或互動。我設想的 `#hash` 情境不會發生。我否定了一個正確的 API，理由是一個它其實沒有的缺陷，然後自己實作了那個缺陷。

所以現在的版本是 **IO 當主力、捲動當備援**：IO 處理「一掛載就在視窗內」和「捲進來」兩種情況；捲動監聽只在極少數 IO 不可用的環境接手。

那行多出來的 `requestAnimationFrame(check)` 是另一個教訓。首次量測時 WebGL 畫布、圖片、字型都還沒定位，`getBoundingClientRect()` 給的是還沒穩定的版面。**只量一次就決定命運，是這整個 bug 的共同結構。**

兩件可以帶走的事：

1. **「頁面很長」不是能依賴的前提。** 原本的實作隱含假設「使用者總會捲動」，拆頁那天這個假設失效了。長頁面不是安全網，它只是把 bug 藏起來。
2. **駁回一個標準 API 之前，先確認你駁回的缺陷真的存在。** 我花力氣手刻替代方案，而要避開的問題從一開始就不存在。

## 相簿：自己寫排版，讓高度不等圖片

![貓空風景相簿：白底粗黑框卡片內，八張貓空實景照片以磚砌式排列，右上角有黃底黑框的 MAOKONG SCENERY 標籤](/blog/2026-07-19-maokong-landing-page-neubrutalism-webgl/gallery.png)

磚砌排版（masonry）我沒有用套件，就是一個「找最矮的那一欄放進去」的迴圈：

```ts
const placed = items.map(child => {
  const col = colHeights.indexOf(Math.min(...colHeights));
  const x = col * (columnWidth + gap);
  const height = child.height * scale;
  const y = colHeights[col];
  colHeights[col] += height + gap;
  return { ...child, x, y, w: columnWidth, h: height };
});
```

重點在 `child.height * scale`：高度是**資料算出來的**，比例基準是一個假想的 `BASE_COLUMN_WIDTH = 400`，再依實際欄寬等比縮放。

這件事的意義是——**排版完全不需要等圖片載入**。我一開始抄來的版本會先 `preload` 全部八張圖、載完才開始排，這在桌機看不出來，在手機上就是對著一塊 1.5MB 的空白發呆好幾秒。改成資料驅動之後，格子先站好位置，圖片再自己漸進填進去。

## FLIP：讓燈箱從你點的那一格長出來

點縮圖打開大圖，大部分實作是淡入加縮放。FLIP 的差別在於：**大圖是從你剛剛點的那一格的位置、長成現在這個樣子的**。視線不會斷。

做法是經典的 First-Last-Invert-Play。點擊當下記下磚塊的 `DOMRect`，燈箱掛載後量自己的最終位置，然後從兩者的差值補間回 0：

```ts
const rect = figure.getBoundingClientRect();
const from = originRect && rect.width
  ? {
      x: originRect.left + originRect.width / 2 - (rect.left + rect.width / 2),
      y: originRect.top + originRect.height / 2 - (rect.top + rect.height / 2),
      scale: originRect.width / rect.width,
      opacity: 0.6
    }
  : { scale: 0.85, opacity: 0 };

gsap.fromTo(figure, from, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'power3.out' });
```

中心點對中心點的位移差，加上一個寬度比當作縮放。關閉時同一組數學反過來跑。

<div class="mkdemo">
<span class="mkdemo-label">Demo 04 — FLIP 燈箱</span>
<div class="mk-grid" id="mk-flip-grid"></div>
<p class="mkdemo-hint">點任何一張。大圖會從那一格的位置飛出來，關閉時再飛回同一格——不是從畫面中央淡出。鍵盤 Esc 或點背景關閉。這裡用的是 Web Animations API，正式站是 GSAP，數學相同。</p>
</div>
<div class="mk-flip-layer" id="mk-flip-layer" role="dialog" aria-modal="true" aria-label="放大檢視"><img id="mk-flip-img" alt="放大的貓空風景" /></div>

真正讓我滿意的是**換圖時的 rect 交換**。多數 FLIP 燈箱在你按了三次「下一張」之後關閉，還是會飛回你最初點的那一格——因為它只記得開場那個座標。這裡在切換索引時重新查一次 DOM：

```tsx
onIndexChange={index =>
  setLightbox(prev => {
    if (!prev) return prev;
    // 換張後把 rect 也換成新那張圖磚的位置，關閉時才會飛回正確的格子。
    const tile = document.querySelector(`[data-key="${items[index].id}"]`);
    return { index, rect: tile?.getBoundingClientRect() ?? prev.rect };
  })
}
```

一行 `querySelector`，換到「關閉時回到正確位置」。

## 然後手機版把我打回原形

桌機上一切都好。開手機一看，相簿整個爆版，圖片壓在下一個區塊上面。

**第一個坑：容器塌了。** Masonry 的圖磚全部 `position: absolute`，容器卻寫 `h-full`——絕對定位的子元素撐不起父層高度。桌機五欄剛好被一個 `minHeight: 420` 兜住，手機單欄需要一千四百多 px，直接溢出。解法是把最高那一欄的高度算出來還給容器：

```ts
return { grid: placed, gridHeight: Math.max(...colHeights, 0) - gap };
```

**第二個坑：hover 在觸控裝置上卡住。** 圖磚的懸停效果是縮小到 `0.96`（反直覺但好看）。問題是觸控裝置會觸發 `mouseenter`，卻永遠不會觸發 `mouseleave`——手指離開後圖磚就**永遠停在縮小狀態**。解法不是寫 CSS media query，是根本不要掛上去：

```ts
// 觸控裝置沒有 hover 的「離開」事件，圖磚會卡在縮小狀態，所以只在真的能 hover 時掛。
const canHover = useMedia(HOVER_QUERIES, ON, 0) === 1;
...
const hoverProps = canHover ? { onMouseEnter, onMouseLeave } : {};
```

**第三個坑：`will-change` 洩漏。** 八張圖磚的 `style` 裡常駐 `willChange: 'transform, width, height, opacity'`，等於永久把八個元素升成合成層，手機 GPU 記憶體白白被吃掉。改成只在補間期間掛，動畫結束就收：

```ts
onComplete: () => gsap.set(selector, { willChange: 'auto' })
```

**第四個坑：`vh` 在 iOS Safari 是騙人的。** 燈箱的 `max-h-[85vh]` 把網址列佔的高度也算進去，圖片上下被裁掉。換成 `dvh`，再給底部的計數列補上 `env(safe-area-inset-bottom)` 避開 home indicator。

順手還做了幾件事：手機最少兩欄（單欄要捲過八張全寬圖，那不叫相簿叫長條）；窄版關掉進場模糊、把飛入距離從 `window.innerHeight + 200` 縮成 `y + 80`；燈箱加上左右滑換圖、下滑關閉，並且要求該軸位移必須大於另一軸，避免誤判。

**第五個坑（拆多頁之後才發現）：我的觸控目標全部太小。**

多頁化之後 header 多了導覽列，我拿 390px 寬去量每一個可點元素的高度，結果很難看：

```
最小觸控目標   16px   ← 站名連結
導覽列連結     32px
行程頁 390px   23 個可點元素，19 個不合格
```

44px 是 Apple HIG 的建議下限（Material 抓 48px）。我全站沒有一個 header 元素達標——因為我是用滑鼠在 1440px 螢幕上開發的，游標的落點精度掩蓋了所有問題。跟上面那個 `Reveal` 是同一種錯誤：**在寬鬆的環境裡開發，狹窄的環境裡才會現形。**

修法是給觸控目標補最小高度，桌面則維持原本的緊湊排版：

```tsx
// min-h-11（44px）為觸控目標下限；桌面滑鼠精準度高，md 以上恢復緊湊排版
className="flex items-center justify-center min-h-11 md:min-h-0 px-3 py-1.5 ..."
```

改完重量，四個路由的 header 元素全部 44px。順帶一提，這種東西不需要真的拿手機測——把頁面塞進一個固定寬度的同源 iframe，用 `getBoundingClientRect()` 掃過所有可點元素就好，寫成腳本三十秒跑完一輪。

## 嵌一支 YouTube，比你想的貴

後來我想加幾支別人拍的貓空實走影片。文字寫「輕鬆自在的小聚」對沒去過的人是零訊號，影片才回答得了「那邊到底長怎樣、要走多累」。

直覺做法是貼三個 `<iframe>`。但這頁的 JS bundle 已經接近 900KB，而**每一個 YouTube iframe 會再拉進約 1MB 的播放器程式碼**——不是等你按下播放，是頁面一渲染就開始下載。三支影片等於在手機首屏上疊了 3MB 的東西，而多數訪客根本不會播其中任何一支。

改用 facade：先只放縮圖跟播放鈕，點了才把 iframe 換上去。

```tsx
const [playing, setPlaying] = useState(false);

return playing ? (
  <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} ... />
) : (
  <button onClick={() => setPlaying(true)} aria-label={`播放影片：${title}`}>
    <img src={thumb} alt="" loading="lazy" />
    {/* 播放鈕 */}
  </button>
);
```

三個容易漏掉的細節：

**一，`maxresdefault` 不保證存在。** YouTube 的縮圖網址有好幾種解析度，但 `maxresdefault.jpg` 只有原始影片是 HD 才會被產生出來，老影片會 404。要準備退路：

```tsx
const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
// ...
<img src={thumb} onError={() => setThumb(`https://i.ytimg.com/vi/${id}/mqdefault.jpg`)} />
```

`mqdefault` 是一定有的那個。

**二，容器要先佔好位。** `aspect-video`（16:9）寫在外層，不要等圖片載入才撐開高度，否則就是自己製造 CLS。前面才為了 LCP 把相簿圖從 hotlink 改成自架，這裡再把版面推來推去就白費了。

**三，`youtube-nocookie.com` 沒有你以為的那麼乾淨。**

我一開始在註解裡寫「使用者沒點播放之前，YouTube 完全不會知道有人來過」。這句話是錯的。

`nocookie` 網域確實不在播放前寫追蹤 cookie，但**縮圖那行 `src="https://i.ytimg.com/..."` 本身就是一個發往 Google CDN 的請求**。頁面一渲染，對方就拿到訪客 IP、User-Agent 和 Referer。播放器沒載入是真的，「不知道有人來過」不是。

想讓那句話成立，縮圖也得自架——`curl` 抓下來丟進 `src/assets`，跟相簿圖同一套處理。代價是失去 `onError` 退路（得自己確認每張抓得到），以及影片換掉時要記得重抓。

我兩種都做過。**重點不是哪個對，是別把「少載了 1MB 播放器」講成「零第三方請求」——那是兩件事。**

## 素材授權：Commons 其實比 Flickr 更自由

相簿要補圖時我考慮過轉去抓 Flickr，畢竟量大得多。結論是不換，理由跟直覺相反。

| | Wikimedia Commons | Flickr |
|---|---|---|
| 授權審查 | 上傳時就被社群審過，**站上每張都是自由授權** | 逐張自己看，**大量是 CC BY-NC / ND** |
| 授權資訊 | 結構化、機器可讀、穩定 | 靠上傳者自選，欄位可能與實際不符 |
| 題材廣度 | 少，偏地標與風景 | 多很多 |

「免費素材」這個詞在 Flickr 上很滑。NC（非商業）和 ND（禁改作）佔比相當高，而一般搜尋很容易把它們混進來。ND 尤其麻煩——你連裁切都不該做，而做圖牆幾乎一定會裁。

Commons 的優勢在於**授權判斷已經被前置完成了**。它的 API 直接吐結構化的 metadata：

```bash
curl -sG "https://commons.wikimedia.org/w/api.php" \
  --data-urlencode "action=query" --data-urlencode "format=json" \
  --data-urlencode "prop=imageinfo" \
  --data-urlencode "iiprop=url|size|extmetadata" \
  --data-urlencode "titles=File:Night_view_from_MaoKong.jpg"
```

一次拿到尺寸、授權名稱、作者。尺寸還剛好是我需要的——這個相簿的 Masonry 用資料裡的 `height` 算版位，而那個值是 `原始高 / 原始寬 × BASE_COLUMN_WIDTH`。API 給了原始長寬，這個換算就不用開圖去量。

所以決定是：**Commons 當底，只在它真的沒有的題材上才另尋來源**，且只收 CC BY / CC BY-SA / CC0。授權的心智負擔維持不變，這比多幾張圖重要。

順帶一提，同一套「先確認來源再寫」的紀律也用在餐廳資料上。那份 `maokongFood.ts` 的檔頭寫著：

> 每一筆都附得出來源網址；查不到的欄位一律留 null，不用「可能」「據說」填空。
> 營業時間在各部落格之間普遍互相矛盾，因此不放進資料，只在 caveats 寫出
> 「來源不一、請去電確認」——寫死一個錯的時間比不寫更糟。

這條在做旅遊類頁面時特別值錢。**一個錯的營業時間，比一個空欄位傷害大得多**——空欄位只是沒幫上忙，錯的時間會讓人白跑一趟。

## 三件我帶走的事

**一，物理一致比效果華麗重要。** 整站的手感其實只有一條規則（位移與陰影等值反向），但因為那條規則沒有任何例外，它會讀起來像一個真實存在的材質。加第六階陰影只會讓它變糊。

**二，「該不該被看見」和「現在有沒有相交」是兩個問題。** 我用比較笨的 `getBoundingClientRect` 換掉比較潮的 IntersectionObserver，是因為前者能回答我真正在問的問題。工具的先進程度和它適不適合，沒有關係。

**三，手機不是把桌機縮小。** 塌掉的容器、卡住的 hover、洩漏的 `will-change`、騙人的 `vh`——這四個問題在桌機上一個都不會出現。它們不是「響應式沒調好」，是四種不同的錯誤模型，只有真的拿手機捲一遍才會現形。

寫這頁大概花了幾個晚上，比直接在群組貼一句話貴太多了。但現在朋友點進去會看到山、會看到倒數、下雨的話還能切成備案——而我把想試的東西全試完了。

---

> 這頁是為 2026/08/15 的貓空茶會做的。程式碼裡每一段中文註解寫的都是「為什麼」而不是「做了什麼」——大多是「我們先試了顯而易見的做法，然後它壞在這裡」。半年後回來看的人會感謝現在的自己。

<script>
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Demo 02：程序化山脊 ---------- */
  var cv = document.getElementById('mk-ridge');
  if (cv) {
    var ctx = cv.getContext('2d');
    var LAYERS = [
      { peaks: 2.2, amp: 46, y: 250, parallax: 0.6, color: '#D1FAE5' },
      { peaks: 3.1, amp: 54, y: 292, parallax: 1.4, color: '#A7F3D0' },
      { peaks: 4.3, amp: 60, y: 336, parallax: 2.6, color: '#34D399' },
      { peaks: 5.6, amp: 66, y: 384, parallax: 4.2, color: '#047857' }
    ];
    // 帶種子的 PRNG：同一個 seed 永遠長出同一座山。
    function mulberry32(a) {
      return function () {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        var t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    var seed = 20260815, paths = [], px = 0, py = 0, tx = 0, ty = 0;

    function build() {
      paths = LAYERS.map(function (cfg, li) {
        var rand = mulberry32(seed + li * 977);
        var p = new Path2D(), segs = 90;
        p.moveTo(0, cv.height);
        for (var i = 0; i <= segs; i++) {
          var t = i / segs;
          // 多頻正弦疊加 + 抖動 = 自然山脊
          var base = Math.sin(t * Math.PI * cfg.peaks) * 0.6;
          var mid = Math.sin(t * Math.PI * cfg.peaks * 2.3 + li) * 0.28;
          var jitter = (rand() - 0.5) * 0.35;
          p.lineTo(t * cv.width, cfg.y + (base + mid + jitter) * -cfg.amp);
        }
        p.lineTo(cv.width, cv.height);
        p.closePath();
        return p;
      });
    }

    function draw() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = '#FDE68A';
      ctx.beginPath();
      ctx.arc(cv.width * 0.66 + px * 0.3, 150 + py * 0.3, 46, 0, Math.PI * 2);
      ctx.fill();
      paths.forEach(function (p, i) {
        ctx.save();
        ctx.translate(px * LAYERS[i].parallax * 0.5, py * LAYERS[i].parallax * 0.35);
        ctx.fillStyle = LAYERS[i].color;
        ctx.fill(p);
        ctx.restore();
      });
    }

    function loop() {
      px += (tx - px) * 0.06;   // 雙重阻尼：先平滑輸入，再讓畫面追平滑後的值
      py += (ty - py) * 0.06;
      draw();
      requestAnimationFrame(loop);
    }

    cv.addEventListener('pointermove', function (e) {
      var r = cv.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 40;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 24;
    });
    cv.addEventListener('pointerleave', function () { tx = 0; ty = 0; });

    var btn = document.getElementById('mk-ridge-reseed');
    var chip = document.getElementById('mk-ridge-seed');
    if (btn) btn.addEventListener('click', function () {
      seed = Math.floor(Math.random() * 9e7);
      if (chip) chip.textContent = 'seed ' + seed;
      build(); draw();
    });

    build();
    if (reduce) { draw(); } else { loop(); }
  }

  /* ---------- Demo 03：捲動進場 ---------- */
  var stage = document.getElementById('mk-reveal');
  if (stage) {
    var items = [].slice.call(stage.querySelectorAll('.mk-reveal-item'));
    items.forEach(function (el, i) { el.style.transitionDelay = (i * 80) + 'ms'; });
    var raf = 0;
    function check() {
      raf = 0;
      var box = stage.getBoundingClientRect();
      items.forEach(function (el) {
        if (el.classList.contains('is-shown')) return;
        // 跟正式站同一條判斷式：元素頂端進入容器底部 92% 以內就顯示
        if (el.getBoundingClientRect().top < box.top + box.height * 0.92) {
          el.classList.add('is-shown');
        }
      });
    }
    function onScroll() { if (!raf) raf = requestAnimationFrame(check); }
    stage.addEventListener('scroll', onScroll, { passive: true });
    check();
    var reset = document.getElementById('mk-reveal-reset');
    if (reset) reset.addEventListener('click', function () {
      items.forEach(function (el) { el.classList.remove('is-shown'); });
      stage.scrollTop = 0;
      requestAnimationFrame(check);
    });
  }

  /* ---------- Demo 04：FLIP 燈箱 ---------- */
  var grid = document.getElementById('mk-flip-grid');
  var layer = document.getElementById('mk-flip-layer');
  var big = document.getElementById('mk-flip-img');
  if (grid && layer && big) {
    var BASE = '/blog/2026-07-19-maokong-landing-page-neubrutalism-webgl/';
    // 用相簿截圖切成四塊當縮圖來源，避免額外的圖片請求。
    var SHOTS = [
      { src: BASE + 'gallery.png', pos: '8% 22%', alt: '貓空纜車' },
      { src: BASE + 'gallery.png', pos: '38% 22%', alt: '貓空站夜景' },
      { src: BASE + 'gallery.png', pos: '64% 40%', alt: '貓空茶園' },
      { src: BASE + 'gallery.png', pos: '92% 55%', alt: '貓空步道' }
    ];
    var originRect = null;

    SHOTS.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mk-tile';
      b.setAttribute('aria-label', '放大檢視：' + s.alt);
      b.style.backgroundImage = 'url(' + s.src + ')';
      b.style.backgroundSize = '320%';
      b.style.backgroundPosition = s.pos;
      b.addEventListener('click', function () { open(b, s); });
      grid.appendChild(b);
    });

    function open(tile, s) {
      originRect = tile.getBoundingClientRect();
      big.src = s.src;
      big.alt = s.alt;
      big.style.objectFit = 'cover';
      layer.classList.add('is-open');
      if (reduce) return;
      var r = big.getBoundingClientRect();
      // FLIP：中心點對中心點的差值，加上寬度比當縮放
      big.animate([
        {
          transform: 'translate(' +
            (originRect.left + originRect.width / 2 - (r.left + r.width / 2)) + 'px,' +
            (originRect.top + originRect.height / 2 - (r.top + r.height / 2)) + 'px) scale(' +
            (originRect.width / r.width) + ')',
          opacity: 0.6
        },
        { transform: 'none', opacity: 1 }
      ], { duration: 550, easing: 'cubic-bezier(0.22,1,0.36,1)' });
    }

    function close() {
      if (reduce || !originRect) { layer.classList.remove('is-open'); return; }
      var r = big.getBoundingClientRect();
      var a = big.animate([
        { transform: 'none', opacity: 1 },
        {
          transform: 'translate(' +
            (originRect.left + originRect.width / 2 - (r.left + r.width / 2)) + 'px,' +
            (originRect.top + originRect.height / 2 - (r.top + r.height / 2)) + 'px) scale(' +
            (originRect.width / r.width) + ')',
          opacity: 0
        }
      ], { duration: 400, easing: 'cubic-bezier(0.65,0,0.35,1)' });
      a.onfinish = function () { layer.classList.remove('is-open'); };
    }

    layer.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && layer.classList.contains('is-open')) close();
    });
  }
})();
</script>
