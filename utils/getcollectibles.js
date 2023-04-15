const noblox = require('noblox.js');

async function getCollectibles(userid, limit) {
	let collectibles = await noblox.getCollectibles({
		userId: userid,
		sortOrder: "Asc",
		limit: limit
	})
	console.log(collectibles)
}

module.exports = getCollectibles;