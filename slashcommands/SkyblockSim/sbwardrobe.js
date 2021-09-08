const Discord = require('discord.js');
const cataLevel = require('./Various/dungeonlevel.js')

module.exports = {
  name: "sbwardrobe",
  description: "a",
  usage: "sbsettings (Setting Name)",
  perms: "None",
  folder: "SkyblockSim",
  aliases: [],
  cooldown: 10,
  async execute(interaction, mclient) {

    const collection = mclient.db('SkyblockSim').collection('Players');
    let player = await collection.findOne({ _id: interaction.user.id })

    let type = interaction.options.getString('choice')
    let index = interaction.options.getInteger('index')

    let sword = player.data.inventory.sword
    let armor = player.data.inventory.armor
    let item = ''

    if (player === null) {
      const noprofile = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('No Profile found')
        .setDescription(`Create a Profile using \`/sb start\``)
      interaction.editReply({ embeds: [noprofile] })
      return;
    }

    if(type == 'sword' && sword.length <= index) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Item Index')
      .setDescription(`You don\'t own a Sword with the Index \`${index}\`.\nCheck the Sword Category at \`/sb info\` to see what Items you own.`)
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [errembed]})
    } 
    if (type == 'armor' && armor.length <= index) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Item Index')
      .setDescription(`You don\'t own a Sword with the Index \`${index}\`.\nCheck the Armor Category at \`/sb info\` to see what Items you own.`)
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [errembed]})
    }

    if(type == 'sword') {
      item = sword[index]
        await collection.updateOne(
          { _id: interaction.user.id },
          { $set: { "data.equipment.combat.sword.name": item.name, "data.equipment.combat.sword.damage": item.damage, "data.equipment.combat.sword.strength": item.strength, "data.equipment.combat.sword.crit_chance": item.crit_chance, "data.equipment.combat.sword.crit_damage": item.crit_damage }, "data.equipment.combat.sword.recombobulated": item.recombobulated },
          { upsert: true })
      
      const sucembed = new Discord.MessageEmbed()
      .setTitle('Armor Changed')
      .setDescription(`Successfully changed Sword to ${item.name}`)
      .setColor('GREEN')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [sucembed]})
    } else if (type == 'armor') {
      item = armor[index]
        await collection.updateOne(
          { _id: interaction.user.id },
          { $set: { "data.equipment.combat.armor.name": item.name, "data.equipment.combat.armor.health": item.health, "data.equipment.combat.armor.defense": item.defense, "data.equipment.combat.armor.strength": item.strength, "data.equipment.combat.armor.crit_chance": item.crit_chance, "data.equipment.combat.armor.crit_damage": item.crit_damage, "data.equipment.combat.armor.magic_find": item.magic_find, "data.equipment.combat.armor.sea_creature_chance": item.sea_creature_chance, "data.equipment.combat.armor.recombobulated": item.recombobulated } },
          { upsert: true })
        
      const sucembed = new Discord.MessageEmbed()
      .setTitle('Armor Changed')
      .setDescription(`Successfully changed Armor to ${item.name}`)
      .setColor('GREEN')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [sucembed]})
    }
  }
};