/**
 * DOM Elements Registry
 */
const elements = {
  hudMeat: document.getElementById('hud-meat'),
  hudMeatRate: document.getElementById('hud-meat-rate'),
  hudStaminaVal: document.getElementById('hud-stamina-val'),
  hudStaminaMax: document.getElementById('hud-stamina-max'),
  hudStaminaBar: document.getElementById('hud-stamina-bar'),
  hudStaminaLabel: document.getElementById('hud-stamina-label'),
  hudStaminaInterval: document.getElementById('hud-stamina-interval'),
  hudTotalPower: document.getElementById('hud-total-power'),
  hudPowerSplit: document.getElementById('hud-power-split'),

  activeBuffsBar: document.getElementById('active-buffs-bar'),
  buffAdrenalineBadge: document.getElementById('buff-adrenaline-badge'),
  buffAdrenalineTimer: document.getElementById('buff-adrenaline-timer'),

  tabBtnCamp: document.getElementById('tab-btn-camp'),
  tabBtnHunt: document.getElementById('tab-btn-hunt'),
  tabBtnForge: document.getElementById('tab-btn-forge'),
  tabBtnRelics: document.getElementById('tab-btn-relics'),
  tabForgeBadge: document.getElementById('tab-forge-badge'),

  panelCamp: document.getElementById('panel-camp'),
  panelHunt: document.getElementById('panel-hunt'),
  panelForge: document.getElementById('panel-forge'),
  panelRelics: document.getElementById('panel-relics'),

  forgeLockedView: document.getElementById('forge-locked-view'),
  forgeExcavateView: document.getElementById('forge-excavate-view'),
  forgeUnlockedView: document.getElementById('forge-unlocked-view'),
  btnUnlockForge: document.getElementById('btn-unlock-forge'),
  nurseryContainer: document.getElementById('nursery-container'),
  incubatorCard: document.getElementById('incubator-card'),
  synthesizerContainer: document.getElementById('synthesizer-container'),
  forgeHatchedCount: document.getElementById('forge-hatched-count'),

  btnForage: document.getElementById('btn-forage'),
  btnForageText: document.getElementById('btn-forage-text'),
  labelClickYield: document.getElementById('label-click-yield'),

  armoryTierBadge: document.getElementById('armory-tier-badge'),
  armoryEquippedIcon: document.getElementById('armory-equipped-icon'),
  armoryEquippedName: document.getElementById('armory-equipped-name'),
  armoryEquippedBonus: document.getElementById('armory-equipped-bonus'),
  armoryCraftBox: document.getElementById('armory-craft-box'),
  armoryNextName: document.getElementById('armory-next-name'),
  armoryNextBenefit: document.getElementById('armory-next-benefit'),
  armoryNextCost: document.getElementById('armory-next-cost'),
  btnCraftWeapon: document.getElementById('btn-craft-weapon'),

  generatorsContainer: document.getElementById('generators-container'),

  campEnduranceLvl: document.getElementById('camp-endurance-lvl'),
  campEnduranceBonus: document.getElementById('camp-endurance-bonus'),
  campEnduranceCost: document.getElementById('camp-endurance-cost'),
  btnBuyEndurance: document.getElementById('btn-buy-endurance'),
  btnBuyEnduranceLabel: document.getElementById('btn-buy-endurance-label'),
  btnBuyEnduranceCostWrap: document.getElementById('btn-buy-endurance-cost-wrap'),

  campRecoveryLvl: document.getElementById('camp-recovery-lvl'),
  campRecoveryInterval: document.getElementById('camp-recovery-interval'),
  campRecoveryCost: document.getElementById('camp-recovery-cost'),
  btnBuyRecovery: document.getElementById('btn-buy-recovery'),
  btnBuyRecoveryLabel: document.getElementById('btn-buy-recovery-label'),
  btnBuyRecoveryCostWrap: document.getElementById('btn-buy-recovery-cost-wrap'),

  trainBruteLvl: document.getElementById('train-brute-lvl'),
  trainBruteYield: document.getElementById('train-brute-yield'),
  trainBruteCost: document.getElementById('train-brute-cost'),
  btnBuyBrute: document.getElementById('btn-buy-brute'),

  trainMasteryCard: document.getElementById('train-mastery-card'),
  trainMasteryLvl: document.getElementById('train-mastery-lvl'),
  trainMasteryDesc: document.getElementById('train-mastery-desc'),
  trainMasteryCostWrap: document.getElementById('train-mastery-cost-wrap'),
  trainMasteryCost: document.getElementById('train-mastery-cost'),
  btnBuyMastery: document.getElementById('btn-buy-mastery'),
  btnBuyMasteryLabel: document.getElementById('btn-buy-mastery-label'),

  trainAnatomyLvl: document.getElementById('train-anatomy-lvl'),
  trainAnatomyCostWrap: document.getElementById('train-anatomy-cost-wrap'),
  trainAnatomyCost: document.getElementById('train-anatomy-cost'),
  btnBuyAnatomy: document.getElementById('btn-buy-anatomy'),
  btnBuyAnatomyLabel: document.getElementById('btn-buy-anatomy-label'),
  trainAnatomyCurrent: document.getElementById('train-anatomy-current'),

  sparringLevel: document.getElementById('sparring-level'),
  sparringCostMeat: document.getElementById('sparring-cost-meat'),
  sparringTotalMultiplier: document.getElementById('sparring-total-multiplier'),
  btnSpar: document.getElementById('btn-spar'),
  btnSparLabel: document.getElementById('btn-spar-label'),

  relicOwnedCount: document.getElementById('relic-owned-count'),
  relicGrid: document.getElementById('relic-grid'),

  encounterTierBadge: document.getElementById('encounter-tier-badge'),
  selectBeastTier: document.getElementById('select-beast-tier'),
  beastPortraitImg: document.getElementById('beast-portrait-img'),
  beastName: document.getElementById('beast-name'),
  beastDesc: document.getElementById('beast-desc'),
  beastPowerMin: document.getElementById('beast-power-min'),
  beastPowerMax: document.getElementById('beast-power-max'),
  beastRewardPower: document.getElementById('beast-reward-power'),
  beastAvatarBox: document.getElementById('beast-avatar-box'),
  beastStatusRibbon: document.getElementById('beast-status-ribbon'),

  oddsPercentageText: document.getElementById('odds-percentage-text'),
  oddsMeterFill: document.getElementById('odds-meter-fill'),
  btnChallenge: document.getElementById('btn-challenge'),
  btnFightLabel: document.getElementById('btn-fight-label'),
  btnFightIcon: document.getElementById('btn-fight-icon'),
  btnChancePill: document.getElementById('btn-chance-pill'),

  cooldownContainer: document.getElementById('cooldown-container'),
  cooldownTimer: document.getElementById('cooldown-timer'),
  cooldownBar: document.getElementById('cooldown-bar'),
  cooldownLabel: document.getElementById('cooldown-label'),

  combatLog: document.getElementById('combat-log'),
  btnClearLog: document.getElementById('btn-clear-log'),

  menagerieTotalPower: document.getElementById('menagerie-total-power'),
  menagerieContainer: document.getElementById('menagerie-container'),

  btnToggleSound: document.getElementById('btn-toggle-sound'),
  soundStatus: document.getElementById('sound-status'),
  soundIcon: document.getElementById('sound-icon'),
  btnResetGame: document.getElementById('btn-reset-game'),
  resetModal: document.getElementById('reset-modal'),
  btnConfirmReset: document.getElementById('btn-confirm-reset'),
  btnCancelReset: document.getElementById('btn-cancel-reset'),
  toastContainer: document.getElementById('toast-container'),
  fightStaminaCost: document.getElementById('fight-stamina-cost'),
  fightWoundTime: document.getElementById('fight-wound-time'),

  // Phase 3: Ascension Altar
  hudBloodstones: document.getElementById('hud-bloodstones'),
  hudAscensionCount: document.getElementById('hud-ascension-count'),
  tabBtnAscend: document.getElementById('tab-btn-ascend'),
  tabAscendBadge: document.getElementById('tab-ascend-badge'),
  panelAscend: document.getElementById('panel-ascend'),
  ascendRunMeat: document.getElementById('ascend-run-meat'),
  ascendWyrmStatus: document.getElementById('ascend-wyrm-status'),
  ascendTotalCount: document.getElementById('ascend-total-count'),
  ascendPendingStones: document.getElementById('ascend-pending-stones'),
  ascendReqNote: document.getElementById('ascend-req-note'),
  btnTriggerAscend: document.getElementById('btn-trigger-ascend'),
  expansionsContainer: document.getElementById('expansions-container'),
  perkAvailableStones: document.getElementById('perk-available-stones'),
  ascensionPerksContainer: document.getElementById('ascension-perks-container'),
  ascendModal: document.getElementById('ascend-modal'),
  modalAscendStones: document.getElementById('modal-ascend-stones'),
  btnCancelAscend: document.getElementById('btn-cancel-ascend'),
  btnConfirmAscend: document.getElementById('btn-confirm-ascend'),

  // Expansion I: Fishing Dock
  tabBtnFish: document.getElementById('tab-btn-fish'),
  tabFishBadge: document.getElementById('tab-fish-badge'),
  panelFish: document.getElementById('panel-fish'),

  // Primal Totem
  tabBtnTotem: document.getElementById('tab-btn-totem'),
  tabTotemBadge: document.getElementById('tab-totem-badge'),
  panelTotem: document.getElementById('panel-totem')
};

/**
 * The Forge stays open once excavated, even after an Ascension untames the Boar-Hawk,
 * so retained hybrids and the nest remain reachable.
 */
function isForgeTabAvailable() {
  return !!gameState.tamedBeasts['boar_hawk'] || !!gameState.forgeUnlocked;
}

/**
 * Tab Navigation
 */
function switchTab(tabId) {
  if (tabId === 'forge' && !isForgeTabAvailable()) {
    showToast('Beast Forge unlocks after taming the ' + BEAST_CATALOG[1].name + '!', 'warning');
    return;
  }
  if (tabId === 'ascend' && !isAscensionUnlocked()) {
    showToast('Ascension Altar unlocks after taming the Tier 4 ' + BEAST_CATALOG[3].name + '!', 'warning');
    return;
  }

  if (tabId === 'totem' && !isTotemUnlocked()) {
    showToast('The Primal Totem rises after you tame the ' + BEAST_CATALOG[3].name + '.', 'warning');
    return;
  }
  if (tabId === 'legacy' && !isLegacyUnlocked()) {
    showToast("Hunter's Legacy opens when you break Seal 1 on the Primal Totem.", 'warning');
    return;
  }
  if (tabId === 'fish' && !isFishingUnlocked()) {
    showToast('The Fishing Dock is a Realm Expansion. Unlock it at the Ascension Altar!', 'warning');
    return;
  }

  gameState.activeTab = tabId;

  const tabs = [
    { id: 'camp', btn: elements.tabBtnCamp, panel: elements.panelCamp },
    { id: 'hunt', btn: elements.tabBtnHunt, panel: elements.panelHunt },
    { id: 'forge', btn: elements.tabBtnForge, panel: elements.panelForge },
    { id: 'relics', btn: elements.tabBtnRelics, panel: elements.panelRelics },
    { id: 'fish', btn: elements.tabBtnFish, panel: elements.panelFish },
    { id: 'totem', btn: elements.tabBtnTotem, panel: elements.panelTotem },
    { id: 'legacy', btn: document.getElementById('tab-btn-legacy'), panel: document.getElementById('panel-legacy') },
    { id: 'ascend', btn: elements.tabBtnAscend, panel: elements.panelAscend },
    { id: 'world', btn: document.getElementById('tab-btn-world'), panel: document.getElementById('panel-world') }
  ];

  tabs.forEach(t => {
    if (!t.btn || !t.panel) return;
    if (t.id === tabId) {
      t.btn.classList.add('active');
      t.panel.classList.remove('hidden');
    } else {
      t.btn.classList.remove('active');
      t.panel.classList.add('hidden');
    }
  });

  if (tabId === 'forge') {
    renderForge();
  }
  if (tabId === 'ascend') {
    renderAscensionAltar();
  }
  if (tabId === 'fish') {
    renderFishingDock();
  }
  if (tabId === 'totem') {
    renderTotemStatic();
  }
  if (tabId === 'legacy') {
    renderLegacyPanel();
  }
  if (tabId === 'world' && typeof renderWorldTab === 'function') {
    worldSignature = '';
    renderWorldTab();
  }
}

/**
 * ================= PHASE 3: ASCENSION ALTAR =================
 */
function buyAscensionPerk(perkId) {
  const perk = ASCENSION_PERKS.find(p => p.id === perkId);
  if (!perk) return;
  const lvl = getAscensionPerkLevel(perk.id);
  if (perk.maxLevel !== null && lvl >= perk.maxLevel) return;
  const cost = getAscensionPerkCost(perk);
  if (gameState.bloodstones < cost) return;

  gameState.bloodstones -= cost;
  if (!gameState.ascensionPerks) gameState.ascensionPerks = {};
  gameState.ascensionPerks[perk.id] = lvl + 1;
  sound.playBuy();
  showToast(perk.name + ' rank ' + (lvl + 1) + ' awakened!', 'success');
  logCombatMessage('🩸 <strong>' + perk.name + '</strong> blessing deepened to Rank ' + (lvl + 1) + '.', 'unlock');

  // Perks touch stamina, gestation, costs and power, so refresh the views they feed.
  gameState.stamina = Math.min(gameState.stamina, getMaxStamina());
  renderAscensionAltar();
  renderGeneratorsLadder();
  if (gameState.activeTab === 'forge') renderForge();
  saveGameToStorage();
}

function buyAscensionExpansion(expId) {
  const exp = ASCENSION_EXPANSIONS.find(e => e.id === expId);
  if (!exp) return;
  if (!gameState.unlockedExpansions) gameState.unlockedExpansions = {};
  if (gameState.unlockedExpansions[exp.id]) return;
  if (exp.comingSoon) return;
  if (gameState.ascensionCount < exp.reqAscensions) return;
  if (gameState.bloodstones < exp.cost) return;

  gameState.bloodstones -= exp.cost;
  gameState.unlockedExpansions[exp.id] = true;
  if (exp.id === 'primal_fishing') {
    if (!gameState.fishing) gameState.fishing = defaultFishingState();
    renderFishingDock();
  }
  sound.playWin();
  showToast('Realm Expansion unlocked: ' + exp.name + '!', 'success', true);
  logCombatMessage('🧭 <strong>REALM EXPANSION UNLOCKED:</strong> ' + exp.name + '!', 'unlock');
  renderAscensionAltar();
  saveGameToStorage();
}

/** Full rebuild of the Altar panel (cards + stats). Safe to call from anywhere. */
function renderAscensionAltar() {
  if (!elements.panelAscend) return;

  // Perk cards
  if (elements.ascensionPerksContainer) {
    elements.ascensionPerksContainer.innerHTML = '';
    ASCENSION_PERKS.forEach(perk => {
      const lvl = getAscensionPerkLevel(perk.id);
      const isMaxed = perk.maxLevel !== null && lvl >= perk.maxLevel;
      const cost = getAscensionPerkCost(perk);
      const rankText = perk.maxLevel !== null ? ('Rank ' + lvl + ' / ' + perk.maxLevel) : ('Rank ' + lvl);

      const card = document.createElement('div');
      card.className = 'p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all ' +
        (isMaxed ? 'bg-rose-950/30 border-rose-500/60' : (lvl > 0 ? 'bg-primal-800/90 border-rose-800/60' : 'bg-primal-800/90 border-primal-700 hover:border-rose-600/50'));
      card.innerHTML =
        '<div class="flex items-start gap-3">' +
          '<div class="w-10 h-10 shrink-0 rounded-lg bg-rose-950/80 border border-rose-700/60 flex items-center justify-center text-rose-400">' +
            '<i class="fa-solid ' + perk.icon + '"></i>' +
          '</div>' +
          '<div class="min-w-0">' +
            '<div class="font-cinzel font-bold text-sm text-slate-100">' + perk.name + '</div>' +
            '<div class="text-[11px] font-mono text-rose-300">' + rankText + '</div>' +
            '<p class="text-[11px] text-slate-400 mt-1 leading-snug">' + perk.desc + '</p>' +
          '</div>' +
        '</div>' +
        (isMaxed
          ? '<div class="text-center text-[11px] font-mono font-bold text-rose-300 py-1.5 border border-rose-700/50 rounded-lg bg-rose-950/40">MAX RANK</div>'
          : '<button data-perk-id="' + perk.id + '" data-cost="' + cost + '" class="btn-buy-perk w-full py-1.5 px-3 bg-rose-800 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[11px] font-semibold rounded-lg font-mono flex items-center justify-center gap-1.5 cursor-pointer"' +
              (gameState.bloodstones >= cost ? '' : ' disabled') + '>' +
              '<span>Awaken</span><i class="fa-solid fa-gem text-rose-300"></i><span class="font-bold">' + formatNumber(cost) + '</span>' +
            '</button>');
      elements.ascensionPerksContainer.appendChild(card);
    });
  }

  // Expansion cards
  if (elements.expansionsContainer) {
    elements.expansionsContainer.innerHTML = '';
    ASCENSION_EXPANSIONS.forEach(exp => {
      const owned = !!(gameState.unlockedExpansions && gameState.unlockedExpansions[exp.id]);
      const meetsReq = gameState.ascensionCount >= exp.reqAscensions;

      let footer;
      if (owned) {
        footer = exp.id === 'primal_fishing'
          ? '<button class="btn-open-fishing w-full py-2 px-3 bg-cyan-800 hover:bg-cyan-700 text-white text-xs font-semibold rounded-lg font-mono flex items-center justify-center gap-1.5 cursor-pointer"><i class="fa-solid fa-fish-fins"></i><span>UNLOCKED · Open Fishing Dock</span></button>'
          : '<div class="text-center text-[11px] font-mono font-bold text-cyan-300 py-1.5 border border-cyan-700/50 rounded-lg bg-cyan-950/40">UNLOCKED · Content coming soon</div>';
      } else if (exp.comingSoon) {
        footer = '<div class="text-center text-[11px] font-mono text-slate-400 py-1.5 border border-dashed border-slate-700 rounded-lg"><i class="fa-solid fa-hourglass-half mr-1"></i>Coming in a future update</div>';
      } else if (!meetsReq) {
        footer = '<div class="text-center text-[11px] font-mono text-slate-400 py-1.5 border border-slate-700 rounded-lg">' +
          '<i class="fa-solid fa-lock mr-1"></i>Requires ' + exp.reqAscensions + ' Ascension' + (exp.reqAscensions === 1 ? '' : 's') +
          ' (' + gameState.ascensionCount + '/' + exp.reqAscensions + ')</div>';
      } else {
        footer = '<button data-exp-id="' + exp.id + '" data-cost="' + exp.cost + '" class="btn-buy-expansion w-full py-2 px-3 bg-cyan-800 hover:bg-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg font-mono flex items-center justify-center gap-1.5 cursor-pointer"' +
          (gameState.bloodstones >= exp.cost ? '' : ' disabled') + '>' +
          '<span>Unlock Expansion</span><i class="fa-solid fa-gem text-rose-300"></i><span class="font-bold">' + formatNumber(exp.cost) + '</span>' +
        '</button>';
      }

      const card = document.createElement('div');
      card.className = 'p-4 rounded-xl border flex flex-col justify-between gap-3 ' +
        (owned ? 'bg-cyan-950/20 border-cyan-600/60' : 'bg-primal-800/90 border-primal-700');
      card.innerHTML =
        '<div class="flex items-start gap-3">' +
          '<div class="w-11 h-11 shrink-0 rounded-lg bg-cyan-950/80 border border-cyan-700/60 flex items-center justify-center text-cyan-300 text-lg">' +
            '<i class="fa-solid ' + exp.icon + '"></i>' +
          '</div>' +
          '<div class="min-w-0">' +
            '<div class="text-[10px] font-mono uppercase tracking-wider text-cyan-400">' + exp.badge + '</div>' +
            '<div class="font-cinzel font-bold text-sm text-slate-100">' + exp.name + '</div>' +
            '<p class="text-[11px] text-slate-400 mt-1 leading-snug">' + exp.desc + '</p>' +
          '</div>' +
        '</div>' + footer;
      elements.expansionsContainer.appendChild(card);
    });
  }

  updateAscensionLiveElements(true);
}

/** Cheap per-frame text/disabled updates for the Altar, HUD stones and tab badge. */
function updateAscensionLiveElements(force = false) {
  if (elements.hudBloodstones) elements.hudBloodstones.textContent = formatNumber(gameState.bloodstones);
  if (elements.hudAscensionCount) elements.hudAscensionCount.textContent = '(Asc: ' + gameState.ascensionCount + ')';

  const unlocked = isAscensionUnlocked();
  const ready = canAscendNow();
  if (elements.tabBtnAscend && elements.tabAscendBadge) {
    if (unlocked) {
      elements.tabBtnAscend.classList.remove('disabled');
      elements.tabBtnAscend.classList.add('cursor-pointer');
      if (ready) {
        elements.tabAscendBadge.textContent = 'Ready';
        elements.tabAscendBadge.className = 'text-[9px] bg-rose-950 text-rose-300 border border-rose-500 px-1.5 py-0.2 rounded font-mono font-bold animate-pulse';
      } else {
        elements.tabAscendBadge.textContent = 'Asc ' + gameState.ascensionCount;
        elements.tabAscendBadge.className = 'text-[9px] bg-rose-950/60 text-rose-300/80 border border-rose-800 px-1.5 py-0.2 rounded font-mono';
      }
    } else {
      elements.tabBtnAscend.classList.add('disabled');
      elements.tabBtnAscend.classList.remove('cursor-pointer');
      elements.tabAscendBadge.textContent = 'Locked';
      elements.tabAscendBadge.className = 'text-[9px] bg-primal-800 text-slate-500 border border-slate-700 px-1.5 py-0.2 rounded font-mono';
    }
  }

  if (!force && gameState.activeTab !== 'ascend') return;

  const wyrmTamed = !!gameState.tamedBeasts['chimera_wyrm'];
  const pending = calculatePendingBloodstones();

  if (elements.ascendRunMeat) elements.ascendRunMeat.textContent = formatNumber(gameState.runMeatEarned);
  if (elements.ascendTotalCount) elements.ascendTotalCount.textContent = gameState.ascensionCount;
  if (elements.ascendPendingStones) elements.ascendPendingStones.textContent = formatNumber(pending);
  if (elements.perkAvailableStones) elements.perkAvailableStones.textContent = formatNumber(gameState.bloodstones);
  if (elements.ascendWyrmStatus) {
    elements.ascendWyrmStatus.textContent = wyrmTamed ? 'Tamed' : 'Untamed';
    elements.ascendWyrmStatus.className = wyrmTamed ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold';
  }
  if (elements.ascendReqNote) {
    if (!wyrmTamed) {
      elements.ascendReqNote.textContent = 'Requires taming Tier 4 ' + BEAST_CATALOG[3].name + ' on this run';
      elements.ascendReqNote.className = 'text-[11px] text-amber-400 font-mono';
    } else if (gameState.isBattling) {
      elements.ascendReqNote.textContent = 'Finish the current battle first';
      elements.ascendReqNote.className = 'text-[11px] text-amber-400 font-mono';
    } else {
      const mult = getApexStoneMult();
      const nextGain = Math.max(0, Math.floor(pending * (mult + APEX_CONFIG.stonesPerTier) / mult) - pending);
      elements.ascendReqNote.textContent = 'Ritual ready. Apex tamed this run: ' + getApexDepth() + ' (x' + mult.toFixed(2) + ' Bloodstones). Taming the next Apex adds about +' + formatNumber(nextGain) + '.';
      elements.ascendReqNote.className = 'text-[11px] text-emerald-400 font-mono';
    }
  }
  if (elements.btnTriggerAscend) elements.btnTriggerAscend.disabled = !ready;

  if (elements.ascensionPerksContainer) {
    elements.ascensionPerksContainer.querySelectorAll('.btn-buy-perk').forEach(btn => {
      btn.disabled = gameState.bloodstones < Number(btn.dataset.cost);
    });
  }
  if (elements.expansionsContainer) {
    elements.expansionsContainer.querySelectorAll('.btn-buy-expansion').forEach(btn => {
      btn.disabled = gameState.bloodstones < Number(btn.dataset.cost);
    });
  }
}

/**
 * Nursery Leveling Action
 */
window.nurtureParent = function(rawBeastId) {
  if (!rawBeastId) return;
  const beastId = rawBeastId.replace(/-/g, '_');

  if (!gameState.tamedBeasts[beastId]) {
    showToast('You must tame this beast before nurturing it!', 'warning');
    return;
  }

  const currentLvl = getParentLevel(beastId);
  if (isParentMaxed(beastId)) { showToast('Already at the max Nursery level (' + NURSERY_MAX_LEVEL + ').', 'info'); return; }
  const cost = getParentLevelCost(beastId);

  if (gameState.meat < cost) {
    showToast('Not enough Meat! Requires ' + formatNumber(cost) + ' Meat.', 'warning');
    return;
  }

  sound.playBuy();
  gameState.meat -= cost;

  if (!gameState.parentLevels) gameState.parentLevels = {};
  gameState.parentLevels[beastId] = currentLvl + 1;
  const newLvl = gameState.parentLevels[beastId];

  const beastObj = BEAST_CATALOG.find(b => b.id === beastId);
  const beastName = beastObj ? beastObj.name : beastId;

  logCombatMessage(
    '🌿 Nurtured <strong>' + beastName + '</strong> to Level ' + newLvl + '! Beast Power & passives upgraded.',
    'unlock'
  );
  showToast(beastName + ' upgraded to Level ' + newLvl + '!', 'success');

  HYBRID_CATALOG.forEach(hybrid => {
    if (hybrid.parent1 === beastId || hybrid.parent2 === beastId) {
      const p1Lvl = getParentLevel(hybrid.parent1);
      const p2Lvl = getParentLevel(hybrid.parent2);
      const isHatched = getHybridLevel(hybrid.id) > 0;
      const isIncubating = gameState.incubator && gameState.incubator.hybridId === hybrid.id;

      if (p1Lvl >= 5 && p2Lvl >= 5 && !isHatched && !isIncubating) {
        logCombatMessage(
          '🧬 <strong>BREEDING UNLOCKED!</strong> Both parents reached Level 5. You can now brew treats for <strong>' + hybrid.name + '</strong>!',
          'relic'
        );
        showToast('Breeding unlocked for ' + hybrid.name + '!', 'success', true);
      }
    }
  });

  renderForge();
  renderMenagerie();
  saveGameToStorage();
};

