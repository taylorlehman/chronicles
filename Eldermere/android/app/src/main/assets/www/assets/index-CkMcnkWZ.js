(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const dt={humans:{id:"humans",name:"Humans",realm:"Valoria & Sunmark",tagline:"Kingdom Builders & Cavalry",startingTech:"humans_gathering",startingUnit:"rider",startingGold:5,uniqueUnit:"rohirrim_knight",uniqueMechanicName:"Beacon Network",uniqueMechanicDescription:"Cities connected by Roads (or within 4 tiles of Capital) gain +1★/turn; units starting on a Road get +1 MOV.",palette:{primary:"#2563eb",secondary:"#ece8df",accent:"#eab308",biomeGround:"#7ec850"},cityNames:["Solhaven","Suncrest","Bridgewatch","Whitecliff","Tidehaven","Goldmeadow","Riverfort","Highvale"]},orcs:{id:"orcs",name:"Orcs",realm:"Ashfell & Ironspire",tagline:"Aggressive War-Economy Swarm",startingTech:"orcs_pillage",startingUnit:"warrior",startingGold:7,uniqueUnit:"uruk_berserker",uniqueMechanicName:"Spoils of War",uniqueMechanicDescription:"Killing an enemy unit grants +2★ immediately; capturing a Village or City grants +4★.",palette:{primary:"#dc2626",secondary:"#2e2a33",accent:"#f97316",biomeGround:"#57534e"},cityNames:["Dreadspire","Ironhold","Grimwatch","Fangpass","Ashen Gate","Blightkeep","Skullcrag","Cinderfort"]},elves:{id:"elves",name:"Elves",realm:"Sylvanvale & Starhaven",tagline:"Mobile Forest Guardians",startingTech:"elves_woodland_lore",startingUnit:"archer",startingGold:5,uniqueUnit:"elven_sentinel",uniqueMechanicName:"Woodland Grace",uniqueMechanicDescription:"Units move through Forest/Ancient Woods with no penalty, and untouched Ancient Woods in borders grant +1★/turn (up to +3★/city).",palette:{primary:"#10b981",secondary:"#f5f0e1",accent:"#facc15",biomeGround:"#65c18c"},cityNames:["Silverglade","Starhaven","Mistport","Thornhall","Goldhill","Moonbay","Sylvanvale","Dawnwood"]},dwarves:{id:"dwarves",name:"Dwarves",realm:"Deepforge & Stonehelm",tagline:"Mountain Fortress Economy",startingTech:"dwarves_delving",startingUnit:"defender",startingGold:5,uniqueUnit:"ironbreaker",uniqueMechanicName:"Deep Mines",uniqueMechanicDescription:"Can traverse Mountains from Turn 1 with 1.75x DEF on Mountains; every Mine on a Mountain grants +1★/turn and +2 Pop.",palette:{primary:"#d97706",secondary:"#64748b",accent:"#fb923c",biomeGround:"#6b8e58"},cityNames:["Deepforge","Stonehelm","Anvil Peaks","Hammerhall","Copperdelve","Frostcrag","Crystal Delve","Runehaven"]}},an=["humans","orcs","elves","dwarves"],mt={warrior:{type:"warrior",name:"Warrior",faction:null,cost:2,maxHp:10,attack:2,defense:2,movement:1,range:1,traits:["dash","fortify"],description:"Reliable frontline scout and village capturer."},defender:{type:"defender",name:"Defender",faction:null,cost:3,maxHp:15,attack:1,defense:3,movement:1,range:1,traits:["fortify"],description:"Heavy shield wall built to hold cities and chokepoints."},archer:{type:"archer",name:"Archer",faction:null,cost:3,maxHp:10,attack:2,defense:1,movement:1,range:2,traits:["dash"],description:"Fragile range-2 fire support that softens targets safely."},rider:{type:"rider",name:"Rider",faction:null,cost:3,maxHp:10,attack:2,defense:1,movement:2,range:1,traits:["dash","escape"],description:"Swift flanker and explorer that can retreat after attacking."},catapult:{type:"catapult",name:"Catapult",faction:null,cost:7,maxHp:10,attack:4,defense:0,movement:1,range:3,traits:["siege"],description:"Long-range city breaker that ignores City Walls (cannot move and fire)."},rohirrim_knight:{type:"rohirrim_knight",name:"Sunmark Knight",faction:"humans",cost:6,maxHp:15,attack:3.5,defense:1.5,movement:3,range:1,traits:["dash","persist"],description:"Noble horsemen of Sunmark. Persist: killing an enemy grants an immediate extra attack."},uruk_berserker:{type:"uruk_berserker",name:"Ironblood Berserker",faction:"orcs",cost:5,maxHp:18,attack:3.5,defense:2,movement:2,range:1,traits:["dash","bloodlust"],description:"Frenzied shock trooper. Bloodlust: always strikes at full 3.5 ATK regardless of HP."},elven_sentinel:{type:"elven_sentinel",name:"Elven Sentinel",faction:"elves",cost:5,maxHp:12,attack:3,defense:2,movement:1,range:2,traits:["dash","escape","skirmish"],description:"Deadly woodland marksman. Skirmish: strikes from range 2 and fades back into cover."},ironbreaker:{type:"ironbreaker",name:"Ironbreaker",faction:"dwarves",cost:5,maxHp:20,attack:3,defense:3.5,movement:1,range:1,traits:["dash","fortify","stalwart"],description:"Starsteel-clad juggernaut. Stalwart: immune to Persist chains and takes -1 ranged damage."},dragon:{type:"dragon",name:"Fire Drake",faction:"dwarves",cost:0,maxHp:20,attack:4.5,defense:3,movement:3,range:2,traits:["dash","flying"],description:"Ancient winged Fire Drake awakened from the peaks. Flies freely over water and mountains."},watchtower:{type:"watchtower",name:"Watchtower",faction:"humans",cost:0,maxHp:25,attack:3.5,defense:4.5,movement:0,range:2,traits:["fortify"],description:"Fortified stone tower. Cannot move, but fires volleys at enemies within range 2."}},Wf=["warrior","defender","archer","rider","catapult"],$f=["warrior","defender","archer","rider","catapult","rohirrim_knight","uruk_berserker","elven_sentinel","ironbreaker"],Bi={farm:{type:"farm",name:"Farm",cost:4,basePop:2,allowedTerrains:["plains"],goldPerTurn:0,description:"+2 Pop on Plains."},windmill:{type:"windmill",name:"Windmill",cost:5,basePop:0,allowedTerrains:["plains"],goldPerTurn:0,adjacentBonusTo:"farm",adjacentPopPerMatch:1,description:"+1 Pop & +1★/turn per adjacent Farm."},slag_pit:{type:"slag_pit",name:"Slag Pit",cost:3,basePop:1,allowedTerrains:["wasteland"],goldPerTurn:0,description:"+1 Pop on Wasteland."},foundry:{type:"foundry",name:"Foundry",cost:5,basePop:2,allowedTerrains:["wasteland"],goldPerTurn:0,description:"+2 Pop on Wasteland."},sanctuary:{type:"sanctuary",name:"Sanctuary",cost:4,basePop:2,allowedTerrains:["forest","ancient_woods"],goldPerTurn:0,description:"+2 Pop in Forest or Ancient Woods without chopping."},mine:{type:"mine",name:"Mine",cost:4,basePop:2,allowedTerrains:["mountain"],goldPerTurn:1,description:"+2 Pop and +1★/turn on Mountain."},great_forge:{type:"great_forge",name:"Great Forge",cost:5,basePop:0,allowedTerrains:["plains","mountain"],goldPerTurn:0,adjacentBonusTo:"mine",adjacentPopPerMatch:2,description:"+2 Pop per adjacent Mine."}},kt={humans_gathering:{id:"humans_gathering",faction:"humans",pillar:"Stewardship",pillarIndex:0,tier:1,slot:"root",prerequisites:[],name:"Gathering",summary:"Harvest Berries (2★, +1 Pop).",iconKey:"berries",unlocksUnits:[],unlocksResources:["berries"],unlocksImprovements:[]},humans_farming:{id:"humans_farming",faction:"humans",pillar:"Stewardship",pillarIndex:0,tier:2,slot:"a",prerequisites:["humans_gathering"],name:"Farming",summary:"Build Farms on Plains (4★, +2 Pop).",iconKey:"farm",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["farm"]},humans_granaries:{id:"humans_granaries",faction:"humans",pillar:"Stewardship",pillarIndex:0,tier:2,slot:"b",prerequisites:["humans_gathering"],name:"Royal Granaries",summary:"Cities at Lv 3+ gain +1★/turn & +1 Unit Cap.",iconKey:"city",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_milling:{id:"humans_milling",faction:"humans",pillar:"Stewardship",pillarIndex:0,tier:3,slot:"capstone",prerequisites:["humans_farming"],name:"Windmills",summary:"Build Windmills on Plains (5★, +1 Pop & +1★/turn per adjacent Farm).",iconKey:"windmill",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["windmill"]},humans_roads:{id:"humans_roads",faction:"humans",pillar:"Roadcraft & Citadels",pillarIndex:1,tier:1,slot:"root",prerequisites:[],name:"Roadcraft",summary:"Build Roads (2★; +1 MOV & Beacon Network +1★/turn).",iconKey:"road",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksRoad:!0},humans_shield_wall:{id:"humans_shield_wall",faction:"humans",pillar:"Roadcraft & Citadels",pillarIndex:1,tier:2,slot:"a",prerequisites:["humans_roads"],name:"Royal Shield Wall",summary:"Unlocks Defender unit.",iconKey:"defender",unlocksUnits:["defender"],unlocksResources:[],unlocksImprovements:[]},humans_citadel_masonry:{id:"humans_citadel_masonry",faction:"humans",pillar:"Roadcraft & Citadels",pillarIndex:1,tier:2,slot:"b",prerequisites:["humans_roads"],name:"Citadel Masonry",summary:"Walled cities heal garrison +2 HP/turn & grant +1★/turn.",iconKey:"city_wall",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_stewards_citadel:{id:"humans_stewards_citadel",faction:"humans",pillar:"Roadcraft & Citadels",pillarIndex:1,tier:3,slot:"capstone",prerequisites:["humans_citadel_masonry"],name:"High Citadel",summary:"All cities gain +1★/turn & +1 Unit Cap.",iconKey:"city_wall",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_riding:{id:"humans_riding",faction:"humans",pillar:"Horsemanship",pillarIndex:2,tier:1,slot:"root",prerequisites:[],name:"Riding",summary:"Unlocks Rider cavalry unit.",iconKey:"rider",unlocksUnits:["rider"],unlocksResources:[],unlocksImprovements:[]},humans_plains_charge:{id:"humans_plains_charge",faction:"humans",pillar:"Horsemanship",pillarIndex:2,tier:2,slot:"a",prerequisites:["humans_riding"],name:"Plains Charge",summary:"Riders & Sunmark Knights gain +0.5 ATK on Plains.",iconKey:"rider",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_chivalry:{id:"humans_chivalry",faction:"humans",pillar:"Horsemanship",pillarIndex:2,tier:2,slot:"b",prerequisites:["humans_riding"],name:"Chivalry",summary:"Unlocks Sunmark Knight (Persist champion).",iconKey:"rohirrim_knight",unlocksUnits:["rohirrim_knight"],unlocksResources:[],unlocksImprovements:[]},humans_ride_of_rohirrim:{id:"humans_ride_of_rohirrim",faction:"humans",pillar:"Horsemanship",pillarIndex:2,tier:3,slot:"capstone",prerequisites:["humans_chivalry"],name:"Charge of the Sunmark",summary:"Riders & Sunmark Knights gain +1 MOV & +3 maxHP.",iconKey:"rohirrim_knight",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},humans_hunting:{id:"humans_hunting",faction:"humans",pillar:"Rangers & Siege",pillarIndex:3,tier:1,slot:"root",prerequisites:[],name:"Ranger Hunting",summary:"Harvest Game (2★, +1 Pop) & +2★ bonus on Ancient Ruins.",iconKey:"game",unlocksUnits:[],unlocksResources:["game"],unlocksImprovements:[]},humans_archery:{id:"humans_archery",faction:"humans",pillar:"Rangers & Siege",pillarIndex:3,tier:2,slot:"a",prerequisites:["humans_hunting"],name:"Archery",summary:"Unlocks Archer ranged unit.",iconKey:"archer",unlocksUnits:["archer"],unlocksResources:[],unlocksImprovements:[]},humans_mountaineering:{id:"humans_mountaineering",faction:"humans",pillar:"Rangers & Siege",pillarIndex:3,tier:2,slot:"b",prerequisites:["humans_hunting"],name:"Mountaineering",summary:"Units can traverse Mountains (1.5× DEF, +1 vision).",iconKey:"mountain",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksMountainPass:!0},humans_siegecraft:{id:"humans_siegecraft",faction:"humans",pillar:"Rangers & Siege",pillarIndex:3,tier:3,slot:"capstone",prerequisites:["humans_archery"],name:"Royal Siegecraft",summary:"Unlocks Catapult siege unit (+0.5 ATK with royal engineering).",iconKey:"catapult",unlocksUnits:["catapult"],unlocksResources:[],unlocksImprovements:[]},orcs_pillage:{id:"orcs_pillage",faction:"orcs",pillar:"Raiding",pillarIndex:0,tier:1,slot:"root",prerequisites:[],name:"Pillage & Foraging",summary:"Harvest Berries & Game (2★, +1 Pop).",iconKey:"berries",unlocksUnits:[],unlocksResources:["berries","game"],unlocksImprovements:[]},orcs_warg_riders:{id:"orcs_warg_riders",faction:"orcs",pillar:"Raiding",pillarIndex:0,tier:2,slot:"a",prerequisites:["orcs_pillage"],name:"Direwolf Riders",summary:"Unlocks Rider (Direwolf Rider) cavalry unit.",iconKey:"rider",unlocksUnits:["rider"],unlocksResources:[],unlocksImprovements:[]},orcs_spoils_mastery:{id:"orcs_spoils_mastery",faction:"orcs",pillar:"Raiding",pillarIndex:0,tier:2,slot:"b",prerequisites:["orcs_pillage"],name:"Spoils Mastery",summary:"Spoils of War grants +1★ extra (+3★/kill, +5★/capture).",iconKey:"ruins",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_pack_tactics:{id:"orcs_pack_tactics",faction:"orcs",pillar:"Raiding",pillarIndex:0,tier:3,slot:"capstone",prerequisites:["orcs_warg_riders"],name:"Pack Tactics",summary:"Direwolf Riders gain +0.5 ATK & +3 maxHP.",iconKey:"rider",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_clear_cutting:{id:"orcs_clear_cutting",faction:"orcs",pillar:"Dark Industry",pillarIndex:1,tier:1,slot:"root",prerequisites:[],name:"Clear-Cutting",summary:"Chop Forest (0★ → +2★) & build Slag Pit on Wasteland (3★, +1 Pop).",iconKey:"slag_pit",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["slag_pit"],unlocksChopForest:!0},orcs_dark_forges:{id:"orcs_dark_forges",faction:"orcs",pillar:"Dark Industry",pillarIndex:1,tier:2,slot:"a",prerequisites:["orcs_clear_cutting"],name:"Dark Forges",summary:"Build Foundry on Wasteland (5★, +2 Pop).",iconKey:"foundry",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["foundry"]},orcs_siege_works:{id:"orcs_siege_works",faction:"orcs",pillar:"Dark Industry",pillarIndex:1,tier:2,slot:"b",prerequisites:["orcs_clear_cutting"],name:"Siege Works",summary:"Unlocks Catapult siege unit (discounted to 6★).",iconKey:"catapult",unlocksUnits:["catapult"],unlocksResources:[],unlocksImprovements:[]},orcs_mount_doom:{id:"orcs_mount_doom",faction:"orcs",pillar:"Dark Industry",pillarIndex:1,tier:3,slot:"capstone",prerequisites:["orcs_dark_forges"],name:"Volcanic Furnaces",summary:"Foundries generate +1★/turn & Catapults gain +1 ATK.",iconKey:"foundry",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_shield_wall:{id:"orcs_shield_wall",faction:"orcs",pillar:"Iron Discipline",pillarIndex:2,tier:1,slot:"root",prerequisites:[],name:"Shield Wall",summary:"Unlocks Defender unit.",iconKey:"defender",unlocksUnits:["defender"],unlocksResources:[],unlocksImprovements:[]},orcs_uruk_breeding:{id:"orcs_uruk_breeding",faction:"orcs",pillar:"Iron Discipline",pillarIndex:2,tier:2,slot:"a",prerequisites:["orcs_shield_wall"],name:"War-Pit Breeding",summary:"Unlocks Ironblood Berserker (Bloodlust champion).",iconKey:"uruk_berserker",unlocksUnits:["uruk_berserker"],unlocksResources:[],unlocksImprovements:[]},orcs_war_barracks:{id:"orcs_war_barracks",faction:"orcs",pillar:"Iron Discipline",pillarIndex:2,tier:2,slot:"b",prerequisites:["orcs_shield_wall"],name:"War Barracks",summary:"All cities gain +1 Unit Cap.",iconKey:"city",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_black_gate:{id:"orcs_black_gate",faction:"orcs",pillar:"Iron Discipline",pillarIndex:2,tier:3,slot:"capstone",prerequisites:["orcs_uruk_breeding"],name:"Ashen Gate Horde",summary:"Ironblood Berserkers cost 4★ & gain +3 maxHP.",iconKey:"uruk_berserker",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_snaga_archers:{id:"orcs_snaga_archers",faction:"orcs",pillar:"Shadow Marksmen",pillarIndex:3,tier:1,slot:"root",prerequisites:[],name:"Skirmish Archers",summary:"Unlocks Archer ranged unit.",iconKey:"archer",unlocksUnits:["archer"],unlocksResources:[],unlocksImprovements:[]},orcs_black_arrows:{id:"orcs_black_arrows",faction:"orcs",pillar:"Shadow Marksmen",pillarIndex:3,tier:2,slot:"a",prerequisites:["orcs_snaga_archers"],name:"Black Arrows",summary:"Archers deal +1 damage to wounded targets.",iconKey:"archer",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},orcs_crag_climbing:{id:"orcs_crag_climbing",faction:"orcs",pillar:"Shadow Marksmen",pillarIndex:3,tier:2,slot:"b",prerequisites:["orcs_snaga_archers"],name:"Crag Climbing",summary:"Units can traverse Mountains (1.5× DEF, +1 vision).",iconKey:"mountain",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksMountainPass:!0},orcs_fell_volley:{id:"orcs_fell_volley",faction:"orcs",pillar:"Shadow Marksmen",pillarIndex:3,tier:3,slot:"capstone",prerequisites:["orcs_black_arrows"],name:"Fell Volley",summary:"Archers gain +1 RNG (range 3).",iconKey:"archer",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_woodland_lore:{id:"elves_woodland_lore",faction:"elves",pillar:"Sylvan Harmony",pillarIndex:0,tier:1,slot:"root",prerequisites:[],name:"Woodland Lore",summary:"Harvest Berries & Game (2★, +1 Pop) & train Archers.",iconKey:"berries",unlocksUnits:["archer"],unlocksResources:["berries","game"],unlocksImprovements:[]},elves_sanctuaries:{id:"elves_sanctuaries",faction:"elves",pillar:"Sylvan Harmony",pillarIndex:0,tier:2,slot:"a",prerequisites:["elves_woodland_lore"],name:"Woodland Sanctuaries",summary:"Build Sanctuary in Woods (4★, +2 Pop without chopping).",iconKey:"sanctuary",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["sanctuary"]},elves_tree_singing:{id:"elves_tree_singing",faction:"elves",pillar:"Sylvan Harmony",pillarIndex:0,tier:2,slot:"b",prerequisites:["elves_woodland_lore"],name:"Tree-Singing",summary:"Plant Ancient Woods on Plains (3★, +1 Pop).",iconKey:"ancient_woods",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksPlantWoods:!0},elves_lothlorien_sanctum:{id:"elves_lothlorien_sanctum",faction:"elves",pillar:"Sylvan Harmony",pillarIndex:0,tier:3,slot:"capstone",prerequisites:["elves_sanctuaries"],name:"Golden Sanctum",summary:"Sanctuaries grant +1★/turn & Ancient Woods cap rises to +5★/city.",iconKey:"sanctuary",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_woodland_aim:{id:"elves_woodland_aim",faction:"elves",pillar:"Starlight Archery",pillarIndex:1,tier:1,slot:"root",prerequisites:[],name:"Woodland Aim",summary:"Ranged units gain +0.5 ATK from Forest or Ancient Woods.",iconKey:"archer",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_sentinel_order:{id:"elves_sentinel_order",faction:"elves",pillar:"Starlight Archery",pillarIndex:1,tier:2,slot:"a",prerequisites:["elves_woodland_aim"],name:"Sentinel Order",summary:"Unlocks Elven Sentinel (Skirmish champion).",iconKey:"elven_sentinel",unlocksUnits:["elven_sentinel"],unlocksResources:[],unlocksImprovements:[]},elves_keen_sight:{id:"elves_keen_sight",faction:"elves",pillar:"Starlight Archery",pillarIndex:1,tier:2,slot:"b",prerequisites:["elves_woodland_aim"],name:"Keen Sight",summary:"All units gain +1 vision radius in Forest or Ancient Woods.",iconKey:"forest",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_galadhrim_precision:{id:"elves_galadhrim_precision",faction:"elves",pillar:"Starlight Archery",pillarIndex:1,tier:3,slot:"capstone",prerequisites:["elves_sentinel_order"],name:"Starlight Precision",summary:"Elven Sentinels gain +0.5 ATK & +3 maxHP.",iconKey:"elven_sentinel",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_elven_steeds:{id:"elves_elven_steeds",faction:"elves",pillar:"Swiftness & Wardens",pillarIndex:2,tier:1,slot:"root",prerequisites:[],name:"Elven Steeds",summary:"Unlocks Rider cavalry unit.",iconKey:"rider",unlocksUnits:["rider"],unlocksResources:[],unlocksImprovements:[]},elves_wardens:{id:"elves_wardens",faction:"elves",pillar:"Swiftness & Wardens",pillarIndex:2,tier:2,slot:"a",prerequisites:["elves_elven_steeds"],name:"Gladewardens",summary:"Unlocks Defender unit.",iconKey:"defender",unlocksUnits:["defender"],unlocksResources:[],unlocksImprovements:[]},elves_graceful_guard:{id:"elves_graceful_guard",faction:"elves",pillar:"Swiftness & Wardens",pillarIndex:2,tier:2,slot:"b",prerequisites:["elves_elven_steeds"],name:"Graceful Guard",summary:"Defenders gain 1.5× DEF even on Plains.",iconKey:"defender",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_wind_riders:{id:"elves_wind_riders",faction:"elves",pillar:"Swiftness & Wardens",pillarIndex:2,tier:3,slot:"capstone",prerequisites:["elves_wardens"],name:"Wind Riders",summary:"Friendly units heal +2 HP/turn passively inside friendly borders.",iconKey:"park",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_high_paths:{id:"elves_high_paths",faction:"elves",pillar:"Ancient Wisdom",pillarIndex:3,tier:1,slot:"root",prerequisites:[],name:"High Paths",summary:"Units can traverse Mountains (1.5× DEF, +1 vision).",iconKey:"mountain",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[],unlocksMountainPass:!0},elves_elven_lore:{id:"elves_elven_lore",faction:"elves",pillar:"Ancient Wisdom",pillarIndex:3,tier:2,slot:"a",prerequisites:["elves_high_paths"],name:"Elven Lore",summary:"All future technologies cost -1★ (min 2★).",iconKey:"ruins",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},elves_mallorn_siege:{id:"elves_mallorn_siege",faction:"elves",pillar:"Ancient Wisdom",pillarIndex:3,tier:2,slot:"b",prerequisites:["elves_high_paths"],name:"Sunwood Siege",summary:"Unlocks Catapult siege unit.",iconKey:"catapult",unlocksUnits:["catapult"],unlocksResources:[],unlocksImprovements:[]},elves_rings_preservation:{id:"elves_rings_preservation",faction:"elves",pillar:"Ancient Wisdom",pillarIndex:3,tier:3,slot:"capstone",prerequisites:["elves_elven_lore"],name:"Wards of Preservation",summary:"Cities heal adjacent friendly units +2 HP/turn & +100 Glory per tech.",iconKey:"park",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_delving:{id:"dwarves_delving",faction:"dwarves",pillar:"Deep Delving",pillarIndex:0,tier:1,slot:"root",prerequisites:[],name:"Deep Delving",summary:"Traverse Mountains (1.75× DEF) & Harvest Ore/Starsteel (2★, +1/+2 Pop).",iconKey:"ore",unlocksUnits:[],unlocksResources:["ore","mithril"],unlocksImprovements:[],unlocksMountainPass:!0},dwarves_mining:{id:"dwarves_mining",faction:"dwarves",pillar:"Deep Delving",pillarIndex:0,tier:2,slot:"a",prerequisites:["dwarves_delving"],name:"Mountain Mining",summary:"Build Mine on Mountain (4★, +2 Pop & +1★/turn).",iconKey:"mine",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["mine"]},dwarves_khazad_forges:{id:"dwarves_khazad_forges",faction:"dwarves",pillar:"Deep Delving",pillarIndex:0,tier:2,slot:"b",prerequisites:["dwarves_delving"],name:"Runestone Forges",summary:"Build Great Forge (5★, +2 Pop per adjacent Mine).",iconKey:"great_forge",unlocksUnits:[],unlocksResources:[],unlocksImprovements:["great_forge"]},dwarves_heart_of_mountain:{id:"dwarves_heart_of_mountain",faction:"dwarves",pillar:"Deep Delving",pillarIndex:0,tier:3,slot:"capstone",prerequisites:["dwarves_mining"],name:"Heart of the Deep",summary:"Mines grant +2★/turn & Great Forges grant +1★/turn.",iconKey:"mithril",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_shieldbearers:{id:"dwarves_shieldbearers",faction:"dwarves",pillar:"Shield & Starsteel",pillarIndex:1,tier:1,slot:"root",prerequisites:[],name:"Shieldbearers",summary:"Unlocks Defender unit (+2 maxHP).",iconKey:"defender",unlocksUnits:["defender"],unlocksResources:[],unlocksImprovements:[]},dwarves_mithril_smithing:{id:"dwarves_mithril_smithing",faction:"dwarves",pillar:"Shield & Starsteel",pillarIndex:1,tier:2,slot:"a",prerequisites:["dwarves_shieldbearers"],name:"Starsteel Smithing",summary:"Unlocks Ironbreaker (Stalwart champion).",iconKey:"ironbreaker",unlocksUnits:["ironbreaker"],unlocksResources:[],unlocksImprovements:[]},dwarves_runic_plate:{id:"dwarves_runic_plate",faction:"dwarves",pillar:"Shield & Starsteel",pillarIndex:1,tier:2,slot:"b",prerequisites:["dwarves_shieldbearers"],name:"Runic Plate",summary:"All Dwarven melee units gain +0.5 DEF.",iconKey:"defender",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_mithril_phalanx:{id:"dwarves_mithril_phalanx",faction:"dwarves",pillar:"Shield & Starsteel",pillarIndex:1,tier:3,slot:"capstone",prerequisites:["dwarves_mithril_smithing"],name:"Starsteel Phalanx",summary:"Ironbreakers & Defenders gain +4 maxHP & 1.75× DEF on Plains.",iconKey:"ironbreaker",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_foraging:{id:"dwarves_foraging",faction:"dwarves",pillar:"Hearth & Halls",pillarIndex:2,tier:1,slot:"root",prerequisites:[],name:"Mountain Foraging",summary:"Harvest Berries & Game (2★, +1 Pop).",iconKey:"berries",unlocksUnits:[],unlocksResources:["berries","game"],unlocksImprovements:[]},dwarves_stone_walls:{id:"dwarves_stone_walls",faction:"dwarves",pillar:"Hearth & Halls",pillarIndex:2,tier:2,slot:"a",prerequisites:["dwarves_foraging"],name:"Stone Walls",summary:"All Lv 2+ cities gain free City Walls (2.0× DEF).",iconKey:"city_wall",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_crossbows:{id:"dwarves_crossbows",faction:"dwarves",pillar:"Hearth & Halls",pillarIndex:2,tier:2,slot:"b",prerequisites:["dwarves_foraging"],name:"Dwarven Crossbows",summary:"Unlocks Archer (Crossbowman) ranged unit.",iconKey:"archer",unlocksUnits:["archer"],unlocksResources:[],unlocksImprovements:[]},dwarves_deep_vaults:{id:"dwarves_deep_vaults",faction:"dwarves",pillar:"Hearth & Halls",pillarIndex:2,tier:3,slot:"capstone",prerequisites:["dwarves_stone_walls"],name:"Deep Vaults",summary:"All cities gain +1★/turn & +1 Unit Cap.",iconKey:"city",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_ram_riders:{id:"dwarves_ram_riders",faction:"dwarves",pillar:"Engineering & Rams",pillarIndex:3,tier:1,slot:"root",prerequisites:[],name:"Ram Riders",summary:"Unlocks Rider (Mountain Ram Rider — can enter Mountains).",iconKey:"rider",unlocksUnits:["rider"],unlocksResources:[],unlocksImprovements:[]},dwarves_siegecraft:{id:"dwarves_siegecraft",faction:"dwarves",pillar:"Engineering & Rams",pillarIndex:3,tier:2,slot:"a",prerequisites:["dwarves_ram_riders"],name:"Dwarven Siegecraft",summary:"Unlocks Catapult (15 HP & Fortify).",iconKey:"catapult",unlocksUnits:["catapult"],unlocksResources:[],unlocksImprovements:[]},dwarves_horned_charge:{id:"dwarves_horned_charge",faction:"dwarves",pillar:"Engineering & Rams",pillarIndex:3,tier:2,slot:"b",prerequisites:["dwarves_ram_riders"],name:"Horned Charge",summary:"Ram Riders gain +0.5 ATK.",iconKey:"rider",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]},dwarves_dragon_slayers:{id:"dwarves_dragon_slayers",faction:"dwarves",pillar:"Engineering & Rams",pillarIndex:3,tier:3,slot:"capstone",prerequisites:["dwarves_siegecraft"],name:"Dragon-Slayer Engines",summary:"Catapults cost 6★ and gain +0.5 ATK & +5 maxHP.",iconKey:"catapult",unlocksUnits:[],unlocksResources:[],unlocksImprovements:[]}},fd={root:0,a:1,b:2,capstone:3};function mi(i){return Object.values(kt).filter(e=>e.faction===i).sort((e,t)=>e.pillarIndex-t.pillarIndex||e.tier-t.tier||fd[e.slot]-fd[t.slot])}function Ve(i,e,t){return e*t+i}function _e(i,e,t){return e<0||t<0||e>=i.mapSize||t>=i.mapSize?null:i.tiles[t*i.mapSize+e]??null}const cr=2,dr=2,ur=3,Ll=2,Sh={berries:1,game:1,ore:1,mithril:2,ruins:0};function xt(i,e){return Math.max(Math.abs(i.x-e.x),Math.abs(i.y-e.y))}function He(i,e){return i.players.find(t=>t.id===e)}function fs(i){return i.players[i.activePlayerIndex]}function Qt(i,e){return Object.values(i.cities).filter(t=>t.ownerId===e)}function Lc(i,e){return Object.values(i.units).filter(t=>t.ownerId===e)}function Ps(i,e,t){const n=[];for(let s=-1;s<=1;s++)for(let r=-1;r<=1;r++){if(r===0&&s===0)continue;const a=_e(i,e+r,t+s);a&&n.push(a)}return n}function Pe(i,e){return i.techs.includes(e)}function Dc(i){return i.techs.some(e=>kt[e]?.unlocksMountainPass===!0)}function Xf(i,e){const t=mt[e.type].traits.slice(),n=He(i,e.ownerId);return n&&n.faction==="dwarves"&&e.type==="catapult"&&Pe(n,"dwarves_siegecraft")&&!t.includes("fortify")&&t.push("fortify"),t}function Wt(i,e,t){return Xf(i,e).includes(t)}function yr(i,e){const t=mt[e.type].range,n=He(i,e.ownerId);return n&&e.type==="archer"&&Pe(n,"orcs_fell_volley")?Math.min(3,t+1):t}function Co(i,e,t){let n=mt[t].cost;const s=He(i,e);return s&&(t==="catapult"&&Pe(s,"orcs_siege_works")&&(n=Math.min(n,6)),t==="catapult"&&Pe(s,"dwarves_dragon_slayers")&&(n=Math.max(1,n-1)),t==="uruk_berserker"&&Pe(s,"orcs_black_gate")&&(n=Math.max(1,n-1))),n}function Io(i,e,t){let n=mt[t].maxHp;const s=He(i,e);return s&&(t==="defender"&&Pe(s,"dwarves_shieldbearers")&&(n+=2),t==="catapult"&&Pe(s,"dwarves_siegecraft")&&(n+=5),(t==="rider"||t==="rohirrim_knight")&&Pe(s,"humans_ride_of_rohirrim")&&(n+=3),t==="rider"&&Pe(s,"orcs_pack_tactics")&&(n+=3),t==="uruk_berserker"&&Pe(s,"orcs_black_gate")&&(n+=3),t==="elven_sentinel"&&Pe(s,"elves_galadhrim_precision")&&(n+=3),(t==="ironbreaker"||t==="defender")&&Pe(s,"dwarves_mithril_phalanx")&&(n+=4),t==="catapult"&&Pe(s,"dwarves_dragon_slayers")&&(n+=5)),n}function Rs(i,e){const t=He(i,e.ownerId);let n=Math.min(4,e.level+1);return t&&Pe(t,"humans_granaries")&&e.level>=3&&(n+=1),t&&Pe(t,"humans_stewards_citadel")&&(n+=1),t&&Pe(t,"orcs_war_barracks")&&(n+=1),t&&Pe(t,"dwarves_deep_vaults")&&(n+=1),n}function aa(i,e){const t=i.cities[e];if(!t)return 0;let n=0;for(const s of Object.values(i.units))s.ownerId===t.ownerId&&s.homeCityId===e&&n++;return n}function Uc(i,e){const t=i.cities[e];if(!t)return[];const n=He(i,t.ownerId);if(!n)return[];const s=new Set(["warrior"]);for(const r of n.techs){const a=kt[r];if(a)for(const o of a.unlocksUnits)s.add(o)}return $f.filter(r=>s.has(r)&&r!=="dragon"&&r!=="watchtower")}const ba={elves:{faction:"elves",name:"Starlit Eclipse",shortLabel:"Eclipse",description:"Plunges the realm into darkness for 3 turns. All Elven units gain +1 MOV and +1 ATK.",requiresTarget:!1},orcs:{faction:"orcs",name:"Volcanic Cataclysm",shortLabel:"Volcano",description:"Calls down volcano fire across a 3×3 area, destroying enemies and scorching the land into Wasteland.",requiresTarget:!0,targetHint:"Tap any revealed tile to unleash a 3×3 volcanic eruption"},dwarves:{faction:"dwarves",name:"Awaken Fire Drake",shortLabel:"Fire Drake",description:"Summons a flying Fire Drake at the mountain closest to your capital.",requiresTarget:!1},humans:{faction:"humans",name:"Raise Watchtower",shortLabel:"Watchtower",description:"Constructs a fortified Watchtower (25 HP, Range 2) inside your territory.",requiresTarget:!0,targetHint:"Tap an empty tile inside your borders to build a Watchtower"}};function oa(i,e){const t=He(i,e);if(!t||!t.alive)return[];if(t.faction==="elves"||t.faction==="dwarves")return[];const n=[];if(t.faction==="orcs"){for(let s=0;s<i.tiles.length;s++)if(t.revealedTiles[s]){const r=i.tiles[s];n.push({x:r.x,y:r.y})}return n}for(let s=0;s<i.tiles.length;s++){if(!t.revealedTiles[s])continue;const r=i.tiles[s];r.cityId!==null&&i.cities[r.cityId]?.ownerId===e&&r.terrain!=="water"&&r.unitId===null&&!r.isCityCenter&&n.push({x:r.x,y:r.y})}return n}function ea(i,e){if(i.phase!=="playing")return!1;const t=He(i,e);return!t||!t.alive||An(t)<3||(t.superpowerUsed??!1)?!1:t.faction==="humans"?oa(i,e).length>0:!0}const vr={1:0,2:3,3:7},Hn={1:"I",2:"II",3:"III"};function An(i){const e=i.techs.length;return e>=vr[3]?3:e>=vr[2]?2:1}function qf(i){const e=An(i),t=i.techs.length;if(e===3)return{currentAge:3,nextAge:null,currentTechs:t,requiredTechs:null,remaining:0};const n=e+1,s=vr[n];return{currentAge:e,nextAge:n,currentTechs:t,requiredTechs:s,remaining:Math.max(0,s-t)}}function ma(i,e,t){const n=He(i,e),s=kt[t];if(!n||!s)return 999;const r=Math.max(1,Qt(i,e).length);let o=(s.tier===1?3:s.tier===2?5:8)+(r-1);return Pe(n,"elves_elven_lore")&&(o=Math.max(2,o-1)),o}function Yf(i,e,t){const n=He(i,e),s=kt[t];if(!n||!n.alive||!s||s.faction!==n.faction)return"Unavailable";if(Pe(n,t))return"Already researched";if(s.tier>An(n)){const o=vr[s.tier]-n.techs.length;return`Requires Age ${Hn[s.tier]} (research ${o} more ${o===1?"tech":"techs"})`}const r=s.prerequisites.find(o=>!Pe(n,o));if(r)return`Requires ${kt[r].name}`;const a=ma(i,e,t);return n.gold<a?`Need ${a}★ (have ${n.gold}★)`:null}function ta(i,e,t){const n=He(i,e),s=kt[t];return!n||!n.alive||!s||s.faction!==n.faction||Pe(n,t)||An(n)<s.tier||!s.prerequisites.every(r=>Pe(n,r))?!1:n.gold>=ma(i,e,t)}function pd(i,e){const t=_e(i,e.x,e.y);if(!t||!t.unitId)return!1;const n=i.units[t.unitId];return n!==void 0&&n.ownerId!==e.ownerId}function Oc(i,e,t,n){const s=_e(i,t,n);if(!s)return!1;if(s.hasVillage&&!s.cityId)return!0;if(s.isCityCenter&&s.cityId){const r=i.cities[s.cityId];if(r&&r.ownerId!==e)return!0}return!1}function gi(i,e){const t=i.units[e];if(!t||t.canCapture!==!0||t.actedThisTurn||t.hasMoved||t.hasAttacked)return!1;const n=He(i,t.ownerId);return!n||!n.alive?!1:Oc(i,t.ownerId,t.x,t.y)}function xh(i,e,t){const n=_e(i,e,t);return n!==null&&n.resource==="ruins"}function yi(i,e){const t=i.units[e];if(!t||t.canExploreRuins!==!0||t.actedThisTurn||t.hasMoved||t.hasAttacked)return!1;const n=He(i,t.ownerId);return!n||!n.alive?!1:xh(i,t.x,t.y)}function Nc(i,e){const t=Qt(i,e),n=t.filter(l=>l.isCapital),s=new Set;if(n.length===0)return s;for(const l of t){if(l.isCapital){s.add(l.id);continue}for(const c of n)if(xt(l,c)<=4){s.add(l.id);break}}const r=new Uint8Array(i.mapSize*i.mapSize),a=[];for(const l of n){const c=Ve(l.x,l.y,i.mapSize);r[c]||(r[c]=1,a.push({x:l.x,y:l.y}))}let o=0;for(;o<a.length;){const l=a[o++],c=_e(i,l.x,l.y);if(c&&c.isCityCenter&&c.cityId){const d=i.cities[c.cityId];d&&d.ownerId===e&&s.add(d.id)}for(const d of Ps(i,l.x,l.y)){const u=Ve(d.x,d.y,i.mapSize);if(r[u])continue;const h=d.isCityCenter&&d.cityId!==null&&i.cities[d.cityId]?.ownerId===e;!(d.isCityCenter&&d.cityId!==null&&i.cities[d.cityId]?.ownerId!==e)&&(d.hasRoad||h)&&(r[u]=1,a.push({x:d.x,y:d.y}))}}return s}function Fc(i,e){const t=He(i,e);if(!t||!t.alive)return 0;const n=Qt(i,e);if(n.length===0)return 0;let s=0;n.some(l=>l.isCapital&&!pd(i,l))&&(s+=1);const a=t.faction==="humans"?Nc(i,e):null,o=new Set;for(const l of n)pd(i,l)||(o.add(l.id),s+=l.level,l.hasWorkshop&&(s+=1),s+=l.parks,t.faction==="humans"&&!l.isCapital&&a?.has(l.id)&&(s+=1),Pe(t,"humans_granaries")&&l.level>=3&&(s+=1),Pe(t,"humans_citadel_masonry")&&l.hasWalls&&(s+=1),Pe(t,"humans_stewards_citadel")&&(s+=1),Pe(t,"dwarves_deep_vaults")&&(s+=1));if(o.size>0){const l=t.faction==="elves",c=Pe(t,"humans_milling"),d=Pe(t,"orcs_mount_doom"),u=Pe(t,"elves_lothlorien_sanctum"),h=Pe(t,"dwarves_heart_of_mountain"),f={};for(const m of i.tiles)if(!(!m.cityId||!o.has(m.cityId))&&(l&&m.terrain==="ancient_woods"&&m.improvement===null&&(f[m.cityId]=(f[m.cityId]??0)+1),m.improvement!==null)){if(s+=Bi[m.improvement].goldPerTurn,m.improvement==="windmill"&&c){let y=0;for(const g of Ps(i,m.x,m.y))g.improvement==="farm"&&y++;s+=y}m.improvement==="foundry"&&d&&(s+=1),m.improvement==="sanctuary"&&u&&(s+=1),h&&(m.improvement==="mine"||m.improvement==="great_forge")&&(s+=1)}if(l){const m=u?5:3;for(const y of o){const g=f[y]??0;g>0&&(s+=Math.min(m,g))}}}return s}function Po(i,e){const t=He(i,e);if(!t)return 0;let n=0;const s=Qt(i,e);for(const a of s)n+=100,n+=50*a.level,n+=250*a.parks;for(let a=0;a<t.revealedTiles.length;a++)t.revealedTiles[a]&&(n+=10);for(const a of t.techs){const o=kt[a];o&&(n+=o.tier===1?100:o.tier===2?200:350)}Pe(t,"elves_rings_preservation")&&(n+=t.techs.length*100);const r=Lc(i,e);return n+=r.length*25,n}function Kf(i){const e=i.players.map(t=>({playerId:t.id,faction:t.faction,name:t.name,score:Po(i,t.id),citiesCount:Qt(i,t.id).length,unitsCount:Lc(i,t.id).length,techsCount:t.techs.length,isEliminated:!t.alive,isHuman:t.isHuman,rank:0}));e.sort((t,n)=>n.score!==t.score?n.score-t.score:n.citiesCount!==t.citiesCount?n.citiesCount-t.citiesCount:t.isEliminated!==n.isEliminated?t.isEliminated?1:-1:0);for(let t=0;t<e.length;t++)e[t].rank=t+1;return e}function jf(i,e){return!(e.terrain==="water"||e.terrain==="mountain"&&!Dc(i))}function Zf(i,e,t,n){for(const s of Ps(i,t,n))if(s.unitId!==null){const r=i.units[s.unitId];if(r&&r.ownerId!==e)return!0}return!1}function _r(i,e){const t=i.units[e];if(!t)return[];if(t.actedThisTurn)return[];if(t.hasMoved&&!t.canEscapeMove)return[];if(t.hasAttacked&&!t.canEscapeMove)return[];const n=He(i,t.ownerId);if(!n||!n.alive)return[];const s=_e(i,t.x,t.y);if(!s)return[];let r=mt[t.type].movement;if(r<=0)return[];n.faction==="humans"&&s.hasRoad&&(r+=1),Pe(n,"humans_ride_of_rohirrim")&&(t.type==="rider"||t.type==="rohirrim_knight")&&(r+=1),(i.eclipseTurnsRemaining??0)>0&&i.eclipseOwnerId===n.id&&(r+=1);const a=Wt(i,t,"flying"),o=i.mapSize,l=new Int8Array(o*o);l.fill(-1);const c=Ve(t.x,t.y,o);l[c]=r;const d=[{x:t.x,y:t.y,rem:r}],u=[],h=new Uint8Array(o*o);for(;d.length>0;){let f=0;for(let p=1;p<d.length;p++)d[p].rem>d[f].rem&&(f=p);const m=d.splice(f,1)[0],y=Ve(m.x,m.y,o);if(!(m.rem<l[y]||m.rem<=0||!(m.x===t.x&&m.y===t.y)&&Zf(i,t.ownerId,m.x,m.y)))for(const p of Ps(i,m.x,m.y)){const v=Ve(p.x,p.y,o);if(!n.revealedTiles[v]||!a&&!jf(n,p))continue;if(p.unitId!==null){const _=i.units[p.unitId];if(_&&_.ownerId!==t.ownerId)continue}let w=m.rem-1;if(!a){const _=p.terrain==="forest"||p.terrain==="ancient_woods";(p.terrain==="mountain"||_&&n.faction!=="elves"&&!p.hasRoad)&&(w=0)}p.unitId===null&&!h[v]&&(h[v]=1,u.push({x:p.x,y:p.y})),w>l[v]&&(l[v]=w,d.push({x:p.x,y:p.y,rem:w}))}}return u}function hr(i,e){const t=i.units[e];if(!t)return[];if(t.actedThisTurn)return[];if(t.hasAttacked&&!t.canPersistAttack)return[];if(t.canEscapeMove)return[];if(t.hasMoved&&!Wt(i,t,"dash"))return[];const n=He(i,t.ownerId);if(!n||!n.alive)return[];const s=yr(i,t),r=[];for(const a of Object.values(i.units)){if(a.ownerId===t.ownerId)continue;const o=xt(t,a);if(o<1||o>s)continue;const l=Ve(a.x,a.y,i.mapSize);n.revealedTiles[l]&&r.push({x:a.x,y:a.y})}return r}function la(i,e){if(i.phase==="game_over")return!1;const t=i.units[e];if(!t||t.actedThisTurn)return!1;const n=He(i,t.ownerId);return!n||!n.alive?!1:!!(gi(i,t.id)||yi(i,t.id)||(!t.hasMoved||t.canEscapeMove)&&_r(i,t.id).length>0||(!t.hasAttacked||t.canPersistAttack)&&hr(i,t.id).length>0||!t.hasMoved&&!t.hasAttacked&&t.hp<t.maxHp||(t.canPromote||t.kills>=3)&&!t.isVeteran)}function Th(i,e,t,n){const s=Bi[n];let r=s.basePop;if(s.adjacentBonusTo&&s.adjacentPopPerMatch){let a=0;for(const o of Ps(i,e,t))o.improvement===s.adjacentBonusTo&&a++;r+=a*s.adjacentPopPerMatch}return r}function er(i,e,t,n){const s=He(i,e),r=_e(i,t,n);if(!s||!s.alive||!r)return[];const a=Ve(t,n,i.mapSize);if(!s.revealedTiles[a])return[];const o=[],l=r.cityId?i.cities[r.cityId]:null,c=l!==null&&l.ownerId===e,d=r.cityId===null;if(c&&r.resource!==null&&r.resource!=="ruins"&&s.gold>=cr&&s.techs.some(h=>kt[h]?.unlocksResources.includes(r.resource))&&o.push({type:"HARVEST_TILE",coord:{x:t,y:n}}),c&&!r.isCityCenter&&r.improvement===null&&r.resource!=="ruins"){const u=new Set;for(const h of s.techs)for(const f of kt[h]?.unlocksImprovements??[])u.add(f);for(const h of u){const f=Bi[h];f.allowedTerrains.includes(r.terrain)&&(s.gold<f.cost||o.push({type:"BUILD_IMPROVEMENT",coord:{x:t,y:n},improvement:h}))}}return(c||d)&&!r.hasRoad&&!r.isCityCenter&&r.terrain!=="water"&&r.terrain!=="mountain"&&s.gold>=dr&&s.techs.some(h=>kt[h]?.unlocksRoad===!0)&&o.push({type:"BUILD_ROAD",coord:{x:t,y:n}}),c&&!r.isCityCenter&&(r.terrain==="forest"||r.terrain==="ancient_woods")&&s.techs.some(h=>kt[h]?.unlocksChopForest===!0)&&o.push({type:"CHOP_FOREST",coord:{x:t,y:n}}),c&&!r.isCityCenter&&r.terrain==="plains"&&r.improvement===null&&r.resource===null&&s.gold>=ur&&s.techs.some(h=>kt[h]?.unlocksPlantWoods===!0)&&o.push({type:"PLANT_ANCIENT_WOODS",coord:{x:t,y:n}}),o}const Jf={berries:{label:"Berries",icon:"🫐"},game:{label:"Game",icon:"🦌"},ore:{label:"Ore",icon:"⛏️"},mithril:{label:"Starsteel",icon:"💎"},ruins:{label:"Ruins",icon:"🏛️"}},Qf={farm:"🌾",windmill:"🌬️",slag_pit:"🕳️",foundry:"🔥",sanctuary:"🌿",mine:"⛏️",great_forge:"⚒️"},ep={warrior:"⚔️",defender:"🛡️",archer:"🏹",rider:"🐎",catapult:"🪨",rohirrim_knight:"🐴",uruk_berserker:"🪓",elven_sentinel:"🌟",ironbreaker:"⚒️",dragon:"🐉",watchtower:"🗼"};function md(i,e,t,n){const s=He(i,e),r=_e(i,t,n);if(!s||!s.alive||!r)return[];const a=Ve(t,n,i.mapSize);if(!s.revealedTiles[a])return[];const o=[],l=mi(s.faction),c=r.cityId?i.cities[r.cityId]:null,d=c!==null&&c.ownerId===e,u=r.cityId===null;if(r.resource!==null&&r.resource!=="ruins"){const y=r.resource,g=l.find(p=>p.unlocksResources.includes(y));if(g){const p=Jf[y],v=Sh[y];let w,_;d?Pe(s,g.id)?s.gold<cr&&(w=`Need ${cr}★ (have ${s.gold}★)`):(w=`Requires ${g.name}`,_=g.id):w="Outside your borders",o.push({id:`harvest_${y}`,label:`Harvest ${p.label}`,description:`+${v} Pop to city`,cost:cr,icon:p.icon,enabled:!w,disabledReason:w,..._?{requiredTechId:_}:{},action:w?void 0:{type:"HARVEST_TILE",coord:{x:t,y:n}}})}}if(!r.isCityCenter&&r.improvement===null&&r.resource!=="ruins"){const y=new Set;for(const g of l)for(const p of g.unlocksImprovements){if(y.has(p))continue;const v=Bi[p];if(!v.allowedTerrains.includes(r.terrain))continue;y.add(p);const w=Th(i,t,n,p);let _,M;d?Pe(s,g.id)?s.gold<v.cost&&(_=`Need ${v.cost}★ (have ${s.gold}★)`):(_=`Requires ${g.name}`,M=g.id):_="Outside your borders";const b=p==="windmill"&&Pe(s,"humans_milling")?Ps(i,t,n).filter(x=>x.improvement==="farm").length:0,T=v.goldPerTurn+b+(p==="mine"&&Pe(s,"dwarves_heart_of_mountain")?1:0)+(p==="great_forge"&&Pe(s,"dwarves_heart_of_mountain")?1:0)+(p==="foundry"&&Pe(s,"orcs_mount_doom")?1:0)+(p==="sanctuary"&&Pe(s,"elves_lothlorien_sanctum")?1:0),E=[];w>0&&E.push(`+${w} Pop`),T>0&&E.push(`+${T}★/turn`);const S=E.length>0?E.join(", "):v.description;o.push({id:`build_${p}`,label:`Build ${v.name}`,description:S,cost:v.cost,icon:Qf[p],enabled:!_,disabledReason:_,...M?{requiredTechId:M}:{},action:_?void 0:{type:"BUILD_IMPROVEMENT",coord:{x:t,y:n},improvement:p}})}}const h=l.find(y=>y.unlocksRoad===!0);if(h&&!r.hasRoad&&!r.isCityCenter&&r.terrain!=="water"&&r.terrain!=="mountain"){let y,g;d||u?Pe(s,h.id)?s.gold<dr&&(y=`Need ${dr}★ (have ${s.gold}★)`):(y=`Requires ${h.name}`,g=h.id):y="Enemy territory",o.push({id:"build_road",label:"Build Road",description:"Connects cities & boosts movement",cost:dr,icon:"🛤️",enabled:!y,disabledReason:y,...g?{requiredTechId:g}:{},action:y?void 0:{type:"BUILD_ROAD",coord:{x:t,y:n}}})}const f=l.find(y=>y.unlocksChopForest===!0);if(f&&!r.isCityCenter&&(r.terrain==="forest"||r.terrain==="ancient_woods")){let y,g;d?Pe(s,f.id)||(y=`Requires ${f.name}`,g=f.id):y="Outside your borders",o.push({id:"chop_forest",label:"Chop Forest",description:`Clear woods for +${Ll}★`,cost:0,icon:"🪓",enabled:!y,disabledReason:y,...g?{requiredTechId:g}:{},action:y?void 0:{type:"CHOP_FOREST",coord:{x:t,y:n}}})}const m=l.find(y=>y.unlocksPlantWoods===!0);if(m&&!r.isCityCenter&&r.terrain==="plains"&&r.improvement===null&&r.resource===null){let y,g;d?Pe(s,m.id)?s.gold<ur&&(y=`Need ${ur}★ (have ${s.gold}★)`):(y=`Requires ${m.name}`,g=m.id):y="Outside your borders",o.push({id:"plant_ancient_woods",label:"Plant Ancient Woods",description:"+1 Pop & +1★/turn Woodland Grace",cost:ur,icon:"🌳",enabled:!y,disabledReason:y,...g?{requiredTechId:g}:{},action:y?void 0:{type:"PLANT_ANCIENT_WOODS",coord:{x:t,y:n}}})}return o}function tp(i,e){const t=i.cities[e];if(!t)return[];const n=He(i,t.ownerId);if(!n)return[];const s=dt[n.faction],r=mi(n.faction),a=[...Wf,s.uniqueUnit],o=_e(i,t.x,t.y),l=!o||o.unitId!==null,c=aa(i,t.id),d=Rs(i,t),u=c>=d,h=new Set(Uc(i,t.id));return a.map(f=>{const m=mt[f],y=Co(i,n.id,f),g=Io(i,n.id,f);let p,v;if(h.has(f))l?p="City tile occupied":u?p=`Unit cap reached (${c}/${d})`:n.gold<y&&(p=`Need ${y}★ (have ${n.gold}★)`);else{const w=r.find(_=>_.unlocksUnits.includes(f));p=w?`Requires ${w.name}`:"Locked",w&&(v=w.id)}return{id:`train_${f}`,label:m.name,description:`${g} HP · ${m.attack} ATK · ${m.defense} DEF · ${m.movement} MOV`,cost:y,icon:ep[f],unitType:f,enabled:!p,disabledReason:p,...v?{requiredTechId:v}:{},action:p?void 0:{type:"TRAIN_UNIT",cityId:t.id,unitType:f}}})}function np(i,e){const t=i.units[e];if(!t)return[];const n=He(i,t.ownerId);if(!n)return[];const s=_e(i,t.x,t.y),r=[];if(s&&Oc(i,n.id,t.x,t.y)){const d=s.hasVillage&&!s.cityId,u=gi(i,t.id);r.push({id:"capture-city",label:d?"Claim Village":"Capture City",description:d?"Found a new city (ends unit turn)":"Seize enemy city (ends unit turn)",icon:"crown",enabled:u,disabledReason:u?void 0:"Capture next turn",action:u?{type:"CAPTURE_CITY",unitId:t.id}:void 0})}if(s&&s.resource==="ruins"){const d=yi(i,t.id);r.push({id:"explore-ruins",label:"Explore Ruins",description:"Claim ancient treasure",icon:"ruins",enabled:d,disabledReason:d?void 0:"Explore next turn",action:d?{type:"EXPLORE_RUINS",unitId:t.id}:void 0})}const o=s!==null&&s.cityId!==null&&i.cities[s.cityId]?.ownerId===n.id?4:2;let l;t.hp>=t.maxHp?l="Full HP":(t.hasMoved||t.hasAttacked||t.actedThisTurn)&&(l="Already acted");let c;return t.isVeteran?c="Already Veteran":!t.canPromote&&t.kills<3&&(c=`Kills: ${t.kills}/3`),r.push({id:"recover",label:"Recover",description:`Heal +${o} HP (ends unit turn)`,icon:"💚",enabled:!l,disabledReason:l,action:l?void 0:{type:"RECOVER_UNIT",unitId:t.id}},{id:"promote",label:"Promote to Veteran",description:"+5 maxHP & full heal",icon:"⭐",enabled:!c,disabledReason:c,action:c?void 0:{type:"PROMOTE_UNIT",unitId:t.id}}),r}const ip={portrait:"./assets/wizard/alderwick-portrait.webp"},sp={greet:"./assets/wizard/alderwick-full-greet.webp",point:"./assets/wizard/alderwick-full-point.webp",idea:"./assets/wizard/alderwick-full-idea.webp",cheer:"./assets/wizard/alderwick-full-cheer.webp",console:"./assets/wizard/alderwick-full-console.webp"},rp="Alderwick",xs="Alderwick the Star-Keeper",ap=[{faction:"humans",realmLabel:"Humans",powerName:"Raise Watchtower",summary:"Fortifies a 25 HP frontier bastion with Range 2 fire."},{faction:"orcs",realmLabel:"Orcs",powerName:"Volcanic Cataclysm",summary:"Unleashes a 3×3 volcanic eruption across revealed land."},{faction:"elves",realmLabel:"Elves",powerName:"Starlit Eclipse",summary:"Wields celestial Starlight across the sky (+1 MOV & +1 ATK)."},{faction:"dwarves",realmLabel:"Dwarves",powerName:"Awaken Fire Drake",summary:"Summons a winged Fire Drake from your mountain peaks."}],op={humans:{epilogue:"The sunlit highways shine from coast to coast once more. Beneath the beacons of Valoria & Sunmark, the shattered shards of the Star-Crown reunite in steadfast order.",alderwickQuote:"By my star-hat, what a splendid Chronicle! The watch-fires are lit and the roads gleam—now save me a warm scone from Solhaven’s bakery!"},orcs:{epilogue:"The war-forges roar in triumph across Eldermere! Ashfell & Ironspire have reforged the Star-Crown in fire and iron, proving that history belongs to the bold.",alderwickQuote:"Magnificent mayhem, Warlord! You smashed straight to the throne—and only singed half my favorite berry bushes along the way!"},elves:{epilogue:"The Keepers of the Starlight have answered the First Dawn’s call. Radiant celestial Starlight pours anew through the Ancient Woods as Sylvanvale & Starhaven reclaim the Star-Crown.",alderwickQuote:"Luminous beyond measure, Keeper! Watching Eldermere’s Starlight crown the canopy again brings a twinkle even to these ancient eyes."},dwarves:{epilogue:"From gleaming Starsteel veins to snow-capped peaks, Deepforge & Stonehelm have set the reforged Star-Crown upon stone that will never crumble.",alderwickQuote:"Sturdy as Starsteel, Commander! That foundation could outlast three First Dawns—truly a Chronicle worthy of the mountain halls!"}},lp={humans:"Chin up, Commander! Even the grandest highways suffer a bump or two. Straighten your banner—the tabletop is warm and a brand-new Chronicle awaits!",orcs:"Tough scrap, Warlord—they caught you before the war-forges hit full roar! Sharpen those axes and march back to the table; round two is calling.",elves:"A passing shadow, Keeper, never the end of the Starlight. Rest beneath the boughs and return—Eldermere still needs your keen aim.",dwarves:"Even mountain granite cracks before it is tempered, Commander! Re-light the forge, steady your shield-wall, and carve an unbreakable Chronicle next game."};function cp(i,e){const t=dt[i],n=e?dt[e]:null;return{epilogue:n?`The shards of the Star-Crown slip from ${t.name}’s grasp as ${n.name} of ${n.realm} claim Eldermere’s throne—yet the Fog of Forgetting never holds the last word.`:`The echoes of the Star-Crown drift back into the Fog of Forgetting as this Chronicle of ${t.realm} draws to a close.`,alderwickQuote:lp[i]}}const dp={humans:{epilogue:"Your banners are lowered along the sunlit roads, and this Chronicle of Valoria & Sunmark closes early while the Star-Crown’s echoes wait in the mist.",alderwickQuote:"I’ve tucked a golden ribbon right at this page, Commander. Even the stewards of Solhaven pause for a fresh pot of tea—the tabletop will be ready whenever you return!"},orcs:{epilogue:"The war-horns fall quiet across Ashfell & Ironspire as this Chronicle closes early, leaving the Star-Crown unclaimed beneath the Fog of Forgetting.",alderwickQuote:"Calling a tactical breather, Warlord? Not a word to the rivals—I’ll keep the war-drums dry and save your seat until you’re ready to rattle Eldermere again!"},elves:{epilogue:"The Keepers of the Starlight step back beneath the emerald canopy, closing this Chronicle early while the Star-Crown’s shards slumber in the mist.",alderwickQuote:"Even ancient Starlight rests between dawns, Keeper. I’ve pressed a golden leaf into this Chronicle—return to the table whenever the woods call you back!"},dwarves:{epilogue:"The hammers rest in the halls of Deepforge & Stonehelm as this Chronicle closes early, leaving the Star-Crown’s echoes waiting beyond the peaks.",alderwickQuote:"Wise craft knows when to bank the forge and start with fresh stone, Commander. Your page is bookmarked—the mountains will be right here when you return!"}},up={humans:{kicker:"Valoria & Sunmark Fall",lead:"Splendid triumph, Commander!",body:"The sunlit highways and beacons of Valoria & Sunmark now bow to your banner—the Humans’ shard of the Star-Crown shines proudly in your Chronicle!",signoff:"One fewer rival stands between you and the reforged Star-Crown!"},orcs:{kicker:"Ashfell & Ironspire Fall",lead:"Huzzah, Commander!",body:"You’ve quieted the roaring war-forges of Ashfell & Ironspire—the Orcs’ shard of the Star-Crown is yours, and my beard wasn’t even singed!",signoff:"A roaring new chapter is sealed in your Chronicle!"},elves:{kicker:"Sylvanvale & Starhaven Fall",lead:"Marvelous command, Commander!",body:"Even the Keepers of the Starlight in Sylvanvale & Starhaven could not hold back your march—the Elves’ shard of the Star-Crown now illuminates your Chronicle!",signoff:"Celestial Starlight yields to your rising realm!"},dwarves:{kicker:"Deepforge & Stonehelm Fall",lead:"By my star-hat, what a feat!",body:"You’ve claimed the mighty mountain halls of Deepforge & Stonehelm—not even Starsteel walls could halt you, and the Dwarves’ shard of the Star-Crown joins your Chronicle!",signoff:"Onward to claim Eldermere’s throne, Commander!"}};function hp(i,e){return up[i]}function fp(i,e,t){const n=dt[i],s=dt[e];return t?`Your final stronghold has fallen to ${s.name}, Commander—come, let us seal this chapter of the Chronicle.`:`${n.name}’s echo of the Star-Crown now passes to ${s.name}. One fewer banner on the tabletop—stay sharp, Commander!`}const Dl={star:'<path d="M12 1.8l2.1 6.1 6.1-2.1-2.1 6.1 6.1 2.1-6.1 2.1 2.1 6.1-6.1-2.1-2.1 6.1-2.1-6.1-6.1 2.1 2.1-6.1-6.1-2.1 6.1-2.1-2.1-6.1 6.1 2.1z" fill="currentColor" stroke="none"/>',swords:'<path d="M5 19l4-4m-4 1l3 3M19 5l-9.5 9.5M14.5 5H19v4.5M19 19l-4-4m4 1l-3 3M5 5l9.5 9.5M9.5 5H5v4.5" stroke-linecap="round" stroke-linejoin="round"/>',shield:'<path d="M12 2.5L4.5 5.5v5.8c0 4.9 3.2 8.9 7.5 10.2 4.3-1.3 7.5-5.3 7.5-10.2V5.5L12 2.5z" stroke-linejoin="round"/><path d="M12 6v12M8.5 10h7" stroke-linecap="round" opacity="0.65"/>',crown:'<path d="M3 17.5h18l-1.5-9-4.5 4L12 6l-3 6.5-4.5-4L3 17.5z" stroke-linejoin="round"/><path d="M4.5 20.5h15" stroke-linecap="round"/>',compass:'<circle cx="12" cy="12" r="9"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke-linecap="round"/><path d="M12 6.5l2.2 3.3 3.3 2.2-3.3 2.2L12 17.5l-2.2-3.3L6.5 12l3.3-2.2z" fill="currentColor" fill-opacity="0.25" stroke-linejoin="round"/>',codex:'<path d="M6 4.5h11.5a2 2 0 012 2v11.5a2 2 0 01-2 2H6.5a2 2 0 01-2-2V6a1.5 1.5 0 011.5-1.5z" stroke-linejoin="round"/><path d="M8.5 4.5v15.5M11.5 9h5M11.5 12.5h5M11.5 16h3.2" stroke-linecap="round"/>',leaf:'<path d="M19.5 4.5C13 4.5 7 8 5.5 16c-.2 1.2.8 2.2 2 2 8-1.5 11.5-7.5 11.5-13.5z" stroke-linejoin="round"/><path d="M4.5 19.5c3-3 7-6.5 11.5-10" stroke-linecap="round"/>',anvil:'<path d="M3.5 11h16.5c-.6 2.3-2.4 3.5-4.5 3.5H9.5l-1.2 3.5h8.2v2H5.5v-2h1.2l.8-3.5C5.2 14.2 3.8 13 3.5 11z" stroke-linejoin="round"/><path d="M9 7.5h6M12 7.5V11" stroke-linecap="round"/>',tower:'<path d="M6 20.5h12M7.5 20.5V9.5h9v11M6.5 9.5V5h2.5v2h2V5h2v2h2V5h2.5v4.5z" stroke-linejoin="round"/><path d="M10.5 20.5v-4.5a1.5 1.5 0 013 0v4.5" stroke-linecap="round"/>',horse:'<path d="M6.5 20h11l-.5-4.5c-.4-3.2 1.5-5.5 2-7.5l-2.5-3-1.5-1.5-.8 1.8c-2 .2-4.2 1.2-5.7 3.2L6 11.5l1.8 1.5 2.4-.8-.7 3.3-3 4.5z" stroke-linejoin="round"/><circle cx="13.8" cy="7.8" r="0.8" fill="currentColor" stroke="none"/>',bow:'<path d="M7.5 4c6 2.5 6 13.5 0 16" stroke-linecap="round"/><path d="M7.5 4v16" stroke-linecap="round" opacity="0.55"/><path d="M5 12h14.5M16.5 9l3 3-3 3" stroke-linecap="round" stroke-linejoin="round"/>',catapult:'<path d="M4 17.5h16M7 17.5l4-7.5 5 7.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 11.5L18.5 5.5" stroke-linecap="round"/><circle cx="19.2" cy="4.8" r="1.6" fill="currentColor" stroke="none"/><circle cx="7.5" cy="18.5" r="2"/><circle cx="16.5" cy="18.5" r="2"/>',wheat:'<path d="M12 21V5M12 16c-3 0-4.5-1.8-4.5-4 2.2 0 4.5 1.5 4.5 4zM12 16c3 0 4.5-1.8 4.5-4-2.2 0-4.5 1.5-4.5 4zM12 11c-2.6 0-4-1.5-4-3.5 2 0 4 1.3 4 3.5zM12 11c2.6 0 4-1.5 4-3.5-2 0-4 1.3-4 3.5z" stroke-linecap="round" stroke-linejoin="round"/>',pickaxe:'<path d="M5 19l9.5-9.5M10.5 5c3.5.5 6.8 3.2 8.5 6.5l-2.2 1.2c-1.4-2.4-3.6-4.4-6.3-5.2L10.5 5z" stroke-linecap="round" stroke-linejoin="round"/>',heart:'<path d="M12 20.2C7 16.4 3.8 13.4 3.8 9.4A4.4 4.4 0 0112 7a4.4 4.4 0 018.2 2.4c0 4-3.2 7-8.2 10.8z" stroke-linejoin="round"/><path d="M12 9.5v5M9.5 12h5" stroke-linecap="round"/>',road:'<path d="M8.5 20L10.5 4M15.5 20L13.5 4" stroke-linecap="round"/><path d="M12 7v2M12 12v2.5M12 17.5V20" stroke-linecap="round" opacity="0.7"/>',axe:'<path d="M6 19.5l9.5-9.5M13.5 4.5l5.5 5.5c-1.5 2-3.5 3-5.8 2.8l-2.5-2.5c-.2-2.3.8-4.3 2.8-5.8z" stroke-linecap="round" stroke-linejoin="round"/>',tree:'<path d="M12 20.5v-5M12 3.5L6.5 11h3L5.5 16h13l-4-5h3L12 3.5z" stroke-linecap="round" stroke-linejoin="round"/>',skull:'<path d="M6.5 14.5A5.5 5.5 0 1117.5 14.5v2.5h-2.5v2.5h-6V17H6.5v-2.5z" stroke-linejoin="round"/><circle cx="9.8" cy="11.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="14.2" cy="11.5" r="1.1" fill="currentColor" stroke="none"/>',lock:'<rect x="5.5" y="10.5" width="13" height="9.5" rx="2" stroke-linejoin="round"/><path d="M8.5 10.5V7.5a3.5 3.5 0 017 0v3" stroke-linecap="round"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round"/>',chevronRight:'<path d="M9 5.5l6.5 6.5L9 18.5" stroke-linecap="round" stroke-linejoin="round"/>',rotateLeft:'<path d="M7.5 8.5H4V5M4.5 8.5A8 8 0 116 17.5" stroke-linecap="round" stroke-linejoin="round"/>',rotateRight:'<path d="M16.5 8.5H20V5M19.5 8.5A8 8 0 1018 17.5" stroke-linecap="round" stroke-linejoin="round"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.5 2.5 0 014.8.8c0 1.6-2.3 2-2.3 3.5" stroke-linecap="round"/><circle cx="12" cy="16.8" r="0.9" fill="currentColor" stroke="none"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.6.85 1 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke-linejoin="round"/>',refresh:'<path d="M4.5 12a7.5 7.5 0 0113.1-5L20 9.5M19.5 4.5v5h-5M19.5 12a7.5 7.5 0 01-13.1 5L4 14.5M4.5 19.5v-5h5" stroke-linecap="round" stroke-linejoin="round"/>',close:'<path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/>',banner:'<path d="M6 3.5h12v14.5l-6-3.5-6 3.5V3.5z" stroke-linejoin="round"/><path d="M4.5 3.5h15" stroke-linecap="round"/>',eye:'<path d="M2.5 12s3.8-6 9.5-6 9.5 6 9.5 6-3.8 6-9.5 6-9.5-6-9.5-6z" stroke-linejoin="round"/><circle cx="12" cy="12" r="2.6"/>',trophy:'<path d="M7.5 4.5h9v4.2a4.5 4.5 0 01-9 0V4.5z" stroke-linejoin="round"/><path d="M7.5 6.5H4.5a2 2 0 000 4h1.8M16.5 6.5h3a2 2 0 010 4h-1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 13.2v4.3M8.5 20h7M9.5 17.5h5" stroke-linecap="round"/>',ruins:'<path d="M4.5 20h15M6.5 20V9.5M17.5 20V11.5M10.5 20v-7.5M5.5 9.5h7.5l2-2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.5 4l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" fill="currentColor" stroke="none"/>',helm:'<path d="M5.5 11.5a6.5 6.5 0 0113 0v3.2c0 2.6-2 4.6-4.5 5.3v-5.5h-4V20c-2.5-.7-4.5-2.7-4.5-5.3v-3.2z" fill="currentColor" fill-opacity="0.22" stroke-linejoin="round"/><path d="M12 5v5.5M8.5 11.5h7" stroke-linecap="round"/><path d="M17.2 13.5l3.3 1.2v2.4c0 1.9-1.3 3.4-3.3 4.1-2-.7-3.3-2.2-3.3-4.1v-2.4l3.3-1.2z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/>',mapGrid:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" fill="currentColor" fill-opacity="0.16" stroke-linejoin="round"/><path d="M12 12l8-4.5M12 12L4 7.5M12 12v9M8 5.25l8 4.5M16 5.25l-8 4.5" stroke-linecap="round" stroke-linejoin="round"/>',playSword:'<path d="M19.5 4.5l-1.2 4.5-7.8 7.8-3.3-3.3 7.8-7.8 4.5-1.2z" fill="currentColor" fill-opacity="0.28" stroke-linejoin="round"/><path d="M6.2 12.2l5.6 5.6M4.5 19.5l3.3-3.3" stroke-linecap="round" stroke-linejoin="round"/>',crestHumans:'<path d="M6 20h12v-2.2l-1.2-1V10l1.2-1V5h-2.8v2h-2V5h-2.4v2h-2V5H6v4l1.2 1v6.8l-1.2 1V20z" fill="currentColor" fill-opacity="0.28" stroke-linejoin="round"/><path d="M10.2 20v-4.2a1.8 1.8 0 013.6 0V20" stroke-linecap="round"/>',crestOrcs:'<path d="M12 4.5v15.5" stroke-linecap="round" stroke-width="2.2"/><path d="M12 7.5c-2.6 0-5-1.2-6.5-2.8-.8 3.2-.8 6.4 0 9.6 1.5-1.6 3.9-2.8 6.5-2.8 2.6 0 5 1.2 6.5 2.8.8-3.2.8-6.4 0-9.6-1.5 1.6-3.9 2.8-6.5 2.8z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/>',crestElves:'<path d="M12 3l1.9 5.5 5.6 1.7-5.6 1.8L12 17.5l-1.9-5.5L4.5 10.2l5.6-1.7L12 3z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/><path d="M6.5 19.5c2.2-.3 4.2-1.2 5.5-2.7 1.3 1.5 3.3 2.4 5.5 2.7" stroke-linecap="round"/>',crestDwarves:'<path d="M4 12.5L9 5.5l3 4 3-4 5 7" stroke-linejoin="round" stroke-linecap="round"/><path d="M5.5 14.5h13c-.6 1.8-1.9 2.7-3.5 2.7h-1.2l.8 2.3H9.4l.8-2.3H9c-1.6 0-2.9-.9-3.5-2.7z" fill="currentColor" fill-opacity="0.34" stroke-linejoin="round"/>',codexHumans:'<path d="M3.5 6.5C6.2 5.4 9.2 5.5 12 7.2c2.8-1.7 5.8-1.8 8.5-.7v11.5c-2.7-1.1-5.7-1-8.5.7-2.8-1.7-5.8-1.8-8.5-.7V6.5z" fill="currentColor" fill-opacity="0.24" stroke-linejoin="round"/><path d="M12 7.2v11.5M6.5 9.8h3M6.5 13h3M14.5 9.8h3M14.5 13h3" stroke-linecap="round"/>',codexOrcs:'<path d="M5.5 4.5h11.5a1.8 1.8 0 011.8 1.8v12a1.8 1.8 0 01-1.8 1.8H6.5a1.5 1.5 0 01-1.5-1.5V5.5a1 1 0 01.5-1z" fill="currentColor" fill-opacity="0.24" stroke-linejoin="round"/><path d="M8.2 4.5v15.5M12.8 9.2l-1.6 1.6v3l1.6 1.4 1.6-1.4v-3l-1.6-1.6zM10.5 8.5l1.2 1.2M15.1 8.5l-1.2 1.2" stroke-linecap="round" stroke-linejoin="round"/>',codexElves:'<path d="M5.5 4.5h11.5a2 2 0 012 2v11.5a2 2 0 01-2 2H6.5a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 01.5-1.5z" fill="currentColor" fill-opacity="0.22" stroke-linejoin="round"/><path d="M8 4.5v15.5M13.5 8.2c2.2 1.2 2.8 4.2 1.2 6.6-1.6-2.4-2.2-5.4-1.2-6.6zM13.5 14.8v2.2" stroke-linecap="round" stroke-linejoin="round"/>',codexDwarves:'<path d="M5.5 4.5h12l1.5 1.5v12.5L17.5 20h-12V4.5z" fill="currentColor" fill-opacity="0.26" stroke-linejoin="round"/><path d="M8.5 4.5V20M12 8.2v7.6M12 8.2l3.4 2.4-3.4 2.2 3.6 3" stroke-linecap="round" stroke-linejoin="round"/>',endTurnHumans:'<path d="M6.5 6.5l5.5 5.5-5.5 5.5V6.5zM13 6.5l5.5 5.5-5.5 5.5V6.5z" fill="currentColor" stroke-linejoin="round"/>',endTurnOrcs:'<path d="M5.5 7.2l6.2 4.8-6.2 4.8V7.2z" fill="currentColor" stroke-linejoin="round"/><path d="M12.5 13.8c2.6-.5 4.6-2 6-4.8l1.5 1.5c-1.5 3.4-4 5.5-7.5 6.2v-2.9z" fill="currentColor" fill-opacity="0.88" stroke-linejoin="round"/>',endTurnElves:'<path d="M8.5 7.5l1.2 3.2 3.2 1.3-3.2 1.3-1.2 3.2-1.3-3.2L4 12l3.2-1.3 1.3-3.2z" fill="currentColor" stroke="none"/><path d="M13 6.5l6.2 5.5-6.2 5.5 2.2-5.5L13 6.5z" fill="currentColor" stroke-linejoin="round"/>',endTurnDwarves:'<path d="M4.5 10.5h7.5v3.2c-1 .9-2.2 1.3-3.8 1.3l-.6 1.8h3.4v1.7H5.5v-1.7h.8l.5-1.8c-1.2-.5-2-1.4-2.3-2.5v-2z" fill="currentColor" stroke-linejoin="round"/><path d="M13.5 6.5l6 5.5-6 5.5v-11z" fill="currentColor" stroke-linejoin="round"/>',superpowerHumans:'<path d="M6.5 21h11M8 21V11.5h8V21M7 11.5V8.5h2.4v1.4h5.2V8.5H17v3z" fill="currentColor" fill-opacity="0.3" stroke-linejoin="round" stroke-linecap="round"/><path d="M10.8 21v-3.5a1.2 1.2 0 012.4 0V21" stroke-linecap="round"/><path d="M12 1.8l1.2 2.7 2.8 1-2.8 1L12 9.2l-1.2-2.7-2.8-1 2.8-1z" fill="currentColor" stroke="none"/>',superpowerOrcs:'<path d="M2.8 20.5h18.4l-5.6-10.2H8.4L2.8 20.5z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/><path d="M9.4 10.3c-.7-2.3.5-4.3 2.6-6.2 2 1.8 3.2 3.8 2.6 6.2z" fill="currentColor" stroke="none"/><path d="M12 2.2v1.6M6.8 6.8L5 5.2M17.2 6.8L19 5.2M8.8 14.5l1.8 2.2 1.6-1.4 2.2 2.6" stroke-linecap="round" stroke-linejoin="round"/>',superpowerElves:'<circle cx="12" cy="12" r="6.2" fill="currentColor" fill-opacity="0.24"/><path d="M14.6 6.4a5.8 5.8 0 100 11.2 4.7 4.7 0 110-11.2z" fill="currentColor" stroke="none"/><path d="M12 1.8v2.2M12 20v2.2M1.8 12H4M20 12h2.2M4.8 4.8l1.5 1.5M17.7 17.7l1.5 1.5M19.2 4.8l-1.5 1.5M6.3 17.7l-1.5 1.5" stroke-linecap="round"/>',superpowerDwarves:'<path d="M3.2 17.5c2.2-1.5 4.2-3.8 5-6.8L4.5 7.2l4.4-.6L11.2 3l2.2 3.4 4.8.4-2.8 3.2 3.2 2.2-4.8 1.2c-.8 2.4-2.4 4.3-5.2 5.4l-5.4-1.3z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/><path d="M18.2 10.2l3.4-1.4-1.6 2.8 2 1.2-3.4.2" fill="currentColor" stroke="none"/><circle cx="13.4" cy="9.2" r="0.95" fill="currentColor" stroke="none"/>'};function se(i,e="icon"){const t=Dl[i]??Dl.star;return`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" aria-hidden="true">${t}</svg>`}function In(i,e="icon icon-crest"){return se({humans:"crestHumans",orcs:"crestOrcs",elves:"crestElves",dwarves:"crestDwarves"}[i],e)}function pp(i,e="icon"){return se({humans:"codexHumans",orcs:"codexOrcs",elves:"codexElves",dwarves:"codexDwarves"}[i],e)}function mp(i,e="icon"){return se({humans:"endTurnHumans",orcs:"endTurnOrcs",elves:"endTurnElves",dwarves:"endTurnDwarves"}[i],e)}function Bc(i,e="icon"){return se({humans:"superpowerHumans",orcs:"superpowerOrcs",elves:"superpowerElves",dwarves:"superpowerDwarves"}[i],e)}function wr(i,e="icon"){switch(i){case"warrior":return se("swords",e);case"defender":case"ironbreaker":return se("shield",e);case"archer":case"elven_sentinel":return se("bow",e);case"rider":case"rohirrim_knight":return se("horse",e);case"catapult":return se("catapult",e);case"uruk_berserker":return se("axe",e);case"dragon":return se("superpowerDwarves",e);case"watchtower":return se("tower",e);default:return se("swords",e)}}function gd(i,e="icon",t=""){const n=`${i} ${t}`.toLowerCase(),s=i.toLowerCase();return s in Dl?se(s,e):n.includes("capture")||n.includes("crown")?se("crown",e):n.includes("ruins")||n.includes("explore")||i.includes("🏛")?se("ruins",e):n.includes("recover")||n.includes("heal")||n.includes("heart")||i.includes("💚")?se("heart",e):n.includes("promote")||n.includes("vet")||i.includes("⭐")?se("star",e):n.includes("harvest")||n.includes("berry")||n.includes("berries")||n.includes("farm")||n.includes("wheat")||i.includes("🌾")||i.includes("🫐")?se("wheat",e):n.includes("game")||i.includes("🦌")?se("bow",e):n.includes("mine")||n.includes("ore")||n.includes("mithril")||n.includes("pick")||i.includes("⛏")||i.includes("💎")?se("pickaxe",e):n.includes("forge")||n.includes("anvil")||n.includes("foundry")||n.includes("slag")||n.includes("workshop")||i.includes("⚒")||i.includes("🔥")||i.includes("🕳")?se("anvil",e):n.includes("road")||i.includes("🛤")?se("road",e):n.includes("chop")||n.includes("axe")||i.includes("🪓")?se("axe",e):n.includes("sanctuary")||i.includes("🌿")?se("leaf",e):n.includes("plant")||n.includes("wood")||n.includes("tree")||i.includes("🌳")?se("tree",e):n.includes("rider")||n.includes("knight")||n.includes("horse")?se("horse",e):n.includes("arch")||n.includes("sentinel")||n.includes("bow")?se("bow",e):n.includes("catapult")||n.includes("siege")?se("catapult",e):n.includes("def")||n.includes("shield")||n.includes("ironbreaker")?se("shield",e):n.includes("windmill")||n.includes("build")||n.includes("tower")||i.includes("🌬")?se("tower",e):se("swords",e)}function ko(i){const e=i.showName??!0,t=i.animate??!0;return`
    <div class="${["alderwick-scene",`is-${i.variant}`,`pose-${i.pose}`,t?"is-entering":"",i.nudged?"is-nudged":"",i.extraClass??""].filter(Boolean).join(" ")}">
      <div class="alderwick-figure-wrap" aria-hidden="true">
        <img
          class="alderwick-figure"
          src="${sp[i.pose]}"
          alt=""
          draggable="false"
        />
        <span class="alderwick-figure-shadow"></span>
      </div>
      <div class="alderwick-bubble" role="group" aria-label="${xs} says">
        ${e?`<span class="alderwick-bubble-name">${se("star","icon icon-xs")}<span>${rp}</span></span>`:""}
        ${i.headerHtml?`<div class="alderwick-bubble-header">${i.headerHtml}</div>`:""}
        <div class="alderwick-bubble-body">${i.bodyHtml}</div>
        ${i.actionsHtml?`<div class="alderwick-bubble-actions">${i.actionsHtml}</div>`:""}
      </div>
    </div>
  `}function po(i,e,t,n=""){let s=0;const r=()=>{const a=e[s];if(!a)return;const o=s===e.length-1,l=e.length>1?`<span class="alderwick-page-dots" aria-hidden="true">${e.map((d,u)=>`<i class="${u===s?"is-active":""}"></i>`).join("")}</span>`:"";i.innerHTML=ko({pose:a.pose,variant:"stage",bodyHtml:a.bodyHtml,headerHtml:a.headerHtml,extraClass:n,actionsHtml:`
        ${l}
        <button type="button" class="btn btn-cta alderwick-bubble-cta" data-alderwick-advance>
          <span>${a.actionLabel}</span>
          ${se("chevronRight","icon icon-sm")}
        </button>
      `});const c=i.querySelector("[data-alderwick-advance]");c?.addEventListener("click",()=>{if(o){t();return}s+=1,r()}),c?.focus({preventScroll:!0})};r()}let yd=!1;typeof window<"u"&&typeof document<"u"&&window.EldermereAndroid&&document.documentElement.classList.add("android-webview");function gp(){if(!(yd||typeof window>"u")){yd=!0;try{window.EldermereAndroid?.onGameReady?.()}catch{}}}function Ul(){return typeof window<"u"&&!!window.EldermereAndroid}function vd(){if(typeof window>"u")return!1;try{return!!window.EldermereAndroid?.shouldAutoStartTutorial?.()}catch{return!1}}function ut(i){if(!(typeof window>"u"))try{window.EldermereAndroid?.haptic?.(i)}catch{}}function yp(){if(typeof window>"u")return!1;try{if(typeof window.EldermereAndroid?.resetAppStateAndExit=="function")return window.EldermereAndroid.resetAppStateAndExit(),!0}catch{}return!1}function Eh(i){const e=(i|0)>>>0;return e===0?1831565813:e}function on(i){const e=i+1831565813>>>0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,{value:((t^t>>>14)>>>0)/4294967296,nextState:e}}function Vt(i,e,t){if(t<=e)return{value:e,nextState:i};const{value:n,nextState:s}=on(i);return{value:e+Math.floor(n*(t-e+1)),nextState:s}}function ys(i,e){const t=i.slice();let n=e;for(let s=t.length-1;s>0;s--){const r=Vt(n,0,s);n=r.nextState;const a=r.value,o=t[s];t[s]=t[a],t[a]=o}return{result:t,nextState:n}}function Sa(i,e,t,n){let s=Math.imul(i,374761393)+Math.imul(e,668265263)+Math.imul(t,1442695041)+n|0;return s=Math.imul(s^s>>>13,1274126177),s=s^s>>>16,(s>>>0)/4294967296}function _d(i){return i*i*(3-2*i)}function Vo(i,e,t){const n=i+t.offsetX,s=e+t.offsetY,r=Math.floor(n),a=Math.floor(s),o=_d(n-r),l=_d(s-a),c=Sa(r,a,t.seedA,t.seedB),d=Sa(r+1,a,t.seedA,t.seedB),u=Sa(r,a+1,t.seedA,t.seedB),h=Sa(r+1,a+1,t.seedA,t.seedB),f=c+(d-c)*o,m=u+(h-u)*o;return f+(m-f)*l}function qr(i,e,t,n){const s=Vo(i*t,e*t,n),r=Vo(i*t*2.05+17.3,e*t*2.05-9.1,n),a=Vo(i*t*4.1-11.7,e*t*4.1+23.4,n);return s*.58+r*.28+a*.14}function xa(i){const e=Vt(i,1,1073741823),t=Vt(e.nextState,1,1073741823),n=on(t.nextState),s=on(n.nextState);return{field:{seedA:e.value,seedB:t.value,offsetX:n.value*97,offsetY:s.value*97},nextState:s.nextState}}function Kn(i,e){return Math.hypot(i.x-e.x,i.y-e.y)}function ln(i,e,t,n){return t<0||n<0||t>=e||n>=e?null:i[Ve(t,n,e)]??null}function ca(i){return i.terrain!=="water"&&i.terrain!=="mountain"}function Yr(i){return i==="orcs"?"wasteland":"plains"}function vp(i,e){let t=e;const n=2,s=i-3,r=i===18?7:6,a=i*.44,o=(i-1)/2,l=y=>(y.x<=3||y.x>=i-4)&&(y.y<=3||y.y>=i-4),c=[];for(let y=0;y<64;y++){const g=[];for(let T=0;T<4;T++){let E=!1;for(let S=0;S<40;S++){const x=Vt(t,n,s),A=Vt(x.nextState,n,s);t=A.nextState;const P={x:x.value,y:A.value};if(g.every(I=>xt(P,I)>=r&&Kn(P,I)>=a)){g.push(P),E=!0;break}}if(!E)break}if(g.length<4)continue;let p=1/0;const v=[];for(let T=0;T<4;T++){let E=1/0;for(let S=0;S<4;S++){if(T===S)continue;const x=Kn(g[T],g[S]);x<E&&(E=x),x<p&&(p=x)}v.push(E)}const w=Math.max(...v)-Math.min(...v);if(w>2.8)continue;const _=g.filter(l).length,M=g.filter(T=>Math.hypot(T.x-o,T.y-o)<=i*.34).length,b=(_===4?-3.5:_<=2?1.8:.6)+(M>=1&&M<=2?1.4:0);c.push({points:g,score:p*1.5-w*2.6+b})}let d;if(c.length>0){c.sort((p,v)=>v.score-p.score);const y=c.slice(0,Math.min(6,c.length)),g=Vt(t,0,y.length-1);t=g.nextState,d=y[g.value].points}else{const y=on(t);t=y.nextState;const g=y.value*Math.PI*2,p=i*.32;d=[0,1,2,3].map(v=>{const w=g+v*Math.PI/2;return{x:Math.max(n,Math.min(s,Math.round(o+Math.cos(w)*p))),y:Math.max(n,Math.min(s,Math.round(o+Math.sin(w)*p)))}})}const u=ys(an,t);t=u.nextState;const h=[];for(let y=0;y<4;y++){const g=on(t);t=g.nextState,h.push({x:d[y].x,y:d[y].y,biome:u.result[y],stretch:.86+g.value*.26,isPrimary:!0})}const f=ys([...an,...an],t);t=f.nextState;const m=i===18?8:6;for(let y=0;y<m;y++)for(let g=0;g<25;g++){const p=Vt(t,1,i-2),v=Vt(p.nextState,1,i-2),w=on(v.nextState);t=w.nextState;const _={x:p.value,y:v.value};if(!d.some(M=>xt(_,M)<=3)){h.push({x:_.x,y:_.y,biome:f.result[y%f.result.length],stretch:1.12+w.value*.55,isPrimary:!1});break}}return{seeds:h,nextState:t}}function _p(i,e,t,n){if(e>(i==="dwarves"?.54:i==="orcs"?.67:i==="humans"?.77:.78))return"mountain";if(e<.21&&t>.55)return"water";switch(i){case"humans":return t>.69&&n>.35?"forest":"plains";case"orcs":return t<.6||e>.48?"wasteland":t>.7&&n>.38?"forest":"plains";case"elves":return t>.64&&n>.44?"ancient_woods":t>.36?"forest":"plains";case"dwarves":return t>.56&&n>.3?"forest":"plains"}}function wp(i,e,t,n,s){let r=s;const a=t.find(S=>S.biome==="dwarves")??t[0],o=[{start:{x:a.x,y:a.y},len:e===18?10:8,nearAnchor:!0}],l=Vt(r,2,e-3),c=Vt(l.nextState,2,e-3);r=c.nextState,o.push({start:{x:l.value,y:c.value},len:e===18?7:6,nearAnchor:!1});for(const S of o){const x=on(r);r=x.nextState;let A=x.value*Math.PI*2,P=S.start.x-Math.cos(A)*(S.len*.42),I=S.start.y-Math.sin(A)*(S.len*.42);const F=Math.floor(S.len*.35),N=Math.floor(S.len*.72);for(let Y=0;Y<S.len;Y++){const U=Math.round(P),z=Math.round(I);if(Y!==F&&Y!==N&&U>=1&&z>=1&&U<e-1&&z<e-1){const D=ln(i,e,U,z);D&&D.terrain!=="water"&&(D.terrain="mountain",S.nearAnchor&&(D.biome="dwarves"))}const $=on(r);r=$.nextState,A+=($.value-.5)*.72,P+=Math.cos(A)*1.05,I+=Math.sin(A)*1.05}}const d=t.find(S=>S.biome==="elves");if(d)for(let S=1;S<e-1;S++)for(let x=1;x<e-1;x++){if(Kn({x,y:S},d)>3.8)continue;const P=ln(i,e,x,S);if(!P||P.terrain==="water"||P.terrain==="mountain")continue;const I=on(r);r=I.nextState,I.value<.72&&(P.biome="elves",P.terrain=I.value<.24?"ancient_woods":"forest")}const u=t.find(S=>S.biome==="humans");if(u)for(let S=1;S<e-1;S++)for(let x=1;x<e-1;x++){if(Kn({x,y:S},u)>3.8)continue;const P=ln(i,e,x,S);if(!P||P.terrain==="water")continue;const I=on(r);r=I.nextState,I.value<.78&&(P.biome="humans",P.terrain=I.value<.14?"forest":"plains")}const h=t.find(S=>S.biome==="orcs");if(h)for(let S=1;S<e-1;S++)for(let x=1;x<e-1;x++){if(Kn({x,y:S},h)>3.6)continue;const P=ln(i,e,x,S);if(!P||P.terrain==="water"||P.terrain==="mountain")continue;const I=on(r);r=I.nextState,I.value<.74&&(P.biome="orcs",P.terrain=I.value<.18?"forest":"wasteland")}const f=e===18?[9,5,4]:[8,4],m=[],y=[];for(let S=1;S<e-1;S++)for(let x=1;x<e-1;x++){if(t.some(P=>xt({x,y:S},P)<=2))continue;const A=on(r);r=A.nextState,y.push({coord:{x,y:S},rank:qr(x,S,.16,n)+A.value*.25})}y.sort((S,x)=>S.rank-x.rank);const g=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:-1,y:-1}];for(const S of f){let x=null;for(const z of y)if(!m.some($=>xt(z.coord,$)<5)){x=z.coord;break}if(!x)break;const A=Vt(r,-1,2);r=A.nextState;const P=Math.max(3,S+A.value),I=[x],F=ln(i,e,x.x,x.y);F&&(F.terrain="water");const N=Vt(r,0,g.length-1);r=N.nextState;const Y=g[N.value];let U=0;for(;I.length<P&&U++<48;){const z=Vt(r,0,I.length-1);r=z.nextState;const $=I[z.value],D=on(r);r=D.nextState;let q=Y;if(D.value>.38){const j=Vt(r,0,3);r=j.nextState,q=g[j.value]}const Q=$.x+q.x,te=$.y+q.y;if(Q<0||te<0||Q>=e||te>=e||t.some(j=>xt({x:Q,y:te},j)<=1)||I.some(j=>j.x===Q&&j.y===te))continue;const L=ln(i,e,Q,te);L&&(L.terrain="water",I.push({x:Q,y:te}))}m.push(x)}const p=Vt(r,5,e===18?8:7),v=Vt(p.nextState,3,e-4),w=Vt(v.nextState,3,e-4),_=on(w.nextState);r=_.nextState;let M=v.value,b=w.value,T=_.value*Math.PI*2;const E=new Set;for(let S=0;S<p.value;S++){const x=Math.round(M),A=Math.round(b),P=`${x},${A}`;if(!E.has(P)&&x>=1&&A>=1&&x<e-1&&A<e-1&&!t.some(F=>xt({x,y:A},F)<=1)){const F=ln(i,e,x,A);F&&(F.terrain="water",E.add(P))}const I=on(r);r=I.nextState,T+=(I.value-.5)*1.1,M+=Math.cos(T),b+=Math.sin(T)}return r}function Mp(i,e,t,n,s){const r=ln(i,e,t,n);if(!r||r.terrain==="water")return-1e3;let a=0,o=0,l=0,c=0,d=0,u=0,h=0,f=0;for(let g=-2;g<=2;g++)for(let p=-2;p<=2;p++){if(p===0&&g===0)continue;const v=ln(i,e,t+p,n+g);if(!v)continue;const w=Math.max(Math.abs(p),Math.abs(g)),_=w===1?1.6:1;switch(v.biome===s&&(h+=_),w===1&&ca(v)&&f++,v.terrain){case"plains":a+=_;break;case"forest":o+=_;break;case"ancient_woods":l+=_;break;case"mountain":c+=_;break;case"wasteland":d+=_;break;case"water":u+=_;break}}const m=u*2.2,y=f>=4?4:-6;switch(s){case"humans":return a*3+Math.min(o,4)*1.1+h*1.4-c*1.4-d*1.6-m+y;case"elves":return l*3.6+o*2.8+h*1.4-d*2-c*1.1-m+y;case"dwarves":return Math.min(c,10)*3.2-Math.max(0,c-11)*1.5+a*.9+o*.6+h*1.4-d*1.4-m+(f>=3?3:-4);case"orcs":return d*3+Math.min(o,5)*1.2+Math.min(c,4)*.7+h*1.4-l*1.2-m+y}}function bp(i,e,t,n){let s=n;const r=2,a=e-3,o=e===18?7:6,l=e*.42,c={};for(const p of an){const v=[];for(let w=r;w<=a;w++)for(let _=r;_<=a;_++){const M=Mp(i,e,_,w,p);if(M<=-500)continue;const b=on(s);s=b.nextState,v.push({coord:{x:_,y:w},affinity:M+b.value*1.5})}v.sort((w,_)=>_.affinity-w.affinity),c[p]=v.slice(0,14)}let d=null,u=-1/0;const h=c.humans,f=c.orcs,m=c.elves,y=c.dwarves;for(const p of h)for(const v of f)if(!(xt(p.coord,v.coord)<o||Kn(p.coord,v.coord)<l)){for(const w of m)if(!(xt(w.coord,p.coord)<o||xt(w.coord,v.coord)<o||Kn(w.coord,p.coord)<l||Kn(w.coord,v.coord)<l))for(const _ of y){if(xt(_.coord,p.coord)<o||xt(_.coord,v.coord)<o||xt(_.coord,w.coord)<o||Kn(_.coord,p.coord)<l||Kn(_.coord,v.coord)<l||Kn(_.coord,w.coord)<l)continue;const M=[p.coord,v.coord,w.coord,_.coord],b=M.map((A,P)=>Math.min(...M.filter((I,F)=>F!==P).map(I=>Kn(A,I)))),T=Math.max(...b)-Math.min(...b);if(T>2.95)continue;const E=Math.min(...b),x=p.affinity+v.affinity+w.affinity+_.affinity+E*2-T*4;x>u&&(u=x,d={humans:p.coord,orcs:v.coord,elves:w.coord,dwarves:_.coord})}}if(d)return{capitalCoords:d,nextState:s};const g={};for(const p of t)g[p.biome]={x:p.x,y:p.y};return{capitalCoords:g,nextState:s}}function Sp(i,e,t,n){const s=()=>{const a=new Uint8Array(e*e),o=Ve(t.x,t.y,e);a[o]=1;const l=[t];let c=0;for(;c<l.length;){const d=l[c++];for(let u=-1;u<=1;u++)for(let h=-1;h<=1;h++){if(h===0&&u===0)continue;const f=d.x+h,m=d.y+u,y=ln(i,e,f,m);if(!y||!ca(y))continue;const g=Ve(f,m,e);a[g]||(a[g]=1,l.push({x:f,y:m}))}}return a};let r=s();for(const a of n){const o=Ve(a.x,a.y,e);if(r[o])continue;let l=a.x,c=a.y,d=e*4;for(;!r[Ve(l,c,e)]&&d-- >0;){const u=ln(i,e,l,c);if(u&&!ca(u)&&(u.terrain=Yr(u.biome),(u.resource==="ore"||u.resource==="mithril")&&(u.resource=null)),l===t.x&&c===t.y)break;l<t.x?l++:l>t.x&&l--,c<t.y?c++:c>t.y&&c--}r=s()}}function Ah(i,e){let t=e;const n=xa(t),s=xa(n.nextState),r=xa(s.nextState),a=xa(r.nextState);t=a.nextState;const o=n.field,l=s.field,c=r.field,d=a.field,u=vp(i,t),h=u.seeds,f=h.filter(D=>D.isPrimary);t=u.nextState;const m=[],y=2.7;for(let D=0;D<i;D++)for(let q=0;q<i;q++){const Q=(qr(q,D,.14,o)-.5)*2*y,te=(qr(q,D,.14,l)-.5)*2*y,L=q+Q,j=D+te;let ce="humans",ae=1/0;for(const Xe of h){const nt=Math.hypot(L-Xe.x,j-Xe.y)*Xe.stretch;nt<ae&&(ae=nt,ce=Xe.biome)}const ye=qr(q,D,.17,c),he=qr(q,D,.15,d),pe=on(t);t=pe.nextState;const Ne=_p(ce,ye,he,pe.value);m.push({x:q,y:D,terrain:Ne,biome:ce,resource:null,improvement:null,hasRoad:!1,hasVillage:!1,cityId:null,isCityCenter:!1,unitId:null})}t=wp(m,i,f,c,t);const g=bp(m,i,f,t),p=g.capitalCoords;t=g.nextState;for(const D of an){const q=p[D],Q=ln(m,i,q.x,q.y);Q.terrain=Yr(D),Q.biome=D,Q.resource=null,Q.hasVillage=!1}for(const D of an){const q=p[D],Q=[];for(let j=-1;j<=1;j++)for(let ce=-1;ce<=1;ce++){if(ce===0&&j===0)continue;const ae=ln(m,i,q.x+ce,q.y+j);ae&&Q.push(ae)}const te=ys(Q,t);t=te.nextState;const L=te.result;for(const j of L)j.biome=D,(j.terrain==="water"||j.terrain==="mountain")&&(j.terrain=Yr(D)),j.resource=null;D==="humans"?(L[0].terrain="plains",L[0].resource="berries",L[1].terrain="plains",L[1].resource="berries",L[2].terrain="plains",L[3].terrain="plains",L[4].terrain="forest",L[4].resource="game"):D==="orcs"?(L[0].terrain="plains",L[0].resource="berries",L[1].terrain="forest",L[1].resource="game",L[2].terrain="wasteland",L[3].terrain="wasteland",L[4].terrain="forest"):D==="elves"?(L[0].terrain="ancient_woods",L[0].resource="berries",L[1].terrain="ancient_woods",L[2].terrain="ancient_woods",L[3].terrain="forest",L[3].resource="game",L[4].terrain="plains"):D==="dwarves"&&(L[0].terrain="mountain",L[0].resource="ore",L[1].terrain="mountain",L[1].resource="mithril",L[2].terrain="plains",L[2].resource="berries",L[3].terrain="forest",L[3].resource="game",L[4].terrain="plains")}const v=i===18?18:14,w=i===18?16:12,_=an.map(D=>p[D]),M=[],b=(D,q,Q)=>{if(D<1||q<1||D>=i-1||q>=i-1)return!1;for(const te of an)if(xt({x:D,y:q},p[te])<3)return!1;for(const te of _)if(xt({x:D,y:q},te)<Q)return!1;return!0},T=D=>{const q=ln(m,i,D.x,D.y);q.terrain=Yr(q.biome),q.hasVillage=!0,q.resource=null,_.push(D),M.push(D)},E=ys(an,t);t=E.nextState;for(let D=0;D<2;D++)for(const q of E.result){const Q=p[q],te=[[3,4,3],[3,5,3],[3,6,3],[3,6,2]];let L=!1;for(const[j,ce,ae]of te){if(L)break;const ye=[];for(let he=1;he<i-1;he++)for(let pe=1;pe<i-1;pe++){const Ne=xt({x:pe,y:he},Q);if(Ne<j||Ne>ce||!b(pe,he,ae))continue;const Xe=(pe-Q.x)**2+(he-Q.y)**2;let nt=!0;for(const O of an){if(O===q)continue;const dn=p[O];if((pe-dn.x)**2+(he-dn.y)**2<=Xe){nt=!1;break}}nt&&ye.push({x:pe,y:he})}if(ye.length>0){const he=ye.filter(Xe=>{const nt=ln(m,i,Xe.x,Xe.y);return nt!==null&&nt.terrain!=="water"}),pe=he.length>0?he:ye,Ne=Vt(t,0,pe.length-1);t=Ne.nextState,T(pe[Ne.value]),L=!0}}}const S=[],x=[];for(let D=1;D<i-1;D++)for(let q=1;q<i-1;q++)q>=2&&D>=2&&q<=i-3&&D<=i-3?S.push({x:q,y:D}):x.push({x:q,y:D});const A=ys(S,t);t=A.nextState;const P=ys(x,t);t=P.nextState;const I=(D,q,Q,te)=>{for(const L of D){if(M.length>=te)break;if(!b(L.x,L.y,q))continue;const j=ln(m,i,L.x,L.y);j&&(!Q&&j.terrain==="water"||T(L))}};I(A.result,3,!1,v),I(P.result,3,!1,v),I(A.result,3,!0,v),I(P.result,3,!0,v),M.length<w&&(I(A.result,2,!0,w),I(P.result,2,!0,w));for(const D of M){let q=0;const Q=[];for(let te=-1;te<=1;te++)for(let L=-1;L<=1;L++){if(L===0&&te===0)continue;const j=ln(m,i,D.x+L,D.y+te);j&&(ca(j)?q++:j.terrain==="water"&&Q.push(j))}for(;q<4&&Q.length>0;){const te=Q.pop();te.terrain=Yr(te.biome),q++}}const F=i===18?8:6,N=[],Y=(D,q)=>{if(D.hasVillage||D.resource==="ruins"||!ca(D))return!1;for(const Q of an)if(xt(D,p[Q])<=2)return!1;return!N.some(Q=>xt(D,Q)<q)};for(const D of E.result){if(N.length>=F)break;const q=p[D],Q=m.filter(te=>Y(te,3)&&xt(te,q)>=3&&xt(te,q)<=6);if(Q.length>0){const te=Vt(t,0,Q.length-1);t=te.nextState;const L=Q[te.value];L.resource="ruins",N.push({x:L.x,y:L.y})}}const U=ys(m.filter(D=>Y(D,2)),t);t=U.nextState;for(const D of[3,2])for(const q of U.result){if(N.length>=F)break;Y(q,D)&&(q.resource="ruins",N.push({x:q.x,y:q.y}))}for(const D of m){if(D.hasVillage||D.resource!==null)continue;let q=!1;for(const te of an)if(xt(D,p[te])<=1){q=!0;break}if(q)continue;const Q=on(t);t=Q.nextState,D.terrain==="plains"&&Q.value<.22?D.resource="berries":(D.terrain==="forest"||D.terrain==="ancient_woods")&&Q.value<.3?D.resource=Q.value<.1?"berries":"game":D.terrain==="mountain"&&Q.value<.48&&(D.resource=Q.value<.15?"mithril":"ore")}for(const D of M){const q=[];let Q=!1;for(let te=-1;te<=1;te++){for(let L=-1;L<=1;L++){if(L===0&&te===0)continue;const j=ln(m,i,D.x+L,D.y+te);if(!(!j||j.hasVillage)){if(j.resource!==null&&j.resource!=="ruins"){Q=!0;break}j.resource===null&&j.terrain!=="water"&&q.push(j)}}if(Q)break}if(!Q&&q.length>0){const te=Vt(t,0,q.length-1);t=te.nextState;const L=q[te.value];L.terrain==="mountain"?L.resource="ore":L.terrain==="forest"||L.terrain==="ancient_woods"?L.resource="game":(L.terrain="plains",L.resource="berries")}}const z=p[an[0]],$=[...an.map(D=>p[D]),...M,...N];return Sp(m,i,z,$),{tiles:m,capitalCoords:p,rngState:t}}function Lo(i,e){const t=mt[e.type];let n=t.attack;const s=He(i,e.ownerId),r=_e(i,e.x,e.y);return!s||!r||(Pe(s,"humans_plains_charge")&&(e.type==="rider"||e.type==="rohirrim_knight")&&r.terrain==="plains"&&(n+=.5),Pe(s,"humans_siegecraft")&&e.type==="catapult"&&(n+=.5),Pe(s,"orcs_pack_tactics")&&e.type==="rider"&&(n+=.5),Pe(s,"orcs_mount_doom")&&e.type==="catapult"&&(n+=1),Pe(s,"elves_woodland_aim")&&t.range>1&&(r.terrain==="forest"||r.terrain==="ancient_woods")&&(n+=.5),Pe(s,"elves_galadhrim_precision")&&e.type==="elven_sentinel"&&(n+=.5),Pe(s,"dwarves_horned_charge")&&e.type==="rider"&&(n+=.5),Pe(s,"dwarves_dragon_slayers")&&e.type==="catapult"&&(n+=.5),(i.eclipseTurnsRemaining??0)>0&&i.eclipseOwnerId===s.id&&(n+=1)),n}function Do(i,e){const t=mt[e.type];let n=t.defense;const s=He(i,e.ownerId);return s&&s.faction==="dwarves"&&Pe(s,"dwarves_runic_plate")&&t.range===1&&(n+=.5),n}function xp(i,e,t){const n=_e(i,e.x,e.y),s=He(i,e.ownerId);if(!n||!s)return 1;let r=1;if(n.terrain==="mountain"?r=Math.max(r,s.faction==="dwarves"?1.75:1.5):n.terrain==="forest"||n.terrain==="ancient_woods"?r=Math.max(r,1.5):n.terrain==="plains"&&(e.type==="defender"&&Pe(s,"elves_graceful_guard")&&(r=Math.max(r,1.5)),(e.type==="ironbreaker"||e.type==="defender")&&Pe(s,"dwarves_mithril_phalanx")&&(r=Math.max(r,1.75))),n.isCityCenter&&n.cityId){const a=i.cities[n.cityId];a&&a.ownerId===e.ownerId&&(a.hasWalls&&!t?r=Math.max(r,2):Wt(i,e,"fortify")&&(r=Math.max(r,1.5)))}return r}function mo(i,e,t){const n=i.units[e],s=i.units[t];if(!n||!s)return{attackerId:e,defenderId:t,attackerDamage:0,retaliationDamage:0,defenderKilled:!1,attackerKilled:!1,terrainDefenseBonus:1,willAdvance:!1};const r=yr(i,n),a=yr(i,s),o=He(i,n.ownerId),l=Lo(i,n),c=Do(i,s),d=Wt(i,n,"siege"),u=xp(i,s,d),h=Wt(i,n,"bloodlust")?1:Math.max(0,n.hp)/n.maxHp,f=Math.max(0,s.hp)/s.maxHp,m=l*h,y=c*f*u,g=m+y,p=r>1;let v=0;g>0&&(v=Math.round(m/g*l*4.5),o&&n.type==="archer"&&Pe(o,"orcs_black_arrows")&&s.hp<s.maxHp&&(v+=1),p&&Wt(i,s,"stalwart")&&(v=Math.max(0,v-1)));const _=s.hp-v<=0;let M=0;const b=xt(n,s);!_&&b<=a&&g>0&&c>0&&(M=Math.round(y/g*c*4.5),a>1&&Wt(i,n,"stalwart")&&(M=Math.max(0,M-1)));const T=!_&&n.hp-M<=0;return{attackerId:e,defenderId:t,attackerDamage:v,retaliationDamage:M,defenderKilled:_,attackerKilled:T,terrainDefenseBonus:u,willAdvance:_&&!p}}function Hc(i,e){const t=`${e}_${i.nextEntityId}`;return i.nextEntityId+=1,t}function ji(i,e,t,n,s){const r=[];for(let a=-s;a<=s;a++)for(let o=-s;o<=s;o++){const l=t+o,c=n+a;if(l<0||c<0||l>=i.mapSize||c>=i.mapSize)continue;const d=Ve(l,c,i.mapSize);e.revealedTiles[d]||(e.revealedTiles[d]=!0,r.push({x:l,y:c}))}return r}function Wo(i,e,t,n){const s=_e(i,t,n);if(!s)return 1;let r=1;return(s.terrain==="mountain"||Pe(e,"elves_keen_sight")&&(s.terrain==="forest"||s.terrain==="ancient_woods"))&&(r=2),r}function Ol(i,e){const t=e.borderRadius;for(let s=-t;s<=t;s++)for(let r=-t;r<=t;r++){const a=_e(i,e.x+r,e.y+s);a&&a.cityId===null&&(a.cityId=e.id)}const n=_e(i,e.x,e.y);n&&(n.cityId=e.id,n.isCityCenter=!0,n.hasVillage=!1)}function Tp(i,e){const t=new Set(Object.values(i.cities).map(r=>r.name)),n=dt[e].cityNames;for(const r of n)if(!t.has(r))return r;let s=2;for(;;){for(const r of n){const a=`${r} ${s}`;if(!t.has(a))return a}s++}}function go(i){for(const e of i.players){if(e.faction==="humans"){const t=Nc(i,e.id);for(const n of Qt(i,e.id))n.connectedToCapital=t.has(n.id)}e.goldPerTurn=Fc(i,e.id),e.score=Po(i,e.id)}}function tr(i,e,t,n){if(t<=0)return;e.population+=t;const s=He(i,e.ownerId);for(;e.population>=e.level+1;)e.population-=e.level+1,e.level+=1,e.pendingLevelRewards.push(e.level),s&&Pe(s,"dwarves_stone_walls")&&e.level>=2&&(e.hasWalls=!0),n.push({type:"CITY_LEVELED",cityId:e.id,coord:{x:e.x,y:e.y},newLevel:e.level,ownerId:e.ownerId})}function Ep(i,e,t,n,s){const r=_e(i,t,n);if(!r||r.resource!=="ruins")return;r.resource=null;const a=Pe(e,"humans_hunting")?2:0;a>0&&(e.gold+=a);const o=mi(e.faction).filter(h=>h.tier===1&&!Pe(e,h.id)).map(h=>h.id),l=Qt(i,e.id),c=["gold"];o.length>0&&c.push("tech"),l.length>0&&c.push("population");const d=Vt(i.rngState,0,c.length-1);i.rngState=d.nextState;const u=c[d.value];if(u==="gold")e.gold+=5,s.push({type:"RUINS_CLAIMED",coord:{x:t,y:n},playerId:e.id,rewardKind:"gold",amount:5+a});else if(u==="tech"){const h=Vt(i.rngState,0,o.length-1);i.rngState=h.nextState;const f=o[h.value];e.techs.push(f),s.push({type:"RUINS_CLAIMED",coord:{x:t,y:n},playerId:e.id,rewardKind:"tech",techId:f,amount:a>0?a:void 0}),s.push({type:"TECH_RESEARCHED",playerId:e.id,techId:f,cost:0})}else{let h=l[0],f=xt({x:t,y:n},h);for(let m=1;m<l.length;m++){const y=xt({x:t,y:n},l[m]);y<f&&(f=y,h=l[m])}s.push({type:"RUINS_CLAIMED",coord:{x:t,y:n},playerId:e.id,rewardKind:"population",amount:3,cityId:h.id}),tr(i,h,3,s)}}function Kr(i,e,t,n,s,r,a){const o=Io(i,e,t)+(a?.bonusMaxHp??0),l=a?.ready??!1,c={id:Hc(i,"unit"),type:t,ownerId:e,homeCityId:r,x:n,y:s,hp:o,maxHp:o,kills:0,isVeteran:a?.isVeteran??!1,canPromote:!1,hasMoved:!l,hasAttacked:!l,canEscapeMove:!1,canPersistAttack:!1,actedThisTurn:!l,canCapture:!1,canExploreRuins:!1};i.units[c.id]=c;const d=_e(i,n,s);return d&&(d.unitId=c.id),c}function wd(i){const e=Eh(i.seed),t=Ah(i.mapSize,e),s=[i.humanFaction,...an.filter(a=>a!==i.humanFaction)].map(a=>{const o=dt[a];return{id:`player_${a}`,faction:a,name:o.name,isHuman:a===i.humanFaction,gold:o.startingGold,goldPerTurn:0,score:0,techs:[o.startingTech],revealedTiles:new Array(i.mapSize*i.mapSize).fill(!1),alive:!0,eliminatedOnTurn:null,superpowerUsed:!1}}),r={config:{...i},mapSize:i.mapSize,turn:1,activePlayerIndex:0,phase:"playing",winnerId:null,winReason:null,eclipseTurnsRemaining:0,eclipseOwnerId:null,rngState:t.rngState,nextEntityId:1,players:s,tiles:t.tiles,cities:{},units:{}};for(const a of r.players){const o=dt[a.faction],l=t.capitalCoords[a.faction],c=Hc(r,"city"),d={id:c,name:o.cityNames[0],ownerId:a.id,styleFaction:a.faction,x:l.x,y:l.y,isCapital:!0,level:1,population:0,hasWorkshop:!1,hasWalls:!1,borderRadius:1,parks:0,pendingLevelRewards:[],connectedToCapital:!0};r.cities[c]=d,Ol(r,d),ji(r,a,l.x,l.y,2),Kr(r,a.id,o.startingUnit,l.x,l.y,c,{ready:!0})}return go(r),r}function Rh(i){const e={};for(const[n,s]of Object.entries(i.cities))e[n]={...s,pendingLevelRewards:s.pendingLevelRewards.slice()};const t={};for(const[n,s]of Object.entries(i.units))t[n]={...s};return{config:{...i.config},mapSize:i.mapSize,turn:i.turn,activePlayerIndex:i.activePlayerIndex,phase:i.phase,winnerId:i.winnerId,winReason:i.winReason,eclipseTurnsRemaining:i.eclipseTurnsRemaining??0,eclipseOwnerId:i.eclipseOwnerId??null,rngState:i.rngState,nextEntityId:i.nextEntityId,players:i.players.map(n=>({...n,superpowerUsed:n.superpowerUsed??!1,techs:n.techs.slice(),revealedTiles:n.revealedTiles.slice()})),tiles:i.tiles.map(n=>({...n})),cities:e,units:t}}function Ap(i,e){return i===2?e==="workshop"||e==="explorer":i===3?e==="city_wall"||e==="resources":i===4?e==="border_growth"||e==="pop_growth":i>=5?e==="champion"||e==="park":!1}function Md(i){const e={};for(const t of i.players)e[t.id]=Po(i,t.id),t.score=e[t.id];return e}function Rp(i,e){const t=Object.values(i.cities).filter(s=>s.isCapital);if(t.length>0&&t.every(s=>s.ownerId===e))return!0;const n=i.players.filter(s=>s.alive);return n.length===1&&n[0].id===e}function Cp(i,e,t){const n=Qt(i,e.id),s=new Set;if(Pe(e,"humans_citadel_masonry"))for(const o of n){if(!o.hasWalls)continue;const l=_e(i,o.x,o.y);if(!l||!l.unitId)continue;const c=i.units[l.unitId];if(c&&c.ownerId===e.id&&c.hp<c.maxHp&&!s.has(c.id)){const d=c.hp;c.hp=Math.min(c.maxHp,c.hp+2),s.add(c.id),t.push({type:"UNIT_HEALED",unitId:c.id,coord:{x:c.x,y:c.y},amount:c.hp-d,newHp:c.hp})}}if(Pe(e,"elves_rings_preservation"))for(const a of n)for(let o=-1;o<=1;o++)for(let l=-1;l<=1;l++){const c=_e(i,a.x+l,a.y+o);if(!c||!c.unitId)continue;const d=i.units[c.unitId];if(d&&d.ownerId===e.id&&d.hp<d.maxHp&&!s.has(d.id)){const u=d.hp;d.hp=Math.min(d.maxHp,d.hp+2),s.add(d.id),t.push({type:"UNIT_HEALED",unitId:d.id,coord:{x:d.x,y:d.y},amount:d.hp-u,newHp:d.hp})}}if(Pe(e,"elves_wind_riders"))for(const a of Object.values(i.units)){if(a.ownerId!==e.id||a.hp>=a.maxHp||s.has(a.id))continue;const o=_e(i,a.x,a.y);if(o&&o.cityId&&i.cities[o.cityId]?.ownerId===e.id){const l=a.hp;a.hp=Math.min(a.maxHp,a.hp+2),s.add(a.id),t.push({type:"UNIT_HEALED",unitId:a.id,coord:{x:a.x,y:a.y},amount:a.hp-l,newHp:a.hp})}}go(i);const r=Fc(i,e.id);e.gold+=r,e.goldPerTurn=r;for(const a of Object.values(i.units))a.ownerId===e.id&&(a.hasMoved=!1,a.hasAttacked=!1,a.canEscapeMove=!1,a.canPersistAttack=!1,a.actedThisTurn=!1,a.canCapture=Oc(i,e.id,a.x,a.y),a.canExploreRuins=xh(i,a.x,a.y));t.push({type:"TURN_STARTED",playerId:e.id,turn:i.turn,goldGained:r})}function nr(i,e){const t=Rh(i),n=[];if(t.phase==="game_over")return{state:t,events:n};const s=fs(t);if(!s||!s.alive)return{state:t,events:n};switch(e.type){case"MOVE_UNIT":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||!_r(t,r.id).some(h=>h.x===e.to.x&&h.y===e.to.y))break;const o={x:r.x,y:r.y},l=_e(t,o.x,o.y),c=_e(t,e.to.x,e.to.y);if(!l||!c||c.unitId!==null)break;l.unitId=null,r.x=e.to.x,r.y=e.to.y,c.unitId=r.id,r.canCapture=!1,r.canExploreRuins=!1,r.canEscapeMove?(r.canEscapeMove=!1,r.hasMoved=!0,r.actedThisTurn=!0):(r.hasMoved=!0,Wt(t,r,"dash")||(r.actedThisTurn=!0)),n.push({type:"UNIT_MOVED",unitId:r.id,from:o,to:{...e.to},ownerId:s.id});const d=Wo(t,s,r.x,r.y),u=ji(t,s,r.x,r.y,d);u.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:u}),r.actedThisTurn||!r.hasAttacked&&Wt(t,r,"dash")&&hr(t,r.id).length>0||(r.actedThisTurn=!0);break}case"ATTACK_UNIT":{const r=t.units[e.attackerId],a=t.units[e.defenderId];if(!r||!a||r.ownerId!==s.id||a.ownerId===s.id||!hr(t,r.id).some(g=>g.x===a.x&&g.y===a.y))break;r.canCapture=!1,r.canExploreRuins=!1;const l=mo(t,r.id,a.id),c={x:r.x,y:r.y},d={x:a.x,y:a.y},u=mt[r.type].range>1,h=Wt(t,a,"stalwart"),f=He(t,a.ownerId),m=_e(t,c.x,c.y),y=_e(t,d.x,d.y);if(n.push({type:"UNIT_ATTACKED",attackerId:r.id,defenderId:a.id,from:c,to:d,isRanged:u,damage:l.attackerDamage,retaliationDamage:l.retaliationDamage,defenderKilled:l.defenderKilled,attackerKilled:l.attackerKilled,advanced:l.willAdvance}),l.defenderKilled){if(y&&y.unitId===a.id&&(y.unitId=null),delete t.units[a.id],r.kills+=1,r.kills>=3&&!r.isVeteran&&(r.canPromote=!0),s.faction==="orcs"){const g=Pe(s,"orcs_spoils_mastery")?3:2;s.gold+=g,n.push({type:"SPOILS_GAINED",playerId:s.id,coord:d,amount:g})}if(l.willAdvance&&m&&y){m.unitId=null,r.x=d.x,r.y=d.y,y.unitId=r.id;const g=Wo(t,s,r.x,r.y),p=ji(t,s,r.x,r.y,g);p.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:p})}Wt(t,r,"persist")&&!h?(r.canPersistAttack=!0,r.hasAttacked=!1,r.actedThisTurn=!1):Wt(t,r,"escape")||Wt(t,r,"skirmish")?(r.hasAttacked=!0,r.canPersistAttack=!1,r.canEscapeMove=!0,r.actedThisTurn=!1):(r.hasAttacked=!0,r.canPersistAttack=!1,r.actedThisTurn=!0)}else if(a.hp-=l.attackerDamage,r.hp-=l.retaliationDamage,l.attackerKilled){if(m&&m.unitId===r.id&&(m.unitId=null),delete t.units[r.id],a.kills+=1,a.kills>=3&&!a.isVeteran&&(a.canPromote=!0),f&&f.faction==="orcs"){const g=Pe(f,"orcs_spoils_mastery")?3:2;f.gold+=g,n.push({type:"SPOILS_GAINED",playerId:f.id,coord:c,amount:g})}}else r.hasAttacked=!0,r.canPersistAttack=!1,Wt(t,r,"escape")||Wt(t,r,"skirmish")?(r.canEscapeMove=!0,r.actedThisTurn=!1):r.actedThisTurn=!0;t.units[r.id]&&!r.actedThisTurn&&(r.canPersistAttack?hr(t,r.id).length===0&&(r.canPersistAttack=!1,r.hasAttacked=!0,r.actedThisTurn=!0):r.canEscapeMove&&_r(t,r.id).length===0&&(r.canEscapeMove=!1,r.actedThisTurn=!0));break}case"CAPTURE_CITY":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||!gi(t,r.id))break;const a=_e(t,r.x,r.y);if(!a)break;if(a.hasVillage&&!a.cityId){r.hasMoved=!0,r.hasAttacked=!0,r.canEscapeMove=!1,r.canPersistAttack=!1,r.actedThisTurn=!0,r.canCapture=!1,r.canExploreRuins=!1;const o=Hc(t,"city"),l={id:o,name:Tp(t,s.faction),ownerId:s.id,styleFaction:s.faction,x:a.x,y:a.y,isCapital:!1,level:1,population:0,hasWorkshop:!1,hasWalls:!1,borderRadius:1,parks:0,pendingLevelRewards:[],connectedToCapital:!1};t.cities[o]=l,Ol(t,l);const c=ji(t,s,a.x,a.y,1);c.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:c});let d;s.faction==="orcs"&&(d=Pe(s,"orcs_spoils_mastery")?5:4,s.gold+=d),n.push({type:"CITY_CAPTURED",cityId:o,coord:{x:a.x,y:a.y},oldOwnerId:null,newOwnerId:s.id,wasVillage:!0,spoilsGold:d}),d&&n.push({type:"SPOILS_GAINED",playerId:s.id,coord:{x:a.x,y:a.y},amount:d})}else if(a.isCityCenter&&a.cityId){const o=t.cities[a.cityId];if(!o||o.ownerId===s.id)break;r.hasMoved=!0,r.hasAttacked=!0,r.canEscapeMove=!1,r.canPersistAttack=!1,r.actedThisTurn=!0,r.canCapture=!1,r.canExploreRuins=!1;const l=o.ownerId;o.ownerId=s.id,o.styleFaction=s.faction;for(const h of Object.values(t.units))h.homeCityId===o.id&&h.ownerId===l&&(h.homeCityId=null);Pe(s,"dwarves_stone_walls")&&o.level>=2&&(o.hasWalls=!0);const c=ji(t,s,a.x,a.y,1);c.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:c});let d;s.faction==="orcs"&&(d=Pe(s,"orcs_spoils_mastery")?5:4,s.gold+=d),n.push({type:"CITY_CAPTURED",cityId:o.id,coord:{x:a.x,y:a.y},oldOwnerId:l,newOwnerId:s.id,wasVillage:!1,spoilsGold:d}),d&&n.push({type:"SPOILS_GAINED",playerId:s.id,coord:{x:a.x,y:a.y},amount:d});const u=He(t,l);if(u&&u.alive&&Qt(t,l).length===0){u.alive=!1,u.eliminatedOnTurn=t.turn;for(const h of Object.values(t.units))if(h.ownerId===l){const f=_e(t,h.x,h.y);f&&f.unitId===h.id&&(f.unitId=null),delete t.units[h.id]}n.push({type:"PLAYER_ELIMINATED",playerId:l,eliminatedByPlayerId:s.id})}if(Rp(t,s.id)){go(t);const h=Md(t);return t.phase="game_over",t.winnerId=s.id,t.winReason="domination",n.push({type:"GAME_OVER",winnerId:s.id,reason:"domination",scores:h}),{state:t,events:n}}}break}case"EXPLORE_RUINS":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||!yi(t,r.id))break;const a=_e(t,r.x,r.y);if(!a||a.resource!=="ruins")break;r.hasMoved=!0,r.hasAttacked=!0,r.canEscapeMove=!1,r.canPersistAttack=!1,r.actedThisTurn=!0,r.canCapture=!1,r.canExploreRuins=!1,Ep(t,s,r.x,r.y,n);break}case"RECOVER_UNIT":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||r.hasMoved||r.hasAttacked||r.actedThisTurn||r.hp>=r.maxHp)break;const a=_e(t,r.x,r.y),l=a!==null&&a.cityId!==null&&t.cities[a.cityId]?.ownerId===s.id?4:2,c=r.hp;r.hp=Math.min(r.maxHp,r.hp+l),r.hasMoved=!0,r.hasAttacked=!0,r.actedThisTurn=!0,r.canCapture=!1,r.canExploreRuins=!1,n.push({type:"UNIT_HEALED",unitId:r.id,coord:{x:r.x,y:r.y},amount:r.hp-c,newHp:r.hp});break}case"PROMOTE_UNIT":{const r=t.units[e.unitId];if(!r||r.ownerId!==s.id||!r.canPromote&&r.kills<3||r.isVeteran)break;r.isVeteran=!0,r.canPromote=!1,r.maxHp+=5,r.hp=r.maxHp,!r.actedThisTurn&&!la(t,r.id)&&(r.actedThisTurn=!0),n.push({type:"UNIT_PROMOTED",unitId:r.id,coord:{x:r.x,y:r.y},newMaxHp:r.maxHp});break}case"HARVEST_TILE":{if(!er(t,s.id,e.coord.x,e.coord.y).some(d=>d.type==="HARVEST_TILE"))break;const a=_e(t,e.coord.x,e.coord.y);if(!a||!a.cityId||!a.resource||a.resource==="ruins")break;const o=t.cities[a.cityId];if(!o||o.ownerId!==s.id)break;const l=a.resource,c=Sh[l];s.gold-=cr,a.resource=null,n.push({type:"RESOURCE_HARVESTED",coord:{...e.coord},resource:l,cityId:o.id,popGained:c,playerId:s.id}),tr(t,o,c,n);break}case"BUILD_IMPROVEMENT":{if(!er(t,s.id,e.coord.x,e.coord.y).some(d=>d.type==="BUILD_IMPROVEMENT"&&d.improvement===e.improvement))break;const a=_e(t,e.coord.x,e.coord.y);if(!a||!a.cityId)break;const o=t.cities[a.cityId];if(!o||o.ownerId!==s.id)break;const l=Bi[e.improvement],c=Th(t,e.coord.x,e.coord.y,e.improvement);if(s.gold-=l.cost,a.improvement=e.improvement,n.push({type:"IMPROVEMENT_BUILT",coord:{...e.coord},improvement:e.improvement,cityId:o.id,popGained:c,playerId:s.id}),tr(t,o,c,n),e.improvement==="farm"||e.improvement==="mine"){const d=e.improvement==="farm"?"windmill":"great_forge",u=e.improvement==="farm"?1:2;for(const h of Ps(t,e.coord.x,e.coord.y))if(h.improvement===d&&h.cityId){const f=t.cities[h.cityId];f&&f.ownerId===s.id&&tr(t,f,u,n)}}break}case"BUILD_ROAD":{if(!er(t,s.id,e.coord.x,e.coord.y).some(o=>o.type==="BUILD_ROAD"))break;const a=_e(t,e.coord.x,e.coord.y);if(!a)break;s.gold-=dr,a.hasRoad=!0,n.push({type:"ROAD_BUILT",coord:{...e.coord},playerId:s.id});break}case"CHOP_FOREST":{if(!er(t,s.id,e.coord.x,e.coord.y).some(o=>o.type==="CHOP_FOREST"))break;const a=_e(t,e.coord.x,e.coord.y);if(!a)break;a.terrain="plains",a.improvement==="sanctuary"&&(a.improvement=null),s.gold+=Ll,n.push({type:"FOREST_CHOPPED",coord:{...e.coord},goldGained:Ll,playerId:s.id});break}case"PLANT_ANCIENT_WOODS":{if(!er(t,s.id,e.coord.x,e.coord.y).some(l=>l.type==="PLANT_ANCIENT_WOODS"))break;const a=_e(t,e.coord.x,e.coord.y);if(!a||!a.cityId)break;const o=t.cities[a.cityId];if(!o||o.ownerId!==s.id)break;s.gold-=ur,a.terrain="ancient_woods",n.push({type:"WOODS_PLANTED",coord:{...e.coord},cityId:o.id,popGained:1,playerId:s.id}),tr(t,o,1,n);break}case"TRAIN_UNIT":{const r=t.cities[e.cityId];if(!r||r.ownerId!==s.id)break;const a=_e(t,r.x,r.y);if(!a||a.unitId!==null||!Uc(t,r.id).includes(e.unitType)||aa(t,r.id)>=Rs(t,r))break;const l=Co(t,s.id,e.unitType);if(s.gold<l)break;s.gold-=l;const c=Kr(t,s.id,e.unitType,r.x,r.y,r.id,{ready:!1});n.push({type:"UNIT_TRAINED",unitId:c.id,unitType:c.type,cityId:r.id,coord:{x:r.x,y:r.y},ownerId:s.id});break}case"RESEARCH_TECH":{if(!ta(t,s.id,e.techId))break;const r=ma(t,s.id,e.techId);if(s.gold-=r,s.techs.push(e.techId),n.push({type:"TECH_RESEARCHED",playerId:s.id,techId:e.techId,cost:r}),e.techId==="dwarves_stone_walls")for(const a of Qt(t,s.id))a.level>=2&&(a.hasWalls=!0);else if(e.techId==="elves_keen_sight"){const a=[];for(const o of Object.values(t.units)){if(o.ownerId!==s.id)continue;const l=_e(t,o.x,o.y);if(l&&(l.terrain==="forest"||l.terrain==="ancient_woods")){const c=Wo(t,s,o.x,o.y);a.push(...ji(t,s,o.x,o.y,c))}}a.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:a})}else if(e.techId==="humans_ride_of_rohirrim")for(const a of Object.values(t.units))a.ownerId===s.id&&(a.type==="rider"||a.type==="rohirrim_knight")&&(a.maxHp+=3,a.hp+=3);else if(e.techId==="orcs_pack_tactics")for(const a of Object.values(t.units))a.ownerId===s.id&&a.type==="rider"&&(a.maxHp+=3,a.hp+=3);else if(e.techId==="orcs_black_gate")for(const a of Object.values(t.units))a.ownerId===s.id&&a.type==="uruk_berserker"&&(a.maxHp+=3,a.hp+=3);else if(e.techId==="elves_galadhrim_precision")for(const a of Object.values(t.units))a.ownerId===s.id&&a.type==="elven_sentinel"&&(a.maxHp+=3,a.hp+=3);else if(e.techId==="dwarves_mithril_phalanx")for(const a of Object.values(t.units))a.ownerId===s.id&&(a.type==="ironbreaker"||a.type==="defender")&&(a.maxHp+=4,a.hp+=4);else if(e.techId==="dwarves_dragon_slayers")for(const a of Object.values(t.units))a.ownerId===s.id&&a.type==="catapult"&&(a.maxHp+=5,a.hp+=5);break}case"CHOOSE_CITY_REWARD":{const r=t.cities[e.cityId];if(!r||r.ownerId!==s.id||r.pendingLevelRewards.length===0)break;const a=r.pendingLevelRewards[0];if(!Ap(a,e.reward))break;if(r.pendingLevelRewards.shift(),e.reward==="workshop")r.hasWorkshop=!0;else if(e.reward==="explorer"){const o=[];for(let c=0;c<t.mapSize;c++)for(let d=0;d<t.mapSize;d++){const u=Ve(d,c,t.mapSize);if(!s.revealedTiles[u]){const h=(d-r.x)**2+(c-r.y)**2;o.push({coord:{x:d,y:c},dist:h})}}o.sort((c,d)=>c.dist-d.dist);const l=o.slice(0,10).map(c=>c.coord);for(const c of l)s.revealedTiles[Ve(c.x,c.y,t.mapSize)]=!0;l.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:l})}else if(e.reward==="city_wall")r.hasWalls=!0;else if(e.reward==="resources")s.gold+=5;else if(e.reward==="border_growth")r.borderRadius=2,Ol(t,r);else if(e.reward==="pop_growth")tr(t,r,3,n);else if(e.reward==="champion"){const o=dt[s.faction].uniqueUnit;let l=null;const c=_e(t,r.x,r.y);if(c&&c.unitId===null)l={x:r.x,y:r.y};else{const d=[];for(let u=-2;u<=2;u++)for(let h=-2;h<=2;h++){const f=_e(t,r.x+h,r.y+u);!f||f.unitId!==null||f.terrain!=="water"&&(f.terrain==="mountain"&&!Dc(s)||d.push({coord:{x:f.x,y:f.y},dist:h*h+u*u}))}d.sort((u,h)=>u.dist-h.dist),d.length>0&&(l=d[0].coord)}if(l){const d=Kr(t,s.id,o,l.x,l.y,null,{ready:!1,isVeteran:!0,bonusMaxHp:5});n.push({type:"UNIT_TRAINED",unitId:d.id,unitType:d.type,cityId:r.id,coord:l,ownerId:s.id})}}else e.reward==="park"&&(r.parks+=1);n.push({type:"CITY_REWARD_APPLIED",cityId:r.id,coord:{x:r.x,y:r.y},reward:e.reward,ownerId:s.id});break}case"USE_SUPERPOWER":{if(!ea(t,s.id))break;if(s.faction==="elves")t.eclipseTurnsRemaining=3,t.eclipseOwnerId=s.id,s.superpowerUsed=!0,n.push({type:"SUPERPOWER_USED",playerId:s.id,faction:s.faction});else if(s.faction==="orcs"){const r=e.target;if(!r||!_e(t,r.x,r.y)||!s.revealedTiles[Ve(r.x,r.y,t.mapSize)])break;const o=[],l=[];for(let c=-1;c<=1;c++)for(let d=-1;d<=1;d++){const u=_e(t,r.x+d,r.y+c);if(u){if(o.push({x:u.x,y:u.y}),u.unitId!==null){const h=t.units[u.unitId];h&&h.ownerId!==s.id&&(l.push(h.id),delete t.units[h.id],u.unitId=null)}u.resource=null,u.improvement=null,u.hasRoad=!1,u.terrain!=="water"&&(u.terrain="wasteland")}}s.superpowerUsed=!0,n.push({type:"SUPERPOWER_USED",playerId:s.id,faction:s.faction,target:{x:r.x,y:r.y},affectedCoords:o,destroyedUnitIds:l})}else if(s.faction==="dwarves"){const r=Qt(t,s.id),a=r.find(h=>h.isCapital)??r[0];if(!a)break;const o=(h,f)=>{const m=(h.x-a.x)**2+(h.y-a.y)**2,y=(f.x-a.x)**2+(f.y-a.y)**2;if(m!==y)return m-y;const g=xt(h,a),p=xt(f,a);return g!==p?g-p:h.y!==f.y?h.y-f.y:h.x-f.x};let c=t.tiles.filter(h=>h.terrain==="mountain"&&h.unitId===null).sort(o)[0]??null;if(c||(c=t.tiles.filter(f=>f.terrain!=="water"&&f.unitId===null).sort(o)[0]??null),!c)break;const d=Kr(t,s.id,"dragon",c.x,c.y,null,{ready:!0}),u=ji(t,s,c.x,c.y,2);u.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:u}),s.superpowerUsed=!0,n.push({type:"SUPERPOWER_USED",playerId:s.id,faction:s.faction,target:{x:c.x,y:c.y},spawnedUnitId:d.id})}else if(s.faction==="humans"){const r=e.target;if(!r||!oa(t,s.id).some(c=>c.x===r.x&&c.y===r.y))break;const o=Kr(t,s.id,"watchtower",r.x,r.y,null,{ready:!0}),l=ji(t,s,r.x,r.y,2);l.length>0&&n.push({type:"TILES_REVEALED",playerId:s.id,coords:l}),s.superpowerUsed=!0,n.push({type:"SUPERPOWER_USED",playerId:s.id,faction:s.faction,target:{x:r.x,y:r.y},spawnedUnitId:o.id})}break}case"END_TURN":{const r=t.players.length;let a=t.activePlayerIndex,o=!1;for(let c=1;c<=r;c++){const d=(t.activePlayerIndex+c)%r;if(d<=t.activePlayerIndex&&(o=!0),t.players[d].alive){a=d;break}}if(o&&(t.turn+=1),t.activePlayerIndex=a,t.config.maxTurns>0&&t.turn>t.config.maxTurns){const c=Md(t),u=t.players.slice().sort((h,f)=>{const m=c[f.id]-c[h.id];return m!==0?m:h.alive!==f.alive?h.alive?-1:1:f.gold-h.gold})[0];return t.phase="game_over",t.winnerId=u.id,t.winReason="glory",n.push({type:"GAME_OVER",winnerId:u.id,reason:"glory",scores:c}),{state:t,events:n}}const l=t.players[t.activePlayerIndex];(t.eclipseTurnsRemaining??0)>0&&t.eclipseOwnerId===l.id&&(t.eclipseTurnsRemaining-=1,t.eclipseTurnsRemaining<=0&&(t.eclipseTurnsRemaining=0,t.eclipseOwnerId=null)),Cp(t,l,n);break}}return go(t),{state:t,events:n}}const Ip=20261124,Pp=10,kp=6,Lp={humans:[{terrain:"plains",resource:"berries"},{terrain:"plains",resource:"berries"}],orcs:[{terrain:"plains",resource:"berries"},{terrain:"forest",resource:"game"}],elves:[{terrain:"ancient_woods",resource:"berries"},{terrain:"forest",resource:"game"}],dwarves:[{terrain:"mountain",resource:"ore"},{terrain:"mountain",resource:"ore"}]};function da(i){return i==="orcs"?"wasteland":"plains"}function ui(i,e,t,n){return t<0||n<0||t>=e||n>=e?null:i[Ve(t,n,e)]??null}function Ch(i,e){const t=`${e}_${i.nextEntityId}`;return i.nextEntityId+=1,t}function bd(i,e,t,n,s){for(let r=-s;r<=s;r++)for(let a=-s;a<=s;a++){const o=t+a,l=n+r;o<0||l<0||o>=i.mapSize||l>=i.mapSize||(e.revealedTiles[Ve(o,l,i.mapSize)]=!0)}}function Dp(i,e){const t=e.borderRadius;for(let s=-t;s<=t;s++)for(let r=-t;r<=t;r++){const a=_e(i,e.x+r,e.y+s);a&&a.cityId===null&&(a.cityId=e.id)}const n=_e(i,e.x,e.y);n&&(n.cityId=e.id,n.isCityCenter=!0,n.hasVillage=!1)}function Sd(i,e,t,n,s,r,a){const o=Io(i,e,t),l=a?.ready??!0,c=a?.hp!==void 0?Math.min(o,Math.max(1,a.hp)):o,d={id:Ch(i,"unit"),type:t,ownerId:e,homeCityId:r,x:n,y:s,hp:c,maxHp:o,kills:0,isVeteran:!1,canPromote:!1,hasMoved:!l,hasAttacked:!l,canEscapeMove:!1,canPersistAttack:!1,actedThisTurn:!l,canCapture:!1,canExploreRuins:!1};i.units[d.id]=d;const u=_e(i,n,s);return u&&(u.unitId=d.id),d}function Up(i){for(const e of i.players){if(e.faction==="humans"){const t=Nc(i,e.id);for(const n of Qt(i,e.id))n.connectedToCapital=t.has(n.id)}e.goldPerTurn=Fc(i,e.id),e.score=Po(i,e.id)}}function Op(i,e,t,n,s){const r=l=>l.terrain!=="water"&&l.terrain!=="mountain",a=()=>{const l=new Uint8Array(e*e),c=Ve(t.x,t.y,e);l[c]=1;const d=[t];let u=0;for(;u<d.length;){const h=d[u++];for(let f=-1;f<=1;f++)for(let m=-1;m<=1;m++){if(m===0&&f===0)continue;const y=h.x+m,g=h.y+f,p=ui(i,e,y,g);if(!p||!r(p))continue;const v=Ve(y,g,e);l[v]||(l[v]=1,d.push({x:y,y:g}))}}return l};let o=a();for(const l of n){const c=Ve(l.x,l.y,e);if(o[c])continue;let d=l.x,u=l.y,h=e*4;for(;!o[Ve(d,u,e)]&&h-- >0;){const f=ui(i,e,d,u);if(f&&!r(f)&&!s.has(`${d},${u}`)&&(f.terrain=da(f.biome),(f.resource==="ore"||f.resource==="mithril")&&(f.resource=null)),d===t.x&&u===t.y)break;d<t.x?d++:d>t.x&&d--,u<t.y?u++:u>t.y&&u--}o=a()}}function Np(i,e,t,n){const s=ui(i,e,t.x,t.y);s.terrain=da(n),s.biome=n,s.resource=null,s.improvement=null,s.hasVillage=!1;const r=[];for(let a=-1;a<=1;a++)for(let o=-1;o<=1;o++){if(o===0&&a===0)continue;const l=ui(i,e,t.x+o,t.y+a);l&&r.push(l)}for(const a of r)a.biome=n,(a.terrain==="water"||a.terrain==="mountain")&&(a.terrain=da(n)),a.resource=null,a.improvement=null,a.hasVillage=!1;n==="humans"?(r[0].terrain="plains",r[0].resource="berries",r[1].terrain="plains",r[1].resource="berries",r[2].terrain="forest",r[2].resource="game"):n==="orcs"?(r[0].terrain="plains",r[0].resource="berries",r[1].terrain="forest",r[1].resource="game",r[2].terrain="wasteland"):n==="elves"?(r[0].terrain="ancient_woods",r[0].resource="berries",r[1].terrain="ancient_woods",r[2].terrain="forest",r[2].resource="game"):n==="dwarves"&&(r[0].terrain="mountain",r[0].resource="ore",r[1].terrain="mountain",r[1].resource="mithril",r[2].terrain="plains",r[2].resource="berries")}function xd(i){const{humanFaction:e,difficulty:t,mapSize:n}=i,s=i.maxTurns??0,r=Eh(Ip),a=Ah(n,r),o=a.tiles,l=n===18?8:7,c=n===18?8:7,d={x:l,y:c},u={x:l+1,y:c},h={x:l+2,y:c},f=[{x:l-1,y:c},{x:l,y:c-1}],m={x:l+2,y:c},y=an.filter($=>$!==e),g=y.includes("orcs")?["orcs",...y.filter($=>$!=="orcs")]:y,p=[e,...g],v=[{x:n-3,y:2},{x:2,y:2},{x:2,y:n-3}],w={};w[e]=d;for(let $=0;$<g.length;$++)w[g[$]]=v[$];for(const $ of o){const D=xt($,d)<=2||xt($,h)<=2||xt($,m)<=1,q=v.some(Q=>xt($,Q)<=2);(D||q)&&($.hasVillage=!1,$.resource==="ruins"&&($.resource=null))}const _=ui(o,n,l,c);_.terrain=da(e),_.biome=e,_.resource=null,_.improvement=null,_.hasRoad=!1,_.hasVillage=!1;for(let $=-1;$<=1;$++)for(let D=-1;D<=1;D++){if(D===0&&$===0)continue;const q=ui(o,n,l+D,c+$);q&&(q.biome=e,q.resource=null,q.improvement=null,q.hasRoad=!1,q.hasVillage=!1,(q.terrain==="water"||q.terrain==="mountain")&&(q.terrain=da(e)))}const[M,b]=Lp[e],T=ui(o,n,f[0].x,f[0].y);T.terrain=M.terrain,T.biome=e,T.resource=M.resource,T.hasVillage=!1;const E=ui(o,n,f[1].x,f[1].y);E.terrain=b.terrain,E.biome=e,E.resource=b.resource,E.hasVillage=!1;const S=ui(o,n,u.x,u.y);S.terrain="plains",S.biome=e,S.resource=null,S.improvement=null,S.hasRoad=!1,S.hasVillage=!1;const x=ui(o,n,h.x,h.y);x.terrain="plains",x.biome=g[0],x.resource=null,x.improvement=null,x.hasRoad=!1,x.hasVillage=!0;for(let $=0;$<g.length;$++)Np(o,n,v[$],g[$]);const A=new Set([`${f[0].x},${f[0].y}`,`${f[1].x},${f[1].y}`]),P=[h,m,...v,...o.filter($=>$.hasVillage).map($=>({x:$.x,y:$.y}))];Op(o,n,d,P,A);const I=p.map($=>{const D=dt[$],q=$===e;return{id:`player_${$}`,faction:$,name:D.name,isHuman:q,gold:q?Pp:D.startingGold,goldPerTurn:0,score:0,techs:[D.startingTech],revealedTiles:new Array(n*n).fill(!1),alive:!0,eliminatedOnTurn:null,superpowerUsed:!1}}),F={config:{humanFaction:e,difficulty:t,mapSize:n,maxTurns:s,seed:r},mapSize:n,turn:1,activePlayerIndex:0,phase:"playing",winnerId:null,winReason:null,eclipseTurnsRemaining:0,eclipseOwnerId:null,rngState:a.rngState,nextEntityId:1,players:I,tiles:o,cities:{},units:{}};let N="";for(const $ of F.players){const D=dt[$.faction],q=w[$.faction],Q=Ch(F,"city"),te={id:Q,name:D.cityNames[0],ownerId:$.id,styleFaction:$.faction,x:q.x,y:q.y,isCapital:!0,level:1,population:0,hasWorkshop:!1,hasWalls:!1,borderRadius:1,parks:0,pendingLevelRewards:[],connectedToCapital:!0};F.cities[Q]=te,Dp(F,te),bd(F,$,q.x,q.y,2);const L=$.isHuman&&D.startingUnit==="defender"?"warrior":D.startingUnit,j=Sd(F,$.id,L,q.x,q.y,Q,{ready:!0});$.isHuman&&(N=j.id)}x.cityId=null,x.isCityCenter=!1,x.hasVillage=!0;const Y=F.players[0];for(const $ of[d,u,h,f[0],f[1],m])Y.revealedTiles[Ve($.x,$.y,n)]=!0;const U=F.players[1],z=Sd(F,U.id,"warrior",m.x,m.y,null,{ready:!0,hp:kp});return bd(F,U,m.x,m.y,1),Up(F),{state:F,scenario:{capitalCoord:d,moveTargetCoord:u,villageCoord:h,resourceCoords:f,enemyCoord:m,enemyUnitId:z.id,starterUnitId:N}}}const Uo="eldermere_saved_campaign_v1",zc="eldermere_tutorial_done_v1",Fp=["easy","normal","hard"],Bp=["intro","stars","upgrade","move","combat","capture","codex","train","end_turn","complete"];function Hp(i){return typeof i=="string"&&Fp.includes(i)}function zp(i){return Hp(i)?i:"normal"}function Ir(){try{if(typeof window<"u"&&window.localStorage)return window.localStorage}catch{}return null}function Gp(i){return typeof i=="string"&&Bp.includes(i)}function Ls(i){return typeof i=="object"&&i!==null&&typeof i.x=="number"&&typeof i.y=="number"}function Vp(i){if(typeof i!="object"||i===null)return!1;const e=i;return Ls(e.capitalCoord)&&Ls(e.moveTargetCoord)&&Ls(e.villageCoord)&&Array.isArray(e.resourceCoords)&&e.resourceCoords.length===2&&Ls(e.resourceCoords[0])&&Ls(e.resourceCoords[1])&&Ls(e.enemyCoord)&&typeof e.enemyUnitId=="string"&&typeof e.starterUnitId=="string"}function Wp(i,e,t=null,n=null){if(i.phase!=="playing")return ir(),!1;const s=Ir();if(!s)return!1;const r={version:1,savedAt:Date.now(),humanPlayerId:e,state:i,tutorialStage:t,tutorialScenario:n};try{return s.setItem(Uo,JSON.stringify(r)),!0}catch{return!1}}function Nl(){const i=Ir();if(!i)return null;try{const e=i.getItem(Uo);if(!e)return null;const t=JSON.parse(e);if(!t||t.version!==1||typeof t.humanPlayerId!="string"||!t.state||t.state.phase!=="playing"||!Array.isArray(t.state.players)||!Array.isArray(t.state.tiles)||t.state.tiles.length!==t.state.mapSize*t.state.mapSize)return null;const n=t.state.players.find(r=>r.id===t.humanPlayerId);if(!n||!n.alive||!t.state.config||typeof t.state.config!="object")return null;const s={...t.state,config:{...t.state.config,difficulty:zp(t.state.config.difficulty)}};return{version:1,savedAt:typeof t.savedAt=="number"?t.savedAt:Date.now(),humanPlayerId:t.humanPlayerId,state:s,tutorialStage:Gp(t.tutorialStage)?t.tutorialStage:null,tutorialScenario:Vp(t.tutorialScenario)?t.tutorialScenario:null}}catch{return null}}function Td(){const i=Nl();if(!i)return null;const e=He(i.state,i.humanPlayerId);if(!e)return null;const t=Qt(i.state,i.humanPlayerId).length;return{faction:e.faction,turn:i.state.turn,score:e.score,citiesCount:t,mapSize:i.state.mapSize,difficulty:i.state.config.difficulty,savedAt:i.savedAt}}function ir(){const i=Ir();if(i)try{i.removeItem(Uo)}catch{}}function Ta(){const i=Ir();if(!i)return!1;try{return i.getItem(zc)==="true"}catch{return!1}}function Ed(){const i=Ir();if(i)try{i.setItem(zc,"true")}catch{}}function $p(){const i=Ir();if(i)try{i.removeItem(Uo),i.removeItem(zc),i.clear()}catch{}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Gc="172",Xp=0,Ad=1,qp=2,Ih=1,Ph=2,Ei=3,es=0,Pn=1,_t=2,Ji=0,fr=1,yo=2,Rd=3,Cd=4,Yp=5,vs=100,Kp=101,jp=102,Zp=103,Jp=104,Qp=200,em=201,tm=202,nm=203,Fl=204,Bl=205,im=206,sm=207,rm=208,am=209,om=210,lm=211,cm=212,dm=213,um=214,Hl=0,zl=1,Gl=2,Mr=3,Vl=4,Wl=5,$l=6,Xl=7,kh=0,hm=1,fm=2,Qi=0,pm=1,mm=2,gm=3,ym=4,vm=5,_m=6,Vc=7,Lh=300,br=301,Sr=302,ql=303,Yl=304,Oo=306,ua=1e3,Ms=1001,Kl=1002,ai=1003,wm=1004,Ea=1005,Zn=1006,$o=1007,Pi=1008,Ni=1009,Dh=1010,Uh=1011,ha=1012,Wc=1013,Cs=1014,ki=1015,ga=1016,$c=1017,Xc=1018,xr=1020,Oh=35902,Nh=1021,Fh=1022,ri=1023,Bh=1024,Hh=1025,pr=1026,Tr=1027,zh=1028,qc=1029,Gh=1030,Yc=1031,Kc=1033,ro=33776,ao=33777,oo=33778,lo=33779,jl=35840,Zl=35841,Jl=35842,Ql=35843,ec=36196,tc=37492,nc=37496,ic=37808,sc=37809,rc=37810,ac=37811,oc=37812,lc=37813,cc=37814,dc=37815,uc=37816,hc=37817,fc=37818,pc=37819,mc=37820,gc=37821,co=36492,yc=36494,vc=36495,Vh=36283,_c=36284,wc=36285,Mc=36286,Mm=3200,bm=3201,Wh=0,Sm=1,Ii="",hn="srgb",Er="srgb-linear",vo="linear",Pt="srgb",Ds=7680,Id=519,xm=512,Tm=513,Em=514,$h=515,Am=516,Rm=517,Cm=518,Im=519,bc=35044,Pd="300 es",Li=2e3,_o=2001;class Pr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let kd=1234567;const na=Math.PI/180,fa=180/Math.PI;function Ui(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mn[i&255]+mn[i>>8&255]+mn[i>>16&255]+mn[i>>24&255]+"-"+mn[e&255]+mn[e>>8&255]+"-"+mn[e>>16&15|64]+mn[e>>24&255]+"-"+mn[t&63|128]+mn[t>>8&255]+"-"+mn[t>>16&255]+mn[t>>24&255]+mn[n&255]+mn[n>>8&255]+mn[n>>16&255]+mn[n>>24&255]).toLowerCase()}function ct(i,e,t){return Math.max(e,Math.min(t,i))}function jc(i,e){return(i%e+e)%e}function Pm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function km(i,e,t){return i!==e?(t-i)/(e-i):0}function ia(i,e,t){return(1-t)*i+t*e}function Lm(i,e,t,n){return ia(i,e,1-Math.exp(-t*n))}function Dm(i,e=1){return e-Math.abs(jc(i,e*2)-e)}function Um(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Om(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Nm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Fm(i,e){return i+Math.random()*(e-i)}function Bm(i){return i*(.5-Math.random())}function Hm(i){i!==void 0&&(kd=i);let e=kd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function zm(i){return i*na}function Gm(i){return i*fa}function Vm(i){return(i&i-1)===0&&i!==0}function Wm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function $m(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Xm(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),u=r((e-n)/2),h=a((e-n)/2),f=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*d,l*u,l*h,o*c);break;case"YZY":i.set(l*h,o*d,l*u,o*c);break;case"ZXZ":i.set(l*u,l*h,o*d,o*c);break;case"XZX":i.set(o*d,l*m,l*f,o*c);break;case"YXY":i.set(l*f,o*d,l*m,o*c);break;case"ZYZ":i.set(l*m,l*f,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function si(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Rt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const wt={DEG2RAD:na,RAD2DEG:fa,generateUUID:Ui,clamp:ct,euclideanModulo:jc,mapLinear:Pm,inverseLerp:km,lerp:ia,damp:Lm,pingpong:Dm,smoothstep:Um,smootherstep:Om,randInt:Nm,randFloat:Fm,randFloatSpread:Bm,seededRandom:Hm,degToRad:zm,radToDeg:Gm,isPowerOfTwo:Vm,ceilPowerOfTwo:Wm,floorPowerOfTwo:$m,setQuaternionFromProperEuler:Xm,normalize:Rt,denormalize:si};class tt{constructor(e=0,t=0){tt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class st{constructor(e,t,n,s,r,a,o,l,c){st.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],h=n[2],f=n[5],m=n[8],y=s[0],g=s[3],p=s[6],v=s[1],w=s[4],_=s[7],M=s[2],b=s[5],T=s[8];return r[0]=a*y+o*v+l*M,r[3]=a*g+o*w+l*b,r[6]=a*p+o*_+l*T,r[1]=c*y+d*v+u*M,r[4]=c*g+d*w+u*b,r[7]=c*p+d*_+u*T,r[2]=h*y+f*v+m*M,r[5]=h*g+f*w+m*b,r[8]=h*p+f*_+m*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,h=o*l-d*r,f=c*r-a*l,m=t*u+n*h+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/m;return e[0]=u*y,e[1]=(s*c-d*n)*y,e[2]=(o*n-s*a)*y,e[3]=h*y,e[4]=(d*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Xo.makeScale(e,t)),this}rotate(e){return this.premultiply(Xo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Xo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Xo=new st;function Xh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function pa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qm(){const i=pa("canvas");return i.style.display="block",i}const Ld={};function sr(i){i in Ld||(Ld[i]=!0,console.warn(i))}function Ym(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Km(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function jm(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Dd=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ud=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zm(){const i={enabled:!0,workingColorSpace:Er,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Pt&&(s.r=Oi(s.r),s.g=Oi(s.g),s.b=Oi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Pt&&(s.r=mr(s.r),s.g=mr(s.g),s.b=mr(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ii?vo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Er]:{primaries:e,whitePoint:n,transfer:vo,toXYZ:Dd,fromXYZ:Ud,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:e,whitePoint:n,transfer:Pt,toXYZ:Dd,fromXYZ:Ud,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}const bt=Zm();function Oi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function mr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Us;class Jm{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Us===void 0&&(Us=pa("canvas")),Us.width=e.width,Us.height=e.height;const n=Us.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Us}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=pa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Oi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Oi(t[n]/255)*255):t[n]=Oi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Qm=0;class qh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=Ui(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(qo(s[a].image)):r.push(qo(s[a]))}else r=qo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function qo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Jm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let e0=0;class wn extends Pr{constructor(e=wn.DEFAULT_IMAGE,t=wn.DEFAULT_MAPPING,n=Ms,s=Ms,r=Zn,a=Pi,o=ri,l=Ni,c=wn.DEFAULT_ANISOTROPY,d=Ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:e0++}),this.uuid=Ui(),this.name="",this.source=new qh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new tt(0,0),this.repeat=new tt(1,1),this.center=new tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Lh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ua:e.x=e.x-Math.floor(e.x);break;case Ms:e.x=e.x<0?0:1;break;case Kl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ua:e.y=e.y-Math.floor(e.y);break;case Ms:e.y=e.y<0?0:1;break;case Kl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}wn.DEFAULT_IMAGE=null;wn.DEFAULT_MAPPING=Lh;wn.DEFAULT_ANISOTROPY=1;class $t{constructor(e=0,t=0,n=0,s=1){$t.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],f=l[5],m=l[9],y=l[2],g=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+y)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,_=(f+1)/2,M=(p+1)/2,b=(d+h)/4,T=(u+y)/4,E=(m+g)/4;return w>_&&w>M?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=b/n,r=T/n):_>M?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=b/s,r=E/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=T/r,s=E/r),this.set(n,s,r,t),this}let v=Math.sqrt((g-m)*(g-m)+(u-y)*(u-y)+(h-d)*(h-d));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(u-y)/v,this.z=(h-d)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this.w=ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this.w=ct(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class t0 extends Pr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new $t(0,0,e,t),this.scissorTest=!1,this.viewport=new $t(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new wn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new qh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Is extends t0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Yh extends wn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=ai,this.minFilter=ai,this.wrapR=Ms,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class n0 extends wn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=ai,this.minFilter=ai,this.wrapR=Ms,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ya{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],u=n[s+3];const h=r[a+0],f=r[a+1],m=r[a+2],y=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=m,e[t+3]=y;return}if(u!==y||l!==h||c!==f||d!==m){let g=1-o;const p=l*h+c*f+d*m+u*y,v=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){const M=Math.sqrt(w),b=Math.atan2(M,p*v);g=Math.sin(g*b)/M,o=Math.sin(o*b)/M}const _=o*v;if(l=l*g+h*_,c=c*g+f*_,d=d*g+m*_,u=u*g+y*_,g===1-o){const M=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=M,c*=M,d*=M,u*=M}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],u=r[a],h=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+d*u+l*f-c*h,e[t+1]=l*m+d*h+c*u-o*f,e[t+2]=c*m+d*f+o*h-l*u,e[t+3]=d*m-o*u-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),u=o(r/2),h=l(n/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=h*d*u+c*f*m,this._y=c*f*u-h*d*m,this._z=c*d*m+h*f*u,this._w=c*d*u-h*f*m;break;case"YXZ":this._x=h*d*u+c*f*m,this._y=c*f*u-h*d*m,this._z=c*d*m-h*f*u,this._w=c*d*u+h*f*m;break;case"ZXY":this._x=h*d*u-c*f*m,this._y=c*f*u+h*d*m,this._z=c*d*m+h*f*u,this._w=c*d*u-h*f*m;break;case"ZYX":this._x=h*d*u-c*f*m,this._y=c*f*u+h*d*m,this._z=c*d*m-h*f*u,this._w=c*d*u+h*f*m;break;case"YZX":this._x=h*d*u+c*f*m,this._y=c*f*u+h*d*m,this._z=c*d*m-h*f*u,this._w=c*d*u-h*f*m;break;case"XZY":this._x=h*d*u-c*f*m,this._y=c*f*u-h*d*m,this._z=c*d*m+h*f*u,this._w=c*d*u+h*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=n+o+u;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(d-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ct(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,h=Math.sin(t*d)/c;return this._w=a*u+this._w*h,this._x=n*u+this._x*h,this._y=s*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,t=0,n=0){B.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Od.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Od.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*d,this.y=n+l*d+o*c-r*u,this.z=s+l*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Yo.copy(this).projectOnVector(e),this.sub(Yo)}reflect(e){return this.sub(Yo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Yo=new B,Od=new ya;class kr{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ei.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ei.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ei.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ei):ei.fromBufferAttribute(r,a),ei.applyMatrix4(e.matrixWorld),this.expandByPoint(ei);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Aa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Aa.copy(n.boundingBox)),Aa.applyMatrix4(e.matrixWorld),this.union(Aa)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ei),ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Or),Ra.subVectors(this.max,Or),Os.subVectors(e.a,Or),Ns.subVectors(e.b,Or),Fs.subVectors(e.c,Or),zi.subVectors(Ns,Os),Gi.subVectors(Fs,Ns),rs.subVectors(Os,Fs);let t=[0,-zi.z,zi.y,0,-Gi.z,Gi.y,0,-rs.z,rs.y,zi.z,0,-zi.x,Gi.z,0,-Gi.x,rs.z,0,-rs.x,-zi.y,zi.x,0,-Gi.y,Gi.x,0,-rs.y,rs.x,0];return!Ko(t,Os,Ns,Fs,Ra)||(t=[1,0,0,0,1,0,0,0,1],!Ko(t,Os,Ns,Fs,Ra))?!1:(Ca.crossVectors(zi,Gi),t=[Ca.x,Ca.y,Ca.z],Ko(t,Os,Ns,Fs,Ra))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(wi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),wi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),wi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),wi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),wi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),wi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),wi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),wi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(wi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const wi=[new B,new B,new B,new B,new B,new B,new B,new B],ei=new B,Aa=new kr,Os=new B,Ns=new B,Fs=new B,zi=new B,Gi=new B,rs=new B,Or=new B,Ra=new B,Ca=new B,as=new B;function Ko(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){as.fromArray(i,r);const o=s.x*Math.abs(as.x)+s.y*Math.abs(as.y)+s.z*Math.abs(as.z),l=e.dot(as),c=t.dot(as),d=n.dot(as);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const i0=new kr,Nr=new B,jo=new B;class Zc{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):i0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Nr.subVectors(e,this.center);const t=Nr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Nr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(jo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Nr.copy(e.center).add(jo)),this.expandByPoint(Nr.copy(e.center).sub(jo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Mi=new B,Zo=new B,Ia=new B,Vi=new B,Jo=new B,Pa=new B,Qo=new B;class Kh{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mi.copy(this.origin).addScaledVector(this.direction,t),Mi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Zo.copy(e).add(t).multiplyScalar(.5),Ia.copy(t).sub(e).normalize(),Vi.copy(this.origin).sub(Zo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ia),o=Vi.dot(this.direction),l=-Vi.dot(Ia),c=Vi.lengthSq(),d=Math.abs(1-a*a);let u,h,f,m;if(d>0)if(u=a*l-o,h=a*o-l,m=r*d,u>=0)if(h>=-m)if(h<=m){const y=1/d;u*=y,h*=y,f=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h<=-m?(u=Math.max(0,-(-a*r+o)),h=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c):h<=m?(u=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(u=Math.max(0,-(a*r+o)),h=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c);else h=a>0?-r:r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Zo).addScaledVector(Ia,h),f}intersectSphere(e,t){Mi.subVectors(e.center,this.origin);const n=Mi.dot(this.direction),s=Mi.dot(Mi)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),d>=0?(r=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Mi)!==null}intersectTriangle(e,t,n,s,r){Jo.subVectors(t,e),Pa.subVectors(n,e),Qo.crossVectors(Jo,Pa);let a=this.direction.dot(Qo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Vi.subVectors(this.origin,e);const l=o*this.direction.dot(Pa.crossVectors(Vi,Pa));if(l<0)return null;const c=o*this.direction.dot(Jo.cross(Vi));if(c<0||l+c>a)return null;const d=-o*Vi.dot(Qo);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Bt{constructor(e,t,n,s,r,a,o,l,c,d,u,h,f,m,y,g){Bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,u,h,f,m,y,g)}set(e,t,n,s,r,a,o,l,c,d,u,h,f,m,y,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=f,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Bt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Bs.setFromMatrixColumn(e,0).length(),r=1/Bs.setFromMatrixColumn(e,1).length(),a=1/Bs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const h=a*d,f=a*u,m=o*d,y=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=f+m*c,t[5]=h-y*c,t[9]=-o*l,t[2]=y-h*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*d,f=l*u,m=c*d,y=c*u;t[0]=h+y*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=f*o-m,t[6]=y+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*d,f=l*u,m=c*d,y=c*u;t[0]=h-y*o,t[4]=-a*u,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*d,t[9]=y-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*d,f=a*u,m=o*d,y=o*u;t[0]=l*d,t[4]=m*c-f,t[8]=h*c+y,t[1]=l*u,t[5]=y*c+h,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,m=o*l,y=o*c;t[0]=l*d,t[4]=y-h*u,t[8]=m*u+f,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*u+m,t[10]=h-y*u}else if(e.order==="XZY"){const h=a*l,f=a*c,m=o*l,y=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+y,t[5]=a*d,t[9]=f*u-m,t[2]=m*u-f,t[6]=o*d,t[10]=y*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(s0,e,r0)}lookAt(e,t,n){const s=this.elements;return On.subVectors(e,t),On.lengthSq()===0&&(On.z=1),On.normalize(),Wi.crossVectors(n,On),Wi.lengthSq()===0&&(Math.abs(n.z)===1?On.x+=1e-4:On.z+=1e-4,On.normalize(),Wi.crossVectors(n,On)),Wi.normalize(),ka.crossVectors(On,Wi),s[0]=Wi.x,s[4]=ka.x,s[8]=On.x,s[1]=Wi.y,s[5]=ka.y,s[9]=On.y,s[2]=Wi.z,s[6]=ka.z,s[10]=On.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],h=n[9],f=n[13],m=n[2],y=n[6],g=n[10],p=n[14],v=n[3],w=n[7],_=n[11],M=n[15],b=s[0],T=s[4],E=s[8],S=s[12],x=s[1],A=s[5],P=s[9],I=s[13],F=s[2],N=s[6],Y=s[10],U=s[14],z=s[3],$=s[7],D=s[11],q=s[15];return r[0]=a*b+o*x+l*F+c*z,r[4]=a*T+o*A+l*N+c*$,r[8]=a*E+o*P+l*Y+c*D,r[12]=a*S+o*I+l*U+c*q,r[1]=d*b+u*x+h*F+f*z,r[5]=d*T+u*A+h*N+f*$,r[9]=d*E+u*P+h*Y+f*D,r[13]=d*S+u*I+h*U+f*q,r[2]=m*b+y*x+g*F+p*z,r[6]=m*T+y*A+g*N+p*$,r[10]=m*E+y*P+g*Y+p*D,r[14]=m*S+y*I+g*U+p*q,r[3]=v*b+w*x+_*F+M*z,r[7]=v*T+w*A+_*N+M*$,r[11]=v*E+w*P+_*Y+M*D,r[15]=v*S+w*I+_*U+M*q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],f=e[14],m=e[3],y=e[7],g=e[11],p=e[15];return m*(+r*l*u-s*c*u-r*o*h+n*c*h+s*o*f-n*l*f)+y*(+t*l*f-t*c*h+r*a*h-s*a*f+s*c*d-r*l*d)+g*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*d-n*c*d)+p*(-s*o*d-t*l*u+t*o*h+s*a*u-n*a*h+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],f=e[11],m=e[12],y=e[13],g=e[14],p=e[15],v=u*g*c-y*h*c+y*l*f-o*g*f-u*l*p+o*h*p,w=m*h*c-d*g*c-m*l*f+a*g*f+d*l*p-a*h*p,_=d*y*c-m*u*c+m*o*f-a*y*f-d*o*p+a*u*p,M=m*u*l-d*y*l-m*o*h+a*y*h+d*o*g-a*u*g,b=t*v+n*w+s*_+r*M;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/b;return e[0]=v*T,e[1]=(y*h*r-u*g*r-y*s*f+n*g*f+u*s*p-n*h*p)*T,e[2]=(o*g*r-y*l*r+y*s*c-n*g*c-o*s*p+n*l*p)*T,e[3]=(u*l*r-o*h*r-u*s*c+n*h*c+o*s*f-n*l*f)*T,e[4]=w*T,e[5]=(d*g*r-m*h*r+m*s*f-t*g*f-d*s*p+t*h*p)*T,e[6]=(m*l*r-a*g*r-m*s*c+t*g*c+a*s*p-t*l*p)*T,e[7]=(a*h*r-d*l*r+d*s*c-t*h*c-a*s*f+t*l*f)*T,e[8]=_*T,e[9]=(m*u*r-d*y*r-m*n*f+t*y*f+d*n*p-t*u*p)*T,e[10]=(a*y*r-m*o*r+m*n*c-t*y*c-a*n*p+t*o*p)*T,e[11]=(d*o*r-a*u*r-d*n*c+t*u*c+a*n*f-t*o*f)*T,e[12]=M*T,e[13]=(d*y*s-m*u*s+m*n*h-t*y*h-d*n*g+t*u*g)*T,e[14]=(m*o*s-a*y*s-m*n*l+t*y*l+a*n*g-t*o*g)*T,e[15]=(a*u*s-d*o*s+d*n*l-t*u*l-a*n*h+t*o*h)*T,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,u=o+o,h=r*c,f=r*d,m=r*u,y=a*d,g=a*u,p=o*u,v=l*c,w=l*d,_=l*u,M=n.x,b=n.y,T=n.z;return s[0]=(1-(y+p))*M,s[1]=(f+_)*M,s[2]=(m-w)*M,s[3]=0,s[4]=(f-_)*b,s[5]=(1-(h+p))*b,s[6]=(g+v)*b,s[7]=0,s[8]=(m+w)*T,s[9]=(g-v)*T,s[10]=(1-(h+y))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Bs.set(s[0],s[1],s[2]).length();const a=Bs.set(s[4],s[5],s[6]).length(),o=Bs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],ti.copy(this);const c=1/r,d=1/a,u=1/o;return ti.elements[0]*=c,ti.elements[1]*=c,ti.elements[2]*=c,ti.elements[4]*=d,ti.elements[5]*=d,ti.elements[6]*=d,ti.elements[8]*=u,ti.elements[9]*=u,ti.elements[10]*=u,t.setFromRotationMatrix(ti),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Li){const l=this.elements,c=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),h=(n+s)/(n-s);let f,m;if(o===Li)f=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===_o)f=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Li){const l=this.elements,c=1/(t-e),d=1/(n-s),u=1/(a-r),h=(t+e)*c,f=(n+s)*d;let m,y;if(o===Li)m=(a+r)*u,y=-2*u;else if(o===_o)m=r*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=y,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Bs=new B,ti=new Bt,s0=new B(0,0,0),r0=new B(1,1,1),Wi=new B,ka=new B,On=new B,Nd=new Bt,Fd=new ya;class vi{constructor(e=0,t=0,n=0,s=vi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ct(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ct(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ct(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Nd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Fd.setFromEuler(this),this.setFromQuaternion(Fd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vi.DEFAULT_ORDER="XYZ";class Jc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let a0=0;const Bd=new B,Hs=new ya,bi=new Bt,La=new B,Fr=new B,o0=new B,l0=new ya,Hd=new B(1,0,0),zd=new B(0,1,0),Gd=new B(0,0,1),Vd={type:"added"},c0={type:"removed"},zs={type:"childadded",child:null},el={type:"childremoved",child:null};class cn extends Pr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:a0++}),this.uuid=Ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=cn.DEFAULT_UP.clone();const e=new B,t=new vi,n=new ya,s=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Bt},normalMatrix:{value:new st}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Jc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hs.setFromAxisAngle(e,t),this.quaternion.multiply(Hs),this}rotateOnWorldAxis(e,t){return Hs.setFromAxisAngle(e,t),this.quaternion.premultiply(Hs),this}rotateX(e){return this.rotateOnAxis(Hd,e)}rotateY(e){return this.rotateOnAxis(zd,e)}rotateZ(e){return this.rotateOnAxis(Gd,e)}translateOnAxis(e,t){return Bd.copy(e).applyQuaternion(this.quaternion),this.position.add(Bd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hd,e)}translateY(e){return this.translateOnAxis(zd,e)}translateZ(e){return this.translateOnAxis(Gd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?La.copy(e):La.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(Fr,La,this.up):bi.lookAt(La,Fr,this.up),this.quaternion.setFromRotationMatrix(bi),s&&(bi.extractRotation(s.matrixWorld),Hs.setFromRotationMatrix(bi),this.quaternion.premultiply(Hs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vd),zs.child=e,this.dispatchEvent(zs),zs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(c0),el.child=e,this.dispatchEvent(el),el.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vd),zs.child=e,this.dispatchEvent(zs),zs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,e,o0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,l0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),h=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}cn.DEFAULT_UP=new B(0,1,0);cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ni=new B,Si=new B,tl=new B,xi=new B,Gs=new B,Vs=new B,Wd=new B,nl=new B,il=new B,sl=new B,rl=new $t,al=new $t,ol=new $t;class jn{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ni.subVectors(e,t),s.cross(ni);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ni.subVectors(s,t),Si.subVectors(n,t),tl.subVectors(e,t);const a=ni.dot(ni),o=ni.dot(Si),l=ni.dot(tl),c=Si.dot(Si),d=Si.dot(tl),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const h=1/u,f=(c*l-o*d)*h,m=(a*d-o*l)*h;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,xi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,xi.x),l.addScaledVector(a,xi.y),l.addScaledVector(o,xi.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return rl.setScalar(0),al.setScalar(0),ol.setScalar(0),rl.fromBufferAttribute(e,t),al.fromBufferAttribute(e,n),ol.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(rl,r.x),a.addScaledVector(al,r.y),a.addScaledVector(ol,r.z),a}static isFrontFacing(e,t,n,s){return ni.subVectors(n,t),Si.subVectors(e,t),ni.cross(Si).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ni.subVectors(this.c,this.b),Si.subVectors(this.a,this.b),ni.cross(Si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return jn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return jn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return jn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return jn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return jn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Gs.subVectors(s,n),Vs.subVectors(r,n),nl.subVectors(e,n);const l=Gs.dot(nl),c=Vs.dot(nl);if(l<=0&&c<=0)return t.copy(n);il.subVectors(e,s);const d=Gs.dot(il),u=Vs.dot(il);if(d>=0&&u<=d)return t.copy(s);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(Gs,a);sl.subVectors(e,r);const f=Gs.dot(sl),m=Vs.dot(sl);if(m>=0&&f<=m)return t.copy(r);const y=f*c-l*m;if(y<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(Vs,o);const g=d*m-f*u;if(g<=0&&u-d>=0&&f-m>=0)return Wd.subVectors(r,s),o=(u-d)/(u-d+(f-m)),t.copy(s).addScaledVector(Wd,o);const p=1/(g+y+h);return a=y*p,o=h*p,t.copy(n).addScaledVector(Gs,a).addScaledVector(Vs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const jh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},Da={h:0,s:0,l:0};function ll(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,bt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=bt.workingColorSpace){return this.r=e,this.g=t,this.b=n,bt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=bt.workingColorSpace){if(e=jc(e,1),t=ct(t,0,1),n=ct(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ll(a,r,e+1/3),this.g=ll(a,r,e),this.b=ll(a,r,e-1/3)}return bt.toWorkingColorSpace(this,s),this}setStyle(e,t=hn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){const n=jh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Oi(e.r),this.g=Oi(e.g),this.b=Oi(e.b),this}copyLinearToSRGB(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return bt.fromWorkingColorSpace(gn.copy(this),e),Math.round(ct(gn.r*255,0,255))*65536+Math.round(ct(gn.g*255,0,255))*256+Math.round(ct(gn.b*255,0,255))}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=bt.workingColorSpace){bt.fromWorkingColorSpace(gn.copy(this),t);const n=gn.r,s=gn.g,r=gn.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=bt.workingColorSpace){return bt.fromWorkingColorSpace(gn.copy(this),t),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=hn){bt.fromWorkingColorSpace(gn.copy(this),e);const t=gn.r,n=gn.g,s=gn.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL($i),this.setHSL($i.h+e,$i.s+t,$i.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL($i),e.getHSL(Da);const n=ia($i.h,Da.h,t),s=ia($i.s,Da.s,t),r=ia($i.l,Da.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new xe;xe.NAMES=jh;let d0=0;class Lr extends Pr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:d0++}),this.uuid=Ui(),this.name="",this.type="Material",this.blending=fr,this.side=es,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fl,this.blendDst=Bl,this.blendEquation=vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xe(0,0,0),this.blendAlpha=0,this.depthFunc=Mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Id,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ds,this.stencilZFail=Ds,this.stencilZPass=Ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fr&&(n.blending=this.blending),this.side!==es&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Fl&&(n.blendSrc=this.blendSrc),this.blendDst!==Bl&&(n.blendDst=this.blendDst),this.blendEquation!==vs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Mr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Id&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ds&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ds&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ds&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class lt extends Lr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.combine=kh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const jt=new B,Ua=new tt;class oi{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=bc,this.updateRanges=[],this.gpuType=ki,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ua.fromBufferAttribute(this,t),Ua.applyMatrix3(e),this.setXY(t,Ua.x,Ua.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=si(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=si(t,this.array)),t}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=si(t,this.array)),t}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=si(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=si(t,this.array)),t}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),s=Rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),s=Rt(s,this.array),r=Rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==bc&&(e.usage=this.usage),e}}class Zh extends oi{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Jh extends oi{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ot extends oi{constructor(e,t,n){super(new Float32Array(e),t,n)}}let u0=0;const Xn=new Bt,cl=new cn,Ws=new B,Nn=new kr,Br=new kr,rn=new B;class Dn extends Pr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=Ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xh(e)?Jh:Zh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new st().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Xn.makeRotationFromQuaternion(e),this.applyMatrix4(Xn),this}rotateX(e){return Xn.makeRotationX(e),this.applyMatrix4(Xn),this}rotateY(e){return Xn.makeRotationY(e),this.applyMatrix4(Xn),this}rotateZ(e){return Xn.makeRotationZ(e),this.applyMatrix4(Xn),this}translate(e,t,n){return Xn.makeTranslation(e,t,n),this.applyMatrix4(Xn),this}scale(e,t,n){return Xn.makeScale(e,t,n),this.applyMatrix4(Xn),this}lookAt(e){return cl.lookAt(e),cl.updateMatrix(),this.applyMatrix4(cl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ws).negate(),this.translate(Ws.x,Ws.y,Ws.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ot(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Nn.setFromBufferAttribute(r),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const n=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Br.setFromBufferAttribute(o),this.morphTargetsRelative?(rn.addVectors(Nn.min,Br.min),Nn.expandByPoint(rn),rn.addVectors(Nn.max,Br.max),Nn.expandByPoint(rn)):(Nn.expandByPoint(Br.min),Nn.expandByPoint(Br.max))}Nn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)rn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(rn));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)rn.fromBufferAttribute(o,c),l&&(Ws.fromBufferAttribute(e,c),rn.add(Ws)),s=Math.max(s,n.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new oi(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let E=0;E<n.count;E++)o[E]=new B,l[E]=new B;const c=new B,d=new B,u=new B,h=new tt,f=new tt,m=new tt,y=new B,g=new B;function p(E,S,x){c.fromBufferAttribute(n,E),d.fromBufferAttribute(n,S),u.fromBufferAttribute(n,x),h.fromBufferAttribute(r,E),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,x),d.sub(c),u.sub(c),f.sub(h),m.sub(h);const A=1/(f.x*m.y-m.x*f.y);isFinite(A)&&(y.copy(d).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(A),g.copy(u).multiplyScalar(f.x).addScaledVector(d,-m.x).multiplyScalar(A),o[E].add(y),o[S].add(y),o[x].add(y),l[E].add(g),l[S].add(g),l[x].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let E=0,S=v.length;E<S;++E){const x=v[E],A=x.start,P=x.count;for(let I=A,F=A+P;I<F;I+=3)p(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const w=new B,_=new B,M=new B,b=new B;function T(E){M.fromBufferAttribute(s,E),b.copy(M);const S=o[E];w.copy(S),w.sub(M.multiplyScalar(M.dot(S))).normalize(),_.crossVectors(b,S);const A=_.dot(l[E])<0?-1:1;a.setXYZW(E,w.x,w.y,w.z,A)}for(let E=0,S=v.length;E<S;++E){const x=v[E],A=x.start,P=x.count;for(let I=A,F=A+P;I<F;I+=3)T(e.getX(I+0)),T(e.getX(I+1)),T(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new oi(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const s=new B,r=new B,a=new B,o=new B,l=new B,c=new B,d=new B,u=new B;if(e)for(let h=0,f=e.count;h<f;h+=3){const m=e.getX(h+0),y=e.getX(h+1),g=e.getX(h+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,g),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),o.add(d),l.add(d),c.add(d),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let f=0,m=0;for(let y=0,g=l.length;y<g;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*d;for(let p=0;p<d;p++)h[m++]=c[f++]}return new oi(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Dn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const f=c[u];d.push(f.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],u=r[c];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const $d=new Bt,os=new Kh,Oa=new Zc,Xd=new B,Na=new B,Fa=new B,Ba=new B,dl=new B,Ha=new B,qd=new B,za=new B;class V extends cn{constructor(e=new Dn,t=new lt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ha.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],u=r[l];d!==0&&(dl.fromBufferAttribute(u,e),a?Ha.addScaledVector(dl,d):Ha.addScaledVector(dl.sub(t),d))}t.add(Ha)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Oa.copy(n.boundingSphere),Oa.applyMatrix4(r),os.copy(e.ray).recast(e.near),!(Oa.containsPoint(os.origin)===!1&&(os.intersectSphere(Oa,Xd)===null||os.origin.distanceToSquared(Xd)>(e.far-e.near)**2))&&($d.copy(r).invert(),os.copy(e.ray).applyMatrix4($d),!(n.boundingBox!==null&&os.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,os)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=h.length;m<y;m++){const g=h[m],p=a[g.materialIndex],v=Math.max(g.start,f.start),w=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let _=v,M=w;_<M;_+=3){const b=o.getX(_),T=o.getX(_+1),E=o.getX(_+2);s=Ga(this,p,e,n,c,d,u,b,T,E),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){const v=o.getX(g),w=o.getX(g+1),_=o.getX(g+2);s=Ga(this,a,e,n,c,d,u,v,w,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,y=h.length;m<y;m++){const g=h[m],p=a[g.materialIndex],v=Math.max(g.start,f.start),w=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let _=v,M=w;_<M;_+=3){const b=_,T=_+1,E=_+2;s=Ga(this,p,e,n,c,d,u,b,T,E),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){const v=g,w=g+1,_=g+2;s=Ga(this,a,e,n,c,d,u,v,w,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function h0(i,e,t,n,s,r,a,o){let l;if(e.side===Pn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===es,o),l===null)return null;za.copy(o),za.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(za);return c<t.near||c>t.far?null:{distance:c,point:za.clone(),object:i}}function Ga(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Na),i.getVertexPosition(l,Fa),i.getVertexPosition(c,Ba);const d=h0(i,e,t,n,Na,Fa,Ba,qd);if(d){const u=new B;jn.getBarycoord(qd,Na,Fa,Ba,u),s&&(d.uv=jn.getInterpolatedAttribute(s,o,l,c,u,new tt)),r&&(d.uv1=jn.getInterpolatedAttribute(r,o,l,c,u,new tt)),a&&(d.normal=jn.getInterpolatedAttribute(a,o,l,c,u,new B),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new B,materialIndex:0};jn.getNormal(Na,Fa,Ba,h.normal),d.face=h,d.barycoord=u}return d}class Ie extends Dn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],u=[];let h=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ot(c,3)),this.setAttribute("normal",new Ot(d,3)),this.setAttribute("uv",new Ot(u,2));function m(y,g,p,v,w,_,M,b,T,E,S){const x=_/T,A=M/E,P=_/2,I=M/2,F=b/2,N=T+1,Y=E+1;let U=0,z=0;const $=new B;for(let D=0;D<Y;D++){const q=D*A-I;for(let Q=0;Q<N;Q++){const te=Q*x-P;$[y]=te*v,$[g]=q*w,$[p]=F,c.push($.x,$.y,$.z),$[y]=0,$[g]=0,$[p]=b>0?1:-1,d.push($.x,$.y,$.z),u.push(Q/T),u.push(1-D/E),U+=1}}for(let D=0;D<E;D++)for(let q=0;q<T;q++){const Q=h+q+N*D,te=h+q+N*(D+1),L=h+(q+1)+N*(D+1),j=h+(q+1)+N*D;l.push(Q,te,j),l.push(te,L,j),z+=6}o.addGroup(f,z,S),f+=z,h+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ie(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ar(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Sn(i){const e={};for(let t=0;t<i.length;t++){const n=Ar(i[t]);for(const s in n)e[s]=n[s]}return e}function f0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Qh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:bt.workingColorSpace}const p0={clone:Ar,merge:Sn};var m0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,g0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ts extends Lr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=m0,this.fragmentShader=g0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ar(e.uniforms),this.uniformsGroups=f0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ef extends cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt,this.coordinateSystem=Li}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Xi=new B,Yd=new tt,Kd=new tt;class ii extends ef{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=fa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(na*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fa*2*Math.atan(Math.tan(na*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z)}getViewSize(e,t){return this.getViewBounds(e,Yd,Kd),t.subVectors(Kd,Yd)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(na*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const $s=-90,Xs=1;class y0 extends cn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ii($s,Xs,e,t);s.layers=this.layers,this.add(s);const r=new ii($s,Xs,e,t);r.layers=this.layers,this.add(r);const a=new ii($s,Xs,e,t);a.layers=this.layers,this.add(a);const o=new ii($s,Xs,e,t);o.layers=this.layers,this.add(o);const l=new ii($s,Xs,e,t);l.layers=this.layers,this.add(l);const c=new ii($s,Xs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Li)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===_o)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(u,h,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class tf extends wn{constructor(e,t,n,s,r,a,o,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:br,super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class v0 extends Is{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new tf(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Zn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ie(5,5,5),r=new ts({name:"CubemapFromEquirect",uniforms:Ar(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pn,blending:Ji});r.uniforms.tEquirect.value=t;const a=new V(s,r),o=t.minFilter;return t.minFilter===Pi&&(t.minFilter=Zn),new y0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class nf extends cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vi,this.environmentIntensity=1,this.environmentRotation=new vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class _0{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=bc,this.updateRanges=[],this.version=0,this.uuid=Ui()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ui()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ui()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const bn=new B;class wo{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyMatrix4(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyNormalMatrix(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.transformDirection(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=si(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=si(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=si(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=si(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=si(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),s=Rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),s=Rt(s,this.array),r=Rt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new oi(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new wo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class jr extends Lr{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new xe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let qs;const Hr=new B,Ys=new B,Ks=new B,js=new tt,zr=new tt,sf=new Bt,Va=new B,Gr=new B,Wa=new B,jd=new tt,ul=new tt,Zd=new tt;class $a extends cn{constructor(e=new jr){if(super(),this.isSprite=!0,this.type="Sprite",qs===void 0){qs=new Dn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new _0(t,5);qs.setIndex([0,1,2,0,2,3]),qs.setAttribute("position",new wo(n,3,0,!1)),qs.setAttribute("uv",new wo(n,2,3,!1))}this.geometry=qs,this.material=e,this.center=new tt(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ys.setFromMatrixScale(this.matrixWorld),sf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ks.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ys.multiplyScalar(-Ks.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Xa(Va.set(-.5,-.5,0),Ks,a,Ys,s,r),Xa(Gr.set(.5,-.5,0),Ks,a,Ys,s,r),Xa(Wa.set(.5,.5,0),Ks,a,Ys,s,r),jd.set(0,0),ul.set(1,0),Zd.set(1,1);let o=e.ray.intersectTriangle(Va,Gr,Wa,!1,Hr);if(o===null&&(Xa(Gr.set(-.5,.5,0),Ks,a,Ys,s,r),ul.set(0,1),o=e.ray.intersectTriangle(Va,Wa,Gr,!1,Hr),o===null))return;const l=e.ray.origin.distanceTo(Hr);l<e.near||l>e.far||t.push({distance:l,point:Hr.clone(),uv:jn.getInterpolation(Hr,Va,Gr,Wa,jd,ul,Zd,new tt),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Xa(i,e,t,n,s,r){js.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(zr.x=r*js.x-s*js.y,zr.y=s*js.x+r*js.y):zr.copy(js),i.copy(e),i.x+=zr.x,i.y+=zr.y,i.applyMatrix4(sf)}const hl=new B,w0=new B,M0=new st;class ps{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=hl.subVectors(n,t).cross(w0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(hl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||M0.getNormalMatrix(e),s=this.coplanarPoint(hl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ls=new Zc,qa=new B;class Qc{constructor(e=new ps,t=new ps,n=new ps,s=new ps,r=new ps,a=new ps){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Li){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],d=s[5],u=s[6],h=s[7],f=s[8],m=s[9],y=s[10],g=s[11],p=s[12],v=s[13],w=s[14],_=s[15];if(n[0].setComponents(l-r,h-c,g-f,_-p).normalize(),n[1].setComponents(l+r,h+c,g+f,_+p).normalize(),n[2].setComponents(l+a,h+d,g+m,_+v).normalize(),n[3].setComponents(l-a,h-d,g-m,_-v).normalize(),n[4].setComponents(l-o,h-u,g-y,_-w).normalize(),t===Li)n[5].setComponents(l+o,h+u,g+y,_+w).normalize();else if(t===_o)n[5].setComponents(o,u,y,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ls.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ls.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ls)}intersectsSprite(e){return ls.center.set(0,0,0),ls.radius=.7071067811865476,ls.applyMatrix4(e.matrixWorld),this.intersectsSphere(ls)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(qa.x=s.normal.x>0?e.max.x:e.min.x,qa.y=s.normal.y>0?e.max.y:e.min.y,qa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(qa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ze extends cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Sc extends wn{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class rf extends wn{constructor(e,t,n,s,r,a,o,l,c,d=pr){if(d!==pr&&d!==Tr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===pr&&(n=Cs),n===void 0&&d===Tr&&(n=xr),super(null,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:ai,this.minFilter=l!==void 0?l:ai,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ri extends Dn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new B,d=new tt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,h=3;u<=t;u++,h+=3){const f=n+u/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(a[h]/e+1)/2,d.y=(a[h+1]/e+1)/2,l.push(d.x,d.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ot(a,3)),this.setAttribute("normal",new Ot(o,3)),this.setAttribute("uv",new Ot(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ri(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Lt extends Dn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],u=[],h=[],f=[];let m=0;const y=[],g=n/2;let p=0;v(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(d),this.setAttribute("position",new Ot(u,3)),this.setAttribute("normal",new Ot(h,3)),this.setAttribute("uv",new Ot(f,2));function v(){const _=new B,M=new B;let b=0;const T=(t-e)/n;for(let E=0;E<=r;E++){const S=[],x=E/r,A=x*(t-e)+e;for(let P=0;P<=s;P++){const I=P/s,F=I*l+o,N=Math.sin(F),Y=Math.cos(F);M.x=A*N,M.y=-x*n+g,M.z=A*Y,u.push(M.x,M.y,M.z),_.set(N,T,Y).normalize(),h.push(_.x,_.y,_.z),f.push(I,1-x),S.push(m++)}y.push(S)}for(let E=0;E<s;E++)for(let S=0;S<r;S++){const x=y[S][E],A=y[S+1][E],P=y[S+1][E+1],I=y[S][E+1];(e>0||S!==0)&&(d.push(x,A,I),b+=3),(t>0||S!==r-1)&&(d.push(A,P,I),b+=3)}c.addGroup(p,b,0),p+=b}function w(_){const M=m,b=new tt,T=new B;let E=0;const S=_===!0?e:t,x=_===!0?1:-1;for(let P=1;P<=s;P++)u.push(0,g*x,0),h.push(0,x,0),f.push(.5,.5),m++;const A=m;for(let P=0;P<=s;P++){const F=P/s*l+o,N=Math.cos(F),Y=Math.sin(F);T.x=S*Y,T.y=g*x,T.z=S*N,u.push(T.x,T.y,T.z),h.push(0,x,0),b.x=N*.5+.5,b.y=Y*.5*x+.5,f.push(b.x,b.y),m++}for(let P=0;P<s;P++){const I=M+P,F=A+P;_===!0?d.push(F,F+1,I):d.push(F+1,F,I),E+=3}c.addGroup(p,E,_===!0?1:2),p+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class tn extends Lt{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new tn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class No extends Dn{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),d(),this.setAttribute("position",new Ot(r,3)),this.setAttribute("normal",new Ot(r.slice(),3)),this.setAttribute("uv",new Ot(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const w=new B,_=new B,M=new B;for(let b=0;b<t.length;b+=3)f(t[b+0],w),f(t[b+1],_),f(t[b+2],M),l(w,_,M,v)}function l(v,w,_,M){const b=M+1,T=[];for(let E=0;E<=b;E++){T[E]=[];const S=v.clone().lerp(_,E/b),x=w.clone().lerp(_,E/b),A=b-E;for(let P=0;P<=A;P++)P===0&&E===b?T[E][P]=S:T[E][P]=S.clone().lerp(x,P/A)}for(let E=0;E<b;E++)for(let S=0;S<2*(b-E)-1;S++){const x=Math.floor(S/2);S%2===0?(h(T[E][x+1]),h(T[E+1][x]),h(T[E][x])):(h(T[E][x+1]),h(T[E+1][x+1]),h(T[E+1][x]))}}function c(v){const w=new B;for(let _=0;_<r.length;_+=3)w.x=r[_+0],w.y=r[_+1],w.z=r[_+2],w.normalize().multiplyScalar(v),r[_+0]=w.x,r[_+1]=w.y,r[_+2]=w.z}function d(){const v=new B;for(let w=0;w<r.length;w+=3){v.x=r[w+0],v.y=r[w+1],v.z=r[w+2];const _=g(v)/2/Math.PI+.5,M=p(v)/Math.PI+.5;a.push(_,1-M)}m(),u()}function u(){for(let v=0;v<a.length;v+=6){const w=a[v+0],_=a[v+2],M=a[v+4],b=Math.max(w,_,M),T=Math.min(w,_,M);b>.9&&T<.1&&(w<.2&&(a[v+0]+=1),_<.2&&(a[v+2]+=1),M<.2&&(a[v+4]+=1))}}function h(v){r.push(v.x,v.y,v.z)}function f(v,w){const _=v*3;w.x=e[_+0],w.y=e[_+1],w.z=e[_+2]}function m(){const v=new B,w=new B,_=new B,M=new B,b=new tt,T=new tt,E=new tt;for(let S=0,x=0;S<r.length;S+=9,x+=6){v.set(r[S+0],r[S+1],r[S+2]),w.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),b.set(a[x+0],a[x+1]),T.set(a[x+2],a[x+3]),E.set(a[x+4],a[x+5]),M.copy(v).add(w).add(_).divideScalar(3);const A=g(M);y(b,x+0,v,A),y(T,x+2,w,A),y(E,x+4,_,A)}}function y(v,w,_,M){M<0&&v.x===1&&(a[w]=v.x-1),_.x===0&&_.z===0&&(a[w]=M/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new No(e.vertices,e.indices,e.radius,e.details)}}class Hi extends No{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Hi(e.radius,e.detail)}}class Zt extends No{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Zt(e.radius,e.detail)}}class va extends Dn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,u=e/o,h=t/l,f=[],m=[],y=[],g=[];for(let p=0;p<d;p++){const v=p*h-a;for(let w=0;w<c;w++){const _=w*u-r;m.push(_,-v,0),y.push(0,0,1),g.push(w/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<o;v++){const w=v+c*p,_=v+c*(p+1),M=v+1+c*(p+1),b=v+1+c*p;f.push(w,_,b),f.push(_,M,b)}this.setIndex(f),this.setAttribute("position",new Ot(m,3)),this.setAttribute("normal",new Ot(y,3)),this.setAttribute("uv",new Ot(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new va(e.width,e.height,e.widthSegments,e.heightSegments)}}class xn extends Dn{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],d=[];let u=e;const h=(t-e)/s,f=new B,m=new tt;for(let y=0;y<=s;y++){for(let g=0;g<=n;g++){const p=r+g/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,d.push(m.x,m.y)}u+=h}for(let y=0;y<s;y++){const g=y*(n+1);for(let p=0;p<n;p++){const v=p+g,w=v,_=v+n+1,M=v+n+2,b=v+1;o.push(w,_,b),o.push(_,M,b)}}this.setIndex(o),this.setAttribute("position",new Ot(l,3)),this.setAttribute("normal",new Ot(c,3)),this.setAttribute("uv",new Ot(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xn(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ed extends Dn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],u=new B,h=new B,f=[],m=[],y=[],g=[];for(let p=0;p<=n;p++){const v=[],w=p/n;let _=0;p===0&&a===0?_=.5/t:p===n&&l===Math.PI&&(_=-.5/t);for(let M=0;M<=t;M++){const b=M/t;u.x=-e*Math.cos(s+b*r)*Math.sin(a+w*o),u.y=e*Math.cos(a+w*o),u.z=e*Math.sin(s+b*r)*Math.sin(a+w*o),m.push(u.x,u.y,u.z),h.copy(u).normalize(),y.push(h.x,h.y,h.z),g.push(b+_,1-w),v.push(c++)}d.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){const w=d[p][v+1],_=d[p][v],M=d[p+1][v],b=d[p+1][v+1];(p!==0||a>0)&&f.push(w,_,b),(p!==n-1||l<Math.PI)&&f.push(_,M,b)}this.setIndex(f),this.setAttribute("position",new Ot(m,3)),this.setAttribute("normal",new Ot(y,3)),this.setAttribute("uv",new Ot(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ed(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ns extends Dn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],d=new B,u=new B,h=new B;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const y=m/s*r,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(y),u.y=(e+t*Math.cos(g))*Math.sin(y),u.z=t*Math.sin(g),o.push(u.x,u.y,u.z),d.x=e*Math.cos(y),d.y=e*Math.sin(y),h.subVectors(u,d).normalize(),l.push(h.x,h.y,h.z),c.push(m/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const y=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,v=(s+1)*f+m;a.push(y,g,v),a.push(g,p,v)}this.setIndex(a),this.setAttribute("position",new Ot(o,3)),this.setAttribute("normal",new Ot(l,3)),this.setAttribute("uv",new Ot(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ns(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class pi extends Lr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wh,this.normalScale=new tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class b0 extends Lr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Mm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class S0 extends Lr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Jd={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class x0{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){const u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=c.length;u<h;u+=2){const f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(d))return m}return null}}}const T0=new x0;class td{constructor(e){this.manager=e!==void 0?e:T0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}td.DEFAULT_MATERIAL_NAME="__DEFAULT";class E0 extends td{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Jd.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=pa("img");function l(){d(),Jd.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){d(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class A0 extends td{constructor(e){super(e)}load(e,t,n,s){const r=new wn,a=new E0(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class af extends cn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class of extends af{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(cn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const fl=new Bt,Qd=new B,eu=new B;class R0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new tt(512,512),this.map=null,this.mapPass=null,this.matrix=new Bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qc,this._frameExtents=new tt(1,1),this._viewportCount=1,this._viewports=[new $t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Qd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Qd),eu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(eu),t.updateMatrixWorld(),fl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(fl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Fo extends ef{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class C0 extends R0{constructor(){super(new Fo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Mo extends af{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(cn.DEFAULT_UP),this.updateMatrix(),this.target=new cn,this.shadow=new C0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class I0 extends ii{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}const tu=new Bt;class P0{constructor(e,t,n=0,s=1/0){this.ray=new Kh(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Jc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return tu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(tu),this}intersectObject(e,t=!0,n=[]){return xc(e,this,n,t),n.sort(nu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)xc(e[s],this,n,t);return n.sort(nu),n}}function nu(i,e){return i.distance-e.distance}function xc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)xc(r[a],e,t,!0)}}function iu(i,e,t,n){const s=k0(n);switch(t){case Nh:return i*e;case Bh:return i*e;case Hh:return i*e*2;case zh:return i*e/s.components*s.byteLength;case qc:return i*e/s.components*s.byteLength;case Gh:return i*e*2/s.components*s.byteLength;case Yc:return i*e*2/s.components*s.byteLength;case Fh:return i*e*3/s.components*s.byteLength;case ri:return i*e*4/s.components*s.byteLength;case Kc:return i*e*4/s.components*s.byteLength;case ro:case ao:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case oo:case lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Zl:case Ql:return Math.max(i,16)*Math.max(e,8)/4;case jl:case Jl:return Math.max(i,8)*Math.max(e,8)/2;case ec:case tc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case nc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ic:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case rc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ac:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case oc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case lc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case cc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case dc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case uc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case hc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case fc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case pc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case mc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case gc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case co:case yc:case vc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Vh:case _c:return Math.ceil(i/4)*Math.ceil(e/4)*8;case wc:case Mc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function k0(i){switch(i){case Ni:case Dh:return{byteLength:1,components:1};case ha:case Uh:case ga:return{byteLength:2,components:1};case $c:case Xc:return{byteLength:2,components:4};case Cs:case Wc:case ki:return{byteLength:4,components:1};case Oh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gc);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function lf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function L0(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,d);else{u.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<u.length;f++){const m=u[h],y=u[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++h,u[h]=y)}u.length=h+1;for(let f=0,m=u.length;f<m;f++){const y=u[f];i.bufferSubData(c,y.start*d.BYTES_PER_ELEMENT,d,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var D0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,U0=`#ifdef USE_ALPHAHASH
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
#endif`,O0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,N0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,F0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,B0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,H0=`#ifdef USE_AOMAP
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
#endif`,z0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,G0=`#ifdef USE_BATCHING
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
#endif`,V0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,W0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,X0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,q0=`#ifdef USE_IRIDESCENCE
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
#endif`,Y0=`#ifdef USE_BUMPMAP
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
#endif`,K0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,j0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Z0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,J0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Q0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,eg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ng=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ig=`#define PI 3.141592653589793
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
} // validated`,sg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rg=`vec3 transformedNormal = objectNormal;
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
#endif`,ag=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,og=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dg="gl_FragColor = linearToOutputTexel( gl_FragColor );",ug=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hg=`#ifdef USE_ENVMAP
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
#endif`,fg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,pg=`#ifdef USE_ENVMAP
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
#endif`,mg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gg=`#ifdef USE_ENVMAP
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
#endif`,yg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_g=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mg=`#ifdef USE_GRADIENTMAP
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
}`,bg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tg=`uniform bool receiveShadow;
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
#endif`,Eg=`#ifdef USE_ENVMAP
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
#endif`,Ag=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ig=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pg=`PhysicalMaterial material;
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
#endif`,kg=`struct PhysicalMaterial {
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
}`,Lg=`
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
#endif`,Dg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ug=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Og=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ng=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Vg=`#if defined( USE_POINTS_UV )
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
#endif`,Wg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$g=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kg=`#ifdef USE_MORPHTARGETS
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
#endif`,jg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ey=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ty=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ny=`#ifdef USE_NORMALMAP
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
#endif`,iy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ry=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ay=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,oy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ly=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,uy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,py=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,my=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vy=`float getShadowMask() {
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
}`,_y=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wy=`#ifdef USE_SKINNING
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
#endif`,My=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,by=`#ifdef USE_SKINNING
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
#endif`,Sy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ty=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ey=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ay=`#ifdef USE_TRANSMISSION
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
#endif`,Ry=`#ifdef USE_TRANSMISSION
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
#endif`,Cy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Iy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Py=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ky=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ly=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Dy=`uniform sampler2D t2D;
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
}`,Uy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Oy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ny=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,By=`#include <common>
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
}`,Hy=`#if DEPTH_PACKING == 3200
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
}`,zy=`#define DISTANCE
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
}`,Gy=`#define DISTANCE
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
}`,Vy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$y=`uniform float scale;
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
}`,Xy=`uniform vec3 diffuse;
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
}`,qy=`#include <common>
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
}`,Yy=`uniform vec3 diffuse;
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
}`,Ky=`#define LAMBERT
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
}`,jy=`#define LAMBERT
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
}`,Zy=`#define MATCAP
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
}`,Jy=`#define MATCAP
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
}`,Qy=`#define NORMAL
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
}`,at={alphahash_fragment:D0,alphahash_pars_fragment:U0,alphamap_fragment:O0,alphamap_pars_fragment:N0,alphatest_fragment:F0,alphatest_pars_fragment:B0,aomap_fragment:H0,aomap_pars_fragment:z0,batching_pars_vertex:G0,batching_vertex:V0,begin_vertex:W0,beginnormal_vertex:$0,bsdfs:X0,iridescence_fragment:q0,bumpmap_pars_fragment:Y0,clipping_planes_fragment:K0,clipping_planes_pars_fragment:j0,clipping_planes_pars_vertex:Z0,clipping_planes_vertex:J0,color_fragment:Q0,color_pars_fragment:eg,color_pars_vertex:tg,color_vertex:ng,common:ig,cube_uv_reflection_fragment:sg,defaultnormal_vertex:rg,displacementmap_pars_vertex:ag,displacementmap_vertex:og,emissivemap_fragment:lg,emissivemap_pars_fragment:cg,colorspace_fragment:dg,colorspace_pars_fragment:ug,envmap_fragment:hg,envmap_common_pars_fragment:fg,envmap_pars_fragment:pg,envmap_pars_vertex:mg,envmap_physical_pars_fragment:Eg,envmap_vertex:gg,fog_vertex:yg,fog_pars_vertex:vg,fog_fragment:_g,fog_pars_fragment:wg,gradientmap_pars_fragment:Mg,lightmap_pars_fragment:bg,lights_lambert_fragment:Sg,lights_lambert_pars_fragment:xg,lights_pars_begin:Tg,lights_toon_fragment:Ag,lights_toon_pars_fragment:Rg,lights_phong_fragment:Cg,lights_phong_pars_fragment:Ig,lights_physical_fragment:Pg,lights_physical_pars_fragment:kg,lights_fragment_begin:Lg,lights_fragment_maps:Dg,lights_fragment_end:Ug,logdepthbuf_fragment:Og,logdepthbuf_pars_fragment:Ng,logdepthbuf_pars_vertex:Fg,logdepthbuf_vertex:Bg,map_fragment:Hg,map_pars_fragment:zg,map_particle_fragment:Gg,map_particle_pars_fragment:Vg,metalnessmap_fragment:Wg,metalnessmap_pars_fragment:$g,morphinstance_vertex:Xg,morphcolor_vertex:qg,morphnormal_vertex:Yg,morphtarget_pars_vertex:Kg,morphtarget_vertex:jg,normal_fragment_begin:Zg,normal_fragment_maps:Jg,normal_pars_fragment:Qg,normal_pars_vertex:ey,normal_vertex:ty,normalmap_pars_fragment:ny,clearcoat_normal_fragment_begin:iy,clearcoat_normal_fragment_maps:sy,clearcoat_pars_fragment:ry,iridescence_pars_fragment:ay,opaque_fragment:oy,packing:ly,premultiplied_alpha_fragment:cy,project_vertex:dy,dithering_fragment:uy,dithering_pars_fragment:hy,roughnessmap_fragment:fy,roughnessmap_pars_fragment:py,shadowmap_pars_fragment:my,shadowmap_pars_vertex:gy,shadowmap_vertex:yy,shadowmask_pars_fragment:vy,skinbase_vertex:_y,skinning_pars_vertex:wy,skinning_vertex:My,skinnormal_vertex:by,specularmap_fragment:Sy,specularmap_pars_fragment:xy,tonemapping_fragment:Ty,tonemapping_pars_fragment:Ey,transmission_fragment:Ay,transmission_pars_fragment:Ry,uv_pars_fragment:Cy,uv_pars_vertex:Iy,uv_vertex:Py,worldpos_vertex:ky,background_vert:Ly,background_frag:Dy,backgroundCube_vert:Uy,backgroundCube_frag:Oy,cube_vert:Ny,cube_frag:Fy,depth_vert:By,depth_frag:Hy,distanceRGBA_vert:zy,distanceRGBA_frag:Gy,equirect_vert:Vy,equirect_frag:Wy,linedashed_vert:$y,linedashed_frag:Xy,meshbasic_vert:qy,meshbasic_frag:Yy,meshlambert_vert:Ky,meshlambert_frag:jy,meshmatcap_vert:Zy,meshmatcap_frag:Jy,meshnormal_vert:Qy,meshnormal_frag:ev,meshphong_vert:tv,meshphong_frag:nv,meshphysical_vert:iv,meshphysical_frag:sv,meshtoon_vert:rv,meshtoon_frag:av,points_vert:ov,points_frag:lv,shadow_vert:cv,shadow_frag:dv,sprite_vert:uv,sprite_frag:hv},we={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},hi={basic:{uniforms:Sn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:Sn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new xe(0)}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:Sn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:Sn([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:Sn([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new xe(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:Sn([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:Sn([we.points,we.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:Sn([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:Sn([we.common,we.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:Sn([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:Sn([we.sprite,we.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distanceRGBA:{uniforms:Sn([we.common,we.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distanceRGBA_vert,fragmentShader:at.distanceRGBA_frag},shadow:{uniforms:Sn([we.lights,we.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};hi.physical={uniforms:Sn([hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};const Ya={r:0,b:0,g:0},cs=new vi,fv=new Bt;function pv(i,e,t,n,s,r,a){const o=new xe(0);let l=r===!0?0:1,c,d,u=null,h=0,f=null;function m(w){let _=w.isScene===!0?w.background:null;return _&&_.isTexture&&(_=(w.backgroundBlurriness>0?t:e).get(_)),_}function y(w){let _=!1;const M=m(w);M===null?p(o,l):M&&M.isColor&&(p(M,1),_=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(w,_){const M=m(_);M&&(M.isCubeTexture||M.mapping===Oo)?(d===void 0&&(d=new V(new Ie(1,1,1),new ts({name:"BackgroundCubeMaterial",uniforms:Ar(hi.backgroundCube.uniforms),vertexShader:hi.backgroundCube.vertexShader,fragmentShader:hi.backgroundCube.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(b,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),cs.copy(_.backgroundRotation),cs.x*=-1,cs.y*=-1,cs.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(cs.y*=-1,cs.z*=-1),d.material.uniforms.envMap.value=M,d.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(fv.makeRotationFromEuler(cs)),d.material.toneMapped=bt.getTransfer(M.colorSpace)!==Pt,(u!==M||h!==M.version||f!==i.toneMapping)&&(d.material.needsUpdate=!0,u=M,h=M.version,f=i.toneMapping),d.layers.enableAll(),w.unshift(d,d.geometry,d.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new V(new va(2,2),new ts({name:"BackgroundMaterial",uniforms:Ar(hi.background.uniforms),vertexShader:hi.background.vertexShader,fragmentShader:hi.background.fragmentShader,side:es,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=bt.getTransfer(M.colorSpace)!==Pt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||h!==M.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=M,h=M.version,f=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function p(w,_){w.getRGB(Ya,Qh(i)),n.buffers.color.setClear(Ya.r,Ya.g,Ya.b,_,a)}function v(){d!==void 0&&(d.geometry.dispose(),d.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(w,_=1){o.set(w),l=_,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,p(o,l)},render:y,addToRenderList:g,dispose:v}}function mv(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(x,A,P,I,F){let N=!1;const Y=u(I,P,A);r!==Y&&(r=Y,c(r.object)),N=f(x,I,P,F),N&&m(x,I,P,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),(N||a)&&(a=!1,_(x,A,P,I),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function d(x){return i.deleteVertexArray(x)}function u(x,A,P){const I=P.wireframe===!0;let F=n[x.id];F===void 0&&(F={},n[x.id]=F);let N=F[A.id];N===void 0&&(N={},F[A.id]=N);let Y=N[I];return Y===void 0&&(Y=h(l()),N[I]=Y),Y}function h(x){const A=[],P=[],I=[];for(let F=0;F<t;F++)A[F]=0,P[F]=0,I[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:P,attributeDivisors:I,object:x,attributes:{},index:null}}function f(x,A,P,I){const F=r.attributes,N=A.attributes;let Y=0;const U=P.getAttributes();for(const z in U)if(U[z].location>=0){const D=F[z];let q=N[z];if(q===void 0&&(z==="instanceMatrix"&&x.instanceMatrix&&(q=x.instanceMatrix),z==="instanceColor"&&x.instanceColor&&(q=x.instanceColor)),D===void 0||D.attribute!==q||q&&D.data!==q.data)return!0;Y++}return r.attributesNum!==Y||r.index!==I}function m(x,A,P,I){const F={},N=A.attributes;let Y=0;const U=P.getAttributes();for(const z in U)if(U[z].location>=0){let D=N[z];D===void 0&&(z==="instanceMatrix"&&x.instanceMatrix&&(D=x.instanceMatrix),z==="instanceColor"&&x.instanceColor&&(D=x.instanceColor));const q={};q.attribute=D,D&&D.data&&(q.data=D.data),F[z]=q,Y++}r.attributes=F,r.attributesNum=Y,r.index=I}function y(){const x=r.newAttributes;for(let A=0,P=x.length;A<P;A++)x[A]=0}function g(x){p(x,0)}function p(x,A){const P=r.newAttributes,I=r.enabledAttributes,F=r.attributeDivisors;P[x]=1,I[x]===0&&(i.enableVertexAttribArray(x),I[x]=1),F[x]!==A&&(i.vertexAttribDivisor(x,A),F[x]=A)}function v(){const x=r.newAttributes,A=r.enabledAttributes;for(let P=0,I=A.length;P<I;P++)A[P]!==x[P]&&(i.disableVertexAttribArray(P),A[P]=0)}function w(x,A,P,I,F,N,Y){Y===!0?i.vertexAttribIPointer(x,A,P,F,N):i.vertexAttribPointer(x,A,P,I,F,N)}function _(x,A,P,I){y();const F=I.attributes,N=P.getAttributes(),Y=A.defaultAttributeValues;for(const U in N){const z=N[U];if(z.location>=0){let $=F[U];if($===void 0&&(U==="instanceMatrix"&&x.instanceMatrix&&($=x.instanceMatrix),U==="instanceColor"&&x.instanceColor&&($=x.instanceColor)),$!==void 0){const D=$.normalized,q=$.itemSize,Q=e.get($);if(Q===void 0)continue;const te=Q.buffer,L=Q.type,j=Q.bytesPerElement,ce=L===i.INT||L===i.UNSIGNED_INT||$.gpuType===Wc;if($.isInterleavedBufferAttribute){const ae=$.data,ye=ae.stride,he=$.offset;if(ae.isInstancedInterleavedBuffer){for(let pe=0;pe<z.locationSize;pe++)p(z.location+pe,ae.meshPerAttribute);x.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let pe=0;pe<z.locationSize;pe++)g(z.location+pe);i.bindBuffer(i.ARRAY_BUFFER,te);for(let pe=0;pe<z.locationSize;pe++)w(z.location+pe,q/z.locationSize,L,D,ye*j,(he+q/z.locationSize*pe)*j,ce)}else{if($.isInstancedBufferAttribute){for(let ae=0;ae<z.locationSize;ae++)p(z.location+ae,$.meshPerAttribute);x.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ae=0;ae<z.locationSize;ae++)g(z.location+ae);i.bindBuffer(i.ARRAY_BUFFER,te);for(let ae=0;ae<z.locationSize;ae++)w(z.location+ae,q/z.locationSize,L,D,q*j,q/z.locationSize*ae*j,ce)}}else if(Y!==void 0){const D=Y[U];if(D!==void 0)switch(D.length){case 2:i.vertexAttrib2fv(z.location,D);break;case 3:i.vertexAttrib3fv(z.location,D);break;case 4:i.vertexAttrib4fv(z.location,D);break;default:i.vertexAttrib1fv(z.location,D)}}}}v()}function M(){E();for(const x in n){const A=n[x];for(const P in A){const I=A[P];for(const F in I)d(I[F].object),delete I[F];delete A[P]}delete n[x]}}function b(x){if(n[x.id]===void 0)return;const A=n[x.id];for(const P in A){const I=A[P];for(const F in I)d(I[F].object),delete I[F];delete A[P]}delete n[x.id]}function T(x){for(const A in n){const P=n[A];if(P[x.id]===void 0)continue;const I=P[x.id];for(const F in I)d(I[F].object),delete I[F];delete P[x.id]}}function E(){S(),a=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:S,dispose:M,releaseStatesOfGeometry:b,releaseStatesOfProgram:T,initAttributes:y,enableAttribute:g,disableUnusedAttributes:v}}function gv(i,e,t){let n;function s(c){n=c}function r(c,d){i.drawArrays(n,c,d),t.update(d,n,1)}function a(c,d,u){u!==0&&(i.drawArraysInstanced(n,c,d,u),t.update(d,n,u))}function o(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,u);let f=0;for(let m=0;m<u;m++)f+=d[m];t.update(f,n,1)}function l(c,d,u,h){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],d[m],h[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,d,0,h,0,u);let m=0;for(let y=0;y<u;y++)m+=d[y]*h[y];t.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function yv(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(T){return!(T!==ri&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const E=T===ga&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Ni&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==ki&&!E)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=m>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:w,maxFragmentUniforms:_,vertexTextures:M,maxSamples:b}}function vv(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new ps,o=new st,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const f=u.length!==0||h||n!==0||s;return s=h,n=u.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,f){const m=u.clippingPlanes,y=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?d(null):c();else{const v=r?0:n,w=v*4;let _=p.clippingState||null;l.value=_,_=d(m,h,w,f);for(let M=0;M!==w;++M)_[M]=t[M];p.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,h,f,m){const y=u!==null?u.length:0;let g=null;if(y!==0){if(g=l.value,m!==!0||g===null){const p=f+y*4,v=h.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let w=0,_=f;w!==y;++w,_+=4)a.copy(u[w]).applyMatrix4(v,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}function _v(i){let e=new WeakMap;function t(a,o){return o===ql?a.mapping=br:o===Yl&&(a.mapping=Sr),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ql||o===Yl)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new v0(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const or=4,su=[.125,.215,.35,.446,.526,.582],_s=20,pl=new Fo,ru=new xe;let ml=null,gl=0,yl=0,vl=!1;const ms=(1+Math.sqrt(5))/2,Zs=1/ms,au=[new B(-ms,Zs,0),new B(ms,Zs,0),new B(-Zs,0,ms),new B(Zs,0,ms),new B(0,ms,-Zs),new B(0,ms,Zs),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)];class ou{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){ml=this._renderer.getRenderTarget(),gl=this._renderer.getActiveCubeFace(),yl=this._renderer.getActiveMipmapLevel(),vl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=du(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ml,gl,yl),this._renderer.xr.enabled=vl,e.scissorTest=!1,Ka(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===br||e.mapping===Sr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ml=this._renderer.getRenderTarget(),gl=this._renderer.getActiveCubeFace(),yl=this._renderer.getActiveMipmapLevel(),vl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Zn,minFilter:Zn,generateMipmaps:!1,type:ga,format:ri,colorSpace:Er,depthBuffer:!1},s=lu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lu(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wv(r)),this._blurMaterial=Mv(r,e,t)}return s}_compileMaterial(e){const t=new V(this._lodPlanes[0],e);this._renderer.compile(t,pl)}_sceneToCubeUV(e,t,n,s){const o=new ii(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(ru),d.toneMapping=Qi,d.autoClear=!1;const f=new lt({name:"PMREM.Background",side:Pn,depthWrite:!1,depthTest:!1}),m=new V(new Ie,f);let y=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,y=!0):(f.color.copy(ru),y=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):v===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const w=this._cubeSize;Ka(s,v*w,p>2?w:0,w,w),d.setRenderTarget(s),y&&d.render(m,o),d.render(e,o)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=h,d.autoClear=u,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===br||e.mapping===Sr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=du()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cu());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new V(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ka(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,pl)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=au[(s-r-1)%au.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new V(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*_s-1),y=r/m,g=isFinite(r)?1+Math.floor(d*y):_s;g>_s&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${_s}`);const p=[];let v=0;for(let T=0;T<_s;++T){const E=T/y,S=Math.exp(-E*E/2);p.push(S),T===0?v+=S:T<g&&(v+=2*S)}for(let T=0;T<p.length;T++)p[T]=p[T]/v;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:w}=this;h.dTheta.value=m,h.mipInt.value=w-n;const _=this._sizeLods[s],M=3*_*(s>w-or?s-w+or:0),b=4*(this._cubeSize-_);Ka(t,M,b,3*_,2*_),l.setRenderTarget(t),l.render(u,pl)}}function wv(i){const e=[],t=[],n=[];let s=i;const r=i-or+1+su.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-or?l=su[a-i+or-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],f=6,m=6,y=3,g=2,p=1,v=new Float32Array(y*m*f),w=new Float32Array(g*m*f),_=new Float32Array(p*m*f);for(let b=0;b<f;b++){const T=b%3*2/3-1,E=b>2?0:-1,S=[T,E,0,T+2/3,E,0,T+2/3,E+1,0,T,E,0,T+2/3,E+1,0,T,E+1,0];v.set(S,y*m*b),w.set(h,g*m*b);const x=[b,b,b,b,b,b];_.set(x,p*m*b)}const M=new Dn;M.setAttribute("position",new oi(v,y)),M.setAttribute("uv",new oi(w,g)),M.setAttribute("faceIndex",new oi(_,p)),e.push(M),s>or&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function lu(i,e,t){const n=new Is(i,e,t);return n.texture.mapping=Oo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ka(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Mv(i,e,t){const n=new Float32Array(_s),s=new B(0,1,0);return new ts({name:"SphericalGaussianBlur",defines:{n:_s,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:nd(),fragmentShader:`

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
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function cu(){return new ts({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nd(),fragmentShader:`

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
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function du(){return new ts({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function nd(){return`

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
	`}function bv(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ql||l===Yl,d=l===br||l===Sr;if(c||d){let u=e.get(o);const h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new ou(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||d&&f&&s(f)?(t===null&&(t=new ou(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Sv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&sr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function xv(i,e,t,n){const s={},r=new WeakMap;function a(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const m in h.attributes)e.remove(h.attributes[m]);h.removeEventListener("dispose",a),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(u){const h=u.attributes;for(const f in h)e.update(h[f],i.ARRAY_BUFFER)}function c(u){const h=[],f=u.index,m=u.attributes.position;let y=0;if(f!==null){const v=f.array;y=f.version;for(let w=0,_=v.length;w<_;w+=3){const M=v[w+0],b=v[w+1],T=v[w+2];h.push(M,b,b,T,T,M)}}else if(m!==void 0){const v=m.array;y=m.version;for(let w=0,_=v.length/3-1;w<_;w+=3){const M=w+0,b=w+1,T=w+2;h.push(M,b,b,T,T,M)}}else return;const g=new(Xh(h)?Jh:Zh)(h,1);g.version=y;const p=r.get(u);p&&e.remove(p),r.set(u,g)}function d(u){const h=r.get(u);if(h){const f=u.index;f!==null&&h.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function Tv(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,f){i.drawElements(n,f,r,h*a),t.update(f,n,1)}function c(h,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,h*a,m),t.update(f,n,m))}function d(h,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function u(h,f,m,y){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<h.length;p++)c(h[p]/a,f[p],y[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,h,0,y,0,m);let p=0;for(let v=0;v<m;v++)p+=f[v]*y[v];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function Ev(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Av(i,e,t){const n=new WeakMap,s=new $t;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=n.get(o);if(h===void 0||h.count!==u){let x=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",x)};var f=x;h!==void 0&&h.texture.dispose();const m=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let _=0;m===!0&&(_=1),y===!0&&(_=2),g===!0&&(_=3);let M=o.attributes.position.count*_,b=1;M>e.maxTextureSize&&(b=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const T=new Float32Array(M*b*4*u),E=new Yh(T,M,b,u);E.type=ki,E.needsUpdate=!0;const S=_*4;for(let A=0;A<u;A++){const P=p[A],I=v[A],F=w[A],N=M*b*4*A;for(let Y=0;Y<P.count;Y++){const U=Y*S;m===!0&&(s.fromBufferAttribute(P,Y),T[N+U+0]=s.x,T[N+U+1]=s.y,T[N+U+2]=s.z,T[N+U+3]=0),y===!0&&(s.fromBufferAttribute(I,Y),T[N+U+4]=s.x,T[N+U+5]=s.y,T[N+U+6]=s.z,T[N+U+7]=0),g===!0&&(s.fromBufferAttribute(F,Y),T[N+U+8]=s.x,T[N+U+9]=s.y,T[N+U+10]=s.z,T[N+U+11]=F.itemSize===4?s.w:1)}}h={count:u,texture:E,size:new tt(M,b)},n.set(o,h),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const y=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",y),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Rv(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const cf=new wn,uu=new rf(1,1),df=new Yh,uf=new n0,hf=new tf,hu=[],fu=[],pu=new Float32Array(16),mu=new Float32Array(9),gu=new Float32Array(4);function Dr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=hu[s];if(r===void 0&&(r=new Float32Array(s),hu[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function nn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function sn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Bo(i,e){let t=fu[e];t===void 0&&(t=new Int32Array(e),fu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Cv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Iv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;i.uniform2fv(this.addr,e),sn(t,e)}}function Pv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(nn(t,e))return;i.uniform3fv(this.addr,e),sn(t,e)}}function kv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;i.uniform4fv(this.addr,e),sn(t,e)}}function Lv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;gu.set(n),i.uniformMatrix2fv(this.addr,!1,gu),sn(t,n)}}function Dv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;mu.set(n),i.uniformMatrix3fv(this.addr,!1,mu),sn(t,n)}}function Uv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;pu.set(n),i.uniformMatrix4fv(this.addr,!1,pu),sn(t,n)}}function Ov(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Nv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;i.uniform2iv(this.addr,e),sn(t,e)}}function Fv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;i.uniform3iv(this.addr,e),sn(t,e)}}function Bv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;i.uniform4iv(this.addr,e),sn(t,e)}}function Hv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function zv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;i.uniform2uiv(this.addr,e),sn(t,e)}}function Gv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;i.uniform3uiv(this.addr,e),sn(t,e)}}function Vv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;i.uniform4uiv(this.addr,e),sn(t,e)}}function Wv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(uu.compareFunction=$h,r=uu):r=cf,t.setTexture2D(e||r,s)}function $v(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||uf,s)}function Xv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||hf,s)}function qv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||df,s)}function Yv(i){switch(i){case 5126:return Cv;case 35664:return Iv;case 35665:return Pv;case 35666:return kv;case 35674:return Lv;case 35675:return Dv;case 35676:return Uv;case 5124:case 35670:return Ov;case 35667:case 35671:return Nv;case 35668:case 35672:return Fv;case 35669:case 35673:return Bv;case 5125:return Hv;case 36294:return zv;case 36295:return Gv;case 36296:return Vv;case 35678:case 36198:case 36298:case 36306:case 35682:return Wv;case 35679:case 36299:case 36307:return $v;case 35680:case 36300:case 36308:case 36293:return Xv;case 36289:case 36303:case 36311:case 36292:return qv}}function Kv(i,e){i.uniform1fv(this.addr,e)}function jv(i,e){const t=Dr(e,this.size,2);i.uniform2fv(this.addr,t)}function Zv(i,e){const t=Dr(e,this.size,3);i.uniform3fv(this.addr,t)}function Jv(i,e){const t=Dr(e,this.size,4);i.uniform4fv(this.addr,t)}function Qv(i,e){const t=Dr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function e_(i,e){const t=Dr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function t_(i,e){const t=Dr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function n_(i,e){i.uniform1iv(this.addr,e)}function i_(i,e){i.uniform2iv(this.addr,e)}function s_(i,e){i.uniform3iv(this.addr,e)}function r_(i,e){i.uniform4iv(this.addr,e)}function a_(i,e){i.uniform1uiv(this.addr,e)}function o_(i,e){i.uniform2uiv(this.addr,e)}function l_(i,e){i.uniform3uiv(this.addr,e)}function c_(i,e){i.uniform4uiv(this.addr,e)}function d_(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||cf,r[a])}function u_(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||uf,r[a])}function h_(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||hf,r[a])}function f_(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||df,r[a])}function p_(i){switch(i){case 5126:return Kv;case 35664:return jv;case 35665:return Zv;case 35666:return Jv;case 35674:return Qv;case 35675:return e_;case 35676:return t_;case 5124:case 35670:return n_;case 35667:case 35671:return i_;case 35668:case 35672:return s_;case 35669:case 35673:return r_;case 5125:return a_;case 36294:return o_;case 36295:return l_;case 36296:return c_;case 35678:case 36198:case 36298:case 36306:case 35682:return d_;case 35679:case 36299:case 36307:return u_;case 35680:case 36300:case 36308:case 36293:return h_;case 36289:case 36303:case 36311:case 36292:return f_}}class m_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Yv(t.type)}}class g_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=p_(t.type)}}class y_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const _l=/(\w+)(\])?(\[|\.)?/g;function yu(i,e){i.seq.push(e),i.map[e.id]=e}function v_(i,e,t){const n=i.name,s=n.length;for(_l.lastIndex=0;;){const r=_l.exec(n),a=_l.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){yu(t,c===void 0?new m_(o,i,e):new g_(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new y_(o),yu(t,u)),t=u}}}class uo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);v_(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function vu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const __=37297;let w_=0;function M_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const _u=new st;function b_(i){bt._getMatrix(_u,bt.workingColorSpace,i);const e=`mat3( ${_u.elements.map(t=>t.toFixed(4))} )`;switch(bt.getTransfer(i)){case vo:return[e,"LinearTransferOETF"];case Pt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function wu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+M_(i.getShaderSource(e),a)}else return s}function S_(i,e){const t=b_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function x_(i,e){let t;switch(e){case pm:t="Linear";break;case mm:t="Reinhard";break;case gm:t="Cineon";break;case ym:t="ACESFilmic";break;case _m:t="AgX";break;case Vc:t="Neutral";break;case vm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ja=new B;function T_(){bt.getLuminanceCoefficients(ja);const i=ja.x.toFixed(4),e=ja.y.toFixed(4),t=ja.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function E_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zr).join(`
`)}function A_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function R_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Zr(i){return i!==""}function Mu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const C_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tc(i){return i.replace(C_,P_)}const I_=new Map;function P_(i,e){let t=at[e];if(t===void 0){const n=I_.get(e);if(n!==void 0)t=at[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Tc(t)}const k_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Su(i){return i.replace(k_,L_)}function L_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function xu(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function D_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ih?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ph?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ei&&(e="SHADOWMAP_TYPE_VSM"),e}function U_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case br:case Sr:e="ENVMAP_TYPE_CUBE";break;case Oo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function O_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Sr:e="ENVMAP_MODE_REFRACTION";break}return e}function N_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case kh:e="ENVMAP_BLENDING_MULTIPLY";break;case hm:e="ENVMAP_BLENDING_MIX";break;case fm:e="ENVMAP_BLENDING_ADD";break}return e}function F_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function B_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=D_(t),c=U_(t),d=O_(t),u=N_(t),h=F_(t),f=E_(t),m=A_(r),y=s.createProgram();let g,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Zr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Zr).join(`
`),p.length>0&&(p+=`
`)):(g=[xu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zr).join(`
`),p=[xu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Qi?"#define TONE_MAPPING":"",t.toneMapping!==Qi?at.tonemapping_pars_fragment:"",t.toneMapping!==Qi?x_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,S_("linearToOutputTexel",t.outputColorSpace),T_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zr).join(`
`)),a=Tc(a),a=Mu(a,t),a=bu(a,t),o=Tc(o),o=Mu(o,t),o=bu(o,t),a=Su(a),o=Su(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Pd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Pd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=v+g+a,_=v+p+o,M=vu(s,s.VERTEX_SHADER,w),b=vu(s,s.FRAGMENT_SHADER,_);s.attachShader(y,M),s.attachShader(y,b),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function T(A){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(y).trim(),I=s.getShaderInfoLog(M).trim(),F=s.getShaderInfoLog(b).trim();let N=!0,Y=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(N=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,M,b);else{const U=wu(s,M,"vertex"),z=wu(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+P+`
`+U+`
`+z)}else P!==""?console.warn("THREE.WebGLProgram: Program Info Log:",P):(I===""||F==="")&&(Y=!1);Y&&(A.diagnostics={runnable:N,programLog:P,vertexShader:{log:I,prefix:g},fragmentShader:{log:F,prefix:p}})}s.deleteShader(M),s.deleteShader(b),E=new uo(s,y),S=R_(s,y)}let E;this.getUniforms=function(){return E===void 0&&T(this),E};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(y,__)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=w_++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=M,this.fragmentShader=b,this}let H_=0;class z_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new G_(e),t.set(e,n)),n}}class G_{constructor(e){this.id=H_++,this.code=e,this.usedTimes=0}}function V_(i,e,t,n,s,r,a){const o=new Jc,l=new z_,c=new Set,d=[],u=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,x,A,P,I){const F=P.fog,N=I.geometry,Y=S.isMeshStandardMaterial?P.environment:null,U=(S.isMeshStandardMaterial?t:e).get(S.envMap||Y),z=U&&U.mapping===Oo?U.image.height:null,$=m[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const D=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,q=D!==void 0?D.length:0;let Q=0;N.morphAttributes.position!==void 0&&(Q=1),N.morphAttributes.normal!==void 0&&(Q=2),N.morphAttributes.color!==void 0&&(Q=3);let te,L,j,ce;if($){const At=hi[$];te=At.vertexShader,L=At.fragmentShader}else te=S.vertexShader,L=S.fragmentShader,l.update(S),j=l.getVertexShaderID(S),ce=l.getFragmentShaderID(S);const ae=i.getRenderTarget(),ye=i.state.buffers.depth.getReversed(),he=I.isInstancedMesh===!0,pe=I.isBatchedMesh===!0,Ne=!!S.map,Xe=!!S.matcap,nt=!!U,O=!!S.aoMap,dn=!!S.lightMap,de=!!S.bumpMap,Ke=!!S.normalMap,Te=!!S.displacementMap,St=!!S.emissiveMap,Ge=!!S.metalnessMap,k=!!S.roughnessMap,R=S.anisotropy>0,K=S.clearcoat>0,re=S.dispersion>0,le=S.iridescence>0,ne=S.sheen>0,Be=S.transmission>0,me=R&&!!S.anisotropyMap,Me=K&&!!S.clearcoatMap,ot=K&&!!S.clearcoatNormalMap,ve=K&&!!S.clearcoatRoughnessMap,ke=le&&!!S.iridescenceMap,qe=le&&!!S.iridescenceThicknessMap,$e=ne&&!!S.sheenColorMap,Ce=ne&&!!S.sheenRoughnessMap,gt=!!S.specularMap,rt=!!S.specularColorMap,Dt=!!S.specularIntensityMap,G=Be&&!!S.transmissionMap,be=Be&&!!S.thicknessMap,ee=!!S.gradientMap,oe=!!S.alphaMap,Ae=S.alphaTest>0,Ee=!!S.alphaHash,it=!!S.extensions;let zt=Qi;S.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(zt=i.toneMapping);const pn={shaderID:$,shaderType:S.type,shaderName:S.name,vertexShader:te,fragmentShader:L,defines:S.defines,customVertexShaderID:j,customFragmentShaderID:ce,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:pe,batchingColor:pe&&I._colorsTexture!==null,instancing:he,instancingColor:he&&I.instanceColor!==null,instancingMorph:he&&I.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Er,alphaToCoverage:!!S.alphaToCoverage,map:Ne,matcap:Xe,envMap:nt,envMapMode:nt&&U.mapping,envMapCubeUVHeight:z,aoMap:O,lightMap:dn,bumpMap:de,normalMap:Ke,displacementMap:h&&Te,emissiveMap:St,normalMapObjectSpace:Ke&&S.normalMapType===Sm,normalMapTangentSpace:Ke&&S.normalMapType===Wh,metalnessMap:Ge,roughnessMap:k,anisotropy:R,anisotropyMap:me,clearcoat:K,clearcoatMap:Me,clearcoatNormalMap:ot,clearcoatRoughnessMap:ve,dispersion:re,iridescence:le,iridescenceMap:ke,iridescenceThicknessMap:qe,sheen:ne,sheenColorMap:$e,sheenRoughnessMap:Ce,specularMap:gt,specularColorMap:rt,specularIntensityMap:Dt,transmission:Be,transmissionMap:G,thicknessMap:be,gradientMap:ee,opaque:S.transparent===!1&&S.blending===fr&&S.alphaToCoverage===!1,alphaMap:oe,alphaTest:Ae,alphaHash:Ee,combine:S.combine,mapUv:Ne&&y(S.map.channel),aoMapUv:O&&y(S.aoMap.channel),lightMapUv:dn&&y(S.lightMap.channel),bumpMapUv:de&&y(S.bumpMap.channel),normalMapUv:Ke&&y(S.normalMap.channel),displacementMapUv:Te&&y(S.displacementMap.channel),emissiveMapUv:St&&y(S.emissiveMap.channel),metalnessMapUv:Ge&&y(S.metalnessMap.channel),roughnessMapUv:k&&y(S.roughnessMap.channel),anisotropyMapUv:me&&y(S.anisotropyMap.channel),clearcoatMapUv:Me&&y(S.clearcoatMap.channel),clearcoatNormalMapUv:ot&&y(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&y(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ke&&y(S.iridescenceMap.channel),iridescenceThicknessMapUv:qe&&y(S.iridescenceThicknessMap.channel),sheenColorMapUv:$e&&y(S.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&y(S.sheenRoughnessMap.channel),specularMapUv:gt&&y(S.specularMap.channel),specularColorMapUv:rt&&y(S.specularColorMap.channel),specularIntensityMapUv:Dt&&y(S.specularIntensityMap.channel),transmissionMapUv:G&&y(S.transmissionMap.channel),thicknessMapUv:be&&y(S.thicknessMap.channel),alphaMapUv:oe&&y(S.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Ke||R),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!N.attributes.uv&&(Ne||oe),fog:!!F,useFog:S.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ye,skinning:I.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:Q,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:zt,decodeVideoTexture:Ne&&S.map.isVideoTexture===!0&&bt.getTransfer(S.map.colorSpace)===Pt,decodeVideoTextureEmissive:St&&S.emissiveMap.isVideoTexture===!0&&bt.getTransfer(S.emissiveMap.colorSpace)===Pt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===_t,flipSided:S.side===Pn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:it&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&S.extensions.multiDraw===!0||pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return pn.vertexUv1s=c.has(1),pn.vertexUv2s=c.has(2),pn.vertexUv3s=c.has(3),c.clear(),pn}function p(S){const x=[];if(S.shaderID?x.push(S.shaderID):(x.push(S.customVertexShaderID),x.push(S.customFragmentShaderID)),S.defines!==void 0)for(const A in S.defines)x.push(A),x.push(S.defines[A]);return S.isRawShaderMaterial===!1&&(v(x,S),w(x,S),x.push(i.outputColorSpace)),x.push(S.customProgramCacheKey),x.join()}function v(S,x){S.push(x.precision),S.push(x.outputColorSpace),S.push(x.envMapMode),S.push(x.envMapCubeUVHeight),S.push(x.mapUv),S.push(x.alphaMapUv),S.push(x.lightMapUv),S.push(x.aoMapUv),S.push(x.bumpMapUv),S.push(x.normalMapUv),S.push(x.displacementMapUv),S.push(x.emissiveMapUv),S.push(x.metalnessMapUv),S.push(x.roughnessMapUv),S.push(x.anisotropyMapUv),S.push(x.clearcoatMapUv),S.push(x.clearcoatNormalMapUv),S.push(x.clearcoatRoughnessMapUv),S.push(x.iridescenceMapUv),S.push(x.iridescenceThicknessMapUv),S.push(x.sheenColorMapUv),S.push(x.sheenRoughnessMapUv),S.push(x.specularMapUv),S.push(x.specularColorMapUv),S.push(x.specularIntensityMapUv),S.push(x.transmissionMapUv),S.push(x.thicknessMapUv),S.push(x.combine),S.push(x.fogExp2),S.push(x.sizeAttenuation),S.push(x.morphTargetsCount),S.push(x.morphAttributeCount),S.push(x.numDirLights),S.push(x.numPointLights),S.push(x.numSpotLights),S.push(x.numSpotLightMaps),S.push(x.numHemiLights),S.push(x.numRectAreaLights),S.push(x.numDirLightShadows),S.push(x.numPointLightShadows),S.push(x.numSpotLightShadows),S.push(x.numSpotLightShadowsWithMaps),S.push(x.numLightProbes),S.push(x.shadowMapType),S.push(x.toneMapping),S.push(x.numClippingPlanes),S.push(x.numClipIntersection),S.push(x.depthPacking)}function w(S,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),S.push(o.mask)}function _(S){const x=m[S.type];let A;if(x){const P=hi[x];A=p0.clone(P.uniforms)}else A=S.uniforms;return A}function M(S,x){let A;for(let P=0,I=d.length;P<I;P++){const F=d[P];if(F.cacheKey===x){A=F,++A.usedTimes;break}}return A===void 0&&(A=new B_(i,x,S,r),d.push(A)),A}function b(S){if(--S.usedTimes===0){const x=d.indexOf(S);d[x]=d[d.length-1],d.pop(),S.destroy()}}function T(S){l.remove(S)}function E(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:_,acquireProgram:M,releaseProgram:b,releaseShaderCache:T,programs:d,dispose:E}}function W_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function $_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Tu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Eu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,h,f,m,y,g){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:h,material:f,groupOrder:m,renderOrder:u.renderOrder,z:y,group:g},i[e]=p):(p.id=u.id,p.object=u,p.geometry=h,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=y,p.group=g),e++,p}function o(u,h,f,m,y,g){const p=a(u,h,f,m,y,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,h,f,m,y,g){const p=a(u,h,f,m,y,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,h){t.length>1&&t.sort(u||$_),n.length>1&&n.sort(h||Tu),s.length>1&&s.sort(h||Tu)}function d(){for(let u=e,h=i.length;u<h;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:d,sort:c}}function X_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Eu,i.set(n,[a])):s>=r.length?(a=new Eu,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function q_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new xe};break;case"SpotLight":t={position:new B,direction:new B,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":t={color:new xe,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function Y_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let K_=0;function j_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Z_(i){const e=new q_,t=Y_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new B);const s=new B,r=new Bt,a=new Bt;function o(c){let d=0,u=0,h=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,y=0,g=0,p=0,v=0,w=0,_=0,M=0,b=0,T=0;c.sort(j_);for(let S=0,x=c.length;S<x;S++){const A=c[S],P=A.color,I=A.intensity,F=A.distance,N=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)d+=P.r*I,u+=P.g*I,h+=P.b*I;else if(A.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(A.sh.coefficients[Y],I);T++}else if(A.isDirectionalLight){const Y=e.get(A);if(Y.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const U=A.shadow,z=t.get(A);z.shadowIntensity=U.intensity,z.shadowBias=U.bias,z.shadowNormalBias=U.normalBias,z.shadowRadius=U.radius,z.shadowMapSize=U.mapSize,n.directionalShadow[f]=z,n.directionalShadowMap[f]=N,n.directionalShadowMatrix[f]=A.shadow.matrix,v++}n.directional[f]=Y,f++}else if(A.isSpotLight){const Y=e.get(A);Y.position.setFromMatrixPosition(A.matrixWorld),Y.color.copy(P).multiplyScalar(I),Y.distance=F,Y.coneCos=Math.cos(A.angle),Y.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),Y.decay=A.decay,n.spot[y]=Y;const U=A.shadow;if(A.map&&(n.spotLightMap[M]=A.map,M++,U.updateMatrices(A),A.castShadow&&b++),n.spotLightMatrix[y]=U.matrix,A.castShadow){const z=t.get(A);z.shadowIntensity=U.intensity,z.shadowBias=U.bias,z.shadowNormalBias=U.normalBias,z.shadowRadius=U.radius,z.shadowMapSize=U.mapSize,n.spotShadow[y]=z,n.spotShadowMap[y]=N,_++}y++}else if(A.isRectAreaLight){const Y=e.get(A);Y.color.copy(P).multiplyScalar(I),Y.halfWidth.set(A.width*.5,0,0),Y.halfHeight.set(0,A.height*.5,0),n.rectArea[g]=Y,g++}else if(A.isPointLight){const Y=e.get(A);if(Y.color.copy(A.color).multiplyScalar(A.intensity),Y.distance=A.distance,Y.decay=A.decay,A.castShadow){const U=A.shadow,z=t.get(A);z.shadowIntensity=U.intensity,z.shadowBias=U.bias,z.shadowNormalBias=U.normalBias,z.shadowRadius=U.radius,z.shadowMapSize=U.mapSize,z.shadowCameraNear=U.camera.near,z.shadowCameraFar=U.camera.far,n.pointShadow[m]=z,n.pointShadowMap[m]=N,n.pointShadowMatrix[m]=A.shadow.matrix,w++}n.point[m]=Y,m++}else if(A.isHemisphereLight){const Y=e.get(A);Y.skyColor.copy(A.color).multiplyScalar(I),Y.groundColor.copy(A.groundColor).multiplyScalar(I),n.hemi[p]=Y,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=we.LTC_FLOAT_1,n.rectAreaLTC2=we.LTC_FLOAT_2):(n.rectAreaLTC1=we.LTC_HALF_1,n.rectAreaLTC2=we.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;const E=n.hash;(E.directionalLength!==f||E.pointLength!==m||E.spotLength!==y||E.rectAreaLength!==g||E.hemiLength!==p||E.numDirectionalShadows!==v||E.numPointShadows!==w||E.numSpotShadows!==_||E.numSpotMaps!==M||E.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=_+M-b,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=T,E.directionalLength=f,E.pointLength=m,E.spotLength=y,E.rectAreaLength=g,E.hemiLength=p,E.numDirectionalShadows=v,E.numPointShadows=w,E.numSpotShadows=_,E.numSpotMaps=M,E.numLightProbes=T,n.version=K_++)}function l(c,d){let u=0,h=0,f=0,m=0,y=0;const g=d.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const w=c[p];if(w.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),u++}else if(w.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),f++}else if(w.isRectAreaLight){const _=n.rectArea[m];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(g),a.identity(),r.copy(w.matrixWorld),r.premultiply(g),a.extractRotation(r),_.halfWidth.set(w.width*.5,0,0),_.halfHeight.set(0,w.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),m++}else if(w.isPointLight){const _=n.point[h];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(g),h++}else if(w.isHemisphereLight){const _=n.hemi[y];_.direction.setFromMatrixPosition(w.matrixWorld),_.direction.transformDirection(g),y++}}}return{setup:o,setupView:l,state:n}}function Au(i){const e=new Z_(i),t=[],n=[];function s(d){c.camera=d,t.length=0,n.length=0}function r(d){t.push(d)}function a(d){n.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function J_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Au(i),e.set(s,[o])):r>=a.length?(o=new Au(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Q_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,e1=`uniform sampler2D shadow_pass;
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
}`;function t1(i,e,t){let n=new Qc;const s=new tt,r=new tt,a=new $t,o=new b0({depthPacking:bm}),l=new S0,c={},d=t.maxTextureSize,u={[es]:Pn,[Pn]:es,[_t]:_t},h=new ts({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new tt},radius:{value:4}},vertexShader:Q_,fragmentShader:e1}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const m=new Dn;m.setAttribute("position",new oi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new V(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ih;let p=this.type;this.render=function(b,T,E){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;const S=i.getRenderTarget(),x=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),P=i.state;P.setBlending(Ji),P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const I=p!==Ei&&this.type===Ei,F=p===Ei&&this.type!==Ei;for(let N=0,Y=b.length;N<Y;N++){const U=b[N],z=U.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",U,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const $=z.getFrameExtents();if(s.multiply($),r.copy(z.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/$.x),s.x=r.x*$.x,z.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/$.y),s.y=r.y*$.y,z.mapSize.y=r.y)),z.map===null||I===!0||F===!0){const q=this.type!==Ei?{minFilter:ai,magFilter:ai}:{};z.map!==null&&z.map.dispose(),z.map=new Is(s.x,s.y,q),z.map.texture.name=U.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const D=z.getViewportCount();for(let q=0;q<D;q++){const Q=z.getViewport(q);a.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),P.viewport(a),z.updateMatrices(U,q),n=z.getFrustum(),_(T,E,z.camera,U,this.type)}z.isPointLightShadow!==!0&&this.type===Ei&&v(z,E),z.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(S,x,A)};function v(b,T){const E=e.update(y);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Is(s.x,s.y)),h.uniforms.shadow_pass.value=b.map.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(T,null,E,h,y,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(T,null,E,f,y,null)}function w(b,T,E,S){let x=null;const A=E.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(A!==void 0)x=A;else if(x=E.isPointLight===!0?l:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const P=x.uuid,I=T.uuid;let F=c[P];F===void 0&&(F={},c[P]=F);let N=F[I];N===void 0&&(N=x.clone(),F[I]=N,T.addEventListener("dispose",M)),x=N}if(x.visible=T.visible,x.wireframe=T.wireframe,S===Ei?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:u[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,E.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const P=i.properties.get(x);P.light=E}return x}function _(b,T,E,S,x){if(b.visible===!1)return;if(b.layers.test(T.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&x===Ei)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,b.matrixWorld);const I=e.update(b),F=b.material;if(Array.isArray(F)){const N=I.groups;for(let Y=0,U=N.length;Y<U;Y++){const z=N[Y],$=F[z.materialIndex];if($&&$.visible){const D=w(b,$,S,x);b.onBeforeShadow(i,b,T,E,I,D,z),i.renderBufferDirect(E,null,I,D,b,z),b.onAfterShadow(i,b,T,E,I,D,z)}}}else if(F.visible){const N=w(b,F,S,x);b.onBeforeShadow(i,b,T,E,I,N,null),i.renderBufferDirect(E,null,I,N,b,null),b.onAfterShadow(i,b,T,E,I,N,null)}}const P=b.children;for(let I=0,F=P.length;I<F;I++)_(P[I],T,E,S,x)}function M(b){b.target.removeEventListener("dispose",M);for(const E in c){const S=c[E],x=b.target.uuid;x in S&&(S[x].dispose(),delete S[x])}}}const n1={[Hl]:zl,[Gl]:$l,[Vl]:Xl,[Mr]:Wl,[zl]:Hl,[$l]:Gl,[Xl]:Vl,[Wl]:Mr};function i1(i,e){function t(){let G=!1;const be=new $t;let ee=null;const oe=new $t(0,0,0,0);return{setMask:function(Ae){ee!==Ae&&!G&&(i.colorMask(Ae,Ae,Ae,Ae),ee=Ae)},setLocked:function(Ae){G=Ae},setClear:function(Ae,Ee,it,zt,pn){pn===!0&&(Ae*=zt,Ee*=zt,it*=zt),be.set(Ae,Ee,it,zt),oe.equals(be)===!1&&(i.clearColor(Ae,Ee,it,zt),oe.copy(be))},reset:function(){G=!1,ee=null,oe.set(-1,0,0,0)}}}function n(){let G=!1,be=!1,ee=null,oe=null,Ae=null;return{setReversed:function(Ee){if(be!==Ee){const it=e.get("EXT_clip_control");be?it.clipControlEXT(it.LOWER_LEFT_EXT,it.ZERO_TO_ONE_EXT):it.clipControlEXT(it.LOWER_LEFT_EXT,it.NEGATIVE_ONE_TO_ONE_EXT);const zt=Ae;Ae=null,this.setClear(zt)}be=Ee},getReversed:function(){return be},setTest:function(Ee){Ee?ae(i.DEPTH_TEST):ye(i.DEPTH_TEST)},setMask:function(Ee){ee!==Ee&&!G&&(i.depthMask(Ee),ee=Ee)},setFunc:function(Ee){if(be&&(Ee=n1[Ee]),oe!==Ee){switch(Ee){case Hl:i.depthFunc(i.NEVER);break;case zl:i.depthFunc(i.ALWAYS);break;case Gl:i.depthFunc(i.LESS);break;case Mr:i.depthFunc(i.LEQUAL);break;case Vl:i.depthFunc(i.EQUAL);break;case Wl:i.depthFunc(i.GEQUAL);break;case $l:i.depthFunc(i.GREATER);break;case Xl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=Ee}},setLocked:function(Ee){G=Ee},setClear:function(Ee){Ae!==Ee&&(be&&(Ee=1-Ee),i.clearDepth(Ee),Ae=Ee)},reset:function(){G=!1,ee=null,oe=null,Ae=null,be=!1}}}function s(){let G=!1,be=null,ee=null,oe=null,Ae=null,Ee=null,it=null,zt=null,pn=null;return{setTest:function(At){G||(At?ae(i.STENCIL_TEST):ye(i.STENCIL_TEST))},setMask:function(At){be!==At&&!G&&(i.stencilMask(At),be=At)},setFunc:function(At,Jn,_i){(ee!==At||oe!==Jn||Ae!==_i)&&(i.stencilFunc(At,Jn,_i),ee=At,oe=Jn,Ae=_i)},setOp:function(At,Jn,_i){(Ee!==At||it!==Jn||zt!==_i)&&(i.stencilOp(At,Jn,_i),Ee=At,it=Jn,zt=_i)},setLocked:function(At){G=At},setClear:function(At){pn!==At&&(i.clearStencil(At),pn=At)},reset:function(){G=!1,be=null,ee=null,oe=null,Ae=null,Ee=null,it=null,zt=null,pn=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let d={},u={},h=new WeakMap,f=[],m=null,y=!1,g=null,p=null,v=null,w=null,_=null,M=null,b=null,T=new xe(0,0,0),E=0,S=!1,x=null,A=null,P=null,I=null,F=null;const N=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,U=0;const z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(z)[1]),Y=U>=1):z.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),Y=U>=2);let $=null,D={};const q=i.getParameter(i.SCISSOR_BOX),Q=i.getParameter(i.VIEWPORT),te=new $t().fromArray(q),L=new $t().fromArray(Q);function j(G,be,ee,oe){const Ae=new Uint8Array(4),Ee=i.createTexture();i.bindTexture(G,Ee),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let it=0;it<ee;it++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(be,0,i.RGBA,1,1,oe,0,i.RGBA,i.UNSIGNED_BYTE,Ae):i.texImage2D(be+it,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ae);return Ee}const ce={};ce[i.TEXTURE_2D]=j(i.TEXTURE_2D,i.TEXTURE_2D,1),ce[i.TEXTURE_CUBE_MAP]=j(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[i.TEXTURE_2D_ARRAY]=j(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ce[i.TEXTURE_3D]=j(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(i.DEPTH_TEST),a.setFunc(Mr),de(!1),Ke(Ad),ae(i.CULL_FACE),O(Ji);function ae(G){d[G]!==!0&&(i.enable(G),d[G]=!0)}function ye(G){d[G]!==!1&&(i.disable(G),d[G]=!1)}function he(G,be){return u[G]!==be?(i.bindFramebuffer(G,be),u[G]=be,G===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=be),G===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=be),!0):!1}function pe(G,be){let ee=f,oe=!1;if(G){ee=h.get(be),ee===void 0&&(ee=[],h.set(be,ee));const Ae=G.textures;if(ee.length!==Ae.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let Ee=0,it=Ae.length;Ee<it;Ee++)ee[Ee]=i.COLOR_ATTACHMENT0+Ee;ee.length=Ae.length,oe=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,oe=!0);oe&&i.drawBuffers(ee)}function Ne(G){return m!==G?(i.useProgram(G),m=G,!0):!1}const Xe={[vs]:i.FUNC_ADD,[Kp]:i.FUNC_SUBTRACT,[jp]:i.FUNC_REVERSE_SUBTRACT};Xe[Zp]=i.MIN,Xe[Jp]=i.MAX;const nt={[Qp]:i.ZERO,[em]:i.ONE,[tm]:i.SRC_COLOR,[Fl]:i.SRC_ALPHA,[om]:i.SRC_ALPHA_SATURATE,[rm]:i.DST_COLOR,[im]:i.DST_ALPHA,[nm]:i.ONE_MINUS_SRC_COLOR,[Bl]:i.ONE_MINUS_SRC_ALPHA,[am]:i.ONE_MINUS_DST_COLOR,[sm]:i.ONE_MINUS_DST_ALPHA,[lm]:i.CONSTANT_COLOR,[cm]:i.ONE_MINUS_CONSTANT_COLOR,[dm]:i.CONSTANT_ALPHA,[um]:i.ONE_MINUS_CONSTANT_ALPHA};function O(G,be,ee,oe,Ae,Ee,it,zt,pn,At){if(G===Ji){y===!0&&(ye(i.BLEND),y=!1);return}if(y===!1&&(ae(i.BLEND),y=!0),G!==Yp){if(G!==g||At!==S){if((p!==vs||_!==vs)&&(i.blendEquation(i.FUNC_ADD),p=vs,_=vs),At)switch(G){case fr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yo:i.blendFunc(i.ONE,i.ONE);break;case Rd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Cd:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case fr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Rd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Cd:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}v=null,w=null,M=null,b=null,T.set(0,0,0),E=0,g=G,S=At}return}Ae=Ae||be,Ee=Ee||ee,it=it||oe,(be!==p||Ae!==_)&&(i.blendEquationSeparate(Xe[be],Xe[Ae]),p=be,_=Ae),(ee!==v||oe!==w||Ee!==M||it!==b)&&(i.blendFuncSeparate(nt[ee],nt[oe],nt[Ee],nt[it]),v=ee,w=oe,M=Ee,b=it),(zt.equals(T)===!1||pn!==E)&&(i.blendColor(zt.r,zt.g,zt.b,pn),T.copy(zt),E=pn),g=G,S=!1}function dn(G,be){G.side===_t?ye(i.CULL_FACE):ae(i.CULL_FACE);let ee=G.side===Pn;be&&(ee=!ee),de(ee),G.blending===fr&&G.transparent===!1?O(Ji):O(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),a.setFunc(G.depthFunc),a.setTest(G.depthTest),a.setMask(G.depthWrite),r.setMask(G.colorWrite);const oe=G.stencilWrite;o.setTest(oe),oe&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),St(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):ye(i.SAMPLE_ALPHA_TO_COVERAGE)}function de(G){x!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),x=G)}function Ke(G){G!==Xp?(ae(i.CULL_FACE),G!==A&&(G===Ad?i.cullFace(i.BACK):G===qp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ye(i.CULL_FACE),A=G}function Te(G){G!==P&&(Y&&i.lineWidth(G),P=G)}function St(G,be,ee){G?(ae(i.POLYGON_OFFSET_FILL),(I!==be||F!==ee)&&(i.polygonOffset(be,ee),I=be,F=ee)):ye(i.POLYGON_OFFSET_FILL)}function Ge(G){G?ae(i.SCISSOR_TEST):ye(i.SCISSOR_TEST)}function k(G){G===void 0&&(G=i.TEXTURE0+N-1),$!==G&&(i.activeTexture(G),$=G)}function R(G,be,ee){ee===void 0&&($===null?ee=i.TEXTURE0+N-1:ee=$);let oe=D[ee];oe===void 0&&(oe={type:void 0,texture:void 0},D[ee]=oe),(oe.type!==G||oe.texture!==be)&&($!==ee&&(i.activeTexture(ee),$=ee),i.bindTexture(G,be||ce[G]),oe.type=G,oe.texture=be)}function K(){const G=D[$];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function re(){try{i.compressedTexImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function le(){try{i.compressedTexImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ne(){try{i.texSubImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Be(){try{i.texSubImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function me(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Me(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ot(){try{i.texStorage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ve(){try{i.texStorage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ke(){try{i.texImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function qe(){try{i.texImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function $e(G){te.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),te.copy(G))}function Ce(G){L.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),L.copy(G))}function gt(G,be){let ee=c.get(be);ee===void 0&&(ee=new WeakMap,c.set(be,ee));let oe=ee.get(G);oe===void 0&&(oe=i.getUniformBlockIndex(be,G.name),ee.set(G,oe))}function rt(G,be){const oe=c.get(be).get(G);l.get(be)!==oe&&(i.uniformBlockBinding(be,oe,G.__bindingPointIndex),l.set(be,oe))}function Dt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},$=null,D={},u={},h=new WeakMap,f=[],m=null,y=!1,g=null,p=null,v=null,w=null,_=null,M=null,b=null,T=new xe(0,0,0),E=0,S=!1,x=null,A=null,P=null,I=null,F=null,te.set(0,0,i.canvas.width,i.canvas.height),L.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ae,disable:ye,bindFramebuffer:he,drawBuffers:pe,useProgram:Ne,setBlending:O,setMaterial:dn,setFlipSided:de,setCullFace:Ke,setLineWidth:Te,setPolygonOffset:St,setScissorTest:Ge,activeTexture:k,bindTexture:R,unbindTexture:K,compressedTexImage2D:re,compressedTexImage3D:le,texImage2D:ke,texImage3D:qe,updateUBOMapping:gt,uniformBlockBinding:rt,texStorage2D:ot,texStorage3D:ve,texSubImage2D:ne,texSubImage3D:Be,compressedTexSubImage2D:me,compressedTexSubImage3D:Me,scissor:$e,viewport:Ce,reset:Dt}}function s1(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new tt,d=new WeakMap;let u;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(k,R){return f?new OffscreenCanvas(k,R):pa("canvas")}function y(k,R,K){let re=1;const le=Ge(k);if((le.width>K||le.height>K)&&(re=K/Math.max(le.width,le.height)),re<1)if(typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&k instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&k instanceof ImageBitmap||typeof VideoFrame<"u"&&k instanceof VideoFrame){const ne=Math.floor(re*le.width),Be=Math.floor(re*le.height);u===void 0&&(u=m(ne,Be));const me=R?m(ne,Be):u;return me.width=ne,me.height=Be,me.getContext("2d").drawImage(k,0,0,ne,Be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+le.width+"x"+le.height+") to ("+ne+"x"+Be+")."),me}else return"data"in k&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+le.width+"x"+le.height+")."),k;return k}function g(k){return k.generateMipmaps}function p(k){i.generateMipmap(k)}function v(k){return k.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:k.isWebGL3DRenderTarget?i.TEXTURE_3D:k.isWebGLArrayRenderTarget||k.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(k,R,K,re,le=!1){if(k!==null){if(i[k]!==void 0)return i[k];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+k+"'")}let ne=R;if(R===i.RED&&(K===i.FLOAT&&(ne=i.R32F),K===i.HALF_FLOAT&&(ne=i.R16F),K===i.UNSIGNED_BYTE&&(ne=i.R8)),R===i.RED_INTEGER&&(K===i.UNSIGNED_BYTE&&(ne=i.R8UI),K===i.UNSIGNED_SHORT&&(ne=i.R16UI),K===i.UNSIGNED_INT&&(ne=i.R32UI),K===i.BYTE&&(ne=i.R8I),K===i.SHORT&&(ne=i.R16I),K===i.INT&&(ne=i.R32I)),R===i.RG&&(K===i.FLOAT&&(ne=i.RG32F),K===i.HALF_FLOAT&&(ne=i.RG16F),K===i.UNSIGNED_BYTE&&(ne=i.RG8)),R===i.RG_INTEGER&&(K===i.UNSIGNED_BYTE&&(ne=i.RG8UI),K===i.UNSIGNED_SHORT&&(ne=i.RG16UI),K===i.UNSIGNED_INT&&(ne=i.RG32UI),K===i.BYTE&&(ne=i.RG8I),K===i.SHORT&&(ne=i.RG16I),K===i.INT&&(ne=i.RG32I)),R===i.RGB_INTEGER&&(K===i.UNSIGNED_BYTE&&(ne=i.RGB8UI),K===i.UNSIGNED_SHORT&&(ne=i.RGB16UI),K===i.UNSIGNED_INT&&(ne=i.RGB32UI),K===i.BYTE&&(ne=i.RGB8I),K===i.SHORT&&(ne=i.RGB16I),K===i.INT&&(ne=i.RGB32I)),R===i.RGBA_INTEGER&&(K===i.UNSIGNED_BYTE&&(ne=i.RGBA8UI),K===i.UNSIGNED_SHORT&&(ne=i.RGBA16UI),K===i.UNSIGNED_INT&&(ne=i.RGBA32UI),K===i.BYTE&&(ne=i.RGBA8I),K===i.SHORT&&(ne=i.RGBA16I),K===i.INT&&(ne=i.RGBA32I)),R===i.RGB&&K===i.UNSIGNED_INT_5_9_9_9_REV&&(ne=i.RGB9_E5),R===i.RGBA){const Be=le?vo:bt.getTransfer(re);K===i.FLOAT&&(ne=i.RGBA32F),K===i.HALF_FLOAT&&(ne=i.RGBA16F),K===i.UNSIGNED_BYTE&&(ne=Be===Pt?i.SRGB8_ALPHA8:i.RGBA8),K===i.UNSIGNED_SHORT_4_4_4_4&&(ne=i.RGBA4),K===i.UNSIGNED_SHORT_5_5_5_1&&(ne=i.RGB5_A1)}return(ne===i.R16F||ne===i.R32F||ne===i.RG16F||ne===i.RG32F||ne===i.RGBA16F||ne===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function _(k,R){let K;return k?R===null||R===Cs||R===xr?K=i.DEPTH24_STENCIL8:R===ki?K=i.DEPTH32F_STENCIL8:R===ha&&(K=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===Cs||R===xr?K=i.DEPTH_COMPONENT24:R===ki?K=i.DEPTH_COMPONENT32F:R===ha&&(K=i.DEPTH_COMPONENT16),K}function M(k,R){return g(k)===!0||k.isFramebufferTexture&&k.minFilter!==ai&&k.minFilter!==Zn?Math.log2(Math.max(R.width,R.height))+1:k.mipmaps!==void 0&&k.mipmaps.length>0?k.mipmaps.length:k.isCompressedTexture&&Array.isArray(k.image)?R.mipmaps.length:1}function b(k){const R=k.target;R.removeEventListener("dispose",b),E(R),R.isVideoTexture&&d.delete(R)}function T(k){const R=k.target;R.removeEventListener("dispose",T),x(R)}function E(k){const R=n.get(k);if(R.__webglInit===void 0)return;const K=k.source,re=h.get(K);if(re){const le=re[R.__cacheKey];le.usedTimes--,le.usedTimes===0&&S(k),Object.keys(re).length===0&&h.delete(K)}n.remove(k)}function S(k){const R=n.get(k);i.deleteTexture(R.__webglTexture);const K=k.source,re=h.get(K);delete re[R.__cacheKey],a.memory.textures--}function x(k){const R=n.get(k);if(k.depthTexture&&(k.depthTexture.dispose(),n.remove(k.depthTexture)),k.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(R.__webglFramebuffer[re]))for(let le=0;le<R.__webglFramebuffer[re].length;le++)i.deleteFramebuffer(R.__webglFramebuffer[re][le]);else i.deleteFramebuffer(R.__webglFramebuffer[re]);R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer[re])}else{if(Array.isArray(R.__webglFramebuffer))for(let re=0;re<R.__webglFramebuffer.length;re++)i.deleteFramebuffer(R.__webglFramebuffer[re]);else i.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&i.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let re=0;re<R.__webglColorRenderbuffer.length;re++)R.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(R.__webglColorRenderbuffer[re]);R.__webglDepthRenderbuffer&&i.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const K=k.textures;for(let re=0,le=K.length;re<le;re++){const ne=n.get(K[re]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(K[re])}n.remove(k)}let A=0;function P(){A=0}function I(){const k=A;return k>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+k+" texture units while this GPU supports only "+s.maxTextures),A+=1,k}function F(k){const R=[];return R.push(k.wrapS),R.push(k.wrapT),R.push(k.wrapR||0),R.push(k.magFilter),R.push(k.minFilter),R.push(k.anisotropy),R.push(k.internalFormat),R.push(k.format),R.push(k.type),R.push(k.generateMipmaps),R.push(k.premultiplyAlpha),R.push(k.flipY),R.push(k.unpackAlignment),R.push(k.colorSpace),R.join()}function N(k,R){const K=n.get(k);if(k.isVideoTexture&&Te(k),k.isRenderTargetTexture===!1&&k.version>0&&K.__version!==k.version){const re=k.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{L(K,k,R);return}}t.bindTexture(i.TEXTURE_2D,K.__webglTexture,i.TEXTURE0+R)}function Y(k,R){const K=n.get(k);if(k.version>0&&K.__version!==k.version){L(K,k,R);return}t.bindTexture(i.TEXTURE_2D_ARRAY,K.__webglTexture,i.TEXTURE0+R)}function U(k,R){const K=n.get(k);if(k.version>0&&K.__version!==k.version){L(K,k,R);return}t.bindTexture(i.TEXTURE_3D,K.__webglTexture,i.TEXTURE0+R)}function z(k,R){const K=n.get(k);if(k.version>0&&K.__version!==k.version){j(K,k,R);return}t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture,i.TEXTURE0+R)}const $={[ua]:i.REPEAT,[Ms]:i.CLAMP_TO_EDGE,[Kl]:i.MIRRORED_REPEAT},D={[ai]:i.NEAREST,[wm]:i.NEAREST_MIPMAP_NEAREST,[Ea]:i.NEAREST_MIPMAP_LINEAR,[Zn]:i.LINEAR,[$o]:i.LINEAR_MIPMAP_NEAREST,[Pi]:i.LINEAR_MIPMAP_LINEAR},q={[xm]:i.NEVER,[Im]:i.ALWAYS,[Tm]:i.LESS,[$h]:i.LEQUAL,[Em]:i.EQUAL,[Cm]:i.GEQUAL,[Am]:i.GREATER,[Rm]:i.NOTEQUAL};function Q(k,R){if(R.type===ki&&e.has("OES_texture_float_linear")===!1&&(R.magFilter===Zn||R.magFilter===$o||R.magFilter===Ea||R.magFilter===Pi||R.minFilter===Zn||R.minFilter===$o||R.minFilter===Ea||R.minFilter===Pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(k,i.TEXTURE_WRAP_S,$[R.wrapS]),i.texParameteri(k,i.TEXTURE_WRAP_T,$[R.wrapT]),(k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY)&&i.texParameteri(k,i.TEXTURE_WRAP_R,$[R.wrapR]),i.texParameteri(k,i.TEXTURE_MAG_FILTER,D[R.magFilter]),i.texParameteri(k,i.TEXTURE_MIN_FILTER,D[R.minFilter]),R.compareFunction&&(i.texParameteri(k,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(k,i.TEXTURE_COMPARE_FUNC,q[R.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===ai||R.minFilter!==Ea&&R.minFilter!==Pi||R.type===ki&&e.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||n.get(R).__currentAnisotropy){const K=e.get("EXT_texture_filter_anisotropic");i.texParameterf(k,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,s.getMaxAnisotropy())),n.get(R).__currentAnisotropy=R.anisotropy}}}function te(k,R){let K=!1;k.__webglInit===void 0&&(k.__webglInit=!0,R.addEventListener("dispose",b));const re=R.source;let le=h.get(re);le===void 0&&(le={},h.set(re,le));const ne=F(R);if(ne!==k.__cacheKey){le[ne]===void 0&&(le[ne]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,K=!0),le[ne].usedTimes++;const Be=le[k.__cacheKey];Be!==void 0&&(le[k.__cacheKey].usedTimes--,Be.usedTimes===0&&S(R)),k.__cacheKey=ne,k.__webglTexture=le[ne].texture}return K}function L(k,R,K){let re=i.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(re=i.TEXTURE_2D_ARRAY),R.isData3DTexture&&(re=i.TEXTURE_3D);const le=te(k,R),ne=R.source;t.bindTexture(re,k.__webglTexture,i.TEXTURE0+K);const Be=n.get(ne);if(ne.version!==Be.__version||le===!0){t.activeTexture(i.TEXTURE0+K);const me=bt.getPrimaries(bt.workingColorSpace),Me=R.colorSpace===Ii?null:bt.getPrimaries(R.colorSpace),ot=R.colorSpace===Ii||me===Me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot);let ve=y(R.image,!1,s.maxTextureSize);ve=St(R,ve);const ke=r.convert(R.format,R.colorSpace),qe=r.convert(R.type);let $e=w(R.internalFormat,ke,qe,R.colorSpace,R.isVideoTexture);Q(re,R);let Ce;const gt=R.mipmaps,rt=R.isVideoTexture!==!0,Dt=Be.__version===void 0||le===!0,G=ne.dataReady,be=M(R,ve);if(R.isDepthTexture)$e=_(R.format===Tr,R.type),Dt&&(rt?t.texStorage2D(i.TEXTURE_2D,1,$e,ve.width,ve.height):t.texImage2D(i.TEXTURE_2D,0,$e,ve.width,ve.height,0,ke,qe,null));else if(R.isDataTexture)if(gt.length>0){rt&&Dt&&t.texStorage2D(i.TEXTURE_2D,be,$e,gt[0].width,gt[0].height);for(let ee=0,oe=gt.length;ee<oe;ee++)Ce=gt[ee],rt?G&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,Ce.width,Ce.height,ke,qe,Ce.data):t.texImage2D(i.TEXTURE_2D,ee,$e,Ce.width,Ce.height,0,ke,qe,Ce.data);R.generateMipmaps=!1}else rt?(Dt&&t.texStorage2D(i.TEXTURE_2D,be,$e,ve.width,ve.height),G&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve.width,ve.height,ke,qe,ve.data)):t.texImage2D(i.TEXTURE_2D,0,$e,ve.width,ve.height,0,ke,qe,ve.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){rt&&Dt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,$e,gt[0].width,gt[0].height,ve.depth);for(let ee=0,oe=gt.length;ee<oe;ee++)if(Ce=gt[ee],R.format!==ri)if(ke!==null)if(rt){if(G)if(R.layerUpdates.size>0){const Ae=iu(Ce.width,Ce.height,R.format,R.type);for(const Ee of R.layerUpdates){const it=Ce.data.subarray(Ee*Ae/Ce.data.BYTES_PER_ELEMENT,(Ee+1)*Ae/Ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,Ee,Ce.width,Ce.height,1,ke,it)}R.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,Ce.width,Ce.height,ve.depth,ke,Ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,$e,Ce.width,Ce.height,ve.depth,0,Ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?G&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,Ce.width,Ce.height,ve.depth,ke,qe,Ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,$e,Ce.width,Ce.height,ve.depth,0,ke,qe,Ce.data)}else{rt&&Dt&&t.texStorage2D(i.TEXTURE_2D,be,$e,gt[0].width,gt[0].height);for(let ee=0,oe=gt.length;ee<oe;ee++)Ce=gt[ee],R.format!==ri?ke!==null?rt?G&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,Ce.width,Ce.height,ke,Ce.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,$e,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?G&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,Ce.width,Ce.height,ke,qe,Ce.data):t.texImage2D(i.TEXTURE_2D,ee,$e,Ce.width,Ce.height,0,ke,qe,Ce.data)}else if(R.isDataArrayTexture)if(rt){if(Dt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,$e,ve.width,ve.height,ve.depth),G)if(R.layerUpdates.size>0){const ee=iu(ve.width,ve.height,R.format,R.type);for(const oe of R.layerUpdates){const Ae=ve.data.subarray(oe*ee/ve.data.BYTES_PER_ELEMENT,(oe+1)*ee/ve.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,oe,ve.width,ve.height,1,ke,qe,Ae)}R.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ve.width,ve.height,ve.depth,ke,qe,ve.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,$e,ve.width,ve.height,ve.depth,0,ke,qe,ve.data);else if(R.isData3DTexture)rt?(Dt&&t.texStorage3D(i.TEXTURE_3D,be,$e,ve.width,ve.height,ve.depth),G&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ve.width,ve.height,ve.depth,ke,qe,ve.data)):t.texImage3D(i.TEXTURE_3D,0,$e,ve.width,ve.height,ve.depth,0,ke,qe,ve.data);else if(R.isFramebufferTexture){if(Dt)if(rt)t.texStorage2D(i.TEXTURE_2D,be,$e,ve.width,ve.height);else{let ee=ve.width,oe=ve.height;for(let Ae=0;Ae<be;Ae++)t.texImage2D(i.TEXTURE_2D,Ae,$e,ee,oe,0,ke,qe,null),ee>>=1,oe>>=1}}else if(gt.length>0){if(rt&&Dt){const ee=Ge(gt[0]);t.texStorage2D(i.TEXTURE_2D,be,$e,ee.width,ee.height)}for(let ee=0,oe=gt.length;ee<oe;ee++)Ce=gt[ee],rt?G&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ke,qe,Ce):t.texImage2D(i.TEXTURE_2D,ee,$e,ke,qe,Ce);R.generateMipmaps=!1}else if(rt){if(Dt){const ee=Ge(ve);t.texStorage2D(i.TEXTURE_2D,be,$e,ee.width,ee.height)}G&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ke,qe,ve)}else t.texImage2D(i.TEXTURE_2D,0,$e,ke,qe,ve);g(R)&&p(re),Be.__version=ne.version,R.onUpdate&&R.onUpdate(R)}k.__version=R.version}function j(k,R,K){if(R.image.length!==6)return;const re=te(k,R),le=R.source;t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+K);const ne=n.get(le);if(le.version!==ne.__version||re===!0){t.activeTexture(i.TEXTURE0+K);const Be=bt.getPrimaries(bt.workingColorSpace),me=R.colorSpace===Ii?null:bt.getPrimaries(R.colorSpace),Me=R.colorSpace===Ii||Be===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const ot=R.isCompressedTexture||R.image[0].isCompressedTexture,ve=R.image[0]&&R.image[0].isDataTexture,ke=[];for(let oe=0;oe<6;oe++)!ot&&!ve?ke[oe]=y(R.image[oe],!0,s.maxCubemapSize):ke[oe]=ve?R.image[oe].image:R.image[oe],ke[oe]=St(R,ke[oe]);const qe=ke[0],$e=r.convert(R.format,R.colorSpace),Ce=r.convert(R.type),gt=w(R.internalFormat,$e,Ce,R.colorSpace),rt=R.isVideoTexture!==!0,Dt=ne.__version===void 0||re===!0,G=le.dataReady;let be=M(R,qe);Q(i.TEXTURE_CUBE_MAP,R);let ee;if(ot){rt&&Dt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,be,gt,qe.width,qe.height);for(let oe=0;oe<6;oe++){ee=ke[oe].mipmaps;for(let Ae=0;Ae<ee.length;Ae++){const Ee=ee[Ae];R.format!==ri?$e!==null?rt?G&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ae,0,0,Ee.width,Ee.height,$e,Ee.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ae,gt,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):rt?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ae,0,0,Ee.width,Ee.height,$e,Ce,Ee.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ae,gt,Ee.width,Ee.height,0,$e,Ce,Ee.data)}}}else{if(ee=R.mipmaps,rt&&Dt){ee.length>0&&be++;const oe=Ge(ke[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,be,gt,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(ve){rt?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,ke[oe].width,ke[oe].height,$e,Ce,ke[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,gt,ke[oe].width,ke[oe].height,0,$e,Ce,ke[oe].data);for(let Ae=0;Ae<ee.length;Ae++){const it=ee[Ae].image[oe].image;rt?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ae+1,0,0,it.width,it.height,$e,Ce,it.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ae+1,gt,it.width,it.height,0,$e,Ce,it.data)}}else{rt?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,$e,Ce,ke[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,gt,$e,Ce,ke[oe]);for(let Ae=0;Ae<ee.length;Ae++){const Ee=ee[Ae];rt?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ae+1,0,0,$e,Ce,Ee.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ae+1,gt,$e,Ce,Ee.image[oe])}}}g(R)&&p(i.TEXTURE_CUBE_MAP),ne.__version=le.version,R.onUpdate&&R.onUpdate(R)}k.__version=R.version}function ce(k,R,K,re,le,ne){const Be=r.convert(K.format,K.colorSpace),me=r.convert(K.type),Me=w(K.internalFormat,Be,me,K.colorSpace),ot=n.get(R),ve=n.get(K);if(ve.__renderTarget=R,!ot.__hasExternalTextures){const ke=Math.max(1,R.width>>ne),qe=Math.max(1,R.height>>ne);le===i.TEXTURE_3D||le===i.TEXTURE_2D_ARRAY?t.texImage3D(le,ne,Me,ke,qe,R.depth,0,Be,me,null):t.texImage2D(le,ne,Me,ke,qe,0,Be,me,null)}t.bindFramebuffer(i.FRAMEBUFFER,k),Ke(R)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,le,ve.__webglTexture,0,de(R)):(le===i.TEXTURE_2D||le>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,re,le,ve.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(k,R,K){if(i.bindRenderbuffer(i.RENDERBUFFER,k),R.depthBuffer){const re=R.depthTexture,le=re&&re.isDepthTexture?re.type:null,ne=_(R.stencilBuffer,le),Be=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=de(R);Ke(R)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,me,ne,R.width,R.height):K?i.renderbufferStorageMultisample(i.RENDERBUFFER,me,ne,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,ne,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Be,i.RENDERBUFFER,k)}else{const re=R.textures;for(let le=0;le<re.length;le++){const ne=re[le],Be=r.convert(ne.format,ne.colorSpace),me=r.convert(ne.type),Me=w(ne.internalFormat,Be,me,ne.colorSpace),ot=de(R);K&&Ke(R)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot,Me,R.width,R.height):Ke(R)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot,Me,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,Me,R.width,R.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ye(k,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,k),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const re=n.get(R.depthTexture);re.__renderTarget=R,(!re.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),N(R.depthTexture,0);const le=re.__webglTexture,ne=de(R);if(R.depthTexture.format===pr)Ke(R)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,le,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,le,0);else if(R.depthTexture.format===Tr)Ke(R)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,le,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,le,0);else throw new Error("Unknown depthTexture format")}function he(k){const R=n.get(k),K=k.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==k.depthTexture){const re=k.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),re){const le=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,re.removeEventListener("dispose",le)};re.addEventListener("dispose",le),R.__depthDisposeCallback=le}R.__boundDepthTexture=re}if(k.depthTexture&&!R.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");ye(R.__webglFramebuffer,k)}else if(K){R.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer[re]),R.__webglDepthbuffer[re]===void 0)R.__webglDepthbuffer[re]=i.createRenderbuffer(),ae(R.__webglDepthbuffer[re],k,!1);else{const le=k.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=R.__webglDepthbuffer[re];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,ne)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=i.createRenderbuffer(),ae(R.__webglDepthbuffer,k,!1);else{const re=k.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=R.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,le)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function pe(k,R,K){const re=n.get(k);R!==void 0&&ce(re.__webglFramebuffer,k,k.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),K!==void 0&&he(k)}function Ne(k){const R=k.texture,K=n.get(k),re=n.get(R);k.addEventListener("dispose",T);const le=k.textures,ne=k.isWebGLCubeRenderTarget===!0,Be=le.length>1;if(Be||(re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture()),re.__version=R.version,a.memory.textures++),ne){K.__webglFramebuffer=[];for(let me=0;me<6;me++)if(R.mipmaps&&R.mipmaps.length>0){K.__webglFramebuffer[me]=[];for(let Me=0;Me<R.mipmaps.length;Me++)K.__webglFramebuffer[me][Me]=i.createFramebuffer()}else K.__webglFramebuffer[me]=i.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){K.__webglFramebuffer=[];for(let me=0;me<R.mipmaps.length;me++)K.__webglFramebuffer[me]=i.createFramebuffer()}else K.__webglFramebuffer=i.createFramebuffer();if(Be)for(let me=0,Me=le.length;me<Me;me++){const ot=n.get(le[me]);ot.__webglTexture===void 0&&(ot.__webglTexture=i.createTexture(),a.memory.textures++)}if(k.samples>0&&Ke(k)===!1){K.__webglMultisampledFramebuffer=i.createFramebuffer(),K.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let me=0;me<le.length;me++){const Me=le[me];K.__webglColorRenderbuffer[me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,K.__webglColorRenderbuffer[me]);const ot=r.convert(Me.format,Me.colorSpace),ve=r.convert(Me.type),ke=w(Me.internalFormat,ot,ve,Me.colorSpace,k.isXRRenderTarget===!0),qe=de(k);i.renderbufferStorageMultisample(i.RENDERBUFFER,qe,ke,k.width,k.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,K.__webglColorRenderbuffer[me])}i.bindRenderbuffer(i.RENDERBUFFER,null),k.depthBuffer&&(K.__webglDepthRenderbuffer=i.createRenderbuffer(),ae(K.__webglDepthRenderbuffer,k,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),Q(i.TEXTURE_CUBE_MAP,R);for(let me=0;me<6;me++)if(R.mipmaps&&R.mipmaps.length>0)for(let Me=0;Me<R.mipmaps.length;Me++)ce(K.__webglFramebuffer[me][Me],k,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Me);else ce(K.__webglFramebuffer[me],k,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);g(R)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Be){for(let me=0,Me=le.length;me<Me;me++){const ot=le[me],ve=n.get(ot);t.bindTexture(i.TEXTURE_2D,ve.__webglTexture),Q(i.TEXTURE_2D,ot),ce(K.__webglFramebuffer,k,ot,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,0),g(ot)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let me=i.TEXTURE_2D;if((k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)&&(me=k.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,re.__webglTexture),Q(me,R),R.mipmaps&&R.mipmaps.length>0)for(let Me=0;Me<R.mipmaps.length;Me++)ce(K.__webglFramebuffer[Me],k,R,i.COLOR_ATTACHMENT0,me,Me);else ce(K.__webglFramebuffer,k,R,i.COLOR_ATTACHMENT0,me,0);g(R)&&p(me),t.unbindTexture()}k.depthBuffer&&he(k)}function Xe(k){const R=k.textures;for(let K=0,re=R.length;K<re;K++){const le=R[K];if(g(le)){const ne=v(k),Be=n.get(le).__webglTexture;t.bindTexture(ne,Be),p(ne),t.unbindTexture()}}}const nt=[],O=[];function dn(k){if(k.samples>0){if(Ke(k)===!1){const R=k.textures,K=k.width,re=k.height;let le=i.COLOR_BUFFER_BIT;const ne=k.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Be=n.get(k),me=R.length>1;if(me)for(let Me=0;Me<R.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,Be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Be.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Be.__webglFramebuffer);for(let Me=0;Me<R.length;Me++){if(k.resolveDepthBuffer&&(k.depthBuffer&&(le|=i.DEPTH_BUFFER_BIT),k.stencilBuffer&&k.resolveStencilBuffer&&(le|=i.STENCIL_BUFFER_BIT)),me){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Be.__webglColorRenderbuffer[Me]);const ot=n.get(R[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ot,0)}i.blitFramebuffer(0,0,K,re,0,0,K,re,le,i.NEAREST),l===!0&&(nt.length=0,O.length=0,nt.push(i.COLOR_ATTACHMENT0+Me),k.depthBuffer&&k.resolveDepthBuffer===!1&&(nt.push(ne),O.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,O)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,nt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),me)for(let Me=0;Me<R.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,Be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,Be.__webglColorRenderbuffer[Me]);const ot=n.get(R[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,ot,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Be.__webglMultisampledFramebuffer)}else if(k.depthBuffer&&k.resolveDepthBuffer===!1&&l){const R=k.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[R])}}}function de(k){return Math.min(s.maxSamples,k.samples)}function Ke(k){const R=n.get(k);return k.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function Te(k){const R=a.render.frame;d.get(k)!==R&&(d.set(k,R),k.update())}function St(k,R){const K=k.colorSpace,re=k.format,le=k.type;return k.isCompressedTexture===!0||k.isVideoTexture===!0||K!==Er&&K!==Ii&&(bt.getTransfer(K)===Pt?(re!==ri||le!==Ni)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),R}function Ge(k){return typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement?(c.width=k.naturalWidth||k.width,c.height=k.naturalHeight||k.height):typeof VideoFrame<"u"&&k instanceof VideoFrame?(c.width=k.displayWidth,c.height=k.displayHeight):(c.width=k.width,c.height=k.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=P,this.setTexture2D=N,this.setTexture2DArray=Y,this.setTexture3D=U,this.setTextureCube=z,this.rebindTextures=pe,this.setupRenderTarget=Ne,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=dn,this.setupDepthRenderbuffer=he,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=Ke}function r1(i,e){function t(n,s=Ii){let r;const a=bt.getTransfer(s);if(n===Ni)return i.UNSIGNED_BYTE;if(n===$c)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Xc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Oh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Dh)return i.BYTE;if(n===Uh)return i.SHORT;if(n===ha)return i.UNSIGNED_SHORT;if(n===Wc)return i.INT;if(n===Cs)return i.UNSIGNED_INT;if(n===ki)return i.FLOAT;if(n===ga)return i.HALF_FLOAT;if(n===Nh)return i.ALPHA;if(n===Fh)return i.RGB;if(n===ri)return i.RGBA;if(n===Bh)return i.LUMINANCE;if(n===Hh)return i.LUMINANCE_ALPHA;if(n===pr)return i.DEPTH_COMPONENT;if(n===Tr)return i.DEPTH_STENCIL;if(n===zh)return i.RED;if(n===qc)return i.RED_INTEGER;if(n===Gh)return i.RG;if(n===Yc)return i.RG_INTEGER;if(n===Kc)return i.RGBA_INTEGER;if(n===ro||n===ao||n===oo||n===lo)if(a===Pt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ro)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===lo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ro)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ao)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===lo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jl||n===Zl||n===Jl||n===Ql)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===jl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Zl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Jl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ql)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ec||n===tc||n===nc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ec||n===tc)return a===Pt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===nc)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ic||n===sc||n===rc||n===ac||n===oc||n===lc||n===cc||n===dc||n===uc||n===hc||n===fc||n===pc||n===mc||n===gc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ic)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===sc)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===rc)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ac)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===oc)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===lc)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===cc)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===dc)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===uc)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===hc)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===fc)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===pc)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===mc)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===gc)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===co||n===yc||n===vc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===co)return a===Pt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===yc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===vc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vh||n===_c||n===wc||n===Mc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===co)return r.COMPRESSED_RED_RGTC1_EXT;if(n===_c)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Mc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const a1={type:"move"};class wl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const y of e.hand.values()){const g=t.getJointPose(y,n),p=this._getHandJoint(c,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&h>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(a1)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ze;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const o1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,l1=`
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

}`;class c1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new wn,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ts({vertexShader:o1,fragmentShader:l1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new V(new va(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class d1 extends Pr{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,f=null,m=null;const y=new c1,g=t.getContextAttributes();let p=null,v=null;const w=[],_=[],M=new tt;let b=null;const T=new ii;T.viewport=new $t;const E=new ii;E.viewport=new $t;const S=[T,E],x=new I0;let A=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(L){let j=w[L];return j===void 0&&(j=new wl,w[L]=j),j.getTargetRaySpace()},this.getControllerGrip=function(L){let j=w[L];return j===void 0&&(j=new wl,w[L]=j),j.getGripSpace()},this.getHand=function(L){let j=w[L];return j===void 0&&(j=new wl,w[L]=j),j.getHandSpace()};function I(L){const j=_.indexOf(L.inputSource);if(j===-1)return;const ce=w[j];ce!==void 0&&(ce.update(L.inputSource,L.frame,c||a),ce.dispatchEvent({type:L.type,data:L.inputSource}))}function F(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",N);for(let L=0;L<w.length;L++){const j=_[L];j!==null&&(_[L]=null,w[L].disconnect(j))}A=null,P=null,y.reset(),e.setRenderTarget(p),f=null,h=null,u=null,s=null,v=null,te.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(L){r=L,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(L){o=L,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(L){c=L},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(L){if(s=L,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",F),s.addEventListener("inputsourceschange",N),g.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(M),s.enabledFeatures!==void 0&&s.enabledFeatures.includes("layers")){let ce=null,ae=null,ye=null;g.depth&&(ye=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=g.stencil?Tr:pr,ae=g.stencil?xr:Cs);const he={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};u=new XRWebGLBinding(s,t),h=u.createProjectionLayer(he),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new Is(h.textureWidth,h.textureHeight,{format:ri,type:Ni,depthTexture:new rf(h.textureWidth,h.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}else{const ce={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Is(f.framebufferWidth,f.framebufferHeight,{format:ri,type:Ni,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),te.setContext(s),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function N(L){for(let j=0;j<L.removed.length;j++){const ce=L.removed[j],ae=_.indexOf(ce);ae>=0&&(_[ae]=null,w[ae].disconnect(ce))}for(let j=0;j<L.added.length;j++){const ce=L.added[j];let ae=_.indexOf(ce);if(ae===-1){for(let he=0;he<w.length;he++)if(he>=_.length){_.push(ce),ae=he;break}else if(_[he]===null){_[he]=ce,ae=he;break}if(ae===-1)break}const ye=w[ae];ye&&ye.connect(ce)}}const Y=new B,U=new B;function z(L,j,ce){Y.setFromMatrixPosition(j.matrixWorld),U.setFromMatrixPosition(ce.matrixWorld);const ae=Y.distanceTo(U),ye=j.projectionMatrix.elements,he=ce.projectionMatrix.elements,pe=ye[14]/(ye[10]-1),Ne=ye[14]/(ye[10]+1),Xe=(ye[9]+1)/ye[5],nt=(ye[9]-1)/ye[5],O=(ye[8]-1)/ye[0],dn=(he[8]+1)/he[0],de=pe*O,Ke=pe*dn,Te=ae/(-O+dn),St=Te*-O;if(j.matrixWorld.decompose(L.position,L.quaternion,L.scale),L.translateX(St),L.translateZ(Te),L.matrixWorld.compose(L.position,L.quaternion,L.scale),L.matrixWorldInverse.copy(L.matrixWorld).invert(),ye[10]===-1)L.projectionMatrix.copy(j.projectionMatrix),L.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const Ge=pe+Te,k=Ne+Te,R=de-St,K=Ke+(ae-St),re=Xe*Ne/k*Ge,le=nt*Ne/k*Ge;L.projectionMatrix.makePerspective(R,K,re,le,Ge,k),L.projectionMatrixInverse.copy(L.projectionMatrix).invert()}}function $(L,j){j===null?L.matrixWorld.copy(L.matrix):L.matrixWorld.multiplyMatrices(j.matrixWorld,L.matrix),L.matrixWorldInverse.copy(L.matrixWorld).invert()}this.updateCamera=function(L){if(s===null)return;let j=L.near,ce=L.far;y.texture!==null&&(y.depthNear>0&&(j=y.depthNear),y.depthFar>0&&(ce=y.depthFar)),x.near=E.near=T.near=j,x.far=E.far=T.far=ce,(A!==x.near||P!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),A=x.near,P=x.far),T.layers.mask=L.layers.mask|2,E.layers.mask=L.layers.mask|4,x.layers.mask=T.layers.mask|E.layers.mask;const ae=L.parent,ye=x.cameras;$(x,ae);for(let he=0;he<ye.length;he++)$(ye[he],ae);ye.length===2?z(x,T,E):x.projectionMatrix.copy(T.projectionMatrix),D(L,x,ae)};function D(L,j,ce){ce===null?L.matrix.copy(j.matrixWorld):(L.matrix.copy(ce.matrixWorld),L.matrix.invert(),L.matrix.multiply(j.matrixWorld)),L.matrix.decompose(L.position,L.quaternion,L.scale),L.updateMatrixWorld(!0),L.projectionMatrix.copy(j.projectionMatrix),L.projectionMatrixInverse.copy(j.projectionMatrixInverse),L.isPerspectiveCamera&&(L.fov=fa*2*Math.atan(1/L.projectionMatrix.elements[5]),L.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(L){l=L,h!==null&&(h.fixedFoveation=L),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=L)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(x)};let q=null;function Q(L,j){if(d=j.getViewerPose(c||a),m=j,d!==null){const ce=d.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let ae=!1;ce.length!==x.cameras.length&&(x.cameras.length=0,ae=!0);for(let he=0;he<ce.length;he++){const pe=ce[he];let Ne=null;if(f!==null)Ne=f.getViewport(pe);else{const nt=u.getViewSubImage(h,pe);Ne=nt.viewport,he===0&&(e.setRenderTargetTextures(v,nt.colorTexture,h.ignoreDepthValues?void 0:nt.depthStencilTexture),e.setRenderTarget(v))}let Xe=S[he];Xe===void 0&&(Xe=new ii,Xe.layers.enable(he),Xe.viewport=new $t,S[he]=Xe),Xe.matrix.fromArray(pe.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(pe.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),he===0&&(x.matrix.copy(Xe.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ae===!0&&x.cameras.push(Xe)}const ye=s.enabledFeatures;if(ye&&ye.includes("depth-sensing")){const he=u.getDepthInformation(ce[0]);he&&he.isValid&&he.texture&&y.init(e,he,s.renderState)}}for(let ce=0;ce<w.length;ce++){const ae=_[ce],ye=w[ce];ae!==null&&ye!==void 0&&ye.update(ae,j,c||a)}q&&q(L,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),m=null}const te=new lf;te.setAnimationLoop(Q),this.setAnimationLoop=function(L){q=L},this.dispose=function(){}}}const ds=new vi,u1=new Bt;function h1(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Qh(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,v,w,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),d(g,p)):p.isMeshStandardMaterial?(r(g,p),h(g,p),p.isMeshPhysicalMaterial&&f(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,v,w):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Pn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Pn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const v=e.get(p),w=v.envMap,_=v.envMapRotation;w&&(g.envMap.value=w,ds.copy(_),ds.x*=-1,ds.y*=-1,ds.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ds.y*=-1,ds.z*=-1),g.envMapRotation.value.setFromMatrix4(u1.makeRotationFromEuler(ds)),g.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,v,w){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=w*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function d(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Pn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){const v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function f1(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,w){const _=w.program;n.uniformBlockBinding(v,_)}function c(v,w){let _=s[v.id];_===void 0&&(m(v),_=d(v),s[v.id]=_,v.addEventListener("dispose",g));const M=w.program;n.updateUBOMapping(v,M);const b=e.render.frame;r[v.id]!==b&&(h(v),r[v.id]=b)}function d(v){const w=u();v.__bindingPointIndex=w;const _=i.createBuffer(),M=v.__size,b=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,M,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,_),_}function u(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const w=s[v.id],_=v.uniforms,M=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let b=0,T=_.length;b<T;b++){const E=Array.isArray(_[b])?_[b]:[_[b]];for(let S=0,x=E.length;S<x;S++){const A=E[S];if(f(A,b,S,M)===!0){const P=A.__offset,I=Array.isArray(A.value)?A.value:[A.value];let F=0;for(let N=0;N<I.length;N++){const Y=I[N],U=y(Y);typeof Y=="number"||typeof Y=="boolean"?(A.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,P+F,A.__data)):Y.isMatrix3?(A.__data[0]=Y.elements[0],A.__data[1]=Y.elements[1],A.__data[2]=Y.elements[2],A.__data[3]=0,A.__data[4]=Y.elements[3],A.__data[5]=Y.elements[4],A.__data[6]=Y.elements[5],A.__data[7]=0,A.__data[8]=Y.elements[6],A.__data[9]=Y.elements[7],A.__data[10]=Y.elements[8],A.__data[11]=0):(Y.toArray(A.__data,F),F+=U.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,P,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,w,_,M){const b=v.value,T=w+"_"+_;if(M[T]===void 0)return typeof b=="number"||typeof b=="boolean"?M[T]=b:M[T]=b.clone(),!0;{const E=M[T];if(typeof b=="number"||typeof b=="boolean"){if(E!==b)return M[T]=b,!0}else if(E.equals(b)===!1)return E.copy(b),!0}return!1}function m(v){const w=v.uniforms;let _=0;const M=16;for(let T=0,E=w.length;T<E;T++){const S=Array.isArray(w[T])?w[T]:[w[T]];for(let x=0,A=S.length;x<A;x++){const P=S[x],I=Array.isArray(P.value)?P.value:[P.value];for(let F=0,N=I.length;F<N;F++){const Y=I[F],U=y(Y),z=_%M,$=z%U.boundary,D=z+$;_+=$,D!==0&&M-D<U.storage&&(_+=M-D),P.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=_,_+=U.storage}}}const b=_%M;return b>0&&(_+=M-b),v.__size=_,v.__cache={},this}function y(v){const w={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(w.boundary=4,w.storage=4):v.isVector2?(w.boundary=8,w.storage=8):v.isVector3||v.isColor?(w.boundary=16,w.storage=12):v.isVector4?(w.boundary=16,w.storage=16):v.isMatrix3?(w.boundary=48,w.storage=48):v.isMatrix4?(w.boundary=64,w.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),w}function g(v){const w=v.target;w.removeEventListener("dispose",g);const _=a.indexOf(w.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class ff{constructor(e={}){const{canvas:t=qm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),y=new Int32Array(4);let g=null,p=null;const v=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=hn,this.toneMapping=Qi,this.toneMappingExposure=1;const _=this;let M=!1,b=0,T=0,E=null,S=-1,x=null;const A=new $t,P=new $t;let I=null;const F=new xe(0);let N=0,Y=t.width,U=t.height,z=1,$=null,D=null;const q=new $t(0,0,Y,U),Q=new $t(0,0,Y,U);let te=!1;const L=new Qc;let j=!1,ce=!1;this.transmissionResolutionScale=1;const ae=new Bt,ye=new Bt,he=new B,pe=new $t,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xe=!1;function nt(){return E===null?z:1}let O=n;function dn(C,W){return t.getContext(C,W)}try{const C={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Gc}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",Ae,!1),t.addEventListener("webglcontextcreationerror",Ee,!1),O===null){const W="webgl2";if(O=dn(W,C),O===null)throw dn(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let de,Ke,Te,St,Ge,k,R,K,re,le,ne,Be,me,Me,ot,ve,ke,qe,$e,Ce,gt,rt,Dt,G;function be(){de=new Sv(O),de.init(),rt=new r1(O,de),Ke=new yv(O,de,e,rt),Te=new i1(O,de),Ke.reverseDepthBuffer&&h&&Te.buffers.depth.setReversed(!0),St=new Ev(O),Ge=new W_,k=new s1(O,de,Te,Ge,Ke,rt,St),R=new _v(_),K=new bv(_),re=new L0(O),Dt=new mv(O,re),le=new xv(O,re,St,Dt),ne=new Rv(O,le,re,St),$e=new Av(O,Ke,k),ve=new vv(Ge),Be=new V_(_,R,K,de,Ke,Dt,ve),me=new h1(_,Ge),Me=new X_,ot=new J_(de),qe=new pv(_,R,K,Te,ne,f,l),ke=new t1(_,ne,Ke),G=new f1(O,St,Ke,Te),Ce=new gv(O,de,St),gt=new Tv(O,de,St),St.programs=Be.programs,_.capabilities=Ke,_.extensions=de,_.properties=Ge,_.renderLists=Me,_.shadowMap=ke,_.state=Te,_.info=St}be();const ee=new d1(_,O);this.xr=ee,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const C=de.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=de.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(C){C!==void 0&&(z=C,this.setSize(Y,U,!1))},this.getSize=function(C){return C.set(Y,U)},this.setSize=function(C,W,Z=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=C,U=W,t.width=Math.floor(C*z),t.height=Math.floor(W*z),Z===!0&&(t.style.width=C+"px",t.style.height=W+"px"),this.setViewport(0,0,C,W)},this.getDrawingBufferSize=function(C){return C.set(Y*z,U*z).floor()},this.setDrawingBufferSize=function(C,W,Z){Y=C,U=W,z=Z,t.width=Math.floor(C*Z),t.height=Math.floor(W*Z),this.setViewport(0,0,C,W)},this.getCurrentViewport=function(C){return C.copy(A)},this.getViewport=function(C){return C.copy(q)},this.setViewport=function(C,W,Z,J){C.isVector4?q.set(C.x,C.y,C.z,C.w):q.set(C,W,Z,J),Te.viewport(A.copy(q).multiplyScalar(z).round())},this.getScissor=function(C){return C.copy(Q)},this.setScissor=function(C,W,Z,J){C.isVector4?Q.set(C.x,C.y,C.z,C.w):Q.set(C,W,Z,J),Te.scissor(P.copy(Q).multiplyScalar(z).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(C){Te.setScissorTest(te=C)},this.setOpaqueSort=function(C){$=C},this.setTransparentSort=function(C){D=C},this.getClearColor=function(C){return C.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor.apply(qe,arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha.apply(qe,arguments)},this.clear=function(C=!0,W=!0,Z=!0){let J=0;if(C){let X=!1;if(E!==null){const ge=E.texture.format;X=ge===Kc||ge===Yc||ge===qc}if(X){const ge=E.texture.type,Se=ge===Ni||ge===Cs||ge===ha||ge===xr||ge===$c||ge===Xc,Le=qe.getClearColor(),Ue=qe.getClearAlpha(),Qe=Le.r,et=Le.g,Ye=Le.b;Se?(m[0]=Qe,m[1]=et,m[2]=Ye,m[3]=Ue,O.clearBufferuiv(O.COLOR,0,m)):(y[0]=Qe,y[1]=et,y[2]=Ye,y[3]=Ue,O.clearBufferiv(O.COLOR,0,y))}else J|=O.COLOR_BUFFER_BIT}W&&(J|=O.DEPTH_BUFFER_BIT),Z&&(J|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",Ae,!1),t.removeEventListener("webglcontextcreationerror",Ee,!1),qe.dispose(),Me.dispose(),ot.dispose(),Ge.dispose(),R.dispose(),K.dispose(),ne.dispose(),Dt.dispose(),G.dispose(),Be.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",ad),ee.removeEventListener("sessionend",od),is.stop()};function oe(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function Ae(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const C=St.autoReset,W=ke.enabled,Z=ke.autoUpdate,J=ke.needsUpdate,X=ke.type;be(),St.autoReset=C,ke.enabled=W,ke.autoUpdate=Z,ke.needsUpdate=J,ke.type=X}function Ee(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function it(C){const W=C.target;W.removeEventListener("dispose",it),zt(W)}function zt(C){pn(C),Ge.remove(C)}function pn(C){const W=Ge.get(C).programs;W!==void 0&&(W.forEach(function(Z){Be.releaseProgram(Z)}),C.isShaderMaterial&&Be.releaseShaderCache(C))}this.renderBufferDirect=function(C,W,Z,J,X,ge){W===null&&(W=Ne);const Se=X.isMesh&&X.matrixWorld.determinant()<0,Le=Ff(C,W,Z,J,X);Te.setMaterial(J,Se);let Ue=Z.index,Qe=1;if(J.wireframe===!0){if(Ue=le.getWireframeAttribute(Z),Ue===void 0)return;Qe=2}const et=Z.drawRange,Ye=Z.attributes.position;let vt=et.start*Qe,Tt=(et.start+et.count)*Qe;ge!==null&&(vt=Math.max(vt,ge.start*Qe),Tt=Math.min(Tt,(ge.start+ge.count)*Qe)),Ue!==null?(vt=Math.max(vt,0),Tt=Math.min(Tt,Ue.count)):Ye!=null&&(vt=Math.max(vt,0),Tt=Math.min(Tt,Ye.count));const Kt=Tt-vt;if(Kt<0||Kt===1/0)return;Dt.setup(X,J,Le,Z,Ue);let Gt,Mt=Ce;if(Ue!==null&&(Gt=re.get(Ue),Mt=gt,Mt.setIndex(Gt)),X.isMesh)J.wireframe===!0?(Te.setLineWidth(J.wireframeLinewidth*nt()),Mt.setMode(O.LINES)):Mt.setMode(O.TRIANGLES);else if(X.isLine){let je=J.linewidth;je===void 0&&(je=1),Te.setLineWidth(je*nt()),X.isLineSegments?Mt.setMode(O.LINES):X.isLineLoop?Mt.setMode(O.LINE_LOOP):Mt.setMode(O.LINE_STRIP)}else X.isPoints?Mt.setMode(O.POINTS):X.isSprite&&Mt.setMode(O.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)Mt.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(de.get("WEBGL_multi_draw"))Mt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const je=X._multiDrawStarts,un=X._multiDrawCounts,Et=X._multiDrawCount,Qn=Ue?re.get(Ue).bytesPerElement:1,ks=Ge.get(J).currentProgram.getUniforms();for(let Un=0;Un<Et;Un++)ks.setValue(O,"_gl_DrawID",Un),Mt.render(je[Un]/Qn,un[Un])}else if(X.isInstancedMesh)Mt.renderInstances(vt,Kt,X.count);else if(Z.isInstancedBufferGeometry){const je=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,un=Math.min(Z.instanceCount,je);Mt.renderInstances(vt,Kt,un)}else Mt.render(vt,Kt)};function At(C,W,Z){C.transparent===!0&&C.side===_t&&C.forceSinglePass===!1?(C.side=Pn,C.needsUpdate=!0,Ma(C,W,Z),C.side=es,C.needsUpdate=!0,Ma(C,W,Z),C.side=_t):Ma(C,W,Z)}this.compile=function(C,W,Z=null){Z===null&&(Z=C),p=ot.get(Z),p.init(W),w.push(p),Z.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),C!==Z&&C.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),p.setupLights();const J=new Set;return C.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const ge=X.material;if(ge)if(Array.isArray(ge))for(let Se=0;Se<ge.length;Se++){const Le=ge[Se];At(Le,Z,X),J.add(Le)}else At(ge,Z,X),J.add(ge)}),w.pop(),p=null,J},this.compileAsync=function(C,W,Z=null){const J=this.compile(C,W,Z);return new Promise(X=>{function ge(){if(J.forEach(function(Se){Ge.get(Se).currentProgram.isReady()&&J.delete(Se)}),J.size===0){X(C);return}setTimeout(ge,10)}de.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let Jn=null;function _i(C){Jn&&Jn(C)}function ad(){is.stop()}function od(){is.start()}const is=new lf;is.setAnimationLoop(_i),typeof self<"u"&&is.setContext(self),this.setAnimationLoop=function(C){Jn=C,ee.setAnimationLoop(C),C===null?is.stop():is.start()},ee.addEventListener("sessionstart",ad),ee.addEventListener("sessionend",od),this.render=function(C,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(W),W=ee.getCamera()),C.isScene===!0&&C.onBeforeRender(_,C,W,E),p=ot.get(C,w.length),p.init(W),w.push(p),ye.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),L.setFromProjectionMatrix(ye),ce=this.localClippingEnabled,j=ve.init(this.clippingPlanes,ce),g=Me.get(C,v.length),g.init(),v.push(g),ee.enabled===!0&&ee.isPresenting===!0){const ge=_.xr.getDepthSensingMesh();ge!==null&&zo(ge,W,-1/0,_.sortObjects)}zo(C,W,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort($,D),Xe=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,Xe&&qe.addToRenderList(g,C),this.info.render.frame++,j===!0&&ve.beginShadows();const Z=p.state.shadowsArray;ke.render(Z,C,W),j===!0&&ve.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=g.opaque,X=g.transmissive;if(p.setupLights(),W.isArrayCamera){const ge=W.cameras;if(X.length>0)for(let Se=0,Le=ge.length;Se<Le;Se++){const Ue=ge[Se];cd(J,X,C,Ue)}Xe&&qe.render(C);for(let Se=0,Le=ge.length;Se<Le;Se++){const Ue=ge[Se];ld(g,C,Ue,Ue.viewport)}}else X.length>0&&cd(J,X,C,W),Xe&&qe.render(C),ld(g,C,W);E!==null&&T===0&&(k.updateMultisampleRenderTarget(E),k.updateRenderTargetMipmap(E)),C.isScene===!0&&C.onAfterRender(_,C,W),Dt.resetDefaultState(),S=-1,x=null,w.pop(),w.length>0?(p=w[w.length-1],j===!0&&ve.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function zo(C,W,Z,J){if(C.visible===!1)return;if(C.layers.test(W.layers)){if(C.isGroup)Z=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(W);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||L.intersectsSprite(C)){J&&pe.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ye);const Se=ne.update(C),Le=C.material;Le.visible&&g.push(C,Se,Le,Z,pe.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||L.intersectsObject(C))){const Se=ne.update(C),Le=C.material;if(J&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),pe.copy(C.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),pe.copy(Se.boundingSphere.center)),pe.applyMatrix4(C.matrixWorld).applyMatrix4(ye)),Array.isArray(Le)){const Ue=Se.groups;for(let Qe=0,et=Ue.length;Qe<et;Qe++){const Ye=Ue[Qe],vt=Le[Ye.materialIndex];vt&&vt.visible&&g.push(C,Se,vt,Z,pe.z,Ye)}}else Le.visible&&g.push(C,Se,Le,Z,pe.z,null)}}const ge=C.children;for(let Se=0,Le=ge.length;Se<Le;Se++)zo(ge[Se],W,Z,J)}function ld(C,W,Z,J){const X=C.opaque,ge=C.transmissive,Se=C.transparent;p.setupLightsView(Z),j===!0&&ve.setGlobalState(_.clippingPlanes,Z),J&&Te.viewport(A.copy(J)),X.length>0&&wa(X,W,Z),ge.length>0&&wa(ge,W,Z),Se.length>0&&wa(Se,W,Z),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function cd(C,W,Z,J){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new Is(1,1,{generateMipmaps:!0,type:de.has("EXT_color_buffer_half_float")||de.has("EXT_color_buffer_float")?ga:Ni,minFilter:Pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:bt.workingColorSpace}));const ge=p.state.transmissionRenderTarget[J.id],Se=J.viewport||A;ge.setSize(Se.z*_.transmissionResolutionScale,Se.w*_.transmissionResolutionScale);const Le=_.getRenderTarget();_.setRenderTarget(ge),_.getClearColor(F),N=_.getClearAlpha(),N<1&&_.setClearColor(16777215,.5),_.clear(),Xe&&qe.render(Z);const Ue=_.toneMapping;_.toneMapping=Qi;const Qe=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),j===!0&&ve.setGlobalState(_.clippingPlanes,J),wa(C,Z,J),k.updateMultisampleRenderTarget(ge),k.updateRenderTargetMipmap(ge),de.has("WEBGL_multisampled_render_to_texture")===!1){let et=!1;for(let Ye=0,vt=W.length;Ye<vt;Ye++){const Tt=W[Ye],Kt=Tt.object,Gt=Tt.geometry,Mt=Tt.material,je=Tt.group;if(Mt.side===_t&&Kt.layers.test(J.layers)){const un=Mt.side;Mt.side=Pn,Mt.needsUpdate=!0,dd(Kt,Z,J,Gt,Mt,je),Mt.side=un,Mt.needsUpdate=!0,et=!0}}et===!0&&(k.updateMultisampleRenderTarget(ge),k.updateRenderTargetMipmap(ge))}_.setRenderTarget(Le),_.setClearColor(F,N),Qe!==void 0&&(J.viewport=Qe),_.toneMapping=Ue}function wa(C,W,Z){const J=W.isScene===!0?W.overrideMaterial:null;for(let X=0,ge=C.length;X<ge;X++){const Se=C[X],Le=Se.object,Ue=Se.geometry,Qe=J===null?Se.material:J,et=Se.group;Le.layers.test(Z.layers)&&dd(Le,W,Z,Ue,Qe,et)}}function dd(C,W,Z,J,X,ge){C.onBeforeRender(_,W,Z,J,X,ge),C.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),X.onBeforeRender(_,W,Z,J,C,ge),X.transparent===!0&&X.side===_t&&X.forceSinglePass===!1?(X.side=Pn,X.needsUpdate=!0,_.renderBufferDirect(Z,W,J,X,C,ge),X.side=es,X.needsUpdate=!0,_.renderBufferDirect(Z,W,J,X,C,ge),X.side=_t):_.renderBufferDirect(Z,W,J,X,C,ge),C.onAfterRender(_,W,Z,J,X,ge)}function Ma(C,W,Z){W.isScene!==!0&&(W=Ne);const J=Ge.get(C),X=p.state.lights,ge=p.state.shadowsArray,Se=X.state.version,Le=Be.getParameters(C,X.state,ge,W,Z),Ue=Be.getProgramCacheKey(Le);let Qe=J.programs;J.environment=C.isMeshStandardMaterial?W.environment:null,J.fog=W.fog,J.envMap=(C.isMeshStandardMaterial?K:R).get(C.envMap||J.environment),J.envMapRotation=J.environment!==null&&C.envMap===null?W.environmentRotation:C.envMapRotation,Qe===void 0&&(C.addEventListener("dispose",it),Qe=new Map,J.programs=Qe);let et=Qe.get(Ue);if(et!==void 0){if(J.currentProgram===et&&J.lightsStateVersion===Se)return hd(C,Le),et}else Le.uniforms=Be.getUniforms(C),C.onBeforeCompile(Le,_),et=Be.acquireProgram(Le,Ue),Qe.set(Ue,et),J.uniforms=Le.uniforms;const Ye=J.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ye.clippingPlanes=ve.uniform),hd(C,Le),J.needsLights=Hf(C),J.lightsStateVersion=Se,J.needsLights&&(Ye.ambientLightColor.value=X.state.ambient,Ye.lightProbe.value=X.state.probe,Ye.directionalLights.value=X.state.directional,Ye.directionalLightShadows.value=X.state.directionalShadow,Ye.spotLights.value=X.state.spot,Ye.spotLightShadows.value=X.state.spotShadow,Ye.rectAreaLights.value=X.state.rectArea,Ye.ltc_1.value=X.state.rectAreaLTC1,Ye.ltc_2.value=X.state.rectAreaLTC2,Ye.pointLights.value=X.state.point,Ye.pointLightShadows.value=X.state.pointShadow,Ye.hemisphereLights.value=X.state.hemi,Ye.directionalShadowMap.value=X.state.directionalShadowMap,Ye.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ye.spotShadowMap.value=X.state.spotShadowMap,Ye.spotLightMatrix.value=X.state.spotLightMatrix,Ye.spotLightMap.value=X.state.spotLightMap,Ye.pointShadowMap.value=X.state.pointShadowMap,Ye.pointShadowMatrix.value=X.state.pointShadowMatrix),J.currentProgram=et,J.uniformsList=null,et}function ud(C){if(C.uniformsList===null){const W=C.currentProgram.getUniforms();C.uniformsList=uo.seqWithValue(W.seq,C.uniforms)}return C.uniformsList}function hd(C,W){const Z=Ge.get(C);Z.outputColorSpace=W.outputColorSpace,Z.batching=W.batching,Z.batchingColor=W.batchingColor,Z.instancing=W.instancing,Z.instancingColor=W.instancingColor,Z.instancingMorph=W.instancingMorph,Z.skinning=W.skinning,Z.morphTargets=W.morphTargets,Z.morphNormals=W.morphNormals,Z.morphColors=W.morphColors,Z.morphTargetsCount=W.morphTargetsCount,Z.numClippingPlanes=W.numClippingPlanes,Z.numIntersection=W.numClipIntersection,Z.vertexAlphas=W.vertexAlphas,Z.vertexTangents=W.vertexTangents,Z.toneMapping=W.toneMapping}function Ff(C,W,Z,J,X){W.isScene!==!0&&(W=Ne),k.resetTextureUnits();const ge=W.fog,Se=J.isMeshStandardMaterial?W.environment:null,Le=E===null?_.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Er,Ue=(J.isMeshStandardMaterial?K:R).get(J.envMap||Se),Qe=J.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,et=!!Z.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ye=!!Z.morphAttributes.position,vt=!!Z.morphAttributes.normal,Tt=!!Z.morphAttributes.color;let Kt=Qi;J.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Kt=_.toneMapping);const Gt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Mt=Gt!==void 0?Gt.length:0,je=Ge.get(J),un=p.state.lights;if(j===!0&&(ce===!0||C!==x)){const Mn=C===x&&J.id===S;ve.setState(J,C,Mn)}let Et=!1;J.version===je.__version?(je.needsLights&&je.lightsStateVersion!==un.state.version||je.outputColorSpace!==Le||X.isBatchedMesh&&je.batching===!1||!X.isBatchedMesh&&je.batching===!0||X.isBatchedMesh&&je.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&je.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&je.instancing===!1||!X.isInstancedMesh&&je.instancing===!0||X.isSkinnedMesh&&je.skinning===!1||!X.isSkinnedMesh&&je.skinning===!0||X.isInstancedMesh&&je.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&je.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&je.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&je.instancingMorph===!1&&X.morphTexture!==null||je.envMap!==Ue||J.fog===!0&&je.fog!==ge||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==ve.numPlanes||je.numIntersection!==ve.numIntersection)||je.vertexAlphas!==Qe||je.vertexTangents!==et||je.morphTargets!==Ye||je.morphNormals!==vt||je.morphColors!==Tt||je.toneMapping!==Kt||je.morphTargetsCount!==Mt)&&(Et=!0):(Et=!0,je.__version=J.version);let Qn=je.currentProgram;Et===!0&&(Qn=Ma(J,W,X));let ks=!1,Un=!1,Ur=!1;const Nt=Qn.getUniforms(),Wn=je.uniforms;if(Te.useProgram(Qn.program)&&(ks=!0,Un=!0,Ur=!0),J.id!==S&&(S=J.id,Un=!0),ks||x!==C){Te.buffers.depth.getReversed()?(ae.copy(C.projectionMatrix),Km(ae),jm(ae),Nt.setValue(O,"projectionMatrix",ae)):Nt.setValue(O,"projectionMatrix",C.projectionMatrix),Nt.setValue(O,"viewMatrix",C.matrixWorldInverse);const En=Nt.map.cameraPosition;En!==void 0&&En.setValue(O,he.setFromMatrixPosition(C.matrixWorld)),Ke.logarithmicDepthBuffer&&Nt.setValue(O,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Nt.setValue(O,"isOrthographic",C.isOrthographicCamera===!0),x!==C&&(x=C,Un=!0,Ur=!0)}if(X.isSkinnedMesh){Nt.setOptional(O,X,"bindMatrix"),Nt.setOptional(O,X,"bindMatrixInverse");const Mn=X.skeleton;Mn&&(Mn.boneTexture===null&&Mn.computeBoneTexture(),Nt.setValue(O,"boneTexture",Mn.boneTexture,k))}X.isBatchedMesh&&(Nt.setOptional(O,X,"batchingTexture"),Nt.setValue(O,"batchingTexture",X._matricesTexture,k),Nt.setOptional(O,X,"batchingIdTexture"),Nt.setValue(O,"batchingIdTexture",X._indirectTexture,k),Nt.setOptional(O,X,"batchingColorTexture"),X._colorsTexture!==null&&Nt.setValue(O,"batchingColorTexture",X._colorsTexture,k));const $n=Z.morphAttributes;if(($n.position!==void 0||$n.normal!==void 0||$n.color!==void 0)&&$e.update(X,Z,Qn),(Un||je.receiveShadow!==X.receiveShadow)&&(je.receiveShadow=X.receiveShadow,Nt.setValue(O,"receiveShadow",X.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(Wn.envMap.value=Ue,Wn.flipEnvMap.value=Ue.isCubeTexture&&Ue.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&W.environment!==null&&(Wn.envMapIntensity.value=W.environmentIntensity),Un&&(Nt.setValue(O,"toneMappingExposure",_.toneMappingExposure),je.needsLights&&Bf(Wn,Ur),ge&&J.fog===!0&&me.refreshFogUniforms(Wn,ge),me.refreshMaterialUniforms(Wn,J,z,U,p.state.transmissionRenderTarget[C.id]),uo.upload(O,ud(je),Wn,k)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(uo.upload(O,ud(je),Wn,k),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Nt.setValue(O,"center",X.center),Nt.setValue(O,"modelViewMatrix",X.modelViewMatrix),Nt.setValue(O,"normalMatrix",X.normalMatrix),Nt.setValue(O,"modelMatrix",X.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Mn=J.uniformsGroups;for(let En=0,Go=Mn.length;En<Go;En++){const ss=Mn[En];G.update(ss,Qn),G.bind(ss,Qn)}}return Qn}function Bf(C,W){C.ambientLightColor.needsUpdate=W,C.lightProbe.needsUpdate=W,C.directionalLights.needsUpdate=W,C.directionalLightShadows.needsUpdate=W,C.pointLights.needsUpdate=W,C.pointLightShadows.needsUpdate=W,C.spotLights.needsUpdate=W,C.spotLightShadows.needsUpdate=W,C.rectAreaLights.needsUpdate=W,C.hemisphereLights.needsUpdate=W}function Hf(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(C,W,Z){Ge.get(C.texture).__webglTexture=W,Ge.get(C.depthTexture).__webglTexture=Z;const J=Ge.get(C);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=Z===void 0,J.__autoAllocateDepthBuffer||de.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,W){const Z=Ge.get(C);Z.__webglFramebuffer=W,Z.__useDefaultFramebuffer=W===void 0};const zf=O.createFramebuffer();this.setRenderTarget=function(C,W=0,Z=0){E=C,b=W,T=Z;let J=!0,X=null,ge=!1,Se=!1;if(C){const Ue=Ge.get(C);if(Ue.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(O.FRAMEBUFFER,null),J=!1;else if(Ue.__webglFramebuffer===void 0)k.setupRenderTarget(C);else if(Ue.__hasExternalTextures)k.rebindTextures(C,Ge.get(C.texture).__webglTexture,Ge.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Ye=C.depthTexture;if(Ue.__boundDepthTexture!==Ye){if(Ye!==null&&Ge.has(Ye)&&(C.width!==Ye.image.width||C.height!==Ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(C)}}const Qe=C.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(Se=!0);const et=Ge.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(et[W])?X=et[W][Z]:X=et[W],ge=!0):C.samples>0&&k.useMultisampledRTT(C)===!1?X=Ge.get(C).__webglMultisampledFramebuffer:Array.isArray(et)?X=et[Z]:X=et,A.copy(C.viewport),P.copy(C.scissor),I=C.scissorTest}else A.copy(q).multiplyScalar(z).floor(),P.copy(Q).multiplyScalar(z).floor(),I=te;if(Z!==0&&(X=zf),Te.bindFramebuffer(O.FRAMEBUFFER,X)&&J&&Te.drawBuffers(C,X),Te.viewport(A),Te.scissor(P),Te.setScissorTest(I),ge){const Ue=Ge.get(C.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ue.__webglTexture,Z)}else if(Se){const Ue=Ge.get(C.texture),Qe=W;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ue.__webglTexture,Z,Qe)}else if(C!==null&&Z!==0){const Ue=Ge.get(C.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ue.__webglTexture,Z)}S=-1},this.readRenderTargetPixels=function(C,W,Z,J,X,ge,Se){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=Ge.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Se!==void 0&&(Le=Le[Se]),Le){Te.bindFramebuffer(O.FRAMEBUFFER,Le);try{const Ue=C.texture,Qe=Ue.format,et=Ue.type;if(!Ke.textureFormatReadable(Qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ke.textureTypeReadable(et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=C.width-J&&Z>=0&&Z<=C.height-X&&O.readPixels(W,Z,J,X,rt.convert(Qe),rt.convert(et),ge)}finally{const Ue=E!==null?Ge.get(E).__webglFramebuffer:null;Te.bindFramebuffer(O.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(C,W,Z,J,X,ge,Se){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=Ge.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Se!==void 0&&(Le=Le[Se]),Le){const Ue=C.texture,Qe=Ue.format,et=Ue.type;if(!Ke.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ke.textureTypeReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=C.width-J&&Z>=0&&Z<=C.height-X){Te.bindFramebuffer(O.FRAMEBUFFER,Le);const Ye=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Ye),O.bufferData(O.PIXEL_PACK_BUFFER,ge.byteLength,O.STREAM_READ),O.readPixels(W,Z,J,X,rt.convert(Qe),rt.convert(et),0);const vt=E!==null?Ge.get(E).__webglFramebuffer:null;Te.bindFramebuffer(O.FRAMEBUFFER,vt);const Tt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Ym(O,Tt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Ye),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ge),O.deleteBuffer(Ye),O.deleteSync(Tt),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,W=null,Z=0){C.isTexture!==!0&&(sr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,C=arguments[1]);const J=Math.pow(2,-Z),X=Math.floor(C.image.width*J),ge=Math.floor(C.image.height*J),Se=W!==null?W.x:0,Le=W!==null?W.y:0;k.setTexture2D(C,0),O.copyTexSubImage2D(O.TEXTURE_2D,Z,0,0,Se,Le,X,ge),Te.unbindTexture()};const Gf=O.createFramebuffer(),Vf=O.createFramebuffer();this.copyTextureToTexture=function(C,W,Z=null,J=null,X=0,ge=null){C.isTexture!==!0&&(sr("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,C=arguments[1],W=arguments[2],ge=arguments[3]||0,Z=null),ge===null&&(X!==0?(sr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ge=X,X=0):ge=0);let Se,Le,Ue,Qe,et,Ye,vt,Tt,Kt;const Gt=C.isCompressedTexture?C.mipmaps[ge]:C.image;if(Z!==null)Se=Z.max.x-Z.min.x,Le=Z.max.y-Z.min.y,Ue=Z.isBox3?Z.max.z-Z.min.z:1,Qe=Z.min.x,et=Z.min.y,Ye=Z.isBox3?Z.min.z:0;else{const $n=Math.pow(2,-X);Se=Math.floor(Gt.width*$n),Le=Math.floor(Gt.height*$n),C.isDataArrayTexture?Ue=Gt.depth:C.isData3DTexture?Ue=Math.floor(Gt.depth*$n):Ue=1,Qe=0,et=0,Ye=0}J!==null?(vt=J.x,Tt=J.y,Kt=J.z):(vt=0,Tt=0,Kt=0);const Mt=rt.convert(W.format),je=rt.convert(W.type);let un;W.isData3DTexture?(k.setTexture3D(W,0),un=O.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(k.setTexture2DArray(W,0),un=O.TEXTURE_2D_ARRAY):(k.setTexture2D(W,0),un=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,W.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,W.unpackAlignment);const Et=O.getParameter(O.UNPACK_ROW_LENGTH),Qn=O.getParameter(O.UNPACK_IMAGE_HEIGHT),ks=O.getParameter(O.UNPACK_SKIP_PIXELS),Un=O.getParameter(O.UNPACK_SKIP_ROWS),Ur=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,Gt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Gt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Qe),O.pixelStorei(O.UNPACK_SKIP_ROWS,et),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ye);const Nt=C.isDataArrayTexture||C.isData3DTexture,Wn=W.isDataArrayTexture||W.isData3DTexture;if(C.isDepthTexture){const $n=Ge.get(C),Mn=Ge.get(W),En=Ge.get($n.__renderTarget),Go=Ge.get(Mn.__renderTarget);Te.bindFramebuffer(O.READ_FRAMEBUFFER,En.__webglFramebuffer),Te.bindFramebuffer(O.DRAW_FRAMEBUFFER,Go.__webglFramebuffer);for(let ss=0;ss<Ue;ss++)Nt&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ge.get(C).__webglTexture,X,Ye+ss),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ge.get(W).__webglTexture,ge,Kt+ss)),O.blitFramebuffer(Qe,et,Se,Le,vt,Tt,Se,Le,O.DEPTH_BUFFER_BIT,O.NEAREST);Te.bindFramebuffer(O.READ_FRAMEBUFFER,null),Te.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(X!==0||C.isRenderTargetTexture||Ge.has(C)){const $n=Ge.get(C),Mn=Ge.get(W);Te.bindFramebuffer(O.READ_FRAMEBUFFER,Gf),Te.bindFramebuffer(O.DRAW_FRAMEBUFFER,Vf);for(let En=0;En<Ue;En++)Nt?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,$n.__webglTexture,X,Ye+En):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,$n.__webglTexture,X),Wn?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Mn.__webglTexture,ge,Kt+En):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Mn.__webglTexture,ge),X!==0?O.blitFramebuffer(Qe,et,Se,Le,vt,Tt,Se,Le,O.COLOR_BUFFER_BIT,O.NEAREST):Wn?O.copyTexSubImage3D(un,ge,vt,Tt,Kt+En,Qe,et,Se,Le):O.copyTexSubImage2D(un,ge,vt,Tt,Qe,et,Se,Le);Te.bindFramebuffer(O.READ_FRAMEBUFFER,null),Te.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Wn?C.isDataTexture||C.isData3DTexture?O.texSubImage3D(un,ge,vt,Tt,Kt,Se,Le,Ue,Mt,je,Gt.data):W.isCompressedArrayTexture?O.compressedTexSubImage3D(un,ge,vt,Tt,Kt,Se,Le,Ue,Mt,Gt.data):O.texSubImage3D(un,ge,vt,Tt,Kt,Se,Le,Ue,Mt,je,Gt):C.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,ge,vt,Tt,Se,Le,Mt,je,Gt.data):C.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,ge,vt,Tt,Gt.width,Gt.height,Mt,Gt.data):O.texSubImage2D(O.TEXTURE_2D,ge,vt,Tt,Se,Le,Mt,je,Gt);O.pixelStorei(O.UNPACK_ROW_LENGTH,Et),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Qn),O.pixelStorei(O.UNPACK_SKIP_PIXELS,ks),O.pixelStorei(O.UNPACK_SKIP_ROWS,Un),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ur),ge===0&&W.generateMipmaps&&O.generateMipmap(un),Te.unbindTexture()},this.copyTextureToTexture3D=function(C,W,Z=null,J=null,X=0){return C.isTexture!==!0&&(sr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,J=arguments[1]||null,C=arguments[2],W=arguments[3],X=arguments[4]||0),sr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,W,Z,J,X)},this.initRenderTarget=function(C){Ge.get(C).__webglFramebuffer===void 0&&k.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?k.setTextureCube(C,0):C.isData3DTexture?k.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?k.setTexture2DArray(C,0):k.setTexture2D(C,0),Te.unbindTexture()},this.resetState=function(){b=0,T=0,E=null,Te.reset(),Dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=bt._getDrawingBufferColorSpace(e),t.unpackColorSpace=bt._getUnpackColorSpace()}}const Za=wt.degToRad(38),Ru=wt.degToRad(45),Cu=46,li=11.5,p1=.38,m1=3.2,Iu=.033,g1=5,y1=.7,v1=3.2,_1=2*Math.SQRT2,w1=new xe("#d6ebff"),M1=new xe("#586a85"),b1=new xe("#fff6e6"),S1=new xe("#bdd6ff"),x1=new xe("#0c1322"),T1=new xe("#152036"),E1=new xe("#1e2c46"),A1=new xe("#7c8cf8"),R1=new xe("#1e1b4b"),C1=new xe("#c7d2fe"),I1=new xe("#a78bfa"),P1=new xe("#040514"),k1=new xe("#0d0a2b"),L1=new xe("#1e1548"),D1=[{x:14,y:18,r:1.2,alpha:.9},{x:42,y:34,r:.9,alpha:.7},{x:88,y:22,r:1.4,alpha:.95},{x:112,y:48,r:1,alpha:.75},{x:26,y:68,r:1.1,alpha:.85},{x:66,y:54,r:.85,alpha:.65},{x:102,y:84,r:1.3,alpha:.85},{x:18,y:112,r:.9,alpha:.6},{x:54,y:98,r:1.2,alpha:.8},{x:80,y:124,r:.95,alpha:.6},{x:116,y:138,r:1.1,alpha:.55},{x:36,y:146,r:.85,alpha:.5},{x:74,y:168,r:1,alpha:.42},{x:12,y:182,r:.8,alpha:.35}],Pu=new xe,ku=new xe,Lu=new xe;function pf(i,e){const t=i.getContext("2d");if(!t)return;const n=i.width,s=i.height,r=wt.clamp(e,0,1);Pu.copy(x1).lerp(P1,r),ku.copy(T1).lerp(k1,r),Lu.copy(E1).lerp(L1,r);const a=t.createLinearGradient(0,0,0,s);if(a.addColorStop(0,`#${Pu.getHexString()}`),a.addColorStop(.5,`#${ku.getHexString()}`),a.addColorStop(1,`#${Lu.getHexString()}`),t.fillStyle=a,t.fillRect(0,0,n,s),r>.06)for(const o of D1)t.fillStyle=`rgba(224, 231, 255, ${(o.alpha*r).toFixed(3)})`,t.beginPath(),t.arc(o.x,o.y,o.r,0,Math.PI*2),t.fill()}function U1(){const i=document.createElement("canvas");i.width=128,i.height=256,pf(i,0);const e=new Sc(i);return e.colorSpace=hn,{canvas:i,texture:e}}class Du{container;scene;camera;renderer;callbacks=new Set;rafId=null;lastTime=0;elapsed=0;currentTarget=new B(0,0,0);desiredTarget=new B(0,0,0);currentAzimuth=Ru;desiredAzimuth=Ru;currentZoom=1.05;desiredViewShiftPx=0;currentViewShiftPx=0;desiredZoom=1.05;boardHalfExtent=12;lastBoardMapSize=null;idleOrbitEnabled=!1;hemiLight=null;sunLight=null;rimLight=null;skyCanvas;skyTexture;eclipseTarget=0;eclipseBlend=0;lastRenderedEclipseBlend=0;shakeTimeRemaining=0;shakeDuration=.001;shakeIntensity=0;resizeObserver=null;handleWindowResize;constructor(e){this.container=e,this.scene=new nf;const t=U1();this.skyCanvas=t.canvas,this.skyTexture=t.texture,this.scene.background=this.skyTexture,this.scene.fog=null;const n=Math.max(e.clientWidth,1),s=Math.max(e.clientHeight,1),r=n/s;this.camera=new Fo(-li*r,li*r,li,-li,.1,190),this.camera.zoom=this.currentZoom;const a=typeof window<"u"&&!!window.EldermereAndroid;this.renderer=new ff({antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:a}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(n,s),this.renderer.shadowMap.enabled=!a,this.renderer.shadowMap.type=Ph,this.renderer.toneMapping=Vc,this.renderer.toneMappingExposure=1.06,this.renderer.outputColorSpace=hn,this.renderer.domElement.style.touchAction="none",e.innerHTML="",e.appendChild(this.renderer.domElement),this.setupLighting(),this.updateCameraTransform(),this.handleWindowResize=()=>this.resize(),window.addEventListener("resize",this.handleWindowResize),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e))}setupLighting(){const e=new of("#d6ebff","#586a85",.78);e.position.set(0,30,0),this.hemiLight=e,this.scene.add(e);const t=new Mo("#fff6e6",2.3);t.position.set(36,44,6),t.castShadow=!0,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,t.shadow.camera.near=2,t.shadow.camera.far=135;const n=24;t.shadow.camera.left=-n,t.shadow.camera.right=n,t.shadow.camera.top=n,t.shadow.camera.bottom=-n,t.shadow.bias=-4e-4,t.shadow.normalBias=.03,t.shadow.radius=2.5,this.sunLight=t,this.scene.add(t);const s=new Mo("#bdd6ff",.36);s.position.set(-22,16,-20),this.rimLight=s,this.scene.add(s)}setEclipseMode(e){this.eclipseTarget=e?1:0,this.rafId===null&&(this.eclipseBlend=this.eclipseTarget,this.applyEclipseAtmosphere(this.eclipseBlend))}shakeCamera(e=.45,t=.48){this.shakeIntensity=Math.max(this.shakeIntensity,e),this.shakeDuration=Math.max(t,.05),this.shakeTimeRemaining=Math.max(this.shakeTimeRemaining,this.shakeDuration)}applyEclipseAtmosphere(e){const t=wt.clamp(e,0,1);this.lastRenderedEclipseBlend=t,this.hemiLight&&(this.hemiLight.color.copy(w1).lerp(A1,t),this.hemiLight.groundColor.copy(M1).lerp(R1,t),this.hemiLight.intensity=wt.lerp(.78,.64,t)),this.sunLight&&(this.sunLight.color.copy(b1).lerp(C1,t),this.sunLight.intensity=wt.lerp(2.3,1.38,t)),this.rimLight&&(this.rimLight.color.copy(S1).lerp(I1,t),this.rimLight.intensity=wt.lerp(.36,.88,t)),this.renderer.toneMappingExposure=wt.lerp(1.06,.94,t),pf(this.skyCanvas,t),this.skyTexture.needsUpdate=!0}setBoardBounds(e,t=2){if(this.boardHalfExtent=e*t*.54,this.sunLight){const n=Math.max(20,e*t*.85),s=this.sunLight.shadow.camera;s.left=-n,s.right=n,s.top=n,s.bottom=-n,s.far=Math.max(110,n*4.2),s.updateProjectionMatrix()}if(this.lastBoardMapSize!==e){this.lastBoardMapSize=e;const n=e>=18?.82:e>=16?.88:1.05;this.currentZoom=n,this.desiredZoom=n,this.camera.zoom=n,this.camera.updateProjectionMatrix()}this.clampDesiredTarget()}onUpdate(e){return this.callbacks.add(e),()=>{this.callbacks.delete(e)}}isRunning(){return this.rafId!==null}start(){if(this.rafId!==null)return;this.lastTime=performance.now();const e=t=>{this.rafId=requestAnimationFrame(e);const n=(t-this.lastTime)/1e3;this.lastTime=t;const s=Math.min(Math.max(n,0),Iu);this.elapsed+=s,this.stepCamera(s);for(const r of this.callbacks)try{r(s,this.elapsed)}catch(a){console.error("[SceneManager] frame callback error:",a)}this.renderer.render(this.scene,this.camera)};this.rafId=requestAnimationFrame(e)}stop(){this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null)}renderOnce(){this.stepCamera(0);for(const e of this.callbacks)e(0,this.elapsed);this.renderer.render(this.scene,this.camera)}resize(){const e=Math.max(this.container.clientWidth,1),t=Math.max(this.container.clientHeight,1),n=e/t;this.camera.left=-li*n,this.camera.right=li*n,this.camera.top=li,this.camera.bottom=-li,this.applyViewShift(),this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.rafId===null&&this.renderer.render(this.scene,this.camera)}setScreenOcclusion(e,t){const n=Math.max(this.container.clientHeight,1),s=(Math.max(0,t)-Math.max(0,e))/2;this.desiredViewShiftPx=wt.clamp(s,-n*.3,n*.3)}applyViewShift(){const e=Math.max(this.container.clientWidth,1),t=Math.max(this.container.clientHeight,1);Math.abs(this.currentViewShiftPx)<.5?this.camera.clearViewOffset():this.camera.setViewOffset(e,t,0,this.currentViewShiftPx,e,t)}panByScreenDelta(e,t){const n=Math.max(this.container.clientHeight,1),s=li*2/(n*this.currentZoom),r=Math.cos(this.currentAzimuth),a=Math.sin(this.currentAzimuth),o=-a,l=-r,c=r,d=-a,u=1/Math.sin(Za),h=-e*s,f=t*s*u;this.desiredTarget.x+=c*h+o*f,this.desiredTarget.z+=d*h+l*f,this.clampDesiredTarget()}panByAxes(e,t,n){if(e===0&&t===0)return;const s=16/this.currentZoom*n,r=Math.cos(this.currentAzimuth),a=Math.sin(this.currentAzimuth),o=-a,l=-r,c=r,d=-a;this.desiredTarget.x+=(c*e+o*t)*s,this.desiredTarget.z+=(d*e+l*t)*s,this.clampDesiredTarget()}zoomBy(e){const t=wt.clamp(e,-220,220),n=Math.exp(-t*.0014);this.zoomByFactor(n)}zoomByFactor(e){!Number.isFinite(e)||e<=0||(this.desiredZoom=wt.clamp(this.desiredZoom*e,p1,m1))}rotateStep(e){this.desiredAzimuth+=e*(Math.PI/2)}setIdleOrbit(e){this.idleOrbitEnabled=e,e||(this.desiredAzimuth=this.currentAzimuth)}frameOpeningZoom(e=!0){const t=Math.max(this.container.clientWidth,1),n=Math.max(this.container.clientHeight,1),s=t/n,r=g1*_1,a=r*Math.sin(Za),o=2*li*(s/r+1/a),l=wt.clamp(o*y1,1.2,v1);this.desiredZoom=l,e&&(this.currentZoom=l,this.camera.zoom=l,this.camera.updateProjectionMatrix())}focusOnWorld(e,t=!1){this.desiredTarget.set(e.x,0,e.z),this.clampDesiredTarget(),t&&(this.currentTarget.copy(this.desiredTarget),this.updateCameraTransform())}getDomElement(){return this.renderer.domElement}clampDesiredTarget(){this.desiredTarget.x=wt.clamp(this.desiredTarget.x,-this.boardHalfExtent,this.boardHalfExtent),this.desiredTarget.z=wt.clamp(this.desiredTarget.z,-this.boardHalfExtent,this.boardHalfExtent)}stepCamera(e){const t=Math.min(Math.max(e,0),Iu);this.idleOrbitEnabled&&(this.desiredAzimuth+=t*.14);const n=1-Math.exp(-11.5*t),s=1-Math.exp(-10.5*t),r=1-Math.exp(-12.5*t);if(this.currentTarget.distanceToSquared(this.desiredTarget)>1e-7?this.currentTarget.lerp(this.desiredTarget,n):this.currentTarget.copy(this.desiredTarget),Math.abs(this.desiredAzimuth-this.currentAzimuth)>1e-5?this.currentAzimuth=wt.lerp(this.currentAzimuth,this.desiredAzimuth,s):this.currentAzimuth=this.desiredAzimuth,Math.abs(this.desiredZoom-this.currentZoom)>1e-5?this.currentZoom=wt.lerp(this.currentZoom,this.desiredZoom,r):this.currentZoom=this.desiredZoom,Math.abs(this.desiredViewShiftPx-this.currentViewShiftPx)>.25&&(this.currentViewShiftPx=wt.lerp(this.currentViewShiftPx,this.desiredViewShiftPx,n),Math.abs(this.desiredViewShiftPx-this.currentViewShiftPx)<=.25&&(this.currentViewShiftPx=this.desiredViewShiftPx),this.applyViewShift(),this.camera.updateProjectionMatrix()),Math.abs(this.eclipseTarget-this.eclipseBlend)>1e-4){const a=1-Math.exp(-4.8*t);this.eclipseBlend=wt.lerp(this.eclipseBlend,this.eclipseTarget,a),Math.abs(this.eclipseTarget-this.eclipseBlend)<=.001&&(this.eclipseBlend=this.eclipseTarget),(Math.abs(this.eclipseBlend-this.lastRenderedEclipseBlend)>=.006||this.eclipseBlend===this.eclipseTarget)&&this.applyEclipseAtmosphere(this.eclipseBlend)}this.shakeTimeRemaining>0&&(this.shakeTimeRemaining=Math.max(0,this.shakeTimeRemaining-t),this.shakeTimeRemaining===0&&(this.shakeIntensity=0)),this.updateCameraTransform()}updateCameraTransform(){const e=Math.cos(Za)*Cu,t=Math.sin(Za)*Cu;let n=0,s=0,r=0;if(this.shakeTimeRemaining>0&&this.shakeIntensity>0){const a=this.shakeTimeRemaining/Math.max(this.shakeDuration,.001),o=this.shakeIntensity*a*a;n=(Math.random()-.5)*2*o,s=(Math.random()-.5)*1.4*o,r=(Math.random()-.5)*2*o}this.camera.position.set(this.currentTarget.x+Math.sin(this.currentAzimuth)*e+n,this.currentTarget.y+t+s,this.currentTarget.z+Math.cos(this.currentAzimuth)*e+r),this.camera.lookAt(this.currentTarget.x+n*.6,this.currentTarget.y+s*.4,this.currentTarget.z+r*.6),Math.abs(this.camera.zoom-this.currentZoom)>1e-6&&(this.camera.zoom=this.currentZoom,this.camera.updateProjectionMatrix())}dispose(){this.stop(),window.removeEventListener("resize",this.handleWindowResize),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.skyTexture.dispose(),this.renderer.dispose()}}const ie=256,O1={grass:{roughness:.88,metalness:0,bumpScale:.028},forest_floor:{roughness:.9,metalness:0,bumpScale:.032},ancient_floor:{roughness:.85,metalness:.02,bumpScale:.03},wasteland:{roughness:.9,metalness:.04,bumpScale:.055},water:{roughness:.24,metalness:.08,bumpScale:.032},rock:{roughness:.86,metalness:.02,bumpScale:.054},orc_rock:{roughness:.84,metalness:.06,bumpScale:.06},snow:{roughness:.72,metalness:.02,bumpScale:.024},bark:{roughness:.92,metalness:0,bumpScale:.05},foliage:{roughness:.84,metalness:0,bumpScale:.032},mallorn_foliage:{roughness:.8,metalness:.03,bumpScale:.032},cobble:{roughness:.85,metalness:.02,bumpScale:.048},stone_masonry:{roughness:.86,metalness:.02,bumpScale:.048},marble_masonry:{roughness:.6,metalness:.05,bumpScale:.034},dark_iron:{roughness:.46,metalness:.56,bumpScale:.048},granite_runic:{roughness:.82,metalness:.06,bumpScale:.052},roof_shingles:{roughness:.82,metalness:.02,bumpScale:.046},thatch:{roughness:.92,metalness:0,bumpScale:.048},timber:{roughness:.86,metalness:0,bumpScale:.042},farm_soil:{roughness:.94,metalness:0,bumpScale:.058},wheat:{roughness:.86,metalness:0,bumpScale:.04},road_cobble:{roughness:.85,metalness:.02,bumpScale:.048},bedrock_skirt:{roughness:.92,metalness:0,bumpScale:.05},cloud:{roughness:.95,metalness:0,bumpScale:.018}};function Tn(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Cn(i,e,t){let n=Math.imul(i,374761393)+Math.imul(e,668265263)+Math.imul(t,1442695041);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function en(i,e){return(i%e+e)%e}function Re(i){return i<0?0:i>255?255:Math.round(i)}function bo(i){return i<0?0:i>1?1:i}function Ml(i,e,t){return i+(e-i)*t}function pt(i,e,t){const n=bo((t-i)/(e-i));return n*n*(3-2*n)}function qt(i,e,t,n,s){const r=i*t,a=e*n,o=Math.floor(r),l=Math.floor(a),c=r-o,d=a-l,u=c*c*(3-2*c),h=d*d*(3-2*d),f=en(o,t),m=en(o+1,t),y=en(l,n),g=en(l+1,n),p=Cn(f,y,s),v=Cn(m,y,s),w=Cn(f,g,s),_=Cn(m,g,s),M=p+(v-p)*u,b=w+(_-w)*u;return M+(b-M)*h}function Fi(i,e,t,n,s,r){let a=0,o=.5,l=0,c=t,d=n;for(let u=0;u<s;u++)a+=o*qt(i,e,c,d,r+u*97),l+=o,o*=.5,c*=2,d*=2;return a/l}const N1={d1:0,d2:0,edge:0,cellHash:0,dx:0,dy:0};function Rr(i,e,t,n,s,r,a=N1){const o=i*t,l=e*n,c=Math.floor(o),d=Math.floor(l);let u=1e9,h=1e9,f=0,m=0,y=0;for(let g=-1;g<=1;g++)for(let p=-1;p<=1;p++){const v=c+p,w=d+g,_=en(v,t),M=en(w,n),b=(Cn(_,M,r)-.5)*s,T=(Cn(_,M,r+53)-.5)*s,E=v+.5+b,S=w+.5+T,x=o-E,A=l-S,P=Math.hypot(x,A);P<u?(h=u,u=P,f=Cn(_,M,r+131),m=x,y=A):P<h&&(h=P)}return a.d1=u,a.d2=h,a.edge=h-u,a.cellHash=f,a.dx=m,a.dy=y,a}function kn(i,e=ie){for(let t=-e;t<=e;t+=e)for(let n=-e;n<=e;n+=e)i(n,t)}function Cr(i,e=ie){i(-e),i(0),i(e)}function ue(i,e,t,n=1){const s=Re(i),r=Re(e),a=Re(t);return n>=1?`rgb(${s},${r},${a})`:`rgba(${s},${r},${a},${n.toFixed(3)})`}function Je(i,e=1){const t=Re(i);return e>=1?`rgb(${t},${t},${t})`:`rgba(${t},${t},${t},${e.toFixed(3)})`}function Vn(i,e,t){const n=i.createImageData(ie,ie),s=e.createImageData(ie,ie),r=n.data,a=s.data,o=1/ie;for(let l=0;l<ie;l++){const c=l*o;for(let d=0;d<ie;d++){const u=(l*ie+d)*4;t(d*o,c,d,l,r,a,u),r[u+3]=255,a[u+3]=255}}i.putImageData(n,0,0),e.putImageData(s,0,0)}function fi(i,e,t,n,s,r){const a=Math.min(r,n*.5,s*.5);i.beginPath(),i.moveTo(e+a,t),i.lineTo(e+n-a,t),i.quadraticCurveTo(e+n,t,e+n,t+a),i.lineTo(e+n,t+s-a),i.quadraticCurveTo(e+n,t+s,e+n-a,t+s),i.lineTo(e+a,t+s),i.quadraticCurveTo(e,t+s,e,t+s-a),i.lineTo(e,t+a),i.quadraticCurveTo(e,t,e+a,t),i.closePath()}function F1(i,e){Vn(i,e,(n,s,r,a,o,l,c)=>{const d=Fi(n,s,3,3,3,11),u=qt(n+.13*Math.sin(s*Math.PI*2),s,5,5,29),h=Math.min(n,1-n,s,1-s),f=1-pt(0,.085,h),m=(n+s<1?1:-1)*f*5,y=228+(d-.5)*24+(u-.5)*10+m;o[c]=Re(y-3+(d-.5)*6),o[c+1]=Re(y+4),o[c+2]=Re(y-7);const g=132+(d-.5)*34+(u-.5)*16-f*16,p=Re(g);l[c]=p,l[c+1]=p,l[c+2]=p});const t=Tn(101);for(let n=0;n<48;n++){const s=t()*ie,r=t()*ie,a=14+t()*24,o=5+t()*8,l=-.35+(t()-.5)*.55,c=t()>.45,d=c?ue(252,255,236,.24):ue(206,224,198,.22),u=c?Je(156,.22):Je(116,.2);kn((h,f)=>{i.save(),i.translate(s+h,r+f),i.rotate(l),i.fillStyle=d,i.beginPath(),i.ellipse(0,0,a,o,0,0,Math.PI*2),i.fill(),i.restore(),e.save(),e.translate(s+h,r+f),e.rotate(l),e.fillStyle=u,e.beginPath(),e.ellipse(0,0,a,o,0,0,Math.PI*2),e.fill(),e.restore()})}for(let n=0;n<62;n++){const s=t()*ie,r=t()*ie,a=.75+t()*.6,o=t()>.3;kn((l,c)=>{const d=s+l,u=r+c;i.fillStyle=ue(194,212,184,.35),i.beginPath(),i.ellipse(d+1,u+1.5,4.5*a,1.8*a,0,0,Math.PI*2),i.fill(),i.strokeStyle=o?ue(252,255,234,.72):ue(214,232,204,.65),i.lineWidth=1.6*a,i.lineCap="round",e.strokeStyle=Je(192,.65),e.lineWidth=1.8*a,e.lineCap="round";const h=[-4.2,-.4,3.8],f=[6.2,8,5.8];for(let m=0;m<3;m++){const y=h[m]*a,g=f[m]*a;i.beginPath(),i.moveTo(d,u),i.quadraticCurveTo(d+y*.35,u-g*.6,d+y,u-g),i.stroke(),e.beginPath(),e.moveTo(d,u),e.quadraticCurveTo(d+y*.35,u-g*.6,d+y,u-g),e.stroke()}})}}function Uu(i,e,t){const n=t?317:211;Vn(i,e,(a,o,l,c,d,u,h)=>{const f=Fi(a,o,4,4,3,n),m=pt(.42,.78,qt(a,o,3,3,n+41)),y=qt(a,o,8,8,n+83),g=(t?222:214)+(f-.5)*26+m*22+(y-.5)*8;t?(d[h]=Re(g+m*10-2),d[h+1]=Re(g+6),d[h+2]=Re(g-14-m*8)):(d[h]=Re(g+m*6-3),d[h+1]=Re(g+4),d[h+2]=Re(g-10));const p=Re(126+(f-.5)*44+(y-.5)*18);u[h]=p,u[h+1]=p,u[h+2]=p});const s=Tn(n+500);for(let a=0;a<42;a++){const o=s()*ie,l=s()*ie,c=8+s()*14,d=s()>.45,u=t?d?ue(246,250,212,.34):ue(202,232,206,.3):d?ue(236,246,214,.3):ue(196,216,188,.28);kn((h,f)=>{const m=i.createRadialGradient(o+h-c*.25,l+f-c*.25,c*.1,o+h,l+f,c);m.addColorStop(0,u),m.addColorStop(1,"rgba(220,235,210,0)"),i.fillStyle=m,i.beginPath(),i.arc(o+h,l+f,c,0,Math.PI*2),i.fill();const y=e.createRadialGradient(o+h,l+f,0,o+h,l+f,c);y.addColorStop(0,Je(185,.35)),y.addColorStop(1,Je(128,0)),e.fillStyle=y,e.beginPath(),e.arc(o+h,l+f,c,0,Math.PI*2),e.fill()})}const r=t?58:48;for(let a=0;a<r;a++){const o=s()*ie,l=s()*ie,c=s()*Math.PI*2,d=t?5.2+s()*4.5:3.5+s()*3.4,u=t?d*.44:d*.56,h=t?s()>.25?ue(255,240,168,.88):ue(255,224,128,.85):s()>.5?ue(246,228,194,.72):ue(222,232,198,.68);kn((f,m)=>{const y=o+f,g=l+m;i.save(),i.translate(y+1.1,g+1.3),i.rotate(c),i.fillStyle=ue(168,186,162,.35),i.beginPath(),i.moveTo(-d,0),i.quadraticCurveTo(0,-u,d,0),i.quadraticCurveTo(0,u,-d,0),i.fill(),i.restore(),i.save(),i.translate(y,g),i.rotate(c),i.fillStyle=h,i.beginPath(),i.moveTo(-d,0),i.quadraticCurveTo(0,-u,d,0),i.quadraticCurveTo(0,u,-d,0),i.fill(),t&&(i.strokeStyle=ue(255,252,226,.7),i.lineWidth=.8,i.beginPath(),i.moveTo(-d*.75,0),i.lineTo(d*.75,0),i.stroke()),i.restore(),e.save(),e.translate(y,g),e.rotate(c),e.fillStyle=Je(205,.6),e.beginPath(),e.moveTo(-d,0),e.quadraticCurveTo(0,-u,d,0),e.quadraticCurveTo(0,u,-d,0),e.fill(),e.restore()})}if(t)for(let a=0;a<24;a++){const o=s()*ie,l=s()*ie,c=1.2+s()*1.4;kn((d,u)=>{i.fillStyle=ue(255,250,212,.75),i.beginPath(),i.arc(o+d,l+u,c,0,Math.PI*2),i.fill()})}}function B1(i,e){const t={d1:0,d2:0,edge:0,cellHash:0,dx:0,dy:0};Vn(i,e,(n,s,r,a,o,l,c)=>{const d=(qt(n,s,4,4,401)-.5)*.035,u=(qt(n,s,4,4,419)-.5)*.035,h=en(n+d,1),f=en(s+u,1),m=Rr(h,f,6,6,.82,433),y=Rr(h,f,12,12,.75,461,t),g=Fi(n,s,5,5,3,479),p=1-pt(.015,.072,m.edge),v=(1-pt(.008,.038,y.edge))*.36,w=pt(.05,.095,m.edge)*(1-pt(.095,.16,m.edge)),_=228+(m.cellHash-.5)*20+(g-.5)*16,M=m.dx*-9+m.dy*-9;let b=_+M+w*14-p*86-v*34,T=_-2+M+w*12-p*88-v*36,E=_-5+M+w*10-p*84-v*34;const S=pt(.58,.84,g)*(1-p);b+=S*14,T+=S*11,E+=S*7;const x=qt(n,s,16,16,499),A=(1-pt(0,.038,m.edge))*pt(.75,.91,x);A>.01&&(b=Ml(b,255,A*.94),T=Ml(T,146,A*.86),E=Ml(E,48,A*.88)),o[c]=Re(b),o[c+1]=Re(T),o[c+2]=Re(E);const P=168+(m.cellHash-.5)*22+M*.9+w*28-p*125-v*46,I=Re(P);l[c]=I,l[c+1]=I,l[c+2]=I})}function H1(i,e){const t={d1:0,d2:0,edge:0,cellHash:0,dx:0,dy:0};Vn(i,e,(s,r,a,o,l,c,d)=>{const u=en(s+Math.sin(r*Math.PI*2*2)*.025+(qt(s,r,3,3,503)-.5)*.04,1),h=en(r+Math.cos(s*Math.PI*2*2)*.025+(qt(s,r,3,3,521)-.5)*.04,1),f=Rr(u,h,5,5,.85,541),m=Rr(en(u+.37,1),en(h+.21,1),7,7,.82,563,t),y=1-pt(0,.145,f.edge),g=(1-pt(0,.12,m.edge))*.65,p=bo(Math.max(y,g)+y*g*.4),v=.5+.32*Math.sin((s*2+r*1)*Math.PI*2+qt(s,r,2,2,577)*2.2)+.18*Math.cos((s*1-r*2)*Math.PI*2),w=206+v*16+p*46,_=228+v*14+p*27,M=236+v*12+p*19;l[d]=Re(w),l[d+1]=Re(_),l[d+2]=Re(M);const b=Re(118+v*48+p*56);c[d]=b,c[d+1]=b,c[d+2]=b});const n=Tn(587);for(let s=0;s<26;s++){const r=n()*ie,a=n()*ie,o=18+n()*24,l=3+n()*4.5,c=1.6+n()*1.4;kn((d,u)=>{const h=r+d,f=a+u;i.strokeStyle=ue(248,255,255,.45),i.lineWidth=c,i.lineCap="round",i.beginPath(),i.moveTo(h-o*.5,f),i.bezierCurveTo(h-o*.18,f-l,h+o*.18,f+l,h+o*.5,f-l*.25),i.stroke(),e.strokeStyle=Je(212,.35),e.lineWidth=c+1,e.lineCap="round",e.beginPath(),e.moveTo(h-o*.5,f),e.bezierCurveTo(h-o*.18,f-l,h+o*.18,f+l,h+o*.5,f-l*.25),e.stroke()})}}function Ou(i,e,t){const n=t?673:613;Vn(i,e,(a,o,l,c,d,u,h)=>{const f=Fi(a,o,3,3,3,n)-.5,m=t?(a*3+o*2)*2+f*1.35:(a*2+o*1)*3+f*1.15,y=m-Math.floor(m),g=t?Math.pow(1-Math.abs(y*2-1),.72):pt(0,.16,y)*(1-pt(.84,1,y)*.55),p=1-pt(0,t?.12:.1,y),v=pt(.08,.22,y)*(1-pt(.22,.42,y)),w=Rr(a,o,t?7:5,t?7:5,.78,n+29),_=(w.cellHash-.5)*(t?28:22)+(w.dx-w.dy)*14,M=1-pt(.008,t?.042:.032,w.edge),b=Math.abs(Math.sin((a*1-o*2)*Math.PI*2+Fi(a,o,4,4,3,n+71)*5.2)),T=1-pt(0,.035,b),S=(t?216:224)+(g-.5)*(t?34:26)+v*16-p*(t?46:34)+_-M*(t?54:38)+T*(t?-24:22);t?(d[h]=Re(S-2),d[h+1]=Re(S-3),d[h+2]=Re(S+3)):(d[h]=Re(S+2),d[h+1]=Re(S+1),d[h+2]=Re(S-2));const x=Re(138+(g-.5)*(t?74:56)+_*1.1-p*54-M*64);u[h]=x,u[h+1]=x,u[h+2]=x});const s=Tn(n+200),r=t?28:22;for(let a=0;a<r;a++){const o=s()*ie,l=s()*ie,c=14+s()*24,d=(t?-Math.atan2(3,2):-Math.atan2(2,1))+(s()-.5)*.16;kn((u,h)=>{i.save(),i.translate(o+u,l+h),i.rotate(d),i.strokeStyle=t?ue(246,248,255,.28):ue(254,252,246,.34),i.lineWidth=t?1.4:2,i.lineCap="round",i.beginPath(),i.moveTo(-c*.5,0),i.lineTo(c*.5,0),i.stroke(),i.restore()})}}function z1(i,e){Vn(i,e,(n,s,r,a,o,l,c)=>{const d=(Fi(n,s,3,3,2,709)-.5)*.45,u=(n*2+s*1)*Math.PI*2+d*Math.PI*2,h=.5+.5*Math.sin(u+.35*Math.sin(u)),f=.5+.5*Math.sin((n*3-s*1)*Math.PI*2+d*3),m=h*.72+f*.28,y=1-m;o[c]=Re(254-y*36),o[c+1]=Re(255-y*23),o[c+2]=Re(255-y*8);const g=Re(102+m*116);l[c]=g,l[c+1]=g,l[c+2]=g});const t=Tn(733);for(let n=0;n<18;n++){const s=t()*ie,r=t()*ie,a=26+t()*34,o=-.42+(t()-.5)*.14;kn((l,c)=>{i.save(),i.translate(s+l,r+c),i.rotate(o),i.strokeStyle=ue(255,255,255,.55),i.lineWidth=3.2,i.lineCap="round",i.beginPath(),i.moveTo(-a*.5,0),i.quadraticCurveTo(0,-4,a*.5,0),i.stroke(),i.restore()})}for(let n=0;n<42;n++){const s=t()*ie,r=t()*ie,a=1.4+t()*1.4;kn((o,l)=>{const c=s+o,d=r+l;i.strokeStyle=ue(255,255,255,.92),i.lineWidth=1.1,i.beginPath(),i.moveTo(c-a,d),i.lineTo(c+a,d),i.moveTo(c,d-a),i.lineTo(c,d+a),i.stroke()})}}function G1(i,e){const t=[{u:.28,v:.34,rx:.085,ry:.12},{u:.74,v:.72,rx:.075,ry:.105}];Vn(i,e,(n,s,r,a,o,l,c)=>{let d=0,u=0;for(let b=0;b<t.length;b++){const T=t[b];let E=n-T.u,S=s-T.v;E>.5&&(E-=1),E<-.5&&(E+=1),S>.5&&(S-=1),S<-.5&&(S+=1);const x=Math.hypot(E/T.rx,S/T.ry);if(x<1.65){const A=(1-pt(0,1.65,x))*(E>=0?1:-1);d+=A*.045,x<1&&(u=Math.max(u,.5+.5*Math.cos(x*Math.PI*4)))}}const h=(qt(n,s,3,4,809)-.5)*.045+d,f=(n+h)*11*Math.PI*2,m=.5+.5*Math.sin(f),y=qt(en(n+h,1),s,22,6,823),g=qt(n,s,8,18,839),p=1-pt(.08,.32,m),v=pt(.52,.88,Math.cos(f))*(1-p),w=pt(.84,.96,g)*(1-p)*.35,_=222+(m-.5)*34+(y-.5)*16+v*16-p*58-w*32-u*20;o[c]=Re(_+5),o[c+1]=Re(_),o[c+2]=Re(_-8);const M=Re(142+(m-.5)*90+(y-.5)*20-p*72+u*32);l[c]=M,l[c+1]=M,l[c+2]=M})}function Nu(i,e,t){const n=t?947:907;i.fillStyle=t?ue(206,208,176):ue(186,204,182),i.fillRect(0,0,ie,ie),e.fillStyle=Je(84),e.fillRect(0,0,ie,ie);const s=Tn(n),r=[{count:44,rMin:12,rMax:20,lumBase:204,bumpBase:126},{count:52,rMin:10,rMax:17,lumBase:226,bumpBase:168},{count:56,rMin:7,rMax:13,lumBase:244,bumpBase:212}];for(let a=0;a<r.length;a++){const o=r[a];for(let l=0;l<o.count;l++){const c=s()*ie,d=s()*ie,u=o.rMin+s()*(o.rMax-o.rMin),h=3+Math.floor(s()*3),f=s()*Math.PI*2,m=(s()-.5)*14,y=t&&a>=1&&s()>.42,g=y?255:Re(o.lumBase+m+(t?6:-3)),p=Re(y?242+(s()-.5)*14:o.lumBase+m+4),v=Re(y?178+(s()-.5)*28:o.lumBase+m-(t?18:8)),w=t?ue(178,182,146,.45):ue(156,178,154,.45),_=y?ue(255,253,224,.72):ue(252,255,240,.62),M=Je(o.bumpBase+(s()-.5)*14);kn((b,T)=>{const E=c+b,S=d+T;i.fillStyle=w,i.beginPath(),i.arc(E+2.2,S+2.6,u*.92,0,Math.PI*2),i.fill(),i.fillStyle=ue(g,p,v),e.fillStyle=M;for(let x=0;x<h;x++){const A=f+x/h*Math.PI*2,P=u*.42,I=u*(t?.56:.62),F=E+Math.cos(A)*P,N=S+Math.sin(A)*P;i.save(),i.translate(F,N),i.rotate(A),i.beginPath(),i.ellipse(0,0,I*(t?1.2:1),I*(t?.72:.92),0,0,Math.PI*2),i.fill(),i.restore(),e.save(),e.translate(F,N),e.rotate(A),e.beginPath(),e.ellipse(0,0,I*1.05,I*.85,0,0,Math.PI*2),e.fill(),e.restore()}i.fillStyle=_,i.beginPath(),i.ellipse(E-u*.25,S-u*.28,u*.44,u*.26,-.5,0,Math.PI*2),i.fill(),e.fillStyle=Je(Math.min(248,o.bumpBase+28),.55),e.beginPath(),e.arc(E-u*.12,S-u*.12,u*.42,0,Math.PI*2),e.fill()})}}}function V1(i,e){i.fillStyle=ue(178,173,165),i.fillRect(0,0,ie,ie),e.fillStyle=Je(52),e.fillRect(0,0,ie,ie);const t=Tn(1021),n=8,s=ie/n,r=3.2;for(let a=0;a<n;a++){const o=a%2===0?7:8,l=[];let c=0;for(let u=0;u<o;u++){const h=.82+t()*.36;l.push(h),c+=h}let d=a%2===0?0:ie/o*.48;for(let u=0;u<o;u++){const h=l[u]/c*ie,f=d+r*.5,m=a*s+r*.5+(t()-.5)*1.4,y=h-r,g=s-r,p=Math.min(y,g)*.34,v=222+(t()-.5)*28,w=(t()-.5)*10;kn((_,M)=>{const b=f+_,T=m+M;fi(i,b+.8,T+1.2,y,g,p),i.fillStyle=ue(156,151,144,.55),i.fill();const E=i.createLinearGradient(b,T,b+y,T+g);E.addColorStop(0,ue(v+18+w,v+16+w*.6,v+12)),E.addColorStop(.55,ue(v+w,v-1+w*.5,v-4)),E.addColorStop(1,ue(v-20+w*.5,v-21,v-22)),fi(i,b,T,y,g,p),i.fillStyle=E,i.fill(),i.strokeStyle=ue(255,252,245,.45),i.lineWidth=1.2,fi(i,b+1.2,T+1.2,y-2.4,g-2.4,Math.max(2,p-1)),i.stroke();const S=e.createRadialGradient(b+y*.44,T+g*.42,Math.min(y,g)*.08,b+y*.5,T+g*.5,Math.max(y,g)*.68);S.addColorStop(0,Je(232)),S.addColorStop(.7,Je(196)),S.addColorStop(1,Je(122)),fi(e,b,T,y,g,p),e.fillStyle=S,e.fill()}),d+=h}}}function W1(i,e){i.fillStyle=ue(184,176,164),i.fillRect(0,0,ie,ie),e.fillStyle=Je(58),e.fillRect(0,0,ie,ie);const t=Tn(1097),n=24,s=n+3,r=ie-s*2,a=6,o=ie/a,l=3.6;for(let u=0;u<a;u++){const h=u%2===0?4:5,f=[];let m=0;for(let g=0;g<h;g++){const p=.78+t()*.44;f.push(p),m+=p}let y=s;for(let g=0;g<h;g++){const p=f[g]/m*r,v=y+l*.5,w=u*o+l*.5,_=p-l,M=o-l,T=224+(1-Math.abs((v+_*.5)/ie-.5)*2)*14+(t()-.5)*20,E=Je(194+(t()-.5)*22);for(let S=-ie;S<=ie;S+=ie){const x=w+S,A=i.createLinearGradient(v,x,v+_,x+M);A.addColorStop(0,ue(T+12,T+10,T+5)),A.addColorStop(1,ue(T-14,T-15,T-18)),fi(i,v,x,_,M,6.5),i.fillStyle=A,i.fill(),i.strokeStyle=ue(252,248,238,.36),i.lineWidth=1.2,fi(i,v+1.4,x+1.4,_-2.8,M-2.8,5),i.stroke(),fi(e,v,x,_,M,6.5),e.fillStyle=E,e.fill()}y+=p}}const c=8,d=ie/c;for(let u=0;u<c;u++){const h=u*d+1.8,f=d-3.6,m=228+(t()-.5)*16,y=228+(t()-.5)*16,g=[[2,m],[ie-n-2,y]];for(let p=0;p<g.length;p++){const[v,w]=g[p];fi(i,v,h,n-2,f,4);const _=i.createLinearGradient(v,h,v+n,h+f);_.addColorStop(0,ue(w+14,w+13,w+10)),_.addColorStop(1,ue(w-18,w-19,w-20)),i.fillStyle=_,i.fill(),fi(e,v,h,n-2,f,4),e.fillStyle=Je(222),e.fill()}}}function bl(i,e,t){const n=t==="marble_masonry",s=t==="granite_runic",r=n?1217:s?1277:1151,a=Tn(r);i.fillStyle=n?ue(196,198,202):s?ue(156,158,164):ue(172,168,162),i.fillRect(0,0,ie,ie),e.fillStyle=Je(n?74:s?40:52),e.fillRect(0,0,ie,ie);const o=s?6:8,l=ie/o,c=n?2:s?3.8:2.8,d=2;for(let u=0;u<o;u++){const h=u*l;if(s&&u===d){const p=l-c,v=h+c*.5,w=i.createLinearGradient(0,v,0,v+p);w.addColorStop(0,ue(244,242,236)),w.addColorStop(.16,ue(224,224,226)),w.addColorStop(.84,ue(212,214,218)),w.addColorStop(1,ue(186,188,194)),i.fillStyle=w,i.fillRect(0,v,ie,p),e.fillStyle=Je(212),e.fillRect(0,v,ie,p),i.fillStyle=ue(164,166,174),i.fillRect(0,v+4.5,ie,2.2),i.fillRect(0,v+p-6.7,ie,2.2),i.fillStyle=ue(252,250,246,.7),i.fillRect(0,v+6.7,ie,1.4),i.fillRect(0,v+p-4.5,ie,1.4),e.fillStyle=Je(72),e.fillRect(0,v+4.5,ie,2.4),e.fillRect(0,v+p-6.9,ie,2.4);const _=8,M=ie/_,b=v+p*.5,T=p*.24,E=(S,x,A,P,I)=>{S.strokeStyle=P,S.lineWidth=I,S.lineCap="square",S.lineJoin="miter";for(let F=0;F<_;F++){const N=F*M+x,Y=N+M*.5,U=N+M;S.beginPath(),S.moveTo(N+4,b+A),S.lineTo(Y,b-T+A),S.lineTo(U-4,b+A),S.lineTo(Y,b+T+A),S.closePath(),S.stroke(),S.beginPath(),S.moveTo(Y,b-T*.55+A),S.lineTo(Y,b+T*.55+A),S.moveTo(N,b+A),S.lineTo(N+4,b+A),S.moveTo(U-4,b+A),S.lineTo(U,b+A),S.stroke()}};E(i,.9,1.1,ue(252,250,244,.8),2.2),E(i,0,0,ue(146,150,160),2.2),E(e,0,0,Je(56),2.8);continue}const f=s||n?4:5,m=[];let y=0;for(let p=0;p<f;p++){const v=n?.92+a()*.16:.8+a()*.4;m.push(v),y+=v}let g=u%2===0?0:ie/f*.5;for(let p=0;p<f;p++){const v=m[p]/y*ie,w=g+c*.5,_=h+c*.5,M=v-c,b=l-c,T=n?242+(a()-.5)*12:s?218+(a()-.5)*20:224+(a()-.5)*24,E=n?2:s?-1:(a()-.5)*8,S=s?3.5:n?1.8:2.4;Cr(x=>{const A=w+x,P=i.createLinearGradient(A,_,A,_+b);if(P.addColorStop(0,ue(T+10+E,T+10+E*.6,T+8)),P.addColorStop(.5,ue(T+E,T+E*.5,T-2)),P.addColorStop(1,ue(T-14+E*.4,T-15,T-16)),fi(i,A,_,M,b,s?2.5:1.5),i.fillStyle=P,i.fill(),i.fillStyle=ue(255,255,252,n?.65:.48),i.fillRect(A+1,_+1,M-2,S),i.fillRect(A+1,_+1,S,b-2),i.fillStyle=ue(164,166,174,s?.48:.32),i.fillRect(A+1,_+b-S,M-2,S),i.fillRect(A+M-S,_+1,S,b-2),n)i.strokeStyle=ue(212,218,228,.34),i.lineWidth=1.1,i.beginPath(),i.moveTo(A+M*.12,_+b*.78),i.bezierCurveTo(A+M*.38,_+b*.52,A+M*.62,_+b*.35,A+M*.88,_+b*.2),i.stroke();else for(let I=0;I<4;I++){const F=A+4+Cn(u*17+p,I,r+9)*Math.max(2,M-8),N=_+4+Cn(u*17+p,I,r+23)*Math.max(2,b-8);i.fillStyle=I%2===0?ue(250,248,242,.25):ue(176,176,178,.22),i.fillRect(F,N,4+I%3*2,1.8)}e.fillStyle=Je(148),e.fillRect(A,_,M,b),e.fillStyle=Je(n?214:206+(Cn(u,p,r)-.5)*24),e.fillRect(A+S,_+S,Math.max(1,M-S*2),Math.max(1,b-S*2))}),g+=v}}}function $1(i,e){Vn(i,e,(a,o,l,c,d,u,h)=>{const f=qt(a,o,3,42,1301),m=Rr(a,o,14,14,.75,1319),y=pt(0,.55,m.d1),g=212+(f-.5)*20+(y-.5)*20;d[h]=Re(g-2),d[h+1]=Re(g),d[h+2]=Re(g+5);const p=Re(152+(y-.5)*44+(f-.5)*14);u[h]=p,u[h+1]=p,u[h+2]=p});const t=4,n=2,s=ie/t,r=ie/n;for(let a=0;a<t;a++){const o=a%2===0?0:r*.5,l=a*s;i.fillStyle=ue(134,138,148),i.fillRect(0,l,ie,2.8),i.fillStyle=ue(248,250,255,.65),i.fillRect(0,l+2.8,ie,1.6),e.fillStyle=Je(42),e.fillRect(0,l,ie,3);for(let c=0;c<n;c++){const d=en(c*r+o,ie);i.fillStyle=ue(134,138,148),i.fillRect(d,l,2.8,s),i.fillStyle=ue(248,250,255,.55),i.fillRect(d+2.8,l,1.4,s),e.fillStyle=Je(42),e.fillRect(d,l,3,s);const u=9.5,h=[[u,u],[r-u,u],[u,s-u],[r-u,s-u]];for(let f=0;f<h.length;f++){const m=d+h[f][0],y=l+h[f][1];Cr(g=>{const p=m+g;i.fillStyle=ue(124,128,138,.8),i.beginPath(),i.arc(p+.9,y+1.1,3.8,0,Math.PI*2),i.fill();const v=i.createRadialGradient(p-1.2,y-1.2,.5,p,y,3.6);v.addColorStop(0,ue(255,255,255)),v.addColorStop(.55,ue(216,220,230)),v.addColorStop(1,ue(156,160,172)),i.fillStyle=v,i.beginPath(),i.arc(p,y,3.5,0,Math.PI*2),i.fill();const w=e.createRadialGradient(p,y,.4,p,y,3.8);w.addColorStop(0,Je(248)),w.addColorStop(.75,Je(204)),w.addColorStop(1,Je(118)),e.fillStyle=w,e.beginPath(),e.arc(p,y,3.8,0,Math.PI*2),e.fill()})}}}}function X1(i,e){i.fillStyle=ue(196,192,188),i.fillRect(0,0,ie,ie),e.fillStyle=Je(64),e.fillRect(0,0,ie,ie);const t=Tn(1409),n=8,s=8,r=ie/n,a=ie/s;for(let o=n;o>=-1;o--){const l=en(o,2)===0?0:a*.5,c=o*r;for(let d=-1;d<=s;d++){const u=d*a+l,h=en(o,n),f=en(d,s),y=222+(Cn(f,h,1423)-.5)*28,g=(Cn(f,h,1439)-.5)*10,p=c-r*.2,v=r*1.18,w=a*.5,_=p+v-w*.55,M=(E,S)=>{E.beginPath(),E.moveTo(u+.8,p+S),E.lineTo(u+a-.8,p+S),E.lineTo(u+a-.8,_+S),E.quadraticCurveTo(u+a*.5,p+v+w*.35+S,u+.8,_+S),E.closePath()};M(i,3.2),i.fillStyle=ue(146,142,140,.62),i.fill();const b=i.createLinearGradient(u,p,u,p+v);b.addColorStop(0,ue(y-14+g*.5,y-15,y-16)),b.addColorStop(.55,ue(y+g,y+g*.4,y-2)),b.addColorStop(1,ue(y+18+g,y+16+g*.5,y+12)),M(i,0),i.fillStyle=b,i.fill(),i.strokeStyle=ue(255,252,245,.55),i.lineWidth=1.3,i.beginPath(),i.moveTo(u+2,_),i.quadraticCurveTo(u+a*.5,p+v+w*.28,u+a-2,_),i.stroke(),i.strokeStyle=ue(162,158,154,.45),i.lineWidth=1,i.beginPath(),i.moveTo(u+.8,p),i.lineTo(u+.8,_),i.stroke(),M(e,2.2),e.fillStyle=Je(52),e.fill();const T=e.createLinearGradient(u,p,u,p+v);T.addColorStop(0,Je(112)),T.addColorStop(.85,Je(226)),T.addColorStop(1,Je(242)),M(e,0),e.fillStyle=T,e.fill()}}for(let o=0;o<24;o++){const l=t()*ie,c=t()*ie;i.fillStyle=ue(252,250,244,.2),i.fillRect(l,c,4,2)}}function q1(i,e){i.fillStyle=ue(224,212,184),i.fillRect(0,0,ie,ie),e.fillStyle=Je(110),e.fillRect(0,0,ie,ie);const t=Tn(1511),n=4,s=ie/n;for(let r=n;r>=-1;r--){const a=r*s-10,o=(r+1)*s,l=i.createLinearGradient(0,o-4,0,o+12);l.addColorStop(0,ue(166,148,118,.65)),l.addColorStop(1,ue(166,148,118,0)),i.fillStyle=l,i.fillRect(0,o-4,ie,16);const c=e.createLinearGradient(0,o-2,0,o+10);c.addColorStop(0,Je(48,.85)),c.addColorStop(1,Je(120,0)),e.fillStyle=c,e.fillRect(0,o-2,ie,12);const d=130;for(let h=0;h<d;h++){const f=h/d*ie+(t()-.5)*3.5,m=(t()-.5)*7,y=(t()-.3)*9,g=t(),p=g>.65?ue(255,248,216,.92):g>.25?ue(238,224,188,.88):ue(206,188,152,.85),v=g>.65?228:g>.25?182:128,w=1.6+t()*1.4;Cr(_=>{const M=f+_;i.strokeStyle=p,i.lineWidth=w,i.lineCap="round",i.beginPath(),i.moveTo(M,a),i.quadraticCurveTo(M+m*.5,(a+o)*.5,M+m,o+y),i.stroke(),e.strokeStyle=Je(v,.85),e.lineWidth=2,e.lineCap="round",e.beginPath(),e.moveTo(M,a),e.lineTo(M+m,o+y),e.stroke()})}const u=a+s*.42;i.strokeStyle=ue(188,168,134,.5),i.lineWidth=2.2,i.beginPath(),i.moveTo(0,u),i.lineTo(ie,u),i.stroke(),e.strokeStyle=Je(158,.6),e.lineWidth=2.6,e.beginPath(),e.moveTo(0,u),e.lineTo(ie,u),e.stroke()}}function Y1(i,e){const n=ie/6;Vn(i,e,(s,r,a,o,l,c,d)=>{const u=Math.floor(r*6),h=r*6-u,f=1601+u*37,m=(Cn(u,0,1609)-.5)*18,y=Math.sin((s*2+Cn(u,1,1613))*Math.PI*2)*.35+(qt(s,h,3,2,f)-.5)*1.4,g=Math.sin((h*5.2+y)*Math.PI*2),p=qt(s,r,4,28,f+17),v=1-pt(0,.065,h)+pt(.935,1,h),w=pt(.055,.11,h)*(1-pt(.11,.2,h)),_=226+m+g*11+(p-.5)*12+w*14-bo(v)*66;l[d]=Re(_+6),l[d+1]=Re(_+1),l[d+2]=Re(_-9);const M=Re(174+g*16+(p-.5)*14+w*18-bo(v)*118);c[d]=M,c[d+1]=M,c[d+2]=M});for(let s=0;s<6;s++){const r=s*n,a=en((s*.37+.18)*ie,ie);i.fillStyle=ue(146,134,120),i.fillRect(a-1.2,r+1.5,2.4,n-3),i.fillStyle=ue(248,242,230,.55),i.fillRect(a+1.2,r+1.5,1.2,n-3),e.fillStyle=Je(48),e.fillRect(a-1.4,r+1,2.8,n-2);const o=[a-8,a+8],l=[r+n*.3,r+n*.72];for(let c=0;c<o.length;c++)for(let d=0;d<l.length;d++)Cr(u=>{const h=o[c]+u,f=l[d];i.fillStyle=ue(128,122,118),i.beginPath(),i.arc(h,f,2.6,0,Math.PI*2),i.fill(),i.fillStyle=ue(238,236,234,.7),i.beginPath(),i.arc(h-.7,f-.7,1,0,Math.PI*2),i.fill(),e.fillStyle=Je(228),e.beginPath(),e.arc(h,f,2.6,0,Math.PI*2),e.fill()})}}function K1(i,e){Vn(i,e,(s,r,a,o,l,c,d)=>{const u=(qt(s,r,4,4,1709)-.5)*.18,h=(r*8+u)*Math.PI*2,f=.5+.5*Math.sin(h),m=Math.cos(h)*.5,y=Fi(s,r,10,10,2,1723),g=204+f*38+m*18+(y-.5)*18;l[d]=Re(g+6),l[d+1]=Re(g),l[d+2]=Re(g-9);const p=Re(56+f*168+(y-.5)*28);c[d]=p,c[d+1]=p,c[d+2]=p});const n=Tn(1741);for(let s=0;s<65;s++){const r=n()*ie,o=(Math.floor(n()*8)+.25+(n()-.5)*.35)*(ie/8),l=2.6+n()*3.4,c=1.8+n()*2.4,d=n()>.4,u=n()*Math.PI;kn((h,f)=>{i.fillStyle=d?ue(246,236,220,.55):ue(176,162,146,.45),i.beginPath(),i.ellipse(r+h,o+f,l,c,u,0,Math.PI*2),i.fill(),e.fillStyle=Je(d?224:156,.55),e.beginPath(),e.ellipse(r+h,o+f,l,c,u,0,Math.PI*2),e.fill()})}}function j1(i,e){Vn(i,e,(s,r,a,o,l,c,d)=>{const u=Math.sin(s*Math.PI*2*2)*.22,h=.5+.5*Math.sin((r*8+u)*Math.PI*2),f=qt(s,r,6,8,1801),m=212+h*30+(f-.5)*14;l[d]=Re(m+10),l[d+1]=Re(m+4),l[d+2]=Re(m-24);const y=Re(92+h*110+(f-.5)*26);c[d]=y,c[d+1]=y,c[d+2]=y});const n=Tn(1831);for(let s=0;s<150;s++){const r=n()*ie,a=n()*ie,o=10+n()*10,l=-.58+Math.sin(r/ie*Math.PI*4)*.16+(n()-.5)*.18,c=n()>.35;kn((d,u)=>{const h=r+d,f=a+u,m=h+Math.cos(l)*o,y=f+Math.sin(l)*o;i.strokeStyle=c?ue(252,242,198,.78):ue(216,198,148,.7),i.lineWidth=1.5,i.lineCap="round",i.beginPath(),i.moveTo(h,f),i.quadraticCurveTo((h+m)*.5,(f+y)*.5-2.2,m,y),i.stroke(),i.save(),i.translate(m,y),i.rotate(l),i.fillStyle=c?ue(255,250,214,.92):ue(236,218,166,.85),i.beginPath(),i.ellipse(0,0,3.8,1.7,0,0,Math.PI*2),i.fill(),i.restore(),e.strokeStyle=Je(c?228:172,.7),e.lineWidth=2,e.beginPath(),e.moveTo(h,f),e.lineTo(m,y),e.stroke()})}}function Z1(i,e){Vn(i,e,(n,s,r,a,o,l,c)=>{const d=.165+.022*Math.sin(n*Math.PI*2*3)+.012*Math.cos(n*Math.PI*2*7+1.1)+(qt(n,.15,10,2,1901)-.5)*.022,u=.56+.026*Math.sin(n*Math.PI*2*2+.6)+(qt(n,.55,6,2,1913)-.5)*.04,h=Fi(n,s,6,6,3,1931);let f,m,y,g;if(s<d){const v=1-pt(0,.055,s),w=pt(d-.04,d,s),_=(h-.5)*26+v*26-w*38;f=114+_*.85,m=176+_,y=76+_*.6,g=228-w*36+(h-.5)*20}else if(s<u){const v=1-pt(d,d+.06,s),w=(s-d)/Math.max(.01,u-d),_=Math.sin(s*34+(h-.5)*2.4)*10,M=-w*28+_+(h-.5)*20-v*54;f=176+M,m=126+M*.82,y=84+M*.62,g=152+_*1.4+(h-.5)*28-v*82}else{const v=1-pt(u,u+.04,s),w=(s-u)/Math.max(.01,1-u),_=s*10+(qt(n,s,5,4,1949)-.5)*.6,M=_-Math.floor(_),b=1-pt(0,.14,M),T=pt(.12,.25,M)*(1-pt(.25,.45,M)),E=-w*28+(h-.5)*22+T*24-b*34-v*28;f=92+E*.9,m=100+E*.95,y=116+E,g=148+T*36-b*68-v*48+(h-.5)*24}o[c]=Re(f),o[c+1]=Re(m),o[c+2]=Re(y);const p=Re(g);l[c]=p,l[c+1]=p,l[c+2]=p});const t=Tn(1973);for(let n=0;n<24;n++){const s=t()*ie,r=58+t()*78,a=3+t()*4.5,o=2+t()*2.8,l=(t()-.5)*.4;Cr(c=>{i.fillStyle=ue(146,134,122,.8),i.beginPath(),i.ellipse(s+c,r,a,o,l,0,Math.PI*2),i.fill(),i.fillStyle=ue(192,180,166,.55),i.beginPath(),i.ellipse(s+c-a*.2,r-o*.25,a*.55,o*.45,l,0,Math.PI*2),i.fill(),e.fillStyle=Je(205,.75),e.beginPath(),e.ellipse(s+c,r,a,o,l,0,Math.PI*2),e.fill()})}for(let n=0;n<12;n++){const s=n/12*ie+(t()-.5)*14,r=152+t()*58,a=22+t()*28,o=(t()-.5)*6;Cr(l=>{i.strokeStyle=ue(44,50,64,.72),i.lineWidth=2,i.beginPath(),i.moveTo(s+l,r),i.lineTo(s+l+o,Math.min(ie,r+a)),i.stroke(),i.strokeStyle=ue(134,144,162,.4),i.lineWidth=1.2,i.beginPath(),i.moveTo(s+l+1.8,r),i.lineTo(s+l+o+1.8,Math.min(ie,r+a)),i.stroke(),e.strokeStyle=Je(54,.78),e.lineWidth=2.6,e.beginPath(),e.moveTo(s+l,r),e.lineTo(s+l+o,Math.min(ie,r+a)),e.stroke()})}}function J1(i,e){Vn(i,e,(n,s,r,a,o,l,c)=>{const d=Fi(n,s,3,3,3,2003),u=qt(n,s,5,5,2017),h=d*.72+u*.28,f=1-pt(.28,.82,h);o[c]=Re(255-f*24),o[c+1]=Re(255-f*16),o[c+2]=Re(255-f*6);const m=Re(112+h*84);l[c]=m,l[c+1]=m,l[c+2]=m});const t=Tn(2039);for(let n=0;n<24;n++){const s=t()*ie,r=t()*ie,a=20+t()*26;kn((o,l)=>{const c=s+o,d=r+l,u=i.createRadialGradient(c+a*.14,d+a*.2,a*.1,c,d,a);u.addColorStop(0,ue(224,234,249,.28)),u.addColorStop(1,ue(224,234,249,0)),i.fillStyle=u,i.beginPath(),i.arc(c,d,a,0,Math.PI*2),i.fill();const h=i.createRadialGradient(c-a*.16,d-a*.2,a*.05,c-a*.08,d-a*.1,a*.82);h.addColorStop(0,ue(255,255,255,.58)),h.addColorStop(1,ue(255,255,255,0)),i.fillStyle=h,i.beginPath(),i.arc(c-a*.08,d-a*.1,a*.82,0,Math.PI*2),i.fill();const f=e.createRadialGradient(c,d,0,c,d,a*.85);f.addColorStop(0,Je(192,.3)),f.addColorStop(1,Je(128,0)),e.fillStyle=f,e.beginPath(),e.arc(c,d,a*.85,0,Math.PI*2),e.fill()})}}const Fu=new Map,Bu=new Map,Hu=new Map,sa=[];function zu(){return{width:ie,height:ie}}function Gu(i,e){return i.colorSpace=e?hn:Ii,i.wrapS=ua,i.wrapT=ua,i.magFilter=Zn,i.minFilter=Pi,i.anisotropy=4,i.needsUpdate=!0,i}function Q1(i,e,t){switch(i){case"grass":F1(e,t);break;case"forest_floor":Uu(e,t,!1);break;case"ancient_floor":Uu(e,t,!0);break;case"wasteland":B1(e,t);break;case"water":H1(e,t);break;case"rock":Ou(e,t,!1);break;case"orc_rock":Ou(e,t,!0);break;case"snow":z1(e,t);break;case"bark":G1(e,t);break;case"foliage":Nu(e,t,!1);break;case"mallorn_foliage":Nu(e,t,!0);break;case"cobble":V1(e,t);break;case"road_cobble":W1(e,t);break;case"stone_masonry":bl(e,t,"stone_masonry");break;case"marble_masonry":bl(e,t,"marble_masonry");break;case"granite_runic":bl(e,t,"granite_runic");break;case"dark_iron":$1(e,t);break;case"roof_shingles":X1(e,t);break;case"thatch":q1(e,t);break;case"timber":Y1(e,t);break;case"farm_soil":K1(e,t);break;case"wheat":j1(e,t);break;case"bedrock_skirt":Z1(e,t);break;case"cloud":J1(e,t);break}}function ew(i){const e=Fu.get(i);if(e)return e;let t,n;if(typeof document<"u"&&typeof document.createElement=="function"){t=document.createElement("canvas"),t.width=ie,t.height=ie,n=document.createElement("canvas"),n.width=ie,n.height=ie;const r=t.getContext("2d"),a=n.getContext("2d");r&&a&&Q1(i,r,a)}else t=zu(),n=zu();const s={map:Gu(new Sc(t),!0),bumpMap:Gu(new Sc(n),!1)};return Fu.set(i,s),i==="water"&&sa.push(s),s}function tw(i,e,t){const n=ew(i);if(e===1&&t===1)return n;const s=`${i}|${e}|${t}`,r=Bu.get(s);if(r)return r;const a=n.map.clone();a.repeat.set(e,t),a.needsUpdate=!0;const o=n.bumpMap.clone();o.repeat.set(e,t),o.needsUpdate=!0;const l={map:a,bumpMap:o};return Bu.set(s,l),i==="water"&&sa.push(l),l}function Vu(i,e){return i===void 0?e:typeof i=="number"?`#${(i>>>0).toString(16).padStart(6,"0")}`:i.toLowerCase()}function We(i,e){const t=O1[i],n=Vu(e?.color,"#ffffff"),s=e?.roughness??t.roughness,r=e?.metalness??t.metalness,a=e?.bumpScale??t.bumpScale,o=Vu(e?.emissive,"#000000"),l=e?.emissiveIntensity??0,c=e?.transparent??!1,d=e?.opacity??1,u=e?.flatShading??!1,h=e?.repeatX??1,f=e?.repeatY??1,m=[i,n,s,r,a,o,l,c?1:0,d,u?1:0,h,f].join("|"),y=Hu.get(m);if(y)return y;const{map:g,bumpMap:p}=tw(i,h,f),v=new pi({color:e?.color!==void 0?new xe(e.color):new xe(16777215),map:g,bumpMap:p,bumpScale:a,roughness:s,metalness:r,emissive:e?.emissive!==void 0?new xe(e.emissive):new xe(0),emissiveIntensity:l,transparent:c,opacity:d,flatShading:u});return Hu.set(m,v),v}function nw(i){if(!Number.isFinite(i)||i<=0||sa.length===0)return;const e=i*.036,t=i*.022,n=-i*.02,s=i*.028;for(let r=0;r<sa.length;r++){const a=sa[r];a.map.offset.x=(a.map.offset.x+e)%1,a.map.offset.y=(a.map.offset.y+t)%1,a.bumpMap.offset.x=en(a.bumpMap.offset.x+n,1),a.bumpMap.offset.y=(a.bumpMap.offset.y+s)%1}}const gr=2,fe=.22,Vr=-.08,Ts=.28,Es=.28,Jt=.24,bs=.22,Ss=.22,Zi=.54,iw=.12,sw=.12,rw=.04;function ht(i,e,t,n=0){const s=(t-1)/2;return new B((i-s)*gr,n,(e-s)*gr)}function Ai(i,e,t){const n=_e(i,e,t),s=ht(e,t,i.mapSize,fe);return n?.isCityCenter?(s.x+=Ts,s.y+=Jt,s.z+=Es):n?.hasVillage?(s.x+=Ts,s.z+=Es):n?.terrain==="mountain"?(s.x+=bs,s.y+=Zi,s.z+=Ss):(n?.terrain==="forest"||n?.terrain==="ancient_woods")&&(s.x+=iw,s.y+=rw,s.z+=sw),s}function It(i,e,t){const n=Math.sin(i*127.1+e*311.7+t*74.7)*43758.5453123;return n-Math.floor(n)}const Wu=new Map;function yt(i,e){const t=JSON.stringify([i,e??{}]);let n=Wu.get(t);return n||(n=new pi({color:i,flatShading:!0,roughness:e?.roughness??.88,metalness:e?.metalness??0,emissive:e?.emissive?new xe(e.emissive):new xe(0),emissiveIntensity:e?.emissiveIntensity??0,transparent:e?.transparent??!1,opacity:e?.opacity??1}),Wu.set(t,n)),n}const aw=new Ie(1.996,.22,1.996),ow=new Ie(1.998,.28,1.998),lw=new Ie(2,.26,2),cw=new Ie(1.996,.26,1.996),dw=new tn(.055,.16,4),_a=new Zt(.052,0),mf=new Lt(.055,.085,.28,5),$u=new tn(.3,.42,6),Xu=new tn(.21,.34,6),ra=new Hi(.27,0),uw=new tn(.62,1.05,6),hw=new tn(.28,.44,6),fw=new Lt(.49,.6,Zi,7),pw=new Lt(.47,.49,.032,7),mw=new tn(.14,.42,4),gf=new Hi(.17,0),qu=new Zt(.16,0),Ja=new Ie(1.98,.04,.14),gw=new lt({visible:!1}),Yu={humans:["#7ed14d","#76c847"],orcs:["#7c7573","#736c6b"],elves:["#5ecc91","#56c288"],dwarves:["#7ba863","#739f5c"]},yw={humans:["#5eb542","#57ac3d"],orcs:["#676166","#605a5f"],elves:["#45ae78","#3fa571"],dwarves:["#5f8850","#58804a"]},vw={humans:["#3c993a","#57b548"],orcs:["#544c59","#645b6b"],elves:["#2ea874","#f2c94c"],dwarves:["#36755c","#458b6f"]};function Ci(i,e,t,n){const s=new ze,r=ht(i.x,i.y,e,0);s.position.copy(r);const a=[],o=[],l=[];let c=null,d=null;const u=new V(cw,gw);if(u.position.y=fe*.5,u.userData={tileX:i.x,tileY:i.y},s.add(u),i.terrain==="water"){const v=new V(lw,We("rock",{color:"#1e84b0",roughness:.9,bumpScale:.025}));v.position.y=-.35,v.receiveShadow=!0,s.add(v);const w=new va(2,2,3,3);w.rotateX(-Math.PI/2);const _=We("water",{color:"#45c8f5",roughness:.14,metalness:.08,bumpScale:.028,transparent:!0,opacity:.92,flatShading:!1});c=new V(w,_),c.position.y=Vr,c.receiveShadow=!0,c.userData={basePositions:Float32Array.from(w.attributes.position.array),tileX:i.x,tileY:i.y},s.add(c);const M=We("cloud",{color:"#eefbff",roughness:.45,bumpScale:.01,transparent:!0,opacity:.86,flatShading:!1});if(!t.northWater){const b=new V(Ja,M);b.position.set(0,Vr+.022,-.93),s.add(b)}if(!t.southWater){const b=new V(Ja,M);b.position.set(0,Vr+.022,.93),s.add(b)}if(!t.westWater){const b=new V(Ja,M);b.rotation.y=Math.PI/2,b.position.set(-.93,Vr+.022,0),s.add(b)}if(!t.eastWater){const b=new V(Ja,M);b.rotation.y=Math.PI/2,b.position.set(.93,Vr+.022,0),s.add(b)}return{group:s,hitMesh:u,animatedTrees:a,waterMesh:c,windmillBlades:d,floatingMotes:o,smokePuffs:l}}const h=ww(i),f=_w(i,h),m=new V(aw,f);m.position.y=fe*.5,m.receiveShadow=!0,m.castShadow=!1,s.add(m);const y=i.terrain==="wasteland"?"#433c4b":"#6c5640",g=new V(ow,We(i.terrain==="wasteland"?"orc_rock":"rock",{color:y,roughness:.94,bumpScale:.03}));if(g.position.y=-.14,g.receiveShadow=!0,g.castShadow=!1,s.add(g),!n)return{group:s,hitMesh:u,animatedTrees:a,waterMesh:c,windmillBlades:d,floatingMotes:o,smokePuffs:l};if((i.hasRoad||i.isCityCenter)&&Ew(s,t,i.isCityCenter),!i.isCityCenter&&!i.hasVillage)switch(i.terrain){case"plains":i.improvement||Mw(s,i);break;case"forest":i.improvement||bw(s,i,a);break;case"ancient_woods":Sw(s,i,a,o,!!i.improvement);break;case"mountain":xw(s,i);break;case"wasteland":i.improvement||Tw(s,i,o);break}i.hasVillage&&!i.isCityCenter&&Rw(s,i,l);let p;return i.improvement&&!i.isCityCenter?d=Cw(s,i.improvement,i.terrain==="mountain"):i.resource&&!i.isCityCenter&&!i.hasVillage&&(p=Aw(s,i.resource,i,o)),{group:s,hitMesh:u,animatedTrees:a,waterMesh:c,windmillBlades:d,floatingMotes:o,smokePuffs:l,resourceGroup:p}}function _w(i,e){switch(i.terrain){case"forest":return We("forest_floor",{color:e,roughness:.9,bumpScale:.025});case"ancient_woods":return We("ancient_floor",{color:e,roughness:.88,bumpScale:.025});case"wasteland":return We("wasteland",{color:e,roughness:.9,bumpScale:.035});case"mountain":return We(i.biome==="orcs"?"orc_rock":"rock",{color:e,roughness:.9,bumpScale:.035});case"plains":default:return We("grass",{color:e,roughness:.88,bumpScale:.022})}}function ww(i){const e=(i.x+i.y)%2===1?1:0;switch(i.terrain){case"plains":return Yu[i.biome][e];case"forest":return yw[i.biome][e];case"ancient_woods":return e===0?"#3aa06e":"#359666";case"mountain":return i.biome==="orcs"?e===0?"#6c6476":"#655d6f":e===0?"#8894a3":"#808c9b";case"wasteland":return e===0?"#5b5363":"#544d5c";default:return Yu.humans[e]}}function Mw(i,e){if(e.resource||e.hasRoad||It(e.x,e.y,19)<.7)return;const t=[[-.66,-.66],[.66,-.66],[-.66,.66]],[n,s]=t[Math.floor(It(e.x,e.y,23)*t.length)];if(e.biome!=="orcs"&&It(e.x,e.y,29)>.55){const a=["#fde047","#f472b6","#ffffff","#93c5fd"],o=a[Math.floor(It(e.x,e.y,31)*a.length)],l=new V(_a,yt(o));l.position.set(n,fe+.055,s),i.add(l)}else{const a=e.biome==="orcs"?"#635c5c":"#4fa839",o=We("grass",{color:a,roughness:.86,bumpScale:.016});for(let l=0;l<2;l++){const c=new V(dw,o);c.position.set(n+(l-.5)*.07,fe+.075,s+(l===0?.03:-.03)),c.rotation.set((It(e.x,e.y,40+l)-.5)*.24,It(e.x,e.y,50+l)*Math.PI*2,(It(e.x,e.y,60+l)-.5)*.24),i.add(c)}}}function bw(i,e,t){const[n,s]=vw[e.biome],r=We("bark",{color:e.biome==="elves"?"#e5dfd3":e.biome==="orcs"?"#544c59":"#735139",roughness:.9,bumpScale:.03,flatShading:!0}),a=We("snow",{color:"#f8fafc",roughness:.8,bumpScale:.02,flatShading:!0}),o=yt("#fb923c",{emissive:"#ff6b2b",emissiveIntensity:1,roughness:.4});[[-.56,-.52],[.52,-.52],[-.54,.4]].forEach(([c,d],u)=>{const h=new ze,f=(It(e.x,e.y,100+u)-.5)*.08,m=(It(e.x,e.y,110+u)-.5)*.08,y=.86+It(e.x,e.y,120+u)*.14;h.position.set(c+f,fe,d+m),h.scale.setScalar(y);const g=new V(mf,r);g.position.y=.14,g.castShadow=!0,h.add(g);const p=We("foliage",{color:u%2===0?n:s,roughness:.86,bumpScale:.025,flatShading:!0});if(e.biome==="orcs"){g.rotation.z=(u%2===0?1:-1)*.12;const v=new V(new Lt(.028,.048,.36,4),r);v.position.set(.11,.38,.03),v.rotation.z=-.66,v.castShadow=!0,h.add(v);const w=new V(new Lt(.024,.042,.3,4),r);if(w.position.set(-.1,.44,-.03),w.rotation.z=.7,w.castShadow=!0,h.add(w),u===0){const _=new V(_a,o);_.position.set(.08,.05,.08),h.add(_)}}else if(e.biome==="elves"){const v=new V(ra,We("foliage",{color:n,roughness:.84,bumpScale:.025}));v.position.y=.45,v.scale.set(1.12,.72,1.12),v.castShadow=!0,h.add(v);const w=new V(ra,We("mallorn_foliage",{color:s,roughness:.82,bumpScale:.025}));w.position.set(.03,.64,-.02),w.scale.set(.82,.66,.82),w.castShadow=!0,h.add(w)}else if(e.biome==="dwarves"){const v=new V($u,p);v.position.y=.4,v.castShadow=!0,h.add(v);const w=new V(Xu,a);w.position.y=.65,w.castShadow=!0,h.add(w)}else if(u===1){const v=new V(ra,p);v.position.y=.49,v.scale.set(1.18,.96,1.18),v.castShadow=!0,h.add(v)}else{const v=new V($u,p);v.position.y=.4,v.castShadow=!0,h.add(v);const w=new V(Xu,We("foliage",{color:s,roughness:.86,bumpScale:.025,flatShading:!0}));w.position.y=.65,w.castShadow=!0,h.add(w)}h.userData={swayPhase:It(e.x,e.y,130+u)*Math.PI*2},i.add(h),t.push(h)})}function Sw(i,e,t,n,s){const r=We("bark",{color:"#eae4d7",roughness:.88,bumpScale:.03}),a=We("mallorn_foliage",{color:"#2ea874",roughness:.84,bumpScale:.025}),o=We("mallorn_foliage",{color:"#f2c94c",roughness:.82,bumpScale:.025}),l=yt("#fef08a",{emissive:"#facc15",emissiveIntensity:1.15});(s?[[-.6,-.56],[.58,-.54]]:[[-.56,-.52],[.52,-.52],[-.54,.4]]).forEach(([d,u],h)=>{const f=new ze,m=.9+It(e.x,e.y,200+h)*.14;f.position.set(d,fe,u),f.scale.setScalar(m);const y=new V(mf,r);y.scale.set(1.08,1.18,1.08),y.position.y=.17,y.castShadow=!0,f.add(y);const g=new V(ra,a);g.position.y=.48,g.scale.set(1.22,.72,1.22),g.castShadow=!0,f.add(g);const p=new V(ra,o);p.position.set(.03,.69,-.02),p.scale.set(.92,.66,.92),p.castShadow=!0,f.add(p),f.userData={swayPhase:It(e.x,e.y,210+h)*Math.PI*2},i.add(f),t.push(f)});for(let d=0;d<2;d++){const u=new V(_a,l),h=(It(e.x,e.y,220+d)-.5)*1,f=fe+.58+It(e.x,e.y,230+d)*.35,m=(It(e.x,e.y,240+d)-.5)*1;u.position.set(h,f,m),u.scale.setScalar(.54),u.userData={moteKind:"firefly",baseX:h,baseY:f,baseZ:m,phase:It(e.x,e.y,250+d)*Math.PI*2},i.add(u),n.push(u)}}function xw(i,e){const t=e.biome==="orcs",n=t?"orc_rock":"rock",s=We(n,{color:t?"#6c6476":"#8894a3",roughness:.88,bumpScale:.04,flatShading:!0}),r=We(n,{color:t?"#5a5263":"#737f8e",roughness:.9,bumpScale:.04,flatShading:!0}),a=We(n,{color:t?"#7d7488":"#9aa6b5",roughness:.86,bumpScale:.032,flatShading:!0}),o=t?We("orc_rock",{color:"#968d9e",roughness:.84,bumpScale:.03,flatShading:!0}):We("snow",{color:"#f8fafc",roughness:.8,bumpScale:.02,flatShading:!0}),l=It(e.x,e.y,300)*Math.PI,c=new V(uw,s);c.position.set(-.3,fe+.525,-.3),c.rotation.y=l,c.castShadow=!0,c.receiveShadow=!0,i.add(c);const d=new V(hw,o);d.position.set(-.3,fe+.85,-.3),d.rotation.y=l,d.castShadow=!0,i.add(d);const u=new V(fw,r);u.position.set(bs,fe+Zi*.5,Ss),u.rotation.y=.4,u.castShadow=!0,u.receiveShadow=!0,i.add(u);const h=new V(pw,a);if(h.position.set(bs,fe+Zi-.014,Ss),h.rotation.y=.4,h.receiveShadow=!0,i.add(h),t){const f=new V(new Ie(.065,.42,.065),yt("#ff6b2b",{emissive:"#ff6b2b",emissiveIntensity:1.15}));f.position.set(-.1,fe+.48,-.08),f.rotation.z=-.38,i.add(f)}}function Tw(i,e,t){const n=We("orc_rock",{color:"#443d4d",roughness:.86,bumpScale:.04}),s=yt("#ff6b2b",{emissive:"#ff6b2b",emissiveIntensity:1.2,roughness:.36}),r=It(e.x,e.y,400)*Math.PI,a=new V(new Ie(.92,.03,.075),s);a.position.set(0,fe+.012,0),a.rotation.y=r,i.add(a);const o=new V(new Ie(.52,.028,.055),s);o.position.set(.14,fe+.012,.12),o.rotation.y=r+.9,i.add(o);for(let u=0;u<2;u++){const h=new V(mw,n),f=(u===0?-.58:.52)+(It(e.x,e.y,410+u)-.5)*.14,m=(u===0?-.44:-.5)+(It(e.x,e.y,420+u)-.5)*.14;h.position.set(f,fe+.18,m),h.rotation.set(.18*(u===0?1:-1),It(e.x,e.y,430+u)*Math.PI,.14),h.castShadow=!0,i.add(h)}const l=new V(_a,s),c=(It(e.x,e.y,440)-.5)*.7,d=(It(e.x,e.y,441)-.5)*.7;l.position.set(c,fe+.35,d),l.scale.setScalar(.52),l.userData={moteKind:"ember",baseX:c,baseY:fe+.16,baseZ:d,phase:It(e.x,e.y,442)},i.add(l),t.push(l)}function Ew(i,e,t){const n=We("road_cobble",{color:"#d8cab4",roughness:.9,bumpScale:.025}),s=new V(new Lt(.24,.26,.04,8),n);s.position.y=fe+.015,i.add(s);const r=new Ie(.32,.035,1);if((e.northRoad||t)&&e.northRoad){const a=new V(r,n);a.position.set(0,fe+.015,-.5),i.add(a)}if(e.southRoad){const a=new V(r,n);a.position.set(0,fe+.015,.5),i.add(a)}if(e.westRoad){const a=new V(r,n);a.rotation.y=Math.PI/2,a.position.set(-.5,fe+.015,0),i.add(a)}if(e.eastRoad){const a=new V(r,n);a.rotation.y=Math.PI/2,a.position.set(.5,fe+.015,0),i.add(a)}}function Aw(i,e,t,n){switch(e){case"berries":{const s=new ze,r=We("foliage",{color:"#2f8540",roughness:.86,bumpScale:.025}),a=yt("#f43f5e",{roughness:.45});return[[-.22,.14,.1],[.18,.15,-.08],[0,.13,.22]].forEach(([l,c,d])=>{const u=new V(gf,r);u.position.set(l,fe+c,d),u.castShadow=!0,s.add(u);const h=new V(_a,a);h.position.set(l+.08,fe+c+.14,d+.06),s.add(h)}),i.add(s),s}case"game":{const s=new ze,r=new ze,a=yt(t.biome==="orcs"?"#7a6154":"#b87a44"),o=yt("#efe8d8"),l=new V(new Ie(.32,.18,.16),a);l.position.y=.22,l.castShadow=!0,r.add(l);const c=new Ie(.05,.18,.05),d=[[-.1,-.05],[.1,-.05],[-.1,.05],[.1,.05]];for(const[m,y]of d){const g=new V(c,a);g.position.set(m,.09,y),r.add(g)}const u=new V(new Ie(.14,.12,.12),a);u.position.set(.19,.34,0),r.add(u);const h=new V(new Ie(.03,.14,.03),o);h.position.set(.2,.45,.05),h.rotation.x=.35,r.add(h);const f=h.clone();return f.position.z=-.05,f.rotation.x=-.35,r.add(f),r.position.set(.04,fe,.06),r.rotation.y=It(t.x,t.y,500)*Math.PI*2,s.add(r),i.add(s),s}case"ore":{const s=new ze,r=yt("#f59e0b",{roughness:.34,metalness:.58,emissive:"#b45309",emissiveIntensity:.22});return[[-.48,.36,.06],[.02,.44,-.4],[-.2,.58,-.08]].forEach(([o,l,c],d)=>{const u=new V(qu,r);u.position.set(o,fe+l,c),u.scale.set(.85,1.3,.85),u.rotation.set(.3,d*1.1,.25),u.castShadow=!0,s.add(u)}),i.add(s),s}case"mithril":{const s=new ze,r=yt("#93c5fd",{roughness:.3,metalness:.62,emissive:"#60a5fa",emissiveIntensity:.55});return[[-.48,.38,.08],[.02,.48,-.4],[-.2,.62,-.06]].forEach(([o,l,c],d)=>{const u=new V(qu,r);u.position.set(o,fe+l,c),u.scale.set(.9,1.55,.9),u.rotation.set(.22,d*1.3,-.2),u.castShadow=!0,s.add(u)}),i.add(s),s}case"ruins":{const s=We("stone_masonry",{color:"#b4bfce",roughness:.88,bumpScale:.035}),r=We("stone_masonry",{color:"#63946a",roughness:.88,bumpScale:.035}),a=yt("#67e8f9",{emissive:"#22d3ee",emissiveIntensity:1.05,roughness:.32}),o=new V(new Lt(.48,.54,.08,6),s);o.position.y=fe+.04,o.receiveShadow=!0,i.add(o);const l=new V(new Ie(.14,.54,.14),s);l.position.set(-.28,fe+.31,-.18),l.castShadow=!0,i.add(l);const c=new V(new Ie(.14,.44,.14),s);c.position.set(.28,fe+.26,-.18),c.castShadow=!0,i.add(c);const d=new V(new Ie(.76,.11,.17),r);d.position.set(-.04,fe+.58,-.18),d.rotation.z=-.12,d.castShadow=!0,i.add(d);const u=new V(new Zt(.135,0),a);u.position.set(0,fe+.32,.08),u.userData={moteKind:"rune",baseX:0,baseY:fe+.32,baseZ:.08,phase:It(t.x,t.y,555)*Math.PI*2},i.add(u),n.push(u);break}}}function Rw(i,e,t){const n=We("timber",{color:"#f2eadb",roughness:.88,bumpScale:.026}),s=We("thatch",{color:"#cc9b56",roughness:.9,bumpScale:.032,flatShading:!0}),r=We("timber",{color:"#784c28",roughness:.88,bumpScale:.028}),a=We("stone_masonry",{color:"#9ca8b8",roughness:.88,bumpScale:.032}),o=We("cobble",{color:"#ddd5c5",roughness:.9,bumpScale:.026}),l=yt("#fcd34d",{emissive:"#f59e0b",emissiveIntensity:.9}),c=yt("#fb923c",{emissive:"#f97316",emissiveIntensity:.95}),d=We("cloud",{color:"#f1f5f9",roughness:.95,bumpScale:.01,transparent:!0,opacity:.68,flatShading:!1}),u=new V(new Lt(.64,.68,.022,8),o);u.position.set(-.14,fe+.011,-.14),u.receiveShadow=!0,i.add(u),[[-.46,-.44,.35],[.2,-.5,-.45],[-.5,.22,.15]].forEach(([y,g,p],v)=>{const w=new ze,_=new V(new Ie(.34,.22,.3),n);_.position.y=.11,_.castShadow=!0,w.add(_);const M=new V(new tn(.28,.22,4),s);M.position.y=.33,M.rotation.y=Math.PI/4,M.castShadow=!0,w.add(M);const b=new V(new Ie(.08,.075,.025),l);b.position.set(.08,.12,.155),w.add(b);const T=new V(new Ie(.08,.13,.025),r);if(T.position.set(-.07,.065,.155),w.add(T),v<2){const E=new V(new Ie(.07,.18,.07),a);E.position.set(.1,.34,-.08),w.add(E);const S=new V(new Hi(.055,0),d);S.position.set(.1,.48,-.08),S.userData={smokeBaseX:.1,smokeBaseY:.46,smokeBaseZ:-.08,smokePhase:v*.5+It(e.x,e.y,610+v)},w.add(S),t.push(S)}w.position.set(y,fe,g),w.rotation.y=p+It(e.x,e.y,600)*.22,i.add(w)});const f=new V(new Lt(.13,.15,.08,7),a);f.position.set(-.12,fe+.04,-.12),i.add(f);const m=new V(new tn(.065,.15,5),c);m.position.set(-.12,fe+.13,-.12),i.add(m)}function Cw(i,e,t){switch(e){case"farm":{const n=We("farm_soil",{color:"#8f6840",roughness:.92,bumpScale:.032}),s=We("wheat",{color:"#facc15",roughness:.84,bumpScale:.03}),r=new V(new Ie(1.42,.04,1.42),n);r.position.y=fe+.02,r.receiveShadow=!0,i.add(r);for(let a=-2;a<=2;a++){const o=new V(new Ie(1.22,.15,.14),s);o.position.set(0,fe+.105,a*.25),o.castShadow=!0,i.add(o)}return null}case"windmill":{const n=We("stone_masonry",{color:"#ece7dc",roughness:.88,bumpScale:.032,flatShading:!0}),s=We("roof_shingles",{color:"#2563eb",roughness:.8,bumpScale:.028,flatShading:!0}),r=We("timber",{color:"#9a683c",roughness:.88,bumpScale:.028}),a=We("timber",{color:"#fefce8",roughness:.84,bumpScale:.018}),o=new V(new Lt(.2,.3,.68,7),n);o.position.set(-.24,fe+.34,-.24),o.castShadow=!0,i.add(o);const l=new V(new tn(.25,.22,7),s);l.position.set(-.24,fe+.79,-.24),l.castShadow=!0,i.add(l);const c=new ze;c.position.set(-.24,fe+.58,.02);for(let d=0;d<4;d++){const u=new ze;u.rotation.z=d*Math.PI/2;const h=new V(new Ie(.04,.38,.03),r);h.position.y=.19,u.add(h);const f=new V(new Ie(.13,.28,.02),a);f.position.set(.075,.21,0),u.add(f),c.add(u)}return i.add(c),c}case"mine":{const n=We("timber",{color:"#8c5a32",roughness:.88,bumpScale:.03}),s=We("rock",{color:"#2b2730",roughness:.92,bumpScale:.035}),r=yt("#f59e0b",{emissive:"#f59e0b",emissiveIntensity:.65}),a=t?-.44:0,o=t?.28:0,l=new V(new Ie(.46,.38,.2),n);l.position.set(a,fe+.19,o),l.castShadow=!0,i.add(l);const c=new V(new Ie(.28,.28,.22),s);c.position.set(a,fe+.14,o+.02),i.add(c);const d=new V(new Zt(.068,0),r);return d.position.set(a+.24,fe+.34,o+.11),i.add(d),null}case"sanctuary":{const n=We("marble_masonry",{color:"#f7f2e4",roughness:.82,bumpScale:.026,flatShading:!0}),s=We("roof_shingles",{color:"#facc15",metalness:.42,roughness:.38,bumpScale:.024,flatShading:!0}),r=We("mallorn_foliage",{color:"#34b87c",roughness:.84,bumpScale:.025}),a=yt("#34d399",{emissive:"#10b981",emissiveIntensity:.9}),o=new V(new Lt(.42,.48,.08,6),n);o.position.y=fe+.04,o.receiveShadow=!0,i.add(o);for(let d=0;d<4;d++){const u=d*Math.PI/2+Math.PI/4,h=new V(new Lt(.04,.04,.44,5),n);h.position.set(Math.cos(u)*.28,fe+.3,Math.sin(u)*.28),h.castShadow=!0,i.add(h)}for(const[d,u]of[[-.36,-.34],[.36,-.34]]){const h=new V(gf,r);h.position.set(d,fe+.13,u),h.scale.set(.85,.72,.85),h.castShadow=!0,i.add(h)}const l=new V(new tn(.38,.3,6),s);l.position.y=fe+.65,l.castShadow=!0,i.add(l);const c=new V(new Zt(.12,0),a);return c.position.y=fe+.3,i.add(c),null}case"slag_pit":{const n=We("dark_iron",{color:"#534b5e",metalness:.3,roughness:.68,bumpScale:.035}),s=yt("#ff6b2b",{emissive:"#f97316",emissiveIntensity:1.2}),r=new V(new Lt(.52,.6,.18,6),n);r.position.y=fe+.09,r.castShadow=!0,i.add(r);const a=new V(new Lt(.38,.38,.2,6),s);return a.position.y=fe+.1,i.add(a),null}case"foundry":{const n=We("dark_iron",{color:"#534b5e",metalness:.32,roughness:.66,bumpScale:.035}),s=yt("#ff6b2b",{emissive:"#f97316",emissiveIntensity:1.15}),r=new V(new Ie(.76,.36,.64),n);r.position.set(-.18,fe+.18,-.18),r.castShadow=!0,i.add(r);const a=new V(new Lt(.12,.16,.7,6),n);a.position.set(.06,fe+.44,-.32),a.castShadow=!0,i.add(a);const o=new V(new Ie(.28,.18,.08),s);return o.position.set(-.24,fe+.14,.15),i.add(o),null}case"great_forge":{const n=We("granite_runic",{color:"#7e8c9e",roughness:.88,bumpScale:.036}),s=We("dark_iron",{color:"#e08a1e",metalness:.48,roughness:.38,bumpScale:.026}),r=yt("#ff6b2b",{emissive:"#f97316",emissiveIntensity:1.2}),a=new V(new Ie(.86,.38,.78),n);a.position.set(-.16,fe+.19,-.16),a.castShadow=!0,i.add(a);const o=new V(new Ie(.76,.12,.68),s);o.position.set(-.16,fe+.44,-.16),i.add(o);const l=new V(new Ie(.26,.62,.26),n);l.position.set(-.16,fe+.62,-.32),l.castShadow=!0,i.add(l);const c=new V(new Ie(.34,.2,.08),r);return c.position.set(-.16,fe+.15,.24),i.add(c),null}}}function Iw(i){const e=new ze,t=i*gr+.12,n=1.04,s=We("bedrock_skirt",{color:"#ffffff",roughness:.92,bumpScale:.04,repeatX:i*.5,repeatY:1}),r=We("rock",{color:"#6b5845",roughness:.94,bumpScale:.03,repeatX:i*.5,repeatY:i*.5}),a=yt("#242f40",{roughness:.96}),o=new V(new Ie(t,n,t),[s,s,r,a,s,s]);return o.position.y=-.23-n*.5,o.receiveShadow=!0,e.add(o),e}const yf=wt.degToRad(38),Pw=Math.sin(yf),kw=Math.cos(yf),Lw=.89,Dw={1:.86,2:.92,3:.97,4:1};function vf(i){const e=i.level>=6?4:i.level>=4?3:i.level>=2?2:1;return Math.min(4,e+(i.isCapital?1:0))}const Uw={humans:{1:{peakY:1.16,peakDiag:.25},2:{peakY:1.76,peakDiag:.27},3:{peakY:2.12,peakDiag:.28},4:{peakY:2.52,peakDiag:.28}},orcs:{1:{peakY:1.14,peakDiag:.25},2:{peakY:1.54,peakDiag:.27},3:{peakY:2.24,peakDiag:.29},4:{peakY:2.52,peakDiag:.29}},elves:{1:{peakY:1.38,peakDiag:.25},2:{peakY:1.78,peakDiag:.27},3:{peakY:2.28,peakDiag:.28},4:{peakY:2.68,peakDiag:.28}},dwarves:{1:{peakY:1.18,peakDiag:.28},2:{peakY:1.58,peakDiag:.32},3:{peakY:1.98,peakDiag:.34},4:{peakY:2.44,peakDiag:.38}}};function Ku(i,e){const t=vf(i),n=Uw[i.styleFaction]?.[t]??{peakY:1.6,peakDiag:.28},r=((n.peakDiag-e)*Math.SQRT2*Pw+.28)/kw;return Math.max(Jt+.84,n.peakY+r)}const ju=new Map;function Ze(i,e){const t=JSON.stringify([i,e??{}]);let n=ju.get(t);if(!n){const s=e?.opacity??1;n=new pi({color:i,flatShading:!0,roughness:e?.roughness??.84,metalness:e?.metalness??0,emissive:e?.emissive?new xe(e.emissive):new xe(0),emissiveIntensity:e?.emissiveIntensity??0,transparent:!0,opacity:s,depthTest:!0,depthWrite:e?.depthWrite??s>=.99}),ju.set(t,n)}return n}const Ln=new Map;function Gn(i){return(Math.round(i*1e3)/1e3).toString()}function De(i,e,t){const n=`b:${Gn(i)}:${Gn(e)}:${Gn(t)}`;let s=Ln.get(n);return s||(s=new Ie(i,e,t),Ln.set(n,s)),s}function Fe(i,e,t,n=6){const s=`c:${Gn(i)}:${Gn(e)}:${Gn(t)}:${n}`;let r=Ln.get(s);return r||(r=new Lt(i,e,t,n),Ln.set(s,r)),r}function ft(i,e,t=6){const n=`k:${Gn(i)}:${Gn(e)}:${t}`;let s=Ln.get(n);return s||(s=new tn(i,e,t),Ln.set(n,s)),s}function Xt(i){const e=`o:${Gn(i)}`;let t=Ln.get(e);return t||(t=new Zt(i,0),Ln.set(e,t)),t}function ho(i){const e=`i:${Gn(i)}`;let t=Ln.get(e);return t||(t=new Hi(i,0),Ln.set(e,t)),t}function Ho(i,e,t=5,n=14){const s=`t:${Gn(i)}:${Gn(e)}:${t}:${n}`;let r=Ln.get(s);return r||(r=new ns(i,e,t,n),Ln.set(s,r)),r}function So(i,e=8){const t=`d:${Gn(i)}:${e}`;let n=Ln.get(t);return n||(n=new ed(i,e,4,0,Math.PI*2,0,Math.PI*.56),Ln.set(t,n)),n}function H(i,e,t,n,s,r,a){const o=new V(e,t);return o.position.set(n,s,r),a?.rotX&&(o.rotation.x=a.rotX),a?.rotY&&(o.rotation.y=a.rotY),a?.rotZ&&(o.rotation.z=a.rotZ),(a?.scaleX!==void 0||a?.scaleY!==void 0||a?.scaleZ!==void 0)&&o.scale.set(a.scaleX??1,a.scaleY??1,a.scaleZ??1),o.castShadow=a?.cast??!0,o.receiveShadow=a?.receive??!0,i.add(o),o}function vn(i,e,t,n,s,r,a,o,l=0){const c=new ze;c.position.set(e,t,n),c.rotation.y=l,H(c,De(s+.03,.022,.024),o,0,0,0,{cast:!1,receive:!1}),H(c,De(s,r,.016),a,0,-r*.5-.01,0,{cast:!1,receive:!1}),H(c,De(s+.012,.022,.02),o,0,-r-.008,0,{cast:!1,receive:!1}),i.add(c)}function Di(i,e,t,n,s,r,a,o,l,c=.25,d=1){const u=Ze("#e2e8f0",{metalness:.5,roughness:.34});H(i,Fe(.012*d,.016*d,r,5),u,t,n+r*.5,s,{cast:!1,receive:!1}),H(i,Xt(.028*d),o,t,n+r+.02*d,s,{cast:!1,receive:!1});const h=new ze;h.position.set(t,n+r-.06*d,s),h.rotation.y=c,h.userData.bannerPhase=l,h.userData.baseRotY=c,H(h,De(.18*d,.095*d,.018),a,.09*d,0,0,{cast:!1,receive:!1}),H(h,De(.16*d,.022*d,.022),o,.08*d,-.03*d,0,{cast:!1,receive:!1}),i.add(h),e.banners.push(h)}function Rn(i,e,t,n,s,r,a,o,l,c=0,d=!1){const u=new ze;u.position.set(e,t,n),u.rotation.y=c;const h=s*.24,f=s*.62,m=r*.78;H(u,De(h,r,.075),a,-(f+h)*.5,r*.5,0,{cast:!1}),H(u,De(h,r,.075),a,(f+h)*.5,r*.5,0,{cast:!1}),H(u,De(s+.04,r*.16,.088),l??a,0,r+r*.04,0,{cast:!1}),d?H(u,De(s*.62,r*.14,.095),l??a,0,r+r*.17,0,{cast:!1}):H(u,ft(s*.42,r*.22,4),l??a,0,r+r*.19,0,{rotY:Math.PI/4,scaleZ:.34,cast:!1}),H(u,De(f,m,.045),o,0,m*.5,.008,{cast:!1,receive:!1}),H(u,Fe(f*.5,f*.5,.045,6),o,0,m,.008,{rotX:Math.PI/2,scaleY:.75,cast:!1,receive:!1}),i.add(u)}function Zu(i,e,t,n,s,r,a,o,l,c){const d=r/o,u=a/o;for(let h=0;h<o;h++){const f=r-h*d,m=n+(h+.5)*u;H(i,De(s,f,u+.01),l,e,t+f*.5,m)}if(c){const h=r*.46,f=Math.atan2(r,a),m=Math.hypot(r,a);for(const y of[-1,1])H(i,De(.036,.055,m),c,e+y*(s*.5+.018),t+h+.04,n+a*.5,{rotX:f,cast:!1})}}function _f(i,e,t,n,s,r,a,o=.068,l=.056){const c=De(o,l,o),d=s*.5-o*.48,u=r*.5-o*.48,h=t+l*.5,f=[[-d,-u],[0,-u],[d,-u],[-d,u],[0,u],[d,u],[-d,0],[d,0]];for(const[m,y]of f)H(i,c,a,e+m,h,n+y,{cast:!1})}function Js(i,e,t,n,s,r,a,o=.058,l=.054){const c=De(o,l,o),d=t+l*.5;for(let u=0;u<r;u++){const h=u/r*Math.PI*2;H(i,c,a,e+Math.cos(h)*s,d,n+Math.sin(h)*s,{rotY:-h,cast:!1})}}function Ft(i,e,t,n,s,r,a,o,l=0){H(i,De(s,r,a),o,e,t,n,{rotY:l,cast:!1,receive:!1})}function lr(i,e,t,n,s,r,a,o,l){const c=new ze;return c.position.set(t,n,s),c.userData.baseScaleY=r,c.userData.phase=l,c.userData.spinSpeed=1.4,H(c,ft(.08*r,.22*r,5),a,0,.11*r,0,{cast:!1,receive:!1}),H(c,Xt(.058*r),o,0,.09*r,0,{scaleY:1.35,cast:!1,receive:!1}),i.add(c),e.flames.push(c),c}function Ju(i,e,t,n,s,r,a){H(i,Fe(.036,.048,.11,6),s,e,t+.055,n,{cast:!1}),a&&H(i,Fe(.052,.04,.03,6),a,e,t+.115,n,{cast:!1}),H(i,Xt(.044),r,e,t+.155,n,{scaleY:1.35,cast:!1,receive:!1})}function Jr(i,e,t,n,s,r,a="#e2e8f0",o=.065){const l=Ze(a,{roughness:.95,opacity:.72,depthWrite:!1});for(let c=0;c<r;c++){const d=new V(ho(o),l);d.position.set(t,n+c*.14,s),d.renderOrder=37,d.userData.smokeBaseX=t,d.userData.smokeBaseY=n,d.userData.smokeBaseZ=s,d.userData.smokePhase=(c/r+e.seed*.17)%1,i.add(d),e.smokePuffs.push(d)}}function Yt(i,e,t,n,s,r=1){const a=new ze;if(a.position.set(e,t,n),a.scale.setScalar(r),s==="mallorn"){const o=Ze("#efe9db",{roughness:.86}),l=Ze("#1ea86e",{roughness:.8}),c=Ze("#f2c94c",{roughness:.76});H(a,Fe(.026,.044,.18,5),o,0,.09,0),H(a,ho(.135),l,0,.23,0,{scaleX:1.12,scaleY:.76,scaleZ:1.12}),H(a,ho(.105),c,.015,.33,-.01,{scaleX:1,scaleY:.74,scaleZ:1})}else if(s==="snow_pine"){const o=Ze("#6b4c35",{roughness:.9}),l=Ze("#2f6f58",{roughness:.84}),c=Ze("#f1f5f9",{roughness:.76});H(a,Fe(.024,.036,.11,5),o,0,.055,0),H(a,ft(.125,.2,6),l,0,.18,0),H(a,ft(.088,.16,6),c,0,.3,0)}else if(s==="white_tree"){const o=Ze("#e2e8f0",{roughness:.84}),l=Ze("#ffffff",{emissive:"#e2e8f0",emissiveIntensity:.24,roughness:.76});H(a,Fe(.024,.038,.16,5),o,0,.08,0),H(a,ho(.12),l,0,.22,0,{scaleX:1.15,scaleY:.82,scaleZ:1.15})}else{const o=Ze("#785233",{roughness:.9}),l=Ze("#359b43",{roughness:.84}),c=Ze("#52b84e",{roughness:.82});H(a,Fe(.022,.034,.1,5),o,0,.05,0),H(a,ft(.11,.19,6),l,0,.17,0),H(a,ft(.075,.16,6),c,0,.29,0)}i.add(a)}const Ow={humans:{side:"#dcd5c5",top:"#f2ece0",apron:"#faf6ee",band:"#2563eb",brazierStand:"#d6cfc0",brazierFire:"#fde047",brazierFireEmissive:"#f59e0b",brazierTrim:"#f5c542"},orcs:{side:"#463e52",top:"#5b5169",apron:"#6c617d",band:"#ff6b2b",bandEmissive:"#ea580c",brazierStand:"#3c3547",brazierFire:"#ff8a3d",brazierFireEmissive:"#ea580c",brazierTrim:"#786d87"},elves:{side:"#e4decb",top:"#f6f2e6",apron:"#fcf9f0",band:"#10b981",brazierStand:"#e8e1ce",brazierFire:"#fef08a",brazierFireEmissive:"#facc15",brazierTrim:"#f5c542"},dwarves:{side:"#636f80",top:"#828fa1",apron:"#96a2b3",band:"#d97706",brazierStand:"#4a5568",brazierFire:"#fb923c",brazierFireEmissive:"#f97316",brazierTrim:"#d97706"}};function Nw(i,e,t,n){const s=Ow[e],r=Lw*2*n,a=yt(s.side,{roughness:.86});H(i,De(r,Jt,r),a,0,Jt*.5,0,{cast:!1,receive:!0});const o=yt(s.band,{roughness:s.bandEmissive?.35:.42,metalness:s.bandEmissive?0:.38,emissive:s.bandEmissive,emissiveIntensity:s.bandEmissive?1.05:0});H(i,De(r+.022,.036,r+.022),o,0,Jt*.44,0,{cast:!1,receive:!0});const l=yt(s.top,{roughness:.82});H(i,De(r+.016,.044,r+.016),l,0,Jt-.022,0,{cast:!1,receive:!0});const c=yt(s.apron,{roughness:.78});if(H(i,Fe(.42,.45,.016,8),c,Ts,Jt+.008,Es,{rotY:Math.PI/8,cast:!1,receive:!0}),t>=2){const m=yt(s.brazierTrim,{metalness:.42,roughness:.44}),y=new V(Ho(.435,.014,4,8),m);y.rotation.x=Math.PI/2,y.rotation.z=Math.PI/8,y.position.set(Ts,Jt+.014,Es),i.add(y)}const d=yt(s.brazierStand,{roughness:.75}),u=yt(s.brazierTrim,{metalness:.48,roughness:.36}),h=yt(s.brazierFire,{emissive:s.brazierFireEmissive,emissiveIntensity:1.15,roughness:.3}),f=.6*n;Ju(i,-.1,Jt,f,d,h,u),Ju(i,f,Jt,-.1,d,h,u)}function Fw(i,e,t){const n=Ze("#f4efe4",{roughness:.8}),s=Ze("#e3dccb",{roughness:.84}),r=Ze("#cbc3b1",{roughness:.84}),a=Ze("#2563eb",{roughness:.62,metalness:.08}),o=Ze("#1d4ed8",{roughness:.6,emissive:"#1e40af",emissiveIntensity:.14}),l=Ze("#f5c542",{metalness:.56,roughness:.32,emissive:"#b45309",emissiveIntensity:.12}),c=Ze("#fef08a",{emissive:"#f59e0b",emissiveIntensity:1.15,roughness:.28}),d=Ze("#f97316",{emissive:"#ea580c",emissiveIntensity:1.2,roughness:.25}),u=-.38;if(e===1){H(i,De(.7,.1,.56),s,0,.05,u),H(i,De(.58,.34,.46),n,0,.27,u),_f(i,0,.44,u,.58,.46,n,.068,.054),H(i,ft(.42,.34,4),a,0,.64,u,{rotY:Math.PI/4}),H(i,Xt(.05),l,0,.83,u),Rn(i,0,.1,u+.23,.2,.22,s,c,l),Ft(i,-.18,.3,u+.235,.065,.09,.025,c),Ft(i,.18,.3,u+.235,.065,.09,.025,c),Zu(i,0,0,u+.28,.22,.1,.12,3,s),H(i,De(.28,.22,.26),n,.48,.11,-.22),H(i,ft(.22,.2,4),a,.48,.32,-.22,{rotY:Math.PI/4}),Ft(i,.48,.13,-.085,.055,.07,.025,c),Yt(i,-.48,0,-.12,"white_tree",1.05),Di(i,t,.24,.44,u+.18,.26,o,l,t.seed+.5,.3,.9);return}const h=e>=4?.64:e===3?.6:.54,f=e>=3?.3:.22;H(i,Fe(h,h+.05,f,8),s,0,f*.5,u,{rotY:Math.PI/8}),H(i,Fe(h+.02,h+.02,.04,8),n,0,f,u,{rotY:Math.PI/8}),Js(i,0,f+.02,u,h-.04,8,n,.068,.055);const m=u+h*.82;if(Zu(i,0,0,m,.24,f,.22,4,n,r),vn(i,-.26,f-.01,u+h*.92,.09,.18,o,l,-.35),vn(i,.26,f-.01,u+h*.92,.09,.18,o,l,.35),e===2){const b=f+.02;H(i,De(.54,.3,.42),n,0,b+.15,u),Rn(i,0,b,u+.215,.2,.22,s,c,l),Ft(i,-.17,b+.18,u+.215,.06,.085,.024,c),Ft(i,.17,b+.18,u+.215,.06,.085,.024,c),H(i,Fe(.18,.22,.5,6),n,0,b+.44,u-.04),H(i,Fe(.215,.2,.06,6),l,0,b+.67,u-.04),Js(i,0,b+.7,u-.04,.18,6,n,.052,.048),H(i,ft(.24,.34,6),a,0,b+.87,u-.04),H(i,Xt(.055),l,0,b+1.06,u-.04),Di(i,t,0,b+1.02,u-.04,.24,o,l,t.seed+.9,.2,.88),H(i,Fe(.13,.15,.44,6),n,-.54,.22,-.18),H(i,ft(.17,.24,6),a,-.54,.56,-.18),vn(i,-.54,.36,-.03,.075,.16,o,l,0),H(i,De(.28,.26,.26),n,.54,.13,-.18),H(i,ft(.22,.22,4),a,.54,.37,-.18,{rotY:Math.PI/4}),Ft(i,.54,.15,-.045,.055,.08,.024,c),Yt(i,-.56,0,.14,"white_tree",.95),Yt(i,.56,0,.12,"cypress",.9);return}const y=f+.02,g=e===4?.44:.4,p=e===4?.36:.3;H(i,Fe(g,g+.04,p,8),s,0,y+p*.5,u-.02,{rotY:Math.PI/8}),H(i,Fe(g+.026,g+.026,.032,8),l,0,y+p-.032,u-.02,{rotY:Math.PI/8,cast:!1}),H(i,Fe(g+.018,g+.018,.036,8),n,0,y+p,u-.02,{rotY:Math.PI/8,cast:!1}),Js(i,0,y+p+.018,u-.02,g-.035,8,n,.058,.05),Rn(i,0,y,u+g-.02,.22,.24,s,c,l),vn(i,-.22,y+p-.02,u+g*.85,.085,.22,o,l,-.45),vn(i,.22,y+p-.02,u+g*.85,.085,.22,o,l,.45);const v=e===4?.62:.58,w=e===4?.58:.48;for(const b of[-1,1])H(i,Fe(.145,.175,w,6),n,b*v,w*.5,-.18),H(i,Fe(.165,.165,.04,6),l,b*v,w-.02,-.18),Js(i,b*v,w+.01,-.18,.135,6,n,.046,.044),H(i,ft(.185,.28,6),a,b*v,w+.17,-.18),H(i,Xt(.042),l,b*v,w+.33,-.18),vn(i,b*v,w-.08,-.02,.075,.22,o,l,0),Ft(i,b*v,w*.66,-.025,.05,.09,.024,c);H(i,Fe(.15,.17,.24,8),n,.44,y+.12,u-.24),H(i,So(.155,8),l,.44,y+.23,u-.24),H(i,ft(.03,.11,4),l,.44,y+.41,u-.24),Yt(i,-.6,0,.16,"white_tree",1),Yt(i,.6,0,.15,"cypress",.95);const _=y+p+.02;if(e===3){H(i,Fe(.19,.24,.52,8),n,0,_+.26,u-.04),H(i,Fe(.22,.2,.055,8),l,0,_+.5,u-.04),Ft(i,0,_+.28,u+.17,.068,.13,.026,c),Ft(i,-.14,_+.28,u+.11,.055,.11,.026,c,-.7),Ft(i,.14,_+.28,u+.11,.055,.11,.026,c,.7),Js(i,0,_+.52,u-.04,.195,8,n,.048,.045),H(i,ft(.25,.42,8),a,0,_+.74,u-.04),H(i,Xt(.062),l,0,_+.98,u-.04),Di(i,t,0,_+.92,u-.04,.26,o,l,t.seed+1.3,.25,.95);return}H(i,Fe(.14,.16,.24,8),n,-.44,y+.12,u-.24),H(i,So(.145,8),l,-.44,y+.23,u-.24),H(i,ft(.028,.1,4),l,-.44,y+.4,u-.24),H(i,Fe(.25,.3,.26,8),s,0,_+.13,u-.04),H(i,Fe(.28,.27,.034,8),l,0,_+.225,u-.04,{cast:!1}),H(i,Fe(.265,.265,.032,8),n,0,_+.25,u-.04,{cast:!1});const M=_+.26;H(i,Fe(.16,.21,.6,8),n,0,M+.3,u-.04);for(let b=0;b<4;b++){const T=b*Math.PI/2+Math.PI/4;H(i,De(.065,.48,.065),s,Math.cos(T)*.19,M+.22,u-.04+Math.sin(T)*.19,{rotY:-T})}for(const b of[-.65,0,.65])Ft(i,Math.sin(b)*.18,M+.36,u-.04+Math.cos(b)*.18,.052,.14,.028,c,b);H(i,Fe(.21,.18,.06,8),l,0,M+.6,u-.04),Js(i,0,M+.63,u-.04,.185,8,n,.046,.044),H(i,ft(.23,.46,8),a,0,M+.86,u-.04),H(i,Ho(.085,.018,5,10),l,0,M+1.09,u-.04,{rotX:Math.PI/2,cast:!1}),lr(i,t,0,M+1.07,u-.04,.85,d,c,t.seed+.4),Di(i,t,v,w+.31,-.18,.22,o,l,t.seed+2.1,.35,.85);for(const b of[-1,1])H(i,Fe(.085,.11,.44,6),n,b*.24,_+.22,u-.24),H(i,ft(.115,.22,6),a,b*.24,_+.55,u-.24)}function Bw(i,e,t){const n=Ze("#5b5169",{roughness:.72,metalness:.16}),s=Ze("#716582",{roughness:.74,metalness:.12}),r=Ze("#433b4f",{roughness:.5,metalness:.42}),a=Ze("#dbd2c0",{roughness:.7,metalness:.08}),o=Ze("#ef4444",{roughness:.64,emissive:"#b91c1c",emissiveIntensity:.24}),l=Ze("#ff6b2b",{emissive:"#ea580c",emissiveIntensity:1.4,roughness:.26}),c=Ze("#fde047",{emissive:"#f97316",emissiveIntensity:1.5,roughness:.22}),d=-.38,u=(M,b,T,E,S,x=!1)=>{H(i,ft(T,E,5),n,M,E*.5,b,{rotY:S}),x?(H(i,Fe(T*.26,T*.34,E*.16,5),r,M,E*.88,b,{rotY:S}),H(i,Xt(T*.24),l,M,E*.96,b,{scaleY:.65,cast:!1,receive:!1})):H(i,ft(T*.45,E*.32,5),s,M+.02,E*.82,b,{rotY:S+.4}),H(i,De(.068,E*.76,.055),l,M+T*.12,E*.38,b+T*.46,{rotX:-.34,rotZ:.1,cast:!1,receive:!1})},h=(M,b,T,E,S,x,A=0,P=r)=>{H(i,ft(E,S,4),P,M,b,T,{rotZ:x,rotX:A})};if(e===1){H(i,Fe(.41,.43,.028,5),l,0,.014,d,{cast:!1,receive:!1}),H(i,Fe(.28,.39,.44,5),s,0,.22,d),H(i,Fe(.31,.31,.06,5),r,0,.44,d);for(let M=0;M<5;M++){const b=M/5*Math.PI*2+.2;h(Math.cos(b)*.27,.56,d+Math.sin(b)*.27,.062,.28,-Math.cos(b)*.28,Math.sin(b)*.28,M%2===0?a:s)}lr(i,t,0,.46,d,1,l,c,t.seed+.2),Ft(i,-.22,.27,d+.22,.062,.09,.028,c,-.65),Ft(i,.22,.27,d+.22,.062,.09,.028,c,.65),Rn(i,0,0,d+.31,.23,.24,r,l,s),vn(i,-.24,.4,d+.24,.095,.22,o,a,-.6),u(-.5,-.22,.22,.5,.5,!0),Di(i,t,.46,0,-.1,.56,o,a,t.seed+1.1,-.4,1.2);return}const f=e>=4?.64:e===3?.6:.54,m=e>=3?.26:.2;H(i,Fe(f,f+.07,m,6),n,0,m*.5,d),H(i,Fe(f+.08,f+.09,.03,6),l,0,.018,d,{cast:!1,receive:!1}),e>=3?(u(-.6,-.32,.28,e===4?.86:.68,.4,!0),u(.6,-.32,.28,e===4?.82:.64,1.2,!0)):(H(i,ft(.22,.38,5),r,-.54,.19,-.14),Ft(i,-.46,.12,-.01,.06,.075,.025,l,.4),u(.54,-.22,.22,.52,.8,!0)),Rn(i,0,0,d+f*.88,.24,.25,r,l,s);for(const M of[-1,1]){const b=M*.22,T=d+f*.88;H(i,Fe(.085,.105,.3,5),r,b,.15,T),h(b+M*.04,.36,T,.038,.16,-M*.32,0,a),H(i,Xt(.044),l,b,.33,T,{cast:!1,receive:!1})}const y=m;if(e===2){H(i,Fe(.24,.34,.66,6),n,0,y+.33,d-.02),H(i,Fe(.29,.31,.06,6),r,0,y+.34,d-.02),H(i,Fe(.27,.26,.065,6),r,0,y+.65,d-.02),vn(i,0,y+.6,d+.32,.16,.38,o,a,0),Ft(i,-.18,y+.48,d+.18,.06,.09,.026,l,-.55),Ft(i,.18,y+.48,d+.18,.06,.09,.026,l,.55);for(let M=0;M<4;M++){const b=M*Math.PI/2+Math.PI/4;h(Math.cos(b)*.23,y+.8,d-.02+Math.sin(b)*.23,.055,.3,-Math.cos(b)*.32,Math.sin(b)*.32,r)}lr(i,t,0,y+.68,d-.02,.95,l,c,t.seed+.7),Di(i,t,.52,0,.12,.5,o,l,t.seed+1.4,-.35,1);return}const g=e===4?.64:.56,p=e===4?.62:.44;H(i,Fe(.28,.38,g,6),n,0,y+g*.5,d-.04),H(i,Fe(.32,.34,.06,6),r,0,y+g*.95,d-.04);for(let M=0;M<6;M++){const b=M/6*Math.PI*2;h(Math.cos(b)*.34,y+g*.55,d-.04+Math.sin(b)*.34,.068,.4,-Math.cos(b)*.34,Math.sin(b)*.34,r)}vn(i,-.15,y+g-.03,d+.32,.12,.44,o,a,-.24),vn(i,.15,y+g-.03,d+.32,.12,.44,o,a,.24);const v=y+g;H(i,Fe(.18,.27,p,6),s,0,v+p*.5,d-.04),H(i,Fe(.23,.25,.055,6),r,0,v+p*.5,d-.04),H(i,Fe(.21,.2,.06,6),r,0,v+p,d-.04);for(const M of[-.6,0,.6])Ft(i,Math.sin(M)*.22,v+p*.32,d-.04+Math.cos(M)*.22,.055,.1,.03,l,M),Ft(i,Math.sin(M)*.19,v+p*.72,d-.04+Math.cos(M)*.19,.052,.1,.03,c,M);for(const M of[-1,1])h(M*.26,v+p*.52,d-.04,.06,.32,-M*.62,0,a);const w=v+p;for(const M of[-1,1])H(i,ft(.075,.34,4),r,M*.18,w+.14,d-.04,{rotZ:-M*.42}),H(i,ft(.055,.32,4),r,M*.2,w+.36,d-.04,{rotZ:M*.28});if(e===3){lr(i,t,0,w+.04,d-.04,1.15,l,c,t.seed+.9);return}for(const M of[-1,1])h(M*.24,w+.06,d+.06,.045,.24,-M*.68,.25,a);const _=new ze;_.position.set(0,w+.28,d-.04),_.userData.baseY=w+.28,_.userData.phase=t.seed+.6,_.userData.spinSpeed=.95,H(_,Ho(.115,.028,5,10),l,0,0,0,{cast:!1,receive:!1}),H(_,Xt(.088),c,0,0,0,{scaleX:1.28,scaleY:.78,scaleZ:.62,cast:!1,receive:!1}),i.add(_),t.crystals.push(_);for(const M of[-1,1])H(i,Fe(.12,.16,.44,5),r,M*.56,.22,.06),vn(i,M*.56,.36,.19,.08,.22,o,r,0),h(M*.62,.5,.06,.04,.18,-M*.42,0,a),lr(i,t,M*.56,.44,.06,.65,l,c,t.seed+M);Jr(i,t,-.56,.58,.06,3,"#6b6575",.062)}function Hw(i,e,t){const n=Ze("#f7f3e8",{roughness:.76}),s=Ze("#e6dec8",{roughness:.8}),r=Ze("#f5c542",{metalness:.52,roughness:.32,emissive:"#b45309",emissiveIntensity:.12}),a=Ze("#10b981",{roughness:.68,emissive:"#047857",emissiveIntensity:.14}),o=Ze("#fef08a",{emissive:"#facc15",emissiveIntensity:1.25,roughness:.24}),l=Ze("#e0f2fe",{emissive:"#38bdf8",emissiveIntensity:1.35,roughness:.16,metalness:.2}),c=-.38,d=(T,E,S,x,A,P,I=!0,F=!1)=>{H(i,Fe(x*1.12,x*1.26,.08,6),s,T,E+.04,S),H(i,Fe(x*.84,x,A,6),n,T,E+.08+A*.5,S),H(i,Fe(x*.98,x*.92,.042,6),F?a:r,T,E+.08+A,S),H(i,ft(x*1.16,P,6),r,T,E+.1+A+P*.5,S),H(i,Xt(x*.28),o,T,E+.1+A+P+x*.18,S,{scaleY:1.45,cast:!1,receive:!1}),I&&Ft(i,T,E+.08+A*.56,S+x*.92,x*.38,A*.34,.026,o)};if(e===1){H(i,Fe(.42,.46,.09,6),s,0,.045,c),d(0,.09,c,.24,.42,.44,!0,!1),Rn(i,0,.09,c+.24,.18,.24,s,o,r),Yt(i,-.48,0,-.14,"mallorn",1.12),Yt(i,.48,0,-.16,"mallorn",1.02),Di(i,t,-.32,.09,c+.32,.36,a,r,t.seed+.6,.35,.9);return}const u=e>=4?.64:e===3?.6:.54,h=e>=3?.24:.18;H(i,Fe(u,u+.04,h,10),n,0,h*.5,c),H(i,Fe(u-.04,u-.04,.025,10),a,0,h+.01,c,{cast:!1}),H(i,Fe(u+.018,u+.018,.032,10),r,0,h-.015,c,{cast:!1}),Rn(i,0,0,c+u*.94,.22,.26,n,o,r),vn(i,-.2,h+.02,c+u*.92,.075,.18,a,r,-.3),vn(i,.2,h+.02,c+u*.92,.075,.18,a,r,.3);const f=h+.02;if(e===2){d(0,f,c-.02,.21,.58,.52,!0,!0),Rn(i,0,f,c+.2,.17,.24,s,o,r),d(.46,0,-.24,.145,.54,.4,!0,!1),H(i,De(.32,.06,.07),n,.24,f+.24,c+.06,{rotY:-.25}),Yt(i,-.52,0,-.14,"mallorn",1.18),Yt(i,-.36,f,c-.22,"mallorn",.92),Yt(i,.54,0,.08,"mallorn",.96),Di(i,t,.46,.94,-.24,.2,a,r,t.seed+.8,.25,.8);return}const m=e===4?.42:.38,y=e===4?.3:.24;H(i,Fe(m,m+.03,y,10),n,0,f+y*.5,c-.04),H(i,Fe(m-.03,m-.03,.024,10),a,0,f+y+.01,c-.04,{cast:!1}),H(i,Fe(m+.016,m+.016,.03,10),r,0,f+y-.01,c-.04,{cast:!1}),Yt(i,-.58,0,.12,"mallorn",1.08),Yt(i,.58,0,.12,"mallorn",1.05),Yt(i,-.34,f,c+.24,"mallorn",.88),Yt(i,.34,f,c+.24,"mallorn",.88),Yt(i,0,f,c-.46,"mallorn",.95);const g=e===4?.6:.56,p=e===4?.7:.6;for(const T of[-1,1])d(T*g,0,-.22,.135,p,.42,!0,!1),vn(i,T*g,p*.72,-.075,.068,.2,a,r,0),H(i,De(.36,.055,.07),n,T*.36,f+.26,c+.08,{rotY:T*-.22});const v=f+y+.02;if(e===3){H(i,Fe(.12,.135,.22,8),n,.38,f+.11,c-.24),H(i,So(.125,8),r,.38,f+.21,c-.24),d(0,v,c-.04,.2,.66,.56,!0,!0),Rn(i,0,v,c+.17,.17,.25,s,o,r);for(const T of[-1,1]){const E=new ze;E.position.set(T*.36,v+.64,c+.06),E.userData.baseY=v+.64,E.userData.phase=t.seed+T*1.4,E.userData.spinSpeed=1.6,H(E,Xt(.062),o,0,0,0,{scaleY:1.4,cast:!1,receive:!1}),i.add(E),t.crystals.push(E)}return}for(const T of[-1,1])d(T*.38,f,c-.26,.115,.58,.38,!1,!1);const w=.78;H(i,Fe(.165,.225,w,8),n,0,v+w*.5,c-.04),H(i,Fe(.21,.21,.045,8),r,0,v+w*.54,c-.04),H(i,Fe(.195,.18,.05,8),a,0,v+w,c-.04),Rn(i,0,v,c+.19,.18,.28,s,o,r);for(let T=0;T<4;T++){const E=T*Math.PI/2+Math.PI/4,S=Math.cos(E)*.23,x=c-.04+Math.sin(E)*.23;H(i,Fe(.042,.056,.44,6),n,S,v+.22,x),H(i,ft(.062,.22,6),r,S,v+.55,x)}const _=v+w+.02;H(i,ft(.21,.48,6),o,0,_+.24,c-.04,{cast:!1,receive:!1});for(let T=0;T<4;T++){const E=T*Math.PI/2;H(i,De(.026,.46,.026),r,Math.cos(E)*.12,_+.22,c-.04+Math.sin(E)*.12,{rotZ:Math.cos(E)*.34,rotX:-Math.sin(E)*.34,cast:!1})}const M=_+.68,b=new ze;b.position.set(0,M,c-.04),b.userData.baseY=M,b.userData.phase=t.seed+.3,b.userData.spinSpeed=1.25,H(b,Xt(.115),l,0,0,0,{scaleX:.85,scaleY:1.55,scaleZ:.85,cast:!1,receive:!1}),H(b,Xt(.075),o,0,0,0,{rotY:Math.PI/4,scaleY:1.2,cast:!1,receive:!1}),H(b,Ho(.2,.02,5,14),r,0,0,0,{rotX:Math.PI*.36,rotY:.4,cast:!1,receive:!1}),i.add(b),t.crystals.push(b)}function zw(i,e,t){const n=Ze("#7b8798",{roughness:.84}),s=Ze("#596578",{roughness:.88}),r=Ze("#99a5b6",{roughness:.8}),a=Ze("#f1f5f9",{roughness:.74}),o=Ze("#d97706",{metalness:.56,roughness:.36,emissive:"#92400e",emissiveIntensity:.12}),l=Ze("#f5b82e",{metalness:.62,roughness:.28,emissive:"#b45309",emissiveIntensity:.16}),c=Ze("#fb923c",{emissive:"#f97316",emissiveIntensity:1.3,roughness:.26}),d=Ze("#fef08a",{emissive:"#f59e0b",emissiveIntensity:1.4,roughness:.22}),u=-.38,h=(v,w,_,M,b)=>{H(i,ft(_,M,6),s,v,M*.5,w,{rotY:b}),H(i,ft(_*.48,M*.44,6),a,v,M*.79,w,{rotY:b})},f=(v,w,_,M,b)=>{H(i,De(M,b,M),n,v,w+b*.5,_),H(i,De(M+.03,.045,M+.03),o,v,w+b-.05,_),H(i,De(M+.015,.035,M+.015),a,v,w+b+.01,_,{cast:!1}),_f(i,v,w+b+.02,_,M+.02,M+.02,r,.055,.048)};if(e===1){h(0,u-.18,.42,.9,.35),H(i,De(.66,.34,.46),n,0,.17,u+.02),H(i,De(.72,.06,.52),o,0,.36,u+.02),H(i,De(.68,.04,.48),a,0,.41,u+.02,{cast:!1}),Rn(i,0,0,u+.255,.25,.25,s,c,o,0,!0),Ft(i,-.22,.21,u+.255,.065,.075,.026,d),Ft(i,.22,.21,u+.255,.065,.075,.026,d),H(i,De(.15,.56,.15),s,.3,.28,u-.12),H(i,De(.1,.04,.1),c,.3,.57,u-.12,{cast:!1}),Jr(i,t,.3,.64,u-.12,3,"#e2e8f0",.058),Yt(i,-.5,0,-.1,"snow_pine",1.05);return}if(e===2){h(0,u-.18,.56,1.28,.4),h(-.42,u-.12,.34,.8,1.1),h(.42,u-.12,.34,.76,.8),H(i,De(.76,.42,.48),n,0,.21,u+.06),H(i,De(.8,.055,.52),o,0,.43,u+.06),f(-.32,0,u+.28,.24,.48),f(.32,0,u+.28,.24,.48),Rn(i,0,0,u+.31,.32,.32,s,c,l,0,!0),H(i,De(.42,.09,.12),o,0,.38,u+.29),H(i,De(.16,.66,.16),s,.46,.33,u-.02),H(i,De(.1,.04,.1),c,.46,.67,u-.02,{cast:!1}),Jr(i,t,.46,.74,u-.02,3,"#e2e8f0",.062),Yt(i,-.58,0,.1,"snow_pine",1),Yt(i,.58,0,.1,"snow_pine",.92),Di(i,t,.32,.54,u+.28,.28,o,l,t.seed+1.2,-.25,.9);return}e===3?(h(-.24,u-.22,.54,1.68,.3),h(.28,u-.2,.5,1.5,1),h(-.56,u-.06,.3,.86,.7),h(.56,u-.06,.3,.82,1.5)):(h(0,u-.22,.68,2.14,.25),h(-.46,u-.14,.42,1.38,.9),h(.46,u-.14,.42,1.34,1.6)),H(i,De(.92,.36,.42),n,0,.18,u+.16),H(i,De(.96,.05,.46),o,0,.37,u+.16),f(-.38,0,u+.34,.26,.52),f(.38,0,u+.34,.26,.52),vn(i,-.38,.44,u+.48,.085,.22,o,l,0),vn(i,.38,.44,u+.48,.085,.22,o,l,0),Rn(i,0,0,u+.36,.36,.34,s,c,l,0,!0),H(i,De(.032,.26,.06),o,0,.13,u+.375,{cast:!1});const m=.4;H(i,De(.68,.42,.42),r,0,m+.21,u-.02),H(i,De(.72,.055,.46),l,0,m+.43,u-.02),H(i,De(.7,.04,.44),a,0,m+.47,u-.02,{cast:!1}),Rn(i,0,m+.02,u+.2,.28,.3,s,c,l,0,!0),lr(i,t,0,m+.06,u+.23,.78,c,d,t.seed+.5),f(-.3,m,u+.08,.18,.42),f(.3,m,u+.08,.18,.42),Ft(i,-.44,m+.16,u+.14,.065,.09,.03,d,-.35),Ft(i,.44,m+.16,u+.14,.065,.09,.03,d,.35);for(const v of[-1,1])H(i,De(.13,.44,.13),s,v*.46,m+.22,u-.06),H(i,De(.085,.035,.085),c,v*.46,m+.45,u-.06,{cast:!1});if(Jr(i,t,.46,m+.52,u-.06,3,"#e2e8f0",.065),Jr(i,t,-.46,m+.52,u-.06,2,"#cbd5e1",.055),Yt(i,-.62,0,.14,"snow_pine",1.05),Yt(i,.62,0,.14,"snow_pine",1),e===3){H(i,So(.16,6),o,0,m+.48,u-.02),H(i,Xt(.055),l,0,m+.67,u-.02);return}const y=m+.52;H(i,De(.5,.4,.32),r,0,y+.2,u-.04),H(i,De(.4,.26,.2),n,0,y+.44,u-.06);const g=u+.12;H(i,De(.44,.095,.09),l,0,y+.34,g);const p=[[-.175,.14],[-.088,.19],[0,.26],[.088,.19],[.175,.14]];for(const[v,w]of p)H(i,ft(.05,w,4),l,v,y+.39+w*.5,g,{rotY:Math.PI/4});H(i,Xt(.075),d,0,y+.19,g+.02,{scaleX:.95,scaleY:1.4,scaleZ:.5,cast:!1,receive:!1});for(const v of[-1,1])H(i,De(.13,.48,.13),o,v*.58,.24,-.08),H(i,ft(.095,.14,4),l,v*.58,.55,-.08,{rotY:Math.PI/4}),Ft(i,v*.58,.28,-.01,.042,.18,.022,d)}const Gw={humans:{wall:"#f2ece0",trim:"#f5c542",cap:"#2563eb",capKind:"cone"},orcs:{wall:"#463d52",trim:"#2c2636",cap:"#cfc6b4",capKind:"spike",glow:"#ff6b2b"},elves:{wall:"#f6f2e6",trim:"#f5c542",cap:"#f5c542",capKind:"spire",glow:"#fef08a"},dwarves:{wall:"#7b8798",trim:"#d97706",cap:"#f1f5f9",capKind:"flat",glow:"#fb923c"}};function Vw(i,e,t,n){const s=Gw[e],r=yt(s.wall,{roughness:.82}),a=yt(s.trim,{roughness:.44,metalness:.42}),o=yt(s.cap,{roughness:s.capKind==="spire"?.34:.62,metalness:s.capKind==="spire"?.48:.12}),l=yt(t,{emissive:t,emissiveIntensity:.16,roughness:.74}),c=s.glow?yt(s.glow,{emissive:s.glow,emissiveIntensity:1.15,roughness:.3}):null,d=.89*n,u=.24,h=.095,f=Jt,m=.72*n,y=(p,v,w,_)=>{const M=Math.hypot(w-p,_-v);if(M<.08)return;const b=new ze;b.position.set((p+w)/2,f,(v+_)/2),b.rotation.y=-Math.atan2(_-v,w-p),H(b,De(M,u,h),r,0,u*.5,0),H(b,De(M,.042,h+.014),l,0,u*.64,0,{cast:!1});const T=Math.max(2,Math.round(M/.18)),E=De(.068,.056,h+.01);for(let S=0;S<T;S++){const x=-M*.5+M/T*(S+.5);H(b,E,r,x,u+.028,0,{cast:!1})}c&&e==="orcs"&&H(b,De(M*.85,.022,h+.016),c,0,u*.24,0,{cast:!1,receive:!1}),i.add(b)},g=(p,v,w=1,_=!1)=>{const M=.32*w,b=.175*w;if(H(i,De(b,M,b),r,p,f+M*.5,v),H(i,De(b+.028,.036,b+.028),a,p,f+M,v,{cast:!1}),s.capKind==="cone")H(i,ft(b*.76,.18*w,4),o,p,f+M+.1*w,v,{rotY:Math.PI/4});else if(s.capKind==="spire")H(i,ft(b*.66,.24*w,6),o,p,f+M+.13*w,v),c&&H(i,Xt(.034*w),c,p,f+M+.26*w,v,{cast:!1,receive:!1});else if(s.capKind==="spike"){for(const[T,E]of[[-1,-1],[1,-1],[-1,1],[1,1]])H(i,ft(.028*w,.13*w,4),o,p+T*b*.36,f+M+.075*w,v+E*b*.36,{cast:!1});c&&H(i,Xt(.04*w),c,p,f+M+.05,v,{cast:!1,receive:!1})}else H(i,De(b+.02,.044,b+.02),o,p,f+M+.04,v,{cast:!1}),c&&H(i,Xt(.036*w),c,p,f+M+.09,v,{cast:!1,receive:!1});_&&(H(i,De(.014,.12*w,.08*w),l,p+b*.5+.008,f+M*.58,v,{cast:!1,receive:!1}),H(i,De(.08*w,.12*w,.014),l,p,f+M*.58,v+b*.5+.008,{cast:!1,receive:!1}))};y(-d,-d,d,-d),y(-d,-d,-d,d),y(-d,d,d-m,d),y(d,-d,d,d-m),g(-d,-d,.94,!1),g(d,-d,1,!0),g(-d,d,1,!0),g(d-m,d,.76,!1),g(d,d-m,.76,!1)}function Ww(i,e,t,n,s,r){const a=Ze("#facc15",{metalness:.56,roughness:.3,emissive:"#f59e0b",emissiveIntensity:.24}),o=Ze(s,{emissive:s,emissiveIntensity:.18,roughness:.74}),l=Ze("#ef4444",{emissive:"#dc2626",emissiveIntensity:.65,roughness:.26}),c=new ze;c.position.set(t,Jt,n),i.add(c);const d=.88;H(c,Fe(.02,.028,d,6),a,0,d*.5,0,{cast:!1});const u=new ze;u.position.y=d+.04,H(u,Fe(.072,.058,.056,6),a,0,0,0,{cast:!1});for(let f=0;f<5;f++){const m=f/5*Math.PI*2;H(u,ft(.022,.072,4),a,Math.cos(m)*.06,.06,Math.sin(m)*.06,{cast:!1})}H(u,Xt(.032),l,0,.02,0,{cast:!1,receive:!1}),c.add(u);const h=new ze;h.position.set(0,d-.14,0),h.userData.bannerPhase=r,h.userData.baseRotY=.45,h.rotation.y=.45,H(h,De(.32,.21,.02),o,.16,-.02,0,{cast:!1}),H(h,De(.32,.032,.025),a,.16,-.11,0,{cast:!1}),H(h,Xt(.044),a,.16,-.02,.016,{scaleZ:.4,cast:!1}),c.add(h),e.banners.push(h),c.traverse(f=>{f.isMesh&&(f.renderOrder=36)})}function $w(i,e,t,n){const s=new ze;i.add(s);const r=e==="elves"?"mallorn":e==="dwarves"?"snow_pine":"cypress",a=[[-.72*n,.28*n],[.28*n,-.72*n],[-.56*n,.62*n]],o=Math.min(t,a.length);if(e==="orcs"){const l=Ze("#5b5169",{roughness:.78}),c=Ze("#ff6b2b",{emissive:"#ea580c",emissiveIntensity:1.15});for(let d=0;d<o;d++){const[u,h]=a[d];H(s,ft(.085,.24,4),l,u,Jt+.12,h),H(s,Xt(.042),c,u,Jt+.26,h,{cast:!1,receive:!1})}}else for(let l=0;l<o;l++){const[c,d]=a[l];Yt(s,c,Jt,d,r,.96)}s.traverse(l=>{l.isMesh&&(l.renderOrder=36)})}function Ec(i){const e=new ze;e.position.y=fe;const t={banners:[],smokePuffs:[],crystals:[],flames:[],seed:i.x*.73+i.y*1.19};e.userData.banners=t.banners,e.userData.smokePuffs=t.smokePuffs,e.userData.crystals=t.crystals,e.userData.flames=t.flames;const n=i.styleFaction,s=dt[n].palette,r=n==="orcs"?"#ef4444":s.primary,a=vf(i),o=Dw[a];e.userData.cityArtTier=a,Nw(e,n,a,o);const l=new ze;switch(l.position.set(0,Jt,0),l.rotation.y=Math.PI/4,e.add(l),n){case"humans":Fw(l,a,t);break;case"orcs":Bw(l,a,t);break;case"elves":Hw(l,a,t);break;case"dwarves":zw(l,a,t);break}return l.traverse(c=>{c.isMesh&&c.renderOrder===0&&(c.renderOrder=36)}),i.hasWalls&&Vw(e,n,r,o),i.parks>0&&$w(e,n,i.parks,o),i.isCapital&&Ww(e,t,-.7*o,.58*o,r,t.seed),e}function Xw(i){return Ec(i)}const qw=new Hi(.55,1);function ci(i,e,t){const n=Math.sin(i*127.1+e*311.7+t*74.7)*43758.5453123;return n-Math.floor(n)}function Yw(i,e,t){const n=new ze,s=1.28+(ci(i,e,1)-.5)*.22,r=ci(i,e,2)*Math.PI*2,a=We("cloud",{color:"#ffffff",roughness:.96,metalness:0,bumpScale:.012,flatShading:!1}),o=We("cloud",{color:"#dbe7f5",roughness:.96,metalness:0,bumpScale:.012,flatShading:!1}),l=4+(ci(i,e,3)>.5?1:0);for(let c=0;c<l;c++){const d=c===0,u=c/Math.max(l-1,1)*Math.PI*2+ci(i,e,10+c)*.8,h=d?0:.42+ci(i,e,20+c)*.28,f=d?1.15+ci(i,e,30)*.25:.68+ci(i,e,31+c)*.35,m=new V(qw,d||c%2===0?a:o);m.position.set(Math.cos(u)*h,d?.1:(ci(i,e,40+c)-.5)*.16,Math.sin(u)*h),m.scale.set(f*1.15,f*.68,f*1.08),m.rotation.set(ci(i,e,50+c)*Math.PI,ci(i,e,60+c)*Math.PI,0),m.castShadow=!1,m.receiveShadow=!1,n.add(m)}return n.position.set(t.x,s,t.z),{group:n,baseY:s,phase:r,baseX:t.x,baseZ:t.z}}const Kw="/assets/www/".replace(/\/?$/,"/"),Ut=i=>`${Kw}sprites/${i}`,xo={humans_warrior:Ut("humans_warrior.svg"),humans_defender:Ut("humans_defender.svg"),humans_archer:Ut("humans_archer.svg"),humans_rider:Ut("humans_rider.svg"),humans_catapult:Ut("humans_catapult.svg"),humans_rohirrim_knight:Ut("humans_rohirrim_knight.svg"),orcs_warrior:Ut("orcs_warrior.svg"),orcs_defender:Ut("orcs_defender.svg"),orcs_archer:Ut("orcs_archer.svg"),orcs_rider:Ut("orcs_rider.svg"),orcs_catapult:Ut("orcs_catapult.svg"),orcs_uruk_berserker:Ut("orcs_uruk_berserker.svg"),elves_warrior:Ut("elves_warrior.svg"),elves_defender:Ut("elves_defender.svg"),elves_archer:Ut("elves_archer.svg"),elves_rider:Ut("elves_rider.svg"),elves_catapult:Ut("elves_catapult.svg"),elves_elven_sentinel:Ut("elves_elven_sentinel.svg"),dwarves_warrior:Ut("dwarves_warrior.svg"),dwarves_defender:Ut("dwarves_defender.svg"),dwarves_archer:Ut("dwarves_archer.svg"),dwarves_rider:Ut("dwarves_rider.svg"),dwarves_catapult:Ut("dwarves_catapult.svg"),dwarves_ironbreaker:Ut("dwarves_ironbreaker.svg")},jw=Object.fromEntries(Object.keys(xo).map(i=>[i,Ut(`${i}_veteran.svg`)])),Zw={rohirrim_knight:"humans_rohirrim_knight",uruk_berserker:"orcs_uruk_berserker",elven_sentinel:"elves_elven_sentinel",ironbreaker:"dwarves_ironbreaker"};function Jw(i,e){const t=`${e}_${i}`;if(xo[t])return t;const n=Zw[i];return n||(xo[`${e}_warrior`]?`${e}_warrior`:"humans_warrior")}function id(i,e,t=!1){const n=Jw(i,e);if(t){const s=jw[n];if(s)return s}return xo[n]}const qi=1.56,Qw={dwarves:.78,humans:1,elves:1.06,orcs:1.02},eM={dwarves:1.08,humans:1,elves:.94,orcs:1.05};function wf(i,e="humans"){const t=Qw[e],n=eM[e];switch(i){case"dragon":return{width:2,height:1.95,shadowScale:1.24};case"watchtower":return{width:1.45,height:2.05,shadowScale:1.12};case"uruk_berserker":{const s=qi*1.24;return{width:s*1.04,height:s,shadowScale:1.12}}case"rohirrim_knight":{const s=qi*1.24;return{width:s*1.05,height:s,shadowScale:1.22}}case"rider":{const s=e==="humans"||e==="dwarves"?1.18:1.16,r=qi*t*s;return{width:r*(e==="dwarves"?1.13:e==="elves"?1:1.06),height:r,shadowScale:e==="dwarves"?1.12:1.2}}case"catapult":{const s=e==="dwarves"?1.38:1.54;return{width:s*1.22,height:s,shadowScale:1.24}}case"ironbreaker":{const s=qi*t*1.04;return{width:s*1.11,height:s,shadowScale:1.05}}case"elven_sentinel":{const s=qi*t*1.03;return{width:s*.94,height:s,shadowScale:1}}case"defender":{const s=qi*t;return{width:s*(n*1.03),height:s,shadowScale:1.03}}case"archer":{const s=qi*t*.99;return{width:s*n,height:s,shadowScale:.98}}case"warrior":default:{const s=qi*t;return{width:s*n,height:s,shadowScale:1}}}}function Sl(i,e="humans"){return wf(i,e).height}const tM=new A0,Qu=new Map;function nM(i){let e=Qu.get(i);return e||(e=tM.load(i),e.colorSpace=hn,e.minFilter=Pi,e.magFilter=Zn,e.generateMipmaps=!0,e.anisotropy=4,Qu.set(i,e)),e}const Mf=new Ri(.46,20);Mf.rotateX(-Math.PI/2);const iM=new Lt(.39,.43,.044,18),bf=new xn(.45,.58,28);bf.rotateX(-Math.PI/2);const Sf=new xn(.58,.69,24);Sf.rotateX(-Math.PI/2);const sM=new Zt(.11,0),xf=new ns(.145,.024,6,16);xf.rotateX(Math.PI/2);const Ac=.41,eh=8,Tf=new ns(Ac,.05,4,28);Tf.rotateX(Math.PI/2);const rM=new Zt(.06,0),aM=.6,oM=new lt({color:"#0b1220",transparent:!0,opacity:.34,depthWrite:!1}),Rc=new xe("#ffffff"),th=new xe("#6e788a"),lM=new xe("#5c6573"),cM=new xe("#7c8696"),Ef=new Lt(.18,.24,.68,6);Ef.rotateX(Math.PI/2);const dM=new Ie(.24,.12,.56),uM=new Lt(.11,.16,.42,6),hM=new Ie(.24,.2,.36),fM=new Ie(.19,.08,.28),nh=new tn(.048,.28,4),ih=new Zt(.042,0),pM=new tn(.06,.18,4),Af=new tn(.15,.56,5);Af.rotateX(-Math.PI/2);const mM=new Zt(.11,0),gM=new Ie(.78,.06,.08),yM=new Ie(.56,.032,.48),vM=new Ie(.52,.028,.36),sh=new tn(.055,.2,4),_M=new Ie(.76,.2,.76),wM=new Ie(.16,.72,.16),MM=new Ie(.54,1.18,.54),bM=new Ie(.08,.24,.04),SM=new Ie(.6,.12,.6),xM=new Ie(.62,.055,.62),TM=new Ie(.74,.15,.74),EM=new Ie(.16,.16,.16),AM=new tn(.055,.14,4),RM=new Ie(.24,.48,.03),CM=new Ie(.06,.42,.036),IM=new Lt(.22,.13,.16,6),Rf=new ns(.21,.028,5,12);Rf.rotateX(Math.PI/2);const PM=new tn(.17,.42,6),kM=new Zt(.12,0);function zn(i,e,t){const n=new pi({color:e,flatShading:!0,roughness:t?.roughness??.78,metalness:t?.metalness??.08,emissive:t?.emissive?new xe(t.emissive):new xe(0),emissiveIntensity:t?.emissiveIntensity??0});return i.push({material:n,originalColor:n.color.clone(),originalEmissive:n.emissive.clone(),originalEmissiveIntensity:n.emissiveIntensity}),n}function LM(i,e){const t=new ze;t.position.y=.68,t.rotation.y=Math.PI*.22,i.add(t);const n=zn(e,"#b91c1c",{roughness:.62,metalness:.18}),s=zn(e,"#dc2626",{roughness:.68,metalness:.06,emissive:"#991b1b",emissiveIntensity:.16}),r=zn(e,"#d97706",{roughness:.42,metalness:.48,emissive:"#b45309",emissiveIntensity:.12}),a=zn(e,"#292524",{roughness:.5,metalness:.35}),o=zn(e,"#ff7a1a",{roughness:.3,metalness:0,emissive:"#ff4500",emissiveIntensity:.95}),l=zn(e,"#fef08a",{roughness:.2,metalness:0,emissive:"#f59e0b",emissiveIntensity:1.25}),c=new V(Ef,n);c.position.set(0,.18,0),c.rotation.x=-.18,t.add(c);const d=new V(dM,o);d.position.set(0,.04,.03),d.rotation.x=-.18,t.add(d);for(let x=0;x<3;x++){const A=new V(pM,r);A.position.set(0,.37-x*.03,.16-x*.2),A.rotation.x=-.35,t.add(A)}const u=new V(sh,a);u.position.set(-.15,-.05,.12),u.rotation.set(Math.PI+.35,0,.18),t.add(u);const h=new V(sh,a);h.position.set(.15,-.05,.12),h.rotation.set(Math.PI+.35,0,-.18),t.add(h);const f=new V(uM,n);f.position.set(0,.44,.32),f.rotation.x=.48,t.add(f);const m=new ze;m.position.set(0,.62,.48),m.rotation.x=.08,t.add(m);const y=new V(hM,n);m.add(y);const g=new V(fM,r);g.position.set(0,-.11,.05),g.rotation.x=.14,m.add(g);const p=new V(nh,a);p.position.set(-.11,.16,-.12),p.rotation.set(-.75,0,.34),m.add(p);const v=new V(nh,a);v.position.set(.11,.16,-.12),v.rotation.set(-.75,0,-.34),m.add(v);const w=new V(ih,l);w.position.set(-.12,.04,.1),m.add(w);const _=new V(ih,l);_.position.set(.12,.04,.1),m.add(_);const M=new V(Af,n);M.position.set(0,.05,-.52),M.rotation.x=.28,t.add(M);const b=new V(mM,o);b.position.set(0,-.02,-.82),b.scale.set(.85,.6,1.35),t.add(b);const T=x=>{const A=new ze;A.position.set(x*.18,.28,.08);const P=new V(gM,r);P.position.set(x*.38,.12,.06),P.rotation.z=x*.28,P.rotation.y=-x*.16,A.add(P);const I=new V(yM,s);I.position.set(x*.32,.06,-.14),I.rotation.z=x*.22,I.rotation.y=-x*.14,A.add(I);const F=new V(vM,s);return F.position.set(x*.72,.18,-.2),F.rotation.z=x*.42,F.rotation.y=-x*.26,A.add(F),t.add(A),A},E=T(-1),S=T(1);return{root:t,wingLeft:E,wingRight:S}}function DM(i,e,t){const n=new ze;i.add(n);const s=zn(e,"#e2e8f0",{roughness:.84,metalness:.04}),r=zn(e,"#cbd5e1",{roughness:.86,metalness:.04}),a=zn(e,"#334155",{roughness:.76,metalness:.15}),o=zn(e,"#1d4ed8",{roughness:.62,metalness:.08,emissive:"#1e40af",emissiveIntensity:.14}),l=zn(e,"#f5c542",{roughness:.34,metalness:.56,emissive:"#ca8a04",emissiveIntensity:.22}),c=zn(e,"#f97316",{roughness:.25,metalness:0,emissive:"#ea580c",emissiveIntensity:1.05}),d=zn(e,"#fef08a",{roughness:.2,metalness:0,emissive:"#facc15",emissiveIntensity:1.35}),u=new V(_M,r);u.position.y=.1,n.add(u);const h=[[-.27,-.27],[.27,-.27],[-.27,.27],[.27,.27]];for(const[S,x]of h){const A=new V(wM,r);A.position.set(S,.46,x),n.add(A)}const f=new V(MM,s);f.position.y=.79,n.add(f);const m=[[0,.275,0],[0,-.275,0],[.275,0,Math.PI/2],[-.275,0,Math.PI/2]];for(const[S,x,A]of m){const P=new V(bM,a);P.position.set(S,.92,x),P.rotation.y=A,n.add(P)}const y=new V(SM,o);y.position.y=1.3,n.add(y);const g=new V(xM,l);g.position.y=1.22,n.add(g);const p=new V(TM,s);p.position.y=1.44,n.add(p);const v=[[-.29,-.29,!0],[.29,-.29,!0],[-.29,.29,!0],[.29,.29,!0],[0,-.29,!1],[0,.29,!1],[-.29,0,!1],[.29,0,!1]];for(const[S,x,A]of v){const P=new V(EM,s);if(P.position.set(S,1.59,x),n.add(P),A){const I=new V(AM,l);I.position.set(S,1.74,x),n.add(I)}}const w=(S,x,A,P)=>{const I=new ze;I.position.set(S,1.32,x),I.rotation.y=A,I.userData.bannerPhase=P,I.userData.baseRotY=A;const F=new V(RM,o);F.position.y=-.24,I.add(F);const N=new V(CM,l);N.position.y=-.23,I.add(N),n.add(I),t.push(I)};w(0,.3,0,.4),w(.3,0,Math.PI/2,1.7);const _=new V(IM,a);_.position.y=1.58,n.add(_);const M=new V(Rf,l);M.position.y=1.65,n.add(M);const b=new ze;b.position.y=1.66;const T=new V(PM,c);T.position.y=.21,b.add(T);const E=new V(kM,d);return E.position.y=.16,E.scale.set(.85,1.45,.85),b.add(E),n.add(b),{root:n,flameMesh:b}}function UM(i){return i==="orcs"?"#ef4444":dt[i].palette.primary}function Qa(i,e){i.onBeforeRender=(t,n,s)=>{if(!s.isOrthographicCamera)return;const r=s.matrixWorld.elements,a=r[8],o=r[9],l=r[10],c=Math.hypot(a,o,l)||1,d=e/c;i.matrixWorld.elements[12]+=a*d,i.matrixWorld.elements[13]+=o*d,i.matrixWorld.elements[14]+=l*d}}function OM(i,e,t){const n=new ze,s=UM(e),r=wf(i,e),a=[],o=new V(Mf,oM);o.position.y=.014,o.scale.setScalar(r.shadowScale),o.renderOrder=2,n.add(o);const l=new pi({color:s,flatShading:!0,roughness:.68,metalness:.08,emissive:new xe(s),emissiveIntensity:.16});a.push({material:l,originalColor:l.color.clone(),originalEmissive:l.emissive.clone(),originalEmissiveIntensity:l.emissiveIntensity});const c=new V(iM,l);c.position.y=.026,c.scale.set(r.shadowScale*.94,1,r.shadowScale*.94),c.receiveShadow=!0,c.renderOrder=3,n.add(c);const d=new lt({color:"#ffffff",side:_t,transparent:!0,opacity:.94,depthWrite:!1}),u=new V(bf,d);u.position.y=.038,u.visible=!1,u.renderOrder=4,n.add(u);let h=null;if(t?.canPromote){const P=new lt({color:"#fde047",side:_t,transparent:!0,opacity:.9,depthWrite:!1});h=new V(Sf,P),h.position.y=.042,h.renderOrder=5,n.add(h)}const f=new ze;f.position.y=.055,n.add(f);const m=[],y=i==="dragon"||i==="watchtower";let g,p,v,w,_,M,b,T;if(y)if(g=new jr({transparent:!0,opacity:0,depthWrite:!1}),p=new jr({transparent:!0,opacity:0,depthWrite:!1}),v=new $a(g),v.visible=!1,w=new $a(p),w.visible=!1,i==="dragon"){const P=LM(f,a);_=P.root,M=P.wingLeft,b=P.wingRight}else{const P=DM(f,a,m);_=P.root,T=P.flameMesh}else{const P=id(i,e,!!t?.isVeteran),I=nM(P);g=new jr({map:I,color:"#ffffff",transparent:!0,opacity:1,alphaTest:.08,depthTest:!0,depthWrite:!1}),v=new $a(g),v.center.set(.5,.04),v.scale.set(r.width,r.height,1),v.renderOrder=40,Qa(v,.88),f.add(v),p=new jr({map:I,color:"#ffffff",transparent:!0,opacity:.78,alphaTest:.08,blending:yo,depthTest:!0,depthWrite:!1}),w=new $a(p),w.center.set(.5,.04),w.scale.set(r.width,r.height,1),w.visible=!1,w.renderOrder=41,Qa(w,.9),f.add(w)}let E=null;if(t?.isVeteran){const P=new pi({color:"#a8641a",flatShading:!0,metalness:.6,roughness:.38,emissive:new xe("#6b3a0a"),emissiveIntensity:.35}),I=new pi({color:"#fff4d1",flatShading:!0,metalness:.2,roughness:.3,emissive:new xe("#fff1c2"),emissiveIntensity:.7});for(const D of[P,I])a.push({material:D,originalColor:D.color.clone(),originalEmissive:D.emissive.clone(),originalEmissiveIntensity:D.emissiveIntensity});const F=r.shadowScale*.94,N=new V(Tf,P);N.position.y=.052,N.scale.set(F,1.4,F),N.renderOrder=3,n.add(N);for(let D=0;D<eh;D++){const q=D/eh*Math.PI*2,Q=new V(rM,I);Q.position.set(Math.cos(q)*Ac*F,.085,Math.sin(q)*Ac*F),Q.scale.set(1,.7,1),Q.renderOrder=3,n.add(Q)}const Y=new ze,U=new pi({color:"#facc15",flatShading:!0,metalness:.58,roughness:.28,emissive:new xe("#eab308"),emissiveIntensity:.62});a.push({material:U,originalColor:U.color.clone(),originalEmissive:U.emissive.clone(),originalEmissiveIntensity:U.emissiveIntensity});const z=new V(sM,U);z.renderOrder=42,Qa(z,.9),Y.add(z);const $=new V(xf,U);$.position.y=-.04,$.renderOrder=42,Qa($,.9),Y.add($),Y.scale.setScalar(aM),Y.position.y=r.height+.06,f.add(Y),E=Y}const S=Rc.clone(),A={group:n,bodyGroup:f,baseDisc:c,baseDiscMat:l,readyRing:u,readyRingMat:d,veteranCrown:E,promoteRing:h,flashMaterials:[l],bodyMaterials:a,banners:m,unitHeight:r.height,sprite:v,spriteMat:g,flashSprite:w,flashSpriteMat:p,shadowDisc:o,baseScaleX:r.width,baseScaleY:r.height,restingSpriteColor:S,restingSpriteOpacity:1,isProcedural3D:y,proceduralRoot:_,wingLeft:M,wingRight:b,flameMesh:T,setHitFlash:(P,I="#ffffff")=>{if(y){if(P){const F=I.toLowerCase()==="#ffffff"||I.toLowerCase()==="white",N=F?"#ffffff":I;for(const Y of a)Y.material.emissive.set(N),Y.material.emissiveIntensity=F?.95:.82}else A.lastVisualOpts&&To(A,A.lastVisualOpts);return}P?(I.toLowerCase()==="#ffffff"||I.toLowerCase()==="white"?(g.color.setRGB(2.2,2.2,2.2),p.color.set("#ffffff"),p.opacity=.82):(g.color.setRGB(2.4,.65,.65),p.color.set(I),p.opacity=.72),g.opacity=1,w.scale.copy(v.scale),w.visible=!0):(g.color.copy(A.restingSpriteColor),g.opacity=A.restingSpriteOpacity,w.visible=!1)}};return To(A,{isHumanOwner:!!t?.isHumanOwner,actedThisTurn:!!t?.actedThisTurn,canCapture:!!t?.canCapture,canExploreRuins:!!t?.canExploreRuins}),A}function To(i,e){i.lastVisualOpts={...e};const t=i.bodyMaterials[0];if(e.isHumanOwner&&e.actedThisTurn){if(i.isProcedural3D)for(const n of i.bodyMaterials)n.material.color.copy(n.originalColor).lerp(cM,.62).multiplyScalar(.64),n.material.emissive.copy(n.originalEmissive),n.material.emissiveIntensity=n.originalEmissiveIntensity>.5?.2:0;else i.restingSpriteColor.copy(th),i.restingSpriteOpacity=.92,i.spriteMat.color.copy(th),i.spriteMat.opacity=.92;i.baseDiscMat.color.copy(lM),i.baseDiscMat.emissiveIntensity=0,i.baseDiscMat.opacity=.72,i.baseDiscMat.transparent=!0,i.readyRing.visible=!1,i.bodyGroup.scale.set(.96,.95,.96);return}if(i.isProcedural3D)for(const n of i.bodyMaterials)n.material.color.copy(n.originalColor),e.isHumanOwner&&!e.actedThisTurn?n.originalEmissiveIntensity>0?(n.material.emissive.copy(n.originalEmissive),n.material.emissiveIntensity=Math.max(n.originalEmissiveIntensity,.12)):(n.material.emissive.copy(n.originalColor),n.material.emissiveIntensity=.08):(n.material.emissive.copy(n.originalEmissive),n.material.emissiveIntensity=n.originalEmissiveIntensity);else i.restingSpriteColor.copy(Rc),i.restingSpriteOpacity=1,i.spriteMat.color.copy(Rc),i.spriteMat.opacity=1;if(t&&(i.baseDiscMat.color.copy(t.originalColor),i.baseDiscMat.emissive.copy(t.originalEmissive),i.baseDiscMat.emissiveIntensity=e.isHumanOwner?.24:.14),i.baseDiscMat.opacity=1,i.baseDiscMat.transparent=!1,i.bodyGroup.scale.set(1,1,1),e.isHumanOwner&&!e.actedThisTurn){i.readyRing.visible=!0;const n=!!(e.canCapture||e.canExploreRuins);i.readyRingMat.color.set(n?"#facc15":"#ffffff")}else i.readyRing.visible=!1}function xl(i){i.spriteMat.dispose(),i.flashSpriteMat.dispose(),i.readyRingMat.dispose();for(const e of i.bodyMaterials)e.material.dispose();if(i.promoteRing&&i.promoteRing instanceof V){const e=i.promoteRing.material;Array.isArray(e)?e.forEach(t=>t.dispose()):e.dispose()}}const NM=.033;function yn(i,e){return`${i},${e}`}function qn(i){for(;i.children.length>0;)i.remove(i.children[0])}function FM(i){return i==="orcs"?"#ef4444":dt[i].palette.primary}class Oe{static CITY_UNIT_SHADOW_MAT=new lt({color:"#05080f",transparent:!0,opacity:.48,depthWrite:!1});static DEFAULT_UNIT_SHADOW_MAT;boardRoot=new ze;fxGroup=new ze;skirtGroup=new ze;tilesGroup=new ze;bordersGroup=new ze;citiesGroup=new ze;unitsGroup=new ze;cloudsGroup=new ze;overlaysGroup=new ze;static UNIT_HIT_GEO=new Lt(.5,.54,1.65,10);static UNIT_HIT_MAT=new lt({visible:!1});static BORDER_RIBBON_H=.055;static BORDER_RIBBON_THICK=.12;static BORDER_H_GEO=new Ie(gr-.02,Oe.BORDER_RIBBON_H,Oe.BORDER_RIBBON_THICK);static BORDER_V_GEO=new Ie(Oe.BORDER_RIBBON_THICK,Oe.BORDER_RIBBON_H,gr-.02);static MOVE_FILL_GEO=(()=>{const e=new Ri(.42,24);return e.rotateX(-Math.PI/2),e})();static MOVE_FILL_COMPACT_GEO=(()=>{const e=new Ri(.35,24);return e.rotateX(-Math.PI/2),e})();static MOVE_RING_GEO=(()=>{const e=new xn(.42,.54,28);return e.rotateX(-Math.PI/2),e})();static MOVE_RING_COMPACT_GEO=(()=>{const e=new xn(.35,.46,28);return e.rotateX(-Math.PI/2),e})();static MOVE_DOT_GEO=(()=>{const e=new Ri(.17,18);return e.rotateX(-Math.PI/2),e})();static MOVE_FILL_MAT=new lt({color:"#38bdf8",side:_t,transparent:!0,opacity:.72,depthTest:!1,depthWrite:!1});static MOVE_RING_MAT=new lt({color:"#e0f2fe",side:_t,transparent:!0,opacity:.94,depthTest:!1,depthWrite:!1});static MOVE_DOT_MAT=new lt({color:"#e0f2fe",side:_t,transparent:!0,opacity:.96,depthTest:!1,depthWrite:!1});static SUPERPOWER_FILL_GEO=(()=>{const e=new Ri(.48,24);return e.rotateX(-Math.PI/2),e})();static SUPERPOWER_FILL_COMPACT_GEO=(()=>{const e=new Ri(.38,24);return e.rotateX(-Math.PI/2),e})();static SUPERPOWER_RING_GEO=(()=>{const e=new xn(.48,.64,28);return e.rotateX(-Math.PI/2),e})();static SUPERPOWER_RING_COMPACT_GEO=(()=>{const e=new xn(.38,.52,28);return e.rotateX(-Math.PI/2),e})();static VOLCANO_FILL_MAT=new lt({color:"#ff5a1f",side:_t,transparent:!0,opacity:.44,depthTest:!1,depthWrite:!1});static VOLCANO_RING_MAT=new lt({color:"#ff5a1f",side:_t,transparent:!0,opacity:.96,depthTest:!1,depthWrite:!1});static VOLCANO_DOT_MAT=new lt({color:"#fde047",side:_t,transparent:!0,opacity:.95,depthTest:!1,depthWrite:!1});static TOWER_FILL_MAT=new lt({color:"#f5c542",side:_t,transparent:!0,opacity:.4,depthTest:!1,depthWrite:!1});static TOWER_RING_MAT=new lt({color:"#f5c542",side:_t,transparent:!0,opacity:.96,depthTest:!1,depthWrite:!1});static TOWER_DOT_MAT=new lt({color:"#fef9c3",side:_t,transparent:!0,opacity:.95,depthTest:!1,depthWrite:!1});static ATTACK_RING_GEO=(()=>{const e=new xn(.62,.84,24);return e.rotateX(-Math.PI/2),e})();static ATTACK_RING_MAT=new lt({color:"#f43f5e",side:_t,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1});static ATTACK_DIAMOND_GEO=new Zt(.16,0);static ATTACK_DIAMOND_MAT=new lt({color:"#fb7185"});static LETHAL_OUTER_RING_GEO=(()=>{const e=new xn(.66,.88,28);return e.rotateX(-Math.PI/2),e})();static LETHAL_OUTER_RING_MAT=new lt({color:"#ef4444",side:_t,transparent:!0,opacity:.94,depthTest:!1,depthWrite:!1});static LETHAL_INNER_RING_GEO=(()=>{const e=new xn(.44,.58,28);return e.rotateX(-Math.PI/2),e})();static LETHAL_INNER_RING_MAT=new lt({color:"#fbbf24",side:_t,transparent:!0,opacity:.95,depthTest:!1,depthWrite:!1});static LETHAL_CORE_GEO=new Zt(.21,0);static LETHAL_CORE_MAT=new lt({color:"#dc2626"});static LETHAL_GOLD_MAT=new lt({color:"#facc15"});static LETHAL_HALO_GEO=(()=>{const e=new ns(.32,.032,6,16);return e.rotateX(Math.PI/2),e})();static LETHAL_SPIKE_X_GEO=new Ie(.22,.045,.045);static LETHAL_SPIKE_Z_GEO=new Ie(.045,.045,.22);static LETHAL_CROWN_GEO=new Zt(.085,0);static TUTORIAL_RING_GEO=(()=>{const e=new xn(.56,.74,28);return e.rotateX(-Math.PI/2),e})();static TUTORIAL_FILL_GEO=(()=>{const e=new Ri(.56,28);return e.rotateX(-Math.PI/2),e})();static TUTORIAL_RING_MAT=new lt({color:"#fde047",side:_t,transparent:!0,opacity:.94,depthTest:!1,depthWrite:!1});static TUTORIAL_FILL_MAT=new lt({color:"#facc15",side:_t,transparent:!0,opacity:.22,depthTest:!1,depthWrite:!1});mapSize=0;initialized=!1;lastBorderFingerprint=null;tileEntries=new Map;cityEntries=new Map;unitEntries=new Map;tileHitMeshes=[];unitHitMeshes=[];moveTargetHitMeshes=[];superpowerTargetHitMeshes=[];animatedTrees=[];waterMeshes=[];windmillBlades=[];cityBanners=[];unitBanners=[];tileSmokePuffs=[];citySmokePuffs=[];cityCrystals=[];cityFlames=[];floatingMotes=[];tileResourceGroups=new Map;tilesByCoord=new Map;cityCoords=new Set;mountainCoords=new Set;unitWorldCoords=new Map;unitHeightsByCoord=new Map;unitObjects=new Map;unitBaseMeta=new Map;cityObjects=new Map;cloudObjects=new Map;static CITY_PULSE_DURATION=.34;animatingUnitIds=new Set;animatingCloudKeys=new Set;cityPulses=new Map;hoverBracket;selectedRing;moveOverlayGroup=new ze;attackOverlayGroup=new ze;superpowerOverlayGroup=new ze;tutorialOverlayGroup=new ze;tutorialResourceKeys=new Set;tutorialTileCoords=[];constructor(e){this.boardRoot.add(this.skirtGroup,this.tilesGroup,this.bordersGroup,this.citiesGroup,this.unitsGroup,this.cloudsGroup,this.overlaysGroup,this.fxGroup),e.add(this.boardRoot),this.hoverBracket=this.buildHoverBracket(),this.hoverBracket.visible=!1,this.overlaysGroup.add(this.hoverBracket);const t=new lt({color:"#facc15",side:_t,transparent:!0,opacity:.92,depthTest:!1,depthWrite:!1});this.selectedRing=new V(new xn(.64,.8,24),t),this.selectedRing.rotation.x=-Math.PI/2,this.selectedRing.renderOrder=31,this.selectedRing.visible=!1,this.overlaysGroup.add(this.selectedRing),this.overlaysGroup.add(this.tutorialOverlayGroup,this.moveOverlayGroup,this.attackOverlayGroup,this.superpowerOverlayGroup)}buildHoverBracket(){const e=new ze,t=new lt({color:"#fef9c3",transparent:!0,opacity:.9}),n=.92,s=.44,r=.07,a=.03,o=[[-n,-n,1,1],[n,-n,-1,1],[-n,n,1,-1],[n,n,-1,-1]];for(const[l,c,d,u]of o){const h=new V(new Ie(s,a,r),t);h.position.set(l+d*s/2,0,c),e.add(h);const f=new V(new Ie(r,a,s),t);f.position.set(l,0,c+u*s/2),e.add(f)}return e}getMapSize(){return this.mapSize}getTileHitMeshes(){return this.tileHitMeshes}getUnitHitMeshes(){return this.unitHitMeshes}getMoveTargetHitMeshes(){return this.superpowerTargetHitMeshes.length===0?this.moveTargetHitMeshes:this.moveTargetHitMeshes.length===0?this.superpowerTargetHitMeshes:[...this.moveTargetHitMeshes,...this.superpowerTargetHitMeshes]}getUnitObject(e){return this.unitObjects.get(e)}getCityObject(e){return this.cityObjects.get(e)}pulseCity(e){this.cityObjects.has(e)&&this.cityPulses.set(e,{elapsed:0,duration:Oe.CITY_PULSE_DURATION})}isCityPulsing(e){return this.cityPulses.has(e)}getTutorialOverlayCount(){return this.tutorialOverlayGroup.children.length}getTutorialResourceTargetKeys(){return this.tutorialResourceKeys}getCloudObject(e,t){return this.cloudObjects.get(yn(e,t))}markUnitAnimating(e,t){t?this.animatingUnitIds.add(e):this.animatingUnitIds.delete(e)}markCloudAnimating(e,t,n){const s=yn(e,t);n?this.animatingCloudKeys.add(s):this.animatingCloudKeys.delete(s)}removeCloudImmediate(e,t){const n=yn(e,t);this.animatingCloudKeys.delete(n);const s=this.cloudObjects.get(n);s&&(this.disposeCloudFadeMaterials(s),this.cloudsGroup.remove(s.group),this.cloudObjects.delete(n))}revealTilesUnderClouds(e,t,n){if(n.length===0||!this.initialized||this.mapSize!==e.mapSize)return;const r=(e.players.find(o=>o.id===t)??e.players.find(o=>o.isHuman)??e.players[0])?.revealedTiles??[];let a=!1;for(const o of n){if(o.x<0||o.y<0||o.x>=e.mapSize||o.y>=e.mapSize)continue;const l=Ve(o.x,o.y,e.mapSize);if(!!!r[l])continue;const d=e.tiles[l],u=yn(o.x,o.y);this.tilesByCoord.set(u,d),d.terrain==="mountain"&&!d.isCityCenter&&!d.hasVillage&&this.mountainCoords.add(u);const h=_e(e,o.x,o.y-1),f=_e(e,o.x,o.y+1),m=_e(e,o.x-1,o.y),y=_e(e,o.x+1,o.y),g={northWater:h?.terrain==="water",southWater:f?.terrain==="water",westWater:m?.terrain==="water",eastWater:y?.terrain==="water",northRoad:!!(h&&(h.hasRoad||h.isCityCenter)),southRoad:!!(f&&(f.hasRoad||f.isCityCenter)),westRoad:!!(m&&(m.hasRoad||m.isCityCenter)),eastRoad:!!(y&&(y.hasRoad||y.isCityCenter))},p=(g.northWater?1:0)|(g.southWater?2:0)|(g.westWater?4:0)|(g.eastWater?8:0)|(g.northRoad?16:0)|(g.southRoad?32:0)|(g.westRoad?64:0)|(g.eastRoad?128:0),v=d.cityId?e.cities[d.cityId]:void 0,w=`${d.terrain}|${d.biome}|${d.resource??""}|${d.improvement??""}|${d.hasRoad?1:0}|${d.hasVillage?1:0}|${d.isCityCenter?1:0}|${d.cityId??""}|${v?.level??""}|${v?.ownerId??""}|${v?.hasWalls?1:0}|${v?.parks??0}|1|${p}`,_=this.tileEntries.get(u);if(_&&_.fingerprint===w)continue;_&&(this.tilesGroup.remove(_.group),_.built.waterMesh&&_.built.waterMesh.geometry.dispose());const M=Ci(d,e.mapSize,g,!0);this.tilesGroup.add(M.group),this.tileEntries.set(u,{fingerprint:w,group:M.group,hitMesh:M.hitMesh,built:M}),a=!0}if(a){this.tileHitMeshes=[],this.animatedTrees=[],this.waterMeshes=[],this.windmillBlades=[],this.floatingMotes=[],this.tileSmokePuffs=[],this.tileResourceGroups.clear();for(const[o,l]of this.tileEntries){const c=l.built;if(this.tileHitMeshes.push(c.hitMesh),c.animatedTrees.length>0&&this.animatedTrees.push(...c.animatedTrees),c.waterMesh&&this.waterMeshes.push(c.waterMesh),c.windmillBlades&&this.windmillBlades.push(c.windmillBlades),c.floatingMotes.length>0&&this.floatingMotes.push(...c.floatingMotes),c.smokePuffs.length>0&&this.tileSmokePuffs.push(...c.smokePuffs),c.resourceGroup){const[d,u]=o.split(",").map(Number);this.tileResourceGroups.set(o,{group:c.resourceGroup,baseY:c.resourceGroup.position.y,phase:((d||0)*1.4+(u||0)*2.3)%(Math.PI*2)})}}}}disposeCloudFadeMaterials(e){const t=e.group.userData.clonedMats;if(t){for(const n of t)n.dispose();e.group.userData.clonedMats=void 0}}resetAllCachedMeshes(){for(const e of this.tileEntries.values())e.built.waterMesh&&e.built.waterMesh.geometry.dispose();qn(this.tilesGroup),this.tileEntries.clear(),this.tileHitMeshes=[],this.animatedTrees=[],this.waterMeshes=[],this.windmillBlades=[],this.floatingMotes=[],this.tileSmokePuffs=[],this.tileResourceGroups.clear(),qn(this.tutorialOverlayGroup),this.tutorialResourceKeys.clear(),this.tutorialTileCoords=[];for(const e of this.cloudObjects.values())this.disposeCloudFadeMaterials(e);qn(this.cloudsGroup),this.cloudObjects.clear(),this.animatingCloudKeys.clear(),qn(this.bordersGroup),this.lastBorderFingerprint=null,qn(this.citiesGroup),this.cityEntries.clear(),this.cityObjects.clear(),this.cityPulses.clear(),this.cityBanners=[],this.citySmokePuffs=[],this.cityCrystals=[],this.cityFlames=[];for(const e of this.unitEntries.values())xl(e.built);qn(this.unitsGroup),this.unitEntries.clear(),this.unitObjects.clear(),this.unitBaseMeta.clear(),this.unitHitMeshes=[],this.unitBanners=[],this.animatingUnitIds.clear()}syncState(e,t){const n=e.players.find(f=>f.id===t)??e.players.find(f=>f.isHuman)??e.players[0],s=n?.id??t,r=n?.revealedTiles??[];(!this.initialized||this.mapSize!==e.mapSize||this.skirtGroup.children.length===0)&&(this.resetAllCachedMeshes(),this.mapSize=e.mapSize,this.initialized=!0,qn(this.skirtGroup),this.skirtGroup.add(Iw(e.mapSize))),this.tilesByCoord.clear(),this.mountainCoords.clear();let a=!1;for(let f=0;f<e.mapSize;f++)for(let m=0;m<e.mapSize;m++){const y=Ve(m,f,e.mapSize),g=e.tiles[y],p=yn(m,f),v=!!r[y];this.tilesByCoord.set(p,g),v&&g.terrain==="mountain"&&!g.isCityCenter&&!g.hasVillage&&this.mountainCoords.add(p);const w=_e(e,m,f-1),_=_e(e,m,f+1),M=_e(e,m-1,f),b=_e(e,m+1,f),T={northWater:w?.terrain==="water",southWater:_?.terrain==="water",westWater:M?.terrain==="water",eastWater:b?.terrain==="water",northRoad:!!(w&&(w.hasRoad||w.isCityCenter)),southRoad:!!(_&&(_.hasRoad||_.isCityCenter)),westRoad:!!(M&&(M.hasRoad||M.isCityCenter)),eastRoad:!!(b&&(b.hasRoad||b.isCityCenter))},E=(T.northWater?1:0)|(T.southWater?2:0)|(T.westWater?4:0)|(T.eastWater?8:0)|(T.northRoad?16:0)|(T.southRoad?32:0)|(T.westRoad?64:0)|(T.eastRoad?128:0),S=g.cityId?e.cities[g.cityId]:void 0,x=`${g.terrain}|${g.biome}|${g.resource??""}|${g.improvement??""}|${g.hasRoad?1:0}|${g.hasVillage?1:0}|${g.isCityCenter?1:0}|${g.cityId??""}|${S?.level??""}|${S?.ownerId??""}|${S?.hasWalls?1:0}|${S?.parks??0}|${v?1:0}|${E}`,A=this.tileEntries.get(p);if(A&&A.fingerprint===x)continue;A&&(this.tilesGroup.remove(A.group),A.built.waterMesh&&A.built.waterMesh.geometry.dispose());const P=Ci(g,e.mapSize,T,v);this.tilesGroup.add(P.group),this.tileEntries.set(p,{fingerprint:x,group:P.group,hitMesh:P.hitMesh,built:P}),a=!0}if(a){this.tileHitMeshes=[],this.animatedTrees=[],this.waterMeshes=[],this.windmillBlades=[],this.floatingMotes=[],this.tileSmokePuffs=[],this.tileResourceGroups.clear();for(const[f,m]of this.tileEntries){const y=m.built;if(this.tileHitMeshes.push(y.hitMesh),y.animatedTrees.length>0&&this.animatedTrees.push(...y.animatedTrees),y.waterMesh&&this.waterMeshes.push(y.waterMesh),y.windmillBlades&&this.windmillBlades.push(y.windmillBlades),y.floatingMotes.length>0&&this.floatingMotes.push(...y.floatingMotes),y.smokePuffs.length>0&&this.tileSmokePuffs.push(...y.smokePuffs),y.resourceGroup){const[g,p]=f.split(",").map(Number);this.tileResourceGroups.set(f,{group:y.resourceGroup,baseY:y.resourceGroup.position.y,phase:((g||0)*1.4+(p||0)*2.3)%(Math.PI*2)})}}this.tutorialTileCoords.length>0&&this.rebuildTutorialOverlays()}for(let f=0;f<e.mapSize;f++)for(let m=0;m<e.mapSize;m++){const y=Ve(m,f,e.mapSize),g=yn(m,f);if(r[y])this.cloudObjects.has(g)&&!this.animatingCloudKeys.has(g)&&this.removeCloudImmediate(m,f);else if(!this.cloudObjects.has(g)){const p=ht(m,f,e.mapSize,0),v=Yw(m,f,p);this.cloudsGroup.add(v.group),this.cloudObjects.set(g,v)}}const o=[];for(let f=0;f<e.tiles.length;f++){if(!r[f])continue;const m=e.tiles[f].cityId;if(!m)continue;const y=e.cities[m]?.ownerId;y&&o.push(`${f}:${y}`)}const l=o.join(",");l!==this.lastBorderFingerprint&&(this.lastBorderFingerprint=l,this.rebuildTerritoryBorders(e,r)),this.cityCoords.clear();const c=new Set;let d=!1;for(const f of Object.values(e.cities)){const m=Ve(f.x,f.y,e.mapSize);if(!r[m])continue;c.add(f.id),this.cityCoords.add(yn(f.x,f.y));const y=`${f.x}|${f.y}|${f.styleFaction}|${f.ownerId}|${f.level}|${f.isCapital?1:0}|${f.hasWalls?1:0}|${f.parks}`,g=this.cityEntries.get(f.id);if(g&&g.fingerprint===y)continue;g&&this.citiesGroup.remove(g.mesh);const p=Xw(f),v=ht(f.x,f.y,e.mapSize,fe);p.position.set(v.x,fe,v.z),p.userData.baseY=fe,this.citiesGroup.add(p),this.cityEntries.set(f.id,{fingerprint:y,mesh:p}),this.cityObjects.set(f.id,p),d=!0}for(const[f,m]of this.cityEntries)c.has(f)||(this.citiesGroup.remove(m.mesh),this.cityEntries.delete(f),this.cityObjects.delete(f),this.cityPulses.delete(f),d=!0);if(d){this.cityBanners=[],this.citySmokePuffs=[],this.cityCrystals=[],this.cityFlames=[];for(const f of this.cityEntries.values()){const m=f.mesh.userData.banners;m&&m.length>0&&this.cityBanners.push(...m);const y=f.mesh.userData.smokePuffs;y&&y.length>0&&this.citySmokePuffs.push(...y);const g=f.mesh.userData.crystals;g&&g.length>0&&this.cityCrystals.push(...g);const p=f.mesh.userData.flames;p&&p.length>0&&this.cityFlames.push(...p)}}const u=new Map;for(const f of e.players)u.set(f.id,f.faction);const h=new Set;this.unitHitMeshes=[],this.unitBanners=[],this.unitWorldCoords.clear(),this.unitHeightsByCoord.clear();for(const f of Object.values(e.units)){const m=Ve(f.x,f.y,e.mapSize);if(!r[m])continue;h.add(f.id);const y=u.get(f.ownerId)??"humans",g=f.ownerId===s,p=!!f.canCapture,v=!!f.canExploreRuins,w=g?!f.actedThisTurn&&la(e,f.id):!f.actedThisTurn,_=g?!w:f.actedThisTurn,M=Ai(e,f.x,f.y),b=`${g?1:0}|${_?1:0}|${p?1:0}|${v?1:0}`,T=this.animatingUnitIds.has(f.id);let E=this.unitEntries.get(f.id);if(E!==void 0&&E.type===f.type&&E.faction===y&&E.isVeteran===f.isVeteran&&E.canPromote===f.canPromote&&E)E.hitMesh.userData.tileX=f.x,E.hitMesh.userData.tileY=f.y,T||(E.built.group.position.copy(M),E.built.group.visible=!0,E.built.group.scale.setScalar(1),E.built.sprite.scale.set(E.built.baseScaleX,E.built.baseScaleY,1),E.built.spriteMat.rotation=0),E.lastVisualKey!==b&&(To(E.built,{isHumanOwner:g,actedThisTurn:_,canCapture:p,canExploreRuins:v}),E.lastVisualKey=b);else{E&&(this.unitsGroup.remove(E.built.group),xl(E.built));const F=OM(f.type,y,{isVeteran:f.isVeteran,canPromote:f.canPromote,actedThisTurn:_,canCapture:p,canExploreRuins:v,isHumanOwner:g});Oe.DEFAULT_UNIT_SHADOW_MAT??=F.shadowDisc.material,F.group.position.copy(M),To(F,{isHumanOwner:g,actedThisTurn:_,canCapture:p,canExploreRuins:v});const N=new V(Oe.UNIT_HIT_GEO,Oe.UNIT_HIT_MAT),Y=Math.max(.74,F.unitHeight/1.65);N.scale.set(1,Y,1),N.position.y=F.unitHeight*.52,N.userData={tileX:f.x,tileY:f.y,unitId:f.id},F.group.add(N),this.unitsGroup.add(F.group),E={built:F,type:f.type,faction:y,isVeteran:f.isVeteran,canPromote:f.canPromote,hitMesh:N,lastVisualKey:b},this.unitEntries.set(f.id,E),this.unitObjects.set(f.id,F)}this.unitHitMeshes.push(E.hitMesh);const x=!!e.tiles[f.y*e.mapSize+f.x]?.isCityCenter,A=E.built.shadowDisc;x?A.material=Oe.CITY_UNIT_SHADOW_MAT:A.material===Oe.CITY_UNIT_SHADOW_MAT&&(A.material=Oe.DEFAULT_UNIT_SHADOW_MAT??A.material);const P=this.unitBaseMeta.get(f.id);this.unitBaseMeta.set(f.id,{isHumanOwner:g,exhausted:_,canCapture:p,canExploreRuins:v,phase:P?.phase??(f.x*1.3+f.y*2.1)%(Math.PI*2)}),E.built.banners.length>0&&this.unitBanners.push(...E.built.banners);const I=yn(f.x,f.y);this.unitWorldCoords.set(I,M.clone()),this.unitHeightsByCoord.set(I,E.built.unitHeight)}for(const[f,m]of this.unitEntries)!h.has(f)&&!this.animatingUnitIds.has(f)&&(this.unitsGroup.remove(m.built.group),xl(m.built),this.unitEntries.delete(f),this.unitObjects.delete(f),this.unitBaseMeta.delete(f))}rebuildTerritoryBorders(e,t){qn(this.bordersGroup);const n=(a,o)=>{const l=_e(e,a,o);return!l||!l.cityId?null:e.cities[l.cityId]?.ownerId??null},s=new Map;for(const a of e.players)s.set(a.id,a.faction);const r=gr*.5-.06;for(let a=0;a<e.mapSize;a++)for(let o=0;o<e.mapSize;o++){const l=Ve(o,a,e.mapSize);if(!t[l])continue;const c=n(o,a);if(!c)continue;const d=s.get(c);if(!d)continue;const u=FM(d),h=yt(u,{roughness:.48,emissive:u,emissiveIntensity:.35}),f=ht(o,a,e.mapSize,fe+.032);if(n(o,a-1)!==c){const m=new V(Oe.BORDER_H_GEO,h);m.position.set(f.x,f.y,f.z-r),this.bordersGroup.add(m)}if(n(o,a+1)!==c){const m=new V(Oe.BORDER_H_GEO,h);m.position.set(f.x,f.y,f.z+r),this.bordersGroup.add(m)}if(n(o-1,a)!==c){const m=new V(Oe.BORDER_V_GEO,h);m.position.set(f.x-r,f.y,f.z),this.bordersGroup.add(m)}if(n(o+1,a)!==c){const m=new V(Oe.BORDER_V_GEO,h);m.position.set(f.x+r,f.y,f.z),this.bordersGroup.add(m)}}}setHoverTile(e){if(!e){this.hoverBracket.visible=!1;return}const t=ht(e.x,e.y,this.mapSize,fe+.04);this.hoverBracket.position.copy(t),this.hoverBracket.visible=!0}getMoveOverlayY(e){return e?e.terrain==="mountain"&&!e.isCityCenter&&!e.hasVillage?fe+Zi+.04:e.isCityCenter||e.hasVillage?fe+Jt+.04:e.improvement!==null||e.resource!==null?fe+.36:fe+.05:fe+.05}setSelectedTile(e){if(!e){this.selectedRing.visible=!1;return}const t=yn(e.x,e.y),n=this.unitWorldCoords.get(t);if(n){this.selectedRing.position.set(n.x,n.y+.03,n.z),this.selectedRing.visible=!0;return}if(this.mountainCoords.has(t)){const a=ht(e.x,e.y,this.mapSize,fe+Zi+.03);this.selectedRing.position.set(a.x+bs,a.y,a.z+Ss),this.selectedRing.visible=!0;return}const s=this.tilesByCoord.get(t);if(this.cityCoords.has(t)||s?.hasVillage){const a=ht(e.x,e.y,this.mapSize,fe+Jt+.03);this.selectedRing.position.set(a.x+Ts,a.y,a.z+Es),this.selectedRing.visible=!0;return}const r=ht(e.x,e.y,this.mapSize,this.getMoveOverlayY(s));this.selectedRing.position.copy(r),this.selectedRing.visible=!0}setMoveTargets(e){if(qn(this.moveOverlayGroup),this.moveTargetHitMeshes=[],e.length!==0)for(const t of e){const n=yn(t.x,t.y),s=this.tilesByCoord.get(n),r=this.mountainCoords.has(n)||!!(s&&s.terrain==="mountain"&&!s.isCityCenter&&!s.hasVillage),a=this.cityCoords.has(n)||!!(s&&(s.isCityCenter||s.hasVillage)),o=this.getMoveOverlayY(s),l=ht(t.x,t.y,this.mapSize,o);r?(l.x+=bs,l.z+=Ss):a&&(l.x+=Ts,l.z+=Es);const c=r||a,d=new V(c?Oe.MOVE_FILL_COMPACT_GEO:Oe.MOVE_FILL_GEO,Oe.MOVE_FILL_MAT);d.position.copy(l),d.renderOrder=32,d.userData={tileX:t.x,tileY:t.y},this.moveOverlayGroup.add(d),this.moveTargetHitMeshes.push(d);const u=new V(c?Oe.MOVE_RING_COMPACT_GEO:Oe.MOVE_RING_GEO,Oe.MOVE_RING_MAT);u.position.set(l.x,l.y+.005,l.z),u.renderOrder=32,this.moveOverlayGroup.add(u);const h=new V(Oe.MOVE_DOT_GEO,Oe.MOVE_DOT_MAT);h.position.set(l.x,l.y+.01,l.z),h.renderOrder=33,h.userData={isMoveDot:!0,phase:(t.x*.7+t.y*1.1)%(Math.PI*2)},this.moveOverlayGroup.add(h)}}setAttackTargets(e){if(qn(this.attackOverlayGroup),e.length!==0)for(const t of e){const n=yn(t.x,t.y),s=this.tilesByCoord.get(n),r=this.unitWorldCoords.get(n),a=this.mountainCoords.has(n);let o,l,c;if(r)o=r.x,l=r.y,c=r.z;else if(a){const d=ht(t.x,t.y,this.mapSize,fe+Zi);o=d.x+bs,l=d.y,c=d.z+Ss}else{const d=ht(t.x,t.y,this.mapSize,this.getMoveOverlayY(s));o=d.x,l=d.y,c=d.z}if(t.lethal){const d=a?.76:1,u=new V(Oe.LETHAL_OUTER_RING_GEO,Oe.LETHAL_OUTER_RING_MAT);u.position.set(o,l+.05,c),u.renderOrder=34,u.userData={isLethalRing:!0,ringPhase:0,baseScale:d},this.attackOverlayGroup.add(u);const h=new V(Oe.LETHAL_INNER_RING_GEO,Oe.LETHAL_INNER_RING_MAT);h.position.set(o,l+.06,c),h.renderOrder=34,h.userData={isLethalRing:!0,ringPhase:Math.PI,baseScale:d},this.attackOverlayGroup.add(h);const f=new ze,m=new V(Oe.LETHAL_CORE_GEO,Oe.LETHAL_CORE_MAT);f.add(m);const y=new V(Oe.LETHAL_HALO_GEO,Oe.LETHAL_GOLD_MAT);f.add(y);const g=new V(Oe.LETHAL_SPIKE_X_GEO,Oe.LETHAL_GOLD_MAT);g.position.x=.28,f.add(g);const p=new V(Oe.LETHAL_SPIKE_X_GEO,Oe.LETHAL_GOLD_MAT);p.position.x=-.28,f.add(p);const v=new V(Oe.LETHAL_SPIKE_Z_GEO,Oe.LETHAL_GOLD_MAT);v.position.z=.28,f.add(v);const w=new V(Oe.LETHAL_SPIKE_Z_GEO,Oe.LETHAL_GOLD_MAT);w.position.z=-.28,f.add(w);const _=new V(Oe.LETHAL_CROWN_GEO,Oe.LETHAL_GOLD_MAT);_.position.y=.28,f.add(_);for(const T of f.children)T.renderOrder=34;const M=this.unitHeightsByCoord.get(n)??1.56,b=l+M+.36;f.position.set(o,b,c),f.renderOrder=34,f.userData={isTargetDiamond:!0,isLethalMarker:!0,baseY:b},this.attackOverlayGroup.add(f)}else{const d=new V(Oe.ATTACK_RING_GEO,Oe.ATTACK_RING_MAT);d.position.set(o,l+.045,c),d.renderOrder=34,a&&d.scale.setScalar(.76),this.attackOverlayGroup.add(d);const u=this.unitHeightsByCoord.get(n)??1.56,h=l+u+.28,f=new V(Oe.ATTACK_DIAMOND_GEO,Oe.ATTACK_DIAMOND_MAT);f.position.set(o,h,c),f.renderOrder=34,f.userData={isTargetDiamond:!0,baseY:h},this.attackOverlayGroup.add(f)}}}setSuperpowerTargets(e,t){if(qn(this.superpowerOverlayGroup),this.superpowerTargetHitMeshes=[],e.length===0)return;const n=t==="volcano"?Oe.VOLCANO_FILL_MAT:Oe.TOWER_FILL_MAT,s=t==="volcano"?Oe.VOLCANO_RING_MAT:Oe.TOWER_RING_MAT,r=t==="volcano"?Oe.VOLCANO_DOT_MAT:Oe.TOWER_DOT_MAT;for(const a of e){const o=yn(a.x,a.y),l=this.tilesByCoord.get(o),c=this.mountainCoords.has(o)||!!(l&&l.terrain==="mountain"&&!l.isCityCenter&&!l.hasVillage),d=this.cityCoords.has(o)||!!(l&&(l.isCityCenter||l.hasVillage)),u=this.getMoveOverlayY(l),h=ht(a.x,a.y,this.mapSize,u);c?(h.x+=bs,h.z+=Ss):d&&(h.x+=Ts,h.z+=Es);const f=c||d,m=(a.x*.85+a.y*1.15)%(Math.PI*2),y=new V(f?Oe.SUPERPOWER_FILL_COMPACT_GEO:Oe.SUPERPOWER_FILL_GEO,n);y.position.copy(h),y.renderOrder=33,y.userData={tileX:a.x,tileY:a.y},this.superpowerOverlayGroup.add(y),this.superpowerTargetHitMeshes.push(y);const g=new V(f?Oe.SUPERPOWER_RING_COMPACT_GEO:Oe.SUPERPOWER_RING_GEO,s);g.position.set(h.x,h.y+.008,h.z),g.renderOrder=34,g.userData={isSuperpowerRing:!0,phase:m},this.superpowerOverlayGroup.add(g);const p=new V(Oe.MOVE_DOT_GEO,r);p.position.set(h.x,h.y+.014,h.z),p.renderOrder=35,p.userData={isSuperpowerDot:!0,phase:m},this.superpowerOverlayGroup.add(p)}}setTutorialResourceTargets(e){const t=new Set(e.map(n=>yn(n.x,n.y)));for(const n of this.tutorialResourceKeys)if(!t.has(n)){const s=this.tileResourceGroups.get(n);s&&(s.group.position.y=s.baseY,s.group.rotation.z=0,s.group.scale.set(1,1,1))}this.tutorialResourceKeys=t}setTutorialTileTargets(e){this.tutorialTileCoords=e.map(t=>({x:t.x,y:t.y})),this.rebuildTutorialOverlays()}rebuildTutorialOverlays(){if(qn(this.tutorialOverlayGroup),this.mapSize<=0)return;const e=new Set,t=[];for(const n of this.tutorialTileCoords){const s=yn(n.x,n.y);e.has(s)||(e.add(s),t.push(n))}for(const n of t){const s=yn(n.x,n.y),r=this.tilesByCoord.get(s),a=this.mountainCoords.has(s)||!!(r&&r.terrain==="mountain"&&!r.isCityCenter&&!r.hasVillage),o=this.cityCoords.has(s)||!!(r&&(r.isCityCenter||r.hasVillage)),l=a?fe+Zi+.03:o?fe+Jt+.03:fe+.045,c=ht(n.x,n.y,this.mapSize,l),d=(n.x*1.1+n.y*1.7)%(Math.PI*2),u=new V(Oe.TUTORIAL_FILL_GEO,Oe.TUTORIAL_FILL_MAT);u.position.copy(c),u.renderOrder=30,u.userData={isTutorialRing:!0,phase:d},this.tutorialOverlayGroup.add(u);const h=new V(Oe.TUTORIAL_RING_GEO,Oe.TUTORIAL_RING_MAT);h.position.set(c.x,c.y+.008,c.z),h.renderOrder=31,h.userData={isTutorialRing:!0,phase:d},this.tutorialOverlayGroup.add(h)}}clearHighlights(){this.setSelectedTile(null),this.setMoveTargets([]),this.setAttackTargets([]),this.setSuperpowerTargets([],"volcano")}update(e,t){const n=Math.min(Math.max(e,0),NM);for(const[r,a]of this.unitObjects){const o=this.unitBaseMeta.get(r),l=o?.phase??0;if(!this.animatingUnitIds.has(r)){const c=!!a.flameMesh,d=!!(a.wingLeft&&a.wingRight);if(o?.isHumanOwner){if(o.exhausted)a.bodyGroup.position.y=d?.055+Math.sin(t*2+l)*.025:.055;else if(a.bodyGroup.position.y=c?.055:d?.055+Math.sin(t*3.2+l)*.09:.055+Math.sin(t*3.4+l)*.045,a.readyRing.visible){const u=o.canCapture||o.canExploreRuins,f=.5+.5*Math.sin(t*(u?4.4:3.6)+l),m=1+f*(u?.1:.07);a.readyRing.scale.set(m,m,1),a.readyRingMat.opacity=(u?.78:.72)+f*.22}}else a.bodyGroup.position.y=c?.055:d?.055+Math.sin(t*2.8+l)*.07:.055+Math.sin(t*2.4+l)*.016}if(a.wingLeft&&a.wingRight){const c=o?.exhausted?3.2:5.4,d=o?.exhausted?.16:.34,u=Math.sin(t*c+l)*d;a.wingLeft.rotation.z=u,a.wingRight.rotation.z=-u}if(a.flameMesh){const c=.92+Math.sin(t*9.5+l)*.12+Math.cos(t*14.2+l)*.06;a.flameMesh.scale.set(.96+(c-1)*.4,c,.96+(c-1)*.4),a.flameMesh.rotation.y+=n*1.9}if(a.veteranCrown&&(a.veteranCrown.rotation.y+=n*1.8),a.promoteRing){const c=1+Math.sin(t*4.5)*.08;a.promoteRing.scale.set(c,c,1)}}for(const r of this.animatedTrees){const a=r.userData.swayPhase??0;r.rotation.z=Math.sin(t*1.4+a)*.036,r.rotation.x=Math.cos(t*1.1+a)*.022}for(const r of this.windmillBlades)r.rotation.z-=n*1.4;nw(n);for(const r of this.waterMeshes){const a=r.userData.tileX??0,o=r.userData.tileY??0;if(this.cloudObjects.has(yn(a,o)))continue;const l=r.geometry.attributes.position,c=r.userData.basePositions;for(let d=0;d<l.count;d++){const u=c[d*3],h=c[d*3+2],f=Math.sin(t*2.1+(u+a*2)*1.2+(h+o*2)*.9)*.032;l.setY(d,c[d*3+1]+f)}l.needsUpdate=!0,r.geometry.computeVertexNormals()}for(const[r,a]of this.cloudObjects)this.animatingCloudKeys.has(r)||(a.group.position.y=a.baseY+Math.sin(t*.9+a.phase)*.08,a.group.position.x=a.baseX+Math.cos(t*.45+a.phase)*.05);if(this.selectedRing.visible){const r=1+Math.sin(t*4.2)*.06;this.selectedRing.scale.set(r,r,1)}for(const r of this.tutorialResourceKeys){const a=this.tileResourceGroups.get(r);if(!a)continue;const o=Math.abs(Math.sin(t*4.2+a.phase));a.group.position.y=a.baseY+o*.18,a.group.rotation.z=Math.sin(t*8.4+a.phase)*.11;const l=1+o*.14;a.group.scale.set(l,l,l)}for(const r of this.tutorialOverlayGroup.children)if(r.userData.isTutorialRing){const a=r.userData.phase??0,o=1+Math.sin(t*5+a)*.09;r.scale.setScalar(o)}for(const r of this.moveOverlayGroup.children)if(r.userData.isMoveDot){const a=r.userData.phase??0,o=1+Math.sin(t*4.8+a)*.1;r.scale.setScalar(o)}for(const r of this.superpowerOverlayGroup.children){const a=r.userData.phase??0;if(r.userData.isSuperpowerRing){const o=1+Math.sin(t*5.2+a)*.08;r.scale.setScalar(o)}else if(r.userData.isSuperpowerDot){const o=1+Math.sin(t*6+a)*.16;r.scale.setScalar(o)}}for(const r of this.attackOverlayGroup.children)if(r.userData.isLethalRing){const a=r.userData.ringPhase??0,l=(r.userData.baseScale??1)*(1+Math.sin(t*6+a)*.11);r.scale.setScalar(l)}else if(r.userData.isTargetDiamond){const a=r.userData.baseY??fe+1.78;if(r.userData.isLethalMarker){r.rotation.y+=n*3.4,r.position.y=a+Math.sin(t*5.6)*.11;const o=1+Math.sin(t*6.5)*.13;r.scale.setScalar(o)}else r.rotation.y+=n*2.4,r.position.y=a+Math.sin(t*4.5)*.08}for(const r of this.cityBanners){const a=r.userData.bannerPhase??0,o=r.userData.baseRotY??0;r.rotation.y=o+Math.sin(t*3.1+a)*.16}for(const r of this.unitBanners){const a=r.userData.bannerPhase??0,o=r.userData.baseRotY??0;r.rotation.y=o+Math.sin(t*3.1+a)*.16}const s=r=>{for(const a of r){const o=a.userData.smokeBaseX??0,l=a.userData.smokeBaseY??0,c=a.userData.smokeBaseZ??0,d=a.userData.smokePhase??0,u=(t*.34+d)%1;a.position.set(o+Math.sin(u*Math.PI*2+d)*.045,l+u*.44,c+Math.cos(u*Math.PI*2+d)*.035);const h=Math.sin(u*Math.PI)*1+.18;a.scale.setScalar(h)}};s(this.tileSmokePuffs),s(this.citySmokePuffs);for(const r of this.cityCrystals){const a=r.userData.baseY??r.position.y,o=r.userData.phase??0,l=r.userData.spinSpeed??1.2;r.position.y=a+Math.sin(t*2.2+o)*.048,r.rotation.y+=n*l}for(const r of this.cityFlames){const a=r.userData.phase??0,o=r.userData.spinSpeed??1.4,l=Math.sin(t*7.2+a)*.5+Math.sin(t*11.4+a*1.7)*.5;r.scale.set(1+l*.06,1+l*.14,1+l*.06),r.rotation.y+=n*o}for(const[r,a]of this.cityPulses){const o=this.cityObjects.get(r);if(!o){this.cityPulses.delete(r);continue}const l=o.userData.baseY??fe;if(a.elapsed+=n,a.elapsed>=a.duration){o.position.y=l,o.scale.set(1,1,1),o.rotation.set(0,0,0),this.cityPulses.delete(r);continue}const c=a.elapsed/a.duration,d=Math.sin(c*Math.PI)*(1-c*.45)*.05,u=Math.sin(c*Math.PI*2)*Math.pow(1-c,1.35)*.048,h=1+u,f=1-u*.45,m=Math.sin(c*Math.PI*2.5)*Math.pow(1-c,1.5)*.054;o.position.y=l+d,o.scale.set(f,h,f),o.rotation.set(-m*Math.SQRT1_2,0,m*Math.SQRT1_2)}for(const r of this.floatingMotes){const a=r.userData.moteKind,o=r.userData.baseX??0,l=r.userData.baseY??0,c=r.userData.baseZ??0,d=r.userData.phase??0;if(a==="firefly")r.position.set(o+Math.sin(t*1.1+d)*.14,l+Math.sin(t*1.9+d*1.3)*.12,c+Math.cos(t*.95+d)*.14),r.rotation.y+=n*1.4;else if(a==="ember"){const u=(t*.42+d)%1;r.position.set(o+Math.sin(u*Math.PI*2+d*6)*.08,l+u*.85,c+Math.cos(u*Math.PI*2+d*6)*.08),r.scale.setScalar(.25+Math.sin(u*Math.PI)*.45)}else a==="rune"&&(r.position.y=l+Math.sin(t*2.4+d)*.07,r.rotation.y+=n*1.5)}}}const BM=.033,HM=new Ie(.11,.11,.11),zM=new Ie(.15,.035,.09),GM=new Zt(.1,0),VM=new Zt(.11,0),WM=new Zt(.19,1),$M=new ns(.45,.045,4,14,Math.PI*.85),rr=new xn(.26,.44,32);rr.rotateX(-Math.PI/2);const XM=new Lt(.42,.56,3.6,16,1,!0),qM=["#facc15","#38bdf8","#34d399","#fb7185","#fb923c","#f8fafc"];function Yi(i){return 1-Math.pow(1-i,3)}function Tl(i){return i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2}function Ti(i){return i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2}function YM(i){return Math.sin(i*Math.PI*.5)}function rh(i,e,t){const n=wt.clamp((t-i)/Math.max(e-i,1e-5),0,1);return n*n*(3-2*n)}class KM{board;badges;sceneManager;tweens=[];particles=[];playing=!1;cancelled=!1;constructor(e,t,n){this.board=e,this.badges=t,this.sceneManager=n}isPlaying(){return this.playing}cancelAll(){this.cancelled=!0;const e=this.tweens.splice(0,this.tweens.length);for(const t of e)this.finishTween(t);this.playing=!1}finishTween(e){e.done||(e.done=!0,e.timeoutId!==null&&(globalThis.clearTimeout(e.timeoutId),e.timeoutId=null),e.onComplete())}update(e){const t=Math.min(Math.max(e,0),BM);for(let n=this.tweens.length-1;n>=0;n--){const s=this.tweens[n];s.elapsed+=t;const r=Math.min(1,s.elapsed/Math.max(s.duration,.001));let a=!1;try{s.onUpdate(r)}catch(o){a=!0,console.error("[AnimationQueue] Tween update failed; completing early:",o)}(a||r>=1)&&(this.tweens.splice(n,1),this.finishTween(s))}for(let n=this.particles.length-1;n>=0;n--){const s=this.particles[n];if(s.age+=t,s.age>=s.life){this.board.fxGroup.remove(s.mesh),s.matRef.count-=1,s.matRef.count<=0&&s.matRef.mat.dispose(),this.particles.splice(n,1);continue}s.vel.y-=s.gravity*t,s.mesh.position.addScaledVector(s.vel,t),s.mesh.rotation.x+=s.spinX*t,s.mesh.rotation.y+=s.spinY*t,s.mesh.rotation.z+=s.spinZ*t;const r=s.age/s.life,a=1-Ti(Math.max(0,(r-.45)/.55));s.mesh.scale.setScalar(Math.max(.01,s.baseScale*a))}}runTween(e,t){if(this.cancelled)return Promise.resolve();if(this.sceneManager&&!this.sceneManager.isRunning()){try{t(1)}catch(r){console.error("[AnimationQueue] Fast-complete tween error:",r)}return Promise.resolve()}const n=Math.max(e,.001),s=Math.max(1500,Math.ceil(n*1e3*3)+1e3);return new Promise(r=>{const a={elapsed:0,duration:n,onUpdate:t,onComplete:r,done:!1,timeoutId:null};a.timeoutId=globalThis.setTimeout(()=>{if(a.done)return;const o=this.tweens.indexOf(a);o!==-1&&this.tweens.splice(o,1);try{a.onUpdate(1)}catch(l){console.error("[AnimationQueue] Safety-timeout tween error:",l)}this.finishTween(a)},s),this.tweens.push(a)})}spawnBurst(e,t,n,s){const r=s?.confetti?zM:s?.spark?GM:HM,a=new pi({color:n,flatShading:!0,roughness:.42,emissive:new xe(n),emissiveIntensity:s?.spark?.65:s?.confetti?.35:.15}),o={mat:a,count:t},l=s?.speed??2.6,c=s?.gravity??6.5,d=s?.life??.55,u=s?.scale??1;for(let h=0;h<t;h++){const f=new V(r,a);f.position.copy(e);const m=h/Math.max(t,1)*Math.PI*2+(Math.random()-.5)*.65,y=(.35+Math.random()*.65)*l,g=(.8+Math.random()*.72)*l;f.scale.setScalar(u),this.board.fxGroup.add(f),this.particles.push({mesh:f,vel:new B(Math.cos(m)*y,g,Math.sin(m)*y),age:0,life:d*(.78+Math.random()*.42),gravity:c,spinX:(Math.random()-.5)*11,spinY:(Math.random()-.5)*9,spinZ:(Math.random()-.5)*8,baseScale:u,matRef:o})}}spawnConfettiArc(e,t=4){for(const n of qM)this.spawnBurst(e,t,n,{confetti:!0,speed:3.1,gravity:5.4,life:.82,scale:1.05})}isCoordVisible(e,t,n){const s=e.players.find(a=>a.id===t)??e.players.find(a=>a.isHuman);if(!s)return!0;const r=Ve(n.x,n.y,e.mapSize);return!!s.revealedTiles[r]}async playEvents(e,t,n,s=1){if(e.length===0)return;this.cancelled=!1,this.playing=!0;const r=1/Math.max(s,.25);try{for(const a of e){if(this.cancelled)break;try{await this.playSingleEvent(a,t,n,r)}catch(o){console.error("[AnimationQueue] Event playback failed:",a.type,o)}}}finally{this.playing=!1}}async playSingleEvent(e,t,n,s){const r=t.mapSize;switch(e.type){case"UNIT_MOVED":{if(!(this.isCoordVisible(t,n,e.from)||this.isCoordVisible(t,n,e.to)))return;const o=this.board.getUnitObject(e.unitId);if(!o)return;const l=o.group.position.clone(),c=Ai(t,e.to.x,e.to.y);await this.animateHopMove(e.unitId,o,l,c,.32*s);return}case"UNIT_ATTACKED":{if(!(this.isCoordVisible(t,n,e.from)||this.isCoordVisible(t,n,e.to)))return;const o=this.board.getUnitObject(e.attackerId),l=this.board.getUnitObject(e.defenderId),c=o?o.group.position.clone():Ai(t,e.from.x,e.from.y),d=l?l.group.position.clone():Ai(t,e.to.x,e.to.y),u=()=>(this.badges.spawnFloatingText(e.to,`-${e.damage}`,"damage"),this.spawnBurst(d.clone().add(new B(0,.72,0)),10,"#f87171",{spark:!0,speed:2.4,life:.42}),l?this.animateHitRecoil(e.defenderId,l,c,d,.2*s):Promise.resolve());if(e.isRanged?(await this.animateRangedProjectile(c,d,.34*s),await u()):o?await this.animateMeleeLunge(e.attackerId,o,c,d,.34*s,u):await u(),e.defenderKilled&&l)await this.animateDefeat(e.defenderId,l,d,.26*s);else if(e.retaliationDamage>0&&l&&o){const h=()=>(this.badges.spawnFloatingText(e.from,`-${e.retaliationDamage}`,"damage"),this.spawnBurst(c.clone().add(new B(0,.72,0)),8,"#fb7185",{spark:!0,speed:2.1,life:.36}),this.animateHitRecoil(e.attackerId,o,d,c,.18*s));await this.animateMeleeLunge(e.defenderId,l,d,c,.28*s,h),e.attackerKilled&&await this.animateDefeat(e.attackerId,o,c,.26*s)}if(e.advanced&&o&&!e.attackerKilled){const h=Ai(t,e.to.x,e.to.y);await this.animateHopMove(e.attackerId,o,c,h,.28*s)}return}case"TILES_REVEALED":{if(e.playerId!==n||e.coords.length===0)return;this.board.revealTilesUnderClouds(t,n,e.coords);let a=0,o=0,l=0;for(const d of e.coords){const u=this.board.getCloudObject(d.x,d.y);u&&(a+=u.group.position.x,o+=u.group.position.z,l+=1)}if(l===0)return;a/=l,o/=l;const c=[];for(const d of e.coords){const u=this.board.getCloudObject(d.x,d.y);if(!u)continue;this.board.markCloudAnimating(d.x,d.y,!0);const h=[];u.group.traverse(w=>{if(w instanceof V&&w.material instanceof pi){const _=w.material.clone();_.transparent=!0,_.opacity=1,_.depthWrite=!1,w.material=_,h.push(_)}}),u.group.userData.clonedMats=h;const f=u.group.position.x,m=u.group.position.y,y=u.group.position.z;let g=f-a,p=y-o;const v=Math.hypot(g,p);v>.05?(g=g/v*.42,p=p/v*.42):(g=Math.cos(u.phase)*.34,p=Math.sin(u.phase)*.34),c.push(this.runTween(.36*s,w=>{const _=Yi(w);u.group.position.x=f+g*_,u.group.position.y=m+_*.72,u.group.position.z=y+p*_,u.group.scale.setScalar(1+_*.32);const M=Math.max(0,1-_);for(const b of h)b.opacity=M}).then(()=>{this.board.removeCloudImmediate(d.x,d.y)}))}c.length>0&&await Promise.all(c);return}case"RESOURCE_HARVESTED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=ht(e.coord.x,e.coord.y,r,fe+.35);this.spawnBurst(a,12,"#facc15",{spark:!0,speed:2.6,life:.5}),this.badges.spawnFloatingText(e.coord,`+${e.popGained} Pop`,"pop");return}case"IMPROVEMENT_BUILT":case"WOODS_PLANTED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=ht(e.coord.x,e.coord.y,r,fe+.35);this.spawnBurst(a,10,"#34d399",{spark:!0,speed:2.4,life:.5}),e.popGained>0&&this.badges.spawnFloatingText(e.coord,`+${e.popGained} Pop`,"pop");return}case"FOREST_CHOPPED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=ht(e.coord.x,e.coord.y,r,fe+.3);this.spawnBurst(a,10,"#d97706",{speed:2.2,life:.45}),this.badges.spawnFloatingText(e.coord,`+${e.goldGained}★`,"gold");return}case"RUINS_CLAIMED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=ht(e.coord.x,e.coord.y,r,fe+.4);this.spawnBurst(a,16,"#38bdf8",{spark:!0,speed:3,life:.65});const o=e.rewardKind==="gold"?`+${e.amount??5}★ Ruins!`:e.rewardKind==="tech"?"Ancient Tech!":`+${e.amount??3} Pop!`;this.badges.spawnFloatingText(e.coord,o,"level"),await this.animateRisingPulseRing(a,"#38bdf8",.38*s);return}case"CITY_LEVELED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=ht(e.coord.x,e.coord.y,r,fe+.18);this.badges.spawnFloatingText(e.coord,`LEVEL ${e.newLevel}!`,"level"),this.spawnConfettiArc(a.clone().add(new B(0,.52,0)),4),await this.animateRisingPulseRing(a,"#facc15",.48*s);return}case"CITY_CAPTURED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=ht(e.coord.x,e.coord.y,r,fe+.22);this.badges.spawnFloatingText(e.coord,e.wasVillage?"Village Claimed!":"City Captured!","level"),this.spawnConfettiArc(a.clone().add(new B(0,.48,0)),4),await this.animateRisingPulseRing(a,"#fbbf24",.48*s);return}case"UNIT_HEALED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=Ai(t,e.coord.x,e.coord.y).add(new B(0,.4,0));this.spawnBurst(a,8,"#4ade80",{spark:!0,speed:1.8,life:.45}),this.badges.spawnFloatingText(e.coord,`+${e.amount} HP`,"heal");return}case"UNIT_PROMOTED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=Ai(t,e.coord.x,e.coord.y).add(new B(0,.25,0));this.spawnBurst(a,22,"#fde047",{spark:!0,speed:3.2,life:.75}),this.spawnBurst(a.clone().add(new B(0,.45,0)),12,"#ffffff",{spark:!0,speed:2.2,life:.55}),this.spawnConfettiArc(a.clone().add(new B(0,.6,0)),5),this.badges.spawnFloatingText(e.coord,"★ VETERAN! ★","level"),this.sceneManager?.shakeCamera(.12,.25),await this.animateRisingPulseRing(a,"#fde047",.38*s),await this.animateRisingPulseRing(a,"#fff7c2",.3*s);return}case"UNIT_TRAINED":{if(!this.isCoordVisible(t,n,e.coord))return;const a=Ai(t,e.coord.x,e.coord.y).add(new B(0,.2,0));this.spawnBurst(a,8,"#e2e8f0",{speed:1.8,life:.4});return}case"SPOILS_GAINED":{if(!this.isCoordVisible(t,n,e.coord))return;this.badges.spawnFloatingText(e.coord,`+${e.amount}★`,"gold");return}case"SUPERPOWER_USED":{await this.playSuperpowerEvent(e,t,n,s);return}default:return}}async animateHopMove(e,t,n,s,r){const{group:a,sprite:o,shadowDisc:l,baseScaleX:c,baseScaleY:d}=t,u=l.scale.x,h=l.scale.y,f=l.scale.z,m=Math.min(.06,r*.22);this.board.markUnitAnimating(e,!0);try{await this.runTween(r,y=>{const g=Tl(y),p=Math.sin(y*Math.PI);a.position.x=wt.lerp(n.x,s.x,g),a.position.z=wt.lerp(n.z,s.z,g),a.position.y=wt.lerp(n.y,s.y,g)+p*.42;const v=1-p*.24;l.scale.set(u*v,h*v,f*v);const w=1+.12*p,_=1/Math.sqrt(w);o.scale.set(c*_,d*w,1),this.badges.setUnitOverrideWorldPos(e,a.position)}),a.position.copy(s),l.scale.set(u,h,f),this.badges.setUnitOverrideWorldPos(e,s),await this.runTween(m,y=>{const g=Math.sin(y*Math.PI)*(1-y*.28),p=1-.08*g,v=1+.07*g;o.scale.set(c*v,d*p,1)}),o.scale.set(c,d,1)}finally{this.board.markUnitAnimating(e,!1)}}async animateMeleeLunge(e,t,n,s,r,a){const{group:o,sprite:l,spriteMat:c,baseScaleX:d,baseScaleY:u}=t,h=new B().subVectors(s,n);h.lengthSq()>1e-4?h.normalize():h.set(1,0,0);const f=-.16,m=.56,y=h.x>=0?-1:1,g=new lt({color:"#fef08a",transparent:!0,opacity:0,side:_t,depthWrite:!1}),p=new V($M,g);p.position.copy(n).addScaledVector(h,.68),p.position.y=Math.max(n.y,s.y)+.76,p.rotation.x=Math.PI/2,p.rotation.z=Math.atan2(h.x,h.z),p.renderOrder=29,p.visible=!1,this.board.fxGroup.add(p);let v=!1,w=null;this.board.markUnitAnimating(e,!0);try{await this.runTween(r,_=>{let M=0,b=1,T=1,E=0;if(_<.18){const S=YM(_/.18);M=f*S,b=1+.06*S,T=1-.06*S,E=-y*.08*S}else if(_<.48){const S=Tl((_-.18)/.3);M=wt.lerp(f,m,S),b=wt.lerp(1.06,1.12,S),T=wt.lerp(.94,.92,S),E=wt.lerp(-y*.08,y*.15,S)}else{v||(v=!0,p.visible=!0,a&&(w=a()));const S=Tl((_-.48)/.52);M=wt.lerp(m,0,S),b=wt.lerp(1.12,1,S),T=wt.lerp(.92,1,S),E=wt.lerp(y*.15,0,S);const x=(_-.48)/.52;p.scale.setScalar(.68+Yi(x)*.78),g.opacity=Math.max(0,.92*(1-Ti(x)))}o.position.copy(n).addScaledVector(h,M),l.scale.set(d*b,u*T,1),c.rotation=E,this.badges.setUnitOverrideWorldPos(e,o.position)}),!v&&a&&(w=a()),w&&await w}finally{this.board.fxGroup.remove(p),g.dispose(),o.position.copy(n),l.scale.set(d,u,1),c.rotation=0,this.badges.clearUnitOverrideWorldPos(e),this.board.markUnitAnimating(e,!1)}}async animateRangedProjectile(e,t,n){const s=new lt({color:"#fef08a",transparent:!0,opacity:1}),r=new lt({color:"#f59e0b",transparent:!0,opacity:.48,depthWrite:!1}),a=new ze,o=new V(VM,s),l=new V(WM,r);o.renderOrder=29,l.renderOrder=28,a.add(o,l),this.board.fxGroup.add(a);const c=e.clone().add(new B(0,.92,0)),d=t.clone().add(new B(0,.76,0)),u=Math.min(2.35,.95+c.distanceTo(d)*.24);try{await this.runTween(n,h=>{const f=Ti(h);a.position.lerpVectors(c,d,f),a.position.y+=Math.sin(h*Math.PI)*u;const m=rh(0,.14,h),y=1-rh(.86,1,h)*.45,g=Math.max(.08,m*y);a.scale.setScalar(g),o.rotation.y=h*Math.PI*5,o.rotation.x=h*Math.PI*3,l.scale.setScalar(1+Math.sin(h*Math.PI*4)*.16)}),this.spawnBurst(d,6,"#fde047",{spark:!0,speed:2,life:.32,scale:.85})}finally{this.board.fxGroup.remove(a),s.dispose(),r.dispose()}}async animateHitRecoil(e,t,n,s,r){const a=new B().subVectors(s,n);a.lengthSq()>1e-4?a.normalize():a.set(1,0,0);const o=t.group.position.clone(),l=o.clone().addScaledVector(a,.24);this.board.markUnitAnimating(e,!0),t.setHitFlash(!0,"#ffffff");try{await this.runTween(r,c=>{const d=Math.sin(c*Math.PI)*Math.exp(-c*1.15)*1.38,u=Math.min(1,Math.max(0,d));t.group.position.lerpVectors(o,l,u),c>.4&&t.setHitFlash(!0,"#ff4d4d");const h=1+.14*u,f=1-.12*u;t.sprite.scale.set(t.baseScaleX*h,t.baseScaleY*f,1),t.flashSprite.scale.copy(t.sprite.scale)})}finally{t.group.position.copy(o),t.sprite.scale.set(t.baseScaleX,t.baseScaleY,1),t.flashSprite.scale.set(t.baseScaleX,t.baseScaleY,1),t.setHitFlash(!1),this.board.markUnitAnimating(e,!1)}}async animateDefeat(e,t,n,s){const{group:r,sprite:a,spriteMat:o,baseScaleX:l,baseScaleY:c}=t;this.board.markUnitAnimating(e,!0),this.badges.hideUnitBadge(e),this.spawnBurst(n.clone().add(new B(0,.42,0)),14,"#e2e8f0",{speed:2.9,life:.52});try{await this.runTween(s,d=>{const u=Yi(d),h=Math.max(.01,1-u);a.scale.set(l*h,c*h,1),o.rotation=u*1.15,o.opacity=Math.max(0,1-u),r.scale.setScalar(h)}),r.visible=!1,o.rotation=0}finally{this.board.markUnitAnimating(e,!1)}}async animateRisingPulseRing(e,t,n){const s=new lt({color:t,side:_t,transparent:!0,opacity:.92,depthWrite:!1}),r=new lt({color:"#ffffff",side:_t,transparent:!0,opacity:.78,depthWrite:!1}),a=new V(rr,s);a.position.copy(e),a.renderOrder=30,this.board.fxGroup.add(a);const o=new V(rr,r);o.position.copy(e),o.renderOrder=30,this.board.fxGroup.add(o);const l=e.y;try{await this.runTween(n,c=>{const d=Yi(c);a.scale.setScalar(.75+d*3.55),a.position.y=l+d*.56,s.opacity=Math.max(0,.92*(1-Ti(c)));const u=wt.clamp((c-.12)/.88,0,1),h=Yi(u);o.scale.setScalar(.55+h*2.65),o.position.y=l+h*.78,r.opacity=c<.12?0:Math.max(0,.75*(1-Ti(u)))})}finally{this.board.fxGroup.remove(a,o),s.dispose(),r.dispose()}}async playSuperpowerEvent(e,t,n,s){const r=t.mapSize,a=Object.values(t.cities).filter(u=>u.ownerId===e.playerId),o=a.find(u=>u.isCapital)??a[0],l=Object.values(t.cities).filter(u=>u.ownerId===n),c=l.find(u=>u.isCapital)??l[0],d=e.target??e.affectedCoords?.[0]??(o?{x:o.x,y:o.y}:null)??(c?{x:c.x,y:c.y}:null)??{x:Math.floor(r/2),y:Math.floor(r/2)};switch(e.faction){case"elves":{this.sceneManager?.setEclipseMode(!0);const u=this.isCoordVisible(t,n,d)?d:c?{x:c.x,y:c.y}:d,h=ht(u.x,u.y,r,fe+.24);this.badges.spawnFloatingText(u,"STARLIT ECLIPSE!","level"),this.spawnBurst(h.clone().add(new B(0,.5,0)),18,"#c7d2fe",{spark:!0,speed:3.4,gravity:2.6,life:.72,scale:1.15}),this.spawnBurst(h.clone().add(new B(0,.35,0)),12,"#818cf8",{spark:!0,speed:2.8,gravity:2.2,life:.65}),await this.animateStarlightShockwave(h,.64*s);return}case"orcs":{const u=e.affectedCoords&&e.affectedCoords.length>0?e.affectedCoords:[d],h=u.filter(g=>this.isCoordVisible(t,n,g));if(h.length===0&&e.playerId!==n)return;const f=e.target??h[0]??d,m=ht(f.x,f.y,r,fe+.2);this.sceneManager?.focusOnWorld(m),this.sceneManager?.shakeCamera(.55,.56*s),this.badges.spawnFloatingText(f,"VOLCANIC CATACLYSM!","damage");const y=[];for(const g of h.length>0?h:u){const p=ht(g.x,g.y,r,fe+.22);this.spawnBurst(p.clone().add(new B(0,.28,0)),10,"#ff5a1f",{spark:!0,speed:3.4,gravity:5.8,life:.62,scale:1.15}),this.spawnBurst(p.clone().add(new B(0,.18,0)),6,"#facc15",{spark:!0,speed:2.6,gravity:4.5,life:.5}),y.push(this.animateRisingPulseRing(p,"#ff5a1f",.58*s))}await Promise.all(y);return}case"dwarves":{if(!this.isCoordVisible(t,n,d)&&e.playerId!==n)return;const u=ht(d.x,d.y,r,fe+.18);this.sceneManager?.focusOnWorld(u),this.badges.spawnFloatingText(d,"FIRE DRAKE AWAKENED!","level"),this.spawnBurst(u.clone().add(new B(0,.65,0)),18,"#ff5a1f",{spark:!0,speed:3.5,gravity:4.2,life:.68,scale:1.2}),this.spawnBurst(u.clone().add(new B(0,.5,0)),14,"#facc15",{spark:!0,speed:2.8,gravity:3.6,life:.62}),await this.animateSummonPillar(u,"#ef4444","#facc15",.62*s);return}case"humans":{if(!this.isCoordVisible(t,n,d)&&e.playerId!==n)return;const u=ht(d.x,d.y,r,fe+.18);this.sceneManager?.focusOnWorld(u),this.badges.spawnFloatingText(d,"WATCHTOWER RAISED!","level"),this.spawnBurst(u.clone().add(new B(0,.55,0)),16,"#f5c542",{spark:!0,speed:3,gravity:4.4,life:.62,scale:1.1}),this.spawnBurst(u.clone().add(new B(0,.45,0)),10,"#93c5fd",{spark:!0,speed:2.4,gravity:3.8,life:.55}),await this.animateSummonPillar(u,"#f5c542","#93c5fd",.6*s);return}}}async animateStarlightShockwave(e,t){const n=new lt({color:"#818cf8",side:_t,transparent:!0,opacity:.92,depthWrite:!1}),s=new lt({color:"#e0e7ff",side:_t,transparent:!0,opacity:.85,depthWrite:!1}),r=new V(rr,n);r.position.copy(e),r.renderOrder=36,this.board.fxGroup.add(r);const a=new V(rr,s);a.position.copy(e),a.renderOrder=36,this.board.fxGroup.add(a);const o=e.y;try{await this.runTween(t,l=>{const c=Yi(l);r.scale.setScalar(1+c*14),r.position.y=o+c*.45,n.opacity=Math.max(0,.92*(1-Ti(l)));const d=wt.clamp((l-.1)/.9,0,1),u=Yi(d);a.scale.setScalar(.8+u*10.5),a.position.y=o+u*.65,s.opacity=l<.1?0:Math.max(0,.85*(1-Ti(d)))})}finally{this.board.fxGroup.remove(r,a),n.dispose(),s.dispose()}}async animateSummonPillar(e,t,n,s){const r=new lt({color:t,side:_t,transparent:!0,opacity:.65,depthWrite:!1,blending:yo}),a=new lt({color:n,side:_t,transparent:!0,opacity:.94,depthWrite:!1}),o=new V(XM,r);o.position.set(e.x,e.y+1.8,e.z),o.renderOrder=35,this.board.fxGroup.add(o);const l=new V(rr,a);l.position.copy(e),l.renderOrder=36,this.board.fxGroup.add(l);const c=e.y;try{await this.runTween(s,d=>{const u=Yi(d),h=d<.25?d/.25:1-Ti((d-.25)/.75),f=.75+u*.85;o.scale.set(f,.4+u*1.15,f),o.position.y=c+(.4+u*1.15)*1.5,r.opacity=Math.max(0,.68*h),l.scale.setScalar(.8+u*4.4),l.position.y=c+u*.48,a.opacity=Math.max(0,.94*(1-Ti(d)))})}finally{this.board.fxGroup.remove(o,l),r.dispose(),a.dispose()}}}const jM=6,ZM=10;class JM{sceneManager;board;callbacks;domElement;raycaster=new P0;pointerNdc=new tt;keysDown=new Set;activePointers=new Map;inputLocked=!1;isDragging=!1;gestureWasMultiTouch=!1;lastPinchDistance=null;lastPinchMidX=0;lastPinchMidY=0;lastHoveredKey=null;onPointerDownBound;onPointerMoveBound;onPointerUpBound;onPointerCancelBound;onWheelBound;onContextMenuBound;onKeyDownBound;onKeyUpBound;constructor(e,t,n){this.sceneManager=e,this.board=t,this.callbacks=n,this.domElement=e.getDomElement(),this.domElement.style.touchAction="none",this.onPointerDownBound=s=>this.handlePointerDown(s),this.onPointerMoveBound=s=>this.handlePointerMove(s),this.onPointerUpBound=s=>this.handlePointerUp(s,!1),this.onPointerCancelBound=s=>this.handlePointerUp(s,!0),this.onWheelBound=s=>this.handleWheel(s),this.onContextMenuBound=s=>s.preventDefault(),this.onKeyDownBound=s=>this.handleKeyDown(s),this.onKeyUpBound=s=>this.handleKeyUp(s),this.domElement.addEventListener("pointerdown",this.onPointerDownBound),window.addEventListener("pointermove",this.onPointerMoveBound),window.addEventListener("pointerup",this.onPointerUpBound),window.addEventListener("pointercancel",this.onPointerCancelBound),this.domElement.addEventListener("wheel",this.onWheelBound,{passive:!1}),this.domElement.addEventListener("contextmenu",this.onContextMenuBound),window.addEventListener("keydown",this.onKeyDownBound),window.addEventListener("keyup",this.onKeyUpBound)}setInputLocked(e){this.inputLocked=e}update(e){const t=Math.min(Math.max(e,0),.033);let n=0,s=0;(this.keysDown.has("KeyA")||this.keysDown.has("ArrowLeft"))&&(n-=1),(this.keysDown.has("KeyD")||this.keysDown.has("ArrowRight"))&&(n+=1),(this.keysDown.has("KeyW")||this.keysDown.has("ArrowUp"))&&(s+=1),(this.keysDown.has("KeyS")||this.keysDown.has("ArrowDown"))&&(s-=1),(n!==0||s!==0)&&this.sceneManager.panByAxes(n,s,t)}raycastTile(e,t){const n=this.domElement.getBoundingClientRect();if(e<n.left||e>n.right||t<n.top||t>n.bottom)return null;this.pointerNdc.x=(e-n.left)/n.width*2-1,this.pointerNdc.y=-((t-n.top)/n.height)*2+1,this.raycaster.setFromCamera(this.pointerNdc,this.sceneManager.camera);const s=this.raycaster.intersectObjects(this.board.getUnitHitMeshes(),!1);if(s.length>0){const l=s[0].object.userData;if(typeof l.tileX=="number"&&typeof l.tileY=="number")return{x:l.tileX,y:l.tileY}}const r=this.raycaster.intersectObjects(this.board.getMoveTargetHitMeshes(),!1);if(r.length>0){const l=r[0].object.userData;if(typeof l.tileX=="number"&&typeof l.tileY=="number")return{x:l.tileX,y:l.tileY}}const a=this.raycaster.intersectObjects(this.board.getTileHitMeshes(),!1);if(a.length===0)return null;const o=a[0].object.userData;return typeof o.tileX=="number"&&typeof o.tileY=="number"?{x:o.tileX,y:o.tileY}:null}getPinchMetrics(){if(this.activePointers.size<2)return null;const e=this.activePointers.values(),t=e.next().value,n=e.next().value;return!t||!n?null:{distance:Math.hypot(n.x-t.x,n.y-t.y),midX:(t.x+n.x)*.5,midY:(t.y+n.y)*.5}}handlePointerDown(e){if(!(e.pointerType==="mouse"&&e.button!==0&&e.button!==1&&e.button!==2)){this.activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,pointerType:e.pointerType,button:e.button});try{this.domElement.setPointerCapture(e.pointerId)}catch{}if(this.activePointers.size===1)this.isDragging=!1,this.gestureWasMultiTouch=!1,this.lastPinchDistance=null;else if(this.activePointers.size>=2){this.gestureWasMultiTouch=!0,this.isDragging=!0;const t=this.getPinchMetrics();t&&(this.lastPinchDistance=t.distance,this.lastPinchMidX=t.midX,this.lastPinchMidY=t.midY)}}}handlePointerMove(e){const t=this.activePointers.get(e.pointerId);if(t){const r=t.x,a=t.y;if(t.x=e.clientX,t.y=e.clientY,this.activePointers.size>=2){const d=this.getPinchMetrics();if(d){if(this.lastPinchDistance!==null&&this.lastPinchDistance>10&&d.distance>10){const u=d.distance/this.lastPinchDistance;this.sceneManager.zoomByFactor(u),this.sceneManager.panByScreenDelta(d.midX-this.lastPinchMidX,d.midY-this.lastPinchMidY)}this.lastPinchDistance=d.distance,this.lastPinchMidX=d.midX,this.lastPinchMidY=d.midY}return}const o=t.pointerType==="touch"?ZM:jM,l=t.x-t.startX,c=t.y-t.startY;!this.isDragging&&Math.hypot(l,c)>o&&(this.isDragging=!0),this.isDragging&&this.sceneManager.panByScreenDelta(t.x-r,t.y-a);return}if(e.pointerType==="touch")return;const n=this.raycastTile(e.clientX,e.clientY),s=n?`${n.x},${n.y}`:null;s!==this.lastHoveredKey&&(this.lastHoveredKey=s,this.board.setHoverTile(n),this.callbacks.onTileHover(n))}handlePointerUp(e,t){const n=this.activePointers.get(e.pointerId);if(n){this.activePointers.delete(e.pointerId);try{this.domElement.hasPointerCapture(e.pointerId)&&this.domElement.releasePointerCapture(e.pointerId)}catch{}if(this.activePointers.size<2&&(this.lastPinchDistance=null),this.activePointers.size===1){const s=this.activePointers.values().next().value;s&&(s.startX=s.x,s.startY=s.y);return}if(this.activePointers.size===0){const s=this.isDragging,r=this.gestureWasMultiTouch;this.isDragging=!1,this.gestureWasMultiTouch=!1;const a=n.pointerType!=="mouse"||n.button===0;if(!t&&!s&&!r&&a&&!this.inputLocked){const o=this.raycastTile(e.clientX,e.clientY);o&&this.callbacks.onTileClick(o)}}}}handleWheel(e){e.preventDefault();const t=e.deltaMode===1?28:e.deltaMode===2?120:1;this.sceneManager.zoomBy(e.deltaY*t)}handleKeyDown(e){const t=e.target?.tagName;t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||(this.keysDown.add(e.code),e.code==="KeyQ"?this.sceneManager.rotateStep(-1):e.code==="KeyE"?this.sceneManager.rotateStep(1):e.code==="Escape"?this.callbacks.onDeselectHotkey?.():e.code==="Space"&&!this.inputLocked&&(e.preventDefault(),this.callbacks.onEndTurnHotkey?.()))}handleKeyUp(e){this.keysDown.delete(e.code)}dispose(){this.domElement.removeEventListener("pointerdown",this.onPointerDownBound),window.removeEventListener("pointermove",this.onPointerMoveBound),window.removeEventListener("pointerup",this.onPointerUpBound),window.removeEventListener("pointercancel",this.onPointerCancelBound),this.domElement.removeEventListener("wheel",this.onWheelBound),this.domElement.removeEventListener("contextmenu",this.onContextMenuBound),window.removeEventListener("keydown",this.onKeyDownBound),window.removeEventListener("keyup",this.onKeyUpBound),this.activePointers.clear()}}const QM=.033;function Wr(i,e){return`${i},${e}`}function ah(i){return i==="orcs"?"#ef4444":dt[i].palette.primary}const oh='<svg class="capture-affordance-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 18h18v2H3v-2zm0-2L5 7l4.5 4L12 5l2.5 6L19 7l2 9H3z"/></svg>',e2='<svg class="capture-affordance-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.8l2 4.1 4.5.6-3.3 3.1.8 4.5L12 12l-4 2.1.8-4.5-3.3-3.1 4.5-.6L12 1.8z"/><path d="M4 15.2l8 4.3 8-4.3v3l-8 4.3-8-4.3v-3z"/></svg>',t2='<svg class="capture-affordance-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.6 6.4L21 11l-6.4 2.6L12 20l-2.6-6.4L3 11l6.4-2.6L12 2z"/></svg>';let lh=!1;function n2(){if(lh||typeof document>"u"||(lh=!0,document.querySelector("style[data-world-badges-style]")))return;const i=document.createElement("style");i.setAttribute("data-world-badges-style","true"),i.textContent=`
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
    .capture-affordance-btn.promote-affordance-btn {
      background: linear-gradient(180deg, #fff7c2 0%, #fbbf24 45%, #d97706 100%);
      border-color: #fffbeb;
      color: #3b1d02;
      min-height: 38px;
      padding: 6px 14px 6px 10px;
      box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.35), 0 0 18px rgba(253, 224, 71, 0.75);
      animation: wb-promote-pulse 1.1s ease-in-out infinite;
    }
    .promote-affordance-btn .capture-affordance-icon {
      width: 17px;
      height: 17px;
      filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.9));
    }
    @keyframes wb-promote-pulse {
      0%, 100% { box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.35), 0 0 14px rgba(253, 224, 71, 0.6); filter: brightness(1); }
      50% { box-shadow: 0 0 0 6px rgba(251, 191, 36, 0.18), 0 0 26px rgba(253, 224, 71, 0.95); filter: brightness(1.12); }
    }
    .city-pip-crown {
      display: inline-grid;
      place-items: center;
      width: 18px;
      height: 18px;
      margin-right: 2px;
      border-radius: 50%;
      background: linear-gradient(180deg, #fde68a 0%, #f59e0b 100%);
      border: 1.5px solid #fffbeb;
      color: #422006;
      font-size: 11px;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
    }
    .capture-affordance-icon {
      width: 15px;
      height: 15px;
      flex-shrink: 0;
    }
  `,document.head.appendChild(i)}class i2{root;unitLayer;cityLayer;captureLayer;popupLayer;unitBadges=new Map;cityBadges=new Map;captureAffordances=new Map;unitWorldPosOverrides=new Map;hiddenUnitIds=new Set;popups=[];tempVec=new B;mapSize=11;selectedCoord=null;lethalCoords=new Set;onCaptureClick=null;onExploreRuinsClick=null;onPromoteClick=null;constructor(e){n2(),this.root=e,this.root.innerHTML="",this.root.style.pointerEvents="none",this.cityLayer=document.createElement("div"),this.cityLayer.className="world-badges-layer",this.unitLayer=document.createElement("div"),this.unitLayer.className="world-badges-layer",this.captureLayer=document.createElement("div"),this.captureLayer.className="world-badges-layer",this.popupLayer=document.createElement("div"),this.popupLayer.className="world-badges-layer",this.root.append(this.cityLayer,this.unitLayer,this.captureLayer,this.popupLayer)}setOnCaptureClick(e){this.onCaptureClick=e}setOnExploreRuinsClick(e){this.onExploreRuinsClick=e}setOnPromoteClick(e){this.onPromoteClick=e}setUnitOverrideWorldPos(e,t){let n=this.unitWorldPosOverrides.get(e);n||(n=new B,this.unitWorldPosOverrides.set(e,n)),n.set(t.x,t.y+.08,t.z)}clearUnitOverrideWorldPos(e){this.unitWorldPosOverrides.delete(e)}hideUnitBadge(e){this.hiddenUnitIds.add(e);const t=this.unitBadges.get(e);t&&(t.el.style.display="none",t.lastDisplay="none"),this.unitWorldPosOverrides.delete(e)}setSelectedCoord(e){this.selectedCoord=e?{x:e.x,y:e.y}:null,this.refreshCityBadgeModes()}setLethalTargets(e){this.lethalCoords.clear();for(const t of e)this.lethalCoords.add(Wr(t.x,t.y));this.refreshUnitLethalStates()}applyCityBadgeMode(e,t){const n=`${t?1:0}|${e.hasReward?1:0}|${e.color}|${t?e.fullHtml:e.pipHtml}`;if(e.isSelected=t,e.renderFingerprint===n)return;e.renderFingerprint=n;const s=e.hasReward?" reward-ready ready-upgrade":"";t?(e.el.className=`city-badge${s}`,e.el.style.background="",e.el.style.borderColor=e.hasReward?"#facc15":e.color,e.el.innerHTML=e.fullHtml):(e.el.className=`city-pip-wrap city-pip-badge${s}`,e.el.style.background="",e.el.style.borderColor=e.hasReward?"#facc15":e.color,e.el.innerHTML=e.pipHtml),e.lastDisplay="",e.lastTransform=""}refreshCityBadgeModes(){const e=this.selectedCoord?Wr(this.selectedCoord.x,this.selectedCoord.y):null;for(const t of this.cityBadges.values()){const n=e!==null&&t.coordKey===e;t.isSelected!==n&&this.applyCityBadgeMode(t,n)}}applyUnitLethalState(e,t){const n=`${t?1:0}|${e.baseClass}|${e.borderColor}|${e.baseHtml}`;e.renderFingerprint!==n&&(e.renderFingerprint=n,t?(e.el.className=`${e.baseClass} lethal-target`,e.el.style.borderColor="#ef4444",e.el.innerHTML=`${e.baseHtml}<span class="unit-lethal-tag">LETHAL</span>`):(e.el.className=e.baseClass,e.el.style.borderColor=e.borderColor,e.el.innerHTML=e.baseHtml))}refreshUnitLethalStates(){for(const e of this.unitBadges.values())this.applyUnitLethalState(e,this.lethalCoords.has(e.coordKey))}syncState(e,t,n){n!==void 0&&(this.selectedCoord=n?{x:n.x,y:n.y}:null),this.mapSize=e.mapSize;const s=e.players.find(f=>f.id===t)??e.players.find(f=>f.isHuman)??e.players[0],r=s?.id??t,a=e.phase==="playing"&&e.players[e.activePlayerIndex]?.id===r,o=s?.revealedTiles??[],l=new Map;for(const f of e.players)l.set(f.id,f.faction);this.unitWorldPosOverrides.clear(),this.hiddenUnitIds.clear();const c=new Set,d=new Set;for(const f of Object.values(e.units)){if(!o[Ve(f.x,f.y,e.mapSize)])continue;c.add(f.id);const m=l.get(f.ownerId)??"humans",y=ah(m),g=Wr(f.x,f.y),p=f.ownerId===r,v=p&&!f.actedThisTurn&&la(e,f.id),w=p&&!v,M=`unit-badge${v?" ready-unit":w?" exhausted":" enemy-unit"}${f.isVeteran?" veteran":""}`,b=`<span class="unit-dot" style="background:${y}"></span><span class="unit-hp">${f.hp}</span>${f.isVeteran?'<span class="unit-vet">★</span>':""}`,T=v?"#ffffff":w?"rgba(148, 163, 184, 0.35)":y,E=Ai(e,f.x,f.y),S=E.clone();S.y+=.08;let x=this.unitBadges.get(f.id);if(x)x.coordKey=g,x.worldPos.copy(S),x.baseHtml=b,x.baseClass=M,x.borderColor=T;else{const A=document.createElement("div");this.unitLayer.appendChild(A),x={el:A,coordKey:g,worldPos:S,baseHtml:b,baseClass:M,borderColor:T,renderFingerprint:"",lastDisplay:"",lastTransform:""},this.unitBadges.set(f.id,x)}if(this.applyUnitLethalState(x,this.lethalCoords.has(g)),a&&v&&f.canCapture){const A=`${f.id}:capture`;d.add(A);const P=_e(e,f.x,f.y),F=!!(P?.hasVillage&&!P?.isCityCenter)?"Claim":"Capture",N=`capture|${F}`,Y=E.clone();Y.y+=Sl(f.type,m)+.28;const U=this.captureAffordances.get(A);if(U)U.worldPos.copy(Y),U.renderFingerprint!==N&&(U.renderFingerprint=N,U.el.innerHTML=`${oh}<span>${F}</span>`);else{const z=document.createElement("button");z.type="button",z.className="capture-affordance-btn",z.dataset.unitId=f.id,z.innerHTML=`${oh}<span>${F}</span>`;const $=D=>{D.stopPropagation()};z.addEventListener("pointerdown",$),z.addEventListener("pointerup",$),z.addEventListener("click",D=>{D.preventDefault(),D.stopPropagation(),this.onCaptureClick?.(f.id)}),this.captureLayer.appendChild(z),this.captureAffordances.set(A,{el:z,unitId:f.id,worldPos:Y,renderFingerprint:N,lastDisplay:"",lastTransform:""})}}if(a&&v&&f.canExploreRuins){const A=`${f.id}:ruins`;d.add(A);const P="ruins|Explore",I=E.clone();I.y+=Sl(f.type,m)+.28+(f.canCapture?.62:0);const F=this.captureAffordances.get(A);if(F)F.worldPos.copy(I);else{const N=document.createElement("button");N.type="button",N.className="capture-affordance-btn ruins-affordance-btn",N.dataset.unitId=f.id,N.innerHTML=`${t2}<span>Explore</span>`;const Y=U=>{U.stopPropagation()};N.addEventListener("pointerdown",Y),N.addEventListener("pointerup",Y),N.addEventListener("click",U=>{U.preventDefault(),U.stopPropagation(),this.onExploreRuinsClick?.(f.id)}),this.captureLayer.appendChild(N),this.captureAffordances.set(A,{el:N,unitId:f.id,worldPos:I,renderFingerprint:P,lastDisplay:"",lastTransform:""})}}if(a&&p&&!f.isVeteran&&(f.canPromote||f.kills>=3)){const A=`${f.id}:promote`;d.add(A);const P=(v&&f.canCapture?1:0)+(v&&f.canExploreRuins?1:0),I=E.clone();I.y+=Sl(f.type,m)+.28+P*.62;const F=this.captureAffordances.get(A);if(F)F.worldPos.copy(I);else{const N=document.createElement("button");N.type="button",N.className="capture-affordance-btn promote-affordance-btn",N.dataset.unitId=f.id,N.setAttribute("aria-label","Promote to Veteran"),N.innerHTML=`${e2}<span>Promote!</span>`;const Y=U=>{U.stopPropagation()};N.addEventListener("pointerdown",Y),N.addEventListener("pointerup",Y),N.addEventListener("click",U=>{U.preventDefault(),U.stopPropagation(),this.onPromoteClick?.(f.id)}),this.captureLayer.appendChild(N),this.captureAffordances.set(A,{el:N,unitId:f.id,worldPos:I,renderFingerprint:"promote",lastDisplay:"",lastTransform:""})}}}for(const[f,m]of this.unitBadges)c.has(f)||(m.el.remove(),this.unitBadges.delete(f),this.unitWorldPosOverrides.delete(f));for(const[f,m]of this.captureAffordances)d.has(f)||(m.el.remove(),this.captureAffordances.delete(f));const u=new Set,h=this.selectedCoord?Wr(this.selectedCoord.x,this.selectedCoord.y):null;for(const f of Object.values(e.cities)){if(!o[Ve(f.x,f.y,e.mapSize)])continue;u.add(f.id);const m=l.get(f.ownerId)??f.styleFaction,y=ah(m),g=Math.max(1,f.level+1),p=Math.max(0,Math.min(f.population,g)),v=f.pendingLevelRewards.length>0,w=Array.from({length:g},(P,I)=>`<span class="pop-pip${I<p?" filled":""}"></span>`).join(""),_=Array.from({length:g},(P,I)=>`<span class="city-pip-seg ${I<p?"filled":"empty"}"></span>`).join(""),M=f.level+(f.isCapital?1:0)+(f.hasWorkshop?1:0)+(f.connectedToCapital&&!f.isCapital&&m==="humans"?1:0),b=`
        <div class="city-badge-row">
          <span class="city-lvl" style="background:${y}">${f.level}</span>
          <span class="city-name">${f.isCapital?"♛ ":""}${f.name}</span>
          <span class="city-income">+${M}★</span>
        </div>
        <div class="city-pips">${w}</div>
      `,T=`${f.isCapital?'<span class="city-pip-crown" aria-label="Capital">♛</span>':""}<span class="city-pip-lvl" style="background:${y}">${f.level}</span><div class="city-pip-progress city-pip-bar" aria-label="Level ${f.level}: ${p} of ${g} population">${_}</div>`,E=Wr(f.x,f.y),S=ht(f.x,f.y,e.mapSize,fe+Ku(f,.28)+.03).add(new B(-.28,0,-.28)),x=ht(f.x,f.y,e.mapSize,fe+Ku(f,.38)).add(new B(-.38,0,-.38));let A=this.cityBadges.get(f.id);if(A)A.coordKey=E,A.selectedWorldPos.copy(S),A.unselectedWorldPos.copy(x),A.fullHtml=b,A.pipHtml=T,A.color=y,A.hasReward=v;else{const P=document.createElement("div");this.cityLayer.appendChild(P),A={el:P,coordKey:E,selectedWorldPos:S,unselectedWorldPos:x,fullHtml:b,pipHtml:T,color:y,hasReward:v,isSelected:!1,renderFingerprint:"",lastDisplay:"",lastTransform:""},this.cityBadges.set(f.id,A)}this.applyCityBadgeMode(A,h!==null&&E===h)}for(const[f,m]of this.cityBadges)u.has(f)||(m.el.remove(),this.cityBadges.delete(f))}spawnFloatingText(e,t,n="info"){const s=document.createElement("div");s.className=`floating-popup popup-${n}`,s.textContent=t,this.popupLayer.appendChild(s);const r=ht(e.x,e.y,this.mapSize,fe+1.45);this.popups.push({el:s,worldPos:r,age:0,duration:.95})}update(e,t){const n=Math.min(Math.max(t,0),QM),s=this.root.clientWidth||window.innerWidth,r=this.root.clientHeight||window.innerHeight,a=(o,l=0)=>{this.tempVec.copy(o),this.tempVec.y+=l,this.tempVec.project(e);const c=(this.tempVec.x*.5+.5)*s,d=(-this.tempVec.y*.5+.5)*r,u=this.tempVec.z<=1&&c>=-120&&c<=s+120&&d>=-80&&d<=r+80;return{x:c,y:d,visible:u}};for(const[o,l]of this.unitBadges){if(this.hiddenUnitIds.has(o)){l.lastDisplay!=="none"&&(l.el.style.display="none",l.lastDisplay="none");continue}const c=this.unitWorldPosOverrides.get(o)??l.worldPos,d=a(c),u=d.visible?"inline-flex":"none";if(l.lastDisplay!==u&&(l.el.style.display=u,l.lastDisplay=u),d.visible){const h=`translate3d(${d.x.toFixed(1)}px, ${(d.y+16).toFixed(1)}px, 0) translate(-50%, -50%)`;l.lastTransform!==h&&(l.el.style.transform=h,l.lastTransform=h)}}for(const o of this.captureAffordances.values()){const l=a(o.worldPos),c=l.visible?"inline-flex":"none";if(o.lastDisplay!==c&&(o.el.style.display=c,o.lastDisplay=c),l.visible){const d=`translate3d(${l.x.toFixed(1)}px, ${l.y.toFixed(1)}px, 0) translate(-50%, -100%)`;o.lastTransform!==d&&(o.el.style.transform=d,o.lastTransform=d)}}for(const o of this.cityBadges.values()){const l=o.isSelected?o.selectedWorldPos:o.unselectedWorldPos,c=a(l);if(o.isSelected){const d=c.visible?"flex":"none";if(o.lastDisplay!==d&&(o.el.style.display=d,o.lastDisplay=d),c.visible){const u=`translate3d(${c.x.toFixed(1)}px, ${(c.y-6).toFixed(1)}px, 0) translate(-50%, -100%)`;o.lastTransform!==u&&(o.el.style.transform=u,o.lastTransform=u)}}else{const d=c.visible?"inline-flex":"none";if(o.lastDisplay!==d&&(o.el.style.display=d,o.lastDisplay=d),c.visible){const u=`translate3d(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px, 0) translate(-50%, -50%)`;o.lastTransform!==u&&(o.el.style.transform=u,o.lastTransform=u)}}}for(let o=this.popups.length-1;o>=0;o--){const l=this.popups[o];if(l.age+=n,l.age>=l.duration){l.el.remove(),this.popups.splice(o,1);continue}const c=l.age/l.duration,d=1-Math.pow(1-c,2),u=a(l.worldPos,d*.95);l.el.style.opacity=String(c<.68?1:Math.max(0,1-(c-.68)/.32)),l.el.style.transform=`translate3d(${u.x.toFixed(1)}px, ${u.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${(1+Math.sin(c*Math.PI)*.14).toFixed(2)})`}}dispose(){this.root.innerHTML="",this.unitBadges.clear(),this.cityBadges.clear(),this.captureAffordances.clear(),this.unitWorldPosOverrides.clear(),this.hiddenUnitIds.clear(),this.popups.length=0}}const ch=96,s2=new Set(["warrior","defender","archer","rider","catapult","rohirrim_knight","uruk_berserker","elven_sentinel","ironbreaker"]),r2=new Set(["berries","game","ore","mithril","ruins"]),a2=new Set(["farm","windmill","mine","sanctuary","slag_pit","foundry","great_forge"]),ar={northWater:!1,southWater:!1,eastWater:!1,westWater:!1,northRoad:!1,southRoad:!1,eastRoad:!1,westRoad:!1},o2={northWater:!1,southWater:!1,eastWater:!1,westWater:!1,northRoad:!0,southRoad:!0,eastRoad:!0,westRoad:!0};function gs(i,e={}){return{x:0,y:0,terrain:"plains",biome:i,resource:null,improvement:null,hasRoad:!1,hasVillage:!1,cityId:null,isCityCenter:!1,unitId:null,...e}}function dh(i,e={}){return{id:`thumb_city_${i}`,name:"Citadel",ownerId:"thumb_owner",styleFaction:i,x:0,y:0,isCapital:!0,level:3,population:2,hasWorkshop:!1,hasWalls:!0,borderRadius:1,parks:0,pendingLevelRewards:[],connectedToCapital:!0,...e}}function l2(i){const e=[],t=[],n=new ze,s=Ci(gs(i,{terrain:"plains"}),1,ar,!0);n.add(s.group);const r=dt[i].palette,a=We("marble_masonry",{color:"#e7e2d5",roughness:.84,bumpScale:.025}),o=yt(r.accent,{metalness:.52,roughness:.34}),l=We("foliage",{color:"#2ea874",roughness:.84,bumpScale:.024}),c=new Lt(.68,.74,.08,8);e.push(c);const d=new V(c,a);d.position.y=fe+.04,n.add(d);const u=new Ie(.32,.34,.32);e.push(u);const h=new V(u,a);h.position.y=fe+.25,n.add(h);const f=new Zt(.24,0);e.push(f);const m=new V(f,o);m.position.y=fe+.62,m.scale.set(.85,1.35,.85),n.add(m);const y=new Hi(.18,0);e.push(y);const g=[[-.48,-.48],[.48,-.48],[-.48,.48],[.48,.48]];for(const[p,v]of g){const w=new V(y,l);w.position.set(p,fe+.18,v),n.add(w)}return{object:n,ownGeometries:e,ownMaterials:t}}function c2(i,e){const t=i.trim().toLowerCase();if(r2.has(t)){const s=t,a=gs(e,{terrain:s==="ore"||s==="mithril"?"mountain":"plains",resource:s});return{object:Ci(a,1,ar,!0).group,ownGeometries:[],ownMaterials:[]}}if(a2.has(t)){const s=t;let r="plains";s==="mine"?r="mountain":s==="sanctuary"?r="ancient_woods":s==="slag_pit"||s==="foundry"?r="wasteland":s==="great_forge"&&(r="plains");const a=gs(e,{terrain:r,improvement:s});return{object:Ci(a,1,ar,!0).group,ownGeometries:[],ownMaterials:[]}}if(t==="road"||t==="roads"){const s=gs(e,{terrain:"plains",hasRoad:!0});return{object:Ci(s,1,o2,!0).group,ownGeometries:[],ownMaterials:[]}}if(t==="ancient_woods"||t==="plant_woods"){const s=gs(e,{terrain:"ancient_woods"});return{object:Ci(s,1,ar,!0).group,ownGeometries:[],ownMaterials:[]}}if(t==="forest"||t==="chop_forest"){const s=gs(e,{terrain:"forest"});return{object:Ci(s,1,ar,!0).group,ownGeometries:[],ownMaterials:[]}}if(t==="mountain"||t==="mountain_pass"){const s=gs(e,{terrain:"mountain"});return{object:Ci(s,1,ar,!0).group,ownGeometries:[],ownMaterials:[]}}return t==="city_wall"||t==="walls"?{object:Ec(dh(e,{level:2,isCapital:!1,hasWalls:!0})),ownGeometries:[],ownMaterials:[]}:t==="park"?l2(e):{object:Ec(dh(e,{level:3,isCapital:!0,hasWalls:!0})),ownGeometries:[],ownMaterials:[]}}class ws{static shared=null;renderer=null;scene=null;camera=null;cache=new Map;box=new kr;centerVec=new B;cornerVec=new B;static getShared(){return ws.shared||(ws.shared=new ws),ws.shared}static renderTechIcon(e,t){return ws.getShared().renderTechIcon(e,t)}ensureInitialized(){if(this.renderer&&this.scene&&this.camera)return!0;if(typeof document>"u")return!1;try{const e=new ff({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"default"});e.setPixelRatio(1),e.setSize(ch,ch,!1),e.setClearColor(0,0),e.toneMapping=Vc,e.toneMappingExposure=1.08,e.outputColorSpace=hn;const t=new nf,n=new of("#d6ebff","#586a85",.85);n.position.set(0,12,0),t.add(n);const s=new Mo("#fff6e6",2.3);s.position.set(11,13,2),t.add(s);const r=new Mo("#bdd6ff",.48);r.position.set(-9,7,-8),t.add(r);const a=new Fo(-1.2,1.2,1.2,-1.2,.1,50);return a.position.set(7.5,6.2,7.5),a.lookAt(0,0,0),a.updateMatrixWorld(!0),this.renderer=e,this.scene=t,this.camera=a,!0}catch{return!1}}renderTechIcon(e,t){const n=e.trim().toLowerCase();if(s2.has(n))return id(n,t);const s=`${t}:${n}`,r=this.cache.get(s);if(r)return r;if(!this.ensureInitialized()||!this.renderer||!this.scene||!this.camera)return"";const a=c2(e,t),o=new ze;o.add(a.object),this.scene.add(o),o.updateMatrixWorld(!0),this.box.setFromObject(o),this.box.getCenter(this.centerVec),a.object.position.sub(this.centerVec),o.updateMatrixWorld(!0),this.box.setFromObject(o);const l=this.camera.matrixWorldInverse;let c=.55;const d=[this.box.min.x,this.box.max.x],u=[this.box.min.y,this.box.max.y],h=[this.box.min.z,this.box.max.z];for(const y of d)for(const g of u)for(const p of h)this.cornerVec.set(y,g,p).applyMatrix4(l),c=Math.max(c,Math.abs(this.cornerVec.x),Math.abs(this.cornerVec.y));const f=c*1.14;this.camera.left=-f,this.camera.right=f,this.camera.top=f,this.camera.bottom=-f,this.camera.updateProjectionMatrix(),this.renderer.clear(),this.renderer.render(this.scene,this.camera);const m=this.renderer.domElement.toDataURL("image/png");this.scene.remove(o);for(const y of a.ownGeometries)y.dispose();for(const y of a.ownMaterials)y.dispose();return this.cache.set(s,m),m}clearCache(){this.cache.clear()}dispose(){this.cache.clear(),this.renderer&&(this.renderer.dispose(),this.renderer=null),this.scene=null,this.camera=null}}function d2(i,e){return ws.renderTechIcon(i,e)}new xe("#7c8696");new xe("#5c6573");new Ie(.115,.125,.165);new Lt(.2,.29,.62,6);new Ie(.46,.125,.24);new Hi(.22,1);const u2=new xn(.47,.59,24);u2.rotateX(-Math.PI/2);const h2=new Set(["warrior","defender","archer","rider","catapult","rohirrim_knight","uruk_berserker","elven_sentinel","ironbreaker"]);function f2(i){return h2.has(i)}function Cf(i,e){return id(i,e)}function Cc(i){return i.iconKey}function Eo(i,e,t="thumb-3d",n=""){const s=n.replace(/"/g,"&quot;");if(f2(i)){const r=Cf(i,e);return r?`<img class="${t} thumb-sprite" src="${r}" alt="${s}" draggable="false" />`:""}try{const r=d2(i,e);return r?`<img class="${t}" src="${r}" alt="${s}" draggable="false" />`:""}catch{return""}}function Ao(i,e,t,n="thumb-3d thumb-unit"){const s=Cf(i,e);if(!s)return t;const r=i.replace(/"/g,"&quot;");return`<img class="${n} thumb-sprite" src="${s}" alt="${r}" draggable="false" />`}const fn={humans:"#2356c9",orcs:"#c92a2a",elves:"#12805c",dwarves:"#d47415"},p2={easy:"Easy",normal:"Normal",hard:"Hard"},El=["easy","normal","hard"];function fo(i){return p2[i]??"Normal"}function m2(i){const e=El.indexOf(i);return El[(e+1)%El.length]}const uh={humans:[{icon:"road",text:"+1 MOV on Roads"},{icon:"star",text:"+1★ Linked Cities"},{icon:"swords",text:"Sunmark Knight"}],orcs:[{icon:"swords",text:"+2★ Kill · +4★ Capture"},{icon:"star",text:"7★ Start & Pillage"},{icon:"axe",text:"Ironblood Berserker"}],elves:[{icon:"tree",text:"Free Forest Movement"},{icon:"star",text:"+1★ Ancient Woods"},{icon:"bow",text:"Elven Sentinel"}],dwarves:[{icon:"pickaxe",text:"Climb Peaks Turn 1"},{icon:"star",text:"+1★ Mountain Mines"},{icon:"shield",text:"Ironbreaker (20 HP)"}]},hh=["#facc15","#fde047","#f59e0b","#38bdf8","#4ade80","#f87171","#fffbeb","#c084fc"];function Ct(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function fh(i){return Ct(i).replace(/★/g,se("star","icon icon-xs icon-star"))}function g2(i){const e=[];for(let n=0;n<36;n++){const s=(n*29+7)%98+1,r=(n*.37%4.2).toFixed(2),a=(3.4+n*.53%2.8).toFixed(2),o=((n%2===0?1:-1)*(18+n*17%44)).toFixed(0),l=(240+n*73%420).toFixed(0),c=n%3===0?10:7,d=n%3===0?14:n%2===0?10:7,u=n%4===0?i:hh[n%hh.length],h=n%5===0?"50%":"2px";e.push(`<span class="victory-confetti-piece" style="left:${s}%;width:${c}px;height:${d}px;border-radius:${h};background:${u};animation-delay:-${r}s;animation-duration:${a}s;--confetti-drift:${o}px;--confetti-rot:${l}deg;"></span>`)}return`<div class="victory-confetti-layer" aria-hidden="true">${e.join("")}</div>`}class y2{root;railEl;callbacks;selectedFaction="humans";difficulty="normal";mapSize=16;savedCampaign=null;dwarfResetTaps=0;lastDwarfTapMs=0;isResettingState=!1;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="title-screen hidden",this.root.setAttribute("data-faction",this.selectedFaction),this.railEl=document.createElement("aside"),this.railEl.className="campaign-rail",this.railEl.setAttribute("aria-label","Campaign Setup"),this.root.appendChild(this.railEl),e.appendChild(this.root),this.render()}getSelectedFaction(){return this.selectedFaction}setSavedCampaign(e){this.savedCampaign=e,this.syncResumeBanner()}show(){this.dwarfResetTaps=0,this.lastDwarfTapMs=0,this.isResettingState=!1,this.root.classList.remove("hidden"),this.syncSelectionState()}hide(){this.root.classList.add("hidden")}destroy(){this.root.remove()}render(){this.root.setAttribute("data-faction",this.selectedFaction);const e=an.map(a=>{const o=dt[a],l=fn[a],c=this.selectedFaction===a;return`
        <button
          type="button"
          class="emblem-tab ${c?"selected":""}"
          data-faction-pick="${a}"
          style="--tab-accent: ${l};"
          aria-pressed="${c}"
        >
          <span class="emblem-tab-crest" style="background: ${l};">
            ${In(a)}
          </span>
          <span class="emblem-tab-name">${Ct(o.name)}</span>
        </button>
      `}).join(""),t=a=>{const o=dt[a],l=mt[o.uniqueUnit],d=uh[a].map(h=>`
            <li class="tt-perk-item">
              <span class="tt-perk-icon" aria-hidden="true">${se(h.icon,"icon")}</span>
              <span>${fh(h.text)}</span>
            </li>
          `).join(""),u=Ao(l.type,a,wr(l.type,"icon icon-lg"),"thumb-3d thumb-rail-unit");return`
        <div class="tt-champion-frame" title="${Ct(l.name)} (HP ${l.maxHp} · ATK ${l.attack} · DEF ${l.defense} · MOV ${l.movement})">
          ${u}
        </div>
        <div class="tt-showcase-copy">
          <div class="tt-showcase-realm">${Ct(o.realm)}</div>
          <ul class="tt-perk-list" aria-label="${Ct(o.name)} advantages">
            ${d}
          </ul>
        </div>
      `},n=fo(this.difficulty),s=`${this.mapSize}×${this.mapSize}`;this.railEl.innerHTML=`
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
            title="Switch AI Difficulty (Easy / Normal / Hard)"
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
            <span data-begin-label="true">Play</span>
          </button>
        </div>
      </div>
    `,this.root.querySelectorAll("[data-faction-pick]").forEach(a=>{a.addEventListener("click",()=>{if(this.isResettingState)return;const o=a.dataset.factionPick;if(o)if(o!==this.selectedFaction&&(this.selectedFaction=o,this.callbacks.onSelectFaction?.(o),this.syncSelectionState()),o==="dwarves"&&Ul()){const l=Date.now();l-this.lastDwarfTapMs>2500&&(this.dwarfResetTaps=0),this.dwarfResetTaps+=1,this.lastDwarfTapMs=l,this.dwarfResetTaps>=4&&(this.isResettingState=!0,this.dwarfResetTaps=0,$p(),this.savedCampaign=null,this.syncResumeBanner(),ut("capture"),yp())}else this.dwarfResetTaps=0,this.lastDwarfTapMs=0})}),this.root.querySelector("[data-cycle-difficulty]")?.addEventListener("click",()=>{this.difficulty=m2(this.difficulty),this.syncSelectionState()}),this.root.querySelector("[data-cycle-mapsize]")?.addEventListener("click",()=>{this.mapSize=this.mapSize===16?18:16,this.syncSelectionState()}),this.root.querySelector('[data-action="begin"]')?.addEventListener("click",()=>{this.callbacks.onStartGame({humanFaction:this.selectedFaction,difficulty:this.difficulty,mapSize:this.mapSize})})}syncSelectionState(){this.root.setAttribute("data-faction",this.selectedFaction),this.root.querySelectorAll("[data-faction-pick]").forEach(l=>{const c=l.dataset.factionPick===this.selectedFaction;l.classList.toggle("selected",c),l.setAttribute("aria-pressed",String(c))});const e=this.root.querySelector("[data-showcase-active]");if(e){const l=dt[this.selectedFaction],c=mt[l.uniqueUnit],u=uh[this.selectedFaction].map(f=>`
            <li class="tt-perk-item">
              <span class="tt-perk-icon" aria-hidden="true">${se(f.icon,"icon")}</span>
              <span>${fh(f.text)}</span>
            </li>
          `).join(""),h=Ao(c.type,this.selectedFaction,wr(c.type,"icon icon-lg"),"thumb-3d thumb-rail-unit");e.innerHTML=`
        <div class="tt-champion-frame" title="${Ct(c.name)} (HP ${c.maxHp} · ATK ${c.attack} · DEF ${c.defense} · MOV ${c.movement})">
          ${h}
        </div>
        <div class="tt-showcase-copy">
          <div class="tt-showcase-realm">${Ct(l.realm)}</div>
          <ul class="tt-perk-list" aria-label="${Ct(l.name)} advantages">
            ${u}
          </ul>
        </div>
      `}const t=fo(this.difficulty),n=this.root.querySelector("[data-difficulty-label]");n&&(n.textContent=t),this.root.querySelector("[data-cycle-difficulty]")?.setAttribute("aria-label",`AI Difficulty: ${t}`);const r=`${this.mapSize}×${this.mapSize}`,a=this.root.querySelector("[data-mapsize-label]");a&&(a.textContent=r),this.root.querySelector("[data-cycle-mapsize]")?.setAttribute("aria-label",`Map Size: ${r}`),this.syncResumeBanner()}syncResumeBanner(){const e=this.root.querySelector("[data-resume-slot]"),t=this.root.querySelector("[data-begin-label]");if(!e)return;if(!this.savedCampaign||!this.callbacks.onResumeGame){e.classList.add("hidden"),e.innerHTML="",t&&(t.textContent="Play");return}const n=this.savedCampaign,s=dt[n.faction],r=fn[n.faction],a=fo(n.difficulty),o=n.citiesCount===1?"1 City":`${n.citiesCount} Cities`;e.classList.remove("hidden"),e.innerHTML=`
      <div class="tt-resume-card">
        <div class="tt-resume-meta">
          <span class="tt-resume-crest" style="background: ${r};" aria-hidden="true">
            ${In(n.faction,"icon icon-crest-sm")}
          </span>
          <div class="tt-resume-text">
            <span class="tt-resume-title">${Ct(s.name)} · ${Ct(s.realm)}</span>
            <span class="tt-resume-sub">${Ct(a)} · ${Ct(o)} · ${n.score.toLocaleString()} Glory</span>
          </div>
        </div>
        <button type="button" class="tt-resume-btn" data-action="resume">
          <span>Resume</span>
          ${se("chevronRight","icon icon-xs")}
        </button>
      </div>
    `,e.querySelector('[data-action="resume"]')?.addEventListener("click",()=>{this.callbacks.onResumeGame?.()}),t&&(t.textContent="New Game")}}class v2{root;callbacks;stage="celebration";lastData=null;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="screen-overlay gameover-screen hidden",e.appendChild(this.root)}show(e){this.lastData=e,this.stage="celebration",this.render(),this.root.classList.remove("hidden")}hide(){this.root.classList.add("hidden"),this.root.removeAttribute("data-stage"),this.root.removeAttribute("data-outcome")}destroy(){this.root.remove()}computeBreakdown(e,t){const n=e.players.find(c=>c.id===t),s=Object.values(e.cities).filter(c=>c.ownerId===t).length,r=Object.values(e.units).filter(c=>c.ownerId===t).length,a=n?n.techs.length:0,o=n?n.revealedTiles.filter(Boolean).length:0,l=n?n.score:0;return{cities:s,techs:a,units:r,revealedTiles:o,total:l}}isHumanEliminatedEarly(e,t){const n=e.players.find(s=>s.id===t);return!n||n.alive?!1:e.players.filter(s=>s.alive).length>1}formatWinSubtitle(e,t){return t&&this.isHumanEliminatedEarly(e,t)?"Your Final Stronghold Has Fallen":e.winReason==="domination"?"The Star-Crown Reunites — All Rival Capitals Claimed":"The Star-Crown Reunites — Eternal Glory"}render(){const e=this.lastData;if(!e)return;const{state:t,humanPlayerId:n}=e,s=t.players.find(a=>a.id===t.winnerId)??null,r=s!==null&&s.id===n;this.root.setAttribute("data-stage",this.stage),this.root.setAttribute("data-outcome",r?"victory":"defeat"),this.stage==="celebration"?this.renderCelebrationStage(e,r):this.renderScoresStage(e,r)}renderCelebrationStage(e,t){const{state:n,humanPlayerId:s}=e,r=n.players.find(m=>m.id===n.winnerId)??null,a=n.players.find(m=>m.id===s)??null,o=r?.faction??"humans",l=a?.faction??"humans",c=dt[o],d=fn[o],u=this.formatWinSubtitle(n,s),h=this.isHumanEliminatedEarly(n,s);t?this.root.innerHTML=`
        <div class="victory-curtain" style="--winner-heraldry: ${d};">
          <div class="victory-sunburst" aria-hidden="true"></div>
          ${g2(d)}

          <div class="victory-stage">
            <div class="victory-faction-pill">
              <span class="victory-pill-crest" style="background: ${d};">
                ${In(o,"icon")}
              </span>
              <span>${Ct(c.name)} &middot; ${Ct(c.realm)}</span>
            </div>

            <h2 class="victory-headline">VICTORY!</h2>
            <p class="victory-subtitle">${Ct(u)}</p>

            <div class="alderwick-endgame-host" data-alderwick-host></div>
          </div>
        </div>
      `:this.root.innerHTML=`
        <div class="defeat-curtain" style="--winner-heraldry: ${d};">
          <div class="defeat-glow" aria-hidden="true"></div>

          <div class="defeat-stage">
            <div class="gameover-badge defeat">
              ${se("skull","icon icon-sm")}
              <span>Chronicle Fallen</span>
            </div>

            <div class="defeat-victor-emblem">
              <span class="defeat-victor-crest" style="background: ${d};">
                ${In(o,"icon victory-crest-icon")}
              </span>
              <span class="defeat-victor-crown">${se("crown","icon icon-sm")}</span>
            </div>

            <h2 class="defeat-headline">DEFEAT</h2>
            <p class="defeat-victor-line">
              ${r?h?`${Ct(c.name)} Overran Your Realm`:`${Ct(c.name)} Claimed the Star-Crown`:"The Age Concludes"}
            </p>
            <p class="victory-subtitle">${Ct(u)}</p>

            <div class="alderwick-endgame-host" data-alderwick-host></div>
          </div>
        </div>
      `;const f=this.root.querySelector("[data-alderwick-host]");if(f){const m=t?op[o]:cp(l,r?.faction??null);po(f,[{pose:t?"cheer":"console",bodyHtml:`
              <p class="alderwick-bubble-lead">${Ct(m.alderwickQuote)}</p>
              <p class="alderwick-bubble-narration">${Ct(m.epilogue)}</p>
            `,actionLabel:"View Final Scores"}],()=>{this.stage="scores",this.render()},"is-inline")}}renderScoresStage(e,t){const{state:n,humanPlayerId:s,scoreBreakdowns:r}=e,a=n.players.find(f=>f.id===n.winnerId)??null,o=a?dt[a.faction]:null,l=this.formatWinSubtitle(n,s),c=this.isHumanEliminatedEarly(n,s),u=[...n.players].sort((f,m)=>f.id===n.winnerId?-1:m.id===n.winnerId?1:m.score-f.score).map((f,m)=>{const y=dt[f.faction],g=fn[f.faction],p=r?.[f.id]??this.computeBreakdown(n,f.id),v=f.id===n.winnerId,w=f.id===s;return`
          <tr class="${v?"winner-row":""} ${w?"human-row":""}">
            <td class="num">#${m+1}</td>
            <td>
              <span class="faction-dot" style="background: ${g}; margin-right: 6px;"></span>
              ${Ct(y.name)}${w?" (You)":""}
              ${v?se("crown","icon icon-sm icon-star"):""}
            </td>
            <td class="col-fate">${f.alive?"Standing":"Fallen"}</td>
            <td class="num">${p.cities}</td>
            <td class="num col-lore">${p.techs}</td>
            <td class="num score-total">${p.total.toLocaleString()}</td>
          </tr>
        `}).join("");this.root.innerHTML=`
      <div class="gameover-panel gameover-scores-panel">
        <div class="gameover-badge ${t?"victory":"defeat"}">
          ${se(t?"crown":"skull","icon icon-sm")}
          <span>${t?"Chronicle Triumphant":"Chronicle Sealed"}</span>
        </div>
        <h2 class="gameover-title">
          ${o?c?`${Ct(o.name)} Overran Your Realm`:`${Ct(o.name)} Claim the Star-Crown`:"The Age Concludes"}
        </h2>
        <p class="gameover-reason">
          ${Ct(l)}
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
              ${u}
            </tbody>
          </table>
        </div>

        <p class="gameover-chronicle-footnote">
          ${se("star","icon icon-xs icon-star")}
          <span>${Ct(fo(n.config.difficulty))} · Recorded in the Great Ledger by ${xs}</span>
        </p>

        <button type="button" class="btn btn-cta btn-begin" data-action="play-again">
          <span>New Campaign</span>
          ${se("chevronRight","icon")}
        </button>
      </div>
    `,this.root.querySelector('[data-action="play-again"]')?.addEventListener("click",()=>{this.callbacks.onPlayAgain()})}}class _2{root;callbacks;openState=!1;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="alderwick-stage-backdrop resignation-screen hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Campaign Resigned"),e.appendChild(this.root)}isOpen(){return this.openState}show(e){this.openState=!0,this.render(e),this.root.classList.remove("hidden")}hide(){this.openState=!1,this.root.classList.add("hidden"),this.root.innerHTML=""}destroy(){this.root.remove()}render(e){const t=dt[e.faction],n=fn[e.faction],s=dp[e.faction];po(this.root,[{pose:"console",headerHtml:`
            <span class="resignation-bubble-crest" style="background: ${n};" aria-hidden="true">
              ${In(e.faction,"icon")}
            </span>
            <strong class="resignation-bubble-title">A Chapter Set Aside</strong>
            <span class="resignation-bubble-realm">${Ct(t.name)} &middot; ${Ct(t.realm)}</span>
          `,bodyHtml:`
            <p class="alderwick-bubble-lead">${Ct(s.alderwickQuote)}</p>
            <p class="alderwick-bubble-narration">${Ct(s.epilogue)}</p>
            <div class="resignation-stats-grid" role="list" aria-label="Campaign Summary">
              <div class="resignation-stat-card" role="listitem">
                <span class="resignation-stat-label">Age Reached</span>
                <strong class="resignation-stat-val">Age ${Hn[e.age??1]}</strong>
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
          `,actionLabel:"Return to Title"}],()=>{this.hide(),this.callbacks.onReturnToTitle()},"is-resign")}}function w2(i,e){const t=e?.trim();if(t)return/eclipse/i.test(t)?"Eclipse":/volcano|eruption|doom/i.test(t)?"Volcano":/dragon|wyrm|drake/i.test(t)?"Dragon":/tower|beacon|citadel/i.test(t)?"Tower":t.length<=10?t:t.split(/\s+/)[0]||t;switch(i){case"humans":return"Tower";case"orcs":return"Volcano";case"elves":return"Eclipse";case"dwarves":return"Dragon"}}function eo(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class M2{root;aiBanner;callbacks;lastBannerKey=null;lastBarKey=null;constructor(e,t){this.callbacks=t,this.root=document.createElement("header"),this.root.className="top-bar hidden",e.appendChild(this.root),this.aiBanner=document.createElement("div"),this.aiBanner.className="ai-turn-floating hidden",e.appendChild(this.aiBanner)}show(){this.root.classList.remove("hidden")}hide(){this.root.classList.add("hidden"),this.aiBanner.classList.add("hidden"),this.lastBannerKey=null,this.lastBarKey=null}update(e){this.render(e)}destroy(){this.root.remove(),this.aiBanner.remove()}render(e){const t=dt[e.activePlayer.faction],n=fn[e.player.faction],s=fn[e.activePlayer.faction],r=e.isHumanTurn?"human":`ai:${e.activePlayer.id}:${e.activePlayer.faction}`;r!==this.lastBannerKey&&(this.lastBannerKey=r,e.isHumanTurn?(this.aiBanner.classList.add("hidden"),this.aiBanner.innerHTML=""):(this.aiBanner.classList.remove("hidden"),this.aiBanner.innerHTML=`
          <div class="ai-turn-banner" style="--ai-color: ${s};">
            <span class="faction-dot" style="background: ${s};"></span>
            <span>${eo(t.name)}</span>
            <span class="ai-turn-dots" aria-hidden="true"><span></span><span></span><span></span></span>
          </div>
        `));const a=e.age??An(e.player),o=e.techCount??e.player.techs.length,l=Math.max(0,Math.min(7,o)),c=!!e.superpowerUsed,d=c?0:Math.min(1,l/7),u=!!e.superpowerTargeting,h=!!(e.canUseSuperpower&&!c),f=(h||u)&&!c,m=l===6&&!c&&!f,y=`Age ${Hn[a]}`,g=u?"Cancel":w2(e.player.faction,e.superpowerName),p=u?"Cancel superpower targeting":f?`Activate ${e.superpowerName??g}`:`${y} (${l}/7 to ${g}) — Open Codex`,v=2*Math.PI*25,w=(v*(1-(f?1:d))).toFixed(1),_=[e.player.faction,e.player.score,e.player.gold,e.player.goldPerTurn,a,l,h?1:0,c?1:0,u?1:0,e.superpowerName??""].join("|");if(_===this.lastBarKey)return;this.lastBarKey=_;const M=u?"is-targeting":f?"is-ready":c?"is-spent":m?"is-almost":"is-dormant",b=u?"CANCEL":f?"READY":`AGE ${Hn[a]}`,T=`
      <div class="sp-round-wrap ${M}">
        <svg class="sp-ring-svg" viewBox="0 0 58 58" aria-hidden="true">
          <circle class="sp-ring-bg" cx="29" cy="29" r="25" />
          <circle
            class="sp-ring-fg"
            cx="29"
            cy="29"
            r="25"
            stroke-dasharray="${v.toFixed(1)}"
            stroke-dashoffset="${w}"
          />
        </svg>
        <button
          type="button"
          class="sp-round-btn ${M}"
          data-action="${f?"superpower":"codex"}"
          title="${eo(p)}"
          aria-label="${eo(p)}"
        >
          <span class="sp-btn-gloss" aria-hidden="true"></span>
          ${f&&!u?'<span class="sp-btn-sweep" aria-hidden="true"></span>':""}
          ${u?se("close","icon sp-round-icon"):Bc(e.player.faction,"icon sp-round-icon")}
        </button>
        <span class="sp-round-badge ${M}">${eo(b)}</span>
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
            ${In(e.player.faction,"icon icon-crest-sm")}
          </span>
          ${se("trophy","icon icon-sm icon-star")}
          <span class="top-glory-val">${e.player.score.toLocaleString()}</span>
        </button>
      </div>

      <div class="top-cluster top-cluster-center">
        ${T}
      </div>

      <div class="top-cluster top-cluster-right">
        <div class="top-pill top-pill-stars" title="Stars &amp; income per turn">
          ${se("star","icon icon-star")}
          <span class="top-stars-val">${e.player.gold}</span>
          <span class="top-stars-delta">(+${e.player.goldPerTurn})</span>
        </div>
      </div>
    `,this.root.querySelector('[data-action="leaderboard"]')?.addEventListener("click",()=>{this.callbacks.onOpenLeaderboard?.()}),this.root.querySelector('[data-action="codex"]')?.addEventListener("click",()=>{this.callbacks.onOpenCodex?.()}),this.root.querySelector('[data-action="superpower"]')?.addEventListener("click",()=>{this.callbacks.onActivateSuperpower?.()})}}const b2={berries:"Berries",game:"Game",ore:"Ore",mithril:"Starsteel",ruins:"Ruins"},ph={harvest_berries:"berries",harvest_game:"game",harvest_ore:"ore",harvest_mithril:"mithril",build_farm:"farm",build_windmill:"windmill",build_slag_pit:"slag_pit",build_foundry:"foundry",build_sanctuary:"sanctuary",build_mine:"mine",build_great_forge:"great_forge",build_road:"road",plant_ancient_woods:"ancient_woods"};function Yn(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function S2(i,e){const t=e>0?i/e:0;return t<=.35?"low":t<=.65?"mid":""}function Al(i){if(i.id==="capture-city")return i.label.toLowerCase().includes("village")?"Claim":"Capture";if(i.id==="explore-ruins")return"Explore";if(i.id==="recover")return"Heal";if(i.id==="promote")return"Promote";if(i.id==="build_road")return"Road";if(i.id==="chop_forest")return"Chop";if(i.id==="plant_ancient_woods")return"Woods";if(i.id.startsWith("harvest_"))return i.label.replace(/^Harvest\s+/i,"");if(i.id.startsWith("build_"))return i.label.replace(/^Build\s+/i,"");if(i.unitType)switch(i.unitType){case"rohirrim_knight":return"Sunmark";case"uruk_berserker":return"Berserker";case"elven_sentinel":return"Sentinel";default:return i.label}return i.label}const to=3;function x2(i,e){if(i.isVeteran)return'<span class="vet-progress is-veteran" title="Veteran: +5 max HP">★ Veteran</span>';if(!e)return"";const t=Math.min(to,i.kills),n=i.canPromote||i.kills>=to,s=Math.max(0,to-t),r=Array.from({length:to},(o,l)=>`<i class="${l<t?"is-filled":""}"></i>`).join(""),a=n?"Ready to promote!":`${s} more kill${s===1?"":"s"} to Veteran`;return`<span class="vet-progress ${n?"is-ready":""}" title="Veterans gain +5 max HP and a full heal">
    <span class="vet-pips" aria-hidden="true">${r}</span><span>${a}</span>
  </span>`}function T2(i,e){if(!e)return"Wait";if(i.enabled)return null;const t=i.disabledReason??"";if(!t)return"Locked";if(/next turn/i.test(t))return"Next Turn";if(/full hp/i.test(t))return"Full HP";if(/already acted/i.test(t))return"Acted";if(/already veteran/i.test(t))return"Veteran";const n=t.match(/Kills:\s*(\d+)\s*\/\s*(\d+)/i);if(n){const r=Math.max(0,Number(n[2])-Number(n[1]));return`${r} more kill${r===1?"":"s"}`}if(/occupied/i.test(t))return"Occupied";if(/cap reached/i.test(t))return"Cap Full";if(/outside.*border/i.test(t))return"Borders";if(/enemy territory/i.test(t))return"Enemy";const s=t.match(/Need\s+(\d+★)/i);return s?`Need ${s[1]}`:/requires/i.test(t)?"Locked":t.length>12?`${t.slice(0,11)}…`:t}class E2{root;callbacks;constructor(e,t){this.callbacks=t,this.root=document.createElement("section"),this.root.className="bottom-hud-wrapper hidden",this.root.setAttribute("aria-label","Game actions"),e.appendChild(this.root),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(()=>this.publishHeight()),this.resizeObserver.observe(this.root))}resizeObserver=null;publishHeight(){const e=this.root.classList.contains("hidden")?0:this.root.getBoundingClientRect().height;document.documentElement.style.setProperty("--bottom-hud-height",`${Math.round(e)}px`),window.dispatchEvent(new CustomEvent("eldermere:bottom-hud-resize"))}show(){this.root.classList.remove("hidden")}hide(){this.root.classList.add("hidden")}update(e){this.root.classList.remove("hidden"),this.render(e)}destroy(){this.resizeObserver?.disconnect(),this.root.remove()}render(e){const t=e.combatPreview?this.renderCombatStrip(e.combatPreview):"",s=!!(e.selectedUnit||e.selectedCity||e.selectedTile)?this.renderSelectionDrawer(e):this.renderIdleBar(e);this.root.innerHTML=`${t}${s}`,this.bindEvents(e)}renderIdleBar(e){const t=e.hasAffordableTech&&e.affordableTechCount>0?`<span class="tt-dock-badge">${e.affordableTechCount}</span>`:"",n=e.isHumanTurn&&e.allUnitsActed,s=e.tutorialTargetIdleAction==="tech",r=e.tutorialTargetIdleAction==="end-turn";return`
      <div class="idle-bottom-bar" role="toolbar" aria-label="Turn controls">
        <button
          type="button"
          class="tt-dock-btn tt-dock-btn-codex idle-codex-btn${s?" is-tutorial-target":""}"
          data-idle-action="tech"
          title="Open Tech Codex"
          aria-label="Open Tech Codex"
        >
          <span class="tt-dock-medallion" aria-hidden="true">
            ${pp(e.playerFaction,"icon")}
            ${t}
          </span>
          <span class="tt-dock-label">Codex</span>
        </button>

        <button
          type="button"
          class="tt-dock-btn tt-dock-btn-end idle-end-turn-btn ${n?"all-done":""}${r?" is-tutorial-target":""}"
          data-idle-action="end-turn"
          title="${e.isHumanTurn?"End Turn (Space)":"Rival turn in progress"}"
          aria-label="${e.isHumanTurn?"End Turn":"Rival Turn"}"
          ${e.isHumanTurn?"":"disabled"}
        >
          <span class="tt-dock-medallion" aria-hidden="true">
            ${mp(e.playerFaction,"icon")}
          </span>
          <span class="tt-dock-label">${e.isHumanTurn?"End Turn":"Rival Turn"}</span>
        </button>
      </div>
    `}renderCombatStrip(e){const{preview:t,attacker:n,attackerOwner:s,defender:r,defenderOwner:a}=e,o=mt[n.type],l=mt[r.type],c=fn[a.faction],d=Math.max(0,r.hp-t.attackerDamage),u=Math.max(0,n.hp-t.retaliationDamage),h=t.defenderKilled,f=!h&&t.attackerKilled;let m="";h?m=`<span class="combat-strip-badge lethal">${se("skull","icon icon-sm")} LETHAL</span>`:f?m=`<span class="combat-strip-badge fatal">${se("skull","icon icon-sm")} FATAL</span>`:t.retaliationDamage===0&&(m='<span class="combat-strip-badge safe">SAFE</span>');let y="";return h&&s.faction==="orcs"?y=`<span class="combat-strip-bonus">+${s.techs.includes("orcs_spoils_mastery")?3:2}${se("star","icon icon-sm icon-star")}</span>`:h&&o.traits.includes("persist")&&!l.traits.includes("stalwart")&&(y='<span class="combat-strip-bonus">Persist</span>'),`
      <div class="combat-strip ${h?"is-lethal":""} ${f?"is-fatal-counter":""}" role="status">
        <span class="combat-strip-unit">
          <span class="combat-strip-name">${Yn(Al({id:"",label:o.name,unitType:n.type}))}</span>
          <span class="combat-strip-hp ${u<n.hp?"damaged":""}">${n.hp}&rarr;${u}</span>
        </span>
        <span class="combat-strip-vs" aria-hidden="true">${se("swords","icon icon-sm")}</span>
        <span class="combat-strip-unit">
          <span class="faction-dot" style="background: ${c};"></span>
          <span class="combat-strip-name">${Yn(Al({id:"",label:l.name,unitType:r.type}))}</span>
          <span class="combat-strip-hp ${h?"slain":""}">${r.hp}&rarr;${d}</span>
        </span>
        ${m}
        ${y}
      </div>
    `}renderSelectionDrawer(e){const t=e.selectionLayer==="unit"&&e.selectedUnit!==null,n=!t&&e.selectedCity!==null,s=!t&&!n&&e.selectedTile!==null;let r="",a="",o="";if(t&&e.selectedUnit){const{unit:c,owner:d,isOwnedByHuman:u}=e.selectedUnit,h=mt[c.type],f=fn[d.faction],m=e.selectedUnit.effectiveAttack??h.attack,y=e.selectedUnit.effectiveDefense??h.defense,g=Math.max(0,Math.min(100,c.hp/c.maxHp*100)),p=[`HP ${c.hp}/${c.maxHp}`,`ATK ${m}`,`DEF ${y}`];if(h.range>1&&p.push(`RNG ${h.range}`),r=`
        <span class="faction-dot" style="background: ${f};"></span>
        <span class="drawer-title">${Yn(h.name)}${c.isVeteran?` ${se("crown","icon icon-sm icon-star")}`:""}</span>
        <span class="drawer-stats">${Yn(p.join(" · "))}</span>
        ${x2(c,u)}
      `,a=`
        <div class="drawer-hairline-progress">
          <div class="progress-bar-fill hp ${S2(c.hp,c.maxHp)}" style="width: ${g}%;"></div>
        </div>
      `,u&&e.selectedUnit.actions.length>0){const v=M=>M==="capture-city"||M==="explore-ruins"||M==="promote"&&e.selectedUnit.actions.some(b=>b.id==="promote"&&b.enabled);o=`
          <div class="action-tile-row" role="list">
            ${e.selectedUnit.actions.filter(M=>!(M.id==="promote"&&c.isVeteran)).sort((M,b)=>v(M.id)&&!v(b.id)?-1:!v(M.id)&&v(b.id)?1:0).map(M=>this.renderActionTile(M,"unit",e.isHumanTurn,d.faction,e.tutorialTargetActionId??null)).join("")}
          </div>
        `}}else if(n&&e.selectedCity){const{city:c,owner:d,isOwnedByHuman:u,popNeeded:h,income:f,unitCount:m,unitCap:y}=e.selectedCity,g=fn[d.faction],p=Math.max(0,Math.min(100,c.population/Math.max(1,h)*100));r=`
        <span class="faction-dot" style="background: ${g};"></span>
        <span class="drawer-title">${Yn(c.name)}</span>
        <span class="drawer-stats">Lv ${c.level} &middot; Pop ${c.population}/${h} &middot; +${f}★ &middot; ${m}/${y}</span>
      `,a=`
        <div class="drawer-hairline-progress">
          <div class="progress-bar-fill pop" style="width: ${p}%;"></div>
        </div>
      `,u&&e.selectedCity.trainOptions.length>0&&(o=`
          <div class="action-tile-row" role="list">
            ${e.selectedCity.trainOptions.map(v=>this.renderActionTile(v,"city",e.isHumanTurn,d.faction,e.tutorialTargetActionId??null)).join("")}
          </div>
        `)}else if(s&&e.selectedTile){const{tile:c,terrainName:d,defenseBonus:u}=e.selectedTile,h=[];if(u>1){const f=`${u.toFixed(2).replace(/\.00$/,".0").replace(/\.50$/,".5")}x`;h.push(`DEF ${f}`)}c.resource?h.push(b2[c.resource]??c.resource):c.improvement?h.push(Bi[c.improvement]?.name??c.improvement):c.hasVillage?h.push("Village"):c.hasRoad&&h.push("Road"),r=`
        <span class="drawer-title">${Yn(d)}</span>
        ${h.length>0?`<span class="drawer-stats">${Yn(h.join(" · "))}</span>`:""}
      `,e.selectedTile.actions.length>0&&(o=`
          <div class="action-tile-row" role="list">
            ${e.selectedTile.actions.map(f=>this.renderActionTile(f,"tile",e.isHumanTurn,e.playerFaction,e.tutorialTargetActionId??null)).join("")}
          </div>
        `)}const l=this.callbacks.onDeselect?`<button type="button" class="drawer-close-btn" data-action-close="true" title="Close (Esc)" aria-label="Close selection">${se("close","icon icon-sm")}</button>`:"";return`
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
    `}renderActionTile(e,t,n,s,r=null){const a=n&&e.enabled&&!!e.action,o=!!(!e.enabled&&e.requiredTechId&&n),l=a||o,c=e.id==="capture-city"||e.id==="explore-ruins",d=e.id==="explore-ruins",u=!!(e.unitType&&mt[e.unitType]?.faction!==null),h=a&&!!(r&&(r===e.id||r==="harvest"&&e.id.startsWith("harvest_"))),f=Al(e),m=o?null:T2(e,n);let y;e.unitType?y=Ao(e.unitType,s,wr(e.unitType,"icon icon-lg"),"thumb-3d thumb-tile-action"):ph[e.id]?y=Eo(ph[e.id],s,"thumb-3d thumb-tile-action",f)||gd(e.icon,"icon icon-lg",e.id):y=gd(e.icon,"icon icon-lg",e.id);let g="";!o&&e.cost!==void 0&&e.cost>0?g=`<span class="tile-cost-pill">${e.cost}${se("star","icon icon-xs icon-star")}</span>`:!o&&e.id==="chop_forest"&&(g=`<span class="tile-cost-pill gain">+2${se("star","icon icon-xs icon-star")}</span>`);const p=e.requiredTechId?kt[e.requiredTechId]?.name??e.requiredTechId:null,v=o&&p?`${e.label} — Tap to unlock ${p}`:m?`${e.label} (${e.disabledReason??m})`:`${e.label}: ${e.description}`,w=["action-tile",c?"is-capture":"",d?"is-ruins":"",u?"is-unique":"",h?"is-tutorial-target":"",o?"is-tech-locked":a?"":"is-disabled"].filter(Boolean).join(" "),_=o?`<span class="action-tile-lock is-unlock">${se("codex","icon icon-xs")}<span>Unlock</span></span>`:m?`<span class="action-tile-lock">${Yn(m)}</span>`:"";return`
      <button
        type="button"
        class="${w}"
        data-action-scope="${t}"
        data-action-id="${Yn(e.id)}"
        ${o&&e.requiredTechId?`data-unlock-tech="${Yn(e.requiredTechId)}"`:""}
        title="${Yn(v)}"
        ${l?"":"disabled"}
      >
        ${g}
        <span class="action-tile-visual" aria-hidden="true">${y}</span>
        <span class="action-tile-label">${Yn(f)}</span>
        ${_}
      </button>
    `}bindEvents(e){if(this.root.querySelector('[data-idle-action="tech"]')?.addEventListener("click",()=>{this.callbacks.onOpenTech?.()}),this.root.querySelector('[data-idle-action="superpower"]')?.addEventListener("click",()=>{e.isHumanTurn&&this.callbacks.onActivateSuperpower?.()}),this.root.querySelector('[data-idle-action="next-ready"]')?.addEventListener("click",()=>{this.callbacks.onNextReadyUnit?.()}),this.root.querySelector('[data-idle-action="end-turn"]')?.addEventListener("click",()=>{e.isHumanTurn&&this.callbacks.onEndTurn?.()}),this.root.querySelector("[data-action-close]")?.addEventListener("click",()=>{this.callbacks.onDeselect?.()}),!e.isHumanTurn)return;const t=new Map((e.selectedUnit?.actions??[]).map(r=>[r.id,r])),n=new Map((e.selectedCity?.trainOptions??[]).map(r=>[r.id,r])),s=new Map((e.selectedTile?.actions??[]).map(r=>[r.id,r]));this.root.querySelectorAll("[data-action-scope]").forEach(r=>{r.addEventListener("click",()=>{if(r.disabled)return;const a=r.dataset.unlockTech;if(a){this.callbacks.onUnlockTech?.(a);return}const o=r.dataset.actionScope,l=r.dataset.actionId;if(!o||!l)return;let c;o==="unit"?c=t.get(l):o==="city"?c=n.get(l):o==="tile"&&(c=s.get(l)),c&&c.enabled&&c.action&&this.callbacks.onAction(c.action)})})}}function Fn(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function $r(i){return Fn(i).replace(/★/g,se("star","icon icon-xs icon-star"))}function mh(i,e,t){const n=i.tier===1?3:i.tier===2?5:8,s=Math.max(0,t-1),r=e.techs.includes("elves_elven_lore")?1:0;return Math.max(2,n+s-r)}function A2(i){return i.split(/\s*&\s*/)[0]||i}function no(i,e){return i.prerequisites.every(t=>e.has(t))}class R2{root;callbacks;openState=!1;activePillarIndex=0;pendingTechId=null;blockedTechId=null;lastVm=null;onKeyDown;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop tech-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Tech Codex"),e.appendChild(this.root),this.root.addEventListener("click",n=>{n.target===this.root&&(this.pendingTechId||this.blockedTechId?this.dismissSubDialog():this.close())}),this.onKeyDown=n=>{n.key==="Escape"&&this.openState&&(this.pendingTechId||this.blockedTechId?(n.stopPropagation(),this.dismissSubDialog()):this.close())},window.addEventListener("keydown",this.onKeyDown)}isOpen(){return this.openState}syncOpenClass(){typeof document<"u"&&document.documentElement.classList.toggle("tech-modal-open",this.openState)}open(e){if(this.openState=!0,this.syncOpenClass(),this.pendingTechId=null,this.blockedTechId=null,this.lastVm=e,e.tutorialTargetTechId){const t=kt[e.tutorialTargetTechId];t&&t.faction===e.player.faction&&(this.activePillarIndex=t.pillarIndex)}this.render(e),this.root.classList.remove("hidden"),this.restoreCarouselPosition(!1)}openToTech(e,t){this.openState=!0,this.syncOpenClass(),this.pendingTechId=null,this.blockedTechId=null,this.lastVm=e;const n=kt[t];if(n&&n.faction===e.player.faction){this.activePillarIndex=n.pillarIndex;const s=new Set(e.player.techs),r=An(e.player),a=e.techCosts?.[n.id]??mh(n,e.player,e.cityCount);!!!(e.tutorialTargetTechId&&e.tutorialTargetTechId!==n.id)&&e.isHumanTurn&&!s.has(n.id)&&r>=n.tier&&no(n,s)&&e.player.gold>=a?this.pendingTechId=t:this.blockedTechId=t}this.render(e),this.root.classList.remove("hidden"),this.restoreCarouselPosition(!1)}update(e){this.lastVm=e,this.openState&&(this.render(e),this.restoreCarouselPosition(!1))}close(){this.openState&&(this.openState=!1,this.syncOpenClass(),this.pendingTechId=null,this.blockedTechId=null,this.root.classList.add("hidden"),this.callbacks.onClose())}destroy(){this.openState=!1,this.syncOpenClass(),window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}dismissSubDialog(){!this.pendingTechId&&!this.blockedTechId||(this.pendingTechId=null,this.blockedTechId=null,this.openState&&this.lastVm&&(this.render(this.lastVm),this.restoreCarouselPosition(!1)))}computeBlockReason(e,t,n,s,r){const{player:a,isHumanTurn:o,state:l}=e;if(r.has(t.id))return"Already researched.";if(!o)return"Wait for your turn to research technologies.";if(e.tutorialTargetTechId&&e.tutorialTargetTechId!==t.id)return`Complete the tutorial step by researching ${kt[e.tutorialTargetTechId]?.name??"the highlighted technology"} first.`;if(t.tier>s){const d=Math.max(1,vr[t.tier]-a.techs.length);return`Requires Age ${Hn[t.tier]} — research ${d} more ${d===1?"technology":"technologies"} to advance to Age ${Hn[t.tier]}.`}const c=t.prerequisites.filter(d=>!r.has(d));if(c.length>0)return`Requires ${c.map(u=>kt[u]?.name??u).join(" & ")} first.`;if(a.gold<n)return`Need ${n}★ (you have ${a.gold}★).`;if(l){const d=Yf(l,a.id,t.id);if(d)return d}return"Cannot research right now."}render(e){const{player:t,cityCount:n,isHumanTurn:s,techCosts:r}=e,a=e.tutorialTargetTechId??null,o=dt[t.faction],l=fn[t.faction],c=mi(t.faction),d=c.length,u=new Set(t.techs),h=An(t),f=qf(t),m=T=>r?.[T.id]??mh(T,t,n),g=[0,1,2,3].map(T=>{const E=c.filter(N=>N.pillarIndex===T);if(E.length===0)return null;const S=E.find(N=>N.slot==="root")??null,x=E.find(N=>N.slot==="a")??null,A=E.find(N=>N.slot==="b")??null,P=E.find(N=>N.slot==="capstone")??null,I=E.filter(N=>u.has(N.id)).length,F=s&&E.some(N=>(!a||N.id===a)&&!u.has(N.id)&&N.tier<=h&&no(N,u)&&t.gold>=m(N));return{index:T,name:E[0].pillar,shortName:A2(E[0].pillar),root:S,branchA:x,branchB:A,capstone:P,techs:E,researchedCount:I,hasAffordable:F}}).filter(T=>T!==null);this.activePillarIndex>=g.length&&(this.activePillarIndex=0);const p=`
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
          ${g.map((T,E)=>`
                <button
                  type="button"
                  class="tech-pillar-pill ${E===this.activePillarIndex?"active":""} ${T.hasAffordable?"has-affordable":""}"
                  data-pillar-jump="${E}"
                  role="tab"
                  aria-selected="${E===this.activePillarIndex}"
                >
                  <span class="tech-pillar-pill-label">${Fn(T.shortName)}</span>
                  ${T.hasAffordable?'<span class="tech-pillar-dot" aria-hidden="true"></span>':""}
                </button>
              `).join("")}
        </div>
        <button
          type="button"
          class="tech-carousel-arrow tech-carousel-next"
          data-carousel-next
          aria-label="Next pillar"
          title="Next pillar"
          ${this.activePillarIndex>=g.length-1?"disabled":""}
        >&rsaquo;</button>
      </div>
    `,v=g.map(T=>this.renderPillar(T,m,t,h,u,s,a)).join("");let w=null;if(this.pendingTechId){const T=kt[this.pendingTechId];T&&T.faction===t.faction&&(!a||T.id===a)&&!u.has(T.id)&&T.tier<=h&&no(T,u)&&s&&t.gold>=m(T)?w=T:this.pendingTechId=null}let _=null;if(!w&&this.blockedTechId){const T=kt[this.blockedTechId];T&&T.faction===t.faction?_=T:this.blockedTechId=null}const M=w?this.renderConfirmDialog(w,m(w),t):_?this.renderRequirementsDialog(_,m(_),t,this.computeBlockReason(e,_,m(_),h,u)):"",b=f.nextAge!==null&&f.requiredTechs!==null?`${f.currentTechs}/${f.requiredTechs} to Age ${Hn[f.nextAge]}`:`${t.techs.length}/${d} Lore`;this.root.innerHTML=`
      <div class="modal-panel tech-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="modal-header">
          <div class="modal-title-wrap">
            <h2 class="modal-title">
              <span class="faction-crest-badge" style="background: ${l}; width: 28px; height: 28px;">
                ${In(t.faction,"icon icon-crest-sm")}
              </span>
              <span>${Fn(o.name)} Codex</span>
              <span class="tech-age-pill">${se("codex","icon icon-xs")}<span>Age ${Hn[h]}</span></span>
            </h2>
            <span class="modal-subtitle">
              <strong class="gold-text">${t.gold}${se("star","icon icon-sm icon-star")}</strong>
              <span>&middot;</span>
              <span class="tech-age-progress">${Fn(b)}</span>
            </span>
          </div>
          <button type="button" class="btn btn-icon modal-close-btn" data-action="close" aria-label="Close Codex">
            ${se("close","icon")}
          </button>
        </div>

        ${p}

        <div class="tech-tree-grid tech-carousel" data-tech-carousel>
          ${v}
        </div>
      </div>
      ${M}
    `,this.bindEvents()}renderTechDialogIcon(e,t){const n=Cc(e),s=Eo(n,t.faction,"thumb-3d thumb-confirm",e.name);return s||(e.unlocksUnits.length>0?wr(e.unlocksUnits[0],"icon icon-lg"):e.unlocksImprovements.length>0?se("tower","icon icon-lg"):e.unlocksResources.length>0?se("leaf","icon icon-lg"):e.tier===3?se("crown","icon icon-lg"):se("codex","icon icon-lg"))}renderConfirmDialog(e,t,n){const s=e.tier===3?"Age III · Capstone":`Age ${Hn[e.tier]}`;return`
      <div class="tech-confirm-scrim" data-confirm-scrim role="alertdialog" aria-modal="true" aria-label="Confirm Research">
        <div class="tech-confirm-card">
          <div class="tech-confirm-top">
            <div class="tech-confirm-thumb" aria-hidden="true">${this.renderTechDialogIcon(e,n)}</div>
            <div class="tech-confirm-copy">
              <div class="tech-confirm-kicker">${Fn(e.pillar)} &middot; ${s}</div>
              <h3 class="tech-confirm-title">Research ${Fn(e.name)}?</h3>
              <p class="tech-confirm-summary">${$r(e.summary)}</p>
            </div>
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
    `}renderRequirementsDialog(e,t,n,s){const r=e.tier===3?"Age III · Capstone":`Age ${Hn[e.tier]}`;return`
      <div class="tech-confirm-scrim" data-confirm-scrim role="alertdialog" aria-modal="true" aria-label="Technology Requirements">
        <div class="tech-confirm-card tech-requirements-card">
          <div class="tech-confirm-top">
            <div class="tech-confirm-thumb" aria-hidden="true">${this.renderTechDialogIcon(e,n)}</div>
            <div class="tech-confirm-copy">
              <div class="tech-confirm-kicker">${Fn(e.pillar)} &middot; ${r}</div>
              <h3 class="tech-confirm-title">${Fn(e.name)}</h3>
              <p class="tech-confirm-summary">${$r(e.summary)}</p>
            </div>
          </div>
          <div class="tech-requirements-reason">
            ${se("lock","icon icon-sm")}
            <span>${$r(s)}</span>
          </div>
          <div class="tech-confirm-cost-row">
            <span class="tech-confirm-cost-label">Cost</span>
            <span class="tech-confirm-cost-val">
              <strong>${t}${se("star","icon icon-sm icon-star")}</strong>
              <span class="tech-confirm-balance">(You have ${n.gold}${se("star","icon icon-xs icon-star")})</span>
            </span>
          </div>
          <div class="tech-confirm-actions is-single">
            <button type="button" class="btn btn-primary tech-confirm-ok" data-confirm-cancel>
              OK
            </button>
          </div>
        </div>
      </div>
    `}renderPillar(e,t,n,s,r,a,o){const{root:l,branchA:c,branchB:d,capstone:u}=e,h=l?`<div class="tech-tree-row-center">${this.renderTechCard(l,t(l),n,s,r,a,"wide",o)}</div>`:"",f=this.renderForkConnector(l,c,d,r),m=`
      <div class="tech-tree-row-split">
        ${c?this.renderTechCard(c,t(c),n,s,r,a,"branch",o):'<div class="tech-slot-empty"></div>'}
        ${d?this.renderTechCard(d,t(d),n,s,r,a,"branch",o):'<div class="tech-slot-empty"></div>'}
      </div>
    `,y=this.renderCapstoneConnector(c,d,u,r),g=u?`<div class="tech-tree-row-center">${this.renderTechCard(u,t(u),n,s,r,a,"wide",o)}</div>`:"";return`
      <section class="tech-pillar${e.index===this.activePillarIndex?" pillar-active":""}" data-pillar-index="${e.index}" aria-label="${Fn(e.name)} Pillar">
        <header class="tech-pillar-header">
          <span class="tech-branch-header">${Fn(e.name)}</span>
        </header>
        <div class="tech-pillar-tree">
          ${h}
          ${f}
          ${m}
          ${y}
          ${g}
        </div>
      </section>
    `}renderForkConnector(e,t,n,s){const r=!!(e&&s.has(e.id)),a=!!(r&&t&&s.has(t.id)),o=!!(r&&n&&s.has(n.id)),d=[{d:"M 100 0 L 100 10 L 49 10 L 49 22",state:a?"done":r?"unlocked":"locked",rank:a?2:r?1:0},{d:"M 100 0 L 100 10 L 151 10 L 151 22",state:o?"done":r?"unlocked":"locked",rank:o?2:r?1:0}].sort((h,f)=>h.rank-f.rank),u=a||o?"done":r?"unlocked":"locked";return`
      <div class="tech-svg-connector tech-fork-connector" aria-hidden="true">
        <svg viewBox="0 0 200 22" preserveAspectRatio="none" focusable="false">
          ${d.map(h=>`<path class="tech-link ${h.state}" d="${h.d}" vector-effect="non-scaling-stroke" />`).join("")}
          <circle class="tech-link-node ${u}" cx="100" cy="10" r="2.2" />
        </svg>
      </div>
    `}renderCapstoneConnector(e,t,n,s){if(!n)return"";const r=!!(e&&n.prerequisites.includes(e.id)),a=!!(t&&n.prerequisites.includes(t.id)),o=s.has(n.id),l=[];if(r&&e){const d=s.has(e.id),u=d&&o?"done":d?"unlocked":"locked";l.push({d:"M 49 0 L 49 11 L 100 11 L 100 22",state:u,rank:u==="done"?2:u==="unlocked"?1:0,nodeX:49})}if(a&&t){const d=s.has(t.id),u=d&&o?"done":d?"unlocked":"locked";l.push({d:"M 151 0 L 151 11 L 100 11 L 100 22",state:u,rank:u==="done"?2:u==="unlocked"?1:0,nodeX:151})}if(l.length===0){const d=no(n,s),u=d&&o?"done":d?"unlocked":"locked";l.push({d:"M 100 0 L 100 22",state:u,rank:u==="done"?2:u==="unlocked"?1:0,nodeX:100})}l.sort((d,u)=>d.rank-u.rank);const c=l[l.length-1].state;return`
      <div class="tech-svg-connector tech-capstone-connector" aria-hidden="true">
        <svg viewBox="0 0 200 22" preserveAspectRatio="none" focusable="false">
          ${l.map(d=>`<path class="tech-link ${d.state}" d="${d.d}" vector-effect="non-scaling-stroke" />`).join("")}
          <circle class="tech-link-node ${c}" cx="100" cy="11" r="2.2" />
        </svg>
      </div>
    `}renderTechCard(e,t,n,s,r,a,o,l){const c=r.has(e.id),d=!!(l&&e.id===l),u=!!(l&&e.id!==l),h=!c&&e.tier>s,f=e.prerequisites.filter(z=>!r.has(z)),m=f.length===0,y=n.gold>=t,g=!c&&!u&&!h&&m&&y&&a,p=Math.max(0,t-n.gold),v=f.map(z=>kt[z]?.name??z);let w="locked",_="locked",M=`${se("lock","icon icon-xs")}<span>${t}</span>${se("star","icon icon-xs")}`,b="";if(c)w="researched",_="researched",M=`${se("check","icon icon-xs")}<span>Done</span>`;else if(h){w="locked age-locked",_="locked";const z=Math.max(1,vr[e.tier]-n.techs.length);b=`<div class="tech-status-note is-age-locked">${se("lock","icon icon-xs")}<span>Age ${Hn[e.tier]} &middot; ${z} more</span></div>`}else m?y&&a?(w="available affordable",_="affordable",M=`<span>${t}</span>${se("star","icon icon-xs")}`):(w="available unaffordable",_="unaffordable",M=`<span>${t}</span>${se("star","icon icon-xs")}`,b=a?`<div class="tech-status-note">Need ${p}${se("star","icon icon-xs icon-star")}</div>`:'<div class="tech-status-note">Rival turn</div>'):v.length>0&&(b=`<div class="tech-status-note">${se("lock","icon icon-xs")}<span>${Fn(v.join(" + "))}</span></div>`);const T=Cc(e),E=Eo(T,n.faction,"thumb-3d thumb-tech",e.name),S=e.unlocksUnits.length>0?wr(e.unlocksUnits[0],"icon icon-lg"):e.unlocksImprovements.length>0?se("tower","icon icon-lg"):e.unlocksResources.length>0?se("leaf","icon icon-lg"):e.tier===3?se("crown","icon icon-lg"):se("codex","icon icon-lg"),x=`<div class="tech-thumb-box" aria-hidden="true">${E||S}</div>`,A=e.tier===3?`${se("crown","icon icon-xs icon-star")}<span>Age III &middot; Capstone</span>`:`<span>Age ${Hn[e.tier]}</span>`,P=d?'<span class="tech-tutorial-badge">TUTORIAL</span>':"",I=d?" is-tutorial-target":u?" is-tutorial-locked":"",F=`tier-${e.tier}${e.slot==="capstone"?" is-capstone":""}`,N=`tech-card--${o}`,Y=o==="wide"?`
          <div class="tech-card-body">
            ${x}
            <div class="tech-card-main">
              <div class="tech-card-head">
                <div class="tech-card-titles">
                  <div class="tech-tier-tag">${A}${P}</div>
                  <div class="tech-name">${Fn(e.name)}</div>
                </div>
                <span class="tech-status-pill ${_}">${M}</span>
              </div>
              <p class="tech-summary">${$r(e.summary)}</p>
              ${b}
            </div>
          </div>
        `:`
          <div class="tech-card-branch-top">
            ${x}
            <div class="tech-card-branch-meta">
              <div class="tech-tier-tag">${A}${P}</div>
              <span class="tech-status-pill ${_}">${M}</span>
            </div>
          </div>
          <div class="tech-name">${Fn(e.name)}</div>
          <p class="tech-summary">${$r(e.summary)}</p>
          ${b}
        `;if(c)return`<div class="tech-card ${N} ${F} ${w}${I}">${Y}</div>`;const U=this.pendingTechId===e.id;return`
      <button
        type="button"
        class="tech-card ${N} ${F} ${w}${I} ${U?"is-pending":""}"
        data-research-tech="${e.id}"
        ${g?"":"disabled"}
      >
        ${Y}
      </button>
    `}bindEvents(){this.root.querySelector('[data-action="close"]')?.addEventListener("click",()=>{this.close()}),this.root.querySelectorAll("[data-research-tech]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.researchTech;c&&!l.disabled&&this.lastVm&&(this.pendingTechId=c,this.blockedTechId=null,this.render(this.lastVm),this.restoreCarouselPosition(!1))})}),this.root.querySelector("[data-confirm-scrim]")?.addEventListener("click",l=>{l.target===l.currentTarget&&this.dismissSubDialog()}),this.root.querySelector("[data-confirm-cancel]")?.addEventListener("click",()=>{this.dismissSubDialog()}),this.root.querySelector("[data-confirm-research]")?.addEventListener("click",l=>{const d=l.currentTarget.dataset.confirmResearch;d&&(this.pendingTechId=null,this.blockedTechId=null,this.callbacks.onResearch(d))});const e=this.root.querySelector(".tech-modal-panel"),t=this.root.querySelector(".tech-carousel"),n=Array.from(this.root.querySelectorAll("[data-pillar-jump]")),s=this.root.querySelector("[data-carousel-prev]"),r=this.root.querySelector("[data-carousel-next]"),a=l=>{this.activePillarIndex=l,n.forEach((c,d)=>{const u=d===l;c.classList.toggle("active",u),c.setAttribute("aria-selected",String(u))}),s&&(s.disabled=l<=0),r&&(r.disabled=l>=Math.max(0,n.length-1)),this.root.querySelectorAll(".tech-pillar").forEach(c=>{c.classList.toggle("pillar-active",Number(c.dataset.pillarIndex)===l)})},o=(l,c)=>{const d=Math.max(0,n.length-1),u=Math.max(0,Math.min(d,l));a(u),this.restoreCarouselPosition(c)};if(n.forEach(l=>{l.addEventListener("click",()=>{const c=Number(l.dataset.pillarJump);Number.isNaN(c)||o(c,!0)})}),s?.addEventListener("click",()=>{this.activePillarIndex>0&&o(this.activePillarIndex-1,!0)}),r?.addEventListener("click",()=>{const l=Math.max(0,n.length-1);this.activePillarIndex<l&&o(this.activePillarIndex+1,!0)}),t){let l=0,c=0,d=0,u=0,h=0,f=!1;t.addEventListener("touchstart",y=>{if(y.touches.length!==1||this.pendingTechId||this.blockedTechId){f=!1;return}const g=y.touches[0];l=g.clientX,c=g.clientY,d=g.clientX,u=g.clientY,h=Date.now(),f=!0},{passive:!0}),t.addEventListener("touchmove",y=>{if(!f||y.touches.length!==1)return;const g=y.touches[0];d=g.clientX,u=g.clientY},{passive:!0}),t.addEventListener("touchend",()=>{if(!f)return;f=!1;const y=d-l,g=u-c;if(Date.now()-h<900&&Math.abs(y)>40&&Math.abs(y)>Math.abs(g)*1.2){const v=y<0?1:-1,w=Math.max(0,n.length-1),_=Math.max(0,Math.min(w,this.activePillarIndex+v));_!==this.activePillarIndex&&o(_,!0)}},{passive:!0}),t.addEventListener("touchcancel",()=>{f=!1},{passive:!0}),t.addEventListener("wheel",y=>{t.scrollWidth<=t.clientWidth+2||Math.abs(y.deltaY)>Math.abs(y.deltaX)&&y.deltaY!==0&&(y.preventDefault(),t.scrollLeft+=y.deltaY)},{passive:!1});let m=null;t.addEventListener("scroll",()=>{m===null&&(m=window.requestAnimationFrame(()=>{m=null;const y=Array.from(t.querySelectorAll(".tech-pillar"));if(y.length===0)return;const g=t.scrollLeft+t.clientWidth*.5;let p=0,v=1/0;y.forEach((w,_)=>{const M=w.offsetLeft+w.offsetWidth*.5,b=Math.abs(M-g);b<v&&(v=b,p=_)}),p!==this.activePillarIndex&&a(p)}))},{passive:!0})}if(e){let l=0,c=0,d=0,u=0,h=!1,f=!1,m="none";const y=M=>{if(this.pendingTechId||this.blockedTechId)return!1;if((M instanceof HTMLElement?M:null)?.closest(".sheet-handle, .modal-header"))return!0;const T=e.scrollTop<=0,E=!t||t.scrollTop<=0;return T&&E},g=M=>{const b=Math.max(0,Math.round(M));d=b,e.classList.add("is-dragging"),e.style.setProperty("--sheet-drag-y",`${b}px`),e.style.transform=`translateY(${b}px)`},p=M=>{e.classList.remove("is-dragging"),e.style.removeProperty("--sheet-drag-y"),M?(e.classList.add("is-snapping-back"),e.style.transform="translateY(0px)",window.setTimeout(()=>{e.classList.remove("is-snapping-back"),e.style.transform=""},200)):(e.classList.remove("is-snapping-back"),e.style.transform="")},v=()=>{if(!f){h=!1,m="none";return}const M=d,b=Math.max(1,Date.now()-u),T=M/b;f=!1,h=!1,m="none",d=0,M>85||M>36&&T>.55?(p(!1),this.close()):p(!0)};e.addEventListener("touchstart",M=>{if(M.touches.length!==1||!y(M.target)){h=!1;return}const b=M.touches[0];l=b.clientX,c=b.clientY,d=0,u=Date.now(),h=!0,f=!1,m="none"},{passive:!0}),e.addEventListener("touchmove",M=>{if(!h||M.touches.length!==1)return;const b=M.touches[0],T=b.clientX-l,E=b.clientY-c;if(m==="none"){if(Math.abs(T)<8&&Math.abs(E)<8)return;if(E>0&&Math.abs(E)>Math.abs(T)*1.25)m="vertical",f=!0;else{m="horizontal",h=!1;return}}f&&(M.preventDefault(),g(Math.max(0,E)))},{passive:!1}),e.addEventListener("touchend",v,{passive:!0}),e.addEventListener("touchcancel",()=>{f?(f=!1,h=!1,m="none",d=0,p(!0)):(h=!1,m="none")});let w=null;e.addEventListener("pointerdown",M=>{if(M.pointerType!=="mouse"||M.button!==0)return;const b=M.target instanceof HTMLElement?M.target:null;if(!(!b?.closest(".sheet-handle, .modal-header")||b.closest("button"))&&!(this.pendingTechId||this.blockedTechId)){w=M.pointerId,l=M.clientX,c=M.clientY,d=0,u=Date.now(),h=!0,f=!1,m="none";try{e.setPointerCapture(M.pointerId)}catch{}}}),e.addEventListener("pointermove",M=>{if(w===null||M.pointerId!==w)return;const b=M.clientX-l,T=M.clientY-c;if(m==="none"){if(Math.abs(b)<6&&Math.abs(T)<6)return;if(T>0&&Math.abs(T)>Math.abs(b)*1.25)m="vertical",f=!0;else{m="horizontal",w=null,h=!1;return}}f&&g(Math.max(0,T))});const _=M=>{if(!(w===null||M.pointerId!==w)){w=null;try{e.releasePointerCapture(M.pointerId)}catch{}v()}};e.addEventListener("pointerup",_),e.addEventListener("pointercancel",_)}}restoreCarouselPosition(e){const t=this.root.querySelector("[data-tech-carousel]");if(!t||t.scrollWidth<=t.clientWidth+2)return;const n=t.querySelector(`.tech-pillar[data-pillar-index="${this.activePillarIndex}"]`);n&&t.scrollTo({left:Math.max(0,n.offsetLeft-t.offsetLeft),behavior:e?"smooth":"auto"})}}function Rl(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function C2(i,e){if(i===2)return[{choice:"workshop",icon:"anvil",name:"Workshop",highlight:"+1★ / Turn"},{choice:"explorer",icon:"compass",name:"Scout",highlight:"Reveals 10 Fog Tiles"}];if(i===3)return[{choice:"city_wall",icon:"shield",name:"City Walls",highlight:"2.0x Defense"},{choice:"resources",icon:"star",name:"Coffers",highlight:"+5★ Now"}];if(i===4)return[{choice:"border_growth",icon:"banner",name:"Borders",highlight:"Expand to 5×5"},{choice:"pop_growth",icon:"wheat",name:"Harvest",highlight:"+3 Population"}];const t=dt[e],n=mt[t.uniqueUnit];return[{choice:"champion",icon:"crown",name:`${n.name}`,highlight:`Free Veteran (${n.maxHp+5} HP)`},{choice:"park",icon:"tree",name:"Grand Park",highlight:"+250 Glory & +1★/Turn"}]}class I2{root;callbacks;openState=!1;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop reward-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","City Level-Up Decree"),e.appendChild(this.root)}isOpen(){return this.openState}open(e){this.openState=!0,this.root.classList.toggle("has-alderwick",!!e.tutorialMode),this.render(e),this.root.classList.remove("hidden")}close(){this.openState=!1,this.root.classList.remove("has-alderwick"),this.root.classList.add("hidden")}destroy(){this.root.remove()}render(e){const t=C2(e.levelReached,e.faction),n=e.city.id,s=!!e.tutorialMode,r=t.map(o=>{const l=s&&o.choice==="workshop";return`
          <button type="button" class="reward-card${l?" is-tutorial-recommended":""}" data-reward="${o.choice}">
            ${l?'<span class="reward-rec-badge">Recommended</span>':""}
            <div class="reward-icon" aria-hidden="true">${se(o.icon,"icon icon-xl")}</div>
            <div class="reward-name">${Rl(o.name)}</div>
            <div class="reward-highlight">${Rl(o.highlight)}</div>
          </button>
        `}).join(""),a=`
      <div class="modal-panel reward-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="reward-level-banner">
          ${se("crown","icon icon-sm")}
          <span>Level ${e.levelReached}</span>
        </div>
        <h2 class="modal-title" style="justify-content: center;">${Rl(e.city.name)}</h2>

        <div class="reward-choices">
          ${r}
        </div>
      </div>
    `;if(s){const o=ko({pose:"idea",variant:"compact",extraClass:"reward-alderwick-scene",headerHtml:`
          <span class="tutorial-icon-badge" aria-hidden="true">${se("crown","icon icon-xs")}</span>
          <strong class="tutorial-title">Level ${e.levelReached} City Reward!</strong>
        `,bodyHtml:`
          <p class="tutorial-body">Your capital leveled up! Pick a bonus: <strong>Workshop</strong> grants +1★ every turn, while <strong>Scout</strong> reveals nearby Fog. Pick <strong>Workshop</strong> to fuel your start!</p>
        `});this.root.innerHTML=`
        <div class="reward-modal-stack">
          ${o}
          ${a}
        </div>
      `}else this.root.innerHTML=a;this.root.querySelectorAll("[data-reward]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.reward;l&&(this.close(),this.callbacks.onChoose(n,l))})})}}function di(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class P2{root;callbacks;openState=!1;humanDefeatedMode=!1;humanVictorMode=!1;pendingResolve=null;onKeyDown;constructor(e,t={}){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop defeat-notice-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Faction Defeated"),e.appendChild(this.root),this.root.addEventListener("click",n=>{n.target===this.root&&this.openState&&this.close()}),this.onKeyDown=n=>{this.openState&&n.key==="Escape"&&(n.preventDefault(),this.close())},window.addEventListener("keydown",this.onKeyDown)}isOpen(){return this.openState}isHumanDefeated(){return this.openState&&this.humanDefeatedMode}isHumanVictor(){return this.openState&&this.humanVictorMode}show(e,t,n=!1,s=!1){(this.pendingResolve||this.openState)&&this.close(!0);const r=s&&!n;this.openState=!0,this.humanDefeatedMode=n,this.humanVictorMode=r,this.root.setAttribute("data-human-defeated",String(n)),this.root.setAttribute("data-human-victor",String(r)),this.render(e,t,n,r),this.root.classList.remove("hidden");const a=this.root.querySelector('[data-action="continue"]');return window.requestAnimationFrame(()=>{a?.focus()}),new Promise(o=>{this.pendingResolve=o})}close(e=!1){if(!this.openState&&!this.pendingResolve)return;const t=this.openState,n=this.humanDefeatedMode;this.openState=!1,this.humanDefeatedMode=!1,this.humanVictorMode=!1,this.root.classList.add("hidden"),this.root.removeAttribute("data-human-defeated"),this.root.removeAttribute("data-human-victor");const s=this.pendingResolve;this.pendingResolve=null,s?.(),t&&!e&&this.callbacks.onClose?.(n)}destroy(){window.removeEventListener("keydown",this.onKeyDown),this.close(!0),this.root.remove()}render(e,t,n,s){const r=dt[e],a=dt[t],o=fn[e],l=fn[t];if(s&&!n){const d=hp(e);this.root.className="alderwick-stage-backdrop defeat-notice-modal is-human-victory",this.root.setAttribute("aria-label",`${r.name} Defeated — ${xs} congratulates you`),this.root.innerHTML=ko({pose:"cheer",variant:"stage",extraClass:"is-rival-congrats",headerHtml:`
          <span class="rival-congrats-crest" style="background: ${o};" aria-hidden="true">
            ${In(e,"icon")}
          </span>
          <strong class="rival-congrats-title">${di(d.kicker)}</strong>
          <span class="rival-congrats-badge">
            ${se("crown","icon icon-xs")}
            <span>Rival Fallen</span>
          </span>
        `,bodyHtml:`
          <p class="alderwick-bubble-lead">${di(d.lead)}</p>
          <p>${di(d.body)}</p>
          <p class="alderwick-bubble-signoff">${di(d.signoff)}</p>
        `,actionsHtml:`
          <button type="button" class="btn btn-cta alderwick-bubble-cta" data-action="continue">
            <span>Onward!</span>
            ${se("chevronRight","icon icon-sm")}
          </button>
        `}),this.root.querySelector('[data-action="continue"]')?.addEventListener("click",()=>{this.close()});return}const c=fp(e,t,n);this.root.className="modal-backdrop defeat-notice-modal",this.root.setAttribute("aria-label","Faction Defeated"),this.root.innerHTML=`
      <div
        class="modal-panel defeat-notice-panel"
        style="--defeated-color: ${o}; --victor-color: ${l};"
      >
        <div class="defeat-notice-kicker">
          ${se("skull","icon icon-sm")}
          <span>Realm Fallen</span>
        </div>

        <div class="defeat-notice-crests" aria-hidden="true">
          <div class="defeat-crest-side is-fallen">
            <div class="defeat-crest-ring fallen" style="background: ${o};">
              ${In(e,"icon defeat-crest-svg")}
              <span class="defeat-crest-badge fallen">${se("skull","icon icon-xs")}</span>
            </div>
            <span class="defeat-crest-label">${di(r.name)}</span>
          </div>

          <div class="defeat-notice-divider">
            ${se("swords","icon icon-lg")}
          </div>

          <div class="defeat-crest-side is-victor">
            <div class="defeat-crest-ring victor" style="background: ${l};">
              ${In(t,"icon defeat-crest-svg")}
              <span class="defeat-crest-badge victor">${se("crown","icon icon-xs")}</span>
            </div>
            <span class="defeat-crest-label">${di(a.name)}</span>
          </div>
        </div>

        <h2 class="defeat-notice-headline">
          ${di(r.name)} Fell to ${di(a.name)}
        </h2>
        <p class="defeat-notice-subline">
          ${di(r.realm)}’s final stronghold has fallen.
        </p>

        <div class="chronicle-alderwick-card is-notice">
          <span class="chronicle-alderwick-avatar is-sm">
            <img
              src="${ip.portrait}"
              alt="${xs}"
              width="44"
              height="44"
              draggable="false"
            />
          </span>
          <div class="chronicle-alderwick-copy">
            <span class="chronicle-alderwick-speaker">
              ${se("star","icon icon-xs icon-star")}
              <span>${xs}</span>
            </span>
            <p class="chronicle-alderwick-quote">“${di(c)}”</p>
          </div>
        </div>

        <button type="button" class="btn btn-cta defeat-notice-btn" data-action="continue">
          <span>${n?"Return to Main Menu":"Continue"}</span>
          ${se("chevronRight","icon icon-sm")}
        </button>
      </div>
    `,this.root.querySelector('[data-action="continue"]')?.addEventListener("click",()=>{this.close()})}}function Bn(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Cl(i){return Bn(i).replace(/★/g,se("star","icon icon-sm icon-star"))}class k2{root;callbacks;openState=!1;activeFaction="humans";lastVm=null;onKeyDown;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop dossier-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Faction Abilities Dossier"),e.appendChild(this.root),this.root.addEventListener("click",n=>{n.target===this.root&&this.close()}),this.onKeyDown=n=>{n.key==="Escape"&&this.openState&&(this.callbacks.onBack?this.callbacks.onBack():this.close())},window.addEventListener("keydown",this.onKeyDown)}isOpen(){return this.openState}open(e,t){this.lastVm=e,this.activeFaction=t??e.humanPlayer.faction,this.openState=!0,this.render(),this.root.classList.remove("hidden")}update(e){this.lastVm=e,this.openState&&this.render()}close(){this.openState&&(this.openState=!1,this.root.classList.add("hidden"),this.callbacks.onClose())}destroy(){window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}render(){const e=this.lastVm;if(!e)return;const t=this.activeFaction,n=t===e.humanPlayer.faction,s=dt[t],r=mt[s.uniqueUnit],a=kt[s.startingTech],o=fn[t],l=e.allPlayers.find(p=>p.faction===t)??null,c=an.map(p=>{const v=dt[p],w=fn[p],_=p===t,M=e.allPlayers.find(T=>T.faction===p),b=M?!M.alive:!1;return`
        <button
          type="button"
          class="dossier-tab ${_?"active":""} ${b?"eliminated":""}"
          data-dossier-faction="${p}"
          style="--tab-heraldry: ${w};"
          aria-selected="${_}"
        >
          <span class="dossier-tab-crest" style="background: ${w};">
            ${In(p,"icon icon-crest-sm")}
          </span>
          <span class="dossier-tab-name">${Bn(v.name)}</span>
        </button>
      `}).join(""),d=Ao(r.type,t,wr(r.type,"icon icon-xl"),"thumb-3d thumb-dossier-unit"),u=r.traits.map(p=>`<span class="trait-pill">${Bn(p)}</span>`).join(""),h=mi(t);let f="Active Passives",m="";if(n){const p=new Set(e.humanPlayer.techs),v=h.filter(w=>p.has(w.id));f=`Active Passives (${v.length}/${h.length})`,v.length===0?m='<p class="dossier-empty-note">None yet — research lore in the Codex.</p>':m=`
          <ul class="dossier-passive-list">
            ${v.map(w=>`
                  <li class="dossier-passive-item ${w.tier===3?"is-capstone":""}">
                    <span class="dossier-passive-head">
                      <span class="dossier-passive-name">
                        ${w.tier===3?se("crown","icon icon-sm icon-star"):se("check","icon icon-sm")}
                        <span>${Bn(w.name)}</span>
                      </span>
                      <span class="dossier-passive-pillar">${Bn(w.pillar)}</span>
                    </span>
                    <span class="dossier-passive-summary">${Cl(w.summary)}</span>
                  </li>
                `).join("")}
          </ul>
        `}else{const p=h.filter(v=>v.tier===3);f=`Realm Capstones (${p.length})`,m=`
        <ul class="dossier-passive-list">
          ${p.map(v=>`
                <li class="dossier-passive-item is-capstone">
                  <span class="dossier-passive-head">
                    <span class="dossier-passive-name">
                      ${se("crown","icon icon-sm icon-star")}
                      <span>${Bn(v.name)}</span>
                    </span>
                    <span class="dossier-passive-pillar">${Bn(v.pillar)}</span>
                  </span>
                  <span class="dossier-passive-summary">${Cl(v.summary)}</span>
                </li>
              `).join("")}
        </ul>
      `}const y=l?l.alive?`${l.score.toLocaleString()} Glory`:`Fallen (T${l.eliminatedOnTurn??"?"})`:"",g=this.callbacks.onBack?`
        <button type="button" class="btn btn-secondary dossier-back-btn" data-action="back" aria-label="Back to Standings">
          <span>&larr; Scores</span>
        </button>
      `:"";this.root.innerHTML=`
      <div class="modal-panel dossier-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="modal-header">
          <div class="modal-title-wrap">
            ${g}
            <h2 class="modal-title">
              <span class="faction-crest-badge" style="background: ${o}; width: 28px; height: 28px;">
                ${In(t,"icon icon-crest-sm")}
              </span>
              <span>${Bn(s.realm)}</span>
            </h2>
            <span class="modal-subtitle">
              <span>${Bn(a.name)}</span>
              ${y?`<span>&middot;</span><span>${Bn(y)}</span>`:""}
            </span>
          </div>
          <button type="button" class="btn btn-icon modal-close-btn" data-action="close" aria-label="Close Faction Dossier">
            ${se("close","icon")}
          </button>
        </div>

        <div class="dossier-tabs" role="tablist" aria-label="Inspect Factions">
          ${c}
        </div>

        <div class="dossier-body">
          <div class="dossier-section">
            <div class="dossier-kicker">Trait</div>
            <div class="dossier-mechanic-title">${Bn(s.uniqueMechanicName)}</div>
            <p class="dossier-mechanic-desc">${Cl(s.uniqueMechanicDescription)}</p>
          </div>

          <div class="dossier-section">
            <div class="dossier-kicker">Champion</div>
            <div class="dossier-unit-row">
              <div class="dossier-unit-thumb-frame">${d}</div>
              <div class="dossier-unit-info">
                <div class="dossier-unit-head">
                  <span class="dossier-unit-name">${Bn(r.name)}</span>
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
            <div class="dossier-kicker">${Bn(f)}</div>
            ${m}
          </div>
        </div>
      </div>
    `,this.root.querySelector('[data-action="back"]')?.addEventListener("click",()=>{this.callbacks.onBack?.()}),this.root.querySelector('[data-action="close"]')?.addEventListener("click",()=>{this.close()}),this.root.querySelectorAll("[data-dossier-faction]").forEach(p=>{p.addEventListener("click",()=>{const v=p.dataset.dossierFaction;v&&v!==this.activeFaction&&(this.activeFaction=v,this.render())})})}}function io(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class L2{root;callbacks;openState=!1;confirmingResign=!1;lastVm=null;onKeyDown;constructor(e,t){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop leaderboard-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Live Leaderboard"),e.appendChild(this.root),this.root.addEventListener("click",n=>{n.target===this.root&&this.close()}),this.onKeyDown=n=>{n.key==="Escape"&&this.openState&&this.close()},window.addEventListener("keydown",this.onKeyDown)}isOpen(){return this.openState}open(e){this.lastVm=e,this.confirmingResign=!1,this.openState=!0,this.render(),this.root.classList.remove("hidden")}update(e){this.lastVm=e,this.openState&&this.render()}close(){this.openState&&(this.openState=!1,this.confirmingResign=!1,this.root.classList.add("hidden"),this.callbacks.onClose())}destroy(){window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}render(){const e=this.lastVm;if(!e)return;const t=Math.max(1,...e.entries.map(a=>a.score)),n=e.entries.map(a=>{const o=dt[a.faction],l=fn[a.faction],c=Math.max(4,Math.min(100,Math.round(a.score/t*100))),d=`rank-${Math.min(4,Math.max(1,a.rank))}`,u=a.citiesCount===1?"1 City":`${a.citiesCount} Cities`,h=a.isEliminated?'<span class="lb-tag lb-tag-fallen">Fallen</span>':a.isHuman?'<span class="lb-tag lb-tag-you">You</span>':"";return`
          <button
            type="button"
            class="leaderboard-row is-clickable ${a.isHuman?"is-human":""} ${a.isEliminated?"is-eliminated":""}"
            data-lb-faction="${a.faction}"
            style="--lb-heraldry: ${l};"
            aria-label="Inspect ${io(o.name)} — Rank ${a.rank}, ${io(u)}, ${a.score} Glory"
          >
            <div class="leaderboard-row-top">
              <div class="leaderboard-identity">
                <span class="lb-rank-badge ${d}" aria-label="Rank ${a.rank}">#${a.rank}</span>
                <span class="faction-crest-badge lb-crest-badge" style="background: ${l};">
                  ${In(a.faction,"icon icon-crest-sm")}
                </span>
                <div class="lb-name-block">
                  <div class="lb-name-line">
                    <span class="lb-faction-name">${io(o.name)}</span>
                    ${h}
                  </div>
                  <div class="lb-cities-stat">
                    ${se("tower","icon icon-xs")}
                    <span>${io(u)}</span>
                  </div>
                </div>
              </div>

              <div class="leaderboard-right-group">
                <div class="leaderboard-score-col">
                  <span class="lb-score-val">${a.score.toLocaleString()}</span>
                </div>
                <span class="lb-row-chevron" aria-hidden="true">${se("chevronRight","icon icon-sm")}</span>
              </div>
            </div>

            <div class="lb-progress-track" aria-hidden="true">
              <div class="lb-progress-fill" style="width: ${c}%; background: ${l};"></div>
            </div>
          </button>
        `}).join(""),s=`Age ${Hn[e.age??1]}`,r="Capture all capitals to win";this.root.innerHTML=`
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
    `,this.root.querySelector('[data-action="close"]')?.addEventListener("click",()=>{this.close()}),this.root.querySelector('[data-action="end-tutorial"]')?.addEventListener("click",()=>{this.callbacks.onEndTutorial?.()}),this.root.querySelector('[data-action="resign"]')?.addEventListener("click",()=>{this.confirmingResign=!0,this.render()}),this.root.querySelector('[data-action="resign-cancel"]')?.addEventListener("click",()=>{this.confirmingResign=!1,this.render()}),this.root.querySelector('[data-action="resign-confirm"]')?.addEventListener("click",()=>{this.close(),this.callbacks.onResign?.()}),this.root.querySelectorAll("[data-lb-faction]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.lbFaction;o&&this.callbacks.onSelectFaction?.(o)})})}}const As=999;function _n(i){const e=mt[i.type];if(e.movement===0)return(e.attack+e.defense)*.6*(i.hp/10);const t=e.range>1?1.15:1;return(e.attack+e.defense*.8)*t*(i.hp/10)}function D2(i,e,t){const n=new Uint8Array(i.tiles.length);for(let s=0;s<i.tiles.length;s++){if(!t[s]){n[s]=1;continue}const r=i.tiles[s];n[s]=r.terrain==="water"||r.terrain==="mountain"&&!e?0:1}return n}function so(i,e,t){const n=i.mapSize,s=new Int16Array(n*n).fill(As);if(t.length===0)return s;const r=new Int32Array(n*n);let a=0,o=0;for(const l of t)s[l]!==0&&(s[l]=0,r[o++]=l);for(;a<o;){const l=r[a++],c=l%n,d=(l-c)/n,u=s[l]+1;for(let h=-1;h<=1;h++){const f=d+h;if(!(f<0||f>=n))for(let m=-1;m<=1;m++){if(m===0&&h===0)continue;const y=c+m;if(y<0||y>=n)continue;const g=f*n+y;!e[g]||s[g]<=u||(s[g]=u,r[o++]=g)}}}return s}function U2(i,e){const t=mt[e.type],n=yr(i,e);if(t.movement===0||!Wt(i,e,"dash"))return n;let s=t.movement;return(i.eclipseTurnsRemaining??0)>0&&i.eclipseOwnerId===e.ownerId&&(s+=1),s+n}function O2(i,e){const t=i.mapSize,n=Array.from({length:t*t},()=>[]),s=e.enemyUnits;for(let r=0;r<s.length;r++){const a=s[r],o=U2(i,a),l=Math.max(0,a.y-o),c=Math.min(t-1,a.y+o),d=Math.max(0,a.x-o),u=Math.min(t-1,a.x+o);for(let h=l;h<=c;h++){const f=h*t;for(let m=d;m<=u;m++)m===a.x&&h===a.y||n[f+m].push(r)}}return n}function If(i,e,t,n){let s=1;if(t.terrain==="mountain"?s=n==="dwarves"?1.75:1.5:(t.terrain==="forest"||t.terrain==="ancient_woods")&&(s=1.5),t.isCityCenter&&t.cityId){const r=i.cities[t.cityId];r&&r.ownerId===e.ownerId&&(r.hasWalls?s=Math.max(s,2):Wt(i,e,"fortify")&&(s=Math.max(s,1.5)))}return s}function Pf(i,e,t,n,s,r=-1){const a=t.enemyReach[s];if(!a||a.length===0)return 0;const o=i.tiles[s],l=If(i,n,o,e.player.faction),c=Do(i,n)*(n.hp/n.maxHp)*l,d=Wt(i,n,"stalwart");let u=0,h=0,f=0;for(let m=0;m<a.length;m++){const y=a[m];if(r===y)continue;const g=t.enemyAtk[y],p=t.enemyForce[y];if(p+c<=0)continue;let v=Math.round(p/(p+c)*g*4.5);d&&t.enemyRanged[y]&&(v=Math.max(0,v-1)),v>=u?(f+=h,h=u,u=v):v>=h?(f+=h,h=v):f+=v}return u+h+f*.5}function kf(i){const e=Math.max(0,Math.min(1,i));return e*e*(3-2*e)}function sd(i,e){const t=kf((i-1)/Math.max(1,e.humanPressureRampTurns)),n=e.difficulty==="easy"?.1:e.difficulty==="normal"?.22:.3,s=e.difficulty==="easy"?.7:e.difficulty==="normal"?.9:1;return n+(s-n)*t}function N2(i,e){const t=kf((i-1)/Math.max(1,e.humanPressureRampTurns));return e.humanTargetBias+(e.humanTargetBiasMax-e.humanTargetBias)*t}const Qr=new Map;function Lf(i,e){return`${i.config.seed}|${i.mapSize}|${e}`}function F2(i,e){const t=Qr.get(Lf(i,e));if(!t)return{target:null,cityId:null};for(let n=t.history.length-1;n>=0;n--){const s=t.history[n];if(s.turn<i.turn&&s.turn>=i.turn-6&&s.target)return{target:s.target,cityId:s.cityId}}return{target:null,cityId:null}}function B2(i,e,t,n=null){const s=Lf(i,e);let r=Qr.get(s);r&&r.history.some(a=>a.turn>i.turn)&&(r=void 0),r||(Qr.size>4e3&&Qr.clear(),r={history:[]},Qr.set(s,r)),!r.history.some(a=>a.turn===i.turn)&&(r.history.push({turn:i.turn,target:t,cityId:n}),r.history.length>8&&r.history.shift())}function gh(i,e,t,n,s=!1){let r=0,a=0;const o={};let l=0;for(const f of e.ownUnits)f.homeCityId&&(o[f.homeCityId]=(o[f.homeCityId]??0)+1),mt[f.type].movement>0&&l++;for(const f of e.ownCities){const m=Rs(i,f),y=o[f.id]??0;r+=m,y<m&&a++}let c=0;for(const f of e.ownCities)c+=e.cityThreats[f.id]??0;const d=An(e.player)>=2?1:.75;let u=Math.round((1+e.ownCities.length*t.armyPerCity*d)*n.armyTargetMult+c*.8);s&&(u+=2),u=Math.min(Math.max(1,u),Math.max(1,r));const h=Math.max(0,u-l);return Math.min(h,Math.max(1,a))*3}function Df(i,e){const t=i.mapSize,n=O2(i,e),s=e.enemyUnits.length,r=new Float64Array(s),a=new Float64Array(s),o=new Uint8Array(s),l=new Float64Array(s);for(let u=0;u<s;u++){const h=e.enemyUnits[u];l[u]=_n(h);const f=Lo(i,h);r[u]=f,a[u]=f*(Wt(i,h,"bloodlust")?1:h.hp/h.maxHp),o[u]=mt[h.type].range>1?1:0}const c=new Float64Array(t*t);for(let u=0;u<n.length;u++){const h=n[u];let f=0;for(let m=0;m<h.length;m++)f+=l[h[m]];c[u]=f}const d={};for(const u of e.ownCities){let h=0,f=0,m=!1,y=!1;for(let p=0;p<s;p++){const v=e.enemyUnits[p],w=Math.max(Math.abs(v.x-u.x),Math.abs(v.y-u.y));w<=3&&(h+=l[p],f++),w===1&&(m=!0),w===0&&(y=!0)}let g=0;for(const p of e.ownUnits)Math.max(Math.abs(p.x-u.x),Math.abs(p.y-u.y))<=2&&(g+=_n(p));d[u.id]={cityId:u.id,enemyPower:h,enemyCount:f,ownPower:g,enemyAdjacent:m,enemyOnCenter:y}}return{enemyReach:n,enemyAtk:r,enemyForce:a,enemyRanged:o,enemyReachPower:c,threats:d}}function yh(i,e,t,n){const s=i.mapSize,r=e.player,a=D2(i,Dc(r),r.revealedTiles),o=[];for(const de of e.neutralVillages)o.push(Ve(de.x,de.y,s));for(const de of e.ruins)o.push(Ve(de.x,de.y,s));const l=so(i,a,o),c=[];if(e.revealedRatio<.999)for(let de=0;de<i.tiles.length;de++)r.revealedTiles[de]||c.push(de);const d=so(i,a,c),u=e.ownCities.map(de=>Ve(de.x,de.y,s)),h=so(i,a,u),{enemyReach:f,enemyAtk:m,enemyForce:y,enemyRanged:g,enemyReachPower:p,threats:v}=Df(i,e),w=new Float64Array(s*s);for(const de of e.ownUnits){const Ke=_n(de),Te=Math.max(0,de.y-2),St=Math.min(s-1,de.y+2),Ge=Math.max(0,de.x-2),k=Math.min(s-1,de.x+2);for(let R=Te;R<=St;R++){const K=R*s;for(let re=Ge;re<=k;re++)w[K+re]+=Ke}}let _=0;for(const de of e.ownUnits)_+=_n(de);let M=0,b=0,T=0;const E={},S={};let x=0;for(const de of e.ownUnits)de.homeCityId&&(S[de.homeCityId]=(S[de.homeCityId]??0)+1),mt[de.type].movement>0&&x++;for(const de of e.ownCities){const Ke=Rs(i,de),Te=S[de.id]??0;E[de.id]=Te<Ke,M+=Ke,b+=Math.min(Ke,Te),Te<Ke&&T++}const A={};for(const de of e.enemyUnits)A[de.ownerId]=(A[de.ownerId]??0)+_n(de);let P=null,I=null,F=-1/0;const N=F2(i,r.id),Y=N2(i.turn,n);for(const de of i.players){if(de.id===r.id||!de.alive)continue;const Ke=e.enemyCities.filter(me=>me.ownerId===de.id);if(Ke.length===0)continue;let Te=null,St=1/0;for(const me of Ke){const Me=h[Ve(me.x,me.y,s)];if(Me>=As)continue;let ot=0;for(const $e of e.enemyUnits){if($e.ownerId!==de.id)continue;const Ce=Math.max(Math.abs($e.x-me.x),Math.abs($e.y-me.y));Ce<=2&&(ot+=_n($e)*(Ce===0?1.4:1))}let ve=0;for(const $e of e.ownUnits)Math.max(Math.abs($e.x-me.x),Math.abs($e.y-me.y))<=4&&ve++;const ke=me.id===N.cityId?5.5:0,qe=Me+ot*.4+(me.hasWalls?2:0)-(me.isCapital?1:0)-ve*1.1-ke;qe<St&&(St=qe,Te=me)}if(!Te)continue;const Ge=A[de.id]??0;let k=0;for(const me of e.enemyUnits)if(me.ownerId===de.id){for(const Me of e.ownCities)if(Math.max(Math.abs(me.x-Me.x),Math.abs(me.y-Me.y))<=3){k++;break}}const R=14/(4+Math.max(0,St)*1.5),K=Math.min(1.35,Math.max(.55,Math.sqrt((_+3)/(Ge+4)))),re=1+Math.min(.45,k*.14);let le=R*R*K*re;const ne=i.players.filter(me=>me.alive&&me.id!==de.id),Be=ne.reduce((me,Me)=>me+Me.score,0)/Math.max(1,ne.length);de.score>Be*1.35&&i.turn>=14&&(!de.isHuman||n.gangUpOnHuman)&&(le*=1+Math.min(.35,(de.score/Math.max(1,Be)-1.35)*.7)),de.isHuman&&(le*=Y),de.id===N.target&&(le*=1.5+1.9*n.focusFire),le>F&&(F=le,P=de.id,I=Te)}const U=I?[Ve(I.x,I.y,s)]:[],z=so(i,a,U);let $=null;if(I){let de=1/0;for(const Ke of e.ownCities){const Te=z[Ve(Ke.x,Ke.y,s)];Te<de&&(de=Te,$=Ke)}}$??=e.ownCapital??e.ownCities[0]??null;let D=0;if(I){for(const de of e.enemyUnits){if(de.ownerId!==I.ownerId)continue;Math.max(Math.abs(de.x-I.x),Math.abs(de.y-I.y))<=3&&(D+=_n(de))}I.hasWalls&&(D*=1.3)}const q=t.aggressionTurn*n.aggressionDelay,Q=t.attackRatio*n.attackRatioMult;let te=0;for(const de of Object.values(v))te+=Math.max(0,de.enemyPower-de.ownPower*.5);const L=Math.max(0,_-te*.8),ce=!!(I?e.playerById.get(I.ownerId):void 0)?.isHuman,ae=sd(i.turn,n);let ye=!1;if(I){const de=M>0&&b>=M*.82,Ke=ce?Q/Math.max(.38,Y*(.65+.35*ae)):Q,Te=ce?q+(1-ae)*(n.difficulty==="easy"?7:3):q;ye=i.turn>=Te&&L>=Ke*D+3||de&&i.turn>=Te*.7&&L>=D*.85||D===0&&i.turn>=Te*.65&&L>=3}let he=0;if(I)for(const de of e.ownUnits)z[Ve(de.x,de.y,s)]<=5&&(he+=_n(de));const pe=ye&&he>=Math.max(6,D*1.35);let Ne=0;for(const de of Object.values(v))Ne+=de.enemyCount;const Xe=An(r)>=2?1:.75;let nt=Math.round((1+e.ownCities.length*t.armyPerCity*Xe)*n.armyTargetMult+Ne*.8);ye&&(nt+=2),nt=Math.min(Math.max(1,nt),Math.max(1,M));const O=Math.max(0,nt-x),dn=Math.min(O,Math.max(1,T))*3;return{size:s,distVillage:l,distTarget:z,distFog:d,distHome:h,enemyReach:f,enemyAtk:m,enemyForce:y,enemyRanged:g,enemyReachPower:p,friendPower:w,threats:v,warTargetId:P,targetCity:I,frontierCity:$,attacking:ye,strikeForce:he,overwhelming:pe,ownPower:_,targetPower:D,desiredArmy:nt,totalCap:M,usedCap:b,reserveGold:dn,roles:new Map,defendCity:new Map,cityHasRoom:E}}function Ic(i,e,t,n){const s=i.mapSize,r=t.roles,a=t.defendCity;r.clear(),a.clear();const o=[],l=(n?.dangerAwareness??1)>=.2;for(const h of e.ownUnits){if(mt[h.type].movement===0){r.set(h.id,"static");continue}if(l&&h.hp/h.maxHp<.4){r.set(h.id,"retreat");continue}o.push(h)}const c=e.ownCities.map(h=>({c:h,t:t.threats[h.id]})).filter(h=>h.t&&h.t.enemyPower>0).sort((h,f)=>f.t.enemyPower-h.t.enemyPower||(f.c.isCapital?1:0)-(h.c.isCapital?1:0));for(const{c:h,t:f}of c){let m=0;const y=f.enemyPower*(h.isCapital?1.2:.9),g=o.filter(p=>!r.has(p.id)&&Math.max(Math.abs(p.x-h.x),Math.abs(p.y-h.y))<=4).sort((p,v)=>Math.max(Math.abs(p.x-h.x),Math.abs(p.y-h.y))-Math.max(Math.abs(v.x-h.x),Math.abs(v.y-h.y)));for(const p of g){if(m>=y)break;r.set(p.id,"defend"),a.set(p.id,h),m+=_n(p)}}const d=e.neutralVillages.length+e.ruins.length;if(d>0){const h=i.turn<=25?9:6,f=o.filter(y=>!r.has(y.id)&&y.type!=="catapult").map(y=>({u:y,d:t.distVillage[Ve(y.x,y.y,s)]})).filter(y=>y.d<=h).sort((y,g)=>y.d-g.d);let m=0;for(const{u:y}of f){if(m>=d)break;r.set(y.id,"expand"),m++}}const u=e.enemyCities.length===0?2:e.revealedRatio<.45&&i.turn<=20?1:0;if(u>0){const h=o.filter(f=>!r.has(f.id)).sort((f,m)=>mt[m.type].movement-mt[f.type].movement);for(let f=0;f<Math.min(u,h.length);f++)r.set(h[f].id,"explore")}for(const h of o)r.has(h.id)||r.set(h.id,t.attacking&&t.targetCity?"attack":t.targetCity||e.enemyUnits.length>0?"hold":"explore")}function Uf(i,e,t){const n=i.mapSize;for(const s of e.ownCities){const r=t.threats[s.id];if(!r)continue;let a=0;for(const o of e.ownUnits)Math.max(Math.abs(o.x-s.x),Math.abs(o.y-s.y))<=2&&(a+=_n(o));r.ownPower=a}t.friendPower.fill(0);for(const s of e.ownUnits){const r=_n(s),a=Math.max(0,s.y-2),o=Math.min(n-1,s.y+2),l=Math.max(0,s.x-2),c=Math.min(n-1,s.x+2);for(let d=a;d<=o;d++){const u=d*n;for(let h=l;h<=c;h++)t.friendPower[u+h]+=r}}}function H2(i,e,t,n){const{enemyReach:s,enemyAtk:r,enemyForce:a,enemyRanged:o,enemyReachPower:l,threats:c}=Df(i,e);t.enemyReach=s,t.enemyAtk=r,t.enemyForce=a,t.enemyRanged=o,t.enemyReachPower=l,t.threats=c,Uf(i,e,t),Ic(i,e,t,n)}function Ht(i,e){return Math.max(Math.abs(i.x-e.x),Math.abs(i.y-e.y))}function Pc(i,e){let t=(i^Math.imul(e+1,2654435761))>>>0;return t=Math.imul(t^t>>>16,2246822507)>>>0,t=Math.imul(t^t>>>13,3266489909)>>>0,t=(t^t>>>16)>>>0,t/4294967296}function Ki(i,e,t){return t<=0?0:(Pc(i,e)*2-1)*t}function us(i,e){const t=new Map;let n=null;for(const w of i.players)t.set(w.id,w),w.isHuman&&(n=w.id);const s=t.get(e),r=[],a=[];let o=null,l=null;const c=i.mapSize,d=s.revealedTiles;for(const w of Object.values(i.cities))if(w.ownerId===e)r.push(w),w.isCapital&&(o=w);else{const _=Ve(w.x,w.y,c);d[_]&&(a.push(w),w.ownerId===n&&w.isCapital&&(l=w))}const u=[],h=[],f=new Map;for(const w of Object.values(i.units))if(w.ownerId===e)u.push(w);else{const _=Ve(w.x,w.y,c);d[_]&&(f.set(w.id,h.length),h.push(w))}const m=[],y=[];let g=0;for(let w=0;w<i.tiles.length;w++)if(d[w]){g++;const _=i.tiles[w];_.hasVillage&&!_.cityId&&m.push({x:_.x,y:_.y}),_.resource==="ruins"&&y.push({x:_.x,y:_.y})}const p={};let v=0;for(const w of r){let _=0;for(let M=0;M<h.length;M++){const b=h[M],T=Math.max(Math.abs(w.x-b.x),Math.abs(w.y-b.y));T<=3&&_++,T<=4&&v++}p[w.id]=_}return{player:s,playerById:t,ownCities:r,ownCapital:o,enemyCities:a,humanCapital:l,neutralVillages:m,ruins:y,ownUnits:u,enemyUnits:h,enemyIndexById:f,cityThreats:p,totalThreat:v,revealedRatio:g/Math.max(1,i.tiles.length)}}function z2(i,e,t,n,s,r){if(r?.simpleCityRewards)return t===2?"workshop":t===3?"resources":t===4?"pop_growth":"park";if(t===2)return n.revealedRatio<.22&&(s.faction==="orcs"||s.faction==="elves")?"explorer":"workshop";if(t===3){const l=(n.cityThreats[e.id]??0)>0,c=n.enemyCities.some(d=>Ht(d,e)<=6);return!e.hasWalls&&(l||c||e.isCapital||s.faction==="dwarves"||s.faction==="humans")?"city_wall":"resources"}if(t===4){let l=0;for(let c=-2;c<=2;c++)for(let d=-2;d<=2;d++){if(Math.abs(d)<=1&&Math.abs(c)<=1)continue;const u=_e(i,e.x+d,e.y+c);u&&n.player.revealedTiles[Ve(u.x,u.y,i.mapSize)]&&!u.cityId&&u.terrain!=="water"&&(u.resource||s.faction==="elves"&&u.terrain==="ancient_woods"||s.faction==="dwarves"&&u.terrain==="mountain")&&l++}return l>=2?"border_growth":"pop_growth"}if(i.config.maxTurns>0&&i.turn>=i.config.maxTurns-6)return"park";let o=!1;for(let l=-2;l<=2&&!o;l++)for(let c=-2;c<=2&&!o;c++){const d=_e(i,e.x+c,e.y+l);d&&d.unitId===null&&d.terrain!=="water"&&d.terrain!=="mountain"&&(o=!0)}return!o||n.ownUnits.length>=30&&e.parks===0?"park":"champion"}function G2(i,e,t,n,s){const r=kt[e],a=dt[n.player.faction];let o=16+(s.techBonuses[e]??0),l=0,c=0;for(const d of i.tiles){if(!d.cityId)continue;const u=i.cities[d.cityId];if(!(!u||u.ownerId!==n.player.id)&&(d.resource&&r.unlocksResources.includes(d.resource)&&l++,!d.improvement&&!d.isCityCenter)){for(const h of r.unlocksImprovements)if(Bi[h].allowedTerrains.includes(d.terrain)){c++;break}}}if(o+=l*13,o+=Math.min(c,4)*7,r.unlocksUnits.includes(a.uniqueUnit)?o+=32*s.uniqueUnitWeight:r.unlocksUnits.length>0&&(o+=18+(n.totalThreat>0?8:0)),r.unlocksMountainPass&&(o+=8),r.unlocksChopForest&&n.player.gold<6&&(o+=12),r.unlocksPlantWoods&&(o+=14),e==="elves_elven_lore"){const d=mi(n.player.faction).length-n.player.techs.length;o+=d*4}if(e==="humans_granaries"?o+=n.ownCities.filter(d=>d.level>=3).length*8:e==="humans_citadel_masonry"?o+=n.ownCities.filter(d=>d.hasWalls).length*7:e==="orcs_war_barracks"?o+=n.ownCities.length*7:e==="orcs_spoils_mastery"?o+=12+n.enemyUnits.length*3:e==="dwarves_stone_walls"?o+=n.ownCities.filter(d=>d.level>=2&&!d.hasWalls).length*8:e==="dwarves_runic_plate"&&(o+=n.ownUnits.length*4),r.tier===3)if(o+=20,e==="humans_stewards_citadel"||e==="dwarves_deep_vaults")o+=n.ownCities.length*7;else if(e==="humans_milling")o+=n.ownCities.length*5;else if(e==="humans_ride_of_rohirrim"||e==="orcs_pack_tactics"){const d=n.ownUnits.filter(u=>u.type==="rider"||u.type==="rohirrim_knight").length;o+=d*6}else e==="orcs_black_gate"?o+=n.ownUnits.length*4+10:e==="orcs_fell_volley"?o+=10+n.enemyUnits.length*3:e==="elves_lothlorien_sanctum"||e==="dwarves_heart_of_mountain"||e==="orcs_mount_doom"?o+=n.ownCities.length*6:e==="elves_galadhrim_precision"||e==="dwarves_mithril_phalanx"||e==="dwarves_dragon_slayers"||e==="humans_siegecraft"||e==="elves_wind_riders"?o+=n.ownUnits.length*4:e==="elves_rings_preservation"&&(o+=n.player.techs.length*4);return r.unlocksUnits.length>0&&n.ownUnits.length<=n.ownCities.length&&(o+=10),i.config.maxTurns>0&&i.turn>=i.config.maxTurns-6&&(o+=r.tier===3?36:r.tier===2?22:12,e==="elves_rings_preservation"&&(o+=n.player.techs.length*6)),o=o*s.techWeight-t*2.8,o}function V2(i,e,t,n){if(e.type==="HARVEST_TILE"){const s=_e(i,e.coord.x,e.coord.y);if(!s||!s.cityId)return-1;const r=i.cities[s.cityId];if(!r)return-1;let a=26*n.economyWeight;return r.population+1>=r.level+1&&(a+=45),a}if(e.type==="BUILD_IMPROVEMENT"){const s=_e(i,e.coord.x,e.coord.y);if(!s||!s.cityId)return-1;const r=i.cities[s.cityId];if(!r)return-1;const a=Bi[e.improvement];let o=a.basePop,l=0;if(a.adjacentBonusTo&&a.adjacentPopPerMatch){for(let u=-1;u<=1;u++)for(let h=-1;h<=1;h++){if(h===0&&u===0)continue;const f=_e(i,s.x+h,s.y+u);f&&f.improvement===a.adjacentBonusTo&&l++}o+=l*a.adjacentPopPerMatch}let c=a.goldPerTurn;if(e.improvement==="windmill"&&t.player.techs.includes("humans_milling")&&(c+=l),(e.improvement==="mine"||e.improvement==="great_forge")&&t.player.techs.includes("dwarves_heart_of_mountain")&&(c+=1),e.improvement==="foundry"&&t.player.techs.includes("orcs_mount_doom")&&(c+=1),e.improvement==="sanctuary"&&t.player.techs.includes("elves_lothlorien_sanctum")&&(c+=1),o===0&&c===0)return-10;let d=(16+o*14+c*24-a.cost*3)*n.economyWeight;return r.population+o>=r.level+1&&(d+=46),n.faction==="elves"&&e.improvement==="sanctuary"&&(d+=10),d}if(e.type==="BUILD_ROAD")return n.faction==="humans"?t.ownCities.some(r=>!r.isCapital&&!r.connectedToCapital)?32:12:6;if(e.type==="CHOP_FOREST")return t.player.gold<=5?24:4;if(e.type==="PLANT_ANCIENT_WOODS"){const s=_e(i,e.coord.x,e.coord.y),r=s?.cityId?i.cities[s.cityId]:null;let a=30*n.economyWeight;return r&&r.population+1>=r.level+1&&(a+=42),a}return-1}function Ro(i,e){const t=_e(i,e.x,e.y);if(!t)return!1;if(t.hasVillage&&!t.cityId)return!0;if(t.isCityCenter&&t.cityId){const n=i.cities[t.cityId];if(n&&n.ownerId!==e.ownerId)return!0}return!1}function rd(i,e){const t=_e(i,e.x,e.y);return t!==null&&t.resource==="ruins"}function W2(i,e,t){if(!gi(i,e.id))return-999;const n=_e(i,e.x,e.y);if(!n)return-999;let s=265;if(n.isCityCenter&&n.cityId){const r=i.cities[n.cityId];r&&r.ownerId!==e.ownerId&&(s+=r.isCapital?55:30)}return t.faction==="orcs"&&(s+=10),s}function $2(i,e,t){if(!yi(i,e.id))return-999;let n=245;return t.player.techs.includes("humans_hunting")&&(n+=10),n}function X2(i,e,t,n,s){const r=Lo(i,e),a=r*(Wt(i,e,"bloodlust")?1:e.hp/e.maxHp),o=_e(i,t.x,t.y),l=s.playerById.get(t.ownerId),c=o&&l?If(i,t,o,l.faction):1,d=Do(i,t)*(Math.max(0,n)/t.maxHp)*c;return a+d<=0?0:Math.round(a/(a+d)*r*4.5)}function q2(i,e,t){if(e.actedThisTurn||e.canEscapeMove||e.hasAttacked&&!e.canPersistAttack)return!1;const n=yr(i,e),s=Ht(e,t);return s<=n?!0:e.hasMoved||!Wt(i,e,"dash")?!1:s<=mt[e.type].movement+n}function Of(i,e){if(e.earlyHumanCapitalPressure>=1)return 1;const t=Math.max(0,Math.min(1,(i-1)/Math.max(1,e.humanPressureRampTurns*.6))),n=t*t*(3-2*t);return e.earlyHumanCapitalPressure+(1-e.earlyHumanCapitalPressure)*n}function Nf(i,e,t,n,s,r,a,o=!1){if(gi(i,e.id)||yi(i,e.id))return-999;const l=mo(i,e.id,t.id),c=_e(i,t.x,t.y);let d=(l.attackerDamage*5.5-l.retaliationDamage*4.4*s.selfPreservation)*s.attackWeight;(Ro(i,e)||rd(i,e))&&l.willAdvance&&(c?.isCityCenter&&c.cityId!==null&&i.cities[c.cityId]?.ownerId!==e.ownerId||(d-=Ro(i,e)?160:140));let u=l.defenderKilled;if(l.defenderKilled)d+=72+_n(t)*9,s.faction==="orcs"&&(d+=18),mt[e.type].traits.includes("persist")&&(d+=18);else if(r.focusFire>0){if(!o){const m=t.hp-l.attackerDamage;let y=0;for(let g=0;g<n.ownUnits.length;g++){const p=n.ownUnits[g];if(!(p.id===e.id||!q2(i,p,t))&&(y+=X2(i,p,t,m,n),y>=m)){u=!0;break}}u&&(d+=36*r.focusFire)}d+=(1-t.hp/t.maxHp)*16*r.focusFire}l.attackerKilled&&!l.defenderKilled?d-=80*s.selfPreservation+_n(e)*6:l.attackerKilled&&l.defenderKilled&&(d-=22*s.selfPreservation);let h=1/0;for(let m=0;m<n.ownCities.length;m++){const y=n.ownCities[m],g=Math.max(Math.abs(t.x-y.x),Math.abs(t.y-y.y));g<h&&(h=g)}if(h===0?d+=155:h===1?d+=42:h===2&&(d+=18),n.ownCapital&&Ht(t,n.ownCapital)<=2&&(d+=20),c?.isCityCenter&&c.cityId){const m=i.cities[c.cityId];m&&m.ownerId!==e.ownerId&&(d+=m.isCapital?50:36,a?.targetCity&&a.targetCity.id===m.id&&(d+=18),n.humanCapital&&m.id===n.humanCapital.id&&(d*=Of(i.turn,r)))}if(l.retaliationDamage===0&&l.attackerDamage>0&&(d+=20),a&&l.willAdvance){const m=Ve(t.x,t.y,i.mapSize),y=n.enemyIndexById.get(t.id)??-1;Pf(i,n,a,e,m,y)*.85>=e.hp&&(d-=28*s.selfPreservation*r.dangerAwareness)}if(!l.defenderKilled&&l.retaliationDamage>l.attackerDamage&&h>1&&!u){const m=.25+.75*r.dangerAwareness;d-=(32+(l.retaliationDamage-l.attackerDamage)*7*s.selfPreservation)*m}if(n.playerById.get(t.ownerId)?.isHuman&&h>2){const m=sd(i.turn,r);d*=.55+.45*m}return d}function Y2(i,e,t,n){let s=0;const r=i.mapSize,a=e.revealedTiles,o=Math.max(0,t.y-n),l=Math.min(r-1,t.y+n),c=Math.max(0,t.x-n),d=Math.min(r-1,t.x+n);for(let u=o;u<=l;u++){const h=u*r;for(let f=c;f<=d;f++)a[h+f]||s++}return s}function kc(i,e,t,n,s,r,a,o){const l=Pf(i,n,a,e,t);if(l<=0)return 0;const c=o==="attack"&&a.overwhelming,d=r.dangerAwareness*s.selfPreservation*(c?.28:o==="attack"||o==="defend"?.58:1);return l>=e.hp?(40+_n(e)*5)*d:28*(l/e.hp)*d}function Il(i,e,t,n){const s=i[e],r=i[t];return s>=As||r>=As?r<As?n*.5:0:(s-r)*n}function K2(i,e,t,n,s,r,a,o=0){const l=_e(i,t.x,t.y);if(!l||gi(i,e.id)||yi(i,e.id))return-999;const c=mt[e.type],d=i.mapSize,u=Ve(e.x,e.y,d),h=Ve(t.x,t.y,d),f=a?.roles.get(e.id)??"hold";let m=0;Ro(i,e)?m-=175:rd(i,e)&&(m-=150);let y=!1;if(l.isCityCenter&&l.cityId){const _=i.cities[l.cityId];if(_&&_.ownerId!==e.ownerId){y=!0;let M=_.isCapital?240:210;a?.targetCity&&a.targetCity.id===_.id&&(M+=30),s.faction==="orcs"&&(M+=20);const b=n.playerById.get(_.ownerId);if(b?.isHuman){const T=sd(i.turn,r),E=r.difficulty==="easy"&&a?.warTargetId!==b.id;M*=E?.25+.55*T:.45+.55*T,n.humanCapital&&_.id===n.humanCapital.id&&(M*=Of(i.turn,r))}m+=M}}else l.hasVillage&&!l.cityId&&(m+=110*s.expansionWeight+(s.faction==="orcs"?16:0));if(l.resource==="ruins"&&(m+=80*s.expansionWeight+(n.player.techs.includes("humans_hunting")?14:0)),n.revealedRatio<.999){let _=l.terrain==="mountain"?2:1;n.player.techs.includes("elves_keen_sight")&&(l.terrain==="forest"||l.terrain==="ancient_woods")&&(_=Math.max(_,2));const M=Y2(i,n.player,t,_),b=(i.turn<=10?1.35:.6)*(f==="explore"||f==="expand"?1.3:.45);m+=M*6.5*b*s.expansionWeight}if(!a)return m;const g=c.traits.includes("flying");switch(f){case"expand":m+=Il(a.distVillage,u,h,30*s.expansionWeight);break;case"explore":m+=Il(a.distFog,u,h,16);break;case"defend":{const _=a.defendCity.get(e.id);if(_){const M=Ht(e,_),b=Ht(t,_);m+=(M-b)*22,b<=1&&(m+=8);const T=a.threats[_.id],E=_e(i,_.x,_.y);b===0&&T?.enemyAdjacent&&E&&E.unitId===null&&(m+=55)}break}case"attack":{const _=a.friendPower[h]+(Ht(e,t)>2?_n(e):0),M=a.enemyReachPower[h],b=M===0||a.overwhelming||_>=M*(.7+.3*s.selfPreservation),T=22*s.attackWeight*(b?1:.28+.4*(1-r.dangerAwareness));g&&a.targetCity?m+=(Ht(e,a.targetCity)-Ht(t,a.targetCity))*T:m+=Il(a.distTarget,u,h,T);break}case"hold":{const _=a.frontierCity;if(_){const M=b=>b===0?3.5:Math.max(0,b-2);m+=(M(Ht(e,_))-M(Ht(t,_)))*10}break}case"retreat":{const _=a.distHome[u],M=a.distHome[h];if(_<As&&M<As){const b=Math.max(1,_),T=Math.max(1,M);m+=(b-T)*18}l.cityId&&i.cities[l.cityId]?.ownerId===e.ownerId&&!l.isCityCenter&&(m+=10);break}}const p=kc(i,e,h,n,s,r,a,f)*(y?.35:1);m+=o-p;const v=a.enemyReach[h].length>0;if((l.terrain==="forest"||l.terrain==="ancient_woods")&&(s.faction==="elves"?m+=c.range>1?10:6:v&&(m+=6)),l.terrain==="mountain"&&(s.faction==="dwarves"?m+=v?12:4:v&&(m+=7)),s.faction==="humans"&&l.hasRoad&&(m+=3),c.range>1&&v)for(let _=0;_<n.enemyUnits.length;_++){const M=n.enemyUnits[_];if(Ht(M,t)===1&&mt[M.type].range===1){m-=10*s.selfPreservation;break}}const w=_e(i,e.x,e.y);if(w?.isCityCenter&&w.cityId){const _=i.cities[w.cityId];if(_&&_.ownerId===e.ownerId){const M=a.threats[_.id],b=M?.enemyAdjacent&&M.enemyPower>M.ownPower*.5;!b&&a.cityHasRoom[_.id]?m+=(M?.enemyPower??0)>0?20:55:b&&(m-=40)}}if(l.isCityCenter&&l.cityId){const _=i.cities[l.cityId];if(_&&_.ownerId===e.ownerId){const M=a.threats[_.id];M?.enemyAdjacent?m+=35:a.cityHasRoom[_.id]&&(m-=(M?.enemyPower??0)>0?35:120)}}return m}function j2(i,e,t,n,s){if(gi(i,e.id)||yi(i,e.id))return-999;if(e.hp>=e.maxHp||e.hasMoved||e.hasAttacked)return-1;const r=e.hp/e.maxHp,a=1-r,o=_e(i,e.x,e.y),l=o?.cityId!==null&&o?.cityId!==void 0&&i.cities[o.cityId]?.ownerId===e.ownerId;let c=0;return r<=.45?c=48*a*t.selfPreservation+(l?14:0):r<=.7&&(Ro(i,e)||rd(i,e))?c=26*t.selfPreservation:r<=.65&&l&&(c=18*a*t.selfPreservation),s&&s.dangerAwareness<1&&(c*=.2+.8*s.dangerAwareness),n&&o?.isCityCenter&&o.cityId&&l&&n.cityHasRoom[o.cityId]&&(n.threats[o.cityId]?.enemyPower??0)===0&&r>.2&&(c-=65),c}function Z2(i,e,t,n,s,r,a){const o=mt[t],l=dt[n.player.faction],c=s.unitPreferences[t]??1,d=Co(i,n.player.id,t),u=Io(i,n.player.id,t),h=(o.attack+o.defense*.8)*(o.range>1?1.15:1)*(u/10),f=n.player.gold>=12+d*2;let m=14+Math.sqrt(Math.max(1,h))*13*c-d*(f?.65:2.3);const y=t===l.uniqueUnit,g=a?.eliteShareScale??1;if(y&&(m+=6*s.uniqueUnitWeight*g),(n.cityThreats[e.id]??0)>0)m+=28,o.range===1&&o.defense>=2&&(m+=16),t==="catapult"&&(m-=35);else if(t==="defender"){const T=n.enemyCities.some(E=>Ht(E,e)<=6);m+=T?8:s.faction==="dwarves"?4:-4}i.turn<=14&&n.neutralVillages.length+n.ruins.length>0&&(t==="rider"&&(m+=18),t==="warrior"&&(m+=12),t==="catapult"&&(m-=28));let w=0,_=0;for(let T=0;T<n.ownUnits.length;T++){const E=n.ownUnits[T];mt[E.type].movement>0&&(w++,E.type===t&&_++)}const M=w>0?_/w:0;let b=s.unitMix[t]??.05;return g<1&&(y||t==="catapult"?(b*=g,g<=.15&&(m-=45)):b+=(1-g)*.06),m+=(b-M)*210,w>=3&&M>b+.03&&(m-=75+(M-b)*300),t==="catapult"&&((r?.targetCity?.hasWalls??n.enemyCities.some(E=>E.hasWalls))&&w>=4&&(m+=22),w<4&&(m-=24)),m}const J2={humans:{faction:"humans",attackWeight:1.14,selfPreservation:1.1,expansionWeight:1.24,economyWeight:1.24,techWeight:1.12,uniqueUnitWeight:1.28,techBonuses:{humans_farming:22,humans_granaries:18,humans_milling:20,humans_roads:18,humans_shield_wall:26,humans_citadel_masonry:18,humans_stewards_citadel:20,humans_riding:24,humans_plains_charge:16,humans_chivalry:24,humans_ride_of_rohirrim:22,humans_hunting:18,humans_archery:24,humans_mountaineering:12,humans_siegecraft:22},unitPreferences:{warrior:1,rider:1.28,archer:1.26,defender:1.28,catapult:1.2,rohirrim_knight:1.32},unitMix:{rohirrim_knight:.24,rider:.2,archer:.21,defender:.19,catapult:.1,warrior:.06},aggressionTurn:10,attackRatio:.94,armyPerCity:1.54,rangedShare:.22},orcs:{faction:"orcs",attackWeight:1.24,selfPreservation:1.04,expansionWeight:1.24,economyWeight:1.26,techWeight:1.12,uniqueUnitWeight:1.35,techBonuses:{orcs_warg_riders:24,orcs_spoils_mastery:24,orcs_pack_tactics:20,orcs_clear_cutting:16,orcs_dark_forges:20,orcs_siege_works:24,orcs_mount_doom:24,orcs_shield_wall:22,orcs_uruk_breeding:28,orcs_war_barracks:26,orcs_black_gate:28,orcs_snaga_archers:22,orcs_black_arrows:18,orcs_crag_climbing:12,orcs_fell_volley:20},unitPreferences:{warrior:1,rider:1.38,defender:1.18,archer:1.26,catapult:1.26,uruk_berserker:1.38},unitMix:{uruk_berserker:.28,rider:.22,archer:.17,catapult:.12,defender:.14,warrior:.07},aggressionTurn:9,attackRatio:.93,armyPerCity:1.6,rangedShare:.18},elves:{faction:"elves",attackWeight:1.14,selfPreservation:1.08,expansionWeight:1.18,economyWeight:1.1,techWeight:1.12,uniqueUnitWeight:1.3,techBonuses:{elves_sanctuaries:18,elves_tree_singing:16,elves_lothlorien_sanctum:20,elves_woodland_aim:20,elves_sentinel_order:24,elves_keen_sight:14,elves_galadhrim_precision:22,elves_elven_steeds:22,elves_wardens:22,elves_graceful_guard:20,elves_wind_riders:20,elves_high_paths:16,elves_elven_lore:18,elves_mallorn_siege:20,elves_rings_preservation:18},unitPreferences:{archer:1.15,rider:1.3,warrior:.88,defender:1.26,catapult:1.16,elven_sentinel:1.4},unitMix:{elven_sentinel:.28,rider:.26,defender:.2,archer:.12,catapult:.08,warrior:.06},aggressionTurn:10.5,attackRatio:.98,armyPerCity:1.5,rangedShare:.4},dwarves:{faction:"dwarves",attackWeight:1.08,selfPreservation:1.09,expansionWeight:1.14,economyWeight:1.28,techWeight:1.12,uniqueUnitWeight:1.3,techBonuses:{dwarves_mining:24,dwarves_khazad_forges:18,dwarves_heart_of_mountain:22,dwarves_shieldbearers:20,dwarves_mithril_smithing:26,dwarves_runic_plate:18,dwarves_mithril_phalanx:24,dwarves_foraging:18,dwarves_stone_walls:18,dwarves_crossbows:20,dwarves_deep_vaults:22,dwarves_ram_riders:22,dwarves_siegecraft:20,dwarves_horned_charge:16,dwarves_dragon_slayers:20},unitPreferences:{warrior:1,defender:1.2,archer:1.2,rider:1.28,catapult:1.22,ironbreaker:1.35},unitMix:{ironbreaker:.26,rider:.21,archer:.18,catapult:.13,defender:.15,warrior:.07},aggressionTurn:11.5,attackRatio:1.03,armyPerCity:1.52,rangedShare:.18}},vh={easy:{difficulty:"easy",noiseRange:57,economySkipChance:.91,maxEconActionsPerTurn:1,earlyHumanCapitalPressure:.12,productionThreshold:-1/0,dangerAwareness:.04,focusFire:.04,aggressionDelay:1.65,attackRatioMult:1.5,armyTargetMult:.52,armyCapMult:1/0,trainSkipChance:0,maxTrainsPerTurn:1,dashLookaheadWeight:.08,simpleCityRewards:!0,maxTechsPerTurn:1,techResearchChance:.1,eliteShareScale:0,superpowerMinTurn:999,unitNeglectChance:.75,humanTargetBias:.05,humanTargetBiasMax:.16,humanPressureRampTurns:48,humanGraceTurns:24,gangUpOnHuman:!1},normal:{difficulty:"normal",noiseRange:17,economySkipChance:.39,maxEconActionsPerTurn:2,earlyHumanCapitalPressure:.45,productionThreshold:-1/0,dangerAwareness:.41,focusFire:.39,aggressionDelay:1.22,attackRatioMult:1.18,armyTargetMult:.76,armyCapMult:1/0,trainSkipChance:0,maxTrainsPerTurn:2,dashLookaheadWeight:.48,simpleCityRewards:!1,maxTechsPerTurn:1,techResearchChance:.57,eliteShareScale:.55,superpowerMinTurn:22,unitNeglectChance:.26,humanTargetBias:.32,humanTargetBiasMax:.56,humanPressureRampTurns:28,humanGraceTurns:14,gangUpOnHuman:!1},hard:{difficulty:"hard",noiseRange:13,economySkipChance:.28,maxEconActionsPerTurn:4,earlyHumanCapitalPressure:.55,productionThreshold:-1/0,dangerAwareness:.66,focusFire:.64,aggressionDelay:1.08,attackRatioMult:1.06,armyTargetMult:.88,armyCapMult:1/0,trainSkipChance:0,maxTrainsPerTurn:3,dashLookaheadWeight:.66,simpleCityRewards:!1,maxTechsPerTurn:2,techResearchChance:.7,eliteShareScale:.82,superpowerMinTurn:12,unitNeglectChance:.2,humanTargetBias:.35,humanTargetBiasMax:.57,humanPressureRampTurns:24,humanGraceTurns:12,gangUpOnHuman:!1}};function Q2(i,e){const t=J2[i];if(e.difficulty!=="easy")return t;const n=dt[i].uniqueUnit,s=(o,l,c=.75)=>o*(1-c)+l*c,r=i==="humans"?{rohirrim_knight:.34,defender:.24,warrior:.16,archer:.12,rider:.1,catapult:.04}:{...t.unitMix};i!=="humans"&&(r[n]=s(r[n]??.26,i==="elves"?.22:i==="orcs"?.24:.28,.85));const a={...t.unitPreferences};return a[n]=s(a[n]??1.4,i==="humans"?1.55:1.35,.85),i==="humans"&&(a.defender=1.35,a.warrior=1.15),{...t,attackWeight:s(t.attackWeight,i==="humans"?1.26:i==="elves"?1.04:i==="orcs"?1.08:1.12,.9),selfPreservation:s(t.selfPreservation,i==="humans"?1.14:1.04,.8),expansionWeight:s(t.expansionWeight,i==="humans"?1.32:1.2,.8),economyWeight:s(t.economyWeight,1.2,.75),techWeight:s(t.techWeight,i==="humans"?1.18:1.1,.75),uniqueUnitWeight:s(t.uniqueUnitWeight,i==="humans"?1.5:1.3,.85),aggressionTurn:s(t.aggressionTurn,i==="humans"?9.2:i==="elves"?11.8:i==="orcs"?11:10.6,.9),attackRatio:s(t.attackRatio,i==="humans"?.86:i==="elves"?1.08:i==="orcs"?1.05:1,.9),armyPerCity:s(t.armyPerCity,1.55,.85),unitMix:r,unitPreferences:a}}function eb(i){switch(i.type){case"HARVEST_TILE":return cr;case"BUILD_IMPROVEMENT":return Bi[i.improvement].cost;case"BUILD_ROAD":return dr;case"PLANT_ANCIENT_WOODS":return ur;default:return 0}}function _h(i){let e=2166136261;for(let t=0;t<i.length;t++)e=Math.imul(e^i.charCodeAt(t),16777619);return e>>>0}function tb(i,e,t,n){const s=t??i.config.difficulty,r=vh[s]??vh.normal;let a=Rh(i);const o=[],l=a.players[a.activePlayerIndex];if(!l||l.id!==e||a.phase==="game_over")return[{type:"END_TURN"}];const c=Q2(l.faction,r);let d=a.turn*1009+a.activePlayerIndex*131;const u=(i.rngState^_h(e)^Math.imul(a.turn,2654435761))>>>0,h=U=>Pc(u,_h(U)),f=U=>{try{const z=nr(a,U);return z.events.length===0?!1:(a=z.state,o.push(U),!0)}catch{return!1}},m=()=>{let U=!1,z=0;for(;z++<16&&a.phase==="playing";){let $=null;for(const te of Object.values(a.cities))if(te.ownerId===e&&te.pendingLevelRewards.length>0){$=te;break}if(!$)break;const D=us(a,e),q=$.pendingLevelRewards[0],Q=z2(a,$,q,D,c,r);if(!f({type:"CHOOSE_CITY_REWARD",cityId:$.id,reward:Q}))break;U=!0}return U},y=()=>{for(const U of Object.values(a.units))if(U.ownerId===e&&U.canPromote){if(r.difficulty==="easy"&&h(`promo:${U.id}`)>.1)continue;f({type:"PROMOTE_UNIT",unitId:U.id})}},g=()=>{const U=us(a,e),z=yh(a,U,c,r);return Ic(a,U,z,r),{ctx:U,sctx:z}};m(),y();let p=0;const v=r.techResearchChance>=1||h(`techTurn:${a.turn}`)<r.techResearchChance;for(;v&&p<r.maxTechsPerTurn&&a.phase==="playing";){const U=us(a,e),z=gh(a,U,c,r),$=mi(U.player.faction);let D=null,q=0;for(const j of $){if(!ta(a,e,j.id))continue;const ce=ma(a,e,j.id),ye=G2(a,j.id,ce,U,c)+Ki(a.rngState,d++,r.noiseRange*.5);(!D||ye>D.score)&&(D={action:{type:"RESEARCH_TECH",techId:j.id},score:ye},q=ce)}const te=U.player.gold-q>=z+15?-1/0:U.totalThreat>=2?26:12;if(!D||D.score<te||!(U.player.gold-q>=z||D.score>=70)||!f(D.action))break;p++}let w=0;const _=U=>{let z=[];const $=()=>{z=[];for(let Q=0;Q<a.tiles.length;Q++){const te=a.tiles[Q];te.cityId&&a.cities[te.cityId]?.ownerId===e&&z.push(Q)}};$();let D=0;const q=r.maxEconActionsPerTurn+4;for(;w<r.maxEconActionsPerTurn&&D++<q&&a.phase==="playing";){const Q=us(a,e),te=U?gh(a,Q,c,r):0;let L=null;for(let j=0;j<z.length;j++){const ce=a.tiles[z[j]],ae=er(a,e,ce.x,ce.y);for(let ye=0;ye<ae.length;ye++){const he=ae[ye],pe=V2(a,he,Q,c);if(pe<=0||pe<55&&Q.player.gold-eb(he)<te||r.economySkipChance>0&&pe<55&&Pc(a.rngState,d++)<r.economySkipChance)continue;const Ne=pe+Ki(a.rngState,d++,r.noiseRange*.5);(!L||Ne>L.score)&&(L={action:he,score:Ne})}}if(!L||L.score<10||!f(L.action))break;L.action.type!=="CHOP_FOREST"&&w++,m()&&$()}};_(!0);let{ctx:M,sctx:b}=g();if(a.phase==="playing"&&a.turn>=r.superpowerMinTurn&&ea(a,e)){const U=ib(a,M,b);U&&f(U)&&({ctx:M,sctx:b}=g())}const T=M.ownUnits.length,E=Math.min(80,20+Math.ceil(T*1.4)),S=2200;let x=0,A=0;B2(a,e,b.warTargetId,b.targetCity?.id??null);const P=new Map;let I=null,F=0,N=null;const Y=(U,z)=>{let $=null;if(U.actedThisTurn&&!U.canEscapeMove&&!U.canPersistAttack)return null;if(gi(a,U.id)){const te=W2(a,U,c)+Ki(a.rngState,d++,r.noiseRange*.25);return{action:{type:"CAPTURE_CITY",unitId:U.id},score:te}}if(yi(a,U.id)){const te=$2(a,U,M)+Ki(a.rngState,d++,r.noiseRange*.25);return{action:{type:"EXPLORE_RUINS",unitId:U.id},score:te}}if(r.unitNeglectChance>0&&!z){const Q=_e(a,U.x,U.y);if(!(Q?.isCityCenter&&Q.cityId!==null&&b.cityHasRoom[Q.cityId]===!0)&&h(`neglect:${U.id}`)<r.unitNeglectChance)return null}const D=hr(a,U.id);for(let Q=0;Q<D.length;Q++){const te=D[Q],L=_e(a,te.x,te.y);if(!L?.unitId)continue;const j=a.units[L.unitId];if(!j||j.ownerId===e)continue;x++;const ae=Nf(a,U,j,M,c,r,b)+Ki(a.rngState,d++,r.noiseRange);(!$||ae>$.score)&&($={action:{type:"ATTACK_UNIT",attackerId:U.id,defenderId:j.id},score:ae})}const q=_r(a,U.id);if(q.length>0){const Q=b.roles.get(U.id)??"hold",te=kc(a,U,Ve(U.x,U.y,a.mapSize),M,c,r,b,Q),L=r.dashLookaheadWeight>0&&!U.hasMoved&&!U.hasAttacked&&!U.canEscapeMove&&Wt(a,U,"dash"),j=yr(a,U);let ce=[];if(L&&M.enemyUnits.length>0){const ae=mt[U.type].movement+j+1;ce=M.enemyUnits.filter(ye=>Ht(U,ye)<=ae)}for(let ae=0;ae<q.length;ae++){const ye=q[ae];x++;let he=K2(a,U,ye,M,c,r,b,te);if(ce.length>0&&x<=S){x+=ce.length;const Ne=nb(a,U,ye,ce,j,M,c,r,b);Ne>10&&(he+=Ne*.85*r.dashLookaheadWeight)}const pe=he+Ki(a.rngState,d++,r.noiseRange);(!$||pe>$.score)&&($={action:{type:"MOVE_UNIT",unitId:U.id,to:ye},score:pe})}}if(!U.hasMoved&&!U.hasAttacked&&U.hp<U.maxHp){const Q=j2(a,U,c,b,r);if(Q>0){const te=Q+Ki(a.rngState,d++,r.noiseRange*.5);(!$||te>$.score)&&($={action:{type:"RECOVER_UNIT",unitId:U.id},score:te})}}return $};for(;A++<E&&a.phase==="playing";){const U=Object.values(b.threats).some(he=>he.enemyAdjacent||he.enemyOnCenter),z=x>S;for(let he=0;he<M.ownUnits.length;he++){const pe=M.ownUnits[he];I!==null&&!I.has(pe.id)&&P.has(pe.id)||z&&P.has(pe.id)&&pe.id!==N&&!gi(a,pe.id)&&!yi(a,pe.id)||P.set(pe.id,Y(pe,U))}let $=null,D=null;for(const[he,pe]of P)!pe||!a.units[he]||(!$||pe.score>$.score)&&($=pe,D=he);if(!$||!D||$.score<=2)break;const q=$.action,Q=a;if(N=D,!f(q)){if(I=new Set([D]),P.delete(D),++F>12)break;continue}m(),y();const te=us(a,e);if(q.type==="CAPTURE_CITY"||q.type==="EXPLORE_RUINS"||te.ownCities.length!==M.ownCities.length||te.neutralVillages.length!==M.neutralVillages.length||te.enemyCities.length!==M.enemyCities.length){M=te,b=yh(a,M,c,r),Ic(a,M,b,r),P.clear(),I=null;continue}const j=q.type==="ATTACK_UNIT"||te.enemyUnits.length!==M.enemyUnits.length;if(M=te,j){H2(a,M,b,r);const he=[],pe=a.units[D]??Q.units[D];if(pe&&he.push({x:pe.x,y:pe.y}),q.type==="ATTACK_UNIT"){const Ne=Q.units[q.defenderId];Ne&&he.push({x:Ne.x,y:Ne.y})}I=new Set([D]);for(let Ne=0;Ne<M.ownUnits.length;Ne++){const Xe=M.ownUnits[Ne];for(let nt=0;nt<he.length;nt++)if(Ht(he[nt],Xe)<=3){I.add(Xe.id);break}}continue}Uf(a,M,b);const ce=a.units[D]??Q.units[D],ae=[];ce&&ae.push({x:ce.x,y:ce.y});const ye=Q.units[D];ye&&(!ce||ye.x!==ce.x||ye.y!==ce.y)&&ae.push({x:ye.x,y:ye.y}),I=new Set([D]);for(let he=0;he<M.ownUnits.length;he++){const pe=M.ownUnits[he];for(let Ne=0;Ne<ae.length;Ne++)if(Ht(ae[Ne],pe)<=2){I.add(pe.id);break}}}if(a.phase==="playing"){({ctx:M,sctx:b}=g());const U=te=>{const L=_r(a,te.id);if(L.length===0)return!1;let j=null,ce=-1/0;for(let ae=0;ae<L.length;ae++){const ye=L[ae],he=_e(a,ye.x,ye.y);if(!he||he.isCityCenter&&he.cityId)continue;let pe=-kc(a,te,Ve(ye.x,ye.y,a.mapSize),M,c,r,b,"hold");pe-=Ht(te,ye)*.5,b.targetCity&&(pe-=Ht(ye,b.targetCity)*.25),(he.hasVillage||he.resource==="ruins")&&(pe+=8),pe>ce&&(ce=pe,j=ye)}return j?f({type:"MOVE_UNIT",unitId:te.id,to:j}):!1},z=b.frontierCity?.id,$=[...M.ownCities].sort((te,L)=>(b.threats[L.id]?.enemyPower??0)-(b.threats[te.id]?.enemyPower??0)||(L.id===z?1:0)-(te.id===z?1:0)||L.level-te.level);let D=M,q=0;const Q=Number.isFinite(r.maxTrainsPerTurn)&&r.difficulty!=="easy"&&M.ownCities.length>=10?r.maxTrainsPerTurn+1:r.maxTrainsPerTurn;for(let te=0;te<$.length&&a.phase==="playing";te++){const L=$[te],j=(b.threats[L.id]?.enemyPower??0)>0;if(q>=Q)break;let ce=_e(a,L.x,L.y);if(!ce)continue;if(ce.unitId!==null&&!j&&aa(a,L.id)<Rs(a,L)){const Ne=a.units[ce.unitId];if(Ne&&Ne.ownerId===e&&U(Ne)&&(ce=_e(a,L.x,L.y),D=us(a,e),!ce))continue}if(ce.unitId!==null||aa(a,L.id)>=Rs(a,L))continue;const ae=Uc(a,L.id);if(ae.length===0)continue;const ye=D.player.gold,he=D.ownUnits.filter(Ne=>mt[Ne.type].movement>0).length;if(!j&&(r.trainSkipChance>0&&he>=b.desiredArmy*.5&&h(`train:${L.id}`)<r.trainSkipChance||he>=b.desiredArmy*r.armyCapMult||he>=b.desiredArmy&&ye<8&&a.turn<=6))continue;let pe=null;for(let Ne=0;Ne<ae.length;Ne++){const Xe=ae[Ne];if(ye<Co(a,e,Xe))continue;const O=Z2(a,L,Xe,D,c,b,r)+Ki(a.rngState,d++,r.noiseRange*.5);(!pe||O>pe.score)&&(pe={action:{type:"TRAIN_UNIT",cityId:L.id,unitType:Xe},score:O})}pe&&f(pe.action)&&(q++,D=us(a,e))}_(!1)}return a.phase==="playing"&&o.push({type:"END_TURN"}),o}function nb(i,e,t,n,s,r,a,o,l){const c=e.x,d=e.y;let u=0;e.x=t.x,e.y=t.y;const h=e.hasMoved;e.hasMoved=!0;try{const f=r.player.revealedTiles,m=i.mapSize;for(let y=0;y<n.length;y++){const g=n[y];if(Math.max(Math.abs(t.x-g.x),Math.abs(t.y-g.y))>s||!f[Ve(g.x,g.y,m)])continue;const p=Nf(i,e,g,r,a,o,l,!0);p>u&&(u=p)}}finally{e.x=c,e.y=d,e.hasMoved=h}return u}function ib(i,e,t){const n=e.player.faction,s=e.player.id;if(n==="dwarves")return{type:"USE_SUPERPOWER"};if(n==="elves"){let r=0;for(const o of e.ownUnits)e.enemyUnits.some(l=>Ht(o,l)<=3)&&r++;const a=t.targetCity?e.ownUnits.filter(o=>Ht(o,t.targetCity)<=4).length:0;return r>=3||t.attacking&&a>=3?{type:"USE_SUPERPOWER"}:null}if(n==="orcs"){let r=null,a=0;for(const o of oa(i,s)){let l=0,c=0;for(let d=-1;d<=1;d++)for(let u=-1;u<=1;u++){const h=_e(i,o.x+u,o.y+d);if(!(!h||!e.player.revealedTiles[Ve(h.x,h.y,i.mapSize)])){if(h.unitId){const f=i.units[h.unitId];f&&f.ownerId!==s&&(c++,l+=10+_n(f)*3,h.isCityCenter&&h.cityId&&i.cities[h.cityId]?.ownerId===f.ownerId&&e.ownUnits.some(m=>Ht(m,h)<=mt[m.type].movement)&&(l+=30),h.isCityCenter&&h.cityId&&i.cities[h.cityId]?.ownerId===s&&(l+=60))}h.cityId&&i.cities[h.cityId]?.ownerId===s&&h.improvement&&(l-=6)}}(c>=2||l>=45)&&l>a&&(a=l,r=o)}return r?{type:"USE_SUPERPOWER",target:r}:null}if(n==="humans"){const r=oa(i,s);if(r.length===0)return null;let a=null,o=-1/0;for(const c of r){let d=0;for(const f of e.enemyUnits){const m=Ht(c,f);m<=2?d+=25:m<=4&&(d+=6)}const u=_e(i,c.x,c.y),h=u?.cityId?i.cities[u.cityId]:null;if(h){const f=t.threats[h.id];f&&f.enemyPower>0&&(d+=20+(h.isCapital?10:0)),Ht(c,h)===1&&(d+=4)}t.targetCity&&(d-=Ht(c,t.targetCity)*1.5),(u?.terrain==="mountain"||u?.terrain==="forest")&&(d+=3),d>o&&(o=d,a=c)}const l=Object.values(t.threats).some(c=>c.enemyPower>0);return a&&(o>=20||l||i.turn>=30)?{type:"USE_SUPERPOWER",target:a}:null}return null}function Pl(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class sb{root;callbacks;openState=!1;onKeyDown;constructor(e,t={}){this.callbacks=t,this.root=document.createElement("div"),this.root.className="modal-backdrop age-up-modal hidden",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","Age Reached"),e.appendChild(this.root),this.root.addEventListener("click",n=>{n.target===this.root&&this.close()}),this.onKeyDown=n=>{n.key==="Escape"&&this.openState&&(n.stopPropagation(),this.close())},window.addEventListener("keydown",this.onKeyDown)}isOpen(){return this.openState}open(e){this.openState=!0,this.render(e),this.root.classList.remove("hidden")}close(){this.openState&&(this.openState=!1,this.root.classList.add("hidden"),this.root.innerHTML="",this.callbacks.onClose?.())}destroy(){window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}render(e){const t=dt[e.faction],n=fn[e.faction],s=e.newAge===3,r=s?"Age III Reached!":"Age II Reached!",a=s?`The ${t.name} enter their zenith! Age III Capstone technologies are now unlocked in your Codex.`:`The ${t.name} advance! Age II technologies and elite units are now unlocked in your Codex.`,o=s&&e.superpowerName?`
          <div class="age-up-superpower-card" style="--age-heraldry: ${n};">
            <div class="age-up-superpower-icon" aria-hidden="true">
              ${Bc(e.faction,"icon icon-lg")}
            </div>
            <div class="age-up-superpower-copy">
              <div class="age-up-superpower-label">Superpower Unlocked</div>
              <div class="age-up-superpower-name">${Pl(e.superpowerName)}</div>
              ${e.superpowerDescription?`<p class="age-up-superpower-desc">${Pl(e.superpowerDescription)}</p>`:""}
            </div>
          </div>
        `:`
          <div class="age-up-unlock-strip">
            <span class="age-up-unlock-icon" aria-hidden="true">${se("codex","icon icon-sm")}</span>
            <span>Age II Codex branches &amp; upgrades unlocked</span>
          </div>
        `;this.root.setAttribute("aria-label",r),this.root.innerHTML=`
      <div class="modal-panel age-up-panel ${s?"is-age-three":"is-age-two"}" style="--age-heraldry: ${n};">
        <div class="age-up-crest-ring" aria-hidden="true">
          <span class="age-up-crest-medallion" style="background: ${n};">
            ${In(e.faction,"icon age-up-crest-svg")}
          </span>
          <span class="age-up-roman-badge">${s?"III":"II"}</span>
        </div>

        <h2 class="age-up-headline">${r}</h2>
        <p class="age-up-summary">${Pl(a)}</p>

        ${o}

        <button type="button" class="btn btn-cta age-up-cta" data-age-up-continue>
          <span>Onward</span>
          ${se("chevronRight","icon icon-sm")}
        </button>
      </div>
    `,this.root.querySelector("[data-age-up-continue]")?.addEventListener("click",()=>{this.close()})}}const wh=[{id:"stars",icon:"star",title:"Stars: Eldermere’s Magic",body:"See those glowing Stars (★) up top? Spend them to harvest, train troops, and study lore—growing cities earns more each turn!"},{id:"upgrade",icon:"wheat",title:"Grow Your Capital",body:"Every grand empire begins with a humble harvest! Tap both resource tiles inside your borders to level up your capital."},{id:"move",icon:"compass",title:"March Into the Fog",body:"Time to explore, Commander! Tap the glowing blue ring to the east to march toward the rival outpost."},{id:"combat",icon:"swords",title:"Clash With a Rival",body:"An uninvited guest at that Village! Tap the red target ring on the rival warrior to clear the settlement."},{id:"capture",icon:"crown",title:"Claim the Village",body:"Splendidly struck! Tap the glowing Claim button below to raise your banner over your second city."},{id:"codex",icon:"codex",title:"Crack Open Your Codex",body:"A sharp mind wins as many crowns as a sharp blade! Tap Codex below and research a technology."},{id:"train",icon:"helm",title:"Train a Unit",body:"Every realm needs more boots! Tap your capital city, then tap Warrior to train a new recruit."},{id:"end_turn",icon:"endTurnHumans",title:"Turn the Page",body:"Magnificent first turn! Tap End Turn below so rival realms can move and your cities grant fresh Stars (★)."}],Mh={stars:0,upgrade:1,move:2,combat:3,capture:4,codex:5,train:6,end_turn:7},rb={stars:"greet",upgrade:"point",move:"point",combat:"point",capture:"cheer",codex:"idea",train:"point",end_turn:"point"};function kl(i){typeof document>"u"||document.documentElement.classList.toggle("alderwick-spotlight-shard",i)}function Xr(i){typeof document>"u"||document.documentElement.classList.toggle("alderwick-spotlight-stars",i)}function hs(i){return i!==null&&i!=="intro"&&i!=="complete"}function Qs(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class ab{starsScrimEl;bannerEl;modalEl;callbacks;stage=null;subProgress=null;context={};nudgeMessage=null;nudgeTimer=null;suppressed=!1;constructor(e,t={}){this.callbacks=t,this.starsScrimEl=document.createElement("div"),this.starsScrimEl.className="tutorial-stars-scrim hidden",this.starsScrimEl.setAttribute("aria-hidden","true"),this.starsScrimEl.addEventListener("click",()=>{this.stage==="stars"&&this.nudge("Tap “Got It!” above so we can grow your capital first.")}),e.appendChild(this.starsScrimEl),this.bannerEl=document.createElement("aside"),this.bannerEl.className="tutorial-banner tutorial-alderwick-host hidden",this.bannerEl.setAttribute("role","region"),this.bannerEl.setAttribute("aria-label","Guided Tutorial by Alderwick"),e.appendChild(this.bannerEl),this.modalEl=document.createElement("div"),this.modalEl.className="alderwick-stage-backdrop tutorial-modal hidden",this.modalEl.setAttribute("role","dialog"),this.modalEl.setAttribute("aria-modal","true"),this.modalEl.setAttribute("aria-label","Alderwick Tutorial"),e.appendChild(this.modalEl),typeof ResizeObserver<"u"&&(this.occlusionObserver=new ResizeObserver(()=>this.scheduleOcclusionReport()),this.occlusionObserver.observe(this.bannerEl)),window.addEventListener("eldermere:bottom-hud-resize",this.handleLayoutChange),window.addEventListener("resize",this.handleLayoutChange)}occlusionObserver=null;occlusionRaf=null;lastOcclusion="";handleLayoutChange=()=>this.scheduleOcclusionReport();scheduleOcclusionReport(){this.occlusionRaf===null&&(this.occlusionRaf=window.requestAnimationFrame(()=>{this.occlusionRaf=null,this.reportOcclusion()}))}reportOcclusion(){const e=this.callbacks.onOcclusionChange;if(!e)return;let t=0,n=0;if(!this.suppressed&&hs(this.stage)&&!this.bannerEl.classList.contains("hidden")){const r=this.bannerEl.querySelector(".alderwick-scene")??this.bannerEl;this.stage==="stars"?(t=Math.max(0,r.getBoundingClientRect().bottom),n=0):(n=Math.max(0,window.innerHeight-r.getBoundingClientRect().top),t=document.querySelector(".top-bar")?.getBoundingClientRect().bottom??0)}const s=`${Math.round(t)}:${Math.round(n)}`;s!==this.lastOcclusion&&(this.lastOcclusion=s,e(t,n))}setSuppressed(e){this.suppressed!==e&&(this.suppressed=e,this.bannerEl.classList.toggle("is-suppressed",e),e?(this.starsScrimEl.classList.add("hidden"),Xr(!1)):this.stage==="stars"&&(this.starsScrimEl.classList.remove("hidden"),Xr(!0)),this.scheduleOcclusionReport())}isActive(){return this.stage!==null&&this.stage!=="complete"}isModalOpen(){return this.stage==="intro"||this.stage==="complete"}isBlockingEndTurn(){return hs(this.stage)&&this.stage!=="end_turn"}getStage(){return this.stage}getStepIndex(){return hs(this.stage)?Mh[this.stage]:null}start(e="intro",t=null){this.setStage(e,t)}setStage(e,t=null){const n=this.isModalOpen();if(this.clearNudgeTimer(),this.nudgeMessage=null,this.suppressed=!1,this.bannerEl.classList.remove("is-suppressed"),this.stage=e,kl(e==="complete"),Xr(e==="stars"),this.starsScrimEl.classList.toggle("hidden",e!=="stars"),this.bannerEl.classList.toggle("is-top-aligned",e==="stars"),this.scheduleOcclusionReport(),this.subProgress=t,e===null){this.hideElements(),n&&this.callbacks.onModalClose?.(),this.callbacks.onStageChange?.(null);return}if(e==="intro"){this.bannerEl.classList.add("hidden"),this.bannerEl.innerHTML="",delete this.bannerEl.dataset.renderedStep,this.renderIntroModal(),this.modalEl.classList.remove("hidden"),n||this.callbacks.onModalOpen?.(),this.callbacks.onStageChange?.("intro");return}if(e==="complete"){this.bannerEl.classList.add("hidden"),this.bannerEl.innerHTML="",delete this.bannerEl.dataset.renderedStep,this.renderCompleteModal(),this.modalEl.classList.remove("hidden"),n||this.callbacks.onModalOpen?.(),this.callbacks.onStageChange?.("complete");return}this.modalEl.classList.add("hidden"),this.modalEl.innerHTML="",this.renderBanner(e),this.bannerEl.classList.remove("hidden"),n&&this.callbacks.onModalClose?.(),this.callbacks.onStageChange?.(e)}setSubProgress(e){this.subProgress!==e&&(this.subProgress=e,hs(this.stage)&&this.renderBanner(this.stage))}setContext(e){this.context={...e},hs(this.stage)?this.renderBanner(this.stage):this.stage==="intro"?this.renderIntroModal():this.stage==="complete"&&this.renderCompleteModal()}nudge(e){hs(this.stage)&&(this.clearNudgeTimer(),this.nudgeMessage=e,this.renderBanner(this.stage,!0),this.nudgeTimer=window.setTimeout(()=>{this.nudgeTimer=null,this.nudgeMessage=null,hs(this.stage)&&this.renderBanner(this.stage,!1)},3200))}completeAndCelebrate(){Ed(),this.setStage("complete")}endTutorial(e=!0){e&&Ed();const t=this.stage!==null,n=this.isModalOpen();this.clearNudgeTimer(),this.nudgeMessage=null,this.subProgress=null,this.context={},this.stage=null,this.hideElements(),n&&this.callbacks.onModalClose?.(),t&&(this.callbacks.onStageChange?.(null),this.callbacks.onEndTutorial?.())}dismissModal(){this.stage==="intro"?(this.setStage("stars"),this.callbacks.onStartTutorial?.()):this.stage==="complete"&&(this.setStage(null),this.callbacks.onCompleteDismiss?.())}hide(){const e=this.isModalOpen();this.clearNudgeTimer(),this.nudgeMessage=null,this.subProgress=null,this.context={},this.stage=null,this.hideElements(),e&&this.callbacks.onModalClose?.()}destroy(){this.clearNudgeTimer(),kl(!1),Xr(!1),this.occlusionObserver?.disconnect(),window.removeEventListener("eldermere:bottom-hud-resize",this.handleLayoutChange),window.removeEventListener("resize",this.handleLayoutChange),this.occlusionRaf!==null&&window.cancelAnimationFrame(this.occlusionRaf),this.starsScrimEl.remove(),this.bannerEl.remove(),this.modalEl.remove()}hideElements(){kl(!1),Xr(!1),this.suppressed=!1,this.starsScrimEl.classList.add("hidden"),this.bannerEl.classList.remove("is-top-aligned","is-suppressed"),this.scheduleOcclusionReport(),delete this.bannerEl.dataset.renderedStep,this.bannerEl.classList.add("hidden"),this.bannerEl.innerHTML="",this.modalEl.classList.add("hidden"),this.modalEl.innerHTML=""}clearNudgeTimer(){this.nudgeTimer!==null&&(window.clearTimeout(this.nudgeTimer),this.nudgeTimer=null)}formatStepBodyHtml(e,t){switch(e){case"stars":return"See those glowing <strong>Stars (★)</strong> up top? Spend them to harvest, train troops, and study lore—growing cities earns more each turn!";case"capture":return"Splendidly struck! Tap the glowing <strong>Claim</strong> button below to raise your banner over your second city.";case"codex":{const n=this.context.targetTechName;return n?`A sharp mind wins as many crowns as a sharp blade! Tap <strong>Codex</strong> below and research <strong>“${Qs(n)}”</strong>.`:"A sharp mind wins as many crowns as a sharp blade! Tap <strong>Codex</strong> below and research a technology."}case"train":return"Every realm needs more boots! Tap your capital city, then tap <strong>Warrior</strong> to train a new recruit.";case"end_turn":return"Magnificent first turn! Tap <strong>End Turn</strong> below so rival realms can move and your cities grant fresh Stars (★).";default:return Qs(t.body)}}renderCodexTargetIcon(){const e=this.context.targetTechId,t=e?kt[e]:void 0,n=this.context.faction??"humans",s=t?Cc(t):"road",r=t?.name??this.context.targetTechName??"Technology";return`<div class="tutorial-tech-icon-box" aria-hidden="true">${Eo(s,n,"tutorial-tech-thumb",r)||se("codex","icon icon-lg")}</div>`}renderBanner(e,t=!1){const n=Mh[e],s=wh[n];if(!s)return;const r=wh.length,a=this.formatStepBodyHtml(e,s),o=e==="codex"?`
          <div class="tutorial-tech-row">
            <p class="tutorial-body">${a}</p>
            ${this.renderCodexTargetIcon()}
          </div>
        `:`<p class="tutorial-body">${a}</p>`,l=e==="stars"?`<button type="button" class="btn btn-cta tutorial-next-btn" data-tutorial-next><span>Got It!</span>${se("chevronRight","icon icon-xs")}</button>`:"",c=e!=="upgrade"&&this.subProgress?`<span class="tutorial-progress-pill">${Qs(this.subProgress)}</span>`:"",d=this.nudgeMessage?`<div class="tutorial-nudge" role="status">${Qs(this.nudgeMessage)}</div>`:"",u=!!(l||c),h=u?`
        ${l}
        ${c}
        <span class="tutorial-hint-note">End anytime in Scores</span>
      `:'<span class="tutorial-hint-note is-only-hint">End anytime in Scores</span>',f=this.bannerEl.dataset.renderedStep!==e;this.bannerEl.dataset.renderedStep=e,this.bannerEl.innerHTML=ko({pose:rb[e],variant:"compact",animate:f,nudged:t,extraClass:`tutorial-alderwick-scene${e==="stars"?" is-stars-step":""}${u?"":" is-hint-only-actions"}`,headerHtml:`
        <span class="tutorial-icon-badge" aria-hidden="true">${se(s.icon,"icon icon-xs")}</span>
        <strong class="tutorial-title">${Qs(s.title)}</strong>
        <span class="tutorial-step-pill">${n+1} / ${r}</span>
      `,bodyHtml:`
        ${o}
        ${d}
      `,actionsHtml:h}),e==="stars"&&this.bannerEl.querySelector("[data-tutorial-next]")?.addEventListener("click",()=>{this.stage==="stars"&&(this.setStage("upgrade"),this.callbacks.onAdvanceFromStars?.())}),this.scheduleOcclusionReport()}renderIntroModal(){const e=[{pose:"greet",bodyHtml:`
          <p class="alderwick-bubble-lead">Well met, Commander!</p>
          <p>I am <strong>${xs}</strong>, Grand Chronicler of Eldermere. I’ll be your guide for your very first turn.</p>
        `,actionLabel:"Nice to meet you!"},{pose:"point",bodyHtml:`
          <p>Long ago, the <strong>Star-Crown</strong> kept Eldermere’s four realms at peace. When it shattered, so did the peace. Now every realm fights to reforge it.</p>
        `,actionLabel:"Begin the Chronicle"}];this.modalEl.setAttribute("aria-label",`Welcome to Eldermere — ${xs} introduces himself`),po(this.modalEl,e,()=>this.dismissModal())}renderCompleteModal(){const e=this.context.faction??"humans",t=ap.find(s=>s.faction===e)?.powerName??"Superpower",n=[{pose:"idea",bodyHtml:`
          <p class="alderwick-bubble-lead">Oh! By the way, Commander…</p>
          <p>That circle up top is your <strong>Star-Shard</strong>. Reach <strong>Age III</strong> in your Codex to unleash <strong>${Qs(t)}</strong>!</p>
          <p class="alderwick-bubble-signoff">Good luck! I’ll be watching. With snacks.</p>
        `,actionLabel:"Challenge accepted!"}];this.modalEl.setAttribute("aria-label","Oh, by the way: your Star-Shard and Superpower"),po(this.modalEl,n,()=>this.dismissModal(),"is-star-shard-tip")}}const ob={plains:"Plains",forest:"Forest",ancient_woods:"Ancient Woods",mountain:"Mountain",wasteland:"Wasteland",water:"Water"};function lb(i){return new Promise(e=>window.setTimeout(e,i))}class cb{canvasContainer;badgesContainer;hudRoot;titleScreen;gameOverOverlay;resignationOverlay;topBar;actionBar;techModal;ageUpModal;cityRewardModal;defeatNoticeModal;factionDossierModal;leaderboardModal;tutorial;rewardToastEl;superpowerBannerEl;rewardToastTimer=null;onPagePersistBound;onVisibilityPersistBound;sceneManager=null;board=null;badges=null;animQueue=null;input=null;state=null;humanPlayerId="";selectedCoord=null;selectedUnitId=null;selectionLayer="unit";validMoves=[];validAttacks=[];hoveredCoord=null;readyUnitCycleIndex=0;isSuperpowerTargeting=!1;superpowerTargets=[];activeCanvasPointerId=null;activeCanvasPointerStart={x:0,y:0};canvasMultiTouch=!1;tileClickHandled=!1;onCanvasPointerDownBound;onWindowPointerUpBound;onWindowPointerCancelBound;onAndroidBackBound;onAndroidSetPausedBound;onAndroidSizzleFinishedBound;isBusy=!1;isAITurnRunning=!1;sessionToken=0;titleSettleTimer=null;isTitleDioramaActive=!1;hasAutoStartedFirstRunTutorial=!1;titleShowcaseState=null;tutorialScenario=null;pendingEndTurnAfterTutorial=!1;constructor(e,t,n){this.canvasContainer=e,this.badgesContainer=t,this.hudRoot=n,this.onCanvasPointerDownBound=r=>this.handleCanvasPointerDown(r),this.onWindowPointerUpBound=r=>this.handleWindowPointerUp(r),this.onWindowPointerCancelBound=()=>{this.activeCanvasPointerId=null,this.canvasMultiTouch=!1},this.onAndroidBackBound=()=>this.handleAndroidBack(),this.onAndroidSetPausedBound=r=>this.setPaused(r),this.onAndroidSizzleFinishedBound=()=>this.handleAndroidSizzleFinished(),this.onPagePersistBound=()=>this.persistActiveCampaign(),this.onVisibilityPersistBound=()=>{document.visibilityState==="hidden"&&this.persistActiveCampaign()},this.titleScreen=new y2(this.hudRoot,{onStartGame:r=>this.startGame(r),onResumeGame:()=>this.resumeSavedCampaign(),onSelectFaction:r=>{ut("tap"),this.applyFactionTheme(r),this.focusTitleOnFaction(r,!1)}}),this.gameOverOverlay=new v2(this.hudRoot,{onPlayAgain:()=>this.returnToTitle()}),this.resignationOverlay=new _2(this.hudRoot,{onReturnToTitle:()=>this.returnToTitle()}),this.topBar=new M2(this.hudRoot,{onOpenLeaderboard:()=>this.openLeaderboardModal(),onOpenCodex:()=>this.openTechModal(),onActivateSuperpower:()=>{this.handleSuperpowerButtonClick()}}),this.actionBar=new E2(this.hudRoot,{onAction:r=>{this.handleHumanAction(r)},onUnlockTech:r=>this.handleUnlockTechRequest(r),onDeselect:()=>this.clearSelection(),onSwitchLayer:r=>this.switchSelectionLayer(r),onOpenTech:()=>this.openTechModal(),onActivateSuperpower:()=>{this.handleSuperpowerButtonClick()},onNextReadyUnit:()=>this.focusNextReadyUnit(),onEndTurn:()=>{this.handleEndTurn()}}),this.techModal=new R2(this.hudRoot,{onResearch:r=>{this.handleHumanAction({type:"RESEARCH_TECH",techId:r})},onClose:()=>{this.resumeSceneAfterOpaqueSheet()}}),this.ageUpModal=new sb(this.hudRoot,{onClose:()=>{this.resumeSceneAfterOpaqueSheet()}}),this.cityRewardModal=new I2(this.hudRoot,{onChoose:(r,a)=>{this.handleCityRewardChoice(r,a)}}),this.defeatNoticeModal=new P2(this.hudRoot,{onClose:r=>{r?this.returnToTitle():this.resumeSceneAfterOpaqueSheet()}}),this.factionDossierModal=new k2(this.hudRoot,{onBack:()=>{this.factionDossierModal.close(),this.openLeaderboardModal()},onClose:()=>{this.resumeSceneAfterOpaqueSheet()}}),this.leaderboardModal=new L2(this.hudRoot,{onSelectFaction:r=>{this.leaderboardModal.close(),this.openFactionDossier(r)},onEndTutorial:()=>{ut("tap"),this.pendingEndTurnAfterTutorial=!1,this.tutorialScenario=null,this.tutorial.endTutorial(!0),this.syncTutorialHighlights(),this.persistActiveCampaign();const r=this.buildLeaderboardViewModel();r&&this.leaderboardModal.update(r)},onResign:()=>this.handleResignCampaign(),onClose:()=>{this.resumeSceneAfterOpaqueSheet()}}),this.tutorial=new ab(this.hudRoot,{onStageChange:()=>{this.syncTutorialHighlights(),this.persistActiveCampaign()},onOcclusionChange:(r,a)=>{this.sceneManager?.setScreenOcclusion(r,a)},onStartTutorial:()=>{ut("tap"),this.syncTutorialContext(),this.focusTutorialCameraForStage("stars"),this.syncTutorialProgress(),this.syncTutorialHighlights(),this.resumeSceneAfterOpaqueSheet()},onAdvanceFromStars:()=>{ut("tap"),this.syncTutorialContext(),this.syncTutorialProgress(),this.focusTutorialCameraForStage("upgrade"),this.syncTutorialHighlights(),this.refreshHUD()},onCompleteDismiss:()=>{ut("tap");const r=this.pendingEndTurnAfterTutorial;this.pendingEndTurnAfterTutorial=!1,this.tutorialScenario=null,this.syncTutorialHighlights(),this.persistActiveCampaign(),this.resumeSceneAfterOpaqueSheet(),this.refreshHUD(),r&&this.handleEndTurn()},onEndTutorial:()=>{this.pendingEndTurnAfterTutorial=!1,this.tutorialScenario=null,this.syncTutorialHighlights(),this.persistActiveCampaign(),this.refreshHUD()},onModalOpen:()=>{this.pauseSceneBehindOpaqueSheet()},onModalClose:()=>{this.resumeSceneAfterOpaqueSheet()}}),this.rewardToastEl=document.createElement("div"),this.rewardToastEl.className="ruins-reward-toast hidden",this.rewardToastEl.setAttribute("role","status"),this.rewardToastEl.setAttribute("aria-live","polite"),this.hudRoot.appendChild(this.rewardToastEl),this.superpowerBannerEl=document.createElement("div"),this.superpowerBannerEl.className="superpower-targeting-banner hidden",this.superpowerBannerEl.setAttribute("role","status"),this.superpowerBannerEl.setAttribute("aria-live","polite"),this.superpowerBannerEl.style.cssText="position:fixed;top:calc(env(safe-area-inset-top, 0px) + 64px);left:50%;transform:translateX(-50%);z-index:45;display:none;align-items:center;gap:10px;max-width:min(92vw,420px);padding:8px 12px 8px 14px;border-radius:14px;background:rgba(20,16,13,0.92);border:1.5px solid rgba(245,197,66,0.72);box-shadow:0 8px 24px rgba(0,0,0,0.45);color:#f7eedc;pointer-events:auto;",this.hudRoot.appendChild(this.superpowerBannerEl);const s=Td();this.titleScreen.setSavedCampaign(s),Ul()&&!Ta()&&!s&&vd()?this.startFirstRunAndroidTutorial():(this.applyFactionTheme(this.titleScreen.getSelectedFaction()),this.mountTitleDiorama(),this.titleScreen.show()),window.__eldermereHandleBack=this.onAndroidBackBound,window.__eldermereSetPaused=this.onAndroidSetPausedBound,window.__eldermereOnSizzleFinished=this.onAndroidSizzleFinishedBound,window.addEventListener("pagehide",this.onPagePersistBound),document.addEventListener("visibilitychange",this.onVisibilityPersistBound),requestAnimationFrame(()=>{requestAnimationFrame(()=>{gp()})})}handleAndroidBack(){return this.resignationOverlay.isOpen()?(this.resignationOverlay.hide(),this.returnToTitle(),ut("tap"),!0):this.tutorial.isModalOpen()?(this.tutorial.dismissModal(),ut("tap"),!0):this.defeatNoticeModal.isOpen()?(this.defeatNoticeModal.close(),ut("tap"),!0):this.ageUpModal.isOpen()?(this.ageUpModal.close(),ut("tap"),!0):this.factionDossierModal.isOpen()?(this.factionDossierModal.close(),this.openLeaderboardModal(),!0):this.leaderboardModal.isOpen()?(this.leaderboardModal.close(),ut("tap"),!0):this.techModal.isOpen()?(this.techModal.close(),ut("tap"),!0):this.cityRewardModal.isOpen()?(this.cityRewardModal.close(),this.tutorial.setSuppressed(!1),this.resumeSceneAfterOpaqueSheet(),ut("tap"),!0):this.isSuperpowerTargeting?(this.cancelSuperpowerTargeting(),ut("tap"),!0):this.selectedCoord!==null?(this.clearSelection(),ut("tap"),!0):!1}shouldKeepScenePausedForAndroid(){return window.EldermereAndroid?this.isTitleDioramaActive||this.tutorial.isModalOpen()||this.resignationOverlay.isOpen()||this.ageUpModal.isOpen()||this.techModal.isOpen()||this.leaderboardModal.isOpen()||this.factionDossierModal.isOpen()||this.cityRewardModal.isOpen()||this.defeatNoticeModal.isOpen():!1}setPaused(e){e&&this.persistActiveCampaign(),this.sceneManager&&(e?this.sceneManager.stop():this.shouldKeepScenePausedForAndroid()?this.sceneManager.renderOnce():this.sceneManager.start())}persistActiveCampaign(){if(!this.state||!this.humanPlayerId)return;if(this.state.phase!=="playing"||!this.isHumanAlive()){ir();return}if(this.isAITurnRunning||!this.isHumanTurn())return;const e=this.tutorial.getStage();Wp(this.state,this.humanPlayerId,e==="complete"?null:e,e==="complete"||e===null?null:this.tutorialScenario)}applyFactionTheme(e){this.hudRoot.setAttribute("data-faction",e),this.badgesContainer.setAttribute("data-faction",e)}attachEmptySkyListeners(){this.canvasContainer.addEventListener("pointerdown",this.onCanvasPointerDownBound),window.addEventListener("pointerup",this.onWindowPointerUpBound),window.addEventListener("pointercancel",this.onWindowPointerCancelBound)}detachEmptySkyListeners(){this.canvasContainer.removeEventListener("pointerdown",this.onCanvasPointerDownBound),window.removeEventListener("pointerup",this.onWindowPointerUpBound),window.removeEventListener("pointercancel",this.onWindowPointerCancelBound),this.activeCanvasPointerId=null,this.canvasMultiTouch=!1,this.tileClickHandled=!1}handleCanvasPointerDown(e){if(!(e.pointerType==="mouse"&&e.button!==0)){if(this.activeCanvasPointerId!==null&&this.activeCanvasPointerId!==e.pointerId){this.canvasMultiTouch=!0;return}this.activeCanvasPointerId=e.pointerId,this.activeCanvasPointerStart={x:e.clientX,y:e.clientY},this.canvasMultiTouch=!1,this.tileClickHandled=!1}}handleWindowPointerUp(e){if(this.activeCanvasPointerId===null||e.pointerId!==this.activeCanvasPointerId)return;const t=this.activeCanvasPointerStart,n=this.canvasMultiTouch,s=this.tileClickHandled;if(this.activeCanvasPointerId=null,this.canvasMultiTouch=!1,this.tileClickHandled=!1,s||n||this.isBusy||this.isAITurnRunning||!this.state||this.state.phase!=="playing"||this.tutorial.isModalOpen()||this.resignationOverlay.isOpen()||this.ageUpModal.isOpen()||this.techModal.isOpen()||this.cityRewardModal.isOpen()||this.defeatNoticeModal.isOpen()||this.factionDossierModal.isOpen()||this.leaderboardModal.isOpen())return;const r=Math.hypot(e.clientX-t.x,e.clientY-t.y),a=e.pointerType==="touch"?10:6;r<=a&&(this.isSuperpowerTargeting?this.cancelSuperpowerTargeting():this.selectedCoord!==null&&this.clearSelection())}mountTitleDiorama(){this.disposeSession(),this.isTitleDioramaActive=!0;const e=this.sessionToken,t=(Date.now()^Math.floor(Math.random()*2147483647))>>>0,n=wd({humanFaction:this.titleScreen.getSelectedFaction(),difficulty:"normal",mapSize:16,maxTurns:0,seed:t}),s=n.players.find(l=>l.isHuman)??n.players[0];s.revealedTiles.fill(!0);const r=!!window.EldermereAndroid,a=new Du(this.canvasContainer);a.setBoardBounds(n.mapSize),a.setIdleOrbit(!r);const o=new Oe(a.scene);o.syncState(n,s.id),this.sceneManager=a,this.board=o,this.titleShowcaseState=n,this.focusTitleOnFaction(this.titleScreen.getSelectedFaction(),!0),a.onUpdate((l,c)=>{o.update(l,c)}),a.start(),r&&(this.titleSettleTimer=window.setTimeout(()=>{this.titleSettleTimer=null,!(e!==this.sessionToken||!this.isTitleDioramaActive)&&(a.renderOnce(),a.stop())},850))}focusTitleOnFaction(e,t){if(!this.isTitleDioramaActive||!this.sceneManager||!this.titleShowcaseState)return;const n=this.titleShowcaseState,s=n.players.find(h=>h.faction===e)??n.players[0],a=Qt(n,s.id)[0]??Object.values(n.cities)[0];if(!a)return;const o=window.innerWidth>=768,l=a.x+(o?-1.4:1.7),c=a.y+(o?.5:1.7),d=ht(l,c,n.mapSize,0),u=!!window.EldermereAndroid;if(this.sceneManager.focusOnWorld(d,t||u),u&&!t){const h=this.sessionToken;window.setTimeout(()=>{h!==this.sessionToken||!this.isTitleDioramaActive||!this.sceneManager||this.sceneManager.renderOnce()},320)}}startFirstRunAndroidTutorial(){this.hasAutoStartedFirstRunTutorial=!0;const{state:e,scenario:t}=xd({humanFaction:"humans",difficulty:"easy",mapSize:16,maxTurns:0}),n=e.players.find(s=>s.isHuman)??e.players[0];this.mountActiveGame(e,n.id,"intro",t)}handleAndroidSizzleFinished(){!this.hasAutoStartedFirstRunTutorial&&!this.state&&this.isTitleDioramaActive&&Ul()&&vd()&&!Ta()&&!Nl()&&this.startFirstRunAndroidTutorial()}startGame(e){if(ut("select"),!Ta()){const{state:r,scenario:a}=xd({humanFaction:e.humanFaction,difficulty:"easy",mapSize:e.mapSize,maxTurns:0}),o=r.players.find(l=>l.isHuman)??r.players[0];this.mountActiveGame(r,o.id,"intro",a);return}const t=(Date.now()^Math.floor(Math.random()*2147483647))>>>0,n=wd({humanFaction:e.humanFaction,difficulty:e.difficulty,mapSize:e.mapSize,maxTurns:0,seed:t}),s=n.players.find(r=>r.isHuman)??n.players[0];this.mountActiveGame(n,s.id,null,null)}resumeSavedCampaign(){const e=Nl();if(!e){this.titleScreen.setSavedCampaign(null);return}ut("select");const t=!Ta()&&e.tutorialStage!==null&&e.tutorialStage!=="complete"?e.tutorialStage:null,n=t!==null?e.tutorialScenario:null;this.mountActiveGame(e.state,e.humanPlayerId,t,n)}mountActiveGame(e,t,n,s){this.disposeSession(),this.sessionToken+=1,typeof e.eclipseTurnsRemaining!="number"&&(e.eclipseTurnsRemaining=0),e.eclipseOwnerId===void 0&&(e.eclipseOwnerId=null);for(const h of e.players)typeof h.superpowerUsed!="boolean"&&(h.superpowerUsed=!1);this.state=e;const r=He(e,t)??e.players[0];this.humanPlayerId=r.id,this.readyUnitCycleIndex=0,this.tutorialScenario=s,this.applyFactionTheme(r.faction);const a=new Du(this.canvasContainer);a.setBoardBounds(e.mapSize),a.setIdleOrbit(!1),a.setEclipseMode((e.eclipseTurnsRemaining??0)>0);const o=new Oe(a.scene),l=new i2(this.badgesContainer);l.setOnCaptureClick(h=>{this.executeCaptureCity(h)}),l.setOnExploreRuinsClick(h=>{this.executeExploreRuins(h)}),l.setOnPromoteClick(h=>{this.executePromoteUnit(h)});const c=new KM(o,l,a),d=new JM(a,o,{onTileClick:h=>{this.tileClickHandled=!0,this.handleTileClick(h)},onTileHover:h=>this.handleTileHover(h),onEndTurnHotkey:()=>{this.handleEndTurn()},onDeselectHotkey:()=>{this.resignationOverlay.isOpen()?(this.resignationOverlay.hide(),this.returnToTitle()):this.tutorial.isModalOpen()?this.tutorial.dismissModal():this.defeatNoticeModal.isOpen()?this.defeatNoticeModal.close():this.ageUpModal.isOpen()?this.ageUpModal.close():this.techModal.isOpen()?this.techModal.close():this.factionDossierModal.isOpen()?this.factionDossierModal.close():this.leaderboardModal.isOpen()?this.leaderboardModal.close():this.isSuperpowerTargeting?this.cancelSuperpowerTargeting():this.clearSelection()}});this.attachEmptySkyListeners(),this.sceneManager=a,this.board=o,this.badges=l,this.animQueue=c,this.input=d,o.syncState(e,this.humanPlayerId),l.syncState(e,this.humanPlayerId,null);const u=Qt(e,this.humanPlayerId).find(h=>h.isCapital);u&&(a.focusOnWorld(ht(u.x,u.y,e.mapSize,0),!0),a.frameOpeningZoom()),a.onUpdate((h,f)=>{d.update(h),o.update(h,f),c.update(h),l.update(a.camera,h)}),a.renderOnce(),a.start(),this.titleScreen.hide(),this.gameOverOverlay.hide(),this.resignationOverlay.hide(),this.topBar.show(),this.actionBar.show(),n!==null?(this.syncTutorialContext(),this.tutorial.start(n,this.computeTutorialSubProgress(n)),n!=="intro"&&this.focusTutorialCameraForStage(n)):this.tutorial.hide(),this.syncTutorialHighlights(),this.refreshHUD(),this.state.phase==="playing"&&!this.isHumanAlive()?this.handleHumanDefeated(null):this.state.phase==="playing"&&!this.isHumanTurn()?this.runAITurnSequence(!1):this.persistActiveCampaign()}handleResignCampaign(){if(!this.state||!this.humanPlayerId){this.returnToTitle();return}this.sessionToken+=1,this.animQueue?.cancelAll(),this.isBusy=!1,this.isAITurnRunning=!1;const e=He(this.state,this.humanPlayerId),t=e?.faction??this.titleScreen.getSelectedFaction(),n=this.state.turn,s=e?An(e):1,r=Qt(this.state,this.humanPlayerId).length,a=e?.score??0;ir(),this.cancelSuperpowerTargeting(),this.pendingEndTurnAfterTutorial=!1,this.tutorialScenario=null,this.tutorial.hide(),this.topBar.hide(),this.actionBar.hide(),this.ageUpModal.close(),this.techModal.close(),this.cityRewardModal.close(),this.defeatNoticeModal.close(!0),this.factionDossierModal.close(),this.leaderboardModal.close(),this.hideRewardToast(),this.clearSelection(),this.input?.setInputLocked(!0),this.pauseSceneBehindOpaqueSheet(),this.resignationOverlay.show({faction:t,turn:n,age:s,citiesCount:r,score:a})}returnToTitle(){ir(),this.cancelSuperpowerTargeting(),this.pendingEndTurnAfterTutorial=!1,this.tutorialScenario=null,this.tutorial.hide(),this.resignationOverlay.hide(),this.topBar.hide(),this.actionBar.hide(),this.ageUpModal.close(),this.techModal.close(),this.cityRewardModal.close(),this.defeatNoticeModal.close(!0),this.factionDossierModal.close(),this.leaderboardModal.close(),this.hideRewardToast(),this.gameOverOverlay.hide(),this.titleScreen.setSavedCampaign(Td()),this.applyFactionTheme(this.titleScreen.getSelectedFaction()),this.mountTitleDiorama(),this.titleScreen.show()}destroy(){this.persistActiveCampaign(),window.removeEventListener("pagehide",this.onPagePersistBound),document.removeEventListener("visibilitychange",this.onVisibilityPersistBound),window.__eldermereHandleBack===this.onAndroidBackBound&&delete window.__eldermereHandleBack,window.__eldermereSetPaused===this.onAndroidSetPausedBound&&delete window.__eldermereSetPaused,window.__eldermereOnSizzleFinished===this.onAndroidSizzleFinishedBound&&delete window.__eldermereOnSizzleFinished,this.disposeSession(),this.hideRewardToast(),this.rewardToastEl.remove(),this.superpowerBannerEl.remove(),this.tutorial.destroy(),this.titleScreen.destroy(),this.gameOverOverlay.destroy(),this.resignationOverlay.destroy(),this.topBar.destroy(),this.actionBar.destroy(),this.ageUpModal.destroy(),this.techModal.destroy(),this.cityRewardModal.destroy(),this.defeatNoticeModal.destroy(),this.factionDossierModal.destroy(),this.leaderboardModal.destroy()}disposeSession(){this.sessionToken+=1,this.isTitleDioramaActive=!1,this.titleSettleTimer!==null&&(window.clearTimeout(this.titleSettleTimer),this.titleSettleTimer=null),this.cancelSuperpowerTargeting(),this.ageUpModal.close(),this.defeatNoticeModal.close(!0),this.isBusy=!1,this.isAITurnRunning=!1,this.pendingEndTurnAfterTutorial=!1,this.selectedCoord=null,this.selectedUnitId=null,this.selectionLayer="unit",this.validMoves=[],this.validAttacks=[],this.hoveredCoord=null,this.readyUnitCycleIndex=0,this.detachEmptySkyListeners(),this.input?.dispose(),this.input=null,this.badges?.dispose(),this.badges=null,this.sceneManager?.dispose(),this.sceneManager=null,this.board=null,this.animQueue?.cancelAll(),this.animQueue=null,this.state=null}isHumanAlive(){return!this.state||!this.humanPlayerId?!1:!!He(this.state,this.humanPlayerId)?.alive}isHumanTurn(){return!this.state||this.state.phase!=="playing"?!1:fs(this.state).id===this.humanPlayerId}concludeHumanDefeat(e){if(!this.state||this.state.phase==="game_over")return;const t=e&&He(this.state,e)||this.state.players.filter(n=>n.alive&&n.id!==this.humanPlayerId).sort((n,s)=>s.score-n.score)[0]||this.state.players.find(n=>n.id!==this.humanPlayerId)||null;this.state={...this.state,phase:"game_over",winnerId:t?.id??null,winReason:"domination"}}handleHumanDefeated(e){if(!this.state||!this.humanPlayerId){this.returnToTitle();return}const n=He(this.state,this.humanPlayerId)?.faction??this.titleScreen.getSelectedFaction(),s=e&&He(this.state,e)||this.state.players.filter(a=>a.alive&&a.id!==this.humanPlayerId).sort((a,o)=>o.score-a.score)[0]||this.state.players.find(a=>a.id!==this.humanPlayerId)||null,r=s?.faction??(n==="orcs"?"humans":"orcs");this.concludeHumanDefeat(s?.id??e),this.sessionToken+=1,this.animQueue?.cancelAll(),this.isBusy=!1,this.isAITurnRunning=!1,ir(),this.cancelSuperpowerTargeting(),this.pendingEndTurnAfterTutorial=!1,this.tutorialScenario=null,this.tutorial.hide(),this.topBar.hide(),this.actionBar.hide(),this.ageUpModal.close(),this.techModal.close(),this.cityRewardModal.close(),this.factionDossierModal.close(),this.leaderboardModal.close(),this.hideRewardToast(),this.clearSelection(),this.input?.setInputLocked(!0),this.pauseSceneBehindOpaqueSheet(),this.defeatNoticeModal.show(n,r,!0)}ensureTurnReturnedToHuman(e){if(!this.state||this.state.phase!=="playing")return;if(!this.isHumanAlive()){this.concludeHumanDefeat(e);return}const t=this.state.players.length+1;for(let n=0;n<t&&!(this.state.phase!=="playing"||this.isHumanTurn());n++){if(!this.isHumanAlive()){this.concludeHumanDefeat(e);return}const s=nr(this.state,{type:"END_TURN"});if(s.events.length===0&&s.state.activePlayerIndex===this.state.activePlayerIndex)break;this.state=s.state}this.state.phase==="playing"&&!this.isHumanAlive()&&this.concludeHumanDefeat(e)}getUnitAtCoord(e){if(!this.state)return null;const t=_e(this.state,e.x,e.y);if(t?.unitId){const n=this.state.units[t.unitId];if(n)return n}return Object.values(this.state.units).find(n=>n.x===e.x&&n.y===e.y)??null}hasTileUnderlay(e,t){return this.state?e.isCityCenter&&e.cityId!==null?!0:md(this.state,t.id,e.x,e.y).length>0:!1}getReadyHumanUnits(){return this.state?Lc(this.state,this.humanPlayerId).filter(t=>la(this.state,t.id)).sort((t,n)=>+!!(n.canCapture||n.canExploreRuins)-+!!(t.canCapture||t.canExploreRuins)):[]}focusNextReadyUnit(){if(!this.state||!this.isHumanTurn()||this.isBusy||this.isAITurnRunning)return;const e=this.getReadyHumanUnits();if(e.length===0)return;const t=e[this.readyUnitCycleIndex%e.length];this.readyUnitCycleIndex=(this.readyUnitCycleIndex+1)%e.length,this.sceneManager?.focusOnWorld(ht(t.x,t.y,this.state.mapSize,0),!1),this.selectCoord({x:t.x,y:t.y},"unit")}async executeCaptureCity(e){if(!this.state||this.isBusy||this.isAITurnRunning||!this.isHumanTurn())return;const t=this.state.units[e];!t||t.ownerId!==this.humanPlayerId||gi(this.state,e)&&(await this.handleHumanAction({type:"CAPTURE_CITY",unitId:e}),this.clearSelection())}async executeExploreRuins(e){if(!this.state||this.isBusy||this.isAITurnRunning||!this.isHumanTurn())return;const t=this.state.units[e];!t||t.ownerId!==this.humanPlayerId||yi(this.state,e)&&(await this.handleHumanAction({type:"EXPLORE_RUINS",unitId:e}),this.clearSelection())}async executePromoteUnit(e){if(!this.state||this.isBusy||this.isAITurnRunning||!this.isHumanTurn())return;const t=this.state.units[e];!t||t.ownerId!==this.humanPlayerId||t.isVeteran||!t.canPromote&&t.kills<3||(ut("capture"),await this.handleHumanAction({type:"PROMOTE_UNIT",unitId:e}))}async handleSuperpowerButtonClick(){if(!this.state||this.isBusy||this.isAITurnRunning||!this.isHumanTurn()||this.tutorial.isModalOpen()||this.resignationOverlay.isOpen()||this.ageUpModal.isOpen()||this.techModal.isOpen()||this.cityRewardModal.isOpen()||this.defeatNoticeModal.isOpen()||this.factionDossierModal.isOpen()||this.leaderboardModal.isOpen())return;if(this.tutorial.isActive()){ut("tap"),this.tutorial.nudge(this.getTutorialNudgeForCurrentStage());return}if(this.isSuperpowerTargeting){this.cancelSuperpowerTargeting(),ut("tap");return}const e=He(this.state,this.humanPlayerId);if(!e||!ea(this.state,e.id))return;const t=ba[e.faction];if(!t.requiresTarget){await this.handleHumanAction({type:"USE_SUPERPOWER"});return}const n=oa(this.state,this.humanPlayerId);n.length!==0&&(this.clearSelection(),this.isSuperpowerTargeting=!0,this.superpowerTargets=n,this.board?.setSuperpowerTargets(n,e.faction==="orcs"?"volcano":"tower"),this.showSuperpowerTargetingBanner(e.faction,t.name,t.targetHint??"Select a highlighted tile"),ut("select"),this.refreshTopBar())}showSuperpowerTargetingBanner(e,t,n){const s=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),r=n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");this.superpowerBannerEl.innerHTML=`
      <span style="display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;color:#f5c542;">
        ${Bc(e,"icon")}
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
    `,this.superpowerBannerEl.classList.remove("hidden"),this.superpowerBannerEl.style.display="flex",this.superpowerBannerEl.querySelector("[data-cancel-superpower]")?.addEventListener("click",()=>{this.cancelSuperpowerTargeting(),ut("tap")})}cancelSuperpowerTargeting(){!this.isSuperpowerTargeting&&this.superpowerTargets.length===0||(this.isSuperpowerTargeting=!1,this.superpowerTargets=[],this.superpowerBannerEl.classList.add("hidden"),this.superpowerBannerEl.style.display="none",this.superpowerBannerEl.innerHTML="",this.board?.clearHighlights(),this.refreshTopBar())}async handleTileClick(e){if(!this.state||this.isBusy||this.isAITurnRunning||this.state.phase!=="playing"||this.tutorial.isModalOpen()||this.resignationOverlay.isOpen()||this.ageUpModal.isOpen()||this.techModal.isOpen()||this.cityRewardModal.isOpen()||this.defeatNoticeModal.isOpen()||this.factionDossierModal.isOpen()||this.leaderboardModal.isOpen())return;if(this.isSuperpowerTargeting){const o=this.superpowerTargets.some(l=>l.x===e.x&&l.y===e.y);this.cancelSuperpowerTargeting(),o&&await this.handleHumanAction({type:"USE_SUPERPOWER",target:e});return}const t=_e(this.state,e.x,e.y);if(!t)return;const n=He(this.state,this.humanPlayerId);if(!n||!n.revealedTiles[Ve(e.x,e.y,this.state.mapSize)]){this.clearSelection();return}const s=this.getUnitAtCoord(e),r=t.cityId?this.state.cities[t.cityId]:void 0,a=r&&r.ownerId===this.humanPlayerId?r.id:null;if(this.selectedCoord&&this.selectedCoord.x===e.x&&this.selectedCoord.y===e.y){if(s&&this.hasTileUnderlay(t,n)){const o=this.selectionLayer==="unit"?"tile":"unit";this.selectCoord(e,o)}a&&this.board?.pulseCity(a);return}if(this.selectionLayer==="unit"&&this.selectedUnitId&&this.isHumanTurn()){const o=this.state.units[this.selectedUnitId];if(o&&o.ownerId===this.humanPlayerId){if(this.validMoves.some(d=>d.x===e.x&&d.y===e.y)){await this.handleHumanAction({type:"MOVE_UNIT",unitId:o.id,to:e}),this.reselectUnitIfActive(o.id);return}if(this.validAttacks.some(d=>d.x===e.x&&d.y===e.y)&&s&&s.ownerId!==this.humanPlayerId){await this.handleHumanAction({type:"ATTACK_UNIT",attackerId:o.id,defenderId:s.id}),this.reselectUnitIfActive(o.id);return}}}this.selectCoord(e,s?"unit":"tile"),a&&this.board?.pulseCity(a)}switchSelectionLayer(e){if(!this.state||!this.selectedCoord)return;const t=_e(this.state,this.selectedCoord.x,this.selectedCoord.y),n=He(this.state,this.humanPlayerId);if(!t||!n)return;const s=this.getUnitAtCoord(this.selectedCoord);e==="unit"&&!s||e==="tile"&&!this.hasTileUnderlay(t,n)&&s||this.selectCoord(this.selectedCoord,e)}handleTileHover(e){this.hoveredCoord=e,this.board?.setHoverTile(e),!(!this.state||this.isBusy||this.isAITurnRunning)&&this.refreshActionBar()}selectCoord(e,t){if(!this.state)return;const n=_e(this.state,e.x,e.y),s=He(this.state,this.humanPlayerId);if(!n||!s){this.clearSelection();return}const r=this.getUnitAtCoord(e),a=this.hasTileUnderlay(n,s);let o;t==="unit"&&r?o="unit":t==="tile"&&(a||!r)?o="tile":o=r?"unit":"tile",this.selectedCoord={x:e.x,y:e.y},this.selectionLayer=o,this.selectedUnitId=o==="unit"&&r?r.id:null,this.validMoves=[],this.validAttacks=[];const l=[],c=[];if(o==="unit"&&r&&this.isHumanTurn()&&r.ownerId===this.humanPlayerId){this.validMoves=_r(this.state,r.id),this.validAttacks=hr(this.state,r.id),this.tutorial.isActive()&&(this.validMoves=this.validMoves.filter(u=>this.isActionAllowedByTutorial({type:"MOVE_UNIT",unitId:r.id,to:u})),this.validAttacks=this.validAttacks.filter(u=>{const h=this.getUnitAtCoord(u);return!!(h&&this.isActionAllowedByTutorial({type:"ATTACK_UNIT",attackerId:r.id,defenderId:h.id}))}));for(const u of this.validAttacks){const h=this.getUnitAtCoord(u);let f=!1;h&&(f=mo(this.state,r.id,h.id).defenderKilled),l.push({x:u.x,y:u.y,lethal:f}),f&&c.push({x:u.x,y:u.y})}}this.board?.setSelectedTile(this.selectedCoord),this.board?.setMoveTargets(this.validMoves),this.board?.setAttackTargets(l);const d=o==="tile"?this.selectedCoord:null;this.badges?.setSelectedCoord(d),this.badges?.setLethalTargets(c),ut("select"),this.syncTutorialHighlights(),this.refreshActionBar()}reselectUnitIfActive(e){if(!this.state||this.state.phase!=="playing"){this.clearSelection();return}const t=this.state.units[e];if(!t||t.ownerId!==this.humanPlayerId){this.clearSelection();return}la(this.state,t.id)?this.selectCoord({x:t.x,y:t.y},"unit"):this.clearSelection()}clearSelection(){this.selectedCoord=null,this.selectedUnitId=null,this.selectionLayer="unit",this.validMoves=[],this.validAttacks=[],this.board?.clearHighlights(),this.badges?.setSelectedCoord(null),this.badges?.setLethalTargets([]),this.syncTutorialHighlights(),this.refreshActionBar()}async handleHumanAction(e){if(!this.state||this.isBusy||this.isAITurnRunning||!this.isHumanTurn())return;if(!this.isActionAllowedByTutorial(e)){ut("tap"),this.tutorial.nudge(this.getTutorialNudgeForCurrentStage());return}const t=this.sessionToken;this.isBusy=!0,this.input?.setInputLocked(!0);try{const n=He(this.state,this.humanPlayerId),s=n?An(n):null,{state:r,events:a}=nr(this.state,e);this.state=r;let o=null;if(e.type==="RESEARCH_TECH"&&s!==null){const d=He(r,this.humanPlayerId);if(d){const u=An(d);u>s&&(u===2||u===3)&&(o=u)}}let l="tap";for(const d of a){if(d.type==="GAME_OVER"&&d.winnerId===this.humanPlayerId){l="victory";break}d.type==="CITY_CAPTURED"||d.type==="CITY_LEVELED"||d.type==="RUINS_CLAIMED"||d.type==="SUPERPOWER_USED"?l="capture":d.type==="UNIT_ATTACKED"&&l==="tap"&&(l="combat")}o!==null&&l==="tap"&&(l="capture"),ut(l);for(const d of a)d.type==="RUINS_CLAIMED"&&d.playerId===this.humanPlayerId&&this.showRuinsRewardToast(d,r);if((e.type==="MOVE_UNIT"||e.type==="ATTACK_UNIT"||e.type==="CAPTURE_CITY"||e.type==="EXPLORE_RUINS"||e.type==="USE_SUPERPOWER")&&(this.validMoves=[],this.validAttacks=[],this.board?.clearHighlights(),this.badges?.setLethalTargets([])),this.animQueue&&await this.animQueue.playEvents(a,r,this.humanPlayerId,1),t!==this.sessionToken)return;this.sceneManager?.setEclipseMode((r.eclipseTurnsRemaining??0)>0);const c=this.selectedCoord&&this.selectionLayer==="tile"?this.selectedCoord:null;if(this.board?.syncState(r,this.humanPlayerId),this.badges?.syncState(r,this.humanPlayerId,c),e.type==="CAPTURE_CITY"||e.type==="EXPLORE_RUINS"||e.type==="USE_SUPERPOWER"?this.clearSelection():this.selectedCoord?this.selectCoord(this.selectedCoord,this.selectionLayer):(this.board?.clearHighlights(),this.badges?.setLethalTargets([])),this.refreshHUD(),this.advanceTutorialAfterAction(e,r),o!==null&&r.phase==="playing"){const d=He(r,this.humanPlayerId);if(d){this.techModal.close();const u=ba[d.faction];this.ageUpModal.open({faction:d.faction,newAge:o,superpowerName:o===3?u.name:void 0,superpowerDescription:o===3?u.description:void 0}),this.pauseSceneBehindOpaqueSheet()}}if(await this.showEliminationNotices(a,r,t),t!==this.sessionToken)return;this.checkPostActionState()}finally{t===this.sessionToken&&(this.isBusy=!1,!this.isAITurnRunning&&this.state?.phase==="playing"&&this.input?.setInputLocked(!1))}}async handleCityRewardChoice(e,t){this.tutorial.setSuppressed(!1),this.resumeSceneAfterOpaqueSheet(),await this.handleHumanAction({type:"CHOOSE_CITY_REWARD",cityId:e,reward:t})}syncTutorialHighlights(){if(!this.board||!this.state)return;if(!this.tutorial.isActive()||!this.tutorialScenario){this.board.setTutorialResourceTargets([]),this.board.setTutorialTileTargets([]);return}const e=this.tutorial.getStage();if(e==="upgrade"){const t=this.tutorialScenario.resourceCoords.filter(n=>!!_e(this.state,n.x,n.y)?.resource);this.board.setTutorialResourceTargets(t),this.board.setTutorialTileTargets([]);return}if(e==="train"){this.board.setTutorialResourceTargets([]);const t=this.tutorialScenario.capitalCoord,n=!!(this.selectedCoord&&this.selectedCoord.x===t.x&&this.selectedCoord.y===t.y);this.board.setTutorialTileTargets(n?[]:[t]);return}this.board.setTutorialResourceTargets([]),this.board.setTutorialTileTargets([])}focusTutorialCameraForStage(e){if(!this.state||!this.sceneManager)return;const t=this.tutorialScenario;if(!t)return;let n=null;e==="stars"||e==="upgrade"||e==="train"?n=t.capitalCoord:e==="move"?n={x:(t.capitalCoord.x+t.moveTargetCoord.x)*.5,y:(t.capitalCoord.y+t.moveTargetCoord.y)*.5}:(e==="combat"||e==="capture")&&(n=t.villageCoord),n&&this.sceneManager.focusOnWorld(ht(n.x,n.y,this.state.mapSize,0),!1)}isActionAllowedByTutorial(e){if(!this.tutorial.isActive())return!0;const t=this.tutorial.getStage(),n=this.tutorialScenario;if(!t||t==="intro"||t==="stars")return!1;if(t==="upgrade")return e.type==="CHOOSE_CITY_REWARD"?!0:e.type==="HARVEST_TILE"?n?n.resourceCoords.some(s=>s.x===e.coord.x&&s.y===e.coord.y):!0:!1;if(t==="move")return e.type!=="MOVE_UNIT"?!1:n?e.unitId===n.starterUnitId&&e.to.x===n.moveTargetCoord.x&&e.to.y===n.moveTargetCoord.y:!0;if(t==="combat")return e.type!=="ATTACK_UNIT"?!1:n?e.attackerId===n.starterUnitId&&e.defenderId===n.enemyUnitId:!0;if(t==="capture")return e.type!=="CAPTURE_CITY"?!1:n?e.unitId===n.starterUnitId:!0;if(t==="codex"){if(e.type!=="RESEARCH_TECH")return!1;const s=this.getTutorialTargetTechId();return!s||e.techId===s}if(t==="train"){if(e.type!=="TRAIN_UNIT"||e.unitType!=="warrior")return!1;if(!n||!this.state)return!0;const s=_e(this.state,n.capitalCoord.x,n.capitalCoord.y);return!s?.cityId||e.cityId===s.cityId}return t==="end_turn"?e.type==="END_TURN":!1}getTutorialNudgeForCurrentStage(){switch(this.tutorial.getStage()){case"stars":return"Not so fast, Commander! Tap “Got It!” above so we can grow your capital first.";case"upgrade":return"Easy does it! Harvest both resource tiles in your borders and pick a City Reward first.";case"move":return"Tap your unit at your capital and march onto the glowing blue ring to the east!";case"combat":return"Tap the red target ring on the rival warrior guarding that Village—send them packing!";case"capture":return"Don’t forget the prize! Tap the glowing Claim button on the Village to claim your second city.";case"codex":{const t=this.getTutorialTargetTechId(),n=t?kt[t]?.name:null;return n?`Crack open the Codex medallion in the bottom-left and research ${n}!`:"Crack open the Codex medallion in the bottom-left and research a technology!"}case"train":return"Tap your capital city, then tap Warrior to train a new recruit!";case"end_turn":return"Almost there! Tap End Turn in the bottom-right to finish your first turn of the Chronicle.";default:return"Finish this step of the Chronicle first, Commander!"}}getTutorialResourceInfo(e,t){let n=null;if(this.tutorialScenario)for(const s of this.tutorialScenario.resourceCoords){const r=_e(e,s.x,s.y);if(r?.resource){n=r.resource;break}}switch(n||(n=t.faction==="dwarves"?"ore":"berries"),n){case"game":return{resourceThumbKey:"game",resourceLabel:"Wild Game"};case"ore":return{resourceThumbKey:"ore",resourceLabel:"Ore Vein"};case"mithril":return{resourceThumbKey:"mithril",resourceLabel:"Mithril Vein"};case"berries":default:return{resourceThumbKey:"berries",resourceLabel:"Berries"}}}getTutorialTargetTechId(){if(!this.state)return null;const e=He(this.state,this.humanPlayerId);if(!e)return null;const t=mi(e.faction);return(t.find(s=>s.tier===1&&ta(this.state,e.id,s.id))??t.find(s=>ta(this.state,e.id,s.id)))?.id??null}syncTutorialContext(){if(!this.state)return;const e=He(this.state,this.humanPlayerId);if(!e)return;const{resourceThumbKey:t,resourceLabel:n}=this.getTutorialResourceInfo(this.state,e),s=this.getTutorialTargetTechId(),r=s?kt[s]?.name:void 0,a={faction:e.faction,resourceThumbKey:t,resourceLabel:n,targetTechId:s??void 0,targetTechName:r};this.tutorial.setContext(a)}computeTutorialSubProgress(e){return null}syncTutorialProgress(){const e=this.tutorial.getStage();e&&this.tutorial.setSubProgress(this.computeTutorialSubProgress(e))}advanceTutorialAfterAction(e,t){const n=this.tutorial.getStage();if(!(!n||n==="intro"||n==="complete")){if(n==="upgrade"){if(e.type==="HARVEST_TILE")this.syncTutorialContext(),this.syncTutorialProgress(),this.syncTutorialHighlights();else if(e.type==="CHOOSE_CITY_REWARD"){const s=Qt(t,this.humanPlayerId).find(r=>r.isCapital);s&&s.level>=2?(this.tutorial.setStage("move",null),this.focusTutorialCameraForStage("move"),this.tutorialScenario&&this.selectCoord(this.tutorialScenario.capitalCoord,"unit")):this.syncTutorialProgress()}return}if(n==="move"){e.type==="MOVE_UNIT"&&(this.tutorial.setStage("combat",null),this.focusTutorialCameraForStage("combat"),this.tutorialScenario&&this.selectCoord(this.tutorialScenario.moveTargetCoord,"unit"));return}if(n==="combat"){if(e.type==="ATTACK_UNIT"){const s=this.tutorialScenario;if(s){const r=t.units[s.starterUnitId],a=_e(t,s.villageCoord.x,s.villageCoord.y);if(r&&a){if(r.x!==s.villageCoord.x||r.y!==s.villageCoord.y){const o=_e(t,r.x,r.y);o&&o.unitId===r.id&&(o.unitId=null),r.x=s.villageCoord.x,r.y=s.villageCoord.y,a.unitId=r.id}r.canCapture=!0,r.actedThisTurn=!1,r.hasMoved=!1,r.hasAttacked=!1,this.board?.syncState(t,this.humanPlayerId),this.badges?.syncState(t,this.humanPlayerId,null)}}this.tutorial.setStage("capture",null),this.focusTutorialCameraForStage("capture"),s&&this.selectCoord(s.villageCoord,"unit")}return}if(n==="capture"){e.type==="CAPTURE_CITY"&&(this.clearSelection(),this.syncTutorialContext(),this.tutorial.setStage("codex",null),this.refreshHUD());return}if(n==="codex"){e.type==="RESEARCH_TECH"&&(this.techModal.close(),this.clearSelection(),this.tutorial.setStage("train",null),this.focusTutorialCameraForStage("train"),this.syncTutorialHighlights(),this.refreshHUD());return}n==="train"&&e.type==="TRAIN_UNIT"&&(this.clearSelection(),this.tutorial.setStage("end_turn",null),this.syncTutorialHighlights(),this.refreshHUD())}}async handleEndTurn(){if(!(!this.state||this.isBusy||this.isAITurnRunning)&&this.isHumanTurn()&&!(this.tutorial.isModalOpen()||this.resignationOverlay.isOpen()||this.ageUpModal.isOpen())&&(this.cancelSuperpowerTargeting(),!this.openNextPendingCityReward())){if(this.tutorial.isBlockingEndTurn()){ut("tap"),this.tutorial.nudge(this.getTutorialNudgeForCurrentStage());return}if(this.tutorial.isActive()&&this.tutorial.getStage()==="end_turn"){ut("victory"),this.ageUpModal.close(),this.techModal.close(),this.factionDossierModal.close(),this.leaderboardModal.close(),this.clearSelection(),this.pendingEndTurnAfterTutorial=!0,this.syncTutorialContext(),this.tutorial.completeAndCelebrate();return}ut("tap"),this.persistActiveCampaign(),await this.runAITurnSequence(!0)}}async runAITurnSequence(e){if(!this.state||this.isBusy||this.isAITurnRunning||this.state.phase!=="playing")return;const t=this.sessionToken;this.ageUpModal.close(),this.techModal.close(),this.factionDossierModal.close(),this.leaderboardModal.close(),this.clearSelection(),this.isAITurnRunning=!0,this.input?.setInputLocked(!0);let n=null;try{if(e){const l=nr(this.state,{type:"END_TURN"});if(this.state=l.state,this.animQueue&&l.events.length>0)try{await this.animQueue.playEvents(l.events,this.state,this.humanPlayerId,1.2)}catch(c){console.error("[AppController] End-turn animation failed:",c)}if(t!==this.sessionToken||!this.state||(this.sceneManager?.setEclipseMode((this.state.eclipseTurnsRemaining??0)>0),this.board?.syncState(this.state,this.humanPlayerId),this.badges?.syncState(this.state,this.humanPlayerId,null),this.refreshActionBar(),this.refreshTopBar(),await this.showEliminationNotices(l.events,this.state,t),t!==this.sessionToken||!this.state))return}const s=this.tutorial.isActive()&&this.tutorialScenario?this.tutorialScenario.enemyUnitId:null;let r=0,a=!1;const o=Math.max(12,this.state.players.length*3);for(;this.state&&this.state.phase==="playing"&&this.isHumanAlive()&&!fs(this.state).isHuman&&r<o;){r+=1;const l=fs(this.state);if(this.refreshTopBar(),await lb(110),t!==this.sessionToken||!this.state)return;let c;try{c=tb(this.state,l.id,this.state.config.difficulty)}catch(h){console.error("[AppController] planAITurn threw; skipping AI turn:",l.id,h),c=[{type:"END_TURN"}]}const d=s?c.filter(h=>!("unitId"in h&&h.unitId===s||"attackerId"in h&&h.attackerId===s)):c,u=d.length>0&&d[d.length-1].type==="END_TURN"?d:[...d,{type:"END_TURN"}];for(const h of u){if(t!==this.sessionToken||!this.state)return;if(this.state.phase!=="playing"||!this.isHumanAlive()||fs(this.state).id!==l.id)break;const f=this.state;let m,y;try{const v=nr(f,h);m=v.state,y=v.events}catch(v){if(console.error("[AppController] AI applyAction threw; skipping action:",h.type,v),h.type==="END_TURN")break;continue}this.state=m;const g=y.find(v=>v.type==="PLAYER_ELIMINATED"&&v.playerId===this.humanPlayerId);if(g&&(n=g.eliminatedByPlayerId),this.hasVisibleEventsForHuman(y,m)){if(a&&(this.board?.syncState(f,this.humanPlayerId),this.badges?.syncState(f,this.humanPlayerId,null),a=!1),this.focusOnVisibleAction(y,m),this.animQueue&&y.length>0)try{await this.animQueue.playEvents(y,m,this.humanPlayerId,1.5)}catch(v){console.error("[AppController] AI animation error; continuing turn:",v)}if(t!==this.sessionToken)return;if(this.sceneManager?.setEclipseMode((m.eclipseTurnsRemaining??0)>0),this.board?.syncState(m,this.humanPlayerId),this.badges?.syncState(m,this.humanPlayerId,null),!this.isHumanAlive()){this.handleHumanDefeated(n??l.id);return}if(this.refreshTopBar(),await this.showEliminationNotices(y,m,t),t!==this.sessionToken)return}else a=!0;if(!this.isHumanAlive()){this.board?.syncState(m,this.humanPlayerId),this.badges?.syncState(m,this.humanPlayerId,null),this.handleHumanDefeated(n??l.id);return}}if(t!==this.sessionToken||!this.state)return;if(!this.isHumanAlive()){this.handleHumanDefeated(n??l.id);return}this.state.phase==="playing"&&fs(this.state).id===l.id&&(this.state=nr(this.state,{type:"END_TURN"}).state,a=!0)}if(t!==this.sessionToken||!this.state)return;if(!this.isHumanAlive()){this.handleHumanDefeated(n);return}if(this.ensureTurnReturnedToHuman(n),!this.isHumanAlive()){this.handleHumanDefeated(n);return}if(this.isAITurnRunning=!1,this.readyUnitCycleIndex=0,this.sceneManager?.setEclipseMode((this.state.eclipseTurnsRemaining??0)>0),this.board?.syncState(this.state,this.humanPlayerId),this.badges?.syncState(this.state,this.humanPlayerId,null),this.state.phase==="playing"&&this.isHumanTurn()){const l=this.tutorial.getStage();l&&l!=="intro"&&l!=="complete"&&(this.syncTutorialProgress(),this.focusTutorialCameraForStage(l))}this.refreshHUD(),this.checkPostActionState()}catch(s){if(console.error("[AppController] Unexpected error during AI turn; recovering:",s),t===this.sessionToken&&this.state){if(this.isAITurnRunning=!1,!this.isHumanAlive()){this.handleHumanDefeated(n);return}if(this.ensureTurnReturnedToHuman(n),!this.isHumanAlive()){this.handleHumanDefeated(n);return}this.sceneManager?.setEclipseMode((this.state.eclipseTurnsRemaining??0)>0),this.board?.syncState(this.state,this.humanPlayerId),this.badges?.syncState(this.state,this.humanPlayerId,null),this.refreshHUD(),this.checkPostActionState()}}finally{t===this.sessionToken&&(this.isAITurnRunning=!1,this.state?.phase==="playing"&&(this.input?.setInputLocked(!1),this.refreshHUD()))}}hasVisibleEventsForHuman(e,t){const n=He(t,this.humanPlayerId);if(!n)return!0;const s=r=>!!n.revealedTiles[Ve(r.x,r.y,t.mapSize)];for(const r of e)switch(r.type){case"PLAYER_ELIMINATED":case"GAME_OVER":case"CITY_CAPTURED":case"SUPERPOWER_USED":return!0;case"TILES_REVEALED":if(r.playerId===this.humanPlayerId&&r.coords.length>0)return!0;break;case"UNIT_MOVED":case"UNIT_ATTACKED":if(s(r.from)||s(r.to))return!0;break;case"UNIT_HEALED":case"UNIT_PROMOTED":case"UNIT_TRAINED":case"RESOURCE_HARVESTED":case"IMPROVEMENT_BUILT":case"ROAD_BUILT":case"FOREST_CHOPPED":case"WOODS_PLANTED":case"RUINS_CLAIMED":case"CITY_LEVELED":case"CITY_REWARD_APPLIED":case"SPOILS_GAINED":if(s(r.coord))return!0;break}return!1}async showEliminationNotices(e,t,n){const s=e.filter(r=>r.type==="PLAYER_ELIMINATED");if(s.length!==0)for(const r of s){if(n!==this.sessionToken)return;if(r.playerId===this.humanPlayerId){this.handleHumanDefeated(r.eliminatedByPlayerId);return}if(t.phase!=="playing")continue;const a=He(t,r.playerId),o=He(t,r.eliminatedByPlayerId);if(a&&o){const l=r.eliminatedByPlayerId===this.humanPlayerId;l&&ut("victory"),this.pauseSceneBehindOpaqueSheet();try{await this.defeatNoticeModal.show(a.faction,o.faction,!1,l)}finally{this.resumeSceneAfterOpaqueSheet()}}}}focusOnVisibleAction(e,t){if(!this.sceneManager)return;const n=He(t,this.humanPlayerId);if(n){for(const s of e)if(s.type==="UNIT_ATTACKED"){const r=n.revealedTiles[Ve(s.to.x,s.to.y,t.mapSize)],a=n.revealedTiles[Ve(s.from.x,s.from.y,t.mapSize)];if(r||a){this.sceneManager.focusOnWorld(ht(s.to.x,s.to.y,t.mapSize,0),!1);return}}else if(s.type==="CITY_CAPTURED"){if(n.revealedTiles[Ve(s.coord.x,s.coord.y,t.mapSize)]){this.sceneManager.focusOnWorld(ht(s.coord.x,s.coord.y,t.mapSize,0),!1);return}}else if(s.type==="SUPERPOWER_USED"&&s.target&&n.revealedTiles[Ve(s.target.x,s.target.y,t.mapSize)]){this.sceneManager.focusOnWorld(ht(s.target.x,s.target.y,t.mapSize,0),!1);return}}}checkPostActionState(){if(this.state){if(!this.isHumanAlive()){this.handleHumanDefeated(this.state.winnerId);return}if(this.state.phase==="game_over"){ir(),this.cancelSuperpowerTargeting(),this.tutorial.hide(),this.topBar.hide(),this.ageUpModal.close(),this.techModal.close(),this.cityRewardModal.close(),this.factionDossierModal.close(),this.leaderboardModal.close(),this.hideRewardToast(),this.actionBar.hide(),this.clearSelection(),this.input?.setInputLocked(!0),this.gameOverOverlay.show({state:this.state,humanPlayerId:this.humanPlayerId});return}this.persistActiveCampaign(),this.isHumanTurn()&&this.openNextPendingCityReward()}}openNextPendingCityReward(){if(!this.state||this.cityRewardModal.isOpen())return!1;const e=He(this.state,this.humanPlayerId);if(!e)return!1;const t=Qt(this.state,this.humanPlayerId).find(s=>s.pendingLevelRewards.length>0);if(!t)return!1;this.cancelSuperpowerTargeting();const n=this.tutorial.isActive()&&this.tutorial.getStage()==="upgrade";return n&&this.tutorial.setSuppressed(!0),this.cityRewardModal.open({city:t,levelReached:t.pendingLevelRewards[0],faction:e.faction,tutorialMode:n}),this.pauseSceneBehindOpaqueSheet(),!0}openTechModal(){if(!this.state||this.state.phase!=="playing"||this.isBusy||this.isAITurnRunning)return;if(this.tutorial.isActive()&&this.tutorial.getStage()!=="codex"){ut("tap"),this.tutorial.nudge(this.getTutorialNudgeForCurrentStage());return}ut("tap"),this.cancelSuperpowerTargeting(),this.factionDossierModal.close(),this.leaderboardModal.close();const e=this.buildTechModalViewModel();e&&(this.pauseSceneBehindOpaqueSheet(),this.techModal.open(e))}handleUnlockTechRequest(e){if(!this.state||this.state.phase!=="playing"||this.isBusy||this.isAITurnRunning)return;if(this.tutorial.isActive()&&this.tutorial.getStage()!=="codex"){ut("tap"),this.tutorial.nudge(this.getTutorialNudgeForCurrentStage());return}ut("tap"),this.cancelSuperpowerTargeting(),this.factionDossierModal.close(),this.leaderboardModal.close();const t=this.buildTechModalViewModel();t&&(this.pauseSceneBehindOpaqueSheet(),this.techModal.openToTech(t,e))}pauseSceneBehindOpaqueSheet(){window.EldermereAndroid&&this.sceneManager?.stop()}resumeSceneAfterOpaqueSheet(){window.EldermereAndroid&&(this.shouldKeepScenePausedForAndroid()||this.sceneManager?.start())}openFactionDossier(e){if(!this.state||this.state.phase!=="playing")return;ut("tap"),this.cancelSuperpowerTargeting(),this.techModal.close(),this.leaderboardModal.close();const t=this.buildFactionDossierViewModel();t&&(this.pauseSceneBehindOpaqueSheet(),this.factionDossierModal.open(t,e))}openLeaderboardModal(){if(!this.state||this.state.phase!=="playing")return;ut("tap"),this.cancelSuperpowerTargeting(),this.techModal.close(),this.factionDossierModal.close();const e=this.buildLeaderboardViewModel();e&&(this.pauseSceneBehindOpaqueSheet(),this.leaderboardModal.open(e))}buildLeaderboardViewModel(){if(!this.state)return null;const e=He(this.state,this.humanPlayerId);return{entries:Kf(this.state),turn:this.state.turn,maxTurns:this.state.config.maxTurns,age:e?An(e):1,tutorialActive:this.tutorial.isActive()}}showRuinsRewardToast(e,t){let n="";if(e.rewardKind==="gold")n=`<strong class="toast-reward-highlight">+${e.amount??5}${se("star","icon icon-sm icon-star")}</strong><span>Treasury Found</span>`;else if(e.rewardKind==="tech")n=`<strong class="toast-reward-highlight">${(e.techId?kt[e.techId]?.name??e.techId:"Ancient Lore").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</strong><span>Lore Unlocked</span>`;else{const s=e.amount??3,r=e.cityId?t.cities[e.cityId]?.name:void 0,a=r?r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):"Nearest City";n=`<strong class="toast-reward-highlight">+${s} Pop</strong><span>to ${a}</span>`}this.rewardToastEl.innerHTML=`
      <span class="toast-ruins-icon">${se("ruins","icon")}</span>
      <span class="toast-ruins-body">
        <span class="toast-ruins-kicker">Ancient Ruins Explored</span>
        <span class="toast-ruins-line">${n}</span>
      </span>
    `,this.rewardToastEl.classList.remove("hidden","toast-show"),this.rewardToastEl.offsetWidth,this.rewardToastEl.classList.add("toast-show"),this.rewardToastTimer!==null&&window.clearTimeout(this.rewardToastTimer),this.rewardToastTimer=window.setTimeout(()=>{this.hideRewardToast()},3e3)}hideRewardToast(){this.rewardToastTimer!==null&&(window.clearTimeout(this.rewardToastTimer),this.rewardToastTimer=null),this.rewardToastEl.classList.remove("toast-show"),this.rewardToastEl.classList.add("hidden")}buildFactionDossierViewModel(){if(!this.state)return null;const e=He(this.state,this.humanPlayerId);return e?{humanPlayer:e,allPlayers:this.state.players}:null}buildTechModalViewModel(){if(!this.state)return null;const e=He(this.state,this.humanPlayerId);if(!e)return null;const t=mi(e.faction),n={};for(const r of t)n[r.id]=ma(this.state,e.id,r.id);const s=this.tutorial.isActive()&&this.tutorial.getStage()==="codex"?this.getTutorialTargetTechId():null;return{player:e,state:this.state,cityCount:Qt(this.state,e.id).length,isHumanTurn:this.isHumanTurn(),techCosts:n,tutorialTargetTechId:s}}refreshHUD(){if(this.refreshTopBar(),this.refreshActionBar(),this.techModal.isOpen()){const e=this.buildTechModalViewModel();e&&this.techModal.update(e)}if(this.factionDossierModal.isOpen()){const e=this.buildFactionDossierViewModel();e&&this.factionDossierModal.update(e)}if(this.leaderboardModal.isOpen()){const e=this.buildLeaderboardViewModel();e&&this.leaderboardModal.update(e)}}refreshTopBar(){if(!this.state)return;if(this.state.phase!=="playing"){this.topBar.hide();return}const e=He(this.state,this.humanPlayerId);if(!e)return;const t=fs(this.state),n=t.id===e.id&&this.state.phase==="playing";this.topBar.update({player:e,activePlayer:t,turn:this.state.turn,maxTurns:this.state.config.maxTurns,age:An(e),techCount:e.techs.length,canUseSuperpower:ea(this.state,e.id),superpowerUsed:!!e.superpowerUsed,superpowerName:ba[e.faction].shortLabel,superpowerTargeting:this.isSuperpowerTargeting,isHumanTurn:n})}refreshActionBar(){if(!this.state||this.state.phase!=="playing"){this.actionBar.hide();return}const e=He(this.state,this.humanPlayerId);if(!e)return;const t=this.isHumanTurn(),s=mi(e.faction).filter(b=>ta(this.state,e.id,b.id)).length,r=this.getReadyHumanUnits().length,a=this.tutorial.isActive()?this.tutorial.getStage():null,o=a==="end_turn",l=a==="codex"?"tech":a==="end_turn"?"end-turn":null,c=a==="upgrade"?"harvest":a==="capture"?"capture-city":a==="train"?"train_warrior":null,d=r===0||o,u=this.buildCombatPreview(),h=!this.tutorial.isActive()&&ea(this.state,this.humanPlayerId),f=ba[e.faction];if(!this.selectedCoord){this.actionBar.update({isHumanTurn:t,playerFaction:e.faction,playerGold:e.gold,hasAffordableTech:s>0,affordableTechCount:s,remainingUnitsCount:r,allUnitsActed:d,canUseSuperpower:h,superpowerTargeting:this.isSuperpowerTargeting,superpowerLabel:f.shortLabel,selectionLayer:"unit",canToggleLayer:!1,altLayerLabel:"Tile",selectedUnit:null,selectedCity:null,selectedTile:null,combatPreview:u,tutorialTargetIdleAction:l,tutorialTargetActionId:c});return}const m=_e(this.state,this.selectedCoord.x,this.selectedCoord.y);if(!m)return;const y=this.getUnitAtCoord(this.selectedCoord),g=y?this.buildSelectedUnitInfo(y.id):null,p=m.isCityCenter&&m.cityId?this.buildSelectedCityInfo(m.cityId):null,v=this.buildSelectedTileInfo(m,e),w=!!(y&&this.hasTileUnderlay(m,e)),_=p?"City":"Tile",M={isHumanTurn:t,playerFaction:e.faction,playerGold:e.gold,hasAffordableTech:s>0,affordableTechCount:s,remainingUnitsCount:r,allUnitsActed:d,selectionLayer:this.selectionLayer,canToggleLayer:w,altLayerLabel:_,selectedUnit:g,selectedCity:p,selectedTile:v,combatPreview:u,tutorialTargetIdleAction:l,tutorialTargetActionId:c};this.actionBar.update(M)}buildCombatPreview(){if(!this.state||this.selectionLayer!=="unit"||!this.selectedUnitId||!this.hoveredCoord||!this.isHumanTurn()||!this.validAttacks.some(c=>c.x===this.hoveredCoord.x&&c.y===this.hoveredCoord.y))return null;const t=_e(this.state,this.hoveredCoord.x,this.hoveredCoord.y);if(!t?.unitId)return null;const n=this.state.units[this.selectedUnitId],s=this.state.units[t.unitId];if(!n||!s||s.ownerId===n.ownerId)return null;const r=He(this.state,n.ownerId),a=He(this.state,s.ownerId);if(!r||!a)return null;const o=mo(this.state,n.id,s.id),l=!!(t.isCityCenter||t.hasVillage);return{preview:o,attacker:n,attackerOwner:r,defender:s,defenderOwner:a,targetIsCityOrVillage:l}}buildSelectedUnitInfo(e){if(!this.state)return null;const t=this.state.units[e];if(!t)return null;const n=He(this.state,t.ownerId);if(!n)return null;const s=_e(this.state,t.x,t.y),r=mt[t.type],a=r.movement>0&&n.faction==="humans"&&s?.hasRoad?1:0,o=n.techs.includes("humans_ride_of_rohirrim")&&(t.type==="rider"||t.type==="rohirrim_knight")?1:0,l=r.movement>0&&n.faction==="elves"&&(this.state.eclipseTurnsRemaining??0)>0&&this.state.eclipseOwnerId===n.id?1:0,c=t.ownerId===this.humanPlayerId,d=c?np(this.state,t.id):[],u=this.tutorial.isActive()?d.filter(h=>!!(h.action&&this.isActionAllowedByTutorial(h.action))):d;return{unit:t,owner:n,isOwnedByHuman:c,effectiveAttack:Lo(this.state,t),effectiveDefense:Do(this.state,t),effectiveMovement:r.movement+a+o+l,actions:u}}buildSelectedCityInfo(e){if(!this.state)return null;const t=this.state.cities[e];if(!t)return null;const n=He(this.state,t.ownerId);if(!n)return null;const s=t.ownerId===this.humanPlayerId,r=aa(this.state,t.id),a=Rs(this.state,t),l=!!_e(this.state,t.x,t.y)?.unitId,c=t.level+(t.isCapital?1:0)+(t.hasWorkshop?1:0)+t.parks+(t.connectedToCapital&&!t.isCapital&&n.faction==="humans"?1:0)+(t.level>=3&&n.techs.includes("humans_granaries")?1:0)+(t.hasWalls&&n.techs.includes("humans_citadel_masonry")?1:0)+(n.techs.includes("humans_stewards_citadel")?1:0)+(n.techs.includes("dwarves_deep_vaults")?1:0),d=s?tp(this.state,t.id):[],u=this.tutorial.isActive()?d.filter(h=>!!(h.action&&this.isActionAllowedByTutorial(h.action))):d;return{city:t,owner:n,isOwnedByHuman:s,unitCount:r,unitCap:a,income:c,popNeeded:t.level+1,occupiedByUnit:l,trainOptions:u}}buildSelectedTileInfo(e,t){const n=this.state,s=!!t.revealedTiles[Ve(e.x,e.y,n.mapSize)];let r=1;e.terrain==="mountain"?r=t.faction==="dwarves"?1.75:1.5:(e.terrain==="forest"||e.terrain==="ancient_woods")&&(r=1.5),e.isCityCenter&&e.cityId&&n.cities[e.cityId]?.hasWalls&&(r=2);const a=md(n,t.id,e.x,e.y),o=this.tutorial.isActive()?a.filter(l=>!!(l.action&&this.isActionAllowedByTutorial(l.action))):a;return{tile:e,terrainName:ob[e.terrain],defenseBonus:r,isRevealed:s,actions:o}}}function bh(){const i=document.getElementById("canvas-container"),e=document.getElementById("world-badges"),t=document.getElementById("hud-root");if(!i||!e||!t)throw new Error("Missing required root DOM containers (#canvas-container, #world-badges, #hud-root)");new cb(i,e,t)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",bh):bh();
//# sourceMappingURL=index-CkMcnkWZ.js.map
