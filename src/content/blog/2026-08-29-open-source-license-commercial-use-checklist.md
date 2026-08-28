---
title: '「這個套件能商用嗎？」星星數回答不了的問題：開源授權選型筆記'
description: '技術選型會議上有人問「這套件能商用嗎」，答案常常是「兩萬星星，很多人在用」。這篇整理寬鬆授權、copyleft、source-available 三個等級的差別，GPL／LGPL／AGPL 在 SaaS 情境下的觸發條件，五個最常踩的坑，以及一份十分鐘就能跑完的授權檢查清單。'
pubDate: 2026-08-29
heroImage: '/blog/2026-08-29-open-source-license-commercial-use-checklist/cover.png'
category: 'career'
---

前幾天在 Threads 上看到 [@vicckuo 的一串貼文](https://www.threads.com/@vicckuo/post/DckIdDoIPlU)，場景是技術選型會議。PM 問：「這個套件能商用嗎？」工程師頭也不抬：「可以啊，GitHub 上兩萬星星，很多人在用。」追問下去，又補了一句「應該很多公司都在用吧，應該沒問題」。再追問如果是 GPL 系列授權，商用產品是不是得公開原始碼，回答是「這個要查一下」。

貼文作者說這種對話他遇過不只一次，我看完也只能點頭。我自己在選型會議上講過類似的話，也聽過別人講。這篇就把那串貼文戳到的東西，配合我後來查證過的資料，整理成一份選型時能直接拿來對照的筆記。

先聲明：我不是律師，這篇是工程師視角的整理。真的要進核心系統、要談併購、要簽客戶合約，還是把 LICENSE 檔案丟給法務。

## 星星數跟授權，是兩件不相干的事

星星多，代表這個套件受歡迎、社群活躍、出問題容易找到解法。這些都是選型的合理考量，但它們回答的是「好不好用」，不是「能不能用」。

「能不能用」只由一個東西決定：repo 裡那份 LICENSE 檔案寫了什麼。沒寫，或者寫的是你沒讀過的條款，那麼星星再多，你引進來的也只是一份自己沒讀過的合約。

「應該很多公司都在用」這句話更危險一點。那些公司是付了商用授權、簽了協議，還是根本沒理這件事直接硬上？大部分時候問的人也不知道。貼文作者那句講得準：「應該」聽起來像有根據的判斷，實際上只是把責任丟給空氣。

<figure>
  <img src="/blog/2026-08-29-open-source-license-commercial-use-checklist/01-stars-vs-license.png" alt="我站在天平旁邊冒汗：左邊一整盤星星輕飄飄地翹起來，右邊一張 LICENSE 紙把整個盤子壓到底" loading="lazy" />
  <figcaption>我站在天平旁邊冒汗：左邊一整盤星星輕飄飄地翹起來，右邊一張 LICENSE 紙把整個盤子壓到底</figcaption>
</figure>

## 三個等級：寬鬆、copyleft、source-available

授權條款很多，但商用選型只需要先分成三個等級。

| 等級 | 常見授權 | 商用時的核心義務 | 白話 |
|---|---|---|---|
| 寬鬆（permissive） | MIT、ISC、BSD-2/3、Apache-2.0 | 保留版權聲明與授權全文；Apache 另有 NOTICE 檔與專利授權條款 | 幾乎可以放心用，記得把聲明帶上 |
| Copyleft | GPL-2.0/3.0、AGPL-3.0、LGPL、MPL-2.0 | 衍生作品在特定條件下必須以相同授權釋出原始碼 | 要先搞清楚「條件」是什麼，才知道你有沒有踩到 |
| Source-available（有原始碼但不是開源） | BSL 1.1、SSPL、Elastic License 2.0、RSAL | 通常禁止你拿它做競爭性的服務或產品；不是 OSI 認可的開源授權 | 看得到程式碼不代表能隨便商用 |

第一級跟第三級都相對好判斷：寬鬆授權基本沒顧慮，source-available 則直接去讀它的「Additional Use Grant」或限制條款，看你的用法有沒有被排除。

<figure>
  <img src="/blog/2026-08-29-open-source-license-commercial-use-checklist/02-three-gates.png" alt="我抱著一箱程式碼走向三道門：MIT 綠門敞開，GPL 黃門半掩掛著條件牌，BSL 紅門上鎖" loading="lazy" />
  <figcaption>我抱著一箱程式碼走向三道門：MIT 綠門敞開，GPL 黃門半掩掛著條件牌，BSL 紅門上鎖</figcaption>
</figure>

真正讓人在會議上愣住的，是第二級。

## GPL、LGPL、AGPL 到底差在哪

Copyleft 的核心是「衍生作品要用同樣的授權釋出」，但**什麼時候觸發**這個義務，三個授權差很多。

**GPL（v2 / v3）**：觸發點是「散布（distribute / convey）」。你把包含 GPL 程式碼的軟體交到別人手上（賣給客戶、上架 App Store、提供安裝檔），就要提供對應的原始碼。反過來說，如果你只是把它跑在自己的伺服器上、透過網路提供服務，使用者沒有拿到程式本身，GPL 並不要求你公開原始碼。這就是所謂的「ASP loophole」或「SaaS loophole」。

**AGPL v3**：專門為了補上那個洞。第 13 條規定，如果你**修改了** AGPL 軟體，並讓使用者透過網路遠端互動，你必須向那些使用者提供修改後版本的完整原始碼。

這裡有一個常被講錯的地方，我特別去對了 AGPL 條文和幾篇法律分析：AGPL 第 13 條的觸發條件是「修改」。你把一套 AGPL 軟體原封不動安裝起來、對外提供服務，不需要公開任何東西。但只要你改了它，包含把它當成 library 嵌進自己的服務、跟自己的程式碼組合成一個新作品，義務就來了，而且範圍可能擴大到整個組合後的作品。

所以 Threads 貼文裡那個案例（把 AGPL 的資料處理套件寫進核心服務用了兩年），單純用 AGPL 不是問題。問題是把 AGPL 套件跟自家程式碼混成同一個東西，還對外提供服務。這就是技術盡職調查會直接列成紅字的組合。

**LGPL**：介於兩者之間，專門給 library 用。你的程式可以連結（link）LGPL 函式庫而不必開源自己的程式碼，條件是使用者要能替換那個函式庫。動態連結（例如 .so / .dll）通常沒問題；靜態連結或用 bundler 打包成一個檔案，就會進入灰色地帶，因為使用者沒辦法單獨換掉那個 library。前端專案用 webpack、Vite 把 LGPL 套件打進 bundle，就是這種情況。

**MPL-2.0**：copyleft 只作用在「檔案」層級。你改了 MPL 授權的檔案要釋出那些檔案的修改，但你自己寫的檔案不受影響。對商用來說比 GPL 友善很多，Firefox 和早期的 Terraform 都是 MPL。

還有一個前端工程師特別要注意的：GPL 的「散布」在 web 情境下不完全等於「零觸發」。你的後端程式碼跑在伺服器上不算散布，但打包後送到瀏覽器執行的 JavaScript，FSF 在 [GPL FAQ](https://www.gnu.org/licenses/gpl-faq.en.html#UnreleasedMods) 講得很明確：網站送到使用者瀏覽器執行的 GPL 程式（通常就是 JavaScript）算散布，原始碼必須依 GPL 條款提供給使用者。這塊我沒查到法院判例，但如果你的前端 bundle 裡有 GPL 套件，別假設 SaaS loophole 幫你擋掉了。

## MIT、MPL-2.0、BSL 1.1：三個等級各認識一個代表

上面講的都是「觸發條件」，但選型會議上更常遇到的狀況是：有人念出一個授權名稱，桌上沒人能在十秒內說出它到底要你做什麼。三個等級各挑一個最常碰到的，把基本概念放在同一張表裡。

<table class="qa-table">
	<thead>
		<tr>
			<th>授權</th>
			<th>它是什麼</th>
			<th>你要做的事</th>
			<th>你不能做的事</th>
			<th>誰在用</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-label="授權">MIT</td>
			<td data-label="它是什麼">1980 年代末 MIT 寫的寬鬆授權，全文不到 200 字，是 npm 生態最常見的一種。</td>
			<td data-label="你要做的事">複製或散布時，把原作者的版權聲明和這份授權全文一起帶著。就這樣。</td>
			<td data-label="你不能做的事">幾乎沒有。可以閉源、可以商用、可以改名賣。唯一要注意的是它沒有明文的專利授權條款，跟 Apache-2.0 不同。</td>
			<td data-label="誰在用">React、Vue、jQuery、Rails、大部分你裝過的 npm 套件</td>
		</tr>
		<tr>
			<td data-label="授權">MPL-2.0</td>
			<td data-label="它是什麼">Mozilla 在 2012 年定稿的「檔案層級 copyleft」。它管的單位是檔案，不是整個專案。</td>
			<td data-label="你要做的事">你改動了 MPL 授權的<strong>那個檔案</strong>，改動後的檔案要以 MPL 釋出、讓拿到你程式的人取得原始碼。你自己新寫的檔案不受影響，可以閉源。另外它有專利授權條款。</td>
			<td data-label="你不能做的事">不能把改過的 MPL 檔案藏起來當自己的私有碼；不能拿掉授權聲明。除此之外，跟自家閉源程式碼放在同一個產品裡是允許的。</td>
			<td data-label="誰在用">Firefox、LibreOffice、Terraform 1.5 以前的版本</td>
		</tr>
		<tr>
			<td data-label="授權">BSL 1.1</td>
			<td data-label="它是什麼">Business Source License，MariaDB 在 2013 年提出、2017 年改到 1.1 版。看得到原始碼，但<strong>不是</strong> OSI 認可的開源授權。</td>
			<td data-label="你要做的事">先讀授權方填在「Additional Use Grant」裡的那一段，那才是真正的規則。非生產環境的使用一般都放行；生產環境要看你有沒有被排除。每個版本都有一個 Change Date（最多四年），到期後自動轉成授權方指定的開源授權（Change License）。</td>
			<td data-label="你不能做的事">通常是「不能拿它做跟授權方競爭的產品或託管服務」。以 Terraform 為例，自己內部用、或幫客戶跑都可以，但做一個賣 Terraform 託管服務的產品就踩線。</td>
			<td data-label="誰在用">Terraform、Vault 等 HashiCorp 產品（2023 年起）、MariaDB MaxScale</td>
		</tr>
	</tbody>
</table>

這三個放在一起看，判斷順序就很清楚：MIT 帶著聲明就能走；MPL 看你有沒有改到它的檔案；BSL 不要看授權名稱，直接翻 Additional Use Grant 和 Change Date。

## 五個最容易踩的坑

### 1. repo 根本沒有 LICENSE 檔

這是最常被忽略的一種。沒有授權檔案，不等於「隨便用」，而是等於「All rights reserved」：著作權法預設作者保留所有權利，你沒有任何使用、修改、散布的許可。GitHub 的服務條款只讓你 fork 和瀏覽，不給你商用的權利。choosealicense.com 上有一頁專門講這件事，標題就叫 No License。

看到沒有 LICENSE 的套件，正確做法是開 issue 問作者，或者換一個。

### 2. 雙授權：免費版跟你以為的不一樣

很多套件是「社群版 MIT，企業版另外收費」，而且企業版的功能常常就是你真正要用的那幾個。AG Grid 的 Community 是 MIT，Enterprise 要買；MUI 的 core 是 MIT，X 系列的 Pro / Premium 是商用授權；Highcharts 從頭到尾就是商用軟體，只對非商業用途免費。

這類套件在 npm 上裝起來完全一樣，差別只在你有沒有 import 到付費模組。星星數當然很高，因為社群版真的很多人在用。

### 3. 你沒裝的東西，它幫你裝了

你只裝了一個 MIT 套件，但它的 dependency tree 裡可能有幾百個間接依賴，任何一個都可能是 GPL 或沒授權。自己一層一層翻不可能，得靠工具。

<figure>
  <img src="/blog/2026-08-29-open-source-license-commercial-use-checklist/03-dependency-iceberg.png" alt="我拿著放大鏡站在冰山頂，上面只有一個 MIT 小箱子，水面下卻是整棵依賴樹，中間有一個紅色的 GPL 在發亮" loading="lazy" />
  <figcaption>我拿著放大鏡站在冰山頂，上面只有一個 MIT 小箱子，水面下卻是整棵依賴樹，中間有一個紅色的 GPL 在發亮</figcaption>
</figure>

```bash
# 只看 production 依賴，輸出各種授權的數量
npx license-checker-rseidelsohn --production --summary

# 列出不在白名單內的套件（有東西就會非零退出，適合放 CI）
npx license-checker-rseidelsohn --production \
  --onlyAllow "MIT;ISC;BSD-2-Clause;BSD-3-Clause;Apache-2.0;0BSD;CC0-1.0"
```

原版的 `license-checker` 已經沒在維護，`license-checker-rseidelsohn` 是目前活著的 fork。GitHub 本身也會在 repo 頁面偵測授權，Snyk、FOSSA、ScanCode 這類工具則能做更完整的掃描。

### 4. 授權會在你用到一半的時候改

這幾年最戲劇性的幾個案例：

- **HashiCorp Terraform**：2023 年 8 月從 MPL-2.0 改成 BSL 1.1，限制「競爭性使用」。社群 fork 出 OpenTofu，掛在 Linux Foundation 底下。IBM 在 2025 年 2 月完成收購 HashiCorp，授權沒改回來。
- **Elasticsearch / Kibana**：2021 年拿掉 Apache-2.0 改成 SSPL + Elastic License；2024 年 9 月又加回 AGPL-3.0 作為選項，重新符合 OSI 的開源定義。
- **Redis**：2024 年 3 月從 BSD 改成 RSALv2 / SSPLv1，社群 fork 出 Valkey；2025 年 5 月 Redis 8.0 加入 AGPL-3.0，變成三授權並行。

這幾個案例的共同點是：改授權的時候，你已經用了好幾年。所以選型時除了看現在的 LICENSE，也要看它是不是某家公司的核心商業產品，那種套件改授權的機率比純社群維護的專案高得多。鎖版本可以暫時擋住，但長期還是得決定要留、要換、還是要跟著 fork 走。

### 5. 不只程式碼有授權

字型、圖示、圖片、AI 模型權重，全都有。

思源黑體、Noto 系列是 SIL OFL，商用和嵌入都沒問題；但很多中文字型（例如華康、文鼎的大部分字體）要另外買商用授權，網頁嵌入跟印刷還是分開算。Font Awesome 的 Free 版其實是三種授權疊在一起：圖示 CC BY 4.0、字型檔 SIL OFL 1.1、程式碼 MIT，用的時候要保留署名；Pro 版是商用授權。AI 模型更複雜：Llama 系列用的是 Meta 自訂的授權，不是 OSI 認可的開源授權，對超過一定月活躍用戶數的產品有額外條款，Llama 4 的多模態模型甚至直接不授權給設籍在歐盟的企業使用。

這些東西不會出現在 `package.json` 裡，所以掃描工具也掃不到。得靠人記得問。

## 十分鐘檢查清單

Threads 貼文作者說，他現在的習慣是任何要進生產環境的套件，第一件事不是看星星數，是去看 LICENSE。我把這個習慣展開成一份清單，每一項都是幾分鐘內能做完的事。

1. 打開 LICENSE 檔案，不是 README 裡的一行字，是實際的授權全文。確認它是哪一種，對照上面的三個等級。
2. 確認 `package.json` 的 `license` 欄位跟 LICENSE 檔案一致。不一致的話以 LICENSE 檔案為準，並且要提高警覺。
3. 跑一次依賴掃描，看 production 依賴裡有沒有 copyleft 或 UNKNOWN。
4. 判斷你的使用方式會不會觸發義務。你是散布給客戶，還是只在自己伺服器上跑？你有沒有修改它？你是把它當獨立服務呼叫，還是嵌進自己的程式碼？
5. 確認有沒有付費版本，以及你要用的功能在哪一邊。
6. 看維護者是誰。如果是某家公司的核心產品，把「未來改授權」列進風險。
7. 不確定就問法務，或至少花十分鐘把授權名稱丟去查它對商用的具體限制。

第七點是整份清單的重點。貼文裡那個案例，兩年的技術債換來三個月的交易延遲和法務加班。十分鐘跟三個月的匯率，誰都算得出來。問題只是選型當下有沒有人想到要算。

<figure>
  <img src="/blog/2026-08-29-open-source-license-commercial-use-checklist/04-ten-minutes.png" alt="左邊的我泡杯茶、拿放大鏡看 LICENSE，計時器十分鐘；右邊的我被法務文件堆到只剩一顆頭，日曆已經劃掉三個月" loading="lazy" />
  <figcaption>左邊的我泡杯茶、拿放大鏡看 LICENSE，計時器十分鐘；右邊的我被法務文件堆到只剩一顆頭，日曆已經劃掉三個月</figcaption>
</figure>

## 團隊層級可以做的事

個人習慣能擋住一部分，但真正要穩的是流程。

- **授權白名單**：寫進團隊文件，MIT / ISC / BSD / Apache-2.0 直接過，MPL / LGPL 要標註使用方式，GPL / AGPL / source-available 需要法務或 tech lead 簽核。
- **CI 擋關**：把上面那條 `--onlyAllow` 指令放進 pipeline，新依賴不在白名單就擋 PR。
- **SBOM**：軟體物料清單。歐盟的 Cyber Resilience Act 已經把它列進技術文件要求：漏洞通報義務 2026 年 9 月 11 日生效，SBOM 在內的其餘義務 2027 年 12 月 11 日起適用，客戶做資安審查時也越來越常要。有工具（Syft、CycloneDX）可以自動產生，順便就把授權資訊帶出來了。
- **選型模板加一欄**：技術選型文件裡除了效能、社群、文件品質，加一欄「授權與商用限制」。空著不能過。

這些都不是大工程，加起來一天就能建好。比起某一天技術盡職調查報告上出現的紅字，這一天很便宜。

## 回到那個問題

「這個套件能商用嗎？」

正確的回答不是星星數，也不是「應該很多人在用」，而是：「它是 MIT，production 依賴掃過沒有 copyleft，我們是 SaaS 沒有散布，可以用。」或者：「它是 AGPL，我們會改它而且對外提供服務，要嘛買商用授權，要嘛換一個。」

兩種回答都只需要十分鐘。差別只在講的地點：選型會議上自己講，還是併購案的盡職調查報告裡被別人講。

## 參考資料

- [啟發這篇的 Threads 貼文 — @vicckuo](https://www.threads.com/@vicckuo/post/DckIdDoIPlU)
- [GNU Affero General Public License v3.0 全文](https://www.gnu.org/licenses/agpl-3.0.html)
- [Do I need to provide access to source code under the AGPLv3 license? — Opensource.com](https://opensource.com/article/17/1/providing-corresponding-source-agplv3-license)
- [GPL FAQ：A company is running a modified version of a GPLed program on a web site — FSF](https://www.gnu.org/licenses/gpl-faq.en.html#UnreleasedMods)
- [No License — Choose a License](https://choosealicense.com/no-permission/)
- [Redis is now available under the AGPLv3 open source license — Redis 官方部落格](https://redis.io/blog/agplv3/)
- [Elasticsearch Is Open Source. Again! — Elastic 官方部落格](https://www.elastic.co/blog/elasticsearch-is-open-source-again)
- [Terraform License Change (BSL) — Spacelift](https://spacelift.io/blog/terraform-license-change)
- [OpenTofu — Wikipedia](https://en.wikipedia.org/wiki/OpenTofu)
- [license-checker-rseidelsohn — GitHub](https://github.com/RSeidelsohn/license-checker-rseidelsohn)
- [EU CRA SBOM Requirements: Formats, Docs & 2027 Deadline — Finite State](https://finitestate.io/blog/eu-cra-sbom-technical-documentation-guide)
