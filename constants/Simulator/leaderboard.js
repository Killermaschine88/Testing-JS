/**
 * The possible leaderboard types
 */
const TYPES = {
	COINS: {
		name: 'Coins',
		value: 'coins',
		data: 'data.profile.coins',
		emote: '<:coins:861974605203636253>',
	},
	COMBAT: {
		name: 'Combat-XP',
		value: 'combatxp',
		data: 'data.skills.combat',
		emote: '<:combat:852069714527911956>',
	},
	FISHING: {
		name: 'Fishing-XP',
		value: 'fishingxp',
		data: 'data.skills.fishing',
		emote: '<:fishing:852069714359877643>',
	},
	MINING: {
		name: 'Mining-XP',
		value: 'miningxp',
		data: 'data.skills.mining',
		emote: '<:mining:852069714577719306>',
	},
	ASSASSIN: {
		name: 'Assassin-XP',
		value: 'assassinxp',
		data: 'data.dungeons.class.available.assassin.xp',
		emote: '🗡️',
	},
	TANK: {
		name: 'Tank-XP',
		value: 'tankxp',
		data: 'data.dungeons.class.available.tank.xp',
		emote: '<:tank:852079613051666472>',
	},
	BERSERKER: {
		name: 'Berserker-XP',
		value: 'berserkerxp',
		data: 'data.dungeons.class.available.berserker.xp',
		emote: '<:berserker:852079613052059658>',
	},
};

/**
 * This method is used to get a specific leaderboard type from a value.
 *
 * @param {*} type Leaderboard Type
 * @returns A specific leaderboard type
 */
const GetType = (type) => {
	switch (type) {
		case TYPES.COINS.value: {
			return TYPES.COINS;
		}
		case TYPES.COMBAT.value: {
			return TYPES.COMBAT;
		}
		case TYPES.FISHING.value: {
			return TYPES.FISHING;
		}
		case TYPES.MINING.value: {
			return TYPES.MINING;
		}
		case TYPES.ASSASSIN.value: {
			return TYPES.ASSASSIN;
		}
		case TYPES.TANK.value: {
			return TYPES.TANK;
		}
		case TYPES.BERSERKER.value: {
			return TYPES.BERSERKER;
		}
		default: {
			return null;
		}
	}
};

module.exports = {
	TYPES,
	GetType,
};
