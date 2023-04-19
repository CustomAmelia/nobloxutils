const readline = require("readline");
const noblox = require("noblox.js");
const cookie = require("./cookie.json");
const path = require("path");
const chalk = require("chalk");

const utilsPath = path.join(__dirname, "utils");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true
});

function startApp() {
	console.log(chalk.red(`  _   _  ____  ____  _      ______   __  _    _ _______ _____ _       _____ 
 | \\ | |/ __ \\|  _ \\| |    / __ \\ \\ / / | |  | |__   __|_   _| |     / ____|
 |  \\| | |  | | |_) | |   | |  | \\ V /  | |  | |  | |    | | | |    | (___  
 | . \` | |  | |  _ <| |   | |  | |> <   | |  | |  | |    | | | |     \\___ \\ 
 | |\\  | |__| | |_) | |___| |__| / . \\  | |__| |  | |   _| |_| |____ ____) |
 |_| \\_|\\____/|____/|______\\____/_/ \\_\\  \\____/   |_|  |_____|______|_____/ `));
	console.log(chalk.green("Select an action:"));
	console.log(chalk.green("1. Get Group Details"));
	console.log(chalk.green("2. Get Collectibles"));
	console.log(chalk.green("3. Get Friends"));
	console.log(chalk.green("4. Decline Friend Requests"));
	console.log(chalk.green("5. Get Outfits"));
	console.log(chalk.green("6. Get Outfit Details"));
	console.log(chalk.green("7. Get Product Image"));

	rl.question(chalk.gray("Enter the number of the action you want to perform: "), async (input) => {
		switch (input) {
			case "1":
				const groupId = await askQuestion("Enter the group ID: ");
				try {
					await require(path.join(utilsPath, "getgroup.js"))(groupId);
					await askQuestion("Press Enter to go back to the menu.");
				} catch (error) {
					console.error("Unexpected Error Occurred. Is the Group ID Valid?");
					rl.close();
				}
				break;
			case "2":
				const userId = await askQuestion("Enter ID: ");
				const limit = await askQuestion("Enter Limit (default 20): ") || 20;
				try {
					await require(path.join(utilsPath, "getcollectibles.js"))(userId, limit);
					await askQuestion("Press Enter to go back to the menu.");
				} catch (error) {
					console.error("Unexpected Error Occurred. Is the User ID Valid?");
				}
				break;
			case "3":
				const friendId = await askQuestion("Enter ID: ");
				try {
					await require(path.join(utilsPath, "getfriends.js"))(friendId);
					await askQuestion("Press Enter to go back to the menu.");
				} catch (error) {
					console.error("Unexpected Error Occurred. Is the User ID Valid?");
					rl.close();
				}
				break;
			case "4":
				const declineMsg = "Successfully Declined All Requests";
				try {
					console.log(chalk.green(declineMsg));
					await noblox.declineAllFriendRequests();
					await askQuestion("Press Enter to go back to the menu.");
				} catch (error) {
					console.error("Unexpected Error Occurred. Unable to Decline Friend Requests.");
					rl.close();
				}
				break;
			case "5":
				const outfitId = await askQuestion("Enter the user ID to get outfits: ");
				try {
					await require(path.join(utilsPath, "getoutfits.js"))(outfitId);
					await askQuestion("Press Enter to go back to the menu.");
				} catch (error) {
					console.error("Unexpected Error Occurred. Is the User ID Valid?");
					rl.close();
				}
				break;
			case "6":
				const outfitDetailsId = await askQuestion("Enter the outfit ID to get details: ");
				try {
					await require(path.join(utilsPath, "getoutfitdetails.js"))(outfitDetailsId);
					await askQuestion("Press Enter to go back to the menu.");
				} catch (error) {
					console.error("Unexpected Error Occurred. Is the Outfit ID Valid?");
					rl.close();
				}
				break;
			case "7":
				const productId = await askQuestion("Enter the product ID: ");
				const size = await askQuestion("Enter the size (default 420x420): ") || "420x420";
				try {
					await require(path.join(utilsPath, "getproductimage.js"))(productId, size);
					await askQuestion("Press Enter to go back to the menu.");
				} catch (error) {
					console.error("Unexpected Error Occurred. Is the Product ID Valid?");
					rl.close();
				}
				break;
			default:
				console.log(chalk.red("Invalid Input! Please enter a valid input."));
				await startApp();
				break;
		}
	});
}

async function askQuestion(question) {
	return new Promise((resolve) => {
		rl.question(chalk.gray(question), (answer) => {
			resolve(answer);
		});
	});
}

async function login() {
	try {
		await noblox.setCookie(cookie.cookie);
		const currentUser = await noblox.getCurrentUser();
		console.log(chalk.green(`Logged in as ${currentUser.username}`));
		await startApp();
	} catch (error) {
		console.error("Unexpected Error Occurred. Unable to log in.");
		rl.close();
	}
}

login();