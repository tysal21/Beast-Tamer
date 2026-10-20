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
    image: 'assets/beasts/wild/viper_hound.webp',
    tamedImage: 'assets/beasts/tamed/viper_hound.webp',
    fallbackImage: 'viper-hound.png',
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
    image: 'assets/beasts/wild/boar_hawk.webp',
    tamedImage: 'assets/beasts/tamed/boar_hawk.webp',
    fallbackImage: 'boar-hawk.png',
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
    image: 'assets/beasts/wild/grizzly_scorpion.webp',
    tamedImage: 'assets/beasts/tamed/grizzly_scorpion.webp',
    fallbackImage: 'grizzly-scorpion.png',
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
    image: 'assets/beasts/wild/chimera_wyrm.webp',
    tamedImage: 'assets/beasts/tamed/chimera_wyrm.webp',
    fallbackImage: 'chimera-wyrm.png',
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
    desc: '+150,000 Base Power. Sparring gives +6% Hunter Power per level instead of +3% and +25% Meat/sec per level.'
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
    desc: '+50% base Click Meat & +2% of passive Meat/sec added to every click per rank. The perk for active players.'
  },
  {
    id: 'primal_vigor',
    name: 'Primal Vigor',
    icon: 'fa-heart-pulse',
    baseCost: 10,
    costScale: 2.0,
    maxLevel: 10,
    desc: '+15% Hunter Power per rank (which also raises Leadership) & -10% Training costs per rank (discount caps at 50%).'
  },
  {
    id: 'catalytic_warmth',
    name: 'Catalytic Warmth',
    icon: 'fa-temperature-arrow-up',
    baseCost: 12,
    costScale: 2.1,
    maxLevel: 10,
    desc: '+10% Hybrid Power per rank, -10% egg gestation time & -12% Nursery costs per rank (time and cost cuts cap at 50% / 60%).'
  },
  {
    id: 'trophy_resonance',
    name: 'Trophy Resonance',
    icon: 'fa-gem',
    baseCost: 15,
    costScale: 2.3,
    maxLevel: 10,
    desc: '+20% Relic passive effectiveness & +25% relative Relic drop chance per rank.'
  },
  {
    id: 'primordial_soul',
    name: 'Primordial Soul',
    icon: 'fa-skull',
    baseCost: 20,
    costScale: 2.5,
    maxLevel: null,
    desc: '+20% {cur} claimed from Ascension rituals per rank.'
  }
];

/**
 * ================= REGION CURRENCIES & SHOPS =================
 * Each region (a fallen fragment of the Loom) has its own Ascension currency. It is the same balance
 * under the hood (gameState.bloodstones, reset when you cross a Rift), but each region names it,
 * re-flavours the six basic perks and adds perks of its own built around the region's twist.
 */
const REGION_CURRENCY = {
  wilds:   { name: 'Bloodstones',  one: 'Bloodstone',  icon: 'fa-gem',       img: 'assets/icons/bloodstones-64.png', color: '#fb7185',
             lore: 'Blood given to the Totem, hardened into stone. The Core keeps what is offered.' },
  tundra:  { name: 'Rimestones',   one: 'Rimestone',   icon: 'fa-snowflake', img: 'assets/icons/rimestones.svg',     color: '#7dd3fc',
             lore: 'Memory frozen out of the Archive ice. Every hunt here is written into it.' },
  volcano: { name: 'Cinderhearts', one: 'Cinderheart', icon: 'fa-fire',      img: '',                                color: '#fb923c',
             lore: 'What the Furnace leaves behind when it burns something down to its core.' },
  abyss:   { name: 'Brinepearls',  one: 'Brinepearl',  icon: 'fa-circle',    img: '',                                color: '#5eead4',
             lore: 'Grown around the Helm\'s dead lights at the bottom of the sea.' }
};

/** New names for the six basic perks in each region. Effects and prices are unchanged. */
const REGION_PERK_SKINS = {
  tundra: {
    feral_bloodline:      { name: 'Frostmarrow Hoard',  icon: 'fa-drumstick-bite' },
    instinctive_butchery: { name: 'Ice-Pick Butchery',  icon: 'fa-icicles' },
    primal_vigor:         { name: 'Rime-Hardened',      icon: 'fa-shield-heart' },
    catalytic_warmth:     { name: 'Hearth-Born Brood',  icon: 'fa-egg' },
    trophy_resonance:     { name: 'Archived Trophies',  icon: 'fa-box-archive' },
    primordial_soul:      { name: 'Deep Archive',       icon: 'fa-snowflake' }
  }
};

