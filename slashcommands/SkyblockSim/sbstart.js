const Discord = require('discord.js');

module.exports = {
  name: "sbstart",
  description: "Creates your Profile for Skyblock Simulator",
  usage: "sbstart",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['sbcreate'],
  cooldown: 10,
  async execute(interaction, mclient) {

    const collection = mclient.db('SkyblockSim').collection('Players');
    let player = await collection.findOne({ _id: interaction.user.id })

    const start = new Discord.MessageEmbed()
      .setColor('90EE90')
      .setDescription('<a:wait:847471618272002059> Creating Profile')

    const menu = await interaction.editReply({ embeds: [start] })


    let profiles = ['🍎 Apple', '🍌 Banana', '🫐 Blueberry', '🥥 Coconut', '🥒 Cucumber', '🍇 Grapes', '🥝 Kiwi', '🍋 Lemon']
    let profilename = profiles[Math.floor(Math.random() * profiles.length)];

    let starttime = interaction.createdTimestamp / 1000
    starttime = starttime.toFixed()
    // if (player !== null) {
    await collection.updateOne(
      { _id: interaction.user.id },
      {
        $set: {
          data: {
            profile: {
              coins: 0, gems: 0, cute_name: profilename, started: starttime
            },
            stats: {
              health: 100, defense: 0, damage: 5, strength: 0, crit_chance: 20, crit_damage: 50, magic_find: 0, sea_creature_chance: 20
            },
            skills: {
              mining: 0, foraging: 0, enchanting: 0, farming: 0, combat: 0, fishing: 0, alchemy: 0, taming: 0
            },
            inventory: {
              items: [
                //Empty cause dropped Items go here
              ],
              armor: [
                {
                  "name": "None",
                  "recombobulated": false,
                  "health": 0,
                  "defense": 0,
                  "strength": 0,
                  "crit_chance": 0,
                  "crit_damage": 0,
                  "magic_find": 0,
                  "sea_creature_chance": 0,
                },
              ],
              sword: [
                {
                  "name": "Fist",
                  "recombobulated": false,
                  "damage": 0,
                  "strength": 0,
                  "crit_chance": 0,
                  "crit_damage": 0,
                },
              ],
            },
            slayer: {
              zombiexp: 0, spiderxp: 0, wolfxp: 0, endermanxp: 0, zombiekills: 0, spiderkills: 0, wolfkills: 0, endermankills: 0
            },
            dungeons: {
              xp: 0, total_runs: 0, class: { selected: { name: 'Assassin', xp: 0 }, available: { assassin: { xp: 0 }, berserker: { xp: 0 }, tank: { xp: 0 } } }
            },
            settings: {
              imgshown: true
            },
            equipment: {
              combat: {
                sword: {
                  name: 'Fist', damage: 0, strength: 0, crit_chance: 0, crit_damage: 0, recombobulated: false
                }, armor: {
                  name: 'None', health: 0, defense: 0, strength: 0, crit_chance: 0, crit_damage: 0, magic_find: 0, sea_creature_chance: 0, recombobulated: false
                }
              }, fishing: { rod: { name: 'Fishing Rod', sea_creature_chance: 0, fishing_speed: 0 } }
            },
            misc: {
              location: 'Graveyard', is_fishing: false, in_dungeon: false, daily: {
                last_claimed: 0, streak: 0
              }, booster_cookie: {
                active: false, expires: 0
              }
            }
          }
        }
      },
      { upsert: true })


    const created = new Discord.MessageEmbed()
      .setImage('https://cdn.discordapp.com/attachments/860131688385478666/865211353491570708/maxresdefault.png')
      .setColor('90EE90')
      .setTitle('<a:yes:847468695772987423> Profile Created')
      .setDescription(`To start Grinding Coins use \`/sb farm\`\nTo view your Profile or another Persons Profile use \`/sb info (@User)\`\n**FOR A GUIDE ON HOW TO PLAY USE \`/sb guide\`**`)
      .setFooter('Skyblock Simulator\nValues in () aren\'t needed')

    menu.edit({ embeds: [created] })
    return;
    //  } else {
    const profilealready = new Discord.MessageEmbed()
      .setFooter('Values in () aren\'t needed')
      .setColor('ORANGE')
      .setTitle('You already have a Profile')
      .setDescription(`Use \`/sb info (@User)\` to see your Stats and \`/sb farm\` to earn Money`)
      .setFooter('Skyblock Simulator')
    menu.edit({ embeds: [profilealready] })
    // }
  }
};

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}