/**
 * Beast Forge Renderer
 */
/**
 * ================= FORGE: per-level numbers =================
 * Shows what each Nursery / Hybrid level gives now and what the next level adds.
 */
function fmtPct(x) { return (Math.round(x * 10) / 10) + '%'; }
function fmtSec(x) { return (Math.round(x * 100) / 100) + 's'; }

/** Passive effect of a tamed parent at a given level */
function getParentPassiveAt(id, lvl) {
  switch (id) {
    case 'viper_hound': return '+' + fmtPct(lvl * 10) + ' base click Meat';
    case 'boar_hawk': return '+' + fmtPct(lvl * BOAR_REGEN_PER_LEVEL * 100) + ' Stamina regen speed';
    case 'grizzly_scorpion': return 'Wounds heal ' + fmtPct(lvl * GRIZZLY_WOUND_PER_LEVEL * 100) + ' faster';
    case 'chimera_wyrm': return '+' + fmtPct(lvl * 10) + ' Meat/sec';
  }
  return '';
}

/** Passive effect of a hybrid at a given level */
/** Explains when a parent's passive stops helping (Boar-Hawk 3s interval floor, Grizzly-Scorpion 5s wound floor) */
function getParentFloorNote(id, lvl) {
  return ''; // stamina and wound bonuses no longer have floors
  if (id === 'boar_hawk') {
    const base = Math.max(CAMP_RECOVERY_FLOOR_SEC, gameState.staminaIntervalSec - gameState.campRecoveryLevel * CAMP_RECOVERY_PER_RANK);
    const capLvl = Math.ceil((base - 3) / 0.25 - 1e-9);
    return lvl >= capLvl
      ? 'Floor reached: this passive can\'t push the interval below 3s. More levels only add Beast Power.'
      : 'Floor: this passive stops at a 3s interval (Lvl ' + capLvl + ' with your camp ranks).';
  }
  if (id === 'grizzly_scorpion') {
    const atFloor = BEAST_CATALOG.filter(b => (b.woundedSec || 30) - lvl * 2 <= 5).map(b => b.name);
    return 'Floor: wounds can\'t drop below 5s from this passive' + (atFloor.length ? ' (already reached vs ' + atFloor.join(', ') + ').' : '.');
  }
  return '';
}

function getHybridPassiveAt(id, lvl) {
  switch (id) {
    case 'viperhawk': return '+' + fmtPct(lvl * 15) + ' base click Meat, +' + fmtPct(lvl * 5) + ' Stamina regen';
    case 'venompincer': return '+' + fmtPct(lvl * 2) + ' crit chance, ' + (Math.round(5 * (1 + 0.15 * lvl) * 100) / 100) + 'x crit multi';
    case 'tuskpion': return 'Sparring costs 3 Stamina, ' + fmtPct(Math.min(100, 20 + lvl * 10)) + ' Breakthrough chance';
    case 'viperwyrm': return 'Clicks add ' + fmtPct(lvl) + ' of banked Meat (up to ' + (2 * lvl) + 'x the click)';
    case 'gryphowyrm': return '+' + fmtPct(lvl * 15) + ' Meat/sec';
    case 'scorpiodrake': return 'Sparring gives +5% per level (not 2%), +' + fmtPct(lvl * 25) + ' Meat/sec';
  }
  return '';
}

/** Combat Power gained if fn() is applied (fn must be undone by undo()) */
function combatPowerDelta(apply, undo) {
  const before = getTotalCombatPower();
  apply();
  const after = getTotalCombatPower();
  undo();
  return after - before;
}

function getBeastName(id) {
  const b = BEAST_CATALOG.find(x => x.id === id);
  return b ? b.name : id;
}

function forgeStatsHtml(nowPower, nextPower, combatGain, passiveNow, passiveNext, lvl, note) {
  return '<div class="mt-1.5 grid grid-cols-1 gap-0.5 text-[11px] font-mono">' +
    '<div class="text-slate-300">Beast Power: <span class="text-white font-bold">' + formatNumber(nowPower) + '</span>' +
      ' <span class="text-slate-500">&rarr;</span> <span class="text-emerald-300 font-bold">' + formatNumber(nextPower) + '</span>' +
      ' <span class="text-emerald-400">(+' + formatNumber(Math.max(0, combatGain)) + ' Combat Power)</span></div>' +
    '<div class="text-slate-300">Lvl ' + lvl + ': <span class="text-emerald-300">' + passiveNow + '</span></div>' +
    '<div class="text-slate-500">Lvl ' + (lvl + 1) + ': ' + passiveNext + '</div>' +
    (note ? '<div class="text-sky-300">' + note + '</div>' : '') +
  '</div>';
}

function renderForge() {
  if (!isForgeTabAvailable()) {
    elements.forgeLockedView.classList.remove('hidden');
    elements.forgeExcavateView.classList.add('hidden');
    elements.forgeUnlockedView.classList.add('hidden');
    return;
  }

  if (!gameState.forgeUnlocked) {
    elements.forgeLockedView.classList.add('hidden');
    elements.forgeExcavateView.classList.remove('hidden');
    elements.forgeUnlockedView.classList.add('hidden');
    elements.btnUnlockForge.innerHTML =
      '<i class="fa-solid fa-fire-flame-curved text-amber-300"></i>' +
      '<span>Excavate Beast Forge</span>' +
      '<span class="bg-black/30 px-2.5 py-1 rounded-md text-amber-200 font-mono text-xs flex items-center gap-1 font-semibold">' +
      '<i class="fa-solid fa-drumstick-bite text-amber-400 text-[11px]"></i> ' + formatNumber(FORGE_EXCAVATE_COST) + ' Meat' +
      '</span>';
    elements.btnUnlockForge.disabled = gameState.meat < FORGE_EXCAVATE_COST;
    return;
  }

  elements.forgeLockedView.classList.add('hidden');
  elements.forgeExcavateView.classList.add('hidden');
  elements.forgeUnlockedView.classList.remove('hidden');

  // 1. Render Nursery
  elements.nurseryContainer.innerHTML = '';

  PARENT_DEFINITIONS.forEach(parent => {
    const isTamed = !!gameState.tamedBeasts[parent.id];
    const lvl = getParentLevel(parent.id);
    const cost = getParentLevelCost(parent.id);
    const canAfford = gameState.meat >= cost;
    const isBreedingReady = lvl >= 5;

    const row = document.createElement('div');
    if (isTamed) {
      const readyClass = isBreedingReady
        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
        : 'bg-primal-900 text-slate-400 border border-primal-700';
      const readyLabel = isBreedingReady
        ? 'Breeding Ready (Lvl 5+)'
        : 'Need Lvl 5 (' + lvl + '/5)';
      const disabledAttr = canAfford ? '' : 'disabled';
      const beastDef = BEAST_CATALOG.find(b => b.id === parent.id);
      const rawAt = l => Math.floor((beastDef ? beastDef.rewardPower : 0) * (1 + (l - 1) * 0.15));
      const bpMult = getBeastMasteryMultiplier() * getLegacyMult('beast_bond');
      const cpGain = combatPowerDelta(() => { gameState.parentLevels[parent.id] = lvl + 1; }, () => { gameState.parentLevels[parent.id] = lvl; });
      const pMaxed = isParentMaxed(parent.id);
      const parentStats = pMaxed
        ? '<div class="mt-1.5 text-[11px] font-mono"><div class="text-slate-300">Beast Power: <span class="text-white font-bold">' + formatNumber(rawAt(lvl) * bpMult) + '</span></div>' +
          '<div class="text-emerald-300">Lvl ' + lvl + ': ' + getParentPassiveAt(parent.id, lvl) + '</div><div class="text-amber-300 font-bold">Max level reached</div></div>'
        : forgeStatsHtml(rawAt(lvl) * bpMult, rawAt(lvl + 1) * bpMult, cpGain,
        getParentPassiveAt(parent.id, lvl), getParentPassiveAt(parent.id, lvl + 1), lvl, getParentFloorNote(parent.id, lvl));

      row.className = 'bg-primal-800/80 border border-primal-700 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3';
      row.innerHTML =
        '<div class="flex items-center space-x-3">' +
          '<div class="w-10 h-10 rounded-lg bg-stone-900 border border-purple-500/40 flex items-center justify-center text-purple-400 text-lg shadow-inner">' +
            '<i class="fa-solid ' + parent.icon + '"></i>' +
          '</div>' +
          '<div>' +
            '<div class="flex items-center gap-2">' +
              '<span class="font-bold text-slate-100 text-sm">' + parent.name + '</span>' +
              '<span class="text-xs bg-purple-950 text-purple-300 border border-purple-700/60 font-mono px-2 py-0.2 rounded-full font-bold">Lvl ' + lvl + '/' + NURSERY_MAX_LEVEL + '</span>' +
              '<span class="text-[10px] font-mono px-1.5 py-0.2 rounded ' + readyClass + '">' + readyLabel + '</span>' +
            '</div>' +
            '<div class="text-[11px] text-slate-400 mt-0.5">' + parent.passive.split(' (')[0] + '</div>' +
            parentStats +
          '</div>' +
        '</div>' +
        (pMaxed ? '<div class="w-full sm:w-auto px-3.5 py-2 text-xs font-mono font-bold text-amber-300 border border-amber-600/60 bg-amber-950/40 rounded-lg text-center">MAX Lvl ' + NURSERY_MAX_LEVEL + '</div>' :
        '<button data-beast-id="' + parent.id + '" data-parent-id="' + parent.id + '" class="nurture-btn btn-level-parent w-full sm:w-auto px-3.5 py-2 bg-gradient-to-r from-purple-800 to-purple-700 hover:from-purple-700 hover:to-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg border border-purple-500/50 flex items-center justify-center gap-2 font-mono cursor-pointer" ' + disabledAttr + '>' +
          '<span>Nurture (Lvl ' + (lvl + 1) + ')</span>' +
          '<span class="text-amber-300 flex items-center gap-1 font-bold">' +
            '<i class="fa-solid fa-drumstick-bite text-[11px]"></i> ' + formatNumber(cost) +
          '</span>' +
        '</button>');
    } else {
      row.className = 'bg-primal-800/40 border border-dashed border-primal-700/60 rounded-xl p-3 flex items-center justify-between opacity-50 grayscale';
      row.innerHTML =
        '<div class="flex items-center space-x-3">' +
          '<div class="w-10 h-10 rounded-lg bg-primal-900 border border-slate-700 flex items-center justify-center text-slate-600">' +
            '<i class="fa-solid fa-lock"></i>' +
          '</div>' +
          '<div>' +
            '<span class="font-bold text-slate-400 text-sm">' + parent.name + '</span>' +
            '<p class="text-[11px] text-amber-500 font-mono mt-0.5">Untamed (Defeat in Hunt zone first)</p>' +
          '</div>' +
        '</div>' +
        '<span class="text-xs bg-primal-900 text-slate-500 px-3 py-1 rounded border border-primal-800 font-mono">Locked</span>';
    }
    elements.nurseryContainer.appendChild(row);
  });

  // 2. Render Incubator Card
  if (gameState.incubator) {
    const hybrid = HYBRID_CATALOG.find(h => h.id === gameState.incubator.hybridId);
    const hybridName = hybrid ? hybrid.name : 'Chimera Egg';
    const total = gameState.incubator.totalDuration;
    const rem = Math.max(0, gameState.incubator.remaining);
    const pct = Math.min(100, Math.max(0, ((total - rem) / total) * 100));
    const tendDisabled = gameState.stamina >= 2 ? '' : 'disabled';

    elements.incubatorCard.innerHTML =
      '<div class="flex items-center justify-center space-x-2 text-purple-300 font-cinzel font-bold text-base mb-1">' +
        '<i class="fa-solid fa-dna animate-spin text-amber-400"></i>' +
        '<span>Incubating: ' + hybridName + '</span>' +
      '</div>' +
      '<div class="text-xs text-slate-400 font-mono mb-3">' +
        'Gestation Remaining: <span id="incubator-time-remaining" class="text-amber-400 font-bold">' + rem.toFixed(1) + 's</span> / ' + total + 's' +
      '</div>' +
      '<div class="w-full bg-primal-950 h-3 rounded-full overflow-hidden p-0.5 border border-purple-700/60 mb-4">' +
        '<div id="incubator-progress-fill" class="h-full bg-gradient-to-r from-purple-600 via-amber-500 to-emerald-400 rounded-full transition-all duration-150" style="width: ' + pct + '%;"></div>' +
      '</div>' +
      '<div class="flex flex-col sm:flex-row items-center justify-center gap-3">' +
        '<button id="btn-tend-nest" class="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-white text-xs font-semibold rounded-lg transition-all border border-amber-400/50 flex items-center justify-center gap-2 font-mono shadow-md cursor-pointer" ' + tendDisabled + '>' +
          '<i class="fa-solid fa-hand-holding-heart text-amber-300"></i>' +
          '<span>Tend Nest (-30s)</span>' +
          '<span class="text-blue-300 font-bold flex items-center gap-1 bg-black/30 px-1.5 py-0.2 rounded">' +
            '<i class="fa-solid fa-bolt-lightning text-[10px]"></i> 2 Stamina' +
          '</span>' +
        '</button>' +
        '<span class="text-[11px] text-slate-400 italic">Main Hunt clicks shave -1.0s each</span>' +
      '</div>';

    const btnTend = document.getElementById('btn-tend-nest');
    if (btnTend) {
      btnTend.addEventListener('click', () => {
        if (gameState.stamina >= 2 && gameState.incubator) {
          sound.playClick();
          gameState.stamina -= 2;
          gameState.incubator.remaining = Math.max(0, gameState.incubator.remaining - 30);
          if (!checkIncubatorHatch()) {
            renderForge();
          }
        }
      });
    }
  } else {
    elements.incubatorCard.innerHTML =
      '<div class="py-4 text-center">' +
        '<div class="w-12 h-12 rounded-full bg-purple-950/60 border border-purple-800 mx-auto flex items-center justify-center text-purple-400 text-xl mb-2">' +
          '<i class="fa-solid fa-egg"></i>' +
        '</div>' +
        '<div class="text-sm font-semibold text-slate-300">Incubator Empty</div>' +
        '<p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">' +
          'Select a pairing below and brew a specialized Breeding Treat to start incubation.' +
        '</p>' +
      '</div>';
  }

  // 3. Render Chimera Synthesizer
  elements.synthesizerContainer.innerHTML = '';
  let hatchedCount = 0;

  HYBRID_CATALOG.forEach(hybrid => {
    const p1Tamed = !!gameState.tamedBeasts[hybrid.parent1];
    const p2Tamed = !!gameState.tamedBeasts[hybrid.parent2];
    const p1Lvl = getParentLevel(hybrid.parent1);
    const p2Lvl = getParentLevel(hybrid.parent2);
    const meetsBreedingReq = p1Tamed && p2Tamed && p1Lvl >= 5 && p2Lvl >= 5;

    const hLvl = getHybridLevel(hybrid.id);
    const isHatched = hLvl > 0;
    const isIncubating = gameState.incubator && gameState.incubator.hybridId === hybrid.id;
    const canAfford = gameState.meat >= hybrid.treatCost;
    if (isHatched) hatchedCount++;

    let stateBorderClass = 'bg-primal-900/60 border-dashed border-primal-800 opacity-60';
    if (isHatched) {
      stateBorderClass = 'bg-gradient-to-b from-purple-950/40 to-primal-850 border-purple-600/70 shadow-md';
    } else if (isIncubating) {
      stateBorderClass = 'bg-amber-950/30 border-amber-500/60 ring-1 ring-amber-500/40';
    } else if (meetsBreedingReq) {
      stateBorderClass = 'bg-primal-800/90 border-primal-700 hover:border-purple-500/50';
    }

    const card = document.createElement('div');
    card.className = 'p-4 rounded-xl border flex flex-col justify-between transition-all ' + stateBorderClass;

    let actionHtml = '';
    if (isHatched) {
      const enhanceCost = getHybridLevelCost(hybrid);
      const enhanceDisabled = gameState.meat >= enhanceCost ? '' : 'disabled';
      actionHtml =
        '<div class="mt-3 pt-3 border-t border-purple-800/50 flex items-center justify-between">' +
          '<span class="text-xs font-mono text-purple-300 font-bold">Hatched (Lvl ' + hLvl + ')</span>' +
          '<button data-hybrid-id="' + hybrid.id + '" class="btn-enhance-hybrid px-3 py-1.5 bg-purple-700 hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[11px] font-semibold rounded font-mono flex items-center gap-1.5 cursor-pointer" ' + enhanceDisabled + '>' +
            '<span>Enhance</span>' +
            '<span class="text-amber-300 font-bold">' + formatNumber(enhanceCost) + '</span>' +
          '</button>' +
        '</div>';
    } else if (isIncubating) {
      actionHtml =
        '<div class="mt-3 pt-3 border-t border-amber-800/50 text-center">' +
          '<span class="text-xs font-mono text-amber-300 font-bold animate-pulse">' +
            '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Incubating (<span class="synth-incubating-timer">' + gameState.incubator.remaining.toFixed(0) + '</span>s left)' +
          '</span>' +
        '</div>';
    } else if (meetsBreedingReq) {
      const incubatorBusy = !!gameState.incubator;
      const brewDisabled = (canAfford && !incubatorBusy) ? '' : 'disabled';
      const busyNote = incubatorBusy ? '<div class="text-[10px] text-amber-400 font-mono text-center">Incubator currently busy</div>' : '';
      actionHtml =
        '<div class="mt-3 pt-3 border-t border-primal-700 flex flex-col gap-2">' +
          '<button data-hybrid-id="' + hybrid.id + '" class="btn-brew-treat w-full py-2 bg-gradient-to-r from-purple-700 to-amber-600 hover:from-purple-600 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg font-mono flex items-center justify-center gap-2 cursor-pointer shadow-sm" ' + brewDisabled + '>' +
            '<i class="fa-solid fa-flask-vial"></i>' +
            '<span>Brew Treat &amp; Incubate</span>' +
            '<span class="text-amber-200 font-bold flex items-center gap-1">' +
              '<i class="fa-solid fa-drumstick-bite text-[10px]"></i> ' + formatNumber(hybrid.treatCost) +
            '</span>' +
          '</button>' +
          busyNote +
        '</div>';
    } else {
      actionHtml =
        '<div class="mt-3 pt-3 border-t border-primal-800 text-[11px] font-mono text-slate-500 text-center">' +
          'Requires: ' + getBeastName(hybrid.parent1) + ' Lvl ' + p1Lvl + '/5' + (p1Tamed ? '' : ' (not tamed)') + ' &amp; ' + getBeastName(hybrid.parent2) + ' Lvl ' + p2Lvl + '/5' + (p2Tamed ? '' : ' (not tamed)') +
        '</div>';
    }

    let hybridStats = '';
    if (isHatched) {
      const awake = isHybridAwake(hybrid);
      const rawAt = l => Math.floor(hybrid.basePower * (1 + (l - 1) * 0.20));
      const share = awake ? 1 : (hasLegacyCapstone('pack_alpha') ? LEGACY_CONFIG.packAlphaShare : 0);
      const bpMult = getBeastMasteryMultiplier() * getLegacyMult('beast_bond') * share;
      const cpGain = combatPowerDelta(() => { gameState.hybrids[hybrid.id].level = hLvl + 1; }, () => { gameState.hybrids[hybrid.id].level = hLvl; });
      const note = awake ? '' : 'Asleep: tame the ' + getBeastName(hybrid.parent1) + ' and ' + getBeastName(hybrid.parent2) + ' this run to wake it' +
        (share > 0 ? ' (Pack Alpha: 25% power now, no passives)' : '');
      hybridStats = forgeStatsHtml(rawAt(hLvl) * bpMult, rawAt(hLvl + 1) * bpMult, cpGain,
        getHybridPassiveAt(hybrid.id, hLvl) + (awake ? '' : ' (asleep)'), getHybridPassiveAt(hybrid.id, hLvl + 1), hLvl, note);
    }

    const pwrBadgeClass = isHatched
      ? 'bg-purple-900/80 text-purple-300 border border-purple-700'
      : 'bg-primal-900 text-slate-400 border border-primal-700';

    card.innerHTML =
      '<div>' +
        '<div class="flex items-center justify-between mb-2">' +
          '<div class="flex items-center space-x-2.5">' +
            '<div class="w-8 h-8 rounded-lg bg-purple-950 border border-purple-700/60 flex items-center justify-center text-purple-400 text-sm">' +
              '<i class="fa-solid ' + hybrid.icon + '"></i>' +
            '</div>' +
            '<div>' +
              '<h4 class="font-bold text-slate-100 text-xs sm:text-sm">' + hybrid.name + '</h4>' +
              '<div class="text-[10px] text-slate-400 font-mono">Treat: ' + hybrid.treatName + ' (' + getEffectiveGestationSec(hybrid) + 's)</div>' +
            '</div>' +
          '</div>' +
          '<span class="text-[10px] font-mono px-2 py-0.5 rounded ' + pwrBadgeClass + '">' + (isHatched ? 'Lvl ' + hLvl : '+' + formatNumber(hybrid.basePower) + ' Pwr') + '</span>' +
        '</div>' +
        '<p class="text-[11px] text-slate-300 leading-relaxed mt-1">' + hybrid.desc + '</p>' +
        hybridStats +
      '</div>' +
      actionHtml;

    elements.synthesizerContainer.appendChild(card);
  });

  elements.forgeHatchedCount.textContent = hatchedCount + ' / 6 Hatched';

  // Bind brew treat
  elements.synthesizerContainer.querySelectorAll('.btn-brew-treat').forEach(btn => {
    btn.addEventListener('click', () => {
      const hId = btn.getAttribute('data-hybrid-id');
      const hybrid = HYBRID_CATALOG.find(h => h.id === hId);
      if (!hybrid || gameState.incubator || gameState.meat < hybrid.treatCost) return;

      sound.playBuy();
      gameState.meat -= hybrid.treatCost;
      const gestation = getEffectiveGestationSec(hybrid);
      gameState.incubator = {
        hybridId: hybrid.id,
        totalDuration: gestation,
        remaining: gestation
      };
      showToast('Brewed ' + hybrid.treatName + '! Incubation begun (' + gestation + 's).', 'success');
      logCombatMessage('🧬 Begun incubating <strong>' + hybrid.name + '</strong> egg with ' + hybrid.treatName + ' (' + gestation + 's gestation).', 'relic');
      renderForge();
      saveGameToStorage();
    });
  });

  // Bind enhance hybrid
  elements.synthesizerContainer.querySelectorAll('.btn-enhance-hybrid').forEach(btn => {
    btn.addEventListener('click', () => {
      const hId = btn.getAttribute('data-hybrid-id');
      const hybrid = HYBRID_CATALOG.find(h => h.id === hId);
      if (!hybrid) return;
      const cost = getHybridLevelCost(hybrid);
      if (gameState.meat >= cost) {
        sound.playBuy();
        gameState.meat -= cost;
        if (!gameState.hybrids) gameState.hybrids = {};
        if (!gameState.hybrids[hId]) gameState.hybrids[hId] = { level: 1 };
        gameState.hybrids[hId].level += 1;
        renderForge();
        renderMenagerie();
        saveGameToStorage();
      }
    });
  });
}

function updateForgeLiveElements() {
  if (gameState.activeTab !== 'forge') return;

  if (elements.btnUnlockForge && !elements.forgeExcavateView.classList.contains('hidden')) {
    elements.btnUnlockForge.disabled = gameState.meat < FORGE_EXCAVATE_COST;
  }

  elements.nurseryContainer.querySelectorAll('.nurture-btn, .btn-level-parent').forEach(btn => {
    const beastId = btn.dataset.beastId || btn.dataset.parentId;
    if (beastId) {
      const cost = getParentLevelCost(beastId);
      btn.disabled = gameState.meat < cost;
    }
  });

  if (gameState.incubator) {
    const total = gameState.incubator.totalDuration;
    const rem = Math.max(0, gameState.incubator.remaining);
    const pct = Math.min(100, Math.max(0, ((total - rem) / total) * 100));

    const timerEl = document.getElementById('incubator-time-remaining');
    if (timerEl) timerEl.textContent = rem.toFixed(1) + 's';

    const barEl = document.getElementById('incubator-progress-fill');
    if (barEl) barEl.style.width = pct + '%';

    const btnTend = document.getElementById('btn-tend-nest');
    if (btnTend) btnTend.disabled = gameState.stamina < 2;

    elements.synthesizerContainer.querySelectorAll('.synth-incubating-timer').forEach(el => {
      el.textContent = rem.toFixed(0);
    });
  }

  elements.synthesizerContainer.querySelectorAll('.btn-brew-treat').forEach(btn => {
    const hId = btn.getAttribute('data-hybrid-id');
    const hybrid = HYBRID_CATALOG.find(h => h.id === hId);
    if (hybrid) {
      btn.disabled = gameState.meat < hybrid.treatCost || !!gameState.incubator;
    }
  });

  elements.synthesizerContainer.querySelectorAll('.btn-enhance-hybrid').forEach(btn => {
    const hId = btn.getAttribute('data-hybrid-id');
    const hybrid = HYBRID_CATALOG.find(h => h.id === hId);
    if (hybrid) {
      const cost = getHybridLevelCost(hybrid);
      btn.disabled = gameState.meat < cost;
    }
  });
}

