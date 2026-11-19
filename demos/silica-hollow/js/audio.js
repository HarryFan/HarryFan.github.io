/* ============================================================
   SILICA HOLLOW 矽墟 — ambient audio
   Layer A: procedural WebAudio soundscape (drone + sub + static + pulse)
   Layer B: royalty-free ambient loop (assets/audio/bgm.mp3, optional)
   One toggle governs both. Default MUTED — sound only after user opts in.
   ============================================================ */

let ctx, master, started = false, on = false;
let lfo, bgmEl, nodes = [];

function buildProcedural(){
  const now = ctx.currentTime;

  master = ctx.createGain();
  master.gain.value = 0;                 // fade in on enable
  master.connect(ctx.destination);

  // gentle master lowpass, swept by the pulse LFO ("signal breathing")
  const shape = ctx.createBiquadFilter();
  shape.type = 'lowpass';
  shape.frequency.value = 900;
  shape.Q.value = 0.6;
  shape.connect(master);

  // --- drone: detuned low oscillators (A1 / E2 / A2) ---
  const droneGain = ctx.createGain(); droneGain.gain.value = 0.16; droneGain.connect(shape);
  [55, 82.41, 110].forEach((f, i) => {
    const o = ctx.createOscillator();
    o.type = i === 2 ? 'triangle' : 'sine';
    o.frequency.value = f;
    o.detune.value = (i - 1) * 6;        // slight beating
    o.connect(droneGain); o.start(now); nodes.push(o);
  });

  // --- sub bass ---
  const sub = ctx.createOscillator(); const subG = ctx.createGain();
  sub.type = 'sine'; sub.frequency.value = 41.2; subG.gain.value = 0.12;
  sub.connect(subG); subG.connect(master); sub.start(now); nodes.push(sub);

  // --- distant pad shimmer (A3 / E4), tremolo ---
  const padGain = ctx.createGain(); padGain.gain.value = 0.035; padGain.connect(shape);
  [220, 329.63].forEach(f => {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
    o.connect(padGain); o.start(now); nodes.push(o);
  });
  const trem = ctx.createOscillator(); const tremG = ctx.createGain();
  trem.frequency.value = 0.13; tremG.gain.value = 0.02;
  trem.connect(tremG); tremG.connect(padGain.gain); trem.start(now); nodes.push(trem);

  // --- static / signal noise (the "訊噪") ---
  const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1);
  const noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
  const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1600; bp.Q.value = 0.7;
  const noiseG = ctx.createGain(); noiseG.gain.value = 0.014;
  noise.connect(bp); bp.connect(noiseG); noiseG.connect(master);
  noise.start(now); nodes.push(noise);
  // sweep the noise band slowly
  const nlfo = ctx.createOscillator(); const nlfoG = ctx.createGain();
  nlfo.frequency.value = 0.05; nlfoG.gain.value = 900;
  nlfo.connect(nlfoG); nlfoG.connect(bp.frequency); nlfo.start(now); nodes.push(nlfo);

  // --- pulse LFO: breathes the master filter (ties to the "reboot signal" motif) ---
  lfo = ctx.createOscillator(); const lfoG = ctx.createGain();
  lfo.frequency.value = 0.07; lfoG.gain.value = 340;
  lfo.connect(lfoG); lfoG.connect(shape.frequency); lfo.start(now); nodes.push(lfo);
}

function ensureBgm(){
  bgmEl = document.getElementById('bgm');
  if (!bgmEl) return;
  bgmEl.loop = true; bgmEl.volume = 0;    // fade managed below
}

function fade(target, t = 1.6){
  if (!master) return;
  const now = ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(master.gain.value, now);
  master.gain.linearRampToValueAtTime(target, now + t);
}

