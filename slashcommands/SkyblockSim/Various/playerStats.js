function playerStats(player, type) {

  //Base Variables
  let stats = player.data.stats
  let inv = ''

  //Base Stats
  let health = stats.health
  let defense = stats.defense
  let damage = stats.damage
  let strength = stats.strength
  let crit_chance = stats.crit_chance
  let crit_damage = stats.crit_damage
  let magic_find = stats.magic_find
  let sea_creature_chance = stats.sea_creature_chance
  

  //Combat Stats
  if(type = 'combat') {
  inv = player.data.equipment.combat

  
  health += inv.armor.health

  defense += inv.armor.defense

  damage += inv.sword.damage

  strength += inv.sword.strength + inv.armor.strength

  crit_chance += inv.sword.crit_chance + inv.armor.crit_chance

  crit_damage += inv.sword.crit_damage + inv.armor.crit_damage  
  }

  return {
    health,
    defense,
    damage,
    strength,
    crit_chance,
    crit_damage,
    magic_find,
    sea_creature_chance
  }
}

module.exports = playerStats