const data = [
  {
    name: "info",
    description: "Shows Info about the Bot"
  },
  {
    name: "invite",
    description: "Shows the Bots Invite and Support Server",
  },
  {
    name: "ping",
    description: "Shows the Bot's Ping",
  },
  {
    name: "vote",
    description: "Shows the Bots Vote Site",
  },
  {
    name: "avatar",
    description: "Shows the Users Avatar",
    options: [
      {
        name: 'user',
        description: 'Select a user',
        type: 'USER',
      },
    ],
  },
  {
    name: "bean",
    description: "Beans a User",
    options: [
      {
        name: 'user',
        description: 'Select a user',
        type: 'USER',
        required: true,
      },
    ],
  },
  {
    name: "hewwo",
    description: "Hewoo's a User",
  },
  {
    name: "skin",
    description: "Shows the Skin of a Player",
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
    name: "serverinfo",
    description: "Shows Info about the server",
  },
  {
    name: "userinfo",
    description: "Shows the Info about a User",
    options: [
      {
        name: 'user',
        description: 'Discord User',
        type: 'USER',
        required: true,
      },
    ],
  },
  {
    name: "slowmode",
    description: "Sets the Channel Slowmode",
    options: [
      {
        name: 'seconds',
        description: 'Slowmode in Seconds',
        type: 'NUMBER',
        required: true,
      },
    ],
  },

  {
    name: "bazaar",
    description: "Gets Bazaar Data from an Item",
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
    name: "dungeons",
    description: "Gets Dungeons Data from a Player",
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
    name: "hypixel",
    description: "Gets Hypixel Data from a Player",
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
    name: "sbplayers",
    description: "Shows the Current Online Skyblock Players",
  },
  {
    name: "scammer",
    description: "Checks if a Player is a Scammer",
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
    name: "skills",
    description: "Gets Skill Data from a Player",
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
    name: "slayer",
    description: "Gets Slayer Data from a Player",
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
    name: "stats",
    description: "Gets Overall Data from a Player",
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
    name: "weight",
    description: "Gets Weight Data from a Player",
    options: [
      {
        name: 'ign',
        description: 'Minecraft Name',
        type: 'STRING',
        required: true,
      },
    ],
  },
]

module.exports.data = data