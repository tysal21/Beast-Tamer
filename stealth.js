/**
 * ================= STEALTH MODE ("Doc view") =================
 * One toggle turns the game into a plain office memo: white page, office font, no art, no sound, no pop-ups,
 * and every game word renamed to office jargon. The game keeps running and every button still works.
 * Toggle: the "Doc view" button (bottom-left), the backtick key (`), or "View" in the fake ribbon to go back.
 */
(function () {
  const STORE_KEY = 'beast_tamer_stealth';
  const DOC_TITLE = 'Q4 Inventory Reconciliation - Draft';
  const DOC_ICON = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M7 2h13l6 6v22H7z" fill="#fff" stroke="#3b6fb6" stroke-width="2"/>' +
    '<path d="M20 2v6h6" fill="none" stroke="#3b6fb6" stroke-width="2"/><path d="M11 14h11M11 18h11M11 22h8" stroke="#3b6fb6" stroke-width="2"/></svg>');

  let on = false;
  let observer = null;
  let saved = null; // what we change on the way in, restored on the way out
  let titleTimer = null;
  let rx = null;
  let map = null;

  // ---------- Renaming ----------
  const COMPANIES = ['Acme Logistics', 'Brightline Supply', 'Corridor Partners', 'Delta Holdings'];
  const WORDS = {
    'combat power': 'output capacity', 'hunter power': 'lead capacity', 'beast power': 'partner capacity',
    'meat/s': 'units/s', 'meat stock': 'units on hand', 'meat': 'units',
    'stamina': 'staff hours', 'bloodstones': 'credits', 'bloodstone': 'credit',
    'apex shards': 'senior tokens', 'apex shard': 'senior token', 'shards': 'tokens', 'shard': 'token',
    'fangs': 'parts', 'fang': 'part',
    'tamed menagerie': 'approved accounts', 'menagerie': 'account list',
    'taming': 'approving', 'tamed': 'approved', 'tames': 'approvals', 'tame': 'approve',
    'beasts': 'accounts', 'beast': 'account', 'hybrids': 'mergers', 'hybrid': 'merger',
    'hunting': 'reviewing', 'hunter': 'lead', 'hunts': 'reviews', 'hunt': 'review',
    'bosses': 'reviews', 'boss': 'review', 'fights': 'reviews', 'fight': 'review',
    'challenge': 'submit', 'forage': 'process', 'strike': 'entry',
    'forge': 'workshop', 'relics': 'assets', 'relic': 'asset', 'bestiary': 'directory',
    'ascension altar': 'year-end office', 'ascensions': 'fiscal rollovers', 'ascension': 'fiscal rollover',
    'ascending': 'rolling over', 'ascend': 'roll over', 'altar': 'office', 'perks': 'policies', 'perk': 'policy',
    'primal totem': 'compliance audit', 'totem': 'audit', 'seals': 'milestones', 'seal': 'milestone',
    'guardians': 'auditors', 'guardian': 'auditor', 'titans': 'annual audits', 'titan': 'annual audit',
    'apex ladder': 'senior track', 'apex': 'senior', 'ladder': 'track', 'tier': 'level',
    'expeditions': 'field visits', 'expedition': 'field visit', 'regions': 'sites', 'region': 'site',
    'gear': 'equipment', 'workbench': 'facilities', 'honing': 'calibration', 'hone': 'calibrate',
    'reforge': 'upgrade', 'charm': 'badge', 'trophy weapon': 'premium license', 'trophy': 'award', 'weapon': 'toolkit',
    'sparring ring': 'training room', 'sparring': 'training', 'brute conditioning': 'fitness program', 'brute': 'fitness',
    'weakpoint anatomy': 'risk analysis', 'anatomy': 'analysis', 'weakpoint': 'risk',
    'camp provisions': 'office supplies', 'provisions': 'supplies', 'camp': 'overview',
    'fishing dock': 'procurement desk', 'fishing': 'procurement', 'fish': 'items', 'dock': 'desk', 'cast': 'request', 'reel': 'process',
    'codex': 'catalog', 'recipes': 'bundles', 'recipe': 'bundle', 'cook': 'assemble',
    'blizzard': 'system outage', 'warmth': 'uptime', 'stoke': 'restart', 'thaw': 'restore', 'frozen': 'archived',
    'caches': 'backups', 'cache': 'backup', 'rift': 'merger window', 'migrate': 'relocate', 'migration': 'relocation',
    'world': 'region', 'worlds': 'regions', 'leadership': 'management',
    'pack orders': 'team tickets', 'packmaster': 'team lead', 'pack': 'team', 'orders': 'tickets',
    'incubator': 'pipeline', 'hatch': 'launch', 'hatched': 'launched', 'gestation': 'onboarding',
    'wounded': 'on leave', 'wound': 'leave', 'adrenaline': 'overtime', 'slay': 'close', 'slain': 'closed',
    'roar': 'note', 'wild': 'pending', 'wilds': 'main office', 'primal': 'core', 'primeval': 'senior',
    'legacy': 'tenure', 'insight': 'feedback', 'beat': 'complete', 'defeated': 'completed',
    'wanted': 'pending', 'untamed': 'unapproved', 'sprite': 'icon', 'lair': 'office',
    'chimera': 'vendor', 'chimeras': 'vendors', 'viper': 'vendor', 'vipers': 'vendors', 'boar': 'vendor', 'hawk': 'vendor',
    'grizzly': 'vendor', 'scorpion': 'vendor', 'scorpions': 'vendors', 'wyrm': 'vendor', 'wyrms': 'vendors', 'hound': 'vendor', 'hounds': 'vendors',
    'wolf': 'courier', 'wolves': 'couriers', 'serpent': 'client', 'dragon': 'client', 'mammoths': 'clients', 'mammoth': 'client',
    'prey': 'leads', 'herds': 'batches', 'herd': 'batch', 'predator': 'competitor', 'predators': 'competitors',
    'venom': 'compliance', 'venomous': 'compliant', 'claws': 'clauses', 'claw': 'clause', 'talons': 'terms', 'talon': 'term',
    'tusked': 'senior', 'tusks': 'terms', 'musk': 'outreach', 'bait': 'outreach', 'traps': 'channels', 'trap': 'channel',
    'snares': 'channels', 'snare': 'channel', 'harpoon': 'contract', 'harpoons': 'contracts', 'spear': 'pen', 'blood': 'budget',
    'bloodline': 'pipeline', 'kill': 'close', 'kills': 'closes', 'jungle': 'market', 'swamp': 'market', 'swamps': 'markets',
    'butcher': 'analyst', 'butchery': 'analysis', 'feral': 'organic', 'savage': 'aggressive', 'monster': 'client', 'monsters': 'clients',
    'hunt & bosses': 'vendor reviews', 'combat log': 'activity log', 'combat': 'operations', 'lethality': 'efficiency',
    'canine': 'regional', 'subdue': 'onboard', 'bond': 'partner', 'encounter': 'engagement', 'lesser game': 'small accounts',
    'armory': 'equipment room', 'bare hands': 'no toolkit', 'flint knife': 'basic toolkit', 'weapons': 'toolkits',
    'hermite curve': 'growth curve', 'arena': 'meeting room', 'creature': 'client', 'creatures': 'clients', 'game': 'project',
    'refight': 'resubmit', 'spar': 'train', 'conquered': 'completed', 'salvaged': 'recovered', 'trophy expedition': 'award field visit',
    'eruption rounds': 'forecast rounds', 'eruption': 'forecast', 'erupt': 'forecast', 'volcano': 'market', 'magma cores': 'bonus points', 'magma core': 'bonus point',
    'magma': 'market', 'molten heart': 'reserve fund', 'heat shield': 'risk insurance', 'scorched': 'penalized', 'cash out': 'finalize', 'cashed out': 'finalized', 'cash-out': 'finalize', 'cores': 'points', 'core': 'point',
    'charges': 'allocations', 'charge': 'allocation', 'raise the steaks': 'set allocation', 'blew': 'closed', 'blown': 'closed', 'blast': 'correction', 'lava': 'market', 'ash': 'archive', 'ashen': 'archived',
    'roars': 'notes', 'bite': 'fee', 'sting': 'fee', 'pits': 'channels', 'dens': 'branches', 'den': 'branch'
  };

  function buildMap() {
    const m = {};
    const add = (from, to) => { if (from && to && !m[from.toLowerCase()]) m[from.toLowerCase()] = to; };
    // Beasts, in every world, keep their slot's company name
    (typeof BASE_BEASTS !== 'undefined' ? BASE_BEASTS : BEAST_CATALOG).forEach((b, i) => add(b.name, COMPANIES[i % 4]));
    (typeof WORLDS !== 'undefined' ? WORLDS : []).forEach((w, wi) => {
      (w.beasts || []).forEach((b, i) => add(b.name, COMPANIES[i % 4]));
      (w.gens || []).forEach((g, i) => add(g.name, 'Supply Line ' + (i + 1)));
      if (w.titan) add(w.titan.name, 'Annual Audit ' + (wi + 1));
      add(w.name, 'Region ' + (wi + 1));
    });
    GENERATOR_LADDER.forEach((g, i) => add(g.name, 'Supply Line ' + (i + 1)));
    WEAPONS_CATALOG.forEach((w, i) => add(w.name, 'Toolkit v' + (i + 1)));
    HYBRID_CATALOG.forEach((h, i) => add(h.name, 'Joint Venture ' + (i + 1)));
    Object.values(RELIC_REGISTRY).forEach((r, i) => add(r.name, 'Asset #' + (101 + i)));
    ASCENSION_PERKS.forEach((p, i) => add(p.name, 'Policy ' + (i + 1)));
    ASCENSION_EXPANSIONS.forEach((p, i) => add(p.name, 'Add-on ' + (i + 1)));
    FISH_CATALOG.forEach((f, i) => add(f.name, 'SKU-' + String(100 + i)));
    FISH_RECIPES.forEach((r, i) => add(r.name, 'Bundle ' + (i + 1)));
    TROPHY_WEAPONS.forEach((t, i) => add(t.name, 'Premium License ' + (i + 1)));
    LEGACY_NODES.forEach((n, i) => add(n.name, 'Initiative ' + (i + 1)));
    Object.values(MATERIALS).forEach((mm, i) => add(mm.name, 'Material Class ' + String.fromCharCode(65 + i)));
    EXPEDITION_REGIONS.forEach((r, i) => add(r.name, 'Site ' + (i + 1)));
    GEAR_SLOTS.forEach(s => add(s.name, { helm: 'Laptop', armor: 'Desk Chair', charm: 'Lanyard' }[s.id] || s.name));
    GEAR_CONFIG.grades.forEach((g, i) => add(g.name, 'Grade ' + (i + 1)));
    (typeof TOTEM_TITLES !== 'undefined' ? TOTEM_TITLES : []).forEach((t, i) => add(t, 'FY' + (27 + i)));
    (typeof APEX_TITLES !== 'undefined' ? APEX_TITLES : []).forEach((t, i) => add(t, 'Grade ' + (i + 1)));
    Object.keys(WORDS).forEach(k => add(k, WORDS[k]));
    return m;
  }

  function escapeRx(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function buildRegex(m) {
    const keys = Object.keys(m).sort((a, b) => b.length - a.length).map(escapeRx);
    return new RegExp('(?<![A-Za-z])(' + keys.join('|') + ')(?![A-Za-z])', 'gi');
  }

  const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu;

  function matchCase(src, out) {
    if (src.length > 1 && src === src.toUpperCase() && /[A-Z]/.test(src)) return out.toUpperCase();
    if (src[0] === src[0].toUpperCase() && src[0] !== src[0].toLowerCase()) return out.charAt(0).toUpperCase() + out.slice(1);
    return out;
  }

  function convert(s) {
    if (!s || !/[A-Za-z☀-\u{1FAFF}]/u.test(s)) return s;
    return s.replace(EMOJI, '').replace(rx, w => matchCase(w, map[w.toLowerCase()] || w));
  }

  // ---------- DOM pass ----------
  function skip(node) {
    const p = node.parentNode;
    if (!p) return true;
    const tag = p.nodeName;
    return tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEXTAREA' || (p.closest && p.closest('#stealth-chrome'));
  }

  function doText(node) {
    if (node.__btOut !== undefined && node.nodeValue === node.__btOut) return;
    if (skip(node)) return;
    const orig = node.nodeValue;
    const out = convert(orig);
    node.__btOrig = orig;
    node.__btOut = out;
    if (out !== orig) node.nodeValue = out;
  }

  function doAttrs(el) {
    if (!el.getAttribute) return;
    ['title', 'placeholder'].forEach(a => {
      const v = el.getAttribute(a);
      if (!v) return;
      const key = '__bt_' + a;
      if (el[key] && el[key].out === v) return;
      const out = convert(v);
      el[key] = { orig: v, out };
      if (out !== v) el.setAttribute(a, out);
    });
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1) return;
    doAttrs(root);
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n;
    while ((n = tw.nextNode())) { if (n.nodeType === 3) doText(n); else doAttrs(n); }
  }

  function restoreAll() {
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n;
    while ((n = tw.nextNode())) {
      if (n.nodeType === 3) {
        if (n.__btOut !== undefined && n.nodeValue === n.__btOut) n.nodeValue = n.__btOrig;
        delete n.__btOut; delete n.__btOrig;
      } else {
        ['title', 'placeholder'].forEach(a => {
          const rec = n['__bt_' + a];
          if (rec && n.getAttribute(a) === rec.out) n.setAttribute(a, rec.orig);
          delete n['__bt_' + a];
        });
      }
    }
  }

  // ---------- Page chrome (fake ribbon + doc title) ----------
  function buildChrome() {
    let c = document.getElementById('stealth-chrome');
    if (c) return c;
    c = document.createElement('div');
    c.id = 'stealth-chrome';
    c.innerHTML =
      '<div class="sc-ribbon"><span class="sc-file">File</span><span>Home</span><span>Insert</span><span>Layout</span>' +
      '<span>References</span><span>Review</span><span class="sc-view" id="stealth-exit" title="Switch view">View</span>' +
      '<span class="sc-right">Saved</span></div>' +
      '<div class="sc-head"><div class="sc-title">' + DOC_TITLE + '</div>' +
      '<div class="sc-meta">Prepared by Operations &middot; Internal &middot; Last edited <span id="stealth-time"></span></div></div>';
    document.body.insertBefore(c, document.body.firstChild);
    c.querySelector('#stealth-exit').addEventListener('click', () => setStealth(false));
    return c;
  }

  function tickClock() {
    const t = document.getElementById('stealth-time');
    if (t) t.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    if (document.title !== DOC_TITLE) document.title = DOC_TITLE;
  }

  function setIcon(href) {
    let link = document.querySelector('link[rel~="icon"]');
    const prev = link ? link.getAttribute('href') : null;
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    if (href) link.setAttribute('href', href); else link.remove();
    return prev;
  }

  // ---------- Toggle ----------
  function setStealth(want, quiet) {
    want = !!want;
    if (want === on) return;
    on = want;
    try { localStorage.setItem(STORE_KEY, on ? '1' : '0'); } catch (e) { /* storage blocked: still works for this visit */ }
    if (on) {
      if (!map) { map = buildMap(); rx = buildRegex(map); }
      saved = {
        title: document.title,
        icon: setIcon(DOC_ICON),
        sound: (typeof sound !== 'undefined') ? sound.enabled : null
      };
      if (typeof sound !== 'undefined') sound.enabled = false;
      buildChrome();
      document.body.classList.add('stealth');
      walk(document.body);
      observer = new MutationObserver(recs => {
        for (const r of recs) {
          if (r.type === 'characterData') doText(r.target);
          else if (r.type === 'attributes') doAttrs(r.target);
          else r.addedNodes.forEach(walk);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['title', 'placeholder'] });
      tickClock();
      titleTimer = setInterval(tickClock, 1000);
    } else {
      if (observer) { observer.disconnect(); observer = null; }
      clearInterval(titleTimer);
      document.body.classList.remove('stealth');
      restoreAll();
      if (saved) {
        document.title = saved.title;
        setIcon(saved.icon);
        if (typeof sound !== 'undefined' && saved.sound !== null) sound.enabled = saved.sound;
      }
      saved = null;
    }
    const btn = document.getElementById('btn-stealth');
    if (btn) btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (!quiet && typeof saveGameToStorage === 'function') saveGameToStorage();
  }

  function isStealthOn() { return on; }
  window.setStealth = setStealth;
  window.isStealthOn = isStealthOn;

  // Toggle button (normal view only; in Doc view, "View" in the ribbon goes back)
  const btn = document.createElement('button');
  btn.id = 'btn-stealth';
  btn.type = 'button';
  btn.title = 'Doc view: make the game look like a work document (shortcut: ` key)';
  btn.setAttribute('aria-pressed', 'false');
  btn.innerHTML = '<i class="fa-solid fa-file-lines"></i><span>Doc view</span>';
  btn.addEventListener('click', () => setStealth(!on));
  document.body.appendChild(btn);

  // Shortcut: the backtick key (`), the key above Tab
  document.addEventListener('keydown', e => {
    if (e.key !== '`' || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    e.preventDefault();
    setStealth(!on);
  });

  // Come back the way you left it
  let start = false;
  try { start = localStorage.getItem(STORE_KEY) === '1'; } catch (e) { start = false; }
  if (start) setStealth(true, true);
})();
