---
title: '單檔 Three.js 也能做旗艦級：我把士林夜市小吃重寫成程序化 3D 滾動網站'
description: '一個做給士林夜市五大名物的 3D 導覽站——章魚燒、珍奶、大雞排、雪花冰、臭豆腐，每一站都是單一自包含 HTML、零資產、純程序化建模。這篇記錄我怎麼把章魚燒那一站從 r128 老寫法升級到現代 ESM，用 RoomEnvironment 做零資產環境反射、只讓霓虹選擇性發光、再靠 clearcoat 醬汁跟會飄的柴魚片把「有料」做出來，以及為什麼我決定先只打磨一站。'
pubDate: 2026-07-11
category: 'frontend'
heroImage: '/blog/2026-07-11-threejs-night-market-flagship-3d.png'
tags: ['Three.js', 'WebGL', 'PBR', '互動網頁', '前端筆記']
---

我最近在做一個小東西：**士林夜市五大名物的 3D 導覽站**。章魚燒、珍奶、大雞排、雪花冰、臭豆腐，一站一個頁面，往下捲就是一段這個小吃的導覽。

有兩個自我設限的規則，是這個專案好玩的地方：

1. **每一站都是單一自包含的 HTML 檔**，不切模組、不打包，一個檔案就能跑。
2. **零資產**：沒有 `.glb`、沒有貼圖、沒有 HDR 環境圖。所有幾何跟材質都是程序化生成，Three.js 靠 CDN 拉，靜態服務用一支 `server.js` 就打發。

零資產這條看起來像自虐，但它其實是整個專案的重點——**一顆章魚燒長什麼樣，全部是用程式碼「捏」出來的**，包含那層濕亮的醬、鐵盤的拉絲反光、會飄的柴魚片。這篇就記錄我怎麼把其中一站（章魚燒）從能動的原型，打磨到我自己覺得「這才叫旗艦級」的程度。

## 一、痛點：能動 ≠ 有料

第一版五站都跑得起來，但擺在一起看就是一股濃濃的「WebGL 玩具味」。問題不在幾何，在**光跟材質**。

具體來說，老寫法踩了幾個雷：

- 用的是 `r128` 那個年代的 global `THREE`，色彩管理是關的，顏色直接照 sRGB 數值往螢幕丟，暗部糊、亮部死白。
- 材質是 `MeshStandardMaterial` 配一顆點光源，沒有環境反射。塑膠感很重——珍珠是塑膠、醬汁是塑膠、連鐵盤都是塑膠。
- 「發光」是全畫面加 bloom，結果整顆章魚燒都在發光，糊成一團。

換句話說，它缺的不是更多幾何，是光沒打對地方。所以我決定不鋪量，先把章魚燒這一站當試點，一路升到頂，再拿這套規格去套其他四站。

## 二、技術決策：先把地基換成現代 Three.js

要做對光，第一件事是把渲染管線換成現代寫法。老的 `r128` global script 沒辦法乾淨地用 `EffectComposer` 跟新的色彩 API，所以我直接跳到 `three@0.160`，用 importmap 在單一 HTML 檔裡引 ESM，不需要 bundler，還是一個檔案：

```html
<script type="importmap">
{
  "imports": {
    "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
    "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
  }
}
</script>
<script type="module">
  import * as THREE from 'three';
  import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
  // ...
</script>
```

這一步是所有後續效果的前提：有了 ESM，`RoomEnvironment`、`PMREMGenerator`、`UnrealBloomPass`、`OutputPass` 這些 addon 才進得來，而且「單檔零資產」的規則一點都沒破——importmap 只是把 CDN 上的模組接進來而已。

接著把色彩管理打開，這是老版本最該補的一課：

```js
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
```

**ACES tone mapping** 讓高光滾得漂亮、不會一亮就爆掉；所有材質的貼圖顏色統一走 sRGB、光照在線性空間算。光是打開這三行，暗部的層次就回來了。而且我把 `toneMappingExposure` 做成**逐章節平滑過渡**——捲到不同小吃的段落，曝光值跟著微調，鐵盤區暗一點、成品特寫亮一點，像有人在幫你調燈。

## 三、關鍵實作一：零資產的環境反射

塑膠感的根源是「沒有東西可以反射」。真實世界裡任何一個有光澤的表面，反射的都是周遭環境——但我不能用 HDR 環境圖，那違反零資產。

解法是 Three.js 內建的 `RoomEnvironment`：它**用程序化的方式生一個室內光照場景**（幾面帶不同亮度的牆跟區塊光），完全不需要任何檔案。再用 `PMREMGenerator` 把它預先摺積成一張環境貼圖，塞給 `scene.environment`：

