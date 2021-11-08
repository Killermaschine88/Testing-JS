const Discord = require('discord.js');

module.exports = {
  name: "suggest",
  description: "Sends the Bots Invite Link",
  usage: "invite",
  perms: "None",
  folder: "Bot",
  aliases: [],
  cooldown: 60,
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

interaction.client.channels.fetch('906928690640879716')
        .then(channel => channel.send({embeds: [suggestembed]}).then(msg => msg.react('👍') && msg.react('👎') && msg.startThread({
    name: `Suggestion`,
   // autoArchiveDuration: 60,
    //reason: 'Needed a separate thread f',
  }))).catch(console.error)
        
  }
};