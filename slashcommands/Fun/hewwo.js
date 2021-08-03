const Discord = require('discord.js');

module.exports = {
  name: 'hewwo',
  usage: 'hewwo',
  description: 'Says hewwo!',
  folder: 'Fun',
  aliases: [],
  execute(client, interaction) {

    const hewwo = new Discord.MessageEmbed()
      .setTitle('(◕ᴗ◕✿)')
      .setDescription(`hewwo ${interaction.user.username} 😘`)
      .setColor(Math.floor(Math.random() * 16777215).toString(16))
      .setFooter('( ﾟ◡ﾟ)/')
    interaction.editReply({ embeds: [hewwo] })
  },
};