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
        name: 'input',
        description: 'Mineecraft Name',
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
    description: "Shows the Info about the User",
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
]

module.exports.data = data