#!/usr/bin/env node
// Generate Pixar-style cover images for blog posts via OpenAI gpt-image-1.
// API key: env OPENAI_API_KEY or .openai_key.local (gitignored).
// Output: public/blog/<slug>.png  +  updates heroImage in each .md frontmatter.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const keyFile = path.join(root, '.openai_key.local');
const apiKey =
  process.env.OPENAI_API_KEY ||
  (fs.existsSync(keyFile) ? fs.readFileSync(keyFile, 'utf8').trim() : '');

// Uses Pollinations.ai — no API key required

const outDir = path.join(root, 'public', 'blog');
fs.mkdirSync(outDir, { recursive: true });

const PIXAR_SUFFIX =
  'Pixar 3D animated movie still, soft global illumination, subsurface-scattering skin, big expressive eyes, colorful whimsical tech environment, vibrant cinematic lighting, polished CGI render, no text, no watermark, wide composition';

const posts = [
  {
    slug: '2024-03-01-frontend-beginner-guide',
    scene:
      'A cheerful young developer character sits at a glowing desk surrounded by floating HTML CSS JavaScript icons forming a rainbow arch, colorful code panels light the cozy room',
  },
  {
    slug: '2024-06-02-designer-to-frontend-rwd',
    scene:
      'A creative designer character holds a giant pencil on one side and taps a glowing browser screen on the other, three device frames (desktop tablet phone) float side by side in a bright studio',
  },
  {
    slug: '2024-07-31-vue-router-scroll-position',
    scene:
      'A small round character riding a glowing scroll arrow that curves down and then snaps back up to the correct position on a giant magical webpage, surrounded by soft sparkles',
  },
  {
    slug: '2024-08-08-antd-vue-table-width',
    scene:
      'A tiny engineer character stretches a glowing data table like elastic fabric so its columns perfectly fill a bright monitor frame, colorful rows of data glow neatly',
  },
  {
    slug: '2024-11-14-2025-frontend-trends-ai',
    scene:
      'A futuristic developer character stands at the center with five glowing trend orbs orbiting around: AI robot, real-time collaboration hologram, no-code platform, MACH architecture crystal, and evolving framework icons',
  },
  {
    slug: '2024-12-04-vue-key-lodash-uniqueid',
    scene:
      'A cheerful character hands out uniquely numbered glowing puzzle pieces to a row of happy list items in a Vue component, each piece snaps perfectly into place with a satisfying sparkle',
  },
  {
    slug: '2025-02-14-vue-remove-console-production',
    scene:
      'A developer character waves a magic broom sweeping away glowing console.log bubbles from a production build dashboard, the cleaned screen shines bright and secure',
  },
  {
    slug: '2025-05-13-vue-spa-ga4-ads-tracking',
    scene:
      'A small analyst character surfs a glowing wave of colorful real-time analytics data inside a Vue SPA, Google Analytics chart bars rise triumphantly in the background',
  },
  {
    slug: '2025-05-19-vant-ui-traditional-chinese',
    scene:
      'A round character flips a glowing language toggle switch and Traditional Chinese characters bloom like flowers on a mobile UI, replacing the simplified text with a cheerful pop',
  },
  {
    slug: '2025-05-28-lottie-animation-tool',
    scene:
      'A delighted character is surrounded by dozens of tiny dancing Lottie animation sprites jumping out of a JSON file like confetti, each one loops with a different playful motion',
  },
  {
    slug: '2025-06-04-vue2-integer-only-input',
    scene:
      'A precise engineer character stands guard at a glowing input field holding a red stop sign that blocks decimal and letter characters, only whole integers slide through on a conveyor belt',
  },
  {
    slug: '2025-06-12-ga4-frontend-optimization',
    scene:
      'A pilot character steers a rocket-shaped website through clouds of GA4 performance data, leaving a trail of green Core Web Vitals scores and rising conversion graphs',
  },
  {
    slug: '2025-07-31-frontend-workflow-prototype-to-code',
    scene:
      'A developer character walks a glowing assembly line that transforms a paper wireframe sketch into a living animated website, AI helper robots assist at each station',
  },
  {
    slug: '2025-10-23-express-to-nestjs',
    scene:
      'A frontend character holds a tiny Express signpost on the left and gazes in awe at a grand NestJS castle on the right with modular towers labeled Controller Service Module, a bridge of TypeScript connects them',
  },
  {
    slug: '2026-03-19-ai-datadog-gcp-mongodb-seminar',
    scene:
      'Four brand mascot robots (observability dog, cloud balloon, leaf database, streaming camera) gather around a glowing stage presenting next-generation AI dashboards to an excited audience',
  },
  {
    slug: '2026-03-19-aws-mongodb-seminar-notes',
    scene:
      'A frontend engineer character sits wide-eyed in a seminar hall while AWS cloud blocks and MongoDB leaf icons form a colorful Lego architecture above the stage, a notepad floats beside',
  },
  {
    slug: '2026-03-19-claude-md-collaboration',
    scene:
      'A human developer and a glowing AI companion co-write on a shared holographic CLAUDE.md document in a cozy futuristic workspace, both smiling as neat rules appear on screen',
  },
  {
    slug: '2026-03-19-iwd-2026-notes',
    scene:
      'A confident woman engineer character stands at a luminous crossroads where AI opportunity paths radiate in every direction, holding a glowing career compass with an arrow pointing forward',
  },
  {
    slug: '2026-03-19-telegram-bot-gdg-build-with-ai',
    scene:
      'A cheerful robot messenger pops out of a Telegram speech bubble and hands summarized notes to a developer character, Gemini stars sparkle in the background of a cozy conference room',
  },
  {
    slug: '2026-03-19-vben-admin-tree-report',
    scene:
      'A determined engineer character climbs a massive glowing tree of nested table rows, each branch is a collapsible report node, colorful data leaves unfold as she ascends',
  },
  {
    slug: '2026-05-20-frontend-to-backend-pick-nodejs',
    scene:
      'A frontend character in a colorful CSS-patterned coat confidently steps onto a glowing bridge labeled Node.js that spans from a bright browser world to a server-room world, both sides welcoming',
  },
  {
    slug: '2026-05-28-static-images-to-cloudflare-r2',
    scene:
      'A developer character launches image files like paper airplanes from their laptop toward a glowing orange Cloudflare cloud, the planes transform into fast-loading thumbnails on arrival',
  },
  {
    slug: '2026-06-05-taiwan-public-icons-ai-skill',
    scene:
      'A character opens a treasure chest of Taiwan public icon sprites that float up and arrange themselves with AI help into a beautiful organized library grid, Taiwan silhouette glows warmly in background',
  },
  {
    slug: '2026-06-10-frontend-value-from-build-to-decide',
    scene:
      'A developer character on the left pushes code blocks while the same character on the right stands on a higher platform making strategic decisions with a glowing blueprint, an elevator connects the two levels',
  },
  {
    slug: '2026-06-18-harness-engineering-denny-huang',
    scene:
      'An engineer character presents a glowing Harness CI/CD pipeline diagram to an audience, colorful deployment stages light up one by one like a pinball machine in a stylish conference room',
  },
  {
    slug: '2026-06-19-chrome-cdp-skill-claude-code',
    scene:
      'A friendly Claude AI robot sits in the co-pilot seat of a glowing Chrome browser cockpit, pressing CDP control buttons that automate a webpage while a developer watches amazed',
  },
  {
    slug: '2026-06-20-frontend-career-advice-h2-2026',
    scene:
      'A frontend developer character climbs a luminous staircase made of code brackets and design tools, each step is labeled with a 2026 skill milestone, sunrise glows behind the final step',
  },
  {
    slug: '2026-06-24-figma-chrome-extension-capture-page',
    scene:
      'A designer character clicks a glowing Chrome extension button and an entire webpage lifts off the screen like a magic carpet, all components neatly labeled, flying into a Figma canvas',
  },
  {
    slug: '2026-06-27-im-app-case-study',
    scene:
      'A developer character and a glowing Claude AI robot co-build a real-time chat application together, WebSocket lightning bolts arc between a browser window and a server rack, Vue 3 logo and chat bubbles float around them in a cozy futuristic workspace',
  },
];

