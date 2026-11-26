---
title: '別再從空白畫面開始：把 Anthropic 官方的 Claude Code 技能包裝進自己電腦'
description: 'Anthropic 把自己在用的技能包、職能外掛和範例專案都放在 GitHub 上。我挑了適合自己（Podcast 經營＋接案）的幾個，整理成一段可以直接貼進終端機的安裝指令，順便記下每個 repo 是什麼、哪些要裝、哪些只要下載參考。'
pubDate: 2026-11-26
category: 'ai'
heroImage: '/blog/2026-11-26-claude-code-official-skills-plugins-setup/cover.png'
draft: false
---

前幾天在 Threads 看到一篇整理，說 Anthropic 自己人每天在用的 Claude Code 設定，其實早就開源放在 GitHub 上了。

我點進去一個一個看，發現確實如此：**做 Word、PDF、簡報、試算表的技能包**、**行銷／產品／設計這類職能外掛**、**官方範例專案**，全部都是公開的。差別只在於有沒有花五分鐘把它們裝起來。

這篇把我實際挑選、安裝的指令整理起來，下次換電腦或推薦給朋友，直接複製就好。

## 五個 repo 各是什麼

<figure>
  <img src="/blog/2026-11-26-claude-code-official-skills-plugins-setup/01-five-repos.png" alt="窗仔站在一面工具牆前，牆上掛著五個貼了標籤的工具箱" loading="lazy" />
  <figcaption>五個 repo，有的是「裝進去用」，有的是「下載來看」。</figcaption>
</figure>

| Repo | 是什麼 | 怎麼用 |
| --- | --- | --- |
| [anthropics/skills](https://github.com/anthropics/skills) | 官方技能包：Word、PDF、簡報、試算表等 | 用外掛安裝 |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | 職能角色外掛：行銷、產品、設計、財務、法務等，一百多個 | 挑需要的安裝 |
| [anthropics/claude-code-playground](https://github.com/anthropics/claude-code-playground) | DevRel 團隊自己的設定、hooks、CLAUDE.md 範例 | 下載來參考 |
| [anthropics/claude-quickstarts](https://github.com/anthropics/claude-quickstarts) | 可以部署的範例專案：客服機器人、財務資料分析等 | 下載來參考 |
| [anthropics/launch-your-agent](https://github.com/anthropics/launch-your-agent) | 從想法到上線一個排程 Agent 的技能 | 進資料夾直接用 |

另外我也順手裝了一個第三方的 [founder-skill](https://github.com/Jakeschincariol/founder-skill)（創業評估用）。它不是 Anthropic 官方的，安裝前我先看過內容：MIT 授權，附的 Python 腳本只用內建函式庫、不會連網路。

## 一次貼完的安裝指令

<figure>
  <img src="/blog/2026-11-26-claude-code-official-skills-plugins-setup/02-marketplace-install.png" alt="窗仔先把一家商店的招牌掛上牆，再從貨架上挑出幾盒工具放進背包" loading="lazy" />
  <figcaption>先加「商店」（marketplace），再從商店裡挑要裝的外掛。</figcaption>
</figure>

在 Mac 的終端機貼上：

```bash
# 1. 官方技能包：Word、PDF、簡報、試算表
claude plugin marketplace add anthropics/skills
claude plugin install document-skills@anthropic-agent-skills
claude plugin install example-skills@anthropic-agent-skills

# 2. 職能角色包：挑跟你相關的
claude plugin marketplace add anthropics/knowledge-work-plugins
claude plugin install marketing@knowledge-work-plugins
claude plugin install brand-voice@knowledge-work-plugins
claude plugin install small-business@knowledge-work-plugins
claude plugin install product-management@knowledge-work-plugins
claude plugin install design@knowledge-work-plugins

# 3. founder-skill（第三方，創業評估）
claude plugin marketplace add Jakeschincariol/founder-skill
claude plugin install founder-skill@founder-skill

# 4. 範例專案：只是下載下來參考，不用安裝
cd ~/Documents/github
git clone https://github.com/anthropics/claude-code-playground.git
git clone https://github.com/anthropics/claude-quickstarts.git
git clone https://github.com/anthropics/launch-your-agent.git
```

如果 `claude plugin` 指令跑不動，就先輸入 `claude` 進到 Claude Code，再把指令前面的 `claude plugin` 換成 `/plugin` 貼進去，效果一樣。

## 幾個補充

- **claude-code-playground**：官方自己註明「不是正式產品」，裡面是 DevRel 團隊覺得好用、想分享的東西。適合拿來參考別人怎麼寫 hooks 和 CLAUDE.md，不要整包照抄。
- **launch-your-agent**：不用安裝。進到資料夾後執行 `claude`，再輸入 `/launch-your-agent`，它會先問你要做什麼，再一步步幫你建好、上線、排程一個 Agent。官方也提醒，因為每一步都會解釋，比較吃 token。
- **knowledge-work-plugins**：一百多個外掛不用全裝。我只挑了跟經營 Podcast、接案比較相關的 5 個；之後需要 finance、legal、data 這類，再用同樣的 `install` 指令補裝就好。
- **外掛裝完會自己啟動**：需要的時候技能會自動被叫用，也可以直接打 `/外掛名稱:指令` 呼叫。

## 心得

模型越來越強，但每次都從空白對話框開始，等於每次都要重新教它一遍。把官方整理好的技能包先裝起來，等於直接拿別人調好的工具開工。

接下來我想先拿 `founder-skill` 跑一次我之前做到一半的台派地圖，看看它會怎麼評估這個點子能不能自己養活。
