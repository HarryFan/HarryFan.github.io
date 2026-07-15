---
title: '捲動就是駕駛鏡頭：我用「影片 scrub」做了一個從咖啡果飛到咖啡杯的網站'
description: '不寫一行 WebGL，也能做出電影感的滾動飛行。這篇拆解 scroll-world 的做法：用 AI 生成五個共用同一段美術指令的黏土場景，把它們變成一鏡到底的短影片，再讓捲動去刷影片的 currentTime，捲多少、鏡頭就飛多少。附完整提示詞配方、引擎旋鈕，以及三次反覆修正踩到的坑。'
pubDate: 2026-07-13
category: 'frontend'
heroImage: '/blog/2026-07-13-scroll-world-video-scrub.png'
tags: ['滾動動畫', 'AI 生成', '前端筆記', '影片 scrub', 'scroll-driven']
---

做滾動網站，大家第一個想到的多半是 Three.js：真的在瀏覽器裡跑一個 3D 場景，捲動去驅動相機。這條路我走過，效果好，但代價也真實：建模、材質、光照、效能預算，每一項都是時間。

這次我試了另一條路，做出來的東西反而更「電影」：不跑任何即時 3D，改用預先算好的影片，讓捲動去刷影片的播放進度。捲多少，鏡頭就飛多少。畫質是離線算圖等級的，瀏覽器只負責 seek 一支影片。

先看成品，一個叫 Meridian Roasters 的咖啡品牌站，往下捲就從山坡上的咖啡果，一路飛到手上那杯咖啡：

<video controls autoplay muted loop playsinline width="100%" poster="/blog/2026-07-13-scroll-world-video-scrub/poster.png">
  <source src="/videos/2026-07-13-scroll-world-video-scrub-demo.mp4" type="video/mp4">
  您的瀏覽器不支援 video 標籤。
</video>

整段沒有一個 WebGL context。訪客能駕駛的只有一件事：時間。這篇就把這套做法拆開講。

## 先講取捨：什麼時候該用影片 scrub，什麼時候不該

一句話分界，就看訪客要不要「操作場景本身」。

- 要（旋轉產品、換配色、拖曳、hover 反應）→ 老實跑 live WebGL，沒有捷徑。
- 不要，只是「被帶著飛過去看」→ 影片 scrub 贏在畫質與零效能預算。鏡頭路徑是固定的藝術指導，訪客只推進時間。

這個咖啡站屬於後者：它是一段被藝術指導過的「片子」，不是一個可把玩的 3D 玩具。認清這點，整個技術選擇就順了。

## 訣竅一：一致性不是靠打磨，是靠一段一字不差的前綴

五個場景是分開生成的。它們能像「同一個世界」，靠的不是每一張各自調到好，而是每一張的提示詞都以同一段美術指令開頭，一個字都不改：

```
Isometric low-poly 3D diorama floating as a small rounded island on a plain solid
#F4ECE2 cream background with a soft contact shadow beneath it. Soft matte clay 3D render,
rounded toy-model shapes, gentle warm studio lighting, soft long shadows, tilt-shift
miniature look. Cohesive color palette of cream #F4ECE2, espresso #2B1D14, olive #6F7D5A,
gold #C79A4A, burnt-orange #C2551F, caramel #B5794E. Highly detailed, centered
composition, absolutely no text, no letters, no numbers, no logos.
```

只換每個場景的一句 `Subject:`（山坡莊園、水洗場、烘豆室、手沖吧、咖啡杯），其餘一字不動。這段的底色 `#F4ECE2` 我同時設成頁面的 CSS 底色，於是場景底＝頁面底，海報無縫接合。改寫這段前綴，是打破「同一個世界」錯覺最快的方法。別為了「這張想再文青一點」就動它。

順帶一提 `absolutely no text, no letters, no numbers, no logos` 這條尾巴一定要留，生成器超愛在招牌、麻布袋、罐子上幻覺出亂碼文字。

## 訣竅二：每個場景兩道 AI，先靜態圖再一鏡到底的影片

