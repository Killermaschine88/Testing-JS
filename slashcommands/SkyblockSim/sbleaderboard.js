const Discord = require('discord.js');

module.exports = {
  name: "sbleaderboard",
  description: "a",
  usage: "sbsettings (Setting Name)",
  perms: "None",
  folder: "SkyblockSim",
  aliases: [],
  cooldown: 10,
  async execute(interaction, mclient) {

    const collection = mclient.db('SkyblockSim').collection('Players');
  
let type = interaction.options.getString('type')

    let embed = new Discord.MessageEmbed()
    .setTitle('Leaderboard')

    
    
let i = 0
    let j = 0

    //different leaderboards
    //coins
    let coins_lb = await collection.find({}).sort({ "data.profile.coins": -1 }).toArray()
    let coinstring = ''
    let coinindex = coins_lb.findIndex(lb => lb._id == interaction.user.id)
    
    while(i < coins_lb.length && i < 10) {
      coinstring += `${i+1}# - <@!${coins_lb[i]._id}>: ${coins_lb[i].data.profile.coins.toLocaleString()}\n`
      i++
    }
    i = 0

    //combat xp
    let combat_lb = await collection.find({}).sort({ "data.skills.combat": -1 }).toArray()
    let combatstring = ''
    let combatindex = combat_lb.findIndex(lb => lb._id == interaction.user.id)

    while(i < combat_lb.length && i < 10) {
      combatstring += `${i+1}# - <@!${combat_lb[i]._id}>: ${combat_lb[i].data.skills.combat.toLocaleString()}\n`
      i++
    }
    i = 0
    
    


    

    if(type == null) {
      //add select menu with dif leaderboards
      
    } else if(type == 'coins') {
      embed.setDescription(coinstring)
      embed.setFooter(`You are #${coinindex+1} out of ${coins_lb.length}`)
      
    } else if(type == 'combat') {

      embed.setDescription(combatstring)
      embed.setFooter(`You are #${combatindex+1} out of ${combat_lb.length}`)
      
    }

    
  

    interaction.editReply({embeds: [embed]})    
  }
}