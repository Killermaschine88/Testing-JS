const Discord = require('discord.js')

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, mclient) {
    if (!interaction.isCommand()) return;

    let commandExecute = interaction.commandName

    if (interaction.options._subcommand != null) {
      commandExecute = interaction.commandName + interaction.options._subcommand
    }

    if (interaction.commandName == 'sb') {
      const collection = mclient.db('SkyblockSim').collection('Players');
      let player = await collection.findOne({ _id: interaction.user.id })
      if(player != null) {
      let time_now = Math.floor(Date.now() / 1000)
      if (player.data.misc.booster_cookie.expires <= time_now && player.data.misc.booster_cookie.active == true) {
        await collection.updateOne(
          { _id: interaction.user.id },
          { $set: { 'data.misc.booster_cookie.active': false, 'data.misc.booster_cookie.expires': time_now } },
          { upsert: true })
      }
    }
    }

    try {
      const collection = mclient.db('Sky-Bot').collection('commanduses');
      collection.updateOne(
        { _id: interaction.commandName },
        { $inc: { uses: 1 } },
        { upsert: true })

      await interaction.deferReply()
      await interaction.client.slashcommands.get(commandExecute).execute(interaction, mclient);
    } catch (error) {
      console.error(error);
      interaction.followUp({ content: 'There was an error while executing this command and the Bot Dev has been notified.', ephemeral: true });
      const errembed = new Discord.MessageEmbed()
        .setTitle(`Error occured when ${interaction.user.tag} used ${commandExecute}`)
        .setDescription(`${error.stack}`)
      await interaction
        .client.users.fetch('570267487393021969').then(async user => {
          await user.send({ embeds: [errembed] })
        })
    }
  }
};