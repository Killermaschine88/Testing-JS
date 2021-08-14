const Discord = require('discord.js');

module.exports = {
  name: "sbdungeons",
  description: "Settings for SkyblockSim",
  usage: "sbsettings (Setting Name)",
  perms: "None",
  folder: "SkyblockSim",
  aliases: [],
  cooldown: 10,
  async execute(interaction, mclient) {


    const collection = mclient.db('SkyblockSim').collection('Players');
    let player = await collection.findOne({ _id: interaction.user.id })


 if(player === null) {
   interaction.editReply('No Profile')
   return;
 }
 
 if(player.data.dungeons.class.selected.name === 'None') {
   const noClass = new Discord.MessageEmbed()
   .setColor('GREY')
   .setFooter('Skyblock Simulator')
   .setDescription('**Available Classes**\nSelect a Class using /sb class <Class Name> before starting a Dungeon, the selected Class can be changed at any time while your not in a Dungeon\n\n**Assassin**\nGives 2 Strength and 1 Ferocity per Level\n\n**Berserker**\nGives 1 Strength and 1 Defense per Level\n\n**Tank**\nGives 1 Defense and 2 Health per Level')
   interaction.editReply({embeds: [noClass]})
 }
 
 //Variables needed for the Map
 let map = ''
 let oldLocation = [1, 1]
  let movement = ''
    
 let f1_map = [
   [['0'], ['0'], ['0'], ['0'], ['0']],
   [['0'], ['2'], ['1'], ['1'], ['0']],
   [['0'], ['1'], ['1'], ['1'], ['0']],
   [['0'], ['1'], ['1'], ['1'], ['0']],
   [['0'], ['0'], ['0'], ['0'], ['0']]
   ]
 
 let f3_map = [
   [['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0']],
   [['0'], ['2'], ['1'], ['1'], ['1'], ['1'], ['1'], ['1'], ['1'], ['0']],
   [['0'], ['1'], ['1'], ['1'], ['1'], ['1'], ['1'], ['1'], ['1'], ['0']],
   [['0'], ['1'], ['1'], ['1'], ['1'], ['1'], ['1'], ['1'], ['1'], ['0']],
   [['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0']]
   ]


//Floor Selection
    
const floor1 = new Discord.MessageButton()
      .setCustomId('f1')
      .setLabel('Floor 1')
      .setStyle('PRIMARY')
    const floor2 = new Discord.MessageButton()
      .setCustomId('f2')
      .setLabel('Floor 2')
      .setStyle('PRIMARY')
    
const floor3 = new Discord.MessageButton()
      .setCustomId('f3')
      .setLabel('Floor 3')
      .setStyle('PRIMARY')
    
    const floors = new Discord.MessageActionRow()
    .addComponents(floor1, floor2 , floor3)



    

  let nums = ['1']
    let num = nums[Math.floor(Math.random() * nums.length)];

const floorselect = new Discord.MessageEmbed()
    .setTitle('Dungeons Floor Selection')
    .setFooter('Skyblock Simulator')
    .setColor('GREY')
    .setDescription('**Floor 1 (0)**\n**Floor 2(4)**')

    const menu = await interaction.editReply({embeds: [floorselect], components: [floors]})

    
const filter = i => {
      i.deferUpdate();
      return i.user.id === interaction.user.id;
    };

  
await menu.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 60000 })
      .then(i => {
        if (i.customId === 'f1' && num === '1') {
          map = f1_map
              } else if (i.customId === 'f2' && num === '1') {
          map = f2_map
        } else if (i.customId === 'f3' && num === '1') {
          map = f3_map
        } else {
          const cancelled = new Discord.MessageEmbed()
            .setTitle('Menu Cancelled')
            .setColor('RED')
          menu.edit({ embeds: [cancelled], components: [] })
          return;
        }
      }).catch(err => menu.edit({ components: [] }));
    
      

    //Variables needed for movement
    const empty = new Discord.MessageButton()
      .setCustomId('empty')
    .setEmoji('876209923875303424')
      .setStyle('PRIMARY')
      .setDisabled(true)
    const emptyy = new Discord.MessageButton()
      .setCustomId('emptyy')
    .setEmoji('876209923875303424')
      .setStyle('PRIMARY')
      .setDisabled(true)
    const emptyyy = new Discord.MessageButton()
      .setCustomId('emptyyy')
    .setEmoji('876209923875303424')
      .setStyle('PRIMARY')
      .setDisabled(true)
    const emptyyyy = new Discord.MessageButton()
      .setCustomId('emptyyyy')
    .setEmoji('876209923875303424')
      .setStyle('PRIMARY')
      .setDisabled(true)
    const emptyyyyy = new Discord.MessageButton()
      .setCustomId('emptyyyyy')
    .setEmoji('876209923875303424')
      .setStyle('PRIMARY')
      .setDisabled(true)

    const up = new Discord.MessageButton()
      .setCustomId('up')
      .setLabel('⬆️')
      .setStyle('PRIMARY')

