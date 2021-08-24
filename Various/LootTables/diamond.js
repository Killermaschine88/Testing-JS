const LootTable = require('../../LootTable.js')

const diamond = new LootTable()

diamond.addItem('5000 Coins', 33, false)
diamond.addItem('7500 Coins', 33, false)
diamond.addItem('15000 Coins', 33, false)
diamond.addItem('Recombobulator', 1, true)


module.exports = diamond