const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
	name: "Userinfo",
	usage: "userinfo <user>",
	description: "Shows info about the User",
	perms: "None",
	folder: "QOL",
	aliases: ["ui", "me", "whois"],
	async execute(client, message, args) {
		const userArray = message.content.split(" ");
		const userArgs = userArray.slice(1);
		const member =
			message.mentions.members.first() ||
			message.guild.members.cache.get(userArgs[0]) ||
			message.guild.members.cache.find(
				x => x.user.username.toLowerCase() ===
						userArgs.slice(0).join(" ") ||
					x.user.username === userArgs[0]
			) ||
			message.member;

		/* if (member.presence.status === 'dnd') member.presence.status = 'Do Not Disturb';
    if (member.presence.status === 'online') member.presence.status = 'Online';
    if (member.presence.status === 'idle') member.presence.status = 'Idle';
    if (member.presence.status === 'offline') member.presence.status = 'offline';*/

		const badges = member.user.flags.toArray();
		let balance = "",
		 bravery = "",
		 brilliance = "",
		 bughunter = "",
		 bughunter2 = "",
		 developer = "",
		 earlysupporter = "",
		 empl = "",
		 events = "",
		 partner = "",
		 teamuser = "";
		if (badges.includes("DISCORD_PARTNER")) {
			partner = "<:partner:855414536264876033>, ";
		}
		if (badges.includes("DISCORD_EMPLOYEE")) {
			empl = "<:discord_staff:855414296975507487>, ";
		}
		if (badges.includes("HYPESQUAD_EVENTS")) {
			events = "<:events:856514436847501313>, ";
		}
		if (badges.includes("BUGHUNTER_LEVEL_1")) {
			bughunter = "<:bughunter:856515040868696104>, ";
		}
		if (badges.includes("HOUSE_BRAVERY")) {
			bravery = "<:bravery:856515826218958858>";
		}
		if (badges.includes("HOUSE_BRILLIANCE")) {
			brilliance = "<:brilliance:856516183939612742>";
		}
		if (badges.includes("HOUSE_BALANCE")) {
			balance = "<:balance:856516404562624512>";
		}
		if (badges.includes("EARLY_SUPPORTER")) {
			earlysupporter = "<:earlysupporter:856517006592573450>, ";
		}
		if (badges.includes("BUGHUNTER_LEVEL_2")) {
			bughunter2 = "<:BugHunterLvl2:856517850884603935>, ";
		}
		if (badges.includes("TEAM_USER")) teamuser = "";
		if (badges.includes("VERIFIED_DEVELOPER")) {
			developer = "<:verifieddev:848830303472189461>, ";
		}
		if (!badges[0]) balance = "User has no Badges";

		const perms = member.permissions.toArray();

		// Special Permissions
		let administrator = "",
		 attach_files = "",
		 ban_members = "",
		 create_instant_invite = "",
		 embed_links = "",
		 kick_members = "",
		 manage_channels = "",
		 manage_emojis = "",
		 manage_guild = "",
		 manage_messages = "",
		 manage_nicknames = "",
		 manage_roles = "",
		 manage_server = "",

			// Normal Permissoins
		 manage_webhooks = "",
		 mention_everyone = "",
		 use_external_emojis = "",
		 view_audit_log = "";

		// Special Permissons
		if (perms.includes("ADMINISTRATOR")) administrator = "Administrator, ";
		if (perms.includes("MANAGE_SERVER")) manage_server = "Manage Server, ";
		if (perms.includes("MANAGE_CHANNELS")) {
			manage_channels = "Manage Channels, ";
		}
		if (perms.includes("MANAGE_GUILD")) manage_guild = "Manage Server, ";
		if (perms.includes("KICK_MEMBERS")) kick_members = "Kick Members, ";
		if (perms.includes("BAN_MEMBERS")) ban_members = "Ban Members, ";
		if (perms.includes("VIEW_AUDIT_LOG")) {
			view_audit_log = "View Audit Log, ";
		}
		if (perms.includes("MANAGE_MESSAGES")) {
			manage_messages = "Manage Messages, ";
		}
		if (perms.includes("MENTION_EVERYONE")) {
			mention_everyone = "Mention Everyone, ";
		}
		if (perms.includes("MANAGE_NICKNAMES")) {
			manage_nicknames = "Manage Nicknames, ";
		}
		if (perms.includes("MANAGE_ROLES")) manage_roles = "Manage Roles, ";
		if (perms.includes("MANAGE_WEBHOOKS")) {
			manage_webhooks = "Manage Webhooks, ";
		}
		if (perms.includes("MANAGE_EMOJIS")) manage_emojis = "Manage Emojis, ";

		// Normal Permissons
		if (perms.includes("CREATE_INSTANT_INVITE")) {
			create_instant_invite = "Create Invite, ";
		}
		if (perms.includes("EMBED_LINKS")) embed_links = "Embed Links, ";
		if (perms.includes("ATTACH_FILES")) attach_files = "Attach Files, ";
		if (perms.includes("USE_EXTERNAL_EMOJIS")) {
			use_external_emojis = "Use External Emojis, ";
		}

		const a = member.roles.cache;

		/* let web = ''
    if (!member.user.presence.clientStatus) {
      web = 'Unknown'
    } else if (member.user.presence.clientStatus.desktop) {
      web = 'PC'
    } else if (member.user.presence.clientStatus.mobile) {
      web = 'Mobile'
    } else {
      web = 'Browser'
    }*/

		const x = Date.now() - member.createdAt;
		const y =
			Date.now() - message.guild.members.cache.get(member.id).joinedAt;
		const joined = Math.floor(y / 86400000);

		const joineddate = moment
			.utc(member.joinedAt)
			.format("dddd, MMMM Do YYYY, HH:mm:ss");
		// let status = member.presence.status;

		const userEmbed = new Discord.MessageEmbed()
			.setThumbnail(
				member.user.displayAvatarURL({ dynamic: true, size: 512 })
			)
			.setAuthor(member.user.tag, member.user.displayAvatarURL())
			.setFooter(`ID: ${member.id}`)
			.setColor("ORANGE")
			.addField("Roles", `<@&${member._roles.join("> <@&")}>`)
			.addField(
				"Account Creation Date:",
				` ${moment
					.utc(member.user.createdAt)
					.format("dddd, MMMM Do YYYY")}`,
				true
			)
			.addField(
				"Server Join Date",
				`${joineddate} \n${joined} Days ago`,
				true
			)
			.addField(
				"Badges",
				`\u200b${
					empl
				}${events
				}${partner
				}${bughunter2
				}${bughunter
				}${developer
				}${earlysupporter
				}${bravery
				}${brilliance
				}${balance}`
			)
			.addField(
				"Moderation Permissions",
				`\u200b${
					administrator
				}${manage_server
				}${manage_channels
				}${manage_guild
				}${kick_members
				}${ban_members
				}${view_audit_log
				}${manage_messages
				}${mention_everyone
				}${manage_nicknames
				}${manage_roles
				}${manage_webhooks
				}${manage_emojis}`
			)
			.addField(
				"Basic Permissions",
				`\u200b${
					create_instant_invite
				}${embed_links
				}${attach_files
				}${use_external_emojis}`
			);

		message.channel.send({ embeds: [userEmbed] });
	},
};
