"use strict";
// Import dependencies
const { Client, Collection, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const fs = require("fs");
const { MongoClient } = require("mongodb");

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"] });

const config = require("./constants/Bot/config.json");
const keepAlive = require("./constants/Bot/keepAlive.js");
const Prefix = require("@replit/database");
const prefix = new Prefix();
const { token } = process.env;
const ownerId = "570267487393021969";

const mongoClient = new MongoClient(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect();

// Collections needed
client.commands = new Collection();
client.cooldowns = new Collection();
client.slashcommands = new Collection();

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

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands/${folder}`)
		.filter(file => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name.toLowerCase(), command);
	}
}

// Command Handler
client.on("messageCreate", async message => {
	if (message.author.bot) return;
	if (message.channel.type === "DM") return message.channel.send("I don't work in DMs.");

	let gPrefix = await prefix.get(message.guild.id, { raw: false });
	gPrefix ??= ".";

	if (!message.content.startsWith(gPrefix) || message.author.bot) return;

	const args = message.content.slice(gPrefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (config.blacklistedusers.includes(message.author.id)) return message.channel.send("You are blacklisted from using this bot. If you believe this is false, message **Baltraz#4874**.");

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	let cooldownAmount = (command.cooldown || 3) * 1000;

	// Owner Cooldown Bypass
	if (message.author.id === ownerId) {
		cooldownAmount = 0;
	}

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`You need to wait **${timeLeft.toFixed(1)}s** before using \`${command.name}\` again.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// Once i add to main bot
	const servercoll = mongoClient.db("Sky-Bot").collection("Servers");
	const found = await servercoll.findOne({ _id: message.guild.id });

	if (message.author.id !== ownerId) {
		if (found == null || found.scopeadded === false) {
			try {
				await client.guilds.cache.get(message.guild.id)?.commands.fetch([]);
				await servercoll.updateOne(
					{ _id: message.guild.id },
					{ $set: { scopeadded: true } },
					{ upsert: true }
				);
			} catch (error) {
				const noScopeEmbed = new MessageEmbed()
					.setTitle("Slash Command Changes")
					.setColor("RED")
					.setFooter("Greetings from Sky Bot Dev")
					.setDescription("Please notify the server owner, an admin, or a moderator to re-authorize the Bot using the attached button. There is **NO NEED TO KICK THE BOT**, you can just re-authorize it and it will work using slash commands.\n\nThis is to ensure you will be able to use all the slash commands as Discord will remove access to messages in the future.\n\nOnce the Bot is re-authorized you're all set and this message won't appear again.");
				const row = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setLabel("Bot Invite")
							.setURL("https://discord.com/api/oauth2/authorize?client_id=839835292785704980&permissions=139653925953&scope=applications.commands%20bot")
							.setStyle("LINK"),
					);
				message.channel.send({ embeds: [noScopeEmbed], components: [row] });
				await servercoll.updateOne(
					{ _id: message.guild.id },
					{ $set: { scopeadded: false } },
					{ upsert: true }
				);
			}
		} else {
			const addedscope = new MessageEmbed()
				.setTitle("Unsupported Message Commands")
				.setColor("ORANGE")
				.setFooter("Greetings Sky Bot Dev")
				.setDescription("Message commands have been removed from Sky Bot due to Discord removing access to messages in the future.\n\nClick the attached button below for an article explaining those changes.");
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setLabel("Discord Article")
						.setURL("https://support-dev.discord.com/hc/en-us/articles/4404772028055-Message-Content-Access-Deprecation-for-Verified-Bots")
						.setStyle("LINK"),
				);
			message.channel.send({ embeds: [addedscope], components: [row] });
		}
		return;
	}
	// if (command.folder != "Dev") return;

	try {
		await command.execute(client, message, args, mongoClient);
	} catch (error) {
		console.error(error);
		message.reply("There was an error while trying to execute that command!");
	}
});


// Event Handler
const eventFiles = fs
	.readdirSync("./events")
	.filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, mongoClient, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, mongoClient, client));
	}
}

// Bot token login
client.login(token);

// Loophole to keep the Bot running
keepAlive();
/* how to export commands
//add cooldown: 0, to set a specific cooldown else it is 3 seconds
const Discord = require("discord.js");
module.exports = {
  name: "Name",
  description: "Description",
  usage: "Usage",
  perms: "Permissions Needed",
  folder: "folder",
  aliases: [],
    execute: (client, message, args) => {
      //putmycodehere
    }
};
*/

/*
module.exports = {
	name: "name",
	execute(client) {
    code here
	}
};
*/
