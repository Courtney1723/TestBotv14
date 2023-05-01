const { Client, GatewayIntentBits, Collection, Partials, EmbedBuilder, PermissionsBitField } = require('discord.js');
global.client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
const { exec } = require('node:child_process');
const keepAlive = require('./server');
var cron = require('node-cron'); //https://github.com/node-cron/node-cron
const { get } = require("https");
const fetch = require("@replit/node-fetch");

// node deploy-commands.js 
//^^ type in shell to register a command

//Logs all console logs in Discord - uncomment for main bot
// client.on("ready", () => {
// 		console.log = function(log) {

// 		const aDate = new Date();
// 		var mstDate = aDate.toLocaleString("en-US", {
// 		  timeZone: "America/Denver" //https://momentjs.com/timezone/docs/#/data-loading/
// 		});
// 		var mstTime = mstDate.split(", ");
// 		var mstHourMinute = mstTime[1].split(":");

// 		var mstHour = mstHourMinute[0];
// 		var mstMinute = mstHourMinute[1];

// 		var amPM01 = mstHourMinute[2].split(" ");
// 		var amPM = amPM01[1];

// 				//console.log(`${mstHour}:${mstMinute} ${amPM}`);			

// 			if ((log.includes(`guilds`)) || (log.includes(`Logged in`)) || (log.includes(`You triggered`)) || (log.includes(`You clicked`)) || (log.includes(`You changed`)) || (log.includes(`You added`)) || (log.includes(`You removed`)) || (log.includes(`You unsubscribed`)) ) {
// 				const logChannel = client.channels.cache.get(process.env.logChannel2);	
// 				let logEmbed = new EmbedBuilder()
// 					.setColor(0xFF008B) //Pink
// 					.setDescription(`${log}\n${mstHour}:${mstMinute} ${amPM}`)
// 				logChannel.send({embeds: [logEmbed]});
// 			} 
// 			else {
// 				const logChannel = client.channels.cache.get(process.env.logChannel);	
// 				let logEmbed = new EmbedBuilder()
// 					.setColor(0xFF008B) //Pink
// 					.setDescription(`${log}\n${mstHour}:${mstMinute} ${amPM}`)
// 				logChannel.send({embeds: [logEmbed]});
// 			}
// 		}

// });

//Check channel permissions - uncomment for main bot
// client.on("ready", () => {
// 		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
// 			if (err) {console.log(`Error: ${err}`)} 
// 			else {
// 				let channelIDs01 = data.split("channel:");
// 				let channelIDs = [];
// 				for (i = 1; i <= channelIDs01.length - 1; i++) {
// 					let channelIDs02 = channelIDs01[i].split("-");
// 					let channelIDs03 = channelIDs02[0];

// 					channelIDs.push(channelIDs03);
// 				}
// 				console.log(`channelIDs: ${channelIDs}`);
// 				for (c = 1; c <= channelIDs.length - 1; c++) {
					
// 					client.channels.fetch(channelIDs[c]).then(channel => {
// 						console.log(`Send message permission in ${channel.id}: ${channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages)}`);
// 					});
// 				}
// 			}
// 		}); //end fs.readFile for GTADataBase.txt
// }); 

//prevents errors from shutting the bot off
process.on("unhandledRejection", async (err) => {
	console.error("Unhandled Promise Rejection:\n", err.stack);
});
process.on("uncaughtException", async (err) => {
	console.error("Uncaught Promise Exception:\n", err.stack);
});
process.on("uncaughtExceptionMonitor", async (err) => {
	console.error("Uncaught Promise Exception (Monitor):\n", err.stack);
});
client.setMaxListeners(50); // prevents max listeners error for buttons (DO NOT SET OVER 100)

//checks for 429 errors at startup and every 5 minutes
function handleRateLimit() {
	get(`https://discord.com/api/v10/gateway`, ({ statusCode }) => {
		if ((statusCode === 429) || (statusCode === 404)) { 
			console.log(`Status Code: ${statusCode}\nRestarting the bot.`);
			process.kill(1) 
		}
		//console.log(`StatusCode: ${statusCode}`);
	});
};
handleRateLimit();
setInterval(handleRateLimit, 3e5); //3e5 = 300000 (3 w/ 5 zeros)

