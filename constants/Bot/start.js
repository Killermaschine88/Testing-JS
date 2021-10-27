let CronJob = require('cron').CronJob;

async function start(client, mclient) {
  //Player Collection
  const collection = mclient.db('SkyblockSim').collection('Players');

  //Blocked Channel Collection
  const collection1 = mclient.db('SkyblockSim').collection('blockedchannels');

  //Event Collection
  const collection2 = mclient.db('SkyblockSim').collection('events');

  //Updating the Fishing/Mining/Dungeon
   collection.updateMany(
      {},
      { $set: { "data.misc.is_fishing": false, "data.misc.is_mining": false, "data.misc.in_dungeon": false } })
      
  //Updating blocked channels
  collection1.updateMany({}, {$set: {blocked: false}}) 

  //Events
  const mfon = new CronJob('0 16 * * *', async function() {
	  collection2.updateOne(
      { _id: 'magic_find'},
      { $set: { enabled: true } })

      client.channels.fetch('871669216703578152')
        .then(channel => channel.send(`Magic Find Event enabled.`))
        .catch(console.error)
  }, null, true, 'Europe/Rome');

  const mfoff = new CronJob('0 18 * * *', async function() {
	  collection2.updateOne(
      { _id: 'magic_find'},
      { $set: { enabled: false } })

      client.channels.fetch('871669216703578152')
        .then(channel => channel.send(`Magic Find Event disabled.`))
        .catch(console.error)
  }, null, true, 'Europe/Rome');

  //Starting Events
  mfon.start(); //Magic Find Enable
  mfoff.start() //Magic find Disable

  //Check if Events Running
  console.log(`Magic Find event running? Enable: ${mfon.running}, Disable: ${mfoff.running}`);  
}

module.exports = start;