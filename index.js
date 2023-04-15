const readline = require('readline');
const noblox = require('noblox.js');
const cookie = require('./cookie.json');
const path = require('path');
const { url } = require('inspector');
const utilsPath = path.join(__dirname, 'utils');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startApp() {
  console.log('Select an action:');
  console.log('1. Get Group Details');
  console.log('2. Get Collectibles');
  console.log('3. Get Friends');
  

  rl.question('Enter the number of the action you want to perform: ', (answer) => {
    switch (answer) {
      case '1':
        rl.question('Enter the group ID: ', (groupId) => {
          const getGroupDetails = require(path.join(utilsPath, 'getgroup.js'));
          getGroupDetails(groupId)
            .then(() => rl.close())
            .catch((err) => {
              console.error(err);
              rl.close();
            });
        });
        break;
        default:
          console.log('Invalid option selected.');
          rl.close();
          break;
        case '2':
                rl.question('Enter ID: ', (userid) => {
                    const getCollectibles = require(path.join(utilsPath, 'getcollectibles.js'));
                    getCollectibles(userid)
                    .then(() => rl.close())
                    .catch((err) => {
                        console.error("Unexpected Error Occured. Is the User ID Valid?");
                        rl.close();
                });
        });
        break;
        case '3':
            rl.question('Enter ID: ', (userid) => {
                const getFriends = require(path.join(utilsPath, 'getfriends.js'));
                getFriends(userid)
                .then(() => rl.close())
                .catch((err) => {
                    console.error("Unexpected Error Occured. Is the User ID Valid?");
                    rl.close();
                })
            })
        }
  });
}

noblox.setCookie(cookie.cookie)
  .then((currentUser) => {
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`);
    startApp();
  })
  .catch((err) => {
    console.error(err);
    rl.close();
  });
