/**
 * ================= THE PACK UI =================
 * Three slots for true-born hybrids. A slotted hybrid lends its Pack ability; every hybrid keeps its normal bonuses.
 */
(function () {
  const root = document.getElementById('pack-content');
  if (!root) return;
  let sig = '';

  function hybridArtIcon(h) {
    return '<div class="pack-icon" style="color:' + (h.color || '#e0782f') + '"><i class="fa-solid ' + (h.icon || 'fa-paw') + '"></i></div>';
  }

  function render() {
    const p = getPackState();
    const owned = HYBRID_CATALOG.filter(h => gameState.hybrids && gameState.hybrids[h.id]);
    const slots = [];
    for (let i = 0; i < getPackSlots(); i++) {
      const id = p.slots[i];
      const h = id && HYBRID_CATALOG.find(x => x.id === id);
      if (h) {
        const a = PACK_ABILITIES[h.id];
        slots.push('<div class="pack-slot filled">' + hybridArtIcon(h) +
          '<div class="min-w-0 flex-1"><div class="font-bold text-slate-100">' + h.name + ' <span class="text-[11px] font-mono text-slate-400">Lv ' + getHybridLevel(h.id) + '</span></div>' +
          '<div class="text-xs text-amber-200"><i class="fa-solid ' + a.icon + ' mr-1"></i>' + a.name + ': ' + a.desc + '</div></div>' +
          '<button type="button" data-pack-remove="' + h.id + '" class="pack-btn ghost">Leave</button></div>');
      } else {
        slots.push('<div class="pack-slot empty"><div class="pack-icon empty"><i class="fa-solid fa-plus"></i></div><div class="text-xs text-slate-400">Empty slot. Pick a true-born below.</div></div>');
      }
    }
    const list = owned.length ? owned.map(h => {
      const a = PACK_ABILITIES[h.id];
      const inPack = p.slots.includes(h.id);
      const full = p.slots.length >= getPackSlots();
      return '<div class="pack-row">' + hybridArtIcon(h) +
        '<div class="min-w-0 flex-1"><div class="font-bold text-slate-100">' + h.name + '</div>' +
        '<div class="text-xs text-slate-300"><i class="fa-solid ' + a.icon + ' mr-1 text-amber-400"></i>' + a.name + ': ' + a.desc + '</div></div>' +
        (inPack ? '<span class="text-xs font-mono text-emerald-300">In the Pack</span>'
          : '<button type="button" data-pack-add="' + h.id + '" ' + (full ? 'disabled title="All 3 slots are full"' : '') + ' class="pack-btn">Bring along</button>') +
        '</div>';
    }).join('') : '<div class="text-sm text-slate-400">You have no true-borns yet. Breed hybrids in the Beast Forge and they will show up here.</div>';
    const missing = HYBRID_CATALOG.filter(h => !(gameState.hybrids && gameState.hybrids[h.id]));
    root.innerHTML =
      '<div class="bt-stone p-5"><h2 class="font-cinzel text-2xl sm:text-3xl text-slate-100"><i class="fa-solid fa-paw mr-2 text-amber-400"></i>The Pack</h2>' +
        '<p class="text-xs text-slate-400 max-w-2xl">Your hybrids are true-borns: bred, never spliced, so they carry no thread. The makers\' rite lets them run with you by choice. Each one keeps its normal bonuses; while it is in the Pack it also lends its own ability.</p></div>' +
      '<div class="grid lg:grid-cols-2 gap-6">' +
        '<div class="bg-primal-850 border border-primal-700 rounded-2xl p-5 shadow-xl space-y-2"><div class="font-cinzel text-lg text-slate-100 mb-1">Running with you (' + p.slots.length + '/' + getPackSlots() + ')</div>' + slots.join('') + '</div>' +
        '<div class="bg-primal-850 border border-primal-700 rounded-2xl p-5 shadow-xl space-y-2"><div class="font-cinzel text-lg text-slate-100 mb-1">Your true-borns</div>' + list +
          (missing.length && owned.length ? '<div class="text-[11px] text-slate-500 pt-1">Still to breed: ' + missing.map(h => h.name).join(', ') + '.</div>' : '') + '</div>' +
      '</div>' +
      '<div class="text-[11px] text-slate-500">Crossing a Rift resets your hybrids, so the Pack empties until you breed them again in the new region.</div>';
  }

  function signature() {
    return [JSON.stringify(getPackState().slots), JSON.stringify(gameState.hybrids || {})].join('|');
  }

  root.addEventListener('click', e => {
    const a = e.target.closest('[data-pack-add]');
    const r = e.target.closest('[data-pack-remove]');
    if (a && !a.disabled && addToPack(a.getAttribute('data-pack-add'))) { try { sound.playBuy(); } catch (err) { /* audio blocked */ } saveGameToStorage(); }
    if (r && removeFromPack(r.getAttribute('data-pack-remove'))) { try { sound.playClick(); } catch (err) { /* audio blocked */ } saveGameToStorage(); }
    sig = '';
    tick();
  });

  function tick() {
    if (gameState.activeTab !== 'pack') return;
    const s = signature();
    if (s !== sig) { sig = s; render(); }
  }
  const btn = document.getElementById('tab-btn-pack');
  if (btn) btn.addEventListener('click', () => switchTab('pack'));
  setInterval(tick, 1000);
  const origSwitch = window.switchTab;
  if (typeof origSwitch === 'function') {
    window.switchTab = function (tabId) {
      const out = origSwitch.apply(this, arguments);
      if (tabId === 'pack') { sig = ''; tick(); }
      return out;
    };
  }
})();
