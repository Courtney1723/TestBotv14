const { Client, GatewayIntentBits, Collection, Partials, EmbedBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
const { exec } = require('node:child_process');
const keepAlive = require('./server');
var cron = require('node-cron'); //https://github.com/node-cron/node-cron


// node deploy-commands.js 
//^^ type in shell to register a command

//Logs all console logs in Discord - uncomment for main bot
// client.on("ready", () => {
// 		console.log = function(log) {
// 			if ((log.includes(`guilds`)) || (log.includes(`Logged in`)) || (log.includes(`You triggered`)) || (log.includes(`You clicked`)) ) {
// 				const logChannel = client.channels.cache.get(process.env.logChannel2);	
// 				let logEmbed = new EmbedBuilder()
// 					.setColor('0xFF008B') //Pink
// 					.setDescription(`${log}`)
// 					.setTimestamp(Date.now());
// 				logChannel.send({embeds: [logEmbed]});
// 			} 
// 			else {
// 				const logChannel = client.channels.cache.get(process.env.logChannel);	
// 				let logEmbed = new EmbedBuilder()
// 					.setColor('0xFF008B') //Pink
// 					.setDescription(`${log}`)
// 					.setTimestamp(Date.now());
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


//sends a kill 1 command to the child node if there is a 429 error
errorArray = [];
client.on("debug", function(info){
//console.log(`info -> ${info}`); //debugger
	if (errorArray.length <= 3) {
			errorArray.push(info);
		}
		setTimeout(() => {
			if (errorArray.length >= 3) {
				//console.log(`successfully connected`);
				//console.log(`errorArray length: ${errorArray.length}`);
			} 
			else {
				console.log(`Caught a 429 error!`); 
					exec('kill 1', (err) => {
							if (err) {
									console.error("could not execute command: ", err.stack);
									return
							}
						console.log(`Kill 1 command succeeded`);
					});					
			}
		}, 10000);
}); // end debug function

//restarts the bot every two hours - uncomment for main bot
// cron.schedule('00 */2 * * *', () => { //(second),minute,hour,date,month,weekday //restarts the bot every two hours
// 		console.log(`resarting the bot...`);
// 		exec('kill 1', (err) => {
// 				if (err) {
// 						console.error("could not execute command: ", err);
// 						return
// 				}
// 			console.log(`Kill 1 command succeeded`);
// 		});	
// }); //end cron.schedule

keepAlive();
client.login(process.env.DISCORD_TOKEN).catch(err => console.log(`Login Error: ${err}`));