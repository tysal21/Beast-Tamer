/**
 * Generator Milestone Overdrive Thresholds
 * Reaching 10, 25, 50, and 100 owned multiplies that generator's output!
 */
const GENERATOR_MILESTONES = [
  { count: 10, mult: 2, totalMult: 2, label: '2x Output' },
  { count: 25, mult: 2, totalMult: 4, label: '4x Output' },
  { count: 50, mult: 2, totalMult: 8, label: '8x Output' },
  { count: 100, mult: 5, totalMult: 40, label: '40x Output' }
];

/**
 * 6-Tier Generator Ladder Catalog
 */
const GENERATOR_LADDER = [
  {
    id: 'snare_lines',
    name: 'Snare Lines',
    icon: 'fa-ring',
    image: 'snare-lines.png',
    baseCost: 25,
    costScale: 1.18,
    yieldPerSec: 0.5,
    desc: 'Twisted wire cords catching lesser prey.',
    reqType: 'none',
    reqLabel: 'Unlocked'
  },
  {
    id: 'hunting_pack',
    name: 'Hunting Pack',
    icon: 'fa-dog',
    baseCost: 400,
    costScale: 1.20,
    yieldPerSec: 4,
    desc: 'Trained scouting hounds harrying perimeter wildwood.',
    reqType: 'generator',
    reqTargetId: 'snare_lines',
    reqCount: 10,
    reqLabel: 'Requires 10 Snare Lines'
  },
  {
    id: 'heavy_deadfalls',
    name: 'Heavy Deadfalls',
    icon: 'fa-cubes',
    baseCost: 6500,
    costScale: 1.22,
    yieldPerSec: 45,
    desc: 'Crushing stone deadfalls along migratory game trails.',
    reqType: 'generator',
    reqTargetId: 'hunting_pack',
    reqCount: 12,
    reqLabel: 'Requires 12 Hunting Packs'
  },
  {
    id: 'pheromone_pits',
    name: 'Pheromone Bait Pits',
    icon: 'fa-flask-vial',
    baseCost: 120000,
    costScale: 1.23,
    yieldPerSec: 600,
    desc: 'Deep subterranean pits fueled by chimera musk.',
    reqType: 'both',
    reqBeastId: 'viper_hound',
    reqTargetId: 'heavy_deadfalls',
    reqCount: 15,
    reqLabel: 'Requires Viper-Hound & 15 Deadfalls'
  },
  {
    id: 'subjugated_dens',
    name: 'Subjugated Dens',
    icon: 'fa-dungeon',
    baseCost: 2500000,
    costScale: 1.24,
    yieldPerSec: 9000,
    desc: 'Conquered breeding caves supplying steady harvests.',
    reqType: 'both',
    reqBeastId: 'boar_hawk',
    reqTargetId: 'pheromone_pits',
    reqCount: 15,
    reqLabel: 'Requires Boar-Hawk & 15 Pheromone Pits'
  },
  {
    id: 'harpoon_rigs',
    name: 'Colossal Harpoon Rigs',
    icon: 'fa-anchor',
    baseCost: 65000000,
    costScale: 1.25,
    yieldPerSec: 160000,
    desc: 'Pneumatic ballistae anchoring primeval behemoths.',
    reqType: 'both',
    reqBeastId: 'grizzly_scorpion',
    reqTargetId: 'subjugated_dens',
    reqCount: 15,
    reqLabel: 'Requires Grizzly-Scorpion & 15 Dens'
  }
];

/**
 * Permanent Relic Registry
 */
