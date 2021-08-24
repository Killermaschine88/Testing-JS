const LootTable = require('../../LootTable.js')

const gold = new LootTable()

gold.addItem('4000 Coins', 33, false)
gold.addItem('6000 Coins', 33, false)
gold.addItem('12000 Coins', 33, false)
gold.addItem('Recombobulator', 1, true)


module.exports = gold