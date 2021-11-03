const Discord = require('discord.js');

module.exports = {
  name: "sbreforge",
  description: "a",
  usage: "sbsettings (Setting Name)",
  perms: "None",
  folder: "SkyblockSim",
  aliases: [],
  cooldown: 10,
  async execute(interaction, mclient) {

    const collection = mclient.db('SkyblockSim').collection('Players');
    let player = await collection.findOne({ _id: interaction.user.id })

    if (player === null) {
      const noprofile = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('No Profile found')
        .setDescription(`Create a Profile using \`/sb start\``)
      interaction.editReply({ embeds: [noprofile] })
      return;
    }

    if(interaction.user.id != '570267487393021969') {
       return interaction.editReply('WIP')
    }

    let type = interaction.options.getString('choice')
    let itemId = interaction.options.getInteger('number')
    let reforge = interaction.options.getString('reforge-stone')
    reforge = reforge.toLowerCase()

    let sword = player.data.inventory.sword
    let armor = player.data.inventory.armor
    let apply_reforge = ''
    let path = ''

    

    //returning error if invalid itemId
    if(type == 'sword' && sword.length <= itemId) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Item Number')
      .setDescription(`You don\'t own a Sword with the Number \`${itemId}\`.\nCheck the Sword Category at \`/sb info\` to see what Items you own.`)
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [errembed]})
    }

    if (type == 'armor' && armor.length <= itemId) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Item Number')
      .setDescription(`You don\'t own an Armor with the Number \`${itemId}\`.\nCheck the Armor Category at \`/sb info\` to see what Items you own.`)
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [errembed]})
    }

    if (type == 'sword') {
      let validreforges = ['dragon claw', 'wither blood', 'warped stone', 'recombobulator 3000']
      let itemname = sword[itemId].name

      if(!validreforges.includes(reforge)) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Reforge')
      .setDescription('You entered an invalid Reforge Name see the Reforge tab at \`/sb wiki\`.')
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({ embeds: [errembed]})
    }
    
    if(!player.data.inventory.items.find(item => item.name.toLowerCase() == reforge && item.amount > 0)) {
        const errembed = new Discord.MessageEmbed()
      .setTitle('No Reforge Stone')
      .setDescription(`You don't have any **${caps(reforge)}** Reforge Stones.`)
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({ embeds: [errembed]})
      }

    if (reforge == 'dragon claw') {
      apply_reforge = 'Fabled'
    } else if (reforge == 'wither blood') {
      apply_reforge = 'Withered'
    } else if (reforge == 'warped stone') {
      apply_reforge = 'warped'
    } else if(reforge == 'recombobulator 3000') {
      apply_reforge = 'Recombobulator 3000'
    }

    let reforged = caps(reforge)


    //add function to remove reforge stone from inventory
    if(reforge != 'recombobulator 3000') {
    await collection.updateOne(
      { _id: interaction.user.id, "data.inventory.sword.name": itemname },
      { $set: { "data.inventory.sword.$.reforge": apply_reforge } },
      { upsert: true })
    } else {
      await collection.updateOne(
      { _id: interaction.user.id, "data.inventory.sword.name": itemname },
      { $set: { "data.inventory.sword.$.recombobulated": true } },
      { upsert: true })
    }

    await collection.updateOne(
      { _id: interaction.user.id, "data.inventory.items.name": reforged },
      { $inc: { "data.inventory.items.$.amount": -1 } },
      { upsert: true })
    
    let applied = new Discord.MessageEmbed()
      .setTitle('Reforge applied')
      .setDescription(`Successfully applied **${apply_reforge}** to **${itemname}**.`)
      .setColor('90EE90')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [applied]})
    

    } else if (type == 'armor') {
      let validreforges = ['deep sea orb', 'dragon horn', 'precursor gear', 'sadan\'s brooch', 'recombobulator 3000']
      let itemname = armor[itemId].name

      if(!validreforges.includes(reforge)) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Reforge')
      .setDescription('You entered an invalid Reforge Name see the Reforge tab at \`/sb wiki\`.')
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({ embeds: [errembed]})
    }
   

      if(!player.data.inventory.items.find(item => item.name.toLowerCase() == reforge && item.amount > 0)) {
        const errembed = new Discord.MessageEmbed()
      .setTitle('No Reforge Stone')
      .setDescription(`You don't have any **${caps(reforge)}** Reforge Stones.`)
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({ embeds: [errembed]})
      }
      
    
      if(reforge == 'deep sea orb') {
        apply_reforge = 'Submerged'
      } else if (reforge == 'dragon horn') {
        apply_reforge = 'Renowned'
      } else if (reforge == 'precursor gear') {
        apply_reforge = 'Ancient'
      } else if (reforge == 'sadan\'s brooch') {
        apply_reforge = 'Empowered'
      } else if(reforge == 'recombobulator 3000') {
      apply_reforge = 'Recombobulator 3000'
    }

      let reforged = caps(reforge)
       

      if(reforge != 'recombobulator 3000') {
      await collection.updateOne(
        { _id: interaction.user.id, "data.inventory.armor.name": itemname },
        { $set: { "data.inventory.armor.$.reforge": apply_reforge } },
        { upsert: true })
      } else {
        await collection.updateOne(
        { _id: interaction.user.id, "data.inventory.armor.name": itemname },
        { $set: { "data.inventory.armor.$.recombobulated": true } },
        { upsert: true })
      }

      await collection.updateOne(
        { _id: interaction.user.id, "data.inventory.items.name": reforged },
        { $inc: { "data.inventory.items.$.amount": -1 } },
        { upsert: true })
    

      let applied = new Discord.MessageEmbed()
      .setTitle('Reforge applied')
      .setDescription(`Successfully applied **${apply_reforge}** to **${itemname}**.`)
      .setColor('90EE90')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [applied]})

    } else if (type == 'pickaxe') {
      let validreforges = ['onyx', 'diamonite', 'rock gemstone', 'recombobulator 3000']

      if(!validreforges.includes(reforge)) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Reforge')
      .setDescription('You entered an invalid Reforge Name see the Reforge tab at \`/sb wiki\`.')
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({ embeds: [errembed]})
    }

    if(!player.data.inventory.items.find(item => item.name.toLowerCase() == reforge && item.amount > 0)) {
        const errembed = new Discord.MessageEmbed()
      .setTitle('No Reforge Stone')
      .setDescription(`You don't have any **${caps(reforge)}** Reforge Stones.`)
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({ embeds: [errembed]})
      }

    if(reforge == 'onyx') {
      apply_reforge = 'Fruitful'
    } else if(reforge == 'diamonite') {
      apply_reforge = 'Fleet'
    } else if(reforge == 'rock gemstone') {
      apply_reforge = 'Auspicious'
    } else if(reforge == 'recombobulator 3000') {
      apply_reforge = 'Recombobulator 3000'
    }

    let reforged = caps(reforge)

    if(reforge != 'recombobulator 3000') {

    await collection.updateOne(
        { _id: interaction.user.id },
        { $set: { "data.equipment.mining.pickaxe.reforge": apply_reforge } },
        { upsert: true })

    } else {

      await collection.updateOne(
        { _id: interaction.user.id },
        { $set: { "data.equipment.mining.pickaxe.recombobulated": true } },
        { upsert: true })

    }

      await collection.updateOne(
        { _id: interaction.user.id, "data.inventory.items.name": reforged },
        { $inc: { "data.inventory.items.$.amount": -1 } },
        { upsert: true })

    let applied = new Discord.MessageEmbed()
      .setTitle('Reforge applied')
      .setDescription(`Successfully applied **${apply_reforge}** to **Pickaxe**.`)
      .setColor('90EE90')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [applied]})

    } else if (type == 'rod') {
      let validreforges = ['hardened wood', 'lucky dice', 'recombobulator 3000']

      if(!validreforges.includes(reforge)) {
      const errembed = new Discord.MessageEmbed()
      .setTitle('Invalid Reforge')
      .setDescription('You entered an invalid Reforge Name see the Reforge tab at \`/sb wiki\`.')
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({ embeds: [errembed]})
    }

    if(!player.data.inventory.items.find(item => item.name.toLowerCase() == reforge && item.amount > 0)) {
        const errembed = new Discord.MessageEmbed()
      .setTitle('No Reforge Stone')
      .setDescription(`You don't have any **${caps(reforge)}** Reforge Stones.`)
      .setColor('RED')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({ embeds: [errembed]})
      }

    if(reforge == 'hardened wood') {
      apply_reforge = 'Stiff'
    } else if(reforge == 'lucky dice') {
      apply_reforge = 'Lucky'
    } else if(reforge == 'recombobulator 3000') {
      apply_reforge = 'Recombobulator 3000'
    }

    let reforged = caps(reforge)

    if(reforge != 'recombobulator 3000') {

      await collection.updateOne(
        { _id: interaction.user.id },
        { $set: { "data.equipment.fishing.rod.reforge": apply_reforge } },
        { upsert: true })

    } else {
      await collection.updateOne(
        { _id: interaction.user.id },
        { $set: { "data.equipment.fishing.rod.recombobulated": true } },
        { upsert: true })
    }
    

      await collection.updateOne(
        { _id: interaction.user.id, "data.inventory.items.name": reforged },
        { $inc: { "data.inventory.items.$.amount": -1 } },
        { upsert: true })

    let applied = new Discord.MessageEmbed()
      .setTitle('Reforge applied')
      .setDescription(`Successfully applied **${apply_reforge}** to **Fishing Rod**.`)
      .setColor('90EE90')
      .setFooter('Skyblock Simulator')

      return interaction.editReply({embeds: [applied]})
    }



  }
};

function caps(words) {
  let separateWord = words.toLowerCase().split(' ');
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
      separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}