const RELIC_REGISTRY = {
  venom_vial: {
    id: 'venom_vial',
    beastId: 'viper_hound',
    name: 'Venom Vial',
    rarity: 'Common',
    dropRate: 0.35,
    desc: '+15% Meat production per second.',
    icon: 'fa-flask-round-poison'
  },
  serpents_fang: {
    id: 'serpents_fang',
    beastId: 'viper_hound',
    name: "Serpent's Fang",
    rarity: 'Legendary',
    dropRate: 0.05,
    desc: 'Clicks gain +8% of passive Meat/sec. 10% chance per click for 5x Critical Hunt.',
    icon: 'fa-tooth'
  },
  raptor_feather: {
    id: 'raptor_feather',
    beastId: 'boar_hawk',
    name: 'Raptor Feather',
    rarity: 'Common',
    dropRate: 0.30,
    desc: 'Stamina regenerates 15% faster.',
    icon: 'fa-feather'
  },
  razor_talons: {
    id: 'razor_talons',
    beastId: 'boar_hawk',
    name: 'Razor Talons',
    rarity: 'Legendary',
    dropRate: 0.04,
    desc: 'All Training Disciplines cost 25% less Meat. Brute Conditioning gives +5 Power instead of +3.',
    icon: 'fa-hand-back-fist'
  },
  chitin_carapace: {
    id: 'chitin_carapace',
    beastId: 'grizzly_scorpion',
    name: 'Chitin Carapace',
    rarity: 'Common',
    dropRate: 0.25,
    desc: 'Wounded recovery time halved.',
    icon: 'fa-shield'
  },
  magma_stinger: {
    id: 'magma_stinger',
    beastId: 'grizzly_scorpion',
    name: 'Magma Stinger',
    rarity: 'Legendary',
    dropRate: 0.03,
    desc: "Underdog's Fury: Wins under 25% odds refund the fight's stamina and award a 10m Meat windfall. Lets you challenge bosses below minimum power (1% odds). +15% Critical Hunt chance.",
    icon: 'fa-fire'
  },
  dragon_scale: {
    id: 'dragon_scale',
    beastId: 'chimera_wyrm',
    name: 'Dragon Scale',
    rarity: 'Common',
    dropRate: 0.20,
    desc: '+100% global Meat production.',
    icon: 'fa-gem'
  },
  eldritch_crown: {
    id: 'eldritch_crown',
    beastId: 'chimera_wyrm',
    name: 'Eldritch Crown',
    rarity: 'Legendary',
    dropRate: 0.02,
    desc: 'Doubles Max Stamina. Cuts stamina regen interval in half. Boosts all other relics by +50%.',
    icon: 'fa-crown'
  }
};

/**
 * Milestone Boss Beast Catalog
 */
const BEAST_CATALOG = [
  {
    id: 'viper_hound',
    tier: 1,
    name: 'Viper-Hound',
    image: 'viper-hound.png',
    fallbackImage: 'https://placehold.co/180x180/171e26/10b981?text=Viper+Hound',
    minPower: 35,
    maxPower: 220,
    rewardPower: 60,
    staminaCost: 10,
    woundedSec: 30,
    accentColor: '#10b981',
    desc: 'A venomous canine chimera swift as striking lightning.',
    relics: ['venom_vial', 'serpents_fang']
  },
  {
    id: 'boar_hawk',
    tier: 2,
    name: 'Boar-Hawk',
    image: 'boar-hawk.png',
    fallbackImage: 'https://placehold.co/180x180/171e26/f59e0b?text=Boar+Hawk',
    minPower: 700,
    maxPower: 3500,
    rewardPower: 450,
    staminaCost: 12,
    woundedSec: 90,
    accentColor: '#f59e0b',
    desc: 'Armored avian brute equipped with titanium tusks and razor talons.',
    relics: ['raptor_feather', 'razor_talons']
  },
  {
    id: 'grizzly_scorpion',
    tier: 3,
    name: 'Grizzly-Scorpion',
    image: 'grizzly-scorpion.png',
    fallbackImage: 'https://placehold.co/180x180/171e26/ef4444?text=Grizzly+Scorpion',
    minPower: 12000,
    maxPower: 55000,
    rewardPower: 3500,
    staminaCost: 15,
    woundedSec: 180,
    accentColor: '#ef4444',
    desc: 'Massive apex terror boasting thick bone carapace and a molten sting.',
    relics: ['chitin_carapace', 'magma_stinger']
  },
  {
    id: 'chimera_wyrm',
    tier: 4,
    name: 'Chimera-Wyrm',
    image: 'chimera-wyrm.png',
    fallbackImage: 'https://placehold.co/180x180/171e26/8b5cf6?text=Chimera+Wyrm',
    minPower: 120000,
    maxPower: 600000,
    rewardPower: 18000,
    staminaCost: 25,
    woundedSec: 300,
    accentColor: '#8b5cf6',
    desc: 'Colossal primeval serpent with obsidian scales. The ultimate Apex milestone.',
    relics: ['dragon_scale', 'eldritch_crown']
  }
];

