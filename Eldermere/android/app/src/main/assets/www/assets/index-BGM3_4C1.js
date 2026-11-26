(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const nt={humans:{id:"humans",name:"Humans",realm:"Valoria & Sunmark",tagline:"Kingdom Builders & Cavalry",startingTech:"humans_gathering",startingUnit:"warrior",startingGold:5,uniqueUnit:"rohirrim_knight",uniqueMechanicName:"Beacon Network",uniqueMechanicDescription:"Cities connected by Roads (or within 4 tiles of Capital) gain +1★/turn; units starting on a Road get +1 MOV.",palette:{primary:"#2563eb",secondary:"#ece8df",accent:"#eab308",biomeGround:"#7ec850"},cityNames:["Solhaven","Suncrest","Bridgewatch","Whitecliff","Tidehaven","Goldmeadow","Riverfort","Highvale"]},orcs:{id:"orcs",name:"Orcs",realm:"Ashfell & Ironspire",tagline:"Aggressive War-Economy Swarm",startingTech:"orcs_pillage",startingUnit:"warrior",startingGold:7,uniqueUnit:"uruk_berserker",uniqueMechanicName:"Spoils of War",uniqueMechanicDescription:"Killing an enemy unit grants +2★ immediately; capturing a Village or City grants +4★.",palette:{primary:"#dc2626",secondary:"#2e2a33",accent:"#f97316",biomeGround:"#57534e"},cityNames:["Dreadspire","Ironhold","Grimwatch","Fangpass","Ashen Gate","Blightkeep","Skullcrag","Cinderfort"]},elves:{id:"elves",name:"Elves",realm:"Sylvanvale & Starhaven",tagline:"Mobile Forest Guardians",startingTech:"elves_woodland_lore",startingUnit:"archer",startingGold:5,uniqueUnit:"elven_sentinel",uniqueMechanicName:"Woodland Grace",uniqueMechanicDescription:"Units move through Forest/Ancient Woods with no penalty, and untouched Ancient Woods in borders grant +1★/turn (up to +3★/city).",palette:{primary:"#10b981",secondary:"#f5f0e1",accent:"#facc15",biomeGround:"#65c18c"},cityNames:["Silverglade","Starhaven","Mistport","Thornhall","Goldhill","Moonbay","Sylvanvale","Dawnwood"]},dwarves:{id:"dwarves",name:"Dwarves",realm:"Deepforge & Stonehelm",tagline:"Mountain Fortress Economy",startingTech:"dwarves_delving",startingUnit:"warrior",startingGold:5,uniqueUnit:"ironbreaker",uniqueMechanicName:"Deep Mines",uniqueMechanicDescription:"Can traverse Mountains from Turn 1 with 1.75x DEF on Mountains; every Mine on a Mountain grants +1★/turn and +2 Pop.",palette:{primary:"#d97706",secondary:"#64748b",accent:"#fb923c",biomeGround:"#6b8e58"},cityNames:["Deepforge","Stonehelm","Anvil Peaks","Hammerhall","Copperdelve","Frostcrag","Crystal Delve","Runehaven"]}},Kt=["humans","orcs","elves","dwarves"],Bt={warrior:{type:"warrior",name:"Warrior",faction:null,cost:2,maxHp:10,attack:2,defense:2,movement:1,range:1,traits:["dash","fortify"],description:"Reliable frontline scout and village capturer."},defender:{type:"defender",name:"Defender",faction:null,cost:3,maxHp:15,attack:1,defense:3,movement:1,range:1,traits:["fortify"],description:"Heavy shield wall built to hold cities and chokepoints."},archer:{type:"archer",name:"Archer",faction:null,cost:3,maxHp:10,attack:2,defense:1,movement:1,range:2,traits:["dash"],description:"Fragile range-2 fire support that softens targets safely."},rider:{type:"rider",name:"Rider",faction:null,cost:3,maxHp:10,attack:2,defense:1,movement:2,range:1,traits:["dash","escape"],description:"Swift flanker and explorer that can retreat after attacking."},catapult:{type:"catapult",name:"Catapult",faction:null,cost:7,maxHp:10,attack:4,defense:0,movement:1,range:3,traits:["siege"],description:"Long-range city breaker that ignores City Walls (cannot move and fire)."},rohirrim_knight:{type:"rohirrim_knight",name:"Sunmark Knight",faction:"humans",cost:6,maxHp:15,attack:3.5,defense:1.5,movement:3,range:1,traits:["dash","persist"],description:"Noble horsemen of Sunmark. Persist: killing an enemy grants an immediate extra attack."},uruk_berserker:{type:"uruk_berserker",name:"Ironblood Berserker",faction:"orcs",cost:5,maxHp:15,attack:3.5,defense:2,movement:1,range:1,traits:["dash","bloodlust"],description:"Frenzied shock trooper. Bloodlust: always strikes at full 3.5 ATK regardless of HP."},elven_sentinel:{type:"elven_sentinel",name:"Elven Sentinel",faction:"elves",cost:5,maxHp:12,attack:3,defense:2,movement:2,range:2,traits:["dash","escape","skirmish"],description:"Deadly woodland marksman. Skirmish: strikes from range 2 and fades back into cover."},ironbreaker:{type:"ironbreaker",name:"Ironbreaker",faction:"dwarves",cost:5,maxHp:20,attack:3,defense:3.5,movement:1,range:1,traits:["dash","fortify","stalwart"],description:"Starsteel-clad juggernaut. Stalwart: immune to Persist chains and takes -1 ranged damage."},dragon:{type:"dragon",name:"Fire Drake",faction:"dwarves",cost:0,maxHp:20,attack:4.5,defense:3,movement:3,range:2,traits:["dash","flying"],description:"Ancient winged Fire Drake awakened from the peaks. Flies freely over water and mountains."},watchtower:{type:"watchtower",name:"Watchtower",faction:"humans",cost:0,maxHp:25,attack:3.5,defense:4.5,movement:0,range:2,traits:["fortify"],description:"Fortified stone tower. Cannot move, but fires volleys at enemies within range 2."}},qh=["warrior","defender","archer","rider","catapult"],Yh=["warrior","defender","archer","rider","catapult","rohirrim_knight","uruk_berserker","elven_sentinel","ironbreaker"],zi={farm:{type:"farm",name:"Farm",cost:4,basePop:2,allowedTerrains:["plains"],goldPerTurn:0,description:"+2 Pop on Plains."},windmill:{type:"windmill",name:"Windmill",cost:5,basePop:0,allowedTerrains:["plains"],goldPerTurn:0,adjacentBonusTo:"farm",adjacentPopPerMatch:1,description:"+1 Pop & +1★/turn per adjacent Farm."},slag_pit:{type:"slag_pit",name:"Slag Pit",cost:3,basePop:1,allowedTerrains:["wasteland"],goldPerTurn:0,description:"+1 Pop on Wasteland."},foundry:{type:"foundry",name:"Foundry",cost:5,basePop:2,allowedTerrains:["wasteland"],goldPerTurn:0,description:"+2 Pop on Wasteland."},sanctuary:{type:"sanctuary",name:"Sanctuary",cost:4,basePop:2,allowedTerrains:["forest","ancient_woods"],goldPerTurn:0,description:"+2 Pop in Forest or Ancient Woods without chopping."},mine:{type:"mine",name:"Mine",cost:4,basePop:2,allowedTerrains:["mountain"],goldPerTurn:1,description:"+2 Pop and +1★/turn on Mountain."},great_forge:{type:"great_forge",name:"Great Forge",cost:5,basePop:0,allowedTerrains:["plains","mountain"],goldPerTurn:0,adjacentBonusTo:"mine",adjacentPopPerMatch:2,description:"+2 Pop per adjacent Mine."}},Ct={humans_gathering:{id:"humans_gathering",faction:"humans",pillar:"Stewardship",pillarIndex:0,tier:1,slot:"root",prerequisites:[],name:"Gathering",summary:"Harvest Berries (2★, +1 Pop).",iconKey:"berries",unlocksUnits:[],unlocksResources:["berries"],unlocksImprovements:[]},humans_farming:{id:"humans_farming",faction:"humans",pillar:"Stewardship",pillarIndex:0,tier:2,slot:"a",prerequisites:["humans_gathering"],name:"Farming",summary:"Build Farms on Plains (4★, +2 Pop).",iconKey:"farm",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["farm"]},humans_granaries:{id:"humans_granaries",faction:"humans",pillar:"Stewardship",pillarIndex:0,tier:2,slot:"b",prerequisites:["humans_gathering"],name:"Royal Granaries",summary:"Cities at Lv 3+ gain +1★/turn & +1 Unit Cap.",iconKey:"city",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_milling:{id:"humans_milling",faction:"humans",pillar:"Stewardship",pillarIndex:0,tier:3,slot:"capstone",prerequisites:["humans_farming"],name:"Windmills",summary:"Build Windmills on Plains (5★, +1 Pop & +1★/turn per adjacent Farm).",iconKey:"windmill",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["windmill"]},humans_roads:{id:"humans_roads",faction:"humans",pillar:"Roadcraft & Citadels",pillarIndex:1,tier:1,slot:"root",prerequisites:[],name:"Roadcraft",summary:"Build Roads (2★; +1 MOV & Beacon Network +1★/turn).",iconKey:"road",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksRoad:!0},humans_shield_wall:{id:"humans_shield_wall",faction:"humans",pillar:"Roadcraft & Citadels",pillarIndex:1,tier:2,slot:"a",prerequisites:["humans_roads"],name:"Royal Shield Wall",summary:"Unlocks Defender unit.",iconKey:"defender",unlocksUnits:["defender"],unlocksResources:[],unlocksImprovements:[]},humans_citadel_masonry:{id:"humans_citadel_masonry",faction:"humans",pillar:"Roadcraft & Citadels",pillarIndex:1,tier:2,slot:"b",prerequisites:["humans_roads"],name:"Citadel Masonry",summary:"Walled cities heal garrison +2 HP/turn & grant +1★/turn.",iconKey:"city_wall",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_stewards_citadel:{id:"humans_stewards_citadel",faction:"humans",pillar:"Roadcraft & Citadels",pillarIndex:1,tier:3,slot:"capstone",prerequisites:["humans_citadel_masonry"],name:"High Citadel",summary:"All cities gain +1★/turn & +1 Unit Cap.",iconKey:"city_wall",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_riding:{id:"humans_riding",faction:"humans",pillar:"Horsemanship",pillarIndex:2,tier:1,slot:"root",prerequisites:[],name:"Riding",summary:"Unlocks Rider cavalry unit.",iconKey:"rider",unlocksUnits:["rider"],unlocksResources:[],unlocksImprovements:[]},humans_plains_charge:{id:"humans_plains_charge",faction:"humans",pillar:"Horsemanship",pillarIndex:2,tier:2,slot:"a",prerequisites:["humans_riding"],name:"Plains Charge",summary:"Riders & Sunmark Knights gain +0.5 ATK on Plains.",iconKey:"rider",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_chivalry:{id:"humans_chivalry",faction:"humans",pillar:"Horsemanship",pillarIndex:2,tier:2,slot:"b",prerequisites:["humans_riding"],name:"Chivalry",summary:"Unlocks Sunmark Knight (Persist champion).",iconKey:"rohirrim_knight",unlocksUnits:["rohirrim_knight"],unlocksResources:[],unlocksImprovements:[]},humans_ride_of_rohirrim:{id:"humans_ride_of_rohirrim",faction:"humans",pillar:"Horsemanship",pillarIndex:2,tier:3,slot:"capstone",prerequisites:["humans_chivalry"],name:"Charge of the Sunmark",summary:"Riders & Sunmark Knights gain +1 MOV & +3 maxHP.",iconKey:"rohirrim_knight",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_hunting:{id:"humans_hunting",faction:"humans",pillar:"Rangers & Siege",pillarIndex:3,tier:1,slot:"root",prerequisites:[],name:"Ranger Hunting",summary:"Harvest Game (2★, +1 Pop) & +2★ bonus on Ancient Ruins.",iconKey:"game",unlocksUnits:[],unlocksResources:["game"],unlocksImprovements:[]},humans_archery:{id:"humans_archery",faction:"humans",pillar:"Rangers & Siege",pillarIndex:3,tier:2,slot:"a",prerequisites:["humans_hunting"],name:"Archery",summary:"Unlocks Archer ranged unit.",iconKey:"archer",unlocksUnits:["archer"],unlocksResources:[],unlocksImprovements:[]},humans_mountaineering:{id:"humans_mountaineering",faction:"humans",pillar:"Rangers & Siege",pillarIndex:3,tier:2,slot:"b",prerequisites:["humans_hunting"],name:"Mountaineering",summary:"Units can traverse Mountains (1.5× DEF, +1 vision).",iconKey:"mountain",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksMountainPass:!0},humans_siegecraft:{id:"humans_siegecraft",faction:"humans",pillar:"Rangers & Siege",pillarIndex:3,tier:3,slot:"capstone",prerequisites:["humans_archery"],name:"Royal Siegecraft",summary:"Unlocks Catapult siege unit (+0.5 ATK with royal engineering).",iconKey:"catapult",unlocksUnits:["catapult"],unlocksResources:[],unlocksImprovements:[]},orcs_pillage:{id:"orcs_pillage",faction:"orcs",pillar:"Raiding",pillarIndex:0,tier:1,slot:"root",prerequisites:[],name:"Pillage & Foraging",summary:"Harvest Berries & Game (2★, +1 Pop).",iconKey:"berries",unlocksUnits:[],unlocksResources:["berries","game"],unlocksImprovements:[]},orcs_warg_riders:{id:"orcs_warg_riders",faction:"orcs",pillar:"Raiding",pillarIndex:0,tier:2,slot:"a",prerequisites:["orcs_pillage"],name:"Direwolf Riders",summary:"Unlocks Rider (Direwolf Rider) cavalry unit.",iconKey:"rider",unlocksUnits:["rider"],unlocksResources:[],unlocksImprovements:[]},orcs_spoils_mastery:{id:"orcs_spoils_mastery",faction:"orcs",pillar:"Raiding",pillarIndex:0,tier:2,slot:"b",prerequisites:["orcs_pillage"],name:"Spoils Mastery",summary:"Spoils of War grants +1★ extra (+3★/kill, +5★/capture).",iconKey:"ruins",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_pack_tactics:{id:"orcs_pack_tactics",faction:"orcs",pillar:"Raiding",pillarIndex:0,tier:3,slot:"capstone",prerequisites:["orcs_warg_riders"],name:"Pack Tactics",summary:"Direwolf Riders gain +0.5 ATK & +3 maxHP.",iconKey:"rider",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_clear_cutting:{id:"orcs_clear_cutting",faction:"orcs",pillar:"Dark Industry",pillarIndex:1,tier:1,slot:"root",prerequisites:[],name:"Clear-Cutting",summary:"Chop Forest (0★ → +2★) & build Slag Pit on Wasteland (3★, +1 Pop).",iconKey:"slag_pit",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["slag_pit"],unlocksChopForest:!0},orcs_dark_forges:{id:"orcs_dark_forges",faction:"orcs",pillar:"Dark Industry",pillarIndex:1,tier:2,slot:"a",prerequisites:["orcs_clear_cutting"],name:"Dark Forges",summary:"Build Foundry on Wasteland (5★, +2 Pop).",iconKey:"foundry",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["foundry"]},orcs_siege_works:{id:"orcs_siege_works",faction:"orcs",pillar:"Dark Industry",pillarIndex:1,tier:2,slot:"b",prerequisites:["orcs_clear_cutting"],name:"Siege Works",summary:"Unlocks Catapult siege unit (discounted to 6★).",iconKey:"catapult",unlocksUnits:["catapult"],unlocksResources:[],unlocksImprovements:[]},orcs_mount_doom:{id:"orcs_mount_doom",faction:"orcs",pillar:"Dark Industry",pillarIndex:1,tier:3,slot:"capstone",prerequisites:["orcs_dark_forges"],name:"Volcanic Furnaces",summary:"Foundries generate +1★/turn & Catapults gain +1 ATK.",iconKey:"foundry",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_shield_wall:{id:"orcs_shield_wall",faction:"orcs",pillar:"Iron Discipline",pillarIndex:2,tier:1,slot:"root",prerequisites:[],name:"Shield Wall",summary:"Unlocks Defender unit.",iconKey:"defender",unlocksUnits:["defender"],unlocksResources:[],unlocksImprovements:[]},orcs_uruk_breeding:{id:"orcs_uruk_breeding",faction:"orcs",pillar:"Iron Discipline",pillarIndex:2,tier:2,slot:"a",prerequisites:["orcs_shield_wall"],name:"War-Pit Breeding",summary:"Unlocks Ironblood Berserker (Bloodlust champion).",iconKey:"uruk_berserker",unlocksUnits:["uruk_berserker"],unlocksResources:[],unlocksImprovements:[]},orcs_war_barracks:{id:"orcs_war_barracks",faction:"orcs",pillar:"Iron Discipline",pillarIndex:2,tier:2,slot:"b",prerequisites:["orcs_shield_wall"],name:"War Barracks",summary:"All cities gain +1 Unit Cap.",iconKey:"city",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_black_gate:{id:"orcs_black_gate",faction:"orcs",pillar:"Iron Discipline",pillarIndex:2,tier:3,slot:"capstone",prerequisites:["orcs_uruk_breeding"],name:"Ashen Gate Horde",summary:"Ironblood Berserkers cost 4★ & gain +3 maxHP.",iconKey:"uruk_berserker",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_snaga_archers:{id:"orcs_snaga_archers",faction:"orcs",pillar:"Shadow Marksmen",pillarIndex:3,tier:1,slot:"root",prerequisites:[],name:"Skirmish Archers",summary:"Unlocks Archer ranged unit.",iconKey:"archer",unlocksUnits:["archer"],unlocksResources:[],unlocksImprovements:[]},orcs_black_arrows:{id:"orcs_black_arrows",faction:"orcs",pillar:"Shadow Marksmen",pillarIndex:3,tier:2,slot:"a",prerequisites:["orcs_snaga_archers"],name:"Black Arrows",summary:"Archers deal +1 damage to wounded targets.",iconKey:"archer",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_crag_climbing:{id:"orcs_crag_climbing",faction:"orcs",pillar:"Shadow Marksmen",pillarIndex:3,tier:2,slot:"b",prerequisites:["orcs_snaga_archers"],name:"Crag Climbing",summary:"Units can traverse Mountains (1.5× DEF, +1 vision).",iconKey:"mountain",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksMountainPass:!0},orcs_fell_volley:{id:"orcs_fell_volley",faction:"orcs",pillar:"Shadow Marksmen",pillarIndex:3,tier:3,slot:"capstone",prerequisites:["orcs_black_arrows"],name:"Fell Volley",summary:"Archers gain +1 RNG (range 3).",iconKey:"archer",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_woodland_lore:{id:"elves_woodland_lore",faction:"elves",pillar:"Sylvan Harmony",pillarIndex:0,tier:1,slot:"root",prerequisites:[],name:"Woodland Lore",summary:"Harvest Berries & Game (2★, +1 Pop) & train Archers.",iconKey:"berries",unlocksUnits:["archer"],unlocksResources:["berries","game"],unlocksImprovements:[]},elves_sanctuaries:{id:"elves_sanctuaries",faction:"elves",pillar:"Sylvan Harmony",pillarIndex:0,tier:2,slot:"a",prerequisites:["elves_woodland_lore"],name:"Woodland Sanctuaries",summary:"Build Sanctuary in Woods (4★, +2 Pop without chopping).",iconKey:"sanctuary",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["sanctuary"]},elves_tree_singing:{id:"elves_tree_singing",faction:"elves",pillar:"Sylvan Harmony",pillarIndex:0,tier:2,slot:"b",prerequisites:["elves_woodland_lore"],name:"Tree-Singing",summary:"Plant Ancient Woods on Plains (3★, +1 Pop).",iconKey:"ancient_woods",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksPlantWoods:!0},elves_lothlorien_sanctum:{id:"elves_lothlorien_sanctum",faction:"elves",pillar:"Sylvan Harmony",pillarIndex:0,tier:3,slot:"capstone",prerequisites:["elves_sanctuaries"],name:"Golden Sanctum",summary:"Sanctuaries grant +1★/turn & Ancient Woods cap rises to +5★/city.",iconKey:"sanctuary",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_woodland_aim:{id:"elves_woodland_aim",faction:"elves",pillar:"Starlight Archery",pillarIndex:1,tier:1,slot:"root",prerequisites:[],name:"Woodland Aim",summary:"Ranged units gain +0.5 ATK from Forest or Ancient Woods.",iconKey:"archer",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_sentinel_order:{id:"elves_sentinel_order",faction:"elves",pillar:"Starlight Archery",pillarIndex:1,tier:2,slot:"a",prerequisites:["elves_woodland_aim"],name:"Sentinel Order",summary:"Unlocks Elven Sentinel (Skirmish champion).",iconKey:"elven_sentinel",unlocksUnits:["elven_sentinel"],unlocksResources:[],unlocksImprovements:[]},elves_keen_sight:{id:"elves_keen_sight",faction:"elves",pillar:"Starlight Archery",pillarIndex:1,tier:2,slot:"b",prerequisites:["elves_woodland_aim"],name:"Keen Sight",summary:"All units gain +1 vision radius in Forest or Ancient Woods.",iconKey:"forest",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_galadhrim_precision:{id:"elves_galadhrim_precision",faction:"elves",pillar:"Starlight Archery",pillarIndex:1,tier:3,slot:"capstone",prerequisites:["elves_sentinel_order"],name:"Starlight Precision",summary:"Elven Sentinels gain +0.5 ATK & +3 maxHP.",iconKey:"elven_sentinel",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_elven_steeds:{id:"elves_elven_steeds",faction:"elves",pillar:"Swiftness & Wardens",pillarIndex:2,tier:1,slot:"root",prerequisites:[],name:"Elven Steeds",summary:"Unlocks Rider cavalry unit.",iconKey:"rider",unlocksUnits:["rider"],unlocksResources:[],unlocksImprovements:[]},elves_wardens:{id:"elves_wardens",faction:"elves",pillar:"Swiftness & Wardens",pillarIndex:2,tier:2,slot:"a",prerequisites:["elves_elven_steeds"],name:"Gladewardens",summary:"Unlocks Defender unit.",iconKey:"defender",unlocksUnits:["defender"],unlocksResources:[],unlocksImprovements:[]},elves_graceful_guard:{id:"elves_graceful_guard",faction:"elves",pillar:"Swiftness & Wardens",pillarIndex:2,tier:2,slot:"b",prerequisites:["elves_elven_steeds"],name:"Graceful Guard",summary:"Defenders gain 1.5× DEF even on Plains.",iconKey:"defender",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_wind_riders:{id:"elves_wind_riders",faction:"elves",pillar:"Swiftness & Wardens",pillarIndex:2,tier:3,slot:"capstone",prerequisites:["elves_wardens"],name:"Wind Riders",summary:"Friendly units heal +2 HP/turn passively inside friendly borders.",iconKey:"park",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_high_paths:{id:"elves_high_paths",faction:"elves",pillar:"Ancient Wisdom",pillarIndex:3,tier:1,slot:"root",prerequisites:[],name:"High Paths",summary:"Units can traverse Mountains (1.5× DEF, +1 vision).",iconKey:"mountain",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksMountainPass:!0},elves_elven_lore:{id:"elves_elven_lore",faction:"elves",pillar:"Ancient Wisdom",pillarIndex:3,tier:2,slot:"a",prerequisites:["elves_high_paths"],name:"Elven Lore",summary:"All future technologies cost -1★ (min 2★).",iconKey:"ruins",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_mallorn_siege:{id:"elves_mallorn_siege",faction:"elves",pillar:"Ancient Wisdom",pillarIndex:3,tier:2,slot:"b",prerequisites:["elves_high_paths"],name:"Sunwood Siege",summary:"Unlocks Catapult siege unit.",iconKey:"catapult",unlocksUnits:["catapult"],unlocksResources:[],unlocksImprovements:[]},elves_rings_preservation:{id:"elves_rings_preservation",faction:"elves",pillar:"Ancient Wisdom",pillarIndex:3,tier:3,slot:"capstone",prerequisites:["elves_elven_lore"],name:"Wards of Preservation",summary:"Cities heal adjacent friendly units +2 HP/turn & +100 Glory per tech.",iconKey:"park",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_delving:{id:"dwarves_delving",faction:"dwarves",pillar:"Deep Delving",pillarIndex:0,tier:1,slot:"root",prerequisites:[],name:"Deep Delving",summary:"Traverse Mountains (1.75× DEF) & Harvest Ore/Starsteel (2★, +1/+2 Pop).",iconKey:"ore",unlocksUnits:[],unlocksResources:["ore","mithril"],unlocksImprovements:[],unlocksMountainPass:!0},dwarves_mining:{id:"dwarves_mining",faction:"dwarves",pillar:"Deep Delving",pillarIndex:0,tier:2,slot:"a",prerequisites:["dwarves_delving"],name:"Mountain Mining",summary:"Build Mine on Mountain (4★, +2 Pop & +1★/turn).",iconKey:"mine",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["mine"]},dwarves_khazad_forges:{id:"dwarves_khazad_forges",faction:"dwarves",pillar:"Deep Delving",pillarIndex:0,tier:2,slot:"b",prerequisites:["dwarves_delving"],name:"Runestone Forges",summary:"Build Great Forge (5★, +2 Pop per adjacent Mine).",iconKey:"great_forge",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["great_forge"]},dwarves_heart_of_mountain:{id:"dwarves_heart_of_mountain",faction:"dwarves",pillar:"Deep Delving",pillarIndex:0,tier:3,slot:"capstone",prerequisites:["dwarves_mining"],name:"Heart of the Deep",summary:"Mines grant +2★/turn & Great Forges grant +1★/turn.",iconKey:"mithril",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_shieldbearers:{id:"dwarves_shieldbearers",faction:"dwarves",pillar:"Shield & Starsteel",pillarIndex:1,tier:1,slot:"root",prerequisites:[],name:"Shieldbearers",summary:"Unlocks Defender unit (+2 maxHP).",iconKey:"defender",unlocksUnits:["defender"],unlocksResources:[],unlocksImprovements:[]},dwarves_mithril_smithing:{id:"dwarves_mithril_smithing",faction:"dwarves",pillar:"Shield & Starsteel",pillarIndex:1,tier:2,slot:"a",prerequisites:["dwarves_shieldbearers"],name:"Starsteel Smithing",summary:"Unlocks Ironbreaker (Stalwart champion).",iconKey:"ironbreaker",unlocksUnits:["ironbreaker"],unlocksResources:[],unlocksImprovements:[]},dwarves_runic_plate:{id:"dwarves_runic_plate",faction:"dwarves",pillar:"Shield & Starsteel",pillarIndex:1,tier:2,slot:"b",prerequisites:["dwarves_shieldbearers"],name:"Runic Plate",summary:"All Dwarven melee units gain +0.5 DEF.",iconKey:"defender",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_mithril_phalanx:{id:"dwarves_mithril_phalanx",faction:"dwarves",pillar:"Shield & Starsteel",pillarIndex:1,tier:3,slot:"capstone",prerequisites:["dwarves_mithril_smithing"],name:"Starsteel Phalanx",summary:"Ironbreakers & Defenders gain +4 maxHP & 1.75× DEF on Plains.",iconKey:"ironbreaker",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_foraging:{id:"dwarves_foraging",faction:"dwarves",pillar:"Hearth & Halls",pillarIndex:2,tier:1,slot:"root",prerequisites:[],name:"Mountain Foraging",summary:"Harvest Berries & Game (2★, +1 Pop).",iconKey:"berries",unlocksUnits:[],unlocksResources:["berries","game"],unlocksImprovements:[]},dwarves_stone_walls:{id:"dwarves_stone_walls",faction:"dwarves",pillar:"Hearth & Halls",pillarIndex:2,tier:2,slot:"a",prerequisites:["dwarves_foraging"],name:"Stone Walls",summary:"All Lv 2+ cities gain free City Walls (2.0× DEF).",iconKey:"city_wall",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_crossbows:{id:"dwarves_crossbows",faction:"dwarves",pillar:"Hearth & Halls",pillarIndex:2,tier:2,slot:"b",prerequisites:["dwarves_foraging"],name:"Dwarven Crossbows",summary:"Unlocks Archer (Crossbowman) ranged unit.",iconKey:"archer",unlocksUnits:["archer"],unlocksResources:[],unlocksImprovements:[]},dwarves_deep_vaults:{id:"dwarves_deep_vaults",faction:"dwarves",pillar:"Hearth & Halls",pillarIndex:2,tier:3,slot:"capstone",prerequisites:["dwarves_stone_walls"],name:"Deep Vaults",summary:"All cities gain +1★/turn & +1 Unit Cap.",iconKey:"city",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_ram_riders:{id:"dwarves_ram_riders",faction:"dwarves",pillar:"Engineering & Rams",pillarIndex:3,tier:1,slot:"root",prerequisites:[],name:"Ram Riders",summary:"Unlocks Rider (Mountain Ram Rider — can enter Mountains).",iconKey:"rider",unlocksUnits:["rider"],unlocksResources:[],unlocksImprovements:[]},dwarves_siegecraft:{id:"dwarves_siegecraft",faction:"dwarves",pillar:"Engineering & Rams",pillarIndex:3,tier:2,slot:"a",prerequisites:["dwarves_ram_riders"],name:"Dwarven Siegecraft",summary:"Unlocks Catapult (15 HP & Fortify).",iconKey:"catapult",unlocksUnits:["catapult"],unlocksResources:[],unlocksImprovements:[]},dwarves_horned_charge:{id:"dwarves_horned_charge",faction:"dwarves",pillar:"Engineering & Rams",pillarIndex:3,tier:2,slot:"b",prerequisites:["dwarves_ram_riders"],name:"Horned Charge",summary:"Ram Riders gain +0.5 ATK.",iconKey:"rider",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_dragon_slayers:{id:"dwarves_dragon_slayers",faction:"dwarves",pillar:"Engineering & Rams",pillarIndex:3,tier:3,slot:"capstone",prerequisites:["dwarves_siegecraft"],name:"Dragon-Slayer Engines",summary:"Catapults cost 6★ and gain +0.5 ATK & +5 maxHP.",iconKey:"catapult",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]}},Cc={root:0,a:1,b:2,capstone:3};function ti(i){return Object.values(Ct).filter(e=>e.faction===i).sort((e,t)=>e.pillarIndex-t.pillarIndex||e.tier-t.tier||Cc[e.slot]-Cc[t.slot])}function Ke(i,e,t){return e*t+i}function he(i,e,t){return e<0||t<0||e>=i.mapSize||t>=i.mapSize?null:i.tiles[t*i.mapSize+e]??null}const Pr=2,Lr=2,Dr=3,nl=2,Du={berries:1,game:1,ore:1,mithril:2,ruins:0};function vt(i,e){return Math.max(Math.abs(i.x-e.x),Math.abs(i.y-e.y))}function ke(i,e){return i.players.find(t=>t.id===e)}function Us(i){return i.players[i.activePlayerIndex]}function Wt(i,e){return Object.values(i.cities).filter(t=>t.ownerId===e)}function jl(i,e){return Object.values(i.units).filter(t=>t.ownerId===e)}function hs(i,e,t){const n=[];for(let s=-1;s<=1;s++)for(let r=-1;r<=1;r++){if(r===0&&s===0)continue;const a=he(i,e+r,t+s);a&&n.push(a)}return n}function Te(i,e){return i.techs.includes(e)}function ku(i){return i.techs.some(e=>Ct[e]?.unlocksMountainPass===!0)}function Kh(i,e){const t=Bt[e.type].traits.slice(),n=ke(i,e.ownerId);return n&&n.faction==="dwarves"&&e.type==="catapult"&&Te(n,"dwarves_siegecraft")&&!t.includes("fortify")&&t.push("fortify"),t}function un(i,e,t){return Kh(i,e).includes(t)}function Va(i,e){const t=Bt[e.type].range,n=ke(i,e.ownerId);return n&&e.type==="archer"&&Te(n,"orcs_fell_volley")?Math.min(3,t+1):t}function Zl(i,e,t){let n=Bt[t].cost;const s=ke(i,e);return s&&(t==="catapult"&&Te(s,"orcs_siege_works")&&(n=Math.min(n,6)),t==="catapult"&&Te(s,"dwarves_dragon_slayers")&&(n=Math.max(1,n-1)),t==="uruk_berserker"&&Te(s,"orcs_black_gate")&&(n=Math.max(1,n-1))),n}function Jl(i,e,t){let n=Bt[t].maxHp;const s=ke(i,e);return s&&(t==="defender"&&Te(s,"dwarves_shieldbearers")&&(n+=2),t==="catapult"&&Te(s,"dwarves_siegecraft")&&(n+=5),(t==="rider"||t==="rohirrim_knight")&&Te(s,"humans_ride_of_rohirrim")&&(n+=3),t==="rider"&&Te(s,"orcs_pack_tactics")&&(n+=3),t==="uruk_berserker"&&Te(s,"orcs_black_gate")&&(n+=3),t==="elven_sentinel"&&Te(s,"elves_galadhrim_precision")&&(n+=3),(t==="ironbreaker"||t==="defender")&&Te(s,"dwarves_mithril_phalanx")&&(n+=4),t==="catapult"&&Te(s,"dwarves_dragon_slayers")&&(n+=5)),n}function io(i,e){const t=ke(i,e.ownerId);let n=Math.min(4,e.level+1);return t&&Te(t,"humans_granaries")&&e.level>=3&&(n+=1),t&&Te(t,"humans_stewards_citadel")&&(n+=1),t&&Te(t,"orcs_war_barracks")&&(n+=1),t&&Te(t,"dwarves_deep_vaults")&&(n+=1),n}function so(i,e){const t=i.cities[e];if(!t)return 0;let n=0;for(const s of Object.values(i.units))s.ownerId===t.ownerId&&s.homeCityId===e&&n++;return n}function Ql(i,e){const t=i.cities[e];if(!t)return[];const n=ke(i,t.ownerId);if(!n)return[];const s=new Set(["warrior"]);for(const r of n.techs){const a=Ct[r];if(a)for(const o of a.unlocksUnits)s.add(o)}return Yh.filter(r=>s.has(r)&&r!=="dragon"&&r!=="watchtower")}const na={elves:{faction:"elves",name:"Starlit Eclipse",shortLabel:"Eclipse",description:"Plunges the realm into darkness for 3 turns. All Elven units gain +1 MOV and +1 ATK.",requiresTarget:!1},orcs:{faction:"orcs",name:"Volcanic Cataclysm",shortLabel:"Volcano",description:"Calls down volcano fire across a 3×3 area, destroying enemies and scorching the land into Wasteland.",requiresTarget:!0,targetHint:"Tap any revealed tile to unleash a 3×3 volcanic eruption"},dwarves:{faction:"dwarves",name:"Awaken Fire Drake",shortLabel:"Fire Drake",description:"Summons a flying Fire Drake at the mountain closest to your capital.",requiresTarget:!1},humans:{faction:"humans",name:"Raise Watchtower",shortLabel:"Watchtower",description:"Constructs a fortified Watchtower (25 HP, Range 2) inside your territory.",requiresTarget:!0,targetHint:"Tap an empty tile inside your borders to build a Watchtower"}};function Hr(i,e){const t=ke(i,e);if(!t||!t.alive)return[];if(t.faction==="elves"||t.faction==="dwarves")return[];const n=[];if(t.faction==="orcs"){for(let s=0;s<i.tiles.length;s++)if(t.revealedTiles[s]){const r=i.tiles[s];n.push({x:r.x,y:r.y})}return n}for(let s=0;s<i.tiles.length;s++){if(!t.revealedTiles[s])continue;const r=i.tiles[s];r.cityId!==null&&i.cities[r.cityId]?.ownerId===e&&r.terrain!=="water"&&r.unitId===null&&!r.isCityCenter&&n.push({x:r.x,y:r.y})}return n}function kr(i,e){if(i.phase!=="playing")return!1;const t=ke(i,e);return!t||!t.alive||kn(t)<3||(t.superpowerUsed??!1)?!1:t.faction==="humans"?Hr(i,e).length>0:!0}const Ks={1:0,2:3,3:7},xn={1:"I",2:"II",3:"III"};function kn(i){const e=i.techs.length;return e>=Ks[3]?3:e>=Ks[2]?2:1}function jh(i){const e=kn(i),t=i.techs.length;if(e===3)return{currentAge:3,nextAge:null,currentTechs:t,requiredTechs:null,remaining:0};const n=e+1,s=Ks[n];return{currentAge:e,nextAge:n,currentTechs:t,requiredTechs:s,remaining:Math.max(0,s-t)}}function Kr(i,e,t){const n=ke(i,e),s=Ct[t];if(!n||!s)return 999;const r=Math.max(1,Wt(i,e).length);let o=(s.tier===1?3:s.tier===2?5:8)+(r-1);return Te(n,"elves_elven_lore")&&(o=Math.max(2,o-1)),o}function Zh(i,e,t){const n=ke(i,e),s=Ct[t];if(!n||!n.alive||!s||s.faction!==n.faction)return"Unavailable";if(Te(n,t))return"Already researched";if(s.tier>kn(n)){const o=Ks[s.tier]-n.techs.length;return`Requires Age ${xn[s.tier]} (research ${o} more ${o===1?"tech":"techs"})`}const r=s.prerequisites.find(o=>!Te(n,o));if(r)return`Requires ${Ct[r].name}`;const a=Kr(i,e,t);return n.gold<a?`Need ${a}★ (have ${n.gold}★)`:null}function Ur(i,e,t){const n=ke(i,e),s=Ct[t];return!n||!n.alive||!s||s.faction!==n.faction||Te(n,t)||kn(n)<s.tier||!s.prerequisites.every(r=>Te(n,r))?!1:n.gold>=Kr(i,e,t)}function Ic(i,e){const t=he(i,e.x,e.y);if(!t||!t.unitId)return!1;const n=i.units[t.unitId];return n!==void 0&&n.ownerId!==e.ownerId}function ec(i,e,t,n){const s=he(i,t,n);if(!s)return!1;if(s.hasVillage&&!s.cityId)return!0;if(s.isCityCenter&&s.cityId){const r=i.cities[s.cityId];if(r&&r.ownerId!==e)return!0}return!1}function xi(i,e){const t=i.units[e];if(!t||t.canCapture!==!0||t.actedThisTurn||t.hasMoved||t.hasAttacked)return!1;const n=ke(i,t.ownerId);return!n||!n.alive?!1:ec(i,t.ownerId,t.x,t.y)}function Uu(i,e,t){const n=he(i,e,t);return n!==null&&n.resource==="ruins"}function Ti(i,e){const t=i.units[e];if(!t||t.canExploreRuins!==!0||t.actedThisTurn||t.hasMoved||t.hasAttacked)return!1;const n=ke(i,t.ownerId);return!n||!n.alive?!1:Uu(i,t.x,t.y)}function tc(i,e){const t=Wt(i,e),n=t.filter(l=>l.isCapital),s=new Set;if(n.length===0)return s;for(const l of t){if(l.isCapital){s.add(l.id);continue}for(const c of n)if(vt(l,c)<=4){s.add(l.id);break}}const r=new Uint8Array(i.mapSize*i.mapSize),a=[];for(const l of n){const c=Ke(l.x,l.y,i.mapSize);r[c]||(r[c]=1,a.push({x:l.x,y:l.y}))}let o=0;for(;o<a.length;){const l=a[o++],c=he(i,l.x,l.y);if(c&&c.isCityCenter&&c.cityId){const d=i.cities[c.cityId];d&&d.ownerId===e&&s.add(d.id)}for(const d of hs(i,l.x,l.y)){const u=Ke(d.x,d.y,i.mapSize);if(r[u])continue;const h=d.isCityCenter&&d.cityId!==null&&i.cities[d.cityId]?.ownerId===e;!(d.isCityCenter&&d.cityId!==null&&i.cities[d.cityId]?.ownerId!==e)&&(d.hasRoad||h)&&(r[u]=1,a.push({x:d.x,y:d.y}))}}return s}function nc(i,e){const t=ke(i,e);if(!t||!t.alive)return 0;const n=Wt(i,e);if(n.length===0)return 0;let s=0;n.some(l=>l.isCapital&&!Ic(i,l))&&(s+=1);const a=t.faction==="humans"?tc(i,e):null,o=new Set;for(const l of n)Ic(i,l)||(o.add(l.id),s+=l.level,l.hasWorkshop&&(s+=1),s+=l.parks,t.faction==="humans"&&!l.isCapital&&a?.has(l.id)&&(s+=1),Te(t,"humans_granaries")&&l.level>=3&&(s+=1),Te(t,"humans_citadel_masonry")&&l.hasWalls&&(s+=1),Te(t,"humans_stewards_citadel")&&(s+=1),Te(t,"dwarves_deep_vaults")&&(s+=1));if(o.size>0){const l=t.faction==="elves",c=Te(t,"humans_milling"),d=Te(t,"orcs_mount_doom"),u=Te(t,"elves_lothlorien_sanctum"),h=Te(t,"dwarves_heart_of_mountain"),f={};for(const g of i.tiles)if(!(!g.cityId||!o.has(g.cityId))&&(l&&g.terrain==="ancient_woods"&&g.improvement===null&&(f[g.cityId]=(f[g.cityId]??0)+1),g.improvement!==null)){if(s+=zi[g.improvement].goldPerTurn,g.improvement==="windmill"&&c){let v=0;for(const m of hs(i,g.x,g.y))m.improvement==="farm"&&v++;s+=v}g.improvement==="foundry"&&d&&(s+=1),g.improvement==="sanctuary"&&u&&(s+=1),h&&(g.improvement==="mine"||g.improvement==="great_forge")&&(s+=1)}if(l){const g=u?5:3;for(const v of o){const m=f[v]??0;m>0&&(s+=Math.min(g,m))}}}return s}function ro(i,e){const t=ke(i,e);if(!t)return 0;let n=0;const s=Wt(i,e);for(const a of s)n+=100,n+=50*a.level,n+=250*a.parks;for(let a=0;a<t.revealedTiles.length;a++)t.revealedTiles[a]&&(n+=10);for(const a of t.techs){const o=Ct[a];o&&(n+=o.tier===1?100:o.tier===2?200:350)}Te(t,"elves_rings_preservation")&&(n+=t.techs.length*100);const r=jl(i,e);return n+=r.length*25,n}function Jh(i){const e=i.players.map(t=>({playerId:t.id,faction:t.faction,name:t.name,score:ro(i,t.id),citiesCount:Wt(i,t.id).length,unitsCount:jl(i,t.id).length,techsCount:t.techs.length,isEliminated:!t.alive,isHuman:t.isHuman,rank:0}));e.sort((t,n)=>n.score!==t.score?n.score-t.score:n.citiesCount!==t.citiesCount?n.citiesCount-t.citiesCount:t.isEliminated!==n.isEliminated?t.isEliminated?1:-1:0);for(let t=0;t<e.length;t++)e[t].rank=t+1;return e}function Qh(i,e){return!(e.terrain==="water"||e.terrain==="mountain"&&!ku(i))}function ef(i,e,t,n){for(const s of hs(i,t,n))if(s.unitId!==null){const r=i.units[s.unitId];if(r&&r.ownerId!==e)return!0}return!1}function zr(i,e){const t=i.units[e];if(!t)return[];if(t.actedThisTurn)return[];if(t.hasMoved&&!t.canEscapeMove)return[];if(t.hasAttacked&&!t.canEscapeMove)return[];const n=ke(i,t.ownerId);if(!n||!n.alive)return[];const s=he(i,t.x,t.y);if(!s)return[];let r=Bt[t.type].movement;if(r<=0)return[];n.faction==="humans"&&s.hasRoad&&(r+=1),Te(n,"humans_ride_of_rohirrim")&&(t.type==="rider"||t.type==="rohirrim_knight")&&(r+=1),(i.eclipseTurnsRemaining??0)>0&&i.eclipseOwnerId===n.id&&(r+=1);const a=un(i,t,"flying"),o=i.mapSize,l=new Int8Array(o*o);l.fill(-1);const c=Ke(t.x,t.y,o);l[c]=r;const d=[{x:t.x,y:t.y,rem:r}],u=[],h=new Uint8Array(o*o);for(;d.length>0;){let f=0;for(let p=1;p<d.length;p++)d[p].rem>d[f].rem&&(f=p);const g=d.splice(f,1)[0],v=Ke(g.x,g.y,o);if(!(g.rem<l[v]||g.rem<=0||!(g.x===t.x&&g.y===t.y)&&ef(i,t.ownerId,g.x,g.y)))for(const p of hs(i,g.x,g.y)){const y=Ke(p.x,p.y,o);if(!n.revealedTiles[y]||!a&&!Qh(n,p))continue;if(p.unitId!==null){const _=i.units[p.unitId];if(_&&_.ownerId!==t.ownerId)continue}let w=g.rem-1;if(!a){const _=p.terrain==="forest"||p.terrain==="ancient_woods";(p.terrain==="mountain"||_&&n.faction!=="elves"&&!p.hasRoad)&&(w=0)}p.unitId===null&&!h[y]&&(h[y]=1,u.push({x:p.x,y:p.y})),w>l[y]&&(l[y]=w,d.push({x:p.x,y:p.y,rem:w}))}}return u}function Gs(i,e){const t=i.units[e];if(!t)return[];if(t.actedThisTurn)return[];if(t.hasAttacked&&!t.canPersistAttack)return[];if(t.canEscapeMove)return[];if(t.hasMoved&&!un(i,t,"dash"))return[];const n=ke(i,t.ownerId);if(!n||!n.alive)return[];const s=Va(i,t),r=[];for(const a of Object.values(i.units)){if(a.ownerId===t.ownerId)continue;const o=vt(t,a);if(o<1||o>s)continue;const l=Ke(a.x,a.y,i.mapSize);n.revealedTiles[l]&&r.push({x:a.x,y:a.y})}return r}function Gr(i,e){if(i.phase==="game_over")return!1;const t=i.units[e];if(!t||t.actedThisTurn)return!1;const n=ke(i,t.ownerId);return!n||!n.alive?!1:!!(xi(i,t.id)||Ti(i,t.id)||(!t.hasMoved||t.canEscapeMove)&&zr(i,t.id).length>0||(!t.hasAttacked||t.canPersistAttack)&&Gs(i,t.id).length>0||!t.hasMoved&&!t.hasAttacked&&t.hp<t.maxHp||(t.canPromote||t.kills>=3)&&!t.isVeteran)}function Ou(i,e,t,n){const s=zi[n];let r=s.basePop;if(s.adjacentBonusTo&&s.adjacentPopPerMatch){let a=0;for(const o of hs(i,e,t))o.improvement===s.adjacentBonusTo&&a++;r+=a*s.adjacentPopPerMatch}return r}function Os(i,e,t,n){const s=ke(i,e),r=he(i,t,n);if(!s||!s.alive||!r)return[];const a=Ke(t,n,i.mapSize);if(!s.revealedTiles[a])return[];const o=[],l=r.cityId?i.cities[r.cityId]:null,c=l!==null&&l.ownerId===e,d=r.cityId===null;if(c&&r.resource!==null&&r.resource!=="ruins"&&s.gold>=Pr&&s.techs.some(h=>Ct[h]?.unlocksResources.includes(r.resource))&&o.push({type:"HARVEST_TILE",coord:{x:t,y:n}}),c&&!r.isCityCenter&&r.improvement===null&&r.resource!=="ruins"){const u=new Set;for(const h of s.techs)for(const f of Ct[h]?.unlocksImprovements??[])u.add(f);for(const h of u){const f=zi[h];f.allowedTerrains.includes(r.terrain)&&(s.gold<f.cost||o.push({type:"BUILD_IMPROVEMENT",coord:{x:t,y:n},improvement:h}))}}return(c||d)&&!r.hasRoad&&!r.isCityCenter&&r.terrain!=="water"&&r.terrain!=="mountain"&&s.gold>=Lr&&s.techs.some(h=>Ct[h]?.unlocksRoad===!0)&&o.push({type:"BUILD_ROAD",coord:{x:t,y:n}}),c&&!r.isCityCenter&&(r.terrain==="forest"||r.terrain==="ancient_woods")&&s.techs.some(h=>Ct[h]?.unlocksChopForest===!0)&&o.push({type:"CHOP_FOREST",coord:{x:t,y:n}}),c&&!r.isCityCenter&&r.terrain==="plains"&&r.improvement===null&&r.resource===null&&s.gold>=Dr&&s.techs.some(h=>Ct[h]?.unlocksPlantWoods===!0)&&o.push({type:"PLANT_ANCIENT_WOODS",coord:{x:t,y:n}}),o}const tf={berries:{label:"Berries",icon:"🫐"},game:{label:"Game",icon:"🦌"},ore:{label:"Ore",icon:"⛏️"},mithril:{label:"Starsteel",icon:"💎"},ruins:{label:"Ruins",icon:"🏛️"}},nf={farm:"🌾",windmill:"🌬️",slag_pit:"🕳️",foundry:"🔥",sanctuary:"🌿",mine:"⛏️",great_forge:"⚒️"},sf={warrior:"⚔️",defender:"🛡️",archer:"🏹",rider:"🐎",catapult:"🪨",rohirrim_knight:"🐴",uruk_berserker:"🪓",elven_sentinel:"🌟",ironbreaker:"⚒️",dragon:"🐉",watchtower:"🗼"};function Pc(i,e,t,n){const s=ke(i,e),r=he(i,t,n);if(!s||!s.alive||!r)return[];const a=Ke(t,n,i.mapSize);if(!s.revealedTiles[a])return[];const o=[],l=ti(s.faction),c=r.cityId?i.cities[r.cityId]:null,d=c!==null&&c.ownerId===e,u=r.cityId===null;if(r.resource!==null&&r.resource!=="ruins"){const v=r.resource,m=l.find(p=>p.unlocksResources.includes(v));if(m){const p=tf[v],y=Du[v];let w,_;d?Te(s,m.id)?s.gold<Pr&&(w=`Need ${Pr}★ (have ${s.gold}★)`):(w=`Requires ${m.name}`,_=m.id):w="Outside your borders",o.push({id:`harvest_${v}`,label:`Harvest ${p.label}`,description:`+${y} Pop to city`,cost:Pr,icon:p.icon,enabled:!w,disabledReason:w,..._?{requiredTechId:_}:{},action:w?void 0:{type:"HARVEST_TILE",coord:{x:t,y:n}}})}}if(!r.isCityCenter&&r.improvement===null&&r.resource!=="ruins"){const v=new Set;for(const m of l)for(const p of m.unlocksImprovements){if(v.has(p))continue;const y=zi[p];if(!y.allowedTerrains.includes(r.terrain))continue;v.add(p);const w=Ou(i,t,n,p);let _,b;d?Te(s,m.id)?s.gold<y.cost&&(_=`Need ${y.cost}★ (have ${s.gold}★)`):(_=`Requires ${m.name}`,b=m.id):_="Outside your borders";const T=p==="windmill"&&Te(s,"humans_milling")?hs(i,t,n).filter(S=>S.improvement==="farm").length:0,x=y.goldPerTurn+T+(p==="mine"&&Te(s,"dwarves_heart_of_mountain")?1:0)+(p==="great_forge"&&Te(s,"dwarves_heart_of_mountain")?1:0)+(p==="foundry"&&Te(s,"orcs_mount_doom")?1:0)+(p==="sanctuary"&&Te(s,"elves_lothlorien_sanctum")?1:0),E=[];w>0&&E.push(`+${w} Pop`),x>0&&E.push(`+${x}★/turn`);const M=E.length>0?E.join(", "):y.description;o.push({id:`build_${p}`,label:`Build ${y.name}`,description:M,cost:y.cost,icon:nf[p],enabled:!_,disabledReason:_,...b?{requiredTechId:b}:{},action:_?void 0:{type:"BUILD_IMPROVEMENT",coord:{x:t,y:n},improvement:p}})}}const h=l.find(v=>v.unlocksRoad===!0);if(h&&!r.hasRoad&&!r.isCityCenter&&r.terrain!=="water"&&r.terrain!=="mountain"){let v,m;d||u?Te(s,h.id)?s.gold<Lr&&(v=`Need ${Lr}★ (have ${s.gold}★)`):(v=`Requires ${h.name}`,m=h.id):v="Enemy territory",o.push({id:"build_road",label:"Build Road",description:"Connects cities & boosts movement",cost:Lr,icon:"🛤️",enabled:!v,disabledReason:v,...m?{requiredTechId:m}:{},action:v?void 0:{type:"BUILD_ROAD",coord:{x:t,y:n}}})}const f=l.find(v=>v.unlocksChopForest===!0);if(f&&!r.isCityCenter&&(r.terrain==="forest"||r.terrain==="ancient_woods")){let v,m;d?Te(s,f.id)||(v=`Requires ${f.name}`,m=f.id):v="Outside your borders",o.push({id:"chop_forest",label:"Chop Forest",description:`Clear woods for +${nl}★`,cost:0,icon:"🪓",enabled:!v,disabledReason:v,...m?{requiredTechId:m}:{},action:v?void 0:{type:"CHOP_FOREST",coord:{x:t,y:n}}})}const g=l.find(v=>v.unlocksPlantWoods===!0);if(g&&!r.isCityCenter&&r.terrain==="plains"&&r.improvement===null&&r.resource===null){let v,m;d?Te(s,g.id)?s.gold<Dr&&(v=`Need ${Dr}★ (have ${s.gold}★)`):(v=`Requires ${g.name}`,m=g.id):v="Outside your borders",o.push({id:"plant_ancient_woods",label:"Plant Ancient Woods",description:"+1 Pop & +1★/turn Woodland Grace",cost:Dr,icon:"🌳",enabled:!v,disabledReason:v,...m?{requiredTechId:m}:{},action:v?void 0:{type:"PLANT_ANCIENT_WOODS",coord:{x:t,y:n}}})}return o}function rf(i,e){const t=i.cities[e];if(!t)return[];const n=ke(i,t.ownerId);if(!n)return[];const s=nt[n.faction],r=ti(n.faction),a=[...qh,s.uniqueUnit],o=he(i,t.x,t.y),l=!o||o.unitId!==null,c=so(i,t.id),d=io(i,t),u=c>=d,h=new Set(Ql(i,t.id));return a.map(f=>{const g=Bt[f],v=Zl(i,n.id,f),m=Jl(i,n.id,f);let p,y;if(h.has(f))l?p="City tile occupied":u?p=`Unit cap reached (${c}/${d})`:n.gold<v&&(p=`Need ${v}★ (have ${n.gold}★)`);else{const w=r.find(_=>_.unlocksUnits.includes(f));p=w?`Requires ${w.name}`:"Locked",w&&(y=w.id)}return{id:`train_${f}`,label:g.name,description:`${m} HP · ${g.attack} ATK · ${g.defense} DEF · ${g.movement} MOV`,cost:v,icon:sf[f],unitType:f,enabled:!p,disabledReason:p,...y?{requiredTechId:y}:{},action:p?void 0:{type:"TRAIN_UNIT",cityId:t.id,unitType:f}}})}function af(i,e){const t=i.units[e];if(!t)return[];const n=ke(i,t.ownerId);if(!n)return[];const s=he(i,t.x,t.y),r=[];if(s&&ec(i,n.id,t.x,t.y)){const d=s.hasVillage&&!s.cityId,u=xi(i,t.id);r.push({id:"capture-city",label:d?"Claim Village":"Capture City",description:d?"Found a new city (ends unit turn)":"Seize enemy city (ends unit turn)",icon:"crown",enabled:u,disabledReason:u?void 0:"Capture next turn",action:u?{type:"CAPTURE_CITY",unitId:t.id}:void 0})}if(s&&s.resource==="ruins"){const d=Ti(i,t.id);r.push({id:"explore-ruins",label:"Explore Ruins",description:"Claim ancient treasure",icon:"ruins",enabled:d,disabledReason:d?void 0:"Explore next turn",action:d?{type:"EXPLORE_RUINS",unitId:t.id}:void 0})}const o=s!==null&&s.cityId!==null&&i.cities[s.cityId]?.ownerId===n.id?4:2;let l;t.hp>=t.maxHp?l="Full HP":(t.hasMoved||t.hasAttacked||t.actedThisTurn)&&(l="Already acted");let c;return t.isVeteran?c="Already Veteran":!t.canPromote&&t.kills<3&&(c=`Kills: ${t.kills}/3`),r.push({id:"recover",label:"Recover",description:`Heal +${o} HP (ends unit turn)`,icon:"💚",enabled:!l,disabledReason:l,action:l?void 0:{type:"RECOVER_UNIT",unitId:t.id}},{id:"promote",label:"Promote to Veteran",description:"+5 maxHP & full heal",icon:"⭐",enabled:!c,disabledReason:c,action:c?void 0:{type:"PROMOTE_UNIT",unitId:t.id}}),r}const of={portrait:"./assets/wizard/alderwick-portrait.webp"},lf={greet:"./assets/wizard/alderwick-full-greet.webp",point:"./assets/wizard/alderwick-full-point.webp",idea:"./assets/wizard/alderwick-full-idea.webp",cheer:"./assets/wizard/alderwick-full-cheer.webp",console:"./assets/wizard/alderwick-full-console.webp"},cf="Alderwick",js="Alderwick the Star-Keeper",Lc=[{faction:"humans",realmLabel:"Humans",powerName:"Raise Watchtower",summary:"Fortifies a 25 HP frontier bastion with Range 2 fire."},{faction:"orcs",realmLabel:"Orcs",powerName:"Volcanic Cataclysm",summary:"Unleashes a 3×3 volcanic eruption across revealed land."},{faction:"elves",realmLabel:"Elves",powerName:"Starlit Eclipse",summary:"Wields celestial Starlight across the sky (+1 MOV & +1 ATK)."},{faction:"dwarves",realmLabel:"Dwarves",powerName:"Awaken Fire Drake",summary:"Summons a winged Fire Drake from your mountain peaks."}],df={humans:{epilogue:"The sunlit highways shine from coast to coast once more. Beneath the beacons of Valoria & Sunmark, the shattered shards of the Star-Crown reunite in steadfast order.",alderwickQuote:"By my star-hat, what a splendid Chronicle! The watch-fires are lit and the roads gleam—now save me a warm scone from Solhaven’s bakery!"},orcs:{epilogue:"The war-forges roar in triumph across Eldermere! Ashfell & Ironspire have reforged the Star-Crown in fire and iron, proving that history belongs to the bold.",alderwickQuote:"Magnificent mayhem, Warlord! You smashed straight to the throne—and only singed half my favorite berry bushes along the way!"},elves:{epilogue:"The Keepers of the Starlight have answered the First Dawn’s call. Radiant celestial Starlight pours anew through the Ancient Woods as Sylvanvale & Starhaven reclaim the Star-Crown.",alderwickQuote:"Luminous beyond measure, Keeper! Watching Eldermere’s Starlight crown the canopy again brings a twinkle even to these ancient eyes."},dwarves:{epilogue:"From gleaming Starsteel veins to snow-capped peaks, Deepforge & Stonehelm have set the reforged Star-Crown upon stone that will never crumble.",alderwickQuote:"Sturdy as Starsteel, Commander! That foundation could outlast three First Dawns—truly a Chronicle worthy of the mountain halls!"}},uf={humans:"Chin up, Commander! Even the grandest highways suffer a bump or two. Straighten your banner—the tabletop is warm and a brand-new Chronicle awaits!",orcs:"Tough scrap, Warlord—they caught you before the war-forges hit full roar! Sharpen those axes and march back to the table; round two is calling.",elves:"A passing shadow, Keeper, never the end of the Starlight. Rest beneath the boughs and return—Eldermere still needs your keen aim.",dwarves:"Even mountain granite cracks before it is tempered, Commander! Re-light the forge, steady your shield-wall, and carve an unbreakable Chronicle next game."};function hf(i,e){const t=nt[i],n=e?nt[e]:null;return{epilogue:n?`The shards of the Star-Crown slip from ${t.name}’s grasp as ${n.name} of ${n.realm} claim Eldermere’s throne—yet the Fog of Forgetting never holds the last word.`:`The echoes of the Star-Crown drift back into the Fog of Forgetting as this Chronicle of ${t.realm} draws to a close.`,alderwickQuote:uf[i]}}const ff={humans:{epilogue:"Your banners are lowered along the sunlit roads, and this Chronicle of Valoria & Sunmark closes early while the Star-Crown’s echoes wait in the mist.",alderwickQuote:"I’ve tucked a golden ribbon right at this page, Commander. Even the stewards of Solhaven pause for a fresh pot of tea—the tabletop will be ready whenever you return!"},orcs:{epilogue:"The war-horns fall quiet across Ashfell & Ironspire as this Chronicle closes early, leaving the Star-Crown unclaimed beneath the Fog of Forgetting.",alderwickQuote:"Calling a tactical breather, Warlord? Not a word to the rivals—I’ll keep the war-drums dry and save your seat until you’re ready to rattle Eldermere again!"},elves:{epilogue:"The Keepers of the Starlight step back beneath the emerald canopy, closing this Chronicle early while the Star-Crown’s shards slumber in the mist.",alderwickQuote:"Even ancient Starlight rests between dawns, Keeper. I’ve pressed a golden leaf into this Chronicle—return to the table whenever the woods call you back!"},dwarves:{epilogue:"The hammers rest in the halls of Deepforge & Stonehelm as this Chronicle closes early, leaving the Star-Crown’s echoes waiting beyond the peaks.",alderwickQuote:"Wise craft knows when to bank the forge and start with fresh stone, Commander. Your page is bookmarked—the mountains will be right here when you return!"}};function pf(i,e,t){const n=nt[i],s=nt[e];return t?`Your final stronghold has fallen to ${s.name}, Commander—come, let us seal this chapter of the Chronicle.`:`${n.name}’s echo of the Star-Crown now passes to ${s.name}. One fewer banner on the tabletop—stay sharp, Commander!`}const il={star:'<path d="M12 1.8l2.1 6.1 6.1-2.1-2.1 6.1 6.1 2.1-6.1 2.1 2.1 6.1-6.1-2.1-2.1 6.1-2.1-6.1-6.1 2.1 2.1-6.1-6.1-2.1 6.1-2.1-2.1-6.1 6.1 2.1z" fill="currentColor" stroke="none"/>',swords:'<path d="M5 19l4-4m-4 1l3 3M19 5l-9.5 9.5M14.5 5H19v4.5M19 19l-4-4m4 1l-3 3M5 5l9.5 9.5M9.5 5H5v4.5" stroke-linecap="round" stroke-linejoin="round"/>',shield:'<path d="M12 2.5L4.5 5.5v5.8c0 4.9 3.2 8.9 7.5 10.2 4.3-1.3 7.5-5.3 7.5-10.2V5.5L12 2.5z" stroke-linejoin="round"/><path d="M12 6v12M8.5 10h7" stroke-linecap="round" opacity="0.65"/>',crown:'<path d="M3 17.5h18l-1.5-9-4.5 4L12 6l-3 6.5-4.5-4L3 17.5z" stroke-linejoin="round"/><path d="M4.5 20.5h15" stroke-linecap="round"/>',compass:'<circle cx="12" cy="12" r="9"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke-linecap="round"/><path d="M12 6.5l2.2 3.3 3.3 2.2-3.3 2.2L12 17.5l-2.2-3.3L6.5 12l3.3-2.2z" fill="currentColor" fill-opacity="0.25" stroke-linejoin="round"/>',codex:'<path d="M6 4.5h11.5a2 2 0 012 2v11.5a2 2 0 01-2 2H6.5a2 2 0 01-2-2V6a1.5 1.5 0 011.5-1.5z" stroke-linejoin="round"/><path d="M8.5 4.5v15.5M11.5 9h5M11.5 12.5h5M11.5 16h3.2" stroke-linecap="round"/>',leaf:'<path d="M19.5 4.5C13 4.5 7 8 5.5 16c-.2 1.2.8 2.2 2 2 8-1.5 11.5-7.5 11.5-13.5z" stroke-linejoin="round"/><path d="M4.5 19.5c3-3 7-6.5 11.5-10" stroke-linecap="round"/>',anvil:'<path d="M3.5 11h16.5c-.6 2.3-2.4 3.5-4.5 3.5H9.5l-1.2 3.5h8.2v2H5.5v-2h1.2l.8-3.5C5.2 14.2 3.8 13 3.5 11z" stroke-linejoin="round"/><path d="M9 7.5h6M12 7.5V11" stroke-linecap="round"/>',tower:'<path d="M6 20.5h12M7.5 20.5V9.5h9v11M6.5 9.5V5h2.5v2h2V5h2v2h2V5h2.5v4.5z" stroke-linejoin="round"/><path d="M10.5 20.5v-4.5a1.5 1.5 0 013 0v4.5" stroke-linecap="round"/>',horse:'<path d="M6.5 20h11l-.5-4.5c-.4-3.2 1.5-5.5 2-7.5l-2.5-3-1.5-1.5-.8 1.8c-2 .2-4.2 1.2-5.7 3.2L6 11.5l1.8 1.5 2.4-.8-.7 3.3-3 4.5z" stroke-linejoin="round"/><circle cx="13.8" cy="7.8" r="0.8" fill="currentColor" stroke="none"/>',bow:'<path d="M7.5 4c6 2.5 6 13.5 0 16" stroke-linecap="round"/><path d="M7.5 4v16" stroke-linecap="round" opacity="0.55"/><path d="M5 12h14.5M16.5 9l3 3-3 3" stroke-linecap="round" stroke-linejoin="round"/>',catapult:'<path d="M4 17.5h16M7 17.5l4-7.5 5 7.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 11.5L18.5 5.5" stroke-linecap="round"/><circle cx="19.2" cy="4.8" r="1.6" fill="currentColor" stroke="none"/><circle cx="7.5" cy="18.5" r="2"/><circle cx="16.5" cy="18.5" r="2"/>',wheat:'<path d="M12 21V5M12 16c-3 0-4.5-1.8-4.5-4 2.2 0 4.5 1.5 4.5 4zM12 16c3 0 4.5-1.8 4.5-4-2.2 0-4.5 1.5-4.5 4zM12 11c-2.6 0-4-1.5-4-3.5 2 0 4 1.3 4 3.5zM12 11c2.6 0 4-1.5 4-3.5-2 0-4 1.3-4 3.5z" stroke-linecap="round" stroke-linejoin="round"/>',pickaxe:'<path d="M5 19l9.5-9.5M10.5 5c3.5.5 6.8 3.2 8.5 6.5l-2.2 1.2c-1.4-2.4-3.6-4.4-6.3-5.2L10.5 5z" stroke-linecap="round" stroke-linejoin="round"/>',heart:'<path d="M12 20.2C7 16.4 3.8 13.4 3.8 9.4A4.4 4.4 0 0112 7a4.4 4.4 0 018.2 2.4c0 4-3.2 7-8.2 10.8z" stroke-linejoin="round"/><path d="M12 9.5v5M9.5 12h5" stroke-linecap="round"/>',road:'<path d="M8.5 20L10.5 4M15.5 20L13.5 4" stroke-linecap="round"/><path d="M12 7v2M12 12v2.5M12 17.5V20" stroke-linecap="round" opacity="0.7"/>',axe:'<path d="M6 19.5l9.5-9.5M13.5 4.5l5.5 5.5c-1.5 2-3.5 3-5.8 2.8l-2.5-2.5c-.2-2.3.8-4.3 2.8-5.8z" stroke-linecap="round" stroke-linejoin="round"/>',tree:'<path d="M12 20.5v-5M12 3.5L6.5 11h3L5.5 16h13l-4-5h3L12 3.5z" stroke-linecap="round" stroke-linejoin="round"/>',skull:'<path d="M6.5 14.5A5.5 5.5 0 1117.5 14.5v2.5h-2.5v2.5h-6V17H6.5v-2.5z" stroke-linejoin="round"/><circle cx="9.8" cy="11.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="14.2" cy="11.5" r="1.1" fill="currentColor" stroke="none"/>',lock:'<rect x="5.5" y="10.5" width="13" height="9.5" rx="2" stroke-linejoin="round"/><path d="M8.5 10.5V7.5a3.5 3.5 0 017 0v3" stroke-linecap="round"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round"/>',chevronRight:'<path d="M9 5.5l6.5 6.5L9 18.5" stroke-linecap="round" stroke-linejoin="round"/>',rotateLeft:'<path d="M7.5 8.5H4V5M4.5 8.5A8 8 0 116 17.5" stroke-linecap="round" stroke-linejoin="round"/>',rotateRight:'<path d="M16.5 8.5H20V5M19.5 8.5A8 8 0 1018 17.5" stroke-linecap="round" stroke-linejoin="round"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.5 2.5 0 014.8.8c0 1.6-2.3 2-2.3 3.5" stroke-linecap="round"/><circle cx="12" cy="16.8" r="0.9" fill="currentColor" stroke="none"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.6.85 1 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke-linejoin="round"/>',refresh:'<path d="M4.5 12a7.5 7.5 0 0113.1-5L20 9.5M19.5 4.5v5h-5M19.5 12a7.5 7.5 0 01-13.1 5L4 14.5M4.5 19.5v-5h5" stroke-linecap="round" stroke-linejoin="round"/>',close:'<path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/>',banner:'<path d="M6 3.5h12v14.5l-6-3.5-6 3.5V3.5z" stroke-linejoin="round"/><path d="M4.5 3.5h15" stroke-linecap="round"/>',eye:'<path d="M2.5 12s3.8-6 9.5-6 9.5 6 9.5 6-3.8 6-9.5 6-9.5-6-9.5-6z" stroke-linejoin="round"/><circle cx="12" cy="12" r="2.6"/>',trophy:'<path d="M7.5 4.5h9v4.2a4.5 4.5 0 01-9 0V4.5z" stroke-linejoin="round"/><path d="M7.5 6.5H4.5a2 2 0 000 4h1.8M16.5 6.5h3a2 2 0 010 4h-1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 13.2v4.3M8.5 20h7M9.5 17.5h5" stroke-linecap="round"/>',ruins:'<path d="M4.5 20h15M6.5 20V9.5M17.5 20V11.5M10.5 20v-7.5M5.5 9.5h7.5l2-2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.5 4l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" fill="currentColor" stroke="none"/>',helm:'<path d="M5.5 11.5a6.5 6.5 0 0113 0v3.2c0 2.6-2 4.6-4.5 5.3v-5.5h-4V20c-2.5-.7-4.5-2.7-4.5-5.3v-3.2z" fill="currentColor" fill-opacity="0.22" stroke-linejoin="round"/><path d="M12 5v5.5M8.5 11.5h7" stroke-linecap="round"/><path d="M17.2 13.5l3.3 1.2v2.4c0 1.9-1.3 3.4-3.3 4.1-2-.7-3.3-2.2-3.3-4.1v-2.4l3.3-1.2z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/>',mapGrid:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" fill="currentColor" fill-opacity="0.16" stroke-linejoin="round"/><path d="M12 12l8-4.5M12 12L4 7.5M12 12v9M8 5.25l8 4.5M16 5.25l-8 4.5" stroke-linecap="round" stroke-linejoin="round"/>',playSword:'<path d="M19.5 4.5l-1.2 4.5-7.8 7.8-3.3-3.3 7.8-7.8 4.5-1.2z" fill="currentColor" fill-opacity="0.28" stroke-linejoin="round"/><path d="M6.2 12.2l5.6 5.6M4.5 19.5l3.3-3.3" stroke-linecap="round" stroke-linejoin="round"/>',crestHumans:'<path d="M6 20h12v-2.2l-1.2-1V10l1.2-1V5h-2.8v2h-2V5h-2.4v2h-2V5H6v4l1.2 1v6.8l-1.2 1V20z" fill="currentColor" fill-opacity="0.28" stroke-linejoin="round"/><path d="M10.2 20v-4.2a1.8 1.8 0 013.6 0V20" stroke-linecap="round"/>',crestOrcs:'<path d="M12 4.5v15.5" stroke-linecap="round" stroke-width="2.2"/><path d="M12 7.5c-2.6 0-5-1.2-6.5-2.8-.8 3.2-.8 6.4 0 9.6 1.5-1.6 3.9-2.8 6.5-2.8 2.6 0 5 1.2 6.5 2.8.8-3.2.8-6.4 0-9.6-1.5 1.6-3.9 2.8-6.5 2.8z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/>',crestElves:'<path d="M12 3l1.9 5.5 5.6 1.7-5.6 1.8L12 17.5l-1.9-5.5L4.5 10.2l5.6-1.7L12 3z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/><path d="M6.5 19.5c2.2-.3 4.2-1.2 5.5-2.7 1.3 1.5 3.3 2.4 5.5 2.7" stroke-linecap="round"/>',crestDwarves:'<path d="M4 12.5L9 5.5l3 4 3-4 5 7" stroke-linejoin="round" stroke-linecap="round"/><path d="M5.5 14.5h13c-.6 1.8-1.9 2.7-3.5 2.7h-1.2l.8 2.3H9.4l.8-2.3H9c-1.6 0-2.9-.9-3.5-2.7z" fill="currentColor" fill-opacity="0.34" stroke-linejoin="round"/>',codexHumans:'<path d="M3.5 6.5C6.2 5.4 9.2 5.5 12 7.2c2.8-1.7 5.8-1.8 8.5-.7v11.5c-2.7-1.1-5.7-1-8.5.7-2.8-1.7-5.8-1.8-8.5-.7V6.5z" fill="currentColor" fill-opacity="0.24" stroke-linejoin="round"/><path d="M12 7.2v11.5M6.5 9.8h3M6.5 13h3M14.5 9.8h3M14.5 13h3" stroke-linecap="round"/>',codexOrcs:'<path d="M5.5 4.5h11.5a1.8 1.8 0 011.8 1.8v12a1.8 1.8 0 01-1.8 1.8H6.5a1.5 1.5 0 01-1.5-1.5V5.5a1 1 0 01.5-1z" fill="currentColor" fill-opacity="0.24" stroke-linejoin="round"/><path d="M8.2 4.5v15.5M12.8 9.2l-1.6 1.6v3l1.6 1.4 1.6-1.4v-3l-1.6-1.6zM10.5 8.5l1.2 1.2M15.1 8.5l-1.2 1.2" stroke-linecap="round" stroke-linejoin="round"/>',codexElves:'<path d="M5.5 4.5h11.5a2 2 0 012 2v11.5a2 2 0 01-2 2H6.5a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 01.5-1.5z" fill="currentColor" fill-opacity="0.22" stroke-linejoin="round"/><path d="M8 4.5v15.5M13.5 8.2c2.2 1.2 2.8 4.2 1.2 6.6-1.6-2.4-2.2-5.4-1.2-6.6zM13.5 14.8v2.2" stroke-linecap="round" stroke-linejoin="round"/>',codexDwarves:'<path d="M5.5 4.5h12l1.5 1.5v12.5L17.5 20h-12V4.5z" fill="currentColor" fill-opacity="0.26" stroke-linejoin="round"/><path d="M8.5 4.5V20M12 8.2v7.6M12 8.2l3.4 2.4-3.4 2.2 3.6 3" stroke-linecap="round" stroke-linejoin="round"/>',endTurnHumans:'<path d="M6.5 6.5l5.5 5.5-5.5 5.5V6.5zM13 6.5l5.5 5.5-5.5 5.5V6.5z" fill="currentColor" stroke-linejoin="round"/>',endTurnOrcs:'<path d="M5.5 7.2l6.2 4.8-6.2 4.8V7.2z" fill="currentColor" stroke-linejoin="round"/><path d="M12.5 13.8c2.6-.5 4.6-2 6-4.8l1.5 1.5c-1.5 3.4-4 5.5-7.5 6.2v-2.9z" fill="currentColor" fill-opacity="0.88" stroke-linejoin="round"/>',endTurnElves:'<path d="M8.5 7.5l1.2 3.2 3.2 1.3-3.2 1.3-1.2 3.2-1.3-3.2L4 12l3.2-1.3 1.3-3.2z" fill="currentColor" stroke="none"/><path d="M13 6.5l6.2 5.5-6.2 5.5 2.2-5.5L13 6.5z" fill="currentColor" stroke-linejoin="round"/>',endTurnDwarves:'<path d="M4.5 10.5h7.5v3.2c-1 .9-2.2 1.3-3.8 1.3l-.6 1.8h3.4v1.7H5.5v-1.7h.8l.5-1.8c-1.2-.5-2-1.4-2.3-2.5v-2z" fill="currentColor" stroke-linejoin="round"/><path d="M13.5 6.5l6 5.5-6 5.5v-11z" fill="currentColor" stroke-linejoin="round"/>',superpowerHumans:'<path d="M6.5 21h11M8 21V11.5h8V21M7 11.5V8.5h2.4v1.4h5.2V8.5H17v3z" fill="currentColor" fill-opacity="0.3" stroke-linejoin="round" stroke-linecap="round"/><path d="M10.8 21v-3.5a1.2 1.2 0 012.4 0V21" stroke-linecap="round"/><path d="M12 1.8l1.2 2.7 2.8 1-2.8 1L12 9.2l-1.2-2.7-2.8-1 2.8-1z" fill="currentColor" stroke="none"/>',superpowerOrcs:'<path d="M2.8 20.5h18.4l-5.6-10.2H8.4L2.8 20.5z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/><path d="M9.4 10.3c-.7-2.3.5-4.3 2.6-6.2 2 1.8 3.2 3.8 2.6 6.2z" fill="currentColor" stroke="none"/><path d="M12 2.2v1.6M6.8 6.8L5 5.2M17.2 6.8L19 5.2M8.8 14.5l1.8 2.2 1.6-1.4 2.2 2.6" stroke-linecap="round" stroke-linejoin="round"/>',superpowerElves:'<circle cx="12" cy="12" r="6.2" fill="currentColor" fill-opacity="0.24"/><path d="M14.6 6.4a5.8 5.8 0 100 11.2 4.7 4.7 0 110-11.2z" fill="currentColor" stroke="none"/><path d="M12 1.8v2.2M12 20v2.2M1.8 12H4M20 12h2.2M4.8 4.8l1.5 1.5M17.7 17.7l1.5 1.5M19.2 4.8l-1.5 1.5M6.3 17.7l-1.5 1.5" stroke-linecap="round"/>',superpowerDwarves:'<path d="M3.2 17.5c2.2-1.5 4.2-3.8 5-6.8L4.5 7.2l4.4-.6L11.2 3l2.2 3.4 4.8.4-2.8 3.2 3.2 2.2-4.8 1.2c-.8 2.4-2.4 4.3-5.2 5.4l-5.4-1.3z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/><path d="M18.2 10.2l3.4-1.4-1.6 2.8 2 1.2-3.4.2" fill="currentColor" stroke="none"/><circle cx="13.4" cy="9.2" r="0.95" fill="currentColor" stroke="none"/>'};function Q(i,e="icon"){const t=il[i]??il.star;return`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" aria-hidden="true">${t}</svg>`}function En(i,e="icon icon-crest"){return Q({humans:"crestHumans",orcs:"crestOrcs",elves:"crestElves",dwarves:"crestDwarves"}[i],e)}function mf(i,e="icon"){return Q({humans:"codexHumans",orcs:"codexOrcs",elves:"codexElves",dwarves:"codexDwarves"}[i],e)}function gf(i,e="icon"){return Q({humans:"endTurnHumans",orcs:"endTurnOrcs",elves:"endTurnElves",dwarves:"endTurnDwarves"}[i],e)}function ic(i,e="icon"){return Q({humans:"superpowerHumans",orcs:"superpowerOrcs",elves:"superpowerElves",dwarves:"superpowerDwarves"}[i],e)}function Zs(i,e="icon"){switch(i){case"warrior":return Q("swords",e);case"defender":case"ironbreaker":return Q("shield",e);case"archer":case"elven_sentinel":return Q("bow",e);case"rider":case"rohirrim_knight":return Q("horse",e);case"catapult":return Q("catapult",e);case"uruk_berserker":return Q("axe",e);case"dragon":return Q("superpowerDwarves",e);case"watchtower":return Q("tower",e);default:return Q("swords",e)}}function sl(i,e="icon",t=""){const n=`${i} ${t}`.toLowerCase(),s=i.toLowerCase();return s in il?Q(s,e):n.includes("capture")||n.includes("crown")?Q("crown",e):n.includes("ruins")||n.includes("explore")||i.includes("🏛")?Q("ruins",e):n.includes("recover")||n.includes("heal")||n.includes("heart")||i.includes("💚")?Q("heart",e):n.includes("promote")||n.includes("vet")||i.includes("⭐")?Q("star",e):n.includes("harvest")||n.includes("berry")||n.includes("berries")||n.includes("farm")||n.includes("wheat")||i.includes("🌾")||i.includes("🫐")?Q("wheat",e):n.includes("game")||i.includes("🦌")?Q("bow",e):n.includes("mine")||n.includes("ore")||n.includes("mithril")||n.includes("pick")||i.includes("⛏")||i.includes("💎")?Q("pickaxe",e):n.includes("forge")||n.includes("anvil")||n.includes("foundry")||n.includes("slag")||n.includes("workshop")||i.includes("⚒")||i.includes("🔥")||i.includes("🕳")?Q("anvil",e):n.includes("road")||i.includes("🛤")?Q("road",e):n.includes("chop")||n.includes("axe")||i.includes("🪓")?Q("axe",e):n.includes("sanctuary")||i.includes("🌿")?Q("leaf",e):n.includes("plant")||n.includes("wood")||n.includes("tree")||i.includes("🌳")?Q("tree",e):n.includes("rider")||n.includes("knight")||n.includes("horse")?Q("horse",e):n.includes("arch")||n.includes("sentinel")||n.includes("bow")?Q("bow",e):n.includes("catapult")||n.includes("siege")?Q("catapult",e):n.includes("def")||n.includes("shield")||n.includes("ironbreaker")?Q("shield",e):n.includes("windmill")||n.includes("build")||n.includes("tower")||i.includes("🌬")?Q("tower",e):Q("swords",e)}function Nu(i){const e=i.showName??!0,t=i.animate??!0;return`
    <div class="${["alderwick-scene",`is-${i.variant}`,`pose-${i.pose}`,t?"is-entering":"",i.nudged?"is-nudged":"",i.extraClass??""].filter(Boolean).join(" ")}">
      <div class="alderwick-figure-wrap" aria-hidden="true">
        <img
          class="alderwick-figure"
          src="${lf[i.pose]}"
          alt=""
          draggable="false"
        />
        <span class="alderwick-figure-shadow"></span>
      </div>
      <div class="alderwick-bubble" role="group" aria-label="${js} says">
        ${e?`<span class="alderwick-bubble-name">${Q("star","icon icon-xs")}<span>${cf}</span></span>`:""}
        ${i.headerHtml?`<div class="alderwick-bubble-header">${i.headerHtml}</div>`:""}
        <div class="alderwick-bubble-body">${i.bodyHtml}</div>
        ${i.actionsHtml?`<div class="alderwick-bubble-actions">${i.actionsHtml}</div>`:""}
      </div>
    </div>
  `}function Wa(i,e,t,n=""){let s=0;const r=()=>{const a=e[s];if(!a)return;const o=s===e.length-1,l=e.length>1?`<span class="alderwick-page-dots" aria-hidden="true">${e.map((d,u)=>`<i class="${u===s?"is-active":""}"></i>`).join("")}</span>`:"";i.innerHTML=Nu({pose:a.pose,variant:"stage",bodyHtml:a.bodyHtml,headerHtml:a.headerHtml,extraClass:n,actionsHtml:`
        ${l}
        <button type="button" class="btn btn-cta alderwick-bubble-cta" data-alderwick-advance>
          <span>${a.actionLabel}</span>
          ${Q("chevronRight","icon icon-sm")}
        </button>
      `});const c=i.querySelector("[data-alderwick-advance]");c?.addEventListener("click",()=>{if(o){t();return}s+=1,r()}),c?.focus({preventScroll:!0})};r()}let Dc=!1;typeof window<"u"&&typeof document<"u"&&window.EldermereAndroid&&document.documentElement.classList.add("android-webview");function vf(){if(!(Dc||typeof window>"u")){Dc=!0;try{window.EldermereAndroid?.onGameReady?.()}catch{}}}function yf(){return typeof window<"u"&&!!window.EldermereAndroid}function dt(i){if(!(typeof window>"u"))try{window.EldermereAndroid?.haptic?.(i)}catch{}}function _f(){if(typeof window>"u")return!1;try{if(typeof window.EldermereAndroid?.resetAppStateAndExit=="function")return window.EldermereAndroid.resetAppStateAndExit(),!0}catch{}return!1}function Fu(i){const e=(i|0)>>>0;return e===0?1831565813:e}function jt(i){const e=i+1831565813>>>0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,{value:((t^t>>>14)>>>0)/4294967296,nextState:e}}function Nt(i,e,t){if(t<=e)return{value:e,nextState:i};const{value:n,nextState:s}=jt(i);return{value:e+Math.floor(n*(t-e+1)),nextState:s}}function es(i,e){const t=i.slice();let n=e;for(let s=t.length-1;s>0;s--){const r=Nt(n,0,s);n=r.nextState;const a=r.value,o=t[s];t[s]=t[a],t[a]=o}return{result:t,nextState:n}}function ia(i,e,t,n){let s=Math.imul(i,374761393)+Math.imul(e,668265263)+Math.imul(t,1442695041)+n|0;return s=Math.imul(s^s>>>13,1274126177),s=s^s>>>16,(s>>>0)/4294967296}function kc(i){return i*i*(3-2*i)}function go(i,e,t){const n=i+t.offsetX,s=e+t.offsetY,r=Math.floor(n),a=Math.floor(s),o=kc(n-r),l=kc(s-a),c=ia(r,a,t.seedA,t.seedB),d=ia(r+1,a,t.seedA,t.seedB),u=ia(r,a+1,t.seedA,t.seedB),h=ia(r+1,a+1,t.seedA,t.seedB),f=c+(d-c)*o,g=u+(h-u)*o;return f+(g-f)*l}function Tr(i,e,t,n){const s=go(i*t,e*t,n),r=go(i*t*2.05+17.3,e*t*2.05-9.1,n),a=go(i*t*4.1-11.7,e*t*4.1+23.4,n);return s*.58+r*.28+a*.14}function sa(i){const e=Nt(i,1,1073741823),t=Nt(e.nextState,1,1073741823),n=jt(t.nextState),s=jt(n.nextState);return{field:{seedA:e.value,seedB:t.value,offsetX:n.value*97,offsetY:s.value*97},nextState:s.nextState}}function Dn(i,e){return Math.hypot(i.x-e.x,i.y-e.y)}function Zt(i,e,t,n){return t<0||n<0||t>=e||n>=e?null:i[Ke(t,n,e)]??null}function Vr(i){return i.terrain!=="water"&&i.terrain!=="mountain"}function Er(i){return i==="orcs"?"wasteland":"plains"}function wf(i,e){let t=e;const n=2,s=i-3,r=i===18?7:6,a=i*.44,o=(i-1)/2,l=v=>(v.x<=3||v.x>=i-4)&&(v.y<=3||v.y>=i-4),c=[];for(let v=0;v<64;v++){const m=[];for(let x=0;x<4;x++){let E=!1;for(let M=0;M<40;M++){const S=Nt(t,n,s),A=Nt(S.nextState,n,s);t=A.nextState;const I={x:S.value,y:A.value};if(m.every(P=>vt(I,P)>=r&&Dn(I,P)>=a)){m.push(I),E=!0;break}}if(!E)break}if(m.length<4)continue;let p=1/0;const y=[];for(let x=0;x<4;x++){let E=1/0;for(let M=0;M<4;M++){if(x===M)continue;const S=Dn(m[x],m[M]);S<E&&(E=S),S<p&&(p=S)}y.push(E)}const w=Math.max(...y)-Math.min(...y);if(w>2.8)continue;const _=m.filter(l).length,b=m.filter(x=>Math.hypot(x.x-o,x.y-o)<=i*.34).length,T=(_===4?-3.5:_<=2?1.8:.6)+(b>=1&&b<=2?1.4:0);c.push({points:m,score:p*1.5-w*2.6+T})}let d;if(c.length>0){c.sort((p,y)=>y.score-p.score);const v=c.slice(0,Math.min(6,c.length)),m=Nt(t,0,v.length-1);t=m.nextState,d=v[m.value].points}else{const v=jt(t);t=v.nextState;const m=v.value*Math.PI*2,p=i*.32;d=[0,1,2,3].map(y=>{const w=m+y*Math.PI/2;return{x:Math.max(n,Math.min(s,Math.round(o+Math.cos(w)*p))),y:Math.max(n,Math.min(s,Math.round(o+Math.sin(w)*p)))}})}const u=es(Kt,t);t=u.nextState;const h=[];for(let v=0;v<4;v++){const m=jt(t);t=m.nextState,h.push({x:d[v].x,y:d[v].y,biome:u.result[v],stretch:.86+m.value*.26,isPrimary:!0})}const f=es([...Kt,...Kt],t);t=f.nextState;const g=i===18?8:6;for(let v=0;v<g;v++)for(let m=0;m<25;m++){const p=Nt(t,1,i-2),y=Nt(p.nextState,1,i-2),w=jt(y.nextState);t=w.nextState;const _={x:p.value,y:y.value};if(!d.some(b=>vt(_,b)<=3)){h.push({x:_.x,y:_.y,biome:f.result[v%f.result.length],stretch:1.12+w.value*.55,isPrimary:!1});break}}return{seeds:h,nextState:t}}function Mf(i,e,t,n){if(e>(i==="dwarves"?.54:i==="orcs"?.67:i==="humans"?.77:.78))return"mountain";if(e<.21&&t>.55)return"water";switch(i){case"humans":return t>.69&&n>.35?"forest":"plains";case"orcs":return t<.6||e>.48?"wasteland":t>.7&&n>.38?"forest":"plains";case"elves":return t>.64&&n>.44?"ancient_woods":t>.36?"forest":"plains";case"dwarves":return t>.56&&n>.3?"forest":"plains"}}function Sf(i,e,t,n,s){let r=s;const a=t.find(M=>M.biome==="dwarves")??t[0],o=[{start:{x:a.x,y:a.y},len:e===18?10:8,nearAnchor:!0}],l=Nt(r,2,e-3),c=Nt(l.nextState,2,e-3);r=c.nextState,o.push({start:{x:l.value,y:c.value},len:e===18?7:6,nearAnchor:!1});for(const M of o){const S=jt(r);r=S.nextState;let A=S.value*Math.PI*2,I=M.start.x-Math.cos(A)*(M.len*.42),P=M.start.y-Math.sin(A)*(M.len*.42);const F=Math.floor(M.len*.35),H=Math.floor(M.len*.72);for(let $=0;$<M.len;$++){const Z=Math.round(I),V=Math.round(P);if($!==F&&$!==H&&Z>=1&&V>=1&&Z<e-1&&V<e-1){const G=Zt(i,e,Z,V);G&&G.terrain!=="water"&&(G.terrain="mountain",M.nearAnchor&&(G.biome="dwarves"))}const K=jt(r);r=K.nextState,A+=(K.value-.5)*.72,I+=Math.cos(A)*1.05,P+=Math.sin(A)*1.05}}const d=t.find(M=>M.biome==="elves");if(d)for(let M=1;M<e-1;M++)for(let S=1;S<e-1;S++){if(Dn({x:S,y:M},d)>3.8)continue;const I=Zt(i,e,S,M);if(!I||I.terrain==="water"||I.terrain==="mountain")continue;const P=jt(r);r=P.nextState,P.value<.72&&(I.biome="elves",I.terrain=P.value<.24?"ancient_woods":"forest")}const u=t.find(M=>M.biome==="humans");if(u)for(let M=1;M<e-1;M++)for(let S=1;S<e-1;S++){if(Dn({x:S,y:M},u)>3.8)continue;const I=Zt(i,e,S,M);if(!I||I.terrain==="water")continue;const P=jt(r);r=P.nextState,P.value<.78&&(I.biome="humans",I.terrain=P.value<.14?"forest":"plains")}const h=t.find(M=>M.biome==="orcs");if(h)for(let M=1;M<e-1;M++)for(let S=1;S<e-1;S++){if(Dn({x:S,y:M},h)>3.6)continue;const I=Zt(i,e,S,M);if(!I||I.terrain==="water"||I.terrain==="mountain")continue;const P=jt(r);r=P.nextState,P.value<.74&&(I.biome="orcs",I.terrain=P.value<.18?"forest":"wasteland")}const f=e===18?[9,5,4]:[8,4],g=[],v=[];for(let M=1;M<e-1;M++)for(let S=1;S<e-1;S++){if(t.some(I=>vt({x:S,y:M},I)<=2))continue;const A=jt(r);r=A.nextState,v.push({coord:{x:S,y:M},rank:Tr(S,M,.16,n)+A.value*.25})}v.sort((M,S)=>M.rank-S.rank);const m=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:-1,y:-1}];for(const M of f){let S=null;for(const V of v)if(!g.some(K=>vt(V.coord,K)<5)){S=V.coord;break}if(!S)break;const A=Nt(r,-1,2);r=A.nextState;const I=Math.max(3,M+A.value),P=[S],F=Zt(i,e,S.x,S.y);F&&(F.terrain="water");const H=Nt(r,0,m.length-1);r=H.nextState;const $=m[H.value];let Z=0;for(;P.length<I&&Z++<48;){const V=Nt(r,0,P.length-1);r=V.nextState;const K=P[V.value],G=jt(r);r=G.nextState;let Y=$;if(G.value>.38){const J=Nt(r,0,3);r=J.nextState,Y=m[J.value]}const oe=K.x+Y.x,me=K.y+Y.y;if(oe<0||me<0||oe>=e||me>=e||t.some(J=>vt({x:oe,y:me},J)<=1)||P.some(J=>J.x===oe&&J.y===me))continue;const O=Zt(i,e,oe,me);O&&(O.terrain="water",P.push({x:oe,y:me}))}g.push(S)}const p=Nt(r,5,e===18?8:7),y=Nt(p.nextState,3,e-4),w=Nt(y.nextState,3,e-4),_=jt(w.nextState);r=_.nextState;let b=y.value,T=w.value,x=_.value*Math.PI*2;const E=new Set;for(let M=0;M<p.value;M++){const S=Math.round(b),A=Math.round(T),I=`${S},${A}`;if(!E.has(I)&&S>=1&&A>=1&&S<e-1&&A<e-1&&!t.some(F=>vt({x:S,y:A},F)<=1)){const F=Zt(i,e,S,A);F&&(F.terrain="water",E.add(I))}const P=jt(r);r=P.nextState,x+=(P.value-.5)*1.1,b+=Math.cos(x),T+=Math.sin(x)}return r}function bf(i,e,t,n,s){const r=Zt(i,e,t,n);if(!r||r.terrain==="water")return-1e3;let a=0,o=0,l=0,c=0,d=0,u=0,h=0,f=0;for(let m=-2;m<=2;m++)for(let p=-2;p<=2;p++){if(p===0&&m===0)continue;const y=Zt(i,e,t+p,n+m);if(!y)continue;const w=Math.max(Math.abs(p),Math.abs(m)),_=w===1?1.6:1;switch(y.biome===s&&(h+=_),w===1&&Vr(y)&&f++,y.terrain){case"plains":a+=_;break;case"forest":o+=_;break;case"ancient_woods":l+=_;break;case"mountain":c+=_;break;case"wasteland":d+=_;break;case"water":u+=_;break}}const g=u*2.2,v=f>=4?4:-6;switch(s){case"humans":return a*3+Math.min(o,4)*1.1+h*1.4-c*1.4-d*1.6-g+v;case"elves":return l*3.6+o*2.8+h*1.4-d*2-c*1.1-g+v;case"dwarves":return Math.min(c,10)*3.2-Math.max(0,c-11)*1.5+a*.9+o*.6+h*1.4-d*1.4-g+(f>=3?3:-4);case"orcs":return d*3+Math.min(o,5)*1.2+Math.min(c,4)*.7+h*1.4-l*1.2-g+v}}function xf(i,e,t,n){let s=n;const r=2,a=e-3,o=e===18?7:6,l=e*.42,c={};for(const p of Kt){const y=[];for(let w=r;w<=a;w++)for(let _=r;_<=a;_++){const b=bf(i,e,_,w,p);if(b<=-500)continue;const T=jt(s);s=T.nextState,y.push({coord:{x:_,y:w},affinity:b+T.value*1.5})}y.sort((w,_)=>_.affinity-w.affinity),c[p]=y.slice(0,14)}let d=null,u=-1/0;const h=c.humans,f=c.orcs,g=c.elves,v=c.dwarves;for(const p of h)for(const y of f)if(!(vt(p.coord,y.coord)<o||Dn(p.coord,y.coord)<l)){for(const w of g)if(!(vt(w.coord,p.coord)<o||vt(w.coord,y.coord)<o||Dn(w.coord,p.coord)<l||Dn(w.coord,y.coord)<l))for(const _ of v){if(vt(_.coord,p.coord)<o||vt(_.coord,y.coord)<o||vt(_.coord,w.coord)<o||Dn(_.coord,p.coord)<l||Dn(_.coord,y.coord)<l||Dn(_.coord,w.coord)<l)continue;const b=[p.coord,y.coord,w.coord,_.coord],T=b.map((A,I)=>Math.min(...b.filter((P,F)=>F!==I).map(P=>Dn(A,P)))),x=Math.max(...T)-Math.min(...T);if(x>2.95)continue;const E=Math.min(...T),S=p.affinity+y.affinity+w.affinity+_.affinity+E*2-x*4;S>u&&(u=S,d={humans:p.coord,orcs:y.coord,elves:w.coord,dwarves:_.coord})}}if(d)return{capitalCoords:d,nextState:s};const m={};for(const p of t)m[p.biome]={x:p.x,y:p.y};return{capitalCoords:m,nextState:s}}function Tf(i,e,t,n){const s=()=>{const a=new Uint8Array(e*e),o=Ke(t.x,t.y,e);a[o]=1;const l=[t];let c=0;for(;c<l.length;){const d=l[c++];for(let u=-1;u<=1;u++)for(let h=-1;h<=1;h++){if(h===0&&u===0)continue;const f=d.x+h,g=d.y+u,v=Zt(i,e,f,g);if(!v||!Vr(v))continue;const m=Ke(f,g,e);a[m]||(a[m]=1,l.push({x:f,y:g}))}}return a};let r=s();for(const a of n){const o=Ke(a.x,a.y,e);if(r[o])continue;let l=a.x,c=a.y,d=e*4;for(;!r[Ke(l,c,e)]&&d-- >0;){const u=Zt(i,e,l,c);if(u&&!Vr(u)&&(u.terrain=Er(u.biome),(u.resource==="ore"||u.resource==="mithril")&&(u.resource=null)),l===t.x&&c===t.y)break;l<t.x?l++:l>t.x&&l--,c<t.y?c++:c>t.y&&c--}r=s()}}function Bu(i,e){let t=e;const n=sa(t),s=sa(n.nextState),r=sa(s.nextState),a=sa(r.nextState);t=a.nextState;const o=n.field,l=s.field,c=r.field,d=a.field,u=wf(i,t),h=u.seeds,f=h.filter(G=>G.isPrimary);t=u.nextState;const g=[],v=2.7;for(let G=0;G<i;G++)for(let Y=0;Y<i;Y++){const oe=(Tr(Y,G,.14,o)-.5)*2*v,me=(Tr(Y,G,.14,l)-.5)*2*v,O=Y+oe,J=G+me;let we="humans",fe=1/0;for(const Ye of h){const yt=Math.hypot(O-Ye.x,J-Ye.y)*Ye.stretch;yt<fe&&(fe=yt,we=Ye.biome)}const De=Tr(Y,G,.17,c),Pe=Tr(Y,G,.15,d),Be=jt(t);t=Be.nextState;const mt=Mf(we,De,Pe,Be.value);g.push({x:Y,y:G,terrain:mt,biome:we,resource:null,improvement:null,hasRoad:!1,hasVillage:!1,cityId:null,isCityCenter:!1,unitId:null})}t=Sf(g,i,f,c,t);const m=xf(g,i,f,t),p=m.capitalCoords;t=m.nextState;for(const G of Kt){const Y=p[G],oe=Zt(g,i,Y.x,Y.y);oe.terrain=Er(G),oe.biome=G,oe.resource=null,oe.hasVillage=!1}for(const G of Kt){const Y=p[G],oe=[];for(let J=-1;J<=1;J++)for(let we=-1;we<=1;we++){if(we===0&&J===0)continue;const fe=Zt(g,i,Y.x+we,Y.y+J);fe&&oe.push(fe)}const me=es(oe,t);t=me.nextState;const O=me.result;for(const J of O)J.biome=G,(J.terrain==="water"||J.terrain==="mountain")&&(J.terrain=Er(G)),J.resource=null;G==="humans"?(O[0].terrain="plains",O[0].resource="berries",O[1].terrain="plains",O[1].resource="berries",O[2].terrain="plains",O[3].terrain="plains",O[4].terrain="forest",O[4].resource="game"):G==="orcs"?(O[0].terrain="plains",O[0].resource="berries",O[1].terrain="forest",O[1].resource="game",O[2].terrain="wasteland",O[3].terrain="wasteland",O[4].terrain="forest"):G==="elves"?(O[0].terrain="ancient_woods",O[0].resource="berries",O[1].terrain="ancient_woods",O[2].terrain="ancient_woods",O[3].terrain="forest",O[3].resource="game",O[4].terrain="plains"):G==="dwarves"&&(O[0].terrain="mountain",O[0].resource="ore",O[1].terrain="mountain",O[1].resource="mithril",O[2].terrain="plains",O[2].resource="berries",O[3].terrain="forest",O[3].resource="game",O[4].terrain="plains")}const y=i===18?18:14,w=i===18?16:12,_=Kt.map(G=>p[G]),b=[],T=(G,Y,oe)=>{if(G<1||Y<1||G>=i-1||Y>=i-1)return!1;for(const me of Kt)if(vt({x:G,y:Y},p[me])<3)return!1;for(const me of _)if(vt({x:G,y:Y},me)<oe)return!1;return!0},x=G=>{const Y=Zt(g,i,G.x,G.y);Y.terrain=Er(Y.biome),Y.hasVillage=!0,Y.resource=null,_.push(G),b.push(G)},E=es(Kt,t);t=E.nextState;for(let G=0;G<2;G++)for(const Y of E.result){const oe=p[Y],me=[[3,4,3],[3,5,3],[3,6,3],[3,6,2]];let O=!1;for(const[J,we,fe]of me){if(O)break;const De=[];for(let Pe=1;Pe<i-1;Pe++)for(let Be=1;Be<i-1;Be++){const mt=vt({x:Be,y:Pe},oe);if(mt<J||mt>we||!T(Be,Pe,fe))continue;const Ye=(Be-oe.x)**2+(Pe-oe.y)**2;let yt=!0;for(const k of Kt){if(k===Y)continue;const on=p[k];if((Be-on.x)**2+(Pe-on.y)**2<=Ye){yt=!1;break}}yt&&De.push({x:Be,y:Pe})}if(De.length>0){const Pe=De.filter(Ye=>{const yt=Zt(g,i,Ye.x,Ye.y);return yt!==null&&yt.terrain!=="water"}),Be=Pe.length>0?Pe:De,mt=Nt(t,0,Be.length-1);t=mt.nextState,x(Be[mt.value]),O=!0}}}const M=[],S=[];for(let G=1;G<i-1;G++)for(let Y=1;Y<i-1;Y++)Y>=2&&G>=2&&Y<=i-3&&G<=i-3?M.push({x:Y,y:G}):S.push({x:Y,y:G});const A=es(M,t);t=A.nextState;const I=es(S,t);t=I.nextState;const P=(G,Y,oe,me)=>{for(const O of G){if(b.length>=me)break;if(!T(O.x,O.y,Y))continue;const J=Zt(g,i,O.x,O.y);J&&(!oe&&J.terrain==="water"||x(O))}};P(A.result,3,!1,y),P(I.result,3,!1,y),P(A.result,3,!0,y),P(I.result,3,!0,y),b.length<w&&(P(A.result,2,!0,w),P(I.result,2,!0,w));for(const G of b){let Y=0;const oe=[];for(let me=-1;me<=1;me++)for(let O=-1;O<=1;O++){if(O===0&&me===0)continue;const J=Zt(g,i,G.x+O,G.y+me);J&&(Vr(J)?Y++:J.terrain==="water"&&oe.push(J))}for(;Y<4&&oe.length>0;){const me=oe.pop();me.terrain=Er(me.biome),Y++}}const F=i===18?8:6,H=[],$=(G,Y)=>{if(G.hasVillage||G.resource==="ruins"||!Vr(G))return!1;for(const oe of Kt)if(vt(G,p[oe])<=2)return!1;return!H.some(oe=>vt(G,oe)<Y)};for(const G of E.result){if(H.length>=F)break;const Y=p[G],oe=g.filter(me=>$(me,3)&&vt(me,Y)>=3&&vt(me,Y)<=6);if(oe.length>0){const me=Nt(t,0,oe.length-1);t=me.nextState;const O=oe[me.value];O.resource="ruins",H.push({x:O.x,y:O.y})}}const Z=es(g.filter(G=>$(G,2)),t);t=Z.nextState;for(const G of[3,2])for(const Y of Z.result){if(H.length>=F)break;$(Y,G)&&(Y.resource="ruins",H.push({x:Y.x,y:Y.y}))}for(const G of g){if(G.hasVillage||G.resource!==null)continue;let Y=!1;for(const me of Kt)if(vt(G,p[me])<=1){Y=!0;break}if(Y)continue;const oe=jt(t);t=oe.nextState,G.terrain==="plains"&&oe.value<.22?G.resource="berries":(G.terrain==="forest"||G.terrain==="ancient_woods")&&oe.value<.3?G.resource=oe.value<.1?"berries":"game":G.terrain==="mountain"&&oe.value<.48&&(G.resource=oe.value<.15?"mithril":"ore")}for(const G of b){const Y=[];let oe=!1;for(let me=-1;me<=1;me++){for(let O=-1;O<=1;O++){if(O===0&&me===0)continue;const J=Zt(g,i,G.x+O,G.y+me);if(!(!J||J.hasVillage)){if(J.resource!==null&&J.resource!=="ruins"){oe=!0;break}J.resource===null&&J.terrain!=="water"&&Y.push(J)}}if(oe)break}if(!oe&&Y.length>0){const me=Nt(t,0,Y.length-1);t=me.nextState;const O=Y[me.value];O.terrain==="mountain"?O.resource="ore":O.terrain==="forest"||O.terrain==="ancient_woods"?O.resource="game":(O.terrain="plains",O.resource="berries")}}const V=p[Kt[0]],K=[...Kt.map(G=>p[G]),...b,...H];return Tf(g,i,V,K),{tiles:g,capitalCoords:p,rngState:t}}function Hu(i,e){const t=Bt[e.type];let n=t.attack;const s=ke(i,e.ownerId),r=he(i,e.x,e.y);return!s||!r||(Te(s,"humans_plains_charge")&&(e.type==="rider"||e.type==="rohirrim_knight")&&r.terrain==="plains"&&(n+=.5),Te(s,"humans_siegecraft")&&e.type==="catapult"&&(n+=.5),Te(s,"orcs_pack_tactics")&&e.type==="rider"&&(n+=.5),Te(s,"orcs_mount_doom")&&e.type==="catapult"&&(n+=1),Te(s,"elves_woodland_aim")&&t.range>1&&(r.terrain==="forest"||r.terrain==="ancient_woods")&&(n+=.5),Te(s,"elves_galadhrim_precision")&&e.type==="elven_sentinel"&&(n+=.5),Te(s,"dwarves_horned_charge")&&e.type==="rider"&&(n+=.5),Te(s,"dwarves_dragon_slayers")&&e.type==="catapult"&&(n+=.5),(i.eclipseTurnsRemaining??0)>0&&i.eclipseOwnerId===s.id&&(n+=1)),n}function zu(i,e){const t=Bt[e.type];let n=t.defense;const s=ke(i,e.ownerId);return s&&s.faction==="dwarves"&&Te(s,"dwarves_runic_plate")&&t.range===1&&(n+=.5),n}function Ef(i,e,t){const n=he(i,e.x,e.y),s=ke(i,e.ownerId);if(!n||!s)return 1;let r=1;if(n.terrain==="mountain"?r=Math.max(r,s.faction==="dwarves"?1.75:1.5):n.terrain==="forest"||n.terrain==="ancient_woods"?r=Math.max(r,1.5):n.terrain==="plains"&&(e.type==="defender"&&Te(s,"elves_graceful_guard")&&(r=Math.max(r,1.5)),(e.type==="ironbreaker"||e.type==="defender")&&Te(s,"dwarves_mithril_phalanx")&&(r=Math.max(r,1.75))),n.isCityCenter&&n.cityId){const a=i.cities[n.cityId];a&&a.ownerId===e.ownerId&&(a.hasWalls&&!t?r=Math.max(r,2):un(i,e,"fortify")&&(r=Math.max(r,1.5)))}return r}function $a(i,e,t){const n=i.units[e],s=i.units[t];if(!n||!s)return{attackerId:e,defenderId:t,attackerDamage:0,retaliationDamage:0,defenderKilled:!1,attackerKilled:!1,terrainDefenseBonus:1,willAdvance:!1};const r=Va(i,n),a=Va(i,s),o=ke(i,n.ownerId),l=Hu(i,n),c=zu(i,s),d=un(i,n,"siege"),u=Ef(i,s,d),h=un(i,n,"bloodlust")?1:Math.max(0,n.hp)/n.maxHp,f=Math.max(0,s.hp)/s.maxHp,g=l*h,v=c*f*u,m=g+v,p=r>1;let y=0;m>0&&(y=Math.round(g/m*l*4.5),o&&n.type==="archer"&&Te(o,"orcs_black_arrows")&&s.hp<s.maxHp&&(y+=1),p&&un(i,s,"stalwart")&&(y=Math.max(0,y-1)));const _=s.hp-y<=0;let b=0;const T=vt(n,s);!_&&T<=a&&m>0&&c>0&&(b=Math.round(v/m*c*4.5),a>1&&un(i,n,"stalwart")&&(b=Math.max(0,b-1)));const x=!_&&n.hp-b<=0;return{attackerId:e,defenderId:t,attackerDamage:y,retaliationDamage:b,defenderKilled:_,attackerKilled:x,terrainDefenseBonus:u,willAdvance:_&&!p}}function sc(i,e){const t=`${e}_${i.nextEntityId}`;return i.nextEntityId+=1,t}function Ui(i,e,t,n,s){const r=[];for(let a=-s;a<=s;a++)for(let o=-s;o<=s;o++){const l=t+o,c=n+a;if(l<0||c<0||l>=i.mapSize||c>=i.mapSize)continue;const d=Ke(l,c,i.mapSize);e.revealedTiles[d]||(e.revealedTiles[d]=!0,r.push({x:l,y:c}))}return r}function vo(i,e,t,n){const s=he(i,t,n);if(!s)return 1;let r=1;return(s.terrain==="mountain"||Te(e,"elves_keen_sight")&&(s.terrain==="forest"||s.terrain==="ancient_woods"))&&(r=2),r}function rl(i,e){const t=e.borderRadius;for(let s=-t;s<=t;s++)for(let r=-t;r<=t;r++){const a=he(i,e.x+r,e.y+s);a&&a.cityId===null&&(a.cityId=e.id)}const n=he(i,e.x,e.y);n&&(n.cityId=e.id,n.isCityCenter=!0,n.hasVillage=!1)}function Af(i,e){const t=new Set(Object.values(i.cities).map(r=>r.name)),n=nt[e].cityNames;for(const r of n)if(!t.has(r))return r;let s=2;for(;;){for(const r of n){const a=`${r} ${s}`;if(!t.has(a))return a}s++}}function Xa(i){for(const e of i.players){if(e.faction==="humans"){const t=tc(i,e.id);for(const n of Wt(i,e.id))n.connectedToCapital=t.has(n.id)}e.goldPerTurn=nc(i,e.id),e.score=ro(i,e.id)}}function Ns(i,e,t,n){if(t<=0)return;e.population+=t;const s=ke(i,e.ownerId);for(;e.population>=e.level+1;)e.population-=e.level+1,e.level+=1,e.pendingLevelRewards.push(e.level),s&&Te(s,"dwarves_stone_walls")&&e.level>=2&&(e.hasWalls=!0),n.push({type:"CITY_LEVELED",cityId:e.id,coord:{x:e.x,y:e.y},newLevel:e.level,ownerId:e.ownerId})}function Rf(i,e,t,n,s){const r=he(i,t,n);if(!r||r.resource!=="ruins")return;r.resource=null;const a=Te(e,"humans_hunting")?2:0;a>0&&(e.gold+=a);const o=ti(e.faction).filter(h=>h.tier===1&&!Te(e,h.id)).map(h=>h.id),l=Wt(i,e.id),c=["gold"];o.length>0&&c.push("tech"),l.length>0&&c.push("population");const d=Nt(i.rngState,0,c.length-1);i.rngState=d.nextState;const u=c[d.value];if(u==="gold")e.gold+=5,s.push({type:"RUINS_CLAIMED",coord:{x:t,y:n},playerId:e.id,rewardKind:"gold",amount:5+a});else if(u==="tech"){const h=Nt(i.rngState,0,o.length-1);i.rngState=h.nextState;const f=o[h.value];e.techs.push(f),s.push({type:"RUINS_CLAIMED",coord:{x:t,y:n},playerId:e.id,rewardKind:"tech",techId:f,amount:a>0?a:void 0}),s.push({type:"TECH_RESEARCHED",playerId:e.id,techId:f,cost:0})}else{let h=l[0],f=vt({x:t,y:n},h);for(let g=1;g<l.length;g++){const v=vt({x:t,y:n},l[g]);v<f&&(f=v,h=l[g])}s.push({type:"RUINS_CLAIMED",coord:{x:t,y:n},playerId:e.id,rewardKind:"population",amount:3,cityId:h.id}),Ns(i,h,3,s)}}function Ar(i,e,t,n,s,r,a){const o=Jl(i,e,t)+(a?.bonusMaxHp??0),l=a?.ready??!1,c={id:sc(i,"unit"),type:t,ownerId:e,homeCityId:r,x:n,y:s,hp:o,maxHp:o,kills:0,isVeteran:a?.isVeteran??!1,canPromote:!1,hasMoved:!l,hasAttacked:!l,canEscapeMove:!1,canPersistAttack:!1,actedThisTurn:!l,canCapture:!1,canExploreRuins:!1};i.units[c.id]=c;const d=he(i,n,s);return d&&(d.unitId=c.id),c}function Uc(i){const e=Fu(i.seed),t=Bu(i.mapSize,e),s=[i.humanFaction,...Kt.filter(a=>a!==i.humanFaction)].map(a=>{const o=nt[a];return{id:`player_${a}`,faction:a,name:o.name,isHuman:a===i.humanFaction,gold:o.startingGold,goldPerTurn:0,score:0,techs:[o.startingTech],revealedTiles:new Array(i.mapSize*i.mapSize).fill(!1),alive:!0,eliminatedOnTurn:null,superpowerUsed:!1}}),r={config:{...i},mapSize:i.mapSize,turn:1,activePlayerIndex:0,phase:"playing",winnerId:null,winReason:null,eclipseTurnsRemaining:0,eclipseOwnerId:null,rngState:t.rngState,nextEntityId:1,players:s,tiles:t.tiles,cities:{},units:{}};for(const a of r.players){const o=nt[a.faction],l=t.capitalCoords[a.faction],c=sc(r,"city"),d={id:c,name:o.cityNames[0],ownerId:a.id,styleFaction:a.faction,x:l.x,y:l.y,isCapital:!0,level:1,population:0,hasWorkshop:!1,hasWalls:!1,borderRadius:1,parks:0,pendingLevelRewards:[],connectedToCapital:!0};r.cities[c]=d,rl(r,d),Ui(r,a,l.x,l.y,2),Ar(r,a.id,o.startingUnit,l.x,l.y,c,{ready:!0})}return Xa(r),r}function Gu(i){const e={};for(const[n,s]of Object.entries(i.cities))e[n]={...s,pendingLevelRewards:s.pendingLevelRewards.slice()};const t={};for(const[n,s]of Object.entries(i.units))t[n]={...s};return{config:{...i.config},mapSize:i.mapSize,turn:i.turn,activePlayerIndex:i.activePlayerIndex,phase:i.phase,winnerId:i.winnerId,winReason:i.winReason,eclipseTurnsRemaining:i.eclipseTurnsRemaining??0,eclipseOwnerId:i.eclipseOwnerId??null,rngState:i.rngState,nextEntityId:i.nextEntityId,players:i.players.map(n=>({...n,superpowerUsed:n.superpowerUsed??!1,techs:n.techs.slice(),revealedTiles:n.revealedTiles.slice()})),tiles:i.tiles.map(n=>({...n})),cities:e,units:t}}function Cf(i,e){return i===2?e==="workshop"||e==="explorer":i===3?e==="city_wall"||e==="resources":i===4?e==="border_growth"||e==="pop_growth":i>=5?e==="champion"||e==="park":!1}function Oc(i){const e={};for(const t of i.players)e[t.id]=ro(i,t.id),t.score=e[t.id];return e}function If(i,e){const t=Object.values(i.cities).filter(s=>s.isCapital);if(t.length>0&&t.every(s=>s.ownerId===e))return!0;const n=i.players.filter(s=>s.alive);return n.length===1&&n[0].id===e}function Pf(i,e,t){const n=Wt(i,e.id),s=new Set;if(Te(e,"humans_citadel_masonry"))for(const o of n){if(!o.hasWalls)continue;const l=he(i,o.x,o.y);if(!l||!l.unitId)continue;const c=i.units[l.unitId];if(c&&c.ownerId===e.id&&c.hp<c.maxHp&&!s.has(c.id)){const d=c.hp;c.hp=Math.min(c.maxHp,c.hp+2),s.add(c.id),t.push({type:"UNIT_HEALED",unitId:c.id,coord:{x:c.x,y:c.y},amount:c.hp-d,newHp:c.hp})}}if(Te(e,"elves_rings_preservation"))for(const a of n)for(let o=-1;o<=1;o++)for(let l=-1;l<=1;l++){const c=he(i,a.x+l,a.y+o);if(!c||!c.unitId)continue;const d=i.units[c.unitId];if(d&&d.ownerId===e.id&&d.hp<d.maxHp&&!s.has(d.id)){const u=d.hp;d.hp=Math.min(d.maxHp,d.hp+2),s.add(d.id),t.push({type:"UNIT_HEALED",unitId:d.id,coord:{x:d.x,y:d.y},amount:d.hp-u,newHp:d.hp})}}if(Te(e,"elves_wind_riders"))for(const a of Object.values(i.units)){if(a.ownerId!==e.id||a.hp>=a.maxHp||s.has(a.id))continue;const o=he(i,a.x,a.y);if(o&&o.cityId&&i.cities[o.cityId]?.ownerId===e.id){const l=a.hp;a.hp=Math.min(a.maxHp,a.hp+2),s.add(a.id),t.push({type:"UNIT_HEALED",unitId:a.id,coord:{x:a.x,y:a.y},amount:a.hp-l,newHp:a.hp})}}Xa(i);const r=nc(i,e.id);e.gold+=r,e.goldPerTurn=r;for(const a of Object.values(i.units))a.ownerId===e.id&&(a.hasMoved=!1,a.hasAttacked=!1,a.canEscapeMove=!1,a.canPersistAttack=!1,a.actedThisTurn=!1,a.canCapture=ec(i,e.id,a.x,a.y),a.canExploreRuins=Uu(i,a.x,a.y));t.push({type:"TURN_STARTED",playerId:e.id,turn:i.turn,goldGained:r})}function Oa(i,e){const t=Gu(i),n=[];if(t.phase==="game_over")return{state:t,events:n};const s=Us(t);if(!s||!s.alive)return{state:t,events:n};switch(e.type){case"MOVE_UNIT":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||!zr(t,r.id).some(h=>h.x===e.to.x&&h.y===e.to.y))break;const o={x:r.x,y:r.y},l=he(t,o.x,o.y),c=he(t,e.to.x,e.to.y);if(!l||!c||c.unitId!==null)break;l.unitId=null,r.x=e.to.x,r.y=e.to.y,c.unitId=r.id,r.canCapture=!1,r.canExploreRuins=!1,r.canEscapeMove?(r.canEscapeMove=!1,r.hasMoved=!0,r.actedThisTurn=!0):(r.hasMoved=!0,un(t,r,"dash")||(r.actedThisTurn=!0)),n.push({type:"UNIT_MOVED",unitId:r.id,from:o,to:{...e.to},ownerId:s.id});const d=vo(t,s,r.x,r.y),u=Ui(t,s,r.x,r.y,d);u.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:u}),r.actedThisTurn||!r.hasAttacked&&un(t,r,"dash")&&Gs(t,r.id).length>0||(r.actedThisTurn=!0);break}case"ATTACK_UNIT":{const r=t.units[e.attackerId],a=t.units[e.defenderId];if(!r||!a||r.ownerId!==s.id||a.ownerId===s.id||!Gs(t,r.id).some(m=>m.x===a.x&&m.y===a.y))break;r.canCapture=!1,r.canExploreRuins=!1;const l=$a(t,r.id,a.id),c={x:r.x,y:r.y},d={x:a.x,y:a.y},u=Bt[r.type].range>1,h=un(t,a,"stalwart"),f=ke(t,a.ownerId),g=he(t,c.x,c.y),v=he(t,d.x,d.y);if(n.push({type:"UNIT_ATTACKED",attackerId:r.id,defenderId:a.id,from:c,to:d,isRanged:u,damage:l.attackerDamage,retaliationDamage:l.retaliationDamage,defenderKilled:l.defenderKilled,attackerKilled:l.attackerKilled,advanced:l.willAdvance}),l.defenderKilled){if(v&&v.unitId===a.id&&(v.unitId=null),delete t.units[a.id],r.kills+=1,r.kills>=3&&!r.isVeteran&&(r.canPromote=!0),s.faction==="orcs"){const m=Te(s,"orcs_spoils_mastery")?3:2;s.gold+=m,n.push({type:"SPOILS_GAINED",playerId:s.id,coord:d,amount:m})}if(l.willAdvance&&g&&v){g.unitId=null,r.x=d.x,r.y=d.y,v.unitId=r.id;const m=vo(t,s,r.x,r.y),p=Ui(t,s,r.x,r.y,m);p.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:p})}un(t,r,"persist")&&!h?(r.canPersistAttack=!0,r.hasAttacked=!1,r.actedThisTurn=!1):un(t,r,"escape")||un(t,r,"skirmish")?(r.hasAttacked=!0,r.canPersistAttack=!1,r.canEscapeMove=!0,r.actedThisTurn=!1):(r.hasAttacked=!0,r.canPersistAttack=!1,r.actedThisTurn=!0)}else if(a.hp-=l.attackerDamage,r.hp-=l.retaliationDamage,l.attackerKilled){if(g&&g.unitId===r.id&&(g.unitId=null),delete t.units[r.id],a.kills+=1,a.kills>=3&&!a.isVeteran&&(a.canPromote=!0),f&&f.faction==="orcs"){const m=Te(f,"orcs_spoils_mastery")?3:2;f.gold+=m,n.push({type:"SPOILS_GAINED",playerId:f.id,coord:c,amount:m})}}else r.hasAttacked=!0,r.canPersistAttack=!1,un(t,r,"escape")||un(t,r,"skirmish")?(r.canEscapeMove=!0,r.actedThisTurn=!1):r.actedThisTurn=!0;t.units[r.id]&&!r.actedThisTurn&&(r.canPersistAttack?Gs(t,r.id).length===0&&(r.canPersistAttack=!1,r.hasAttacked=!0,r.actedThisTurn=!0):r.canEscapeMove&&zr(t,r.id).length===0&&(r.canEscapeMove=!1,r.actedThisTurn=!0));break}case"CAPTURE_CITY":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||!xi(t,r.id))break;const a=he(t,r.x,r.y);if(!a)break;if(a.hasVillage&&!a.cityId){r.hasMoved=!0,r.hasAttacked=!0,r.canEscapeMove=!1,r.canPersistAttack=!1,r.actedThisTurn=!0,r.canCapture=!1,r.canExploreRuins=!1;const o=sc(t,"city"),l={id:o,name:Af(t,s.faction),ownerId:s.id,styleFaction:s.faction,x:a.x,y:a.y,isCapital:!1,level:1,population:0,hasWorkshop:!1,hasWalls:!1,borderRadius:1,parks:0,pendingLevelRewards:[],connectedToCapital:!1};t.cities[o]=l,rl(t,l);const c=Ui(t,s,a.x,a.y,1);c.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:c});let d;s.faction==="orcs"&&(d=Te(s,"orcs_spoils_mastery")?5:4,s.gold+=d),n.push({type:"CITY_CAPTURED",cityId:o,coord:{x:a.x,y:a.y},oldOwnerId:null,newOwnerId:s.id,wasVillage:!0,spoilsGold:d}),d&&n.push({type:"SPOILS_GAINED",playerId:s.id,coord:{x:a.x,y:a.y},amount:d})}else if(a.isCityCenter&&a.cityId){const o=t.cities[a.cityId];if(!o||o.ownerId===s.id)break;r.hasMoved=!0,r.hasAttacked=!0,r.canEscapeMove=!1,r.canPersistAttack=!1,r.actedThisTurn=!0,r.canCapture=!1,r.canExploreRuins=!1;const l=o.ownerId;o.ownerId=s.id,o.styleFaction=s.faction;for(const h of Object.values(t.units))h.homeCityId===o.id&&h.ownerId===l&&(h.homeCityId=null);Te(s,"dwarves_stone_walls")&&o.level>=2&&(o.hasWalls=!0);const c=Ui(t,s,a.x,a.y,1);c.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:c});let d;s.faction==="orcs"&&(d=Te(s,"orcs_spoils_mastery")?5:4,s.gold+=d),n.push({type:"CITY_CAPTURED",cityId:o.id,coord:{x:a.x,y:a.y},oldOwnerId:l,newOwnerId:s.id,wasVillage:!1,spoilsGold:d}),d&&n.push({type:"SPOILS_GAINED",playerId:s.id,coord:{x:a.x,y:a.y},amount:d});const u=ke(t,l);if(u&&u.alive&&Wt(t,l).length===0){u.alive=!1,u.eliminatedOnTurn=t.turn;for(const h of Object.values(t.units))if(h.ownerId===l){const f=he(t,h.x,h.y);f&&f.unitId===h.id&&(f.unitId=null),delete t.units[h.id]}n.push({type:"PLAYER_ELIMINATED",playerId:l,eliminatedByPlayerId:s.id})}if(If(t,s.id)){Xa(t);const h=Oc(t);return t.phase="game_over",t.winnerId=s.id,t.winReason="domination",n.push({type:"GAME_OVER",winnerId:s.id,reason:"domination",scores:h}),{state:t,events:n}}}break}case"EXPLORE_RUINS":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||!Ti(t,r.id))break;const a=he(t,r.x,r.y);if(!a||a.resource!=="ruins")break;r.hasMoved=!0,r.hasAttacked=!0,r.canEscapeMove=!1,r.canPersistAttack=!1,r.actedThisTurn=!0,r.canCapture=!1,r.canExploreRuins=!1,Rf(t,s,r.x,r.y,n);break}case"RECOVER_UNIT":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||r.hasMoved||r.hasAttacked||r.actedThisTurn||r.hp>=r.maxHp)break;const a=he(t,r.x,r.y),l=a!==null&&a.cityId!==null&&t.cities[a.cityId]?.ownerId===s.id?4:2,c=r.hp;r.hp=Math.min(r.maxHp,r.hp+l),r.hasMoved=!0,r.hasAttacked=!0,r.actedThisTurn=!0,r.canCapture=!1,r.canExploreRuins=!1,n.push({type:"UNIT_HEALED",unitId:r.id,coord:{x:r.x,y:r.y},amount:r.hp-c,newHp:r.hp});break}case"PROMOTE_UNIT":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||!r.canPromote&&r.kills<3||r.isVeteran)break;r.isVeteran=!0,r.canPromote=!1,r.maxHp+=5,r.hp=r.maxHp,!r.actedThisTurn&&!Gr(t,r.id)&&(r.actedThisTurn=!0),n.push({type:"UNIT_PROMOTED",unitId:r.id,coord:{x:r.x,y:r.y},newMaxHp:r.maxHp});break}case"HARVEST_TILE":{if(!Os(t,s.id,e.coord.x,e.coord.y).some(d=>d.type==="HARVEST_TILE"))break;const a=he(t,e.coord.x,e.coord.y);if(!a||!a.cityId||!a.resource||a.resource==="ruins")break;const o=t.cities[a.cityId];if(!o||o.ownerId!==s.id)break;const l=a.resource,c=Du[l];s.gold-=Pr,a.resource=null,n.push({type:"RESOURCE_HARVESTED",coord:{...e.coord},resource:l,cityId:o.id,popGained:c,playerId:s.id}),Ns(t,o,c,n);break}case"BUILD_IMPROVEMENT":{if(!Os(t,s.id,e.coord.x,e.coord.y).some(d=>d.type==="BUILD_IMPROVEMENT"&&d.improvement===e.improvement))break;const a=he(t,e.coord.x,e.coord.y);if(!a||!a.cityId)break;const o=t.cities[a.cityId];if(!o||o.ownerId!==s.id)break;const l=zi[e.improvement],c=Ou(t,e.coord.x,e.coord.y,e.improvement);if(s.gold-=l.cost,a.improvement=e.improvement,n.push({type:"IMPROVEMENT_BUILT",coord:{...e.coord},improvement:e.improvement,cityId:o.id,popGained:c,playerId:s.id}),Ns(t,o,c,n),e.improvement==="farm"||e.improvement==="mine"){const d=e.improvement==="farm"?"windmill":"great_forge",u=e.improvement==="farm"?1:2;for(const h of hs(t,e.coord.x,e.coord.y))if(h.improvement===d&&h.cityId){const f=t.cities[h.cityId];f&&f.ownerId===s.id&&Ns(t,f,u,n)}}break}case"BUILD_ROAD":{if(!Os(t,s.id,e.coord.x,e.coord.y).some(o=>o.type==="BUILD_ROAD"))break;const a=he(t,e.coord.x,e.coord.y);if(!a)break;s.gold-=Lr,a.hasRoad=!0,n.push({type:"ROAD_BUILT",coord:{...e.coord},playerId:s.id});break}case"CHOP_FOREST":{if(!Os(t,s.id,e.coord.x,e.coord.y).some(o=>o.type==="CHOP_FOREST"))break;const a=he(t,e.coord.x,e.coord.y);if(!a)break;a.terrain="plains",a.improvement==="sanctuary"&&(a.improvement=null),s.gold+=nl,n.push({type:"FOREST_CHOPPED",coord:{...e.coord},goldGained:nl,playerId:s.id});break}case"PLANT_ANCIENT_WOODS":{if(!Os(t,s.id,e.coord.x,e.coord.y).some(l=>l.type==="PLANT_ANCIENT_WOODS"))break;const a=he(t,e.coord.x,e.coord.y);if(!a||!a.cityId)break;const o=t.cities[a.cityId];if(!o||o.ownerId!==s.id)break;s.gold-=Dr,a.terrain="ancient_woods",n.push({type:"WOODS_PLANTED",coord:{...e.coord},cityId:o.id,popGained:1,playerId:s.id}),Ns(t,o,1,n);break}case"TRAIN_UNIT":{const r=t.cities[e.cityId];if(!r||r.ownerId!==s.id)break;const a=he(t,r.x,r.y);if(!a||a.unitId!==null||!Ql(t,r.id).includes(e.unitType)||so(t,r.id)>=io(t,r))break;const l=Zl(t,s.id,e.unitType);if(s.gold<l)break;s.gold-=l;const c=Ar(t,s.id,e.unitType,r.x,r.y,r.id,{ready:!1});n.push({type:"UNIT_TRAINED",unitId:c.id,unitType:c.type,cityId:r.id,coord:{x:r.x,y:r.y},ownerId:s.id});break}case"RESEARCH_TECH":{if(!Ur(t,s.id,e.techId))break;const r=Kr(t,s.id,e.techId);if(s.gold-=r,s.techs.push(e.techId),n.push({type:"TECH_RESEARCHED",playerId:s.id,techId:e.techId,cost:r}),e.techId==="dwarves_stone_walls")for(const a of Wt(t,s.id))a.level>=2&&(a.hasWalls=!0);else if(e.techId==="elves_keen_sight"){const a=[];for(const o of Object.values(t.units)){if(o.ownerId!==s.id)continue;const l=he(t,o.x,o.y);if(l&&(l.terrain==="forest"||l.terrain==="ancient_woods")){const c=vo(t,s,o.x,o.y);a.push(...Ui(t,s,o.x,o.y,c))}}a.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:a})}else if(e.techId==="humans_ride_of_rohirrim")for(const a of Object.values(t.units))a.ownerId===s.id&&(a.type==="rider"||a.type==="rohirrim_knight")&&(a.maxHp+=3,a.hp+=3);else if(e.techId==="orcs_pack_tactics")for(const a of Object.values(t.units))a.ownerId===s.id&&a.type==="rider"&&(a.maxHp+=3,a.hp+=3);else if(e.techId==="orcs_black_gate")for(const a of Object.values(t.units))a.ownerId===s.id&&a.type==="uruk_berserker"&&(a.maxHp+=3,a.hp+=3);else if(e.techId==="elves_galadhrim_precision")for(const a of Object.values(t.units))a.ownerId===s.id&&a.type==="elven_sentinel"&&(a.maxHp+=3,a.hp+=3);else if(e.techId==="dwarves_mithril_phalanx")for(const a of Object.values(t.units))a.ownerId===s.id&&(a.type==="ironbreaker"||a.type==="defender")&&(a.maxHp+=4,a.hp+=4);else if(e.techId==="dwarves_dragon_slayers")for(const a of Object.values(t.units))a.ownerId===s.id&&a.type==="catapult"&&(a.maxHp+=5,a.hp+=5);break}case"CHOOSE_CITY_REWARD":{const r=t.cities[e.cityId];if(!r||r.ownerId!==s.id||r.pendingLevelRewards.length===0)break;const a=r.pendingLevelRewards[0];if(!Cf(a,e.reward))break;if(r.pendingLevelRewards.shift(),e.reward==="workshop")r.hasWorkshop=!0;else if(e.reward==="explorer"){const o=[];for(let c=0;c<t.mapSize;c++)for(let d=0;d<t.mapSize;d++){const u=Ke(d,c,t.mapSize);if(!s.revealedTiles[u]){const h=(d-r.x)**2+(c-r.y)**2;o.push({coord:{x:d,y:c},dist:h})}}o.sort((c,d)=>c.dist-d.dist);const l=o.slice(0,10).map(c=>c.coord);for(const c of l)s.revealedTiles[Ke(c.x,c.y,t.mapSize)]=!0;l.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:l})}else if(e.reward==="city_wall")r.hasWalls=!0;else if(e.reward==="resources")s.gold+=5;else if(e.reward==="border_growth")r.borderRadius=2,rl(t,r);else if(e.reward==="pop_growth")Ns(t,r,3,n);else if(e.reward==="champion"){const o=nt[s.faction].uniqueUnit;let l=null;const c=he(t,r.x,r.y);if(c&&c.unitId===null)l={x:r.x,y:r.y};else{const d=[];for(let u=-2;u<=2;u++)for(let h=-2;h<=2;h++){const f=he(t,r.x+h,r.y+u);!f||f.unitId!==null||f.terrain!=="water"&&(f.terrain==="mountain"&&!ku(s)||d.push({coord:{x:f.x,y:f.y},dist:h*h+u*u}))}d.sort((u,h)=>u.dist-h.dist),d.length>0&&(l=d[0].coord)}if(l){const d=Ar(t,s.id,o,l.x,l.y,null,{ready:!1,isVeteran:!0,bonusMaxHp:5});n.push({type:"UNIT_TRAINED",unitId:d.id,unitType:d.type,cityId:r.id,coord:l,ownerId:s.id})}}else e.reward==="park"&&(r.parks+=1);n.push({type:"CITY_REWARD_APPLIED",cityId:r.id,coord:{x:r.x,y:r.y},reward:e.reward,ownerId:s.id});break}case"USE_SUPERPOWER":{if(!kr(t,s.id))break;if(s.faction==="elves")t.eclipseTurnsRemaining=3,t.eclipseOwnerId=s.id,s.superpowerUsed=!0,n.push({type:"SUPERPOWER_USED",playerId:s.id,faction:s.faction});else if(s.faction==="orcs"){const r=e.target;if(!r||!he(t,r.x,r.y)||!s.revealedTiles[Ke(r.x,r.y,t.mapSize)])break;const o=[],l=[];for(let c=-1;c<=1;c++)for(let d=-1;d<=1;d++){const u=he(t,r.x+d,r.y+c);if(u){if(o.push({x:u.x,y:u.y}),u.unitId!==null){const h=t.units[u.unitId];h&&h.ownerId!==s.id&&(l.push(h.id),delete t.units[h.id],u.unitId=null)}u.resource=null,u.improvement=null,u.hasRoad=!1,u.terrain!=="water"&&(u.terrain="wasteland")}}s.superpowerUsed=!0,n.push({type:"SUPERPOWER_USED",playerId:s.id,faction:s.faction,target:{x:r.x,y:r.y},affectedCoords:o,destroyedUnitIds:l})}else if(s.faction==="dwarves"){const r=Wt(t,s.id),a=r.find(h=>h.isCapital)??r[0];if(!a)break;const o=(h,f)=>{const g=(h.x-a.x)**2+(h.y-a.y)**2,v=(f.x-a.x)**2+(f.y-a.y)**2;if(g!==v)return g-v;const m=vt(h,a),p=vt(f,a);return m!==p?m-p:h.y!==f.y?h.y-f.y:h.x-f.x};let c=t.tiles.filter(h=>h.terrain==="mountain"&&h.unitId===null).sort(o)[0]??null;if(c||(c=t.tiles.filter(f=>f.terrain!=="water"&&f.unitId===null).sort(o)[0]??null),!c)break;const d=Ar(t,s.id,"dragon",c.x,c.y,null,{ready:!0}),u=Ui(t,s,c.x,c.y,2);u.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:u}),s.superpowerUsed=!0,n.push({type:"SUPERPOWER_USED",playerId:s.id,faction:s.faction,target:{x:c.x,y:c.y},spawnedUnitId:d.id})}else if(s.faction==="humans"){const r=e.target;if(!r||!Hr(t,s.id).some(c=>c.x===r.x&&c.y===r.y))break;const o=Ar(t,s.id,"watchtower",r.x,r.y,null,{ready:!0}),l=Ui(t,s,r.x,r.y,2);l.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:l}),s.superpowerUsed=!0,n.push({type:"SUPERPOWER_USED",playerId:s.id,faction:s.faction,target:{x:r.x,y:r.y},spawnedUnitId:o.id})}break}case"END_TURN":{const r=t.players.length;let a=t.activePlayerIndex,o=!1;for(let c=1;c<=r;c++){const d=(t.activePlayerIndex+c)%r;if(d<=t.activePlayerIndex&&(o=!0),t.players[d].alive){a=d;break}}if(o&&(t.turn+=1),t.activePlayerIndex=a,t.config.maxTurns>0&&t.turn>t.config.maxTurns){const c=Oc(t),u=t.players.slice().sort((h,f)=>{const g=c[f.id]-c[h.id];return g!==0?g:h.alive!==f.alive?h.alive?-1:1:f.gold-h.gold})[0];return t.phase="game_over",t.winnerId=u.id,t.winReason="glory",n.push({type:"GAME_OVER",winnerId:u.id,reason:"glory",scores:c}),{state:t,events:n}}const l=t.players[t.activePlayerIndex];(t.eclipseTurnsRemaining??0)>0&&t.eclipseOwnerId===l.id&&(t.eclipseTurnsRemaining-=1,t.eclipseTurnsRemaining<=0&&(t.eclipseTurnsRemaining=0,t.eclipseOwnerId=null)),Pf(t,l,n);break}}return Xa(t),{state:t,events:n}}const Lf=20261124,Df=10,kf=6,Uf={humans:[{terrain:"plains",resource:"berries"},{terrain:"plains",resource:"berries"}],orcs:[{terrain:"plains",resource:"berries"},{terrain:"forest",resource:"game"}],elves:[{terrain:"ancient_woods",resource:"berries"},{terrain:"forest",resource:"game"}],dwarves:[{terrain:"mountain",resource:"ore"},{terrain:"mountain",resource:"ore"}]};function Wr(i){return i==="orcs"?"wasteland":"plains"}function Jn(i,e,t,n){return t<0||n<0||t>=e||n>=e?null:i[Ke(t,n,e)]??null}function Vu(i,e){const t=`${e}_${i.nextEntityId}`;return i.nextEntityId+=1,t}function Nc(i,e,t,n,s){for(let r=-s;r<=s;r++)for(let a=-s;a<=s;a++){const o=t+a,l=n+r;o<0||l<0||o>=i.mapSize||l>=i.mapSize||(e.revealedTiles[Ke(o,l,i.mapSize)]=!0)}}function Of(i,e){const t=e.borderRadius;for(let s=-t;s<=t;s++)for(let r=-t;r<=t;r++){const a=he(i,e.x+r,e.y+s);a&&a.cityId===null&&(a.cityId=e.id)}const n=he(i,e.x,e.y);n&&(n.cityId=e.id,n.isCityCenter=!0,n.hasVillage=!1)}function Fc(i,e,t,n,s,r,a){const o=Jl(i,e,t),l=a?.ready??!0,c=a?.hp!==void 0?Math.min(o,Math.max(1,a.hp)):o,d={id:Vu(i,"unit"),type:t,ownerId:e,homeCityId:r,x:n,y:s,hp:c,maxHp:o,kills:0,isVeteran:!1,canPromote:!1,hasMoved:!l,hasAttacked:!l,canEscapeMove:!1,canPersistAttack:!1,actedThisTurn:!l,canCapture:!1,canExploreRuins:!1};i.units[d.id]=d;const u=he(i,n,s);return u&&(u.unitId=d.id),d}function Nf(i){for(const e of i.players){if(e.faction==="humans"){const t=tc(i,e.id);for(const n of Wt(i,e.id))n.connectedToCapital=t.has(n.id)}e.goldPerTurn=nc(i,e.id),e.score=ro(i,e.id)}}function Ff(i,e,t,n,s){const r=l=>l.terrain!=="water"&&l.terrain!=="mountain",a=()=>{const l=new Uint8Array(e*e),c=Ke(t.x,t.y,e);l[c]=1;const d=[t];let u=0;for(;u<d.length;){const h=d[u++];for(let f=-1;f<=1;f++)for(let g=-1;g<=1;g++){if(g===0&&f===0)continue;const v=h.x+g,m=h.y+f,p=Jn(i,e,v,m);if(!p||!r(p))continue;const y=Ke(v,m,e);l[y]||(l[y]=1,d.push({x:v,y:m}))}}return l};let o=a();for(const l of n){const c=Ke(l.x,l.y,e);if(o[c])continue;let d=l.x,u=l.y,h=e*4;for(;!o[Ke(d,u,e)]&&h-- >0;){const f=Jn(i,e,d,u);if(f&&!r(f)&&!s.has(`${d},${u}`)&&(f.terrain=Wr(f.biome),(f.resource==="ore"||f.resource==="mithril")&&(f.resource=null)),d===t.x&&u===t.y)break;d<t.x?d++:d>t.x&&d--,u<t.y?u++:u>t.y&&u--}o=a()}}function Bf(i,e,t,n){const s=Jn(i,e,t.x,t.y);s.terrain=Wr(n),s.biome=n,s.resource=null,s.improvement=null,s.hasVillage=!1;const r=[];for(let a=-1;a<=1;a++)for(let o=-1;o<=1;o++){if(o===0&&a===0)continue;const l=Jn(i,e,t.x+o,t.y+a);l&&r.push(l)}for(const a of r)a.biome=n,(a.terrain==="water"||a.terrain==="mountain")&&(a.terrain=Wr(n)),a.resource=null,a.improvement=null,a.hasVillage=!1;n==="humans"?(r[0].terrain="plains",r[0].resource="berries",r[1].terrain="plains",r[1].resource="berries",r[2].terrain="forest",r[2].resource="game"):n==="orcs"?(r[0].terrain="plains",r[0].resource="berries",r[1].terrain="forest",r[1].resource="game",r[2].terrain="wasteland"):n==="elves"?(r[0].terrain="ancient_woods",r[0].resource="berries",r[1].terrain="ancient_woods",r[2].terrain="forest",r[2].resource="game"):n==="dwarves"&&(r[0].terrain="mountain",r[0].resource="ore",r[1].terrain="mountain",r[1].resource="mithril",r[2].terrain="plains",r[2].resource="berries")}function Hf(i){const{humanFaction:e,difficulty:t,mapSize:n}=i,s=i.maxTurns??0,r=Fu(Lf),a=Bu(n,r),o=a.tiles,l=n===18?8:7,c=n===18?8:7,d={x:l,y:c},u={x:l+1,y:c},h={x:l+2,y:c},f=[{x:l-1,y:c},{x:l,y:c-1}],g={x:l+2,y:c},v=Kt.filter(K=>K!==e),m=v.includes("orcs")?["orcs",...v.filter(K=>K!=="orcs")]:v,p=[e,...m],y=[{x:n-3,y:2},{x:2,y:2},{x:2,y:n-3}],w={};w[e]=d;for(let K=0;K<m.length;K++)w[m[K]]=y[K];for(const K of o){const G=vt(K,d)<=2||vt(K,h)<=2||vt(K,g)<=1,Y=y.some(oe=>vt(K,oe)<=2);(G||Y)&&(K.hasVillage=!1,K.resource==="ruins"&&(K.resource=null))}const _=Jn(o,n,l,c);_.terrain=Wr(e),_.biome=e,_.resource=null,_.improvement=null,_.hasRoad=!1,_.hasVillage=!1;for(let K=-1;K<=1;K++)for(let G=-1;G<=1;G++){if(G===0&&K===0)continue;const Y=Jn(o,n,l+G,c+K);Y&&(Y.biome=e,Y.resource=null,Y.improvement=null,Y.hasRoad=!1,Y.hasVillage=!1,(Y.terrain==="water"||Y.terrain==="mountain")&&(Y.terrain=Wr(e)))}const[b,T]=Uf[e],x=Jn(o,n,f[0].x,f[0].y);x.terrain=b.terrain,x.biome=e,x.resource=b.resource,x.hasVillage=!1;const E=Jn(o,n,f[1].x,f[1].y);E.terrain=T.terrain,E.biome=e,E.resource=T.resource,E.hasVillage=!1;const M=Jn(o,n,u.x,u.y);M.terrain="plains",M.biome=e,M.resource=null,M.improvement=null,M.hasRoad=!1,M.hasVillage=!1;const S=Jn(o,n,h.x,h.y);S.terrain="plains",S.biome=m[0],S.resource=null,S.improvement=null,S.hasRoad=!1,S.hasVillage=!0;for(let K=0;K<m.length;K++)Bf(o,n,y[K],m[K]);const A=new Set([`${f[0].x},${f[0].y}`,`${f[1].x},${f[1].y}`]),I=[h,g,...y,...o.filter(K=>K.hasVillage).map(K=>({x:K.x,y:K.y}))];Ff(o,n,d,I,A);const P=p.map(K=>{const G=nt[K],Y=K===e;return{id:`player_${K}`,faction:K,name:G.name,isHuman:Y,gold:Y?Df:G.startingGold,goldPerTurn:0,score:0,techs:[G.startingTech],revealedTiles:new Array(n*n).fill(!1),alive:!0,eliminatedOnTurn:null,superpowerUsed:!1}}),F={config:{humanFaction:e,difficulty:t,mapSize:n,maxTurns:s,seed:r},mapSize:n,turn:1,activePlayerIndex:0,phase:"playing",winnerId:null,winReason:null,eclipseTurnsRemaining:0,eclipseOwnerId:null,rngState:a.rngState,nextEntityId:1,players:P,tiles:o,cities:{},units:{}};let H="";for(const K of F.players){const G=nt[K.faction],Y=w[K.faction],oe=Vu(F,"city"),me={id:oe,name:G.cityNames[0],ownerId:K.id,styleFaction:K.faction,x:Y.x,y:Y.y,isCapital:!0,level:1,population:0,hasWorkshop:!1,hasWalls:!1,borderRadius:1,parks:0,pendingLevelRewards:[],connectedToCapital:!0};F.cities[oe]=me,Of(F,me),Nc(F,K,Y.x,Y.y,2);const O=Fc(F,K.id,G.startingUnit,Y.x,Y.y,oe,{ready:!0});K.isHuman&&(H=O.id)}S.cityId=null,S.isCityCenter=!1,S.hasVillage=!0;const $=F.players[0];for(const K of[d,u,h,f[0],f[1],g])$.revealedTiles[Ke(K.x,K.y,n)]=!0;const Z=F.players[1],V=Fc(F,Z.id,"warrior",g.x,g.y,null,{ready:!0,hp:kf});return Nc(F,Z,g.x,g.y,1),Nf(F),{state:F,scenario:{capitalCoord:d,moveTargetCoord:u,villageCoord:h,resourceCoords:f,enemyCoord:g,enemyUnitId:V.id,starterUnitId:H}}}const ao="eldermere_saved_campaign_v1",rc="eldermere_tutorial_done_v1",zf=["intro","stars","upgrade","move","combat","capture","codex","end_turn","complete"];function lr(){try{if(typeof window<"u"&&window.localStorage)return window.localStorage}catch{}return null}function Gf(i){return typeof i=="string"&&zf.includes(i)}function ps(i){return typeof i=="object"&&i!==null&&typeof i.x=="number"&&typeof i.y=="number"}function Vf(i){if(typeof i!="object"||i===null)return!1;const e=i;return ps(e.capitalCoord)&&ps(e.moveTargetCoord)&&ps(e.villageCoord)&&Array.isArray(e.resourceCoords)&&e.resourceCoords.length===2&&ps(e.resourceCoords[0])&&ps(e.resourceCoords[1])&&ps(e.enemyCoord)&&typeof e.enemyUnitId=="string"&&typeof e.starterUnitId=="string"}function Wf(i,e,t=null,n=null){if(i.phase!=="playing")return Rr(),!1;const s=lr();if(!s)return!1;const r={version:1,savedAt:Date.now(),humanPlayerId:e,state:i,tutorialStage:t,tutorialScenario:n};try{return s.setItem(ao,JSON.stringify(r)),!0}catch{return!1}}function Wu(){const i=lr();if(!i)return null;try{const e=i.getItem(ao);if(!e)return null;const t=JSON.parse(e);if(!t||t.version!==1||typeof t.humanPlayerId!="string"||!t.state||t.state.phase!=="playing"||!Array.isArray(t.state.players)||!Array.isArray(t.state.tiles)||t.state.tiles.length!==t.state.mapSize*t.state.mapSize)return null;const n=t.state.players.find(s=>s.id===t.humanPlayerId);return!n||!n.alive?null:{version:1,savedAt:typeof t.savedAt=="number"?t.savedAt:Date.now(),humanPlayerId:t.humanPlayerId,state:t.state,tutorialStage:Gf(t.tutorialStage)?t.tutorialStage:null,tutorialScenario:Vf(t.tutorialScenario)?t.tutorialScenario:null}}catch{return null}}function Bc(){const i=Wu();if(!i)return null;const e=ke(i.state,i.humanPlayerId);if(!e)return null;const t=Wt(i.state,i.humanPlayerId).length;return{faction:e.faction,turn:i.state.turn,score:e.score,citiesCount:t,mapSize:i.state.mapSize,difficulty:i.state.config.difficulty,savedAt:i.savedAt}}function Rr(){const i=lr();if(i)try{i.removeItem(ao)}catch{}}function Hc(){const i=lr();if(!i)return!1;try{return i.getItem(rc)==="true"}catch{return!1}}function zc(){const i=lr();if(i)try{i.setItem(rc,"true")}catch{}}function $f(){const i=lr();if(i)try{i.removeItem(ao),i.removeItem(rc),i.clear()}catch{}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ac="172",Xf=0,Gc=1,qf=2,$u=1,Xu=2,ui=3,Bi=0,gn=1,gt=2,Ni=0,Vs=1,qa=2,Vc=3,Wc=4,Yf=5,ts=100,Kf=101,jf=102,Zf=103,Jf=104,Qf=200,ep=201,tp=202,np=203,al=204,ol=205,ip=206,sp=207,rp=208,ap=209,op=210,lp=211,cp=212,dp=213,up=214,ll=0,cl=1,dl=2,Js=3,ul=4,hl=5,fl=6,pl=7,qu=0,hp=1,fp=2,Fi=0,pp=1,mp=2,gp=3,vp=4,yp=5,_p=6,oc=7,Yu=300,Qs=301,er=302,ml=303,gl=304,oo=306,$r=1e3,ss=1001,vl=1002,Xn=1003,wp=1004,ra=1005,On=1006,yo=1007,gi=1008,Si=1009,Ku=1010,ju=1011,Xr=1012,lc=1013,cs=1014,vi=1015,jr=1016,cc=1017,dc=1018,tr=1020,Zu=35902,Ju=1021,Qu=1022,$n=1023,eh=1024,th=1025,Ws=1026,nr=1027,nh=1028,uc=1029,ih=1030,hc=1031,fc=1033,Na=33776,Fa=33777,Ba=33778,Ha=33779,yl=35840,_l=35841,wl=35842,Ml=35843,Sl=36196,bl=37492,xl=37496,Tl=37808,El=37809,Al=37810,Rl=37811,Cl=37812,Il=37813,Pl=37814,Ll=37815,Dl=37816,kl=37817,Ul=37818,Ol=37819,Nl=37820,Fl=37821,za=36492,Bl=36494,Hl=36495,sh=36283,zl=36284,Gl=36285,Vl=36286,Mp=3200,Sp=3201,rh=0,bp=1,mi="",en="srgb",ir="srgb-linear",Ya="linear",At="srgb",ms=7680,$c=519,xp=512,Tp=513,Ep=514,ah=515,Ap=516,Rp=517,Cp=518,Ip=519,Wl=35044,Xc="300 es",yi=2e3,Ka=2001;class cr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let qc=1234567;const Or=Math.PI/180,qr=180/Math.PI;function _i(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[t&63|128]+sn[t>>8&255]+"-"+sn[t>>16&255]+sn[t>>24&255]+sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]).toLowerCase()}function tt(i,e,t){return Math.max(e,Math.min(t,i))}function pc(i,e){return(i%e+e)%e}function Pp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Lp(i,e,t){return i!==e?(t-i)/(e-i):0}function Nr(i,e,t){return(1-t)*i+t*e}function Dp(i,e,t,n){return Nr(i,e,1-Math.exp(-t*n))}function kp(i,e=1){return e-Math.abs(pc(i,e*2)-e)}function Up(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Op(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Np(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Fp(i,e){return i+Math.random()*(e-i)}function Bp(i){return i*(.5-Math.random())}function Hp(i){i!==void 0&&(qc=i);let e=qc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function zp(i){return i*Or}function Gp(i){return i*qr}function Vp(i){return(i&i-1)===0&&i!==0}function Wp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function $p(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Xp(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),u=r((e-n)/2),h=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*d,l*u,l*h,o*c);break;case"YZY":i.set(l*h,o*d,l*u,o*c);break;case"ZXZ":i.set(l*u,l*h,o*d,o*c);break;case"XZX":i.set(o*d,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*d,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function xt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Mt={DEG2RAD:Or,RAD2DEG:qr,generateUUID:_i,clamp:tt,euclideanModulo:pc,mapLinear:Pp,inverseLerp:Lp,lerp:Nr,damp:Dp,pingpong:kp,smoothstep:Up,smootherstep:Op,randInt:Np,randFloat:Fp,randFloatSpread:Bp,seededRandom:Hp,degToRad:zp,radToDeg:Gp,isPowerOfTwo:Vp,ceilPowerOfTwo:Wp,floorPowerOfTwo:$p,setQuaternionFromProperEuler:Xp,normalize:xt,denormalize:Wn};class qe{constructor(e=0,t=0){qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ze{constructor(e,t,n,s,r,a,o,l,c){Ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],h=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],y=s[1],w=s[4],_=s[7],b=s[2],T=s[5],x=s[8];return r[0]=a*v+o*y+l*b,r[3]=a*m+o*w+l*T,r[6]=a*p+o*_+l*x,r[1]=c*v+d*y+u*b,r[4]=c*m+d*w+u*T,r[7]=c*p+d*_+u*x,r[2]=h*v+f*y+g*b,r[5]=h*m+f*w+g*T,r[8]=h*p+f*_+g*x,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,h=o*l-d*r,f=c*r-a*l,g=t*u+n*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(s*c-d*n)*v,e[2]=(o*n-s*a)*v,e[3]=h*v,e[4]=(d*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(_o.makeScale(e,t)),this}rotate(e){return this.premultiply(_o.makeRotation(-e)),this}translate(e,t){return this.premultiply(_o.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const _o=new Ze;function oh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Yr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qp(){const i=Yr("canvas");return i.style.display="block",i}const Yc={};function Fs(i){i in Yc||(Yc[i]=!0,console.warn(i))}function Yp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Kp(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function jp(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Kc=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jc=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zp(){const i={enabled:!0,workingColorSpace:ir,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===At&&(s.r=wi(s.r),s.g=wi(s.g),s.b=wi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===At&&(s.r=$s(s.r),s.g=$s(s.g),s.b=$s(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===mi?Ya:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ir]:{primaries:e,whitePoint:n,transfer:Ya,toXYZ:Kc,fromXYZ:jc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:en},outputColorSpaceConfig:{drawingBufferColorSpace:en}},[en]:{primaries:e,whitePoint:n,transfer:At,toXYZ:Kc,fromXYZ:jc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:en}}}),i}const pt=Zp();function wi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function $s(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let gs;class Jp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{gs===void 0&&(gs=Yr("canvas")),gs.width=e.width,gs.height=e.height;const n=gs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=gs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Yr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=wi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(wi(t[n]/255)*255):t[n]=wi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Qp=0;class lh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qp++}),this.uuid=_i(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(wo(s[a].image)):r.push(wo(s[a]))}else r=wo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function wo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Jp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let em=0;class an extends cr{constructor(e=an.DEFAULT_IMAGE,t=an.DEFAULT_MAPPING,n=ss,s=ss,r=On,a=gi,o=$n,l=Si,c=an.DEFAULT_ANISOTROPY,d=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:em++}),this.uuid=_i(),this.name="",this.source=new lh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Yu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $r:e.x=e.x-Math.floor(e.x);break;case ss:e.x=e.x<0?0:1;break;case vl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $r:e.y=e.y-Math.floor(e.y);break;case ss:e.y=e.y<0?0:1;break;case vl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=Yu;an.DEFAULT_ANISOTROPY=1;class Ft{constructor(e=0,t=0,n=0,s=1){Ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,_=(f+1)/2,b=(p+1)/2,T=(d+h)/4,x=(u+v)/4,E=(g+m)/4;return w>_&&w>b?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=T/n,r=x/n):_>b?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=E/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=x/r,s=E/r),this.set(n,s,r,t),this}let y=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(h-d)*(h-d));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-v)/y,this.z=(h-d)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this.w=tt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this.w=tt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tm extends cr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:On,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new an(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new lh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ds extends tm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ch extends an{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Xn,this.minFilter=Xn,this.wrapR=ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class nm extends an{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Xn,this.minFilter=Xn,this.wrapR=ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zr{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],u=n[s+3];const h=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(u!==v||l!==h||c!==f||d!==g){let m=1-o;const p=l*h+c*f+d*g+u*v,y=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){const b=Math.sqrt(w),T=Math.atan2(b,p*y);m=Math.sin(m*T)/b,o=Math.sin(o*T)/b}const _=o*y;if(l=l*m+h*_,c=c*m+f*_,d=d*m+g*_,u=u*m+v*_,m===1-o){const b=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=b,c*=b,d*=b,u*=b}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],u=r[a],h=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+d*u+l*f-c*h,e[t+1]=l*g+d*h+c*u-o*f,e[t+2]=c*g+d*f+o*h-l*u,e[t+3]=d*g-o*u-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),u=o(r/2),h=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"YXZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"ZXY":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"ZYX":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"YZX":this._x=h*d*u+c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u-h*f*g;break;case"XZY":this._x=h*d*u-c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=n+o+u;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(d-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,h=Math.sin(t*d)/c;return this._w=a*u+this._w*h,this._x=n*u+this._x*h,this._y=s*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*d,this.y=n+l*d+o*c-r*u,this.z=s+l*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Mo.copy(this).projectOnVector(e),this.sub(Mo)}reflect(e){return this.sub(Mo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Mo=new U,Zc=new Zr;class dr{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Hn):Hn.fromBufferAttribute(r,a),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),aa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),aa.copy(n.boundingBox)),aa.applyMatrix4(e.matrixWorld),this.union(aa)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(mr),oa.subVectors(this.max,mr),vs.subVectors(e.a,mr),ys.subVectors(e.b,mr),_s.subVectors(e.c,mr),Ei.subVectors(ys,vs),Ai.subVectors(_s,ys),Wi.subVectors(vs,_s);let t=[0,-Ei.z,Ei.y,0,-Ai.z,Ai.y,0,-Wi.z,Wi.y,Ei.z,0,-Ei.x,Ai.z,0,-Ai.x,Wi.z,0,-Wi.x,-Ei.y,Ei.x,0,-Ai.y,Ai.x,0,-Wi.y,Wi.x,0];return!So(t,vs,ys,_s,oa)||(t=[1,0,0,0,1,0,0,0,1],!So(t,vs,ys,_s,oa))?!1:(la.crossVectors(Ei,Ai),t=[la.x,la.y,la.z],So(t,vs,ys,_s,oa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const si=[new U,new U,new U,new U,new U,new U,new U,new U],Hn=new U,aa=new dr,vs=new U,ys=new U,_s=new U,Ei=new U,Ai=new U,Wi=new U,mr=new U,oa=new U,la=new U,$i=new U;function So(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){$i.fromArray(i,r);const o=s.x*Math.abs($i.x)+s.y*Math.abs($i.y)+s.z*Math.abs($i.z),l=e.dot($i),c=t.dot($i),d=n.dot($i);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const im=new dr,gr=new U,bo=new U;class mc{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):im.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;gr.subVectors(e,this.center);const t=gr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(gr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(bo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(gr.copy(e.center).add(bo)),this.expandByPoint(gr.copy(e.center).sub(bo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ri=new U,xo=new U,ca=new U,Ri=new U,To=new U,da=new U,Eo=new U;class dh{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ri.copy(this.origin).addScaledVector(this.direction,t),ri.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){xo.copy(e).add(t).multiplyScalar(.5),ca.copy(t).sub(e).normalize(),Ri.copy(this.origin).sub(xo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ca),o=Ri.dot(this.direction),l=-Ri.dot(ca),c=Ri.lengthSq(),d=Math.abs(1-a*a);let u,h,f,g;if(d>0)if(u=a*l-o,h=a*o-l,g=r*d,u>=0)if(h>=-g)if(h<=g){const v=1/d;u*=v,h*=v,f=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-a*r+o)),h=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(u=Math.max(0,-(a*r+o)),h=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c);else h=a>0?-r:r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(xo).addScaledVector(ca,h),f}intersectSphere(e,t){ri.subVectors(e.center,this.origin);const n=ri.dot(this.direction),s=ri.dot(ri)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),d>=0?(r=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ri)!==null}intersectTriangle(e,t,n,s,r){To.subVectors(t,e),da.subVectors(n,e),Eo.crossVectors(To,da);let a=this.direction.dot(Eo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ri.subVectors(this.origin,e);const l=o*this.direction.dot(da.crossVectors(Ri,da));if(l<0)return null;const c=o*this.direction.dot(To.cross(Ri));if(c<0||l+c>a)return null;const d=-o*Ri.dot(Eo);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class kt{constructor(e,t,n,s,r,a,o,l,c,d,u,h,f,g,v,m){kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,u,h,f,g,v,m)}set(e,t,n,s,r,a,o,l,c,d,u,h,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new kt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/ws.setFromMatrixColumn(e,0).length(),r=1/ws.setFromMatrixColumn(e,1).length(),a=1/ws.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const h=a*d,f=a*u,g=o*d,v=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*d,f=l*u,g=c*d,v=c*u;t[0]=h+v*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=f*o-g,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*d,f=l*u,g=c*d,v=c*u;t[0]=h-v*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*d,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*d,f=a*u,g=o*d,v=o*u;t[0]=l*d,t[4]=g*c-f,t[8]=h*c+v,t[1]=l*u,t[5]=v*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*d,t[4]=v-h*u,t[8]=g*u+f,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*u+g,t[10]=h-v*u}else if(e.order==="XZY"){const h=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+v,t[5]=a*d,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*d,t[10]=v*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sm,e,rm)}lookAt(e,t,n){const s=this.elements;return _n.subVectors(e,t),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),Ci.crossVectors(n,_n),Ci.lengthSq()===0&&(Math.abs(n.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),Ci.crossVectors(n,_n)),Ci.normalize(),ua.crossVectors(_n,Ci),s[0]=Ci.x,s[4]=ua.x,s[8]=_n.x,s[1]=Ci.y,s[5]=ua.y,s[9]=_n.y,s[2]=Ci.z,s[6]=ua.z,s[10]=_n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],h=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],y=n[3],w=n[7],_=n[11],b=n[15],T=s[0],x=s[4],E=s[8],M=s[12],S=s[1],A=s[5],I=s[9],P=s[13],F=s[2],H=s[6],$=s[10],Z=s[14],V=s[3],K=s[7],G=s[11],Y=s[15];return r[0]=a*T+o*S+l*F+c*V,r[4]=a*x+o*A+l*H+c*K,r[8]=a*E+o*I+l*$+c*G,r[12]=a*M+o*P+l*Z+c*Y,r[1]=d*T+u*S+h*F+f*V,r[5]=d*x+u*A+h*H+f*K,r[9]=d*E+u*I+h*$+f*G,r[13]=d*M+u*P+h*Z+f*Y,r[2]=g*T+v*S+m*F+p*V,r[6]=g*x+v*A+m*H+p*K,r[10]=g*E+v*I+m*$+p*G,r[14]=g*M+v*P+m*Z+p*Y,r[3]=y*T+w*S+_*F+b*V,r[7]=y*x+w*A+_*H+b*K,r[11]=y*E+w*I+_*$+b*G,r[15]=y*M+w*P+_*Z+b*Y,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*o*h+n*c*h+s*o*f-n*l*f)+v*(+t*l*f-t*c*h+r*a*h-s*a*f+s*c*d-r*l*d)+m*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*d-n*c*d)+p*(-s*o*d-t*l*u+t*o*h+s*a*u-n*a*h+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],y=u*m*c-v*h*c+v*l*f-o*m*f-u*l*p+o*h*p,w=g*h*c-d*m*c-g*l*f+a*m*f+d*l*p-a*h*p,_=d*v*c-g*u*c+g*o*f-a*v*f-d*o*p+a*u*p,b=g*u*l-d*v*l-g*o*h+a*v*h+d*o*m-a*u*m,T=t*y+n*w+s*_+r*b;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const x=1/T;return e[0]=y*x,e[1]=(v*h*r-u*m*r-v*s*f+n*m*f+u*s*p-n*h*p)*x,e[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*p+n*l*p)*x,e[3]=(u*l*r-o*h*r-u*s*c+n*h*c+o*s*f-n*l*f)*x,e[4]=w*x,e[5]=(d*m*r-g*h*r+g*s*f-t*m*f-d*s*p+t*h*p)*x,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*p-t*l*p)*x,e[7]=(a*h*r-d*l*r+d*s*c-t*h*c-a*s*f+t*l*f)*x,e[8]=_*x,e[9]=(g*u*r-d*v*r-g*n*f+t*v*f+d*n*p-t*u*p)*x,e[10]=(a*v*r-g*o*r+g*n*c-t*v*c-a*n*p+t*o*p)*x,e[11]=(d*o*r-a*u*r-d*n*c+t*u*c+a*n*f-t*o*f)*x,e[12]=b*x,e[13]=(d*v*s-g*u*s+g*n*h-t*v*h-d*n*m+t*u*m)*x,e[14]=(g*o*s-a*v*s-g*n*l+t*v*l+a*n*m-t*o*m)*x,e[15]=(a*u*s-d*o*s+d*n*l-t*u*l-a*n*h+t*o*h)*x,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,u=o+o,h=r*c,f=r*d,g=r*u,v=a*d,m=a*u,p=o*u,y=l*c,w=l*d,_=l*u,b=n.x,T=n.y,x=n.z;return s[0]=(1-(v+p))*b,s[1]=(f+_)*b,s[2]=(g-w)*b,s[3]=0,s[4]=(f-_)*T,s[5]=(1-(h+p))*T,s[6]=(m+y)*T,s[7]=0,s[8]=(g+w)*x,s[9]=(m-y)*x,s[10]=(1-(h+v))*x,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=ws.set(s[0],s[1],s[2]).length();const a=ws.set(s[4],s[5],s[6]).length(),o=ws.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],zn.copy(this);const c=1/r,d=1/a,u=1/o;return zn.elements[0]*=c,zn.elements[1]*=c,zn.elements[2]*=c,zn.elements[4]*=d,zn.elements[5]*=d,zn.elements[6]*=d,zn.elements[8]*=u,zn.elements[9]*=u,zn.elements[10]*=u,t.setFromRotationMatrix(zn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=yi){const l=this.elements,c=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),h=(n+s)/(n-s);let f,g;if(o===yi)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ka)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=yi){const l=this.elements,c=1/(t-e),d=1/(n-s),u=1/(a-r),h=(t+e)*c,f=(n+s)*d;let g,v;if(o===yi)g=(a+r)*u,v=-2*u;else if(o===Ka)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ws=new U,zn=new kt,sm=new U(0,0,0),rm=new U(1,1,1),Ci=new U,ua=new U,_n=new U,Jc=new kt,Qc=new Zr;class ni{constructor(e=0,t=0,n=0,s=ni.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-tt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-tt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(tt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Jc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Jc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Qc.setFromEuler(this),this.setFromQuaternion(Qc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ni.DEFAULT_ORDER="XYZ";class gc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let am=0;const ed=new U,Ms=new Zr,ai=new kt,ha=new U,vr=new U,om=new U,lm=new Zr,td=new U(1,0,0),nd=new U(0,1,0),id=new U(0,0,1),sd={type:"added"},cm={type:"removed"},Ss={type:"childadded",child:null},Ao={type:"childremoved",child:null};class Jt extends cr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:am++}),this.uuid=_i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Jt.DEFAULT_UP.clone();const e=new U,t=new ni,n=new Zr,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new kt},normalMatrix:{value:new Ze}}),this.matrix=new kt,this.matrixWorld=new kt,this.matrixAutoUpdate=Jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.multiply(Ms),this}rotateOnWorldAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.premultiply(Ms),this}rotateX(e){return this.rotateOnAxis(td,e)}rotateY(e){return this.rotateOnAxis(nd,e)}rotateZ(e){return this.rotateOnAxis(id,e)}translateOnAxis(e,t){return ed.copy(e).applyQuaternion(this.quaternion),this.position.add(ed.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(td,e)}translateY(e){return this.translateOnAxis(nd,e)}translateZ(e){return this.translateOnAxis(id,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ai.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ha.copy(e):ha.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ai.lookAt(vr,ha,this.up):ai.lookAt(ha,vr,this.up),this.quaternion.setFromRotationMatrix(ai),s&&(ai.extractRotation(s.matrixWorld),Ms.setFromRotationMatrix(ai),this.quaternion.premultiply(Ms.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(sd),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(cm),Ao.child=e,this.dispatchEvent(Ao),Ao.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(sd),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,e,om),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,lm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Jt.DEFAULT_UP=new U(0,1,0);Jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Gn=new U,oi=new U,Ro=new U,li=new U,bs=new U,xs=new U,rd=new U,Co=new U,Io=new U,Po=new U,Lo=new Ft,Do=new Ft,ko=new Ft;class Un{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Gn.subVectors(e,t),s.cross(Gn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Gn.subVectors(s,t),oi.subVectors(n,t),Ro.subVectors(e,t);const a=Gn.dot(Gn),o=Gn.dot(oi),l=Gn.dot(Ro),c=oi.dot(oi),d=oi.dot(Ro),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const h=1/u,f=(c*l-o*d)*h,g=(a*d-o*l)*h;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,li)===null?!1:li.x>=0&&li.y>=0&&li.x+li.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,li)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,li.x),l.addScaledVector(a,li.y),l.addScaledVector(o,li.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Lo.setScalar(0),Do.setScalar(0),ko.setScalar(0),Lo.fromBufferAttribute(e,t),Do.fromBufferAttribute(e,n),ko.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Lo,r.x),a.addScaledVector(Do,r.y),a.addScaledVector(ko,r.z),a}static isFrontFacing(e,t,n,s){return Gn.subVectors(n,t),oi.subVectors(e,t),Gn.cross(oi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),oi.subVectors(this.a,this.b),Gn.cross(oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Un.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Un.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;bs.subVectors(s,n),xs.subVectors(r,n),Co.subVectors(e,n);const l=bs.dot(Co),c=xs.dot(Co);if(l<=0&&c<=0)return t.copy(n);Io.subVectors(e,s);const d=bs.dot(Io),u=xs.dot(Io);if(d>=0&&u<=d)return t.copy(s);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(bs,a);Po.subVectors(e,r);const f=bs.dot(Po),g=xs.dot(Po);if(g>=0&&f<=g)return t.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(xs,o);const m=d*g-f*u;if(m<=0&&u-d>=0&&f-g>=0)return rd.subVectors(r,s),o=(u-d)/(u-d+(f-g)),t.copy(s).addScaledVector(rd,o);const p=1/(m+v+h);return a=v*p,o=h*p,t.copy(n).addScaledVector(bs,a).addScaledVector(xs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const uh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},fa={h:0,s:0,l:0};function Uo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=en){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=pt.workingColorSpace){return this.r=e,this.g=t,this.b=n,pt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=pt.workingColorSpace){if(e=pc(e,1),t=tt(t,0,1),n=tt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Uo(a,r,e+1/3),this.g=Uo(a,r,e),this.b=Uo(a,r,e-1/3)}return pt.toWorkingColorSpace(this,s),this}setStyle(e,t=en){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=en){const n=uh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wi(e.r),this.g=wi(e.g),this.b=wi(e.b),this}copyLinearToSRGB(e){return this.r=$s(e.r),this.g=$s(e.g),this.b=$s(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=en){return pt.fromWorkingColorSpace(rn.copy(this),e),Math.round(tt(rn.r*255,0,255))*65536+Math.round(tt(rn.g*255,0,255))*256+Math.round(tt(rn.b*255,0,255))}getHexString(e=en){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.fromWorkingColorSpace(rn.copy(this),t);const n=rn.r,s=rn.g,r=rn.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=pt.workingColorSpace){return pt.fromWorkingColorSpace(rn.copy(this),t),e.r=rn.r,e.g=rn.g,e.b=rn.b,e}getStyle(e=en){pt.fromWorkingColorSpace(rn.copy(this),e);const t=rn.r,n=rn.g,s=rn.b;return e!==en?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ii),this.setHSL(Ii.h+e,Ii.s+t,Ii.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ii),e.getHSL(fa);const n=Nr(Ii.h,fa.h,t),s=Nr(Ii.s,fa.s,t),r=Nr(Ii.l,fa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const rn=new xe;xe.NAMES=uh;let dm=0;class ur extends cr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dm++}),this.uuid=_i(),this.name="",this.type="Material",this.blending=Vs,this.side=Bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=al,this.blendDst=ol,this.blendEquation=ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xe(0,0,0),this.blendAlpha=0,this.depthFunc=Js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$c,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ms,this.stencilZFail=ms,this.stencilZPass=ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Vs&&(n.blending=this.blending),this.side!==Bi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==al&&(n.blendSrc=this.blendSrc),this.blendDst!==ol&&(n.blendDst=this.blendDst),this.blendEquation!==ts&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Js&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$c&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ms&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ms&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ms&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ut extends ur{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=qu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vt=new U,pa=new qe;class qn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Wl,this.updateRanges=[],this.gpuType=vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)pa.fromBufferAttribute(this,t),pa.applyMatrix3(e),this.setXY(t,pa.x,pa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix3(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=xt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),s=xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),s=xt(s,this.array),r=xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Wl&&(e.usage=this.usage),e}}class hh extends qn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class fh extends qn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ht extends qn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let um=0;const Pn=new kt,Oo=new Jt,Ts=new U,wn=new dr,yr=new dr,Yt=new U;class An extends cr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:um++}),this.uuid=_i(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(oh(e)?fh:hh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Pn.makeRotationFromQuaternion(e),this.applyMatrix4(Pn),this}rotateX(e){return Pn.makeRotationX(e),this.applyMatrix4(Pn),this}rotateY(e){return Pn.makeRotationY(e),this.applyMatrix4(Pn),this}rotateZ(e){return Pn.makeRotationZ(e),this.applyMatrix4(Pn),this}translate(e,t,n){return Pn.makeTranslation(e,t,n),this.applyMatrix4(Pn),this}scale(e,t,n){return Pn.makeScale(e,t,n),this.applyMatrix4(Pn),this}lookAt(e){return Oo.lookAt(e),Oo.updateMatrix(),this.applyMatrix4(Oo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ts).negate(),this.translate(Ts.x,Ts.y,Ts.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ht(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];wn.setFromBufferAttribute(r),this.morphTargetsRelative?(Yt.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(Yt),Yt.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(Yt)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(wn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];yr.setFromBufferAttribute(o),this.morphTargetsRelative?(Yt.addVectors(wn.min,yr.min),wn.expandByPoint(Yt),Yt.addVectors(wn.max,yr.max),wn.expandByPoint(Yt)):(wn.expandByPoint(yr.min),wn.expandByPoint(yr.max))}wn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Yt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Yt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Yt.fromBufferAttribute(o,c),l&&(Ts.fromBufferAttribute(e,c),Yt.add(Ts)),s=Math.max(s,n.distanceToSquared(Yt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let E=0;E<n.count;E++)o[E]=new U,l[E]=new U;const c=new U,d=new U,u=new U,h=new qe,f=new qe,g=new qe,v=new U,m=new U;function p(E,M,S){c.fromBufferAttribute(n,E),d.fromBufferAttribute(n,M),u.fromBufferAttribute(n,S),h.fromBufferAttribute(r,E),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,S),d.sub(c),u.sub(c),f.sub(h),g.sub(h);const A=1/(f.x*g.y-g.x*f.y);isFinite(A)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(A),m.copy(u).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(A),o[E].add(v),o[M].add(v),o[S].add(v),l[E].add(m),l[M].add(m),l[S].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let E=0,M=y.length;E<M;++E){const S=y[E],A=S.start,I=S.count;for(let P=A,F=A+I;P<F;P+=3)p(e.getX(P+0),e.getX(P+1),e.getX(P+2))}const w=new U,_=new U,b=new U,T=new U;function x(E){b.fromBufferAttribute(s,E),T.copy(b);const M=o[E];w.copy(M),w.sub(b.multiplyScalar(b.dot(M))).normalize(),_.crossVectors(T,M);const A=_.dot(l[E])<0?-1:1;a.setXYZW(E,w.x,w.y,w.z,A)}for(let E=0,M=y.length;E<M;++E){const S=y[E],A=S.start,I=S.count;for(let P=A,F=A+I;P<F;P+=3)x(e.getX(P+0)),x(e.getX(P+1)),x(e.getX(P+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new qn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const s=new U,r=new U,a=new U,o=new U,l=new U,c=new U,d=new U,u=new U;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Yt.fromBufferAttribute(e,t),Yt.normalize(),e.setXYZ(t,Yt.x,Yt.y,Yt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*d;for(let p=0;p<d;p++)h[g++]=c[f++]}return new qn(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new An,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const f=c[u];d.push(f.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],u=r[c];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ad=new kt,Xi=new dh,ma=new mc,od=new U,ga=new U,va=new U,ya=new U,No=new U,_a=new U,ld=new U,wa=new U;class D extends Jt{constructor(e=new An,t=new ut){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){_a.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],u=r[l];d!==0&&(No.fromBufferAttribute(u,e),a?_a.addScaledVector(No,d):_a.addScaledVector(No.sub(t),d))}t.add(_a)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(r),Xi.copy(e.ray).recast(e.near),!(ma.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(ma,od)===null||Xi.origin.distanceToSquared(od)>(e.far-e.near)**2))&&(ad.copy(r).invert(),Xi.copy(e.ray).applyMatrix4(ad),!(n.boundingBox!==null&&Xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Xi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),w=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,b=w;_<b;_+=3){const T=o.getX(_),x=o.getX(_+1),E=o.getX(_+2);s=Ma(this,p,e,n,c,d,u,T,x,E),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=o.getX(m),w=o.getX(m+1),_=o.getX(m+2);s=Ma(this,a,e,n,c,d,u,y,w,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),w=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,b=w;_<b;_+=3){const T=_,x=_+1,E=_+2;s=Ma(this,p,e,n,c,d,u,T,x,E),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=m,w=m+1,_=m+2;s=Ma(this,a,e,n,c,d,u,y,w,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function hm(i,e,t,n,s,r,a,o){let l;if(e.side===gn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Bi,o),l===null)return null;wa.copy(o),wa.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(wa);return c<t.near||c>t.far?null:{distance:c,point:wa.clone(),object:i}}function Ma(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,ga),i.getVertexPosition(l,va),i.getVertexPosition(c,ya);const d=hm(i,e,t,n,ga,va,ya,ld);if(d){const u=new U;Un.getBarycoord(ld,ga,va,ya,u),s&&(d.uv=Un.getInterpolatedAttribute(s,o,l,c,u,new qe)),r&&(d.uv1=Un.getInterpolatedAttribute(r,o,l,c,u,new qe)),a&&(d.normal=Un.getInterpolatedAttribute(a,o,l,c,u,new U),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new U,materialIndex:0};Un.getNormal(ga,va,ya,h.normal),d.face=h,d.barycoord=u}return d}class ce extends An{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],u=[];let h=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ht(c,3)),this.setAttribute("normal",new Ht(d,3)),this.setAttribute("uv",new Ht(u,2));function g(v,m,p,y,w,_,b,T,x,E,M){const S=_/x,A=b/E,I=_/2,P=b/2,F=T/2,H=x+1,$=E+1;let Z=0,V=0;const K=new U;for(let G=0;G<$;G++){const Y=G*A-P;for(let oe=0;oe<H;oe++){const me=oe*S-I;K[v]=me*y,K[m]=Y*w,K[p]=F,c.push(K.x,K.y,K.z),K[v]=0,K[m]=0,K[p]=T>0?1:-1,d.push(K.x,K.y,K.z),u.push(oe/x),u.push(1-G/E),Z+=1}}for(let G=0;G<E;G++)for(let Y=0;Y<x;Y++){const oe=h+Y+H*G,me=h+Y+H*(G+1),O=h+(Y+1)+H*(G+1),J=h+(Y+1)+H*G;l.push(oe,me,J),l.push(me,O,J),V+=6}o.addGroup(f,V,M),f+=V,h+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ce(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function sr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function dn(i){const e={};for(let t=0;t<i.length;t++){const n=sr(i[t]);for(const s in n)e[s]=n[s]}return e}function fm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ph(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:pt.workingColorSpace}const pm={clone:sr,merge:dn};var mm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Hi extends ur{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mm,this.fragmentShader=gm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=sr(e.uniforms),this.uniformsGroups=fm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class mh extends Jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new kt,this.projectionMatrix=new kt,this.projectionMatrixInverse=new kt,this.coordinateSystem=yi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pi=new U,cd=new qe,dd=new qe;class Vn extends mh{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=qr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qr*2*Math.atan(Math.tan(Or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Pi.x,Pi.y).multiplyScalar(-e/Pi.z),Pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Pi.x,Pi.y).multiplyScalar(-e/Pi.z)}getViewSize(e,t){return this.getViewBounds(e,cd,dd),t.subVectors(dd,cd)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Or*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Es=-90,As=1;class vm extends Jt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Vn(Es,As,e,t);s.layers=this.layers,this.add(s);const r=new Vn(Es,As,e,t);r.layers=this.layers,this.add(r);const a=new Vn(Es,As,e,t);a.layers=this.layers,this.add(a);const o=new Vn(Es,As,e,t);o.layers=this.layers,this.add(o);const l=new Vn(Es,As,e,t);l.layers=this.layers,this.add(l);const c=new Vn(Es,As,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===yi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ka)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(u,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class gh extends an{constructor(e,t,n,s,r,a,o,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:Qs,super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ym extends ds{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new gh(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:On}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ce(5,5,5),r=new Hi({name:"CubemapFromEquirect",uniforms:sr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:Ni});r.uniforms.tEquirect.value=t;const a=new D(s,r),o=t.minFilter;return t.minFilter===gi&&(t.minFilter=On),new vm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class vh extends Jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class _m{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Wl,this.updateRanges=[],this.version=0,this.uuid=_i()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_i()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_i()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const cn=new U;class ja{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyMatrix4(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyNormalMatrix(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.transformDirection(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=xt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),s=xt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),s=xt(s,this.array),r=xt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new qn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ja(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Cr extends ur{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new xe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Rs;const _r=new U,Cs=new U,Is=new U,Ps=new qe,wr=new qe,yh=new kt,Sa=new U,Mr=new U,ba=new U,ud=new qe,Fo=new qe,hd=new qe;class xa extends Jt{constructor(e=new Cr){if(super(),this.isSprite=!0,this.type="Sprite",Rs===void 0){Rs=new An;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new _m(t,5);Rs.setIndex([0,1,2,0,2,3]),Rs.setAttribute("position",new ja(n,3,0,!1)),Rs.setAttribute("uv",new ja(n,2,3,!1))}this.geometry=Rs,this.material=e,this.center=new qe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Cs.setFromMatrixScale(this.matrixWorld),yh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Is.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Cs.multiplyScalar(-Is.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Ta(Sa.set(-.5,-.5,0),Is,a,Cs,s,r),Ta(Mr.set(.5,-.5,0),Is,a,Cs,s,r),Ta(ba.set(.5,.5,0),Is,a,Cs,s,r),ud.set(0,0),Fo.set(1,0),hd.set(1,1);let o=e.ray.intersectTriangle(Sa,Mr,ba,!1,_r);if(o===null&&(Ta(Mr.set(-.5,.5,0),Is,a,Cs,s,r),Fo.set(0,1),o=e.ray.intersectTriangle(Sa,ba,Mr,!1,_r),o===null))return;const l=e.ray.origin.distanceTo(_r);l<e.near||l>e.far||t.push({distance:l,point:_r.clone(),uv:Un.getInterpolation(_r,Sa,Mr,ba,ud,Fo,hd,new qe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ta(i,e,t,n,s,r){Ps.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(wr.x=r*Ps.x-s*Ps.y,wr.y=s*Ps.x+r*Ps.y):wr.copy(Ps),i.copy(e),i.x+=wr.x,i.y+=wr.y,i.applyMatrix4(yh)}const Bo=new U,wm=new U,Mm=new Ze;class Zi{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Bo.subVectors(n,t).cross(wm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Bo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Mm.getNormalMatrix(e),s=this.coplanarPoint(Bo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qi=new mc,Ea=new U;class vc{constructor(e=new Zi,t=new Zi,n=new Zi,s=new Zi,r=new Zi,a=new Zi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=yi){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],d=s[5],u=s[6],h=s[7],f=s[8],g=s[9],v=s[10],m=s[11],p=s[12],y=s[13],w=s[14],_=s[15];if(n[0].setComponents(l-r,h-c,m-f,_-p).normalize(),n[1].setComponents(l+r,h+c,m+f,_+p).normalize(),n[2].setComponents(l+a,h+d,m+g,_+y).normalize(),n[3].setComponents(l-a,h-d,m-g,_-y).normalize(),n[4].setComponents(l-o,h-u,m-v,_-w).normalize(),t===yi)n[5].setComponents(l+o,h+u,m+v,_+w).normalize();else if(t===Ka)n[5].setComponents(o,u,v,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qi)}intersectsSprite(e){return qi.center.set(0,0,0),qi.radius=.7071067811865476,qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(qi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ea.x=s.normal.x>0?e.max.x:e.min.x,Ea.y=s.normal.y>0?e.max.y:e.min.y,Ea.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ea)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $e extends Jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}class $l extends an{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _h extends an{constructor(e,t,n,s,r,a,o,l,c,d=Ws){if(d!==Ws&&d!==nr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Ws&&(n=cs),n===void 0&&d===nr&&(n=tr),super(null,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Xn,this.minFilter=l!==void 0?l:Xn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Oi extends An{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new U,d=new qe;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,h=3;u<=t;u++,h+=3){const f=n+u/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(a[h]/e+1)/2,d.y=(a[h+1]/e+1)/2,l.push(d.x,d.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ht(a,3)),this.setAttribute("normal",new Ht(o,3)),this.setAttribute("uv",new Ht(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oi(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class et extends An{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],u=[],h=[],f=[];let g=0;const v=[],m=n/2;let p=0;y(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(d),this.setAttribute("position",new Ht(u,3)),this.setAttribute("normal",new Ht(h,3)),this.setAttribute("uv",new Ht(f,2));function y(){const _=new U,b=new U;let T=0;const x=(t-e)/n;for(let E=0;E<=r;E++){const M=[],S=E/r,A=S*(t-e)+e;for(let I=0;I<=s;I++){const P=I/s,F=P*l+o,H=Math.sin(F),$=Math.cos(F);b.x=A*H,b.y=-S*n+m,b.z=A*$,u.push(b.x,b.y,b.z),_.set(H,x,$).normalize(),h.push(_.x,_.y,_.z),f.push(P,1-S),M.push(g++)}v.push(M)}for(let E=0;E<s;E++)for(let M=0;M<r;M++){const S=v[M][E],A=v[M+1][E],I=v[M+1][E+1],P=v[M][E+1];(e>0||M!==0)&&(d.push(S,A,P),T+=3),(t>0||M!==r-1)&&(d.push(A,I,P),T+=3)}c.addGroup(p,T,0),p+=T}function w(_){const b=g,T=new qe,x=new U;let E=0;const M=_===!0?e:t,S=_===!0?1:-1;for(let I=1;I<=s;I++)u.push(0,m*S,0),h.push(0,S,0),f.push(.5,.5),g++;const A=g;for(let I=0;I<=s;I++){const F=I/s*l+o,H=Math.cos(F),$=Math.sin(F);x.x=M*$,x.y=m*S,x.z=M*H,u.push(x.x,x.y,x.z),h.push(0,S,0),T.x=H*.5+.5,T.y=$*.5*S+.5,f.push(T.x,T.y),g++}for(let I=0;I<s;I++){const P=b+I,F=A+I;_===!0?d.push(F,F+1,P):d.push(F+1,F,P),E+=3}c.addGroup(p,E,_===!0?1:2),p+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new et(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class St extends et{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new St(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class lo extends An{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),d(),this.setAttribute("position",new Ht(r,3)),this.setAttribute("normal",new Ht(r.slice(),3)),this.setAttribute("uv",new Ht(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const w=new U,_=new U,b=new U;for(let T=0;T<t.length;T+=3)f(t[T+0],w),f(t[T+1],_),f(t[T+2],b),l(w,_,b,y)}function l(y,w,_,b){const T=b+1,x=[];for(let E=0;E<=T;E++){x[E]=[];const M=y.clone().lerp(_,E/T),S=w.clone().lerp(_,E/T),A=T-E;for(let I=0;I<=A;I++)I===0&&E===T?x[E][I]=M:x[E][I]=M.clone().lerp(S,I/A)}for(let E=0;E<T;E++)for(let M=0;M<2*(T-E)-1;M++){const S=Math.floor(M/2);M%2===0?(h(x[E][S+1]),h(x[E+1][S]),h(x[E][S])):(h(x[E][S+1]),h(x[E+1][S+1]),h(x[E+1][S]))}}function c(y){const w=new U;for(let _=0;_<r.length;_+=3)w.x=r[_+0],w.y=r[_+1],w.z=r[_+2],w.normalize().multiplyScalar(y),r[_+0]=w.x,r[_+1]=w.y,r[_+2]=w.z}function d(){const y=new U;for(let w=0;w<r.length;w+=3){y.x=r[w+0],y.y=r[w+1],y.z=r[w+2];const _=m(y)/2/Math.PI+.5,b=p(y)/Math.PI+.5;a.push(_,1-b)}g(),u()}function u(){for(let y=0;y<a.length;y+=6){const w=a[y+0],_=a[y+2],b=a[y+4],T=Math.max(w,_,b),x=Math.min(w,_,b);T>.9&&x<.1&&(w<.2&&(a[y+0]+=1),_<.2&&(a[y+2]+=1),b<.2&&(a[y+4]+=1))}}function h(y){r.push(y.x,y.y,y.z)}function f(y,w){const _=y*3;w.x=e[_+0],w.y=e[_+1],w.z=e[_+2]}function g(){const y=new U,w=new U,_=new U,b=new U,T=new qe,x=new qe,E=new qe;for(let M=0,S=0;M<r.length;M+=9,S+=6){y.set(r[M+0],r[M+1],r[M+2]),w.set(r[M+3],r[M+4],r[M+5]),_.set(r[M+6],r[M+7],r[M+8]),T.set(a[S+0],a[S+1]),x.set(a[S+2],a[S+3]),E.set(a[S+4],a[S+5]),b.copy(y).add(w).add(_).divideScalar(3);const A=m(b);v(T,S+0,y,A),v(x,S+2,w,A),v(E,S+4,_,A)}}function v(y,w,_,b){b<0&&y.x===1&&(a[w]=y.x-1),_.x===0&&_.z===0&&(a[w]=b/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lo(e.vertices,e.indices,e.radius,e.details)}}class Nn extends lo{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Nn(e.radius,e.detail)}}class Et extends lo{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Et(e.radius,e.detail)}}class Jr extends An{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,u=e/o,h=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<d;p++){const y=p*h-a;for(let w=0;w<c;w++){const _=w*u-r;g.push(_,-y,0),v.push(0,0,1),m.push(w/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const w=y+c*p,_=y+c*(p+1),b=y+1+c*(p+1),T=y+1+c*p;f.push(w,_,T),f.push(_,b,T)}this.setIndex(f),this.setAttribute("position",new Ht(g,3)),this.setAttribute("normal",new Ht(v,3)),this.setAttribute("uv",new Ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jr(e.width,e.height,e.widthSegments,e.heightSegments)}}class pn extends An{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],d=[];let u=e;const h=(t-e)/s,f=new U,g=new qe;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,d.push(g.x,g.y)}u+=h}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const y=p+m,w=y,_=y+n+1,b=y+n+2,T=y+1;o.push(w,_,T),o.push(_,b,T)}}this.setIndex(o),this.setAttribute("position",new Ht(l,3)),this.setAttribute("normal",new Ht(c,3)),this.setAttribute("uv",new Ht(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pn(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class hr extends An{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],d=new U,u=new U,h=new U;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const v=g/s*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),d.x=e*Math.cos(v),d.y=e*Math.sin(v),h.subVectors(u,d).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const v=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,y=(s+1)*f+g;a.push(v,m,y),a.push(m,p,y)}this.setIndex(a),this.setAttribute("position",new Ht(o,3)),this.setAttribute("normal",new Ht(l,3)),this.setAttribute("uv",new Ht(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class us extends ur{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rh,this.normalScale=new qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Sm extends ur{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Mp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class bm extends ur{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const fd={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class xm{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){const u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=c.length;u<h;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(d))return g}return null}}}const Tm=new xm;class yc{constructor(e){this.manager=e!==void 0?e:Tm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}yc.DEFAULT_MATERIAL_NAME="__DEFAULT";class Em extends yc{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=fd.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=Yr("img");function l(){d(),fd.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){d(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class Am extends yc{constructor(e){super(e)}load(e,t,n,s){const r=new an,a=new Em(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class wh extends Jt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Mh extends wh{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Jt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ho=new kt,pd=new U,md=new U;class Rm{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qe(512,512),this.map=null,this.mapPass=null,this.matrix=new kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vc,this._frameExtents=new qe(1,1),this._viewportCount=1,this._viewports=[new Ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;pd.setFromMatrixPosition(e.matrixWorld),t.position.copy(pd),md.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(md),t.updateMatrixWorld(),Ho.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ho),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ho)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class co extends mh{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Cm extends Rm{constructor(){super(new co(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Za extends wh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Jt.DEFAULT_UP),this.updateMatrix(),this.target=new Jt,this.shadow=new Cm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Im extends Vn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}const gd=new kt;class Pm{constructor(e,t,n=0,s=1/0){this.ray=new dh(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new gc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return gd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gd),this}intersectObject(e,t=!0,n=[]){return Xl(e,this,n,t),n.sort(vd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Xl(e[s],this,n,t);return n.sort(vd),n}}function vd(i,e){return i.distance-e.distance}function Xl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Xl(r[a],e,t,!0)}}function yd(i,e,t,n){const s=Lm(n);switch(t){case Ju:return i*e;case eh:return i*e;case th:return i*e*2;case nh:return i*e/s.components*s.byteLength;case uc:return i*e/s.components*s.byteLength;case ih:return i*e*2/s.components*s.byteLength;case hc:return i*e*2/s.components*s.byteLength;case Qu:return i*e*3/s.components*s.byteLength;case $n:return i*e*4/s.components*s.byteLength;case fc:return i*e*4/s.components*s.byteLength;case Na:case Fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ba:case Ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case _l:case Ml:return Math.max(i,16)*Math.max(e,8)/4;case yl:case wl:return Math.max(i,8)*Math.max(e,8)/2;case Sl:case bl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case xl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Tl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case El:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Al:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Rl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Il:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Pl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ll:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Dl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case kl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ul:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ol:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Nl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Fl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case za:case Bl:case Hl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case sh:case zl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Gl:case Vl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Lm(i){switch(i){case Si:case Ku:return{byteLength:1,components:1};case Xr:case ju:case jr:return{byteLength:2,components:1};case cc:case dc:return{byteLength:2,components:4};case cs:case lc:case vi:return{byteLength:4,components:1};case Zu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ac}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ac);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Sh(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Dm(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,d);else{u.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<u.length;f++){const g=u[h],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,u[h]=v)}u.length=h+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];i.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var km=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Um=`#ifdef USE_ALPHAHASH
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
#endif`,Om=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Nm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hm=`#ifdef USE_AOMAP
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
#endif`,zm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gm=`#ifdef USE_BATCHING
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
#endif`,Vm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$m=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,qm=`#ifdef USE_IRIDESCENCE
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
#endif`,Ym=`#ifdef USE_BUMPMAP
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
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,e0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,t0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,n0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,i0=`#define PI 3.141592653589793
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
} // validated`,s0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,r0=`vec3 transformedNormal = objectNormal;
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
#endif`,a0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,o0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,l0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,c0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,d0="gl_FragColor = linearToOutputTexel( gl_FragColor );",u0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,h0=`#ifdef USE_ENVMAP
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
#endif`,f0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,p0=`#ifdef USE_ENVMAP
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
#endif`,m0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,g0=`#ifdef USE_ENVMAP
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
#endif`,v0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,y0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,w0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,M0=`#ifdef USE_GRADIENTMAP
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
}`,S0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,b0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,x0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,T0=`uniform bool receiveShadow;
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
#endif`,E0=`#ifdef USE_ENVMAP
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
#endif`,A0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,R0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,C0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,I0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,P0=`PhysicalMaterial material;
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
#endif`,L0=`struct PhysicalMaterial {
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
}`,D0=`
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
#endif`,k0=`#if defined( RE_IndirectDiffuse )
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
#endif`,U0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,O0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,N0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,F0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,B0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,H0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,z0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,G0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,V0=`#if defined( USE_POINTS_UV )
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
#endif`,W0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,X0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,q0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Y0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,K0=`#ifdef USE_MORPHTARGETS
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
#endif`,j0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Z0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,J0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Q0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ng=`#ifdef USE_NORMALMAP
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
#endif`,ig=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ag=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,og=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ug=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,yg=`float getShadowMask() {
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
}`,_g=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wg=`#ifdef USE_SKINNING
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
#endif`,Mg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sg=`#ifdef USE_SKINNING
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
#endif`,bg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Eg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ag=`#ifdef USE_TRANSMISSION
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
#endif`,Rg=`#ifdef USE_TRANSMISSION
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
#endif`,Cg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Dg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kg=`uniform sampler2D t2D;
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
}`,Ug=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Og=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bg=`#include <common>
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
}`,Hg=`#if DEPTH_PACKING == 3200
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
}`,zg=`#define DISTANCE
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
}`,Gg=`#define DISTANCE
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
}`,Vg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$g=`uniform float scale;
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
}`,Xg=`uniform vec3 diffuse;
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
}`,qg=`#include <common>
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
}`,Yg=`uniform vec3 diffuse;
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
}`,Kg=`#define LAMBERT
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
}`,jg=`#define LAMBERT
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
}`,Zg=`#define MATCAP
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
}`,Jg=`#define MATCAP
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
}`,Qg=`#define NORMAL
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
}`,ev=`#define NORMAL
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
}`,tv=`#define PHONG
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
}`,nv=`#define PHONG
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
}`,iv=`#define STANDARD
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
}`,sv=`#define STANDARD
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
}`,rv=`#define TOON
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
}`,av=`#define TOON
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
}`,ov=`uniform float size;
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
}`,lv=`uniform vec3 diffuse;
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
}`,cv=`#include <common>
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
}`,dv=`uniform vec3 color;
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
}`,uv=`uniform float rotation;
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
}`,hv=`uniform vec3 diffuse;
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
}`,Qe={alphahash_fragment:km,alphahash_pars_fragment:Um,alphamap_fragment:Om,alphamap_pars_fragment:Nm,alphatest_fragment:Fm,alphatest_pars_fragment:Bm,aomap_fragment:Hm,aomap_pars_fragment:zm,batching_pars_vertex:Gm,batching_vertex:Vm,begin_vertex:Wm,beginnormal_vertex:$m,bsdfs:Xm,iridescence_fragment:qm,bumpmap_pars_fragment:Ym,clipping_planes_fragment:Km,clipping_planes_pars_fragment:jm,clipping_planes_pars_vertex:Zm,clipping_planes_vertex:Jm,color_fragment:Qm,color_pars_fragment:e0,color_pars_vertex:t0,color_vertex:n0,common:i0,cube_uv_reflection_fragment:s0,defaultnormal_vertex:r0,displacementmap_pars_vertex:a0,displacementmap_vertex:o0,emissivemap_fragment:l0,emissivemap_pars_fragment:c0,colorspace_fragment:d0,colorspace_pars_fragment:u0,envmap_fragment:h0,envmap_common_pars_fragment:f0,envmap_pars_fragment:p0,envmap_pars_vertex:m0,envmap_physical_pars_fragment:E0,envmap_vertex:g0,fog_vertex:v0,fog_pars_vertex:y0,fog_fragment:_0,fog_pars_fragment:w0,gradientmap_pars_fragment:M0,lightmap_pars_fragment:S0,lights_lambert_fragment:b0,lights_lambert_pars_fragment:x0,lights_pars_begin:T0,lights_toon_fragment:A0,lights_toon_pars_fragment:R0,lights_phong_fragment:C0,lights_phong_pars_fragment:I0,lights_physical_fragment:P0,lights_physical_pars_fragment:L0,lights_fragment_begin:D0,lights_fragment_maps:k0,lights_fragment_end:U0,logdepthbuf_fragment:O0,logdepthbuf_pars_fragment:N0,logdepthbuf_pars_vertex:F0,logdepthbuf_vertex:B0,map_fragment:H0,map_pars_fragment:z0,map_particle_fragment:G0,map_particle_pars_fragment:V0,metalnessmap_fragment:W0,metalnessmap_pars_fragment:$0,morphinstance_vertex:X0,morphcolor_vertex:q0,morphnormal_vertex:Y0,morphtarget_pars_vertex:K0,morphtarget_vertex:j0,normal_fragment_begin:Z0,normal_fragment_maps:J0,normal_pars_fragment:Q0,normal_pars_vertex:eg,normal_vertex:tg,normalmap_pars_fragment:ng,clearcoat_normal_fragment_begin:ig,clearcoat_normal_fragment_maps:sg,clearcoat_pars_fragment:rg,iridescence_pars_fragment:ag,opaque_fragment:og,packing:lg,premultiplied_alpha_fragment:cg,project_vertex:dg,dithering_fragment:ug,dithering_pars_fragment:hg,roughnessmap_fragment:fg,roughnessmap_pars_fragment:pg,shadowmap_pars_fragment:mg,shadowmap_pars_vertex:gg,shadowmap_vertex:vg,shadowmask_pars_fragment:yg,skinbase_vertex:_g,skinning_pars_vertex:wg,skinning_vertex:Mg,skinnormal_vertex:Sg,specularmap_fragment:bg,specularmap_pars_fragment:xg,tonemapping_fragment:Tg,tonemapping_pars_fragment:Eg,transmission_fragment:Ag,transmission_pars_fragment:Rg,uv_pars_fragment:Cg,uv_pars_vertex:Ig,uv_vertex:Pg,worldpos_vertex:Lg,background_vert:Dg,background_frag:kg,backgroundCube_vert:Ug,backgroundCube_frag:Og,cube_vert:Ng,cube_frag:Fg,depth_vert:Bg,depth_frag:Hg,distanceRGBA_vert:zg,distanceRGBA_frag:Gg,equirect_vert:Vg,equirect_frag:Wg,linedashed_vert:$g,linedashed_frag:Xg,meshbasic_vert:qg,meshbasic_frag:Yg,meshlambert_vert:Kg,meshlambert_frag:jg,meshmatcap_vert:Zg,meshmatcap_frag:Jg,meshnormal_vert:Qg,meshnormal_frag:ev,meshphong_vert:tv,meshphong_frag:nv,meshphysical_vert:iv,meshphysical_frag:sv,meshtoon_vert:rv,meshtoon_frag:av,points_vert:ov,points_frag:lv,shadow_vert:cv,shadow_frag:dv,sprite_vert:uv,sprite_frag:hv},ge={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},Qn={basic:{uniforms:dn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:dn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new xe(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:dn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:dn([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:dn([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new xe(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:dn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:dn([ge.points,ge.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:dn([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:dn([ge.common,ge.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:dn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:dn([ge.sprite,ge.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:dn([ge.common,ge.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:dn([ge.lights,ge.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Qn.physical={uniforms:dn([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const Aa={r:0,b:0,g:0},Yi=new ni,fv=new kt;function pv(i,e,t,n,s,r,a){const o=new xe(0);let l=r===!0?0:1,c,d,u=null,h=0,f=null;function g(w){let _=w.isScene===!0?w.background:null;return _&&_.isTexture&&(_=(w.backgroundBlurriness>0?t:e).get(_)),_}function v(w){let _=!1;const b=g(w);b===null?p(o,l):b&&b.isColor&&(p(b,1),_=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(w,_){const b=g(_);b&&(b.isCubeTexture||b.mapping===oo)?(d===void 0&&(d=new D(new ce(1,1,1),new Hi({name:"BackgroundCubeMaterial",uniforms:sr(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(T,x,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Yi.copy(_.backgroundRotation),Yi.x*=-1,Yi.y*=-1,Yi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Yi.y*=-1,Yi.z*=-1),d.material.uniforms.envMap.value=b,d.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(fv.makeRotationFromEuler(Yi)),d.material.toneMapped=pt.getTransfer(b.colorSpace)!==At,(u!==b||h!==b.version||f!==i.toneMapping)&&(d.material.needsUpdate=!0,u=b,h=b.version,f=i.toneMapping),d.layers.enableAll(),w.unshift(d,d.geometry,d.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new D(new Jr(2,2),new Hi({name:"BackgroundMaterial",uniforms:sr(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:Bi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=pt.getTransfer(b.colorSpace)!==At,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||h!==b.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=b,h=b.version,f=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function p(w,_){w.getRGB(Aa,ph(i)),n.buffers.color.setClear(Aa.r,Aa.g,Aa.b,_,a)}function y(){d!==void 0&&(d.geometry.dispose(),d.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(w,_=1){o.set(w),l=_,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,p(o,l)},render:v,addToRenderList:m,dispose:y}}function mv(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(S,A,I,P,F){let H=!1;const $=u(P,I,A);r!==$&&(r=$,c(r.object)),H=f(S,P,I,F),H&&g(S,P,I,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,_(S,A,I,P),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function d(S){return i.deleteVertexArray(S)}function u(S,A,I){const P=I.wireframe===!0;let F=n[S.id];F===void 0&&(F={},n[S.id]=F);let H=F[A.id];H===void 0&&(H={},F[A.id]=H);let $=H[P];return $===void 0&&($=h(l()),H[P]=$),$}function h(S){const A=[],I=[],P=[];for(let F=0;F<t;F++)A[F]=0,I[F]=0,P[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:I,attributeDivisors:P,object:S,attributes:{},index:null}}function f(S,A,I,P){const F=r.attributes,H=A.attributes;let $=0;const Z=I.getAttributes();for(const V in Z)if(Z[V].location>=0){const G=F[V];let Y=H[V];if(Y===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(Y=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(Y=S.instanceColor)),G===void 0||G.attribute!==Y||Y&&G.data!==Y.data)return!0;$++}return r.attributesNum!==$||r.index!==P}function g(S,A,I,P){const F={},H=A.attributes;let $=0;const Z=I.getAttributes();for(const V in Z)if(Z[V].location>=0){let G=H[V];G===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(G=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(G=S.instanceColor));const Y={};Y.attribute=G,G&&G.data&&(Y.data=G.data),F[V]=Y,$++}r.attributes=F,r.attributesNum=$,r.index=P}function v(){const S=r.newAttributes;for(let A=0,I=S.length;A<I;A++)S[A]=0}function m(S){p(S,0)}function p(S,A){const I=r.newAttributes,P=r.enabledAttributes,F=r.attributeDivisors;I[S]=1,P[S]===0&&(i.enableVertexAttribArray(S),P[S]=1),F[S]!==A&&(i.vertexAttribDivisor(S,A),F[S]=A)}function y(){const S=r.newAttributes,A=r.enabledAttributes;for(let I=0,P=A.length;I<P;I++)A[I]!==S[I]&&(i.disableVertexAttribArray(I),A[I]=0)}function w(S,A,I,P,F,H,$){$===!0?i.vertexAttribIPointer(S,A,I,F,H):i.vertexAttribPointer(S,A,I,P,F,H)}function _(S,A,I,P){v();const F=P.attributes,H=I.getAttributes(),$=A.defaultAttributeValues;for(const Z in H){const V=H[Z];if(V.location>=0){let K=F[Z];if(K===void 0&&(Z==="instanceMatrix"&&S.instanceMatrix&&(K=S.instanceMatrix),Z==="instanceColor"&&S.instanceColor&&(K=S.instanceColor)),K!==void 0){const G=K.normalized,Y=K.itemSize,oe=e.get(K);if(oe===void 0)continue;const me=oe.buffer,O=oe.type,J=oe.bytesPerElement,we=O===i.INT||O===i.UNSIGNED_INT||K.gpuType===lc;if(K.isInterleavedBufferAttribute){const fe=K.data,De=fe.stride,Pe=K.offset;if(fe.isInstancedInterleavedBuffer){for(let Be=0;Be<V.locationSize;Be++)p(V.location+Be,fe.meshPerAttribute);S.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let Be=0;Be<V.locationSize;Be++)m(V.location+Be);i.bindBuffer(i.ARRAY_BUFFER,me);for(let Be=0;Be<V.locationSize;Be++)w(V.location+Be,Y/V.locationSize,O,G,De*J,(Pe+Y/V.locationSize*Be)*J,we)}else{if(K.isInstancedBufferAttribute){for(let fe=0;fe<V.locationSize;fe++)p(V.location+fe,K.meshPerAttribute);S.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let fe=0;fe<V.locationSize;fe++)m(V.location+fe);i.bindBuffer(i.ARRAY_BUFFER,me);for(let fe=0;fe<V.locationSize;fe++)w(V.location+fe,Y/V.locationSize,O,G,Y*J,Y/V.locationSize*fe*J,we)}}else if($!==void 0){const G=$[Z];if(G!==void 0)switch(G.length){case 2:i.vertexAttrib2fv(V.location,G);break;case 3:i.vertexAttrib3fv(V.location,G);break;case 4:i.vertexAttrib4fv(V.location,G);break;default:i.vertexAttrib1fv(V.location,G)}}}}y()}function b(){E();for(const S in n){const A=n[S];for(const I in A){const P=A[I];for(const F in P)d(P[F].object),delete P[F];delete A[I]}delete n[S]}}function T(S){if(n[S.id]===void 0)return;const A=n[S.id];for(const I in A){const P=A[I];for(const F in P)d(P[F].object),delete P[F];delete A[I]}delete n[S.id]}function x(S){for(const A in n){const I=n[A];if(I[S.id]===void 0)continue;const P=I[S.id];for(const F in P)d(P[F].object),delete P[F];delete I[S.id]}}function E(){M(),a=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:M,dispose:b,releaseStatesOfGeometry:T,releaseStatesOfProgram:x,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function gv(i,e,t){let n;function s(c){n=c}function r(c,d){i.drawArrays(n,c,d),t.update(d,n,1)}function a(c,d,u){u!==0&&(i.drawArraysInstanced(n,c,d,u),t.update(d,n,u))}function o(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,u);let f=0;for(let g=0;g<u;g++)f+=d[g];t.update(f,n,1)}function l(c,d,u,h){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],d[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,d,0,h,0,u);let g=0;for(let v=0;v<u;v++)g+=d[v]*h[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function vv(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const x=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(x){return!(x!==$n&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){const E=x===jr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(x!==Si&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&x!==vi&&!E)}function l(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:_,vertexTextures:b,maxSamples:T}}function yv(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Zi,o=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const f=u.length!==0||h||n!==0||s;return s=h,n=u.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?d(null):c();else{const y=r?0:n,w=y*4;let _=p.clippingState||null;l.value=_,_=d(g,h,w,f);for(let b=0;b!==w;++b)_[b]=t[b];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,h,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,y=h.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,_=f;w!==v;++w,_+=4)a.copy(u[w]).applyMatrix4(y,o),a.normal.toArray(m,_),m[_+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function _v(i){let e=new WeakMap;function t(a,o){return o===ml?a.mapping=Qs:o===gl&&(a.mapping=er),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ml||o===gl)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new ym(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const zs=4,_d=[.125,.215,.35,.446,.526,.582],ns=20,zo=new co,wd=new xe;let Go=null,Vo=0,Wo=0,$o=!1;const Ji=(1+Math.sqrt(5))/2,Ls=1/Ji,Md=[new U(-Ji,Ls,0),new U(Ji,Ls,0),new U(-Ls,0,Ji),new U(Ls,0,Ji),new U(0,Ji,-Ls),new U(0,Ji,Ls),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class Sd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Go=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Wo=this._renderer.getActiveMipmapLevel(),$o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Td(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Go,Vo,Wo),this._renderer.xr.enabled=$o,e.scissorTest=!1,Ra(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Qs||e.mapping===er?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Go=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Wo=this._renderer.getActiveMipmapLevel(),$o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:On,minFilter:On,generateMipmaps:!1,type:jr,format:$n,colorSpace:ir,depthBuffer:!1},s=bd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bd(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wv(r)),this._blurMaterial=Mv(r,e,t)}return s}_compileMaterial(e){const t=new D(this._lodPlanes[0],e);this._renderer.compile(t,zo)}_sceneToCubeUV(e,t,n,s){const o=new Vn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(wd),d.toneMapping=Fi,d.autoClear=!1;const f=new ut({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1}),g=new D(new ce,f);let v=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,v=!0):(f.color.copy(wd),v=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):y===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const w=this._cubeSize;Ra(s,y*w,p>2?w:0,w,w),d.setRenderTarget(s),v&&d.render(g,o),d.render(e,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Qs||e.mapping===er;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Td()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xd());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new D(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ra(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,zo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Md[(s-r-1)%Md.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new D(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ns-1),v=r/g,m=isFinite(r)?1+Math.floor(d*v):ns;m>ns&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ns}`);const p=[];let y=0;for(let x=0;x<ns;++x){const E=x/v,M=Math.exp(-E*E/2);p.push(M),x===0?y+=M:x<m&&(y+=2*M)}for(let x=0;x<p.length;x++)p[x]=p[x]/y;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:w}=this;h.dTheta.value=g,h.mipInt.value=w-n;const _=this._sizeLods[s],b=3*_*(s>w-zs?s-w+zs:0),T=4*(this._cubeSize-_);Ra(t,b,T,3*_,2*_),l.setRenderTarget(t),l.render(u,zo)}}function wv(i){const e=[],t=[],n=[];let s=i;const r=i-zs+1+_d.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-zs?l=_d[a-i+zs-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],f=6,g=6,v=3,m=2,p=1,y=new Float32Array(v*g*f),w=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let T=0;T<f;T++){const x=T%3*2/3-1,E=T>2?0:-1,M=[x,E,0,x+2/3,E,0,x+2/3,E+1,0,x,E,0,x+2/3,E+1,0,x,E+1,0];y.set(M,v*g*T),w.set(h,m*g*T);const S=[T,T,T,T,T,T];_.set(S,p*g*T)}const b=new An;b.setAttribute("position",new qn(y,v)),b.setAttribute("uv",new qn(w,m)),b.setAttribute("faceIndex",new qn(_,p)),e.push(b),s>zs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function bd(i,e,t){const n=new ds(i,e,t);return n.texture.mapping=oo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ra(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Mv(i,e,t){const n=new Float32Array(ns),s=new U(0,1,0);return new Hi({name:"SphericalGaussianBlur",defines:{n:ns,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:_c(),fragmentShader:`

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
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function xd(){return new Hi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_c(),fragmentShader:`

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
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function Td(){return new Hi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function _c(){return`

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
	`}function Sv(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ml||l===gl,d=l===Qs||l===er;if(c||d){let u=e.get(o);const h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Sd(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||d&&f&&s(f)?(t===null&&(t=new Sd(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function bv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Fs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function xv(i,e,t,n){const s={},r=new WeakMap;function a(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(u){const h=u.attributes;for(const f in h)e.update(h[f],i.ARRAY_BUFFER)}function c(u){const h=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const y=f.array;v=f.version;for(let w=0,_=y.length;w<_;w+=3){const b=y[w+0],T=y[w+1],x=y[w+2];h.push(b,T,T,x,x,b)}}else if(g!==void 0){const y=g.array;v=g.version;for(let w=0,_=y.length/3-1;w<_;w+=3){const b=w+0,T=w+1,x=w+2;h.push(b,T,T,x,x,b)}}else return;const m=new(oh(h)?fh:hh)(h,1);m.version=v;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function d(u){const h=r.get(u);if(h){const f=u.index;f!==null&&h.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function Tv(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,f){i.drawElements(n,f,r,h*a),t.update(f,n,1)}function c(h,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,h*a,g),t.update(f,n,g))}function d(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(h,f,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,h,0,v,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y]*v[y];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function Ev(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Av(i,e,t){const n=new WeakMap,s=new Ft;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=n.get(o);if(h===void 0||h.count!==u){let S=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",S)};var f=S;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),m===!0&&(_=3);let b=o.attributes.position.count*_,T=1;b>e.maxTextureSize&&(T=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const x=new Float32Array(b*T*4*u),E=new ch(x,b,T,u);E.type=vi,E.needsUpdate=!0;const M=_*4;for(let A=0;A<u;A++){const I=p[A],P=y[A],F=w[A],H=b*T*4*A;for(let $=0;$<I.count;$++){const Z=$*M;g===!0&&(s.fromBufferAttribute(I,$),x[H+Z+0]=s.x,x[H+Z+1]=s.y,x[H+Z+2]=s.z,x[H+Z+3]=0),v===!0&&(s.fromBufferAttribute(P,$),x[H+Z+4]=s.x,x[H+Z+5]=s.y,x[H+Z+6]=s.z,x[H+Z+7]=0),m===!0&&(s.fromBufferAttribute(F,$),x[H+Z+8]=s.x,x[H+Z+9]=s.y,x[H+Z+10]=s.z,x[H+Z+11]=F.itemSize===4?s.w:1)}}h={count:u,texture:E,size:new qe(b,T)},n.set(o,h),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Rv(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const bh=new an,Ed=new _h(1,1),xh=new ch,Th=new nm,Eh=new gh,Ad=[],Rd=[],Cd=new Float32Array(16),Id=new Float32Array(9),Pd=new Float32Array(4);function fr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Ad[s];if(r===void 0&&(r=new Float32Array(s),Ad[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Xt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function qt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function uo(i,e){let t=Rd[e];t===void 0&&(t=new Int32Array(e),Rd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Cv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Iv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;i.uniform2fv(this.addr,e),qt(t,e)}}function Pv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;i.uniform3fv(this.addr,e),qt(t,e)}}function Lv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;i.uniform4fv(this.addr,e),qt(t,e)}}function Dv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;Pd.set(n),i.uniformMatrix2fv(this.addr,!1,Pd),qt(t,n)}}function kv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;Id.set(n),i.uniformMatrix3fv(this.addr,!1,Id),qt(t,n)}}function Uv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;Cd.set(n),i.uniformMatrix4fv(this.addr,!1,Cd),qt(t,n)}}function Ov(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Nv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;i.uniform2iv(this.addr,e),qt(t,e)}}function Fv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;i.uniform3iv(this.addr,e),qt(t,e)}}function Bv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;i.uniform4iv(this.addr,e),qt(t,e)}}function Hv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function zv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;i.uniform2uiv(this.addr,e),qt(t,e)}}function Gv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;i.uniform3uiv(this.addr,e),qt(t,e)}}function Vv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;i.uniform4uiv(this.addr,e),qt(t,e)}}function Wv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ed.compareFunction=ah,r=Ed):r=bh,t.setTexture2D(e||r,s)}function $v(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Th,s)}function Xv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Eh,s)}function qv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||xh,s)}function Yv(i){switch(i){case 5126:return Cv;case 35664:return Iv;case 35665:return Pv;case 35666:return Lv;case 35674:return Dv;case 35675:return kv;case 35676:return Uv;case 5124:case 35670:return Ov;case 35667:case 35671:return Nv;case 35668:case 35672:return Fv;case 35669:case 35673:return Bv;case 5125:return Hv;case 36294:return zv;case 36295:return Gv;case 36296:return Vv;case 35678:case 36198:case 36298:case 36306:case 35682:return Wv;case 35679:case 36299:case 36307:return $v;case 35680:case 36300:case 36308:case 36293:return Xv;case 36289:case 36303:case 36311:case 36292:return qv}}function Kv(i,e){i.uniform1fv(this.addr,e)}function jv(i,e){const t=fr(e,this.size,2);i.uniform2fv(this.addr,t)}function Zv(i,e){const t=fr(e,this.size,3);i.uniform3fv(this.addr,t)}function Jv(i,e){const t=fr(e,this.size,4);i.uniform4fv(this.addr,t)}function Qv(i,e){const t=fr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ey(i,e){const t=fr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function ty(i,e){const t=fr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ny(i,e){i.uniform1iv(this.addr,e)}function iy(i,e){i.uniform2iv(this.addr,e)}function sy(i,e){i.uniform3iv(this.addr,e)}function ry(i,e){i.uniform4iv(this.addr,e)}function ay(i,e){i.uniform1uiv(this.addr,e)}function oy(i,e){i.uniform2uiv(this.addr,e)}function ly(i,e){i.uniform3uiv(this.addr,e)}function cy(i,e){i.uniform4uiv(this.addr,e)}function dy(i,e,t){const n=this.cache,s=e.length,r=uo(t,s);Xt(n,r)||(i.uniform1iv(this.addr,r),qt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||bh,r[a])}function uy(i,e,t){const n=this.cache,s=e.length,r=uo(t,s);Xt(n,r)||(i.uniform1iv(this.addr,r),qt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Th,r[a])}function hy(i,e,t){const n=this.cache,s=e.length,r=uo(t,s);Xt(n,r)||(i.uniform1iv(this.addr,r),qt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Eh,r[a])}function fy(i,e,t){const n=this.cache,s=e.length,r=uo(t,s);Xt(n,r)||(i.uniform1iv(this.addr,r),qt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||xh,r[a])}function py(i){switch(i){case 5126:return Kv;case 35664:return jv;case 35665:return Zv;case 35666:return Jv;case 35674:return Qv;case 35675:return ey;case 35676:return ty;case 5124:case 35670:return ny;case 35667:case 35671:return iy;case 35668:case 35672:return sy;case 35669:case 35673:return ry;case 5125:return ay;case 36294:return oy;case 36295:return ly;case 36296:return cy;case 35678:case 36198:case 36298:case 36306:case 35682:return dy;case 35679:case 36299:case 36307:return uy;case 35680:case 36300:case 36308:case 36293:return hy;case 36289:case 36303:case 36311:case 36292:return fy}}class my{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Yv(t.type)}}class gy{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=py(t.type)}}class vy{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Xo=/(\w+)(\])?(\[|\.)?/g;function Ld(i,e){i.seq.push(e),i.map[e.id]=e}function yy(i,e,t){const n=i.name,s=n.length;for(Xo.lastIndex=0;;){const r=Xo.exec(n),a=Xo.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Ld(t,c===void 0?new my(o,i,e):new gy(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new vy(o),Ld(t,u)),t=u}}}class Ga{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);yy(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Dd(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const _y=37297;let wy=0;function My(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const kd=new Ze;function Sy(i){pt._getMatrix(kd,pt.workingColorSpace,i);const e=`mat3( ${kd.elements.map(t=>t.toFixed(4))} )`;switch(pt.getTransfer(i)){case Ya:return[e,"LinearTransferOETF"];case At:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ud(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+My(i.getShaderSource(e),a)}else return s}function by(i,e){const t=Sy(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function xy(i,e){let t;switch(e){case pp:t="Linear";break;case mp:t="Reinhard";break;case gp:t="Cineon";break;case vp:t="ACESFilmic";break;case _p:t="AgX";break;case oc:t="Neutral";break;case yp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ca=new U;function Ty(){pt.getLuminanceCoefficients(Ca);const i=Ca.x.toFixed(4),e=Ca.y.toFixed(4),t=Ca.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ey(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ir).join(`
`)}function Ay(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ry(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ir(i){return i!==""}function Od(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Nd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Cy=/^[ \t]*#include +<([\w\d./]+)>/gm;function ql(i){return i.replace(Cy,Py)}const Iy=new Map;function Py(i,e){let t=Qe[e];if(t===void 0){const n=Iy.get(e);if(n!==void 0)t=Qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ql(t)}const Ly=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fd(i){return i.replace(Ly,Dy)}function Dy(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bd(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function ky(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===$u?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Xu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ui&&(e="SHADOWMAP_TYPE_VSM"),e}function Uy(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Qs:case er:e="ENVMAP_TYPE_CUBE";break;case oo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Oy(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case er:e="ENVMAP_MODE_REFRACTION";break}return e}function Ny(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case qu:e="ENVMAP_BLENDING_MULTIPLY";break;case hp:e="ENVMAP_BLENDING_MIX";break;case fp:e="ENVMAP_BLENDING_ADD";break}return e}function Fy(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function By(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=ky(t),c=Uy(t),d=Oy(t),u=Ny(t),h=Fy(t),f=Ey(t),g=Ay(r),v=s.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ir).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ir).join(`
`),p.length>0&&(p+=`
`)):(m=[Bd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ir).join(`
`),p=[Bd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Fi?"#define TONE_MAPPING":"",t.toneMapping!==Fi?Qe.tonemapping_pars_fragment:"",t.toneMapping!==Fi?xy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,by("linearToOutputTexel",t.outputColorSpace),Ty(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ir).join(`
`)),a=ql(a),a=Od(a,t),a=Nd(a,t),o=ql(o),o=Od(o,t),o=Nd(o,t),a=Fd(a),o=Fd(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Xc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Xc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=y+m+a,_=y+p+o,b=Dd(s,s.VERTEX_SHADER,w),T=Dd(s,s.FRAGMENT_SHADER,_);s.attachShader(v,b),s.attachShader(v,T),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function x(A){if(i.debug.checkShaderErrors){const I=s.getProgramInfoLog(v).trim(),P=s.getShaderInfoLog(b).trim(),F=s.getShaderInfoLog(T).trim();let H=!0,$=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,b,T);else{const Z=Ud(s,b,"vertex"),V=Ud(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+I+`
`+Z+`
`+V)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(P===""||F==="")&&($=!1);$&&(A.diagnostics={runnable:H,programLog:I,vertexShader:{log:P,prefix:m},fragmentShader:{log:F,prefix:p}})}s.deleteShader(b),s.deleteShader(T),E=new Ga(s,v),M=Ry(s,v)}let E;this.getUniforms=function(){return E===void 0&&x(this),E};let M;this.getAttributes=function(){return M===void 0&&x(this),M};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,_y)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=wy++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=b,this.fragmentShader=T,this}let Hy=0;class zy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Gy(e),t.set(e,n)),n}}class Gy{constructor(e){this.id=Hy++,this.code=e,this.usedTimes=0}}function Vy(i,e,t,n,s,r,a){const o=new gc,l=new zy,c=new Set,d=[],u=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,S,A,I,P){const F=I.fog,H=P.geometry,$=M.isMeshStandardMaterial?I.environment:null,Z=(M.isMeshStandardMaterial?t:e).get(M.envMap||$),V=Z&&Z.mapping===oo?Z.image.height:null,K=g[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const G=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Y=G!==void 0?G.length:0;let oe=0;H.morphAttributes.position!==void 0&&(oe=1),H.morphAttributes.normal!==void 0&&(oe=2),H.morphAttributes.color!==void 0&&(oe=3);let me,O,J,we;if(K){const bt=Qn[K];me=bt.vertexShader,O=bt.fragmentShader}else me=M.vertexShader,O=M.fragmentShader,l.update(M),J=l.getVertexShaderID(M),we=l.getFragmentShaderID(M);const fe=i.getRenderTarget(),De=i.state.buffers.depth.getReversed(),Pe=P.isInstancedMesh===!0,Be=P.isBatchedMesh===!0,mt=!!M.map,Ye=!!M.matcap,yt=!!Z,k=!!M.aoMap,on=!!M.lightMap,st=!!M.bumpMap,rt=!!M.normalMap,Ne=!!M.displacementMap,It=!!M.emissiveMap,Ue=!!M.metalnessMap,L=!!M.roughnessMap,R=M.anisotropy>0,W=M.clearcoat>0,ne=M.dispersion>0,re=M.iridescence>0,te=M.sheen>0,Le=M.transmission>0,_e=R&&!!M.anisotropyMap,Ae=W&&!!M.clearcoatMap,lt=W&&!!M.clearcoatNormalMap,de=W&&!!M.clearcoatRoughnessMap,Re=re&&!!M.iridescenceMap,ze=re&&!!M.iridescenceThicknessMap,Ve=te&&!!M.sheenColorMap,Ce=te&&!!M.sheenRoughnessMap,at=!!M.specularMap,Je=!!M.specularColorMap,Rt=!!M.specularIntensityMap,N=Le&&!!M.transmissionMap,ve=Le&&!!M.thicknessMap,j=!!M.gradientMap,ie=!!M.alphaMap,Se=M.alphaTest>0,Me=!!M.alphaHash,je=!!M.extensions;let Ut=Fi;M.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(Ut=i.toneMapping);const nn={shaderID:K,shaderType:M.type,shaderName:M.name,vertexShader:me,fragmentShader:O,defines:M.defines,customVertexShaderID:J,customFragmentShaderID:we,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Be,batchingColor:Be&&P._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&P.instanceColor!==null,instancingMorph:Pe&&P.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:fe===null?i.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:ir,alphaToCoverage:!!M.alphaToCoverage,map:mt,matcap:Ye,envMap:yt,envMapMode:yt&&Z.mapping,envMapCubeUVHeight:V,aoMap:k,lightMap:on,bumpMap:st,normalMap:rt,displacementMap:h&&Ne,emissiveMap:It,normalMapObjectSpace:rt&&M.normalMapType===bp,normalMapTangentSpace:rt&&M.normalMapType===rh,metalnessMap:Ue,roughnessMap:L,anisotropy:R,anisotropyMap:_e,clearcoat:W,clearcoatMap:Ae,clearcoatNormalMap:lt,clearcoatRoughnessMap:de,dispersion:ne,iridescence:re,iridescenceMap:Re,iridescenceThicknessMap:ze,sheen:te,sheenColorMap:Ve,sheenRoughnessMap:Ce,specularMap:at,specularColorMap:Je,specularIntensityMap:Rt,transmission:Le,transmissionMap:N,thicknessMap:ve,gradientMap:j,opaque:M.transparent===!1&&M.blending===Vs&&M.alphaToCoverage===!1,alphaMap:ie,alphaTest:Se,alphaHash:Me,combine:M.combine,mapUv:mt&&v(M.map.channel),aoMapUv:k&&v(M.aoMap.channel),lightMapUv:on&&v(M.lightMap.channel),bumpMapUv:st&&v(M.bumpMap.channel),normalMapUv:rt&&v(M.normalMap.channel),displacementMapUv:Ne&&v(M.displacementMap.channel),emissiveMapUv:It&&v(M.emissiveMap.channel),metalnessMapUv:Ue&&v(M.metalnessMap.channel),roughnessMapUv:L&&v(M.roughnessMap.channel),anisotropyMapUv:_e&&v(M.anisotropyMap.channel),clearcoatMapUv:Ae&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:lt&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Re&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&v(M.sheenRoughnessMap.channel),specularMapUv:at&&v(M.specularMap.channel),specularColorMapUv:Je&&v(M.specularColorMap.channel),specularIntensityMapUv:Rt&&v(M.specularIntensityMap.channel),transmissionMapUv:N&&v(M.transmissionMap.channel),thicknessMapUv:ve&&v(M.thicknessMap.channel),alphaMapUv:ie&&v(M.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(rt||R),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!H.attributes.uv&&(mt||ie),fog:!!F,useFog:M.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:De,skinning:P.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:oe,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ut,decodeVideoTexture:mt&&M.map.isVideoTexture===!0&&pt.getTransfer(M.map.colorSpace)===At,decodeVideoTextureEmissive:It&&M.emissiveMap.isVideoTexture===!0&&pt.getTransfer(M.emissiveMap.colorSpace)===At,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===gt,flipSided:M.side===gn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:je&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(je&&M.extensions.multiDraw===!0||Be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return nn.vertexUv1s=c.has(1),nn.vertexUv2s=c.has(2),nn.vertexUv3s=c.has(3),c.clear(),nn}function p(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const A in M.defines)S.push(A),S.push(M.defines[A]);return M.isRawShaderMaterial===!1&&(y(S,M),w(S,M),S.push(i.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function y(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function w(M,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),M.push(o.mask)}function _(M){const S=g[M.type];let A;if(S){const I=Qn[S];A=pm.clone(I.uniforms)}else A=M.uniforms;return A}function b(M,S){let A;for(let I=0,P=d.length;I<P;I++){const F=d[I];if(F.cacheKey===S){A=F,++A.usedTimes;break}}return A===void 0&&(A=new By(i,S,M,r),d.push(A)),A}function T(M){if(--M.usedTimes===0){const S=d.indexOf(M);d[S]=d[d.length-1],d.pop(),M.destroy()}}function x(M){l.remove(M)}function E(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:b,releaseProgram:T,releaseShaderCache:x,programs:d,dispose:E}}function Wy(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function $y(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Hd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function zd(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,h,f,g,v,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:h,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),e++,p}function o(u,h,f,g,v,m){const p=a(u,h,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,h,f,g,v,m){const p=a(u,h,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,h){t.length>1&&t.sort(u||$y),n.length>1&&n.sort(h||Hd),s.length>1&&s.sort(h||Hd)}function d(){for(let u=e,h=i.length;u<h;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:d,sort:c}}function Xy(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new zd,i.set(n,[a])):s>=r.length?(a=new zd,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function qy(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new xe};break;case"SpotLight":t={position:new U,direction:new U,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":t={color:new xe,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function Yy(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Ky=0;function jy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Zy(i){const e=new qy,t=Yy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);const s=new U,r=new kt,a=new kt;function o(c){let d=0,u=0,h=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,y=0,w=0,_=0,b=0,T=0,x=0;c.sort(jy);for(let M=0,S=c.length;M<S;M++){const A=c[M],I=A.color,P=A.intensity,F=A.distance,H=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)d+=I.r*P,u+=I.g*P,h+=I.b*P;else if(A.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(A.sh.coefficients[$],P);x++}else if(A.isDirectionalLight){const $=e.get(A);if($.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const Z=A.shadow,V=t.get(A);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=A.shadow.matrix,y++}n.directional[f]=$,f++}else if(A.isSpotLight){const $=e.get(A);$.position.setFromMatrixPosition(A.matrixWorld),$.color.copy(I).multiplyScalar(P),$.distance=F,$.coneCos=Math.cos(A.angle),$.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),$.decay=A.decay,n.spot[v]=$;const Z=A.shadow;if(A.map&&(n.spotLightMap[b]=A.map,b++,Z.updateMatrices(A),A.castShadow&&T++),n.spotLightMatrix[v]=Z.matrix,A.castShadow){const V=t.get(A);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,n.spotShadow[v]=V,n.spotShadowMap[v]=H,_++}v++}else if(A.isRectAreaLight){const $=e.get(A);$.color.copy(I).multiplyScalar(P),$.halfWidth.set(A.width*.5,0,0),$.halfHeight.set(0,A.height*.5,0),n.rectArea[m]=$,m++}else if(A.isPointLight){const $=e.get(A);if($.color.copy(A.color).multiplyScalar(A.intensity),$.distance=A.distance,$.decay=A.decay,A.castShadow){const Z=A.shadow,V=t.get(A);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,V.shadowCameraNear=Z.camera.near,V.shadowCameraFar=Z.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=H,n.pointShadowMatrix[g]=A.shadow.matrix,w++}n.point[g]=$,g++}else if(A.isHemisphereLight){const $=e.get(A);$.skyColor.copy(A.color).multiplyScalar(P),$.groundColor.copy(A.groundColor).multiplyScalar(P),n.hemi[p]=$,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;const E=n.hash;(E.directionalLength!==f||E.pointLength!==g||E.spotLength!==v||E.rectAreaLength!==m||E.hemiLength!==p||E.numDirectionalShadows!==y||E.numPointShadows!==w||E.numSpotShadows!==_||E.numSpotMaps!==b||E.numLightProbes!==x)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=_+b-T,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=x,E.directionalLength=f,E.pointLength=g,E.spotLength=v,E.rectAreaLength=m,E.hemiLength=p,E.numDirectionalShadows=y,E.numPointShadows=w,E.numSpotShadows=_,E.numSpotMaps=b,E.numLightProbes=x,n.version=Ky++)}function l(c,d){let u=0,h=0,f=0,g=0,v=0;const m=d.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const w=c[p];if(w.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(w.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(w.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(m),a.identity(),r.copy(w.matrixWorld),r.premultiply(m),a.extractRotation(r),_.halfWidth.set(w.width*.5,0,0),_.halfHeight.set(0,w.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(w.isPointLight){const _=n.point[h];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(m),h++}else if(w.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(w.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Gd(i){const e=new Zy(i),t=[],n=[];function s(d){c.camera=d,t.length=0,n.length=0}function r(d){t.push(d)}function a(d){n.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Jy(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Gd(i),e.set(s,[o])):r>=a.length?(o=new Gd(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Qy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,e_=`uniform sampler2D shadow_pass;
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
}`;function t_(i,e,t){let n=new vc;const s=new qe,r=new qe,a=new Ft,o=new Sm({depthPacking:Sp}),l=new bm,c={},d=t.maxTextureSize,u={[Bi]:gn,[gn]:Bi,[gt]:gt},h=new Hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:Qy,fragmentShader:e_}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new An;g.setAttribute("position",new qn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new D(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$u;let p=this.type;this.render=function(T,x,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const M=i.getRenderTarget(),S=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),I=i.state;I.setBlending(Ni),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const P=p!==ui&&this.type===ui,F=p===ui&&this.type!==ui;for(let H=0,$=T.length;H<$;H++){const Z=T[H],V=Z.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const K=V.getFrameExtents();if(s.multiply(K),r.copy(V.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/K.x),s.x=r.x*K.x,V.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/K.y),s.y=r.y*K.y,V.mapSize.y=r.y)),V.map===null||P===!0||F===!0){const Y=this.type!==ui?{minFilter:Xn,magFilter:Xn}:{};V.map!==null&&V.map.dispose(),V.map=new ds(s.x,s.y,Y),V.map.texture.name=Z.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const G=V.getViewportCount();for(let Y=0;Y<G;Y++){const oe=V.getViewport(Y);a.set(r.x*oe.x,r.y*oe.y,r.x*oe.z,r.y*oe.w),I.viewport(a),V.updateMatrices(Z,Y),n=V.getFrustum(),_(x,E,V.camera,Z,this.type)}V.isPointLightShadow!==!0&&this.type===ui&&y(V,E),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,S,A)};function y(T,x){const E=e.update(v);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ds(s.x,s.y)),h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(x,null,E,h,v,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(x,null,E,f,v,null)}function w(T,x,E,M){let S=null;const A=E.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(A!==void 0)S=A;else if(S=E.isPointLight===!0?l:o,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0){const I=S.uuid,P=x.uuid;let F=c[I];F===void 0&&(F={},c[I]=F);let H=F[P];H===void 0&&(H=S.clone(),F[P]=H,x.addEventListener("dispose",b)),S=H}if(S.visible=x.visible,S.wireframe=x.wireframe,M===ui?S.side=x.shadowSide!==null?x.shadowSide:x.side:S.side=x.shadowSide!==null?x.shadowSide:u[x.side],S.alphaMap=x.alphaMap,S.alphaTest=x.alphaTest,S.map=x.map,S.clipShadows=x.clipShadows,S.clippingPlanes=x.clippingPlanes,S.clipIntersection=x.clipIntersection,S.displacementMap=x.displacementMap,S.displacementScale=x.displacementScale,S.displacementBias=x.displacementBias,S.wireframeLinewidth=x.wireframeLinewidth,S.linewidth=x.linewidth,E.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const I=i.properties.get(S);I.light=E}return S}function _(T,x,E,M,S){if(T.visible===!1)return;if(T.layers.test(x.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===ui)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,T.matrixWorld);const P=e.update(T),F=T.material;if(Array.isArray(F)){const H=P.groups;for(let $=0,Z=H.length;$<Z;$++){const V=H[$],K=F[V.materialIndex];if(K&&K.visible){const G=w(T,K,M,S);T.onBeforeShadow(i,T,x,E,P,G,V),i.renderBufferDirect(E,null,P,G,T,V),T.onAfterShadow(i,T,x,E,P,G,V)}}}else if(F.visible){const H=w(T,F,M,S);T.onBeforeShadow(i,T,x,E,P,H,null),i.renderBufferDirect(E,null,P,H,T,null),T.onAfterShadow(i,T,x,E,P,H,null)}}const I=T.children;for(let P=0,F=I.length;P<F;P++)_(I[P],x,E,M,S)}function b(T){T.target.removeEventListener("dispose",b);for(const E in c){const M=c[E],S=T.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}const n_={[ll]:cl,[dl]:fl,[ul]:pl,[Js]:hl,[cl]:ll,[fl]:dl,[pl]:ul,[hl]:Js};function i_(i,e){function t(){let N=!1;const ve=new Ft;let j=null;const ie=new Ft(0,0,0,0);return{setMask:function(Se){j!==Se&&!N&&(i.colorMask(Se,Se,Se,Se),j=Se)},setLocked:function(Se){N=Se},setClear:function(Se,Me,je,Ut,nn){nn===!0&&(Se*=Ut,Me*=Ut,je*=Ut),ve.set(Se,Me,je,Ut),ie.equals(ve)===!1&&(i.clearColor(Se,Me,je,Ut),ie.copy(ve))},reset:function(){N=!1,j=null,ie.set(-1,0,0,0)}}}function n(){let N=!1,ve=!1,j=null,ie=null,Se=null;return{setReversed:function(Me){if(ve!==Me){const je=e.get("EXT_clip_control");ve?je.clipControlEXT(je.LOWER_LEFT_EXT,je.ZERO_TO_ONE_EXT):je.clipControlEXT(je.LOWER_LEFT_EXT,je.NEGATIVE_ONE_TO_ONE_EXT);const Ut=Se;Se=null,this.setClear(Ut)}ve=Me},getReversed:function(){return ve},setTest:function(Me){Me?fe(i.DEPTH_TEST):De(i.DEPTH_TEST)},setMask:function(Me){j!==Me&&!N&&(i.depthMask(Me),j=Me)},setFunc:function(Me){if(ve&&(Me=n_[Me]),ie!==Me){switch(Me){case ll:i.depthFunc(i.NEVER);break;case cl:i.depthFunc(i.ALWAYS);break;case dl:i.depthFunc(i.LESS);break;case Js:i.depthFunc(i.LEQUAL);break;case ul:i.depthFunc(i.EQUAL);break;case hl:i.depthFunc(i.GEQUAL);break;case fl:i.depthFunc(i.GREATER);break;case pl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ie=Me}},setLocked:function(Me){N=Me},setClear:function(Me){Se!==Me&&(ve&&(Me=1-Me),i.clearDepth(Me),Se=Me)},reset:function(){N=!1,j=null,ie=null,Se=null,ve=!1}}}function s(){let N=!1,ve=null,j=null,ie=null,Se=null,Me=null,je=null,Ut=null,nn=null;return{setTest:function(bt){N||(bt?fe(i.STENCIL_TEST):De(i.STENCIL_TEST))},setMask:function(bt){ve!==bt&&!N&&(i.stencilMask(bt),ve=bt)},setFunc:function(bt,Fn,ii){(j!==bt||ie!==Fn||Se!==ii)&&(i.stencilFunc(bt,Fn,ii),j=bt,ie=Fn,Se=ii)},setOp:function(bt,Fn,ii){(Me!==bt||je!==Fn||Ut!==ii)&&(i.stencilOp(bt,Fn,ii),Me=bt,je=Fn,Ut=ii)},setLocked:function(bt){N=bt},setClear:function(bt){nn!==bt&&(i.clearStencil(bt),nn=bt)},reset:function(){N=!1,ve=null,j=null,ie=null,Se=null,Me=null,je=null,Ut=null,nn=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let d={},u={},h=new WeakMap,f=[],g=null,v=!1,m=null,p=null,y=null,w=null,_=null,b=null,T=null,x=new xe(0,0,0),E=0,M=!1,S=null,A=null,I=null,P=null,F=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,Z=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(V)[1]),$=Z>=1):V.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),$=Z>=2);let K=null,G={};const Y=i.getParameter(i.SCISSOR_BOX),oe=i.getParameter(i.VIEWPORT),me=new Ft().fromArray(Y),O=new Ft().fromArray(oe);function J(N,ve,j,ie){const Se=new Uint8Array(4),Me=i.createTexture();i.bindTexture(N,Me),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let je=0;je<j;je++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ve,0,i.RGBA,1,1,ie,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(ve+je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return Me}const we={};we[i.TEXTURE_2D]=J(i.TEXTURE_2D,i.TEXTURE_2D,1),we[i.TEXTURE_CUBE_MAP]=J(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),we[i.TEXTURE_2D_ARRAY]=J(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),we[i.TEXTURE_3D]=J(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),fe(i.DEPTH_TEST),a.setFunc(Js),st(!1),rt(Gc),fe(i.CULL_FACE),k(Ni);function fe(N){d[N]!==!0&&(i.enable(N),d[N]=!0)}function De(N){d[N]!==!1&&(i.disable(N),d[N]=!1)}function Pe(N,ve){return u[N]!==ve?(i.bindFramebuffer(N,ve),u[N]=ve,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ve),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ve),!0):!1}function Be(N,ve){let j=f,ie=!1;if(N){j=h.get(ve),j===void 0&&(j=[],h.set(ve,j));const Se=N.textures;if(j.length!==Se.length||j[0]!==i.COLOR_ATTACHMENT0){for(let Me=0,je=Se.length;Me<je;Me++)j[Me]=i.COLOR_ATTACHMENT0+Me;j.length=Se.length,ie=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,ie=!0);ie&&i.drawBuffers(j)}function mt(N){return g!==N?(i.useProgram(N),g=N,!0):!1}const Ye={[ts]:i.FUNC_ADD,[Kf]:i.FUNC_SUBTRACT,[jf]:i.FUNC_REVERSE_SUBTRACT};Ye[Zf]=i.MIN,Ye[Jf]=i.MAX;const yt={[Qf]:i.ZERO,[ep]:i.ONE,[tp]:i.SRC_COLOR,[al]:i.SRC_ALPHA,[op]:i.SRC_ALPHA_SATURATE,[rp]:i.DST_COLOR,[ip]:i.DST_ALPHA,[np]:i.ONE_MINUS_SRC_COLOR,[ol]:i.ONE_MINUS_SRC_ALPHA,[ap]:i.ONE_MINUS_DST_COLOR,[sp]:i.ONE_MINUS_DST_ALPHA,[lp]:i.CONSTANT_COLOR,[cp]:i.ONE_MINUS_CONSTANT_COLOR,[dp]:i.CONSTANT_ALPHA,[up]:i.ONE_MINUS_CONSTANT_ALPHA};function k(N,ve,j,ie,Se,Me,je,Ut,nn,bt){if(N===Ni){v===!0&&(De(i.BLEND),v=!1);return}if(v===!1&&(fe(i.BLEND),v=!0),N!==Yf){if(N!==m||bt!==M){if((p!==ts||_!==ts)&&(i.blendEquation(i.FUNC_ADD),p=ts,_=ts),bt)switch(N){case Vs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qa:i.blendFunc(i.ONE,i.ONE);break;case Vc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Vs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qa:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Vc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}y=null,w=null,b=null,T=null,x.set(0,0,0),E=0,m=N,M=bt}return}Se=Se||ve,Me=Me||j,je=je||ie,(ve!==p||Se!==_)&&(i.blendEquationSeparate(Ye[ve],Ye[Se]),p=ve,_=Se),(j!==y||ie!==w||Me!==b||je!==T)&&(i.blendFuncSeparate(yt[j],yt[ie],yt[Me],yt[je]),y=j,w=ie,b=Me,T=je),(Ut.equals(x)===!1||nn!==E)&&(i.blendColor(Ut.r,Ut.g,Ut.b,nn),x.copy(Ut),E=nn),m=N,M=!1}function on(N,ve){N.side===gt?De(i.CULL_FACE):fe(i.CULL_FACE);let j=N.side===gn;ve&&(j=!j),st(j),N.blending===Vs&&N.transparent===!1?k(Ni):k(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);const ie=N.stencilWrite;o.setTest(ie),ie&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),It(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?fe(i.SAMPLE_ALPHA_TO_COVERAGE):De(i.SAMPLE_ALPHA_TO_COVERAGE)}function st(N){S!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),S=N)}function rt(N){N!==Xf?(fe(i.CULL_FACE),N!==A&&(N===Gc?i.cullFace(i.BACK):N===qf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):De(i.CULL_FACE),A=N}function Ne(N){N!==I&&($&&i.lineWidth(N),I=N)}function It(N,ve,j){N?(fe(i.POLYGON_OFFSET_FILL),(P!==ve||F!==j)&&(i.polygonOffset(ve,j),P=ve,F=j)):De(i.POLYGON_OFFSET_FILL)}function Ue(N){N?fe(i.SCISSOR_TEST):De(i.SCISSOR_TEST)}function L(N){N===void 0&&(N=i.TEXTURE0+H-1),K!==N&&(i.activeTexture(N),K=N)}function R(N,ve,j){j===void 0&&(K===null?j=i.TEXTURE0+H-1:j=K);let ie=G[j];ie===void 0&&(ie={type:void 0,texture:void 0},G[j]=ie),(ie.type!==N||ie.texture!==ve)&&(K!==j&&(i.activeTexture(j),K=j),i.bindTexture(N,ve||we[N]),ie.type=N,ie.texture=ve)}function W(){const N=G[K];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function ne(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function re(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Le(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _e(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ae(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function lt(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function de(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Re(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ze(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ve(N){me.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),me.copy(N))}function Ce(N){O.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),O.copy(N))}function at(N,ve){let j=c.get(ve);j===void 0&&(j=new WeakMap,c.set(ve,j));let ie=j.get(N);ie===void 0&&(ie=i.getUniformBlockIndex(ve,N.name),j.set(N,ie))}function Je(N,ve){const ie=c.get(ve).get(N);l.get(ve)!==ie&&(i.uniformBlockBinding(ve,ie,N.__bindingPointIndex),l.set(ve,ie))}function Rt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},K=null,G={},u={},h=new WeakMap,f=[],g=null,v=!1,m=null,p=null,y=null,w=null,_=null,b=null,T=null,x=new xe(0,0,0),E=0,M=!1,S=null,A=null,I=null,P=null,F=null,me.set(0,0,i.canvas.width,i.canvas.height),O.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:fe,disable:De,bindFramebuffer:Pe,drawBuffers:Be,useProgram:mt,setBlending:k,setMaterial:on,setFlipSided:st,setCullFace:rt,setLineWidth:Ne,setPolygonOffset:It,setScissorTest:Ue,activeTexture:L,bindTexture:R,unbindTexture:W,compressedTexImage2D:ne,compressedTexImage3D:re,texImage2D:Re,texImage3D:ze,updateUBOMapping:at,uniformBlockBinding:Je,texStorage2D:lt,texStorage3D:de,texSubImage2D:te,texSubImage3D:Le,compressedTexSubImage2D:_e,compressedTexSubImage3D:Ae,scissor:Ve,viewport:Ce,reset:Rt}}function s_(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new qe,d=new WeakMap;let u;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,R){return f?new OffscreenCanvas(L,R):Yr("canvas")}function v(L,R,W){let ne=1;const re=Ue(L);if((re.width>W||re.height>W)&&(ne=W/Math.max(re.width,re.height)),ne<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const te=Math.floor(ne*re.width),Le=Math.floor(ne*re.height);u===void 0&&(u=g(te,Le));const _e=R?g(te,Le):u;return _e.width=te,_e.height=Le,_e.getContext("2d").drawImage(L,0,0,te,Le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+te+"x"+Le+")."),_e}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){i.generateMipmap(L)}function y(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(L,R,W,ne,re=!1){if(L!==null){if(i[L]!==void 0)return i[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let te=R;if(R===i.RED&&(W===i.FLOAT&&(te=i.R32F),W===i.HALF_FLOAT&&(te=i.R16F),W===i.UNSIGNED_BYTE&&(te=i.R8)),R===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(te=i.R8UI),W===i.UNSIGNED_SHORT&&(te=i.R16UI),W===i.UNSIGNED_INT&&(te=i.R32UI),W===i.BYTE&&(te=i.R8I),W===i.SHORT&&(te=i.R16I),W===i.INT&&(te=i.R32I)),R===i.RG&&(W===i.FLOAT&&(te=i.RG32F),W===i.HALF_FLOAT&&(te=i.RG16F),W===i.UNSIGNED_BYTE&&(te=i.RG8)),R===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(te=i.RG8UI),W===i.UNSIGNED_SHORT&&(te=i.RG16UI),W===i.UNSIGNED_INT&&(te=i.RG32UI),W===i.BYTE&&(te=i.RG8I),W===i.SHORT&&(te=i.RG16I),W===i.INT&&(te=i.RG32I)),R===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(te=i.RGB8UI),W===i.UNSIGNED_SHORT&&(te=i.RGB16UI),W===i.UNSIGNED_INT&&(te=i.RGB32UI),W===i.BYTE&&(te=i.RGB8I),W===i.SHORT&&(te=i.RGB16I),W===i.INT&&(te=i.RGB32I)),R===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(te=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(te=i.RGBA16UI),W===i.UNSIGNED_INT&&(te=i.RGBA32UI),W===i.BYTE&&(te=i.RGBA8I),W===i.SHORT&&(te=i.RGBA16I),W===i.INT&&(te=i.RGBA32I)),R===i.RGB&&W===i.UNSIGNED_INT_5_9_9_9_REV&&(te=i.RGB9_E5),R===i.RGBA){const Le=re?Ya:pt.getTransfer(ne);W===i.FLOAT&&(te=i.RGBA32F),W===i.HALF_FLOAT&&(te=i.RGBA16F),W===i.UNSIGNED_BYTE&&(te=Le===At?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function _(L,R){let W;return L?R===null||R===cs||R===tr?W=i.DEPTH24_STENCIL8:R===vi?W=i.DEPTH32F_STENCIL8:R===Xr&&(W=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===cs||R===tr?W=i.DEPTH_COMPONENT24:R===vi?W=i.DEPTH_COMPONENT32F:R===Xr&&(W=i.DEPTH_COMPONENT16),W}function b(L,R){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Xn&&L.minFilter!==On?Math.log2(Math.max(R.width,R.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?R.mipmaps.length:1}function T(L){const R=L.target;R.removeEventListener("dispose",T),E(R),R.isVideoTexture&&d.delete(R)}function x(L){const R=L.target;R.removeEventListener("dispose",x),S(R)}function E(L){const R=n.get(L);if(R.__webglInit===void 0)return;const W=L.source,ne=h.get(W);if(ne){const re=ne[R.__cacheKey];re.usedTimes--,re.usedTimes===0&&M(L),Object.keys(ne).length===0&&h.delete(W)}n.remove(L)}function M(L){const R=n.get(L);i.deleteTexture(R.__webglTexture);const W=L.source,ne=h.get(W);delete ne[R.__cacheKey],a.memory.textures--}function S(L){const R=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(R.__webglFramebuffer[ne]))for(let re=0;re<R.__webglFramebuffer[ne].length;re++)i.deleteFramebuffer(R.__webglFramebuffer[ne][re]);else i.deleteFramebuffer(R.__webglFramebuffer[ne]);R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer[ne])}else{if(Array.isArray(R.__webglFramebuffer))for(let ne=0;ne<R.__webglFramebuffer.length;ne++)i.deleteFramebuffer(R.__webglFramebuffer[ne]);else i.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&i.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let ne=0;ne<R.__webglColorRenderbuffer.length;ne++)R.__webglColorRenderbuffer[ne]&&i.deleteRenderbuffer(R.__webglColorRenderbuffer[ne]);R.__webglDepthRenderbuffer&&i.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const W=L.textures;for(let ne=0,re=W.length;ne<re;ne++){const te=n.get(W[ne]);te.__webglTexture&&(i.deleteTexture(te.__webglTexture),a.memory.textures--),n.remove(W[ne])}n.remove(L)}let A=0;function I(){A=0}function P(){const L=A;return L>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),A+=1,L}function F(L){const R=[];return R.push(L.wrapS),R.push(L.wrapT),R.push(L.wrapR||0),R.push(L.magFilter),R.push(L.minFilter),R.push(L.anisotropy),R.push(L.internalFormat),R.push(L.format),R.push(L.type),R.push(L.generateMipmaps),R.push(L.premultiplyAlpha),R.push(L.flipY),R.push(L.unpackAlignment),R.push(L.colorSpace),R.join()}function H(L,R){const W=n.get(L);if(L.isVideoTexture&&Ne(L),L.isRenderTargetTexture===!1&&L.version>0&&W.__version!==L.version){const ne=L.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{O(W,L,R);return}}t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+R)}function $(L,R){const W=n.get(L);if(L.version>0&&W.__version!==L.version){O(W,L,R);return}t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+R)}function Z(L,R){const W=n.get(L);if(L.version>0&&W.__version!==L.version){O(W,L,R);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+R)}function V(L,R){const W=n.get(L);if(L.version>0&&W.__version!==L.version){J(W,L,R);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+R)}const K={[$r]:i.REPEAT,[ss]:i.CLAMP_TO_EDGE,[vl]:i.MIRRORED_REPEAT},G={[Xn]:i.NEAREST,[wp]:i.NEAREST_MIPMAP_NEAREST,[ra]:i.NEAREST_MIPMAP_LINEAR,[On]:i.LINEAR,[yo]:i.LINEAR_MIPMAP_NEAREST,[gi]:i.LINEAR_MIPMAP_LINEAR},Y={[xp]:i.NEVER,[Ip]:i.ALWAYS,[Tp]:i.LESS,[ah]:i.LEQUAL,[Ep]:i.EQUAL,[Cp]:i.GEQUAL,[Ap]:i.GREATER,[Rp]:i.NOTEQUAL};function oe(L,R){if(R.type===vi&&e.has("OES_texture_float_linear")===!1&&(R.magFilter===On||R.magFilter===yo||R.magFilter===ra||R.magFilter===gi||R.minFilter===On||R.minFilter===yo||R.minFilter===ra||R.minFilter===gi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,K[R.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,K[R.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,K[R.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,G[R.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,G[R.minFilter]),R.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,Y[R.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===Xn||R.minFilter!==ra&&R.minFilter!==gi||R.type===vi&&e.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||n.get(R).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,s.getMaxAnisotropy())),n.get(R).__currentAnisotropy=R.anisotropy}}}function me(L,R){let W=!1;L.__webglInit===void 0&&(L.__webglInit=!0,R.addEventListener("dispose",T));const ne=R.source;let re=h.get(ne);re===void 0&&(re={},h.set(ne,re));const te=F(R);if(te!==L.__cacheKey){re[te]===void 0&&(re[te]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,W=!0),re[te].usedTimes++;const Le=re[L.__cacheKey];Le!==void 0&&(re[L.__cacheKey].usedTimes--,Le.usedTimes===0&&M(R)),L.__cacheKey=te,L.__webglTexture=re[te].texture}return W}function O(L,R,W){let ne=i.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(ne=i.TEXTURE_2D_ARRAY),R.isData3DTexture&&(ne=i.TEXTURE_3D);const re=me(L,R),te=R.source;t.bindTexture(ne,L.__webglTexture,i.TEXTURE0+W);const Le=n.get(te);if(te.version!==Le.__version||re===!0){t.activeTexture(i.TEXTURE0+W);const _e=pt.getPrimaries(pt.workingColorSpace),Ae=R.colorSpace===mi?null:pt.getPrimaries(R.colorSpace),lt=R.colorSpace===mi||_e===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,lt);let de=v(R.image,!1,s.maxTextureSize);de=It(R,de);const Re=r.convert(R.format,R.colorSpace),ze=r.convert(R.type);let Ve=w(R.internalFormat,Re,ze,R.colorSpace,R.isVideoTexture);oe(ne,R);let Ce;const at=R.mipmaps,Je=R.isVideoTexture!==!0,Rt=Le.__version===void 0||re===!0,N=te.dataReady,ve=b(R,de);if(R.isDepthTexture)Ve=_(R.format===nr,R.type),Rt&&(Je?t.texStorage2D(i.TEXTURE_2D,1,Ve,de.width,de.height):t.texImage2D(i.TEXTURE_2D,0,Ve,de.width,de.height,0,Re,ze,null));else if(R.isDataTexture)if(at.length>0){Je&&Rt&&t.texStorage2D(i.TEXTURE_2D,ve,Ve,at[0].width,at[0].height);for(let j=0,ie=at.length;j<ie;j++)Ce=at[j],Je?N&&t.texSubImage2D(i.TEXTURE_2D,j,0,0,Ce.width,Ce.height,Re,ze,Ce.data):t.texImage2D(i.TEXTURE_2D,j,Ve,Ce.width,Ce.height,0,Re,ze,Ce.data);R.generateMipmaps=!1}else Je?(Rt&&t.texStorage2D(i.TEXTURE_2D,ve,Ve,de.width,de.height),N&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de.width,de.height,Re,ze,de.data)):t.texImage2D(i.TEXTURE_2D,0,Ve,de.width,de.height,0,Re,ze,de.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){Je&&Rt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ve,Ve,at[0].width,at[0].height,de.depth);for(let j=0,ie=at.length;j<ie;j++)if(Ce=at[j],R.format!==$n)if(Re!==null)if(Je){if(N)if(R.layerUpdates.size>0){const Se=yd(Ce.width,Ce.height,R.format,R.type);for(const Me of R.layerUpdates){const je=Ce.data.subarray(Me*Se/Ce.data.BYTES_PER_ELEMENT,(Me+1)*Se/Ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,Me,Ce.width,Ce.height,1,Re,je)}R.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,Ce.width,Ce.height,de.depth,Re,Ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,Ve,Ce.width,Ce.height,de.depth,0,Ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Je?N&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,Ce.width,Ce.height,de.depth,Re,ze,Ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,j,Ve,Ce.width,Ce.height,de.depth,0,Re,ze,Ce.data)}else{Je&&Rt&&t.texStorage2D(i.TEXTURE_2D,ve,Ve,at[0].width,at[0].height);for(let j=0,ie=at.length;j<ie;j++)Ce=at[j],R.format!==$n?Re!==null?Je?N&&t.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,Ce.width,Ce.height,Re,Ce.data):t.compressedTexImage2D(i.TEXTURE_2D,j,Ve,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?N&&t.texSubImage2D(i.TEXTURE_2D,j,0,0,Ce.width,Ce.height,Re,ze,Ce.data):t.texImage2D(i.TEXTURE_2D,j,Ve,Ce.width,Ce.height,0,Re,ze,Ce.data)}else if(R.isDataArrayTexture)if(Je){if(Rt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ve,Ve,de.width,de.height,de.depth),N)if(R.layerUpdates.size>0){const j=yd(de.width,de.height,R.format,R.type);for(const ie of R.layerUpdates){const Se=de.data.subarray(ie*j/de.data.BYTES_PER_ELEMENT,(ie+1)*j/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ie,de.width,de.height,1,Re,ze,Se)}R.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,Re,ze,de.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ve,de.width,de.height,de.depth,0,Re,ze,de.data);else if(R.isData3DTexture)Je?(Rt&&t.texStorage3D(i.TEXTURE_3D,ve,Ve,de.width,de.height,de.depth),N&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,Re,ze,de.data)):t.texImage3D(i.TEXTURE_3D,0,Ve,de.width,de.height,de.depth,0,Re,ze,de.data);else if(R.isFramebufferTexture){if(Rt)if(Je)t.texStorage2D(i.TEXTURE_2D,ve,Ve,de.width,de.height);else{let j=de.width,ie=de.height;for(let Se=0;Se<ve;Se++)t.texImage2D(i.TEXTURE_2D,Se,Ve,j,ie,0,Re,ze,null),j>>=1,ie>>=1}}else if(at.length>0){if(Je&&Rt){const j=Ue(at[0]);t.texStorage2D(i.TEXTURE_2D,ve,Ve,j.width,j.height)}for(let j=0,ie=at.length;j<ie;j++)Ce=at[j],Je?N&&t.texSubImage2D(i.TEXTURE_2D,j,0,0,Re,ze,Ce):t.texImage2D(i.TEXTURE_2D,j,Ve,Re,ze,Ce);R.generateMipmaps=!1}else if(Je){if(Rt){const j=Ue(de);t.texStorage2D(i.TEXTURE_2D,ve,Ve,j.width,j.height)}N&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Re,ze,de)}else t.texImage2D(i.TEXTURE_2D,0,Ve,Re,ze,de);m(R)&&p(ne),Le.__version=te.version,R.onUpdate&&R.onUpdate(R)}L.__version=R.version}function J(L,R,W){if(R.image.length!==6)return;const ne=me(L,R),re=R.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+W);const te=n.get(re);if(re.version!==te.__version||ne===!0){t.activeTexture(i.TEXTURE0+W);const Le=pt.getPrimaries(pt.workingColorSpace),_e=R.colorSpace===mi?null:pt.getPrimaries(R.colorSpace),Ae=R.colorSpace===mi||Le===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const lt=R.isCompressedTexture||R.image[0].isCompressedTexture,de=R.image[0]&&R.image[0].isDataTexture,Re=[];for(let ie=0;ie<6;ie++)!lt&&!de?Re[ie]=v(R.image[ie],!0,s.maxCubemapSize):Re[ie]=de?R.image[ie].image:R.image[ie],Re[ie]=It(R,Re[ie]);const ze=Re[0],Ve=r.convert(R.format,R.colorSpace),Ce=r.convert(R.type),at=w(R.internalFormat,Ve,Ce,R.colorSpace),Je=R.isVideoTexture!==!0,Rt=te.__version===void 0||ne===!0,N=re.dataReady;let ve=b(R,ze);oe(i.TEXTURE_CUBE_MAP,R);let j;if(lt){Je&&Rt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,at,ze.width,ze.height);for(let ie=0;ie<6;ie++){j=Re[ie].mipmaps;for(let Se=0;Se<j.length;Se++){const Me=j[Se];R.format!==$n?Ve!==null?Je?N&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se,0,0,Me.width,Me.height,Ve,Me.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se,at,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Je?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se,0,0,Me.width,Me.height,Ve,Ce,Me.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se,at,Me.width,Me.height,0,Ve,Ce,Me.data)}}}else{if(j=R.mipmaps,Je&&Rt){j.length>0&&ve++;const ie=Ue(Re[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,at,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(de){Je?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Re[ie].width,Re[ie].height,Ve,Ce,Re[ie].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,at,Re[ie].width,Re[ie].height,0,Ve,Ce,Re[ie].data);for(let Se=0;Se<j.length;Se++){const je=j[Se].image[ie].image;Je?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se+1,0,0,je.width,je.height,Ve,Ce,je.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se+1,at,je.width,je.height,0,Ve,Ce,je.data)}}else{Je?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ve,Ce,Re[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,at,Ve,Ce,Re[ie]);for(let Se=0;Se<j.length;Se++){const Me=j[Se];Je?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se+1,0,0,Ve,Ce,Me.image[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se+1,at,Ve,Ce,Me.image[ie])}}}m(R)&&p(i.TEXTURE_CUBE_MAP),te.__version=re.version,R.onUpdate&&R.onUpdate(R)}L.__version=R.version}function we(L,R,W,ne,re,te){const Le=r.convert(W.format,W.colorSpace),_e=r.convert(W.type),Ae=w(W.internalFormat,Le,_e,W.colorSpace),lt=n.get(R),de=n.get(W);if(de.__renderTarget=R,!lt.__hasExternalTextures){const Re=Math.max(1,R.width>>te),ze=Math.max(1,R.height>>te);re===i.TEXTURE_3D||re===i.TEXTURE_2D_ARRAY?t.texImage3D(re,te,Ae,Re,ze,R.depth,0,Le,_e,null):t.texImage2D(re,te,Ae,Re,ze,0,Le,_e,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),rt(R)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,re,de.__webglTexture,0,st(R)):(re===i.TEXTURE_2D||re>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ne,re,de.__webglTexture,te),t.bindFramebuffer(i.FRAMEBUFFER,null)}function fe(L,R,W){if(i.bindRenderbuffer(i.RENDERBUFFER,L),R.depthBuffer){const ne=R.depthTexture,re=ne&&ne.isDepthTexture?ne.type:null,te=_(R.stencilBuffer,re),Le=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=st(R);rt(R)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e,te,R.width,R.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,te,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,te,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Le,i.RENDERBUFFER,L)}else{const ne=R.textures;for(let re=0;re<ne.length;re++){const te=ne[re],Le=r.convert(te.format,te.colorSpace),_e=r.convert(te.type),Ae=w(te.internalFormat,Le,_e,te.colorSpace),lt=st(R);W&&rt(R)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,Ae,R.width,R.height):rt(R)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,Ae,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,Ae,R.width,R.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function De(L,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=n.get(R.depthTexture);ne.__renderTarget=R,(!ne.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),H(R.depthTexture,0);const re=ne.__webglTexture,te=st(R);if(R.depthTexture.format===Ws)rt(R)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,re,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,re,0);else if(R.depthTexture.format===nr)rt(R)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,re,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Pe(L){const R=n.get(L),W=L.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==L.depthTexture){const ne=L.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),ne){const re=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,ne.removeEventListener("dispose",re)};ne.addEventListener("dispose",re),R.__depthDisposeCallback=re}R.__boundDepthTexture=ne}if(L.depthTexture&&!R.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");De(R.__webglFramebuffer,L)}else if(W){R.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer[ne]),R.__webglDepthbuffer[ne]===void 0)R.__webglDepthbuffer[ne]=i.createRenderbuffer(),fe(R.__webglDepthbuffer[ne],L,!1);else{const re=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=R.__webglDepthbuffer[ne];i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,te)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=i.createRenderbuffer(),fe(R.__webglDepthbuffer,L,!1);else{const ne=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=R.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,re)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Be(L,R,W){const ne=n.get(L);R!==void 0&&we(ne.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&Pe(L)}function mt(L){const R=L.texture,W=n.get(L),ne=n.get(R);L.addEventListener("dispose",x);const re=L.textures,te=L.isWebGLCubeRenderTarget===!0,Le=re.length>1;if(Le||(ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture()),ne.__version=R.version,a.memory.textures++),te){W.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(R.mipmaps&&R.mipmaps.length>0){W.__webglFramebuffer[_e]=[];for(let Ae=0;Ae<R.mipmaps.length;Ae++)W.__webglFramebuffer[_e][Ae]=i.createFramebuffer()}else W.__webglFramebuffer[_e]=i.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){W.__webglFramebuffer=[];for(let _e=0;_e<R.mipmaps.length;_e++)W.__webglFramebuffer[_e]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(Le)for(let _e=0,Ae=re.length;_e<Ae;_e++){const lt=n.get(re[_e]);lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture(),a.memory.textures++)}if(L.samples>0&&rt(L)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let _e=0;_e<re.length;_e++){const Ae=re[_e];W.__webglColorRenderbuffer[_e]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[_e]);const lt=r.convert(Ae.format,Ae.colorSpace),de=r.convert(Ae.type),Re=w(Ae.internalFormat,lt,de,Ae.colorSpace,L.isXRRenderTarget===!0),ze=st(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,ze,Re,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,W.__webglColorRenderbuffer[_e])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),fe(W.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(te){t.bindTexture(i.TEXTURE_CUBE_MAP,ne.__webglTexture),oe(i.TEXTURE_CUBE_MAP,R);for(let _e=0;_e<6;_e++)if(R.mipmaps&&R.mipmaps.length>0)for(let Ae=0;Ae<R.mipmaps.length;Ae++)we(W.__webglFramebuffer[_e][Ae],L,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ae);else we(W.__webglFramebuffer[_e],L,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);m(R)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Le){for(let _e=0,Ae=re.length;_e<Ae;_e++){const lt=re[_e],de=n.get(lt);t.bindTexture(i.TEXTURE_2D,de.__webglTexture),oe(i.TEXTURE_2D,lt),we(W.__webglFramebuffer,L,lt,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,0),m(lt)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let _e=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(_e=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(_e,ne.__webglTexture),oe(_e,R),R.mipmaps&&R.mipmaps.length>0)for(let Ae=0;Ae<R.mipmaps.length;Ae++)we(W.__webglFramebuffer[Ae],L,R,i.COLOR_ATTACHMENT0,_e,Ae);else we(W.__webglFramebuffer,L,R,i.COLOR_ATTACHMENT0,_e,0);m(R)&&p(_e),t.unbindTexture()}L.depthBuffer&&Pe(L)}function Ye(L){const R=L.textures;for(let W=0,ne=R.length;W<ne;W++){const re=R[W];if(m(re)){const te=y(L),Le=n.get(re).__webglTexture;t.bindTexture(te,Le),p(te),t.unbindTexture()}}}const yt=[],k=[];function on(L){if(L.samples>0){if(rt(L)===!1){const R=L.textures,W=L.width,ne=L.height;let re=i.COLOR_BUFFER_BIT;const te=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Le=n.get(L),_e=R.length>1;if(_e)for(let Ae=0;Ae<R.length;Ae++)t.bindFramebuffer(i.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Le.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let Ae=0;Ae<R.length;Ae++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(re|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(re|=i.STENCIL_BUFFER_BIT)),_e){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Le.__webglColorRenderbuffer[Ae]);const lt=n.get(R[Ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,lt,0)}i.blitFramebuffer(0,0,W,ne,0,0,W,ne,re,i.NEAREST),l===!0&&(yt.length=0,k.length=0,yt.push(i.COLOR_ATTACHMENT0+Ae),L.depthBuffer&&L.resolveDepthBuffer===!1&&(yt.push(te),k.push(te),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,k)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,yt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),_e)for(let Ae=0;Ae<R.length;Ae++){t.bindFramebuffer(i.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,Le.__webglColorRenderbuffer[Ae]);const lt=n.get(R[Ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,lt,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Le.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const R=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[R])}}}function st(L){return Math.min(s.maxSamples,L.samples)}function rt(L){const R=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function Ne(L){const R=a.render.frame;d.get(L)!==R&&(d.set(L,R),L.update())}function It(L,R){const W=L.colorSpace,ne=L.format,re=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||W!==ir&&W!==mi&&(pt.getTransfer(W)===At?(ne!==$n||re!==Si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),R}function Ue(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=P,this.resetTextureUnits=I,this.setTexture2D=H,this.setTexture2DArray=$,this.setTexture3D=Z,this.setTextureCube=V,this.rebindTextures=Be,this.setupRenderTarget=mt,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=on,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=we,this.useMultisampledRTT=rt}function r_(i,e){function t(n,s=mi){let r;const a=pt.getTransfer(s);if(n===Si)return i.UNSIGNED_BYTE;if(n===cc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===dc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Zu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ku)return i.BYTE;if(n===ju)return i.SHORT;if(n===Xr)return i.UNSIGNED_SHORT;if(n===lc)return i.INT;if(n===cs)return i.UNSIGNED_INT;if(n===vi)return i.FLOAT;if(n===jr)return i.HALF_FLOAT;if(n===Ju)return i.ALPHA;if(n===Qu)return i.RGB;if(n===$n)return i.RGBA;if(n===eh)return i.LUMINANCE;if(n===th)return i.LUMINANCE_ALPHA;if(n===Ws)return i.DEPTH_COMPONENT;if(n===nr)return i.DEPTH_STENCIL;if(n===nh)return i.RED;if(n===uc)return i.RED_INTEGER;if(n===ih)return i.RG;if(n===hc)return i.RG_INTEGER;if(n===fc)return i.RGBA_INTEGER;if(n===Na||n===Fa||n===Ba||n===Ha)if(a===At)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Na)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Na)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Fa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ba)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ha)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===yl||n===_l||n===wl||n===Ml)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===yl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===_l)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ml)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Sl||n===bl||n===xl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Sl||n===bl)return a===At?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===xl)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Tl||n===El||n===Al||n===Rl||n===Cl||n===Il||n===Pl||n===Ll||n===Dl||n===kl||n===Ul||n===Ol||n===Nl||n===Fl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Tl)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===El)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Al)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Rl)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Cl)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Il)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Pl)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ll)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Dl)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===kl)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ul)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ol)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Nl)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fl)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===za||n===Bl||n===Hl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===za)return a===At?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Hl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===sh||n===zl||n===Gl||n===Vl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===za)return r.COMPRESSED_RED_RGTC1_EXT;if(n===zl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Gl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===tr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const a_={type:"move"};class qo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $e,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $e,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $e,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(a_)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new $e;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const o_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,l_=`
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

}`;class c_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new an,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Hi({vertexShader:o_,fragmentShader:l_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new D(new Jr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class d_ extends cr{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,f=null,g=null;const v=new c_,m=t.getContextAttributes();let p=null,y=null;const w=[],_=[],b=new qe;let T=null;const x=new Vn;x.viewport=new Ft;const E=new Vn;E.viewport=new Ft;const M=[x,E],S=new Im;let A=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let J=w[O];return J===void 0&&(J=new qo,w[O]=J),J.getTargetRaySpace()},this.getControllerGrip=function(O){let J=w[O];return J===void 0&&(J=new qo,w[O]=J),J.getGripSpace()},this.getHand=function(O){let J=w[O];return J===void 0&&(J=new qo,w[O]=J),J.getHandSpace()};function P(O){const J=_.indexOf(O.inputSource);if(J===-1)return;const we=w[J];we!==void 0&&(we.update(O.inputSource,O.frame,c||a),we.dispatchEvent({type:O.type,data:O.inputSource}))}function F(){s.removeEventListener("select",P),s.removeEventListener("selectstart",P),s.removeEventListener("selectend",P),s.removeEventListener("squeeze",P),s.removeEventListener("squeezestart",P),s.removeEventListener("squeezeend",P),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",H);for(let O=0;O<w.length;O++){const J=_[O];J!==null&&(_[O]=null,w[O].disconnect(J))}A=null,I=null,v.reset(),e.setRenderTarget(p),f=null,h=null,u=null,s=null,y=null,me.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){r=O,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){o=O,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(O){c=O},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(O){if(s=O,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",P),s.addEventListener("selectstart",P),s.addEventListener("selectend",P),s.addEventListener("squeeze",P),s.addEventListener("squeezestart",P),s.addEventListener("squeezeend",P),s.addEventListener("end",F),s.addEventListener("inputsourceschange",H),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(b),s.enabledFeatures!==void 0&&s.enabledFeatures.includes("layers")){let we=null,fe=null,De=null;m.depth&&(De=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,we=m.stencil?nr:Ws,fe=m.stencil?tr:cs);const Pe={colorFormat:t.RGBA8,depthFormat:De,scaleFactor:r};u=new XRWebGLBinding(s,t),h=u.createProjectionLayer(Pe),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new ds(h.textureWidth,h.textureHeight,{format:$n,type:Si,depthTexture:new _h(h.textureWidth,h.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,we),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}else{const we={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,we),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new ds(f.framebufferWidth,f.framebufferHeight,{format:$n,type:Si,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),me.setContext(s),me.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function H(O){for(let J=0;J<O.removed.length;J++){const we=O.removed[J],fe=_.indexOf(we);fe>=0&&(_[fe]=null,w[fe].disconnect(we))}for(let J=0;J<O.added.length;J++){const we=O.added[J];let fe=_.indexOf(we);if(fe===-1){for(let Pe=0;Pe<w.length;Pe++)if(Pe>=_.length){_.push(we),fe=Pe;break}else if(_[Pe]===null){_[Pe]=we,fe=Pe;break}if(fe===-1)break}const De=w[fe];De&&De.connect(we)}}const $=new U,Z=new U;function V(O,J,we){$.setFromMatrixPosition(J.matrixWorld),Z.setFromMatrixPosition(we.matrixWorld);const fe=$.distanceTo(Z),De=J.projectionMatrix.elements,Pe=we.projectionMatrix.elements,Be=De[14]/(De[10]-1),mt=De[14]/(De[10]+1),Ye=(De[9]+1)/De[5],yt=(De[9]-1)/De[5],k=(De[8]-1)/De[0],on=(Pe[8]+1)/Pe[0],st=Be*k,rt=Be*on,Ne=fe/(-k+on),It=Ne*-k;if(J.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(It),O.translateZ(Ne),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert(),De[10]===-1)O.projectionMatrix.copy(J.projectionMatrix),O.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const Ue=Be+Ne,L=mt+Ne,R=st-It,W=rt+(fe-It),ne=Ye*mt/L*Ue,re=yt*mt/L*Ue;O.projectionMatrix.makePerspective(R,W,ne,re,Ue,L),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}}function K(O,J){J===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(J.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(s===null)return;let J=O.near,we=O.far;v.texture!==null&&(v.depthNear>0&&(J=v.depthNear),v.depthFar>0&&(we=v.depthFar)),S.near=E.near=x.near=J,S.far=E.far=x.far=we,(A!==S.near||I!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),A=S.near,I=S.far),x.layers.mask=O.layers.mask|2,E.layers.mask=O.layers.mask|4,S.layers.mask=x.layers.mask|E.layers.mask;const fe=O.parent,De=S.cameras;K(S,fe);for(let Pe=0;Pe<De.length;Pe++)K(De[Pe],fe);De.length===2?V(S,x,E):S.projectionMatrix.copy(x.projectionMatrix),G(O,S,fe)};function G(O,J,we){we===null?O.matrix.copy(J.matrixWorld):(O.matrix.copy(we.matrixWorld),O.matrix.invert(),O.matrix.multiply(J.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(J.projectionMatrix),O.projectionMatrixInverse.copy(J.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=qr*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(O){l=O,h!==null&&(h.fixedFoveation=O),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=O)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let Y=null;function oe(O,J){if(d=J.getViewerPose(c||a),g=J,d!==null){const we=d.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let fe=!1;we.length!==S.cameras.length&&(S.cameras.length=0,fe=!0);for(let Pe=0;Pe<we.length;Pe++){const Be=we[Pe];let mt=null;if(f!==null)mt=f.getViewport(Be);else{const yt=u.getViewSubImage(h,Be);mt=yt.viewport,Pe===0&&(e.setRenderTargetTextures(y,yt.colorTexture,h.ignoreDepthValues?void 0:yt.depthStencilTexture),e.setRenderTarget(y))}let Ye=M[Pe];Ye===void 0&&(Ye=new Vn,Ye.layers.enable(Pe),Ye.viewport=new Ft,M[Pe]=Ye),Ye.matrix.fromArray(Be.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(Be.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(mt.x,mt.y,mt.width,mt.height),Pe===0&&(S.matrix.copy(Ye.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),fe===!0&&S.cameras.push(Ye)}const De=s.enabledFeatures;if(De&&De.includes("depth-sensing")){const Pe=u.getDepthInformation(we[0]);Pe&&Pe.isValid&&Pe.texture&&v.init(e,Pe,s.renderState)}}for(let we=0;we<w.length;we++){const fe=_[we],De=w[we];fe!==null&&De!==void 0&&De.update(fe,J,c||a)}Y&&Y(O,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const me=new Sh;me.setAnimationLoop(oe),this.setAnimationLoop=function(O){Y=O},this.dispose=function(){}}}const Ki=new ni,u_=new kt;function h_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ph(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,w,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,y,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===gn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===gn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),w=y.envMap,_=y.envMapRotation;w&&(m.envMap.value=w,Ki.copy(_),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),m.envMapRotation.value.setFromMatrix4(u_.makeRotationFromEuler(Ki)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===gn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function f_(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,w){const _=w.program;n.uniformBlockBinding(y,_)}function c(y,w){let _=s[y.id];_===void 0&&(g(y),_=d(y),s[y.id]=_,y.addEventListener("dispose",m));const b=w.program;n.updateUBOMapping(y,b);const T=e.render.frame;r[y.id]!==T&&(h(y),r[y.id]=T)}function d(y){const w=u();y.__bindingPointIndex=w;const _=i.createBuffer(),b=y.__size,T=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,b,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,_),_}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const w=s[y.id],_=y.uniforms,b=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let T=0,x=_.length;T<x;T++){const E=Array.isArray(_[T])?_[T]:[_[T]];for(let M=0,S=E.length;M<S;M++){const A=E[M];if(f(A,T,M,b)===!0){const I=A.__offset,P=Array.isArray(A.value)?A.value:[A.value];let F=0;for(let H=0;H<P.length;H++){const $=P[H],Z=v($);typeof $=="number"||typeof $=="boolean"?(A.__data[0]=$,i.bufferSubData(i.UNIFORM_BUFFER,I+F,A.__data)):$.isMatrix3?(A.__data[0]=$.elements[0],A.__data[1]=$.elements[1],A.__data[2]=$.elements[2],A.__data[3]=0,A.__data[4]=$.elements[3],A.__data[5]=$.elements[4],A.__data[6]=$.elements[5],A.__data[7]=0,A.__data[8]=$.elements[6],A.__data[9]=$.elements[7],A.__data[10]=$.elements[8],A.__data[11]=0):($.toArray(A.__data,F),F+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,I,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,w,_,b){const T=y.value,x=w+"_"+_;if(b[x]===void 0)return typeof T=="number"||typeof T=="boolean"?b[x]=T:b[x]=T.clone(),!0;{const E=b[x];if(typeof T=="number"||typeof T=="boolean"){if(E!==T)return b[x]=T,!0}else if(E.equals(T)===!1)return E.copy(T),!0}return!1}function g(y){const w=y.uniforms;let _=0;const b=16;for(let x=0,E=w.length;x<E;x++){const M=Array.isArray(w[x])?w[x]:[w[x]];for(let S=0,A=M.length;S<A;S++){const I=M[S],P=Array.isArray(I.value)?I.value:[I.value];for(let F=0,H=P.length;F<H;F++){const $=P[F],Z=v($),V=_%b,K=V%Z.boundary,G=V+K;_+=K,G!==0&&b-G<Z.storage&&(_+=b-G),I.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=_,_+=Z.storage}}}const T=_%b;return T>0&&(_+=b-T),y.__size=_,y.__cache={},this}function v(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),w}function m(y){const w=y.target;w.removeEventListener("dispose",m);const _=a.indexOf(w.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Ah{constructor(e={}){const{canvas:t=qp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const y=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=en,this.toneMapping=Fi,this.toneMappingExposure=1;const _=this;let b=!1,T=0,x=0,E=null,M=-1,S=null;const A=new Ft,I=new Ft;let P=null;const F=new xe(0);let H=0,$=t.width,Z=t.height,V=1,K=null,G=null;const Y=new Ft(0,0,$,Z),oe=new Ft(0,0,$,Z);let me=!1;const O=new vc;let J=!1,we=!1;this.transmissionResolutionScale=1;const fe=new kt,De=new kt,Pe=new U,Be=new Ft,mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ye=!1;function yt(){return E===null?V:1}let k=n;function on(C,B){return t.getContext(C,B)}try{const C={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ac}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",Me,!1),k===null){const B="webgl2";if(k=on(B,C),k===null)throw on(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let st,rt,Ne,It,Ue,L,R,W,ne,re,te,Le,_e,Ae,lt,de,Re,ze,Ve,Ce,at,Je,Rt,N;function ve(){st=new bv(k),st.init(),Je=new r_(k,st),rt=new vv(k,st,e,Je),Ne=new i_(k,st),rt.reverseDepthBuffer&&h&&Ne.buffers.depth.setReversed(!0),It=new Ev(k),Ue=new Wy,L=new s_(k,st,Ne,Ue,rt,Je,It),R=new _v(_),W=new Sv(_),ne=new Dm(k),Rt=new mv(k,ne),re=new xv(k,ne,It,Rt),te=new Rv(k,re,ne,It),Ve=new Av(k,rt,L),de=new yv(Ue),Le=new Vy(_,R,W,st,rt,Rt,de),_e=new h_(_,Ue),Ae=new Xy,lt=new Jy(st),ze=new pv(_,R,W,Ne,te,f,l),Re=new t_(_,te,rt),N=new f_(k,It,rt,Ne),Ce=new gv(k,st,It),at=new Tv(k,st,It),It.programs=Le.programs,_.capabilities=rt,_.extensions=st,_.properties=Ue,_.renderLists=Ae,_.shadowMap=Re,_.state=Ne,_.info=It}ve();const j=new d_(_,k);this.xr=j,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const C=st.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=st.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(C){C!==void 0&&(V=C,this.setSize($,Z,!1))},this.getSize=function(C){return C.set($,Z)},this.setSize=function(C,B,X=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=C,Z=B,t.width=Math.floor(C*V),t.height=Math.floor(B*V),X===!0&&(t.style.width=C+"px",t.style.height=B+"px"),this.setViewport(0,0,C,B)},this.getDrawingBufferSize=function(C){return C.set($*V,Z*V).floor()},this.setDrawingBufferSize=function(C,B,X){$=C,Z=B,V=X,t.width=Math.floor(C*X),t.height=Math.floor(B*X),this.setViewport(0,0,C,B)},this.getCurrentViewport=function(C){return C.copy(A)},this.getViewport=function(C){return C.copy(Y)},this.setViewport=function(C,B,X,q){C.isVector4?Y.set(C.x,C.y,C.z,C.w):Y.set(C,B,X,q),Ne.viewport(A.copy(Y).multiplyScalar(V).round())},this.getScissor=function(C){return C.copy(oe)},this.setScissor=function(C,B,X,q){C.isVector4?oe.set(C.x,C.y,C.z,C.w):oe.set(C,B,X,q),Ne.scissor(I.copy(oe).multiplyScalar(V).round())},this.getScissorTest=function(){return me},this.setScissorTest=function(C){Ne.setScissorTest(me=C)},this.setOpaqueSort=function(C){K=C},this.setTransparentSort=function(C){G=C},this.getClearColor=function(C){return C.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor.apply(ze,arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha.apply(ze,arguments)},this.clear=function(C=!0,B=!0,X=!0){let q=0;if(C){let z=!1;if(E!==null){const le=E.texture.format;z=le===fc||le===hc||le===uc}if(z){const le=E.texture.type,ye=le===Si||le===cs||le===Xr||le===tr||le===cc||le===dc,Ee=ze.getClearColor(),Ie=ze.getClearAlpha(),We=Ee.r,Xe=Ee.g,Fe=Ee.b;ye?(g[0]=We,g[1]=Xe,g[2]=Fe,g[3]=Ie,k.clearBufferuiv(k.COLOR,0,g)):(v[0]=We,v[1]=Xe,v[2]=Fe,v[3]=Ie,k.clearBufferiv(k.COLOR,0,v))}else q|=k.COLOR_BUFFER_BIT}B&&(q|=k.DEPTH_BUFFER_BIT),X&&(q|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",Me,!1),ze.dispose(),Ae.dispose(),lt.dispose(),Ue.dispose(),R.dispose(),W.dispose(),te.dispose(),Rt.dispose(),N.dispose(),Le.dispose(),j.dispose(),j.removeEventListener("sessionstart",Sc),j.removeEventListener("sessionend",bc),Gi.stop()};function ie(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const C=It.autoReset,B=Re.enabled,X=Re.autoUpdate,q=Re.needsUpdate,z=Re.type;ve(),It.autoReset=C,Re.enabled=B,Re.autoUpdate=X,Re.needsUpdate=q,Re.type=z}function Me(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function je(C){const B=C.target;B.removeEventListener("dispose",je),Ut(B)}function Ut(C){nn(C),Ue.remove(C)}function nn(C){const B=Ue.get(C).programs;B!==void 0&&(B.forEach(function(X){Le.releaseProgram(X)}),C.isShaderMaterial&&Le.releaseShaderCache(C))}this.renderBufferDirect=function(C,B,X,q,z,le){B===null&&(B=mt);const ye=z.isMesh&&z.matrixWorld.determinant()<0,Ee=zh(C,B,X,q,z);Ne.setMaterial(q,ye);let Ie=X.index,We=1;if(q.wireframe===!0){if(Ie=re.getWireframeAttribute(X),Ie===void 0)return;We=2}const Xe=X.drawRange,Fe=X.attributes.position;let ct=Xe.start*We,_t=(Xe.start+Xe.count)*We;le!==null&&(ct=Math.max(ct,le.start*We),_t=Math.min(_t,(le.start+le.count)*We)),Ie!==null?(ct=Math.max(ct,0),_t=Math.min(_t,Ie.count)):Fe!=null&&(ct=Math.max(ct,0),_t=Math.min(_t,Fe.count));const Gt=_t-ct;if(Gt<0||Gt===1/0)return;Rt.setup(z,q,Ee,X,Ie);let Ot,ft=Ce;if(Ie!==null&&(Ot=ne.get(Ie),ft=at,ft.setIndex(Ot)),z.isMesh)q.wireframe===!0?(Ne.setLineWidth(q.wireframeLinewidth*yt()),ft.setMode(k.LINES)):ft.setMode(k.TRIANGLES);else if(z.isLine){let He=q.linewidth;He===void 0&&(He=1),Ne.setLineWidth(He*yt()),z.isLineSegments?ft.setMode(k.LINES):z.isLineLoop?ft.setMode(k.LINE_LOOP):ft.setMode(k.LINE_STRIP)}else z.isPoints?ft.setMode(k.POINTS):z.isSprite&&ft.setMode(k.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)ft.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(st.get("WEBGL_multi_draw"))ft.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const He=z._multiDrawStarts,Qt=z._multiDrawCounts,wt=z._multiDrawCount,Bn=Ie?ne.get(Ie).bytesPerElement:1,fs=Ue.get(q).currentProgram.getUniforms();for(let yn=0;yn<wt;yn++)fs.setValue(k,"_gl_DrawID",yn),ft.render(He[yn]/Bn,Qt[yn])}else if(z.isInstancedMesh)ft.renderInstances(ct,Gt,z.count);else if(X.isInstancedBufferGeometry){const He=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Qt=Math.min(X.instanceCount,He);ft.renderInstances(ct,Gt,Qt)}else ft.render(ct,Gt)};function bt(C,B,X){C.transparent===!0&&C.side===gt&&C.forceSinglePass===!1?(C.side=gn,C.needsUpdate=!0,ta(C,B,X),C.side=Bi,C.needsUpdate=!0,ta(C,B,X),C.side=gt):ta(C,B,X)}this.compile=function(C,B,X=null){X===null&&(X=C),p=lt.get(X),p.init(B),w.push(p),X.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),C!==X&&C.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const q=new Set;return C.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const le=z.material;if(le)if(Array.isArray(le))for(let ye=0;ye<le.length;ye++){const Ee=le[ye];bt(Ee,X,z),q.add(Ee)}else bt(le,X,z),q.add(le)}),w.pop(),p=null,q},this.compileAsync=function(C,B,X=null){const q=this.compile(C,B,X);return new Promise(z=>{function le(){if(q.forEach(function(ye){Ue.get(ye).currentProgram.isReady()&&q.delete(ye)}),q.size===0){z(C);return}setTimeout(le,10)}st.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let Fn=null;function ii(C){Fn&&Fn(C)}function Sc(){Gi.stop()}function bc(){Gi.start()}const Gi=new Sh;Gi.setAnimationLoop(ii),typeof self<"u"&&Gi.setContext(self),this.setAnimationLoop=function(C){Fn=C,j.setAnimationLoop(C),C===null?Gi.stop():Gi.start()},j.addEventListener("sessionstart",Sc),j.addEventListener("sessionend",bc),this.render=function(C,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(B),B=j.getCamera()),C.isScene===!0&&C.onBeforeRender(_,C,B,E),p=lt.get(C,w.length),p.init(B),w.push(p),De.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),O.setFromProjectionMatrix(De),we=this.localClippingEnabled,J=de.init(this.clippingPlanes,we),m=Ae.get(C,y.length),m.init(),y.push(m),j.enabled===!0&&j.isPresenting===!0){const le=_.xr.getDepthSensingMesh();le!==null&&po(le,B,-1/0,_.sortObjects)}po(C,B,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(K,G),Ye=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,Ye&&ze.addToRenderList(m,C),this.info.render.frame++,J===!0&&de.beginShadows();const X=p.state.shadowsArray;Re.render(X,C,B),J===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,z=m.transmissive;if(p.setupLights(),B.isArrayCamera){const le=B.cameras;if(z.length>0)for(let ye=0,Ee=le.length;ye<Ee;ye++){const Ie=le[ye];Tc(q,z,C,Ie)}Ye&&ze.render(C);for(let ye=0,Ee=le.length;ye<Ee;ye++){const Ie=le[ye];xc(m,C,Ie,Ie.viewport)}}else z.length>0&&Tc(q,z,C,B),Ye&&ze.render(C),xc(m,C,B);E!==null&&x===0&&(L.updateMultisampleRenderTarget(E),L.updateRenderTargetMipmap(E)),C.isScene===!0&&C.onAfterRender(_,C,B),Rt.resetDefaultState(),M=-1,S=null,w.pop(),w.length>0?(p=w[w.length-1],J===!0&&de.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function po(C,B,X,q){if(C.visible===!1)return;if(C.layers.test(B.layers)){if(C.isGroup)X=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(B);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||O.intersectsSprite(C)){q&&Be.setFromMatrixPosition(C.matrixWorld).applyMatrix4(De);const ye=te.update(C),Ee=C.material;Ee.visible&&m.push(C,ye,Ee,X,Be.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||O.intersectsObject(C))){const ye=te.update(C),Ee=C.material;if(q&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Be.copy(C.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Be.copy(ye.boundingSphere.center)),Be.applyMatrix4(C.matrixWorld).applyMatrix4(De)),Array.isArray(Ee)){const Ie=ye.groups;for(let We=0,Xe=Ie.length;We<Xe;We++){const Fe=Ie[We],ct=Ee[Fe.materialIndex];ct&&ct.visible&&m.push(C,ye,ct,X,Be.z,Fe)}}else Ee.visible&&m.push(C,ye,Ee,X,Be.z,null)}}const le=C.children;for(let ye=0,Ee=le.length;ye<Ee;ye++)po(le[ye],B,X,q)}function xc(C,B,X,q){const z=C.opaque,le=C.transmissive,ye=C.transparent;p.setupLightsView(X),J===!0&&de.setGlobalState(_.clippingPlanes,X),q&&Ne.viewport(A.copy(q)),z.length>0&&ea(z,B,X),le.length>0&&ea(le,B,X),ye.length>0&&ea(ye,B,X),Ne.buffers.depth.setTest(!0),Ne.buffers.depth.setMask(!0),Ne.buffers.color.setMask(!0),Ne.setPolygonOffset(!1)}function Tc(C,B,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new ds(1,1,{generateMipmaps:!0,type:st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float")?jr:Si,minFilter:gi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pt.workingColorSpace}));const le=p.state.transmissionRenderTarget[q.id],ye=q.viewport||A;le.setSize(ye.z*_.transmissionResolutionScale,ye.w*_.transmissionResolutionScale);const Ee=_.getRenderTarget();_.setRenderTarget(le),_.getClearColor(F),H=_.getClearAlpha(),H<1&&_.setClearColor(16777215,.5),_.clear(),Ye&&ze.render(X);const Ie=_.toneMapping;_.toneMapping=Fi;const We=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),J===!0&&de.setGlobalState(_.clippingPlanes,q),ea(C,X,q),L.updateMultisampleRenderTarget(le),L.updateRenderTargetMipmap(le),st.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let Fe=0,ct=B.length;Fe<ct;Fe++){const _t=B[Fe],Gt=_t.object,Ot=_t.geometry,ft=_t.material,He=_t.group;if(ft.side===gt&&Gt.layers.test(q.layers)){const Qt=ft.side;ft.side=gn,ft.needsUpdate=!0,Ec(Gt,X,q,Ot,ft,He),ft.side=Qt,ft.needsUpdate=!0,Xe=!0}}Xe===!0&&(L.updateMultisampleRenderTarget(le),L.updateRenderTargetMipmap(le))}_.setRenderTarget(Ee),_.setClearColor(F,H),We!==void 0&&(q.viewport=We),_.toneMapping=Ie}function ea(C,B,X){const q=B.isScene===!0?B.overrideMaterial:null;for(let z=0,le=C.length;z<le;z++){const ye=C[z],Ee=ye.object,Ie=ye.geometry,We=q===null?ye.material:q,Xe=ye.group;Ee.layers.test(X.layers)&&Ec(Ee,B,X,Ie,We,Xe)}}function Ec(C,B,X,q,z,le){C.onBeforeRender(_,B,X,q,z,le),C.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),z.onBeforeRender(_,B,X,q,C,le),z.transparent===!0&&z.side===gt&&z.forceSinglePass===!1?(z.side=gn,z.needsUpdate=!0,_.renderBufferDirect(X,B,q,z,C,le),z.side=Bi,z.needsUpdate=!0,_.renderBufferDirect(X,B,q,z,C,le),z.side=gt):_.renderBufferDirect(X,B,q,z,C,le),C.onAfterRender(_,B,X,q,z,le)}function ta(C,B,X){B.isScene!==!0&&(B=mt);const q=Ue.get(C),z=p.state.lights,le=p.state.shadowsArray,ye=z.state.version,Ee=Le.getParameters(C,z.state,le,B,X),Ie=Le.getProgramCacheKey(Ee);let We=q.programs;q.environment=C.isMeshStandardMaterial?B.environment:null,q.fog=B.fog,q.envMap=(C.isMeshStandardMaterial?W:R).get(C.envMap||q.environment),q.envMapRotation=q.environment!==null&&C.envMap===null?B.environmentRotation:C.envMapRotation,We===void 0&&(C.addEventListener("dispose",je),We=new Map,q.programs=We);let Xe=We.get(Ie);if(Xe!==void 0){if(q.currentProgram===Xe&&q.lightsStateVersion===ye)return Rc(C,Ee),Xe}else Ee.uniforms=Le.getUniforms(C),C.onBeforeCompile(Ee,_),Xe=Le.acquireProgram(Ee,Ie),We.set(Ie,Xe),q.uniforms=Ee.uniforms;const Fe=q.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Fe.clippingPlanes=de.uniform),Rc(C,Ee),q.needsLights=Vh(C),q.lightsStateVersion=ye,q.needsLights&&(Fe.ambientLightColor.value=z.state.ambient,Fe.lightProbe.value=z.state.probe,Fe.directionalLights.value=z.state.directional,Fe.directionalLightShadows.value=z.state.directionalShadow,Fe.spotLights.value=z.state.spot,Fe.spotLightShadows.value=z.state.spotShadow,Fe.rectAreaLights.value=z.state.rectArea,Fe.ltc_1.value=z.state.rectAreaLTC1,Fe.ltc_2.value=z.state.rectAreaLTC2,Fe.pointLights.value=z.state.point,Fe.pointLightShadows.value=z.state.pointShadow,Fe.hemisphereLights.value=z.state.hemi,Fe.directionalShadowMap.value=z.state.directionalShadowMap,Fe.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Fe.spotShadowMap.value=z.state.spotShadowMap,Fe.spotLightMatrix.value=z.state.spotLightMatrix,Fe.spotLightMap.value=z.state.spotLightMap,Fe.pointShadowMap.value=z.state.pointShadowMap,Fe.pointShadowMatrix.value=z.state.pointShadowMatrix),q.currentProgram=Xe,q.uniformsList=null,Xe}function Ac(C){if(C.uniformsList===null){const B=C.currentProgram.getUniforms();C.uniformsList=Ga.seqWithValue(B.seq,C.uniforms)}return C.uniformsList}function Rc(C,B){const X=Ue.get(C);X.outputColorSpace=B.outputColorSpace,X.batching=B.batching,X.batchingColor=B.batchingColor,X.instancing=B.instancing,X.instancingColor=B.instancingColor,X.instancingMorph=B.instancingMorph,X.skinning=B.skinning,X.morphTargets=B.morphTargets,X.morphNormals=B.morphNormals,X.morphColors=B.morphColors,X.morphTargetsCount=B.morphTargetsCount,X.numClippingPlanes=B.numClippingPlanes,X.numIntersection=B.numClipIntersection,X.vertexAlphas=B.vertexAlphas,X.vertexTangents=B.vertexTangents,X.toneMapping=B.toneMapping}function zh(C,B,X,q,z){B.isScene!==!0&&(B=mt),L.resetTextureUnits();const le=B.fog,ye=q.isMeshStandardMaterial?B.environment:null,Ee=E===null?_.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:ir,Ie=(q.isMeshStandardMaterial?W:R).get(q.envMap||ye),We=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Xe=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Fe=!!X.morphAttributes.position,ct=!!X.morphAttributes.normal,_t=!!X.morphAttributes.color;let Gt=Fi;q.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Gt=_.toneMapping);const Ot=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ft=Ot!==void 0?Ot.length:0,He=Ue.get(q),Qt=p.state.lights;if(J===!0&&(we===!0||C!==S)){const ln=C===S&&q.id===M;de.setState(q,C,ln)}let wt=!1;q.version===He.__version?(He.needsLights&&He.lightsStateVersion!==Qt.state.version||He.outputColorSpace!==Ee||z.isBatchedMesh&&He.batching===!1||!z.isBatchedMesh&&He.batching===!0||z.isBatchedMesh&&He.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&He.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&He.instancing===!1||!z.isInstancedMesh&&He.instancing===!0||z.isSkinnedMesh&&He.skinning===!1||!z.isSkinnedMesh&&He.skinning===!0||z.isInstancedMesh&&He.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&He.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&He.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&He.instancingMorph===!1&&z.morphTexture!==null||He.envMap!==Ie||q.fog===!0&&He.fog!==le||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==de.numPlanes||He.numIntersection!==de.numIntersection)||He.vertexAlphas!==We||He.vertexTangents!==Xe||He.morphTargets!==Fe||He.morphNormals!==ct||He.morphColors!==_t||He.toneMapping!==Gt||He.morphTargetsCount!==ft)&&(wt=!0):(wt=!0,He.__version=q.version);let Bn=He.currentProgram;wt===!0&&(Bn=ta(q,B,z));let fs=!1,yn=!1,pr=!1;const Lt=Bn.getUniforms(),Cn=He.uniforms;if(Ne.useProgram(Bn.program)&&(fs=!0,yn=!0,pr=!0),q.id!==M&&(M=q.id,yn=!0),fs||S!==C){Ne.buffers.depth.getReversed()?(fe.copy(C.projectionMatrix),Kp(fe),jp(fe),Lt.setValue(k,"projectionMatrix",fe)):Lt.setValue(k,"projectionMatrix",C.projectionMatrix),Lt.setValue(k,"viewMatrix",C.matrixWorldInverse);const fn=Lt.map.cameraPosition;fn!==void 0&&fn.setValue(k,Pe.setFromMatrixPosition(C.matrixWorld)),rt.logarithmicDepthBuffer&&Lt.setValue(k,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Lt.setValue(k,"isOrthographic",C.isOrthographicCamera===!0),S!==C&&(S=C,yn=!0,pr=!0)}if(z.isSkinnedMesh){Lt.setOptional(k,z,"bindMatrix"),Lt.setOptional(k,z,"bindMatrixInverse");const ln=z.skeleton;ln&&(ln.boneTexture===null&&ln.computeBoneTexture(),Lt.setValue(k,"boneTexture",ln.boneTexture,L))}z.isBatchedMesh&&(Lt.setOptional(k,z,"batchingTexture"),Lt.setValue(k,"batchingTexture",z._matricesTexture,L),Lt.setOptional(k,z,"batchingIdTexture"),Lt.setValue(k,"batchingIdTexture",z._indirectTexture,L),Lt.setOptional(k,z,"batchingColorTexture"),z._colorsTexture!==null&&Lt.setValue(k,"batchingColorTexture",z._colorsTexture,L));const In=X.morphAttributes;if((In.position!==void 0||In.normal!==void 0||In.color!==void 0)&&Ve.update(z,X,Bn),(yn||He.receiveShadow!==z.receiveShadow)&&(He.receiveShadow=z.receiveShadow,Lt.setValue(k,"receiveShadow",z.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Cn.envMap.value=Ie,Cn.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&B.environment!==null&&(Cn.envMapIntensity.value=B.environmentIntensity),yn&&(Lt.setValue(k,"toneMappingExposure",_.toneMappingExposure),He.needsLights&&Gh(Cn,pr),le&&q.fog===!0&&_e.refreshFogUniforms(Cn,le),_e.refreshMaterialUniforms(Cn,q,V,Z,p.state.transmissionRenderTarget[C.id]),Ga.upload(k,Ac(He),Cn,L)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Ga.upload(k,Ac(He),Cn,L),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Lt.setValue(k,"center",z.center),Lt.setValue(k,"modelViewMatrix",z.modelViewMatrix),Lt.setValue(k,"normalMatrix",z.normalMatrix),Lt.setValue(k,"modelMatrix",z.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const ln=q.uniformsGroups;for(let fn=0,mo=ln.length;fn<mo;fn++){const Vi=ln[fn];N.update(Vi,Bn),N.bind(Vi,Bn)}}return Bn}function Gh(C,B){C.ambientLightColor.needsUpdate=B,C.lightProbe.needsUpdate=B,C.directionalLights.needsUpdate=B,C.directionalLightShadows.needsUpdate=B,C.pointLights.needsUpdate=B,C.pointLightShadows.needsUpdate=B,C.spotLights.needsUpdate=B,C.spotLightShadows.needsUpdate=B,C.rectAreaLights.needsUpdate=B,C.hemisphereLights.needsUpdate=B}function Vh(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return x},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(C,B,X){Ue.get(C.texture).__webglTexture=B,Ue.get(C.depthTexture).__webglTexture=X;const q=Ue.get(C);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||st.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,B){const X=Ue.get(C);X.__webglFramebuffer=B,X.__useDefaultFramebuffer=B===void 0};const Wh=k.createFramebuffer();this.setRenderTarget=function(C,B=0,X=0){E=C,T=B,x=X;let q=!0,z=null,le=!1,ye=!1;if(C){const Ie=Ue.get(C);if(Ie.__useDefaultFramebuffer!==void 0)Ne.bindFramebuffer(k.FRAMEBUFFER,null),q=!1;else if(Ie.__webglFramebuffer===void 0)L.setupRenderTarget(C);else if(Ie.__hasExternalTextures)L.rebindTextures(C,Ue.get(C.texture).__webglTexture,Ue.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Fe=C.depthTexture;if(Ie.__boundDepthTexture!==Fe){if(Fe!==null&&Ue.has(Fe)&&(C.width!==Fe.image.width||C.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(C)}}const We=C.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(ye=!0);const Xe=Ue.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Xe[B])?z=Xe[B][X]:z=Xe[B],le=!0):C.samples>0&&L.useMultisampledRTT(C)===!1?z=Ue.get(C).__webglMultisampledFramebuffer:Array.isArray(Xe)?z=Xe[X]:z=Xe,A.copy(C.viewport),I.copy(C.scissor),P=C.scissorTest}else A.copy(Y).multiplyScalar(V).floor(),I.copy(oe).multiplyScalar(V).floor(),P=me;if(X!==0&&(z=Wh),Ne.bindFramebuffer(k.FRAMEBUFFER,z)&&q&&Ne.drawBuffers(C,z),Ne.viewport(A),Ne.scissor(I),Ne.setScissorTest(P),le){const Ie=Ue.get(C.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ie.__webglTexture,X)}else if(ye){const Ie=Ue.get(C.texture),We=B;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ie.__webglTexture,X,We)}else if(C!==null&&X!==0){const Ie=Ue.get(C.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ie.__webglTexture,X)}M=-1},this.readRenderTargetPixels=function(C,B,X,q,z,le,ye){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=Ue.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ye!==void 0&&(Ee=Ee[ye]),Ee){Ne.bindFramebuffer(k.FRAMEBUFFER,Ee);try{const Ie=C.texture,We=Ie.format,Xe=Ie.type;if(!rt.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!rt.textureTypeReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=C.width-q&&X>=0&&X<=C.height-z&&k.readPixels(B,X,q,z,Je.convert(We),Je.convert(Xe),le)}finally{const Ie=E!==null?Ue.get(E).__webglFramebuffer:null;Ne.bindFramebuffer(k.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(C,B,X,q,z,le,ye){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=Ue.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ye!==void 0&&(Ee=Ee[ye]),Ee){const Ie=C.texture,We=Ie.format,Xe=Ie.type;if(!rt.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!rt.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=C.width-q&&X>=0&&X<=C.height-z){Ne.bindFramebuffer(k.FRAMEBUFFER,Ee);const Fe=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Fe),k.bufferData(k.PIXEL_PACK_BUFFER,le.byteLength,k.STREAM_READ),k.readPixels(B,X,q,z,Je.convert(We),Je.convert(Xe),0);const ct=E!==null?Ue.get(E).__webglFramebuffer:null;Ne.bindFramebuffer(k.FRAMEBUFFER,ct);const _t=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Yp(k,_t,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Fe),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,le),k.deleteBuffer(Fe),k.deleteSync(_t),le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,B=null,X=0){C.isTexture!==!0&&(Fs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,C=arguments[1]);const q=Math.pow(2,-X),z=Math.floor(C.image.width*q),le=Math.floor(C.image.height*q),ye=B!==null?B.x:0,Ee=B!==null?B.y:0;L.setTexture2D(C,0),k.copyTexSubImage2D(k.TEXTURE_2D,X,0,0,ye,Ee,z,le),Ne.unbindTexture()};const $h=k.createFramebuffer(),Xh=k.createFramebuffer();this.copyTextureToTexture=function(C,B,X=null,q=null,z=0,le=null){C.isTexture!==!0&&(Fs("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,C=arguments[1],B=arguments[2],le=arguments[3]||0,X=null),le===null&&(z!==0?(Fs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),le=z,z=0):le=0);let ye,Ee,Ie,We,Xe,Fe,ct,_t,Gt;const Ot=C.isCompressedTexture?C.mipmaps[le]:C.image;if(X!==null)ye=X.max.x-X.min.x,Ee=X.max.y-X.min.y,Ie=X.isBox3?X.max.z-X.min.z:1,We=X.min.x,Xe=X.min.y,Fe=X.isBox3?X.min.z:0;else{const In=Math.pow(2,-z);ye=Math.floor(Ot.width*In),Ee=Math.floor(Ot.height*In),C.isDataArrayTexture?Ie=Ot.depth:C.isData3DTexture?Ie=Math.floor(Ot.depth*In):Ie=1,We=0,Xe=0,Fe=0}q!==null?(ct=q.x,_t=q.y,Gt=q.z):(ct=0,_t=0,Gt=0);const ft=Je.convert(B.format),He=Je.convert(B.type);let Qt;B.isData3DTexture?(L.setTexture3D(B,0),Qt=k.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(L.setTexture2DArray(B,0),Qt=k.TEXTURE_2D_ARRAY):(L.setTexture2D(B,0),Qt=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,B.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,B.unpackAlignment);const wt=k.getParameter(k.UNPACK_ROW_LENGTH),Bn=k.getParameter(k.UNPACK_IMAGE_HEIGHT),fs=k.getParameter(k.UNPACK_SKIP_PIXELS),yn=k.getParameter(k.UNPACK_SKIP_ROWS),pr=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,Ot.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Ot.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,We),k.pixelStorei(k.UNPACK_SKIP_ROWS,Xe),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Fe);const Lt=C.isDataArrayTexture||C.isData3DTexture,Cn=B.isDataArrayTexture||B.isData3DTexture;if(C.isDepthTexture){const In=Ue.get(C),ln=Ue.get(B),fn=Ue.get(In.__renderTarget),mo=Ue.get(ln.__renderTarget);Ne.bindFramebuffer(k.READ_FRAMEBUFFER,fn.__webglFramebuffer),Ne.bindFramebuffer(k.DRAW_FRAMEBUFFER,mo.__webglFramebuffer);for(let Vi=0;Vi<Ie;Vi++)Lt&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ue.get(C).__webglTexture,z,Fe+Vi),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ue.get(B).__webglTexture,le,Gt+Vi)),k.blitFramebuffer(We,Xe,ye,Ee,ct,_t,ye,Ee,k.DEPTH_BUFFER_BIT,k.NEAREST);Ne.bindFramebuffer(k.READ_FRAMEBUFFER,null),Ne.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(z!==0||C.isRenderTargetTexture||Ue.has(C)){const In=Ue.get(C),ln=Ue.get(B);Ne.bindFramebuffer(k.READ_FRAMEBUFFER,$h),Ne.bindFramebuffer(k.DRAW_FRAMEBUFFER,Xh);for(let fn=0;fn<Ie;fn++)Lt?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,In.__webglTexture,z,Fe+fn):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,In.__webglTexture,z),Cn?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ln.__webglTexture,le,Gt+fn):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ln.__webglTexture,le),z!==0?k.blitFramebuffer(We,Xe,ye,Ee,ct,_t,ye,Ee,k.COLOR_BUFFER_BIT,k.NEAREST):Cn?k.copyTexSubImage3D(Qt,le,ct,_t,Gt+fn,We,Xe,ye,Ee):k.copyTexSubImage2D(Qt,le,ct,_t,We,Xe,ye,Ee);Ne.bindFramebuffer(k.READ_FRAMEBUFFER,null),Ne.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Cn?C.isDataTexture||C.isData3DTexture?k.texSubImage3D(Qt,le,ct,_t,Gt,ye,Ee,Ie,ft,He,Ot.data):B.isCompressedArrayTexture?k.compressedTexSubImage3D(Qt,le,ct,_t,Gt,ye,Ee,Ie,ft,Ot.data):k.texSubImage3D(Qt,le,ct,_t,Gt,ye,Ee,Ie,ft,He,Ot):C.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,le,ct,_t,ye,Ee,ft,He,Ot.data):C.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,le,ct,_t,Ot.width,Ot.height,ft,Ot.data):k.texSubImage2D(k.TEXTURE_2D,le,ct,_t,ye,Ee,ft,He,Ot);k.pixelStorei(k.UNPACK_ROW_LENGTH,wt),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Bn),k.pixelStorei(k.UNPACK_SKIP_PIXELS,fs),k.pixelStorei(k.UNPACK_SKIP_ROWS,yn),k.pixelStorei(k.UNPACK_SKIP_IMAGES,pr),le===0&&B.generateMipmaps&&k.generateMipmap(Qt),Ne.unbindTexture()},this.copyTextureToTexture3D=function(C,B,X=null,q=null,z=0){return C.isTexture!==!0&&(Fs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,q=arguments[1]||null,C=arguments[2],B=arguments[3],z=arguments[4]||0),Fs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,B,X,q,z)},this.initRenderTarget=function(C){Ue.get(C).__webglFramebuffer===void 0&&L.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?L.setTextureCube(C,0):C.isData3DTexture?L.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?L.setTexture2DArray(C,0):L.setTexture2D(C,0),Ne.unbindTexture()},this.resetState=function(){T=0,x=0,E=null,Ne.reset(),Rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=pt._getDrawingBufferColorSpace(e),t.unpackColorSpace=pt._getUnpackColorSpace()}}const Ia=Mt.degToRad(38),Vd=Mt.degToRad(45),Wd=46,Yn=11.5,p_=.38,m_=3.2,$d=.033,g_=5,v_=.7,y_=3.2,__=2*Math.SQRT2,w_=new xe("#d6ebff"),M_=new xe("#586a85"),S_=new xe("#fff6e6"),b_=new xe("#bdd6ff"),x_=new xe("#0c1322"),T_=new xe("#152036"),E_=new xe("#1e2c46"),A_=new xe("#7c8cf8"),R_=new xe("#1e1b4b"),C_=new xe("#c7d2fe"),I_=new xe("#a78bfa"),P_=new xe("#040514"),L_=new xe("#0d0a2b"),D_=new xe("#1e1548"),k_=[{x:14,y:18,r:1.2,alpha:.9},{x:42,y:34,r:.9,alpha:.7},{x:88,y:22,r:1.4,alpha:.95},{x:112,y:48,r:1,alpha:.75},{x:26,y:68,r:1.1,alpha:.85},{x:66,y:54,r:.85,alpha:.65},{x:102,y:84,r:1.3,alpha:.85},{x:18,y:112,r:.9,alpha:.6},{x:54,y:98,r:1.2,alpha:.8},{x:80,y:124,r:.95,alpha:.6},{x:116,y:138,r:1.1,alpha:.55},{x:36,y:146,r:.85,alpha:.5},{x:74,y:168,r:1,alpha:.42},{x:12,y:182,r:.8,alpha:.35}],Xd=new xe,qd=new xe,Yd=new xe;function Rh(i,e){const t=i.getContext("2d");if(!t)return;const n=i.width,s=i.height,r=Mt.clamp(e,0,1);Xd.copy(x_).lerp(P_,r),qd.copy(T_).lerp(L_,r),Yd.copy(E_).lerp(D_,r);const a=t.createLinearGradient(0,0,0,s);if(a.addColorStop(0,`#${Xd.getHexString()}`),a.addColorStop(.5,`#${qd.getHexString()}`),a.addColorStop(1,`#${Yd.getHexString()}`),t.fillStyle=a,t.fillRect(0,0,n,s),r>.06)for(const o of k_)t.fillStyle=`rgba(224, 231, 255, ${(o.alpha*r).toFixed(3)})`,t.beginPath(),t.arc(o.x,o.y,o.r,0,Math.PI*2),t.fill()}function U_(){const i=document.createElement("canvas");i.width=128,i.height=256,Rh(i,0);const e=new $l(i);return e.colorSpace=en,{canvas:i,texture:e}}class Kd{container;scene;camera;renderer;callbacks=new Set;rafId=null;lastTime=0;elapsed=0;currentTarget=new U(0,0,0);desiredTarget=new U(0,0,0);currentAzimuth=Vd;desiredAzimuth=Vd;currentZoom=1.05;desiredZoom=1.05;boardHalfExtent=12;lastBoardMapSize=null;idleOrbitEnabled=!1;hemiLight=null;sunLight=null;rimLight=null;skyCanvas;skyTexture;eclipseTarget=0;eclipseBlend=0;lastRenderedEclipseBlend=0;shakeTimeRemaining=0;shakeDuration=.001;shakeIntensity=0;resizeObserver=null;handleWindowResize;constructor(e){this.container=e,this.scene=new vh;const t=U_();this.skyCanvas=t.canvas,this.skyTexture=t.texture,this.scene.background=this.skyTexture,this.scene.fog=null;const n=Math.max(e.clientWidth,1),s=Math.max(e.clientHeight,1),r=n/s;this.camera=new co(-Yn*r,Yn*r,Yn,-Yn,.1,190),this.camera.zoom=this.currentZoom;const a=typeof window<"u"&&!!window.EldermereAndroid;this.renderer=new Ah({antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:a}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(n,s),this.renderer.shadowMap.enabled=!a,this.renderer.shadowMap.type=Xu,this.renderer.toneMapping=oc,this.renderer.toneMappingExposure=1.06,this.renderer.outputColorSpace=en,this.renderer.domElement.style.touchAction="none",e.innerHTML="",e.appendChild(this.renderer.domElement),this.setupLighting(),this.updateCameraTransform(),this.handleWindowResize=()=>this.resize(),window.addEventListener("resize",this.handleWindowResize),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e))}setupLighting(){const e=new Mh("#d6ebff","#586a85",.78);e.position.set(0,30,0),this.hemiLight=e,this.scene.add(e);const t=new Za("#fff6e6",2.3);t.position.set(36,44,6),t.castShadow=!0,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,t.shadow.camera.near=2,t.shadow.camera.far=135;const n=24;t.shadow.camera.left=-n,t.shadow.camera.right=n,t.shadow.camera.top=n,t.shadow.camera.bottom=-n,t.shadow.bias=-4e-4,t.shadow.normalBias=.03,t.shadow.radius=2.5,this.sunLight=t,this.scene.add(t);const s=new Za("#bdd6ff",.36);s.position.set(-22,16,-20),this.rimLight=s,this.scene.add(s)}setEclipseMode(e){this.eclipseTarget=e?1:0,this.rafId===null&&(this.eclipseBlend=this.eclipseTarget,this.applyEclipseAtmosphere(this.eclipseBlend))}shakeCamera(e=.45,t=.48){this.shakeIntensity=Math.max(this.shakeIntensity,e),this.shakeDuration=Math.max(t,.05),this.shakeTimeRemaining=Math.max(this.shakeTimeRemaining,this.shakeDuration)}applyEclipseAtmosphere(e){const t=Mt.clamp(e,0,1);this.lastRenderedEclipseBlend=t,this.hemiLight&&(this.hemiLight.color.copy(w_).lerp(A_,t),this.hemiLight.groundColor.copy(M_).lerp(R_,t),this.hemiLight.intensity=Mt.lerp(.78,.64,t)),this.sunLight&&(this.sunLight.color.copy(S_).lerp(C_,t),this.sunLight.intensity=Mt.lerp(2.3,1.38,t)),this.rimLight&&(this.rimLight.color.copy(b_).lerp(I_,t),this.rimLight.intensity=Mt.lerp(.36,.88,t)),this.renderer.toneMappingExposure=Mt.lerp(1.06,.94,t),Rh(this.skyCanvas,t),this.skyTexture.needsUpdate=!0}setBoardBounds(e,t=2){if(this.boardHalfExtent=e*t*.54,this.sunLight){const n=Math.max(20,e*t*.85),s=this.sunLight.shadow.camera;s.left=-n,s.right=n,s.top=n,s.bottom=-n,s.far=Math.max(110,n*4.2),s.updateProjectionMatrix()}if(this.lastBoardMapSize!==e){this.lastBoardMapSize=e;const n=e>=18?.82:e>=16?.88:1.05;this.currentZoom=n,this.desiredZoom=n,this.camera.zoom=n,this.camera.updateProjectionMatrix()}this.clampDesiredTarget()}onUpdate(e){return this.callbacks.add(e),()=>{this.callbacks.delete(e)}}start(){if(this.rafId!==null)return;this.lastTime=performance.now();const e=t=>{this.rafId=requestAnimationFrame(e);const n=(t-this.lastTime)/1e3;this.lastTime=t;const s=Math.min(Math.max(n,0),$d);this.elapsed+=s,this.stepCamera(s);for(const r of this.callbacks)r(s,this.elapsed);this.renderer.render(this.scene,this.camera)};this.rafId=requestAnimationFrame(e)}stop(){this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null)}renderOnce(){this.stepCamera(0);for(const e of this.callbacks)e(0,this.elapsed);this.renderer.render(this.scene,this.camera)}resize(){const e=Math.max(this.container.clientWidth,1),t=Math.max(this.container.clientHeight,1),n=e/t;this.camera.left=-Yn*n,this.camera.right=Yn*n,this.camera.top=Yn,this.camera.bottom=-Yn,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.rafId===null&&this.renderer.render(this.scene,this.camera)}panByScreenDelta(e,t){const n=Math.max(this.container.clientHeight,1),s=Yn*2/(n*this.currentZoom),r=Math.cos(this.currentAzimuth),a=Math.sin(this.currentAzimuth),o=-a,l=-r,c=r,d=-a,u=1/Math.sin(Ia),h=-e*s,f=t*s*u;this.desiredTarget.x+=c*h+o*f,this.desiredTarget.z+=d*h+l*f,this.clampDesiredTarget()}panByAxes(e,t,n){if(e===0&&t===0)return;const s=16/this.currentZoom*n,r=Math.cos(this.currentAzimuth),a=Math.sin(this.currentAzimuth),o=-a,l=-r,c=r,d=-a;this.desiredTarget.x+=(c*e+o*t)*s,this.desiredTarget.z+=(d*e+l*t)*s,this.clampDesiredTarget()}zoomBy(e){const t=Mt.clamp(e,-220,220),n=Math.exp(-t*.0014);this.zoomByFactor(n)}zoomByFactor(e){!Number.isFinite(e)||e<=0||(this.desiredZoom=Mt.clamp(this.desiredZoom*e,p_,m_))}rotateStep(e){this.desiredAzimuth+=e*(Math.PI/2)}setIdleOrbit(e){this.idleOrbitEnabled=e,e||(this.desiredAzimuth=this.currentAzimuth)}frameOpeningZoom(e=!0){const t=Math.max(this.container.clientWidth,1),n=Math.max(this.container.clientHeight,1),s=t/n,r=g_*__,a=r*Math.sin(Ia),o=2*Yn*(s/r+1/a),l=Mt.clamp(o*v_,1.2,y_);this.desiredZoom=l,e&&(this.currentZoom=l,this.camera.zoom=l,this.camera.updateProjectionMatrix())}focusOnWorld(e,t=!1){this.desiredTarget.set(e.x,0,e.z),this.clampDesiredTarget(),t&&(this.currentTarget.copy(this.desiredTarget),this.updateCameraTransform())}getDomElement(){return this.renderer.domElement}clampDesiredTarget(){this.desiredTarget.x=Mt.clamp(this.desiredTarget.x,-this.boardHalfExtent,this.boardHalfExtent),this.desiredTarget.z=Mt.clamp(this.desiredTarget.z,-this.boardHalfExtent,this.boardHalfExtent)}stepCamera(e){const t=Math.min(Math.max(e,0),$d);this.idleOrbitEnabled&&(this.desiredAzimuth+=t*.14);const n=1-Math.exp(-11.5*t),s=1-Math.exp(-10.5*t),r=1-Math.exp(-12.5*t);if(this.currentTarget.distanceToSquared(this.desiredTarget)>1e-7?this.currentTarget.lerp(this.desiredTarget,n):this.currentTarget.copy(this.desiredTarget),Math.abs(this.desiredAzimuth-this.currentAzimuth)>1e-5?this.currentAzimuth=Mt.lerp(this.currentAzimuth,this.desiredAzimuth,s):this.currentAzimuth=this.desiredAzimuth,Math.abs(this.desiredZoom-this.currentZoom)>1e-5?this.currentZoom=Mt.lerp(this.currentZoom,this.desiredZoom,r):this.currentZoom=this.desiredZoom,Math.abs(this.eclipseTarget-this.eclipseBlend)>1e-4){const a=1-Math.exp(-4.8*t);this.eclipseBlend=Mt.lerp(this.eclipseBlend,this.eclipseTarget,a),Math.abs(this.eclipseTarget-this.eclipseBlend)<=.001&&(this.eclipseBlend=this.eclipseTarget),(Math.abs(this.eclipseBlend-this.lastRenderedEclipseBlend)>=.006||this.eclipseBlend===this.eclipseTarget)&&this.applyEclipseAtmosphere(this.eclipseBlend)}this.shakeTimeRemaining>0&&(this.shakeTimeRemaining=Math.max(0,this.shakeTimeRemaining-t),this.shakeTimeRemaining===0&&(this.shakeIntensity=0)),this.updateCameraTransform()}updateCameraTransform(){const e=Math.cos(Ia)*Wd,t=Math.sin(Ia)*Wd;let n=0,s=0,r=0;if(this.shakeTimeRemaining>0&&this.shakeIntensity>0){const a=this.shakeTimeRemaining/Math.max(this.shakeDuration,.001),o=this.shakeIntensity*a*a;n=(Math.random()-.5)*2*o,s=(Math.random()-.5)*1.4*o,r=(Math.random()-.5)*2*o}this.camera.position.set(this.currentTarget.x+Math.sin(this.currentAzimuth)*e+n,this.currentTarget.y+t+s,this.currentTarget.z+Math.cos(this.currentAzimuth)*e+r),this.camera.lookAt(this.currentTarget.x+n*.6,this.currentTarget.y+s*.4,this.currentTarget.z+r*.6),Math.abs(this.camera.zoom-this.currentZoom)>1e-6&&(this.camera.zoom=this.currentZoom,this.camera.updateProjectionMatrix())}dispose(){this.stop(),window.removeEventListener("resize",this.handleWindowResize),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.skyTexture.dispose(),this.renderer.dispose()}}const ee=256,O_={grass:{roughness:.88,metalness:0,bumpScale:.028},forest_floor:{roughness:.9,metalness:0,bumpScale:.032},ancient_floor:{roughness:.85,metalness:.02,bumpScale:.03},wasteland:{roughness:.9,metalness:.04,bumpScale:.055},water:{roughness:.24,metalness:.08,bumpScale:.032},rock:{roughness:.86,metalness:.02,bumpScale:.054},orc_rock:{roughness:.84,metalness:.06,bumpScale:.06},snow:{roughness:.72,metalness:.02,bumpScale:.024},bark:{roughness:.92,metalness:0,bumpScale:.05},foliage:{roughness:.84,metalness:0,bumpScale:.032},mallorn_foliage:{roughness:.8,metalness:.03,bumpScale:.032},cobble:{roughness:.85,metalness:.02,bumpScale:.048},stone_masonry:{roughness:.86,metalness:.02,bumpScale:.048},marble_masonry:{roughness:.6,metalness:.05,bumpScale:.034},dark_iron:{roughness:.46,metalness:.56,bumpScale:.048},granite_runic:{roughness:.82,metalness:.06,bumpScale:.052},roof_shingles:{roughness:.82,metalness:.02,bumpScale:.046},thatch:{roughness:.92,metalness:0,bumpScale:.048},timber:{roughness:.86,metalness:0,bumpScale:.042},farm_soil:{roughness:.94,metalness:0,bumpScale:.058},wheat:{roughness:.86,metalness:0,bumpScale:.04},road_cobble:{roughness:.85,metalness:.02,bumpScale:.048},bedrock_skirt:{roughness:.92,metalness:0,bumpScale:.05},cloud:{roughness:.95,metalness:0,bumpScale:.018}};function hn(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function mn(i,e,t){let n=Math.imul(i,374761393)+Math.imul(e,668265263)+Math.imul(t,1442695041);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function $t(i,e){return(i%e+e)%e}function be(i){return i<0?0:i>255?255:Math.round(i)}function Ja(i){return i<0?0:i>1?1:i}function Yo(i,e,t){return i+(e-i)*t}function it(i,e,t){const n=Ja((t-i)/(e-i));return n*n*(3-2*n)}function zt(i,e,t,n,s){const r=i*t,a=e*n,o=Math.floor(r),l=Math.floor(a),c=r-o,d=a-l,u=c*c*(3-2*c),h=d*d*(3-2*d),f=$t(o,t),g=$t(o+1,t),v=$t(l,n),m=$t(l+1,n),p=mn(f,v,s),y=mn(g,v,s),w=mn(f,m,s),_=mn(g,m,s),b=p+(y-p)*u,T=w+(_-w)*u;return b+(T-b)*h}function bi(i,e,t,n,s,r){let a=0,o=.5,l=0,c=t,d=n;for(let u=0;u<s;u++)a+=o*zt(i,e,c,d,r+u*97),l+=o,o*=.5,c*=2,d*=2;return a/l}const N_={d1:0,d2:0,edge:0,cellHash:0,dx:0,dy:0};function rr(i,e,t,n,s,r,a=N_){const o=i*t,l=e*n,c=Math.floor(o),d=Math.floor(l);let u=1e9,h=1e9,f=0,g=0,v=0;for(let m=-1;m<=1;m++)for(let p=-1;p<=1;p++){const y=c+p,w=d+m,_=$t(y,t),b=$t(w,n),T=(mn(_,b,r)-.5)*s,x=(mn(_,b,r+53)-.5)*s,E=y+.5+T,M=w+.5+x,S=o-E,A=l-M,I=Math.hypot(S,A);I<u?(h=u,u=I,f=mn(_,b,r+131),g=S,v=A):I<h&&(h=I)}return a.d1=u,a.d2=h,a.edge=h-u,a.cellHash=f,a.dx=g,a.dy=v,a}function vn(i,e=ee){for(let t=-e;t<=e;t+=e)for(let n=-e;n<=e;n+=e)i(n,t)}function ar(i,e=ee){i(-e),i(0),i(e)}function se(i,e,t,n=1){const s=be(i),r=be(e),a=be(t);return n>=1?`rgb(${s},${r},${a})`:`rgba(${s},${r},${a},${n.toFixed(3)})`}function Ge(i,e=1){const t=be(i);return e>=1?`rgb(${t},${t},${t})`:`rgba(${t},${t},${t},${e.toFixed(3)})`}function Rn(i,e,t){const n=i.createImageData(ee,ee),s=e.createImageData(ee,ee),r=n.data,a=s.data,o=1/ee;for(let l=0;l<ee;l++){const c=l*o;for(let d=0;d<ee;d++){const u=(l*ee+d)*4;t(d*o,c,d,l,r,a,u),r[u+3]=255,a[u+3]=255}}i.putImageData(n,0,0),e.putImageData(s,0,0)}function ei(i,e,t,n,s,r){const a=Math.min(r,n*.5,s*.5);i.beginPath(),i.moveTo(e+a,t),i.lineTo(e+n-a,t),i.quadraticCurveTo(e+n,t,e+n,t+a),i.lineTo(e+n,t+s-a),i.quadraticCurveTo(e+n,t+s,e+n-a,t+s),i.lineTo(e+a,t+s),i.quadraticCurveTo(e,t+s,e,t+s-a),i.lineTo(e,t+a),i.quadraticCurveTo(e,t,e+a,t),i.closePath()}function F_(i,e){Rn(i,e,(n,s,r,a,o,l,c)=>{const d=bi(n,s,3,3,3,11),u=zt(n+.13*Math.sin(s*Math.PI*2),s,5,5,29),h=Math.min(n,1-n,s,1-s),f=1-it(0,.085,h),g=(n+s<1?1:-1)*f*5,v=228+(d-.5)*24+(u-.5)*10+g;o[c]=be(v-3+(d-.5)*6),o[c+1]=be(v+4),o[c+2]=be(v-7);const m=132+(d-.5)*34+(u-.5)*16-f*16,p=be(m);l[c]=p,l[c+1]=p,l[c+2]=p});const t=hn(101);for(let n=0;n<48;n++){const s=t()*ee,r=t()*ee,a=14+t()*24,o=5+t()*8,l=-.35+(t()-.5)*.55,c=t()>.45,d=c?se(252,255,236,.24):se(206,224,198,.22),u=c?Ge(156,.22):Ge(116,.2);vn((h,f)=>{i.save(),i.translate(s+h,r+f),i.rotate(l),i.fillStyle=d,i.beginPath(),i.ellipse(0,0,a,o,0,0,Math.PI*2),i.fill(),i.restore(),e.save(),e.translate(s+h,r+f),e.rotate(l),e.fillStyle=u,e.beginPath(),e.ellipse(0,0,a,o,0,0,Math.PI*2),e.fill(),e.restore()})}for(let n=0;n<62;n++){const s=t()*ee,r=t()*ee,a=.75+t()*.6,o=t()>.3;vn((l,c)=>{const d=s+l,u=r+c;i.fillStyle=se(194,212,184,.35),i.beginPath(),i.ellipse(d+1,u+1.5,4.5*a,1.8*a,0,0,Math.PI*2),i.fill(),i.strokeStyle=o?se(252,255,234,.72):se(214,232,204,.65),i.lineWidth=1.6*a,i.lineCap="round",e.strokeStyle=Ge(192,.65),e.lineWidth=1.8*a,e.lineCap="round";const h=[-4.2,-.4,3.8],f=[6.2,8,5.8];for(let g=0;g<3;g++){const v=h[g]*a,m=f[g]*a;i.beginPath(),i.moveTo(d,u),i.quadraticCurveTo(d+v*.35,u-m*.6,d+v,u-m),i.stroke(),e.beginPath(),e.moveTo(d,u),e.quadraticCurveTo(d+v*.35,u-m*.6,d+v,u-m),e.stroke()}})}}function jd(i,e,t){const n=t?317:211;Rn(i,e,(a,o,l,c,d,u,h)=>{const f=bi(a,o,4,4,3,n),g=it(.42,.78,zt(a,o,3,3,n+41)),v=zt(a,o,8,8,n+83),m=(t?222:214)+(f-.5)*26+g*22+(v-.5)*8;t?(d[h]=be(m+g*10-2),d[h+1]=be(m+6),d[h+2]=be(m-14-g*8)):(d[h]=be(m+g*6-3),d[h+1]=be(m+4),d[h+2]=be(m-10));const p=be(126+(f-.5)*44+(v-.5)*18);u[h]=p,u[h+1]=p,u[h+2]=p});const s=hn(n+500);for(let a=0;a<42;a++){const o=s()*ee,l=s()*ee,c=8+s()*14,d=s()>.45,u=t?d?se(246,250,212,.34):se(202,232,206,.3):d?se(236,246,214,.3):se(196,216,188,.28);vn((h,f)=>{const g=i.createRadialGradient(o+h-c*.25,l+f-c*.25,c*.1,o+h,l+f,c);g.addColorStop(0,u),g.addColorStop(1,"rgba(220,235,210,0)"),i.fillStyle=g,i.beginPath(),i.arc(o+h,l+f,c,0,Math.PI*2),i.fill();const v=e.createRadialGradient(o+h,l+f,0,o+h,l+f,c);v.addColorStop(0,Ge(185,.35)),v.addColorStop(1,Ge(128,0)),e.fillStyle=v,e.beginPath(),e.arc(o+h,l+f,c,0,Math.PI*2),e.fill()})}const r=t?58:48;for(let a=0;a<r;a++){const o=s()*ee,l=s()*ee,c=s()*Math.PI*2,d=t?5.2+s()*4.5:3.5+s()*3.4,u=t?d*.44:d*.56,h=t?s()>.25?se(255,240,168,.88):se(255,224,128,.85):s()>.5?se(246,228,194,.72):se(222,232,198,.68);vn((f,g)=>{const v=o+f,m=l+g;i.save(),i.translate(v+1.1,m+1.3),i.rotate(c),i.fillStyle=se(168,186,162,.35),i.beginPath(),i.moveTo(-d,0),i.quadraticCurveTo(0,-u,d,0),i.quadraticCurveTo(0,u,-d,0),i.fill(),i.restore(),i.save(),i.translate(v,m),i.rotate(c),i.fillStyle=h,i.beginPath(),i.moveTo(-d,0),i.quadraticCurveTo(0,-u,d,0),i.quadraticCurveTo(0,u,-d,0),i.fill(),t&&(i.strokeStyle=se(255,252,226,.7),i.lineWidth=.8,i.beginPath(),i.moveTo(-d*.75,0),i.lineTo(d*.75,0),i.stroke()),i.restore(),e.save(),e.translate(v,m),e.rotate(c),e.fillStyle=Ge(205,.6),e.beginPath(),e.moveTo(-d,0),e.quadraticCurveTo(0,-u,d,0),e.quadraticCurveTo(0,u,-d,0),e.fill(),e.restore()})}if(t)for(let a=0;a<24;a++){const o=s()*ee,l=s()*ee,c=1.2+s()*1.4;vn((d,u)=>{i.fillStyle=se(255,250,212,.75),i.beginPath(),i.arc(o+d,l+u,c,0,Math.PI*2),i.fill()})}}function B_(i,e){const t={d1:0,d2:0,edge:0,cellHash:0,dx:0,dy:0};Rn(i,e,(n,s,r,a,o,l,c)=>{const d=(zt(n,s,4,4,401)-.5)*.035,u=(zt(n,s,4,4,419)-.5)*.035,h=$t(n+d,1),f=$t(s+u,1),g=rr(h,f,6,6,.82,433),v=rr(h,f,12,12,.75,461,t),m=bi(n,s,5,5,3,479),p=1-it(.015,.072,g.edge),y=(1-it(.008,.038,v.edge))*.36,w=it(.05,.095,g.edge)*(1-it(.095,.16,g.edge)),_=228+(g.cellHash-.5)*20+(m-.5)*16,b=g.dx*-9+g.dy*-9;let T=_+b+w*14-p*86-y*34,x=_-2+b+w*12-p*88-y*36,E=_-5+b+w*10-p*84-y*34;const M=it(.58,.84,m)*(1-p);T+=M*14,x+=M*11,E+=M*7;const S=zt(n,s,16,16,499),A=(1-it(0,.038,g.edge))*it(.75,.91,S);A>.01&&(T=Yo(T,255,A*.94),x=Yo(x,146,A*.86),E=Yo(E,48,A*.88)),o[c]=be(T),o[c+1]=be(x),o[c+2]=be(E);const I=168+(g.cellHash-.5)*22+b*.9+w*28-p*125-y*46,P=be(I);l[c]=P,l[c+1]=P,l[c+2]=P})}function H_(i,e){const t={d1:0,d2:0,edge:0,cellHash:0,dx:0,dy:0};Rn(i,e,(s,r,a,o,l,c,d)=>{const u=$t(s+Math.sin(r*Math.PI*2*2)*.025+(zt(s,r,3,3,503)-.5)*.04,1),h=$t(r+Math.cos(s*Math.PI*2*2)*.025+(zt(s,r,3,3,521)-.5)*.04,1),f=rr(u,h,5,5,.85,541),g=rr($t(u+.37,1),$t(h+.21,1),7,7,.82,563,t),v=1-it(0,.145,f.edge),m=(1-it(0,.12,g.edge))*.65,p=Ja(Math.max(v,m)+v*m*.4),y=.5+.32*Math.sin((s*2+r*1)*Math.PI*2+zt(s,r,2,2,577)*2.2)+.18*Math.cos((s*1-r*2)*Math.PI*2),w=206+y*16+p*46,_=228+y*14+p*27,b=236+y*12+p*19;l[d]=be(w),l[d+1]=be(_),l[d+2]=be(b);const T=be(118+y*48+p*56);c[d]=T,c[d+1]=T,c[d+2]=T});const n=hn(587);for(let s=0;s<26;s++){const r=n()*ee,a=n()*ee,o=18+n()*24,l=3+n()*4.5,c=1.6+n()*1.4;vn((d,u)=>{const h=r+d,f=a+u;i.strokeStyle=se(248,255,255,.45),i.lineWidth=c,i.lineCap="round",i.beginPath(),i.moveTo(h-o*.5,f),i.bezierCurveTo(h-o*.18,f-l,h+o*.18,f+l,h+o*.5,f-l*.25),i.stroke(),e.strokeStyle=Ge(212,.35),e.lineWidth=c+1,e.lineCap="round",e.beginPath(),e.moveTo(h-o*.5,f),e.bezierCurveTo(h-o*.18,f-l,h+o*.18,f+l,h+o*.5,f-l*.25),e.stroke()})}}function Zd(i,e,t){const n=t?673:613;Rn(i,e,(a,o,l,c,d,u,h)=>{const f=bi(a,o,3,3,3,n)-.5,g=t?(a*3+o*2)*2+f*1.35:(a*2+o*1)*3+f*1.15,v=g-Math.floor(g),m=t?Math.pow(1-Math.abs(v*2-1),.72):it(0,.16,v)*(1-it(.84,1,v)*.55),p=1-it(0,t?.12:.1,v),y=it(.08,.22,v)*(1-it(.22,.42,v)),w=rr(a,o,t?7:5,t?7:5,.78,n+29),_=(w.cellHash-.5)*(t?28:22)+(w.dx-w.dy)*14,b=1-it(.008,t?.042:.032,w.edge),T=Math.abs(Math.sin((a*1-o*2)*Math.PI*2+bi(a,o,4,4,3,n+71)*5.2)),x=1-it(0,.035,T),M=(t?216:224)+(m-.5)*(t?34:26)+y*16-p*(t?46:34)+_-b*(t?54:38)+x*(t?-24:22);t?(d[h]=be(M-2),d[h+1]=be(M-3),d[h+2]=be(M+3)):(d[h]=be(M+2),d[h+1]=be(M+1),d[h+2]=be(M-2));const S=be(138+(m-.5)*(t?74:56)+_*1.1-p*54-b*64);u[h]=S,u[h+1]=S,u[h+2]=S});const s=hn(n+200),r=t?28:22;for(let a=0;a<r;a++){const o=s()*ee,l=s()*ee,c=14+s()*24,d=(t?-Math.atan2(3,2):-Math.atan2(2,1))+(s()-.5)*.16;vn((u,h)=>{i.save(),i.translate(o+u,l+h),i.rotate(d),i.strokeStyle=t?se(246,248,255,.28):se(254,252,246,.34),i.lineWidth=t?1.4:2,i.lineCap="round",i.beginPath(),i.moveTo(-c*.5,0),i.lineTo(c*.5,0),i.stroke(),i.restore()})}}function z_(i,e){Rn(i,e,(n,s,r,a,o,l,c)=>{const d=(bi(n,s,3,3,2,709)-.5)*.45,u=(n*2+s*1)*Math.PI*2+d*Math.PI*2,h=.5+.5*Math.sin(u+.35*Math.sin(u)),f=.5+.5*Math.sin((n*3-s*1)*Math.PI*2+d*3),g=h*.72+f*.28,v=1-g;o[c]=be(254-v*36),o[c+1]=be(255-v*23),o[c+2]=be(255-v*8);const m=be(102+g*116);l[c]=m,l[c+1]=m,l[c+2]=m});const t=hn(733);for(let n=0;n<18;n++){const s=t()*ee,r=t()*ee,a=26+t()*34,o=-.42+(t()-.5)*.14;vn((l,c)=>{i.save(),i.translate(s+l,r+c),i.rotate(o),i.strokeStyle=se(255,255,255,.55),i.lineWidth=3.2,i.lineCap="round",i.beginPath(),i.moveTo(-a*.5,0),i.quadraticCurveTo(0,-4,a*.5,0),i.stroke(),i.restore()})}for(let n=0;n<42;n++){const s=t()*ee,r=t()*ee,a=1.4+t()*1.4;vn((o,l)=>{const c=s+o,d=r+l;i.strokeStyle=se(255,255,255,.92),i.lineWidth=1.1,i.beginPath(),i.moveTo(c-a,d),i.lineTo(c+a,d),i.moveTo(c,d-a),i.lineTo(c,d+a),i.stroke()})}}function G_(i,e){const t=[{u:.28,v:.34,rx:.085,ry:.12},{u:.74,v:.72,rx:.075,ry:.105}];Rn(i,e,(n,s,r,a,o,l,c)=>{let d=0,u=0;for(let T=0;T<t.length;T++){const x=t[T];let E=n-x.u,M=s-x.v;E>.5&&(E-=1),E<-.5&&(E+=1),M>.5&&(M-=1),M<-.5&&(M+=1);const S=Math.hypot(E/x.rx,M/x.ry);if(S<1.65){const A=(1-it(0,1.65,S))*(E>=0?1:-1);d+=A*.045,S<1&&(u=Math.max(u,.5+.5*Math.cos(S*Math.PI*4)))}}const h=(zt(n,s,3,4,809)-.5)*.045+d,f=(n+h)*11*Math.PI*2,g=.5+.5*Math.sin(f),v=zt($t(n+h,1),s,22,6,823),m=zt(n,s,8,18,839),p=1-it(.08,.32,g),y=it(.52,.88,Math.cos(f))*(1-p),w=it(.84,.96,m)*(1-p)*.35,_=222+(g-.5)*34+(v-.5)*16+y*16-p*58-w*32-u*20;o[c]=be(_+5),o[c+1]=be(_),o[c+2]=be(_-8);const b=be(142+(g-.5)*90+(v-.5)*20-p*72+u*32);l[c]=b,l[c+1]=b,l[c+2]=b})}function Jd(i,e,t){const n=t?947:907;i.fillStyle=t?se(206,208,176):se(186,204,182),i.fillRect(0,0,ee,ee),e.fillStyle=Ge(84),e.fillRect(0,0,ee,ee);const s=hn(n),r=[{count:44,rMin:12,rMax:20,lumBase:204,bumpBase:126},{count:52,rMin:10,rMax:17,lumBase:226,bumpBase:168},{count:56,rMin:7,rMax:13,lumBase:244,bumpBase:212}];for(let a=0;a<r.length;a++){const o=r[a];for(let l=0;l<o.count;l++){const c=s()*ee,d=s()*ee,u=o.rMin+s()*(o.rMax-o.rMin),h=3+Math.floor(s()*3),f=s()*Math.PI*2,g=(s()-.5)*14,v=t&&a>=1&&s()>.42,m=v?255:be(o.lumBase+g+(t?6:-3)),p=be(v?242+(s()-.5)*14:o.lumBase+g+4),y=be(v?178+(s()-.5)*28:o.lumBase+g-(t?18:8)),w=t?se(178,182,146,.45):se(156,178,154,.45),_=v?se(255,253,224,.72):se(252,255,240,.62),b=Ge(o.bumpBase+(s()-.5)*14);vn((T,x)=>{const E=c+T,M=d+x;i.fillStyle=w,i.beginPath(),i.arc(E+2.2,M+2.6,u*.92,0,Math.PI*2),i.fill(),i.fillStyle=se(m,p,y),e.fillStyle=b;for(let S=0;S<h;S++){const A=f+S/h*Math.PI*2,I=u*.42,P=u*(t?.56:.62),F=E+Math.cos(A)*I,H=M+Math.sin(A)*I;i.save(),i.translate(F,H),i.rotate(A),i.beginPath(),i.ellipse(0,0,P*(t?1.2:1),P*(t?.72:.92),0,0,Math.PI*2),i.fill(),i.restore(),e.save(),e.translate(F,H),e.rotate(A),e.beginPath(),e.ellipse(0,0,P*1.05,P*.85,0,0,Math.PI*2),e.fill(),e.restore()}i.fillStyle=_,i.beginPath(),i.ellipse(E-u*.25,M-u*.28,u*.44,u*.26,-.5,0,Math.PI*2),i.fill(),e.fillStyle=Ge(Math.min(248,o.bumpBase+28),.55),e.beginPath(),e.arc(E-u*.12,M-u*.12,u*.42,0,Math.PI*2),e.fill()})}}}function V_(i,e){i.fillStyle=se(178,173,165),i.fillRect(0,0,ee,ee),e.fillStyle=Ge(52),e.fillRect(0,0,ee,ee);const t=hn(1021),n=8,s=ee/n,r=3.2;for(let a=0;a<n;a++){const o=a%2===0?7:8,l=[];let c=0;for(let u=0;u<o;u++){const h=.82+t()*.36;l.push(h),c+=h}let d=a%2===0?0:ee/o*.48;for(let u=0;u<o;u++){const h=l[u]/c*ee,f=d+r*.5,g=a*s+r*.5+(t()-.5)*1.4,v=h-r,m=s-r,p=Math.min(v,m)*.34,y=222+(t()-.5)*28,w=(t()-.5)*10;vn((_,b)=>{const T=f+_,x=g+b;ei(i,T+.8,x+1.2,v,m,p),i.fillStyle=se(156,151,144,.55),i.fill();const E=i.createLinearGradient(T,x,T+v,x+m);E.addColorStop(0,se(y+18+w,y+16+w*.6,y+12)),E.addColorStop(.55,se(y+w,y-1+w*.5,y-4)),E.addColorStop(1,se(y-20+w*.5,y-21,y-22)),ei(i,T,x,v,m,p),i.fillStyle=E,i.fill(),i.strokeStyle=se(255,252,245,.45),i.lineWidth=1.2,ei(i,T+1.2,x+1.2,v-2.4,m-2.4,Math.max(2,p-1)),i.stroke();const M=e.createRadialGradient(T+v*.44,x+m*.42,Math.min(v,m)*.08,T+v*.5,x+m*.5,Math.max(v,m)*.68);M.addColorStop(0,Ge(232)),M.addColorStop(.7,Ge(196)),M.addColorStop(1,Ge(122)),ei(e,T,x,v,m,p),e.fillStyle=M,e.fill()}),d+=h}}}function W_(i,e){i.fillStyle=se(184,176,164),i.fillRect(0,0,ee,ee),e.fillStyle=Ge(58),e.fillRect(0,0,ee,ee);const t=hn(1097),n=24,s=n+3,r=ee-s*2,a=6,o=ee/a,l=3.6;for(let u=0;u<a;u++){const h=u%2===0?4:5,f=[];let g=0;for(let m=0;m<h;m++){const p=.78+t()*.44;f.push(p),g+=p}let v=s;for(let m=0;m<h;m++){const p=f[m]/g*r,y=v+l*.5,w=u*o+l*.5,_=p-l,b=o-l,x=224+(1-Math.abs((y+_*.5)/ee-.5)*2)*14+(t()-.5)*20,E=Ge(194+(t()-.5)*22);for(let M=-ee;M<=ee;M+=ee){const S=w+M,A=i.createLinearGradient(y,S,y+_,S+b);A.addColorStop(0,se(x+12,x+10,x+5)),A.addColorStop(1,se(x-14,x-15,x-18)),ei(i,y,S,_,b,6.5),i.fillStyle=A,i.fill(),i.strokeStyle=se(252,248,238,.36),i.lineWidth=1.2,ei(i,y+1.4,S+1.4,_-2.8,b-2.8,5),i.stroke(),ei(e,y,S,_,b,6.5),e.fillStyle=E,e.fill()}v+=p}}const c=8,d=ee/c;for(let u=0;u<c;u++){const h=u*d+1.8,f=d-3.6,g=228+(t()-.5)*16,v=228+(t()-.5)*16,m=[[2,g],[ee-n-2,v]];for(let p=0;p<m.length;p++){const[y,w]=m[p];ei(i,y,h,n-2,f,4);const _=i.createLinearGradient(y,h,y+n,h+f);_.addColorStop(0,se(w+14,w+13,w+10)),_.addColorStop(1,se(w-18,w-19,w-20)),i.fillStyle=_,i.fill(),ei(e,y,h,n-2,f,4),e.fillStyle=Ge(222),e.fill()}}}function Ko(i,e,t){const n=t==="marble_masonry",s=t==="granite_runic",r=n?1217:s?1277:1151,a=hn(r);i.fillStyle=n?se(196,198,202):s?se(156,158,164):se(172,168,162),i.fillRect(0,0,ee,ee),e.fillStyle=Ge(n?74:s?40:52),e.fillRect(0,0,ee,ee);const o=s?6:8,l=ee/o,c=n?2:s?3.8:2.8,d=2;for(let u=0;u<o;u++){const h=u*l;if(s&&u===d){const p=l-c,y=h+c*.5,w=i.createLinearGradient(0,y,0,y+p);w.addColorStop(0,se(244,242,236)),w.addColorStop(.16,se(224,224,226)),w.addColorStop(.84,se(212,214,218)),w.addColorStop(1,se(186,188,194)),i.fillStyle=w,i.fillRect(0,y,ee,p),e.fillStyle=Ge(212),e.fillRect(0,y,ee,p),i.fillStyle=se(164,166,174),i.fillRect(0,y+4.5,ee,2.2),i.fillRect(0,y+p-6.7,ee,2.2),i.fillStyle=se(252,250,246,.7),i.fillRect(0,y+6.7,ee,1.4),i.fillRect(0,y+p-4.5,ee,1.4),e.fillStyle=Ge(72),e.fillRect(0,y+4.5,ee,2.4),e.fillRect(0,y+p-6.9,ee,2.4);const _=8,b=ee/_,T=y+p*.5,x=p*.24,E=(M,S,A,I,P)=>{M.strokeStyle=I,M.lineWidth=P,M.lineCap="square",M.lineJoin="miter";for(let F=0;F<_;F++){const H=F*b+S,$=H+b*.5,Z=H+b;M.beginPath(),M.moveTo(H+4,T+A),M.lineTo($,T-x+A),M.lineTo(Z-4,T+A),M.lineTo($,T+x+A),M.closePath(),M.stroke(),M.beginPath(),M.moveTo($,T-x*.55+A),M.lineTo($,T+x*.55+A),M.moveTo(H,T+A),M.lineTo(H+4,T+A),M.moveTo(Z-4,T+A),M.lineTo(Z,T+A),M.stroke()}};E(i,.9,1.1,se(252,250,244,.8),2.2),E(i,0,0,se(146,150,160),2.2),E(e,0,0,Ge(56),2.8);continue}const f=s||n?4:5,g=[];let v=0;for(let p=0;p<f;p++){const y=n?.92+a()*.16:.8+a()*.4;g.push(y),v+=y}let m=u%2===0?0:ee/f*.5;for(let p=0;p<f;p++){const y=g[p]/v*ee,w=m+c*.5,_=h+c*.5,b=y-c,T=l-c,x=n?242+(a()-.5)*12:s?218+(a()-.5)*20:224+(a()-.5)*24,E=n?2:s?-1:(a()-.5)*8,M=s?3.5:n?1.8:2.4;ar(S=>{const A=w+S,I=i.createLinearGradient(A,_,A,_+T);if(I.addColorStop(0,se(x+10+E,x+10+E*.6,x+8)),I.addColorStop(.5,se(x+E,x+E*.5,x-2)),I.addColorStop(1,se(x-14+E*.4,x-15,x-16)),ei(i,A,_,b,T,s?2.5:1.5),i.fillStyle=I,i.fill(),i.fillStyle=se(255,255,252,n?.65:.48),i.fillRect(A+1,_+1,b-2,M),i.fillRect(A+1,_+1,M,T-2),i.fillStyle=se(164,166,174,s?.48:.32),i.fillRect(A+1,_+T-M,b-2,M),i.fillRect(A+b-M,_+1,M,T-2),n)i.strokeStyle=se(212,218,228,.34),i.lineWidth=1.1,i.beginPath(),i.moveTo(A+b*.12,_+T*.78),i.bezierCurveTo(A+b*.38,_+T*.52,A+b*.62,_+T*.35,A+b*.88,_+T*.2),i.stroke();else for(let P=0;P<4;P++){const F=A+4+mn(u*17+p,P,r+9)*Math.max(2,b-8),H=_+4+mn(u*17+p,P,r+23)*Math.max(2,T-8);i.fillStyle=P%2===0?se(250,248,242,.25):se(176,176,178,.22),i.fillRect(F,H,4+P%3*2,1.8)}e.fillStyle=Ge(148),e.fillRect(A,_,b,T),e.fillStyle=Ge(n?214:206+(mn(u,p,r)-.5)*24),e.fillRect(A+M,_+M,Math.max(1,b-M*2),Math.max(1,T-M*2))}),m+=y}}}function $_(i,e){Rn(i,e,(a,o,l,c,d,u,h)=>{const f=zt(a,o,3,42,1301),g=rr(a,o,14,14,.75,1319),v=it(0,.55,g.d1),m=212+(f-.5)*20+(v-.5)*20;d[h]=be(m-2),d[h+1]=be(m),d[h+2]=be(m+5);const p=be(152+(v-.5)*44+(f-.5)*14);u[h]=p,u[h+1]=p,u[h+2]=p});const t=4,n=2,s=ee/t,r=ee/n;for(let a=0;a<t;a++){const o=a%2===0?0:r*.5,l=a*s;i.fillStyle=se(134,138,148),i.fillRect(0,l,ee,2.8),i.fillStyle=se(248,250,255,.65),i.fillRect(0,l+2.8,ee,1.6),e.fillStyle=Ge(42),e.fillRect(0,l,ee,3);for(let c=0;c<n;c++){const d=$t(c*r+o,ee);i.fillStyle=se(134,138,148),i.fillRect(d,l,2.8,s),i.fillStyle=se(248,250,255,.55),i.fillRect(d+2.8,l,1.4,s),e.fillStyle=Ge(42),e.fillRect(d,l,3,s);const u=9.5,h=[[u,u],[r-u,u],[u,s-u],[r-u,s-u]];for(let f=0;f<h.length;f++){const g=d+h[f][0],v=l+h[f][1];ar(m=>{const p=g+m;i.fillStyle=se(124,128,138,.8),i.beginPath(),i.arc(p+.9,v+1.1,3.8,0,Math.PI*2),i.fill();const y=i.createRadialGradient(p-1.2,v-1.2,.5,p,v,3.6);y.addColorStop(0,se(255,255,255)),y.addColorStop(.55,se(216,220,230)),y.addColorStop(1,se(156,160,172)),i.fillStyle=y,i.beginPath(),i.arc(p,v,3.5,0,Math.PI*2),i.fill();const w=e.createRadialGradient(p,v,.4,p,v,3.8);w.addColorStop(0,Ge(248)),w.addColorStop(.75,Ge(204)),w.addColorStop(1,Ge(118)),e.fillStyle=w,e.beginPath(),e.arc(p,v,3.8,0,Math.PI*2),e.fill()})}}}}function X_(i,e){i.fillStyle=se(196,192,188),i.fillRect(0,0,ee,ee),e.fillStyle=Ge(64),e.fillRect(0,0,ee,ee);const t=hn(1409),n=8,s=8,r=ee/n,a=ee/s;for(let o=n;o>=-1;o--){const l=$t(o,2)===0?0:a*.5,c=o*r;for(let d=-1;d<=s;d++){const u=d*a+l,h=$t(o,n),f=$t(d,s),v=222+(mn(f,h,1423)-.5)*28,m=(mn(f,h,1439)-.5)*10,p=c-r*.2,y=r*1.18,w=a*.5,_=p+y-w*.55,b=(E,M)=>{E.beginPath(),E.moveTo(u+.8,p+M),E.lineTo(u+a-.8,p+M),E.lineTo(u+a-.8,_+M),E.quadraticCurveTo(u+a*.5,p+y+w*.35+M,u+.8,_+M),E.closePath()};b(i,3.2),i.fillStyle=se(146,142,140,.62),i.fill();const T=i.createLinearGradient(u,p,u,p+y);T.addColorStop(0,se(v-14+m*.5,v-15,v-16)),T.addColorStop(.55,se(v+m,v+m*.4,v-2)),T.addColorStop(1,se(v+18+m,v+16+m*.5,v+12)),b(i,0),i.fillStyle=T,i.fill(),i.strokeStyle=se(255,252,245,.55),i.lineWidth=1.3,i.beginPath(),i.moveTo(u+2,_),i.quadraticCurveTo(u+a*.5,p+y+w*.28,u+a-2,_),i.stroke(),i.strokeStyle=se(162,158,154,.45),i.lineWidth=1,i.beginPath(),i.moveTo(u+.8,p),i.lineTo(u+.8,_),i.stroke(),b(e,2.2),e.fillStyle=Ge(52),e.fill();const x=e.createLinearGradient(u,p,u,p+y);x.addColorStop(0,Ge(112)),x.addColorStop(.85,Ge(226)),x.addColorStop(1,Ge(242)),b(e,0),e.fillStyle=x,e.fill()}}for(let o=0;o<24;o++){const l=t()*ee,c=t()*ee;i.fillStyle=se(252,250,244,.2),i.fillRect(l,c,4,2)}}function q_(i,e){i.fillStyle=se(224,212,184),i.fillRect(0,0,ee,ee),e.fillStyle=Ge(110),e.fillRect(0,0,ee,ee);const t=hn(1511),n=4,s=ee/n;for(let r=n;r>=-1;r--){const a=r*s-10,o=(r+1)*s,l=i.createLinearGradient(0,o-4,0,o+12);l.addColorStop(0,se(166,148,118,.65)),l.addColorStop(1,se(166,148,118,0)),i.fillStyle=l,i.fillRect(0,o-4,ee,16);const c=e.createLinearGradient(0,o-2,0,o+10);c.addColorStop(0,Ge(48,.85)),c.addColorStop(1,Ge(120,0)),e.fillStyle=c,e.fillRect(0,o-2,ee,12);const d=130;for(let h=0;h<d;h++){const f=h/d*ee+(t()-.5)*3.5,g=(t()-.5)*7,v=(t()-.3)*9,m=t(),p=m>.65?se(255,248,216,.92):m>.25?se(238,224,188,.88):se(206,188,152,.85),y=m>.65?228:m>.25?182:128,w=1.6+t()*1.4;ar(_=>{const b=f+_;i.strokeStyle=p,i.lineWidth=w,i.lineCap="round",i.beginPath(),i.moveTo(b,a),i.quadraticCurveTo(b+g*.5,(a+o)*.5,b+g,o+v),i.stroke(),e.strokeStyle=Ge(y,.85),e.lineWidth=2,e.lineCap="round",e.beginPath(),e.moveTo(b,a),e.lineTo(b+g,o+v),e.stroke()})}const u=a+s*.42;i.strokeStyle=se(188,168,134,.5),i.lineWidth=2.2,i.beginPath(),i.moveTo(0,u),i.lineTo(ee,u),i.stroke(),e.strokeStyle=Ge(158,.6),e.lineWidth=2.6,e.beginPath(),e.moveTo(0,u),e.lineTo(ee,u),e.stroke()}}function Y_(i,e){const n=ee/6;Rn(i,e,(s,r,a,o,l,c,d)=>{const u=Math.floor(r*6),h=r*6-u,f=1601+u*37,g=(mn(u,0,1609)-.5)*18,v=Math.sin((s*2+mn(u,1,1613))*Math.PI*2)*.35+(zt(s,h,3,2,f)-.5)*1.4,m=Math.sin((h*5.2+v)*Math.PI*2),p=zt(s,r,4,28,f+17),y=1-it(0,.065,h)+it(.935,1,h),w=it(.055,.11,h)*(1-it(.11,.2,h)),_=226+g+m*11+(p-.5)*12+w*14-Ja(y)*66;l[d]=be(_+6),l[d+1]=be(_+1),l[d+2]=be(_-9);const b=be(174+m*16+(p-.5)*14+w*18-Ja(y)*118);c[d]=b,c[d+1]=b,c[d+2]=b});for(let s=0;s<6;s++){const r=s*n,a=$t((s*.37+.18)*ee,ee);i.fillStyle=se(146,134,120),i.fillRect(a-1.2,r+1.5,2.4,n-3),i.fillStyle=se(248,242,230,.55),i.fillRect(a+1.2,r+1.5,1.2,n-3),e.fillStyle=Ge(48),e.fillRect(a-1.4,r+1,2.8,n-2);const o=[a-8,a+8],l=[r+n*.3,r+n*.72];for(let c=0;c<o.length;c++)for(let d=0;d<l.length;d++)ar(u=>{const h=o[c]+u,f=l[d];i.fillStyle=se(128,122,118),i.beginPath(),i.arc(h,f,2.6,0,Math.PI*2),i.fill(),i.fillStyle=se(238,236,234,.7),i.beginPath(),i.arc(h-.7,f-.7,1,0,Math.PI*2),i.fill(),e.fillStyle=Ge(228),e.beginPath(),e.arc(h,f,2.6,0,Math.PI*2),e.fill()})}}function K_(i,e){Rn(i,e,(s,r,a,o,l,c,d)=>{const u=(zt(s,r,4,4,1709)-.5)*.18,h=(r*8+u)*Math.PI*2,f=.5+.5*Math.sin(h),g=Math.cos(h)*.5,v=bi(s,r,10,10,2,1723),m=204+f*38+g*18+(v-.5)*18;l[d]=be(m+6),l[d+1]=be(m),l[d+2]=be(m-9);const p=be(56+f*168+(v-.5)*28);c[d]=p,c[d+1]=p,c[d+2]=p});const n=hn(1741);for(let s=0;s<65;s++){const r=n()*ee,o=(Math.floor(n()*8)+.25+(n()-.5)*.35)*(ee/8),l=2.6+n()*3.4,c=1.8+n()*2.4,d=n()>.4,u=n()*Math.PI;vn((h,f)=>{i.fillStyle=d?se(246,236,220,.55):se(176,162,146,.45),i.beginPath(),i.ellipse(r+h,o+f,l,c,u,0,Math.PI*2),i.fill(),e.fillStyle=Ge(d?224:156,.55),e.beginPath(),e.ellipse(r+h,o+f,l,c,u,0,Math.PI*2),e.fill()})}}function j_(i,e){Rn(i,e,(s,r,a,o,l,c,d)=>{const u=Math.sin(s*Math.PI*2*2)*.22,h=.5+.5*Math.sin((r*8+u)*Math.PI*2),f=zt(s,r,6,8,1801),g=212+h*30+(f-.5)*14;l[d]=be(g+10),l[d+1]=be(g+4),l[d+2]=be(g-24);const v=be(92+h*110+(f-.5)*26);c[d]=v,c[d+1]=v,c[d+2]=v});const n=hn(1831);for(let s=0;s<150;s++){const r=n()*ee,a=n()*ee,o=10+n()*10,l=-.58+Math.sin(r/ee*Math.PI*4)*.16+(n()-.5)*.18,c=n()>.35;vn((d,u)=>{const h=r+d,f=a+u,g=h+Math.cos(l)*o,v=f+Math.sin(l)*o;i.strokeStyle=c?se(252,242,198,.78):se(216,198,148,.7),i.lineWidth=1.5,i.lineCap="round",i.beginPath(),i.moveTo(h,f),i.quadraticCurveTo((h+g)*.5,(f+v)*.5-2.2,g,v),i.stroke(),i.save(),i.translate(g,v),i.rotate(l),i.fillStyle=c?se(255,250,214,.92):se(236,218,166,.85),i.beginPath(),i.ellipse(0,0,3.8,1.7,0,0,Math.PI*2),i.fill(),i.restore(),e.strokeStyle=Ge(c?228:172,.7),e.lineWidth=2,e.beginPath(),e.moveTo(h,f),e.lineTo(g,v),e.stroke()})}}function Z_(i,e){Rn(i,e,(n,s,r,a,o,l,c)=>{const d=.165+.022*Math.sin(n*Math.PI*2*3)+.012*Math.cos(n*Math.PI*2*7+1.1)+(zt(n,.15,10,2,1901)-.5)*.022,u=.56+.026*Math.sin(n*Math.PI*2*2+.6)+(zt(n,.55,6,2,1913)-.5)*.04,h=bi(n,s,6,6,3,1931);let f,g,v,m;if(s<d){const y=1-it(0,.055,s),w=it(d-.04,d,s),_=(h-.5)*26+y*26-w*38;f=114+_*.85,g=176+_,v=76+_*.6,m=228-w*36+(h-.5)*20}else if(s<u){const y=1-it(d,d+.06,s),w=(s-d)/Math.max(.01,u-d),_=Math.sin(s*34+(h-.5)*2.4)*10,b=-w*28+_+(h-.5)*20-y*54;f=176+b,g=126+b*.82,v=84+b*.62,m=152+_*1.4+(h-.5)*28-y*82}else{const y=1-it(u,u+.04,s),w=(s-u)/Math.max(.01,1-u),_=s*10+(zt(n,s,5,4,1949)-.5)*.6,b=_-Math.floor(_),T=1-it(0,.14,b),x=it(.12,.25,b)*(1-it(.25,.45,b)),E=-w*28+(h-.5)*22+x*24-T*34-y*28;f=92+E*.9,g=100+E*.95,v=116+E,m=148+x*36-T*68-y*48+(h-.5)*24}o[c]=be(f),o[c+1]=be(g),o[c+2]=be(v);const p=be(m);l[c]=p,l[c+1]=p,l[c+2]=p});const t=hn(1973);for(let n=0;n<24;n++){const s=t()*ee,r=58+t()*78,a=3+t()*4.5,o=2+t()*2.8,l=(t()-.5)*.4;ar(c=>{i.fillStyle=se(146,134,122,.8),i.beginPath(),i.ellipse(s+c,r,a,o,l,0,Math.PI*2),i.fill(),i.fillStyle=se(192,180,166,.55),i.beginPath(),i.ellipse(s+c-a*.2,r-o*.25,a*.55,o*.45,l,0,Math.PI*2),i.fill(),e.fillStyle=Ge(205,.75),e.beginPath(),e.ellipse(s+c,r,a,o,l,0,Math.PI*2),e.fill()})}for(let n=0;n<12;n++){const s=n/12*ee+(t()-.5)*14,r=152+t()*58,a=22+t()*28,o=(t()-.5)*6;ar(l=>{i.strokeStyle=se(44,50,64,.72),i.lineWidth=2,i.beginPath(),i.moveTo(s+l,r),i.lineTo(s+l+o,Math.min(ee,r+a)),i.stroke(),i.strokeStyle=se(134,144,162,.4),i.lineWidth=1.2,i.beginPath(),i.moveTo(s+l+1.8,r),i.lineTo(s+l+o+1.8,Math.min(ee,r+a)),i.stroke(),e.strokeStyle=Ge(54,.78),e.lineWidth=2.6,e.beginPath(),e.moveTo(s+l,r),e.lineTo(s+l+o,Math.min(ee,r+a)),e.stroke()})}}function J_(i,e){Rn(i,e,(n,s,r,a,o,l,c)=>{const d=bi(n,s,3,3,3,2003),u=zt(n,s,5,5,2017),h=d*.72+u*.28,f=1-it(.28,.82,h);o[c]=be(255-f*24),o[c+1]=be(255-f*16),o[c+2]=be(255-f*6);const g=be(112+h*84);l[c]=g,l[c+1]=g,l[c+2]=g});const t=hn(2039);for(let n=0;n<24;n++){const s=t()*ee,r=t()*ee,a=20+t()*26;vn((o,l)=>{const c=s+o,d=r+l,u=i.createRadialGradient(c+a*.14,d+a*.2,a*.1,c,d,a);u.addColorStop(0,se(224,234,249,.28)),u.addColorStop(1,se(224,234,249,0)),i.fillStyle=u,i.beginPath(),i.arc(c,d,a,0,Math.PI*2),i.fill();const h=i.createRadialGradient(c-a*.16,d-a*.2,a*.05,c-a*.08,d-a*.1,a*.82);h.addColorStop(0,se(255,255,255,.58)),h.addColorStop(1,se(255,255,255,0)),i.fillStyle=h,i.beginPath(),i.arc(c-a*.08,d-a*.1,a*.82,0,Math.PI*2),i.fill();const f=e.createRadialGradient(c,d,0,c,d,a*.85);f.addColorStop(0,Ge(192,.3)),f.addColorStop(1,Ge(128,0)),e.fillStyle=f,e.beginPath(),e.arc(c,d,a*.85,0,Math.PI*2),e.fill()})}}const Qd=new Map,eu=new Map,tu=new Map,Fr=[];function nu(){return{width:ee,height:ee}}function iu(i,e){return i.colorSpace=e?en:mi,i.wrapS=$r,i.wrapT=$r,i.magFilter=On,i.minFilter=gi,i.anisotropy=4,i.needsUpdate=!0,i}function Q_(i,e,t){switch(i){case"grass":F_(e,t);break;case"forest_floor":jd(e,t,!1);break;case"ancient_floor":jd(e,t,!0);break;case"wasteland":B_(e,t);break;case"water":H_(e,t);break;case"rock":Zd(e,t,!1);break;case"orc_rock":Zd(e,t,!0);break;case"snow":z_(e,t);break;case"bark":G_(e,t);break;case"foliage":Jd(e,t,!1);break;case"mallorn_foliage":Jd(e,t,!0);break;case"cobble":V_(e,t);break;case"road_cobble":W_(e,t);break;case"stone_masonry":Ko(e,t,"stone_masonry");break;case"marble_masonry":Ko(e,t,"marble_masonry");break;case"granite_runic":Ko(e,t,"granite_runic");break;case"dark_iron":$_(e,t);break;case"roof_shingles":X_(e,t);break;case"thatch":q_(e,t);break;case"timber":Y_(e,t);break;case"farm_soil":K_(e,t);break;case"wheat":j_(e,t);break;case"bedrock_skirt":Z_(e,t);break;case"cloud":J_(e,t);break}}function ew(i){const e=Qd.get(i);if(e)return e;let t,n;if(typeof document<"u"&&typeof document.createElement=="function"){t=document.createElement("canvas"),t.width=ee,t.height=ee,n=document.createElement("canvas"),n.width=ee,n.height=ee;const r=t.getContext("2d"),a=n.getContext("2d");r&&a&&Q_(i,r,a)}else t=nu(),n=nu();const s={map:iu(new $l(t),!0),bumpMap:iu(new $l(n),!1)};return Qd.set(i,s),i==="water"&&Fr.push(s),s}function tw(i,e,t){const n=ew(i);if(e===1&&t===1)return n;const s=`${i}|${e}|${t}`,r=eu.get(s);if(r)return r;const a=n.map.clone();a.repeat.set(e,t),a.needsUpdate=!0;const o=n.bumpMap.clone();o.repeat.set(e,t),o.needsUpdate=!0;const l={map:a,bumpMap:o};return eu.set(s,l),i==="water"&&Fr.push(l),l}function su(i,e){return i===void 0?e:typeof i=="number"?`#${(i>>>0).toString(16).padStart(6,"0")}`:i.toLowerCase()}function ue(i,e){const t=O_[i],n=su(e?.color,"#ffffff"),s=e?.roughness??t.roughness,r=e?.metalness??t.metalness,a=e?.bumpScale??t.bumpScale,o=su(e?.emissive,"#000000"),l=e?.emissiveIntensity??0,c=e?.transparent??!1,d=e?.opacity??1,u=e?.flatShading??!1,h=e?.repeatX??1,f=e?.repeatY??1,g=[i,n,s,r,a,o,l,c?1:0,d,u?1:0,h,f].join("|"),v=tu.get(g);if(v)return v;const{map:m,bumpMap:p}=tw(i,h,f),y=new us({color:e?.color!==void 0?new xe(e.color):new xe(16777215),map:m,bumpMap:p,bumpScale:a,roughness:s,metalness:r,emissive:e?.emissive!==void 0?new xe(e.emissive):new xe(0),emissiveIntensity:l,transparent:c,opacity:d,flatShading:u});return tu.set(g,y),y}function nw(i){if(!Number.isFinite(i)||i<=0||Fr.length===0)return;const e=i*.036,t=i*.022,n=-i*.02,s=i*.028;for(let r=0;r<Fr.length;r++){const a=Fr[r];a.map.offset.x=(a.map.offset.x+e)%1,a.map.offset.y=(a.map.offset.y+t)%1,a.bumpMap.offset.x=$t(a.bumpMap.offset.x+n,1),a.bumpMap.offset.y=(a.bumpMap.offset.y+s)%1}}const Xs=2,ae=.22,Sr=-.08,qs=.28,Ys=.28,pe=.24,rs=.22,as=.22,ls=.54,iw=.12,sw=.12,rw=.04;function ot(i,e,t,n=0){const s=(t-1)/2;return new U((i-s)*Xs,n,(e-s)*Xs)}function hi(i,e,t){const n=he(i,e,t),s=ot(e,t,i.mapSize,ae);return n?.isCityCenter?(s.x+=qs,s.y+=pe,s.z+=Ys):n?.hasVillage?(s.x+=qs,s.z+=Ys):n?.terrain==="mountain"?(s.x+=rs,s.y+=ls,s.z+=as):(n?.terrain==="forest"||n?.terrain==="ancient_woods")&&(s.x+=iw,s.y+=rw,s.z+=sw),s}function Tt(i,e,t){const n=Math.sin(i*127.1+e*311.7+t*74.7)*43758.5453123;return n-Math.floor(n)}const ru=new Map;function ht(i,e){const t=JSON.stringify([i,e??{}]);let n=ru.get(t);return n||(n=new us({color:i,flatShading:!0,roughness:e?.roughness??.88,metalness:e?.metalness??0,emissive:e?.emissive?new xe(e.emissive):new xe(0),emissiveIntensity:e?.emissiveIntensity??0,transparent:e?.transparent??!1,opacity:e?.opacity??1}),ru.set(t,n)),n}const aw=new ce(1.996,.22,1.996),ow=new ce(1.998,.28,1.998),lw=new ce(2,.26,2),cw=new ce(1.996,.26,1.996),dw=new St(.055,.16,4),Qr=new Et(.052,0),Ch=new et(.055,.085,.28,5),au=new St(.3,.42,6),ou=new St(.21,.34,6),Br=new Nn(.27,0),uw=new St(.62,1.05,6),hw=new St(.28,.44,6),fw=new et(.49,.6,ls,7),pw=new et(.47,.49,.032,7),mw=new St(.14,.42,4),Ih=new Nn(.17,0),lu=new Et(.16,0),Pa=new ce(1.98,.04,.14),gw=new ut({visible:!1}),cu={humans:["#7ed14d","#76c847"],orcs:["#7c7573","#736c6b"],elves:["#5ecc91","#56c288"],dwarves:["#7ba863","#739f5c"]},vw={humans:["#5eb542","#57ac3d"],orcs:["#676166","#605a5f"],elves:["#45ae78","#3fa571"],dwarves:["#5f8850","#58804a"]},yw={humans:["#3c993a","#57b548"],orcs:["#544c59","#645b6b"],elves:["#2ea874","#f2c94c"],dwarves:["#36755c","#458b6f"]};function fi(i,e,t,n){const s=new $e,r=ot(i.x,i.y,e,0);s.position.copy(r);const a=[],o=[],l=[];let c=null,d=null;const u=new D(cw,gw);if(u.position.y=ae*.5,u.userData={tileX:i.x,tileY:i.y},s.add(u),i.terrain==="water"){const p=new D(lw,ue("rock",{color:"#1e84b0",roughness:.9,bumpScale:.025}));p.position.y=-.35,p.receiveShadow=!0,s.add(p);const y=new Jr(2,2,3,3);y.rotateX(-Math.PI/2);const w=ue("water",{color:"#45c8f5",roughness:.14,metalness:.08,bumpScale:.028,transparent:!0,opacity:.92,flatShading:!1});c=new D(y,w),c.position.y=Sr,c.receiveShadow=!0,c.userData={basePositions:Float32Array.from(y.attributes.position.array),tileX:i.x,tileY:i.y},s.add(c);const _=ue("cloud",{color:"#eefbff",roughness:.45,bumpScale:.01,transparent:!0,opacity:.86,flatShading:!1});if(!t.northWater){const b=new D(Pa,_);b.position.set(0,Sr+.022,-.93),s.add(b)}if(!t.southWater){const b=new D(Pa,_);b.position.set(0,Sr+.022,.93),s.add(b)}if(!t.westWater){const b=new D(Pa,_);b.rotation.y=Math.PI/2,b.position.set(-.93,Sr+.022,0),s.add(b)}if(!t.eastWater){const b=new D(Pa,_);b.rotation.y=Math.PI/2,b.position.set(.93,Sr+.022,0),s.add(b)}return{group:s,hitMesh:u,animatedTrees:a,waterMesh:c,windmillBlades:d,floatingMotes:o,smokePuffs:l}}const h=ww(i),f=_w(i,h),g=new D(aw,f);g.position.y=ae*.5,g.receiveShadow=!0,g.castShadow=!1,s.add(g);const v=i.terrain==="wasteland"?"#433c4b":"#6c5640",m=new D(ow,ue(i.terrain==="wasteland"?"orc_rock":"rock",{color:v,roughness:.94,bumpScale:.03}));if(m.position.y=-.14,m.receiveShadow=!0,m.castShadow=!1,s.add(m),!n)return{group:s,hitMesh:u,animatedTrees:a,waterMesh:c,windmillBlades:d,floatingMotes:o,smokePuffs:l};if((i.hasRoad||i.isCityCenter)&&Ew(s,t,i.isCityCenter),!i.isCityCenter&&!i.hasVillage)switch(i.terrain){case"plains":i.improvement||Mw(s,i);break;case"forest":i.improvement||Sw(s,i,a);break;case"ancient_woods":bw(s,i,a,o,!!i.improvement);break;case"mountain":xw(s,i);break;case"wasteland":i.improvement||Tw(s,i,o);break}return i.hasVillage&&!i.isCityCenter&&Rw(s,i,l),i.improvement&&!i.isCityCenter?d=Cw(s,i.improvement,i.terrain==="mountain"):i.resource&&!i.isCityCenter&&!i.hasVillage&&Aw(s,i.resource,i,o),{group:s,hitMesh:u,animatedTrees:a,waterMesh:c,windmillBlades:d,floatingMotes:o,smokePuffs:l}}function _w(i,e){switch(i.terrain){case"forest":return ue("forest_floor",{color:e,roughness:.9,bumpScale:.025});case"ancient_woods":return ue("ancient_floor",{color:e,roughness:.88,bumpScale:.025});case"wasteland":return ue("wasteland",{color:e,roughness:.9,bumpScale:.035});case"mountain":return ue(i.biome==="orcs"?"orc_rock":"rock",{color:e,roughness:.9,bumpScale:.035});case"plains":default:return ue("grass",{color:e,roughness:.88,bumpScale:.022})}}function ww(i){const e=(i.x+i.y)%2===1?1:0;switch(i.terrain){case"plains":return cu[i.biome][e];case"forest":return vw[i.biome][e];case"ancient_woods":return e===0?"#3aa06e":"#359666";case"mountain":return i.biome==="orcs"?e===0?"#6c6476":"#655d6f":e===0?"#8894a3":"#808c9b";case"wasteland":return e===0?"#5b5363":"#544d5c";default:return cu.humans[e]}}function Mw(i,e){if(e.resource||e.hasRoad||Tt(e.x,e.y,19)<.7)return;const t=[[-.66,-.66],[.66,-.66],[-.66,.66]],[n,s]=t[Math.floor(Tt(e.x,e.y,23)*t.length)];if(e.biome!=="orcs"&&Tt(e.x,e.y,29)>.55){const a=["#fde047","#f472b6","#ffffff","#93c5fd"],o=a[Math.floor(Tt(e.x,e.y,31)*a.length)],l=new D(Qr,ht(o));l.position.set(n,ae+.055,s),i.add(l)}else{const a=e.biome==="orcs"?"#635c5c":"#4fa839",o=ue("grass",{color:a,roughness:.86,bumpScale:.016});for(let l=0;l<2;l++){const c=new D(dw,o);c.position.set(n+(l-.5)*.07,ae+.075,s+(l===0?.03:-.03)),c.rotation.set((Tt(e.x,e.y,40+l)-.5)*.24,Tt(e.x,e.y,50+l)*Math.PI*2,(Tt(e.x,e.y,60+l)-.5)*.24),i.add(c)}}}function Sw(i,e,t){const[n,s]=yw[e.biome],r=ue("bark",{color:e.biome==="elves"?"#e5dfd3":e.biome==="orcs"?"#544c59":"#735139",roughness:.9,bumpScale:.03,flatShading:!0}),a=ue("snow",{color:"#f8fafc",roughness:.8,bumpScale:.02,flatShading:!0}),o=ht("#fb923c",{emissive:"#ff6b2b",emissiveIntensity:1,roughness:.4});[[-.56,-.52],[.52,-.52],[-.54,.4]].forEach(([c,d],u)=>{const h=new $e,f=(Tt(e.x,e.y,100+u)-.5)*.08,g=(Tt(e.x,e.y,110+u)-.5)*.08,v=.86+Tt(e.x,e.y,120+u)*.14;h.position.set(c+f,ae,d+g),h.scale.setScalar(v);const m=new D(Ch,r);m.position.y=.14,m.castShadow=!0,h.add(m);const p=ue("foliage",{color:u%2===0?n:s,roughness:.86,bumpScale:.025,flatShading:!0});if(e.biome==="orcs"){m.rotation.z=(u%2===0?1:-1)*.12;const y=new D(new et(.028,.048,.36,4),r);y.position.set(.11,.38,.03),y.rotation.z=-.66,y.castShadow=!0,h.add(y);const w=new D(new et(.024,.042,.3,4),r);if(w.position.set(-.1,.44,-.03),w.rotation.z=.7,w.castShadow=!0,h.add(w),u===0){const _=new D(Qr,o);_.position.set(.08,.05,.08),h.add(_)}}else if(e.biome==="elves"){const y=new D(Br,ue("foliage",{color:n,roughness:.84,bumpScale:.025}));y.position.y=.45,y.scale.set(1.12,.72,1.12),y.castShadow=!0,h.add(y);const w=new D(Br,ue("mallorn_foliage",{color:s,roughness:.82,bumpScale:.025}));w.position.set(.03,.64,-.02),w.scale.set(.82,.66,.82),w.castShadow=!0,h.add(w)}else if(e.biome==="dwarves"){const y=new D(au,p);y.position.y=.4,y.castShadow=!0,h.add(y);const w=new D(ou,a);w.position.y=.65,w.castShadow=!0,h.add(w)}else if(u===1){const y=new D(Br,p);y.position.y=.49,y.scale.set(1.18,.96,1.18),y.castShadow=!0,h.add(y)}else{const y=new D(au,p);y.position.y=.4,y.castShadow=!0,h.add(y);const w=new D(ou,ue("foliage",{color:s,roughness:.86,bumpScale:.025,flatShading:!0}));w.position.y=.65,w.castShadow=!0,h.add(w)}h.userData={swayPhase:Tt(e.x,e.y,130+u)*Math.PI*2},i.add(h),t.push(h)})}function bw(i,e,t,n,s){const r=ue("bark",{color:"#eae4d7",roughness:.88,bumpScale:.03}),a=ue("mallorn_foliage",{color:"#2ea874",roughness:.84,bumpScale:.025}),o=ue("mallorn_foliage",{color:"#f2c94c",roughness:.82,bumpScale:.025}),l=ht("#fef08a",{emissive:"#facc15",emissiveIntensity:1.15});(s?[[-.6,-.56],[.58,-.54]]:[[-.56,-.52],[.52,-.52],[-.54,.4]]).forEach(([d,u],h)=>{const f=new $e,g=.9+Tt(e.x,e.y,200+h)*.14;f.position.set(d,ae,u),f.scale.setScalar(g);const v=new D(Ch,r);v.scale.set(1.08,1.18,1.08),v.position.y=.17,v.castShadow=!0,f.add(v);const m=new D(Br,a);m.position.y=.48,m.scale.set(1.22,.72,1.22),m.castShadow=!0,f.add(m);const p=new D(Br,o);p.position.set(.03,.69,-.02),p.scale.set(.92,.66,.92),p.castShadow=!0,f.add(p),f.userData={swayPhase:Tt(e.x,e.y,210+h)*Math.PI*2},i.add(f),t.push(f)});for(let d=0;d<2;d++){const u=new D(Qr,l),h=(Tt(e.x,e.y,220+d)-.5)*1,f=ae+.58+Tt(e.x,e.y,230+d)*.35,g=(Tt(e.x,e.y,240+d)-.5)*1;u.position.set(h,f,g),u.scale.setScalar(.54),u.userData={moteKind:"firefly",baseX:h,baseY:f,baseZ:g,phase:Tt(e.x,e.y,250+d)*Math.PI*2},i.add(u),n.push(u)}}function xw(i,e){const t=e.biome==="orcs",n=t?"orc_rock":"rock",s=ue(n,{color:t?"#6c6476":"#8894a3",roughness:.88,bumpScale:.04,flatShading:!0}),r=ue(n,{color:t?"#5a5263":"#737f8e",roughness:.9,bumpScale:.04,flatShading:!0}),a=ue(n,{color:t?"#7d7488":"#9aa6b5",roughness:.86,bumpScale:.032,flatShading:!0}),o=t?ue("orc_rock",{color:"#968d9e",roughness:.84,bumpScale:.03,flatShading:!0}):ue("snow",{color:"#f8fafc",roughness:.8,bumpScale:.02,flatShading:!0}),l=Tt(e.x,e.y,300)*Math.PI,c=new D(uw,s);c.position.set(-.3,ae+.525,-.3),c.rotation.y=l,c.castShadow=!0,c.receiveShadow=!0,i.add(c);const d=new D(hw,o);d.position.set(-.3,ae+.85,-.3),d.rotation.y=l,d.castShadow=!0,i.add(d);const u=new D(fw,r);u.position.set(rs,ae+ls*.5,as),u.rotation.y=.4,u.castShadow=!0,u.receiveShadow=!0,i.add(u);const h=new D(pw,a);if(h.position.set(rs,ae+ls-.014,as),h.rotation.y=.4,h.receiveShadow=!0,i.add(h),t){const f=new D(new ce(.065,.42,.065),ht("#ff6b2b",{emissive:"#ff6b2b",emissiveIntensity:1.15}));f.position.set(-.1,ae+.48,-.08),f.rotation.z=-.38,i.add(f)}}function Tw(i,e,t){const n=ue("orc_rock",{color:"#443d4d",roughness:.86,bumpScale:.04}),s=ht("#ff6b2b",{emissive:"#ff6b2b",emissiveIntensity:1.2,roughness:.36}),r=Tt(e.x,e.y,400)*Math.PI,a=new D(new ce(.92,.03,.075),s);a.position.set(0,ae+.012,0),a.rotation.y=r,i.add(a);const o=new D(new ce(.52,.028,.055),s);o.position.set(.14,ae+.012,.12),o.rotation.y=r+.9,i.add(o);for(let u=0;u<2;u++){const h=new D(mw,n),f=(u===0?-.58:.52)+(Tt(e.x,e.y,410+u)-.5)*.14,g=(u===0?-.44:-.5)+(Tt(e.x,e.y,420+u)-.5)*.14;h.position.set(f,ae+.18,g),h.rotation.set(.18*(u===0?1:-1),Tt(e.x,e.y,430+u)*Math.PI,.14),h.castShadow=!0,i.add(h)}const l=new D(Qr,s),c=(Tt(e.x,e.y,440)-.5)*.7,d=(Tt(e.x,e.y,441)-.5)*.7;l.position.set(c,ae+.35,d),l.scale.setScalar(.52),l.userData={moteKind:"ember",baseX:c,baseY:ae+.16,baseZ:d,phase:Tt(e.x,e.y,442)},i.add(l),t.push(l)}function Ew(i,e,t){const n=ue("road_cobble",{color:"#d8cab4",roughness:.9,bumpScale:.025}),s=new D(new et(.24,.26,.04,8),n);s.position.y=ae+.015,i.add(s);const r=new ce(.32,.035,1);if((e.northRoad||t)&&e.northRoad){const a=new D(r,n);a.position.set(0,ae+.015,-.5),i.add(a)}if(e.southRoad){const a=new D(r,n);a.position.set(0,ae+.015,.5),i.add(a)}if(e.westRoad){const a=new D(r,n);a.rotation.y=Math.PI/2,a.position.set(-.5,ae+.015,0),i.add(a)}if(e.eastRoad){const a=new D(r,n);a.rotation.y=Math.PI/2,a.position.set(.5,ae+.015,0),i.add(a)}}function Aw(i,e,t,n){switch(e){case"berries":{const s=ue("foliage",{color:"#2f8540",roughness:.86,bumpScale:.025}),r=ht("#f43f5e",{roughness:.45});[[-.22,.14,.1],[.18,.15,-.08],[0,.13,.22]].forEach(([o,l,c])=>{const d=new D(Ih,s);d.position.set(o,ae+l,c),d.castShadow=!0,i.add(d);const u=new D(Qr,r);u.position.set(o+.08,ae+l+.14,c+.06),i.add(u)});break}case"game":{const s=new $e,r=ht(t.biome==="orcs"?"#7a6154":"#b87a44"),a=ht("#efe8d8"),o=new D(new ce(.32,.18,.16),r);o.position.y=.22,o.castShadow=!0,s.add(o);const l=new ce(.05,.18,.05),c=[[-.1,-.05],[.1,-.05],[-.1,.05],[.1,.05]];for(const[f,g]of c){const v=new D(l,r);v.position.set(f,.09,g),s.add(v)}const d=new D(new ce(.14,.12,.12),r);d.position.set(.19,.34,0),s.add(d);const u=new D(new ce(.03,.14,.03),a);u.position.set(.2,.45,.05),u.rotation.x=.35,s.add(u);const h=u.clone();h.position.z=-.05,h.rotation.x=-.35,s.add(h),s.position.set(.04,ae,.06),s.rotation.y=Tt(t.x,t.y,500)*Math.PI*2,i.add(s);break}case"ore":{const s=ht("#f59e0b",{roughness:.34,metalness:.58,emissive:"#b45309",emissiveIntensity:.22});[[-.48,.36,.06],[.02,.44,-.4],[-.2,.58,-.08]].forEach(([a,o,l],c)=>{const d=new D(lu,s);d.position.set(a,ae+o,l),d.scale.set(.85,1.3,.85),d.rotation.set(.3,c*1.1,.25),d.castShadow=!0,i.add(d)});break}case"mithril":{const s=ht("#93c5fd",{roughness:.3,metalness:.62,emissive:"#60a5fa",emissiveIntensity:.55});[[-.48,.38,.08],[.02,.48,-.4],[-.2,.62,-.06]].forEach(([a,o,l],c)=>{const d=new D(lu,s);d.position.set(a,ae+o,l),d.scale.set(.9,1.55,.9),d.rotation.set(.22,c*1.3,-.2),d.castShadow=!0,i.add(d)});break}case"ruins":{const s=ue("stone_masonry",{color:"#b4bfce",roughness:.88,bumpScale:.035}),r=ue("stone_masonry",{color:"#63946a",roughness:.88,bumpScale:.035}),a=ht("#67e8f9",{emissive:"#22d3ee",emissiveIntensity:1.05,roughness:.32}),o=new D(new et(.48,.54,.08,6),s);o.position.y=ae+.04,o.receiveShadow=!0,i.add(o);const l=new D(new ce(.14,.54,.14),s);l.position.set(-.28,ae+.31,-.18),l.castShadow=!0,i.add(l);const c=new D(new ce(.14,.44,.14),s);c.position.set(.28,ae+.26,-.18),c.castShadow=!0,i.add(c);const d=new D(new ce(.76,.11,.17),r);d.position.set(-.04,ae+.58,-.18),d.rotation.z=-.12,d.castShadow=!0,i.add(d);const u=new D(new Et(.135,0),a);u.position.set(0,ae+.32,.08),u.userData={moteKind:"rune",baseX:0,baseY:ae+.32,baseZ:.08,phase:Tt(t.x,t.y,555)*Math.PI*2},i.add(u),n.push(u);break}}}function Rw(i,e,t){const n=ue("timber",{color:"#f2eadb",roughness:.88,bumpScale:.026}),s=ue("thatch",{color:"#cc9b56",roughness:.9,bumpScale:.032,flatShading:!0}),r=ue("timber",{color:"#784c28",roughness:.88,bumpScale:.028}),a=ue("stone_masonry",{color:"#9ca8b8",roughness:.88,bumpScale:.032}),o=ue("cobble",{color:"#ddd5c5",roughness:.9,bumpScale:.026}),l=ht("#fcd34d",{emissive:"#f59e0b",emissiveIntensity:.9}),c=ht("#fb923c",{emissive:"#f97316",emissiveIntensity:.95}),d=ue("cloud",{color:"#f1f5f9",roughness:.95,bumpScale:.01,transparent:!0,opacity:.68,flatShading:!1}),u=new D(new et(.64,.68,.022,8),o);u.position.set(-.14,ae+.011,-.14),u.receiveShadow=!0,i.add(u),[[-.46,-.44,.35],[.2,-.5,-.45],[-.5,.22,.15]].forEach(([v,m,p],y)=>{const w=new $e,_=new D(new ce(.34,.22,.3),n);_.position.y=.11,_.castShadow=!0,w.add(_);const b=new D(new St(.28,.22,4),s);b.position.y=.33,b.rotation.y=Math.PI/4,b.castShadow=!0,w.add(b);const T=new D(new ce(.08,.075,.025),l);T.position.set(.08,.12,.155),w.add(T);const x=new D(new ce(.08,.13,.025),r);if(x.position.set(-.07,.065,.155),w.add(x),y<2){const E=new D(new ce(.07,.18,.07),a);E.position.set(.1,.34,-.08),w.add(E);const M=new D(new Nn(.055,0),d);M.position.set(.1,.48,-.08),M.userData={smokeBaseX:.1,smokeBaseY:.46,smokeBaseZ:-.08,smokePhase:y*.5+Tt(e.x,e.y,610+y)},w.add(M),t.push(M)}w.position.set(v,ae,m),w.rotation.y=p+Tt(e.x,e.y,600)*.22,i.add(w)});const f=new D(new et(.13,.15,.08,7),a);f.position.set(-.12,ae+.04,-.12),i.add(f);const g=new D(new St(.065,.15,5),c);g.position.set(-.12,ae+.13,-.12),i.add(g)}function Cw(i,e,t){switch(e){case"farm":{const n=ue("farm_soil",{color:"#8f6840",roughness:.92,bumpScale:.032}),s=ue("wheat",{color:"#facc15",roughness:.84,bumpScale:.03}),r=new D(new ce(1.42,.04,1.42),n);r.position.y=ae+.02,r.receiveShadow=!0,i.add(r);for(let a=-2;a<=2;a++){const o=new D(new ce(1.22,.15,.14),s);o.position.set(0,ae+.105,a*.25),o.castShadow=!0,i.add(o)}return null}case"windmill":{const n=ue("stone_masonry",{color:"#ece7dc",roughness:.88,bumpScale:.032,flatShading:!0}),s=ue("roof_shingles",{color:"#2563eb",roughness:.8,bumpScale:.028,flatShading:!0}),r=ue("timber",{color:"#9a683c",roughness:.88,bumpScale:.028}),a=ue("timber",{color:"#fefce8",roughness:.84,bumpScale:.018}),o=new D(new et(.2,.3,.68,7),n);o.position.set(-.24,ae+.34,-.24),o.castShadow=!0,i.add(o);const l=new D(new St(.25,.22,7),s);l.position.set(-.24,ae+.79,-.24),l.castShadow=!0,i.add(l);const c=new $e;c.position.set(-.24,ae+.58,.02);for(let d=0;d<4;d++){const u=new $e;u.rotation.z=d*Math.PI/2;const h=new D(new ce(.04,.38,.03),r);h.position.y=.19,u.add(h);const f=new D(new ce(.13,.28,.02),a);f.position.set(.075,.21,0),u.add(f),c.add(u)}return i.add(c),c}case"mine":{const n=ue("timber",{color:"#8c5a32",roughness:.88,bumpScale:.03}),s=ue("rock",{color:"#2b2730",roughness:.92,bumpScale:.035}),r=ht("#f59e0b",{emissive:"#f59e0b",emissiveIntensity:.65}),a=t?-.44:0,o=t?.28:0,l=new D(new ce(.46,.38,.2),n);l.position.set(a,ae+.19,o),l.castShadow=!0,i.add(l);const c=new D(new ce(.28,.28,.22),s);c.position.set(a,ae+.14,o+.02),i.add(c);const d=new D(new Et(.068,0),r);return d.position.set(a+.24,ae+.34,o+.11),i.add(d),null}case"sanctuary":{const n=ue("marble_masonry",{color:"#f7f2e4",roughness:.82,bumpScale:.026,flatShading:!0}),s=ue("roof_shingles",{color:"#facc15",metalness:.42,roughness:.38,bumpScale:.024,flatShading:!0}),r=ue("mallorn_foliage",{color:"#34b87c",roughness:.84,bumpScale:.025}),a=ht("#34d399",{emissive:"#10b981",emissiveIntensity:.9}),o=new D(new et(.42,.48,.08,6),n);o.position.y=ae+.04,o.receiveShadow=!0,i.add(o);for(let d=0;d<4;d++){const u=d*Math.PI/2+Math.PI/4,h=new D(new et(.04,.04,.44,5),n);h.position.set(Math.cos(u)*.28,ae+.3,Math.sin(u)*.28),h.castShadow=!0,i.add(h)}for(const[d,u]of[[-.36,-.34],[.36,-.34]]){const h=new D(Ih,r);h.position.set(d,ae+.13,u),h.scale.set(.85,.72,.85),h.castShadow=!0,i.add(h)}const l=new D(new St(.38,.3,6),s);l.position.y=ae+.65,l.castShadow=!0,i.add(l);const c=new D(new Et(.12,0),a);return c.position.y=ae+.3,i.add(c),null}case"slag_pit":{const n=ue("dark_iron",{color:"#534b5e",metalness:.3,roughness:.68,bumpScale:.035}),s=ht("#ff6b2b",{emissive:"#f97316",emissiveIntensity:1.2}),r=new D(new et(.52,.6,.18,6),n);r.position.y=ae+.09,r.castShadow=!0,i.add(r);const a=new D(new et(.38,.38,.2,6),s);return a.position.y=ae+.1,i.add(a),null}case"foundry":{const n=ue("dark_iron",{color:"#534b5e",metalness:.32,roughness:.66,bumpScale:.035}),s=ht("#ff6b2b",{emissive:"#f97316",emissiveIntensity:1.15}),r=new D(new ce(.76,.36,.64),n);r.position.set(-.18,ae+.18,-.18),r.castShadow=!0,i.add(r);const a=new D(new et(.12,.16,.7,6),n);a.position.set(.06,ae+.44,-.32),a.castShadow=!0,i.add(a);const o=new D(new ce(.28,.18,.08),s);return o.position.set(-.24,ae+.14,.15),i.add(o),null}case"great_forge":{const n=ue("granite_runic",{color:"#7e8c9e",roughness:.88,bumpScale:.036}),s=ue("dark_iron",{color:"#e08a1e",metalness:.48,roughness:.38,bumpScale:.026}),r=ht("#ff6b2b",{emissive:"#f97316",emissiveIntensity:1.2}),a=new D(new ce(.86,.38,.78),n);a.position.set(-.16,ae+.19,-.16),a.castShadow=!0,i.add(a);const o=new D(new ce(.76,.12,.68),s);o.position.set(-.16,ae+.44,-.16),i.add(o);const l=new D(new ce(.26,.62,.26),n);l.position.set(-.16,ae+.62,-.32),l.castShadow=!0,i.add(l);const c=new D(new ce(.34,.2,.08),r);return c.position.set(-.16,ae+.15,.24),i.add(c),null}}}function Iw(i){const e=new $e,t=i*Xs+.12,n=1.04,s=ue("bedrock_skirt",{color:"#ffffff",roughness:.92,bumpScale:.04,repeatX:i*.5,repeatY:1}),r=ue("rock",{color:"#6b5845",roughness:.94,bumpScale:.03,repeatX:i*.5,repeatY:i*.5}),a=ht("#242f40",{roughness:.96}),o=new D(new ce(t,n,t),[s,s,r,a,s,s]);return o.position.y=-.23-n*.5,o.receiveShadow=!0,e.add(o),e}const ho=-.32,fo=-.32;function Mi(i,e,t,n,s=.075,r=.095,a=.03,o="#fcd34d",l="#f59e0b"){const c=ht(o,{emissive:l,emissiveIntensity:.95,roughness:.32}),d=new D(new ce(s,r,a),c);d.position.set(e,t,n),i.add(d)}function du(i,e,t,n,s,r){const a=new D(new et(.028,.04,.13,5),s);a.position.set(e,t+.065,n),a.castShadow=!0,i.add(a);const o=new D(new Et(.048,0),r);o.position.set(e,t+.16,n),i.add(o)}function or(i,e,t,n,s,r,a,o,l,c=0){const d=ht("#cbd5e1",{metalness:.52,roughness:.34}),u=ht(a,{emissive:a,emissiveIntensity:.16,roughness:.78}),h=ht(o,{metalness:.48,roughness:.36}),f=new D(new et(.016,.02,r,5),d);f.position.set(t,n+r*.5,s),f.castShadow=!0,i.add(f);const g=new D(new Et(.038,0),h);g.position.set(t,n+r+.025,s),i.add(g);const v=new $e;v.position.set(t,n+r-.09,s),v.rotation.y=c,v.userData.bannerPhase=l,v.userData.baseRotY=c;const m=new D(new ce(.22,.13,.024),u);m.position.set(.11,0,0),m.castShadow=!0,v.add(m);const p=new D(new ce(.2,.03,.028),h);p.position.set(.1,-.04,0),v.add(p),i.add(v),e.push(v)}function Pw(i,e,t,n,s,r,a){const o=new ce(.075,.06,.075),l=s*.5-.04,c=r*.5-.04,d=[[-l,-c],[0,-c],[l,-c],[-l,c],[0,c],[l,c],[-l,0],[l,0]];for(const[u,h]of d){const f=new D(o,a);f.position.set(e+u,t,n+h),i.add(f)}}function Yl(i){const e=new $e;e.position.y=ae;const t=[],n=[];e.userData.banners=t,e.userData.smokePuffs=n;const s=i.styleFaction,r=nt[s].palette,a=s==="orcs"?"#ef4444":r.primary,o=s==="orcs"?"#4f4857":s==="elves"?"#ece6d4":s==="dwarves"?"#6b7685":"#e4dfd2",l=s==="orcs"?"#62596b":s==="elves"?"#f7f3e6":s==="dwarves"?"#828e9e":"#f2ede2",c=s==="orcs"?"wasteland":s==="elves"?"marble_masonry":"cobble",d=s==="orcs"?"orc_rock":s==="elves"?"marble_masonry":s==="dwarves"?"granite_runic":"cobble",u=new D(new ce(1.78,pe,1.78),ue(c,{color:o,roughness:.88,bumpScale:s==="orcs"?.035:.028}));u.position.y=pe*.5,u.receiveShadow=!0,u.castShadow=!1,e.add(u);const h=new D(new et(.46,.5,.018,8),ue(d,{color:l,roughness:.84,bumpScale:.022}));h.position.set(qs,pe+.009,Ys),h.receiveShadow=!0,e.add(h);const f=ue("dark_iron",{color:"#4c5160",metalness:.45,roughness:.44,bumpScale:.024}),g=ht("#fbbf24",{emissive:"#f59e0b",emissiveIntensity:1.15,roughness:.32});du(e,-.06,pe,.6,f,g),du(e,.6,pe,-.06,f,g);const v=new $e;v.userData.levelTier=1;const m=new $e;m.userData.levelTier=2;const p=new $e;p.userData.levelTier=3;const y=new $e;switch(y.userData.levelTier=4,s){case"humans":Lw(v,m,p,y,a,r.secondary,r.accent,t);break;case"orcs":Dw(v,m,p,y,a,"#453e4d","#ff6b2b",t);break;case"elves":kw(v,m,p,y,a,r.secondary,r.accent,t);break;case"dwarves":Uw(v,m,p,y,a,r.secondary,r.accent,t,n);break}if(e.add(v),i.level>=2&&e.add(m),i.level>=3&&e.add(p),i.level>=4&&e.add(y),i.isCapital&&or(e,t,-.68,pe,.5,.52,a,r.accent,i.x*.7+i.y*1.1,.35),i.hasWalls&&Ow(e,s,r.secondary,a,r.accent),i.parks>0){const w=ue(s==="elves"?"mallorn_foliage":"foliage",{color:"#38b54a",roughness:.86,bumpScale:.024}),_=ue("bark",{color:"#75533a",roughness:.9,bumpScale:.028}),b=ht("#facc15",{metalness:.52,roughness:.34}),T=[[-.68,.18],[.2,-.68],[-.68,-.66]],x=Math.min(i.parks,T.length);for(let M=0;M<x;M++){const[S,A]=T[M],I=new D(new et(.028,.038,.1,5),_);I.position.set(S,pe+.05,A),e.add(I);const P=new D(new St(.12,.22,5),w);P.position.set(S,pe+.19,A),P.castShadow=!0,e.add(P)}const E=new D(new Et(.085,0),b);E.position.set(-.56,pe+.18,.62),e.add(E)}return e}function Lw(i,e,t,n,s,r,a,o){const l=ue("marble_masonry",{color:r,roughness:.84,bumpScale:.03,flatShading:!0}),c=ue("roof_shingles",{color:s,roughness:.78,bumpScale:.028,flatShading:!0}),d=ht(a,{metalness:.52,roughness:.34}),u=ho,h=fo,f=new D(new ce(.58,.3,.5),l);f.position.set(u,pe+.15,h),f.castShadow=!0,f.receiveShadow=!0,i.add(f),Pw(i,u,pe+.32,h,.58,.5,l);const g=new D(new St(.42,.22,4),c);g.position.set(u,pe+.41,h),g.rotation.y=Math.PI/4,g.castShadow=!0,i.add(g),Mi(i,u-.11,pe+.18,h+.255),Mi(i,u+.11,pe+.18,h+.255),Mi(i,u+.295,pe+.18,h,.03,.09,.075);const v=new D(new ce(.12,.14,.035),ue("timber",{color:"#784c28",roughness:.88,bumpScale:.026}));v.position.set(u,pe+.07,h+.25),i.add(v);const m=new D(new et(.022,.035,.14,5),ue("bark",{color:"#e2e8f0",roughness:.86,bumpScale:.024}));m.position.set(-.58,pe+.07,.22),i.add(m);const p=new D(new Nn(.105,0),ue("mallorn_foliage",{color:"#ffffff",emissive:"#e2e8f0",emissiveIntensity:.22,roughness:.84,bumpScale:.02}));p.position.set(-.58,pe+.19,.22),p.castShadow=!0,i.add(p),or(i,o,u+.26,pe+.3,h+.22,.26,s,a,.5);const y=new D(new et(.13,.17,.44,6),l);y.position.set(-.66,pe+.22,-.62),y.castShadow=!0,e.add(y);const w=new D(new St(.19,.22,6),c);w.position.set(-.66,pe+.55,-.62),w.castShadow=!0,e.add(w);const _=new D(new ce(.32,.22,.28),l);_.position.set(.32,pe+.11,-.56),_.castShadow=!0,e.add(_);const b=new D(new St(.25,.18,4),c);b.position.set(.32,pe+.31,-.56),b.rotation.y=Math.PI/4,e.add(b);const T=new D(new et(.1,.18,.54,6),l);T.position.set(u,pe+.46,h-.04),T.castShadow=!0,t.add(T);const x=new D(new St(.14,.22,6),c);x.position.set(u,pe+.78,h-.04),x.castShadow=!0,t.add(x);const E=new D(new Et(.055,0),d);E.position.set(u,pe+.88,h-.04),t.add(E);const M=new D(new et(.12,.16,.48,6),l);M.position.set(.54,pe+.24,-.52),M.castShadow=!0,n.add(M);const S=new D(new Et(.09,0),ht("#fbbf24",{emissive:"#f59e0b",emissiveIntensity:1.25}));S.position.set(.54,pe+.56,-.52),n.add(S)}function Dw(i,e,t,n,s,r,a,o){const l=ue("dark_iron",{color:r,roughness:.68,metalness:.26,bumpScale:.035,flatShading:!0}),c=ue("dark_iron",{color:"#3f384a",roughness:.56,metalness:.38,bumpScale:.034,flatShading:!0}),d=ht(a,{emissive:"#ff6b2b",emissiveIntensity:1.35}),u=ho,h=fo,f=new D(new et(.24,.36,.38,5),l);f.position.set(u,pe+.19,h),f.castShadow=!0,i.add(f);for(let T=0;T<4;T++){const x=T*Math.PI/2+.3,E=new D(new St(.06,.2,4),c);E.position.set(u+Math.cos(x)*.22,pe+.44,h+Math.sin(x)*.22),E.castShadow=!0,i.add(E)}const g=new D(new ce(.24,.22,.07),c);g.position.set(u+.1,pe+.11,h+.24),i.add(g),Mi(i,u+.1,pe+.11,h+.28,.12,.13,.03,"#fb923c","#ff6b2b"),or(i,o,u-.3,pe,h+.42,.42,s,"#383242",1.2,.4);const v=new D(new St(.23,.34,5),c);v.position.set(-.58,pe+.17,.22),v.castShadow=!0,e.add(v),Mi(e,-.46,pe+.12,.33,.06,.07,.03,"#fb923c","#ff6b2b"),or(e,o,.34,pe,-.56,.48,s,a,2.1,-.5);const m=new D(new et(.11,.24,.62,5),l);m.position.set(u,pe+.46,h-.04),m.castShadow=!0,t.add(m);const p=new D(new St(.055,.22,4),c);p.position.set(u-.11,pe+.8,h-.04),p.rotation.z=.22,t.add(p);const y=p.clone();y.position.x=u+.11,y.rotation.z=-.22,t.add(y);const w=new D(new Et(.095,0),d);w.scale.set(1.25,.72,.72),w.position.set(u,pe+.79,h-.04),t.add(w);const _=new D(new et(.13,.2,.48,5),c);_.position.set(.5,pe+.24,-.5),_.castShadow=!0,n.add(_);const b=new D(new Et(.085,0),d);b.position.set(.5,pe+.54,-.5),n.add(b)}function kw(i,e,t,n,s,r,a,o){const l=ue("marble_masonry",{color:r,roughness:.8,bumpScale:.026,flatShading:!0}),c=ue("roof_shingles",{color:a,metalness:.4,roughness:.38,bumpScale:.024,flatShading:!0}),d=ue("roof_shingles",{color:s,roughness:.74,bumpScale:.026,flatShading:!0}),u=ue("bark",{color:r,roughness:.86,bumpScale:.028}),h=ue("mallorn_foliage",{color:s,roughness:.82,bumpScale:.025}),f=ue("mallorn_foliage",{color:a,roughness:.8,bumpScale:.025}),g=ht("#fef08a",{emissive:"#facc15",emissiveIntensity:1.05}),v=ho,m=fo,p=new D(new et(.28,.34,.3,6),l);p.position.set(v,pe+.15,m),p.castShadow=!0,i.add(p);const y=new D(new St(.36,.3,6),c);y.position.set(v,pe+.44,m),y.castShadow=!0,i.add(y),Mi(i,v+.06,pe+.16,m+.3,.065,.12,.03,"#fef08a","#facc15"),Mi(i,v+.3,pe+.16,m+.04,.03,.12,.065,"#fef08a","#facc15"),or(i,o,v-.32,pe,m+.42,.44,s,a,.8,.3);const w=new D(new et(.05,.08,.34,6),u);w.position.set(-.58,pe+.17,.22),e.add(w);const _=new D(new Nn(.2,0),h);_.scale.set(1.1,.72,1.1),_.position.set(-.58,pe+.38,.22),_.castShadow=!0,e.add(_);const b=new D(new Nn(.16,0),f);b.scale.set(1,.72,1),b.position.set(-.58,pe+.52,.22),b.castShadow=!0,e.add(b);const T=new D(new St(.14,.5,6),l);T.position.set(.38,pe+.25,-.52),T.castShadow=!0,e.add(T);const x=new D(new et(.07,.15,.62,6),l);x.position.set(v,pe+.46,m-.04),x.castShadow=!0,t.add(x);const E=new D(new St(.18,.24,6),d);E.position.set(v,pe+.74,m-.04),t.add(E);const M=new D(new Et(.08,0),g);M.position.set(v,pe+.88,m-.04),t.add(M);const S=new D(new Et(.075,0),g);S.position.set(-.54,pe+.42,.52),n.add(S);const A=new D(new Et(.075,0),g);A.position.set(.54,pe+.42,-.54),n.add(A)}function Uw(i,e,t,n,s,r,a,o,l){const c=ue("granite_runic",{color:r,roughness:.86,bumpScale:.036}),d=ue("granite_runic",{color:"#5c6a7d",roughness:.88,bumpScale:.038}),u=ue("dark_iron",{color:s,metalness:.48,roughness:.36,bumpScale:.026}),h=ue("dark_iron",{color:"#464d5c",metalness:.44,roughness:.48,bumpScale:.03}),f=ht(a,{emissive:"#f97316",emissiveIntensity:1.15}),g=ue("cloud",{color:"#e2e8f0",roughness:.95,bumpScale:.01,transparent:!0,opacity:.68,flatShading:!1}),v=ho,m=fo,p=new D(new ce(.68,.34,.58),c);p.position.set(v,pe+.17,m),p.castShadow=!0,i.add(p);const y=new D(new ce(.74,.07,.64),u);y.position.set(v,pe+.36,m),i.add(y);const w=new D(new ce(.29,.25,.05),h);w.position.set(v+.04,pe+.125,m+.285),i.add(w);const _=new D(new ce(.24,.22,.06),f);_.position.set(v+.04,pe+.11,m+.29),i.add(_),Mi(i,v-.19,pe+.24,m+.295,.07,.07,.03),Mi(i,v+.345,pe+.2,m,.03,.09,.09);const b=new D(new ce(.18,.52,.18),d);b.position.set(v+.24,pe+.26,m-.22),b.castShadow=!0,i.add(b);const T=new D(new ce(.12,.06,.12),f);T.position.set(v+.24,pe+.53,m-.22),i.add(T);for(let I=0;I<3;I++){const P=new D(new Nn(.075,0),g),F=pe+.62;P.position.set(v+.24,F+I*.16,m-.22),P.userData.smokeBaseX=v+.24,P.userData.smokeBaseY=F,P.userData.smokeBaseZ=m-.22,P.userData.smokePhase=I*.33,i.add(P),l.push(P)}or(i,o,v-.34,pe,m+.42,.42,s,a,1.5,.2);const x=new D(new ce(.2,.46,.2),d);x.position.set(-.64,pe+.23,-.6),x.castShadow=!0,e.add(x);const E=new D(new ce(.2,.44,.2),d);E.position.set(.4,pe+.22,-.54),E.castShadow=!0,e.add(E);const M=new D(new ce(.48,.28,.42),c);M.position.set(v,pe+.52,m-.04),M.castShadow=!0,t.add(M);const S=new D(new ce(.28,.24,.28),u);S.position.set(v,pe+.74,m-.04),S.castShadow=!0,t.add(S);const A=new D(new ce(.18,.52,.18),u);A.position.set(-.58,pe+.26,.3),A.castShadow=!0,n.add(A)}function Ow(i,e,t,n,s){const r=e==="orcs"?"dark_iron":e==="dwarves"?"granite_runic":"marble_masonry",a=e==="orcs"||e==="dwarves"?"dark_iron":"roof_shingles",o=ue(r,{color:e==="orcs"?"#4f4859":e==="dwarves"?"#69778a":t,roughness:e==="orcs"?.62:.86,metalness:e==="orcs"?.32:0,bumpScale:e==="orcs"||e==="dwarves"?.036:.028}),l=ue(a,{color:n,roughness:e==="dwarves"?.42:.76,metalness:e==="dwarves"?.44:0,bumpScale:.026,flatShading:!0}),c=ht(s,{metalness:.48,roughness:.36}),d=.16,u=.84,h=pe+d*.5,f=new ce(1.68,d,.09),g=new ce(.76,d,.09),v=new D(f,o);v.position.set(0,h,-u),v.castShadow=!0,i.add(v);const m=new D(f,o);m.rotation.y=Math.PI/2,m.position.set(-u,h,0),m.castShadow=!0,i.add(m);const p=new D(g,o);p.position.set(-.46,h,u),p.castShadow=!0,i.add(p);const y=new D(g,o);y.rotation.y=Math.PI/2,y.position.set(u,h,-.46),y.castShadow=!0,i.add(y);const w=new ce(.18,.24,.18),_=new St(.14,.14,4),b=[[-u,-u],[u,-u],[-u,u]];for(const[x,E]of b){const M=new D(w,o);M.position.set(x,pe+.12,E),M.castShadow=!0,i.add(M);const S=new D(_,l);S.position.set(x,pe+.31,E),S.rotation.y=Math.PI/4,i.add(S)}const T=[[-.08,u],[u,-.08]];for(const[x,E]of T){const M=new D(new ce(.13,.22,.13),o);M.position.set(x,pe+.11,E),M.castShadow=!0,i.add(M);const S=new D(new Et(.055,0),c);S.position.set(x,pe+.26,E),i.add(S)}}const Nw=new Nn(.55,1);function Kn(i,e,t){const n=Math.sin(i*127.1+e*311.7+t*74.7)*43758.5453123;return n-Math.floor(n)}function Fw(i,e,t){const n=new $e,s=1.28+(Kn(i,e,1)-.5)*.22,r=Kn(i,e,2)*Math.PI*2,a=ue("cloud",{color:"#ffffff",roughness:.96,metalness:0,bumpScale:.012,flatShading:!1}),o=ue("cloud",{color:"#dbe7f5",roughness:.96,metalness:0,bumpScale:.012,flatShading:!1}),l=4+(Kn(i,e,3)>.5?1:0);for(let c=0;c<l;c++){const d=c===0,u=c/Math.max(l-1,1)*Math.PI*2+Kn(i,e,10+c)*.8,h=d?0:.42+Kn(i,e,20+c)*.28,f=d?1.15+Kn(i,e,30)*.25:.68+Kn(i,e,31+c)*.35,g=new D(Nw,d||c%2===0?a:o);g.position.set(Math.cos(u)*h,d?.1:(Kn(i,e,40+c)-.5)*.16,Math.sin(u)*h),g.scale.set(f*1.15,f*.68,f*1.08),g.rotation.set(Kn(i,e,50+c)*Math.PI,Kn(i,e,60+c)*Math.PI,0),g.castShadow=!1,g.receiveShadow=!1,n.add(g)}return n.position.set(t.x,s,t.z),{group:n,baseY:s,phase:r,baseX:t.x,baseZ:t.z}}const Bw="/assets/www/".replace(/\/?$/,"/"),Dt=i=>`${Bw}sprites/${i}`,os={humans_warrior:Dt("humans_warrior.svg"),humans_defender:Dt("humans_defender.svg"),humans_archer:Dt("humans_archer.svg"),humans_rider:Dt("humans_rider.svg"),humans_catapult:Dt("humans_catapult.svg"),humans_rohirrim_knight:Dt("humans_rohirrim_knight.svg"),orcs_warrior:Dt("orcs_warrior.svg"),orcs_defender:Dt("orcs_defender.svg"),orcs_archer:Dt("orcs_archer.svg"),orcs_rider:Dt("orcs_rider.svg"),orcs_catapult:Dt("orcs_catapult.svg"),orcs_uruk_berserker:Dt("orcs_uruk_berserker.svg"),elves_warrior:Dt("elves_warrior.svg"),elves_defender:Dt("elves_defender.svg"),elves_archer:Dt("elves_archer.svg"),elves_rider:Dt("elves_rider.svg"),elves_catapult:Dt("elves_catapult.svg"),elves_elven_sentinel:Dt("elves_elven_sentinel.svg"),dwarves_warrior:Dt("dwarves_warrior.svg"),dwarves_defender:Dt("dwarves_defender.svg"),dwarves_archer:Dt("dwarves_archer.svg"),dwarves_rider:Dt("dwarves_rider.svg"),dwarves_catapult:Dt("dwarves_catapult.svg"),dwarves_ironbreaker:Dt("dwarves_ironbreaker.svg")},Hw={rohirrim_knight:os.humans_rohirrim_knight,uruk_berserker:os.orcs_uruk_berserker,elven_sentinel:os.elves_elven_sentinel,ironbreaker:os.dwarves_ironbreaker};function wc(i,e){const t=`${e}_${i}`,n=os[t];if(n)return n;const s=Hw[i];return s||(os[`${e}_warrior`]??os.humans_warrior)}const Li=1.56,zw={dwarves:.78,humans:1,elves:1.06,orcs:1.02},Gw={dwarves:1.08,humans:1,elves:.94,orcs:1.05};function Ph(i,e="humans"){const t=zw[e],n=Gw[e];switch(i){case"dragon":return{width:2,height:1.95,shadowScale:1.24};case"watchtower":return{width:1.45,height:2.05,shadowScale:1.12};case"uruk_berserker":{const s=Li*1.24;return{width:s*1.04,height:s,shadowScale:1.12}}case"rohirrim_knight":{const s=Li*1.24;return{width:s*1.05,height:s,shadowScale:1.22}}case"rider":{const s=e==="humans"||e==="dwarves"?1.18:1.16,r=Li*t*s;return{width:r*(e==="dwarves"?1.13:e==="elves"?1:1.06),height:r,shadowScale:e==="dwarves"?1.12:1.2}}case"catapult":{const s=e==="dwarves"?1.38:1.54;return{width:s*1.22,height:s,shadowScale:1.24}}case"ironbreaker":{const s=Li*t*1.04;return{width:s*1.11,height:s,shadowScale:1.05}}case"elven_sentinel":{const s=Li*t*1.03;return{width:s*.94,height:s,shadowScale:1}}case"defender":{const s=Li*t;return{width:s*(n*1.03),height:s,shadowScale:1.03}}case"archer":{const s=Li*t*.99;return{width:s*n,height:s,shadowScale:.98}}case"warrior":default:{const s=Li*t;return{width:s*n,height:s,shadowScale:1}}}}function uu(i,e="humans"){return Ph(i,e).height}const Vw=new Am,hu=new Map;function Ww(i){let e=hu.get(i);return e||(e=Vw.load(i),e.colorSpace=en,e.minFilter=gi,e.magFilter=On,e.generateMipmaps=!0,e.anisotropy=4,hu.set(i,e)),e}const Lh=new Oi(.46,20);Lh.rotateX(-Math.PI/2);const $w=new et(.39,.43,.044,18),Dh=new pn(.45,.58,28);Dh.rotateX(-Math.PI/2);const kh=new pn(.58,.69,24);kh.rotateX(-Math.PI/2);const Xw=new Et(.11,0),Uh=new hr(.145,.024,6,16);Uh.rotateX(Math.PI/2);const qw=new ut({color:"#0b1220",transparent:!0,opacity:.34,depthWrite:!1}),Kl=new xe("#ffffff"),fu=new xe("#6e788a"),Yw=new xe("#5c6573"),Kw=new xe("#7c8696"),Oh=new et(.18,.24,.68,6);Oh.rotateX(Math.PI/2);const jw=new ce(.24,.12,.56),Zw=new et(.11,.16,.42,6),Jw=new ce(.24,.2,.36),Qw=new ce(.19,.08,.28),pu=new St(.048,.28,4),mu=new Et(.042,0),e1=new St(.06,.18,4),Nh=new St(.15,.56,5);Nh.rotateX(-Math.PI/2);const t1=new Et(.11,0),n1=new ce(.78,.06,.08),i1=new ce(.56,.032,.48),s1=new ce(.52,.028,.36),gu=new St(.055,.2,4),r1=new ce(.76,.2,.76),a1=new ce(.16,.72,.16),o1=new ce(.54,1.18,.54),l1=new ce(.08,.24,.04),c1=new ce(.6,.12,.6),d1=new ce(.62,.055,.62),u1=new ce(.74,.15,.74),h1=new ce(.16,.16,.16),f1=new St(.055,.14,4),p1=new ce(.24,.48,.03),m1=new ce(.06,.42,.036),g1=new et(.22,.13,.16,6),Fh=new hr(.21,.028,5,12);Fh.rotateX(Math.PI/2);const v1=new St(.17,.42,6),y1=new Et(.12,0);function Tn(i,e,t){const n=new us({color:e,flatShading:!0,roughness:t?.roughness??.78,metalness:t?.metalness??.08,emissive:t?.emissive?new xe(t.emissive):new xe(0),emissiveIntensity:t?.emissiveIntensity??0});return i.push({material:n,originalColor:n.color.clone(),originalEmissive:n.emissive.clone(),originalEmissiveIntensity:n.emissiveIntensity}),n}function _1(i,e){const t=new $e;t.position.y=.68,t.rotation.y=Math.PI*.22,i.add(t);const n=Tn(e,"#b91c1c",{roughness:.62,metalness:.18}),s=Tn(e,"#dc2626",{roughness:.68,metalness:.06,emissive:"#991b1b",emissiveIntensity:.16}),r=Tn(e,"#d97706",{roughness:.42,metalness:.48,emissive:"#b45309",emissiveIntensity:.12}),a=Tn(e,"#292524",{roughness:.5,metalness:.35}),o=Tn(e,"#ff7a1a",{roughness:.3,metalness:0,emissive:"#ff4500",emissiveIntensity:.95}),l=Tn(e,"#fef08a",{roughness:.2,metalness:0,emissive:"#f59e0b",emissiveIntensity:1.25}),c=new D(Oh,n);c.position.set(0,.18,0),c.rotation.x=-.18,t.add(c);const d=new D(jw,o);d.position.set(0,.04,.03),d.rotation.x=-.18,t.add(d);for(let S=0;S<3;S++){const A=new D(e1,r);A.position.set(0,.37-S*.03,.16-S*.2),A.rotation.x=-.35,t.add(A)}const u=new D(gu,a);u.position.set(-.15,-.05,.12),u.rotation.set(Math.PI+.35,0,.18),t.add(u);const h=new D(gu,a);h.position.set(.15,-.05,.12),h.rotation.set(Math.PI+.35,0,-.18),t.add(h);const f=new D(Zw,n);f.position.set(0,.44,.32),f.rotation.x=.48,t.add(f);const g=new $e;g.position.set(0,.62,.48),g.rotation.x=.08,t.add(g);const v=new D(Jw,n);g.add(v);const m=new D(Qw,r);m.position.set(0,-.11,.05),m.rotation.x=.14,g.add(m);const p=new D(pu,a);p.position.set(-.11,.16,-.12),p.rotation.set(-.75,0,.34),g.add(p);const y=new D(pu,a);y.position.set(.11,.16,-.12),y.rotation.set(-.75,0,-.34),g.add(y);const w=new D(mu,l);w.position.set(-.12,.04,.1),g.add(w);const _=new D(mu,l);_.position.set(.12,.04,.1),g.add(_);const b=new D(Nh,n);b.position.set(0,.05,-.52),b.rotation.x=.28,t.add(b);const T=new D(t1,o);T.position.set(0,-.02,-.82),T.scale.set(.85,.6,1.35),t.add(T);const x=S=>{const A=new $e;A.position.set(S*.18,.28,.08);const I=new D(n1,r);I.position.set(S*.38,.12,.06),I.rotation.z=S*.28,I.rotation.y=-S*.16,A.add(I);const P=new D(i1,s);P.position.set(S*.32,.06,-.14),P.rotation.z=S*.22,P.rotation.y=-S*.14,A.add(P);const F=new D(s1,s);return F.position.set(S*.72,.18,-.2),F.rotation.z=S*.42,F.rotation.y=-S*.26,A.add(F),t.add(A),A},E=x(-1),M=x(1);return{root:t,wingLeft:E,wingRight:M}}function w1(i,e,t){const n=new $e;i.add(n);const s=Tn(e,"#e2e8f0",{roughness:.84,metalness:.04}),r=Tn(e,"#cbd5e1",{roughness:.86,metalness:.04}),a=Tn(e,"#334155",{roughness:.76,metalness:.15}),o=Tn(e,"#1d4ed8",{roughness:.62,metalness:.08,emissive:"#1e40af",emissiveIntensity:.14}),l=Tn(e,"#f5c542",{roughness:.34,metalness:.56,emissive:"#ca8a04",emissiveIntensity:.22}),c=Tn(e,"#f97316",{roughness:.25,metalness:0,emissive:"#ea580c",emissiveIntensity:1.05}),d=Tn(e,"#fef08a",{roughness:.2,metalness:0,emissive:"#facc15",emissiveIntensity:1.35}),u=new D(r1,r);u.position.y=.1,n.add(u);const h=[[-.27,-.27],[.27,-.27],[-.27,.27],[.27,.27]];for(const[M,S]of h){const A=new D(a1,r);A.position.set(M,.46,S),n.add(A)}const f=new D(o1,s);f.position.y=.79,n.add(f);const g=[[0,.275,0],[0,-.275,0],[.275,0,Math.PI/2],[-.275,0,Math.PI/2]];for(const[M,S,A]of g){const I=new D(l1,a);I.position.set(M,.92,S),I.rotation.y=A,n.add(I)}const v=new D(c1,o);v.position.y=1.3,n.add(v);const m=new D(d1,l);m.position.y=1.22,n.add(m);const p=new D(u1,s);p.position.y=1.44,n.add(p);const y=[[-.29,-.29,!0],[.29,-.29,!0],[-.29,.29,!0],[.29,.29,!0],[0,-.29,!1],[0,.29,!1],[-.29,0,!1],[.29,0,!1]];for(const[M,S,A]of y){const I=new D(h1,s);if(I.position.set(M,1.59,S),n.add(I),A){const P=new D(f1,l);P.position.set(M,1.74,S),n.add(P)}}const w=(M,S,A,I)=>{const P=new $e;P.position.set(M,1.32,S),P.rotation.y=A,P.userData.bannerPhase=I,P.userData.baseRotY=A;const F=new D(p1,o);F.position.y=-.24,P.add(F);const H=new D(m1,l);H.position.y=-.23,P.add(H),n.add(P),t.push(P)};w(0,.3,0,.4),w(.3,0,Math.PI/2,1.7);const _=new D(g1,a);_.position.y=1.58,n.add(_);const b=new D(Fh,l);b.position.y=1.65,n.add(b);const T=new $e;T.position.y=1.66;const x=new D(v1,c);x.position.y=.21,T.add(x);const E=new D(y1,d);return E.position.y=.16,E.scale.set(.85,1.45,.85),T.add(E),n.add(T),{root:n,flameMesh:T}}function M1(i){return i==="orcs"?"#ef4444":nt[i].palette.primary}function La(i,e){i.onBeforeRender=(t,n,s)=>{if(!s.isOrthographicCamera)return;const r=s.matrixWorld.elements,a=r[8],o=r[9],l=r[10],c=Math.hypot(a,o,l)||1,d=e/c;i.matrixWorld.elements[12]+=a*d,i.matrixWorld.elements[13]+=o*d,i.matrixWorld.elements[14]+=l*d}}function S1(i,e,t){const n=new $e,s=M1(e),r=Ph(i,e),a=[],o=new D(Lh,qw);o.position.y=.014,o.scale.setScalar(r.shadowScale),o.renderOrder=2,n.add(o);const l=new us({color:s,flatShading:!0,roughness:.68,metalness:.08,emissive:new xe(s),emissiveIntensity:.16});a.push({material:l,originalColor:l.color.clone(),originalEmissive:l.emissive.clone(),originalEmissiveIntensity:l.emissiveIntensity});const c=new D($w,l);c.position.y=.026,c.scale.set(r.shadowScale*.94,1,r.shadowScale*.94),c.receiveShadow=!0,c.renderOrder=3,n.add(c);const d=new ut({color:"#ffffff",side:gt,transparent:!0,opacity:.94,depthWrite:!1}),u=new D(Dh,d);u.position.y=.038,u.visible=!1,u.renderOrder=4,n.add(u);let h=null;if(t?.canPromote){const I=new ut({color:"#fde047",side:gt,transparent:!0,opacity:.9,depthWrite:!1});h=new D(kh,I),h.position.y=.042,h.renderOrder=5,n.add(h)}const f=new $e;f.position.y=.055,n.add(f);const g=[],v=i==="dragon"||i==="watchtower";let m,p,y,w,_,b,T,x;if(v)if(m=new Cr({transparent:!0,opacity:0,depthWrite:!1}),p=new Cr({transparent:!0,opacity:0,depthWrite:!1}),y=new xa(m),y.visible=!1,w=new xa(p),w.visible=!1,i==="dragon"){const I=_1(f,a);_=I.root,b=I.wingLeft,T=I.wingRight}else{const I=w1(f,a,g);_=I.root,x=I.flameMesh}else{const I=wc(i,e),P=Ww(I);m=new Cr({map:P,color:"#ffffff",transparent:!0,opacity:1,alphaTest:.08,depthTest:!0,depthWrite:!1}),y=new xa(m),y.center.set(.5,.04),y.scale.set(r.width,r.height,1),y.renderOrder=40,La(y,.88),f.add(y),p=new Cr({map:P,color:"#ffffff",transparent:!0,opacity:.78,alphaTest:.08,blending:qa,depthTest:!0,depthWrite:!1}),w=new xa(p),w.center.set(.5,.04),w.scale.set(r.width,r.height,1),w.visible=!1,w.renderOrder=41,La(w,.9),f.add(w)}let E=null;if(t?.isVeteran){const I=new $e,P=new us({color:"#facc15",flatShading:!0,metalness:.58,roughness:.28,emissive:new xe("#eab308"),emissiveIntensity:.62});a.push({material:P,originalColor:P.color.clone(),originalEmissive:P.emissive.clone(),originalEmissiveIntensity:P.emissiveIntensity});const F=new D(Xw,P);F.renderOrder=42,La(F,.9),I.add(F);const H=new D(Uh,P);H.position.y=-.04,H.renderOrder=42,La(H,.9),I.add(H),I.position.y=r.height+.1,f.add(I),E=I}const M=Kl.clone(),A={group:n,bodyGroup:f,baseDisc:c,baseDiscMat:l,readyRing:u,readyRingMat:d,veteranCrown:E,promoteRing:h,flashMaterials:[l],bodyMaterials:a,banners:g,unitHeight:r.height,sprite:y,spriteMat:m,flashSprite:w,flashSpriteMat:p,shadowDisc:o,baseScaleX:r.width,baseScaleY:r.height,restingSpriteColor:M,restingSpriteOpacity:1,isProcedural3D:v,proceduralRoot:_,wingLeft:b,wingRight:T,flameMesh:x,setHitFlash:(I,P="#ffffff")=>{if(v){if(I){const F=P.toLowerCase()==="#ffffff"||P.toLowerCase()==="white",H=F?"#ffffff":P;for(const $ of a)$.material.emissive.set(H),$.material.emissiveIntensity=F?.95:.82}else A.lastVisualOpts&&Qa(A,A.lastVisualOpts);return}I?(P.toLowerCase()==="#ffffff"||P.toLowerCase()==="white"?(m.color.setRGB(2.2,2.2,2.2),p.color.set("#ffffff"),p.opacity=.82):(m.color.setRGB(2.4,.65,.65),p.color.set(P),p.opacity=.72),m.opacity=1,w.scale.copy(y.scale),w.visible=!0):(m.color.copy(A.restingSpriteColor),m.opacity=A.restingSpriteOpacity,w.visible=!1)}};return Qa(A,{isHumanOwner:!!t?.isHumanOwner,actedThisTurn:!!t?.actedThisTurn,canCapture:!!t?.canCapture,canExploreRuins:!!t?.canExploreRuins}),A}function Qa(i,e){i.lastVisualOpts={...e};const t=i.bodyMaterials[0];if(e.isHumanOwner&&e.actedThisTurn){if(i.isProcedural3D)for(const n of i.bodyMaterials)n.material.color.copy(n.originalColor).lerp(Kw,.62).multiplyScalar(.64),n.material.emissive.copy(n.originalEmissive),n.material.emissiveIntensity=n.originalEmissiveIntensity>.5?.2:0;else i.restingSpriteColor.copy(fu),i.restingSpriteOpacity=.92,i.spriteMat.color.copy(fu),i.spriteMat.opacity=.92;i.baseDiscMat.color.copy(Yw),i.baseDiscMat.emissiveIntensity=0,i.baseDiscMat.opacity=.72,i.baseDiscMat.transparent=!0,i.readyRing.visible=!1,i.bodyGroup.scale.set(.96,.95,.96);return}if(i.isProcedural3D)for(const n of i.bodyMaterials)n.material.color.copy(n.originalColor),e.isHumanOwner&&!e.actedThisTurn?n.originalEmissiveIntensity>0?(n.material.emissive.copy(n.originalEmissive),n.material.emissiveIntensity=Math.max(n.originalEmissiveIntensity,.12)):(n.material.emissive.copy(n.originalColor),n.material.emissiveIntensity=.08):(n.material.emissive.copy(n.originalEmissive),n.material.emissiveIntensity=n.originalEmissiveIntensity);else i.restingSpriteColor.copy(Kl),i.restingSpriteOpacity=1,i.spriteMat.color.copy(Kl),i.spriteMat.opacity=1;if(t&&(i.baseDiscMat.color.copy(t.originalColor),i.baseDiscMat.emissive.copy(t.originalEmissive),i.baseDiscMat.emissiveIntensity=e.isHumanOwner?.24:.14),i.baseDiscMat.opacity=1,i.baseDiscMat.transparent=!1,i.bodyGroup.scale.set(1,1,1),e.isHumanOwner&&!e.actedThisTurn){i.readyRing.visible=!0;const n=!!(e.canCapture||e.canExploreRuins);i.readyRingMat.color.set(n?"#facc15":"#ffffff")}else i.readyRing.visible=!1}function jo(i){i.spriteMat.dispose(),i.flashSpriteMat.dispose(),i.readyRingMat.dispose();for(const e of i.bodyMaterials)e.material.dispose();if(i.promoteRing&&i.promoteRing instanceof D){const e=i.promoteRing.material;Array.isArray(e)?e.forEach(t=>t.dispose()):e.dispose()}}const b1=.033;function Mn(i,e){return`${i},${e}`}function jn(i){for(;i.children.length>0;)i.remove(i.children[0])}function x1(i){return i==="orcs"?"#ef4444":nt[i].palette.primary}class Oe{boardRoot=new $e;fxGroup=new $e;skirtGroup=new $e;tilesGroup=new $e;bordersGroup=new $e;citiesGroup=new $e;unitsGroup=new $e;cloudsGroup=new $e;overlaysGroup=new $e;static UNIT_HIT_GEO=new et(.5,.54,1.65,10);static UNIT_HIT_MAT=new ut({visible:!1});static BORDER_RIBBON_H=.055;static BORDER_RIBBON_THICK=.12;static BORDER_H_GEO=new ce(Xs-.02,Oe.BORDER_RIBBON_H,Oe.BORDER_RIBBON_THICK);static BORDER_V_GEO=new ce(Oe.BORDER_RIBBON_THICK,Oe.BORDER_RIBBON_H,Xs-.02);static MOVE_FILL_GEO=(()=>{const e=new Oi(.42,24);return e.rotateX(-Math.PI/2),e})();static MOVE_FILL_COMPACT_GEO=(()=>{const e=new Oi(.35,24);return e.rotateX(-Math.PI/2),e})();static MOVE_RING_GEO=(()=>{const e=new pn(.42,.54,28);return e.rotateX(-Math.PI/2),e})();static MOVE_RING_COMPACT_GEO=(()=>{const e=new pn(.35,.46,28);return e.rotateX(-Math.PI/2),e})();static MOVE_DOT_GEO=(()=>{const e=new Oi(.17,18);return e.rotateX(-Math.PI/2),e})();static MOVE_FILL_MAT=new ut({color:"#38bdf8",side:gt,transparent:!0,opacity:.72,depthTest:!1,depthWrite:!1});static MOVE_RING_MAT=new ut({color:"#e0f2fe",side:gt,transparent:!0,opacity:.94,depthTest:!1,depthWrite:!1});static MOVE_DOT_MAT=new ut({color:"#e0f2fe",side:gt,transparent:!0,opacity:.96,depthTest:!1,depthWrite:!1});static SUPERPOWER_FILL_GEO=(()=>{const e=new Oi(.48,24);return e.rotateX(-Math.PI/2),e})();static SUPERPOWER_FILL_COMPACT_GEO=(()=>{const e=new Oi(.38,24);return e.rotateX(-Math.PI/2),e})();static SUPERPOWER_RING_GEO=(()=>{const e=new pn(.48,.64,28);return e.rotateX(-Math.PI/2),e})();static SUPERPOWER_RING_COMPACT_GEO=(()=>{const e=new pn(.38,.52,28);return e.rotateX(-Math.PI/2),e})();static VOLCANO_FILL_MAT=new ut({color:"#ff5a1f",side:gt,transparent:!0,opacity:.44,depthTest:!1,depthWrite:!1});static VOLCANO_RING_MAT=new ut({color:"#ff5a1f",side:gt,transparent:!0,opacity:.96,depthTest:!1,depthWrite:!1});static VOLCANO_DOT_MAT=new ut({color:"#fde047",side:gt,transparent:!0,opacity:.95,depthTest:!1,depthWrite:!1});static TOWER_FILL_MAT=new ut({color:"#f5c542",side:gt,transparent:!0,opacity:.4,depthTest:!1,depthWrite:!1});static TOWER_RING_MAT=new ut({color:"#f5c542",side:gt,transparent:!0,opacity:.96,depthTest:!1,depthWrite:!1});static TOWER_DOT_MAT=new ut({color:"#fef9c3",side:gt,transparent:!0,opacity:.95,depthTest:!1,depthWrite:!1});static ATTACK_RING_GEO=(()=>{const e=new pn(.62,.84,24);return e.rotateX(-Math.PI/2),e})();static ATTACK_RING_MAT=new ut({color:"#f43f5e",side:gt,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1});static ATTACK_DIAMOND_GEO=new Et(.16,0);static ATTACK_DIAMOND_MAT=new ut({color:"#fb7185"});static LETHAL_OUTER_RING_GEO=(()=>{const e=new pn(.66,.88,28);return e.rotateX(-Math.PI/2),e})();static LETHAL_OUTER_RING_MAT=new ut({color:"#ef4444",side:gt,transparent:!0,opacity:.94,depthTest:!1,depthWrite:!1});static LETHAL_INNER_RING_GEO=(()=>{const e=new pn(.44,.58,28);return e.rotateX(-Math.PI/2),e})();static LETHAL_INNER_RING_MAT=new ut({color:"#fbbf24",side:gt,transparent:!0,opacity:.95,depthTest:!1,depthWrite:!1});static LETHAL_CORE_GEO=new Et(.21,0);static LETHAL_CORE_MAT=new ut({color:"#dc2626"});static LETHAL_GOLD_MAT=new ut({color:"#facc15"});static LETHAL_HALO_GEO=(()=>{const e=new hr(.32,.032,6,16);return e.rotateX(Math.PI/2),e})();static LETHAL_SPIKE_X_GEO=new ce(.22,.045,.045);static LETHAL_SPIKE_Z_GEO=new ce(.045,.045,.22);static LETHAL_CROWN_GEO=new Et(.085,0);mapSize=0;initialized=!1;lastBorderFingerprint=null;tileEntries=new Map;cityEntries=new Map;unitEntries=new Map;tileHitMeshes=[];unitHitMeshes=[];moveTargetHitMeshes=[];superpowerTargetHitMeshes=[];animatedTrees=[];waterMeshes=[];windmillBlades=[];cityBanners=[];unitBanners=[];tileSmokePuffs=[];citySmokePuffs=[];floatingMotes=[];tilesByCoord=new Map;cityCoords=new Set;mountainCoords=new Set;unitWorldCoords=new Map;unitHeightsByCoord=new Map;unitObjects=new Map;unitBaseMeta=new Map;cityObjects=new Map;cloudObjects=new Map;animatingUnitIds=new Set;animatingCloudKeys=new Set;hoverBracket;selectedRing;moveOverlayGroup=new $e;attackOverlayGroup=new $e;superpowerOverlayGroup=new $e;constructor(e){this.boardRoot.add(this.skirtGroup,this.tilesGroup,this.bordersGroup,this.citiesGroup,this.unitsGroup,this.cloudsGroup,this.overlaysGroup,this.fxGroup),e.add(this.boardRoot),this.hoverBracket=this.buildHoverBracket(),this.hoverBracket.visible=!1,this.overlaysGroup.add(this.hoverBracket);const t=new ut({color:"#facc15",side:gt,transparent:!0,opacity:.92,depthTest:!1,depthWrite:!1});this.selectedRing=new D(new pn(.64,.8,24),t),this.selectedRing.rotation.x=-Math.PI/2,this.selectedRing.renderOrder=31,this.selectedRing.visible=!1,this.overlaysGroup.add(this.selectedRing),this.overlaysGroup.add(this.moveOverlayGroup,this.attackOverlayGroup,this.superpowerOverlayGroup)}buildHoverBracket(){const e=new $e,t=new ut({color:"#fef9c3",transparent:!0,opacity:.9}),n=.92,s=.44,r=.07,a=.03,o=[[-n,-n,1,1],[n,-n,-1,1],[-n,n,1,-1],[n,n,-1,-1]];for(const[l,c,d,u]of o){const h=new D(new ce(s,a,r),t);h.position.set(l+d*s/2,0,c),e.add(h);const f=new D(new ce(r,a,s),t);f.position.set(l,0,c+u*s/2),e.add(f)}return e}getMapSize(){return this.mapSize}getTileHitMeshes(){return this.tileHitMeshes}getUnitHitMeshes(){return this.unitHitMeshes}getMoveTargetHitMeshes(){return this.superpowerTargetHitMeshes.length===0?this.moveTargetHitMeshes:this.moveTargetHitMeshes.length===0?this.superpowerTargetHitMeshes:[...this.moveTargetHitMeshes,...this.superpowerTargetHitMeshes]}getUnitObject(e){return this.unitObjects.get(e)}getCityObject(e){return this.cityObjects.get(e)}getCloudObject(e,t){return this.cloudObjects.get(Mn(e,t))}markUnitAnimating(e,t){t?this.animatingUnitIds.add(e):this.animatingUnitIds.delete(e)}markCloudAnimating(e,t,n){const s=Mn(e,t);n?this.animatingCloudKeys.add(s):this.animatingCloudKeys.delete(s)}removeCloudImmediate(e,t){const n=Mn(e,t);this.animatingCloudKeys.delete(n);const s=this.cloudObjects.get(n);s&&(this.disposeCloudFadeMaterials(s),this.cloudsGroup.remove(s.group),this.cloudObjects.delete(n))}revealTilesUnderClouds(e,t,n){if(n.length===0||!this.initialized||this.mapSize!==e.mapSize)return;const r=(e.players.find(o=>o.id===t)??e.players.find(o=>o.isHuman)??e.players[0])?.revealedTiles??[];let a=!1;for(const o of n){if(o.x<0||o.y<0||o.x>=e.mapSize||o.y>=e.mapSize)continue;const l=Ke(o.x,o.y,e.mapSize);if(!!!r[l])continue;const d=e.tiles[l],u=Mn(o.x,o.y);this.tilesByCoord.set(u,d),d.terrain==="mountain"&&!d.isCityCenter&&!d.hasVillage&&this.mountainCoords.add(u);const h=he(e,o.x,o.y-1),f=he(e,o.x,o.y+1),g=he(e,o.x-1,o.y),v=he(e,o.x+1,o.y),m={northWater:h?.terrain==="water",southWater:f?.terrain==="water",westWater:g?.terrain==="water",eastWater:v?.terrain==="water",northRoad:!!(h&&(h.hasRoad||h.isCityCenter)),southRoad:!!(f&&(f.hasRoad||f.isCityCenter)),westRoad:!!(g&&(g.hasRoad||g.isCityCenter)),eastRoad:!!(v&&(v.hasRoad||v.isCityCenter))},p=(m.northWater?1:0)|(m.southWater?2:0)|(m.westWater?4:0)|(m.eastWater?8:0)|(m.northRoad?16:0)|(m.southRoad?32:0)|(m.westRoad?64:0)|(m.eastRoad?128:0),y=d.cityId?e.cities[d.cityId]:void 0,w=`${d.terrain}|${d.biome}|${d.resource??""}|${d.improvement??""}|${d.hasRoad?1:0}|${d.hasVillage?1:0}|${d.isCityCenter?1:0}|${d.cityId??""}|${y?.level??""}|${y?.ownerId??""}|${y?.hasWalls?1:0}|${y?.parks??0}|1|${p}`,_=this.tileEntries.get(u);if(_&&_.fingerprint===w)continue;_&&(this.tilesGroup.remove(_.group),_.built.waterMesh&&_.built.waterMesh.geometry.dispose());const b=fi(d,e.mapSize,m,!0);this.tilesGroup.add(b.group),this.tileEntries.set(u,{fingerprint:w,group:b.group,hitMesh:b.hitMesh,built:b}),a=!0}if(a){this.tileHitMeshes=[],this.animatedTrees=[],this.waterMeshes=[],this.windmillBlades=[],this.floatingMotes=[],this.tileSmokePuffs=[];for(const o of this.tileEntries.values()){const l=o.built;this.tileHitMeshes.push(l.hitMesh),l.animatedTrees.length>0&&this.animatedTrees.push(...l.animatedTrees),l.waterMesh&&this.waterMeshes.push(l.waterMesh),l.windmillBlades&&this.windmillBlades.push(l.windmillBlades),l.floatingMotes.length>0&&this.floatingMotes.push(...l.floatingMotes),l.smokePuffs.length>0&&this.tileSmokePuffs.push(...l.smokePuffs)}}}disposeCloudFadeMaterials(e){const t=e.group.userData.clonedMats;if(t){for(const n of t)n.dispose();e.group.userData.clonedMats=void 0}}resetAllCachedMeshes(){for(const e of this.tileEntries.values())e.built.waterMesh&&e.built.waterMesh.geometry.dispose();jn(this.tilesGroup),this.tileEntries.clear(),this.tileHitMeshes=[],this.animatedTrees=[],this.waterMeshes=[],this.windmillBlades=[],this.floatingMotes=[],this.tileSmokePuffs=[];for(const e of this.cloudObjects.values())this.disposeCloudFadeMaterials(e);jn(this.cloudsGroup),this.cloudObjects.clear(),this.animatingCloudKeys.clear(),jn(this.bordersGroup),this.lastBorderFingerprint=null,jn(this.citiesGroup),this.cityEntries.clear(),this.cityObjects.clear(),this.cityBanners=[],this.citySmokePuffs=[];for(const e of this.unitEntries.values())jo(e.built);jn(this.unitsGroup),this.unitEntries.clear(),this.unitObjects.clear(),this.unitBaseMeta.clear(),this.unitHitMeshes=[],this.unitBanners=[],this.animatingUnitIds.clear()}syncState(e,t){const n=e.players.find(f=>f.id===t)??e.players.find(f=>f.isHuman)??e.players[0],s=n?.id??t,r=n?.revealedTiles??[];(!this.initialized||this.mapSize!==e.mapSize||this.skirtGroup.children.length===0)&&(this.resetAllCachedMeshes(),this.mapSize=e.mapSize,this.initialized=!0,jn(this.skirtGroup),this.skirtGroup.add(Iw(e.mapSize))),this.tilesByCoord.clear(),this.mountainCoords.clear();let a=!1;for(let f=0;f<e.mapSize;f++)for(let g=0;g<e.mapSize;g++){const v=Ke(g,f,e.mapSize),m=e.tiles[v],p=Mn(g,f),y=!!r[v];this.tilesByCoord.set(p,m),y&&m.terrain==="mountain"&&!m.isCityCenter&&!m.hasVillage&&this.mountainCoords.add(p);const w=he(e,g,f-1),_=he(e,g,f+1),b=he(e,g-1,f),T=he(e,g+1,f),x={northWater:w?.terrain==="water",southWater:_?.terrain==="water",westWater:b?.terrain==="water",eastWater:T?.terrain==="water",northRoad:!!(w&&(w.hasRoad||w.isCityCenter)),southRoad:!!(_&&(_.hasRoad||_.isCityCenter)),westRoad:!!(b&&(b.hasRoad||b.isCityCenter)),eastRoad:!!(T&&(T.hasRoad||T.isCityCenter))},E=(x.northWater?1:0)|(x.southWater?2:0)|(x.westWater?4:0)|(x.eastWater?8:0)|(x.northRoad?16:0)|(x.southRoad?32:0)|(x.westRoad?64:0)|(x.eastRoad?128:0),M=m.cityId?e.cities[m.cityId]:void 0,S=`${m.terrain}|${m.biome}|${m.resource??""}|${m.improvement??""}|${m.hasRoad?1:0}|${m.hasVillage?1:0}|${m.isCityCenter?1:0}|${m.cityId??""}|${M?.level??""}|${M?.ownerId??""}|${M?.hasWalls?1:0}|${M?.parks??0}|${y?1:0}|${E}`,A=this.tileEntries.get(p);if(A&&A.fingerprint===S)continue;A&&(this.tilesGroup.remove(A.group),A.built.waterMesh&&A.built.waterMesh.geometry.dispose());const I=fi(m,e.mapSize,x,y);this.tilesGroup.add(I.group),this.tileEntries.set(p,{fingerprint:S,group:I.group,hitMesh:I.hitMesh,built:I}),a=!0}if(a){this.tileHitMeshes=[],this.animatedTrees=[],this.waterMeshes=[],this.windmillBlades=[],this.floatingMotes=[],this.tileSmokePuffs=[];for(const f of this.tileEntries.values()){const g=f.built;this.tileHitMeshes.push(g.hitMesh),g.animatedTrees.length>0&&this.animatedTrees.push(...g.animatedTrees),g.waterMesh&&this.waterMeshes.push(g.waterMesh),g.windmillBlades&&this.windmillBlades.push(g.windmillBlades),g.floatingMotes.length>0&&this.floatingMotes.push(...g.floatingMotes),g.smokePuffs.length>0&&this.tileSmokePuffs.push(...g.smokePuffs)}}for(let f=0;f<e.mapSize;f++)for(let g=0;g<e.mapSize;g++){const v=Ke(g,f,e.mapSize),m=Mn(g,f);if(r[v])this.cloudObjects.has(m)&&!this.animatingCloudKeys.has(m)&&this.removeCloudImmediate(g,f);else if(!this.cloudObjects.has(m)){const p=ot(g,f,e.mapSize,0),y=Fw(g,f,p);this.cloudsGroup.add(y.group),this.cloudObjects.set(m,y)}}const o=[];for(let f=0;f<e.tiles.length;f++){if(!r[f])continue;const g=e.tiles[f].cityId;if(!g)continue;const v=e.cities[g]?.ownerId;v&&o.push(`${f}:${v}`)}const l=o.join(",");l!==this.lastBorderFingerprint&&(this.lastBorderFingerprint=l,this.rebuildTerritoryBorders(e,r)),this.cityCoords.clear();const c=new Set;let d=!1;for(const f of Object.values(e.cities)){const g=Ke(f.x,f.y,e.mapSize);if(!r[g])continue;c.add(f.id),this.cityCoords.add(Mn(f.x,f.y));const v=`${f.x}|${f.y}|${f.styleFaction}|${f.ownerId}|${f.level}|${f.isCapital?1:0}|${f.hasWalls?1:0}|${f.parks}`,m=this.cityEntries.get(f.id);if(m&&m.fingerprint===v)continue;m&&this.citiesGroup.remove(m.mesh);const p=Yl(f),y=ot(f.x,f.y,e.mapSize,ae);p.position.set(y.x,ae,y.z),this.citiesGroup.add(p),this.cityEntries.set(f.id,{fingerprint:v,mesh:p}),this.cityObjects.set(f.id,p),d=!0}for(const[f,g]of this.cityEntries)c.has(f)||(this.citiesGroup.remove(g.mesh),this.cityEntries.delete(f),this.cityObjects.delete(f),d=!0);if(d){this.cityBanners=[],this.citySmokePuffs=[];for(const f of this.cityEntries.values()){const g=f.mesh.userData.banners;g&&g.length>0&&this.cityBanners.push(...g);const v=f.mesh.userData.smokePuffs;v&&v.length>0&&this.citySmokePuffs.push(...v)}}const u=new Map;for(const f of e.players)u.set(f.id,f.faction);const h=new Set;this.unitHitMeshes=[],this.unitBanners=[],this.unitWorldCoords.clear(),this.unitHeightsByCoord.clear();for(const f of Object.values(e.units)){const g=Ke(f.x,f.y,e.mapSize);if(!r[g])continue;h.add(f.id);const v=u.get(f.ownerId)??"humans",m=f.ownerId===s,p=!!f.canCapture,y=!!f.canExploreRuins,w=m?!f.actedThisTurn&&Gr(e,f.id):!f.actedThisTurn,_=m?!w:f.actedThisTurn,b=hi(e,f.x,f.y),T=`${m?1:0}|${_?1:0}|${p?1:0}|${y?1:0}`,x=this.animatingUnitIds.has(f.id);let E=this.unitEntries.get(f.id);if(E!==void 0&&E.type===f.type&&E.faction===v&&E.isVeteran===f.isVeteran&&E.canPromote===f.canPromote&&E)E.hitMesh.userData.tileX=f.x,E.hitMesh.userData.tileY=f.y,x||(E.built.group.position.copy(b),E.built.group.visible=!0,E.built.group.scale.setScalar(1),E.built.sprite.scale.set(E.built.baseScaleX,E.built.baseScaleY,1),E.built.spriteMat.rotation=0),E.lastVisualKey!==T&&(Qa(E.built,{isHumanOwner:m,actedThisTurn:_,canCapture:p,canExploreRuins:y}),E.lastVisualKey=T);else{E&&(this.unitsGroup.remove(E.built.group),jo(E.built));const I=S1(f.type,v,{isVeteran:f.isVeteran,canPromote:f.canPromote,actedThisTurn:_,canCapture:p,canExploreRuins:y,isHumanOwner:m});I.group.position.copy(b),Qa(I,{isHumanOwner:m,actedThisTurn:_,canCapture:p,canExploreRuins:y});const P=new D(Oe.UNIT_HIT_GEO,Oe.UNIT_HIT_MAT),F=Math.max(.74,I.unitHeight/1.65);P.scale.set(1,F,1),P.position.y=I.unitHeight*.52,P.userData={tileX:f.x,tileY:f.y,unitId:f.id},I.group.add(P),this.unitsGroup.add(I.group),E={built:I,type:f.type,faction:v,isVeteran:f.isVeteran,canPromote:f.canPromote,hitMesh:P,lastVisualKey:T},this.unitEntries.set(f.id,E),this.unitObjects.set(f.id,I)}this.unitHitMeshes.push(E.hitMesh);const S=this.unitBaseMeta.get(f.id);this.unitBaseMeta.set(f.id,{isHumanOwner:m,exhausted:_,canCapture:p,canExploreRuins:y,phase:S?.phase??(f.x*1.3+f.y*2.1)%(Math.PI*2)}),E.built.banners.length>0&&this.unitBanners.push(...E.built.banners);const A=Mn(f.x,f.y);this.unitWorldCoords.set(A,b.clone()),this.unitHeightsByCoord.set(A,E.built.unitHeight)}for(const[f,g]of this.unitEntries)!h.has(f)&&!this.animatingUnitIds.has(f)&&(this.unitsGroup.remove(g.built.group),jo(g.built),this.unitEntries.delete(f),this.unitObjects.delete(f),this.unitBaseMeta.delete(f))}rebuildTerritoryBorders(e,t){jn(this.bordersGroup);const n=(a,o)=>{const l=he(e,a,o);return!l||!l.cityId?null:e.cities[l.cityId]?.ownerId??null},s=new Map;for(const a of e.players)s.set(a.id,a.faction);const r=Xs*.5-.06;for(let a=0;a<e.mapSize;a++)for(let o=0;o<e.mapSize;o++){const l=Ke(o,a,e.mapSize);if(!t[l])continue;const c=n(o,a);if(!c)continue;const d=s.get(c);if(!d)continue;const u=x1(d),h=ht(u,{roughness:.48,emissive:u,emissiveIntensity:.35}),f=ot(o,a,e.mapSize,ae+.032);if(n(o,a-1)!==c){const g=new D(Oe.BORDER_H_GEO,h);g.position.set(f.x,f.y,f.z-r),this.bordersGroup.add(g)}if(n(o,a+1)!==c){const g=new D(Oe.BORDER_H_GEO,h);g.position.set(f.x,f.y,f.z+r),this.bordersGroup.add(g)}if(n(o-1,a)!==c){const g=new D(Oe.BORDER_V_GEO,h);g.position.set(f.x-r,f.y,f.z),this.bordersGroup.add(g)}if(n(o+1,a)!==c){const g=new D(Oe.BORDER_V_GEO,h);g.position.set(f.x+r,f.y,f.z),this.bordersGroup.add(g)}}}setHoverTile(e){if(!e){this.hoverBracket.visible=!1;return}const t=ot(e.x,e.y,this.mapSize,ae+.04);this.hoverBracket.position.copy(t),this.hoverBracket.visible=!0}getMoveOverlayY(e){return e?e.terrain==="mountain"&&!e.isCityCenter&&!e.hasVillage?ae+ls+.04:e.isCityCenter||e.hasVillage?ae+pe+.04:e.improvement!==null||e.resource!==null?ae+.36:ae+.05:ae+.05}setSelectedTile(e){if(!e){this.selectedRing.visible=!1;return}const t=Mn(e.x,e.y),n=this.unitWorldCoords.get(t);if(n){this.selectedRing.position.set(n.x,n.y+.03,n.z),this.selectedRing.visible=!0;return}if(this.mountainCoords.has(t)){const a=ot(e.x,e.y,this.mapSize,ae+ls+.03);this.selectedRing.position.set(a.x+rs,a.y,a.z+as),this.selectedRing.visible=!0;return}const s=this.tilesByCoord.get(t);if(this.cityCoords.has(t)||s?.hasVillage){const a=ot(e.x,e.y,this.mapSize,ae+pe+.03);this.selectedRing.position.set(a.x+qs,a.y,a.z+Ys),this.selectedRing.visible=!0;return}const r=ot(e.x,e.y,this.mapSize,this.getMoveOverlayY(s));this.selectedRing.position.copy(r),this.selectedRing.visible=!0}setMoveTargets(e){if(jn(this.moveOverlayGroup),this.moveTargetHitMeshes=[],e.length!==0)for(const t of e){const n=Mn(t.x,t.y),s=this.tilesByCoord.get(n),r=this.mountainCoords.has(n)||!!(s&&s.terrain==="mountain"&&!s.isCityCenter&&!s.hasVillage),a=this.cityCoords.has(n)||!!(s&&(s.isCityCenter||s.hasVillage)),o=this.getMoveOverlayY(s),l=ot(t.x,t.y,this.mapSize,o);r?(l.x+=rs,l.z+=as):a&&(l.x+=qs,l.z+=Ys);const c=r||a,d=new D(c?Oe.MOVE_FILL_COMPACT_GEO:Oe.MOVE_FILL_GEO,Oe.MOVE_FILL_MAT);d.position.copy(l),d.renderOrder=32,d.userData={tileX:t.x,tileY:t.y},this.moveOverlayGroup.add(d),this.moveTargetHitMeshes.push(d);const u=new D(c?Oe.MOVE_RING_COMPACT_GEO:Oe.MOVE_RING_GEO,Oe.MOVE_RING_MAT);u.position.set(l.x,l.y+.005,l.z),u.renderOrder=32,this.moveOverlayGroup.add(u);const h=new D(Oe.MOVE_DOT_GEO,Oe.MOVE_DOT_MAT);h.position.set(l.x,l.y+.01,l.z),h.renderOrder=33,h.userData={isMoveDot:!0,phase:(t.x*.7+t.y*1.1)%(Math.PI*2)},this.moveOverlayGroup.add(h)}}setAttackTargets(e){if(jn(this.attackOverlayGroup),e.length!==0)for(const t of e){const n=Mn(t.x,t.y),s=this.tilesByCoord.get(n),r=this.unitWorldCoords.get(n),a=this.mountainCoords.has(n);let o,l,c;if(r)o=r.x,l=r.y,c=r.z;else if(a){const d=ot(t.x,t.y,this.mapSize,ae+ls);o=d.x+rs,l=d.y,c=d.z+as}else{const d=ot(t.x,t.y,this.mapSize,this.getMoveOverlayY(s));o=d.x,l=d.y,c=d.z}if(t.lethal){const d=a?.76:1,u=new D(Oe.LETHAL_OUTER_RING_GEO,Oe.LETHAL_OUTER_RING_MAT);u.position.set(o,l+.05,c),u.renderOrder=34,u.userData={isLethalRing:!0,ringPhase:0,baseScale:d},this.attackOverlayGroup.add(u);const h=new D(Oe.LETHAL_INNER_RING_GEO,Oe.LETHAL_INNER_RING_MAT);h.position.set(o,l+.06,c),h.renderOrder=34,h.userData={isLethalRing:!0,ringPhase:Math.PI,baseScale:d},this.attackOverlayGroup.add(h);const f=new $e,g=new D(Oe.LETHAL_CORE_GEO,Oe.LETHAL_CORE_MAT);f.add(g);const v=new D(Oe.LETHAL_HALO_GEO,Oe.LETHAL_GOLD_MAT);f.add(v);const m=new D(Oe.LETHAL_SPIKE_X_GEO,Oe.LETHAL_GOLD_MAT);m.position.x=.28,f.add(m);const p=new D(Oe.LETHAL_SPIKE_X_GEO,Oe.LETHAL_GOLD_MAT);p.position.x=-.28,f.add(p);const y=new D(Oe.LETHAL_SPIKE_Z_GEO,Oe.LETHAL_GOLD_MAT);y.position.z=.28,f.add(y);const w=new D(Oe.LETHAL_SPIKE_Z_GEO,Oe.LETHAL_GOLD_MAT);w.position.z=-.28,f.add(w);const _=new D(Oe.LETHAL_CROWN_GEO,Oe.LETHAL_GOLD_MAT);_.position.y=.28,f.add(_);for(const x of f.children)x.renderOrder=34;const b=this.unitHeightsByCoord.get(n)??1.56,T=l+b+.36;f.position.set(o,T,c),f.renderOrder=34,f.userData={isTargetDiamond:!0,isLethalMarker:!0,baseY:T},this.attackOverlayGroup.add(f)}else{const d=new D(Oe.ATTACK_RING_GEO,Oe.ATTACK_RING_MAT);d.position.set(o,l+.045,c),d.renderOrder=34,a&&d.scale.setScalar(.76),this.attackOverlayGroup.add(d);const u=this.unitHeightsByCoord.get(n)??1.56,h=l+u+.28,f=new D(Oe.ATTACK_DIAMOND_GEO,Oe.ATTACK_DIAMOND_MAT);f.position.set(o,h,c),f.renderOrder=34,f.userData={isTargetDiamond:!0,baseY:h},this.attackOverlayGroup.add(f)}}}setSuperpowerTargets(e,t){if(jn(this.superpowerOverlayGroup),this.superpowerTargetHitMeshes=[],e.length===0)return;const n=t==="volcano"?Oe.VOLCANO_FILL_MAT:Oe.TOWER_FILL_MAT,s=t==="volcano"?Oe.VOLCANO_RING_MAT:Oe.TOWER_RING_MAT,r=t==="volcano"?Oe.VOLCANO_DOT_MAT:Oe.TOWER_DOT_MAT;for(const a of e){const o=Mn(a.x,a.y),l=this.tilesByCoord.get(o),c=this.mountainCoords.has(o)||!!(l&&l.terrain==="mountain"&&!l.isCityCenter&&!l.hasVillage),d=this.cityCoords.has(o)||!!(l&&(l.isCityCenter||l.hasVillage)),u=this.getMoveOverlayY(l),h=ot(a.x,a.y,this.mapSize,u);c?(h.x+=rs,h.z+=as):d&&(h.x+=qs,h.z+=Ys);const f=c||d,g=(a.x*.85+a.y*1.15)%(Math.PI*2),v=new D(f?Oe.SUPERPOWER_FILL_COMPACT_GEO:Oe.SUPERPOWER_FILL_GEO,n);v.position.copy(h),v.renderOrder=33,v.userData={tileX:a.x,tileY:a.y},this.superpowerOverlayGroup.add(v),this.superpowerTargetHitMeshes.push(v);const m=new D(f?Oe.SUPERPOWER_RING_COMPACT_GEO:Oe.SUPERPOWER_RING_GEO,s);m.position.set(h.x,h.y+.008,h.z),m.renderOrder=34,m.userData={isSuperpowerRing:!0,phase:g},this.superpowerOverlayGroup.add(m);const p=new D(Oe.MOVE_DOT_GEO,r);p.position.set(h.x,h.y+.014,h.z),p.renderOrder=35,p.userData={isSuperpowerDot:!0,phase:g},this.superpowerOverlayGroup.add(p)}}clearHighlights(){this.setSelectedTile(null),this.setMoveTargets([]),this.setAttackTargets([]),this.setSuperpowerTargets([],"volcano")}update(e,t){const n=Math.min(Math.max(e,0),b1);for(const[r,a]of this.unitObjects){const o=this.unitBaseMeta.get(r),l=o?.phase??0;if(!this.animatingUnitIds.has(r)){const c=!!a.flameMesh,d=!!(a.wingLeft&&a.wingRight);if(o?.isHumanOwner){if(o.exhausted)a.bodyGroup.position.y=d?.055+Math.sin(t*2+l)*.025:.055;else if(a.bodyGroup.position.y=c?.055:d?.055+Math.sin(t*3.2+l)*.09:.055+Math.sin(t*3.4+l)*.045,a.readyRing.visible){const u=o.canCapture||o.canExploreRuins,f=.5+.5*Math.sin(t*(u?4.4:3.6)+l),g=1+f*(u?.1:.07);a.readyRing.scale.set(g,g,1),a.readyRingMat.opacity=(u?.78:.72)+f*.22}}else a.bodyGroup.position.y=c?.055:d?.055+Math.sin(t*2.8+l)*.07:.055+Math.sin(t*2.4+l)*.016}if(a.wingLeft&&a.wingRight){const c=o?.exhausted?3.2:5.4,d=o?.exhausted?.16:.34,u=Math.sin(t*c+l)*d;a.wingLeft.rotation.z=u,a.wingRight.rotation.z=-u}if(a.flameMesh){const c=.92+Math.sin(t*9.5+l)*.12+Math.cos(t*14.2+l)*.06;a.flameMesh.scale.set(.96+(c-1)*.4,c,.96+(c-1)*.4),a.flameMesh.rotation.y+=n*1.9}if(a.veteranCrown&&(a.veteranCrown.rotation.y+=n*1.8),a.promoteRing){const c=1+Math.sin(t*4.5)*.08;a.promoteRing.scale.set(c,c,1)}}for(const r of this.animatedTrees){const a=r.userData.swayPhase??0;r.rotation.z=Math.sin(t*1.4+a)*.036,r.rotation.x=Math.cos(t*1.1+a)*.022}for(const r of this.windmillBlades)r.rotation.z-=n*1.4;nw(n);for(const r of this.waterMeshes){const a=r.userData.tileX??0,o=r.userData.tileY??0;if(this.cloudObjects.has(Mn(a,o)))continue;const l=r.geometry.attributes.position,c=r.userData.basePositions;for(let d=0;d<l.count;d++){const u=c[d*3],h=c[d*3+2],f=Math.sin(t*2.1+(u+a*2)*1.2+(h+o*2)*.9)*.032;l.setY(d,c[d*3+1]+f)}l.needsUpdate=!0,r.geometry.computeVertexNormals()}for(const[r,a]of this.cloudObjects)this.animatingCloudKeys.has(r)||(a.group.position.y=a.baseY+Math.sin(t*.9+a.phase)*.08,a.group.position.x=a.baseX+Math.cos(t*.45+a.phase)*.05);if(this.selectedRing.visible){const r=1+Math.sin(t*4.2)*.06;this.selectedRing.scale.set(r,r,1)}for(const r of this.moveOverlayGroup.children)if(r.userData.isMoveDot){const a=r.userData.phase??0,o=1+Math.sin(t*4.8+a)*.1;r.scale.setScalar(o)}for(const r of this.superpowerOverlayGroup.children){const a=r.userData.phase??0;if(r.userData.isSuperpowerRing){const o=1+Math.sin(t*5.2+a)*.08;r.scale.setScalar(o)}else if(r.userData.isSuperpowerDot){const o=1+Math.sin(t*6+a)*.16;r.scale.setScalar(o)}}for(const r of this.attackOverlayGroup.children)if(r.userData.isLethalRing){const a=r.userData.ringPhase??0,l=(r.userData.baseScale??1)*(1+Math.sin(t*6+a)*.11);r.scale.setScalar(l)}else if(r.userData.isTargetDiamond){const a=r.userData.baseY??ae+1.78;if(r.userData.isLethalMarker){r.rotation.y+=n*3.4,r.position.y=a+Math.sin(t*5.6)*.11;const o=1+Math.sin(t*6.5)*.13;r.scale.setScalar(o)}else r.rotation.y+=n*2.4,r.position.y=a+Math.sin(t*4.5)*.08}for(const r of this.cityBanners){const a=r.userData.bannerPhase??0,o=r.userData.baseRotY??0;r.rotation.y=o+Math.sin(t*3.1+a)*.16}for(const r of this.unitBanners){const a=r.userData.bannerPhase??0,o=r.userData.baseRotY??0;r.rotation.y=o+Math.sin(t*3.1+a)*.16}const s=r=>{for(const a of r){const o=a.userData.smokeBaseX??0,l=a.userData.smokeBaseY??0,c=a.userData.smokeBaseZ??0,d=a.userData.smokePhase??0,u=(t*.34+d)%1;a.position.set(o+Math.sin(u*Math.PI*2+d)*.045,l+u*.44,c+Math.cos(u*Math.PI*2+d)*.035);const h=Math.sin(u*Math.PI)*1+.18;a.scale.setScalar(h)}};s(this.tileSmokePuffs),s(this.citySmokePuffs);for(const r of this.floatingMotes){const a=r.userData.moteKind,o=r.userData.baseX??0,l=r.userData.baseY??0,c=r.userData.baseZ??0,d=r.userData.phase??0;if(a==="firefly")r.position.set(o+Math.sin(t*1.1+d)*.14,l+Math.sin(t*1.9+d*1.3)*.12,c+Math.cos(t*.95+d)*.14),r.rotation.y+=n*1.4;else if(a==="ember"){const u=(t*.42+d)%1;r.position.set(o+Math.sin(u*Math.PI*2+d*6)*.08,l+u*.85,c+Math.cos(u*Math.PI*2+d*6)*.08),r.scale.setScalar(.25+Math.sin(u*Math.PI)*.45)}else a==="rune"&&(r.position.y=l+Math.sin(t*2.4+d)*.07,r.rotation.y+=n*1.5)}}}const T1=.033,E1=new ce(.11,.11,.11),A1=new ce(.15,.035,.09),R1=new Et(.1,0),C1=new Et(.11,0),I1=new Et(.19,1),P1=new hr(.45,.045,4,14,Math.PI*.85),Bs=new pn(.26,.44,32);Bs.rotateX(-Math.PI/2);const L1=new et(.42,.56,3.6,16,1,!0),D1=["#facc15","#38bdf8","#34d399","#fb7185","#fb923c","#f8fafc"];function Di(i){return 1-Math.pow(1-i,3)}function Zo(i){return i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2}function ci(i){return i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2}function k1(i){return Math.sin(i*Math.PI*.5)}function vu(i,e,t){const n=Mt.clamp((t-i)/Math.max(e-i,1e-5),0,1);return n*n*(3-2*n)}class U1{board;badges;sceneManager;tweens=[];particles=[];playing=!1;constructor(e,t,n){this.board=e,this.badges=t,this.sceneManager=n}isPlaying(){return this.playing}update(e){const t=Math.min(Math.max(e,0),T1);for(let n=this.tweens.length-1;n>=0;n--){const s=this.tweens[n];s.elapsed+=t;const r=Math.min(1,s.elapsed/Math.max(s.duration,.001));s.onUpdate(r),r>=1&&(this.tweens.splice(n,1),s.onComplete())}for(let n=this.particles.length-1;n>=0;n--){const s=this.particles[n];if(s.age+=t,s.age>=s.life){this.board.fxGroup.remove(s.mesh),s.matRef.count-=1,s.matRef.count<=0&&s.matRef.mat.dispose(),this.particles.splice(n,1);continue}s.vel.y-=s.gravity*t,s.mesh.position.addScaledVector(s.vel,t),s.mesh.rotation.x+=s.spinX*t,s.mesh.rotation.y+=s.spinY*t,s.mesh.rotation.z+=s.spinZ*t;const r=s.age/s.life,a=1-ci(Math.max(0,(r-.45)/.55));s.mesh.scale.setScalar(Math.max(.01,s.baseScale*a))}}runTween(e,t){return new Promise(n=>{this.tweens.push({elapsed:0,duration:e,onUpdate:t,onComplete:n})})}spawnBurst(e,t,n,s){const r=s?.confetti?A1:s?.spark?R1:E1,a=new us({color:n,flatShading:!0,roughness:.42,emissive:new xe(n),emissiveIntensity:s?.spark?.65:s?.confetti?.35:.15}),o={mat:a,count:t},l=s?.speed??2.6,c=s?.gravity??6.5,d=s?.life??.55,u=s?.scale??1;for(let h=0;h<t;h++){const f=new D(r,a);f.position.copy(e);const g=h/Math.max(t,1)*Math.PI*2+(Math.random()-.5)*.65,v=(.35+Math.random()*.65)*l,m=(.8+Math.random()*.72)*l;f.scale.setScalar(u),this.board.fxGroup.add(f),this.particles.push({mesh:f,vel:new U(Math.cos(g)*v,m,Math.sin(g)*v),age:0,life:d*(.78+Math.random()*.42),gravity:c,spinX:(Math.random()-.5)*11,spinY:(Math.random()-.5)*9,spinZ:(Math.random()-.5)*8,baseScale:u,matRef:o})}}spawnConfettiArc(e,t=4){for(const n of D1)this.spawnBurst(e,t,n,{confetti:!0,speed:3.1,gravity:5.4,life:.82,scale:1.05})}isCoordVisible(e,t,n){const s=e.players.find(a=>a.id===t)??e.players.find(a=>a.isHuman);if(!s)return!0;const r=Ke(n.x,n.y,e.mapSize);return!!s.revealedTiles[r]}async playEvents(e,t,n,s=1){if(e.length===0)return;this.playing=!0;const r=1/Math.max(s,.25);try{for(const a of e)await this.playSingleEvent(a,t,n,r)}finally{this.playing=!1}}async playSingleEvent(e,t,n,s){const r=t.mapSize;switch(e.type){case"UNIT_MOVED":{if(!(this.isCoordVisible(t,n,e.from)||this.isCoordVisible(t,n,e.to)))return;const o=this.board.getUnitObject(e.unitId);if(!o)return;const l=o.group.position.clone(),c=hi(t,e.to.x,e.to.y);await this.animateHopMove(e.unitId,o,l,c,.32*s);return}case"UNIT_ATTACKED":{if(!(this.isCoordVisible(t,n,e.from)||this.isCoordVisible(t,n,e.to)))return;const o=this.board.getUnitObject(e.attackerId),l=this.board.getUnitObject(e.defenderId),c=o?o.group.position.clone():hi(t,e.from.x,e.from.y),d=l?l.group.position.clone():hi(t,e.to.x,e.to.y),u=()=>(this.badges.spawnFloatingText(e.to,`-${e.damage}`,"damage"),this.spawnBurst(d.clone().add(new U(0,.72,0)),10,"#f87171",{spark:!0,speed:2.4,life:.42}),l?this.animateHitRecoil(e.defenderId,l,c,d,.2*s):Promise.resolve());if(e.isRanged?(await this.animateRangedProjectile(c,d,.34*s),await u()):o?await this.animateMeleeLunge(e.attackerId,o,c,d,.34*s,u):await u(),e.defenderKilled&&l)await this.animateDefeat(e.defenderId,l,d,.26*s);else if(e.retaliationDamage>0&&l&&o){const h=()=>(this.badges.spawnFloatingText(e.from,`-${e.retaliationDamage}`,"damage"),this.spawnBurst(c.clone().add(new U(0,.72,0)),8,"#fb7185",{spark:!0,speed:2.1,life:.36}),this.animateHitRecoil(e.attackerId,o,d,c,.18*s));await this.animateMeleeLunge(e.defenderId,l,d,c,.28*s,h),e.attackerKilled&&await this.animateDefeat(e.attackerId,o,c,.26*s)}if(e.advanced&&o&&!e.attackerKilled){const h=hi(t,e.to.x,e.to.y);await this.animateHopMove(e.attackerId,o,c,h,.28*s)}return}case"TILES_REVEALED":{if(e.playerId!==n||e.coords.length===0)return;this.board.revealTilesUnderClouds(t,n,e.coords);let a=0,o=0,l=0;for(const d of e.coords){const u=this.board.getCloudObject(d.x,d.y);u&&(a+=u.group.position.x,o+=u.group.position.z,l+=1)}if(l===0)return;a/=l,o/=l;const c=[];for(const d of e.coords){const u=this.board.getCloudObject(d.x,d.y);if(!u)continue;this.board.markCloudAnimating(d.x,d.y,!0);const h=[];u.group.traverse(w=>{if(w instanceof D&&w.material instanceof us){const _=w.material.clone();_.transparent=!0,_.opacity=1,_.depthWrite=!1,w.material=_,h.push(_)}}),u.group.userData.clonedMats=h;const f=u.group.position.x,g=u.group.position.y,v=u.group.position.z;let m=f-a,p=v-o;const y=Math.hypot(m,p);y>.05?(m=m/y*.42,p=p/y*.42):(m=Math.cos(u.phase)*.34,p=Math.sin(u.phase)*.34),c.push(this.runTween(.36*s,w=>{const _=Di(w);u.group.position.x=f+m*_,u.group.position.y=g+_*.72,u.group.position.z=v+p*_,u.group.scale.setScalar(1+_*.32);const b=Math.max(0,1-_);for(const T of h)T.opacity=b}).then(()=>{this.board.removeCloudImmediate(d.x,d.y)}))}c.length>0&&await Promise.all(c);return}case"RESOURCE_HARVESTED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=ot(e.coord.x,e.coord.y,r,ae+.35);this.spawnBurst(a,12,"#facc15",{spark:!0,speed:2.6,life:.5}),this.badges.spawnFloatingText(e.coord,`+${e.popGained} Pop`,"pop");return}case"IMPROVEMENT_BUILT":case"WOODS_PLANTED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=ot(e.coord.x,e.coord.y,r,ae+.35);this.spawnBurst(a,10,"#34d399",{spark:!0,speed:2.4,life:.5}),e.popGained>0&&this.badges.spawnFloatingText(e.coord,`+${e.popGained} Pop`,"pop");return}case"FOREST_CHOPPED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=ot(e.coord.x,e.coord.y,r,ae+.3);this.spawnBurst(a,10,"#d97706",{speed:2.2,life:.45}),this.badges.spawnFloatingText(e.coord,`+${e.goldGained}★`,"gold");return}case"RUINS_CLAIMED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=ot(e.coord.x,e.coord.y,r,ae+.4);this.spawnBurst(a,16,"#38bdf8",{spark:!0,speed:3,life:.65});const o=e.rewardKind==="gold"?`+${e.amount??5}★ Ruins!`:e.rewardKind==="tech"?"Ancient Tech!":`+${e.amount??3} Pop!`;this.badges.spawnFloatingText(e.coord,o,"level"),await this.animateRisingPulseRing(a,"#38bdf8",.38*s);return}case"CITY_LEVELED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=ot(e.coord.x,e.coord.y,r,ae+.18);this.badges.spawnFloatingText(e.coord,`LEVEL ${e.newLevel}!`,"level"),this.spawnConfettiArc(a.clone().add(new U(0,.52,0)),4),await this.animateRisingPulseRing(a,"#facc15",.48*s);return}case"CITY_CAPTURED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=ot(e.coord.x,e.coord.y,r,ae+.22);this.badges.spawnFloatingText(e.coord,e.wasVillage?"Village Claimed!":"City Captured!","level"),this.spawnConfettiArc(a.clone().add(new U(0,.48,0)),4),await this.animateRisingPulseRing(a,"#fbbf24",.48*s);return}case"UNIT_HEALED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=hi(t,e.coord.x,e.coord.y).add(new U(0,.4,0));this.spawnBurst(a,8,"#4ade80",{spark:!0,speed:1.8,life:.45}),this.badges.spawnFloatingText(e.coord,`+${e.amount} HP`,"heal");return}case"UNIT_PROMOTED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=hi(t,e.coord.x,e.coord.y).add(new U(0,.25,0));this.spawnBurst(a,14,"#fde047",{spark:!0,speed:2.8,life:.6}),this.badges.spawnFloatingText(e.coord,"VETERAN!","level"),await this.animateRisingPulseRing(a,"#fde047",.38*s);return}case"UNIT_TRAINED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=hi(t,e.coord.x,e.coord.y).add(new U(0,.2,0));this.spawnBurst(a,8,"#e2e8f0",{speed:1.8,life:.4});return}case"SPOILS_GAINED":{if(!this.isCoordVisible(t,n,e.coord))return;this.badges.spawnFloatingText(e.coord,`+${e.amount}★`,"gold");return}case"SUPERPOWER_USED":{await this.playSuperpowerEvent(e,t,n,s);return}default:return}}async animateHopMove(e,t,n,s,r){const{group:a,sprite:o,shadowDisc:l,baseScaleX:c,baseScaleY:d}=t,u=l.scale.x,h=l.scale.y,f=l.scale.z,g=Math.min(.06,r*.22);this.board.markUnitAnimating(e,!0);try{await this.runTween(r,v=>{const m=Zo(v),p=Math.sin(v*Math.PI);a.position.x=Mt.lerp(n.x,s.x,m),a.position.z=Mt.lerp(n.z,s.z,m),a.position.y=Mt.lerp(n.y,s.y,m)+p*.42;const y=1-p*.24;l.scale.set(u*y,h*y,f*y);const w=1+.12*p,_=1/Math.sqrt(w);o.scale.set(c*_,d*w,1),this.badges.setUnitOverrideWorldPos(e,a.position)}),a.position.copy(s),l.scale.set(u,h,f),this.badges.setUnitOverrideWorldPos(e,s),await this.runTween(g,v=>{const m=Math.sin(v*Math.PI)*(1-v*.28),p=1-.08*m,y=1+.07*m;o.scale.set(c*y,d*p,1)}),o.scale.set(c,d,1)}finally{this.board.markUnitAnimating(e,!1)}}async animateMeleeLunge(e,t,n,s,r,a){const{group:o,sprite:l,spriteMat:c,baseScaleX:d,baseScaleY:u}=t,h=new U().subVectors(s,n);h.lengthSq()>1e-4?h.normalize():h.set(1,0,0);const f=-.16,g=.56,v=h.x>=0?-1:1,m=new ut({color:"#fef08a",transparent:!0,opacity:0,side:gt,depthWrite:!1}),p=new D(P1,m);p.position.copy(n).addScaledVector(h,.68),p.position.y=Math.max(n.y,s.y)+.76,p.rotation.x=Math.PI/2,p.rotation.z=Math.atan2(h.x,h.z),p.renderOrder=29,p.visible=!1,this.board.fxGroup.add(p);let y=!1,w=null;this.board.markUnitAnimating(e,!0);try{await this.runTween(r,_=>{let b=0,T=1,x=1,E=0;if(_<.18){const M=k1(_/.18);b=f*M,T=1+.06*M,x=1-.06*M,E=-v*.08*M}else if(_<.48){const M=Zo((_-.18)/.3);b=Mt.lerp(f,g,M),T=Mt.lerp(1.06,1.12,M),x=Mt.lerp(.94,.92,M),E=Mt.lerp(-v*.08,v*.15,M)}else{y||(y=!0,p.visible=!0,a&&(w=a()));const M=Zo((_-.48)/.52);b=Mt.lerp(g,0,M),T=Mt.lerp(1.12,1,M),x=Mt.lerp(.92,1,M),E=Mt.lerp(v*.15,0,M);const S=(_-.48)/.52;p.scale.setScalar(.68+Di(S)*.78),m.opacity=Math.max(0,.92*(1-ci(S)))}o.position.copy(n).addScaledVector(h,b),l.scale.set(d*T,u*x,1),c.rotation=E,this.badges.setUnitOverrideWorldPos(e,o.position)}),!y&&a&&(w=a()),w&&await w}finally{this.board.fxGroup.remove(p),m.dispose(),o.position.copy(n),l.scale.set(d,u,1),c.rotation=0,this.badges.clearUnitOverrideWorldPos(e),this.board.markUnitAnimating(e,!1)}}async animateRangedProjectile(e,t,n){const s=new ut({color:"#fef08a",transparent:!0,opacity:1}),r=new ut({color:"#f59e0b",transparent:!0,opacity:.48,depthWrite:!1}),a=new $e,o=new D(C1,s),l=new D(I1,r);o.renderOrder=29,l.renderOrder=28,a.add(o,l),this.board.fxGroup.add(a);const c=e.clone().add(new U(0,.92,0)),d=t.clone().add(new U(0,.76,0)),u=Math.min(2.35,.95+c.distanceTo(d)*.24);try{await this.runTween(n,h=>{const f=ci(h);a.position.lerpVectors(c,d,f),a.position.y+=Math.sin(h*Math.PI)*u;const g=vu(0,.14,h),v=1-vu(.86,1,h)*.45,m=Math.max(.08,g*v);a.scale.setScalar(m),o.rotation.y=h*Math.PI*5,o.rotation.x=h*Math.PI*3,l.scale.setScalar(1+Math.sin(h*Math.PI*4)*.16)}),this.spawnBurst(d,6,"#fde047",{spark:!0,speed:2,life:.32,scale:.85})}finally{this.board.fxGroup.remove(a),s.dispose(),r.dispose()}}async animateHitRecoil(e,t,n,s,r){const a=new U().subVectors(s,n);a.lengthSq()>1e-4?a.normalize():a.set(1,0,0);const o=t.group.position.clone(),l=o.clone().addScaledVector(a,.24);this.board.markUnitAnimating(e,!0),t.setHitFlash(!0,"#ffffff");try{await this.runTween(r,c=>{const d=Math.sin(c*Math.PI)*Math.exp(-c*1.15)*1.38,u=Math.min(1,Math.max(0,d));t.group.position.lerpVectors(o,l,u),c>.4&&t.setHitFlash(!0,"#ff4d4d");const h=1+.14*u,f=1-.12*u;t.sprite.scale.set(t.baseScaleX*h,t.baseScaleY*f,1),t.flashSprite.scale.copy(t.sprite.scale)})}finally{t.group.position.copy(o),t.sprite.scale.set(t.baseScaleX,t.baseScaleY,1),t.flashSprite.scale.set(t.baseScaleX,t.baseScaleY,1),t.setHitFlash(!1),this.board.markUnitAnimating(e,!1)}}async animateDefeat(e,t,n,s){const{group:r,sprite:a,spriteMat:o,baseScaleX:l,baseScaleY:c}=t;this.board.markUnitAnimating(e,!0),this.badges.hideUnitBadge(e),this.spawnBurst(n.clone().add(new U(0,.42,0)),14,"#e2e8f0",{speed:2.9,life:.52});try{await this.runTween(s,d=>{const u=Di(d),h=Math.max(.01,1-u);a.scale.set(l*h,c*h,1),o.rotation=u*1.15,o.opacity=Math.max(0,1-u),r.scale.setScalar(h)}),r.visible=!1,o.rotation=0}finally{this.board.markUnitAnimating(e,!1)}}async animateRisingPulseRing(e,t,n){const s=new ut({color:t,side:gt,transparent:!0,opacity:.92,depthWrite:!1}),r=new ut({color:"#ffffff",side:gt,transparent:!0,opacity:.78,depthWrite:!1}),a=new D(Bs,s);a.position.copy(e),a.renderOrder=30,this.board.fxGroup.add(a);const o=new D(Bs,r);o.position.copy(e),o.renderOrder=30,this.board.fxGroup.add(o);const l=e.y;try{await this.runTween(n,c=>{const d=Di(c);a.scale.setScalar(.75+d*3.55),a.position.y=l+d*.56,s.opacity=Math.max(0,.92*(1-ci(c)));const u=Mt.clamp((c-.12)/.88,0,1),h=Di(u);o.scale.setScalar(.55+h*2.65),o.position.y=l+h*.78,r.opacity=c<.12?0:Math.max(0,.75*(1-ci(u)))})}finally{this.board.fxGroup.remove(a,o),s.dispose(),r.dispose()}}async playSuperpowerEvent(e,t,n,s){const r=t.mapSize,a=Object.values(t.cities).filter(u=>u.ownerId===e.playerId),o=a.find(u=>u.isCapital)??a[0],l=Object.values(t.cities).filter(u=>u.ownerId===n),c=l.find(u=>u.isCapital)??l[0],d=e.target??e.affectedCoords?.[0]??(o?{x:o.x,y:o.y}:null)??(c?{x:c.x,y:c.y}:null)??{x:Math.floor(r/2),y:Math.floor(r/2)};switch(e.faction){case"elves":{this.sceneManager?.setEclipseMode(!0);const u=this.isCoordVisible(t,n,d)?d:c?{x:c.x,y:c.y}:d,h=ot(u.x,u.y,r,ae+.24);this.badges.spawnFloatingText(u,"STARLIT ECLIPSE!","level"),this.spawnBurst(h.clone().add(new U(0,.5,0)),18,"#c7d2fe",{spark:!0,speed:3.4,gravity:2.6,life:.72,scale:1.15}),this.spawnBurst(h.clone().add(new U(0,.35,0)),12,"#818cf8",{spark:!0,speed:2.8,gravity:2.2,life:.65}),await this.animateStarlightShockwave(h,.64*s);return}case"orcs":{const u=e.affectedCoords&&e.affectedCoords.length>0?e.affectedCoords:[d],h=u.filter(m=>this.isCoordVisible(t,n,m));if(h.length===0&&e.playerId!==n)return;const f=e.target??h[0]??d,g=ot(f.x,f.y,r,ae+.2);this.sceneManager?.focusOnWorld(g),this.sceneManager?.shakeCamera(.55,.56*s),this.badges.spawnFloatingText(f,"VOLCANIC CATACLYSM!","damage");const v=[];for(const m of h.length>0?h:u){const p=ot(m.x,m.y,r,ae+.22);this.spawnBurst(p.clone().add(new U(0,.28,0)),10,"#ff5a1f",{spark:!0,speed:3.4,gravity:5.8,life:.62,scale:1.15}),this.spawnBurst(p.clone().add(new U(0,.18,0)),6,"#facc15",{spark:!0,speed:2.6,gravity:4.5,life:.5}),v.push(this.animateRisingPulseRing(p,"#ff5a1f",.58*s))}await Promise.all(v);return}case"dwarves":{if(!this.isCoordVisible(t,n,d)&&e.playerId!==n)return;const u=ot(d.x,d.y,r,ae+.18);this.sceneManager?.focusOnWorld(u),this.badges.spawnFloatingText(d,"FIRE DRAKE AWAKENED!","level"),this.spawnBurst(u.clone().add(new U(0,.65,0)),18,"#ff5a1f",{spark:!0,speed:3.5,gravity:4.2,life:.68,scale:1.2}),this.spawnBurst(u.clone().add(new U(0,.5,0)),14,"#facc15",{spark:!0,speed:2.8,gravity:3.6,life:.62}),await this.animateSummonPillar(u,"#ef4444","#facc15",.62*s);return}case"humans":{if(!this.isCoordVisible(t,n,d)&&e.playerId!==n)return;const u=ot(d.x,d.y,r,ae+.18);this.sceneManager?.focusOnWorld(u),this.badges.spawnFloatingText(d,"WATCHTOWER RAISED!","level"),this.spawnBurst(u.clone().add(new U(0,.55,0)),16,"#f5c542",{spark:!0,speed:3,gravity:4.4,life:.62,scale:1.1}),this.spawnBurst(u.clone().add(new U(0,.45,0)),10,"#93c5fd",{spark:!0,speed:2.4,gravity:3.8,life:.55}),await this.animateSummonPillar(u,"#f5c542","#93c5fd",.6*s);return}}}async animateStarlightShockwave(e,t){const n=new ut({color:"#818cf8",side:gt,transparent:!0,opacity:.92,depthWrite:!1}),s=new ut({color:"#e0e7ff",side:gt,transparent:!0,opacity:.85,depthWrite:!1}),r=new D(Bs,n);r.position.copy(e),r.renderOrder=36,this.board.fxGroup.add(r);const a=new D(Bs,s);a.position.copy(e),a.renderOrder=36,this.board.fxGroup.add(a);const o=e.y;try{await this.runTween(t,l=>{const c=Di(l);r.scale.setScalar(1+c*14),r.position.y=o+c*.45,n.opacity=Math.max(0,.92*(1-ci(l)));const d=Mt.clamp((l-.1)/.9,0,1),u=Di(d);a.scale.setScalar(.8+u*10.5),a.position.y=o+u*.65,s.opacity=l<.1?0:Math.max(0,.85*(1-ci(d)))})}finally{this.board.fxGroup.remove(r,a),n.dispose(),s.dispose()}}async animateSummonPillar(e,t,n,s){const r=new ut({color:t,side:gt,transparent:!0,opacity:.65,depthWrite:!1,blending:qa}),a=new ut({color:n,side:gt,transparent:!0,opacity:.94,depthWrite:!1}),o=new D(L1,r);o.position.set(e.x,e.y+1.8,e.z),o.renderOrder=35,this.board.fxGroup.add(o);const l=new D(Bs,a);l.position.copy(e),l.renderOrder=36,this.board.fxGroup.add(l);const c=e.y;try{await this.runTween(s,d=>{const u=Di(d),h=d<.25?d/.25:1-ci((d-.25)/.75),f=.75+u*.85;o.scale.set(f,.4+u*1.15,f),o.position.y=c+(.4+u*1.15)*1.5,r.opacity=Math.max(0,.68*h),l.scale.setScalar(.8+u*4.4),l.position.y=c+u*.48,a.opacity=Math.max(0,.94*(1-ci(d)))})}finally{this.board.fxGroup.remove(o,l),r.dispose(),a.dispose()}}}const O1=6,N1=10;class F1{sceneManager;board;callbacks;domElement;raycaster=new Pm;pointerNdc=new qe;keysDown=new Set;activePointers=new Map;inputLocked=!1;isDragging=!1;gestureWasMultiTouch=!1;lastPinchDistance=null;lastPinchMidX=0;lastPinchMidY=0;lastHoveredKey=null;onPointerDownBound;onPointerMoveBound;onPointerUpBound;onPointerCancelBound;onWheelBound;onContextMenuBound;onKeyDownBound;onKeyUpBound;constructor(e,t,n){this.sceneManager=e,this.board=t,this.callbacks=n,this.domElement=e.getDomElement(),this.domElement.style.touchAction="none",this.onPointerDownBound=s=>this.handlePointerDown(s),this.onPointerMoveBound=s=>this.handlePointerMove(s),this.onPointerUpBound=s=>this.handlePointerUp(s,!1),this.onPointerCancelBound=s=>this.handlePointerUp(s,!0),this.onWheelBound=s=>this.handleWheel(s),this.onContextMenuBound=s=>s.preventDefault(),this.onKeyDownBound=s=>this.handleKeyDown(s),this.onKeyUpBound=s=>this.handleKeyUp(s),this.domElement.addEventListener("pointerdown",this.onPointerDownBound),window.addEventListener("pointermove",this.onPointerMoveBound),window.addEventListener("pointerup",this.onPointerUpBound),window.addEventListener("pointercancel",this.onPointerCancelBound),this.domElement.addEventListener("wheel",this.onWheelBound,{passive:!1}),this.domElement.addEventListener("contextmenu",this.onContextMenuBound),window.addEventListener("keydown",this.onKeyDownBound),window.addEventListener("keyup",this.onKeyUpBound)}setInputLocked(e){this.inputLocked=e}update(e){const t=Math.min(Math.max(e,0),.033);let n=0,s=0;(this.keysDown.has("KeyA")||this.keysDown.has("ArrowLeft"))&&(n-=1),(this.keysDown.has("KeyD")||this.keysDown.has("ArrowRight"))&&(n+=1),(this.keysDown.has("KeyW")||this.keysDown.has("ArrowUp"))&&(s+=1),(this.keysDown.has("KeyS")||this.keysDown.has("ArrowDown"))&&(s-=1),(n!==0||s!==0)&&this.sceneManager.panByAxes(n,s,t)}raycastTile(e,t){const n=this.domElement.getBoundingClientRect();if(e<n.left||e>n.right||t<n.top||t>n.bottom)return null;this.pointerNdc.x=(e-n.left)/n.width*2-1,this.pointerNdc.y=-((t-n.top)/n.height)*2+1,this.raycaster.setFromCamera(this.pointerNdc,this.sceneManager.camera);const s=this.raycaster.intersectObjects(this.board.getUnitHitMeshes(),!1);if(s.length>0){const l=s[0].object.userData;if(typeof l.tileX=="number"&&typeof l.tileY=="number")return{x:l.tileX,y:l.tileY}}const r=this.raycaster.intersectObjects(this.board.getMoveTargetHitMeshes(),!1);if(r.length>0){const l=r[0].object.userData;if(typeof l.tileX=="number"&&typeof l.tileY=="number")return{x:l.tileX,y:l.tileY}}const a=this.raycaster.intersectObjects(this.board.getTileHitMeshes(),!1);if(a.length===0)return null;const o=a[0].object.userData;return typeof o.tileX=="number"&&typeof o.tileY=="number"?{x:o.tileX,y:o.tileY}:null}getPinchMetrics(){if(this.activePointers.size<2)return null;const e=this.activePointers.values(),t=e.next().value,n=e.next().value;return!t||!n?null:{distance:Math.hypot(n.x-t.x,n.y-t.y),midX:(t.x+n.x)*.5,midY:(t.y+n.y)*.5}}handlePointerDown(e){if(!(e.pointerType==="mouse"&&e.button!==0&&e.button!==1&&e.button!==2)){this.activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,pointerType:e.pointerType,button:e.button});try{this.domElement.setPointerCapture(e.pointerId)}catch{}if(this.activePointers.size===1)this.isDragging=!1,this.gestureWasMultiTouch=!1,this.lastPinchDistance=null;else if(this.activePointers.size>=2){this.gestureWasMultiTouch=!0,this.isDragging=!0;const t=this.getPinchMetrics();t&&(this.lastPinchDistance=t.distance,this.lastPinchMidX=t.midX,this.lastPinchMidY=t.midY)}}}handlePointerMove(e){const t=this.activePointers.get(e.pointerId);if(t){const r=t.x,a=t.y;if(t.x=e.clientX,t.y=e.clientY,this.activePointers.size>=2){const d=this.getPinchMetrics();if(d){if(this.lastPinchDistance!==null&&this.lastPinchDistance>10&&d.distance>10){const u=d.distance/this.lastPinchDistance;this.sceneManager.zoomByFactor(u),this.sceneManager.panByScreenDelta(d.midX-this.lastPinchMidX,d.midY-this.lastPinchMidY)}this.lastPinchDistance=d.distance,this.lastPinchMidX=d.midX,this.lastPinchMidY=d.midY}return}const o=t.pointerType==="touch"?N1:O1,l=t.x-t.startX,c=t.y-t.startY;!this.isDragging&&Math.hypot(l,c)>o&&(this.isDragging=!0),this.isDragging&&this.sceneManager.panByScreenDelta(t.x-r,t.y-a);return}if(e.pointerType==="touch")return;const n=this.raycastTile(e.clientX,e.clientY),s=n?`${n.x},${n.y}`:null;s!==this.lastHoveredKey&&(this.lastHoveredKey=s,this.board.setHoverTile(n),this.callbacks.onTileHover(n))}handlePointerUp(e,t){const n=this.activePointers.get(e.pointerId);if(n){this.activePointers.delete(e.pointerId);try{this.domElement.hasPointerCapture(e.pointerId)&&this.domElement.releasePointerCapture(e.pointerId)}catch{}if(this.activePointers.size<2&&(this.lastPinchDistance=null),this.activePointers.size===1){const s=this.activePointers.values().next().value;s&&(s.startX=s.x,s.startY=s.y);return}if(this.activePointers.size===0){const s=this.isDragging,r=this.gestureWasMultiTouch;this.isDragging=!1,this.gestureWasMultiTouch=!1;const a=n.pointerType!=="mouse"||n.button===0;if(!t&&!s&&!r&&a&&!this.inputLocked){const o=this.raycastTile(e.clientX,e.clientY);o&&this.callbacks.onTileClick(o)}}}}handleWheel(e){e.preventDefault();const t=e.deltaMode===1?28:e.deltaMode===2?120:1;this.sceneManager.zoomBy(e.deltaY*t)}handleKeyDown(e){const t=e.target?.tagName;t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||(this.keysDown.add(e.code),e.code==="KeyQ"?this.sceneManager.rotateStep(-1):e.code==="KeyE"?this.sceneManager.rotateStep(1):e.code==="Escape"?this.callbacks.onDeselectHotkey?.():e.code==="Space"&&!this.inputLocked&&(e.preventDefault(),this.callbacks.onEndTurnHotkey?.()))}handleKeyUp(e){this.keysDown.delete(e.code)}dispose(){this.domElement.removeEventListener("pointerdown",this.onPointerDownBound),window.removeEventListener("pointermove",this.onPointerMoveBound),window.removeEventListener("pointerup",this.onPointerUpBound),window.removeEventListener("pointercancel",this.onPointerCancelBound),this.domElement.removeEventListener("wheel",this.onWheelBound),this.domElement.removeEventListener("contextmenu",this.onContextMenuBound),window.removeEventListener("keydown",this.onKeyDownBound),window.removeEventListener("keyup",this.onKeyUpBound),this.activePointers.clear()}}const B1=.033;function br(i,e){return`${i},${e}`}function yu(i){return i==="orcs"?"#ef4444":nt[i].palette.primary}const _u='<svg class="capture-affordance-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 18h18v2H3v-2zm0-2L5 7l4.5 4L12 5l2.5 6L19 7l2 9H3z"/></svg>',H1='<svg class="capture-affordance-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.6 6.4L21 11l-6.4 2.6L12 20l-2.6-6.4L3 11l6.4-2.6L12 2z"/></svg>';let wu=!1;function z1(){if(wu||typeof document>"u"||(wu=!0,document.querySelector("style[data-world-badges-style]")))return;const i=document.createElement("style");i.setAttribute("data-world-badges-style","true"),i.textContent=`
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
  `,document.head.appendChild(i)}class G1{root;unitLayer;cityLayer;captureLayer;popupLayer;unitBadges=new Map;cityBadges=new Map;captureAffordances=new Map;unitWorldPosOverrides=new Map;hiddenUnitIds=new Set;popups=[];tempVec=new U;mapSize=11;selectedCoord=null;lethalCoords=new Set;onCaptureClick=null;onExploreRuinsClick=null;constructor(e){z1(),this.root=e,this.root.innerHTML="",this.root.style.pointerEvents="none",this.cityLayer=document.createElement("div"),this.cityLayer.className="world-badges-layer",this.unitLayer=document.createElement("div"),this.unitLayer.className="world-badges-layer",this.captureLayer=document.createElement("div"),this.captureLayer.className="world-badges-layer",this.popupLayer=document.createElement("div"),this.popupLayer.className="world-badges-layer",this.root.append(this.cityLayer,this.unitLayer,this.captureLayer,this.popupLayer)}setOnCaptureClick(e){this.onCaptureClick=e}setOnExploreRuinsClick(e){this.onExploreRuinsClick=e}setUnitOverrideWorldPos(e,t){let n=this.unitWorldPosOverrides.get(e);n||(n=new U,this.unitWorldPosOverrides.set(e,n)),n.set(t.x,t.y+.08,t.z)}clearUnitOverrideWorldPos(e){this.unitWorldPosOverrides.delete(e)}hideUnitBadge(e){this.hiddenUnitIds.add(e);const t=this.unitBadges.get(e);t&&(t.el.style.display="none",t.lastDisplay="none"),this.unitWorldPosOverrides.delete(e)}setSelectedCoord(e){this.selectedCoord=e?{x:e.x,y:e.y}:null,this.refreshCityBadgeModes()}setLethalTargets(e){this.lethalCoords.clear();for(const t of e)this.lethalCoords.add(br(t.x,t.y));this.refreshUnitLethalStates()}applyCityBadgeMode(e,t){const n=`${t?1:0}|${e.hasReward?1:0}|${e.color}|${t?e.fullHtml:e.pipHtml}`;if(e.isSelected=t,e.renderFingerprint===n)return;e.renderFingerprint=n;const s=e.hasReward?" reward-ready ready-upgrade":"";t?(e.el.className=`city-badge${s}`,e.el.style.background="",e.el.style.borderColor=e.hasReward?"#facc15":e.color,e.el.innerHTML=e.fullHtml):(e.el.className=`city-pip-wrap city-pip-badge${s}`,e.el.style.background="",e.el.style.borderColor=e.hasReward?"#facc15":e.color,e.el.innerHTML=e.pipHtml),e.lastDisplay="",e.lastTransform=""}refreshCityBadgeModes(){const e=this.selectedCoord?br(this.selectedCoord.x,this.selectedCoord.y):null;for(const t of this.cityBadges.values()){const n=e!==null&&t.coordKey===e;t.isSelected!==n&&this.applyCityBadgeMode(t,n)}}applyUnitLethalState(e,t){const n=`${t?1:0}|${e.baseClass}|${e.borderColor}|${e.baseHtml}`;e.renderFingerprint!==n&&(e.renderFingerprint=n,t?(e.el.className=`${e.baseClass} lethal-target`,e.el.style.borderColor="#ef4444",e.el.innerHTML=`${e.baseHtml}<span class="unit-lethal-tag">LETHAL</span>`):(e.el.className=e.baseClass,e.el.style.borderColor=e.borderColor,e.el.innerHTML=e.baseHtml))}refreshUnitLethalStates(){for(const e of this.unitBadges.values())this.applyUnitLethalState(e,this.lethalCoords.has(e.coordKey))}syncState(e,t,n){n!==void 0&&(this.selectedCoord=n?{x:n.x,y:n.y}:null),this.mapSize=e.mapSize;const s=e.players.find(f=>f.id===t)??e.players.find(f=>f.isHuman)??e.players[0],r=s?.id??t,a=e.phase==="playing"&&e.players[e.activePlayerIndex]?.id===r,o=s?.revealedTiles??[],l=new Map;for(const f of e.players)l.set(f.id,f.faction);this.unitWorldPosOverrides.clear(),this.hiddenUnitIds.clear();const c=new Set,d=new Set;for(const f of Object.values(e.units)){if(!o[Ke(f.x,f.y,e.mapSize)])continue;c.add(f.id);const g=l.get(f.ownerId)??"humans",v=yu(g),m=br(f.x,f.y),p=f.ownerId===r,y=p&&!f.actedThisTurn&&Gr(e,f.id),w=p&&!y,b=`unit-badge${y?" ready-unit":w?" exhausted":" enemy-unit"}${f.isVeteran?" veteran":""}`,T=`<span class="unit-dot" style="background:${v}"></span><span class="unit-hp">${f.hp}</span>${f.isVeteran?'<span class="unit-vet">★</span>':""}`,x=y?"#ffffff":w?"rgba(148, 163, 184, 0.35)":v,E=hi(e,f.x,f.y),M=E.clone();M.y+=.08;let S=this.unitBadges.get(f.id);if(S)S.coordKey=m,S.worldPos.copy(M),S.baseHtml=T,S.baseClass=b,S.borderColor=x;else{const A=document.createElement("div");this.unitLayer.appendChild(A),S={el:A,coordKey:m,worldPos:M,baseHtml:T,baseClass:b,borderColor:x,renderFingerprint:"",lastDisplay:"",lastTransform:""},this.unitBadges.set(f.id,S)}if(this.applyUnitLethalState(S,this.lethalCoords.has(m)),a&&y&&f.canCapture){const A=`${f.id}:capture`;d.add(A);const I=he(e,f.x,f.y),F=!!(I?.hasVillage&&!I?.isCityCenter)?"Claim":"Capture",H=`capture|${F}`,$=E.clone();$.y+=uu(f.type,g)+.28;const Z=this.captureAffordances.get(A);if(Z)Z.worldPos.copy($),Z.renderFingerprint!==H&&(Z.renderFingerprint=H,Z.el.innerHTML=`${_u}<span>${F}</span>`);else{const V=document.createElement("button");V.type="button",V.className="capture-affordance-btn",V.dataset.unitId=f.id,V.innerHTML=`${_u}<span>${F}</span>`;const K=G=>{G.stopPropagation()};V.addEventListener("pointerdown",K),V.addEventListener("pointerup",K),V.addEventListener("click",G=>{G.preventDefault(),G.stopPropagation(),this.onCaptureClick?.(f.id)}),this.captureLayer.appendChild(V),this.captureAffordances.set(A,{el:V,unitId:f.id,worldPos:$,renderFingerprint:H,lastDisplay:"",lastTransform:""})}}if(a&&y&&f.canExploreRuins){const A=`${f.id}:ruins`;d.add(A);const I="ruins|Explore",P=E.clone();P.y+=uu(f.type,g)+.28;const F=this.captureAffordances.get(A);if(F)F.worldPos.copy(P);else{const H=document.createElement("button");H.type="button",H.className="capture-affordance-btn ruins-affordance-btn",H.dataset.unitId=f.id,H.innerHTML=`${H1}<span>Explore</span>`;const $=Z=>{Z.stopPropagation()};H.addEventListener("pointerdown",$),H.addEventListener("pointerup",$),H.addEventListener("click",Z=>{Z.preventDefault(),Z.stopPropagation(),this.onExploreRuinsClick?.(f.id)}),this.captureLayer.appendChild(H),this.captureAffordances.set(A,{el:H,unitId:f.id,worldPos:P,renderFingerprint:I,lastDisplay:"",lastTransform:""})}}}for(const[f,g]of this.unitBadges)c.has(f)||(g.el.remove(),this.unitBadges.delete(f),this.unitWorldPosOverrides.delete(f));for(const[f,g]of this.captureAffordances)d.has(f)||(g.el.remove(),this.captureAffordances.delete(f));const u=new Set,h=this.selectedCoord?br(this.selectedCoord.x,this.selectedCoord.y):null;for(const f of Object.values(e.cities)){if(!o[Ke(f.x,f.y,e.mapSize)])continue;u.add(f.id);const g=l.get(f.ownerId)??f.styleFaction,v=yu(g),m=Math.max(1,f.level+1),p=Math.max(0,Math.min(f.population,m)),y=f.pendingLevelRewards.length>0,w=Array.from({length:m},(I,P)=>`<span class="pop-pip${P<p?" filled":""}"></span>`).join(""),_=Array.from({length:m},(I,P)=>`<span class="city-pip-seg ${P<p?"filled":"empty"}"></span>`).join(""),b=f.level+(f.isCapital?1:0)+(f.hasWorkshop?1:0)+(f.connectedToCapital&&!f.isCapital&&g==="humans"?1:0),T=`
        <div class="city-badge-row">
          <span class="city-lvl" style="background:${v}">${f.level}</span>
          <span class="city-name">${f.isCapital?"♛ ":""}${f.name}</span>
          <span class="city-income">+${b}★</span>
        </div>
        <div class="city-pips">${w}</div>
      `,x=`<span class="city-pip-lvl" style="background:${v}">${f.level}</span><div class="city-pip-progress city-pip-bar" aria-label="Level ${f.level}: ${p} of ${m} population">${_}</div>`,E=br(f.x,f.y),M=ot(f.x,f.y,e.mapSize,ae+1.25).add(new U(-.28,0,-.28)),S=ot(f.x,f.y,e.mapSize,ae+1.22).add(new U(-.38,0,-.38));let A=this.cityBadges.get(f.id);if(A)A.coordKey=E,A.selectedWorldPos.copy(M),A.unselectedWorldPos.copy(S),A.fullHtml=T,A.pipHtml=x,A.color=v,A.hasReward=y;else{const I=document.createElement("div");this.cityLayer.appendChild(I),A={el:I,coordKey:E,selectedWorldPos:M,unselectedWorldPos:S,fullHtml:T,pipHtml:x,color:v,hasReward:y,isSelected:!1,renderFingerprint:"",lastDisplay:"",lastTransform:""},this.cityBadges.set(f.id,A)}this.applyCityBadgeMode(A,h!==null&&E===h)}for(const[f,g]of this.cityBadges)u.has(f)||(g.el.remove(),this.cityBadges.delete(f))}spawnFloatingText(e,t,n="info"){const s=document.createElement("div");s.className=`floating-popup popup-${n}`,s.textContent=t,this.popupLayer.appendChild(s);const r=ot(e.x,e.y,this.mapSize,ae+1.45);this.popups.push({el:s,worldPos:r,age:0,duration:.95})}update(e,t){const n=Math.min(Math.max(t,0),B1),s=this.root.clientWidth||window.innerWidth,r=this.root.clientHeight||window.innerHeight,a=(o,l=0)=>{this.tempVec.copy(o),this.tempVec.y+=l,this.tempVec.project(e);const c=(this.tempVec.x*.5+.5)*s,d=(-this.tempVec.y*.5+.5)*r,u=this.tempVec.z<=1&&c>=-120&&c<=s+120&&d>=-80&&d<=r+80;return{x:c,y:d,visible:u}};for(const[o,l]of this.unitBadges){if(this.hiddenUnitIds.has(o)){l.lastDisplay!=="none"&&(l.el.style.display="none",l.lastDisplay="none");continue}const c=this.unitWorldPosOverrides.get(o)??l.worldPos,d=a(c),u=d.visible?"inline-flex":"none";if(l.lastDisplay!==u&&(l.el.style.display=u,l.lastDisplay=u),d.visible){const h=`translate3d(${d.x.toFixed(1)}px, ${(d.y+16).toFixed(1)}px, 0) translate(-50%, -50%)`;l.lastTransform!==h&&(l.el.style.transform=h,l.lastTransform=h)}}for(const o of this.captureAffordances.values()){const l=a(o.worldPos),c=l.visible?"inline-flex":"none";if(o.lastDisplay!==c&&(o.el.style.display=c,o.lastDisplay=c),l.visible){const d=`translate3d(${l.x.toFixed(1)}px, ${l.y.toFixed(1)}px, 0) translate(-50%, -100%)`;o.lastTransform!==d&&(o.el.style.transform=d,o.lastTransform=d)}}for(const o of this.cityBadges.values()){const l=o.isSelected?o.selectedWorldPos:o.unselectedWorldPos,c=a(l);if(o.isSelected){const d=c.visible?"flex":"none";if(o.lastDisplay!==d&&(o.el.style.display=d,o.lastDisplay=d),c.visible){const u=`translate3d(${c.x.toFixed(1)}px, ${(c.y-6).toFixed(1)}px, 0) translate(-50%, -100%)`;o.lastTransform!==u&&(o.el.style.transform=u,o.lastTransform=u)}}else{const d=c.visible?"inline-flex":"none";if(o.lastDisplay!==d&&(o.el.style.display=d,o.lastDisplay=d),c.visible){const u=`translate3d(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px, 0) translate(-50%, -50%)`;o.lastTransform!==u&&(o.el.style.transform=u,o.lastTransform=u)}}}for(let o=this.popups.length-1;o>=0;o--){const l=this.popups[o];if(l.age+=n,l.age>=l.duration){l.el.remove(),this.popups.splice(o,1);continue}const c=l.age/l.duration,d=1-Math.pow(1-c,2),u=a(l.worldPos,d*.95);l.el.style.opacity=String(c<.68?1:Math.max(0,1-(c-.68)/.32)),l.el.style.transform=`translate3d(${u.x.toFixed(1)}px, ${u.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${(1+Math.sin(c*Math.PI)*.14).toFixed(2)})`}}dispose(){this.root.innerHTML="",this.unitBadges.clear(),this.cityBadges.clear(),this.captureAffordances.clear(),this.unitWorldPosOverrides.clear(),this.hiddenUnitIds.clear(),this.popups.length=0}}const Mu=96,V1=new Set(["warrior","defender","archer","rider","catapult","rohirrim_knight","uruk_berserker","elven_sentinel","ironbreaker"]),W1=new Set(["berries","game","ore","mithril","ruins"]),$1=new Set(["farm","windmill","mine","sanctuary","slag_pit","foundry","great_forge"]),Hs={northWater:!1,southWater:!1,eastWater:!1,westWater:!1,northRoad:!1,southRoad:!1,eastRoad:!1,westRoad:!1},X1={northWater:!1,southWater:!1,eastWater:!1,westWater:!1,northRoad:!0,southRoad:!0,eastRoad:!0,westRoad:!0};function Qi(i,e={}){return{x:0,y:0,terrain:"plains",biome:i,resource:null,improvement:null,hasRoad:!1,hasVillage:!1,cityId:null,isCityCenter:!1,unitId:null,...e}}function Su(i,e={}){return{id:`thumb_city_${i}`,name:"Citadel",ownerId:"thumb_owner",styleFaction:i,x:0,y:0,isCapital:!0,level:3,population:2,hasWorkshop:!1,hasWalls:!0,borderRadius:1,parks:0,pendingLevelRewards:[],connectedToCapital:!0,...e}}function q1(i){const e=[],t=[],n=new $e,s=fi(Qi(i,{terrain:"plains"}),1,Hs,!0);n.add(s.group);const r=nt[i].palette,a=ue("marble_masonry",{color:"#e7e2d5",roughness:.84,bumpScale:.025}),o=ht(r.accent,{metalness:.52,roughness:.34}),l=ue("foliage",{color:"#2ea874",roughness:.84,bumpScale:.024}),c=new et(.68,.74,.08,8);e.push(c);const d=new D(c,a);d.position.y=ae+.04,n.add(d);const u=new ce(.32,.34,.32);e.push(u);const h=new D(u,a);h.position.y=ae+.25,n.add(h);const f=new Et(.24,0);e.push(f);const g=new D(f,o);g.position.y=ae+.62,g.scale.set(.85,1.35,.85),n.add(g);const v=new Nn(.18,0);e.push(v);const m=[[-.48,-.48],[.48,-.48],[-.48,.48],[.48,.48]];for(const[p,y]of m){const w=new D(v,l);w.position.set(p,ae+.18,y),n.add(w)}return{object:n,ownGeometries:e,ownMaterials:t}}function Y1(i,e){const t=i.trim().toLowerCase();if(W1.has(t)){const s=t,a=Qi(e,{terrain:s==="ore"||s==="mithril"?"mountain":"plains",resource:s});return{object:fi(a,1,Hs,!0).group,ownGeometries:[],ownMaterials:[]}}if($1.has(t)){const s=t;let r="plains";s==="mine"?r="mountain":s==="sanctuary"?r="ancient_woods":s==="slag_pit"||s==="foundry"?r="wasteland":s==="great_forge"&&(r="plains");const a=Qi(e,{terrain:r,improvement:s});return{object:fi(a,1,Hs,!0).group,ownGeometries:[],ownMaterials:[]}}if(t==="road"||t==="roads"){const s=Qi(e,{terrain:"plains",hasRoad:!0});return{object:fi(s,1,X1,!0).group,ownGeometries:[],ownMaterials:[]}}if(t==="ancient_woods"||t==="plant_woods"){const s=Qi(e,{terrain:"ancient_woods"});return{object:fi(s,1,Hs,!0).group,ownGeometries:[],ownMaterials:[]}}if(t==="forest"||t==="chop_forest"){const s=Qi(e,{terrain:"forest"});return{object:fi(s,1,Hs,!0).group,ownGeometries:[],ownMaterials:[]}}if(t==="mountain"||t==="mountain_pass"){const s=Qi(e,{terrain:"mountain"});return{object:fi(s,1,Hs,!0).group,ownGeometries:[],ownMaterials:[]}}return t==="city_wall"||t==="walls"?{object:Yl(Su(e,{level:2,isCapital:!1,hasWalls:!0})),ownGeometries:[],ownMaterials:[]}:t==="park"?q1(e):{object:Yl(Su(e,{level:3,isCapital:!0,hasWalls:!0})),ownGeometries:[],ownMaterials:[]}}class is{static shared=null;renderer=null;scene=null;camera=null;cache=new Map;box=new dr;centerVec=new U;cornerVec=new U;static getShared(){return is.shared||(is.shared=new is),is.shared}static renderTechIcon(e,t){return is.getShared().renderTechIcon(e,t)}ensureInitialized(){if(this.renderer&&this.scene&&this.camera)return!0;if(typeof document>"u")return!1;try{const e=new Ah({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"default"});e.setPixelRatio(1),e.setSize(Mu,Mu,!1),e.setClearColor(0,0),e.toneMapping=oc,e.toneMappingExposure=1.08,e.outputColorSpace=en;const t=new vh,n=new Mh("#d6ebff","#586a85",.85);n.position.set(0,12,0),t.add(n);const s=new Za("#fff6e6",2.3);s.position.set(11,13,2),t.add(s);const r=new Za("#bdd6ff",.48);r.position.set(-9,7,-8),t.add(r);const a=new co(-1.2,1.2,1.2,-1.2,.1,50);return a.position.set(7.5,6.2,7.5),a.lookAt(0,0,0),a.updateMatrixWorld(!0),this.renderer=e,this.scene=t,this.camera=a,!0}catch{return!1}}renderTechIcon(e,t){const n=e.trim().toLowerCase();if(V1.has(n))return wc(n,t);const s=`${t}:${n}`,r=this.cache.get(s);if(r)return r;if(!this.ensureInitialized()||!this.renderer||!this.scene||!this.camera)return"";const a=Y1(e,t),o=new $e;o.add(a.object),this.scene.add(o),o.updateMatrixWorld(!0),this.box.setFromObject(o),this.box.getCenter(this.centerVec),a.object.position.sub(this.centerVec),o.updateMatrixWorld(!0),this.box.setFromObject(o);const l=this.camera.matrixWorldInverse;let c=.55;const d=[this.box.min.x,this.box.max.x],u=[this.box.min.y,this.box.max.y],h=[this.box.min.z,this.box.max.z];for(const v of d)for(const m of u)for(const p of h)this.cornerVec.set(v,m,p).applyMatrix4(l),c=Math.max(c,Math.abs(this.cornerVec.x),Math.abs(this.cornerVec.y));const f=c*1.14;this.camera.left=-f,this.camera.right=f,this.camera.top=f,this.camera.bottom=-f,this.camera.updateProjectionMatrix(),this.renderer.clear(),this.renderer.render(this.scene,this.camera);const g=this.renderer.domElement.toDataURL("image/png");this.scene.remove(o);for(const v of a.ownGeometries)v.dispose();for(const v of a.ownMaterials)v.dispose();return this.cache.set(s,g),g}clearCache(){this.cache.clear()}dispose(){this.cache.clear(),this.renderer&&(this.renderer.dispose(),this.renderer=null),this.scene=null,this.camera=null}}function K1(i,e){return is.renderTechIcon(i,e)}new xe("#7c8696");new xe("#5c6573");new ce(.115,.125,.165);new et(.2,.29,.62,6);new ce(.46,.125,.24);new Nn(.22,1);const j1=new pn(.47,.59,24);j1.rotateX(-Math.PI/2);const Z1=new Set(["warrior","defender","archer","rider","catapult","rohirrim_knight","uruk_berserker","elven_sentinel","ironbreaker"]);function J1(i){return Z1.has(i)}function Bh(i,e){return wc(i,e)}function bu(i){return i.iconKey}function eo(i,e,t="thumb-3d",n=""){const s=n.replace(/"/g,"&quot;");if(J1(i)){const r=Bh(i,e);return r?`<img class="${t} thumb-sprite" src="${r}" alt="${s}" draggable="false" />`:""}try{const r=K1(i,e);return r?`<img class="${t}" src="${r}" alt="${s}" draggable="false" />`:""}catch{return""}}function to(i,e,t,n="thumb-3d thumb-unit"){const s=Bh(i,e);if(!s)return t;const r=i.replace(/"/g,"&quot;");return`<img class="${n} thumb-sprite" src="${s}" alt="${r}" draggable="false" />`}const tn={humans:"#2356c9",orcs:"#c92a2a",elves:"#12805c",dwarves:"#d47415"},xu={humans:[{icon:"road",text:"+1 MOV on Roads"},{icon:"star",text:"+1★ Linked Cities"},{icon:"swords",text:"Sunmark Knight"}],orcs:[{icon:"swords",text:"+2★ Kill · +4★ Capture"},{icon:"star",text:"7★ Start & Pillage"},{icon:"axe",text:"Ironblood Berserker"}],elves:[{icon:"tree",text:"Free Forest Movement"},{icon:"star",text:"+1★ Ancient Woods"},{icon:"bow",text:"Elven Sentinel"}],dwarves:[{icon:"pickaxe",text:"Climb Peaks Turn 1"},{icon:"star",text:"+1★ Mountain Mines"},{icon:"shield",text:"Ironbreaker (20 HP)"}]},Tu=["#facc15","#fde047","#f59e0b","#38bdf8","#4ade80","#f87171","#fffbeb","#c084fc"];function Pt(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Eu(i){return Pt(i).replace(/★/g,Q("star","icon icon-xs icon-star"))}function Q1(i){const e=[];for(let n=0;n<36;n++){const s=(n*29+7)%98+1,r=(n*.37%4.2).toFixed(2),a=(3.4+n*.53%2.8).toFixed(2),o=((n%2===0?1:-1)*(18+n*17%44)).toFixed(0),l=(240+n*73%420).toFixed(0),c=n%3===0?10:7,d=n%3===0?14:n%2===0?10:7,u=n%4===0?i:Tu[n%Tu.length],h=n%5===0?"50%":"2px";e.push(`<span class="victory-confetti-piece" style="left:${s}%;width:${c}px;height:${d}px;border-radius:${h};background:${u};animation-delay:-${r}s;animation-duration:${a}s;--confetti-drift:${o}px;--confetti-rot:${l}deg;"></span>`)}return`<div class="victory-confetti-layer" aria-hidden="true">${e.join("")}</div>`}class eM{root;railEl;callbacks;selectedFaction="humans";difficulty="normal";mapSize=16;savedCampaign=null;dwarfResetTaps=0;lastDwarfTapMs=0;isResettingState=!1;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="title-screen",this.root.setAttribute("data-faction",this.selectedFaction),this.railEl=document.createElement("aside"),this.railEl.className="campaign-rail",this.railEl.setAttribute("aria-label","Campaign Setup"),this.root.appendChild(this.railEl),e.appendChild(this.root),this.render()}getSelectedFaction(){return this.selectedFaction}setSavedCampaign(e){this.savedCampaign=e,this.syncResumeBanner()}show(){this.dwarfResetTaps=0,this.lastDwarfTapMs=0,this.isResettingState=!1,this.root.classList.remove("hidden"),this.syncSelectionState()}hide(){this.root.classList.add("hidden")}destroy(){this.root.remove()}render(){this.root.setAttribute("data-faction",this.selectedFaction);const e=Kt.map(a=>{const o=nt[a],l=tn[a],c=this.selectedFaction===a;return`
        <button
          type="button"
          class="emblem-tab ${c?"selected":""}"
          data-faction-pick="${a}"
          style="--tab-accent: ${l};"
          aria-pressed="${c}"
        >
          <span class="emblem-tab-crest" style="background: ${l};">
            ${En(a)}
          </span>
          <span class="emblem-tab-name">${Pt(o.name)}</span>
        </button>
      `}).join(""),t=a=>{const o=nt[a],l=Bt[o.uniqueUnit],d=xu[a].map(h=>`
            <li class="tt-perk-item">
              <span class="tt-perk-icon" aria-hidden="true">${Q(h.icon,"icon")}</span>
              <span>${Eu(h.text)}</span>
            </li>
          `).join(""),u=to(l.type,a,Zs(l.type,"icon icon-lg"),"thumb-3d thumb-rail-unit");return`
        <div class="tt-champion-frame" title="${Pt(l.name)} (HP ${l.maxHp} · ATK ${l.attack} · DEF ${l.defense} · MOV ${l.movement})">
          ${u}
        </div>
        <div class="tt-showcase-copy">
          <div class="tt-showcase-realm">${Pt(o.realm)}</div>
          <ul class="tt-perk-list" aria-label="${Pt(o.name)} advantages">
            ${d}
          </ul>
        </div>
      `},n=this.difficulty==="easy"?"Squire":"Captain",s=`${this.mapSize}×${this.mapSize}`;this.railEl.innerHTML=`
      <header class="tt-title-banner">
        <h1 class="rail-title">Chronicles of Eldermere</h1>
      </header>
      <div class="tt-start-console">
        <div class="faction-emblem-strip" role="group" aria-label="Select Civilization">
          ${e}
        </div>

        <section
          class="tt-faction-showcase"
          data-showcase-active="true"
          aria-live="polite"
        >
          ${t(this.selectedFaction)}
        </section>

        <div class="tt-resume-slot hidden" data-resume-slot="true"></div>

        <div class="tt-start-actions">
          <button
            type="button"
            class="tt-cycle-btn"
            data-cycle-difficulty="true"
            title="Switch AI Difficulty (Squire / Captain)"
            aria-label="AI Difficulty: ${n}"
          >
            <span class="tt-cycle-medallion" aria-hidden="true">${Q("helm","icon")}</span>
            <span class="tt-cycle-label" data-difficulty-label="true">${n}</span>
          </button>

          <button
            type="button"
            class="tt-cycle-btn"
            data-cycle-mapsize="true"
            title="Switch Map Size (16×16 / 18×18)"
            aria-label="Map Size: ${s}"
          >
            <span class="tt-cycle-medallion" aria-hidden="true">${Q("mapGrid","icon")}</span>
            <span class="tt-cycle-label" data-mapsize-label="true">${s}</span>
          </button>

          <button type="button" class="tt-play-btn" data-action="begin">
            ${Q("playSword","icon")}
            <span data-begin-label="true">Play</span>
          </button>
        </div>
      </div>
    `,this.root.querySelectorAll("[data-faction-pick]").forEach(a=>{a.addEventListener("click",()=>{if(this.isResettingState)return;const o=a.dataset.factionPick;if(o)if(o!==this.selectedFaction&&(this.selectedFaction=o,this.callbacks.onSelectFaction?.(o),this.syncSelectionState()),o==="dwarves"&&yf()){const l=Date.now();l-this.lastDwarfTapMs>2500&&(this.dwarfResetTaps=0),this.dwarfResetTaps+=1,this.lastDwarfTapMs=l,this.dwarfResetTaps>=4&&(this.isResettingState=!0,this.dwarfResetTaps=0,$f(),this.savedCampaign=null,this.syncResumeBanner(),dt("capture"),_f())}else this.dwarfResetTaps=0,this.lastDwarfTapMs=0})}),this.root.querySelector("[data-cycle-difficulty]")?.addEventListener("click",()=>{this.difficulty=this.difficulty==="normal"?"easy":"normal",this.syncSelectionState()}),this.root.querySelector("[data-cycle-mapsize]")?.addEventListener("click",()=>{this.mapSize=this.mapSize===16?18:16,this.syncSelectionState()}),this.root.querySelector('[data-action="begin"]')?.addEventListener("click",()=>{this.callbacks.onStartGame({humanFaction:this.selectedFaction,difficulty:this.difficulty,mapSize:this.mapSize})})}syncSelectionState(){this.root.setAttribute("data-faction",this.selectedFaction),this.root.querySelectorAll("[data-faction-pick]").forEach(l=>{const c=l.dataset.factionPick===this.selectedFaction;l.classList.toggle("selected",c),l.setAttribute("aria-pressed",String(c))});const e=this.root.querySelector("[data-showcase-active]");if(e){const l=nt[this.selectedFaction],c=Bt[l.uniqueUnit],u=xu[this.selectedFaction].map(f=>`
            <li class="tt-perk-item">
              <span class="tt-perk-icon" aria-hidden="true">${Q(f.icon,"icon")}</span>
              <span>${Eu(f.text)}</span>
            </li>
          `).join(""),h=to(c.type,this.selectedFaction,Zs(c.type,"icon icon-lg"),"thumb-3d thumb-rail-unit");e.innerHTML=`
        <div class="tt-champion-frame" title="${Pt(c.name)} (HP ${c.maxHp} · ATK ${c.attack} · DEF ${c.defense} · MOV ${c.movement})">
          ${h}
        </div>
        <div class="tt-showcase-copy">
          <div class="tt-showcase-realm">${Pt(l.realm)}</div>
          <ul class="tt-perk-list" aria-label="${Pt(l.name)} advantages">
            ${u}
          </ul>
        </div>
      `}const t=this.difficulty==="easy"?"Squire":"Captain",n=this.root.querySelector("[data-difficulty-label]");n&&(n.textContent=t),this.root.querySelector("[data-cycle-difficulty]")?.setAttribute("aria-label",`AI Difficulty: ${t}`);const r=`${this.mapSize}×${this.mapSize}`,a=this.root.querySelector("[data-mapsize-label]");a&&(a.textContent=r),this.root.querySelector("[data-cycle-mapsize]")?.setAttribute("aria-label",`Map Size: ${r}`),this.syncResumeBanner()}syncResumeBanner(){const e=this.root.querySelector("[data-resume-slot]"),t=this.root.querySelector("[data-begin-label]");if(!e)return;if(!this.savedCampaign||!this.callbacks.onResumeGame){e.classList.add("hidden"),e.innerHTML="",t&&(t.textContent="Play");return}const n=this.savedCampaign,s=nt[n.faction],r=tn[n.faction],a=n.citiesCount===1?"1 City":`${n.citiesCount} Cities`;e.classList.remove("hidden"),e.innerHTML=`
      <div class="tt-resume-card">
        <div class="tt-resume-meta">
          <span class="tt-resume-crest" style="background: ${r};" aria-hidden="true">
            ${En(n.faction,"icon icon-crest-sm")}
          </span>
          <div class="tt-resume-text">
            <span class="tt-resume-title">${Pt(s.name)} · ${Pt(s.realm)}</span>
            <span class="tt-resume-sub">${Pt(a)} · ${n.score.toLocaleString()} Glory</span>
          </div>
        </div>
        <button type="button" class="tt-resume-btn" data-action="resume">
          <span>Resume</span>
          ${Q("chevronRight","icon icon-xs")}
        </button>
      </div>
    `,e.querySelector('[data-action="resume"]')?.addEventListener("click",()=>{this.callbacks.onResumeGame?.()}),t&&(t.textContent="New Game")}}class tM{root;callbacks;stage="celebration";lastData=null;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="screen-overlay gameover-screen hidden",e.appendChild(this.root)}show(e){this.lastData=e,this.stage="celebration",this.render(),this.root.classList.remove("hidden")}hide(){this.root.classList.add("hidden"),this.root.removeAttribute("data-stage"),this.root.removeAttribute("data-outcome")}destroy(){this.root.remove()}computeBreakdown(e,t){const n=e.players.find(c=>c.id===t),s=Object.values(e.cities).filter(c=>c.ownerId===t).length,r=Object.values(e.units).filter(c=>c.ownerId===t).length,a=n?n.techs.length:0,o=n?n.revealedTiles.filter(Boolean).length:0,l=n?n.score:0;return{cities:s,techs:a,units:r,revealedTiles:o,total:l}}formatWinSubtitle(e){return e.winReason==="domination"?"The Star-Crown Reunites — All Rival Capitals Claimed":"The Star-Crown Reunites — Eternal Glory"}render(){const e=this.lastData;if(!e)return;const{state:t,humanPlayerId:n}=e,s=t.players.find(a=>a.id===t.winnerId)??null,r=s!==null&&s.id===n;this.root.setAttribute("data-stage",this.stage),this.root.setAttribute("data-outcome",r?"victory":"defeat"),this.stage==="celebration"?this.renderCelebrationStage(e,r):this.renderScoresStage(e,r)}renderCelebrationStage(e,t){const{state:n,humanPlayerId:s}=e,r=n.players.find(f=>f.id===n.winnerId)??null,a=n.players.find(f=>f.id===s)??null,o=r?.faction??"humans",l=a?.faction??"humans",c=nt[o],d=tn[o],u=this.formatWinSubtitle(n);t?this.root.innerHTML=`
        <div class="victory-curtain" style="--winner-heraldry: ${d};">
          <div class="victory-sunburst" aria-hidden="true"></div>
          ${Q1(d)}

          <div class="victory-stage">
            <div class="victory-faction-pill">
              <span class="victory-pill-crest" style="background: ${d};">
                ${En(o,"icon")}
              </span>
              <span>${Pt(c.name)} &middot; ${Pt(c.realm)}</span>
            </div>

            <h2 class="victory-headline">VICTORY!</h2>
            <p class="victory-subtitle">${Pt(u)}</p>

            <div class="alderwick-endgame-host" data-alderwick-host></div>
          </div>
        </div>
      `:this.root.innerHTML=`
        <div class="defeat-curtain" style="--winner-heraldry: ${d};">
          <div class="defeat-glow" aria-hidden="true"></div>

          <div class="defeat-stage">
            <div class="gameover-badge defeat">
              ${Q("skull","icon icon-sm")}
              <span>Chronicle Fallen</span>
            </div>

            <div class="defeat-victor-emblem">
              <span class="defeat-victor-crest" style="background: ${d};">
                ${En(o,"icon victory-crest-icon")}
              </span>
              <span class="defeat-victor-crown">${Q("crown","icon icon-sm")}</span>
            </div>

            <h2 class="defeat-headline">DEFEAT</h2>
            <p class="defeat-victor-line">
              ${r?`${Pt(c.name)} Claimed the Star-Crown`:"The Age Concludes"}
            </p>
            <p class="victory-subtitle">${Pt(u)}</p>

            <div class="alderwick-endgame-host" data-alderwick-host></div>
          </div>
        </div>
      `;const h=this.root.querySelector("[data-alderwick-host]");if(h){const f=t?df[o]:hf(l,r?.faction??null);Wa(h,[{pose:t?"cheer":"console",bodyHtml:`
              <p class="alderwick-bubble-lead">${Pt(f.alderwickQuote)}</p>
              <p class="alderwick-bubble-narration">${Pt(f.epilogue)}</p>
            `,actionLabel:"View Final Scores"}],()=>{this.stage="scores",this.render()},"is-inline")}}renderScoresStage(e,t){const{state:n,humanPlayerId:s,scoreBreakdowns:r}=e,a=n.players.find(h=>h.id===n.winnerId)??null,o=a?nt[a.faction]:null,l=this.formatWinSubtitle(n),d=[...n.players].sort((h,f)=>h.id===n.winnerId?-1:f.id===n.winnerId?1:f.score-h.score).map((h,f)=>{const g=nt[h.faction],v=tn[h.faction],m=r?.[h.id]??this.computeBreakdown(n,h.id),p=h.id===n.winnerId,y=h.id===s;return`
          <tr class="${p?"winner-row":""} ${y?"human-row":""}">
            <td class="num">#${f+1}</td>
            <td>
              <span class="faction-dot" style="background: ${v}; margin-right: 6px;"></span>
              ${Pt(g.name)}${y?" (You)":""}
              ${p?Q("crown","icon icon-sm icon-star"):""}
            </td>
            <td class="col-fate">${h.alive?"Standing":"Fallen"}</td>
            <td class="num">${m.cities}</td>
            <td class="num col-lore">${m.techs}</td>
            <td class="num score-total">${m.total.toLocaleString()}</td>
          </tr>
        `}).join("");this.root.innerHTML=`
      <div class="gameover-panel gameover-scores-panel">
        <div class="gameover-badge ${t?"victory":"defeat"}">
          ${Q(t?"crown":"skull","icon icon-sm")}
          <span>${t?"Chronicle Triumphant":"Chronicle Sealed"}</span>
        </div>
        <h2 class="gameover-title">
          ${o?`${Pt(o.name)} Claim the Star-Crown`:"The Age Concludes"}
        </h2>
        <p class="gameover-reason">
          ${Pt(l)}
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
              ${d}
            </tbody>
          </table>
        </div>

        <p class="gameover-chronicle-footnote">
          ${Q("star","icon icon-xs icon-star")}
          <span>Recorded in the Great Ledger by ${js}</span>
        </p>

        <button type="button" class="btn btn-cta btn-begin" data-action="play-again">
          <span>New Campaign</span>
          ${Q("chevronRight","icon")}
        </button>
      </div>
    `,this.root.querySelector('[data-action="play-again"]')?.addEventListener("click",()=>{this.callbacks.onPlayAgain()})}}class nM{root;callbacks;openState=!1;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="alderwick-stage-backdrop resignation-screen hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Campaign Resigned"),e.appendChild(this.root)}isOpen(){return this.openState}show(e){this.openState=!0,this.render(e),this.root.classList.remove("hidden")}hide(){this.openState=!1,this.root.classList.add("hidden"),this.root.innerHTML=""}destroy(){this.root.remove()}render(e){const t=nt[e.faction],n=tn[e.faction],s=ff[e.faction];Wa(this.root,[{pose:"console",headerHtml:`
            <span class="resignation-bubble-crest" style="background: ${n};" aria-hidden="true">
              ${En(e.faction,"icon")}
            </span>
            <strong class="resignation-bubble-title">A Chapter Set Aside</strong>
            <span class="resignation-bubble-realm">${Pt(t.name)} &middot; ${Pt(t.realm)}</span>
          `,bodyHtml:`
            <p class="alderwick-bubble-lead">${Pt(s.alderwickQuote)}</p>
            <p class="alderwick-bubble-narration">${Pt(s.epilogue)}</p>
            <div class="resignation-stats-grid" role="list" aria-label="Campaign Summary">
              <div class="resignation-stat-card" role="listitem">
                <span class="resignation-stat-label">Age Reached</span>
                <strong class="resignation-stat-val">Age ${xn[e.age??1]}</strong>
              </div>
              <div class="resignation-stat-card" role="listitem">
                <span class="resignation-stat-label">Cities</span>
                <strong class="resignation-stat-val">${e.citiesCount}</strong>
              </div>
              <div class="resignation-stat-card" role="listitem">
                <span class="resignation-stat-label">Glory Score</span>
                <strong class="resignation-stat-val">${e.score.toLocaleString()}</strong>
              </div>
            </div>
          `,actionLabel:"Return to Title"}],()=>{this.hide(),this.callbacks.onReturnToTitle()},"is-resign")}}function iM(i,e){const t=e?.trim();if(t)return/eclipse/i.test(t)?"Eclipse":/volcano|eruption|doom/i.test(t)?"Volcano":/dragon|wyrm|drake/i.test(t)?"Dragon":/tower|beacon|citadel/i.test(t)?"Tower":t.length<=10?t:t.split(/\s+/)[0]||t;switch(i){case"humans":return"Tower";case"orcs":return"Volcano";case"elves":return"Eclipse";case"dwarves":return"Dragon"}}function Da(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class sM{root;aiBanner;callbacks;lastBannerKey=null;lastBarKey=null;constructor(e,t){this.callbacks=t,this.root=document.createElement("header"),this.root.className="top-bar hidden",e.appendChild(this.root),this.aiBanner=document.createElement("div"),this.aiBanner.className="ai-turn-floating hidden",e.appendChild(this.aiBanner)}show(){this.root.classList.remove("hidden")}hide(){this.root.classList.add("hidden"),this.aiBanner.classList.add("hidden"),this.lastBannerKey=null,this.lastBarKey=null}update(e){this.render(e)}destroy(){this.root.remove(),this.aiBanner.remove()}render(e){const t=nt[e.activePlayer.faction],n=tn[e.player.faction],s=tn[e.activePlayer.faction],r=e.isHumanTurn?"human":`ai:${e.activePlayer.id}:${e.activePlayer.faction}`;r!==this.lastBannerKey&&(this.lastBannerKey=r,e.isHumanTurn?(this.aiBanner.classList.add("hidden"),this.aiBanner.innerHTML=""):(this.aiBanner.classList.remove("hidden"),this.aiBanner.innerHTML=`
          <div class="ai-turn-banner" style="--ai-color: ${s};">
            <span class="faction-dot" style="background: ${s};"></span>
            <span>${Da(t.name)}</span>
            <span class="ai-turn-dots" aria-hidden="true"><span></span><span></span><span></span></span>
          </div>
        `));const a=e.age??kn(e.player),o=e.techCount??e.player.techs.length,l=Math.max(0,Math.min(7,o)),c=!!e.superpowerUsed,d=c?0:Math.min(1,l/7),u=!!e.superpowerTargeting,h=!!(e.canUseSuperpower&&!c),f=(h||u)&&!c,g=l===6&&!c&&!f,v=`Age ${xn[a]}`,m=u?"Cancel":iM(e.player.faction,e.superpowerName),p=u?"Cancel superpower targeting":f?`Activate ${e.superpowerName??m}`:`${v} (${l}/7 to ${m}) — Open Codex`,y=2*Math.PI*25,w=(y*(1-(f?1:d))).toFixed(1),_=[e.player.faction,e.player.score,e.player.gold,e.player.goldPerTurn,a,l,h?1:0,c?1:0,u?1:0,e.superpowerName??""].join("|");if(_===this.lastBarKey)return;this.lastBarKey=_;const b=u?"is-targeting":f?"is-ready":c?"is-spent":g?"is-almost":"is-dormant",T=u?"CANCEL":f?"READY":`AGE ${xn[a]}`,x=`
      <div class="sp-round-wrap ${b}">
        <svg class="sp-ring-svg" viewBox="0 0 58 58" aria-hidden="true">
          <circle class="sp-ring-bg" cx="29" cy="29" r="25" />
          <circle
            class="sp-ring-fg"
            cx="29"
            cy="29"
            r="25"
            stroke-dasharray="${y.toFixed(1)}"
            stroke-dashoffset="${w}"
          />
        </svg>
        <button
          type="button"
          class="sp-round-btn ${b}"
          data-action="${f?"superpower":"codex"}"
          title="${Da(p)}"
          aria-label="${Da(p)}"
        >
          <span class="sp-btn-gloss" aria-hidden="true"></span>
          ${f&&!u?'<span class="sp-btn-sweep" aria-hidden="true"></span>':""}
          ${u?Q("close","icon sp-round-icon"):ic(e.player.faction,"icon sp-round-icon")}
        </button>
        <span class="sp-round-badge ${b}">${Da(T)}</span>
      </div>
    `;this.root.innerHTML=`
      <div class="top-cluster top-cluster-left">
        <button
          type="button"
          class="top-pill top-pill-leaderboard top-pill-merged"
          data-action="leaderboard"
          title="Realm Standings &amp; Civilization Info"
          aria-label="Open Realm Standings — Glory Score ${e.player.score}"
        >
          <span class="faction-crest-badge top-crest-badge" style="background: ${n};">
            ${En(e.player.faction,"icon icon-crest-sm")}
          </span>
          ${Q("trophy","icon icon-sm icon-star")}
          <span class="top-glory-val">${e.player.score.toLocaleString()}</span>
        </button>
      </div>

      <div class="top-cluster top-cluster-center">
        ${x}
      </div>

      <div class="top-cluster top-cluster-right">
        <div class="top-pill top-pill-stars" title="Stars &amp; income per turn">
          ${Q("star","icon icon-star")}
          <span class="top-stars-val">${e.player.gold}</span>
          <span class="top-stars-delta">(+${e.player.goldPerTurn})</span>
        </div>
      </div>
    `,this.root.querySelector('[data-action="leaderboard"]')?.addEventListener("click",()=>{this.callbacks.onOpenLeaderboard?.()}),this.root.querySelector('[data-action="codex"]')?.addEventListener("click",()=>{this.callbacks.onOpenCodex?.()}),this.root.querySelector('[data-action="superpower"]')?.addEventListener("click",()=>{this.callbacks.onActivateSuperpower?.()})}}const rM={berries:"Berries",game:"Game",ore:"Ore",mithril:"Starsteel",ruins:"Ruins"},Au={harvest_berries:"berries",harvest_game:"game",harvest_ore:"ore",harvest_mithril:"mithril",build_farm:"farm",build_windmill:"windmill",build_slag_pit:"slag_pit",build_foundry:"foundry",build_sanctuary:"sanctuary",build_mine:"mine",build_great_forge:"great_forge",build_road:"road",plant_ancient_woods:"ancient_woods"};function Ln(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function aM(i,e){const t=e>0?i/e:0;return t<=.35?"low":t<=.65?"mid":""}function Jo(i){if(i.id==="capture-city")return i.label.toLowerCase().includes("village")?"Claim":"Capture";if(i.id==="explore-ruins")return"Explore";if(i.id==="recover")return"Heal";if(i.id==="promote")return"Promote";if(i.id==="build_road")return"Road";if(i.id==="chop_forest")return"Chop";if(i.id==="plant_ancient_woods")return"Woods";if(i.id.startsWith("harvest_"))return i.label.replace(/^Harvest\s+/i,"");if(i.id.startsWith("build_"))return i.label.replace(/^Build\s+/i,"");if(i.unitType)switch(i.unitType){case"rohirrim_knight":return"Sunmark";case"uruk_berserker":return"Berserker";case"elven_sentinel":return"Sentinel";default:return i.label}return i.label}function oM(i,e){if(!e)return"Wait";if(i.enabled)return null;const t=i.disabledReason??"";if(!t)return"Locked";if(/next turn/i.test(t))return"Next Turn";if(/full hp/i.test(t))return"Full HP";if(/already acted/i.test(t))return"Acted";if(/already veteran/i.test(t))return"Veteran";if(/kills:/i.test(t))return t.replace(/Kills:\s*/i,"Kills ");if(/occupied/i.test(t))return"Occupied";if(/cap reached/i.test(t))return"Cap Full";if(/outside.*border/i.test(t))return"Borders";if(/enemy territory/i.test(t))return"Enemy";const n=t.match(/Need\s+(\d+★)/i);return n?`Need ${n[1]}`:/requires/i.test(t)?"Locked":t.length>12?`${t.slice(0,11)}…`:t}class lM{root;callbacks;constructor(e,t){this.callbacks=t,this.root=document.createElement("section"),this.root.className="bottom-hud-wrapper hidden",this.root.setAttribute("aria-label","Game actions"),e.appendChild(this.root)}show(){this.root.classList.remove("hidden")}hide(){this.root.classList.add("hidden")}update(e){this.root.classList.remove("hidden"),this.render(e)}destroy(){this.root.remove()}render(e){const t=e.combatPreview?this.renderCombatStrip(e.combatPreview):"",s=!!(e.selectedUnit||e.selectedCity||e.selectedTile)?this.renderSelectionDrawer(e):this.renderIdleBar(e);this.root.innerHTML=`${t}${s}`,this.bindEvents(e)}renderIdleBar(e){const t=e.hasAffordableTech&&e.affordableTechCount>0?`<span class="tt-dock-badge">${e.affordableTechCount}</span>`:"",n=e.isHumanTurn&&e.allUnitsActed;return`
      <div class="idle-bottom-bar" role="toolbar" aria-label="Turn controls">
        <button
          type="button"
          class="tt-dock-btn tt-dock-btn-codex idle-codex-btn"
          data-idle-action="tech"
          title="Open Tech Codex"
          aria-label="Open Tech Codex"
        >
          <span class="tt-dock-medallion" aria-hidden="true">
            ${mf(e.playerFaction,"icon")}
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
            ${gf(e.playerFaction,"icon")}
          </span>
          <span class="tt-dock-label">${e.isHumanTurn?"End Turn":"Rival Turn"}</span>
        </button>
      </div>
    `}renderCombatStrip(e){const{preview:t,attacker:n,attackerOwner:s,defender:r,defenderOwner:a}=e,o=Bt[n.type],l=Bt[r.type],c=tn[a.faction],d=Math.max(0,r.hp-t.attackerDamage),u=Math.max(0,n.hp-t.retaliationDamage),h=t.defenderKilled,f=!h&&t.attackerKilled;let g="";h?g=`<span class="combat-strip-badge lethal">${Q("skull","icon icon-sm")} LETHAL</span>`:f?g=`<span class="combat-strip-badge fatal">${Q("skull","icon icon-sm")} FATAL</span>`:t.retaliationDamage===0&&(g='<span class="combat-strip-badge safe">SAFE</span>');let v="";return h&&s.faction==="orcs"?v=`<span class="combat-strip-bonus">+${s.techs.includes("orcs_spoils_mastery")?3:2}${Q("star","icon icon-sm icon-star")}</span>`:h&&o.traits.includes("persist")&&!l.traits.includes("stalwart")&&(v='<span class="combat-strip-bonus">Persist</span>'),`
      <div class="combat-strip ${h?"is-lethal":""} ${f?"is-fatal-counter":""}" role="status">
        <span class="combat-strip-unit">
          <span class="combat-strip-name">${Ln(Jo({id:"",label:o.name,unitType:n.type}))}</span>
          <span class="combat-strip-hp ${u<n.hp?"damaged":""}">${n.hp}&rarr;${u}</span>
        </span>
        <span class="combat-strip-vs" aria-hidden="true">${Q("swords","icon icon-sm")}</span>
        <span class="combat-strip-unit">
          <span class="faction-dot" style="background: ${c};"></span>
          <span class="combat-strip-name">${Ln(Jo({id:"",label:l.name,unitType:r.type}))}</span>
          <span class="combat-strip-hp ${h?"slain":""}">${r.hp}&rarr;${d}</span>
        </span>
        ${g}
        ${v}
      </div>
    `}renderSelectionDrawer(e){const t=e.selectionLayer==="unit"&&e.selectedUnit!==null,n=!t&&e.selectedCity!==null,s=!t&&!n&&e.selectedTile!==null;let r="",a="",o="";if(t&&e.selectedUnit){const{unit:c,owner:d,isOwnedByHuman:u}=e.selectedUnit,h=Bt[c.type],f=tn[d.faction],g=e.selectedUnit.effectiveAttack??h.attack,v=e.selectedUnit.effectiveDefense??h.defense,m=Math.max(0,Math.min(100,c.hp/c.maxHp*100)),p=[`HP ${c.hp}/${c.maxHp}`,`ATK ${g}`,`DEF ${v}`];if(h.range>1&&p.push(`RNG ${h.range}`),r=`
        <span class="faction-dot" style="background: ${f};"></span>
        <span class="drawer-title">${Ln(h.name)}${c.isVeteran?` ${Q("crown","icon icon-sm icon-star")}`:""}</span>
        <span class="drawer-stats">${Ln(p.join(" · "))}</span>
      `,a=`
        <div class="drawer-hairline-progress">
          <div class="progress-bar-fill hp ${aM(c.hp,c.maxHp)}" style="width: ${m}%;"></div>
        </div>
      `,u&&e.selectedUnit.actions.length>0){const y=_=>_==="capture-city"||_==="explore-ruins";o=`
          <div class="action-tile-row" role="list">
            ${[...e.selectedUnit.actions].sort((_,b)=>y(_.id)&&!y(b.id)?-1:!y(_.id)&&y(b.id)?1:0).map(_=>this.renderActionTile(_,"unit",e.isHumanTurn,d.faction)).join("")}
          </div>
        `}}else if(n&&e.selectedCity){const{city:c,owner:d,isOwnedByHuman:u,popNeeded:h,income:f,unitCount:g,unitCap:v}=e.selectedCity,m=tn[d.faction],p=Math.max(0,Math.min(100,c.population/Math.max(1,h)*100));r=`
        <span class="faction-dot" style="background: ${m};"></span>
        <span class="drawer-title">${Ln(c.name)}</span>
        <span class="drawer-stats">Lv ${c.level} &middot; Pop ${c.population}/${h} &middot; +${f}★ &middot; ${g}/${v}</span>
      `,a=`
        <div class="drawer-hairline-progress">
          <div class="progress-bar-fill pop" style="width: ${p}%;"></div>
        </div>
      `,u&&e.selectedCity.trainOptions.length>0&&(o=`
          <div class="action-tile-row" role="list">
            ${e.selectedCity.trainOptions.map(y=>this.renderActionTile(y,"city",e.isHumanTurn,d.faction)).join("")}
          </div>
        `)}else if(s&&e.selectedTile){const{tile:c,terrainName:d,defenseBonus:u}=e.selectedTile,h=[];if(u>1){const f=`${u.toFixed(2).replace(/\.00$/,".0").replace(/\.50$/,".5")}x`;h.push(`DEF ${f}`)}c.resource?h.push(rM[c.resource]??c.resource):c.improvement?h.push(zi[c.improvement]?.name??c.improvement):c.hasVillage?h.push("Village"):c.hasRoad&&h.push("Road"),r=`
        <span class="drawer-title">${Ln(d)}</span>
        ${h.length>0?`<span class="drawer-stats">${Ln(h.join(" · "))}</span>`:""}
      `,e.selectedTile.actions.length>0&&(o=`
          <div class="action-tile-row" role="list">
            ${e.selectedTile.actions.map(f=>this.renderActionTile(f,"tile",e.isHumanTurn,e.playerFaction)).join("")}
          </div>
        `)}const l=this.callbacks.onDeselect?`<button type="button" class="drawer-close-btn" data-action-close="true" title="Close (Esc)" aria-label="Close selection">${Q("close","icon icon-sm")}</button>`:"";return`
      <div class="selection-drawer ${o?"has-actions":"header-only"}">
        <div class="drawer-header">
          <div class="drawer-header-info">
            ${r}
          </div>
          <div class="drawer-header-controls">
            ${l}
          </div>
        </div>
        ${a}
        ${o}
      </div>
    `}renderActionTile(e,t,n,s){const r=n&&e.enabled&&!!e.action,a=!!(!e.enabled&&e.requiredTechId&&n),o=r||a,l=e.id==="capture-city"||e.id==="explore-ruins",c=e.id==="explore-ruins",d=!!(e.unitType&&Bt[e.unitType]?.faction!==null),u=Jo(e),h=a?null:oM(e,n);let f;e.unitType?f=to(e.unitType,s,Zs(e.unitType,"icon icon-lg"),"thumb-3d thumb-tile-action"):Au[e.id]?f=eo(Au[e.id],s,"thumb-3d thumb-tile-action",u)||sl(e.icon,"icon icon-lg",e.id):f=sl(e.icon,"icon icon-lg",e.id);let g="";!a&&e.cost!==void 0&&e.cost>0?g=`<span class="tile-cost-pill">${e.cost}${Q("star","icon icon-xs icon-star")}</span>`:!a&&e.id==="chop_forest"&&(g=`<span class="tile-cost-pill gain">+2${Q("star","icon icon-xs icon-star")}</span>`);const v=e.requiredTechId?Ct[e.requiredTechId]?.name??e.requiredTechId:null,m=a&&v?`${e.label} — Tap to unlock ${v}`:h?`${e.label} (${e.disabledReason??h})`:`${e.label}: ${e.description}`,p=["action-tile",l?"is-capture":"",c?"is-ruins":"",d?"is-unique":"",a?"is-tech-locked":r?"":"is-disabled"].filter(Boolean).join(" "),y=a?`<span class="action-tile-lock is-unlock">${Q("codex","icon icon-xs")}<span>Unlock</span></span>`:h?`<span class="action-tile-lock">${Ln(h)}</span>`:"";return`
      <button
        type="button"
        class="${p}"
        data-action-scope="${t}"
        data-action-id="${Ln(e.id)}"
        ${a&&e.requiredTechId?`data-unlock-tech="${Ln(e.requiredTechId)}"`:""}
        title="${Ln(m)}"
        ${o?"":"disabled"}
      >
        ${g}
        <span class="action-tile-visual" aria-hidden="true">${f}</span>
        <span class="action-tile-label">${Ln(u)}</span>
        ${y}
      </button>
    `}bindEvents(e){if(this.root.querySelector('[data-idle-action="tech"]')?.addEventListener("click",()=>{this.callbacks.onOpenTech?.()}),this.root.querySelector('[data-idle-action="superpower"]')?.addEventListener("click",()=>{e.isHumanTurn&&this.callbacks.onActivateSuperpower?.()}),this.root.querySelector('[data-idle-action="next-ready"]')?.addEventListener("click",()=>{this.callbacks.onNextReadyUnit?.()}),this.root.querySelector('[data-idle-action="end-turn"]')?.addEventListener("click",()=>{e.isHumanTurn&&this.callbacks.onEndTurn?.()}),this.root.querySelector("[data-action-close]")?.addEventListener("click",()=>{this.callbacks.onDeselect?.()}),!e.isHumanTurn)return;const t=new Map((e.selectedUnit?.actions??[]).map(r=>[r.id,r])),n=new Map((e.selectedCity?.trainOptions??[]).map(r=>[r.id,r])),s=new Map((e.selectedTile?.actions??[]).map(r=>[r.id,r]));this.root.querySelectorAll("[data-action-scope]").forEach(r=>{r.addEventListener("click",()=>{if(r.disabled)return;const a=r.dataset.unlockTech;if(a){this.callbacks.onUnlockTech?.(a);return}const o=r.dataset.actionScope,l=r.dataset.actionId;if(!o||!l)return;let c;o==="unit"?c=t.get(l):o==="city"?c=n.get(l):o==="tile"&&(c=s.get(l)),c&&c.enabled&&c.action&&this.callbacks.onAction(c.action)})})}}function Sn(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function xr(i){return Sn(i).replace(/★/g,Q("star","icon icon-xs icon-star"))}function Ru(i,e,t){const n=i.tier===1?3:i.tier===2?5:8,s=Math.max(0,t-1),r=e.techs.includes("elves_elven_lore")?1:0;return Math.max(2,n+s-r)}function cM(i){return i.split(/\s*&\s*/)[0]||i}function ka(i,e){return i.prerequisites.every(t=>e.has(t))}class dM{root;callbacks;openState=!1;activePillarIndex=0;pendingTechId=null;blockedTechId=null;lastVm=null;onKeyDown;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop tech-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Tech Codex"),e.appendChild(this.root),this.root.addEventListener("click",n=>{n.target===this.root&&(this.pendingTechId||this.blockedTechId?this.dismissSubDialog():this.close())}),this.onKeyDown=n=>{n.key==="Escape"&&this.openState&&(this.pendingTechId||this.blockedTechId?(n.stopPropagation(),this.dismissSubDialog()):this.close())},window.addEventListener("keydown",this.onKeyDown)}isOpen(){return this.openState}open(e){if(this.openState=!0,this.pendingTechId=null,this.blockedTechId=null,this.lastVm=e,e.tutorialTargetTechId){const t=Ct[e.tutorialTargetTechId];t&&t.faction===e.player.faction&&(this.activePillarIndex=t.pillarIndex)}this.render(e),this.root.classList.remove("hidden"),this.restoreCarouselPosition(!1)}openToTech(e,t){this.openState=!0,this.pendingTechId=null,this.blockedTechId=null,this.lastVm=e;const n=Ct[t];if(n&&n.faction===e.player.faction){this.activePillarIndex=n.pillarIndex;const s=new Set(e.player.techs),r=kn(e.player),a=e.techCosts?.[n.id]??Ru(n,e.player,e.cityCount);!!!(e.tutorialTargetTechId&&e.tutorialTargetTechId!==n.id)&&e.isHumanTurn&&!s.has(n.id)&&r>=n.tier&&ka(n,s)&&e.player.gold>=a?this.pendingTechId=t:this.blockedTechId=t}this.render(e),this.root.classList.remove("hidden"),this.restoreCarouselPosition(!1)}update(e){this.lastVm=e,this.openState&&(this.render(e),this.restoreCarouselPosition(!1))}close(){this.openState&&(this.openState=!1,this.pendingTechId=null,this.blockedTechId=null,this.root.classList.add("hidden"),this.callbacks.onClose())}destroy(){window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}dismissSubDialog(){!this.pendingTechId&&!this.blockedTechId||(this.pendingTechId=null,this.blockedTechId=null,this.openState&&this.lastVm&&(this.render(this.lastVm),this.restoreCarouselPosition(!1)))}computeBlockReason(e,t,n,s,r){const{player:a,isHumanTurn:o,state:l}=e;if(r.has(t.id))return"Already researched.";if(!o)return"Wait for your turn to research technologies.";if(e.tutorialTargetTechId&&e.tutorialTargetTechId!==t.id)return`Complete the tutorial step by researching ${Ct[e.tutorialTargetTechId]?.name??"the highlighted technology"} first.`;if(t.tier>s){const d=Math.max(1,Ks[t.tier]-a.techs.length);return`Requires Age ${xn[t.tier]} — research ${d} more ${d===1?"technology":"technologies"} to advance to Age ${xn[t.tier]}.`}const c=t.prerequisites.filter(d=>!r.has(d));if(c.length>0)return`Requires ${c.map(u=>Ct[u]?.name??u).join(" & ")} first.`;if(a.gold<n)return`Need ${n}★ (you have ${a.gold}★).`;if(l){const d=Zh(l,a.id,t.id);if(d)return d}return"Cannot research right now."}render(e){const{player:t,cityCount:n,isHumanTurn:s,techCosts:r}=e,a=e.tutorialTargetTechId??null,o=nt[t.faction],l=tn[t.faction],c=ti(t.faction),d=c.length,u=new Set(t.techs),h=kn(t),f=jh(t),g=x=>r?.[x.id]??Ru(x,t,n),m=[0,1,2,3].map(x=>{const E=c.filter(H=>H.pillarIndex===x);if(E.length===0)return null;const M=E.find(H=>H.slot==="root")??null,S=E.find(H=>H.slot==="a")??null,A=E.find(H=>H.slot==="b")??null,I=E.find(H=>H.slot==="capstone")??null,P=E.filter(H=>u.has(H.id)).length,F=s&&E.some(H=>(!a||H.id===a)&&!u.has(H.id)&&H.tier<=h&&ka(H,u)&&t.gold>=g(H));return{index:x,name:E[0].pillar,shortName:cM(E[0].pillar),root:M,branchA:S,branchB:A,capstone:I,techs:E,researchedCount:P,hasAffordable:F}}).filter(x=>x!==null);this.activePillarIndex>=m.length&&(this.activePillarIndex=0);const p=`
      <div class="tech-pillar-nav" role="tablist" aria-label="Codex Pillars">
        <button
          type="button"
          class="tech-carousel-arrow tech-carousel-prev"
          data-carousel-prev
          aria-label="Previous pillar"
          title="Previous pillar"
          ${this.activePillarIndex===0?"disabled":""}
        >&lsaquo;</button>
        <div class="tech-pillar-pills">
          ${m.map((x,E)=>`
                <button
                  type="button"
                  class="tech-pillar-pill ${E===this.activePillarIndex?"active":""} ${x.hasAffordable?"has-affordable":""}"
                  data-pillar-jump="${E}"
                  role="tab"
                  aria-selected="${E===this.activePillarIndex}"
                >
                  <span class="tech-pillar-pill-label">${Sn(x.shortName)}</span>
                  ${x.hasAffordable?'<span class="tech-pillar-dot" aria-hidden="true"></span>':""}
                </button>
              `).join("")}
        </div>
        <button
          type="button"
          class="tech-carousel-arrow tech-carousel-next"
          data-carousel-next
          aria-label="Next pillar"
          title="Next pillar"
          ${this.activePillarIndex>=m.length-1?"disabled":""}
        >&rsaquo;</button>
      </div>
    `,y=m.map(x=>this.renderPillar(x,g,t,h,u,s,a)).join("");let w=null;if(this.pendingTechId){const x=Ct[this.pendingTechId];x&&x.faction===t.faction&&(!a||x.id===a)&&!u.has(x.id)&&x.tier<=h&&ka(x,u)&&s&&t.gold>=g(x)?w=x:this.pendingTechId=null}let _=null;if(!w&&this.blockedTechId){const x=Ct[this.blockedTechId];x&&x.faction===t.faction?_=x:this.blockedTechId=null}const b=w?this.renderConfirmDialog(w,g(w),t):_?this.renderRequirementsDialog(_,g(_),t,this.computeBlockReason(e,_,g(_),h,u)):"",T=f.nextAge!==null&&f.requiredTechs!==null?`${f.currentTechs}/${f.requiredTechs} to Age ${xn[f.nextAge]}`:`${t.techs.length}/${d} Lore`;this.root.innerHTML=`
      <div class="modal-panel tech-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="modal-header">
          <div class="modal-title-wrap">
            <h2 class="modal-title">
              <span class="faction-crest-badge" style="background: ${l}; width: 28px; height: 28px;">
                ${En(t.faction,"icon icon-crest-sm")}
              </span>
              <span>${Sn(o.name)} Codex</span>
              <span class="tech-age-pill">${Q("codex","icon icon-xs")}<span>Age ${xn[h]}</span></span>
            </h2>
            <span class="modal-subtitle">
              <strong class="gold-text">${t.gold}${Q("star","icon icon-sm icon-star")}</strong>
              <span>&middot;</span>
              <span class="tech-age-progress">${Sn(T)}</span>
            </span>
          </div>
          <button type="button" class="btn btn-icon modal-close-btn" data-action="close" aria-label="Close Codex">
            ${Q("close","icon")}
          </button>
        </div>

        ${p}

        <div class="tech-tree-grid tech-carousel" data-tech-carousel>
          ${y}
        </div>

        ${b}
      </div>
    `,this.bindEvents()}renderTechDialogIcon(e,t){const n=bu(e),s=eo(n,t.faction,"thumb-3d thumb-confirm",e.name);return s||(e.unlocksUnits.length>0?Zs(e.unlocksUnits[0],"icon icon-lg"):e.unlocksImprovements.length>0?Q("tower","icon icon-lg"):e.unlocksResources.length>0?Q("leaf","icon icon-lg"):e.tier===3?Q("crown","icon icon-lg"):Q("codex","icon icon-lg"))}renderConfirmDialog(e,t,n){const s=Math.max(0,n.gold-t),r=e.tier===3?"Age III · Capstone":`Age ${xn[e.tier]}`;return`
      <div class="tech-confirm-scrim" data-confirm-scrim role="alertdialog" aria-modal="true" aria-label="Confirm Research">
        <div class="tech-confirm-card">
          <div class="tech-confirm-top">
            <div class="tech-confirm-thumb" aria-hidden="true">${this.renderTechDialogIcon(e,n)}</div>
            <div class="tech-confirm-copy">
              <div class="tech-confirm-kicker">${Sn(e.pillar)} &middot; ${r}</div>
              <h3 class="tech-confirm-title">Research ${Sn(e.name)}?</h3>
              <p class="tech-confirm-summary">${xr(e.summary)}</p>
            </div>
          </div>
          <div class="tech-confirm-cost-row">
            <span class="tech-confirm-cost-label">Cost</span>
            <span class="tech-confirm-cost-val">
              <strong>${t}${Q("star","icon icon-sm icon-star")}</strong>
              <span class="tech-confirm-balance">(${n.gold} &rarr; ${s}${Q("star","icon icon-xs icon-star")})</span>
            </span>
          </div>
          <div class="tech-confirm-actions">
            <button type="button" class="btn btn-secondary tech-confirm-cancel" data-confirm-cancel>
              Cancel
            </button>
            <button type="button" class="btn btn-primary tech-confirm-ok" data-confirm-research="${e.id}">
              <span>Research</span>
              <span class="tech-confirm-btn-cost">${t}${Q("star","icon icon-xs icon-star")}</span>
            </button>
          </div>
        </div>
      </div>
    `}renderRequirementsDialog(e,t,n,s){const r=e.tier===3?"Age III · Capstone":`Age ${xn[e.tier]}`;return`
      <div class="tech-confirm-scrim" data-confirm-scrim role="alertdialog" aria-modal="true" aria-label="Technology Requirements">
        <div class="tech-confirm-card tech-requirements-card">
          <div class="tech-confirm-top">
            <div class="tech-confirm-thumb" aria-hidden="true">${this.renderTechDialogIcon(e,n)}</div>
            <div class="tech-confirm-copy">
              <div class="tech-confirm-kicker">${Sn(e.pillar)} &middot; ${r}</div>
              <h3 class="tech-confirm-title">${Sn(e.name)}</h3>
              <p class="tech-confirm-summary">${xr(e.summary)}</p>
            </div>
          </div>
          <div class="tech-requirements-reason">
            ${Q("lock","icon icon-sm")}
            <span>${xr(s)}</span>
          </div>
          <div class="tech-confirm-cost-row">
            <span class="tech-confirm-cost-label">Cost</span>
            <span class="tech-confirm-cost-val">
              <strong>${t}${Q("star","icon icon-sm icon-star")}</strong>
              <span class="tech-confirm-balance">(You have ${n.gold}${Q("star","icon icon-xs icon-star")})</span>
            </span>
          </div>
          <div class="tech-confirm-actions is-single">
            <button type="button" class="btn btn-primary tech-confirm-ok" data-confirm-cancel>
              OK
            </button>
          </div>
        </div>
      </div>
    `}renderPillar(e,t,n,s,r,a,o){const{root:l,branchA:c,branchB:d,capstone:u}=e,h=l?`<div class="tech-tree-row-center">${this.renderTechCard(l,t(l),n,s,r,a,"wide",o)}</div>`:"",f=this.renderForkConnector(l,c,d,r),g=`
      <div class="tech-tree-row-split">
        ${c?this.renderTechCard(c,t(c),n,s,r,a,"branch",o):'<div class="tech-slot-empty"></div>'}
        ${d?this.renderTechCard(d,t(d),n,s,r,a,"branch",o):'<div class="tech-slot-empty"></div>'}
      </div>
    `,v=this.renderCapstoneConnector(c,d,u,r),m=u?`<div class="tech-tree-row-center">${this.renderTechCard(u,t(u),n,s,r,a,"wide",o)}</div>`:"";return`
      <section class="tech-pillar${e.index===this.activePillarIndex?" pillar-active":""}" data-pillar-index="${e.index}" aria-label="${Sn(e.name)} Pillar">
        <header class="tech-pillar-header">
          <span class="tech-branch-header">${Sn(e.name)}</span>
        </header>
        <div class="tech-pillar-tree">
          ${h}
          ${f}
          ${g}
          ${v}
          ${m}
        </div>
      </section>
    `}renderForkConnector(e,t,n,s){const r=!!(e&&s.has(e.id)),a=!!(r&&t&&s.has(t.id)),o=!!(r&&n&&s.has(n.id)),d=[{d:"M 100 0 L 100 10 L 49 10 L 49 22",state:a?"done":r?"unlocked":"locked",rank:a?2:r?1:0},{d:"M 100 0 L 100 10 L 151 10 L 151 22",state:o?"done":r?"unlocked":"locked",rank:o?2:r?1:0}].sort((h,f)=>h.rank-f.rank),u=a||o?"done":r?"unlocked":"locked";return`
      <div class="tech-svg-connector tech-fork-connector" aria-hidden="true">
        <svg viewBox="0 0 200 22" preserveAspectRatio="none" focusable="false">
          ${d.map(h=>`<path class="tech-link ${h.state}" d="${h.d}" vector-effect="non-scaling-stroke" />`).join("")}
          <circle class="tech-link-node ${u}" cx="100" cy="10" r="2.2" />
        </svg>
      </div>
    `}renderCapstoneConnector(e,t,n,s){if(!n)return"";const r=!!(e&&n.prerequisites.includes(e.id)),a=!!(t&&n.prerequisites.includes(t.id)),o=s.has(n.id),l=[];if(r&&e){const d=s.has(e.id),u=d&&o?"done":d?"unlocked":"locked";l.push({d:"M 49 0 L 49 11 L 100 11 L 100 22",state:u,rank:u==="done"?2:u==="unlocked"?1:0,nodeX:49})}if(a&&t){const d=s.has(t.id),u=d&&o?"done":d?"unlocked":"locked";l.push({d:"M 151 0 L 151 11 L 100 11 L 100 22",state:u,rank:u==="done"?2:u==="unlocked"?1:0,nodeX:151})}if(l.length===0){const d=ka(n,s),u=d&&o?"done":d?"unlocked":"locked";l.push({d:"M 100 0 L 100 22",state:u,rank:u==="done"?2:u==="unlocked"?1:0,nodeX:100})}l.sort((d,u)=>d.rank-u.rank);const c=l[l.length-1].state;return`
      <div class="tech-svg-connector tech-capstone-connector" aria-hidden="true">
        <svg viewBox="0 0 200 22" preserveAspectRatio="none" focusable="false">
          ${l.map(d=>`<path class="tech-link ${d.state}" d="${d.d}" vector-effect="non-scaling-stroke" />`).join("")}
          <circle class="tech-link-node ${c}" cx="100" cy="11" r="2.2" />
        </svg>
      </div>
    `}renderTechCard(e,t,n,s,r,a,o,l){const c=r.has(e.id),d=!!(l&&e.id===l),u=!!(l&&e.id!==l),h=!c&&e.tier>s,f=e.prerequisites.filter(V=>!r.has(V)),g=f.length===0,v=n.gold>=t,m=!c&&!u&&!h&&g&&v&&a,p=Math.max(0,t-n.gold),y=f.map(V=>Ct[V]?.name??V);let w="locked",_="locked",b=`${Q("lock","icon icon-xs")}<span>${t}</span>${Q("star","icon icon-xs")}`,T="";if(c)w="researched",_="researched",b=`${Q("check","icon icon-xs")}<span>Done</span>`;else if(h){w="locked age-locked",_="locked";const V=Math.max(1,Ks[e.tier]-n.techs.length);T=`<div class="tech-status-note is-age-locked">${Q("lock","icon icon-xs")}<span>Age ${xn[e.tier]} &middot; ${V} more</span></div>`}else g?v&&a?(w="available affordable",_="affordable",b=`<span>${t}</span>${Q("star","icon icon-xs")}`):(w="available unaffordable",_="unaffordable",b=`<span>${t}</span>${Q("star","icon icon-xs")}`,T=a?`<div class="tech-status-note">Need ${p}${Q("star","icon icon-xs icon-star")}</div>`:'<div class="tech-status-note">Rival turn</div>'):y.length>0&&(T=`<div class="tech-status-note">${Q("lock","icon icon-xs")}<span>${Sn(y.join(" + "))}</span></div>`);const x=bu(e),E=eo(x,n.faction,"thumb-3d thumb-tech",e.name),M=e.unlocksUnits.length>0?Zs(e.unlocksUnits[0],"icon icon-lg"):e.unlocksImprovements.length>0?Q("tower","icon icon-lg"):e.unlocksResources.length>0?Q("leaf","icon icon-lg"):e.tier===3?Q("crown","icon icon-lg"):Q("codex","icon icon-lg"),S=`<div class="tech-thumb-box" aria-hidden="true">${E||M}</div>`,A=e.tier===3?`${Q("crown","icon icon-xs icon-star")}<span>Age III &middot; Capstone</span>`:`<span>Age ${xn[e.tier]}</span>`,I=d?'<span class="tech-tutorial-badge">TUTORIAL</span>':"",P=d?" is-tutorial-target":u?" is-tutorial-locked":"",F=`tier-${e.tier}${e.slot==="capstone"?" is-capstone":""}`,H=`tech-card--${o}`,$=o==="wide"?`
          <div class="tech-card-body">
            ${S}
            <div class="tech-card-main">
              <div class="tech-card-head">
                <div class="tech-card-titles">
                  <div class="tech-tier-tag">${A}${I}</div>
                  <div class="tech-name">${Sn(e.name)}</div>
                </div>
                <span class="tech-status-pill ${_}">${b}</span>
              </div>
              <p class="tech-summary">${xr(e.summary)}</p>
              ${T}
            </div>
          </div>
        `:`
          <div class="tech-card-branch-top">
            ${S}
            <div class="tech-card-branch-meta">
              <div class="tech-tier-tag">${A}${I}</div>
              <span class="tech-status-pill ${_}">${b}</span>
            </div>
          </div>
          <div class="tech-name">${Sn(e.name)}</div>
          <p class="tech-summary">${xr(e.summary)}</p>
          ${T}
        `;if(c)return`<div class="tech-card ${H} ${F} ${w}${P}">${$}</div>`;const Z=this.pendingTechId===e.id;return`
      <button
        type="button"
        class="tech-card ${H} ${F} ${w}${P} ${Z?"is-pending":""}"
        data-research-tech="${e.id}"
        ${m?"":"disabled"}
      >
        ${$}
      </button>
    `}bindEvents(){this.root.querySelector('[data-action="close"]')?.addEventListener("click",()=>{this.close()}),this.root.querySelectorAll("[data-research-tech]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.researchTech;c&&!l.disabled&&this.lastVm&&(this.pendingTechId=c,this.blockedTechId=null,this.render(this.lastVm),this.restoreCarouselPosition(!1))})}),this.root.querySelector("[data-confirm-scrim]")?.addEventListener("click",l=>{l.target===l.currentTarget&&this.dismissSubDialog()}),this.root.querySelector("[data-confirm-cancel]")?.addEventListener("click",()=>{this.dismissSubDialog()}),this.root.querySelector("[data-confirm-research]")?.addEventListener("click",l=>{const d=l.currentTarget.dataset.confirmResearch;d&&(this.pendingTechId=null,this.blockedTechId=null,this.callbacks.onResearch(d))});const e=this.root.querySelector(".tech-modal-panel"),t=this.root.querySelector(".tech-carousel"),n=Array.from(this.root.querySelectorAll("[data-pillar-jump]")),s=this.root.querySelector("[data-carousel-prev]"),r=this.root.querySelector("[data-carousel-next]"),a=l=>{this.activePillarIndex=l,n.forEach((c,d)=>{const u=d===l;c.classList.toggle("active",u),c.setAttribute("aria-selected",String(u))}),s&&(s.disabled=l<=0),r&&(r.disabled=l>=Math.max(0,n.length-1)),this.root.querySelectorAll(".tech-pillar").forEach(c=>{c.classList.toggle("pillar-active",Number(c.dataset.pillarIndex)===l)})},o=(l,c)=>{const d=Math.max(0,n.length-1),u=Math.max(0,Math.min(d,l));a(u),this.restoreCarouselPosition(c)};if(n.forEach(l=>{l.addEventListener("click",()=>{const c=Number(l.dataset.pillarJump);Number.isNaN(c)||o(c,!0)})}),s?.addEventListener("click",()=>{this.activePillarIndex>0&&o(this.activePillarIndex-1,!0)}),r?.addEventListener("click",()=>{const l=Math.max(0,n.length-1);this.activePillarIndex<l&&o(this.activePillarIndex+1,!0)}),t){let l=0,c=0,d=0,u=0,h=0,f=!1;t.addEventListener("touchstart",v=>{if(v.touches.length!==1||this.pendingTechId||this.blockedTechId){f=!1;return}const m=v.touches[0];l=m.clientX,c=m.clientY,d=m.clientX,u=m.clientY,h=Date.now(),f=!0},{passive:!0}),t.addEventListener("touchmove",v=>{if(!f||v.touches.length!==1)return;const m=v.touches[0];d=m.clientX,u=m.clientY},{passive:!0}),t.addEventListener("touchend",()=>{if(!f)return;f=!1;const v=d-l,m=u-c;if(Date.now()-h<900&&Math.abs(v)>40&&Math.abs(v)>Math.abs(m)*1.2){const y=v<0?1:-1,w=Math.max(0,n.length-1),_=Math.max(0,Math.min(w,this.activePillarIndex+y));_!==this.activePillarIndex&&o(_,!0)}},{passive:!0}),t.addEventListener("touchcancel",()=>{f=!1},{passive:!0}),t.addEventListener("wheel",v=>{t.scrollWidth<=t.clientWidth+2||Math.abs(v.deltaY)>Math.abs(v.deltaX)&&v.deltaY!==0&&(v.preventDefault(),t.scrollLeft+=v.deltaY)},{passive:!1});let g=null;t.addEventListener("scroll",()=>{g===null&&(g=window.requestAnimationFrame(()=>{g=null;const v=Array.from(t.querySelectorAll(".tech-pillar"));if(v.length===0)return;const m=t.scrollLeft+t.clientWidth*.5;let p=0,y=1/0;v.forEach((w,_)=>{const b=w.offsetLeft+w.offsetWidth*.5,T=Math.abs(b-m);T<y&&(y=T,p=_)}),p!==this.activePillarIndex&&a(p)}))},{passive:!0})}if(e){let l=0,c=0,d=0,u=0,h=!1,f=!1,g="none";const v=b=>{if(this.pendingTechId||this.blockedTechId)return!1;if((b instanceof HTMLElement?b:null)?.closest(".sheet-handle, .modal-header"))return!0;const x=e.scrollTop<=0,E=!t||t.scrollTop<=0;return x&&E},m=b=>{const T=Math.max(0,Math.round(b));d=T,e.classList.add("is-dragging"),e.style.setProperty("--sheet-drag-y",`${T}px`),e.style.transform=`translateY(${T}px)`},p=b=>{e.classList.remove("is-dragging"),e.style.removeProperty("--sheet-drag-y"),b?(e.classList.add("is-snapping-back"),e.style.transform="translateY(0px)",window.setTimeout(()=>{e.classList.remove("is-snapping-back"),e.style.transform=""},200)):(e.classList.remove("is-snapping-back"),e.style.transform="")},y=()=>{if(!f){h=!1,g="none";return}const b=d,T=Math.max(1,Date.now()-u),x=b/T;f=!1,h=!1,g="none",d=0,b>85||b>36&&x>.55?(p(!1),this.close()):p(!0)};e.addEventListener("touchstart",b=>{if(b.touches.length!==1||!v(b.target)){h=!1;return}const T=b.touches[0];l=T.clientX,c=T.clientY,d=0,u=Date.now(),h=!0,f=!1,g="none"},{passive:!0}),e.addEventListener("touchmove",b=>{if(!h||b.touches.length!==1)return;const T=b.touches[0],x=T.clientX-l,E=T.clientY-c;if(g==="none"){if(Math.abs(x)<8&&Math.abs(E)<8)return;if(E>0&&Math.abs(E)>Math.abs(x)*1.25)g="vertical",f=!0;else{g="horizontal",h=!1;return}}f&&(b.preventDefault(),m(Math.max(0,E)))},{passive:!1}),e.addEventListener("touchend",y,{passive:!0}),e.addEventListener("touchcancel",()=>{f?(f=!1,h=!1,g="none",d=0,p(!0)):(h=!1,g="none")});let w=null;e.addEventListener("pointerdown",b=>{if(b.pointerType!=="mouse"||b.button!==0)return;const T=b.target instanceof HTMLElement?b.target:null;if(!(!T?.closest(".sheet-handle, .modal-header")||T.closest("button"))&&!(this.pendingTechId||this.blockedTechId)){w=b.pointerId,l=b.clientX,c=b.clientY,d=0,u=Date.now(),h=!0,f=!1,g="none";try{e.setPointerCapture(b.pointerId)}catch{}}}),e.addEventListener("pointermove",b=>{if(w===null||b.pointerId!==w)return;const T=b.clientX-l,x=b.clientY-c;if(g==="none"){if(Math.abs(T)<6&&Math.abs(x)<6)return;if(x>0&&Math.abs(x)>Math.abs(T)*1.25)g="vertical",f=!0;else{g="horizontal",w=null,h=!1;return}}f&&m(Math.max(0,x))});const _=b=>{if(!(w===null||b.pointerId!==w)){w=null;try{e.releasePointerCapture(b.pointerId)}catch{}y()}};e.addEventListener("pointerup",_),e.addEventListener("pointercancel",_)}}restoreCarouselPosition(e){const t=this.root.querySelector("[data-tech-carousel]");if(!t||t.scrollWidth<=t.clientWidth+2)return;const n=t.querySelector(`.tech-pillar[data-pillar-index="${this.activePillarIndex}"]`);n&&t.scrollTo({left:Math.max(0,n.offsetLeft-t.offsetLeft),behavior:e?"smooth":"auto"})}}function Qo(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function uM(i,e){if(i===2)return[{choice:"workshop",icon:"anvil",name:"Workshop",highlight:"+1★ / Turn"},{choice:"explorer",icon:"compass",name:"Scout",highlight:"Reveals 10 Fog Tiles"}];if(i===3)return[{choice:"city_wall",icon:"shield",name:"City Walls",highlight:"2.0x Defense"},{choice:"resources",icon:"star",name:"Coffers",highlight:"+5★ Now"}];if(i===4)return[{choice:"border_growth",icon:"banner",name:"Borders",highlight:"Expand to 5×5"},{choice:"pop_growth",icon:"wheat",name:"Harvest",highlight:"+3 Population"}];const t=nt[e],n=Bt[t.uniqueUnit];return[{choice:"champion",icon:"crown",name:`${n.name}`,highlight:`Free Veteran (${n.maxHp+5} HP)`},{choice:"park",icon:"tree",name:"Grand Park",highlight:"+250 Glory & +1★/Turn"}]}class hM{root;callbacks;openState=!1;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop reward-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","City Level-Up Decree"),e.appendChild(this.root)}isOpen(){return this.openState}open(e){this.openState=!0,this.render(e),this.root.classList.remove("hidden")}close(){this.openState=!1,this.root.classList.add("hidden")}destroy(){this.root.remove()}render(e){const t=uM(e.levelReached,e.faction),n=e.city.id,s=t.map(r=>`
          <button type="button" class="reward-card" data-reward="${r.choice}">
            <div class="reward-icon" aria-hidden="true">${Q(r.icon,"icon icon-xl")}</div>
            <div class="reward-name">${Qo(r.name)}</div>
            <div class="reward-highlight">${Qo(r.highlight)}</div>
          </button>
        `).join("");this.root.innerHTML=`
      <div class="modal-panel reward-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="reward-level-banner">
          ${Q("crown","icon icon-sm")}
          <span>Level ${e.levelReached}</span>
        </div>
        <h2 class="modal-title" style="justify-content: center;">${Qo(e.city.name)}</h2>

        <div class="reward-choices">
          ${s}
        </div>
      </div>
    `,this.root.querySelectorAll("[data-reward]").forEach(r=>{r.addEventListener("click",()=>{const a=r.dataset.reward;a&&(this.close(),this.callbacks.onChoose(n,a))})})}}function Ds(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class fM{root;openState=!1;pendingResolve=null;onKeyDown;constructor(e){this.root=document.createElement("div"),this.root.className="modal-backdrop defeat-notice-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Faction Defeated"),e.appendChild(this.root),this.root.addEventListener("click",t=>{t.target===this.root&&this.openState&&this.close()}),this.onKeyDown=t=>{this.openState&&t.key==="Escape"&&(t.preventDefault(),this.close())},window.addEventListener("keydown",this.onKeyDown)}isOpen(){return this.openState}show(e,t,n=!1){this.pendingResolve&&this.close(),this.openState=!0,this.render(e,t,n),this.root.classList.remove("hidden");const s=this.root.querySelector('[data-action="continue"]');return window.requestAnimationFrame(()=>{s?.focus()}),new Promise(r=>{this.pendingResolve=r})}close(){if(!this.openState&&!this.pendingResolve)return;this.openState=!1,this.root.classList.add("hidden");const e=this.pendingResolve;this.pendingResolve=null,e?.()}destroy(){window.removeEventListener("keydown",this.onKeyDown),this.close(),this.root.remove()}render(e,t,n){const s=nt[e],r=nt[t],a=tn[e],o=tn[t],l=pf(e,t,n);this.root.innerHTML=`
      <div
        class="modal-panel defeat-notice-panel"
        style="--defeated-color: ${a}; --victor-color: ${o};"
      >
        <div class="defeat-notice-kicker">
          ${Q("skull","icon icon-sm")}
          <span>Realm Fallen</span>
        </div>

        <div class="defeat-notice-crests" aria-hidden="true">
          <div class="defeat-crest-side is-fallen">
            <div class="defeat-crest-ring fallen" style="background: ${a};">
              ${En(e,"icon defeat-crest-svg")}
              <span class="defeat-crest-badge fallen">${Q("skull","icon icon-xs")}</span>
            </div>
            <span class="defeat-crest-label">${Ds(s.name)}</span>
          </div>

          <div class="defeat-notice-divider">
            ${Q("swords","icon icon-lg")}
          </div>

          <div class="defeat-crest-side is-victor">
            <div class="defeat-crest-ring victor" style="background: ${o};">
              ${En(t,"icon defeat-crest-svg")}
              <span class="defeat-crest-badge victor">${Q("crown","icon icon-xs")}</span>
            </div>
            <span class="defeat-crest-label">${Ds(r.name)}</span>
          </div>
        </div>

        <h2 class="defeat-notice-headline">
          ${Ds(s.name)} Fell to ${Ds(r.name)}
        </h2>
        <p class="defeat-notice-subline">
          ${Ds(s.realm)}’s final stronghold has fallen.
        </p>

        <div class="chronicle-alderwick-card is-notice">
          <span class="chronicle-alderwick-avatar is-sm">
            <img
              src="${of.portrait}"
              alt="${js}"
              width="44"
              height="44"
              draggable="false"
            />
          </span>
          <div class="chronicle-alderwick-copy">
            <span class="chronicle-alderwick-speaker">
              ${Q("star","icon icon-xs icon-star")}
              <span>${js}</span>
            </span>
            <p class="chronicle-alderwick-quote">“${Ds(l)}”</p>
          </div>
        </div>

        <button type="button" class="btn btn-cta defeat-notice-btn" data-action="continue">
          <span>Continue</span>
          ${Q("chevronRight","icon icon-sm")}
        </button>
      </div>
    `,this.root.querySelector('[data-action="continue"]')?.addEventListener("click",()=>{this.close()})}}function bn(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function el(i){return bn(i).replace(/★/g,Q("star","icon icon-sm icon-star"))}class pM{root;callbacks;openState=!1;activeFaction="humans";lastVm=null;onKeyDown;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop dossier-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Faction Abilities Dossier"),e.appendChild(this.root),this.root.addEventListener("click",n=>{n.target===this.root&&this.close()}),this.onKeyDown=n=>{n.key==="Escape"&&this.openState&&(this.callbacks.onBack?this.callbacks.onBack():this.close())},window.addEventListener("keydown",this.onKeyDown)}isOpen(){return this.openState}open(e,t){this.lastVm=e,this.activeFaction=t??e.humanPlayer.faction,this.openState=!0,this.render(),this.root.classList.remove("hidden")}update(e){this.lastVm=e,this.openState&&this.render()}close(){this.openState&&(this.openState=!1,this.root.classList.add("hidden"),this.callbacks.onClose())}destroy(){window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}render(){const e=this.lastVm;if(!e)return;const t=this.activeFaction,n=t===e.humanPlayer.faction,s=nt[t],r=Bt[s.uniqueUnit],a=Ct[s.startingTech],o=tn[t],l=e.allPlayers.find(p=>p.faction===t)??null,c=Kt.map(p=>{const y=nt[p],w=tn[p],_=p===t,b=e.allPlayers.find(x=>x.faction===p),T=b?!b.alive:!1;return`
        <button
          type="button"
          class="dossier-tab ${_?"active":""} ${T?"eliminated":""}"
          data-dossier-faction="${p}"
          style="--tab-heraldry: ${w};"
          aria-selected="${_}"
        >
          <span class="dossier-tab-crest" style="background: ${w};">
            ${En(p,"icon icon-crest-sm")}
          </span>
          <span class="dossier-tab-name">${bn(y.name)}</span>
        </button>
      `}).join(""),d=to(r.type,t,Zs(r.type,"icon icon-xl"),"thumb-3d thumb-dossier-unit"),u=r.traits.map(p=>`<span class="trait-pill">${bn(p)}</span>`).join(""),h=ti(t);let f="Active Passives",g="";if(n){const p=new Set(e.humanPlayer.techs),y=h.filter(w=>p.has(w.id));f=`Active Passives (${y.length}/${h.length})`,y.length===0?g='<p class="dossier-empty-note">None yet — research lore in the Codex.</p>':g=`
          <ul class="dossier-passive-list">
            ${y.map(w=>`
                  <li class="dossier-passive-item ${w.tier===3?"is-capstone":""}">
                    <span class="dossier-passive-head">
                      <span class="dossier-passive-name">
                        ${w.tier===3?Q("crown","icon icon-sm icon-star"):Q("check","icon icon-sm")}
                        <span>${bn(w.name)}</span>
                      </span>
                      <span class="dossier-passive-pillar">${bn(w.pillar)}</span>
                    </span>
                    <span class="dossier-passive-summary">${el(w.summary)}</span>
                  </li>
                `).join("")}
          </ul>
        `}else{const p=h.filter(y=>y.tier===3);f=`Realm Capstones (${p.length})`,g=`
        <ul class="dossier-passive-list">
          ${p.map(y=>`
                <li class="dossier-passive-item is-capstone">
                  <span class="dossier-passive-head">
                    <span class="dossier-passive-name">
                      ${Q("crown","icon icon-sm icon-star")}
                      <span>${bn(y.name)}</span>
                    </span>
                    <span class="dossier-passive-pillar">${bn(y.pillar)}</span>
                  </span>
                  <span class="dossier-passive-summary">${el(y.summary)}</span>
                </li>
              `).join("")}
        </ul>
      `}const v=l?l.alive?`${l.score.toLocaleString()} Glory`:`Fallen (T${l.eliminatedOnTurn??"?"})`:"",m=this.callbacks.onBack?`
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
              <span class="faction-crest-badge" style="background: ${o}; width: 28px; height: 28px;">
                ${En(t,"icon icon-crest-sm")}
              </span>
              <span>${bn(s.realm)}</span>
            </h2>
            <span class="modal-subtitle">
              <span>${bn(a.name)}</span>
              ${v?`<span>&middot;</span><span>${bn(v)}</span>`:""}
            </span>
          </div>
          <button type="button" class="btn btn-icon modal-close-btn" data-action="close" aria-label="Close Faction Dossier">
            ${Q("close","icon")}
          </button>
        </div>

        <div class="dossier-tabs" role="tablist" aria-label="Inspect Factions">
          ${c}
        </div>

        <div class="dossier-body">
          <div class="dossier-section">
            <div class="dossier-kicker">Trait</div>
            <div class="dossier-mechanic-title">${bn(s.uniqueMechanicName)}</div>
            <p class="dossier-mechanic-desc">${el(s.uniqueMechanicDescription)}</p>
          </div>

          <div class="dossier-section">
            <div class="dossier-kicker">Champion</div>
            <div class="dossier-unit-row">
              <div class="dossier-unit-thumb-frame">${d}</div>
              <div class="dossier-unit-info">
                <div class="dossier-unit-head">
                  <span class="dossier-unit-name">${bn(r.name)}</span>
                  <span class="cost-tag">${r.cost}${Q("star","icon icon-sm icon-star")}</span>
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
            <div class="dossier-kicker">${bn(f)}</div>
            ${g}
          </div>
        </div>
      </div>
    `,this.root.querySelector('[data-action="back"]')?.addEventListener("click",()=>{this.callbacks.onBack?.()}),this.root.querySelector('[data-action="close"]')?.addEventListener("click",()=>{this.close()}),this.root.querySelectorAll("[data-dossier-faction]").forEach(p=>{p.addEventListener("click",()=>{const y=p.dataset.dossierFaction;y&&y!==this.activeFaction&&(this.activeFaction=y,this.render())})})}}function Ua(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class mM{root;callbacks;openState=!1;confirmingResign=!1;lastVm=null;onKeyDown;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop leaderboard-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Live Leaderboard"),e.appendChild(this.root),this.root.addEventListener("click",n=>{n.target===this.root&&this.close()}),this.onKeyDown=n=>{n.key==="Escape"&&this.openState&&this.close()},window.addEventListener("keydown",this.onKeyDown)}isOpen(){return this.openState}open(e){this.lastVm=e,this.confirmingResign=!1,this.openState=!0,this.render(),this.root.classList.remove("hidden")}update(e){this.lastVm=e,this.openState&&this.render()}close(){this.openState&&(this.openState=!1,this.confirmingResign=!1,this.root.classList.add("hidden"),this.callbacks.onClose())}destroy(){window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}render(){const e=this.lastVm;if(!e)return;const t=Math.max(1,...e.entries.map(a=>a.score)),n=e.entries.map(a=>{const o=nt[a.faction],l=tn[a.faction],c=Math.max(4,Math.min(100,Math.round(a.score/t*100))),d=`rank-${Math.min(4,Math.max(1,a.rank))}`,u=a.citiesCount===1?"1 City":`${a.citiesCount} Cities`,h=a.isEliminated?'<span class="lb-tag lb-tag-fallen">Fallen</span>':a.isHuman?'<span class="lb-tag lb-tag-you">You</span>':"";return`
          <button
            type="button"
            class="leaderboard-row is-clickable ${a.isHuman?"is-human":""} ${a.isEliminated?"is-eliminated":""}"
            data-lb-faction="${a.faction}"
            style="--lb-heraldry: ${l};"
            aria-label="Inspect ${Ua(o.name)} — Rank ${a.rank}, ${Ua(u)}, ${a.score} Glory"
          >
            <div class="leaderboard-row-top">
              <div class="leaderboard-identity">
                <span class="lb-rank-badge ${d}" aria-label="Rank ${a.rank}">#${a.rank}</span>
                <span class="faction-crest-badge lb-crest-badge" style="background: ${l};">
                  ${En(a.faction,"icon icon-crest-sm")}
                </span>
                <div class="lb-name-block">
                  <div class="lb-name-line">
                    <span class="lb-faction-name">${Ua(o.name)}</span>
                    ${h}
                  </div>
                  <div class="lb-cities-stat">
                    ${Q("tower","icon icon-xs")}
                    <span>${Ua(u)}</span>
                  </div>
                </div>
              </div>

              <div class="leaderboard-right-group">
                <div class="leaderboard-score-col">
                  <span class="lb-score-val">${a.score.toLocaleString()}</span>
                </div>
                <span class="lb-row-chevron" aria-hidden="true">${Q("chevronRight","icon icon-sm")}</span>
              </div>
            </div>

            <div class="lb-progress-track" aria-hidden="true">
              <div class="lb-progress-fill" style="width: ${c}%; background: ${l};"></div>
            </div>
          </button>
        `}).join(""),s=`Age ${xn[e.age??1]}`,r="Capture all capitals to win";this.root.innerHTML=`
      <div class="modal-panel leaderboard-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="modal-header">
          <div class="modal-title-wrap">
            <h2 class="modal-title">
              <span class="lb-header-trophy">${Q("trophy","icon")}</span>
              <span>Realm Standings</span>
            </h2>
            <span class="modal-subtitle">
              <strong class="lb-turn-pill">${s}</strong>
            </span>
          </div>
          <button type="button" class="btn btn-icon modal-close-btn" data-action="close" aria-label="Close Leaderboard">
            ${Q("close","icon")}
          </button>
        </div>

        <div class="leaderboard-list" role="list" aria-label="Civilization Rankings">
          ${n}
        </div>

        <div class="leaderboard-footer">
          <div class="leaderboard-footer-hint">
            ${Q("crown","icon icon-sm icon-star")}
            <span>${r}</span>
          </div>
          <div class="lb-footer-actions">
            ${e.tutorialActive?this.callbacks.onEndTutorial?`
                    <button type="button" class="btn lb-end-tutorial-btn" data-action="end-tutorial">
                      <span>End Tutorial</span>
                    </button>
                  `:"":this.callbacks.onResign?this.confirmingResign?`
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
      </div>
    `,this.root.querySelector('[data-action="close"]')?.addEventListener("click",()=>{this.close()}),this.root.querySelector('[data-action="end-tutorial"]')?.addEventListener("click",()=>{this.callbacks.onEndTutorial?.()}),this.root.querySelector('[data-action="resign"]')?.addEventListener("click",()=>{this.confirmingResign=!0,this.render()}),this.root.querySelector('[data-action="resign-cancel"]')?.addEventListener("click",()=>{this.confirmingResign=!1,this.render()}),this.root.querySelector('[data-action="resign-confirm"]')?.addEventListener("click",()=>{this.close(),this.callbacks.onResign?.()}),this.root.querySelectorAll("[data-lb-faction]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.lbFaction;o&&this.callbacks.onSelectFaction?.(o)})})}}function pi(i,e){return Math.max(Math.abs(i.x-e.x),Math.abs(i.y-e.y))}function Hh(i,e){let t=(i^Math.imul(e+1,2654435761))>>>0;return t=Math.imul(t^t>>>16,2246822507)>>>0,t=Math.imul(t^t>>>13,3266489909)>>>0,t=(t^t>>>16)>>>0,t/4294967296}function ki(i,e,t){return t<=0?0:(Hh(i,e)*2-1)*t}function ji(i,e){const t=i.players.find(m=>m.id===e),n=[],s=[];let r=null,a=null;const l=i.players.find(m=>m.isHuman)?.id??null;for(const m of Object.values(i.cities))if(m.ownerId===e)n.push(m),m.isCapital&&(r=m);else{const p=Ke(m.x,m.y,i.mapSize);t.revealedTiles[p]&&s.push(m),m.ownerId===l&&m.isCapital&&(a=m)}const c=[],d=[];for(const m of Object.values(i.units))if(m.ownerId===e)c.push(m);else{const p=Ke(m.x,m.y,i.mapSize);t.revealedTiles[p]&&d.push(m)}const u=[],h=[];let f=0;for(let m=0;m<i.tiles.length;m++)if(t.revealedTiles[m]){f++;const y=i.tiles[m];y.hasVillage&&!y.cityId&&u.push({x:y.x,y:y.y}),y.resource==="ruins"&&h.push({x:y.x,y:y.y})}const g={};let v=0;for(const m of n){let p=0;for(const y of d){const w=pi(m,y);w<=3&&p++,w<=4&&v++}g[m.id]=p}return{player:t,ownCities:n,ownCapital:r,enemyCities:s,humanCapital:a,neutralVillages:u,ruins:h,ownUnits:c,enemyUnits:d,cityThreats:g,totalThreat:v,revealedRatio:f/Math.max(1,i.tiles.length)}}function gM(i,e,t,n,s){if(t===2)return n.revealedRatio<.22&&(s.faction==="orcs"||s.faction==="elves")?"explorer":"workshop";if(t===3){const o=(n.cityThreats[e.id]??0)>0;return!e.hasWalls&&(o||e.isCapital||s.faction==="dwarves"||s.faction==="humans")?"city_wall":"resources"}if(t===4){let o=0;for(let l=-2;l<=2;l++)for(let c=-2;c<=2;c++){if(Math.abs(c)<=1&&Math.abs(l)<=1)continue;const d=he(i,e.x+c,e.y+l);d&&!d.cityId&&d.terrain!=="water"&&(d.resource||s.faction==="elves"&&d.terrain==="ancient_woods"||s.faction==="dwarves"&&d.terrain==="mountain")&&o++}return o>=2?"border_growth":"pop_growth"}const r=he(i,e.x,e.y);return r!==null&&r.unitId===null&&i.turn<i.config.maxTurns-3?"champion":"park"}function vM(i,e,t,n,s){const r=Ct[e],a=nt[n.player.faction];let o=16+(s.techBonuses[e]??0),l=0,c=0;for(const d of i.tiles){if(!d.cityId)continue;const u=i.cities[d.cityId];if(!(!u||u.ownerId!==n.player.id)&&(d.resource&&r.unlocksResources.includes(d.resource)&&l++,!d.improvement&&!d.isCityCenter)){for(const h of r.unlocksImprovements)if(zi[h].allowedTerrains.includes(d.terrain)){c++;break}}}if(o+=l*13,o+=Math.min(c,4)*7,r.unlocksUnits.includes(a.uniqueUnit)?o+=34*s.uniqueUnitWeight:r.unlocksUnits.length>0&&(o+=14+(n.totalThreat>0?8:0)),r.unlocksMountainPass&&(o+=8),r.unlocksChopForest&&n.player.gold<6&&(o+=12),r.unlocksPlantWoods&&(o+=14),e==="elves_elven_lore"){const d=ti(n.player.faction).length-n.player.techs.length;o+=d*4}if(e==="humans_granaries"?o+=n.ownCities.filter(d=>d.level>=3).length*8:e==="humans_citadel_masonry"?o+=n.ownCities.filter(d=>d.hasWalls).length*7:e==="orcs_war_barracks"?o+=n.ownCities.length*6:e==="orcs_spoils_mastery"?o+=10+n.enemyUnits.length*3:e==="dwarves_stone_walls"?o+=n.ownCities.filter(d=>d.level>=2&&!d.hasWalls).length*8:e==="dwarves_runic_plate"&&(o+=n.ownUnits.length*4),r.tier===3)if(o+=20,e==="humans_stewards_citadel"||e==="dwarves_deep_vaults")o+=n.ownCities.length*7;else if(e==="humans_milling")o+=n.ownCities.length*5;else if(e==="humans_ride_of_rohirrim"||e==="orcs_pack_tactics"){const d=n.ownUnits.filter(u=>u.type==="rider"||u.type==="rohirrim_knight").length;o+=d*6}else e==="orcs_black_gate"?o+=n.ownUnits.length*4+8:e==="orcs_fell_volley"?o+=10+n.enemyUnits.length*3:e==="elves_lothlorien_sanctum"||e==="dwarves_heart_of_mountain"||e==="orcs_mount_doom"?o+=n.ownCities.length*6:e==="elves_galadhrim_precision"||e==="dwarves_mithril_phalanx"||e==="dwarves_dragon_slayers"||e==="humans_siegecraft"||e==="elves_wind_riders"?o+=n.ownUnits.length*4:e==="elves_rings_preservation"&&(o+=n.player.techs.length*4);return i.turn>=i.config.maxTurns-6&&(o+=r.tier===3?36:r.tier===2?22:12,e==="elves_rings_preservation"&&(o+=n.player.techs.length*6)),o=o*s.techWeight-t*2.8,o}function yM(i,e,t,n){if(e.type==="HARVEST_TILE"){const s=he(i,e.coord.x,e.coord.y);if(!s||!s.cityId)return-1;const r=i.cities[s.cityId];if(!r)return-1;let a=26*n.economyWeight;return r.population+1>=r.level+1&&(a+=45),a}if(e.type==="BUILD_IMPROVEMENT"){const s=he(i,e.coord.x,e.coord.y);if(!s||!s.cityId)return-1;const r=i.cities[s.cityId];if(!r)return-1;const a=zi[e.improvement];let o=a.basePop,l=0;if(a.adjacentBonusTo&&a.adjacentPopPerMatch){for(let u=-1;u<=1;u++)for(let h=-1;h<=1;h++){if(h===0&&u===0)continue;const f=he(i,s.x+h,s.y+u);f&&f.improvement===a.adjacentBonusTo&&l++}o+=l*a.adjacentPopPerMatch}let c=a.goldPerTurn;if(e.improvement==="windmill"&&t.player.techs.includes("humans_milling")&&(c+=l),(e.improvement==="mine"||e.improvement==="great_forge")&&t.player.techs.includes("dwarves_heart_of_mountain")&&(c+=1),e.improvement==="foundry"&&t.player.techs.includes("orcs_mount_doom")&&(c+=1),e.improvement==="sanctuary"&&t.player.techs.includes("elves_lothlorien_sanctum")&&(c+=1),o===0&&c===0)return-10;let d=(16+o*14+c*24-a.cost*3)*n.economyWeight;return r.population+o>=r.level+1&&(d+=46),n.faction==="elves"&&e.improvement==="sanctuary"&&(d+=10),d}if(e.type==="BUILD_ROAD")return n.faction==="humans"?t.ownCities.some(r=>!r.isCapital&&!r.connectedToCapital)?32:12:6;if(e.type==="CHOP_FOREST")return t.player.gold<=6?30:14;if(e.type==="PLANT_ANCIENT_WOODS"){const s=he(i,e.coord.x,e.coord.y),r=s?.cityId?i.cities[s.cityId]:null;let a=30*n.economyWeight;return r&&r.population+1>=r.level+1&&(a+=42),a}return-1}function no(i,e){const t=he(i,e.x,e.y);if(!t)return!1;if(t.hasVillage&&!t.cityId)return!0;if(t.isCityCenter&&t.cityId){const n=i.cities[t.cityId];if(n&&n.ownerId!==e.ownerId)return!0}return!1}function Mc(i,e){const t=he(i,e.x,e.y);return t!==null&&t.resource==="ruins"}function _M(i,e,t){if(!xi(i,e.id))return-999;const n=he(i,e.x,e.y);if(!n)return-999;let s=260;if(n.isCityCenter&&n.cityId){const r=i.cities[n.cityId];r&&r.ownerId!==e.ownerId&&(s+=r.isCapital?50:25)}return t.faction==="orcs"&&(s+=10),s}function wM(i,e,t){if(!Ti(i,e.id))return-999;let n=245;return t.player.techs.includes("humans_hunting")&&(n+=10),n}function MM(i,e,t,n,s,r){if(xi(i,e.id)||Ti(i,e.id))return-999;const a=$a(i,e.id,t.id),o=Bt[t.type],l=he(i,t.x,t.y);let c=(a.attackerDamage*5.5-a.retaliationDamage*4.2*s.selfPreservation)*s.attackWeight;if((no(i,e)||Mc(i,e))&&a.willAdvance&&(l?.isCityCenter&&l.cityId!==null&&i.cities[l.cityId]?.ownerId!==e.ownerId||(c-=no(i,e)?160:140)),a.defenderKilled&&(c+=85+o.cost*8,s.faction==="orcs"&&(c+=18),Bt[e.type].traits.includes("persist")&&(c+=16)),a.attackerKilled&&!a.defenderKilled?c-=75*s.selfPreservation:a.attackerKilled&&a.defenderKilled&&(c-=20*s.selfPreservation),n.ownCapital&&pi(t,n.ownCapital)<=2&&(c+=55),l?.isCityCenter&&l.cityId){const d=i.cities[l.cityId];d&&d.ownerId!==e.ownerId&&(c+=d.isCapital?48:34,n.humanCapital&&d.id===n.humanCapital.id&&i.turn<=8&&r.earlyHumanCapitalPressure<1&&(c*=r.earlyHumanCapitalPressure))}return a.retaliationDamage===0&&a.attackerDamage>0&&(c+=18),c}function SM(i,e,t,n){let s=0;for(let r=-n;r<=n;r++)for(let a=-n;a<=n;a++){const o=t.x+a,l=t.y+r;o<0||l<0||o>=i.mapSize||l>=i.mapSize||e.revealedTiles[Ke(o,l,i.mapSize)]||s++}return s}function Zn(i,e){let t=1/0;for(const n of e){const s=pi(i,n);s<t&&(t=s)}return t}function bM(i,e,t,n,s,r){const a=he(i,t.x,t.y);if(!a||xi(i,e.id)||Ti(i,e.id))return-999;const o=Bt[e.type];let l=0;if(no(i,e)?l-=170:Mc(i,e)&&(l-=150),a.isCityCenter&&a.cityId){const m=i.cities[a.cityId];if(m&&m.ownerId!==e.ownerId){let p=m.isCapital?150:120;s.faction==="orcs"&&(p+=20),n.humanCapital&&m.id===n.humanCapital.id&&i.turn<=8&&r.earlyHumanCapitalPressure<1&&(p*=r.earlyHumanCapitalPressure),l+=p}}else a.hasVillage&&!a.cityId&&(l+=105*s.expansionWeight+(s.faction==="orcs"?16:0));a.resource==="ruins"&&(l+=78*s.expansionWeight+(n.player.techs.includes("humans_hunting")?14:0));let d=a.terrain==="mountain"?2:1;s.faction==="elves"&&n.player.techs.includes("elves_keen_sight")&&(a.terrain==="forest"||a.terrain==="ancient_woods")&&(d=Math.max(d,2));const u=SM(i,n.player,t,d),h=i.turn<=10?1.35:.75;l+=u*6.5*h*s.expansionWeight;const f=e.hp/e.maxHp,g=e.canEscapeMove||f<=.35;if(g&&n.enemyUnits.length>0){const m=Zn(e,n.enemyUnits),p=Zn(t,n.enemyUnits);l+=(p-m)*16*s.selfPreservation}if(n.neutralVillages.length>0&&!e.canEscapeMove){const m=Zn(e,n.neutralVillages),p=Zn(t,n.neutralVillages);p<m&&(l+=36*s.expansionWeight/Math.max(1,p))}if(n.ruins.length>0&&!e.canEscapeMove){const m=Zn(e,n.ruins),p=Zn(t,n.ruins);p<m&&(l+=24*s.expansionWeight/Math.max(1,p))}if(!g){if(n.ownCapital&&(n.cityThreats[n.ownCapital.id]??0)>0){const p=pi(e,n.ownCapital);pi(t,n.ownCapital)<p&&p<=5&&(l+=28)}if(n.enemyCities.length>0){const p=Zn(e,n.enemyCities),y=Zn(t,n.enemyCities);y<p&&(l+=24*s.attackWeight/Math.max(1,y))}else if(n.enemyUnits.length>0){const p=Zn(e,n.enemyUnits),y=Zn(t,n.enemyUnits);y<p&&(l+=18*s.attackWeight/Math.max(1,y))}else if(u===0&&n.neutralVillages.length===0){const p={x:Math.floor(i.mapSize/2),y:Math.floor(i.mapSize/2)},y=pi(e,p);pi(t,p)<y&&(l+=10)}const m=Va(i,e);if(!e.hasAttacked&&o.traits.includes("dash"))for(const p of n.enemyUnits){const y=pi(t,p);if(y<=m&&(m===1||y>=1)){l+=22*s.attackWeight,m>1&&y===1&&(l-=14*s.selfPreservation);break}}}const v=n.enemyUnits.some(m=>pi(t,m)<=2);if((a.terrain==="forest"||a.terrain==="ancient_woods")&&(s.faction==="elves"?l+=o.range>1?14:10:v&&(l+=7)),a.terrain==="mountain"&&(s.faction==="dwarves"?l+=14:v&&(l+=8)),s.faction==="humans"&&a.hasRoad&&(l+=7),a.isCityCenter&&a.cityId){const m=i.cities[a.cityId];m&&m.ownerId===e.ownerId&&(n.cityThreats[m.id]??0)===0&&(l-=10)}return l}function xM(i,e,t){if(xi(i,e.id)||Ti(i,e.id))return-999;if(e.hp>=e.maxHp||e.hasMoved||e.hasAttacked)return-1;const n=e.hp/e.maxHp,s=1-n,r=he(i,e.x,e.y),a=r?.cityId!==null&&r?.cityId!==void 0&&i.cities[r.cityId]?.ownerId===e.ownerId;let o=0;return n<=.45?o=48*s*t.selfPreservation+(a?12:0):n<=.7&&(no(i,e)||Mc(i,e))?o=26*t.selfPreservation:n<=.65&&a&&(o=18*s*t.selfPreservation),o}function TM(i,e,t,n,s){const r=Bt[t],a=nt[n.player.faction];let l=22*(s.unitPreferences[t]??1);t===a.uniqueUnit&&(l+=28*s.uniqueUnitWeight);const c=n.cityThreats[e.id]??0;c>0&&(l+=30,(t==="defender"||t==="ironbreaker"||t==="warrior"||t==="uruk_berserker")&&(l+=24),t==="catapult"&&(l-=22)),i.turn<=6&&n.ownUnits.length<n.ownCities.length+2&&(l+=18,(t==="rider"||t==="warrior"||t==="archer")&&(l+=12));const d=n.ownUnits.filter(u=>u.type===t).length;return l-=d*4,t==="catapult"&&n.enemyCities.length>0&&c===0&&(l+=16),l-=r.cost*1.5,l}const EM={humans:{faction:"humans",attackWeight:1.05,selfPreservation:1,expansionWeight:1.25,economyWeight:1.2,techWeight:1.1,uniqueUnitWeight:1.25,techBonuses:{humans_farming:18,humans_granaries:14,humans_milling:20,humans_roads:16,humans_shield_wall:14,humans_citadel_masonry:14,humans_stewards_citadel:22,humans_riding:18,humans_plains_charge:14,humans_chivalry:26,humans_ride_of_rohirrim:24,humans_hunting:14,humans_archery:14,humans_mountaineering:10,humans_siegecraft:18},unitPreferences:{warrior:1,rider:1.3,archer:1.15,defender:1,catapult:.9,rohirrim_knight:1.7}},orcs:{faction:"orcs",attackWeight:1.35,selfPreservation:.6,expansionWeight:1.1,economyWeight:.95,techWeight:1,uniqueUnitWeight:1.4,techBonuses:{orcs_warg_riders:16,orcs_spoils_mastery:20,orcs_pack_tactics:18,orcs_clear_cutting:16,orcs_dark_forges:14,orcs_siege_works:14,orcs_mount_doom:18,orcs_shield_wall:16,orcs_uruk_breeding:28,orcs_war_barracks:18,orcs_black_gate:26,orcs_snaga_archers:14,orcs_black_arrows:14,orcs_crag_climbing:10,orcs_fell_volley:18},unitPreferences:{warrior:1.15,rider:1.25,defender:.95,archer:1.1,catapult:1,uruk_berserker:1.85}},elves:{faction:"elves",attackWeight:1.05,selfPreservation:1.3,expansionWeight:1.15,economyWeight:1.1,techWeight:1.25,uniqueUnitWeight:1.4,techBonuses:{elves_sanctuaries:18,elves_tree_singing:16,elves_lothlorien_sanctum:22,elves_woodland_aim:18,elves_sentinel_order:28,elves_keen_sight:14,elves_galadhrim_precision:24,elves_elven_steeds:16,elves_wardens:14,elves_graceful_guard:12,elves_wind_riders:20,elves_high_paths:16,elves_elven_lore:22,elves_mallorn_siege:12,elves_rings_preservation:24},unitPreferences:{archer:1.35,rider:1.15,warrior:.85,defender:1,catapult:.95,elven_sentinel:1.85}},dwarves:{faction:"dwarves",attackWeight:.95,selfPreservation:1.2,expansionWeight:1,economyWeight:1.4,techWeight:1.15,uniqueUnitWeight:1.4,techBonuses:{dwarves_mining:24,dwarves_khazad_forges:18,dwarves_heart_of_mountain:24,dwarves_shieldbearers:18,dwarves_mithril_smithing:28,dwarves_runic_plate:18,dwarves_mithril_phalanx:26,dwarves_foraging:14,dwarves_stone_walls:18,dwarves_crossbows:12,dwarves_deep_vaults:22,dwarves_ram_riders:14,dwarves_siegecraft:16,dwarves_horned_charge:12,dwarves_dragon_slayers:20},unitPreferences:{warrior:1,defender:1.35,archer:1,rider:.95,catapult:1.1,ironbreaker:1.9}}},AM={easy:{difficulty:"easy",noiseRange:12,economySkipChance:.18,earlyHumanCapitalPressure:.45,productionThreshold:18},normal:{difficulty:"normal",noiseRange:3,economySkipChance:0,earlyHumanCapitalPressure:1,productionThreshold:5}},RM=64,CM=24,IM=2;function PM(i,e,t){const n=t??i.config.difficulty,s=AM[n];let r=Gu(i);const a=[],o=r.players[r.activePlayerIndex];if(!o||o.id!==e||r.phase==="game_over")return[{type:"END_TURN"}];const l=EM[o.faction];let c=r.turn*1009+r.activePlayerIndex*131;const d=m=>{try{const p=Oa(r,m);return p.events.length===0?!1:(r=p.state,a.push(m),!0)}catch{return!1}},u=()=>{let m=0;for(;m++<16&&r.phase==="playing";){const p=ji(r,e),y=p.ownCities.find(b=>b.pendingLevelRewards.length>0);if(!y)break;const w=y.pendingLevelRewards[0],_=gM(r,y,w,p,l);if(!d({type:"CHOOSE_CITY_REWARD",cityId:y.id,reward:_}))break}},h=()=>{for(const m of Object.values(r.units))m.ownerId===e&&m.canPromote&&d({type:"PROMOTE_UNIT",unitId:m.id})};u(),h();let f=0;for(;f<IM&&r.phase==="playing";){const m=ji(r,e),p=ti(m.player.faction);let y=null;for(const _ of p){if(!Ur(r,e,_.id))continue;const b=Kr(r,e,_.id),x=vM(r,_.id,b,m,l)+ki(r.rngState,c++,s.noiseRange*.5);(!y||x>y.score)&&(y={action:{type:"RESEARCH_TECH",techId:_.id},score:x})}const w=m.totalThreat>=2?26:12;if(!y||y.score<w||!d(y.action))break;f++}const g=()=>{let m=0;for(;m++<CM&&r.phase==="playing";){const p=ji(r,e);let y=null;for(const w of r.tiles){if(!w.cityId)continue;const _=r.cities[w.cityId];if(!_||_.ownerId!==e)continue;const b=Os(r,e,w.x,w.y);for(const T of b){const x=yM(r,T,p,l);if(x<=0||s.economySkipChance>0&&x<55&&Hh(r.rngState,c++)<s.economySkipChance)continue;const E=x+ki(r.rngState,c++,s.noiseRange*.5);(!y||E>y.score)&&(y={action:T,score:E})}}if(!y||y.score<10||!d(y.action))break;u()}};if(g(),r.phase==="playing"&&kr(r,e)){const m=ji(r,e),p=m.player.faction;if(p==="dwarves")d({type:"USE_SUPERPOWER"});else if(p==="elves")m.ownUnits.length>=2&&(m.enemyUnits.length>0||m.enemyCities.length>0)&&d({type:"USE_SUPERPOWER"});else if(p==="orcs"){const y=Hr(r,e);let w=null,_=0;for(const b of y){let T=0,x=0;for(let M=-1;M<=1;M++)for(let S=-1;S<=1;S++){const A=he(r,b.x+S,b.y+M);if(A){if(A.unitId){const I=r.units[A.unitId];I&&I.ownerId!==e&&T++}A.cityId&&r.cities[A.cityId]?.ownerId===e&&A.improvement&&(x+=1)}}const E=T*10-x*2;T>=1&&E>_&&(_=E,w=b)}w&&d({type:"USE_SUPERPOWER",target:w})}else if(p==="humans"){const y=Hr(r,e);if(y.length>0&&(m.enemyUnits.length>0||m.enemyCities.length>0)){let w=y[0],_=-1/0;for(const b of y){let T=0;for(const x of m.enemyUnits){const E=Math.max(Math.abs(b.x-x.x),Math.abs(b.y-x.y));E<=2?T+=25:E<=4&&(T+=8)}m.ownCapital&&Math.max(Math.abs(b.x-m.ownCapital.x),Math.abs(b.y-m.ownCapital.y))<=2&&(T+=4),T>_&&(_=T,w=b)}d({type:"USE_SUPERPOWER",target:w})}}}let v=0;for(;v++<RM&&r.phase==="playing";){h();const m=ji(r,e);let p=null;for(const y of m.ownUnits){if(y.actedThisTurn&&!y.canEscapeMove&&!y.canPersistAttack)continue;if(xi(r,y.id)){const T=_M(r,y,l)+ki(r.rngState,c++,s.noiseRange*.25);(!p||T>p.score)&&(p={action:{type:"CAPTURE_CITY",unitId:y.id},score:T});continue}if(Ti(r,y.id)){const T=wM(r,y,m)+ki(r.rngState,c++,s.noiseRange*.25);(!p||T>p.score)&&(p={action:{type:"EXPLORE_RUINS",unitId:y.id},score:T});continue}const w=Gs(r,y.id);for(const b of w){const T=he(r,b.x,b.y);if(!T?.unitId)continue;const x=r.units[T.unitId];if(!x||x.ownerId===e)continue;const M=MM(r,y,x,m,l,s)+ki(r.rngState,c++,s.noiseRange);(!p||M>p.score)&&(p={action:{type:"ATTACK_UNIT",attackerId:y.id,defenderId:x.id},score:M})}const _=zr(r,y.id);for(const b of _){const x=bM(r,y,b,m,l,s)+ki(r.rngState,c++,s.noiseRange);(!p||x>p.score)&&(p={action:{type:"MOVE_UNIT",unitId:y.id,to:b},score:x})}if(!y.hasMoved&&!y.hasAttacked&&y.hp<y.maxHp){const b=xM(r,y,l);if(b>0){const T=b+ki(r.rngState,c++,s.noiseRange*.5);(!p||T>p.score)&&(p={action:{type:"RECOVER_UNIT",unitId:y.id},score:T})}}}if(!p||p.score<=2||!d(p.action))break;u()}if(r.phase==="playing"){const m=ji(r,e),p=[...m.ownCities].sort((y,w)=>(m.cityThreats[w.id]??0)-(m.cityThreats[y.id]??0)||w.level-y.level);for(const y of p){if(r.phase!=="playing")break;const w=he(r,y.x,y.y);if(!w||w.unitId!==null||so(r,y.id)>=io(r,y))continue;const _=Ql(r,y.id);if(_.length===0)continue;const b=ji(r,e);let T=null;for(const E of _){if(b.player.gold<Zl(r,e,E))continue;const S=TM(r,y,E,b,l)+ki(r.rngState,c++,s.noiseRange*.5);(!T||S>T.score)&&(T={action:{type:"TRAIN_UNIT",cityId:y.id,unitType:E},score:S})}const x=(b.cityThreats[y.id]??0)>0?0:s.productionThreshold;T&&T.score>=x&&d(T.action)}g()}return r.phase==="playing"&&a.push({type:"END_TURN"}),a}function tl(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class LM{root;callbacks;openState=!1;onKeyDown;constructor(e,t={}){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop age-up-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Age Reached"),e.appendChild(this.root),this.root.addEventListener("click",n=>{n.target===this.root&&this.close()}),this.onKeyDown=n=>{n.key==="Escape"&&this.openState&&(n.stopPropagation(),this.close())},window.addEventListener("keydown",this.onKeyDown)}isOpen(){return this.openState}open(e){this.openState=!0,this.render(e),this.root.classList.remove("hidden")}close(){this.openState&&(this.openState=!1,this.root.classList.add("hidden"),this.root.innerHTML="",this.callbacks.onClose?.())}destroy(){window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}render(e){const t=nt[e.faction],n=tn[e.faction],s=e.newAge===3,r=s?"Age III Reached!":"Age II Reached!",a=s?`The ${t.name} enter their zenith! Age III Capstone technologies are now unlocked in your Codex.`:`The ${t.name} advance! Age II technologies and elite units are now unlocked in your Codex.`,o=s&&e.superpowerName?`
          <div class="age-up-superpower-card" style="--age-heraldry: ${n};">
            <div class="age-up-superpower-icon" aria-hidden="true">
              ${ic(e.faction,"icon icon-lg")}
            </div>
            <div class="age-up-superpower-copy">
              <div class="age-up-superpower-label">Superpower Unlocked</div>
              <div class="age-up-superpower-name">${tl(e.superpowerName)}</div>
              ${e.superpowerDescription?`<p class="age-up-superpower-desc">${tl(e.superpowerDescription)}</p>`:""}
            </div>
          </div>
        `:`
          <div class="age-up-unlock-strip">
            <span class="age-up-unlock-icon" aria-hidden="true">${Q("codex","icon icon-sm")}</span>
            <span>Age II Codex branches &amp; upgrades unlocked</span>
          </div>
        `;this.root.setAttribute("aria-label",r),this.root.innerHTML=`
      <div class="modal-panel age-up-panel ${s?"is-age-three":"is-age-two"}" style="--age-heraldry: ${n};">
        <div class="age-up-crest-ring" aria-hidden="true">
          <span class="age-up-crest-medallion" style="background: ${n};">
            ${En(e.faction,"icon age-up-crest-svg")}
          </span>
          <span class="age-up-roman-badge">${s?"III":"II"}</span>
        </div>

        <h2 class="age-up-headline">${r}</h2>
        <p class="age-up-summary">${tl(a)}</p>

        ${o}

        <button type="button" class="btn btn-cta age-up-cta" data-age-up-continue>
          <span>Onward</span>
          ${Q("chevronRight","icon icon-sm")}
        </button>
      </div>
    `,this.root.querySelector("[data-age-up-continue]")?.addEventListener("click",()=>{this.close()})}}const Cu=[{id:"stars",icon:"star",title:"Stars: Eldermere’s Magic",body:"See those twinkling Stars (★)? That’s pure Starlight from the First Dawn! Spend them to harvest, train troops, and study lore—growing and capturing cities fills your coffers faster each turn."},{id:"upgrade",icon:"wheat",title:"Grow Your Capital",body:"Every grand empire begins with a humble harvest! Tap both resource tiles inside your borders to level up your capital, pick a City Reward, and earn more Stars (★) each turn."},{id:"move",icon:"compass",title:"March Into the Fog",body:"Time to stretch those boots, Commander! Tap your unit at your capital, then tap the glowing blue ring to the east to advance toward the rival outpost."},{id:"combat",icon:"swords",title:"Clash With a Rival",body:"Aha—an uninvited guest at that Village! Tap the red target ring on the rival warrior to send them packing and clear the settlement."},{id:"capture",icon:"crown",title:"Claim the Village",body:"Splendidly struck! With the Village clear, tap the glowing Capture button to raise your banner and claim your second city."},{id:"codex",icon:"codex",title:"Crack Open Your Codex",body:"A sharp mind wins as many crowns as a sharp blade! Tap the Codex medallion in the bottom-left and research a technology to power up your realm."},{id:"end_turn",icon:"endTurnHumans",title:"Turn the Page",body:"Magnificent first turn! Eldermere is turn-based: tapping End Turn lets rival realms move and showers you with fresh Stars (★) from your cities. Tap End Turn now!"}],Iu={stars:0,upgrade:1,move:2,combat:3,capture:4,codex:5,end_turn:6},DM={stars:"greet",upgrade:"point",move:"point",combat:"point",capture:"cheer",codex:"idea",end_turn:"point"},kM={humans:"I’d hate to see a Human Watchtower sprout up right on your doorstep.",orcs:"I’d hate to see your lovely capital turned into an Orc volcano.",elves:"I’d hate to see the Elves eclipse your sky. They get terribly smug about it.",dwarves:"I’d hate to see a Dwarven Fire Drake take a nap on your rooftops."};function UM(i){const e=i.trim().toLowerCase().replace(/^resource_/,"");return e==="metal"?"ore":e}function Pu(i){typeof document>"u"||document.documentElement.classList.toggle("alderwick-spotlight-shard",i)}function ks(i){return i!==null&&i!=="intro"&&i!=="complete"}function di(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class OM{bannerEl;modalEl;callbacks;stage=null;subProgress=null;context={};nudgeMessage=null;nudgeTimer=null;constructor(e,t={}){this.callbacks=t,this.bannerEl=document.createElement("aside"),this.bannerEl.className="tutorial-banner tutorial-alderwick-host hidden",this.bannerEl.setAttribute("role","region"),this.bannerEl.setAttribute("aria-label","Guided Tutorial by Alderwick"),e.appendChild(this.bannerEl),this.modalEl=document.createElement("div"),this.modalEl.className="alderwick-stage-backdrop tutorial-modal hidden",this.modalEl.setAttribute("role","dialog"),this.modalEl.setAttribute("aria-modal","true"),this.modalEl.setAttribute("aria-label","Alderwick Tutorial"),e.appendChild(this.modalEl)}isActive(){return this.stage!==null&&this.stage!=="complete"}isModalOpen(){return this.stage==="intro"||this.stage==="complete"}isBlockingEndTurn(){return ks(this.stage)&&this.stage!=="end_turn"}getStage(){return this.stage}getStepIndex(){return ks(this.stage)?Iu[this.stage]:null}start(e="intro",t=null){this.setStage(e,t)}setStage(e,t=null){const n=this.isModalOpen();if(this.clearNudgeTimer(),this.nudgeMessage=null,this.stage=e,Pu(e==="complete"),this.subProgress=t,e===null){this.hideElements(),n&&this.callbacks.onModalClose?.(),this.callbacks.onStageChange?.(null);return}if(e==="intro"){this.bannerEl.classList.add("hidden"),this.bannerEl.innerHTML="",delete this.bannerEl.dataset.renderedStep,this.renderIntroModal(),this.modalEl.classList.remove("hidden"),n||this.callbacks.onModalOpen?.(),this.callbacks.onStageChange?.("intro");return}if(e==="complete"){this.bannerEl.classList.add("hidden"),this.bannerEl.innerHTML="",delete this.bannerEl.dataset.renderedStep,this.renderCompleteModal(),this.modalEl.classList.remove("hidden"),n||this.callbacks.onModalOpen?.(),this.callbacks.onStageChange?.("complete");return}this.modalEl.classList.add("hidden"),this.modalEl.innerHTML="",this.renderBanner(e),this.bannerEl.classList.remove("hidden"),n&&this.callbacks.onModalClose?.(),this.callbacks.onStageChange?.(e)}setSubProgress(e){this.subProgress!==e&&(this.subProgress=e,ks(this.stage)&&this.renderBanner(this.stage))}setContext(e){this.context={...e},ks(this.stage)?this.renderBanner(this.stage):this.stage==="intro"?this.renderIntroModal():this.stage==="complete"&&this.renderCompleteModal()}nudge(e){ks(this.stage)&&(this.clearNudgeTimer(),this.nudgeMessage=e,this.renderBanner(this.stage,!0),this.nudgeTimer=window.setTimeout(()=>{this.nudgeTimer=null,this.nudgeMessage=null,ks(this.stage)&&this.renderBanner(this.stage,!1)},3200))}completeAndCelebrate(){zc(),this.setStage("complete")}endTutorial(e=!0){e&&zc();const t=this.stage!==null,n=this.isModalOpen();this.clearNudgeTimer(),this.nudgeMessage=null,this.subProgress=null,this.context={},this.stage=null,this.hideElements(),n&&this.callbacks.onModalClose?.(),t&&(this.callbacks.onStageChange?.(null),this.callbacks.onEndTutorial?.())}dismissModal(){this.stage==="intro"?(this.setStage("stars"),this.callbacks.onStartTutorial?.()):this.stage==="complete"&&(this.setStage(null),this.callbacks.onCompleteDismiss?.())}hide(){const e=this.isModalOpen();this.clearNudgeTimer(),this.nudgeMessage=null,this.subProgress=null,this.context={},this.stage=null,this.hideElements(),e&&this.callbacks.onModalClose?.()}destroy(){this.clearNudgeTimer(),this.bannerEl.remove(),this.modalEl.remove()}hideElements(){Pu(!1),delete this.bannerEl.dataset.renderedStep,this.bannerEl.classList.add("hidden"),this.bannerEl.innerHTML="",this.modalEl.classList.add("hidden"),this.modalEl.innerHTML=""}clearNudgeTimer(){this.nudgeTimer!==null&&(window.clearTimeout(this.nudgeTimer),this.nudgeTimer=null)}renderBanner(e,t=!1){const n=Iu[e],s=Cu[n];if(!s)return;const r=Cu.length;let a=s.body;e==="codex"&&this.context.targetTechName&&(a=`A sharp mind wins as many crowns as a sharp blade! Tap the Codex medallion in the bottom-left and research “${this.context.targetTechName}” (highlighted in gold).`);let o="";if(e==="upgrade"&&this.context.resourceThumbKey){const h=UM(this.context.resourceThumbKey),f=this.context.resourceLabel?.trim()||"Resource",g=this.context.faction??"humans";o=`
        <div class="tutorial-resource-callout">
          <span class="tutorial-resource-thumb-wrap" aria-hidden="true">${eo(h,g,"tutorial-resource-thumb",f)||sl(h,"icon icon-sm")}</span>
          <span class="tutorial-resource-label">Gather: <strong>${di(f)}</strong> (&times;2)</span>
        </div>
      `}const l=e==="stars"?`<button type="button" class="btn btn-cta tutorial-next-btn" data-tutorial-next><span>Got It!</span>${Q("chevronRight","icon icon-xs")}</button>`:"",c=this.subProgress?`<span class="tutorial-progress-pill">${di(this.subProgress)}</span>`:"",d=this.nudgeMessage?`<div class="tutorial-nudge" role="status">${di(this.nudgeMessage)}</div>`:"",u=this.bannerEl.dataset.renderedStep!==e;this.bannerEl.dataset.renderedStep=e,this.bannerEl.innerHTML=Nu({pose:DM[e],variant:"compact",animate:u,nudged:t,extraClass:"tutorial-alderwick-scene",headerHtml:`
        <span class="tutorial-icon-badge" aria-hidden="true">${Q(s.icon,"icon icon-xs")}</span>
        <strong class="tutorial-title">${di(s.title)}</strong>
        <span class="tutorial-step-pill">${n+1} / ${r}</span>
      `,bodyHtml:`
        <p class="tutorial-body">${di(a)}</p>
        ${o}
        ${d}
      `,actionsHtml:`
        ${l}
        ${c}
        <span class="tutorial-hint-note">End anytime in Scores</span>
      `}),e==="stars"&&this.bannerEl.querySelector("[data-tutorial-next]")?.addEventListener("click",()=>{this.stage==="stars"&&(this.setStage("upgrade"),this.callbacks.onAdvanceFromStars?.())})}renderIntroModal(){const e=this.context.faction?nt[this.context.faction]:null,t=e?`You lead <strong>${di(e.name)}</strong> of <strong>${di(e.realm)}</strong>, and your rivals are already stirring.`:"Your realm is ready, and your rivals are already stirring.",n=[{pose:"greet",bodyHtml:`
          <p class="alderwick-bubble-lead">Well met, Commander!</p>
          <p>I am <strong>${js}</strong>, Grand Chronicler of Eldermere and keeper of this rather splendid tabletop. I’ll be your guide for your very first turn.</p>
        `,actionLabel:"Nice to meet you!"},{pose:"point",bodyHtml:`
          <p>Long ago, the <strong>Star-Crown</strong> kept Eldermere’s four realms at peace. When it shattered, so did the peace. Now every realm fights to reforge it.</p>
          <p>${t}</p>
        `,actionLabel:"How do I win?"},{pose:"idea",bodyHtml:`
          <p>A Chronicle is won one turn at a time:</p>
          <ul class="alderwick-bubble-list">
            <li><span class="tutorial-intro-icon" aria-hidden="true">${Q("wheat","icon icon-xs")}</span><span>Harvest resources &amp; grow your capital</span></li>
            <li><span class="tutorial-intro-icon" aria-hidden="true">${Q("compass","icon icon-xs")}</span><span>March into the Fog &amp; claim Villages</span></li>
            <li><span class="tutorial-intro-icon" aria-hidden="true">${Q("swords","icon icon-xs")}</span><span>Battle rival banners</span></li>
            <li><span class="tutorial-intro-icon" aria-hidden="true">${Q("codex","icon icon-xs")}</span><span>Research your Codex &amp; rise through the Ages</span></li>
          </ul>
          <p>Shall we begin?</p>
        `,actionLabel:"Begin the Chronicle"}];this.modalEl.setAttribute("aria-label",`Welcome to Eldermere — ${js} introduces himself`),Wa(this.modalEl,n,()=>this.dismissModal())}renderCompleteModal(){const e=this.context.faction??"humans",t=Lc.find(c=>c.faction===e)?.powerName??"Superpower",n=Lc.filter(c=>c.faction!==e),s=n.map(c=>c.realmLabel),r=`${s.slice(0,-1).join(", ")} and ${s[s.length-1]}`,a=n.find(c=>c.faction==="orcs")??n[0],o=a?kM[a.faction]:"",l=[{pose:"idea",bodyHtml:`
          <p class="alderwick-bubble-lead">Oh! By the way, Commander…</p>
          <p>See that circle at the <strong>top of your screen</strong>? That’s your realm’s <strong>Star-Shard</strong>. Research enough <strong>Codex</strong> technologies to reach <strong>Age III</strong> and it unleashes your Superpower: <strong>${di(t)}</strong>.</p>
          <p>Mind you, the ${di(r)} have shards too, and they’re dreadfully trigger-happy. ${o} So… get there first?</p>
          <p class="alderwick-bubble-signoff">Good luck! I’ll be watching. With snacks.</p>
        `,actionLabel:"Challenge accepted!"}];this.modalEl.setAttribute("aria-label","Oh, by the way: your Star-Shard and Superpower"),Wa(this.modalEl,l,()=>this.dismissModal(),"is-star-shard-tip")}}const NM={plains:"Plains",forest:"Forest",ancient_woods:"Ancient Woods",mountain:"Mountain",wasteland:"Wasteland",water:"Water"};function FM(i){return new Promise(e=>window.setTimeout(e,i))}class BM{canvasContainer;badgesContainer;hudRoot;titleScreen;gameOverOverlay;resignationOverlay;topBar;actionBar;techModal;ageUpModal;cityRewardModal;defeatNoticeModal;factionDossierModal;leaderboardModal;tutorial;rewardToastEl;superpowerBannerEl;rewardToastTimer=null;onPagePersistBound;onVisibilityPersistBound;sceneManager=null;board=null;badges=null;animQueue=null;input=null;state=null;humanPlayerId="";selectedCoord=null;selectedUnitId=null;selectionLayer="unit";validMoves=[];validAttacks=[];hoveredCoord=null;readyUnitCycleIndex=0;isSuperpowerTargeting=!1;superpowerTargets=[];activeCanvasPointerId=null;activeCanvasPointerStart={x:0,y:0};canvasMultiTouch=!1;tileClickHandled=!1;onCanvasPointerDownBound;onWindowPointerUpBound;onWindowPointerCancelBound;onAndroidBackBound;onAndroidSetPausedBound;isBusy=!1;isAITurnRunning=!1;sessionToken=0;titleSettleTimer=null;isTitleDioramaActive=!1;titleShowcaseState=null;tutorialScenario=null;pendingEndTurnAfterTutorial=!1;constructor(e,t,n){this.canvasContainer=e,this.badgesContainer=t,this.hudRoot=n,this.onCanvasPointerDownBound=s=>this.handleCanvasPointerDown(s),this.onWindowPointerUpBound=s=>this.handleWindowPointerUp(s),this.onWindowPointerCancelBound=()=>{this.activeCanvasPointerId=null,this.canvasMultiTouch=!1},this.onAndroidBackBound=()=>this.handleAndroidBack(),this.onAndroidSetPausedBound=s=>this.setPaused(s),this.onPagePersistBound=()=>this.persistActiveCampaign(),this.onVisibilityPersistBound=()=>{document.visibilityState==="hidden"&&this.persistActiveCampaign()},this.titleScreen=new eM(this.hudRoot,{onStartGame:s=>this.startGame(s),onResumeGame:()=>this.resumeSavedCampaign(),onSelectFaction:s=>{dt("tap"),this.applyFactionTheme(s),this.focusTitleOnFaction(s,!1)}}),this.gameOverOverlay=new tM(this.hudRoot,{onPlayAgain:()=>this.returnToTitle()}),this.resignationOverlay=new nM(this.hudRoot,{onReturnToTitle:()=>this.returnToTitle()}),this.topBar=new sM(this.hudRoot,{onOpenLeaderboard:()=>this.openLeaderboardModal(),onOpenCodex:()=>this.openTechModal(),onActivateSuperpower:()=>{this.handleSuperpowerButtonClick()}}),this.actionBar=new lM(this.hudRoot,{onAction:s=>{this.handleHumanAction(s)},onUnlockTech:s=>this.handleUnlockTechRequest(s),onDeselect:()=>this.clearSelection(),onSwitchLayer:s=>this.switchSelectionLayer(s),onOpenTech:()=>this.openTechModal(),onActivateSuperpower:()=>{this.handleSuperpowerButtonClick()},onNextReadyUnit:()=>this.focusNextReadyUnit(),onEndTurn:()=>{this.handleEndTurn()}}),this.techModal=new dM(this.hudRoot,{onResearch:s=>{this.handleHumanAction({type:"RESEARCH_TECH",techId:s})},onClose:()=>{this.resumeSceneAfterOpaqueSheet()}}),this.ageUpModal=new LM(this.hudRoot,{onClose:()=>{this.resumeSceneAfterOpaqueSheet()}}),this.cityRewardModal=new hM(this.hudRoot,{onChoose:(s,r)=>{this.handleCityRewardChoice(s,r)}}),this.defeatNoticeModal=new fM(this.hudRoot),this.factionDossierModal=new pM(this.hudRoot,{onBack:()=>{this.factionDossierModal.close(),this.openLeaderboardModal()},onClose:()=>{this.resumeSceneAfterOpaqueSheet()}}),this.leaderboardModal=new mM(this.hudRoot,{onSelectFaction:s=>{this.leaderboardModal.close(),this.openFactionDossier(s)},onEndTutorial:()=>{dt("tap"),this.pendingEndTurnAfterTutorial=!1,this.tutorialScenario=null,this.tutorial.endTutorial(!0),this.persistActiveCampaign();const s=this.buildLeaderboardViewModel();s&&this.leaderboardModal.update(s)},onResign:()=>this.handleResignCampaign(),onClose:()=>{this.resumeSceneAfterOpaqueSheet()}}),this.tutorial=new OM(this.hudRoot,{onStageChange:()=>{this.persistActiveCampaign()},onStartTutorial:()=>{dt("tap"),this.syncTutorialContext(),this.focusTutorialCameraForStage("stars"),this.syncTutorialProgress(),this.resumeSceneAfterOpaqueSheet()},onAdvanceFromStars:()=>{dt("tap"),this.syncTutorialContext(),this.syncTutorialProgress(),this.focusTutorialCameraForStage("upgrade"),this.refreshHUD()},onCompleteDismiss:()=>{dt("tap");const s=this.pendingEndTurnAfterTutorial;this.pendingEndTurnAfterTutorial=!1,this.tutorialScenario=null,this.persistActiveCampaign(),this.resumeSceneAfterOpaqueSheet(),this.refreshHUD(),s&&this.handleEndTurn()},onEndTutorial:()=>{this.pendingEndTurnAfterTutorial=!1,this.tutorialScenario=null,this.persistActiveCampaign(),this.refreshHUD()},onModalOpen:()=>{this.pauseSceneBehindOpaqueSheet()},onModalClose:()=>{this.resumeSceneAfterOpaqueSheet()}}),this.rewardToastEl=document.createElement("div"),this.rewardToastEl.className="ruins-reward-toast hidden",this.rewardToastEl.setAttribute("role","status"),this.rewardToastEl.setAttribute("aria-live","polite"),this.hudRoot.appendChild(this.rewardToastEl),this.superpowerBannerEl=document.createElement("div"),this.superpowerBannerEl.className="superpower-targeting-banner hidden",this.superpowerBannerEl.setAttribute("role","status"),this.superpowerBannerEl.setAttribute("aria-live","polite"),this.superpowerBannerEl.style.cssText="position:fixed;top:calc(env(safe-area-inset-top, 0px) + 64px);left:50%;transform:translateX(-50%);z-index:45;display:none;align-items:center;gap:10px;max-width:min(92vw,420px);padding:8px 12px 8px 14px;border-radius:14px;background:rgba(20,16,13,0.92);border:1.5px solid rgba(245,197,66,0.72);box-shadow:0 8px 24px rgba(0,0,0,0.45);color:#f7eedc;pointer-events:auto;",this.hudRoot.appendChild(this.superpowerBannerEl),this.titleScreen.setSavedCampaign(Bc()),this.applyFactionTheme(this.titleScreen.getSelectedFaction()),this.mountTitleDiorama(),this.titleScreen.show(),window.__eldermereHandleBack=this.onAndroidBackBound,window.__eldermereSetPaused=this.onAndroidSetPausedBound,window.addEventListener("pagehide",this.onPagePersistBound),document.addEventListener("visibilitychange",this.onVisibilityPersistBound),requestAnimationFrame(()=>{requestAnimationFrame(()=>{vf()})})}handleAndroidBack(){return this.resignationOverlay.isOpen()?(this.resignationOverlay.hide(),this.returnToTitle(),dt("tap"),!0):this.tutorial.isModalOpen()?(this.tutorial.dismissModal(),dt("tap"),!0):this.defeatNoticeModal.isOpen()?(this.defeatNoticeModal.close(),dt("tap"),!0):this.ageUpModal.isOpen()?(this.ageUpModal.close(),dt("tap"),!0):this.factionDossierModal.isOpen()?(this.factionDossierModal.close(),this.openLeaderboardModal(),!0):this.leaderboardModal.isOpen()?(this.leaderboardModal.close(),dt("tap"),!0):this.techModal.isOpen()?(this.techModal.close(),dt("tap"),!0):this.cityRewardModal.isOpen()?(this.cityRewardModal.close(),this.resumeSceneAfterOpaqueSheet(),dt("tap"),!0):this.isSuperpowerTargeting?(this.cancelSuperpowerTargeting(),dt("tap"),!0):this.selectedCoord!==null?(this.clearSelection(),dt("tap"),!0):!1}shouldKeepScenePausedForAndroid(){return window.EldermereAndroid?this.isTitleDioramaActive||this.tutorial.isModalOpen()||this.resignationOverlay.isOpen()||this.ageUpModal.isOpen()||this.techModal.isOpen()||this.leaderboardModal.isOpen()||this.factionDossierModal.isOpen()||this.cityRewardModal.isOpen()||this.defeatNoticeModal.isOpen():!1}setPaused(e){e&&this.persistActiveCampaign(),this.sceneManager&&(e?this.sceneManager.stop():this.shouldKeepScenePausedForAndroid()?this.sceneManager.renderOnce():this.sceneManager.start())}persistActiveCampaign(){if(!this.state||!this.humanPlayerId)return;if(this.state.phase!=="playing"){Rr();return}const e=this.tutorial.getStage();Wf(this.state,this.humanPlayerId,e==="complete"?null:e,e==="complete"||e===null?null:this.tutorialScenario)}applyFactionTheme(e){this.hudRoot.setAttribute("data-faction",e),this.badgesContainer.setAttribute("data-faction",e)}attachEmptySkyListeners(){this.canvasContainer.addEventListener("pointerdown",this.onCanvasPointerDownBound),window.addEventListener("pointerup",this.onWindowPointerUpBound),window.addEventListener("pointercancel",this.onWindowPointerCancelBound)}detachEmptySkyListeners(){this.canvasContainer.removeEventListener("pointerdown",this.onCanvasPointerDownBound),window.removeEventListener("pointerup",this.onWindowPointerUpBound),window.removeEventListener("pointercancel",this.onWindowPointerCancelBound),this.activeCanvasPointerId=null,this.canvasMultiTouch=!1,this.tileClickHandled=!1}handleCanvasPointerDown(e){if(!(e.pointerType==="mouse"&&e.button!==0)){if(this.activeCanvasPointerId!==null&&this.activeCanvasPointerId!==e.pointerId){this.canvasMultiTouch=!0;return}this.activeCanvasPointerId=e.pointerId,this.activeCanvasPointerStart={x:e.clientX,y:e.clientY},this.canvasMultiTouch=!1,this.tileClickHandled=!1}}handleWindowPointerUp(e){if(this.activeCanvasPointerId===null||e.pointerId!==this.activeCanvasPointerId)return;const t=this.activeCanvasPointerStart,n=this.canvasMultiTouch,s=this.tileClickHandled;if(this.activeCanvasPointerId=null,this.canvasMultiTouch=!1,this.tileClickHandled=!1,s||n||this.isBusy||this.isAITurnRunning||!this.state||this.state.phase!=="playing"||this.tutorial.isModalOpen()||this.resignationOverlay.isOpen()||this.ageUpModal.isOpen()||this.techModal.isOpen()||this.cityRewardModal.isOpen()||this.defeatNoticeModal.isOpen()||this.factionDossierModal.isOpen()||this.leaderboardModal.isOpen())return;const r=Math.hypot(e.clientX-t.x,e.clientY-t.y),a=e.pointerType==="touch"?10:6;r<=a&&(this.isSuperpowerTargeting?this.cancelSuperpowerTargeting():this.selectedCoord!==null&&this.clearSelection())}mountTitleDiorama(){this.disposeSession(),this.isTitleDioramaActive=!0;const e=this.sessionToken,t=(Date.now()^Math.floor(Math.random()*2147483647))>>>0,n=Uc({humanFaction:this.titleScreen.getSelectedFaction(),difficulty:"normal",mapSize:16,maxTurns:0,seed:t}),s=n.players.find(l=>l.isHuman)??n.players[0];s.revealedTiles.fill(!0);const r=!!window.EldermereAndroid,a=new Kd(this.canvasContainer);a.setBoardBounds(n.mapSize),a.setIdleOrbit(!r);const o=new Oe(a.scene);o.syncState(n,s.id),this.sceneManager=a,this.board=o,this.titleShowcaseState=n,this.focusTitleOnFaction(this.titleScreen.getSelectedFaction(),!0),a.onUpdate((l,c)=>{o.update(l,c)}),a.start(),r&&(this.titleSettleTimer=window.setTimeout(()=>{this.titleSettleTimer=null,!(e!==this.sessionToken||!this.isTitleDioramaActive)&&(a.renderOnce(),a.stop())},850))}focusTitleOnFaction(e,t){if(!this.isTitleDioramaActive||!this.sceneManager||!this.titleShowcaseState)return;const n=this.titleShowcaseState,s=n.players.find(h=>h.faction===e)??n.players[0],a=Wt(n,s.id)[0]??Object.values(n.cities)[0];if(!a)return;const o=window.innerWidth>=768,l=a.x+(o?-1.4:1.7),c=a.y+(o?.5:1.7),d=ot(l,c,n.mapSize,0),u=!!window.EldermereAndroid;if(this.sceneManager.focusOnWorld(d,t||u),u&&!t){const h=this.sessionToken;window.setTimeout(()=>{h!==this.sessionToken||!this.isTitleDioramaActive||!this.sceneManager||this.sceneManager.renderOnce()},320)}}startGame(e){if(dt("select"),!Hc()){const{state:r,scenario:a}=Hf({humanFaction:e.humanFaction,difficulty:e.difficulty,mapSize:e.mapSize,maxTurns:0}),o=r.players.find(l=>l.isHuman)??r.players[0];this.mountActiveGame(r,o.id,"intro",a);return}const t=(Date.now()^Math.floor(Math.random()*2147483647))>>>0,n=Uc({humanFaction:e.humanFaction,difficulty:e.difficulty,mapSize:e.mapSize,maxTurns:0,seed:t}),s=n.players.find(r=>r.isHuman)??n.players[0];this.mountActiveGame(n,s.id,null,null)}resumeSavedCampaign(){const e=Wu();if(!e){this.titleScreen.setSavedCampaign(null);return}dt("select");const t=!Hc()&&e.tutorialStage!==null&&e.tutorialStage!=="complete"?e.tutorialStage:null,n=t!==null?e.tutorialScenario:null;this.mountActiveGame(e.state,e.humanPlayerId,t,n)}mountActiveGame(e,t,n,s){this.disposeSession(),this.sessionToken+=1,typeof e.eclipseTurnsRemaining!="number"&&(e.eclipseTurnsRemaining=0),e.eclipseOwnerId===void 0&&(e.eclipseOwnerId=null);for(const h of e.players)typeof h.superpowerUsed!="boolean"&&(h.superpowerUsed=!1);this.state=e;const r=ke(e,t)??e.players[0];this.humanPlayerId=r.id,this.readyUnitCycleIndex=0,this.tutorialScenario=s,this.applyFactionTheme(r.faction);const a=new Kd(this.canvasContainer);a.setBoardBounds(e.mapSize),a.setIdleOrbit(!1),a.setEclipseMode((e.eclipseTurnsRemaining??0)>0);const o=new Oe(a.scene),l=new G1(this.badgesContainer);l.setOnCaptureClick(h=>{this.executeCaptureCity(h)}),l.setOnExploreRuinsClick(h=>{this.executeExploreRuins(h)});const c=new U1(o,l,a),d=new F1(a,o,{onTileClick:h=>{this.tileClickHandled=!0,this.handleTileClick(h)},onTileHover:h=>this.handleTileHover(h),onEndTurnHotkey:()=>{this.handleEndTurn()},onDeselectHotkey:()=>{this.resignationOverlay.isOpen()?(this.resignationOverlay.hide(),this.returnToTitle()):this.tutorial.isModalOpen()?this.tutorial.dismissModal():this.defeatNoticeModal.isOpen()?this.defeatNoticeModal.close():this.ageUpModal.isOpen()?this.ageUpModal.close():this.techModal.isOpen()?this.techModal.close():this.factionDossierModal.isOpen()?this.factionDossierModal.close():this.leaderboardModal.isOpen()?this.leaderboardModal.close():this.isSuperpowerTargeting?this.cancelSuperpowerTargeting():this.clearSelection()}});this.attachEmptySkyListeners(),this.sceneManager=a,this.board=o,this.badges=l,this.animQueue=c,this.input=d,o.syncState(e,this.humanPlayerId),l.syncState(e,this.humanPlayerId,null);const u=Wt(e,this.humanPlayerId).find(h=>h.isCapital);u&&(a.focusOnWorld(ot(u.x,u.y,e.mapSize,0),!0),a.frameOpeningZoom()),a.onUpdate((h,f)=>{d.update(h),o.update(h,f),c.update(h),l.update(a.camera,h)}),a.renderOnce(),a.start(),this.titleScreen.hide(),this.gameOverOverlay.hide(),this.resignationOverlay.hide(),this.topBar.show(),this.actionBar.show(),n!==null?(this.syncTutorialContext(),this.tutorial.start(n,this.computeTutorialSubProgress(n)),n!=="intro"&&this.focusTutorialCameraForStage(n)):this.tutorial.hide(),this.refreshHUD(),this.persistActiveCampaign()}handleResignCampaign(){if(!this.state||!this.humanPlayerId){this.returnToTitle();return}const e=ke(this.state,this.humanPlayerId),t=e?.faction??this.titleScreen.getSelectedFaction(),n=this.state.turn,s=e?kn(e):1,r=Wt(this.state,this.humanPlayerId).length,a=e?.score??0;Rr(),this.cancelSuperpowerTargeting(),this.pendingEndTurnAfterTutorial=!1,this.tutorialScenario=null,this.tutorial.hide(),this.topBar.hide(),this.actionBar.hide(),this.ageUpModal.close(),this.techModal.close(),this.cityRewardModal.close(),this.defeatNoticeModal.close(),this.factionDossierModal.close(),this.leaderboardModal.close(),this.hideRewardToast(),this.clearSelection(),this.input?.setInputLocked(!0),this.pauseSceneBehindOpaqueSheet(),this.resignationOverlay.show({faction:t,turn:n,age:s,citiesCount:r,score:a})}returnToTitle(){Rr(),this.cancelSuperpowerTargeting(),this.pendingEndTurnAfterTutorial=!1,this.tutorialScenario=null,this.tutorial.hide(),this.resignationOverlay.hide(),this.topBar.hide(),this.actionBar.hide(),this.ageUpModal.close(),this.techModal.close(),this.cityRewardModal.close(),this.defeatNoticeModal.close(),this.factionDossierModal.close(),this.leaderboardModal.close(),this.hideRewardToast(),this.gameOverOverlay.hide(),this.titleScreen.setSavedCampaign(Bc()),this.applyFactionTheme(this.titleScreen.getSelectedFaction()),this.mountTitleDiorama(),this.titleScreen.show()}destroy(){this.persistActiveCampaign(),window.removeEventListener("pagehide",this.onPagePersistBound),document.removeEventListener("visibilitychange",this.onVisibilityPersistBound),window.__eldermereHandleBack===this.onAndroidBackBound&&delete window.__eldermereHandleBack,window.__eldermereSetPaused===this.onAndroidSetPausedBound&&delete window.__eldermereSetPaused,this.disposeSession(),this.hideRewardToast(),this.rewardToastEl.remove(),this.superpowerBannerEl.remove(),this.tutorial.destroy(),this.titleScreen.destroy(),this.gameOverOverlay.destroy(),this.resignationOverlay.destroy(),this.topBar.destroy(),this.actionBar.destroy(),this.ageUpModal.destroy(),this.techModal.destroy(),this.cityRewardModal.destroy(),this.defeatNoticeModal.destroy(),this.factionDossierModal.destroy(),this.leaderboardModal.destroy()}disposeSession(){this.sessionToken+=1,this.isTitleDioramaActive=!1,this.titleSettleTimer!==null&&(window.clearTimeout(this.titleSettleTimer),this.titleSettleTimer=null),this.cancelSuperpowerTargeting(),this.ageUpModal.close(),this.defeatNoticeModal.close(),this.isBusy=!1,this.isAITurnRunning=!1,this.pendingEndTurnAfterTutorial=!1,this.selectedCoord=null,this.selectedUnitId=null,this.selectionLayer="unit",this.validMoves=[],this.validAttacks=[],this.hoveredCoord=null,this.readyUnitCycleIndex=0,this.detachEmptySkyListeners(),this.input?.dispose(),this.input=null,this.badges?.dispose(),this.badges=null,this.sceneManager?.dispose(),this.sceneManager=null,this.board=null,this.animQueue=null,this.state=null}isHumanTurn(){return!this.state||this.state.phase!=="playing"?!1:Us(this.state).id===this.humanPlayerId}getUnitAtCoord(e){if(!this.state)return null;const t=he(this.state,e.x,e.y);if(t?.unitId){const n=this.state.units[t.unitId];if(n)return n}return Object.values(this.state.units).find(n=>n.x===e.x&&n.y===e.y)??null}hasTileUnderlay(e,t){return this.state?e.isCityCenter&&e.cityId!==null?!0:Pc(this.state,t.id,e.x,e.y).length>0:!1}getReadyHumanUnits(){return this.state?jl(this.state,this.humanPlayerId).filter(t=>Gr(this.state,t.id)).sort((t,n)=>+!!(n.canCapture||n.canExploreRuins)-+!!(t.canCapture||t.canExploreRuins)):[]}focusNextReadyUnit(){if(!this.state||!this.isHumanTurn()||this.isBusy||this.isAITurnRunning)return;const e=this.getReadyHumanUnits();if(e.length===0)return;const t=e[this.readyUnitCycleIndex%e.length];this.readyUnitCycleIndex=(this.readyUnitCycleIndex+1)%e.length,this.sceneManager?.focusOnWorld(ot(t.x,t.y,this.state.mapSize,0),!1),this.selectCoord({x:t.x,y:t.y},"unit")}async executeCaptureCity(e){if(!this.state||this.isBusy||this.isAITurnRunning||!this.isHumanTurn())return;const t=this.state.units[e];!t||t.ownerId!==this.humanPlayerId||xi(this.state,e)&&(await this.handleHumanAction({type:"CAPTURE_CITY",unitId:e}),this.clearSelection())}async executeExploreRuins(e){if(!this.state||this.isBusy||this.isAITurnRunning||!this.isHumanTurn())return;const t=this.state.units[e];!t||t.ownerId!==this.humanPlayerId||Ti(this.state,e)&&(await this.handleHumanAction({type:"EXPLORE_RUINS",unitId:e}),this.clearSelection())}async handleSuperpowerButtonClick(){if(!this.state||this.isBusy||this.isAITurnRunning||!this.isHumanTurn()||this.tutorial.isModalOpen()||this.resignationOverlay.isOpen()||this.ageUpModal.isOpen()||this.techModal.isOpen()||this.cityRewardModal.isOpen()||this.defeatNoticeModal.isOpen()||this.factionDossierModal.isOpen()||this.leaderboardModal.isOpen())return;if(this.tutorial.isActive()){dt("tap"),this.tutorial.nudge(this.getTutorialNudgeForCurrentStage());return}if(this.isSuperpowerTargeting){this.cancelSuperpowerTargeting(),dt("tap");return}const e=ke(this.state,this.humanPlayerId);if(!e||!kr(this.state,e.id))return;const t=na[e.faction];if(!t.requiresTarget){await this.handleHumanAction({type:"USE_SUPERPOWER"});return}const n=Hr(this.state,this.humanPlayerId);n.length!==0&&(this.clearSelection(),this.isSuperpowerTargeting=!0,this.superpowerTargets=n,this.board?.setSuperpowerTargets(n,e.faction==="orcs"?"volcano":"tower"),this.showSuperpowerTargetingBanner(e.faction,t.name,t.targetHint??"Select a highlighted tile"),dt("select"),this.refreshTopBar())}showSuperpowerTargetingBanner(e,t,n){const s=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),r=n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");this.superpowerBannerEl.innerHTML=`
      <span style="display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;color:#f5c542;">
        ${ic(e,"icon")}
      </span>
      <span style="display:flex;flex-direction:column;gap:2px;min-width:0;flex:1;">
        <strong style="font-size:0.82rem;letter-spacing:0.03em;color:#f5c542;line-height:1.15;">${s}</strong>
        <span style="font-size:0.76rem;color:#f7eedc;line-height:1.2;">${r}</span>
      </span>
      <button
        type="button"
        data-cancel-superpower
        style="flex-shrink:0;padding:5px 10px;border-radius:8px;border:1px solid rgba(255,255,255,0.28);background:rgba(255,255,255,0.1);color:#f7eedc;font-size:0.74rem;font-weight:700;cursor:pointer;"
      >Cancel</button>
    `,this.superpowerBannerEl.classList.remove("hidden"),this.superpowerBannerEl.style.display="flex",this.superpowerBannerEl.querySelector("[data-cancel-superpower]")?.addEventListener("click",()=>{this.cancelSuperpowerTargeting(),dt("tap")})}cancelSuperpowerTargeting(){!this.isSuperpowerTargeting&&this.superpowerTargets.length===0||(this.isSuperpowerTargeting=!1,this.superpowerTargets=[],this.superpowerBannerEl.classList.add("hidden"),this.superpowerBannerEl.style.display="none",this.superpowerBannerEl.innerHTML="",this.board?.clearHighlights(),this.refreshTopBar())}async handleTileClick(e){if(!this.state||this.isBusy||this.isAITurnRunning||this.state.phase!=="playing"||this.tutorial.isModalOpen()||this.resignationOverlay.isOpen()||this.ageUpModal.isOpen()||this.techModal.isOpen()||this.cityRewardModal.isOpen()||this.defeatNoticeModal.isOpen()||this.factionDossierModal.isOpen()||this.leaderboardModal.isOpen())return;if(this.isSuperpowerTargeting){const r=this.superpowerTargets.some(a=>a.x===e.x&&a.y===e.y);this.cancelSuperpowerTargeting(),r&&await this.handleHumanAction({type:"USE_SUPERPOWER",target:e});return}const t=he(this.state,e.x,e.y);if(!t)return;const n=ke(this.state,this.humanPlayerId);if(!n||!n.revealedTiles[Ke(e.x,e.y,this.state.mapSize)]){this.clearSelection();return}const s=this.getUnitAtCoord(e);if(this.selectedCoord&&this.selectedCoord.x===e.x&&this.selectedCoord.y===e.y){if(s&&this.hasTileUnderlay(t,n)){const r=this.selectionLayer==="unit"?"tile":"unit";this.selectCoord(e,r)}return}if(this.selectionLayer==="unit"&&this.selectedUnitId&&this.isHumanTurn()){const r=this.state.units[this.selectedUnitId];if(r&&r.ownerId===this.humanPlayerId){if(this.validMoves.some(l=>l.x===e.x&&l.y===e.y)){await this.handleHumanAction({type:"MOVE_UNIT",unitId:r.id,to:e}),this.reselectUnitIfActive(r.id);return}if(this.validAttacks.some(l=>l.x===e.x&&l.y===e.y)&&s&&s.ownerId!==this.humanPlayerId){await this.handleHumanAction({type:"ATTACK_UNIT",attackerId:r.id,defenderId:s.id}),this.reselectUnitIfActive(r.id);return}}}this.selectCoord(e,s?"unit":"tile")}switchSelectionLayer(e){if(!this.state||!this.selectedCoord)return;const t=he(this.state,this.selectedCoord.x,this.selectedCoord.y),n=ke(this.state,this.humanPlayerId);if(!t||!n)return;const s=this.getUnitAtCoord(this.selectedCoord);e==="unit"&&!s||e==="tile"&&!this.hasTileUnderlay(t,n)&&s||this.selectCoord(this.selectedCoord,e)}handleTileHover(e){this.hoveredCoord=e,this.board?.setHoverTile(e),!(!this.state||this.isBusy||this.isAITurnRunning)&&this.refreshActionBar()}selectCoord(e,t){if(!this.state)return;const n=he(this.state,e.x,e.y),s=ke(this.state,this.humanPlayerId);if(!n||!s){this.clearSelection();return}const r=this.getUnitAtCoord(e),a=this.hasTileUnderlay(n,s);let o;t==="unit"&&r?o="unit":t==="tile"&&(a||!r)?o="tile":o=r?"unit":"tile",this.selectedCoord={x:e.x,y:e.y},this.selectionLayer=o,this.selectedUnitId=o==="unit"&&r?r.id:null,this.validMoves=[],this.validAttacks=[];const l=[],c=[];if(o==="unit"&&r&&this.isHumanTurn()&&r.ownerId===this.humanPlayerId){this.validMoves=zr(this.state,r.id),this.validAttacks=Gs(this.state,r.id),this.tutorial.isActive()&&(this.validMoves=this.validMoves.filter(u=>this.isActionAllowedByTutorial({type:"MOVE_UNIT",unitId:r.id,to:u})),this.validAttacks=this.validAttacks.filter(u=>{const h=this.getUnitAtCoord(u);return!!(h&&this.isActionAllowedByTutorial({type:"ATTACK_UNIT",attackerId:r.id,defenderId:h.id}))}));for(const u of this.validAttacks){const h=this.getUnitAtCoord(u);let f=!1;h&&(f=$a(this.state,r.id,h.id).defenderKilled),l.push({x:u.x,y:u.y,lethal:f}),f&&c.push({x:u.x,y:u.y})}}this.board?.setSelectedTile(this.selectedCoord),this.board?.setMoveTargets(this.validMoves),this.board?.setAttackTargets(l);const d=o==="tile"?this.selectedCoord:null;this.badges?.setSelectedCoord(d),this.badges?.setLethalTargets(c),dt("select"),this.refreshActionBar()}reselectUnitIfActive(e){if(!this.state||this.state.phase!=="playing"){this.clearSelection();return}const t=this.state.units[e];if(!t||t.ownerId!==this.humanPlayerId){this.clearSelection();return}Gr(this.state,t.id)?this.selectCoord({x:t.x,y:t.y},"unit"):this.clearSelection()}clearSelection(){this.selectedCoord=null,this.selectedUnitId=null,this.selectionLayer="unit",this.validMoves=[],this.validAttacks=[],this.board?.clearHighlights(),this.badges?.setSelectedCoord(null),this.badges?.setLethalTargets([]),this.refreshActionBar()}async handleHumanAction(e){if(!this.state||this.isBusy||this.isAITurnRunning||!this.isHumanTurn())return;if(!this.isActionAllowedByTutorial(e)){dt("tap"),this.tutorial.nudge(this.getTutorialNudgeForCurrentStage());return}const t=this.sessionToken;this.isBusy=!0,this.input?.setInputLocked(!0);try{const n=ke(this.state,this.humanPlayerId),s=n?kn(n):null,{state:r,events:a}=Oa(this.state,e);this.state=r;let o=null;if(e.type==="RESEARCH_TECH"&&s!==null){const d=ke(r,this.humanPlayerId);if(d){const u=kn(d);u>s&&(u===2||u===3)&&(o=u)}}let l="tap";for(const d of a){if(d.type==="GAME_OVER"&&d.winnerId===this.humanPlayerId){l="victory";break}d.type==="CITY_CAPTURED"||d.type==="CITY_LEVELED"||d.type==="RUINS_CLAIMED"||d.type==="SUPERPOWER_USED"?l="capture":d.type==="UNIT_ATTACKED"&&l==="tap"&&(l="combat")}o!==null&&l==="tap"&&(l="capture"),dt(l);for(const d of a)d.type==="RUINS_CLAIMED"&&d.playerId===this.humanPlayerId&&this.showRuinsRewardToast(d,r);if((e.type==="MOVE_UNIT"||e.type==="ATTACK_UNIT"||e.type==="CAPTURE_CITY"||e.type==="EXPLORE_RUINS"||e.type==="USE_SUPERPOWER")&&(this.validMoves=[],this.validAttacks=[],this.board?.clearHighlights(),this.badges?.setLethalTargets([])),this.animQueue&&await this.animQueue.playEvents(a,r,this.humanPlayerId,1),t!==this.sessionToken)return;this.sceneManager?.setEclipseMode((r.eclipseTurnsRemaining??0)>0);const c=this.selectedCoord&&this.selectionLayer==="tile"?this.selectedCoord:null;if(this.board?.syncState(r,this.humanPlayerId),this.badges?.syncState(r,this.humanPlayerId,c),e.type==="CAPTURE_CITY"||e.type==="EXPLORE_RUINS"||e.type==="USE_SUPERPOWER"?this.clearSelection():this.selectedCoord?this.selectCoord(this.selectedCoord,this.selectionLayer):(this.board?.clearHighlights(),this.badges?.setLethalTargets([])),this.refreshHUD(),this.advanceTutorialAfterAction(e,r),o!==null&&r.phase==="playing"){const d=ke(r,this.humanPlayerId);if(d){this.techModal.close();const u=na[d.faction];this.ageUpModal.open({faction:d.faction,newAge:o,superpowerName:o===3?u.name:void 0,superpowerDescription:o===3?u.description:void 0}),this.pauseSceneBehindOpaqueSheet()}}if(await this.showEliminationNotices(a,r,t),t!==this.sessionToken)return;this.checkPostActionState()}finally{t===this.sessionToken&&(this.isBusy=!1,!this.isAITurnRunning&&this.state?.phase==="playing"&&this.input?.setInputLocked(!1))}}async handleCityRewardChoice(e,t){this.resumeSceneAfterOpaqueSheet(),await this.handleHumanAction({type:"CHOOSE_CITY_REWARD",cityId:e,reward:t})}focusTutorialCameraForStage(e){if(!this.state||!this.sceneManager)return;const t=this.tutorialScenario;if(!t)return;let n=null;e==="stars"||e==="upgrade"?n=t.capitalCoord:e==="move"?n={x:(t.capitalCoord.x+t.moveTargetCoord.x)*.5,y:(t.capitalCoord.y+t.moveTargetCoord.y)*.5}:(e==="combat"||e==="capture")&&(n=t.villageCoord),n&&this.sceneManager.focusOnWorld(ot(n.x,n.y,this.state.mapSize,0),!1)}isActionAllowedByTutorial(e){if(!this.tutorial.isActive())return!0;const t=this.tutorial.getStage(),n=this.tutorialScenario;if(!t||t==="intro"||t==="stars")return!1;if(t==="upgrade")return e.type==="CHOOSE_CITY_REWARD"?!0:e.type==="HARVEST_TILE"?n?n.resourceCoords.some(s=>s.x===e.coord.x&&s.y===e.coord.y):!0:!1;if(t==="move")return e.type!=="MOVE_UNIT"?!1:n?e.unitId===n.starterUnitId&&e.to.x===n.moveTargetCoord.x&&e.to.y===n.moveTargetCoord.y:!0;if(t==="combat")return e.type!=="ATTACK_UNIT"?!1:n?e.attackerId===n.starterUnitId&&e.defenderId===n.enemyUnitId:!0;if(t==="capture")return e.type!=="CAPTURE_CITY"?!1:n?e.unitId===n.starterUnitId:!0;if(t==="codex"){if(e.type!=="RESEARCH_TECH")return!1;const s=this.getTutorialTargetTechId();return!s||e.techId===s}return t==="end_turn"?e.type==="END_TURN":!1}getTutorialNudgeForCurrentStage(){switch(this.tutorial.getStage()){case"stars":return"Not so fast, Commander! Tap “Got It!” above so we can grow your capital first.";case"upgrade":return"Easy does it! Harvest both resource tiles in your borders and pick a City Reward first.";case"move":return"Tap your unit at your capital and march onto the glowing blue ring to the east!";case"combat":return"Tap the red target ring on the rival warrior guarding that Village—send them packing!";case"capture":return"Don’t forget the prize! Tap the glowing Capture button on the Village to claim your second city.";case"codex":{const t=this.getTutorialTargetTechId(),n=t?Ct[t]?.name:null;return n?`Crack open the Codex medallion in the bottom-left and research ${n}!`:"Crack open the Codex medallion in the bottom-left and research a technology!"}case"end_turn":return"Almost there! Tap End Turn in the bottom-right to finish your first turn of the Chronicle.";default:return"Finish this step of the Chronicle first, Commander!"}}getTutorialResourceInfo(e,t){let n=null;if(this.tutorialScenario)for(const s of this.tutorialScenario.resourceCoords){const r=he(e,s.x,s.y);if(r?.resource){n=r.resource;break}}switch(n||(n=t.faction==="dwarves"?"ore":"berries"),n){case"game":return{resourceThumbKey:"game",resourceLabel:"Wild Game"};case"ore":return{resourceThumbKey:"ore",resourceLabel:"Ore Vein"};case"mithril":return{resourceThumbKey:"mithril",resourceLabel:"Mithril Vein"};case"berries":default:return{resourceThumbKey:"berries",resourceLabel:"Berries"}}}getTutorialTargetTechId(){if(!this.state)return null;const e=ke(this.state,this.humanPlayerId);if(!e)return null;const t=ti(e.faction);return(t.find(s=>s.tier===1&&Ur(this.state,e.id,s.id))??t.find(s=>Ur(this.state,e.id,s.id)))?.id??null}syncTutorialContext(){if(!this.state)return;const e=ke(this.state,this.humanPlayerId);if(!e)return;const{resourceThumbKey:t,resourceLabel:n}=this.getTutorialResourceInfo(this.state,e),s=this.getTutorialTargetTechId(),r=s?Ct[s]?.name:void 0,a={faction:e.faction,resourceThumbKey:t,resourceLabel:n,targetTechId:s??void 0,targetTechName:r};this.tutorial.setContext(a)}computeTutorialSubProgress(e){if(!this.state||!e)return null;if(e==="upgrade"){const t=Wt(this.state,this.humanPlayerId).find(n=>n.isCapital);if(t&&t.pendingLevelRewards.length>0)return"Choose City Reward!";if(this.tutorialScenario){let n=0;for(const s of this.tutorialScenario.resourceCoords){const r=he(this.state,s.x,s.y);r&&!r.resource&&(n+=1)}return`${n}/2 harvested`}return null}return null}syncTutorialProgress(){const e=this.tutorial.getStage();e&&this.tutorial.setSubProgress(this.computeTutorialSubProgress(e))}advanceTutorialAfterAction(e,t){const n=this.tutorial.getStage();if(!(!n||n==="intro"||n==="complete")){if(n==="upgrade"){if(e.type==="HARVEST_TILE")this.syncTutorialContext(),this.syncTutorialProgress();else if(e.type==="CHOOSE_CITY_REWARD"){const s=Wt(t,this.humanPlayerId).find(r=>r.isCapital);s&&s.level>=2?(this.tutorial.setStage("move",null),this.focusTutorialCameraForStage("move"),this.tutorialScenario&&this.selectCoord(this.tutorialScenario.capitalCoord,"unit")):this.syncTutorialProgress()}return}if(n==="move"){e.type==="MOVE_UNIT"&&(this.tutorial.setStage("combat",null),this.focusTutorialCameraForStage("combat"),this.tutorialScenario&&this.selectCoord(this.tutorialScenario.moveTargetCoord,"unit"));return}if(n==="combat"){if(e.type==="ATTACK_UNIT"){const s=this.tutorialScenario;if(s){const r=t.units[s.starterUnitId],a=he(t,s.villageCoord.x,s.villageCoord.y);if(r&&a){if(r.x!==s.villageCoord.x||r.y!==s.villageCoord.y){const o=he(t,r.x,r.y);o&&o.unitId===r.id&&(o.unitId=null),r.x=s.villageCoord.x,r.y=s.villageCoord.y,a.unitId=r.id}r.canCapture=!0,r.actedThisTurn=!1,r.hasMoved=!1,r.hasAttacked=!1,this.board?.syncState(t,this.humanPlayerId),this.badges?.syncState(t,this.humanPlayerId,null)}}this.tutorial.setStage("capture",null),this.focusTutorialCameraForStage("capture"),s&&this.selectCoord(s.villageCoord,"unit")}return}if(n==="capture"){e.type==="CAPTURE_CITY"&&(this.clearSelection(),this.syncTutorialContext(),this.tutorial.setStage("codex",null));return}n==="codex"&&e.type==="RESEARCH_TECH"&&(this.techModal.close(),this.clearSelection(),this.tutorial.setStage("end_turn",null),this.refreshHUD())}}async handleEndTurn(){if(!this.state||this.isBusy||this.isAITurnRunning||!this.isHumanTurn()||this.tutorial.isModalOpen()||this.resignationOverlay.isOpen()||this.ageUpModal.isOpen()||(this.cancelSuperpowerTargeting(),this.openNextPendingCityReward()))return;if(this.tutorial.isBlockingEndTurn()){dt("tap"),this.tutorial.nudge(this.getTutorialNudgeForCurrentStage());return}if(this.tutorial.isActive()&&this.tutorial.getStage()==="end_turn"){dt("victory"),this.ageUpModal.close(),this.techModal.close(),this.factionDossierModal.close(),this.leaderboardModal.close(),this.clearSelection(),this.pendingEndTurnAfterTutorial=!0,this.syncTutorialContext(),this.tutorial.completeAndCelebrate();return}dt("tap");const e=this.sessionToken;this.ageUpModal.close(),this.techModal.close(),this.factionDossierModal.close(),this.leaderboardModal.close(),this.clearSelection(),this.isAITurnRunning=!0,this.input?.setInputLocked(!0);try{const t=Oa(this.state,{type:"END_TURN"});if(this.state=t.state,this.animQueue&&t.events.length>0&&await this.animQueue.playEvents(t.events,this.state,this.humanPlayerId,1.2),e!==this.sessionToken||(this.sceneManager?.setEclipseMode((this.state.eclipseTurnsRemaining??0)>0),this.board?.syncState(this.state,this.humanPlayerId),this.badges?.syncState(this.state,this.humanPlayerId,null),this.refreshActionBar(),this.refreshTopBar(),await this.showEliminationNotices(t.events,this.state,e),e!==this.sessionToken||!this.state))return;const n=this.tutorial.isActive()&&this.tutorialScenario?this.tutorialScenario.enemyUnitId:null;let s=0,r=!1;for(;this.state&&this.state.phase==="playing"&&!Us(this.state).isHuman&&s<12;){s+=1;const a=Us(this.state);if(this.refreshTopBar(),await FM(110),e!==this.sessionToken||!this.state)return;const o=PM(this.state,a.id,this.state.config.difficulty),l=n?o.filter(d=>!("unitId"in d&&d.unitId===n||"attackerId"in d&&d.attackerId===n)):o,c=l.length>0&&l[l.length-1].type==="END_TURN"?l:[...l,{type:"END_TURN"}];for(const d of c){if(e!==this.sessionToken||!this.state)return;if(this.state.phase!=="playing"||Us(this.state).id!==a.id)break;const u=this.state,{state:h,events:f}=Oa(u,d);if(this.state=h,this.hasVisibleEventsForHuman(f,h)){if(r&&(this.board?.syncState(u,this.humanPlayerId),this.badges?.syncState(u,this.humanPlayerId,null),r=!1),this.focusOnVisibleAction(f,h),this.animQueue&&f.length>0&&await this.animQueue.playEvents(f,h,this.humanPlayerId,1.5),e!==this.sessionToken||(this.sceneManager?.setEclipseMode((h.eclipseTurnsRemaining??0)>0),this.board?.syncState(h,this.humanPlayerId),this.badges?.syncState(h,this.humanPlayerId,null),this.refreshTopBar(),await this.showEliminationNotices(f,h,e),e!==this.sessionToken))return}else r=!0}}if(e!==this.sessionToken||!this.state)return;if(this.readyUnitCycleIndex=0,this.sceneManager?.setEclipseMode((this.state.eclipseTurnsRemaining??0)>0),this.board?.syncState(this.state,this.humanPlayerId),this.badges?.syncState(this.state,this.humanPlayerId,null),this.state.phase==="playing"&&this.isHumanTurn()){const a=this.tutorial.getStage();a&&a!=="intro"&&a!=="complete"&&(this.syncTutorialProgress(),this.focusTutorialCameraForStage(a))}this.refreshHUD(),this.checkPostActionState()}finally{e===this.sessionToken&&(this.isAITurnRunning=!1,this.state?.phase==="playing"&&this.input?.setInputLocked(!1),this.refreshHUD())}}hasVisibleEventsForHuman(e,t){const n=ke(t,this.humanPlayerId);if(!n)return!0;const s=r=>!!n.revealedTiles[Ke(r.x,r.y,t.mapSize)];for(const r of e)switch(r.type){case"PLAYER_ELIMINATED":case"GAME_OVER":case"CITY_CAPTURED":case"SUPERPOWER_USED":return!0;case"TILES_REVEALED":if(r.playerId===this.humanPlayerId&&r.coords.length>0)return!0;break;case"UNIT_MOVED":case"UNIT_ATTACKED":if(s(r.from)||s(r.to))return!0;break;case"UNIT_HEALED":case"UNIT_PROMOTED":case"UNIT_TRAINED":case"RESOURCE_HARVESTED":case"IMPROVEMENT_BUILT":case"ROAD_BUILT":case"FOREST_CHOPPED":case"WOODS_PLANTED":case"RUINS_CLAIMED":case"CITY_LEVELED":case"CITY_REWARD_APPLIED":case"SPOILS_GAINED":if(s(r.coord))return!0;break}return!1}async showEliminationNotices(e,t,n){const s=e.filter(r=>r.type==="PLAYER_ELIMINATED");if(s.length!==0)for(const r of s){if(n!==this.sessionToken)return;const a=ke(t,r.playerId),o=ke(t,r.eliminatedByPlayerId);a&&o&&await this.defeatNoticeModal.show(a.faction,o.faction,a.id===this.humanPlayerId)}}focusOnVisibleAction(e,t){if(!this.sceneManager)return;const n=ke(t,this.humanPlayerId);if(n){for(const s of e)if(s.type==="UNIT_ATTACKED"){const r=n.revealedTiles[Ke(s.to.x,s.to.y,t.mapSize)],a=n.revealedTiles[Ke(s.from.x,s.from.y,t.mapSize)];if(r||a){this.sceneManager.focusOnWorld(ot(s.to.x,s.to.y,t.mapSize,0),!1);return}}else if(s.type==="CITY_CAPTURED"){if(n.revealedTiles[Ke(s.coord.x,s.coord.y,t.mapSize)]){this.sceneManager.focusOnWorld(ot(s.coord.x,s.coord.y,t.mapSize,0),!1);return}}else if(s.type==="SUPERPOWER_USED"&&s.target&&n.revealedTiles[Ke(s.target.x,s.target.y,t.mapSize)]){this.sceneManager.focusOnWorld(ot(s.target.x,s.target.y,t.mapSize,0),!1);return}}}checkPostActionState(){if(this.state){if(this.state.phase==="game_over"){Rr(),this.cancelSuperpowerTargeting(),this.tutorial.hide(),this.ageUpModal.close(),this.techModal.close(),this.cityRewardModal.close(),this.factionDossierModal.close(),this.leaderboardModal.close(),this.hideRewardToast(),this.actionBar.hide(),this.clearSelection(),this.input?.setInputLocked(!0),this.gameOverOverlay.show({state:this.state,humanPlayerId:this.humanPlayerId});return}this.persistActiveCampaign(),this.isHumanTurn()&&this.openNextPendingCityReward()}}openNextPendingCityReward(){if(!this.state||this.cityRewardModal.isOpen())return!1;const e=ke(this.state,this.humanPlayerId);if(!e)return!1;const t=Wt(this.state,this.humanPlayerId).find(n=>n.pendingLevelRewards.length>0);return t?(this.cancelSuperpowerTargeting(),this.cityRewardModal.open({city:t,levelReached:t.pendingLevelRewards[0],faction:e.faction}),this.pauseSceneBehindOpaqueSheet(),!0):!1}openTechModal(){if(!this.state)return;if(this.tutorial.isActive()&&this.tutorial.getStage()!=="codex"){dt("tap"),this.tutorial.nudge(this.getTutorialNudgeForCurrentStage());return}dt("tap"),this.cancelSuperpowerTargeting(),this.factionDossierModal.close(),this.leaderboardModal.close();const e=this.buildTechModalViewModel();e&&(this.pauseSceneBehindOpaqueSheet(),this.techModal.open(e))}handleUnlockTechRequest(e){if(!this.state)return;if(this.tutorial.isActive()&&this.tutorial.getStage()!=="codex"){dt("tap"),this.tutorial.nudge(this.getTutorialNudgeForCurrentStage());return}dt("tap"),this.cancelSuperpowerTargeting(),this.factionDossierModal.close(),this.leaderboardModal.close();const t=this.buildTechModalViewModel();t&&(this.pauseSceneBehindOpaqueSheet(),this.techModal.openToTech(t,e))}pauseSceneBehindOpaqueSheet(){window.EldermereAndroid&&this.sceneManager?.stop()}resumeSceneAfterOpaqueSheet(){window.EldermereAndroid&&(this.shouldKeepScenePausedForAndroid()||this.sceneManager?.start())}openFactionDossier(e){if(!this.state)return;dt("tap"),this.cancelSuperpowerTargeting(),this.techModal.close(),this.leaderboardModal.close();const t=this.buildFactionDossierViewModel();t&&(this.pauseSceneBehindOpaqueSheet(),this.factionDossierModal.open(t,e))}openLeaderboardModal(){if(!this.state)return;dt("tap"),this.cancelSuperpowerTargeting(),this.techModal.close(),this.factionDossierModal.close();const e=this.buildLeaderboardViewModel();e&&(this.pauseSceneBehindOpaqueSheet(),this.leaderboardModal.open(e))}buildLeaderboardViewModel(){if(!this.state)return null;const e=ke(this.state,this.humanPlayerId);return{entries:Jh(this.state),turn:this.state.turn,maxTurns:this.state.config.maxTurns,age:e?kn(e):1,tutorialActive:this.tutorial.isActive()}}showRuinsRewardToast(e,t){let n="";if(e.rewardKind==="gold")n=`<strong class="toast-reward-highlight">+${e.amount??5}${Q("star","icon icon-sm icon-star")}</strong><span>Treasury Found</span>`;else if(e.rewardKind==="tech")n=`<strong class="toast-reward-highlight">${(e.techId?Ct[e.techId]?.name??e.techId:"Ancient Lore").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</strong><span>Lore Unlocked</span>`;else{const s=e.amount??3,r=e.cityId?t.cities[e.cityId]?.name:void 0,a=r?r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):"Nearest City";n=`<strong class="toast-reward-highlight">+${s} Pop</strong><span>to ${a}</span>`}this.rewardToastEl.innerHTML=`
      <span class="toast-ruins-icon">${Q("ruins","icon")}</span>
      <span class="toast-ruins-body">
        <span class="toast-ruins-kicker">Ancient Ruins Explored</span>
        <span class="toast-ruins-line">${n}</span>
      </span>
    `,this.rewardToastEl.classList.remove("hidden","toast-show"),this.rewardToastEl.offsetWidth,this.rewardToastEl.classList.add("toast-show"),this.rewardToastTimer!==null&&window.clearTimeout(this.rewardToastTimer),this.rewardToastTimer=window.setTimeout(()=>{this.hideRewardToast()},3e3)}hideRewardToast(){this.rewardToastTimer!==null&&(window.clearTimeout(this.rewardToastTimer),this.rewardToastTimer=null),this.rewardToastEl.classList.remove("toast-show"),this.rewardToastEl.classList.add("hidden")}buildFactionDossierViewModel(){if(!this.state)return null;const e=ke(this.state,this.humanPlayerId);return e?{humanPlayer:e,allPlayers:this.state.players}:null}buildTechModalViewModel(){if(!this.state)return null;const e=ke(this.state,this.humanPlayerId);if(!e)return null;const t=ti(e.faction),n={};for(const r of t)n[r.id]=Kr(this.state,e.id,r.id);const s=this.tutorial.isActive()&&this.tutorial.getStage()==="codex"?this.getTutorialTargetTechId():null;return{player:e,state:this.state,cityCount:Wt(this.state,e.id).length,isHumanTurn:this.isHumanTurn(),techCosts:n,tutorialTargetTechId:s}}refreshHUD(){if(this.refreshTopBar(),this.refreshActionBar(),this.techModal.isOpen()){const e=this.buildTechModalViewModel();e&&this.techModal.update(e)}if(this.factionDossierModal.isOpen()){const e=this.buildFactionDossierViewModel();e&&this.factionDossierModal.update(e)}if(this.leaderboardModal.isOpen()){const e=this.buildLeaderboardViewModel();e&&this.leaderboardModal.update(e)}}refreshTopBar(){if(!this.state)return;const e=ke(this.state,this.humanPlayerId);if(!e)return;const t=Us(this.state),n=t.id===e.id&&this.state.phase==="playing";this.topBar.update({player:e,activePlayer:t,turn:this.state.turn,maxTurns:this.state.config.maxTurns,age:kn(e),techCount:e.techs.length,canUseSuperpower:kr(this.state,e.id),superpowerUsed:!!e.superpowerUsed,superpowerName:na[e.faction].shortLabel,superpowerTargeting:this.isSuperpowerTargeting,isHumanTurn:n})}refreshActionBar(){if(!this.state||this.state.phase!=="playing"){this.actionBar.hide();return}const e=ke(this.state,this.humanPlayerId);if(!e)return;const t=this.isHumanTurn(),s=ti(e.faction).filter(w=>Ur(this.state,e.id,w.id)).length,r=this.getReadyHumanUnits().length,a=this.tutorial.isActive()&&this.tutorial.getStage()==="end_turn",o=r===0||a,l=this.buildCombatPreview(),c=!this.tutorial.isActive()&&kr(this.state,this.humanPlayerId),d=na[e.faction];if(!this.selectedCoord){this.actionBar.update({isHumanTurn:t,playerFaction:e.faction,playerGold:e.gold,hasAffordableTech:s>0,affordableTechCount:s,remainingUnitsCount:r,allUnitsActed:o,canUseSuperpower:c,superpowerTargeting:this.isSuperpowerTargeting,superpowerLabel:d.shortLabel,selectionLayer:"unit",canToggleLayer:!1,altLayerLabel:"Tile",selectedUnit:null,selectedCity:null,selectedTile:null,combatPreview:l});return}const u=he(this.state,this.selectedCoord.x,this.selectedCoord.y);if(!u)return;const h=this.getUnitAtCoord(this.selectedCoord),f=h?this.buildSelectedUnitInfo(h.id):null,g=u.isCityCenter&&u.cityId?this.buildSelectedCityInfo(u.cityId):null,v=this.buildSelectedTileInfo(u,e),m=!!(h&&this.hasTileUnderlay(u,e)),p=g?"City":"Tile",y={isHumanTurn:t,playerFaction:e.faction,playerGold:e.gold,hasAffordableTech:s>0,affordableTechCount:s,remainingUnitsCount:r,allUnitsActed:o,selectionLayer:this.selectionLayer,canToggleLayer:m,altLayerLabel:p,selectedUnit:f,selectedCity:g,selectedTile:v,combatPreview:l};this.actionBar.update(y)}buildCombatPreview(){if(!this.state||this.selectionLayer!=="unit"||!this.selectedUnitId||!this.hoveredCoord||!this.isHumanTurn()||!this.validAttacks.some(c=>c.x===this.hoveredCoord.x&&c.y===this.hoveredCoord.y))return null;const t=he(this.state,this.hoveredCoord.x,this.hoveredCoord.y);if(!t?.unitId)return null;const n=this.state.units[this.selectedUnitId],s=this.state.units[t.unitId];if(!n||!s||s.ownerId===n.ownerId)return null;const r=ke(this.state,n.ownerId),a=ke(this.state,s.ownerId);if(!r||!a)return null;const o=$a(this.state,n.id,s.id),l=!!(t.isCityCenter||t.hasVillage);return{preview:o,attacker:n,attackerOwner:r,defender:s,defenderOwner:a,targetIsCityOrVillage:l}}buildSelectedUnitInfo(e){if(!this.state)return null;const t=this.state.units[e];if(!t)return null;const n=ke(this.state,t.ownerId);if(!n)return null;const s=he(this.state,t.x,t.y),r=Bt[t.type],a=r.movement>0&&n.faction==="humans"&&s?.hasRoad?1:0,o=n.techs.includes("humans_ride_of_rohirrim")&&(t.type==="rider"||t.type==="rohirrim_knight")?1:0,l=r.movement>0&&n.faction==="elves"&&(this.state.eclipseTurnsRemaining??0)>0&&this.state.eclipseOwnerId===n.id?1:0,c=t.ownerId===this.humanPlayerId,d=c?af(this.state,t.id):[],u=this.tutorial.isActive()?d.filter(h=>!!(h.action&&this.isActionAllowedByTutorial(h.action))):d;return{unit:t,owner:n,isOwnedByHuman:c,effectiveAttack:Hu(this.state,t),effectiveDefense:zu(this.state,t),effectiveMovement:r.movement+a+o+l,actions:u}}buildSelectedCityInfo(e){if(!this.state)return null;const t=this.state.cities[e];if(!t)return null;const n=ke(this.state,t.ownerId);if(!n)return null;const s=t.ownerId===this.humanPlayerId,r=so(this.state,t.id),a=io(this.state,t),l=!!he(this.state,t.x,t.y)?.unitId,c=t.level+(t.isCapital?1:0)+(t.hasWorkshop?1:0)+t.parks+(t.connectedToCapital&&!t.isCapital&&n.faction==="humans"?1:0)+(t.level>=3&&n.techs.includes("humans_granaries")?1:0)+(t.hasWalls&&n.techs.includes("humans_citadel_masonry")?1:0)+(n.techs.includes("humans_stewards_citadel")?1:0)+(n.techs.includes("dwarves_deep_vaults")?1:0),d=s?rf(this.state,t.id):[],u=this.tutorial.isActive()?d.filter(h=>!!(h.action&&this.isActionAllowedByTutorial(h.action))):d;return{city:t,owner:n,isOwnedByHuman:s,unitCount:r,unitCap:a,income:c,popNeeded:t.level+1,occupiedByUnit:l,trainOptions:u}}buildSelectedTileInfo(e,t){const n=this.state,s=!!t.revealedTiles[Ke(e.x,e.y,n.mapSize)];let r=1;e.terrain==="mountain"?r=t.faction==="dwarves"?1.75:1.5:(e.terrain==="forest"||e.terrain==="ancient_woods")&&(r=1.5),e.isCityCenter&&e.cityId&&n.cities[e.cityId]?.hasWalls&&(r=2);const a=Pc(n,t.id,e.x,e.y),o=this.tutorial.isActive()?a.filter(l=>!!(l.action&&this.isActionAllowedByTutorial(l.action))):a;return{tile:e,terrainName:NM[e.terrain],defenseBonus:r,isRevealed:s,actions:o}}}function Lu(){const i=document.getElementById("canvas-container"),e=document.getElementById("world-badges"),t=document.getElementById("hud-root");if(!i||!e||!t)throw new Error("Missing required root DOM containers (#canvas-container, #world-badges, #hud-root)");new BM(i,e,t)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Lu):Lu();
//# sourceMappingURL=index-BGM3_4C1.js.map
