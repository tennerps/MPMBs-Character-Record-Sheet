/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Monk, called "Way of the Jedi"
				This subclass has been made by /u/SpiketailDrake
				This code uses version 2.2 of the subclass from 2016-03-19, found here: https://redd.it/4b41ro/

	Code by:	Lily K. & MorePurpleMoreBetter
	Date:		2017-11-29 (sheet v12.999)
				2023-05-12 (updated to v13.1.6)
*/

var iFileName = "Monk - Way of the Jedi [SpiketailDrake's work, transcribed by Lily K. & MPMB].js";
RequiredSheetVersion("13.2.1");

SourceList["SD:WotJ"] = {
	name : "SpiketailDrake: Way of the Jedi (v2.2)",
	abbreviation : "SD:WotJ",
	group : "Reddit/r/UnearthedArcana",
	url : "https://criticalkits.wordpress.com/wp-content/uploads/2016/02/wayofthejedi_latestversion.pdf",
	date : "2016/03/19"
};

AddSubClass("monk", "jedi-spiketaildrake", {
	regExpSearch : /jedi/i,
	subname : "Way of the Jedi",
	fullname : "Jedi Monk",
	source : [["SD:WotJ", 1]],
	spellcastingFactor : 3,
	spellcastingList : {
		spells: ["friends", "guidance", "mage hand", "mending", "message", "minor illusion", "shocking grasp", "true strike", "absorb elements", "animal friendship", "bane", "bless", "catapult", "charm person", "comprehend languages", "command", "cure wounds", "detect magic", "force lightning", "force push", "force repulse", "heroism", "jump", "longstrider", "shield", "aid", "blur", "calm emotions", "darkvision", "detect thoughts", "enhance ability", "enthrall", "force choke", "hold person", "knock", "lesser restoration", "levitate", "locate object", "magic weapon", "saber throw", "see invisibility", "suggestion", "aura of vitality", "beacon of hope", "call lightning", "clairvoyance", "crusader's mantle", "fear", "force blast", "haste", "hypnotic pattern", "nondetection", "plant growth", "protection from energy", "revivify", "sending", "tongues", "vampiric touch", "aura of life", "aura of purity", "compulsion", "confusion", "death ward", "dominate beast", "freedom of movement", "hallucinatory terrain", "locate creature"]
	},
	spellcastingKnown : {
		cantrips : [0, 0, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13]
	},
	features : {
		"subclassfeature3": {
			name : "Spellcasting",
			source : [["SD:WotJ", 1]],
			minlevel : 3,
			description : desc("I can cast known Jedi cantrips/spells, using Wisdom as my spellcasting ability"),
			additional : levels.map(function (n, idx) {
				if (n < 3) return "";
				var cantr = [0, 0, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4][idx];
				var splls = [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13][idx];
				return cantr + " cantrips \u0026 " + splls + " spells known";
			})
		},
		"subclassfeature3.1": {
			name : "Lightsaber",
			source : [["SD:WotJ", 2]],
			minlevel : 3,
			description : desc([
				"With an 1 hour ritual, I make an one-handed melee weapon into a lightsaber (max 2)"
			]),
			additional : "Magic weapon retains magic properties",
			weaponProfs : [false, false, ["lightsaber"]],
			weaponOptions : [{
				regExpSearch : /lightsaber/i,
				name : "Lightsaber",
				source: [["SD:WotJ", 2]],
				ability : 1,
				type : "Martial",
				damage : [1, 6, "radiant"],
				range : "Melee",
				description : "Finesse, light; Emits dim light in 15-ft radius",
				abilitytodamage : true,
				monkweapon : true,
				selectNow : true
			}]
		},
		"subclassfeature6": {
			name : "Window of Opportunity",
			source : [["SD:WotJ", 2]],
			minlevel : 6,
			description : desc([
				"When a creature misses me with a ranged attack or I succeed on a Dex save vs. its spell,",
				"it has disadv. on its next save vs. one of my spells, until the end of my next turn"
			]),
			"bladeweaving": {
				name : "Bladeweaving",
				extraname : "Way of the Jedi 11",
				source : [["SD:WotJ", 2]],
				description : " [2 ki points]" + desc([
					"As a bonus action after Attack action with my lightsaber, I can cast a spell (time: 1 act.)"
				]),
				action : [["bonus action", " (after Attack action)"]]
			},
			autoSelectExtrachoices : [{
				extrachoice : "bladeweaving",
				minlevel : 11
			}]
		},
		"subclassfeature17": {
			name : "Shatterpoint",
			source : [["SD:WotJ", 2]],
			minlevel : 17,
			description : desc([
				"As a bonus action, my next attack on a target in 10 ft crits, ignoring resist./immune"
			]),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", ""]]
		}
	}
});

