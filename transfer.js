/**
 * ================= PLAY ON ANOTHER DEVICE =================
 * The Save Code window shows a QR code and a "Copy transfer link". The link carries the whole save
 * (compressed) after '#t=', so opening it on a phone or another computer offers to load that save.
 * Nothing is uploaded anywhere: the save lives only in the link.
 */
(function () {
  const HASH_KEY = '#t=';

  function toB64Url(bytes) {
    let s = '';
    for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function fromB64Url(str) {
    const s = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
    const out = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
    return out;
  }
  async function pipe(bytes, stream) {
    const buf = await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer();
    return new Uint8Array(buf);
  }

  // 'z' = deflate-compressed, 'p' = plain (for browsers without CompressionStream)
  async function encodeSave(json) {
    const raw = new TextEncoder().encode(json);
    if (typeof CompressionStream === 'function') {
      try { return 'z' + toB64Url(await pipe(raw, new CompressionStream('deflate-raw'))); } catch (e) { /* fall through */ }
    }
    return 'p' + toB64Url(raw);
  }
  async function decodeSave(payload) {
    const kind = payload[0], bytes = fromB64Url(payload.slice(1));
    if (kind === 'z') {
      if (typeof DecompressionStream !== 'function') throw new Error('This browser is too old to open transfer links. Use the save code instead.');
      return new TextDecoder().decode(await pipe(bytes, new DecompressionStream('deflate-raw')));
    }
    if (kind === 'p') return new TextDecoder().decode(bytes);
    throw new Error('This transfer link is damaged.');
  }

  async function makeLink() {
    saveGameToStorage();
    const json = localStorage.getItem(SAVE_STORAGE_KEY) || '{}';
    return location.href.split('#')[0] + HASH_KEY + (await encodeSave(json));
  }

  // ---------- Sending side (inside the Save Code window) ----------
  const modal = document.getElementById('save-modal');
  const box = document.getElementById('transfer-box');
  let lastLink = '';

  async function refreshQr() {
    if (!box) return;
    const canvas = document.getElementById('transfer-qr');
    const msg = document.getElementById('transfer-msg');
    try {
      lastLink = await makeLink();
      drawQr(canvas, Array.from(new TextEncoder().encode(lastLink)));
      canvas.classList.remove('hidden');
      msg.textContent = '';
    } catch (e) {
      canvas.classList.add('hidden');
      msg.textContent = 'Your save is too big for a QR code. Use "Copy transfer link" instead.';
    }
  }

  if (modal && box) {
    // Refresh the QR every time the window opens so it carries the latest progress
    new MutationObserver(() => { if (!modal.classList.contains('hidden')) refreshQr(); })
      .observe(modal, { attributes: true, attributeFilter: ['class'] });
    document.getElementById('btn-copy-transfer').addEventListener('click', async () => {
      const link = await makeLink();
      lastLink = link;
      const done = () => showToast('Transfer link copied! Send it to yourself and open it on the other device.', 'success');
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(link).then(done, () => window.prompt('Copy this link:', link));
      else window.prompt('Copy this link:', link);
    });
    // Tap the QR to show it full screen: much easier for a phone camera to read
    document.getElementById('transfer-qr-wrap').addEventListener('click', () => {
      const src = document.getElementById('transfer-qr');
      const big = document.createElement('div');
      big.id = 'transfer-big';
      big.className = 'fixed inset-0 flex flex-col items-center justify-center gap-3 p-4 cursor-zoom-out';
      big.style.cssText = 'z-index:95;background:#fff';
      const c = document.createElement('canvas');
      c.width = src.width; c.height = src.height;
      c.getContext('2d').drawImage(src, 0, 0);
      c.style.cssText = 'width:min(92vw,86vh);height:min(92vw,86vh);image-rendering:pixelated';
      const t = document.createElement('div');
      t.style.cssText = 'color:#333;font:600 14px sans-serif';
      t.textContent = 'Point your phone camera here. Tap anywhere to close.';
      big.append(c, t);
      big.addEventListener('click', () => big.remove());
      document.body.appendChild(big);
    });
    if (navigator.share) {
      const shareBtn = document.getElementById('btn-share-transfer');
      shareBtn.classList.remove('hidden');
      shareBtn.addEventListener('click', async () => {
        try { await navigator.share({ title: 'Beast Tamer save', url: await makeLink() }); } catch (e) { /* cancelled */ }
      });
    }
  }

  // ---------- Receiving side ----------
  function clearHash() {
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { location.hash = ''; }
  }

  function summary(d) {
    const parts = [];
    const name = (d.hunterName || '').trim();
    parts.push((name || 'Unnamed hunter'));
    parts.push('Region ' + ((d.world || 0) + 1));
    parts.push(((d.totem && d.totem.sealsBroken) || 0) + ' Seals');
    parts.push((d.ascensionCount || 0) + ' Ascensions this region');
    return parts.join(' · ');
  }

  async function receive() {
    if (!location.hash.startsWith(HASH_KEY)) return;
    const payload = location.hash.slice(HASH_KEY.length);
    let data;
    try {
      const json = await decodeSave(payload);
      data = readSaveCode(SAVE_CODE_PREFIX + btoa(unescape(encodeURIComponent(json))));
    } catch (e) {
      clearHash();
      showToast('That transfer link could not be read: ' + e.message, 'error', true);
      return;
    }
    const c = document.createElement('div');
    c.id = 'transfer-card';
    c.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4';
    c.style.zIndex = '90'; // above the first-visit intro card, which a fresh phone shows
    c.innerHTML = '<div class="bg-primal-850 border border-amber-700/60 rounded-2xl max-w-md w-full p-5 space-y-3 shadow-2xl">' +
      '<h3 class="font-cinzel text-lg font-bold text-white"><i class="fa-solid fa-mobile-screen-button text-amber-400 mr-2"></i>Continue your hunt here?</h3>' +
      '<div class="text-sm text-amber-200 font-mono">' + summary(data).replace(/[<>&]/g, '') + '</div>' +
      '<p class="text-xs text-slate-400">This loads the save from your other device and <strong class="text-rose-300">replaces any progress on this one</strong>. The two devices don\'t stay in sync: when you switch back, send a new link the same way.</p>' +
      '<div class="flex flex-wrap gap-2 pt-1">' +
        '<button type="button" id="transfer-yes" class="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg cursor-pointer">Load it</button>' +
        '<button type="button" id="transfer-no" class="px-4 py-2 bg-primal-700 hover:bg-primal-600 text-slate-200 text-sm font-semibold rounded-lg cursor-pointer">Keep this device\'s game</button>' +
      '</div></div>';
    document.body.appendChild(c);
    document.getElementById('transfer-no').addEventListener('click', () => { clearHash(); c.remove(); });
    document.getElementById('transfer-yes').addEventListener('click', () => {
      data.lastSavedAt = Date.now(); // no offline Meat for the time the link sat in a message
      isResetting = true;           // stop the page from saving over the import while it reloads
      localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(data));
      clearHash();
      window.location.reload();
    });
  }

  receive();
  window.addEventListener('hashchange', receive);
  window.btTransfer = { makeLink, encodeSave, decodeSave };
})();
