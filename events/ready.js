const { SlashCommandBuilder, EmbedBuilder, ActivityType } = require('discord.js');
const phantom = require('phantom'); //https://github.com/amir20/phantomjs-node
var cron = require('node-cron'); //https://github.com/node-cron/node-cron

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Logged in as ${client.user.tag}`);
		client.user.setPresence({ activities: [{ name: 'Bonuses', type: ActivityType.Watching }] });

		async function newBonusPresence() {
			let gtaURL = process.env.SOCIAL_URL_GTA2;
	
			const instance = await phantom.create();
			const page = await instance.createPage();
	
			await page.property('viewportSize', { width: 1024, height: 600 });
			const status = await page.open(gtaURL);
			//console.log(`Page opened with status [${status}].`);
			if (status === `success`) { //checks if Rockstar Social Club website is down
				const content = await page.property('content'); // Gets the latest gta updates
				//console.log(content); 
	
				function isPast() {
					let isPast003 = content.split("isPast\":");
					let isPast002 = isPast003[1].split(",\"");
	
					return isPast002[0];
				}
				//console.log(`isPast: ${isPast()}`);
	
				if (isPast() === "false") {
					//console.log(`live`);
	
					const aDate = new Date();
					const aDay = aDate.getDay(); //Day of the Week
						//console.log(`aDay: ${aDay}`);
					const aHour = aDate.getHours(); //Time of Day UTC (+6 MST; +4 EST)
						//console.log(`aHour: ${aHour}`);		
	
					var mtDate = aDate.toLocaleString("en-US", {
						timeZone: "America/Denver"
					});
					var mtTime = mtDate.split(", ");
					var mtDateNum02 = mtDate.split("/");
					var mtDateNum01 = mtDateNum02[1].split("/");
					var mtDateNum = mtDateNum01[0];
					var mtHourMinute = mtTime[1].split(":");
					var mtHour = mtHourMinute[0];
					var mtMinute = mtHourMinute[1];
	
					var amPM01 = mtHourMinute[2].split(" ");
					var amPM = amPM01[1];
	
					//console.log(`${mtDateNum} ${mtHour}:${mtMinute} ${amPM}`);	
	
					if ( (aDay === 4) && (mtHour >= 11) ) { //New GTA Bonuses
						client.user.setPresence({ activities: [{ name: 'New GTA Bonuses', type: ActivityType.Watching }] });
					}
					else if ( (aDay === 2) && (mtHour >= 11) && (mtDateNum <= 7) ) { //New RDO Bonuses
						client.user.setPresence({ activities: [{ name: 'New RDO Bonuses', type: ActivityType.Watching }] });
					}
				}
			};
		};
		newBonusPresence(); //checks for new bonuses on startup

		//New GTA Bonuses
		cron.schedule('*/10 11 * * 4', () => { //(second),minute,hour,date,month,weekday || every 10 minutes on Thursdays between 11 - 12
			newBonusPresence();
		}, {
			scheduled: true,
			timezone: "America/Denver"
		});

		//End New GTA Bonuses
		cron.schedule('59 23 * * 4', () => { //(second),minute,hour,date,month,weekday || ~ midnight every Friday
			client.user.setPresence({ activities: [{ name: 'Bonuses', type: ActivityType.Watching }] });
		}, {
			scheduled: true,
			timezone: "America/Denver"
		});		

		
		//New RDO Bonuses
		cron.schedule('*/10 11 1-7 * 2', () => { //(second),minute,hour,date,month,weekday || every 10 minutes on 1st Tuesdays of the month between 11 - 12
			newBonusPresence();
		}, {
			scheduled: true,
			timezone: "America/Denver"
		});		

		//End RDO Bonuses
		cron.schedule('59 23 1-7 * 2', () => { //(second),minute,hour,date,month,weekday || ~ midnight every 1st Wednesday of the month
			client.user.setPresence({ activities: [{ name: 'Bonuses', type: ActivityType.Watching }] });
		}, {
			scheduled: true,
			timezone: "America/Denver"
		});			

		//Counts the guilds - uncomment for main bot
		// const GuildIDs = client.guilds.cache.map(guild => guild.id);
		// const GuildNames = client.guilds.cache.map(guild => guild.name);
		// Guilds = "";
		// for (i = 0; i <= GuildIDs.length; ++i) {
		// 	if (GuildIDs[i] != null) {
		// 		Guilds += `${i + 1}: ${GuildNames[i]} - ID: ${GuildIDs[i]} \n`
		// 	}
		// }
		// //console.log(Guilds);
		//   console.log(`${GuildIDs.length} guilds`);


	},
};