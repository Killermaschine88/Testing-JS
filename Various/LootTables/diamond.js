const LootTable = require('../../LootTable.js')

const diamond = new LootTable()

diamond.addItem('5000', 33, false)
diamond.addItem('7500', 33, false)
diamond.addItem('15000', 33, false)
diamond.addItem('Recombobulator 3000', 1, true)


module.exports = diamond