/**
 * Parent Beast Nursery Definitions
 */
const PARENT_DEFINITIONS = [
  {
    id: 'viper_hound',
    name: 'Viper-Hound',
    tier: 1,
    nurseryBaseCost: 200000,
    costScale: 1.38,
    passive: 'Envenomed Tools (+10% base click meat/lvl)',
    icon: 'fa-dog'
  },
  {
    id: 'boar_hawk',
    name: 'Boar-Hawk',
    tier: 2,
    nurseryBaseCost: 2000000,
    costScale: 1.4,
    passive: 'Keen Eye (-0.25s stamina interval/lvl)',
    icon: 'fa-feather'
  },
  {
    id: 'grizzly_scorpion',
    name: 'Grizzly-Scorpion',
    tier: 3,
    nurseryBaseCost: 32000000,
    costScale: 1.42,
    passive: 'Chitin Bulwark (-2s wounded time/lvl)',
    icon: 'fa-shield-halved'
  },
  {
    id: 'chimera_wyrm',
    name: 'Chimera-Wyrm',
    tier: 4,
    nurseryBaseCost: 600000000,
    costScale: 1.45,
    passive: 'Apex Dominance (+10% Meat/sec/lvl)',
    icon: 'fa-dragon'
  }
];

/**
 * Armory Weapons Catalog
 */
const WEAPONS_CATALOG = [
  {
    tier: 1,
    name: 'Crude Spear',
    cost: 250,
    flatBonus: 2,
    percentBonus: 0.0,
    combatPower: 8,
    icon: 'fa-wand-magic-sparkles',
    desc: 'Increases click gain to +3 Meat per strike. +8 Combat Power.'
  },
  {
    tier: 2,
    name: 'Recurve Bow',
    cost: 8500,
    flatBonus: 14,
    percentBonus: 0.01,
    combatPower: 50,
    icon: 'fa-bullseye',
    desc: '+15 Meat per click + 1% of passive Meat/sec. +50 Combat Power.'
  },
  {
    tier: 3,
    name: 'Steel Crossbow',
    cost: 350000,
    flatBonus: 99,
    percentBonus: 0.02,
    combatPower: 250,
    icon: 'fa-crosshairs',
    desc: '+100 Meat per click + 2% of passive Meat/sec. +250 Combat Power.'
  },
  {
    tier: 4,
    name: 'Beast-Bone Glaive',
    cost: 18000000,
    flatBonus: 999,
    percentBonus: 0.035,
    combatPower: 1500,
    icon: 'fa-skull-crossbones',
    desc: '+1,000 Meat per click + 3.5% of passive Meat/sec. +1,500 Combat Power.'
  }
];

/**
 * Phase 2 Hybrid Chimera Catalog
 */
