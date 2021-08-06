const Discord = require('discord.js');
const prefix = require("@replit/database");
const prefixx = new prefix();

module.exports = {
  name: "sbsettings",
  description: "Settings for SkyblockSim",
  usage: "sbsettings (Setting Name)",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['sbse'],
  cooldown: 10,
  async execute(interaction, mclient) {

    //Getting prefix
    var gprefix = await prefixx.get(interaction.guild.id, { raw: false });
    if (gprefix === null) gprefix = '.';

    const collection = mclient.db('SkyblockSim').collection('Players');
    let player = await collection.findOne({ _id: interaction.user.id })

    if (player.data.settings === null) {
      const noprofile = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('No Profile found')
        .setDescription(`Create a Profile using \`${gprefix}sbstart\` or \`${gprefix}sbcreate\``)

      interaction.editReply({ embeds: [noprofile] })
      return;
    }

    let choosen = interaction.options.getString('choice')

    if (choosen === 'imgshown' && player.data.settings.imgshown === true) {
      await collection.updateOne(
        { _id: interaction.user.id },
        { $set: { 'data.settings.imgshown': false } },
        { upsert: true })
      interaction.editReply('Disabled Images being shown')
      return;
    } else if (choosen === 'imgshown' && player.data.settings.imgshown === false) {
      await collection.updateOne(
        { _id: interaction.user.id },
        { $set: { 'data.settings.imgshown': true } },
        { upsert: true })
      interaction.editReply('Enabled Images being shown')
      return;
    }
  }
};