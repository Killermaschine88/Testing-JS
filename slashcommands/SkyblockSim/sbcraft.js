const Discord = require('discord.js');

module.exports = {
	name: 'sbcraft',
	description: 'a',
	usage: 'sbsettings (Setting Name)',
	perms: 'None',
	folder: 'SkyblockSim',
	aliases: [],
	cooldown: 10,
	async execute(interaction, mclient) {
		const collection = mclient.db('SkyblockSim').collection('Players');
		let player = await collection.findOne({ _id: interaction.user.id });
    
    //Embed and Select Menu
    const embed = new Discord.MessageEmbed()
    .setTitle('Crafting')
    .setDescription('Available Items with their respective Stats and Item Cost')
    .addField('Shark Scale Armor', '**Stats:** aaa\n\n**Cost:** 100 Shark Fin and 100 Lilypads')
    .setFooter('Skyblock Simulator')

    const row = new Discord.MessageActionRow()

    const craftmenu = new Discord.MessageSelectMenu()
			.setCustomId('craftmenu')
			.setMaxValues(1)
			.setMinValues(1);

    craftmenu.addOptions([
      {
        label: 'Shark Scale Armor',
        value: 'sharkscale'
      }
    ])

    row.addComponents(craftmenu)
  

    const menu = await interaction.editReply({embeds: [embed], components: [row]})

  

		// Wait for a selectbox option to be chosen and then
		// send a leaderboard of the selected type
		const filter = (i) =>
			i.customId === 'craftmemu' && i.user.id === interaction.user.id;
		const leaderCollector =
			await menu.createMessageComponentCollector({
				filter,
				componentType: 'SELECT_MENU',
				time: 300000,
			});

		leaderCollector.on('collect', async (collectedTypeInteraction) => {
			console.log(collectedTypeInteraction)

			
			

			

			await collectedTypeInteraction.update({ embeds: [embed], components: [] });
		});

		leaderCollector.on('end', async (collected) => {
		/*	const reply = await interaction.fetchReply();
			reply.delete();*/
		});
    
    
  }
}