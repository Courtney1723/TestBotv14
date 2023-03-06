const { SlashCommandBuilder, EmbedBuilder, ActivityType } = require('discord.js');
 const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
var cron = require('node-cron'); //https://github.com/node-cron/node-cron

//FIXME... How to add functionality for when the bot is added to a new guild?

 module.exports = {
 	name: 'ready',
 	async execute(client) {

		//The bot was removed from a guild with GTA post(s) subscribed
		function gtaRemove() {
		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
 			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
				const GuildIDs = client.guilds.cache.map(guild => guild.id);
				const channelIDs01 = data.split("channel:");
				const gtaGuildIDs01 = data.split("guild:");
				const guildIdString = GuildIDs.toString();
					//console.log(`guildIdString: ${guildIdString}`); 
			
				let newData = data;
				for (i = 2; i <= gtaGuildIDs01.length - 1; i++) {
					const channelID01 = channelIDs01[i].split(" ");
					const channelID = channelID01[0];
					const guildID01 = gtaGuildIDs01[i].split(" ");
					const guildID = guildID01[0];
					// console.log(`channelID at ${i}: ${channelID}`);
					// console.log(`guildID at ${i}: ${guildID}`);
					if (!guildIdString.includes(guildID)) {//if a guild id in GTADataBase.txt is not a guild that the bot is in, delete subscription
							const find = `\nguild:${guildID} - channel:${channelID} - rdo_gta:gtaStartMenu - `;
							const replace = "";
							newData = newData.replace(new RegExp(find, 'g'), replace);
							console.log(`The bot was removed from ${guildID} with GTA posts still subscribed to ${channelID} channel.`);
					}
				} //end loop
				// console.log(`\ndata: ${data}\n`);
				// console.log(`\nnewData: ${newData}\n`);
				// console.log(`data !== newData? ${data !== newData}`);

					if (data !== newData) { //the bot was kicked from a guild that still had gta channels subscribed
				 //Replaces the GTADataBase.txt file with only subscribed guilds
				 fs.writeFile(`./GTADataBase.txt`,`${newData}`, err => {
							if (err) {
									console.error(err)
									return
									}					
				 }); //end fs.writeFile to change the admin privileges		
					}
			
			}); //END FS:READFILE gtaDataBase.txt
		} // end gtaRemove()
		gtaRemove();
		setInterval(gtaRemove, 864e5); //every 24 hours


		
		//The bot was removed from a guild with RDO post(s) subscribed
		function rdoRemove() {
		fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
 			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
				const GuildIDs = client.guilds.cache.map(guild => guild.id);
				const channelIDs01 = data.split("channel:");
				const rdoGuildIDs01 = data.split("guild:");
				const guildIdString = GuildIDs.toString();
					//console.log(`guildIdString: ${guildIdString}`); 
			
				let newData = data;
				for (i = 2; i <= rdoGuildIDs01.length - 1; i++) {
					const channelID01 = channelIDs01[i].split(" ");
					const channelID = channelID01[0];
					const guildID01 = rdoGuildIDs01[i].split(" ");
					const guildID = guildID01[0];
					// console.log(`channelID at ${i}: ${channelID}`);
					// console.log(`guildID at ${i}: ${guildID}`);
					if (!guildIdString.includes(guildID)) {//if a guild id in RDODataBase.txt is not a guild that the bot is in, delete subscription
							const find = `\nguild:${guildID} - channel:${channelID} - rdo_gta:rdoStartMenu - `;
							const replace = "";
							newData = newData.replace(new RegExp(find, 'g'), replace);
							console.log(`The bot was removed from ${guildID} with RDO posts still subscribed to ${channelID} channel.`);
					}
				} // end loop
				// console.log(`data at ${i}: ${data}`);
				// console.log(`newData: ${newData}`);
				// console.log(`data !== newData? ${data !== newData}`);

					if (data !== newData) { //the bot was kicked from a guild that still had rdo channels subscribed
				 //Replaces the RDODataBase.txt file with only subscribed guilds 
				 fs.writeFile(`./RDODataBase.txt`,`${newData}`, err => {
							if (err) {
									console.error(err)
									return
									}					
				 }); //end fs.writeFile to change the admin privileges		
					}
			
			}); //END FS:READFILE rdoDataBase.txt
		} // end rdoRemove()
		rdoRemove();
		setInterval(rdoRemove, 864e5); //every 24 hours


		
		//The bot was removed from a guild with roles configured
		function roleRemove() {
		fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
 			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
				const GuildIDs = client.guilds.cache.map(guild => guild.id);
				const roleGuildIDs01 = data.split("guild:");
				const adminIDs01 = data.split("admin:");
				const roleIDs01 = data.split("role:");
				const guildIdString = GuildIDs.toString();
					//console.log(`guildIdString: ${guildIdString}`); 

				let newData = data;
				for (i = 2; i <= roleGuildIDs01.length - 1; i++) {
					const guildID01 = roleGuildIDs01[i].split(" ");
					const guildID = guildID01[0];
					const adminID01 = adminIDs01[i].split(" ");
					const adminID = adminID01[0];	
					const roleID01 = roleIDs01[i].split(" ");
					const roleID = roleID01[0];		
					// console.log(`guildID at ${i}: ${guildID} - adminID: ${adminID} - roleID: ${roleID}`);
					// console.log(`guildIdString.includes(guildID)? ${guildIdString.includes(guildID)}`);
					if (!guildIdString.includes(guildID)) {//if a guild id in rolesDataBase.txt is not a guild that the bot is in, delete subscription
							const find = `guild:${guildID} - admin:${adminID} - role:${roleID} - \n`;
							const replace = "";
							newData = newData.replace(new RegExp(find), replace);
							console.log(`The bot was removed from ${guildID} - admin:${adminID} - role:${roleID} still subscribed.`);
					}
				} //end i loop
				// console.log(`data at ${i}: ${data}`);
				// console.log(`\nnewData at ${i}: ${newData}\n`);
				// console.log(`data !== newData? ${data !== newData}`);

					if (data !== newData) { //the bot was kicked from a guild that still had a role subscribed
				 //Replaces the rolesDataBase.txt file with only subscribed guilds
				 fs.writeFile(`./rolesDataBase.txt`,`${newData}`, err => {
							if (err) {
									console.error(err)
									return
									}					
				 }); //end fs.writeFile to change the admin privileges		
					}
			
			}); //END FS:READFILE rolesDataBase.txt		
		}	//end of roleRemove()
			roleRemove();
			setInterval(roleRemove, 864e5); //every 24 hours		
		

		
		//The bot was removed from a guild with an alternate language 
		function LANGRemove() {
			fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
				 if (err) {console.log(`Error: ${err}`)} //If an error, console.log
					const GuildIDs = client.guilds.cache.map(guild => guild.id);
					const langGuildIDs01 = data.split("guild:");
					const langIDs01 = data.split("lang:");
					const guildIdString = GuildIDs.toString();
						//console.log(`guildIdString: ${guildIdString}`); 
				
					let newData = data;
					for (i = 2; i <= langGuildIDs01.length - 1; i++) {
						const guildID01 = langGuildIDs01[i].split(" ");
						const guildID = guildID01[0];
						const langID01 = langIDs01[i].split(" ");
						const langID = langID01[0];		
						// console.log(`guildID at ${i}: ${guildID} - lang: ${langID} - langID01: ${langID01}`);
						// console.log(`guildIdString.includes(guildID)? ${guildIdString.includes(guildID)}`);
						// console.log(`\ndata at ${i}: ${data}\nnewData at ${i}: ${newData}\n`);
						if (!guildIdString.includes(guildID)) {//if a guild id in LANGDataBase.txt is not a guild that the bot is in, delete subscription
								const find = `guild:${guildID} - lang:${langID} - \n`;
								const replace = "";
								newData = newData.replace(new RegExp(find), replace);
								console.log(`The bot was removed from ${guildID} with lang:${langID} still subscribed.`);
						}
					} //end i loop
					// console.log(`\ndata: ${data}\n`);
					// console.log(`\nnewData: ${newData}\n`);
					// console.log(`data !== newData? ${data !== newData}`);
		
						if (data !== newData) { //the bot was kicked from a guild that still had a lang subscribed
						//Replaces the LANGDataBase.txt file with latest guilds info
						fs.writeFile(`./LANGDataBase.txt`,`${newData}`, err => {
								if (err) {
										console.error(err)
										return
										}					
						}); //end fs.writeFile 	
						}
				
				}); //END FS:READFILE LANGDataBase.txt		
			}	//end of langRemove()
			LANGRemove();
			setInterval(LANGRemove, 864e5); //every 24 hours		


		
		//A channel from GTADataBase was deleted before unsubscribing
		function deletedGTAChannelRemove() {
		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
 			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
				const GuildIDs = client.guilds.cache.map(guild => guild.id);
				const channelIDs01 = data.split("channel:");
				const gtaGuildIDs01 = data.split("guild:");
				const guildIdString = GuildIDs.toString();
					//console.log(`guildIdString: ${guildIdString}`);

				var newData = data;
				for (i = 2; i <= gtaGuildIDs01.length - 1; i++) {
					const channelID01 = channelIDs01[i].split(" ");
					const channelID = channelID01[0];
					const guildID01 = gtaGuildIDs01[i].split(" ");
					const guildID = guildID01[0];
					// console.log(`channelID at ${i}: ${channelID}`); //all channel IDs
					// console.log(`guildID at ${i}: ${guildID}`); //all guild IDs
					client.channels.fetch(channelID).catch(error => { //if a channel id in GTADataBase.txt is not a channel that the bot is in, delete subscription
						// console.log(`channelID at ${i}: ${channelID}`); //deleted channel IDs
						// console.log(`guildID at ${i}: ${guildID}`); //deleted guild IDs

						const find = `\nguild:${guildID} - channel:${channelID} - rdo_gta:gtaStartMenu - `;
						const replace = "";
						newData = newData.replace(new RegExp(find, 'g'), replace);
						console.log(`A channel was deleted from ${guildID} with GTA posts still subscribed to ${channelID} channel.`);		

						// console.log(`\ndata: ${data}\n`);
						// console.log(`\nnewData: ${newData}\n`);
						// console.log(`data !== newData? ${data !== newData}`);
						
						if (data !== newData) { //a channel was deleted before removing the subscription - redundant line?
							fs.writeFile(`./GTADataBase.txt`,`${newData}`, err => {
									if (err) {
											console.error(err)
											return
											}					
							}); //end fs.writeFile to change the admin privileges
						}
						
					});

				} //end loop
			
			}); //END FS:READFILE gtaDataBase.txt
		} // end deletedChannelRemove()
		deletedGTAChannelRemove();
		setInterval(deletedGTAChannelRemove, 864e5); //every 24 hours		
		

		
		//A channel was deleted from RDODataBase before unsubscribing
		function deletedRDOChannelRemove() {
		fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
 			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
				const GuildIDs = client.guilds.cache.map(guild => guild.id);
				const channelIDs01 = data.split("channel:");
				const rdoGuildIDs01 = data.split("guild:");
				const guildIdString = GuildIDs.toString();
					//console.log(`guildIdString: ${guildIdString}`);

				var newData = data;
				for (i = 2; i <= rdoGuildIDs01.length - 1; i++) {
					const channelID01 = channelIDs01[i].split(" ");
					const channelID = channelID01[0];
					const guildID01 = rdoGuildIDs01[i].split(" ");
					const guildID = guildID01[0];
					// console.log(`channelID at ${i}: ${channelID}`); //all channel IDs
					// console.log(`guildID at ${i}: ${guildID}`); //all guild IDs
					client.channels.fetch(channelID).catch(error => { //if a channel id in RDODataBase.txt is not a channel that the bot is in, delete subscription
						// console.log(`channelID at ${i}: ${channelID}`); //deleted channel IDs
						// console.log(`guildID at ${i}: ${guildID}`); //deleted guild IDs

						const find = `\nguild:${guildID} - channel:${channelID} - rdo_gta:rdoStartMenu - `;
						const replace = "";
						newData = newData.replace(new RegExp(find, 'g'), replace);
						console.log(`A channel was deleted from ${guildID} with RDO posts still subscribed to ${channelID} channel.`);		

						// console.log(`\ndata: ${data}\n`);
						// console.log(`\nnewData: ${newData}\n`);
						// console.log(`data !== newData? ${data !== newData}`);
						
						if (data !== newData) { //a channel was deleted before removing the subscription - redundant line?
							fs.writeFile(`./RDODataBase.txt`,`${newData}`, err => {
									if (err) {
											console.error(err)
											return
											}					
							}); //end fs.writeFile to change the admin privileges
						}
						
					});

				} //end loop
			
			}); //END FS:READFILE rdoDataBase.txt
		} // end deletedChannelRemove()
		deletedRDOChannelRemove();
		setInterval(deletedRDOChannelRemove, 864e5); //every 24 hours			

	}
}