const { EmbedBuilder } = require('discord.js');
var cron = require('node-cron'); //https://github.com/node-cron/node-cron
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const fetch = require("@replit/node-fetch");
const NEXT_BONUS = require("../events/nextBonus.js");
const THIS_BONUS = require("../events/thisBonus.js");

module.exports = {
    name: 'ready',
    async execute(client) {

        //cron.schedule('* * * * *', () => { //(second),minute,hour,date,month,weekday 
        cron.schedule('45 14 * * 4', () => { //(second),minute,hour,date,month,weekday '0 12 * * 4' = 12:00 PM on Thursday
            console.log('sending GTA Auto Posts...');

            fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
                if (err) { console.log(`Error: ${err}`) }
                else {
                    let langArray = [];
                    let lang03 = data.split("lang:");

                    for (let i = 2; i < lang03.length; i++) { // Starting from 2 since the first language will always be undefined
                        let endIndex = lang03[i].indexOf(" -");
                        if (endIndex !== -1) {
                            langArray.push(lang03[i].substring(0, endIndex));
                        }
                    }
                    //console.log(`langArray: ${langArray}`);

                    let guildID03 = data.split("guild:");
                    //console.log(`guildID03.length: ${guildID03.length}`);
                    let guildIDLangArray = [];
                    for (i = 2; i <= guildID03.length - 1; i++) { //first two will always be undefined
                        let guildID02 = guildID03[i].split(" -");
                        //console.log(`lang02 at ${i}: ${lang02}`);

                        let guildID01 = guildID02[0];
                        //console.log(`lang01 at ${i}: ${lang01}`);

                        guildIDLangArray.push(guildID01);
                    }

                    //console.log(`guildIDLangArray: ${guildIDLangArray}`);	


                    //----------Begin Formatting GuildIds, ChannelIds, and rdo_gtaIDs-----------//	
                    fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
                        if (err) { console.log(`Error: ${err}`) }
                        else {
                            //console.log(`data: ${data}`);
                            let guildIDs01 = data.split("guild:");
                            //console.log(`guildIDs01[1]: ${guildIDs01[1]}\n`);
                            //console.log(`guildIDs01[2]: ${guildIDs01[2]}\n`);

                            let channelIDs01 = data.split("channel:");
                            //console.log(`channelIDs01[1]: ${channelIDs01[1]}\n`);		
                            //console.log(`channelIDs01[2]: ${channelIDs01[2]}\n`);	

                            let rdo_gtaIDs01 = data.split("rdo_gta:");
                            //console.log(`rdo_gtaIDs01[1]: ${rdo_gtaIDs01[1]}\n`);		
                            //console.log(`rdo_gtaIDs01[2]: ${rdo_gtaIDs01[2]}\n`);	

                            let guildIDs = [];
                            let channelIDs = [];
                            let rdo_gtaIDs = [];
                            for (i = 1; i <= rdo_gtaIDs01.length - 1; i++) { //iterated through the subbbed channels 
                                let guildIDs02 = guildIDs01[i].split("-");
                                let guildIDs03 = guildIDs02[0];
                                //console.log(`guildIDs at ${i}: ${guildIDs03}`);

                                guildIDs += `${guildIDs03} - `;

                                let channelIDs02 = channelIDs01[i].split("-");
                                let channelIDs03 = channelIDs02[0];
                                //console.log(`channelIDs at ${i}: ${channelIDs03}`);

                                channelIDs += `${channelIDs03} - `;

                                let rdo_gtaIDs02 = rdo_gtaIDs01[i].split("-");
                                let rdo_gtaIDs03 = rdo_gtaIDs02[0];
                                //console.log(`rdo_gtaIDs at ${i}: ${rdo_gtaIDs03}\n`);

                                rdo_gtaIDs += `${rdo_gtaIDs03} - `;

                                //client.channels.fetch(channelIDs03).then(channel => channel.send('<content>')) //example DO NOT UNCOMMENT				

                            }

                            //console.log(`guildIDs: ${guildIDs}`);
                            var channelIDLength = channelIDs.split("-")
                            console.log(`channelIDs: ${channelIDLength.length}`); //do not comment out
                            //console.log(`rdo_gtaIDs: ${rdo_gtaIDs}`);

                            let guildIDsArray = guildIDs.split('  - ');
                            guildIDsArray.shift(); //removes the undefined element
                            let channelIDArray = channelIDs.split('  - ');
                            channelIDArray.shift(); //removes the undefined element
                            let guildLangs = guildIDLangArray.join(` - `);
                            //console.log(`guildIDsArray: ${guildIDsArray}`);
                            //console.log(`guildIDLangArray: ${guildIDLangArray}`);
                            //console.log(`channelIDArray: ${channelIDArray}`);

                            c = 0;
                            while (c <= channelIDArray.length - 2) { //first & last elements will always be undefined	
                                let lang = "";

                                for (langCheck = 0; langCheck <= langArray.length - 1; langCheck++) { //iterates through all the languages
                                    // console.log(`guildIDsArray[c] === guildIDLangArray[langCheck]? ${guildIDsArray[c] === guildIDLangArray[langCheck]}`);
                                    // console.log(`guildIDsArray at c${c}: ${guildIDsArray[c]}`);
                                    // console.log(`guildIDLangArray at c${c}: ${guildIDLangArray[c]}`);
                                    // console.log(`channelIDArray at c${c}: ${channelIDArray[c]}`);
                                    // console.log(`langArray at c${c}: ${langArray[c]}`);					
                                    // console.log(`guildIDsArray at langCheck${langCheck}: ${guildIDsArray[langCheck]}`);
                                    // console.log(`guildIDLangArray at langCheck${langCheck}: ${guildIDLangArray[langCheck]}`);
                                    // console.log(`channelIDArray at langCheck${langCheck}: ${channelIDArray[langCheck]}`);
                                    // console.log(`langArray at langCheck${langCheck}: ${langArray[langCheck]}`);						
                                    if (guildIDsArray[c] === guildIDLangArray[langCheck]) { //if the subscribed channel is in a guild that has a language chosen
                                        lang = langArray[langCheck];
                                    }
                                }
                                console.log(`lang: ${lang} - channelID: ${channelIDArray[c]}`);

                                //----------END Formatting GuildIds, ChannelIds, rdo_gtaIDs, and language-----------//	



                                //Begin GTA Formatting		

                                var nextBonus01 = await NEXT_BONUS.nextBonus("gta");
                                var thisBonus01 = await THIS_BONUS.thisBonus("gta");
                                // console.log(`next Bonus: <t:${Math.round(nextBonus01 / 1000)}>`);

                                var gtaFetch = await fetch(`${process.env.gtaGraphURL1}${lang}${process.env.gtaGraphURL2}`, {
                                    "cache": "default",
                                    "credentials": "omit",
                                    "headers": {
                                        "Accept": "*/*",
                                        "Accept-Language": "en-US,en;q=0.9",
                                        "Content-Type": "application/json",
                                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15"
                                    },
                                    "method": "GET",
                                    "mode": "cors",
                                    "redirect": "follow",
                                    "referrer": "https://www.rockstargames.com/",
                                    "referrerPolicy": "strict-origin-when-cross-origin"
                                });

                                var getgtaJSON01 = await gtaFetch.json();
                                var getgtaJSON = JSON.stringify(getgtaJSON01);
                                var getgtaParse = JSON.parse(getgtaJSON);
                                //console.log(getgtaJSON);

                                var gtaImage = getgtaParse.data.posts.results[1].preview_images_parsed.newswire_block.d16x9;
                                //console.log(`gtaImage: ${gtaImage}`);

																function langFunction() {		
																	if (lang !== "") {
																		return `/${lang}`;
																	}
																	else {
																		return "";
																	}
																}	

                                var gtaURLHash = getgtaParse.data.posts.results[1].id;
                                var gtaURLFull = `https://www.rockstargames.com${langFunction()}${getgtaParse.data.posts.results[1].url}`;
                                var fetchGTA = await fetch(`${process.env.gtaGraphURL3}${gtaURLHash}%22%2C%22locale%22%3A%22${lang}${process.env.gtaGraphURL4}`, {
                                    "cache": "default",
                                    "credentials": "omit",
                                    "headers": {
                                        "Accept": "*/*",
                                        "Accept-Language": "en-US,en;q=0.9",
                                        "Content-Type": "application/json",
                                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15"
                                    },
                                    "method": "GET",
                                    "mode": "cors",
                                    "redirect": "follow",
                                    "referrer": "https://www.rockstargames.com/",
                                    "referrerPolicy": "strict-origin-when-cross-origin"
                                });

                                var gtaPost = "";
                                var gtaJSON01 = await fetchGTA.json();
                                var gtaJSON = JSON.stringify(gtaJSON01);
                                var gtaParse = JSON.parse(gtaJSON);
                                //console.log(`gtaJSON: \n\n${gtaJSON}\n\n`);

                                var gtaMainTitle = gtaParse.data.post.title
                                var gtaSubTitle = gtaParse.data.post.subtitle;
                                var gtaBlurb = gtaParse.data.post.tina.variables.keys.meta.blurb;
                                var gtaDate = gtaParse.data.post.created_formatted;
                                //console.log(`gtaTitle: ${gtaTitle}\ngtaSubTitle: ${gtaSubTitle}\ngtaDate: ${gtaDate}`);
                                var thisBonus = Math.round((thisBonus01) / 1000) + 21600; // plus 6 hours
                                var nextBonus = Math.round((nextBonus01) / 1000) - 54060; // minus 15.016 hours
                                // console.log(`thisBonus01: ${thisBonus01} - nextBonus01: ${nextBonus01}`);
                                // console.log(`thisBonus: ${thisBonus} - nextBonus: ${nextBonus}`);
                                gtaPost += `¶¶t:${thisBonus}:D∞∞ - ¶¶t:${nextBonus}:D∞∞\n\n• ${gtaSubTitle}\n\n• ${gtaBlurb}\n\n`;

                                var allBonuses = gtaParse.data.post.tina.variables.keys;
                                var gtaBonus = Object.values(allBonuses);
                                var gtaPlusBonus = "";
                                var gtaPlusCount = 0;
                                var gtaPlusInsert = 0;
                                var gtaPlusBottom = 0;

                                //START Populating gtaPost
                                for (var k = 2; k <= gtaBonus.length - 2; k++) { //first bonus is the subtitle and blurb, last bonus is the gun van inventory discounts
                                    //console.log(`${JSON.stringify(gtaBonus[k])}\n\n`);
                                    if (k === 17) { }//FIXME NEXT WEEK
                                    else if (gtaBonus[k - 1].badge !== undefined) { //Do not include description if 2x, 3x, 4x, etc... bonus
                                        if (gtaBonus[k].title !== undefined) {
                                            gtaPost += `\n**${gtaBonus[k].title}**\n`;
                                        }
                                        else if (gtaBonus[k].description !== undefined) {
                                            gtaPost += `• ${gtaBonus[k].description}\n`;
                                        }
                                    }
                                    else if (gtaBonus[k - 1].badge === undefined) { //if the bonus is not linked to another bonus
                                        if ((gtaBonus[k].text !== undefined) && (gtaPlusCount !== 1)) { //gta+ top
                                            gtaPlusBonus += `\n**${gtaBonus[k].text}**\n`;
                                            gtaPlusCount++;
                                            gtaPlusInsert = gtaPost.length;
                                            gtaPlusBottom = k + 1;
                                        }
                                        if ((gtaBonus[k].content !== undefined)) {
                                            gtaPlusBonus += `• ${gtaBonus[k].content}\n`;
                                        }
                                        if (gtaBonus[k].title_and_description !== undefined) { //DISCOUNTS
                                            gtaPost += `\n**${gtaBonus[k].title_and_description.title}**\n${gtaBonus[k].title_and_description.description}`;
                                        }
                                        if ((gtaBonus[k].title !== undefined)) {
                                            gtaPost += `\n**${gtaBonus[k].title}**\n`;
                                        }
                                        if (gtaBonus[k].description !== undefined) {
                                            gtaPost += `• ${gtaBonus[k].description}\n`;
                                        }
                                    }
                                }
                                //END for loop

                                function gtaPlus() {
                                    gtaPlusBonus += `${gtaBonus[gtaPlusBottom].text}\n`;
                                    var gtaPost1 = gtaPost.slice(0, gtaPlusInsert);
                                    var gtaPost2 = gtaPost.slice(gtaPlusInsert, gtaPost.length);
                                    gtaPost = gtaPost1 + gtaPlusBonus + gtaPost2;
                                }
                                gtaPlus();

                                function noBonus() {
                                    var noBonusRegex = /<p>.*?<\/p><h3>/g;
                                    gtaPost = gtaPost.replace(noBonusRegex, "<h3>");
                                }
                                noBonus();
                                if (gtaBonus[gtaBonus.length - 1].content !== undefined) { //adds the gun van inventory discounts
                                    gtaPost += `${gtaBonus[gtaBonus.length - 1].content}\n`;
                                }

				                        function replaceLinks() {
																	var gtaLinks = /<a href=\".*?<\/a>/g;
																	for (const match of gtaPost.matchAll(gtaLinks)) {
																		//console.log(match[0]);
																		var gtaLinkURL2 = match[0].toString().split("href=\"");
																		for (var j = 0; j <= gtaLinkURL2.length - 1; j++) { //iterates through all the links
																			var gtaLinkURL1 = gtaLinkURL2[j].split("\">");
																			if (gtaLinkURL1[1] !== undefined) {
																				var gtaLinkTitle1 = gtaLinkURL1[1].split("<");
																				var gtaLinkTitle = gtaLinkTitle1[0];
																				var gtaLinkURL = gtaLinkURL1[0];
																				//console.log(`match[0]: ${match[0]} - gtaLinkTitle: ${gtaLinkTitle} - gtaLinkURL: ${gtaLinkURL}`);
																				gtaPost = gtaPost.replace(match[0], `[${gtaLinkTitle}](${gtaLinkURL})`);
																			}
																		}
																	}
																}
																replaceLinks();

                                var gtaReGex = /<.*?>/g;
                                var gtaFinalString = gtaPost
                                    .replace(/<br><br>/g, "\n• ") //adds a bullet for additional paragraphs
                                    .replace(/<li>/g, "\n• ") //adds a bullet point to list items
                                    .replace(/<h3>/g, "\n\n**") //adds a newline for missed titles
                                    .replace(/<\/h3>/g, "**\n") //adds a newline for missed titles
                                    .replace(gtaReGex, "") //removes all remaining HTML
                                    .replace(/\¶\¶/g, "<") //creates timestamps for thisBonus && nextBonus
                                    .replace(/\∞\∞/g, ">")//creates timestamps for thisBonus && nextBonus
                                    .replace(/• \n/g, "") //removes extra bullet points
                                    .replace(/\n\n\n/g, "\n\n") //removes excess newlines

                                //console.log(gtaFinalString);

                                var constChars = (gtaMainTitle.length);
                                function ellipsisFunction() {
                                    if (gtaFinalString.length >= (4000 - constChars)) {
                                        return "...";
                                    } else {
                                        return "";
                                    }
                                }
                                function ellipsisFunction2() {
                                    if (gtaFinalString.length >= (6000 - constChars - gtaImage.length)) {
                                        return "...\n";
                                    } else {
                                        return "";
                                    }
                                }
																function footerText() {
																	if (lang === "") {
																			return `\n** [More details](${gtaURLFull})**`;
																	}
																	else if (lang === "es") {
																			return `\n** [Más detalles](${gtaURLFull})**`;
																	}
																	else if (lang === "br") {
																			return `\n** [Mais detalhes](${gtaURLFull})**`;
																	}						
																	else if (lang === "ru") {
																			return `\n** [Подробнее](${gtaURLFull})**`;
																	}
																	else if (lang === "de") {
																			return `\n** [Mehr Details](${gtaURLFull})**`;
																	}
																	else if (lang === "pl") {
																			return `\n** [Więcej szczegółów](${gtaURLFull})**`;
																	}
																	else if (lang === "fr") {
																			return `\n** [Plus de détails](${gtaURLFull})**`;
																	}
																	else if (lang === "it") {
																			return `\n** [Più dettagli](${gtaURLFull})**`;
																	}
																	else if (lang === "zh") {
																			return `\n** [更多细节](${gtaURLFull})**`;
																	}
																	else if (lang === "tw") {
																			return `\n** [更多細節](${gtaURLFull})**`;
																	}
																	else if (lang === "jp") {
																			return `\n** [さらに詳しく](${gtaURLFull})**`;
																	}
																	else if (lang === "kr") {
																			return `\n** [자세한 내용은](${gtaURLFull})**`;
																	}
																	else {
																			return `\n** [More Details](${gtaURLFull})**`;
																	}					
																}			
												        function gtaFooterMin() {
												            if (gtaFinalString.length < (4000 - constChars)) {
												                return footerText();
												            } else {
												                return "";
												            }
												        }
												        function gtaFooterMax() {
												            if (gtaFinalString.length >= (4000 - constChars)) {
												                return footerText();
												            } else {
												                return "";
												            }
												        }

                                constChars += (gtaFooterMin().length) + (ellipsisFunction().length);
                                var gtaNewlines = gtaFinalString.substr(0, (4000 - constChars)).split("\n\n");
                                var tempString = gtaNewlines[gtaNewlines.length - 1];
                                function bestBreak() {
                                    if (gtaFinalString.length <= (4000 - constChars)) {
                                        return (gtaFinalString.length);
                                    }
                                    return (4000 - constChars - tempString.length);
                                }
                                //console.log(`bestBreak: ${bestBreak()}`);

                                var constChars1 = (gtaFooterMax().length) + (ellipsisFunction().length) + (ellipsisFunction2().length) + gtaImage.length;
                                var gtaNewlines1 = gtaFinalString.substr(bestBreak(), (6000 - constChars - constChars1 - bestBreak())).split("\n");
                                var tempString1 = gtaNewlines1[gtaNewlines1.length - 1];
                                function bestEndBreak() {
                                    if (gtaFinalString.length <= (6000 - constChars - constChars1)) {
                                        return gtaFinalString.length;
                                    }
                                    return (6000 - bestBreak() - constChars - constChars1 - tempString1.length); //removes the last bonus if over 6000 chars
                                }
                                //console.log(`bestEndBreak:${bestEndBreak()}`);

                                gtaPost = gtaFinalString.slice(0, (bestBreak()));
                                //console.log(`gtaPost.length:${gtaPost.length || 0}`);
                                function gtaPost2() {
                                    if (gtaPost.length < gtaFinalString.length) {
                                        let post02 = gtaFinalString.substr((bestBreak()), (bestEndBreak()));
                                        return post02;
                                    } else {
                                        return "";
                                    }
                                }
                                //console.log(`gtaPost2().length:${gtaPost2().length || 0}`);

                                let gtaEmbed = new EmbedBuilder()
                                    .setColor(0x00CD06) //Green
                                    .setTitle(`${gtaMainTitle}`)
                                    .setDescription(`${gtaPost}${gtaFooterMin()}${ellipsisFunction()}`)
                                let gtaEmbed2 = new EmbedBuilder()
                                    .setColor(0x00CD06) //Green
                                    .setDescription(`${ellipsisFunction()} \n${gtaPost2()} ${ellipsisFunction2()}${gtaFooterMax()}`)
                                let gtaImageEmbed = new EmbedBuilder()
                                    .setColor(0x00CD06) //Green
                                    .setImage(`${gtaImage}`);

                                //console.log(`gtaFinal.l: ${gtaFinal.length}`);


                                //-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//
                                //-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//		
                                //-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//

                                //console.log(`channelIDArray[c] at c${c}: ${channelIDArray[c]}`);
                                //console.log(`gtaFinalString.length: ${gtaFinalString.length}`)
                                if (channelIDArray[c].includes("undefined")) { return; }
                                else {
                                    if (gtaFinalString.length < (4000 - constChars)) {
                                        client.channels.fetch(channelIDArray[c]).then(channel => channel.send(({ embeds: [gtaImageEmbed, gtaEmbed] }))).then(c++).catch(err => console.log(`Min Error: ${err.stack}\nChannel ID: ${channelIDArray[c]}`));
                                    }
                                    else {
                                        client.channels.fetch(channelIDArray[c]).then(channel => channel.send({ embeds: [gtaImageEmbed, gtaEmbed, gtaEmbed2] })).then(c++).catch(err => console.log(`Max Error: ${err.stack}\nChannel ID: ${channelIDArray[c]}`));
                                    }
                                } //end if not undefined channel
                            }
                        }
                    });
                }
            }) //end fs. readFile for LANGDataBase
        }, {
            scheduled: true,
            timezone: "America/Denver"
        })
    },
}