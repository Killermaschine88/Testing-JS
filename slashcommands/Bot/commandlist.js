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
      let cmds = ['field', 'desc']
      let choosen = cmds[Math.floor(Math.random() * cmds.length)];
      if (choosen == 'desc') {
        embed.description += `**${commands[i].name}:** ${commands[i].description}\n`
      } else if (choosen == 'field') {
        embed.addField(`${commands[i].name}`, `${commands[i].description}`, true)
      }
      i += 1
    }
    interaction.editReply({ embeds: [embed] })
  }
};