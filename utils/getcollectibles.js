/* const noblox = require('noblox.js');

async function getCollectibles(userid, limit) {
  let collectibles = await noblox.getCollectibles({
    userId: userid,
    sortOrder: "Asc",
    limit: limit
  });
  
  // Map the collectibles to an array of strings with name and price concatenated
  let namesWithPrices = collectibles.map((collectible) => `${collectible.name}, ${collectible.recentAveragePrice}`);

  // Concatenate the strings into a single string separated by commas
  let namesWithPricesString = namesWithPrices.join(", ");

  console.log(namesWithPricesString);
}

module.exports = getCollectibles; */

const noblox = require('noblox.js');
const chalk = require('chalk');

async function getCollectibles(userid, limit) {
  let collectibles = await noblox.getCollectibles({
    userId: userid,
    sortOrder: "Asc",
    limit: limit
  });
  
  // Map the collectibles to an array of objects with name, price, and color properties
  let collectiblesWithColors = collectibles.map((collectible) => {
    let price = collectible.recentAveragePrice;
    let color;
    if (price > 1000) {
      color = chalk.green;
    } else if (price > 500) {
      color = chalk.yellow;
    } else {
      color = chalk.red;
    }
    return {
      name: collectible.name,
      price: price,
      color: color
    };
  });

  // Sort the collectibles by high to low
  collectiblesWithColors.sort((a, b) => b.price - a.price);

  // Log the collectibles to the console with different colors based on their price
  collectiblesWithColors.forEach((collectible) => {
    console.log(collectible.color(`${collectible.name}, ${collectible.price}`));
  });
}

module.exports = getCollectibles;