/**
 * Live 60FPS Frame Renderer
 */
function renderFrame(meatRate) {
  const hunterPower = getHunterPower();
  const beastPower = getTotalBeastPower();
  // Includes Fish Codex / Abyssal Fervor bonuses, same number the fights use
  const totalPower = getTotalCombatPower();
  const fishPowerMult = (hunterPower + beastPower) > 0 ? totalPower / (hunterPower + beastPower) : 1;
  const maxStamina = getMaxStamina();
  const regenInterval = getStaminaRegenInterval();

  // Header HUD
  elements.hudMeat.textContent = formatNumber(gameState.meat);
  elements.hudMeatRate.textContent = formatNumber(meatRate, meatRate < 100);

  elements.hudStaminaVal.textContent = Math.floor(gameState.stamina);
  elements.hudStaminaMax.textContent = maxStamina;
  const staminaPct = Math.min(100, (gameState.stamina / maxStamina) * 100);
  elements.hudStaminaBar.style.width = staminaPct + '%';
  elements.hudStaminaInterval.textContent = '+1 per ' + regenInterval.toFixed(1) + 's';

  if (gameState.inCooldown) {
    elements.hudStaminaLabel.textContent = 'Stamina (FROZEN)';
    elements.hudStaminaLabel.className = 'text-red-400 font-bold';
  } else {
    elements.hudStaminaLabel.textContent = 'Stamina';
    elements.hudStaminaLabel.className = '';
  }

  elements.hudTotalPower.textContent = formatNumber(totalPower);

  // Keep the Menagerie in sync with Beast Mastery, nursery levels and hybrids waking up
  if (beastPower !== lastMenageriePower) renderMenagerie();
  renderPowerBreakdown();
  elements.hudPowerSplit.textContent = '(Hunter: ' + formatNumber(hunterPower) + ' + Beasts: ' + formatNumber(beastPower) + ')' +
    (fishPowerMult > 1.0005 ? ' ×' + fishPowerMult.toFixed(2) + ' Bonuses' : '');

  // Buffs bar display (Adrenaline + Fishing meals)
  const anyMealBuff = updateFishBuffBadges();
  if (gameState.adrenalineFocusRemaining > 0) {
    elements.buffAdrenalineBadge.classList.remove('hidden');
    elements.buffAdrenalineTimer.textContent = Math.ceil(gameState.adrenalineFocusRemaining) + 's';
  } else {
    elements.buffAdrenalineBadge.classList.add('hidden');
  }
  elements.activeBuffsBar.classList.toggle('hidden', !(gameState.adrenalineFocusRemaining > 0 || anyMealBuff));

  // Expansion I: Fishing Dock live updates
  updateFishingLive();

  // Primal Totem live updates
  updateTotemLive();
  updateLegacyLive();
  updateTrophyLive();

  // Phase 3: Bloodstones HUD, Altar tab badge & live Altar stats
  updateAscensionLiveElements();

  // Beast Forge tab unlock indicator
  if (isForgeTabAvailable()) {
    elements.tabBtnForge.classList.remove('disabled');
    if (gameState.forgeUnlocked) {
      elements.tabForgeBadge.textContent = 'Active';
      elements.tabForgeBadge.className = 'text-[9px] bg-purple-950 text-purple-300 border border-purple-600 px-1.5 py-0.2 rounded font-mono font-bold';
    } else {
      elements.tabForgeBadge.textContent = 'Excavate';
      elements.tabForgeBadge.className = 'text-[9px] bg-amber-950 text-amber-300 border border-amber-600 px-1.5 py-0.2 rounded font-mono font-bold animate-pulse';
    }
  } else {
    elements.tabBtnForge.classList.add('disabled');
    elements.tabForgeBadge.textContent = 'Locked';
    elements.tabForgeBadge.className = 'text-[9px] bg-primal-800 text-slate-500 border border-slate-700 px-1.5 py-0.2 rounded font-mono';
  }

  const clickYield = getClickYield();
  elements.labelClickYield.textContent = formatNumber(clickYield);
  elements.btnForageText.textContent = 'FORAGE & HUNT (+' + formatNumber(clickYield) + ' Meat)';

  // Armory UI updates
  const equipped = getEquippedWeapon();
  const nextWeapon = WEAPONS_CATALOG[gameState.weaponTier];

  if (equipped) {
    elements.armoryTierBadge.textContent = 'Tier ' + equipped.tier + ': ' + equipped.name;
    elements.armoryEquippedName.textContent = equipped.name;
    const totalPct = ((equipped.percentBonus + (hasRelic('serpents_fang') ? 0.08 * getRelicEffectMultiplier('serpents_fang') : 0)) * 100).toFixed(1);
    elements.armoryEquippedBonus.textContent = '+' + formatNumber(equipped.flatBonus + 1) + ' flat, +' + totalPct + '% passive/click, +' + formatNumber(equipped.combatPower || 0) + ' Power';
  } else {
    elements.armoryTierBadge.textContent = 'Tier 0: Bare Hands';
    elements.armoryEquippedName.textContent = 'Flint Knife / Bare Hands';
    const fangPct = hasRelic('serpents_fang') ? (8 * getRelicEffectMultiplier('serpents_fang')).toFixed(1) : '0';
    elements.armoryEquippedBonus.textContent = '+1 flat, +' + fangPct + '% passive/click';
  }

  if (nextWeapon) {
    elements.armoryNextName.textContent = nextWeapon.name;
    elements.armoryNextBenefit.textContent = nextWeapon.desc;
    elements.armoryNextCost.textContent = formatNumber(nextWeapon.cost);
    elements.btnCraftWeapon.classList.remove('hidden');
    elements.btnCraftWeapon.disabled = gameState.meat < nextWeapon.cost;
  } else {
    elements.armoryNextName.textContent = 'Max Arsenal Reached';
    elements.armoryNextBenefit.textContent = WEAPONS_CATALOG[WEAPONS_CATALOG.length - 1].name + ' equipped!';
    elements.btnCraftWeapon.classList.add('hidden');
  }

  // Camp Enhancements
  const endCost = getCampEnduranceCost();
  const isEndMaxed = isCampEnduranceMaxed();
  elements.campEnduranceLvl.textContent = gameState.campEnduranceLevel + '/' + getCampEnduranceMaxLevel();
  elements.campEnduranceBonus.textContent = '+' + (gameState.campEnduranceLevel * 2) + ' Max';
  if (isEndMaxed) {
    elements.btnBuyEnduranceLabel.textContent = 'Maxed (+' + (gameState.campEnduranceLevel * CAMP_ENDURANCE_PER_RANK) + ' Max)';
    elements.btnBuyEnduranceCostWrap.classList.add('hidden');
    elements.btnBuyEndurance.disabled = true;
  } else {
    elements.campEnduranceCost.textContent = formatNumber(endCost);
    elements.btnBuyEnduranceLabel.textContent = 'Fortify';
    elements.btnBuyEnduranceCostWrap.classList.remove('hidden');
    elements.btnBuyEndurance.disabled = gameState.meat < endCost;
  }

  const recCost = getCampRecoveryCost();
  const isRecMaxed = isCampRecoveryMaxed();
  elements.campRecoveryLvl.textContent = gameState.campRecoveryLevel + '/' + getCampRecoveryMaxLevel();
  elements.campRecoveryInterval.textContent = regenInterval.toFixed(1) + 's';
  if (isRecMaxed) {
    elements.btnBuyRecoveryLabel.textContent = 'Maxed (-' + (gameState.campRecoveryLevel * CAMP_RECOVERY_PER_RANK).toFixed(2).replace(/\.?0+$/, '') + 's)';
    elements.btnBuyRecoveryCostWrap.classList.add('hidden');
    elements.btnBuyRecovery.disabled = true;
  } else {
    elements.campRecoveryCost.textContent = formatNumber(recCost);
    elements.btnBuyRecoveryLabel.textContent = 'Enhance';
    elements.btnBuyRecoveryCostWrap.classList.remove('hidden');
    elements.btnBuyRecovery.disabled = gameState.meat < recCost;
  }

  // Update button afford states in generator ladder
  elements.generatorsContainer.querySelectorAll('.btn-buy-gen').forEach(btn => {
    const genId = btn.getAttribute('data-gen-id');
    const gen = GENERATOR_LADDER.find(g => g.id === genId);
    if (gen) {
      btn.disabled = gameState.meat < getGeneratorBulk(gen).cost;
    }
  });

  // Disciplines
  const bruteCost = getBruteConditioningCost();
  elements.trainBruteLvl.textContent = gameState.bruteConditioningLevel;
  elements.trainBruteYield.textContent = '+' + getBrutePowerPerLevel();
  elements.trainBruteCost.textContent = formatNumber(bruteCost);
  elements.btnBuyBrute.disabled = gameState.meat < bruteCost;

  const masteryUnlocked = isBeastMasteryUnlocked();
  const masteryCost = getBeastMasteryCost();
  elements.trainMasteryLvl.textContent = gameState.beastMasteryLevel;
  if (masteryUnlocked) {
    elements.trainMasteryCard.classList.remove('opacity-50', 'grayscale', 'border-dashed');
    elements.trainMasteryDesc.innerHTML = 'Increases all Tamed Beast Power contributions by <span class="text-emerald-400 font-bold font-mono">+' + (gameState.beastMasteryLevel * 10) + '%</span>';
    elements.trainMasteryCostWrap.classList.remove('hidden');
    elements.trainMasteryCost.textContent = formatNumber(masteryCost);
    elements.btnBuyMasteryLabel.textContent = 'Attune';
    elements.btnBuyMastery.disabled = gameState.meat < masteryCost;
  } else {
    elements.trainMasteryCard.classList.add('opacity-50', 'grayscale', 'border-dashed');
    elements.trainMasteryDesc.innerHTML = '<span class="text-amber-400 font-medium"><i class="fa-solid fa-lock text-xs mr-1"></i>Locked: Tame your first beast to unlock</span>';
    elements.trainMasteryCostWrap.classList.add('hidden');
    elements.btnBuyMasteryLabel.textContent = 'Locked (Tame 1)';
    elements.btnBuyMastery.disabled = true;
  }

  const anatomyCost = getWeakpointAnatomyCost();
  const isAnatomyMaxed = gameState.weakpointAnatomyLevel >= ANATOMY_MAX_RANK;
  elements.trainAnatomyLvl.textContent = gameState.weakpointAnatomyLevel + '/' + ANATOMY_MAX_RANK;
  if (elements.trainAnatomyCurrent) elements.trainAnatomyCurrent.textContent = '-' + +(getWeakpointAnatomyReduction() * 100).toFixed(1) + '%';
  if (isAnatomyMaxed) {
    elements.btnBuyAnatomyLabel.textContent = 'Maxed (-' + +(getWeakpointAnatomyReduction() * 100).toFixed(1) + '%)';
    elements.trainAnatomyCostWrap.classList.add('hidden');
    elements.btnBuyAnatomy.disabled = true;
  } else {
    elements.trainAnatomyCost.textContent = formatNumber(anatomyCost);
    elements.btnBuyAnatomyLabel.textContent = 'Dissect';
    elements.trainAnatomyCostWrap.classList.remove('hidden');
    elements.btnBuyAnatomy.disabled = gameState.meat < anatomyCost;
  }

  // Sparring Active Ring
  const sparCost = getSparringCost();
  const sparStaminaCost = getSparringStaminaCost();
  const scorpiodrakeLvl = getActiveHybridLevel('scorpiodrake');
  const sparPct = gameState.sparringLevel * (scorpiodrakeLvl > 0 ? 5 : 2);
  elements.sparringLevel.textContent = gameState.sparringLevel;
  elements.sparringCostMeat.textContent = formatNumber(sparCost);
  elements.sparringTotalMultiplier.textContent = '+' + sparPct + '%';
  const sparStamEl = document.getElementById('sparring-cost-stamina');
  if (sparStamEl) sparStamEl.textContent = sparStaminaCost;
  const btPct = Math.round(getSparBreakthroughChance() * 100);
  const sparOddsEl = document.getElementById('sparring-odds');
  if (sparOddsEl) sparOddsEl.textContent = btPct + '% Breakthrough chance';
  const critEl = document.getElementById('forage-crit-info');
  if (critEl) {
    const cc = getCritChance();
    critEl.classList.toggle('hidden', cc <= 0);
    critEl.textContent = 'Crit: ' + Math.round(cc * 100) + '% chance · ' + (Math.round(getCritMultiplier() * 100) / 100) + 'x multi';
  }

  if (!gameState.isSparring) {
    elements.btnSparLabel.textContent = 'SPAR WITH PACK (LVL ' + gameState.sparringLevel + ')';
  }
  const canSpar = gameState.meat >= sparCost && gameState.stamina >= sparStaminaCost && !gameState.isSparring;
  elements.btnSpar.disabled = !canSpar;

  // Active Encounter Details
  const activeBeast = getSelectedFightTarget();
  const isGuardianFight = !!activeBeast.isGuardian;
  const isApexFight = !!activeBeast.isApex;
  const isTitanFight = !!activeBeast.isTitan;
  const isAlreadyTamed = !isGuardianFight && !isApexFight && !isTitanFight && !!gameState.tamedBeasts[activeBeast.id];
  const bracket = getEffectiveBossBracket(activeBeast);
  const effMin = bracket.min;
  const effMax = bracket.max;

  elements.encounterTierBadge.textContent = getFightTierLabel(activeBeast);
  elements.beastName.textContent = activeBeast.name;
  const fsEl = document.getElementById('beast-fight-stats');
  if (fsEl) {
    const st = (gameState.fightStats && gameState.fightStats[activeBeast.id]) || { trophyFights: 0, trophyWins: 0, relics: 0, tameTries: 0 };
    if (isApexFight) {
      fsEl.textContent = 'Apex this run: ' + getApexDepth() + ' tamed \u00b7 deepest ever: ' + (gameState.bestApexDepth ? 'Tier ' + (4 + gameState.bestApexDepth) : 'none yet') + ' \u00b7 attempts on this one: ' + st.tameTries;
    } else if (isTitanFight) {
      fsEl.textContent = 'Attempts on the Titan: ' + st.tameTries;
    } else if (isGuardianFight) {
      fsEl.textContent = 'Attempts on this Seal: ' + st.tameTries;
    } else if (isAlreadyTamed) {
      const pct = st.trophyFights > 0 ? Math.round(st.trophyWins / st.trophyFights * 100) : 0;
      fsEl.textContent = 'Trophy expeditions: ' + st.trophyFights + ' fights \u00b7 ' + st.trophyWins + ' wins (' + pct + '%) \u00b7 ' + st.relics + ' relic' + (st.relics === 1 ? '' : 's') + ' found';
    } else {
      fsEl.textContent = 'Taming attempts this run: ' + st.tameTries;
    }
  }
  const ascGrow = getBossAscensionMult(activeBeast);
  elements.beastDesc.textContent = activeBeast.desc + (ascGrow > 1 ? ' Strengthened x' + (Math.round(ascGrow * 100) / 100) + ' by your Ascensions.' : '');
  elements.beastPowerMin.textContent = formatNumber(effMin);
  elements.beastPowerMax.textContent = formatNumber(effMax);

  if (isApexFight) {
    elements.beastRewardPower.textContent = '+' + Math.round(APEX_CONFIG.powerPerTier * 100) + '% Power, +' + Math.round(APEX_CONFIG.stonesPerTier * 100) + '% Stones';
    elements.beastRewardPower.className = 'text-fuchsia-300 font-mono';
  } else if (isTitanFight) {
    elements.beastRewardPower.textContent = 'Opens the Rift';
    elements.beastRewardPower.className = 'text-amber-300 font-mono';
  } else if (isGuardianFight) {
    elements.beastRewardPower.textContent = 'Breaks Seal ' + activeBeast.sealNumber;
    elements.beastRewardPower.className = 'text-rose-300 font-mono';
  } else if (isAlreadyTamed) {
    elements.beastRewardPower.textContent = '0 (Relic Hunt)';
    elements.beastRewardPower.className = 'text-amber-400 font-mono';
  } else {
    elements.beastRewardPower.textContent = '+' + formatNumber(activeBeast.rewardPower) + ' Power';
    elements.beastRewardPower.className = 'text-emerald-400 font-mono';
  }

  if (elements.beastPortraitImg.dataset.beastId !== activeBeast.id) {
    elements.beastPortraitImg.dataset.beastId = activeBeast.id;
    elements.beastPortraitImg.alt = activeBeast.name + ' Portrait';
    elements.beastPortraitImg.onerror = () => {
      elements.beastPortraitImg.onerror = null;
      elements.beastPortraitImg.src = activeBeast.fallbackImage;
    };
    elements.beastPortraitImg.src = activeBeast.image;
  }
  elements.beastPortraitImg.style.filter = activeBeast.imageFilter || '';

  if (isApexFight) {
    elements.beastStatusRibbon.textContent = 'APEX LADDER';
    elements.beastStatusRibbon.className = 'absolute bottom-0 inset-x-0 bg-fuchsia-950/90 text-[10px] text-center font-mono py-0.5 text-fuchsia-300 border-t border-fuchsia-700/60 font-bold';
  } else if (isTitanFight) {
    elements.beastStatusRibbon.textContent = 'WORLD TITAN';
    elements.beastStatusRibbon.className = 'absolute bottom-0 inset-x-0 bg-amber-950/90 text-[10px] text-center font-mono py-0.5 text-amber-300 border-t border-amber-600/60 font-bold';
  } else if (isGuardianFight) {
    elements.beastStatusRibbon.textContent = 'TOTEM GUARDIAN';
    elements.beastStatusRibbon.className = 'absolute bottom-0 inset-x-0 bg-rose-950/90 text-[10px] text-center font-mono py-0.5 text-rose-300 border-t border-rose-700/60 font-bold';
  } else if (isAlreadyTamed) {
    elements.beastStatusRibbon.textContent = 'TAMED • TROPHY EXPEDITION';
    elements.beastStatusRibbon.className = 'absolute bottom-0 inset-x-0 bg-emerald-950/90 text-[10px] text-center font-mono py-0.5 text-emerald-300 border-t border-emerald-700/60 font-bold';
  } else {
    elements.beastStatusRibbon.textContent = 'WILD UNTAMED APEX';
    elements.beastStatusRibbon.className = 'absolute bottom-0 inset-x-0 bg-primal-900/90 text-[10px] text-center font-mono py-0.5 text-slate-400 border-t border-primal-700';
  }

  // Win Odds
  const winChance = calculateWinChance(activeBeast);
  const winChancePct = (winChance * 100).toFixed(1);

  elements.oddsPercentageText.textContent = winChancePct + '%';
  elements.oddsMeterFill.style.width = (winChance * 100) + '%';

  const fightStaminaCost = getBossStaminaCost(activeBeast);
  const hasEnoughStamina = gameState.stamina >= fightStaminaCost;
  if (elements.fightStaminaCost) elements.fightStaminaCost.textContent = fightStaminaCost;
  if (elements.fightWoundTime) elements.fightWoundTime.textContent = Math.round(getWoundedDuration(activeBeast));
  const meetsMinPower = totalPower >= effMin;
  const canUnderdog = !meetsMinPower && hasRelic('magma_stinger');
  const canFight = (meetsMinPower || canUnderdog) && hasEnoughStamina && !gameState.inCooldown && !gameState.isBattling;

  elements.btnChallenge.disabled = !canFight;

  if (gameState.isBattling) {
    elements.btnFightLabel.textContent = 'BATTLING...';
    elements.btnFightIcon.className = 'fa-solid fa-spinner fa-spin text-lg';
  } else if (isApexFight) {
    elements.btnFightLabel.textContent = 'TAME APEX';
    elements.btnFightIcon.className = 'fa-solid fa-crown text-lg text-fuchsia-200';
  } else if (isTitanFight) {
    elements.btnFightLabel.textContent = 'SLAY THE TITAN';
    elements.btnFightIcon.className = 'fa-solid fa-mountain text-lg text-amber-200';
  } else if (isGuardianFight) {
    elements.btnFightLabel.textContent = 'BREAK THE SEAL';
    elements.btnFightIcon.className = 'fa-solid fa-lock-open text-lg text-rose-200';
  } else if (isAlreadyTamed) {
    elements.btnFightLabel.textContent = 'TROPHY EXPEDITION';
    elements.btnFightIcon.className = 'fa-solid fa-trophy text-lg text-amber-300';
  } else {
    elements.btnFightLabel.textContent = 'TAME BEAST';
    elements.btnFightIcon.className = 'fa-solid fa-crosshairs text-lg';
  }

  if (!meetsMinPower) {
    elements.btnChancePill.textContent = canUnderdog ? 'Underdog odds: ' + winChancePct + '%' : 'Power too low (0%)';
    elements.btnChancePill.className = canUnderdog ? 'text-orange-400 font-bold' : 'text-red-400 font-bold';
  } else {
    elements.btnChancePill.textContent = 'Odds: ' + winChancePct + '%';
    elements.btnChancePill.className = winChance >= 0.7 ? 'text-emerald-300 font-bold' : 'text-amber-300 font-bold';
  }

  if (gameState.inCooldown) {
    elements.cooldownContainer.classList.remove('hidden');
    elements.cooldownTimer.textContent = Math.max(0, gameState.cooldownRemaining).toFixed(1) + 's';
    const totalDuration = gameState.cooldownTotal || getWoundedDuration();
    const cdPct = (gameState.cooldownRemaining / totalDuration) * 100;
    elements.cooldownBar.style.width = cdPct + '%';
  } else {
    elements.cooldownContainer.classList.add('hidden');
  }

  if (gameState.activeTab === 'forge') {
    updateForgeLiveElements();
  }
}

/**
 * Visual Feedback & Logs
 */
function spawnFloatingText(x, y, text, colorClass = 'text-amber-400') {
  const floater = document.createElement('div');
  floater.className = 'floating-text ' + colorClass + ' text-sm';
  floater.textContent = text;
  floater.style.left = x + 'px';
  floater.style.top = y + 'px';
  document.body.appendChild(floater);

  setTimeout(() => {
    floater.remove();
  }, 1100);
}

