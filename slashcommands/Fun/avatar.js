const Discord = require('discord.js');

module.exports = {
  name: "avatar",
  description: "Sends the mentioned Users Avatar",
  usage: "avatar",
  perms: "None",
  folder: "Fun",
  aliases: ['av'],
  execute: (client, interaction) => {
    let user = interaction.options.getUser('user');
    if(!user) {
      user = interaction.user
    }


    if (user) {
      interaction.editReply(`The Users Avatar: ${user.displayAvatarURL({ format: 'png', dynamic: true })}`);
    } else {
      interaction.editReply({ content: ["Error. This may be cause because you pinged an Invalid User."], ephemeral: true })
    }
  }
};