//error handler
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
			command.execute(interaction);
	} catch (error) {
		console.log(`There was an error! \n${error.stack}`);

      let errorEmbed = new EmbedBuilder()
      .setColor(0xFF0000) 
      .setTitle(`Uh Oh!`)
      .setDescription(`There was an error while executing this command!\nThe error has been sent to the developer and will be fixed as soon as possible.\nPlease try again in a few minutes.\n\nIf the problem persists you can try [re-inviting the bot](<${process.env.invite_link}>) or \nYou can report it in the [Rockstar Weekly Support Server](<${process.env.support_link}>)`);

		let trafficError = new EmbedBuilder()
			.setColor(0xFFAE00)
			.setTitle(`Uh Oh!`)
			.setDescription(`It looks like Discord is under a heavy load! Please try again in a few minutes.`)
		
		console.log(`interaction error: ${error.stack}`);
		if (error.toString().includes("has not been sent")) {
			if ((error.toString().includes("50027")) || (error.toString().includes("10008"))) {
				await interaction.reply({ embeds: [trafficError], ephemeral: true });
				console.log(`There was an error! \n${error.stack}`);
				process.kill(1);
			}
			else {
				await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
				console.log(`There was an error! \n${error.stack}`);
			}
		}
		else if (error.toString().includes("is not a function")) {
			if ((error.toString().includes("50027")) || (error.toString().includes("10008"))) {
				await interaction.reply({ embeds: [trafficError], ephemeral: true });
				console.log(`There was an error! \n${error.stack}`);
				process.kill(1);
			}
			else {
				await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
				console.log(`There was an error! \n${error.stack}`);
			}
		}			
		else {
			if ((error.toString().includes("50027")) || (error.toString().includes("10008"))) {
				await interaction.editReply({ embeds: [trafficError], ephemeral: true });
				console.log(`There was an error! \n${error.stack}`);
				process.kill(1);
			}		
			else {
				await interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
				console.log(`There was an error! \n${error.stack}`);
			}
		}
	}
});

//Access Command Files
const fs = require('node:fs');
const path = require('node:path');

client.commands = new Collection();
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

//Access Event files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//Access Language files
const languagePath = path.join(__dirname, 'language');
const languageFiles = fs.readdirSync(languagePath).filter(file => file.endsWith('.js'));

for (const file of languageFiles) {
	const filePath = path.join(languagePath, file);
	const language = require(filePath);
	if (language.once) {
		client.once(language.name, (...args) => language.execute(...args));
	} else {
		client.on(language.name, (...args) => language.execute(...args));
	}
}

//Access Component files
const componentsPath = path.join(__dirname, 'components');
const componentsFiles = fs.readdirSync(componentsPath).filter(file => file.endsWith('.js'));

for (const file of componentsFiles) {

	const filePath = path.join(componentsPath, file);
	const component = require(filePath);
	if (component.once) {
		client.once(component.name, (...args) => component.execute(...args));
	} else {
		client.on(component.name, (...args) => component.execute(...args));
	}
}

//Access Start files
const StartPath = path.join(__dirname, 'AutoPost/Start');
const StartFiles = fs.readdirSync(StartPath).filter(file => file.endsWith('.js'));

for (const file of StartFiles) {

	const filePath = path.join(StartPath, file);
	const component = require(filePath);
	if (component.once) {
		client.once(component.name, (...args) => component.execute(...args));
	} else {
		client.on(component.name, (...args) => component.execute(...args));
	}
}

//Access Stop files
const StopPath = path.join(__dirname, 'AutoPost/Stop');
const StopFiles = fs.readdirSync(StopPath).filter(file => file.endsWith('.js'));

for (const file of StopFiles) {

	const filePath = path.join(StopPath, file);
	const component = require(filePath);
	if (component.once) {
		client.once(component.name, (...args) => component.execute(...args));
	} else {
		client.on(component.name, (...args) => component.execute(...args));
	}
}

//Access Confirm files
const ConfirmPath = path.join(__dirname, 'AutoPost/Confirm');
const ConfirmFiles = fs.readdirSync(ConfirmPath).filter(file => file.endsWith('.js'));

for (const file of ConfirmFiles) {

	const filePath = path.join(ConfirmPath, file);
	const component = require(filePath);
	if (component.once) {
		client.once(component.name, (...args) => component.execute(...args));
	} else {
		client.on(component.name, (...args) => component.execute(...args));
	}
}

//Access backButton files
const backButtonPath = path.join(__dirname, 'AutoPost/backButtons');
const backButtonFiles = fs.readdirSync(backButtonPath).filter(file => file.endsWith('.js'));

for (const file of backButtonFiles) {

	const filePath = path.join(backButtonPath, file);
	const component = require(filePath);
	if (component.once) {
		client.once(component.name, (...args) => component.execute(...args));
	} else {
		client.on(component.name, (...args) => component.execute(...args));
	}
}

keepAlive();
client.login(process.env.DISCORD_TOKEN).catch(err => console.log(`Login Error: ${err.stack}`));