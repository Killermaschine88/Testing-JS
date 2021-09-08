const Discord = require('discord.js');
const commands = require('../../Various/commands.js').data

module.exports = {
  name: "commandlist",
  description: "Sends ",
  usage: "invite",
  perms: "None",
  folder: "Bot",
  aliases: [],
  execute: (interaction) => {

    let i = 0

    const embed = new Discord.MessageEmbed()
      .setTitle('Valid Slash Commands')
      .setColor('90EE90')
      .setDescription('')

    while (i < commands.length) {
        embed.addField(`${commands[i].name}`, `${commands[i].description}`, true)
      i += 1
    }
    i = 0
    interaction.editReply({ embeds: [embed] })
  }
};