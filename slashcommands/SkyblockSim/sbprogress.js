const Discord = require('discord.js');
const { getFooter, getColor } = require('../../constants/Bot/embeds.js')

module.exports = {
	name: 'sbprogress',
	description: 'a',
	usage: 'sbsettings (Setting Name)',
	perms: 'None',
	folder: 'SkyblockSim',
	aliases: [],
	cooldown: 10,
	async execute(interaction, mclient) {
		const collection = mclient.db('SkyblockSim').collection('Players');

		if (interaction.options.getUser('user') != null) {
			var id = interaction.options.getUser('user').id;
		} else {
			var id = interaction.user.id;
		}

		var player = await collection.findOne({ _id: id });

		if (player == null) {
			const noprofile = new Discord.MessageEmbed()
				.setColor('RED')
				.setTitle('No profile found')
				.setDescription(`The specified user hasn\'t played Skyblock Simulator yet.`);
			interaction.editReply({ embeds: [noprofile] });
			return;
		}

		let embed = new Discord.MessageEmbed()
			.setDescription(`**Skyblock Simulator progress for <@!${id}>**`)
			.setColor(getColor(player))
			.setFooter(getFooter(player));

		//Skills Completion
		let lvl50xp = 55172425;
		let miningxp = player.data.skills.mining;
		miningxp = ((miningxp / lvl50xp) * 100).toFixed(2);
		if (miningxp > 100) {
			miningxp = 100;
		}
		let fishingxp = player.data.skills.fishing;
		fishingxp = ((fishingxp / lvl50xp) * 100).toFixed(2);
		if (fishingxp > 100) {
			fishingxp = 100;
		}
		let combatxp = player.data.skills.combat;
		combatxp = ((combatxp / lvl50xp) * 100).toFixed(2);
		if (combatxp > 100) {
			combatxp = 100;
		}

		embed.addField(
			'Skills',
			`<:mining:852069714577719306> Mining: **${miningxp}%**\n<:combat:852069714527911956> Combat: **${combatxp}%**\n<:fishing:852069714359877643> Fishing: **${fishingxp}%**`,
			true
		);

		//Fishing Rod
		let rodname = player.data.equipment.fishing.rod.name;
		let rodnum = await getRodProgress(rodname);
		rodnum = ((rodnum / 9) * 100).toFixed(2);

		embed.addField('<:fishing:852069714359877643> Fishing Rod', `${rodnum}%`, true);

		//Pickaxe
		let pickaxename = player.data.equipment.mining.pickaxe.name;
		let pickaxenum = await getPickaxeProgress(pickaxename);
		pickaxenum = ((pickaxenum / 7) * 100).toFixed(2);

		embed.addField('<:mining:852069714577719306> Pickaxe', `${pickaxenum}%`, true);

		//Armor
		let armornum = await getArmorProgress(player);
		armornum = ((armornum / 11) * 100).toFixed(2);

		embed.addField('<:tank:852079613051666472> Armor', `${armornum}%`, true);

		//Sword
		let swordnum = await getSwordProgress(player);
		swordnum = ((swordnum / 10) * 100).toFixed(2);

		embed.addField('<:berserker:852079613052059658> Sword', `${swordnum}%`, true);

		//Dungeons
		let catamaxxp = 569809640;
		let cataxp = player.data.dungeons.xp;
		let assassinxp = player.data.dungeons.class.available.assassin.xp;
		let berserkerxp = player.data.dungeons.class.available.berserker.xp;
		let tankxp = player.data.dungeons.class.available.tank.xp;

		cataxp = ((cataxp / catamaxxp) * 100).toFixed(2);
		assassinxp = ((assassinxp / catamaxxp) * 100).toFixed(2);
		berserkerxp = ((berserkerxp / catamaxxp) * 100).toFixed(2);
		tankxp = ((tankxp / catamaxxp) * 100).toFixed(2);

		embed.addField(
			'Dungeons',
			`<:catacombs:854399510951624775> Dungeons: ${cataxp}%\n<:combat:852069714527911956> Assassin: ${assassinxp}%\n<:berserker:852079613052059658> Berserker: ${berserkerxp}%\n<:tank:852079613051666472> Tank: ${tankxp}%`,
			true
		);

		interaction.editReply({ embeds: [embed] });
	},
};

function getRodProgress(rodname) {
	if (rodname == 'Fishing Rod') return 1;
	else if (rodname == 'Prismarine Rod') return 2;
	else if (rodname == 'Sponge Rod') return 3;
	else if (rodname == 'Speedster Rod') return 4;
	else if (rodname == "Farmer's Rod") return 5;
	else if (rodname == 'Challenging Rod') return 6;
	else if (rodname == 'Rod of Champions') return 7;
	else if (rodname == 'Rod of Legends') return 8;
	else if (rodname == 'Rod of the Sea') return 9;
}

function getPickaxeProgress(pickaxename) {
	if (pickaxename == 'Wood Pickaxe') return 1;
	else if (pickaxename == 'Stone Pickaxe') return 2;
	else if (pickaxename == 'Iron Pickaxe') return 3;
	else if (pickaxename == 'Mithril Pickaxe') return 4;
	else if (pickaxename == 'Titanium Pickaxe') return 5;
	else if (pickaxename == 'Stonk') return 6;
	else if (pickaxename == 'Gemstone Gauntlet') return 7;
}

function getArmorProgress(player) {
	let inv = player.data.inventory.armor;
	let num = 0;

	if (inv.find((item) => item.name == 'Leaflet Armor')) {
		num++;
	} else if (inv.find((item) => item.name == 'Golem Armor')) {
		num++;
	} else if (inv.find((item) => item.name == 'Monster Hunter Armor')) {
		num++;
	} else if (inv.find((item) => item.name == 'Tarantula Armor')) {
		num++;
	} else if (inv.find((item) => item.name == 'Frozen Blaze Armor')) {
		num++;
	} else if (inv.find((item) => item.name == 'Superior Dragon Armor')) {
		num++;
	} else if (inv.find((item) => item.name == 'Rotten Armor')) {
		num++;
	} else if (inv.find((item) => item.name == 'Skeleton Master Armor')) {
		num++;
	} else if (inv.find((item) => item.name == 'Skeletor Armor')) {
		num++;
	} else if (inv.find((item) => item.name == 'Adaptive Armor')) {
		num++;
	} else if (inv.find((item) => item.name == 'Shadow Assassin Armor')) {
		num++;
	}

	return num;
}

function getSwordProgress(player) {
	let inv = player.data.inventory.sword;
	let num = 0;

	if (inv.find((item) => item.name == 'Undead Sword')) {
		num++;
	} else if (inv.find((item) => item.name == 'Golem Sword')) {
		num++;
	} else if (inv.find((item) => item.name == 'Zombie Sword')) {
		num++;
	} else if (inv.find((item) => item.name == "Tactician's Sword")) {
		num++;
	} else if (inv.find((item) => item.name == 'Leaping Sword')) {
		num++;
	} else if (inv.find((item) => item.name == 'Dreadlord Sword')) {
		num++;
	} else if (inv.find((item) => item.name == 'Silent Death')) {
		num++;
	} else if (inv.find((item) => item.name == 'Zombie Knight Sword')) {
		num++;
	} else if (inv.find((item) => item.name == 'Adaptive Blade')) {
		num++;
	} else if (inv.find((item) => item.name == 'Livid Dagger')) {
		num++;
	}

	return num;
}
