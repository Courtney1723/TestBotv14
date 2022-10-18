const { SlashCommandBuilder, EmbedBuilder, ActivityType } = require('discord.js');
 const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
var cron = require('node-cron'); //https://github.com/node-cron/node-cron

//FIXME... How to add functionality for when the bot is added to a new guild?

 module.exports = {
 	name: 'ready',
 	async execute(client) {

		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
 			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
				const GuildIDs = client.guilds.cache.map(guild => guild.id);
				const guildIdString = GuildIDs.join();
					//console.log(`guildIdString: ${guildIdString}`);

				const gtaGuildIDs = [];
				for (i=0;i<=GuildIDs.length;i++) {
					if (data.includes(GuildIDs[i]) ) {
						gtaGuildIDs.push(GuildIDs[i]);
					}
				}
				//console.log(`gtaGuildIDs: ${gtaGuildIDs}`);
				//console.log(`gtaGuildIDsString: ${gtaGuildIDs.toString()}`)

				//DO NOT UNCOMMENT
				//DO NOT UNCOMMENT!!!   //gtaGuildIDs.shift();   // DO NOT UNCOMMENT!!! testbench to make sure it still works
		    //DO NOT UNCOMMENT                                 
			
				let newData = data;
				for (i=0;i<=GuildIDs.length - 1;i++) {
					if (!gtaGuildIDs.toString().includes(GuildIDs[i])) { //if a guild id in GTADataBase.txt is not a guild that the bot is in, delete subscription
							const find = `guild:${GuildIDs[i]} - channel:`;
							const replace = `guild:undefined${GuildIDs[i]} - channel:undefined`;
							newData = newData.replace(new RegExp(find, 'g'), replace);
				}//end for loop
				//console.log(`newData: ${newData}`);

					if (!data === newData) { //the bot was kicked from a guild that still had gta channels subscribed
						console.log(`The bot was removed from a guild with GTA posts still subscribed`)
				    //Replaces the rolesDataBase.txt file with Admin permission for the guild
				    fs.writeFile(`./GTADataBase.txt`,`${newData}`, err => {
							if (err) {
									console.error(err)
									return
									}					
				    }); //end fs.writeFile to change the admin privileges		
					}
				}
			
			}); //END FS:READFILE gtaDataBase.txt
			
		

		fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
 			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
				const GuildIDs = client.guilds.cache.map(guild => guild.id);
				const rdoGuildIDs = [];
				const guildIdString = GuildIDs.join();

				for (i=0;i<=GuildIDs.length;i++) {
					if (data.includes(GuildIDs[i]) ) {
						rdoGuildIDs.push(GuildIDs[i]);
					}
				}

				//DO NOT UNCOMMENT
				//DO NOT UNCOMMENT!!!   //rdoGuildIDs.shift();   // DO NOT UNCOMMENT!!! testbench to make sure it still works
		    //DO NOT UNCOMMENT                                 
			
				let newData = data;
				for (i=0;i<=GuildIDs.length - 1;i++) {
					if (!guildIdString.includes(rdoGuildIDs[i])) { //if a guild id in GTADataBase.txt is not a guild that the bot is in, delete subscription	

							const find = `guild:${GuildIDs[i]} - channel:`;
							const replace = `guild:undefined${GuildIDs[i]} - channel:undefined`;
							newData = newData.replace(new RegExp(find, 'g'), replace);
					}
				}//end for loop
				//console.log(`newData: ${newData}`);

				if (!data === newData) {
					console.log(`Somone removed the bot with RDO posts still subscribed.`);		
		    //Replaces the rolesDataBase.txt file with Admin permission for the guild
			    fs.writeFile(`./RDODataBase.txt`,`${newData}`, err => {
			        if (err) {
			            console.error(err)
			            return
			            }					
			    }); //end fs.writeFile to change the admin privileges				
				}
			}); //END FS:READFILE gtaDataBase.txt
			
		

 }
 }
