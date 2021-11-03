const Discord = require('discord.js');
const list = require('../../constants/Simulator/Json/prices.json');
const fetch = require('node-fetch')

module.exports = {
  name: "sbsell",
  description: "Sells Items for Skyblock Simulator",
  usage: "sbsell (Itemname) (Amount)",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['sell'],
  cooldown: 5,
  async execute(interaction, mclient) {

    const collection = mclient.db('SkyblockSim').collection('Players');
    let player = await collection.findOne({ _id: interaction.user.id })


    if (player === null) {
      const noprofile = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('No Profile found')
        .setDescription(`Create a Profile using \`/sb start\``)
      interaction.editReply({ embeds: [noprofile] })
      return;
    }

    //Creating the String for the Inventory
    let str = ''
    if (player.data.inventory.items === undefined) {
      str = 'Empty'
    } else {
      for (item of player.data.inventory.items) {
        str += item.name + ': ' + item.amount + '\n'
      }
    }


    //Variables for Checks
    let amount = interaction.options.getInteger('amount');
    let price = ''


    let bzname = interaction.options.getString('item').split(" ")
    bzname = bzname.join('_').toUpperCase()


    let input = interaction.options.getString('item')
    const words = input.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    let sellitem = words.join(" ");


    const founditem = player.data.inventory.items.find(item => item.name === sellitem)
    const itemindex = player.data.inventory.items.findIndex(item => item.name === sellitem)

    if (founditem === undefined) {
      let invaliditemembed = new Discord.MessageEmbed()
      .setTitle('Invalid Item Name')
      .setColor('RED')
      .setDescription(`\`${sellitem}\` isn't an valid Itemname.`)
      .setFooter('Skyblock Simulator')
      interaction.editReply({embeds: [invaliditemembed]})
      return;
    }

    if(Math.sign(amount) <= 0) {
      const embed = new Discord.MessageEmbed()
      .setTitle('Invalid Amount')
      .setColor('RED')
      .setFooter('Skyblock Simulator')
      .setDescription("Can't sell negative Items")
      return interaction.editReply({embeds: [embed]})
    }

    //Check if more than 1 of said item exists
    if (founditem === undefined || founditem.amount === 0) {
      const noitems = new Discord.MessageEmbed()
        .setFooter('Skyblock Simulator')
        .setColor('RED')
        .setDescription(`You don\'t have enough Items to be sold.`)
      interaction.editReply({ embeds: [noitems] })
      return;
    }

    //Check if a Number higher than the owned Amount is enterd
    if (founditem.amount < amount) {
      const littleitems = new Discord.MessageEmbed()
        .setFooter('Skyblock Simulator')
        .setColor('RED')
        .setDescription(`You entered a Number higher than the Amount of ${sellitem} than you own.\nEntered: **${amount}**\nOwned: **${founditem.amount}**`)
      interaction.editReply({ embeds: [littleitems] })
      return;
    }

    //Get Price for the Item and Calculate earned coins
    let data = await getPrice1(bzname)

    if (data.error) {
      price = await getPrice(sellitem)
    } else {
      price = Math.floor(data.quick_status.sellPrice)
      sellitem = data.name
    }
    let earnedcoins = price * amount

    //Add Coins and remove Items
    if (earnedcoins) {

    //  const updatePlayer = addItem(sellitem, amount, player)
    //  console.log(amount)

      await collection.updateOne(
        { _id: interaction.user.id, "data.inventory.items.name": sellitem },
  { $inc: { "data.inventory.items.$.amount": -amount }}
      )

     /* await collection.updateOne(
        { _id: interaction.user.id },
        { $inc: { 'data.profile.coins': earnedcoins } },
        { upsert: true }
      )*/

      //Remove Item if 0
      /*if (founditem.amount == 0) {
        let removeItem = updateItem(player, itemindex)

        await collection.replaceOne(
          { _id: interaction.user.id },
          removeItem
        )
      }*/

      await collection.updateOne(
        { _id: interaction.user.id },
        { $inc: { 'data.profile.coins': earnedcoins } },
        { upsert: true }
      )


      const sold = new Discord.MessageEmbed()
        .setFooter('Skyblock Simulator')
        .setColor('90EE90')
        .setDescription(`Successfully sold **${amount}x ${sellitem}** for **${earnedcoins.toLocaleString()} Coins**`)
      interaction.editReply({ embeds: [sold] })
      return;
    }
  }
};

function addItem(sellitem, amount, player) {
  if (!player.data.inventory.items) player.data.inventory.items = []

  if (player.data.inventory.items.length === 0) {
    player.data.inventory.items.push({
      name: sellitem,
      amount: amount
    })
    return player
  }

  for (const item of player.data.inventory.items) {
    if (item.name === sellitem) {
      item.amount -= amount
      return player
    }
  }

  player.data.inventory.items.push({
    name: sellitem,
    amount: amount
  })
  return player
}

function getPrice(sellitem) {
  const itemprice = list.filter(item => item.name == sellitem)
  //console.log(itemprice)
  price = itemprice[0].price
  return price
}

async function getPrice1(bzname) {
  const response = await fetch(`https://api.slothpixel.me/api/skyblock/bazaar/${bzname}`);
  return await response.json();
}

function updateItem(player, itemindex) {
  player.data.inventory.items.splice(itemindex, 1)
  return player;

}