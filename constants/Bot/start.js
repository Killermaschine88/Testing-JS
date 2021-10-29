let CronJob = require('cron').CronJob;
let Discord = require('discord.js')

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

  //Event Embeds
  const mfonembed = new Discord.MessageEmbed()
  .setTitle('🍀 Magic Find Event Enabled')
  .setDescription('All Users now have **+15 Magic Find** for the **next 2 Hours.**')
  .setColor('GREEN')
  .setFooter('Skyblock Simulator Events')

  const mfoffembed = new Discord.MessageEmbed()
  .setTitle('🍀 Magic Find Event Disabled')
  .setDescription('The extra Magic Find have been removed again.')  
  .setFooter('Skyblock Simulator Events')
  

  //Event Jobs
  const mfon = new CronJob('0 16 * * *', async function() {
    let next_eventtime = (Date.now() / 1000).toFixed(0) + (14*60*60)
    let event_endtime = next_eventtime + (2*60*60)
	  collection2.updateOne(
      { _id: 'magic_find'},
      { $set: { enabled: true, next_event: next_eventtime, end_event: event_endtime} },
      { upsert: true }
    )

      client.channels.fetch('871669216703578152')
        .then(channel => channel.send({embeds: [mfonembed]}))
        .catch(console.error)
  }, null, true, 'Europe/Rome');

  const mfon2 = new CronJob('0 6 * * *', async function() {
    let next_eventtime = (Date.now() / 1000).toFixed(0) + (10*60*60)
    let event_endtime = next_eventtime + (2*60*60)
	  collection2.updateOne(
      { _id: 'magic_find'},
      { $set: { enabled: true, next_event: next_eventtime, end_event: event_endtime } },
      { upsert: true}
    )

      client.channels.fetch('871669216703578152')
        .then(channel => channel.send({embeds: [mfonembed]}))
        .catch(console.error)
  }, null, true, 'Europe/Rome');

  const mfoff = new CronJob('0 18 * * *', async function() {
    
	  collection2.updateOne(
      { _id: 'magic_find'},
      { $set: { enabled: false } },
      { upsert: true })

      client.channels.fetch('871669216703578152')
        .then(channel => channel.send({embeds: [mfoffembed]}))
        .catch(console.error)
  }, null, true, 'Europe/Rome');

  const mfoff2 = new CronJob('0 8 * * *', async function() {
    
	  collection2.updateOne(
      { _id: 'magic_find'},
      { $set: { enabled: false } })

      client.channels.fetch('871669216703578152')
        .then(channel => channel.send({embeds: [mfoffembed]}))
        .catch(console.error)
  }, null, true, 'Europe/Rome');

  //Starting Events
  mfon.start(); //Magic Find Enable (Evening)
  mfoff.start() //Magic find Disable (Evrning)
  mfon2.start() //Magic Find Enable (Morning)
  mfoff2.start() //Magic Find Disableb(Morning)

  //Check if Events Running
  console.log(`Magic Find event running? Enable: ${mfon.running} ${mfon2.running}, Disable: ${mfoff.running} ${mfoff2.running}`);  
}

module.exports = start;