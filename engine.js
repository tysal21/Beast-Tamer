/**
 * Web Audio API Synthesizer (Zero external audio URLs)
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.1, startGain = 0.15) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(startGain, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio safe fail
    }
  }

  playClick() {
    this.playTone(320, 'triangle', 0.08, 0.1);
  }

  playBuy() {
    this.playTone(540, 'sine', 0.12, 0.12);
    setTimeout(() => this.playTone(720, 'sine', 0.15, 0.1), 60);
  }

  playWin() {
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.25, 0.2), idx * 80);
    });
  }

  playDefeat() {
    this.playTone(180, 'sawtooth', 0.25, 0.15);
    setTimeout(() => this.playTone(110, 'sawtooth', 0.35, 0.18), 100);
  }

  playSpar() {
    this.playTone(280, 'triangle', 0.1, 0.15);
    setTimeout(() => this.playTone(340, 'triangle', 0.12, 0.15), 100);
  }
}

const sound = new SoundEngine();

/**
 * Constants & Number Formatting Helper
 */
const MAX_OFFLINE_SECONDS = 43200; // 12 hours max offline catch-up
const FORGE_EXCAVATE_COST = 20000000; // Meat to excavate Beast Forge
const BEAST_MASTERY_PER_LEVEL = 0.1; // +Beast Power % per Beast Mastery level
const WIN_CHANCE_FLOOR = 0.01; // Lowest possible odds once you meet a boss's minimum power
let isResetting = false;

