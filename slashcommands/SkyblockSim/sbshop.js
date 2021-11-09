const Discord = require('discord.js');
const dungloot = require('../../constants/Simulator/Json/dungeonloot.json');

module.exports = {
  name: "sbshop",
  description: "Shows Skyblock Simulator Leaderboard",
  usage: "sblb",
  perms: "None",
  folder: "SkyblockSim",
  aliases: [],
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
    let lilyamount = 0

    let swordinv = player.data.inventory.sword
    let armorinv = player.data.inventory.armor
    let swordcost = ''
    let armorcost = ''

    let choosen = ''
    let choosen2 = ''


    if (player.data.inventory.items.find(item => item.name == 'Lilypad') != undefined) {
      lilyamount = player.data.inventory.items.find(item => item.name == 'Lilypad').amount
    }

    //Buttons
    const rod_button = new Discord.MessageButton()
      .setCustomId('rod')
      .setLabel('Fishing Rod')
      .setStyle('PRIMARY')
      .setDisabled(true)

    const cookie_button = new Discord.MessageButton()
      .setCustomId('cookie')
      .setLabel('Booster Cookie')
      .setStyle('PRIMARY')
      .setDisabled(true)
    
    const sword_button = new Discord.MessageButton()
      .setCustomId('sword')
      .setLabel('Sword')
      .setStyle('PRIMARY')
      .setDisabled(true)
    
    const armor_button = new Discord.MessageButton()
      .setCustomId('armor')
      .setLabel('Armor')
      .setStyle('PRIMARY')
      .setDisabled(true)

    const cancel_button = new Discord.MessageButton()
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle('DANGER')

    const row = new Discord.MessageActionRow()
    const row2 = new Discord.MessageActionRow()


    //Rod Upgrades
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

    //Sword Upgrades
    if(swordinv.find(item => item.name == 'Tactician\'s Sword') && coins > 5000000) {
      sword_button.setDisabled(false)
      choosen = 'Leaping Sword'
      swordcost = 5000000
    } else if(swordinv.find(item => item.name == 'Zombie Sword') && coins > 1000000) {
      sword_button.setDisabled(false)
      choosen = 'Tactician\'s Sword'
      swordcost = 1000000
    } else if(swordinv.find(item => item.name == 'Golem Sword') && coins > 100000) {
      sword_button.setDisabled(false)
      choosen = 'Zombie Sword'
      swordcost = 100000
    } else if(swordinv.find(item => item.name == 'Undead Sword') && coins > 50000) {
      sword_button.setDisabled(false)
      choosen = 'Golem Sword'
      swordcost = 50000
    } else if(swordinv.find(item => item.name == 'Fist') && coins > 15000) {
      sword_button.setDisabled(false)
      choosen = 'Undead Sword'
      swordcost = 15000
    }

    //Armor Upgrades
    if(armorinv.find(item => item.name == 'Frozen Blaze Armor') && coins > 10000000) {
      armor_button.setDisabled(false)
      choosen2 = 'Superior Dragon Armor'
      armorcost = 10000000
    } else if(armorinv.find(item => item.name === 'Tarantula Armor') && coins > 5000000) {
      armor_button.setDisabled(false)
      choosen2 = 'Frozen Blaze Armor'
      armorcost = 5000000
    }else if(armorinv.find(item => item.name === 'Monster Hunter Armor') && coins > 1000000) {
      armor_button.setDisabled(false)
      choosen2 = 'Tarantula Armor'
      armorcost = 1000000
    }else if(armorinv.find(item => item.name === 'Golem Armor') && coins > 500000) {
      armor_button.setDisabled(false)
      choosen2 = 'Monster Hunter Armor'
      armorcost = 500000
    }else if(armorinv.find(item => item.name === 'Leaflet Armor') && coins > 100000) {
      armor_button.setDisabled(false)
      choosen2 = 'Golem Armor'
      armorcost = 100000
    }else if(armorinv.find(item => item.name === 'Naked' || item.name === 'None') && coins > 50000) {
      armor_button.setDisabled(false)
      choosen2 = 'Leaflet Armor'
      armorcost = 50000
    }

    //Booster Cookie
    if (player.data.profile.gems >= 4) {
      cookie_button.setDisabled(false)
    }

    //Adding Buttons to row
    if (rod.name != 'Rod of the Sea' && row.components.length < 4) {
      row.addComponents(rod_button)
    } else if (rod.name != 'Rod of the Sea' && row2.components.length < 4){
      row2.addComponents(rod_button)
    }

    if (player.data.misc.booster_cookie.active == false && row.components.length < 4) {
      row.addComponents(cookie_button)
    } else if (player.data.misc.booster_cookie.active == false && row2.components.length < 4) {
      row2.addComponents(cookie_button)
    }

    if(!swordinv.find(item => item.name == 'Leaping Sword') && row.components.length < 4) {
      row.addComponents(sword_button)
    } else if(!swordinv.find(item => item.name == 'Leaping Sword') && row2.components.length < 4){
      row2.addComponents(sword_button)
    }

    if(!armorinv.find(item => item.name == 'Superior Dragon Armor') && row.components.length < 4) {
      row.addComponents(armor_button)
    } else if(!armorinv.find(item => item.name == 'Superior Dragon Armor') && row2.components.length < 4){
      row2.addComponents(armor_button)
    }

    row.addComponents(cancel_button)


    let shopembed = new Discord.MessageEmbed()
      .setTitle('Skyblock Simulator Shop')
      .setDescription('Upgrades or Items you can buy will Show up here. (If nothing shows up then you can\'t buy anything)')
      .setFooter('Skyblock Simulator')
      .setColor('GREY')

    //Rod Fields
    if (rod.name == 'Fishing Rod') {
      shopembed.addField('Prismarine Rod', '**Cost:** 5k Coins + 10 Lilypads\n\n**Stats:**\n\`5 α\`, \`10% 🎣\`', true)
    } else if (rod.name == 'Prismarine Rod') {
      shopembed.addField('Sponge Rod', '**Cost:** 25k Coins + 20 Lilypads\n\n**Stats:**\n\`10 α\`, \`20% 🎣\`', true)
    } else if (rod.name == 'Sponge Rod') {
      shopembed.addField('Speedster Rod', '**Cost:** 50k Coins + 30 Lilypads\n\n**Stats:**\n\`15 α\`, 30% 🎣', true)
    } else if (rod.name == 'Speedster Rod') {
      shopembed.addField('Farmer\'s Rod', '**Cost:** 100k Coins + 50 Lilypads\n\n**Stats:**\n\`20 α\`, \`40% 🎣\`', true)
    } else if (rod.name == 'Farmer\'s Rod') {
      shopembed.addField('Challenging Rod', '**Cost:** 250k Coins + 75 Lilypads\n\n**Stats:**\n\`25 α\`, \`50% 🎣\`', true)
    } else if (rod.name == 'Challenging Rod') {
      shopembed.addField('Rod of Champions', '**Cost:** 500k Coins + 100 Lilypads\n\n**Stats:**\n\`30 α\`, \`60% 🎣\`', true)
    } else if (rod.name == 'Rod of Champions') {
      shopembed.addField('Rod of Legends', '**Cost:** 1M Coins + 150 Lilypads\n\n**Stats:**\n\`40 α\`, \`70% 🎣\`', true)
    } else if (rod.name == 'Rod of Legends') {
      shopembed.addField('Rod of the Sea', '**Cost:** 50 Gems + 100 Lilypads\n\n**Stats:**\n\`50 α\`, \`75% 🎣\`', true)
    }

    //Cookie Field
    if (player.data.misc.booster_cookie.active == false) {
      shopembed.addField('Booster Cookie', '**Cost:** 4 Gems\n\n**Stats:**\n\`10 ✯\`, 10% Overall Stat incerase', true)
    }

    //Sword Fields
    if(swordinv.find(item => item.name == 'Leaping Sword')) {

    } else if(swordinv.find(item => item.name == 'Tactician\'s Sword')) {
      shopembed.addField('Leaping Sword', '**Cost:** 5m\n\n**Stats:** \`150 ⚔️\`, \`110 ❁\`, \`40 ☣\`, \`100 ☠\`', true)
    } else if(swordinv.find(item => item.name == 'Zombie Sword')) {
      shopembed.addField('Tactician\'s Sword', '**Cost:** 1m\n\n**Stats:** \`100 ⚔️\`, \`80 ❁\`, \`30 ☣\`, \`75 ☠\`', true)
    } else if(swordinv.find(item => item.name == 'Golem Sword')) {
      shopembed.addField('Zombie Sword', '**Cost:** 100k\n\n**Stats:** \`75 ⚔️\`, \`60 ❁\`, \`20 ☣\`, \`50 ☠\`', true)
    } else if(swordinv.find(item => item.name == 'Undead Sword')) {
      shopembed.addField('Golem Sword', '**Cost:** 50k\n\n**Stats:** \`50 ⚔️\`, \`40 ❁\`, \`10 ☣\`, \`30 ☠\`', true)
    } else if(swordinv.find(item => item.name == 'Fist')) {
      shopembed.addField('Undead Sword', '**Cost:** 15k\n\n**Stats:** \`20 ⚔️\`, \`15 ❁\`, \`10 ☠\`', true)
    }
    
    //Armor Fields
    if(armorinv.find(item => item.name == 'Superior Dragon Armor')) {
      
    } else if(armorinv.find(item => item.name == 'Frozen Blaze Armor')) {
      shopembed.addField('Superior Dragon Armor', '**Cost:** 10m\n\n**Stats:** \`300 ❤\`, \`150 ❈\`, \`150 ❁\`, \`40 ☣\`, \`150 ☠\`, \`15 ✯\`', true)
    } else if (armorinv.find(item => item.name == 'Tarantula Armor')) {
      shopembed.addField('Frozen Blaze Armor', '**Cost:** 5m\n\n**Stats:** \`200 ❤\`, \`150 ❈\`, \`100 ❁\`, \`15 ☣\`, \`50 ☠\`', true)
    } else if (armorinv.find(item => item.name == 'Monster Hunter Armor')) {
      shopembed.addField('Tarantula Armor', '**Cost:** 1m\n\n**Stats:** \`225 ❤\`, \`100 ❈\`, \`50 ❁\`, \`25 ☣\`, \`75 ☠\`', true)
    } else if (armorinv.find(item => item.name == 'Golem Armor')) {
      shopembed.addField('Monster Hunter Armor', '**Cost:** 500k\n\n**Stats:** \`150 ❤\`, \`60 ❈\`, \`30 ❁\`, \`15 ☣\`, \`40 ☠\`', true)
    } else if (armorinv.find(item => item.name == 'Leaflet Armor')) {
      shopembed.addField('Golem Armor', '**Cost:** 100k\n\n**Stats:** \`100 ❤\`, \`30 ❈\`, \`10 ❁\`, \`10 ☣\`, \`20 ☠\`', true)
    } else if (armorinv.find(item => item.name == 'Naked')) {
      shopembed.addField('Leaflet Armor', '**Cost:** 50k\n\n**Stats:** \`50 ❤\`, \`10 ❈\`, \`5 ☣\`, \`10 ☠\`', true)
      console.log('A')
    }


    //Filter and Collector
    const filter = i => {
      i.deferUpdate()
      return i.user.id === interaction.user.id
    }

    let list = [row]
    if(row2.components.length > 0) {
      list = [row, row2]
    }

    const menu = await interaction.editReply({ embeds: [shopembed], components: list })

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
            { $set: { 'data.equipment.fishing.rod.name': rodname, 'data.equipment.fishing.rod.sea_creature_chance': rodscc, 'data.equipment.fishing.rod.fishing_speed': rodspeed, "reforge": "None", recombobulated: false } },
            { upsert: true })

          await collection.updateOne(
            { _id: interaction.user.id, "data.inventory.items.name": sellitem },
            { $inc: { 'data.inventory.items.$.amount': -amount } },
            { upsert: true })
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


        } else if (id == 'cookie') {

          let expirationtime = Math.floor(Date.now() / 1000) + 172800

          await collection.updateOne(
            { _id: interaction.user.id },
            { $inc: { 'data.profile.gems': -4 } },
            { upsert: true })

          await collection.updateOne(
            { _id: interaction.user.id },
            { $set: { 'data.misc.booster_cookie.active': true, 'data.misc.booster_cookie.expires': expirationtime } },
            { upsert: true })

          const purchased = new Discord.MessageEmbed()
            .setDescription('Purchased Booster Cookie')
            .setColor('GREEN')

          interaction.editReply({ embeds: [purchased], components: [] })
        } else if (id == 'sword') {
          let item = dungloot[choosen]
          await collection.updateOne(
          { _id: interaction.user.id },
          { $push: { "data.inventory.sword": { "name": choosen, "damage": item.damage, "strength": item.strength, "crit_chance": item.crit_chance, "crit_damage": item.crit_damage, "recombobulated": item.recombobulated, "reforge": "None" }}},
          {upsert: true })
          await collection.updateOne(
            { _id: interaction.user.id },
            { $inc: { 'data.profile.coins': -swordcost } },
            { upsert: true })
            const lootembed = new Discord.MessageEmbed()
            .setDescription(`Purchased ${choosen}`)
            .setColor('GREEN')
            .setFooter('Skyblock Simulator')
          return interaction.editReply({ embeds: [lootembed], components: [] })
        } else if (id == 'armor') {
          let item = dungloot[choosen2]
          await collection.updateOne(
          { _id: interaction.user.id },
          { $push: { "data.inventory.armor": { "name": choosen2, "health": item.health, "defense": item.defense, "strength": item.strength, "crit_chance": item.crit_chance, "crit_damage": item.crit_damage, "magic_find": item.magic_find, "sea_creature_chance": item.sea_creature_chance, "recombobulated": item.recombobulated, "reforge": "None" }}},
          {upsert: true })
          await collection.updateOne(
            { _id: interaction.user.id },
            { $inc: { 'data.profile.coins': -armorcost } },
            { upsert: true })
            const lootembed = new Discord.MessageEmbed()
            .setDescription(`Purchased ${choosen2}`)
            .setColor('GREEN')
            .setFooter('Skyblock Simulator')
          return interaction.editReply({ embeds: [lootembed], components: [] })
        } else {
          const cancelled = new Discord.MessageEmbed()
            .setTitle('Menu Cancelled')
            .setColor('RED')
          interaction.editReply({ embeds: [cancelled], components: [] })
          return
        }
      }).catch(err => console.log(''))
  }
};

/*
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
*/