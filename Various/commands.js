const data = [
  {
    name: 'info',
    description: 'Shows Info about the Bot'
  },
  {
    name: 'commandlist',
    description: 'Shows a list of Valid Slash Commands'
  },
  {
    name: 'invite',
    description: 'Shows the Bots Invite and Support Server',
  },
  {
    name: 'ping',
    description: 'Shows the Bot\'s Ping',
  },
  {
    name: 'vote',
    description: 'Shows the Bots Vote Site',
  },
  {
    name: 'serverinfo',
    description: 'Shows Info about the server',
  },
  {
    name: 'userinfo',
    description: 'Shows the Info about a User',
    options: [
      {
        name: 'user',
        description: 'Discord User',
        type: 'USER',
        required: true,
      },
    ],
  },
  //Skyblock Features
  {
    name: 'bazaar',
    description: 'Gets Bazaar Data from an Item',
    options: [
      {
        name: 'item',
        description: 'Item Name',
        type: 'STRING',
        required: true,
      },
    ],
  },
  {
    name: 'dungeons',
    description: 'Gets Dungeons Data from a Player',
    options: [
      {
        name: 'ign',
        description: 'Minecraft Name',
        type: 'STRING',
        required: true,
      },
    ],
  },
  {
    name: 'hypixel',
    description: 'Gets Hypixel Data from a Player',
    options: [
      {
        name: 'ign',
        description: 'Minecraft Name',
        type: 'STRING',
        required: true,
      },
    ],
  },
  {
    name: 'skyblockplayers',
    description: 'Shows the Current Online Skyblock Players',
  },
  {
    name: 'scammer',
    description: 'Checks if a Player is a Scammer',
    options: [
      {
        name: 'ign',
        description: 'Minecraft Name',
        type: 'STRING',
        required: true,
      },
    ],
  },
  {
    name: 'skills',
    description: 'Gets Skill Data from a Player',
    options: [
      {
        name: 'ign',
        description: 'Minecraft Name',
        type: 'STRING',
        required: true,
      },
    ],
  },
  {
    name: 'slayer',
    description: 'Gets Slayer Data from a Player',
    options: [
      {
        name: 'ign',
        description: 'Minecraft Name',
        type: 'STRING',
        required: true,
      },
    ],
  },
  {
    name: 'stats',
    description: 'Gets Overall Data from a Player',
    options: [
      {
        name: 'ign',
        description: 'Minecraft Name',
        type: 'STRING',
        required: true,
      },
    ],
  },
  {
    name: 'weight',
    description: 'Gets Weight Data from a Player',
    options: [
      {
        name: 'ign',
        description: 'Minecraft Name',
        type: 'STRING',
        required: true,
      },
    ],
  },
  {
    name: 'networth',
    description: 'Calculates the Player Networth',
    options: [
      {
        name: 'name',
        description: 'Player IGN',
        type: 'STRING',
        required: true,
      },
    ],
  },
  //Skyblock Simulator Commands
  {
    name: 'sb',
    description: 'Skyblock Simulator Commands',
    type: 'SUB_COMMAND_GROUP',
    options: [
      {
        name: 'dragon',
        description: 'Lets you place Summoning Eye to fight Dragons',
        type: 'SUB_COMMAND',
      },
      {
        name: 'farm',
        description: 'Lets you farm Mobs for Combat XP and Items',
        type: 'SUB_COMMAND',
      },
      {
        name: 'info',
        description: 'Shows information about yourself or a mentioned User',
        type: 'SUB_COMMAND',
        options: [
          {
            name: 'user',
            description: 'Discord User',
            type: 'USER',
          },
        ],
      },
      {
        name: 'sell',
        description: 'Sell your farmed Items for Coins',
        type: 'SUB_COMMAND',
        options: [
          {
            name: 'item',
            description: 'Item to Sell',
            type: 'STRING',
            required: true,
          },
          {
            name: 'amount',
            description: 'Amount of said Item to sell',
            type: 'INTEGER',
            required: true,
          },
        ],
      },
      {
        name: 'settings',
        description: 'Allows you to toggle Settings ON/OFF',
        type: 'SUB_COMMAND',
        options: [
          {
            name: 'choice',
            description: 'Allow you to toggle Settings ON/OFF',
            type: 'STRING',
            required: true,
            choices: [
              {
                name: 'imgshown',
                value: 'imgshown',
              },
            ],
          },
        ],
      },
      {
        name: 'slayer',
        description: 'Lets you kill Slayer Bosses',
        type: 'SUB_COMMAND',
      },
      {
        name: 'start',
        description: 'Creates your Skyblock Simulator Profile',
        type: 'SUB_COMMAND',
      },
      {
        name: 'warp',
        description: 'Allows you to warp to different Areas of the Game',
        type: 'SUB_COMMAND'
      },
      {
        name: 'fishing',
        description: 'Opens a Pond and lets you fish',
        type: 'SUB_COMMAND'
      },
      {
        name: 'dungeons',
        description: 'Allows you to create a Dungeon Run',
        type: 'SUB_COMMAND'
      },
      {
        name: 'shop',
        description: 'Allows you to buy Upgrades',
        type: 'SUB_COMMAND',
      },
      {
        name: 'class',
        description: 'Lets you select a different Dungeon Class',
        type: 'SUB_COMMAND',
        options: [
          {
            name: 'choice',
            description: 'Available Classes',
            type: 'STRING',
            choices: [
              {
                name: 'Assassin',
                value: 'Assassin',
              },
              {
                name: 'Berserker',
                value: 'Berserker',
              },
              {
                name: 'Tank',
                value: 'Tank'
              }],
          }],
      },
      {
        name: 'daily',
        description: 'Allows you to claim your Daily Reward',
        type: 'SUB_COMMAND',
      },
    ],
  },
]

module.exports.data = data