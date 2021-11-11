'use strict';
const Discord = require('discord.js');
const config = require('./constants/Bot/config.json');
const Prefix = require('@replit/database');
const prefix = new Prefix();

const noScopeReply = {
	embeds: [
		new Discord.MessageEmbed()
			.setTitle('Slash Command Changes')
			.setColor('RED')
			.setDescription(
				// eslint-disable-next-line max-len
				"Please notify the server owner, an admin, a moderator or someone with the 'Manage Server' permission to re-authorize the Bot using the attached button. There is **NO NEED TO KICK THE BOT**, you can just re-authorize it and it will work using slash commands.\n\nThis is to ensure slash commands will be usable in this server as Discord will remove access to messages in the future.\n\nOnce the bot is re-authorized you're all set and this message won't appear again."
			)
			.setFooter('Greetings Sky Bot Dev')
	],
	components: [
		new Discord.MessageActionRow().addComponents(
			new Discord.MessageButton()
				.setLabel('Bot Invite')
				.setURL(
					'https://discord.com/api/oauth2/authorize?client_id=839835292785704980&permissions=139653925953&scope=applications.commands%20bot'
				)
				.setStyle('LINK')
		)
	]
};
const msgCmdRemovedReply = {
	embeds: [
		new Discord.MessageEmbed()
			.setTitle('Message commands have been removed')
			.setColor('ORANGE')
			.setDescription(
				'Message commands have been removed from Sky Bot due to Discord removing access to messages in the future.\n\nClick the attached button below for an article explaining those changes.'
			)
			.setFooter('Greetings Sky Bot Dev')
	],
	components: [
		new Discord.MessageActionRow().addComponents(
			new Discord.MessageButton()
				.setLabel('Discord Article')
				.setURL(
					'https://support-dev.discord.com/hc/en-us/articles/4404772028055-Message-Content-Access-Deprecation-for-Verified-Bots'
				)
				.setStyle('LINK')
		)
	]
};
module.exports = {
	name: 'messageCreate',
	async execute(message, mClient, client) {
		if (message.author.bot) return;

		if (message.channel.type === 'DM') {
			return message.reply("Sorry, I don't work in DMs.");
		}

		let gPrefix = await prefix.get(message.guild.id, { raw: false });
		if (gPrefix === null) gPrefix = '.';

		if (!message.content.startsWith(gPrefix) || message.author.bot) return;

		const args = message.content.slice(gPrefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				cmd => cmd.aliases && cmd.aliases.includes(commandName)
			);

		if (!command) return;

		if (config.blacklistedusers.includes(message.author.id)) {
			return message.reply(
				'You are blacklisted from using this bot. If you believe this is unfair/you were mistakenly blacklisted, message **Baltraz#4874**.'
			);
		}

		const { cooldowns } = client;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		let cooldownAmount = (command.cooldown || 3) * 1000;

		// Owner Cooldown Bypass
		if (message.author.id === '570267487393021969') {
			cooldownAmount = 0;
		}

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(
					`You need to wait **${timeLeft.toFixed(1)}s** before using \`${
						command.name
					}\` again.`
				);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		// Once i add to main bot
		const servercoll = mClient.db('Sky-Bot').collection('Servers');
		const found = await servercoll.findOne({ _id: message.guild.id });

		if (message.author.id !== '570267487393021969') {
			// idk if === will work so i'm not changing this
			if (found == null || found.scopeadded == false) {
				try {
					await client.guilds.cache
						.get(message.guild.id)
						?.commands.fetch([]);
					await servercoll.updateOne(
						{ _id: message.guild.id },
						{ $set: { scopeadded: true } },
						{ upsert: true }
					);
				} catch (error) {
					message.reply(noScopeReply);
					await servercoll.updateOne(
						{ _id: message.guild.id },
						{ $set: { scopeadded: false } },
						{ upsert: true }
					);
				}
			} else {
				message.reply(msgCmdRemovedReply);
			}
			return;
		}
		// if (command.folder != 'Dev') return;

		try {
			await command.execute(client, message, args, mClient);
		} catch (error) {
			console.error(error);
			message.reply('There was an error while trying to execute that command!');
		}
	}
};
