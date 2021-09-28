const LootTable = require('../Functions/LootTable.js')

const blazing2 = new LootTable()

blazing2.addItem('Magma Cream', 40, false)
blazing2.addItem('Bone', 40, false)
blazing2.addItem('Coal', 40, false)
blazing2.addItem('Enchanted Magma Cream', 2, true)
blazing2.addItem('Enchanted Bone', 2, true)
blazing2.addItem('Enchanted Coal', 2, true)

module.exports = blazing2