function showToast(message, type = 'info', isLegendary = false) {
  if (!elements.toastContainer) return;
  const toast = document.createElement('div');
  const bgColors = {
    info: 'bg-primal-800 border-blue-500/60 text-blue-200',
    success: 'bg-emerald-950/90 border-emerald-500/80 text-emerald-200',
    warning: 'bg-amber-950/90 border-amber-500/80 text-amber-200',
    danger: 'bg-red-950/90 border-red-500/80 text-red-200'
  };

  const borderClass = isLegendary ? 'border-2 border-amber-400 shadow-lg glow-amber' : 'border shadow-md';
  const iconClass = type === 'danger' ? 'fa-skull' : (type === 'success' ? 'fa-circle-check' : 'fa-bell');

  toast.className = (bgColors[type] || bgColors.info) + ' ' + borderClass + ' px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-300 transform translate-y-2 opacity-0 pointer-events-auto';
  toast.innerHTML = '<i class="fa-solid ' + iconClass + '"></i><span>' + message + '</span>';

  elements.toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', '-translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function logCombatMessage(message, type = 'default') {
  if (!elements.combatLog) return;
  const msgEl = document.createElement('div');
  const typeStyles = {
    win: 'text-emerald-400 font-semibold',
    loss: 'text-red-400 font-semibold',
    relic: 'text-amber-300 font-bold',
    unlock: 'text-purple-300 font-bold',
    default: 'text-slate-300'
  };

  msgEl.className = typeStyles[type] || typeStyles.default;
  const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  msgEl.innerHTML = '<span class="text-slate-500 mr-1.5">[' + time + ']</span> ' + message;

  elements.combatLog.prepend(msgEl);

  while (elements.combatLog.children.length > 60) {
    elements.combatLog.removeChild(elements.combatLog.lastChild);
  }
}

function updateBeastSelectorOptions() {
  if (!elements.selectBeastTier) return;
  elements.selectBeastTier.innerHTML = '';
  BEAST_CATALOG.forEach((beast, idx) => {
    if (beast.tier <= gameState.highestTierUnlocked) {
      const opt = document.createElement('option');
      opt.value = idx;
      const isTamed = !!gameState.tamedBeasts[beast.id];
      opt.textContent = 'T' + beast.tier + ': ' + beast.name + ' ' + (isTamed ? '🏆 (Trophy)' : '⚔️ (Untamed)');
      if (idx === gameState.selectedBeastIndex) {
        opt.selected = true;
      }
      elements.selectBeastTier.appendChild(opt);
    }
  });
  const apex = (typeof getApexBoss === 'function') ? getApexBoss() : null;
  if (apex) {
    const opt = document.createElement('option');
    opt.value = APEX_SLOT;
    opt.textContent = '👑 T' + apex.tier + ': ' + apex.name + ' (Apex Ladder)';
    if (gameState.selectedBeastIndex === APEX_SLOT) opt.selected = true;
    elements.selectBeastTier.appendChild(opt);
  }
  const titan = (typeof getTitanBoss === 'function') ? getTitanBoss() : null;
  if (titan) {
    const opt = document.createElement('option');
    opt.value = TITAN_SLOT;
    opt.textContent = '⛰️ TITAN: ' + titan.name + ' (opens the Rift)';
    if (gameState.selectedBeastIndex === TITAN_SLOT) opt.selected = true;
    elements.selectBeastTier.appendChild(opt);
  }
  const guardian = (typeof getTotemGuardian === 'function') ? getTotemGuardian() : null;
  if (guardian) {
    const opt = document.createElement('option');
    opt.value = TOTEM_GUARDIAN_SLOT;
    opt.textContent = '🗿 Seal ' + guardian.sealNumber + ': ' + guardian.name + ' (Totem Guardian)';
    if (gameState.selectedBeastIndex === TOTEM_GUARDIAN_SLOT) opt.selected = true;
    elements.selectBeastTier.appendChild(opt);
  }
}

/**
 * Camp Generators Ladder Renderer (Supports Custom PNGs like snare-lines.png)
 */
function renderGeneratorsLadder() {
  if (!elements.generatorsContainer) return;
  elements.generatorsContainer.innerHTML = '';
  GENERATOR_LADDER.forEach(gen => {
    const isUnlocked = isGeneratorUnlocked(gen);
    const count = gameState.generators[gen.id] || 0;
    const bulk = getGeneratorBulk(gen);
    const cost = bulk.cost;
    const canAfford = gameState.meat >= cost;

    const card = document.createElement('div');
    if (isUnlocked) {
      const eachYieldStr = gen.yieldPerSec < 1 ? gen.yieldPerSec.toFixed(1) : formatNumber(gen.yieldPerSec);
      // Milestone Overdrive: current multiplier (applied to the total) and the next threshold
      const milestoneMult = getGeneratorMilestoneMultiplier(gen.id);
      const totalYieldVal = count * gen.yieldPerSec * milestoneMult;
      const totalYieldStr = totalYieldVal > 0 && totalYieldVal < 10 ? totalYieldVal.toFixed(1) : formatNumber(totalYieldVal);
      const nextMilestone = GENERATOR_MILESTONES.find(m => count < m.count);
      const overdriveHtml = milestoneMult > 1
        ? '<span class="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/50 px-1.5 py-0.5 rounded-full" title="Milestone Overdrive: this generator\'s output is multiplied">' +
            '<i class="fa-solid fa-bolt"></i>' + (Math.round(milestoneMult * 100) / 100) + 'x Overdrive' +
          '</span>'
        : '';
      const nextMilestoneHtml = nextMilestone
        ? '<span class="text-[10px] text-slate-500">Next: ' + (Math.round(milestoneMult * nextMilestone.mult * (hasLegacyCapstone('feast_of_plenty') ? LEGACY_CONFIG.feastMult : 1) * 100) / 100) + 'x at ' + nextMilestone.count + ' (' + count + '/' + nextMilestone.count + ')</span>'
        : '<span class="text-[10px] font-bold text-amber-400">MAX OVERDRIVE</span>';
      const disabledAttr = canAfford ? '' : 'disabled';

      const iconInnerHtml = gen.image
        ? '<img src="' + gen.image + '" alt="' + gen.name + '" class="w-full h-full object-contain p-0.5" style="filter:' + (gen.imageFilter || 'none') + '" onerror="this.style.display=\'none\'" />'
        : '<i class="fa-solid ' + gen.icon + '"></i>';

      card.className = 'bg-primal-800/90 border border-primal-700 rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner hover:border-amber-500/30 transition-colors';
      card.innerHTML =
        '<div class="flex items-center space-x-3">' +
          '<div class="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400 text-lg shadow-inner overflow-hidden flex-shrink-0">' +
            iconInnerHtml +
          '</div>' +
          '<div>' +
            '<div class="flex items-center gap-2">' +
              '<span class="font-bold text-slate-100 text-sm">' + gen.name + '</span>' +
              '<span class="text-xs bg-primal-700 text-amber-300 font-mono px-2 py-0.5 rounded-full font-bold">' +
                'Owned: <span class="gen-count font-bold">' + count + '</span>' +
              '</span>' +
            '</div>' +
            '<div class="text-xs text-slate-400 mt-0.5">' + gen.desc + '</div>' +
            '<div class="text-[11px] text-emerald-400 font-mono mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">' +
              '<span>+' + eachYieldStr + ' Meat/s each (Total: +' + totalYieldStr + '/s)</span>' +
              overdriveHtml +
              nextMilestoneHtml +
            '</div>' +
          '</div>' +
        '</div>' +
        '<button data-gen-id="' + gen.id + '" class="btn-buy-gen w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-all border border-amber-500/50 flex items-center justify-center gap-2 font-mono cursor-pointer" ' + disabledAttr + '>' +
          '<span>Deploy' + (bulk.qty > 1 ? ' x' + bulk.qty : '') + '</span>' +
          '<span class="text-amber-200 flex items-center gap-1 font-bold">' +
            '<i class="fa-solid fa-drumstick-bite text-[11px]"></i>' +
            '<span class="gen-cost">' + formatNumber(cost) + '</span>' +
          '</span>' +
        '</button>';
    } else {
      card.className = 'bg-primal-800/40 border border-dashed border-primal-700/60 rounded-xl p-3 sm:p-3.5 flex items-center justify-between opacity-50 grayscale cursor-not-allowed';
      card.innerHTML =
        '<div class="flex items-center space-x-3">' +
          '<div class="w-10 h-10 rounded-lg bg-primal-900 border border-slate-700 flex items-center justify-center text-slate-600 text-lg">' +
            '<i class="fa-solid fa-lock"></i>' +
          '</div>' +
          '<div>' +
            '<div class="flex items-center gap-2">' +
              '<span class="font-bold text-slate-400 text-sm">' + gen.name + '</span>' +
              '<span class="text-[10px] bg-red-950/80 text-red-400 font-mono px-2 py-0.5 rounded border border-red-800/60">' +
                gen.reqLabel +
              '</span>' +
            '</div>' +
            '<div class="text-xs text-slate-500 mt-0.5">' + gen.desc + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="text-xs font-mono text-slate-500 bg-primal-900 px-3 py-1.5 rounded border border-primal-800">Locked</div>';
    }

    elements.generatorsContainer.appendChild(card);
  });

  elements.generatorsContainer.querySelectorAll('.btn-buy-gen').forEach(btn => {
    btn.addEventListener('click', () => {
      const genId = btn.getAttribute('data-gen-id');
      const gen = GENERATOR_LADDER.find(g => g.id === genId);
      if (!gen) return;

      if (buyGeneratorBulk(gen) > 0) {
        sound.playBuy();
        renderGeneratorsLadder();
        saveGameToStorage();
      }
    });
  });
}

/**
 * Relic Trophy Cabinet Renderer
 */
function renderTrophyCabinet() {
  if (!elements.relicGrid) return;
  elements.relicGrid.innerHTML = '';
  const relicKeys = Object.keys(RELIC_REGISTRY);
  let ownedCount = 0;

  relicKeys.forEach(key => {
    const relic = RELIC_REGISTRY[key];
    const isOwned = isRelicOwned(key);
    const isAwake = hasRelic(key);
    if (isOwned) ownedCount++;

    const sourceBeast = BEAST_CATALOG.find(b => b.id === relic.beastId);
    const beastName = sourceBeast ? sourceBeast.name : 'Unknown';
    const isLegendary = relic.rarity === 'Legendary';

    const card = document.createElement('div');
    if (isOwned) {
      const cardBorder = isLegendary
        ? 'bg-gradient-to-br from-amber-950/50 via-primal-800 to-amber-950/30 border-amber-500/70 glow-amber'
        : 'bg-primal-800/90 border-emerald-600/60';
      const iconBoxStyle = isLegendary
        ? 'bg-amber-950/90 border border-amber-400 text-amber-300'
        : 'bg-emerald-950/90 border border-emerald-500 text-emerald-400';
      const badgeStyle = isLegendary
        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';

      card.className = 'p-4 rounded-xl border flex items-start space-x-3.5 transition-all ' + cardBorder + (isAwake ? '' : ' opacity-60');
      card.innerHTML =
        '<div class="w-11 h-11 rounded-xl ' + iconBoxStyle + ' flex items-center justify-center text-xl flex-shrink-0 shadow-md">' +
          '<i class="fa-solid ' + relic.icon + '"></i>' +
        '</div>' +
        '<div class="flex-1 min-w-0">' +
          '<div class="flex items-center justify-between gap-1 mb-1">' +
            '<h4 class="font-bold text-sm text-slate-100 truncate">' + relic.name + '</h4>' +
            '<span class="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ' + badgeStyle + '">' + relic.rarity + '</span>' +
          '</div>' +
          '<p class="text-xs text-slate-300 leading-snug">' + relic.desc + '</p>' +
          (isAwake
            ? '<div class="text-[10px] text-slate-400 font-mono mt-1">Source: ' + beastName + ' Trophy</div>'
            : '<div class="text-[10px] text-sky-300 font-mono mt-1"><i class="fa-solid fa-moon mr-1"></i>Asleep: tame the ' + beastName + ' this run to wake it</div>') +
        '</div>';
    } else {
      card.className = 'bg-primal-900/60 border border-dashed border-primal-800 rounded-xl p-4 flex items-start space-x-3.5 opacity-50 grayscale';
      card.innerHTML =
        '<div class="w-11 h-11 rounded-xl bg-primal-950 border border-slate-700 flex items-center justify-center text-slate-600 text-xl flex-shrink-0">' +
          '<i class="fa-solid fa-lock"></i>' +
        '</div>' +
        '<div class="flex-1 min-w-0">' +
          '<div class="flex items-center justify-between gap-1 mb-1">' +
            '<h4 class="font-bold text-sm text-slate-400 truncate">' + relic.name + '</h4>' +
            '<span class="text-[10px] font-mono px-2 py-0.5 rounded uppercase bg-primal-800 text-slate-500 border border-slate-700">' + relic.rarity + '</span>' +
          '</div>' +
          '<p class="text-xs text-slate-500 leading-snug">' + relic.desc + '</p>' +
          '<div class="text-[10px] text-amber-600 font-mono mt-1">Source: Tame &amp; refight ' + beastName + '</div>' +
        '</div>';
    }

    elements.relicGrid.appendChild(card);
  });

  if (elements.relicOwnedCount) {
    elements.relicOwnedCount.textContent = ownedCount;
  }
  if (typeof renderBestiary === 'function') renderBestiary();
}

/**
 * Tamed Menagerie Renderer
 */
// Last Beast Power the Menagerie was drawn with; renderFrame redraws it whenever this changes
let lastMenageriePower = -1;

function renderMenagerie() {
  if (!elements.menagerieContainer) return;
  elements.menagerieContainer.innerHTML = '';

  const totalBeastPower = getTotalBeastPower();
  lastMenageriePower = totalBeastPower;
  if (elements.menagerieTotalPower) {
    elements.menagerieTotalPower.textContent = formatNumber(totalBeastPower);
  }

  let count = 0;

  BEAST_CATALOG.forEach(beast => {
    if (gameState.tamedBeasts[beast.id]) {
      count++;
      const pLvl = getParentLevel(beast.id);
      const levelMult = 1 + ((pLvl - 1) * 0.15);
      const effectivePower = Math.floor((beast.rewardPower || 0) * levelMult * getBeastMasteryMultiplier());
      const powerLabel = effectivePower > 0 ? '+' + formatNumber(effectivePower) + ' Pwr' : 'Apex Ruler';

      const card = document.createElement('div');
      card.className = 'bg-primal-800/90 border border-primal-700/80 rounded-xl p-2.5 flex flex-col gap-1.5 shadow-inner hover:border-amber-500/40 transition-colors';
      card.innerHTML =
        '<div class="pack-art"><img src="' + getBeastArt(beast, true) + '" alt="' + beast.name + '" style="filter:' + (beast.imageFilter || 'none') + '" onerror="this.onerror=null; this.src=\'' + beast.fallbackImage + '\';" /></div>' +
        '<div class="min-w-0">' +
          '<div class="flex items-center justify-between gap-1 mb-0.5">' +
            '<h4 class="font-bold text-xs text-slate-100 truncate">' + beast.name + '</h4>' +
            '<span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Lvl ' + pLvl + '</span>' +
          '</div>' +
          '<div class="flex items-center justify-between text-[11px] font-mono">' +
            '<span class="text-emerald-400 font-bold">' + powerLabel + '</span>' +
            '<span class="text-slate-500 text-[10px]">Tier ' + beast.tier + '</span>' +
          '</div>' +
        '</div>';
      elements.menagerieContainer.appendChild(card);
    }
  });

  HYBRID_CATALOG.forEach(hybrid => {
    const hLvl = getHybridLevel(hybrid.id);
    if (hLvl > 0) {
      count++;
      const isAwake = isHybridAwake(hybrid);
      const effectivePower = Math.floor(getHybridRawPower(hybrid) * getBeastMasteryMultiplier());
      const p1 = BEAST_CATALOG.find(b => b.id === hybrid.parent1);
      const p2 = BEAST_CATALOG.find(b => b.id === hybrid.parent2);
      const powerHtml = isAwake
        ? '<span class="text-purple-300 font-bold">+' + formatNumber(effectivePower) + ' Pwr</span>'
        : '<span class="text-slate-400 font-bold" title="Tame ' + (p1 ? p1.name : '') + ' & ' + (p2 ? p2.name : '') + ' this run to awaken"><i class="fa-solid fa-moon mr-1"></i>Dormant</span>';

      const card = document.createElement('div');
      card.className = 'bg-gradient-to-r from-purple-950/40 to-primal-800 border border-purple-600/50 rounded-xl p-2.5 flex items-center space-x-3 shadow-inner hover:border-purple-400/50 transition-colors';
      card.innerHTML =
        '<div class="menagerie-thumb flex items-center justify-center text-purple-400 text-lg bg-purple-950/60 border border-purple-500/40">' +
          '<i class="fa-solid ' + hybrid.icon + '"></i>' +
        '</div>' +
        '<div class="flex-1 min-w-0">' +
          '<div class="flex items-center justify-between gap-1 mb-0.5">' +
            '<h4 class="font-bold text-xs text-purple-200 truncate">' + hybrid.name + '</h4>' +
            '<span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">Hybrid Lvl ' + hLvl + '</span>' +
          '</div>' +
          '<div class="flex items-center justify-between text-[11px] font-mono">' +
            powerHtml +
            '<span class="text-amber-400 text-[10px]">Chimera</span>' +
          '</div>' +
        '</div>';
      elements.menagerieContainer.appendChild(card);
    }
  });

  if (count === 0) {
    elements.menagerieContainer.innerHTML =
      '<div class="col-span-full text-center py-6 text-slate-500 text-xs italic">' +
        'No beasts tamed yet. Defeat apex beasts in the Hunt zone to bind them to your pack.' +
      '</div>';
  }
}

/**
 * Event Listeners & Initialization
 */
elements.btnForage.addEventListener('click', (e) => {
  let earned = getClickYield();
  let isCrit = false;

  const critChance = getCritChance();
  if (critChance > 0 && Math.random() < critChance) {
    isCrit = true;
    earned = Math.floor(earned * getCritMultiplier());
  }

  addMeat(earned);
  sound.playClick();
  if (isTotemUnlocked()) dealTotemDamage(getTotemClickDamage());
  if (addWarmth(WORLD_CONFIG.blizzard.warmthPerClick)) renderTundraStrip();

  if (gameState.incubator) {
    gameState.incubator.remaining = Math.max(0, gameState.incubator.remaining - 1);
    checkIncubatorHatch();
  }

  const rect = elements.btnForage.getBoundingClientRect();
  const clickX = e.clientX || (rect.left + rect.width / 2);
  const clickY = e.clientY || (rect.top + rect.height / 2);
  spawnFloatingText(
    clickX,
    clickY,
    '+' + formatNumber(earned) + (isCrit ? ' CRIT!' : ''),
    isCrit ? 'text-amber-300 font-extrabold text-base' : 'text-amber-400'
  );
});

elements.btnCraftWeapon.addEventListener('click', () => {
  const nextWeapon = WEAPONS_CATALOG[gameState.weaponTier];
  if (!nextWeapon) return;

  if (gameState.meat >= nextWeapon.cost) {
    sound.playBuy();
    gameState.meat -= nextWeapon.cost;
    gameState.weaponTier += 1;
    showToast('Crafted weapon: ' + nextWeapon.name + '!', 'success');
    saveGameToStorage();
  }
});

elements.btnBuyEndurance.addEventListener('click', () => {
  const cost = getCampEnduranceCost();
  if (gameState.meat >= cost && !isCampEnduranceMaxed()) {
    sound.playBuy();
    gameState.meat -= cost;
    gameState.campEnduranceLevel += 1;
    saveGameToStorage();
  }
});

elements.btnBuyRecovery.addEventListener('click', () => {
  const cost = getCampRecoveryCost();
  if (gameState.meat >= cost && !isCampRecoveryMaxed()) {
    sound.playBuy();
    gameState.meat -= cost;
    gameState.campRecoveryLevel += 1;
    saveGameToStorage();
  }
});

elements.btnBuyBrute.addEventListener('click', () => {
  const cost = getBruteConditioningCost();
  if (gameState.meat >= cost) {
    sound.playBuy();
    gameState.meat -= cost;
    gameState.bruteConditioningLevel += 1;
    saveGameToStorage();
  }
});

elements.btnBuyMastery.addEventListener('click', () => {
  if (!isBeastMasteryUnlocked()) return;
  const cost = getBeastMasteryCost();
  if (gameState.meat >= cost) {
    sound.playBuy();
    gameState.meat -= cost;
    gameState.beastMasteryLevel += 1;
    saveGameToStorage();
  }
});

elements.btnBuyAnatomy.addEventListener('click', () => {
  const cost = getWeakpointAnatomyCost();
  if (gameState.meat >= cost && gameState.weakpointAnatomyLevel < ANATOMY_MAX_RANK) {
    sound.playBuy();
    gameState.meat -= cost;
    gameState.weakpointAnatomyLevel += 1;
    saveGameToStorage();
  }
});

elements.btnSpar.addEventListener('click', () => {
  const sparMeatCost = getSparringCost();
  const sparStaminaCost = getSparringStaminaCost();
  if (gameState.meat < sparMeatCost || gameState.stamina < sparStaminaCost || gameState.isSparring) return;

  gameState.meat -= sparMeatCost;
  gameState.stamina -= sparStaminaCost;
  gameState.isSparring = true;
  elements.btnSparLabel.textContent = 'SPARRING...';
  sound.playSpar();

  setTimeout(() => {
    gameState.isSparring = false;
    gameState.sparringLevel += 1;

    const breakthroughChance = getSparBreakthroughChance();

    const isBreakthrough = Math.random() < breakthroughChance;
    const scorpiodrakeLvl = getActiveHybridLevel('scorpiodrake');
    const sparPct = gameState.sparringLevel * (scorpiodrakeLvl > 0 ? 5 : 2);

    if (isBreakthrough) {
      gameState.adrenalineFocusRemaining = 60;
      logCombatMessage('💥 <strong>CRITICAL BREAKTHROUGH!</strong> Sparring level increased to ' + gameState.sparringLevel + ' (+' + sparPct + '% Hunter Power) & gained <strong>Adrenaline Focus</strong>!', 'unlock');
      showToast('Critical Breakthrough! Adrenaline Focus triggered!', 'success');
    } else {
      logCombatMessage('🥋 Sparring complete. Sparring mastery level increased to ' + gameState.sparringLevel + ' (+' + sparPct + '% Hunter Power).', 'default');
      showToast('Sparring Complete: Level ' + gameState.sparringLevel + '!', 'info');
    }
    saveGameToStorage();
  }, 1000);
});

elements.btnChallenge.addEventListener('click', challengeCurrentBeast);

elements.selectBeastTier.addEventListener('change', (e) => {
  gameState.selectedBeastIndex = parseInt(e.target.value, 10);
  saveGameToStorage();
});

elements.btnClearLog.addEventListener('click', () => {
  elements.combatLog.innerHTML = '<div class="text-slate-500 italic">Combat log cleared.</div>';
});

elements.btnToggleSound.addEventListener('click', () => {
  sound.enabled = !sound.enabled;
  elements.soundStatus.textContent = sound.enabled ? 'ON' : 'OFF';
  elements.soundIcon.className = sound.enabled ? 'fa-solid fa-volume-high text-amber-400' : 'fa-solid fa-volume-xmark text-slate-500';
});

elements.btnUnlockForge.addEventListener('click', () => {
  if (gameState.meat >= FORGE_EXCAVATE_COST && !gameState.forgeUnlocked) {
    sound.playBuy();
    gameState.meat -= FORGE_EXCAVATE_COST;
    gameState.forgeUnlocked = true;
    showToast('The Beast Forge has been restored!', 'success', true);
    logCombatMessage('🧬 <strong>BEAST FORGE EXCAVATED!</strong> The primeval nursery and chimera vats are fully operational!', 'unlock');
    renderForge();
    saveGameToStorage();
  }
});

if (elements.tabBtnCamp) elements.tabBtnCamp.addEventListener('click', () => switchTab('camp'));
if (elements.tabBtnHunt) elements.tabBtnHunt.addEventListener('click', () => switchTab('hunt'));
if (elements.tabBtnForge) elements.tabBtnForge.addEventListener('click', () => switchTab('forge'));
if (elements.tabBtnRelics) elements.tabBtnRelics.addEventListener('click', () => switchTab('relics'));
if (elements.tabBtnAscend) elements.tabBtnAscend.addEventListener('click', () => switchTab('ascend'));

// Phase 3: Ascension Altar controls
if (elements.ascensionPerksContainer) {
  elements.ascensionPerksContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-buy-perk');
    if (btn && !btn.disabled) buyAscensionPerk(btn.dataset.perkId);
  });
}
if (elements.expansionsContainer) {
  elements.expansionsContainer.addEventListener('click', (e) => {
    if (e.target.closest('.btn-open-fishing')) { switchTab('fish'); return; }
    const btn = e.target.closest('.btn-buy-expansion');
    if (btn && !btn.disabled) buyAscensionExpansion(btn.dataset.expId);
  });
}
if (elements.btnTriggerAscend) {
  elements.btnTriggerAscend.addEventListener('click', () => {
    if (!canAscendNow()) return;
    if (elements.modalAscendStones) elements.modalAscendStones.textContent = formatNumber(calculatePendingBloodstones());
    elements.ascendModal.classList.remove('hidden');
  });
}
if (elements.btnCancelAscend) {
  elements.btnCancelAscend.addEventListener('click', () => {
    elements.ascendModal.classList.add('hidden');
  });
}
if (elements.btnConfirmAscend) {
  elements.btnConfirmAscend.addEventListener('click', () => {
    elements.ascendModal.classList.add('hidden');
    performAscension();
  });
}

if (elements.nurseryContainer) {
  elements.nurseryContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.nurture-btn, .btn-level-parent');
    if (!btn) return;
    const beastId = btn.dataset.beastId || btn.dataset.parentId;
    if (beastId) {
      nurtureParent(beastId);
    }
  });
}

elements.btnResetGame.addEventListener('click', () => {
  elements.resetModal.classList.remove('hidden');
});

elements.btnCancelReset.addEventListener('click', () => {
  elements.resetModal.classList.add('hidden');
});

elements.btnConfirmReset.addEventListener('click', () => {
  isResetting = true;
  localStorage.removeItem('beast_tamer_savedata');
  window.location.reload();
});

/**
 * ================= EXPANSION I: PRIMAL FISHING DOCK UI =================
 */
const fishEls = {
  water: document.getElementById('fish-water'),
  ring: document.getElementById('fish-ring'),
  bobber: document.getElementById('fish-bobber'),
  status: document.getElementById('fish-status'),
  skill: document.getElementById('fish-skill'),
  skillLabel: document.getElementById('fish-skill-label'),
  skillMisses: document.getElementById('fish-skill-misses'),
  skillTrack: document.getElementById('fish-skill-track'),
  skillZone: document.getElementById('fish-skill-zone'),
  skillPerfect: document.getElementById('fish-skill-perfect'),
  skillMarker: document.getElementById('fish-skill-marker'),
  actionBtn: document.getElementById('btn-fish-action'),
  result: document.getElementById('fish-result'),
  rodLevel: document.getElementById('fish-rod-level'),
  rodEffect: document.getElementById('fish-rod-effect'),
  rodBtn: document.getElementById('btn-fish-rod'),
  rodCost: document.getElementById('fish-rod-cost'),
  linesCount: document.getElementById('fish-lines-count'),
  lineNext: document.getElementById('fish-line-next'),
  lineBar: document.getElementById('fish-line-bar'),
  lineBtn: document.getElementById('btn-fish-line'),
  lineCost: document.getElementById('fish-line-cost'),
  recipes: document.getElementById('fish-recipes'),
  codexGrid: document.getElementById('fish-codex-grid'),
  codexTotals: document.getElementById('fish-codex-totals'),
  totalCaught: document.getElementById('fish-total-caught'),
  codexCount: document.getElementById('fish-codex-count'),
  basketCount: document.getElementById('fish-basket-count'),
  buffBadges: document.getElementById('buff-fish-badges')
};

