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
    console.log('A')
    if (type == 'armor' && armor.length <= index) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Item Index')
      .setDescription(`You don\'t own a Sword with the Index \`${index}\`.\nCheck the Armor Category at \`/sb info\` to see what Items you own.`)
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [errembed]})
    }
    console.log('B')
  }
};