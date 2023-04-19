const noblox = require('noblox.js');
const {
	exec
} = require('child_process');

async function openUrl(url) {
	const command = process.platform === 'win32' ? 'start' : 'open';
	await exec(`${command} ${url}`);
}

async function getProductImage(productid) {
	const playerThumbnails = await noblox.getThumbnails([{
		type: "Asset",
		token: "270FF19ECB1AFCF25383A6F37C6AD307",
		format: "png",
		size: "420x420",
		targetId: productid
	}]);

	const url = playerThumbnails[0].imageUrl;

	openUrl(url)
}



module.exports = getProductImage;