```js
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const pmrem = new THREE.PMREMGenerator(renderer);
const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environment = envTex;   // 全場材質自動吃這張環境做 IBL
pmrem.dispose();
```

`scene.environment` 一設下去，**場上每一顆 PBR 材質都自動有了 image-based lighting**——珍珠的邊緣開始有柔和的高光帶、醬汁會反射出「室內」的亮塊、鐵盤終於像金屬。整個場景的質感是在這一步跳級的，而它的成本只是啟動時預算一張貼圖，之後每幀零開銷。

零資產這條規則到這裡也不再是限制，反而讓我有點得意：這張環境是算出來的，不是下載來的。

## 四、關鍵實作二：只讓霓虹發光的選擇性 bloom

夜市的靈魂是霓虹招牌。我要那個光暈，但**只要招牌發光，不要整顆章魚燒發光**。

老版本的錯誤是把 bloom 當全畫面濾鏡。正解是用 `EffectComposer` 串一條後製鏈，並把 `UnrealBloomPass` 的 `threshold` 拉高，讓它**只挑亮度超標的像素**——也就是我特意把材質 `emissive` 開很亮的霓虹字：

```js
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloom = new UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight),
  0.8,   // strength
  0.4,   // radius
  0.9    // threshold：只有亮度 > 0.9 的像素才進 bloom
);
composer.addPass(bloom);
composer.addPass(vignettePass);   // 四角壓暗，把視線收進中央
composer.addPass(new OutputPass()); // 統一在最後做色彩空間轉換
```

`threshold: 0.9` 是整個效果的開關：章魚燒本體再亮也到不了那個值，只有 emissive 拉爆的霓虹招牌會被撈出來做光暈。發光於是變成一個「你指定誰發光」的決定，不再是全畫面糊一層。最後那顆 `OutputPass` 也很關鍵，後製鏈是在線性空間跑的，色彩空間轉換要留到最後一步統一做，順序錯了顏色就會偏。

再補一句軟陰影：`renderer.shadowMap.type = THREE.PCFSoftShadowMap`。硬邊陰影在食物特寫上很出戲，PCF 軟陰影讓章魚燒落在鐵盤上的影子是散開的，那口熱氣騰騰的感覺才對。

## 五、關鍵實作三：把「章魚燒」捏得像章魚燒

有了對的光，材質才有舞台。這一站的重點就是用 `MeshPhysicalMaterial` 的進階參數，把每個部位的「手感」分開做：

- **醬汁**：靠 `clearcoat` 加 `clearcoatRoughness`。章魚燒那層醬之所以誘人，是因為它是一層濕亮的透明膜蓋在焦褐的表面上——clearcoat 正是拿來模擬這種「漆面／濕潤塗層」的參數，光一打上去就有那種黏黏亮亮的反光。
- **鐵盤**：用 `anisotropy`。金屬鐵盤是被刷出紋路的，反光會沿著拉絲方向拉長，不是均勻的一點。開 anisotropy 之後那個工業感就對了。
- **麵糊**：用 `sheen`。烤過的麵糊表面有一層絨絨的柔光，sheen 就是專門做這種布料／表皮邊緣柔光的。

幾何上也不是光滑球。我用 **noise displacement** 把章魚燒表面推出坑坑疤疤的不規則，再用 **vertex color 把焦化烘進頂點**——凸起、受熱多的地方頂點色調深，做出真實的焦褐斑駁，而不是貼一張焦痕貼圖（那又違反零資產了）。

![我戴著圍裙在鐵盤上「捏」章魚燒，柴魚片在熱氣裡飄，完全不用任何貼圖](/blog/2026-07-11-threejs-night-market-flagship-3d-chuangzai.png)

最後一個我最喜歡的細節：**柴魚片會飄**。柴魚片是幾片薄的彎曲面片，每幀根據時間跟一點噪聲做輕微的形變跟擺動，模擬熱氣上升時那個「跳舞」的樣子。它很小，但它是讓整個畫面從「一張渲染圖」變成「一份活的食物」的那一下。

## 六、運鏡：捲動要滑，不能綁死幀率

導覽的體感全在運鏡。我把相機沿著捲動做**章節式編排**：每個段落有一組目標相機位置與看向點，捲動進度決定相機在這些關鍵姿態之間怎麼移動。

