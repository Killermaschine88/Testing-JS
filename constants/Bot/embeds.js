const COLORS = {
	ZOMBIE_GREEN: '#698362',
	LIGHT_BLUE: '#87CEEB',
	DEEP_GREY: '#4A4A4A',
	ORANGE: '#F76806',
	PURPUR: '#A171A4',
	BLACK: '#0A0A0A',
	WHITE: '#F0F0F0',
	GOLD: '#FFD700',
	GREY: '#BFBFBD',
};

const getColor = (player) => {
	const { location } = player.data.misc;

	if (typeof location !== 'string')
		throw new TypeError(
			`Argument for location must be of type string (reading "${typeof location}")`
		);

	switch (location) {
		case 'Slimehill':
		case "Pigman's Den":
			return COLORS.ZOMBIE_GREEN;

		case 'Diamond Reserve':
		case 'Crystal Hollows':
		case 'Lapis Quarry':
			return COLORS.LIGHT_BLUE;

		case 'Gunpowder Mines':
		case 'Dwarven Mines':
		case 'Deep Caverns':
			return COLORS.DEEP_GREY;

		case 'Blazing Fortress':
		case 'Molten Castle':
		case 'Molten Bridge':
		case 'Lava Field':
			return COLORS.ORANGE;

		case 'The End':
			return COLORS.PURPUR;

		case 'Obsidian Sanctuary':
		case 'Coal Mine':
			return COLORS.BLACK;

		case 'Lower Spiders Hill':
		case 'Upper Spiders Hill':
		case "Spider's Den":
		case 'Spider Cave':
		case 'Highlevel':
			return COLORS.WHITE;

		case 'Gold Mine':
			return COLORS.GOLD;

		case 'Hub':
		case 'Graveyard':
		case 'Ruins':
			return COLORS.GREY;

		default:
			return COLORS.WHITE;
	}
};

const getFooter = (player) => {
	const { location } = player.data.misc;

	if (typeof location !== 'string')
		throw new TypeError(
			`Argument for location must be of type string (reading "${typeof location}")`
		);

	return `Skyblock Simulator • ${location}`;
};

module.exports = { getColor, getFooter, COLORS };