const HYBRID_CATALOG = [
  {
    id: 'viperhawk',
    name: 'Viperhawk',
    parent1: 'viper_hound',
    parent2: 'boar_hawk',
    treatName: 'Venom-Grain Mash',
    treatCost: 60000000,
    gestationSec: 300,
    basePower: 800,
    icon: 'fa-crow',
    color: '#10b981',
    desc: '+800 Base Power. +15% base Click Meat & +5% Stamina Regen speed per level.'
  },
  {
    id: 'venompincer',
    name: 'Venompincer',
    parent1: 'viper_hound',
    parent2: 'grizzly_scorpion',
    treatName: 'Toxic Marrow Chunk',
    treatCost: 900000000,
    gestationSec: 600,
    basePower: 4500,
    icon: 'fa-bug',
    color: '#06b6d4',
    desc: '+4,500 Base Power. +2% Critical Click Chance & +15% Crit Damage per level.'
  },
  {
    id: 'tuskpion',
    name: 'Tuskpion',
    parent1: 'boar_hawk',
    parent2: 'grizzly_scorpion',
    treatName: 'Crag-Root Broth',
    treatCost: 3000000000,
    gestationSec: 900,
    basePower: 11000,
    icon: 'fa-shield-halved',
    color: '#f59e0b',
    desc: '+11,000 Base Power. Reduces Sparring Stamina cost to 3. Sparring breakthrough rate +10% per level.'
  },
  {
    id: 'viperwyrm',
    name: 'Viperwyrm',
    parent1: 'viper_hound',
    parent2: 'chimera_wyrm',
    treatName: 'Eldritch Bile Pellet',
    treatCost: 15000000000,
    gestationSec: 1200,
    basePower: 35000,
    icon: 'fa-dragon',
    color: '#a855f7',
    desc: '+35,000 Base Power. Clicks grant +1% of banked Meat stock per level (up to 2x click yield/lvl).'
  },
  {
    id: 'gryphowyrm',
    name: 'Gryphowyrm',
    parent1: 'boar_hawk',
    parent2: 'chimera_wyrm',
    treatName: 'Volcanic Feather Suet',
    treatCost: 60000000000,
    gestationSec: 1800,
    basePower: 65000,
    icon: 'fa-feather-pointed',
    color: '#ec4899',
    desc: '+65,000 Base Power. +15% global Meat/sec generator speed per level.'
  },
  {
    id: 'scorpiodrake',
    name: 'Scorpiodrake',
    parent1: 'grizzly_scorpion',
    parent2: 'chimera_wyrm',
    treatName: 'Primordial Heart Meat',
    treatCost: 280000000000,
    gestationSec: 2700,
    basePower: 150000,
    icon: 'fa-skull-crossbones',
    color: '#ef4444',
    desc: '+150,000 Base Power. Boosts Sparring multiplier gains (+5%/lvl) and +25% Meat/sec per level.'
  }
];

/**
 * Phase 3: Permanent Ascension Bloodstone Perks
 */
const ASCENSION_PERKS = [
  {
    id: 'feral_bloodline',
    name: 'Feral Bloodline',
    icon: 'fa-droplet',
    baseCost: 5,
    costScale: 1.6,
    maxLevel: null,
    desc: '+25% Global Meat/sec production per rank.'
  },
  {
    id: 'instinctive_butchery',
    name: 'Instinctive Butchery',
    icon: 'fa-khanda',
    baseCost: 8,
    costScale: 1.75,
    maxLevel: null,
    desc: '+50% base Click Meat & +0.5% of passive Meat/sec added to clicks per rank.'
  },
  {
    id: 'primal_vigor',
    name: 'Primal Vigor',
    icon: 'fa-heart-pulse',
    baseCost: 10,
    costScale: 2.0,
    maxLevel: 5,
    desc: '+25 Base Hunter Power & -10% Training Discipline Meat costs per rank (Max 5).'
  },
  {
    id: 'catalytic_warmth',
    name: 'Catalytic Warmth',
    icon: 'fa-temperature-arrow-up',
    baseCost: 12,
    costScale: 2.1,
    maxLevel: 5,
    desc: '-10% Hybrid Egg gestation time & -12% Parent Nursery Meat costs per rank (Max 5).'
  },
  {
    id: 'trophy_resonance',
    name: 'Trophy Resonance',
    icon: 'fa-gem',
    baseCost: 15,
    costScale: 2.3,
    maxLevel: 5,
    desc: '+20% Relic passive effectiveness & +25% relative Relic drop chance per rank (Max 5).'
  },
  {
    id: 'primordial_soul',
    name: 'Primordial Soul',
    icon: 'fa-skull',
    baseCost: 20,
    costScale: 2.5,
    maxLevel: null,
    desc: '+20% Primal Bloodstones claimed from Ascension rituals per rank.'
  }
];

/**
 * Phase 3+: Realm Expansions (Major Feature Unlocks bought with Bloodstones)
 */
