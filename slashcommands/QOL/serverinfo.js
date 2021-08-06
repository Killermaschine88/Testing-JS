const Discord = require('discord.js');

module.exports = {
  name: "Serverinfo",
  description: "Shows some Stats about the current Server.",
  usage: "serverinfo",
  perms: "None",
  folder: "QOL",
  aliases: ['si'],
  execute: (interaction) => {


    interaction.editReply({
      embeds: [
        new Discord.MessageEmbed()
          .setTitle("Server Stats")
          .setColor('00ff00')
          .addFields(
            { name: "Server Name", value: `${interaction.guild.name}`, inline: true },
            { name: "Member Count", value: `${interaction.guild.memberCount}`, inline: true },
            { name: "Server Verification Level", value: `${interaction.guild.verificationLevel}`, inline: true },
            { name: "Server Created On", value: `${interaction.guild.createdAt}`, inline: true })]
    })
  }
};