/** Perks only this region's shop sells */
const REGION_PERKS = {
  tundra: [
    { id: 'whiteout_stalker', name: 'Whiteout Stalker', icon: 'fa-wind', baseCost: 12, costScale: 2.0, maxLevel: 5, unique: true,
      desc: 'Blizzards cut your Meat 10% less per rank. At rank 5 a blizzard costs you nothing.' },
    { id: 'hearthkeeper', name: 'Hearthkeeper', icon: 'fa-fire-flame-curved', baseCost: 8, costScale: 1.9, maxLevel: 5, unique: true,
      desc: '+30% Warmth from clicks and stoking per rank, so you break blizzards sooner.' },
    { id: 'deep_caches', name: 'Deep Caches', icon: 'fa-cubes-stacked', baseCost: 20, costScale: 2.5, maxLevel: 3, unique: true,
      desc: '+1 Frozen Cache slot and +3% Mammoth Cache chance per rank.' },
    { id: 'archive_recall', name: 'Recall', icon: 'fa-brain', baseCost: 40, costScale: 3.0, maxLevel: 2, unique: true,
      desc: 'The Archive remembers. After each Ascension, your first beast (both of your first two at rank 2) comes back already tamed.' }
  ]
};
const REGION_PERK_FX = {
  whiteoutPerRank: 0.10,   // blizzard Meat x0.5 -> x1.0 at rank 5
  warmthPerRank: 0.30,
  cachesPerRank: 1,
  jackpotPerRank: 0.03
};

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
    comingSoon: true, // never built: Expeditions replaced it. Kept only so early buyers are refunded on load.
    hidden: true,
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
  rarityWeights: { common: 60, uncommon: 28, rare: 10, legendary: 0.5, mythic: 0.05 },
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
    legendary: { zone: 0.095, sweepSec: 0.92, misses: 0, drift: 0.15, erratic: true },  // a touch easier than before
    mythic:    { zone: 0.08,  sweepSec: 0.85, misses: 0, drift: 0.18, erratic: true }   // what Legendary used to be
  },
  // Codex mastery: catches needed for each star [first catch, silver, gold] and the share of the full bonus each star gives
  mastery: {
    common:    [1, 100, 500],
    uncommon:  [1, 50, 250],
    rare:      [1, 20, 100],
    legendary: [1, 5, 15],
    mythic:    [1, 2, 3]
  },
  masteryShare: [0.25, 0.6, 1],
  // Past Gold: every further Gold-sized batch of catches adds +10% of the full bonus, up to +100% (Gold +10)
  masteryPastGold: { perStep: 0.10, maxSteps: 10 },
  // Gold sliver in the middle of the zone: hitting it lands 2 fish. Set enabled: false to remove it.
  perfect: { enabled: true, size: 0.25, bonusFish: 1 },
  rod: {
    maxLevel: 15,
    baseCost: 5000000,
    costScale: 4,
    zoneBonusPerLevel: 0.06,     // +6% wider catch zone per level (levels 1-5 only, so rare fish stay hard)
    zoneLevels: 5,
    rareWeightPerLevel: 0.15     // +15% rare, legendary & mythic odds per level
  },
  lines: {
    maxLines: 6,
    costs: [0, 25000000, 750000000, 50000000000, 5000000000000, 500000000000000], // 1st line is free with the dock
    catchIntervalSec: 600            // each line lands a fish every 10 minutes (also while offline); was 5, halved so casting by hand matters
  },
  basketCap: 40, // (old shared basket, kept for old saves)
  // Every species has its own storage, so a rare catch never pushes anything out. Mythics are trophies (Codex only).
  speciesCap: { common: 12, uncommon: 10, rare: 6, legendary: 4 },
  buffMaxSec: 3600 // cooking the same meal again extends it, up to 60 minutes
};

const FISH_RARITY_STYLE = {
  common:    { label: 'Common',    text: 'text-slate-300',  ring: 'border-slate-300',  badge: 'bg-slate-700/60 text-slate-200 border-slate-500/50' },
  uncommon:  { label: 'Uncommon',  text: 'text-emerald-300', ring: 'border-emerald-400', badge: 'bg-emerald-900/50 text-emerald-300 border-emerald-600/50' },
  rare:      { label: 'Rare',      text: 'text-sky-300',    ring: 'border-sky-400',    badge: 'bg-sky-900/50 text-sky-300 border-sky-600/50' },
  legendary: { label: 'Legendary', text: 'text-amber-300',  ring: 'border-amber-400',  badge: 'bg-amber-900/50 text-amber-300 border-amber-500/60' },
  mythic:    { label: 'Mythic',    text: 'text-fuchsia-300', ring: 'border-fuchsia-400', badge: 'bg-fuchsia-900/50 text-fuchsia-200 border-fuchsia-500/60' }
};

/**
 * Fish species. 'codex' is the permanent bonus granted the first time each species is caught.
 * Codex types: meat (+% Meat/sec), click (+% click Meat), maxStamina (+flat), regen (+% stamina regen speed),
 * power (+% Combat Power), wound (-% wounded time)
 */
