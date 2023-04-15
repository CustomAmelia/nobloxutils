const readline = require('readline');
const noblox = require('noblox.js');
const cookie = require('./cookie.json');
const path = require('path');
const chalk = require('chalk');
const {
	url
} = require('inspector');
const utilsPath = path.join(__dirname, 'utils');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true
});

function startApp() {

	const asciiArt =
		"  _   _  ____  ____  _      ______   __  _    _ _______ _____ _       _____ \n" +
		" | \\ | |/ __ \\|  _ \\| |    / __ \\ \\ / / | |  | |__   __|_   _| |     / ____|\n" +
		" |  \\| | |  | | |_) | |   | |  | \\ V /  | |  | |  | |    | | | |    | (___  \n" +
		" | . ` | |  | |  _ <| |   | |  | |> <   | |  | |  | |    | | | |     \\___ \\ \n" +
		" | |\\  | |__| | |_) | |___| |__| / . \\  | |__| |  | |   _| |_| |____ ____) |\n" +
		" |_| \\_|\\____/|____/|______\\____/_/ \\_\\  \\____/   |_|  |_____|______|_____/ \n";

	console.log(chalk.red(asciiArt));

	const selectaction = "Select an action:"
	console.log(chalk.green(selectaction));
	const groupdetails = "1. Get Group Details"
	console.log(chalk.green(groupdetails));
	const getcollectibles = "2. Get Collectibles"
	console.log(chalk.green(getcollectibles));
	const getfriends = "3. Get Friends"
	console.log(chalk.green(getfriends));
	const declinefriends = "4. Decline Friend Requests"
	console.log(chalk.green(declinefriends));

	const action = 'Enter the number of the action you want to perform: '
	rl.question(chalk.gray(action), (answer) => {
		switch (answer) {
			case '1':
				let question1 = 'Enter the group ID: '
				rl.question(chalk.gray(question1), (groupId) => {
					const getGroupDetails = require(path.join(utilsPath, 'getgroup.js'));
					getGroupDetails(groupId)
						.then(() => {
							setTimeout(function() {
								rl.close();
							}, 6000);
						})
						.catch((err) => {
							console.error("Unexpected Error Occured. Is the Group ID Valid?");
							rl.close();
						});
				});
				break;
			default:
				console.log('Invalid option selected.');
				rl.close();
				break;
			case '2':
				let question2 = 'Enter ID: ';
				rl.question(chalk.gray(question2), (userid) => {
					let question3 = 'Enter Limit (default 20): '; // Add another question for the limit
					rl.question(chalk.gray(question3), (limit) => { // Get the limit from the user input
						limit = limit || 20; // If the user does not provide a limit, use 10 as the default value
						const getCollectibles = require(path.join(utilsPath, 'getcollectibles.js'));
						getCollectibles(userid, limit) // Pass the limit to the function
							.then(() => {
								setTimeout(function() {
									rl.close();
								}, 6000);
							})
							.catch((err) => {
								console.error("Unexpected Error Occured. Is the User ID Valid?");
							})
					});
				});
				break;
			case '3':
				let question3 = 'Enter ID: '
				rl.question(chalk.gray(question3), (userid) => {
					const getFriends = require(path.join(utilsPath, 'getfriends.js'));
					getFriends(userid)
						.then(() => {
							setTimeout(function() {
								rl.close();
							}, 6000);
						})
						.catch((err) => {
							console.error("Unexpected Error Occured. Is the User ID Valid?");
							rl.close();
						})
				})
				break;
			case '4':
				const response = "Successfully Declined All Requests"
				noblox.declineAllFriendRequests()
					.then(() => {
						setTimeout(function() {
							rl.close();
						}, 6000);
					})
					.catch((err) => {
						console.error("Couldn't Complete Request. No Friend Requests To Decline?");
						rl.close();
					})
				console.log(chalk.green(response))
		}
	});
}

noblox.setCookie(cookie.cookie)
	.then((currentUser) => {
		let login = `Logged in as ${currentUser.UserName} [${currentUser.UserID}]`
		console.log(chalk.red(login));
		startApp();
	})
	.catch((err) => {
		console.error(err);
		rl.close();
	});