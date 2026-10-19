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
const ANATOMY_MAX_RANK = 25; // Weakpoint Anatomy max rank
const ANATOMY_REDUCTION_PER_RANK = 0.012; // Boss bracket reduction per rank
const HYBRID_ENHANCE_COST_SCALE = 2.2; // each hybrid level costs this many times the last
const WIN_CHANCE_FLOOR = 0.01; // Lowest possible odds once you meet a boss's minimum power
let isResetting = false;

function formatNumber(num, forceDecimals = false) {
  if (!Number.isFinite(num)) return '0';
  const abs = Math.abs(num);
  // Short scale suffixes; past Decillion falls back to scientific notation
  const SUFFIXES = [[1e33, 'Dc'], [1e30, 'No'], [1e27, 'Oc'], [1e24, 'Sp'], [1e21, 'Sx'], [1e18, 'Qi'], [1e15, 'Qa'], [1e12, 'T'], [1e9, 'B'], [1e6, 'M']];
  if (abs >= 1e36) return num.toExponential(2).replace('e+', 'e');
  for (const [size, suffix] of SUFFIXES) {
    if (abs >= size) return (num / size).toFixed(2) + suffix;
  }
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

  // Primal Totem (post-Wyrm, never reset by Ascension)
  totem: defaultTotemState(),

  // Hunter's Legacy skill tree (opens at Seal 1, never reset by Ascension)
  legacy: defaultLegacyState(),

  // Seal 2 Trophy Weapon (permanent) and its Apex Fangs
  trophy: { fangs: 0, level: 0 },

  // Fight counter per boss / guardian (kept forever; taming tries reset each run)
  fightStats: {},

  // Seal 3 Packmaster automation toggles (kept forever)
  automation: { autoBuy: false, autoTend: false, autoTrophy: false, autoStrike: false },
  world: 0,
  worldRecords: {},
  riftOpen: false,

  // Generator buy amount toggle: 'x1', 'x10' or 'next'
  genBuyMode: 'x1',

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
    totalCaught: 0,
    catches: {}, // how many of each species you've ever caught (Codex mastery)
    meal: null   // the one meal in the cookpot
  };
}

function isFishingUnlocked() {
  return !!(gameState.unlockedExpansions && gameState.unlockedExpansions.primal_fishing);
}

/** Catches of a species that count for mastery (old saves: a caught species counts as 1) */
function getFishCatchCount(fish) {
  const f = gameState.fishing;
  if (!f) return 0;
  return Math.max((f.catches && f.catches[fish.id]) || 0, f.codex && f.codex[fish.id] ? 1 : 0);
}

/** Mastery stars: 0 = not caught, 1 = first catch, 2 = silver, 3 = gold */
function getFishStars(fish) {
  const n = getFishCatchCount(fish);
  const t = FISHING_CONFIG.mastery[fish.rarity] || [1, 25, 100];
  return n >= t[2] ? 3 : n >= t[1] ? 2 : n >= t[0] ? 1 : 0;
}

/** Share of a species' full Codex bonus you have right now */
function getFishMasteryShare(fish) {
  const s = getFishStars(fish);
  if (s < 3) return s > 0 ? FISHING_CONFIG.masteryShare[s - 1] : 0;
  return FISHING_CONFIG.masteryShare[2] + getFishGoldPlus(fish) * FISHING_CONFIG.masteryPastGold.perStep;
}

/** Steps past Gold: Gold +1, +2 ... (each needs another Gold-sized batch of catches) */
function getFishGoldPlus(fish) {
  const gold = (FISHING_CONFIG.mastery[fish.rarity] || [1, 25, 100])[2];
  const n = getFishCatchCount(fish);
  if (n < gold) return 0;
  return Math.min(FISHING_CONFIG.masteryPastGold.maxSteps, Math.floor((n - gold) / gold));
}

