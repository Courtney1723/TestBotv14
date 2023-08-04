const { ActivityType } = require('discord.js');
var cron = require('node-cron'); //https://github.com/node-cron/node-cron
const fetch = require("@replit/node-fetch");
const os = require("os");
const NEXT_BONUS = require('../events/nextBonus.js');
const THIS_BONUS = require('../events/thisBonus.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
        client.user.setPresence({ activities: [{ name: 'Bonuses', type: ActivityType.Watching }] });

        async function newBonusPresence() { //fixme - switch to new source

						var thisBONUSGTA = await THIS_BONUS.thisBonus("gta");
						var thisBONUSRDO = await THIS_BONUS.thisBonus("rdo");
						var nextBONUSGTA = await NEXT_BONUS.nextBonus("gta");
						var nextBONUSRDO = await NEXT_BONUS.nextBonus("rdo");

						var nowDate = new Date();
						var nowLocalDate = new Date(nowDate.toLocaleString("en-US", { timeZone: 'America/Denver' }));
						var nowDay = nowLocalDate.getDay();
						var nowDate = nowLocalDate.getDate();
						var gtaLocalDate = thisBONUSGTA.getDate();
						var rdoLocalDate = thisBONUSRDO.getDate();
						var checkDayOfGTA = nextBONUSGTA - nowDate;
						var checkDayOfRDO = nextBONUSRDO - nowDate;
						
						// console.log(`nextBonus: \ngta: ${nextBONUSGTA} - \nrdo: ${nextBONUSRDO}`);
						// console.log(`thisBonus: \ngta: ${thisBONUSGTA} - \nrdo: ${thisBONUSRDO}`);
						// console.log(`nowDate: \ngta: ${nowLocalDate} - \nday: ${nowDay} - date: ${nowDate} && ${gtaLocalDate} && ${rdoLocalDate}`);
						// console.log(`checkDayOfGTA ${checkDayOfGTA} \ncheckDayOfRDO ${checkDayOfRDO}`);

						function thisGtaOrNext() {
							if (checkDayOfGTA > 0) { //if latest bonus is live
								if ((nowDay === 4) && (gtaLocalDate === nowDate)) { //if latest bonus is same day
									client.user.setPresence({ activities: [{ name: 'NEW GTA Bonuses', type: ActivityType.Watching }] });
								}
							}
						}
						thisGtaOrNext();
						function thisRdoOrNext() {
							if (checkDayOfRDO > 0) { //if latest bonus is live
								if ((nowDay === 2) && (rdoLocalDate === nowDate)) { //if latest bonus is same day
									client.user.setPresence({ activities: [{ name: 'NEW RDO Bonuses', type: ActivityType.Watching }] });
								}
							}
						}					
						thisRdoOrNext()
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

        //Counts the guilds
        const GuildIDs = client.guilds.cache.map(guild => guild.id);
        console.log(`${GuildIDs.length} guilds`);

				function bTG(num) {
				  return (num / Math.pow(1024,3));
				}
				function freeRAM() {
					if (bTG(os.freemem) <= 2) {
						console.log(`Ran out of RAM. Restarting...`);
						setTimeout(() => {
							process.kill(1);
						}, "1000");
					}
					else {
						console.log(`free RAM: ${bTG(os.freemem)}`);
					}
				}
				freeRAM();
				setInterval(freeRAM, 18e5);//checks every 30 minutes

    },
};