function fadeBgm(target, t = 1.6){
  if (!bgmEl) return;
  const steps = 24, start = bgmEl.volume, dv = (target - start) / steps;
  let i = 0;
  const iv = setInterval(() => {
    i++; bgmEl.volume = Math.max(0, Math.min(1, start + dv * i));
    if (i >= steps) clearInterval(iv);
  }, (t * 1000) / steps);
}

async function enable(){
  if (!started){
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    buildProcedural();
    ensureBgm();
    started = true;
  }
  if (ctx.state === 'suspended') await ctx.resume();
  fade(0.5);
  if (bgmEl){ try { await bgmEl.play(); } catch(e){} fadeBgm(0.32); }
  on = true;
}

function disable(){
  fade(0, 0.8);
  if (bgmEl){ fadeBgm(0, 0.8); setTimeout(()=>{ try{ bgmEl.pause(); }catch(e){} }, 850); }
  on = false;
}

/* ---------- UI SFX: short signal-blip for omen switching ---------- */
let sfxCtx;
function sfxContext(){
  if(ctx) return ctx;                                   // reuse BGM context if up
  if(!sfxCtx) sfxCtx = new (window.AudioContext || window.webkitAudioContext)();
  return sfxCtx;
}
window.silicaBlip = function(){
  if(!wantOn()) return;                                 // respect explicit mute
  try{
    const c = sfxContext();
    if(c.state === 'suspended') c.resume();
    const t = c.currentTime;
    // high triangle ping with tiny downward sweep
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(1320, t);
    o.frequency.exponentialRampToValueAtTime(860, t + 0.09);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.13, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + 0.14);
    // brief high-passed noise tick for "signal" texture
    const buf = c.createBuffer(1, Math.floor(c.sampleRate * 0.03), c.sampleRate);
    const d = buf.getChannelData(0);
    for(let i=0;i<d.length;i++) d[i] = (Math.random()*2-1) * (1 - i/d.length);
    const n = c.createBufferSource(); n.buffer = buf;
    const bp = c.createBiquadFilter(); bp.type = 'highpass'; bp.frequency.value = 2000;
    const ng = c.createGain(); ng.gain.value = 0.05;
    n.connect(bp); bp.connect(ng); ng.connect(c.destination);
    n.start(t); n.stop(t + 0.03);
  }catch(e){}
};

/* ---------- Endfield-style behaviour: default-on, first-gesture start,
   remembered preference, pause when tab hidden ---------- */
const PREF = 'silica-audio';                       // 'on' | 'off'
const wantOn = () => (localStorage.getItem(PREF) || 'on') === 'on';   // default ON

function setBtn(state){
  const b = document.getElementById('audio-btn');
  if (!b) return;
  b.classList.toggle('on', state);
  b.setAttribute('aria-pressed', String(state));
}

function initAudio(){
  const btn = document.getElementById('audio-btn');
  if (!btn) return;

  const desired = wantOn();
  setBtn(desired);                                 // reflect intent immediately (armed)

  // manual toggle — persists choice
  btn.addEventListener('click', () => {
    if (on){ disable(); setBtn(false); localStorage.setItem(PREF, 'off'); }
    else   { enable();  setBtn(true);  localStorage.setItem(PREF, 'on');  }
  });

  // autoplay-policy-safe: start on the FIRST user gesture anywhere, if intent is ON
  if (desired){
    const evs = ['pointerdown','keydown','wheel','touchstart'];
    const cleanup = () => evs.forEach(e => removeEventListener(e, kick));
    function kick(){ if (!on && wantOn()) enable(); cleanup(); }
    evs.forEach(e => addEventListener(e, kick, { passive:true }));
  }

  // pause when tab hidden, resume when back (only if currently on)
  document.addEventListener('visibilitychange', () => {
    if (!started) return;
    if (document.hidden){ if (ctx) ctx.suspend(); if (bgmEl) bgmEl.pause(); }
    else if (on){ if (ctx) ctx.resume(); if (bgmEl) bgmEl.play().catch(()=>{}); }
  });
}

initAudio();