const down = new Discord.MessageButton()
      .setCustomId('down')
      .setLabel('⬇️')
      .setStyle('PRIMARY')
    
const left = new Discord.MessageButton()
      .setCustomId('left')
      .setLabel('⬅️')
      .setStyle('PRIMARY')
    
const right = new Discord.MessageButton()
      .setCustomId('right')
      .setLabel('➡️')
      .setStyle('PRIMARY')
    
  const attack = new Discord.MessageButton()
    .setCustomId('attack')
    .setLabel('⚔️')
    .setStyle('PRIMARY')
    .setDisabled(true)
  const interact = new Discord.MessageButton()
    .setCustomId('interact')
    .setLabel('a')
    .setStyle('PRIMARY')
    .setDisabled(true)

    const row1 = new Discord.MessageActionRow()
    .addComponents(attack, up, interact)
    const row2 = new Discord.MessageActionRow()
    .addComponents(left, down, right)
    //const row3 = new Discord.MessageActionRow()
    //.addComponents(emptyyyy, down, emptyyyyy)

   // const testrow = new Discord.MessageActionRow()
    //.addComponents(up, down, left, right)

    
      

  const test = new Discord.MessageEmbed()
 test.setFooter('Skyblock Simulator')
test.setColor('GREY')
    
 menu.edit({embeds: [test], components: [row1, row2]})


     const collector = menu.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 858000 })


    collector.on('collect', async i => {
    if(i.customId === 'up') {
      movement = 'up'
    } else if(i.customId === 'left') {
      movement = 'left'
    } else if (i.customId === 'right') {
      movement = 'right'
    } else if (i.customId === 'down') {
      movement = 'down'
    }
    
          oldLocation = await movePlayer(oldLocation, map, movement)

          const player = '🟩'
          const wall = '<:wall:876211886746636288>'
      const air = '<:air:876209923875303424>'

const mapArray = ( map ) => {
    let string = ''
    let index = 0
    for ( const row of map ) {
        for ( const item of row ) {
            index++
            if ( item == 0 ) string += wall
            else if ( item == 1 ) string += air
            else if ( item == 2 ) string += player
            // reset the row
            if ( index == 10 ) index = 0, string += '\n'
        }
    }
    return string
}

         test.setDescription(`${mapArray(map)}`)
          menu.edit({embeds: [test]})
      
    })

    
 collector.on('end', async collected => {
 
      menu.edit({ embeds: [test], components: [] })
    });

 
 

  }
};

/*
0 = Wall
1 = Room
2 = Player
3 = Puzzle
4 = Mob
5 = Secret
*/

function movePlayer(oldLocation, map, movement) {
  let [x, y] = oldLocation
  
  if(movement === 'up') {
    var a = x-1
    var b = y
  } else if (movement === 'left') {
    var a = x
    var b = y-1
    } else if (movement === 'right') {
    var a = x
    var b = y+1
  } else if (movement === 'down') {
    var a = x+1
    var b = y
  }


if(map[a][b] == '0') {
  return oldLocation
}
  
  map[x][y] = ['1']

  
  oldLocation = [a, b]

  
  
  map[a][b] = ['2']
  return oldLocation
}