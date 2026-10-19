/**
 * ================= TEST PANEL =================
 * Hidden unless the address ends in ?dev (or #dev). Cheats for testing features quickly.
 * Everything here changes the real save in this browser.
 */
(function () {
  const params = location.search + location.hash;
  if (!/[?&#]dev\b/.test(params)) return;

  const save = () => { if (typeof saveGameToStorage === 'function') saveGameToStorage(); };
  const refresh = () => {
    ['updateBeastSelectorOptions', 'renderMenagerie', 'renderAscensionAltar', 'renderGeneratorsLadder', 'renderForge']
      .forEach(fn => { try { if (typeof window[fn] === 'function') window[fn](); } catch (e) { /* screen may not be built yet */ } });
    try { if (typeof checkFeatureUnlocks === 'function') checkFeatureUnlocks(false); if (typeof applyFeatureLocks === 'function') applyFeatureLocks(); if (typeof updateExpeditionLive === 'function') updateExpeditionLive(); } catch (e) { /* ignore */ }
  };
  const toast = msg => { try { showToast('Test panel: ' + msg, 'success'); } catch (e) { /* ignore */ } };
  const fmt = n => (typeof formatNumber === 'function' ? formatNumber(n) : String(n));

  const MATERIAL_IDS = (typeof MATERIALS !== 'undefined') ? Object.keys(MATERIALS) : [];

  function tameNext() {
    const next = BEAST_CATALOG.find(b => !gameState.tamedBeasts[b.id]);
    if (!next) return toast('every beast is already tamed');
    gameState.tamedBeasts[next.id] = true;
    gameState.bestiary = gameState.bestiary || {};
    const rec = gameState.bestiary[next.id] || {};
    rec.wins = Math.max(1, rec.wins || 0);
    gameState.bestiary[next.id] = rec;
    const idx = BEAST_CATALOG.indexOf(next);
    gameState.highestTierUnlocked = Math.max(gameState.highestTierUnlocked || 1, Math.min(BEAST_CATALOG.length, idx + 2));
    if (typeof checkTotemUnlock === 'function') checkTotemUnlock();
    toast('tamed ' + next.name);
  }

  const ACTIONS = [
    { group: 'Resources' },
    { label: '+ Meat (1 hour of income)', run: () => { const r = Math.max(1000, (getMeatRate() || 0) * 3600); addMeat(r); toast('+' + fmt(r) + ' Meat'); } },
    { label: '+ 1B Meat', run: () => { addMeat(1e9); toast('+1B Meat'); } },
    { label: '+ 1T Meat', run: () => { addMeat(1e12); toast('+1T Meat'); } },
    { label: 'Refill Stamina + heal', run: () => { gameState.stamina = getMaxStamina(); gameState.inCooldown = false; gameState.cooldownRemaining = 0; toast('Stamina full, wounds healed'); } },
    { label: 'Combat Power x10 (test boost)', run: () => { gameState.devPowerMult = (gameState.devPowerMult || 1) * 10; toast('test boost x' + fmt(gameState.devPowerMult)); } },
    { label: 'Remove test boost', run: () => { gameState.devPowerMult = 1; toast('test boost removed'); } },
    { label: '+ 10K Bloodstones', run: () => { gameState.bloodstones = (gameState.bloodstones || 0) + 10000; toast('+10K Bloodstones'); } },
    { label: '+ 1,000 of every material', run: () => { MATERIAL_IDS.forEach(m => addMaterial(m, 1000)); toast('+1,000 materials'); } },
    { label: '+ 100 Fangs and Totem Shards', run: () => {
        if (gameState.trophy) gameState.trophy.fangs = (gameState.trophy.fangs || 0) + 100;
        if (gameState.totem) gameState.totem.shards = (gameState.totem.shards || 0) + 100;
        toast('+100 Fangs, +100 Shards'); } },
    { group: 'Progress' },
    { label: 'Tame the next beast', run: tameNext },
    { label: 'Unlock every tab', run: () => {
        gameState.unlocks = gameState.unlocks || {};
        FEATURE_UNLOCKS.forEach(f => { gameState.unlocks[f.id] = true; });
        if (typeof checkTotemUnlock === 'function') { const a = gameState.ascensionCount; gameState.ascensionCount = Math.max(1, a || 0); checkTotemUnlock(); gameState.ascensionCount = a; }
        toast('all tabs unlocked'); } },
    { label: 'Finish expedition now', run: () => {
        const st = (typeof getExpeditionState === 'function') ? getExpeditionState() : null;
        if (!st || !st.active) return toast('no expedition out');
        st.active.endAt = Date.now() - 1000; toast('expedition is back'); } },
    { label: 'Travel to the next world', run: () => {
        gameState.riftOpen = true;
        if (!performMigration()) { gameState.riftOpen = false; return toast('no world to travel to'); }
        if (typeof applyWorldText === 'function') applyWorldText();
        toast('welcome to ' + getWorld().name); } },
    { label: 'Fill eruption charges', run: () => {
        if (typeof getVolcano !== 'function') return toast('no volcano yet');
        const v = getVolcano(); v.charges = WORLD_CONFIG.eruption.maxCharges; v.chargeAt = Date.now();
        toast('eruption charges full'); } },
    { group: 'Time' },
    { label: 'Skip 10 minutes', run: () => { advanceSimulation(600, true); toast('skipped 10 minutes'); } },
    { label: 'Skip 1 hour', run: () => { advanceSimulation(3600, true); toast('skipped 1 hour'); } },
    { label: 'Skip 8 hours', run: () => { advanceSimulation(8 * 3600, true); toast('skipped 8 hours'); } },
  ];

  const css = document.createElement('style');
  css.textContent =
    '#dev-panel{position:fixed;top:120px;right:12px;z-index:80;width:230px;font:13px/1.35 "Alegreya Sans",system-ui,sans-serif;' +
    'background:#15110d;color:#efe6d2;border:1px solid #e0782f;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.5)}' +
    '#dev-panel .dp-head{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;cursor:pointer;font-weight:700;color:#e0782f}' +
    '#dev-panel .dp-body{padding:0 10px 10px;max-height:70vh;overflow-y:auto}' +
    '#dev-panel.dp-closed .dp-body{display:none}' +
    '#dev-panel .dp-group{margin:8px 0 4px;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#a89a84}' +
    '#dev-panel button.dp-btn{display:block;width:100%;text-align:left;margin:3px 0;padding:5px 8px;border-radius:6px;' +
    'background:#2a221a;border:1px solid #3a332b;color:#efe6d2;cursor:pointer}' +
    '#dev-panel button.dp-btn:hover{border-color:#e0782f}' +
    '#dev-panel .dp-note{font-size:11px;color:#a89a84;margin-top:8px}' +
    'body.stealth #dev-panel{display:none !important}';
  document.head.appendChild(css);

  const panel = document.createElement('div');
  panel.id = 'dev-panel';
  let body = '';
  ACTIONS.forEach((a, i) => {
    body += a.group ? '<div class="dp-group">' + a.group + '</div>' : '<button type="button" class="dp-btn" data-dev="' + i + '">' + a.label + '</button>';
  });
  panel.innerHTML = '<div class="dp-head"><span>Test panel</span><span class="dp-toggle">hide</span></div>' +
    '<div class="dp-body">' + body + '<div class="dp-note">Changes your real save in this browser. Export your save first if you want to keep it.</div></div>';
  document.body.appendChild(panel);

  panel.querySelector('.dp-head').addEventListener('click', () => {
    panel.classList.toggle('dp-closed');
    panel.querySelector('.dp-toggle').textContent = panel.classList.contains('dp-closed') ? 'show' : 'hide';
  });
  panel.addEventListener('click', e => {
    const b = e.target.closest('[data-dev]');
    if (!b) return;
    const a = ACTIONS[+b.getAttribute('data-dev')];
    try { a.run(); } catch (err) { toast('that did not work (' + err.message + ')'); }
    refresh();
    save();
  });
})();
