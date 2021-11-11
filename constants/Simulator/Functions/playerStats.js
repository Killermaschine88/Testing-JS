const level = require('./skilllvl.js');

async function playerStats(player) {
	// Events
	const collection = mmclient.db('SkyblockSim').collection('events');
	const events = await collection.find({}).toArray();
	const mf_event = events.find(event => event._id == 'magic_find');

	// Base Variables
	const { stats } = player.data;
	const cookie = player.data.misc.booster_cookie.active;
	let inv = '',
	 inv2 = '',
	 inv3 = '',

		// Skill Levels
	 farminglvl = level(player.data.skills.farming).level,
	 fishinglvl = level(player.data.skills.fishing).level,
	 mininglvl = level(player.data.skills.mining).level,
	 combatlvl = level(player.data.skills.combat).level,
	 foraginglvl = level(player.data.skills.foraging).level,
	 dunglvl = level(player.data.dungeons.xp).level,

		// Base Stats
	 { health } = stats,
	 { defense } = stats,
	 { damage } = stats,
	 { strength } = stats,
	 { crit_chance } = stats,
	 { crit_damage } = stats,
	 { magic_find } = stats,
	 { sea_creature_chance } = stats,
	 { mining_speed } = stats,
	 { mining_fortune } = stats;

	inv = player.data.equipment.combat;
	inv2 = player.data.equipment.fishing;
	inv3 = player.data.equipment.mining;

	health += inv.armor.health + farminglvl * 2 + fishinglvl * 2 + dunglvl * 3;

	defense += inv.armor.defense + mininglvl * 2;

	damage += inv.sword.damage;

	strength += inv.sword.strength + inv.armor.strength + foraginglvl * 2;

	crit_chance += inv.sword.crit_chance + inv.armor.crit_chance + combatlvl / 2;

	crit_damage += inv.sword.crit_damage + inv.armor.crit_damage;

	sea_creature_chance += inv2.rod.sea_creature_chance + fishinglvl / 2 + inv.armor.sea_creature_chance;

	magic_find += inv.armor.magic_find;

	mining_speed += mininglvl + inv3.pickaxe.mining_speed;
	mining_fortune += mininglvl / 2 + inv3.pickaxe.mining_fortune;

	// Adding Stats for Events
	if (mf_event.enabled == true) {
		magic_find += 15;
	}

	// reforge bonuses
	// sword
	if (inv.sword.recombobulated == true) {
		damage += inv.sword.damage * 1.1 - inv.sword.damage;
		console.log(damage);
		strength += inv.sword.strength * 1.1 - inv.sword.strength;
		crit_chance += inv.sword.crit_chance * 1.1 - inv.sword.crit_chance;
		crit_damage += inv.sword.crit_damage * 1.1 - inv.sword.crit_damage;
	}

	// armor
	if (inv.armor.recombobulated == true) {
		health += inv.armor.health * 1.1 - inv.armor.health;
		defense += inv.armor.defense * 1.1 - inv.armor.defense;
		strength += inv.armor.strength * 1.1 - inv.armor.strength;
		crit_chance += inv.armor.crit_chance * 1.1 - inv.armor.crit_chance;
		crit_damage += inv.armor.crit_damage * 1.1 - inv.armor.crit_damage;
		sea_creature_chance += inv.armor.sea_creature_chance * 1.1 - inv.armor.sea_creature_chance;
		magic_find += inv.armor.magic_find * 1.1 - inv.armor.magic_find;
	}

	// rod
	if (inv2.rod.recombobulated == true) {
		sea_creature_chance += inv2.rod.sea_creature_chance * 1.1 - inv2.rod.sea_creature_chance;
	}

	// pickaxe
	if (inv3.pickaxe.recombobulated == true) {
		mining_fortune += inv3.pickaxe.mining_fortune * 1.1 - inv3.pickaxe.mining_fortune;
		mining_speed += inv3.pickaxe.mining_speed * 1.1 - inv3.pickaxe.mining_speed;
	}

	// Add Booster Cookie Stats
	if (cookie == true) {
		health = Math.floor(health * 1.1);
		defense = Math.floor(defense * 1.1);
		damage = Math.floor(damage * 1.1);
		strength = Math.floor(strength * 1.1);
		crit_chance = Math.floor(crit_chance * 1.1);
		crit_damage = Math.floor(crit_damage * 1.1);
		magic_find += 10;
		magic_find = Math.floor(magic_find * 1.1);
		sea_creature_chance = Math.floor(sea_creature_chance * 1.1);
		mining_speed = Math.floor(mining_speed * 1.1);
		mining_fortune = Math.floor(mining_fortune * 1.1);
	}

	health = Math.floor(health * (1 + defense / 100));

	return {
		health,
		defense,
		damage,
		strength,
		crit_chance,
		crit_damage,
		magic_find,
		sea_creature_chance,
		mining_speed,
		mining_fortune,
	};
}

module.exports = playerStats;
