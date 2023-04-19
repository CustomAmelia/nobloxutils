const noblox = require('noblox.js');

async function getOutfitDetails(outfitid) {
	const OutfitDetails = await noblox.outfitDetails(outfitid);
	const assetNames = OutfitDetails.assets.map((asset) => asset.name);
	console.log(assetNames);
}

module.exports = getOutfitDetails;