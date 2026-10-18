/**
 * Generator Milestone Overdrive Thresholds
 * Reaching 10, 25, 50, and 100 owned multiplies that generator's output!
 */
const GENERATOR_MILESTONES = [
  { count: 10, mult: 2, totalMult: 2, label: '2x Output' },
  { count: 25, mult: 3, totalMult: 6, label: '6x Output' },
  { count: 50, mult: 4, totalMult: 24, label: '24x Output' },
  { count: 100, mult: 10, totalMult: 240, label: '240x Output' }
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
    icon: 'fa-vial'
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
    desc: '+50% global Meat production.',
    icon: 'fa-gem'
  },
  eldritch_crown: {
    id: 'eldritch_crown',
    beastId: 'chimera_wyrm',
    name: 'Eldritch Crown',
    rarity: 'Legendary',
    dropRate: 0.02,
    desc: 'Doubles Max Stamina. Cuts stamina regen interval in half. Boosts all other relics by +25%.',
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
    passive: 'Keen Eye (+4% Stamina regen speed/lvl)',
    icon: 'fa-feather'
  },
  {
    id: 'grizzly_scorpion',
    name: 'Grizzly-Scorpion',
    tier: 3,
    nurseryBaseCost: 32000000,
    costScale: 1.42,
    passive: 'Chitin Bulwark (wounds heal 5% faster/lvl)',
    icon: 'fa-shield-halved'
  },
  {
    id: 'chimera_wyrm',
    name: 'Chimera-Wyrm',
    tier: 4,
    nurseryBaseCost: 600000000,
    costScale: 1.75,
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
    cost: 250000,
    flatBonus: 99,
    percentBonus: 0.02,
    combatPower: 220,
    icon: 'fa-crosshairs',
    desc: '+100 Meat per click + 2% of passive Meat/sec. +220 Combat Power.'
  },
  {
    tier: 4,
    name: 'Bone-Tipped Lance',
    cost: 900000,
    flatBonus: 249,
    percentBonus: 0.025,
    combatPower: 380,
    icon: 'fa-bone',
    desc: '+250 Meat per click + 2.5% of passive Meat/sec. +380 Combat Power.'
  },
  {
    tier: 5,
    name: 'Barbed Harpoon',
    cost: 2500000,
    flatBonus: 449,
    percentBonus: 0.0275,
    combatPower: 560,
    icon: 'fa-anchor',
    desc: '+450 Meat per click + 2.75% of passive Meat/sec. +560 Combat Power.'
  },
  {
    tier: 6,
    name: 'Obsidian War-Hammer',
    cost: 7000000,
    flatBonus: 699,
    percentBonus: 0.03,
    combatPower: 800,
    icon: 'fa-hammer',
    desc: '+700 Meat per click + 3% of passive Meat/sec. +800 Combat Power.'
  },
  {
    tier: 7,
    name: 'Beast-Bone Glaive',
    cost: 30000000,
    flatBonus: 999,
    percentBonus: 0.035,
    combatPower: 1250,
    icon: 'fa-skull-crossbones',
    desc: '+1,000 Meat per click + 3.5% of passive Meat/sec. +1,250 Combat Power.'
  },
  {
    tier: 8,
    name: 'Ironhide Greataxe',
    cost: 250000000,
    flatBonus: 2499,
    percentBonus: 0.0375,
    combatPower: 1500,
    icon: 'fa-gavel',
    desc: '+2,500 Meat per click + 3.75% of passive Meat/sec. +1,500 Combat Power.'
  },
  {
    tier: 9,
    name: 'Stormcaller Trident',
    cost: 3000000000,
    flatBonus: 5999,
    percentBonus: 0.04,
    combatPower: 3000,
    icon: 'fa-bolt-lightning',
    desc: '+6,000 Meat per click + 4% of passive Meat/sec. +3,000 Combat Power.'
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
    desc: '+4,500 Base Power. +2% crit chance and +0.75x crit multiplier per level (crits start at 5x).'
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
    desc: '+11,000 Base Power. Sparring costs 3 Stamina instead of 4. +10% Sparring breakthrough chance per level.'
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
    comingSoon: true, // not built yet: can't be bought
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

/**
 * ================= PRIMAL TOTEM (post-Wyrm endless goal) =================
 * Unlocks the first time you tame the Chimera-Wyrm and is never reset by Ascension.
 * Normal layers have HP and fall to damage from your Combat Power.
 * Every `sealEvery`-th layer is a Seal: no HP, beaten by winning a guardian fight on the Hunt tab.
 */
const TOTEM_CONFIG = {
  layer1Hp: 15000000,       // HP of layer 1
  hpGrowth: 1.8,            // each normal layer has this many times the HP of the previous one
  sealEvery: 5,             // layers 5, 10, 15, ... are Seals

  passivePct: 0.02,         // passive damage per second = 2% of Combat Power (offline too)
  clickPct: 0.0025,         // each Forage click = 0.25% of Combat Power
  strikeStamina: 10,        // Strike button stamina cost
  strikeSec: 60,            // a Strike deals this many seconds of passive damage
  bossWinSec: 300,          // any boss win slams the Totem for this many seconds of passive damage

  shardsPerLayer: 10,       // normal layer reward: 10 x layer number Totem Shards

  // Seal guardians: Seal k needs min = sealBaseMin x sealGrowth^(k-1), max = min x sealMaxMult
  sealBaseMin: 300000,
  sealGrowth: 2.5,
  sealMaxMult: 5,
  sealStamina: 25,
  sealWoundSec: 300,
  sealStones: 40,           // Seal reward: 40 x Seal number Bloodstones
  sealShards: 100,          // Seal reward: 100 x Seal number Totem Shards
  sealPowerBonus: 0.10      // Seal reward: +10% Combat Power, permanent
};

/** Permanent bonus for each normal layer, rotating in this order */
const TOTEM_LAYER_BONUSES = [
  { type: 'meat',    value: 0.05, label: '+5% Meat/sec',        icon: 'fa-drumstick-bite' },
  { type: 'power',   value: 0.03, label: '+3% Combat Power',    icon: 'fa-hand-fist' },
  { type: 'stamina', value: 2,    label: '+2 Max Stamina',      icon: 'fa-bolt' },
  { type: 'regen',   value: 0.05, label: '+5% Stamina Regen',   icon: 'fa-heart-pulse' }
];

/** Guardian / depth titles, one per lap of four Seals. After the last: Eternal II, III, ... */
const TOTEM_TITLES = ['Primordial', 'Ancient', 'Elder', 'Mythic', 'Eternal'];

/** Features that future updates attach to Seals (shown as "coming soon" until built) */
const TOTEM_UNLOCKS = [
  { seal: 1, name: "Hunter's Legacy skill tree", desc: 'Spend Totem Shards on a permanent skill tree.', icon: 'fa-sitemap', live: true },
  { seal: 2, name: 'Trophy Weapons', desc: 'Forge weapons beyond the Glaive from boss parts.', icon: 'fa-hammer' },
  { seal: 3, name: 'Packmaster automation', desc: 'Auto-buy generators, auto-tend the nest, auto trophy fights.', icon: 'fa-robot' },
  { seal: 4, name: 'Primordial Relics', desc: 'Guardians drop a new tier of relics.', icon: 'fa-gem' }
];

/**
 * Hunter's Legacy skill tree (opens at Seal 1, bought with Totem Shards, never reset by Ascension)
 * Rank cost = baseCost x costGrowth^(current rank). Capstones are one 300-Shard rank.
 */
const LEGACY_CONFIG = {
  costGrowth: 1.6,
  respecFeePct: 0.10,      // a paid respec keeps 90% of spent Shards; the first respec after each Ascension is free
  unlockSeal: 1,
  insightPerLoss: 0.02,    // Battle Insight: +2% Combat Power vs that foe per loss
  insightMaxStacks: 10,    // up to +20%
  packAlphaShare: 0.25,    // Pack Alpha: dormant hybrids give 25% of their Beast Power
  feastMult: 1.25          // Feast of Plenty: extra x1.25 per Overdrive milestone reached
};

const LEGACY_BRANCHES = [
  { id: 'butcher', name: 'Butcher', tagline: 'Meat and clicks', icon: 'fa-drumstick-bite', color: 'amber' },
  { id: 'warden', name: 'Warden', tagline: 'Beasts and hybrids', icon: 'fa-paw', color: 'emerald' },
  { id: 'stalker', name: 'Stalker', tagline: 'Combat and the Totem', icon: 'fa-crosshairs', color: 'rose' },
  { id: 'packmaster', name: 'Packmaster', tagline: 'Opens at Seal 3', icon: 'fa-robot', color: 'slate', locked: true }
];

const LEGACY_NODES = [
  // Butcher
  { id: 'cleavers_edge', branch: 'butcher', name: "Cleaver's Edge", icon: 'fa-utensils', maxRank: 5, baseCost: 25, perRank: 0.10, requires: [], desc: '+10% Meat/s per rank' },
  { id: 'marrow_harvest', branch: 'butcher', name: 'Marrow Harvest', icon: 'fa-bone', maxRank: 3, baseCost: 50, perRank: 0.20, requires: ['cleavers_edge'], desc: '+20% base Forage click Meat per rank' },
  { id: 'smokehouse', branch: 'butcher', name: 'Smokehouse', icon: 'fa-fire-burner', maxRank: 3, baseCost: 80, perRank: 0.20, requires: ['marrow_harvest'], desc: 'Cooked meals last 20% longer per rank' },
  { id: 'feast_of_plenty', branch: 'butcher', name: 'Feast of Plenty', icon: 'fa-crown', maxRank: 1, baseCost: 300, capstone: true, requires: ['cleavers_edge', 'marrow_harvest', 'smokehouse'], desc: 'Every Overdrive milestone a generator has reached gives it an extra x1.25' },
  // Warden
  { id: 'beast_bond', branch: 'warden', name: 'Beast Bond', icon: 'fa-handshake', maxRank: 5, baseCost: 25, perRank: 0.05, requires: [], desc: '+5% Beast Power per rank' },
  { id: 'nurturing_hands', branch: 'warden', name: 'Nurturing Hands', icon: 'fa-hand-holding-heart', maxRank: 3, baseCost: 50, perRank: 0.08, requires: ['beast_bond'], desc: 'Nursery costs -8% per rank' },
  { id: 'hybrid_training', branch: 'warden', name: 'Hybrid Training', icon: 'fa-dna', maxRank: 3, baseCost: 80, perRank: 0.08, requires: ['nurturing_hands'], desc: 'Hybrid enhance costs -8% per rank' },
  { id: 'pack_alpha', branch: 'warden', name: 'Pack Alpha', icon: 'fa-crown', maxRank: 1, baseCost: 300, capstone: true, requires: ['beast_bond', 'nurturing_hands', 'hybrid_training'], desc: 'Dormant hybrids still give 25% of their Beast Power (no passives)' },
  // Stalker
  { id: 'keen_instincts', branch: 'stalker', name: 'Keen Instincts', icon: 'fa-eye', maxRank: 5, baseCost: 25, perRank: 0.04, requires: [], desc: '+4% Combat Power per rank' },
  { id: 'totem_breaker', branch: 'stalker', name: 'Totem Breaker', icon: 'fa-hammer', maxRank: 5, baseCost: 50, perRank: 0.10, requires: ['keen_instincts'], desc: '+10% damage to the Totem per rank' },
  { id: 'thick_hide', branch: 'stalker', name: 'Thick Hide', icon: 'fa-shield-halved', maxRank: 3, baseCost: 80, perRank: 0.10, requires: ['totem_breaker'], desc: '-10% wound time after a lost fight per rank' },
  { id: 'battle_insight', branch: 'stalker', name: 'Battle Insight', icon: 'fa-crown', maxRank: 1, baseCost: 300, capstone: true, requires: ['keen_instincts', 'totem_breaker', 'thick_hide'], desc: 'Each loss to a boss or guardian gives +2% Combat Power against that one, up to +20%. Resets when you beat it.' }
];

// Packmaster preview (Seal 3, not buyable yet)
const LEGACY_PACKMASTER_PREVIEW = [
  { name: 'Auto-Buy', icon: 'fa-cart-shopping', desc: 'Buys generators for you' },
  { name: 'Auto-Tend Nest', icon: 'fa-egg', desc: 'Feeds the nursery' },
  { name: 'Auto-Trophy', icon: 'fa-trophy', desc: 'Repeats boss wins' },
  { name: 'Auto-Strike', icon: 'fa-bolt', desc: 'Spends spare Stamina on the Totem' }
];
