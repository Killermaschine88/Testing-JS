const Discord = require('discord.js');

module.exports = {
  name: "sbsettings",
  description: "Settings for SkyblockSim",
  usage: "sbsettings (Setting Name)",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['sbse'],
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

    let choosen = interaction.options.getString('choice')

    if (choosen === 'imgshown' && player.data.settings.imgshown === true) {
      await collection.updateOne(
        { _id: interaction.user.id },
        { $set: { 'data.settings.imgshown': false } },
        { upsert: true })

      let embed = new Discord.MessageEmbed()
      .setTitle('Setting changed')
      .setColor('GREEN')
      .setDescription('Images shown is now disabled.')
      interaction.editReply({embeds: [embed]})
      return;
    } else if (choosen === 'imgshown' && player.data.settings.imgshown === false) {
      await collection.updateOne(
        { _id: interaction.user.id },
        { $set: { 'data.settings.imgshown': true } },
        { upsert: true })

      let embed = new Discord.MessageEmbed()
      .setTitle('Setting changed')
      .setColor('GREEN')
      .setDescription('Images shown is now enabled.')
      interaction.editReply({embeds: [embed]})
      return;
    }
  }
};