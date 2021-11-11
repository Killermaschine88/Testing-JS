const Discord = require('discord.js');

module.exports = {
	name: 'sbtrade',
	description: 'a',
	usage: 'sbsettings (Setting Name)',
	perms: 'None',
	folder: 'SkyblockSim',
	aliases: [],
	cooldown: 10,
	async execute(interaction, mclient) {
		let action = interaction.options.getString('action');
		let user = interaction.options.getUser('user');
		let tradeitem = interaction.options.getString('trade-item');
		if (tradeitem) {
			tradeitem = tradeitem.toLowerCase();
		}
		let amount = interaction.options.getInteger('amount');

		const collection = mclient.db('SkyblockSim').collection('Players');
		let player = await collection.findOne({ _id: interaction.user.id });

		const collection1 = mclient.db('SkyblockSim').collection('trades');
		let trades = await collection1.findOne({ _id: interaction.user.id });

		if (trades != null && (action == 'send-offer' || action == 'reply-offer')) {
			let ongoingtrade = new Discord.MessageEmbed()
				.setTitle('Ongoing Trade')
				.setDescription(
					`You already have an ongoing trade to <@!${trades.reciever.id}> (${trades.reciever.id}) ask them to accept or deny it so you can send trades again`
				)
				.setColor('RED')
				.setFooter('Skyblock Simulator');

			return interaction.editReply({ embeds: [ongoingtrade] });
		}

		if (action == 'send-offer') {
			if (!user.id || user.id == interaction.user.id || user.bot) {
				let nouserembed = new Discord.MessageEmbed()
					.setDescription('You cant send trades to yourself a Bot or an invalid User.')
					.setColor('RED')
					.setFooter('Skyblock Simulator');

				return interaction.editReply({ embeds: [nouserembed] });
			}

			if (tradeitem == null || amount == null) {
				let invalid = new Discord.MessageEmbed()
					.setTitle('Trade Item and Amount are required for this action.')
					.setColor('RED')
					.setFooter('Skyblock Simulator');

				return interaction.editReply({ embeds: [invalid] });
			}

			if (tradeitem.includes('coin')) {
				tradeitem = 'Coins';

				if (amount > player.data.profile.coins) {
					let lowitemsembed = new Discord.MessageEmbed()
						.setTitle('Too few Items')
						.setDescription(
							`You only have ${player.data.profile.coins} ${tradeitem}, but tried to trade ${amount} ${tradeitem}.`
						)
						.setColor('RED')
						.setFooter('Skyblock Simulator');

					return interaction.editReply({ embeds: [lowitemsembed] });
				}

				await collection1.updateOne(
					{ _id: interaction.user.id },
					{
						$set: {
							sender: {
								id: interaction.user.id,
								item: caps(tradeitem),
								amount: amount,
								accepted: false,
							},
							reciever: {
								id: user.id,
								item: 'None',
								amount: 0,
								accepted: false,
							},
						},
					},
					{ upsert: true }
				);

				await collection.updateOne(
					{
						_id: interaction.user.id,
					},
					{ $inc: { 'data.profile.coins': -amount } },
					{ upsert: true }
				);

				let dmed = 'yes';
				try {
					let tradereq = new Discord.MessageEmbed()
						.setTitle(`Trade Offer from ${interaction.user.tag}`)
						.setDescription(
							`Wants to trade **${amount} ${tradeitem}**.\n\nSend your offer back with \`/sb trade reply-offer @User/UserId Item amount\` once you sent them an offer back you need to wait for them to accept or deny it.`
						);
					let fetched = await interaction.client.users.fetch(user.id);
					await fetched.send({ embeds: [tradereq] });
				} catch (e) {
					dmed = 'no';
				}

				let sentembed = new Discord.MessageEmbed()
					.setTitle('Trade sent')
					.setDescription(
						`Sent a trade to the User offering them **${amount} ${caps(
							tradeitem
						)}**.\nWait for the User to reply you with an offer which u then can accept or deny (you get dmed when they reply an offer)\n\nUser dmed: ${dmed}`
					)
					.setColor('GREEN')
					.setFooter('Skyblock Simulator');

				return interaction.editReply({ embeds: [sentembed] });
			}

			let finditem = player.data.inventory.items.find((item) => item.name == caps(tradeitem));

			if (finditem == undefined || (finditem.amount == 0 && amount < 0)) {
				let noitemembed = new Discord.MessageEmbed()
					.setTitle('No Item found.')
					.setDescription(
						`Couldn\'t find any Items matching \`${caps(
							tradeitem
						)}\` or Amount being above 0, make sure you spelled it corrrectly.`
					)
					.setFooter('Skyblock Simulator')
					.setColor('RED');

				return interaction.editReply({ embeds: [noitemembed] });
			}

			if (amount > finditem.amount) {
				let lowitemsembed = new Discord.MessageEmbed()
					.setTitle('Too few Items')
					.setDescription(
						`You only have ${finditem.amount} ${tradeitem}, but tried to trade ${amount} ${tradeitem}.`
					)
					.setColor('RED')
					.setFooter('Skyblock Simulator');

				return interaction.editReply({ embeds: [lowitemsembed] });
			}

			await collection1.updateOne(
				{ _id: interaction.user.id },
				{
					$set: {
						sender: {
							id: interaction.user.id,
							item: caps(tradeitem),
							amount: amount,
							accepted: false,
						},
						reciever: {
							id: user.id,
							item: 'None',
							amount: 0,
							accepted: false,
						},
					},
				},
				{ upsert: true }
			);

			await collection.updateOne(
				{
					_id: interaction.user.id,
					'data.inventory.items.name': caps(tradeitem),
				},
				{ $inc: { 'data.inventory.items.$.amount': -amount } },
				{ upsert: true }
			);

			let dmed = 'yes';
			try {
				let tradereq = new Discord.MessageEmbed()
					.setTitle(`Trade Offer from ${interaction.user.tag}`)
					.setDescription(
						`Wants to trade **${amount} ${tradeitem}**.\n\nSend your offer back with \`/sb trade reply-offer @User/UserId Item amount\` once you sent them an offer back you need to wait for them to accept or deny it.`
					);
				let fetched = await interaction.client.users.fetch(user.id);
				await fetched.send({ embeds: [tradereq] });
			} catch (e) {
				dmed = 'no';
			}

			let sentembed = new Discord.MessageEmbed()
				.setTitle('Trade sent')
				.setDescription(
					`Sent a trade to the User offering them **${amount} ${caps(
						tradeitem
					)}**.\nWait for the User to reply you with an offer which u then can accept or deny (you get dmed when they reply an offer)\n\nUser dmed: ${dmed}`
				)
				.setColor('GREEN')
				.setFooter('Skyblock Simulator');

			return interaction.editReply({ embeds: [sentembed] });
		} else if (action == 'reply-offer') {
			if (!user.id || user.id == interaction.user.id || user.bot) {
				let nouserembed = new Discord.MessageEmbed()
					.setDescription('You cant send trades to yourself a Bot or an invalid User.')
					.setColor('RED')
					.setFooter('Skyblock Simulator');

				return interaction.editReply({ embeds: [nouserembed] });
			}
			let existingsent = await collection1.findOne({ _id: user.id });
			if (existingsent == null) {
				let embed = new Discord.MessageEmbed()
					.setTitle('THis user hasnt sent you a trade')
					.setColor('RED')
					.setFooter('Skyblock Simulator');

				return interaction.editReply({ embeds: [embed] });
			}

			if (tradeitem == null || amount == null) {
				let invalid = new Discord.MessageEmbed()
					.setTitle('Trade Item and Amount are required for this action.')
					.setColor('RED')
					.setFooter('Skyblock Simulator');

				return interaction.editReply({ embeds: [invalid] });
			}

			if (tradeitem.includes('coin')) {
				tradeitem = 'Coins';

				if (amount > player.data.profile.coins) {
					let lowitemsembed = new Discord.MessageEmbed()
						.setTitle('Too few Items')
						.setDescription(
							`You only have ${player.data.profile.coins} ${tradeitem}, but tried to trade ${amount} ${tradeitem}.`
						)
						.setColor('RED')
						.setFooter('Skyblock Simulator');

					return interaction.editReply({ embeds: [lowitemsembed] });
				}

				////////////////////////////////////////////////
				await collection1.updateOne(
					{ _id: user.id },
					{
						$set: {
							reciever: {
								id: interaction.user.id,
								item: caps(tradeitem),
								amount: amount,
								accepted: true,
							},
						},
					},
					{ upsert: true }
				);

				await collection.updateOne(
					{
						_id: interaction.user.id,
					},
					{ $inc: { 'data.profile.coins': -amount } },
					{ upsert: true }
				);

				let dmed = 'yes';
				try {
					let tradereq = new Discord.MessageEmbed()
						.setTitle(`Trade Offer from ${interaction.user.tag}`)
						.setDescription(
							`Wants to offer **${amount} ${tradeitem}** for the Items you offered them.\n\nAccept or deny the trade with \`/sb trade accpet-offer/deny-offer @User/UserId\` if you accept the offer the items will be transfered else you get them back.`
						);
					let fetched = await interaction.client.users.fetch(user.id);
					await fetched.send({ embeds: [tradereq] });
				} catch (e) {
					dmed = 'no';
				}

				let sentembed = new Discord.MessageEmbed()
					.setTitle('Trade sent')
					.setDescription(
						`Sent a trade to the User offering them **${amount} ${caps(
							tradeitem
						)}** for their Items.\nWait for the User to accept or deny your offer if they accept the trade gets completed else the items get returned.\nUser dmed: ${dmed}`
					)
					.setColor('GREEN')
					.setFooter('Skyblock Simulator');

				return interaction.editReply({ embeds: [sentembed] });
			}

			let finditem = player.data.inventory.items.find((item) => item.name == caps(tradeitem));

			if (finditem == undefined && finditem.amount == 0 && amount < 0) {
				let noitemembed = new Discord.MessageEmbed()
					.setTitle('No Item found.')
					.setDescription(
						`Couldn\'t find any Items matching \`${caps(tradeitem)}\`, make sure you spelled it corrrectly.`
					)
					.setFooter('Skyblock Simulator')
					.setColor('RED');

				return interaction.editReply({ embeds: [noitemembed] });
			}

			if (amount > finditem.amount) {
				let lowitemsembed = new Discord.MessageEmbed()
					.setTitle('Too few Items')
					.setDescription(
						`You only have ${finditem.amount} ${tradeitem}, but tried to trade ${amount} ${tradeitem}.`
					)
					.setColor('RED')
					.setFooter('Skyblock Simulator');

				return interaction.editReply({ embeds: [lowitemsembed] });
			}

			await collection1.updateOne(
				{ _id: user.id },
				{
					$set: {
						reciever: {
							id: interaction.user.id,
							item: caps(tradeitem),
							amount: amount,
							accepted: true,
						},
					},
				},
				{ upsert: true }
			);

			await collection.updateOne(
				{
					_id: interaction.user.id,
					'data.inventory.items.name': caps(tradeitem),
				},
				{ $inc: { 'data.inventory.items.$.amount': -amount } },
				{ upsert: true }
			);

			let dmed = 'yes';
			try {
				let tradereq = new Discord.MessageEmbed()
					.setTitle(`Trade Offer from ${interaction.user.tag}`)
					.setDescription(
						`Wants to offer **${amount} ${tradeitem}** for the Items you offered them.\n\nAccept or deny the trade with \`/sb trade accpet-offer/deny-offer @User/UserId\` if you accept the offer the items will be transfered else you get them back.`
					);
				let fetched = await interaction.client.users.fetch(user.id);
				await fetched.send({ embeds: [tradereq] });
			} catch (e) {
				dmed = 'no';
			}

			let sentembed = new Discord.MessageEmbed()
				.setTitle('Trade sent')
				.setDescription(
					`Sent a trade to the User offering them **${amount} ${caps(
						tradeitem
					)}** for their Items.\nWait for the User to accept or deny your offer if they accept the trade gets completed else the items get returned.\nUser dmed: ${dmed}`
				)
				.setColor('GREEN')
				.setFooter('Skyblock Simulator');

			return interaction.editReply({ embeds: [sentembed] });
		} else if (action == 'accept-offer') {
			let offer = await collection1.findOne({ _id: interaction.user.id });
			if (offer == null) {
				let embed = new Discord.MessageEmbed()
					.setTitle('No outgoing trades to that user.')
					.setColor('RED')
					.setFooter('Skyblock Simulator');

				return interaction.editReply({ embeds: [embed] });
			}
			let user1 = await collection.findOne({ _id: offer.reciever.id });
			let user2 = await await collection.findOne({
				_id: offer.sender.id,
			});

			if (offer.sender.item == 'Coins') {
				await collection.updateOne(
					{ _id: offer.reciever.id },
					{
						$inc: {
							'data.profile.coins': offer.sender.amount,
						},
					},
					{ upsert: true }
				);
			} else {
				const updatePlayer = await addItems(offer.sender.item, offer.sender.amount, user1);

				await collection.replaceOne({ _id: offer.reciever.id }, updatePlayer);
			}

			if (offer.reciever.item == 'Coins') {
				await collection.updateOne(
					{ _id: offer.sender.id },
					{
						$inc: {
							'data.profile.coins': offer.reciever.amount,
						},
					},
					{ upsert: true }
				);
			} else {
				const updatePlayer1 = await addItems(offer.reciever.item, offer.reciever.amount, user2);

				await collection.replaceOne({ _id: offer.sender.id }, updatePlayer1);
			}

			try {
				let tradereq = new Discord.MessageEmbed()
					.setTitle(`Trade accepted`)
					.setDescription(`Trade accepted you got the ${offer.reciever.amount} ${offer.reciever.item}`);
				let fetched = await interaction.client.users.fetch(offer.sender.id);
				await fetched.send({ embeds: [tradereq] });
			} catch (e) {}
			try {
				let tradereq = new Discord.MessageEmbed()
					.setTitle(`Trade accepted`)
					.setDescription(`Trade accepted you got the ${offer.sender.amount} ${offer.sender.item}`);
				let fetched = await interaction.client.users.fetch(offer.reciever.id);
				await fetched.send({ embeds: [tradereq] });
			} catch (e) {}

			try {
				await collection1.deleteOne({ _id: interaction.user.id });
			} catch (e) {}

			let tradedone = new Discord.MessageEmbed()
				.setTitle('Trade accepted and complete')
				.setColor('GREEN')
				.setFooter('Skyblock Simulator');

			interaction.editReply({ embeds: [tradedone] });
		} else if (action == 'deny-offer') {
			let offer = await collection1.findOne({ _id: interaction.user.id });
			if (offer == null) {
				let embed = new Discord.MessageEmbed()
					.setTitle('No outgoing trades to that user.')
					.setColor('RED')
					.setFooter('Skyblock Simulator');

				return interaction.editReply({ embeds: [embed] });
			}
			let user1 = await collection.findOne({ _id: offer.reciever.id });
			let user2 = await await collection.findOne({
				_id: offer.sender.id,
			});

			if (offer.reciever.item == 'Coins') {
				await collection.updateOne(
					{ _id: offer.reciever.id },
					{
						$inc: {
							'data.profile.coins': offer.reciever.amount,
						},
					},
					{ upsert: true }
				);
			} else {
				const updatePlayer = await addItems(offer.reciever.item, offer.reciever.amount, user1);

				await collection.replaceOne({ _id: offer.reciever.id }, updatePlayer);
			}

			if (offer.sender.item == 'Coins') {
				await collection.updateOne(
					{ _id: offer.sender.id },
					{
						$inc: {
							'data.profile.coins': offer.sender.amount,
						},
					},
					{ upsert: true }
				);
			} else {
				const updatePlayer1 = await addItems(offer.sender.item, offer.sender.amount, user2);

				await collection.replaceOne({ _id: offer.sender.id }, updatePlayer1);
			}

			try {
				let tradereq = new Discord.MessageEmbed()
					.setTitle(`Trade denied`)
					.setDescription(`Trade denied you got the ${offer.reciever.amount} ${offer.reciever.item} back.`);
				let fetched = await interaction.client.users.fetch(offer.reciever.id);
				await fetched.send({ embeds: [tradereq] });
			} catch (e) {}
			try {
				let tradereq = new Discord.MessageEmbed()
					.setTitle(`Trade denied`)
					.setDescription(`Trade denied you got the ${offer.sender.amount} ${offer.sender.item} back.`);
				let fetched = await interaction.client.users.fetch(offer.sender.id);
				await fetched.send({ embeds: [traddeniedereq] });
			} catch (e) {}

			try {
				await collection1.deleteOne({ _id: interaction.user.id });
			} catch (e) {}

			let tradedone = new Discord.MessageEmbed()
				.setTitle('Trade denied and Items returned.')
				.setColor('GREEN')
				.setFooter('Skyblock Simulator');

			interaction.editReply({ embeds: [tradedone] });
		}
	},
};

function caps(words) {
	let separateWord = words.toLowerCase().split(' ');
	for (let i = 0; i < separateWord.length; i++) {
		separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
	}
	return separateWord.join(' ');
}

async function addItems(mobdrop, amount, player) {
	if (!player.data.inventory.items) player.data.inventory.items = [];

	if (player.data.inventory.items.length === 0) {
		player.data.inventory.items.push({
			name: mobdrop,
			amount: amount,
		});
		return player;
	}

	for (const item of player.data.inventory.items) {
		if (item.name === mobdrop) {
			item.amount += amount;
			return player;
		}
	}

	player.data.inventory.items.push({
		name: mobdrop,
		amount: amount,
	});
	return player;
}
