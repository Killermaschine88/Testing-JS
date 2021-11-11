const Discord = require("discord.js");

module.exports = {
	name: "sbwiki",
	description: "a",
	usage: "sbwiki (Setting Name)",
	perms: "None",
	folder: "SkyblockSim",
	aliases: [],
	cooldown: 10,
	async execute(interaction, mclient) {
		const collection = mclient.db("SkyblockSim").collection("events");
		const events = await collection.find({}).toArray();

		const mf_event = events[0];
		const shark_event = events[1];

		const embed = new Discord.MessageEmbed()
			.setTitle("Skyblock Simulator Wiki")
			.setColor("90EE90")
			.setFooter("Skyblock Simulator")
			.setDescription(
				"Press the corresponding Button to see the Information of the desired Item."
			);

		const button1 = new Discord.MessageButton()
			.setCustomId("general")
			.setLabel("General Info")
			.setStyle("PRIMARY");
		const button2 = new Discord.MessageButton()
			.setCustomId("symbols")
			.setLabel("Symbols")
			.setStyle("PRIMARY");
		const button3 = new Discord.MessageButton()
			.setCustomId("misc")
			.setLabel("Misc")
			.setStyle("PRIMARY");
		const button4 = new Discord.MessageButton()
			.setCustomId("events")
			.setLabel("Events")
			.setStyle("PRIMARY");
		const button5 = new Discord.MessageButton()
			.setCustomId("dungeons")
			.setLabel("Dungeons")
			.setStyle("PRIMARY");
		const button6 = new Discord.MessageButton()
			.setCustomId("reforges")
			.setLabel("Reforges")
			.setStyle("PRIMARY");

		const row1 = new Discord.MessageActionRow().addComponents(
			button1,
			button2,
			button4,
			button5
		);
		const row2 = new Discord.MessageActionRow().addComponents(button6);

		const menu = await interaction.editReply({
			embeds: [embed],
			components: [row1, row2],
		});

		const filter = i => {
			i.deferUpdate();
			return i.user.id === interaction.user.id;
		};

		const collector = menu.createMessageComponentCollector({
			filter,
			componentType: "BUTTON",
			time: 858000,
		});

		collector.on("collect", async i => {
			if (i.customId == "general") {
				const generalembed = new Discord.MessageEmbed()
					.setTitle("General Information")
					.setDescription(
						"**Available Commands**\n`sb class`, `sb daily`, `sb dungeons`, `sb grind`, `sb info`, `sb reforge`, `sb sell`, `sb settings`, `sb shop`, `sb start`, `sb wardrobe`, `sb warp`, `sb wiki`, `sb fishing`, `sb mining`"
					)
					.setColor("90EE90")
					.setFooter("Skyblock Simulator");

				menu.edit({ embeds: [generalembed] });
			} else if (i.customId == "symbols") {
				const symbolembed = new Discord.MessageEmbed()
					.setTitle("Symbol Information")
					.setColor("90EE90")
					.setFooter("Skyblock Simulator")
					.setDescription(
						"`❤ Health`\n`❈ Defense`\n`⚔️ Damage`\n`❁ Strength`\n`☣ Crit Chance`\n`☠ Crit Damage`\n`✯ Magic Find`\n`α Sea Creature Chance`\n`🎣 Fishing Speed`\n`⸕ Mining Speed`\n`☘ Mining Fortune`"
					);

				menu.edit({ embeds: [symbolembed] });
			} else if (i.customId == "events") {
				const time = Date.now() / 1000;

				const eventembed = new Discord.MessageEmbed();
				eventembed.setTitle("Event Information");
				eventembed.setColor("90EE90");
				eventembed.setFooter("Skyblock Simulator");
				if (mf_event.enabled == false) {
					eventembed.addField(
						"Magic Find",
						`Everyday from 6:00 - 8:00 (6 am - 8 am) and 16:00 - 18:00 (4:00 pm - 6:00 pm)\nEvent Active: ${mf_event.enabled}\nNext Event: <t:${mf_event.next_event}:R>`
					);
				} else {
					eventembed.addField(
						"Magic Find",
						`Everyday from 6:00 - 8:00 (6 am - 8 am) and 16:00 - 18:00 (4:00 pm - 6:00 pm)\nEvent Active: ${mf_event.enabled}\nEvent End: <t:${mf_event.end_event}:R>`
					);
				}

				if (shark_event.enabled == false) {
					eventembed.addField(
						"Shark Fishing",
						`Everyday from 9:00 - 11:00 (9 am - 11 am) and 19:00 - 21:00 (7:00 pm - 9:00 pm)\nEvent Active: ${shark_event.enabled}\nNext Event: <t:${shark_event.next_event}:R>`
					);
				} else {
					eventembed.addField(
						"Shark Fishing",
						`Everyday from 9:00 - 11:00 (9 am - 11 am) and 19:00 - 21:00 (7:00 pm - 9:00 pm)\nEvent Active: ${shark_event.enabled}\nEvent End: <t:${shark_event.end_event}:R>`
					);
				}

				menu.edit({ embeds: [eventembed] });
			} else if (i.customId == "dungeons") {
				const dungeonsembed = new Discord.MessageEmbed()
					.setTitle("Dungeons Information")
					.setColor("90EE90")
					.setFooter("Skyblock Simulator")
					.addField(
						"Classes",
						"Give bonuses inside Dungeon Runs\n\nAssassin (`2 ❁` per Class Level)\nBerserker (`1 ❁` and `1 ❈` per Class Level)\nTank (`1 ❈` and `2 ❤` per Class Level)",
						true
					)
					.addField(
						"Score",
						"Used to determine the Loot Chests you will recieve after the dungeon run",
						true
					)
					.addField(
						"Puzzles",
						"Small Puzzles like a Quiz and Tic Tac Toe are found in a dungeon run which grant 20 Score.",
						true
					)
					.addField(
						"Loot Chests",
						"Spawn after defeating the Dungeon Boss\n\n<:oak_wood:882624301503754350> Chest (Guaranteed)\n<:gold:869126927011708929> Chest (Guaranteed)\n<:diamond:869126926646788097> Chest (min. F2 & min. 150 Score)\n<:emerald:869126927380779008> Chest (min. F3 & min. 180 Score)",
						true
					)
					.addField(
						"Dungeon Loot",
						"Found in Loot Chests at the end of the dungeon run.\nCurrently Recombobulators, 5 different Armor sets and 5 different Swords can be found in Loot Chests.",
						true
					);

				menu.edit({ embeds: [dungeonsembed] });
			} else if (i.customId == "reforges") {
				const reforgeembed = new Discord.MessageEmbed()
					.setTitle("Reforge Information")
					.setColor("90EE90")
					.setFooter("Skyblock Simulator")
					.setDescription(
						"**Format:** Reforge Stone Name (Reforge Bonus) [Reforge Name] {Item Origin}"
					)
					.addField(
						"General Reforges",
						"Recombobulator 3000 (10% Item Stat increase) [] {Dungeons any Floor}",
						true
					)
					.addField(
						"Sword Reforges",
						"Dragon Claw () [Fabled] {Dragons}\nWither Blood () [Withered] {Dungeons}\nWarped Stone () [Warped] {}",
						true
					)
					.addField(
						"Armor Reforges",
						"Deep Sea Orb () [Submerged] {Fishing}\nDragon Horn () [Renowned] {Dragons}\nPrecursor Gear () [Ancient] {Dungeons}\nSadan's Brooch () [Empowered] {Dungeons}",
						true
					)
					.addField(
						"Fishing Rod Reforges",
						"Hardened Wood () [Stiff] {Fishing}\nLucky Dice () [Lucky] {Fishing}",
						true
					)
					.addField(
						"Pickaxe Reforges",
						"Onyx () [Fruitful] {Mining}\nDiamonite () [Fleet] {Mining}\nRock Gemstone () [Auspicious] {Mining}",
						true
					);

				menu.edit({ embeds: [reforgeembed] });
			}
		});
	},
};
