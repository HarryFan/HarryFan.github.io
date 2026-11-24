---
title: '用開源工具做 AI 影片，怎麼把技術串起來：配音、走位、生成、剪輯一條龍筆記'
description: '想每兩天出一支 AI 短片，雲端點數一支就要台幣 900 元。我把整條流程拆開，看哪一段可以換成開源工具：VoxCPM2 複製自己的聲音、Blender 方塊假人排走位、MiniMax H3 在 M2 Pro 上本機生影片、FFmpeg 和 Whisper 收尾。整理每一段吃什麼、吐什麼、怎麼接，以及實測的時間。'
pubDate: 2026-11-25
category: 'ai'
heroImage: '/blog/2026-11-25-open-source-video-voice-clone-m2-pro/cover.png'
draft: false
---

我現在做 AI 短劇，主力是透過 Higgsfield 呼叫 Seedance 2.5。效果很好，但一支片大約要**台幣 900 元**。如果想每兩天發一支，一個月就是十幾支，這個成本撐不久。

所以這幾個晚上，我把整條流程拆開來看：**哪一段一定要花錢，哪一段可以換成開源工具在自己電腦上跑。**

這篇不是單一工具的教學，而是記錄這些工具要怎麼「接」在一起：每一段吃什麼、吐什麼，下一段怎麼拿去用。

## 整條流程長這樣

<figure>
  <img src="/blog/2026-11-25-open-source-video-voice-clone-m2-pro/01-pipeline.png" alt="窗仔站在輸送帶旁，輸送帶上依序是腳本、配音、走位、生成、剪輯五個箱子" loading="lazy" />
  <figcaption>一段一段接起來，每一段的輸出就是下一段的參考。</figcaption>
</figure>

| 階段 | 開源工具 | 吃進去 | 吐出來 |
|---|---|---|---|
| 1. 腳本、分鏡 | （用 AI 對話整理） | 故事、台詞 | 分段劇本、每段秒數 |
| 2. 配音 | **VoxCPM2** | 台詞文字 + 15 秒自己的錄音 | 每句一個 wav |
| 3. 走位 | **Blender**（方塊假人） | 誰從哪走到哪、攝影機怎麼跟 | 灰盒預覽影片 |
| 4. 影片生成 | **MiniMax H3** | 角色定裝圖 + 參考影片 + 結構化提示詞 | 有聲音的影片 |
| 5. 剪輯、字幕 | **FFmpeg + Whisper** | 各段影片、配音 | 成片、字幕檔 |

這樣排有一個重點：**越前面的步驟越便宜，越後面越貴**。所以要在前面把東西都定下來，最貴的生成那一步只做一次。

## 第 2 段：VoxCPM2，複製自己的聲音

VoxCPM2 是 OpenBMB 開源的語音合成模型。它的「複製」不用訓練：給一段參考錄音，加上那段錄音的逐字稿，就能用同一個聲音唸新的句子。

我拿自己 Podcast 裡的一段錄音當參考，大約 15 秒，在 Mac 上用 GPU（`mps`）跑：

```python
import numpy as np, soundfile as sf
from voxcpm import VoxCPM

REF = "ref.wav"                       # 自己的參考錄音
REF_TEXT = "參考錄音的逐字稿，一字不差。"
LINES = ["第一句台詞。", "第二句台詞。", "第三句台詞。"]

model = VoxCPM.from_pretrained("openbmb/VoxCPM2", load_denoiser=False, device="mps")
sr = model.tts_model.sample_rate
gap = np.zeros(int(sr * 0.35), dtype=np.float32)   # 句子之間留 0.35 秒

chunks = []
for line in LINES:
    wav = model.generate(text=line, prompt_wav_path=REF, prompt_text=REF_TEXT,
                         cfg_value=2.6, inference_timesteps=25)
    chunks += [wav.astype(np.float32), gap]

sf.write("vo_raw.wav", np.concatenate(chunks), sr)
```

接到下一段之前，要注意幾件事：

