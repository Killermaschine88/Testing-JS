const Discord = require('discord.js');

module.exports = {
  name: "sbwiki",
  description: "a",
  usage: "sbwiki (Setting Name)",
  perms: "None",
  folder: "SkyblockSim",
  aliases: [],
  cooldown: 10,
  async execute(interaction, mclient) {

    const collection = mclient.db('SkyblockSim').collection('events');
    let events = await collection.find({ }).toArray()

    let mf_event = events[0]

    const embed = new Discord.MessageEmbed()
    .setTitle('Skyblock Simulator Wiki')
    .setColor('90EE90')
    .setFooter('Skyblock Simulator')
    .setDescription('Press the corresponding Button that you want to see the Information off.')

    const button1 = new Discord.MessageButton()
      .setCustomId('general')
      .setLabel('General Info')
      .setStyle('PRIMARY')
    const button2 = new Discord.MessageButton()
      .setCustomId('symbols')
      .setLabel('Symbols')
      .setStyle('PRIMARY')
    const button3 = new Discord.MessageButton()
      .setCustomId('misc')
      .setLabel('Misc')
      .setStyle('PRIMARY')
    const button4 = new Discord.MessageButton()
       .setCustomId('events')
       .setLabel('Events')
       .setStyle('PRIMARY')
  

    const row = new Discord.MessageActionRow()
      .addComponents(button1, button2, button4)

    let menu = await interaction.editReply({embeds: [embed], components: [row]})


    const filter = i => {
      i.deferUpdate();
      return i.user.id === interaction.user.id;
    };

    const collector = menu.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 858000 })

    collector.on('collect', async i => {
      if(i.customId == 'general') {
        const generalembed = new Discord.MessageEmbed()
        .setTitle('General Information')
        .setDescription('**Available Commands**\n\`sb class\`, \`sb daily\`, \`sb dragon\`, \`sb dungeons\`, \`sb grind\`, \`sb info\`, \`sb reforge\`, \`sb sell\`, \`sb settings\`, \`sb shop\`, \`sb start\`, \`sb wardrobe\`, \`sb warp\`, \`sb wiki\`, \`sb fishing\`, \`sb mining\`')
        .setColor('90EE90')
        .setFooter('Skyblock Simulator')

        menu.edit({embeds: [generalembed]})
      } else if(i.customId == 'symbols') {
        const symbolembed = new Discord.MessageEmbed()
        .setTitle('Symbol Information')
        .setColor('90EE90')
        .setFooter('Skyblock Simulator')
        .setDescription('\`❤ Health\`\n\`❈ Defense\`\n\`⚔️ Damage\`\n\`❁ Strength\`\n\`☣ Crit Chance\`\n\`☠ Crit Damage\`\n\`✯ Magic Find\`\n\`α Sea Creature Chance\`\n\`🎣 Fishing Speed\`\n\`⸕ Mining Speed\`\n\`☘ Mining Fortune\`')

        menu.edit({embeds: [symbolembed]})
      } else if(i.customId == 'events') {
        let time = Date.now() / 1000
        
        let eventembed = new Discord.MessageEmbed()
        eventembed.setTitle('Event Information')
        eventembed.setColor('90EE90')
       eventembed .setFooter('Skyblock Simulator')
          if(mf_event.enabled == false) {
        eventembed.addField(`Magic Find`, `Everyday from 6:00 - 8:00 (6 am - 8 am) and 16:00 - 18:00 (4:00 pm - 6:00 pm)\nEvent Active: ${mf_event.enabled}\nNext Event: <t:${mf_event.next_event}:R>`)
          } else {
            
            eventembed.addField(`Magic Find`, `Everyday from 6:00 - 8:00 (6 am - 8 am) and 16:00 - 18:00 (4:00 pm - 6:00 pm)\nEvent Active: ${mf_event.enabled}\nEvent End: <t:${mf_event.end_event}:R>`)
          }
          
        menu.edit({embeds: [eventembed]})
      } else if(i.customId == 'dungeons') {
        let dungeonsembed = new Discord.MessageEmbed()
        .setTitle('Dungeons Information')
        .setColor('90EE90')
        .setFooter('Skyblock Simulator')
      }
    })
  }
};