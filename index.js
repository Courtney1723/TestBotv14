const { Client, GatewayIntentBits, Collection, Partials, EmbedBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
const { exec } = require('node:child_process');
const keepAlive = require('./server');
var cron = require('node-cron'); //https://github.com/node-cron/node-cron
const { get } = require("https");

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
			
// 			if ((log.includes(`guilds`)) || (log.includes(`Logged in`)) || (log.includes(`You triggered`)) || (log.includes(`You clicked`)) ) {
// 				const logChannel = client.channels.cache.get(process.env.logChannel2);	
// 				let logEmbed = new EmbedBuilder()
// 					.setColor('0xFF008B') //Pink
// 					.setDescription(`${log}\n${mstHour}:${mstMinute} ${amPM}`)
// 				logChannel.send({embeds: [logEmbed]});
// 			} 
// 			else {
// 				const logChannel = client.channels.cache.get(process.env.logChannel);	
// 				let logEmbed = new EmbedBuilder()
// 					.setColor('0xFF008B') //Pink
// 					.setDescription(`${log}\n${mstHour}:${mstMinute} ${amPM}`)
// 				logChannel.send({embeds: [logEmbed]});
// 			}
// 		}
	
// });

//prevents errors from shutting the bot off
process.on("unhandledRejection", async (err) => {
  console.error("Unhandled Promise Rejection:\n", err);
});
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Promise Exception:\n", err);
});
process.on("uncaughtExceptionMonitor", async (err) => {
  console.error("Uncaught Promise Exception (Monitor):\n", err);
});
client.setMaxListeners(30); // prevents max listeners error for buttons (DO NOT SET OVER 100)

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

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
			console.log(`interaction error: ${error.stack}`);
		if (error.toString().includes("InteractionNotReplied")) {
			await interaction.reply({ content: `There was an error while executing this command!\nThe error has been sent to the developer and will be fixed as soon as possible.\nPlease try again.\n\nIf the problem persists you can try [re-inviting the bot](<${process.env.invite_link}>) or \nYou can report it in the [Rockstar Weekly Support Server](<${proces.env.support_link}>)`, ephemeral: true });
		} else {
			await interaction.editReply({ content: `There was an error while executing this command!\nThe error has been sent to the developer and will be fixed as soon as possible.\nPlease try again.\n\nIf the problem persists you can try [re-inviting the bot](<${process.env.invite_link}>) or \nYou can report it in the [Rockstar Weekly Support Server](<${process.env.support_link}>)`, ephemeral: true });
		}
	}
});

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

//Access Configure files
const ConfigurePath = path.join(__dirname, 'AutoPost/Configure');
const ConfigureFiles = fs.readdirSync(ConfigurePath).filter(file => file.endsWith('.js'));

for (const file of ConfigureFiles) {
	
	const filePath = path.join(ConfigurePath, file);
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

//checks for 429 errors at startup and every 5 minutes
function handleRateLimit() {
  get(`https://discord.com/api/v10/gateway`, ({ statusCode }) => {
	  if (statusCode == 429) { process.kill(1) }
	});
};
handleRateLimit();
setInterval(handleRateLimit, 3e5); //3e5 = 300000 (3 w/ 5 zeros)

keepAlive();
client.login(process.env.DISCORD_TOKEN).catch(err => console.log(`Login Error: ${err.stack}`));