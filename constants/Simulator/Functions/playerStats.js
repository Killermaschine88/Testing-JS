const level = require('./skilllvl.js')

function playerStats(player) {

  //Base Variables
  let stats = player.data.stats
  let cookie = player.data.misc.booster_cookie.active
  let inv = ''
  let inv2 = ''
  let inv3 = ''

  //Skill Levels
  let farminglvl = level(player.data.skills.farming).level
  let fishinglvl = level(player.data.skills.fishing).level
  let mininglvl = level(player.data.skills.mining).level
  let combatlvl = level(player.data.skills.combat).level
  let foraginglvl = level(player.data.skills.foraging).level
  let dunglvl = level(player.data.dungeons.xp).level

  //Base Stats
  let health = stats.health
  let defense = stats.defense
  let damage = stats.damage
  let strength = stats.strength
  let crit_chance = stats.crit_chance
  let crit_damage = stats.crit_damage
  let magic_find = stats.magic_find
  let sea_creature_chance = stats.sea_creature_chance
  let mining_speed = stats.mining_speed


    inv = player.data.equipment.combat
    inv2 = player.data.equipment.fishing
    inv3 = player.data.equipment.mining


    health += inv.armor.health + (farminglvl * 2) + (fishinglvl * 2) + (dunglvl * 3)

    defense += inv.armor.defense + (mininglvl * 2)

    damage += inv.sword.damage

    strength += inv.sword.strength + inv.armor.strength + (foraginglvl * 2)

    crit_chance += inv.sword.crit_chance + inv.armor.crit_chance + (combatlvl / 2)

    crit_damage += inv.sword.crit_damage + inv.armor.crit_damage

    sea_creature_chance += inv2.rod.sea_creature_chance + (fishinglvl / 2) + inv.armor.sea_creature_chance

    mining_speed += mininglvl + inv3.pickaxe.mining_speed

  //Add Booster Cookie Stats
  if (cookie == true) {
    health = Math.floor(health * 1.1)
    defense = Math.floor(defense * 1.1)
    damage = Math.floor(damage * 1.1)
    strength = Math.floor(strength * 1.1)
    crit_chance = Math.floor(crit_chance * 1.1)
    crit_damage = Math.floor(crit_damage * 1.1)
    magic_find += 10
    magic_find = Math.floor(magic_find * 1.1)
    sea_creature_chance = Math.floor(sea_creature_chance * 1.1)
    mining_speed = Math.floor(mining_speed * 1.1)
  }

  health = Math.floor(health * (1 + defense / 100))

  return {
    health,
    defense,
    damage,
    strength,
    crit_chance,
    crit_damage,
    magic_find,
    sea_creature_chance,
    mining_speed
  }
}

module.exports = playerStats