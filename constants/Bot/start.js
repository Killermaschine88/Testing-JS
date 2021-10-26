async function start(mclient) {
  //Player Collection
  const collection = mclient.db('SkyblockSim').collection('Players');

  //Blocked Channel Collection
  const collection1 = mclient.db('SkyblockSim').collection('blockedchannels');

  //Updating the Fishing/Mining/Dungeon
   collection.updateMany(
      {},
      { $set: { "data.misc.is_fishing": false, "data.misc.is_mining": false, "data.misc.in_dungeon": false } })
      


  //Updating blocked channels
  collection1.updateMany({}, {$set: {blocked: false}}) 





  
}

module.exports = start;