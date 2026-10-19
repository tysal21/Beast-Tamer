/**
 * ================= SEAL REWORK UI =================
 * On the Totem tab: Seal Boon choices, the Awakened Strike, Primordial relics and the Loom log archive.
 * When a Seal breaks, its log plays back in a small card.
 */
(function () {
  const root = document.getElementById('seal-extras');
  if (!root) return;
  let sig = '';

  function esc(s) { return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }

  function card(title, icon, body) {
    return '<div class="bg-primal-850 border border-primal-700 rounded-2xl p-5 shadow-xl space-y-3">' +
      '<h3 class="font-cinzel text-lg font-bold text-slate-100 flex items-center gap-2"><i class="fa-solid ' + icon + ' text-amber-400"></i> ' + title + '</h3>' + body + '</div>';
  }

  function render() {
    const t = gameState.totem;
    if (!t) { root.innerHTML = ''; return; }
    const s = t.sealsBroken || 0;
    const parts = [];

    // Boon choice (most urgent first)
    const choice = (gameState.boonChoices || [])[0];
    const owned = Object.keys(gameState.boons || {}).filter(id => gameState.boons[id] > 0);
    if (s >= SEAL_CONFIG.boonsFromSeal || owned.length) {
      let body = '';
      if (choice) {
        body += '<div class="text-xs text-amber-200">Seal ' + choice.seal + ' offers a Boon. Choose one (permanent, stacks with copies you already have)' +
          ((gameState.boonChoices.length > 1) ? '. ' + (gameState.boonChoices.length - 1) + ' more waiting after this.' : '.') + '</div>' +
          '<div class="grid sm:grid-cols-3 gap-2">' + choice.options.map(id => {
            const b = getBoonDef(id);
            return '<button type="button" data-boon="' + id + '" class="boon-card"><i class="fa-solid ' + b.icon + '"></i><div class="boon-name">' + b.name + '</div><div class="boon-desc">' + b.desc + '</div>' +
              (getBoonCount(id) ? '<div class="boon-owned">You have ' + getBoonCount(id) + '</div>' : '') + '</button>';
          }).join('') + '</div>';
      } else {
        body += '<div class="text-xs text-slate-400">' + (s >= SEAL_CONFIG.boonsFromSeal ? 'Every Seal you break offers three Boons to choose from.' : 'Boons start at Seal ' + SEAL_CONFIG.boonsFromSeal + '.') + '</div>';
      }
      if (owned.length) body += '<div class="flex flex-wrap gap-2">' + owned.map(id => { const b = getBoonDef(id); return '<span class="boon-chip"><i class="fa-solid ' + b.icon + '"></i>' + b.name + (gameState.boons[id] > 1 ? ' x' + gameState.boons[id] : '') + '</span>'; }).join('') + '</div>';
      parts.push(card('Seal Boons', 'fa-star', body));
    }

    // Awakened Strike
    if (isAwakenUnlocked()) {
      const left = getAwakenCooldownLeft();
      const ready = canAwaken();
      parts.push(card('The Totem Awakens', 'fa-bolt-lightning',
        '<div class="text-xs text-slate-400">Once a day, call on the Core: a strike worth ' + Math.round(SEAL_CONFIG.awakenDamageSec / 3600) + ' hours of Totem damage, plus ' + SEAL_CONFIG.awakenShardsPerLayer + ' Shards per layer.</div>' +
        '<button type="button" data-awaken="1" ' + (ready ? '' : 'disabled') + ' class="w-full py-2.5 rounded-lg bt-btn-seal text-base cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">' +
          (ready ? 'Awakened Strike' : (left > 0 ? 'Recharging: ' + formatDuration(left) : 'Beat the Seal Guardian first')) + '</button>'));
    }

    // Primordial relics
    if (s >= SEAL_CONFIG.primordialFromSeal) {
      const ids = Object.keys(gameState.primordial || {}).filter(id => gameState.primordial[id] && RELIC_REGISTRY[id]);
      const total = Object.keys(RELIC_REGISTRY).length;
      parts.push(card('Primordial Relics', 'fa-gem',
        '<div class="text-xs text-slate-400">Each Seal Guardian you beat awakens one of your relics into its Primordial form, doubling its effect. ' + ids.length + ' / ' + total + ' awakened.</div>' +
        (ids.length ? '<div class="flex flex-wrap gap-2">' + ids.map(id => '<span class="boon-chip primordial"><i class="fa-solid fa-gem"></i>Primordial ' + RELIC_REGISTRY[id].name + '</span>').join('') + '</div>' : '')));
    }

    // Loom logs
    if (s > 0) {
      const logs = [];
      for (let k = s; k >= 1; k--) logs.push('<div class="loom-log"><span class="loom-log-k">SEAL ' + k + '</span>' + esc(getSealLog(k)) + '</div>');
      parts.push(card('Loom Logs', 'fa-scroll', '<div class="text-xs text-slate-400">Each Seal restores part of the Core, and it speaks.</div><div class="space-y-1.5">' + logs.join('') + '</div>'));
    }

    root.innerHTML = parts.join('');
  }

  function signature() {
    const t = gameState.totem || {};
    return [t.sealsBroken, JSON.stringify(gameState.boons || {}), JSON.stringify(gameState.boonChoices || []), JSON.stringify(gameState.primordial || {}),
      typeof canAwaken === 'function' && canAwaken(), Math.floor((typeof getAwakenCooldownLeft === 'function' ? getAwakenCooldownLeft() : 0) / 60)].join('|');
  }

  root.addEventListener('click', e => {
    const b = e.target.closest('[data-boon]');
    if (b) { if (chooseBoon(b.getAttribute('data-boon'))) { try { sound.playWin(); } catch (err) { /* audio blocked */ } saveGameToStorage(); } sig = ''; return tick(); }
    const a = e.target.closest('[data-awaken]');
    if (a && !a.disabled) {
      const r = awakenedStrike();
      if (r) { try { sound.playWin(); } catch (err) { /* audio blocked */ } showToast('Awakened Strike! +' + formatNumber(r.shards) + ' Totem Shards', 'success', true); saveGameToStorage(); }
      sig = ''; tick();
    }
  });

  // The log card that plays when a Seal breaks
  function showLog(k) {
    if (document.body.classList.contains('stealth')) return;
    const old = document.getElementById('loom-log-card');
    if (old) old.remove();
    const c = document.createElement('div');
    c.id = 'loom-log-card';
    c.innerHTML = '<div class="llc-box" role="dialog" aria-label="Loom log"><div class="llc-head">LOOM LOG · SEAL ' + k + '</div><div class="llc-text"></div><button type="button" class="llc-ok">Continue</button></div>';
    document.body.appendChild(c);
    const text = getSealLog(k), el = c.querySelector('.llc-text');
    let i = 0;
    const timer = setInterval(() => { i += 2; el.textContent = text.slice(0, i); if (i >= text.length) clearInterval(timer); }, 30);
    c.addEventListener('click', e => { if (e.target === c || e.target.closest('.llc-ok')) { clearInterval(timer); c.remove(); } });
  }

  function tick() {
    if (gameState.pendingSealLog) { const k = gameState.pendingSealLog; delete gameState.pendingSealLog; setTimeout(() => showLog(k), 1200); }
    if (gameState.activeTab !== 'totem') return;
    const s = signature();
    if (s !== sig) { sig = s; render(); }
  }
  setInterval(tick, 1000);
})();