/** Sum of permanent Codex bonuses of one type, scaled by each species' mastery stars */
function getFishCodexBonus(type) {
  const f = gameState.fishing;
  if (!f || !f.codex) return 0;
  let total = 0;
  for (const fish of FISH_CATALOG) {
    if (fish.codex.type === type) total += fish.codex.value * getFishMasteryShare(fish);
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
  const zoneLv = Math.min(gameState.fishing.rodLevel, FISHING_CONFIG.rod.zoneLevels || FISHING_CONFIG.rod.maxLevel);
  const zone = Math.min(0.9, base.zone * (1 + zoneLv * FISHING_CONFIG.rod.zoneBonusPerLevel));
  return Object.assign({}, base, { zone });
}

/** Pick a random species. allowedRarities limits the pool (Idle Lines can't catch rare fish). */
function rollFish(allowedRarities = Object.keys(FISHING_CONFIG.rarityWeights)) {
  const rodBoost = 1 + gameState.fishing.rodLevel * FISHING_CONFIG.rod.rareWeightPerLevel;
  const weights = allowedRarities.map(r => {
    const w = FISHING_CONFIG.rarityWeights[r];
    return (r === 'rare' || r === 'legendary' || r === 'mythic') ? w * rodBoost : w;
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
  if (!f.catches) f.catches = {};
  const starsBefore = getFishStars(fish);
  const isNewCodex = !f.codex[fish.id];
  if (isNewCodex) f.codex[fish.id] = true;
  f.catches[fish.id] = getFishCatchCount(fish) + (isNewCodex ? 0 : 1);
  f.totalCaught = (f.totalCaught || 0) + 1;
  const starsAfter = getFishStars(fish);
  let stored = false;
  if (fish.rarity === 'mythic') {
    // Mythics are trophies: they go straight into the Codex, not the basket
  } else if (getFishBasketCount() < FISHING_CONFIG.basketCap) {
    f.basket[fish.id] = (f.basket[fish.id] || 0) + 1;
    stored = true;
  } else if (fish.rarity !== 'common') {
    // Basket full: a rarer fish pushes out the most plentiful common one instead of being thrown away
    const common = FISH_CATALOG.filter(x => x.rarity === 'common' && (f.basket[x.id] || 0) > 0).sort((a, b) => f.basket[b.id] - f.basket[a.id])[0];
    if (common) {
      f.basket[common.id] -= 1;
      if (f.basket[common.id] <= 0) delete f.basket[common.id];
      f.basket[fish.id] = (f.basket[fish.id] || 0) + 1;
      stored = true;
    }
  }
  return { stored, isNewCodex, starUp: !isNewCodex && starsAfter > starsBefore ? starsAfter : 0 };
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
  // One meal at a time: a different dish replaces the current one; the same dish extends it
  if (gameState.fishing.meal !== recipe.id) {
    for (const b in gameState.fishing.buffs) gameState.fishing.buffs[b] = 0;
    gameState.fishing.meal = recipe.id;
  }
  recipe.buffs.forEach(b => {
    // Smokehouse (Hunter's Legacy) stretches both the meal and the stacking cap
    const smoke = getLegacyMult('smokehouse');
    gameState.fishing.buffs[b] = Math.min(FISHING_CONFIG.buffMaxSec * smoke, (gameState.fishing.buffs[b] || 0) + recipe.durationSec * smoke);
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
 * ================= PRIMAL TOTEM =================
 */
const TOTEM_GUARDIAN_SLOT = 99; // selectedBeastIndex value that means "the current Seal guardian"

function defaultTotemState() {
  return {
    unlocked: false,
    layer: 1,
    hpLeft: null,
    shards: 0,
    sealsBroken: 0,
    bonuses: { meat: 0, power: 0, stamina: 0, regen: 0 },
    totalDamage: 0
  };
}

function isTotemUnlocked() {
  return !!(gameState.totem && gameState.totem.unlocked);
}

/** Unlocks the Totem the first time the Wyrm is tamed (or for saves that already passed it). Returns true if it just unlocked. */

/**
 * ================= MILESTONE UNLOCKS =================
 * Features open one at a time as you progress, so new players learn the game a piece at a time.
 * Once a feature is unlocked it stays unlocked (a new run or world never hides it again).
 */
function hasEverTamed(id) {
  const rec = gameState.bestiary && gameState.bestiary[id];
  return !!gameState.tamedBeasts[id] || !!(rec && rec.wins > 0);
}

const FEATURE_UNLOCKS = [
  { id: 'hunt', tab: 'hunt', check: () => (gameState.generators.snare_lines || 0) >= 5 || gameState.weaponTier > 0 || hasEverTamed('viper_hound') || gameState.ascensionCount > 0,
    intro: 'Hunt & Bosses is open: train your hunter, then challenge your first beast.' },
  { id: 'relics', tab: 'relics', check: () => BEAST_CATALOG.some(b => hasEverTamed(b.id)),
    intro: 'Relics & Bestiary is open: re-fight tamed beasts for relics, and every beast you meet is recorded.' },
  { id: 'sparring', tab: 'hunt', check: () => hasEverTamed('viper_hound'),
    intro: 'The Sparring Ring is open (Hunt tab): spar for Hunter Power, with a chance of Adrenaline.' },
  { id: 'forge', tab: 'forge', check: () => hasEverTamed('boar_hawk') || !!gameState.forgeUnlocked,
    intro: 'The Beast Forge is open: level up your tamed beasts and breed hybrids.' },
  { id: 'anatomy', tab: 'hunt', check: () => hasEverTamed('boar_hawk'),
    intro: 'Weakpoint Anatomy is open (Hunt tab): study bosses to lower the power they need.' },
  { id: 'expedition', tab: 'expedition', check: () => hasEverTamed('boar_hawk'),
    intro: 'Expeditions & Gear is open: send your hunter exploring for materials, then hone and craft gear.' },
  { id: 'ascend', tab: 'ascend', check: () => hasEverTamed('chimera_wyrm') || gameState.ascensionCount > 0,
    intro: 'The Ascension Altar has awakened: start a new run stronger, with Bloodstones to spend.' },
  { id: 'totem', tab: 'totem', check: () => gameState.ascensionCount > 0 || getWorldIndex() > 0 || isTotemUnlocked(),
    intro: 'The Primal Totem has risen: your Combat Power wears it down, even while you are away.' },
  { id: 'world', tab: 'world', check: () => (gameState.bestApexDepth || 0) >= 4 || getWorldIndex() > 0 || gameState.riftOpen,
    intro: 'The World tab is open: a Titan sleeps beyond Apex Tier 12.' }
];

function isFeatureUnlocked(id) {
  return !!(gameState.unlocks && gameState.unlocks[id]);
}

/** Unlock everything whose milestone is met. quiet = no pop-ups (old saves loading in). Returns newly unlocked ids. */
function checkFeatureUnlocks(quiet) {
  if (!gameState.unlocks) gameState.unlocks = {};
  if (!gameState.newFeatures) gameState.newFeatures = {};
  const fresh = [];
  FEATURE_UNLOCKS.forEach(f => {
    if (gameState.unlocks[f.id]) return;
    let ok = false;
    try { ok = !!f.check(); } catch (e) { ok = false; }
    if (!ok) return;
    gameState.unlocks[f.id] = true;
    fresh.push(f.id);
    if (!quiet) {
      gameState.newFeatures[f.tab] = true;
      logCombatMessage('✨ <strong>NEW:</strong> ' + f.intro, 'unlock');
      showToast(f.intro, 'success', true);
    }
  });
  return fresh;
}

function checkTotemUnlock() {
  if (!gameState.totem) gameState.totem = defaultTotemState();
  const t = gameState.totem;
  if (t.unlocked) return false;
  // The Totem rises once the Chimera-Wyrm (the last beast of the run) is tamed, or after any Ascension
  if (!hasEverTamed('chimera_wyrm') && !(gameState.ascensionCount > 0) && !(gameState.world > 0)) return false;
  t.unlocked = true;
  if (t.hpLeft === null || t.hpLeft === undefined) t.hpLeft = getTotemLayerHp(t.layer);
  return true;
}

function isTotemSealLayer(layer) {
  return layer % TOTEM_CONFIG.sealEvery === 0;
}

/** Normal layers counted so far (Seals don't count): layer 6 is the 5th normal layer */
function getTotemNormalIndex(layer) {
  return layer - Math.floor(layer / TOTEM_CONFIG.sealEvery);
}

function getTotemLayerHp(layer) {
  if (isTotemSealLayer(layer)) return 0;
  return Math.floor(TOTEM_CONFIG.layer1Hp * Math.pow(TOTEM_CONFIG.hpGrowth, getTotemNormalIndex(layer) - 1));
}

function getTotemLayerBonus(layer) {
  return TOTEM_LAYER_BONUSES[(getTotemNormalIndex(layer) - 1) % TOTEM_LAYER_BONUSES.length];
}

function toRomanNumeral(n) {
  const map = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let out = '';
  for (const [v, s] of map) { while (n >= v) { out += s; n -= v; } }
  return out;
}

/** Title for a Seal number: Primordial (1-4), Ancient (5-8), Elder, Mythic, Eternal, then Eternal II, III, ... */
function getTotemTitle(sealNumber) {
  const lap = Math.floor((sealNumber - 1) / 4);
  if (lap < TOTEM_TITLES.length) return TOTEM_TITLES[lap];
  return TOTEM_TITLES[TOTEM_TITLES.length - 1] + ' ' + toRomanNumeral(lap - TOTEM_TITLES.length + 2);
}

/** Depth name for any layer, e.g. "Elder Depths" */
function getTotemDepthName(layer) {
  return getTotemTitle(Math.ceil(layer / TOTEM_CONFIG.sealEvery)) + ' Depths';
}

/** The guardian of the current Seal, shaped like a BEAST_CATALOG entry so the normal fight code can use it */
function getTotemGuardian() {
  if (!isTotemUnlocked() || !isTotemSealLayer(gameState.totem.layer)) return null;
  return getGuardianAt(gameState.totem.layer / TOTEM_CONFIG.sealEvery);
}

/** The guardian of Seal k (used by the Totem and the Bestiary) */
function getGuardianAt(k) {
  const base = BEAST_CATALOG[(k - 1) % BEAST_CATALOG.length];
  const min = Math.floor(BOSS_SEAL_SCALE * TOTEM_CONFIG.sealBaseMin * Math.pow(TOTEM_CONFIG.sealGrowth, k - 1));
  return {
    id: 'totem_guardian_' + k,
    isGuardian: true,
    sealNumber: k,
    baseId: base.id,
    tier: base.tier,
    name: getTotemTitle(k) + ' ' + base.name,
    imageFilter: TOTEM_TITLE_FILTERS[Math.min(Math.floor((k - 1) / 4), TOTEM_TITLE_FILTERS.length - 1)],
    image: base.image,
    fallbackImage: base.fallbackImage,
    minPower: min,
    maxPower: min * TOTEM_CONFIG.sealMaxMult,
    rewardPower: 0,
    accentColor: base.accentColor,
    desc: 'Guardian of Seal ' + k + ' on the Primal Totem. Defeat it to break the Seal.',
    relics: [],
    staminaCost: TOTEM_CONFIG.sealStamina,
    woundedSec: TOTEM_CONFIG.sealWoundSec
  };
}

/** What the Hunt tab is currently set to fight: a boss, or the Seal guardian */
function getSelectedFightTarget() {
  if (gameState.selectedBeastIndex === TOTEM_GUARDIAN_SLOT) {
    const guardian = getTotemGuardian();
    if (guardian) return guardian;
  }
  if (gameState.selectedBeastIndex === APEX_SLOT) {
    const apex = getApexBoss();
    if (apex) return apex;
  }
  if (gameState.selectedBeastIndex === TITAN_SLOT) {
    const titan = getTitanBoss();
    if (titan) return titan;
  }
  return BEAST_CATALOG[gameState.selectedBeastIndex] || BEAST_CATALOG[0];
}

function getTotemBonus(type) {
  return (gameState.totem && gameState.totem.bonuses && gameState.totem.bonuses[type]) || 0;
}

/** Passive Totem damage per second */
function getTotemDps() {
  if (!isTotemUnlocked()) return 0;
  return getTotalCombatPower() * TOTEM_CONFIG.passivePct * getLegacyMult('totem_breaker') * (1 + getFishCodexBonus('totem'));
}

function breakTotemLayer(quiet) {
  const t = gameState.totem;
  const layer = t.layer;
  const bonus = getTotemLayerBonus(layer);
  const shards = TOTEM_CONFIG.shardsPerLayer * layer;
  t.bonuses[bonus.type] = (t.bonuses[bonus.type] || 0) + bonus.value;
  t.shards += shards;
  t.layer += 1;
  t.hpLeft = getTotemLayerHp(t.layer);
  if (!quiet) {
    sound.playWin();
    showToast('Totem Layer ' + layer + ' shattered! ' + bonus.label, 'success', true);
  }
  logCombatMessage('🗿 <strong>TOTEM LAYER ' + layer + ' SHATTERED!</strong> Permanent ' + bonus.label + ' and +' + formatNumber(shards) + ' Totem Shards.', 'unlock');
  if (isTotemSealLayer(t.layer)) {
    const g = getTotemGuardian();
    logCombatMessage('🔒 <strong>SEAL ' + g.sealNumber + ' REACHED.</strong> The <strong>' + g.name + '</strong> guards it. Challenge it on the Hunt tab.', 'relic');
  }
}

/** Apply damage to the Totem; overflow carries into the next layer but stops at a Seal. Returns layers broken. */
function dealTotemDamage(amount, quiet = false) {
  if (!isTotemUnlocked() || !(amount > 0)) return 0;
  const t = gameState.totem;
  let broken = 0;
  while (amount > 0 && !isTotemSealLayer(t.layer) && broken < 50) {
    if (t.hpLeft === null || t.hpLeft === undefined) t.hpLeft = getTotemLayerHp(t.layer);
    const dealt = Math.min(amount, t.hpLeft);
    t.hpLeft -= dealt;
    t.totalDamage += dealt;
    amount -= dealt;
    if (t.hpLeft <= 0) {
      breakTotemLayer(quiet);
      broken++;
    }
  }
  return broken;
}

/** Strike button: spend stamina for a burst of damage */
function strikeTotem() {
  if (!isTotemUnlocked() || isTotemSealLayer(gameState.totem.layer)) return false;
  if (gameState.stamina < TOTEM_CONFIG.strikeStamina) return false;
  gameState.stamina -= TOTEM_CONFIG.strikeStamina;
  dealTotemDamage(getTotemDps() * TOTEM_CONFIG.strikeSec);
  return true;
}

/** Called after a winning fight against the current Seal guardian */
function breakTotemSeal(guardian) {
  const t = gameState.totem;
  const k = guardian.sealNumber;
  const stones = TOTEM_CONFIG.sealStones * k;
  const shards = TOTEM_CONFIG.sealShards * k;
  t.sealsBroken += 1;
  t.shards += shards;
  t.bonuses.power += TOTEM_CONFIG.sealPowerBonus;
  gameState.bloodstones += stones;
  t.layer += 1;
  t.hpLeft = getTotemLayerHp(t.layer);
  if (gameState.selectedBeastIndex === TOTEM_GUARDIAN_SLOT) {
    gameState.selectedBeastIndex = Math.max(0, Math.min(BEAST_CATALOG.length, gameState.highestTierUnlocked) - 1);
  }
  logCombatMessage('⛓️ <strong>SEAL ' + k + ' BROKEN!</strong> The ' + guardian.name + ' falls. +' + formatNumber(stones) + ' Bloodstones, +' + formatNumber(shards) + ' Totem Shards, permanent +' + Math.round(TOTEM_CONFIG.sealPowerBonus * 100) + '% Combat Power.', 'relic');
  showToast('SEAL ' + k + ' BROKEN! +' + formatNumber(stones) + ' Bloodstones', 'success', true);
  const unlock = TOTEM_UNLOCKS.find(u => u.seal === k);
  if (unlock && unlock.live) {
    logCombatMessage('🌳 Seal ' + k + ' opens: <strong>' + unlock.name + '</strong>! Find it on the Hunter\'s Legacy tab.', 'unlock');
    showToast(unlock.name + ' is open!', 'success', true);
  } else if (unlock) {
    logCombatMessage('🧭 Seal ' + k + ' reveals: <strong>' + unlock.name + '</strong> (coming in a future update).', 'unlock');
  }
}

/**
 * ================= HUNTER'S LEGACY SKILL TREE =================
 * Permanent (never reset by Ascension). Opens when Seal 1 is broken.
 */
function defaultLegacyState() {
  return { ranks: {}, freeRespec: false, insight: {} };
}

function isLegacyUnlocked() {
  return !!(gameState.totem && gameState.totem.sealsBroken >= LEGACY_CONFIG.unlockSeal);
}

function getLegacyRank(nodeId) {
  if (!gameState.legacy || !gameState.legacy.ranks) return 0;
  return gameState.legacy.ranks[nodeId] || 0;
}

function getLegacyNode(nodeId) {
  return LEGACY_NODES.find(n => n.id === nodeId) || null;
}

/** Cost of the next rank, or null when maxed */
function getLegacyNodeCost(node) {
  const rank = getLegacyRank(node.id);
  if (rank >= node.maxRank) return null;
  return Math.round(node.baseCost * Math.pow(LEGACY_CONFIG.costGrowth, rank));
}

/** Total Shards spent on one node */
function getLegacyNodeSpent(node) {
  let total = 0;
  for (let r = 0; r < getLegacyRank(node.id); r++) total += Math.round(node.baseCost * Math.pow(LEGACY_CONFIG.costGrowth, r));
  return total;
}

function getLegacySpent() {
  return LEGACY_NODES.reduce((sum, n) => sum + getLegacyNodeSpent(n), 0);
}

/** A node opens once every node it requires has rank 1 */
function isLegacyNodeOpen(node) {
  return node.requires.every(id => getLegacyRank(id) >= 1);
}

function canBuyLegacyRank(node) {
  if (!isLegacyUnlocked() || !isLegacyNodeOpen(node)) return false;
  const cost = getLegacyNodeCost(node);
  return cost !== null && gameState.totem.shards >= cost;
}

function buyLegacyRank(nodeId) {
  const node = getLegacyNode(nodeId);
  if (!node || !canBuyLegacyRank(node)) return false;
  gameState.totem.shards -= getLegacyNodeCost(node);
  gameState.legacy.ranks[node.id] = getLegacyRank(node.id) + 1;
  return true;
}

/** Shards a respec would give back right now */
function getLegacyRespecRefund() {
  const spent = getLegacySpent();
  if (gameState.legacy && gameState.legacy.freeRespec) return spent;
  return Math.floor(spent * (1 - LEGACY_CONFIG.respecFeePct));
}

function respecLegacy() {
  const spent = getLegacySpent();
  if (spent <= 0) return 0;
  const refund = getLegacyRespecRefund();
  gameState.totem.shards += refund;
  gameState.legacy.ranks = {};
  gameState.legacy.freeRespec = false;
  return refund;
}

/** 1 + rank x perRank for a node (multiplicative bonus helper) */
function getLegacyMult(nodeId) {
  const node = getLegacyNode(nodeId);
  return 1 + getLegacyRank(nodeId) * (node ? node.perRank : 0);
}

/** 1 - rank x perRank for a node (cost / duration reduction helper) */
function getLegacyReduction(nodeId) {
  const node = getLegacyNode(nodeId);
  return Math.max(0.1, 1 - getLegacyRank(nodeId) * (node ? node.perRank : 0));
}

function hasLegacyCapstone(nodeId) {
  return getLegacyRank(nodeId) >= 1;
}

/** Battle Insight: stacks earned by losing to this boss or guardian */
function getBattleInsightStacks(beast) {
  if (!beast || !gameState.legacy || !gameState.legacy.insight) return 0;
  return Math.min(LEGACY_CONFIG.insightMaxStacks, gameState.legacy.insight[beast.id] || 0);
}

function getBattleInsightMult(beast) {
  if (!hasLegacyCapstone('battle_insight')) return 1;
  return 1 + getBattleInsightStacks(beast) * LEGACY_CONFIG.insightPerLoss;
}

function addBattleInsight(beast) {
  if (!beast || !hasLegacyCapstone('battle_insight')) return false;
  const cur = gameState.legacy.insight[beast.id] || 0;
  if (cur >= LEGACY_CONFIG.insightMaxStacks) return false;
  gameState.legacy.insight[beast.id] = cur + 1;
  return true;
}

function clearBattleInsight(beast) {
  if (beast && gameState.legacy && gameState.legacy.insight) delete gameState.legacy.insight[beast.id];
}

/** Combat Power used against one specific boss or guardian (includes Battle Insight) */
function getCombatPowerVs(beast) {
  return Math.floor(getTotalCombatPower() * getBattleInsightMult(beast));
}

/** Totem damage from one Forage click */
function getTotemClickDamage() {
  return getTotalCombatPower() * TOTEM_CONFIG.clickPct * getLegacyMult('totem_breaker') * (1 + getFishCodexBonus('totem'));
}

/**
 * Generator buy amount: 'x1', 'x10' or 'next' (up to the next Overdrive milestone)
 */
function getGeneratorBulk(gen, mode = gameState.genBuyMode || 'x1') {
  const count = gameState.generators[gen.id] || 0;
  let qty = 1;
  if (mode === 'x10') qty = 10;
  else if (mode === 'next') {
    const nm = GENERATOR_MILESTONES.find(m => count < m.count);
    qty = nm ? nm.count - count : 1;
  }
  let cost = 0;
  for (let i = 0; i < qty; i++) {
    cost += getGeneratorCost(gen);
    gameState.generators[gen.id] = count + i + 1;
  }
  gameState.generators[gen.id] = count;
  return { qty, cost };
}

/** ---------- Seal 3 Packmaster ---------- */
function isPackmasterUnlocked() {
  return !!(gameState.totem && gameState.totem.sealsBroken >= PACKMASTER_CONFIG.unlockSeal);
}

function isAutomationOn(id) {
  return isPackmasterUnlocked() && !!(gameState.automation && gameState.automation[id]);
}

/** Pack Orders: the pack only fights and strikes for you a limited number of times between check-ins */
function getPackOrders() {
  const a = gameState.automation || {};
  return typeof a.orders === 'number' ? Math.max(0, Math.min(PACKMASTER_CONFIG.maxOrders, a.orders)) : PACKMASTER_CONFIG.maxOrders;
}

function refreshPackOrders() {
  if (!gameState.automation) gameState.automation = { autoBuy: false, autoTend: false };
  gameState.automation.orders = PACKMASTER_CONFIG.maxOrders;
}

function usePackOrder() {
  if (!gameState.automation) return;
  gameState.automation.orders = getPackOrders() - 1;
}

/** Runs once a second while the game is open. Returns what it did (for the UI). */
function runAutomation() {
  const did = { bought: 0, tended: false };
  if (!isPackmasterUnlocked()) return did;
  if (isAutomationOn('autoBuy')) {
    // Highest tier first; a few buys per tick at most
    for (let guard = 0; guard < 6; guard++) {
      let boughtThisPass = false;
      for (let i = GENERATOR_LADDER.length - 1; i >= 0; i--) {
        const gen = GENERATOR_LADDER[i];
        if (!isGeneratorUnlocked(gen)) continue;
        const bulk = getGeneratorBulk(gen);
        if (bulk.cost <= gameState.meat * PACKMASTER_CONFIG.maxSpendShare && buyGeneratorBulk(gen) > 0) {
          did.bought += bulk.qty;
          boughtThisPass = true;
          break;
        }
      }
      if (!boughtThisPass) break;
    }
  }
  if (isAutomationOn('autoTend') && gameState.incubator && !gameState.isBattling && gameState.stamina >= 2 && gameState.stamina >= getMaxStamina() - 0.001) {
    gameState.stamina -= 2;
    gameState.incubator.remaining = Math.max(0, gameState.incubator.remaining - 30);
    did.tended = true;
    checkIncubatorHatch();
  }
  // World 2 automation: Auto-Trophy, then Auto-Strike, both only with a full Stamina bar
  const full = () => gameState.stamina >= getMaxStamina() - 0.001;
  if (getWorldIndex() >= 1 && isAutomationOn('autoTrophy') && getPackOrders() > 0 && full() && !gameState.isBattling && !gameState.inCooldown) {
    const t = getSelectedFightTarget();
    if (t && !t.isApex && !t.isGuardian && !t.isTitan && gameState.tamedBeasts[t.id] && calculateWinChance(t) >= 0.9 && gameState.stamina >= getBossStaminaCost(t)) {
      gameState._quietFight = true;
      challengeCurrentBeast();
      gameState._quietFight = false;
      usePackOrder();
      did.trophy = true;
    }
  }
  if (getWorldIndex() >= 1 && isAutomationOn('autoStrike') && getPackOrders() > 0 && full() && !gameState.isBattling && isTotemUnlocked()) {
    if (strikeTotem()) { usePackOrder(); did.struck = true; }
  }
  return did;
}

function buyGeneratorBulk(gen) {
  const { qty, cost } = getGeneratorBulk(gen);
  if (gameState.meat < cost) return 0;
  gameState.meat -= cost;
  gameState.generators[gen.id] = (gameState.generators[gen.id] || 0) + qty;
  return qty;
}

/**
 * Where Combat Power comes from, line by line (same math as getHunterPower / getTotalBeastPower / getTotalCombatPower)
 */
function getCombatPowerBreakdown() {
  const hunter = [];
  hunter.push({ label: 'Base hunter', value: gameState.baseHunterPower });
  const w = getEquippedWeapon();
  if (w) hunter.push({ label: w.name, value: w.combatPower || 0 });
  const brute = gameState.bruteConditioningLevel * getBrutePowerPerLevel();
  if (brute > 0) hunter.push({ label: 'Brute Conditioning Lvl ' + gameState.bruteConditioningLevel, value: brute });
  const hm = getHunterMultParts();
  const hunterMults = [];
  if (gameState.sparringLevel > 0) hunterMults.push({ label: 'Sparring Lvl ' + gameState.sparringLevel, mult: hm.sparring });
  if (gameState.bruteConditioningLevel > 0) hunterMults.push({ label: 'Brute Conditioning +' + Math.round(HUNTER_CONFIG.bruteMultPerLevel * 100) + '%/lvl', mult: hm.brute });
  if (hm.vigor > 1) hunterMults.push({ label: 'Primal Vigor perk', mult: hm.vigor });
  if (hm.honing > 1) hunterMults.push({ label: 'Weapon Honing Lvl ' + getHoningLevel(), mult: hm.honing });
  if (hm.helm > 1) { const g = getActiveGear('helm'); hunterMults.push({ label: getGearName('helm', g.piece, g.climate) + (g.strength < 1 ? ' (off-climate, half)' : ''), mult: hm.helm }); }

  const beasts = [];
  for (const beast of BEAST_CATALOG) {
    if (!gameState.tamedBeasts[beast.id]) continue;
    const l = getParentLevel(beast.id);
    if (beast.id === getExpeditionPartner()) { beasts.push({ label: beast.name + ' (away on an expedition)', value: 0 }); continue; }
    beasts.push({ label: beast.name + ' Lvl ' + l, value: Math.floor(beast.rewardPower * (1 + (l - 1) * 0.15)) });
  }
  for (const h of HYBRID_CATALOG) {
    const p = getHybridRawPower(h);
    if (p > 0) beasts.push({ label: h.name + ' Lvl ' + getHybridLevel(h.id) + (isHybridAwake(h) ? '' : ' (Pack Alpha 25%)'), value: p });
  }
  const beastMults = [];
  if (gameState.beastMasteryLevel > 0) beastMults.push({ label: 'Beast Mastery Lvl ' + gameState.beastMasteryLevel, mult: getBeastMasteryMultiplier() });
  if (getLegacyRank('beast_bond') > 0) beastMults.push({ label: 'Beast Bond (Legacy)', mult: getLegacyMult('beast_bond') });
  const leadership = getLeadershipMult();
  beastMults.push({ label: 'Leadership (your Hunter Power)', mult: leadership });

  const mults = [];
  const add = (label, m) => { if (m > 1.0001) mults.push({ label, mult: m }); };
  add('Fish Codex', 1 + getFishCodexBonus('power'));
  add('Abyssal Fervor meal', getFishBuffMult('power'));
  add('Totem blessings and Seals', 1 + getTotemBonus('power'));
  add('Keen Instincts (Legacy)', getLegacyMult('keen_instincts'));
  add('Trophy Weapon', getTrophyPowerMult());
  add('Apex Ladder (' + getApexDepth() + ' tamed this run)', getApexPowerMult());
  add('World Bonus', getWorldPowerMult());
  add('Molten Heart', getMoltenHeartMult());
  add('Adrenaline', getAdrenalinePowerMult());

  return {
    hunter, hunterMults, hunterTotal: getHunterPower(),
    beasts, beastMults, beastTotal: Math.floor(getTotalBeastPower() * leadership),
    mults, total: getTotalCombatPower()
  };
}

/**
 * ================= APEX LADDER (past the Chimera-Wyrm, resets every Ascension) =================
 * Tier k (k = 1, 2, 3 ...) is shown as Tier 4 + k. Each is stronger than the last; taming it adds Beast Power
 * for the rest of the run and raises the Bloodstones you get for Ascending.
 */
const APEX_SLOT = 98; // selectedBeastIndex value meaning "the next Apex boss"
const APEX_TITLES = ['Dread', 'Savage', 'Feral', 'Rabid', 'Bloodmad', 'Abyssal', 'Cataclysm', 'Worldender'];

function isApexUnlocked() {
  return !!gameState.tamedBeasts['chimera_wyrm'];
}

function getApexDepth() {
  return gameState.apexDepth || 0;
}

/** Bracket minimum of Apex tier k before Weakpoint Anatomy and Ascension growth */
function getApexBaseMin(k) {
  const wyrm = BEAST_CATALOG[BEAST_CATALOG.length - 1];
  return Math.floor(wyrm.minPower * BOSS_APEX_SCALE * APEX_CONFIG.firstMult * Math.pow(APEX_CONFIG.growth, k - 1));
}

/** The next Apex boss to fight, shaped like a BEAST_CATALOG entry */
function getApexBoss() {
  if (!isApexUnlocked()) return null;
  return getApexBossAt(getApexDepth() + 1);
}

/** Apex tier k as a boss (used by the ladder and the Bestiary) */
function getApexBossAt(k) {
  const base = BEAST_CATALOG[(k - 1) % BEAST_CATALOG.length];
  const lap = Math.floor((k - 1) / BEAST_CATALOG.length);
  const title = APEX_TITLES[Math.min(lap, APEX_TITLES.length - 1)] + (lap >= APEX_TITLES.length ? ' ' + toRomanNumeral(lap - APEX_TITLES.length + 2) : '');
  const min = getApexBaseMin(k);
  return {
    id: 'apex_' + k,
    isApex: true,
    apexTier: k,
    tier: 4 + k,
    baseId: base.id,
    name: title + ' ' + base.name,
    image: base.image,
    fallbackImage: base.fallbackImage,
    minPower: min,
    maxPower: min * APEX_CONFIG.maxMult,
    rewardPower: getApexReward(k),
    accentColor: base.accentColor,
    imageFilter: APEX_TITLE_FILTERS[Math.min(lap, APEX_TITLE_FILTERS.length - 1)],
    desc: 'Apex Tier ' + (4 + k) + '. Every Apex you tame this run adds +' + Math.round(APEX_CONFIG.powerPerTier * 100) + '% Combat Power and raises your Ascension Bloodstones. The ladder resets when you Ascend.',
    relics: [],
    staminaCost: APEX_CONFIG.stamina,
    woundedSec: APEX_CONFIG.woundSec
  };
}

/** Apex rewards are a Combat Power multiplier now (see getApexPowerMult), so no flat Beast Power */
function getApexReward(k) {
  return 0;
}

function getApexPowerMult() {
  return 1 + APEX_CONFIG.powerPerTier * getApexDepth();
}

/**
 * ================= WORLDS =================
 */
/** Hunter rework: Leadership makes the pack stronger, so bosses scale up, more for later tiers (Apex builds on the Wyrm) */
let BOSS_POWER_SCALE = 1;
let BOSS_TIER_SCALE = [1.2, 1.5, 1.8, 1.9];
let BOSS_SEAL_SCALE = 1.8;
let BOSS_APEX_SCALE = 1.6; // the Apex Ladder (and Titans built on it) on top of the Wyrm's scale
const BASE_BEASTS = BEAST_CATALOG.map(b => Object.assign({}, b));
const BASE_GENS = GENERATOR_LADDER.map(g => Object.assign({}, g));
const TITAN_SLOT = 97; // selectedBeastIndex value meaning "this world's Titan"

function getWorldIndex() {
  return Math.max(0, Math.min(WORLDS.length - 1, gameState.world || 0));
}

function getWorld() {
  return WORLDS[getWorldIndex()];
}

/** Reskin the shared bosses and generators for the current world, and set boss difficulty */
function applyWorld() {
  const w = getWorld();
  BEAST_CATALOG.forEach((b, i) => {
    const base = BASE_BEASTS[i];
    const ov = (w.beasts && w.beasts[i]) || {};
    b.name = ov.name || base.name;
    b.desc = ov.desc || base.desc;
    const sc = w.hardness * BOSS_POWER_SCALE * (BOSS_TIER_SCALE[i] || 1);
    b.minPower = Math.floor(base.minPower * sc);
    b.maxPower = Math.floor(base.maxPower * sc);
    b.rewardPower = Math.floor(base.rewardPower * Math.sqrt(w.hardness));
    b.imageFilter = w.filter || '';
  });
  GENERATOR_LADDER.forEach((g, i) => {
    const base = BASE_GENS[i];
    const ov = (w.gens && w.gens[i]) || {};
    g.name = ov.name || base.name;
    g.desc = ov.desc || base.desc;
    g.imageFilter = w.filter || '';
  });
  if (typeof PARENT_DEFINITIONS !== 'undefined') {
    PARENT_DEFINITIONS.forEach(p => {
      const b = BEAST_CATALOG.find(x => x.id === p.id);
      if (b) p.name = b.name;
    });
  }
}

// Apply the current world (and the boss power scale) as soon as the engine loads
applyWorld();

/** Permanent World Bonus from every world you've opened (World 2 = 1 opened) */
function getWorldsOpened() {
  return getWorldIndex();
}

function getWorldMeatMult() {
  return Math.pow(WORLD_CONFIG.bonusMeatPerWorld, getWorldsOpened());
}

function getWorldPowerMult() {
  return 1 + WORLD_CONFIG.bonusPowerPerWorld * getWorldsOpened();
}

/** World 2 twist: blizzards on a fixed wall-clock cycle */
const PREVIEW_CLOCK = { offsetMs: 0 }; // preview/testing only: shifts the blizzard clock
function getBlizzardState(nowMs = Date.now() + PREVIEW_CLOCK.offsetMs) {
  const w = getWorld();
  if (w.twist !== 'blizzard') return { active: false, secsLeft: 0, nextIn: 0 };
  const c = WORLD_CONFIG.blizzard;
  const t = Math.floor(nowMs / 1000) % c.everySec;
  const active = t < c.lastSec;
  return { active, secsLeft: active ? c.lastSec - t : 0, nextIn: active ? 0 : c.everySec - t };
}

function getTwistMeatMult() {
  return isBlizzardRaging() ? WORLD_CONFIG.blizzard.meatMult : 1;
}

/** ---------- World 2: Stoke the Hearth and Frozen Caches ---------- */
function getTundra() {
  if (!gameState.tundra) gameState.tundra = { warmth: 0, warmthCycle: -1, thawedCycle: -1, lastCacheCycle: null, caches: [] };
  return gameState.tundra;
}

function getBlizzardCycle(nowMs = Date.now() + PREVIEW_CLOCK.offsetMs) {
  return Math.floor(nowMs / 1000 / WORLD_CONFIG.blizzard.everySec);
}

/** A blizzard is "raging" unless you've already thawed your camp this cycle */
function isBlizzardRaging() {
  const bz = getBlizzardState();
  return bz.active && getTundra().thawedCycle !== getBlizzardCycle();
}

function getWarmthPct() {
  const t = getTundra();
  return t.warmthCycle === getBlizzardCycle() ? Math.min(1, t.warmth / WORLD_CONFIG.blizzard.warmthNeeded) : 0;
}

function addWarmth(n) {
  if (!isBlizzardRaging()) return false;
  const t = getTundra(), c = getBlizzardCycle();
  if (t.warmthCycle !== c) { t.warmthCycle = c; t.warmth = 0; }
  t.warmth += n;
  if (t.warmth >= WORLD_CONFIG.blizzard.warmthNeeded) {
    t.thawedCycle = c;
    t.warmth = 0;
    t.caches.forEach(x => { x.left = Math.max(0, x.left - WORLD_CONFIG.blizzard.thawBonusSec); });
    logCombatMessage('🔥 <strong>CAMP THAWED!</strong> The hearth roars and the blizzard breaks early. Your Frozen Caches thaw ' + Math.round(WORLD_CONFIG.blizzard.thawBonusSec / 60) + ' min faster.', 'unlock');
    showToast('Camp thawed! The blizzard breaks.', 'success', true);
  }
  return true;
}

function stokeHearth() {
  const c = WORLD_CONFIG.blizzard;
  if (!isBlizzardRaging() || gameState.stamina < c.stokeStamina) return false;
  gameState.stamina -= c.stokeStamina;
  return addWarmth(c.stokeWarmth);
}

/** Each blizzard that passes leaves a Frozen Cache behind (up to a few at once); the oldest thaws first */
function tickTundra(dtSec) {
  if (getWorld().twist !== 'blizzard') return;
  const t = getTundra(), c = WORLD_CONFIG.blizzard;
  const bz = getBlizzardState();
  const cycle = getBlizzardCycle();
  const completed = bz.active ? cycle - 1 : cycle;
  if (t.lastCacheCycle === null) t.lastCacheCycle = completed;
  while (t.lastCacheCycle < completed) {
    t.lastCacheCycle++;
    if (t.caches.length < c.maxCaches) t.caches.push({ left: c.cacheThawSec });
  }
  if (t.caches.length && t.caches[0].left > 0) t.caches[0].left = Math.max(0, t.caches[0].left - dtSec);
}

function chipFrozenCache() {
  const t = getTundra(), c = WORLD_CONFIG.blizzard;
  const x = t.caches[0];
  if (!x || x.left <= 0 || gameState.stamina < c.chipStamina) return false;
  gameState.stamina -= c.chipStamina;
  x.left = Math.max(0, x.left - c.chipSec);
  return true;
}

function openFrozenCache() {
  const t = getTundra(), c = WORLD_CONFIG.blizzard;
  const x = t.caches[0];
  if (!x || x.left > 0) return null;
  t.caches.shift();
  const jackpot = Math.random() < c.jackpotChance;
  const parts = [];
  const meatRate = getMeatRate() / getTwistMeatMult();
  const meat = Math.floor(Math.max(meatRate * (jackpot ? c.jackpotMeatSec : c.meatSec), getClickYield() * (jackpot ? 1000 : 200)));
  const roll = Math.random();
  if (jackpot || roll < 0.5) { addMeat(meat); parts.push('+' + formatNumber(meat) + ' Meat'); }
  if (isTotemUnlocked() && (jackpot || (roll >= 0.5 && roll < 0.75))) {
    const shards = Math.max(10, c.shardsPerLayer * (gameState.totem.layer || 1));
    gameState.totem.shards += shards; parts.push('+' + formatNumber(shards) + ' Totem Shards');
  }
  if (jackpot || roll >= 0.75 || parts.length === 0) {
    if (!gameState.trophy) gameState.trophy = { fangs: 0, level: 0 };
    const fangs = 1 + Math.floor((gameState.bestApexDepth || 0) / 3);
    gameState.trophy.fangs += fangs; parts.push('+' + fangs + ' Apex Fang' + (fangs === 1 ? '' : 's'));
  }
  const msg = (jackpot ? '💎 <strong>MAMMOTH CACHE!</strong> ' : '🧊 <strong>Frozen Cache thawed:</strong> ') + parts.join(', ') + '.';
  logCombatMessage(msg, jackpot ? 'relic' : 'win');
  showToast((jackpot ? 'Mammoth Cache! ' : 'Cache opened: ') + parts.join(', '), 'success', jackpot);
  return { jackpot, parts };
}

/** ---------- World 3: Eruption rounds ---------- */
function getVolcano() {
  if (!gameState.volcano) gameState.volcano = { charges: 0, chargeAt: null, round: null, last: null, auto: 0, stake: 1, shield: 0, heart: 0, stats: { rounds: 0, wins: 0, busts: 0, best: 0 } };
  const v = gameState.volcano;
  if (!v.stats) v.stats = { rounds: 0, wins: 0, busts: 0, best: 0 };
  return v;
}

function isEruptionWorld() {
  return getWorld().twist === 'eruption';
}

/** Charges build on the wall clock (offline too) while you are in the Volcano world */
function tickVolcanoCharges(nowMs = Date.now() + PREVIEW_CLOCK.offsetMs) {
  if (!isEruptionWorld()) return;
  const v = getVolcano(), c = WORLD_CONFIG.eruption;
  if (v.chargeAt === null || v.chargeAt === undefined) v.chargeAt = nowMs;
  if (v.charges >= c.maxCharges) { v.charges = c.maxCharges; v.chargeAt = nowMs; return; }
  const gained = Math.floor((nowMs - v.chargeAt) / 1000 / c.chargeSec);
  if (gained > 0) {
    v.charges = Math.min(c.maxCharges, v.charges + gained);
    v.chargeAt = v.charges >= c.maxCharges ? nowMs : v.chargeAt + gained * c.chargeSec * 1000;
  }
}

function getNextChargeIn(nowMs = Date.now() + PREVIEW_CLOCK.offsetMs) {
  const v = getVolcano(), c = WORLD_CONFIG.eruption;
  if (v.charges >= c.maxCharges || v.chargeAt === null) return 0;
  return Math.max(0, c.chargeSec - (nowMs - v.chargeAt) / 1000);
}

function getEruptionMultAt(sec) {
  return Math.exp(WORLD_CONFIG.eruption.growth * Math.max(0, sec));
}

function getEruptionPrize(stake) {
  const c = WORLD_CONFIG.eruption;
  const rate = getMeatRate() / getTwistMeatMult();
  return {
    meat: Math.floor(Math.max(rate * c.prizeMeatSec, getClickYield() * 300) * stake),
    cores: c.prizeCores * stake
  };
}

function rollEruptionCrash() {
  const c = WORLD_CONFIG.eruption;
  const u = Math.max(1e-9, 1 - Math.random());
  return Math.min(c.crashCap, Math.max(1.01, Math.pow(u, -1 / c.crashK)));
}

/** Start a round, staking 1 to 8 charges ("raise the steaks") */
function startEruption(stake, nowMs = Date.now() + PREVIEW_CLOCK.offsetMs) {
  if (!isEruptionWorld()) return false;
  const v = getVolcano(), c = WORLD_CONFIG.eruption;
  tickVolcanoCharges(nowMs);
  stake = Math.floor(stake || v.stake || 1);
  if (v.round || stake < 1 || stake > c.maxCharges || v.charges < stake) return false;
  const prize = getEruptionPrize(stake);
  v.charges -= stake;
  v.stake = stake;
  v.round = { stake, startAt: nowMs, crash: rollEruptionCrash(), meat: prize.meat, cores: prize.cores };
  v.last = null;
  return true;
}

function getEruptionRoundMult(nowMs = Date.now() + PREVIEW_CLOCK.offsetMs) {
  const r = getVolcano().round;
  if (!r) return 1;
  return Math.min(r.crash, getEruptionMultAt((nowMs - r.startAt) / 1000));
}

function cashOutEruption(atMult, nowMs = Date.now() + PREVIEW_CLOCK.offsetMs) {
  const v = getVolcano();
  const r = v.round;
  if (!r) return null;
  const m = atMult || getEruptionMultAt((nowMs - r.startAt) / 1000);
  if (m >= r.crash) return resolveEruptionBust();
  v.round = null;
  const meat = Math.floor(r.meat * m);
  const cores = Math.floor(r.cores * m);
  addMeat(meat);
  addMaterial('magma_core', cores);
  v.stats.rounds++; v.stats.wins++; v.stats.best = Math.max(v.stats.best || 0, m);
  v.last = { win: true, mult: m, crash: r.crash, meat, cores, stake: r.stake };
  logCombatMessage('🌋 <strong>CASHED OUT at x' + m.toFixed(2) + '!</strong> +' + formatNumber(meat) + ' Meat, +' + formatNumber(cores) + ' Magma Cores. (It would have blown at x' + r.crash.toFixed(2) + '.)', 'win');
  return v.last;
}

function resolveEruptionBust() {
  const v = getVolcano(), c = WORLD_CONFIG.eruption;
  const r = v.round;
  if (!r) return null;
  v.round = null;
  const pct = Math.min(c.scorchMax, c.scorchPerCharge * r.stake) * getScorchShieldMult();
  const lost = Math.min(gameState.stamina, Math.floor(getMaxStamina() * pct));
  gameState.stamina = Math.max(0, gameState.stamina - lost);
  v.stats.rounds++; v.stats.busts++;
  v.last = { win: false, mult: r.crash, crash: r.crash, stamina: lost, pct, stake: r.stake };
  logCombatMessage('💥 <strong>ERUPTION at x' + r.crash.toFixed(2) + '!</strong> The pot is lost and you are Scorched escaping the blast: -' + formatNumber(lost) + ' Stamina.', 'loss');
  return v.last;
}

/** Called often: blows the round when its time comes, or auto cashes out at your target */
function tickEruption(nowMs = Date.now() + PREVIEW_CLOCK.offsetMs) {
  tickVolcanoCharges(nowMs);
  const v = getVolcano();
  const r = v.round;
  if (!r) return null;
  const m = getEruptionMultAt((nowMs - r.startAt) / 1000);
  if (v.auto > 1 && v.auto < r.crash && m >= v.auto) return cashOutEruption(v.auto, nowMs);
  if (m >= r.crash) return resolveEruptionBust();
  return null;
}

function getShieldCost() {
  const c = WORLD_CONFIG.eruption, v = getVolcano();
  return (v.shield || 0) >= c.shieldMax ? null : Math.ceil(c.shieldCost * Math.pow(c.shieldGrowth, v.shield || 0));
}

/** Heat Shield: each level cuts the Stamina lost to a bust */
function getScorchShieldMult() {
  return Math.max(0, 1 - WORLD_CONFIG.eruption.shieldCut * (getVolcano().shield || 0));
}

function getHeartCost() {
  const c = WORLD_CONFIG.eruption;
  return Math.ceil(c.heartCost * Math.pow(c.heartGrowth, getVolcano().heart || 0));
}

function buyVolcanoUpgrade(kind) {
  const v = getVolcano();
  const cost = kind === 'shield' ? getShieldCost() : kind === 'heart' ? getHeartCost() : null;
  if (!cost || getMaterial('magma_core') < cost) return false;
  const mats = getExpeditionState().materials;
  mats.magma_core = Math.max(0, (mats.magma_core || 0) - cost);
  if (kind === 'shield') v.shield = (v.shield || 0) + 1; else v.heart = (v.heart || 0) + 1;
  return true;
}

/** Molten Heart: permanent Combat Power from Magma Cores */
function getMoltenHeartMult() {
  const v = gameState.volcano;
  return 1 + WORLD_CONFIG.eruption.heartPerLevel * ((v && v.heart) || 0);
}

/** ---------- The Titan ---------- */
function isTitanAwake() {
  return !gameState.riftOpen && Math.max(getApexDepth(), gameState.bestApexDepth || 0) >= WORLD_CONFIG.titanAfterApexTier - 4;
}

function getTitanBoss() {
  if (!isTitanAwake()) return null;
  const w = getWorld();
  const base = BEAST_CATALOG[w.titan.baseIndex];
  const min = Math.floor(getApexBaseMin(WORLD_CONFIG.titanApexEquivalent - 4) * (w.titan.mult || WORLD_CONFIG.titanExtraMult));
  return {
    id: 'titan_' + w.id,
    isTitan: true,
    tier: 'Titan',
    baseId: base.id,
    name: w.titan.name,
    image: base.image,
    fallbackImage: base.fallbackImage,
    imageFilter: w.titan.filter,
    minPower: min,
    maxPower: min * APEX_CONFIG.maxMult,
    rewardPower: 0,
    accentColor: base.accentColor,
    desc: w.titan.desc,
    relics: [],
    staminaCost: APEX_CONFIG.stamina,
    woundedSec: 300
  };
}

function slayTitan(boss) {
  gameState.riftOpen = true;
  const w = getWorld();
  if (!gameState.worldRecords) gameState.worldRecords = {};
  const rec = gameState.worldRecords[w.id] || (gameState.worldRecords[w.id] = {});
  rec.titanAt = Date.now();
  rec.bestApex = Math.max(rec.bestApex || 0, gameState.bestApexDepth || 0);
  logCombatMessage('🌋 <strong>TITAN SLAIN!</strong> ' + boss.name + ' falls. <strong>The Rift is open</strong>: see the World tab.', 'relic');
  showToast('TITAN SLAIN! The Rift is open.', 'success', true);
}

function canMigrate() {
  const next = WORLDS[getWorldIndex() + 1];
  return !!gameState.riftOpen && !!next && !next.comingSoon && !gameState.isBattling;
}

/** Travel to the next world: a bigger reset than Ascension, with a permanent World Bonus */
function performMigration() {
  if (!canMigrate()) return false;
  const from = getWorld();
  if (!gameState.worldRecords) gameState.worldRecords = {};
  const rec = gameState.worldRecords[from.id] || (gameState.worldRecords[from.id] = {});
  rec.clearedAt = Date.now();
  rec.ascensions = gameState.ascensionCount;
  rec.bestApex = Math.max(rec.bestApex || 0, gameState.bestApexDepth || 0);

  // Everything an Ascension resets
  resetRunState();
  // ...plus the world's own economy
  gameState.bloodstones = 0;
  gameState.ascensionPerks = {};
  gameState.ascensionCount = 0;
  gameState.hybrids = {};
  gameState.incubator = null;
  gameState.bestApexDepth = 0;
  gameState.fightStats = {};
  gameState.riftOpen = false;
  if (gameState.legacy) gameState.legacy.freeRespec = true;

  gameState.world = getWorldIndex() + 1;
  applyWorld();
  const to = getWorld();
  gameState.worldRecords[to.id] = gameState.worldRecords[to.id] || { arrivedAt: Date.now() };
  logCombatMessage('🌀 <strong>MIGRATION COMPLETE.</strong> Welcome to the <strong>' + to.name + '</strong>. World Bonus: Meat/s x' + formatNumber(getWorldMeatMult()) + ', Combat Power x' + getWorldPowerMult().toFixed(1) + '.', 'unlock');
  showToast('Welcome to the ' + to.name + '!', 'success', true);
  renderAfterReset();
  return true;
}

/** ---------- Seal 2 Trophy Weapon ---------- */
function isTrophyUnlocked() {
  return !!(gameState.totem && gameState.totem.sealsBroken >= TROPHY_CONFIG.unlockSeal);
}

function getTrophyLevel() {
  return (gameState.trophy && gameState.trophy.level) || 0;
}

/** Fangs for the next forge, or null at max */
function getTrophyForgeCost() {
  const lvl = getTrophyLevel();
  if (lvl >= TROPHY_WEAPONS.length) return null;
  return Math.round(TROPHY_CONFIG.costBase * Math.pow(TROPHY_CONFIG.costGrowth, lvl));
}

function forgeTrophyWeapon() {
  const cost = getTrophyForgeCost();
  if (!isTrophyUnlocked() || cost === null || gameState.trophy.fangs < cost) return false;
  gameState.trophy.fangs -= cost;
  gameState.trophy.level += 1;
  return true;
}

function getTrophyPowerMult() {
  return 1 + getTrophyLevel() * TROPHY_CONFIG.powerPerLevel;
}

function getTrophyClickMult() {
  return 1 + getTrophyLevel() * TROPHY_CONFIG.clickPerLevel;
}

/** Raw Beast Power from Apex tiers tamed this run */
function getApexBeastPower() {
  let p = 0;
  for (let k = 1; k <= getApexDepth(); k++) p += getApexReward(k);
  return p;
}

/** Bloodstone multiplier from how deep you got this run */
function getApexStoneMult() {
  return 1 + APEX_CONFIG.stonesPerTier * getApexDepth();
}

function tameApexBoss(boss) {
  gameState.apexDepth = getApexDepth() + 1;
  // Apex Shards (materials for the Apex grade of gear)
  if (typeof addMaterial === 'function') addMaterial('apex_shard', EXPEDITION_CONFIG.apexShardsPerTier * boss.apexTier);
  // Apex Fangs for the Trophy Weapon
  if (!gameState.trophy) gameState.trophy = { fangs: 0, level: 0 };
  const fangs = TROPHY_CONFIG.fangsPerTier * boss.apexTier;
  gameState.trophy.fangs += fangs;
  logCombatMessage('🦷 +' + fangs + ' Apex Fang' + (fangs === 1 ? '' : 's') + ' (' + formatNumber(gameState.trophy.fangs) + ' total).', 'default');
  if (gameState.apexDepth > (gameState.bestApexDepth || 0)) {
    // Deepest ever: a one-time Totem Shard reward
    gameState.bestApexDepth = gameState.apexDepth;
    const shards = APEX_CONFIG.bestShardsPerTier * gameState.apexDepth;
    if (gameState.totem) gameState.totem.shards += shards;
    logCombatMessage('🏅 <strong>NEW DEEPEST APEX!</strong> Tier ' + boss.tier + ' reached for the first time: +' + formatNumber(shards) + ' Totem Shards.', 'relic');
  }
  logCombatMessage('👑 <strong>APEX TAMED!</strong> ' + boss.name + ' (Tier ' + boss.tier + ') joins your pack: Combat Power x' + getApexPowerMult().toFixed(2) + ' this run. Ascension Bloodstones now x' + getApexStoneMult().toFixed(2) + '.', 'unlock');
  showToast('APEX TAMED: ' + boss.name + '!', 'success', true);
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
  // Log curves: a normal run pays about the same as before, but very long runs can't explode the payout
  const meatFactor = Math.pow(1 + Math.log10(Math.max(1, gameState.runMeatEarned / 25000000)), 1.0);
  // Square-root curve so late-run power stacking can't explode the payout
  const powerFactor = 1 + 1.6 * Math.log10(1 + (getTotalCombatPower() / 100000));
  const soulLvl = getAscensionPerkLevel('primordial_soul');
  const soulMult = 1 + (soulLvl * 0.20);
  return Math.max(10, Math.floor(10 * meatFactor * powerFactor * soulMult * (1 + getFishCodexBonus('stones')) * getApexStoneMult()));
}

function performAscension() {
  if (!canAscendNow()) return;

  const claimed = calculatePendingBloodstones();
  sound.playWin();

  gameState.bloodstones += claimed;
  gameState.ascensionCount += 1;
  // Hunter's Legacy: one free respec after each Ascension
  if (gameState.legacy) gameState.legacy.freeRespec = true;

  resetRunState();
  checkTotemUnlock();

  logCombatMessage(
    `🔥 <strong>PRIMAL ASCENSION #${gameState.ascensionCount} COMPLETE!</strong> Claimed <strong>+${formatNumber(claimed)} Primal Bloodstones</strong>! Relics, Forge, and Hybrids retained (they sleep until you re-tame their bosses). Bosses grow stronger.`,
    'unlock'
  );
  showToast(`Ascended! Claimed +${formatNumber(claimed)} Primal Bloodstones!`, 'success', true);
  renderAfterReset();
}

/** Everything a run owns: reset by Ascension and by Migration */
function resetRunState() {
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
  gameState.apexDepth = 0; // the Apex Ladder starts over
  BEAST_CATALOG.forEach(b => { if (gameState.fightStats && gameState.fightStats[b.id]) gameState.fightStats[b.id].tameTries = 0; });
  gameState.highestTierUnlocked = 1;
  gameState.selectedBeastIndex = 0;
  gameState.parentLevels = {
    viper_hound: 1,
    boar_hawk: 1,
    grizzly_scorpion: 1,
    chimera_wyrm: 1
  };

  gameState.stamina = getMaxStamina();
}

function renderAfterReset() {
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
      // Feast of Plenty (Hunter's Legacy capstone)
      if (hasLegacyCapstone('feast_of_plenty')) mult *= LEGACY_CONFIG.feastMult;
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
    label: 'MAX OVERDRIVE (' + GENERATOR_MILESTONES[GENERATOR_MILESTONES.length - 1].totalMult + 'x)',
    progressPct: 100
  };
}

/**
 * Core Stat & Economy Helpers
 */
/** Owned at all (kept forever) */
function isRelicOwned(id) {
  return !!gameState.ownedRelics[id];
}

/** A relic only works once its boss has been tamed again this run (same rule as hybrids) */
function hasRelic(id) {
  if (!gameState.ownedRelics[id]) return false;
  const relic = RELIC_REGISTRY[id];
  return !relic || !relic.beastId || !!gameState.tamedBeasts[relic.beastId];
}

function getRelicEffectMultiplier(id) {
  if (!hasRelic(id)) return 0;
  let mult = 1.0;
  if (id !== 'eldritch_crown' && hasRelic('eldritch_crown')) {
    mult *= 1.25;
  }
  const resonanceLvl = getAscensionPerkLevel('trophy_resonance');
  if (resonanceLvl > 0) {
    mult *= (1 + resonanceLvl * 0.20);
  }
  return mult;
}

function getMaxStamina() {
  const campBonus = gameState.campEnduranceLevel * CAMP_ENDURANCE_PER_RANK;
  let maxCap = Math.min(CAMP_ENDURANCE_CAP, gameState.staminaMaxBase + campBonus);
  if (hasRelic('eldritch_crown')) {
    maxCap *= 2;
  }
  maxCap += getFishCodexBonus('maxStamina');
  maxCap += getTotemBonus('stamina');
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
  return Math.floor(baseCost * discount * Math.pow(scale, lvl - 1) * getLegacyReduction('nurturing_hands'));
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
  return Math.floor(hybrid.treatCost * Math.pow(HYBRID_ENHANCE_COST_SCALE, lvl) * getLegacyReduction('hybrid_training'));
}

/** Chance that a spar is a Breakthrough (Adrenaline Focus): 20% + 10% per Tuskpion level, max 100% */
function getSparBreakthroughChance() {
  return Math.min(1, 0.20 + getActiveHybridLevel('tuskpion') * 0.10);
}

/** Forage click crits: chance from relics + Venompincer, multiplier 5x + 0.75x per Venompincer level */
function getCritChance() {
  let c = 0;
  if (hasRelic('serpents_fang')) c += 0.10;
  if (hasRelic('magma_stinger')) c += 0.15;
  c += 0.02 * getActiveHybridLevel('venompincer');
  return Math.min(1, c);
}

function getCritMultiplier() {
  return 5 * (1 + 0.15 * getActiveHybridLevel('venompincer'));
}

function getSparringStaminaCost() {
  const tuskpionLvl = getActiveHybridLevel('tuskpion');
  return tuskpionLvl > 0 ? 3 : 4;
}

const BOAR_REGEN_PER_LEVEL = 0.04; // Boar-Hawk Keen Eye: regen speed per level
const GRIZZLY_WOUND_PER_LEVEL = 0.05; // Grizzly-Scorpion Chitin Bulwark: wound shortening per level

/**
 * Soft limits: the closer a time gets to its limit, the less each new bonus shaves off,
 * so it can never actually reach the limit, but every upgrade still helps a little.
 * (Far from the limit this changes almost nothing: 3s stays ~3.05s, 2s becomes ~2.14s.)
 */
const STAMINA_SOFT_MIN_SEC = 1.0; // regen can approach 1 Stamina per second, never faster
const WOUND_SOFT_MIN_SEC = 3.0;   // a lost fight always wounds you for at least ~3s
function softLimit(sec, min) {
  return sec + min * Math.exp(-sec / min);
}

/** Nursery parents stop at this level */
const NURSERY_MAX_LEVEL = 25;
function isParentMaxed(beastId) {
  return getParentLevel(beastId) >= NURSERY_MAX_LEVEL;
}

function getStaminaRegenInterval(withAdrenalineOverride = null) {
  let interval = gameState.staminaIntervalSec - (gameState.campRecoveryLevel * CAMP_RECOVERY_PER_RANK);
  interval = Math.max(CAMP_RECOVERY_FLOOR_SEC, interval);

  if (gameState.tamedBeasts['boar_hawk']) {
    const bLvl = getParentLevel('boar_hawk');
    // Keen Eye: +4% Stamina regen speed per level (always helps, no floor)
    interval /= (1 + bLvl * BOAR_REGEN_PER_LEVEL);
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

  const viperhawkLvl = getActiveHybridLevel('viperhawk');
  if (viperhawkLvl > 0) {
    interval /= (1 + (viperhawkLvl * 0.05));
  }

  // Fishing: Codex regen bonus and Kelp Vigor meal
  interval /= (1 + getFishCodexBonus('regen'));
  interval /= getFishBuffMult('regen');
  interval /= (1 + getTotemBonus('regen'));
  interval /= (1 + getCharmBonus('stamina'));

  return softLimit(interval, STAMINA_SOFT_MIN_SEC);
}

function getStaminaRegenRate(withAdrenalineOverride = null) {
  const interval = getStaminaRegenInterval(withAdrenalineOverride);
  return 1 / interval;
}

function getBossStaminaCost(beast = getSelectedFightTarget()) {
  return (beast && beast.staminaCost) || 10;
}

function getWoundedDuration(beast = getSelectedFightTarget()) {
  let baseDur = (beast && beast.woundedSec) || gameState.cooldownDurationBase;
  if (gameState.tamedBeasts['grizzly_scorpion']) {
    const gLvl = getParentLevel('grizzly_scorpion');
    // Chitin Bulwark: wounds 5% shorter per level (shrinks forever, never hits a floor)
    baseDur /= (1 + gLvl * GRIZZLY_WOUND_PER_LEVEL);
  }
  const mult = getRelicEffectMultiplier('chitin_carapace');
  const relicDur = hasRelic('chitin_carapace') ? baseDur / (1 + mult) : baseDur;
  return softLimit(relicDur * (1 - Math.min(0.5, getFishCodexBonus('wound'))) * getLegacyReduction('thick_hide') * (1 - getArmorWoundCut()), WOUND_SOFT_MIN_SEC);
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

/**
 * Camp upgrades cap on their OWN ranks, so bonuses from relics, beasts, fishing or the Totem
 * never lock them early. Endurance: base 30 + 2/rank up to 100 (rank 35). Recovery: 15s - 0.75s/rank down to 6s (rank 12).
 */
const CAMP_ENDURANCE_CAP = 100;
const CAMP_ENDURANCE_PER_RANK = 2;
const CAMP_RECOVERY_FLOOR_SEC = 6.0;
const CAMP_RECOVERY_PER_RANK = 0.75;

function getCampEnduranceMaxLevel() {
  return Math.ceil((CAMP_ENDURANCE_CAP - gameState.staminaMaxBase) / CAMP_ENDURANCE_PER_RANK);
}

function isCampEnduranceMaxed() {
  return gameState.campEnduranceLevel >= getCampEnduranceMaxLevel();
}

function getCampRecoveryMaxLevel() {
  return Math.ceil((gameState.staminaIntervalSec - CAMP_RECOVERY_FLOOR_SEC) / CAMP_RECOVERY_PER_RANK);
}

function isCampRecoveryMaxed() {
  return gameState.campRecoveryLevel >= getCampRecoveryMaxLevel();
}

function getCampEnduranceCost() {
  // Gentler growth so the last ranks (up to 100 max Stamina) are reachable: rank 35 costs ~2.4T instead of ~42Qa
  return Math.floor(5000 * Math.pow(1.80, gameState.campEnduranceLevel));
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
  return Math.floor(baseCost * Math.pow(1.6, gameState.weakpointAnatomyLevel));
}

function getWeakpointAnatomyReduction() {
  return Math.min(ANATOMY_MAX_RANK, gameState.weakpointAnatomyLevel) * ANATOMY_REDUCTION_PER_RANK;
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

const OVERDRIVE_COST_EASE = [1, 0.75, 0.5]; // share of normal price growth kept: below 25, 25-49, 50+

function getGeneratorCost(gen) {
  const count = gameState.generators[gen.id] || 0;
  // Overdrive also eases price growth: past 25 owned each unit's price climbs more slowly, and slower still past 50
  const g = gen.costScale - 1;
  const n0 = Math.min(count, 25), n1 = Math.min(Math.max(count - 25, 0), 25), n2 = Math.max(count - 50, 0);
  return Math.floor(gen.baseCost * Math.pow(gen.costScale, n0) * Math.pow(1 + g * OVERDRIVE_COST_EASE[1], n1) * Math.pow(1 + g * OVERDRIVE_COST_EASE[2], n2));
}

/** Hunter rework: Training and Primal Vigor scale Hunter Power by %, and Hunter Power leads the pack */
const HUNTER_CONFIG = {
  bruteMultPerLevel: 0.02,     // Brute Conditioning: +2% Hunter Power per level (plus its flat power)
  sparPerLevel: 0.03,          // Sparring: +3% Hunter Power per level
  sparPerLevelScorpio: 0.06,   // ...with an awake Scorpiodrake
  vigorMultPerRank: 0.15,      // Primal Vigor perk: +15% Hunter Power per rank
  leadershipPerDoubling: 0.15, // every doubling of Hunter Power: +15% Beast Power
  leadershipScale: 100,
  adrenalineMeat: 1.40,        // Adrenaline (spar breakthrough): Meat/s x1.40
  adrenalinePower: 1.10,       // ...and Combat Power x1.10
  warmthHybridPerRank: 0.10,   // Catalytic Warmth perk: +10% hybrid power per rank
  butcheryPerRank: 0.02        // Instinctive Butchery perk: +2% of Meat/s per click per rank
};

function getSparPerLevel() {
  return getActiveHybridLevel('scorpiodrake') > 0 ? HUNTER_CONFIG.sparPerLevelScorpio : HUNTER_CONFIG.sparPerLevel;
}

function getHunterRawPower() {
  const equippedWeapon = getEquippedWeapon();
  const weaponPower = equippedWeapon ? (equippedWeapon.combatPower || 0) : 0;
  return gameState.baseHunterPower + weaponPower + (gameState.bruteConditioningLevel * getBrutePowerPerLevel());
}

function getHunterMultParts() {
  return {
    sparring: 1 + gameState.sparringLevel * getSparPerLevel(),
    brute: 1 + gameState.bruteConditioningLevel * HUNTER_CONFIG.bruteMultPerLevel,
    vigor: 1 + getAscensionPerkLevel('primal_vigor') * HUNTER_CONFIG.vigorMultPerRank,
    honing: (typeof getHoningPowerMult === 'function') ? getHoningPowerMult() : 1,
    helm: (typeof getHelmPowerMult === 'function') ? getHelmPowerMult() : 1
  };
}

function getHunterPower() {
  const m = getHunterMultParts();
  return Math.floor(getHunterRawPower() * m.sparring * m.brute * m.vigor * m.honing * m.helm);
}

/** Leadership: Beast Power multiplier from Hunter Power (+15% per doubling) */
function getLeadershipMult(hunterPower = getHunterPower()) {
  return 1 + HUNTER_CONFIG.leadershipPerDoubling * Math.log2(1 + Math.max(0, hunterPower) / HUNTER_CONFIG.leadershipScale);
}


/**
 * ================= EXPEDITIONS & WEAPON HONING =================
 */
function getExpeditionState() {
  if (!gameState.expedition) gameState.expedition = { active: null, materials: {}, honing: 0, trips: 0 };
  if (!gameState.expedition.materials) gameState.expedition.materials = {};
  return gameState.expedition;
}

function getMaterial(id) {
  return getExpeditionState().materials[id] || 0;
}

function addMaterial(id, n) {
  if (!(n > 0)) return;
  const m = getExpeditionState().materials;
  m[id] = (m[id] || 0) + Math.floor(n);
}

/** You can explore a beast's territory once you have tamed it at least once (in this world) */
function isRegionOpen(region) {
  const rec = gameState.bestiary && gameState.bestiary[region.id];
  return !!(rec && rec.wins > 0) || !!gameState.tamedBeasts[region.id];
}

function isExpeditionsUnlocked() {
  return isFeatureUnlocked('expedition') && EXPEDITION_REGIONS.some(isRegionOpen);
}

/** The beast currently away on an expedition (adds no Beast Power) */
function getExpeditionPartner() {
  const a = getExpeditionState().active;
  return a && a.partner ? a.partner : null;
}

function getExpeditionYield(regionId, durationId, partnerId) {
  const c = EXPEDITION_CONFIG;
  const d = c.durations.find(x => x.id === durationId) || c.durations[0];
  let mult = 1;
  if (partnerId) mult += partnerId === regionId ? c.matchBonus : c.partnerBonus;
  mult *= 1 + c.apexBonusPerTier * (gameState.bestApexDepth || 0);
  return Math.floor(c.baseYield * d.mult * mult);
}

function startExpedition(regionId, durationId, partnerId) {
  const st = getExpeditionState();
  const region = EXPEDITION_REGIONS.find(r => r.id === regionId);
  const d = EXPEDITION_CONFIG.durations.find(x => x.id === durationId);
  if (st.active || !region || !d || !isRegionOpen(region)) return false;
  if (partnerId && !gameState.tamedBeasts[partnerId]) return false;
  const now = Date.now();
  st.active = { region: regionId, duration: durationId, partner: partnerId || null, startAt: now, endAt: now + d.sec * 1000, yield: getExpeditionYield(regionId, durationId, partnerId) };
  const p = partnerId ? BEAST_CATALOG.find(b => b.id === partnerId) : null;
  logCombatMessage('🧭 <strong>Expedition set out</strong> to ' + region.name + (p ? ' with your ' + p.name : '') + ' (' + d.label + ').', 'default');
  return true;
}

function getExpeditionTimeLeft(nowMs = Date.now()) {
  const a = getExpeditionState().active;
  return a ? Math.max(0, (a.endAt - nowMs) / 1000) : 0;
}

function isExpeditionReady() {
  const a = getExpeditionState().active;
  return !!a && getExpeditionTimeLeft() <= 0;
}

/** Collect a finished expedition (or recall an unfinished one for nothing) */
function collectExpedition(recall) {
  const st = getExpeditionState();
  const a = st.active;
  if (!a) return null;
  if (!recall && getExpeditionTimeLeft() > 0) return null;
  st.active = null;
  const region = EXPEDITION_REGIONS.find(r => r.id === a.region);
  if (recall) {
    logCombatMessage('🧭 Expedition to ' + region.name + ' recalled early. Nothing found.', 'default');
    return { recalled: true };
  }
  addMaterial(region.material, a.yield);
  st.trips = (st.trips || 0) + 1;
  logCombatMessage('🧭 <strong>Expedition home!</strong> +' + a.yield + ' ' + MATERIALS[region.material].name + ' from ' + region.name + '.', 'win');
  showToast('Expedition home: +' + a.yield + ' ' + MATERIALS[region.material].name, 'success', true);
  return { material: region.material, amount: a.yield };
}

/** Trophy fights (re-fighting a tamed boss) drop that boss's material */
function dropTrophyMaterial(beast) {
  const region = EXPEDITION_REGIONS.find(r => r.id === (beast.baseId || beast.id));
  if (!region) return 0;
  const resonance = 1 + 0.25 * getAscensionPerkLevel('trophy_resonance');
  const n = Math.floor((EXPEDITION_CONFIG.trophyDropBase + (beast.tier || 1) / 2) * resonance * (1 + getCharmBonus('drops')));
  addMaterial(region.material, n);
  logCombatMessage('🦴 +' + n + ' ' + MATERIALS[region.material].name + ' salvaged from the fight.', 'default');
  return n;
}


/**
 * ================= WORKBENCH GEAR =================
 */
function getGearState() {
  if (!gameState.gear) gameState.gear = { pieces: {} };
  if (!gameState.gear.pieces) gameState.gear.pieces = {};
  return gameState.gear;
}

function getClimateId() {
  return getWorld().id;
}

function getGearPiece(slotId, climateId = getClimateId()) {
  return getGearState().pieces[slotId + ':' + climateId] || null;
}

/** 1..40 for a crafted piece */
function getGearEffLevel(piece) {
  return piece ? piece.grade * GEAR_CONFIG.levelsPerGrade + piece.level : 0;
}

/** The piece that counts in this world: your piece for this climate, else your best other one at half strength */
function getActiveGear(slotId) {
  // Whichever is stronger here: your piece for this climate at full strength, or another climate's piece at half
  let best = null;
  Object.keys(getGearState().pieces).forEach(key => {
    const [slot, climate] = key.split(':');
    if (slot !== slotId) return;
    const p = getGearState().pieces[key];
    const strength = climate === getClimateId() ? 1 : GEAR_CONFIG.offClimateMult;
    if (!best || getGearEffLevel(p) * strength > getGearEffLevel(best.piece) * best.strength) best = { piece: p, strength, climate };
  });
  return best;
}

/** Effective level that applies here (half for off-climate gear) */
function getGearPower(slotId) {
  const g = getActiveGear(slotId);
  return g ? getGearEffLevel(g.piece) * g.strength : 0;
}

function getHelmPowerMult() {
  return 1 + getGearPower('helm') * GEAR_SLOTS[0].perLevel;
}

function getArmorWoundCut() {
  return Math.min(0.4, getGearPower('armor') * GEAR_SLOTS[1].perLevel);
}

function getArmorStaminaRefund() {
  return Math.min(0.4, getGearPower('armor') * GEAR_SLOTS[1].perLevel);
}

function getCharmBonus(bonusId) {
  const g = getActiveGear('charm');
  if (!g || g.piece.bonus !== bonusId) return 0;
  const b = CHARM_BONUSES.find(x => x.id === bonusId);
  return getGearEffLevel(g.piece) * g.strength * b.perLevel;
}

function getGearName(slotId, piece, climateId = getClimateId()) {
  const slot = GEAR_SLOTS.find(s => s.id === slotId);
  const c = CLIMATES[climateId] || CLIMATES.wilds;
  return c.prefix + GEAR_CONFIG.grades[piece ? piece.grade : 0].name + ' ' + slot.name;
}

/** Materials for the next step of a piece: { cost: {id: n}, kind: 'craft' | 'level' | 'reforge' } or null at max */
function getGearUpgrade(slotId) {
  const p = getGearPiece(slotId);
  const c = GEAR_CONFIG;
  if (!p) {
    const cost = {};
    c.grades[0].materials.forEach(m => { cost[m] = c.costBase; });
    return { cost, kind: 'craft' };
  }
  const eff = getGearEffLevel(p);
  if (p.level >= c.levelsPerGrade) {
    if (p.grade >= c.grades.length - 1) return null;
    const each = Math.ceil(c.costBase * Math.pow(c.costGrowth, eff) * c.reforgeMult);
    const cost = {};
    c.grades[p.grade + 1].materials.forEach(m => { cost[m] = each; });
    return { cost, kind: 'reforge' };
  }
  const each = Math.ceil(c.costBase * Math.pow(c.costGrowth, eff));
  const cost = {};
  c.grades[p.grade].materials.forEach(m => { cost[m] = each; });
  return { cost, kind: 'level' };
}

function canAffordMaterials(cost) {
  return Object.keys(cost).every(m => getMaterial(m) >= cost[m]);
}

function spendMaterials(cost) {
  const mats = getExpeditionState().materials;
  Object.keys(cost).forEach(m => { mats[m] -= cost[m]; });
}

/** Craft, level up, or reforge a piece for the current climate. charmBonus is needed when crafting a Charm. */
function upgradeGear(slotId, charmBonus) {
  const up = getGearUpgrade(slotId);
  if (!up || !canAffordMaterials(up.cost)) return false;
  if (up.kind === 'craft' && slotId === 'charm' && !CHARM_BONUSES.some(b => b.id === charmBonus)) return false;
  spendMaterials(up.cost);
  const key = slotId + ':' + getClimateId();
  const pieces = getGearState().pieces;
  if (up.kind === 'craft') pieces[key] = { grade: 0, level: 1, bonus: slotId === 'charm' ? charmBonus : null };
  else if (up.kind === 'reforge') { pieces[key].grade += 1; pieces[key].level = 1; }
  else pieces[key].level += 1;
  const p = pieces[key];
  logCombatMessage('🛠️ <strong>' + (up.kind === 'craft' ? 'Crafted' : up.kind === 'reforge' ? 'Reforged into' : 'Improved') + ' ' + getGearName(slotId, p) + (up.kind === 'level' ? ' to +' + p.level : '') + '.</strong>', 'unlock');
  return true;
}

function getCharmChangeCost() {
  const p = getGearPiece('charm');
  return p ? { hawk_feather: GEAR_CONFIG.charmChangeCost * (p.grade + 1) } : null;
}

function changeCharmBonus(bonusId) {
  const p = getGearPiece('charm');
  const cost = getCharmChangeCost();
  if (!p || p.bonus === bonusId || !CHARM_BONUSES.some(b => b.id === bonusId) || !canAffordMaterials(cost)) return false;
  spendMaterials(cost);
  p.bonus = bonusId;
  return true;
}

/** ---------- Weapon Honing ---------- */
function getHoningLevel() {
  return getExpeditionState().honing || 0;
}

function getHoningPowerMult() {
  return 1 + getHoningLevel() * HONING_CONFIG.powerPerLevel;
}

/** Materials the next honing level needs: { id: amount }, or null at max */
function getHoningCost() {
  const lvl = getHoningLevel();
  if (lvl >= HONING_CONFIG.maxLevel) return null;
  const tier = HONING_CONFIG.tiers.find(t => lvl < t.upTo) || HONING_CONFIG.tiers[HONING_CONFIG.tiers.length - 1];
  const each = Math.ceil(HONING_CONFIG.costBase * Math.pow(HONING_CONFIG.costGrowth, lvl));
  const cost = {};
  tier.materials.forEach(m => { cost[m] = each; });
  return cost;
}

function canHone() {
  const cost = getHoningCost();
  return !!cost && Object.keys(cost).every(m => getMaterial(m) >= cost[m]);
}

function honeWeapon() {
  if (!canHone()) return false;
  const cost = getHoningCost();
  const mats = getExpeditionState().materials;
  Object.keys(cost).forEach(m => { mats[m] -= cost[m]; });
  getExpeditionState().honing = getHoningLevel() + 1;
  logCombatMessage('⚒️ <strong>Weapon Honing ' + getHoningLevel() + '!</strong> Hunter Power x' + getHoningPowerMult().toFixed(2) + ', kept forever.', 'unlock');
  return true;
}

function getAdrenalinePowerMult() {
  return gameState.adrenalineFocusRemaining > 0 ? HUNTER_CONFIG.adrenalinePower : 1;
}

/** Hybrids stay dormant (no Beast Power) until both parents are tamed in the current run. Passives always apply. */
function isHybridAwake(hybrid) {
  return !!gameState.tamedBeasts[hybrid.parent1] && !!gameState.tamedBeasts[hybrid.parent2];
}

function getHybridRawPower(hybrid) {
  const hLvl = getHybridLevel(hybrid.id);
  if (hLvl <= 0) return 0;
  const full = Math.floor(hybrid.basePower * (1 + ((hLvl - 1) * 0.20)) * (1 + getAscensionPerkLevel('catalytic_warmth') * HUNTER_CONFIG.warmthHybridPerRank));
  if (isHybridAwake(hybrid)) return full;
  // Pack Alpha (Hunter's Legacy capstone): dormant hybrids still lend part of their power
  return hasLegacyCapstone('pack_alpha') ? Math.floor(full * LEGACY_CONFIG.packAlphaShare) : 0;
}

/** Level that a hybrid's passive bonuses use: 0 while it is dormant (both parents must be tamed this run) */
function getActiveHybridLevel(hybridId) {
  const hybrid = HYBRID_CATALOG.find(h => h.id === hybridId);
  if (!hybrid || !isHybridAwake(hybrid)) return 0;
  return getHybridLevel(hybridId);
}

function getBeastMasteryMultiplier() {
  return 1 + (gameState.beastMasteryLevel * BEAST_MASTERY_PER_LEVEL);
}

function getTotalBeastPower() {
  let rawBeastPower = 0;
  const away = getExpeditionPartner();
  for (const beast of BEAST_CATALOG) {
    if (gameState.tamedBeasts[beast.id] && beast.id !== away) {
      const pLvl = getParentLevel(beast.id);
      const levelMult = 1 + ((pLvl - 1) * 0.15);
      rawBeastPower += Math.floor(beast.rewardPower * levelMult);
    }
  }
  for (const hybrid of HYBRID_CATALOG) {
    rawBeastPower += getHybridRawPower(hybrid);
  }
  rawBeastPower += getApexBeastPower();
  return Math.floor(rawBeastPower * getBeastMasteryMultiplier() * getLegacyMult('beast_bond'));
}

function getTotalCombatPower() {
  const hunter = getHunterPower();
  const base = hunter + getTotalBeastPower() * getLeadershipMult(hunter);
  // Fishing: Codex power bonus and Abyssal Fervor meal
  return Math.floor(base * (1 + getFishCodexBonus('power')) * getFishBuffMult('power') * (1 + getTotemBonus('power')) * getLegacyMult('keen_instincts') * getTrophyPowerMult() * getWorldPowerMult() * getApexPowerMult() * getAdrenalinePowerMult() * getMoltenHeartMult() * (gameState.devPowerMult || 1));
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
    rate *= (1 + 0.5 * getRelicEffectMultiplier('dragon_scale'));
  }

  const hasAdrenaline = withAdrenalineOverride !== null
    ? withAdrenalineOverride
    : gameState.adrenalineFocusRemaining > 0;

  if (hasAdrenaline) {
    rate *= HUNTER_CONFIG.adrenalineMeat;
  }
  if (gameState.tamedBeasts['chimera_wyrm']) {
    const cLvl = getParentLevel('chimera_wyrm');
    rate *= (1 + (cLvl * 0.10));
  }
  const gryphoLvl = getActiveHybridLevel('gryphowyrm');
  if (gryphoLvl > 0) {
    rate *= (1 + (gryphoLvl * 0.15));
  }
  const scorpioLvl = getActiveHybridLevel('scorpiodrake');
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
  rate *= (1 + getTotemBonus('meat'));
  rate *= getLegacyMult('cleavers_edge');
  // Worlds: permanent World Bonus, and this world's twist (Blizzards)
  rate *= getWorldMeatMult();
  rate *= getTwistMeatMult();

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
    percentBonus += (butcheryLvl * HUNTER_CONFIG.butcheryPerRank);
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

  const viperhawkLvl = getActiveHybridLevel('viperhawk');
  if (viperhawkLvl > 0) {
    totalYield = Math.floor(totalYield * (1 + (viperhawkLvl * 0.15)));
  }

  // Marrow Harvest (Hunter's Legacy) boosts the flat strike too
  totalYield = Math.floor(totalYield * getLegacyMult('marrow_harvest') * getTrophyClickMult());

  totalYield += Math.floor(passiveRate * percentBonus);

  const viperwyrmLvl = getActiveHybridLevel('viperwyrm');
  if (viperwyrmLvl > 0) {
    const bankedBonus = Math.floor(gameState.meat * (0.01 * viperwyrmLvl));
    const maxBankBonus = totalYield * (2 * viperwyrmLvl);
    totalYield += Math.min(bankedBonus, maxBankBonus);
  }

  totalYield = Math.floor(totalYield * (1 + getFishCodexBonus('click')));

  return Math.max(1, totalYield);
}

/** Bosses grow stronger with every Ascension (Totem guardians use their own scaling) */
const BOSS_ASCENSION_GROWTH = 0.75; // +this much boss power per Ascension (linear)...
const BOSS_ASCENSION_SOFTCAP = 8;   // ...for the first 8 Ascensions in a world
const BOSS_ASCENSION_GROWTH_LATE = 0.25; // then slower, so a world never turns into a wall
function getBossAscensionMult(beast) {
  if (!beast || beast.isGuardian || beast.isTitan) return 1;
  const a = gameState.ascensionCount || 0;
  return 1 + BOSS_ASCENSION_GROWTH * Math.min(a, BOSS_ASCENSION_SOFTCAP) + BOSS_ASCENSION_GROWTH_LATE * Math.max(0, a - BOSS_ASCENSION_SOFTCAP);
}

function getEffectiveBossBracket(beast) {
  const reduction = getWeakpointAnatomyReduction();
  const grow = getBossAscensionMult(beast);
  return {
    min: Math.floor(beast.minPower * grow * (1 - reduction)),
    max: Math.floor(beast.maxPower * grow * (1 - reduction))
  };
}

function calculateWinChance(beast) {
  const base = calculateBaseWinChance(beast);
  // Hunter's Eye charm: flat bonus to odds you already have (never turns 0% into a chance)
  return base > 0 ? Math.min(0.98, base + getCharmBonus('odds')) : 0;
}

function calculateBaseWinChance(beast) {
  const power = getCombatPowerVs(beast);
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
  let totemLayersBroken = 0;

  // Split the step wherever a meal buff runs out, so offline catch-up only applies each buff while it lasted
  let remaining = dt;
  while (remaining > 0) {
    const nextExpiry = getNextFishBuffExpiry();
    const step = (nextExpiry > 0 && nextExpiry < remaining) ? nextExpiry : remaining;
    if (advanceSimulationCore(step, isBulkCatchup)) hatchedDuringCatchup = true;
    tickFishBuffs(step);
    fishCaught += tickFishingLines(step);
    totemLayersBroken += dealTotemDamage(getTotemDps() * step, isBulkCatchup);
    remaining -= step;
  }

  if (isBulkCatchup && dt >= 15) {
    const meatEarned = Math.floor(gameState.meat - startMeat);
    const staminaEarned = Math.floor(gameState.stamina - startStamina);
    if (meatEarned > 0 || staminaEarned > 0 || hatchedDuringCatchup || fishCaught > 0 || totemLayersBroken > 0) {
      const timeLabel = dt >= 3600
        ? `${(dt / 3600).toFixed(1)}h`
        : dt >= 60
        ? `${Math.floor(dt / 60)}m${Math.floor(dt % 60)}s`
        : `${Math.floor(dt)}s`;

      logCombatMessage(
        `⏳ <strong>Camp Report (${timeLabel} away):</strong> Harvested +${formatNumber(meatEarned)} Meat${staminaEarned > 0 ? ` & recovered +${staminaEarned} Stamina` : ''}${fishCaught > 0 ? ` & your lines caught ${fishCaught} fish` : ''}${totemLayersBroken > 0 ? ` & shattered ${totemLayersBroken} Totem layer${totemLayersBroken === 1 ? '' : 's'}` : ''}.`,
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
  const dropMult = (1 + (resonanceLvl * 0.25)) * (1 + getFishCodexBonus('relic')) * (1 + getCharmBonus('drops'));

  // One roll per expedition, so at most ONE relic can drop per win.
  // Each unowned relic keeps its own drop chance; the rarest is checked first.
  const unowned = beast.relics
    .map(relicId => RELIC_REGISTRY[relicId])
    .filter(relic => relic && !gameState.ownedRelics[relic.id])
    .sort((a, b) => a.dropRate - b.dropRate);

  let roll = Math.random();
  let relic = null;
  for (const candidate of unowned) {
    const chance = Math.min(1, candidate.dropRate * dropMult);
    if (roll < chance) { relic = candidate; break; }
    roll -= chance;
  }

  if (relic) {
    gameState.ownedRelics[relic.id] = true;
    droppedAny = true;
    sound.playWin();

    const isLegendary = relic.rarity === 'Legendary';
    if (isLegendary) {
      showToast(`LEGENDARY DROP: ${relic.name} acquired!`, 'success', true);
      logCombatMessage(`✨ <strong>LEGENDARY DROP!</strong> Found [<strong>${relic.name}</strong>]! ${relic.desc}`, 'relic');
    } else {
      showToast(`RELIC DROP: ${relic.name} acquired!`, 'success');
      logCombatMessage(`🏆 <strong>RELIC ACQUIRED!</strong> Found [<strong>${relic.name}</strong>]! ${relic.desc}`, 'relic');
    }
  }

  if (!droppedAny) {
    logCombatMessage(`No new relics discovered on this expedition. Refight the boss to roll again!`, 'default');
  }

  renderTrophyCabinet();
  saveGameToStorage();
  return droppedAny;
}

/** Fight counter: trophy expeditions (tamed bosses), taming tries this run, and Seal guardian tries */
function getFightStats(id) {
  if (!gameState.fightStats) gameState.fightStats = {};
  if (!gameState.fightStats[id]) gameState.fightStats[id] = { trophyFights: 0, trophyWins: 0, relics: 0, tameTries: 0 };
  return gameState.fightStats[id];
}

function recordFight(beast, won, wasTrophy, gotRelic, winChance) {
  const st = getFightStats(beast.id);
  // Bestiary record (kept forever)
  if (!gameState.bestiary) gameState.bestiary = {};
  const rec = gameState.bestiary[beast.id] || (gameState.bestiary[beast.id] = { wins: 0, bestOdds: 0, firstTamed: null });
  rec.fights = (rec.fights || 0) + 1;
  if (typeof winChance === 'number') rec.bestOdds = Math.max(rec.bestOdds || 0, winChance);
  if (won) {
    rec.wins = (rec.wins || 0) + 1;
    if (!rec.firstTamed) rec.firstTamed = Date.now();
  }
  if (wasTrophy) {
    st.trophyFights++;
    if (won) st.trophyWins++;
    if (gotRelic) st.relics++;
  } else {
    st.tameTries++;
  }
}

function challengeCurrentBeast() {
  if (gameState.inCooldown || gameState.isBattling) return;

  const beast = getSelectedFightTarget();
  const staminaCost = getBossStaminaCost(beast);
  if (gameState.stamina < staminaCost) {
    showToast(`Not enough stamina! Requires ${staminaCost} Stamina.`, 'warning');
    return;
  }
  const playerPower = getCombatPowerVs(beast);
  const { min: effMin } = getEffectiveBossBracket(beast);

  if (playerPower < effMin && !hasRelic('magma_stinger')) {
    showToast(`Combat Power too low (${formatNumber(playerPower)} vs min${formatNumber(effMin)})!`, 'danger');
    return;
  }

  gameState.stamina = Math.max(0, gameState.stamina - staminaCost);
  gameState.isBattling = true;
  sound.playTone(260, 'square', 0.2, 0.1);

  // The fight is decided now; the arena (if any) just acts it out before we resolve it
  const winChance = calculateWinChance(beast);
  const roll = Math.random();
  const before = getFightSnapshot();
  const quiet = !!gameState._quietFight;
  gameState._quietFight = false;
  const delay = quiet ? 0 : ((typeof fightPresenterStart === 'function') ? fightPresenterStart(beast, winChance, roll) : 1500);
  let resolved = false;
  const resolveFight = () => {
    if (resolved) return;
    resolved = true;
    pendingFight = null;
    gameState.isBattling = false;
    const isAlreadyTamed = !!gameState.tamedBeasts[beast.id];
    let gotRelic = false;

    if (roll <= winChance) {
      sound.playWin();
      clearBattleInsight(beast);

      if (hasRelic('magma_stinger') && winChance < 0.25) {
        gameState.stamina = Math.min(getMaxStamina(), gameState.stamina + staminaCost);
        const windfall = Math.floor(getMeatRate() * 600);
        addMeat(windfall);
        logCombatMessage(`🔥 <strong>Underdog's Fury!</strong> Magma Stinger refunded ${staminaCost} Stamina & awarded a 10m meat windfall (+${formatNumber(windfall)} Meat)!`, 'relic');
        showToast(`Underdog's Fury Triggered! Full Stamina refund & +${formatNumber(windfall)} Meat!`, 'success', true);
      }

      if (beast.isGuardian) {
        breakTotemSeal(beast);
        updateBeastSelectorOptions();
      } else if (beast.isTitan) {
        slayTitan(beast);
        updateBeastSelectorOptions();
      } else if (beast.isApex) {
        tameApexBoss(beast);
        updateBeastSelectorOptions();
        renderMenagerie();
        renderAscensionAltar();
      } else if (!isAlreadyTamed) {
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
          if (checkTotemUnlock()) {
            logCombatMessage(`🗿 <strong>THE GROUND SPLITS!</strong> The <strong>Primal Totem</strong> rises beside the Altar. Your Combat Power now wears it down, even while you're away.`, 'relic');
            showToast(`The Primal Totem has risen!`, 'success', true);
          }
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
        renderTrophyCabinet(); // this boss's relics wake up
      } else {
        logCombatMessage(
          `🏆 <strong>TROPHY EXPEDITION CONQUERED!</strong> Successfully defeated <strong>${beast.name}</strong>. Searching for relics...`,
          'win'
        );
        gotRelic = !!rollRelicDrops(beast);
        dropTrophyMaterial(beast);
      }
    } else {
      sound.playDefeat();
      if (addBattleInsight(beast)) {
        logCombatMessage('🧠 <strong>Battle Insight:</strong> +' + Math.round(getBattleInsightStacks(beast) * LEGACY_CONFIG.insightPerLoss * 100) + '% Combat Power against ' + beast.name + ' until you beat it.', 'relic');
      }
      // Hide Armor: a lost fight refunds part of its Stamina
      const refund = Math.floor(staminaCost * getArmorStaminaRefund());
      if (refund > 0) gameState.stamina = Math.min(getMaxStamina(), gameState.stamina + refund);
      gameState.inCooldown = true;
      gameState.cooldownRemaining = getWoundedDuration(beast);
      gameState.cooldownTotal = gameState.cooldownRemaining;

      logCombatMessage(
        `💀 <strong>EXPEDITION FAILED!</strong> Defeated by <strong>${beast.name}</strong> (Roll:${(roll * 100).toFixed(1)}% vs ${(winChance * 100).toFixed(1)}\%). Hunter wounded for${Math.round(gameState.cooldownRemaining)}s (Stamina recovery halted)!`,
        'loss'
      );
      showToast(`Defeated! Hunter wounded (${Math.round(gameState.cooldownRemaining)}s recovery).`, 'danger');
    }

    recordFight(beast, roll <= winChance, isAlreadyTamed, gotRelic, winChance);

    if (roll <= winChance && isTotemUnlocked()) {
      dealTotemDamage(getTotemDps() * TOTEM_CONFIG.bossWinSec);
    }

    saveGameToStorage();
    if (!quiet && typeof fightPresenterEnd === 'function') {
      fightPresenterEnd({ beast, win: roll <= winChance, roll, winChance, before, after: Object.assign(getFightSnapshot(), { wound: gameState.cooldownRemaining || 0 }) });
    }
  };
  const timer = setTimeout(resolveFight, delay);
  if (!resolved) pendingFight = { timer, resolve: resolveFight };
}

let pendingFight = null;

/** Skip button: resolve the fight that is playing right now */
function finishPendingFightNow() {
  if (!pendingFight) return;
  clearTimeout(pendingFight.timer);
  pendingFight.resolve();
}

/** What a fight can change, so the results screen can show it */
function getFightSnapshot() {
  return {
    tamed: Object.keys(gameState.tamedBeasts),
    relics: Object.keys(gameState.ownedRelics),
    highestTier: gameState.highestTierUnlocked,
    bestApex: gameState.bestApexDepth || 0,
    fangs: gameState.trophy ? gameState.trophy.fangs : 0,
    shards: gameState.totem ? gameState.totem.shards : 0,
    stones: gameState.bloodstones
  };
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
      weaponLadderVersion: 2,
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
      totem: gameState.totem,
      apexDepth: gameState.apexDepth || 0,
      trophy: gameState.trophy,
      bestApexDepth: gameState.bestApexDepth || 0,
      legacy: gameState.legacy,
      fightStats: gameState.fightStats,
      fightAnim: gameState.fightAnim || 'full',
      bestiary: gameState.bestiary || {},
      genBuyMode: gameState.genBuyMode,
      automation: gameState.automation,
      world: gameState.world || 0,
      worldRecords: gameState.worldRecords || {},
      riftOpen: !!gameState.riftOpen,
      tundra: gameState.tundra || null,
      volcano: gameState.volcano || null,
      expedition: gameState.expedition || null,
      gear: gameState.gear || null,
      unlocks: gameState.unlocks || {},
      devPowerMult: gameState.devPowerMult || 1,
      newFeatures: gameState.newFeatures || {},
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
      // Saves from before the 7-weapon armory: the Glaive moved from tier 4 to tier 7
      if (data.weaponLadderVersion !== 2 && gameState.weaponTier >= 4) gameState.weaponTier = 7;
      gameState.weaponTier = Math.max(0, Math.min(WEAPONS_CATALOG.length, gameState.weaponTier));
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
      // Refund expansions that were bought before they had any content
      ASCENSION_EXPANSIONS.forEach(exp => {
        if (exp.comingSoon && gameState.unlockedExpansions && gameState.unlockedExpansions[exp.id]) {
          delete gameState.unlockedExpansions[exp.id];
          gameState.bloodstones += exp.cost;
          gameState.pendingNotice = 'Refunded ' + exp.cost + ' Bloodstones for ' + exp.name + ' (not built yet).';
        }
      });
      if (data.fishing && typeof data.fishing === 'object') {
        const fresh = defaultFishingState();
        gameState.fishing = Object.assign(fresh, data.fishing);
        gameState.fishing.buffs = Object.assign(defaultFishingState().buffs, data.fishing.buffs || {});
        gameState.fishing.basket = data.fishing.basket || {};
        gameState.fishing.codex = data.fishing.codex || {};
        gameState.fishing.catches = data.fishing.catches || {};
      }
      if (data.totem && typeof data.totem === 'object') {
        gameState.totem = Object.assign(defaultTotemState(), data.totem);
        gameState.totem.bonuses = Object.assign(defaultTotemState().bonuses, data.totem.bonuses || {});
      }
      if (data.legacy && typeof data.legacy === 'object') {
        gameState.legacy = Object.assign(defaultLegacyState(), data.legacy);
        gameState.legacy.ranks = data.legacy.ranks || {};
        gameState.legacy.insight = data.legacy.insight || {};
      }
      if (data.fightStats && typeof data.fightStats === 'object') gameState.fightStats = data.fightStats;
      if (['full', 'quick', 'skip'].includes(data.fightAnim)) gameState.fightAnim = data.fightAnim;
      if (data.bestiary && typeof data.bestiary === 'object') gameState.bestiary = data.bestiary;
      // Older saves: beasts already tamed count as discovered and tamed in the Bestiary
      if (!gameState.bestiary) gameState.bestiary = {};
      Object.keys(gameState.tamedBeasts || {}).forEach(id => { if (!gameState.bestiary[id]) gameState.bestiary[id] = { wins: 1, bestOdds: 0, firstTamed: Date.now() }; });
      if (typeof data.apexDepth === 'number') gameState.apexDepth = data.apexDepth;
      if (data.trophy && typeof data.trophy === 'object') gameState.trophy = { fangs: data.trophy.fangs || 0, level: data.trophy.level || 0 };
      if (typeof data.bestApexDepth === 'number') gameState.bestApexDepth = data.bestApexDepth;
      if (['x1', 'x10', 'next'].includes(data.genBuyMode)) gameState.genBuyMode = data.genBuyMode;
      if (data.automation && typeof data.automation === 'object') gameState.automation = Object.assign({ autoBuy: false, autoTend: false }, data.automation);
      if (typeof data.world === 'number' && data.world >= 0 && data.world < WORLDS.length) gameState.world = data.world;
      if (data.worldRecords && typeof data.worldRecords === 'object') gameState.worldRecords = data.worldRecords;
      gameState.riftOpen = !!data.riftOpen;
      if (data.gear && typeof data.gear === 'object') gameState.gear = { pieces: data.gear.pieces || {} };
      if (data.expedition && typeof data.expedition === 'object') gameState.expedition = Object.assign({ active: null, materials: {}, honing: 0, trips: 0 }, data.expedition);
      if (data.volcano && typeof data.volcano === 'object') { gameState.volcano = Object.assign(getVolcano(), data.volcano); gameState.volcano.stats = Object.assign({ rounds: 0, wins: 0, busts: 0, best: 0 }, data.volcano.stats || {}); }
      if (data.tundra && typeof data.tundra === 'object') gameState.tundra = Object.assign(getTundra(), data.tundra, { caches: Array.isArray(data.tundra.caches) ? data.tundra.caches : [] });
      applyWorld();
      // Saves that already Ascended get the Totem right away
      checkTotemUnlock();
      // Milestone unlocks: older saves get everything they have already earned, without pop-ups
      gameState.devPowerMult = (typeof data.devPowerMult === 'number' && data.devPowerMult > 0) ? data.devPowerMult : 1;
      if (data.unlocks && typeof data.unlocks === 'object') { gameState.unlocks = data.unlocks; gameState.newFeatures = (data.newFeatures && typeof data.newFeatures === 'object') ? data.newFeatures : {}; }
      checkFeatureUnlocks(!data.unlocks);

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