/** Live cast state (not saved; a cast in progress is simply lost on reload) */
const fishingSession = { phase: 'idle', fish: null, biteTimer: null, check: null };
let fishDockSignature = '';
let fishBuffSignature = '';

function clearFishTimers() {
  if (fishingSession.biteTimer) clearTimeout(fishingSession.biteTimer);
  fishingSession.biteTimer = null;
}

/** Start the back-and-forth skill check for the hooked fish */
function startSkillCheck(fish) {
  const cfg = getSkillCheckFor(fish);
  fishingSession.check = {
    cfg,
    zoneLeft: Math.random() * (1 - cfg.zone),
    driftDir: Math.random() < 0.5 ? -1 : 1,
    pos: Math.random() < 0.5 ? 0 : 1,
    dir: 1,
    missesLeft: cfg.misses,
    startAt: performance.now(),
    lastAt: performance.now(),
    flashUntil: 0
  };
  fishingSession.check.dir = fishingSession.check.pos === 0 ? 1 : -1;
}

/** Move the marker (and drifting zone) forward to 'now'. Position is time-based, so frame rate doesn't matter. */
function advanceSkillCheck(now) {
  const c = fishingSession.check;
  if (!c) return;
  const dt = Math.min(0.1, Math.max(0, (now - c.lastAt) / 1000));
  c.lastAt = now;
  let speed = 1 / c.cfg.sweepSec;
  if (c.cfg.erratic) {
    const t = (now - c.startAt) / 1000;
    speed *= Math.max(0.45, 1 + 0.45 * Math.sin(t * 2.7) + 0.3 * Math.sin(t * 6.3 + 1.3));
  }
  c.pos += c.dir * speed * dt;
  if (c.pos >= 1) { c.pos = 2 - c.pos; c.dir = -1; }
  if (c.pos <= 0) { c.pos = -c.pos; c.dir = 1; }
  if (c.cfg.drift > 0) {
    c.zoneLeft += c.driftDir * c.cfg.drift * dt;
    const maxLeft = 1 - c.cfg.zone;
    if (c.zoneLeft >= maxLeft) { c.zoneLeft = maxLeft; c.driftDir = -1; }
    if (c.zoneLeft <= 0) { c.zoneLeft = 0; c.driftDir = 1; }
  }
}

/** Player clicked during the skill check */
function fishReelAttempt() {
  const c = fishingSession.check;
  if (!c) return;
  advanceSkillCheck(performance.now());
  const inZone = c.pos >= c.zoneLeft && c.pos <= c.zoneLeft + c.cfg.zone;
  if (inZone) {
    const perfectCfg = FISHING_CONFIG.perfect;
    const center = c.zoneLeft + c.cfg.zone / 2;
    const half = (c.cfg.zone * perfectCfg.size) / 2;
    const isPerfect = perfectCfg.enabled && Math.abs(c.pos - center) <= half;
    return fishHooked(isPerfect);
  }
  c.missesLeft -= 1;
  if (c.missesLeft < 0) return fishEscaped();
  // Missed but still on the line: flash red and move the zone
  c.flashUntil = performance.now() + 350;
  c.zoneLeft = Math.random() * (1 - c.cfg.zone);
  sound.playTone(220, 'square', 0.1, 0.08);
  setFishResult('Missed! The fish thrashes... ' + c.missesLeft + ' more miss' + (c.missesLeft === 1 ? '' : 'es') + ' and it\'s gone.', 'text-amber-400');
}

function setFishResult(html, tone = 'text-slate-400') {
  if (!fishEls.result) return;
  fishEls.result.className = 'min-h-[1.25rem] text-center text-xs font-mono ' + tone;
  fishEls.result.innerHTML = html;
}

function fishAction() {
  if (!isFishingUnlocked()) return;
  if (fishingSession.phase === 'waiting') return fishSpooked();
  if (fishingSession.phase === 'reel') return fishReelAttempt();
  castFishingLine();
}

function castFishingLine() {
  const cost = FISHING_CONFIG.castStaminaCost;
  if (gameState.stamina < cost) {
    showToast('Not enough stamina to cast! Requires ' + cost + ' Stamina.', 'warning');
    return;
  }
  gameState.stamina -= cost;
  fishingSession.fish = rollFish();
  fishingSession.phase = 'waiting';
  setFishResult('');
  sound.playTone(520, 'sine', 0.08, 0.08);
  const delay = FISHING_CONFIG.biteDelayMinSec + Math.random() * (FISHING_CONFIG.biteDelayMaxSec - FISHING_CONFIG.biteDelayMinSec);
  fishingSession.biteTimer = setTimeout(fishBite, delay * 1000);
}

function fishBite() {
  fishingSession.biteTimer = null;
  fishingSession.phase = 'reel';
  startSkillCheck(fishingSession.fish);
  sound.playTone(880, 'square', 0.08, 0.12);
}

function fishHooked(isPerfect = false) {
  clearFishTimers();
  const fish = fishingSession.fish;
  fishingSession.phase = 'idle';
  fishingSession.check = null;
  const style = FISH_RARITY_STYLE[fish.rarity];
  const res = landFish(fish);
  let bonusStored = 0;
  if (isPerfect) {
    for (let i = 0; i < FISHING_CONFIG.perfect.bonusFish; i++) {
      if (landFish(fish).stored) bonusStored++;
    }
  }
  if (isPerfect || fish.rarity === 'rare' || fish.rarity === 'legendary' || fish.rarity === 'mythic') sound.playWin(); else sound.playBuy();

  let msg = (isPerfect ? '<span class="text-amber-300 font-bold">PERFECT!</span> ' : '') +
    'Caught ' + (bonusStored > 0 ? (1 + bonusStored) + '× ' : 'a ') + '<strong class="' + style.text + '">' + style.label + ' ' + fish.name + '</strong>!';
  if (res.isNewCodex) msg += ' <span class="text-amber-300">New Codex entry: ' + fish.codexLabel + '</span>';
  if (res.starUp) msg += ' <span class="text-amber-300">' + fish.name + ' mastery: ' + FISH_STAR_NAMES[res.starUp] + '!</span>';
  if (!res.stored && fish.rarity !== 'mythic') msg += ' <span class="text-red-400">Basket full, so you released it.</span>';
  setFishResult(msg, 'text-slate-200');

  if (res.isNewCodex) {
    showToast('FISH CODEX: ' + fish.name + ' (' + fish.codexLabel + ')', 'success', fish.rarity === 'legendary');
    logCombatMessage('🎣 <strong>NEW CODEX ENTRY!</strong> Caught a ' + style.label + ' <strong>' + fish.name + '</strong>. Permanent bonus: ' + fish.codexLabel + '.', 'relic');
  } else if (fish.rarity === 'legendary' || fish.rarity === 'mythic') {
    showToast(FISH_RARITY_STYLE[fish.rarity].label.toUpperCase() + ' CATCH: ' + fish.name + '!', 'success', true);
  }
  if (res.starUp) logCombatMessage('⭐ <strong>' + fish.name + '</strong> reached ' + FISH_STAR_NAMES[res.starUp] + ' mastery: now ' + Math.round(getFishMasteryShare(fish) * 100) + '% of ' + fish.codexLabel + '.', 'relic');
  renderFishingDock();
  saveGameToStorage();
}

function fishSpooked() {
  clearFishTimers();
  fishingSession.phase = 'idle';
  sound.playTone(160, 'sawtooth', 0.15, 0.08);
  setFishResult('Too early! You yanked the line and spooked the fish.', 'text-red-400');
}

function fishEscaped() {
  const fish = fishingSession.fish;
  fishingSession.phase = 'idle';
  fishingSession.check = null;
  sound.playTone(200, 'triangle', 0.2, 0.08);
  const style = FISH_RARITY_STYLE[fish.rarity];
  setFishResult('The line snapped! A <span class="' + style.text + '">' + style.label.toLowerCase() + '</span> fish got away.', 'text-red-400');
}

function formatNeeds(recipe) {
  return Object.keys(recipe.needs).map(r => {
    const have = getFishCountByRarity(r);
    const need = recipe.needs[r];
    const style = FISH_RARITY_STYLE[r];
    return '<span class="' + (have >= need ? style.text : 'text-red-400') + '">' + need + ' ' + style.label + '</span>' +
      '<span class="text-slate-500"> (' + have + ')</span>';
  }).join(' <span class="text-slate-500">+</span> ');
}

function formatDuration(sec) {
  sec = Math.max(0, Math.ceil(sec));
  const m = Math.floor(sec / 60), s = sec % 60;
  return m + ':' + String(s).padStart(2, '0');
}

const FISH_STAR_NAMES = ['', 'First Catch', 'Silver', 'Gold'];

/** Full rebuild of the dock's lists (recipes, codex) and static numbers */
function renderFishingDock() {
  if (!fishEls.codexGrid || !gameState.fishing) return;
  const f = gameState.fishing;

  // Recipes
  fishEls.recipes.innerHTML = '';
  FISH_RECIPES.forEach(recipe => {
    const effects = recipe.buffs.map(b => FISH_BUFFS[b].effect).join(', ');
    const row = document.createElement('div');
    const isActive = f.meal === recipe.id && recipe.buffs.some(b => isFishBuffActive(b));
    row.className = 'p-3 rounded-lg border flex items-center justify-between gap-3 ' + (isActive ? 'bg-orange-950/40 border-orange-500/60' : 'bg-primal-800/90 border-primal-700');
    row.innerHTML =
      '<div class="min-w-0">' +
        '<div class="text-xs font-bold text-slate-100 flex items-center gap-1.5"><i class="fa-solid ' + recipe.icon + ' text-orange-400"></i>' + recipe.name + '</div>' +
        '<div class="text-[11px] text-emerald-300 mt-0.5">' + effects + ' &middot; ' + Math.round(recipe.durationSec / 60) + ' min' + (isActive ? ' <span class="text-orange-300 font-bold">(in the pot)</span>' : '') + '</div>' +
        '<div class="text-[11px] font-mono mt-0.5">' + formatNeeds(recipe) + '</div>' +
      '</div>' +
      '<button data-recipe-id="' + recipe.id + '" class="btn-cook-recipe shrink-0 px-3 py-1.5 bg-orange-700 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[11px] font-semibold rounded font-mono cursor-pointer"' +
        (canCookRecipe(recipe) ? '' : ' disabled') + '>Cook</button>';
    fishEls.recipes.appendChild(row);
  });

  // Codex
  fishEls.codexGrid.innerHTML = '';
  let codexCount = 0;
  FISH_CATALOG.forEach(fish => {
    const caught = !!f.codex[fish.id];
    if (caught) codexCount++;
    const stars = getFishStars(fish);
    const tiers = FISHING_CONFIG.mastery[fish.rarity];
    const caughtN = getFishCatchCount(fish);
    const starHtml = '<span class="text-[11px] tracking-tight">' + [1, 2, 3].map(i => '<i class="fa-' + (stars >= i ? 'solid text-amber-300' : 'regular text-slate-600') + ' fa-star"></i>').join('') + '</span>';
    const gPlus = getFishGoldPlus(fish), gMax = FISHING_CONFIG.masteryPastGold.maxSteps;
    const nextTxt = stars < 3 ? (caughtN + '/' + tiers[stars] + ' to ' + FISH_STAR_NAMES[stars + 1])
      : gPlus >= gMax ? 'Gold +' + gMax + ' (max)' : ('Gold' + (gPlus ? ' +' + gPlus : '') + ' \u00b7 ' + caughtN + '/' + (tiers[2] * (gPlus + 2)) + ' to +' + (gPlus + 1));
    const style = FISH_RARITY_STYLE[fish.rarity];
    const count = f.basket[fish.id] || 0;
    const card = document.createElement('div');
    card.className = 'p-3 rounded-xl border flex flex-col gap-1.5 ' + (caught ? 'bg-primal-800/90 border-primal-600' : 'bg-primal-900/60 border-primal-800');
    card.innerHTML =
      '<div class="flex items-center justify-between">' +
        '<span class="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ' + style.badge + '">' + style.label + '</span>' +
        (caught ? '<span class="text-[11px] font-mono font-bold ' + (count > 0 ? 'text-slate-100' : 'text-slate-600') + '">' + (fish.rarity === 'mythic' ? '' : '×' + count) + '</span>' : '') +
      '</div>' +
      '<div class="flex items-center gap-2">' +
        '<i class="fa-solid ' + (caught ? fish.icon + ' ' + style.text : 'fa-question text-slate-600') + ' text-lg w-5 text-center"></i>' +
        '<div class="text-xs font-bold ' + (caught ? 'text-slate-100' : 'text-slate-600') + ' leading-tight">' + (caught ? fish.name : '???') + '</div>' +
      '</div>' +
      (caught ? '<p class="text-[10px] text-slate-400 leading-snug">' + fish.desc + '</p>' : '') +
      '<div class="text-[11px] font-mono font-semibold ' + (caught ? 'text-emerald-300' : 'text-slate-600') + '">' +
        (caught ? '<i class="fa-solid fa-check mr-1"></i>' : '<i class="fa-solid fa-lock mr-1"></i>') + fish.codexLabel + (caught ? ' <span class="text-slate-400 font-normal">(' + Math.round(getFishMasteryShare(fish) * 100) + '% now)</span>' : '') +
      '</div>' +
      '<div class="flex items-center justify-between text-[10px] font-mono text-slate-400">' + starHtml + '<span>' + (caught ? nextTxt : '') + '</span></div>';
    fishEls.codexGrid.appendChild(card);
  });

  const totals = [];
  const meat = getFishCodexBonus('meat'), click = getFishCodexBonus('click'), power = getFishCodexBonus('power');
  const regen = getFishCodexBonus('regen'), wound = getFishCodexBonus('wound'), stam = getFishCodexBonus('maxStamina');
  const totemB = getFishCodexBonus('totem'), relicB = getFishCodexBonus('relic'), stonesB = getFishCodexBonus('stones');
  if (meat) totals.push('+' + Math.round(meat * 100) + '% Meat/sec');
  if (totemB) totals.push('+' + (Math.round(totemB * 1000) / 10) + '% Totem dmg');
  if (relicB) totals.push('+' + (Math.round(relicB * 1000) / 10) + '% Relic drops');
  if (stonesB) totals.push('+' + (Math.round(stonesB * 1000) / 10) + '% Bloodstones');
  if (click) totals.push('+' + (Math.round(click * 1000) / 10) + '% Click');
  if (power) totals.push('+' + (Math.round(power * 1000) / 10) + '% Power');
  if (regen) totals.push('+' + (Math.round(regen * 1000) / 10) + '% Regen');
  if (stam) totals.push('+' + (Math.round(stam * 10) / 10) + ' Max Stamina');
  if (wound) totals.push('-' + (Math.round(wound * 1000) / 10) + '% Wounds');
  fishEls.codexTotals.innerHTML = totals.length ? 'Codex bonuses:<br><span class="text-emerald-300">' + totals.join(' &middot; ') + '</span>' : 'No Codex bonuses yet';

  fishEls.codexCount.textContent = codexCount + '/' + FISH_CATALOG.length;
  fishEls.totalCaught.textContent = formatNumber(f.totalCaught || 0);

  fishDockSignature = getFishDockSignature();
}

function getFishDockSignature() {
  const f = gameState.fishing;
  return JSON.stringify([f.basket, f.codex, f.catches, f.meal, f.lines, f.rodLevel]);
}

/** Global buff bar badges for meal buffs. Returns true if any meal buff is active. */
function updateFishBuffBadges() {
  if (!fishEls.buffBadges || !gameState.fishing) return false;
  const active = Object.keys(FISH_BUFFS).filter(id => isFishBuffActive(id));
  const sig = active.join(',');
  if (sig !== fishBuffSignature) {
    fishBuffSignature = sig;
    fishEls.buffBadges.innerHTML = active.map(id =>
      '<div class="flex items-center gap-1.5 bg-cyan-500/15 text-cyan-200 border border-cyan-500/40 px-2 py-0.5 rounded-full font-mono text-[11px]">' +
        '<i class="fa-solid ' + FISH_BUFFS[id].icon + ' text-cyan-300"></i>' +
        '<span>' + FISH_BUFFS[id].label + ' (' + FISH_BUFFS[id].effect + '): <span data-fish-buff-timer="' + id + '" class="font-bold"></span></span>' +
      '</div>').join('');
  }
  fishEls.buffBadges.querySelectorAll('[data-fish-buff-timer]').forEach(el => {
    el.textContent = formatDuration(gameState.fishing.buffs[el.dataset.fishBuffTimer]);
  });
  return active.length > 0;
}

/** Per-frame updates: tab visibility, cast minigame visuals, timers, button states */
function updateFishingLive() {
  const unlocked = isFishingUnlocked();
  if (elements.tabBtnFish) {
    elements.tabBtnFish.classList.toggle('hidden', !unlocked);
    if (unlocked && elements.tabFishBadge) {
      const n = getFishBasketCount();
      const full = n >= FISHING_CONFIG.basketCap;
      elements.tabFishBadge.textContent = full ? 'FULL' : String(n);
      elements.tabFishBadge.className = full
        ? 'text-[9px] bg-red-950 text-red-300 border border-red-600 px-1.5 py-0.2 rounded font-mono font-bold animate-pulse'
        : 'text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-700 px-1.5 py-0.2 rounded font-mono' + (n > 0 ? '' : ' hidden');
    }
  }
  if (!unlocked || gameState.activeTab !== 'fish' || !gameState.fishing) return;

  const f = gameState.fishing;
  if (getFishDockSignature() !== fishDockSignature) renderFishingDock();

  // Cast & hook visuals
  const phase = fishingSession.phase;
  const castCost = FISHING_CONFIG.castStaminaCost;
  let btnText, btnClass, statusText, bobberClass;
  if (phase === 'reel' && fishingSession.check) {
    const now = performance.now();
    advanceSkillCheck(now);
    const c = fishingSession.check;
    const style = FISH_RARITY_STYLE[fishingSession.fish.rarity];
    fishEls.skill.classList.remove('hidden');
    fishEls.skillZone.style.left = (c.zoneLeft * 100) + '%';
    fishEls.skillZone.style.width = (c.cfg.zone * 100) + '%';
    const perfectCfg = FISHING_CONFIG.perfect;
    fishEls.skillPerfect.classList.toggle('hidden', !perfectCfg.enabled);
    fishEls.skillPerfect.style.left = ((1 - perfectCfg.size) / 2 * 100) + '%';
    fishEls.skillPerfect.style.width = (perfectCfg.size * 100) + '%';
    fishEls.skillMarker.style.left = (c.pos * 100) + '%';
    const flashing = now < c.flashUntil;
    fishEls.skillTrack.className = 'relative h-6 rounded-md overflow-hidden border ' + (flashing ? 'bg-red-950/90 border-red-500' : 'bg-primal-900/90 border-primal-600');
    fishEls.skillLabel.className = 'font-bold uppercase tracking-wider ' + style.text;
    fishEls.skillLabel.textContent = style.label + ' fish: reel it in!';
    const pips = [];
    for (let i = 0; i < c.cfg.misses; i++) pips.push(i < c.missesLeft ? '●' : '○');
    fishEls.skillMisses.textContent = c.cfg.misses === 0 ? 'No misses allowed!' : 'Misses left: ' + pips.join(' ');
    fishEls.ring.className = 'absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 animate-ping ' + style.ring;
    btnText = 'REEL! (click in the zone)';
    btnClass = 'bg-gradient-to-r from-red-600 via-amber-500 to-red-600 border-amber-300';
    statusText = '<span class="' + style.text + ' font-bold text-base">! BITE !</span>';
    bobberClass = 'text-red-500 animate-bounce';
  } else {
    fishEls.skill.classList.add('hidden');
    fishEls.ring.className = 'hidden';
    if (phase === 'waiting') {
      btnText = 'WAIT FOR IT...';
      btnClass = 'bg-primal-700 border-primal-600';
      statusText = 'The bobber drifts... wait for a bite.';
      bobberClass = 'text-red-400 animate-pulse';
    } else {
      btnText = 'CAST LINE (' + castCost + ' Stamina)';
      btnClass = 'bg-gradient-to-r from-cyan-700 via-sky-600 to-cyan-700 border-cyan-400/50 hover:brightness-110';
      statusText = gameState.stamina >= castCost ? 'The water is still. Cast your line.' : 'Too tired to cast. Rest for some stamina.';
      bobberClass = 'text-slate-500';
    }
  }
  const fullBtnClass = 'w-full py-3.5 px-4 rounded-xl font-cinzel font-bold text-base text-white border shadow-lg cursor-pointer transition-all active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed ' + btnClass;
  if (fishEls.actionBtn.className !== fullBtnClass) fishEls.actionBtn.className = fullBtnClass;
  if (fishEls.actionBtn.textContent !== btnText) fishEls.actionBtn.textContent = btnText;
  fishEls.actionBtn.disabled = phase === 'idle' && gameState.stamina < castCost;
  if (fishEls.status.innerHTML !== statusText) fishEls.status.innerHTML = statusText;
  const fullBobber = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl transition-colors ' + bobberClass;
  if (fishEls.bobber.className !== fullBobber) fishEls.bobber.className = fullBobber;

  // Rod
  const rodCost = getRodUpgradeCost();
  fishEls.rodLevel.textContent = 'Lv ' + f.rodLevel + '/' + FISHING_CONFIG.rod.maxLevel;
  fishEls.rodEffect.innerHTML = 'Catch zone +' + Math.round(Math.min(f.rodLevel, FISHING_CONFIG.rod.zoneLevels) * FISHING_CONFIG.rod.zoneBonusPerLevel * 100) + '% (max at Lv ' + FISHING_CONFIG.rod.zoneLevels + ') &middot; Rare, Legendary &amp; Mythic odds +' + Math.round(f.rodLevel * FISHING_CONFIG.rod.rareWeightPerLevel * 100) + '%';
  if (rodCost === null) {
    fishEls.rodBtn.disabled = true;
    fishEls.rodCost.textContent = 'MAX';
  } else {
    fishEls.rodBtn.disabled = gameState.meat < rodCost;
    fishEls.rodCost.textContent = formatNumber(rodCost);
  }

  // Idle lines
  const interval = FISHING_CONFIG.lines.catchIntervalSec;
  const basketN = getFishBasketCount();
  const basketFull = basketN >= FISHING_CONFIG.basketCap;
  fishEls.linesCount.textContent = f.lines + '/' + FISHING_CONFIG.lines.maxLines + ' Lines';
  fishEls.lineBar.style.width = Math.min(100, (f.lineTimer / interval) * 100) + '%';
  fishEls.lineBar.className = 'h-full ' + (basketFull ? 'bg-red-500' : 'bg-emerald-500');
  fishEls.lineNext.textContent = basketFull ? 'Basket full!' : formatDuration((interval - f.lineTimer) / Math.max(1, f.lines));
  const lineCost = getNextLineCost();
  if (lineCost === null) {
    fishEls.lineBtn.disabled = true;
    fishEls.lineCost.textContent = 'MAX';
  } else {
    fishEls.lineBtn.disabled = gameState.meat < lineCost;
    fishEls.lineCost.textContent = formatNumber(lineCost);
  }

  fishEls.basketCount.textContent = basketN + '/' + FISHING_CONFIG.basketCap;
  fishEls.basketCount.className = basketFull ? 'text-red-400 font-bold' : 'text-emerald-300 font-bold';
  fishEls.recipes.querySelectorAll('.btn-cook-recipe').forEach(btn => {
    const recipe = FISH_RECIPES.find(r => r.id === btn.dataset.recipeId);
    btn.disabled = !recipe || !canCookRecipe(recipe);
  });
}

if (fishEls.actionBtn) fishEls.actionBtn.addEventListener('click', fishAction);
if (elements.tabBtnFish) elements.tabBtnFish.addEventListener('click', () => switchTab('fish'));

document.addEventListener('keydown', (e) => {
  if (e.code !== 'Space' || e.repeat || gameState.activeTab !== 'fish') return;
  const tag = (e.target && e.target.tagName) || '';
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  e.preventDefault();
  fishAction();
});

if (fishEls.rodBtn) {
  fishEls.rodBtn.addEventListener('click', () => {
    if (buyRodUpgrade()) {
      sound.playBuy();
      showToast('Abyssal Rod upgraded to Lv ' + gameState.fishing.rodLevel + '!', 'success');
      saveGameToStorage();
    }
  });
}

if (fishEls.lineBtn) {
  fishEls.lineBtn.addEventListener('click', () => {
    if (buyFishingLine()) {
      sound.playBuy();
      showToast('New idle line set! (' + gameState.fishing.lines + '/' + FISHING_CONFIG.lines.maxLines + ')', 'success');
      saveGameToStorage();
    }
  });
}

if (fishEls.recipes) {
  fishEls.recipes.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-cook-recipe');
    if (!btn || btn.disabled) return;
    const recipe = FISH_RECIPES.find(r => r.id === btn.dataset.recipeId);
    if (recipe && cookRecipe(recipe)) {
      sound.playWin();
      const effects = recipe.buffs.map(b => FISH_BUFFS[b].effect).join(', ');
      showToast('Cooked ' + recipe.name + '! ' + effects, 'success');
      logCombatMessage('🍲 Cooked <strong>' + recipe.name + '</strong>: ' + effects + ' for ' + Math.round(recipe.durationSec / 60) + ' min.', 'unlock');
      renderFishingDock();
      saveGameToStorage();
    }
  });
}

/**
 * ================= PRIMAL TOTEM UI =================
 */