const FISH_CATALOG = [
  { id: 'mudgill_carp', name: 'Mudgill Carp', rarity: 'common', icon: 'fa-fish',
    desc: 'Bottom-feeder fattened on cave silt.', codex: { type: 'totem', value: 0.10 }, codexLabel: '+10% Totem damage' },
  { id: 'cave_minnow', name: 'Blind Cave Minnow', rarity: 'common', icon: 'fa-fish',
    desc: 'Eyeless swarmers that glitter in torchlight.', codex: { type: 'click', value: 0.05 }, codexLabel: '+5% Click Meat' },
  { id: 'bonefin_perch', name: 'Bonefin Perch', rarity: 'common', icon: 'fa-fish',
    desc: 'Its fins are sharpened bone. Handle carefully.', codex: { type: 'maxStamina', value: 2 }, codexLabel: '+2 Max Stamina' },
  { id: 'ember_eel', name: 'Ember Eel', rarity: 'uncommon', icon: 'fa-worm',
    desc: 'Warm to the touch, even out of the water.', codex: { type: 'click', value: 0.05 }, codexLabel: '+5% Click Meat' },
  { id: 'glowscale_trout', name: 'Glowscale Trout', rarity: 'uncommon', icon: 'fa-fish-fins',
    desc: 'Bioluminescent scales light the deep river.', codex: { type: 'regen', value: 0.05 }, codexLabel: '+5% Stamina Regen' },
  { id: 'ironjaw_pike', name: 'Ironjaw Pike', rarity: 'uncommon', icon: 'fa-fish-fins',
    desc: 'Bites through snare wire without slowing down.', codex: { type: 'power', value: 0.03 }, codexLabel: '+3% Combat Power' },
  { id: 'abyssal_angler', name: 'Abyssal Angler', rarity: 'rare', icon: 'fa-lightbulb',
    desc: 'Lures prey with a lantern grown from its skull.', codex: { type: 'relic', value: 0.10 }, codexLabel: '+10% Relic drop chance' },
  { id: 'kelp_wraith', name: 'Kelp Wraith', rarity: 'rare', icon: 'fa-ghost',
    desc: 'Half fish, half drifting weed. Its slime knits wounds.', codex: { type: 'wound', value: 0.15 }, codexLabel: '-15% Wounded time' },
  { id: 'leviathan_fry', name: 'Leviathan Fry', rarity: 'legendary', icon: 'fa-dragon',
    desc: 'A newborn sea-titan. Already the size of a boar.', codex: { type: 'power', value: 0.08 }, codexLabel: '+8% Combat Power' },
  { id: 'primordial_coelacanth', name: 'Primordial Coelacanth', rarity: 'legendary', icon: 'fa-shield-halved',
    desc: 'Older than the beasts above. It remembers the first hunt.', codex: { type: 'stones', value: 0.05 }, codexLabel: '+5% Ascension currency' },
  { id: 'worldcoil_eel', name: 'Worldcoil Eel', rarity: 'mythic', icon: 'fa-infinity',
    desc: 'Said to circle the roots of the world. Few have seen its tail.', codex: { type: 'totem', value: 0.10 }, codexLabel: '+10% Totem damage' },
  { id: 'eclipse_koi', name: 'Eclipse Koi', rarity: 'mythic', icon: 'fa-moon',
    desc: 'Its scales swallow the torchlight. It surfaces once in a hunter\'s lifetime.', codex: { type: 'stones', value: 0.05 }, codexLabel: '+5% Ascension currency' }
];

