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
        cron.schedule('52 17 * * 3', () => { //(second),minute,hour,date,month,weekday '0 12 * * 4' = 12:00 PM on Thursday
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
                            console.log(`channelIDs: ${channelIDLength.length - 3}`); //do not comment out
                            //console.log(`rdo_gtaIDs: ${rdo_gtaIDs}`);

                            let guildIDsArray = guildIDs.split('  - ');
                            guildIDsArray.shift(); //removes the undefined element
                            let channelIDArray = channelIDs.split('  - ');
                            channelIDArray.shift(); //removes the undefined element
                            let guildLangs = guildIDLangArray.join(` - `);
                            //console.log(`guildIDsArray: ${guildIDsArray}`);
                            //console.log(`guildIDLangArray: ${guildIDLangArray}`);
                            //console.log(`channelIDArray: ${channelIDArray}`);

                          	c = -1;
														async function sendPosts() {
                            if (c <= channelIDArray.length - 3) { //first & last 3 elements will always be undefined	
                                let lang = "";
																c++;

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
                                console.log(`lang: ${lang} - channelID: ${channelIDArray[c]} - ${c}/${channelIDArray.length - 2} - (${((c/(channelIDArray.length - 2))*100).toFixed(2)}%)`);

                                //----------END Formatting GuildIds, ChannelIds, rdo_gtaIDs, and language-----------//	


                                //Begin GTA Formatting		

                                var nextBonus01 = await NEXT_BONUS.nextBonus("gta");
                                var thisBonus01 = await THIS_BONUS.thisBonus("gta");
                                // console.log(`next Bonus: <t:${Math.round(nextBonus01 / 1000)}>`);

                                var gtaFetch = await fetch(process.env.gtaGraphURL, {
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

																function langFunction() {		
																	if (lang !== "") {
																		return `/${lang}`;
																	}
																	else {
																		return "";
																	}
																}	


                                var gtaImage = getgtaParse.data.posts.results[0].preview_images_parsed.newswire_block.d16x9;
                                	//console.log(`gtaImage: ${gtaImage}`);															
                                var gtaURLHash = getgtaParse.data.posts.results[0].id;
                                var gtaURLFull = `https://www.rockstargames.com${langFunction()}${getgtaParse.data.posts.results[0].url}`;
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
                                var thisBonus = Math.round((thisBonus01) / 1000) + 25200; // 2160 for daylight savings - 25200 for standard
                                var nextBonus = Math.round((nextBonus01) / 1000) - 54060; // minus 15.016 hours
                                // console.log(`thisBonus01: ${thisBonus01} - nextBonus01: ${nextBonus01}`);
                                // console.log(`thisBonus: ${thisBonus} - nextBonus: ${nextBonus}`);
                                gtaPost += `¶¶t:${thisBonus}:D∞∞ - ¶¶t:${nextBonus}:D∞∞\n\n• ${gtaSubTitle}\n\n`; //• ${gtaBlurb}\n\n

                                var allBonuses = gtaParse.data.post.tina.variables.keys;
                                var gtaBonus = Object.values(allBonuses);
                                var gtaPlusBonus = "";
                                var gtaPlusCount = 0;
                                var gtaPlusInsert = 0;
                                var gtaPlusBottom = 0;

                              function UpcomingPremiumCommandTitle() {
                                if (lang === "") {
                                    return "Upcoming Premium Command";
                                }
                                else if (lang === "es") {
                                    return "Próximo comando premium";
                                }
                                else if (lang === "pt") {
                                    return `Próximo Comando Premium`;
                                }
                                else if (lang === "ru") {
                                    return `Предстоящая премиум-команда`;
                                }
                                else if (lang === "de") {
                                    return `Kommendes Premium-Kommando`;
                                }
                                else if (lang === "pl") {
                                    return `Nadchodzące polecenie premium`;
                                }
                                else if (lang === "fr") {
                                    return `Commande Premium à venir`;
                                }
                                else if (lang === "it") {
                                    return `Prossimo comando Premium`;
                                }
                                else if (lang === "CN") {
                                    return `即将推出的高级命令`;
                                }
                                else if (lang === "TW") {
                                    return `即將推出的進階命令`;
                                }
                                else if (lang === "ja") {
                                    return `今後のプレミアム コマンド`;
                                }
                                else if (lang === "ko") {
                                    return `다가오는 프리미엄 사령부`;
                                }
                                else {
                                    return `Upcoming Premium Command`;
                                }
                              }

                              function UpcomingPremiumCommandDesc() {
                                if (lang === "") {
                                    return "Starting in 2024, the /autopost command will require a subscription to the Rockstar Weekly bot's premium service.";
                                }
                                else if (lang === "es") {
                                    return "A partir de 2024, el comando /publicaciones-automáticas requerirá una suscripción al servicio premium del bot Rockstar Weekly.";
                                }
                                else if (lang === "pt") {
                                    return `A partir de 2024, o comando /postagens-automáticas exigirá uma assinatura do serviço premium do bot Rockstar Weekly.`;
                                }
                                else if (lang === "ru") {
                                    return `Начиная с 2024 года для команды /автопубликации потребуется подписка на премиум-сервис бота Rockstar Weekly.`;
                                }
                                else if (lang === "de") {
                                    return `Ab 2024 erfordert der Befehl /automatische-veröffentlichung ein Abonnement des Premium-Dienstes des Rockstar Weekly-Bots.`;
                                }
                                else if (lang === "pl") {
                                    return `Od 2024 r. polecenie /zautomatyzowane-wiadomości będzie wymagało subskrypcji usługi premium bota Rockstar Weekly.`;
                                }
                                else if (lang === "fr") {
                                    return `À partir de 2024, la commande /messages-automatisés nécessitera un abonnement au service premium du robot Rockstar Weekly.`;
                                }
                                else if (lang === "it") {
                                    return `A partire dal 2024, il comando /messaggi-automatici richiederà un abbonamento al servizio premium del bot Rockstar Weekly.`;
                                }
                                else if (lang === "CN") {
                                    return `从 2024 年开始，/自动消息 命令将需要订阅 Rockstar Weekly 机器人的高级服务。`;
                                }
                                else if (lang === "TW") {
                                    return `從 2024 年開始，/自動消息 指令將需要訂閱 Rockstar Weekly 機器人的高級服務。`;
                                }
                                else if (lang === "ja") {
                                    return `2024 年以降、/自動メッセージ コマンドには Rockstar Weekly ボットのプレミアム サービスへのサブスクリプションが必要になります。`;
                                }
                                else if (lang === "ko") {
                                    return `2024년부터 /자동화된-메시지 명령을 사용하려면 Rockstar Weekly 봇의 프리미엄 서비스에 가입해야 합니다.`;
                                }
                                else {
                                    return `Starting in 2024, the /autopost command will require a subscription to the Rockstar Weekly bot's premium service.`;
                                }
                              }

												        //START Populating gtaPost
                                gtaPlusBonus += `${UpcomingPremiumCommandTitle()}\n${UpcomingPremiumCommandDesc()}\n`;
																var misplacedBonus = "";
																var misplacedDiscount = "";
																var misplacedDiscounts = "";
																var misplacedDiscountsTitle = ""
																var discountArray = ['DISCOUNTS', "DESCUENTOS", "DESCONTOS", "СКИДКИ", "RABATTE", "ZNIŻKI", "PROMOTIONS", "SCONTI", "折扣", "折扣", "割引", "할인"];
																var noBonusArray = ["1.5X", "1.5x", "1,5X", "1,5x", "2X", "2x", "2.5X", "2.5x", "2,5X", "2,5x", "3X", "3x", "4X", "4x", "40%", "40 %", "50%", "50 %", "Double", "Doble", "Triple", "RDO$", "Вдвое", "Втрое", "GTA$", "Gains"];	
																var noBonus = [];
												        for (var k = 2; k <= gtaBonus.length - 1; k++) { //first bonus is the subtitle and blurb, last bonus is the gun van inventory discounts
																			//console.log(`${k}: \n${JSON.stringify(gtaBonus[k])}\n`);
																		if ((gtaBonus[k].badge !== undefined) && (gtaBonus[k].badge !== null)) {
																			var joinTitle = gtaBonus[k].badge.split(" ")[0]; //first word of badge
																			if (noBonusArray.indexOf(joinTitle) >= 0) {
																				noBonus.push(k+1);
																			}
																		}
																		if ((gtaBonus[k].text !== undefined) && (gtaPlusCount !== 1)) { //gta+ top
																				gtaPlusBonus += `\n**${gtaBonus[k].text}**\n`;
																				gtaPlusCount++;
																				gtaPlusInsert = gtaPost.length;
																				gtaPlusBottom = k + 1;
																				gtaPlusBonuses = 3; // 0 is title, 1 is bottom text, 2 is headline
																				if (gtaBonus[k+gtaPlusBonuses] !== undefined) {
																					//console.log(`${k}: gtaPlusBonuses ${gtaPlusBonuses}: ${gtaBonus[k+gtaPlusBonuses].content}`);
																					if (gtaBonus[k+gtaPlusBonuses] !== undefined) {
																						while (gtaBonus[k+gtaPlusBonuses].content !== undefined) {
																							gtaPlusBonus += `• ${gtaBonus[k+gtaPlusBonuses].content}\n`;
																							noBonus.push(k+gtaPlusBonuses);
																							gtaPlusBonuses++;
																							// console.log(`noBonus: ${noBonus}`);
																							// noBonus.pop(); //allows the discounts and denies the gta+ bonuses
																							// console.log(`noBonus2: ${noBonus}`);		
																						}
																					}
																				}
																		}
																		if (gtaBonus[k].title !== undefined) {
																			if (discountArray.indexOf(gtaBonus[k].title) >= 0) {
																				misplacedDiscount = gtaPost.length;
																				misplacedDiscountsTitle += `\n**${gtaBonus[k].title}**`;
																			}
																			else {
																				gtaPost += `\n**${gtaBonus[k].title}**\n`; 
																				var joinTitle = gtaBonus[k].title.split(" ")[0]; //first word of title
																				if (noBonusArray.indexOf(joinTitle) >= 0) {
																					noBonus.push(k+1);
																				}									
																			}						
																		}
																		if (gtaBonus[k].title_and_description !== undefined) {
																			gtaPost += `\n**${gtaBonus[k].title_and_description.title}**${gtaBonus[k].title_and_description.description}\n\n`;
																		}																		
																		if (gtaBonus[k].description !== undefined) {
																				gtaPost += `• ${gtaBonus[k].description}\n`;
																		}
																		if ((gtaBonus[k].content !== undefined) && (noBonus.indexOf(k) < 0)) { //adds description if not a 2x, 3x, etc bonus
																				if (gtaBonus[k].content.includes("<li>")) {
																					if (gtaBonus[k].content.split("<li>").length <= 6) {
																						gtaPost += `• ${gtaBonus[k].content}\n`;
																					}
																					else {
																						misplacedDiscounts += `• ${gtaBonus[k].content}\n`;
																					}
																				}
																			else {
                                        if (gtaBonus[k].content.length < 650) {
																				gtaPost += `• ${gtaBonus[k].content}\n`;
                                        }}
																		}		
												        }
												        //END for loop
												
																function gtaPlus() {
																		gtaPlusBonus += `${gtaBonus[gtaPlusBottom].text}\n`; //adds the GTA+ bottom text
																		var gtaPost1 = gtaPost.slice(0, gtaPlusInsert);
																		var gtaPost2 = gtaPost.slice(gtaPlusInsert, gtaPost.length);
																		gtaPost = gtaPost1 + gtaPlusBonus + gtaPost2;
																}
																gtaPlus();
	
																	//console.log(`misplacedDiscount: ${misplacedDiscount}\n misplacedDiscounts:${misplacedDiscounts}`)
																// if (misplacedDiscount !== "") { //adds misplaced discounts
																// 	gtaPost += `${misplacedDiscountsTitle}\n${misplacedDiscounts}`;
																// }	
																// if (gtaBonus[gtaBonus.length - 1].content !== undefined) { //adds the gun van inventory discounts
																// 	gtaPost += `${gtaBonus[gtaBonus.length - 1].content}\n`;
																// }																				

				                        function replaceLinks() {
																	var gtaLinks = /<a href=\".*?<\/a>/g;
																	for (const match of gtaPost.matchAll(gtaLinks)) {
																		//console.log(match[0]);
																		var gtaLinkURL2 = match[0].toString().split("href=\"");
																		for (var j = 0; j <= gtaLinkURL2.length - 1; j++) { //iterates through all the links
																			var gtaLinkURL1 = gtaLinkURL2[j].split("\">");
																			if (gtaLinkURL1[1] !== undefined) {
																				var gtaLinkTitle1 = gtaLinkURL1[1].split("</a");
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
                                        client.channels.fetch(channelIDArray[c]).then(channel => channel.send(({ embeds: [gtaImageEmbed, gtaEmbed] }))).catch(err => console.log(`Min Error: ${err.stack}\nChannel ID: ${channelIDArray[c]}`));
                                    }
                                    else {
                                        client.channels.fetch(channelIDArray[c]).then(channel => channel.send({ embeds: [gtaImageEmbed, gtaEmbed, gtaEmbed2] })).catch(err => console.log(`Max Error: ${err.stack}\nChannel ID: ${channelIDArray[c]}`));
                                    }
                                } //end if not undefined channel
                            }
														
														}
														setInterval(sendPosts, 5000); //prevents 429 errors
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