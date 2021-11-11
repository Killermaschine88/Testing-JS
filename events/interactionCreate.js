'use strict';
const Discord = require('discord.js');
const config = require('../constants/Bot/config.json');

const reforgeStones = [
	'Dragon Claw',
	'Wither Blood',
	'Warped Stone',
	'Deep Sea Orb',
	'Dragon Horn',
	'Precursor Gear',
	"Sadan's Brooch",
	'Onyx',
	'Diamonite',
	'Rock Gemstons',
	'Hardened Wood',
	'Lucky Dice',
	'Recombobulator 3000',
];
const sellableItems = [
	'Hardstone',
	'Coal',
	'Iron Ingot',
	'Gold Ingot',
	'Lapis Lazuli',
	'Redstone',
	'Emerald',
	'Diamond',
	'Mithril',
	'Titanium',
	'Gemstone',
	'Lilypad',
	'Recombobulator 3000',
	'Gold Nugget',
	'Blaze Rod',
	'Enchanted Gold Ingot',
	'Enchanted Blaze Rod',
	'Magma Cream',
	'Bone',
	'Enchanted Magma Cream',
	'Enchanted Bone',
	'Enchanted Coal',
	'Ghast Tear',
	'Enchanted Ghast Tear',
	'Ender Pearl',
	'Enchanted Ender Pearl',
	'Eye of Ender',
	'Enchanted Eye of Ender',
	'Obsidian',
	'Enchanted Obsidian',
	'Summoning Eye',
	'Arrow',
	'Slimeball',
	'String',
	'Spider Eye',
	'Enchanted Slimeball',
	'Enchanted String',
	'Enchanted Spider Eye',
	'Rotten Flesh',
	'Carrot',
	'Potato',
	'Shark Fin',
];
const blacklistedEmbed = new Discord.MessageEmbed()
	.setTitle('User Blacklisted')
	.setDescription(
		'You are blacklisted from using this bot. If you believe this is unfair/you were mistakenly blacklisted, join my [Support Server](https://discord.gg/Ca6XpTRQaR) and DM Baltraz#4874 to appeal.'
	)
	.setColor('RED');
const validChannels = [
	'GUILD_TEXT',
	'GUILD_PUBLIC_THREAD',
	'GUILD_PRIVATE_THREAD',
];
const invalidChannelReply = {
	embeds: [
		new Discord.MessageEmbed()
			.setTitle('Unsupported Channel')
			.setColor('ORANGE')
			.setDescription(
				'I only work in text channels and threads. Please move to a valid channel, invite me to a server using the attached button or create an thread and use me there.'
			)
			.setFooter('Sky Bot Dev')
	],
	components: [
		new Discord.MessageActionRow().addComponents(
			new Discord.MessageButton()
				.setLabel('Bot Invite')
				.setURL(
					'https://discord.com/api/oauth2/authorize?client_id=839835292785704980&permissions=139653925953&scope=applications.commands%20bot'
				)
				.setStyle('LINK')
		)
	],
	ephemeral: true
};
const blockedReply = {
	embeds: [
		new Discord.MessageEmbed()
			.setColor('ORANGE')
			.setTitle('Channel occupied')
			.setDescription(
				'This channel is already being used by someone to play dungeons or to fish/mine.\n\n' +
				'To reduce lag for them please consider inviting me to your own server or creating a thread to play there.'
			)
			.setFooter('Kind regards, Sky Bot Developer')
	],
	rows: [
		new Discord.MessageActionRow().addComponents(
			new Discord.MessageButton()
				.setLabel('Bot Invite')
				.setURL(
					'https://discord.com/api/oauth2/authorize?client_id=839835292785704980&permissions=139653925953&scope=applications.commands%20bot'
				)
				.setStyle('LINK')
		)
	],
	ephemeral: true
};

