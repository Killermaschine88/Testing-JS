const Discord = require('discord.js')
  
module.exports = {
  name: 'interactionCreate',
  async execute(interaction, mclient) {
    if (!interaction.isCommand()) return;

    let commandExecute = interaction.commandName

    if (interaction.options._subcommand != null) {
      commandExecute = interaction.commandName + interaction.options._subcommand
    }

    try {
    await interaction.deferReply()
      await interaction.client.slashcommands.get(commandExecute).execute(interaction, mclient);
    } catch (error) {
      console.error(error);
      interaction.editReply({ content: 'There was an error while executing this command and the Bot Dev has been notified.', ephemeral: true });
      const errembed = new Discord.MessageEmbed()
      .setTitle(`Error occured when ${interaction.user.tag} used ${commandExecute}`)
      .setDescription(`${error.stack}`)
      interaction
    .client.users.fetch('570267487393021969').then(async user => {
        await user.send({ embeds: [errembed]})
      })
    }
  }
};