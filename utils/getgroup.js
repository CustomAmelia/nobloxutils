const noblox = require('noblox.js');

async function getGroupDetails(groupId) {
  const groupInfo = await noblox.getGroup(groupId);
  console.log(groupInfo);
}

module.exports = getGroupDetails;