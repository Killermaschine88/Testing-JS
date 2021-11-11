const Discord = require('discord.js');

module.exports = {
	name: 'sbsettings',
	description: 'Settings for SkyblockSim',
	usage: 'sbsettings (Setting Name)',
	perms: 'None',
	folder: 'SkyblockSim',
	aliases: ['sbse'],
	cooldown: 10,
	async execute(interaction, mclient) {
		const collection = mclient.db('SkyblockSim').collection('Players');
		const player = await collection.findOne({ _id: interaction.user.id });

		if (player === null) {
			const noprofile = new Discord.MessageEmbed()
				.setColor('RED')
				.setTitle('No Profile found')
				.setDescription('Create a Profile using `/sb start`');
			interaction.editReply({ embeds: [noprofile] });
			return;
		}

		const choosen = interaction.options.getString('choice');
		let state = interaction.options.getString('state'),
		 show = '';
		if (state == 'true') {
			state = true;
			show = 'enabled';
		} else {
			state = false;
			show = 'disabled';
		}

		if (choosen === 'imgshown') {
			await collection.updateOne(
				{ _id: interaction.user.id },
				{ $set: { 'data.settings.imgshown': state } },
				{ upsert: true }
			);

			const embed = new Discord.MessageEmbed()
				.setTitle('Setting changed')
				.setColor('GREEN')
				.setDescription(`Images shown is now ${show}.`);
			interaction.editReply({ embeds: [embed] });
		} else if (choosen === 'confirmation') {
			await collection.updateOne(
				{ _id: interaction.user.id },
				{ $set: { 'data.settings.confirmation': state } },
				{ upsert: true }
			);

			const embed = new Discord.MessageEmbed()
				.setTitle('Setting changed')
				.setColor('GREEN')
				.setDescription(`Confirmation Messages are now ${show}.`);
			interaction.editReply({ embeds: [embed] });
		}
	},
};
