const { EmbedBuilder } = require('discord.js');
var cron = require('node-cron'); //https://github.com/node-cron/node-cron
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const fetch = require("@replit/node-fetch");
const NEXT_BONUS = require("../events/nextBonus.js");
const THIS_BONUS = require("../events/thisBonus.js");

module.exports = {
    name: 'ready',
    async execute(client) {

        cron.schedule('45 14 1-7 * 2', () => { //(second),minute,hour,date,month,weekday '45 14 1-7 * 2' = 2:45 PM on 1st Tuesday
            console.log('Sending RDO Auto Posts...');

            fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
                if (err) { console.log(`Error: ${err}`) }
                else {
                    let lang03 = data.split("lang:");
                    //console.log(`lang03.length: ${lang03.length}`);

                    let langArray = [];
                    for (i = 2; i <= lang03.length - 1; i++) { //first language will always be undefined
                        let lang02 = lang03[i].split(" -");
                        //console.log(`lang02 at ${i}: ${lang02}`);

                        let lang01 = lang02[0];
                        //console.log(`lang01 at ${i}: ${lang01}`);

                        langArray.push(lang01);
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
                    fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
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
                            for (i = 1; i <= rdo_gtaIDs01.length - 1; i++) {
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

                            }

                            //console.log(`guildIDs: ${guildIDs}`);
                            //console.log(`channelIDs: ${channelIDs.length}`); //do not comment out
                            //console.log(`rdo_gtaIDs: ${rdo_gtaIDs}`);

                            let guildIDsArray = guildIDs.split('  - ');
                            guildIDsArray.shift(); //removes the undefined element
                            let channelIDArray = channelIDs.split('  - ');
                            channelIDArray.shift(); //removes the undefined element
                            let guildLangs = guildIDLangArray.join(` - `);
                            //console.log(`guildIDsArray: ${guildIDsArray}`);
                            //console.log(`guildIDLangArray: ${guildIDLangArray}`);
                            console.log(`channelIDArray length: ${channelIDArray.length}`);
                          var c = 0;
													async function sendPosts() {
                            if (c <= channelIDArray.length - 2) { //first & last elements will always be undefined	
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
                                console.log(`lang: ${lang} - ID: ${channelIDArray[c]}`);

                                //----------END Formatting GuildIds, ChannelIds, and rdo_gtaIDs-----------//	



                                //Begin RDO Formatting	
                                var nextBonus01 = await NEXT_BONUS.nextBonus("rdo");
                                var thisBonus01 = await THIS_BONUS.thisBonus("rdo");
                                // console.log(`next Bonus: <t:${Math.round(nextBonus01 / 1000)}>`);

                                var rdoFetch = await fetch(process.env.rdoGraphURL, {
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

                                var getrdoJSON01 = await rdoFetch.json();
                                var getrdoJSON = JSON.stringify(getrdoJSON01);
                                var getrdoParse = JSON.parse(getrdoJSON);
                                //console.log(getrdoJSON);

                                function langFunction() {		
																	if (lang !== "") {
																		return `/${lang}`;
																	}
																	else {
																		return "";
																	}
																}
                                function gold() {
                                    if (lang === "en") {
                                        return "Gold Bars";
                                    }
                                    if (lang === "es") {
                                        return "lingotes de oro";
                                    }
                                    if (lang === "br") {
                                        return "Barras de Ouro";
                                    }
                                    if (lang === "ru") {
                                        return "золотых слитков";
                                    }
                                    if (lang === "de") {
                                        return "Goldbarren";
                                    }
                                    if (lang === "pl") {
                                        return "sztabek złota";
                                    }
                                    if (lang === "fr") {
                                        return "lingots d'or";
                                    }
                                    if (lang === "it") {
                                        return "Lingotti d'Oro";
                                    }
																		if (lang === "zh") {
                                        return "金条";
                                    }
                                    if (lang === "tw") {
                                        return "金條";
                                    }
                                    if (lang === "jp") {
                                        return "格のゴールド バー";
                                    }
                                    if (lang === "kr") {
                                        return "금괴";
                                    }
                                    else {
                                        return "Gold Bars";
                                    }
                                }
																function free() {
                                    if (lang === "en") {
                                        return "Free";
                                    }
                                    if (lang === "es") {
                                        return "Gratis";
                                    }
                                    if (lang === "br") {
                                        return "Livre";
                                    }
                                    if (lang === "ru") {
                                        return "Бесплатно";
                                    }
                                    if (lang === "de") {
                                        return "Frei";
                                    }
                                    if (lang === "pl") {
                                        return "Bezpłatny";
                                    }
                                    if (lang === "fr") {
                                        return "Gratuite";
                                    }
                                    if (lang === "it") {
                                        return "Gratuita";
                                    }
																		if (lang === "zh") {
                                        return "自由的";
                                    }
                                    if (lang === "tw") {
                                        return "自由的";
                                    }
                                    if (lang === "jp") {
                                        return "無料";
                                    }
                                    if (lang === "kr") {
                                        return "무료";
                                    }
                                    else {
                                        return "Free";
                                    }
																}																
                                function discounts() {
                                    if (lang === "en") {
                                        return "Discounts";
                                    }
                                    if (lang === "es") {
                                        return "Descuentos";
                                    }
                                    if (lang === "br") {
                                        return "Descontos";
                                    }
                                    if (lang === "ru") {
                                        return "Скидки";
                                    }
                                    if (lang === "de") {
                                        return "Rabatte";
                                    }
                                    if (lang === "pl") {
                                        return "Zniżki";
                                    }
                                    if (lang === "fr") {
                                        return "Promotions";
                                    }
                                    if (lang === "it") {
                                        return "Sconti";
                                    }
																		if (lang === "zh") {
                                        return "折扣优惠";
                                    }
                                    if (lang === "tw") {
                                        return "折扣優惠";
                                    }
                                    if (lang === "jp") {
                                        return "割引";
                                    }
                                    if (lang === "kr") {
                                        return "할인";
                                    }
                                    else {
                                        return "Discounts";
                                    }
                                }

																function latestBonus() {
																	var rdoCheckDate = new Date(getrdoParse.data.posts.results[0].created_formatted).toString().substring(0, 3);
																	var rdoCheckTime = new Date(getrdoParse.data.posts.results[0].created).toString().includes("10:00");
																	if ((rdoCheckDate !== "Tue") || (rdoCheckTime === false)) { //if post 0 is not a weekly bonus check post 1
																		var rdoCheckDate2 = new Date(getrdoParse.data.posts.results[1].created_formatted).toString().substring(0, 3);
																		var rdoCheckTime2 = new Date(getrdoParse.data.posts.results[0].created).toString().includes("10:00");						
																		if ((rdoCheckDate2 !== "Tue") || (rdoCheckTime === false)) { //if post 1 is not a weekly bonus check post 2
																			var rdoCheckDate3 = new Date(getrdoParse.data.posts.results[2].created_formatted).toString().substring(0, 3);
																			var rdoCheckTime3 = new Date(getrdoParse.data.posts.results[0].created).toString().includes("10:00");							
																			if ((rdoCheckDate3 !== "Tue") || (rdoCheckTime === false)) { //if post 2 is not a weekly bonus return post 3
																				return 3
																			}
																			else {
																				return 2;
																			}
																		}
																		else {
																			return 1;
																		}
																	}
																	else {
																		return 0;
																	}
																}															

                                var rdoImage = getrdoParse.data.posts.results[latestBonus()].preview_images_parsed.newswire_block.d16x9;
                                //console.log(`rdoImage: ${rdoImage}`);			
                                var rdoURLHash = getrdoParse.data.posts.results[latestBonus()].id;
                                var rdoURLFull = `https://www.rockstargames.com${langFunction()}${getrdoParse.data.posts.results[latestBonus()].url}`;
                                var fetchRDO = await fetch(`${process.env.rdoGraphURL3}${rdoURLHash}%22%2C%22locale%22%3A%22${lang}${process.env.rdoGraphURL4}`, {
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

                                var rdoPost = "";
                                var rdoJSON01 = await fetchRDO.json();
                                var rdoJSON = JSON.stringify(rdoJSON01);
                                var rdoParse = JSON.parse(rdoJSON);
                                //console.log(`rdoJSON: \n\n${rdoJSON}\n\n`);

												        var rdoMainTitle = rdoParse.data.post.title
												        var rdoSubTitle = rdoParse.data.post.subtitle;
												        var rdoDate = rdoParse.data.post.created_formatted;
												            //console.log(`rdoTitle: ${rdoTitle}\nrdoSubTitle: ${rdoSubTitle}\nrdoDate: ${rdoDate}`);
												        var thisBonus = Math.round((thisBonus01) / 1000) + 21600; // plus 6 hours
																if (thisBonus01.getDate() === nextBonus01.getDate()) { //same day
																	var nextBonus02 = nextBonus01.setMonth(8); //fixme next month
																	var nextBonus03 = new Date(nextBonus02).setDate(5); //fixme next month
																	var nextBonus = Math.round((nextBonus03) / 1000) - 54060;
																}
																else {
																	var nextBonus = Math.round((nextBonus01) / 1000) - 54060; // minus 15.016 hours
																}
												            // console.log(`thisBonus01: ${thisBonus01} - nextBonus01: ${nextBonus01}`);
												            // console.log(`thisBonus: ${thisBonus} - nextBonus: ${nextBonus}`);
												        rdoPost += `¶¶t:${thisBonus}:D∞∞ - ¶¶t:${nextBonus}:D∞∞\n\n• ${rdoSubTitle}\n\n`;

                                var allBonuses = rdoParse.data.post.tina.variables.keys;
                                var rdoBonus = Object.values(allBonuses);

                                var rdoDiscountPercent = [`-5 ${gold()}`, `-10 ${gold()}`, "-30%", "-40%", "-40%", "-30%", "-30%", "-30%", `-50%`, `-30%`]; //FIXME next month
                                var discountElementCount = 0;

                                //START Populating rdoPost
                                for (var i = 2; i <= rdoBonus.length - 1; i++) { //first bonus is the subtitle
                                    //console.log(`${JSON.stringify(rdoBonus[k])}\n\n`);
                                    var noBonusArray = ["1.5X", "1.5x", "1,5X", "1,5x", "2X", "2x", "2.5X", "2.5x", "2,5X", "2,5x", "3X", "3x", "4X", "4x", "40%", "40 %", "50%", "50 %", "Double", "Doble", "RDO$", "Вдвое"];
                                    if (rdoBonus[i].text !== undefined) {
                                        rdoPost += `\n**${rdoBonus[i].text}**\n`;
                                    }
                                    if (rdoBonus[i].content !== undefined) {
                                        rdoPost += `• ${rdoBonus[i].content}\n`;
                                    }
                                    if ((rdoBonus[i].title !== undefined) && ((rdoBonus[i].description !== undefined) || (rdoBonus[i].subtitle !== undefined))) { //adds a title if not a discount
                                        rdoPost += `\n**${rdoBonus[i].title}**\n`;
                                    }
                                    if ((rdoBonus[i].title !== undefined) && ((rdoBonus[i].description === undefined) && (rdoBonus[i].subtitle === undefined))) {
                                        if (discountElementCount === 0) {
                                            rdoPost += `\n**${discounts()}**\n`;
                                        }
                                        rdoPost += `${rdoDiscountPercent[discountElementCount]}: ${rdoBonus[i].title}\n`;
                                        discountElementCount++;
                                    }
                                    if (rdoBonus[i].description !== undefined) {
                                        if (rdoBonus[i].title !== undefined) { //do not add the description if 2x, 3x, 4x, etc... bonus
                                            var joinTitle = rdoBonus[i].title.split(" ")[0]; //first word of title
                                            if (noBonusArray.indexOf(joinTitle) >= 0) {
                                                i++;
                                            }
                                            else {
                                                rdoPost += `• ${rdoBonus[i].description}\n`;
                                            }
                                        }
                                        else {
                                            rdoPost += `• ${rdoBonus[i].description}\n`;
                                        }
                                    }
                                }
                                //END for loop

                                function replaceLinks() {
                                    var rdoLinks = /<a href=\".*?<\/a>/g;
                                    for (const match of rdoPost.matchAll(rdoLinks)) {
                                        //console.log(match[0]);
                                        var rdoLinkURL2 = match[0].toString().split("href=\"");
                                        for (var j = 0; j <= rdoLinkURL2.length - 1; j++) { //iterates through all the links
                                            var rdoLinkURL1 = rdoLinkURL2[j].split("\">");
                                            if (rdoLinkURL1[1] !== undefined) {
                                                var rdoLinkTitle1 = rdoLinkURL1[1].split("<");
                                                var rdoLinkTitle = rdoLinkTitle1[0];
                                                var rdoLinkURL = rdoLinkURL1[0];
                                                //console.log(`match[0]: ${match[0]} - rdoLinkTitle: ${rdoLinkTitle} - rdoLinkURL: ${rdoLinkURL}`);
                                                rdoPost = rdoPost.replace(match[0], `[${rdoLinkTitle}](${rdoLinkURL})`);
                                            }
                                        }
                                    }
                                }
                                replaceLinks();

                                var rdoReGex = /<.*?>/g;
                                var rdoFinalString = rdoPost
                                    .replace(/<br><br>/g, "\n• ") //adds a bullet for additional paragraphs
                                    .replace(/<li>/g, "\n• ") //adds a bullet point to list items
                                    .replace(/<h3>/g, "\n\n**") //adds a newline for missed titles
                                    .replace(/<\/h3>/g, "**\n• ") //adds a newline for missed titles
                                    .replace(rdoReGex, "") //removes all remaining HTML
                                    .replace(/\¶\¶/g, "<") //creates timestamps for thisBonus && nextBonus
                                    .replace(/\∞\∞/g, ">")//creates timestamps for thisBonus && nextBonus
                                    .replace(/• \n/g, "") //removes extra bullet points
                                    .replace(/\n\n\n/g, "\n\n") //removes excess newlines

                                //console.log(rdoFinalString);

                                var constChars = (rdoMainTitle.length);
                                function ellipsisFunction() {
                                    if (rdoFinalString.length >= (4000 - constChars)) {
                                        return "...";
                                    } else {
                                        return "";
                                    }
                                }
                                function ellipsisFunction2() {
                                    if (rdoFinalString.length >= (6000 - constChars - rdoImage.length)) {
                                        return "...\n";
                                    } else {
                                        return "";
                                    }
                                }
                                function footerText() {
                                    if (lang === "en") {
                                        return `\n** [More details](${rdoURLFull})**`;
                                    }
                                    else if (lang === "es") {
                                        return `\n** [Más detalles](${rdoURLFull})**`;
                                    }
                                    else if (lang === "br") {
                                        return `\n** [Mais detalhes](${rdoURLFull})**`;
                                    }
                                    else if (lang === "ru") {
                                        return `\n** [Подробнее](${rdoURLFull})**`;
                                    }
                                    else if (lang === "de") {
                                        return `\n** [Mehr Details](${rdoURLFull})**`;
                                    }
                                    else if (lang === "pl") {
                                        return `\n** [Więcej szczegółów](${rdoURLFull})**`;
                                    }
                                    else if (lang === "fr") {
                                        return `\n** [Plus de détails](${rdoURLFull})**`;
                                    }
                                    else if (lang === "it") {
                                        return `\n** [Più dettagli](${rdoURLFull})**`;
                                    }
																		else if (lang === "zh") {
                                        return `\n** [更多细节](${rdoURLFull})**`;
                                    }
                                    else if (lang === "tw") {
                                        return `\n** [更多細節](${rdoURLFull})**`;
                                    }
                                    else if (lang === "jp") {
                                        return `\n** [さらに詳しく](${rdoURLFull})**`;
                                    }
                                    else if (lang === "kr") {
                                        return `\n** [자세한 내용은](${rdoURLFull})**`;
                                    }
                                    else {
                                        return `\n** [More Details](${rdoURLFull})**`;
                                    }
                                }
                                function rdoFooterMin() {
                                    if (rdoFinalString.length < (4000 - constChars)) {
                                        return footerText();
                                    } else {
                                        return "";
                                    }
                                }
                                function rdoFooterMax() {
                                    if (rdoFinalString.length >= (4000 - constChars)) {
                                        return footerText();
                                    } else {
                                        return "";
                                    }
                                }

                                constChars += (rdoFooterMin().length) + (ellipsisFunction().length);
                                var rdoNewlines = rdoFinalString.substr(0, (4000 - constChars)).split("\n\n");
                                var tempString = rdoNewlines[rdoNewlines.length - 1];
                                function bestBreak() {
                                    if (rdoFinalString.length <= (4000 - constChars)) {
                                        return (rdoFinalString.length);
                                    }
                                    return (4000 - constChars - tempString.length);
                                }
                                //console.log(`bestBreak: ${bestBreak()}`);

                                var constChars1 = (rdoFooterMax().length) + (ellipsisFunction().length) + (ellipsisFunction2().length) + rdoImage.length;
                                var rdoNewlines1 = rdoFinalString.substr(bestBreak(), (6000 - constChars - constChars1 - bestBreak())).split("\n");
                                var tempString1 = rdoNewlines1[rdoNewlines1.length - 1];
                                function bestEndBreak() {
                                    if (rdoFinalString.length <= (6000 - constChars - constChars1)) {
                                        return rdoFinalString.length;
                                    }
                                    return (6000 - bestBreak() - constChars - constChars1 - tempString1.length); //removes the last bonus if over 6000 chars
                                }
                                //console.log(`bestEndBreak:${bestEndBreak()}`);

                                rdoPost = rdoFinalString.slice(0, (bestBreak()));
                                //console.log(`rdoPost.length:${rdoPost.length || 0}`);
                                function rdoPost2() {
                                    if (rdoPost.length < rdoFinalString.length) {
                                        let post02 = rdoFinalString.substr((bestBreak()), (bestEndBreak()));
                                        return post02;
                                    } else {
                                        return "";
                                    }
                                }
                                //console.log(`rdoPost2().length:${rdoPost2().length || 0}`);

                                let rdoEmbed = new EmbedBuilder()
                                    .setColor(0xC10000) //Red
                                    .setTitle(`${rdoMainTitle}`)
                                    .setDescription(`${rdoPost}${rdoFooterMin()}${ellipsisFunction()}`)
                                let rdoEmbed2 = new EmbedBuilder()
                                    .setColor(0xC10000) //Red
                                    .setDescription(`${ellipsisFunction()} \n${rdoPost2()} ${ellipsisFunction2()}${rdoFooterMax()}`)
                                let rdoImageEmbed = new EmbedBuilder()
                                    .setColor(0xC10000) //Red
                                    .setImage(`${rdoImage}`);

                                //console.log(`rdoFinal.l: ${rdoFinal.length}`);



                                //-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//
                                //-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//		
                                //-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//

                                //console.log(`channelIDArray length: ${channelIDArray.length}`);
                                //console.log(`channelIDArray: ${channelIDArray}`);
                                //console.log(`channelIDArray at c${c}: ${channelIDArray[c]}`);
                                if (channelIDArray[c].startsWith("undefined")) { }
                                else {
                                    if (rdoPost2() === "") {
                                        await client.channels.fetch(channelIDArray[c]).then(channel => channel.send(({ embeds: [rdoImageEmbed, rdoEmbed] }))).catch(err => console.log(`Min Error: ${err}\nChannel ID: ${channelIDArray[c]}`));
                                    }
                                    else {
                                        await client.channels.fetch(channelIDArray[c]).then(channel => channel.send({ embeds: [rdoImageEmbed, rdoEmbed, rdoEmbed2] })).catch(err => console.log(`Max Error: ${err}\nChannel ID: ${channelIDArray[c]}`));
                                    }
																	c++;
                                }
                            } //end c loop
													}
													setInterval(sendPosts, 5000); //prevents 429 errors
                        }
                    }); //end fs.readFile for RDODataBase?
                }
            }); //end fs.readFile for LANGDataBase
        }, {
            scheduled: true,
            timezone: "America/Denver"
        });


    }
}