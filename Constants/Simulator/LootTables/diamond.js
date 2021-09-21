const LootTable = require('../../LootTable.js')

const diamond = new LootTable()

diamond.addItem('5000', 50, false)
diamond.addItem('7500', 50, false)
diamond.addItem('15000', 50, false)
diamond.addItem('Recombobulator 3000', 1, true)
diamond.addItem('Skeletor Armor', 4, true)
diamond.addItem('Adaptive Armor', 1, true)
diamond.addItem('Adaptive Blade', 2, true)


module.exports = diamond