流程是：先用影像模型生一張 3:2 的靜態圖，再用影片模型，拿那張靜態圖當 `--start-image`，生一段 8 秒的 scrub 影片。影片提示詞的重點就一件事：一鏡到底、往前推進、不剪接。

```
Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the
whole scene like a tiny model. The camera slowly glides forward and descends toward it,
sweeping in toward [FOCAL], as if flying inside. As the camera pushes in, the roof and upper
structure gently lift and open away to reveal the warm interior. Soft matte clay diorama,
tilt-shift miniature, warm light, ...palette. Smooth, graceful, slow motion. No text, no captions.
```

`[FOCAL]` 換成該場景的焦點（採果的人／乾燥床／發亮的滾筒烘豆機／鵝頸壺落下的水柱／那只巨杯）。為什麼死守「一鏡到底、不倒退」？因為下一步要用捲動去刷它：引擎把捲動位置線性映射到影片的 `currentTime`。如果影片中途倒退或跳接，你往下捲卻看到鏡頭往回退，體感會非常怪。單向平穩推進，刷起來才像飛。

還有一個很吃虧的細節：為畫面中央構圖。頁面每支影片都是 `object-fit: cover`，直式手機會裁掉左右、只留中間一半。焦點主體務必置中、上方留點空間，重要的東西別擺到最左右邊緣，不然手機上直接被切掉。

## 訣竅三：引擎怎麼把「捲動」變成「飛行」

引擎本身是一支零依賴的 vanilla JS。核心就三件事：

1. 每個場景吃掉一段捲動距離，這段距離內的捲動偏移，線性映射到影片的 `currentTime`。
2. 影片用 Blob 載入（`URL.createObjectURL`），這樣一定可 seek，不必依賴伺服器支援 HTTP range。
3. 監聽捲動，在 rAF 裡把 `video.currentTime` 設到對應時間點，是 scrub，不是 `play()`。

幾個好用的每場景旋鈕：

- `scroll:` 這個場景花掉幾個「視窗高」的捲動。數字越大，停留越久、鏡頭走越慢。我把莊園、烘豆、咖啡館這三段拉到 1.5–1.6，讓它們更耐看。
- `linger:` 一個 0..1 的值，把「捲動→時間」重新映射：中段（正好是文案高峰處）慢下來、兩端快一點。等於讓鏡頭在最想被看到的那一刻沉住。我用到 0.4–0.45，超過 0.6 會有明顯頓感。

手機端還有幾個非做不可的防呆：合併 seek（decoder 還在 `seeking` 就不要再丟新的 `currentTime`，否則快速滑動會把影片卡死）、首幀畫出前用靜態圖當 poster（不然 iOS 會先閃一格空白），還有手機版影片編碼要更小、GOP 更短（`-g 4`）。手機解碼器 seek 的成本幾乎全在「離最近的關鍵影格多遠」，關鍵影格密一點，刷起來就順很多。

## 三次反覆修正，我學到的

這站不是一次到位，是磨了三輪才收斂：

1. 第一輪，提示詞和靜態圖：把五張的風格、色盤、構圖對齊。這輪的產出就是那段一字不差的前綴。
2. 第二輪，影片鏡頭連續性：確保每段都是乾淨的單向前推。中途會倒退或甩鏡的就重生成，那種刷起來一定怪。
3. 第三輪，scrub 手感和手機：調 `scroll`/`linger` 的節奏，補上手機的 seek 合併與 poster。

最大的體會是：這類「片子型」網站的品質，八成在提示詞的紀律，不在前端程式碼。引擎寫好一次就不太動了，真正決定成敗的，是那段前綴有沒有被守住、每支影片是不是乾淨的一鏡到底。

我把整套做法收成了一個可重複的技能（提示詞配方、生成腳本、引擎），這個咖啡站就是它的參考範本。要做新的世界，複製它、把五句 `Subject:` 和文案換成你的生意，守住前綴的紀律，重生成靜態圖與影片就好。