1. **逐字稿要一字不差。**參考錄音講了什麼，`prompt_text` 就寫什麼，包括「那」「呢」這種語助詞。
2. **一句一句生，再接起來。**哪一句不滿意，只要重生那一句；句間的靜音長度也自己控制，後面對畫面比較好抓。
3. **先快後細。**測試用 `cfg_value=2.0`、10 步，先聽像不像；定稿再用 `2.6`、25 步。
4. **台灣讀音要自己顧。**模型有時會唸成對岸讀音。我遇到「頭髮」的「髮」唸不對，最後直接把字換成同音的「法」。反正輸出是純音檔，觀眾聽不出字。
5. **最後再調速。**我另外輸出 1.2 倍速的版本，節奏比較貼近短影音。

### 那 RVC 要放哪裡？

最近也看到 RVC（Retrieval-based Voice Conversion）這類工具。它跟 VoxCPM2 做的事不一樣：

<figure>
  <img src="/blog/2026-11-25-open-source-video-voice-clone-m2-pro/02-tts-vs-rvc.png" alt="窗仔面前兩扇門，左門寫文字變聲音，右門寫聲音變聲音" loading="lazy" />
  <figcaption>VoxCPM2 是文字變聲音，RVC 是聲音換聲音。</figcaption>
</figure>

- **VoxCPM2 是「文字轉語音」**：給文字，生出你的聲音。
- **RVC 是「聲音轉聲音」**：先有人把台詞演一遍，它只把音色換掉，語氣和節奏照原本的。

所以在流程裡，RVC 是接在第 2 段的「替代路線」：當台詞需要演技（哭、吼、講到一半停住），TTS 唸不出來，就自己先錄一遍，再用 RVC 換成角色的聲音。

聲音複製只用在**自己的聲音**，或本人明確同意的聲音。

## 第 3 段：Blender 方塊假人，先排走位

這段我在之前的短劇筆記寫過：用圓柱和方塊當人，寫一支 Python 腳本把走位和攝影機排出來，算一支幾秒的灰盒預覽。

它在這條流程裡的角色，是**第 4 段的參考影片**。模型要的是位置和節奏，不是外觀，方塊就夠了。

## 第 4 段：MiniMax H3，本機生影片

### 它是什麼

MiniMax H3 是 MiniMax 開出來的影片模型，約 331 億參數，可以從文字、圖片、參考影片生成影片，**而且會同時生出聲音**。授權允許商用，但要標示用了這個模型，也排除了部分地區（美國、歐盟、英國、韓國）。台灣不在排除名單裡，商用前還是建議自己讀一次授權全文。

### 環境

我用一個以 Rust 寫、跑在 Apple Metal 上的推論程式（`mmh3`），不用裝 ComfyUI：

```bash
cd mmh3
make build    # cargo 編譯，我的機器約 2 分 30 秒

# 下載 int8 量化權重（Hugging Face 上的 Comfy-Org/MiniMax-H3）
bash tools/download-models.sh --ref2va --no-fasth3 --models ../weights
```

| 權重 | 用途 | 大小 |
|---|---|---|
| `qwen3vl_32b_minimax_h3_int8` | 文字編碼器 | 約 27 GB |
| `minimax_h3_fl2va_pruned_int8` | 首尾幀生影片 | 約 21 GB |
| `minimax_h3_ref2va_pruned_int8` | 參考圖＋參考影片生影片 | 約 21 GB |
| `minimax_h3_video_vae_int8` | 影像編解碼 | — |
| `ref2v_turbo_8step` LoRA | 8 步加速 | — |

加起來七十 GB 起跳，我全部放在外接硬碟。下載中途 CDN 逾時好幾次，靠腳本的續傳才下完。

### 前面幾段怎麼接進來

這是整條流程的接點。一次生成的指令長這樣：

```bash
target/release/mmh3 generate --models ../weights \
  --prompt-file ../prompt.txt \
  --reference ../assets/角色定裝圖.png \
  --reference-video ../output/走位預覽.mp4 \
  --width 640 --height 384 --frames 97 --seed 73 \
  --out ../output/第一段.mp4
```

- `--reference`：角色定裝圖，鎖住長相和畫風。
- `--reference-video`：第 3 段的走位預覽（我會先用 FFmpeg 裁成 4 秒、640×360、拿掉聲音）。
- `--prompt-file`：結構化提示詞。

