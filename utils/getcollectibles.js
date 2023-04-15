const noblox = require('noblox.js');

async function getCollectibles(userid) {
    let collectibles = await noblox.getCollectibles({userId: userid, sortOrder: "Asc", limit: 100})
    console.log(collectibles)
}

module.exports = getCollectibles;