function formatNumber(num, forceDecimals = false) {
  if (!Number.isFinite(num)) return '0';
  const abs = Math.abs(num);
  if (abs >= 1e12) return (num / 1e12).toFixed(2) + 'T';
  if (abs >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (abs >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (forceDecimals) return num.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return Math.floor(num).toLocaleString();
}

/**
 * Global Game State
 */
const gameState = {
  meat: 0,
  runMeatEarned: 0,
  lifetimeMeat: 0,
  baseClickPower: 1,

  // Armory / Weapon progression
  weaponTier: 0,

  // Stamina system
  stamina: 30,
  staminaMaxBase: 30,
  staminaIntervalSec: 15,

  // Camp Provisions Upgrades
  campEnduranceLevel: 0,
  campRecoveryLevel: 0,

  // 6-Tier Generator Ladder counts
  generators: {
    snare_lines: 0,
    hunting_pack: 0,
    heavy_deadfalls: 0,
    pheromone_pits: 0,
    subjugated_dens: 0,
    harpoon_rigs: 0
  },

  // Hunter Training Disciplines
  bruteConditioningLevel: 0,
  beastMasteryLevel: 0,
  weakpointAnatomyLevel: 0,
  sparringLevel: 0,
  isSparring: false,
  adrenalineFocusRemaining: 0,

  baseHunterPower: 5,

  // Bosses & Relics
  selectedBeastIndex: 0,
  highestTierUnlocked: 1,
  tamedBeasts: {},
  ownedRelics: {},

  // Active tab
  activeTab: 'camp',

  // Combat states
  isBattling: false,
  inCooldown: false,
  cooldownRemaining: 0,
  cooldownDurationBase: 30.0,

  // Phase 2: Forge, Nursery & Hybrids
  forgeUnlocked: false,
  parentLevels: {
    viper_hound: 1,
    boar_hawk: 1,
    grizzly_scorpion: 1,
    chimera_wyrm: 1
  },
  incubator: null,
  hybrids: {},

  // Phase 3: Primal Ascension & Realm Expansions
  bloodstones: 0,
  ascensionCount: 0,
  ascensionPerks: {},
  unlockedExpansions: {},

  // Expansion I: Primal Fishing Dock (persists through Ascension)
  fishing: defaultFishingState(),

  lastWallTime: Date.now()
};

function addMeat(amount) {
  if (!Number.isFinite(amount) || amount <= 0) return;
  gameState.meat += amount;
  gameState.runMeatEarned += amount;
  gameState.lifetimeMeat += amount;
}

/**
 * ================= EXPANSION I: PRIMAL FISHING DOCK =================
 */
function defaultFishingState() {
  return {
    lines: 1,
    rodLevel: 0,
    lineTimer: 0,
    basket: {},
    codex: {},
    buffs: { meat: 0, regen: 0, power: 0 },
    totalCaught: 0
  };
}

function isFishingUnlocked() {
  return !!(gameState.unlockedExpansions && gameState.unlockedExpansions.primal_fishing);
}

/** Sum of permanent Codex bonuses of one type (only species you've caught count) */
function getFishCodexBonus(type) {
  const f = gameState.fishing;
  if (!f || !f.codex) return 0;
  let total = 0;
  for (const fish of FISH_CATALOG) {
    if (f.codex[fish.id] && fish.codex.type === type) total += fish.codex.value;
  }
  return total;
}

function isFishBuffActive(buffId) {
  return !!(gameState.fishing && gameState.fishing.buffs && gameState.fishing.buffs[buffId] > 0);
}

function getFishBuffMult(buffId) {
  return isFishBuffActive(buffId) ? FISH_BUFFS[buffId].mult : 1;
}

function getFishBasketCount() {
  const basket = (gameState.fishing && gameState.fishing.basket) || {};
  let n = 0;
  for (const id in basket) n += basket[id] || 0;
  return n;
}

function getFishCountByRarity(rarity) {
  const basket = gameState.fishing.basket;
  let n = 0;
  for (const fish of FISH_CATALOG) {
    if (fish.rarity === rarity) n += basket[fish.id] || 0;
  }
  return n;
}

function getRodUpgradeCost() {
  const rod = FISHING_CONFIG.rod;
  if (gameState.fishing.rodLevel >= rod.maxLevel) return null;
  return Math.floor(rod.baseCost * Math.pow(rod.costScale, gameState.fishing.rodLevel));
}

function getNextLineCost() {
  const lines = FISHING_CONFIG.lines;
  if (gameState.fishing.lines >= lines.maxLines) return null;
  return lines.costs[gameState.fishing.lines];
}

/** Skill-check settings for a fish, with the rod's wider catch zone applied */
function getSkillCheckFor(fish) {
  const base = FISHING_CONFIG.skillCheck[fish.rarity];
  const zone = Math.min(0.9, base.zone * (1 + gameState.fishing.rodLevel * FISHING_CONFIG.rod.zoneBonusPerLevel));
  return Object.assign({}, base, { zone });
}

/** Pick a random species. allowedRarities limits the pool (Idle Lines can't catch rare fish). */
function rollFish(allowedRarities = ['common', 'uncommon', 'rare', 'legendary']) {
  const rodBoost = 1 + gameState.fishing.rodLevel * FISHING_CONFIG.rod.rareWeightPerLevel;
  const weights = allowedRarities.map(r => {
    const w = FISHING_CONFIG.rarityWeights[r];
    return (r === 'rare' || r === 'legendary') ? w * rodBoost : w;
  });
  const total = weights.reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  let rarity = allowedRarities[allowedRarities.length - 1];
  for (let i = 0; i < allowedRarities.length; i++) {
    if (roll < weights[i]) { rarity = allowedRarities[i]; break; }
    roll -= weights[i];
  }
  const pool = FISH_CATALOG.filter(f => f.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Register a catch. The Codex entry unlocks even if the basket is full (the fish is released). */
function landFish(fish) {
  const f = gameState.fishing;
  const isNewCodex = !f.codex[fish.id];
  if (isNewCodex) f.codex[fish.id] = true;
  f.totalCaught = (f.totalCaught || 0) + 1;
  let stored = false;
  if (getFishBasketCount() < FISHING_CONFIG.basketCap) {
    f.basket[fish.id] = (f.basket[fish.id] || 0) + 1;
    stored = true;
  }
  return { stored, isNewCodex };
}

function canCookRecipe(recipe) {
  for (const rarity in recipe.needs) {
    if (getFishCountByRarity(rarity) < recipe.needs[rarity]) return false;
  }
  return true;
}

/** Consume ingredients (most plentiful species first) and start/extend the meal buffs */
function cookRecipe(recipe) {
  if (!isFishingUnlocked() || !canCookRecipe(recipe)) return false;
  const basket = gameState.fishing.basket;
  for (const rarity in recipe.needs) {
    let need = recipe.needs[rarity];
    while (need > 0) {
      const species = FISH_CATALOG
        .filter(f => f.rarity === rarity && (basket[f.id] || 0) > 0)
        .sort((a, b) => basket[b.id] - basket[a.id])[0];
      if (!species) break;
      basket[species.id] -= 1;
      if (basket[species.id] <= 0) delete basket[species.id];
      need--;
    }
  }
  recipe.buffs.forEach(b => {
    gameState.fishing.buffs[b] = Math.min(FISHING_CONFIG.buffMaxSec, (gameState.fishing.buffs[b] || 0) + recipe.durationSec);
  });
  return true;
}

function buyRodUpgrade() {
  const cost = getRodUpgradeCost();
  if (cost === null || gameState.meat < cost) return false;
  gameState.meat -= cost;
  gameState.fishing.rodLevel += 1;
  return true;
}

function buyFishingLine() {
  const cost = getNextLineCost();
  if (cost === null || gameState.meat < cost) return false;
  gameState.meat -= cost;
  gameState.fishing.lines += 1;
  return true;
}

/** Seconds until the next meal buff runs out (0 if none active) */
function getNextFishBuffExpiry() {
  if (!gameState.fishing) return 0;
  let next = 0;
  for (const id in gameState.fishing.buffs) {
    const rem = gameState.fishing.buffs[id];
    if (rem > 0 && (next === 0 || rem < next)) next = rem;
  }
  return next;
}

function tickFishBuffs(dt) {
  if (!gameState.fishing) return;
  for (const id in gameState.fishing.buffs) {
    if (gameState.fishing.buffs[id] > 0) gameState.fishing.buffs[id] = Math.max(0, gameState.fishing.buffs[id] - dt);
  }
}

/** Idle Lines: each line lands a common/uncommon fish every catchIntervalSec. Returns fish caught. */
function tickFishingLines(dt) {
  if (!isFishingUnlocked() || !gameState.fishing || gameState.fishing.lines <= 0) return 0;
  const f = gameState.fishing;
  const interval = FISHING_CONFIG.lines.catchIntervalSec;
  if (getFishBasketCount() >= FISHING_CONFIG.basketCap) {
    f.lineTimer = interval; // lines sit full until you make room
    return 0;
  }
  f.lineTimer += dt * f.lines;
  let caught = 0;
  while (f.lineTimer >= interval) {
    if (getFishBasketCount() >= FISHING_CONFIG.basketCap) { f.lineTimer = interval; break; }
    f.lineTimer -= interval;
    landFish(rollFish(['common', 'uncommon']));
    caught++;
  }
  return caught;
}

/**
 * Ascension & Perk Helpers
 */
function getAscensionPerkLevel(perkId) {
  if (!gameState.ascensionPerks) return 0;
  return gameState.ascensionPerks[perkId] || 0;
}

function getAscensionPerkCost(perk) {
  const lvl = getAscensionPerkLevel(perk.id);
  return Math.floor(perk.baseCost * Math.pow(perk.costScale, lvl));
}

function isAscensionUnlocked() {
  return !!gameState.tamedBeasts['chimera_wyrm'] || gameState.ascensionCount > 0;
}

function canAscendNow() {
  return !!gameState.tamedBeasts['chimera_wyrm'] && !gameState.isBattling;
}

function calculatePendingBloodstones() {
  if (!gameState.tamedBeasts['chimera_wyrm']) return 0;
  const meatFactor = Math.pow(Math.max(1, gameState.runMeatEarned / 25000000), 0.25);
  // Square-root curve so late-run power stacking can't explode the payout
  const powerFactor = Math.sqrt(1 + (getTotalCombatPower() / 100000));
  const soulLvl = getAscensionPerkLevel('primordial_soul');
  const soulMult = 1 + (soulLvl * 0.20);
  return Math.max(10, Math.floor(10 * meatFactor * powerFactor * soulMult));
}

function performAscension() {
  if (!canAscendNow()) return;

  const claimed = calculatePendingBloodstones();
  sound.playWin();

  gameState.bloodstones += claimed;
  gameState.ascensionCount += 1;

  // Full Loop Prestige Reset: Reset Camp Economy, Weapons, Training, and Milestone Bosses
  gameState.meat = 0;
  gameState.runMeatEarned = 0;
  gameState.weaponTier = 0;
  gameState.campEnduranceLevel = 0;
  gameState.campRecoveryLevel = 0;

  GENERATOR_LADDER.forEach(gen => {
    gameState.generators[gen.id] = 0;
  });

  gameState.bruteConditioningLevel = 0;
  gameState.beastMasteryLevel = 0;
  gameState.weakpointAnatomyLevel = 0;
  gameState.sparringLevel = 0;
  gameState.isSparring = false;
  gameState.adrenalineFocusRemaining = 0;
  gameState.inCooldown = false;
  gameState.cooldownRemaining = 0;

  gameState.tamedBeasts = {};
  gameState.highestTierUnlocked = 1;
  gameState.selectedBeastIndex = 0;
  gameState.parentLevels = {
    viper_hound: 1,
    boar_hawk: 1,
    grizzly_scorpion: 1,
    chimera_wyrm: 1
  };

  gameState.stamina = getMaxStamina();

  logCombatMessage(
    `🔥 <strong>PRIMAL ASCENSION #${gameState.ascensionCount} COMPLETE!</strong> Claimed <strong>+${formatNumber(claimed)} Primal Bloodstones</strong>! Relics, Forge, and Hybrids retained.`,
    'unlock'
  );
  showToast(`Ascended! Claimed +${formatNumber(claimed)} Primal Bloodstones!`, 'success', true);

  updateBeastSelectorOptions();
  renderGeneratorsLadder();
  renderTrophyCabinet();
  renderMenagerie();
  renderForge();
  renderAscensionAltar();
  saveGameToStorage();
}

/**
 * Generator Milestone Helpers
 */
function getGeneratorMilestoneMultiplier(genId) {
  const count = gameState.generators[genId] || 0;
  let mult = 1;
  for (const m of GENERATOR_MILESTONES) {
    if (count >= m.count) {
      mult *= m.mult;
    }
  }
  return mult;
}

function getNextGeneratorMilestone(genId) {
  const count = gameState.generators[genId] || 0;
  let prevTarget = 0;
  for (const m of GENERATOR_MILESTONES) {
    if (count < m.count) {
      return {
        target: m.count,
        prevTarget,
        label: m.label,
        progressPct: Math.min(100, Math.max(0, ((count - prevTarget) / (m.count - prevTarget)) * 100))
      };
    }
    prevTarget = m.count;
  }
  return {
    target: null,
    prevTarget: 100,
    label: 'MAX OVERDRIVE (40x)',
    progressPct: 100
  };
}

/**
 * Core Stat & Economy Helpers
 */
function hasRelic(id) {
  return !!gameState.ownedRelics[id];
}

function getRelicEffectMultiplier(id) {
  if (!hasRelic(id)) return 0;
  let mult = 1.0;
  if (id !== 'eldritch_crown' && hasRelic('eldritch_crown')) {
    mult *= 1.5;
  }
  const resonanceLvl = getAscensionPerkLevel('trophy_resonance');
  if (resonanceLvl > 0) {
    mult *= (1 + resonanceLvl * 0.20);
  }
  return mult;
}

function getMaxStamina() {
  const campBonus = gameState.campEnduranceLevel * 2;
  let maxCap = Math.min(100, gameState.staminaMaxBase + campBonus);
  if (hasRelic('eldritch_crown')) {
    maxCap *= 2;
  }
  maxCap += getFishCodexBonus('maxStamina');
  return maxCap;
}

function getParentLevel(beastId) {
  if (!gameState.parentLevels) {
    gameState.parentLevels = { viper_hound: 1, boar_hawk: 1, grizzly_scorpion: 1, chimera_wyrm: 1 };
  }
  return gameState.parentLevels[beastId] || 1;
}

function getParentLevelCost(beastId) {
  const lvl = getParentLevel(beastId);
  const parentDef = PARENT_DEFINITIONS.find(p => p.id === beastId);
  const baseCost = parentDef ? parentDef.nurseryBaseCost : 25000;
  const scale = parentDef ? parentDef.costScale : 1.38;
  const warmthLvl = getAscensionPerkLevel('catalytic_warmth');
  const discount = Math.max(0.4, 1 - (warmthLvl * 0.12));
  return Math.floor(baseCost * discount * Math.pow(scale, lvl - 1));
}

function getEffectiveGestationSec(hybrid) {
  const warmthLvl = getAscensionPerkLevel('catalytic_warmth');
  const reduction = Math.min(0.50, warmthLvl * 0.10);
  return Math.max(30, Math.floor(hybrid.gestationSec * (1 - reduction)));
}

function getHybridLevel(hybridId) {
  if (!gameState.hybrids || !gameState.hybrids[hybridId]) return 0;
  return gameState.hybrids[hybridId].level || 1;
}

function getHybridLevelCost(hybrid) {
  const lvl = getHybridLevel(hybrid.id);
  return Math.floor(hybrid.treatCost * Math.pow(1.6, lvl));
}

function getSparringStaminaCost() {
  const tuskpionLvl = getHybridLevel('tuskpion');
  return tuskpionLvl > 0 ? 3 : 4;
}

function getStaminaRegenInterval(withAdrenalineOverride = null) {
  let interval = gameState.staminaIntervalSec - (gameState.campRecoveryLevel * 0.75);
  interval = Math.max(6.0, interval);

  if (gameState.tamedBeasts['boar_hawk']) {
    const bLvl = getParentLevel('boar_hawk');
    interval = Math.max(3.0, interval - (bLvl * 0.25));
  }

  if (hasRelic('eldritch_crown')) {
    interval *= 0.5;
  }
  if (hasRelic('raptor_feather')) {
    const mult = getRelicEffectMultiplier('raptor_feather');
    interval /= (1 + (0.15 * mult));
  }

  const hasAdrenaline = withAdrenalineOverride !== null
    ? withAdrenalineOverride
    : gameState.adrenalineFocusRemaining > 0;

  if (hasAdrenaline) {
    interval /= 1.20;
  }

  const viperhawkLvl = getHybridLevel('viperhawk');
  if (viperhawkLvl > 0) {
    interval /= (1 + (viperhawkLvl * 0.05));
  }

  // Fishing: Codex regen bonus and Kelp Vigor meal
  interval /= (1 + getFishCodexBonus('regen'));
  interval /= getFishBuffMult('regen');

  return Math.max(1.0, interval);
}

function getStaminaRegenRate(withAdrenalineOverride = null) {
  const interval = getStaminaRegenInterval(withAdrenalineOverride);
  return 1 / interval;
}

function getBossStaminaCost(beast = BEAST_CATALOG[gameState.selectedBeastIndex]) {
  return (beast && beast.staminaCost) || 10;
}

function getWoundedDuration(beast = BEAST_CATALOG[gameState.selectedBeastIndex]) {
  let baseDur = (beast && beast.woundedSec) || gameState.cooldownDurationBase;
  if (gameState.tamedBeasts['grizzly_scorpion']) {
    const gLvl = getParentLevel('grizzly_scorpion');
    baseDur = Math.max(5.0, baseDur - (gLvl * 2));
  }
  const mult = getRelicEffectMultiplier('chitin_carapace');
  const relicDur = hasRelic('chitin_carapace') ? Math.max(3.0, baseDur / (1 + mult)) : baseDur;
  return relicDur * (1 - Math.min(0.5, getFishCodexBonus('wound')));
}

function getBrutePowerPerLevel() {
  return hasRelic('razor_talons') ? 5 : 3;
}

function getTrainingDisciplineCostMultiplier() {
  let mult = hasRelic('razor_talons') ? 0.75 : 1.0;
  const vigorLvl = getAscensionPerkLevel('primal_vigor');
  if (vigorLvl > 0) {
    mult *= Math.max(0.50, 1 - (vigorLvl * 0.10));
  }
  return mult;
}

function getSparringCost() {
  return Math.floor(300 * Math.pow(1.28, gameState.sparringLevel));
}

function getCampEnduranceCost() {
  return Math.floor(5000 * Math.pow(2.40, gameState.campEnduranceLevel));
}

function getCampRecoveryCost() {
  return Math.floor(25000 * Math.pow(2.60, gameState.campRecoveryLevel));
}

function getBruteConditioningCost() {
  const baseCost = 120 * getTrainingDisciplineCostMultiplier();
  return Math.floor(baseCost * Math.pow(1.3, gameState.bruteConditioningLevel));
}

function getBeastMasteryCost() {
  const baseCost = 2500 * getTrainingDisciplineCostMultiplier();
  return Math.floor(baseCost * Math.pow(1.45, gameState.beastMasteryLevel));
}

function getWeakpointAnatomyCost() {
  const baseCost = 8000 * getTrainingDisciplineCostMultiplier();
  return Math.floor(baseCost * Math.pow(1.55, gameState.weakpointAnatomyLevel));
}

function isGeneratorUnlocked(gen) {
  if (gen.reqTargetId) {
    const count = gameState.generators[gen.reqTargetId] || 0;
    if (count < gen.reqCount) return false;
  }
  if (gen.reqBeastId) {
    if (!gameState.tamedBeasts[gen.reqBeastId]) return false;
  }
  return true;
}

function getGeneratorCost(gen) {
  const count = gameState.generators[gen.id] || 0;
  return Math.floor(gen.baseCost * Math.pow(gen.costScale, count));
}

function getHunterPower() {
  const vigorBonus = getAscensionPerkLevel('primal_vigor') * 25;
  const equippedWeapon = getEquippedWeapon();
  const weaponPower = equippedWeapon ? (equippedWeapon.combatPower || 0) : 0;
  const rawPower = gameState.baseHunterPower + vigorBonus + weaponPower + (gameState.bruteConditioningLevel * getBrutePowerPerLevel());
  const scorpiodrakeLvl = getHybridLevel('scorpiodrake');
  const perLevelMult = scorpiodrakeLvl > 0 ? 0.05 : 0.02;
  const sparringMultiplier = 1 + (gameState.sparringLevel * perLevelMult);
  return Math.floor(rawPower * sparringMultiplier);
}

/** Hybrids stay dormant (no Beast Power) until both parents are tamed in the current run. Passives always apply. */
function isHybridAwake(hybrid) {
  return !!gameState.tamedBeasts[hybrid.parent1] && !!gameState.tamedBeasts[hybrid.parent2];
}

function getHybridRawPower(hybrid) {
  const hLvl = getHybridLevel(hybrid.id);
  if (hLvl <= 0 || !isHybridAwake(hybrid)) return 0;
  return Math.floor(hybrid.basePower * (1 + ((hLvl - 1) * 0.20)));
}

function getBeastMasteryMultiplier() {
  return 1 + (gameState.beastMasteryLevel * BEAST_MASTERY_PER_LEVEL);
}

function getTotalBeastPower() {
  let rawBeastPower = 0;
  for (const beast of BEAST_CATALOG) {
    if (gameState.tamedBeasts[beast.id]) {
      const pLvl = getParentLevel(beast.id);
      const levelMult = 1 + ((pLvl - 1) * 0.15);
      rawBeastPower += Math.floor(beast.rewardPower * levelMult);
    }
  }
  for (const hybrid of HYBRID_CATALOG) {
    rawBeastPower += getHybridRawPower(hybrid);
  }
  return Math.floor(rawBeastPower * getBeastMasteryMultiplier());
}

function getTotalCombatPower() {
  const base = getHunterPower() + getTotalBeastPower();
  // Fishing: Codex power bonus and Abyssal Fervor meal
  return Math.floor(base * (1 + getFishCodexBonus('power')) * getFishBuffMult('power'));
}

function getBaseMeatRate() {
  let total = 0;
  GENERATOR_LADDER.forEach(gen => {
    const count = gameState.generators[gen.id] || 0;
    const milestoneMult = getGeneratorMilestoneMultiplier(gen.id);
    total += count * gen.yieldPerSec * milestoneMult;
  });
  return total;
}

function getMeatRate(withAdrenalineOverride = null) {
  let rate = getBaseMeatRate();
  if (hasRelic('venom_vial')) {
    rate *= (1 + 0.15 * getRelicEffectMultiplier('venom_vial'));
  }
  if (hasRelic('dragon_scale')) {
    rate *= (1 + 1.0 * getRelicEffectMultiplier('dragon_scale'));
  }

  const hasAdrenaline = withAdrenalineOverride !== null
    ? withAdrenalineOverride
    : gameState.adrenalineFocusRemaining > 0;

  if (hasAdrenaline) {
    rate *= 1.25;
  }
  if (gameState.tamedBeasts['chimera_wyrm']) {
    const cLvl = getParentLevel('chimera_wyrm');
    rate *= (1 + (cLvl * 0.10));
  }
  const gryphoLvl = getHybridLevel('gryphowyrm');
  if (gryphoLvl > 0) {
    rate *= (1 + (gryphoLvl * 0.15));
  }
  const scorpioLvl = getHybridLevel('scorpiodrake');
  if (scorpioLvl > 0) {
    rate *= (1 + (scorpioLvl * 0.25));
  }

  // Ascension Perk: Feral Bloodline (+25% Global Meat/sec per rank)
  const bloodlineLvl = getAscensionPerkLevel('feral_bloodline');
  if (bloodlineLvl > 0) {
    rate *= (1 + (bloodlineLvl * 0.25));
  }

  // Fishing: Codex bonuses and Smoked Feast meal
  rate *= (1 + getFishCodexBonus('meat'));
  rate *= getFishBuffMult('meat');

  return rate;
}

function getEquippedWeapon() {
  if (gameState.weaponTier <= 0) return null;
  return WEAPONS_CATALOG[gameState.weaponTier - 1] || null;
}

function getClickYield() {
  const equipped = getEquippedWeapon();
  const flatBonus = equipped ? equipped.flatBonus : 0;
  let percentBonus = equipped ? equipped.percentBonus : 0;

  if (hasRelic('serpents_fang')) {
    percentBonus += 0.08 * getRelicEffectMultiplier('serpents_fang');
  }

  // Ascension Perk: Instinctive Butchery (+0.5% passive/click & +50% click yield per rank)
  const butcheryLvl = getAscensionPerkLevel('instinctive_butchery');
  if (butcheryLvl > 0) {
    percentBonus += (butcheryLvl * 0.005);
  }

  const passiveRate = getMeatRate();
  // Click multipliers below boost the flat strike only; the %-of-passive share is added after them
  let totalYield = gameState.baseClickPower + flatBonus;

  if (butcheryLvl > 0) {
    totalYield = Math.floor(totalYield * (1 + (butcheryLvl * 0.50)));
  }

  if (gameState.tamedBeasts['viper_hound']) {
    const vLvl = getParentLevel('viper_hound');
    totalYield = Math.floor(totalYield * (1 + (vLvl * 0.10)));
  }

  const viperhawkLvl = getHybridLevel('viperhawk');
  if (viperhawkLvl > 0) {
    totalYield = Math.floor(totalYield * (1 + (viperhawkLvl * 0.15)));
  }

  totalYield += Math.floor(passiveRate * percentBonus);

  const viperwyrmLvl = getHybridLevel('viperwyrm');
  if (viperwyrmLvl > 0) {
    const bankedBonus = Math.floor(gameState.meat * (0.01 * viperwyrmLvl));
    const maxBankBonus = totalYield * (2 * viperwyrmLvl);
    totalYield += Math.min(bankedBonus, maxBankBonus);
  }

  totalYield = Math.floor(totalYield * (1 + getFishCodexBonus('click')));

  return Math.max(1, totalYield);
}

function getEffectiveBossBracket(beast) {
  const reduction = Math.min(0.25, gameState.weakpointAnatomyLevel * 0.025);
  return {
    min: Math.floor(beast.minPower * (1 - reduction)),
    max: Math.floor(beast.maxPower * (1 - reduction))
  };
}

function calculateWinChance(beast) {
  const power = getTotalCombatPower();
  const { min, max } = getEffectiveBossBracket(beast);

  if (power < min) {
    // Magma Stinger lets desperate hunters gamble below the bracket at the floor odds
    return hasRelic('magma_stinger') ? WIN_CHANCE_FLOOR : 0.0;
  }

  if (power >= max) {
    return 0.98;
  }

  const t = (power - min) / (max - min);
  const baseChance = WIN_CHANCE_FLOOR + (0.98 - WIN_CHANCE_FLOOR) * (3 * t * t - 2 * t * t * t);
  return Math.min(0.98, Math.max(WIN_CHANCE_FLOOR, baseChance));
}

function isBeastMasteryUnlocked() {
  return Object.keys(gameState.tamedBeasts).length > 0 || Object.keys(gameState.hybrids || {}).length > 0;
}

function checkIncubatorHatch() {
  if (!gameState.incubator) return false;
  if (gameState.incubator.remaining <= 0) {
    const hybridId = gameState.incubator.hybridId;
    const hybrid = HYBRID_CATALOG.find(h => h.id === hybridId);
    gameState.incubator = null;
    if (!gameState.hybrids) gameState.hybrids = {};
    gameState.hybrids[hybridId] = { level: 1 };
    sound.playWin();
    logCombatMessage(`🧬 <strong>HYBRID CHIMERA HATCHED!</strong> [<strong>${hybrid ? hybrid.name : hybridId}</strong>] has emerged from the incubator! Gained +${formatNumber(hybrid ? hybrid.basePower : 0)} Beast Power!`, 'unlock');
    showToast(`HYBRID HATCHED: ${hybrid ? hybrid.name : hybridId}!`, 'success', true);
    renderForge();
    renderMenagerie();
    saveGameToStorage();
    return true;
  }
  return false;
}

/**
 * Unified Delta-Time Simulation Engine
 */
function advanceSimulationCore(dt, isBulkCatchup) {
  const buffedSec = Math.min(dt, gameState.adrenalineFocusRemaining);
  const unbuffedSec = Math.max(0, dt - buffedSec);

  if (buffedSec > 0) {
    addMeat(getMeatRate(true) * buffedSec);
  }
  if (unbuffedSec > 0) {
    addMeat(getMeatRate(false) * unbuffedSec);
  }

  let activeStaminaSec = dt;
  if (gameState.inCooldown) {
    if (dt < gameState.cooldownRemaining) {
      gameState.cooldownRemaining -= dt;
      activeStaminaSec = 0;
    } else {
      activeStaminaSec = dt - gameState.cooldownRemaining;
      gameState.cooldownRemaining = 0;
      gameState.inCooldown = false;
      if (!isBulkCatchup) {
        showToast('Hunter has recovered and is ready to hunt!', 'info');
        logCombatMessage('Hunter wounds have healed. Expeditions and stamina recovery resumed.', 'default');
      }
    }
  }

  const maxStamina = getMaxStamina();
  if (activeStaminaSec > 0 && gameState.stamina < maxStamina) {
    const woundedTime = dt - activeStaminaSec;
    const buffedStaminaSec = Math.max(0, Math.min(activeStaminaSec, gameState.adrenalineFocusRemaining - woundedTime));
    const unbuffedStaminaSec = Math.max(0, activeStaminaSec - buffedStaminaSec);

    const staminaGain =
      (buffedStaminaSec * getStaminaRegenRate(true)) +
      (unbuffedStaminaSec * getStaminaRegenRate(false));

    gameState.stamina = Math.min(maxStamina, gameState.stamina + staminaGain);
  }

  if (gameState.adrenalineFocusRemaining > 0) {
    gameState.adrenalineFocusRemaining = Math.max(0, gameState.adrenalineFocusRemaining - dt);
  }

  let hatchedDuringCatchup = false;
  if (gameState.incubator) {
    gameState.incubator.remaining = Math.max(0, gameState.incubator.remaining - dt);
    hatchedDuringCatchup = checkIncubatorHatch();
  }
  return hatchedDuringCatchup;
}

function advanceSimulation(rawDt, isBulkCatchup = false) {
  const dt = Math.max(0, Math.min(MAX_OFFLINE_SECONDS, rawDt));
  if (dt <= 0) return;

  const startMeat = gameState.meat;
  const startStamina = gameState.stamina;
  let hatchedDuringCatchup = false;
  let fishCaught = 0;

  // Split the step wherever a meal buff runs out, so offline catch-up only applies each buff while it lasted
  let remaining = dt;
  while (remaining > 0) {
    const nextExpiry = getNextFishBuffExpiry();
    const step = (nextExpiry > 0 && nextExpiry < remaining) ? nextExpiry : remaining;
    if (advanceSimulationCore(step, isBulkCatchup)) hatchedDuringCatchup = true;
    tickFishBuffs(step);
    fishCaught += tickFishingLines(step);
    remaining -= step;
  }

  if (isBulkCatchup && dt >= 15) {
    const meatEarned = Math.floor(gameState.meat - startMeat);
    const staminaEarned = Math.floor(gameState.stamina - startStamina);
    if (meatEarned > 0 || staminaEarned > 0 || hatchedDuringCatchup || fishCaught > 0) {
      const timeLabel = dt >= 3600
        ? `${(dt / 3600).toFixed(1)}h`
        : dt >= 60
        ? `${Math.floor(dt / 60)}m${Math.floor(dt % 60)}s`
        : `${Math.floor(dt)}s`;

      logCombatMessage(
        `⏳ <strong>Camp Report (${timeLabel} away):</strong> Harvested +${formatNumber(meatEarned)} Meat${staminaEarned > 0 ? ` & recovered +${staminaEarned} Stamina` : ''}${fishCaught > 0 ? ` & your lines caught ${fishCaught} fish` : ''}.`,
        'default'
      );
      if (dt >= 60 && meatEarned > 0) {
        showToast(`Welcome back! +${formatNumber(meatEarned)} Meat harvested over${timeLabel}.`, 'info');
      }
    }
  }
}

/**
 * Combat & Relic Resolution
 */
function rollRelicDrops(beast) {
  if (!beast || !beast.relics) return;
  let droppedAny = false;

  const resonanceLvl = getAscensionPerkLevel('trophy_resonance');
  const dropMult = 1 + (resonanceLvl * 0.25);

  beast.relics.forEach(relicId => {
    const relic = RELIC_REGISTRY[relicId];
    if (!relic || gameState.ownedRelics[relicId]) return;

    const roll = Math.random();
    if (roll <= relic.dropRate * dropMult) {
      gameState.ownedRelics[relicId] = true;
      droppedAny = true;
      sound.playWin();

      const isLegendary = relic.rarity === 'Legendary';
      if (isLegendary) {
        showToast(`LEGENDARY DROP: ${relic.name} acquired!`, 'success', true);
        logCombatMessage(`✨ <strong>LEGENDARY DROP!</strong> Found [<strong>${relic.name}</strong>]!${relic.desc}`, 'relic');
      } else {
        showToast(`RELIC DROP: ${relic.name} acquired!`, 'success');
        logCombatMessage(`🏆 <strong>RELIC ACQUIRED!</strong> Found [<strong>${relic.name}</strong>]!${relic.desc}`, 'relic');
      }
    }
  });

  if (!droppedAny) {
    logCombatMessage(`No new relics discovered on this expedition. Refight the boss to roll again!`, 'default');
  }

  renderTrophyCabinet();
  saveGameToStorage();
}

function challengeCurrentBeast() {
  if (gameState.inCooldown || gameState.isBattling) return;

  const beast = BEAST_CATALOG[gameState.selectedBeastIndex];
  const staminaCost = getBossStaminaCost(beast);
  if (gameState.stamina < staminaCost) {
    showToast(`Not enough stamina! Requires ${staminaCost} Stamina.`, 'warning');
    return;
  }
  const playerPower = getTotalCombatPower();
  const { min: effMin } = getEffectiveBossBracket(beast);

  if (playerPower < effMin && !hasRelic('magma_stinger')) {
    showToast(`Combat Power too low (${formatNumber(playerPower)} vs min${formatNumber(effMin)})!`, 'danger');
    return;
  }

  gameState.stamina = Math.max(0, gameState.stamina - staminaCost);
  gameState.isBattling = true;
  sound.playTone(260, 'square', 0.2, 0.1);

  setTimeout(() => {
    gameState.isBattling = false;
    const winChance = calculateWinChance(beast);
    const roll = Math.random();
    const isAlreadyTamed = !!gameState.tamedBeasts[beast.id];

    if (roll <= winChance) {
      sound.playWin();

      if (hasRelic('magma_stinger') && winChance < 0.25) {
        gameState.stamina = Math.min(getMaxStamina(), gameState.stamina + staminaCost);
        const windfall = Math.floor(getMeatRate() * 600);
        addMeat(windfall);
        logCombatMessage(`🔥 <strong>Underdog's Fury!</strong> Magma Stinger refunded 10 Stamina & awarded a 10m meat windfall (+${formatNumber(windfall)} Meat)!`, 'relic');
        showToast(`Underdog's Fury Triggered! Full Stamina refund & +${formatNumber(windfall)} Meat!`, 'success', true);
      }

      if (!isAlreadyTamed) {
        gameState.tamedBeasts[beast.id] = true;

        gameState.stamina = getMaxStamina();
        gameState.inCooldown = false;
        gameState.cooldownRemaining = 0;

        logCombatMessage(
          `⚔️ <strong>GRAND TAMING VICTORY!</strong> Bonded with <strong>${beast.name}</strong>! Gained +${formatNumber(beast.rewardPower)} Beast Power!`,
          'win'
        );
        logCombatMessage(`✨ <strong>BEAST TAMED! Stamina fully restored!</strong>`, 'unlock');
        showToast(`BEAST TAMED! Stamina fully restored!`, 'success');

        if (beast.id === 'chimera_wyrm') {
          logCombatMessage(`🔥 <strong>THE ASCENSION ALTAR HAS AWAKENED!</strong> You may now Ascend for Primal Bloodstones!`, 'relic');
          showToast(`Ascension Altar Unlocked!`, 'success', true);
        }

        const nextTier = beast.tier + 1;
        if (nextTier > gameState.highestTierUnlocked && nextTier <= BEAST_CATALOG.length) {
          gameState.highestTierUnlocked = nextTier;
          const nextBeast = BEAST_CATALOG.find(b => b.tier === nextTier);
          logCombatMessage(`🌟 New Apex Tier Unlocked: Tier ${nextTier} <strong>${nextBeast.name}</strong>!`, 'unlock');
          showToast(`Unlocked Tier ${nextTier}:${nextBeast.name}!`, 'success');
        }
        updateBeastSelectorOptions();
        renderMenagerie();
        renderGeneratorsLadder();
        renderAscensionAltar();
      } else {
        logCombatMessage(
          `🏆 <strong>TROPHY EXPEDITION CONQUERED!</strong> Successfully defeated <strong>${beast.name}</strong>. Searching for relics...`,
          'win'
        );
        rollRelicDrops(beast);
      }
    } else {
      sound.playDefeat();
      gameState.inCooldown = true;
      gameState.cooldownRemaining = getWoundedDuration(beast);
      gameState.cooldownTotal = gameState.cooldownRemaining;

      logCombatMessage(
        `💀 <strong>EXPEDITION FAILED!</strong> Defeated by <strong>${beast.name}</strong> (Roll:${(roll * 100).toFixed(1)}% vs ${(winChance * 100).toFixed(1)}\%). Hunter wounded for${Math.round(gameState.cooldownRemaining)}s (Stamina recovery halted)!`,
        'loss'
      );
      showToast(`Defeated! Hunter wounded (${Math.round(gameState.cooldownRemaining)}s recovery).`, 'danger');
    }

    saveGameToStorage();
  }, 1500);
}

/**
 * Save & Load Persistence
 */
function saveGameToStorage() {
  if (isResetting) return;
  try {
    const data = {
      meat: gameState.meat,
      runMeatEarned: gameState.runMeatEarned,
      lifetimeMeat: gameState.lifetimeMeat,
      weaponTier: gameState.weaponTier,
      stamina: gameState.stamina,
      generators: gameState.generators,
      campEnduranceLevel: gameState.campEnduranceLevel,
      campRecoveryLevel: gameState.campRecoveryLevel,
      bruteConditioningLevel: gameState.bruteConditioningLevel,
      beastMasteryLevel: gameState.beastMasteryLevel,
      weakpointAnatomyLevel: gameState.weakpointAnatomyLevel,
      sparringLevel: gameState.sparringLevel,
      adrenalineFocusRemaining: gameState.adrenalineFocusRemaining,
      inCooldown: gameState.inCooldown,
      cooldownRemaining: gameState.cooldownRemaining,
      highestTierUnlocked: gameState.highestTierUnlocked,
      tamedBeasts: gameState.tamedBeasts,
      ownedRelics: gameState.ownedRelics,
      selectedBeastIndex: gameState.selectedBeastIndex,
      activeTab: gameState.activeTab,
      forgeUnlocked: gameState.forgeUnlocked,
      parentLevels: gameState.parentLevels,
      incubator: gameState.incubator,
      hybrids: gameState.hybrids,
      bloodstones: gameState.bloodstones,
      ascensionCount: gameState.ascensionCount,
      ascensionPerks: gameState.ascensionPerks,
      unlockedExpansions: gameState.unlockedExpansions,
      fishing: gameState.fishing,
      lastSavedAt: Date.now()
    };
    localStorage.setItem('beast_tamer_savedata', JSON.stringify(data));
  } catch (err) {
    console.warn('Could not save game data', err);
  }
}

function loadGameFromStorage() {
  let savedTimestamp = null;
  try {
    const raw = localStorage.getItem('beast_tamer_savedata');
    if (raw) {
      const data = JSON.parse(raw);
      if (typeof data.meat === 'number' && Number.isFinite(data.meat)) gameState.meat = data.meat;
      gameState.runMeatEarned = (typeof data.runMeatEarned === 'number' && Number.isFinite(data.runMeatEarned))
        ? data.runMeatEarned
        : gameState.meat;
      gameState.lifetimeMeat = (typeof data.lifetimeMeat === 'number' && Number.isFinite(data.lifetimeMeat))
        ? data.lifetimeMeat
        : gameState.runMeatEarned;

      if (typeof data.weaponTier === 'number') gameState.weaponTier = data.weaponTier;
      if (typeof data.stamina === 'number') gameState.stamina = Math.min(data.stamina, 200);

      if (data.generators && typeof data.generators === 'object') {
        GENERATOR_LADDER.forEach(gen => {
          if (typeof data.generators[gen.id] === 'number' && Number.isFinite(data.generators[gen.id])) {
            gameState.generators[gen.id] = data.generators[gen.id];
          }
        });
      }

      if (typeof data.campEnduranceLevel === 'number') gameState.campEnduranceLevel = data.campEnduranceLevel;
      if (typeof data.campRecoveryLevel === 'number') gameState.campRecoveryLevel = data.campRecoveryLevel;
      if (typeof data.bruteConditioningLevel === 'number') gameState.bruteConditioningLevel = data.bruteConditioningLevel;
      if (typeof data.beastMasteryLevel === 'number') gameState.beastMasteryLevel = data.beastMasteryLevel;
      if (typeof data.weakpointAnatomyLevel === 'number') gameState.weakpointAnatomyLevel = data.weakpointAnatomyLevel;
      if (typeof data.sparringLevel === 'number') gameState.sparringLevel = data.sparringLevel;

      if (typeof data.adrenalineFocusRemaining === 'number') gameState.adrenalineFocusRemaining = data.adrenalineFocusRemaining;
      if (typeof data.inCooldown === 'boolean') gameState.inCooldown = data.inCooldown;
      if (typeof data.cooldownRemaining === 'number') gameState.cooldownRemaining = data.cooldownRemaining;

      if (typeof data.highestTierUnlocked === 'number') gameState.highestTierUnlocked = data.highestTierUnlocked;
      if (data.tamedBeasts) gameState.tamedBeasts = data.tamedBeasts;
      if (data.ownedRelics) gameState.ownedRelics = data.ownedRelics;
      if (typeof data.selectedBeastIndex === 'number') gameState.selectedBeastIndex = data.selectedBeastIndex;
      if (typeof data.activeTab === 'string') gameState.activeTab = data.activeTab;

      if (typeof data.forgeUnlocked === 'boolean') gameState.forgeUnlocked = data.forgeUnlocked;
      if (data.parentLevels && typeof data.parentLevels === 'object') {
        gameState.parentLevels = Object.assign(gameState.parentLevels, data.parentLevels);
      }
      if (data.incubator && typeof data.incubator === 'object') gameState.incubator = data.incubator;
      if (data.hybrids && typeof data.hybrids === 'object') gameState.hybrids = data.hybrids;

      if (typeof data.bloodstones === 'number' && Number.isFinite(data.bloodstones)) gameState.bloodstones = data.bloodstones;
      if (typeof data.ascensionCount === 'number' && Number.isFinite(data.ascensionCount)) gameState.ascensionCount = data.ascensionCount;
      if (data.ascensionPerks && typeof data.ascensionPerks === 'object') gameState.ascensionPerks = data.ascensionPerks;
      if (data.unlockedExpansions && typeof data.unlockedExpansions === 'object') gameState.unlockedExpansions = data.unlockedExpansions;
      if (data.fishing && typeof data.fishing === 'object') {
        const fresh = defaultFishingState();
        gameState.fishing = Object.assign(fresh, data.fishing);
        gameState.fishing.buffs = Object.assign(defaultFishingState().buffs, data.fishing.buffs || {});
        gameState.fishing.basket = data.fishing.basket || {};
        gameState.fishing.codex = data.fishing.codex || {};
      }

      if (typeof data.lastSavedAt === 'number') savedTimestamp = data.lastSavedAt;
    }
  } catch (err) {
    console.warn('Could not load save data', err);
  }
  return savedTimestamp;
}

/**
 * Wall-Clock Delta Sync & Main Game Loop
 */
function syncElapsedWallTime() {
  const nowWall = Date.now();
  const elapsedSec = (nowWall - gameState.lastWallTime) / 1000;
  gameState.lastWallTime = nowWall;

  if (elapsedSec > 0) {
    const isBulkCatchup = elapsedSec >= 2.0;
    advanceSimulation(elapsedSec, isBulkCatchup);
  }
}

function gameLoop() {
  syncElapsedWallTime();
  renderFrame(getMeatRate());
  requestAnimationFrame(gameLoop);
}