module.exports = {
	name: 'interactionCreate',
	/**
	 *
	 * @param {Discord.Interaction} interaction
	 * @param {*} mClient
	 * @returns
	 */
	async execute(interaction, mClient) {
		// ? Autocomplete
		if (interaction.isAutocomplete()) {
			const focused = interaction.options.getFocused();
			const subcommand = interaction.options.getSubcommand(false);

			if (subcommand === 'reforge') {
				const found = [];
				const found2 = [];
				const seen = reforgeStones.filter(
					stone => stone.toLowerCase().includes(focused) || stone.includes(focused)
				);

				if (seen.length !== 0) {
					const i = 0;
					for (const stone of seen) {
						// eslint-disable-next-line no-magic-numbers
						if (i < 25) {
							found.push({
								name: stone,
								value: stone,
							});
						} else {
							break;
						}
					}
				}

				if (found.length === 0) {
					interaction.respond(found2);
				} else {
					interaction.respond(found);
				}
			} else if (subcommand === 'sell') {
				const found = [];
				const found2 = [];
				const seen = sellableItems.filter(
					item => item.toLowerCase().includes(focused) || item.includes(focused)
				);

				if (seen.length !== 0) {
					let i = 0;
					for (const item of seen) {
						if (i < 10) {
							found.push({
								name: item,
								value: item,
							});
							i += 1;
						} else {
							break;
						}
					}
				}

				if (found.length === 0) {
					interaction.respond(found2);
				} else {
					interaction.respond(found);
				}
			}

		// ? Slash commands
		} else if (interaction.isCommand()) {
			if (config.blacklistedusers.includes(interaction.user.id)) {
				return interaction.reply({
					embeds: [blacklistedEmbed],
					ephemeral: true,
				});
			}

			if (!validChannels.includes(interaction.channel.type)) {
				return interaction.reply(invalidChannelReply);
			}

			let commandExecute = interaction.commandName;

			if (interaction.options.getSubcommand(false) != null) {
				commandExecute =
					interaction.commandName +
					interaction.options.getSubcommand(false);
			}

			const collection1 = mClient.db('Sky-Bot').collection('settings');
			const settings = await collection1.findOne({
				_id: interaction.client.user.id,
			});

			if (
				// the correct word is maintenance
				settings.maintanance.state === true &&
				interaction.user.id !== '570267487393021969'
			) {
				const maintenanceEmbed = new Discord.MessageEmbed()
					.setTitle('⚠️ Sky Bot Maintenance ⚠️')
					.setColor('ORANGE')
					.setDescription(
						`Maintenance Mode enabled because of **${settings.maintanance.reason}**!\nPlease wait while it is being worked on.`
					);
				return interaction.reply({ embeds: [maintenanceEmbed] });
			}

			if (interaction.commandName === 'sb') {
				const collection = mClient.db('SkyblockSim').collection('Players');
				const player = await collection.findOne({ _id: interaction.user.id });

				if (player != null) {
					const currentTime = Math.floor(Date.now() / 1000);
					if (
						player.data.misc.booster_cookie.expires <= currentTime &&
						player.data.misc.booster_cookie.active === true
					) {
						await collection.updateOne(
							{ _id: interaction.user.id },
							{
								$set: {
									'data.misc.booster_cookie.active': false,
									'data.misc.booster_cookie.expires': currentTime,
								},
							},
							{ upsert: true }
						);
					}
				}

				const collection2 = mClient
					.db('SkyblockSim')
					.collection('blockedchannels');
				const channel = await collection2.findOne({
					_id: interaction.channelId,
				});
				if (channel) {
					if (channel.user !== interaction.user.id) {
						if (channel.blocked === true) {
							return interaction.reply(blockedReply);
						}
					}
				}
			}

			const { cooldowns } = interaction.client;

			if (!cooldowns.has(commandExecute)) {
				cooldowns.set(commandExecute, new Discord.Collection());
			}

			const now = Date.now();
			const timestamps = cooldowns.get(commandExecute);
			const cd = interaction.client.slashcommands.get(commandExecute).cooldown;

			const cooldownAmount = (cd || 3) * 1000;

			/* //Owner Cooldown Bypass
			if (interaction.user.id === '570267487393021969') {
				cooldownAmount = 0
			}*/

			if (timestamps.has(interaction.user.id)) {
				const expirationTime =
					timestamps.get(interaction.user.id) + cooldownAmount;

				/*
				const collection = mclient.db('Sky-Bot').collection('SkyblockSim')
				const found = await collection.findOne({ _id: message.author.id })

				//Phoenix Pet Cooldown Reduction
				let cdr1 = 0
				let cdr2 = 0
				let cdr3 = 0
				let cdr4 = 0

				if (found.phoenix === true) {
				cdr1 = 2000
				}
				if (found.dragon === true) {
				cdr2 = 2000
				}
				if (found.luckcharm === true) {
				cdr3 = 1000
				}
				if (found.enderman === true) {
				cdr4 = 1000
				}


				let reduced = cdr1 + cdr2 + cdr3 + cdr4
				*/
				const exptime = expirationTime;

				if (now < exptime && interaction.user.id !== '570267487393021969') {
					const timeLeft = (exptime - now) / 1000;
					const cdEmbed = new Discord.MessageEmbed()
						.setTitle('Command Cooldown')
						.setColor('ORANGE')
						.setDescription(
							`You need to wait **${timeLeft.toFixed(
								1
							)}s** before using **${commandExecute}** again.`
						);

					return interaction.reply({
						embeds: [cdEmbed],
						ephemeral: true,
					});
				}
			}

			timestamps.set(interaction.user.id, now);
			setTimeout(
				() => timestamps.delete(interaction.user.id),
				cooldownAmount
			);
			/* console.log(timestamps)
			console.log(now)
			console.log(cooldownAmount)*/

			try {
				const collection = mClient.db('Sky-Bot').collection('commanduses');
				collection.updateOne(
					{ _id: interaction.commandName },
					{ $inc: { uses: 1 } },
					{ upsert: true }
				);

				await interaction.deferReply();
				await interaction.client.slashcommands
					.get(commandExecute)
					.execute(interaction, mClient);
			} catch (error) {
				console.error(error);
				interaction.followUp({
					content:
						'There was an error while executing this command. The bot dev has been notified.',
					ephemeral: true,
				});
				const errembed = new Discord.MessageEmbed()
					.setTitle(
						`Error occurred when ${interaction.user.tag} used ${commandExecute}`
					)
					.setDescription(`${error.stack}`);
				await interaction.client.users
					.fetch('570267487393021969')
					.then(async user => {
						await user.send({ embeds: [errembed] });
					});
			}
		}
	},
};
