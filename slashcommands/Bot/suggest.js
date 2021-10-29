const Discord = require('discord.js');

module.exports = {
  name: "suggest",
  description: "Sends the Bots Invite Link",
  usage: "invite",
  perms: "None",
  folder: "Bot",
  aliases: [],
  execute: (interaction) => {

    let input = interaction.options.getString('suggestion')

    let suggested = new Discord.MessageEmbed()
    .setTitle('Suggestion sent')
    .setColor('GREEN')
    .setDescription("To see your suggestion join my [Support Server](https://discord.gg/Ca6XpTRQaR) and check (input channel)")

    interaction.editReply({embeds: [suggested]})

    let suggestembed = new Discord.MessageEmbed()
    .setTitle(`New Suggestion from ${interaction.user.tag}`)
    .setDescription(`${input}`)
    .setFooter(`${interaction.user.id}`)

interaction.client.channels.fetch('871669216703578152')
        .then(channel => channel.send({embeds: [suggestembed]}).then(msg => msg.react('👍') && msg.react('👎')))
        .catch(console.error)
  }
};