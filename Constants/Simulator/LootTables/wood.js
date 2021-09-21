const LootTable = require('../Functions/LootTable.js')

const wood = new LootTable()

wood.addItem('2500', 33, false)
wood.addItem('5000', 33, false)
wood.addItem('10000', 33, false)
wood.addItem('Dreadlord Sword', 1, true)


module.exports = wood