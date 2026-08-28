---
title: '"Can We Use This Package Commercially?" The Question GitHub Stars Can''t Answer: An Open-Source License Checklist'
description: 'Someone asks in a tech-selection meeting whether a package is OK for commercial use, and the answer is usually "20k stars, everyone uses it." This post sorts licenses into three tiers (permissive, copyleft, source-available), explains when GPL / LGPL / AGPL actually trigger in a SaaS context, lists the five most common traps, and ends with a ten-minute license checklist.'
pubDate: 2026-08-29
heroImage: '/blog/2026-08-29-open-source-license-commercial-use-checklist/cover.png'
category: 'career'
---

*中文版在這裡：[「這個套件能商用嗎？」星星數回答不了的問題](/blog/2026-08-29-open-source-license-commercial-use-checklist/)*

A few days ago I came across [a thread by @vicckuo on Threads](https://www.threads.com/@vicckuo/post/DckIdDoIPlU). The scene is a tech-selection meeting. The PM asks: "Can we use this package commercially?" The engineer, without looking up: "Sure, it has 20k stars on GitHub, everyone uses it." Pressed further: "Lots of companies probably use it, should be fine." Pressed again, about whether a GPL-family license would force a commercial product to publish its source: "I'd have to look that up."

The author said he'd seen this conversation more than once. I could only nod. I've said things like that in selection meetings, and I've heard others say them. This post takes what that thread poked at, adds the facts I went and verified afterwards, and turns it into a set of notes you can hold up against a package the next time you're choosing one.

Disclaimer first: I'm not a lawyer. This is an engineer's summary. If the package is going into a core system, if there's an acquisition on the table, or if you're signing a customer contract, hand the LICENSE file to legal.

## Star count and license are two unrelated things

Lots of stars means the package is popular, the community is active, and problems are easy to find answers for. Those are all legitimate selection criteria, but they answer "is it good?", not "are we allowed?".

"Are we allowed?" is decided by exactly one thing: what the LICENSE file in the repo says. If there isn't one, or if it says something you haven't read, then no matter how many stars there are, what you're importing is a contract you never read.

"Lots of companies probably use it" is a bit more dangerous. Did those companies pay for a commercial license, sign an agreement, or simply ignore the question and ship? Most of the time the person saying it doesn't know either. The thread's author put it well: "probably" sounds like an informed judgment, but it's really just tossing responsibility into thin air.

<figure>
  <img src="/blog/2026-08-29-open-source-license-commercial-use-checklist/01-stars-vs-license.png" alt="Me sweating next to a balance scale: a whole pan of stars floats up on the left, while a single LICENSE sheet on the right sinks the pan to the bottom" loading="lazy" />
  <figcaption>Me sweating next to a balance scale: a whole pan of stars floats up on the left, while a single LICENSE sheet on the right sinks the pan to the bottom</figcaption>
</figure>

## Three tiers: permissive, copyleft, source-available

There are a lot of licenses, but for commercial selection you only need to sort them into three tiers first.

| Tier | Common licenses | Core obligation for commercial use | Plain English |
|---|---|---|---|
| Permissive | MIT, ISC, BSD-2/3, Apache-2.0 | Keep the copyright notice and full license text; Apache adds a patent grant, and if the upstream project ships a NOTICE file you carry that too | Almost always safe, just remember to keep the notices |
| Copyleft | GPL-2.0/3.0, AGPL-3.0, LGPL, MPL-2.0 | Under specific conditions, derivative works must be released under the same license with source | Figure out what the "conditions" are before you know whether you've tripped them |
| Source-available (source is visible, but it isn't open source) | BSL 1.1, SSPL, Elastic License 2.0, RSAL | Usually forbids building a competing service or product on it; not OSI-approved | Being able to read the code doesn't mean you can use it however you like |

Tiers one and three are relatively easy to judge: permissive licenses carry almost no worry, and for source-available ones you go straight to the "Additional Use Grant" or the restriction clause and check whether your use case is excluded.

<figure>
  <img src="/blog/2026-08-29-open-source-license-commercial-use-checklist/02-three-gates.png" alt="Me carrying a box of code toward three gates: the green MIT gate wide open, the yellow GPL gate half-open with a conditions sign, the red BSL gate locked" loading="lazy" />
  <figcaption>Me carrying a box of code toward three gates: the green MIT gate wide open, the yellow GPL gate half-open with a conditions sign, the red BSL gate locked</figcaption>
</figure>

The one that makes people freeze in meetings is tier two.

## What's actually different between GPL, LGPL and AGPL

The core of copyleft is "derivative works must be released under the same license", but **when** that obligation triggers differs a lot across the three.

**GPL (v2 / v3)**: the trigger is "distribution" (the license says *convey*). When you hand software containing GPL code to someone else, whether by selling it to a customer, publishing it on an app store, or providing an installer, you have to provide the corresponding source. Conversely, if you only run it on your own servers and offer a service over the network, users never receive the program itself, and GPL doesn't require you to publish anything. This is the so-called "ASP loophole" or "SaaS loophole".

**AGPL v3**: written specifically to close that hole. Section 13 says that if you **modify** AGPL software and let users interact with it remotely over a network, you must offer those users the complete source of your modified version.

Here's the part that often gets stated wrong; I checked the AGPL text and a few legal analyses to be sure: the trigger for AGPL section 13 is *modification*. Install an AGPL program unmodified and serve it to the public, and you owe nobody anything. But the moment you change it, including embedding it as a library inside your own service or combining it with your own code into a new work, the obligation kicks in, and its scope can extend to the entire combined work.

So in the case from the thread (an AGPL data-processing package written into a core service and used for two years), merely using AGPL wasn't the problem. The problem was fusing the AGPL package with in-house code into one thing and then serving it externally. That's exactly the combination technical due diligence flags in red.

**LGPL**: sits between the two and is meant for libraries. Your program can link against an LGPL library without open-sourcing your own code, on the condition that users can replace that library. Dynamic linking (a .so / .dll) is usually fine; static linking, or using a bundler to pack everything into one file, drifts into a gray zone because the user can no longer swap out the library on its own. A frontend project that bundles an LGPL package with webpack or Vite is exactly this case.

**MPL-2.0**: copyleft applies only at the *file* level. If you change an MPL-licensed file you must release your changes to that file, but files you wrote yourself are untouched. Far friendlier for commercial use than GPL; Firefox and early Terraform are MPL.

One more thing frontend engineers in particular should watch: GPL's "distribution" in a web context is not quite "zero trigger". Your backend code running on a server isn't distribution, but JavaScript that's bundled and sent to the browser to execute is a different story. The FSF is explicit about it in the [GPL FAQ](https://www.gnu.org/licenses/gpl-faq.en.html#UnreleasedMods): GPL programs that a site sends to the user's browser to run (usually JavaScript) count as distribution, and the source must be made available to users under GPL terms. I couldn't find a court ruling on this, but if there's a GPL package in your frontend bundle, don't assume the SaaS loophole is covering you.

## MIT, MPL-2.0, BSL 1.1: one representative from each tier

Everything above is about trigger conditions. What actually happens in selection meetings more often is this: someone reads out a license name, and nobody at the table can say within ten seconds what it actually asks of you. So here's one commonly encountered license from each tier, with the basics in a single table.

<table class="qa-table">
	<thead>
		<tr>
			<th>License</th>
			<th>What it is</th>
			<th>What you must do</th>
			<th>What you can't do</th>
			<th>Who uses it</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-label="License">MIT</td>
			<td data-label="What it is">A permissive license written at MIT in the late 1980s. Under 200 words in total, and the most common license in the npm ecosystem.</td>
			<td data-label="What you must do">When you copy or distribute, carry the original copyright notice and the full license text with it. That's all.</td>
			<td data-label="What you can't do">Almost nothing. You can close the source, sell it, rename it. The one thing to note is that, unlike Apache-2.0, it has no explicit patent grant.</td>
			<td data-label="Who uses it">React, Vue, jQuery, Rails, most npm packages you've ever installed</td>
		</tr>
		<tr>
			<td data-label="License">MPL-2.0</td>
			<td data-label="What it is">Mozilla's "file-level copyleft", finalized in 2012. The unit it governs is the file, not the whole project.</td>
			<td data-label="What you must do">If you modify <strong>a file</strong> that's under MPL, the modified file must be released under MPL, with source available to whoever receives your program. Files you wrote yourself are unaffected and can stay closed. It also includes a patent grant.</td>
			<td data-label="What you can't do">You can't hide a modified MPL file as your own proprietary code, and you can't strip the license notice. Beyond that, shipping it inside the same product as your closed-source code is allowed.</td>
			<td data-label="Who uses it">Firefox, LibreOffice (dual MPL-2.0 / LGPLv3+), Terraform up to and including 1.5.x</td>
		</tr>
		<tr>
			<td data-label="License">BSL 1.1</td>
			<td data-label="What it is">The Business Source License. Its founders at MariaDB floated the idea in 2013, released version 1.0 with MaxScale 2.0 in 2016, and revised it to 1.1 in 2017. You can read the source, but it is <strong>not</strong> an OSI-approved open-source license.</td>
			<td data-label="What you must do">Read the paragraph the licensor filled in under "Additional Use Grant" first; that's the real rule. Non-production use is generally allowed; for production use, check whether you're excluded. Every release has a Change Date (at most four years out), after which it automatically converts to the open-source license the licensor named (the Change License).</td>
			<td data-label="What you can't do">Typically, "you can't build a product or hosted service that competes with the licensor". With Terraform, for example, internal use or running it for clients is fine, but selling a hosted Terraform service crosses the line.</td>
			<td data-label="Who uses it">HashiCorp products such as Terraform and Vault (since 2023), MariaDB MaxScale</td>
		</tr>
	</tbody>
</table>

Seen side by side, the order of checks is obvious: MIT, keep the notice and go; MPL, did you touch one of its files; BSL, ignore the license name and go straight to the Additional Use Grant and the Change Date.

## The five most common traps

### 1. The repo has no LICENSE file at all

This is the most overlooked one. No license file doesn't mean "do whatever". It means "All rights reserved": copyright law defaults to the author retaining every right, and you have no permission to use, modify, or distribute. GitHub's terms of service let you view and fork, and nothing more. choosealicense.com has a page dedicated to this, titled simply "No License".

When you find a package without a LICENSE, the right move is to open an issue and ask the author, or pick a different package.

### 2. Dual licensing: the free edition isn't what you think

Many packages are "community edition MIT, enterprise edition paid", and the enterprise features are often exactly the ones you actually need. AG Grid Community is MIT, Enterprise costs money; MUI's core is MIT, but the X series Pro / Premium tiers are commercial; Highcharts is commercial software through and through, free only for non-commercial use.

These packages install identically from npm. The only difference is whether you import a paid module. Their star counts are of course high, because the community editions really are widely used.

### 3. Things you didn't install, installed for you

You installed a single MIT package, but its dependency tree might contain hundreds of transitive dependencies, any of which could be GPL or unlicensed. Digging through them by hand is impossible; you need tooling.

<figure>
  <img src="/blog/2026-08-29-open-source-license-commercial-use-checklist/03-dependency-iceberg.png" alt="Me standing on the tip of an iceberg with a magnifying glass; one small MIT box on top, an entire dependency tree below the waterline with a red GPL box glowing in the middle" loading="lazy" />
  <figcaption>Me standing on the tip of an iceberg with a magnifying glass; one small MIT box on top, an entire dependency tree below the waterline with a red GPL box glowing in the middle</figcaption>
</figure>

```bash
# production dependencies only, count of each license
npx license-checker-rseidelsohn --production --summary

# list packages outside the allowlist (non-zero exit if any, good for CI)
npx license-checker-rseidelsohn --production \
  --onlyAllow "MIT;ISC;BSD-2-Clause;BSD-3-Clause;Apache-2.0;0BSD;CC0-1.0"
```

The original `license-checker` is no longer maintained; `license-checker-rseidelsohn` is the fork that's still alive. GitHub itself detects licenses on the repo page, and tools like Snyk, FOSSA, and ScanCode do more thorough scans.

### 4. The license changes while you're using it

The most dramatic cases of the last few years:

- **HashiCorp Terraform**: switched from MPL-2.0 to BSL 1.1 in August 2023, restricting "competitive use". The community forked OpenTofu under the Linux Foundation. IBM completed its acquisition of HashiCorp in February 2025; the license never went back.
- **Elasticsearch / Kibana**: dropped Apache-2.0 for SSPL + Elastic License in 2021; announced AGPL-3.0 as an additional option at the end of August 2024 (shipping from 8.16), bringing it back in line with the OSI definition of open source.
- **Redis**: moved from BSD to RSALv2 / SSPLv1 in March 2024, and the community forked Valkey; in May 2025 Redis 8.0 added AGPL-3.0, making it triple-licensed.

What these cases share: by the time the license changed, you'd been using the software for years. So beyond reading today's LICENSE, check whether the package is some company's core commercial product. Those change licenses far more often than purely community-maintained projects. Pinning a version buys time, but eventually you have to decide whether to stay, switch, or follow the fork.

### 5. It's not just code that has licenses

Fonts, icons, images, AI model weights: all of them.

Source Han Sans and the Noto family are SIL OFL, fine for commercial use and embedding. But many Chinese fonts (most DynaComware and Arphic faces, for example) require a separate commercial license, and web embedding is licensed separately from print. Font Awesome Free is actually three licenses stacked: icons under CC BY 4.0, font files under SIL OFL 1.1, code under MIT, so you must keep attribution; the Pro edition is commercial. AI models are messier still: the Llama family uses Meta's own custom license, which is not OSI-approved, carries extra terms for products above a certain monthly-active-user threshold, and in Llama 4's case flatly doesn't license the multimodal models to companies based in the EU. On the other hand, Meta's Muse Glimmer 30B, released in August 2026, is plain Apache-2.0 with none of those clauses. Same company, different model, different license: you have to check each one.

None of this shows up in `package.json`, so scanners can't see it. Someone has to remember to ask.

## The ten-minute checklist

The thread's author said his habit now is that for any package going to production, the first thing he looks at isn't the star count, it's the LICENSE. I've expanded that habit into a checklist where every item takes a few minutes.

1. Open the LICENSE file. Not the one-liner in the README, the actual full license text. Identify which one it is and map it to the three tiers above.
2. Confirm the `license` field in `package.json` matches the LICENSE file. If they disagree, the LICENSE file wins, and raise your guard.
3. Run a dependency scan and check production dependencies for copyleft or UNKNOWN.
4. Work out whether your usage triggers any obligation. Are you distributing to customers, or only running it on your own servers? Have you modified it? Are you calling it as a standalone service, or embedding it in your own code?
5. Check whether there's a paid edition, and which side of the line the feature you need sits on.
6. Look at who maintains it. If it's a company's core product, put "future license change" on the risk list.
7. When in doubt, ask legal, or at least spend ten minutes searching the license name plus its specific restrictions on commercial use.

Item seven is the point of the whole list. In the case from the thread, two years of technical debt bought three months of deal delay and legal overtime. Anyone can do the exchange rate between ten minutes and three months. The only question is whether anyone thought to do it at selection time.

<figure>
  <img src="/blog/2026-08-29-open-source-license-commercial-use-checklist/04-ten-minutes.png" alt="Left: me with a cup of tea and a magnifying glass over the LICENSE, timer set to ten minutes. Right: me buried in legal paperwork up to my head, three months crossed off the calendar" loading="lazy" />
  <figcaption>Left: me with a cup of tea and a magnifying glass over the LICENSE, timer set to ten minutes. Right: me buried in legal paperwork up to my head, three months crossed off the calendar</figcaption>
</figure>

## What a team can do

Personal habits catch some of it, but what actually holds is process.

- **License allowlist**: write it into the team docs. MIT / ISC / BSD / Apache-2.0 pass automatically; MPL / LGPL must note how they're used; GPL / AGPL / source-available need sign-off from legal or a tech lead.
- **CI gate**: put the `--onlyAllow` command above into the pipeline, so a new dependency outside the allowlist blocks the PR.
- **SBOM**: a software bill of materials. The EU Cyber Resilience Act has made it part of the required technical documentation: vulnerability-reporting obligations take effect on 11 September 2026, and the remaining obligations, SBOM included, apply from 11 December 2027. Customers running security reviews ask for it more and more often too. Tools like Syft and CycloneDX can generate one automatically, and license information comes along for free.
- **Add a column to the selection template**: alongside performance, community, and documentation quality, add "license and commercial restrictions". It can't be left blank.

None of this is a big project; all of it together can be set up in a day. Compared with a red line on a technical due-diligence report someday, that day is cheap.

## Back to the question

"Can we use this package commercially?"

The right answer isn't a star count, and it isn't "lots of people probably use it". It's: "It's MIT, the production dependency scan shows no copyleft, we're SaaS and don't distribute, we're fine." Or: "It's AGPL, we're going to modify it and serve it externally, so we either buy a commercial license or pick something else."

Both answers take ten minutes. The only difference is where they get said: by you in the selection meeting, or by someone else in the due-diligence report of an acquisition.

## References

- [The Threads post that prompted this — @vicckuo](https://www.threads.com/@vicckuo/post/DckIdDoIPlU)
- [GNU Affero General Public License v3.0, full text](https://www.gnu.org/licenses/agpl-3.0.html)
- [Do I need to provide access to source code under the AGPLv3 license? — Opensource.com](https://opensource.com/article/17/1/providing-corresponding-source-agplv3-license)
- [GPL FAQ: A company is running a modified version of a GPLed program on a web site — FSF](https://www.gnu.org/licenses/gpl-faq.en.html#UnreleasedMods)
- [No License — Choose a License](https://choosealicense.com/no-permission/)
- [Redis is now available under the AGPLv3 open source license — Redis blog](https://redis.io/blog/agplv3/)
- [Elasticsearch Is Open Source. Again! — Elastic blog](https://www.elastic.co/blog/elasticsearch-is-open-source-again)
- [Terraform License Change (BSL) — Spacelift](https://spacelift.io/blog/terraform-license-change)
- [OpenTofu — Wikipedia](https://en.wikipedia.org/wiki/OpenTofu)
- [license-checker-rseidelsohn — GitHub](https://github.com/RSeidelsohn/license-checker-rseidelsohn)
- [EU CRA SBOM Requirements: Formats, Docs & 2027 Deadline — Finite State](https://finitestate.io/blog/eu-cra-sbom-technical-documentation-guide)
