const Discord = require('discord.js');
const prefix = require("@replit/database");
const prefixx = new prefix();
const emoji = require('../../Various/Skyblock/emojis.json')

module.exports = {
  name: "Sbfishing",
  description: "Earn Fishing XP",
  usage: "sbfishing",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['fishing', 'fish'],
  cooldown: 60,
  async execute(client, message, args, mclient) {

    const collection = mclient.db('SkyblockSim').collection('Players');
    let player = await collection.findOne({ _id: message.author.id })



    var gprefix = await prefixx.get(message.guild.id, { raw: false });
    if (gprefix === null) gprefix = '.';

    if (player === null) {
      const noprofile = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('No Profile found')
        .setDescription(`Create a Profile using \`${gprefix}sbstart\` or \`${gprefix}sbcreate\``)
      message.channel.send({ embeds: [noprofile] })
      return;
    }



    //Values needed
    let rod = player.data.equipment.fishing.rod
    let sea_creature_chance = player.data.stats.sea_creature_chance
    let isCreature = ''
    let fish_caught = 0
    let sea_creatures_killed = 0
    let rod_casted = false
    let creature_caught = false

    //Buttons for Catching Fish
    const bcatch = new Discord.MessageButton()
      .setCustomId('cast')
      .setLabel('Cast Rod')
      .setStyle('PRIMARY')
     
     const blure = new Discord.MessageButton()
     .setCustomId('lure')
     .setLabel('Lure Rod')
     .setStyle('PRIMARY')

    //Buttons for Killing Sea Creatures
    const bkillsc = new Discord.MessageButton()
      .setCustomId('killsc')
      .setLabel('Kill Sea Creature')
      .setStyle('PRIMARY')

    const bkillscoff = new Discord.MessageButton()
      .setCustomId('aa')
      .setLabel('Kill Sea Creature')
      .setStyle('PRIMARY')
      .setDisabled(true)

    //Stop Button
    const bcancel = new Discord.MessageButton()
      .setCustomId('cancel')
      .setLabel('Stop Fishing')
      .setStyle('DANGER')

    //Different Rows needed
    const row = new Discord.MessageActionRow()
      .addComponents(bcatch, bkillscoff, bcancel)
    const row1 = new Discord.MessageActionRow()
    .addComponents(blure, bkillscoff, bcancel)
    const row2 = new Discord.MessageActionRow()
      .addComponents(bcatch, bkillsc, bcancel)

    //Pond Embed
    let pond = new Discord.MessageEmbed()
      .setTitle('Fishing Pond')
      .setColor('BLUE')
      .setFooter('Skyblock Simulator')
      .setDescription(`${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n`)

.addField(`Info`, `Fish caught: ${fish_caught}`, true)

    const menu = await message.channel.send({ embeds: [pond], components: [row] })

    const filter = i => {
      i.deferUpdate();
      return i.user.id === message.author.id;
    };

    const collector = menu.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 1000000 })

    collector.on('collect', async i => {
      if (i.customId === 'cast' && rod_casted === false) {
        rod_casted = true
        
        menu.edit({embeds: [pond], components: [row1]})

      } else if (i.customId === 'lure' && rod_casted === true) {
        let creature = isSeaCreature(sea_creature_chance, isCreature)
        if(creature === 'yes') {
          message.channel.send('SC Found')
        }
        rod_casted = false
        fish_caught = fish_caught += 1
        pond.fields = [];
        pond.addField(`Info`, `Fish caught: ${fish_caught}`)
     
       menu.edit({embeds: [pond], components: [row]})
        } else if (i.customId === 'killsc') {

      } else if (i.customId === 'cancel') {
        collector.stop()
      }
    })

    collector.on('end', async collected => {
      
      menu.edit({ components: [] })
    });
  }
};

function isSeaCreature(sea_creature_chance, isCreature) {
  let rn = Math.floor(Math.random() * 100) + 1
  if(rn < sea_creature_chance) {
    isCreature = 'yes'
    return isCreature
  } else {
    isCreature = 'no'
    return isCreature
  }
  
}