"use strict";
const Discord = require("discord.js");
const fs = require("fs");
const { token } = process.env;
const keepAlive = require("./constants/Bot/keepAlive.js");

const client = new Discord.Client({
	intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
});

const { MongoClient } = require("mongodb");
const mClient = new MongoClient(process.env.uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mClient.connect();

/* //Topgg votes detectionsa
const { AutoPoster } = require("topgg-autoposter");
const { toptoken } = process.env;
const Topgg = require("@top-gg/sdk")
const express = require("express")

const app = express();

const webhook = new Topgg.Webhook("69420")

app.post("/dblwebhook", webhook.listener(async vote => {

  const collection = mclient.db('SkyblockSim').collection('Players');
  let found = await collection.findOne({ _id: vote.user })

if(found != null) {

  await collection.updateOne(
    { _id: vote.user },
    { $inc: { "data.profile.gems": 2 } },
    { upsert: true })
  //Sending voted message

  const tyembed = new Discord.MessageEmbed()
    .setTitle('🥰 Thanks for Voting 🥰')
    .setDescription(`As a reward i added you 2 Gems <:gems:879264850348486696> to your Profile, those can be used to buy special Items 😉\n\nThis really supports my Developer and helps me grow in popularity.`)


    client.users.fetch(vote.user).then(async user => {
      user.send({ embeds: [tyembed] }).catch(() => console.log('Not dmed'))
    }).catch(console.error)
} else {
const tyembed = new Discord.MessageEmbed()
    .setTitle('🥰 Thanks for Voting 🥰')
    .setDescription(`This really supports my Developer and helps me grow in popularity.`)


    client.users.fetch(vote.user).then(async user => {
      user.send({ embeds: [tyembed] }).catch(() => console.log('Not dmed'))
    }).catch(console.error)
}


  client.channels.fetch('850847486826643516')
    .then(channel => channel.send(`<@${vote.user}> has voted for me.\nID: ${vote.user}`))
    .catch(console.error)
}))

app.listen(3000) //if it doesnt work take port 80

//Topgg stats posting
const poster = AutoPoster(toptoken, client)

poster.on('posted', (stats) => { // ran when succesfully posted
  console.log(`Posted stats to Top.gg | ${stats.serverCount} servers`)
})
*/

// Collections needed
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slashcommands = new Discord.Collection();

// Slash Command Loader
const slashcommandFolders = fs.readdirSync("./slashcommands");

for (const folder of slashcommandFolders) {
	const commandFiles = fs
		.readdirSync(`./slashcommands/${folder}`)
		.filter(file => file.endsWith(".js"));

	for (const file of commandFiles) {
		const command = require(`./slashcommands/${folder}/${file}`);
		client.slashcommands.set(command.name.toLowerCase(), command);
	}
}

const commandFolders = fs.readdirSync("./commands_DO_NOT_USE");

for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands_DO_NOT_USE/${folder}`)
		.filter(file => file.endsWith(".js"));

	for (const file of commandFiles) {
		const command = require(`./commands_DO_NOT_USE/${folder}/${file}`);
		client.commands.set(command.name.toLowerCase(), command);
	}
}

// Event Handler
const eventFiles = fs
	.readdirSync("./events")
	.filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, mClient, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, mClient, client));
	}
}

// Bot token login
client.login(token);

// Loophole to keep the Bot running
keepAlive();

/* How to export commands
// add cooldown: 0, to set a specific cooldown else it is 3 seconds
const Discord = require("discord.js");
module.exports = {
	name: "Name",
	description: "Description",
	usage: "Usage",
	perms: "Permissions Needed",
	folder: "folder",
	aliases: [],
	execute: (client, message, args) => {
      // code here
    }
};
*/

/*
module.exports = {
	name: 'name',
	execute(client) {
    	// code here
	}
};
*/