const ASCENSION_EXPANSIONS = [
  {
    id: 'primal_fishing',
    name: 'Primal Fishing Dock & Abyssal Angler',
    icon: 'fa-fish-fins',
    cost: 50,
    reqAscensions: 1,
    badge: 'Expansion I',
    desc: 'Construct a deep-water dock along the subterranean river to angle for leviathan fish, kelp buffs, and abyssal bait.'
  },
  {
    id: 'ancient_expeditions',
    name: 'Sunken Ruins & Pack Expeditions',
    icon: 'fa-map-location-dot',
    cost: 250,
    reqAscensions: 3,
    badge: 'Expansion II',
    desc: 'Dispatch idle tamed hybrids on timed autonomous scavenging missions into primeval ruins.'
  }
];

/**
 * ================= EXPANSION I: PRIMAL FISHING DOCK =================
 * Unlocked by the 'primal_fishing' Realm Expansion. Everything here persists through Ascension.
 */
const FISHING_CONFIG = {
  castStaminaCost: 2,
  biteDelayMinSec: 1.5,
  biteDelayMaxSec: 5.0,
  // Relative odds of each rarity when casting by hand (Idle Lines only catch common & uncommon)
  rarityWeights: { common: 60, uncommon: 28, rare: 10, legendary: 2 },
  /**
   * Skill check after a bite: a marker sweeps back and forth; click while it's inside the catch zone.
   *  zone      = catch zone width (fraction of the bar)
   *  sweepSec  = seconds for the marker to cross the bar once
   *  misses    = misses allowed before the fish escapes
   *  drift     = how fast the zone slides around (bar widths per second, 0 = still)
   *  erratic   = marker randomly speeds up and slows down
   */
  skillCheck: {
    common:    { zone: 0.30, sweepSec: 1.6,  misses: 2, drift: 0,    erratic: false },
    uncommon:  { zone: 0.22, sweepSec: 1.2,  misses: 1, drift: 0,    erratic: false },
    rare:      { zone: 0.14, sweepSec: 0.9,  misses: 1, drift: 0.12, erratic: false },
    legendary: { zone: 0.08, sweepSec: 0.85, misses: 0, drift: 0.18, erratic: true }
  },
  // Gold sliver in the middle of the zone: hitting it lands 2 fish. Set enabled: false to remove it.
  perfect: { enabled: true, size: 0.25, bonusFish: 1 },
  rod: {
    maxLevel: 5,
    baseCost: 5000000,
    costScale: 4,
    zoneBonusPerLevel: 0.06,     // +6% wider catch zone per level
    rareWeightPerLevel: 0.15     // +15% rare & legendary odds per level
  },
  lines: {
    maxLines: 3,
    costs: [0, 25000000, 750000000], // 1st line is free with the dock
    catchIntervalSec: 300            // each line lands a fish every 5 minutes (also while offline)
  },
  basketCap: 40,
  buffMaxSec: 3600 // cooking the same meal again extends it, up to 60 minutes
};

const FISH_RARITY_STYLE = {
  common:    { label: 'Common',    text: 'text-slate-300',  ring: 'border-slate-300',  badge: 'bg-slate-700/60 text-slate-200 border-slate-500/50' },
  uncommon:  { label: 'Uncommon',  text: 'text-emerald-300', ring: 'border-emerald-400', badge: 'bg-emerald-900/50 text-emerald-300 border-emerald-600/50' },
  rare:      { label: 'Rare',      text: 'text-sky-300',    ring: 'border-sky-400',    badge: 'bg-sky-900/50 text-sky-300 border-sky-600/50' },
  legendary: { label: 'Legendary', text: 'text-amber-300',  ring: 'border-amber-400',  badge: 'bg-amber-900/50 text-amber-300 border-amber-500/60' }
};

/**
 * Fish species. 'codex' is the permanent bonus granted the first time each species is caught.
 * Codex types: meat (+% Meat/sec), click (+% click Meat), maxStamina (+flat), regen (+% stamina regen speed),
 * power (+% Combat Power), wound (-% wounded time)
 */
