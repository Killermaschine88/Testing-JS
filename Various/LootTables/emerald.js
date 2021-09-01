const LootTable = require('../../LootTable.js')

const emerald = new LootTable()

emerald.addItem('10000 Coins', 33, false)
emerald.addItem('12000 Coins', 33, false)
emerald.addItem('15000 Coins', 33, false)
emerald.addItem('Recombobulator 3000', 1, true)


module.exports = emerald