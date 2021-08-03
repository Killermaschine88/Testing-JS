const Discord = require('discord.js');

module.exports = {
  name: "bean",
  description: "<:beans:849265485199048744>",
  usage: "bean (Member)",
  perms: "<:beans:849265485199048744>",
  folder: "Fun",
  aliases: [],
  execute: (client, interaction) => {

    let user = interaction.options.getUser('user');


    const beanembed = new Discord.MessageEmbed()
      .setTitle("<:beans:849265485199048744> Beaned User <:beans:849265485199048744>")
      .setColor("964B00")
      .setDescription(`<:beans:849265485199048744> ${user} has bean **BEANED**! <:beans:849265485199048744>`)
      .setFooter(`Used by ${interaction.user.tag}`)


    interaction.editReply({ embeds: [beanembed] })


  }
};