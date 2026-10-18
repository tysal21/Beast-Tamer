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

  // Fight counter per boss / guardian (kept forever; taming tries reset each run)
  fightStats: {},

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
function checkTotemUnlock() {
  if (!gameState.totem) gameState.totem = defaultTotemState();
  const t = gameState.totem;
  if (t.unlocked) return false;
  if (!gameState.tamedBeasts['chimera_wyrm'] && !(gameState.ascensionCount > 0)) return false;
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
  const k = gameState.totem.layer / TOTEM_CONFIG.sealEvery;
  const base = BEAST_CATALOG[(k - 1) % BEAST_CATALOG.length];
  const min = Math.floor(TOTEM_CONFIG.sealBaseMin * Math.pow(TOTEM_CONFIG.sealGrowth, k - 1));
  return {
    id: 'totem_guardian_' + k,
    isGuardian: true,
    sealNumber: k,
    baseId: base.id,
    tier: base.tier,
    name: getTotemTitle(k) + ' ' + base.name,
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
  return BEAST_CATALOG[gameState.selectedBeastIndex] || BEAST_CATALOG[0];
}

function getTotemBonus(type) {
  return (gameState.totem && gameState.totem.bonuses && gameState.totem.bonuses[type]) || 0;
}

/** Passive Totem damage per second */
function getTotemDps() {
  if (!isTotemUnlocked()) return 0;
  return getTotalCombatPower() * TOTEM_CONFIG.passivePct * getLegacyMult('totem_breaker');
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
  return getTotalCombatPower() * TOTEM_CONFIG.clickPct * getLegacyMult('totem_breaker');
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
  const vigor = getAscensionPerkLevel('primal_vigor') * 25;
  if (vigor > 0) hunter.push({ label: 'Primal Vigor perk', value: vigor });
  const w = getEquippedWeapon();
  if (w) hunter.push({ label: w.name, value: w.combatPower || 0 });
  const brute = gameState.bruteConditioningLevel * getBrutePowerPerLevel();
  if (brute > 0) hunter.push({ label: 'Brute Conditioning Lvl ' + gameState.bruteConditioningLevel, value: brute });
  const sparPer = getActiveHybridLevel('scorpiodrake') > 0 ? 0.05 : 0.02;
  const sparMult = 1 + gameState.sparringLevel * sparPer;

  const beasts = [];
  for (const beast of BEAST_CATALOG) {
    if (!gameState.tamedBeasts[beast.id]) continue;
    const l = getParentLevel(beast.id);
    beasts.push({ label: beast.name + ' Lvl ' + l, value: Math.floor(beast.rewardPower * (1 + (l - 1) * 0.15)) });
  }
  for (const h of HYBRID_CATALOG) {
    const p = getHybridRawPower(h);
    if (p > 0) beasts.push({ label: h.name + ' Lvl ' + getHybridLevel(h.id) + (isHybridAwake(h) ? '' : ' (Pack Alpha 25%)'), value: p });
  }
  const beastMults = [];
  if (gameState.beastMasteryLevel > 0) beastMults.push({ label: 'Beast Mastery Lvl ' + gameState.beastMasteryLevel, mult: getBeastMasteryMultiplier() });
  if (getLegacyRank('beast_bond') > 0) beastMults.push({ label: 'Beast Bond (Legacy)', mult: getLegacyMult('beast_bond') });

  const mults = [];
  const add = (label, m) => { if (m > 1.0001) mults.push({ label, mult: m }); };
  add('Fish Codex', 1 + getFishCodexBonus('power'));
  add('Abyssal Fervor meal', getFishBuffMult('power'));
  add('Totem blessings and Seals', 1 + getTotemBonus('power'));
  add('Keen Instincts (Legacy)', getLegacyMult('keen_instincts'));

  return {
    hunter, sparLevel: gameState.sparringLevel, sparMult, hunterTotal: getHunterPower(),
    beasts, beastMults, beastTotal: getTotalBeastPower(),
    mults, total: getTotalCombatPower()
  };
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
  return Math.max(10, Math.floor(10 * meatFactor * powerFactor * soulMult));
}

function performAscension() {
  if (!canAscendNow()) return;

  const claimed = calculatePendingBloodstones();
  sound.playWin();

  gameState.bloodstones += claimed;
  gameState.ascensionCount += 1;
  // Hunter's Legacy: one free respec after each Ascension
  if (gameState.legacy) gameState.legacy.freeRespec = true;

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

  logCombatMessage(
    `🔥 <strong>PRIMAL ASCENSION #${gameState.ascensionCount} COMPLETE!</strong> Claimed <strong>+${formatNumber(claimed)} Primal Bloodstones</strong>! Relics, Forge, and Hybrids retained (they sleep until you re-tame their bosses). Bosses grow stronger.`,
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
  return softLimit(relicDur * (1 - Math.min(0.5, getFishCodexBonus('wound'))) * getLegacyReduction('thick_hide'), WOUND_SOFT_MIN_SEC);
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

function getHunterPower() {
  const vigorBonus = getAscensionPerkLevel('primal_vigor') * 25;
  const equippedWeapon = getEquippedWeapon();
  const weaponPower = equippedWeapon ? (equippedWeapon.combatPower || 0) : 0;
  const rawPower = gameState.baseHunterPower + vigorBonus + weaponPower + (gameState.bruteConditioningLevel * getBrutePowerPerLevel());
  const scorpiodrakeLvl = getActiveHybridLevel('scorpiodrake');
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
  if (hLvl <= 0) return 0;
  const full = Math.floor(hybrid.basePower * (1 + ((hLvl - 1) * 0.20)));
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
  return Math.floor(rawBeastPower * getBeastMasteryMultiplier() * getLegacyMult('beast_bond'));
}

function getTotalCombatPower() {
  const base = getHunterPower() + getTotalBeastPower();
  // Fishing: Codex power bonus and Abyssal Fervor meal
  return Math.floor(base * (1 + getFishCodexBonus('power')) * getFishBuffMult('power') * (1 + getTotemBonus('power')) * getLegacyMult('keen_instincts'));
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
    rate *= 1.25;
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

  const viperhawkLvl = getActiveHybridLevel('viperhawk');
  if (viperhawkLvl > 0) {
    totalYield = Math.floor(totalYield * (1 + (viperhawkLvl * 0.15)));
  }

  // Marrow Harvest (Hunter's Legacy) boosts the flat strike too
  totalYield = Math.floor(totalYield * getLegacyMult('marrow_harvest'));

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
const BOSS_ASCENSION_GROWTH = 0.25; // +this much boss power per Ascension (linear)
function getBossAscensionMult(beast) {
  if (!beast || beast.isGuardian) return 1;
  return 1 + BOSS_ASCENSION_GROWTH * (gameState.ascensionCount || 0);
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
  const dropMult = 1 + (resonanceLvl * 0.25);

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

function recordFight(beast, won, wasTrophy, gotRelic) {
  const st = getFightStats(beast.id);
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

  setTimeout(() => {
    gameState.isBattling = false;
    const winChance = calculateWinChance(beast);
    const roll = Math.random();
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
      }
    } else {
      sound.playDefeat();
      if (addBattleInsight(beast)) {
        logCombatMessage('🧠 <strong>Battle Insight:</strong> +' + Math.round(getBattleInsightStacks(beast) * LEGACY_CONFIG.insightPerLoss * 100) + '% Combat Power against ' + beast.name + ' until you beat it.', 'relic');
      }
      gameState.inCooldown = true;
      gameState.cooldownRemaining = getWoundedDuration(beast);
      gameState.cooldownTotal = gameState.cooldownRemaining;

      logCombatMessage(
        `💀 <strong>EXPEDITION FAILED!</strong> Defeated by <strong>${beast.name}</strong> (Roll:${(roll * 100).toFixed(1)}% vs ${(winChance * 100).toFixed(1)}\%). Hunter wounded for${Math.round(gameState.cooldownRemaining)}s (Stamina recovery halted)!`,
        'loss'
      );
      showToast(`Defeated! Hunter wounded (${Math.round(gameState.cooldownRemaining)}s recovery).`, 'danger');
    }

    recordFight(beast, roll <= winChance, isAlreadyTamed, gotRelic);

    if (roll <= winChance && isTotemUnlocked()) {
      dealTotemDamage(getTotemDps() * TOTEM_CONFIG.bossWinSec);
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
      legacy: gameState.legacy,
      fightStats: gameState.fightStats,
      genBuyMode: gameState.genBuyMode,
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
      if (['x1', 'x10', 'next'].includes(data.genBuyMode)) gameState.genBuyMode = data.genBuyMode;
      // Saves that already tamed the Wyrm or Ascended get the Totem right away
      checkTotemUnlock();

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