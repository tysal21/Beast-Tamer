/**
 * ================= REGION SCENERY =================
 * A drawn backdrop behind the game: layered landscape silhouettes (SVG) plus a light particle layer (canvas).
 * Primal Wilds keeps Tyler's painted camp and adds jungle silhouettes and fireflies.
 * Frozen Tundra: aurora, ice peaks and falling snow. Ashen Volcano: a glowing volcano, ash ridges and rising embers.
 * Particles pause in Doc view, in a background tab, and for players who prefer reduced motion.
 */
(function () {
  const W = 1600, H = 900;

  // Small seeded random so every region always draws the same skyline
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }

  /** A ridge line across the screen: base height, roughness, peak sharpness */
  function ridge(seed, baseY, amp, step, jag) {
    const r = rng(seed);
    let d = 'M0 ' + H + ' L0 ' + baseY;
    let y = baseY;
    for (let x = 0; x <= W + step; x += step) {
      y = baseY - amp * (0.35 + 0.65 * r()) + (jag ? (r() - 0.5) * jag : 0);
      d += ' L' + x + ' ' + y.toFixed(1);
    }
    return d + ' L' + W + ' ' + H + ' Z';
  }

  /** A soft canopy line made of overlapping round tree crowns */
  function canopy(seed, baseY, size) {
    const r = rng(seed);
    let d = 'M0 ' + H + ' L0 ' + baseY;
    for (let x = 0; x <= W; ) {
      const w = size * (0.6 + r() * 0.9), h = size * (0.5 + r() * 0.8);
      d += ' Q' + (x + w / 2).toFixed(1) + ' ' + (baseY - h * 1.6).toFixed(1) + ' ' + (x + w).toFixed(1) + ' ' + (baseY - r() * size * 0.3).toFixed(1);
      x += w;
    }
    return d + ' L' + W + ' ' + H + ' Z';
  }

  /** Fern / frond silhouettes along the bottom edge */
  function ferns(seed, count) {
    const r = rng(seed);
    let out = '';
    for (let i = 0; i < count; i++) {
      const x = r() * W, h = 90 + r() * 140, lean = (r() - 0.5) * 120;
      const tipX = x + lean, tipY = H - h;
      out += '<path d="M' + x.toFixed(0) + ' ' + H + ' Q' + (x + lean * 0.3).toFixed(0) + ' ' + (H - h * 0.6).toFixed(0) + ' ' + tipX.toFixed(0) + ' ' + tipY.toFixed(0) +
        ' Q' + (x + lean * 0.5 + 14).toFixed(0) + ' ' + (H - h * 0.5).toFixed(0) + ' ' + (x + 18).toFixed(0) + ' ' + H + ' Z"/>';
    }
    return out;
  }

  const SCENES = {
    wilds: {
      painted: true,
      svg: () =>
        '<g fill="#0b1209" opacity="0.55"><path d="' + canopy(11, 700, 120) + '"/></g>' +
        '<g fill="#070b06" opacity="0.8"><path d="' + canopy(23, 790, 90) + '"/></g>' +
        '<g fill="#040603" opacity="0.9">' + ferns(37, 26) + '</g>',
      fx: { kind: 'fireflies', count: 34 }
    },
    tundra: {
      svg: () =>
        '<defs><linearGradient id="sky-t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050b16"/><stop offset="0.6" stop-color="#0d1a2b"/><stop offset="1" stop-color="#16263a"/></linearGradient>' +
        '<linearGradient id="aur" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#34d399" stop-opacity="0"/><stop offset="0.3" stop-color="#34d399" stop-opacity="0.35"/><stop offset="0.6" stop-color="#22d3ee" stop-opacity="0.3"/><stop offset="1" stop-color="#a78bfa" stop-opacity="0"/></linearGradient>' +
        '<filter id="soft"><feGaussianBlur stdDeviation="18"/></filter></defs>' +
        '<rect width="' + W + '" height="' + H + '" fill="url(#sky-t)"/>' +
        '<g class="scene-aurora" filter="url(#soft)"><path d="M-50 230 C 300 120, 520 330, 820 210 S 1350 120, 1700 250 L1700 330 C 1350 220, 1100 380, 800 300 S 300 230, -50 330 Z" fill="url(#aur)"/></g>' +
        '<g fill="#1d3247" opacity="0.85"><path d="' + ridge(41, 600, 220, 80, 60) + '"/></g>' +
        '<g fill="#14263a"><path d="' + ridge(53, 690, 170, 55, 50) + '"/></g>' +
        '<g fill="#d6e6f2" opacity="0.08"><path d="' + ridge(53, 690, 170, 55, 50) + '" transform="translate(0,-4)"/></g>' +
        '<g fill="#0a1522"><path d="' + ridge(67, 800, 90, 40, 30) + '"/></g>',
      fx: { kind: 'snow', count: 70 }
    },
    volcano: {
      svg: () =>
        '<defs><linearGradient id="sky-v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d0605"/><stop offset="0.55" stop-color="#2a0e08"/><stop offset="1" stop-color="#4a1709"/></linearGradient>' +
        '<radialGradient id="glow-v" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fb923c" stop-opacity="0.75"/><stop offset="1" stop-color="#fb923c" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="lava" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde68a"/><stop offset="0.4" stop-color="#f97316"/><stop offset="1" stop-color="#7c2d12" stop-opacity="0"/></linearGradient></defs>' +
        '<rect width="' + W + '" height="' + H + '" fill="url(#sky-v)"/>' +
        '<ellipse class="scene-crater-glow" cx="1080" cy="300" rx="260" ry="170" fill="url(#glow-v)"/>' +
        '<path d="M760 760 L1010 315 Q1080 290 1150 315 L1420 760 Z" fill="#1a0b07"/>' +
        '<path class="scene-lava" d="M1050 318 Q1040 420 1005 520 Q990 580 960 640 L972 642 Q1012 560 1035 470 Q1060 390 1068 318 Z" fill="url(#lava)" opacity="0.85"/>' +
        '<path class="scene-lava" d="M1098 318 Q1120 400 1150 470 Q1170 520 1205 600 L1194 604 Q1150 520 1128 460 Q1104 390 1088 318 Z" fill="url(#lava)" opacity="0.6"/>' +
        '<g fill="#140806" opacity="0.9"><path d="' + ridge(71, 720, 130, 60, 40) + '"/></g>' +
        '<g fill="#0a0403"><path d="' + ridge(83, 810, 70, 45, 30) + '"/></g>',
      fx: { kind: 'embers', count: 55 }
    },
    abyss: {
      svg: () =>
        '<defs><linearGradient id="sky-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b2a3a"/><stop offset="1" stop-color="#02070d"/></linearGradient></defs>' +
        '<rect width="' + W + '" height="' + H + '" fill="url(#sky-a)"/>' +
        '<g fill="#03101a" opacity="0.9"><path d="' + ridge(97, 760, 160, 70, 40) + '"/></g>',
      fx: { kind: 'bubbles', count: 40 }
    }
  };

  // ---------- DOM ----------
  const scene = document.createElement('div');
  scene.id = 'scene';
  scene.setAttribute('aria-hidden', 'true');
  scene.innerHTML = '<svg id="scene-svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMax slice"></svg><canvas id="scene-fx"></canvas>';
  document.body.insertBefore(scene, document.body.firstChild);
  const svg = scene.querySelector('#scene-svg');
  const canvas = scene.querySelector('#scene-fx');
  const ctx = canvas.getContext('2d');

  let current = null, fx = null, parts = [];

  function regionId() {
    try { return getWorld().id; } catch (e) { return 'wilds'; }
  }

  function draw() {
    const id = regionId();
    if (id === current) return;
    current = id;
    const s = SCENES[id] || SCENES.wilds;
    svg.innerHTML = s.svg();
    document.body.classList.toggle('scene-unpainted', !s.painted);
    fx = s.fx;
    spawn();
  }

  // ---------- Particles ----------
  function size() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function makePart(fresh) {
    const w = window.innerWidth, h = window.innerHeight;
    const k = fx ? fx.kind : 'snow';
    const p = { x: rand(0, w), y: fresh ? rand(0, h) : 0, life: rand(0, Math.PI * 2) };
    if (k === 'snow') { p.y = fresh ? rand(0, h) : -10; p.r = rand(0.8, 2.6); p.vx = rand(-0.25, 0.25); p.vy = rand(0.35, 1.0); }
    if (k === 'embers') { p.y = fresh ? rand(h * 0.3, h) : h + 10; p.r = rand(0.8, 2.2); p.vx = rand(-0.3, 0.3); p.vy = -rand(0.4, 1.2); }
    if (k === 'fireflies') { p.y = rand(h * 0.45, h); p.r = rand(1.2, 2.4); p.vx = rand(-0.25, 0.25); p.vy = rand(-0.15, 0.15); }
    if (k === 'bubbles') { p.y = fresh ? rand(0, h) : h + 10; p.r = rand(1, 3.5); p.vx = rand(-0.1, 0.1); p.vy = -rand(0.3, 0.8); }
    return p;
  }
  function spawn() {
    const mobile = window.innerWidth < 700;
    const n = fx ? Math.round(fx.count * (mobile ? 0.5 : 1)) : 0;
    parts = [];
    for (let i = 0; i < n; i++) parts.push(makePart(true));
  }

  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let last = 0;
  function frame(t) {
    requestAnimationFrame(frame);
    if (t - last < 33) return; // about 30 fps is plenty for a backdrop
    last = t;
    if (reduced || document.hidden || document.body.classList.contains('stealth')) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
    draw();
    const w = window.innerWidth, h = window.innerHeight, k = fx ? fx.kind : null;
    ctx.clearRect(0, 0, w, h);
    const hot = document.querySelector('.erupt-strip.live') ? 2.2 : 1; // eruptions stir the embers
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      p.life += 0.03;
      p.x += p.vx * (k === 'embers' ? hot : 1) + (k === 'snow' ? Math.sin(p.life) * 0.3 : 0);
      p.y += p.vy * (k === 'embers' ? hot : 1);
      if (k === 'fireflies') { p.vx += (Math.random() - 0.5) * 0.04; p.vy += (Math.random() - 0.5) * 0.04; p.vx *= 0.98; p.vy *= 0.98; }
      if (p.y > h + 12 || p.y < -12 || p.x < -12 || p.x > w + 12) { parts[i] = makePart(false); continue; }
      let a, col;
      if (k === 'snow') { a = 0.55; col = '230,240,250'; }
      else if (k === 'embers') { a = 0.55 + 0.4 * Math.sin(p.life * 3); col = '251,146,60'; }
      else if (k === 'fireflies') { a = 0.25 + 0.55 * Math.max(0, Math.sin(p.life * 1.4)); col = '214,236,120'; }
      else { a = 0.35; col = '170,220,240'; }
      ctx.beginPath();
      ctx.fillStyle = 'rgba(' + col + ',' + a.toFixed(2) + ')';
      if (k === 'embers' || k === 'fireflies') { ctx.shadowColor = 'rgba(' + col + ',0.9)'; ctx.shadowBlur = 8; } else ctx.shadowBlur = 0;
      if (k === 'bubbles') { ctx.strokeStyle = 'rgba(' + col + ',' + a + ')'; ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.stroke(); }
      else { ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }
    }
  }

  window.addEventListener('resize', () => { size(); spawn(); });
  size();
  draw();
  requestAnimationFrame(frame);
  // Redraw the landscape after crossing a Rift
  setInterval(draw, 2000);
})();