async function generateImage(scene) {
  const prompt = encodeURIComponent(`${scene}, ${PIXAR_SUFFIX}`);
  const url = `https://image.pollinations.ai/prompt/${prompt}?width=1536&height=1024&nologo=true&model=flux&seed=${Math.floor(Math.random()*99999)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Pollinations ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

function updateFrontmatter(mdPath, slug) {
  let content = fs.readFileSync(mdPath, 'utf8');
  const newHeroImage = `/blog/${slug}.png`;
  if (content.includes(`heroImage: '${newHeroImage}'`)) return false;
  if (/^heroImage:/m.test(content)) {
    content = content.replace(/^heroImage:.*$/m, `heroImage: '${newHeroImage}'`);
  } else {
    content = content.replace(/^(pubDate:.*$)/m, `$1\nheroImage: '${newHeroImage}'`);
  }
  fs.writeFileSync(mdPath, content, 'utf8');
  return true;
}

let done = 0;
let skipped = 0;

for (const { slug, scene } of posts) {
  const outPng = path.join(outDir, `${slug}.png`);
  const mdPath = path.join(root, 'src', 'content', 'blog', `${slug}.md`);

  if (!fs.existsSync(mdPath)) {
    console.warn(`SKIP (no md): ${slug}`);
    skipped++;
    continue;
  }

  if (fs.existsSync(outPng)) {
    console.log(`EXISTS ${slug}.png — updating frontmatter only`);
    updateFrontmatter(mdPath, slug);
    skipped++;
    continue;
  }

  process.stdout.write(`generating ${slug} ... `);
  try {
    const buf = await generateImage(scene);
    fs.writeFileSync(outPng, buf);
    updateFrontmatter(mdPath, slug);
    console.log('done');
    done++;
  } catch (err) {
    console.error(`FAIL: ${err.message}`);
    process.exit(1);
  }
}

console.log(`\nALL_DONE: ${done} generated, ${skipped} skipped`);
