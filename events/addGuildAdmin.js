const { SlashCommandBuilder, EmbedBuilder, ActivityType } = require('discord.js');
 const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

 module.exports = {
 	name: 'ready',
 	once: true,
 	async execute(client) {

 		fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
 			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
 			const GuildIDs = client.guilds.cache.map(guild => guild.id);
 				Guilds = [];
 				for (i = 0; i <= GuildIDs.length; ++i) {
 					if (GuildIDs[i] != null) {
 						Guilds += GuildIDs[i];

 						if (!data.includes(GuildIDs[i])) {
 						fs.appendFile(`./rolesDataBase.txt`,`guild:${GuildIDs[i]} - admin:yes - role: - \n`, err => {
 							if (err) {
 								console.error(err)
 								return
 							}					
 						}); //end fs.appendFile	

 					}
 				} 
 			} //end of loop
 		}); //end fs.readFile		

 }
 }
