const Discord = require('discord.js');

module.exports = {
  name: "sbtrade",
  description: "a",
  usage: "sbsettings (Setting Name)",
  perms: "None",
  folder: "SkyblockSim",
  aliases: [],
  cooldown: 10,
  async execute(interaction, mclient) {

    let action = interaction.options.getString('action')
    let user = interaction.options.getUser('user')
    let tradeitem = interaction.options.getString('trade-item')
    let amount = interaction.options.getInteger('amount')

    const collection = mclient.db('SkyblockSim').collection('Players');
    let player = await collection.findOne({ _id: interaction.user.id })

    const collection1 = mclient.db('SkyblockSim').collection('trades');

    if(action == 'send-offer') {
      if(!user.id) {
        let nouserembed = new Discord.MessageEmbed()
        .setTitle('Invalid User')
        .setColor('RED')
        .setFooter('Skyblock Simulator')

        return interaction.editReply({embeds: [nouserembed]})
      }

    let finditem = player.data.inventory.items.find(item => item.name == caps(tradeitem))

    if(finditem.amount == 0 || finditem == undefined) {
      let noitemembed = new Discord.MessageEmbed()
      .setTitle('No Item found.')
      .setDescription(`Couldn\'t find any Items matching \`${caps(tradeitem)}\`, make sure you spelled it corrrectly.`)
      .setFooter('Skyblock Simulator')
      .setColor('RED')

      return interaction.editReply({embeds: [noitemembed]})
      }

    if(amount > finditem.amount) {
      let lowitemsembed = new Discord.MessageEmbed()
      .setTitle('Too few Items')
      .setDescription(`You only have ${finditem.amount} ${tradeitem}, but tried to trade ${amount} ${tradeitem}.`)
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [lowitemsembed]})
    }
    
      let dmed = 'yes'
        try {
          let tradereq = new Discord.MessageEmbed()
          .setTitle(`Trade Offer from ${interaction.user.tag}`)
          .setDescription(`Wants to trade ${amount} ${tradeitem}.\n\nSend your offer back with \`/sb trade reply-offer @User/UserId Item amount\` once you sent them an offer back you need to wait for them to accept it.`)
          let fetched = await client.user.fetch(user.id)
          fetched.send({embeds: [tradereq]})

        } catch (e) {
          dmed = 'no'
        }
      
      
    
      let sentembed = new Discord.MessageEmbed()
      .setTitle('Trade sent')
      .setDescription(`Sent a trade to the User offering them ${amount} ${tradeitem}.\nWait for the User to reply you with an offer which u then can accept or deny (you get dmed when they reply an offer)\n\nUser dmed: ${dmed}`)
      .setColor('GREEN')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [sentembed]})
    }






  }
}

function caps(words) {
  let separateWord = words.toLowerCase().split(' ');
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
      separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}

/*
          await collection.updateOne(
          { _id: interaction.user.id },
          { $set: { sender: {
            id: interaction.user.id, item: tradeitem, amount: amount, accepted: false
          }, reciever: {
            id: user.id, item: 'None', amount: 0, accepted: false
          } } },
          { upsert: true })
*/