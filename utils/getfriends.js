const noblox = require('noblox.js');

async function getfriends(userid) {
    let Friends = await noblox.getFriends({userId: userid})
    console.log(Friends)
}

module.exports = getfriends;