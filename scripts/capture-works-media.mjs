#!/usr/bin/env node
/**
 * capture-works-media.mjs
 *
 * 為 /works/ 作品集擷取封面與影片：起本機靜態站 → 等 WebGL 首幀真的畫出來
 * → 截 1440x720 封面 → 錄一段滾動 → ffmpeg 轉出完整版與懸停短循環。
 *
 * 為什麼不用 /brag：brag 讀 code 合成宣傳片（簡報卡 + 音樂），不錄網站本身。
 * 作品集要的是作品的真實畫面，所以這裡直接錄真站。
 *
 * 用法：
 *   node scripts/capture-works-media.mjs              # 全部
 *   node scripts/capture-works-media.mjs xiu-stone    # 指定 slug
 *   node scripts/capture-works-media.mjs --force      # 忽略既有產出重跑
 *
 * 產出（皆進 public/works/）：
 *   <slug>.webp        1440x720 封面
 *   <slug>.mp4         完整滾動影片   720p  < 2MB
 *   <slug>-loop.mp4    懸停短循環     480p  < 600KB
 */

import { createServer } from 'node:http';
import { readFile, mkdir, rm, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const execFileP = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, '..');
const OUT = path.join(REPO, 'public', 'works');
const TMP = path.join(REPO, '.works-capture-tmp');

// 來源專案的父目錄。放這裡而非寫死進 content，方便換機器。
const SRC_ROOT =
	process.env.WORKS_SRC_ROOT ?? path.resolve(REPO, '..', '..', 'github');

/** @type {{slug:string, dir:string, entry:string, settleMs?:number}[]} */
const WORKS = [
	{ slug: 'xiu-stone', dir: 'xiu-stone', entry: '/index.html' },
	{ slug: 'apple-hero', dir: 'apple-hero', entry: '/index.html' },
	{ slug: 'fable-five-showcase', dir: 'fable-five-showcase', entry: '/index.html' },
	{ slug: 'takoyaki', dir: 'Takoyaki', entry: '/hub.html' },
	{ slug: 'electric-guitar', dir: 'Electric-Guitar', entry: '/index.html' },
	{ slug: 'designer-chair', dir: 'Designer-Chair', entry: '/index.html' },
	{ slug: 'coffee-bean-bag', dir: 'coffee-bean-bag', entry: '/index.html' },
	{ slug: 'luxry-perfume', dir: 'luxry-perfume', entry: '/index.html' },
	{ slug: 'nice-watch', dir: 'nice-watch', entry: '/index.html' },
	{ slug: 'nice-nike', dir: 'nice-nike', entry: '/index.html' },
	// 唯一需要 build 的：Vite 專案，先跑 `npm run build` 產出 build/ 再餵給靜態伺服器。
	// 圖片來自 Unsplash 遠端，所以擷取時要有網路。
	{ slug: 'hakkatv', dir: 'HakkaTV/build', entry: '/index.html', settleMs: 5000 },
];

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml',
	'.mp4': 'video/mp4',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.ttf': 'font/ttf',
	'.glb': 'model/gltf-binary',
	'.hdr': 'application/octet-stream',
};

/** 起一個把 root 當根的靜態伺服器，回傳 { port, close } */
function serveDir(root) {
	const server = createServer(async (req, res) => {
		try {
			const url = new URL(req.url, 'http://localhost');
			let p = decodeURIComponent(url.pathname);
			if (p.endsWith('/')) p += 'index.html';
			const abs = path.join(root, p);
			// 目錄逃逸防護
			if (!abs.startsWith(root)) {
				res.writeHead(403).end();
				return;
			}
			const buf = await readFile(abs);
			res.writeHead(200, { 'content-type': MIME[path.extname(abs).toLowerCase()] ?? 'application/octet-stream' });
			res.end(buf);
		} catch {
			res.writeHead(404).end('not found');
		}
	});
	return new Promise((resolve) => {
		server.listen(0, '127.0.0.1', () => {
			resolve({ port: server.address().port, close: () => new Promise((r) => server.close(r)) });
		});
	});
}

/**
 * 等場景安定。
 *
 * 不用 canvas.drawImage 判斷有沒有畫好：Three.js 預設
 * preserveDrawingBuffer:false，事後 drawImage 一個 WebGL canvas 只會拿到全黑，
 * 那是讀取方式的限制，不是場景沒畫。Playwright 的 screenshot() 走合成器輸出，
 * 不受這個限制 —— 所以改成先截圖、再用截圖本身的標準差驗證（見 isBlank）。
 */
async function waitForScene(page, settleMs = 3500) {
	await page.waitForLoadState('networkidle').catch(() => {});
	const hasCanvas = await page.locator('canvas').count().catch(() => 0);
	// 有 canvas 的多等一會，讓 Three.js 建場景 + 跑完進場動畫
	await page.waitForTimeout(hasCanvas > 0 ? settleMs : 1200);
	return { canvas: hasCanvas > 0 };
}

/** 用標準差判斷截圖是不是一片空白（單色 = 場景沒畫出來） */
async function isBlank(pngPath) {
	try {
		const { stdout } = await execFileP('magick', [
			pngPath,
			'-colorspace', 'Gray',
			'-format', '%[fx:standard_deviation]',
			'info:',
		]);
		const sd = parseFloat(stdout.trim());
		return { blank: !(sd > 0.02), sd };
	} catch {
		return { blank: false, sd: NaN }; // 量不出來就不擋，交給人眼
	}
}

