const Discord = require('discord.js');
const { getFooter, getColor } = require('../../constants/Bot/embeds.js')

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
      
    } else if(action == 'bid') {

      if(!amount) {
        return interaction.editReply('bid amount needed')
      }
      
    } else if(action == 'list') {

      const auctions = await collection2.find({}).toArray()
      console.log(auctions)

      if(!auctions || auctions.length == 0) {
        return interaction.editReply('no auctions atm')
      }
      
    } else if(action == 'view') {

      if(!auctionid) {
        return interaction.editReply('id needed')
      }
      
      const auction = await collection2.findOne({ _id: auctionid });

      if(!auction) {
        return interaction.editReply('no auction')

        const foundah = new Discord.MessageEmbed()
        .setTitle(`Found Auction Data for ID: ${auctionid}`)
               
      }
    }
  }
}

/*
await collection2.updateOne(
				{ _id: customid },
				{
					$set: {
owner: {
id: interaction.user.id, tag: interacrion.user.tag
}, item: {
name: "Item Name",
}, auction: {
put_up: "timestamp", expiration: "timestamp"
}
          },
				},
				{ upsert: true }
			);
*/

function getAuctionID() {
  const first = Date.now().toString(36).slice(-3);
  const second = Math.random().toString(36).slice(-3);

  return first + second
}