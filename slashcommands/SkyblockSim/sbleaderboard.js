const Discord = require("discord.js");
const { TYPES, GetType } = require("../../constants/Simulator/leaderboard");

module.exports = {
	name: "sbleaderboard",
	description: "Shows a skyblock leaderboard",
	usage: "sbleaderboard (Leaderboard name)",
	perms: "None",
	folder: "SkyblockSim",
	aliases: [],
	cooldown: 10,
	async execute(interaction, mclient) {
		const collection = mclient.db("SkyblockSim").collection("Players");

		// Build the select box for the leaderboard
		const leaderRow = new Discord.MessageActionRow();
		const leaderSelect = new Discord.MessageSelectMenu()
			.setCustomId("leaderSelect")
			.setMaxValues(1)
			.setMinValues(1);

		const data = [];

		// Fill the selectbox with types
		for (const [key, value] of Object.entries(TYPES)) {
			data.push({
				label: value.name,
				value: value.value,
				emoji: value.emote,
			});
		}

		leaderSelect.addOptions(data);
		leaderRow.addComponents(leaderSelect);

		const embed = new Discord.MessageEmbed()
			.setTitle("Leaderboard")
			.setDescription(
				"Choose the Leaderboard you want to see from the Select Menu."
			)
			.setFooter("Skyblock Simulator");

		await interaction.editReply({
			embeds: [embed],
			components: [leaderRow],
		});

		// Wait for a selectbox option to be chosen and then
		// send a leaderboard of the selected type
		const filter = i => i.customId === "leaderSelect" && i.user.id === interaction.user.id;
		const leaderCollector =
			await interaction.channel.createMessageComponentCollector({
				filter,
				componentType: "SELECT_MENU",
				time: 300000,
			});

		leaderCollector.on("collect", async collectedTypeInteraction => {
			type = GetType(collectedTypeInteraction.values[0]);

			// Get the collection values sorted by the selected type
			const lbCol = await eval(
				`collection.find({}).sort({ "${type.data}": -1 }).toArray()`
			);

			let lbString = "";
			const index = lbCol.findIndex(lb => lb._id == interaction.user.id);

			// Build a string showing the values of selected type
			let i = 0;
			while (i < lbCol.length && i < 10) {
				lbString += `#${i + 1} - <@!${lbCol[i]._id}>: ${eval(
					`lbCol[i].${type.data}.toLocaleString()`
				)}\n`;
				i++;
			}

			embed.setTitle(`${type.emote} ${type.name} Leaderboard`);
			embed.setDescription(lbString);
			embed.setFooter(`You are #${index + 1} out of ${lbCol.length}`);

			await collectedTypeInteraction.update({ embeds: [embed] });
		});

		leaderCollector.on("end", async collected => {
			const reply = await interaction.fetchReply();
			reply.delete();
		});
	},
};