const totemEls = {
  depthName: document.getElementById('totem-depth-name'),
  layer: document.getElementById('totem-layer'),
  shards: document.getElementById('totem-shards'),
  seals: document.getElementById('totem-seals'),
  hpView: document.getElementById('totem-hp-view'),
  hpText: document.getElementById('totem-hp-text'),
  dps: document.getElementById('totem-dps'),
  eta: document.getElementById('totem-eta'),
  hpBar: document.getElementById('totem-hp-bar'),
  hpPct: document.getElementById('totem-hp-pct'),
  strikeBtn: document.getElementById('btn-totem-strike'),
  strikeCost: document.getElementById('totem-strike-cost'),
  strikeDmg: document.getElementById('totem-strike-dmg'),
  sealView: document.getElementById('totem-seal-view'),
  sealNumber: document.getElementById('totem-seal-number'),
  guardianName: document.getElementById('totem-guardian-name'),
  guardianRange: document.getElementById('totem-guardian-range'),
  sealReward: document.getElementById('totem-seal-reward'),
  fightBtn: document.getElementById('btn-totem-fight'),
  bonuses: document.getElementById('totem-bonuses'),
  nextReward: document.getElementById('totem-next-reward'),
  unlocks: document.getElementById('totem-unlocks')
};
let totemStaticSignature = '';

function formatTotemEta(sec) {
  if (!isFinite(sec) || sec <= 0) return '--';
  if (sec < 60) return Math.ceil(sec) + 's left';
  if (sec < 3600) return Math.floor(sec / 60) + 'm ' + String(Math.floor(sec % 60)).padStart(2, '0') + 's left';
  if (sec < 86400 * 3) return Math.floor(sec / 3600) + 'h ' + String(Math.floor((sec % 3600) / 60)).padStart(2, '0') + 'm left';
  return Math.floor(sec / 86400) + 'd left (idle)';
}

/** Rebuild the parts that only change when a layer or Seal breaks */
function renderTotemStatic() {
  if (!totemEls.bonuses || !gameState.totem) return;
  const t = gameState.totem;
  const b = t.bonuses;
  const rows = [
    { icon: 'fa-drumstick-bite', label: 'Meat/sec', value: '+' + Math.round(b.meat * 100) + '%' },
    { icon: 'fa-hand-fist', label: 'Combat Power', value: '+' + Math.round(b.power * 100) + '%' },
    { icon: 'fa-bolt', label: 'Max Stamina', value: '+' + b.stamina },
    { icon: 'fa-heart-pulse', label: 'Stamina Regen', value: '+' + Math.round(b.regen * 100) + '%' }
  ];
  totemEls.bonuses.innerHTML = rows.map(r =>
    '<div class="p-2.5 rounded-lg bg-primal-800/90 border border-primal-700 flex items-center gap-2">' +
      '<i class="fa-solid ' + r.icon + ' text-amber-400 w-4 text-center"></i>' +
      '<div><div class="text-[10px] uppercase tracking-wider text-slate-400">' + r.label + '</div>' +
      '<div class="text-sm font-mono font-bold text-emerald-300">' + r.value + '</div></div>' +
    '</div>').join('');

  // Next reward preview
  if (isTotemSealLayer(t.layer)) {
    totemEls.nextReward.textContent = 'Defeat the Seal guardian to continue';
  } else {
    totemEls.nextReward.textContent = getTotemLayerBonus(t.layer).label + ' and ' + formatNumber(TOTEM_CONFIG.shardsPerLayer * t.layer) + ' Totem Shards';
  }

  // Seal unlock list
  totemEls.unlocks.innerHTML = TOTEM_UNLOCKS.map(u => {
    const reached = t.sealsBroken >= u.seal;
    return '<div class="p-3 rounded-lg border flex items-center gap-3 ' + (reached ? 'bg-amber-950/30 border-amber-600/50' : 'bg-primal-800/70 border-primal-700') + '">' +
      '<div class="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center ' + (reached ? 'bg-amber-900/60 text-amber-300' : 'bg-primal-900 text-slate-500') + '"><i class="fa-solid ' + (reached ? u.icon : 'fa-lock') + '"></i></div>' +
      '<div class="min-w-0"><div class="text-xs font-bold ' + (reached ? 'text-amber-200' : 'text-slate-300') + '">Seal ' + u.seal + ': ' + u.name + '</div>' +
      '<div class="text-[11px] text-slate-400">' + u.desc + ' <span class="font-mono ' + (reached ? 'text-amber-300' : 'text-slate-500') + '">' + (reached ? (u.live ? 'Open now' : 'Revealed, coming soon') : (u.live ? 'Opens here' : 'Coming soon')) + '</span></div></div>' +
    '</div>';
  }).join('');

  totemEls.shards.textContent = formatNumber(t.shards);
  totemEls.seals.textContent = t.sealsBroken;
  totemStaticSignature = getTotemStaticSignature();
}

function getTotemStaticSignature() {
  const t = gameState.totem;
  return t.layer + '|' + t.sealsBroken + '|' + t.shards;
}

/** Per-frame updates: tab visibility, HP bar, DPS, Strike button, Seal view */
function updateTotemLive() {
  const unlocked = isTotemUnlocked();
  if (elements.tabBtnTotem) {
    elements.tabBtnTotem.classList.toggle('hidden', !unlocked);
    if (unlocked && elements.tabTotemBadge) {
      const seal = isTotemSealLayer(gameState.totem.layer);
      elements.tabTotemBadge.textContent = seal ? 'SEAL' : 'L' + gameState.totem.layer;
      elements.tabTotemBadge.className = seal
        ? 'text-[9px] bg-rose-950 text-rose-300 border border-rose-600 px-1.5 py-0.2 rounded font-mono font-bold animate-pulse'
        : 'text-[9px] bg-amber-950 text-amber-300 border border-amber-700 px-1.5 py-0.2 rounded font-mono';
    }
  }
  if (!unlocked || gameState.activeTab !== 'totem') return;

  const t = gameState.totem;
  if (getTotemStaticSignature() !== totemStaticSignature) renderTotemStatic();
  totemEls.layer.textContent = t.layer;
  totemEls.depthName.textContent = getTotemDepthName(t.layer);

  const guardian = getTotemGuardian();
  totemEls.hpView.classList.toggle('hidden', !!guardian);
  totemEls.sealView.classList.toggle('hidden', !guardian);

  if (guardian) {
    totemEls.sealNumber.textContent = guardian.sealNumber;
    totemEls.guardianName.textContent = guardian.name;
    totemEls.guardianRange.textContent = formatNumber(guardian.minPower) + ' - ' + formatNumber(guardian.maxPower);
    totemEls.sealReward.textContent = '+' + formatNumber(TOTEM_CONFIG.sealStones * guardian.sealNumber) + ' Bloodstones, +' +
      formatNumber(TOTEM_CONFIG.sealShards * guardian.sealNumber) + ' Totem Shards, permanent +' + Math.round(TOTEM_CONFIG.sealPowerBonus * 100) + '% Combat Power';
    return;
  }

  const maxHp = getTotemLayerHp(t.layer);
  const hp = Math.max(0, t.hpLeft === null ? maxHp : t.hpLeft);
  const pct = maxHp > 0 ? (hp / maxHp) * 100 : 0;
  const dps = getTotemDps();
  totemEls.hpText.textContent = formatNumber(Math.ceil(hp)) + ' / ' + formatNumber(maxHp);
  totemEls.hpBar.style.width = pct.toFixed(2) + '%';
  totemEls.hpPct.textContent = pct.toFixed(1) + '%';
  totemEls.dps.textContent = formatNumber(dps);
  totemEls.eta.textContent = formatTotemEta(dps > 0 ? hp / dps : Infinity);
  totemEls.strikeCost.textContent = TOTEM_CONFIG.strikeStamina;
  totemEls.strikeDmg.textContent = formatNumber(dps * TOTEM_CONFIG.strikeSec);
  totemEls.strikeBtn.disabled = gameState.stamina < TOTEM_CONFIG.strikeStamina;
}

if (elements.tabBtnTotem) elements.tabBtnTotem.addEventListener('click', () => switchTab('totem'));

if (totemEls.strikeBtn) {
  totemEls.strikeBtn.addEventListener('click', () => {
    if (strikeTotem()) {
      sound.playTone(140, 'sawtooth', 0.18, 0.12);
      renderTotemStatic();
      saveGameToStorage();
    }
  });
}

if (totemEls.fightBtn) {
  totemEls.fightBtn.addEventListener('click', () => {
    if (!getTotemGuardian()) return;
    gameState.selectedBeastIndex = TOTEM_GUARDIAN_SLOT;
    updateBeastSelectorOptions();
    switchTab('hunt');
  });
}

// Background Tab Visibility & Unload Sync
document.addEventListener('visibilitychange', () => {
  if (isResetting) return;
  if (document.visibilityState === 'hidden') {
    syncElapsedWallTime();
    saveGameToStorage();
  } else if (document.visibilityState === 'visible') {
    syncElapsedWallTime();
    renderFrame(getMeatRate());
  }
});

window.addEventListener('beforeunload', () => {
  if (isResetting) return;
  syncElapsedWallTime();
  saveGameToStorage();
});

setInterval(() => {
  if (!isResetting && document.visibilityState === 'hidden') {
    syncElapsedWallTime();
  }
}, 1000);

/**
 * ================= HUNTER'S LEGACY UI =================
 */
const legacyEls = {
  tabBtn: document.getElementById('tab-btn-legacy'),
  tabBadge: document.getElementById('tab-legacy-badge'),
  panel: document.getElementById('panel-legacy'),
  shards: document.getElementById('legacy-shards'),
  spent: document.getElementById('legacy-spent'),
  respecBtn: document.getElementById('btn-legacy-respec'),
  respecNote: document.getElementById('legacy-respec-note'),
  tree: document.getElementById('legacy-tree')
};
let legacySignature = '';
let legacyRespecArmedUntil = 0;

const LEGACY_COLORS = {
  amber: { text: 'text-amber-300', border: 'border-amber-600/60', bg: 'bg-amber-950/30', btn: 'from-amber-700 to-orange-700' },
  emerald: { text: 'text-emerald-300', border: 'border-emerald-600/60', bg: 'bg-emerald-950/30', btn: 'from-emerald-700 to-teal-700' },
  rose: { text: 'text-rose-300', border: 'border-rose-600/60', bg: 'bg-rose-950/30', btn: 'from-rose-700 to-red-700' },
  slate: { text: 'text-slate-400', border: 'border-slate-700', bg: 'bg-primal-900/60', btn: 'from-slate-700 to-slate-800' }
};

/** What a node is giving right now, e.g. "Now: +30% Meat/s" */
function getLegacyNodeNowText(node) {
  const r = getLegacyRank(node.id);
  if (node.id === 'battle_insight') {
    if (r < 1) return '';
    const parts = [];
    const ins = (gameState.legacy && gameState.legacy.insight) || {};
    for (const id in ins) {
      const beast = BEAST_CATALOG.find(b => b.id === id);
      const g = getTotemGuardian();
      const name = beast ? beast.name : (g && g.id === id ? g.name : 'Seal guardian');
      parts.push(name + ' +' + Math.round(Math.min(LEGACY_CONFIG.insightMaxStacks, ins[id]) * LEGACY_CONFIG.insightPerLoss * 100) + '%');
    }
    return parts.length ? 'Now: ' + parts.join(', ') : 'No losses banked yet';
  }
  if (node.capstone) return r >= 1 ? 'Active' : '';
  if (r < 1) return '';
  const pct = Math.round(r * node.perRank * 100);
  switch (node.id) {
    case 'cleavers_edge': return 'Now: +' + pct + '% Meat/s';
    case 'marrow_harvest': return 'Now: +' + pct + '% click Meat';
    case 'smokehouse': return 'Now: meals +' + pct + '% longer';
    case 'beast_bond': return 'Now: +' + pct + '% Beast Power';
    case 'nurturing_hands': return 'Now: nursery -' + pct + '%';
    case 'hybrid_training': return 'Now: enhance -' + pct + '%';
    case 'keen_instincts': return 'Now: +' + pct + '% Combat Power';
    case 'totem_breaker': return 'Now: +' + pct + '% Totem damage';
    case 'thick_hide': return 'Now: wounds -' + pct + '%';
  }
  return '';
}

function renderLegacyNode(node, c) {
  const rank = getLegacyRank(node.id);
  const open = isLegacyNodeOpen(node);
  const cost = getLegacyNodeCost(node);
  const maxed = cost === null;
  const afford = canBuyLegacyRank(node);
  const now = getLegacyNodeNowText(node);
  const needs = node.requires.filter(id => getLegacyRank(id) < 1).map(id => getLegacyNode(id).name);
  const box = node.capstone
    ? (open ? c.border + ' ' + c.bg + ' border-2' : 'border-primal-700 bg-primal-900/50 border-2')
    : (open ? 'border-primal-600 bg-primal-800/80' : 'border-primal-700 bg-primal-900/50');
  let btn;
  if (maxed) {
    btn = '<div class="w-full text-center py-1.5 rounded-lg text-[11px] font-mono font-bold ' + c.text + ' border ' + c.border + '">MAXED</div>';
  } else if (!open) {
    btn = '<div class="w-full text-center py-1.5 rounded-lg text-[11px] text-slate-500 border border-primal-700"><i class="fa-solid fa-lock mr-1"></i>Needs ' + needs.join(', ') + ' rank 1</div>';
  } else {
    btn = '<button data-legacy-node="' + node.id + '" class="w-full py-1.5 rounded-lg text-xs font-bold text-white border border-white/10 bg-gradient-to-r ' + c.btn + ' hover:brightness-110 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"' + (afford ? '' : ' disabled') + '>' +
      (rank === 0 ? 'Learn' : 'Rank up') + ' &middot; ' + formatNumber(cost) + ' Shards</button>';
  }
  return '<div class="p-3 rounded-xl border ' + box + ' space-y-2">' +
    '<div class="flex items-start gap-2.5">' +
      '<div class="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center bg-primal-900 ' + (open ? c.text : 'text-slate-600') + '"><i class="fa-solid ' + node.icon + '"></i></div>' +
      '<div class="min-w-0 flex-1">' +
        '<div class="flex items-baseline justify-between gap-2"><span class="text-sm font-bold ' + (open ? 'text-white' : 'text-slate-400') + '">' + node.name + '</span>' +
        '<span class="text-[10px] font-mono ' + (rank > 0 ? c.text : 'text-slate-500') + '">' + (node.capstone ? 'CAPSTONE' : rank + '/' + node.maxRank) + '</span></div>' +
        '<div class="text-[11px] text-slate-400 leading-snug">' + node.desc + '</div>' +
        (now ? '<div class="text-[11px] font-mono text-emerald-300 mt-0.5">' + now + '</div>' : '') +
      '</div>' +
    '</div>' + btn +
  '</div>';
}

function renderLegacyTree() {
  if (!legacyEls.tree || !gameState.legacy) return;
  legacyEls.tree.innerHTML = LEGACY_BRANCHES.map(branch => {
    const c = LEGACY_COLORS[branch.color] || LEGACY_COLORS.slate;
    let body;
    if (branch.locked) {
      const pmOpen = isPackmasterUnlocked();
      const ordersNote = (pmOpen && getWorldIndex() >= 1) ? '<div class="text-[11px] text-sky-300 font-mono"><i class="fa-solid fa-scroll mr-1"></i>Pack Orders: ' + getPackOrders() + ' / ' + PACKMASTER_CONFIG.maxOrders + '. Auto-Trophy and Auto-Strike use one each. Any click in the game refills them.</div>' : '';
      body = ordersNote + LEGACY_PACKMASTER_PREVIEW.map(p => {
        const ready = pmOpen && (p.unlock === 'seal3' || (p.unlock === 'world2' && getWorldIndex() >= 1));
        const on = ready && isAutomationOn(p.id);
        const right = ready
          ? '<button data-automation="' + p.id + '" class="shrink-0 px-3 py-1 rounded-full text-[11px] font-mono font-bold border cursor-pointer ' + (on ? 'bg-emerald-700 text-white border-emerald-400' : 'bg-primal-900 text-slate-300 border-primal-600') + '">' + (on ? 'ON' : 'OFF') + '</button>'
          : '<span class="shrink-0 text-[10px] font-mono text-slate-500"><i class="fa-solid fa-lock mr-1"></i>' + (p.unlock === 'seal3' ? 'Seal 3' : 'World 2') + '</span>';
        return '<div class="p-3 rounded-xl border ' + (ready ? 'border-sky-700/60 bg-sky-950/20' : 'border-dashed border-slate-700 bg-primal-900/40') + ' flex items-start gap-2.5">' +
          '<div class="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center bg-primal-900 ' + (ready ? 'text-sky-300' : 'text-slate-600') + '"><i class="fa-solid ' + p.icon + '"></i></div>' +
          '<div class="min-w-0 flex-1"><div class="text-sm font-bold ' + (ready ? 'text-slate-100' : 'text-slate-500') + '">' + p.name + '</div><div class="text-[11px] ' + (ready ? 'text-slate-400' : 'text-slate-500') + '">' + p.desc + '</div></div>' + right +
        '</div>';
      }).join('') +
        (pmOpen ? '' : '<div class="text-[11px] text-slate-500 text-center pt-1"><i class="fa-solid fa-lock mr-1"></i>Break Seal 3 on the Primal Totem to unlock</div>');
    } else {
      body = LEGACY_NODES.filter(n => n.branch === branch.id).map(n => renderLegacyNode(n, c)).join('<div class="flex justify-center -my-1"><i class="fa-solid fa-chevron-down text-[10px] text-slate-600"></i></div>');
    }
    return '<div class="bg-primal-850 border ' + (branch.locked ? 'border-dashed border-slate-700' : 'border-primal-700') + ' rounded-2xl p-4 shadow-xl space-y-3">' +
      '<div class="flex items-center gap-2"><i class="fa-solid ' + branch.icon + ' ' + c.text + '"></i>' +
      '<div><div class="font-cinzel font-bold ' + (branch.locked ? 'text-slate-400' : 'text-slate-100') + '">' + branch.name + '</div>' +
      '<div class="text-[10px] uppercase tracking-wider text-slate-500">' + (branch.locked && isPackmasterUnlocked() ? 'Automation' : branch.tagline) + '</div></div></div>' +
      body + '</div>';
  }).join('');
}

function getLegacySignature() {
  return gameState.totem.shards + '|' + JSON.stringify(gameState.legacy.ranks) + '|' + gameState.legacy.freeRespec + '|' + JSON.stringify(gameState.legacy.insight) + '|' + (legacyRespecArmedUntil > Date.now());
}

function updateLegacyHeader() {
  const spent = getLegacySpent();
  legacyEls.shards.textContent = formatNumber(gameState.totem.shards);
  legacyEls.spent.textContent = formatNumber(spent);
  const free = !!gameState.legacy.freeRespec;
  const armed = legacyRespecArmedUntil > Date.now();
  legacyEls.respecBtn.disabled = spent <= 0;
  legacyEls.respecBtn.textContent = armed
    ? 'Click again to refund ' + formatNumber(getLegacyRespecRefund()) + ' Shards'
    : (free ? 'Free respec' : 'Respec (keep 90%)');
  legacyEls.respecBtn.classList.toggle('border-rose-500', armed);
  legacyEls.respecNote.textContent = free
    ? 'Your free respec from the last Ascension is ready: every Shard comes back.'
    : 'Refunds all ranks minus a 10% fee. You get one free respec after each Ascension.';
}

function updateLegacyLive() {
  if (!legacyEls.tabBtn || !gameState.legacy) return;
  const unlocked = isLegacyUnlocked();
  legacyEls.tabBtn.classList.toggle('hidden', !unlocked);
  if (!unlocked) return;
  const affordable = LEGACY_NODES.filter(n => canBuyLegacyRank(n)).length;
  legacyEls.tabBadge.textContent = formatNumber(gameState.totem.shards);
  legacyEls.tabBadge.className = affordable > 0
    ? 'text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-600 px-1.5 py-0.2 rounded font-mono font-bold'
    : 'text-[9px] bg-amber-950 text-amber-300 border border-amber-700 px-1.5 py-0.2 rounded font-mono';
  if (gameState.activeTab !== 'legacy') return;
  const sig = getLegacySignature();
  if (sig !== legacySignature) {
    legacySignature = sig;
    updateLegacyHeader();
    renderLegacyTree();
  }
}

function renderLegacyPanel() {
  if (!legacyEls.tree || !gameState.legacy) return;
  legacySignature = getLegacySignature();
  updateLegacyHeader();
  renderLegacyTree();
}

if (legacyEls.tabBtn) legacyEls.tabBtn.addEventListener('click', () => switchTab('legacy'));

if (legacyEls.tree) {
  legacyEls.tree.addEventListener('click', (e) => {
    const auto = e.target.closest('[data-automation]');
    if (auto) {
      const id = auto.getAttribute('data-automation');
      if (!gameState.automation) gameState.automation = { autoBuy: false, autoTend: false };
      gameState.automation[id] = !gameState.automation[id];
      sound.playClick();
      renderLegacyPanel();
      updateAutoBuyBadge();
      saveGameToStorage();
      return;
    }
    const btn = e.target.closest('[data-legacy-node]');
    if (!btn) return;
    const node = getLegacyNode(btn.getAttribute('data-legacy-node'));
    if (node && buyLegacyRank(node.id)) {
      sound.playTone(520, 'triangle', 0.12, 0.1);
      logCombatMessage('🌳 <strong>Hunter\'s Legacy:</strong> ' + node.name + (node.capstone ? ' learned!' : ' rank ' + getLegacyRank(node.id) + '.'), 'unlock');
      renderLegacyPanel();
      renderMenagerie();
      saveGameToStorage();
    }
  });
}

if (legacyEls.respecBtn) {
  legacyEls.respecBtn.addEventListener('click', () => {
    if (getLegacySpent() <= 0) return;
    if (legacyRespecArmedUntil <= Date.now()) {
      // Two-step confirm instead of a browser dialog
      legacyRespecArmedUntil = Date.now() + 4000;
      renderLegacyPanel();
      setTimeout(renderLegacyPanel, 4100);
      return;
    }
    legacyRespecArmedUntil = 0;
    const refund = respecLegacy();
    showToast('Legacy reset. +' + formatNumber(refund) + ' Totem Shards refunded.', 'success');
    logCombatMessage('🌳 <strong>Hunter\'s Legacy reset.</strong> +' + formatNumber(refund) + ' Totem Shards refunded.', 'unlock');
    renderLegacyPanel();
    renderMenagerie();
    saveGameToStorage();
  });
}

/**
 * Combat Power breakdown popover (click / tap the Combat Power HUD)
 */
let lastPowerBreakdownAt = 0;
function renderPowerBreakdown(force) {
  const box = document.getElementById('power-breakdown');
  if (!box || box.classList.contains('hidden')) return;
  if (!force && Date.now() - lastPowerBreakdownAt < 500) return;
  lastPowerBreakdownAt = Date.now();
  const b = getCombatPowerBreakdown();
  const row = (label, val, cls) => '<div class="flex justify-between gap-4"><span class="text-slate-400 truncate">' + label + '</span><span class="font-mono ' + (cls || 'text-slate-200') + '">' + val + '</span></div>';
  const head = (t, val) => '<div class="flex justify-between gap-4 mt-2 pt-2 border-t border-primal-700 font-bold"><span class="text-amber-300">' + t + '</span><span class="font-mono text-amber-300">' + val + '</span></div>';
  const x = m => 'x' + (Math.round(m * 100) / 100);
  let html = '<div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Where your Combat Power comes from</div>';
  html += head('Hunter', formatNumber(b.hunterTotal));
  b.hunter.forEach(r => { html += row(r.label, '+' + formatNumber(r.value)); });
  if (b.sparLevel > 0) html += row('Sparring Lvl ' + b.sparLevel, x(b.sparMult), 'text-emerald-300');
  html += head('Beasts', formatNumber(b.beastTotal));
  if (!b.beasts.length) html += row('No beasts tamed this run', '0');
  b.beasts.forEach(r => { html += row(r.label, '+' + formatNumber(r.value)); });
  b.beastMults.forEach(r => { html += row(r.label, x(r.mult), 'text-emerald-300'); });
  html += head('Multipliers', b.mults.length ? x(b.mults.reduce((a, r) => a * r.mult, 1)) : 'x1');
  b.mults.forEach(r => { html += row(r.label, x(r.mult), 'text-emerald-300'); });
  html += head('Total', formatNumber(b.total));
  box.innerHTML = html;
}

(function initPowerBreakdown() {
  const card = document.getElementById('hud-power-card');
  const box = document.getElementById('power-breakdown');
  if (!card || !box) return;
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    box.classList.toggle('hidden');
    renderPowerBreakdown(true);
  });
  box.addEventListener('click', e => e.stopPropagation());
  document.addEventListener('click', () => box.classList.add('hidden'));
})();

/**
 * Generator buy amount toggle (x1 / x10 / Next milestone)
 */
function updateGenBuyModeButtons() {
  document.querySelectorAll('[data-gen-mode]').forEach(btn => {
    const on = (gameState.genBuyMode || 'x1') === btn.getAttribute('data-gen-mode');
    btn.className = 'px-2 py-1 rounded font-mono text-[11px] font-bold cursor-pointer border ' +
      (on ? 'bg-amber-600 text-white border-amber-400' : 'bg-primal-800 text-slate-300 border-primal-700 hover:text-amber-300');
  });
}
document.querySelectorAll('[data-gen-mode]').forEach(btn => {
  btn.addEventListener('click', () => {
    gameState.genBuyMode = btn.getAttribute('data-gen-mode');
    updateGenBuyModeButtons();
    renderGeneratorsLadder();
    saveGameToStorage();
  });
});
updateGenBuyModeButtons();

