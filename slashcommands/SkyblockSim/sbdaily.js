const Discord = require('discord.js');
const { getFooter, getColor } = require('../../constants/Bot/embeds.js')

module.exports = {
	name: 'sbdaily',
	description: 'a',
	usage: 'sbsettings (Setting Name)',
	perms: 'None',
	folder: 'SkyblockSim',
	aliases: [],
	cooldown: 10,
	async execute(interaction, mclient) {
		const collection = mclient.db('SkyblockSim').collection('Players');
		let player = await collection.findOne({ _id: interaction.user.id });

		let time_now = Math.floor(Date.now() / 1000);
		let last_claim = player.data.misc.daily.last_claimed;
		let next_claim = last_claim + 60 * 60 * 24;
		let failed_claim = last_claim + 60 * 60 * 48;
		let gems = 0;
		let streak = player.data.misc.daily.streak + 1;

		if (player === null) {
			const noprofile = new Discord.MessageEmbed()
				.setColor('RED')
				.setTitle('No Profile found')
				.setDescription(`Create a Profile using \`/sb start\``);
			interaction.editReply({ embeds: [noprofile] });
			return;
		}

		if (next_claim <= time_now) {
			if (streak % 7 == 0) {
				gems = streak / 7;
			}
			if (failed_claim <= time_now && last_claim != 0) {
				await collection.updateOne(
					{ _id: interaction.user.id },
					{
						$inc: {
							'data.profile.coins': 25000,
							'data.profile.gems': gems,
						},
					},
					{ upsert: true }
				);

				await collection.updateOne(
					{ _id: interaction.user.id },
					{
						$set: {
							'data.misc.daily.last_claimed': time_now,
							'data.misc.daily.streak': 1,
						},
					},
					{ upsert: true }
				);

				const failedstreak = new Discord.MessageEmbed();
				failedstreak.setTitle('Claimed Daily Reward');
				if (gems == 0) {
					failedstreak.setDescription(
						`I have added <:coins:861974605203636253> **25k Coins** to your Profile but unfortunately, your Streak has reset. 😢\nYou will be able to claim it again in **24 Hours**`
					);
				} else {
					failedstreak.setDescription(
						`I have added <:coins:861974605203636253> **25k Coins** and <:gems:879264850348486696> **${gems} Gems** to your Profile but unfortunately, your Streak has reset. 😢\nYou will be able to claim it again in **24 Hours**`
					);
				}
				failedstreak.setFooter(`${getFooter(player)}\nDaily Streak: 1`);
				failedstreak.setColor(getColor(player));

				interaction.editReply({ embeds: [failedstreak] });
				return;
			} else {
				await collection.updateOne(
					{ _id: interaction.user.id },
					{
						$inc: {
							'data.profile.coins': 25000,
							'data.misc.daily.streak': 1,
							'data.profile.gems': gems,
						},
					},
					{ upsert: true }
				);

				await collection.updateOne(
					{ _id: interaction.user.id },
					{ $set: { 'data.misc.daily.last_claimed': time_now } },
					{ upsert: true }
				);

				const claimed = new Discord.MessageEmbed();
				claimed.setTitle('Claimed Daily Reward');
				if (gems == 0) {
					claimed.setDescription(
						`I have added <:coins:861974605203636253> **25k Coins** to your Profile.\nYou will be able to claim it again in **24 Hours**`
					);
				} else {
					claimed.setDescription(
						`I have added <:coins:861974605203636253> **25k Coins** and <:gems:879264850348486696> **${gems} Gems** to your Profile.\nYou will be able to claim it again in **24 Hours**`
					);
				}
				claimed.setFooter(`${getFooter(player)}\nDaily Streak: ${player.data.misc.daily.streak + 1}`);
				claimed.setColor(getColor(player));

				interaction.editReply({ embeds: [claimed] });
				return;
			}
		} else {
			const toearly = new Discord.MessageEmbed()
				toearly.setTitle("Can't claim Daily Reward yet")
				toearly.setDescription(`You can claim your Daily Reward again on <t:${next_claim}:f>`)
				toearly.setColor(getColor(player));
      toearly.setFooter(getFooter(player))

			interaction.editReply({ embeds: [toearly] });
			return;
		}
	},
};
