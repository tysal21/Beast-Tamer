/**
 * ================= NAVIGATION HUBS =================
 * Ten tabs are grouped into five hubs. The hub bar is the main navigation; the original tab buttons become
 * the small sub-tabs inside the active hub (all their badges, NEW tags and unlock rules keep working).
 * A hub with only one unlocked sub-tab shows no sub-tab row at all.
 */
(function () {
  const HUBS = [
    { id: 'camp', label: 'Camp', icon: 'fa-campground', tabs: ['camp', 'fish'] },
    { id: 'hunt', label: 'Hunt', icon: 'fa-crosshairs', tabs: ['hunt', 'relics'] },
    { id: 'pack', label: 'Pack', icon: 'fa-paw', tabs: ['forge', 'expedition', 'pack'] },
    { id: 'totem', label: 'Totem', icon: 'fa-monument', tabs: ['totem', 'legacy'] },
    { id: 'journey', label: 'Journey', icon: 'fa-route', tabs: ['ascend', 'world', 'leaderboard'] }
  ];
  const lastSub = {};

  const subRow = document.querySelector('#tab-btn-camp') && document.querySelector('#tab-btn-camp').parentElement;
  const nav = subRow && subRow.closest('nav');
  if (!subRow || !nav) return;

  // Build the hub bar above the existing tab row
  const bar = document.createElement('div');
  bar.id = 'hub-bar';
  bar.className = 'max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar';
  bar.innerHTML = HUBS.map(h =>
    '<button type="button" id="hub-btn-' + h.id + '" data-hub="' + h.id + '" class="hub-btn">' +
      '<i class="fa-solid ' + h.icon + '"></i><span>' + h.label + '</span><span class="hub-dot" aria-hidden="true"></span></button>').join('');
  nav.insertBefore(bar, nav.firstElementChild);
  subRow.classList.add('hub-subrow');

  const btnOf = tab => document.getElementById('tab-btn-' + tab);
  const hubOf = tab => HUBS.find(h => h.tabs.includes(tab));
  function available(tab) {
    const b = btnOf(tab);
    return !!b && !b.classList.contains('hidden') && !b.classList.contains('feature-locked');
  }
  function attentionTabs() {
    try { return (typeof window.btAttentionTabs === 'function') ? window.btAttentionTabs() : []; } catch (e) { return []; }
  }

  function renderHubs() {
    const active = (typeof gameState !== 'undefined' && gameState.activeTab) || 'camp';
    const activeHub = hubOf(active) || HUBS[0];
    const alerts = attentionTabs();
    HUBS.forEach(h => {
      const el = document.getElementById('hub-btn-' + h.id);
      const avail = h.tabs.filter(available);
      el.classList.toggle('hidden', avail.length === 0);
      el.classList.toggle('active', h === activeHub);
      const isNew = h.tabs.some(t => { const b = btnOf(t); return b && b.classList.contains('feature-new'); });
      el.classList.toggle('hub-new', isNew && h !== activeHub);
      el.classList.toggle('hub-alert', !isNew && h !== activeHub && h.tabs.some(t => alerts.includes(t)));
      // Sub-tabs: only the active hub's, and only when it has two or more
      h.tabs.forEach(t => { const b = btnOf(t); if (b) b.classList.toggle('hub-off', h !== activeHub || avail.length < 2); });
    });
    subRow.classList.toggle('hub-subrow-empty', activeHub.tabs.filter(available).length < 2);
  }

  bar.addEventListener('click', e => {
    const b = e.target.closest('[data-hub]');
    if (!b) return;
    const h = HUBS.find(x => x.id === b.getAttribute('data-hub'));
    const avail = h.tabs.filter(available);
    if (!avail.length) return;
    const target = avail.includes(lastSub[h.id]) ? lastSub[h.id] : avail[0];
    const tb = btnOf(target);
    if (tb) tb.click();
    renderHubs();
  });

  // Remember the last sub-tab used in each hub, and refresh after every tab change
  const origSwitch = window.switchTab;
  if (typeof origSwitch === 'function') {
    window.switchTab = function (tabId) {
      const r = origSwitch.apply(this, arguments);
      const h = hubOf(gameState.activeTab);
      if (h) lastSub[h.id] = gameState.activeTab;
      renderHubs();
      return r;
    };
  }
  window.renderHubs = renderHubs;
  renderHubs();
  setInterval(renderHubs, 700);
})();
