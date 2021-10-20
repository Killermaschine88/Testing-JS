const Discord = require('discord.js');
const leveling = require('../../constants/Simulator/Functions/leveling.js')
const playerStats = require('../../constants/Simulator/Functions/playerStats.js')
const catalvl = require('../../constants/Simulator/Functions/dungeonlevel.js')


module.exports = {
  name: "sbinfo",
  description: "Creates your Profile for Skyblock Simulator",
  usage: "sbstart",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['sbi', 'sbview'],
  cooldown: 10,
  async execute(interaction, mclient) {

    if (interaction.options.getUser('user') != null) {
      var id = interaction.options.getUser('user').id
    } else {
      var id = interaction.user.id
    }

    const collection = mclient.db('SkyblockSim').collection('Players');
    let player = await collection.findOne({ _id: id })

    if (player === null) {
      const nodata = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`No Profile found for <@!${id}>`)
      interaction.editReply({ embeds: [nodata] })
      return;
    }


    let mining = player.data.skills.mining
    let foraging = player.data.skills.foraging
    let enchanting = player.data.skills.enchanting
    let farming = player.data.skills.farming
    let combat = player.data.skills.combat
    let fishing = player.data.skills.fishing
    let cata = player.data.dungeons.xp
    let classxp = player.data.dungeons.class.selected.xp

    mining = getLevelByXp(mining)
    foraging = getLevelByXp(foraging)
    enchanting = getLevelByXp(enchanting)
    farming = getLevelByXp(farming)
    combat = getLevelByXp(combat)
    fishing = getLevelByXp(fishing)
    cata = catalvl(cata).level
    classxp = catalvl(classxp).level
    

    let salevel = mining.level + foraging.level + enchanting.level + farming.level + combat.level + fishing.level
    salevel = salevel / 6
    let sa = salevel.toFixed(2)


    let str = ''
    if (player.data.inventory.items === undefined) {
      str = 'Empty'
    } else {
      for (item of player.data.inventory.items) {
        str += item.name + ': ' + item.amount + '\n'
      }
    }

    let armorstr = ''
    let armornum = 0
    let swordstr = ''
    let swordnum = 0
    for (item of player.data.inventory.armor) {
          armorstr += `[${armornum}] `
        if(item.recombobulated == true) {
          armorstr += '<:recomb:881094744183275540>'
        }

        if(item.reforge != 'None') {
          armorstr += `${item.reforge} `
        }
        
          armorstr += `${item.name} `

        if(item.health != 0) {
          armorstr += `${item.health} ❤, `
        }
        if(item.defense != 0) {
          armorstr += `${item.defense} ❈, `
        }
        if(item.strength != 0) {
          armorstr += `${item.strength} ❁, `
        }
        if(item.crit_chance != 0) {
          armorstr += `${item.crit_chance} ☣, `
        }
        if(item.crit_damage != 0) {
          armorstr += `${item.crit_damage} ☠, `
        }
        if(item.magic_find != 0) {
          armorstr += `${item.magic_find} ✯, `
        }
        if(item.sea_creature_chance != 0) {
          armorstr += `${item.sea_creature_chance} α, `
        }
        armorstr += '\n'
        armornum += 1
      }

      for (item of player.data.inventory.sword) {
          swordstr += `[${swordnum}] `
        if(item.recombobulated == true) {
          swordstr += '<:recomb:881094744183275540>'
        }

        if(item.reforge != 'None') {
          swordstr += `${item.reforge} `
        }

        swordstr += `${item.name} `

        if(item.damage != 0) {
          swordstr += `${item.damage} ⚔️, `
        }
        if(item.strength != 0) {
          swordstr += `${item.strength} ❁, `
        }
        if(item.crit_chance != 0) {
          swordstr += `${item.crit_chance} ☣, `
        }
        if(item.crit_damage != 0) {
          swordstr += `${item.crit_damage} ☠, `
        }
        swordstr += '\n'
        swordnum += 1
      }
      armornum = 0
      swordnum = 0

    //Player Stats
    let type = 'all'
    let cookie = player.data.misc.booster_cookie.active
    const ps = playerStats(player, type, cookie)

    //Various Stats
    let playerfishingspeed = player.data.equipment.fishing.rod.fishing_speed



    const foundinfo = new Discord.MessageEmbed()
      .setFooter('Skyblock Simulator')
      .setColor('90EE90')
      .setDescription(`**Info for <@!${id}> on Profile ${player.data.profile.cute_name}**\nProfile Creation: <t:${player.data.profile.started}:f>\nCoins: **${player.data.profile.coins} <:coins:861974605203636253>**\nGems: **${player.data.profile.gems} <:gems:879264850348486696>**\nWeapon: **${player.data.equipment.combat.sword.name}**\nArmor: **${player.data.equipment.combat.armor.name}**\nRod: **${player.data.equipment.fishing.rod.name}**\nPickaxe: **${player.data.equipment.mining.pickaxe.name}**`)
      .addField(`Skills [${sa}]`, `<:mining:852069714577719306> Mining [${mining.level}]: **${mining.xp}**\n<:foraging:852069714447695872> Foraging [${foraging.level}]: **${foraging.xp}**\n<:enchanting:852069714511659058> Enchanting [${enchanting.level}]: **${enchanting.xp}**\n<:farming:852069714451759114> Farming [${farming.level}]: **${farming.xp}**\n<:combat:852069714527911956> Combat [${combat.level}]: **${combat.xp}**\n<:fishing:852069714359877643> Fishing [${fishing.level}]: **${fishing.xp}**`, true)
      .addField('Stats', `Health: **${ps.health}**\nDefense: **${ps.defense}**\nDamage: **${ps.damage}**\nStrength: **${ps.strength}**\nCrit Chance: **${ps.crit_chance} %**\nCrit Damage: **${ps.crit_damage}**\nMagic Find: **${ps.magic_find}**\nSea Creature Chance: **${ps.sea_creature_chance} %**\nFishing Speed: **${playerfishingspeed} %**\nMining Speed: **${ps.mining_speed} %**`, true)
      .addField('Location', `${player.data.misc.location}`, true)

    if (player.data.misc.booster_cookie.active == true) {
      foundinfo.addField(`Booster Cookie`, `Expiration Date: <t:${player.data.misc.booster_cookie.expires}>`)
    }

    const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId('main')
          .setEmoji('852069714493833227')
          .setLabel('Main')
          .setStyle('PRIMARY'),
        new Discord.MessageButton()
          .setCustomId('inv')
          .setEmoji('881176353444085820')
          .setLabel('Inventory')
          .setStyle('PRIMARY'),
        new Discord.MessageButton()
          .setCustomId('slayer')
          .setEmoji('852892164559732806')
          .setLabel('Slayer')
          .setStyle('PRIMARY'),
        new Discord.MessageButton()
          .setCustomId('dungeons')
          .setEmoji('854399510951624775')
          .setLabel('Dungeons')
          .setStyle('PRIMARY'),
      );
    
    const row2 = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId('armorlist')
          .setEmoji('852079613051666472')
          .setLabel('Armor')
          .setStyle('PRIMARY'),
        new Discord.MessageButton()
          .setCustomId('swordlist')
          .setEmoji('852079613052059658')
          .setLabel('Sword')
          .setStyle('PRIMARY'),
      );

    const menu = await interaction.editReply({ embeds: [foundinfo], components: [row, row2] })



    const collector = menu.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 });

    collector.on('collect', async i => {
      if (i.user.id === interaction.user.id) {
        if (i.customId === 'main') {
          await i.deferUpdate()
          const main = new Discord.MessageEmbed()
            .setFooter('Skyblock Simulator')
            .setColor('90EE90')
            .setDescription(`**Info for <@!${id}> on Profile ${player.data.profile.cute_name}**\nProfile Creation: <t:${player.data.profile.started}:f>\nCoins: **${player.data.profile.coins} <:coins:861974605203636253>**\nGems: **${player.data.profile.gems} <:gems:879264850348486696>**\nWeapon: **${player.data.equipment.combat.sword.name}**\nArmor: **${player.data.equipment.combat.armor.name}**\nRod: **${player.data.equipment.fishing.rod.name}**\nPickaxe: **${player.data.equipment.mining.pickaxe.name}**`)
            .addField(`Skills [${sa}]`, `<:mining:852069714577719306> Mining [${mining.level}]: **${mining.xp}**\n<:foraging:852069714447695872> Foraging [${foraging.level}]: **${foraging.xp}**\n<:enchanting:852069714511659058> Enchanting [${enchanting.level}]: **${enchanting.xp}**\n<:farming:852069714451759114> Farming [${farming.level}]: **${farming.xp}**\n<:combat:852069714527911956> Combat [${combat.level}]: **${combat.xp}**\n<:fishing:852069714359877643> Fishing [${fishing.level}]: **${fishing.xp}**`, true)
            .addField('Stats', `Health: **${ps.health}**\nDefense: **${ps.defense}**\nDamage: **${ps.damage}**\nStrength: **${ps.strength}**\nCrit Chance: **${ps.crit_chance} %**\nCrit Damage: **${ps.crit_damage}**\nMagic Find: **${ps.magic_find}**\nSea Creature Chance: **${ps.sea_creature_chance} %**\nFishing Speed: **${playerfishingspeed} %**\nMining Speed: **${ps.mining_speed} %**`, true)
            .addField('Location', `${player.data.misc.location}`, true)

          menu.edit({ embeds: [main] })
        } else if (i.customId === 'inv') {
          await i.deferUpdate()
          const inv = new Discord.MessageEmbed()
            .setFooter('Skyblock Simulator')
            .setColor('90EE90')
            .setDescription(`**Inventory for <@${id}>**\n${str}`)
          menu.edit({ embeds: [inv] })
        } else if (i.customId === 'slayer') {
          await i.deferUpdate()
          const slayer = new Discord.MessageEmbed()
          
            .setFooter('Skyblock Simulator')
            .setColor('90EE90')
            .setDescription(`**Slayer Info for <@${id}>**`)
            .addField('<:rev:852892164559732806> Revenant Horror', `XP: **${player.data.slayer.zombiexp}**\nBoss Kills: **${player.data.slayer.zombiekills}**`, true)
            .addField('<:tara:852892164392222740> Tarantula Broodfather', `XP: **${player.data.slayer.spiderxp}**\nBoss Kills: **${player.data.slayer.spiderkills}**`, true)
            .addField('<:sven:852892164299423754> Sven Packmaster', `XP: **${player.data.slayer.wolfxp}**\nBoss Kills: **${player.data.slayer.wolfkills}**`, true)
            .addField('<:eman:854253314747924511> Voidgloom Seraph', `XP: **${player.data.slayer.endermanxp}**\nBoss Kills: **${player.data.slayer.endermankills}**`, true)
          menu.edit({ embeds: [slayer] })
        } else if (i.customId === 'dungeons') {
          await i.deferUpdate()
          const dungeons = new Discord.MessageEmbed()
            .setFooter('Skyblock Simulator')
            .setColor('90EE90')
            .setDescription(`**Dungeons Info for <@${id}>**\n<:catacombs:854399510951624775> Dungeons XP [${cata}]: **${player.data.dungeons.xp}**\n<:mage:852079612699607072> Selected Class [${classxp}]: \n* Name: **${player.data.dungeons.class.selected.name}**\n* XP: **${player.data.dungeons.class.selected.xp}**`)
          menu.edit({ embeds: [dungeons] })
        } else if (i.customId === 'armorlist') {
          await i.deferUpdate()
          const dungeons = new Discord.MessageEmbed()
            .setFooter('Skyblock Simulator')
            .setColor('90EE90')
            .setDescription(`${armorstr}\nYou can change your Armor using \`/sb wardrobe armor number\`\nExample: \`/sb wardrobe armor 0\``)
          menu.edit({ embeds: [dungeons] })
        } else if (i.customId === 'swordlist') {
          await i.deferUpdate()
          const dungeons = new Discord.MessageEmbed()
            .setFooter('Skyblock Simulator')
            .setColor('90EE90')
            .setDescription(`${swordstr}\nYou can change your Sword using \`/sb wardrobe sword number\`\nExample: \`/sb wardrobe sword 0\``)
          menu.edit({ embeds: [dungeons] })
        }
      }
    })

    collector.on('end', async collected => {
      try {
        await menu.edit({ components: [] })
      } catch (e) {
      }
    });
  }
};

