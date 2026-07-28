---
title: '不會 Dart 也做得出 Flutter Web，但 Canvas 有四筆過路費要付'
description: 'AI 補掉了語言門檻，我不會 Dart 也做完了一個 Flutter Web 訂票 App。但按下 F12 就會發現，Vue 跟 React 交出的是 DOM 節點，Flutter 交出的是一張畫布，而畫布要付 SEO、無障礙、首屏、文字選取這四筆過路費。文末給三個順序不能換的選型問題，幫你決定這個專案該不該用 Flutter Web。'
pubDate: 2026-07-28
category: 'frontend'
heroImage: '/blog/2026-07-28-flutter-meetup-36-three-worldviews.jpg'
tags: ['Flutter', 'Flutter Web', 'Vue', 'React', '技術選型', '演講']
---

> 我不會 Dart。這半年我還是把一個訂票 App 做完了，跑在 Flutter Web 上。

這句話在三年前不成立。語言門檻被 AI 補掉之後，「不會寫」就不再是拒絕一個框架的理由，問題整個往上移了一層：這個專案到底該不該用 Flutter Web。

這篇要回答的就是這一題。中間會攤開同一個訂票流程的 Vue 跟 Flutter 真實 code，誠實列出 Canvas 要付的四筆過路費，最後給三個順序不能換的選型問題。

內容來自 7/28 天瓏二樓的 Flutter Meetup #36，我的 30 分鐘講題《Hot Reload 之後 — Flutter Web、Vue、React 的三種世界觀》。

台下有 Flutter 工程師、有講師、有各種軟體工程師，資深前端只有我一個。所以這場不可能是 Flutter 教學，論 Flutter 台下比我熟的人一大票。我能帶進去的是他們沒有的那個視角：一個每天在 DOM 裡討生活的人，第一次認真用 Flutter Web 是什麼感覺，又是在哪幾個地方撞到牆。

