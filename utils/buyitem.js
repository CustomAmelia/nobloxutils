const noblox = require('noblox.js');

async function buyItem(productid) {
  try {
    await noblox.buy(productid);
    console.log('Bought!')
  } catch (error) {
    if (error.message === "This transaction could not be completed as the item is no longer on sale. No Robux have been removed from your account.") {
      console.log("Could not buy, do you have enough robux and is the item on sale?");
    } else {
      console.log("An error occurred while buying the item:", error.message);
    }
  }
}

module.exports = buyItem;