async function fileSize(p) {
	try {
		return (await stat(p)).size;
	} catch {
		return 0;
	}
}
const kb = (n) => `${Math.round(n / 1024)}KB`;

async function capture(work, { force }) {
	const root = path.join(SRC_ROOT, work.dir);
	if (!existsSync(root)) return { slug: work.slug, status: 'MISSING_SRC', detail: root };

	const coverOut = path.join(OUT, `${work.slug}.webp`);
	if (!force && existsSync(coverOut)) return { slug: work.slug, status: 'SKIP' };

	const workTmp = path.join(TMP, work.slug);
	await rm(workTmp, { recursive: true, force: true });
	await mkdir(workTmp, { recursive: true });

	const srv = await serveDir(root);
	const browser = await chromium.launch({ channel: 'chrome' });
	let result;

	try {
		const ctx = await browser.newContext({
			viewport: { width: 1440, height: 720 },
			deviceScaleFactor: 1,
			recordVideo: { dir: workTmp, size: { width: 1440, height: 720 } },
			reducedMotion: 'no-preference',
		});
		const page = await ctx.newPage();
		await page.goto(`http://127.0.0.1:${srv.port}${work.entry}`, {
			waitUntil: 'load',
			timeout: 30000,
		});

		const frame = await waitForScene(page, work.settleMs);

		// 封面：hero 定格
		const coverPng = path.join(workTmp, 'cover.png');
		await page.screenshot({ path: coverPng });
		const blankCheck = await isBlank(coverPng);

		if (blankCheck.blank) {
			result = { slug: work.slug, status: 'BLANK_PAGE', detail: `stddev=${blankCheck.sd.toFixed(4)}` };
		} else {

			// 滾動：分段推進，讓 scroll-driven 場景有時間跟上
			const h = await page.evaluate(() => document.body.scrollHeight);
			const steps = 28;
			const span = Math.max(0, h - 720);
			for (let i = 1; i <= steps; i++) {
				await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), (span * i) / steps);
				await page.waitForTimeout(110);
			}
			await page.waitForTimeout(400);

			await ctx.close(); // flush webm
			const webms = (await readdir(workTmp)).filter((f) => f.endsWith('.webm'));
			if (!webms.length) throw new Error('no webm recorded');
			const webm = path.join(workTmp, webms[0]);

			// 封面 → 1440x720 webp
			await execFileP('cwebp', ['-q', '82', '-resize', '1440', '720', coverPng, '-o', coverOut]);

			// 完整版 720p，無聲
			const full = path.join(OUT, `${work.slug}.mp4`);
			await execFileP('ffmpeg', [
				'-y', '-i', webm,
				'-vf', 'scale=-2:720',
				'-c:v', 'libx264', '-crf', '25', '-preset', 'slow',
				'-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an',
				full,
			]);

			// 懸停短循環：取中段 4 秒，480p，壓更兇
			const loop = path.join(OUT, `${work.slug}-loop.mp4`);
			const dur = await execFileP('ffprobe', [
				'-v', 'error', '-show_entries', 'format=duration',
				'-of', 'default=nw=1:nk=1', webm,
			]).then((r) => parseFloat(r.stdout.trim()) || 8);
			const start = Math.max(0, dur * 0.35);
			await execFileP('ffmpeg', [
				'-y', '-ss', String(start), '-t', '4', '-i', webm,
				'-vf', 'scale=-2:480',
				'-c:v', 'libx264', '-crf', '30', '-preset', 'slow',
				'-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an',
				loop,
			]);

			result = {
				slug: work.slug,
				status: 'OK',
				cover: await fileSize(coverOut),
				full: await fileSize(full),
				loop: await fileSize(loop),
				canvas: frame.canvas,
				sd: blankCheck.sd,
			};
		}
	} catch (e) {
		result = { slug: work.slug, status: 'ERROR', detail: String(e.message ?? e).slice(0, 140) };
	} finally {
		await browser.close().catch(() => {});
		await srv.close().catch(() => {});
		await rm(workTmp, { recursive: true, force: true });
	}
	return result;
}

const args = process.argv.slice(2);
const force = args.includes('--force');
const only = args.filter((a) => !a.startsWith('--'));
const targets = only.length ? WORKS.filter((w) => only.includes(w.slug)) : WORKS;

await mkdir(OUT, { recursive: true });
const results = [];
for (const w of targets) {
	process.stdout.write(`→ ${w.slug} ... `);
	const r = await capture(w, { force });
	results.push(r);
	if (r.status === 'OK') {
		console.log(`OK  cover ${kb(r.cover)} · full ${kb(r.full)} · loop ${kb(r.loop)}${r.canvas ? '' : ' (no canvas)'}`);
	} else {
		console.log(`${r.status}${r.detail ? ` — ${r.detail}` : ''}`);
	}
}
await rm(TMP, { recursive: true, force: true });

console.log('\n--- 摘要 ---');
for (const r of results) console.log(`${r.status.padEnd(13)} ${r.slug}`);
const bad = results.filter((r) => r.status !== 'OK' && r.status !== 'SKIP');
process.exit(bad.length ? 1 : 0);
