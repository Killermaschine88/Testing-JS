const Discord = require('discord.js');
module.exports = {
  name: "vote",
  description: "Shows the Upvote Links for Sky Bot",
  usage: "vote",
  perms: "None",
  folder: "Bot",
  aliases: [],
  execute: (interaction) => {
    const vembed = new Discord.MessageEmbed()
      .setTitle('Sky Bot Voting')
      .setColor('GREEN')
      .setDescription('Vote for Sky Bot to recieve some Bonuses at the Skyblock Simulator and to support the Dev')
    const vote = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setLabel('Top.gg')
          .setURL('https://top.gg/bot/839835292785704980')
          .setStyle('LINK'),
      );

    interaction.editReply({ embeds: [vembed], components: [vote] })
  }
};