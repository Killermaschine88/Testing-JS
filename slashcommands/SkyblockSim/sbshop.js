const Discord = require('discord.js');

module.exports = {
  name: "sbshop",
  description: "Shows Skyblock Simulator Leaderboard",
  usage: "sblb",
  perms: "None",
  folder: "SkyblockSim",
  aliases: [],
  cooldown: 10,
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

    let rod = {
      name: player.data.equipment.fishing.rod.name, sea_creature_chance: player.data.equipment.fishing.rod.sea_creature_chance, fishing_speed: player.data.equipment.fishing.rod.fishing_speed
    }

    let rodtier = ''
    let rodspeed = ''
    let rodscc = ''
    let rodname = ''
    let coins = player.data.profile.coins
    let cost = ''
    let amount = ''
    let gemsneeded = 0
    let sellitem = 'Lilypad'
    let lilyamount = player.data.inventory.items.find(item => item.name == 'Lilypad').amount

    //Buttons
    const rod_button = new Discord.MessageButton()
      .setCustomId('rod')
      .setLabel('Fishing Rod')
      .setStyle('PRIMARY')
      .setDisabled(true)

    const cancel_button = new Discord.MessageButton()
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle('DANGER')

    const row = new Discord.MessageActionRow()

    if (rod.name != 'Rod of the Sea') {
      row.addComponents(rod_button)
    }
    row.addComponents(cancel_button)


    if (rod.name == 'Fishing Rod' && coins >= 5000 && lilyamount >= 10) {
      rod_button.setDisabled(false)
      rodname = 'Prismarine Rod'
      rodscc = 5
      rodspeed = 10

      cost = 5000
      amount = 10
    } else if (rod.name == 'Prismarine Rod' && coins >= 25000 && lilyamount >= 20) {
      rod_button.setDisabled(false)
      rodname = 'Sponge Rod'
      rodscc = 10
      rodspeed = 20

      cost = 25000
      amount = 20
    } else if (rod.name == 'Sponge Rod' && coins >= 50000 && lilyamount >= 30) {
      rod_button.setDisabled(false)
      rodname = 'Speedster Rod'
      rodscc = 15
      rodspeed = 30

      cost = 50000
      amount = 30
    } else if (rod.name == 'Speedster Rod' && coins >= 100000 && lilyamount >= 50) {
      rod_button.setDisabled(false)
      rodname = 'Farmer\'s Rod'
      rodscc = 20
      rodspeed = 40

      cost = 100000
      amount = 50
    } else if (rod.name == 'Farmer\'s Rod' && coins >= 250000 && lilyamount >= 75) {
      rod_button.setDisabled(false)
      rodname = 'Challenging Rod'
      rodscc = 25
      rodspeed = 50

      cost = 250000
      amount = 75
    } else if (rod.name == 'Challenging Rod' && coins >= 500000 && lilyamount >= 100) {
      rod_button.setDisabled(false)
      rodname = 'Rod of Champions'
      rodscc = 30
      rodspeed = 60

      cost = 500000
      amount = 100
    } else if (rod.name == 'Rod of Champions' && coins >= 1000000 && lilyamount >= 150) {
      rod_button.setDisabled(false)
      rodname = 'Rod of Legends'
      rodscc = 40
      rodspeed = 70

      cost = 1000000
      amount = 150
    } else if (rod.name == 'Rod of Legends' && player.data.profile.gems >= 50 && lilyamount >= 100) {
      rod_button.setDisabled(false)
      rodname = 'Rod of the Sea'
      rodscc = 50
      rodspeed = 75

      gemsneeded = 50
      amount = 100
    }

    let shopembed = new Discord.MessageEmbed()
      .setTitle('Skyblock Simulator Shop')
      .setFooter('Skyblock Simulator')
      .setColor('GREY')

    if (rod.name == 'Fishing Rod') {
      shopembed.addField('Prismarine Rod', '**Cost:**\n5k Coins + 10 Lilypads\n\n**Stats:**\n5 Sea Creature Chance\n10% Fishing Speed')
    } else if (rod.name == 'Prismarine Rod') {
      shopembed.addField('Sponge Rod', '**Cost:**\n25k Coins + 20 Lilypads\n\n**Stats:**\n10 Sea Creature Chance\n20% Fishing Speed')
    } else if (rod.name == 'Sponge Rod') {
      shopembed.addField('Speedster Rod', '**Cost:**\n50k Coins + 30 Lilypads\n\n**Stats:**\n15 Sea Creature Chance\n30% Fishing Speed')
    } else if (rod.name == 'Speedster Rod') {
      shopembed.addField('Farmer\'s Rod', '**Cost:**\n100k Coins + 50 Lilypads\n\n**Stats:**\n20 Sea Creature Chance\n40% Fishing Speed')
    } else if (rod.name == 'Farmer\'s Rod') {
      shopembed.addField('Challenging Rod', '**Cost:**\n250k Coins + 75 Lilypads\n\n**Stats:**\n25 Sea Creature Chance\n50% Fishing Speed')
    } else if (rod.name == 'Challenging Rod') {
      shopembed.addField('Rod of Champions', '**Cost:**\n500k Coins + 100 Lilypads\n\n**Stats:**\n30 Sea Creature Chance\n60% Fishing Speed')
    } else if (rod.name == 'Rod of Champions') {
      shopembed.addField('Rod of Legends', '**Cost:**\n1M Coins + 150 Lilypads\n\n**Stats:**\n40 Sea Creature Chance\n70% Fishing Speed')
    } else if (rod.name == 'Rod of Legends') {
      shopembed.addField('Rod of the Sea', '**Cost:**\n50 Gems + 100 Lilypads\n\n**Stats:**\n50 Sea Creature Chance\n75% Fishing Speed')
    }

    const filter = i => {
      i.deferUpdate()
      return i.user.id === interaction.user.id
    }

    const menu = await interaction.editReply({ embeds: [shopembed], components: [row] })

    await menu.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 60000 })
      .then(async i => {
        const { customId: id } = i


        if (id == 'rod') { //Upgrade Rod
          if (gemsneeded != 0) { //If Max Rod
            await collection.updateOne(
              { _id: interaction.user.id },
              { $inc: { 'data.profile.gems': -gemsneeded } },
              { upsert: true })
          } else {
            await collection.updateOne(
              { _id: interaction.user.id },
              { $inc: { 'data.profile.coins': -cost } },
              { upsert: true })
          }
          await collection.updateOne(
            { _id: interaction.user.id },
            { $set: { 'data.equipment.fishing.rod.name': rodname, 'data.equipment.fishing.rod.sea_creature_chance': rodscc, 'data.equipment.fishing.rod.fishing_speed': rodspeed } },
            { upsert: true })

          let player = await collection.findOne({ _id: interaction.user.id })
          const updatePlayer = addItem(sellitem, amount, player)

          await collection.replaceOne(
            { _id: interaction.user.id },
            updatePlayer
          )
          if (gemsneeded != 0) {
            const finished = new Discord.MessageEmbed()
              .setTitle('Rod Upgarded')
              .setDescription(`Purchased **${rodname}** for 50 Gems and ${amount} Lilypads.`)
              .setColor('GREEN')

            interaction.editReply({ embeds: [finished], components: [] })
          } else {
            const finished = new Discord.MessageEmbed()
              .setTitle('Rod Upgarded')
              .setDescription(`Purchased **${rodname}** for ${cost} Coins and ${amount} Lilypads.`)
              .setColor('GREEN')

            interaction.editReply({ embeds: [finished], components: [] })
          }


        } else {
          const cancelled = new Discord.MessageEmbed()
            .setTitle('Menu Cancelled')
            .setColor('RED')
          interaction.editReply({ embeds: [cancelled], components: [] })
          return
        }
      }).catch(err => menu.edit({ components: [] }))



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