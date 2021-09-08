const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "wiki",
  description: "Show Command Uses",
  usage: "cu",
  perms: "Dev",
  folder: "Dev",
  aliases: ['w'],
  async execute(client, message, args, mclient) {
  //  if (message.author.id !== config.ownerID) return message.channel.send("Can't use this!")

  const petbutton = new MessageButton()
    .setCustomId('pet')
    .setLabel('Pet')
    .setStyle('PRIMARY')
  const swordbutton = new MessageButton()
    .setCustomId('sword')
    .setLabel('Sword')
    .setStyle('PRIMARY')
  const armorbutton = new MessageButton()
    .setCustomId('armor')
    .setLabel('Armor')
    .setStyle('PRIMARY')
  const talisbutton = new MessageButton()
    .setCustomId('talisman')
    .setLabel('Talisman')
    .setStyle('PRIMARY')
  const petitembutton = new MessageButton()
    .setCustomId('petitem')
    .setLabel('Pet Items')
    .setStyle('PRIMARY')
  const miscbutton = new MessageButton()
    .setCustomId('misc')
    .setLabel('Misc Items')
    .setStyle('PRIMARY')
  const dungeonbutton = new MessageButton()
    .setCustomId('dungeon')
    .setLabel('Dungeon Info')
    .setStyle('PRIMARY')
  const worthybutton = new MessageButton()
    .setCustomId('worthy')
    .setLabel('Worthy Info')
    .setStyle('PRIMARY')

  const row = new MessageActionRow()
    .addComponents(petbutton, swordbutton, armorbutton, talisbutton, petitembutton)
  const row2 = new MessageActionRow()
    .addComponents(miscbutton, dungeonbutton, worthybutton)

  const embed = new MessageEmbed()
  .setTitle('Worthy Wiki')
  .setDescription('Press the corresponding Button to which Category you want the Information of.\n\nWorking embeds (misc/pet items)')
  .setFooter('Hey Dino')
  .setColor('GREY')

  const main = await message.channel.send({embeds: [embed], components: [row, row2]})

  //Add Embeds here
  //.addField('', '', true)
  const petembed = new MessageEmbed()
    .setTitle('List of existing Pets')
    .setColor('GREY')
    .addField('Pig Pet', 'Level 1/100 1/50 Health\n1% Drop when harvesting Crops', true)
    //.addField('Rabbit Pet', 'Level 1/100 1/50 Health\n**INSERT HOW TO GET**', true)
    //.addField('Blaze Pet', 'Level 1/100 1/40 Defense\n**INSERT HOW TO GET**', true)
    //.addField('Magma Cube Pet', 'Level 1/100 1/30 Health, 1/10 Defense\n**INSERT HOW TO GET**', true)
    .addField('Dragon Pet', 'Level 1/100 1/50 Strength, 1/25 Crit Chance, 1/50 Crit Damage\nCrazy Rare Drop from Dragon Fights', true)
    .addField('Ghoul Pet', 'Level 1/100 1/60 Health, 1/5 Ferocity\nVery Rare Drop when finishing a Zombie Slayer', true)
    .addField('Tarantula Pet', 'Level 1/100 1/40 Crit Damage, 1/20 Crit Chance\nVery Rare Drop when finishing a Spider Slayer', true)
    .addField('Hound Pet', 'Level 1/100 1/40 Luck, 1/10 Crit Chance\nVery Rare Drop when finishing a Wolf Slayer', true)
    .addField('Blue Whale Pet', 'Level 1/100 1/80 Health\nVery Rare Drop when fishing', true)
    .addField('Clownfish Pet', 'Level 1/100 1/30 Health, 1/10 Luck\nVery Rare Drop when fishing', true)
    .addField('Squid Pet', 'Level 1/100 1/20 Defense, 1/20 Strength\nVery Rare Drop when fishing', true)
    .addField('Jellyfish Pet', 'Level 1/100 1/40 Health, 1/20 Strength\nVery Rare Drop when fishing', true)

  const swordembed = new MessageEmbed()
    .setTitle('List of existing Swords')
    .setColor('GREY')
    .addField('Undead Sword', '+ 10 Damage\nObtained by starting a Profile', true)
    .addField('Tactician\'s Sword', '+50 Damage, +20 Strength\nPurchased from the Shop for 500K Coins', true)
    .addField('Aspect of the End', '+75 Damage, +75 Strength\nPurchased from the Shop for 2.5M Coins', true)
    .addField('Leaping Sword', '+150 Damage, +100 Strength, +30 Crit Damage\nPurchased from the Shop for 8M Coins', true)
    .addField('Aspect of the Dragons', '+175 Damage, +125 Strength, +25 Crit Damage\nVery Rare Drop from Dragon Fights', true)
    .addField('Livid Dagger', '+175 Damage, +125 Strength, +25 Crit Damage\nCrazy Rare Drop from Floor 2 Dungeon Chests', true)
    //.addField('Emerald Blade', '+100 Damage, +50 Strength, +35 Crit Damage\n**insert how to get here**\nGains more damage the more Coins you have', true)
    .addField('Abyssal Axe', '+250 Damage, +185 Strength, +35 Crit Damage\nInsanely Rare Drop from Floor 4 Dungeon Chests', true)

  const armorembed = new MessageEmbed()
    .setTitle('List of existing Armors')
    .setColor('GREY')
    //.addField('', '', true)
    .addField('Farm Suit Armor', '+50 Health, +100 Defense\nObtained by starting a Profile', true)
    .addField('Farmer Armor', '+200 Health, ,+300 Defense, +20 Strength\nPurchased from the Shop for farming Materials', true)
    .addField('Farmer Armor', '+200 Health, ,+300 Defense, +20 Strength\nPurchased from the Shop for farming Materials', true)
    .addField('Golem Armor', '+150 Health, ,+125 Defense, +25 Strength, +10 Crit Chance\nPurchased from the Shop for 750K Coins', true)
    .addField('Tarantula Armor', '+250 Health, ,+200 Defense, +50 Strength, +25 Crit Damage\nPurchased from the Shop for 2.5M Coins', true)
    .addField('Perfect Armor', '+350 Health, ,+450 Defense, +10 Crit Chance\nPurchased from the Shop for 4.5M Coins', true)
    .addField('Frozen Blaze Armor', '+300 Health, ,+450 Defense, +110 Strength, +15 Crit Chance, +15 Crit Damage\nPurchased from the Shop for 20M Coins', true)
    .addField('Shadow Assassin Armor', '+350 Health, ,+275 Defense, +70 Strength, +10 Crit Chance, +15 Crit Damage\nCrazy Rare Drop from Floor 2 Dungeon Chests', true)
    .addField('Dragon Armor', '+475 Health, ,+375 Defense, +100 Strength, +15 Crit Chance, +20 Crit Damage\nPurchased from the Shop for 240 Dragon Fragments', true)
    .addField('Warden Armor', '+525 Health, ,+400 Defense, +120 Strength, +15 Crit Chance, +25 Crit Damage\nPurchased from the Shop for 4.5M Coins', true)

  const talismanembed = new MessageEmbed()
    .setTitle('List of existing Talisman')
    .setColor('GREY')
    .addField('Auto Recomb Talisman', 'Very Rare Drop from Floor 4 Dungeon Chests\n+5 Luck', true)
    .addField('Undead Talisman', 'Rarely dropped from Undeads in Dungeon Runs\n+4 Strength, +4 Defense', true)
    .addField('Spider Talisman', 'Very Rare Drop from Spider Slayer\n+7 Strength', true)
    .addField('Wolf Talisman', 'Very Rare Drop from Wolf Slayer\n+10 Health, +4 Strength', true)
    .addField('Drowned Talisman', 'Very Rarely dropped from Drowned in Dungeon Runs\n+10 Health, +5 Defense', true)
    .addField('Frozen Zombie Talisman', 'Very Rarely dropped from Frozen Zombies in Dungeon Runs\n+5 Strength, +2 Ferocity', true)
    .addField('Squid Talisman', 'Very Rarely dropped from Glowing Squids in Dungeon Runs\n+15 Health', true)
    .addField('Warden Talisman', 'Very Rarely dropped from the Warden Boss in Floor 4\n+10 Health, +5 Crit Damage', true)
    .addField('Hay Bale Talisman', 'Very Rarely dropped when harvesting Wheat\n+5 Health', true)
    .addField('Carrot Talisman', 'Very Rarely dropped when harvesting Carrot\n+10 Health', true)
    .addField('Potatoe Talisman', 'Very Rarely dropped when harvesting Potatoes\n+15 Health', true)
    //.addField('Sugarcane Talisman', 'Very Rarely dropped when harvesting Sugarcane\n+20 Health', true)
    //.addField('Scarecrow Talisman', '**INSERT HOW TO GET**\n+10 Strength', true)
    .addField('Tiger Paw Talisman', 'Purchased from the Shop for 15M Coins\n+7 Ferocity', true)
    .addField('Time Talisman', 'Purchased from the Shop for 15M Coins\n+5 Luck', true)
    .addField('Ender Talisman', 'Purchased from the Shop for 10M Coins\n+10 Damage', true)
    .addField('Revival Talisman', 'Purchased from the Shop for 25M Coins\n+10 Health', true)
    .addField('Bug Hunter Talisman', 'Earned by reporting a Game Breaking Bug\n+10 Luck', true)
    .addField('King Talisman', 'Earned by achieving a 28 Daily Login Streak\n+5 Strength, +5 Luck', true)
    .addField('Knight Talisman', 'Very Rarely dropped from the Knight Boss in Floor 1\n+3 Health, +3 Strength, +3 Defense', true)
    .addField('Wither Talisman', 'Very Rarely dropped from the Wither Boss in Floor 2\n+7.5 Strength, +7.5 Defense', true)
    .addField('Dragon Talisman', 'Extremely Rare dropped from the Dragon Boss in Floor 3 or Dragon Fights\n+5 Health, +5 Strength, +5 Defense, +5 Luck, +5 Crit Damage', true)
    .addField('Miner Talisman', 'Very Rarely dropped from Miners in Dungeon Runs\n+15 Defense', true)
    

  const petitemembed = new MessageEmbed()
    .setTitle('List of existing Pet Items')
    .setColor('GREY')    
    .addField('Rare/Epic Fishing XP Boost', '25%/50% more Fishing Xp', true)
    .addField('Rare/Epic Combat XP Boost', '25%/50% more Fishing Xp', true)
    .addField('Rare/Epic Farming XP Boost', '25%/50% more Fishing Xp', true)
    .addField('Skeleton Skull', 'Grants +30 Strength', true)
    .addField('Turtle Shell', 'Grants +30 Defense', true)
    .addField('Lucky Clover', 'Grants +10 Luck', true)

  const miscembed = new MessageEmbed()
    .setTitle('List of existing miscellaneous Items')
    .setColor('GREY')
    .addField('<:REC:871306782411218965> Recombobulator', 'Damage boost for Sword and Bows, Health/Defense/Damage boost for Armor and Overall boost for Talisman', true)
    .addField('Nether Star', 'Found very rarely in Floor2\nItem needed to purchase a Beacon', true)
    .addField('Undead Stone (Swords/Bows)', 'Found in Dungeon Chests\n+20 Damage, +15 Strength', true)
    .addField('Dragon Claw (Swords/Bows)', 'Rarely dropped after Dragon Fights\n+35 Damage, +30 Strength', true)
    .addField('Dragon\'s Breath (Talisman)', 'Rarely dropped after Dragon Fights or Floor 2 Dungeons Chests\n+2 Strength, +2 Crit Damage', true)
    .addField('<:abyssalstone:871160026671239168> Abyssal Stone (Talisman)', 'Very Rarely found in Floor 4 Dungeon Chests\n+2 Strength, +2 Crit Damage, +1 Ferocity', true)
    .addField('Dragon Gem (Armor)', 'Very Rarely dropped after Dragon Fights\n+50 Health, +50 Defense, +40 Strength', true)
    .addField('Dragon Scale (Armor)', 'Rarely dropped after Dragon Fights\n+60 Health, +60 Defense, +35 Strength, +5 Crit Chance, +15 Crit Damage', true)
    .addField('Dragon Horn (Armor)', 'Very Rarely dropped after Dragon Fights\n+60 Health, +60 Defense, +35 Strength, +10 Crit Chance, +15 Crit Damage, +1% Overall Stats', true)
    .addField('<:frag:805495450001080320> Dragon Fragment', 'Commonly dropped from Dragon Fights or from killing the Floor 3 Boss\n240 Fragments are used to craft Dragon Armor', true)
    .addField('Beacon', 'Crafted with a Nether Star and 10M Coins\nGrants 20% faster Minion Production', true)
    .addField('<:summoningeye2:807720027485634561> Summoning Eye', 'Found rarely from Zealot that appear in Dungeons on any Floor\nBase 35% Drop Chance', true)
    .addField('Healing Potion', 'Regenerates 50% of the missing Health', true)
    .addField('Strength Potion', 'Grants some Strength', true)
    .addField('Rainbow Potion', 'Regenerates 50% of the missing Health and grants some Strength', true)
  
  const dungeonembed = new MessageEmbed()
    .setTitle('General Information about Dungeon Runs')
    .setColor('GREY')
    .setDescription('Dungeons are the Core Gameplay of Worthy, you can choose between 3 different Classes (Ninja/Warrior/Tank) which u can change at any given Time.\n\n**Class Bonuses**\nNinja gives +0.75 Ferocity per Level, Warrior gives 3 Strength and 1 Defense per Level, Tank gives 5 Health and 3 Defense per Level.\n\n**General Gameplay**\nOnce you enter a Dungeon using \`/dungeon (FLOOR)\` it will automatically start. Your character will walk towards the Enemies or Puzzles which u then need to complete. Once all Stages of the Dungeon are complete the Boss Fights starts and once the Boss is slain you can choose the Loot you would like to get.\n\n**Dungeon Mobs**\nThere are a normal, effect assigning and special Mobs. Normal Mobs just deal damage when you attack them. Effect assigning Mobs will inflict Curse a damage over time effect on you if you don\'t have an Item to bypass the effect (Warden Talisman or Warden Armor). Then theres special Mobs which currently only 1 exist which is the Enchanter it will grant you 5000 Combat XP when you kill it.\n\n**Dungeon Puzzles**\nThere are 3 different Puzzles Color Memory, Math Questions or a Skyblock Wiki which all have a 1% Chance to drop you an Treasure Talisman.')

  const worthyembed = new MessageEmbed()
    .setTitle('General Information about Worthy')
    .setColor('GREY')
    .setDescription('**Loot System**')



  const filter = i => {
      i.deferUpdate();
      return i.user.id === message.author.id;
    };

    const collector = main.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 60 * 1000 * 5 })

    collector.on('collect', async i => {
      if(i.customId == 'pet') {
        main.edit({embeds: [petembed]})
      } else if(i.customId == 'sword') {
        main.edit({embeds: [swordembed]})
      } else if(i.customId == 'armor') {
        main.edit({embeds: [armorembed]})
      } else if(i.customId == 'talisman') {
        main.edit({embeds: [talismanembed]})
      } else if(i.customId == 'petitem') {
        main.edit({embeds: [petitemembed]})
      } else if(i.customId == 'misc') {
        main.edit({embeds: [miscembed]})
      } else if(i.customId == 'dungeon') {
        main.edit({embeds: [dungeonembed]})
      } else if(i.customId == 'worthy') {
        main.edit({embeds: [worthyembed]})
      }
    })

    collector.on('end', async i => {
      main.edit({components: []})
      return;
    })
  }
};