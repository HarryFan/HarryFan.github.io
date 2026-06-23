#!/usr/bin/env node
// Generate style cover images via OpenAI gpt-image-1.
// Key: read from env OPENAI_API_KEY or file .openai_key.local (gitignored).
// Never logs the key. Output: public/styles/<slug>.png (caller converts to webp).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const keyFile = path.join(root, '.openai_key.local');
const apiKey =
  process.env.OPENAI_API_KEY ||
  (fs.existsSync(keyFile) ? fs.readFileSync(keyFile, 'utf8').trim() : '');

if (!apiKey) {
  console.error('NO_KEY: set OPENAI_API_KEY env or create .openai_key.local');
  process.exit(2);
}

// brand-free aesthetic prompts (avoid trademark names -> fewer refusals, better art)
const styles = [
  {
    slug: 'ghibli',
    prompt:
      'Nostalgic hand-painted 2D animation background art, soft cel-shaded style, a lush rolling green meadow under a vast sky with fluffy hand-drawn clouds, warm golden afternoon light, a quiet country path and a single small wooden house, gentle watercolor-textured backgrounds, cozy and serene mood, no text, no watermark, cinematic wide composition',
  },
  {
    slug: 'pixar',
    prompt:
      'Modern 3D animated movie still, soft global illumination, subsurface-scattering skin, a cute rounded stylized character with big expressive eyes in a colorful whimsical environment, shallow depth of field, vibrant cinematic lighting, polished CGI render, no text, no watermark, wide composition',
  },
  {
    slug: 'makoto-shinkai',
    prompt:
      'Hyper-detailed anime style scenery, a breathtaking luminous sky at golden hour with volumetric god rays and lens flare, vivid saturated colors, photorealistic billowing clouds, a quiet Japanese town skyline silhouette below, emotional cinematic atmosphere, no text, no watermark, wide composition',
  },
  {
    slug: 'watercolor',
    prompt:
      'Loose expressive watercolor painting, soft bleeding pigments and wet-on-wet washes on visible cold-press paper texture, a dreamy abstract landscape of hills and sky in delicate pastel hues, hand-painted brushwork with organic edges, airy and light, no text, no watermark, wide composition',
  },
  {
    slug: 'pixel-art',
    prompt:
      '16-bit retro pixel art game scene, crisp isometric environment with a limited vibrant color palette, a cozy fantasy village with trees and a winding path, careful dithering, sharp pixels, no anti-aliasing, classic SNES JRPG aesthetic, no text, no watermark, wide composition',
  },
];

const quality = process.env.IMG_QUALITY || 'high'; // low|medium|high
const size = '1536x1024';
const outDir = path.join(root, 'public', 'styles');
fs.mkdirSync(outDir, { recursive: true });

for (const s of styles) {
  process.stdout.write(`generating ${s.slug} ... `);
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt: s.prompt,
      size,
      quality,
      n: 1,
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    console.error(`FAIL ${res.status}: ${txt.slice(0, 300)}`);
    process.exit(1);
  }
  const json = await res.json();
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) {
    console.error(`FAIL no image data for ${s.slug}`);
    process.exit(1);
  }
  const outPng = path.join(outDir, `${s.slug}.png`);
  fs.writeFileSync(outPng, Buffer.from(b64, 'base64'));
  console.log(`saved ${path.relative(root, outPng)}`);
}
console.log('ALL_DONE');
