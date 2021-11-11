const Discord = require("discord.js");
const pms = require("pretty-ms");
const prefix = require("@replit/database");
const prefixx = new prefix();
const osu = require("node-os-utils");
const { cpu } = osu;
const { mem } = osu;
const { drive } = osu;

module.exports = {
	name: "Info",
	description: "Shows some Info about the Bot",
	usage: "info",
	perms: "None",
	folder: "Bot",
	aliases: [],
	async execute(client, message, args) {
		// System Info
		const usage = await cpu.usage();
		const model = await cpu.model();

		const memory = await mem.info();
		const cores = await cpu.count();

		const driver = await drive.info();

		const infoembed = new Discord.MessageEmbed()
			.setTitle("Bot Info")
			.setColor("BLUE")
			.setDescription("Various Information about the Bot")
			.addFields(
				{
					name: "<:verifieddev:848830303472189461> Bot Dev",
					value: "Baltraz#4874 [570267487393021969]",
					inline: true,
				},
				{
					name: "<:contributor:849605979589967922> Contributors",
					value: "Hima, Delta, Mend",
					inline: true,
				},
				{
					name: "<:support:848831144509177866> Support Server",
					value: "[Discord Support Server](https://discord.gg/Ca6XpTRQaR)",
					inline: true,
				},
				{
					name: "ℹ️ Total Server Count",
					value: `\`${client.guilds.cache.size}\``,
					inline: true,
				},
				{
					name: "ℹ️ Total User Count",
					value: `\`${client.users.cache.size}\``,
					inline: true,
				},
				{
					name: "<:uptime:847474288884842567> Bot Uptime",
					value: `\`${pms(client.uptime)}\``,
					inline: true,
				},
				{ name: "Command Count", value: "`58`", inline: true },
				{ name: "Event Count", value: "`2`", inline: true },
				{
					name: "CPU Usage",
					value: `\`${usage}%\n${cores} Cores\``,
					inline: true,
				},
				{
					name: "Memory Usage",
					value: `\`${memory.usedMemPercentage}%\n${memory.usedMemMb} Mb / ${memory.totalMemMb} Mb\``,
					inline: true,
				},
				{
					name: "Hard Drive Usage",
					value: `\`${driver.usedPercentage}%\n${driver.usedGb} Gb / ${driver.totalGb} Gb\``,
					inline: true,
				}
			)
			.setFooter(`${model}`);

		message.channel.send({ embeds: [infoembed] });
	},
};