/**
 * ================= SAVE CODE: export / import =================
 * Code = "BT1:" + base64 of the same JSON the game keeps in localStorage.
 */
const SAVE_CODE_PREFIX = 'BT1:';
const SAVE_STORAGE_KEY = 'beast_tamer_savedata';
let importArmedUntil = 0;

function makeSaveCode() {
  saveGameToStorage();
  const raw = localStorage.getItem(SAVE_STORAGE_KEY) || '{}';
  return SAVE_CODE_PREFIX + btoa(unescape(encodeURIComponent(raw)));
}

/** Returns the save object, or throws with a readable message */
function readSaveCode(code) {
  const text = (code || '').trim();
  if (!text) throw new Error('Paste a save code first.');
  let json;
  if (text.startsWith('{')) json = text; // raw JSON also works
  else {
    const body = text.startsWith(SAVE_CODE_PREFIX) ? text.slice(SAVE_CODE_PREFIX.length) : text;
    try { json = decodeURIComponent(escape(atob(body.replace(/\s+/g, '')))); }
    catch (e) { throw new Error('That is not a valid save code.'); }
  }
  let data;
  try { data = JSON.parse(json); } catch (e) { throw new Error('That save code is damaged.'); }
  if (!data || typeof data !== 'object' || typeof data.meat !== 'number' || !data.generators) {
    throw new Error('That code is not a Beast Tamer save.');
  }
  return data;
}

function setImportMsg(text, ok) {
  const el = document.getElementById('save-import-msg');
  if (el) { el.textContent = text; el.className = 'text-[11px] font-mono ' + (ok ? 'text-emerald-300' : 'text-rose-300'); }
}

function openSaveModal() {
  const modal = document.getElementById('save-modal');
  if (!modal) return;
  document.getElementById('save-export-text').value = makeSaveCode();
  setImportMsg('', true);
  importArmedUntil = 0;
  document.getElementById('btn-import-save').innerHTML = '<i class="fa-solid fa-upload mr-1"></i>Load this save';
  modal.classList.remove('hidden');
}

(function initSaveCode() {
  const modal = document.getElementById('save-modal');
  if (!modal) return;
  const openBtn = document.getElementById('btn-save-code');
  if (openBtn) openBtn.addEventListener('click', openSaveModal);
  document.getElementById('btn-close-save').addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });

  document.getElementById('btn-copy-save').addEventListener('click', () => {
    const ta = document.getElementById('save-export-text');
    ta.value = makeSaveCode();
    const done = () => showToast('Save code copied!', 'success');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(ta.value).then(done, () => { ta.select(); document.execCommand('copy'); done(); });
    } else { ta.select(); document.execCommand('copy'); done(); }
  });

  document.getElementById('btn-download-save').addEventListener('click', () => {
    const code = makeSaveCode();
    const blob = new Blob([code], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'beast-tamer-save-' + new Date().toISOString().slice(0, 10) + '.txt';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  document.getElementById('save-import-file').addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { document.getElementById('save-import-text').value = String(reader.result || ''); setImportMsg('File loaded. Click "Load this save".', true); };
    reader.readAsText(f);
    e.target.value = '';
  });

  const importBtn = document.getElementById('btn-import-save');
  importBtn.addEventListener('click', () => {
    let data;
    try { data = readSaveCode(document.getElementById('save-import-text').value); }
    catch (err) { setImportMsg(err.message, false); return; }
    if (importArmedUntil < Date.now()) {
      // Two-step confirm instead of a browser dialog
      importArmedUntil = Date.now() + 5000;
      importBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation mr-1"></i>Click again to replace your progress';
      setImportMsg('Valid save: ' + formatNumber(data.meat) + ' Meat, ' + (data.ascensionCount || 0) + ' Ascensions.', true);
      setTimeout(() => { if (importArmedUntil <= Date.now()) importBtn.innerHTML = '<i class="fa-solid fa-upload mr-1"></i>Load this save'; }, 5100);
      return;
    }
    // No offline Meat for the time the code sat in a clipboard
    data.lastSavedAt = Date.now();
    isResetting = true; // stop the page from saving over the import while it reloads
    localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(data));
    window.location.reload();
  });
})();

/**
 * ================= SEAL 2: TROPHY WEAPON UI =================
 */
let trophySignature = '';
function updateTrophyLive() {
  const box = document.getElementById('trophy-box');
  if (!box || !gameState.trophy) return;
  const unlocked = isTrophyUnlocked();
  box.classList.toggle('hidden', !unlocked);
  if (!unlocked) return;
  const t = gameState.trophy;
  const lvl = getTrophyLevel();
  const cost = getTrophyForgeCost();
  const sig = t.fangs + '|' + lvl;
  const btn = document.getElementById('btn-forge-trophy');
  btn.disabled = cost === null || t.fangs < cost;
  if (sig === trophySignature) return;
  trophySignature = sig;
  const cur = lvl > 0 ? TROPHY_WEAPONS[lvl - 1] : null;
  const nxt = lvl < TROPHY_WEAPONS.length ? TROPHY_WEAPONS[lvl] : null;
  document.getElementById('trophy-name').textContent = cur ? cur.name + ' (Lv ' + lvl + '/' + TROPHY_WEAPONS.length + ')' : 'Unforged';
  document.getElementById('trophy-icon').innerHTML = '<i class="fa-solid ' + (cur ? cur.icon : 'fa-khanda') + '"></i>';
  document.getElementById('trophy-bonus').textContent = lvl > 0
    ? '+' + Math.round(lvl * TROPHY_CONFIG.powerPerLevel * 100) + '% Combat Power, +' + Math.round(lvl * TROPHY_CONFIG.clickPerLevel * 100) + '% base click Meat'
    : 'Forge it to gain Combat Power and click Meat';
  document.getElementById('trophy-fangs').textContent = formatNumber(t.fangs);
  document.getElementById('trophy-next').textContent = nxt
    ? 'Next: ' + nxt.name + ' (+' + Math.round(TROPHY_CONFIG.powerPerLevel * 100) + '% Combat Power, +' + Math.round(TROPHY_CONFIG.clickPerLevel * 100) + '% click Meat)'
    : 'Fully forged: Worldender';
  document.getElementById('trophy-cost').textContent = cost === null ? 'MAX' : formatNumber(cost);
}
(function initTrophy() {
  const btn = document.getElementById('btn-forge-trophy');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (!forgeTrophyWeapon()) return;
    const w = TROPHY_WEAPONS[getTrophyLevel() - 1];
    sound.playWin();
    showToast('Forged the ' + w.name + '!', 'success', true);
    logCombatMessage('🗡️ <strong>TROPHY WEAPON FORGED:</strong> ' + w.name + '. Now +' + Math.round(getTrophyLevel() * TROPHY_CONFIG.powerPerLevel * 100) + '% Combat Power.', 'unlock');
    trophySignature = '';
    updateTrophyLive();
    saveGameToStorage();
  });
})();

/**
 * ================= BATTLE ARENA: fight presentation, results and reveals =================
 * The engine rolls the fight the moment you click; the arena only acts out that result.
 */
const arena = {
  overlay: document.getElementById('arena-overlay'),
  card: document.getElementById('arena-card'),
  stage: document.getElementById('arena-stage'),
  tier: document.getElementById('arena-tier'),
  title: document.getElementById('arena-title'),
  skip: document.getElementById('arena-skip'),
  hunter: document.getElementById('arena-hunter'),
  beast: document.getElementById('arena-beast'),
  hunterHp: document.getElementById('arena-hunter-hp'),
  beastHp: document.getElementById('arena-beast-hp'),
  hunterPower: document.getElementById('arena-hunter-power'),
  beastPower: document.getElementById('arena-beast-power'),
  beastImg: document.getElementById('arena-beast-img'),
  beastName: document.getElementById('arena-beast-name'),
  dialWin: document.getElementById('arena-dial-win'),
  needle: document.getElementById('arena-needle'),
  odds: document.getElementById('arena-odds'),
  callout: document.getElementById('arena-callout'),
  result: document.getElementById('arena-result'),
  resultArt: document.getElementById('arena-result-art'),
  banner: document.getElementById('arena-result-banner'),
  sub: document.getElementById('arena-result-sub'),
  roll: document.getElementById('arena-result-roll'),
  rewards: document.getElementById('arena-result-rewards'),
  cont: document.getElementById('arena-continue'),
  timers: [],
  raf: null,
  autoClose: null,
  active: false
};

const FIGHT_ANIM_MS = { full: 5200, quick: 1300, skip: 0 };

function getFightAnimMode() {
  return ['full', 'quick', 'skip'].includes(gameState.fightAnim) ? gameState.fightAnim : 'full';
}

/** A dial value v (0..1) as a point on the half circle; 0 = far left */
function dialPoint(v, r) {
  const a = Math.PI * (1 - v);
  return { x: 60 + r * Math.cos(a), y: 60 - r * Math.sin(a) };
}

function setDial(winChance) {
  const p = dialPoint(Math.max(0.0001, Math.min(0.9999, winChance)), 50);
  arena.dialWin.setAttribute('d', 'M10 60 A50 50 0 0 1 ' + p.x.toFixed(2) + ' ' + p.y.toFixed(2));
}

function setNeedle(v) {
  const p = dialPoint(Math.max(0, Math.min(1, v)), 44);
  arena.needle.setAttribute('x2', p.x.toFixed(2));
  arena.needle.setAttribute('y2', p.y.toFixed(2));
}

/** Wild portrait by default; the full-body tamed art when asked (falls back to the portrait, then the old sprite) */
function getBeastArt(beast, tamed) {
  const base = (beast && beast.baseId) ? (BEAST_CATALOG.find(b => b.id === beast.baseId) || beast) : beast;
  return (tamed && base && base.tamedImage) ? base.tamedImage : beast.image;
}

function applyBeastImage(img, beast, tamed) {
  img.onerror = () => { img.onerror = null; if (beast.fallbackImage) img.src = beast.fallbackImage; };
  img.src = getBeastArt(beast, tamed);
  img.alt = beast.name;
  img.style.filter = beast.imageFilter || '';
}

function clearArenaTimers() {
  arena.timers.forEach(t => clearTimeout(t));
  arena.timers = [];
  if (arena.raf) cancelAnimationFrame(arena.raf);
  arena.raf = null;
  if (arena.autoClose) clearTimeout(arena.autoClose);
  arena.autoClose = null;
}

function pulse(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

function showCallout(text, color) {
  arena.callout.textContent = text;
  arena.callout.className = 'h-7 text-center font-cinzel font-bold text-lg callout-pop ' + (color || 'text-amber-300');
}

/**
 * Build a fight script: a list of blows that ends with the right winner.
 * Close rolls stay close to the end; long-shot wins come back from the brink.
 */
function buildFightScript(win, winChance, roll, blows) {
  const margin = Math.abs(roll - winChance);
  const close = margin < 0.08;
  const longShot = win && winChance < 0.3;
  let hp = { hunter: 100, beast: 100 };
  const script = [];
  for (let i = 0; i < blows; i++) {
    const last = i === blows - 1;
    const late = i >= blows - 2;
    let attacker;
    if (last) attacker = win ? 'hunter' : 'beast';
    else if (longShot && i < blows / 2) attacker = 'beast';
    else if (longShot) attacker = 'hunter';
    else attacker = Math.random() < (win ? 0.55 : 0.45) ? 'hunter' : 'beast';
    const target = attacker === 'hunter' ? 'beast' : 'hunter';
    let dmg;
    if (last) dmg = hp[target];
    else {
      const floor = close || late ? 12 : 5;
      const room = Math.max(0, hp[target] - floor);
      const share = longShot && attacker === 'beast' ? 0.45 : (close ? 0.3 : 0.38);
      dmg = Math.min(room, Math.round((0.6 + Math.random() * 0.8) * share * hp[target]));
    }
    hp[target] = Math.max(0, hp[target] - dmg);
    script.push({ attacker, target, hpAfter: hp[target], big: dmg >= 30 || last });
  }
  return script;
}

/** Called by the engine when a fight starts. Returns how long to wait before resolving it (ms). */
function fightPresenterStart(beast, winChance, roll) {
  const mode = getFightAnimMode();
  const ms = FIGHT_ANIM_MS[mode];
  if (!arena.overlay || ms <= 0) return 0;
  clearArenaTimers();
  arena.active = true;
  const win = roll <= winChance;
  const isApex = !!beast.isApex, isGuardian = !!beast.isGuardian;
  arena.tier.textContent = getFightTierLabel(beast);
  arena.title.textContent = beast.name;
  arena.beastName.textContent = beast.name;
  applyBeastImage(arena.beastImg, beast);
  const b = getEffectiveBossBracket(beast);
  arena.hunterPower.textContent = 'Power ' + formatNumber(getCombatPowerVs(beast));
  arena.beastPower.textContent = 'Power ' + formatNumber(b.min) + ' - ' + formatNumber(b.max);
  arena.hunterHp.style.width = '100%';
  arena.beastHp.style.width = '100%';
  setDial(winChance);
  arena.odds.textContent = 'Odds ' + (winChance * 100).toFixed(1) + '%';
  setNeedle(0.5);
  arena.stage.classList.remove('hidden');
  arena.callout.textContent = '';
  arena.result.classList.add('hidden');
  arena.skip.classList.remove('hidden');
  arena.overlay.classList.remove('hidden');

  // Blows
  const blows = mode === 'full' ? 7 : 2;
  const script = buildFightScript(win, winChance, roll, blows);
  const start = 350, span = ms - 700;
  script.forEach((s, i) => {
    arena.timers.push(setTimeout(() => {
      const atk = s.attacker === 'hunter' ? arena.hunter : arena.beast;
      const def = s.target === 'hunter' ? arena.hunter : arena.beast;
      atk.style.setProperty('--lunge', s.attacker === 'hunter' ? '22px' : '-22px');
      pulse(atk.querySelector('.arena-fighter'), 'arena-lunge');
      pulse(def.querySelector('.arena-fighter'), 'arena-hit');
      (s.target === 'hunter' ? arena.hunterHp : arena.beastHp).style.width = s.hpAfter + '%';
      if (s.big) pulse(arena.card, 'arena-shake');
      sound.playTone(s.attacker === 'hunter' ? 300 : 150, s.big ? 'sawtooth' : 'square', 0.12, s.big ? 0.12 : 0.07);
    }, start + span * (i + 1) / (blows + 0.5)));
  });

  // Needle: wanders, then creeps toward the real roll, lingering near the edge on close calls
  const t0 = performance.now();
  const close = Math.abs(roll - winChance) < 0.08;
  const wobble = Math.random() * 6.28;
  const step = (now) => {
    const t = Math.min(1, (now - t0) / ms);
    let v;
    if (t < 0.55) v = 0.5 + 0.42 * Math.sin(t * 14 + wobble) * (1 - t);
    else {
      const k = (t - 0.55) / 0.45;
      const from = 0.5 + 0.42 * Math.sin(0.55 * 14 + wobble) * 0.45;
      const edge = close ? winChance + (roll > winChance ? 0.01 : -0.01) : roll;
      v = k < 0.75 ? from + (edge - from) * (k / 0.75) : edge + (roll - edge) * ((k - 0.75) / 0.25);
    }
    setNeedle(v);
    if (t < 1 && arena.active) arena.raf = requestAnimationFrame(step);
  };
  arena.raf = requestAnimationFrame(step);
  if (close && mode === 'full') arena.timers.push(setTimeout(() => showCallout('It could go either way...', 'text-orange-300'), ms * 0.6));
  return ms;
}

function rewardChip(icon, text, color) {
  return '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border ' + (color || 'border-amber-600/50 bg-amber-950/40 text-amber-200') + '"><i class="fa-solid ' + icon + '"></i>' + text + '</span>';
}

function confettiBurst() {
  const colors = ['#f59e0b', '#22c55e', '#e879f9', '#38bdf8', '#f43f5e'];
  for (let i = 0; i < 40; i++) {
    const d = document.createElement('div');
    d.className = 'confetti-bit';
    d.style.left = Math.random() * 100 + '%';
    d.style.background = colors[i % colors.length];
    d.style.animationDelay = (Math.random() * 0.4) + 's';
    arena.card.appendChild(d);
    setTimeout(() => d.remove(), 2400);
  }
}

/** Called by the engine after a fight resolves, with what changed */
function fightPresenterEnd(s) {
  if (!arena.overlay) return;
  const beast = s.beast, win = s.win;
  const relicId = s.after.relics.find(id => !s.before.relics.includes(id));
  const relic = relicId ? RELIC_REGISTRY[relicId] : null;
  const titanWin = win && !!beast.isTitan;
  const firstTame = win && !beast.isApex && !beast.isGuardian && !beast.isTitan && !s.before.tamed.includes(beast.id);
  const sealBroken = win && beast.isGuardian;
  const apexWin = win && beast.isApex;
  const newBest = s.after.bestApex > s.before.bestApex;
  const bigMoment = titanWin || firstTame || sealBroken || newBest || !!relic || (win && s.winChance < 0.25);
  const mode = getFightAnimMode();
  if (!arena.active && !(bigMoment && mode === 'skip')) return; // nothing to show
  if (!arena.active) {
    // Skip mode: still celebrate the big moments
    arena.active = true;
    arena.tier.textContent = getFightTierLabel(beast);
    arena.title.textContent = beast.name;
    arena.overlay.classList.remove('hidden');
  }
  clearArenaTimers();
  setNeedle(s.roll);
  arena.skip.classList.add('hidden');
  arena.stage.classList.add('hidden');
  arena.callout.textContent = '';

  // Art: the beast (or the relic) front and center
  if (relic) {
    arena.resultArt.innerHTML = '<div class="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-2xl bg-amber-950/80 border-2 border-amber-400 flex items-center justify-center text-amber-300 text-6xl reveal-pop reveal-glow"><i class="fa-solid ' + relic.icon + '"></i></div>';
  } else {
    if (firstTame && getBeastArt(beast, true) !== beast.image) {
      // The tame reveal: your new pack-mate, full body, with a TAMED stamp
      arena.resultArt.innerHTML = '<div class="tamed-reveal reveal-pop"><img alt=""><div class="tamed-stamp">TAMED</div></div>';
      applyBeastImage(arena.resultArt.querySelector('img'), beast, true);
    } else {
      arena.resultArt.innerHTML = '<div class="monster-portrait-frame mx-auto !w-44 !h-44 sm:!w-64 sm:!h-64 reveal-pop ' + (win ? 'reveal-glow' : 'opacity-60 grayscale') + '"><img class="monster-portrait-img" alt=""></div>';
      applyBeastImage(arena.resultArt.querySelector('img'), beast);
    }
  }

  // Banner + subtitle
  let banner, color, sub;
  if (!win) { banner = 'DEFEATED'; color = 'text-red-500'; sub = 'The ' + beast.name + ' drove you off. Wounded for ' + Math.round(s.after.wound) + 's.'; }
  else if (titanWin) { banner = 'TITAN SLAIN!'; color = 'text-amber-300'; sub = 'The ' + beast.name + ' falls. The Rift to the next world is open: see the World tab.'; }
  else if (sealBroken) { banner = 'SEAL ' + beast.sealNumber + ' BROKEN!'; color = 'text-rose-300'; sub = 'The ' + beast.name + ' falls and the Totem opens deeper.'; }
  else if (apexWin) { banner = 'APEX TAMED!'; color = 'text-fuchsia-300'; sub = beast.name + ' joins your pack.'; }
  else if (firstTame) { banner = 'TAMED!'; color = 'text-emerald-300'; sub = beast.name + ' bonds with you.'; }
  else if (relic) { banner = (relic.rarity === 'Legendary' ? 'LEGENDARY ' : '') + 'RELIC FOUND!'; color = 'text-amber-300'; sub = relic.name + ': ' + relic.desc; }
  else { banner = 'TROPHY WON'; color = 'text-amber-300'; sub = 'No relic this time. Refight to roll again.'; }
  arena.banner.textContent = banner;
  arena.banner.className = 'font-cinzel font-bold text-3xl sm:text-4xl callout-pop ' + color;
  arena.sub.textContent = sub;

  // The honest roll, plus near-miss / long-shot flavor
  const need = (s.winChance * 100).toFixed(1), got = (s.roll * 100).toFixed(1);
  let rollTxt = 'Rolled ' + got + ' · needed ' + need + ' or less';
  if (!win && s.roll - s.winChance < 0.05) rollTxt += ' · SO CLOSE!';
  if (win && s.winChance < 0.25) rollTxt += ' · LONG SHOT!';
  arena.roll.textContent = rollTxt;

  // Rewards
  const chips = [];
  if (firstTame) {
    chips.push(rewardChip('fa-paw', '+' + formatNumber(beast.rewardPower) + ' Beast Power', 'border-emerald-600/50 bg-emerald-950/40 text-emerald-200'));
    if (s.after.highestTier > s.before.highestTier) {
      const nb = BEAST_CATALOG.find(b => b.tier === s.after.highestTier);
      if (nb) chips.push(rewardChip('fa-unlock', 'Tier ' + nb.tier + ' unlocked: ' + nb.name));
    }
    if (beast.id === 'chimera_wyrm') chips.push(rewardChip('fa-crown', 'Apex Ladder and Ascension open', 'border-fuchsia-600/50 bg-fuchsia-950/40 text-fuchsia-200'));
  }
  if (apexWin) {
    chips.push(rewardChip('fa-paw', 'Combat Power x' + getApexPowerMult().toFixed(2) + ' this run', 'border-emerald-600/50 bg-emerald-950/40 text-emerald-200'));
    chips.push(rewardChip('fa-gem', 'Bloodstones x' + getApexStoneMult().toFixed(2), 'border-rose-600/50 bg-rose-950/40 text-rose-200'));
    if (s.after.fangs > s.before.fangs) chips.push(rewardChip('fa-tooth', '+' + (s.after.fangs - s.before.fangs) + ' Apex Fangs', 'border-fuchsia-600/50 bg-fuchsia-950/40 text-fuchsia-200'));
    if (newBest) chips.push(rewardChip('fa-medal', 'New deepest Apex!'));
  }
  if (sealBroken) {
    chips.push(rewardChip('fa-gem', '+' + formatNumber(s.after.stones - s.before.stones) + ' Bloodstones', 'border-rose-600/50 bg-rose-950/40 text-rose-200'));
    chips.push(rewardChip('fa-hand-fist', '+' + Math.round(TOTEM_CONFIG.sealPowerBonus * 100) + '% Combat Power'));
  }
  if (s.after.shards > s.before.shards) chips.push(rewardChip('fa-shapes', '+' + formatNumber(s.after.shards - s.before.shards) + ' Totem Shards'));
  if (relic && (firstTame || apexWin || sealBroken)) chips.push(rewardChip('fa-trophy', relic.name));
  arena.rewards.innerHTML = chips.join('');
  arena.result.classList.remove('hidden');

  if (win) { sound.playWin(); if (bigMoment) confettiBurst(); } else sound.playDefeat();
  // Quick fights close themselves unless it's a moment worth savoring
  if (mode !== 'full' && !bigMoment) arena.autoClose = setTimeout(closeArena, 1600);
}

function closeArena() {
  clearArenaTimers();
  arena.active = false;
  if (arena.overlay) arena.overlay.classList.add('hidden');
}

(function initArena() {
  if (!arena.overlay) return;
  arena.skip.addEventListener('click', () => {
    clearArenaTimers();
    finishPendingFightNow();
  });
  arena.cont.addEventListener('click', () => { closeArena(); if (gameState.activeTab === 'relics') renderBestiary(); });
  arena.overlay.addEventListener('click', e => { if (e.target === arena.overlay && !arena.result.classList.contains('hidden')) closeArena(); });
  document.addEventListener('keydown', e => {
    if (!arena.active) return;
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
      if (!arena.result.classList.contains('hidden')) { e.preventDefault(); closeArena(); }
      else if (e.key === 'Escape') { clearArenaTimers(); finishPendingFightNow(); }
    }
  });
  const speed = document.getElementById('fight-anim-select');
  if (speed) {
    speed.value = getFightAnimMode();
    speed.addEventListener('change', () => { gameState.fightAnim = speed.value; saveGameToStorage(); });
  }
  // Click the Hunt portrait to see the beast up close
  const box = document.getElementById('beast-avatar-box');
  const lb = document.getElementById('portrait-lightbox');
  if (box && lb) {
    box.addEventListener('click', () => {
      const beast = getSelectedFightTarget();
      applyBeastImage(document.getElementById('lightbox-img'), beast);
      document.getElementById('lightbox-name').textContent = beast.name;
      lb.classList.remove('hidden');
    });
    lb.addEventListener('click', () => lb.classList.add('hidden'));
  }
})();

/**
 * ================= BESTIARY =================
 * Every beast you've met, big. Ones you haven't met yet are silhouettes.
 */
function getBestiaryEntries() {
  const list = [];
  const bestTier = gameState.highestTierUnlocked || 1;
  BEAST_CATALOG.forEach(b => {
    list.push({ beast: b, group: 'Milestone Beasts', label: 'Tier ' + b.tier, seen: b.tier <= bestTier || !!getBestiaryRecord(b.id).firstTamed });
  });
  if (gameState.totem && gameState.totem.unlocked) {
    // A guardian is discovered once you've reached its Seal
    const sealsShown = (gameState.totem.sealsBroken || 0) + (isTotemSealLayer(gameState.totem.layer) ? 1 : 0);
    for (let k = 1; k <= Math.max(sealsShown + 1, 4); k++) {
      list.push({ beast: getGuardianAt(k), group: 'Totem Guardians', label: 'Seal ' + k, seen: k <= sealsShown });
    }
  }
  if ((gameState.bestApexDepth || 0) > 0 || isApexUnlocked()) {
    const shown = (gameState.bestApexDepth || 0) + 1;
    for (let k = 1; k <= Math.max(shown, 8); k++) {
      list.push({ beast: getApexBossAt(k), group: 'Apex Ladder', label: 'Apex Tier ' + (4 + k), seen: k <= shown });
    }
  }
  return list;
}

