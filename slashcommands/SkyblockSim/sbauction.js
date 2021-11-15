const Discord = require('discord.js');
const { getFooter, getColor } = require('../../constants/Bot/embeds.js')
const { caps } = require('../../constants/Functions/general.js')
const { getAuctionID } = require('../../constants/Functions/simulator.js')

module.exports = {
	name: 'sbauction',
	description: 'a',
	usage: 'sbsettings (Setting Name)',
	perms: 'None',
	folder: 'SkyblockSim',
	aliases: [],
	cooldown: 10,
	async execute(interaction, mclient) {

    //Getting required DB Entries
		const collection = mclient.db('SkyblockSim').collection('Players');
		let player = await collection.findOne({ _id: interaction.user.id });

   const collection2 = mclient.db('SkyblockSim').collection('auctions')

    if (player === null) {
			const noprofile = new Discord.MessageEmbed()
				.setColor('RED')
				.setTitle('No Profile found')
				.setDescription(`Create a profile using \`/sb start\``);
			interaction.editReply({ embeds: [noprofile] });
			return;
		}

    const action = interaction.options.getString('action')
    const itemname = interaction.options.getString('item-name')
    const duration = interaction.options.getInteger('duration')
    const amount = interaction.options.getInteger('bid-amount')
    const auctionid = interaction.options.getString('auction-id')
    const startbid = interaction.options.getInteger('start-bid')

    if(action == 'create') {

      if(!itemname || !duration || !startbid) {
        return interaction.editReply('item, starting bid and duration needed')
      }
      if(!player.data.inventory.items.find(item => item.name.toLowerCase() == itemname.toLowerCase() && item.amount != 0)) {
        return interaction.editReply('no item found with that name')
      }

      const ahid = getAuctionID()
      let expire_time = (Date.now() / 1000).toFixed()
      expire_time = Number(expire_time) + duration * 60 * 60   

      await collection2.updateOne(
				{ _id: ahid },
				{
					$set: {
owner: {
id: interaction.user.id, tag: interaction.user.tag
}, item: {
name: caps(itemname), bid: startbid, last_bidid: 0, last_bidtag: 'Starting Bid'
}, auction: {
expiration: expire_time
}
          }},
        { upsert: true })

            await collection.updateOne(
					{
						_id: interaction.user.id, 'data.inventory.items.name': caps(itemname)
					},
					{ $inc: { 'data.inventory.items.$.amount': -1 } },
					{ upsert: true }
				);

  const ahmade = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setFooter(getFooter('Auction House'))
       .setDescription(`Successfully created Auction with ID **${ahid}** for **${caps(itemname)}** lasting for **${duration} hours**, with a starting bid of **${startbid.toLocaleString()} Coins.**`)

      return interaction.editReply({embeds: [ahmade]})
      
    } else if(action == 'bid') {

      if(!amount) {
        return interaction.editReply('bid amount needed')
      }
      
    } else if(action == 'list') {

      const auctions = await collection2.find({}).toArray()
      //console.log(auctions)

      if(!auctions || auctions.length == 0) {
        return interaction.editReply('no auctions atm')
      }

      const embed = new Discord.MessageEmbed()
      .setColor(getColor('Auction House'))
      .setFooter(getFooter('Auction House'))

      for(const ah of auctions) {

        if(embed.fields.length < 20) {
        embed.addField(`${ah.item.name} from ${ah.owner.tag}`, `Auction ID: ${ah._id}\nCurrent Bid: ${ah.item.bid} Coins from ${ah.item.last_bidtag}\nExpires <t:${ah.auction.expiration}:R>`, true)
        } else {
          break;
        }
      }

      return interaction.editReply({embeds: [embed]})
      
    } else if(action == 'view') {

      if(!auctionid) {
        return interaction.editReply('id needed')
      }
      
      const ah = await collection2.findOne({ _id: auctionid });

      if(!ah) {
        return interaction.editReply('no auction')
      }

        const embed = new Discord.MessageEmbed()
      .setColor(getColor('Auction House'))
          .setFooter(getFooter('Auction House'))
          .addField(`${ah.item.name} from ${ah.owner.tag}`, `Auction ID: ${ah._id}\nCurrent Bid: ${ah.item.bid} Coins from ${ah.item.last_bidtag}\nExpires <t:${ah.auction.expiration}:R>`, true)

        return interaction.editReply({embeds: [embed]})
               
    }
  }
}