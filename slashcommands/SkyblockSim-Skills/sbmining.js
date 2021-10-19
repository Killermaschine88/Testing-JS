const Discord = require('discord.js');
const emoji = require('../../constants/Simulator/Json/emojis.json')
const mobs = require('../../constants/Simulator/Json/mobstats.json')
const getLevel = require('../../constants/Simulator/Functions/skilllvl.js')
const playerStats = require('../../constants/Simulator/Functions/playerStats.js')

module.exports = {
  name: "sbmining",
  description: "Earn Fishing XP",
  usage: "sbfishing",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['fishing', 'fish'],
  cooldown: 20,
  async execute(interaction, mclient) {

    const collection = mclient.db('SkyblockSim').collection('Players');
    let player = await collection.findOne({ _id: interaction.user.id })

    const collection1 = mclient.db('SkyblockSim').collection('blockedchannels');


    if (player === null) {
      const noprofile = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('No Profile found')
        .setDescription(`Create a Profile using \`/sb start\``)
      interaction.editReply({ embeds: [noprofile] })
      return;
    }

    if (player.data.misc.is_mining === true) {
      const alreadymining = new Discord.MessageEmbed()
        .setTitle('You are already Mining somewhere so i can\'t create another Mine for you')
        .setColor('RED')
        .setFooter('Skyblock Simulator')
      interaction.editReply({ embeds: [alreadymining] })
      return;
    }

    var validlocations = ['Coal Mine', 'Gold Mine', 'Gunpowder Mines', 'Lapis Quarry', 'Pigman\'s Den', 'Slimehill', 'Diamond Reserve', 'Obsidian Sanctuary', 'Dwarven Mines', 'Crystal Hollows']
    if(!validlocations.includes(player.data.misc.location)) {
      const invalidarea = new Discord.MessageEmbed()
        .setTitle('Not at a Mining Area')
        .setDescription('You are not at a valid Mining Area, please choose one from /sb warp')
        .setColor('RED')

      return interaction.editReply({embeds: [invalidarea]})
    }

    let ps = await playerStats(player)
    let cd = await getCooldown(ps)
    let ore = { name: 'Cobblestone', img: 'https://static.wikia.nocookie.net/minecraft_de_gamepedia/images/a/a2/Bruchstein.png'}

    let embed = new Discord.MessageEmbed()
      .setTitle('Mine')
      .setDescription(`Pickaxe: **${player.data.equipment.mining.pickaxe.name}**\nMining Speed: **${ps.mining_speed}**`)
      .setImage(ore.img)
      .setFooter('Skyblock Simulator')
      .setColor('GREY')

    const cancel = new Discord.MessageButton()
      .setCustomId('cancel')
      .setLabel('Stop Mining')
      .setStyle('DANGER')

    const mine = new Discord.MessageButton()
      .setCustomId('mine')
      .setLabel('Mine Ore')
      .setStyle('PRIMARY')

    const mineoff = new Discord.MessageButton()
      .setCustomId('mineoff')
      .setLabel('Mine Ore')
      .setStyle('PRIMARY')
      .setDisabled(true)

    const row = new Discord.MessageActionRow()
      .addComponents(mine, cancel)
    const row1 = new Discord.MessageActionRow()
      .addComponents(mineoff, cancel)

    let menu = await interaction.editReply({embeds: [embed], components: [row]})

  const filter = i => {
      i.deferUpdate();
      return i.user.id === interaction.user.id;
    };

    const collector = menu.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 858000 })

    await collection1.updateOne(
      { _id: interaction.channelId },
      { $set: { blocked: true, user: interaction.user.id } },
      { upsert: true })


    //Collector
    collector.on('collect', async i => {
      if(i.customId == 'mine') {
        let ore = getOre(player, ps)
        embed.setImage(ore.img)

        
        interaction.editReply({embeds: [embed], components: [row1]})

        await sleep(cd)
        player = await collection.findOne({ _id: interaction.user.id })

          const updatePlayer = await addItems(ore, player)

          await collection.replaceOne(
            { _id: interaction.user.id },
            updatePlayer
          )
        

        interaction.editReply({embeds: [embed], components: [row]})
        
      } else if (i.customId == 'cancel') {
        collector.stop()
      }
    })

    //Collector End
    collector.on('end', async collected => {
      embed.setColor('RED')
      embed.fields = []
      embed.addField('\u200b', 'Stopped Mining.')
      embed.setImage('')
      await collection.updateOne(
        { _id: interaction.user.id },
        { $set: { "data.misc.is_mining": false } },
        { upsert: true })
      await collection1.updateOne(
      { _id: interaction.channelId },
      { $set: { blocked: false } },
      { upsert: true })
      menu.edit({ embeds: [embed], components: [] })
    });
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms))
}

function addItems(ore, player) {
  if (!player.data.inventory.items) player.data.inventory.items = []

  if (player.data.inventory.items.length === 0) {
    player.data.inventory.items.push({
      name: ore.name,
      amount: ore.amount
    })
    return player
  }

  for (const item of player.data.inventory.items) {
    if (item.name === ore.name) {
      item.amount += ore.amount
      return player
    }
  }

  player.data.inventory.items.push({
    name: ore.name,
    amount: ore.amount
  })
  return player
}

