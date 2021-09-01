const LootTable = require('../../LootTable.js')

const gold = new LootTable()

gold.addItem('4000', 66, false)
gold.addItem('6000', 66, false)
gold.addItem('10000', 66, false)
gold.addItem('Recombobulator 3000', 1, true)


module.exports = gold