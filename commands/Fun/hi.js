const Discord = require('discord.js');

module.exports = {
  name: 'hi',
  usage: 'hi',
  description: 'Says hi!',
  aliases: [],
  execute(client, message, args) {
    return message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setTitle('o/')
          .setDescription(`Hi ${message.author} :heart:`)
          .setColor(Math.floor(Math.random() * 16777215).toString(16))
      ]
    })
  },
};