const Discord = require('discord.js');

module.exports = {
  name: "restart",
  description: "Restarts Bot",
  usage: "rs",
  perms: "Dev",
  folder: "Dev",
  aliases: ['rs'],
  async execute(client, message, args) {
    if (message.author.id !== config.ownerID) return message.channel.send("Can't use this!")

    const restart = new Discord.MessageEmbed().setColor('ORANGE').setDescription('Restarting . . .').setFooter('I will DM once im restarted')
          message.channel.send({ embeds: [restart]})

    process.exit();

  }
};