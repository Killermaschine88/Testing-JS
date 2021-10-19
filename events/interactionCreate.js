const Discord = require('discord.js')

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, mclient) {
    if (!interaction.isCommand()) return;

    if(interaction.channel.type != 'GUILD_TEXT') {
      const embed = new Discord.MessageEmbed()
      .setTitle('Unsupported Channel')
      .setColor('ORANGE')
      .setDescription('I only work in Text Channels please invite me to a Server using the attached Button and use me there.')
      .setFooter('Sky Bot Dev')

const row = new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
                .setLabel('Bot Invite')
                .setURL('https://discord.com/api/oauth2/authorize?client_id=839835292785704980&permissions=139653925953&scope=applications.commands%20bot')
                .setStyle('LINK'),
          );
      
      interaction.reply({embeds: [embed], components: [row], ephemeral: true})
      return
    }
       
  
    let commandExecute = interaction.commandName

    if (interaction.options._subcommand != null) {
      commandExecute = interaction.commandName + interaction.options._subcommand
    }

    const collection1 = mclient.db('Sky-Bot').collection('settings');
    let settings = await collection1.findOne({ _id: interaction.client.user.id })

      if(settings.maintanance.state == true && interaction.user.id != '570267487393021969') {
        const maintan = new Discord.MessageEmbed()
        .setTitle('⚠️ Sky Bot Maintanance ⚠️')
        .setColor('ORANGE')
        .setDescription(`Maintanance Mode enabled because of **${settings.maintanance.reason}**!\nPlease wait while it is being worked on.`)
        return interaction.reply({embeds: [maintan]})
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

    const collection2 = mclient.db('SkyblockSim').collection('blockedchannels');
    let channel = await collection2.findOne({ _id: interaction.channelId })
    if(channel) {
      if(channel.user != interaction.user.id) {
        if(channel.blocked == true) {
          const blockedembed = new Discord.MessageEmbed()
          .setColor('ORANGE')
          .setTitle('Channel occupied')
          .setDescription('This channel is already being used by someone to play Dungeons or to fish.\n\nTo reduce lag for them please consider inviting me to your own Server to play there.')
          .setFooter('Kind regards Sky Bot Developer')
          const row = new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
                .setLabel('Bot Invite')
                .setURL('https://discord.com/api/oauth2/authorize?client_id=839835292785704980&permissions=139653925953&scope=applications.commands%20bot')
                .setStyle('LINK'),
          );
          return interaction.reply({embeds: [blockedembed], components: [row]})
         }
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