const FISH_CATALOG = [
  { id: 'mudgill_carp', name: 'Mudgill Carp', rarity: 'common', icon: 'fa-fish',
    desc: 'Bottom-feeder fattened on cave silt.', codex: { type: 'meat', value: 0.03 }, codexLabel: '+3% Meat/sec' },
  { id: 'cave_minnow', name: 'Blind Cave Minnow', rarity: 'common', icon: 'fa-fish',
    desc: 'Eyeless swarmers that glitter in torchlight.', codex: { type: 'click', value: 0.05 }, codexLabel: '+5% Click Meat' },
  { id: 'bonefin_perch', name: 'Bonefin Perch', rarity: 'common', icon: 'fa-fish',
    desc: 'Its fins are sharpened bone. Handle carefully.', codex: { type: 'maxStamina', value: 2 }, codexLabel: '+2 Max Stamina' },
  { id: 'ember_eel', name: 'Ember Eel', rarity: 'uncommon', icon: 'fa-worm',
    desc: 'Warm to the touch, even out of the water.', codex: { type: 'meat', value: 0.05 }, codexLabel: '+5% Meat/sec' },
  { id: 'glowscale_trout', name: 'Glowscale Trout', rarity: 'uncommon', icon: 'fa-fish-fins',
    desc: 'Bioluminescent scales light the deep river.', codex: { type: 'regen', value: 0.05 }, codexLabel: '+5% Stamina Regen' },
  { id: 'ironjaw_pike', name: 'Ironjaw Pike', rarity: 'uncommon', icon: 'fa-fish-fins',
    desc: 'Bites through snare wire without slowing down.', codex: { type: 'power', value: 0.03 }, codexLabel: '+3% Combat Power' },
  { id: 'abyssal_angler', name: 'Abyssal Angler', rarity: 'rare', icon: 'fa-lightbulb',
    desc: 'Lures prey with a lantern grown from its skull.', codex: { type: 'meat', value: 0.10 }, codexLabel: '+10% Meat/sec' },
  { id: 'kelp_wraith', name: 'Kelp Wraith', rarity: 'rare', icon: 'fa-ghost',
    desc: 'Half fish, half drifting weed. Its slime knits wounds.', codex: { type: 'wound', value: 0.15 }, codexLabel: '-15% Wounded time' },
  { id: 'leviathan_fry', name: 'Leviathan Fry', rarity: 'legendary', icon: 'fa-dragon',
    desc: 'A newborn sea-titan. Already the size of a boar.', codex: { type: 'power', value: 0.08 }, codexLabel: '+8% Combat Power' },
  { id: 'primordial_coelacanth', name: 'Primordial Coelacanth', rarity: 'legendary', icon: 'fa-shield-halved',
    desc: 'Older than the beasts above. It remembers the first hunt.', codex: { type: 'meat', value: 0.15 }, codexLabel: '+15% Meat/sec' }
];

/** Timed meal buffs from the Cookpot */
const FISH_BUFFS = {
  meat:  { label: 'Smoked Feast',   effect: '+50% Meat/sec',       icon: 'fa-drumstick-bite', mult: 1.5 },
  regen: { label: 'Kelp Vigor',     effect: '+50% Stamina Regen',  icon: 'fa-bolt',           mult: 1.5 },
  power: { label: 'Abyssal Fervor', effect: '+25% Combat Power',   icon: 'fa-hand-fist',      mult: 1.25 }
};

/** Recipes take any fish of the listed rarities (the most plentiful species are used first) */
const FISH_RECIPES = [
  { id: 'smoked_strips', name: 'Smoked Mudgill Strips', icon: 'fa-fire-burner',
    needs: { common: 3 }, buffs: ['meat'], durationSec: 600 },
  { id: 'kelp_wrapped_eel', name: 'Kelp-Wrapped Eel', icon: 'fa-leaf',
    needs: { uncommon: 2 }, buffs: ['regen'], durationSec: 600 },
  { id: 'angler_broth', name: 'Abyssal Angler Broth', icon: 'fa-mug-hot',
    needs: { rare: 1, common: 2 }, buffs: ['power'], durationSec: 900 },
  { id: 'leviathan_feast', name: 'Leviathan Feast', icon: 'fa-crown',
    needs: { legendary: 1 }, buffs: ['meat', 'regen', 'power'], durationSec: 1200 }
];
