const LootTable = require('../../LootTable.js')

const zombie = new LootTable()

zombie.addItem('Rotten Flesh', 80, false)
zombie.addItem('Carrot', 10, true)
zombie.addItem('Potatoe', 10, true)

module.exports = zombie