這裡有個很多人會踩的雷：如果你用固定係數做 `camera.position.lerp(target, 0.1)`，這個阻尼**會綁死在幀率上**——120Hz 的機器追得快、60Hz 的追得慢，同一個捲動在不同裝置上手感不一致。正確做法是讓阻尼跟 `dt` 掛勾，做成**幀率無關的指數趨近**：

```js
// 幀率無關阻尼：不管幾 fps，追到目標的「時間」都一樣
const k = 1 - Math.exp(-damping * dt);
camera.position.lerp(targetPos, k);
current.flavor += (targetFlavor - current.flavor) * k;
```

同一條公式我也拿來做 `flavor` 的平滑過渡——每個小吃有一組「風味參數」（曝光、主色調、bloom 強度那些），捲動切換小吃時，這些值不是硬切，是用同樣的幀率無關趨近柔和地漸變過去。捲動於是變成一件「滑順」的事，而不是一格一格跳。

## 七、效能與無障礙的取捨

炫是有代價的，這幾道護欄是我認為不能省的：

- **`prefers-reduced-motion`**：偵測到就降級——關掉自動運鏡跟柴魚片的擺動，改成靜態的清楚畫面。動效要能被使用者關掉，這是底線。
- **coarse pointer 降級**：偵測到觸控（粗指標）裝置，就把後製的重度效果調弱或關掉。手機的 GPU 跑滿 PMREM + bloom 會發燙掉幀，寧可畫面樸素一點也要順。
- **`pixelRatio` 上限**：`Math.min(devicePixelRatio, 2)`。Retina 螢幕的 DPR 常常到 3，不夾住的話等於多算一倍以上的像素，划不來。
- **`pagehide` 時 dispose**：離開頁面時主動 `dispose()` 掉 geometry、material、render target、composer。單檔頁面之間跳來跳去，不清會累積 GPU 記憶體，最後整個分頁崩掉。

這些沒有一個是「效果」，但少了任何一個，這頁在真實裝置上就是個會發燙、會卡、關不掉的東西。**旗艦級的一半，其實是這些看不到的護欄。**

## 八、方法論：為什麼我只先打磨一站

最後講一下做法上的取捨，因為這比任何一段 shader 都值錢。

五站的量擺在那，最直覺的做法是五站一起往前推。我沒有——**我只把章魚燒一站打磨到頂**。原因是：在你把一站做到「旗艦級」之前，你根本不知道旗艦級長什麼樣、需要哪些參數、會踩到哪些雷。先鋪量，等於把還沒驗證的規格複製五份，之後每改一個決定都要改五個地方。

**試點先行**的好處是，章魚燒這一站做完，它就變成一份「活的規格書」：色彩管理怎麼設、環境反射怎麼接、bloom threshold 該多少、降級護欄有哪些——全部有了現成答案。剩下四站不是「重做」，是「套版 + 換材質參數」，快得多也穩得多。

執行上我也把重活拆給專精的分工去做：程序化建模、shader 材質、後製管線，這些各自是很深的坑，與其一個人樣樣半桶水，不如把明確界定的子任務派給對應的專精角色，主線只負責定規格、驗收、把它們縫成一個順的體驗。縫得剛剛好，比每一塊都自己造重要。

## 九、一個非科班的做法：我在指揮，不是手刻

這裡想老實補一句。這站的 shader、材質、後製，我不是科班出身、也不會建模，是用 Claude Code 的 agent 一起做出來的。我的工作變成把想要的效果用文字說清楚：我要醬汁濕濕亮亮像一層透明膜、我要鐵盤的反光沿著刷痕方向拉長，然後讓 agent 把它翻成 clearcoat、anisotropy 這些參數。

有意思的地方就在這。要把一個效果描述清楚，你得先真的懂它在講什麼。所以與其說我在叫 agent 做事，不如說我被逼著去理解 PBR、環境光、後製這些基本功。我不用從零學一套建模軟體，可以把力氣花在領域的核心概念上，邊做邊學、邊玩邊查。對一個沒有美術背景的人來說，這是我目前找到最好玩、也最有效率的學法。

---

整站拆完，沒有一塊是魔法：importmap 讓單檔也能用現代 ESM、`RoomEnvironment` + PMREM 把環境反射「算」出來、threshold 讓 bloom 只挑霓虹、clearcoat/anisotropy/sheen 各自負責一種手感、幀率無關阻尼讓捲動滑順。難的從來不是任何單一效果，而是把它們湊在一起，還要在手機上不發燙、還能被使用者關掉、還讓人真的想咬一口。程序化 3D 的功夫，多半也都花在這種「湊得剛剛好」的地方。
