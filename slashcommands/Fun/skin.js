const Discord = require('discord.js');

module.exports = {
  name: 'skin',
  usage: 'skin (IGN)',
  description: 'Gets player head from their ign',
  aliases: ['head'],
  execute(client, interaction) {

    const ign = interaction.options.getString('input');


    interaction.editReply({
      embeds: [
        new Discord.MessageEmbed()
          .setAuthor(ign, `https://cravatar.eu/helmavatar/${ign}/600.png`, `https://de.namemc.com/profile/${ign}`)
          .setImage(`https://cravatar.eu/helmavatar/${ign}/600.png`)
          .setColor('7CFC00')
          .setFooter('Click their Name to see their Full Skin')
      ]
    })
  }
};