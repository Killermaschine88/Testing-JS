const Discord = require('discord.js');

module.exports = {
  name: "sbreforge",
  description: "a",
  usage: "sbsettings (Setting Name)",
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

    if(interaction.user.id != '570267487393021969') {
       return interaction.editReply('WIP')
    }

    let type = interaction.options.getString('choice')
    let itemId = interaction.options.getInteger('number')
    let reforge = interaction.options.getString('reforge')
    reforge = reforge.toLowerCase()

    let sword = player.data.inventory.sword
    let armor = player.data.inventory.armor

    //returning error if invalid itemId
    if(type == 'sword' && sword.length <= itemId) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Item Number')
      .setDescription(`You don\'t own a Sword with the Number \`${itemId}\`.\nCheck the Sword Category at \`/sb info\` to see what Items you own.`)
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [errembed]})
    }

    if (type == 'armor' && armor.length <= itemId) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Item Number')
      .setDescription(`You don\'t own an Armor with the Number \`${itemId}\`.\nCheck the Armor Category at \`/sb info\` to see what Items you own.`)
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [errembed]})
    }

    if (type == 'sword') {
      let validreforges = ['dragon claw', 'wither blood', 'warped stone']
      
      if(!validreforges.includes(reforge)) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Reforge')
      .setDescription('You entered an invalid Reforge Name see the Reforge tab at \`/sb wiki\`.')
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({ embeds: [errembed]})
    }

    } else if (type == 'armor') {
      let validreforges = ['deep sea orb', 'dragon horn', 'precurso gear', 'sadan\'s brooch']

      if(!validreforges.includes(reforge)) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Reforge')
      .setDescription('You entered an invalid Reforge Name see the Reforge tab at \`/sb wiki\`.')
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({ embeds: [errembed]})
    }

    } else if (type == 'pickaxe') {
      let validreforges = ['onyx', 'diamonite', 'rock gemstone']

      if(!validreforges.includes(reforge)) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Reforge')
      .setDescription('You entered an invalid Reforge Name see the Reforge tab at \`/sb wiki\`.')
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({ embeds: [errembed]})
    }
    } else if (type == 'rod') {
      let validreforges = ['hardened wood', 'lucky dice']

      if(!validreforges.includes(reforge)) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Reforge')
      .setDescription('You entered an invalid Reforge Name see the Reforge tab at \`/sb wiki\`.')
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({ embeds: [errembed]})
    }
    }



  }
};