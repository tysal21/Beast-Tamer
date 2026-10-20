/**
 * ================= WHAT'S NEW =================
 * After a big update, returning players see the patch notes once on their next refresh.
 * To announce a new update: add an entry at the TOP of PATCH_NOTES with a new, later id.
 * Small fixes don't need an entry; only add one when there's something worth telling players.
 * Brand-new players never see it (everything is new to them anyway). The footer link reopens it any time.
 */
(function () {
  const PATCH_NOTES = [
    {
      id: '2026-10-23',
      title: 'The Legacy Map',
      items: [
        { icon: 'fa-paw', head: 'The Hunter\'s Legacy is now a map', text: 'Your skills sit on a great beast\'s paw. Everything you already bought is in the palm, and you get a free respec to place your Shards again if you like. Drag the map around and click a node to learn it.' },
        { icon: 'fa-lock-open', head: 'New rings open with Seals', text: 'Seal 3 opens the toe pads, one for each part of the camp: Fishing, Camp, Hunt & Apex, Armory & Gear, and Forge & Pack. Seal 5 opens the toe tips, and Seal 7 the claws.' },
        { icon: 'fa-campground', head: 'Every tab wakes up again', text: 'Free station levels that never reset with a 5th and 6th Overdrive star, Masterwork tempering in the Armory, Rare fish on idle lines, Relic Echoes, a 4th and 5th Pack slot, and more.' },
        { icon: 'fa-infinity', head: 'Always something to save for', text: 'Shard Sense brings in more Shards, and Heart of the Paw has no limit: every rank is +3% Combat Power, forever.' }
      ]
    },
    {
      id: '2026-10-22',
      title: 'Always Forward',
      items: [
        { icon: 'fa-arrow-trend-up', head: 'Ascending only makes you stronger', text: 'Bosses no longer grow stronger every time you Ascend. Their strength depends only on their tier, so every prestige lets you climb a little deeper up the Apex Ladder.' },
        { icon: 'fa-map', head: 'Coming next: the Legacy Map', text: 'The Hunter\'s Legacy is growing into a big permanent map shaped like a bear\'s paw, with branches that bring every tab back to life.' }
      ]
    },
    {
      id: '2026-10-21',
      title: 'Fire and Frost',
      items: [
        { icon: 'fa-fire', head: 'A new camp', text: 'Hunt by clicking the campfire, and watch it burn low when a blizzard rolls in. Your generators are now stations, with four stars for their Overdrives.' },
        { icon: 'fa-scroll', head: 'Wanted posters', text: 'Every beast you hunt gets a wanted poster, your odds are a dial, and the tracks above it show your trail. Click a track to pick that beast.' },
        { icon: 'fa-palette', head: 'New art everywhere', text: 'The Tundra beasts (Hoarwolf, Tuskram, Rimeclaw, Lumen Mammoth), every camp station, all nine weapons in the Armory, and the Primeval Behemoth itself.' }
      ]
    },
    {
      id: '2026-10-20',
      title: 'The Archive Wakes',
      items: [
        { icon: 'fa-snowflake', head: 'Every region has its own currency', text: 'In the Frozen Tundra, Ascending pays in Rimestones instead of Bloodstones, and its Altar sells four Tundra-only perks: Whiteout Stalker, Hearthkeeper, Deep Caches and Recall.' },
        { icon: 'fa-mobile-screen-button', head: 'Play on your phone', text: 'Open Save / Play on phone at the bottom of the page and scan the QR code with your phone camera, or copy the transfer link and open it on any device.' },
        { icon: 'fa-paw', head: 'The Pack', text: 'Reach Region 2 and break Seal 5 (in either order) and the Loom teaches you to bring three hybrids along, each lending its own ability.' },
        { icon: 'fa-circle-info', head: 'Hover for help', text: 'Not sure what something does? Hover over it (or press and hold on a phone) for a short explanation.' },
        { icon: 'fa-fish', head: 'Fishing rework', text: 'Every fish has its own storage, so a full basket never costs you a rare catch. Legendaries are a little easier, idle lines are slower, and gear now says what it uses up.' }
      ]
    }
  ];
  const KEY = 'bt_seen_patch';

  function readSeen() { try { return localStorage.getItem(KEY) || ''; } catch (e) { return ''; } }
  function writeSeen(id) { try { localStorage.setItem(KEY, id); } catch (e) { /* storage blocked */ } }

  function esc(s) { return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }

  /** Has this save played at all? New players skip the notes. */
  function isReturningPlayer() {
    try {
      return (gameState.ascensionCount || 0) > 0 || (gameState.world || 0) > 0 ||
        Object.values(gameState.generators || {}).some(n => n > 0) || Object.keys(gameState.tamedBeasts || {}).length > 0;
    } catch (e) { return false; }
  }

  function show(notes) {
    if (!notes.length || document.getElementById('whatsnew-card')) return;
    const c = document.createElement('div');
    c.id = 'whatsnew-card';
    c.innerHTML = '<div class="wn-box" role="dialog" aria-label="What\'s new">' +
      '<div class="wn-kicker">What\'s new</div>' +
      notes.map(n => '<div class="wn-patch"><div class="wn-title">' + esc(n.title) + '</div>' +
        n.items.map(it => '<div class="wn-item"><i class="fa-solid ' + it.icon + '"></i><div><div class="wn-head">' + esc(it.head) + '</div><div class="wn-text">' + esc(it.text) + '</div></div></div>').join('') +
        '</div>').join('') +
      '<button type="button" class="wn-ok">Back to the hunt</button></div>';
    document.body.appendChild(c);
    const close = () => { writeSeen(PATCH_NOTES[0].id); c.remove(); };
    c.addEventListener('click', e => { if (e.target === c || e.target.closest('.wn-ok')) close(); });
  }

  /** Wait until nothing else is on screen (intro, away summary, Loom card, transfer), then show unseen notes */
  function maybeShow() {
    const seen = readSeen();
    const latest = PATCH_NOTES[0].id;
    if (seen >= latest) return true;
    if (!isReturningPlayer()) { writeSeen(latest); return true; }
    if (document.body.classList.contains('stealth')) return false;
    if (['intro-card', 'away-card', 'loom-log-card', 'transfer-card', 'lb-invite'].some(id => document.getElementById(id))) return false;
    show(PATCH_NOTES.filter(n => n.id > seen).slice(0, 2)); // at most the two newest updates
    return true;
  }

  // Give the away summary a moment to appear first, then check every couple of seconds until shown
  setTimeout(function tryShow() { if (!maybeShow()) setTimeout(tryShow, 2000); }, 2500);

  const btn = document.getElementById('btn-whats-new');
  if (btn) btn.addEventListener('click', () => show(PATCH_NOTES.slice(0, 2)));
  window.btWhatsNew = { notes: PATCH_NOTES, show: () => show(PATCH_NOTES.slice(0, 2)) };
})();
