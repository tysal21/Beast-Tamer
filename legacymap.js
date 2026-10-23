/**
 * ================= THE LEGACY MAP =================
 * The Hunter's Legacy drawn on a beast's paw. Built once, then updated in place so the view keeps its scroll.
 * Click (or tap) a node to see it in the side card and buy it there. Drag the map with the mouse to look around.
 */
(function () {
  const W = LEGACY_CONFIG.mapWidth, H = LEGACY_CONFIG.mapHeight;
  const ZOOMS = [0.7, 1, 1.35, 1.75];
  const ZOOM_KEY = 'bt_lm_zoom';
  let zoomIdx = 1;
  try { const z = parseInt(localStorage.getItem(ZOOM_KEY), 10); if (z >= 0 && z < ZOOMS.length) zoomIdx = z; } catch (e) { /* storage blocked */ }

  let built = false, selected = null, picked = false, centered = false;
  const nodeEls = {}, linkEls = [], glowEls = {};
  const areaById = {};
  LEGACY_AREAS.forEach(a => { areaById[a.id] = a; });

  const els = {
    viewport: document.getElementById('legacy-map'),
    canvas: null,
    detail: document.getElementById('legacy-detail'),
    rings: document.getElementById('legacy-rings'),
    areas: document.getElementById('legacy-areas')
  };
  if (!els.viewport) return;

  function seals() { return (gameState.totem && gameState.totem.sealsBroken) || 0; }
  function pct(v) { return Math.round(v * 100); }
  function fmtTime(sec) { const m = Math.floor(sec / 60), s = Math.round(sec % 60); return m + 'm' + (s ? ' ' + s + 's' : ''); }

  /** What a node is giving right now, e.g. "Now: +30% Meat/s" (empty before rank 1) */
  function nowText(node) {
    const r = getLegacyRank(node.id);
    if (typeof getLegacyNodeNowText === 'function' && node.branch) return getLegacyNodeNowText(node);
    if (r < 1) return '';
    const p = pct(r * (node.perRank || 0));
    switch (node.id) {
      case 'shard_sense': return 'Now: +' + p + '% Totem Shards';
      case 'primal_heart': return 'Now: +' + p + '% Combat Power';
      case 'relic_polish': return 'Now: relics +' + p + '%';
      case 'relic_echoes': {
        const ech = (gameState.legacy && gameState.legacy.echoes) || {};
        const n = Object.values(ech).reduce((a, b) => a + b, 0);
        return n ? 'Echoes found: ' + n : 'No Echoes yet. Re-fight tamed bosses on the Hunt tab.';
      }
      case 'auto_cook': return gameState.fishing && gameState.fishing.meal ? 'Keeping your meal going' : 'Cook a meal once and the camp keeps it going';
      case 'auto_expedition': return 'Parties go straight back out';
      case 'awakened_fury': return 'Now: Awakened Strike +' + p + '%';
      case 'deep_creels': return 'Now: +' + p + '% fish storage';
      case 'swift_lines': return 'Now: a fish per line every ' + fmtTime(getLineIntervalSec());
      case 'deep_waters': return 'Now: Rare fish on idle lines, up to ' + getMaxFishingLines() + ' lines';
      case 'codex_lore': return 'Now: Codex bonuses +' + p + '%';
      case 'hearty_meals': return 'Now: meals +' + p + '% stronger';
      case 'abyssal_line': return 'Now: ' + getMaxFishingLines() + ' lines, Legendary and Mythic x2';
      case 'brisk_builders': return 'Now: stations -' + p + '%';
      case 'old_foundations': case 'deep_foundations': case 'endless_hearth': return 'Now: +' + getStationFreeLevels() + ' free levels on every unlocked station';
      case 'quarry_stations': return 'Now: ' + getQuarryStationCount() + ' station' + (getQuarryStationCount() === 1 ? '' : 's') + ' digging';
      case 'master_butcher': return 'Now: x' + LEGACY_CONFIG.feastMultMaster + ' per star';
      case 'apex_instinct': return 'Now: +' + p + '% vs Apex and Titans';
      case 'steady_nerves': return 'Now: -' + p + '% Stamina and wounds (Apex, Titans)';
      case 'apex_dominion': return 'Now: +' + pct(APEX_CONFIG.powerPerTier + r * node.perRank) + '% per Apex';
      case 'titanbane': return 'Now: +' + p + '% vs Titans and Guardians';
      case 'fang_hoard': return 'Now: +' + p + '% Fangs and Apex Shards';
      case 'long_hunt': return 'Now: +' + p + '% Combat Power';
      case 'rich_veins': return 'Now: +' + p + '% expedition hauls';
      case 'thrifty_smith': return 'Now: -' + p + '% materials';
      case 'masterwork': return 'Tempers this run: ' + getTemperLevel() + ' (Hunter Power x' + getTemperMult().toFixed(2) + ')';
      case 'honed_edge': return 'Now: Honing to level ' + getHoningMaxLevel();
      case 'master_temper': return 'Now: +' + pct(LEGACY_CONFIG.temperPowerMaster) + '% per temper';
      case 'apex_grade': return 'Now: Apex gear to level ' + (GEAR_CONFIG.levelsPerGrade + LEGACY_CONFIG.gearExtraLevels);
      case 'warm_nests': return 'Now: eggs hatch ' + p + '% faster';
      case 'strong_blood': return 'Now: +' + p + '% true-born Beast Power';
      case 'fourth_slot': case 'fifth_slot': return 'Now: ' + getPackSlots() + ' Pack slots';
      case 'lasting_bonds': return 'Now: true-borns remember ' + p + '% of their level';
      case 'alpha_howl': return 'Now: Pack abilities x1.5';
    }
    return '';
  }

  function nodeState(n) {
    const rank = getLegacyRank(n.id);
    if (isLegacyNodeSealed(n)) return 'sealed';
    if (isLegacyNodeMaxed(n)) return 'maxed';
    if (!isLegacyNodeOpen(n)) return rank > 0 ? 'owned' : 'closed';
    if (canBuyLegacyRank(n)) return 'afford';
    return rank > 0 ? 'owned' : 'open';
  }

  function rankLabel(n) {
    const r = getLegacyRank(n.id);
    if (n.maxRank === null || n.maxRank === undefined) return r > 0 ? String(r) : '∞';
    if (n.maxRank === 1) return r ? '✓' : '';
    return r + '/' + n.maxRank;
  }

  function build() {
    const c = document.createElement('div');
    c.className = 'lm-canvas';
    let html = '<img class="lm-art" src="assets/legacy/paw.webp" alt="" draggable="false">';
    LEGACY_AREAS.forEach(a => {
      const [x, y, rx, ry] = a.glow;
      html += '<div class="lm-glow" data-area="' + a.id + '" style="left:' + ((x - rx * 1.25) / W * 100) + '%;top:' + ((y - ry * 1.25) / H * 100) + '%;width:' + (rx * 2.5 / W * 100) + '%;height:' + (ry * 2.5 / H * 100) + '%"></div>';
    });
    html += '<svg class="lm-links" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" aria-hidden="true">';
    LEGACY_NODES.forEach(n => n.requires.forEach(rid => {
      const r = getLegacyNode(rid);
      if (!r) return;
      html += '<line data-from="' + rid + '" data-to="' + n.id + '" x1="' + r.x + '" y1="' + r.y + '" x2="' + n.x + '" y2="' + n.y + '"></line>';
    }));
    html += '</svg>';
    LEGACY_NODES.forEach(n => {
      const a = areaById[n.area] || LEGACY_AREAS[0];
      html += '<button type="button" class="lm-node' + (n.capstone ? ' cap' : '') + (n.maxRank === null ? ' endless' : '') + '" data-lm-node="' + n.id + '" style="left:' + (n.x / W * 100) + '%;top:' + (n.y / H * 100) + '%;--lm-c:' + a.color + '" aria-label="' + n.name + '">' +
        '<i class="fa-solid ' + n.icon + '"></i><span class="lm-rank"></span><span class="lm-name">' + n.name + '</span></button>';
    });
    c.innerHTML = html;
    els.viewport.innerHTML = '';
    els.viewport.appendChild(c);
    els.canvas = c;
    c.querySelectorAll('.lm-node').forEach(b => { nodeEls[b.getAttribute('data-lm-node')] = b; });
    c.querySelectorAll('line').forEach(l => linkEls.push(l));
    c.querySelectorAll('.lm-glow').forEach(g => { glowEls[g.getAttribute('data-area')] = g; });
    applyZoom(false);
    built = true;
  }

  function applyZoom(keepCenter) {
    if (!els.canvas) return;
    const vp = els.viewport;
    const cx = keepCenter ? (vp.scrollLeft + vp.clientWidth / 2) / els.canvas.offsetWidth : 0.5;
    const cy = keepCenter ? (vp.scrollTop + vp.clientHeight / 2) / els.canvas.offsetHeight : 0.55;
    const base = Math.max(640, Math.min(900, vp.clientWidth || 800));
    const w = Math.round(base * ZOOMS[zoomIdx]);
    els.canvas.style.width = w + 'px';
    els.canvas.style.height = Math.round(w * H / W) + 'px';
    // Nodes keep the same size relative to the paw, within finger-friendly limits
    els.canvas.style.setProperty('--lm-n', Math.round(Math.max(28, Math.min(52, w * 0.046))) + 'px');
    vp.scrollLeft = cx * w - vp.clientWidth / 2;
    vp.scrollTop = cy * (w * H / W) - vp.clientHeight / 2;
    document.querySelectorAll('[data-lm-zoom]').forEach(b => {
      const d = b.getAttribute('data-lm-zoom');
      b.disabled = d === 'in' ? zoomIdx >= ZOOMS.length - 1 : zoomIdx <= 0;
    });
  }

  function update() {
    if (!built) build();
    LEGACY_NODES.forEach(n => {
      const b = nodeEls[n.id];
      if (!b) return;
      const st = nodeState(n);
      b.className = 'lm-node lm-' + st + (n.capstone ? ' cap' : '') + (n.maxRank === null ? ' endless' : '') + (getLegacyRank(n.id) > 0 ? ' has' : '') + (selected === n.id ? ' sel' : '');
      b.querySelector('.lm-rank').textContent = st === 'sealed' ? '' : rankLabel(n);
      const why = st === 'sealed' ? ' Opens at Seal ' + n.seal + '.' : (st === 'closed' ? ' Needs ' + n.requires.filter(id => getLegacyRank(id) < 1).map(id => getLegacyNode(id).name).join(' and ') + '.' : '');
      b.setAttribute('data-tip', n.name + ': ' + n.desc + why);
    });
    linkEls.forEach(l => {
      const from = getLegacyRank(l.getAttribute('data-from')) > 0;
      const toNode = getLegacyNode(l.getAttribute('data-to'));
      const to = getLegacyRank(toNode.id) > 0;
      l.setAttribute('class', from && to ? 'lit' : (from && !isLegacyNodeSealed(toNode) ? 'open' : ''));
      l.style.stroke = from && to ? (areaById[toNode.area] || {}).color : '';
    });
    LEGACY_AREAS.forEach(a => {
      const g = glowEls[a.id];
      if (g) g.style.opacity = (0.08 + 0.85 * getLegacyAreaFill(a.id)).toFixed(3);
    });
    renderRings();
    renderAreas();
    renderDetail();
  }

  function renderRings() {
    if (!els.rings) return;
    const k = seals();
    els.rings.innerHTML = LEGACY_RINGS.map(r => {
      const open = k >= r.seal;
      return '<span class="lm-ring' + (open ? ' open' : '') + '"><i class="fa-solid ' + (open ? 'fa-lock-open' : 'fa-lock') + '"></i>' + r.name + (open ? '' : ' · Seal ' + r.seal) + '</span>';
    }).join('');
  }

  function renderAreas() {
    if (!els.areas) return;
    els.areas.innerHTML = LEGACY_AREAS.map(a => {
      const f = getLegacyAreaFill(a.id);
      return '<button type="button" class="lm-area" data-lm-area="' + a.id + '" style="--lm-c:' + a.color + '" data-tip="' + a.name + ': ' + a.tagline + '. ' + pct(f) + '% filled."><i class="fa-solid ' + a.icon + '"></i><span>' + a.name + '</span><span class="lm-area-bar"><span style="width:' + pct(f) + '%"></span></span></button>';
    }).join('');
  }

  function pickDefault() {
    const afford = LEGACY_NODES.filter(n => canBuyLegacyRank(n)).sort((a, b) => getLegacyNodeCost(a) - getLegacyNodeCost(b))[0];
    return (afford || getLegacyNode('battle_insight')).id;
  }

  function renderDetail() {
    if (!els.detail) return;
    // Until you pick a node yourself, the card shows the cheapest one you can buy
    if (!picked || !selected || !getLegacyNode(selected)) selected = pickDefault();
    const n = getLegacyNode(selected);
    const a = areaById[n.area] || LEGACY_AREAS[0];
    const st = nodeState(n);
    const rank = getLegacyRank(n.id);
    const cost = getLegacyNodeCost(n);
    const now = nowText(n);
    const shards = gameState.totem.shards;
    let status = '', btn = '';
    if (st === 'sealed') {
      status = '<div class="lm-d-lock"><i class="fa-solid fa-lock"></i> Opens when you break Seal ' + n.seal + ' on the Primal Totem (' + seals() + ' broken so far).</div>';
    } else if (st === 'maxed') {
      btn = '<div class="lm-d-max">MAXED</div>';
    } else if (!isLegacyNodeOpen(n)) {
      const needs = n.requires.filter(id => getLegacyRank(id) < 1).map(id => getLegacyNode(id).name);
      status = '<div class="lm-d-lock"><i class="fa-solid fa-link"></i> Needs ' + needs.join(' and ') + ' (rank 1).</div>';
    }
    if (st !== 'sealed' && st !== 'maxed') {
      const can = canBuyLegacyRank(n);
      btn = '<button type="button" class="lm-buy" data-legacy-buy="' + n.id + '"' + (can ? '' : ' disabled') + '>' +
        (rank === 0 ? 'Learn' : 'Rank up') + ' · ' + formatNumber(cost) + ' Shards</button>' +
        (!can && isLegacyNodeOpen(n) && cost > shards ? '<div class="lm-d-short">' + formatNumber(cost - shards) + ' more Shards needed</div>' : '');
    }
    const max = n.maxRank === null || n.maxRank === undefined ? 'no limit' : n.maxRank;
    els.detail.innerHTML =
      '<div class="lm-d-area" style="--lm-c:' + a.color + '"><i class="fa-solid ' + a.icon + '"></i>' + a.name + (n.area === 'palm' ? '' : ' · ' + (LEGACY_RINGS.slice().reverse().find(r => r.seal <= (n.seal || 1)) || LEGACY_RINGS[0]).name) + '</div>' +
      '<div class="lm-d-head" style="--lm-c:' + a.color + '"><span class="lm-d-icon"><i class="fa-solid ' + n.icon + '"></i></span><div><div class="lm-d-name">' + n.name + '</div>' +
      '<div class="lm-d-rank">' + (n.maxRank === 1 ? (rank ? 'Learned' : 'One rank') : 'Rank ' + rank + ' / ' + max) + '</div></div></div>' +
      '<p class="lm-d-desc">' + n.desc + '</p>' +
      (now ? '<div class="lm-d-now">' + now + '</div>' : '') + status + btn;
  }

  function select(id) {
    selected = id;
    picked = true;
    update();
  }

  // ---------- Input ----------
  els.viewport.addEventListener('click', e => {
    if (dragMoved) return;
    const b = e.target.closest('[data-lm-node]');
    if (!b) return;
    select(b.getAttribute('data-lm-node'));
    if (window.innerWidth < 1024 && els.detail) els.detail.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
  if (els.detail) els.detail.addEventListener('click', e => {
    const b = e.target.closest('[data-legacy-buy]');
    if (!b) return;
    const node = getLegacyNode(b.getAttribute('data-legacy-buy'));
    if (node && buyLegacyRank(node.id)) {
      sound.playTone(520, 'triangle', 0.12, 0.1);
      logCombatMessage('🐾 <strong>Legacy Map:</strong> ' + node.name + (node.maxRank === 1 ? ' learned!' : ' rank ' + getLegacyRank(node.id) + '.'), 'unlock');
      if (typeof renderLegacyPanel === 'function') renderLegacyPanel();
      if (typeof renderMenagerie === 'function') renderMenagerie();
      if (typeof renderGeneratorsLadder === 'function') renderGeneratorsLadder();
      saveGameToStorage();
    }
  });
  document.addEventListener('click', e => {
    const z = e.target.closest('[data-lm-zoom]');
    if (z) {
      zoomIdx = Math.max(0, Math.min(ZOOMS.length - 1, zoomIdx + (z.getAttribute('data-lm-zoom') === 'in' ? 1 : -1)));
      try { localStorage.setItem(ZOOM_KEY, String(zoomIdx)); } catch (err) { /* storage blocked */ }
      applyZoom(true);
      return;
    }
    const ar = e.target.closest('[data-lm-area]');
    if (ar) {
      const a = areaById[ar.getAttribute('data-lm-area')];
      if (a) scrollToPoint(a.glow[0], a.id === 'palm' ? a.glow[1] : a.glow[1] - 90);
    }
  });

  function scrollToPoint(x, y) {
    if (!els.canvas) return;
    const w = els.canvas.offsetWidth, h = els.canvas.offsetHeight;
    els.viewport.scrollTo({ left: x / W * w - els.viewport.clientWidth / 2, top: y / H * h - els.viewport.clientHeight / 2, behavior: 'smooth' });
  }

  // Drag to pan (mouse and pen; fingers already scroll natively)
  let drag = null, dragMoved = false;
  els.viewport.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch' || e.button !== 0) return;
    drag = { x: e.clientX, y: e.clientY, l: els.viewport.scrollLeft, t: els.viewport.scrollTop };
    dragMoved = false;
  });
  window.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!dragMoved && Math.abs(dx) + Math.abs(dy) < 6) return;
    dragMoved = true;
    els.viewport.classList.add('dragging');
    els.viewport.scrollLeft = drag.l - dx;
    els.viewport.scrollTop = drag.t - dy;
  });
  window.addEventListener('pointerup', () => {
    if (!drag) return;
    drag = null;
    els.viewport.classList.remove('dragging');
    setTimeout(() => { dragMoved = false; }, 0);
  });

  window.addEventListener('resize', () => { if (built && gameState.activeTab === 'legacy') applyZoom(true); });

  /** Called by the Legacy tab whenever something changed */
  window.renderLegacyMap = function () {
    update();
    if (!centered && els.viewport.clientWidth > 0) {
      centered = true;
      applyZoom(false);
    }
  };
  window.btLegacyMap = { select, update, scrollToPoint, get selected() { return selected; } };
})();
