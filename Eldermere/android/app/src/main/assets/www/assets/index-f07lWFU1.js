(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const bt={humans:{id:"humans",name:"Humans",realm:"Valoria & Sunmark",tagline:"Kingdom Builders & Cavalry",startingTech:"humans_gathering",startingUnit:"warrior",startingGold:5,uniqueUnit:"rohirrim_knight",uniqueMechanicName:"Beacon Network",uniqueMechanicDescription:"Cities connected by Roads (or within 4 tiles of Capital) gain +1★/turn; units starting on a Road get +1 MOV.",palette:{primary:"#2563eb",secondary:"#ece8df",accent:"#eab308",biomeGround:"#7ec850"},cityNames:["Solhaven","Suncrest","Bridgewatch","Whitecliff","Tidehaven","Goldmeadow","Riverfort","Highvale"]},orcs:{id:"orcs",name:"Orcs",realm:"Ashfell & Ironspire",tagline:"Aggressive War-Economy Swarm",startingTech:"orcs_pillage",startingUnit:"warrior",startingGold:7,uniqueUnit:"uruk_berserker",uniqueMechanicName:"Spoils of War",uniqueMechanicDescription:"Killing an enemy unit grants +2★ immediately; capturing a Village or City grants +4★.",palette:{primary:"#dc2626",secondary:"#2e2a33",accent:"#f97316",biomeGround:"#57534e"},cityNames:["Dreadspire","Ironhold","Grimwatch","Fangpass","Ashen Gate","Blightkeep","Skullcrag","Cinderfort"]},elves:{id:"elves",name:"Elves",realm:"Sylvanvale & Starhaven",tagline:"Mobile Forest Guardians",startingTech:"elves_woodland_lore",startingUnit:"archer",startingGold:5,uniqueUnit:"elven_sentinel",uniqueMechanicName:"Woodland Grace",uniqueMechanicDescription:"Units move through Forest/Ancient Woods with no penalty, and untouched Ancient Woods in borders grant +1★/turn (up to +3★/city).",palette:{primary:"#10b981",secondary:"#f5f0e1",accent:"#facc15",biomeGround:"#65c18c"},cityNames:["Silverglade","Starhaven","Mistport","Thornhall","Goldhill","Moonbay","Sylvanvale","Dawnwood"]},dwarves:{id:"dwarves",name:"Dwarves",realm:"Deepforge & Stonehelm",tagline:"Mountain Fortress Economy",startingTech:"dwarves_delving",startingUnit:"warrior",startingGold:5,uniqueUnit:"ironbreaker",uniqueMechanicName:"Deep Mines",uniqueMechanicDescription:"Can traverse Mountains from Turn 1 with 1.75x DEF on Mountains; every Mine on a Mountain grants +1★/turn and +2 Pop.",palette:{primary:"#d97706",secondary:"#64748b",accent:"#fb923c",biomeGround:"#6b8e58"},cityNames:["Deepforge","Stonehelm","Anvil Peaks","Hammerhall","Copperdelve","Frostcrag","Crystal Delve","Runehaven"]}},$t=["humans","orcs","elves","dwarves"],Ut={warrior:{type:"warrior",name:"Warrior",faction:null,cost:2,maxHp:10,attack:2,defense:2,movement:1,range:1,traits:["dash","fortify"],description:"Reliable frontline scout and village capturer."},defender:{type:"defender",name:"Defender",faction:null,cost:3,maxHp:15,attack:1,defense:3,movement:1,range:1,traits:["fortify"],description:"Heavy shield wall built to hold cities and chokepoints."},archer:{type:"archer",name:"Archer",faction:null,cost:3,maxHp:10,attack:2,defense:1,movement:1,range:2,traits:["dash"],description:"Fragile range-2 fire support that softens targets safely."},rider:{type:"rider",name:"Rider",faction:null,cost:3,maxHp:10,attack:2,defense:1,movement:2,range:1,traits:["dash","escape"],description:"Swift flanker and explorer that can retreat after attacking."},catapult:{type:"catapult",name:"Catapult",faction:null,cost:7,maxHp:10,attack:4,defense:0,movement:1,range:3,traits:["siege"],description:"Long-range city breaker that ignores City Walls (cannot move and fire)."},rohirrim_knight:{type:"rohirrim_knight",name:"Sunmark Knight",faction:"humans",cost:6,maxHp:15,attack:3.5,defense:1.5,movement:3,range:1,traits:["dash","persist"],description:"Noble horsemen of Sunmark. Persist: killing an enemy grants an immediate extra attack."},uruk_berserker:{type:"uruk_berserker",name:"Ironblood Berserker",faction:"orcs",cost:5,maxHp:15,attack:3.5,defense:2,movement:1,range:1,traits:["dash","bloodlust"],description:"Frenzied shock trooper. Bloodlust: always strikes at full 3.5 ATK regardless of HP."},elven_sentinel:{type:"elven_sentinel",name:"Elven Sentinel",faction:"elves",cost:5,maxHp:12,attack:3,defense:2,movement:2,range:2,traits:["dash","escape","skirmish"],description:"Deadly woodland marksman. Skirmish: strikes from range 2 and fades back into cover."},ironbreaker:{type:"ironbreaker",name:"Ironbreaker",faction:"dwarves",cost:5,maxHp:20,attack:3,defense:3.5,movement:1,range:1,traits:["dash","fortify","stalwart"],description:"Starsteel-clad juggernaut. Stalwart: immune to Persist chains and takes -1 ranged damage."}},eh=["warrior","defender","archer","rider","catapult"],th=["warrior","defender","archer","rider","catapult","rohirrim_knight","uruk_berserker","elven_sentinel","ironbreaker"],Di={farm:{type:"farm",name:"Farm",cost:4,basePop:2,allowedTerrains:["plains"],goldPerTurn:0,description:"+2 Pop on Plains."},windmill:{type:"windmill",name:"Windmill",cost:5,basePop:0,allowedTerrains:["plains"],goldPerTurn:0,adjacentBonusTo:"farm",adjacentPopPerMatch:1,description:"+1 Pop & +1★/turn per adjacent Farm."},slag_pit:{type:"slag_pit",name:"Slag Pit",cost:3,basePop:1,allowedTerrains:["wasteland"],goldPerTurn:0,description:"+1 Pop on Wasteland."},foundry:{type:"foundry",name:"Foundry",cost:5,basePop:2,allowedTerrains:["wasteland"],goldPerTurn:0,description:"+2 Pop on Wasteland."},sanctuary:{type:"sanctuary",name:"Sanctuary",cost:4,basePop:2,allowedTerrains:["forest","ancient_woods"],goldPerTurn:0,description:"+2 Pop in Forest or Ancient Woods without chopping."},mine:{type:"mine",name:"Mine",cost:4,basePop:2,allowedTerrains:["mountain"],goldPerTurn:1,description:"+2 Pop and +1★/turn on Mountain."},great_forge:{type:"great_forge",name:"Great Forge",cost:5,basePop:0,allowedTerrains:["plains","mountain"],goldPerTurn:0,adjacentBonusTo:"mine",adjacentPopPerMatch:2,description:"+2 Pop per adjacent Mine."}},en={humans_gathering:{id:"humans_gathering",faction:"humans",pillar:"Stewardship",pillarIndex:0,tier:1,slot:"root",prerequisites:[],name:"Gathering",summary:"Harvest Berries (2★, +1 Pop).",iconKey:"berries",unlocksUnits:[],unlocksResources:["berries"],unlocksImprovements:[]},humans_farming:{id:"humans_farming",faction:"humans",pillar:"Stewardship",pillarIndex:0,tier:2,slot:"a",prerequisites:["humans_gathering"],name:"Farming",summary:"Build Farms on Plains (4★, +2 Pop).",iconKey:"farm",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["farm"]},humans_granaries:{id:"humans_granaries",faction:"humans",pillar:"Stewardship",pillarIndex:0,tier:2,slot:"b",prerequisites:["humans_gathering"],name:"Royal Granaries",summary:"Cities at Lv 3+ gain +1★/turn & +1 Unit Cap.",iconKey:"city",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_milling:{id:"humans_milling",faction:"humans",pillar:"Stewardship",pillarIndex:0,tier:3,slot:"capstone",prerequisites:["humans_farming"],name:"Windmills",summary:"Build Windmills on Plains (5★, +1 Pop & +1★/turn per adjacent Farm).",iconKey:"windmill",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["windmill"]},humans_roads:{id:"humans_roads",faction:"humans",pillar:"Roadcraft & Citadels",pillarIndex:1,tier:1,slot:"root",prerequisites:[],name:"Roadcraft",summary:"Build Roads (2★; +1 MOV & Beacon Network +1★/turn).",iconKey:"road",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksRoad:!0},humans_shield_wall:{id:"humans_shield_wall",faction:"humans",pillar:"Roadcraft & Citadels",pillarIndex:1,tier:2,slot:"a",prerequisites:["humans_roads"],name:"Royal Shield Wall",summary:"Unlocks Defender unit.",iconKey:"defender",unlocksUnits:["defender"],unlocksResources:[],unlocksImprovements:[]},humans_citadel_masonry:{id:"humans_citadel_masonry",faction:"humans",pillar:"Roadcraft & Citadels",pillarIndex:1,tier:2,slot:"b",prerequisites:["humans_roads"],name:"Citadel Masonry",summary:"Walled cities heal garrison +2 HP/turn & grant +1★/turn.",iconKey:"city_wall",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_stewards_citadel:{id:"humans_stewards_citadel",faction:"humans",pillar:"Roadcraft & Citadels",pillarIndex:1,tier:3,slot:"capstone",prerequisites:["humans_citadel_masonry"],name:"High Citadel",summary:"All cities gain +1★/turn & +1 Unit Cap.",iconKey:"city_wall",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_riding:{id:"humans_riding",faction:"humans",pillar:"Horsemanship",pillarIndex:2,tier:1,slot:"root",prerequisites:[],name:"Riding",summary:"Unlocks Rider cavalry unit.",iconKey:"rider",unlocksUnits:["rider"],unlocksResources:[],unlocksImprovements:[]},humans_plains_charge:{id:"humans_plains_charge",faction:"humans",pillar:"Horsemanship",pillarIndex:2,tier:2,slot:"a",prerequisites:["humans_riding"],name:"Plains Charge",summary:"Riders & Sunmark Knights gain +0.5 ATK on Plains.",iconKey:"rider",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_chivalry:{id:"humans_chivalry",faction:"humans",pillar:"Horsemanship",pillarIndex:2,tier:2,slot:"b",prerequisites:["humans_riding"],name:"Chivalry",summary:"Unlocks Sunmark Knight (Persist champion).",iconKey:"rohirrim_knight",unlocksUnits:["rohirrim_knight"],unlocksResources:[],unlocksImprovements:[]},humans_ride_of_rohirrim:{id:"humans_ride_of_rohirrim",faction:"humans",pillar:"Horsemanship",pillarIndex:2,tier:3,slot:"capstone",prerequisites:["humans_chivalry"],name:"Charge of the Sunmark",summary:"Riders & Sunmark Knights gain +1 MOV & +3 maxHP.",iconKey:"rohirrim_knight",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_hunting:{id:"humans_hunting",faction:"humans",pillar:"Rangers & Siege",pillarIndex:3,tier:1,slot:"root",prerequisites:[],name:"Ranger Hunting",summary:"Harvest Game (2★, +1 Pop) & +2★ bonus on Ancient Ruins.",iconKey:"game",unlocksUnits:[],unlocksResources:["game"],unlocksImprovements:[]},humans_archery:{id:"humans_archery",faction:"humans",pillar:"Rangers & Siege",pillarIndex:3,tier:2,slot:"a",prerequisites:["humans_hunting"],name:"Archery",summary:"Unlocks Archer ranged unit.",iconKey:"archer",unlocksUnits:["archer"],unlocksResources:[],unlocksImprovements:[]},humans_mountaineering:{id:"humans_mountaineering",faction:"humans",pillar:"Rangers & Siege",pillarIndex:3,tier:2,slot:"b",prerequisites:["humans_hunting"],name:"Mountaineering",summary:"Units can traverse Mountains (1.5× DEF, +1 vision).",iconKey:"mountain",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksMountainPass:!0},humans_siegecraft:{id:"humans_siegecraft",faction:"humans",pillar:"Rangers & Siege",pillarIndex:3,tier:3,slot:"capstone",prerequisites:["humans_archery"],name:"Royal Siegecraft",summary:"Unlocks Catapult siege unit (+0.5 ATK with royal engineering).",iconKey:"catapult",unlocksUnits:["catapult"],unlocksResources:[],unlocksImprovements:[]},orcs_pillage:{id:"orcs_pillage",faction:"orcs",pillar:"Raiding",pillarIndex:0,tier:1,slot:"root",prerequisites:[],name:"Pillage & Foraging",summary:"Harvest Berries & Game (2★, +1 Pop).",iconKey:"berries",unlocksUnits:[],unlocksResources:["berries","game"],unlocksImprovements:[]},orcs_warg_riders:{id:"orcs_warg_riders",faction:"orcs",pillar:"Raiding",pillarIndex:0,tier:2,slot:"a",prerequisites:["orcs_pillage"],name:"Direwolf Riders",summary:"Unlocks Rider (Direwolf Rider) cavalry unit.",iconKey:"rider",unlocksUnits:["rider"],unlocksResources:[],unlocksImprovements:[]},orcs_spoils_mastery:{id:"orcs_spoils_mastery",faction:"orcs",pillar:"Raiding",pillarIndex:0,tier:2,slot:"b",prerequisites:["orcs_pillage"],name:"Spoils Mastery",summary:"Spoils of War grants +1★ extra (+3★/kill, +5★/capture).",iconKey:"ruins",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_pack_tactics:{id:"orcs_pack_tactics",faction:"orcs",pillar:"Raiding",pillarIndex:0,tier:3,slot:"capstone",prerequisites:["orcs_warg_riders"],name:"Pack Tactics",summary:"Direwolf Riders gain +0.5 ATK & +3 maxHP.",iconKey:"rider",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_clear_cutting:{id:"orcs_clear_cutting",faction:"orcs",pillar:"Dark Industry",pillarIndex:1,tier:1,slot:"root",prerequisites:[],name:"Clear-Cutting",summary:"Chop Forest (0★ → +2★) & build Slag Pit on Wasteland (3★, +1 Pop).",iconKey:"slag_pit",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["slag_pit"],unlocksChopForest:!0},orcs_dark_forges:{id:"orcs_dark_forges",faction:"orcs",pillar:"Dark Industry",pillarIndex:1,tier:2,slot:"a",prerequisites:["orcs_clear_cutting"],name:"Dark Forges",summary:"Build Foundry on Wasteland (5★, +2 Pop).",iconKey:"foundry",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["foundry"]},orcs_siege_works:{id:"orcs_siege_works",faction:"orcs",pillar:"Dark Industry",pillarIndex:1,tier:2,slot:"b",prerequisites:["orcs_clear_cutting"],name:"Siege Works",summary:"Unlocks Catapult siege unit (discounted to 6★).",iconKey:"catapult",unlocksUnits:["catapult"],unlocksResources:[],unlocksImprovements:[]},orcs_mount_doom:{id:"orcs_mount_doom",faction:"orcs",pillar:"Dark Industry",pillarIndex:1,tier:3,slot:"capstone",prerequisites:["orcs_dark_forges"],name:"Volcanic Furnaces",summary:"Foundries generate +1★/turn & Catapults gain +1 ATK.",iconKey:"foundry",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_shield_wall:{id:"orcs_shield_wall",faction:"orcs",pillar:"Iron Discipline",pillarIndex:2,tier:1,slot:"root",prerequisites:[],name:"Shield Wall",summary:"Unlocks Defender unit.",iconKey:"defender",unlocksUnits:["defender"],unlocksResources:[],unlocksImprovements:[]},orcs_uruk_breeding:{id:"orcs_uruk_breeding",faction:"orcs",pillar:"Iron Discipline",pillarIndex:2,tier:2,slot:"a",prerequisites:["orcs_shield_wall"],name:"War-Pit Breeding",summary:"Unlocks Ironblood Berserker (Bloodlust champion).",iconKey:"uruk_berserker",unlocksUnits:["uruk_berserker"],unlocksResources:[],unlocksImprovements:[]},orcs_war_barracks:{id:"orcs_war_barracks",faction:"orcs",pillar:"Iron Discipline",pillarIndex:2,tier:2,slot:"b",prerequisites:["orcs_shield_wall"],name:"War Barracks",summary:"All cities gain +1 Unit Cap.",iconKey:"city",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_black_gate:{id:"orcs_black_gate",faction:"orcs",pillar:"Iron Discipline",pillarIndex:2,tier:3,slot:"capstone",prerequisites:["orcs_uruk_breeding"],name:"Ashen Gate Horde",summary:"Ironblood Berserkers cost 4★ & gain +3 maxHP.",iconKey:"uruk_berserker",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_snaga_archers:{id:"orcs_snaga_archers",faction:"orcs",pillar:"Shadow Marksmen",pillarIndex:3,tier:1,slot:"root",prerequisites:[],name:"Skirmish Archers",summary:"Unlocks Archer ranged unit.",iconKey:"archer",unlocksUnits:["archer"],unlocksResources:[],unlocksImprovements:[]},orcs_black_arrows:{id:"orcs_black_arrows",faction:"orcs",pillar:"Shadow Marksmen",pillarIndex:3,tier:2,slot:"a",prerequisites:["orcs_snaga_archers"],name:"Black Arrows",summary:"Archers deal +1 damage to wounded targets.",iconKey:"archer",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_crag_climbing:{id:"orcs_crag_climbing",faction:"orcs",pillar:"Shadow Marksmen",pillarIndex:3,tier:2,slot:"b",prerequisites:["orcs_snaga_archers"],name:"Crag Climbing",summary:"Units can traverse Mountains (1.5× DEF, +1 vision).",iconKey:"mountain",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksMountainPass:!0},orcs_fell_volley:{id:"orcs_fell_volley",faction:"orcs",pillar:"Shadow Marksmen",pillarIndex:3,tier:3,slot:"capstone",prerequisites:["orcs_black_arrows"],name:"Fell Volley",summary:"Archers gain +1 RNG (range 3).",iconKey:"archer",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_woodland_lore:{id:"elves_woodland_lore",faction:"elves",pillar:"Sylvan Harmony",pillarIndex:0,tier:1,slot:"root",prerequisites:[],name:"Woodland Lore",summary:"Harvest Berries & Game (2★, +1 Pop) & train Archers.",iconKey:"berries",unlocksUnits:["archer"],unlocksResources:["berries","game"],unlocksImprovements:[]},elves_sanctuaries:{id:"elves_sanctuaries",faction:"elves",pillar:"Sylvan Harmony",pillarIndex:0,tier:2,slot:"a",prerequisites:["elves_woodland_lore"],name:"Woodland Sanctuaries",summary:"Build Sanctuary in Woods (4★, +2 Pop without chopping).",iconKey:"sanctuary",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["sanctuary"]},elves_tree_singing:{id:"elves_tree_singing",faction:"elves",pillar:"Sylvan Harmony",pillarIndex:0,tier:2,slot:"b",prerequisites:["elves_woodland_lore"],name:"Tree-Singing",summary:"Plant Ancient Woods on Plains (3★, +1 Pop).",iconKey:"ancient_woods",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksPlantWoods:!0},elves_lothlorien_sanctum:{id:"elves_lothlorien_sanctum",faction:"elves",pillar:"Sylvan Harmony",pillarIndex:0,tier:3,slot:"capstone",prerequisites:["elves_sanctuaries"],name:"Golden Sanctum",summary:"Sanctuaries grant +1★/turn & Ancient Woods cap rises to +5★/city.",iconKey:"sanctuary",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_woodland_aim:{id:"elves_woodland_aim",faction:"elves",pillar:"Starlight Archery",pillarIndex:1,tier:1,slot:"root",prerequisites:[],name:"Woodland Aim",summary:"Ranged units gain +0.5 ATK from Forest or Ancient Woods.",iconKey:"archer",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_sentinel_order:{id:"elves_sentinel_order",faction:"elves",pillar:"Starlight Archery",pillarIndex:1,tier:2,slot:"a",prerequisites:["elves_woodland_aim"],name:"Sentinel Order",summary:"Unlocks Elven Sentinel (Skirmish champion).",iconKey:"elven_sentinel",unlocksUnits:["elven_sentinel"],unlocksResources:[],unlocksImprovements:[]},elves_keen_sight:{id:"elves_keen_sight",faction:"elves",pillar:"Starlight Archery",pillarIndex:1,tier:2,slot:"b",prerequisites:["elves_woodland_aim"],name:"Keen Sight",summary:"All units gain +1 vision radius in Forest or Ancient Woods.",iconKey:"forest",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_galadhrim_precision:{id:"elves_galadhrim_precision",faction:"elves",pillar:"Starlight Archery",pillarIndex:1,tier:3,slot:"capstone",prerequisites:["elves_sentinel_order"],name:"Starlight Precision",summary:"Elven Sentinels gain +0.5 ATK & +3 maxHP.",iconKey:"elven_sentinel",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_elven_steeds:{id:"elves_elven_steeds",faction:"elves",pillar:"Swiftness & Wardens",pillarIndex:2,tier:1,slot:"root",prerequisites:[],name:"Elven Steeds",summary:"Unlocks Rider cavalry unit.",iconKey:"rider",unlocksUnits:["rider"],unlocksResources:[],unlocksImprovements:[]},elves_wardens:{id:"elves_wardens",faction:"elves",pillar:"Swiftness & Wardens",pillarIndex:2,tier:2,slot:"a",prerequisites:["elves_elven_steeds"],name:"Gladewardens",summary:"Unlocks Defender unit.",iconKey:"defender",unlocksUnits:["defender"],unlocksResources:[],unlocksImprovements:[]},elves_graceful_guard:{id:"elves_graceful_guard",faction:"elves",pillar:"Swiftness & Wardens",pillarIndex:2,tier:2,slot:"b",prerequisites:["elves_elven_steeds"],name:"Graceful Guard",summary:"Defenders gain 1.5× DEF even on Plains.",iconKey:"defender",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_wind_riders:{id:"elves_wind_riders",faction:"elves",pillar:"Swiftness & Wardens",pillarIndex:2,tier:3,slot:"capstone",prerequisites:["elves_wardens"],name:"Wind Riders",summary:"Friendly units heal +2 HP/turn passively inside friendly borders.",iconKey:"park",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_high_paths:{id:"elves_high_paths",faction:"elves",pillar:"Ancient Wisdom",pillarIndex:3,tier:1,slot:"root",prerequisites:[],name:"High Paths",summary:"Units can traverse Mountains (1.5× DEF, +1 vision).",iconKey:"mountain",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksMountainPass:!0},elves_elven_lore:{id:"elves_elven_lore",faction:"elves",pillar:"Ancient Wisdom",pillarIndex:3,tier:2,slot:"a",prerequisites:["elves_high_paths"],name:"Elven Lore",summary:"All future technologies cost -1★ (min 2★).",iconKey:"ruins",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_mallorn_siege:{id:"elves_mallorn_siege",faction:"elves",pillar:"Ancient Wisdom",pillarIndex:3,tier:2,slot:"b",prerequisites:["elves_high_paths"],name:"Sunwood Siege",summary:"Unlocks Catapult siege unit.",iconKey:"catapult",unlocksUnits:["catapult"],unlocksResources:[],unlocksImprovements:[]},elves_rings_preservation:{id:"elves_rings_preservation",faction:"elves",pillar:"Ancient Wisdom",pillarIndex:3,tier:3,slot:"capstone",prerequisites:["elves_elven_lore"],name:"Wards of Preservation",summary:"Cities heal adjacent friendly units +2 HP/turn & +100 Glory per tech.",iconKey:"park",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_delving:{id:"dwarves_delving",faction:"dwarves",pillar:"Deep Delving",pillarIndex:0,tier:1,slot:"root",prerequisites:[],name:"Deep Delving",summary:"Traverse Mountains (1.75× DEF) & Harvest Ore/Starsteel (2★, +1/+2 Pop).",iconKey:"ore",unlocksUnits:[],unlocksResources:["ore","mithril"],unlocksImprovements:[],unlocksMountainPass:!0},dwarves_mining:{id:"dwarves_mining",faction:"dwarves",pillar:"Deep Delving",pillarIndex:0,tier:2,slot:"a",prerequisites:["dwarves_delving"],name:"Mountain Mining",summary:"Build Mine on Mountain (4★, +2 Pop & +1★/turn).",iconKey:"mine",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["mine"]},dwarves_khazad_forges:{id:"dwarves_khazad_forges",faction:"dwarves",pillar:"Deep Delving",pillarIndex:0,tier:2,slot:"b",prerequisites:["dwarves_delving"],name:"Runestone Forges",summary:"Build Great Forge (5★, +2 Pop per adjacent Mine).",iconKey:"great_forge",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["great_forge"]},dwarves_heart_of_mountain:{id:"dwarves_heart_of_mountain",faction:"dwarves",pillar:"Deep Delving",pillarIndex:0,tier:3,slot:"capstone",prerequisites:["dwarves_mining"],name:"Heart of the Deep",summary:"Mines grant +2★/turn & Great Forges grant +1★/turn.",iconKey:"mithril",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_shieldbearers:{id:"dwarves_shieldbearers",faction:"dwarves",pillar:"Shield & Starsteel",pillarIndex:1,tier:1,slot:"root",prerequisites:[],name:"Shieldbearers",summary:"Unlocks Defender unit (+2 maxHP).",iconKey:"defender",unlocksUnits:["defender"],unlocksResources:[],unlocksImprovements:[]},dwarves_mithril_smithing:{id:"dwarves_mithril_smithing",faction:"dwarves",pillar:"Shield & Starsteel",pillarIndex:1,tier:2,slot:"a",prerequisites:["dwarves_shieldbearers"],name:"Starsteel Smithing",summary:"Unlocks Ironbreaker (Stalwart champion).",iconKey:"ironbreaker",unlocksUnits:["ironbreaker"],unlocksResources:[],unlocksImprovements:[]},dwarves_runic_plate:{id:"dwarves_runic_plate",faction:"dwarves",pillar:"Shield & Starsteel",pillarIndex:1,tier:2,slot:"b",prerequisites:["dwarves_shieldbearers"],name:"Runic Plate",summary:"All Dwarven melee units gain +0.5 DEF.",iconKey:"defender",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_mithril_phalanx:{id:"dwarves_mithril_phalanx",faction:"dwarves",pillar:"Shield & Starsteel",pillarIndex:1,tier:3,slot:"capstone",prerequisites:["dwarves_mithril_smithing"],name:"Starsteel Phalanx",summary:"Ironbreakers & Defenders gain +4 maxHP & 1.75× DEF on Plains.",iconKey:"ironbreaker",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_foraging:{id:"dwarves_foraging",faction:"dwarves",pillar:"Hearth & Halls",pillarIndex:2,tier:1,slot:"root",prerequisites:[],name:"Mountain Foraging",summary:"Harvest Berries & Game (2★, +1 Pop).",iconKey:"berries",unlocksUnits:[],unlocksResources:["berries","game"],unlocksImprovements:[]},dwarves_stone_walls:{id:"dwarves_stone_walls",faction:"dwarves",pillar:"Hearth & Halls",pillarIndex:2,tier:2,slot:"a",prerequisites:["dwarves_foraging"],name:"Stone Walls",summary:"All Lv 2+ cities gain free City Walls (2.0× DEF).",iconKey:"city_wall",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_crossbows:{id:"dwarves_crossbows",faction:"dwarves",pillar:"Hearth & Halls",pillarIndex:2,tier:2,slot:"b",prerequisites:["dwarves_foraging"],name:"Dwarven Crossbows",summary:"Unlocks Archer (Crossbowman) ranged unit.",iconKey:"archer",unlocksUnits:["archer"],unlocksResources:[],unlocksImprovements:[]},dwarves_deep_vaults:{id:"dwarves_deep_vaults",faction:"dwarves",pillar:"Hearth & Halls",pillarIndex:2,tier:3,slot:"capstone",prerequisites:["dwarves_stone_walls"],name:"Deep Vaults",summary:"All cities gain +1★/turn & +1 Unit Cap.",iconKey:"city",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_ram_riders:{id:"dwarves_ram_riders",faction:"dwarves",pillar:"Engineering & Rams",pillarIndex:3,tier:1,slot:"root",prerequisites:[],name:"Ram Riders",summary:"Unlocks Rider (Mountain Ram Rider — can enter Mountains).",iconKey:"rider",unlocksUnits:["rider"],unlocksResources:[],unlocksImprovements:[]},dwarves_siegecraft:{id:"dwarves_siegecraft",faction:"dwarves",pillar:"Engineering & Rams",pillarIndex:3,tier:2,slot:"a",prerequisites:["dwarves_ram_riders"],name:"Dwarven Siegecraft",summary:"Unlocks Catapult (15 HP & Fortify).",iconKey:"catapult",unlocksUnits:["catapult"],unlocksResources:[],unlocksImprovements:[]},dwarves_horned_charge:{id:"dwarves_horned_charge",faction:"dwarves",pillar:"Engineering & Rams",pillarIndex:3,tier:2,slot:"b",prerequisites:["dwarves_ram_riders"],name:"Horned Charge",summary:"Ram Riders gain +0.5 ATK.",iconKey:"rider",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_dragon_slayers:{id:"dwarves_dragon_slayers",faction:"dwarves",pillar:"Engineering & Rams",pillarIndex:3,tier:3,slot:"capstone",prerequisites:["dwarves_siegecraft"],name:"Dragon-Slayer Engines",summary:"Catapults cost 6★ and gain +0.5 ATK & +5 maxHP.",iconKey:"catapult",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]}},il={root:0,a:1,b:2,capstone:3};function mi(i){return Object.values(en).filter(e=>e.faction===i).sort((e,t)=>e.pillarIndex-t.pillarIndex||e.tier-t.tier||il[e.slot]-il[t.slot])}const Ra={star:'<path d="M12 1.8l2.1 6.1 6.1-2.1-2.1 6.1 6.1 2.1-6.1 2.1 2.1 6.1-6.1-2.1-2.1 6.1-2.1-6.1-6.1 2.1 2.1-6.1-6.1-2.1 6.1-2.1-2.1-6.1 6.1 2.1z" fill="currentColor" stroke="none"/>',swords:'<path d="M5 19l4-4m-4 1l3 3M19 5l-9.5 9.5M14.5 5H19v4.5M19 19l-4-4m4 1l-3 3M5 5l9.5 9.5M9.5 5H5v4.5" stroke-linecap="round" stroke-linejoin="round"/>',shield:'<path d="M12 2.5L4.5 5.5v5.8c0 4.9 3.2 8.9 7.5 10.2 4.3-1.3 7.5-5.3 7.5-10.2V5.5L12 2.5z" stroke-linejoin="round"/><path d="M12 6v12M8.5 10h7" stroke-linecap="round" opacity="0.65"/>',crown:'<path d="M3 17.5h18l-1.5-9-4.5 4L12 6l-3 6.5-4.5-4L3 17.5z" stroke-linejoin="round"/><path d="M4.5 20.5h15" stroke-linecap="round"/>',compass:'<circle cx="12" cy="12" r="9"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke-linecap="round"/><path d="M12 6.5l2.2 3.3 3.3 2.2-3.3 2.2L12 17.5l-2.2-3.3L6.5 12l3.3-2.2z" fill="currentColor" fill-opacity="0.25" stroke-linejoin="round"/>',codex:'<path d="M6 4.5h11.5a2 2 0 012 2v11.5a2 2 0 01-2 2H6.5a2 2 0 01-2-2V6a1.5 1.5 0 011.5-1.5z" stroke-linejoin="round"/><path d="M8.5 4.5v15.5M11.5 9h5M11.5 12.5h5M11.5 16h3.2" stroke-linecap="round"/>',leaf:'<path d="M19.5 4.5C13 4.5 7 8 5.5 16c-.2 1.2.8 2.2 2 2 8-1.5 11.5-7.5 11.5-13.5z" stroke-linejoin="round"/><path d="M4.5 19.5c3-3 7-6.5 11.5-10" stroke-linecap="round"/>',anvil:'<path d="M3.5 11h16.5c-.6 2.3-2.4 3.5-4.5 3.5H9.5l-1.2 3.5h8.2v2H5.5v-2h1.2l.8-3.5C5.2 14.2 3.8 13 3.5 11z" stroke-linejoin="round"/><path d="M9 7.5h6M12 7.5V11" stroke-linecap="round"/>',tower:'<path d="M6 20.5h12M7.5 20.5V9.5h9v11M6.5 9.5V5h2.5v2h2V5h2v2h2V5h2.5v4.5z" stroke-linejoin="round"/><path d="M10.5 20.5v-4.5a1.5 1.5 0 013 0v4.5" stroke-linecap="round"/>',horse:'<path d="M6.5 20h11l-.5-4.5c-.4-3.2 1.5-5.5 2-7.5l-2.5-3-1.5-1.5-.8 1.8c-2 .2-4.2 1.2-5.7 3.2L6 11.5l1.8 1.5 2.4-.8-.7 3.3-3 4.5z" stroke-linejoin="round"/><circle cx="13.8" cy="7.8" r="0.8" fill="currentColor" stroke="none"/>',bow:'<path d="M7.5 4c6 2.5 6 13.5 0 16" stroke-linecap="round"/><path d="M7.5 4v16" stroke-linecap="round" opacity="0.55"/><path d="M5 12h14.5M16.5 9l3 3-3 3" stroke-linecap="round" stroke-linejoin="round"/>',catapult:'<path d="M4 17.5h16M7 17.5l4-7.5 5 7.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 11.5L18.5 5.5" stroke-linecap="round"/><circle cx="19.2" cy="4.8" r="1.6" fill="currentColor" stroke="none"/><circle cx="7.5" cy="18.5" r="2"/><circle cx="16.5" cy="18.5" r="2"/>',wheat:'<path d="M12 21V5M12 16c-3 0-4.5-1.8-4.5-4 2.2 0 4.5 1.5 4.5 4zM12 16c3 0 4.5-1.8 4.5-4-2.2 0-4.5 1.5-4.5 4zM12 11c-2.6 0-4-1.5-4-3.5 2 0 4 1.3 4 3.5zM12 11c2.6 0 4-1.5 4-3.5-2 0-4 1.3-4 3.5z" stroke-linecap="round" stroke-linejoin="round"/>',pickaxe:'<path d="M5 19l9.5-9.5M10.5 5c3.5.5 6.8 3.2 8.5 6.5l-2.2 1.2c-1.4-2.4-3.6-4.4-6.3-5.2L10.5 5z" stroke-linecap="round" stroke-linejoin="round"/>',heart:'<path d="M12 20.2C7 16.4 3.8 13.4 3.8 9.4A4.4 4.4 0 0112 7a4.4 4.4 0 018.2 2.4c0 4-3.2 7-8.2 10.8z" stroke-linejoin="round"/><path d="M12 9.5v5M9.5 12h5" stroke-linecap="round"/>',road:'<path d="M8.5 20L10.5 4M15.5 20L13.5 4" stroke-linecap="round"/><path d="M12 7v2M12 12v2.5M12 17.5V20" stroke-linecap="round" opacity="0.7"/>',axe:'<path d="M6 19.5l9.5-9.5M13.5 4.5l5.5 5.5c-1.5 2-3.5 3-5.8 2.8l-2.5-2.5c-.2-2.3.8-4.3 2.8-5.8z" stroke-linecap="round" stroke-linejoin="round"/>',tree:'<path d="M12 20.5v-5M12 3.5L6.5 11h3L5.5 16h13l-4-5h3L12 3.5z" stroke-linecap="round" stroke-linejoin="round"/>',skull:'<path d="M6.5 14.5A5.5 5.5 0 1117.5 14.5v2.5h-2.5v2.5h-6V17H6.5v-2.5z" stroke-linejoin="round"/><circle cx="9.8" cy="11.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="14.2" cy="11.5" r="1.1" fill="currentColor" stroke="none"/>',lock:'<rect x="5.5" y="10.5" width="13" height="9.5" rx="2" stroke-linejoin="round"/><path d="M8.5 10.5V7.5a3.5 3.5 0 017 0v3" stroke-linecap="round"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round"/>',chevronRight:'<path d="M9 5.5l6.5 6.5L9 18.5" stroke-linecap="round" stroke-linejoin="round"/>',rotateLeft:'<path d="M7.5 8.5H4V5M4.5 8.5A8 8 0 116 17.5" stroke-linecap="round" stroke-linejoin="round"/>',rotateRight:'<path d="M16.5 8.5H20V5M19.5 8.5A8 8 0 1018 17.5" stroke-linecap="round" stroke-linejoin="round"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.5 2.5 0 014.8.8c0 1.6-2.3 2-2.3 3.5" stroke-linecap="round"/><circle cx="12" cy="16.8" r="0.9" fill="currentColor" stroke="none"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.6.85 1 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke-linejoin="round"/>',refresh:'<path d="M4.5 12a7.5 7.5 0 0113.1-5L20 9.5M19.5 4.5v5h-5M19.5 12a7.5 7.5 0 01-13.1 5L4 14.5M4.5 19.5v-5h5" stroke-linecap="round" stroke-linejoin="round"/>',close:'<path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/>',banner:'<path d="M6 3.5h12v14.5l-6-3.5-6 3.5V3.5z" stroke-linejoin="round"/><path d="M4.5 3.5h15" stroke-linecap="round"/>',eye:'<path d="M2.5 12s3.8-6 9.5-6 9.5 6 9.5 6-3.8 6-9.5 6-9.5-6-9.5-6z" stroke-linejoin="round"/><circle cx="12" cy="12" r="2.6"/>',trophy:'<path d="M7.5 4.5h9v4.2a4.5 4.5 0 01-9 0V4.5z" stroke-linejoin="round"/><path d="M7.5 6.5H4.5a2 2 0 000 4h1.8M16.5 6.5h3a2 2 0 010 4h-1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 13.2v4.3M8.5 20h7M9.5 17.5h5" stroke-linecap="round"/>',ruins:'<path d="M4.5 20h15M6.5 20V9.5M17.5 20V11.5M10.5 20v-7.5M5.5 9.5h7.5l2-2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.5 4l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" fill="currentColor" stroke="none"/>',helm:'<path d="M5.5 11.5a6.5 6.5 0 0113 0v3.2c0 2.6-2 4.6-4.5 5.3v-5.5h-4V20c-2.5-.7-4.5-2.7-4.5-5.3v-3.2z" fill="currentColor" fill-opacity="0.22" stroke-linejoin="round"/><path d="M12 5v5.5M8.5 11.5h7" stroke-linecap="round"/><path d="M17.2 13.5l3.3 1.2v2.4c0 1.9-1.3 3.4-3.3 4.1-2-.7-3.3-2.2-3.3-4.1v-2.4l3.3-1.2z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/>',mapGrid:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" fill="currentColor" fill-opacity="0.16" stroke-linejoin="round"/><path d="M12 12l8-4.5M12 12L4 7.5M12 12v9M8 5.25l8 4.5M16 5.25l-8 4.5" stroke-linecap="round" stroke-linejoin="round"/>',playSword:'<path d="M19.5 4.5l-1.2 4.5-7.8 7.8-3.3-3.3 7.8-7.8 4.5-1.2z" fill="currentColor" fill-opacity="0.28" stroke-linejoin="round"/><path d="M6.2 12.2l5.6 5.6M4.5 19.5l3.3-3.3" stroke-linecap="round" stroke-linejoin="round"/>',crestHumans:'<path d="M6 20h12v-2.2l-1.2-1V10l1.2-1V5h-2.8v2h-2V5h-2.4v2h-2V5H6v4l1.2 1v6.8l-1.2 1V20z" fill="currentColor" fill-opacity="0.28" stroke-linejoin="round"/><path d="M10.2 20v-4.2a1.8 1.8 0 013.6 0V20" stroke-linecap="round"/>',crestOrcs:'<path d="M12 4.5v15.5" stroke-linecap="round" stroke-width="2.2"/><path d="M12 7.5c-2.6 0-5-1.2-6.5-2.8-.8 3.2-.8 6.4 0 9.6 1.5-1.6 3.9-2.8 6.5-2.8 2.6 0 5 1.2 6.5 2.8.8-3.2.8-6.4 0-9.6-1.5 1.6-3.9 2.8-6.5 2.8z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/>',crestElves:'<path d="M12 3l1.9 5.5 5.6 1.7-5.6 1.8L12 17.5l-1.9-5.5L4.5 10.2l5.6-1.7L12 3z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/><path d="M6.5 19.5c2.2-.3 4.2-1.2 5.5-2.7 1.3 1.5 3.3 2.4 5.5 2.7" stroke-linecap="round"/>',crestDwarves:'<path d="M4 12.5L9 5.5l3 4 3-4 5 7" stroke-linejoin="round" stroke-linecap="round"/><path d="M5.5 14.5h13c-.6 1.8-1.9 2.7-3.5 2.7h-1.2l.8 2.3H9.4l.8-2.3H9c-1.6 0-2.9-.9-3.5-2.7z" fill="currentColor" fill-opacity="0.34" stroke-linejoin="round"/>',codexHumans:'<path d="M3.5 6.5C6.2 5.4 9.2 5.5 12 7.2c2.8-1.7 5.8-1.8 8.5-.7v11.5c-2.7-1.1-5.7-1-8.5.7-2.8-1.7-5.8-1.8-8.5-.7V6.5z" fill="currentColor" fill-opacity="0.24" stroke-linejoin="round"/><path d="M12 7.2v11.5M6.5 9.8h3M6.5 13h3M14.5 9.8h3M14.5 13h3" stroke-linecap="round"/>',codexOrcs:'<path d="M5.5 4.5h11.5a1.8 1.8 0 011.8 1.8v12a1.8 1.8 0 01-1.8 1.8H6.5a1.5 1.5 0 01-1.5-1.5V5.5a1 1 0 01.5-1z" fill="currentColor" fill-opacity="0.24" stroke-linejoin="round"/><path d="M8.2 4.5v15.5M12.8 9.2l-1.6 1.6v3l1.6 1.4 1.6-1.4v-3l-1.6-1.6zM10.5 8.5l1.2 1.2M15.1 8.5l-1.2 1.2" stroke-linecap="round" stroke-linejoin="round"/>',codexElves:'<path d="M5.5 4.5h11.5a2 2 0 012 2v11.5a2 2 0 01-2 2H6.5a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 01.5-1.5z" fill="currentColor" fill-opacity="0.22" stroke-linejoin="round"/><path d="M8 4.5v15.5M13.5 8.2c2.2 1.2 2.8 4.2 1.2 6.6-1.6-2.4-2.2-5.4-1.2-6.6zM13.5 14.8v2.2" stroke-linecap="round" stroke-linejoin="round"/>',codexDwarves:'<path d="M5.5 4.5h12l1.5 1.5v12.5L17.5 20h-12V4.5z" fill="currentColor" fill-opacity="0.26" stroke-linejoin="round"/><path d="M8.5 4.5V20M12 8.2v7.6M12 8.2l3.4 2.4-3.4 2.2 3.6 3" stroke-linecap="round" stroke-linejoin="round"/>',endTurnHumans:'<path d="M6.5 6.5l5.5 5.5-5.5 5.5V6.5zM13 6.5l5.5 5.5-5.5 5.5V6.5z" fill="currentColor" stroke-linejoin="round"/>',endTurnOrcs:'<path d="M5.5 7.2l6.2 4.8-6.2 4.8V7.2z" fill="currentColor" stroke-linejoin="round"/><path d="M12.5 13.8c2.6-.5 4.6-2 6-4.8l1.5 1.5c-1.5 3.4-4 5.5-7.5 6.2v-2.9z" fill="currentColor" fill-opacity="0.88" stroke-linejoin="round"/>',endTurnElves:'<path d="M8.5 7.5l1.2 3.2 3.2 1.3-3.2 1.3-1.2 3.2-1.3-3.2L4 12l3.2-1.3 1.3-3.2z" fill="currentColor" stroke="none"/><path d="M13 6.5l6.2 5.5-6.2 5.5 2.2-5.5L13 6.5z" fill="currentColor" stroke-linejoin="round"/>',endTurnDwarves:'<path d="M4.5 10.5h7.5v3.2c-1 .9-2.2 1.3-3.8 1.3l-.6 1.8h3.4v1.7H5.5v-1.7h.8l.5-1.8c-1.2-.5-2-1.4-2.3-2.5v-2z" fill="currentColor" stroke-linejoin="round"/><path d="M13.5 6.5l6 5.5-6 5.5v-11z" fill="currentColor" stroke-linejoin="round"/>'};function se(i,e="icon"){const t=Ra[i]??Ra.star;return`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" aria-hidden="true">${t}</svg>`}function Yn(i,e="icon icon-crest"){return se({humans:"crestHumans",orcs:"crestOrcs",elves:"crestElves",dwarves:"crestDwarves"}[i],e)}function nh(i,e="icon"){return se({humans:"codexHumans",orcs:"codexOrcs",elves:"codexElves",dwarves:"codexDwarves"}[i],e)}function ih(i,e="icon"){return se({humans:"endTurnHumans",orcs:"endTurnOrcs",elves:"endTurnElves",dwarves:"endTurnDwarves"}[i],e)}function ks(i,e="icon"){switch(i){case"warrior":return se("swords",e);case"defender":case"ironbreaker":return se("shield",e);case"archer":case"elven_sentinel":return se("bow",e);case"rider":case"rohirrim_knight":return se("horse",e);case"catapult":return se("catapult",e);case"uruk_berserker":return se("axe",e);default:return se("swords",e)}}function sl(i,e="icon",t=""){const n=`${i} ${t}`.toLowerCase(),s=i.toLowerCase();return s in Ra?se(s,e):n.includes("capture")||n.includes("crown")?se("crown",e):n.includes("ruins")||n.includes("explore")||i.includes("🏛")?se("ruins",e):n.includes("recover")||n.includes("heal")||n.includes("heart")||i.includes("💚")?se("heart",e):n.includes("promote")||n.includes("vet")||i.includes("⭐")?se("star",e):n.includes("harvest")||n.includes("berry")||n.includes("berries")||n.includes("farm")||n.includes("wheat")||i.includes("🌾")||i.includes("🫐")?se("wheat",e):n.includes("game")||i.includes("🦌")?se("bow",e):n.includes("mine")||n.includes("ore")||n.includes("mithril")||n.includes("pick")||i.includes("⛏")||i.includes("💎")?se("pickaxe",e):n.includes("forge")||n.includes("anvil")||n.includes("foundry")||n.includes("slag")||n.includes("workshop")||i.includes("⚒")||i.includes("🔥")||i.includes("🕳")?se("anvil",e):n.includes("road")||i.includes("🛤")?se("road",e):n.includes("chop")||n.includes("axe")||i.includes("🪓")?se("axe",e):n.includes("sanctuary")||i.includes("🌿")?se("leaf",e):n.includes("plant")||n.includes("wood")||n.includes("tree")||i.includes("🌳")?se("tree",e):n.includes("rider")||n.includes("knight")||n.includes("horse")?se("horse",e):n.includes("arch")||n.includes("sentinel")||n.includes("bow")?se("bow",e):n.includes("catapult")||n.includes("siege")?se("catapult",e):n.includes("def")||n.includes("shield")||n.includes("ironbreaker")?se("shield",e):n.includes("windmill")||n.includes("build")||n.includes("tower")||i.includes("🌬")?se("tower",e):se("swords",e)}function rl(i){return i===1?"I":i===2?"II":i===3?"III":String(i)}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ac="172",sh=0,ol=1,rh=2,Xd=1,qd=2,si=3,Ii=0,hn=1,Ft=2,Ri=0,As=1,Ca=2,al=3,cl=4,oh=5,Wi=100,ah=101,ch=102,lh=103,dh=104,uh=200,hh=201,fh=202,ph=203,Ia=204,Pa=205,mh=206,gh=207,_h=208,vh=209,yh=210,Mh=211,wh=212,Sh=213,xh=214,Da=0,La=1,Ua=2,Ns=3,ka=4,Na=5,Oa=6,Fa=7,Yd=0,bh=1,Th=2,Ci=0,Eh=1,Ah=2,Rh=3,Ch=4,Ih=5,Ph=6,Rc=7,Kd=300,Os=301,Fs=302,Ba=303,Ha=304,Ro=306,yr=1e3,Yi=1001,za=1002,zn=1003,Dh=1004,kr=1005,In=1006,Ho=1007,li=1008,gi=1009,jd=1010,Zd=1011,Mr=1012,Cc=1013,Zi=1014,di=1015,Rr=1016,Ic=1017,Pc=1018,Bs=1020,Jd=35902,Qd=1021,eu=1022,Hn=1023,tu=1024,nu=1025,Rs=1026,Hs=1027,iu=1028,Dc=1029,su=1030,Lc=1031,Uc=1033,ho=33776,fo=33777,po=33778,mo=33779,Ga=35840,Va=35841,Wa=35842,$a=35843,Xa=36196,qa=37492,Ya=37496,Ka=37808,ja=37809,Za=37810,Ja=37811,Qa=37812,ec=37813,tc=37814,nc=37815,ic=37816,sc=37817,rc=37818,oc=37819,ac=37820,cc=37821,go=36492,lc=36494,dc=36495,ru=36283,uc=36284,hc=36285,fc=36286,Lh=3200,Uh=3201,ou=0,kh=1,ci="",jt="srgb",zs="srgb-linear",yo="linear",vt="srgb",ts=7680,ll=519,Nh=512,Oh=513,Fh=514,au=515,Bh=516,Hh=517,zh=518,Gh=519,pc=35044,dl="300 es",ui=2e3,Mo=2001;class qs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ul=1234567;const hr=Math.PI/180,wr=180/Math.PI;function hi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Jt[i&255]+Jt[i>>8&255]+Jt[i>>16&255]+Jt[i>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]).toLowerCase()}function Qe(i,e,t){return Math.max(e,Math.min(t,i))}function kc(i,e){return(i%e+e)%e}function Vh(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Wh(i,e,t){return i!==e?(t-i)/(e-i):0}function fr(i,e,t){return(1-t)*i+t*e}function $h(i,e,t,n){return fr(i,e,1-Math.exp(-t*n))}function Xh(i,e=1){return e-Math.abs(kc(i,e*2)-e)}function qh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Yh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Kh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function jh(i,e){return i+Math.random()*(e-i)}function Zh(i){return i*(.5-Math.random())}function Jh(i){i!==void 0&&(ul=i);let e=ul+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Qh(i){return i*hr}function ef(i){return i*wr}function tf(i){return(i&i-1)===0&&i!==0}function nf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function sf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function rf(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),d=r((e+n)/2),l=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),h=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*l,c*u,c*f,a*d);break;case"YZY":i.set(c*f,a*l,c*u,a*d);break;case"ZXZ":i.set(c*u,c*f,a*l,a*d);break;case"XZX":i.set(a*l,c*g,c*h,a*d);break;case"YXY":i.set(c*h,a*l,c*g,a*d);break;case"ZYZ":i.set(c*g,c*h,a*l,a*d);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Bn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function gt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ot={DEG2RAD:hr,RAD2DEG:wr,generateUUID:hi,clamp:Qe,euclideanModulo:kc,mapLinear:Vh,inverseLerp:Wh,lerp:fr,damp:$h,pingpong:Xh,smoothstep:qh,smootherstep:Yh,randInt:Kh,randFloat:jh,randFloatSpread:Zh,seededRandom:Jh,degToRad:Qh,radToDeg:ef,isPowerOfTwo:tf,ceilPowerOfTwo:nf,floorPowerOfTwo:sf,setQuaternionFromProperEuler:rf,normalize:gt,denormalize:Bn};class We{constructor(e=0,t=0){We.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,t,n,s,r,o,a,c,d){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,d)}set(e,t,n,s,r,o,a,c,d){const l=this.elements;return l[0]=e,l[1]=s,l[2]=a,l[3]=t,l[4]=r,l[5]=c,l[6]=n,l[7]=o,l[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],d=n[1],l=n[4],u=n[7],f=n[2],h=n[5],g=n[8],_=s[0],m=s[3],p=s[6],v=s[1],y=s[4],M=s[7],x=s[2],T=s[5],b=s[8];return r[0]=o*_+a*v+c*x,r[3]=o*m+a*y+c*T,r[6]=o*p+a*M+c*b,r[1]=d*_+l*v+u*x,r[4]=d*m+l*y+u*T,r[7]=d*p+l*M+u*b,r[2]=f*_+h*v+g*x,r[5]=f*m+h*y+g*T,r[8]=f*p+h*M+g*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],d=e[7],l=e[8];return t*o*l-t*a*d-n*r*l+n*a*c+s*r*d-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],d=e[7],l=e[8],u=l*o-a*d,f=a*c-l*r,h=d*r-o*c,g=t*u+n*f+s*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*d-l*n)*_,e[2]=(a*n-s*o)*_,e[3]=f*_,e[4]=(l*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=h*_,e[7]=(n*c-d*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),d=Math.sin(r);return this.set(n*c,n*d,-n*(c*o+d*a)+o+e,-s*d,s*c,-s*(-d*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(zo.makeScale(e,t)),this}rotate(e){return this.premultiply(zo.makeRotation(-e)),this}translate(e,t){return this.premultiply(zo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const zo=new Ke;function cu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Sr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function of(){const i=Sr("canvas");return i.style.display="block",i}const hl={};function Ms(i){i in hl||(hl[i]=!0,console.warn(i))}function af(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function cf(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function lf(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const fl=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pl=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function df(){const i={enabled:!0,workingColorSpace:zs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===vt&&(s.r=fi(s.r),s.g=fi(s.g),s.b=fi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===vt&&(s.r=Cs(s.r),s.g=Cs(s.g),s.b=Cs(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ci?yo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[zs]:{primaries:e,whitePoint:n,transfer:yo,toXYZ:fl,fromXYZ:pl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:jt},outputColorSpaceConfig:{drawingBufferColorSpace:jt}},[jt]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:fl,fromXYZ:pl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:jt}}}),i}const dt=df();function fi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Cs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ns;class uf{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ns===void 0&&(ns=Sr("canvas")),ns.width=e.width,ns.height=e.height;const n=ns.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ns}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Sr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=fi(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(fi(t[n]/255)*255):t[n]=fi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let hf=0;class lu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=hi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Go(s[o].image)):r.push(Go(s[o]))}else r=Go(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Go(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?uf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ff=0;class tn extends qs{constructor(e=tn.DEFAULT_IMAGE,t=tn.DEFAULT_MAPPING,n=Yi,s=Yi,r=In,o=li,a=Hn,c=gi,d=tn.DEFAULT_ANISOTROPY,l=ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=hi(),this.name="",this.source=new lu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=d,this.format=a,this.internalFormat=null,this.type=c,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Kd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case yr:e.x=e.x-Math.floor(e.x);break;case Yi:e.x=e.x<0?0:1;break;case za:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case yr:e.y=e.y-Math.floor(e.y);break;case Yi:e.y=e.y<0?0:1;break;case za:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=Kd;tn.DEFAULT_ANISOTROPY=1;class Lt{constructor(e=0,t=0,n=0,s=1){Lt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,d=c[0],l=c[4],u=c[8],f=c[1],h=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(l-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(l+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(d+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(d+1)/2,M=(h+1)/2,x=(p+1)/2,T=(l+f)/4,b=(u+_)/4,E=(g+m)/4;return y>M&&y>x?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=T/n,r=b/n):M>x?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=T/s,r=E/s):x<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(x),n=b/r,s=E/r),this.set(n,s,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-l)*(f-l));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-_)/v,this.z=(f-l)/v,this.w=Math.acos((d+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this.w=Qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this.w=Qe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pf extends qs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Lt(0,0,e,t),this.scissorTest=!1,this.viewport=new Lt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:In,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new tn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new lu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ji extends pf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class du extends tn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=zn,this.minFilter=zn,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class mf extends tn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=zn,this.minFilter=zn,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cr{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],d=n[s+1],l=n[s+2],u=n[s+3];const f=r[o+0],h=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=d,e[t+2]=l,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==f||d!==h||l!==g){let m=1-a;const p=c*f+d*h+l*g+u*_,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const x=Math.sqrt(y),T=Math.atan2(x,p*v);m=Math.sin(m*T)/x,a=Math.sin(a*T)/x}const M=a*v;if(c=c*m+f*M,d=d*m+h*M,l=l*m+g*M,u=u*m+_*M,m===1-a){const x=1/Math.sqrt(c*c+d*d+l*l+u*u);c*=x,d*=x,l*=x,u*=x}}e[t]=c,e[t+1]=d,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],d=n[s+2],l=n[s+3],u=r[o],f=r[o+1],h=r[o+2],g=r[o+3];return e[t]=a*g+l*u+c*h-d*f,e[t+1]=c*g+l*f+d*u-a*h,e[t+2]=d*g+l*h+a*f-c*u,e[t+3]=l*g-a*u-c*f-d*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,d=a(n/2),l=a(s/2),u=a(r/2),f=c(n/2),h=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*l*u+d*h*g,this._y=d*h*u-f*l*g,this._z=d*l*g+f*h*u,this._w=d*l*u-f*h*g;break;case"YXZ":this._x=f*l*u+d*h*g,this._y=d*h*u-f*l*g,this._z=d*l*g-f*h*u,this._w=d*l*u+f*h*g;break;case"ZXY":this._x=f*l*u-d*h*g,this._y=d*h*u+f*l*g,this._z=d*l*g+f*h*u,this._w=d*l*u-f*h*g;break;case"ZYX":this._x=f*l*u-d*h*g,this._y=d*h*u+f*l*g,this._z=d*l*g-f*h*u,this._w=d*l*u+f*h*g;break;case"YZX":this._x=f*l*u+d*h*g,this._y=d*h*u+f*l*g,this._z=d*l*g-f*h*u,this._w=d*l*u-f*h*g;break;case"XZY":this._x=f*l*u-d*h*g,this._y=d*h*u-f*l*g,this._z=d*l*g+f*h*u,this._w=d*l*u+f*h*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],d=t[2],l=t[6],u=t[10],f=n+a+u;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(l-c)*h,this._y=(r-d)*h,this._z=(o-s)*h}else if(n>a&&n>u){const h=2*Math.sqrt(1+n-a-u);this._w=(l-c)/h,this._x=.25*h,this._y=(s+o)/h,this._z=(r+d)/h}else if(a>u){const h=2*Math.sqrt(1+a-n-u);this._w=(r-d)/h,this._x=(s+o)/h,this._y=.25*h,this._z=(c+l)/h}else{const h=2*Math.sqrt(1+u-n-a);this._w=(o-s)/h,this._x=(r+d)/h,this._y=(c+l)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,d=t._z,l=t._w;return this._x=n*l+o*a+s*d-r*c,this._y=s*l+o*c+r*a-n*d,this._z=r*l+o*d+n*c-s*a,this._w=o*l-n*a-s*c-r*d,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const h=1-t;return this._w=h*o+t*this._w,this._x=h*n+t*this._x,this._y=h*s+t*this._y,this._z=h*r+t*this._z,this.normalize(),this}const d=Math.sqrt(c),l=Math.atan2(d,a),u=Math.sin((1-t)*l)/d,f=Math.sin(t*l)/d;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(e=0,t=0,n=0){k.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ml.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ml.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,d=2*(o*s-a*n),l=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*d+o*u-a*l,this.y=n+c*l+a*d-r*u,this.z=s+c*u+r*l-o*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Vo.copy(this).projectOnVector(e),this.sub(Vo)}reflect(e){return this.sub(Vo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Vo=new k,ml=new Cr;class Ys{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Un):Un.fromBufferAttribute(r,o),Un.applyMatrix4(e.matrixWorld),this.expandByPoint(Un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Nr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Nr.copy(n.boundingBox)),Nr.applyMatrix4(e.matrixWorld),this.union(Nr)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Un),Un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Js),Or.subVectors(this.max,Js),is.subVectors(e.a,Js),ss.subVectors(e.b,Js),rs.subVectors(e.c,Js),Mi.subVectors(ss,is),wi.subVectors(rs,ss),ki.subVectors(is,rs);let t=[0,-Mi.z,Mi.y,0,-wi.z,wi.y,0,-ki.z,ki.y,Mi.z,0,-Mi.x,wi.z,0,-wi.x,ki.z,0,-ki.x,-Mi.y,Mi.x,0,-wi.y,wi.x,0,-ki.y,ki.x,0];return!Wo(t,is,ss,rs,Or)||(t=[1,0,0,0,1,0,0,0,1],!Wo(t,is,ss,rs,Or))?!1:(Fr.crossVectors(Mi,wi),t=[Fr.x,Fr.y,Fr.z],Wo(t,is,ss,rs,Or))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Zn=[new k,new k,new k,new k,new k,new k,new k,new k],Un=new k,Nr=new Ys,is=new k,ss=new k,rs=new k,Mi=new k,wi=new k,ki=new k,Js=new k,Or=new k,Fr=new k,Ni=new k;function Wo(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ni.fromArray(i,r);const a=s.x*Math.abs(Ni.x)+s.y*Math.abs(Ni.y)+s.z*Math.abs(Ni.z),c=e.dot(Ni),d=t.dot(Ni),l=n.dot(Ni);if(Math.max(-Math.max(c,d,l),Math.min(c,d,l))>a)return!1}return!0}const gf=new Ys,Qs=new k,$o=new k;class Nc{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):gf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qs.subVectors(e,this.center);const t=Qs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Qs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($o.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qs.copy(e.center).add($o)),this.expandByPoint(Qs.copy(e.center).sub($o))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Jn=new k,Xo=new k,Br=new k,Si=new k,qo=new k,Hr=new k,Yo=new k;class uu{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Jn.copy(this.origin).addScaledVector(this.direction,t),Jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Xo.copy(e).add(t).multiplyScalar(.5),Br.copy(t).sub(e).normalize(),Si.copy(this.origin).sub(Xo);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Br),a=Si.dot(this.direction),c=-Si.dot(Br),d=Si.lengthSq(),l=Math.abs(1-o*o);let u,f,h,g;if(l>0)if(u=o*c-a,f=o*a-c,g=r*l,u>=0)if(f>=-g)if(f<=g){const _=1/l;u*=_,f*=_,h=u*(u+o*f+2*a)+f*(o*u+f+2*c)+d}else f=r,u=Math.max(0,-(o*f+a)),h=-u*u+f*(f+2*c)+d;else f=-r,u=Math.max(0,-(o*f+a)),h=-u*u+f*(f+2*c)+d;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),h=-u*u+f*(f+2*c)+d):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),h=f*(f+2*c)+d):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),h=-u*u+f*(f+2*c)+d);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),h=-u*u+f*(f+2*c)+d;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Xo).addScaledVector(Br,f),h}intersectSphere(e,t){Jn.subVectors(e.center,this.origin);const n=Jn.dot(this.direction),s=Jn.dot(Jn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const d=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,f=this.origin;return d>=0?(n=(e.min.x-f.x)*d,s=(e.max.x-f.x)*d):(n=(e.max.x-f.x)*d,s=(e.min.x-f.x)*d),l>=0?(r=(e.min.y-f.y)*l,o=(e.max.y-f.y)*l):(r=(e.max.y-f.y)*l,o=(e.min.y-f.y)*l),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Jn)!==null}intersectTriangle(e,t,n,s,r){qo.subVectors(t,e),Hr.subVectors(n,e),Yo.crossVectors(qo,Hr);let o=this.direction.dot(Yo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Si.subVectors(this.origin,e);const c=a*this.direction.dot(Hr.crossVectors(Si,Hr));if(c<0)return null;const d=a*this.direction.dot(qo.cross(Si));if(d<0||c+d>o)return null;const l=-a*Si.dot(Yo);return l<0?null:this.at(l/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Rt{constructor(e,t,n,s,r,o,a,c,d,l,u,f,h,g,_,m){Rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,d,l,u,f,h,g,_,m)}set(e,t,n,s,r,o,a,c,d,l,u,f,h,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=d,p[6]=l,p[10]=u,p[14]=f,p[3]=h,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/os.setFromMatrixColumn(e,0).length(),r=1/os.setFromMatrixColumn(e,1).length(),o=1/os.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),d=Math.sin(s),l=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=o*l,h=o*u,g=a*l,_=a*u;t[0]=c*l,t[4]=-c*u,t[8]=d,t[1]=h+g*d,t[5]=f-_*d,t[9]=-a*c,t[2]=_-f*d,t[6]=g+h*d,t[10]=o*c}else if(e.order==="YXZ"){const f=c*l,h=c*u,g=d*l,_=d*u;t[0]=f+_*a,t[4]=g*a-h,t[8]=o*d,t[1]=o*u,t[5]=o*l,t[9]=-a,t[2]=h*a-g,t[6]=_+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*l,h=c*u,g=d*l,_=d*u;t[0]=f-_*a,t[4]=-o*u,t[8]=g+h*a,t[1]=h+g*a,t[5]=o*l,t[9]=_-f*a,t[2]=-o*d,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*l,h=o*u,g=a*l,_=a*u;t[0]=c*l,t[4]=g*d-h,t[8]=f*d+_,t[1]=c*u,t[5]=_*d+f,t[9]=h*d-g,t[2]=-d,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,h=o*d,g=a*c,_=a*d;t[0]=c*l,t[4]=_-f*u,t[8]=g*u+h,t[1]=u,t[5]=o*l,t[9]=-a*l,t[2]=-d*l,t[6]=h*u+g,t[10]=f-_*u}else if(e.order==="XZY"){const f=o*c,h=o*d,g=a*c,_=a*d;t[0]=c*l,t[4]=-u,t[8]=d*l,t[1]=f*u+_,t[5]=o*l,t[9]=h*u-g,t[2]=g*u-h,t[6]=a*l,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_f,e,vf)}lookAt(e,t,n){const s=this.elements;return gn.subVectors(e,t),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),xi.crossVectors(n,gn),xi.lengthSq()===0&&(Math.abs(n.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),xi.crossVectors(n,gn)),xi.normalize(),zr.crossVectors(gn,xi),s[0]=xi.x,s[4]=zr.x,s[8]=gn.x,s[1]=xi.y,s[5]=zr.y,s[9]=gn.y,s[2]=xi.z,s[6]=zr.z,s[10]=gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],d=n[12],l=n[1],u=n[5],f=n[9],h=n[13],g=n[2],_=n[6],m=n[10],p=n[14],v=n[3],y=n[7],M=n[11],x=n[15],T=s[0],b=s[4],E=s[8],w=s[12],S=s[1],R=s[5],P=s[9],D=s[13],G=s[2],$=s[6],q=s[10],K=s[14],V=s[3],le=s[7],H=s[11],Z=s[15];return r[0]=o*T+a*S+c*G+d*V,r[4]=o*b+a*R+c*$+d*le,r[8]=o*E+a*P+c*q+d*H,r[12]=o*w+a*D+c*K+d*Z,r[1]=l*T+u*S+f*G+h*V,r[5]=l*b+u*R+f*$+h*le,r[9]=l*E+u*P+f*q+h*H,r[13]=l*w+u*D+f*K+h*Z,r[2]=g*T+_*S+m*G+p*V,r[6]=g*b+_*R+m*$+p*le,r[10]=g*E+_*P+m*q+p*H,r[14]=g*w+_*D+m*K+p*Z,r[3]=v*T+y*S+M*G+x*V,r[7]=v*b+y*R+M*$+x*le,r[11]=v*E+y*P+M*q+x*H,r[15]=v*w+y*D+M*K+x*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],d=e[13],l=e[2],u=e[6],f=e[10],h=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*u-s*d*u-r*a*f+n*d*f+s*a*h-n*c*h)+_*(+t*c*h-t*d*f+r*o*f-s*o*h+s*d*l-r*c*l)+m*(+t*d*u-t*a*h-r*o*u+n*o*h+r*a*l-n*d*l)+p*(-s*a*l-t*c*u+t*a*f+s*o*u-n*o*f+n*c*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],d=e[7],l=e[8],u=e[9],f=e[10],h=e[11],g=e[12],_=e[13],m=e[14],p=e[15],v=u*m*d-_*f*d+_*c*h-a*m*h-u*c*p+a*f*p,y=g*f*d-l*m*d-g*c*h+o*m*h+l*c*p-o*f*p,M=l*_*d-g*u*d+g*a*h-o*_*h-l*a*p+o*u*p,x=g*u*c-l*_*c-g*a*f+o*_*f+l*a*m-o*u*m,T=t*v+n*y+s*M+r*x;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/T;return e[0]=v*b,e[1]=(_*f*r-u*m*r-_*s*h+n*m*h+u*s*p-n*f*p)*b,e[2]=(a*m*r-_*c*r+_*s*d-n*m*d-a*s*p+n*c*p)*b,e[3]=(u*c*r-a*f*r-u*s*d+n*f*d+a*s*h-n*c*h)*b,e[4]=y*b,e[5]=(l*m*r-g*f*r+g*s*h-t*m*h-l*s*p+t*f*p)*b,e[6]=(g*c*r-o*m*r-g*s*d+t*m*d+o*s*p-t*c*p)*b,e[7]=(o*f*r-l*c*r+l*s*d-t*f*d-o*s*h+t*c*h)*b,e[8]=M*b,e[9]=(g*u*r-l*_*r-g*n*h+t*_*h+l*n*p-t*u*p)*b,e[10]=(o*_*r-g*a*r+g*n*d-t*_*d-o*n*p+t*a*p)*b,e[11]=(l*a*r-o*u*r-l*n*d+t*u*d+o*n*h-t*a*h)*b,e[12]=x*b,e[13]=(l*_*s-g*u*s+g*n*f-t*_*f-l*n*m+t*u*m)*b,e[14]=(g*a*s-o*_*s-g*n*c+t*_*c+o*n*m-t*a*m)*b,e[15]=(o*u*s-l*a*s+l*n*c-t*u*c-o*n*f+t*a*f)*b,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,d=r*o,l=r*a;return this.set(d*o+n,d*a-s*c,d*c+s*a,0,d*a+s*c,l*a+n,l*c-s*o,0,d*c-s*a,l*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,d=r+r,l=o+o,u=a+a,f=r*d,h=r*l,g=r*u,_=o*l,m=o*u,p=a*u,v=c*d,y=c*l,M=c*u,x=n.x,T=n.y,b=n.z;return s[0]=(1-(_+p))*x,s[1]=(h+M)*x,s[2]=(g-y)*x,s[3]=0,s[4]=(h-M)*T,s[5]=(1-(f+p))*T,s[6]=(m+v)*T,s[7]=0,s[8]=(g+y)*b,s[9]=(m-v)*b,s[10]=(1-(f+_))*b,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=os.set(s[0],s[1],s[2]).length();const o=os.set(s[4],s[5],s[6]).length(),a=os.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],kn.copy(this);const d=1/r,l=1/o,u=1/a;return kn.elements[0]*=d,kn.elements[1]*=d,kn.elements[2]*=d,kn.elements[4]*=l,kn.elements[5]*=l,kn.elements[6]*=l,kn.elements[8]*=u,kn.elements[9]*=u,kn.elements[10]*=u,t.setFromRotationMatrix(kn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=ui){const c=this.elements,d=2*r/(t-e),l=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let h,g;if(a===ui)h=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Mo)h=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=l,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=h,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=ui){const c=this.elements,d=1/(t-e),l=1/(n-s),u=1/(o-r),f=(t+e)*d,h=(n+s)*l;let g,_;if(a===ui)g=(o+r)*u,_=-2*u;else if(a===Mo)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*d,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*l,c[9]=0,c[13]=-h,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const os=new k,kn=new Rt,_f=new k(0,0,0),vf=new k(1,1,1),xi=new k,zr=new k,gn=new k,gl=new Rt,_l=new Cr;class Kn{constructor(e=0,t=0,n=0,s=Kn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],d=s[5],l=s[9],u=s[2],f=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-l,h),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(c,d)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,h),this._z=Math.atan2(-o,d)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,d));break;case"YZX":this._z=Math.asin(Qe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-l,d),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,d),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-l,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return gl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return _l.setFromEuler(this),this.setFromQuaternion(_l,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Kn.DEFAULT_ORDER="XYZ";class Oc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let yf=0;const vl=new k,as=new Cr,Qn=new Rt,Gr=new k,er=new k,Mf=new k,wf=new Cr,yl=new k(1,0,0),Ml=new k(0,1,0),wl=new k(0,0,1),Sl={type:"added"},Sf={type:"removed"},cs={type:"childadded",child:null},Ko={type:"childremoved",child:null};class Yt extends qs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yf++}),this.uuid=hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Yt.DEFAULT_UP.clone();const e=new k,t=new Kn,n=new Cr,s=new k(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Rt},normalMatrix:{value:new Ke}}),this.matrix=new Rt,this.matrixWorld=new Rt,this.matrixAutoUpdate=Yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Oc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.multiply(as),this}rotateOnWorldAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.premultiply(as),this}rotateX(e){return this.rotateOnAxis(yl,e)}rotateY(e){return this.rotateOnAxis(Ml,e)}rotateZ(e){return this.rotateOnAxis(wl,e)}translateOnAxis(e,t){return vl.copy(e).applyQuaternion(this.quaternion),this.position.add(vl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yl,e)}translateY(e){return this.translateOnAxis(Ml,e)}translateZ(e){return this.translateOnAxis(wl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Gr.copy(e):Gr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(er,Gr,this.up):Qn.lookAt(Gr,er,this.up),this.quaternion.setFromRotationMatrix(Qn),s&&(Qn.extractRotation(s.matrixWorld),as.setFromRotationMatrix(Qn),this.quaternion.premultiply(as.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sl),cs.child=e,this.dispatchEvent(cs),cs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sf),Ko.child=e,this.dispatchEvent(Ko),Ko.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sl),cs.child=e,this.dispatchEvent(cs),cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,e,Mf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,wf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let d=0,l=c.length;d<l;d++){const u=c[d];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,d=this.material.length;c<d;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),d=o(e.textures),l=o(e.images),u=o(e.shapes),f=o(e.skeletons),h=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),d.length>0&&(n.textures=d),l.length>0&&(n.images=l),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const d in a){const l=a[d];delete l.metadata,c.push(l)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Yt.DEFAULT_UP=new k(0,1,0);Yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Nn=new k,ei=new k,jo=new k,ti=new k,ls=new k,ds=new k,xl=new k,Zo=new k,Jo=new k,Qo=new k,ea=new Lt,ta=new Lt,na=new Lt;class Cn{constructor(e=new k,t=new k,n=new k){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Nn.subVectors(e,t),s.cross(Nn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Nn.subVectors(s,t),ei.subVectors(n,t),jo.subVectors(e,t);const o=Nn.dot(Nn),a=Nn.dot(ei),c=Nn.dot(jo),d=ei.dot(ei),l=ei.dot(jo),u=o*d-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,h=(d*c-a*l)*f,g=(o*l-a*c)*f;return r.set(1-h-g,g,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,ti)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ti.x),c.addScaledVector(o,ti.y),c.addScaledVector(a,ti.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return ea.setScalar(0),ta.setScalar(0),na.setScalar(0),ea.fromBufferAttribute(e,t),ta.fromBufferAttribute(e,n),na.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ea,r.x),o.addScaledVector(ta,r.y),o.addScaledVector(na,r.z),o}static isFrontFacing(e,t,n,s){return Nn.subVectors(n,t),ei.subVectors(e,t),Nn.cross(ei).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Nn.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),Nn.cross(ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Cn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Cn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Cn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Cn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Cn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;ls.subVectors(s,n),ds.subVectors(r,n),Zo.subVectors(e,n);const c=ls.dot(Zo),d=ds.dot(Zo);if(c<=0&&d<=0)return t.copy(n);Jo.subVectors(e,s);const l=ls.dot(Jo),u=ds.dot(Jo);if(l>=0&&u<=l)return t.copy(s);const f=c*u-l*d;if(f<=0&&c>=0&&l<=0)return o=c/(c-l),t.copy(n).addScaledVector(ls,o);Qo.subVectors(e,r);const h=ls.dot(Qo),g=ds.dot(Qo);if(g>=0&&h<=g)return t.copy(r);const _=h*d-c*g;if(_<=0&&d>=0&&g<=0)return a=d/(d-g),t.copy(n).addScaledVector(ds,a);const m=l*g-h*u;if(m<=0&&u-l>=0&&h-g>=0)return xl.subVectors(r,s),a=(u-l)/(u-l+(h-g)),t.copy(s).addScaledVector(xl,a);const p=1/(m+_+f);return o=_*p,a=f*p,t.copy(n).addScaledVector(ls,o).addScaledVector(ds,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const hu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bi={h:0,s:0,l:0},Vr={h:0,s:0,l:0};function ia(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Be{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=dt.workingColorSpace){if(e=kc(e,1),t=Qe(t,0,1),n=Qe(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ia(o,r,e+1/3),this.g=ia(o,r,e),this.b=ia(o,r,e-1/3)}return dt.toWorkingColorSpace(this,s),this}setStyle(e,t=jt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){const n=hu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fi(e.r),this.g=fi(e.g),this.b=fi(e.b),this}copyLinearToSRGB(e){return this.r=Cs(e.r),this.g=Cs(e.g),this.b=Cs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return dt.fromWorkingColorSpace(Qt.copy(this),e),Math.round(Qe(Qt.r*255,0,255))*65536+Math.round(Qe(Qt.g*255,0,255))*256+Math.round(Qe(Qt.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(Qt.copy(this),t);const n=Qt.r,s=Qt.g,r=Qt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,d;const l=(a+o)/2;if(a===o)c=0,d=0;else{const u=o-a;switch(d=l<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=d,e.l=l,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=jt){dt.fromWorkingColorSpace(Qt.copy(this),e);const t=Qt.r,n=Qt.g,s=Qt.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(bi),this.setHSL(bi.h+e,bi.s+t,bi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(bi),e.getHSL(Vr);const n=fr(bi.h,Vr.h,t),s=fr(bi.s,Vr.s,t),r=fr(bi.l,Vr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new Be;Be.NAMES=hu;let xf=0;class Ks extends qs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=hi(),this.name="",this.type="Material",this.blending=As,this.side=Ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ia,this.blendDst=Pa,this.blendEquation=Wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=Ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ll,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ts,this.stencilZFail=ts,this.stencilZPass=ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==As&&(n.blending=this.blending),this.side!==Ii&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ia&&(n.blendSrc=this.blendSrc),this.blendDst!==Pa&&(n.blendDst=this.blendDst),this.blendEquation!==Wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ll&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ts&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ts&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ts&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ct extends Ks{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.combine=Yd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ht=new k,Wr=new We;class Gn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=pc,this.updateRanges=[],this.gpuType=di,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Wr.fromBufferAttribute(this,t),Wr.applyMatrix3(e),this.setXY(t,Wr.x,Wr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix3(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=gt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),s=gt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),s=gt(s,this.array),r=gt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pc&&(e.usage=this.usage),e}}class fu extends Gn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class pu extends Gn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class kt extends Gn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let bf=0;const Tn=new Rt,sa=new Yt,us=new k,_n=new Ys,tr=new Ys,Wt=new k;class wn extends qs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=hi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(cu(e)?pu:fu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Tn.makeRotationFromQuaternion(e),this.applyMatrix4(Tn),this}rotateX(e){return Tn.makeRotationX(e),this.applyMatrix4(Tn),this}rotateY(e){return Tn.makeRotationY(e),this.applyMatrix4(Tn),this}rotateZ(e){return Tn.makeRotationZ(e),this.applyMatrix4(Tn),this}translate(e,t,n){return Tn.makeTranslation(e,t,n),this.applyMatrix4(Tn),this}scale(e,t,n){return Tn.makeScale(e,t,n),this.applyMatrix4(Tn),this}lookAt(e){return sa.lookAt(e),sa.updateMatrix(),this.applyMatrix4(sa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new kt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ys);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const n=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];tr.setFromBufferAttribute(a),this.morphTargetsRelative?(Wt.addVectors(_n.min,tr.min),_n.expandByPoint(Wt),Wt.addVectors(_n.max,tr.max),_n.expandByPoint(Wt)):(_n.expandByPoint(tr.min),_n.expandByPoint(tr.max))}_n.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Wt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let d=0,l=a.count;d<l;d++)Wt.fromBufferAttribute(a,d),c&&(us.fromBufferAttribute(e,d),Wt.add(us)),s=Math.max(s,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let E=0;E<n.count;E++)a[E]=new k,c[E]=new k;const d=new k,l=new k,u=new k,f=new We,h=new We,g=new We,_=new k,m=new k;function p(E,w,S){d.fromBufferAttribute(n,E),l.fromBufferAttribute(n,w),u.fromBufferAttribute(n,S),f.fromBufferAttribute(r,E),h.fromBufferAttribute(r,w),g.fromBufferAttribute(r,S),l.sub(d),u.sub(d),h.sub(f),g.sub(f);const R=1/(h.x*g.y-g.x*h.y);isFinite(R)&&(_.copy(l).multiplyScalar(g.y).addScaledVector(u,-h.y).multiplyScalar(R),m.copy(u).multiplyScalar(h.x).addScaledVector(l,-g.x).multiplyScalar(R),a[E].add(_),a[w].add(_),a[S].add(_),c[E].add(m),c[w].add(m),c[S].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let E=0,w=v.length;E<w;++E){const S=v[E],R=S.start,P=S.count;for(let D=R,G=R+P;D<G;D+=3)p(e.getX(D+0),e.getX(D+1),e.getX(D+2))}const y=new k,M=new k,x=new k,T=new k;function b(E){x.fromBufferAttribute(s,E),T.copy(x);const w=a[E];y.copy(w),y.sub(x.multiplyScalar(x.dot(w))).normalize(),M.crossVectors(T,w);const R=M.dot(c[E])<0?-1:1;o.setXYZW(E,y.x,y.y,y.z,R)}for(let E=0,w=v.length;E<w;++E){const S=v[E],R=S.start,P=S.count;for(let D=R,G=R+P;D<G;D+=3)b(e.getX(D+0)),b(e.getX(D+1)),b(e.getX(D+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Gn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const s=new k,r=new k,o=new k,a=new k,c=new k,d=new k,l=new k,u=new k;if(e)for(let f=0,h=e.count;f<h;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),l.subVectors(o,r),u.subVectors(s,r),l.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),d.fromBufferAttribute(n,m),a.add(l),c.add(l),d.add(l),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,d.x,d.y,d.z)}else for(let f=0,h=t.count;f<h;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),l.subVectors(o,r),u.subVectors(s,r),l.cross(u),n.setXYZ(f+0,l.x,l.y,l.z),n.setXYZ(f+1,l.x,l.y,l.z),n.setXYZ(f+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(a,c){const d=a.array,l=a.itemSize,u=a.normalized,f=new d.constructor(c.length*l);let h=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?h=c[_]*a.data.stride+a.offset:h=c[_]*l;for(let p=0;p<l;p++)f[g++]=d[h++]}return new Gn(f,l,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wn,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],d=e(c,n);t.setAttribute(a,d)}const r=this.morphAttributes;for(const a in r){const c=[],d=r[a];for(let l=0,u=d.length;l<u;l++){const f=d[l],h=e(f,n);c.push(h)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const d=o[a];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const d in c)c[d]!==void 0&&(e[d]=c[d]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const d=n[c];e.data.attributes[c]=d.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const d=this.morphAttributes[c],l=[];for(let u=0,f=d.length;u<f;u++){const h=d[u];l.push(h.toJSON(e.data))}l.length>0&&(s[c]=l,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const d in s){const l=s[d];this.setAttribute(d,l.clone(t))}const r=e.morphAttributes;for(const d in r){const l=[],u=r[d];for(let f=0,h=u.length;f<h;f++)l.push(u[f].clone(t));this.morphAttributes[d]=l}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let d=0,l=o.length;d<l;d++){const u=o[d];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const bl=new Rt,Oi=new uu,$r=new Nc,Tl=new k,Xr=new k,qr=new k,Yr=new k,ra=new k,Kr=new k,El=new k,jr=new k;class U extends Yt{constructor(e=new wn,t=new Ct){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Kr.set(0,0,0);for(let c=0,d=r.length;c<d;c++){const l=a[c],u=r[c];l!==0&&(ra.fromBufferAttribute(u,e),o?Kr.addScaledVector(ra,l):Kr.addScaledVector(ra.sub(t),l))}t.add(Kr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(r),Oi.copy(e.ray).recast(e.near),!($r.containsPoint(Oi.origin)===!1&&(Oi.intersectSphere($r,Tl)===null||Oi.origin.distanceToSquared(Tl)>(e.far-e.near)**2))&&(bl.copy(r).invert(),Oi.copy(e.ray).applyMatrix4(bl),!(n.boundingBox!==null&&Oi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Oi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,d=r.attributes.uv,l=r.attributes.uv1,u=r.attributes.normal,f=r.groups,h=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],v=Math.max(m.start,h.start),y=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let M=v,x=y;M<x;M+=3){const T=a.getX(M),b=a.getX(M+1),E=a.getX(M+2);s=Zr(this,p,e,n,d,l,u,T,b,E),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),_=Math.min(a.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const v=a.getX(m),y=a.getX(m+1),M=a.getX(m+2);s=Zr(this,o,e,n,d,l,u,v,y,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],v=Math.max(m.start,h.start),y=Math.min(c.count,Math.min(m.start+m.count,h.start+h.count));for(let M=v,x=y;M<x;M+=3){const T=M,b=M+1,E=M+2;s=Zr(this,p,e,n,d,l,u,T,b,E),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),_=Math.min(c.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const v=m,y=m+1,M=m+2;s=Zr(this,o,e,n,d,l,u,v,y,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Tf(i,e,t,n,s,r,o,a){let c;if(e.side===hn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Ii,a),c===null)return null;jr.copy(a),jr.applyMatrix4(i.matrixWorld);const d=t.ray.origin.distanceTo(jr);return d<t.near||d>t.far?null:{distance:d,point:jr.clone(),object:i}}function Zr(i,e,t,n,s,r,o,a,c,d){i.getVertexPosition(a,Xr),i.getVertexPosition(c,qr),i.getVertexPosition(d,Yr);const l=Tf(i,e,t,n,Xr,qr,Yr,El);if(l){const u=new k;Cn.getBarycoord(El,Xr,qr,Yr,u),s&&(l.uv=Cn.getInterpolatedAttribute(s,a,c,d,u,new We)),r&&(l.uv1=Cn.getInterpolatedAttribute(r,a,c,d,u,new We)),o&&(l.normal=Cn.getInterpolatedAttribute(o,a,c,d,u,new k),l.normal.dot(n.direction)>0&&l.normal.multiplyScalar(-1));const f={a,b:c,c:d,normal:new k,materialIndex:0};Cn.getNormal(Xr,qr,Yr,f.normal),l.face=f,l.barycoord=u}return l}class pe extends wn{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],d=[],l=[],u=[];let f=0,h=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new kt(d,3)),this.setAttribute("normal",new kt(l,3)),this.setAttribute("uv",new kt(u,2));function g(_,m,p,v,y,M,x,T,b,E,w){const S=M/b,R=x/E,P=M/2,D=x/2,G=T/2,$=b+1,q=E+1;let K=0,V=0;const le=new k;for(let H=0;H<q;H++){const Z=H*R-D;for(let ce=0;ce<$;ce++){const me=ce*S-P;le[_]=me*v,le[m]=Z*y,le[p]=G,d.push(le.x,le.y,le.z),le[_]=0,le[m]=0,le[p]=T>0?1:-1,l.push(le.x,le.y,le.z),u.push(ce/b),u.push(1-H/E),K+=1}}for(let H=0;H<E;H++)for(let Z=0;Z<b;Z++){const ce=f+Z+$*H,me=f+Z+$*(H+1),O=f+(Z+1)+$*(H+1),j=f+(Z+1)+$*H;c.push(ce,me,j),c.push(me,O,j),V+=6}a.addGroup(h,V,w),h+=V,f+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pe(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Gs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function on(i){const e={};for(let t=0;t<i.length;t++){const n=Gs(i[t]);for(const s in n)e[s]=n[s]}return e}function Ef(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function mu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}const Af={clone:Gs,merge:on};var Rf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pi extends Ks{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rf,this.fragmentShader=Cf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gs(e.uniforms),this.uniformsGroups=Ef(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class gu extends Yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Rt,this.projectionMatrix=new Rt,this.projectionMatrixInverse=new Rt,this.coordinateSystem=ui}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ti=new k,Al=new We,Rl=new We;class Fn extends gu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=wr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(hr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return wr*2*Math.atan(Math.tan(hr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z)}getViewSize(e,t){return this.getViewBounds(e,Al,Rl),t.subVectors(Rl,Al)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(hr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,d=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/d,s*=o.width/c,n*=o.height/d}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const hs=-90,fs=1;class If extends Yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Fn(hs,fs,e,t);s.layers=this.layers,this.add(s);const r=new Fn(hs,fs,e,t);r.layers=this.layers,this.add(r);const o=new Fn(hs,fs,e,t);o.layers=this.layers,this.add(o);const a=new Fn(hs,fs,e,t);a.layers=this.layers,this.add(a);const c=new Fn(hs,fs,e,t);c.layers=this.layers,this.add(c);const d=new Fn(hs,fs,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const d of t)this.remove(d);if(e===ui)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Mo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,d,l]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,d),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,l),e.setRenderTarget(u,f,h),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class _u extends tn{constructor(e,t,n,s,r,o,a,c,d,l){e=e!==void 0?e:[],t=t!==void 0?t:Os,super(e,t,n,s,r,o,a,c,d,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Pf extends Ji{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new _u(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:In}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new pe(5,5,5),r=new Pi({name:"CubemapFromEquirect",uniforms:Gs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:hn,blending:Ri});r.uniforms.tEquirect.value=t;const o=new U(s,r),a=t.minFilter;return t.minFilter===li&&(t.minFilter=In),new If(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}class vu extends Yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kn,this.environmentIntensity=1,this.environmentRotation=new Kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Df{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=pc,this.updateRanges=[],this.version=0,this.uuid=hi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const rn=new k;class wo{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=gt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Bn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),s=gt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),s=gt(s,this.array),r=gt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Gn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new wo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class mc extends Ks{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ps;const nr=new k,ms=new k,gs=new k,_s=new We,ir=new We,yu=new Rt,Jr=new k,sr=new k,Qr=new k,Cl=new We,oa=new We,Il=new We;class Pl extends Yt{constructor(e=new mc){if(super(),this.isSprite=!0,this.type="Sprite",ps===void 0){ps=new wn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Df(t,5);ps.setIndex([0,1,2,0,2,3]),ps.setAttribute("position",new wo(n,3,0,!1)),ps.setAttribute("uv",new wo(n,2,3,!1))}this.geometry=ps,this.material=e,this.center=new We(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ms.setFromMatrixScale(this.matrixWorld),yu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),gs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ms.multiplyScalar(-gs.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;eo(Jr.set(-.5,-.5,0),gs,o,ms,s,r),eo(sr.set(.5,-.5,0),gs,o,ms,s,r),eo(Qr.set(.5,.5,0),gs,o,ms,s,r),Cl.set(0,0),oa.set(1,0),Il.set(1,1);let a=e.ray.intersectTriangle(Jr,sr,Qr,!1,nr);if(a===null&&(eo(sr.set(-.5,.5,0),gs,o,ms,s,r),oa.set(0,1),a=e.ray.intersectTriangle(Jr,Qr,sr,!1,nr),a===null))return;const c=e.ray.origin.distanceTo(nr);c<e.near||c>e.far||t.push({distance:c,point:nr.clone(),uv:Cn.getInterpolation(nr,Jr,sr,Qr,Cl,oa,Il,new We),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function eo(i,e,t,n,s,r){_s.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(ir.x=r*_s.x-s*_s.y,ir.y=s*_s.x+r*_s.y):ir.copy(_s),i.copy(e),i.x+=ir.x,i.y+=ir.y,i.applyMatrix4(yu)}const aa=new k,Lf=new k,Uf=new Ke;class zi{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=aa.subVectors(n,t).cross(Lf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(aa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Uf.getNormalMatrix(e),s=this.coplanarPoint(aa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fi=new Nc,to=new k;class Fc{constructor(e=new zi,t=new zi,n=new zi,s=new zi,r=new zi,o=new zi){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ui){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],d=s[4],l=s[5],u=s[6],f=s[7],h=s[8],g=s[9],_=s[10],m=s[11],p=s[12],v=s[13],y=s[14],M=s[15];if(n[0].setComponents(c-r,f-d,m-h,M-p).normalize(),n[1].setComponents(c+r,f+d,m+h,M+p).normalize(),n[2].setComponents(c+o,f+l,m+g,M+v).normalize(),n[3].setComponents(c-o,f-l,m-g,M-v).normalize(),n[4].setComponents(c-a,f-u,m-_,M-y).normalize(),t===ui)n[5].setComponents(c+a,f+u,m+_,M+y).normalize();else if(t===Mo)n[5].setComponents(a,u,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fi)}intersectsSprite(e){return Fi.center.set(0,0,0),Fi.radius=.7071067811865476,Fi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(to.x=s.normal.x>0?e.max.x:e.min.x,to.y=s.normal.y>0?e.max.y:e.min.y,to.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(to)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Je extends Yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}class gc extends tn{constructor(e,t,n,s,r,o,a,c,d){super(e,t,n,s,r,o,a,c,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Mu extends tn{constructor(e,t,n,s,r,o,a,c,d,l=Rs){if(l!==Rs&&l!==Hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&l===Rs&&(n=Zi),n===void 0&&l===Hs&&(n=Bs),super(null,s,r,o,a,c,l,n,d),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:zn,this.minFilter=c!==void 0?c:zn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Is extends wn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],c=[],d=new k,l=new We;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const h=n+u/t*s;d.x=e*Math.cos(h),d.y=e*Math.sin(h),o.push(d.x,d.y,d.z),a.push(0,0,1),l.x=(o[f]/e+1)/2,l.y=(o[f+1]/e+1)/2,c.push(l.x,l.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new kt(o,3)),this.setAttribute("normal",new kt(a,3)),this.setAttribute("uv",new kt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Is(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class et extends wn{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const d=this;s=Math.floor(s),r=Math.floor(r);const l=[],u=[],f=[],h=[];let g=0;const _=[],m=n/2;let p=0;v(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(l),this.setAttribute("position",new kt(u,3)),this.setAttribute("normal",new kt(f,3)),this.setAttribute("uv",new kt(h,2));function v(){const M=new k,x=new k;let T=0;const b=(t-e)/n;for(let E=0;E<=r;E++){const w=[],S=E/r,R=S*(t-e)+e;for(let P=0;P<=s;P++){const D=P/s,G=D*c+a,$=Math.sin(G),q=Math.cos(G);x.x=R*$,x.y=-S*n+m,x.z=R*q,u.push(x.x,x.y,x.z),M.set($,b,q).normalize(),f.push(M.x,M.y,M.z),h.push(D,1-S),w.push(g++)}_.push(w)}for(let E=0;E<s;E++)for(let w=0;w<r;w++){const S=_[w][E],R=_[w+1][E],P=_[w+1][E+1],D=_[w][E+1];(e>0||w!==0)&&(l.push(S,R,D),T+=3),(t>0||w!==r-1)&&(l.push(R,P,D),T+=3)}d.addGroup(p,T,0),p+=T}function y(M){const x=g,T=new We,b=new k;let E=0;const w=M===!0?e:t,S=M===!0?1:-1;for(let P=1;P<=s;P++)u.push(0,m*S,0),f.push(0,S,0),h.push(.5,.5),g++;const R=g;for(let P=0;P<=s;P++){const G=P/s*c+a,$=Math.cos(G),q=Math.sin(G);b.x=w*q,b.y=m*S,b.z=w*$,u.push(b.x,b.y,b.z),f.push(0,S,0),T.x=$*.5+.5,T.y=q*.5*S+.5,h.push(T.x,T.y),g++}for(let P=0;P<s;P++){const D=x+P,G=R+P;M===!0?l.push(G,G+1,D):l.push(G+1,G,D),E+=3}d.addGroup(p,E,M===!0?1:2),p+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new et(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class At extends et{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new At(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Co extends wn{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),d(n),l(),this.setAttribute("position",new kt(r,3)),this.setAttribute("normal",new kt(r.slice(),3)),this.setAttribute("uv",new kt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new k,M=new k,x=new k;for(let T=0;T<t.length;T+=3)h(t[T+0],y),h(t[T+1],M),h(t[T+2],x),c(y,M,x,v)}function c(v,y,M,x){const T=x+1,b=[];for(let E=0;E<=T;E++){b[E]=[];const w=v.clone().lerp(M,E/T),S=y.clone().lerp(M,E/T),R=T-E;for(let P=0;P<=R;P++)P===0&&E===T?b[E][P]=w:b[E][P]=w.clone().lerp(S,P/R)}for(let E=0;E<T;E++)for(let w=0;w<2*(T-E)-1;w++){const S=Math.floor(w/2);w%2===0?(f(b[E][S+1]),f(b[E+1][S]),f(b[E][S])):(f(b[E][S+1]),f(b[E+1][S+1]),f(b[E+1][S]))}}function d(v){const y=new k;for(let M=0;M<r.length;M+=3)y.x=r[M+0],y.y=r[M+1],y.z=r[M+2],y.normalize().multiplyScalar(v),r[M+0]=y.x,r[M+1]=y.y,r[M+2]=y.z}function l(){const v=new k;for(let y=0;y<r.length;y+=3){v.x=r[y+0],v.y=r[y+1],v.z=r[y+2];const M=m(v)/2/Math.PI+.5,x=p(v)/Math.PI+.5;o.push(M,1-x)}g(),u()}function u(){for(let v=0;v<o.length;v+=6){const y=o[v+0],M=o[v+2],x=o[v+4],T=Math.max(y,M,x),b=Math.min(y,M,x);T>.9&&b<.1&&(y<.2&&(o[v+0]+=1),M<.2&&(o[v+2]+=1),x<.2&&(o[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function h(v,y){const M=v*3;y.x=e[M+0],y.y=e[M+1],y.z=e[M+2]}function g(){const v=new k,y=new k,M=new k,x=new k,T=new We,b=new We,E=new We;for(let w=0,S=0;w<r.length;w+=9,S+=6){v.set(r[w+0],r[w+1],r[w+2]),y.set(r[w+3],r[w+4],r[w+5]),M.set(r[w+6],r[w+7],r[w+8]),T.set(o[S+0],o[S+1]),b.set(o[S+2],o[S+3]),E.set(o[S+4],o[S+5]),x.copy(v).add(y).add(M).divideScalar(3);const R=m(x);_(T,S+0,v,R),_(b,S+2,y,R),_(E,S+4,M,R)}}function _(v,y,M,x){x<0&&v.x===1&&(o[y]=v.x-1),M.x===0&&M.z===0&&(o[y]=x/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Co(e.vertices,e.indices,e.radius,e.details)}}class Pn extends Co{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Pn(e.radius,e.detail)}}class wt extends Co{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new wt(e.radius,e.detail)}}class Ir extends wn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),d=a+1,l=c+1,u=e/a,f=t/c,h=[],g=[],_=[],m=[];for(let p=0;p<l;p++){const v=p*f-o;for(let y=0;y<d;y++){const M=y*u-r;g.push(M,-v,0),_.push(0,0,1),m.push(y/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){const y=v+d*p,M=v+d*(p+1),x=v+1+d*(p+1),T=v+1+d*p;h.push(y,M,T),h.push(M,x,T)}this.setIndex(h),this.setAttribute("position",new kt(g,3)),this.setAttribute("normal",new kt(_,3)),this.setAttribute("uv",new kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ir(e.width,e.height,e.widthSegments,e.heightSegments)}}class Rn extends wn{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],d=[],l=[];let u=e;const f=(t-e)/s,h=new k,g=new We;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*o;h.x=u*Math.cos(p),h.y=u*Math.sin(p),c.push(h.x,h.y,h.z),d.push(0,0,1),g.x=(h.x/t+1)/2,g.y=(h.y/t+1)/2,l.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const v=p+m,y=v,M=v+n+1,x=v+n+2,T=v+1;a.push(y,M,T),a.push(M,x,T)}}this.setIndex(a),this.setAttribute("position",new kt(c,3)),this.setAttribute("normal",new kt(d,3)),this.setAttribute("uv",new kt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rn(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Pr extends wn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],d=[],l=new k,u=new k,f=new k;for(let h=0;h<=n;h++)for(let g=0;g<=s;g++){const _=g/s*r,m=h/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),l.x=e*Math.cos(_),l.y=e*Math.sin(_),f.subVectors(u,l).normalize(),c.push(f.x,f.y,f.z),d.push(g/s),d.push(h/n)}for(let h=1;h<=n;h++)for(let g=1;g<=s;g++){const _=(s+1)*h+g-1,m=(s+1)*(h-1)+g-1,p=(s+1)*(h-1)+g,v=(s+1)*h+g;o.push(_,m,v),o.push(m,p,v)}this.setIndex(o),this.setAttribute("position",new kt(a,3)),this.setAttribute("normal",new kt(c,3)),this.setAttribute("uv",new kt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Vs extends Ks{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ou,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class kf extends Ks{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Nf extends Ks{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Dl={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Of{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,c;const d=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(l){a++,r===!1&&s.onStart!==void 0&&s.onStart(l,o,a),r=!0},this.itemEnd=function(l){o++,s.onProgress!==void 0&&s.onProgress(l,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(l){s.onError!==void 0&&s.onError(l)},this.resolveURL=function(l){return c?c(l):l},this.setURLModifier=function(l){return c=l,this},this.addHandler=function(l,u){return d.push(l,u),this},this.removeHandler=function(l){const u=d.indexOf(l);return u!==-1&&d.splice(u,2),this},this.getHandler=function(l){for(let u=0,f=d.length;u<f;u+=2){const h=d[u],g=d[u+1];if(h.global&&(h.lastIndex=0),h.test(l))return g}return null}}}const Ff=new Of;class Bc{constructor(e){this.manager=e!==void 0?e:Ff,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Bc.DEFAULT_MATERIAL_NAME="__DEFAULT";class Bf extends Bc{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Dl.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Sr("img");function c(){l(),Dl.add(e,this),t&&t(this),r.manager.itemEnd(e)}function d(u){l(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function l(){a.removeEventListener("load",c,!1),a.removeEventListener("error",d,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",d,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class Hf extends Bc{constructor(e){super(e)}load(e,t,n,s){const r=new tn,o=new Bf(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class wu extends Yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Su extends wu{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ca=new Rt,Ll=new k,Ul=new k;class zf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.map=null,this.mapPass=null,this.matrix=new Rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fc,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new Lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ll.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ll),Ul.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ul),t.updateMatrixWorld(),ca.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ca),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ca)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Io extends gu{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=d*this.view.offsetX,o=r+d*this.view.width,a-=l*this.view.offsetY,c=a-l*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Gf extends zf{constructor(){super(new Io(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class So extends wu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.target=new Yt,this.shadow=new Gf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Vf extends Fn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}const kl=new Rt;class Wf{constructor(e,t,n=0,s=1/0){this.ray=new uu(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Oc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return kl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kl),this}intersectObject(e,t=!0,n=[]){return _c(e,this,n,t),n.sort(Nl),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)_c(e[s],this,n,t);return n.sort(Nl),n}}function Nl(i,e){return i.distance-e.distance}function _c(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)_c(r[o],e,t,!0)}}function Ol(i,e,t,n){const s=$f(n);switch(t){case Qd:return i*e;case tu:return i*e;case nu:return i*e*2;case iu:return i*e/s.components*s.byteLength;case Dc:return i*e/s.components*s.byteLength;case su:return i*e*2/s.components*s.byteLength;case Lc:return i*e*2/s.components*s.byteLength;case eu:return i*e*3/s.components*s.byteLength;case Hn:return i*e*4/s.components*s.byteLength;case Uc:return i*e*4/s.components*s.byteLength;case ho:case fo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case po:case mo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Va:case $a:return Math.max(i,16)*Math.max(e,8)/4;case Ga:case Wa:return Math.max(i,8)*Math.max(e,8)/2;case Xa:case qa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ja:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Za:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Qa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ec:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case tc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case nc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ic:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case sc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case rc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case oc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ac:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case cc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case go:case lc:case dc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ru:case uc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case hc:case fc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function $f(i){switch(i){case gi:case jd:return{byteLength:1,components:1};case Mr:case Zd:case Rr:return{byteLength:2,components:1};case Ic:case Pc:return{byteLength:2,components:4};case Zi:case Cc:case di:return{byteLength:4,components:1};case Jd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ac}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ac);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function xu(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Xf(i){const e=new WeakMap;function t(a,c){const d=a.array,l=a.usage,u=d.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,d,l),a.onUploadCallback();let h;if(d instanceof Float32Array)h=i.FLOAT;else if(d instanceof Uint16Array)a.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)h=i.SHORT;else if(d instanceof Uint32Array)h=i.UNSIGNED_INT;else if(d instanceof Int32Array)h=i.INT;else if(d instanceof Int8Array)h=i.BYTE;else if(d instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:f,type:h,bytesPerElement:d.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,d){const l=c.array,u=c.updateRanges;if(i.bindBuffer(d,a),u.length===0)i.bufferSubData(d,0,l);else{u.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<u.length;h++){const g=u[f],_=u[h];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let h=0,g=u.length;h<g;h++){const _=u[h];i.bufferSubData(d,_.start*l.BYTES_PER_ELEMENT,l,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const l=e.get(a);(!l||l.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const d=e.get(a);if(d===void 0)e.set(a,t(a,c));else if(d.version<a.version){if(d.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(d.buffer,a,c),d.version=a.version}}return{get:s,remove:r,update:o}}var qf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Kf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ep=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,np=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ip=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,op=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ap=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,cp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,lp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,fp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,mp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,gp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_p=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,vp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,yp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xp="gl_FragColor = linearToOutputTexel( gl_FragColor );",bp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Tp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ep=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ap=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Rp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ip=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Dp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Up=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,kp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Np=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Op=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Bp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Hp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,$p=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Xp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Yp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Qp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,em=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,nm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,im=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,om=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,am=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,lm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,um=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,hm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_m=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ym=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Sm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Em=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Am=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Cm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Im=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Pm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Dm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Um=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,km=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Nm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Om=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Gm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,$m=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Km=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Qm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,e0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,t0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,n0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,i0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,r0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,o0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,a0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,l0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,u0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,f0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,p0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,m0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,_0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,v0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,y0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,w0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,S0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,x0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,b0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,T0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:qf,alphahash_pars_fragment:Yf,alphamap_fragment:Kf,alphamap_pars_fragment:jf,alphatest_fragment:Zf,alphatest_pars_fragment:Jf,aomap_fragment:Qf,aomap_pars_fragment:ep,batching_pars_vertex:tp,batching_vertex:np,begin_vertex:ip,beginnormal_vertex:sp,bsdfs:rp,iridescence_fragment:op,bumpmap_pars_fragment:ap,clipping_planes_fragment:cp,clipping_planes_pars_fragment:lp,clipping_planes_pars_vertex:dp,clipping_planes_vertex:up,color_fragment:hp,color_pars_fragment:fp,color_pars_vertex:pp,color_vertex:mp,common:gp,cube_uv_reflection_fragment:_p,defaultnormal_vertex:vp,displacementmap_pars_vertex:yp,displacementmap_vertex:Mp,emissivemap_fragment:wp,emissivemap_pars_fragment:Sp,colorspace_fragment:xp,colorspace_pars_fragment:bp,envmap_fragment:Tp,envmap_common_pars_fragment:Ep,envmap_pars_fragment:Ap,envmap_pars_vertex:Rp,envmap_physical_pars_fragment:Bp,envmap_vertex:Cp,fog_vertex:Ip,fog_pars_vertex:Pp,fog_fragment:Dp,fog_pars_fragment:Lp,gradientmap_pars_fragment:Up,lightmap_pars_fragment:kp,lights_lambert_fragment:Np,lights_lambert_pars_fragment:Op,lights_pars_begin:Fp,lights_toon_fragment:Hp,lights_toon_pars_fragment:zp,lights_phong_fragment:Gp,lights_phong_pars_fragment:Vp,lights_physical_fragment:Wp,lights_physical_pars_fragment:$p,lights_fragment_begin:Xp,lights_fragment_maps:qp,lights_fragment_end:Yp,logdepthbuf_fragment:Kp,logdepthbuf_pars_fragment:jp,logdepthbuf_pars_vertex:Zp,logdepthbuf_vertex:Jp,map_fragment:Qp,map_pars_fragment:em,map_particle_fragment:tm,map_particle_pars_fragment:nm,metalnessmap_fragment:im,metalnessmap_pars_fragment:sm,morphinstance_vertex:rm,morphcolor_vertex:om,morphnormal_vertex:am,morphtarget_pars_vertex:cm,morphtarget_vertex:lm,normal_fragment_begin:dm,normal_fragment_maps:um,normal_pars_fragment:hm,normal_pars_vertex:fm,normal_vertex:pm,normalmap_pars_fragment:mm,clearcoat_normal_fragment_begin:gm,clearcoat_normal_fragment_maps:_m,clearcoat_pars_fragment:vm,iridescence_pars_fragment:ym,opaque_fragment:Mm,packing:wm,premultiplied_alpha_fragment:Sm,project_vertex:xm,dithering_fragment:bm,dithering_pars_fragment:Tm,roughnessmap_fragment:Em,roughnessmap_pars_fragment:Am,shadowmap_pars_fragment:Rm,shadowmap_pars_vertex:Cm,shadowmap_vertex:Im,shadowmask_pars_fragment:Pm,skinbase_vertex:Dm,skinning_pars_vertex:Lm,skinning_vertex:Um,skinnormal_vertex:km,specularmap_fragment:Nm,specularmap_pars_fragment:Om,tonemapping_fragment:Fm,tonemapping_pars_fragment:Bm,transmission_fragment:Hm,transmission_pars_fragment:zm,uv_pars_fragment:Gm,uv_pars_vertex:Vm,uv_vertex:Wm,worldpos_vertex:$m,background_vert:Xm,background_frag:qm,backgroundCube_vert:Ym,backgroundCube_frag:Km,cube_vert:jm,cube_frag:Zm,depth_vert:Jm,depth_frag:Qm,distanceRGBA_vert:e0,distanceRGBA_frag:t0,equirect_vert:n0,equirect_frag:i0,linedashed_vert:s0,linedashed_frag:r0,meshbasic_vert:o0,meshbasic_frag:a0,meshlambert_vert:c0,meshlambert_frag:l0,meshmatcap_vert:d0,meshmatcap_frag:u0,meshnormal_vert:h0,meshnormal_frag:f0,meshphong_vert:p0,meshphong_frag:m0,meshphysical_vert:g0,meshphysical_frag:_0,meshtoon_vert:v0,meshtoon_frag:y0,points_vert:M0,points_frag:w0,shadow_vert:S0,shadow_frag:x0,sprite_vert:b0,sprite_frag:T0},fe={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Xn={basic:{uniforms:on([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:on([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Be(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:on([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:on([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:on([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Be(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:on([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:on([fe.points,fe.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:on([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:on([fe.common,fe.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:on([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:on([fe.sprite,fe.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:on([fe.common,fe.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:on([fe.lights,fe.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Xn.physical={uniforms:on([Xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const no={r:0,b:0,g:0},Bi=new Kn,E0=new Rt;function A0(i,e,t,n,s,r,o){const a=new Be(0);let c=r===!0?0:1,d,l,u=null,f=0,h=null;function g(y){let M=y.isScene===!0?y.background:null;return M&&M.isTexture&&(M=(y.backgroundBlurriness>0?t:e).get(M)),M}function _(y){let M=!1;const x=g(y);x===null?p(a,c):x&&x.isColor&&(p(x,1),M=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,M){const x=g(M);x&&(x.isCubeTexture||x.mapping===Ro)?(l===void 0&&(l=new U(new pe(1,1,1),new Pi({name:"BackgroundCubeMaterial",uniforms:Gs(Xn.backgroundCube.uniforms),vertexShader:Xn.backgroundCube.vertexShader,fragmentShader:Xn.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,b,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(l)),Bi.copy(M.backgroundRotation),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),l.material.uniforms.envMap.value=x,l.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(E0.makeRotationFromEuler(Bi)),l.material.toneMapped=dt.getTransfer(x.colorSpace)!==vt,(u!==x||f!==x.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,f=x.version,h=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(d===void 0&&(d=new U(new Ir(2,2),new Pi({name:"BackgroundMaterial",uniforms:Gs(Xn.background.uniforms),vertexShader:Xn.background.vertexShader,fragmentShader:Xn.background.fragmentShader,side:Ii,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(d)),d.material.uniforms.t2D.value=x,d.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,d.material.toneMapped=dt.getTransfer(x.colorSpace)!==vt,x.matrixAutoUpdate===!0&&x.updateMatrix(),d.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||h!==i.toneMapping)&&(d.material.needsUpdate=!0,u=x,f=x.version,h=i.toneMapping),d.layers.enableAll(),y.unshift(d,d.geometry,d.material,0,0,null))}function p(y,M){y.getRGB(no,mu(i)),n.buffers.color.setClear(no.r,no.g,no.b,M,o)}function v(){l!==void 0&&(l.geometry.dispose(),l.material.dispose()),d!==void 0&&(d.geometry.dispose(),d.material.dispose())}return{getClearColor:function(){return a},setClearColor:function(y,M=1){a.set(y),c=M,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:_,addToRenderList:m,dispose:v}}function R0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(S,R,P,D,G){let $=!1;const q=u(D,P,R);r!==q&&(r=q,d(r.object)),$=h(S,D,P,G),$&&g(S,D,P,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,M(S,R,P,D),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return i.createVertexArray()}function d(S){return i.bindVertexArray(S)}function l(S){return i.deleteVertexArray(S)}function u(S,R,P){const D=P.wireframe===!0;let G=n[S.id];G===void 0&&(G={},n[S.id]=G);let $=G[R.id];$===void 0&&($={},G[R.id]=$);let q=$[D];return q===void 0&&(q=f(c()),$[D]=q),q}function f(S){const R=[],P=[],D=[];for(let G=0;G<t;G++)R[G]=0,P[G]=0,D[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:P,attributeDivisors:D,object:S,attributes:{},index:null}}function h(S,R,P,D){const G=r.attributes,$=R.attributes;let q=0;const K=P.getAttributes();for(const V in K)if(K[V].location>=0){const H=G[V];let Z=$[V];if(Z===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(Z=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(Z=S.instanceColor)),H===void 0||H.attribute!==Z||Z&&H.data!==Z.data)return!0;q++}return r.attributesNum!==q||r.index!==D}function g(S,R,P,D){const G={},$=R.attributes;let q=0;const K=P.getAttributes();for(const V in K)if(K[V].location>=0){let H=$[V];H===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(H=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(H=S.instanceColor));const Z={};Z.attribute=H,H&&H.data&&(Z.data=H.data),G[V]=Z,q++}r.attributes=G,r.attributesNum=q,r.index=D}function _(){const S=r.newAttributes;for(let R=0,P=S.length;R<P;R++)S[R]=0}function m(S){p(S,0)}function p(S,R){const P=r.newAttributes,D=r.enabledAttributes,G=r.attributeDivisors;P[S]=1,D[S]===0&&(i.enableVertexAttribArray(S),D[S]=1),G[S]!==R&&(i.vertexAttribDivisor(S,R),G[S]=R)}function v(){const S=r.newAttributes,R=r.enabledAttributes;for(let P=0,D=R.length;P<D;P++)R[P]!==S[P]&&(i.disableVertexAttribArray(P),R[P]=0)}function y(S,R,P,D,G,$,q){q===!0?i.vertexAttribIPointer(S,R,P,G,$):i.vertexAttribPointer(S,R,P,D,G,$)}function M(S,R,P,D){_();const G=D.attributes,$=P.getAttributes(),q=R.defaultAttributeValues;for(const K in $){const V=$[K];if(V.location>=0){let le=G[K];if(le===void 0&&(K==="instanceMatrix"&&S.instanceMatrix&&(le=S.instanceMatrix),K==="instanceColor"&&S.instanceColor&&(le=S.instanceColor)),le!==void 0){const H=le.normalized,Z=le.itemSize,ce=e.get(le);if(ce===void 0)continue;const me=ce.buffer,O=ce.type,j=ce.bytesPerElement,ye=O===i.INT||O===i.UNSIGNED_INT||le.gpuType===Cc;if(le.isInterleavedBufferAttribute){const ue=le.data,De=ue.stride,Ie=le.offset;if(ue.isInstancedInterleavedBuffer){for(let Ne=0;Ne<V.locationSize;Ne++)p(V.location+Ne,ue.meshPerAttribute);S.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Ne=0;Ne<V.locationSize;Ne++)m(V.location+Ne);i.bindBuffer(i.ARRAY_BUFFER,me);for(let Ne=0;Ne<V.locationSize;Ne++)y(V.location+Ne,Z/V.locationSize,O,H,De*j,(Ie+Z/V.locationSize*Ne)*j,ye)}else{if(le.isInstancedBufferAttribute){for(let ue=0;ue<V.locationSize;ue++)p(V.location+ue,le.meshPerAttribute);S.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ue=0;ue<V.locationSize;ue++)m(V.location+ue);i.bindBuffer(i.ARRAY_BUFFER,me);for(let ue=0;ue<V.locationSize;ue++)y(V.location+ue,Z/V.locationSize,O,H,Z*j,Z/V.locationSize*ue*j,ye)}}else if(q!==void 0){const H=q[K];if(H!==void 0)switch(H.length){case 2:i.vertexAttrib2fv(V.location,H);break;case 3:i.vertexAttrib3fv(V.location,H);break;case 4:i.vertexAttrib4fv(V.location,H);break;default:i.vertexAttrib1fv(V.location,H)}}}}v()}function x(){E();for(const S in n){const R=n[S];for(const P in R){const D=R[P];for(const G in D)l(D[G].object),delete D[G];delete R[P]}delete n[S]}}function T(S){if(n[S.id]===void 0)return;const R=n[S.id];for(const P in R){const D=R[P];for(const G in D)l(D[G].object),delete D[G];delete R[P]}delete n[S.id]}function b(S){for(const R in n){const P=n[R];if(P[S.id]===void 0)continue;const D=P[S.id];for(const G in D)l(D[G].object),delete D[G];delete P[S.id]}}function E(){w(),o=!0,r!==s&&(r=s,d(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:w,dispose:x,releaseStatesOfGeometry:T,releaseStatesOfProgram:b,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function C0(i,e,t){let n;function s(d){n=d}function r(d,l){i.drawArrays(n,d,l),t.update(l,n,1)}function o(d,l,u){u!==0&&(i.drawArraysInstanced(n,d,l,u),t.update(l,n,u))}function a(d,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,d,0,l,0,u);let h=0;for(let g=0;g<u;g++)h+=l[g];t.update(h,n,1)}function c(d,l,u,f){if(u===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<d.length;g++)o(d[g],l[g],f[g]);else{h.multiDrawArraysInstancedWEBGL(n,d,0,l,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=l[_]*f[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function I0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(b){return!(b!==Hn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const E=b===Rr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==gi&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==di&&!E)}function c(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=t.precision!==void 0?t.precision:"highp";const l=c(d);l!==d&&(console.warn("THREE.WebGLRenderer:",d,"not supported, using",l,"instead."),d=l);const u=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:d,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:M,vertexTextures:x,maxSamples:T}}function P0(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new zi,a=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const h=u.length!==0||f||n!==0||s;return s=f,n=u.length,h},this.beginShadows=function(){r=!0,l(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=l(u,f,0)},this.setState=function(u,f,h){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?l(null):d();else{const v=r?0:n,y=v*4;let M=p.clippingState||null;c.value=M,M=l(g,f,y,h);for(let x=0;x!==y;++x)M[x]=t[x];p.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function d(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function l(u,f,h,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=h+_*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,M=h;y!==_;++y,M+=4)o.copy(u[y]).applyMatrix4(v,a),o.normal.toArray(m,M),m[M+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function D0(i){let e=new WeakMap;function t(o,a){return a===Ba?o.mapping=Os:a===Ha&&(o.mapping=Fs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ba||a===Ha)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const d=new Pf(c.height);return d.fromEquirectangularTexture(i,o),e.set(o,d),o.addEventListener("dispose",s),t(d.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Es=4,Fl=[.125,.215,.35,.446,.526,.582],$i=20,la=new Io,Bl=new Be;let da=null,ua=0,ha=0,fa=!1;const Gi=(1+Math.sqrt(5))/2,vs=1/Gi,Hl=[new k(-Gi,vs,0),new k(Gi,vs,0),new k(-vs,0,Gi),new k(vs,0,Gi),new k(0,Gi,-vs),new k(0,Gi,vs),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)];class zl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){da=this._renderer.getRenderTarget(),ua=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(da,ua,ha),this._renderer.xr.enabled=fa,e.scissorTest=!1,io(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Os||e.mapping===Fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),da=this._renderer.getRenderTarget(),ua=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:In,minFilter:In,generateMipmaps:!1,type:Rr,format:Hn,colorSpace:zs,depthBuffer:!1},s=Gl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=L0(r)),this._blurMaterial=U0(r,e,t)}return s}_compileMaterial(e){const t=new U(this._lodPlanes[0],e);this._renderer.compile(t,la)}_sceneToCubeUV(e,t,n,s){const a=new Fn(90,1,t,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],l=this._renderer,u=l.autoClear,f=l.toneMapping;l.getClearColor(Bl),l.toneMapping=Ci,l.autoClear=!1;const h=new Ct({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1}),g=new U(new pe,h);let _=!1;const m=e.background;m?m.isColor&&(h.color.copy(m),e.background=null,_=!0):(h.color.copy(Bl),_=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(a.up.set(0,c[p],0),a.lookAt(d[p],0,0)):v===1?(a.up.set(0,0,c[p]),a.lookAt(0,d[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,d[p]));const y=this._cubeSize;io(s,v*y,p>2?y:0,y,y),l.setRenderTarget(s),_&&l.render(g,a),l.render(e,a)}g.geometry.dispose(),g.material.dispose(),l.toneMapping=f,l.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Os||e.mapping===Fs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new U(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;io(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,la)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Hl[(s-r-1)%Hl.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,d=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const l=3,u=new U(this._lodPlanes[s],d),f=d.uniforms,h=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*h):2*Math.PI/(2*$i-1),_=r/g,m=isFinite(r)?1+Math.floor(l*_):$i;m>$i&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${$i}`);const p=[];let v=0;for(let b=0;b<$i;++b){const E=b/_,w=Math.exp(-E*E/2);p.push(w),b===0?v+=w:b<m&&(v+=2*w)}for(let b=0;b<p.length;b++)p[b]=p[b]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;const M=this._sizeLods[s],x=3*M*(s>y-Es?s-y+Es:0),T=4*(this._cubeSize-M);io(t,x,T,3*M,2*M),c.setRenderTarget(t),c.render(u,la)}}function L0(i){const e=[],t=[],n=[];let s=i;const r=i-Es+1+Fl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-Es?c=Fl[o-i+Es-1]:o===0&&(c=0),n.push(c);const d=1/(a-2),l=-d,u=1+d,f=[l,l,u,l,u,u,l,l,u,u,l,u],h=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*h),y=new Float32Array(m*g*h),M=new Float32Array(p*g*h);for(let T=0;T<h;T++){const b=T%3*2/3-1,E=T>2?0:-1,w=[b,E,0,b+2/3,E,0,b+2/3,E+1,0,b,E,0,b+2/3,E+1,0,b,E+1,0];v.set(w,_*g*T),y.set(f,m*g*T);const S=[T,T,T,T,T,T];M.set(S,p*g*T)}const x=new wn;x.setAttribute("position",new Gn(v,_)),x.setAttribute("uv",new Gn(y,m)),x.setAttribute("faceIndex",new Gn(M,p)),e.push(x),s>Es&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Gl(i,e,t){const n=new Ji(i,e,t);return n.texture.mapping=Ro,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function io(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function U0(i,e,t){const n=new Float32Array($i),s=new k(0,1,0);return new Pi({name:"SphericalGaussianBlur",defines:{n:$i,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Vl(){return new Pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Wl(){return new Pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Hc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function k0(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,d=c===Ba||c===Ha,l=c===Os||c===Fs;if(d||l){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new zl(i)),u=d?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const h=a.image;return d&&h&&h.height>0||l&&h&&s(h)?(t===null&&(t=new zl(i)),u=d?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const d=6;for(let l=0;l<d;l++)a[l]!==void 0&&c++;return c===d}function r(a){const c=a.target;c.removeEventListener("dispose",r);const d=e.get(c);d!==void 0&&(e.delete(c),d.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function N0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Ms("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function O0(i,e,t,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];const h=r.get(f);h&&(e.remove(h),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(u){const f=u.attributes;for(const h in f)e.update(f[h],i.ARRAY_BUFFER)}function d(u){const f=[],h=u.index,g=u.attributes.position;let _=0;if(h!==null){const v=h.array;_=h.version;for(let y=0,M=v.length;y<M;y+=3){const x=v[y+0],T=v[y+1],b=v[y+2];f.push(x,T,T,b,b,x)}}else if(g!==void 0){const v=g.array;_=g.version;for(let y=0,M=v.length/3-1;y<M;y+=3){const x=y+0,T=y+1,b=y+2;f.push(x,T,T,b,b,x)}}else return;const m=new(cu(f)?pu:fu)(f,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function l(u){const f=r.get(u);if(f){const h=u.index;h!==null&&f.version<h.version&&d(u)}else d(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:l}}function F0(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,h){i.drawElements(n,h,r,f*o),t.update(h,n,1)}function d(f,h,g){g!==0&&(i.drawElementsInstanced(n,h,r,f*o,g),t.update(h,n,g))}function l(f,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=h[p];t.update(m,n,1)}function u(f,h,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)d(f[p]/o,h[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,r,f,0,_,0,g);let p=0;for(let v=0;v<g;v++)p+=h[v]*_[v];t.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=d,this.renderMultiDraw=l,this.renderMultiDrawInstances=u}function B0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function H0(i,e,t){const n=new WeakMap,s=new Lt;function r(o,a,c){const d=o.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=l!==void 0?l.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let S=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var h=S;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),m===!0&&(M=3);let x=a.attributes.position.count*M,T=1;x>e.maxTextureSize&&(T=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const b=new Float32Array(x*T*4*u),E=new du(b,x,T,u);E.type=di,E.needsUpdate=!0;const w=M*4;for(let R=0;R<u;R++){const P=p[R],D=v[R],G=y[R],$=x*T*4*R;for(let q=0;q<P.count;q++){const K=q*w;g===!0&&(s.fromBufferAttribute(P,q),b[$+K+0]=s.x,b[$+K+1]=s.y,b[$+K+2]=s.z,b[$+K+3]=0),_===!0&&(s.fromBufferAttribute(D,q),b[$+K+4]=s.x,b[$+K+5]=s.y,b[$+K+6]=s.z,b[$+K+7]=0),m===!0&&(s.fromBufferAttribute(G,q),b[$+K+8]=s.x,b[$+K+9]=s.y,b[$+K+10]=s.z,b[$+K+11]=G.itemSize===4?s.w:1)}}f={count:u,texture:E,size:new We(x,T)},n.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<d.length;m++)g+=d[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",d)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function z0(i,e,t,n){let s=new WeakMap;function r(c){const d=n.render.frame,l=c.geometry,u=e.get(c,l);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==d&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==d&&(f.update(),s.set(f,d))}return u}function o(){s=new WeakMap}function a(c){const d=c.target;d.removeEventListener("dispose",a),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:r,dispose:o}}const bu=new tn,$l=new Mu(1,1),Tu=new du,Eu=new mf,Au=new _u,Xl=[],ql=[],Yl=new Float32Array(16),Kl=new Float32Array(9),jl=new Float32Array(4);function js(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Xl[s];if(r===void 0&&(r=new Float32Array(s),Xl[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Gt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Po(i,e){let t=ql[e];t===void 0&&(t=new Int32Array(e),ql[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function G0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function V0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function W0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function $0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function X0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,n))return;jl.set(n),i.uniformMatrix2fv(this.addr,!1,jl),Vt(t,n)}}function q0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,n))return;Kl.set(n),i.uniformMatrix3fv(this.addr,!1,Kl),Vt(t,n)}}function Y0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,n))return;Yl.set(n),i.uniformMatrix4fv(this.addr,!1,Yl),Vt(t,n)}}function K0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function j0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function Z0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function J0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function Q0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function eg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function tg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function ng(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function ig(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?($l.compareFunction=au,r=$l):r=bu,t.setTexture2D(e||r,s)}function sg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Eu,s)}function rg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Au,s)}function og(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Tu,s)}function ag(i){switch(i){case 5126:return G0;case 35664:return V0;case 35665:return W0;case 35666:return $0;case 35674:return X0;case 35675:return q0;case 35676:return Y0;case 5124:case 35670:return K0;case 35667:case 35671:return j0;case 35668:case 35672:return Z0;case 35669:case 35673:return J0;case 5125:return Q0;case 36294:return eg;case 36295:return tg;case 36296:return ng;case 35678:case 36198:case 36298:case 36306:case 35682:return ig;case 35679:case 36299:case 36307:return sg;case 35680:case 36300:case 36308:case 36293:return rg;case 36289:case 36303:case 36311:case 36292:return og}}function cg(i,e){i.uniform1fv(this.addr,e)}function lg(i,e){const t=js(e,this.size,2);i.uniform2fv(this.addr,t)}function dg(i,e){const t=js(e,this.size,3);i.uniform3fv(this.addr,t)}function ug(i,e){const t=js(e,this.size,4);i.uniform4fv(this.addr,t)}function hg(i,e){const t=js(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function fg(i,e){const t=js(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function pg(i,e){const t=js(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function mg(i,e){i.uniform1iv(this.addr,e)}function gg(i,e){i.uniform2iv(this.addr,e)}function _g(i,e){i.uniform3iv(this.addr,e)}function vg(i,e){i.uniform4iv(this.addr,e)}function yg(i,e){i.uniform1uiv(this.addr,e)}function Mg(i,e){i.uniform2uiv(this.addr,e)}function wg(i,e){i.uniform3uiv(this.addr,e)}function Sg(i,e){i.uniform4uiv(this.addr,e)}function xg(i,e,t){const n=this.cache,s=e.length,r=Po(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||bu,r[o])}function bg(i,e,t){const n=this.cache,s=e.length,r=Po(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Eu,r[o])}function Tg(i,e,t){const n=this.cache,s=e.length,r=Po(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Au,r[o])}function Eg(i,e,t){const n=this.cache,s=e.length,r=Po(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Tu,r[o])}function Ag(i){switch(i){case 5126:return cg;case 35664:return lg;case 35665:return dg;case 35666:return ug;case 35674:return hg;case 35675:return fg;case 35676:return pg;case 5124:case 35670:return mg;case 35667:case 35671:return gg;case 35668:case 35672:return _g;case 35669:case 35673:return vg;case 5125:return yg;case 36294:return Mg;case 36295:return wg;case 36296:return Sg;case 35678:case 36198:case 36298:case 36306:case 35682:return xg;case 35679:case 36299:case 36307:return bg;case 35680:case 36300:case 36308:case 36293:return Tg;case 36289:case 36303:case 36311:case 36292:return Eg}}class Rg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ag(t.type)}}class Cg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ag(t.type)}}class Ig{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const pa=/(\w+)(\])?(\[|\.)?/g;function Zl(i,e){i.seq.push(e),i.map[e.id]=e}function Pg(i,e,t){const n=i.name,s=n.length;for(pa.lastIndex=0;;){const r=pa.exec(n),o=pa.lastIndex;let a=r[1];const c=r[2]==="]",d=r[3];if(c&&(a=a|0),d===void 0||d==="["&&o+2===s){Zl(t,d===void 0?new Rg(a,i,e):new Cg(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Ig(a),Zl(t,u)),t=u}}}class _o{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Pg(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Jl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Dg=37297;let Lg=0;function Ug(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Ql=new Ke;function kg(i){dt._getMatrix(Ql,dt.workingColorSpace,i);const e=`mat3( ${Ql.elements.map(t=>t.toFixed(4))} )`;switch(dt.getTransfer(i)){case yo:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ed(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Ug(i.getShaderSource(e),o)}else return s}function Ng(i,e){const t=kg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Og(i,e){let t;switch(e){case Eh:t="Linear";break;case Ah:t="Reinhard";break;case Rh:t="Cineon";break;case Ch:t="ACESFilmic";break;case Ph:t="AgX";break;case Rc:t="Neutral";break;case Ih:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const so=new k;function Fg(){dt.getLuminanceCoefficients(so);const i=so.x.toFixed(4),e=so.y.toFixed(4),t=so.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lr).join(`
`)}function Hg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function zg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function lr(i){return i!==""}function td(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function nd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Gg=/^[ \t]*#include +<([\w\d./]+)>/gm;function vc(i){return i.replace(Gg,Wg)}const Vg=new Map;function Wg(i,e){let t=Ze[e];if(t===void 0){const n=Vg.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return vc(t)}const $g=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function id(i){return i.replace($g,Xg)}function Xg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function qg(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Xd?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===qd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===si&&(e="SHADOWMAP_TYPE_VSM"),e}function Yg(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Os:case Fs:e="ENVMAP_TYPE_CUBE";break;case Ro:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Kg(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Fs:e="ENVMAP_MODE_REFRACTION";break}return e}function jg(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Yd:e="ENVMAP_BLENDING_MULTIPLY";break;case bh:e="ENVMAP_BLENDING_MIX";break;case Th:e="ENVMAP_BLENDING_ADD";break}return e}function Zg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Jg(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=qg(t),d=Yg(t),l=Kg(t),u=jg(t),f=Zg(t),h=Bg(t),g=Hg(r),_=s.createProgram();let m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(lr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(lr).join(`
`),p.length>0&&(p+=`
`)):(m=[sd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lr).join(`
`),p=[sd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ci?"#define TONE_MAPPING":"",t.toneMapping!==Ci?Ze.tonemapping_pars_fragment:"",t.toneMapping!==Ci?Og("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,Ng("linearToOutputTexel",t.outputColorSpace),Fg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(lr).join(`
`)),o=vc(o),o=td(o,t),o=nd(o,t),a=vc(a),a=td(a,t),a=nd(a,t),o=id(o),a=id(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===dl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===dl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=v+m+o,M=v+p+a,x=Jl(s,s.VERTEX_SHADER,y),T=Jl(s,s.FRAGMENT_SHADER,M);s.attachShader(_,x),s.attachShader(_,T),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function b(R){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(_).trim(),D=s.getShaderInfoLog(x).trim(),G=s.getShaderInfoLog(T).trim();let $=!0,q=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,x,T);else{const K=ed(s,x,"vertex"),V=ed(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+P+`
`+K+`
`+V)}else P!==""?console.warn("THREE.WebGLProgram: Program Info Log:",P):(D===""||G==="")&&(q=!1);q&&(R.diagnostics={runnable:$,programLog:P,vertexShader:{log:D,prefix:m},fragmentShader:{log:G,prefix:p}})}s.deleteShader(x),s.deleteShader(T),E=new _o(s,_),w=zg(s,_)}let E;this.getUniforms=function(){return E===void 0&&b(this),E};let w;this.getAttributes=function(){return w===void 0&&b(this),w};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,Dg)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Lg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=x,this.fragmentShader=T,this}let Qg=0;class e_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new t_(e),t.set(e,n)),n}}class t_{constructor(e){this.id=Qg++,this.code=e,this.usedTimes=0}}function n_(i,e,t,n,s,r,o){const a=new Oc,c=new e_,d=new Set,l=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let h=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(w){return d.add(w),w===0?"uv":`uv${w}`}function m(w,S,R,P,D){const G=P.fog,$=D.geometry,q=w.isMeshStandardMaterial?P.environment:null,K=(w.isMeshStandardMaterial?t:e).get(w.envMap||q),V=K&&K.mapping===Ro?K.image.height:null,le=g[w.type];w.precision!==null&&(h=s.getMaxPrecision(w.precision),h!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",h,"instead."));const H=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Z=H!==void 0?H.length:0;let ce=0;$.morphAttributes.position!==void 0&&(ce=1),$.morphAttributes.normal!==void 0&&(ce=2),$.morphAttributes.color!==void 0&&(ce=3);let me,O,j,ye;if(le){const mt=Xn[le];me=mt.vertexShader,O=mt.fragmentShader}else me=w.vertexShader,O=w.fragmentShader,c.update(w),j=c.getVertexShaderID(w),ye=c.getFragmentShaderID(w);const ue=i.getRenderTarget(),De=i.state.buffers.depth.getReversed(),Ie=D.isInstancedMesh===!0,Ne=D.isBatchedMesh===!0,ut=!!w.map,$e=!!w.matcap,ht=!!K,L=!!w.aoMap,nn=!!w.lightMap,nt=!!w.bumpMap,it=!!w.normalMap,Ue=!!w.displacementMap,St=!!w.emissiveMap,Le=!!w.metalnessMap,I=!!w.roughnessMap,A=w.anisotropy>0,z=w.clearcoat>0,ee=w.dispersion>0,ie=w.iridescence>0,Q=w.sheen>0,Pe=w.transmission>0,ve=A&&!!w.anisotropyMap,Te=z&&!!w.clearcoatMap,ot=z&&!!w.clearcoatNormalMap,ae=z&&!!w.clearcoatRoughnessMap,Ae=ie&&!!w.iridescenceMap,Fe=ie&&!!w.iridescenceThicknessMap,ze=Q&&!!w.sheenColorMap,Re=Q&&!!w.sheenRoughnessMap,st=!!w.specularMap,je=!!w.specularColorMap,yt=!!w.specularIntensityMap,N=Pe&&!!w.transmissionMap,ge=Pe&&!!w.thicknessMap,Y=!!w.gradientMap,te=!!w.alphaMap,Se=w.alphaTest>0,Me=!!w.alphaHash,Ye=!!w.extensions;let It=Ci;w.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(It=i.toneMapping);const Zt={shaderID:le,shaderType:w.type,shaderName:w.name,vertexShader:me,fragmentShader:O,defines:w.defines,customVertexShaderID:j,customFragmentShaderID:ye,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:h,batching:Ne,batchingColor:Ne&&D._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&D.instanceColor!==null,instancingMorph:Ie&&D.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ue===null?i.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:zs,alphaToCoverage:!!w.alphaToCoverage,map:ut,matcap:$e,envMap:ht,envMapMode:ht&&K.mapping,envMapCubeUVHeight:V,aoMap:L,lightMap:nn,bumpMap:nt,normalMap:it,displacementMap:f&&Ue,emissiveMap:St,normalMapObjectSpace:it&&w.normalMapType===kh,normalMapTangentSpace:it&&w.normalMapType===ou,metalnessMap:Le,roughnessMap:I,anisotropy:A,anisotropyMap:ve,clearcoat:z,clearcoatMap:Te,clearcoatNormalMap:ot,clearcoatRoughnessMap:ae,dispersion:ee,iridescence:ie,iridescenceMap:Ae,iridescenceThicknessMap:Fe,sheen:Q,sheenColorMap:ze,sheenRoughnessMap:Re,specularMap:st,specularColorMap:je,specularIntensityMap:yt,transmission:Pe,transmissionMap:N,thicknessMap:ge,gradientMap:Y,opaque:w.transparent===!1&&w.blending===As&&w.alphaToCoverage===!1,alphaMap:te,alphaTest:Se,alphaHash:Me,combine:w.combine,mapUv:ut&&_(w.map.channel),aoMapUv:L&&_(w.aoMap.channel),lightMapUv:nn&&_(w.lightMap.channel),bumpMapUv:nt&&_(w.bumpMap.channel),normalMapUv:it&&_(w.normalMap.channel),displacementMapUv:Ue&&_(w.displacementMap.channel),emissiveMapUv:St&&_(w.emissiveMap.channel),metalnessMapUv:Le&&_(w.metalnessMap.channel),roughnessMapUv:I&&_(w.roughnessMap.channel),anisotropyMapUv:ve&&_(w.anisotropyMap.channel),clearcoatMapUv:Te&&_(w.clearcoatMap.channel),clearcoatNormalMapUv:ot&&_(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&_(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&_(w.iridescenceMap.channel),iridescenceThicknessMapUv:Fe&&_(w.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&_(w.sheenColorMap.channel),sheenRoughnessMapUv:Re&&_(w.sheenRoughnessMap.channel),specularMapUv:st&&_(w.specularMap.channel),specularColorMapUv:je&&_(w.specularColorMap.channel),specularIntensityMapUv:yt&&_(w.specularIntensityMap.channel),transmissionMapUv:N&&_(w.transmissionMap.channel),thicknessMapUv:ge&&_(w.thicknessMap.channel),alphaMapUv:te&&_(w.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(it||A),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!$.attributes.uv&&(ut||te),fog:!!G,useFog:w.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:De,skinning:D.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:ce,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:It,decodeVideoTexture:ut&&w.map.isVideoTexture===!0&&dt.getTransfer(w.map.colorSpace)===vt,decodeVideoTextureEmissive:St&&w.emissiveMap.isVideoTexture===!0&&dt.getTransfer(w.emissiveMap.colorSpace)===vt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Ft,flipSided:w.side===hn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Ye&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ye&&w.extensions.multiDraw===!0||Ne)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Zt.vertexUv1s=d.has(1),Zt.vertexUv2s=d.has(2),Zt.vertexUv3s=d.has(3),d.clear(),Zt}function p(w){const S=[];if(w.shaderID?S.push(w.shaderID):(S.push(w.customVertexShaderID),S.push(w.customFragmentShaderID)),w.defines!==void 0)for(const R in w.defines)S.push(R),S.push(w.defines[R]);return w.isRawShaderMaterial===!1&&(v(S,w),y(S,w),S.push(i.outputColorSpace)),S.push(w.customProgramCacheKey),S.join()}function v(w,S){w.push(S.precision),w.push(S.outputColorSpace),w.push(S.envMapMode),w.push(S.envMapCubeUVHeight),w.push(S.mapUv),w.push(S.alphaMapUv),w.push(S.lightMapUv),w.push(S.aoMapUv),w.push(S.bumpMapUv),w.push(S.normalMapUv),w.push(S.displacementMapUv),w.push(S.emissiveMapUv),w.push(S.metalnessMapUv),w.push(S.roughnessMapUv),w.push(S.anisotropyMapUv),w.push(S.clearcoatMapUv),w.push(S.clearcoatNormalMapUv),w.push(S.clearcoatRoughnessMapUv),w.push(S.iridescenceMapUv),w.push(S.iridescenceThicknessMapUv),w.push(S.sheenColorMapUv),w.push(S.sheenRoughnessMapUv),w.push(S.specularMapUv),w.push(S.specularColorMapUv),w.push(S.specularIntensityMapUv),w.push(S.transmissionMapUv),w.push(S.thicknessMapUv),w.push(S.combine),w.push(S.fogExp2),w.push(S.sizeAttenuation),w.push(S.morphTargetsCount),w.push(S.morphAttributeCount),w.push(S.numDirLights),w.push(S.numPointLights),w.push(S.numSpotLights),w.push(S.numSpotLightMaps),w.push(S.numHemiLights),w.push(S.numRectAreaLights),w.push(S.numDirLightShadows),w.push(S.numPointLightShadows),w.push(S.numSpotLightShadows),w.push(S.numSpotLightShadowsWithMaps),w.push(S.numLightProbes),w.push(S.shadowMapType),w.push(S.toneMapping),w.push(S.numClippingPlanes),w.push(S.numClipIntersection),w.push(S.depthPacking)}function y(w,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),w.push(a.mask)}function M(w){const S=g[w.type];let R;if(S){const P=Xn[S];R=Af.clone(P.uniforms)}else R=w.uniforms;return R}function x(w,S){let R;for(let P=0,D=l.length;P<D;P++){const G=l[P];if(G.cacheKey===S){R=G,++R.usedTimes;break}}return R===void 0&&(R=new Jg(i,S,w,r),l.push(R)),R}function T(w){if(--w.usedTimes===0){const S=l.indexOf(w);l[S]=l[l.length-1],l.pop(),w.destroy()}}function b(w){c.remove(w)}function E(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:x,releaseProgram:T,releaseShaderCache:b,programs:l,dispose:E}}function i_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function s_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function rd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function od(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,f,h,g,_,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:f,material:h,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=h,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function a(u,f,h,g,_,m){const p=o(u,f,h,g,_,m);h.transmission>0?n.push(p):h.transparent===!0?s.push(p):t.push(p)}function c(u,f,h,g,_,m){const p=o(u,f,h,g,_,m);h.transmission>0?n.unshift(p):h.transparent===!0?s.unshift(p):t.unshift(p)}function d(u,f){t.length>1&&t.sort(u||s_),n.length>1&&n.sort(f||rd),s.length>1&&s.sort(f||rd)}function l(){for(let u=e,f=i.length;u<f;u++){const h=i[u];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:l,sort:d}}function r_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new od,i.set(n,[o])):s>=r.length?(o=new od,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function o_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new Be};break;case"SpotLight":t={position:new k,direction:new k,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new k,halfWidth:new k,halfHeight:new k};break}return i[e.id]=t,t}}}function a_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let c_=0;function l_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function d_(i){const e=new o_,t=a_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)n.probe.push(new k);const s=new k,r=new Rt,o=new Rt;function a(d){let l=0,u=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let h=0,g=0,_=0,m=0,p=0,v=0,y=0,M=0,x=0,T=0,b=0;d.sort(l_);for(let w=0,S=d.length;w<S;w++){const R=d[w],P=R.color,D=R.intensity,G=R.distance,$=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)l+=P.r*D,u+=P.g*D,f+=P.b*D;else if(R.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(R.sh.coefficients[q],D);b++}else if(R.isDirectionalLight){const q=e.get(R);if(q.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const K=R.shadow,V=t.get(R);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.directionalShadow[h]=V,n.directionalShadowMap[h]=$,n.directionalShadowMatrix[h]=R.shadow.matrix,v++}n.directional[h]=q,h++}else if(R.isSpotLight){const q=e.get(R);q.position.setFromMatrixPosition(R.matrixWorld),q.color.copy(P).multiplyScalar(D),q.distance=G,q.coneCos=Math.cos(R.angle),q.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),q.decay=R.decay,n.spot[_]=q;const K=R.shadow;if(R.map&&(n.spotLightMap[x]=R.map,x++,K.updateMatrices(R),R.castShadow&&T++),n.spotLightMatrix[_]=K.matrix,R.castShadow){const V=t.get(R);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=$,M++}_++}else if(R.isRectAreaLight){const q=e.get(R);q.color.copy(P).multiplyScalar(D),q.halfWidth.set(R.width*.5,0,0),q.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=q,m++}else if(R.isPointLight){const q=e.get(R);if(q.color.copy(R.color).multiplyScalar(R.intensity),q.distance=R.distance,q.decay=R.decay,R.castShadow){const K=R.shadow,V=t.get(R);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,V.shadowCameraNear=K.camera.near,V.shadowCameraFar=K.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=R.shadow.matrix,y++}n.point[g]=q,g++}else if(R.isHemisphereLight){const q=e.get(R);q.skyColor.copy(R.color).multiplyScalar(D),q.groundColor.copy(R.groundColor).multiplyScalar(D),n.hemi[p]=q,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=u,n.ambient[2]=f;const E=n.hash;(E.directionalLength!==h||E.pointLength!==g||E.spotLength!==_||E.rectAreaLength!==m||E.hemiLength!==p||E.numDirectionalShadows!==v||E.numPointShadows!==y||E.numSpotShadows!==M||E.numSpotMaps!==x||E.numLightProbes!==b)&&(n.directional.length=h,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=M+x-T,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=b,E.directionalLength=h,E.pointLength=g,E.spotLength=_,E.rectAreaLength=m,E.hemiLength=p,E.numDirectionalShadows=v,E.numPointShadows=y,E.numSpotShadows=M,E.numSpotMaps=x,E.numLightProbes=b,n.version=c_++)}function c(d,l){let u=0,f=0,h=0,g=0,_=0;const m=l.matrixWorldInverse;for(let p=0,v=d.length;p<v;p++){const y=d[p];if(y.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(y.isSpotLight){const M=n.spot[h];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),h++}else if(y.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function ad(i){const e=new d_(i),t=[],n=[];function s(l){d.camera=l,t.length=0,n.length=0}function r(l){t.push(l)}function o(l){n.push(l)}function a(){e.setup(t)}function c(l){e.setupView(t,l)}const d={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:d,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function u_(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new ad(i),e.set(s,[a])):r>=o.length?(a=new ad(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const h_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,f_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function p_(i,e,t){let n=new Fc;const s=new We,r=new We,o=new Lt,a=new kf({depthPacking:Uh}),c=new Nf,d={},l=t.maxTextureSize,u={[Ii]:hn,[hn]:Ii,[Ft]:Ft},f=new Pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:h_,fragmentShader:f_}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const g=new wn;g.setAttribute("position",new Gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new U(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xd;let p=this.type;this.render=function(T,b,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const w=i.getRenderTarget(),S=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),P=i.state;P.setBlending(Ri),P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const D=p!==si&&this.type===si,G=p===si&&this.type!==si;for(let $=0,q=T.length;$<q;$++){const K=T[$],V=K.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const le=V.getFrameExtents();if(s.multiply(le),r.copy(V.mapSize),(s.x>l||s.y>l)&&(s.x>l&&(r.x=Math.floor(l/le.x),s.x=r.x*le.x,V.mapSize.x=r.x),s.y>l&&(r.y=Math.floor(l/le.y),s.y=r.y*le.y,V.mapSize.y=r.y)),V.map===null||D===!0||G===!0){const Z=this.type!==si?{minFilter:zn,magFilter:zn}:{};V.map!==null&&V.map.dispose(),V.map=new Ji(s.x,s.y,Z),V.map.texture.name=K.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const H=V.getViewportCount();for(let Z=0;Z<H;Z++){const ce=V.getViewport(Z);o.set(r.x*ce.x,r.y*ce.y,r.x*ce.z,r.y*ce.w),P.viewport(o),V.updateMatrices(K,Z),n=V.getFrustum(),M(b,E,V.camera,K,this.type)}V.isPointLightShadow!==!0&&this.type===si&&v(V,E),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(w,S,R)};function v(T,b){const E=e.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ji(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(b,null,E,f,_,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(b,null,E,h,_,null)}function y(T,b,E,w){let S=null;const R=E.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)S=R;else if(S=E.isPointLight===!0?c:a,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const P=S.uuid,D=b.uuid;let G=d[P];G===void 0&&(G={},d[P]=G);let $=G[D];$===void 0&&($=S.clone(),G[D]=$,b.addEventListener("dispose",x)),S=$}if(S.visible=b.visible,S.wireframe=b.wireframe,w===si?S.side=b.shadowSide!==null?b.shadowSide:b.side:S.side=b.shadowSide!==null?b.shadowSide:u[b.side],S.alphaMap=b.alphaMap,S.alphaTest=b.alphaTest,S.map=b.map,S.clipShadows=b.clipShadows,S.clippingPlanes=b.clippingPlanes,S.clipIntersection=b.clipIntersection,S.displacementMap=b.displacementMap,S.displacementScale=b.displacementScale,S.displacementBias=b.displacementBias,S.wireframeLinewidth=b.wireframeLinewidth,S.linewidth=b.linewidth,E.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const P=i.properties.get(S);P.light=E}return S}function M(T,b,E,w,S){if(T.visible===!1)return;if(T.layers.test(b.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===si)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,T.matrixWorld);const D=e.update(T),G=T.material;if(Array.isArray(G)){const $=D.groups;for(let q=0,K=$.length;q<K;q++){const V=$[q],le=G[V.materialIndex];if(le&&le.visible){const H=y(T,le,w,S);T.onBeforeShadow(i,T,b,E,D,H,V),i.renderBufferDirect(E,null,D,H,T,V),T.onAfterShadow(i,T,b,E,D,H,V)}}}else if(G.visible){const $=y(T,G,w,S);T.onBeforeShadow(i,T,b,E,D,$,null),i.renderBufferDirect(E,null,D,$,T,null),T.onAfterShadow(i,T,b,E,D,$,null)}}const P=T.children;for(let D=0,G=P.length;D<G;D++)M(P[D],b,E,w,S)}function x(T){T.target.removeEventListener("dispose",x);for(const E in d){const w=d[E],S=T.target.uuid;S in w&&(w[S].dispose(),delete w[S])}}}const m_={[Da]:La,[Ua]:Oa,[ka]:Fa,[Ns]:Na,[La]:Da,[Oa]:Ua,[Fa]:ka,[Na]:Ns};function g_(i,e){function t(){let N=!1;const ge=new Lt;let Y=null;const te=new Lt(0,0,0,0);return{setMask:function(Se){Y!==Se&&!N&&(i.colorMask(Se,Se,Se,Se),Y=Se)},setLocked:function(Se){N=Se},setClear:function(Se,Me,Ye,It,Zt){Zt===!0&&(Se*=It,Me*=It,Ye*=It),ge.set(Se,Me,Ye,It),te.equals(ge)===!1&&(i.clearColor(Se,Me,Ye,It),te.copy(ge))},reset:function(){N=!1,Y=null,te.set(-1,0,0,0)}}}function n(){let N=!1,ge=!1,Y=null,te=null,Se=null;return{setReversed:function(Me){if(ge!==Me){const Ye=e.get("EXT_clip_control");ge?Ye.clipControlEXT(Ye.LOWER_LEFT_EXT,Ye.ZERO_TO_ONE_EXT):Ye.clipControlEXT(Ye.LOWER_LEFT_EXT,Ye.NEGATIVE_ONE_TO_ONE_EXT);const It=Se;Se=null,this.setClear(It)}ge=Me},getReversed:function(){return ge},setTest:function(Me){Me?ue(i.DEPTH_TEST):De(i.DEPTH_TEST)},setMask:function(Me){Y!==Me&&!N&&(i.depthMask(Me),Y=Me)},setFunc:function(Me){if(ge&&(Me=m_[Me]),te!==Me){switch(Me){case Da:i.depthFunc(i.NEVER);break;case La:i.depthFunc(i.ALWAYS);break;case Ua:i.depthFunc(i.LESS);break;case Ns:i.depthFunc(i.LEQUAL);break;case ka:i.depthFunc(i.EQUAL);break;case Na:i.depthFunc(i.GEQUAL);break;case Oa:i.depthFunc(i.GREATER);break;case Fa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}te=Me}},setLocked:function(Me){N=Me},setClear:function(Me){Se!==Me&&(ge&&(Me=1-Me),i.clearDepth(Me),Se=Me)},reset:function(){N=!1,Y=null,te=null,Se=null,ge=!1}}}function s(){let N=!1,ge=null,Y=null,te=null,Se=null,Me=null,Ye=null,It=null,Zt=null;return{setTest:function(mt){N||(mt?ue(i.STENCIL_TEST):De(i.STENCIL_TEST))},setMask:function(mt){ge!==mt&&!N&&(i.stencilMask(mt),ge=mt)},setFunc:function(mt,Dn,jn){(Y!==mt||te!==Dn||Se!==jn)&&(i.stencilFunc(mt,Dn,jn),Y=mt,te=Dn,Se=jn)},setOp:function(mt,Dn,jn){(Me!==mt||Ye!==Dn||It!==jn)&&(i.stencilOp(mt,Dn,jn),Me=mt,Ye=Dn,It=jn)},setLocked:function(mt){N=mt},setClear:function(mt){Zt!==mt&&(i.clearStencil(mt),Zt=mt)},reset:function(){N=!1,ge=null,Y=null,te=null,Se=null,Me=null,Ye=null,It=null,Zt=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,d=new WeakMap;let l={},u={},f=new WeakMap,h=[],g=null,_=!1,m=null,p=null,v=null,y=null,M=null,x=null,T=null,b=new Be(0,0,0),E=0,w=!1,S=null,R=null,P=null,D=null,G=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,K=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(V)[1]),q=K>=1):V.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),q=K>=2);let le=null,H={};const Z=i.getParameter(i.SCISSOR_BOX),ce=i.getParameter(i.VIEWPORT),me=new Lt().fromArray(Z),O=new Lt().fromArray(ce);function j(N,ge,Y,te){const Se=new Uint8Array(4),Me=i.createTexture();i.bindTexture(N,Me),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ye=0;Ye<Y;Ye++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ge,0,i.RGBA,1,1,te,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(ge+Ye,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return Me}const ye={};ye[i.TEXTURE_2D]=j(i.TEXTURE_2D,i.TEXTURE_2D,1),ye[i.TEXTURE_CUBE_MAP]=j(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ye[i.TEXTURE_2D_ARRAY]=j(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ye[i.TEXTURE_3D]=j(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ue(i.DEPTH_TEST),o.setFunc(Ns),nt(!1),it(ol),ue(i.CULL_FACE),L(Ri);function ue(N){l[N]!==!0&&(i.enable(N),l[N]=!0)}function De(N){l[N]!==!1&&(i.disable(N),l[N]=!1)}function Ie(N,ge){return u[N]!==ge?(i.bindFramebuffer(N,ge),u[N]=ge,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ge),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ge),!0):!1}function Ne(N,ge){let Y=h,te=!1;if(N){Y=f.get(ge),Y===void 0&&(Y=[],f.set(ge,Y));const Se=N.textures;if(Y.length!==Se.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let Me=0,Ye=Se.length;Me<Ye;Me++)Y[Me]=i.COLOR_ATTACHMENT0+Me;Y.length=Se.length,te=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,te=!0);te&&i.drawBuffers(Y)}function ut(N){return g!==N?(i.useProgram(N),g=N,!0):!1}const $e={[Wi]:i.FUNC_ADD,[ah]:i.FUNC_SUBTRACT,[ch]:i.FUNC_REVERSE_SUBTRACT};$e[lh]=i.MIN,$e[dh]=i.MAX;const ht={[uh]:i.ZERO,[hh]:i.ONE,[fh]:i.SRC_COLOR,[Ia]:i.SRC_ALPHA,[yh]:i.SRC_ALPHA_SATURATE,[_h]:i.DST_COLOR,[mh]:i.DST_ALPHA,[ph]:i.ONE_MINUS_SRC_COLOR,[Pa]:i.ONE_MINUS_SRC_ALPHA,[vh]:i.ONE_MINUS_DST_COLOR,[gh]:i.ONE_MINUS_DST_ALPHA,[Mh]:i.CONSTANT_COLOR,[wh]:i.ONE_MINUS_CONSTANT_COLOR,[Sh]:i.CONSTANT_ALPHA,[xh]:i.ONE_MINUS_CONSTANT_ALPHA};function L(N,ge,Y,te,Se,Me,Ye,It,Zt,mt){if(N===Ri){_===!0&&(De(i.BLEND),_=!1);return}if(_===!1&&(ue(i.BLEND),_=!0),N!==oh){if(N!==m||mt!==w){if((p!==Wi||M!==Wi)&&(i.blendEquation(i.FUNC_ADD),p=Wi,M=Wi),mt)switch(N){case As:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ca:i.blendFunc(i.ONE,i.ONE);break;case al:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case cl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case As:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ca:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case al:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case cl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}v=null,y=null,x=null,T=null,b.set(0,0,0),E=0,m=N,w=mt}return}Se=Se||ge,Me=Me||Y,Ye=Ye||te,(ge!==p||Se!==M)&&(i.blendEquationSeparate($e[ge],$e[Se]),p=ge,M=Se),(Y!==v||te!==y||Me!==x||Ye!==T)&&(i.blendFuncSeparate(ht[Y],ht[te],ht[Me],ht[Ye]),v=Y,y=te,x=Me,T=Ye),(It.equals(b)===!1||Zt!==E)&&(i.blendColor(It.r,It.g,It.b,Zt),b.copy(It),E=Zt),m=N,w=!1}function nn(N,ge){N.side===Ft?De(i.CULL_FACE):ue(i.CULL_FACE);let Y=N.side===hn;ge&&(Y=!Y),nt(Y),N.blending===As&&N.transparent===!1?L(Ri):L(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);const te=N.stencilWrite;a.setTest(te),te&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),St(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ue(i.SAMPLE_ALPHA_TO_COVERAGE):De(i.SAMPLE_ALPHA_TO_COVERAGE)}function nt(N){S!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),S=N)}function it(N){N!==sh?(ue(i.CULL_FACE),N!==R&&(N===ol?i.cullFace(i.BACK):N===rh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):De(i.CULL_FACE),R=N}function Ue(N){N!==P&&(q&&i.lineWidth(N),P=N)}function St(N,ge,Y){N?(ue(i.POLYGON_OFFSET_FILL),(D!==ge||G!==Y)&&(i.polygonOffset(ge,Y),D=ge,G=Y)):De(i.POLYGON_OFFSET_FILL)}function Le(N){N?ue(i.SCISSOR_TEST):De(i.SCISSOR_TEST)}function I(N){N===void 0&&(N=i.TEXTURE0+$-1),le!==N&&(i.activeTexture(N),le=N)}function A(N,ge,Y){Y===void 0&&(le===null?Y=i.TEXTURE0+$-1:Y=le);let te=H[Y];te===void 0&&(te={type:void 0,texture:void 0},H[Y]=te),(te.type!==N||te.texture!==ge)&&(le!==Y&&(i.activeTexture(Y),le=Y),i.bindTexture(N,ge||ye[N]),te.type=N,te.texture=ge)}function z(){const N=H[le];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function ee(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ie(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pe(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ve(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Te(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ot(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ae(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ae(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Fe(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ze(N){me.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),me.copy(N))}function Re(N){O.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),O.copy(N))}function st(N,ge){let Y=d.get(ge);Y===void 0&&(Y=new WeakMap,d.set(ge,Y));let te=Y.get(N);te===void 0&&(te=i.getUniformBlockIndex(ge,N.name),Y.set(N,te))}function je(N,ge){const te=d.get(ge).get(N);c.get(ge)!==te&&(i.uniformBlockBinding(ge,te,N.__bindingPointIndex),c.set(ge,te))}function yt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},le=null,H={},u={},f=new WeakMap,h=[],g=null,_=!1,m=null,p=null,v=null,y=null,M=null,x=null,T=null,b=new Be(0,0,0),E=0,w=!1,S=null,R=null,P=null,D=null,G=null,me.set(0,0,i.canvas.width,i.canvas.height),O.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ue,disable:De,bindFramebuffer:Ie,drawBuffers:Ne,useProgram:ut,setBlending:L,setMaterial:nn,setFlipSided:nt,setCullFace:it,setLineWidth:Ue,setPolygonOffset:St,setScissorTest:Le,activeTexture:I,bindTexture:A,unbindTexture:z,compressedTexImage2D:ee,compressedTexImage3D:ie,texImage2D:Ae,texImage3D:Fe,updateUBOMapping:st,uniformBlockBinding:je,texStorage2D:ot,texStorage3D:ae,texSubImage2D:Q,texSubImage3D:Pe,compressedTexSubImage2D:ve,compressedTexSubImage3D:Te,scissor:ze,viewport:Re,reset:yt}}function __(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new We,l=new WeakMap;let u;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,A){return h?new OffscreenCanvas(I,A):Sr("canvas")}function _(I,A,z){let ee=1;const ie=Le(I);if((ie.width>z||ie.height>z)&&(ee=z/Math.max(ie.width,ie.height)),ee<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const Q=Math.floor(ee*ie.width),Pe=Math.floor(ee*ie.height);u===void 0&&(u=g(Q,Pe));const ve=A?g(Q,Pe):u;return ve.width=Q,ve.height=Pe,ve.getContext("2d").drawImage(I,0,0,Q,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+Q+"x"+Pe+")."),ve}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function v(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(I,A,z,ee,ie=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Q=A;if(A===i.RED&&(z===i.FLOAT&&(Q=i.R32F),z===i.HALF_FLOAT&&(Q=i.R16F),z===i.UNSIGNED_BYTE&&(Q=i.R8)),A===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(Q=i.R8UI),z===i.UNSIGNED_SHORT&&(Q=i.R16UI),z===i.UNSIGNED_INT&&(Q=i.R32UI),z===i.BYTE&&(Q=i.R8I),z===i.SHORT&&(Q=i.R16I),z===i.INT&&(Q=i.R32I)),A===i.RG&&(z===i.FLOAT&&(Q=i.RG32F),z===i.HALF_FLOAT&&(Q=i.RG16F),z===i.UNSIGNED_BYTE&&(Q=i.RG8)),A===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(Q=i.RG8UI),z===i.UNSIGNED_SHORT&&(Q=i.RG16UI),z===i.UNSIGNED_INT&&(Q=i.RG32UI),z===i.BYTE&&(Q=i.RG8I),z===i.SHORT&&(Q=i.RG16I),z===i.INT&&(Q=i.RG32I)),A===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),z===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),z===i.UNSIGNED_INT&&(Q=i.RGB32UI),z===i.BYTE&&(Q=i.RGB8I),z===i.SHORT&&(Q=i.RGB16I),z===i.INT&&(Q=i.RGB32I)),A===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),z===i.UNSIGNED_INT&&(Q=i.RGBA32UI),z===i.BYTE&&(Q=i.RGBA8I),z===i.SHORT&&(Q=i.RGBA16I),z===i.INT&&(Q=i.RGBA32I)),A===i.RGB&&z===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),A===i.RGBA){const Pe=ie?yo:dt.getTransfer(ee);z===i.FLOAT&&(Q=i.RGBA32F),z===i.HALF_FLOAT&&(Q=i.RGBA16F),z===i.UNSIGNED_BYTE&&(Q=Pe===vt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function M(I,A){let z;return I?A===null||A===Zi||A===Bs?z=i.DEPTH24_STENCIL8:A===di?z=i.DEPTH32F_STENCIL8:A===Mr&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Zi||A===Bs?z=i.DEPTH_COMPONENT24:A===di?z=i.DEPTH_COMPONENT32F:A===Mr&&(z=i.DEPTH_COMPONENT16),z}function x(I,A){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==zn&&I.minFilter!==In?Math.log2(Math.max(A.width,A.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?A.mipmaps.length:1}function T(I){const A=I.target;A.removeEventListener("dispose",T),E(A),A.isVideoTexture&&l.delete(A)}function b(I){const A=I.target;A.removeEventListener("dispose",b),S(A)}function E(I){const A=n.get(I);if(A.__webglInit===void 0)return;const z=I.source,ee=f.get(z);if(ee){const ie=ee[A.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&w(I),Object.keys(ee).length===0&&f.delete(z)}n.remove(I)}function w(I){const A=n.get(I);i.deleteTexture(A.__webglTexture);const z=I.source,ee=f.get(z);delete ee[A.__cacheKey],o.memory.textures--}function S(I){const A=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(A.__webglFramebuffer[ee]))for(let ie=0;ie<A.__webglFramebuffer[ee].length;ie++)i.deleteFramebuffer(A.__webglFramebuffer[ee][ie]);else i.deleteFramebuffer(A.__webglFramebuffer[ee]);A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer[ee])}else{if(Array.isArray(A.__webglFramebuffer))for(let ee=0;ee<A.__webglFramebuffer.length;ee++)i.deleteFramebuffer(A.__webglFramebuffer[ee]);else i.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&i.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let ee=0;ee<A.__webglColorRenderbuffer.length;ee++)A.__webglColorRenderbuffer[ee]&&i.deleteRenderbuffer(A.__webglColorRenderbuffer[ee]);A.__webglDepthRenderbuffer&&i.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const z=I.textures;for(let ee=0,ie=z.length;ee<ie;ee++){const Q=n.get(z[ee]);Q.__webglTexture&&(i.deleteTexture(Q.__webglTexture),o.memory.textures--),n.remove(z[ee])}n.remove(I)}let R=0;function P(){R=0}function D(){const I=R;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),R+=1,I}function G(I){const A=[];return A.push(I.wrapS),A.push(I.wrapT),A.push(I.wrapR||0),A.push(I.magFilter),A.push(I.minFilter),A.push(I.anisotropy),A.push(I.internalFormat),A.push(I.format),A.push(I.type),A.push(I.generateMipmaps),A.push(I.premultiplyAlpha),A.push(I.flipY),A.push(I.unpackAlignment),A.push(I.colorSpace),A.join()}function $(I,A){const z=n.get(I);if(I.isVideoTexture&&Ue(I),I.isRenderTargetTexture===!1&&I.version>0&&z.__version!==I.version){const ee=I.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{O(z,I,A);return}}t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+A)}function q(I,A){const z=n.get(I);if(I.version>0&&z.__version!==I.version){O(z,I,A);return}t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+A)}function K(I,A){const z=n.get(I);if(I.version>0&&z.__version!==I.version){O(z,I,A);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+A)}function V(I,A){const z=n.get(I);if(I.version>0&&z.__version!==I.version){j(z,I,A);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+A)}const le={[yr]:i.REPEAT,[Yi]:i.CLAMP_TO_EDGE,[za]:i.MIRRORED_REPEAT},H={[zn]:i.NEAREST,[Dh]:i.NEAREST_MIPMAP_NEAREST,[kr]:i.NEAREST_MIPMAP_LINEAR,[In]:i.LINEAR,[Ho]:i.LINEAR_MIPMAP_NEAREST,[li]:i.LINEAR_MIPMAP_LINEAR},Z={[Nh]:i.NEVER,[Gh]:i.ALWAYS,[Oh]:i.LESS,[au]:i.LEQUAL,[Fh]:i.EQUAL,[zh]:i.GEQUAL,[Bh]:i.GREATER,[Hh]:i.NOTEQUAL};function ce(I,A){if(A.type===di&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===In||A.magFilter===Ho||A.magFilter===kr||A.magFilter===li||A.minFilter===In||A.minFilter===Ho||A.minFilter===kr||A.minFilter===li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,le[A.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,le[A.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,le[A.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,H[A.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,H[A.minFilter]),A.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,Z[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===zn||A.minFilter!==kr&&A.minFilter!==li||A.type===di&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function me(I,A){let z=!1;I.__webglInit===void 0&&(I.__webglInit=!0,A.addEventListener("dispose",T));const ee=A.source;let ie=f.get(ee);ie===void 0&&(ie={},f.set(ee,ie));const Q=G(A);if(Q!==I.__cacheKey){ie[Q]===void 0&&(ie[Q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),ie[Q].usedTimes++;const Pe=ie[I.__cacheKey];Pe!==void 0&&(ie[I.__cacheKey].usedTimes--,Pe.usedTimes===0&&w(A)),I.__cacheKey=Q,I.__webglTexture=ie[Q].texture}return z}function O(I,A,z){let ee=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ee=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ee=i.TEXTURE_3D);const ie=me(I,A),Q=A.source;t.bindTexture(ee,I.__webglTexture,i.TEXTURE0+z);const Pe=n.get(Q);if(Q.version!==Pe.__version||ie===!0){t.activeTexture(i.TEXTURE0+z);const ve=dt.getPrimaries(dt.workingColorSpace),Te=A.colorSpace===ci?null:dt.getPrimaries(A.colorSpace),ot=A.colorSpace===ci||ve===Te?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot);let ae=_(A.image,!1,s.maxTextureSize);ae=St(A,ae);const Ae=r.convert(A.format,A.colorSpace),Fe=r.convert(A.type);let ze=y(A.internalFormat,Ae,Fe,A.colorSpace,A.isVideoTexture);ce(ee,A);let Re;const st=A.mipmaps,je=A.isVideoTexture!==!0,yt=Pe.__version===void 0||ie===!0,N=Q.dataReady,ge=x(A,ae);if(A.isDepthTexture)ze=M(A.format===Hs,A.type),yt&&(je?t.texStorage2D(i.TEXTURE_2D,1,ze,ae.width,ae.height):t.texImage2D(i.TEXTURE_2D,0,ze,ae.width,ae.height,0,Ae,Fe,null));else if(A.isDataTexture)if(st.length>0){je&&yt&&t.texStorage2D(i.TEXTURE_2D,ge,ze,st[0].width,st[0].height);for(let Y=0,te=st.length;Y<te;Y++)Re=st[Y],je?N&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,Re.width,Re.height,Ae,Fe,Re.data):t.texImage2D(i.TEXTURE_2D,Y,ze,Re.width,Re.height,0,Ae,Fe,Re.data);A.generateMipmaps=!1}else je?(yt&&t.texStorage2D(i.TEXTURE_2D,ge,ze,ae.width,ae.height),N&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ae.width,ae.height,Ae,Fe,ae.data)):t.texImage2D(i.TEXTURE_2D,0,ze,ae.width,ae.height,0,Ae,Fe,ae.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){je&&yt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,ze,st[0].width,st[0].height,ae.depth);for(let Y=0,te=st.length;Y<te;Y++)if(Re=st[Y],A.format!==Hn)if(Ae!==null)if(je){if(N)if(A.layerUpdates.size>0){const Se=Ol(Re.width,Re.height,A.format,A.type);for(const Me of A.layerUpdates){const Ye=Re.data.subarray(Me*Se/Re.data.BYTES_PER_ELEMENT,(Me+1)*Se/Re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,Me,Re.width,Re.height,1,Ae,Ye)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,Re.width,Re.height,ae.depth,Ae,Re.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,ze,Re.width,Re.height,ae.depth,0,Re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?N&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,Re.width,Re.height,ae.depth,Ae,Fe,Re.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Y,ze,Re.width,Re.height,ae.depth,0,Ae,Fe,Re.data)}else{je&&yt&&t.texStorage2D(i.TEXTURE_2D,ge,ze,st[0].width,st[0].height);for(let Y=0,te=st.length;Y<te;Y++)Re=st[Y],A.format!==Hn?Ae!==null?je?N&&t.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,Re.width,Re.height,Ae,Re.data):t.compressedTexImage2D(i.TEXTURE_2D,Y,ze,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?N&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,Re.width,Re.height,Ae,Fe,Re.data):t.texImage2D(i.TEXTURE_2D,Y,ze,Re.width,Re.height,0,Ae,Fe,Re.data)}else if(A.isDataArrayTexture)if(je){if(yt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,ze,ae.width,ae.height,ae.depth),N)if(A.layerUpdates.size>0){const Y=Ol(ae.width,ae.height,A.format,A.type);for(const te of A.layerUpdates){const Se=ae.data.subarray(te*Y/ae.data.BYTES_PER_ELEMENT,(te+1)*Y/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,te,ae.width,ae.height,1,Ae,Fe,Se)}A.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,Ae,Fe,ae.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ze,ae.width,ae.height,ae.depth,0,Ae,Fe,ae.data);else if(A.isData3DTexture)je?(yt&&t.texStorage3D(i.TEXTURE_3D,ge,ze,ae.width,ae.height,ae.depth),N&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,Ae,Fe,ae.data)):t.texImage3D(i.TEXTURE_3D,0,ze,ae.width,ae.height,ae.depth,0,Ae,Fe,ae.data);else if(A.isFramebufferTexture){if(yt)if(je)t.texStorage2D(i.TEXTURE_2D,ge,ze,ae.width,ae.height);else{let Y=ae.width,te=ae.height;for(let Se=0;Se<ge;Se++)t.texImage2D(i.TEXTURE_2D,Se,ze,Y,te,0,Ae,Fe,null),Y>>=1,te>>=1}}else if(st.length>0){if(je&&yt){const Y=Le(st[0]);t.texStorage2D(i.TEXTURE_2D,ge,ze,Y.width,Y.height)}for(let Y=0,te=st.length;Y<te;Y++)Re=st[Y],je?N&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,Ae,Fe,Re):t.texImage2D(i.TEXTURE_2D,Y,ze,Ae,Fe,Re);A.generateMipmaps=!1}else if(je){if(yt){const Y=Le(ae);t.texStorage2D(i.TEXTURE_2D,ge,ze,Y.width,Y.height)}N&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ae,Fe,ae)}else t.texImage2D(i.TEXTURE_2D,0,ze,Ae,Fe,ae);m(A)&&p(ee),Pe.__version=Q.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function j(I,A,z){if(A.image.length!==6)return;const ee=me(I,A),ie=A.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+z);const Q=n.get(ie);if(ie.version!==Q.__version||ee===!0){t.activeTexture(i.TEXTURE0+z);const Pe=dt.getPrimaries(dt.workingColorSpace),ve=A.colorSpace===ci?null:dt.getPrimaries(A.colorSpace),Te=A.colorSpace===ci||Pe===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const ot=A.isCompressedTexture||A.image[0].isCompressedTexture,ae=A.image[0]&&A.image[0].isDataTexture,Ae=[];for(let te=0;te<6;te++)!ot&&!ae?Ae[te]=_(A.image[te],!0,s.maxCubemapSize):Ae[te]=ae?A.image[te].image:A.image[te],Ae[te]=St(A,Ae[te]);const Fe=Ae[0],ze=r.convert(A.format,A.colorSpace),Re=r.convert(A.type),st=y(A.internalFormat,ze,Re,A.colorSpace),je=A.isVideoTexture!==!0,yt=Q.__version===void 0||ee===!0,N=ie.dataReady;let ge=x(A,Fe);ce(i.TEXTURE_CUBE_MAP,A);let Y;if(ot){je&&yt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,st,Fe.width,Fe.height);for(let te=0;te<6;te++){Y=Ae[te].mipmaps;for(let Se=0;Se<Y.length;Se++){const Me=Y[Se];A.format!==Hn?ze!==null?je?N&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se,0,0,Me.width,Me.height,ze,Me.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se,st,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):je?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se,0,0,Me.width,Me.height,ze,Re,Me.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se,st,Me.width,Me.height,0,ze,Re,Me.data)}}}else{if(Y=A.mipmaps,je&&yt){Y.length>0&&ge++;const te=Le(Ae[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,st,te.width,te.height)}for(let te=0;te<6;te++)if(ae){je?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ae[te].width,Ae[te].height,ze,Re,Ae[te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,st,Ae[te].width,Ae[te].height,0,ze,Re,Ae[te].data);for(let Se=0;Se<Y.length;Se++){const Ye=Y[Se].image[te].image;je?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se+1,0,0,Ye.width,Ye.height,ze,Re,Ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se+1,st,Ye.width,Ye.height,0,ze,Re,Ye.data)}}else{je?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ze,Re,Ae[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,st,ze,Re,Ae[te]);for(let Se=0;Se<Y.length;Se++){const Me=Y[Se];je?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se+1,0,0,ze,Re,Me.image[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se+1,st,ze,Re,Me.image[te])}}}m(A)&&p(i.TEXTURE_CUBE_MAP),Q.__version=ie.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function ye(I,A,z,ee,ie,Q){const Pe=r.convert(z.format,z.colorSpace),ve=r.convert(z.type),Te=y(z.internalFormat,Pe,ve,z.colorSpace),ot=n.get(A),ae=n.get(z);if(ae.__renderTarget=A,!ot.__hasExternalTextures){const Ae=Math.max(1,A.width>>Q),Fe=Math.max(1,A.height>>Q);ie===i.TEXTURE_3D||ie===i.TEXTURE_2D_ARRAY?t.texImage3D(ie,Q,Te,Ae,Fe,A.depth,0,Pe,ve,null):t.texImage2D(ie,Q,Te,Ae,Fe,0,Pe,ve,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),it(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,ie,ae.__webglTexture,0,nt(A)):(ie===i.TEXTURE_2D||ie>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ee,ie,ae.__webglTexture,Q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ue(I,A,z){if(i.bindRenderbuffer(i.RENDERBUFFER,I),A.depthBuffer){const ee=A.depthTexture,ie=ee&&ee.isDepthTexture?ee.type:null,Q=M(A.stencilBuffer,ie),Pe=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=nt(A);it(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ve,Q,A.width,A.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ve,Q,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,Q,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pe,i.RENDERBUFFER,I)}else{const ee=A.textures;for(let ie=0;ie<ee.length;ie++){const Q=ee[ie],Pe=r.convert(Q.format,Q.colorSpace),ve=r.convert(Q.type),Te=y(Q.internalFormat,Pe,ve,Q.colorSpace),ot=nt(A);z&&it(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot,Te,A.width,A.height):it(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot,Te,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,Te,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function De(I,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=n.get(A.depthTexture);ee.__renderTarget=A,(!ee.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),$(A.depthTexture,0);const ie=ee.__webglTexture,Q=nt(A);if(A.depthTexture.format===Rs)it(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0);else if(A.depthTexture.format===Hs)it(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function Ie(I){const A=n.get(I),z=I.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==I.depthTexture){const ee=I.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),ee){const ie=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,ee.removeEventListener("dispose",ie)};ee.addEventListener("dispose",ie),A.__depthDisposeCallback=ie}A.__boundDepthTexture=ee}if(I.depthTexture&&!A.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");De(A.__webglFramebuffer,I)}else if(z){A.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[ee]),A.__webglDepthbuffer[ee]===void 0)A.__webglDepthbuffer[ee]=i.createRenderbuffer(),ue(A.__webglDepthbuffer[ee],I,!1);else{const ie=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=A.__webglDepthbuffer[ee];i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,Q)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=i.createRenderbuffer(),ue(A.__webglDepthbuffer,I,!1);else{const ee=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=A.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,ie)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ne(I,A,z){const ee=n.get(I);A!==void 0&&ye(ee.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Ie(I)}function ut(I){const A=I.texture,z=n.get(I),ee=n.get(A);I.addEventListener("dispose",b);const ie=I.textures,Q=I.isWebGLCubeRenderTarget===!0,Pe=ie.length>1;if(Pe||(ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture()),ee.__version=A.version,o.memory.textures++),Q){z.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(A.mipmaps&&A.mipmaps.length>0){z.__webglFramebuffer[ve]=[];for(let Te=0;Te<A.mipmaps.length;Te++)z.__webglFramebuffer[ve][Te]=i.createFramebuffer()}else z.__webglFramebuffer[ve]=i.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){z.__webglFramebuffer=[];for(let ve=0;ve<A.mipmaps.length;ve++)z.__webglFramebuffer[ve]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(Pe)for(let ve=0,Te=ie.length;ve<Te;ve++){const ot=n.get(ie[ve]);ot.__webglTexture===void 0&&(ot.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&it(I)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ve=0;ve<ie.length;ve++){const Te=ie[ve];z.__webglColorRenderbuffer[ve]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[ve]);const ot=r.convert(Te.format,Te.colorSpace),ae=r.convert(Te.type),Ae=y(Te.internalFormat,ot,ae,Te.colorSpace,I.isXRRenderTarget===!0),Fe=nt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Fe,Ae,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,z.__webglColorRenderbuffer[ve])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),ue(z.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Q){t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture),ce(i.TEXTURE_CUBE_MAP,A);for(let ve=0;ve<6;ve++)if(A.mipmaps&&A.mipmaps.length>0)for(let Te=0;Te<A.mipmaps.length;Te++)ye(z.__webglFramebuffer[ve][Te],I,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Te);else ye(z.__webglFramebuffer[ve],I,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);m(A)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let ve=0,Te=ie.length;ve<Te;ve++){const ot=ie[ve],ae=n.get(ot);t.bindTexture(i.TEXTURE_2D,ae.__webglTexture),ce(i.TEXTURE_2D,ot),ye(z.__webglFramebuffer,I,ot,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,0),m(ot)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let ve=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ve=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,ee.__webglTexture),ce(ve,A),A.mipmaps&&A.mipmaps.length>0)for(let Te=0;Te<A.mipmaps.length;Te++)ye(z.__webglFramebuffer[Te],I,A,i.COLOR_ATTACHMENT0,ve,Te);else ye(z.__webglFramebuffer,I,A,i.COLOR_ATTACHMENT0,ve,0);m(A)&&p(ve),t.unbindTexture()}I.depthBuffer&&Ie(I)}function $e(I){const A=I.textures;for(let z=0,ee=A.length;z<ee;z++){const ie=A[z];if(m(ie)){const Q=v(I),Pe=n.get(ie).__webglTexture;t.bindTexture(Q,Pe),p(Q),t.unbindTexture()}}}const ht=[],L=[];function nn(I){if(I.samples>0){if(it(I)===!1){const A=I.textures,z=I.width,ee=I.height;let ie=i.COLOR_BUFFER_BIT;const Q=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pe=n.get(I),ve=A.length>1;if(ve)for(let Te=0;Te<A.length;Te++)t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let Te=0;Te<A.length;Te++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ie|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ie|=i.STENCIL_BUFFER_BIT)),ve){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[Te]);const ot=n.get(A[Te]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ot,0)}i.blitFramebuffer(0,0,z,ee,0,0,z,ee,ie,i.NEAREST),c===!0&&(ht.length=0,L.length=0,ht.push(i.COLOR_ATTACHMENT0+Te),I.depthBuffer&&I.resolveDepthBuffer===!1&&(ht.push(Q),L.push(Q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,L)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ht))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ve)for(let Te=0;Te<A.length;Te++){t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[Te]);const ot=n.get(A[Te]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,ot,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){const A=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[A])}}}function nt(I){return Math.min(s.maxSamples,I.samples)}function it(I){const A=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Ue(I){const A=o.render.frame;l.get(I)!==A&&(l.set(I,A),I.update())}function St(I,A){const z=I.colorSpace,ee=I.format,ie=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||z!==zs&&z!==ci&&(dt.getTransfer(z)===vt?(ee!==Hn||ie!==gi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),A}function Le(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(d.width=I.naturalWidth||I.width,d.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(d.width=I.displayWidth,d.height=I.displayHeight):(d.width=I.width,d.height=I.height),d}this.allocateTextureUnit=D,this.resetTextureUnits=P,this.setTexture2D=$,this.setTexture2DArray=q,this.setTexture3D=K,this.setTextureCube=V,this.rebindTextures=Ne,this.setupRenderTarget=ut,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=nn,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=it}function v_(i,e){function t(n,s=ci){let r;const o=dt.getTransfer(s);if(n===gi)return i.UNSIGNED_BYTE;if(n===Ic)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Pc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Jd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===jd)return i.BYTE;if(n===Zd)return i.SHORT;if(n===Mr)return i.UNSIGNED_SHORT;if(n===Cc)return i.INT;if(n===Zi)return i.UNSIGNED_INT;if(n===di)return i.FLOAT;if(n===Rr)return i.HALF_FLOAT;if(n===Qd)return i.ALPHA;if(n===eu)return i.RGB;if(n===Hn)return i.RGBA;if(n===tu)return i.LUMINANCE;if(n===nu)return i.LUMINANCE_ALPHA;if(n===Rs)return i.DEPTH_COMPONENT;if(n===Hs)return i.DEPTH_STENCIL;if(n===iu)return i.RED;if(n===Dc)return i.RED_INTEGER;if(n===su)return i.RG;if(n===Lc)return i.RG_INTEGER;if(n===Uc)return i.RGBA_INTEGER;if(n===ho||n===fo||n===po||n===mo)if(o===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ho)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ho)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===po)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ga||n===Va||n===Wa||n===$a)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ga)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Va)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===$a)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Xa||n===qa||n===Ya)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Xa||n===qa)return o===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ya)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ka||n===ja||n===Za||n===Ja||n===Qa||n===ec||n===tc||n===nc||n===ic||n===sc||n===rc||n===oc||n===ac||n===cc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ka)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ja)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Za)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ja)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Qa)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ec)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===tc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===nc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ic)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===rc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===oc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ac)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===cc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===go||n===lc||n===dc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===go)return o===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===lc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===dc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ru||n===uc||n===hc||n===fc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===go)return r.COMPRESSED_RED_RGTC1_EXT;if(n===uc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===hc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===fc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Bs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const y_={type:"move"};class ma{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(d,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const l=d.joints["index-finger-tip"],u=d.joints["thumb-tip"],f=l.position.distanceTo(u.position),h=.02,g=.005;d.inputState.pinching&&f>h+g?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&f<=h-g&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(y_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),d!==null&&(d.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Je;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const M_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,w_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class S_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new tn,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Pi({vertexShader:M_,fragmentShader:w_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new U(new Ir(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class x_ extends qs{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,d=null,l=null,u=null,f=null,h=null,g=null;const _=new S_,m=t.getContextAttributes();let p=null,v=null;const y=[],M=[],x=new We;let T=null;const b=new Fn;b.viewport=new Lt;const E=new Fn;E.viewport=new Lt;const w=[b,E],S=new Vf;let R=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let j=y[O];return j===void 0&&(j=new ma,y[O]=j),j.getTargetRaySpace()},this.getControllerGrip=function(O){let j=y[O];return j===void 0&&(j=new ma,y[O]=j),j.getGripSpace()},this.getHand=function(O){let j=y[O];return j===void 0&&(j=new ma,y[O]=j),j.getHandSpace()};function D(O){const j=M.indexOf(O.inputSource);if(j===-1)return;const ye=y[j];ye!==void 0&&(ye.update(O.inputSource,O.frame,d||o),ye.dispatchEvent({type:O.type,data:O.inputSource}))}function G(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",$);for(let O=0;O<y.length;O++){const j=M[O];j!==null&&(M[O]=null,y[O].disconnect(j))}R=null,P=null,_.reset(),e.setRenderTarget(p),h=null,f=null,u=null,s=null,v=null,me.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(x.width,x.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){r=O,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){a=O,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||o},this.setReferenceSpace=function(O){d=O},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(O){if(s=O,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",G),s.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(x),s.enabledFeatures!==void 0&&s.enabledFeatures.includes("layers")){let ye=null,ue=null,De=null;m.depth&&(De=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=m.stencil?Hs:Rs,ue=m.stencil?Bs:Zi);const Ie={colorFormat:t.RGBA8,depthFormat:De,scaleFactor:r};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(Ie),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new Ji(f.textureWidth,f.textureHeight,{format:Hn,type:gi,depthTexture:new Mu(f.textureWidth,f.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}else{const ye={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,ye),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),v=new Ji(h.framebufferWidth,h.framebufferHeight,{format:Hn,type:gi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}v.isXRRenderTarget=!0,this.setFoveation(c),d=null,o=await s.requestReferenceSpace(a),me.setContext(s),me.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function $(O){for(let j=0;j<O.removed.length;j++){const ye=O.removed[j],ue=M.indexOf(ye);ue>=0&&(M[ue]=null,y[ue].disconnect(ye))}for(let j=0;j<O.added.length;j++){const ye=O.added[j];let ue=M.indexOf(ye);if(ue===-1){for(let Ie=0;Ie<y.length;Ie++)if(Ie>=M.length){M.push(ye),ue=Ie;break}else if(M[Ie]===null){M[Ie]=ye,ue=Ie;break}if(ue===-1)break}const De=y[ue];De&&De.connect(ye)}}const q=new k,K=new k;function V(O,j,ye){q.setFromMatrixPosition(j.matrixWorld),K.setFromMatrixPosition(ye.matrixWorld);const ue=q.distanceTo(K),De=j.projectionMatrix.elements,Ie=ye.projectionMatrix.elements,Ne=De[14]/(De[10]-1),ut=De[14]/(De[10]+1),$e=(De[9]+1)/De[5],ht=(De[9]-1)/De[5],L=(De[8]-1)/De[0],nn=(Ie[8]+1)/Ie[0],nt=Ne*L,it=Ne*nn,Ue=ue/(-L+nn),St=Ue*-L;if(j.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(St),O.translateZ(Ue),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert(),De[10]===-1)O.projectionMatrix.copy(j.projectionMatrix),O.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const Le=Ne+Ue,I=ut+Ue,A=nt-St,z=it+(ue-St),ee=$e*ut/I*Le,ie=ht*ut/I*Le;O.projectionMatrix.makePerspective(A,z,ee,ie,Le,I),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}}function le(O,j){j===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(j.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(s===null)return;let j=O.near,ye=O.far;_.texture!==null&&(_.depthNear>0&&(j=_.depthNear),_.depthFar>0&&(ye=_.depthFar)),S.near=E.near=b.near=j,S.far=E.far=b.far=ye,(R!==S.near||P!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),R=S.near,P=S.far),b.layers.mask=O.layers.mask|2,E.layers.mask=O.layers.mask|4,S.layers.mask=b.layers.mask|E.layers.mask;const ue=O.parent,De=S.cameras;le(S,ue);for(let Ie=0;Ie<De.length;Ie++)le(De[Ie],ue);De.length===2?V(S,b,E):S.projectionMatrix.copy(b.projectionMatrix),H(O,S,ue)};function H(O,j,ye){ye===null?O.matrix.copy(j.matrixWorld):(O.matrix.copy(ye.matrixWorld),O.matrix.invert(),O.matrix.multiply(j.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(j.projectionMatrix),O.projectionMatrixInverse.copy(j.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=wr*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function(O){c=O,f!==null&&(f.fixedFoveation=O),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=O)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let Z=null;function ce(O,j){if(l=j.getViewerPose(d||o),g=j,l!==null){const ye=l.views;h!==null&&(e.setRenderTargetFramebuffer(v,h.framebuffer),e.setRenderTarget(v));let ue=!1;ye.length!==S.cameras.length&&(S.cameras.length=0,ue=!0);for(let Ie=0;Ie<ye.length;Ie++){const Ne=ye[Ie];let ut=null;if(h!==null)ut=h.getViewport(Ne);else{const ht=u.getViewSubImage(f,Ne);ut=ht.viewport,Ie===0&&(e.setRenderTargetTextures(v,ht.colorTexture,f.ignoreDepthValues?void 0:ht.depthStencilTexture),e.setRenderTarget(v))}let $e=w[Ie];$e===void 0&&($e=new Fn,$e.layers.enable(Ie),$e.viewport=new Lt,w[Ie]=$e),$e.matrix.fromArray(Ne.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(Ne.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(ut.x,ut.y,ut.width,ut.height),Ie===0&&(S.matrix.copy($e.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ue===!0&&S.cameras.push($e)}const De=s.enabledFeatures;if(De&&De.includes("depth-sensing")){const Ie=u.getDepthInformation(ye[0]);Ie&&Ie.isValid&&Ie.texture&&_.init(e,Ie,s.renderState)}}for(let ye=0;ye<y.length;ye++){const ue=M[ye],De=y[ye];ue!==null&&De!==void 0&&De.update(ue,j,d||o)}Z&&Z(O,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}const me=new xu;me.setAnimationLoop(ce),this.setAnimationLoop=function(O){Z=O},this.dispose=function(){}}}const Hi=new Kn,b_=new Rt;function T_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,mu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,y,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),l(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,y):p.isSpriteMaterial?d(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===hn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===hn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p),y=v.envMap,M=v.envMapRotation;y&&(m.envMap.value=y,Hi.copy(M),Hi.x*=-1,Hi.y*=-1,Hi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Hi.y*=-1,Hi.z*=-1),m.envMapRotation.value.setFromMatrix4(b_.makeRotationFromEuler(Hi)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===hn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function E_(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){const M=y.program;n.uniformBlockBinding(v,M)}function d(v,y){let M=s[v.id];M===void 0&&(g(v),M=l(v),s[v.id]=M,v.addEventListener("dispose",m));const x=y.program;n.updateUBOMapping(v,x);const T=e.render.frame;r[v.id]!==T&&(f(v),r[v.id]=T)}function l(v){const y=u();v.__bindingPointIndex=y;const M=i.createBuffer(),x=v.__size,T=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,x,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,M),M}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const y=s[v.id],M=v.uniforms,x=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let T=0,b=M.length;T<b;T++){const E=Array.isArray(M[T])?M[T]:[M[T]];for(let w=0,S=E.length;w<S;w++){const R=E[w];if(h(R,T,w,x)===!0){const P=R.__offset,D=Array.isArray(R.value)?R.value:[R.value];let G=0;for(let $=0;$<D.length;$++){const q=D[$],K=_(q);typeof q=="number"||typeof q=="boolean"?(R.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,P+G,R.__data)):q.isMatrix3?(R.__data[0]=q.elements[0],R.__data[1]=q.elements[1],R.__data[2]=q.elements[2],R.__data[3]=0,R.__data[4]=q.elements[3],R.__data[5]=q.elements[4],R.__data[6]=q.elements[5],R.__data[7]=0,R.__data[8]=q.elements[6],R.__data[9]=q.elements[7],R.__data[10]=q.elements[8],R.__data[11]=0):(q.toArray(R.__data,G),G+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,P,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(v,y,M,x){const T=v.value,b=y+"_"+M;if(x[b]===void 0)return typeof T=="number"||typeof T=="boolean"?x[b]=T:x[b]=T.clone(),!0;{const E=x[b];if(typeof T=="number"||typeof T=="boolean"){if(E!==T)return x[b]=T,!0}else if(E.equals(T)===!1)return E.copy(T),!0}return!1}function g(v){const y=v.uniforms;let M=0;const x=16;for(let b=0,E=y.length;b<E;b++){const w=Array.isArray(y[b])?y[b]:[y[b]];for(let S=0,R=w.length;S<R;S++){const P=w[S],D=Array.isArray(P.value)?P.value:[P.value];for(let G=0,$=D.length;G<$;G++){const q=D[G],K=_(q),V=M%x,le=V%K.boundary,H=V+le;M+=le,H!==0&&x-H<K.storage&&(M+=x-H),P.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=M,M+=K.storage}}}const T=M%x;return T>0&&(M+=x-T),v.__size=M,v.__cache={},this}function _(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function m(v){const y=v.target;y.removeEventListener("dispose",m);const M=o.indexOf(y.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:d,dispose:p}}class Ru{constructor(e={}){const{canvas:t=of(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:d=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=jt,this.toneMapping=Ci,this.toneMappingExposure=1;const M=this;let x=!1,T=0,b=0,E=null,w=-1,S=null;const R=new Lt,P=new Lt;let D=null;const G=new Be(0);let $=0,q=t.width,K=t.height,V=1,le=null,H=null;const Z=new Lt(0,0,q,K),ce=new Lt(0,0,q,K);let me=!1;const O=new Fc;let j=!1,ye=!1;this.transmissionResolutionScale=1;const ue=new Rt,De=new Rt,Ie=new k,Ne=new Lt,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let $e=!1;function ht(){return E===null?V:1}let L=n;function nn(C,F){return t.getContext(C,F)}try{const C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:d,powerPreference:l,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ac}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",Me,!1),L===null){const F="webgl2";if(L=nn(F,C),L===null)throw nn(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let nt,it,Ue,St,Le,I,A,z,ee,ie,Q,Pe,ve,Te,ot,ae,Ae,Fe,ze,Re,st,je,yt,N;function ge(){nt=new N0(L),nt.init(),je=new v_(L,nt),it=new I0(L,nt,e,je),Ue=new g_(L,nt),it.reverseDepthBuffer&&f&&Ue.buffers.depth.setReversed(!0),St=new B0(L),Le=new i_,I=new __(L,nt,Ue,Le,it,je,St),A=new D0(M),z=new k0(M),ee=new Xf(L),yt=new R0(L,ee),ie=new O0(L,ee,St,yt),Q=new z0(L,ie,ee,St),ze=new H0(L,it,I),ae=new P0(Le),Pe=new n_(M,A,z,nt,it,yt,ae),ve=new T_(M,Le),Te=new r_,ot=new u_(nt),Fe=new A0(M,A,z,Ue,Q,h,c),Ae=new p_(M,Q,it),N=new E_(L,St,it,Ue),Re=new C0(L,nt,St),st=new F0(L,nt,St),St.programs=Pe.programs,M.capabilities=it,M.extensions=nt,M.properties=Le,M.renderLists=Te,M.shadowMap=Ae,M.state=Ue,M.info=St}ge();const Y=new x_(M,L);this.xr=Y,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const C=nt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=nt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(C){C!==void 0&&(V=C,this.setSize(q,K,!1))},this.getSize=function(C){return C.set(q,K)},this.setSize=function(C,F,W=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=C,K=F,t.width=Math.floor(C*V),t.height=Math.floor(F*V),W===!0&&(t.style.width=C+"px",t.style.height=F+"px"),this.setViewport(0,0,C,F)},this.getDrawingBufferSize=function(C){return C.set(q*V,K*V).floor()},this.setDrawingBufferSize=function(C,F,W){q=C,K=F,V=W,t.width=Math.floor(C*W),t.height=Math.floor(F*W),this.setViewport(0,0,C,F)},this.getCurrentViewport=function(C){return C.copy(R)},this.getViewport=function(C){return C.copy(Z)},this.setViewport=function(C,F,W,X){C.isVector4?Z.set(C.x,C.y,C.z,C.w):Z.set(C,F,W,X),Ue.viewport(R.copy(Z).multiplyScalar(V).round())},this.getScissor=function(C){return C.copy(ce)},this.setScissor=function(C,F,W,X){C.isVector4?ce.set(C.x,C.y,C.z,C.w):ce.set(C,F,W,X),Ue.scissor(P.copy(ce).multiplyScalar(V).round())},this.getScissorTest=function(){return me},this.setScissorTest=function(C){Ue.setScissorTest(me=C)},this.setOpaqueSort=function(C){le=C},this.setTransparentSort=function(C){H=C},this.getClearColor=function(C){return C.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor.apply(Fe,arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha.apply(Fe,arguments)},this.clear=function(C=!0,F=!0,W=!0){let X=0;if(C){let B=!1;if(E!==null){const re=E.texture.format;B=re===Uc||re===Lc||re===Dc}if(B){const re=E.texture.type,_e=re===gi||re===Zi||re===Mr||re===Bs||re===Ic||re===Pc,be=Fe.getClearColor(),Ce=Fe.getClearAlpha(),Ge=be.r,Ve=be.g,ke=be.b;_e?(g[0]=Ge,g[1]=Ve,g[2]=ke,g[3]=Ce,L.clearBufferuiv(L.COLOR,0,g)):(_[0]=Ge,_[1]=Ve,_[2]=ke,_[3]=Ce,L.clearBufferiv(L.COLOR,0,_))}else X|=L.COLOR_BUFFER_BIT}F&&(X|=L.DEPTH_BUFFER_BIT),W&&(X|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",Me,!1),Fe.dispose(),Te.dispose(),ot.dispose(),Le.dispose(),A.dispose(),z.dispose(),Q.dispose(),yt.dispose(),N.dispose(),Pe.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",jc),Y.removeEventListener("sessionend",Zc),Li.stop()};function te(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const C=St.autoReset,F=Ae.enabled,W=Ae.autoUpdate,X=Ae.needsUpdate,B=Ae.type;ge(),St.autoReset=C,Ae.enabled=F,Ae.autoUpdate=W,Ae.needsUpdate=X,Ae.type=B}function Me(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Ye(C){const F=C.target;F.removeEventListener("dispose",Ye),It(F)}function It(C){Zt(C),Le.remove(C)}function Zt(C){const F=Le.get(C).programs;F!==void 0&&(F.forEach(function(W){Pe.releaseProgram(W)}),C.isShaderMaterial&&Pe.releaseShaderCache(C))}this.renderBufferDirect=function(C,F,W,X,B,re){F===null&&(F=ut);const _e=B.isMesh&&B.matrixWorld.determinant()<0,be=Yu(C,F,W,X,B);Ue.setMaterial(X,_e);let Ce=W.index,Ge=1;if(X.wireframe===!0){if(Ce=ie.getWireframeAttribute(W),Ce===void 0)return;Ge=2}const Ve=W.drawRange,ke=W.attributes.position;let at=Ve.start*Ge,ft=(Ve.start+Ve.count)*Ge;re!==null&&(at=Math.max(at,re.start*Ge),ft=Math.min(ft,(re.start+re.count)*Ge)),Ce!==null?(at=Math.max(at,0),ft=Math.min(ft,Ce.count)):ke!=null&&(at=Math.max(at,0),ft=Math.min(ft,ke.count));const Bt=ft-at;if(Bt<0||Bt===1/0)return;yt.setup(B,X,be,W,Ce);let Pt,lt=Re;if(Ce!==null&&(Pt=ee.get(Ce),lt=st,lt.setIndex(Pt)),B.isMesh)X.wireframe===!0?(Ue.setLineWidth(X.wireframeLinewidth*ht()),lt.setMode(L.LINES)):lt.setMode(L.TRIANGLES);else if(B.isLine){let Oe=X.linewidth;Oe===void 0&&(Oe=1),Ue.setLineWidth(Oe*ht()),B.isLineSegments?lt.setMode(L.LINES):B.isLineLoop?lt.setMode(L.LINE_LOOP):lt.setMode(L.LINE_STRIP)}else B.isPoints?lt.setMode(L.POINTS):B.isSprite&&lt.setMode(L.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)lt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))lt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Oe=B._multiDrawStarts,Kt=B._multiDrawCounts,pt=B._multiDrawCount,Ln=Ce?ee.get(Ce).bytesPerElement:1,es=Le.get(X).currentProgram.getUniforms();for(let mn=0;mn<pt;mn++)es.setValue(L,"_gl_DrawID",mn),lt.render(Oe[mn]/Ln,Kt[mn])}else if(B.isInstancedMesh)lt.renderInstances(at,Bt,B.count);else if(W.isInstancedBufferGeometry){const Oe=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Kt=Math.min(W.instanceCount,Oe);lt.renderInstances(at,Bt,Kt)}else lt.render(at,Bt)};function mt(C,F,W){C.transparent===!0&&C.side===Ft&&C.forceSinglePass===!1?(C.side=hn,C.needsUpdate=!0,Ur(C,F,W),C.side=Ii,C.needsUpdate=!0,Ur(C,F,W),C.side=Ft):Ur(C,F,W)}this.compile=function(C,F,W=null){W===null&&(W=C),p=ot.get(W),p.init(F),y.push(p),W.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),C!==W&&C.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const X=new Set;return C.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const re=B.material;if(re)if(Array.isArray(re))for(let _e=0;_e<re.length;_e++){const be=re[_e];mt(be,W,B),X.add(be)}else mt(re,W,B),X.add(re)}),y.pop(),p=null,X},this.compileAsync=function(C,F,W=null){const X=this.compile(C,F,W);return new Promise(B=>{function re(){if(X.forEach(function(_e){Le.get(_e).currentProgram.isReady()&&X.delete(_e)}),X.size===0){B(C);return}setTimeout(re,10)}nt.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let Dn=null;function jn(C){Dn&&Dn(C)}function jc(){Li.stop()}function Zc(){Li.start()}const Li=new xu;Li.setAnimationLoop(jn),typeof self<"u"&&Li.setContext(self),this.setAnimationLoop=function(C){Dn=C,Y.setAnimationLoop(C),C===null?Li.stop():Li.start()},Y.addEventListener("sessionstart",jc),Y.addEventListener("sessionend",Zc),this.render=function(C,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(F),F=Y.getCamera()),C.isScene===!0&&C.onBeforeRender(M,C,F,E),p=ot.get(C,y.length),p.init(F),y.push(p),De.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),O.setFromProjectionMatrix(De),ye=this.localClippingEnabled,j=ae.init(this.clippingPlanes,ye),m=Te.get(C,v.length),m.init(),v.push(m),Y.enabled===!0&&Y.isPresenting===!0){const re=M.xr.getDepthSensingMesh();re!==null&&Fo(re,F,-1/0,M.sortObjects)}Fo(C,F,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(le,H),$e=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,$e&&Fe.addToRenderList(m,C),this.info.render.frame++,j===!0&&ae.beginShadows();const W=p.state.shadowsArray;Ae.render(W,C,F),j===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,B=m.transmissive;if(p.setupLights(),F.isArrayCamera){const re=F.cameras;if(B.length>0)for(let _e=0,be=re.length;_e<be;_e++){const Ce=re[_e];Qc(X,B,C,Ce)}$e&&Fe.render(C);for(let _e=0,be=re.length;_e<be;_e++){const Ce=re[_e];Jc(m,C,Ce,Ce.viewport)}}else B.length>0&&Qc(X,B,C,F),$e&&Fe.render(C),Jc(m,C,F);E!==null&&b===0&&(I.updateMultisampleRenderTarget(E),I.updateRenderTargetMipmap(E)),C.isScene===!0&&C.onAfterRender(M,C,F),yt.resetDefaultState(),w=-1,S=null,y.pop(),y.length>0?(p=y[y.length-1],j===!0&&ae.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Fo(C,F,W,X){if(C.visible===!1)return;if(C.layers.test(F.layers)){if(C.isGroup)W=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(F);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||O.intersectsSprite(C)){X&&Ne.setFromMatrixPosition(C.matrixWorld).applyMatrix4(De);const _e=Q.update(C),be=C.material;be.visible&&m.push(C,_e,be,W,Ne.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||O.intersectsObject(C))){const _e=Q.update(C),be=C.material;if(X&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ne.copy(C.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Ne.copy(_e.boundingSphere.center)),Ne.applyMatrix4(C.matrixWorld).applyMatrix4(De)),Array.isArray(be)){const Ce=_e.groups;for(let Ge=0,Ve=Ce.length;Ge<Ve;Ge++){const ke=Ce[Ge],at=be[ke.materialIndex];at&&at.visible&&m.push(C,_e,at,W,Ne.z,ke)}}else be.visible&&m.push(C,_e,be,W,Ne.z,null)}}const re=C.children;for(let _e=0,be=re.length;_e<be;_e++)Fo(re[_e],F,W,X)}function Jc(C,F,W,X){const B=C.opaque,re=C.transmissive,_e=C.transparent;p.setupLightsView(W),j===!0&&ae.setGlobalState(M.clippingPlanes,W),X&&Ue.viewport(R.copy(X)),B.length>0&&Lr(B,F,W),re.length>0&&Lr(re,F,W),_e.length>0&&Lr(_e,F,W),Ue.buffers.depth.setTest(!0),Ue.buffers.depth.setMask(!0),Ue.buffers.color.setMask(!0),Ue.setPolygonOffset(!1)}function Qc(C,F,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new Ji(1,1,{generateMipmaps:!0,type:nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float")?Rr:gi,minFilter:li,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace}));const re=p.state.transmissionRenderTarget[X.id],_e=X.viewport||R;re.setSize(_e.z*M.transmissionResolutionScale,_e.w*M.transmissionResolutionScale);const be=M.getRenderTarget();M.setRenderTarget(re),M.getClearColor(G),$=M.getClearAlpha(),$<1&&M.setClearColor(16777215,.5),M.clear(),$e&&Fe.render(W);const Ce=M.toneMapping;M.toneMapping=Ci;const Ge=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),j===!0&&ae.setGlobalState(M.clippingPlanes,X),Lr(C,W,X),I.updateMultisampleRenderTarget(re),I.updateRenderTargetMipmap(re),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let ke=0,at=F.length;ke<at;ke++){const ft=F[ke],Bt=ft.object,Pt=ft.geometry,lt=ft.material,Oe=ft.group;if(lt.side===Ft&&Bt.layers.test(X.layers)){const Kt=lt.side;lt.side=hn,lt.needsUpdate=!0,el(Bt,W,X,Pt,lt,Oe),lt.side=Kt,lt.needsUpdate=!0,Ve=!0}}Ve===!0&&(I.updateMultisampleRenderTarget(re),I.updateRenderTargetMipmap(re))}M.setRenderTarget(be),M.setClearColor(G,$),Ge!==void 0&&(X.viewport=Ge),M.toneMapping=Ce}function Lr(C,F,W){const X=F.isScene===!0?F.overrideMaterial:null;for(let B=0,re=C.length;B<re;B++){const _e=C[B],be=_e.object,Ce=_e.geometry,Ge=X===null?_e.material:X,Ve=_e.group;be.layers.test(W.layers)&&el(be,F,W,Ce,Ge,Ve)}}function el(C,F,W,X,B,re){C.onBeforeRender(M,F,W,X,B,re),C.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),B.onBeforeRender(M,F,W,X,C,re),B.transparent===!0&&B.side===Ft&&B.forceSinglePass===!1?(B.side=hn,B.needsUpdate=!0,M.renderBufferDirect(W,F,X,B,C,re),B.side=Ii,B.needsUpdate=!0,M.renderBufferDirect(W,F,X,B,C,re),B.side=Ft):M.renderBufferDirect(W,F,X,B,C,re),C.onAfterRender(M,F,W,X,B,re)}function Ur(C,F,W){F.isScene!==!0&&(F=ut);const X=Le.get(C),B=p.state.lights,re=p.state.shadowsArray,_e=B.state.version,be=Pe.getParameters(C,B.state,re,F,W),Ce=Pe.getProgramCacheKey(be);let Ge=X.programs;X.environment=C.isMeshStandardMaterial?F.environment:null,X.fog=F.fog,X.envMap=(C.isMeshStandardMaterial?z:A).get(C.envMap||X.environment),X.envMapRotation=X.environment!==null&&C.envMap===null?F.environmentRotation:C.envMapRotation,Ge===void 0&&(C.addEventListener("dispose",Ye),Ge=new Map,X.programs=Ge);let Ve=Ge.get(Ce);if(Ve!==void 0){if(X.currentProgram===Ve&&X.lightsStateVersion===_e)return nl(C,be),Ve}else be.uniforms=Pe.getUniforms(C),C.onBeforeCompile(be,M),Ve=Pe.acquireProgram(be,Ce),Ge.set(Ce,Ve),X.uniforms=be.uniforms;const ke=X.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(ke.clippingPlanes=ae.uniform),nl(C,be),X.needsLights=ju(C),X.lightsStateVersion=_e,X.needsLights&&(ke.ambientLightColor.value=B.state.ambient,ke.lightProbe.value=B.state.probe,ke.directionalLights.value=B.state.directional,ke.directionalLightShadows.value=B.state.directionalShadow,ke.spotLights.value=B.state.spot,ke.spotLightShadows.value=B.state.spotShadow,ke.rectAreaLights.value=B.state.rectArea,ke.ltc_1.value=B.state.rectAreaLTC1,ke.ltc_2.value=B.state.rectAreaLTC2,ke.pointLights.value=B.state.point,ke.pointLightShadows.value=B.state.pointShadow,ke.hemisphereLights.value=B.state.hemi,ke.directionalShadowMap.value=B.state.directionalShadowMap,ke.directionalShadowMatrix.value=B.state.directionalShadowMatrix,ke.spotShadowMap.value=B.state.spotShadowMap,ke.spotLightMatrix.value=B.state.spotLightMatrix,ke.spotLightMap.value=B.state.spotLightMap,ke.pointShadowMap.value=B.state.pointShadowMap,ke.pointShadowMatrix.value=B.state.pointShadowMatrix),X.currentProgram=Ve,X.uniformsList=null,Ve}function tl(C){if(C.uniformsList===null){const F=C.currentProgram.getUniforms();C.uniformsList=_o.seqWithValue(F.seq,C.uniforms)}return C.uniformsList}function nl(C,F){const W=Le.get(C);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.batchingColor=F.batchingColor,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function Yu(C,F,W,X,B){F.isScene!==!0&&(F=ut),I.resetTextureUnits();const re=F.fog,_e=X.isMeshStandardMaterial?F.environment:null,be=E===null?M.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:zs,Ce=(X.isMeshStandardMaterial?z:A).get(X.envMap||_e),Ge=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ve=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),ke=!!W.morphAttributes.position,at=!!W.morphAttributes.normal,ft=!!W.morphAttributes.color;let Bt=Ci;X.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Bt=M.toneMapping);const Pt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,lt=Pt!==void 0?Pt.length:0,Oe=Le.get(X),Kt=p.state.lights;if(j===!0&&(ye===!0||C!==S)){const sn=C===S&&X.id===w;ae.setState(X,C,sn)}let pt=!1;X.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==Kt.state.version||Oe.outputColorSpace!==be||B.isBatchedMesh&&Oe.batching===!1||!B.isBatchedMesh&&Oe.batching===!0||B.isBatchedMesh&&Oe.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Oe.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Oe.instancing===!1||!B.isInstancedMesh&&Oe.instancing===!0||B.isSkinnedMesh&&Oe.skinning===!1||!B.isSkinnedMesh&&Oe.skinning===!0||B.isInstancedMesh&&Oe.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Oe.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Oe.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Oe.instancingMorph===!1&&B.morphTexture!==null||Oe.envMap!==Ce||X.fog===!0&&Oe.fog!==re||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==ae.numPlanes||Oe.numIntersection!==ae.numIntersection)||Oe.vertexAlphas!==Ge||Oe.vertexTangents!==Ve||Oe.morphTargets!==ke||Oe.morphNormals!==at||Oe.morphColors!==ft||Oe.toneMapping!==Bt||Oe.morphTargetsCount!==lt)&&(pt=!0):(pt=!0,Oe.__version=X.version);let Ln=Oe.currentProgram;pt===!0&&(Ln=Ur(X,F,B));let es=!1,mn=!1,Zs=!1;const Tt=Ln.getUniforms(),xn=Oe.uniforms;if(Ue.useProgram(Ln.program)&&(es=!0,mn=!0,Zs=!0),X.id!==w&&(w=X.id,mn=!0),es||S!==C){Ue.buffers.depth.getReversed()?(ue.copy(C.projectionMatrix),cf(ue),lf(ue),Tt.setValue(L,"projectionMatrix",ue)):Tt.setValue(L,"projectionMatrix",C.projectionMatrix),Tt.setValue(L,"viewMatrix",C.matrixWorldInverse);const cn=Tt.map.cameraPosition;cn!==void 0&&cn.setValue(L,Ie.setFromMatrixPosition(C.matrixWorld)),it.logarithmicDepthBuffer&&Tt.setValue(L,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Tt.setValue(L,"isOrthographic",C.isOrthographicCamera===!0),S!==C&&(S=C,mn=!0,Zs=!0)}if(B.isSkinnedMesh){Tt.setOptional(L,B,"bindMatrix"),Tt.setOptional(L,B,"bindMatrixInverse");const sn=B.skeleton;sn&&(sn.boneTexture===null&&sn.computeBoneTexture(),Tt.setValue(L,"boneTexture",sn.boneTexture,I))}B.isBatchedMesh&&(Tt.setOptional(L,B,"batchingTexture"),Tt.setValue(L,"batchingTexture",B._matricesTexture,I),Tt.setOptional(L,B,"batchingIdTexture"),Tt.setValue(L,"batchingIdTexture",B._indirectTexture,I),Tt.setOptional(L,B,"batchingColorTexture"),B._colorsTexture!==null&&Tt.setValue(L,"batchingColorTexture",B._colorsTexture,I));const bn=W.morphAttributes;if((bn.position!==void 0||bn.normal!==void 0||bn.color!==void 0)&&ze.update(B,W,Ln),(mn||Oe.receiveShadow!==B.receiveShadow)&&(Oe.receiveShadow=B.receiveShadow,Tt.setValue(L,"receiveShadow",B.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(xn.envMap.value=Ce,xn.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&F.environment!==null&&(xn.envMapIntensity.value=F.environmentIntensity),mn&&(Tt.setValue(L,"toneMappingExposure",M.toneMappingExposure),Oe.needsLights&&Ku(xn,Zs),re&&X.fog===!0&&ve.refreshFogUniforms(xn,re),ve.refreshMaterialUniforms(xn,X,V,K,p.state.transmissionRenderTarget[C.id]),_o.upload(L,tl(Oe),xn,I)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(_o.upload(L,tl(Oe),xn,I),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Tt.setValue(L,"center",B.center),Tt.setValue(L,"modelViewMatrix",B.modelViewMatrix),Tt.setValue(L,"normalMatrix",B.normalMatrix),Tt.setValue(L,"modelMatrix",B.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const sn=X.uniformsGroups;for(let cn=0,Bo=sn.length;cn<Bo;cn++){const Ui=sn[cn];N.update(Ui,Ln),N.bind(Ui,Ln)}}return Ln}function Ku(C,F){C.ambientLightColor.needsUpdate=F,C.lightProbe.needsUpdate=F,C.directionalLights.needsUpdate=F,C.directionalLightShadows.needsUpdate=F,C.pointLights.needsUpdate=F,C.pointLightShadows.needsUpdate=F,C.spotLights.needsUpdate=F,C.spotLightShadows.needsUpdate=F,C.rectAreaLights.needsUpdate=F,C.hemisphereLights.needsUpdate=F}function ju(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(C,F,W){Le.get(C.texture).__webglTexture=F,Le.get(C.depthTexture).__webglTexture=W;const X=Le.get(C);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,F){const W=Le.get(C);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0};const Zu=L.createFramebuffer();this.setRenderTarget=function(C,F=0,W=0){E=C,T=F,b=W;let X=!0,B=null,re=!1,_e=!1;if(C){const Ce=Le.get(C);if(Ce.__useDefaultFramebuffer!==void 0)Ue.bindFramebuffer(L.FRAMEBUFFER,null),X=!1;else if(Ce.__webglFramebuffer===void 0)I.setupRenderTarget(C);else if(Ce.__hasExternalTextures)I.rebindTextures(C,Le.get(C.texture).__webglTexture,Le.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const ke=C.depthTexture;if(Ce.__boundDepthTexture!==ke){if(ke!==null&&Le.has(ke)&&(C.width!==ke.image.width||C.height!==ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(C)}}const Ge=C.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(_e=!0);const Ve=Le.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ve[F])?B=Ve[F][W]:B=Ve[F],re=!0):C.samples>0&&I.useMultisampledRTT(C)===!1?B=Le.get(C).__webglMultisampledFramebuffer:Array.isArray(Ve)?B=Ve[W]:B=Ve,R.copy(C.viewport),P.copy(C.scissor),D=C.scissorTest}else R.copy(Z).multiplyScalar(V).floor(),P.copy(ce).multiplyScalar(V).floor(),D=me;if(W!==0&&(B=Zu),Ue.bindFramebuffer(L.FRAMEBUFFER,B)&&X&&Ue.drawBuffers(C,B),Ue.viewport(R),Ue.scissor(P),Ue.setScissorTest(D),re){const Ce=Le.get(C.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ce.__webglTexture,W)}else if(_e){const Ce=Le.get(C.texture),Ge=F;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ce.__webglTexture,W,Ge)}else if(C!==null&&W!==0){const Ce=Le.get(C.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ce.__webglTexture,W)}w=-1},this.readRenderTargetPixels=function(C,F,W,X,B,re,_e){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Le.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be){Ue.bindFramebuffer(L.FRAMEBUFFER,be);try{const Ce=C.texture,Ge=Ce.format,Ve=Ce.type;if(!it.textureFormatReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!it.textureTypeReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=C.width-X&&W>=0&&W<=C.height-B&&L.readPixels(F,W,X,B,je.convert(Ge),je.convert(Ve),re)}finally{const Ce=E!==null?Le.get(E).__webglFramebuffer:null;Ue.bindFramebuffer(L.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(C,F,W,X,B,re,_e){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=Le.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be){const Ce=C.texture,Ge=Ce.format,Ve=Ce.type;if(!it.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!it.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=C.width-X&&W>=0&&W<=C.height-B){Ue.bindFramebuffer(L.FRAMEBUFFER,be);const ke=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,ke),L.bufferData(L.PIXEL_PACK_BUFFER,re.byteLength,L.STREAM_READ),L.readPixels(F,W,X,B,je.convert(Ge),je.convert(Ve),0);const at=E!==null?Le.get(E).__webglFramebuffer:null;Ue.bindFramebuffer(L.FRAMEBUFFER,at);const ft=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await af(L,ft,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,ke),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,re),L.deleteBuffer(ke),L.deleteSync(ft),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,F=null,W=0){C.isTexture!==!0&&(Ms("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,C=arguments[1]);const X=Math.pow(2,-W),B=Math.floor(C.image.width*X),re=Math.floor(C.image.height*X),_e=F!==null?F.x:0,be=F!==null?F.y:0;I.setTexture2D(C,0),L.copyTexSubImage2D(L.TEXTURE_2D,W,0,0,_e,be,B,re),Ue.unbindTexture()};const Ju=L.createFramebuffer(),Qu=L.createFramebuffer();this.copyTextureToTexture=function(C,F,W=null,X=null,B=0,re=null){C.isTexture!==!0&&(Ms("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,C=arguments[1],F=arguments[2],re=arguments[3]||0,W=null),re===null&&(B!==0?(Ms("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),re=B,B=0):re=0);let _e,be,Ce,Ge,Ve,ke,at,ft,Bt;const Pt=C.isCompressedTexture?C.mipmaps[re]:C.image;if(W!==null)_e=W.max.x-W.min.x,be=W.max.y-W.min.y,Ce=W.isBox3?W.max.z-W.min.z:1,Ge=W.min.x,Ve=W.min.y,ke=W.isBox3?W.min.z:0;else{const bn=Math.pow(2,-B);_e=Math.floor(Pt.width*bn),be=Math.floor(Pt.height*bn),C.isDataArrayTexture?Ce=Pt.depth:C.isData3DTexture?Ce=Math.floor(Pt.depth*bn):Ce=1,Ge=0,Ve=0,ke=0}X!==null?(at=X.x,ft=X.y,Bt=X.z):(at=0,ft=0,Bt=0);const lt=je.convert(F.format),Oe=je.convert(F.type);let Kt;F.isData3DTexture?(I.setTexture3D(F,0),Kt=L.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(I.setTexture2DArray(F,0),Kt=L.TEXTURE_2D_ARRAY):(I.setTexture2D(F,0),Kt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const pt=L.getParameter(L.UNPACK_ROW_LENGTH),Ln=L.getParameter(L.UNPACK_IMAGE_HEIGHT),es=L.getParameter(L.UNPACK_SKIP_PIXELS),mn=L.getParameter(L.UNPACK_SKIP_ROWS),Zs=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Pt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Pt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ge),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ve),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ke);const Tt=C.isDataArrayTexture||C.isData3DTexture,xn=F.isDataArrayTexture||F.isData3DTexture;if(C.isDepthTexture){const bn=Le.get(C),sn=Le.get(F),cn=Le.get(bn.__renderTarget),Bo=Le.get(sn.__renderTarget);Ue.bindFramebuffer(L.READ_FRAMEBUFFER,cn.__webglFramebuffer),Ue.bindFramebuffer(L.DRAW_FRAMEBUFFER,Bo.__webglFramebuffer);for(let Ui=0;Ui<Ce;Ui++)Tt&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Le.get(C).__webglTexture,B,ke+Ui),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Le.get(F).__webglTexture,re,Bt+Ui)),L.blitFramebuffer(Ge,Ve,_e,be,at,ft,_e,be,L.DEPTH_BUFFER_BIT,L.NEAREST);Ue.bindFramebuffer(L.READ_FRAMEBUFFER,null),Ue.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(B!==0||C.isRenderTargetTexture||Le.has(C)){const bn=Le.get(C),sn=Le.get(F);Ue.bindFramebuffer(L.READ_FRAMEBUFFER,Ju),Ue.bindFramebuffer(L.DRAW_FRAMEBUFFER,Qu);for(let cn=0;cn<Ce;cn++)Tt?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,bn.__webglTexture,B,ke+cn):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,bn.__webglTexture,B),xn?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,sn.__webglTexture,re,Bt+cn):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,sn.__webglTexture,re),B!==0?L.blitFramebuffer(Ge,Ve,_e,be,at,ft,_e,be,L.COLOR_BUFFER_BIT,L.NEAREST):xn?L.copyTexSubImage3D(Kt,re,at,ft,Bt+cn,Ge,Ve,_e,be):L.copyTexSubImage2D(Kt,re,at,ft,Ge,Ve,_e,be);Ue.bindFramebuffer(L.READ_FRAMEBUFFER,null),Ue.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else xn?C.isDataTexture||C.isData3DTexture?L.texSubImage3D(Kt,re,at,ft,Bt,_e,be,Ce,lt,Oe,Pt.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(Kt,re,at,ft,Bt,_e,be,Ce,lt,Pt.data):L.texSubImage3D(Kt,re,at,ft,Bt,_e,be,Ce,lt,Oe,Pt):C.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,re,at,ft,_e,be,lt,Oe,Pt.data):C.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,re,at,ft,Pt.width,Pt.height,lt,Pt.data):L.texSubImage2D(L.TEXTURE_2D,re,at,ft,_e,be,lt,Oe,Pt);L.pixelStorei(L.UNPACK_ROW_LENGTH,pt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ln),L.pixelStorei(L.UNPACK_SKIP_PIXELS,es),L.pixelStorei(L.UNPACK_SKIP_ROWS,mn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Zs),re===0&&F.generateMipmaps&&L.generateMipmap(Kt),Ue.unbindTexture()},this.copyTextureToTexture3D=function(C,F,W=null,X=null,B=0){return C.isTexture!==!0&&(Ms("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,C=arguments[2],F=arguments[3],B=arguments[4]||0),Ms('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,F,W,X,B)},this.initRenderTarget=function(C){Le.get(C).__webglFramebuffer===void 0&&I.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?I.setTextureCube(C,0):C.isData3DTexture?I.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?I.setTexture2DArray(C,0):I.setTexture2D(C,0),Ue.unbindTexture()},this.resetState=function(){T=0,b=0,E=null,Ue.reset(),yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=dt._getUnpackColorSpace()}}const ga=Ot.degToRad(38),cd=Ot.degToRad(45),ld=46,ni=11.5,A_=.38,R_=2.6,dd=.033;function C_(){const i=document.createElement("canvas");i.width=16,i.height=256;const e=i.getContext("2d");if(e){const n=e.createLinearGradient(0,0,0,256);n.addColorStop(0,"#0c1322"),n.addColorStop(.5,"#152036"),n.addColorStop(1,"#1e2c46"),e.fillStyle=n,e.fillRect(0,0,16,256)}const t=new gc(i);return t.colorSpace=jt,t}class ud{container;scene;camera;renderer;callbacks=new Set;rafId=null;lastTime=0;elapsed=0;currentTarget=new k(0,0,0);desiredTarget=new k(0,0,0);currentAzimuth=cd;desiredAzimuth=cd;currentZoom=1.05;desiredZoom=1.05;boardHalfExtent=12;lastBoardMapSize=null;idleOrbitEnabled=!1;sunLight=null;resizeObserver=null;handleWindowResize;constructor(e){this.container=e,this.scene=new vu,this.scene.background=C_(),this.scene.fog=null;const t=Math.max(e.clientWidth,1),n=Math.max(e.clientHeight,1),s=t/n;this.camera=new Io(-ni*s,ni*s,ni,-ni,.1,190),this.camera.zoom=this.currentZoom;const r=typeof window<"u"&&!!window.EldermereAndroid;this.renderer=new Ru({antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:r}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,n),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=qd,this.renderer.toneMapping=Rc,this.renderer.toneMappingExposure=1.06,this.renderer.outputColorSpace=jt,this.renderer.domElement.style.touchAction="none",e.innerHTML="",e.appendChild(this.renderer.domElement),this.setupLighting(),this.updateCameraTransform(),this.handleWindowResize=()=>this.resize(),window.addEventListener("resize",this.handleWindowResize),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e))}setupLighting(){const e=new Su("#d6ebff","#586a85",.78);e.position.set(0,30,0),this.scene.add(e);const t=new So("#fff6e6",2.3);t.position.set(36,44,6),t.castShadow=!0,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,t.shadow.camera.near=2,t.shadow.camera.far=135;const n=24;t.shadow.camera.left=-n,t.shadow.camera.right=n,t.shadow.camera.top=n,t.shadow.camera.bottom=-n,t.shadow.bias=-4e-4,t.shadow.normalBias=.03,t.shadow.radius=2.5,this.sunLight=t,this.scene.add(t);const s=new So("#bdd6ff",.36);s.position.set(-22,16,-20),this.scene.add(s)}setBoardBounds(e,t=2){if(this.boardHalfExtent=e*t*.54,this.sunLight){const n=Math.max(20,e*t*.85),s=this.sunLight.shadow.camera;s.left=-n,s.right=n,s.top=n,s.bottom=-n,s.far=Math.max(110,n*4.2),s.updateProjectionMatrix()}if(this.lastBoardMapSize!==e){this.lastBoardMapSize=e;const n=e>=18?.82:e>=16?.88:1.05;this.currentZoom=n,this.desiredZoom=n,this.camera.zoom=n,this.camera.updateProjectionMatrix()}this.clampDesiredTarget()}onUpdate(e){return this.callbacks.add(e),()=>{this.callbacks.delete(e)}}start(){if(this.rafId!==null)return;this.lastTime=performance.now();const e=t=>{this.rafId=requestAnimationFrame(e);const n=(t-this.lastTime)/1e3;this.lastTime=t;const s=Math.min(Math.max(n,0),dd);this.elapsed+=s,this.stepCamera(s);for(const r of this.callbacks)r(s,this.elapsed);this.renderer.render(this.scene,this.camera)};this.rafId=requestAnimationFrame(e)}stop(){this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null)}renderOnce(){this.stepCamera(0);for(const e of this.callbacks)e(0,this.elapsed);this.renderer.render(this.scene,this.camera)}resize(){const e=Math.max(this.container.clientWidth,1),t=Math.max(this.container.clientHeight,1),n=e/t;this.camera.left=-ni*n,this.camera.right=ni*n,this.camera.top=ni,this.camera.bottom=-ni,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.rafId===null&&this.renderer.render(this.scene,this.camera)}panByScreenDelta(e,t){const n=Math.max(this.container.clientHeight,1),s=ni*2/(n*this.currentZoom),r=Math.cos(this.currentAzimuth),o=Math.sin(this.currentAzimuth),a=-o,c=-r,d=r,l=-o,u=1/Math.sin(ga),f=-e*s,h=t*s*u;this.desiredTarget.x+=d*f+a*h,this.desiredTarget.z+=l*f+c*h,this.clampDesiredTarget()}panByAxes(e,t,n){if(e===0&&t===0)return;const s=16/this.currentZoom*n,r=Math.cos(this.currentAzimuth),o=Math.sin(this.currentAzimuth),a=-o,c=-r,d=r,l=-o;this.desiredTarget.x+=(d*e+a*t)*s,this.desiredTarget.z+=(l*e+c*t)*s,this.clampDesiredTarget()}zoomBy(e){const t=Ot.clamp(e,-220,220),n=Math.exp(-t*.0014);this.zoomByFactor(n)}zoomByFactor(e){!Number.isFinite(e)||e<=0||(this.desiredZoom=Ot.clamp(this.desiredZoom*e,A_,R_))}rotateStep(e){this.desiredAzimuth+=e*(Math.PI/2)}setIdleOrbit(e){this.idleOrbitEnabled=e,e||(this.desiredAzimuth=this.currentAzimuth)}focusOnWorld(e,t=!1){this.desiredTarget.set(e.x,0,e.z),this.clampDesiredTarget(),t&&(this.currentTarget.copy(this.desiredTarget),this.updateCameraTransform())}getDomElement(){return this.renderer.domElement}clampDesiredTarget(){this.desiredTarget.x=Ot.clamp(this.desiredTarget.x,-this.boardHalfExtent,this.boardHalfExtent),this.desiredTarget.z=Ot.clamp(this.desiredTarget.z,-this.boardHalfExtent,this.boardHalfExtent)}stepCamera(e){const t=Math.min(Math.max(e,0),dd);this.idleOrbitEnabled&&(this.desiredAzimuth+=t*.14);const n=1-Math.exp(-11.5*t),s=1-Math.exp(-10.5*t),r=1-Math.exp(-12.5*t);this.currentTarget.distanceToSquared(this.desiredTarget)>1e-7?this.currentTarget.lerp(this.desiredTarget,n):this.currentTarget.copy(this.desiredTarget),Math.abs(this.desiredAzimuth-this.currentAzimuth)>1e-5?this.currentAzimuth=Ot.lerp(this.currentAzimuth,this.desiredAzimuth,s):this.currentAzimuth=this.desiredAzimuth,Math.abs(this.desiredZoom-this.currentZoom)>1e-5?this.currentZoom=Ot.lerp(this.currentZoom,this.desiredZoom,r):this.currentZoom=this.desiredZoom,this.updateCameraTransform()}updateCameraTransform(){const e=Math.cos(ga)*ld,t=Math.sin(ga)*ld;this.camera.position.set(this.currentTarget.x+Math.sin(this.currentAzimuth)*e,this.currentTarget.y+t,this.currentTarget.z+Math.cos(this.currentAzimuth)*e),this.camera.lookAt(this.currentTarget),Math.abs(this.camera.zoom-this.currentZoom)>1e-6&&(this.camera.zoom=this.currentZoom,this.camera.updateProjectionMatrix())}dispose(){this.stop(),window.removeEventListener("resize",this.handleWindowResize),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.renderer.dispose()}}function rt(i,e,t){return e*t+i}function we(i,e,t){return e<0||t<0||e>=i.mapSize||t>=i.mapSize?null:i.tiles[t*i.mapSize+e]??null}const pr=2,mr=2,gr=3,yc=2,Cu={berries:1,game:1,ore:1,mithril:2,ruins:0};function xt(i,e){return Math.max(Math.abs(i.x-e.x),Math.abs(i.y-e.y))}function qe(i,e){return i.players.find(t=>t.id===e)}function ws(i){return i.players[i.activePlayerIndex]}function dn(i,e){return Object.values(i.cities).filter(t=>t.ownerId===e)}function zc(i,e){return Object.values(i.units).filter(t=>t.ownerId===e)}function Qi(i,e,t){const n=[];for(let s=-1;s<=1;s++)for(let r=-1;r<=1;r++){if(r===0&&s===0)continue;const o=we(i,e+r,t+s);o&&n.push(o)}return n}function Ee(i,e){return i.techs.includes(e)}function Iu(i){return i.techs.some(e=>en[e]?.unlocksMountainPass===!0)}function I_(i,e){const t=Ut[e.type].traits.slice(),n=qe(i,e.ownerId);return n&&n.faction==="dwarves"&&e.type==="catapult"&&Ee(n,"dwarves_siegecraft")&&!t.includes("fortify")&&t.push("fortify"),t}function ln(i,e,t){return I_(i,e).includes(t)}function xo(i,e){const t=Ut[e.type].range,n=qe(i,e.ownerId);return n&&e.type==="archer"&&Ee(n,"orcs_fell_volley")?Math.min(3,t+1):t}function Gc(i,e,t){let n=Ut[t].cost;const s=qe(i,e);return s&&(t==="catapult"&&Ee(s,"orcs_siege_works")&&(n=Math.min(n,6)),t==="catapult"&&Ee(s,"dwarves_dragon_slayers")&&(n=Math.max(1,n-1)),t==="uruk_berserker"&&Ee(s,"orcs_black_gate")&&(n=Math.max(1,n-1))),n}function Pu(i,e,t){let n=Ut[t].maxHp;const s=qe(i,e);return s&&(t==="defender"&&Ee(s,"dwarves_shieldbearers")&&(n+=2),t==="catapult"&&Ee(s,"dwarves_siegecraft")&&(n+=5),(t==="rider"||t==="rohirrim_knight")&&Ee(s,"humans_ride_of_rohirrim")&&(n+=3),t==="rider"&&Ee(s,"orcs_pack_tactics")&&(n+=3),t==="uruk_berserker"&&Ee(s,"orcs_black_gate")&&(n+=3),t==="elven_sentinel"&&Ee(s,"elves_galadhrim_precision")&&(n+=3),(t==="ironbreaker"||t==="defender")&&Ee(s,"dwarves_mithril_phalanx")&&(n+=4),t==="catapult"&&Ee(s,"dwarves_dragon_slayers")&&(n+=5)),n}function Do(i,e){const t=qe(i,e.ownerId);let n=Math.min(4,e.level+1);return t&&Ee(t,"humans_granaries")&&e.level>=3&&(n+=1),t&&Ee(t,"humans_stewards_citadel")&&(n+=1),t&&Ee(t,"orcs_war_barracks")&&(n+=1),t&&Ee(t,"dwarves_deep_vaults")&&(n+=1),n}function Lo(i,e){const t=i.cities[e];if(!t)return 0;let n=0;for(const s of Object.values(i.units))s.ownerId===t.ownerId&&s.homeCityId===e&&n++;return n}function Vc(i,e){const t=i.cities[e];if(!t)return[];const n=qe(i,t.ownerId);if(!n)return[];const s=new Set(["warrior"]);for(const r of n.techs){const o=en[r];if(o)for(const a of o.unlocksUnits)s.add(a)}return th.filter(r=>s.has(r))}function Uo(i,e,t){const n=qe(i,e),s=en[t];if(!n||!s)return 999;const r=Math.max(1,dn(i,e).length);let a=(s.tier===1?3:s.tier===2?5:8)+(r-1);return Ee(n,"elves_elven_lore")&&(a=Math.max(2,a-1)),a}function Wc(i,e,t){const n=qe(i,e),s=en[t];return!n||!n.alive||!s||s.faction!==n.faction||Ee(n,t)||!s.prerequisites.every(r=>Ee(n,r))?!1:n.gold>=Uo(i,e,t)}function hd(i,e){const t=we(i,e.x,e.y);if(!t||!t.unitId)return!1;const n=i.units[t.unitId];return n!==void 0&&n.ownerId!==e.ownerId}function $c(i,e,t,n){const s=we(i,t,n);if(!s)return!1;if(s.hasVillage&&!s.cityId)return!0;if(s.isCityCenter&&s.cityId){const r=i.cities[s.cityId];if(r&&r.ownerId!==e)return!0}return!1}function vi(i,e){const t=i.units[e];if(!t||t.canCapture!==!0||t.actedThisTurn||t.hasMoved||t.hasAttacked)return!1;const n=qe(i,t.ownerId);return!n||!n.alive?!1:$c(i,t.ownerId,t.x,t.y)}function Du(i,e,t){const n=we(i,e,t);return n!==null&&n.resource==="ruins"}function yi(i,e){const t=i.units[e];if(!t||t.canExploreRuins!==!0||t.actedThisTurn||t.hasMoved||t.hasAttacked)return!1;const n=qe(i,t.ownerId);return!n||!n.alive?!1:Du(i,t.x,t.y)}function Lu(i,e){const t=dn(i,e),n=t.filter(c=>c.isCapital),s=new Set;if(n.length===0)return s;for(const c of t){if(c.isCapital){s.add(c.id);continue}for(const d of n)if(xt(c,d)<=4){s.add(c.id);break}}const r=new Uint8Array(i.mapSize*i.mapSize),o=[];for(const c of n){const d=rt(c.x,c.y,i.mapSize);r[d]||(r[d]=1,o.push({x:c.x,y:c.y}))}let a=0;for(;a<o.length;){const c=o[a++],d=we(i,c.x,c.y);if(d&&d.isCityCenter&&d.cityId){const l=i.cities[d.cityId];l&&l.ownerId===e&&s.add(l.id)}for(const l of Qi(i,c.x,c.y)){const u=rt(l.x,l.y,i.mapSize);if(r[u])continue;const f=l.isCityCenter&&l.cityId!==null&&i.cities[l.cityId]?.ownerId===e;!(l.isCityCenter&&l.cityId!==null&&i.cities[l.cityId]?.ownerId!==e)&&(l.hasRoad||f)&&(r[u]=1,o.push({x:l.x,y:l.y}))}}return s}function Uu(i,e){const t=qe(i,e);if(!t||!t.alive)return 0;const n=dn(i,e);if(n.length===0)return 0;let s=0;n.some(c=>c.isCapital&&!hd(i,c))&&(s+=1);const o=t.faction==="humans"?Lu(i,e):null,a=new Set;for(const c of n)hd(i,c)||(a.add(c.id),s+=c.level,c.hasWorkshop&&(s+=1),s+=c.parks,t.faction==="humans"&&!c.isCapital&&o?.has(c.id)&&(s+=1),Ee(t,"humans_granaries")&&c.level>=3&&(s+=1),Ee(t,"humans_citadel_masonry")&&c.hasWalls&&(s+=1),Ee(t,"humans_stewards_citadel")&&(s+=1),Ee(t,"dwarves_deep_vaults")&&(s+=1));if(a.size>0){const c=t.faction==="elves",d=Ee(t,"humans_milling"),l=Ee(t,"orcs_mount_doom"),u=Ee(t,"elves_lothlorien_sanctum"),f=Ee(t,"dwarves_heart_of_mountain"),h={};for(const g of i.tiles)if(!(!g.cityId||!a.has(g.cityId))&&(c&&g.terrain==="ancient_woods"&&g.improvement===null&&(h[g.cityId]=(h[g.cityId]??0)+1),g.improvement!==null)){if(s+=Di[g.improvement].goldPerTurn,g.improvement==="windmill"&&d){let _=0;for(const m of Qi(i,g.x,g.y))m.improvement==="farm"&&_++;s+=_}g.improvement==="foundry"&&l&&(s+=1),g.improvement==="sanctuary"&&u&&(s+=1),f&&(g.improvement==="mine"||g.improvement==="great_forge")&&(s+=1)}if(c){const g=u?5:3;for(const _ of a){const m=h[_]??0;m>0&&(s+=Math.min(g,m))}}}return s}function Xc(i,e){const t=qe(i,e);if(!t)return 0;let n=0;const s=dn(i,e);for(const o of s)n+=100,n+=50*o.level,n+=250*o.parks;for(let o=0;o<t.revealedTiles.length;o++)t.revealedTiles[o]&&(n+=10);for(const o of t.techs){const a=en[o];a&&(n+=a.tier===1?100:a.tier===2?200:350)}Ee(t,"elves_rings_preservation")&&(n+=t.techs.length*100);const r=zc(i,e);return n+=r.length*25,n}function P_(i){const e=i.players.map(t=>({playerId:t.id,faction:t.faction,name:t.name,score:Xc(i,t.id),citiesCount:dn(i,t.id).length,unitsCount:zc(i,t.id).length,techsCount:t.techs.length,isEliminated:!t.alive,isHuman:t.isHuman,rank:0}));e.sort((t,n)=>n.score!==t.score?n.score-t.score:n.citiesCount!==t.citiesCount?n.citiesCount-t.citiesCount:t.isEliminated!==n.isEliminated?t.isEliminated?1:-1:0);for(let t=0;t<e.length;t++)e[t].rank=t+1;return e}function D_(i,e){return!(e.terrain==="water"||e.terrain==="mountain"&&!Iu(i))}function L_(i,e,t,n){for(const s of Qi(i,t,n))if(s.unitId!==null){const r=i.units[s.unitId];if(r&&r.ownerId!==e)return!0}return!1}function xr(i,e){const t=i.units[e];if(!t)return[];if(t.actedThisTurn)return[];if(t.hasMoved&&!t.canEscapeMove)return[];if(t.hasAttacked&&!t.canEscapeMove)return[];const n=qe(i,t.ownerId);if(!n||!n.alive)return[];const s=we(i,t.x,t.y);if(!s)return[];let r=Ut[t.type].movement;n.faction==="humans"&&s.hasRoad&&(r+=1),Ee(n,"humans_ride_of_rohirrim")&&(t.type==="rider"||t.type==="rohirrim_knight")&&(r+=1);const o=i.mapSize,a=new Int8Array(o*o);a.fill(-1);const c=rt(t.x,t.y,o);a[c]=r;const d=[{x:t.x,y:t.y,rem:r}],l=[],u=new Uint8Array(o*o);for(;d.length>0;){let f=0;for(let m=1;m<d.length;m++)d[m].rem>d[f].rem&&(f=m);const h=d.splice(f,1)[0],g=rt(h.x,h.y,o);if(!(h.rem<a[g]||h.rem<=0||!(h.x===t.x&&h.y===t.y)&&L_(i,t.ownerId,h.x,h.y)))for(const m of Qi(i,h.x,h.y)){if(!D_(n,m))continue;if(m.unitId!==null){const M=i.units[m.unitId];if(M&&M.ownerId!==t.ownerId)continue}let p=h.rem-1;const v=m.terrain==="forest"||m.terrain==="ancient_woods";(m.terrain==="mountain"||v&&n.faction!=="elves"&&!m.hasRoad)&&(p=0);const y=rt(m.x,m.y,o);m.unitId===null&&!u[y]&&(u[y]=1,l.push({x:m.x,y:m.y})),p>a[y]&&(a[y]=p,d.push({x:m.x,y:m.y,rem:p}))}}return l}function Ps(i,e){const t=i.units[e];if(!t)return[];if(t.actedThisTurn)return[];if(t.hasAttacked&&!t.canPersistAttack)return[];if(t.canEscapeMove)return[];if(t.hasMoved&&!ln(i,t,"dash"))return[];const n=qe(i,t.ownerId);if(!n||!n.alive)return[];const s=xo(i,t),r=[];for(const o of Object.values(i.units)){if(o.ownerId===t.ownerId)continue;const a=xt(t,o);if(a<1||a>s)continue;const c=rt(o.x,o.y,i.mapSize);n.revealedTiles[c]&&r.push({x:o.x,y:o.y})}return r}function br(i,e){if(i.phase==="game_over")return!1;const t=i.units[e];if(!t||t.actedThisTurn)return!1;const n=qe(i,t.ownerId);return!n||!n.alive?!1:!!(vi(i,t.id)||yi(i,t.id)||(!t.hasMoved||t.canEscapeMove)&&xr(i,t.id).length>0||(!t.hasAttacked||t.canPersistAttack)&&Ps(i,t.id).length>0||!t.hasMoved&&!t.hasAttacked&&t.hp<t.maxHp||(t.canPromote||t.kills>=3)&&!t.isVeteran)}function ku(i,e,t,n){const s=Di[n];let r=s.basePop;if(s.adjacentBonusTo&&s.adjacentPopPerMatch){let o=0;for(const a of Qi(i,e,t))a.improvement===s.adjacentBonusTo&&o++;r+=o*s.adjacentPopPerMatch}return r}function Ss(i,e,t,n){const s=qe(i,e),r=we(i,t,n);if(!s||!s.alive||!r)return[];const o=rt(t,n,i.mapSize);if(!s.revealedTiles[o])return[];const a=[],c=r.cityId?i.cities[r.cityId]:null,d=c!==null&&c.ownerId===e,l=r.cityId===null;if(d&&r.resource!==null&&r.resource!=="ruins"&&s.gold>=pr&&s.techs.some(f=>en[f]?.unlocksResources.includes(r.resource))&&a.push({type:"HARVEST_TILE",coord:{x:t,y:n}}),d&&!r.isCityCenter&&r.improvement===null&&r.resource!=="ruins"){const u=new Set;for(const f of s.techs)for(const h of en[f]?.unlocksImprovements??[])u.add(h);for(const f of u){const h=Di[f];h.allowedTerrains.includes(r.terrain)&&(s.gold<h.cost||a.push({type:"BUILD_IMPROVEMENT",coord:{x:t,y:n},improvement:f}))}}return(d||l)&&!r.hasRoad&&!r.isCityCenter&&r.terrain!=="water"&&r.terrain!=="mountain"&&s.gold>=mr&&s.techs.some(f=>en[f]?.unlocksRoad===!0)&&a.push({type:"BUILD_ROAD",coord:{x:t,y:n}}),d&&!r.isCityCenter&&(r.terrain==="forest"||r.terrain==="ancient_woods")&&s.techs.some(f=>en[f]?.unlocksChopForest===!0)&&a.push({type:"CHOP_FOREST",coord:{x:t,y:n}}),d&&!r.isCityCenter&&r.terrain==="plains"&&r.improvement===null&&r.resource===null&&s.gold>=gr&&s.techs.some(f=>en[f]?.unlocksPlantWoods===!0)&&a.push({type:"PLANT_ANCIENT_WOODS",coord:{x:t,y:n}}),a}const U_={berries:{label:"Berries",icon:"🫐"},game:{label:"Game",icon:"🦌"},ore:{label:"Ore",icon:"⛏️"},mithril:{label:"Starsteel",icon:"💎"},ruins:{label:"Ruins",icon:"🏛️"}},k_={farm:"🌾",windmill:"🌬️",slag_pit:"🕳️",foundry:"🔥",sanctuary:"🌿",mine:"⛏️",great_forge:"⚒️"},N_={warrior:"⚔️",defender:"🛡️",archer:"🏹",rider:"🐎",catapult:"🪨",rohirrim_knight:"🐴",uruk_berserker:"🪓",elven_sentinel:"🌟",ironbreaker:"⚒️"};function fd(i,e,t,n){const s=qe(i,e),r=we(i,t,n);if(!s||!s.alive||!r)return[];const o=rt(t,n,i.mapSize);if(!s.revealedTiles[o])return[];const a=[],c=mi(s.faction),d=r.cityId?i.cities[r.cityId]:null,l=d!==null&&d.ownerId===e,u=r.cityId===null;if(r.resource!==null&&r.resource!=="ruins"){const _=r.resource,m=c.find(p=>p.unlocksResources.includes(_));if(m){const p=U_[_],v=Cu[_];let y;l?Ee(s,m.id)?s.gold<pr&&(y=`Need ${pr}★ (have ${s.gold}★)`):y=`Requires ${m.name}`:y="Outside your borders",a.push({id:`harvest_${_}`,label:`Harvest ${p.label}`,description:`+${v} Pop to city`,cost:pr,icon:p.icon,enabled:!y,disabledReason:y,action:y?void 0:{type:"HARVEST_TILE",coord:{x:t,y:n}}})}}if(!r.isCityCenter&&r.improvement===null&&r.resource!=="ruins"){const _=new Set;for(const m of c)for(const p of m.unlocksImprovements){if(_.has(p))continue;const v=Di[p];if(!v.allowedTerrains.includes(r.terrain))continue;_.add(p);const y=ku(i,t,n,p);let M;l?Ee(s,m.id)?s.gold<v.cost&&(M=`Need ${v.cost}★ (have ${s.gold}★)`):M=`Requires ${m.name}`:M="Outside your borders";const x=p==="windmill"&&Ee(s,"humans_milling")?Qi(i,t,n).filter(w=>w.improvement==="farm").length:0,T=v.goldPerTurn+x+(p==="mine"&&Ee(s,"dwarves_heart_of_mountain")?1:0)+(p==="great_forge"&&Ee(s,"dwarves_heart_of_mountain")?1:0)+(p==="foundry"&&Ee(s,"orcs_mount_doom")?1:0)+(p==="sanctuary"&&Ee(s,"elves_lothlorien_sanctum")?1:0),b=[];y>0&&b.push(`+${y} Pop`),T>0&&b.push(`+${T}★/turn`);const E=b.length>0?b.join(", "):v.description;a.push({id:`build_${p}`,label:`Build ${v.name}`,description:E,cost:v.cost,icon:k_[p],enabled:!M,disabledReason:M,action:M?void 0:{type:"BUILD_IMPROVEMENT",coord:{x:t,y:n},improvement:p}})}}const f=c.find(_=>_.unlocksRoad===!0);if(f&&!r.hasRoad&&!r.isCityCenter&&r.terrain!=="water"&&r.terrain!=="mountain"){let _;l||u?Ee(s,f.id)?s.gold<mr&&(_=`Need ${mr}★ (have ${s.gold}★)`):_=`Requires ${f.name}`:_="Enemy territory",a.push({id:"build_road",label:"Build Road",description:"Connects cities & boosts movement",cost:mr,icon:"🛤️",enabled:!_,disabledReason:_,action:_?void 0:{type:"BUILD_ROAD",coord:{x:t,y:n}}})}const h=c.find(_=>_.unlocksChopForest===!0);if(h&&!r.isCityCenter&&(r.terrain==="forest"||r.terrain==="ancient_woods")){let _;l?Ee(s,h.id)||(_=`Requires ${h.name}`):_="Outside your borders",a.push({id:"chop_forest",label:"Chop Forest",description:`Clear woods for +${yc}★`,cost:0,icon:"🪓",enabled:!_,disabledReason:_,action:_?void 0:{type:"CHOP_FOREST",coord:{x:t,y:n}}})}const g=c.find(_=>_.unlocksPlantWoods===!0);if(g&&!r.isCityCenter&&r.terrain==="plains"&&r.improvement===null&&r.resource===null){let _;l?Ee(s,g.id)?s.gold<gr&&(_=`Need ${gr}★ (have ${s.gold}★)`):_=`Requires ${g.name}`:_="Outside your borders",a.push({id:"plant_ancient_woods",label:"Plant Ancient Woods",description:"+1 Pop & +1★/turn Woodland Grace",cost:gr,icon:"🌳",enabled:!_,disabledReason:_,action:_?void 0:{type:"PLANT_ANCIENT_WOODS",coord:{x:t,y:n}}})}return a}function O_(i,e){const t=i.cities[e];if(!t)return[];const n=qe(i,t.ownerId);if(!n)return[];const s=bt[n.faction],r=mi(n.faction),o=[...eh,s.uniqueUnit],a=we(i,t.x,t.y),c=!a||a.unitId!==null,d=Lo(i,t.id),l=Do(i,t),u=d>=l,f=new Set(Vc(i,t.id));return o.map(h=>{const g=Ut[h],_=Gc(i,n.id,h),m=Pu(i,n.id,h);let p;if(f.has(h))c?p="City tile occupied":u?p=`Unit cap reached (${d}/${l})`:n.gold<_&&(p=`Need ${_}★ (have ${n.gold}★)`);else{const v=r.find(y=>y.unlocksUnits.includes(h));p=v?`Requires ${v.name}`:"Locked"}return{id:`train_${h}`,label:g.name,description:`${m} HP · ${g.attack} ATK · ${g.defense} DEF · ${g.movement} MOV`,cost:_,icon:N_[h],unitType:h,enabled:!p,disabledReason:p,action:p?void 0:{type:"TRAIN_UNIT",cityId:t.id,unitType:h}}})}function F_(i,e){const t=i.units[e];if(!t)return[];const n=qe(i,t.ownerId);if(!n)return[];const s=we(i,t.x,t.y),r=[];if(s&&$c(i,n.id,t.x,t.y)){const l=s.hasVillage&&!s.cityId,u=vi(i,t.id);r.push({id:"capture-city",label:l?"Claim Village":"Capture City",description:l?"Found a new city (ends unit turn)":"Seize enemy city (ends unit turn)",icon:"crown",enabled:u,disabledReason:u?void 0:"Capture next turn",action:u?{type:"CAPTURE_CITY",unitId:t.id}:void 0})}if(s&&s.resource==="ruins"){const l=yi(i,t.id);r.push({id:"explore-ruins",label:"Explore Ruins",description:"Claim ancient treasure",icon:"ruins",enabled:l,disabledReason:l?void 0:"Explore next turn",action:l?{type:"EXPLORE_RUINS",unitId:t.id}:void 0})}const a=s!==null&&s.cityId!==null&&i.cities[s.cityId]?.ownerId===n.id?4:2;let c;t.hp>=t.maxHp?c="Full HP":(t.hasMoved||t.hasAttacked||t.actedThisTurn)&&(c="Already acted");let d;return t.isVeteran?d="Already Veteran":!t.canPromote&&t.kills<3&&(d=`Kills: ${t.kills}/3`),r.push({id:"recover",label:"Recover",description:`Heal +${a} HP (ends unit turn)`,icon:"💚",enabled:!c,disabledReason:c,action:c?void 0:{type:"RECOVER_UNIT",unitId:t.id}},{id:"promote",label:"Promote to Veteran",description:"+5 maxHP & full heal",icon:"⭐",enabled:!d,disabledReason:d,action:d?void 0:{type:"PROMOTE_UNIT",unitId:t.id}}),r}const J=256,B_={grass:{roughness:.88,metalness:0,bumpScale:.028},forest_floor:{roughness:.9,metalness:0,bumpScale:.032},ancient_floor:{roughness:.85,metalness:.02,bumpScale:.03},wasteland:{roughness:.9,metalness:.04,bumpScale:.055},water:{roughness:.24,metalness:.08,bumpScale:.032},rock:{roughness:.86,metalness:.02,bumpScale:.054},orc_rock:{roughness:.84,metalness:.06,bumpScale:.06},snow:{roughness:.72,metalness:.02,bumpScale:.024},bark:{roughness:.92,metalness:0,bumpScale:.05},foliage:{roughness:.84,metalness:0,bumpScale:.032},mallorn_foliage:{roughness:.8,metalness:.03,bumpScale:.032},cobble:{roughness:.85,metalness:.02,bumpScale:.048},stone_masonry:{roughness:.86,metalness:.02,bumpScale:.048},marble_masonry:{roughness:.6,metalness:.05,bumpScale:.034},dark_iron:{roughness:.46,metalness:.56,bumpScale:.048},granite_runic:{roughness:.82,metalness:.06,bumpScale:.052},roof_shingles:{roughness:.82,metalness:.02,bumpScale:.046},thatch:{roughness:.92,metalness:0,bumpScale:.048},timber:{roughness:.86,metalness:0,bumpScale:.042},farm_soil:{roughness:.94,metalness:0,bumpScale:.058},wheat:{roughness:.86,metalness:0,bumpScale:.04},road_cobble:{roughness:.85,metalness:.02,bumpScale:.048},bedrock_skirt:{roughness:.92,metalness:0,bumpScale:.05},cloud:{roughness:.95,metalness:0,bumpScale:.018}};function an(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function un(i,e,t){let n=Math.imul(i,374761393)+Math.imul(e,668265263)+Math.imul(t,1442695041);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function zt(i,e){return(i%e+e)%e}function xe(i){return i<0?0:i>255?255:Math.round(i)}function bo(i){return i<0?0:i>1?1:i}function _a(i,e,t){return i+(e-i)*t}function tt(i,e,t){const n=bo((t-i)/(e-i));return n*n*(3-2*n)}function Nt(i,e,t,n,s){const r=i*t,o=e*n,a=Math.floor(r),c=Math.floor(o),d=r-a,l=o-c,u=d*d*(3-2*d),f=l*l*(3-2*l),h=zt(a,t),g=zt(a+1,t),_=zt(c,n),m=zt(c+1,n),p=un(h,_,s),v=un(g,_,s),y=un(h,m,s),M=un(g,m,s),x=p+(v-p)*u,T=y+(M-y)*u;return x+(T-x)*f}function _i(i,e,t,n,s,r){let o=0,a=.5,c=0,d=t,l=n;for(let u=0;u<s;u++)o+=a*Nt(i,e,d,l,r+u*97),c+=a,a*=.5,d*=2,l*=2;return o/c}const H_={d1:0,d2:0,edge:0,cellHash:0,dx:0,dy:0};function Ws(i,e,t,n,s,r,o=H_){const a=i*t,c=e*n,d=Math.floor(a),l=Math.floor(c);let u=1e9,f=1e9,h=0,g=0,_=0;for(let m=-1;m<=1;m++)for(let p=-1;p<=1;p++){const v=d+p,y=l+m,M=zt(v,t),x=zt(y,n),T=(un(M,x,r)-.5)*s,b=(un(M,x,r+53)-.5)*s,E=v+.5+T,w=y+.5+b,S=a-E,R=c-w,P=Math.hypot(S,R);P<u?(f=u,u=P,h=un(M,x,r+131),g=S,_=R):P<f&&(f=P)}return o.d1=u,o.d2=f,o.edge=f-u,o.cellHash=h,o.dx=g,o.dy=_,o}function fn(i,e=J){for(let t=-e;t<=e;t+=e)for(let n=-e;n<=e;n+=e)i(n,t)}function $s(i,e=J){i(-e),i(0),i(e)}function ne(i,e,t,n=1){const s=xe(i),r=xe(e),o=xe(t);return n>=1?`rgb(${s},${r},${o})`:`rgba(${s},${r},${o},${n.toFixed(3)})`}function He(i,e=1){const t=xe(i);return e>=1?`rgb(${t},${t},${t})`:`rgba(${t},${t},${t},${e.toFixed(3)})`}function Sn(i,e,t){const n=i.createImageData(J,J),s=e.createImageData(J,J),r=n.data,o=s.data,a=1/J;for(let c=0;c<J;c++){const d=c*a;for(let l=0;l<J;l++){const u=(c*J+l)*4;t(l*a,d,l,c,r,o,u),r[u+3]=255,o[u+3]=255}}i.putImageData(n,0,0),e.putImageData(s,0,0)}function qn(i,e,t,n,s,r){const o=Math.min(r,n*.5,s*.5);i.beginPath(),i.moveTo(e+o,t),i.lineTo(e+n-o,t),i.quadraticCurveTo(e+n,t,e+n,t+o),i.lineTo(e+n,t+s-o),i.quadraticCurveTo(e+n,t+s,e+n-o,t+s),i.lineTo(e+o,t+s),i.quadraticCurveTo(e,t+s,e,t+s-o),i.lineTo(e,t+o),i.quadraticCurveTo(e,t,e+o,t),i.closePath()}function z_(i,e){Sn(i,e,(n,s,r,o,a,c,d)=>{const l=_i(n,s,3,3,3,11),u=Nt(n+.13*Math.sin(s*Math.PI*2),s,5,5,29),f=Math.min(n,1-n,s,1-s),h=1-tt(0,.085,f),g=(n+s<1?1:-1)*h*5,_=228+(l-.5)*24+(u-.5)*10+g;a[d]=xe(_-3+(l-.5)*6),a[d+1]=xe(_+4),a[d+2]=xe(_-7);const m=132+(l-.5)*34+(u-.5)*16-h*16,p=xe(m);c[d]=p,c[d+1]=p,c[d+2]=p});const t=an(101);for(let n=0;n<48;n++){const s=t()*J,r=t()*J,o=14+t()*24,a=5+t()*8,c=-.35+(t()-.5)*.55,d=t()>.45,l=d?ne(252,255,236,.24):ne(206,224,198,.22),u=d?He(156,.22):He(116,.2);fn((f,h)=>{i.save(),i.translate(s+f,r+h),i.rotate(c),i.fillStyle=l,i.beginPath(),i.ellipse(0,0,o,a,0,0,Math.PI*2),i.fill(),i.restore(),e.save(),e.translate(s+f,r+h),e.rotate(c),e.fillStyle=u,e.beginPath(),e.ellipse(0,0,o,a,0,0,Math.PI*2),e.fill(),e.restore()})}for(let n=0;n<62;n++){const s=t()*J,r=t()*J,o=.75+t()*.6,a=t()>.3;fn((c,d)=>{const l=s+c,u=r+d;i.fillStyle=ne(194,212,184,.35),i.beginPath(),i.ellipse(l+1,u+1.5,4.5*o,1.8*o,0,0,Math.PI*2),i.fill(),i.strokeStyle=a?ne(252,255,234,.72):ne(214,232,204,.65),i.lineWidth=1.6*o,i.lineCap="round",e.strokeStyle=He(192,.65),e.lineWidth=1.8*o,e.lineCap="round";const f=[-4.2,-.4,3.8],h=[6.2,8,5.8];for(let g=0;g<3;g++){const _=f[g]*o,m=h[g]*o;i.beginPath(),i.moveTo(l,u),i.quadraticCurveTo(l+_*.35,u-m*.6,l+_,u-m),i.stroke(),e.beginPath(),e.moveTo(l,u),e.quadraticCurveTo(l+_*.35,u-m*.6,l+_,u-m),e.stroke()}})}}function pd(i,e,t){const n=t?317:211;Sn(i,e,(o,a,c,d,l,u,f)=>{const h=_i(o,a,4,4,3,n),g=tt(.42,.78,Nt(o,a,3,3,n+41)),_=Nt(o,a,8,8,n+83),m=(t?222:214)+(h-.5)*26+g*22+(_-.5)*8;t?(l[f]=xe(m+g*10-2),l[f+1]=xe(m+6),l[f+2]=xe(m-14-g*8)):(l[f]=xe(m+g*6-3),l[f+1]=xe(m+4),l[f+2]=xe(m-10));const p=xe(126+(h-.5)*44+(_-.5)*18);u[f]=p,u[f+1]=p,u[f+2]=p});const s=an(n+500);for(let o=0;o<42;o++){const a=s()*J,c=s()*J,d=8+s()*14,l=s()>.45,u=t?l?ne(246,250,212,.34):ne(202,232,206,.3):l?ne(236,246,214,.3):ne(196,216,188,.28);fn((f,h)=>{const g=i.createRadialGradient(a+f-d*.25,c+h-d*.25,d*.1,a+f,c+h,d);g.addColorStop(0,u),g.addColorStop(1,"rgba(220,235,210,0)"),i.fillStyle=g,i.beginPath(),i.arc(a+f,c+h,d,0,Math.PI*2),i.fill();const _=e.createRadialGradient(a+f,c+h,0,a+f,c+h,d);_.addColorStop(0,He(185,.35)),_.addColorStop(1,He(128,0)),e.fillStyle=_,e.beginPath(),e.arc(a+f,c+h,d,0,Math.PI*2),e.fill()})}const r=t?58:48;for(let o=0;o<r;o++){const a=s()*J,c=s()*J,d=s()*Math.PI*2,l=t?5.2+s()*4.5:3.5+s()*3.4,u=t?l*.44:l*.56,f=t?s()>.25?ne(255,240,168,.88):ne(255,224,128,.85):s()>.5?ne(246,228,194,.72):ne(222,232,198,.68);fn((h,g)=>{const _=a+h,m=c+g;i.save(),i.translate(_+1.1,m+1.3),i.rotate(d),i.fillStyle=ne(168,186,162,.35),i.beginPath(),i.moveTo(-l,0),i.quadraticCurveTo(0,-u,l,0),i.quadraticCurveTo(0,u,-l,0),i.fill(),i.restore(),i.save(),i.translate(_,m),i.rotate(d),i.fillStyle=f,i.beginPath(),i.moveTo(-l,0),i.quadraticCurveTo(0,-u,l,0),i.quadraticCurveTo(0,u,-l,0),i.fill(),t&&(i.strokeStyle=ne(255,252,226,.7),i.lineWidth=.8,i.beginPath(),i.moveTo(-l*.75,0),i.lineTo(l*.75,0),i.stroke()),i.restore(),e.save(),e.translate(_,m),e.rotate(d),e.fillStyle=He(205,.6),e.beginPath(),e.moveTo(-l,0),e.quadraticCurveTo(0,-u,l,0),e.quadraticCurveTo(0,u,-l,0),e.fill(),e.restore()})}if(t)for(let o=0;o<24;o++){const a=s()*J,c=s()*J,d=1.2+s()*1.4;fn((l,u)=>{i.fillStyle=ne(255,250,212,.75),i.beginPath(),i.arc(a+l,c+u,d,0,Math.PI*2),i.fill()})}}function G_(i,e){const t={d1:0,d2:0,edge:0,cellHash:0,dx:0,dy:0};Sn(i,e,(n,s,r,o,a,c,d)=>{const l=(Nt(n,s,4,4,401)-.5)*.035,u=(Nt(n,s,4,4,419)-.5)*.035,f=zt(n+l,1),h=zt(s+u,1),g=Ws(f,h,6,6,.82,433),_=Ws(f,h,12,12,.75,461,t),m=_i(n,s,5,5,3,479),p=1-tt(.015,.072,g.edge),v=(1-tt(.008,.038,_.edge))*.36,y=tt(.05,.095,g.edge)*(1-tt(.095,.16,g.edge)),M=228+(g.cellHash-.5)*20+(m-.5)*16,x=g.dx*-9+g.dy*-9;let T=M+x+y*14-p*86-v*34,b=M-2+x+y*12-p*88-v*36,E=M-5+x+y*10-p*84-v*34;const w=tt(.58,.84,m)*(1-p);T+=w*14,b+=w*11,E+=w*7;const S=Nt(n,s,16,16,499),R=(1-tt(0,.038,g.edge))*tt(.75,.91,S);R>.01&&(T=_a(T,255,R*.94),b=_a(b,146,R*.86),E=_a(E,48,R*.88)),a[d]=xe(T),a[d+1]=xe(b),a[d+2]=xe(E);const P=168+(g.cellHash-.5)*22+x*.9+y*28-p*125-v*46,D=xe(P);c[d]=D,c[d+1]=D,c[d+2]=D})}function V_(i,e){const t={d1:0,d2:0,edge:0,cellHash:0,dx:0,dy:0};Sn(i,e,(s,r,o,a,c,d,l)=>{const u=zt(s+Math.sin(r*Math.PI*2*2)*.025+(Nt(s,r,3,3,503)-.5)*.04,1),f=zt(r+Math.cos(s*Math.PI*2*2)*.025+(Nt(s,r,3,3,521)-.5)*.04,1),h=Ws(u,f,5,5,.85,541),g=Ws(zt(u+.37,1),zt(f+.21,1),7,7,.82,563,t),_=1-tt(0,.145,h.edge),m=(1-tt(0,.12,g.edge))*.65,p=bo(Math.max(_,m)+_*m*.4),v=.5+.32*Math.sin((s*2+r*1)*Math.PI*2+Nt(s,r,2,2,577)*2.2)+.18*Math.cos((s*1-r*2)*Math.PI*2),y=206+v*16+p*46,M=228+v*14+p*27,x=236+v*12+p*19;c[l]=xe(y),c[l+1]=xe(M),c[l+2]=xe(x);const T=xe(118+v*48+p*56);d[l]=T,d[l+1]=T,d[l+2]=T});const n=an(587);for(let s=0;s<26;s++){const r=n()*J,o=n()*J,a=18+n()*24,c=3+n()*4.5,d=1.6+n()*1.4;fn((l,u)=>{const f=r+l,h=o+u;i.strokeStyle=ne(248,255,255,.45),i.lineWidth=d,i.lineCap="round",i.beginPath(),i.moveTo(f-a*.5,h),i.bezierCurveTo(f-a*.18,h-c,f+a*.18,h+c,f+a*.5,h-c*.25),i.stroke(),e.strokeStyle=He(212,.35),e.lineWidth=d+1,e.lineCap="round",e.beginPath(),e.moveTo(f-a*.5,h),e.bezierCurveTo(f-a*.18,h-c,f+a*.18,h+c,f+a*.5,h-c*.25),e.stroke()})}}function md(i,e,t){const n=t?673:613;Sn(i,e,(o,a,c,d,l,u,f)=>{const h=_i(o,a,3,3,3,n)-.5,g=t?(o*3+a*2)*2+h*1.35:(o*2+a*1)*3+h*1.15,_=g-Math.floor(g),m=t?Math.pow(1-Math.abs(_*2-1),.72):tt(0,.16,_)*(1-tt(.84,1,_)*.55),p=1-tt(0,t?.12:.1,_),v=tt(.08,.22,_)*(1-tt(.22,.42,_)),y=Ws(o,a,t?7:5,t?7:5,.78,n+29),M=(y.cellHash-.5)*(t?28:22)+(y.dx-y.dy)*14,x=1-tt(.008,t?.042:.032,y.edge),T=Math.abs(Math.sin((o*1-a*2)*Math.PI*2+_i(o,a,4,4,3,n+71)*5.2)),b=1-tt(0,.035,T),w=(t?216:224)+(m-.5)*(t?34:26)+v*16-p*(t?46:34)+M-x*(t?54:38)+b*(t?-24:22);t?(l[f]=xe(w-2),l[f+1]=xe(w-3),l[f+2]=xe(w+3)):(l[f]=xe(w+2),l[f+1]=xe(w+1),l[f+2]=xe(w-2));const S=xe(138+(m-.5)*(t?74:56)+M*1.1-p*54-x*64);u[f]=S,u[f+1]=S,u[f+2]=S});const s=an(n+200),r=t?28:22;for(let o=0;o<r;o++){const a=s()*J,c=s()*J,d=14+s()*24,l=(t?-Math.atan2(3,2):-Math.atan2(2,1))+(s()-.5)*.16;fn((u,f)=>{i.save(),i.translate(a+u,c+f),i.rotate(l),i.strokeStyle=t?ne(246,248,255,.28):ne(254,252,246,.34),i.lineWidth=t?1.4:2,i.lineCap="round",i.beginPath(),i.moveTo(-d*.5,0),i.lineTo(d*.5,0),i.stroke(),i.restore()})}}function W_(i,e){Sn(i,e,(n,s,r,o,a,c,d)=>{const l=(_i(n,s,3,3,2,709)-.5)*.45,u=(n*2+s*1)*Math.PI*2+l*Math.PI*2,f=.5+.5*Math.sin(u+.35*Math.sin(u)),h=.5+.5*Math.sin((n*3-s*1)*Math.PI*2+l*3),g=f*.72+h*.28,_=1-g;a[d]=xe(254-_*36),a[d+1]=xe(255-_*23),a[d+2]=xe(255-_*8);const m=xe(102+g*116);c[d]=m,c[d+1]=m,c[d+2]=m});const t=an(733);for(let n=0;n<18;n++){const s=t()*J,r=t()*J,o=26+t()*34,a=-.42+(t()-.5)*.14;fn((c,d)=>{i.save(),i.translate(s+c,r+d),i.rotate(a),i.strokeStyle=ne(255,255,255,.55),i.lineWidth=3.2,i.lineCap="round",i.beginPath(),i.moveTo(-o*.5,0),i.quadraticCurveTo(0,-4,o*.5,0),i.stroke(),i.restore()})}for(let n=0;n<42;n++){const s=t()*J,r=t()*J,o=1.4+t()*1.4;fn((a,c)=>{const d=s+a,l=r+c;i.strokeStyle=ne(255,255,255,.92),i.lineWidth=1.1,i.beginPath(),i.moveTo(d-o,l),i.lineTo(d+o,l),i.moveTo(d,l-o),i.lineTo(d,l+o),i.stroke()})}}function $_(i,e){const t=[{u:.28,v:.34,rx:.085,ry:.12},{u:.74,v:.72,rx:.075,ry:.105}];Sn(i,e,(n,s,r,o,a,c,d)=>{let l=0,u=0;for(let T=0;T<t.length;T++){const b=t[T];let E=n-b.u,w=s-b.v;E>.5&&(E-=1),E<-.5&&(E+=1),w>.5&&(w-=1),w<-.5&&(w+=1);const S=Math.hypot(E/b.rx,w/b.ry);if(S<1.65){const R=(1-tt(0,1.65,S))*(E>=0?1:-1);l+=R*.045,S<1&&(u=Math.max(u,.5+.5*Math.cos(S*Math.PI*4)))}}const f=(Nt(n,s,3,4,809)-.5)*.045+l,h=(n+f)*11*Math.PI*2,g=.5+.5*Math.sin(h),_=Nt(zt(n+f,1),s,22,6,823),m=Nt(n,s,8,18,839),p=1-tt(.08,.32,g),v=tt(.52,.88,Math.cos(h))*(1-p),y=tt(.84,.96,m)*(1-p)*.35,M=222+(g-.5)*34+(_-.5)*16+v*16-p*58-y*32-u*20;a[d]=xe(M+5),a[d+1]=xe(M),a[d+2]=xe(M-8);const x=xe(142+(g-.5)*90+(_-.5)*20-p*72+u*32);c[d]=x,c[d+1]=x,c[d+2]=x})}function gd(i,e,t){const n=t?947:907;i.fillStyle=t?ne(206,208,176):ne(186,204,182),i.fillRect(0,0,J,J),e.fillStyle=He(84),e.fillRect(0,0,J,J);const s=an(n),r=[{count:44,rMin:12,rMax:20,lumBase:204,bumpBase:126},{count:52,rMin:10,rMax:17,lumBase:226,bumpBase:168},{count:56,rMin:7,rMax:13,lumBase:244,bumpBase:212}];for(let o=0;o<r.length;o++){const a=r[o];for(let c=0;c<a.count;c++){const d=s()*J,l=s()*J,u=a.rMin+s()*(a.rMax-a.rMin),f=3+Math.floor(s()*3),h=s()*Math.PI*2,g=(s()-.5)*14,_=t&&o>=1&&s()>.42,m=_?255:xe(a.lumBase+g+(t?6:-3)),p=xe(_?242+(s()-.5)*14:a.lumBase+g+4),v=xe(_?178+(s()-.5)*28:a.lumBase+g-(t?18:8)),y=t?ne(178,182,146,.45):ne(156,178,154,.45),M=_?ne(255,253,224,.72):ne(252,255,240,.62),x=He(a.bumpBase+(s()-.5)*14);fn((T,b)=>{const E=d+T,w=l+b;i.fillStyle=y,i.beginPath(),i.arc(E+2.2,w+2.6,u*.92,0,Math.PI*2),i.fill(),i.fillStyle=ne(m,p,v),e.fillStyle=x;for(let S=0;S<f;S++){const R=h+S/f*Math.PI*2,P=u*.42,D=u*(t?.56:.62),G=E+Math.cos(R)*P,$=w+Math.sin(R)*P;i.save(),i.translate(G,$),i.rotate(R),i.beginPath(),i.ellipse(0,0,D*(t?1.2:1),D*(t?.72:.92),0,0,Math.PI*2),i.fill(),i.restore(),e.save(),e.translate(G,$),e.rotate(R),e.beginPath(),e.ellipse(0,0,D*1.05,D*.85,0,0,Math.PI*2),e.fill(),e.restore()}i.fillStyle=M,i.beginPath(),i.ellipse(E-u*.25,w-u*.28,u*.44,u*.26,-.5,0,Math.PI*2),i.fill(),e.fillStyle=He(Math.min(248,a.bumpBase+28),.55),e.beginPath(),e.arc(E-u*.12,w-u*.12,u*.42,0,Math.PI*2),e.fill()})}}}function X_(i,e){i.fillStyle=ne(178,173,165),i.fillRect(0,0,J,J),e.fillStyle=He(52),e.fillRect(0,0,J,J);const t=an(1021),n=8,s=J/n,r=3.2;for(let o=0;o<n;o++){const a=o%2===0?7:8,c=[];let d=0;for(let u=0;u<a;u++){const f=.82+t()*.36;c.push(f),d+=f}let l=o%2===0?0:J/a*.48;for(let u=0;u<a;u++){const f=c[u]/d*J,h=l+r*.5,g=o*s+r*.5+(t()-.5)*1.4,_=f-r,m=s-r,p=Math.min(_,m)*.34,v=222+(t()-.5)*28,y=(t()-.5)*10;fn((M,x)=>{const T=h+M,b=g+x;qn(i,T+.8,b+1.2,_,m,p),i.fillStyle=ne(156,151,144,.55),i.fill();const E=i.createLinearGradient(T,b,T+_,b+m);E.addColorStop(0,ne(v+18+y,v+16+y*.6,v+12)),E.addColorStop(.55,ne(v+y,v-1+y*.5,v-4)),E.addColorStop(1,ne(v-20+y*.5,v-21,v-22)),qn(i,T,b,_,m,p),i.fillStyle=E,i.fill(),i.strokeStyle=ne(255,252,245,.45),i.lineWidth=1.2,qn(i,T+1.2,b+1.2,_-2.4,m-2.4,Math.max(2,p-1)),i.stroke();const w=e.createRadialGradient(T+_*.44,b+m*.42,Math.min(_,m)*.08,T+_*.5,b+m*.5,Math.max(_,m)*.68);w.addColorStop(0,He(232)),w.addColorStop(.7,He(196)),w.addColorStop(1,He(122)),qn(e,T,b,_,m,p),e.fillStyle=w,e.fill()}),l+=f}}}function q_(i,e){i.fillStyle=ne(184,176,164),i.fillRect(0,0,J,J),e.fillStyle=He(58),e.fillRect(0,0,J,J);const t=an(1097),n=24,s=n+3,r=J-s*2,o=6,a=J/o,c=3.6;for(let u=0;u<o;u++){const f=u%2===0?4:5,h=[];let g=0;for(let m=0;m<f;m++){const p=.78+t()*.44;h.push(p),g+=p}let _=s;for(let m=0;m<f;m++){const p=h[m]/g*r,v=_+c*.5,y=u*a+c*.5,M=p-c,x=a-c,b=224+(1-Math.abs((v+M*.5)/J-.5)*2)*14+(t()-.5)*20,E=He(194+(t()-.5)*22);for(let w=-J;w<=J;w+=J){const S=y+w,R=i.createLinearGradient(v,S,v+M,S+x);R.addColorStop(0,ne(b+12,b+10,b+5)),R.addColorStop(1,ne(b-14,b-15,b-18)),qn(i,v,S,M,x,6.5),i.fillStyle=R,i.fill(),i.strokeStyle=ne(252,248,238,.36),i.lineWidth=1.2,qn(i,v+1.4,S+1.4,M-2.8,x-2.8,5),i.stroke(),qn(e,v,S,M,x,6.5),e.fillStyle=E,e.fill()}_+=p}}const d=8,l=J/d;for(let u=0;u<d;u++){const f=u*l+1.8,h=l-3.6,g=228+(t()-.5)*16,_=228+(t()-.5)*16,m=[[2,g],[J-n-2,_]];for(let p=0;p<m.length;p++){const[v,y]=m[p];qn(i,v,f,n-2,h,4);const M=i.createLinearGradient(v,f,v+n,f+h);M.addColorStop(0,ne(y+14,y+13,y+10)),M.addColorStop(1,ne(y-18,y-19,y-20)),i.fillStyle=M,i.fill(),qn(e,v,f,n-2,h,4),e.fillStyle=He(222),e.fill()}}}function va(i,e,t){const n=t==="marble_masonry",s=t==="granite_runic",r=n?1217:s?1277:1151,o=an(r);i.fillStyle=n?ne(196,198,202):s?ne(156,158,164):ne(172,168,162),i.fillRect(0,0,J,J),e.fillStyle=He(n?74:s?40:52),e.fillRect(0,0,J,J);const a=s?6:8,c=J/a,d=n?2:s?3.8:2.8,l=2;for(let u=0;u<a;u++){const f=u*c;if(s&&u===l){const p=c-d,v=f+d*.5,y=i.createLinearGradient(0,v,0,v+p);y.addColorStop(0,ne(244,242,236)),y.addColorStop(.16,ne(224,224,226)),y.addColorStop(.84,ne(212,214,218)),y.addColorStop(1,ne(186,188,194)),i.fillStyle=y,i.fillRect(0,v,J,p),e.fillStyle=He(212),e.fillRect(0,v,J,p),i.fillStyle=ne(164,166,174),i.fillRect(0,v+4.5,J,2.2),i.fillRect(0,v+p-6.7,J,2.2),i.fillStyle=ne(252,250,246,.7),i.fillRect(0,v+6.7,J,1.4),i.fillRect(0,v+p-4.5,J,1.4),e.fillStyle=He(72),e.fillRect(0,v+4.5,J,2.4),e.fillRect(0,v+p-6.9,J,2.4);const M=8,x=J/M,T=v+p*.5,b=p*.24,E=(w,S,R,P,D)=>{w.strokeStyle=P,w.lineWidth=D,w.lineCap="square",w.lineJoin="miter";for(let G=0;G<M;G++){const $=G*x+S,q=$+x*.5,K=$+x;w.beginPath(),w.moveTo($+4,T+R),w.lineTo(q,T-b+R),w.lineTo(K-4,T+R),w.lineTo(q,T+b+R),w.closePath(),w.stroke(),w.beginPath(),w.moveTo(q,T-b*.55+R),w.lineTo(q,T+b*.55+R),w.moveTo($,T+R),w.lineTo($+4,T+R),w.moveTo(K-4,T+R),w.lineTo(K,T+R),w.stroke()}};E(i,.9,1.1,ne(252,250,244,.8),2.2),E(i,0,0,ne(146,150,160),2.2),E(e,0,0,He(56),2.8);continue}const h=s||n?4:5,g=[];let _=0;for(let p=0;p<h;p++){const v=n?.92+o()*.16:.8+o()*.4;g.push(v),_+=v}let m=u%2===0?0:J/h*.5;for(let p=0;p<h;p++){const v=g[p]/_*J,y=m+d*.5,M=f+d*.5,x=v-d,T=c-d,b=n?242+(o()-.5)*12:s?218+(o()-.5)*20:224+(o()-.5)*24,E=n?2:s?-1:(o()-.5)*8,w=s?3.5:n?1.8:2.4;$s(S=>{const R=y+S,P=i.createLinearGradient(R,M,R,M+T);if(P.addColorStop(0,ne(b+10+E,b+10+E*.6,b+8)),P.addColorStop(.5,ne(b+E,b+E*.5,b-2)),P.addColorStop(1,ne(b-14+E*.4,b-15,b-16)),qn(i,R,M,x,T,s?2.5:1.5),i.fillStyle=P,i.fill(),i.fillStyle=ne(255,255,252,n?.65:.48),i.fillRect(R+1,M+1,x-2,w),i.fillRect(R+1,M+1,w,T-2),i.fillStyle=ne(164,166,174,s?.48:.32),i.fillRect(R+1,M+T-w,x-2,w),i.fillRect(R+x-w,M+1,w,T-2),n)i.strokeStyle=ne(212,218,228,.34),i.lineWidth=1.1,i.beginPath(),i.moveTo(R+x*.12,M+T*.78),i.bezierCurveTo(R+x*.38,M+T*.52,R+x*.62,M+T*.35,R+x*.88,M+T*.2),i.stroke();else for(let D=0;D<4;D++){const G=R+4+un(u*17+p,D,r+9)*Math.max(2,x-8),$=M+4+un(u*17+p,D,r+23)*Math.max(2,T-8);i.fillStyle=D%2===0?ne(250,248,242,.25):ne(176,176,178,.22),i.fillRect(G,$,4+D%3*2,1.8)}e.fillStyle=He(148),e.fillRect(R,M,x,T),e.fillStyle=He(n?214:206+(un(u,p,r)-.5)*24),e.fillRect(R+w,M+w,Math.max(1,x-w*2),Math.max(1,T-w*2))}),m+=v}}}function Y_(i,e){Sn(i,e,(o,a,c,d,l,u,f)=>{const h=Nt(o,a,3,42,1301),g=Ws(o,a,14,14,.75,1319),_=tt(0,.55,g.d1),m=212+(h-.5)*20+(_-.5)*20;l[f]=xe(m-2),l[f+1]=xe(m),l[f+2]=xe(m+5);const p=xe(152+(_-.5)*44+(h-.5)*14);u[f]=p,u[f+1]=p,u[f+2]=p});const t=4,n=2,s=J/t,r=J/n;for(let o=0;o<t;o++){const a=o%2===0?0:r*.5,c=o*s;i.fillStyle=ne(134,138,148),i.fillRect(0,c,J,2.8),i.fillStyle=ne(248,250,255,.65),i.fillRect(0,c+2.8,J,1.6),e.fillStyle=He(42),e.fillRect(0,c,J,3);for(let d=0;d<n;d++){const l=zt(d*r+a,J);i.fillStyle=ne(134,138,148),i.fillRect(l,c,2.8,s),i.fillStyle=ne(248,250,255,.55),i.fillRect(l+2.8,c,1.4,s),e.fillStyle=He(42),e.fillRect(l,c,3,s);const u=9.5,f=[[u,u],[r-u,u],[u,s-u],[r-u,s-u]];for(let h=0;h<f.length;h++){const g=l+f[h][0],_=c+f[h][1];$s(m=>{const p=g+m;i.fillStyle=ne(124,128,138,.8),i.beginPath(),i.arc(p+.9,_+1.1,3.8,0,Math.PI*2),i.fill();const v=i.createRadialGradient(p-1.2,_-1.2,.5,p,_,3.6);v.addColorStop(0,ne(255,255,255)),v.addColorStop(.55,ne(216,220,230)),v.addColorStop(1,ne(156,160,172)),i.fillStyle=v,i.beginPath(),i.arc(p,_,3.5,0,Math.PI*2),i.fill();const y=e.createRadialGradient(p,_,.4,p,_,3.8);y.addColorStop(0,He(248)),y.addColorStop(.75,He(204)),y.addColorStop(1,He(118)),e.fillStyle=y,e.beginPath(),e.arc(p,_,3.8,0,Math.PI*2),e.fill()})}}}}function K_(i,e){i.fillStyle=ne(196,192,188),i.fillRect(0,0,J,J),e.fillStyle=He(64),e.fillRect(0,0,J,J);const t=an(1409),n=8,s=8,r=J/n,o=J/s;for(let a=n;a>=-1;a--){const c=zt(a,2)===0?0:o*.5,d=a*r;for(let l=-1;l<=s;l++){const u=l*o+c,f=zt(a,n),h=zt(l,s),_=222+(un(h,f,1423)-.5)*28,m=(un(h,f,1439)-.5)*10,p=d-r*.2,v=r*1.18,y=o*.5,M=p+v-y*.55,x=(E,w)=>{E.beginPath(),E.moveTo(u+.8,p+w),E.lineTo(u+o-.8,p+w),E.lineTo(u+o-.8,M+w),E.quadraticCurveTo(u+o*.5,p+v+y*.35+w,u+.8,M+w),E.closePath()};x(i,3.2),i.fillStyle=ne(146,142,140,.62),i.fill();const T=i.createLinearGradient(u,p,u,p+v);T.addColorStop(0,ne(_-14+m*.5,_-15,_-16)),T.addColorStop(.55,ne(_+m,_+m*.4,_-2)),T.addColorStop(1,ne(_+18+m,_+16+m*.5,_+12)),x(i,0),i.fillStyle=T,i.fill(),i.strokeStyle=ne(255,252,245,.55),i.lineWidth=1.3,i.beginPath(),i.moveTo(u+2,M),i.quadraticCurveTo(u+o*.5,p+v+y*.28,u+o-2,M),i.stroke(),i.strokeStyle=ne(162,158,154,.45),i.lineWidth=1,i.beginPath(),i.moveTo(u+.8,p),i.lineTo(u+.8,M),i.stroke(),x(e,2.2),e.fillStyle=He(52),e.fill();const b=e.createLinearGradient(u,p,u,p+v);b.addColorStop(0,He(112)),b.addColorStop(.85,He(226)),b.addColorStop(1,He(242)),x(e,0),e.fillStyle=b,e.fill()}}for(let a=0;a<24;a++){const c=t()*J,d=t()*J;i.fillStyle=ne(252,250,244,.2),i.fillRect(c,d,4,2)}}function j_(i,e){i.fillStyle=ne(224,212,184),i.fillRect(0,0,J,J),e.fillStyle=He(110),e.fillRect(0,0,J,J);const t=an(1511),n=4,s=J/n;for(let r=n;r>=-1;r--){const o=r*s-10,a=(r+1)*s,c=i.createLinearGradient(0,a-4,0,a+12);c.addColorStop(0,ne(166,148,118,.65)),c.addColorStop(1,ne(166,148,118,0)),i.fillStyle=c,i.fillRect(0,a-4,J,16);const d=e.createLinearGradient(0,a-2,0,a+10);d.addColorStop(0,He(48,.85)),d.addColorStop(1,He(120,0)),e.fillStyle=d,e.fillRect(0,a-2,J,12);const l=130;for(let f=0;f<l;f++){const h=f/l*J+(t()-.5)*3.5,g=(t()-.5)*7,_=(t()-.3)*9,m=t(),p=m>.65?ne(255,248,216,.92):m>.25?ne(238,224,188,.88):ne(206,188,152,.85),v=m>.65?228:m>.25?182:128,y=1.6+t()*1.4;$s(M=>{const x=h+M;i.strokeStyle=p,i.lineWidth=y,i.lineCap="round",i.beginPath(),i.moveTo(x,o),i.quadraticCurveTo(x+g*.5,(o+a)*.5,x+g,a+_),i.stroke(),e.strokeStyle=He(v,.85),e.lineWidth=2,e.lineCap="round",e.beginPath(),e.moveTo(x,o),e.lineTo(x+g,a+_),e.stroke()})}const u=o+s*.42;i.strokeStyle=ne(188,168,134,.5),i.lineWidth=2.2,i.beginPath(),i.moveTo(0,u),i.lineTo(J,u),i.stroke(),e.strokeStyle=He(158,.6),e.lineWidth=2.6,e.beginPath(),e.moveTo(0,u),e.lineTo(J,u),e.stroke()}}function Z_(i,e){const n=J/6;Sn(i,e,(s,r,o,a,c,d,l)=>{const u=Math.floor(r*6),f=r*6-u,h=1601+u*37,g=(un(u,0,1609)-.5)*18,_=Math.sin((s*2+un(u,1,1613))*Math.PI*2)*.35+(Nt(s,f,3,2,h)-.5)*1.4,m=Math.sin((f*5.2+_)*Math.PI*2),p=Nt(s,r,4,28,h+17),v=1-tt(0,.065,f)+tt(.935,1,f),y=tt(.055,.11,f)*(1-tt(.11,.2,f)),M=226+g+m*11+(p-.5)*12+y*14-bo(v)*66;c[l]=xe(M+6),c[l+1]=xe(M+1),c[l+2]=xe(M-9);const x=xe(174+m*16+(p-.5)*14+y*18-bo(v)*118);d[l]=x,d[l+1]=x,d[l+2]=x});for(let s=0;s<6;s++){const r=s*n,o=zt((s*.37+.18)*J,J);i.fillStyle=ne(146,134,120),i.fillRect(o-1.2,r+1.5,2.4,n-3),i.fillStyle=ne(248,242,230,.55),i.fillRect(o+1.2,r+1.5,1.2,n-3),e.fillStyle=He(48),e.fillRect(o-1.4,r+1,2.8,n-2);const a=[o-8,o+8],c=[r+n*.3,r+n*.72];for(let d=0;d<a.length;d++)for(let l=0;l<c.length;l++)$s(u=>{const f=a[d]+u,h=c[l];i.fillStyle=ne(128,122,118),i.beginPath(),i.arc(f,h,2.6,0,Math.PI*2),i.fill(),i.fillStyle=ne(238,236,234,.7),i.beginPath(),i.arc(f-.7,h-.7,1,0,Math.PI*2),i.fill(),e.fillStyle=He(228),e.beginPath(),e.arc(f,h,2.6,0,Math.PI*2),e.fill()})}}function J_(i,e){Sn(i,e,(s,r,o,a,c,d,l)=>{const u=(Nt(s,r,4,4,1709)-.5)*.18,f=(r*8+u)*Math.PI*2,h=.5+.5*Math.sin(f),g=Math.cos(f)*.5,_=_i(s,r,10,10,2,1723),m=204+h*38+g*18+(_-.5)*18;c[l]=xe(m+6),c[l+1]=xe(m),c[l+2]=xe(m-9);const p=xe(56+h*168+(_-.5)*28);d[l]=p,d[l+1]=p,d[l+2]=p});const n=an(1741);for(let s=0;s<65;s++){const r=n()*J,a=(Math.floor(n()*8)+.25+(n()-.5)*.35)*(J/8),c=2.6+n()*3.4,d=1.8+n()*2.4,l=n()>.4,u=n()*Math.PI;fn((f,h)=>{i.fillStyle=l?ne(246,236,220,.55):ne(176,162,146,.45),i.beginPath(),i.ellipse(r+f,a+h,c,d,u,0,Math.PI*2),i.fill(),e.fillStyle=He(l?224:156,.55),e.beginPath(),e.ellipse(r+f,a+h,c,d,u,0,Math.PI*2),e.fill()})}}function Q_(i,e){Sn(i,e,(s,r,o,a,c,d,l)=>{const u=Math.sin(s*Math.PI*2*2)*.22,f=.5+.5*Math.sin((r*8+u)*Math.PI*2),h=Nt(s,r,6,8,1801),g=212+f*30+(h-.5)*14;c[l]=xe(g+10),c[l+1]=xe(g+4),c[l+2]=xe(g-24);const _=xe(92+f*110+(h-.5)*26);d[l]=_,d[l+1]=_,d[l+2]=_});const n=an(1831);for(let s=0;s<150;s++){const r=n()*J,o=n()*J,a=10+n()*10,c=-.58+Math.sin(r/J*Math.PI*4)*.16+(n()-.5)*.18,d=n()>.35;fn((l,u)=>{const f=r+l,h=o+u,g=f+Math.cos(c)*a,_=h+Math.sin(c)*a;i.strokeStyle=d?ne(252,242,198,.78):ne(216,198,148,.7),i.lineWidth=1.5,i.lineCap="round",i.beginPath(),i.moveTo(f,h),i.quadraticCurveTo((f+g)*.5,(h+_)*.5-2.2,g,_),i.stroke(),i.save(),i.translate(g,_),i.rotate(c),i.fillStyle=d?ne(255,250,214,.92):ne(236,218,166,.85),i.beginPath(),i.ellipse(0,0,3.8,1.7,0,0,Math.PI*2),i.fill(),i.restore(),e.strokeStyle=He(d?228:172,.7),e.lineWidth=2,e.beginPath(),e.moveTo(f,h),e.lineTo(g,_),e.stroke()})}}function ev(i,e){Sn(i,e,(n,s,r,o,a,c,d)=>{const l=.165+.022*Math.sin(n*Math.PI*2*3)+.012*Math.cos(n*Math.PI*2*7+1.1)+(Nt(n,.15,10,2,1901)-.5)*.022,u=.56+.026*Math.sin(n*Math.PI*2*2+.6)+(Nt(n,.55,6,2,1913)-.5)*.04,f=_i(n,s,6,6,3,1931);let h,g,_,m;if(s<l){const v=1-tt(0,.055,s),y=tt(l-.04,l,s),M=(f-.5)*26+v*26-y*38;h=114+M*.85,g=176+M,_=76+M*.6,m=228-y*36+(f-.5)*20}else if(s<u){const v=1-tt(l,l+.06,s),y=(s-l)/Math.max(.01,u-l),M=Math.sin(s*34+(f-.5)*2.4)*10,x=-y*28+M+(f-.5)*20-v*54;h=176+x,g=126+x*.82,_=84+x*.62,m=152+M*1.4+(f-.5)*28-v*82}else{const v=1-tt(u,u+.04,s),y=(s-u)/Math.max(.01,1-u),M=s*10+(Nt(n,s,5,4,1949)-.5)*.6,x=M-Math.floor(M),T=1-tt(0,.14,x),b=tt(.12,.25,x)*(1-tt(.25,.45,x)),E=-y*28+(f-.5)*22+b*24-T*34-v*28;h=92+E*.9,g=100+E*.95,_=116+E,m=148+b*36-T*68-v*48+(f-.5)*24}a[d]=xe(h),a[d+1]=xe(g),a[d+2]=xe(_);const p=xe(m);c[d]=p,c[d+1]=p,c[d+2]=p});const t=an(1973);for(let n=0;n<24;n++){const s=t()*J,r=58+t()*78,o=3+t()*4.5,a=2+t()*2.8,c=(t()-.5)*.4;$s(d=>{i.fillStyle=ne(146,134,122,.8),i.beginPath(),i.ellipse(s+d,r,o,a,c,0,Math.PI*2),i.fill(),i.fillStyle=ne(192,180,166,.55),i.beginPath(),i.ellipse(s+d-o*.2,r-a*.25,o*.55,a*.45,c,0,Math.PI*2),i.fill(),e.fillStyle=He(205,.75),e.beginPath(),e.ellipse(s+d,r,o,a,c,0,Math.PI*2),e.fill()})}for(let n=0;n<12;n++){const s=n/12*J+(t()-.5)*14,r=152+t()*58,o=22+t()*28,a=(t()-.5)*6;$s(c=>{i.strokeStyle=ne(44,50,64,.72),i.lineWidth=2,i.beginPath(),i.moveTo(s+c,r),i.lineTo(s+c+a,Math.min(J,r+o)),i.stroke(),i.strokeStyle=ne(134,144,162,.4),i.lineWidth=1.2,i.beginPath(),i.moveTo(s+c+1.8,r),i.lineTo(s+c+a+1.8,Math.min(J,r+o)),i.stroke(),e.strokeStyle=He(54,.78),e.lineWidth=2.6,e.beginPath(),e.moveTo(s+c,r),e.lineTo(s+c+a,Math.min(J,r+o)),e.stroke()})}}function tv(i,e){Sn(i,e,(n,s,r,o,a,c,d)=>{const l=_i(n,s,3,3,3,2003),u=Nt(n,s,5,5,2017),f=l*.72+u*.28,h=1-tt(.28,.82,f);a[d]=xe(255-h*24),a[d+1]=xe(255-h*16),a[d+2]=xe(255-h*6);const g=xe(112+f*84);c[d]=g,c[d+1]=g,c[d+2]=g});const t=an(2039);for(let n=0;n<24;n++){const s=t()*J,r=t()*J,o=20+t()*26;fn((a,c)=>{const d=s+a,l=r+c,u=i.createRadialGradient(d+o*.14,l+o*.2,o*.1,d,l,o);u.addColorStop(0,ne(224,234,249,.28)),u.addColorStop(1,ne(224,234,249,0)),i.fillStyle=u,i.beginPath(),i.arc(d,l,o,0,Math.PI*2),i.fill();const f=i.createRadialGradient(d-o*.16,l-o*.2,o*.05,d-o*.08,l-o*.1,o*.82);f.addColorStop(0,ne(255,255,255,.58)),f.addColorStop(1,ne(255,255,255,0)),i.fillStyle=f,i.beginPath(),i.arc(d-o*.08,l-o*.1,o*.82,0,Math.PI*2),i.fill();const h=e.createRadialGradient(d,l,0,d,l,o*.85);h.addColorStop(0,He(192,.3)),h.addColorStop(1,He(128,0)),e.fillStyle=h,e.beginPath(),e.arc(d,l,o*.85,0,Math.PI*2),e.fill()})}}const _d=new Map,vd=new Map,yd=new Map,_r=[];function Md(){return{width:J,height:J}}function wd(i,e){return i.colorSpace=e?jt:ci,i.wrapS=yr,i.wrapT=yr,i.magFilter=In,i.minFilter=li,i.anisotropy=4,i.needsUpdate=!0,i}function nv(i,e,t){switch(i){case"grass":z_(e,t);break;case"forest_floor":pd(e,t,!1);break;case"ancient_floor":pd(e,t,!0);break;case"wasteland":G_(e,t);break;case"water":V_(e,t);break;case"rock":md(e,t,!1);break;case"orc_rock":md(e,t,!0);break;case"snow":W_(e,t);break;case"bark":$_(e,t);break;case"foliage":gd(e,t,!1);break;case"mallorn_foliage":gd(e,t,!0);break;case"cobble":X_(e,t);break;case"road_cobble":q_(e,t);break;case"stone_masonry":va(e,t,"stone_masonry");break;case"marble_masonry":va(e,t,"marble_masonry");break;case"granite_runic":va(e,t,"granite_runic");break;case"dark_iron":Y_(e,t);break;case"roof_shingles":K_(e,t);break;case"thatch":j_(e,t);break;case"timber":Z_(e,t);break;case"farm_soil":J_(e,t);break;case"wheat":Q_(e,t);break;case"bedrock_skirt":ev(e,t);break;case"cloud":tv(e,t);break}}function iv(i){const e=_d.get(i);if(e)return e;let t,n;if(typeof document<"u"&&typeof document.createElement=="function"){t=document.createElement("canvas"),t.width=J,t.height=J,n=document.createElement("canvas"),n.width=J,n.height=J;const r=t.getContext("2d"),o=n.getContext("2d");r&&o&&nv(i,r,o)}else t=Md(),n=Md();const s={map:wd(new gc(t),!0),bumpMap:wd(new gc(n),!1)};return _d.set(i,s),i==="water"&&_r.push(s),s}function sv(i,e,t){const n=iv(i);if(e===1&&t===1)return n;const s=`${i}|${e}|${t}`,r=vd.get(s);if(r)return r;const o=n.map.clone();o.repeat.set(e,t),o.needsUpdate=!0;const a=n.bumpMap.clone();a.repeat.set(e,t),a.needsUpdate=!0;const c={map:o,bumpMap:a};return vd.set(s,c),i==="water"&&_r.push(c),c}function Sd(i,e){return i===void 0?e:typeof i=="number"?`#${(i>>>0).toString(16).padStart(6,"0")}`:i.toLowerCase()}function de(i,e){const t=B_[i],n=Sd(e?.color,"#ffffff"),s=e?.roughness??t.roughness,r=e?.metalness??t.metalness,o=e?.bumpScale??t.bumpScale,a=Sd(e?.emissive,"#000000"),c=e?.emissiveIntensity??0,d=e?.transparent??!1,l=e?.opacity??1,u=e?.flatShading??!1,f=e?.repeatX??1,h=e?.repeatY??1,g=[i,n,s,r,o,a,c,d?1:0,l,u?1:0,f,h].join("|"),_=yd.get(g);if(_)return _;const{map:m,bumpMap:p}=sv(i,f,h),v=new Vs({color:e?.color!==void 0?new Be(e.color):new Be(16777215),map:m,bumpMap:p,bumpScale:o,roughness:s,metalness:r,emissive:e?.emissive!==void 0?new Be(e.emissive):new Be(0),emissiveIntensity:c,transparent:d,opacity:l,flatShading:u});return yd.set(g,v),v}function rv(i){if(!Number.isFinite(i)||i<=0||_r.length===0)return;const e=i*.036,t=i*.022,n=-i*.02,s=i*.028;for(let r=0;r<_r.length;r++){const o=_r[r];o.map.offset.x=(o.map.offset.x+e)%1,o.map.offset.y=(o.map.offset.y+t)%1,o.bumpMap.offset.x=zt(o.bumpMap.offset.x+n,1),o.bumpMap.offset.y=(o.bumpMap.offset.y+s)%1}}const Ds=2,oe=.22,rr=-.08,Tr=.28,Er=.28,he=.24,Ls=.22,Us=.22,ji=.54,ov=.12,av=.12,cv=.04;function Mt(i,e,t,n=0){const s=(t-1)/2;return new k((i-s)*Ds,n,(e-s)*Ds)}function ri(i,e,t){const n=we(i,e,t),s=Mt(e,t,i.mapSize,oe);return n?.isCityCenter?(s.x+=Tr,s.y+=he,s.z+=Er):n?.hasVillage?(s.x+=Tr,s.z+=Er):n?.terrain==="mountain"?(s.x+=Ls,s.y+=ji,s.z+=Us):(n?.terrain==="forest"||n?.terrain==="ancient_woods")&&(s.x+=ov,s.y+=cv,s.z+=av),s}function _t(i,e,t){const n=Math.sin(i*127.1+e*311.7+t*74.7)*43758.5453123;return n-Math.floor(n)}const xd=new Map;function ct(i,e){const t=JSON.stringify([i,e??{}]);let n=xd.get(t);return n||(n=new Vs({color:i,flatShading:!0,roughness:e?.roughness??.88,metalness:e?.metalness??0,emissive:e?.emissive?new Be(e.emissive):new Be(0),emissiveIntensity:e?.emissiveIntensity??0,transparent:e?.transparent??!1,opacity:e?.opacity??1}),xd.set(t,n)),n}const lv=new pe(1.996,.22,1.996),dv=new pe(1.998,.28,1.998),uv=new pe(2,.26,2),hv=new pe(1.996,.26,1.996),fv=new At(.055,.16,4),Dr=new wt(.052,0),Nu=new et(.055,.085,.28,5),bd=new At(.3,.42,6),Td=new At(.21,.34,6),vr=new Pn(.27,0),pv=new At(.62,1.05,6),mv=new At(.28,.44,6),gv=new et(.49,.6,ji,7),_v=new et(.47,.49,.032,7),vv=new At(.14,.42,4),Ou=new Pn(.17,0),Ed=new wt(.16,0),ro=new pe(1.98,.04,.14),yv=new Ct({visible:!1}),Ad={humans:["#7ed14d","#76c847"],orcs:["#7c7573","#736c6b"],elves:["#5ecc91","#56c288"],dwarves:["#7ba863","#739f5c"]},Mv={humans:["#5eb542","#57ac3d"],orcs:["#676166","#605a5f"],elves:["#45ae78","#3fa571"],dwarves:["#5f8850","#58804a"]},wv={humans:["#3c993a","#57b548"],orcs:["#544c59","#645b6b"],elves:["#2ea874","#f2c94c"],dwarves:["#36755c","#458b6f"]};function oi(i,e,t,n){const s=new Je,r=Mt(i.x,i.y,e,0);s.position.copy(r);const o=[],a=[],c=[];let d=null,l=null;const u=new U(hv,yv);if(u.position.y=oe*.5,u.userData={tileX:i.x,tileY:i.y},s.add(u),i.terrain==="water"){const p=new U(uv,de("rock",{color:"#1e84b0",roughness:.9,bumpScale:.025}));p.position.y=-.35,p.receiveShadow=!0,s.add(p);const v=new Ir(2,2,3,3);v.rotateX(-Math.PI/2);const y=de("water",{color:"#45c8f5",roughness:.14,metalness:.08,bumpScale:.028,transparent:!0,opacity:.92,flatShading:!1});d=new U(v,y),d.position.y=rr,d.receiveShadow=!0,d.userData={basePositions:Float32Array.from(v.attributes.position.array),tileX:i.x,tileY:i.y},s.add(d);const M=de("cloud",{color:"#eefbff",roughness:.45,bumpScale:.01,transparent:!0,opacity:.86,flatShading:!1});if(!t.northWater){const x=new U(ro,M);x.position.set(0,rr+.022,-.93),s.add(x)}if(!t.southWater){const x=new U(ro,M);x.position.set(0,rr+.022,.93),s.add(x)}if(!t.westWater){const x=new U(ro,M);x.rotation.y=Math.PI/2,x.position.set(-.93,rr+.022,0),s.add(x)}if(!t.eastWater){const x=new U(ro,M);x.rotation.y=Math.PI/2,x.position.set(.93,rr+.022,0),s.add(x)}return{group:s,hitMesh:u,animatedTrees:o,waterMesh:d,windmillBlades:l,floatingMotes:a,smokePuffs:c}}const f=xv(i),h=Sv(i,f),g=new U(lv,h);g.position.y=oe*.5,g.receiveShadow=!0,g.castShadow=!1,s.add(g);const _=i.terrain==="wasteland"?"#433c4b":"#6c5640",m=new U(dv,de(i.terrain==="wasteland"?"orc_rock":"rock",{color:_,roughness:.94,bumpScale:.03}));if(m.position.y=-.14,m.receiveShadow=!0,m.castShadow=!1,s.add(m),!n)return{group:s,hitMesh:u,animatedTrees:o,waterMesh:d,windmillBlades:l,floatingMotes:a,smokePuffs:c};if((i.hasRoad||i.isCityCenter)&&Cv(s,t,i.isCityCenter),!i.isCityCenter&&!i.hasVillage)switch(i.terrain){case"plains":i.improvement||bv(s,i);break;case"forest":i.improvement||Tv(s,i,o);break;case"ancient_woods":Ev(s,i,o,a,!!i.improvement);break;case"mountain":Av(s,i);break;case"wasteland":i.improvement||Rv(s,i,a);break}return i.hasVillage&&!i.isCityCenter&&Pv(s,i,c),i.improvement&&!i.isCityCenter?l=Dv(s,i.improvement,i.terrain==="mountain"):i.resource&&!i.isCityCenter&&!i.hasVillage&&Iv(s,i.resource,i,a),{group:s,hitMesh:u,animatedTrees:o,waterMesh:d,windmillBlades:l,floatingMotes:a,smokePuffs:c}}function Sv(i,e){switch(i.terrain){case"forest":return de("forest_floor",{color:e,roughness:.9,bumpScale:.025});case"ancient_woods":return de("ancient_floor",{color:e,roughness:.88,bumpScale:.025});case"wasteland":return de("wasteland",{color:e,roughness:.9,bumpScale:.035});case"mountain":return de(i.biome==="orcs"?"orc_rock":"rock",{color:e,roughness:.9,bumpScale:.035});case"plains":default:return de("grass",{color:e,roughness:.88,bumpScale:.022})}}function xv(i){const e=(i.x+i.y)%2===1?1:0;switch(i.terrain){case"plains":return Ad[i.biome][e];case"forest":return Mv[i.biome][e];case"ancient_woods":return e===0?"#3aa06e":"#359666";case"mountain":return i.biome==="orcs"?e===0?"#6c6476":"#655d6f":e===0?"#8894a3":"#808c9b";case"wasteland":return e===0?"#5b5363":"#544d5c";default:return Ad.humans[e]}}function bv(i,e){if(e.resource||e.hasRoad||_t(e.x,e.y,19)<.7)return;const t=[[-.66,-.66],[.66,-.66],[-.66,.66]],[n,s]=t[Math.floor(_t(e.x,e.y,23)*t.length)];if(e.biome!=="orcs"&&_t(e.x,e.y,29)>.55){const o=["#fde047","#f472b6","#ffffff","#93c5fd"],a=o[Math.floor(_t(e.x,e.y,31)*o.length)],c=new U(Dr,ct(a));c.position.set(n,oe+.055,s),i.add(c)}else{const o=e.biome==="orcs"?"#635c5c":"#4fa839",a=de("grass",{color:o,roughness:.86,bumpScale:.016});for(let c=0;c<2;c++){const d=new U(fv,a);d.position.set(n+(c-.5)*.07,oe+.075,s+(c===0?.03:-.03)),d.rotation.set((_t(e.x,e.y,40+c)-.5)*.24,_t(e.x,e.y,50+c)*Math.PI*2,(_t(e.x,e.y,60+c)-.5)*.24),i.add(d)}}}function Tv(i,e,t){const[n,s]=wv[e.biome],r=de("bark",{color:e.biome==="elves"?"#e5dfd3":e.biome==="orcs"?"#544c59":"#735139",roughness:.9,bumpScale:.03,flatShading:!0}),o=de("snow",{color:"#f8fafc",roughness:.8,bumpScale:.02,flatShading:!0}),a=ct("#fb923c",{emissive:"#ff6b2b",emissiveIntensity:1,roughness:.4});[[-.56,-.52],[.52,-.52],[-.54,.4]].forEach(([d,l],u)=>{const f=new Je,h=(_t(e.x,e.y,100+u)-.5)*.08,g=(_t(e.x,e.y,110+u)-.5)*.08,_=.86+_t(e.x,e.y,120+u)*.14;f.position.set(d+h,oe,l+g),f.scale.setScalar(_);const m=new U(Nu,r);m.position.y=.14,m.castShadow=!0,f.add(m);const p=de("foliage",{color:u%2===0?n:s,roughness:.86,bumpScale:.025,flatShading:!0});if(e.biome==="orcs"){m.rotation.z=(u%2===0?1:-1)*.12;const v=new U(new et(.028,.048,.36,4),r);v.position.set(.11,.38,.03),v.rotation.z=-.66,v.castShadow=!0,f.add(v);const y=new U(new et(.024,.042,.3,4),r);if(y.position.set(-.1,.44,-.03),y.rotation.z=.7,y.castShadow=!0,f.add(y),u===0){const M=new U(Dr,a);M.position.set(.08,.05,.08),f.add(M)}}else if(e.biome==="elves"){const v=new U(vr,de("foliage",{color:n,roughness:.84,bumpScale:.025}));v.position.y=.45,v.scale.set(1.12,.72,1.12),v.castShadow=!0,f.add(v);const y=new U(vr,de("mallorn_foliage",{color:s,roughness:.82,bumpScale:.025}));y.position.set(.03,.64,-.02),y.scale.set(.82,.66,.82),y.castShadow=!0,f.add(y)}else if(e.biome==="dwarves"){const v=new U(bd,p);v.position.y=.4,v.castShadow=!0,f.add(v);const y=new U(Td,o);y.position.y=.65,y.castShadow=!0,f.add(y)}else if(u===1){const v=new U(vr,p);v.position.y=.49,v.scale.set(1.18,.96,1.18),v.castShadow=!0,f.add(v)}else{const v=new U(bd,p);v.position.y=.4,v.castShadow=!0,f.add(v);const y=new U(Td,de("foliage",{color:s,roughness:.86,bumpScale:.025,flatShading:!0}));y.position.y=.65,y.castShadow=!0,f.add(y)}f.userData={swayPhase:_t(e.x,e.y,130+u)*Math.PI*2},i.add(f),t.push(f)})}function Ev(i,e,t,n,s){const r=de("bark",{color:"#eae4d7",roughness:.88,bumpScale:.03}),o=de("mallorn_foliage",{color:"#2ea874",roughness:.84,bumpScale:.025}),a=de("mallorn_foliage",{color:"#f2c94c",roughness:.82,bumpScale:.025}),c=ct("#fef08a",{emissive:"#facc15",emissiveIntensity:1.15});(s?[[-.6,-.56],[.58,-.54]]:[[-.56,-.52],[.52,-.52],[-.54,.4]]).forEach(([l,u],f)=>{const h=new Je,g=.9+_t(e.x,e.y,200+f)*.14;h.position.set(l,oe,u),h.scale.setScalar(g);const _=new U(Nu,r);_.scale.set(1.08,1.18,1.08),_.position.y=.17,_.castShadow=!0,h.add(_);const m=new U(vr,o);m.position.y=.48,m.scale.set(1.22,.72,1.22),m.castShadow=!0,h.add(m);const p=new U(vr,a);p.position.set(.03,.69,-.02),p.scale.set(.92,.66,.92),p.castShadow=!0,h.add(p),h.userData={swayPhase:_t(e.x,e.y,210+f)*Math.PI*2},i.add(h),t.push(h)});for(let l=0;l<2;l++){const u=new U(Dr,c),f=(_t(e.x,e.y,220+l)-.5)*1,h=oe+.58+_t(e.x,e.y,230+l)*.35,g=(_t(e.x,e.y,240+l)-.5)*1;u.position.set(f,h,g),u.scale.setScalar(.54),u.userData={moteKind:"firefly",baseX:f,baseY:h,baseZ:g,phase:_t(e.x,e.y,250+l)*Math.PI*2},i.add(u),n.push(u)}}function Av(i,e){const t=e.biome==="orcs",n=t?"orc_rock":"rock",s=de(n,{color:t?"#6c6476":"#8894a3",roughness:.88,bumpScale:.04,flatShading:!0}),r=de(n,{color:t?"#5a5263":"#737f8e",roughness:.9,bumpScale:.04,flatShading:!0}),o=de(n,{color:t?"#7d7488":"#9aa6b5",roughness:.86,bumpScale:.032,flatShading:!0}),a=t?de("orc_rock",{color:"#968d9e",roughness:.84,bumpScale:.03,flatShading:!0}):de("snow",{color:"#f8fafc",roughness:.8,bumpScale:.02,flatShading:!0}),c=_t(e.x,e.y,300)*Math.PI,d=new U(pv,s);d.position.set(-.3,oe+.525,-.3),d.rotation.y=c,d.castShadow=!0,d.receiveShadow=!0,i.add(d);const l=new U(mv,a);l.position.set(-.3,oe+.85,-.3),l.rotation.y=c,l.castShadow=!0,i.add(l);const u=new U(gv,r);u.position.set(Ls,oe+ji*.5,Us),u.rotation.y=.4,u.castShadow=!0,u.receiveShadow=!0,i.add(u);const f=new U(_v,o);if(f.position.set(Ls,oe+ji-.014,Us),f.rotation.y=.4,f.receiveShadow=!0,i.add(f),t){const h=new U(new pe(.065,.42,.065),ct("#ff6b2b",{emissive:"#ff6b2b",emissiveIntensity:1.15}));h.position.set(-.1,oe+.48,-.08),h.rotation.z=-.38,i.add(h)}}function Rv(i,e,t){const n=de("orc_rock",{color:"#443d4d",roughness:.86,bumpScale:.04}),s=ct("#ff6b2b",{emissive:"#ff6b2b",emissiveIntensity:1.2,roughness:.36}),r=_t(e.x,e.y,400)*Math.PI,o=new U(new pe(.92,.03,.075),s);o.position.set(0,oe+.012,0),o.rotation.y=r,i.add(o);const a=new U(new pe(.52,.028,.055),s);a.position.set(.14,oe+.012,.12),a.rotation.y=r+.9,i.add(a);for(let u=0;u<2;u++){const f=new U(vv,n),h=(u===0?-.58:.52)+(_t(e.x,e.y,410+u)-.5)*.14,g=(u===0?-.44:-.5)+(_t(e.x,e.y,420+u)-.5)*.14;f.position.set(h,oe+.18,g),f.rotation.set(.18*(u===0?1:-1),_t(e.x,e.y,430+u)*Math.PI,.14),f.castShadow=!0,i.add(f)}const c=new U(Dr,s),d=(_t(e.x,e.y,440)-.5)*.7,l=(_t(e.x,e.y,441)-.5)*.7;c.position.set(d,oe+.35,l),c.scale.setScalar(.52),c.userData={moteKind:"ember",baseX:d,baseY:oe+.16,baseZ:l,phase:_t(e.x,e.y,442)},i.add(c),t.push(c)}function Cv(i,e,t){const n=de("road_cobble",{color:"#d8cab4",roughness:.9,bumpScale:.025}),s=new U(new et(.24,.26,.04,8),n);s.position.y=oe+.015,i.add(s);const r=new pe(.32,.035,1);if((e.northRoad||t)&&e.northRoad){const o=new U(r,n);o.position.set(0,oe+.015,-.5),i.add(o)}if(e.southRoad){const o=new U(r,n);o.position.set(0,oe+.015,.5),i.add(o)}if(e.westRoad){const o=new U(r,n);o.rotation.y=Math.PI/2,o.position.set(-.5,oe+.015,0),i.add(o)}if(e.eastRoad){const o=new U(r,n);o.rotation.y=Math.PI/2,o.position.set(.5,oe+.015,0),i.add(o)}}function Iv(i,e,t,n){switch(e){case"berries":{const s=de("foliage",{color:"#2f8540",roughness:.86,bumpScale:.025}),r=ct("#f43f5e",{roughness:.45});[[-.22,.14,.1],[.18,.15,-.08],[0,.13,.22]].forEach(([a,c,d])=>{const l=new U(Ou,s);l.position.set(a,oe+c,d),l.castShadow=!0,i.add(l);const u=new U(Dr,r);u.position.set(a+.08,oe+c+.14,d+.06),i.add(u)});break}case"game":{const s=new Je,r=ct(t.biome==="orcs"?"#7a6154":"#b87a44"),o=ct("#efe8d8"),a=new U(new pe(.32,.18,.16),r);a.position.y=.22,a.castShadow=!0,s.add(a);const c=new pe(.05,.18,.05),d=[[-.1,-.05],[.1,-.05],[-.1,.05],[.1,.05]];for(const[h,g]of d){const _=new U(c,r);_.position.set(h,.09,g),s.add(_)}const l=new U(new pe(.14,.12,.12),r);l.position.set(.19,.34,0),s.add(l);const u=new U(new pe(.03,.14,.03),o);u.position.set(.2,.45,.05),u.rotation.x=.35,s.add(u);const f=u.clone();f.position.z=-.05,f.rotation.x=-.35,s.add(f),s.position.set(.04,oe,.06),s.rotation.y=_t(t.x,t.y,500)*Math.PI*2,i.add(s);break}case"ore":{const s=ct("#f59e0b",{roughness:.34,metalness:.58,emissive:"#b45309",emissiveIntensity:.22});[[-.48,.36,.06],[.02,.44,-.4],[-.2,.58,-.08]].forEach(([o,a,c],d)=>{const l=new U(Ed,s);l.position.set(o,oe+a,c),l.scale.set(.85,1.3,.85),l.rotation.set(.3,d*1.1,.25),l.castShadow=!0,i.add(l)});break}case"mithril":{const s=ct("#93c5fd",{roughness:.3,metalness:.62,emissive:"#60a5fa",emissiveIntensity:.55});[[-.48,.38,.08],[.02,.48,-.4],[-.2,.62,-.06]].forEach(([o,a,c],d)=>{const l=new U(Ed,s);l.position.set(o,oe+a,c),l.scale.set(.9,1.55,.9),l.rotation.set(.22,d*1.3,-.2),l.castShadow=!0,i.add(l)});break}case"ruins":{const s=de("stone_masonry",{color:"#b4bfce",roughness:.88,bumpScale:.035}),r=de("stone_masonry",{color:"#63946a",roughness:.88,bumpScale:.035}),o=ct("#67e8f9",{emissive:"#22d3ee",emissiveIntensity:1.05,roughness:.32}),a=new U(new et(.48,.54,.08,6),s);a.position.y=oe+.04,a.receiveShadow=!0,i.add(a);const c=new U(new pe(.14,.54,.14),s);c.position.set(-.28,oe+.31,-.18),c.castShadow=!0,i.add(c);const d=new U(new pe(.14,.44,.14),s);d.position.set(.28,oe+.26,-.18),d.castShadow=!0,i.add(d);const l=new U(new pe(.76,.11,.17),r);l.position.set(-.04,oe+.58,-.18),l.rotation.z=-.12,l.castShadow=!0,i.add(l);const u=new U(new wt(.135,0),o);u.position.set(0,oe+.32,.08),u.userData={moteKind:"rune",baseX:0,baseY:oe+.32,baseZ:.08,phase:_t(t.x,t.y,555)*Math.PI*2},i.add(u),n.push(u);break}}}function Pv(i,e,t){const n=de("timber",{color:"#f2eadb",roughness:.88,bumpScale:.026}),s=de("thatch",{color:"#cc9b56",roughness:.9,bumpScale:.032,flatShading:!0}),r=de("timber",{color:"#784c28",roughness:.88,bumpScale:.028}),o=de("stone_masonry",{color:"#9ca8b8",roughness:.88,bumpScale:.032}),a=de("cobble",{color:"#ddd5c5",roughness:.9,bumpScale:.026}),c=ct("#fcd34d",{emissive:"#f59e0b",emissiveIntensity:.9}),d=ct("#fb923c",{emissive:"#f97316",emissiveIntensity:.95}),l=de("cloud",{color:"#f1f5f9",roughness:.95,bumpScale:.01,transparent:!0,opacity:.68,flatShading:!1}),u=new U(new et(.64,.68,.022,8),a);u.position.set(-.14,oe+.011,-.14),u.receiveShadow=!0,i.add(u),[[-.46,-.44,.35],[.2,-.5,-.45],[-.5,.22,.15]].forEach(([_,m,p],v)=>{const y=new Je,M=new U(new pe(.34,.22,.3),n);M.position.y=.11,M.castShadow=!0,y.add(M);const x=new U(new At(.28,.22,4),s);x.position.y=.33,x.rotation.y=Math.PI/4,x.castShadow=!0,y.add(x);const T=new U(new pe(.08,.075,.025),c);T.position.set(.08,.12,.155),y.add(T);const b=new U(new pe(.08,.13,.025),r);if(b.position.set(-.07,.065,.155),y.add(b),v<2){const E=new U(new pe(.07,.18,.07),o);E.position.set(.1,.34,-.08),y.add(E);const w=new U(new Pn(.055,0),l);w.position.set(.1,.48,-.08),w.userData={smokeBaseX:.1,smokeBaseY:.46,smokeBaseZ:-.08,smokePhase:v*.5+_t(e.x,e.y,610+v)},y.add(w),t.push(w)}y.position.set(_,oe,m),y.rotation.y=p+_t(e.x,e.y,600)*.22,i.add(y)});const h=new U(new et(.13,.15,.08,7),o);h.position.set(-.12,oe+.04,-.12),i.add(h);const g=new U(new At(.065,.15,5),d);g.position.set(-.12,oe+.13,-.12),i.add(g)}function Dv(i,e,t){switch(e){case"farm":{const n=de("farm_soil",{color:"#8f6840",roughness:.92,bumpScale:.032}),s=de("wheat",{color:"#facc15",roughness:.84,bumpScale:.03}),r=new U(new pe(1.42,.04,1.42),n);r.position.y=oe+.02,r.receiveShadow=!0,i.add(r);for(let o=-2;o<=2;o++){const a=new U(new pe(1.22,.15,.14),s);a.position.set(0,oe+.105,o*.25),a.castShadow=!0,i.add(a)}return null}case"windmill":{const n=de("stone_masonry",{color:"#ece7dc",roughness:.88,bumpScale:.032,flatShading:!0}),s=de("roof_shingles",{color:"#2563eb",roughness:.8,bumpScale:.028,flatShading:!0}),r=de("timber",{color:"#9a683c",roughness:.88,bumpScale:.028}),o=de("timber",{color:"#fefce8",roughness:.84,bumpScale:.018}),a=new U(new et(.2,.3,.68,7),n);a.position.set(-.24,oe+.34,-.24),a.castShadow=!0,i.add(a);const c=new U(new At(.25,.22,7),s);c.position.set(-.24,oe+.79,-.24),c.castShadow=!0,i.add(c);const d=new Je;d.position.set(-.24,oe+.58,.02);for(let l=0;l<4;l++){const u=new Je;u.rotation.z=l*Math.PI/2;const f=new U(new pe(.04,.38,.03),r);f.position.y=.19,u.add(f);const h=new U(new pe(.13,.28,.02),o);h.position.set(.075,.21,0),u.add(h),d.add(u)}return i.add(d),d}case"mine":{const n=de("timber",{color:"#8c5a32",roughness:.88,bumpScale:.03}),s=de("rock",{color:"#2b2730",roughness:.92,bumpScale:.035}),r=ct("#f59e0b",{emissive:"#f59e0b",emissiveIntensity:.65}),o=t?-.44:0,a=t?.28:0,c=new U(new pe(.46,.38,.2),n);c.position.set(o,oe+.19,a),c.castShadow=!0,i.add(c);const d=new U(new pe(.28,.28,.22),s);d.position.set(o,oe+.14,a+.02),i.add(d);const l=new U(new wt(.068,0),r);return l.position.set(o+.24,oe+.34,a+.11),i.add(l),null}case"sanctuary":{const n=de("marble_masonry",{color:"#f7f2e4",roughness:.82,bumpScale:.026,flatShading:!0}),s=de("roof_shingles",{color:"#facc15",metalness:.42,roughness:.38,bumpScale:.024,flatShading:!0}),r=de("mallorn_foliage",{color:"#34b87c",roughness:.84,bumpScale:.025}),o=ct("#34d399",{emissive:"#10b981",emissiveIntensity:.9}),a=new U(new et(.42,.48,.08,6),n);a.position.y=oe+.04,a.receiveShadow=!0,i.add(a);for(let l=0;l<4;l++){const u=l*Math.PI/2+Math.PI/4,f=new U(new et(.04,.04,.44,5),n);f.position.set(Math.cos(u)*.28,oe+.3,Math.sin(u)*.28),f.castShadow=!0,i.add(f)}for(const[l,u]of[[-.36,-.34],[.36,-.34]]){const f=new U(Ou,r);f.position.set(l,oe+.13,u),f.scale.set(.85,.72,.85),f.castShadow=!0,i.add(f)}const c=new U(new At(.38,.3,6),s);c.position.y=oe+.65,c.castShadow=!0,i.add(c);const d=new U(new wt(.12,0),o);return d.position.y=oe+.3,i.add(d),null}case"slag_pit":{const n=de("dark_iron",{color:"#534b5e",metalness:.3,roughness:.68,bumpScale:.035}),s=ct("#ff6b2b",{emissive:"#f97316",emissiveIntensity:1.2}),r=new U(new et(.52,.6,.18,6),n);r.position.y=oe+.09,r.castShadow=!0,i.add(r);const o=new U(new et(.38,.38,.2,6),s);return o.position.y=oe+.1,i.add(o),null}case"foundry":{const n=de("dark_iron",{color:"#534b5e",metalness:.32,roughness:.66,bumpScale:.035}),s=ct("#ff6b2b",{emissive:"#f97316",emissiveIntensity:1.15}),r=new U(new pe(.76,.36,.64),n);r.position.set(-.18,oe+.18,-.18),r.castShadow=!0,i.add(r);const o=new U(new et(.12,.16,.7,6),n);o.position.set(.06,oe+.44,-.32),o.castShadow=!0,i.add(o);const a=new U(new pe(.28,.18,.08),s);return a.position.set(-.24,oe+.14,.15),i.add(a),null}case"great_forge":{const n=de("granite_runic",{color:"#7e8c9e",roughness:.88,bumpScale:.036}),s=de("dark_iron",{color:"#e08a1e",metalness:.48,roughness:.38,bumpScale:.026}),r=ct("#ff6b2b",{emissive:"#f97316",emissiveIntensity:1.2}),o=new U(new pe(.86,.38,.78),n);o.position.set(-.16,oe+.19,-.16),o.castShadow=!0,i.add(o);const a=new U(new pe(.76,.12,.68),s);a.position.set(-.16,oe+.44,-.16),i.add(a);const c=new U(new pe(.26,.62,.26),n);c.position.set(-.16,oe+.62,-.32),c.castShadow=!0,i.add(c);const d=new U(new pe(.34,.2,.08),r);return d.position.set(-.16,oe+.15,.24),i.add(d),null}}}function Lv(i){const e=new Je,t=i*Ds+.12,n=1.04,s=de("bedrock_skirt",{color:"#ffffff",roughness:.92,bumpScale:.04,repeatX:i*.5,repeatY:1}),r=de("rock",{color:"#6b5845",roughness:.94,bumpScale:.03,repeatX:i*.5,repeatY:i*.5}),o=ct("#242f40",{roughness:.96}),a=new U(new pe(t,n,t),[s,s,r,o,s,s]);return a.position.y=-.23-n*.5,a.receiveShadow=!0,e.add(a),e}const ko=-.32,No=-.32;function pi(i,e,t,n,s=.075,r=.095,o=.03,a="#fcd34d",c="#f59e0b"){const d=ct(a,{emissive:c,emissiveIntensity:.95,roughness:.32}),l=new U(new pe(s,r,o),d);l.position.set(e,t,n),i.add(l)}function Rd(i,e,t,n,s,r){const o=new U(new et(.028,.04,.13,5),s);o.position.set(e,t+.065,n),o.castShadow=!0,i.add(o);const a=new U(new wt(.048,0),r);a.position.set(e,t+.16,n),i.add(a)}function Xs(i,e,t,n,s,r,o,a,c,d=0){const l=ct("#cbd5e1",{metalness:.52,roughness:.34}),u=ct(o,{emissive:o,emissiveIntensity:.16,roughness:.78}),f=ct(a,{metalness:.48,roughness:.36}),h=new U(new et(.016,.02,r,5),l);h.position.set(t,n+r*.5,s),h.castShadow=!0,i.add(h);const g=new U(new wt(.038,0),f);g.position.set(t,n+r+.025,s),i.add(g);const _=new Je;_.position.set(t,n+r-.09,s),_.rotation.y=d,_.userData.bannerPhase=c,_.userData.baseRotY=d;const m=new U(new pe(.22,.13,.024),u);m.position.set(.11,0,0),m.castShadow=!0,_.add(m);const p=new U(new pe(.2,.03,.028),f);p.position.set(.1,-.04,0),_.add(p),i.add(_),e.push(_)}function Uv(i,e,t,n,s,r,o){const a=new pe(.075,.06,.075),c=s*.5-.04,d=r*.5-.04,l=[[-c,-d],[0,-d],[c,-d],[-c,d],[0,d],[c,d],[-c,0],[c,0]];for(const[u,f]of l){const h=new U(a,o);h.position.set(e+u,t,n+f),i.add(h)}}function Mc(i){const e=new Je;e.position.y=oe;const t=[],n=[];e.userData.banners=t,e.userData.smokePuffs=n;const s=i.styleFaction,r=bt[s].palette,o=s==="orcs"?"#ef4444":r.primary,a=s==="orcs"?"#4f4857":s==="elves"?"#ece6d4":s==="dwarves"?"#6b7685":"#e4dfd2",c=s==="orcs"?"#62596b":s==="elves"?"#f7f3e6":s==="dwarves"?"#828e9e":"#f2ede2",d=s==="orcs"?"wasteland":s==="elves"?"marble_masonry":"cobble",l=s==="orcs"?"orc_rock":s==="elves"?"marble_masonry":s==="dwarves"?"granite_runic":"cobble",u=new U(new pe(1.78,he,1.78),de(d,{color:a,roughness:.88,bumpScale:s==="orcs"?.035:.028}));u.position.y=he*.5,u.receiveShadow=!0,u.castShadow=!1,e.add(u);const f=new U(new et(.46,.5,.018,8),de(l,{color:c,roughness:.84,bumpScale:.022}));f.position.set(Tr,he+.009,Er),f.receiveShadow=!0,e.add(f);const h=de("dark_iron",{color:"#4c5160",metalness:.45,roughness:.44,bumpScale:.024}),g=ct("#fbbf24",{emissive:"#f59e0b",emissiveIntensity:1.15,roughness:.32});Rd(e,-.06,he,.6,h,g),Rd(e,.6,he,-.06,h,g);const _=new Je;_.userData.levelTier=1;const m=new Je;m.userData.levelTier=2;const p=new Je;p.userData.levelTier=3;const v=new Je;switch(v.userData.levelTier=4,s){case"humans":kv(_,m,p,v,o,r.secondary,r.accent,t);break;case"orcs":Nv(_,m,p,v,o,"#453e4d","#ff6b2b",t);break;case"elves":Ov(_,m,p,v,o,r.secondary,r.accent,t);break;case"dwarves":Fv(_,m,p,v,o,r.secondary,r.accent,t,n);break}if(e.add(_),i.level>=2&&e.add(m),i.level>=3&&e.add(p),i.level>=4&&e.add(v),i.isCapital&&Xs(e,t,-.68,he,.5,.52,o,r.accent,i.x*.7+i.y*1.1,.35),i.hasWalls&&Bv(e,s,r.secondary,o,r.accent),i.parks>0){const y=de(s==="elves"?"mallorn_foliage":"foliage",{color:"#38b54a",roughness:.86,bumpScale:.024}),M=de("bark",{color:"#75533a",roughness:.9,bumpScale:.028}),x=ct("#facc15",{metalness:.52,roughness:.34}),T=[[-.68,.18],[.2,-.68],[-.68,-.66]],b=Math.min(i.parks,T.length);for(let w=0;w<b;w++){const[S,R]=T[w],P=new U(new et(.028,.038,.1,5),M);P.position.set(S,he+.05,R),e.add(P);const D=new U(new At(.12,.22,5),y);D.position.set(S,he+.19,R),D.castShadow=!0,e.add(D)}const E=new U(new wt(.085,0),x);E.position.set(-.56,he+.18,.62),e.add(E)}return e}function kv(i,e,t,n,s,r,o,a){const c=de("marble_masonry",{color:r,roughness:.84,bumpScale:.03,flatShading:!0}),d=de("roof_shingles",{color:s,roughness:.78,bumpScale:.028,flatShading:!0}),l=ct(o,{metalness:.52,roughness:.34}),u=ko,f=No,h=new U(new pe(.58,.3,.5),c);h.position.set(u,he+.15,f),h.castShadow=!0,h.receiveShadow=!0,i.add(h),Uv(i,u,he+.32,f,.58,.5,c);const g=new U(new At(.42,.22,4),d);g.position.set(u,he+.41,f),g.rotation.y=Math.PI/4,g.castShadow=!0,i.add(g),pi(i,u-.11,he+.18,f+.255),pi(i,u+.11,he+.18,f+.255),pi(i,u+.295,he+.18,f,.03,.09,.075);const _=new U(new pe(.12,.14,.035),de("timber",{color:"#784c28",roughness:.88,bumpScale:.026}));_.position.set(u,he+.07,f+.25),i.add(_);const m=new U(new et(.022,.035,.14,5),de("bark",{color:"#e2e8f0",roughness:.86,bumpScale:.024}));m.position.set(-.58,he+.07,.22),i.add(m);const p=new U(new Pn(.105,0),de("mallorn_foliage",{color:"#ffffff",emissive:"#e2e8f0",emissiveIntensity:.22,roughness:.84,bumpScale:.02}));p.position.set(-.58,he+.19,.22),p.castShadow=!0,i.add(p),Xs(i,a,u+.26,he+.3,f+.22,.26,s,o,.5);const v=new U(new et(.13,.17,.44,6),c);v.position.set(-.66,he+.22,-.62),v.castShadow=!0,e.add(v);const y=new U(new At(.19,.22,6),d);y.position.set(-.66,he+.55,-.62),y.castShadow=!0,e.add(y);const M=new U(new pe(.32,.22,.28),c);M.position.set(.32,he+.11,-.56),M.castShadow=!0,e.add(M);const x=new U(new At(.25,.18,4),d);x.position.set(.32,he+.31,-.56),x.rotation.y=Math.PI/4,e.add(x);const T=new U(new et(.1,.18,.54,6),c);T.position.set(u,he+.46,f-.04),T.castShadow=!0,t.add(T);const b=new U(new At(.14,.22,6),d);b.position.set(u,he+.78,f-.04),b.castShadow=!0,t.add(b);const E=new U(new wt(.055,0),l);E.position.set(u,he+.88,f-.04),t.add(E);const w=new U(new et(.12,.16,.48,6),c);w.position.set(.54,he+.24,-.52),w.castShadow=!0,n.add(w);const S=new U(new wt(.09,0),ct("#fbbf24",{emissive:"#f59e0b",emissiveIntensity:1.25}));S.position.set(.54,he+.56,-.52),n.add(S)}function Nv(i,e,t,n,s,r,o,a){const c=de("dark_iron",{color:r,roughness:.68,metalness:.26,bumpScale:.035,flatShading:!0}),d=de("dark_iron",{color:"#3f384a",roughness:.56,metalness:.38,bumpScale:.034,flatShading:!0}),l=ct(o,{emissive:"#ff6b2b",emissiveIntensity:1.35}),u=ko,f=No,h=new U(new et(.24,.36,.38,5),c);h.position.set(u,he+.19,f),h.castShadow=!0,i.add(h);for(let T=0;T<4;T++){const b=T*Math.PI/2+.3,E=new U(new At(.06,.2,4),d);E.position.set(u+Math.cos(b)*.22,he+.44,f+Math.sin(b)*.22),E.castShadow=!0,i.add(E)}const g=new U(new pe(.24,.22,.07),d);g.position.set(u+.1,he+.11,f+.24),i.add(g),pi(i,u+.1,he+.11,f+.28,.12,.13,.03,"#fb923c","#ff6b2b"),Xs(i,a,u-.3,he,f+.42,.42,s,"#383242",1.2,.4);const _=new U(new At(.23,.34,5),d);_.position.set(-.58,he+.17,.22),_.castShadow=!0,e.add(_),pi(e,-.46,he+.12,.33,.06,.07,.03,"#fb923c","#ff6b2b"),Xs(e,a,.34,he,-.56,.48,s,o,2.1,-.5);const m=new U(new et(.11,.24,.62,5),c);m.position.set(u,he+.46,f-.04),m.castShadow=!0,t.add(m);const p=new U(new At(.055,.22,4),d);p.position.set(u-.11,he+.8,f-.04),p.rotation.z=.22,t.add(p);const v=p.clone();v.position.x=u+.11,v.rotation.z=-.22,t.add(v);const y=new U(new wt(.095,0),l);y.scale.set(1.25,.72,.72),y.position.set(u,he+.79,f-.04),t.add(y);const M=new U(new et(.13,.2,.48,5),d);M.position.set(.5,he+.24,-.5),M.castShadow=!0,n.add(M);const x=new U(new wt(.085,0),l);x.position.set(.5,he+.54,-.5),n.add(x)}function Ov(i,e,t,n,s,r,o,a){const c=de("marble_masonry",{color:r,roughness:.8,bumpScale:.026,flatShading:!0}),d=de("roof_shingles",{color:o,metalness:.4,roughness:.38,bumpScale:.024,flatShading:!0}),l=de("roof_shingles",{color:s,roughness:.74,bumpScale:.026,flatShading:!0}),u=de("bark",{color:r,roughness:.86,bumpScale:.028}),f=de("mallorn_foliage",{color:s,roughness:.82,bumpScale:.025}),h=de("mallorn_foliage",{color:o,roughness:.8,bumpScale:.025}),g=ct("#fef08a",{emissive:"#facc15",emissiveIntensity:1.05}),_=ko,m=No,p=new U(new et(.28,.34,.3,6),c);p.position.set(_,he+.15,m),p.castShadow=!0,i.add(p);const v=new U(new At(.36,.3,6),d);v.position.set(_,he+.44,m),v.castShadow=!0,i.add(v),pi(i,_+.06,he+.16,m+.3,.065,.12,.03,"#fef08a","#facc15"),pi(i,_+.3,he+.16,m+.04,.03,.12,.065,"#fef08a","#facc15"),Xs(i,a,_-.32,he,m+.42,.44,s,o,.8,.3);const y=new U(new et(.05,.08,.34,6),u);y.position.set(-.58,he+.17,.22),e.add(y);const M=new U(new Pn(.2,0),f);M.scale.set(1.1,.72,1.1),M.position.set(-.58,he+.38,.22),M.castShadow=!0,e.add(M);const x=new U(new Pn(.16,0),h);x.scale.set(1,.72,1),x.position.set(-.58,he+.52,.22),x.castShadow=!0,e.add(x);const T=new U(new At(.14,.5,6),c);T.position.set(.38,he+.25,-.52),T.castShadow=!0,e.add(T);const b=new U(new et(.07,.15,.62,6),c);b.position.set(_,he+.46,m-.04),b.castShadow=!0,t.add(b);const E=new U(new At(.18,.24,6),l);E.position.set(_,he+.74,m-.04),t.add(E);const w=new U(new wt(.08,0),g);w.position.set(_,he+.88,m-.04),t.add(w);const S=new U(new wt(.075,0),g);S.position.set(-.54,he+.42,.52),n.add(S);const R=new U(new wt(.075,0),g);R.position.set(.54,he+.42,-.54),n.add(R)}function Fv(i,e,t,n,s,r,o,a,c){const d=de("granite_runic",{color:r,roughness:.86,bumpScale:.036}),l=de("granite_runic",{color:"#5c6a7d",roughness:.88,bumpScale:.038}),u=de("dark_iron",{color:s,metalness:.48,roughness:.36,bumpScale:.026}),f=de("dark_iron",{color:"#464d5c",metalness:.44,roughness:.48,bumpScale:.03}),h=ct(o,{emissive:"#f97316",emissiveIntensity:1.15}),g=de("cloud",{color:"#e2e8f0",roughness:.95,bumpScale:.01,transparent:!0,opacity:.68,flatShading:!1}),_=ko,m=No,p=new U(new pe(.68,.34,.58),d);p.position.set(_,he+.17,m),p.castShadow=!0,i.add(p);const v=new U(new pe(.74,.07,.64),u);v.position.set(_,he+.36,m),i.add(v);const y=new U(new pe(.29,.25,.05),f);y.position.set(_+.04,he+.125,m+.285),i.add(y);const M=new U(new pe(.24,.22,.06),h);M.position.set(_+.04,he+.11,m+.29),i.add(M),pi(i,_-.19,he+.24,m+.295,.07,.07,.03),pi(i,_+.345,he+.2,m,.03,.09,.09);const x=new U(new pe(.18,.52,.18),l);x.position.set(_+.24,he+.26,m-.22),x.castShadow=!0,i.add(x);const T=new U(new pe(.12,.06,.12),h);T.position.set(_+.24,he+.53,m-.22),i.add(T);for(let P=0;P<3;P++){const D=new U(new Pn(.075,0),g),G=he+.62;D.position.set(_+.24,G+P*.16,m-.22),D.userData.smokeBaseX=_+.24,D.userData.smokeBaseY=G,D.userData.smokeBaseZ=m-.22,D.userData.smokePhase=P*.33,i.add(D),c.push(D)}Xs(i,a,_-.34,he,m+.42,.42,s,o,1.5,.2);const b=new U(new pe(.2,.46,.2),l);b.position.set(-.64,he+.23,-.6),b.castShadow=!0,e.add(b);const E=new U(new pe(.2,.44,.2),l);E.position.set(.4,he+.22,-.54),E.castShadow=!0,e.add(E);const w=new U(new pe(.48,.28,.42),d);w.position.set(_,he+.52,m-.04),w.castShadow=!0,t.add(w);const S=new U(new pe(.28,.24,.28),u);S.position.set(_,he+.74,m-.04),S.castShadow=!0,t.add(S);const R=new U(new pe(.18,.52,.18),u);R.position.set(-.58,he+.26,.3),R.castShadow=!0,n.add(R)}function Bv(i,e,t,n,s){const r=e==="orcs"?"dark_iron":e==="dwarves"?"granite_runic":"marble_masonry",o=e==="orcs"||e==="dwarves"?"dark_iron":"roof_shingles",a=de(r,{color:e==="orcs"?"#4f4859":e==="dwarves"?"#69778a":t,roughness:e==="orcs"?.62:.86,metalness:e==="orcs"?.32:0,bumpScale:e==="orcs"||e==="dwarves"?.036:.028}),c=de(o,{color:n,roughness:e==="dwarves"?.42:.76,metalness:e==="dwarves"?.44:0,bumpScale:.026,flatShading:!0}),d=ct(s,{metalness:.48,roughness:.36}),l=.16,u=.84,f=he+l*.5,h=new pe(1.68,l,.09),g=new pe(.76,l,.09),_=new U(h,a);_.position.set(0,f,-u),_.castShadow=!0,i.add(_);const m=new U(h,a);m.rotation.y=Math.PI/2,m.position.set(-u,f,0),m.castShadow=!0,i.add(m);const p=new U(g,a);p.position.set(-.46,f,u),p.castShadow=!0,i.add(p);const v=new U(g,a);v.rotation.y=Math.PI/2,v.position.set(u,f,-.46),v.castShadow=!0,i.add(v);const y=new pe(.18,.24,.18),M=new At(.14,.14,4),x=[[-u,-u],[u,-u],[-u,u]];for(const[b,E]of x){const w=new U(y,a);w.position.set(b,he+.12,E),w.castShadow=!0,i.add(w);const S=new U(M,c);S.position.set(b,he+.31,E),S.rotation.y=Math.PI/4,i.add(S)}const T=[[-.08,u],[u,-.08]];for(const[b,E]of T){const w=new U(new pe(.13,.22,.13),a);w.position.set(b,he+.11,E),w.castShadow=!0,i.add(w);const S=new U(new wt(.055,0),d);S.position.set(b,he+.26,E),i.add(S)}}const Hv=new Pn(.55,1);function Vn(i,e,t){const n=Math.sin(i*127.1+e*311.7+t*74.7)*43758.5453123;return n-Math.floor(n)}function zv(i,e,t){const n=new Je,s=1.28+(Vn(i,e,1)-.5)*.22,r=Vn(i,e,2)*Math.PI*2,o=de("cloud",{color:"#ffffff",roughness:.96,metalness:0,bumpScale:.012,flatShading:!1}),a=de("cloud",{color:"#dbe7f5",roughness:.96,metalness:0,bumpScale:.012,flatShading:!1}),c=4+(Vn(i,e,3)>.5?1:0);for(let d=0;d<c;d++){const l=d===0,u=d/Math.max(c-1,1)*Math.PI*2+Vn(i,e,10+d)*.8,f=l?0:.42+Vn(i,e,20+d)*.28,h=l?1.15+Vn(i,e,30)*.25:.68+Vn(i,e,31+d)*.35,g=new U(Hv,l||d%2===0?o:a);g.position.set(Math.cos(u)*f,l?.1:(Vn(i,e,40+d)-.5)*.16,Math.sin(u)*f),g.scale.set(h*1.15,h*.68,h*1.08),g.rotation.set(Vn(i,e,50+d)*Math.PI,Vn(i,e,60+d)*Math.PI,0),g.castShadow=!1,g.receiveShadow=!1,n.add(g)}return n.position.set(t.x,s,t.z),{group:n,baseY:s,phase:r,baseX:t.x,baseZ:t.z}}const Gv="/assets/www/".replace(/\/?$/,"/"),Et=i=>`${Gv}sprites/${i}`,Ki={humans_warrior:Et("humans_warrior.svg"),humans_defender:Et("humans_defender.svg"),humans_archer:Et("humans_archer.svg"),humans_rider:Et("humans_rider.svg"),humans_catapult:Et("humans_catapult.svg"),humans_rohirrim_knight:Et("humans_rohirrim_knight.svg"),orcs_warrior:Et("orcs_warrior.svg"),orcs_defender:Et("orcs_defender.svg"),orcs_archer:Et("orcs_archer.svg"),orcs_rider:Et("orcs_rider.svg"),orcs_catapult:Et("orcs_catapult.svg"),orcs_uruk_berserker:Et("orcs_uruk_berserker.svg"),elves_warrior:Et("elves_warrior.svg"),elves_defender:Et("elves_defender.svg"),elves_archer:Et("elves_archer.svg"),elves_rider:Et("elves_rider.svg"),elves_catapult:Et("elves_catapult.svg"),elves_elven_sentinel:Et("elves_elven_sentinel.svg"),dwarves_warrior:Et("dwarves_warrior.svg"),dwarves_defender:Et("dwarves_defender.svg"),dwarves_archer:Et("dwarves_archer.svg"),dwarves_rider:Et("dwarves_rider.svg"),dwarves_catapult:Et("dwarves_catapult.svg"),dwarves_ironbreaker:Et("dwarves_ironbreaker.svg")},Vv={rohirrim_knight:Ki.humans_rohirrim_knight,uruk_berserker:Ki.orcs_uruk_berserker,elven_sentinel:Ki.elves_elven_sentinel,ironbreaker:Ki.dwarves_ironbreaker};function qc(i,e){const t=`${e}_${i}`,n=Ki[t];if(n)return n;const s=Vv[i];return s||(Ki[`${e}_warrior`]??Ki.humans_warrior)}const Ei=1.56,Wv={dwarves:.78,humans:1,elves:1.06,orcs:1.02},$v={dwarves:1.08,humans:1,elves:.94,orcs:1.05};function Fu(i,e="humans"){const t=Wv[e],n=$v[e];switch(i){case"uruk_berserker":{const s=Ei*1.24;return{width:s*1.04,height:s,shadowScale:1.12}}case"rohirrim_knight":{const s=Ei*1.24;return{width:s*1.05,height:s,shadowScale:1.22}}case"rider":{const s=e==="humans"||e==="dwarves"?1.18:1.16,r=Ei*t*s;return{width:r*(e==="dwarves"?1.13:e==="elves"?1:1.06),height:r,shadowScale:e==="dwarves"?1.12:1.2}}case"catapult":{const s=e==="dwarves"?1.38:1.54;return{width:s*1.22,height:s,shadowScale:1.24}}case"ironbreaker":{const s=Ei*t*1.04;return{width:s*1.11,height:s,shadowScale:1.05}}case"elven_sentinel":{const s=Ei*t*1.03;return{width:s*.94,height:s,shadowScale:1}}case"defender":{const s=Ei*t;return{width:s*(n*1.03),height:s,shadowScale:1.03}}case"archer":{const s=Ei*t*.99;return{width:s*n,height:s,shadowScale:.98}}case"warrior":default:{const s=Ei*t;return{width:s*n,height:s,shadowScale:1}}}}function Cd(i,e="humans"){return Fu(i,e).height}const Xv=new Hf,Id=new Map;function qv(i){let e=Id.get(i);return e||(e=Xv.load(i),e.colorSpace=jt,e.minFilter=li,e.magFilter=In,e.generateMipmaps=!0,e.anisotropy=4,Id.set(i,e)),e}const Bu=new Is(.46,20);Bu.rotateX(-Math.PI/2);const Yv=new et(.39,.43,.044,18),Hu=new Rn(.45,.58,28);Hu.rotateX(-Math.PI/2);const zu=new Rn(.58,.69,24);zu.rotateX(-Math.PI/2);const Kv=new wt(.11,0),Gu=new Pr(.145,.024,6,16);Gu.rotateX(Math.PI/2);const jv=new Ct({color:"#0b1220",transparent:!0,opacity:.34,depthWrite:!1}),wc=new Be("#ffffff"),Pd=new Be("#6e788a"),Zv=new Be("#5c6573");function Jv(i){return i==="orcs"?"#ef4444":bt[i].palette.primary}function oo(i,e){i.onBeforeRender=(t,n,s)=>{if(!s.isOrthographicCamera)return;const r=s.matrixWorld.elements,o=r[8],a=r[9],c=r[10],d=Math.hypot(o,a,c)||1,l=e/d;i.matrixWorld.elements[12]+=o*l,i.matrixWorld.elements[13]+=a*l,i.matrixWorld.elements[14]+=c*l}}function Qv(i,e,t){const n=new Je,s=Jv(e),r=Fu(i,e),o=[],a=new U(Bu,jv);a.position.y=.014,a.scale.setScalar(r.shadowScale),a.renderOrder=2,n.add(a);const c=new Vs({color:s,flatShading:!0,roughness:.68,metalness:.08,emissive:new Be(s),emissiveIntensity:.16});o.push({material:c,originalColor:c.color.clone(),originalEmissive:c.emissive.clone(),originalEmissiveIntensity:c.emissiveIntensity});const d=new U(Yv,c);d.position.y=.026,d.scale.set(r.shadowScale*.94,1,r.shadowScale*.94),d.receiveShadow=!0,d.renderOrder=3,n.add(d);const l=new Ct({color:"#ffffff",side:Ft,transparent:!0,opacity:.94,depthWrite:!1}),u=new U(Hu,l);u.position.y=.038,u.visible=!1,u.renderOrder=4,n.add(u);let f=null;if(t?.canPromote){const E=new Ct({color:"#fde047",side:Ft,transparent:!0,opacity:.9,depthWrite:!1});f=new U(zu,E),f.position.y=.042,f.renderOrder=5,n.add(f)}const h=new Je;h.position.y=.055,n.add(h);const g=qc(i,e),_=qv(g),m=new mc({map:_,color:"#ffffff",transparent:!0,opacity:1,alphaTest:.08,depthTest:!0,depthWrite:!1}),p=new Pl(m);p.center.set(.5,.04),p.scale.set(r.width,r.height,1),p.renderOrder=40,oo(p,.88),h.add(p);const v=new mc({map:_,color:"#ffffff",transparent:!0,opacity:.78,alphaTest:.08,blending:Ca,depthTest:!0,depthWrite:!1}),y=new Pl(v);y.center.set(.5,.04),y.scale.set(r.width,r.height,1),y.visible=!1,y.renderOrder=41,oo(y,.9),h.add(y);let M=null;if(t?.isVeteran){const E=new Je,w=new Vs({color:"#facc15",flatShading:!0,metalness:.58,roughness:.28,emissive:new Be("#eab308"),emissiveIntensity:.62});o.push({material:w,originalColor:w.color.clone(),originalEmissive:w.emissive.clone(),originalEmissiveIntensity:w.emissiveIntensity});const S=new U(Kv,w);S.renderOrder=42,oo(S,.9),E.add(S);const R=new U(Gu,w);R.position.y=-.04,R.renderOrder=42,oo(R,.9),E.add(R),E.position.y=r.height+.1,h.add(E),M=E}const x=wc.clone(),b={group:n,bodyGroup:h,baseDisc:d,baseDiscMat:c,readyRing:u,readyRingMat:l,veteranCrown:M,promoteRing:f,flashMaterials:[c],bodyMaterials:o,banners:[],unitHeight:r.height,sprite:p,spriteMat:m,flashSprite:y,flashSpriteMat:v,shadowDisc:a,baseScaleX:r.width,baseScaleY:r.height,restingSpriteColor:x,restingSpriteOpacity:1,setHitFlash:(E,w="#ffffff")=>{E?(w.toLowerCase()==="#ffffff"||w.toLowerCase()==="white"?(m.color.setRGB(2.2,2.2,2.2),v.color.set("#ffffff"),v.opacity=.82):(m.color.setRGB(2.4,.65,.65),v.color.set(w),v.opacity=.72),m.opacity=1,y.scale.copy(p.scale),y.visible=!0):(m.color.copy(b.restingSpriteColor),m.opacity=b.restingSpriteOpacity,y.visible=!1)}};return Sc(b,{isHumanOwner:!!t?.isHumanOwner,actedThisTurn:!!t?.actedThisTurn,canCapture:!!t?.canCapture,canExploreRuins:!!t?.canExploreRuins}),b}function Sc(i,e){const t=i.bodyMaterials[0];if(e.isHumanOwner&&e.actedThisTurn){i.restingSpriteColor.copy(Pd),i.restingSpriteOpacity=.92,i.spriteMat.color.copy(Pd),i.spriteMat.opacity=.92,i.baseDiscMat.color.copy(Zv),i.baseDiscMat.emissiveIntensity=0,i.baseDiscMat.opacity=.72,i.baseDiscMat.transparent=!0,i.readyRing.visible=!1,i.bodyGroup.scale.set(.96,.95,.96);return}if(i.restingSpriteColor.copy(wc),i.restingSpriteOpacity=1,i.spriteMat.color.copy(wc),i.spriteMat.opacity=1,t&&(i.baseDiscMat.color.copy(t.originalColor),i.baseDiscMat.emissive.copy(t.originalEmissive),i.baseDiscMat.emissiveIntensity=e.isHumanOwner?.24:.14),i.baseDiscMat.opacity=1,i.baseDiscMat.transparent=!1,i.bodyGroup.scale.set(1,1,1),e.isHumanOwner&&!e.actedThisTurn){i.readyRing.visible=!0;const n=!!(e.canCapture||e.canExploreRuins);i.readyRingMat.color.set(n?"#facc15":"#ffffff")}else i.readyRing.visible=!1}function ya(i){i.spriteMat.dispose(),i.flashSpriteMat.dispose(),i.readyRingMat.dispose();for(const e of i.bodyMaterials)e.material.dispose();if(i.promoteRing&&i.promoteRing instanceof U){const e=i.promoteRing.material;Array.isArray(e)?e.forEach(t=>t.dispose()):e.dispose()}}const ey=.033;function En(i,e){return`${i},${e}`}function ii(i){for(;i.children.length>0;)i.remove(i.children[0])}function ty(i){return i==="orcs"?"#ef4444":bt[i].palette.primary}class Xe{boardRoot=new Je;fxGroup=new Je;skirtGroup=new Je;tilesGroup=new Je;bordersGroup=new Je;citiesGroup=new Je;unitsGroup=new Je;cloudsGroup=new Je;overlaysGroup=new Je;static UNIT_HIT_GEO=new et(.5,.54,1.65,10);static UNIT_HIT_MAT=new Ct({visible:!1});static BORDER_RIBBON_H=.055;static BORDER_RIBBON_THICK=.12;static BORDER_H_GEO=new pe(Ds-.02,Xe.BORDER_RIBBON_H,Xe.BORDER_RIBBON_THICK);static BORDER_V_GEO=new pe(Xe.BORDER_RIBBON_THICK,Xe.BORDER_RIBBON_H,Ds-.02);static MOVE_FILL_GEO=(()=>{const e=new Is(.42,24);return e.rotateX(-Math.PI/2),e})();static MOVE_FILL_COMPACT_GEO=(()=>{const e=new Is(.35,24);return e.rotateX(-Math.PI/2),e})();static MOVE_RING_GEO=(()=>{const e=new Rn(.42,.54,28);return e.rotateX(-Math.PI/2),e})();static MOVE_RING_COMPACT_GEO=(()=>{const e=new Rn(.35,.46,28);return e.rotateX(-Math.PI/2),e})();static MOVE_DOT_GEO=(()=>{const e=new Is(.17,18);return e.rotateX(-Math.PI/2),e})();static MOVE_FILL_MAT=new Ct({color:"#38bdf8",side:Ft,transparent:!0,opacity:.72,depthTest:!1,depthWrite:!1});static MOVE_RING_MAT=new Ct({color:"#e0f2fe",side:Ft,transparent:!0,opacity:.94,depthTest:!1,depthWrite:!1});static MOVE_DOT_MAT=new Ct({color:"#e0f2fe",side:Ft,transparent:!0,opacity:.96,depthTest:!1,depthWrite:!1});static ATTACK_RING_GEO=(()=>{const e=new Rn(.62,.84,24);return e.rotateX(-Math.PI/2),e})();static ATTACK_RING_MAT=new Ct({color:"#f43f5e",side:Ft,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1});static ATTACK_DIAMOND_GEO=new wt(.16,0);static ATTACK_DIAMOND_MAT=new Ct({color:"#fb7185"});static LETHAL_OUTER_RING_GEO=(()=>{const e=new Rn(.66,.88,28);return e.rotateX(-Math.PI/2),e})();static LETHAL_OUTER_RING_MAT=new Ct({color:"#ef4444",side:Ft,transparent:!0,opacity:.94,depthTest:!1,depthWrite:!1});static LETHAL_INNER_RING_GEO=(()=>{const e=new Rn(.44,.58,28);return e.rotateX(-Math.PI/2),e})();static LETHAL_INNER_RING_MAT=new Ct({color:"#fbbf24",side:Ft,transparent:!0,opacity:.95,depthTest:!1,depthWrite:!1});static LETHAL_CORE_GEO=new wt(.21,0);static LETHAL_CORE_MAT=new Ct({color:"#dc2626"});static LETHAL_GOLD_MAT=new Ct({color:"#facc15"});static LETHAL_HALO_GEO=(()=>{const e=new Pr(.32,.032,6,16);return e.rotateX(Math.PI/2),e})();static LETHAL_SPIKE_X_GEO=new pe(.22,.045,.045);static LETHAL_SPIKE_Z_GEO=new pe(.045,.045,.22);static LETHAL_CROWN_GEO=new wt(.085,0);mapSize=0;initialized=!1;lastBorderFingerprint=null;tileEntries=new Map;cityEntries=new Map;unitEntries=new Map;tileHitMeshes=[];unitHitMeshes=[];animatedTrees=[];waterMeshes=[];windmillBlades=[];cityBanners=[];unitBanners=[];tileSmokePuffs=[];citySmokePuffs=[];floatingMotes=[];tilesByCoord=new Map;cityCoords=new Set;mountainCoords=new Set;unitWorldCoords=new Map;unitHeightsByCoord=new Map;unitObjects=new Map;unitBaseMeta=new Map;cityObjects=new Map;cloudObjects=new Map;animatingUnitIds=new Set;animatingCloudKeys=new Set;hoverBracket;selectedRing;moveOverlayGroup=new Je;attackOverlayGroup=new Je;constructor(e){this.boardRoot.add(this.skirtGroup,this.tilesGroup,this.bordersGroup,this.citiesGroup,this.unitsGroup,this.cloudsGroup,this.overlaysGroup,this.fxGroup),e.add(this.boardRoot),this.hoverBracket=this.buildHoverBracket(),this.hoverBracket.visible=!1,this.overlaysGroup.add(this.hoverBracket);const t=new Ct({color:"#facc15",side:Ft,transparent:!0,opacity:.92,depthTest:!1,depthWrite:!1});this.selectedRing=new U(new Rn(.64,.8,24),t),this.selectedRing.rotation.x=-Math.PI/2,this.selectedRing.renderOrder=31,this.selectedRing.visible=!1,this.overlaysGroup.add(this.selectedRing),this.overlaysGroup.add(this.moveOverlayGroup,this.attackOverlayGroup)}buildHoverBracket(){const e=new Je,t=new Ct({color:"#fef9c3",transparent:!0,opacity:.9}),n=.92,s=.44,r=.07,o=.03,a=[[-n,-n,1,1],[n,-n,-1,1],[-n,n,1,-1],[n,n,-1,-1]];for(const[c,d,l,u]of a){const f=new U(new pe(s,o,r),t);f.position.set(c+l*s/2,0,d),e.add(f);const h=new U(new pe(r,o,s),t);h.position.set(c,0,d+u*s/2),e.add(h)}return e}getMapSize(){return this.mapSize}getTileHitMeshes(){return this.tileHitMeshes}getUnitHitMeshes(){return this.unitHitMeshes}getUnitObject(e){return this.unitObjects.get(e)}getCityObject(e){return this.cityObjects.get(e)}getCloudObject(e,t){return this.cloudObjects.get(En(e,t))}markUnitAnimating(e,t){t?this.animatingUnitIds.add(e):this.animatingUnitIds.delete(e)}markCloudAnimating(e,t,n){const s=En(e,t);n?this.animatingCloudKeys.add(s):this.animatingCloudKeys.delete(s)}removeCloudImmediate(e,t){const n=En(e,t);this.animatingCloudKeys.delete(n);const s=this.cloudObjects.get(n);s&&(this.disposeCloudFadeMaterials(s),this.cloudsGroup.remove(s.group),this.cloudObjects.delete(n))}revealTilesUnderClouds(e,t,n){if(n.length===0||!this.initialized||this.mapSize!==e.mapSize)return;const r=(e.players.find(a=>a.id===t)??e.players.find(a=>a.isHuman)??e.players[0])?.revealedTiles??[];let o=!1;for(const a of n){if(a.x<0||a.y<0||a.x>=e.mapSize||a.y>=e.mapSize)continue;const c=rt(a.x,a.y,e.mapSize);if(!!!r[c])continue;const l=e.tiles[c],u=En(a.x,a.y);this.tilesByCoord.set(u,l),l.terrain==="mountain"&&!l.isCityCenter&&!l.hasVillage&&this.mountainCoords.add(u);const f=we(e,a.x,a.y-1),h=we(e,a.x,a.y+1),g=we(e,a.x-1,a.y),_=we(e,a.x+1,a.y),m={northWater:f?.terrain==="water",southWater:h?.terrain==="water",westWater:g?.terrain==="water",eastWater:_?.terrain==="water",northRoad:!!(f&&(f.hasRoad||f.isCityCenter)),southRoad:!!(h&&(h.hasRoad||h.isCityCenter)),westRoad:!!(g&&(g.hasRoad||g.isCityCenter)),eastRoad:!!(_&&(_.hasRoad||_.isCityCenter))},p=(m.northWater?1:0)|(m.southWater?2:0)|(m.westWater?4:0)|(m.eastWater?8:0)|(m.northRoad?16:0)|(m.southRoad?32:0)|(m.westRoad?64:0)|(m.eastRoad?128:0),v=l.cityId?e.cities[l.cityId]:void 0,y=`${l.terrain}|${l.biome}|${l.resource??""}|${l.improvement??""}|${l.hasRoad?1:0}|${l.hasVillage?1:0}|${l.isCityCenter?1:0}|${l.cityId??""}|${v?.level??""}|${v?.ownerId??""}|${v?.hasWalls?1:0}|${v?.parks??0}|1|${p}`,M=this.tileEntries.get(u);if(M&&M.fingerprint===y)continue;M&&(this.tilesGroup.remove(M.group),M.built.waterMesh&&M.built.waterMesh.geometry.dispose());const x=oi(l,e.mapSize,m,!0);this.tilesGroup.add(x.group),this.tileEntries.set(u,{fingerprint:y,group:x.group,hitMesh:x.hitMesh,built:x}),o=!0}if(o){this.tileHitMeshes=[],this.animatedTrees=[],this.waterMeshes=[],this.windmillBlades=[],this.floatingMotes=[],this.tileSmokePuffs=[];for(const a of this.tileEntries.values()){const c=a.built;this.tileHitMeshes.push(c.hitMesh),c.animatedTrees.length>0&&this.animatedTrees.push(...c.animatedTrees),c.waterMesh&&this.waterMeshes.push(c.waterMesh),c.windmillBlades&&this.windmillBlades.push(c.windmillBlades),c.floatingMotes.length>0&&this.floatingMotes.push(...c.floatingMotes),c.smokePuffs.length>0&&this.tileSmokePuffs.push(...c.smokePuffs)}}}disposeCloudFadeMaterials(e){const t=e.group.userData.clonedMats;if(t){for(const n of t)n.dispose();e.group.userData.clonedMats=void 0}}resetAllCachedMeshes(){for(const e of this.tileEntries.values())e.built.waterMesh&&e.built.waterMesh.geometry.dispose();ii(this.tilesGroup),this.tileEntries.clear(),this.tileHitMeshes=[],this.animatedTrees=[],this.waterMeshes=[],this.windmillBlades=[],this.floatingMotes=[],this.tileSmokePuffs=[];for(const e of this.cloudObjects.values())this.disposeCloudFadeMaterials(e);ii(this.cloudsGroup),this.cloudObjects.clear(),this.animatingCloudKeys.clear(),ii(this.bordersGroup),this.lastBorderFingerprint=null,ii(this.citiesGroup),this.cityEntries.clear(),this.cityObjects.clear(),this.cityBanners=[],this.citySmokePuffs=[];for(const e of this.unitEntries.values())ya(e.built);ii(this.unitsGroup),this.unitEntries.clear(),this.unitObjects.clear(),this.unitBaseMeta.clear(),this.unitHitMeshes=[],this.unitBanners=[],this.animatingUnitIds.clear()}syncState(e,t){const n=e.players.find(h=>h.id===t)??e.players.find(h=>h.isHuman)??e.players[0],s=n?.id??t,r=n?.revealedTiles??[];(!this.initialized||this.mapSize!==e.mapSize||this.skirtGroup.children.length===0)&&(this.resetAllCachedMeshes(),this.mapSize=e.mapSize,this.initialized=!0,ii(this.skirtGroup),this.skirtGroup.add(Lv(e.mapSize))),this.tilesByCoord.clear(),this.mountainCoords.clear();let o=!1;for(let h=0;h<e.mapSize;h++)for(let g=0;g<e.mapSize;g++){const _=rt(g,h,e.mapSize),m=e.tiles[_],p=En(g,h),v=!!r[_];this.tilesByCoord.set(p,m),v&&m.terrain==="mountain"&&!m.isCityCenter&&!m.hasVillage&&this.mountainCoords.add(p);const y=we(e,g,h-1),M=we(e,g,h+1),x=we(e,g-1,h),T=we(e,g+1,h),b={northWater:y?.terrain==="water",southWater:M?.terrain==="water",westWater:x?.terrain==="water",eastWater:T?.terrain==="water",northRoad:!!(y&&(y.hasRoad||y.isCityCenter)),southRoad:!!(M&&(M.hasRoad||M.isCityCenter)),westRoad:!!(x&&(x.hasRoad||x.isCityCenter)),eastRoad:!!(T&&(T.hasRoad||T.isCityCenter))},E=(b.northWater?1:0)|(b.southWater?2:0)|(b.westWater?4:0)|(b.eastWater?8:0)|(b.northRoad?16:0)|(b.southRoad?32:0)|(b.westRoad?64:0)|(b.eastRoad?128:0),w=m.cityId?e.cities[m.cityId]:void 0,S=`${m.terrain}|${m.biome}|${m.resource??""}|${m.improvement??""}|${m.hasRoad?1:0}|${m.hasVillage?1:0}|${m.isCityCenter?1:0}|${m.cityId??""}|${w?.level??""}|${w?.ownerId??""}|${w?.hasWalls?1:0}|${w?.parks??0}|${v?1:0}|${E}`,R=this.tileEntries.get(p);if(R&&R.fingerprint===S)continue;R&&(this.tilesGroup.remove(R.group),R.built.waterMesh&&R.built.waterMesh.geometry.dispose());const P=oi(m,e.mapSize,b,v);this.tilesGroup.add(P.group),this.tileEntries.set(p,{fingerprint:S,group:P.group,hitMesh:P.hitMesh,built:P}),o=!0}if(o){this.tileHitMeshes=[],this.animatedTrees=[],this.waterMeshes=[],this.windmillBlades=[],this.floatingMotes=[],this.tileSmokePuffs=[];for(const h of this.tileEntries.values()){const g=h.built;this.tileHitMeshes.push(g.hitMesh),g.animatedTrees.length>0&&this.animatedTrees.push(...g.animatedTrees),g.waterMesh&&this.waterMeshes.push(g.waterMesh),g.windmillBlades&&this.windmillBlades.push(g.windmillBlades),g.floatingMotes.length>0&&this.floatingMotes.push(...g.floatingMotes),g.smokePuffs.length>0&&this.tileSmokePuffs.push(...g.smokePuffs)}}for(let h=0;h<e.mapSize;h++)for(let g=0;g<e.mapSize;g++){const _=rt(g,h,e.mapSize),m=En(g,h);if(r[_])this.cloudObjects.has(m)&&!this.animatingCloudKeys.has(m)&&this.removeCloudImmediate(g,h);else if(!this.cloudObjects.has(m)){const p=Mt(g,h,e.mapSize,0),v=zv(g,h,p);this.cloudsGroup.add(v.group),this.cloudObjects.set(m,v)}}const a=[];for(let h=0;h<e.tiles.length;h++){if(!r[h])continue;const g=e.tiles[h].cityId;if(!g)continue;const _=e.cities[g]?.ownerId;_&&a.push(`${h}:${_}`)}const c=a.join(",");c!==this.lastBorderFingerprint&&(this.lastBorderFingerprint=c,this.rebuildTerritoryBorders(e,r)),this.cityCoords.clear();const d=new Set;let l=!1;for(const h of Object.values(e.cities)){const g=rt(h.x,h.y,e.mapSize);if(!r[g])continue;d.add(h.id),this.cityCoords.add(En(h.x,h.y));const _=`${h.x}|${h.y}|${h.styleFaction}|${h.ownerId}|${h.level}|${h.isCapital?1:0}|${h.hasWalls?1:0}|${h.parks}`,m=this.cityEntries.get(h.id);if(m&&m.fingerprint===_)continue;m&&this.citiesGroup.remove(m.mesh);const p=Mc(h),v=Mt(h.x,h.y,e.mapSize,oe);p.position.set(v.x,oe,v.z),this.citiesGroup.add(p),this.cityEntries.set(h.id,{fingerprint:_,mesh:p}),this.cityObjects.set(h.id,p),l=!0}for(const[h,g]of this.cityEntries)d.has(h)||(this.citiesGroup.remove(g.mesh),this.cityEntries.delete(h),this.cityObjects.delete(h),l=!0);if(l){this.cityBanners=[],this.citySmokePuffs=[];for(const h of this.cityEntries.values()){const g=h.mesh.userData.banners;g&&g.length>0&&this.cityBanners.push(...g);const _=h.mesh.userData.smokePuffs;_&&_.length>0&&this.citySmokePuffs.push(..._)}}const u=new Map;for(const h of e.players)u.set(h.id,h.faction);const f=new Set;this.unitHitMeshes=[],this.unitBanners=[],this.unitWorldCoords.clear(),this.unitHeightsByCoord.clear();for(const h of Object.values(e.units)){const g=rt(h.x,h.y,e.mapSize);if(!r[g])continue;f.add(h.id);const _=u.get(h.ownerId)??"humans",m=h.ownerId===s,p=!!h.canCapture,v=!!h.canExploreRuins,y=m?!h.actedThisTurn&&br(e,h.id):!h.actedThisTurn,M=m?!y:h.actedThisTurn,x=ri(e,h.x,h.y),T=`${m?1:0}|${M?1:0}|${p?1:0}|${v?1:0}`,b=this.animatingUnitIds.has(h.id);let E=this.unitEntries.get(h.id);if(E!==void 0&&E.type===h.type&&E.faction===_&&E.isVeteran===h.isVeteran&&E.canPromote===h.canPromote&&E)E.hitMesh.userData.tileX=h.x,E.hitMesh.userData.tileY=h.y,b||(E.built.group.position.copy(x),E.built.group.visible=!0,E.built.group.scale.setScalar(1),E.built.sprite.scale.set(E.built.baseScaleX,E.built.baseScaleY,1),E.built.spriteMat.rotation=0),E.lastVisualKey!==T&&(Sc(E.built,{isHumanOwner:m,actedThisTurn:M,canCapture:p,canExploreRuins:v}),E.lastVisualKey=T);else{E&&(this.unitsGroup.remove(E.built.group),ya(E.built));const P=Qv(h.type,_,{isVeteran:h.isVeteran,canPromote:h.canPromote,actedThisTurn:M,canCapture:p,canExploreRuins:v,isHumanOwner:m});P.group.position.copy(x),Sc(P,{isHumanOwner:m,actedThisTurn:M,canCapture:p,canExploreRuins:v});const D=new U(Xe.UNIT_HIT_GEO,Xe.UNIT_HIT_MAT),G=Math.max(.74,P.unitHeight/1.65);D.scale.set(1,G,1),D.position.y=P.unitHeight*.52,D.userData={tileX:h.x,tileY:h.y,unitId:h.id},P.group.add(D),this.unitsGroup.add(P.group),E={built:P,type:h.type,faction:_,isVeteran:h.isVeteran,canPromote:h.canPromote,hitMesh:D,lastVisualKey:T},this.unitEntries.set(h.id,E),this.unitObjects.set(h.id,P)}this.unitHitMeshes.push(E.hitMesh);const S=this.unitBaseMeta.get(h.id);this.unitBaseMeta.set(h.id,{isHumanOwner:m,exhausted:M,canCapture:p,canExploreRuins:v,phase:S?.phase??(h.x*1.3+h.y*2.1)%(Math.PI*2)}),E.built.banners.length>0&&this.unitBanners.push(...E.built.banners);const R=En(h.x,h.y);this.unitWorldCoords.set(R,x.clone()),this.unitHeightsByCoord.set(R,E.built.unitHeight)}for(const[h,g]of this.unitEntries)!f.has(h)&&!this.animatingUnitIds.has(h)&&(this.unitsGroup.remove(g.built.group),ya(g.built),this.unitEntries.delete(h),this.unitObjects.delete(h),this.unitBaseMeta.delete(h))}rebuildTerritoryBorders(e,t){ii(this.bordersGroup);const n=(o,a)=>{const c=we(e,o,a);return!c||!c.cityId?null:e.cities[c.cityId]?.ownerId??null},s=new Map;for(const o of e.players)s.set(o.id,o.faction);const r=Ds*.5-.06;for(let o=0;o<e.mapSize;o++)for(let a=0;a<e.mapSize;a++){const c=rt(a,o,e.mapSize);if(!t[c])continue;const d=n(a,o);if(!d)continue;const l=s.get(d);if(!l)continue;const u=ty(l),f=ct(u,{roughness:.48,emissive:u,emissiveIntensity:.35}),h=Mt(a,o,e.mapSize,oe+.032);if(n(a,o-1)!==d){const g=new U(Xe.BORDER_H_GEO,f);g.position.set(h.x,h.y,h.z-r),this.bordersGroup.add(g)}if(n(a,o+1)!==d){const g=new U(Xe.BORDER_H_GEO,f);g.position.set(h.x,h.y,h.z+r),this.bordersGroup.add(g)}if(n(a-1,o)!==d){const g=new U(Xe.BORDER_V_GEO,f);g.position.set(h.x-r,h.y,h.z),this.bordersGroup.add(g)}if(n(a+1,o)!==d){const g=new U(Xe.BORDER_V_GEO,f);g.position.set(h.x+r,h.y,h.z),this.bordersGroup.add(g)}}}setHoverTile(e){if(!e){this.hoverBracket.visible=!1;return}const t=Mt(e.x,e.y,this.mapSize,oe+.04);this.hoverBracket.position.copy(t),this.hoverBracket.visible=!0}getMoveOverlayY(e){return e?e.terrain==="mountain"&&!e.isCityCenter&&!e.hasVillage?oe+ji+.04:e.isCityCenter||e.hasVillage?oe+he+.04:e.improvement!==null||e.resource!==null?oe+.36:oe+.05:oe+.05}setSelectedTile(e){if(!e){this.selectedRing.visible=!1;return}const t=En(e.x,e.y),n=this.unitWorldCoords.get(t);if(n){this.selectedRing.position.set(n.x,n.y+.03,n.z),this.selectedRing.visible=!0;return}if(this.mountainCoords.has(t)){const o=Mt(e.x,e.y,this.mapSize,oe+ji+.03);this.selectedRing.position.set(o.x+Ls,o.y,o.z+Us),this.selectedRing.visible=!0;return}const s=this.tilesByCoord.get(t);if(this.cityCoords.has(t)||s?.hasVillage){const o=Mt(e.x,e.y,this.mapSize,oe+he+.03);this.selectedRing.position.set(o.x+Tr,o.y,o.z+Er),this.selectedRing.visible=!0;return}const r=Mt(e.x,e.y,this.mapSize,this.getMoveOverlayY(s));this.selectedRing.position.copy(r),this.selectedRing.visible=!0}setMoveTargets(e){if(ii(this.moveOverlayGroup),e.length!==0)for(const t of e){const n=En(t.x,t.y),s=this.tilesByCoord.get(n),r=this.mountainCoords.has(n)||!!(s&&s.terrain==="mountain"&&!s.isCityCenter&&!s.hasVillage),o=this.cityCoords.has(n)||!!(s&&(s.isCityCenter||s.hasVillage)),a=this.getMoveOverlayY(s),c=Mt(t.x,t.y,this.mapSize,a);r?(c.x+=Ls,c.z+=Us):o&&(c.x+=Tr,c.z+=Er);const d=r||o,l=new U(d?Xe.MOVE_FILL_COMPACT_GEO:Xe.MOVE_FILL_GEO,Xe.MOVE_FILL_MAT);l.position.copy(c),l.renderOrder=32,this.moveOverlayGroup.add(l);const u=new U(d?Xe.MOVE_RING_COMPACT_GEO:Xe.MOVE_RING_GEO,Xe.MOVE_RING_MAT);u.position.set(c.x,c.y+.005,c.z),u.renderOrder=32,this.moveOverlayGroup.add(u);const f=new U(Xe.MOVE_DOT_GEO,Xe.MOVE_DOT_MAT);f.position.set(c.x,c.y+.01,c.z),f.renderOrder=33,f.userData={isMoveDot:!0,phase:(t.x*.7+t.y*1.1)%(Math.PI*2)},this.moveOverlayGroup.add(f)}}setAttackTargets(e){if(ii(this.attackOverlayGroup),e.length!==0)for(const t of e){const n=En(t.x,t.y),s=this.tilesByCoord.get(n),r=this.unitWorldCoords.get(n),o=this.mountainCoords.has(n);let a,c,d;if(r)a=r.x,c=r.y,d=r.z;else if(o){const l=Mt(t.x,t.y,this.mapSize,oe+ji);a=l.x+Ls,c=l.y,d=l.z+Us}else{const l=Mt(t.x,t.y,this.mapSize,this.getMoveOverlayY(s));a=l.x,c=l.y,d=l.z}if(t.lethal){const l=o?.76:1,u=new U(Xe.LETHAL_OUTER_RING_GEO,Xe.LETHAL_OUTER_RING_MAT);u.position.set(a,c+.05,d),u.renderOrder=34,u.userData={isLethalRing:!0,ringPhase:0,baseScale:l},this.attackOverlayGroup.add(u);const f=new U(Xe.LETHAL_INNER_RING_GEO,Xe.LETHAL_INNER_RING_MAT);f.position.set(a,c+.06,d),f.renderOrder=34,f.userData={isLethalRing:!0,ringPhase:Math.PI,baseScale:l},this.attackOverlayGroup.add(f);const h=new Je,g=new U(Xe.LETHAL_CORE_GEO,Xe.LETHAL_CORE_MAT);h.add(g);const _=new U(Xe.LETHAL_HALO_GEO,Xe.LETHAL_GOLD_MAT);h.add(_);const m=new U(Xe.LETHAL_SPIKE_X_GEO,Xe.LETHAL_GOLD_MAT);m.position.x=.28,h.add(m);const p=new U(Xe.LETHAL_SPIKE_X_GEO,Xe.LETHAL_GOLD_MAT);p.position.x=-.28,h.add(p);const v=new U(Xe.LETHAL_SPIKE_Z_GEO,Xe.LETHAL_GOLD_MAT);v.position.z=.28,h.add(v);const y=new U(Xe.LETHAL_SPIKE_Z_GEO,Xe.LETHAL_GOLD_MAT);y.position.z=-.28,h.add(y);const M=new U(Xe.LETHAL_CROWN_GEO,Xe.LETHAL_GOLD_MAT);M.position.y=.28,h.add(M);for(const b of h.children)b.renderOrder=34;const x=this.unitHeightsByCoord.get(n)??1.56,T=c+x+.36;h.position.set(a,T,d),h.renderOrder=34,h.userData={isTargetDiamond:!0,isLethalMarker:!0,baseY:T},this.attackOverlayGroup.add(h)}else{const l=new U(Xe.ATTACK_RING_GEO,Xe.ATTACK_RING_MAT);l.position.set(a,c+.045,d),l.renderOrder=34,o&&l.scale.setScalar(.76),this.attackOverlayGroup.add(l);const u=this.unitHeightsByCoord.get(n)??1.56,f=c+u+.28,h=new U(Xe.ATTACK_DIAMOND_GEO,Xe.ATTACK_DIAMOND_MAT);h.position.set(a,f,d),h.renderOrder=34,h.userData={isTargetDiamond:!0,baseY:f},this.attackOverlayGroup.add(h)}}}clearHighlights(){this.setSelectedTile(null),this.setMoveTargets([]),this.setAttackTargets([])}update(e,t){const n=Math.min(Math.max(e,0),ey);for(const[r,o]of this.unitObjects){const a=this.unitBaseMeta.get(r),c=a?.phase??0;if(!this.animatingUnitIds.has(r))if(a?.isHumanOwner){if(a.exhausted)o.bodyGroup.position.y=.055;else if(o.bodyGroup.position.y=.055+Math.sin(t*3.4+c)*.045,o.readyRing.visible){const d=a.canCapture||a.canExploreRuins,u=.5+.5*Math.sin(t*(d?4.4:3.6)+c),f=1+u*(d?.1:.07);o.readyRing.scale.set(f,f,1),o.readyRingMat.opacity=(d?.78:.72)+u*.22}}else o.bodyGroup.position.y=.055+Math.sin(t*2.4+c)*.016;if(o.veteranCrown&&(o.veteranCrown.rotation.y+=n*1.8),o.promoteRing){const d=1+Math.sin(t*4.5)*.08;o.promoteRing.scale.set(d,d,1)}}for(const r of this.animatedTrees){const o=r.userData.swayPhase??0;r.rotation.z=Math.sin(t*1.4+o)*.036,r.rotation.x=Math.cos(t*1.1+o)*.022}for(const r of this.windmillBlades)r.rotation.z-=n*1.4;rv(n);for(const r of this.waterMeshes){const o=r.userData.tileX??0,a=r.userData.tileY??0;if(this.cloudObjects.has(En(o,a)))continue;const c=r.geometry.attributes.position,d=r.userData.basePositions;for(let l=0;l<c.count;l++){const u=d[l*3],f=d[l*3+2],h=Math.sin(t*2.1+(u+o*2)*1.2+(f+a*2)*.9)*.032;c.setY(l,d[l*3+1]+h)}c.needsUpdate=!0,r.geometry.computeVertexNormals()}for(const[r,o]of this.cloudObjects)this.animatingCloudKeys.has(r)||(o.group.position.y=o.baseY+Math.sin(t*.9+o.phase)*.08,o.group.position.x=o.baseX+Math.cos(t*.45+o.phase)*.05);if(this.selectedRing.visible){const r=1+Math.sin(t*4.2)*.06;this.selectedRing.scale.set(r,r,1)}for(const r of this.moveOverlayGroup.children)if(r.userData.isMoveDot){const o=r.userData.phase??0,a=1+Math.sin(t*4.8+o)*.1;r.scale.setScalar(a)}for(const r of this.attackOverlayGroup.children)if(r.userData.isLethalRing){const o=r.userData.ringPhase??0,c=(r.userData.baseScale??1)*(1+Math.sin(t*6+o)*.11);r.scale.setScalar(c)}else if(r.userData.isTargetDiamond){const o=r.userData.baseY??oe+1.78;if(r.userData.isLethalMarker){r.rotation.y+=n*3.4,r.position.y=o+Math.sin(t*5.6)*.11;const a=1+Math.sin(t*6.5)*.13;r.scale.setScalar(a)}else r.rotation.y+=n*2.4,r.position.y=o+Math.sin(t*4.5)*.08}for(const r of this.cityBanners){const o=r.userData.bannerPhase??0,a=r.userData.baseRotY??0;r.rotation.y=a+Math.sin(t*3.1+o)*.16}for(const r of this.unitBanners){const o=r.userData.bannerPhase??0,a=r.userData.baseRotY??0;r.rotation.y=a+Math.sin(t*3.1+o)*.16}const s=r=>{for(const o of r){const a=o.userData.smokeBaseX??0,c=o.userData.smokeBaseY??0,d=o.userData.smokeBaseZ??0,l=o.userData.smokePhase??0,u=(t*.34+l)%1;o.position.set(a+Math.sin(u*Math.PI*2+l)*.045,c+u*.44,d+Math.cos(u*Math.PI*2+l)*.035);const f=Math.sin(u*Math.PI)*1+.18;o.scale.setScalar(f)}};s(this.tileSmokePuffs),s(this.citySmokePuffs);for(const r of this.floatingMotes){const o=r.userData.moteKind,a=r.userData.baseX??0,c=r.userData.baseY??0,d=r.userData.baseZ??0,l=r.userData.phase??0;if(o==="firefly")r.position.set(a+Math.sin(t*1.1+l)*.14,c+Math.sin(t*1.9+l*1.3)*.12,d+Math.cos(t*.95+l)*.14),r.rotation.y+=n*1.4;else if(o==="ember"){const u=(t*.42+l)%1;r.position.set(a+Math.sin(u*Math.PI*2+l*6)*.08,c+u*.85,d+Math.cos(u*Math.PI*2+l*6)*.08),r.scale.setScalar(.25+Math.sin(u*Math.PI)*.45)}else o==="rune"&&(r.position.y=c+Math.sin(t*2.4+l)*.07,r.rotation.y+=n*1.5)}}}const ny=.033,iy=new pe(.11,.11,.11),sy=new pe(.15,.035,.09),ry=new wt(.1,0),oy=new wt(.11,0),ay=new wt(.19,1),cy=new Pr(.45,.045,4,14,Math.PI*.85),xc=new Rn(.26,.44,32);xc.rotateX(-Math.PI/2);const ly=["#facc15","#38bdf8","#34d399","#fb7185","#fb923c","#f8fafc"];function or(i){return 1-Math.pow(1-i,3)}function Ma(i){return i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2}function ar(i){return i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2}function dy(i){return Math.sin(i*Math.PI*.5)}function Dd(i,e,t){const n=Ot.clamp((t-i)/Math.max(e-i,1e-5),0,1);return n*n*(3-2*n)}class uy{board;badges;tweens=[];particles=[];playing=!1;constructor(e,t){this.board=e,this.badges=t}isPlaying(){return this.playing}update(e){const t=Math.min(Math.max(e,0),ny);for(let n=this.tweens.length-1;n>=0;n--){const s=this.tweens[n];s.elapsed+=t;const r=Math.min(1,s.elapsed/Math.max(s.duration,.001));s.onUpdate(r),r>=1&&(this.tweens.splice(n,1),s.onComplete())}for(let n=this.particles.length-1;n>=0;n--){const s=this.particles[n];if(s.age+=t,s.age>=s.life){this.board.fxGroup.remove(s.mesh),s.matRef.count-=1,s.matRef.count<=0&&s.matRef.mat.dispose(),this.particles.splice(n,1);continue}s.vel.y-=s.gravity*t,s.mesh.position.addScaledVector(s.vel,t),s.mesh.rotation.x+=s.spinX*t,s.mesh.rotation.y+=s.spinY*t,s.mesh.rotation.z+=s.spinZ*t;const r=s.age/s.life,o=1-ar(Math.max(0,(r-.45)/.55));s.mesh.scale.setScalar(Math.max(.01,s.baseScale*o))}}runTween(e,t){return new Promise(n=>{this.tweens.push({elapsed:0,duration:e,onUpdate:t,onComplete:n})})}spawnBurst(e,t,n,s){const r=s?.confetti?sy:s?.spark?ry:iy,o=new Vs({color:n,flatShading:!0,roughness:.42,emissive:new Be(n),emissiveIntensity:s?.spark?.65:s?.confetti?.35:.15}),a={mat:o,count:t},c=s?.speed??2.6,d=s?.gravity??6.5,l=s?.life??.55,u=s?.scale??1;for(let f=0;f<t;f++){const h=new U(r,o);h.position.copy(e);const g=f/Math.max(t,1)*Math.PI*2+(Math.random()-.5)*.65,_=(.35+Math.random()*.65)*c,m=(.8+Math.random()*.72)*c;h.scale.setScalar(u),this.board.fxGroup.add(h),this.particles.push({mesh:h,vel:new k(Math.cos(g)*_,m,Math.sin(g)*_),age:0,life:l*(.78+Math.random()*.42),gravity:d,spinX:(Math.random()-.5)*11,spinY:(Math.random()-.5)*9,spinZ:(Math.random()-.5)*8,baseScale:u,matRef:a})}}spawnConfettiArc(e,t=4){for(const n of ly)this.spawnBurst(e,t,n,{confetti:!0,speed:3.1,gravity:5.4,life:.82,scale:1.05})}isCoordVisible(e,t,n){const s=e.players.find(o=>o.id===t)??e.players.find(o=>o.isHuman);if(!s)return!0;const r=rt(n.x,n.y,e.mapSize);return!!s.revealedTiles[r]}async playEvents(e,t,n,s=1){if(e.length===0)return;this.playing=!0;const r=1/Math.max(s,.25);try{for(const o of e)await this.playSingleEvent(o,t,n,r)}finally{this.playing=!1}}async playSingleEvent(e,t,n,s){const r=t.mapSize;switch(e.type){case"UNIT_MOVED":{if(!(this.isCoordVisible(t,n,e.from)||this.isCoordVisible(t,n,e.to)))return;const a=this.board.getUnitObject(e.unitId);if(!a)return;const c=a.group.position.clone(),d=ri(t,e.to.x,e.to.y);await this.animateHopMove(e.unitId,a,c,d,.32*s);return}case"UNIT_ATTACKED":{if(!(this.isCoordVisible(t,n,e.from)||this.isCoordVisible(t,n,e.to)))return;const a=this.board.getUnitObject(e.attackerId),c=this.board.getUnitObject(e.defenderId),d=a?a.group.position.clone():ri(t,e.from.x,e.from.y),l=c?c.group.position.clone():ri(t,e.to.x,e.to.y),u=()=>(this.badges.spawnFloatingText(e.to,`-${e.damage}`,"damage"),this.spawnBurst(l.clone().add(new k(0,.72,0)),10,"#f87171",{spark:!0,speed:2.4,life:.42}),c?this.animateHitRecoil(e.defenderId,c,d,l,.2*s):Promise.resolve());if(e.isRanged?(await this.animateRangedProjectile(d,l,.34*s),await u()):a?await this.animateMeleeLunge(e.attackerId,a,d,l,.34*s,u):await u(),e.defenderKilled&&c)await this.animateDefeat(e.defenderId,c,l,.26*s);else if(e.retaliationDamage>0&&c&&a){const f=()=>(this.badges.spawnFloatingText(e.from,`-${e.retaliationDamage}`,"damage"),this.spawnBurst(d.clone().add(new k(0,.72,0)),8,"#fb7185",{spark:!0,speed:2.1,life:.36}),this.animateHitRecoil(e.attackerId,a,l,d,.18*s));await this.animateMeleeLunge(e.defenderId,c,l,d,.28*s,f),e.attackerKilled&&await this.animateDefeat(e.attackerId,a,d,.26*s)}if(e.advanced&&a&&!e.attackerKilled){const f=ri(t,e.to.x,e.to.y);await this.animateHopMove(e.attackerId,a,d,f,.28*s)}return}case"TILES_REVEALED":{if(e.playerId!==n||e.coords.length===0)return;this.board.revealTilesUnderClouds(t,n,e.coords);let o=0,a=0,c=0;for(const l of e.coords){const u=this.board.getCloudObject(l.x,l.y);u&&(o+=u.group.position.x,a+=u.group.position.z,c+=1)}if(c===0)return;o/=c,a/=c;const d=[];for(const l of e.coords){const u=this.board.getCloudObject(l.x,l.y);if(!u)continue;this.board.markCloudAnimating(l.x,l.y,!0);const f=[];u.group.traverse(y=>{if(y instanceof U&&y.material instanceof Vs){const M=y.material.clone();M.transparent=!0,M.opacity=1,M.depthWrite=!1,y.material=M,f.push(M)}}),u.group.userData.clonedMats=f;const h=u.group.position.x,g=u.group.position.y,_=u.group.position.z;let m=h-o,p=_-a;const v=Math.hypot(m,p);v>.05?(m=m/v*.42,p=p/v*.42):(m=Math.cos(u.phase)*.34,p=Math.sin(u.phase)*.34),d.push(this.runTween(.36*s,y=>{const M=or(y);u.group.position.x=h+m*M,u.group.position.y=g+M*.72,u.group.position.z=_+p*M,u.group.scale.setScalar(1+M*.32);const x=Math.max(0,1-M);for(const T of f)T.opacity=x}).then(()=>{this.board.removeCloudImmediate(l.x,l.y)}))}d.length>0&&await Promise.all(d);return}case"RESOURCE_HARVESTED":{if(!this.isCoordVisible(t,n,e.coord))return;const o=Mt(e.coord.x,e.coord.y,r,oe+.35);this.spawnBurst(o,12,"#facc15",{spark:!0,speed:2.6,life:.5}),this.badges.spawnFloatingText(e.coord,`+${e.popGained} Pop`,"pop");return}case"IMPROVEMENT_BUILT":case"WOODS_PLANTED":{if(!this.isCoordVisible(t,n,e.coord))return;const o=Mt(e.coord.x,e.coord.y,r,oe+.35);this.spawnBurst(o,10,"#34d399",{spark:!0,speed:2.4,life:.5}),e.popGained>0&&this.badges.spawnFloatingText(e.coord,`+${e.popGained} Pop`,"pop");return}case"FOREST_CHOPPED":{if(!this.isCoordVisible(t,n,e.coord))return;const o=Mt(e.coord.x,e.coord.y,r,oe+.3);this.spawnBurst(o,10,"#d97706",{speed:2.2,life:.45}),this.badges.spawnFloatingText(e.coord,`+${e.goldGained}★`,"gold");return}case"RUINS_CLAIMED":{if(!this.isCoordVisible(t,n,e.coord))return;const o=Mt(e.coord.x,e.coord.y,r,oe+.4);this.spawnBurst(o,16,"#38bdf8",{spark:!0,speed:3,life:.65});const a=e.rewardKind==="gold"?`+${e.amount??5}★ Ruins!`:e.rewardKind==="tech"?"Ancient Tech!":`+${e.amount??3} Pop!`;this.badges.spawnFloatingText(e.coord,a,"level"),await this.animateRisingPulseRing(o,"#38bdf8",.38*s);return}case"CITY_LEVELED":{if(!this.isCoordVisible(t,n,e.coord))return;const o=Mt(e.coord.x,e.coord.y,r,oe+.18);this.badges.spawnFloatingText(e.coord,`LEVEL ${e.newLevel}!`,"level"),this.spawnConfettiArc(o.clone().add(new k(0,.52,0)),4),await this.animateRisingPulseRing(o,"#facc15",.48*s);return}case"CITY_CAPTURED":{if(!this.isCoordVisible(t,n,e.coord))return;const o=Mt(e.coord.x,e.coord.y,r,oe+.22);this.badges.spawnFloatingText(e.coord,e.wasVillage?"Village Claimed!":"City Captured!","level"),this.spawnConfettiArc(o.clone().add(new k(0,.48,0)),4),await this.animateRisingPulseRing(o,"#fbbf24",.48*s);return}case"UNIT_HEALED":{if(!this.isCoordVisible(t,n,e.coord))return;const o=ri(t,e.coord.x,e.coord.y).add(new k(0,.4,0));this.spawnBurst(o,8,"#4ade80",{spark:!0,speed:1.8,life:.45}),this.badges.spawnFloatingText(e.coord,`+${e.amount} HP`,"heal");return}case"UNIT_PROMOTED":{if(!this.isCoordVisible(t,n,e.coord))return;const o=ri(t,e.coord.x,e.coord.y).add(new k(0,.25,0));this.spawnBurst(o,14,"#fde047",{spark:!0,speed:2.8,life:.6}),this.badges.spawnFloatingText(e.coord,"VETERAN!","level"),await this.animateRisingPulseRing(o,"#fde047",.38*s);return}case"UNIT_TRAINED":{if(!this.isCoordVisible(t,n,e.coord))return;const o=ri(t,e.coord.x,e.coord.y).add(new k(0,.2,0));this.spawnBurst(o,8,"#e2e8f0",{speed:1.8,life:.4});return}case"SPOILS_GAINED":{if(!this.isCoordVisible(t,n,e.coord))return;this.badges.spawnFloatingText(e.coord,`+${e.amount}★`,"gold");return}default:return}}async animateHopMove(e,t,n,s,r){const{group:o,sprite:a,shadowDisc:c,baseScaleX:d,baseScaleY:l}=t,u=c.scale.x,f=c.scale.y,h=c.scale.z,g=Math.min(.06,r*.22);this.board.markUnitAnimating(e,!0);try{await this.runTween(r,_=>{const m=Ma(_),p=Math.sin(_*Math.PI);o.position.x=Ot.lerp(n.x,s.x,m),o.position.z=Ot.lerp(n.z,s.z,m),o.position.y=Ot.lerp(n.y,s.y,m)+p*.42;const v=1-p*.24;c.scale.set(u*v,f*v,h*v);const y=1+.12*p,M=1/Math.sqrt(y);a.scale.set(d*M,l*y,1),this.badges.setUnitOverrideWorldPos(e,o.position)}),o.position.copy(s),c.scale.set(u,f,h),this.badges.setUnitOverrideWorldPos(e,s),await this.runTween(g,_=>{const m=Math.sin(_*Math.PI)*(1-_*.28),p=1-.08*m,v=1+.07*m;a.scale.set(d*v,l*p,1)}),a.scale.set(d,l,1)}finally{this.board.markUnitAnimating(e,!1)}}async animateMeleeLunge(e,t,n,s,r,o){const{group:a,sprite:c,spriteMat:d,baseScaleX:l,baseScaleY:u}=t,f=new k().subVectors(s,n);f.lengthSq()>1e-4?f.normalize():f.set(1,0,0);const h=-.16,g=.56,_=f.x>=0?-1:1,m=new Ct({color:"#fef08a",transparent:!0,opacity:0,side:Ft,depthWrite:!1}),p=new U(cy,m);p.position.copy(n).addScaledVector(f,.68),p.position.y=Math.max(n.y,s.y)+.76,p.rotation.x=Math.PI/2,p.rotation.z=Math.atan2(f.x,f.z),p.renderOrder=29,p.visible=!1,this.board.fxGroup.add(p);let v=!1,y=null;this.board.markUnitAnimating(e,!0);try{await this.runTween(r,M=>{let x=0,T=1,b=1,E=0;if(M<.18){const w=dy(M/.18);x=h*w,T=1+.06*w,b=1-.06*w,E=-_*.08*w}else if(M<.48){const w=Ma((M-.18)/.3);x=Ot.lerp(h,g,w),T=Ot.lerp(1.06,1.12,w),b=Ot.lerp(.94,.92,w),E=Ot.lerp(-_*.08,_*.15,w)}else{v||(v=!0,p.visible=!0,o&&(y=o()));const w=Ma((M-.48)/.52);x=Ot.lerp(g,0,w),T=Ot.lerp(1.12,1,w),b=Ot.lerp(.92,1,w),E=Ot.lerp(_*.15,0,w);const S=(M-.48)/.52;p.scale.setScalar(.68+or(S)*.78),m.opacity=Math.max(0,.92*(1-ar(S)))}a.position.copy(n).addScaledVector(f,x),c.scale.set(l*T,u*b,1),d.rotation=E,this.badges.setUnitOverrideWorldPos(e,a.position)}),!v&&o&&(y=o()),y&&await y}finally{this.board.fxGroup.remove(p),m.dispose(),a.position.copy(n),c.scale.set(l,u,1),d.rotation=0,this.badges.clearUnitOverrideWorldPos(e),this.board.markUnitAnimating(e,!1)}}async animateRangedProjectile(e,t,n){const s=new Ct({color:"#fef08a",transparent:!0,opacity:1}),r=new Ct({color:"#f59e0b",transparent:!0,opacity:.48,depthWrite:!1}),o=new Je,a=new U(oy,s),c=new U(ay,r);a.renderOrder=29,c.renderOrder=28,o.add(a,c),this.board.fxGroup.add(o);const d=e.clone().add(new k(0,.92,0)),l=t.clone().add(new k(0,.76,0)),u=Math.min(2.35,.95+d.distanceTo(l)*.24);try{await this.runTween(n,f=>{const h=ar(f);o.position.lerpVectors(d,l,h),o.position.y+=Math.sin(f*Math.PI)*u;const g=Dd(0,.14,f),_=1-Dd(.86,1,f)*.45,m=Math.max(.08,g*_);o.scale.setScalar(m),a.rotation.y=f*Math.PI*5,a.rotation.x=f*Math.PI*3,c.scale.setScalar(1+Math.sin(f*Math.PI*4)*.16)}),this.spawnBurst(l,6,"#fde047",{spark:!0,speed:2,life:.32,scale:.85})}finally{this.board.fxGroup.remove(o),s.dispose(),r.dispose()}}async animateHitRecoil(e,t,n,s,r){const o=new k().subVectors(s,n);o.lengthSq()>1e-4?o.normalize():o.set(1,0,0);const a=t.group.position.clone(),c=a.clone().addScaledVector(o,.24);this.board.markUnitAnimating(e,!0),t.setHitFlash(!0,"#ffffff");try{await this.runTween(r,d=>{const l=Math.sin(d*Math.PI)*Math.exp(-d*1.15)*1.38,u=Math.min(1,Math.max(0,l));t.group.position.lerpVectors(a,c,u),d>.4&&t.setHitFlash(!0,"#ff4d4d");const f=1+.14*u,h=1-.12*u;t.sprite.scale.set(t.baseScaleX*f,t.baseScaleY*h,1),t.flashSprite.scale.copy(t.sprite.scale)})}finally{t.group.position.copy(a),t.sprite.scale.set(t.baseScaleX,t.baseScaleY,1),t.flashSprite.scale.set(t.baseScaleX,t.baseScaleY,1),t.setHitFlash(!1),this.board.markUnitAnimating(e,!1)}}async animateDefeat(e,t,n,s){const{group:r,sprite:o,spriteMat:a,baseScaleX:c,baseScaleY:d}=t;this.board.markUnitAnimating(e,!0),this.badges.hideUnitBadge(e),this.spawnBurst(n.clone().add(new k(0,.42,0)),14,"#e2e8f0",{speed:2.9,life:.52});try{await this.runTween(s,l=>{const u=or(l),f=Math.max(.01,1-u);o.scale.set(c*f,d*f,1),a.rotation=u*1.15,a.opacity=Math.max(0,1-u),r.scale.setScalar(f)}),r.visible=!1,a.rotation=0}finally{this.board.markUnitAnimating(e,!1)}}async animateRisingPulseRing(e,t,n){const s=new Ct({color:t,side:Ft,transparent:!0,opacity:.92,depthWrite:!1}),r=new Ct({color:"#ffffff",side:Ft,transparent:!0,opacity:.78,depthWrite:!1}),o=new U(xc,s);o.position.copy(e),o.renderOrder=30,this.board.fxGroup.add(o);const a=new U(xc,r);a.position.copy(e),a.renderOrder=30,this.board.fxGroup.add(a);const c=e.y;try{await this.runTween(n,d=>{const l=or(d);o.scale.setScalar(.75+l*3.55),o.position.y=c+l*.56,s.opacity=Math.max(0,.92*(1-ar(d)));const u=Ot.clamp((d-.12)/.88,0,1),f=or(u);a.scale.setScalar(.55+f*2.65),a.position.y=c+f*.78,r.opacity=d<.12?0:Math.max(0,.75*(1-ar(u)))})}finally{this.board.fxGroup.remove(o,a),s.dispose(),r.dispose()}}}const hy=6,fy=10;class py{sceneManager;board;callbacks;domElement;raycaster=new Wf;pointerNdc=new We;keysDown=new Set;activePointers=new Map;inputLocked=!1;isDragging=!1;gestureWasMultiTouch=!1;lastPinchDistance=null;lastPinchMidX=0;lastPinchMidY=0;lastHoveredKey=null;onPointerDownBound;onPointerMoveBound;onPointerUpBound;onPointerCancelBound;onWheelBound;onContextMenuBound;onKeyDownBound;onKeyUpBound;constructor(e,t,n){this.sceneManager=e,this.board=t,this.callbacks=n,this.domElement=e.getDomElement(),this.domElement.style.touchAction="none",this.onPointerDownBound=s=>this.handlePointerDown(s),this.onPointerMoveBound=s=>this.handlePointerMove(s),this.onPointerUpBound=s=>this.handlePointerUp(s,!1),this.onPointerCancelBound=s=>this.handlePointerUp(s,!0),this.onWheelBound=s=>this.handleWheel(s),this.onContextMenuBound=s=>s.preventDefault(),this.onKeyDownBound=s=>this.handleKeyDown(s),this.onKeyUpBound=s=>this.handleKeyUp(s),this.domElement.addEventListener("pointerdown",this.onPointerDownBound),window.addEventListener("pointermove",this.onPointerMoveBound),window.addEventListener("pointerup",this.onPointerUpBound),window.addEventListener("pointercancel",this.onPointerCancelBound),this.domElement.addEventListener("wheel",this.onWheelBound,{passive:!1}),this.domElement.addEventListener("contextmenu",this.onContextMenuBound),window.addEventListener("keydown",this.onKeyDownBound),window.addEventListener("keyup",this.onKeyUpBound)}setInputLocked(e){this.inputLocked=e}update(e){const t=Math.min(Math.max(e,0),.033);let n=0,s=0;(this.keysDown.has("KeyA")||this.keysDown.has("ArrowLeft"))&&(n-=1),(this.keysDown.has("KeyD")||this.keysDown.has("ArrowRight"))&&(n+=1),(this.keysDown.has("KeyW")||this.keysDown.has("ArrowUp"))&&(s+=1),(this.keysDown.has("KeyS")||this.keysDown.has("ArrowDown"))&&(s-=1),(n!==0||s!==0)&&this.sceneManager.panByAxes(n,s,t)}raycastTile(e,t){const n=this.domElement.getBoundingClientRect();if(e<n.left||e>n.right||t<n.top||t>n.bottom)return null;this.pointerNdc.x=(e-n.left)/n.width*2-1,this.pointerNdc.y=-((t-n.top)/n.height)*2+1,this.raycaster.setFromCamera(this.pointerNdc,this.sceneManager.camera);const s=this.raycaster.intersectObjects(this.board.getUnitHitMeshes(),!1);if(s.length>0){const a=s[0].object.userData;if(typeof a.tileX=="number"&&typeof a.tileY=="number")return{x:a.tileX,y:a.tileY}}const r=this.raycaster.intersectObjects(this.board.getTileHitMeshes(),!1);if(r.length===0)return null;const o=r[0].object.userData;return typeof o.tileX=="number"&&typeof o.tileY=="number"?{x:o.tileX,y:o.tileY}:null}getPinchMetrics(){if(this.activePointers.size<2)return null;const e=this.activePointers.values(),t=e.next().value,n=e.next().value;return!t||!n?null:{distance:Math.hypot(n.x-t.x,n.y-t.y),midX:(t.x+n.x)*.5,midY:(t.y+n.y)*.5}}handlePointerDown(e){if(!(e.pointerType==="mouse"&&e.button!==0&&e.button!==1&&e.button!==2)){this.activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,pointerType:e.pointerType,button:e.button});try{this.domElement.setPointerCapture(e.pointerId)}catch{}if(this.activePointers.size===1)this.isDragging=!1,this.gestureWasMultiTouch=!1,this.lastPinchDistance=null;else if(this.activePointers.size>=2){this.gestureWasMultiTouch=!0,this.isDragging=!0;const t=this.getPinchMetrics();t&&(this.lastPinchDistance=t.distance,this.lastPinchMidX=t.midX,this.lastPinchMidY=t.midY)}}}handlePointerMove(e){const t=this.activePointers.get(e.pointerId);if(t){const r=t.x,o=t.y;if(t.x=e.clientX,t.y=e.clientY,this.activePointers.size>=2){const l=this.getPinchMetrics();if(l){if(this.lastPinchDistance!==null&&this.lastPinchDistance>10&&l.distance>10){const u=l.distance/this.lastPinchDistance;this.sceneManager.zoomByFactor(u),this.sceneManager.panByScreenDelta(l.midX-this.lastPinchMidX,l.midY-this.lastPinchMidY)}this.lastPinchDistance=l.distance,this.lastPinchMidX=l.midX,this.lastPinchMidY=l.midY}return}const a=t.pointerType==="touch"?fy:hy,c=t.x-t.startX,d=t.y-t.startY;!this.isDragging&&Math.hypot(c,d)>a&&(this.isDragging=!0),this.isDragging&&this.sceneManager.panByScreenDelta(t.x-r,t.y-o);return}if(e.pointerType==="touch")return;const n=this.raycastTile(e.clientX,e.clientY),s=n?`${n.x},${n.y}`:null;s!==this.lastHoveredKey&&(this.lastHoveredKey=s,this.board.setHoverTile(n),this.callbacks.onTileHover(n))}handlePointerUp(e,t){const n=this.activePointers.get(e.pointerId);if(n){this.activePointers.delete(e.pointerId);try{this.domElement.hasPointerCapture(e.pointerId)&&this.domElement.releasePointerCapture(e.pointerId)}catch{}if(this.activePointers.size<2&&(this.lastPinchDistance=null),this.activePointers.size===1){const s=this.activePointers.values().next().value;s&&(s.startX=s.x,s.startY=s.y);return}if(this.activePointers.size===0){const s=this.isDragging,r=this.gestureWasMultiTouch;this.isDragging=!1,this.gestureWasMultiTouch=!1;const o=n.pointerType!=="mouse"||n.button===0;if(!t&&!s&&!r&&o&&!this.inputLocked){const a=this.raycastTile(e.clientX,e.clientY);a&&this.callbacks.onTileClick(a)}}}}handleWheel(e){e.preventDefault();const t=e.deltaMode===1?28:e.deltaMode===2?120:1;this.sceneManager.zoomBy(e.deltaY*t)}handleKeyDown(e){const t=e.target?.tagName;t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||(this.keysDown.add(e.code),e.code==="KeyQ"?this.sceneManager.rotateStep(-1):e.code==="KeyE"?this.sceneManager.rotateStep(1):e.code==="Escape"?this.callbacks.onDeselectHotkey?.():e.code==="Space"&&!this.inputLocked&&(e.preventDefault(),this.callbacks.onEndTurnHotkey?.()))}handleKeyUp(e){this.keysDown.delete(e.code)}dispose(){this.domElement.removeEventListener("pointerdown",this.onPointerDownBound),window.removeEventListener("pointermove",this.onPointerMoveBound),window.removeEventListener("pointerup",this.onPointerUpBound),window.removeEventListener("pointercancel",this.onPointerCancelBound),this.domElement.removeEventListener("wheel",this.onWheelBound),this.domElement.removeEventListener("contextmenu",this.onContextMenuBound),window.removeEventListener("keydown",this.onKeyDownBound),window.removeEventListener("keyup",this.onKeyUpBound),this.activePointers.clear()}}const my=.033;function cr(i,e){return`${i},${e}`}function Ld(i){return i==="orcs"?"#ef4444":bt[i].palette.primary}const Ud='<svg class="capture-affordance-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 18h18v2H3v-2zm0-2L5 7l4.5 4L12 5l2.5 6L19 7l2 9H3z"/></svg>',gy='<svg class="capture-affordance-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.6 6.4L21 11l-6.4 2.6L12 20l-2.6-6.4L3 11l6.4-2.6L12 2z"/></svg>';let kd=!1;function _y(){if(kd||typeof document>"u"||(kd=!0,document.querySelector("style[data-world-badges-style]")))return;const i=document.createElement("style");i.setAttribute("data-world-badges-style","true"),i.textContent=`
    .unit-badge,
    .city-badge,
    .city-pip-wrap,
    .floating-popup {
      will-change: transform;
      backface-visibility: hidden;
    }
    @keyframes wb-lethal-pulse {
      0%, 100% {
        box-shadow: 0 0 0 1.5px rgba(250, 204, 21, 0.85), 0 0 10px rgba(239, 68, 68, 0.78);
        transform: scale(1);
      }
      50% {
        box-shadow: 0 0 0 2.5px rgba(250, 204, 21, 1), 0 0 16px rgba(239, 68, 68, 0.95);
        transform: scale(1.06);
      }
    }
    @keyframes wb-capture-pulse {
      0%, 100% {
        box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.88), 0 4px 14px rgba(0, 0, 0, 0.55);
        filter: brightness(1);
      }
      50% {
        box-shadow: 0 0 0 5px rgba(250, 204, 21, 0.35), 0 6px 20px rgba(250, 204, 21, 0.55);
        filter: brightness(1.08);
      }
    }
    .unit-badge.ready-unit {
      border: 2px solid #ffffff !important;
      background: rgba(15, 23, 42, 0.9) !important;
      color: #ffffff !important;
      opacity: 1 !important;
      filter: none !important;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.52);
    }
    .unit-badge.enemy-unit {
      background: rgba(15, 23, 42, 0.88) !important;
      color: #ffffff !important;
      opacity: 1 !important;
      filter: none !important;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    .unit-badge.exhausted {
      border: 1.5px solid rgba(148, 163, 184, 0.35) !important;
      background: rgba(30, 41, 59, 0.8) !important;
      color: #cbd5e1 !important;
      opacity: 0.58 !important;
      filter: saturate(0.45);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.32);
    }
    @keyframes wb-upgrade-pulse {
      0%, 100% {
        box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.85), 0 0 12px rgba(250, 204, 21, 0.55), 0 2px 8px rgba(15, 10, 6, 0.6);
      }
      50% {
        box-shadow: 0 0 0 3.5px rgba(254, 240, 138, 1), 0 0 18px rgba(250, 204, 21, 0.92), 0 3px 10px rgba(15, 10, 6, 0.65);
      }
    }
    .city-pip-wrap,
    .city-pip-badge {
      position: absolute;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      width: auto;
      min-width: 22px;
      height: auto;
      min-height: 22px;
      padding: 2px 6px 2px 2px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.88);
      font-size: 11px;
      font-weight: 800;
      color: #fffdf7;
      border: 1.5px solid rgba(255, 250, 235, 0.9);
      box-shadow: 0 2px 8px rgba(10, 14, 24, 0.58);
      pointer-events: none;
      line-height: 1;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .city-pip-lvl {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      color: #ffffff;
      font-size: 11px;
      font-weight: 800;
      line-height: 1;
      flex-shrink: 0;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.65);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
    .city-pip-progress,
    .city-pip-bar {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 2px 1px;
    }
    .city-pip-seg {
      display: inline-block;
      width: 7px;
      height: 6px;
      border-radius: 1.5px;
      flex-shrink: 0;
    }
    .city-pip-seg.filled {
      background: linear-gradient(180deg, #7dd3fc 0%, #38bdf8 100%);
      border: 1px solid rgba(224, 242, 254, 0.92);
      box-shadow: 0 0 4px rgba(56, 189, 248, 0.78);
    }
    .city-pip-seg.empty {
      background: rgba(15, 23, 42, 0.74);
      border: 1px solid rgba(203, 213, 225, 0.54);
    }
    .city-pip-badge.reward-ready,
    .city-pip-wrap.ready-upgrade {
      border-color: #facc15;
      animation: wb-upgrade-pulse 1.25s ease-in-out infinite;
    }
    .city-pip-wrap.ready-upgrade .city-pip-seg.filled {
      background: linear-gradient(180deg, #fef08a 0%, #facc15 100%);
      border-color: #fef9c3;
      box-shadow: 0 0 5px rgba(250, 204, 21, 0.9);
    }
    .unit-badge.lethal-target {
      border-color: #ef4444 !important;
      box-shadow: 0 0 0 1.5px rgba(250, 204, 21, 0.85), 0 0 12px rgba(220, 38, 38, 0.75);
    }
    .unit-badge .unit-lethal-tag {
      display: inline-flex;
      align-items: center;
      padding: 1px 5px;
      margin-left: 2px;
      border-radius: 4px;
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      color: #fef08a;
      border: 1px solid #facc15;
      font-size: 9px;
      font-weight: 900;
      letter-spacing: 0.06em;
      line-height: 1.15;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.65);
      animation: wb-lethal-pulse 0.9s ease-in-out infinite;
    }
    .capture-affordance-btn {
      position: absolute;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      min-height: 36px;
      padding: 6px 13px;
      border-radius: 999px;
      border: 2px solid #fef9c3;
      background: linear-gradient(180deg, #fde047 0%, #eab308 100%);
      color: #1c1404;
      font-family: var(--font-ui, system-ui, sans-serif);
      font-size: 12.5px;
      font-weight: 900;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      line-height: 1;
      white-space: nowrap;
      pointer-events: auto;
      cursor: pointer;
      touch-action: manipulation;
      z-index: 15;
      will-change: transform;
      animation: wb-capture-pulse 1.35s ease-in-out infinite;
      transition: transform 90ms ease, filter 90ms ease;
    }
    .capture-affordance-btn:hover {
      filter: brightness(1.08);
    }
    .capture-affordance-btn:active {
      filter: brightness(0.95);
    }
    .capture-affordance-btn.ruins-affordance-btn {
      background: linear-gradient(180deg, #fef08a 0%, #f59e0b 100%);
      border-color: #fffbeb;
      color: #1c1203;
    }
    .capture-affordance-icon {
      width: 15px;
      height: 15px;
      flex-shrink: 0;
    }
  `,document.head.appendChild(i)}class vy{root;unitLayer;cityLayer;captureLayer;popupLayer;unitBadges=new Map;cityBadges=new Map;captureAffordances=new Map;unitWorldPosOverrides=new Map;hiddenUnitIds=new Set;popups=[];tempVec=new k;mapSize=11;selectedCoord=null;lethalCoords=new Set;onCaptureClick=null;onExploreRuinsClick=null;constructor(e){_y(),this.root=e,this.root.innerHTML="",this.root.style.pointerEvents="none",this.cityLayer=document.createElement("div"),this.cityLayer.className="world-badges-layer",this.unitLayer=document.createElement("div"),this.unitLayer.className="world-badges-layer",this.captureLayer=document.createElement("div"),this.captureLayer.className="world-badges-layer",this.popupLayer=document.createElement("div"),this.popupLayer.className="world-badges-layer",this.root.append(this.cityLayer,this.unitLayer,this.captureLayer,this.popupLayer)}setOnCaptureClick(e){this.onCaptureClick=e}setOnExploreRuinsClick(e){this.onExploreRuinsClick=e}setUnitOverrideWorldPos(e,t){let n=this.unitWorldPosOverrides.get(e);n||(n=new k,this.unitWorldPosOverrides.set(e,n)),n.set(t.x,t.y+.08,t.z)}clearUnitOverrideWorldPos(e){this.unitWorldPosOverrides.delete(e)}hideUnitBadge(e){this.hiddenUnitIds.add(e);const t=this.unitBadges.get(e);t&&(t.el.style.display="none",t.lastDisplay="none"),this.unitWorldPosOverrides.delete(e)}setSelectedCoord(e){this.selectedCoord=e?{x:e.x,y:e.y}:null,this.refreshCityBadgeModes()}setLethalTargets(e){this.lethalCoords.clear();for(const t of e)this.lethalCoords.add(cr(t.x,t.y));this.refreshUnitLethalStates()}applyCityBadgeMode(e,t){const n=`${t?1:0}|${e.hasReward?1:0}|${e.color}|${t?e.fullHtml:e.pipHtml}`;if(e.isSelected=t,e.renderFingerprint===n)return;e.renderFingerprint=n;const s=e.hasReward?" reward-ready ready-upgrade":"";t?(e.el.className=`city-badge${s}`,e.el.style.background="",e.el.style.borderColor=e.hasReward?"#facc15":e.color,e.el.innerHTML=e.fullHtml):(e.el.className=`city-pip-wrap city-pip-badge${s}`,e.el.style.background="",e.el.style.borderColor=e.hasReward?"#facc15":e.color,e.el.innerHTML=e.pipHtml),e.lastDisplay="",e.lastTransform=""}refreshCityBadgeModes(){const e=this.selectedCoord?cr(this.selectedCoord.x,this.selectedCoord.y):null;for(const t of this.cityBadges.values()){const n=e!==null&&t.coordKey===e;t.isSelected!==n&&this.applyCityBadgeMode(t,n)}}applyUnitLethalState(e,t){const n=`${t?1:0}|${e.baseClass}|${e.borderColor}|${e.baseHtml}`;e.renderFingerprint!==n&&(e.renderFingerprint=n,t?(e.el.className=`${e.baseClass} lethal-target`,e.el.style.borderColor="#ef4444",e.el.innerHTML=`${e.baseHtml}<span class="unit-lethal-tag">LETHAL</span>`):(e.el.className=e.baseClass,e.el.style.borderColor=e.borderColor,e.el.innerHTML=e.baseHtml))}refreshUnitLethalStates(){for(const e of this.unitBadges.values())this.applyUnitLethalState(e,this.lethalCoords.has(e.coordKey))}syncState(e,t,n){n!==void 0&&(this.selectedCoord=n?{x:n.x,y:n.y}:null),this.mapSize=e.mapSize;const s=e.players.find(h=>h.id===t)??e.players.find(h=>h.isHuman)??e.players[0],r=s?.id??t,o=e.phase==="playing"&&e.players[e.activePlayerIndex]?.id===r,a=s?.revealedTiles??[],c=new Map;for(const h of e.players)c.set(h.id,h.faction);this.unitWorldPosOverrides.clear(),this.hiddenUnitIds.clear();const d=new Set,l=new Set;for(const h of Object.values(e.units)){if(!a[rt(h.x,h.y,e.mapSize)])continue;d.add(h.id);const g=c.get(h.ownerId)??"humans",_=Ld(g),m=cr(h.x,h.y),p=h.ownerId===r,v=p&&!h.actedThisTurn&&br(e,h.id),y=p&&!v,x=`unit-badge${v?" ready-unit":y?" exhausted":" enemy-unit"}${h.isVeteran?" veteran":""}`,T=`<span class="unit-dot" style="background:${_}"></span><span class="unit-hp">${h.hp}</span>${h.isVeteran?'<span class="unit-vet">★</span>':""}`,b=v?"#ffffff":y?"rgba(148, 163, 184, 0.35)":_,E=ri(e,h.x,h.y),w=E.clone();w.y+=.08;let S=this.unitBadges.get(h.id);if(S)S.coordKey=m,S.worldPos.copy(w),S.baseHtml=T,S.baseClass=x,S.borderColor=b;else{const R=document.createElement("div");this.unitLayer.appendChild(R),S={el:R,coordKey:m,worldPos:w,baseHtml:T,baseClass:x,borderColor:b,renderFingerprint:"",lastDisplay:"",lastTransform:""},this.unitBadges.set(h.id,S)}if(this.applyUnitLethalState(S,this.lethalCoords.has(m)),o&&v&&h.canCapture){const R=`${h.id}:capture`;l.add(R);const P=we(e,h.x,h.y),G=!!(P?.hasVillage&&!P?.isCityCenter)?"Claim":"Capture",$=`capture|${G}`,q=E.clone();q.y+=Cd(h.type,g)+.28;const K=this.captureAffordances.get(R);if(K)K.worldPos.copy(q),K.renderFingerprint!==$&&(K.renderFingerprint=$,K.el.innerHTML=`${Ud}<span>${G}</span>`);else{const V=document.createElement("button");V.type="button",V.className="capture-affordance-btn",V.dataset.unitId=h.id,V.innerHTML=`${Ud}<span>${G}</span>`;const le=H=>{H.stopPropagation()};V.addEventListener("pointerdown",le),V.addEventListener("pointerup",le),V.addEventListener("click",H=>{H.preventDefault(),H.stopPropagation(),this.onCaptureClick?.(h.id)}),this.captureLayer.appendChild(V),this.captureAffordances.set(R,{el:V,unitId:h.id,worldPos:q,renderFingerprint:$,lastDisplay:"",lastTransform:""})}}if(o&&v&&h.canExploreRuins){const R=`${h.id}:ruins`;l.add(R);const P="ruins|Explore",D=E.clone();D.y+=Cd(h.type,g)+.28;const G=this.captureAffordances.get(R);if(G)G.worldPos.copy(D);else{const $=document.createElement("button");$.type="button",$.className="capture-affordance-btn ruins-affordance-btn",$.dataset.unitId=h.id,$.innerHTML=`${gy}<span>Explore</span>`;const q=K=>{K.stopPropagation()};$.addEventListener("pointerdown",q),$.addEventListener("pointerup",q),$.addEventListener("click",K=>{K.preventDefault(),K.stopPropagation(),this.onExploreRuinsClick?.(h.id)}),this.captureLayer.appendChild($),this.captureAffordances.set(R,{el:$,unitId:h.id,worldPos:D,renderFingerprint:P,lastDisplay:"",lastTransform:""})}}}for(const[h,g]of this.unitBadges)d.has(h)||(g.el.remove(),this.unitBadges.delete(h),this.unitWorldPosOverrides.delete(h));for(const[h,g]of this.captureAffordances)l.has(h)||(g.el.remove(),this.captureAffordances.delete(h));const u=new Set,f=this.selectedCoord?cr(this.selectedCoord.x,this.selectedCoord.y):null;for(const h of Object.values(e.cities)){if(!a[rt(h.x,h.y,e.mapSize)])continue;u.add(h.id);const g=c.get(h.ownerId)??h.styleFaction,_=Ld(g),m=Math.max(1,h.level+1),p=Math.max(0,Math.min(h.population,m)),v=h.pendingLevelRewards.length>0,y=Array.from({length:m},(P,D)=>`<span class="pop-pip${D<p?" filled":""}"></span>`).join(""),M=Array.from({length:m},(P,D)=>`<span class="city-pip-seg ${D<p?"filled":"empty"}"></span>`).join(""),x=h.level+(h.isCapital?1:0)+(h.hasWorkshop?1:0)+(h.connectedToCapital&&!h.isCapital&&g==="humans"?1:0),T=`
        <div class="city-badge-row">
          <span class="city-lvl" style="background:${_}">${h.level}</span>
          <span class="city-name">${h.isCapital?"♛ ":""}${h.name}</span>
          <span class="city-income">+${x}★</span>
        </div>
        <div class="city-pips">${y}</div>
      `,b=`<span class="city-pip-lvl" style="background:${_}">${h.level}</span><div class="city-pip-progress city-pip-bar" aria-label="Level ${h.level}: ${p} of ${m} population">${M}</div>`,E=cr(h.x,h.y),w=Mt(h.x,h.y,e.mapSize,oe+1.25).add(new k(-.28,0,-.28)),S=Mt(h.x,h.y,e.mapSize,oe+1.22).add(new k(-.38,0,-.38));let R=this.cityBadges.get(h.id);if(R)R.coordKey=E,R.selectedWorldPos.copy(w),R.unselectedWorldPos.copy(S),R.fullHtml=T,R.pipHtml=b,R.color=_,R.hasReward=v;else{const P=document.createElement("div");this.cityLayer.appendChild(P),R={el:P,coordKey:E,selectedWorldPos:w,unselectedWorldPos:S,fullHtml:T,pipHtml:b,color:_,hasReward:v,isSelected:!1,renderFingerprint:"",lastDisplay:"",lastTransform:""},this.cityBadges.set(h.id,R)}this.applyCityBadgeMode(R,f!==null&&E===f)}for(const[h,g]of this.cityBadges)u.has(h)||(g.el.remove(),this.cityBadges.delete(h))}spawnFloatingText(e,t,n="info"){const s=document.createElement("div");s.className=`floating-popup popup-${n}`,s.textContent=t,this.popupLayer.appendChild(s);const r=Mt(e.x,e.y,this.mapSize,oe+1.45);this.popups.push({el:s,worldPos:r,age:0,duration:.95})}update(e,t){const n=Math.min(Math.max(t,0),my),s=this.root.clientWidth||window.innerWidth,r=this.root.clientHeight||window.innerHeight,o=(a,c=0)=>{this.tempVec.copy(a),this.tempVec.y+=c,this.tempVec.project(e);const d=(this.tempVec.x*.5+.5)*s,l=(-this.tempVec.y*.5+.5)*r,u=this.tempVec.z<=1&&d>=-120&&d<=s+120&&l>=-80&&l<=r+80;return{x:d,y:l,visible:u}};for(const[a,c]of this.unitBadges){if(this.hiddenUnitIds.has(a)){c.lastDisplay!=="none"&&(c.el.style.display="none",c.lastDisplay="none");continue}const d=this.unitWorldPosOverrides.get(a)??c.worldPos,l=o(d),u=l.visible?"inline-flex":"none";if(c.lastDisplay!==u&&(c.el.style.display=u,c.lastDisplay=u),l.visible){const f=`translate3d(${l.x.toFixed(1)}px, ${(l.y+16).toFixed(1)}px, 0) translate(-50%, -50%)`;c.lastTransform!==f&&(c.el.style.transform=f,c.lastTransform=f)}}for(const a of this.captureAffordances.values()){const c=o(a.worldPos),d=c.visible?"inline-flex":"none";if(a.lastDisplay!==d&&(a.el.style.display=d,a.lastDisplay=d),c.visible){const l=`translate3d(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px, 0) translate(-50%, -100%)`;a.lastTransform!==l&&(a.el.style.transform=l,a.lastTransform=l)}}for(const a of this.cityBadges.values()){const c=a.isSelected?a.selectedWorldPos:a.unselectedWorldPos,d=o(c);if(a.isSelected){const l=d.visible?"flex":"none";if(a.lastDisplay!==l&&(a.el.style.display=l,a.lastDisplay=l),d.visible){const u=`translate3d(${d.x.toFixed(1)}px, ${(d.y-6).toFixed(1)}px, 0) translate(-50%, -100%)`;a.lastTransform!==u&&(a.el.style.transform=u,a.lastTransform=u)}}else{const l=d.visible?"inline-flex":"none";if(a.lastDisplay!==l&&(a.el.style.display=l,a.lastDisplay=l),d.visible){const u=`translate3d(${d.x.toFixed(1)}px, ${d.y.toFixed(1)}px, 0) translate(-50%, -50%)`;a.lastTransform!==u&&(a.el.style.transform=u,a.lastTransform=u)}}}for(let a=this.popups.length-1;a>=0;a--){const c=this.popups[a];if(c.age+=n,c.age>=c.duration){c.el.remove(),this.popups.splice(a,1);continue}const d=c.age/c.duration,l=1-Math.pow(1-d,2),u=o(c.worldPos,l*.95);c.el.style.opacity=String(d<.68?1:Math.max(0,1-(d-.68)/.32)),c.el.style.transform=`translate3d(${u.x.toFixed(1)}px, ${u.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${(1+Math.sin(d*Math.PI)*.14).toFixed(2)})`}}dispose(){this.root.innerHTML="",this.unitBadges.clear(),this.cityBadges.clear(),this.captureAffordances.clear(),this.unitWorldPosOverrides.clear(),this.hiddenUnitIds.clear(),this.popups.length=0}}const Nd=96,yy=new Set(["warrior","defender","archer","rider","catapult","rohirrim_knight","uruk_berserker","elven_sentinel","ironbreaker"]),My=new Set(["berries","game","ore","mithril","ruins"]),wy=new Set(["farm","windmill","mine","sanctuary","slag_pit","foundry","great_forge"]),xs={northWater:!1,southWater:!1,eastWater:!1,westWater:!1,northRoad:!1,southRoad:!1,eastRoad:!1,westRoad:!1},Sy={northWater:!1,southWater:!1,eastWater:!1,westWater:!1,northRoad:!0,southRoad:!0,eastRoad:!0,westRoad:!0};function Vi(i,e={}){return{x:0,y:0,terrain:"plains",biome:i,resource:null,improvement:null,hasRoad:!1,hasVillage:!1,cityId:null,isCityCenter:!1,unitId:null,...e}}function Od(i,e={}){return{id:`thumb_city_${i}`,name:"Citadel",ownerId:"thumb_owner",styleFaction:i,x:0,y:0,isCapital:!0,level:3,population:2,hasWorkshop:!1,hasWalls:!0,borderRadius:1,parks:0,pendingLevelRewards:[],connectedToCapital:!0,...e}}function xy(i){const e=[],t=[],n=new Je,s=oi(Vi(i,{terrain:"plains"}),1,xs,!0);n.add(s.group);const r=bt[i].palette,o=de("marble_masonry",{color:"#e7e2d5",roughness:.84,bumpScale:.025}),a=ct(r.accent,{metalness:.52,roughness:.34}),c=de("foliage",{color:"#2ea874",roughness:.84,bumpScale:.024}),d=new et(.68,.74,.08,8);e.push(d);const l=new U(d,o);l.position.y=oe+.04,n.add(l);const u=new pe(.32,.34,.32);e.push(u);const f=new U(u,o);f.position.y=oe+.25,n.add(f);const h=new wt(.24,0);e.push(h);const g=new U(h,a);g.position.y=oe+.62,g.scale.set(.85,1.35,.85),n.add(g);const _=new Pn(.18,0);e.push(_);const m=[[-.48,-.48],[.48,-.48],[-.48,.48],[.48,.48]];for(const[p,v]of m){const y=new U(_,c);y.position.set(p,oe+.18,v),n.add(y)}return{object:n,ownGeometries:e,ownMaterials:t}}function by(i,e){const t=i.trim().toLowerCase();if(My.has(t)){const s=t,o=Vi(e,{terrain:s==="ore"||s==="mithril"?"mountain":"plains",resource:s});return{object:oi(o,1,xs,!0).group,ownGeometries:[],ownMaterials:[]}}if(wy.has(t)){const s=t;let r="plains";s==="mine"?r="mountain":s==="sanctuary"?r="ancient_woods":s==="slag_pit"||s==="foundry"?r="wasteland":s==="great_forge"&&(r="plains");const o=Vi(e,{terrain:r,improvement:s});return{object:oi(o,1,xs,!0).group,ownGeometries:[],ownMaterials:[]}}if(t==="road"||t==="roads"){const s=Vi(e,{terrain:"plains",hasRoad:!0});return{object:oi(s,1,Sy,!0).group,ownGeometries:[],ownMaterials:[]}}if(t==="ancient_woods"||t==="plant_woods"){const s=Vi(e,{terrain:"ancient_woods"});return{object:oi(s,1,xs,!0).group,ownGeometries:[],ownMaterials:[]}}if(t==="forest"||t==="chop_forest"){const s=Vi(e,{terrain:"forest"});return{object:oi(s,1,xs,!0).group,ownGeometries:[],ownMaterials:[]}}if(t==="mountain"||t==="mountain_pass"){const s=Vi(e,{terrain:"mountain"});return{object:oi(s,1,xs,!0).group,ownGeometries:[],ownMaterials:[]}}return t==="city_wall"||t==="walls"?{object:Mc(Od(e,{level:2,isCapital:!1,hasWalls:!0})),ownGeometries:[],ownMaterials:[]}:t==="park"?xy(e):{object:Mc(Od(e,{level:3,isCapital:!0,hasWalls:!0})),ownGeometries:[],ownMaterials:[]}}class Xi{static shared=null;renderer=null;scene=null;camera=null;cache=new Map;box=new Ys;centerVec=new k;cornerVec=new k;static getShared(){return Xi.shared||(Xi.shared=new Xi),Xi.shared}static renderTechIcon(e,t){return Xi.getShared().renderTechIcon(e,t)}ensureInitialized(){if(this.renderer&&this.scene&&this.camera)return!0;if(typeof document>"u")return!1;try{const e=new Ru({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"default"});e.setPixelRatio(1),e.setSize(Nd,Nd,!1),e.setClearColor(0,0),e.toneMapping=Rc,e.toneMappingExposure=1.08,e.outputColorSpace=jt;const t=new vu,n=new Su("#d6ebff","#586a85",.85);n.position.set(0,12,0),t.add(n);const s=new So("#fff6e6",2.3);s.position.set(11,13,2),t.add(s);const r=new So("#bdd6ff",.48);r.position.set(-9,7,-8),t.add(r);const o=new Io(-1.2,1.2,1.2,-1.2,.1,50);return o.position.set(7.5,6.2,7.5),o.lookAt(0,0,0),o.updateMatrixWorld(!0),this.renderer=e,this.scene=t,this.camera=o,!0}catch{return!1}}renderTechIcon(e,t){const n=e.trim().toLowerCase();if(yy.has(n))return qc(n,t);const s=`${t}:${n}`,r=this.cache.get(s);if(r)return r;if(!this.ensureInitialized()||!this.renderer||!this.scene||!this.camera)return"";const o=by(e,t),a=new Je;a.add(o.object),this.scene.add(a),a.updateMatrixWorld(!0),this.box.setFromObject(a),this.box.getCenter(this.centerVec),o.object.position.sub(this.centerVec),a.updateMatrixWorld(!0),this.box.setFromObject(a);const c=this.camera.matrixWorldInverse;let d=.55;const l=[this.box.min.x,this.box.max.x],u=[this.box.min.y,this.box.max.y],f=[this.box.min.z,this.box.max.z];for(const _ of l)for(const m of u)for(const p of f)this.cornerVec.set(_,m,p).applyMatrix4(c),d=Math.max(d,Math.abs(this.cornerVec.x),Math.abs(this.cornerVec.y));const h=d*1.14;this.camera.left=-h,this.camera.right=h,this.camera.top=h,this.camera.bottom=-h,this.camera.updateProjectionMatrix(),this.renderer.clear(),this.renderer.render(this.scene,this.camera);const g=this.renderer.domElement.toDataURL("image/png");this.scene.remove(a);for(const _ of o.ownGeometries)_.dispose();for(const _ of o.ownMaterials)_.dispose();return this.cache.set(s,g),g}clearCache(){this.cache.clear()}dispose(){this.cache.clear(),this.renderer&&(this.renderer.dispose(),this.renderer=null),this.scene=null,this.camera=null}}function Ty(i,e){return Xi.renderTechIcon(i,e)}new Be("#7c8696");new Be("#5c6573");new pe(.115,.125,.165);new et(.2,.29,.62,6);new pe(.46,.125,.24);new Pn(.22,1);const Ey=new Rn(.47,.59,24);Ey.rotateX(-Math.PI/2);const Ay=new Set(["warrior","defender","archer","rider","catapult","rohirrim_knight","uruk_berserker","elven_sentinel","ironbreaker"]);function Ry(i){return Ay.has(i)}function Vu(i,e){return qc(i,e)}function Fd(i){return i.iconKey}function bc(i,e,t="thumb-3d",n=""){const s=n.replace(/"/g,"&quot;");if(Ry(i)){const r=Vu(i,e);return r?`<img class="${t} thumb-sprite" src="${r}" alt="${s}" draggable="false" />`:""}try{const r=Ty(i,e);return r?`<img class="${t}" src="${r}" alt="${s}" draggable="false" />`:""}catch{return""}}function Oo(i,e,t,n="thumb-3d thumb-unit"){const s=Vu(i,e);if(!s)return t;const r=i.replace(/"/g,"&quot;");return`<img class="${n} thumb-sprite" src="${s}" alt="${r}" draggable="false" />`}const pn={humans:"#2356c9",orcs:"#c92a2a",elves:"#12805c",dwarves:"#d47415"},Cy={humans:[{icon:"road",text:"+1 MOV on Roads"},{icon:"star",text:"+1★ Linked Cities"},{icon:"swords",text:"Sunmark Knight"}],orcs:[{icon:"swords",text:"+2★ Kill · +4★ Capture"},{icon:"star",text:"7★ Start & Pillage"},{icon:"axe",text:"Ironblood Berserker"}],elves:[{icon:"tree",text:"Free Forest Movement"},{icon:"star",text:"+1★ Ancient Woods"},{icon:"bow",text:"Elven Sentinel"}],dwarves:[{icon:"pickaxe",text:"Climb Peaks Turn 1"},{icon:"star",text:"+1★ Mountain Mines"},{icon:"shield",text:"Ironbreaker (20 HP)"}]},Bd=["#facc15","#fde047","#f59e0b","#38bdf8","#4ade80","#f87171","#fffbeb","#c084fc"];function Mn(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Iy(i){return Mn(i).replace(/★/g,se("star","icon icon-xs icon-star"))}function Py(){return`
    <svg class="victory-laurel-svg" viewBox="0 0 260 180" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="laurelGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="50%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#b45309" />
        </linearGradient>
      </defs>
      <!-- Radiant Crown at apex -->
      <g transform="translate(106 4)" stroke="url(#laurelGold)" stroke-width="2.2" stroke-linejoin="round">
        <path d="M4 30h40l-4-18-9 8-7-14-7 14-9-8-4 18z" fill="url(#laurelGold)" fill-opacity="0.32" />
        <path d="M7 35h34" stroke-linecap="round" />
        <circle cx="24" cy="4" r="2.2" fill="#fef08a" stroke="none" />
        <circle cx="9" cy="10" r="1.8" fill="#fef08a" stroke="none" />
        <circle cx="39" cy="10" r="1.8" fill="#fef08a" stroke="none" />
      </g>
      <!-- Left Laurel Branch -->
      <g stroke="url(#laurelGold)" stroke-width="2" fill="url(#laurelGold)" fill-opacity="0.24" stroke-linecap="round">
        <path d="M96 164C54 148 34 114 42 66" fill="none" stroke-width="2.5" />
        <path d="M42 66c-12 2-18 11-16 20 9-2 15-10 16-20z" />
        <path d="M40 84c-13 4-18 13-14 22 9-3 14-12 14-22z" />
        <path d="M44 103c-12 6-16 15-10 23 8-4 12-13 10-23z" />
        <path d="M53 122c-10 8-12 17-5 24 7-5 9-14 5-24z" />
        <path d="M68 140c-8 9-8 18 1 22 6-6 6-14-1-22z" />
        <path d="M45 78c10-6 17-3 20 6-9 2-16-1-20-6z" />
        <path d="M47 98c10-5 17-1 19 8-9 1-16-2-19-8z" />
        <path d="M54 118c10-4 17 1 18 10-9 0-15-4-18-10z" />
        <path d="M66 137c10-2 16 4 15 12-8-1-13-6-15-12z" />
      </g>
      <!-- Right Laurel Branch (mirrored) -->
      <g transform="translate(260 0) scale(-1 1)" stroke="url(#laurelGold)" stroke-width="2" fill="url(#laurelGold)" fill-opacity="0.24" stroke-linecap="round">
        <path d="M96 164C54 148 34 114 42 66" fill="none" stroke-width="2.5" />
        <path d="M42 66c-12 2-18 11-16 20 9-2 15-10 16-20z" />
        <path d="M40 84c-13 4-18 13-14 22 9-3 14-12 14-22z" />
        <path d="M44 103c-12 6-16 15-10 23 8-4 12-13 10-23z" />
        <path d="M53 122c-10 8-12 17-5 24 7-5 9-14 5-24z" />
        <path d="M68 140c-8 9-8 18 1 22 6-6 6-14-1-22z" />
        <path d="M45 78c10-6 17-3 20 6-9 2-16-1-20-6z" />
        <path d="M47 98c10-5 17-1 19 8-9 1-16-2-19-8z" />
        <path d="M54 118c10-4 17 1 18 10-9 0-15-4-18-10z" />
        <path d="M66 137c10-2 16 4 15 12-8-1-13-6-15-12z" />
      </g>
    </svg>
  `}function Dy(i){const e=[];for(let n=0;n<36;n++){const s=(n*29+7)%98+1,r=(n*.37%4.2).toFixed(2),o=(3.4+n*.53%2.8).toFixed(2),a=((n%2===0?1:-1)*(18+n*17%44)).toFixed(0),c=(240+n*73%420).toFixed(0),d=n%3===0?10:7,l=n%3===0?14:n%2===0?10:7,u=n%4===0?i:Bd[n%Bd.length],f=n%5===0?"50%":"2px";e.push(`<span class="victory-confetti-piece" style="left:${s}%;width:${d}px;height:${l}px;border-radius:${f};background:${u};animation-delay:-${r}s;animation-duration:${o}s;--confetti-drift:${a}px;--confetti-rot:${c}deg;"></span>`)}return`<div class="victory-confetti-layer" aria-hidden="true">${e.join("")}</div>`}class Ly{root;railEl;callbacks;selectedFaction="humans";difficulty="normal";mapSize=16;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="title-screen",this.root.setAttribute("data-faction",this.selectedFaction),this.railEl=document.createElement("aside"),this.railEl.className="campaign-rail",this.railEl.setAttribute("aria-label","Campaign Setup"),this.root.appendChild(this.railEl),e.appendChild(this.root),this.render()}getSelectedFaction(){return this.selectedFaction}show(){this.root.classList.remove("hidden"),this.syncSelectionState()}hide(){this.root.classList.add("hidden")}destroy(){this.root.remove()}render(){this.root.setAttribute("data-faction",this.selectedFaction);const e=$t.map(o=>{const a=bt[o],c=pn[o],d=this.selectedFaction===o;return`
        <button
          type="button"
          class="emblem-tab ${d?"selected":""}"
          data-faction-pick="${o}"
          style="--tab-accent: ${c};"
          aria-pressed="${d}"
        >
          <span class="emblem-tab-crest" style="background: ${c};">
            ${Yn(o)}
          </span>
          <span class="emblem-tab-name">${Mn(a.name)}</span>
        </button>
      `}).join(""),t=$t.map(o=>{const a=bt[o],c=Ut[a.uniqueUnit],d=Cy[o],l=this.selectedFaction===o,u=d.map(h=>`
            <li class="tt-perk-item">
              <span class="tt-perk-icon" aria-hidden="true">${se(h.icon,"icon")}</span>
              <span>${Iy(h.text)}</span>
            </li>
          `).join(""),f=Oo(c.type,o,ks(c.type,"icon icon-lg"),"thumb-3d thumb-rail-unit");return`
        <section
          class="tt-faction-showcase ${l?"":"hidden"}"
          data-faction-panel="${o}"
          aria-live="polite"
        >
          <div class="tt-champion-frame" title="${Mn(c.name)} (HP ${c.maxHp} · ATK ${c.attack} · DEF ${c.defense} · MOV ${c.movement})">
            ${f}
          </div>
          <div class="tt-showcase-copy">
            <div class="tt-showcase-realm">${Mn(a.realm)}</div>
            <ul class="tt-perk-list" aria-label="${Mn(a.name)} advantages">
              ${u}
            </ul>
          </div>
        </section>
      `}).join(""),n=this.difficulty==="easy"?"Squire":"Captain",s=`${this.mapSize}×${this.mapSize}`;this.railEl.innerHTML=`
      <header class="tt-title-banner">
        <h1 class="rail-title">Chronicles of Eldermere</h1>
      </header>
      <div class="tt-start-console">
        <div class="faction-emblem-strip" role="group" aria-label="Select Civilization">
          ${e}
        </div>

        ${t}

        <div class="tt-start-actions">
          <button
            type="button"
            class="tt-cycle-btn"
            data-cycle-difficulty="true"
            title="Switch AI Difficulty (Squire / Captain)"
            aria-label="AI Difficulty: ${n}"
          >
            <span class="tt-cycle-medallion" aria-hidden="true">${se("helm","icon")}</span>
            <span class="tt-cycle-label" data-difficulty-label="true">${n}</span>
          </button>

          <button
            type="button"
            class="tt-cycle-btn"
            data-cycle-mapsize="true"
            title="Switch Map Size (16×16 / 18×18)"
            aria-label="Map Size: ${s}"
          >
            <span class="tt-cycle-medallion" aria-hidden="true">${se("mapGrid","icon")}</span>
            <span class="tt-cycle-label" data-mapsize-label="true">${s}</span>
          </button>

          <button type="button" class="tt-play-btn" data-action="begin">
            ${se("playSword","icon")}
            <span>Play</span>
          </button>
        </div>
      </div>
    `,this.root.querySelectorAll("[data-faction-pick]").forEach(o=>{o.addEventListener("click",()=>{const a=o.dataset.factionPick;a&&a!==this.selectedFaction&&(this.selectedFaction=a,this.callbacks.onSelectFaction?.(a),this.syncSelectionState())})}),this.root.querySelector("[data-cycle-difficulty]")?.addEventListener("click",()=>{this.difficulty=this.difficulty==="normal"?"easy":"normal",this.syncSelectionState()}),this.root.querySelector("[data-cycle-mapsize]")?.addEventListener("click",()=>{this.mapSize=this.mapSize===16?18:16,this.syncSelectionState()}),this.root.querySelector('[data-action="begin"]')?.addEventListener("click",()=>{this.callbacks.onStartGame({humanFaction:this.selectedFaction,difficulty:this.difficulty,mapSize:this.mapSize})})}syncSelectionState(){this.root.setAttribute("data-faction",this.selectedFaction),this.root.querySelectorAll("[data-faction-pick]").forEach(a=>{const c=a.dataset.factionPick===this.selectedFaction;a.classList.toggle("selected",c),a.setAttribute("aria-pressed",String(c))}),this.root.querySelectorAll("[data-faction-panel]").forEach(a=>{a.classList.toggle("hidden",a.dataset.factionPanel!==this.selectedFaction)});const e=this.difficulty==="easy"?"Squire":"Captain",t=this.root.querySelector("[data-difficulty-label]");t&&(t.textContent=e),this.root.querySelector("[data-cycle-difficulty]")?.setAttribute("aria-label",`AI Difficulty: ${e}`);const s=`${this.mapSize}×${this.mapSize}`,r=this.root.querySelector("[data-mapsize-label]");r&&(r.textContent=s),this.root.querySelector("[data-cycle-mapsize]")?.setAttribute("aria-label",`Map Size: ${s}`)}}class Uy{root;callbacks;stage="celebration";lastData=null;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="screen-overlay gameover-screen hidden",e.appendChild(this.root)}show(e){this.lastData=e,this.stage="celebration",this.render(),this.root.classList.remove("hidden")}hide(){this.root.classList.add("hidden"),this.root.removeAttribute("data-stage"),this.root.removeAttribute("data-outcome")}destroy(){this.root.remove()}computeBreakdown(e,t){const n=e.players.find(d=>d.id===t),s=Object.values(e.cities).filter(d=>d.ownerId===t).length,r=Object.values(e.units).filter(d=>d.ownerId===t).length,o=n?n.techs.length:0,a=n?n.revealedTiles.filter(Boolean).length:0,c=n?n.score:0;return{cities:s,techs:o,units:r,revealedTiles:a,total:c}}formatWinSubtitle(e){return e.winReason==="domination"?`Domination — All Rival Capitals Claimed (Turn ${e.turn})`:`Glory Triumph — Turn ${e.turn}`}render(){const e=this.lastData;if(!e)return;const{state:t,humanPlayerId:n}=e,s=t.players.find(o=>o.id===t.winnerId)??null,r=s!==null&&s.id===n;this.root.setAttribute("data-stage",this.stage),this.root.setAttribute("data-outcome",r?"victory":"defeat"),this.stage==="celebration"?this.renderCelebrationStage(e,r):this.renderScoresStage(e,r)}renderCelebrationStage(e,t){const{state:n}=e,s=n.players.find(f=>f.id===n.winnerId)??null,r=s?.faction??"humans",o=bt[r],a=pn[r],c=Ut[o.uniqueUnit],d=this.formatWinSubtitle(n),l=Oo(c.type,r,ks(c.type,"icon icon-xl"),"thumb-3d victory-champion-sprite");t?this.root.innerHTML=`
        <div class="victory-curtain" style="--winner-heraldry: ${a};">
          <div class="victory-sunburst" aria-hidden="true"></div>
          ${Dy(a)}

          <div class="victory-stage">
            <div class="victory-emblem-showcase">
              ${Py()}
              <div class="victory-hero-cluster">
                <div class="victory-champion-frame">
                  ${l}
                </div>
                <span class="victory-crest-medallion" style="background: ${a};">
                  ${Yn(r,"icon victory-crest-icon")}
                </span>
              </div>
            </div>

            <div class="victory-faction-pill">
              <span class="faction-dot" style="background: ${a};"></span>
              <span>${Mn(o.name)} &middot; ${Mn(o.realm)}</span>
            </div>

            <h2 class="victory-headline">VICTORY!</h2>
            <p class="victory-subtitle">${Mn(d)}</p>

            <button type="button" class="btn btn-cta victory-cta-btn" data-action="view-scores">
              <span>View Final Scores &rarr;</span>
            </button>
          </div>
        </div>
      `:this.root.innerHTML=`
        <div class="defeat-curtain" style="--winner-heraldry: ${a};">
          <div class="defeat-glow" aria-hidden="true"></div>

          <div class="defeat-stage">
            <div class="gameover-badge defeat">
              ${se("skull","icon icon-sm")}
              <span>Defeat</span>
            </div>

            <div class="defeat-victor-emblem">
              <span class="defeat-victor-crest" style="background: ${a};">
                ${Yn(r,"icon victory-crest-icon")}
              </span>
              <span class="defeat-victor-crown">${se("crown","icon icon-sm")}</span>
            </div>

            <h2 class="defeat-headline">DEFEAT</h2>
            <p class="defeat-victor-line">
              ${s?`${Mn(o.name)} Claimed Eldermere`:"The Age Concludes"}
            </p>
            <p class="victory-subtitle">${Mn(d)}</p>

            <button type="button" class="btn btn-cta victory-cta-btn" data-action="view-scores">
              <span>View Final Scores &rarr;</span>
            </button>
          </div>
        </div>
      `,this.root.querySelector('[data-action="view-scores"]')?.addEventListener("click",()=>{this.stage="scores",this.render()})}renderScoresStage(e,t){const{state:n,humanPlayerId:s,scoreBreakdowns:r}=e,o=n.players.find(f=>f.id===n.winnerId)??null,a=o?bt[o.faction]:null,c=this.formatWinSubtitle(n),l=[...n.players].sort((f,h)=>f.id===n.winnerId?-1:h.id===n.winnerId?1:h.score-f.score).map((f,h)=>{const g=bt[f.faction],_=pn[f.faction],m=r?.[f.id]??this.computeBreakdown(n,f.id),p=f.id===n.winnerId,v=f.id===s;return`
          <tr class="${p?"winner-row":""} ${v?"human-row":""}">
            <td class="num">#${h+1}</td>
            <td>
              <span class="faction-dot" style="background: ${_}; margin-right: 6px;"></span>
              ${Mn(g.name)}${v?" (You)":""}
              ${p?se("crown","icon icon-sm icon-star"):""}
            </td>
            <td class="col-fate">${f.alive?"Standing":`T${f.eliminatedOnTurn??"?"}`}</td>
            <td class="num">${m.cities}</td>
            <td class="num col-lore">${m.techs}</td>
            <td class="num score-total">${m.total.toLocaleString()}</td>
          </tr>
        `}).join("");this.root.innerHTML=`
      <div class="gameover-panel gameover-scores-panel">
        <div class="gameover-badge ${t?"victory":"defeat"}">
          ${se(t?"crown":"skull","icon icon-sm")}
          <span>${t?"Victory":"Defeat"}</span>
        </div>
        <h2 class="gameover-title">
          ${a?`${Mn(a.name)} Prevail`:"The Age Concludes"}
        </h2>
        <p class="gameover-reason">
          ${Mn(c)}
        </p>

        <div class="score-table-wrap">
          <table class="score-table">
            <thead>
              <tr>
                <th class="num">#</th>
                <th>Realm</th>
                <th class="col-fate">Fate</th>
                <th class="num">Cities</th>
                <th class="num col-lore">Lore</th>
                <th class="num">Glory</th>
              </tr>
            </thead>
            <tbody>
              ${l}
            </tbody>
          </table>
        </div>

        <button type="button" class="btn btn-cta btn-begin" data-action="play-again">
          <span>New Campaign</span>
          ${se("chevronRight","icon")}
        </button>
      </div>
    `,this.root.querySelector('[data-action="play-again"]')?.addEventListener("click",()=>{this.callbacks.onPlayAgain()})}}function ky(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class Ny{root;aiBanner;callbacks;lastBannerKey=null;lastBarKey=null;constructor(e,t){this.callbacks=t,this.root=document.createElement("header"),this.root.className="top-bar hidden",e.appendChild(this.root),this.aiBanner=document.createElement("div"),this.aiBanner.className="ai-turn-floating hidden",e.appendChild(this.aiBanner)}show(){this.root.classList.remove("hidden")}hide(){this.root.classList.add("hidden"),this.aiBanner.classList.add("hidden"),this.lastBannerKey=null,this.lastBarKey=null}update(e){this.render(e)}destroy(){this.root.remove(),this.aiBanner.remove()}render(e){const t=bt[e.activePlayer.faction],n=pn[e.player.faction],s=pn[e.activePlayer.faction],r=e.isHumanTurn?"human":`ai:${e.activePlayer.id}:${e.activePlayer.faction}`;r!==this.lastBannerKey&&(this.lastBannerKey=r,e.isHumanTurn?(this.aiBanner.classList.add("hidden"),this.aiBanner.innerHTML=""):(this.aiBanner.classList.remove("hidden"),this.aiBanner.innerHTML=`
          <div class="ai-turn-banner" style="--ai-color: ${s};">
            <span class="faction-dot" style="background: ${s};"></span>
            <span>${ky(t.name)}</span>
            <span class="ai-turn-dots" aria-hidden="true"><span></span><span></span><span></span></span>
          </div>
        `));const o=`${e.player.faction}|${e.player.score}|${e.player.gold}|${e.player.goldPerTurn}|${e.turn}|${e.maxTurns}`;if(o===this.lastBarKey)return;this.lastBarKey=o;const a=e.maxTurns>0?`T${e.turn}/${e.maxTurns}`:`T${e.turn}`,c=e.maxTurns>0?`Turn ${e.turn} of ${e.maxTurns}`:`Turn ${e.turn}`;this.root.innerHTML=`
      <div class="top-cluster top-cluster-left">
        <button
          type="button"
          class="top-pill top-pill-leaderboard top-pill-merged"
          data-action="leaderboard"
          title="Realm Standings &amp; Civilization Info"
          aria-label="Open Realm Standings — Glory Score ${e.player.score}"
        >
          <span class="faction-crest-badge top-crest-badge" style="background: ${n};">
            ${Yn(e.player.faction,"icon icon-crest-sm")}
          </span>
          ${se("trophy","icon icon-sm icon-star")}
          <span class="top-glory-val">${e.player.score.toLocaleString()}</span>
        </button>
      </div>

      <div class="top-cluster top-cluster-center">
        <div class="top-pill top-pill-stars" title="Stars &amp; income per turn">
          ${se("star","icon icon-star")}
          <span class="top-stars-val">${e.player.gold}</span>
          <span class="top-stars-delta">(+${e.player.goldPerTurn})</span>
        </div>
      </div>

      <div class="top-cluster top-cluster-right">
        <div class="top-pill top-pill-turn" title="${c}">
          <span>${a}</span>
        </div>
      </div>
    `,this.root.querySelector('[data-action="leaderboard"]')?.addEventListener("click",()=>{this.callbacks.onOpenLeaderboard?.()})}}const Oy={berries:"Berries",game:"Game",ore:"Ore",mithril:"Starsteel",ruins:"Ruins"},Hd={harvest_berries:"berries",harvest_game:"game",harvest_ore:"ore",harvest_mithril:"mithril",build_farm:"farm",build_windmill:"windmill",build_slag_pit:"slag_pit",build_foundry:"foundry",build_sanctuary:"sanctuary",build_mine:"mine",build_great_forge:"great_forge",build_road:"road",plant_ancient_woods:"ancient_woods"};function On(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Fy(i,e){const t=e>0?i/e:0;return t<=.35?"low":t<=.65?"mid":""}function wa(i){if(i.id==="capture-city")return i.label.toLowerCase().includes("village")?"Claim":"Capture";if(i.id==="explore-ruins")return"Explore";if(i.id==="recover")return"Heal";if(i.id==="promote")return"Promote";if(i.id==="build_road")return"Road";if(i.id==="chop_forest")return"Chop";if(i.id==="plant_ancient_woods")return"Woods";if(i.id.startsWith("harvest_"))return i.label.replace(/^Harvest\s+/i,"");if(i.id.startsWith("build_"))return i.label.replace(/^Build\s+/i,"");if(i.unitType)switch(i.unitType){case"rohirrim_knight":return"Sunmark";case"uruk_berserker":return"Berserker";case"elven_sentinel":return"Sentinel";default:return i.label}return i.label}function By(i,e){if(!e)return"Wait";if(i.enabled)return null;const t=i.disabledReason??"";if(!t)return"Locked";if(/next turn/i.test(t))return"Next Turn";if(/full hp/i.test(t))return"Full HP";if(/already acted/i.test(t))return"Acted";if(/already veteran/i.test(t))return"Veteran";if(/kills:/i.test(t))return t.replace(/Kills:\s*/i,"Kills ");if(/occupied/i.test(t))return"Occupied";if(/cap reached/i.test(t))return"Cap Full";if(/outside.*border/i.test(t))return"Borders";if(/enemy territory/i.test(t))return"Enemy";const n=t.match(/Need\s+(\d+★)/i);return n?`Need ${n[1]}`:/requires/i.test(t)?"Locked":t.length>12?`${t.slice(0,11)}…`:t}class Hy{root;callbacks;constructor(e,t){this.callbacks=t,this.root=document.createElement("section"),this.root.className="bottom-hud-wrapper hidden",this.root.setAttribute("aria-label","Game actions"),e.appendChild(this.root)}show(){this.root.classList.remove("hidden")}hide(){this.root.classList.add("hidden")}update(e){this.root.classList.remove("hidden"),this.render(e)}destroy(){this.root.remove()}render(e){const t=e.combatPreview?this.renderCombatStrip(e.combatPreview):"",s=!!(e.selectedUnit||e.selectedCity||e.selectedTile)?this.renderSelectionDrawer(e):this.renderIdleBar(e);this.root.innerHTML=`${t}${s}`,this.bindEvents(e)}renderIdleBar(e){const t=e.hasAffordableTech&&e.affordableTechCount>0?`<span class="tt-dock-badge">${e.affordableTechCount}</span>`:"",n=e.isHumanTurn&&e.allUnitsActed;return`
      <div class="idle-bottom-bar" role="toolbar" aria-label="Turn controls">
        <button
          type="button"
          class="tt-dock-btn tt-dock-btn-codex idle-codex-btn"
          data-idle-action="tech"
          title="Open Tech Codex"
          aria-label="Open Tech Codex"
        >
          <span class="tt-dock-medallion" aria-hidden="true">
            ${nh(e.playerFaction,"icon")}
            ${t}
          </span>
          <span class="tt-dock-label">Codex</span>
        </button>

        <button
          type="button"
          class="tt-dock-btn tt-dock-btn-end idle-end-turn-btn ${n?"all-done":""}"
          data-idle-action="end-turn"
          title="${e.isHumanTurn?"End Turn (Space)":"Rival turn in progress"}"
          aria-label="${e.isHumanTurn?"End Turn":"Rival Turn"}"
          ${e.isHumanTurn?"":"disabled"}
        >
          <span class="tt-dock-medallion" aria-hidden="true">
            ${ih(e.playerFaction,"icon")}
          </span>
          <span class="tt-dock-label">${e.isHumanTurn?"End Turn":"Rival Turn"}</span>
        </button>
      </div>
    `}renderCombatStrip(e){const{preview:t,attacker:n,attackerOwner:s,defender:r,defenderOwner:o}=e,a=Ut[n.type],c=Ut[r.type],d=pn[o.faction],l=Math.max(0,r.hp-t.attackerDamage),u=Math.max(0,n.hp-t.retaliationDamage),f=t.defenderKilled,h=!f&&t.attackerKilled;let g="";f?g=`<span class="combat-strip-badge lethal">${se("skull","icon icon-sm")} LETHAL</span>`:h?g=`<span class="combat-strip-badge fatal">${se("skull","icon icon-sm")} FATAL</span>`:t.retaliationDamage===0&&(g='<span class="combat-strip-badge safe">SAFE</span>');let _="";return f&&s.faction==="orcs"?_=`<span class="combat-strip-bonus">+${s.techs.includes("orcs_spoils_mastery")?3:2}${se("star","icon icon-sm icon-star")}</span>`:f&&a.traits.includes("persist")&&!c.traits.includes("stalwart")&&(_='<span class="combat-strip-bonus">Persist</span>'),`
      <div class="combat-strip ${f?"is-lethal":""} ${h?"is-fatal-counter":""}" role="status">
        <span class="combat-strip-unit">
          <span class="combat-strip-name">${On(wa({id:"",label:a.name,unitType:n.type}))}</span>
          <span class="combat-strip-hp ${u<n.hp?"damaged":""}">${n.hp}&rarr;${u}</span>
        </span>
        <span class="combat-strip-vs" aria-hidden="true">${se("swords","icon icon-sm")}</span>
        <span class="combat-strip-unit">
          <span class="faction-dot" style="background: ${d};"></span>
          <span class="combat-strip-name">${On(wa({id:"",label:c.name,unitType:r.type}))}</span>
          <span class="combat-strip-hp ${f?"slain":""}">${r.hp}&rarr;${l}</span>
        </span>
        ${g}
        ${_}
      </div>
    `}renderSelectionDrawer(e){const t=e.selectionLayer==="unit"&&e.selectedUnit!==null,n=!t&&e.selectedCity!==null,s=!t&&!n&&e.selectedTile!==null;let r="",o="",a="";if(t&&e.selectedUnit){const{unit:l,owner:u,isOwnedByHuman:f}=e.selectedUnit,h=Ut[l.type],g=pn[u.faction],_=e.selectedUnit.effectiveAttack??h.attack,m=e.selectedUnit.effectiveDefense??h.defense,p=Math.max(0,Math.min(100,l.hp/l.maxHp*100)),v=[`HP ${l.hp}/${l.maxHp}`,`ATK ${_}`,`DEF ${m}`];if(h.range>1&&v.push(`RNG ${h.range}`),r=`
        <span class="faction-dot" style="background: ${g};"></span>
        <span class="drawer-title">${On(h.name)}${l.isVeteran?` ${se("crown","icon icon-sm icon-star")}`:""}</span>
        <span class="drawer-stats">${On(v.join(" · "))}</span>
      `,o=`
        <div class="drawer-hairline-progress">
          <div class="progress-bar-fill hp ${Fy(l.hp,l.maxHp)}" style="width: ${p}%;"></div>
        </div>
      `,f&&e.selectedUnit.actions.length>0){const y=x=>x==="capture-city"||x==="explore-ruins";a=`
          <div class="action-tile-row" role="list">
            ${[...e.selectedUnit.actions].sort((x,T)=>y(x.id)&&!y(T.id)?-1:!y(x.id)&&y(T.id)?1:0).map(x=>this.renderActionTile(x,"unit",e.isHumanTurn,u.faction)).join("")}
          </div>
        `}}else if(n&&e.selectedCity){const{city:l,owner:u,isOwnedByHuman:f,popNeeded:h,income:g,unitCount:_,unitCap:m}=e.selectedCity,p=pn[u.faction],v=Math.max(0,Math.min(100,l.population/Math.max(1,h)*100));r=`
        <span class="faction-dot" style="background: ${p};"></span>
        <span class="drawer-title">${On(l.name)}</span>
        <span class="drawer-stats">Lv ${l.level} &middot; Pop ${l.population}/${h} &middot; +${g}★ &middot; ${_}/${m}</span>
      `,o=`
        <div class="drawer-hairline-progress">
          <div class="progress-bar-fill pop" style="width: ${v}%;"></div>
        </div>
      `,f&&e.selectedCity.trainOptions.length>0&&(a=`
          <div class="action-tile-row" role="list">
            ${e.selectedCity.trainOptions.map(y=>this.renderActionTile(y,"city",e.isHumanTurn,u.faction)).join("")}
          </div>
        `)}else if(s&&e.selectedTile){const{tile:l,terrainName:u,defenseBonus:f}=e.selectedTile,g=[`DEF ${`${f.toFixed(2).replace(/\.00$/,".0").replace(/\.50$/,".5")}x`}`];l.resource?g.push(Oy[l.resource]??l.resource):l.improvement?g.push(Di[l.improvement]?.name??l.improvement):l.hasVillage?g.push("Village"):l.hasRoad&&g.push("Road"),r=`
        <span class="drawer-title">${On(u)}</span>
        <span class="drawer-stats">${On(g.join(" · "))}</span>
      `,e.selectedTile.actions.length>0&&(a=`
          <div class="action-tile-row" role="list">
            ${e.selectedTile.actions.map(_=>this.renderActionTile(_,"tile",e.isHumanTurn,e.playerFaction)).join("")}
          </div>
        `)}const c=e.canToggleLayer?`
        <div class="layer-toggle" role="tablist" aria-label="Switch selection">
          <button
            type="button"
            class="layer-toggle-btn ${e.selectionLayer==="unit"?"active":""}"
            data-switch-layer="unit"
            role="tab"
            aria-selected="${e.selectionLayer==="unit"}"
          >Unit</button>
          <button
            type="button"
            class="layer-toggle-btn ${e.selectionLayer==="tile"?"active":""}"
            data-switch-layer="tile"
            role="tab"
            aria-selected="${e.selectionLayer==="tile"}"
          >${e.altLayerLabel}</button>
        </div>
      `:"",d=this.callbacks.onDeselect?`<button type="button" class="drawer-close-btn" data-action-close="true" title="Close (Esc)" aria-label="Close selection">${se("close","icon icon-sm")}</button>`:"";return`
      <div class="selection-drawer ${a?"has-actions":"header-only"}">
        <div class="drawer-header">
          <div class="drawer-header-info">
            ${r}
          </div>
          <div class="drawer-header-controls">
            ${c}
            ${d}
          </div>
        </div>
        ${o}
        ${a}
      </div>
    `}renderActionTile(e,t,n,s){const r=n&&e.enabled&&!!e.action,o=e.id==="capture-city"||e.id==="explore-ruins",a=e.id==="explore-ruins",c=!!(e.unitType&&Ut[e.unitType]?.faction!==null),d=wa(e),l=By(e,n);let u;e.unitType?u=Oo(e.unitType,s,ks(e.unitType,"icon icon-lg"),"thumb-3d thumb-tile-action"):Hd[e.id]?u=bc(Hd[e.id],s,"thumb-3d thumb-tile-action",d)||sl(e.icon,"icon icon-lg",e.id):u=sl(e.icon,"icon icon-lg",e.id);let f="";e.cost!==void 0&&e.cost>0?f=`<span class="tile-cost-pill">${e.cost}${se("star","icon icon-xs icon-star")}</span>`:e.id==="chop_forest"&&(f=`<span class="tile-cost-pill gain">+2${se("star","icon icon-xs icon-star")}</span>`);const h=l?`${e.label} (${e.disabledReason??l})`:`${e.label}: ${e.description}`;return`
      <button
        type="button"
        class="${["action-tile",o?"is-capture":"",a?"is-ruins":"",c?"is-unique":"",r?"":"is-disabled"].filter(Boolean).join(" ")}"
        data-action-scope="${t}"
        data-action-id="${On(e.id)}"
        title="${On(h)}"
        ${r?"":"disabled"}
      >
        ${f}
        <span class="action-tile-visual" aria-hidden="true">${u}</span>
        <span class="action-tile-label">${On(d)}</span>
        ${l?`<span class="action-tile-lock">${On(l)}</span>`:""}
      </button>
    `}bindEvents(e){if(this.root.querySelector('[data-idle-action="tech"]')?.addEventListener("click",()=>{this.callbacks.onOpenTech?.()}),this.root.querySelector('[data-idle-action="next-ready"]')?.addEventListener("click",()=>{this.callbacks.onNextReadyUnit?.()}),this.root.querySelector('[data-idle-action="end-turn"]')?.addEventListener("click",()=>{e.isHumanTurn&&this.callbacks.onEndTurn?.()}),this.root.querySelector("[data-action-close]")?.addEventListener("click",()=>{this.callbacks.onDeselect?.()}),this.root.querySelectorAll("[data-switch-layer]").forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.switchLayer;(o==="unit"||o==="tile")&&this.callbacks.onSwitchLayer?.(o)})}),!e.isHumanTurn)return;const t=new Map((e.selectedUnit?.actions??[]).map(r=>[r.id,r])),n=new Map((e.selectedCity?.trainOptions??[]).map(r=>[r.id,r])),s=new Map((e.selectedTile?.actions??[]).map(r=>[r.id,r]));this.root.querySelectorAll("[data-action-scope]").forEach(r=>{r.addEventListener("click",()=>{if(r.disabled)return;const o=r.dataset.actionScope,a=r.dataset.actionId;if(!o||!a)return;let c;o==="unit"?c=t.get(a):o==="city"?c=n.get(a):o==="tile"&&(c=s.get(a)),c&&c.enabled&&c.action&&this.callbacks.onAction(c.action)})})}}function $n(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Sa(i){return $n(i).replace(/★/g,se("star","icon icon-xs icon-star"))}function zy(i,e,t){const n=i.tier===1?3:i.tier===2?5:8,s=Math.max(0,t-1),r=e.techs.includes("elves_elven_lore")?1:0;return Math.max(2,n+s-r)}function Gy(i){return i.split(/\s*&\s*/)[0]||i}function xa(i,e){return i.prerequisites.every(t=>e.has(t))}class Vy{root;callbacks;openState=!1;activePillarIndex=0;pendingTechId=null;lastVm=null;onKeyDown;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop tech-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Tech Codex"),e.appendChild(this.root),this.root.addEventListener("click",n=>{n.target===this.root&&(this.pendingTechId?this.cancelPendingResearch():this.close())}),this.onKeyDown=n=>{n.key==="Escape"&&this.openState&&(this.pendingTechId?(n.stopPropagation(),this.cancelPendingResearch()):this.close())},window.addEventListener("keydown",this.onKeyDown)}isOpen(){return this.openState}open(e){this.openState=!0,this.pendingTechId=null,this.lastVm=e,this.render(e),this.root.classList.remove("hidden"),this.restoreCarouselPosition(!1)}update(e){this.lastVm=e,this.openState&&(this.render(e),this.restoreCarouselPosition(!1))}close(){this.openState&&(this.openState=!1,this.pendingTechId=null,this.root.classList.add("hidden"),this.callbacks.onClose())}destroy(){window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}cancelPendingResearch(){this.pendingTechId&&(this.pendingTechId=null,this.openState&&this.lastVm&&(this.render(this.lastVm),this.restoreCarouselPosition(!1)))}render(e){const{player:t,cityCount:n,isHumanTurn:s,techCosts:r}=e,o=bt[t.faction],a=pn[t.faction],c=mi(t.faction),d=c.length,l=new Set(t.techs),u=v=>r?.[v.id]??zy(v,t,n),h=[0,1,2,3].map(v=>{const y=c.filter(S=>S.pillarIndex===v);if(y.length===0)return null;const M=y.find(S=>S.slot==="root")??null,x=y.find(S=>S.slot==="a")??null,T=y.find(S=>S.slot==="b")??null,b=y.find(S=>S.slot==="capstone")??null,E=y.filter(S=>l.has(S.id)).length,w=s&&y.some(S=>!l.has(S.id)&&xa(S,l)&&t.gold>=u(S));return{index:v,name:y[0].pillar,shortName:Gy(y[0].pillar),root:M,branchA:x,branchB:T,capstone:b,techs:y,researchedCount:E,hasAffordable:w}}).filter(v=>v!==null);this.activePillarIndex>=h.length&&(this.activePillarIndex=0);const g=`
      <div class="tech-pillar-nav" role="tablist" aria-label="Codex Pillars">
        <div class="tech-pillar-pills">
          ${h.map((v,y)=>`
                <button
                  type="button"
                  class="tech-pillar-pill ${y===this.activePillarIndex?"active":""} ${v.hasAffordable?"has-affordable":""}"
                  data-pillar-jump="${y}"
                  role="tab"
                  aria-selected="${y===this.activePillarIndex}"
                >
                  <span class="tech-pillar-pill-label">${$n(v.shortName)}</span>
                  ${v.hasAffordable?'<span class="tech-pillar-dot" aria-hidden="true"></span>':""}
                </button>
              `).join("")}
        </div>
        <span class="tech-pillar-counter" data-pillar-counter>${this.activePillarIndex+1}/${h.length}</span>
      </div>
    `,_=h.map(v=>this.renderPillar(v,u,t,l,s)).join("");let m=null;if(this.pendingTechId){const v=en[this.pendingTechId];v&&v.faction===t.faction&&!l.has(v.id)&&xa(v,l)&&s&&t.gold>=u(v)?m=v:this.pendingTechId=null}const p=m?this.renderConfirmDialog(m,u(m),t):"";this.root.innerHTML=`
      <div class="modal-panel tech-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="modal-header">
          <div class="modal-title-wrap">
            <h2 class="modal-title">
              <span class="faction-crest-badge" style="background: ${a}; width: 28px; height: 28px;">
                ${Yn(t.faction,"icon icon-crest-sm")}
              </span>
              <span>${$n(o.name)} Codex</span>
            </h2>
            <span class="modal-subtitle">
              <strong class="gold-text">${t.gold}${se("star","icon icon-sm icon-star")}</strong>
              <span>&middot;</span>
              <span>${t.techs.length}/${d} Lore</span>
              ${t.techs.includes("elves_elven_lore")?'<span>&middot;</span><span class="tech-discount-note">-1★ Lore</span>':""}
            </span>
          </div>
          <button type="button" class="btn btn-icon modal-close-btn" data-action="close" aria-label="Close Codex">
            ${se("close","icon")}
          </button>
        </div>

        ${g}

        <div class="tech-tree-grid" data-tech-carousel>
          ${_}
        </div>

        ${p}
      </div>
    `,this.bindEvents()}renderConfirmDialog(e,t,n){const s=Math.max(0,n.gold-t),r=Fd(e),o=bc(r,n.faction,"thumb-3d thumb-confirm",e.name),a=e.unlocksUnits.length>0?ks(e.unlocksUnits[0],"icon icon-lg"):e.unlocksImprovements.length>0?se("tower","icon icon-lg"):e.unlocksResources.length>0?se("leaf","icon icon-lg"):e.tier===3?se("crown","icon icon-lg"):se("codex","icon icon-lg"),c=e.tier===3?"Tier III · Capstone":`Tier ${rl(e.tier)}`;return`
      <div class="tech-confirm-scrim" data-confirm-scrim role="alertdialog" aria-modal="true" aria-label="Confirm Research">
        <div class="tech-confirm-card">
          <div class="tech-confirm-top">
            <div class="tech-confirm-thumb" aria-hidden="true">${o||a}</div>
            <div class="tech-confirm-copy">
              <div class="tech-confirm-kicker">${$n(e.pillar)} &middot; ${c}</div>
              <h3 class="tech-confirm-title">Research ${$n(e.name)}?</h3>
              <p class="tech-confirm-summary">${Sa(e.summary)}</p>
            </div>
          </div>
          <div class="tech-confirm-cost-row">
            <span class="tech-confirm-cost-label">Cost</span>
            <span class="tech-confirm-cost-val">
              <strong>${t}${se("star","icon icon-sm icon-star")}</strong>
              <span class="tech-confirm-balance">(${n.gold} &rarr; ${s}${se("star","icon icon-xs icon-star")})</span>
            </span>
          </div>
          <div class="tech-confirm-actions">
            <button type="button" class="btn btn-secondary tech-confirm-cancel" data-confirm-cancel>
              Cancel
            </button>
            <button type="button" class="btn btn-primary tech-confirm-ok" data-confirm-research="${e.id}">
              <span>Research</span>
              <span class="tech-confirm-btn-cost">${t}${se("star","icon icon-xs icon-star")}</span>
            </button>
          </div>
        </div>
      </div>
    `}renderPillar(e,t,n,s,r){const{root:o,branchA:a,branchB:c,capstone:d}=e,l=e.researchedCount===e.techs.length,u=o?`<div class="tech-tree-row-center">${this.renderTechCard(o,t(o),n,s,r,"wide")}</div>`:"",f=this.renderForkConnector(o,a,c,s),h=`
      <div class="tech-tree-row-split">
        ${a?this.renderTechCard(a,t(a),n,s,r,"branch"):'<div class="tech-slot-empty"></div>'}
        ${c?this.renderTechCard(c,t(c),n,s,r,"branch"):'<div class="tech-slot-empty"></div>'}
      </div>
    `,g=this.renderCapstoneConnector(a,c,d,s),_=d?`<div class="tech-tree-row-center">${this.renderTechCard(d,t(d),n,s,r,"wide")}</div>`:"";return`
      <section class="tech-pillar${e.index===this.activePillarIndex?" pillar-active":""}" data-pillar-index="${e.index}" aria-label="${$n(e.name)} Pillar">
        <header class="tech-pillar-header">
          <span class="tech-branch-header">${$n(e.name)}</span>
          <span class="tech-pillar-progress ${l?"complete":""}">
            ${l?se("check","icon icon-xs"):""}
            <span>${e.researchedCount}/${e.techs.length}</span>
          </span>
        </header>
        <div class="tech-pillar-tree">
          ${u}
          ${f}
          ${h}
          ${g}
          ${_}
        </div>
      </section>
    `}renderForkConnector(e,t,n,s){const r=!!(e&&s.has(e.id)),o=!!(r&&t&&s.has(t.id)),a=!!(r&&n&&s.has(n.id)),l=[{d:"M 100 0 L 100 10 L 49 10 L 49 22",state:o?"done":r?"unlocked":"locked",rank:o?2:r?1:0},{d:"M 100 0 L 100 10 L 151 10 L 151 22",state:a?"done":r?"unlocked":"locked",rank:a?2:r?1:0}].sort((f,h)=>f.rank-h.rank),u=o||a?"done":r?"unlocked":"locked";return`
      <div class="tech-svg-connector tech-fork-connector" aria-hidden="true">
        <svg viewBox="0 0 200 22" preserveAspectRatio="none" focusable="false">
          ${l.map(f=>`<path class="tech-link ${f.state}" d="${f.d}" vector-effect="non-scaling-stroke" />`).join("")}
          <circle class="tech-link-node ${u}" cx="100" cy="10" r="2.2" />
        </svg>
      </div>
    `}renderCapstoneConnector(e,t,n,s){if(!n)return"";const r=!!(e&&n.prerequisites.includes(e.id)),o=!!(t&&n.prerequisites.includes(t.id)),a=s.has(n.id),c=[];if(r&&e){const l=s.has(e.id),u=l&&a?"done":l?"unlocked":"locked";c.push({d:"M 49 0 L 49 11 L 100 11 L 100 22",state:u,rank:u==="done"?2:u==="unlocked"?1:0,nodeX:49})}if(o&&t){const l=s.has(t.id),u=l&&a?"done":l?"unlocked":"locked";c.push({d:"M 151 0 L 151 11 L 100 11 L 100 22",state:u,rank:u==="done"?2:u==="unlocked"?1:0,nodeX:151})}if(c.length===0){const l=xa(n,s),u=l&&a?"done":l?"unlocked":"locked";c.push({d:"M 100 0 L 100 22",state:u,rank:u==="done"?2:u==="unlocked"?1:0,nodeX:100})}c.sort((l,u)=>l.rank-u.rank);const d=c[c.length-1].state;return`
      <div class="tech-svg-connector tech-capstone-connector" aria-hidden="true">
        <svg viewBox="0 0 200 22" preserveAspectRatio="none" focusable="false">
          ${c.map(l=>`<path class="tech-link ${l.state}" d="${l.d}" vector-effect="non-scaling-stroke" />`).join("")}
          <circle class="tech-link-node ${d}" cx="100" cy="11" r="2.2" />
        </svg>
      </div>
    `}renderTechCard(e,t,n,s,r,o){const a=s.has(e.id),c=e.prerequisites.filter(R=>!s.has(R)),d=c.length===0,l=n.gold>=t,u=!a&&d&&l&&r,f=Math.max(0,t-n.gold),h=c.map(R=>en[R]?.name??R);let g="locked",_="locked",m=`${se("lock","icon icon-xs")}<span>${t}</span>${se("star","icon icon-xs")}`,p="";a?(g="researched",_="researched",m=`${se("check","icon icon-xs")}<span>Done</span>`):d?l&&r?(g="available affordable",_="affordable",m=`<span>${t}</span>${se("star","icon icon-xs")}`):(g="available unaffordable",_="unaffordable",m=`<span>${t}</span>${se("star","icon icon-xs")}`,p=r?`<div class="tech-status-note">Need ${f}${se("star","icon icon-xs icon-star")}</div>`:'<div class="tech-status-note">Rival turn</div>'):h.length>0&&(p=`<div class="tech-status-note">${se("lock","icon icon-xs")}<span>${$n(h.join(" + "))}</span></div>`);const v=Fd(e),y=bc(v,n.faction,"thumb-3d thumb-tech",e.name),M=e.unlocksUnits.length>0?ks(e.unlocksUnits[0],"icon icon-lg"):e.unlocksImprovements.length>0?se("tower","icon icon-lg"):e.unlocksResources.length>0?se("leaf","icon icon-lg"):e.tier===3?se("crown","icon icon-lg"):se("codex","icon icon-lg"),x=`<div class="tech-thumb-box" aria-hidden="true">${y||M}</div>`,T=e.tier===3?`${se("crown","icon icon-xs icon-star")}<span>III &middot; Capstone</span>`:`<span>Tier ${rl(e.tier)}</span>`,b=`tier-${e.tier}${e.slot==="capstone"?" is-capstone":""}`,E=`tech-card--${o}`,w=o==="wide"?`
          <div class="tech-card-body">
            ${x}
            <div class="tech-card-main">
              <div class="tech-card-head">
                <div class="tech-card-titles">
                  <div class="tech-tier-tag">${T}</div>
                  <div class="tech-name">${$n(e.name)}</div>
                </div>
                <span class="tech-status-pill ${_}">${m}</span>
              </div>
              <p class="tech-summary">${Sa(e.summary)}</p>
              ${p}
            </div>
          </div>
        `:`
          <div class="tech-card-branch-top">
            ${x}
            <div class="tech-card-branch-meta">
              <div class="tech-tier-tag">${T}</div>
              <span class="tech-status-pill ${_}">${m}</span>
            </div>
          </div>
          <div class="tech-name">${$n(e.name)}</div>
          <p class="tech-summary">${Sa(e.summary)}</p>
          ${p}
        `;if(a)return`<div class="tech-card ${E} ${b} ${g}">${w}</div>`;const S=this.pendingTechId===e.id;return`
      <button
        type="button"
        class="tech-card ${E} ${b} ${g} ${S?"is-pending":""}"
        data-research-tech="${e.id}"
        ${u?"":"disabled"}
      >
        ${w}
      </button>
    `}bindEvents(){this.root.querySelector('[data-action="close"]')?.addEventListener("click",()=>{this.close()}),this.root.querySelectorAll("[data-research-tech]").forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.researchTech;o&&!r.disabled&&this.lastVm&&(this.pendingTechId=o,this.render(this.lastVm),this.restoreCarouselPosition(!1))})}),this.root.querySelector("[data-confirm-scrim]")?.addEventListener("click",r=>{r.target===r.currentTarget&&this.cancelPendingResearch()}),this.root.querySelector("[data-confirm-cancel]")?.addEventListener("click",()=>{this.cancelPendingResearch()}),this.root.querySelector("[data-confirm-research]")?.addEventListener("click",r=>{const a=r.currentTarget.dataset.confirmResearch;a&&(this.pendingTechId=null,this.callbacks.onResearch(a))});const e=this.root.querySelector("[data-tech-carousel]"),t=Array.from(this.root.querySelectorAll("[data-pillar-jump]")),n=this.root.querySelector("[data-pillar-counter]"),s=r=>{this.activePillarIndex=r,t.forEach((o,a)=>{const c=a===r;o.classList.toggle("active",c),o.setAttribute("aria-selected",String(c))}),n&&t.length>0&&(n.textContent=`${r+1}/${t.length}`),this.root.querySelectorAll(".tech-pillar").forEach(o=>{o.classList.toggle("pillar-active",Number(o.dataset.pillarIndex)===r)})};if(t.forEach(r=>{r.addEventListener("click",()=>{const o=Number(r.dataset.pillarJump);Number.isNaN(o)||(s(o),this.restoreCarouselPosition(!0))})}),e){let r=null;e.addEventListener("scroll",()=>{r===null&&(r=window.requestAnimationFrame(()=>{r=null;const o=Array.from(e.querySelectorAll(".tech-pillar"));if(o.length===0)return;const a=e.scrollLeft+e.clientWidth*.5;let c=0,d=1/0;o.forEach((l,u)=>{const f=l.offsetLeft+l.offsetWidth*.5,h=Math.abs(f-a);h<d&&(d=h,c=u)}),c!==this.activePillarIndex&&s(c)}))},{passive:!0})}}restoreCarouselPosition(e){const t=this.root.querySelector("[data-tech-carousel]");if(!t||t.scrollWidth<=t.clientWidth+2)return;const n=t.querySelector(`.tech-pillar[data-pillar-index="${this.activePillarIndex}"]`);n&&t.scrollTo({left:Math.max(0,n.offsetLeft-t.offsetLeft),behavior:e?"smooth":"auto"})}}function ba(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Wy(i,e){if(i===2)return[{choice:"workshop",icon:"anvil",name:"Workshop",highlight:"+1★ / Turn"},{choice:"explorer",icon:"compass",name:"Scout",highlight:"Reveals 10 Fog Tiles"}];if(i===3)return[{choice:"city_wall",icon:"shield",name:"City Walls",highlight:"2.0x Defense"},{choice:"resources",icon:"star",name:"Coffers",highlight:"+5★ Now"}];if(i===4)return[{choice:"border_growth",icon:"banner",name:"Borders",highlight:"Expand to 5×5"},{choice:"pop_growth",icon:"wheat",name:"Harvest",highlight:"+3 Population"}];const t=bt[e],n=Ut[t.uniqueUnit];return[{choice:"champion",icon:"crown",name:`${n.name}`,highlight:`Free Veteran (${n.maxHp+5} HP)`},{choice:"park",icon:"tree",name:"Grand Park",highlight:"+250 Glory & +1★/Turn"}]}class $y{root;callbacks;openState=!1;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop reward-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","City Level-Up Decree"),e.appendChild(this.root)}isOpen(){return this.openState}open(e){this.openState=!0,this.render(e),this.root.classList.remove("hidden")}close(){this.openState=!1,this.root.classList.add("hidden")}destroy(){this.root.remove()}render(e){const t=Wy(e.levelReached,e.faction),n=e.city.id,s=t.map(r=>`
          <button type="button" class="reward-card" data-reward="${r.choice}">
            <div class="reward-icon" aria-hidden="true">${se(r.icon,"icon icon-xl")}</div>
            <div class="reward-name">${ba(r.name)}</div>
            <div class="reward-highlight">${ba(r.highlight)}</div>
          </button>
        `).join("");this.root.innerHTML=`
      <div class="modal-panel reward-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="reward-level-banner">
          ${se("crown","icon icon-sm")}
          <span>Level ${e.levelReached}</span>
        </div>
        <h2 class="modal-title" style="justify-content: center;">${ba(e.city.name)}</h2>

        <div class="reward-choices">
          ${s}
        </div>
      </div>
    `,this.root.querySelectorAll("[data-reward]").forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.reward;o&&(this.close(),this.callbacks.onChoose(n,o))})})}}function ao(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class Xy{root;openState=!1;pendingResolve=null;onKeyDown;constructor(e){this.root=document.createElement("div"),this.root.className="modal-backdrop defeat-notice-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Faction Defeated"),e.appendChild(this.root),this.root.addEventListener("click",t=>{t.target===this.root&&this.openState&&this.close()}),this.onKeyDown=t=>{this.openState&&t.key==="Escape"&&(t.preventDefault(),this.close())},window.addEventListener("keydown",this.onKeyDown)}isOpen(){return this.openState}show(e,t){this.pendingResolve&&this.close(),this.openState=!0,this.render(e,t),this.root.classList.remove("hidden");const n=this.root.querySelector('[data-action="continue"]');return window.requestAnimationFrame(()=>{n?.focus()}),new Promise(s=>{this.pendingResolve=s})}close(){if(!this.openState&&!this.pendingResolve)return;this.openState=!1,this.root.classList.add("hidden");const e=this.pendingResolve;this.pendingResolve=null,e?.()}destroy(){window.removeEventListener("keydown",this.onKeyDown),this.close(),this.root.remove()}render(e,t){const n=bt[e],s=bt[t],r=pn[e],o=pn[t];this.root.innerHTML=`
      <div
        class="modal-panel defeat-notice-panel"
        style="--defeated-color: ${r}; --victor-color: ${o};"
      >
        <div class="defeat-notice-kicker">
          ${se("skull","icon icon-sm")}
          <span>Realm Fallen</span>
        </div>

        <div class="defeat-notice-crests" aria-hidden="true">
          <div class="defeat-crest-side is-fallen">
            <div class="defeat-crest-ring fallen" style="background: ${r};">
              ${Yn(e,"icon defeat-crest-svg")}
              <span class="defeat-crest-badge fallen">${se("skull","icon icon-xs")}</span>
            </div>
            <span class="defeat-crest-label">${ao(n.name)}</span>
          </div>

          <div class="defeat-notice-divider">
            ${se("swords","icon icon-lg")}
          </div>

          <div class="defeat-crest-side is-victor">
            <div class="defeat-crest-ring victor" style="background: ${o};">
              ${Yn(t,"icon defeat-crest-svg")}
              <span class="defeat-crest-badge victor">${se("crown","icon icon-xs")}</span>
            </div>
            <span class="defeat-crest-label">${ao(s.name)}</span>
          </div>
        </div>

        <h2 class="defeat-notice-headline">
          ${ao(n.name)} was defeated by ${ao(s.name)}
        </h2>
        <p class="defeat-notice-subline">Their final stronghold has fallen.</p>

        <button type="button" class="btn btn-cta defeat-notice-btn" data-action="continue">
          <span>Continue</span>
          ${se("chevronRight","icon icon-sm")}
        </button>
      </div>
    `,this.root.querySelector('[data-action="continue"]')?.addEventListener("click",()=>{this.close()})}}function yn(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ta(i){return yn(i).replace(/★/g,se("star","icon icon-sm icon-star"))}class qy{root;callbacks;openState=!1;activeFaction="humans";lastVm=null;onKeyDown;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop dossier-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Faction Abilities Dossier"),e.appendChild(this.root),this.root.addEventListener("click",n=>{n.target===this.root&&this.close()}),this.onKeyDown=n=>{n.key==="Escape"&&this.openState&&(this.callbacks.onBack?this.callbacks.onBack():this.close())},window.addEventListener("keydown",this.onKeyDown)}isOpen(){return this.openState}open(e,t){this.lastVm=e,this.activeFaction=t??e.humanPlayer.faction,this.openState=!0,this.render(),this.root.classList.remove("hidden")}update(e){this.lastVm=e,this.openState&&this.render()}close(){this.openState&&(this.openState=!1,this.root.classList.add("hidden"),this.callbacks.onClose())}destroy(){window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}render(){const e=this.lastVm;if(!e)return;const t=this.activeFaction,n=t===e.humanPlayer.faction,s=bt[t],r=Ut[s.uniqueUnit],o=en[s.startingTech],a=pn[t],c=e.allPlayers.find(p=>p.faction===t)??null,d=$t.map(p=>{const v=bt[p],y=pn[p],M=p===t,x=e.allPlayers.find(b=>b.faction===p),T=x?!x.alive:!1;return`
        <button
          type="button"
          class="dossier-tab ${M?"active":""} ${T?"eliminated":""}"
          data-dossier-faction="${p}"
          style="--tab-heraldry: ${y};"
          aria-selected="${M}"
        >
          <span class="dossier-tab-crest" style="background: ${y};">
            ${Yn(p,"icon icon-crest-sm")}
          </span>
          <span class="dossier-tab-name">${yn(v.name)}</span>
        </button>
      `}).join(""),l=Oo(r.type,t,ks(r.type,"icon icon-xl"),"thumb-3d thumb-dossier-unit"),u=r.traits.map(p=>`<span class="trait-pill">${yn(p)}</span>`).join(""),f=mi(t);let h="Active Passives",g="";if(n){const p=new Set(e.humanPlayer.techs),v=f.filter(y=>p.has(y.id));h=`Active Passives (${v.length}/${f.length})`,v.length===0?g='<p class="dossier-empty-note">None yet — research lore in the Codex.</p>':g=`
          <ul class="dossier-passive-list">
            ${v.map(y=>`
                  <li class="dossier-passive-item ${y.tier===3?"is-capstone":""}">
                    <span class="dossier-passive-head">
                      <span class="dossier-passive-name">
                        ${y.tier===3?se("crown","icon icon-sm icon-star"):se("check","icon icon-sm")}
                        <span>${yn(y.name)}</span>
                      </span>
                      <span class="dossier-passive-pillar">${yn(y.pillar)}</span>
                    </span>
                    <span class="dossier-passive-summary">${Ta(y.summary)}</span>
                  </li>
                `).join("")}
          </ul>
        `}else{const p=f.filter(v=>v.tier===3);h=`Realm Capstones (${p.length})`,g=`
        <ul class="dossier-passive-list">
          ${p.map(v=>`
                <li class="dossier-passive-item is-capstone">
                  <span class="dossier-passive-head">
                    <span class="dossier-passive-name">
                      ${se("crown","icon icon-sm icon-star")}
                      <span>${yn(v.name)}</span>
                    </span>
                    <span class="dossier-passive-pillar">${yn(v.pillar)}</span>
                  </span>
                  <span class="dossier-passive-summary">${Ta(v.summary)}</span>
                </li>
              `).join("")}
        </ul>
      `}const _=c?c.alive?`${c.score.toLocaleString()} Glory`:`Fallen (T${c.eliminatedOnTurn??"?"})`:"",m=this.callbacks.onBack?`
        <button type="button" class="btn btn-secondary dossier-back-btn" data-action="back" aria-label="Back to Standings">
          <span>&larr; Scores</span>
        </button>
      `:"";this.root.innerHTML=`
      <div class="modal-panel dossier-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="modal-header">
          <div class="modal-title-wrap">
            ${m}
            <h2 class="modal-title">
              <span class="faction-crest-badge" style="background: ${a}; width: 28px; height: 28px;">
                ${Yn(t,"icon icon-crest-sm")}
              </span>
              <span>${yn(s.realm)}</span>
            </h2>
            <span class="modal-subtitle">
              <span>${yn(o.name)}</span>
              ${_?`<span>&middot;</span><span>${yn(_)}</span>`:""}
            </span>
          </div>
          <button type="button" class="btn btn-icon modal-close-btn" data-action="close" aria-label="Close Faction Dossier">
            ${se("close","icon")}
          </button>
        </div>

        <div class="dossier-tabs" role="tablist" aria-label="Inspect Factions">
          ${d}
        </div>

        <div class="dossier-body">
          <div class="dossier-section">
            <div class="dossier-kicker">Trait</div>
            <div class="dossier-mechanic-title">${yn(s.uniqueMechanicName)}</div>
            <p class="dossier-mechanic-desc">${Ta(s.uniqueMechanicDescription)}</p>
          </div>

          <div class="dossier-section">
            <div class="dossier-kicker">Champion</div>
            <div class="dossier-unit-row">
              <div class="dossier-unit-thumb-frame">${l}</div>
              <div class="dossier-unit-info">
                <div class="dossier-unit-head">
                  <span class="dossier-unit-name">${yn(r.name)}</span>
                  <span class="cost-tag">${r.cost}${se("star","icon icon-sm icon-star")}</span>
                </div>
                <div class="stat-strip compact">
                  <div class="stat-pair"><span class="stat-k">HP</span><span class="stat-v">${r.maxHp}</span></div>
                  <div class="stat-pair"><span class="stat-k">ATK</span><span class="stat-v">${r.attack}</span></div>
                  <div class="stat-pair"><span class="stat-k">DEF</span><span class="stat-v">${r.defense}</span></div>
                  <div class="stat-pair"><span class="stat-k">MOV</span><span class="stat-v">${r.movement}</span></div>
                  ${r.range>1?`<div class="stat-pair"><span class="stat-k">RNG</span><span class="stat-v">${r.range}</span></div>`:""}
                </div>
                ${u?`<div class="trait-row">${u}</div>`:""}
              </div>
            </div>
          </div>

          <div class="dossier-section">
            <div class="dossier-kicker">${yn(h)}</div>
            ${g}
          </div>
        </div>
      </div>
    `,this.root.querySelector('[data-action="back"]')?.addEventListener("click",()=>{this.callbacks.onBack?.()}),this.root.querySelector('[data-action="close"]')?.addEventListener("click",()=>{this.close()}),this.root.querySelectorAll("[data-dossier-faction]").forEach(p=>{p.addEventListener("click",()=>{const v=p.dataset.dossierFaction;v&&v!==this.activeFaction&&(this.activeFaction=v,this.render())})})}}function co(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class Yy{root;callbacks;openState=!1;confirmingResign=!1;lastVm=null;onKeyDown;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop leaderboard-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Live Leaderboard"),e.appendChild(this.root),this.root.addEventListener("click",n=>{n.target===this.root&&this.close()}),this.onKeyDown=n=>{n.key==="Escape"&&this.openState&&this.close()},window.addEventListener("keydown",this.onKeyDown)}isOpen(){return this.openState}open(e){this.lastVm=e,this.confirmingResign=!1,this.openState=!0,this.render(),this.root.classList.remove("hidden")}update(e){this.lastVm=e,this.openState&&this.render()}close(){this.openState&&(this.openState=!1,this.confirmingResign=!1,this.root.classList.add("hidden"),this.callbacks.onClose())}destroy(){window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}render(){const e=this.lastVm;if(!e)return;const t=Math.max(1,...e.entries.map(o=>o.score)),n=e.entries.map(o=>{const a=bt[o.faction],c=pn[o.faction],d=Math.max(4,Math.min(100,Math.round(o.score/t*100))),l=`rank-${Math.min(4,Math.max(1,o.rank))}`,u=o.citiesCount===1?"1 City":`${o.citiesCount} Cities`,f=o.isEliminated?'<span class="lb-tag lb-tag-fallen">Fallen</span>':o.isHuman?'<span class="lb-tag lb-tag-you">You</span>':"";return`
          <button
            type="button"
            class="leaderboard-row is-clickable ${o.isHuman?"is-human":""} ${o.isEliminated?"is-eliminated":""}"
            data-lb-faction="${o.faction}"
            style="--lb-heraldry: ${c};"
            aria-label="Inspect ${co(a.name)} — Rank ${o.rank}, ${co(u)}, ${o.score} Glory"
          >
            <div class="leaderboard-row-top">
              <div class="leaderboard-identity">
                <span class="lb-rank-badge ${l}" aria-label="Rank ${o.rank}">#${o.rank}</span>
                <span class="faction-crest-badge lb-crest-badge" style="background: ${c};">
                  ${Yn(o.faction,"icon icon-crest-sm")}
                </span>
                <div class="lb-name-block">
                  <div class="lb-name-line">
                    <span class="lb-faction-name">${co(a.name)}</span>
                    ${f}
                  </div>
                  <div class="lb-cities-stat">
                    ${se("tower","icon icon-xs")}
                    <span>${co(u)}</span>
                  </div>
                </div>
              </div>

              <div class="leaderboard-right-group">
                <div class="leaderboard-score-col">
                  <span class="lb-score-val">${o.score.toLocaleString()}</span>
                  <span class="lb-score-label">Glory</span>
                </div>
                <span class="lb-row-chevron" aria-hidden="true">${se("chevronRight","icon icon-sm")}</span>
              </div>
            </div>

            <div class="lb-progress-track" aria-hidden="true">
              <div class="lb-progress-fill" style="width: ${d}%; background: ${c};"></div>
            </div>
          </button>
        `}).join(""),s=e.maxTurns>0?`Turn ${e.turn} / ${e.maxTurns}`:`Turn ${e.turn}`,r=e.maxTurns>0?`Capture all enemy capitals or lead Glory at Turn ${e.maxTurns}`:"Capture all enemy capitals to win · Tap a realm for details";this.root.innerHTML=`
      <div class="modal-panel leaderboard-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="modal-header">
          <div class="modal-title-wrap">
            <h2 class="modal-title">
              <span class="lb-header-trophy">${se("trophy","icon")}</span>
              <span>Realm Standings</span>
            </h2>
            <span class="modal-subtitle">
              <strong class="lb-turn-pill">${s}</strong>
            </span>
          </div>
          <button type="button" class="btn btn-icon modal-close-btn" data-action="close" aria-label="Close Leaderboard">
            ${se("close","icon")}
          </button>
        </div>

        <div class="leaderboard-list" role="list" aria-label="Civilization Rankings">
          ${n}
        </div>

        <div class="leaderboard-footer">
          <div class="leaderboard-footer-hint">
            ${se("crown","icon icon-sm icon-star")}
            <span>${r}</span>
          </div>
          ${this.callbacks.onResign?this.confirmingResign?`
                  <div class="lb-resign-confirm">
                    <span class="lb-resign-prompt">Resign campaign?</span>
                    <button type="button" class="btn btn-secondary lb-resign-cancel" data-action="resign-cancel">Cancel</button>
                    <button type="button" class="btn lb-resign-yes" data-action="resign-confirm">Resign</button>
                  </div>
                `:`
                  <button type="button" class="btn lb-resign-btn" data-action="resign">
                    <span>Resign</span>
                  </button>
                `:""}
        </div>
      </div>
    `,this.root.querySelector('[data-action="close"]')?.addEventListener("click",()=>{this.close()}),this.root.querySelector('[data-action="resign"]')?.addEventListener("click",()=>{this.confirmingResign=!0,this.render()}),this.root.querySelector('[data-action="resign-cancel"]')?.addEventListener("click",()=>{this.confirmingResign=!1,this.render()}),this.root.querySelector('[data-action="resign-confirm"]')?.addEventListener("click",()=>{this.close(),this.callbacks.onResign?.()}),this.root.querySelectorAll("[data-lb-faction]").forEach(o=>{o.addEventListener("click",()=>{const a=o.dataset.lbFaction;a&&this.callbacks.onSelectFaction?.(a)})})}}function Ky(i){const e=(i|0)>>>0;return e===0?1831565813:e}function Xt(i){const e=i+1831565813>>>0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,{value:((t^t>>>14)>>>0)/4294967296,nextState:e}}function Dt(i,e,t){if(t<=e)return{value:e,nextState:i};const{value:n,nextState:s}=Xt(i);return{value:e+Math.floor(n*(t-e+1)),nextState:s}}function qi(i,e){const t=i.slice();let n=e;for(let s=t.length-1;s>0;s--){const r=Dt(n,0,s);n=r.nextState;const o=r.value,a=t[s];t[s]=t[o],t[o]=a}return{result:t,nextState:n}}function lo(i,e,t,n){let s=Math.imul(i,374761393)+Math.imul(e,668265263)+Math.imul(t,1442695041)+n|0;return s=Math.imul(s^s>>>13,1274126177),s=s^s>>>16,(s>>>0)/4294967296}function zd(i){return i*i*(3-2*i)}function Ea(i,e,t){const n=i+t.offsetX,s=e+t.offsetY,r=Math.floor(n),o=Math.floor(s),a=zd(n-r),c=zd(s-o),d=lo(r,o,t.seedA,t.seedB),l=lo(r+1,o,t.seedA,t.seedB),u=lo(r,o+1,t.seedA,t.seedB),f=lo(r+1,o+1,t.seedA,t.seedB),h=d+(l-d)*a,g=u+(f-u)*a;return h+(g-h)*c}function dr(i,e,t,n){const s=Ea(i*t,e*t,n),r=Ea(i*t*2.05+17.3,e*t*2.05-9.1,n),o=Ea(i*t*4.1-11.7,e*t*4.1+23.4,n);return s*.58+r*.28+o*.14}function uo(i){const e=Dt(i,1,1073741823),t=Dt(e.nextState,1,1073741823),n=Xt(t.nextState),s=Xt(n.nextState);return{field:{seedA:e.value,seedB:t.value,offsetX:n.value*97,offsetY:s.value*97},nextState:s.nextState}}function An(i,e){return Math.hypot(i.x-e.x,i.y-e.y)}function qt(i,e,t,n){return t<0||n<0||t>=e||n>=e?null:i[rt(t,n,e)]??null}function Ar(i){return i.terrain!=="water"&&i.terrain!=="mountain"}function ur(i){return i==="orcs"?"wasteland":"plains"}function jy(i,e){let t=e;const n=2,s=i-3,r=i===18?7:6,o=i*.44,a=(i-1)/2,c=_=>(_.x<=3||_.x>=i-4)&&(_.y<=3||_.y>=i-4),d=[];for(let _=0;_<64;_++){const m=[];for(let b=0;b<4;b++){let E=!1;for(let w=0;w<40;w++){const S=Dt(t,n,s),R=Dt(S.nextState,n,s);t=R.nextState;const P={x:S.value,y:R.value};if(m.every(D=>xt(P,D)>=r&&An(P,D)>=o)){m.push(P),E=!0;break}}if(!E)break}if(m.length<4)continue;let p=1/0;const v=[];for(let b=0;b<4;b++){let E=1/0;for(let w=0;w<4;w++){if(b===w)continue;const S=An(m[b],m[w]);S<E&&(E=S),S<p&&(p=S)}v.push(E)}const y=Math.max(...v)-Math.min(...v);if(y>2.8)continue;const M=m.filter(c).length,x=m.filter(b=>Math.hypot(b.x-a,b.y-a)<=i*.34).length,T=(M===4?-3.5:M<=2?1.8:.6)+(x>=1&&x<=2?1.4:0);d.push({points:m,score:p*1.5-y*2.6+T})}let l;if(d.length>0){d.sort((p,v)=>v.score-p.score);const _=d.slice(0,Math.min(6,d.length)),m=Dt(t,0,_.length-1);t=m.nextState,l=_[m.value].points}else{const _=Xt(t);t=_.nextState;const m=_.value*Math.PI*2,p=i*.32;l=[0,1,2,3].map(v=>{const y=m+v*Math.PI/2;return{x:Math.max(n,Math.min(s,Math.round(a+Math.cos(y)*p))),y:Math.max(n,Math.min(s,Math.round(a+Math.sin(y)*p)))}})}const u=qi($t,t);t=u.nextState;const f=[];for(let _=0;_<4;_++){const m=Xt(t);t=m.nextState,f.push({x:l[_].x,y:l[_].y,biome:u.result[_],stretch:.86+m.value*.26,isPrimary:!0})}const h=qi([...$t,...$t],t);t=h.nextState;const g=i===18?8:6;for(let _=0;_<g;_++)for(let m=0;m<25;m++){const p=Dt(t,1,i-2),v=Dt(p.nextState,1,i-2),y=Xt(v.nextState);t=y.nextState;const M={x:p.value,y:v.value};if(!l.some(x=>xt(M,x)<=3)){f.push({x:M.x,y:M.y,biome:h.result[_%h.result.length],stretch:1.12+y.value*.55,isPrimary:!1});break}}return{seeds:f,nextState:t}}function Zy(i,e,t,n){if(e>(i==="dwarves"?.54:i==="orcs"?.67:i==="humans"?.77:.78))return"mountain";if(e<.21&&t>.55)return"water";switch(i){case"humans":return t>.69&&n>.35?"forest":"plains";case"orcs":return t<.6||e>.48?"wasteland":t>.7&&n>.38?"forest":"plains";case"elves":return t>.64&&n>.44?"ancient_woods":t>.36?"forest":"plains";case"dwarves":return t>.56&&n>.3?"forest":"plains"}}function Jy(i,e,t,n,s){let r=s;const o=t.find(w=>w.biome==="dwarves")??t[0],a=[{start:{x:o.x,y:o.y},len:e===18?10:8,nearAnchor:!0}],c=Dt(r,2,e-3),d=Dt(c.nextState,2,e-3);r=d.nextState,a.push({start:{x:c.value,y:d.value},len:e===18?7:6,nearAnchor:!1});for(const w of a){const S=Xt(r);r=S.nextState;let R=S.value*Math.PI*2,P=w.start.x-Math.cos(R)*(w.len*.42),D=w.start.y-Math.sin(R)*(w.len*.42);const G=Math.floor(w.len*.35),$=Math.floor(w.len*.72);for(let q=0;q<w.len;q++){const K=Math.round(P),V=Math.round(D);if(q!==G&&q!==$&&K>=1&&V>=1&&K<e-1&&V<e-1){const H=qt(i,e,K,V);H&&H.terrain!=="water"&&(H.terrain="mountain",w.nearAnchor&&(H.biome="dwarves"))}const le=Xt(r);r=le.nextState,R+=(le.value-.5)*.72,P+=Math.cos(R)*1.05,D+=Math.sin(R)*1.05}}const l=t.find(w=>w.biome==="elves");if(l)for(let w=1;w<e-1;w++)for(let S=1;S<e-1;S++){if(An({x:S,y:w},l)>3.8)continue;const P=qt(i,e,S,w);if(!P||P.terrain==="water"||P.terrain==="mountain")continue;const D=Xt(r);r=D.nextState,D.value<.72&&(P.biome="elves",P.terrain=D.value<.24?"ancient_woods":"forest")}const u=t.find(w=>w.biome==="humans");if(u)for(let w=1;w<e-1;w++)for(let S=1;S<e-1;S++){if(An({x:S,y:w},u)>3.8)continue;const P=qt(i,e,S,w);if(!P||P.terrain==="water")continue;const D=Xt(r);r=D.nextState,D.value<.78&&(P.biome="humans",P.terrain=D.value<.14?"forest":"plains")}const f=t.find(w=>w.biome==="orcs");if(f)for(let w=1;w<e-1;w++)for(let S=1;S<e-1;S++){if(An({x:S,y:w},f)>3.6)continue;const P=qt(i,e,S,w);if(!P||P.terrain==="water"||P.terrain==="mountain")continue;const D=Xt(r);r=D.nextState,D.value<.74&&(P.biome="orcs",P.terrain=D.value<.18?"forest":"wasteland")}const h=e===18?[9,5,4]:[8,4],g=[],_=[];for(let w=1;w<e-1;w++)for(let S=1;S<e-1;S++){if(t.some(P=>xt({x:S,y:w},P)<=2))continue;const R=Xt(r);r=R.nextState,_.push({coord:{x:S,y:w},rank:dr(S,w,.16,n)+R.value*.25})}_.sort((w,S)=>w.rank-S.rank);const m=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:-1,y:-1}];for(const w of h){let S=null;for(const V of _)if(!g.some(le=>xt(V.coord,le)<5)){S=V.coord;break}if(!S)break;const R=Dt(r,-1,2);r=R.nextState;const P=Math.max(3,w+R.value),D=[S],G=qt(i,e,S.x,S.y);G&&(G.terrain="water");const $=Dt(r,0,m.length-1);r=$.nextState;const q=m[$.value];let K=0;for(;D.length<P&&K++<48;){const V=Dt(r,0,D.length-1);r=V.nextState;const le=D[V.value],H=Xt(r);r=H.nextState;let Z=q;if(H.value>.38){const j=Dt(r,0,3);r=j.nextState,Z=m[j.value]}const ce=le.x+Z.x,me=le.y+Z.y;if(ce<0||me<0||ce>=e||me>=e||t.some(j=>xt({x:ce,y:me},j)<=1)||D.some(j=>j.x===ce&&j.y===me))continue;const O=qt(i,e,ce,me);O&&(O.terrain="water",D.push({x:ce,y:me}))}g.push(S)}const p=Dt(r,5,e===18?8:7),v=Dt(p.nextState,3,e-4),y=Dt(v.nextState,3,e-4),M=Xt(y.nextState);r=M.nextState;let x=v.value,T=y.value,b=M.value*Math.PI*2;const E=new Set;for(let w=0;w<p.value;w++){const S=Math.round(x),R=Math.round(T),P=`${S},${R}`;if(!E.has(P)&&S>=1&&R>=1&&S<e-1&&R<e-1&&!t.some(G=>xt({x:S,y:R},G)<=1)){const G=qt(i,e,S,R);G&&(G.terrain="water",E.add(P))}const D=Xt(r);r=D.nextState,b+=(D.value-.5)*1.1,x+=Math.cos(b),T+=Math.sin(b)}return r}function Qy(i,e,t,n,s){const r=qt(i,e,t,n);if(!r||r.terrain==="water")return-1e3;let o=0,a=0,c=0,d=0,l=0,u=0,f=0,h=0;for(let m=-2;m<=2;m++)for(let p=-2;p<=2;p++){if(p===0&&m===0)continue;const v=qt(i,e,t+p,n+m);if(!v)continue;const y=Math.max(Math.abs(p),Math.abs(m)),M=y===1?1.6:1;switch(v.biome===s&&(f+=M),y===1&&Ar(v)&&h++,v.terrain){case"plains":o+=M;break;case"forest":a+=M;break;case"ancient_woods":c+=M;break;case"mountain":d+=M;break;case"wasteland":l+=M;break;case"water":u+=M;break}}const g=u*2.2,_=h>=4?4:-6;switch(s){case"humans":return o*3+Math.min(a,4)*1.1+f*1.4-d*1.4-l*1.6-g+_;case"elves":return c*3.6+a*2.8+f*1.4-l*2-d*1.1-g+_;case"dwarves":return Math.min(d,10)*3.2-Math.max(0,d-11)*1.5+o*.9+a*.6+f*1.4-l*1.4-g+(h>=3?3:-4);case"orcs":return l*3+Math.min(a,5)*1.2+Math.min(d,4)*.7+f*1.4-c*1.2-g+_}}function e1(i,e,t,n){let s=n;const r=2,o=e-3,a=e===18?7:6,c=e*.42,d={};for(const p of $t){const v=[];for(let y=r;y<=o;y++)for(let M=r;M<=o;M++){const x=Qy(i,e,M,y,p);if(x<=-500)continue;const T=Xt(s);s=T.nextState,v.push({coord:{x:M,y},affinity:x+T.value*1.5})}v.sort((y,M)=>M.affinity-y.affinity),d[p]=v.slice(0,14)}let l=null,u=-1/0;const f=d.humans,h=d.orcs,g=d.elves,_=d.dwarves;for(const p of f)for(const v of h)if(!(xt(p.coord,v.coord)<a||An(p.coord,v.coord)<c)){for(const y of g)if(!(xt(y.coord,p.coord)<a||xt(y.coord,v.coord)<a||An(y.coord,p.coord)<c||An(y.coord,v.coord)<c))for(const M of _){if(xt(M.coord,p.coord)<a||xt(M.coord,v.coord)<a||xt(M.coord,y.coord)<a||An(M.coord,p.coord)<c||An(M.coord,v.coord)<c||An(M.coord,y.coord)<c)continue;const x=[p.coord,v.coord,y.coord,M.coord],T=x.map((R,P)=>Math.min(...x.filter((D,G)=>G!==P).map(D=>An(R,D)))),b=Math.max(...T)-Math.min(...T);if(b>2.95)continue;const E=Math.min(...T),S=p.affinity+v.affinity+y.affinity+M.affinity+E*2-b*4;S>u&&(u=S,l={humans:p.coord,orcs:v.coord,elves:y.coord,dwarves:M.coord})}}if(l)return{capitalCoords:l,nextState:s};const m={};for(const p of t)m[p.biome]={x:p.x,y:p.y};return{capitalCoords:m,nextState:s}}function t1(i,e,t,n){const s=()=>{const o=new Uint8Array(e*e),a=rt(t.x,t.y,e);o[a]=1;const c=[t];let d=0;for(;d<c.length;){const l=c[d++];for(let u=-1;u<=1;u++)for(let f=-1;f<=1;f++){if(f===0&&u===0)continue;const h=l.x+f,g=l.y+u,_=qt(i,e,h,g);if(!_||!Ar(_))continue;const m=rt(h,g,e);o[m]||(o[m]=1,c.push({x:h,y:g}))}}return o};let r=s();for(const o of n){const a=rt(o.x,o.y,e);if(r[a])continue;let c=o.x,d=o.y,l=e*4;for(;!r[rt(c,d,e)]&&l-- >0;){const u=qt(i,e,c,d);if(u&&!Ar(u)&&(u.terrain=ur(u.biome),(u.resource==="ore"||u.resource==="mithril")&&(u.resource=null)),c===t.x&&d===t.y)break;c<t.x?c++:c>t.x&&c--,d<t.y?d++:d>t.y&&d--}r=s()}}function n1(i,e){let t=e;const n=uo(t),s=uo(n.nextState),r=uo(s.nextState),o=uo(r.nextState);t=o.nextState;const a=n.field,c=s.field,d=r.field,l=o.field,u=jy(i,t),f=u.seeds,h=f.filter(H=>H.isPrimary);t=u.nextState;const g=[],_=2.7;for(let H=0;H<i;H++)for(let Z=0;Z<i;Z++){const ce=(dr(Z,H,.14,a)-.5)*2*_,me=(dr(Z,H,.14,c)-.5)*2*_,O=Z+ce,j=H+me;let ye="humans",ue=1/0;for(const $e of f){const ht=Math.hypot(O-$e.x,j-$e.y)*$e.stretch;ht<ue&&(ue=ht,ye=$e.biome)}const De=dr(Z,H,.17,d),Ie=dr(Z,H,.15,l),Ne=Xt(t);t=Ne.nextState;const ut=Zy(ye,De,Ie,Ne.value);g.push({x:Z,y:H,terrain:ut,biome:ye,resource:null,improvement:null,hasRoad:!1,hasVillage:!1,cityId:null,isCityCenter:!1,unitId:null})}t=Jy(g,i,h,d,t);const m=e1(g,i,h,t),p=m.capitalCoords;t=m.nextState;for(const H of $t){const Z=p[H],ce=qt(g,i,Z.x,Z.y);ce.terrain=ur(H),ce.biome=H,ce.resource=null,ce.hasVillage=!1}for(const H of $t){const Z=p[H],ce=[];for(let j=-1;j<=1;j++)for(let ye=-1;ye<=1;ye++){if(ye===0&&j===0)continue;const ue=qt(g,i,Z.x+ye,Z.y+j);ue&&ce.push(ue)}const me=qi(ce,t);t=me.nextState;const O=me.result;for(const j of O)j.biome=H,(j.terrain==="water"||j.terrain==="mountain")&&(j.terrain=ur(H)),j.resource=null;H==="humans"?(O[0].terrain="plains",O[0].resource="berries",O[1].terrain="plains",O[1].resource="berries",O[2].terrain="plains",O[3].terrain="plains",O[4].terrain="forest",O[4].resource="game"):H==="orcs"?(O[0].terrain="plains",O[0].resource="berries",O[1].terrain="forest",O[1].resource="game",O[2].terrain="wasteland",O[3].terrain="wasteland",O[4].terrain="forest"):H==="elves"?(O[0].terrain="ancient_woods",O[0].resource="berries",O[1].terrain="ancient_woods",O[2].terrain="ancient_woods",O[3].terrain="forest",O[3].resource="game",O[4].terrain="plains"):H==="dwarves"&&(O[0].terrain="mountain",O[0].resource="ore",O[1].terrain="mountain",O[1].resource="mithril",O[2].terrain="plains",O[2].resource="berries",O[3].terrain="forest",O[3].resource="game",O[4].terrain="plains")}const v=i===18?18:14,y=i===18?16:12,M=$t.map(H=>p[H]),x=[],T=(H,Z,ce)=>{if(H<1||Z<1||H>=i-1||Z>=i-1)return!1;for(const me of $t)if(xt({x:H,y:Z},p[me])<3)return!1;for(const me of M)if(xt({x:H,y:Z},me)<ce)return!1;return!0},b=H=>{const Z=qt(g,i,H.x,H.y);Z.terrain=ur(Z.biome),Z.hasVillage=!0,Z.resource=null,M.push(H),x.push(H)},E=qi($t,t);t=E.nextState;for(let H=0;H<2;H++)for(const Z of E.result){const ce=p[Z],me=[[3,4,3],[3,5,3],[3,6,3],[3,6,2]];let O=!1;for(const[j,ye,ue]of me){if(O)break;const De=[];for(let Ie=1;Ie<i-1;Ie++)for(let Ne=1;Ne<i-1;Ne++){const ut=xt({x:Ne,y:Ie},ce);if(ut<j||ut>ye||!T(Ne,Ie,ue))continue;const $e=(Ne-ce.x)**2+(Ie-ce.y)**2;let ht=!0;for(const L of $t){if(L===Z)continue;const nn=p[L];if((Ne-nn.x)**2+(Ie-nn.y)**2<=$e){ht=!1;break}}ht&&De.push({x:Ne,y:Ie})}if(De.length>0){const Ie=De.filter($e=>{const ht=qt(g,i,$e.x,$e.y);return ht!==null&&ht.terrain!=="water"}),Ne=Ie.length>0?Ie:De,ut=Dt(t,0,Ne.length-1);t=ut.nextState,b(Ne[ut.value]),O=!0}}}const w=[],S=[];for(let H=1;H<i-1;H++)for(let Z=1;Z<i-1;Z++)Z>=2&&H>=2&&Z<=i-3&&H<=i-3?w.push({x:Z,y:H}):S.push({x:Z,y:H});const R=qi(w,t);t=R.nextState;const P=qi(S,t);t=P.nextState;const D=(H,Z,ce,me)=>{for(const O of H){if(x.length>=me)break;if(!T(O.x,O.y,Z))continue;const j=qt(g,i,O.x,O.y);j&&(!ce&&j.terrain==="water"||b(O))}};D(R.result,3,!1,v),D(P.result,3,!1,v),D(R.result,3,!0,v),D(P.result,3,!0,v),x.length<y&&(D(R.result,2,!0,y),D(P.result,2,!0,y));for(const H of x){let Z=0;const ce=[];for(let me=-1;me<=1;me++)for(let O=-1;O<=1;O++){if(O===0&&me===0)continue;const j=qt(g,i,H.x+O,H.y+me);j&&(Ar(j)?Z++:j.terrain==="water"&&ce.push(j))}for(;Z<4&&ce.length>0;){const me=ce.pop();me.terrain=ur(me.biome),Z++}}const G=i===18?8:6,$=[],q=(H,Z)=>{if(H.hasVillage||H.resource==="ruins"||!Ar(H))return!1;for(const ce of $t)if(xt(H,p[ce])<=2)return!1;return!$.some(ce=>xt(H,ce)<Z)};for(const H of E.result){if($.length>=G)break;const Z=p[H],ce=g.filter(me=>q(me,3)&&xt(me,Z)>=3&&xt(me,Z)<=6);if(ce.length>0){const me=Dt(t,0,ce.length-1);t=me.nextState;const O=ce[me.value];O.resource="ruins",$.push({x:O.x,y:O.y})}}const K=qi(g.filter(H=>q(H,2)),t);t=K.nextState;for(const H of[3,2])for(const Z of K.result){if($.length>=G)break;q(Z,H)&&(Z.resource="ruins",$.push({x:Z.x,y:Z.y}))}for(const H of g){if(H.hasVillage||H.resource!==null)continue;let Z=!1;for(const me of $t)if(xt(H,p[me])<=1){Z=!0;break}if(Z)continue;const ce=Xt(t);t=ce.nextState,H.terrain==="plains"&&ce.value<.22?H.resource="berries":(H.terrain==="forest"||H.terrain==="ancient_woods")&&ce.value<.3?H.resource=ce.value<.1?"berries":"game":H.terrain==="mountain"&&ce.value<.48&&(H.resource=ce.value<.15?"mithril":"ore")}for(const H of x){const Z=[];let ce=!1;for(let me=-1;me<=1;me++){for(let O=-1;O<=1;O++){if(O===0&&me===0)continue;const j=qt(g,i,H.x+O,H.y+me);if(!(!j||j.hasVillage)){if(j.resource!==null&&j.resource!=="ruins"){ce=!0;break}j.resource===null&&j.terrain!=="water"&&Z.push(j)}}if(ce)break}if(!ce&&Z.length>0){const me=Dt(t,0,Z.length-1);t=me.nextState;const O=Z[me.value];O.terrain==="mountain"?O.resource="ore":O.terrain==="forest"||O.terrain==="ancient_woods"?O.resource="game":(O.terrain="plains",O.resource="berries")}}const V=p[$t[0]],le=[...$t.map(H=>p[H]),...x,...$];return t1(g,i,V,le),{tiles:g,capitalCoords:p,rngState:t}}function Wu(i,e){const t=Ut[e.type];let n=t.attack;const s=qe(i,e.ownerId),r=we(i,e.x,e.y);return!s||!r||(Ee(s,"humans_plains_charge")&&(e.type==="rider"||e.type==="rohirrim_knight")&&r.terrain==="plains"&&(n+=.5),Ee(s,"humans_siegecraft")&&e.type==="catapult"&&(n+=.5),Ee(s,"orcs_pack_tactics")&&e.type==="rider"&&(n+=.5),Ee(s,"orcs_mount_doom")&&e.type==="catapult"&&(n+=1),Ee(s,"elves_woodland_aim")&&t.range>1&&(r.terrain==="forest"||r.terrain==="ancient_woods")&&(n+=.5),Ee(s,"elves_galadhrim_precision")&&e.type==="elven_sentinel"&&(n+=.5),Ee(s,"dwarves_horned_charge")&&e.type==="rider"&&(n+=.5),Ee(s,"dwarves_dragon_slayers")&&e.type==="catapult"&&(n+=.5)),n}function $u(i,e){const t=Ut[e.type];let n=t.defense;const s=qe(i,e.ownerId);return s&&s.faction==="dwarves"&&Ee(s,"dwarves_runic_plate")&&t.range===1&&(n+=.5),n}function i1(i,e,t){const n=we(i,e.x,e.y),s=qe(i,e.ownerId);if(!n||!s)return 1;let r=1;if(n.terrain==="mountain"?r=Math.max(r,s.faction==="dwarves"?1.75:1.5):n.terrain==="forest"||n.terrain==="ancient_woods"?r=Math.max(r,1.5):n.terrain==="plains"&&(e.type==="defender"&&Ee(s,"elves_graceful_guard")&&(r=Math.max(r,1.5)),(e.type==="ironbreaker"||e.type==="defender")&&Ee(s,"dwarves_mithril_phalanx")&&(r=Math.max(r,1.75))),n.isCityCenter&&n.cityId){const o=i.cities[n.cityId];o&&o.ownerId===e.ownerId&&(o.hasWalls&&!t?r=Math.max(r,2):ln(i,e,"fortify")&&(r=Math.max(r,1.5)))}return r}function To(i,e,t){const n=i.units[e],s=i.units[t];if(!n||!s)return{attackerId:e,defenderId:t,attackerDamage:0,retaliationDamage:0,defenderKilled:!1,attackerKilled:!1,terrainDefenseBonus:1,willAdvance:!1};const r=xo(i,n),o=xo(i,s),a=qe(i,n.ownerId),c=Wu(i,n),d=$u(i,s),l=ln(i,n,"siege"),u=i1(i,s,l),f=ln(i,n,"bloodlust")?1:Math.max(0,n.hp)/n.maxHp,h=Math.max(0,s.hp)/s.maxHp,g=c*f,_=d*h*u,m=g+_,p=r>1;let v=0;m>0&&(v=Math.round(g/m*c*4.5),a&&n.type==="archer"&&Ee(a,"orcs_black_arrows")&&s.hp<s.maxHp&&(v+=1),p&&ln(i,s,"stalwart")&&(v=Math.max(0,v-1)));const M=s.hp-v<=0;let x=0;const T=xt(n,s);!M&&T<=o&&m>0&&d>0&&(x=Math.round(_/m*d*4.5),o>1&&ln(i,n,"stalwart")&&(x=Math.max(0,x-1)));const b=!M&&n.hp-x<=0;return{attackerId:e,defenderId:t,attackerDamage:v,retaliationDamage:x,defenderKilled:M,attackerKilled:b,terrainDefenseBonus:u,willAdvance:M&&!p}}function Yc(i,e){const t=`${e}_${i.nextEntityId}`;return i.nextEntityId+=1,t}function bs(i,e,t,n,s){const r=[];for(let o=-s;o<=s;o++)for(let a=-s;a<=s;a++){const c=t+a,d=n+o;if(c<0||d<0||c>=i.mapSize||d>=i.mapSize)continue;const l=rt(c,d,i.mapSize);e.revealedTiles[l]||(e.revealedTiles[l]=!0,r.push({x:c,y:d}))}return r}function Aa(i,e,t,n){const s=we(i,t,n);if(!s)return 1;let r=1;return(s.terrain==="mountain"||Ee(e,"elves_keen_sight")&&(s.terrain==="forest"||s.terrain==="ancient_woods"))&&(r=2),r}function Tc(i,e){const t=e.borderRadius;for(let s=-t;s<=t;s++)for(let r=-t;r<=t;r++){const o=we(i,e.x+r,e.y+s);o&&o.cityId===null&&(o.cityId=e.id)}const n=we(i,e.x,e.y);n&&(n.cityId=e.id,n.isCityCenter=!0,n.hasVillage=!1)}function s1(i,e){const t=new Set(Object.values(i.cities).map(r=>r.name)),n=bt[e].cityNames;for(const r of n)if(!t.has(r))return r;let s=2;for(;;){for(const r of n){const o=`${r} ${s}`;if(!t.has(o))return o}s++}}function Eo(i){for(const e of i.players){if(e.faction==="humans"){const t=Lu(i,e.id);for(const n of dn(i,e.id))n.connectedToCapital=t.has(n.id)}e.goldPerTurn=Uu(i,e.id),e.score=Xc(i,e.id)}}function Ts(i,e,t,n){if(t<=0)return;e.population+=t;const s=qe(i,e.ownerId);for(;e.population>=e.level+1;)e.population-=e.level+1,e.level+=1,e.pendingLevelRewards.push(e.level),s&&Ee(s,"dwarves_stone_walls")&&e.level>=2&&(e.hasWalls=!0),n.push({type:"CITY_LEVELED",cityId:e.id,coord:{x:e.x,y:e.y},newLevel:e.level,ownerId:e.ownerId})}function r1(i,e,t,n,s){const r=we(i,t,n);if(!r||r.resource!=="ruins")return;r.resource=null;const o=Ee(e,"humans_hunting")?2:0;o>0&&(e.gold+=o);const a=mi(e.faction).filter(f=>f.tier===1&&!Ee(e,f.id)).map(f=>f.id),c=dn(i,e.id),d=["gold"];a.length>0&&d.push("tech"),c.length>0&&d.push("population");const l=Dt(i.rngState,0,d.length-1);i.rngState=l.nextState;const u=d[l.value];if(u==="gold")e.gold+=5,s.push({type:"RUINS_CLAIMED",coord:{x:t,y:n},playerId:e.id,rewardKind:"gold",amount:5+o});else if(u==="tech"){const f=Dt(i.rngState,0,a.length-1);i.rngState=f.nextState;const h=a[f.value];e.techs.push(h),s.push({type:"RUINS_CLAIMED",coord:{x:t,y:n},playerId:e.id,rewardKind:"tech",techId:h,amount:o>0?o:void 0}),s.push({type:"TECH_RESEARCHED",playerId:e.id,techId:h,cost:0})}else{let f=c[0],h=xt({x:t,y:n},f);for(let g=1;g<c.length;g++){const _=xt({x:t,y:n},c[g]);_<h&&(h=_,f=c[g])}s.push({type:"RUINS_CLAIMED",coord:{x:t,y:n},playerId:e.id,rewardKind:"population",amount:3,cityId:f.id}),Ts(i,f,3,s)}}function Ec(i,e,t,n,s,r,o){const a=Pu(i,e,t)+(o?.bonusMaxHp??0),c=o?.ready??!1,d={id:Yc(i,"unit"),type:t,ownerId:e,homeCityId:r,x:n,y:s,hp:a,maxHp:a,kills:0,isVeteran:o?.isVeteran??!1,canPromote:!1,hasMoved:!c,hasAttacked:!c,canEscapeMove:!1,canPersistAttack:!1,actedThisTurn:!c,canCapture:!1,canExploreRuins:!1};i.units[d.id]=d;const l=we(i,n,s);return l&&(l.unitId=d.id),d}function Gd(i){const e=Ky(i.seed),t=n1(i.mapSize,e),s=[i.humanFaction,...$t.filter(o=>o!==i.humanFaction)].map(o=>{const a=bt[o];return{id:`player_${o}`,faction:o,name:a.name,isHuman:o===i.humanFaction,gold:a.startingGold,goldPerTurn:0,score:0,techs:[a.startingTech],revealedTiles:new Array(i.mapSize*i.mapSize).fill(!1),alive:!0,eliminatedOnTurn:null}}),r={config:{...i},mapSize:i.mapSize,turn:1,activePlayerIndex:0,phase:"playing",winnerId:null,winReason:null,rngState:t.rngState,nextEntityId:1,players:s,tiles:t.tiles,cities:{},units:{}};for(const o of r.players){const a=bt[o.faction],c=t.capitalCoords[o.faction],d=Yc(r,"city"),l={id:d,name:a.cityNames[0],ownerId:o.id,styleFaction:o.faction,x:c.x,y:c.y,isCapital:!0,level:1,population:0,hasWorkshop:!1,hasWalls:!1,borderRadius:1,parks:0,pendingLevelRewards:[],connectedToCapital:!0};r.cities[d]=l,Tc(r,l),bs(r,o,c.x,c.y,2),Ec(r,o.id,a.startingUnit,c.x,c.y,d,{ready:!0})}return Eo(r),r}function Xu(i){const e={};for(const[n,s]of Object.entries(i.cities))e[n]={...s,pendingLevelRewards:s.pendingLevelRewards.slice()};const t={};for(const[n,s]of Object.entries(i.units))t[n]={...s};return{config:{...i.config},mapSize:i.mapSize,turn:i.turn,activePlayerIndex:i.activePlayerIndex,phase:i.phase,winnerId:i.winnerId,winReason:i.winReason,rngState:i.rngState,nextEntityId:i.nextEntityId,players:i.players.map(n=>({...n,techs:n.techs.slice(),revealedTiles:n.revealedTiles.slice()})),tiles:i.tiles.map(n=>({...n})),cities:e,units:t}}function o1(i,e){return i===2?e==="workshop"||e==="explorer":i===3?e==="city_wall"||e==="resources":i===4?e==="border_growth"||e==="pop_growth":i>=5?e==="champion"||e==="park":!1}function Vd(i){const e={};for(const t of i.players)e[t.id]=Xc(i,t.id),t.score=e[t.id];return e}function a1(i,e){const t=Object.values(i.cities).filter(s=>s.isCapital);if(t.length>0&&t.every(s=>s.ownerId===e))return!0;const n=i.players.filter(s=>s.alive);return n.length===1&&n[0].id===e}function c1(i,e,t){const n=dn(i,e.id),s=new Set;if(Ee(e,"humans_citadel_masonry"))for(const a of n){if(!a.hasWalls)continue;const c=we(i,a.x,a.y);if(!c||!c.unitId)continue;const d=i.units[c.unitId];if(d&&d.ownerId===e.id&&d.hp<d.maxHp&&!s.has(d.id)){const l=d.hp;d.hp=Math.min(d.maxHp,d.hp+2),s.add(d.id),t.push({type:"UNIT_HEALED",unitId:d.id,coord:{x:d.x,y:d.y},amount:d.hp-l,newHp:d.hp})}}if(Ee(e,"elves_rings_preservation"))for(const o of n)for(let a=-1;a<=1;a++)for(let c=-1;c<=1;c++){const d=we(i,o.x+c,o.y+a);if(!d||!d.unitId)continue;const l=i.units[d.unitId];if(l&&l.ownerId===e.id&&l.hp<l.maxHp&&!s.has(l.id)){const u=l.hp;l.hp=Math.min(l.maxHp,l.hp+2),s.add(l.id),t.push({type:"UNIT_HEALED",unitId:l.id,coord:{x:l.x,y:l.y},amount:l.hp-u,newHp:l.hp})}}if(Ee(e,"elves_wind_riders"))for(const o of Object.values(i.units)){if(o.ownerId!==e.id||o.hp>=o.maxHp||s.has(o.id))continue;const a=we(i,o.x,o.y);if(a&&a.cityId&&i.cities[a.cityId]?.ownerId===e.id){const c=o.hp;o.hp=Math.min(o.maxHp,o.hp+2),s.add(o.id),t.push({type:"UNIT_HEALED",unitId:o.id,coord:{x:o.x,y:o.y},amount:o.hp-c,newHp:o.hp})}}Eo(i);const r=Uu(i,e.id);e.gold+=r,e.goldPerTurn=r;for(const o of Object.values(i.units))o.ownerId===e.id&&(o.hasMoved=!1,o.hasAttacked=!1,o.canEscapeMove=!1,o.canPersistAttack=!1,o.actedThisTurn=!1,o.canCapture=$c(i,e.id,o.x,o.y),o.canExploreRuins=Du(i,o.x,o.y));t.push({type:"TURN_STARTED",playerId:e.id,turn:i.turn,goldGained:r})}function vo(i,e){const t=Xu(i),n=[];if(t.phase==="game_over")return{state:t,events:n};const s=ws(t);if(!s||!s.alive)return{state:t,events:n};switch(e.type){case"MOVE_UNIT":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||!xr(t,r.id).some(f=>f.x===e.to.x&&f.y===e.to.y))break;const a={x:r.x,y:r.y},c=we(t,a.x,a.y),d=we(t,e.to.x,e.to.y);if(!c||!d||d.unitId!==null)break;c.unitId=null,r.x=e.to.x,r.y=e.to.y,d.unitId=r.id,r.canCapture=!1,r.canExploreRuins=!1,r.canEscapeMove?(r.canEscapeMove=!1,r.hasMoved=!0,r.actedThisTurn=!0):(r.hasMoved=!0,ln(t,r,"dash")||(r.actedThisTurn=!0)),n.push({type:"UNIT_MOVED",unitId:r.id,from:a,to:{...e.to},ownerId:s.id});const l=Aa(t,s,r.x,r.y),u=bs(t,s,r.x,r.y,l);u.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:u}),r.actedThisTurn||!r.hasAttacked&&ln(t,r,"dash")&&Ps(t,r.id).length>0||(r.actedThisTurn=!0);break}case"ATTACK_UNIT":{const r=t.units[e.attackerId],o=t.units[e.defenderId];if(!r||!o||r.ownerId!==s.id||o.ownerId===s.id||!Ps(t,r.id).some(m=>m.x===o.x&&m.y===o.y))break;r.canCapture=!1,r.canExploreRuins=!1;const c=To(t,r.id,o.id),d={x:r.x,y:r.y},l={x:o.x,y:o.y},u=Ut[r.type].range>1,f=ln(t,o,"stalwart"),h=qe(t,o.ownerId),g=we(t,d.x,d.y),_=we(t,l.x,l.y);if(n.push({type:"UNIT_ATTACKED",attackerId:r.id,defenderId:o.id,from:d,to:l,isRanged:u,damage:c.attackerDamage,retaliationDamage:c.retaliationDamage,defenderKilled:c.defenderKilled,attackerKilled:c.attackerKilled,advanced:c.willAdvance}),c.defenderKilled){if(_&&_.unitId===o.id&&(_.unitId=null),delete t.units[o.id],r.kills+=1,r.kills>=3&&!r.isVeteran&&(r.canPromote=!0),s.faction==="orcs"){const m=Ee(s,"orcs_spoils_mastery")?3:2;s.gold+=m,n.push({type:"SPOILS_GAINED",playerId:s.id,coord:l,amount:m})}if(c.willAdvance&&g&&_){g.unitId=null,r.x=l.x,r.y=l.y,_.unitId=r.id;const m=Aa(t,s,r.x,r.y),p=bs(t,s,r.x,r.y,m);p.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:p})}ln(t,r,"persist")&&!f?(r.canPersistAttack=!0,r.hasAttacked=!1,r.actedThisTurn=!1):ln(t,r,"escape")||ln(t,r,"skirmish")?(r.hasAttacked=!0,r.canPersistAttack=!1,r.canEscapeMove=!0,r.actedThisTurn=!1):(r.hasAttacked=!0,r.canPersistAttack=!1,r.actedThisTurn=!0)}else if(o.hp-=c.attackerDamage,r.hp-=c.retaliationDamage,c.attackerKilled){if(g&&g.unitId===r.id&&(g.unitId=null),delete t.units[r.id],o.kills+=1,o.kills>=3&&!o.isVeteran&&(o.canPromote=!0),h&&h.faction==="orcs"){const m=Ee(h,"orcs_spoils_mastery")?3:2;h.gold+=m,n.push({type:"SPOILS_GAINED",playerId:h.id,coord:d,amount:m})}}else r.hasAttacked=!0,r.canPersistAttack=!1,ln(t,r,"escape")||ln(t,r,"skirmish")?(r.canEscapeMove=!0,r.actedThisTurn=!1):r.actedThisTurn=!0;t.units[r.id]&&!r.actedThisTurn&&(r.canPersistAttack?Ps(t,r.id).length===0&&(r.canPersistAttack=!1,r.hasAttacked=!0,r.actedThisTurn=!0):r.canEscapeMove&&xr(t,r.id).length===0&&(r.canEscapeMove=!1,r.actedThisTurn=!0));break}case"CAPTURE_CITY":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||!vi(t,r.id))break;const o=we(t,r.x,r.y);if(!o)break;if(o.hasVillage&&!o.cityId){r.hasMoved=!0,r.hasAttacked=!0,r.canEscapeMove=!1,r.canPersistAttack=!1,r.actedThisTurn=!0,r.canCapture=!1,r.canExploreRuins=!1;const a=Yc(t,"city"),c={id:a,name:s1(t,s.faction),ownerId:s.id,styleFaction:s.faction,x:o.x,y:o.y,isCapital:!1,level:1,population:0,hasWorkshop:!1,hasWalls:!1,borderRadius:1,parks:0,pendingLevelRewards:[],connectedToCapital:!1};t.cities[a]=c,Tc(t,c);const d=bs(t,s,o.x,o.y,1);d.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:d});let l;s.faction==="orcs"&&(l=Ee(s,"orcs_spoils_mastery")?5:4,s.gold+=l),n.push({type:"CITY_CAPTURED",cityId:a,coord:{x:o.x,y:o.y},oldOwnerId:null,newOwnerId:s.id,wasVillage:!0,spoilsGold:l}),l&&n.push({type:"SPOILS_GAINED",playerId:s.id,coord:{x:o.x,y:o.y},amount:l})}else if(o.isCityCenter&&o.cityId){const a=t.cities[o.cityId];if(!a||a.ownerId===s.id)break;r.hasMoved=!0,r.hasAttacked=!0,r.canEscapeMove=!1,r.canPersistAttack=!1,r.actedThisTurn=!0,r.canCapture=!1,r.canExploreRuins=!1;const c=a.ownerId;a.ownerId=s.id,a.styleFaction=s.faction;for(const f of Object.values(t.units))f.homeCityId===a.id&&f.ownerId===c&&(f.homeCityId=null);Ee(s,"dwarves_stone_walls")&&a.level>=2&&(a.hasWalls=!0);const d=bs(t,s,o.x,o.y,1);d.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:d});let l;s.faction==="orcs"&&(l=Ee(s,"orcs_spoils_mastery")?5:4,s.gold+=l),n.push({type:"CITY_CAPTURED",cityId:a.id,coord:{x:o.x,y:o.y},oldOwnerId:c,newOwnerId:s.id,wasVillage:!1,spoilsGold:l}),l&&n.push({type:"SPOILS_GAINED",playerId:s.id,coord:{x:o.x,y:o.y},amount:l});const u=qe(t,c);if(u&&u.alive&&dn(t,c).length===0){u.alive=!1,u.eliminatedOnTurn=t.turn;for(const f of Object.values(t.units))if(f.ownerId===c){const h=we(t,f.x,f.y);h&&h.unitId===f.id&&(h.unitId=null),delete t.units[f.id]}n.push({type:"PLAYER_ELIMINATED",playerId:c,eliminatedByPlayerId:s.id})}if(a1(t,s.id)){Eo(t);const f=Vd(t);return t.phase="game_over",t.winnerId=s.id,t.winReason="domination",n.push({type:"GAME_OVER",winnerId:s.id,reason:"domination",scores:f}),{state:t,events:n}}}break}case"EXPLORE_RUINS":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||!yi(t,r.id))break;const o=we(t,r.x,r.y);if(!o||o.resource!=="ruins")break;r.hasMoved=!0,r.hasAttacked=!0,r.canEscapeMove=!1,r.canPersistAttack=!1,r.actedThisTurn=!0,r.canCapture=!1,r.canExploreRuins=!1,r1(t,s,r.x,r.y,n);break}case"RECOVER_UNIT":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||r.hasMoved||r.hasAttacked||r.actedThisTurn||r.hp>=r.maxHp)break;const o=we(t,r.x,r.y),c=o!==null&&o.cityId!==null&&t.cities[o.cityId]?.ownerId===s.id?4:2,d=r.hp;r.hp=Math.min(r.maxHp,r.hp+c),r.hasMoved=!0,r.hasAttacked=!0,r.actedThisTurn=!0,r.canCapture=!1,r.canExploreRuins=!1,n.push({type:"UNIT_HEALED",unitId:r.id,coord:{x:r.x,y:r.y},amount:r.hp-d,newHp:r.hp});break}case"PROMOTE_UNIT":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||!r.canPromote&&r.kills<3||r.isVeteran)break;r.isVeteran=!0,r.canPromote=!1,r.maxHp+=5,r.hp=r.maxHp,!r.actedThisTurn&&!br(t,r.id)&&(r.actedThisTurn=!0),n.push({type:"UNIT_PROMOTED",unitId:r.id,coord:{x:r.x,y:r.y},newMaxHp:r.maxHp});break}case"HARVEST_TILE":{if(!Ss(t,s.id,e.coord.x,e.coord.y).some(l=>l.type==="HARVEST_TILE"))break;const o=we(t,e.coord.x,e.coord.y);if(!o||!o.cityId||!o.resource||o.resource==="ruins")break;const a=t.cities[o.cityId];if(!a||a.ownerId!==s.id)break;const c=o.resource,d=Cu[c];s.gold-=pr,o.resource=null,n.push({type:"RESOURCE_HARVESTED",coord:{...e.coord},resource:c,cityId:a.id,popGained:d,playerId:s.id}),Ts(t,a,d,n);break}case"BUILD_IMPROVEMENT":{if(!Ss(t,s.id,e.coord.x,e.coord.y).some(l=>l.type==="BUILD_IMPROVEMENT"&&l.improvement===e.improvement))break;const o=we(t,e.coord.x,e.coord.y);if(!o||!o.cityId)break;const a=t.cities[o.cityId];if(!a||a.ownerId!==s.id)break;const c=Di[e.improvement],d=ku(t,e.coord.x,e.coord.y,e.improvement);if(s.gold-=c.cost,o.improvement=e.improvement,n.push({type:"IMPROVEMENT_BUILT",coord:{...e.coord},improvement:e.improvement,cityId:a.id,popGained:d,playerId:s.id}),Ts(t,a,d,n),e.improvement==="farm"||e.improvement==="mine"){const l=e.improvement==="farm"?"windmill":"great_forge",u=e.improvement==="farm"?1:2;for(const f of Qi(t,e.coord.x,e.coord.y))if(f.improvement===l&&f.cityId){const h=t.cities[f.cityId];h&&h.ownerId===s.id&&Ts(t,h,u,n)}}break}case"BUILD_ROAD":{if(!Ss(t,s.id,e.coord.x,e.coord.y).some(a=>a.type==="BUILD_ROAD"))break;const o=we(t,e.coord.x,e.coord.y);if(!o)break;s.gold-=mr,o.hasRoad=!0,n.push({type:"ROAD_BUILT",coord:{...e.coord},playerId:s.id});break}case"CHOP_FOREST":{if(!Ss(t,s.id,e.coord.x,e.coord.y).some(a=>a.type==="CHOP_FOREST"))break;const o=we(t,e.coord.x,e.coord.y);if(!o)break;o.terrain="plains",o.improvement==="sanctuary"&&(o.improvement=null),s.gold+=yc,n.push({type:"FOREST_CHOPPED",coord:{...e.coord},goldGained:yc,playerId:s.id});break}case"PLANT_ANCIENT_WOODS":{if(!Ss(t,s.id,e.coord.x,e.coord.y).some(c=>c.type==="PLANT_ANCIENT_WOODS"))break;const o=we(t,e.coord.x,e.coord.y);if(!o||!o.cityId)break;const a=t.cities[o.cityId];if(!a||a.ownerId!==s.id)break;s.gold-=gr,o.terrain="ancient_woods",n.push({type:"WOODS_PLANTED",coord:{...e.coord},cityId:a.id,popGained:1,playerId:s.id}),Ts(t,a,1,n);break}case"TRAIN_UNIT":{const r=t.cities[e.cityId];if(!r||r.ownerId!==s.id)break;const o=we(t,r.x,r.y);if(!o||o.unitId!==null||!Vc(t,r.id).includes(e.unitType)||Lo(t,r.id)>=Do(t,r))break;const c=Gc(t,s.id,e.unitType);if(s.gold<c)break;s.gold-=c;const d=Ec(t,s.id,e.unitType,r.x,r.y,r.id,{ready:!1});n.push({type:"UNIT_TRAINED",unitId:d.id,unitType:d.type,cityId:r.id,coord:{x:r.x,y:r.y},ownerId:s.id});break}case"RESEARCH_TECH":{if(!Wc(t,s.id,e.techId))break;const r=Uo(t,s.id,e.techId);if(s.gold-=r,s.techs.push(e.techId),n.push({type:"TECH_RESEARCHED",playerId:s.id,techId:e.techId,cost:r}),e.techId==="dwarves_stone_walls")for(const o of dn(t,s.id))o.level>=2&&(o.hasWalls=!0);else if(e.techId==="elves_keen_sight"){const o=[];for(const a of Object.values(t.units)){if(a.ownerId!==s.id)continue;const c=we(t,a.x,a.y);if(c&&(c.terrain==="forest"||c.terrain==="ancient_woods")){const d=Aa(t,s,a.x,a.y);o.push(...bs(t,s,a.x,a.y,d))}}o.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:o})}else if(e.techId==="humans_ride_of_rohirrim")for(const o of Object.values(t.units))o.ownerId===s.id&&(o.type==="rider"||o.type==="rohirrim_knight")&&(o.maxHp+=3,o.hp+=3);else if(e.techId==="orcs_pack_tactics")for(const o of Object.values(t.units))o.ownerId===s.id&&o.type==="rider"&&(o.maxHp+=3,o.hp+=3);else if(e.techId==="orcs_black_gate")for(const o of Object.values(t.units))o.ownerId===s.id&&o.type==="uruk_berserker"&&(o.maxHp+=3,o.hp+=3);else if(e.techId==="elves_galadhrim_precision")for(const o of Object.values(t.units))o.ownerId===s.id&&o.type==="elven_sentinel"&&(o.maxHp+=3,o.hp+=3);else if(e.techId==="dwarves_mithril_phalanx")for(const o of Object.values(t.units))o.ownerId===s.id&&(o.type==="ironbreaker"||o.type==="defender")&&(o.maxHp+=4,o.hp+=4);else if(e.techId==="dwarves_dragon_slayers")for(const o of Object.values(t.units))o.ownerId===s.id&&o.type==="catapult"&&(o.maxHp+=5,o.hp+=5);break}case"CHOOSE_CITY_REWARD":{const r=t.cities[e.cityId];if(!r||r.ownerId!==s.id||r.pendingLevelRewards.length===0)break;const o=r.pendingLevelRewards[0];if(!o1(o,e.reward))break;if(r.pendingLevelRewards.shift(),e.reward==="workshop")r.hasWorkshop=!0;else if(e.reward==="explorer"){const a=[];for(let d=0;d<t.mapSize;d++)for(let l=0;l<t.mapSize;l++){const u=rt(l,d,t.mapSize);if(!s.revealedTiles[u]){const f=(l-r.x)**2+(d-r.y)**2;a.push({coord:{x:l,y:d},dist:f})}}a.sort((d,l)=>d.dist-l.dist);const c=a.slice(0,10).map(d=>d.coord);for(const d of c)s.revealedTiles[rt(d.x,d.y,t.mapSize)]=!0;c.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:c})}else if(e.reward==="city_wall")r.hasWalls=!0;else if(e.reward==="resources")s.gold+=5;else if(e.reward==="border_growth")r.borderRadius=2,Tc(t,r);else if(e.reward==="pop_growth")Ts(t,r,3,n);else if(e.reward==="champion"){const a=bt[s.faction].uniqueUnit;let c=null;const d=we(t,r.x,r.y);if(d&&d.unitId===null)c={x:r.x,y:r.y};else{const l=[];for(let u=-2;u<=2;u++)for(let f=-2;f<=2;f++){const h=we(t,r.x+f,r.y+u);!h||h.unitId!==null||h.terrain!=="water"&&(h.terrain==="mountain"&&!Iu(s)||l.push({coord:{x:h.x,y:h.y},dist:f*f+u*u}))}l.sort((u,f)=>u.dist-f.dist),l.length>0&&(c=l[0].coord)}if(c){const l=Ec(t,s.id,a,c.x,c.y,null,{ready:!1,isVeteran:!0,bonusMaxHp:5});n.push({type:"UNIT_TRAINED",unitId:l.id,unitType:l.type,cityId:r.id,coord:c,ownerId:s.id})}}else e.reward==="park"&&(r.parks+=1);n.push({type:"CITY_REWARD_APPLIED",cityId:r.id,coord:{x:r.x,y:r.y},reward:e.reward,ownerId:s.id});break}case"END_TURN":{const r=t.players.length;let o=t.activePlayerIndex,a=!1;for(let d=1;d<=r;d++){const l=(t.activePlayerIndex+d)%r;if(l<=t.activePlayerIndex&&(a=!0),t.players[l].alive){o=l;break}}if(a&&(t.turn+=1),t.activePlayerIndex=o,t.config.maxTurns>0&&t.turn>t.config.maxTurns){const d=Vd(t),u=t.players.slice().sort((f,h)=>{const g=d[h.id]-d[f.id];return g!==0?g:f.alive!==h.alive?f.alive?-1:1:h.gold-f.gold})[0];return t.phase="game_over",t.winnerId=u.id,t.winReason="glory",n.push({type:"GAME_OVER",winnerId:u.id,reason:"glory",scores:d}),{state:t,events:n}}const c=t.players[t.activePlayerIndex];c1(t,c,n);break}}return Eo(t),{state:t,events:n}}function ai(i,e){return Math.max(Math.abs(i.x-e.x),Math.abs(i.y-e.y))}function qu(i,e){let t=(i^Math.imul(e+1,2654435761))>>>0;return t=Math.imul(t^t>>>16,2246822507)>>>0,t=Math.imul(t^t>>>13,3266489909)>>>0,t=(t^t>>>16)>>>0,t/4294967296}function Ai(i,e,t){return t<=0?0:(qu(i,e)*2-1)*t}function ys(i,e){const t=i.players.find(m=>m.id===e),n=[],s=[];let r=null,o=null;const c=i.players.find(m=>m.isHuman)?.id??null;for(const m of Object.values(i.cities))if(m.ownerId===e)n.push(m),m.isCapital&&(r=m);else{const p=rt(m.x,m.y,i.mapSize);t.revealedTiles[p]&&s.push(m),m.ownerId===c&&m.isCapital&&(o=m)}const d=[],l=[];for(const m of Object.values(i.units))if(m.ownerId===e)d.push(m);else{const p=rt(m.x,m.y,i.mapSize);t.revealedTiles[p]&&l.push(m)}const u=[],f=[];let h=0;for(let m=0;m<i.tiles.length;m++)if(t.revealedTiles[m]){h++;const v=i.tiles[m];v.hasVillage&&!v.cityId&&u.push({x:v.x,y:v.y}),v.resource==="ruins"&&f.push({x:v.x,y:v.y})}const g={};let _=0;for(const m of n){let p=0;for(const v of l){const y=ai(m,v);y<=3&&p++,y<=4&&_++}g[m.id]=p}return{player:t,ownCities:n,ownCapital:r,enemyCities:s,humanCapital:o,neutralVillages:u,ruins:f,ownUnits:d,enemyUnits:l,cityThreats:g,totalThreat:_,revealedRatio:h/Math.max(1,i.tiles.length)}}function l1(i,e,t,n,s){if(t===2)return n.revealedRatio<.22&&(s.faction==="orcs"||s.faction==="elves")?"explorer":"workshop";if(t===3){const a=(n.cityThreats[e.id]??0)>0;return!e.hasWalls&&(a||e.isCapital||s.faction==="dwarves"||s.faction==="humans")?"city_wall":"resources"}if(t===4){let a=0;for(let c=-2;c<=2;c++)for(let d=-2;d<=2;d++){if(Math.abs(d)<=1&&Math.abs(c)<=1)continue;const l=we(i,e.x+d,e.y+c);l&&!l.cityId&&l.terrain!=="water"&&(l.resource||s.faction==="elves"&&l.terrain==="ancient_woods"||s.faction==="dwarves"&&l.terrain==="mountain")&&a++}return a>=2?"border_growth":"pop_growth"}const r=we(i,e.x,e.y);return r!==null&&r.unitId===null&&i.turn<i.config.maxTurns-3?"champion":"park"}function d1(i,e,t,n,s){const r=en[e],o=bt[n.player.faction];let a=16+(s.techBonuses[e]??0),c=0,d=0;for(const l of i.tiles){if(!l.cityId)continue;const u=i.cities[l.cityId];if(!(!u||u.ownerId!==n.player.id)&&(l.resource&&r.unlocksResources.includes(l.resource)&&c++,!l.improvement&&!l.isCityCenter)){for(const f of r.unlocksImprovements)if(Di[f].allowedTerrains.includes(l.terrain)){d++;break}}}if(a+=c*13,a+=Math.min(d,4)*7,r.unlocksUnits.includes(o.uniqueUnit)?a+=34*s.uniqueUnitWeight:r.unlocksUnits.length>0&&(a+=14+(n.totalThreat>0?8:0)),r.unlocksMountainPass&&(a+=8),r.unlocksChopForest&&n.player.gold<6&&(a+=12),r.unlocksPlantWoods&&(a+=14),e==="elves_elven_lore"){const l=mi(n.player.faction).length-n.player.techs.length;a+=l*4}if(e==="humans_granaries"?a+=n.ownCities.filter(l=>l.level>=3).length*8:e==="humans_citadel_masonry"?a+=n.ownCities.filter(l=>l.hasWalls).length*7:e==="orcs_war_barracks"?a+=n.ownCities.length*6:e==="orcs_spoils_mastery"?a+=10+n.enemyUnits.length*3:e==="dwarves_stone_walls"?a+=n.ownCities.filter(l=>l.level>=2&&!l.hasWalls).length*8:e==="dwarves_runic_plate"&&(a+=n.ownUnits.length*4),r.tier===3)if(a+=20,e==="humans_stewards_citadel"||e==="dwarves_deep_vaults")a+=n.ownCities.length*7;else if(e==="humans_milling")a+=n.ownCities.length*5;else if(e==="humans_ride_of_rohirrim"||e==="orcs_pack_tactics"){const l=n.ownUnits.filter(u=>u.type==="rider"||u.type==="rohirrim_knight").length;a+=l*6}else e==="orcs_black_gate"?a+=n.ownUnits.length*4+8:e==="orcs_fell_volley"?a+=10+n.enemyUnits.length*3:e==="elves_lothlorien_sanctum"||e==="dwarves_heart_of_mountain"||e==="orcs_mount_doom"?a+=n.ownCities.length*6:e==="elves_galadhrim_precision"||e==="dwarves_mithril_phalanx"||e==="dwarves_dragon_slayers"||e==="humans_siegecraft"||e==="elves_wind_riders"?a+=n.ownUnits.length*4:e==="elves_rings_preservation"&&(a+=n.player.techs.length*4);return i.turn>=i.config.maxTurns-6&&(a+=r.tier===3?36:r.tier===2?22:12,e==="elves_rings_preservation"&&(a+=n.player.techs.length*6)),a=a*s.techWeight-t*2.8,a}function u1(i,e,t,n){if(e.type==="HARVEST_TILE"){const s=we(i,e.coord.x,e.coord.y);if(!s||!s.cityId)return-1;const r=i.cities[s.cityId];if(!r)return-1;let o=26*n.economyWeight;return r.population+1>=r.level+1&&(o+=45),o}if(e.type==="BUILD_IMPROVEMENT"){const s=we(i,e.coord.x,e.coord.y);if(!s||!s.cityId)return-1;const r=i.cities[s.cityId];if(!r)return-1;const o=Di[e.improvement];let a=o.basePop,c=0;if(o.adjacentBonusTo&&o.adjacentPopPerMatch){for(let u=-1;u<=1;u++)for(let f=-1;f<=1;f++){if(f===0&&u===0)continue;const h=we(i,s.x+f,s.y+u);h&&h.improvement===o.adjacentBonusTo&&c++}a+=c*o.adjacentPopPerMatch}let d=o.goldPerTurn;if(e.improvement==="windmill"&&t.player.techs.includes("humans_milling")&&(d+=c),(e.improvement==="mine"||e.improvement==="great_forge")&&t.player.techs.includes("dwarves_heart_of_mountain")&&(d+=1),e.improvement==="foundry"&&t.player.techs.includes("orcs_mount_doom")&&(d+=1),e.improvement==="sanctuary"&&t.player.techs.includes("elves_lothlorien_sanctum")&&(d+=1),a===0&&d===0)return-10;let l=(16+a*14+d*24-o.cost*3)*n.economyWeight;return r.population+a>=r.level+1&&(l+=46),n.faction==="elves"&&e.improvement==="sanctuary"&&(l+=10),l}if(e.type==="BUILD_ROAD")return n.faction==="humans"?t.ownCities.some(r=>!r.isCapital&&!r.connectedToCapital)?32:12:6;if(e.type==="CHOP_FOREST")return t.player.gold<=6?30:14;if(e.type==="PLANT_ANCIENT_WOODS"){const s=we(i,e.coord.x,e.coord.y),r=s?.cityId?i.cities[s.cityId]:null;let o=30*n.economyWeight;return r&&r.population+1>=r.level+1&&(o+=42),o}return-1}function Ao(i,e){const t=we(i,e.x,e.y);if(!t)return!1;if(t.hasVillage&&!t.cityId)return!0;if(t.isCityCenter&&t.cityId){const n=i.cities[t.cityId];if(n&&n.ownerId!==e.ownerId)return!0}return!1}function Kc(i,e){const t=we(i,e.x,e.y);return t!==null&&t.resource==="ruins"}function h1(i,e,t){if(!vi(i,e.id))return-999;const n=we(i,e.x,e.y);if(!n)return-999;let s=260;if(n.isCityCenter&&n.cityId){const r=i.cities[n.cityId];r&&r.ownerId!==e.ownerId&&(s+=r.isCapital?50:25)}return t.faction==="orcs"&&(s+=10),s}function f1(i,e,t){if(!yi(i,e.id))return-999;let n=245;return t.player.techs.includes("humans_hunting")&&(n+=10),n}function p1(i,e,t,n,s,r){if(vi(i,e.id)||yi(i,e.id))return-999;const o=To(i,e.id,t.id),a=Ut[t.type],c=we(i,t.x,t.y);let d=(o.attackerDamage*5.5-o.retaliationDamage*4.2*s.selfPreservation)*s.attackWeight;if((Ao(i,e)||Kc(i,e))&&o.willAdvance&&(c?.isCityCenter&&c.cityId!==null&&i.cities[c.cityId]?.ownerId!==e.ownerId||(d-=Ao(i,e)?160:140)),o.defenderKilled&&(d+=85+a.cost*8,s.faction==="orcs"&&(d+=18),Ut[e.type].traits.includes("persist")&&(d+=16)),o.attackerKilled&&!o.defenderKilled?d-=75*s.selfPreservation:o.attackerKilled&&o.defenderKilled&&(d-=20*s.selfPreservation),n.ownCapital&&ai(t,n.ownCapital)<=2&&(d+=55),c?.isCityCenter&&c.cityId){const l=i.cities[c.cityId];l&&l.ownerId!==e.ownerId&&(d+=l.isCapital?48:34,n.humanCapital&&l.id===n.humanCapital.id&&i.turn<=8&&r.earlyHumanCapitalPressure<1&&(d*=r.earlyHumanCapitalPressure))}return o.retaliationDamage===0&&o.attackerDamage>0&&(d+=18),d}function m1(i,e,t,n){let s=0;for(let r=-n;r<=n;r++)for(let o=-n;o<=n;o++){const a=t.x+o,c=t.y+r;a<0||c<0||a>=i.mapSize||c>=i.mapSize||e.revealedTiles[rt(a,c,i.mapSize)]||s++}return s}function Wn(i,e){let t=1/0;for(const n of e){const s=ai(i,n);s<t&&(t=s)}return t}function g1(i,e,t,n,s,r){const o=we(i,t.x,t.y);if(!o||vi(i,e.id)||yi(i,e.id))return-999;const a=Ut[e.type];let c=0;if(Ao(i,e)?c-=170:Kc(i,e)&&(c-=150),o.isCityCenter&&o.cityId){const m=i.cities[o.cityId];if(m&&m.ownerId!==e.ownerId){let p=m.isCapital?150:120;s.faction==="orcs"&&(p+=20),n.humanCapital&&m.id===n.humanCapital.id&&i.turn<=8&&r.earlyHumanCapitalPressure<1&&(p*=r.earlyHumanCapitalPressure),c+=p}}else o.hasVillage&&!o.cityId&&(c+=105*s.expansionWeight+(s.faction==="orcs"?16:0));o.resource==="ruins"&&(c+=78*s.expansionWeight+(n.player.techs.includes("humans_hunting")?14:0));let l=o.terrain==="mountain"?2:1;s.faction==="elves"&&n.player.techs.includes("elves_keen_sight")&&(o.terrain==="forest"||o.terrain==="ancient_woods")&&(l=Math.max(l,2));const u=m1(i,n.player,t,l),f=i.turn<=10?1.35:.75;c+=u*6.5*f*s.expansionWeight;const h=e.hp/e.maxHp,g=e.canEscapeMove||h<=.35;if(g&&n.enemyUnits.length>0){const m=Wn(e,n.enemyUnits),p=Wn(t,n.enemyUnits);c+=(p-m)*16*s.selfPreservation}if(n.neutralVillages.length>0&&!e.canEscapeMove){const m=Wn(e,n.neutralVillages),p=Wn(t,n.neutralVillages);p<m&&(c+=36*s.expansionWeight/Math.max(1,p))}if(n.ruins.length>0&&!e.canEscapeMove){const m=Wn(e,n.ruins),p=Wn(t,n.ruins);p<m&&(c+=24*s.expansionWeight/Math.max(1,p))}if(!g){if(n.ownCapital&&(n.cityThreats[n.ownCapital.id]??0)>0){const p=ai(e,n.ownCapital);ai(t,n.ownCapital)<p&&p<=5&&(c+=28)}if(n.enemyCities.length>0){const p=Wn(e,n.enemyCities),v=Wn(t,n.enemyCities);v<p&&(c+=24*s.attackWeight/Math.max(1,v))}else if(n.enemyUnits.length>0){const p=Wn(e,n.enemyUnits),v=Wn(t,n.enemyUnits);v<p&&(c+=18*s.attackWeight/Math.max(1,v))}else if(u===0&&n.neutralVillages.length===0){const p={x:Math.floor(i.mapSize/2),y:Math.floor(i.mapSize/2)},v=ai(e,p);ai(t,p)<v&&(c+=10)}const m=xo(i,e);if(!e.hasAttacked&&a.traits.includes("dash"))for(const p of n.enemyUnits){const v=ai(t,p);if(v<=m&&(m===1||v>=1)){c+=22*s.attackWeight,m>1&&v===1&&(c-=14*s.selfPreservation);break}}}const _=n.enemyUnits.some(m=>ai(t,m)<=2);if((o.terrain==="forest"||o.terrain==="ancient_woods")&&(s.faction==="elves"?c+=a.range>1?14:10:_&&(c+=7)),o.terrain==="mountain"&&(s.faction==="dwarves"?c+=14:_&&(c+=8)),s.faction==="humans"&&o.hasRoad&&(c+=7),o.isCityCenter&&o.cityId){const m=i.cities[o.cityId];m&&m.ownerId===e.ownerId&&(n.cityThreats[m.id]??0)===0&&(c-=10)}return c}function _1(i,e,t){if(vi(i,e.id)||yi(i,e.id))return-999;if(e.hp>=e.maxHp||e.hasMoved||e.hasAttacked)return-1;const n=e.hp/e.maxHp,s=1-n,r=we(i,e.x,e.y),o=r?.cityId!==null&&r?.cityId!==void 0&&i.cities[r.cityId]?.ownerId===e.ownerId;let a=0;return n<=.45?a=48*s*t.selfPreservation+(o?12:0):n<=.7&&(Ao(i,e)||Kc(i,e))?a=26*t.selfPreservation:n<=.65&&o&&(a=18*s*t.selfPreservation),a}function v1(i,e,t,n,s){const r=Ut[t],o=bt[n.player.faction];let c=22*(s.unitPreferences[t]??1);t===o.uniqueUnit&&(c+=28*s.uniqueUnitWeight);const d=n.cityThreats[e.id]??0;d>0&&(c+=30,(t==="defender"||t==="ironbreaker"||t==="warrior"||t==="uruk_berserker")&&(c+=24),t==="catapult"&&(c-=22)),i.turn<=6&&n.ownUnits.length<n.ownCities.length+2&&(c+=18,(t==="rider"||t==="warrior"||t==="archer")&&(c+=12));const l=n.ownUnits.filter(u=>u.type===t).length;return c-=l*4,t==="catapult"&&n.enemyCities.length>0&&d===0&&(c+=16),c-=r.cost*1.5,c}const y1={humans:{faction:"humans",attackWeight:1.05,selfPreservation:1,expansionWeight:1.25,economyWeight:1.2,techWeight:1.1,uniqueUnitWeight:1.25,techBonuses:{humans_farming:18,humans_granaries:14,humans_milling:20,humans_roads:16,humans_shield_wall:14,humans_citadel_masonry:14,humans_stewards_citadel:22,humans_riding:18,humans_plains_charge:14,humans_chivalry:26,humans_ride_of_rohirrim:24,humans_hunting:14,humans_archery:14,humans_mountaineering:10,humans_siegecraft:18},unitPreferences:{warrior:1,rider:1.3,archer:1.15,defender:1,catapult:.9,rohirrim_knight:1.7}},orcs:{faction:"orcs",attackWeight:1.35,selfPreservation:.6,expansionWeight:1.1,economyWeight:.95,techWeight:1,uniqueUnitWeight:1.4,techBonuses:{orcs_warg_riders:16,orcs_spoils_mastery:20,orcs_pack_tactics:18,orcs_clear_cutting:16,orcs_dark_forges:14,orcs_siege_works:14,orcs_mount_doom:18,orcs_shield_wall:16,orcs_uruk_breeding:28,orcs_war_barracks:18,orcs_black_gate:26,orcs_snaga_archers:14,orcs_black_arrows:14,orcs_crag_climbing:10,orcs_fell_volley:18},unitPreferences:{warrior:1.15,rider:1.25,defender:.95,archer:1.1,catapult:1,uruk_berserker:1.85}},elves:{faction:"elves",attackWeight:1.05,selfPreservation:1.3,expansionWeight:1.15,economyWeight:1.1,techWeight:1.25,uniqueUnitWeight:1.4,techBonuses:{elves_sanctuaries:18,elves_tree_singing:16,elves_lothlorien_sanctum:22,elves_woodland_aim:18,elves_sentinel_order:28,elves_keen_sight:14,elves_galadhrim_precision:24,elves_elven_steeds:16,elves_wardens:14,elves_graceful_guard:12,elves_wind_riders:20,elves_high_paths:16,elves_elven_lore:22,elves_mallorn_siege:12,elves_rings_preservation:24},unitPreferences:{archer:1.35,rider:1.15,warrior:.85,defender:1,catapult:.95,elven_sentinel:1.85}},dwarves:{faction:"dwarves",attackWeight:.95,selfPreservation:1.2,expansionWeight:1,economyWeight:1.4,techWeight:1.15,uniqueUnitWeight:1.4,techBonuses:{dwarves_mining:24,dwarves_khazad_forges:18,dwarves_heart_of_mountain:24,dwarves_shieldbearers:18,dwarves_mithril_smithing:28,dwarves_runic_plate:18,dwarves_mithril_phalanx:26,dwarves_foraging:14,dwarves_stone_walls:18,dwarves_crossbows:12,dwarves_deep_vaults:22,dwarves_ram_riders:14,dwarves_siegecraft:16,dwarves_horned_charge:12,dwarves_dragon_slayers:20},unitPreferences:{warrior:1,defender:1.35,archer:1,rider:.95,catapult:1.1,ironbreaker:1.9}}},M1={easy:{difficulty:"easy",noiseRange:12,economySkipChance:.18,earlyHumanCapitalPressure:.45,productionThreshold:18},normal:{difficulty:"normal",noiseRange:3,economySkipChance:0,earlyHumanCapitalPressure:1,productionThreshold:5}},w1=64,S1=24,x1=2;function b1(i,e,t){const n=t??i.config.difficulty,s=M1[n];let r=Xu(i);const o=[],a=r.players[r.activePlayerIndex];if(!a||a.id!==e||r.phase==="game_over")return[{type:"END_TURN"}];const c=y1[a.faction];let d=r.turn*1009+r.activePlayerIndex*131;const l=m=>{try{const p=vo(r,m);return p.events.length===0?!1:(r=p.state,o.push(m),!0)}catch{return!1}},u=()=>{let m=0;for(;m++<16&&r.phase==="playing";){const p=ys(r,e),v=p.ownCities.find(x=>x.pendingLevelRewards.length>0);if(!v)break;const y=v.pendingLevelRewards[0],M=l1(r,v,y,p,c);if(!l({type:"CHOOSE_CITY_REWARD",cityId:v.id,reward:M}))break}},f=()=>{for(const m of Object.values(r.units))m.ownerId===e&&m.canPromote&&l({type:"PROMOTE_UNIT",unitId:m.id})};u(),f();let h=0;for(;h<x1&&r.phase==="playing";){const m=ys(r,e),p=mi(m.player.faction);let v=null;for(const M of p){if(!Wc(r,e,M.id))continue;const x=Uo(r,e,M.id),b=d1(r,M.id,x,m,c)+Ai(r.rngState,d++,s.noiseRange*.5);(!v||b>v.score)&&(v={action:{type:"RESEARCH_TECH",techId:M.id},score:b})}const y=m.totalThreat>=2?26:12;if(!v||v.score<y||!l(v.action))break;h++}const g=()=>{let m=0;for(;m++<S1&&r.phase==="playing";){const p=ys(r,e);let v=null;for(const y of r.tiles){if(!y.cityId)continue;const M=r.cities[y.cityId];if(!M||M.ownerId!==e)continue;const x=Ss(r,e,y.x,y.y);for(const T of x){const b=u1(r,T,p,c);if(b<=0||s.economySkipChance>0&&b<55&&qu(r.rngState,d++)<s.economySkipChance)continue;const E=b+Ai(r.rngState,d++,s.noiseRange*.5);(!v||E>v.score)&&(v={action:T,score:E})}}if(!v||v.score<10||!l(v.action))break;u()}};g();let _=0;for(;_++<w1&&r.phase==="playing";){f();const m=ys(r,e);let p=null;for(const v of m.ownUnits){if(v.actedThisTurn&&!v.canEscapeMove&&!v.canPersistAttack)continue;if(vi(r,v.id)){const T=h1(r,v,c)+Ai(r.rngState,d++,s.noiseRange*.25);(!p||T>p.score)&&(p={action:{type:"CAPTURE_CITY",unitId:v.id},score:T});continue}if(yi(r,v.id)){const T=f1(r,v,m)+Ai(r.rngState,d++,s.noiseRange*.25);(!p||T>p.score)&&(p={action:{type:"EXPLORE_RUINS",unitId:v.id},score:T});continue}const y=Ps(r,v.id);for(const x of y){const T=we(r,x.x,x.y);if(!T?.unitId)continue;const b=r.units[T.unitId];if(!b||b.ownerId===e)continue;const w=p1(r,v,b,m,c,s)+Ai(r.rngState,d++,s.noiseRange);(!p||w>p.score)&&(p={action:{type:"ATTACK_UNIT",attackerId:v.id,defenderId:b.id},score:w})}const M=xr(r,v.id);for(const x of M){const b=g1(r,v,x,m,c,s)+Ai(r.rngState,d++,s.noiseRange);(!p||b>p.score)&&(p={action:{type:"MOVE_UNIT",unitId:v.id,to:x},score:b})}if(!v.hasMoved&&!v.hasAttacked&&v.hp<v.maxHp){const x=_1(r,v,c);if(x>0){const T=x+Ai(r.rngState,d++,s.noiseRange*.5);(!p||T>p.score)&&(p={action:{type:"RECOVER_UNIT",unitId:v.id},score:T})}}}if(!p||p.score<=2||!l(p.action))break;u()}if(r.phase==="playing"){const m=ys(r,e),p=[...m.ownCities].sort((v,y)=>(m.cityThreats[y.id]??0)-(m.cityThreats[v.id]??0)||y.level-v.level);for(const v of p){if(r.phase!=="playing")break;const y=we(r,v.x,v.y);if(!y||y.unitId!==null||Lo(r,v.id)>=Do(r,v))continue;const M=Vc(r,v.id);if(M.length===0)continue;const x=ys(r,e);let T=null;for(const E of M){if(x.player.gold<Gc(r,e,E))continue;const S=v1(r,v,E,x,c)+Ai(r.rngState,d++,s.noiseRange*.5);(!T||S>T.score)&&(T={action:{type:"TRAIN_UNIT",cityId:v.id,unitType:E},score:S})}const b=(x.cityThreats[v.id]??0)>0?0:s.productionThreshold;T&&T.score>=b&&l(T.action)}g()}return r.phase==="playing"&&o.push({type:"END_TURN"}),o}let Wd=!1;typeof window<"u"&&typeof document<"u"&&window.EldermereAndroid&&document.documentElement.classList.add("android-webview");function T1(){if(!(Wd||typeof window>"u")){Wd=!0;try{window.EldermereAndroid?.onGameReady?.()}catch{}}}function vn(i){if(!(typeof window>"u"))try{window.EldermereAndroid?.haptic?.(i)}catch{}}const E1={plains:"Plains",forest:"Forest",ancient_woods:"Ancient Woods",mountain:"Mountain",wasteland:"Wasteland",water:"Water"};function A1(i){return new Promise(e=>window.setTimeout(e,i))}class R1{canvasContainer;badgesContainer;hudRoot;titleScreen;gameOverOverlay;topBar;actionBar;techModal;cityRewardModal;defeatNoticeModal;factionDossierModal;leaderboardModal;rewardToastEl;rewardToastTimer=null;sceneManager=null;board=null;badges=null;animQueue=null;input=null;state=null;humanPlayerId="";selectedCoord=null;selectedUnitId=null;selectionLayer="unit";validMoves=[];validAttacks=[];hoveredCoord=null;readyUnitCycleIndex=0;activeCanvasPointerId=null;activeCanvasPointerStart={x:0,y:0};canvasMultiTouch=!1;tileClickHandled=!1;onCanvasPointerDownBound;onWindowPointerUpBound;onWindowPointerCancelBound;onAndroidBackBound;onAndroidSetPausedBound;isBusy=!1;isAITurnRunning=!1;sessionToken=0;titleSettleTimer=null;isTitleDioramaActive=!1;titleShowcaseState=null;constructor(e,t,n){this.canvasContainer=e,this.badgesContainer=t,this.hudRoot=n,this.onCanvasPointerDownBound=s=>this.handleCanvasPointerDown(s),this.onWindowPointerUpBound=s=>this.handleWindowPointerUp(s),this.onWindowPointerCancelBound=()=>{this.activeCanvasPointerId=null,this.canvasMultiTouch=!1},this.onAndroidBackBound=()=>this.handleAndroidBack(),this.onAndroidSetPausedBound=s=>this.setPaused(s),this.titleScreen=new Ly(this.hudRoot,{onStartGame:s=>this.startGame(s),onSelectFaction:s=>{vn("tap"),this.applyFactionTheme(s),this.focusTitleOnFaction(s,!1)}}),this.gameOverOverlay=new Uy(this.hudRoot,{onPlayAgain:()=>this.returnToTitle()}),this.topBar=new Ny(this.hudRoot,{onOpenLeaderboard:()=>this.openLeaderboardModal()}),this.actionBar=new Hy(this.hudRoot,{onAction:s=>{this.handleHumanAction(s)},onDeselect:()=>this.clearSelection(),onSwitchLayer:s=>this.switchSelectionLayer(s),onOpenTech:()=>this.openTechModal(),onNextReadyUnit:()=>this.focusNextReadyUnit(),onEndTurn:()=>{this.handleEndTurn()}}),this.techModal=new Vy(this.hudRoot,{onResearch:s=>{this.handleHumanAction({type:"RESEARCH_TECH",techId:s})},onClose:()=>{this.resumeSceneAfterOpaqueSheet()}}),this.cityRewardModal=new $y(this.hudRoot,{onChoose:(s,r)=>{this.handleCityRewardChoice(s,r)}}),this.defeatNoticeModal=new Xy(this.hudRoot),this.factionDossierModal=new qy(this.hudRoot,{onBack:()=>{this.factionDossierModal.close(),this.openLeaderboardModal()},onClose:()=>{}}),this.leaderboardModal=new Yy(this.hudRoot,{onSelectFaction:s=>{this.leaderboardModal.close(),this.openFactionDossier(s)},onResign:()=>this.returnToTitle(),onClose:()=>{}}),this.rewardToastEl=document.createElement("div"),this.rewardToastEl.className="ruins-reward-toast hidden",this.rewardToastEl.setAttribute("role","status"),this.rewardToastEl.setAttribute("aria-live","polite"),this.hudRoot.appendChild(this.rewardToastEl),this.applyFactionTheme(this.titleScreen.getSelectedFaction()),this.mountTitleDiorama(),this.titleScreen.show(),window.__eldermereHandleBack=this.onAndroidBackBound,window.__eldermereSetPaused=this.onAndroidSetPausedBound,requestAnimationFrame(()=>{requestAnimationFrame(()=>{T1()})})}handleAndroidBack(){return this.defeatNoticeModal.isOpen()?(this.defeatNoticeModal.close(),vn("tap"),!0):this.factionDossierModal.isOpen()?(this.factionDossierModal.close(),this.openLeaderboardModal(),!0):this.leaderboardModal.isOpen()?(this.leaderboardModal.close(),vn("tap"),!0):this.techModal.isOpen()?(this.techModal.close(),vn("tap"),!0):this.cityRewardModal.isOpen()?(this.cityRewardModal.close(),vn("tap"),!0):this.selectedCoord!==null?(this.clearSelection(),vn("tap"),!0):!1}shouldKeepScenePausedForAndroid(){return window.EldermereAndroid?this.isTitleDioramaActive||this.techModal.isOpen():!1}setPaused(e){this.sceneManager&&(e?this.sceneManager.stop():this.shouldKeepScenePausedForAndroid()?this.sceneManager.renderOnce():this.sceneManager.start())}applyFactionTheme(e){this.hudRoot.setAttribute("data-faction",e),this.badgesContainer.setAttribute("data-faction",e)}attachEmptySkyListeners(){this.canvasContainer.addEventListener("pointerdown",this.onCanvasPointerDownBound),window.addEventListener("pointerup",this.onWindowPointerUpBound),window.addEventListener("pointercancel",this.onWindowPointerCancelBound)}detachEmptySkyListeners(){this.canvasContainer.removeEventListener("pointerdown",this.onCanvasPointerDownBound),window.removeEventListener("pointerup",this.onWindowPointerUpBound),window.removeEventListener("pointercancel",this.onWindowPointerCancelBound),this.activeCanvasPointerId=null,this.canvasMultiTouch=!1,this.tileClickHandled=!1}handleCanvasPointerDown(e){if(!(e.pointerType==="mouse"&&e.button!==0)){if(this.activeCanvasPointerId!==null&&this.activeCanvasPointerId!==e.pointerId){this.canvasMultiTouch=!0;return}this.activeCanvasPointerId=e.pointerId,this.activeCanvasPointerStart={x:e.clientX,y:e.clientY},this.canvasMultiTouch=!1,this.tileClickHandled=!1}}handleWindowPointerUp(e){if(this.activeCanvasPointerId===null||e.pointerId!==this.activeCanvasPointerId)return;const t=this.activeCanvasPointerStart,n=this.canvasMultiTouch,s=this.tileClickHandled;if(this.activeCanvasPointerId=null,this.canvasMultiTouch=!1,this.tileClickHandled=!1,s||n||this.isBusy||this.isAITurnRunning||!this.state||this.state.phase!=="playing"||this.techModal.isOpen()||this.cityRewardModal.isOpen()||this.defeatNoticeModal.isOpen()||this.factionDossierModal.isOpen()||this.leaderboardModal.isOpen())return;const r=Math.hypot(e.clientX-t.x,e.clientY-t.y),o=e.pointerType==="touch"?10:6;r<=o&&this.selectedCoord!==null&&this.clearSelection()}mountTitleDiorama(){this.disposeSession(),this.isTitleDioramaActive=!0;const e=this.sessionToken,t=(Date.now()^Math.floor(Math.random()*2147483647))>>>0,n=Gd({humanFaction:this.titleScreen.getSelectedFaction(),difficulty:"normal",mapSize:16,maxTurns:0,seed:t}),s=n.players.find(c=>c.isHuman)??n.players[0];s.revealedTiles.fill(!0);const r=!!window.EldermereAndroid,o=new ud(this.canvasContainer);o.setBoardBounds(n.mapSize),o.setIdleOrbit(!r);const a=new Xe(o.scene);a.syncState(n,s.id),this.sceneManager=o,this.board=a,this.titleShowcaseState=n,this.focusTitleOnFaction(this.titleScreen.getSelectedFaction(),!0),o.onUpdate((c,d)=>{a.update(c,d)}),o.start(),r&&(this.titleSettleTimer=window.setTimeout(()=>{this.titleSettleTimer=null,!(e!==this.sessionToken||!this.isTitleDioramaActive)&&(o.renderOnce(),o.stop())},850))}focusTitleOnFaction(e,t){if(!this.isTitleDioramaActive||!this.sceneManager||!this.titleShowcaseState)return;const n=this.titleShowcaseState,s=n.players.find(f=>f.faction===e)??n.players[0],o=dn(n,s.id)[0]??Object.values(n.cities)[0];if(!o)return;const a=window.innerWidth>=768,c=o.x+(a?-1.4:1.7),d=o.y+(a?.5:1.7),l=Mt(c,d,n.mapSize,0),u=!!window.EldermereAndroid;if(this.sceneManager.focusOnWorld(l,t||u),u&&!t){const f=this.sessionToken;window.setTimeout(()=>{f!==this.sessionToken||!this.isTitleDioramaActive||!this.sceneManager||this.sceneManager.renderOnce()},320)}}startGame(e){vn("select"),this.disposeSession(),this.sessionToken+=1;const t=(Date.now()^Math.floor(Math.random()*2147483647))>>>0,n=Gd({humanFaction:e.humanFaction,difficulty:e.difficulty,mapSize:e.mapSize,maxTurns:0,seed:t});this.state=n;const s=n.players.find(u=>u.isHuman)??n.players[0];this.humanPlayerId=s.id,this.readyUnitCycleIndex=0,this.applyFactionTheme(s.faction);const r=new ud(this.canvasContainer);r.setBoardBounds(n.mapSize),r.setIdleOrbit(!1);const o=new Xe(r.scene),a=new vy(this.badgesContainer);a.setOnCaptureClick(u=>{this.executeCaptureCity(u)}),a.setOnExploreRuinsClick(u=>{this.executeExploreRuins(u)});const c=new uy(o,a),d=new py(r,o,{onTileClick:u=>{this.tileClickHandled=!0,this.handleTileClick(u)},onTileHover:u=>this.handleTileHover(u),onEndTurnHotkey:()=>{this.handleEndTurn()},onDeselectHotkey:()=>{this.defeatNoticeModal.isOpen()?this.defeatNoticeModal.close():this.techModal.isOpen()?this.techModal.close():this.factionDossierModal.isOpen()?this.factionDossierModal.close():this.leaderboardModal.isOpen()?this.leaderboardModal.close():this.clearSelection()}});this.attachEmptySkyListeners(),this.sceneManager=r,this.board=o,this.badges=a,this.animQueue=c,this.input=d,o.syncState(n,this.humanPlayerId),a.syncState(n,this.humanPlayerId,null);const l=dn(n,this.humanPlayerId).find(u=>u.isCapital);l&&r.focusOnWorld(Mt(l.x,l.y,n.mapSize,0),!0),r.onUpdate((u,f)=>{d.update(u),o.update(u,f),c.update(u),a.update(r.camera,u)}),r.start(),this.titleScreen.hide(),this.gameOverOverlay.hide(),this.topBar.show(),this.actionBar.show(),this.refreshHUD()}returnToTitle(){this.topBar.hide(),this.actionBar.hide(),this.techModal.close(),this.cityRewardModal.close(),this.defeatNoticeModal.close(),this.factionDossierModal.close(),this.leaderboardModal.close(),this.hideRewardToast(),this.gameOverOverlay.hide(),this.applyFactionTheme(this.titleScreen.getSelectedFaction()),this.mountTitleDiorama(),this.titleScreen.show()}destroy(){window.__eldermereHandleBack===this.onAndroidBackBound&&delete window.__eldermereHandleBack,window.__eldermereSetPaused===this.onAndroidSetPausedBound&&delete window.__eldermereSetPaused,this.disposeSession(),this.hideRewardToast(),this.rewardToastEl.remove(),this.titleScreen.destroy(),this.gameOverOverlay.destroy(),this.topBar.destroy(),this.actionBar.destroy(),this.techModal.destroy(),this.cityRewardModal.destroy(),this.defeatNoticeModal.destroy(),this.factionDossierModal.destroy(),this.leaderboardModal.destroy()}disposeSession(){this.sessionToken+=1,this.isTitleDioramaActive=!1,this.titleSettleTimer!==null&&(window.clearTimeout(this.titleSettleTimer),this.titleSettleTimer=null),this.defeatNoticeModal.close(),this.isBusy=!1,this.isAITurnRunning=!1,this.selectedCoord=null,this.selectedUnitId=null,this.selectionLayer="unit",this.validMoves=[],this.validAttacks=[],this.hoveredCoord=null,this.readyUnitCycleIndex=0,this.detachEmptySkyListeners(),this.input?.dispose(),this.input=null,this.badges?.dispose(),this.badges=null,this.sceneManager?.dispose(),this.sceneManager=null,this.board=null,this.animQueue=null,this.state=null}isHumanTurn(){return!this.state||this.state.phase!=="playing"?!1:ws(this.state).id===this.humanPlayerId}getUnitAtCoord(e){if(!this.state)return null;const t=we(this.state,e.x,e.y);if(t?.unitId){const n=this.state.units[t.unitId];if(n)return n}return Object.values(this.state.units).find(n=>n.x===e.x&&n.y===e.y)??null}hasTileUnderlay(e,t){return this.state?e.isCityCenter&&e.cityId!==null?!0:fd(this.state,t.id,e.x,e.y).length>0:!1}getReadyHumanUnits(){return this.state?zc(this.state,this.humanPlayerId).filter(t=>br(this.state,t.id)).sort((t,n)=>+!!(n.canCapture||n.canExploreRuins)-+!!(t.canCapture||t.canExploreRuins)):[]}focusNextReadyUnit(){if(!this.state||!this.isHumanTurn()||this.isBusy||this.isAITurnRunning)return;const e=this.getReadyHumanUnits();if(e.length===0)return;const t=e[this.readyUnitCycleIndex%e.length];this.readyUnitCycleIndex=(this.readyUnitCycleIndex+1)%e.length,this.sceneManager?.focusOnWorld(Mt(t.x,t.y,this.state.mapSize,0),!1),this.selectCoord({x:t.x,y:t.y},"unit")}async executeCaptureCity(e){if(!this.state||this.isBusy||this.isAITurnRunning||!this.isHumanTurn())return;const t=this.state.units[e];!t||t.ownerId!==this.humanPlayerId||vi(this.state,e)&&(await this.handleHumanAction({type:"CAPTURE_CITY",unitId:e}),this.clearSelection())}async executeExploreRuins(e){if(!this.state||this.isBusy||this.isAITurnRunning||!this.isHumanTurn())return;const t=this.state.units[e];!t||t.ownerId!==this.humanPlayerId||yi(this.state,e)&&(await this.handleHumanAction({type:"EXPLORE_RUINS",unitId:e}),this.clearSelection())}async handleTileClick(e){if(!this.state||this.isBusy||this.isAITurnRunning||this.state.phase!=="playing"||this.techModal.isOpen()||this.cityRewardModal.isOpen()||this.defeatNoticeModal.isOpen()||this.factionDossierModal.isOpen()||this.leaderboardModal.isOpen())return;const t=we(this.state,e.x,e.y);if(!t)return;const n=qe(this.state,this.humanPlayerId);if(!n||!n.revealedTiles[rt(e.x,e.y,this.state.mapSize)]){this.clearSelection();return}const s=this.getUnitAtCoord(e);if(this.selectedCoord&&this.selectedCoord.x===e.x&&this.selectedCoord.y===e.y){if(s&&this.hasTileUnderlay(t,n)){const r=this.selectionLayer==="unit"?"tile":"unit";this.selectCoord(e,r)}return}if(this.selectionLayer==="unit"&&this.selectedUnitId&&this.isHumanTurn()){const r=this.state.units[this.selectedUnitId];if(r&&r.ownerId===this.humanPlayerId){if(this.validMoves.some(c=>c.x===e.x&&c.y===e.y)){await this.handleHumanAction({type:"MOVE_UNIT",unitId:r.id,to:e}),this.reselectUnitIfActive(r.id);return}if(this.validAttacks.some(c=>c.x===e.x&&c.y===e.y)&&s&&s.ownerId!==this.humanPlayerId){await this.handleHumanAction({type:"ATTACK_UNIT",attackerId:r.id,defenderId:s.id}),this.reselectUnitIfActive(r.id);return}}}this.selectCoord(e,s?"unit":"tile")}switchSelectionLayer(e){if(!this.state||!this.selectedCoord)return;const t=we(this.state,this.selectedCoord.x,this.selectedCoord.y),n=qe(this.state,this.humanPlayerId);if(!t||!n)return;const s=this.getUnitAtCoord(this.selectedCoord);e==="unit"&&!s||e==="tile"&&!this.hasTileUnderlay(t,n)&&s||this.selectCoord(this.selectedCoord,e)}handleTileHover(e){this.hoveredCoord=e,this.board?.setHoverTile(e),!(!this.state||this.isBusy||this.isAITurnRunning)&&this.refreshActionBar()}selectCoord(e,t){if(!this.state)return;const n=we(this.state,e.x,e.y),s=qe(this.state,this.humanPlayerId);if(!n||!s){this.clearSelection();return}const r=this.getUnitAtCoord(e),o=this.hasTileUnderlay(n,s);let a;t==="unit"&&r?a="unit":t==="tile"&&(o||!r)?a="tile":a=r?"unit":"tile",this.selectedCoord={x:e.x,y:e.y},this.selectionLayer=a,this.selectedUnitId=a==="unit"&&r?r.id:null,this.validMoves=[],this.validAttacks=[];const c=[],d=[];if(a==="unit"&&r&&this.isHumanTurn()&&r.ownerId===this.humanPlayerId){this.validMoves=xr(this.state,r.id),this.validAttacks=Ps(this.state,r.id);for(const u of this.validAttacks){const f=this.getUnitAtCoord(u);let h=!1;f&&(h=To(this.state,r.id,f.id).defenderKilled),c.push({x:u.x,y:u.y,lethal:h}),h&&d.push({x:u.x,y:u.y})}}this.board?.setSelectedTile(this.selectedCoord),this.board?.setMoveTargets(this.validMoves),this.board?.setAttackTargets(c);const l=a==="tile"?this.selectedCoord:null;this.badges?.setSelectedCoord(l),this.badges?.setLethalTargets(d),vn("select"),this.refreshActionBar()}reselectUnitIfActive(e){if(!this.state||this.state.phase!=="playing"){this.clearSelection();return}const t=this.state.units[e];if(!t||t.ownerId!==this.humanPlayerId){this.clearSelection();return}br(this.state,t.id)?this.selectCoord({x:t.x,y:t.y},"unit"):this.clearSelection()}clearSelection(){this.selectedCoord=null,this.selectedUnitId=null,this.selectionLayer="unit",this.validMoves=[],this.validAttacks=[],this.board?.clearHighlights(),this.badges?.setSelectedCoord(null),this.badges?.setLethalTargets([]),this.refreshActionBar()}async handleHumanAction(e){if(!this.state||this.isBusy||this.isAITurnRunning||!this.isHumanTurn())return;const t=this.sessionToken;this.isBusy=!0,this.input?.setInputLocked(!0);try{const{state:n,events:s}=vo(this.state,e);this.state=n;let r="tap";for(const a of s){if(a.type==="GAME_OVER"&&a.winnerId===this.humanPlayerId){r="victory";break}a.type==="CITY_CAPTURED"||a.type==="CITY_LEVELED"||a.type==="RUINS_CLAIMED"?r="capture":a.type==="UNIT_ATTACKED"&&r==="tap"&&(r="combat")}vn(r);for(const a of s)a.type==="RUINS_CLAIMED"&&a.playerId===this.humanPlayerId&&this.showRuinsRewardToast(a,n);if(this.animQueue&&await this.animQueue.playEvents(s,n,this.humanPlayerId,1),t!==this.sessionToken)return;const o=this.selectedCoord&&this.selectionLayer==="tile"?this.selectedCoord:null;if(this.board?.syncState(n,this.humanPlayerId),this.badges?.syncState(n,this.humanPlayerId,o),e.type==="CAPTURE_CITY"||e.type==="EXPLORE_RUINS"?this.clearSelection():this.selectedCoord?this.selectCoord(this.selectedCoord,this.selectionLayer):(this.board?.clearHighlights(),this.badges?.setLethalTargets([])),this.refreshHUD(),await this.showEliminationNotices(s,n,t),t!==this.sessionToken)return;this.checkPostActionState()}finally{t===this.sessionToken&&(this.isBusy=!1,!this.isAITurnRunning&&this.state?.phase==="playing"&&this.input?.setInputLocked(!1))}}async handleCityRewardChoice(e,t){await this.handleHumanAction({type:"CHOOSE_CITY_REWARD",cityId:e,reward:t})}async handleEndTurn(){if(!this.state||this.isBusy||this.isAITurnRunning||!this.isHumanTurn()||this.openNextPendingCityReward())return;vn("tap");const e=this.sessionToken;this.techModal.close(),this.factionDossierModal.close(),this.leaderboardModal.close(),this.clearSelection(),this.isAITurnRunning=!0,this.input?.setInputLocked(!0);try{const t=vo(this.state,{type:"END_TURN"});if(this.state=t.state,this.animQueue&&t.events.length>0&&await this.animQueue.playEvents(t.events,this.state,this.humanPlayerId,1.2),e!==this.sessionToken||(this.board?.syncState(this.state,this.humanPlayerId),this.badges?.syncState(this.state,this.humanPlayerId,null),this.refreshActionBar(),this.refreshTopBar(),await this.showEliminationNotices(t.events,this.state,e),e!==this.sessionToken||!this.state))return;let n=0,s=!1;for(;this.state&&this.state.phase==="playing"&&!ws(this.state).isHuman&&n<12;){n+=1;const r=ws(this.state);if(this.refreshTopBar(),await A1(110),e!==this.sessionToken||!this.state)return;const o=b1(this.state,r.id,this.state.config.difficulty),a=o.length>0&&o[o.length-1].type==="END_TURN"?o:[...o,{type:"END_TURN"}];for(const c of a){if(e!==this.sessionToken||!this.state)return;if(this.state.phase!=="playing"||ws(this.state).id!==r.id)break;const d=this.state,{state:l,events:u}=vo(d,c);if(this.state=l,this.hasVisibleEventsForHuman(u,l)){if(s&&(this.board?.syncState(d,this.humanPlayerId),this.badges?.syncState(d,this.humanPlayerId,null),s=!1),this.focusOnVisibleAction(u,l),this.animQueue&&u.length>0&&await this.animQueue.playEvents(u,l,this.humanPlayerId,1.5),e!==this.sessionToken||(this.board?.syncState(l,this.humanPlayerId),this.badges?.syncState(l,this.humanPlayerId,null),this.refreshTopBar(),await this.showEliminationNotices(u,l,e),e!==this.sessionToken))return}else s=!0}}if(e!==this.sessionToken||!this.state)return;this.readyUnitCycleIndex=0,this.board?.syncState(this.state,this.humanPlayerId),this.badges?.syncState(this.state,this.humanPlayerId,null),this.refreshHUD(),this.checkPostActionState()}finally{e===this.sessionToken&&(this.isAITurnRunning=!1,this.state?.phase==="playing"&&this.input?.setInputLocked(!1),this.refreshHUD())}}hasVisibleEventsForHuman(e,t){const n=qe(t,this.humanPlayerId);if(!n)return!0;const s=r=>!!n.revealedTiles[rt(r.x,r.y,t.mapSize)];for(const r of e)switch(r.type){case"PLAYER_ELIMINATED":case"GAME_OVER":case"CITY_CAPTURED":return!0;case"TILES_REVEALED":if(r.playerId===this.humanPlayerId&&r.coords.length>0)return!0;break;case"UNIT_MOVED":case"UNIT_ATTACKED":if(s(r.from)||s(r.to))return!0;break;case"UNIT_HEALED":case"UNIT_PROMOTED":case"UNIT_TRAINED":case"RESOURCE_HARVESTED":case"IMPROVEMENT_BUILT":case"ROAD_BUILT":case"FOREST_CHOPPED":case"WOODS_PLANTED":case"RUINS_CLAIMED":case"CITY_LEVELED":case"CITY_REWARD_APPLIED":case"SPOILS_GAINED":if(s(r.coord))return!0;break}return!1}async showEliminationNotices(e,t,n){const s=e.filter(r=>r.type==="PLAYER_ELIMINATED");if(s.length!==0)for(const r of s){if(n!==this.sessionToken)return;const o=qe(t,r.playerId),a=qe(t,r.eliminatedByPlayerId);o&&a&&await this.defeatNoticeModal.show(o.faction,a.faction)}}focusOnVisibleAction(e,t){if(!this.sceneManager)return;const n=qe(t,this.humanPlayerId);if(n){for(const s of e)if(s.type==="UNIT_ATTACKED"){const r=n.revealedTiles[rt(s.to.x,s.to.y,t.mapSize)],o=n.revealedTiles[rt(s.from.x,s.from.y,t.mapSize)];if(r||o){this.sceneManager.focusOnWorld(Mt(s.to.x,s.to.y,t.mapSize,0),!1);return}}else if(s.type==="CITY_CAPTURED"&&n.revealedTiles[rt(s.coord.x,s.coord.y,t.mapSize)]){this.sceneManager.focusOnWorld(Mt(s.coord.x,s.coord.y,t.mapSize,0),!1);return}}}checkPostActionState(){if(this.state){if(this.state.phase==="game_over"){this.techModal.close(),this.cityRewardModal.close(),this.factionDossierModal.close(),this.leaderboardModal.close(),this.hideRewardToast(),this.actionBar.hide(),this.clearSelection(),this.input?.setInputLocked(!0),this.gameOverOverlay.show({state:this.state,humanPlayerId:this.humanPlayerId});return}this.isHumanTurn()&&this.openNextPendingCityReward()}}openNextPendingCityReward(){if(!this.state||this.cityRewardModal.isOpen())return!1;const e=qe(this.state,this.humanPlayerId);if(!e)return!1;const t=dn(this.state,this.humanPlayerId).find(n=>n.pendingLevelRewards.length>0);return t?(this.cityRewardModal.open({city:t,levelReached:t.pendingLevelRewards[0],faction:e.faction}),!0):!1}openTechModal(){if(!this.state)return;vn("tap"),this.factionDossierModal.close(),this.leaderboardModal.close();const e=this.buildTechModalViewModel();e&&(this.techModal.open(e),this.pauseSceneBehindOpaqueSheet())}pauseSceneBehindOpaqueSheet(){window.EldermereAndroid&&this.sceneManager?.stop()}resumeSceneAfterOpaqueSheet(){window.EldermereAndroid&&this.sceneManager?.start()}openFactionDossier(e){if(!this.state)return;vn("tap"),this.techModal.close(),this.leaderboardModal.close();const t=this.buildFactionDossierViewModel();t&&this.factionDossierModal.open(t,e)}openLeaderboardModal(){if(!this.state)return;vn("tap"),this.techModal.close(),this.factionDossierModal.close();const e=this.buildLeaderboardViewModel();e&&this.leaderboardModal.open(e)}buildLeaderboardViewModel(){return this.state?{entries:P_(this.state),turn:this.state.turn,maxTurns:this.state.config.maxTurns}:null}showRuinsRewardToast(e,t){let n="";if(e.rewardKind==="gold")n=`<strong class="toast-reward-highlight">+${e.amount??5}${se("star","icon icon-sm icon-star")}</strong><span>Treasury Found</span>`;else if(e.rewardKind==="tech")n=`<strong class="toast-reward-highlight">${(e.techId?en[e.techId]?.name??e.techId:"Ancient Lore").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</strong><span>Lore Unlocked</span>`;else{const s=e.amount??3,r=e.cityId?t.cities[e.cityId]?.name:void 0,o=r?r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):"Nearest City";n=`<strong class="toast-reward-highlight">+${s} Pop</strong><span>to ${o}</span>`}this.rewardToastEl.innerHTML=`
      <span class="toast-ruins-icon">${se("ruins","icon")}</span>
      <span class="toast-ruins-body">
        <span class="toast-ruins-kicker">Ancient Ruins Explored</span>
        <span class="toast-ruins-line">${n}</span>
      </span>
    `,this.rewardToastEl.classList.remove("hidden","toast-show"),this.rewardToastEl.offsetWidth,this.rewardToastEl.classList.add("toast-show"),this.rewardToastTimer!==null&&window.clearTimeout(this.rewardToastTimer),this.rewardToastTimer=window.setTimeout(()=>{this.hideRewardToast()},3e3)}hideRewardToast(){this.rewardToastTimer!==null&&(window.clearTimeout(this.rewardToastTimer),this.rewardToastTimer=null),this.rewardToastEl.classList.remove("toast-show"),this.rewardToastEl.classList.add("hidden")}buildFactionDossierViewModel(){if(!this.state)return null;const e=qe(this.state,this.humanPlayerId);return e?{humanPlayer:e,allPlayers:this.state.players}:null}buildTechModalViewModel(){if(!this.state)return null;const e=qe(this.state,this.humanPlayerId);if(!e)return null;const t=mi(e.faction),n={};for(const s of t)n[s.id]=Uo(this.state,e.id,s.id);return{player:e,cityCount:dn(this.state,e.id).length,isHumanTurn:this.isHumanTurn(),techCosts:n}}refreshHUD(){if(this.refreshTopBar(),this.refreshActionBar(),this.techModal.isOpen()){const e=this.buildTechModalViewModel();e&&this.techModal.update(e)}if(this.factionDossierModal.isOpen()){const e=this.buildFactionDossierViewModel();e&&this.factionDossierModal.update(e)}if(this.leaderboardModal.isOpen()){const e=this.buildLeaderboardViewModel();e&&this.leaderboardModal.update(e)}}refreshTopBar(){if(!this.state)return;const e=qe(this.state,this.humanPlayerId);if(!e)return;const t=ws(this.state),n=t.id===e.id&&this.state.phase==="playing";this.topBar.update({player:e,activePlayer:t,turn:this.state.turn,maxTurns:this.state.config.maxTurns,isHumanTurn:n})}refreshActionBar(){if(!this.state||this.state.phase!=="playing"){this.actionBar.hide();return}const e=qe(this.state,this.humanPlayerId);if(!e)return;const t=this.isHumanTurn(),s=mi(e.faction).filter(_=>Wc(this.state,e.id,_.id)).length,r=this.getReadyHumanUnits().length,o=this.buildCombatPreview();if(!this.selectedCoord){this.actionBar.update({isHumanTurn:t,playerFaction:e.faction,playerGold:e.gold,hasAffordableTech:s>0,affordableTechCount:s,remainingUnitsCount:r,allUnitsActed:r===0,selectionLayer:"unit",canToggleLayer:!1,altLayerLabel:"Tile",selectedUnit:null,selectedCity:null,selectedTile:null,combatPreview:o});return}const a=we(this.state,this.selectedCoord.x,this.selectedCoord.y);if(!a)return;const c=this.getUnitAtCoord(this.selectedCoord),d=c?this.buildSelectedUnitInfo(c.id):null,l=a.isCityCenter&&a.cityId?this.buildSelectedCityInfo(a.cityId):null,u=this.buildSelectedTileInfo(a,e),f=!!(c&&this.hasTileUnderlay(a,e)),h=l?"City":"Tile",g={isHumanTurn:t,playerFaction:e.faction,playerGold:e.gold,hasAffordableTech:s>0,affordableTechCount:s,remainingUnitsCount:r,allUnitsActed:r===0,selectionLayer:this.selectionLayer,canToggleLayer:f,altLayerLabel:h,selectedUnit:d,selectedCity:l,selectedTile:u,combatPreview:o};this.actionBar.update(g)}buildCombatPreview(){if(!this.state||this.selectionLayer!=="unit"||!this.selectedUnitId||!this.hoveredCoord||!this.isHumanTurn()||!this.validAttacks.some(d=>d.x===this.hoveredCoord.x&&d.y===this.hoveredCoord.y))return null;const t=we(this.state,this.hoveredCoord.x,this.hoveredCoord.y);if(!t?.unitId)return null;const n=this.state.units[this.selectedUnitId],s=this.state.units[t.unitId];if(!n||!s||s.ownerId===n.ownerId)return null;const r=qe(this.state,n.ownerId),o=qe(this.state,s.ownerId);if(!r||!o)return null;const a=To(this.state,n.id,s.id),c=!!(t.isCityCenter||t.hasVillage);return{preview:a,attacker:n,attackerOwner:r,defender:s,defenderOwner:o,targetIsCityOrVillage:c}}buildSelectedUnitInfo(e){if(!this.state)return null;const t=this.state.units[e];if(!t)return null;const n=qe(this.state,t.ownerId);if(!n)return null;const s=we(this.state,t.x,t.y),r=Ut[t.type],o=n.faction==="humans"&&s?.hasRoad?1:0,a=n.techs.includes("humans_ride_of_rohirrim")&&(t.type==="rider"||t.type==="rohirrim_knight")?1:0,c=t.ownerId===this.humanPlayerId;return{unit:t,owner:n,isOwnedByHuman:c,effectiveAttack:Wu(this.state,t),effectiveDefense:$u(this.state,t),effectiveMovement:r.movement+o+a,actions:c?F_(this.state,t.id):[]}}buildSelectedCityInfo(e){if(!this.state)return null;const t=this.state.cities[e];if(!t)return null;const n=qe(this.state,t.ownerId);if(!n)return null;const s=t.ownerId===this.humanPlayerId,r=Lo(this.state,t.id),o=Do(this.state,t),c=!!we(this.state,t.x,t.y)?.unitId,d=t.level+(t.isCapital?1:0)+(t.hasWorkshop?1:0)+t.parks+(t.connectedToCapital&&!t.isCapital&&n.faction==="humans"?1:0)+(t.level>=3&&n.techs.includes("humans_granaries")?1:0)+(t.hasWalls&&n.techs.includes("humans_citadel_masonry")?1:0)+(n.techs.includes("humans_stewards_citadel")?1:0)+(n.techs.includes("dwarves_deep_vaults")?1:0);return{city:t,owner:n,isOwnedByHuman:s,unitCount:r,unitCap:o,income:d,popNeeded:t.level+1,occupiedByUnit:c,trainOptions:s?O_(this.state,t.id):[]}}buildSelectedTileInfo(e,t){const n=this.state,s=!!t.revealedTiles[rt(e.x,e.y,n.mapSize)];let r=1;e.terrain==="mountain"?r=t.faction==="dwarves"?1.75:1.5:(e.terrain==="forest"||e.terrain==="ancient_woods")&&(r=1.5),e.isCityCenter&&e.cityId&&n.cities[e.cityId]?.hasWalls&&(r=2);const o=fd(n,t.id,e.x,e.y);return{tile:e,terrainName:E1[e.terrain],defenseBonus:r,isRevealed:s,actions:o}}}function $d(){const i=document.getElementById("canvas-container"),e=document.getElementById("world-badges"),t=document.getElementById("hud-root");if(!i||!e||!t)throw new Error("Missing required root DOM containers (#canvas-container, #world-badges, #hud-root)");new R1(i,e,t)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",$d):$d();
//# sourceMappingURL=index-f07lWFU1.js.map