function getBestiaryRecord(id) {
  return (gameState.bestiary && gameState.bestiary[id]) || {};
}

function renderBestiary() {
  const grid = document.getElementById('bestiary-grid');
  if (!grid) return;
  const entries = getBestiaryEntries();
  let seen = 0;
  let html = '';
  let group = '';
  entries.forEach((e, i) => {
    if (e.group !== group) {
      group = e.group;
      html += '<div class="col-span-full text-[11px] uppercase tracking-wider text-slate-400 font-semibold pt-2">' + group + '</div>';
    }
    const b = e.beast;
    const rec = getBestiaryRecord(b.id);
    const fights = rec.fights || 0;
    if (e.seen) seen++;
    const filter = e.seen ? (b.imageFilter || '') : 'brightness(0) opacity(0.55)';
    const stats = e.seen
      ? (rec.firstTamed ? '<span class="text-emerald-300"><i class="fa-solid fa-check mr-1"></i>Tamed ' + new Date(rec.firstTamed).toLocaleDateString() + '</span>' : '<span class="text-slate-500">Not tamed yet</span>') +
        '<br>' + (rec.wins || 0) + ' wins · ' + Math.max(0, fights) + ' fights' + (rec.bestOdds ? ' · best odds ' + (rec.bestOdds * 100).toFixed(0) + '%' : '')
      : '<span class="text-slate-600">Not discovered</span>';
    html += '<button data-bestiary="' + i + '" class="text-left p-2.5 rounded-xl border ' + (e.seen ? 'bg-primal-800/90 border-primal-600 hover:border-amber-500/60 cursor-zoom-in' : 'bg-primal-900/60 border-primal-800 cursor-default') + ' flex flex-col gap-1.5">' +
      '<div class="monster-portrait-frame !w-full !h-32"><img class="monster-portrait-img" src="' + b.image + '" style="filter:' + filter + '" alt=""></div>' +
      '<div class="text-[10px] font-mono uppercase text-amber-400">' + e.label + '</div>' +
      '<div class="text-xs font-bold ' + (e.seen ? 'text-slate-100' : 'text-slate-600') + ' leading-tight">' + (e.seen ? b.name : '???') + '</div>' +
      (e.seen ? '<div class="text-[10px] text-slate-400 italic leading-snug">' + (b.isApex || b.isGuardian ? BEAST_CATALOG.find(x => x.id === b.baseId).desc : b.desc) + '</div>' : '') +
      '<div class="text-[10px] font-mono text-slate-400 leading-snug">' + stats + '</div>' +
    '</button>';
  });
  grid.innerHTML = html;
  const c = document.getElementById('bestiary-count');
  if (c) c.textContent = seen + '/' + entries.length;
  grid.querySelectorAll('[data-bestiary]').forEach(btn => {
    btn.addEventListener('click', () => {
      const e = entries[Number(btn.dataset.bestiary)];
      if (!e || !e.seen) return;
      applyBeastImage(document.getElementById('lightbox-img'), e.beast);
      document.getElementById('lightbox-name').textContent = e.beast.name;
      document.getElementById('portrait-lightbox').classList.remove('hidden');
    });
  });
}

/**
 * Seal 3 Packmaster: run automation once a second, and show an Auto-Buy toggle on the generator list
 */
function updateAutoBuyBadge() {
  const btn = document.getElementById('btn-auto-buy');
  if (!btn) return;
  const open = isPackmasterUnlocked();
  btn.classList.toggle('hidden', !open);
  const on = isAutomationOn('autoBuy');
  btn.textContent = 'Auto ' + (on ? 'ON' : 'OFF');
  btn.className = (open ? '' : 'hidden ') + 'px-2 py-1 rounded font-mono text-[11px] font-bold cursor-pointer border ' + (on ? 'bg-emerald-700 text-white border-emerald-400' : 'bg-primal-800 text-slate-300 border-primal-700');
}
(function initAutomation() {
  const btn = document.getElementById('btn-auto-buy');
  if (btn) btn.addEventListener('click', () => {
    if (!isPackmasterUnlocked()) return;
    gameState.automation.autoBuy = !gameState.automation.autoBuy;
    updateAutoBuyBadge();
    if (gameState.activeTab === 'legacy') renderLegacyPanel();
    saveGameToStorage();
  });
  updateAutoBuyBadge();
  setInterval(() => {
    const did = runAutomation();
    if (did.bought > 0) renderGeneratorsLadder();
    if (did.tended && gameState.activeTab === 'forge') renderForge();
    updateAutoBuyBadge();
  }, 1000);
})();


/**
 * ================= WORLDS UI =================
 */
function getFightTierLabel(b) {
  if (b.isGuardian) return 'Totem Seal ' + b.sealNumber;
  if (b.isTitan) return 'World Titan';
  return (b.isApex ? 'Apex Tier ' : 'Tier ') + b.tier;
}

/** Fill every hardcoded boss name in the page with this world's names */
function applyWorldText() {
  document.querySelectorAll('[data-beast-name]').forEach(el => {
    const b = BEAST_CATALOG[+el.getAttribute('data-beast-name')];
    if (b) el.textContent = b.name;
  });
  const wn = document.getElementById('hud-world-name');
  if (wn) wn.textContent = getWorld().name;
  // Each world themes the whole page (colors, paper, background) through CSS variables
  document.body.dataset.world = getWorld().id;
}

let migrateArmedUntil = 0;
let worldSignature = '';

function worldStatusOf(i) {
  const w = WORLDS[i];
  if (i < getWorldIndex()) return 'cleared';
  if (i === getWorldIndex()) return 'current';
  if (w.comingSoon) return 'soon';
  return 'locked';
}

function renderWorldTab() {
  const root = document.getElementById('world-content');
  if (!root) return;
  const w = getWorld();
  const next = WORLDS[getWorldIndex() + 1];
  const depth = getApexDepth();
  const need = WORLD_CONFIG.titanAfterApexTier - 4;
  const titan = getTitanBoss();
  const pct = Math.min(100, Math.max(depth, gameState.bestApexDepth || 0) / need * 100);
  const armed = migrateArmedUntil > Date.now();

  let titanHtml;
  if (gameState.riftOpen) {
    titanHtml = '<div class="text-emerald-300 font-bold"><i class="fa-solid fa-circle-check mr-1"></i>' + w.titan.name + ' slain. The Rift is open.</div>';
  } else if (titan) {
    const b = getEffectiveBossBracket(titan);
    titanHtml = '<div class="text-amber-300 font-bold mb-2"><i class="fa-solid fa-triangle-exclamation mr-1"></i>' + titan.name + ' is awake! Power ' + formatNumber(b.min) + ' - ' + formatNumber(b.max) + '</div>' +
      '<button data-world-action="fight-titan" class="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-700 to-rose-700 text-white font-cinzel font-bold text-sm border border-amber-400/60 cursor-pointer hover:brightness-110">Hunt the Titan</button>';
  } else {
    titanHtml = '<div class="text-slate-400">Sleeping. Reach Apex Tier ' + WORLD_CONFIG.titanAfterApexTier + ' to wake the <strong class="text-slate-200">' + w.titan.name + '</strong>. Once awake it stays awake, and it does not grow stronger when you Ascend.</div>' +
      '<div class="mt-2 h-2 rounded-full bg-primal-900 overflow-hidden border border-primal-700"><div class="h-full bg-gradient-to-r from-fuchsia-600 to-amber-500" style="width:' + pct + '%"></div></div>' +
      '<div class="text-[11px] font-mono text-slate-500 mt-1">Deepest Apex: ' + (Math.max(depth, gameState.bestApexDepth || 0) > 0 ? 'Tier ' + (4 + Math.max(depth, gameState.bestApexDepth || 0)) : 'none yet') + ' / Tier ' + WORLD_CONFIG.titanAfterApexTier + '</div>';
  }

  let migrateHtml;
  if (!next) {
    migrateHtml = '<div class="text-slate-400 text-sm">You have reached the farthest known world.</div>';
  } else if (next.comingSoon) {
    migrateHtml = '<div class="text-slate-400 text-sm"><i class="fa-solid fa-hourglass-half mr-1"></i>The ' + next.name + ' is coming in a future update. Keep climbing: everything here still counts.</div>';
  } else {
    const nextMeat = Math.pow(WORLD_CONFIG.bonusMeatPerWorld, getWorldIndex() + 1);
    const nextPow = 1 + WORLD_CONFIG.bonusPowerPerWorld * (getWorldIndex() + 1);
    migrateHtml =
      '<div class="grid sm:grid-cols-2 gap-3 text-xs">' +
        '<div class="p-3 rounded-lg border border-rose-800/60 bg-rose-950/20"><div class="font-bold text-rose-300 mb-1">Resets</div><div class="text-slate-300 leading-relaxed">Everything an Ascension resets, plus Bloodstones, Bloodstone Perks, Ascension count, Hybrids, the Nest egg, and your deepest Apex.</div></div>' +
        '<div class="p-3 rounded-lg border border-emerald-800/60 bg-emerald-950/20"><div class="font-bold text-emerald-300 mb-1">Keeps</div><div class="text-slate-300 leading-relaxed">Relics, Beast Forge, Primal Totem, Hunter\'s Legacy (with a free respec), Trophy Weapon, Fishing and the Bestiary.</div></div>' +
      '</div>' +
      '<div class="text-xs text-slate-300 mt-3">New World Bonus: <strong class="text-amber-300">Meat/s x' + formatNumber(nextMeat) + '</strong> and <strong class="text-amber-300">Combat Power x' + nextPow.toFixed(1) + '</strong>, forever. Unlocks <strong class="text-sky-300">Auto-Trophy</strong> and <strong class="text-sky-300">Auto-Strike</strong>.</div>' +
      '<button data-world-action="migrate" ' + (canMigrate() ? '' : 'disabled') + ' class="mt-3 w-full py-3 rounded-xl font-cinzel font-bold text-sm border cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ' + (armed ? 'bg-rose-700 border-rose-400 text-white' : 'bg-gradient-to-r from-sky-800 via-indigo-700 to-sky-800 border-sky-400/50 text-white') + '">' +
        (armed ? 'CLICK AGAIN TO MIGRATE TO THE ' + next.name.toUpperCase() : (gameState.riftOpen ? 'STEP THROUGH THE RIFT' : 'Slay the Titan to open the Rift')) + '</button>';
  }

  const mapHtml = WORLDS.map((x, i) => {
    const st = worldStatusOf(i);
    const rec = (gameState.worldRecords || {})[x.id] || {};
    const badge = { cleared: '<span class="text-emerald-300">Cleared</span>', current: '<span class="text-amber-300">You are here</span>', soon: '<span class="text-slate-500">Coming soon</span>', locked: '<span class="text-slate-500"><i class="fa-solid fa-lock mr-1"></i>Locked</span>' }[st];
    const recLine = st === 'cleared'
      ? 'Ascensions: ' + (rec.ascensions || 0) + ' · deepest Apex: Tier ' + (4 + (rec.bestApex || 0))
      : (st === 'current' ? 'Ascensions here: ' + gameState.ascensionCount + ' · deepest Apex: ' + (gameState.bestApexDepth ? 'Tier ' + (4 + gameState.bestApexDepth) : 'none yet') : '');
    const img = BEAST_CATALOG[BEAST_CATALOG.length - 1];
    const art = (st === 'soon' || st === 'locked')
      ? '<div class="w-14 h-14 rounded-xl bg-primal-900 border border-primal-700 flex items-center justify-center text-slate-600 text-2xl"><i class="fa-solid ' + x.icon + '"></i></div>'
      : '<img src="' + img.image + '" class="w-14 h-14 rounded-xl object-cover border border-primal-600" style="filter:' + (x.filter || 'none') + '" alt="">';
    return '<div class="flex items-center gap-3 p-3 rounded-xl border ' + (st === 'current' ? 'border-amber-500/60 bg-amber-950/20' : 'border-primal-700 bg-primal-900/50') + '">' + art +
      '<div class="min-w-0 flex-1"><div class="flex items-center justify-between gap-2"><div class="font-cinzel font-bold text-slate-100"><i class="fa-solid ' + x.icon + ' mr-1 text-slate-400"></i>World ' + (i + 1) + ': ' + x.name + '</div><div class="text-[11px] font-mono">' + badge + '</div></div>' +
      '<div class="text-[11px] text-slate-400">' + x.blurb + '</div>' + (recLine ? '<div class="text-[10px] font-mono text-slate-500 mt-0.5">' + recLine + '</div>' : '') + '</div></div>';
  }).join('');

  const bz = getBlizzardState();
  const twistHtml = w.twist === 'blizzard'
    ? '<div class="text-xs text-sky-200 mt-2 space-y-1"><div><i class="fa-solid fa-wind mr-1"></i><strong>Blizzards:</strong> every ' + Math.round(WORLD_CONFIG.blizzard.everySec / 60) + ' minutes a blizzard freezes your camp for ' + Math.round(WORLD_CONFIG.blizzard.lastSec / 60) + ' minutes (Meat/s x' + WORLD_CONFIG.blizzard.meatMult + '). ' + (bz.active ? 'One is raging now.' : 'Next in ' + formatDuration(bz.nextIn) + '.') + '</div>' +
      '<div><i class="fa-solid fa-fire mr-1"></i><strong>Stoke the Hearth:</strong> during a blizzard, Forage clicks and Stoke (' + WORLD_CONFIG.blizzard.stokeStamina + ' Stamina) fill your Warmth. Full Warmth thaws your camp and ends the slowdown early.</div>' +
      '<div><i class="fa-solid fa-cube mr-1"></i><strong>Frozen Caches:</strong> every blizzard leaves one behind (hold up to ' + WORLD_CONFIG.blizzard.maxCaches + '). Each thaws in ' + Math.round(WORLD_CONFIG.blizzard.cacheThawSec / 60) + ' minutes, or chip the ice with Stamina. Inside: Meat, Totem Shards or Apex Fangs, and rarely a Mammoth Cache with all three.</div></div>'
    : '';

  root.innerHTML =
    '<div class="bg-gradient-to-br from-sky-950/40 via-primal-850 to-primal-900 border border-sky-700/50 rounded-2xl p-5 sm:p-6 shadow-xl">' +
      '<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/90 border border-sky-600/50 text-sky-300 text-xs font-mono font-bold"><i class="fa-solid ' + w.icon + '"></i> World ' + (getWorldIndex() + 1) + '</div>' +
      '<h2 class="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide mt-1">' + w.name + '</h2>' +
      '<p class="text-xs text-slate-400 max-w-2xl">' + w.blurb + '</p>' + twistHtml +
      (getWorldIndex() > 0 ? '<div class="text-xs text-amber-200 mt-2"><i class="fa-solid fa-star mr-1"></i>World Bonus: Meat/s x' + formatNumber(getWorldMeatMult()) + ', Combat Power x' + getWorldPowerMult().toFixed(1) + '</div>' : '') +
    '</div>' +
    '<div class="grid lg:grid-cols-2 gap-6">' +
      '<div class="bg-primal-850 border border-primal-700 rounded-2xl p-5 shadow-xl space-y-2"><div class="font-cinzel font-bold text-slate-100"><i class="fa-solid fa-mountain mr-1 text-amber-400"></i>The Titan</div>' + titanHtml + '</div>' +
      '<div class="bg-primal-850 border border-primal-700 rounded-2xl p-5 shadow-xl"><div class="font-cinzel font-bold text-slate-100 mb-2"><i class="fa-solid fa-hurricane mr-1 text-sky-400"></i>Migration' + (next ? ' to the ' + next.name : '') + '</div>' + migrateHtml + '</div>' +
    '</div>' +
    '<div class="bg-primal-850 border border-primal-700 rounded-2xl p-5 shadow-xl space-y-3"><div class="font-cinzel font-bold text-slate-100"><i class="fa-solid fa-map mr-1 text-emerald-400"></i>World Map</div>' + mapHtml + '</div>';
}

function formatDuration(sec) {
  sec = Math.max(0, Math.round(sec));
  const m = Math.floor(sec / 60), s = sec % 60;
  return m > 0 ? m + 'm ' + (s < 10 ? '0' : '') + s + 's' : s + 's';
}

/** World 2 strip under the header: blizzard + Warmth on the left, Frozen Caches on the right */
function renderTundraStrip() {
  const el = document.getElementById('blizzard-banner');
  if (!el) return;
  if (getWorld().twist !== 'blizzard') { el.classList.add('hidden'); return; }
  el.classList.remove('hidden');
  const c = WORLD_CONFIG.blizzard, bz = getBlizzardState(), raging = isBlizzardRaging(), t = getTundra();
  let left;
  if (raging) {
    const w = Math.round(getWarmthPct() * 100);
    left = '<div class="flex-1 min-w-[220px]"><div class="font-bold text-sky-100"><i class="fa-solid fa-snowflake fa-spin mr-1"></i>BLIZZARD! Meat/s x' + c.meatMult + ' for ' + formatDuration(bz.secsLeft) + '</div>' +
      '<div class="text-[11px] text-sky-200/80">Forage clicks and Stoke warm the hearth. Fill it to thaw your camp early.</div>' +
      '<div class="flex items-center gap-2 mt-1"><div class="flex-1 h-2.5 rounded-full bg-sky-950 border border-sky-700 overflow-hidden"><div class="h-full bg-gradient-to-r from-amber-500 to-orange-500" style="width:' + w + '%"></div></div>' +
      '<span class="font-mono text-[11px] text-amber-200">' + w + '%</span>' +
      '<button data-tundra="stoke" ' + (gameState.stamina >= c.stokeStamina ? '' : 'disabled') + ' class="px-2 py-1 rounded bg-orange-700 hover:bg-orange-600 text-white text-[11px] font-bold border border-orange-400/60 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"><i class="fa-solid fa-fire mr-1"></i>Stoke (' + c.stokeStamina + ' Stamina)</button></div></div>';
  } else if (bz.active) {
    left = '<div class="flex-1 min-w-[220px] text-amber-200"><i class="fa-solid fa-fire mr-1"></i><strong>Camp thawed.</strong> The blizzard rages on outside, but your hearth holds it back (' + formatDuration(bz.secsLeft) + ' left).</div>';
  } else {
    left = '<div class="flex-1 min-w-[220px] text-sky-200"><i class="fa-solid fa-wind mr-1"></i>Calm skies. Next blizzard in <span class="font-mono">' + formatDuration(bz.nextIn) + '</span>.</div>';
  }
  const icons = [];
  for (let i = 0; i < c.maxCaches; i++) {
    const x = t.caches[i];
    if (!x) icons.push('<div class="w-8 h-8 rounded-lg border border-dashed border-sky-800 bg-sky-950/40"></div>');
    else {
      const pct = Math.round((1 - x.left / c.cacheThawSec) * 100);
      icons.push('<div class="relative w-8 h-8 rounded-lg border ' + (x.left <= 0 ? 'border-amber-400 bg-amber-900/60 text-amber-200' : 'border-sky-400/70 bg-sky-800/60 text-sky-100') + ' flex items-center justify-center overflow-hidden" title="' + (x.left <= 0 ? 'Thawed: open it!' : 'Thawing: ' + formatDuration(x.left) + ' left') + '">' +
        (x.left > 0 ? '<div class="absolute bottom-0 inset-x-0 bg-amber-500/30" style="height:' + (i === 0 ? pct : 0) + '%"></div>' : '') + '<i class="relative fa-solid ' + (x.left <= 0 ? 'fa-box-open' : 'fa-cube') + '"></i></div>');
    }
  }
  const first = t.caches[0];
  let btn = '';
  if (first && first.left <= 0) btn = '<button data-tundra="open" class="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-bold border border-amber-300 cursor-pointer"><i class="fa-solid fa-box-open mr-1"></i>Open Cache</button>';
  else if (first) btn = '<button data-tundra="chip" ' + (gameState.stamina >= c.chipStamina ? '' : 'disabled') + ' class="px-2.5 py-1 rounded bg-sky-800 hover:bg-sky-700 text-white text-[11px] font-bold border border-sky-400/60 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed" title="Thaws the oldest cache ' + Math.round(c.chipSec / 60) + ' min faster"><i class="fa-solid fa-hammer mr-1"></i>Chip ice (' + c.chipStamina + ' Stamina) · ' + formatDuration(first.left) + '</button>';
  const right = '<div class="flex items-center gap-2"><div class="text-[11px] text-sky-200/80 mr-1">Frozen Caches</div>' + icons.join('') + btn + '</div>';
  const cls = 'mb-4 px-4 py-2.5 rounded-xl border text-sm shadow-lg flex flex-wrap items-center gap-3 ' + (raging ? 'border-sky-300/70 bg-sky-900/70' : 'border-sky-800/60 bg-sky-950/50');
  const html = left + right;
  // Only touch the DOM when something changed, so a click never lands on a button that was just replaced
  if (el.className !== cls) el.className = cls;
  if (el._html !== html) { el._html = html; el.innerHTML = html; }
}

function getWorldSignature() {
  const bz = getBlizzardState();
  return [gameState.world, getApexDepth(), gameState.riftOpen, !!getTitanBoss(), migrateArmedUntil > Date.now(), gameState.isBattling, bz.active, Math.floor(bz.nextIn / 60)].join('|');
}

function updateWorldLive() {
  const btn = document.getElementById('tab-btn-world');
  if (btn) btn.classList.toggle('hidden', !(isApexUnlocked() || getWorldIndex() > 0 || gameState.ascensionCount > 0));
  const badge = document.getElementById('tab-world-badge');
  if (badge) {
    const awake = !!getTitanBoss();
    badge.textContent = gameState.riftOpen ? 'Rift' : (awake ? 'Titan!' : 'W' + (getWorldIndex() + 1));
    badge.className = 'text-[9px] px-1.5 py-0.2 rounded font-mono border ' + (gameState.riftOpen || awake ? 'bg-amber-900 text-amber-200 border-amber-500 font-bold' : 'bg-sky-950 text-sky-300 border-sky-700');
  }
  tickTundra(1);
  renderTundraStrip();
  if (gameState.activeTab !== 'world') return;
  const sig = getWorldSignature();
  if (sig !== worldSignature) { worldSignature = sig; renderWorldTab(); }
}

(function initWorlds() {
  // Pack Orders refill whenever you actually play (any click), so automation helps but you still check in
  document.addEventListener('pointerdown', (e) => { if (e.isTrusted && typeof refreshPackOrders === 'function') refreshPackOrders(); }, true);
  applyWorld();
  applyWorldText();
  const btn = document.getElementById('tab-btn-world');
  if (btn) btn.addEventListener('click', () => switchTab('world'));
  const root = document.getElementById('world-content');
  if (root) root.addEventListener('click', (e) => {
    const a = e.target.closest('[data-world-action]');
    if (!a || a.disabled) return;
    const act = a.getAttribute('data-world-action');
    if (act === 'fight-titan') {
      gameState.selectedBeastIndex = TITAN_SLOT;
      updateBeastSelectorOptions();
      switchTab('hunt');
    } else if (act === 'migrate') {
      if (migrateArmedUntil > Date.now()) {
        migrateArmedUntil = 0;
        if (performMigration()) {
          applyWorldText();
          renderGeneratorsLadder();
        }
      } else {
        migrateArmedUntil = Date.now() + 5000;
      }
      worldSignature = '';
      renderWorldTab();
    }
  });
  const strip = document.getElementById('blizzard-banner');
  if (strip) strip.addEventListener('click', (e) => {
    const b = e.target.closest('[data-tundra]');
    if (!b || b.disabled) return;
    const act = b.getAttribute('data-tundra');
    if (act === 'stoke' && stokeHearth()) sound.playTone(330, 'triangle', 0.1, 0.08);
    if (act === 'chip' && chipFrozenCache()) sound.playTone(880, 'square', 0.05, 0.05);
    if (act === 'open' && openFrozenCache()) { sound.playWin(); if (typeof confettiBurst === 'function') confettiBurst(); }
    renderTundraStrip();
    saveGameToStorage();
  });
  setInterval(updateWorldLive, 1000);
})();

setInterval(saveGameToStorage, 10000);

window.addEventListener('DOMContentLoaded', () => {
  const lastSavedAt = loadGameFromStorage();
  applyWorldText();
  updateBeastSelectorOptions();
  renderGeneratorsLadder();
  renderTrophyCabinet();
  renderMenagerie();
  renderAscensionAltar();
  renderFishingDock();
  renderTotemStatic();
  renderLegacyPanel();
  switchTab(gameState.activeTab || 'camp');

  gameState.lastWallTime = Date.now();
  logCombatMessage('Camp initialized. Ready for primal hunts and trophy expeditions.', 'default');
  if (gameState.pendingNotice) { logCombatMessage('💎 ' + gameState.pendingNotice, 'relic'); showToast(gameState.pendingNotice, 'success', true); delete gameState.pendingNotice; saveGameToStorage(); }

  if (lastSavedAt) {
    const offlineSec = Math.max(0, (Date.now() - lastSavedAt) / 1000);
    if (offlineSec >= 5) {
      advanceSimulation(offlineSec, true);
    }
  }

  requestAnimationFrame(gameLoop);
});