//add the force spells the Jedi can use
SpellsList["force blast"] = {
	name : "Force Blast",
	classes : [],
	source : [["SD:WotJ", 4]],
	level : 3,
	school : "Evoc",
	time : "1 a",
	range : "30-ft cone",
	components : "S",
	duration : "Instantaneous",
	save : "Str",
	description : "5d8+1d8/SL Force dmg, push 20 ft, prone; save halves & not pushed/prone; unsecured obj moved",
	descriptionFull : "A blast of pure Force-energy erupts from your hands. Each creature in a 30-foot cone originating from you must make a Strength saving throw. On a failed save, a creature takes 5d8 force damage and is pushed 20 feet away from you and knocked prone. On a successful save, the creature takes half as much damage and isn't pushed or knocked prone." + "\n   " + "In addition, unsecured objects that are completely within the area of effect are automatically pushed 20 feet away from you by the spell's effect." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d8 for each slot level above 3rd."
};
SpellsList["force choke"] = {
	name : "Force Choke",
	classes : [],
	source : [["SD:WotJ", 4]],
	level : 2,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "S",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "1+1/SL crea save or stunned and start of each turn 1d10 Force dmg; extra save at end of each turn",
	descriptionFull : "Choose a humanoid that you can see within range. The target must succeed on a Wisdom saving throw or be stunned for the duration. At the beginning of each of its turns, the target takes 1d10 force damage. At the end of each of its turns, the target can make another Wisdom saving throw. On a success, the spell ends on the target." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional humanoid for each slot level above 2nd. The humanoids must be within 30 feet of each other when you target them."
};
SpellsList["force lightning"] = {
	name : "Force Lightning",
	classes : [],
	source : [["SD:WotJ", 4]],
	level : 1,
	school : "Evoc",
	time : "1 a",
	range : "30 ft",
	components : "S",
	duration : "Conc, 1 min",
	description : "1+1/SL targets; Each ranged atk for 1d12 Lightning dmg, move half, -2 AC/Dex saves, no rea, ee B",
	descriptionFull : "A beam of crackling, blue energy lances out toward a creature within range, forming a sustained arc of lightning between you and the target. Make a ranged spell attack against that creature. On a hit, the target takes 1d12 lightning damage, and for the duration its movement speed is halved, it takes a -2 penalty to AC and Dexterity saving throws, and it can't use reactions." + "\n   " + "On each of your turns for the duration, you can use your action to deal 1d12 lightning damage to the target automatically. The spell ends if you use your action to do anything else. The spell also ends if the target is ever outside the spell's range or if it has total cover from you." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional humanoid for each slot level above 2nd. The humanoids must be within 30 feet of each other when you target them."
};
SpellsList["force push"] = {
	name : "Force Push",
	classes : [],
	source : [["SD:WotJ", 4]],
	level : 1,
	school : "Evoc",
	time : "1 a",
	range : "30 ft",
	components : "S",
	duration : "Instantaneous",
	save : "Str",
	description : "1 creature save or pushed 20 ft away and knocked prone",
	descriptionFull : "You slam a concussive burst of force at one creature within range. The target must make a Strength saving throw. On a failed save, the target is pushed 20 feet away from you and knocked prone. On a successful save, the creature isn't pushed or knocked prone."
};
SpellsList["force repulse"] = {
	name : "Force Repulse",
	classes : [],
	source : [["SD:WotJ", 5]],
	level : 1,
	school : "Evoc",
	time : "1 a",
	range : "15-ft rad",
	components : "S",
	duration : "Instantaneous",
	save : "Str",
	description : "2d8+1d8/SL Force dmg and pushed 10 ft; save halves & not pushed; unsecured obj move 10 ft",
	descriptionFull : "A 15-foot sphere of pure Force-energy pulses outward from you. Each creature in a 15-foot radius around you must make a Strength saving throw. On a failed save, a creature takes 2d8 force damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much damage and isn't pushed." + "\n   " + "In addition, unsecured objects that are completely within the are of effect are automatically pushed 10 feet away from you by the spell's effect." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st."
};
SpellsList["saber throw"] = {
	name : "Saber Throw",
	classes : [],
	source : [["SD:WotJ", 5]],
	level : 2,
	school : "Trans",
	time : "1 a",
	range : "30-ft line",
	components : "S,M",
	compMaterial : "A lightsaber",
	duration : "Instantaneous",
	save : "Dex",
	description : "30-ft long 5-ft wide line all creatures 3d8+1d8/SL Radiant dmg; save halves",
	descriptionFull : "You toss your lightsaber, sending it spinning through the air in a line 30 feet long and 5 feet wide in a direction you choose before. Each creature in the line must make a Dexterity saving throw. A creature takes 3d8 radiant damage on a failed save, or half as much damage on a successful one. The lightsaber then returns back to your hand." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd."
};
