const LootTable = require('../../LootTable.js')

const blazing1 = new LootTable()

blazing1.addItem('Gold Nugget', 40, false)
blazing1.addItem('Gold Ingot', 30, false)
blazing1.addItem('Blaze Rod', 30, false)
blazing1.addItem('Enchanted Gold Ingot', 2, true)
blazing1.addItem('Enchanted Blaze Rod', 2, true)

module.exports = blazing1