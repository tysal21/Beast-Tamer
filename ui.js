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
    showToast('Beast Forge unlocks after taming the Boar-Hawk!', 'warning');
    return;
  }
  if (tabId === 'ascend' && !isAscensionUnlocked()) {
    showToast('Ascension Altar unlocks after taming the Tier 4 Chimera-Wyrm!', 'warning');
    return;
  }

  if (tabId === 'totem' && !isTotemUnlocked()) {
    showToast('The Primal Totem rises after you tame the Chimera-Wyrm.', 'warning');
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
    { id: 'ascend', btn: elements.tabBtnAscend, panel: elements.panelAscend }
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
      elements.ascendReqNote.textContent = 'Requires taming Tier 4 Chimera-Wyrm on this run';
      elements.ascendReqNote.className = 'text-[11px] text-amber-400 font-mono';
    } else if (gameState.isBattling) {
      elements.ascendReqNote.textContent = 'Finish the current battle first';
      elements.ascendReqNote.className = 'text-[11px] text-amber-400 font-mono';
    } else {
      elements.ascendReqNote.textContent = 'Ritual ready. More run Meat & Power = more Bloodstones';
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

      row.className = 'bg-primal-800/80 border border-primal-700 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3';
      row.innerHTML =
        '<div class="flex items-center space-x-3">' +
          '<div class="w-10 h-10 rounded-lg bg-stone-900 border border-purple-500/40 flex items-center justify-center text-purple-400 text-lg shadow-inner">' +
            '<i class="fa-solid ' + parent.icon + '"></i>' +
          '</div>' +
          '<div>' +
            '<div class="flex items-center gap-2">' +
              '<span class="font-bold text-slate-100 text-sm">' + parent.name + '</span>' +
              '<span class="text-xs bg-purple-950 text-purple-300 border border-purple-700/60 font-mono px-2 py-0.2 rounded-full font-bold">Lvl ' + lvl + '</span>' +
              '<span class="text-[10px] font-mono px-1.5 py-0.2 rounded ' + readyClass + '">' + readyLabel + '</span>' +
            '</div>' +
            '<div class="text-[11px] text-emerald-400 font-mono mt-0.5">Passive: ' + parent.passive + '</div>' +
          '</div>' +
        '</div>' +
        '<button data-beast-id="' + parent.id + '" data-parent-id="' + parent.id + '" class="nurture-btn btn-level-parent w-full sm:w-auto px-3.5 py-2 bg-gradient-to-r from-purple-800 to-purple-700 hover:from-purple-700 hover:to-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg border border-purple-500/50 flex items-center justify-center gap-2 font-mono cursor-pointer" ' + disabledAttr + '>' +
          '<span>Nurture (Lvl ' + (lvl + 1) + ')</span>' +
          '<span class="text-amber-300 flex items-center gap-1 font-bold">' +
            '<i class="fa-solid fa-drumstick-bite text-[11px]"></i> ' + formatNumber(cost) +
          '</span>' +
        '</button>';
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
          'Requires: ' + hybrid.parent1 + ' (Lvl ' + p1Lvl + '/5) &amp; ' + hybrid.parent2 + ' (Lvl ' + p2Lvl + '/5)' +
        '</div>';
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
              '<div class="text-[10px] text-slate-400 font-mono">Treat: ' + hybrid.treatName + ' (' + hybrid.gestationSec + 's)</div>' +
            '</div>' +
          '</div>' +
          '<span class="text-[10px] font-mono px-2 py-0.5 rounded ' + pwrBadgeClass + '">+' + formatNumber(hybrid.basePower) + ' Pwr</span>' +
        '</div>' +
        '<p class="text-[11px] text-slate-300 leading-relaxed mt-1">' + hybrid.desc + '</p>' +
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
    elements.armoryNextBenefit.textContent = 'Apex Beast-Bone Glaive Equipped!';
    elements.btnCraftWeapon.classList.add('hidden');
  }

  // Camp Enhancements
  const endCost = getCampEnduranceCost();
  const isEndMaxed = maxStamina >= 100;
  elements.campEnduranceLvl.textContent = gameState.campEnduranceLevel;
  elements.campEnduranceBonus.textContent = '+' + (gameState.campEnduranceLevel * 2) + ' Max';
  if (isEndMaxed) {
    elements.btnBuyEnduranceLabel.textContent = 'Max Capacity (100)';
    elements.btnBuyEnduranceCostWrap.classList.add('hidden');
    elements.btnBuyEndurance.disabled = true;
  } else {
    elements.campEnduranceCost.textContent = formatNumber(endCost);
    elements.btnBuyEnduranceLabel.textContent = 'Fortify';
    elements.btnBuyEnduranceCostWrap.classList.remove('hidden');
    elements.btnBuyEndurance.disabled = gameState.meat < endCost;
  }

  const recCost = getCampRecoveryCost();
  const isRecMaxed = regenInterval <= 6.0;
  elements.campRecoveryLvl.textContent = gameState.campRecoveryLevel;
  elements.campRecoveryInterval.textContent = regenInterval.toFixed(1) + 's';
  if (isRecMaxed) {
    elements.btnBuyRecoveryLabel.textContent = 'Fastest Floor (6.0s)';
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
      btn.disabled = gameState.meat < getGeneratorCost(gen);
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

  if (!gameState.isSparring) {
    elements.btnSparLabel.textContent = 'SPAR WITH PACK (LVL ' + gameState.sparringLevel + ')';
  }
  const canSpar = gameState.meat >= sparCost && gameState.stamina >= sparStaminaCost && !gameState.isSparring;
  elements.btnSpar.disabled = !canSpar;

  // Active Encounter Details
  const activeBeast = getSelectedFightTarget();
  const isGuardianFight = !!activeBeast.isGuardian;
  const isAlreadyTamed = !isGuardianFight && !!gameState.tamedBeasts[activeBeast.id];
  const bracket = getEffectiveBossBracket(activeBeast);
  const effMin = bracket.min;
  const effMax = bracket.max;

  elements.encounterTierBadge.textContent = isGuardianFight ? 'Totem Seal ' + activeBeast.sealNumber : 'Tier ' + activeBeast.tier;
  elements.beastName.textContent = activeBeast.name;
  elements.beastDesc.textContent = activeBeast.desc;
  elements.beastPowerMin.textContent = formatNumber(effMin);
  elements.beastPowerMax.textContent = formatNumber(effMax);

  if (isGuardianFight) {
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

  if (isGuardianFight) {
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
    const cost = getGeneratorCost(gen);
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
            '<i class="fa-solid fa-bolt"></i>' + milestoneMult + 'x Overdrive' +
          '</span>'
        : '';
      const nextMilestoneHtml = nextMilestone
        ? '<span class="text-[10px] text-slate-500">Next: ' + nextMilestone.totalMult + 'x at ' + nextMilestone.count + ' (' + count + '/' + nextMilestone.count + ')</span>'
        : '<span class="text-[10px] font-bold text-amber-400">MAX OVERDRIVE</span>';
      const disabledAttr = canAfford ? '' : 'disabled';

      const iconInnerHtml = gen.image
        ? '<img src="' + gen.image + '" alt="' + gen.name + '" class="w-full h-full object-contain p-0.5" onerror="this.style.display=\'none\'" />'
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
          '<span>Deploy</span>' +
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

      const cost = getGeneratorCost(gen);
      if (gameState.meat >= cost) {
        sound.playBuy();
        gameState.meat -= cost;
        gameState.generators[gen.id] = (gameState.generators[gen.id] || 0) + 1;
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
    const isOwned = hasRelic(key);
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

      card.className = 'p-4 rounded-xl border flex items-start space-x-3.5 transition-all ' + cardBorder;
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
          '<div class="text-[10px] text-slate-400 font-mono mt-1">Source: ' + beastName + ' Trophy</div>' +
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
      card.className = 'bg-primal-800/90 border border-primal-700/80 rounded-xl p-2.5 flex items-center space-x-3 shadow-inner hover:border-amber-500/40 transition-colors';
      card.innerHTML =
        '<img src="' + beast.image + '" alt="' + beast.name + '" class="menagerie-thumb" onerror="this.onerror=null; this.src=\'' + beast.fallbackImage + '\';" />' +
        '<div class="flex-1 min-w-0">' +
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

  let critChance = 0;
  if (hasRelic('serpents_fang')) critChance += 0.10;
  if (hasRelic('magma_stinger')) critChance += 0.15;

  const venompincerLvl = getActiveHybridLevel('venompincer');
  if (venompincerLvl > 0) {
    critChance += (0.02 * venompincerLvl);
  }

  if (critChance > 0 && Math.random() < critChance) {
    isCrit = true;
    const critMultiplier = 5 * (1 + (0.15 * venompincerLvl));
    earned = Math.floor(earned * critMultiplier);
  }

  addMeat(earned);
  sound.playClick();
  if (isTotemUnlocked()) dealTotemDamage(getTotalCombatPower() * TOTEM_CONFIG.clickPct);

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
  if (gameState.meat >= cost && getMaxStamina() < 100) {
    sound.playBuy();
    gameState.meat -= cost;
    gameState.campEnduranceLevel += 1;
    saveGameToStorage();
  }
});

elements.btnBuyRecovery.addEventListener('click', () => {
  const cost = getCampRecoveryCost();
  if (gameState.meat >= cost && getStaminaRegenInterval() > 6.0) {
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

    const tuskpionLvl = getActiveHybridLevel('tuskpion');
    const breakthroughChance = 0.20 + (tuskpionLvl * 0.10);

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
  if (isPerfect || fish.rarity === 'rare' || fish.rarity === 'legendary') sound.playWin(); else sound.playBuy();

  let msg = (isPerfect ? '<span class="text-amber-300 font-bold">PERFECT!</span> ' : '') +
    'Caught ' + (bonusStored > 0 ? (1 + bonusStored) + '× ' : 'a ') + '<strong class="' + style.text + '">' + style.label + ' ' + fish.name + '</strong>!';
  if (res.isNewCodex) msg += ' <span class="text-amber-300">New Codex entry: ' + fish.codexLabel + '</span>';
  if (!res.stored) msg += ' <span class="text-red-400">Basket full, so you released it.</span>';
  setFishResult(msg, 'text-slate-200');

  if (res.isNewCodex) {
    showToast('FISH CODEX: ' + fish.name + ' (' + fish.codexLabel + ')', 'success', fish.rarity === 'legendary');
    logCombatMessage('🎣 <strong>NEW CODEX ENTRY!</strong> Caught a ' + style.label + ' <strong>' + fish.name + '</strong>. Permanent bonus: ' + fish.codexLabel + '.', 'relic');
  } else if (fish.rarity === 'legendary') {
    showToast('LEGENDARY CATCH: ' + fish.name + '!', 'success', true);
  }
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

/** Full rebuild of the dock's lists (recipes, codex) and static numbers */
function renderFishingDock() {
  if (!fishEls.codexGrid || !gameState.fishing) return;
  const f = gameState.fishing;

  // Recipes
  fishEls.recipes.innerHTML = '';
  FISH_RECIPES.forEach(recipe => {
    const effects = recipe.buffs.map(b => FISH_BUFFS[b].effect).join(', ');
    const row = document.createElement('div');
    row.className = 'p-3 rounded-lg border bg-primal-800/90 border-primal-700 flex items-center justify-between gap-3';
    row.innerHTML =
      '<div class="min-w-0">' +
        '<div class="text-xs font-bold text-slate-100 flex items-center gap-1.5"><i class="fa-solid ' + recipe.icon + ' text-orange-400"></i>' + recipe.name + '</div>' +
        '<div class="text-[11px] text-emerald-300 mt-0.5">' + effects + ' &middot; ' + Math.round(recipe.durationSec / 60) + ' min</div>' +
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
    const style = FISH_RARITY_STYLE[fish.rarity];
    const count = f.basket[fish.id] || 0;
    const card = document.createElement('div');
    card.className = 'p-3 rounded-xl border flex flex-col gap-1.5 ' + (caught ? 'bg-primal-800/90 border-primal-600' : 'bg-primal-900/60 border-primal-800');
    card.innerHTML =
      '<div class="flex items-center justify-between">' +
        '<span class="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ' + style.badge + '">' + style.label + '</span>' +
        (caught ? '<span class="text-[11px] font-mono font-bold ' + (count > 0 ? 'text-slate-100' : 'text-slate-600') + '">×' + count + '</span>' : '') +
      '</div>' +
      '<div class="flex items-center gap-2">' +
        '<i class="fa-solid ' + (caught ? fish.icon + ' ' + style.text : 'fa-question text-slate-600') + ' text-lg w-5 text-center"></i>' +
        '<div class="text-xs font-bold ' + (caught ? 'text-slate-100' : 'text-slate-600') + ' leading-tight">' + (caught ? fish.name : '???') + '</div>' +
      '</div>' +
      (caught ? '<p class="text-[10px] text-slate-400 leading-snug">' + fish.desc + '</p>' : '') +
      '<div class="text-[11px] font-mono font-semibold ' + (caught ? 'text-emerald-300' : 'text-slate-600') + '">' +
        (caught ? '<i class="fa-solid fa-check mr-1"></i>' : '<i class="fa-solid fa-lock mr-1"></i>') + fish.codexLabel +
      '</div>';
    fishEls.codexGrid.appendChild(card);
  });

  const totals = [];
  const meat = getFishCodexBonus('meat'), click = getFishCodexBonus('click'), power = getFishCodexBonus('power');
  const regen = getFishCodexBonus('regen'), wound = getFishCodexBonus('wound'), stam = getFishCodexBonus('maxStamina');
  if (meat) totals.push('+' + Math.round(meat * 100) + '% Meat/sec');
  if (click) totals.push('+' + Math.round(click * 100) + '% Click');
  if (power) totals.push('+' + Math.round(power * 100) + '% Power');
  if (regen) totals.push('+' + Math.round(regen * 100) + '% Regen');
  if (stam) totals.push('+' + stam + ' Max Stamina');
  if (wound) totals.push('-' + Math.round(wound * 100) + '% Wounds');
  fishEls.codexTotals.innerHTML = totals.length ? 'Codex bonuses:<br><span class="text-emerald-300">' + totals.join(' &middot; ') + '</span>' : 'No Codex bonuses yet';

  fishEls.codexCount.textContent = codexCount + '/' + FISH_CATALOG.length;
  fishEls.totalCaught.textContent = formatNumber(f.totalCaught || 0);

  fishDockSignature = getFishDockSignature();
}

function getFishDockSignature() {
  const f = gameState.fishing;
  return JSON.stringify([f.basket, f.codex, f.lines, f.rodLevel]);
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
  fishEls.rodEffect.innerHTML = 'Catch zone +' + Math.round(f.rodLevel * FISHING_CONFIG.rod.zoneBonusPerLevel * 100) + '% &middot; Rare &amp; Legendary odds +' + Math.round(f.rodLevel * FISHING_CONFIG.rod.rareWeightPerLevel * 100) + '%';
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
      '<div class="text-[11px] text-slate-400">' + u.desc + ' <span class="font-mono ' + (reached ? 'text-amber-300' : 'text-slate-500') + '">' + (reached ? 'Revealed, coming soon' : 'Coming soon') + '</span></div></div>' +
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

setInterval(saveGameToStorage, 10000);

window.addEventListener('DOMContentLoaded', () => {
  const lastSavedAt = loadGameFromStorage();
  updateBeastSelectorOptions();
  renderGeneratorsLadder();
  renderTrophyCabinet();
  renderMenagerie();
  renderAscensionAltar();
  renderFishingDock();
  renderTotemStatic();
  switchTab(gameState.activeTab || 'camp');

  gameState.lastWallTime = Date.now();
  logCombatMessage('Camp initialized. Ready for primal hunts and trophy expeditions.', 'default');

  if (lastSavedAt) {
    const offlineSec = Math.max(0, (Date.now() - lastSavedAt) / 1000);
    if (offlineSec >= 5) {
      advanceSimulation(offlineSec, true);
    }
  }

  requestAnimationFrame(gameLoop);
});