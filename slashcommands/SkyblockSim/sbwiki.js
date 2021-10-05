const Discord = require('discord.js');

module.exports = {
  name: "sbwiki",
  description: "a",
  usage: "sbwiki (Setting Name)",
  perms: "None",
  folder: "SkyblockSim",
  aliases: [],
  cooldown: 10,
  async execute(interaction) {

    const embed = new Discord.MessageEmbed()
    .setTitle('Skyblock Simulator Wiki')
    .setColor('90EE90')
    .setFooter('Skyblock Simulator')
    .setDescription('Press the Button that you want to see the Information off.')

    const button1 = new Discord.MessageButton()
      .setCustomId('general')
      .setLabel('General Info')
      .setStyle('PRIMARY')
    const button2 = new Discord.MessageButton()
      .setCustomId('symbols')
      .setLabel('Symbols')
      .setStyle('PRIMARY')
    const button3 = new Discord.MessageButton()
      .setCustomId('misc')
      .setLabel('Misc')
      .setStyle('PRIMARY')

    const row = new Discord.MessageActionRow()
      .addComponents(button1, button2)

    let menu = await interaction.editReply({embeds: [embed], components: [row]})


    const filter = i => {
      i.deferUpdate();
      return i.user.id === interaction.user.id;
    };

    const collector = menu.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 858000 })

    collector.on('collect', async i => {
      if(i.customId == 'general') {
        const generalembed = new Discord.MessageEmbed()
        .setTitle('General Information')
        .setColor('90EE90')
        .setFooter('Skyblock Simulator')

        menu.edit({embeds: [generalembed]})
      } else if(i.customId == 'symbols') {
        const symbolembed = new Discord.MessageEmbed()
        .setTitle('Symbol Information')
        .setColor('90EE90')
        .setFooter('Skyblock Simulator')
        .setDescription('❤ Health\n❈ Defense\n⚔️ Damage\n❁ Strength\n☣ Crit Chance\n☠ Crit Damage\n✯ Magic Find\nα Sea Creature Chance\n🎣 Fishing Speed\n⸕ Mining Speed')

        menu.edit({embeds: [symbolembed]})
      }
    })
  }
};