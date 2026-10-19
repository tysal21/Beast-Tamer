/**
 * ================= FRIENDS LEADERBOARD =================
 * Opt-in. Every 10 minutes the game sends a few progress numbers to a Google Form; the form's responses
 * Sheet is published as CSV and read back here to rank everyone. Only the hunter name is shared.
 * Each player gets a short random tag so two hunters with the same name don't overwrite each other.
 */
(function () {
  const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd_mr9Kcb1rNsjKaqpHl2ADe_No2KAQX8ORcQstDxC2KmjUQA/formResponse';
  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT82OayNNCcAE378Z5peCTcKSl-FzVB7k1u1prE9kAAM4VXLaFWspYR9ysVMJYpFIriUWK2ljVu118I/pub?gid=162146139&single=true&output=csv';
  const FIELDS = { name: 'entry.2014507030', title: 'entry.39656024', region: 'entry.361799068', seals: 'entry.1117672081', ascensions: 'entry.1587025546', power: 'entry.2110092753', hours: 'entry.1461899071' };
  const SEND_EVERY_MS = 10 * 60 * 1000;

  function lb() {
    if (!gameState.leaderboard || typeof gameState.leaderboard !== 'object') gameState.leaderboard = { optIn: null, tag: '', lastSent: 0 };
    const s = gameState.leaderboard;
    if (!s.tag) s.tag = Math.random().toString(36).slice(2, 6);
    if (!gameState.firstPlayedAt) gameState.firstPlayedAt = Date.now();
    return s;
  }

  function myStats() {
    const name = ((gameState.hunterName || '').trim() || 'Hunter').replace(/[#,\n\r]/g, '').slice(0, 20);
    const title = (document.getElementById('hunter-title') || {}).textContent || '';
    let region = 1, seals = 0, asc = 0, power = 0;
    try { region = getWorldIndex() + 1; } catch (e) { /* not ready */ }
    try { seals = (gameState.totem && gameState.totem.sealsBroken) || 0; } catch (e) { /* not ready */ }
    try { asc = (gameState.worldRecords ? Object.values(gameState.worldRecords).reduce((a, r) => a + (r.ascensions || 0), 0) : 0) + (gameState.ascensionCount || 0); } catch (e) { asc = gameState.ascensionCount || 0; }
    try { power = getTotalCombatPower(); } catch (e) { /* not ready */ }
    const hours = (Date.now() - (gameState.firstPlayedAt || Date.now())) / 3600000;
    return { name: name + '#' + lb().tag, title, region, seals, ascensions: asc, power: Math.floor(power), hours: Math.round(hours * 10) / 10 };
  }

  function send(force) {
    const s = lb();
    if (s.optIn !== true) return;
    if (!force && Date.now() - (s.lastSent || 0) < SEND_EVERY_MS) return;
    if (typeof gameState.devPowerMult === 'number' && gameState.devPowerMult > 1) return; // test boosts don't count
    const st = myStats();
    const body = new URLSearchParams();
    Object.keys(FIELDS).forEach(k => body.append(FIELDS[k], String(st[k])));
    s.lastSent = Date.now();
    try {
      fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body }).catch(() => { /* offline: try again next time */ });
    } catch (e) { /* fetch unavailable */ }
  }

  // ---------- Reading the board ----------
  function parseCsv(text) {
    const rows = [];
    let row = [], cell = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
      else if (c === '"') q = true;
      else if (c === ',') { row.push(cell); cell = ''; }
      else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
      else cell += c;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows;
  }

  function latestPerPlayer(rows) {
    // Columns: Timestamp, Name, Title, Region, Seals, Ascensions, Power, Hours
    const out = {};
    rows.slice(1).forEach(r => {
      if (!r[1]) return;
      // One row per player: the hidden tag after '#' identifies them, so renaming never makes a duplicate
      const tag = r[1].includes('#') ? r[1].split('#').pop() : r[1];
      const p = { key: tag, name: r[1].split('#')[0], title: r[2] || '', region: +r[3] || 1, seals: +r[4] || 0, ascensions: +r[5] || 0, power: +r[6] || 0, hours: +r[7] || 0, when: r[0] };
      out[p.key] = p; // later rows win
    });
    return Object.values(out).sort((a, b) => b.region - a.region || b.seals - a.seals || b.power - a.power);
  }

  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  let loading = false;
  async function renderBoard() {
    const root = document.getElementById('leaderboard-content');
    if (!root) return;
    const s = lb();
    const me = myStats().name;
    const myTag = lb().tag;
    const toggle = '<div class="lb-optin"><div><div class="font-bold text-slate-100">Friends leaderboard</div>' +
      '<div class="text-xs text-slate-400">' + (s.optIn ? 'You are on the board as <strong class="text-amber-300">' + esc(me.split('#')[0]) + '</strong>. Your progress is sent about every 10 minutes.' : 'Share your hunter name and progress (region, Seals, Ascensions, Combat Power, hours) with everyone playing.') + '</div></div>' +
      (!s.optIn && !(gameState.hunterName || '').trim() ? '<div class="flex gap-2"><input id="lb-name" maxlength="20" placeholder="Your hunter name" class="lb-name-page"><button type="button" data-lb="join" class="lb-btn">Join the board</button></div>'
        : '<button type="button" data-lb="toggle" class="lb-btn">' + (s.optIn ? 'Leave the board' : 'Join the board') + '</button>') + '</div>';
    root.innerHTML = toggle + '<div id="lb-table" class="text-sm text-slate-400 mt-4">Loading the board...</div>';
    if (loading) return;
    loading = true;
    try {
      const res = await fetch(CSV_URL + '&t=' + Date.now(), { cache: 'no-store' });
      const players = latestPerPlayer(parseCsv(await res.text()));
      const table = document.getElementById('lb-table');
      if (!table) return;
      if (!players.length) { table.textContent = 'No one is on the board yet. Join to be the first!'; return; }
      table.innerHTML = '<div class="overflow-x-auto"><table class="lb-table"><thead><tr><th>#</th><th>Hunter</th><th>Region</th><th>Seals</th><th>Ascensions</th><th>Combat Power</th><th>Hours</th></tr></thead><tbody>' +
        players.map((p, i) => '<tr class="' + (p.key === myTag ? 'lb-me' : '') + '"><td>' + (i + 1) + '</td><td><div class="font-bold text-slate-100">' + esc(p.name) + '</div><div class="text-[11px] text-slate-400">' + esc(p.title) + '</div></td>' +
          '<td>' + p.region + '</td><td>' + p.seals + '</td><td>' + p.ascensions + '</td><td class="font-mono">' + formatNumber(p.power) + '</td><td>' + p.hours + '</td></tr>').join('') +
        '</tbody></table></div><div class="text-[11px] text-slate-500 mt-2">Ranked by region, then Seals, then Combat Power. The board updates every few minutes.</div>';
    } catch (e) {
      const table = document.getElementById('lb-table');
      if (table) table.textContent = 'Could not load the board right now. Check your connection and try again.';
    } finally { loading = false; }
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-lb]');
    if (!b) return;
    const s = lb();
    if (b.getAttribute('data-lb') === 'toggle') {
      s.optIn = !s.optIn;
      if (s.optIn) send(true);
      saveGameToStorage();
      renderBoard();
    }
    if (b.getAttribute('data-lb') === 'join') {
      const nameIn = document.getElementById('lb-name');
      if (nameIn) {
        const n = nameIn.value.replace(/[<>#,]/g, '').trim().slice(0, 20);
        if (!n) { nameIn.focus(); nameIn.placeholder = 'Type a name first'; return; }
        gameState.hunterName = n;
      }
      s.optIn = true; send(true); saveGameToStorage(); const c = document.getElementById('lb-invite'); if (c) c.remove(); if (gameState.activeTab === 'leaderboard') renderBoard(); }
    if (b.getAttribute('data-lb') === 'no') { s.optIn = false; saveGameToStorage(); const c = document.getElementById('lb-invite'); if (c) c.remove(); }
  });

  // One-time invite (after the intro, not in Doc view)
  function maybeInvite() {
    const s = lb();
    if (s.optIn !== null && s.optIn !== undefined) return;
    if (document.getElementById('lb-invite')) return;
    if (document.body.classList.contains('stealth') || document.getElementById('intro-card') || document.getElementById('away-card')) return;
    const needsName = !(gameState.hunterName || '').trim();
    const c = document.createElement('div');
    c.id = 'lb-invite';
    c.innerHTML = '<div class="lb-invite-text"><strong>Join the friends leaderboard?</strong> Share your hunter name and progress with the others playing.</div>' +
      (needsName ? '<input id="lb-name" maxlength="20" placeholder="Your hunter name" class="lb-name">' : '') +
      '<button type="button" data-lb="join" class="lb-btn">Join</button><button type="button" data-lb="no" class="lb-later">No thanks</button>';
    document.body.appendChild(c);
  }

  // The Leaderboard page lives in the Journey hub
  const origSwitch = window.switchTab;
  if (typeof origSwitch === 'function') {
    window.switchTab = function (tabId) {
      const r = origSwitch.apply(this, arguments);
      if (tabId === 'leaderboard') renderBoard();
      return r;
    };
  }
  const btn = document.getElementById('tab-btn-leaderboard');
  if (btn) btn.addEventListener('click', () => switchTab('leaderboard'));

  setTimeout(() => { lb(); send(false); }, 5000);
  setInterval(() => send(false), 60 * 1000);
  setTimeout(maybeInvite, 20000);
  setInterval(maybeInvite, 30000); // try again later if a card was in the way
  window.leaderboardSendNow = () => send(true);
})();