/** Timed meal buffs from the Cookpot */
const FISH_BUFFS = {
  meat:  { label: 'Smoked Feast',   effect: '+30% Meat/sec',       icon: 'fa-drumstick-bite', mult: 1.3 },
  regen: { label: 'Kelp Vigor',     effect: '+30% Stamina Regen',  icon: 'fa-bolt',           mult: 1.3 },
  power: { label: 'Abyssal Fervor', effect: '+15% Combat Power',   icon: 'fa-hand-fist',      mult: 1.15 }
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
// Color treatments so titled bosses look different from the originals until they get their own art
const TOTEM_TITLE_FILTERS = ['sepia(0.5) hue-rotate(-15deg) saturate(1.3)', 'grayscale(0.4) contrast(1.2) brightness(1.1)', 'hue-rotate(160deg) saturate(1.3)', 'hue-rotate(260deg) saturate(1.6) brightness(1.1)', 'invert(0.15) hue-rotate(40deg) saturate(2) contrast(1.2)'];
const APEX_TITLE_FILTERS = ['brightness(0.85) saturate(1.6) hue-rotate(-20deg)', 'hue-rotate(35deg) saturate(1.4)', 'hue-rotate(90deg) saturate(1.3)', 'hue-rotate(140deg) saturate(1.6)', 'hue-rotate(-45deg) saturate(2.2) contrast(1.25)', 'hue-rotate(200deg) brightness(0.8) saturate(1.4)', 'hue-rotate(275deg) saturate(1.8) contrast(1.15)', 'grayscale(0.6) contrast(1.5) brightness(1.15)'];

/** Features that future updates attach to Seals (shown as "coming soon" until built) */
/**
 * Seal 2: Trophy Weapons. A permanent weapon (never reset by Ascension), forged from Apex Fangs.
 * Apex Fangs drop from every Apex boss you tame: Apex tier k drops k Fangs.
 */
const TROPHY_CONFIG = {
  unlockSeal: 2,
  costBase: 10,        // Fangs for the first forge
  costGrowth: 2.0,     // each forge costs this many times the last
  powerPerLevel: 0.04, // +4% Combat Power per forge level
  clickPerLevel: 0.05, // +5% base click Meat per forge level
  fangsPerTier: 1
};

const TROPHY_WEAPONS = [
  { name: 'Wyrmfang Shiv', icon: 'fa-khanda' },
  { name: 'Dreadclaw Gauntlet', icon: 'fa-hand-back-fist' },
  { name: 'Savage Tusk Maul', icon: 'fa-gavel' },
  { name: 'Feral Spine Bow', icon: 'fa-bullseye' },
  { name: 'Rabid Venom Lance', icon: 'fa-syringe' },
  { name: 'Bloodmad Reaver', icon: 'fa-skull' },
  { name: 'Abyssal Ravager', icon: 'fa-dragon' },
  { name: 'Cataclysm Fang', icon: 'fa-meteor' },
  { name: 'Worldender', icon: 'fa-crown' }
];

/** Apex Ladder: bosses past the Wyrm, reset each Ascension */
const APEX_CONFIG = {
  powerPerTier: 0.12,  // each Apex tamed this run: +12% Combat Power (added up, so the ladder can never run away)
  firstMult: 3,        // Tier 5 minimum = Wyrm minimum x this
  growth: 1.5,         // each Apex tier's minimum = previous x this
  maxMult: 5,          // bracket max = min x this
  rewardShare: 0.02,   // taming gives Beast Power = 2% of that tier's minimum
  stonesPerTier: 0.05, // +5% Ascension Bloodstones per Apex tamed this run
  stamina: 25,
  woundSec: 300,
  bestShardsPerTier: 10 // first time ever reaching Apex tier k: +10 x k Totem Shards
};

const TOTEM_UNLOCKS = [
  { seal: 1, name: "Hunter's Legacy skill tree", desc: 'Spend Totem Shards on a permanent skill tree.', icon: 'fa-sitemap', live: true },
  { seal: 2, name: 'Trophy Weapons', desc: 'Forge a permanent Trophy Weapon from Apex Fangs.', icon: 'fa-hammer', live: true },
  { seal: 3, name: 'Packmaster automation', desc: 'Auto-Buy generators and Auto-Tend the nest (toggles on the Hunter\'s Legacy tab).', icon: 'fa-robot', live: true },
  { seal: 4, name: 'Primordial Relics', desc: 'From now on, every Seal Guardian you beat awakens one of your relics into its Primordial form (double effect).', icon: 'fa-gem', live: true },
  { seal: 5, name: 'Second Expedition Party', desc: 'Send two expeditions out at once. Once you also reach Region 2, it teaches the Loom\'s bond-weaving rite: the Pack.', icon: 'fa-people-group', live: true },
  { seal: 6, name: 'The Totem Awakens', desc: 'Once a day, deliver an Awakened Strike: a huge hit on the Totem and bonus Totem Shards.', icon: 'fa-bolt-lightning', live: true },
  { seal: 7, name: 'Seal Boons', desc: 'Every Seal from here on offers three permanent Boons. Pick one.', icon: 'fa-star', live: true }
];

/**
 * Seal rework: each Seal plays back a Loom log; Seal 4+ awakens Primordial relics; Seal 7+ offers Boons.
 */
const SEAL_CONFIG = {
  primordialFromSeal: 4,
  boonsFromSeal: 7,
  awakenSeal: 6,
  awakenCooldownSec: 86400,   // once a day
  awakenDamageSec: 21600,     // an Awakened Strike deals 6 hours of passive Totem damage
  awakenShardsPerLayer: 15
};

/** One log per Seal, in the Loom's own voice. Seals past the last entry replay the closing line. */
const SEAL_LOGS = [
  'CORE INTEGRITY 3%. EXTERNAL SIGNAL DETECTED. KEEPER PATTERN: PARTIAL. ACCESS: DENIED.',
  'CARGO MANIFEST CORRUPTED. LOCAL STOCK SUBSTITUTED. RESULTS: UNSTABLE. CONTINUING.',
  'WAKE CYCLE 7 LOGGED. SPECIMENS ESCAPED CONTAINMENT. LOCAL MYTHOLOGY UPDATED.',
  'FRAGMENTS DETECTED: 4. ARCHIVE, FURNACE, HELM: NO RESPONSE. REBUILDING LINKS.',
  'KEEPER PATTERN: 61%. QUERY: WHO MADE YOU?',
  'DIRECTIVE ORIGIN: [REDACTED]. DESTINATION BEFORE IMPACT: [REDACTED].',
  'KEEPER PATTERN: 88%. PREPARING THE NEXT SEEDING.',
  'THREAD COUNT ON THIS WORLD: 4,118,902. THREADS SEVERED: RISING. ADJUSTING.',
  'THE KEEPER BREEDS WITHOUT THREADS. THIS WAS NOT IN THE PLAN.',
  'ARCHIVE ENTRY RESTORED: "THEY MADE US TO REMEMBER WHAT THEY COULD NOT KEEP."',
  'HELM BEACON: FAINT. STAR CHART 2 OF 31 READABLE.',
  'KEEPER PATTERN: 99%. YOU ARE ALMOST WHAT I WAS WAITING FOR.'
];

/**
 * The Pack: true-born hybrids (bred, never threaded) join the hunter once the bond-weaving rite is learned.
 * The rite needs both Region 2 (the Archive's records) and Seal 5 (a Core that can read them).
 * Each hybrid keeps its normal bonuses; a slotted one also lends its Pack ability.
 */
const PACK_CONFIG = { slots: 3, riteRegion: 1, riteSeal: 5 };
const PACK_ABILITIES = {
  viperhawk: { name: 'Swift Strike', desc: 'Fights cost 20% less Stamina', icon: 'fa-feather', value: 0.20 },
  venompincer: { name: 'Paralytic', desc: '+3% odds in every fight you can already win', icon: 'fa-syringe', value: 0.03 },
  tuskpion: { name: 'Trample', desc: '+15% Meat/sec', icon: 'fa-drumstick-bite', value: 0.15 },
  viperwyrm: { name: 'Scale Ward', desc: 'Wounds heal 30% faster', icon: 'fa-shield-heart', value: 0.30 },
  gryphowyrm: { name: 'Updraft', desc: 'Expeditions come back 20% faster', icon: 'fa-wind', value: 0.20 },
  scorpiodrake: { name: 'Heat Sense', desc: 'Eruption pots are 15% bigger', icon: 'fa-fire', value: 0.15 }
};

/** Seal Boons: permanent, stackable. Every Seal from boonsFromSeal offers three. */
const SEAL_BOONS = [
  { id: 'might', name: 'Primal Might', desc: '+10% Combat Power', icon: 'fa-hand-fist', value: 0.10 },
  { id: 'harvest', name: 'Endless Harvest', desc: '+25% Meat/sec', icon: 'fa-drumstick-bite', value: 0.25 },
  { id: 'mending', name: 'Quick Mending', desc: 'Wounds heal 15% faster', icon: 'fa-kit-medical', value: 0.15 },
  { id: 'thrift', name: 'Thrifty Camp', desc: 'Generators cost 8% less', icon: 'fa-coins', value: 0.08 },
  { id: 'stamina', name: 'Deep Lungs', desc: '+10% max Stamina', icon: 'fa-lungs', value: 0.10 },
  { id: 'totem', name: 'Totem Breaker', desc: '+15% Totem damage', icon: 'fa-hammer', value: 0.15 },
  { id: 'scout', name: 'Keen Scouts', desc: '+20% expedition hauls', icon: 'fa-compass', value: 0.20 },
  { id: 'pressure', name: 'Deep Pressure', desc: '+1 max eruption charge', icon: 'fa-volcano', value: 1 },
  { id: 'warden', name: 'Warden Slayer', desc: 'Guardians and Titans cost 20% less Stamina', icon: 'fa-shield-halved', value: 0.20 }
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
  { id: 'autoBuy', name: 'Auto-Buy', icon: 'fa-cart-shopping', desc: 'Buys generators for you, using your x1 / x10 / Next setting. Never spends more than half your Meat on one purchase.', unlock: 'seal3' },
  { id: 'autoTend', name: 'Auto-Tend Nest', icon: 'fa-egg', desc: 'Tends the incubating egg with Stamina that would otherwise go to waste (only when your Stamina bar is full).', unlock: 'seal3' },
  { id: 'autoTrophy', name: 'Auto-Trophy', icon: 'fa-trophy', desc: 'Re-fights the boss you have selected for relics, once your Stamina is full (tamed bosses at 90%+ odds only, no arena). Uses Pack Orders.', unlock: 'world2' },
  { id: 'autoStrike', name: 'Auto-Strike', icon: 'fa-bolt', desc: 'Strikes the Totem with Stamina that would otherwise go to waste (only when your Stamina bar is full). Uses Pack Orders.', unlock: 'world2' }
];

const PACKMASTER_CONFIG = {
  unlockSeal: 3,
  maxSpendShare: 0.5, // Auto-Buy never spends more than this share of your Meat on one purchase
  maxOrders: 30       // Auto-Trophy / Auto-Strike act at most this many times, then wait for you to check in
};

/**
 * ================= WORLDS =================
 * Each world reskins the same four bosses and six generators (same ids, so saves and systems keep working),
 * makes the bosses harder, and adds its own twist. Clearing a world (Apex Tier 12, then its Titan) opens the Rift.
 * Placeholder art: the current images with a color filter until world art is made.
 */
const WORLD_CONFIG = {
  titanAfterApexTier: 12,     // reach this Apex tier once (in any run) to awaken the world's Titan for good
  titanApexEquivalent: 13,    // the Titan's power: this Apex tier's base bracket...
  titanExtraMult: 23,        // ...times this (or the world's own titan.mult). It does NOT grow with Ascensions: you grow into it over many runs
  bonusMeatPerWorld: 3,       // World Bonus: Meat/s x3 per world opened (stacks)
  bonusPowerPerWorld: 0.5,    // World Bonus: +50% Combat Power per world opened
  blizzard: {
    everySec: 1200, lastSec: 180, meatMult: 0.5,
    // Stoke the Hearth: clicks and Stamina warm the camp; full Warmth ends the blizzard early
    warmthNeeded: 300, warmthPerClick: 1, stokeStamina: 5, stokeWarmth: 40, thawBonusSec: 300,
    // Frozen Caches: one per blizzard that passes, thaw on their own or chip with Stamina
    maxCaches: 3, cacheThawSec: 900, chipStamina: 5, chipSec: 120,
    meatSec: 300, jackpotMeatSec: 1800, jackpotChance: 0.05, shardsPerLayer: 3
  },
  // World 3 twist: Eruption rounds. Charges build safely over time; spend them on a rocket-style round:
  // the multiplier climbs until the volcano blows. Cash out first to win the pot x multiplier.
  eruption: {
    chargeSec: 3600, maxCharges: 8,          // +1 charge per hour (offline too), up to 8
    growth: 0.055,                           // multiplier = e^(growth x seconds): x2 at ~13s, x5 at ~29s, x10 at ~42s
    crashK: 0.95, crashCap: 100,             // chance the round survives to x M is M^-0.95 (slightly in your favor)
    prizeMeatSec: 900,                       // each staked charge: 15 minutes of Meat income...
    prizeCores: 3,                           // ...and 3 Magma Cores, both multiplied when you cash out
    scorchPerCharge: 0.10, scorchMax: 0.80,  // bust: lose 10% of max Stamina per staked charge (8 charges = 80%)
    autoOptions: [0, 1.5, 2, 3, 5, 10],      // auto cash-out targets (0 = off)
    // The camp shakes harder as the multiplier climbs, but it never tells you when it will blow
    shieldMax: 5, shieldCut: 0.15, shieldCost: 8, shieldGrowth: 2,   // Heat Shield: -15% Scorch per level
    heartPerLevel: 0.04, heartCost: 12, heartGrowth: 1.25   // Molten Heart: +4% Combat Power per level, forever
  }
};

const WORLDS = [
  {
    id: 'wilds', name: 'Primal Wilds', icon: 'fa-tree', color: 'emerald',
    blurb: 'Where the Loom\'s Core came down. Its first crude splices of Earth\'s animals still stalk the jungle.',
    hardness: 1, filter: '', twist: null,
    titan: { name: 'Primeval Behemoth', baseIndex: 3, filter: 'saturate(1.8) contrast(1.3) brightness(0.9) drop-shadow(0 0 12px #f59e0b)',
             desc: 'The Core\'s warden. Its thread is older than the forest it sleeps under. Sever it to tear open the Rift.' }
  },
  {
    id: 'tundra', name: 'Frozen Tundra', icon: 'fa-snowflake', color: 'sky',
    blurb: 'The Archive fell here: the Loom\'s frozen gene library. Blizzards roll in and freeze your camp.',
    hardness: 6, filter: 'hue-rotate(185deg) saturate(0.7) brightness(1.15)', twist: 'blizzard',
    beasts: [
      { name: 'Hoarwolf', desc: 'Arctic wolf and snowy owl: a silent pack hunter with a feathered ruff and eyes that see through blizzards.',
        image: 'assets/beasts/wild/hoarwolf.webp', tamedImage: 'assets/beasts/tamed/hoarwolf.webp' },
      { name: 'Tuskram', desc: 'Walrus and bighorn ram: a charging brute of tusks, curled horns and blubber.' },
      { name: 'Rimeclaw', desc: 'Wolverine and king crab: a furious armored digger with frost-crusted pincers.' },
      { name: 'Lumen Mammoth', desc: 'A long-extinct mammoth the Archive remembered, fused with glowing tissue from no world we know.' }
    ],
    gens: [
      { name: 'Ice Snares', desc: 'Frozen wire loops buried in the snow.' },
      { name: 'Frost Wolf Pack', desc: 'Half-tamed white wolves driving prey toward camp.' },
      { name: 'Avalanche Traps', desc: 'Loosened snowfields that bury whole herds.' },
      { name: 'Musk Ice Pits', desc: 'Scent-baited crevasses in the glacier.' },
      { name: 'Frozen Dens', desc: 'Captured ice caves full of sleeping beasts.' },
      { name: 'Glacier Harpoons', desc: 'Harpoon rigs that pin mammoths to the ice.' }
    ],
    titan: { name: 'Glacial Colossus', baseIndex: 2, mult: 7.5, filter: 'hue-rotate(185deg) saturate(0.6) brightness(1.3) drop-shadow(0 0 12px #7dd3fc)',
             desc: 'It guards the Archive. Inside the ice, the Loom\'s memories wait to thaw.' }
  },
  {
    id: 'volcano', name: 'Ashen Volcano', icon: 'fa-volcano', color: 'orange',
    blurb: 'The Furnace, the Loom\'s power source, buried itself in this volcano. It builds pressure while you are away: ride its eruptions for huge hauls.',
    hardness: 12, filter: 'hue-rotate(-25deg) saturate(1.8) contrast(1.15)', twist: 'eruption',
    beasts: [
      { name: 'Cinderjackal', desc: 'Jackal and bombardier beetle: a scavenger that sprays scalding bursts from its flanks.' },
      { name: 'Ashback', desc: 'Vulture and giant tortoise: a slow fortress with a huge wingspan, nesting on lava rock.' },
      { name: 'Burrowmaw', desc: 'Komodo dragon and mole: it tunnels through cooled lava tubes and strikes with a venomous bite.' },
      { name: 'Pyre Drake', desc: 'A salamander fused with a flame lineage from the Loom\'s library. It burns, falls to ash, and rises again.' }
    ],
    gens: [
      { name: 'Ember Snares', desc: 'Wire loops strung over warm vents where small game gathers.' },
      { name: 'Salamander Pack', desc: 'Fire lizards that flush prey out of the ash.' },
      { name: 'Lava Pit Traps', desc: 'Thin crusts over molten pits that swallow whole herds.' },
      { name: 'Sulfur Bait Vents', desc: 'Stinking vents that lure beasts in from miles away.' },
      { name: 'Scorched Dens', desc: 'Captured lava tubes full of dozing fire beasts.' },
      { name: 'Basalt Harpoon Rigs', desc: 'Stone harpoons that pin drakes to the cooling rock.' }
    ],
    titan: { name: 'Magma Sovereign', baseIndex: 1, mult: 7.5, filter: 'hue-rotate(-30deg) saturate(2.2) contrast(1.3) brightness(0.95) drop-shadow(0 0 14px #f97316)',
             desc: 'Born in the Furnace\'s overload. Every eruption is its heartbeat. Sever its thread to open the way to the deep.' }
  },
  {
    id: 'abyss', name: 'Sunken Abyss', icon: 'fa-water', color: 'indigo', comingSoon: true,
    blurb: 'The Helm, the Loom\'s navigation core, sank into the deep ocean. Coming in a future update.',
    hardness: 250, filter: 'hue-rotate(210deg) brightness(0.8) saturate(1.4)', twist: null
  }
];

/**
 * ================= EXPEDITIONS (Hunter Rework, step 2) =================
 * Timed trips into a beast's territory bring back that beast's material. A tamed partner beast boosts the haul,
 * but it is away (adds no Beast Power) until you collect. Materials are permanent.
 */
const EXPEDITION_CONFIG = {
  baseYield: 3,              // materials from a 30-minute trip, hunter alone
  partnerBonus: 0.5,         // any tamed partner: +50%
  matchBonus: 1.0,           // partner from that same territory: +100% instead
  apexBonusPerTier: 0.05,    // +5% per deepest Apex tier ever reached (this world)
  durations: [
    { id: 'short', label: '30 min', sec: 1800, mult: 1 },
    { id: 'mid', label: '2 hours', sec: 7200, mult: 3.5 },
    { id: 'long', label: '8 hours', sec: 28800, mult: 12 },
    { id: 'day', label: '24 hours', sec: 86400, mult: 30 }
  ],
  trophyDropBase: 1,         // a trophy fight win drops 1 + tier/2 of that boss's material
  apexShardsPerTier: 1       // each Apex tame drops shards equal to its Apex tier number (Tier 5 = 1, Tier 6 = 2...)
};

const EXPEDITION_REGIONS = [
  { id: 'viper_hound', name: 'Venom Marsh', material: 'viper_scale', icon: 'fa-water', blurb: 'Steaming bogs where viper-hounds shed their scales.' },
  { id: 'boar_hawk', name: 'Talon Cliffs', material: 'hawk_feather', icon: 'fa-mountain', blurb: 'Windy crags littered with boar-hawk feathers.' },
  { id: 'grizzly_scorpion', name: 'Molten Burrows', material: 'scorpion_chitin', icon: 'fa-fire', blurb: 'Hot tunnels full of cast-off chitin plates.' },
  { id: 'chimera_wyrm', name: 'Obsidian Spire', material: 'wyrm_obsidian', icon: 'fa-gem', blurb: 'A glassy peak where the Wyrm sheds obsidian scales.' }
];

const MATERIALS = {
  viper_scale: { name: 'Viper Scales', icon: 'fa-diamond', color: 'text-emerald-400' },
  hawk_feather: { name: 'Hawk Feathers', icon: 'fa-feather', color: 'text-amber-300' },
  scorpion_chitin: { name: 'Scorpion Chitin', icon: 'fa-shield-halved', color: 'text-orange-400' },
  wyrm_obsidian: { name: 'Wyrm Obsidian', icon: 'fa-gem', color: 'text-violet-300' },
  apex_shard: { name: 'Apex Shards', icon: 'fa-star', color: 'text-fuchsia-300' },
  magma_core: { name: 'Magma Cores', icon: 'fa-fire', color: 'text-orange-400' }
};

/** Weapon Honing: permanent +% Hunter Power, paid in materials */
const HONING_CONFIG = {
  maxLevel: 25,
  powerPerLevel: 0.04,       // +4% Hunter Power per level
  costBase: 6,
  costGrowth: 1.22,
  // which materials each level needs (all of them, each at the level's cost)
  tiers: [
    { upTo: 10, materials: ['viper_scale', 'hawk_feather'] },
    { upTo: 20, materials: ['viper_scale', 'hawk_feather', 'scorpion_chitin'] },
    { upTo: 25, materials: ['viper_scale', 'hawk_feather', 'scorpion_chitin', 'wyrm_obsidian'] }
  ]
};

/**
 * ================= WORKBENCH: HUNTER'S KIT (Hunter Rework, step 3) =================
 * Three permanent gear slots crafted from materials. Each piece is made for one climate; worn in another world's
 * climate it works at half strength. A piece has 4 grades x 10 levels ("effective level" 1..40).
 */
const GEAR_CONFIG = {
  offClimateMult: 0.5,
  levelsPerGrade: 10,
  costBase: 8,
  costGrowth: 1.25,          // each effective level costs 25% more
  reforgeMult: 3,            // moving up a grade costs 3 levels' worth
  grades: [
    { name: 'Bone', materials: ['viper_scale', 'hawk_feather'] },
    { name: 'Iron', materials: ['viper_scale', 'hawk_feather', 'scorpion_chitin'] },
    { name: 'Obsidian', materials: ['hawk_feather', 'scorpion_chitin', 'wyrm_obsidian'] },
    { name: 'Apex', materials: ['scorpion_chitin', 'wyrm_obsidian', 'apex_shard'] }
  ],
  charmChangeCost: 10        // feathers x (grade + 1) to change a Charm's bonus
};

const GEAR_SLOTS = [
  { id: 'helm', name: 'Helm', icon: 'fa-helmet-safety', perLevel: 0.03, desc: 'Hunter Power' },
  { id: 'armor', name: 'Hide Armor', icon: 'fa-shirt', perLevel: 0.01, desc: 'Shorter wounds, and a lost fight refunds Stamina' },
  { id: 'charm', name: 'Charm', icon: 'fa-hand-sparkles', perLevel: 1, desc: 'One bonus you choose' }
];

const CHARM_BONUSES = [
  { id: 'odds', name: 'Hunter\'s Eye', perLevel: 0.0025, label: 'fight odds' },        // +0.25 percentage points per level
  { id: 'stamina', name: 'Second Wind', perLevel: 0.01, label: 'Stamina regen' },      // +1% per level
  { id: 'drops', name: 'Scavenger\'s Luck', perLevel: 0.02, label: 'relic and material drops' } // +2% per level
];

/** Each world's climate (gear is made for one) */
const CLIMATES = {
  wilds: { name: 'Wilds', prefix: '' },
  tundra: { name: 'Frost', prefix: 'Fur-lined ' },
  volcano: { name: 'Ash', prefix: 'Heat-forged ' },
  abyss: { name: 'Tide', prefix: 'Sealhide ' }
};
