const Discord = require('discord.js');

module.exports = {
  name: "rat",
  description: "🐀",
  usage: "rat (Member)",
  perms: "🐀",
  folder: "Fun",
  aliases: [],
  execute: (client, interaction) => {

    let user = interaction.options.getUser('user');

    const ratembed = new Discord.MessageEmbed()
      .setTitle("🐀 Ratted User 🐀")
      .setColor("GREY")
      .setDescription(`🐀 ${user} is a Rat! 🐀`)
      .setFooter(`Used by ${interface.user.tag}`)


    interaction.editReply({ embeds: [ratembed] })

  }
};