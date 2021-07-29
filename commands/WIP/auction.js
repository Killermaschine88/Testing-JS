const Discord = require('discord.js');
//const Hypixel = require('hypixel-api-reborn');
//const config = require('../../config.json')
//const hypixel = new Hypixel.Client(config.apikey);



module.exports = {
  name: "Auction",
  description: "Shows AH Stats for said Player",
  usage: "auction (IGN)",
  perms: "None",
  folder: "Skyblock",
  aliases: ['ah'],
  async execute(client, message, args) {

    message.channel.send('no')
    return;

    /*const ign = args[0]

    if (args[0] === undefined) {
      message.channel.send('Please enter an IGN')
      return;
    }

    const getdata = new Discord.MessageEmbed()
      .setDescription('Checking for Player Auctions . . .')
      .setFooter('If i don\'t respond within 10 Seconds then theres an Error at the Hypixel API\nTry again later pls.')
      .setColor('ORANGE')

    const waitingembed = await message.channel.send({ embeds: [getdata] })

    const res = await hypixel.getSkyblockAuctionsByPlayer(ign)
    console.log(Object.entries(res).auctionId)


    if (!res[0]) {
      const noah = new Discord.MessageEmbed()
        .setTitle(`No Auctions found for \`${ign}\``)
        .setColor('RED')
      waitingembed.edit({ embeds: [noah] })
      return;
    } else {
      const ah = new Discord.MessageEmbed()
        .setTitle(`Found Auctions for \`${ign}\``)
        .setDescription(`${Object.entries(res)}`)
        .setColor('GREEN')
      waitingembed.edit({ embeds: [ah] })
    }
*/
  }
};