const noblox = require('noblox.js');

async function getOutfits(userid) {
	const Outfits = await noblox.outfits(userid);
	console.log(Outfits);
}

module.exports = getOutfits;