```bash
# 把預覽片裁成參考影片
ffmpeg -ss 1 -i 走位預覽.mp4 -t 4 -an -vf scale=640:360 -c:v libx264 -pix_fmt yuv420p reference.mp4
```

H3 的提示詞要分欄位寫，我是照這幾個欄位：

```text
subject_definitions:
<Picture 1> 定義兩個角色的外觀和手繪動畫風格。
<Video 1> 定義平板滑過去的動作和節奏。
summary:
晚餐時，他把平板推給她，她低頭看帳單。
retention_analysis:
保留兩個角色的服裝、髮色和位置。
detailed_description:
0–3 秒：固定中景雙人鏡頭……
overall_soundscape:
安靜的室內底噪。9.5 秒時她用台灣華語輕聲說：「……」
non_diegetic_music:
None.
```

（實際我用英文寫，這裡翻成中文。）

台詞可以直接寫在 `overall_soundscape`，連「用台灣華語」「名字後面停一下」都寫進去。另外從執行 log 看得出來，H3 的輸入除了圖片和影片，也有聲音這一格；理論上可以把第 2 段 VoxCPM2 生的台詞直接當參考音訊餵進去，讓角色照著台詞演，這是下一個可以試的接法。

### 實測時間

<figure>
  <img src="/blog/2026-11-25-open-source-video-voice-clone-m2-pro/03-slow-steps.png" alt="窗仔坐在筆電旁邊打瞌睡，筆電上的進度條寫著 5/8，窗外是月亮" loading="lazy" />
  <figcaption>一步七分鐘，筆電跑一整晚剛好。</figcaption>
</figure>

三次測試都在 M2 Pro 上，解析度都是 384×224：

| 測試 | 模型 | 長度 | 步數 | 大約總時間 |
|---|---|---|---|---|
| 試片 | fl2va | 1.6 秒（39 幀） | 4 | 約 16 分鐘 |
| 餐桌戲（有參考影片） | ref2va + turbo LoRA | 1.6 秒（39 幀） | 8 | 約 31 分鐘 |
| 15 秒預告 | ref2va + turbo LoRA | 15.1 秒（362 幀） | 8 | 約 62 分鐘 |

15 秒那支，8 步去噪就花了約 58 分鐘，一步大概 7 分鐘。文字編碼的時間也差很多，同一台機器一次 52 秒、一次 236 秒，可能跟當下記憶體被其他程式佔用有關，跑之前先把瀏覽器和剪輯軟體關掉比較保險。

結論很直接：**筆電能跑，但只能跑低解析度的草稿。**

## 第 5 段：FFmpeg + Whisper 收尾

最後一段是我本來就在用的剪輯系統：FFmpeg 接片、混音、調速，Whisper 從配音自動出字幕檔，再燒進畫面。這段完全在本機，不花錢，跟前面幾段直接用檔案接起來。

## 哪一段該花錢

<figure>
  <img src="/blog/2026-11-25-open-source-video-voice-clone-m2-pro/04-draft-to-cloud.png" alt="左邊筆電吐出一疊模糊的小草稿，窗仔挑出一張，交給右邊雲朵上的大螢幕變成清楚的成品" loading="lazy" />
  <figcaption>草稿在本機燒時間，正式版才在雲端燒錢。</figcaption>
</figure>

整條拆完，我目前的分工是：

| 階段 | 本機開源 | 雲端付費 |
|---|---|---|
| 配音 | VoxCPM2（一般旁白） | ElevenLabs（要穩定、要多語氣） |
| 換聲演技 | RVC（之後試） | — |
| 走位預覽 | Blender | — |
| 影片草稿 | MiniMax H3 384p | — |
| 影片正式版 | — | Seedance 2.5；一般鏡頭可評估 H3 雲端 API（768p 每秒約 0.08 美元） |
| 剪輯、字幕 | FFmpeg + Whisper | — |

開源工具最大的價值不是「免費」，而是**可以放心地多試幾次**。以前每按一次生成都在燒點數；現在配音、走位、草稿都在自己電腦上定下來，最後只把確定的版本拿去雲端出正式片。
