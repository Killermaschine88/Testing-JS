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
    let catched = ''
    let sc = ''

    //Buttons for Catching Fish
    const bcatch = new Discord.MessageButton()
      .setCustomId('cast')
      .setLabel('Cast Rod')
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
      .addComponents(bcatch, bkillsc, bcancel)

    //Pond Embed
    let pond = new Discord.MessageEmbed()
      .setTitle('Fishing Pond')
      .setColor('BLUE')
      .setFooter('Skyblock Simulator')
      .setDescription(`Fish Caught: ${player.data.misc.temp.fishes}\nCreatures killed: ${player.data.misc.temp.creatures}\n\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}${emoji.water}\n`)

    const menu = await message.channel.send({ embeds: [pond], components: [row] })

    /*const filter = i => {
      i.deferUpdate();
      return i.user.id === message.author.id;
    };

    const collector = menu.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 1000000 })

    collector.on('collect', async i => {
      if (i.customId === 'cast') {
        if (player.data.misc.temp.casted === false) {
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { "data.misc.temp.casted": true } },
            { upsert: true })
          console.log('Started Fishing')
        } else {
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { "data.misc.temp.casted": false } },
            { upsert: true })
          console.log('Stopped Fishing')
        }

      } else if (i.customId === 'killsc') {

      } else if (i.customId === 'cancel') {
        collector.stop()
      }
    })

    collector.on('end', async collected => {
      await collection.updateOne(
        { _id: message.author.id },
        { $set: { "data.misc.temp.fishing": false } },
        { upsert: true })
      menu.edit({ components: [] })
    });*/
  }
};
