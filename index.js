const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_PRESENCES'] });
const config = require('./config.json');
const keepAlive = require('./keepAlive.js');
const fs = require('fs');
const chalk = require('chalk');
const prefix = require("@replit/database");
const prefixx = new prefix();
const token = process.env['token'];
let c = 0;
let e = 0;
let sc = 0;
const urii = process.env['uri']
const { AutoPoster } = require('topgg-autoposter')
const toptoken = process.env['toptoken']

const MongoClient = require('mongodb').MongoClient;
const mclient = new MongoClient(urii, { useNewUrlParser: true, useUnifiedTopology: true });


/*//Topgg votes detections
const Topgg = require("@top-gg/sdk")
const express = require("express")

const app = express()

const webhook = new Topgg.Webhook("69420")

app.post("/dblwebhook", webhook.listener( async vote => {

    const collection = mclient.db('Sky-Bot').collection('SkyblockSimm');
    let found = await collection.findOne({ _id: vote.user })

  await collection.updateOne(
        { _id: vote.user },
        { $inc: { voted: 100} },
        { upsert: true })
  //Sending voted message
  client.channels.fetch('850847486826643516')
    .then(channel => channel.send(`<@${vote.user}> has voted for me.\nID: ${vote.user}`))
    .catch(console.error)
    console.log('Someone voted.')
}))

app.listen(80)

//Topgg stats posting
const poster = AutoPoster(toptoken, client) // your discord.js or eris client

poster.on('posted', (stats) => { // ran when succesfully posted
  console.log(`Posted stats to Top.gg | ${stats.serverCount} servers`)
})*/


// Bot token login
client.login(token);

// Send msg in Console when Bot is usable and set status
client.on('ready', () => {
  console.log(chalk.greenBright(`Logged in as ${client.user.username}!`));
  console.log(chalk.greenBright(`Loaded ${c} Commands, ${sc} SlashCommands and ${e} Events!`));
  client.user.setActivity(`${client.users.cache.size} Members and ${client.guilds.cache.size} Servers`, { type: 'WATCHING' });
  mclient.connect()
  console.log(chalk.greenBright(`Logged into MongoDB`));
});


//Replies with the Prefix when Bot is mentioned
client.on('messageCreate', async message => {

  if (message.author.bot) return;
  var gprefix = await prefixx.get(message.guild.id, { raw: false });
  if (gprefix === null) gprefix = '.';
  const bottag = message.mentions.users.first();
  if (bottag === client.user) {
    (message.channel.send(`My Prefix is \`${gprefix}\``))
    return;
  }
});


//Collections needed
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slashcommands = new Discord.Collection();

//Slash Command Loader
const slashcommandFolders = fs.readdirSync('./slashcommands');

for (const folder of slashcommandFolders) {
  const commandFiles = fs
    .readdirSync(`./slashcommands/${folder}`)
    .filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./slashcommands/${folder}/${file}`);
    sc += 1;
    client.slashcommands.set(command.name.toLowerCase(), command);
  }
}

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    c += 1;
    client.commands.set(command.name.toLowerCase(), command);
  }
}

//Command Handler
client.on('messageCreate', async message => {


  if (message.author.bot) return
  if (message.channel.type === 'DM') return message.channel.send('I dont work in DMs.')
  let gprefix = await prefixx.get(message.guild.id, { raw: false });
  if (gprefix === null) gprefix = '.';
  if (!message.content.startsWith(gprefix) || message.author.bot) return;

  const args = message.content.slice(gprefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;
  if (message.author.id != '570267487393021969') return message.channel.send('Im currently in Dev Only Mode.')

  if (config.blacklistedusers.includes(message.author.id)) return message.channel.send('You are blacklisted from using this Bot. If you believe this is false message **Baltraz#4874**')

  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  let cooldownAmount = (command.cooldown || 3) * 1000;

  //Owner Cooldown Bypass
  if (message.author.id === '570267487393021969') {
    cooldownAmount = 0
  }

  if (timestamps.has(message.author.id)) {
    let expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`You need to wait **${timeLeft.toFixed(1)}s** before using \`${command.name}\` again.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    await command.execute(client, message, args, mclient);
  } catch (error) {
    console.error(error);
    message.reply('There was an Error trying to execute that Command!');
  }
});


//Event Handler
const eventFiles = fs
  .readdirSync('./events')
  .filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, mclient, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, mclient, client));
    e += 1;
  }
}

//Loophole to keep the Bot running
keepAlive();

/* how to export commands 
//add cooldown: 0, to set a specific cooldown else it is 3 seconds
const Discord = require('discord.js');
module.exports = {
  name: "Name",
  description: "Description",
  usage: "Usage",
  perms: "Permissions Needed",
  folder: "folder",
  aliases: [],
    execute: (client, message, args) => {
      putmycodehere
    }
};
*/

/*
module.exports = {
	name: 'name',
	execute(client) {
    code here
	}
};
*/