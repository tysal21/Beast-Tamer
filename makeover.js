/**
 * ================= CAMP & HUNT MAKEOVER (Phase 2) =================
 * Small living touches on top of the existing screens: embers when you hunt from the fire,
 * and a fire that burns low in a blizzard until you warm the camp back up.
 */
(function () {
  const btn = document.getElementById('btn-forage');
  const embers = document.getElementById('hearth-embers');
  const card = document.getElementById('hearth-card');
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (btn && embers) {
    btn.addEventListener('click', () => {
      btn.classList.add('stoke');
      setTimeout(() => btn.classList.remove('stoke'), 120);
      if (reduced || document.body.classList.contains('stealth')) return;
      for (let i = 0; i < 5; i++) {
        const e = document.createElement('span');
        e.className = 'hearth-ember';
        e.style.setProperty('--dx', (Math.random() * 90 - 45).toFixed(0) + 'px');
        e.style.left = (Math.random() * 40 - 20).toFixed(0) + 'px';
        e.style.animationDelay = (i * 40) + 'ms';
        embers.appendChild(e);
        setTimeout(() => e.remove(), 1200);
      }
    });
  }

  // Fire size follows the weather: low in a blizzard, growing back as Warmth fills
  function tickHeat() {
    if (!card) return;
    let heat = 1, cold = false;
    try {
      if (typeof isBlizzardRaging === 'function' && isBlizzardRaging()) { cold = true; heat = 0.45 + 0.55 * getWarmthPct(); }
    } catch (e) { /* not ready */ }
    card.style.setProperty('--heat', heat.toFixed(2));
    card.classList.toggle('cold', cold);
  }
  setInterval(tickHeat, 500);
  tickHeat();
})();

/* ---------- Hunt: odds dial, wanted-poster header, footprint trail ---------- */
(function () {
  const txt = document.getElementById('odds-percentage-text');
  const arc = document.getElementById('odds-arc');
  const needle = document.getElementById('odds-needle');
  function syncDial() {
    if (!txt || !arc || !needle) return;
    const p = Math.max(0, Math.min(100, parseFloat(txt.textContent) || 0));
    arc.setAttribute('stroke-dasharray', p.toFixed(1) + ' 100');
    needle.style.transform = 'rotate(' + (-90 + p * 1.8).toFixed(1) + 'deg)';
    txt.classList.toggle('bad', p < 25);
    txt.classList.toggle('good', p >= 75);
  }
  if (txt) new MutationObserver(syncDial).observe(txt, { childList: true, characterData: true, subtree: true });
  syncDial();

  // Poster header follows the fight type shown on the portrait ribbon
  const ribbon = document.getElementById('beast-status-ribbon');
  const kicker = document.getElementById('poster-kicker');
  const poster = document.getElementById('hunt-poster');
  function syncKicker() {
    if (!ribbon || !kicker) return;
    const r = (ribbon.textContent || '').toUpperCase();
    let k = 'Wanted · alive', kind = 'wild';
    if (/TITAN|ANNUAL AUDIT/.test(r)) { k = 'Titan · sever its thread'; kind = 'titan'; }
    else if (/GUARDIAN|AUDITOR/.test(r)) { k = 'Seal Guardian'; kind = 'guardian'; }
    else if (/APEX LADDER|SENIOR TRACK/.test(r)) { k = 'Apex · wanted alive'; kind = 'apex'; }
    else if (/TROPHY|AWARD/.test(r)) { k = 'Trophy hunt · for relics'; kind = 'trophy'; }
    kicker.textContent = k;
    if (poster) poster.setAttribute('data-kind', kind);
  }
  if (ribbon) new MutationObserver(syncKicker).observe(ribbon, { childList: true, characterData: true, subtree: true });
  syncKicker();

  // Footprint trail: one track per option in the Target Tier list, clickable
  const sel = document.getElementById('select-beast-tier');
  const trail = document.getElementById('hunt-trail');
  const PAW = '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="16" rx="5.2" ry="4.4"/><ellipse cx="5.4" cy="10.4" rx="2.1" ry="2.7"/><ellipse cx="9.4" cy="6.6" rx="2.1" ry="2.8"/><ellipse cx="14.6" cy="6.6" rx="2.1" ry="2.8"/><ellipse cx="18.6" cy="10.4" rx="2.1" ry="2.7"/></svg>';
  function buildTrail() {
    if (!sel || !trail) return;
    const opts = Array.from(sel.options);
    trail.innerHTML = opts.map((o, i) => {
      const t = o.textContent || '';
      let cls = 'trail-step', label = '', icon = PAW;
      const m = t.match(/^T(\d+):\s*(.+?)\s+(🏆|⚔️)/);
      if (m) { label = m[2]; cls += m[3] === '🏆' ? ' tamed' : ' wild'; icon = PAW + '<b>' + m[1] + '</b>'; }
      else if (/Apex Ladder/.test(t)) { label = t.replace(/^\S+\s*/, '').replace(/\s*\(Apex Ladder\)/, ''); cls += ' apex'; icon = '<i class="fa-solid fa-crown"></i>'; }
      else if (/TITAN/.test(t)) { label = t.replace(/^.*TITAN:\s*/, '').replace(/\s*\(.*\)$/, ''); cls += ' titan'; icon = '<i class="fa-solid fa-mountain"></i>'; }
      else if (/Guardian/.test(t)) { label = t.replace(/^\S+\s*/, '').replace(/\s*\(Totem Guardian\)/, ''); cls += ' guardian'; icon = '<i class="fa-solid fa-monument"></i>'; }
      else label = t;
      if (o.selected) cls += ' current';
      return (i ? '<span class="trail-gap" aria-hidden="true"></span>' : '') +
        '<button type="button" class="' + cls + '" data-trail="' + o.value + '" data-tip="' + label.replace(/"/g, '') + '" aria-label="' + label.replace(/"/g, '') + '">' + icon + '</button>';
    }).join('');
  }
  if (trail) trail.addEventListener('click', e => {
    const b = e.target.closest('[data-trail]');
    if (!b || !sel) return;
    sel.value = b.getAttribute('data-trail');
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    buildTrail();
  });
  if (sel) {
    new MutationObserver(buildTrail).observe(sel, { childList: true, subtree: true, characterData: true });
    sel.addEventListener('change', buildTrail);
  }
  buildTrail();
})();
