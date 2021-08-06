module.exports = {
  name: 'interactionCreate',
  async execute(interaction, mclient) {
    if (!interaction.isCommand()) return;

    let commandExecute = interaction.commandName

    if (interaction.options._subCommand != null) {
      commandExecute = interaction.commandName + interaction.options._subCommand
    }

    try {
      await interaction.defer()
      await interaction.client.slashcommands.get(commandExecute).execute(interaction, mclient);
    } catch (error) {
      console.error(error);
      interaction.editReply({ content: 'There was an error while executing this command and the Bot Dev has been notified.', ephemeral: true });
      client.users.fetch('570267487393021969').then(async user => {
        await user.send(`An error has occured when **${interaction.user.tag}** used **${commandExecute}**`)
      })
    }
  }
};