const { Client, GatewayIntentBits, Collection, Partials, EmbedBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
const { exec } = require('node:child_process');
const keepAlive = require('./server');

// node deploy-commands.js 
//^^ type in shell to register a command

// client.on("ready", () => {

// 		//Logs all console logs in Discord - uncomment for main bot
// 		console.log = function(log) {
// 			if ((log.includes(`guilds`)) || (log.includes(`Logged in`)) || (log.includes(`You triggered`)) ) {
// 				const logChannel = client.channels.cache.get(process.env.logChannel2);	
// 				let logEmbed = new EmbedBuilder()
// 					.setColor('0xFF008B') //Pink
// 					.setDescription(`${log}`);
// 				logChannel.send({embeds: [logEmbed]});
// 			} 
// 			else {
// 				const logChannel = client.channels.cache.get(process.env.logChannel);	
// 				let logEmbed = new EmbedBuilder()
// 					.setColor('0xFF008B') //Pink
// 					.setDescription(`${log}`);
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
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
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

//sends a kill 1 command to the child node if there is a 429 error
// errorArray = [];
// client.on("debug", function(info){
// 	//console.log(`info -> ${check429error}`); //debugger
// 			errorArray.push(info);
// 		setTimeout(() => {
// 		  if (errorArray.length >= 3) {
// 				//console.log(`successfully connected`);
// 				//console.log(`errorArray length: ${errorArray.length}`);
// 			} else {
// 				console.log(`Caught a 429 error!`); 
// 					exec('kill 1', (err) => {
// 					    if (err) {
// 					        console.error("could not execute command: ", err);
// 					        return
// 					    }
// 					  console.log(`Kill 1 command succeeded`); //probably wont work
// 					});					
// 			}
// 		}, 10000);
// });


keepAlive();
client.login(process.env.DISCORD_TOKEN).catch(err => console.log(`Login Error: ${err}`));