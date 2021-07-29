const Discord = require('discord.js');
const prefix = require("@replit/database");
const prefixx = new prefix();


module.exports = {
  name: "dmgtest",
  description: "Test DMG System",
  usage: "sbdmg",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['t'],
  cooldown: 10,
  async execute(client, message, args, mclient) {


    const collection1 = mclient.db('SkyblockSim').collection('Main');
    let found1 = await collection1.findOne({ _id: message.author.id })

    const collection2 = mclient.db('SkyblockSim').collection('Stats');
    let found2 = await collection2.findOne({ _id: message.author.id })


    if (found1 === null) {
      const nodata = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`No Profile found for <@${message.author.id}>`)
      message.channel.send({ embeds: [nodata] })
      return;
    }

    const start = new Discord.MessageEmbed()
      .setFooter('Skyblock Simulator')
      .setColor('90EE90')
      .setDescription(`Dmg Testing`)
    const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId('dmg')
          .setLabel('Attack')
          .setStyle('PRIMARY'),
      );

    const menu = await message.channel.send({ embeds: [start], components: [row] })

    //Player Stats
    let php = found2.health
    let damage = found2.damage
    let strength = found2.strength
    let pdmg = (5 + damage) * (1 + (strength / 100))

    //Mob Stats
    let mhp = 50
    let mdmg = 4


    const filter = i => {
      i.deferUpdate();
      return i.user.id === message.author.id;
    };

    const collector = menu.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 60000 })

    collector.on('collect', async i => {
      if (i.customId === 'dmg' && php >= 0) {

        php = dmgtaken(php, mdmg)
        mhp = dmgdealt(mhp, pdmg)

        const mobembed = new Discord.MessageEmbed()
          .setFooter('Skyblock Simulator')
          .setColor('90EE90')
          .setDescription(`Player Health: ❤️ ${php} (-<:berserker:852079613052059658> ${mdmg})\nMob Health: ❤️ ${mhp} (-<:berserker:852079613052059658> ${pdmg})`)
        menu.edit({ embeds: [mobembed] })

        if (i.customId === 'dmg' && mhp <= 0) {
          const killed = new Discord.MessageEmbed()
            .setFooter('Skyblock Simulator')
            .setColor('90EE90')
            .setDescription(`Killed the Enemy with **❤️ ${php}** left.`)

          menu.edit({ embeds: [killed], components: [] })
        } else if (i.customId === 'dmg' && php <= 0) {
          const died = new Discord.MessageEmbed()
            .setFooter('Skyblock Simulator')
            .setColor('90EE90')
            .setDescription(`Died to the Enemy which had **❤️ ${mhp}** left.`)

          menu.edit({ embeds: [died], components: [] })
        }
      }
    })






















  }
};

function dmgtaken(php, mdmg) {
  php -= mdmg
  return php;
}

function dmgdealt(mhp, pdmg) {
  mhp -= pdmg
  return mhp;
}