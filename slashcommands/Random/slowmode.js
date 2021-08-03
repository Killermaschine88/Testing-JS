const Discord = require('discord.js');

module.exports = {
  name: 'Slowmode',
  description: 'Increase/Decrease the slowmode of a Channel',
  usage: 'slowmode (Time)\n\`Time Between 1 and 21600 (Enter 0 to remove Slowmode.)\`\n\`Example: !slowmode 5\`',
  perms: 'Manage Channels',
  folder: "Moderation",
  aliases: ['sm'],
  async execute(client, interaction) {
    if (!interaction.member.permissions.has('MANAGE_CHANNELS'))
      return interaction.editReply('You are missing the Permission \`MANAGE_CHANNELS\`.');
    if (!interaction.guild.me.permissions.has('MANAGE_CHANNELS'))
      return interaction.editReply('I don\'t have `MANAGE_CHANNELS` Permission.');

    const time = interaction.options.getNumber('seconds');

    if (time === 0) {
      interaction.channel.setRateLimitPerUser(null);
      interaction.editReply("Slowmode removed.");
      return
    }

    if (!time || time > 21600) {
      interaction.editReply("Enter a Number between 1 and 21600.\nOr 0 to remove the Slowmode.");
      return
    }

    const embed = new Discord.MessageEmbed()
      .setTitle('<a:yes:847468695772987423> Slowmode Changed')
      .setDescription(`Slowmode of ${interaction.channel} is now set to ${time} Seconds.`)
      .setColor('#00FF00')
      .setFooter(`Done by ${interaction.user.tag}.`);

    interaction.channel.setRateLimitPerUser(time).catch(err => console.log(err));
    interaction.editReply({ embeds: [embed] });
  }
};
