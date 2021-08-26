const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
const playerStats = require('./Various/playerStats.js')
const classLevel = require('../../Various/Skyblock/dungeonlevel.js')
const skillLevel = require('../../Various/Skyblock/skilllvl.js')

module.exports = {
  name: "sbdungeons",
  description: "Settings for SkyblockSim",
  usage: "sbsettings (Setting Name)",
  perms: "None",
  folder: "SkyblockSim",
  aliases: [],
  cooldown: 10,
  async execute(interaction, mclient) {
    /**
    * @param {String} movement Direction to move
    * @param {Boolean} ignoreEvent Move inside the event or not
    * @returns {Array<Number, Number>} New position coordinates
    */
    const movePlayer = (movement, ignoreEvent) => {
      let [x, y] = location

      if (movement === 'up') {
        var a = x - 1
        var b = y
      } else if (movement === 'left') {
        var a = x
        var b = y - 1
      } else if (movement === 'right') {
        var a = x
        var b = y + 1
      } else if (movement === 'down') {
        var a = x + 1
        var b = y
      }
      if (map[a][b] == 0 || ((map[a][b] == 3 || map[a][b] == 4) && !ignoreEvent)) return location

      map[x][y] = 1

      location = [a, b]

      map[a][b] = 2
      return location
    }
    /**
     * @returns {String} Map string for the embed
     */
    const mapArray = () => {
      let string = ''
      let index = 0
      for (const row of map) {
        for (const item of row) {
          index++
          if (item == 0) string += wall
          else if (item == 1) string += air
          else if (item == 2) string += Player
          else if (item == 3) string += puzzle
          else if (item == 4) string += enemy
          // reset the row
          if (index == map[0].length) index = 0, string += '\n'
        }
      }
      return string
    }
    /**
     * @returns {Array<Boolean, String>} Enemy is near or not - Direction
     */
    const nearEnemy = () => {
      let [x, y] = location

      // Check if enemy is on the right
      if (map[x][y + 1] == 4) return [true, 'right']
      // Check if enemy is on the left
      if (map[x][y - 1] == 4) return [true, 'left']
      // Check if enemy is below
      if (map[x + 1][y] == 4) return [true, 'down']
      // Check if enemy is above
      if (map[x - 1][y] == 4) return [true, 'up']
      return false
    }
    /**
     * @returns {Array<Boolean, String>} Puzzle is near or not - Direction
     */
    const nearPuzzle = () => {
      let [x, y] = location

      // Check if puzzle is on the right
      if (map[x][y + 1] == 3) return [true, 'right']
      // Check if puzzle is on the left
      if (map[x][y - 1] == 3) return [true, 'left']
      // Check if puzzle is below
      if (map[x + 1][y] == 3) return [true, 'down']
      // Check if puzzle is above
      if (map[x - 1][y] == 3) return [true, 'up']
      return false
    }
    //Damage Calculations
    /**
     * @param {Number} php Player Health
     * @param {Number} mdmg Mob Damage
     * @returns {Number} Player Health
     */
    const dmgtaken = (php, mdmg) => {
      php -= mdmg
      return php
    }
    /**
     * @param {Number} mhp Mob Health
     * @param {Number} pdmg Player Damage
     * @returns {Number} Mob Health
     */
    const dmgdealt = (mhp, pdmg) => {
      mhp -= pdmg
      return mhp
    }
    const sleep = async (ms) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms)
      })
    }
    const isCrit = (critchance) => {
      return (Math.random() * 100 < critchance) ? true : false
    }

    const updateTTT = (x, y, user) => {
      const emoji = (user) ? '🟩' : '🟥'
      let txt = '', index = 0
      table[x][y] = emoji

      for (const row of table) {
        for (const column of row) {
          index++
          txt += ' **|** ' + column
          if (index % 3 == 0) txt += ' **|**\n'
        }
      }
      return txt
    }
    const wincheckTTT = () => {
      const [a, b, c] = table[0]
      const [d, e, f] = table[1]
      const [g, h, i] = table[2]

      if (a != fog && b != fog && c != fog && d != fog && e != fog && f != fog && g != fog && h != fog && i != fog) {
        if ((a == b && b == c && b != fog) || (a == d && d == g && d != fog) || (a == e && e == i && e != fog)) return [true, a]
        if ((d == e && e == f && e != fog) || (b == e && e == h && e != fog) || (g == e && e == c && e != fog)) return [true, e]
        if ((g == h && h == i && h != fog) || (c == f && f == i && f != fog)) return [true, i]
        else return [true, undefined]
      }
      if ((a == b && b == c && b != fog) || (a == d && d == g && d != fog) || (a == e && e == i && e != fog)) return [true, a]
      if ((d == e && e == f && e != fog) || (b == e && e == h && e != fog) || (g == e && e == c && e != fog)) return [true, e]
      if ((g == h && h == i && h != fog) || (c == f && f == i && f != fog)) return [true, i]
      else return [false, undefined]
    }
    const shuffle = (array) => {
      let currentIndex = array.length, randomIndex

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]]
      }

      return array
    }

    const collection = mclient.db('SkyblockSim').collection('Players')
    const player = await collection.findOne({ _id: interaction.user.id })


    if (player === null) {
      const noprofile = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('No Profile found')
        .setDescription(`Create a Profile using \`/sb start\``)
      interaction.editReply({ embeds: [noprofile] })
      return;
    }

    //Checks if the Player already has an open Dungeon Run
    if (player.data.misc.in_dungeon) {
      const runopen = new MessageEmbed()
        .setTitle('Another Dungeon is already open somewhere.')
        .setDescription('The Dungeon automatically closes after 1 Minute of no input')
        .setColor('RED')
        .setFooter('Skyblock Simulator')
      return interaction.editReply({ embeds: [runopen] })
    }

    //Players Stats
    let type = 'combat'
    let pstats = playerStats(player, type) //Type decides what gear is needed for the Action

    let combatlvl = skillLevel(player.data.skills.combat).level

    let classlevel = classLevel(player.data.dungeons.class.selected.xp).level

    if (player.data.dungeons.class.selected.name == 'Assassin') {
      pstats.strength += 2 * classlevel
    } else if (player.data.dungeons.class.selected.name == 'Berserker') {
      pstats.strength += 1 * classlevel
      pstats.defense += 1 * classlevel
    } else if (player.data.dungeons.class.selected.name == 'Tank') {
      pstats.health += 2 * classlevel
      pstats.defense += 1 * classlevel
    }



    //Variables needed for the Map
    let map = ''
    let location = [1, 1]
    let score = 100

    let f1_map = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ]
    let f2_map = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
    // sample floor 2 map
    f2_map = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 0, 3, 0],
      [0, 3, 1, 1, 1, 0, 1, 0],
      [0, 4, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 0, 0, 1, 0],
      [0, 1, 1, 4, 0, 4, 1, 0],
      [0, 3, 1, 1, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
    let f3_map = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    //Floor Selection
    const floors = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('f1')
          .setLabel('Floor 1')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId('f2')
          .setLabel('Floor 2')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId('f3')
          .setLabel('Floor 3')
          .setStyle('PRIMARY')
      )

    const floorSelect = new MessageEmbed()
      .setTitle('Dungeons Floor Selection')
      .setFooter('Skyblock Simulator')
      .setColor('GREY')
      .setDescription('**<:bonzo:852111493859115019> Floor 1 (0)**\n**<:scarff:852111493909446686> Floor 2 (4)**\n**<:professor:852111493952176148> Floor 3 (8)**')

    const menu = await interaction.editReply({ embeds: [floorSelect], components: [floors] })


    //Sets the Player into the Dungeon so they cant opem another run.
    await collection.updateOne(
      { _id: interaction.user.id },
      { $set: { "data.misc.in_dungeon": true } },
      { upsert: true }
    )

    const filter = i => {
      i.deferUpdate()
      return i.user.id === interaction.user.id
    }

    await menu.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 60000 })
      .then(i => {
        const { customId: id } = i

        if (id == 'f1') map = f1_map
        else if (id == 'f2') map = f2_map
        else if (id === 'f3') map = f3_map
        else {
          const cancelled = new MessageEmbed()
            .setTitle('Menu Cancelled')
            .setColor('RED')
          menu.edit({ embeds: [cancelled], components: [] })
          return
        }
      }).catch(err => menu.edit({ components: [] }))

    //Variables needed for movement
    const up = new MessageButton()
      .setCustomId('up')
      .setLabel('⬆️')
      .setStyle('PRIMARY')

    const down = new MessageButton()
      .setCustomId('down')
      .setLabel('⬇️')
      .setStyle('PRIMARY')

    const left = new MessageButton()
      .setCustomId('left')
      .setLabel('⬅️')
      .setStyle('PRIMARY')

    const right = new MessageButton()
      .setCustomId('right')
      .setLabel('➡️')
      .setStyle('PRIMARY')

    const attack = new MessageButton()
      .setCustomId('attack')
      .setLabel('⚔️')
      .setStyle('PRIMARY')
      .setDisabled(true)

    const interact = new MessageButton()
      .setCustomId('interact')
      .setLabel('🖐️')
      .setStyle('PRIMARY')
      .setDisabled(true)

    const cancel = new MessageButton()
      .setCustomId('cancel')
      .setLabel('️C️a️n️c️e️l️')
      .setStyle('DANGER')

    const row1 = new MessageActionRow()
      .addComponents(attack, up, interact, cancel)
    const row2 = new MessageActionRow()
      .addComponents(left, down, right)

    const test = new MessageEmbed()
    test.setFooter('Skyblock Simulator')
    test.setColor('GREY')

    const Player = '🟩'
    const wall = '<:wall:876211886746636288>'
    const air = '<:air:876209923875303424>'
    const puzzle = '🟪'
    const enemy = '<:rev:852892164559732806>'

    const puzzles = ['ttt', 'quiz']

    let critchance = pstats.crit_chance
    let php = pstats.health
    let mhp = (Math.random() < 0.5) ? 300 : 200 // Random mob hp at the moment
    let mdmg = (Math.random() < 0.5) ? 50 : 25 // Random mob hp at the moment

    test.setDescription(`🎯 Score: **${score}**\n\n${mapArray(map)}`)

    // If puzzle is near, interact button activates
    row1.components[2].disabled = nearPuzzle()[0] ? false : true
    // If enemy is near, fight button activates
    row1.components[0].disabled = nearEnemy()[0] ? false : true

    menu.edit({ embeds: [test], components: [row1, row2] })

    const collector = menu.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 1000 * 60 * 14, idle: 1000 * 60 * 1 })

    const row3 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('1')
          .setLabel('X')
          .setStyle('SECONDARY'),
        new MessageButton()
          .setCustomId('2')
          .setLabel('X')
          .setStyle('SECONDARY'),
        new MessageButton()
          .setCustomId('3')
          .setLabel('X')
          .setStyle('SECONDARY'),
      )
    const row4 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('4')
          .setLabel('X')
          .setStyle('SECONDARY'),
        new MessageButton()
          .setCustomId('5')
          .setLabel('X')
          .setStyle('SECONDARY'),
        new MessageButton()
          .setCustomId('6')
          .setLabel('X')
          .setStyle('SECONDARY'),
      )
    const row5 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('7')
          .setLabel('X')
          .setStyle('SECONDARY'),
        new MessageButton()
          .setCustomId('8')
          .setLabel('X')
          .setStyle('SECONDARY'),
        new MessageButton()
          .setCustomId('9')
          .setLabel('X')
          .setStyle('SECONDARY'),
      )
    const row6 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('A')
          .setLabel('A')
          .setStyle('SECONDARY'),
        new MessageButton()
          .setCustomId('B')
          .setLabel('B')
          .setStyle('SECONDARY'),
        new MessageButton()
          .setCustomId('C')
          .setLabel('C')
          .setStyle('SECONDARY'),
      )

    const fog = '🌫️'
    let table = [
      [fog, fog, fog],
      [fog, fog, fog],
      [fog, fog, fog]
    ]

    const quizzes = [
      {
        question: `How many Skills are there in Hypixel Skyblock? (All Skills Included)`,
        options: [
          ['10', false], ['11', false], ['12', true]
        ]
      },
      {
        question: `How much Catacombs XP do you need for Level 50?`,
        options: [
          ['569 Mil', true], ['560 Mil', false], ['575 Mil', false]
        ]
      },
      {
        question: `How many Pets are there?`,
        options: [
          ['50', false], ['54', false], ['51', true]
        ]
      },
      {
        question: `Who is the Owner of Hypixel?`,
        options: [
          ['hypxel', false], ['hpixel', false], ['hypixel', true]
        ]
      },
      {
        question: `How many Talisman are there?`,
        options: [
          ['76', true], ['70', false], ['73', false]
        ]
      },
      {
        question: `Which non Boss and non Slayer Mini-Boss Mob has the highest HP?`,
        options: [
          ['Voidling Extremist', true], ['Voidling Fanatic', false], ['Voidling Fnatic', false]
        ]
      },
      {
        question: `How many Areas are there? (Excluding Sub Areas)`,
        options: [
          ['20', false], ['22', true], ['24', false]
        ]
      }
    ]

    let quiz, randomOptions

    let inTTT = false, inQuiz = false, runFailed = false, runCancelled = false

    collector.on('collect', async i => {
      const { customId: id } = i

      if (inTTT) {
        let x, y
        if (test.fields.length > 0) {
          test.fields = [] // remove the addition field like the "killed a mod with x hp left"
          menu.edit({ embeds: [test] })
        }

        if (id == 1) x = 0, y = 0
        else if (id == 2) x = 0, y = 1
        else if (id == 3) x = 0, y = 2
        else if (id == 4) x = 1, y = 0
        else if (id == 5) x = 1, y = 1
        else if (id == 6) x = 1, y = 2
        else if (id == 7) x = 2, y = 0
        else if (id == 8) x = 2, y = 1
        else if (id == 9) x = 2, y = 2

        test.description = updateTTT(x, y, true)

        if (x == 0) {
          if (y == 0) row3.components[0].disabled = true
          else if (y == 1) row3.components[1].disabled = true
          else if (y == 2) row3.components[2].disabled = true
        } else if (x == 1) {
          if (y == 0) row4.components[0].disabled = true
          else if (y == 1) row4.components[1].disabled = true
          else if (y == 2) row4.components[2].disabled = true
        } else if (x == 2) {
          if (y == 0) row5.components[0].disabled = true
          else if (y == 1) row5.components[1].disabled = true
          else if (y == 2) row5.components[2].disabled = true
        }

        let rowPick = [0, 1, 2][Math.floor(Math.random() * 3)]
        let columnPick = [0, 1, 2][Math.floor(Math.random() * 3)]

        while (table[rowPick][columnPick] != fog) {
          rowPick = [0, 1, 2][Math.floor(Math.random() * 3)]
          columnPick = [0, 1, 2][Math.floor(Math.random() * 3)]
        }

        if (rowPick == 0) {
          if (columnPick == 0) row3.components[0].disabled = true
          else if (columnPick == 1) row3.components[1].disabled = true
          else if (columnPick == 2) row3.components[2].disabled = true
        } else if (rowPick == 1) {
          if (columnPick == 0) row4.components[0].disabled = true
          else if (columnPick == 1) row4.components[1].disabled = true
          else if (columnPick == 2) row4.components[2].disabled = true
        } else if (rowPick == 2) {
          if (columnPick == 0) row5.components[0].disabled = true
          else if (columnPick == 1) row5.components[1].disabled = true
          else if (columnPick == 2) row5.components[2].disabled = true
        }

        let [W, E] = wincheckTTT()

        if (W) {
          const txt = (E == '🟩') ? `You Won!!` : ((E) ? `You Lost ...` : `You Tied`)
          if (E == '🟩' || !E) {
            inTTT = false
            test.description += `\n${txt}`
            score += 30
            await menu.edit({ embeds: [test], components: [row1, row2] })
            await sleep(1000)
            test.description = `🎯 Score: **${score}** (+30)` + '\n\n' + mapArray()

            table = [
              [fog, fog, fog],
              [fog, fog, fog],
              [fog, fog, fog]
            ] // reset table for new tictactoe
            row1.components[2].disabled = true
            row3.components[0].disabled = false
            row3.components[1].disabled = false
            row3.components[2].disabled = false
            row4.components[0].disabled = false
            row4.components[1].disabled = false
            row4.components[2].disabled = false
            row5.components[0].disabled = false
            row5.components[1].disabled = false
            row5.components[2].disabled = false // reset components for new tictactoe
            return await menu.edit({ embeds: [test], components: [row1, row2] })
          } else {
            test.description += `\n${txt}`
            runFailed = true
            return collector.stop()
          }
        }

        test.description = updateTTT(rowPick, columnPick, false)

        let [w, e] = wincheckTTT()

        if (w) {
          const txt = (e == '🟩') ? `You Won!!` : ((e) ? `You Lost ...` : `You Tied`)
          if (e == '🟩' || !e) {
            inTTT = false
            test.description += `\n${txt}`
            await menu.edit({ embeds: [test], components: [row1, row2] })
            await sleep(1000)
            test.description = `🎯 Score: **${score}**` + '\n\n' + mapArray()

            table = [
              [fog, fog, fog],
              [fog, fog, fog],
              [fog, fog, fog]
            ] // reset table for new tictactoe
            row1.components[2].disabled = true
            row3.components[0].disabled = false
            row3.components[1].disabled = false
            row3.components[2].disabled = false
            row4.components[0].disabled = false
            row4.components[1].disabled = false
            row4.components[2].disabled = false
            row5.components[0].disabled = false
            row5.components[1].disabled = false
            row5.components[2].disabled = false // reset components for new tictactoe
            return await menu.edit({ embeds: [test], components: [row1, row2] })
          } else {
            test.description += `\n${txt}`
            runFailed = true
            return collector.stop()
          }
        }
        await menu.edit({ embeds: [test], components: [row3, row4, row5] })
      } else if (inQuiz) {
        if (test.fields.length > 0) {
          test.fields = []  // remove the addition field like the "killed a mod with x hp left"
          menu.edit({ embeds: [test] })
        }

        let rightChoise = '', i = 0

        for (const option of randomOptions) {
          i++
          if (option[1]) rightChoise = i
        }

        if (rightChoise == 1) rightChoise = 'A'
        else if (rightChoise == 2) rightChoise = 'B'
        else if (rightChoise == 3) rightChoise = 'C'

        if (id == rightChoise) {
          inQuiz = false
          await menu.edit({ embeds: [test], components: [row1, row2] })
          await sleep(1000)
          score += 30
          test.description = `🎯 Score: **${score}** (+30)` + '\n\n' + mapArray()

          return await menu.edit({ embeds: [test], components: [row1, row2] })
        } else {
          test.setColor('RED')
          runFailed = true
          return collector.stop()
        }
      } else if (id == 'up' || id == 'left' || id == 'right' || id == 'down') {
        location = movePlayer(id, false)
        test.fields = []
        test.description = `🎯 Score: **${score}**` + '\n\n' + mapArray()

      } else if (id == 'attack') {
        const direction = nearEnemy()[1]
        let fightEnded = false

        // START FIGHT 
        let pdmg = Math.floor((5 + pstats.damage) * (1 + (pstats.strength / 100)) * (1 + (combatlvl * 0.04)))

        const crit = isCrit(critchance) //Change Variable for Crit Chance and change way how crit returns
        if (crit) pdmg = Math.floor(pdmg * (1 + pstats.crit_damage / 100))

        php = dmgtaken(php, mdmg) //php = player health, pdmg = playerdmg
        mhp = dmgdealt(mhp, pdmg) //mhp = mob health, mdmg = mod damage

        if (php < 0) php = 0 // Avoid negative health
        if (mhp < 0) mhp = 0 // Avoid negative health

        test.fields = []
        test.addField(`Battle`, `Player Health: ❤️ ${php} (- ${mdmg})
                Mob Health: ❤️ ${mhp} (-${crit ? '<:crit:870306942806020106>' : ''} ${pdmg})`)

        // when still in fight locks movement so he can't get out the fight
        row1.components[1].disabled = true // up arrow
        row2.components[0].disabled = true // left arrow
        row2.components[1].disabled = true // down arrow
        row2.components[2].disabled = true // right arrow


        menu.edit({ embeds: [test], components: [row1, row2] })


        if (mhp <= 0) {
          fightEnded = true
          score += 20
          test.fields = []
          test.addField(`\u200B`, `Killed the Enemy with **❤️ ${php}** left and earned Combat XP`) //Add combat xp var
          await collection.updateOne( //Add Combat XP from enemy Kill (do once mobs decided)
            { _id: interaction.user.id },
            { $inc: { "data.skills.combat": 50 } },
            { upsert: true })

          php = pstats.health //reset player health
          mhp = (Math.random() < 0.5) ? 300 : 200 // reset mob hp for new mob
          mdmg = (Math.random() < 0.5) ? 50 : 25 // reset mob dmg for new mob

          // Unlocks arrows after mob is killed
          row1.components[0].disabled = true
          row1.components[1].disabled = false // up arrow
          row2.components[0].disabled = false // left arrow
          row2.components[1].disabled = false // down arrow
          row2.components[2].disabled = false // right arrow
          menu.edit({ embeds: [test], components: [row1, row2] })

          await sleep(1000) // waiting a second so you can actually read the message
        } else if (php <= 0) {
          test.fields = []
          test.setColor('RED')
          test.addField(`\u200B`, `Died to the Enemy which had **❤️ ${mhp}** left.`)
          runFailed = true
          return collector.stop()
        }
        // FINISH FIGHT

        if (fightEnded) {
          location = movePlayer(direction, true) // replace the mob emoji only after mob is killed
        }
        test.description = `🎯 Score: **${score}** (+20)` + '\n\n' + mapArray()
        menu.edit({ embeds: [test], components: [row1, row2] }) // Components need to get adjusted might be wrong

      } else if (id == 'interact') {
        const direction = nearPuzzle()[1]

        // START PUZZLE
        let puzzle = puzzles[Math.floor(Math.random() * puzzles.length)] // get random puzzle
        if (puzzle == 'ttt') {
          inTTT = true
          const randomPick = [[0, 1, 2][Math.floor(Math.random() * 3)], [0, 1, 2][Math.floor(Math.random() * 3)]]
          const [rowPick, columnPick] = randomPick

          test.setDescription(updateTTT(rowPick, columnPick, false))

          if (rowPick == 0) {
            if (columnPick == 0) row3.components[0].disabled = true
            else if (columnPick == 1) row3.components[1].disabled = true
            else if (columnPick == 2) row3.components[2].disabled = true
          } else if (rowPick == 1) {
            if (columnPick == 0) row4.components[0].disabled = true
            else if (columnPick == 1) row4.components[1].disabled = true
            else if (columnPick == 2) row4.components[2].disabled = true
          } else if (rowPick == 2) {
            if (columnPick == 0) row5.components[0].disabled = true
            else if (columnPick == 1) row5.components[1].disabled = true
            else if (columnPick == 2) row5.components[2].disabled = true
          }

          await menu.edit({ embeds: [test], components: [row3, row4, row5] })
        } else if (puzzle == 'quiz') {
          inQuiz = true

          quiz = quizzes[Math.floor(Math.random() * quizzes.length)] // Gets random quiz
          console.log(quiz)
          randomOptions = shuffle(quiz.options) // Shuffle the asnwers

          let answers = '', index = 0

          for (const option of randomOptions) { // Create the randomized asnwers messsage
            const [choise, correct] = option // Example: [ choise = 10, correct = false ]
            index++
            if (index == 1) answers += `A) ${choise}\n`
            else if (index == 2) answers += `B) ${choise}\n`
            else if (index == 3) answers += `C) ${choise}`
          }

          test.addField(quiz.question, answers, false)
          await menu.edit({ embeds: [test], components: [row6] })
        }

        location = movePlayer(direction, true) // replace the mob emoji only after mob is killed
        if (!inTTT && !inQuiz) test.description = `🎯 Score: **${score}**` + '\n\n' + mapArray()
      } else if (id == 'cancel') {
        runCancelled = true
        collector.stop()
      }

      // If puzzle is near, interact button activates
      row1.components[2].disabled = nearPuzzle()[0] ? false : true
      // If enemy is near, fight button activates
      row1.components[0].disabled = nearEnemy()[0] ? false : true

      if (!inTTT && !inQuiz) return menu.edit({ embeds: [test], components: [row1, row2] })
    })
    collector.on('end', async collected => {
      test.fields = []
      if (runFailed) {
        test.addField('Dungeon Run Over', '**Reason**\n* Failed Puzzle\n* Died to Mob')
      } else if (runCancelled) {
        test.addField('Dungeon Run Over', '**Reason**\n* Timed out\n* Cancelled')
      }
      test.setColor('RED')
      await menu.edit({ embeds: [test], components: [] })
      await collection.updateOne(
        { _id: interaction.user.id },
        { $set: { "data.misc.in_dungeon": false } },
        { upsert: true }
      )
    })
  }
}