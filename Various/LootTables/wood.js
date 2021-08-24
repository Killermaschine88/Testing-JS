const LootTable = require('../../LootTable.js')

const wood = new LootTable()

wood.addItem('2500 Coins', 33, false)
wood.addItem('5000 Coins', 33, false)
wood.addItem('10000 Coins', 33, false)
wood.addItem('Recombobulator', 1, true)


module.exports = wood