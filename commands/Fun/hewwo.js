const Discord = require('discord.js');

module.exports = {
  name: 'hewwo',
  usage: 'hewwo',
  description: 'Says hewwo!',
  folder: 'Fun',
  aliases: [],
  execute(client, message, args) {

    const hewwo = new Discord.MessageEmbed()
      .setTitle('(◕ᴗ◕✿)')
      .setDescription(`hewwo ${message.author} 😘`)
      .setColor(Math.floor(Math.random() * 16777215).toString(16))
      .setFooter('( ﾟ◡ﾟ)/')
    message.channel.send({ embeds: [hewwo] })
  },
};