function getOre(player, ps) {
  let location = player.data.misc.location
  let ores = ''
  let name = ''
  let img = ''
  let amount = ''

  //Get valid ores for area
  if(location == 'Coal Mine') {
    ores = ['Cobblestone', 'Coal']
  } else if(location == 'Gunpowder Mines') {
    ores = ['Cobblestone', 'Coal', 'Iron Ingot', 'Gold Ingot']
  } else if(location == 'Lapis Quarry') {
    ores = ['Cobblestone', 'Lapis Lazuli']
  } else if(location == 'Pigman\'s Den') {
    ores = ['Cobblestone', 'Redstone']
  } else if(location == 'Slimehill') {
    ores = ['Cobblestone', 'Emerald']
  } else if(location == 'Diamond Reserve') {
    ores = ['Cobblestone', 'Diamond']
  } else if(location == 'Obsidian Sanctuary') {
    ores = ['Cobblestone', 'Diamond', 'Obsidian']
  } else if(location == 'Dwarven Mines') {
    ores = ['Cobblestone', 'Coal', 'Iron Ingot', 'Gold Ingot', 'Lapis Lazuli', 'Redstone', 'Emerald', 'Diamond', 'Mithril']
  } else if(location == 'Crystal Hollows') {
    ores = ['Hardstone', 'Coal', 'Iron Ingot', 'Gold Ingot', 'Lapis Lazuli', 'Redstone', 'Emerald', 'Diamond', 'Mithril', 'Titanium', 'Gemstone']
  }

  //Generate Random Ore
  let randore = ores[Math.floor(Math.random() * ores.length)]

  //Decide whats choosen
  if(randore == 'Cobblestone') {
    name = 'Cobblestone'
    img = 'https://static.wikia.nocookie.net/minecraft_de_gamepedia/images/a/a2/Bruchstein.png'
  } else if(randore == 'Coal') {
    name = 'Coal'
    img = 'https://static.wikia.nocookie.net/minecraft_de_gamepedia/images/c/c1/Kohle.png'
  } else if(randore == 'Iron Ingot') {
    name = 'Iron Ingot'
    img = 'https://static.wikia.nocookie.net/minecraft_de_gamepedia/images/2/24/Eisenbarren.png'
  } else if(randore == 'Gold Ingot') {
    name = 'Gold Ingot'
    img = 'https://static.wikia.nocookie.net/minecraft_de_gamepedia/images/9/93/Goldbarren.png'
  } else if(randore == 'Lapis Lazuli') {
    name = 'Lapis Lazuli'
    img = 'https://static.wikia.nocookie.net/minecraft_de_gamepedia/images/8/81/Lapislazuli.png'
  } else if(randore == 'Redstone') {
    name = 'Redstone'
    img = 'https://static.wikia.nocookie.net/minecraft_de_gamepedia/images/2/20/Redstone-Staub.png'
  } else if(randore == 'Emerald') {
    name = 'Emerald'
    img = 'https://static.wikia.nocookie.net/minecraft_de_gamepedia/images/c/c5/Smaragd.png'
  } else if(randore == 'Diamond') {
    name = 'Diamond'
    img = 'https://static.wikia.nocookie.net/minecraft_de_gamepedia/images/6/64/Diamant.png'
  } else if(randore == 'Obsidian') {
    name = 'Obsidian'
    img = 'https://static.wikia.nocookie.net/minecraft_de_gamepedia/images/2/24/Obsidian.png'
  } else if(randore == 'Mithril') {
    name = 'Mithril'
    img = 'https://static.wikia.nocookie.net/minecraft_de_gamepedia/images/0/0c/Prismarinkristalle.png'
  } else if(randore == 'Hardstone') {
    name = 'Hardstone'
    img = 'https://static.wikia.nocookie.net/minecraft_de_gamepedia/images/4/45/Stein.png'
  } else if(randore == 'Gemstone') {
    name = 'Gemstone'
    img = 'https://static.wikia.nocookie.net/hypixel-skyblock/images/8/8d/Rough_Ruby_Gemstone.png'
  } else if(randore == 'Titanium') {
    name = 'Titanium'
    img = 'https://static.wikia.nocookie.net/hypixel-skyblock/images/c/cc/Titanium.png'
  }

  //return data
  return {
    name: name,
    img: img,
    amount: amount
  }
}

async function getCooldown(ps) {
  if(ps.mining_speed < 10) {
    return 2000
  } else if(ps.mining_speed < 20) {
    return 1900
  } else if(ps.mining_speed < 30) {
    return 1700
  } else if(ps.mining_speed < 40) {
    return 1600
  } else if(ps.mining_speed < 50) {
    return 1500
  } else if(ps.mining_speed < 60) {
    return 1400
  } else if(ps.mining_speed < 70) {
    return 1300
  } else if(ps.mining_speed < 80) {
    return 1200
  } else if(ps.mining_speed < 90) {
    return 1100
  } else if(ps.mining_speed < 100) {
    return 1000
  }
}