/**
 * ================= SMALL COMFORTS =================
 * 1. "While you were away" summary when you come back (page reload or a tab hidden for 5+ minutes)
 * 2. Attention alerts: a count in the tab title, and optional desktop notifications
 * 3. Tutorial: short guided steps the first time each feature opens
 */
(function () {
  const AWAY_MIN_SEC = 300;
  const BASE_TITLE = document.title;
  const ALERT_KEY = 'beast_tamer_desktop_alerts';

  // ---------- Things that need you ----------
  function attentionItems() {
    const items = [];
    try {
      if (typeof isEruptionWorld === 'function' && isEruptionWorld()) {
        const v = getVolcano();
        if (!v.round && v.charges >= getMaxEruptionCharges()) items.push({ key: 'charges', text: 'Eruption charges are full (' + v.charges + '/' + getMaxEruptionCharges() + ')', go: 'camp', icon: 'fa-volcano' });
      }
      if (typeof isExpeditionReady === 'function' && isExpeditionReady()) items.push({ key: 'expedition', text: 'Your expedition is back', go: 'expedition', icon: 'fa-compass' });
      if (typeof getWorld === 'function' && getWorld().twist === 'blizzard') {
        const t = getTundra();
        if (t.caches[0] && t.caches[0].left <= 0) items.push({ key: 'cache', text: 'A Frozen Cache has thawed', go: 'camp', icon: 'fa-box-open' });
      }
      if (typeof getTotemGuardian === 'function' && isTotemUnlocked() && getTotemGuardian()) items.push({ key: 'seal', text: 'A Seal Guardian is waiting at the Totem', go: 'totem', icon: 'fa-shield-halved' });
      if (typeof getTitanBoss === 'function' && getTitanBoss()) items.push({ key: 'titan', text: getWorld().titan.name + ' is awake', go: 'world', icon: 'fa-mountain' });
      if (gameState.boonChoices && gameState.boonChoices.length) items.push({ key: 'boon', text: 'A Seal Boon is waiting to be chosen', go: 'totem', icon: 'fa-star' });
      if (typeof canAwaken === 'function' && canAwaken()) items.push({ key: 'awaken', text: 'The Awakened Strike is ready', go: 'totem', icon: 'fa-bolt-lightning' });
      if (gameState.incubator && gameState.incubator.remaining <= 0) items.push({ key: 'egg', text: 'An egg is ready to hatch', go: 'forge', icon: 'fa-egg' });
    } catch (e) { /* a system may not exist yet on this save */ }
    return items;
  }

  window.btAttentionTabs = () => attentionItems().map(i => i.go);

  // ---------- 1. While you were away ----------
  function snapshot() {
    const mats = (typeof getExpeditionState === 'function') ? Object.assign({}, getExpeditionState().materials) : {};
    return {
      at: Date.now(),
      meat: gameState.meat,
      layer: gameState.totem ? gameState.totem.layer : 0,
      seals: gameState.totem ? gameState.totem.sealsBroken : 0,
      shards: gameState.totem ? gameState.totem.shards : 0,
      charges: gameState.volcano ? gameState.volcano.charges : 0,
      fish: gameState.fishing ? (gameState.fishing.totalCaught || 0) : 0,
      mats,
      attention: attentionItems().map(i => i.key)
    };
  }

  function fmtAway(sec) {
    if (sec >= 86400) return Math.floor(sec / 86400) + 'd ' + Math.floor((sec % 86400) / 3600) + 'h';
    if (sec >= 3600) return Math.floor(sec / 3600) + 'h ' + Math.floor((sec % 3600) / 60) + 'm';
    return Math.floor(sec / 60) + 'm';
  }

  function showAwaySummary(before, sec) {
    if (!before || sec < AWAY_MIN_SEC) return;
    if (document.body.classList.contains('stealth')) return; // Doc view stays quiet
    if (typeof isResetting !== 'undefined' && isResetting) return;
    const now = snapshot();
    const lines = [];
    const meat = Math.floor(now.meat - before.meat);
    if (meat > 0) lines.push(['fa-drumstick-bite', '+' + formatNumber(meat) + ' Meat']);
    if (now.layer > before.layer) lines.push(['fa-monument', 'Totem: ' + (now.layer - before.layer) + ' layer' + (now.layer - before.layer === 1 ? '' : 's') + ' broken (+' + formatNumber(now.shards - before.shards) + ' Shards)']);
    if (now.charges > before.charges) lines.push(['fa-volcano', '+' + (now.charges - before.charges) + ' eruption charge' + (now.charges - before.charges === 1 ? '' : 's')]);
    if (now.fish > before.fish) lines.push(['fa-fish', 'Your lines caught ' + (now.fish - before.fish) + ' fish']);
    Object.keys(now.mats).forEach(id => {
      const d = (now.mats[id] || 0) - (before.mats[id] || 0);
      if (d > 0 && typeof MATERIALS !== 'undefined' && MATERIALS[id]) lines.push(['fa-gem', '+' + formatNumber(d) + ' ' + MATERIALS[id].name]);
    });
    const ready = attentionItems();
    if (!lines.length && !ready.length) return;
    const old = document.getElementById('away-card');
    if (old) old.remove();
    const card = document.createElement('div');
    card.id = 'away-card';
    card.innerHTML =
      '<div class="away-box" role="dialog" aria-label="While you were away">' +
        '<div class="away-head"><div><div class="away-title">While you were away</div><div class="away-sub">' + fmtAway(sec) + ' away</div></div>' +
        '<button type="button" class="away-x" aria-label="Close">&times;</button></div>' +
        (lines.length ? '<ul class="away-list">' + lines.map(l => '<li><i class="fa-solid ' + l[0] + '"></i>' + l[1] + '</li>').join('') + '</ul>' : '') +
        (ready.length ? '<div class="away-ready-title">Ready for you</div><div class="away-ready">' +
          ready.map(r => '<button type="button" data-away-go="' + r.go + '"><i class="fa-solid ' + r.icon + '"></i>' + r.text + '</button>').join('') + '</div>' : '') +
        '<button type="button" class="away-ok">Back to the hunt</button>' +
      '</div>';
    document.body.appendChild(card);
    const close = () => card.remove();
    card.addEventListener('click', e => {
      if (e.target === card || e.target.closest('.away-x') || e.target.closest('.away-ok')) return close();
      const go = e.target.closest('[data-away-go]');
      if (go) { close(); try { switchTab(go.getAttribute('data-away-go')); } catch (err) { /* tab locked */ } }
    });
  }

  // Page load: ui.js calls these around its offline catch-up
  let loadSnap = null;
  window.awayBeforeCatchup = function () { loadSnap = snapshot(); };
  window.awayAfterCatchup = function (sec) { setTimeout(() => showAwaySummary(loadSnap, sec), 900); };

  // Tab hidden and shown again (the game keeps running in the background)
  let hiddenSnap = null;
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') hiddenSnap = snapshot();
    else if (hiddenSnap) {
      const sec = (Date.now() - hiddenSnap.at) / 1000;
      const s = hiddenSnap; hiddenSnap = null;
      setTimeout(() => showAwaySummary(s, sec), 300);
    }
  });

  // ---------- 2. Alerts: tab title count + desktop notifications ----------
  let alertsOn = false;
  try { alertsOn = localStorage.getItem(ALERT_KEY) === '1'; } catch (e) { alertsOn = false; }
  let seen = new Set(attentionItems().map(i => i.key));

  function canNotify() { return alertsOn && typeof Notification !== 'undefined' && Notification.permission === 'granted'; }

  function tickAlerts() {
    const stealth = document.body.classList.contains('stealth');
    const items = attentionItems();
    if (!stealth) {
      const t = (items.length ? '(' + items.length + ') ' : '') + BASE_TITLE;
      if (document.title !== t) document.title = t;
    }
    const keys = new Set(items.map(i => i.key));
    items.forEach(i => {
      if (seen.has(i.key)) return;
      if (!stealth && canNotify() && document.visibilityState === 'hidden') {
        try { new Notification('Beast Tamer', { body: i.text, tag: 'bt-' + i.key, icon: 'assets/icons/meat-128.png' }); } catch (e) { /* blocked */ }
      }
    });
    seen = keys;
  }
  setInterval(tickAlerts, 2000);

  function alertLabel() { return 'Desktop alerts: <span>' + (canNotify() ? 'ON' : 'OFF') + '</span>'; }
  function addFooterButtons() {
    const sound = document.getElementById('btn-toggle-sound');
    if (!sound || document.getElementById('btn-desktop-alerts')) return;
    const b = document.createElement('button');
    b.id = 'btn-desktop-alerts';
    b.className = sound.className;
    b.innerHTML = '<i class="fa-solid fa-bell"></i><span>' + alertLabel() + '</span>';
    b.title = 'Get a desktop notification when charges are full, an expedition is back, a Titan wakes, and so on (only while this tab is in the background).';
    b.addEventListener('click', async () => {
      if (canNotify()) { alertsOn = false; }
      else if (typeof Notification === 'undefined') { showToast('This browser does not support desktop notifications.', 'warning'); }
      else {
        let p = Notification.permission;
        if (p === 'default') { try { p = await Notification.requestPermission(); } catch (e) { p = 'denied'; } }
        if (p === 'granted') { alertsOn = true; showToast('Desktop alerts on: you will get a ping while this tab is in the background.', 'success'); }
        else showToast('Notifications are blocked for this site. Allow them in your browser settings to use alerts.', 'warning');
      }
      try { localStorage.setItem(ALERT_KEY, alertsOn ? '1' : '0'); } catch (e) { /* storage blocked */ }
      b.querySelector('span').innerHTML = alertLabel();
    });
    sound.parentNode.insertBefore(b, sound.nextSibling);

    const t = document.createElement('button');
    t.id = 'btn-replay-tutorial';
    t.className = sound.className;
    t.innerHTML = '<i class="fa-solid fa-graduation-cap"></i><span>Replay tutorial</span>';
    t.addEventListener('click', () => { gameState.tutorial = { done: {}, off: false }; saveGameToStorage(); maybeStartTutorial(gameState.activeTab || 'camp'); });
    b.parentNode.insertBefore(t, b.nextSibling);
  }

  // ---------- 3. Tutorial ----------
  const TUTORIAL = {
    camp: [
      { el: '#btn-forage', text: 'Click the <strong>campfire</strong> to hunt for Meat by hand. Meat is your main currency.' },
      { el: '#generators-container', text: 'Spend Meat on <strong>generators</strong>. They gather Meat for you every second, even while you are away.' },
      { el: '#generators-container', text: 'Own <strong>5 Snare Lines</strong> (or craft a weapon) to open the <strong>Hunt</strong>, where you fight and tame beasts.' }
    ],
    hunt: [
      { el: '#btn-challenge', text: 'Challenge a beast here. Each fight costs <strong>Stamina</strong>, and your odds are shown on the button.' },
      { el: '#hud-total-power', text: 'Your odds depend on <strong>Combat Power</strong>. Raise it with weapons, training and tamed beasts.' },
      { el: '#btn-buy-brute', text: '<strong>Training</strong> raises Hunter Power. Win a fight and the beast is tamed: it joins your pack for good.' }
    ],
    relics: [
      { el: '#relic-grid', text: 'Beat a tamed beast again for a chance at its <strong>relics</strong>: permanent bonuses that are never reset.' }
    ],
    forge: [
      { el: '#nursery-container', text: 'The <strong>Beast Forge</strong> breeds hybrids from your tamed beasts. Hybrids add big bonuses as they level.' }
    ],
    expedition: [
      { el: '#expedition-content', text: 'Send a beast on an <strong>expedition</strong> to bring back materials. Use them to hone your weapon and craft gear.' }
    ],
    ascend: [
      { el: '#btn-trigger-ascend', text: '<strong>Ascend</strong> to restart the run stronger. You earn Bloodstones to spend on permanent perks below.' }
    ],
    totem: [
      { el: '#totem-hp-view', text: 'The <strong>Primal Totem</strong> takes damage from your Combat Power, even offline. Every layer gives a permanent bonus.' },
      { el: '#totem-unlocks', text: 'Every 5th layer is a <strong>Seal</strong> with a Guardian to beat. Seals unlock new features.' }
    ],
    world: [
      { el: '#world-content', text: 'Climb the Apex Ladder to wake this region\'s <strong>Titan</strong>. Slay it to open the Rift to the next region.' }
    ]
  };

  let tut = null; // { tab, i }
  let introPending = true; // hold every guide until we know whether this is a brand-new game

  function tutorialState() {
    if (!gameState.tutorial || typeof gameState.tutorial !== 'object') gameState.tutorial = { done: {}, off: false };
    if (!gameState.tutorial.done) gameState.tutorial.done = {};
    return gameState.tutorial;
  }

  function clearTutorial() {
    document.querySelectorAll('.tut-spot').forEach(e => e.classList.remove('tut-spot'));
    const tip = document.getElementById('tut-tip');
    if (tip) tip.remove();
  }

  function showStep() {
    clearTutorial();
    if (!tut) return;
    const steps = TUTORIAL[tut.tab];
    while (tut.i < steps.length) {
      const target = document.querySelector(steps[tut.i].el);
      if (target && target.offsetParent) break;
      tut.i++;
    }
    if (tut.i >= steps.length) { finishTutorial(); return; }
    const step = steps[tut.i];
    const target = document.querySelector(step.el);
    target.classList.add('tut-spot');
    try { target.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) { /* old browser */ }
    const tip = document.createElement('div');
    tip.id = 'tut-tip';
    tip.innerHTML = '<div class="tut-text">' + step.text + '</div><div class="tut-row"><span>' + (tut.i + 1) + ' / ' + steps.length + '</span>' +
      '<button type="button" data-tut="skip">Skip tutorial</button><button type="button" data-tut="next" class="tut-next">' + (tut.i + 1 === steps.length ? 'Got it' : 'Next') + '</button></div>';
    document.body.appendChild(tip);
    placeTip(tip, target);
  }

  function placeTip(tip, target) {
    const r = target.getBoundingClientRect();
    const w = Math.min(320, window.innerWidth - 24);
    tip.style.width = w + 'px';
    let left = Math.min(window.innerWidth - w - 12, Math.max(12, r.left + r.width / 2 - w / 2));
    let top = r.bottom + 12;
    if (top + 140 > window.innerHeight) top = Math.max(12, r.top - 150);
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
  }

  function finishTutorial() {
    if (tut) tutorialState().done[tut.tab] = true;
    tut = null;
    clearTutorial();
    try { saveGameToStorage(); } catch (e) { /* ignore */ }
  }

  function maybeStartTutorial(tab) {
    const st = tutorialState();
    if (st.off || st.done[tab] || !TUTORIAL[tab]) return;
    if (document.body.classList.contains('stealth')) return;
    if (introPending || document.getElementById('intro-card')) return;
    if (tut && tut.tab === tab) return;
    tut = { tab, i: 0 };
    setTimeout(showStep, 350);
  }
  window.maybeStartTutorial = maybeStartTutorial;

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-tut]');
    if (!b) return;
    if (b.getAttribute('data-tut') === 'skip') { tutorialState().off = true; finishTutorial(); return; }
    tut.i++;
    showStep();
  });
  window.addEventListener('resize', () => { const tip = document.getElementById('tut-tip'); const t = document.querySelector('.tut-spot'); if (tip && t) placeTip(tip, t); });

  // Hook tab changes: a tab's guide runs the first time you open it
  const origSwitch = window.switchTab;
  if (typeof origSwitch === 'function') {
    window.switchTab = function (tabId) {
      const r = origSwitch.apply(this, arguments);
      if (tut && tut.tab !== tabId) { tut = null; clearTutorial(); }
      if (gameState.activeTab === tabId) maybeStartTutorial(tabId);
      return r;
    };
  }


  // ---------- 4. The hunter: a name you choose, and a title that grows with you ----------
  const TITLES = [
    { title: 'Novice Hunter', when: () => true },
    { title: 'Beast Tamer', when: () => BEAST_CATALOG.some(b => hasEverTamed(b.id)) },
    { title: 'Pack Leader', when: () => BEAST_CATALOG.every(b => hasEverTamed(b.id)) },
    { title: 'Ascendant', when: () => gameState.ascensionCount > 0 || getWorldIndex() > 0 },
    { title: 'Seal Breaker', when: () => !!(gameState.totem && gameState.totem.sealsBroken >= 1) },
    { title: 'Titan Slayer', when: () => !!gameState.riftOpen || getWorldIndex() > 0 },
    { title: 'Rift Walker', when: () => getWorldIndex() >= 1 },
    { title: 'Keeper of the Archive', when: () => getWorldIndex() >= 2 },
    { title: 'Furnace-Tempered', when: () => getWorldIndex() >= 2 && !!gameState.riftOpen },
    { title: 'Heir of the Loom', when: () => getWorldIndex() >= 3 }
  ];
  function currentTitle() {
    let t = TITLES[0].title;
    for (const x of TITLES) { try { if (x.when()) t = x.title; } catch (e) { /* system not ready */ } }
    return t;
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function hunterName() { return (gameState.hunterName || '').trim() || 'Hunter'; }
  function renderHunterId() {
    const t = document.getElementById('hunter-title'), n = document.getElementById('hunter-name');
    if (t && t.textContent !== currentTitle()) t.textContent = currentTitle();
    if (n && n.textContent !== hunterName()) n.textContent = hunterName();
  }
  function tickTitle() {
    const t = currentTitle();
    if (gameState.hunterTitle && gameState.hunterTitle !== t && TITLES.findIndex(x => x.title === t) > TITLES.findIndex(x => x.title === gameState.hunterTitle)) {
      try { showToast('New title: ' + t + ' ' + hunterName(), 'success', true); logCombatMessage('🏅 <strong>NEW TITLE:</strong> you are now known as <strong>' + esc(t + ' ' + hunterName()) + '</strong>.', 'unlock'); } catch (e) { /* ignore */ }
    }
    gameState.hunterTitle = t;
    renderHunterId();
  }
  setInterval(tickTitle, 1000);

  function nameCard(isIntro) {
    if (document.getElementById('intro-card')) return;
    const card = document.createElement('div');
    card.id = 'intro-card';
    card.innerHTML = '<div class="intro-box" role="dialog" aria-label="' + (isIntro ? 'A new hunt' : 'Rename your hunter') + '">' +
      (isIntro ? '<div class="intro-quote">A wise man once said:<br><em>hunt, or be hunted.</em></div>' : '<div class="intro-quote">What should they call you?</div>') +
      '<label class="intro-label" for="intro-name">Your hunter\'s name</label>' +
      '<input id="intro-name" maxlength="20" autocomplete="off" placeholder="Hunter" value="' + esc(gameState.hunterName || '') + '">' +
      '<button type="button" id="intro-go">' + (isIntro ? 'Begin the hunt' : 'Save name') + '</button></div>';
    document.body.appendChild(card);
    const input = card.querySelector('#intro-name');
    setTimeout(() => input.focus(), 50);
    const done = () => {
      gameState.hunterName = input.value.replace(/[<>]/g, '').trim().slice(0, 20);
      card.remove();
      tickTitle();
      try { saveGameToStorage(); } catch (e) { /* ignore */ }
      if (isIntro) maybeStartTutorial(gameState.activeTab || 'camp');
    };
    card.querySelector('#intro-go').addEventListener('click', done);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') done(); });
    if (!isIntro) card.addEventListener('click', e => { if (e.target === card) card.remove(); });
  }
  const idBtn = document.getElementById('hunter-id');
  if (idBtn) idBtn.addEventListener('click', () => nameCard(false));

  function isBrandNewGame() {
    return !gameState.hunterName && (gameState.ascensionCount || 0) === 0 && getWorldIndex() === 0 &&
      Object.keys(gameState.tamedBeasts || {}).length === 0 && (gameState.generators.snare_lines || 0) === 0 && (gameState.runMeatEarned || 0) < 50;
  }

  // Start: footer buttons; a brand-new game opens with the intro card, then the Camp guide
  addFooterButtons();
  setTimeout(() => {
    introPending = false;
    tickTitle();
    if (isBrandNewGame() && !document.body.classList.contains('stealth')) nameCard(true);
    else maybeStartTutorial(gameState.activeTab || 'camp');
  }, 1100);
})();
