const config = require('../../config.json');
module.exports = {
  name: "deploy",
  description: "Deploy Slash Commands",
  usage: "dp",
  perms: "Dev",
  folder: "Dev",
  aliases: ['dp'],
  async execute(client, message, args) {
    if (message.author.id !== config.ownerID) return message.channel.send("Can't use this!")

    if (!client.application ?.owner) await client.application ?.fetch();

    if (message.author.id === client.application ?.owner.id) {
      const cmdfile = require('../../Various/commands.js')

      const command = await client.guilds.cache.get('869124249225429022') ?.commands.set(cmdfile.data)
		message.channel.send('Commands deployed.')
    }

  }
};