function getLevelByXp(xp, extra = {}) {
  let xp_table;
  switch (extra.type) {
    case "runecrafting":
      xp_table = leveling.runecrafting_xp;
      break;
    case "dungeoneering":
      xp_table = leveling.dungeoneering_xp;
      break;
    default:
      xp_table = leveling.leveling_xp;
  }

  if (isNaN(xp)) {
    return {
      xp: 0,
      level: 0,
      xpCurrent: 0,
      xpForNext: xp_table[1],
      progress: 0,
      level_cap: 0,
      uncapped_level: 0,
    };
  }

  let xpTotal = 0;
  let level = 0;
  let uncappedLevel = 0;

  let xpForNext = Infinity;

  let levelCap = 1;
  let maxLevel = 1;

  if (extra.cap) {
    levelCap = extra.cap;
  }

  if (extra.skill) {
    if (leveling.default_skill_caps[extra.skill] && leveling.default_skill_caps[extra.skill] > levelCap) {
      levelCap = leveling.default_skill_caps[extra.skill];
    }

    if (leveling.maxed_skill_caps[extra.skill]) {
      maxLevel = leveling.maxed_skill_caps[extra.skill];
    }
  } else {
    levelCap = Object.keys(xp_table)
      .sort((a, b) => Number(a) - Number(b))
      .map((a) => Number(a))
      .pop();
  }

  if (levelCap > maxLevel) {
    maxLevel = levelCap;
  }

  for (let x = 1; x <= maxLevel; x++) {
    xpTotal += xp_table[x];

    if (xpTotal > xp) {
      xpTotal -= xp_table[x];
      break;
    } else {
      if (x <= levelCap) level = x;
      uncappedLevel = x;
    }
  }

  let xpCurrent = Math.floor(xp - xpTotal);

  if (level < levelCap) {
    xpForNext = Math.ceil(xp_table[level + 1]);
  }

  let progress = Math.max(0, Math.min(xpCurrent / xpForNext, 1));

  let levelWithProgress = getLevelWithProgress(xp, maxLevel, Object.values(xp_table));

  return {
    xp,
    level,
    maxLevel,
    xpCurrent,
    xpForNext,
    progress,
    levelCap,
    uncappedLevel,
    levelWithProgress,
  };
}

function getLevelWithProgress(experience, maxLevel, experienceGroup) {
  let level = 0;

  for (let toRemove of experienceGroup) {
    experience -= toRemove;
    if (experience < 0) {
      return Math.min(level + (1 - (experience * -1) / toRemove), maxLevel);
    }
    level++;
  }

  return Math.min(level, maxLevel);
}