上個月同一個場地，我還是坐在後排抄筆記的那個人（[Meetup #35 的整理在這裡](/blog/2026-06-30-flutter-meetup-35)）。這篇是講稿的完整版，把 30 分鐘裡被時間壓掉的東西補回來。

## 為什麼是我來講這個

我很早就想做 Flutter，卡住我的從來不是它難，是 Dart。我有正職，光把 JavaScript 寫好就佔滿了，沒有多餘心力再養一個語言。那本 Dart 的書買回來放著，一直沒拆。

現在不一樣了。語法交給 AI，我把十幾年的經驗留在該用的地方：驗收、微調、品味。冒煙測試、健全性測試也讓 AI 跑，我做最後那關的品保。開頭說的那個訂票 side project 就是這樣搬去 Flutter Web 的，專案叫 Waypoint Air。

![輸送帶把 AI 寫好的半成品送到我面前，我不碰輸送帶，只拿量尺量、拿筆劃記、蓋一個章；地上那本 Dart 厚書我一直沒拆封](/blog/2026-07-28-flutter-meetup-36-three-worldviews/01-why-me.png)

這件事要先說明白，因為它決定了我今天能講什麼、不能講什麼。Waypoint Air 是拿來練手的，沒有上線。所以我談的是開發體感跟世界觀，談不了流量規模下的效能數據。沒有 bundle size 表格，沒有 Lighthouse 分數。想看那個的，這場不是。

兩個 demo 現場都開著，也放在這裡給大家自己玩：

- Flutter 版：<https://flight-booking-flutter.vercel.app/>
- Vue 對照組：<https://flight-booking-vue.vercel.app/>

同一個訂票流程，兩套實作。等下所有的 code 對照都是從這兩包直接挖出來的，不是簡化過的教學範例。

先說一件不太光彩但該講的事：寫這篇的時候，Flutter 版那個連結是掛的，點下去會吃到 Vercel 的 `404: NOT_FOUND`，Vue 版則一直正常。我試了 `/`、`/index.html`、`/main.dart.js`，連靜態資源都 404，回應標頭是 `x-vercel-error: NOT_FOUND`，所以這是那個網域後面沒有部署，跟 Flutter Web 本身的技術特性無關，別把它算進等下要講的代價裡。是我自己的部署沒顧好，還在追。真的打不開的話，看上面那支影片，或直接玩 Vue 版對照。

現場我先放了一支 20 秒的 demo 影片，讓成品自己說話。搜尋介面、航班結果、選 BEST VALUE，全部是 Flutter Web 跑出來的畫面，而這整包東西是用後面要講的那套 agentic workflow 做完的：

<video src="/blog/2026-07-28-flutter-meetup-36-three-worldviews/waypoint-air-demo.mp4" poster="/blog/2026-07-28-flutter-meetup-36-three-worldviews/waypoint-air-poster.jpg" controls muted loop playsinline preload="metadata" style="width:100%;height:auto;display:block;margin:1.5rem 0;border:3px solid #2a2620;">你的瀏覽器不支援內嵌影片，<a href="/blog/2026-07-28-flutter-meetup-36-three-worldviews/waypoint-air-demo.mp4">點這裡直接觀看</a>。</video>

## Act 1：先講 Hot Reload，因為那道門檻沒了

### 舊的痛，前端一定有身體記憶

以前的 Flutter Web：改一行顏色，整頁重整。

你剛填好的表單、剛捲到的位置、剛點進去的第三層頁面，全部歸零。

前端習慣的 Vite HMR 是「改完馬上看到」，這裡是「改完重來一次」。那種感覺很像你辛苦把撲克牌城堡疊到第九層，手才剛放開，一陣風來就整座垮掉。

我在台上刻意在這段停久一點。這段講的不是效能數字，是開發流程被打斷時的那種身體記憶，而這個記憶每個前端都有。

![我爬階梯爬到快頂端，腳下整段階梯收回原點，我被一條紅色迴圈箭頭彈回地面，頭上的視窗還在轉圈](/blog/2026-07-28-flutter-meetup-36-three-worldviews/02-old-pain.png)

### 三個版本，把石頭撬開

- Flutter 3.35（2025-08）：Web 的 stateful hot reload 預設開啟，不再需要實驗性 flag。navigation stack、表單輸入、捲動位置，reload 後都保留。
- Flutter 3.44（Google I/O 2026）：`--web-hot-reload` 這個 flag 直接被拿掉，因為已經是內建行為。同一版 WebAssembly（Wasm）正式 stable。
- 2026 roadmap：Wasm 要成為 Flutter Web 的預設編譯目標。

Wasm 這件事值得多解釋一句，因為現場有人不熟。它是一種低階的二進位格式，可以把 C、C++、Rust 這類語言編譯成瀏覽器能安全執行的模組，在沙箱裡以接近原生的速度跑。你可以想成：高效能的部分交給 Wasm，JavaScript 繼續負責跟網頁世界互動。兩個不互斥，是互補的。

對 Flutter 這種本來就不走 DOM、自己掌控渲染的框架，這代表 Web 上的執行底盤更成熟，也更接近它原本的運作方式。

重點是：這件事不是「實驗中」，是「已經預設」。

（Hot Reload 轉正這件事我在 [Flutter Web Hot Reload 正式版那篇](/blog/2026-07-12-flutter-web-hot-reload-ga)寫得更細，這裡不重複。）

### 熱重載到底做了什麼

現場我花了一分鐘專門講機制，因為不理解機制，「狀態為什麼保得住」就會變成魔法。

官方定義很直接：熱重載把更新後的原始碼檔案，注入到正在跑的 Dart 運行時（runtime）。運行時拿到新的欄位跟函數之後去更新對應的類別，接著 Flutter framework 自動重建 widget 樹，畫面就跟上了。

整條鏈是這樣：

```
改一行 → 注入 Dart Runtime → 更新類別 → 重建 Widget 樹 → 立刻看到
```

這條鏈裡沒有一步叫「重新啟動」，所以路由堆疊、表單輸入、捲動位置、彈窗開著還是關著，全部都在。對前端來說這就是 Vite HMR 的體感，只是它保的是 widget 狀態，不是模組。

（官方文件：<https://docs.flutter.cn/tools/hot-reload/>）

![熱重載四步：改一行 → 注入 Runtime → 重建 Widget 樹 → 狀態保留，底下那條「重新啟動應用程式 → 全部歸零」被劃掉，代表這條路沒有走](/blog/2026-07-28-flutter-meetup-36-three-worldviews/03-hot-reload-mechanism.png)

### Agentic Hot Reload：迴圈換人按了

3.44 還多了一個東西叫 Agentic Hot Reload，這是我覺得最值得前端注意的一段。

原本這個迴圈是人按的：你改 code、按存檔、App 毫秒級更新，然後你用肉眼確認結果。

Agentic Hot Reload 把這個迴圈交給 AI 編碼代理人，而且不是「一次性生 code 就結束」。透過新的 Dart MCP server，代理人可以讀整個專案、就地改 code、對正在跑的 App 直接 hot reload，再把現場診斷拉回來：widget tree、render 效能、network log、exception，接著自己跑下一輪。

迴圈從「我改 → 我看」，變成「它改 → 它看 → 它再改 → 我最後 approve」。

厲害的地方不在 AI 會寫 code，在它第一次能對 running app 建立秒級的除錯回饋迴圈。這對前端的意義比對 mobile 更大，因為前端本來就活在瀏覽器的即時回饋裡。

實際用起來像這樣：我丟一句「修一下小尺寸平板橫向時訂單摘要的 overflow」，它改 widget tree、hot reload、看結果、發現 regression，再把那個也補掉。

角色也跟著變了。我不再是每塊磚都自己搬的泥水匠，比較像在旁邊驗收、下判斷、最後簽核的建築師。老實說我到現在還沒完全習慣這個位置，手很癢，常常忍不住自己去改那兩行。

Waypoint Air 就是這樣做完的。

![我坐在椅子上雙手放腿上不動，一隻機械手臂伸進來替換我頭上視窗裡的零件，一條迴圈箭頭把它跟我接成閉環](/blog/2026-07-28-flutter-meetup-36-three-worldviews/04-agentic-hot-reload.png)

### 所以「不好寫」這個理由，站不太住了

過去大家不選 Flutter Web，很多時候理由是「開發起來不順」。這個理由現在不成立了。那差別到底在哪？在世界觀。

## Act 2：三種世界觀

### 先做一件事：同一個畫面，F12 打開是兩個世界

現場我開兩個 demo，各按一次 F12。

- Vue 跟 React 的產物是 DOM 節點。瀏覽器認得，DevTools 選得到，爬蟲讀得到。
- Flutter Web 的產物是一張畫布，你選不到任何一個 div。

**左邊是元素，右邊是像素。**

這一點決定了後面所有的優點跟代價，今天要講的一切都從這裡長出來。

![左邊我用鑷子夾起一疊積木中的一塊，其他塊留在原位；右邊同樣的畫面我對著一整片畫布伸鑷子，夾了個空](/blog/2026-07-28-flutter-meetup-36-three-worldviews/05-dom-vs-canvas.png)

### 同一題，三個答案

三者都在解同一題：資料變了，畫面怎麼跟上。

| | 機制 | 一句話 |
|---|---|---|
| Vue | 響應式模板。Proxy 記住誰用了哪個值，只更新受影響的地方。 | 追蹤依賴 |
| React | 宣告式函式。狀態變，重新執行函式，靠 Virtual DOM 對帳。 | 重跑函式 |
| Flutter | 宣告式 Widget。狀態變，重建 widget 樹，最後畫到 canvas。 | 重建重畫 |

差別在心智負擔擺在哪：框架幫你追，還是你負責描述當下。Vue 幫你記，React 要你重跑，Flutter 要你描述，`build()` 回傳「此刻該長怎樣」，完全不管上一幀。

![同一顆球從三條輸送帶的起點放下：一條中途有放大鏡在追蹤依賴，一條有天平在對帳，一條末端直接是一塊畫布](/blog/2026-07-28-flutter-meetup-36-three-worldviews/06-three-worldviews.png)

### 樣式住在哪裡

這是前端最有感、也最不習慣的一點。

- Vue：`<style scoped>`，樣式跟結構分開住。
- React：CSS-in-JS 或 utility class，樣式靠近元件但仍然是 CSS。
- Flutter：沒有 CSS。padding、顏色、圓角，全部是 widget 的參數。

換句話說，你在傳參數，不是在寫樣式表。

我在台上用的比喻是：Vue / React 比較像從抽屜拿衣服幫元件穿上；Flutter 比較像填一張規格表，直接描述它此刻該長什麼樣。

![三個容器橫排：獨立抽屜、黏在方塊旁的抽屜、以及沒有抽屜，我直接把布料塞進方塊上的投幣孔](/blog/2026-07-28-flutter-meetup-36-three-worldviews/07-where-style-lives.png)

### 什麼算一個「元件」

- Vue 的 SFC：一個檔案三段，template / script / style，邊界很清楚。
- React：一個函式就是一個元件，邊界靠你自己拆。
- Flutter：萬物皆 Widget，連 padding、置中、對齊都是一個 widget。

所以 Flutter 的巢狀會很深。我第一次看的時候手很癢想重構，但那就是它的表達方式。

![三組俄羅斯娃娃式的巢狀盒子，層數從三層一路疊到八層，我站在最深的那組旁邊，正要把最外層蓋子蓋上](/blog/2026-07-28-flutter-meetup-36-three-worldviews/08-component-boundary.png)

### 真實 code 對照一：同一顆狀態，兩種寫法

講到這裡，我把 Waypoint Air 裡的真實 code 攤開。

Vue 3 + Pinia（`src/store/booking.ts`）：

```ts
export const useBookingStore = defineStore('booking', {
  state: () => ({
    departure: '台北 (TPE)',
    destination: '',
    passengers: 1,
    selectedFlight: null,
  }),
  actions: {
    setDestination(dest: string) {
      this.destination = dest
      // 直接賦值，UI 自動更新
    },
    setPassengers(count: number) {
      this.passengers = count
    },
  },
})
```

Flutter Web + Riverpod（`lib/main.dart`）：

```dart
class BookingState {
  final String departure;
  final String destination;
  final int passengers;

  BookingState copyWith({ String? destination, ... }) =>
    BookingState(
      destination: destination ?? this.destination, ...);
}

class BookingNotifier extends Notifier<BookingState> {
  void setDestination(String dest) {
    state = state.copyWith(destination: dest);
    // 不改舊的，換一顆新 state
  }
}
```

可變 proxy 改一個欄位一行搞定。不可變 copyWith 要多打好幾行字，換來的是可預測的狀態流。

### 真實 code 對照二：URL 去哪了

這組是我覺得前端最該看的一組。

vue-router（`src/router/index.ts`）：

```ts
const routes = [
  { path: '/',        component: HomeView },
  { path: '/flights', component: FlightListView },
  { path: '/confirm', component: FlightConfirmView },
  { path: '/success', component: SuccessView },
]

createRouter({
  history: createWebHistory(),
  routes,
})

// 跳轉後 URL 改變：可分享、可重新整理、可上一頁
router.push('/confirm')
```

Flutter Navigator（`lib/main.dart`）：

```dart
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => const FlightListPage(),
  ),
);

// 頁面推進堆疊，URL 停在原地。
// 想要 /flights 這種網址，
// 要自己上 go_router 宣告 path：

GoRoute(
  path: '/flights',
  builder: (_, __) => const FlightListPage(),
)
```

vue-router 的路由天生綁 URL，可分享、可重新整理、可上一頁；Flutter 預設是頁面堆疊，URL 是後加的選配。這是 Web 血統跟 App 血統最直接的分水嶺：在 Web 世界裡「網址會變」是預設值，在 Flutter 裡那是你要自己補的。

### 真實 code 對照三：同一顆 header，兩種組件

Vue SFC（`src/views/FlightListView.vue`）：

```vue
<template>
  <header class="flex items-center mb-6">
    <button @click="router.push('/')">←</button>
    <div>
      <h1 class="text-xl font-bold">選擇航班</h1>
      <p class="text-xs text-gray-400">
        台北 (TPE) ➔ {{ store.destination }}
      </p>
    </div>
  </header>

  <div v-if="isLoading" class="space-y-4">
    <div v-for="i in 3" :key="i">
      <SkeletonLoader />
    </div>
  </div>
</template>
```

Flutter `build()`（`lib/main.dart`）：

```dart
Widget build(BuildContext context) {
  final destination =
      ref.watch(bookingProvider).destination;

  return Column(children: [
    Row(children: [
      IconButton(icon: Icon(Icons.arrow_back),
        onPressed: () => Navigator.pop(context)),
      Column(children: [
        Text('選擇航班',
          style: TextStyle(fontWeight: FontWeight.bold)),
        Text('台北 (TPE) ➔ $destination'),
      ]),
    ]),
    if (_isLoading)
      ListView.separated(itemCount: 3,
        itemBuilder: (_, i) => SkeletonCard()),
  ]);
}
```

對應關係其實很整齊：`v-if` 對上 Dart 的 collection if，`v-for` 對上 `itemBuilder`。

兩邊做的事完全一樣，差的是你腦中先想「文件」，還是先想「物件樹」。

### Flutter 唯一無法被取代的那件事

Vue、React 的戰場是 Web。要上手機，你得再選 React Native 或包一層。

Flutter 從第一天就不是為 Web 設計的，Web 只是它其中一個輸出。同一份程式碼，Web / iOS / Android 出來的像素幾乎一樣。

講白一點，這是聖杯等級的野心：不只要能跑，還要三端看起來幾乎一樣。而這個特性，是它所有優勢的來源，也是它所有代價的來源。

![我拿一個模具往下壓，壓出三個一模一樣的形狀，分別落在筆電、手機、平板上；旁邊的分身手上拿著兩個不同模具，顯得手忙](/blog/2026-07-28-flutter-meetup-36-three-worldviews/09-cross-platform.png)

### Canvas 的過路費：四筆，一筆都跑不掉

這張投影片決定台下信不信你，所以我講得特別慢。

畫布換來一致，代價要付四筆：

1. SEO：爬蟲讀不到內文，那是像素，不是文字節點。
2. A11y：螢幕閱讀器要靠額外的 semantics 樹橋接。
3. 首屏：要先載 runtime 跟字型，才畫得出第一幀。
4. 文字選取：預設選不起來，複製、翻譯外掛都要另外處理。

這四筆不是 bug，是架構選擇的必然帳單。

![我捧著一幅漂亮的畫走到收費亭前，往投幣口投下 SEO、無障礙、首屏等好幾枚硬幣，紅色橫桿還擋在路上](/blog/2026-07-28-flutter-meetup-36-three-worldviews/10-canvas-tax.png)

### 語言補得掉，生態補不掉

第二筆代價，而且要誠實區分 AI 補得掉哪一半、補不掉哪一半。

語言門檻這半，AI 補掉了，我不會 Dart 也做得出東西。

生態那半補不掉。npm 幾乎什麼都有，pub.dev 的 Web 端套件明顯薄。遇到坑，Vue / React 通常已經有人寫過答案，Flutter Web 常常要自己試，而 AI 也是拿同一批資料在猜。

所以成本不在「學不學得會」，在卡住的時候有沒有人踩過。

那本已經拆封攤開的 Dart 書幫不上我，因為我要找的東西不在書裡，在生態的空格裡。

![左邊的書櫃塞滿了書，右邊的書櫃到處是空格，我踩著矮凳拿手電筒往空格裡照；腳邊那本 Dart 書已經攤開，卻幫不上忙](/blog/2026-07-28-flutter-meetup-36-three-worldviews/11-ecosystem.png)

## Act 3：三個問題，順序不能換

我給台下的不是結論，是判斷工具。三個問題就能決定：

一、這頁需要被 Google 找到嗎？需要的話就不要 Flutter Web。這是否決題。

二、這個產品之後要上手機嗎？要的話 Flutter Web 立刻加分。

三、卡住的時候，有人踩過這個坑嗎？注意，問的不是「會不會寫」，那題 AI 已經幫你答了。

順序不能換。第一題先問，因為它最殘酷也最快；一旦答案是「要靠搜尋」，後面兩題其實不用再做了。

![路上三根號誌桿依序排開，我停在第一根紅色的前面抬頭看；第三根桿子底下有一個別人留下的舊腳印](/blog/2026-07-28-flutter-meetup-36-three-worldviews/12-three-questions.png)

### Flutter Web 明顯最優解的情境

- 已經有 Flutter App，要補一個 Web 版，幾乎不用想。
- 後台、儀表板、內部工具，登入牆後面，SEO 本來就不重要。
- 地圖、繪圖、遊戲類高互動介面，本來就不靠 DOM。

共通點很清楚：使用者不是從 Google 搜尋進來的。

### 留給 Vue / React 的情境

- 內容站、行銷頁、部落格、電商商品頁。
- 這些頁面的流量來源就是搜尋，Canvas 是死穴。
- 需要深度整合現有 Web 生態（第三方 SDK、瀏覽器 API、既有元件庫）也一樣。

這不是 Flutter 不好，是這題它本來就沒打算解。

## 今天的判斷有保存期限

Wasm 已經 stable，roadmap 上要變成 Web 的預設。這背後的意思是，瀏覽器越來越能接受「不是只跑 JavaScript」的高效能模組，Web 的地板正在往上抬。同時 agentic 開發的迴圈也在成形，我那個 side project 就是這樣做完的。這兩件事會繼續往下壓 Flutter Web 的門檻。

語言不再是門檻之後，選型的重點會整個往上移，從「我會什麼」變成「我判斷得準不準」。

所以我今天講的判斷有保存期限，明年這三個問題的答案可能就不一樣。再大膽一點想：如果哪天 AI 能把 canvas 畫面即時逆譯成可索引、可讀屏的語意結構，今天的死穴說不定會變成明天的突破口。技術判斷永遠綁著時間。

![我把寫著「今天的判斷」的便利貼，貼在牛奶盒側面的賞味期限欄位上，旁邊一條往上的趨勢線](/blog/2026-07-28-flutter-meetup-36-three-worldviews/13-whats-next.png)

## 三句話帶走

1. Hot Reload 補上、AI 補掉語言門檻之後，「不好寫」跟「不會寫」都不再是拒絕的理由。
2. 差別在 DOM 還是 Canvas，這決定了 SEO、無障礙跟跨平台。
3. 先問「使用者從哪裡來」，再選框架。

工具會一直變便宜，判斷不會。那才是我們這十年累積下來、AI 拿不走的東西。

我不是叫大家改用 Flutter，是叫大家把選型標準拉高。

![我站在三扇門前面，一扇都沒推開，手上拿著量尺在量門框](/blog/2026-07-28-flutter-meetup-36-three-worldviews/14-closing.png)

---

謝謝天瓏、謝謝 Flutter Taipei 跟 GDG Taipei，也謝謝留下來 Q&A 的每一位。

兩個 demo 再放一次，歡迎自己按 F12 對照：[Flutter 版](https://flight-booking-flutter.vercel.app/)（這支常掛，掛了就看文章開頭那支影片）｜[Vue 版](https://flight-booking-vue.vercel.app/)

![《妖你聽新聞》EP54 節目封面：45 歲找不到工作，是能力問題，還是市場問題？](/blog/2026-07-28-flutter-meetup-36-three-worldviews/podcast-ep54-cover.jpg)

最後私心推一下自己的 podcast《妖你聽新聞》EP54，聊中年求職。面試不是只有你被評分，你也有權利好好看看對方。[Spotify 這裡聽](https://open.spotify.com/episode/6Utm5Zjla66CqIMa2HI9Gg)。
