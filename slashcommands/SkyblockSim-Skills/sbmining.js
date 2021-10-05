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

    let embed = new Discord.MessageEmbed()
    .setTitle('Mine')
    .setDescription(``)
    .setFooter('Skyblock Simulator')
    .setColor('GREY')

    const cancel = new Discord.MessageButton()
      .setCustomId('cancel')
      .setLabel('Stop Fishing')
      .setStyle('DANGER')

    const mine = new Discord.MessageButton()
      .setCustomId('mine')
      .setLabel('Mine Ore')
      .setStyle('PRIMARY')

    const mineoff = new Discord.MessageButton()
      .setCustomId('mineoff')
      .setLabel('Mine Ore')
      .setStyle('PRIMARY')

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

    //Collector
    collector.on('collect', async i => {
      if(i.customId == 'mine') {
        //handle user mining here
      } else if (i.customId == 'cancel') {
        collector.stop()
      }
    })

    //Collector End
    collector.on('end', async collected => {
      embed.setColor('RED')
      embed.fields = []
      embed.addField('\u200b', 'Stopped Mining.')
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

function addItems(oreadrop, amount, player) {
  if (!player.data.inventory.items) player.data.inventory.items = []

  if (player.data.inventory.items.length === 0) {
    player.data.inventory.items.push({
      name: oreadrop,
      amount: amount
    })
    return player
  }

  for (const item of player.data.inventory.items) {
    if (item.name === oreadrop) {
      item.amount += amount
      return player
    }
  }

  player.data.inventory.items.push({
    name: oreadrop,
    amount: amount
  })
  return player
}