/**
 * ================= HOVER TIPS =================
 * Hover (or focus) anything listed here for a short explanation. On phones, press and hold.
 * Lore rule from the Lore Bible: earthly things stay plain; anything that comes from the Loom
 * gets one line of lore.
 * Add a tip: put data-tip="text" on an element, or add a [selector, text-or-function] row to TIPS.
 */
(function () {
  const cur = () => (typeof getRegionCurrency === 'function' ? getRegionCurrency() : { name: 'Bloodstones', lore: '' });

  const MATERIAL_TIPS = {
    viper_scale: 'Viper Scales: shed by Viper-Hounds in the Venom Marsh. Used for honing and gear.',
    hawk_feather: 'Hawk Feathers: from the Talon Cliffs. Used for honing, gear and changing a charm\'s bonus.',
    scorpion_chitin: 'Scorpion Chitin: cast-off plates from the Molten Burrows. Used for honing and gear.',
    wyrm_obsidian: 'Wyrm Obsidian: glassy scales from the Obsidian Spire. No volcano on Earth makes glass like this.',
    apex_shard: 'Apex Shards: splinters of Apex threads, torn loose when you tame an Apex.',
    magma_core: 'Magma Cores: cooled Furnace overload, still holding heat. Won from eruptions.'
  };

  // [selector, text or function]. The first selector that matches the hovered element (or an ancestor) wins.
  const TIPS = [
    // ---- Top bar ----
    ['#hud-meat, #hud-meat-rate', 'Meat: food and bait for your camp and pack. Spend it on generators, weapons and training. It resets when you Ascend.'],
    ['#hud-stamina-label, #hud-stamina-val, #hud-stamina-bar, #hud-stamina-interval', 'Stamina: your hunter\'s endurance. Fights, Totem strikes, casting and stoking use it. You get +1 every few seconds (shown next to the label).'],
    ['#hud-power-card', 'Combat Power: your hunter and your tamed beasts together. Higher power means better taming odds. "Lead" is Leadership: how much your hunter\'s strength boosts the beasts. Click for the full breakdown.'],
    ['#hud-ascension-count', 'How many times you have Ascended in this region.'],
    ['#hud-bloodstones-card', () => cur().name + ': ' + cur().lore + ' Earned by Ascending, spent at the Ascension Altar. They reset when you cross a Rift.'],

    // ---- Hubs and tabs ----
    ['#hub-btn-camp', 'Camp: your Meat economy, weapons, Stamina upgrades and the fishing dock.'],
    ['#hub-btn-hunt', 'Hunt: fight and tame beasts, train your hunter and collect relics.'],
    ['#hub-btn-pack', 'Pack: the Beast Forge, Expeditions, and the true-borns that run with you.'],
    ['#hub-btn-totem', 'Totem: wear down the Primal Totem for Shards and break its Seals, then spend Shards in the Hunter\'s Legacy.'],
    ['#hub-btn-journey', 'Journey: Ascend, cross Rifts into new regions, and check the leaderboard.'],
    ['#tab-btn-camp', 'The campfire, your stations, weapons and Stamina upgrades.'],
    ['#btn-forage', 'Click the fire to hunt by hand. Each hunt brings in Meat, chips at the Totem, and in a blizzard warms the camp back up.'],
    ['#tab-btn-hunt', 'Pick a beast, check your odds and fight. Win to tame it.'],
    ['#tab-btn-forge', 'Level up your tamed beasts and breed true-borns of your own.'],
    ['#tab-btn-relics', 'Relics your tamed beasts have dropped, and the Bestiary of every beast you\'ve met.'],
    ['#tab-btn-expedition', 'Send your hunter out for materials, then hone your weapon and craft gear.'],
    ['#tab-btn-pack', 'Choose up to 3 true-borns to bring along, each lending its own ability.'],
    ['#tab-btn-fish', 'Cast for fish, cook meals for short boosts and fill the Fish Codex for permanent ones.'],
    ['#tab-btn-totem', 'The Primal Totem, its Seals and what each Seal unlocks.'],
    ['#tab-btn-legacy', 'The Legacy Map: spend Totem Shards on skills that last forever, even through a Rift.'],
    ['#legacy-rings', 'The map opens in rings as you break Seals: the palm at Seal 1, toe pads at Seal 3, toe tips at Seal 5, claws at Seal 7.'],
    ['#btn-legacy-respec', 'Refund every Shard on the map and place them again. The first respec after each Ascension is free.'],
    ['[data-lm-zoom]', 'Zoom the map. You can also drag it with the mouse.'],
    ['#btn-temper', 'Masterwork: spend Meat to temper your weapon for more Hunter Power. Tempers last until you Ascend.'],
    ['#tab-btn-world', 'Your region, its Titan and the Rift to the next one.'],
    ['#tab-btn-ascend', () => 'Start a new run stronger and spend ' + cur().name + ' on perks.'],
    ['#tab-btn-leaderboard', 'See how your friends are doing.'],

    // ---- Hunt ----
    ['.odds-dial-wrap, #odds-percentage-text, #odds-meter-fill', 'Your chance to win this fight. It climbs from 0% at the beast\'s minimum power to 98% at its maximum. Lose and its thread lashes back: you are Wounded for a while.'],
    ['#beast-power-min, #beast-power-max', 'The power this beast is beaten by. Below the minimum you can\'t win; at the maximum your odds are as good as they get (98%).'],
    ['#beast-reward-power', 'Beast Power this beast adds to your pack when you tame it. Re-fighting a tamed beast hunts for its relics instead.'],
    ['.trail-step', 'Your trail: every beast you can hunt right now. Gold tracks are tamed, dashed ones are still wild. Click one to target it.'],
    ['#beast-status-ribbon', 'What kind of fight this is: a beast to tame, a trophy re-fight for relics, an Apex, a Totem Guardian or a Titan.'],

    // ---- Totem ----
    ['#totem-shards', 'Totem Shards: flakes of the Core\'s casing, still faintly humming. Spend them in the Hunter\'s Legacy.'],
    ['#totem-seals', 'Seals are the Core\'s locks. Every 5th Totem layer is a Seal with a Guardian. Each one you break plays back a Loom log and unlocks something new.'],
    ['#totem-dps, #totem-eta', 'Your Combat Power wears the Totem down every second, even while you\'re away.'],
    ['#trophy-fangs, #trophy-cost', 'Apex Fangs: thread-hardened teeth from Apex beasts, dense enough to forge. Apex wins and Frozen Caches drop them.'],

    // ---- Altar ----
    ['#ascend-pending-stones', () => 'The ' + cur().name + ' you would get for Ascending right now. Run Meat, Combat Power and every Apex tamed this run raise it.'],

    // ---- Tundra ----
    ['[data-tundra="stoke"]', 'Spend Stamina for a big burst of Warmth. Fill the Warmth bar to end the blizzard early.'],
    ['[data-tundra="chip"]', 'Spend Stamina to chip the ice and take time off this cache\'s thaw.'],
    ['[data-tundra="open"]', 'Frozen Caches are spilled Archive samples. Inside: Meat, Totem Shards or Apex Fangs, and rarely all three.'],

    // ---- Volcano ----
    ['[data-erupt="start"]', 'Stake your charges on an eruption round. The multiplier climbs until the Furnace blows. Cash out before it does.'],
    ['[data-erupt="cash"]', 'Take the pot now at the current multiplier.'],
    ['[data-erupt="more"], [data-erupt="less"]', 'How many charges to stake. A bigger stake means a bigger pot, and a bigger Scorched penalty if it blows.'],
    ['[data-erupt="auto"]', 'Cash out automatically when the multiplier reaches this number.'],
    ['#erupt-mult', 'The Furnace is overloading. Nobody can tell when it will blow, and the tremors are only for show.'],

    // ---- Fishing ----
    ['#fish-basket-count', 'Fish stored for cooking. Each species has its own space, so a rare catch never pushes anything out.'],
    ['#fish-codex-count', 'Species you\'ve caught at least once. Each gives a permanent bonus that grows as you catch more.'],
    ['#fish-lines-count, #fish-line-next', () => 'Idle Lines catch a Common or Uncommon fish' + (hasLegacy('deep_waters') ? ' (and now and then a Rare one)' : '') + ' every ' + Math.round(getLineIntervalSec() / 60) + ' minutes, even while you\'re away.'],
    ['#fish-rod-level, #fish-rod-effect', 'A better rod widens the catch zone and raises Rare, Legendary and Mythic odds.']
  ];

  // ---------- The bubble ----------
  const tip = document.createElement('div');
  tip.id = 'bt-tip';
  tip.setAttribute('role', 'tooltip');
  document.body.appendChild(tip);
  let current = null, hideTimer = null;

  function textFor(el) {
    if (!el || document.body.classList.contains('stealth')) return null;
    const own = el.closest('[data-tip], [data-tip-mat]');
    if (own) {
      if (own.hasAttribute('data-tip')) return { el: own, text: own.getAttribute('data-tip') };
      const m = MATERIAL_TIPS[own.getAttribute('data-tip-mat')];
      if (m) return { el: own, text: m };
    }
    for (const [sel, t] of TIPS) {
      const hit = el.closest(sel);
      if (hit) return { el: hit, text: typeof t === 'function' ? t() : t };
    }
    return null;
  }

  function place(target) {
    const r = target.getBoundingClientRect();
    const w = tip.offsetWidth, h = tip.offsetHeight, pad = 8;
    let left = r.left + r.width / 2 - w / 2;
    left = Math.max(pad, Math.min(window.innerWidth - w - pad, left));
    let top = r.bottom + 8;
    if (top + h > window.innerHeight - pad) top = r.top - h - 8; // flip above when there's no room below
    tip.style.left = left + 'px';
    tip.style.top = Math.max(pad, top) + 'px';
  }

  function show(found) {
    clearTimeout(hideTimer);
    current = found.el;
    tip.textContent = found.text;
    tip.classList.add('on');
    place(found.el);
  }
  function hide() { current = null; tip.classList.remove('on'); }

  // Mouse and keyboard
  let lastTouch = 0; // phones fire a fake mouseover after every tap: ignore it
  document.addEventListener('mouseover', e => {
    if (Date.now() - lastTouch < 800) return;
    const f = textFor(e.target);
    if (!f) { if (current && !current.contains(e.target)) hide(); return; }
    if (f.el !== current) show(f);
  });
  document.addEventListener('mouseout', e => {
    if (current && !(e.relatedTarget && current.contains(e.relatedTarget))) hide();
  });
  // Keyboard focus shows tips too, but not the focus a phone tap gives a button
  document.addEventListener('focusin', e => { if (Date.now() - lastTouch < 800) return; const f = textFor(e.target); if (f) show(f); });
  document.addEventListener('focusout', hide);
  // Only the page scrolling moves things out from under the tip (not the combat log scrolling itself)
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => { if (Math.abs(window.scrollY - lastScrollY) > 4 && current) hide(); lastScrollY = window.scrollY; });

  // Phones: press and hold. Holding long enough to see a tip cancels the tap, so it never clicks by accident.
  let holdTimer = null, shownByHold = false;
  document.addEventListener('touchstart', e => {
    lastTouch = Date.now();
    shownByHold = false;
    const f = textFor(e.target);
    if (!f) return;
    holdTimer = setTimeout(() => { shownByHold = true; show(f); }, 450);
  }, { passive: true });
  document.addEventListener('touchmove', () => clearTimeout(holdTimer), { passive: true });
  document.addEventListener('touchend', e => {
    lastTouch = Date.now();
    clearTimeout(holdTimer);
    if (shownByHold) {
      e.preventDefault();
      hideTimer = setTimeout(hide, 3000);
    }
  }, { passive: false });

  // The power card had a plain browser tooltip; the new tip covers it
  const pc = document.getElementById('hud-power-card');
  if (pc) pc.removeAttribute('title');

  window.btTips = { textFor, show: (sel) => { const el = document.querySelector(sel); const f = el && textFor(el); if (f) show(f); return !!f; }, hide, TIPS, MATERIAL_TIPS };
})();
