const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fetch = require("@replit/node-fetch");
const LANG = require('../../events/LANG.js');
const NEXT_BONUS = require("../../events/nextBonus.js");
const THIS_BONUS = require("../../events/thisBonus.js");
let errorText = `There was an error while executing this command!\nThe error has been sent to the developer and it will be fixed as soon as possible. \nIf the error persists you can try re-inviting the Rockstar Weekly bot by [clicking here](<${process.env.invite_link}>). \nReport the error by joining the Rockstar Weekly bot support server: [click here](<${process.env.support_link}>).`;

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isButton()) { return };
        if (interaction.customId.startsWith(`gtaTest -`)) {

            let buttonUserID01 = (interaction.customId).split("gtaTest - ");
            let buttonUserID = buttonUserID01[1];
            //console.log(`start buttonUserID: ${buttonUserID}`);
            //console.log(`start interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`);
            //console.log(`start interaction.user.id: ${interaction.user.id} && buttonUserID: ${buttonUserID}`);	

            await interaction.deferUpdate();

            var lang = await LANG.LANG(interaction);
            //console.log(`LANG:${await LANG.LANG(interaction)}`);				

            function thinking() {
                if (lang === "") {
                    return `Thinking...`;
                }
                else if (lang === "es") {
                    return `Pensando...`;
                }
                else if (lang === "br") {
                    return `Pensamento...`;
                }
                else if (lang === "ru") {
                    return `мышление...`;
                }
                else if (lang === "de") {
                    return `Ich denke...`;
                }
                else if (lang === "pl") {
                    return `Myślę...`;
                }
                else if (lang === "fr") {
                    return `Je pense...`;
                }
                else if (lang === "it") {
                    return `Pensando...`;
                }
								else if (lang === "zh") {
                    return `我在想...`;
                }
								else if (lang === "tw") {
                    return `我在想...`;
                }
                else if (lang === "jp") {
                    return `考えています...`;
                }
                else if (lang === "kr") {
                    return `나는 생각 중입니다...`;
                }
                else {
                    return `Thinking...`;
                }
            }


            function testGTAButtonString() {
                if (lang === "") {
                    return `Test GTA`;
                }
                else if (lang === "es") {
                    return `Prueba GTA`;
                }
                else if (lang === "br") {
                    return `Testar GTA`;
                }
                else if (lang === "ru") {
                    return `Тест GTA`;
                }
                else if (lang === "de") {
                    return `GTA testen`;
                }
                else if (lang === "pl") {
                    return `Testuj GTA`;
                }
                else if (lang === "fr") {
                    return `Tester GTA`;
                }
                else if (lang === "it") {
                    return `Prova GTA`;
                }
								else if (lang === "zh") {
                    return `测试 GTA`;
                }
                else if (lang === "tw") {
                    return `測試 GTA`;
                }
                else if (lang === "jp") {
                    return `テストGTA`;
                }
                else if (lang === "kr") {
                    return `테스트 GTA`;
                }
                else {
                    return `Test GTA`;
                }
            }

            function testRDOButtonString() {
                if (lang === "") {
                    return `Test RDO`;
                }
                else if (lang === "es") {
                    return `Prueba RDO`;
                }
                else if (lang === "br") {
                    return `Testar RDO`;
                }
                else if (lang === "ru") {
                    return `Тест RDO`;
                }
                else if (lang === "de") {
                    return `RDO testen`;
                }
                else if (lang === "pl") {
                    return `Testuj RDO`;
                }
                else if (lang === "fr") {
                    return `Tester RDO`;
                }
                else if (lang === "it") {
                    return `Prova RDO`;
                }
								else if (lang === "zh") {
                    return `测试 RDO`;
                }
                else if (lang === "tw") {
                    return `測試 RDO`;
                }
                else if (lang === "jp") {
                    return `テストRDO`;
                }
                else if (lang === "kr") {
                    return `테스트 RDO`;
                }
                else {
                    return `Test RDO`;
                }
            }

            function goBack() {
                if (lang === "") {
                    return `Go Back`;
                }
                else if (lang === "es") {
                    return `Volver`;
                }
                else if (lang === "br") {
                    return `Voltar`;
                }
                else if (lang === "ru") {
                    return `Вернуться`;
                }
                else if (lang === "de") {
                    return `Zurück`;
                }
                else if (lang === "pl") {
                    return `wróć`;
                }
                else if (lang === "fr") {
                    return `Retournez`;
                }
                else if (lang === "it") {
                    return `Torna all'ultima`;
                }
								else if (lang === "zh") {
                    return `回去`;
                }
                else if (lang === "tw") {
                    return `回去`;
                }
                else if (lang === "jp") {
                    return `戻る`;
                }
                else if (lang === "kr") {
                    return `돌아가다`;
                }
                else {
                    return `Go Back`;
                }
            }

            // const thinkingEmbed = new EmbedBuilder()
            // 	.setColor(0x00CD06) //Green
            // 	.setDescription(`${thinkingDesc()}`);		

            fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
                if (err) { console.log(`Error: ${err}`) }
                else {

                    var rdoChannelIds = [];
                    interaction.guild.channels.cache.forEach(channel => {
                        if (data.includes(channel.id)) {
                            rdoChannelIds.push(channel.id);
                        }
                    });
                    //console.log(`rdoChannelIds: ${rdoChannelIds}`);

                    rdoDisabled = false;
                    if (rdoChannelIds[0] === undefined) {
                        rdoDisabled = true;
                    }

                    const thinkingButtons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`thinking - ${interaction.user.id}`)
                                .setLabel(`${thinking()}`)
                                .setStyle(ButtonStyle.Success)
                                .setDisabled(true),
                            new ButtonBuilder()
                                .setCustomId(`rdoTest - ${buttonUserID}`)
                                .setLabel(`${testRDOButtonString()}`)
                                .setStyle(ButtonStyle.Danger)
                                .setDisabled(rdoDisabled),
                            new ButtonBuilder()
                                .setCustomId(`confirmback - ${buttonUserID}`)
                                .setLabel(`${goBack()}`)
                                .setStyle(ButtonStyle.Secondary),
                        );

                    interaction.editReply({ components: [thinkingButtons], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));

                }
            }); //end fs.readFile for RDODataBase.txt


            //END THINKING BUTTONS					

            fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
                if (err) { console.log(`Error: ${err}`) }
                else {

                    //console.log(`data: ${data}`);
                    let guildIDs01 = data.split(`guild:${interaction.guild.id} - `);
                    //console.log(`guildIDs01[1]: ${guildIDs01[1]}\n`);
                    //console.log(`guildIDs01[2]: ${guildIDs01[2]}\n`);

                    let channelIDs01 = data.split(`guild:${interaction.guild.id} - channel:`);
                    //console.log(`channelIDs01[1]: ${channelIDs01[1]}\n`);		
                    //console.log(`channelIDs01[2]: ${channelIDs01[2]}\n`);	

                    let rdo_gtaIDs01 = data.split("rdo_gta:");
                    //console.log(`rdo_gtaIDs01[1]: ${rdo_gtaIDs01[1]}\n`);		
                    //console.log(`rdo_gtaIDs01[2]: ${rdo_gtaIDs01[2]}\n`);	

                    let guildIDs = [];
                    let channelIDs = [];
                    let rdo_gtaIDs = [];
                    for (i = 1; i <= guildIDs01.length - 1; i++) {
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
                    //console.log(`channelIDs: ${channelIDs}`); //do not comment out - no idea why
                    //console.log(`rdo_gtaIDs: ${rdo_gtaIDs}`);
                    //----------END Formatting GuildIds, ChannelIds, and rdo_gtaIDs-----------//	



                    var sentPostDescString = "_ _";
                    async function gtaTest() {

                        //-------------------Begin GTA TEST POST---------------------//						

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

												function latestBonus() {
													var gtaCheckDate = new Date(getgtaParse.data.posts.results[0].created_formatted).toString().substring(0, 3);
													var gtaCheckTime = new Date(getgtaParse.data.posts.results[0].created).toString().includes("10:00");
													if ((gtaCheckDate !== "Thu") || (gtaCheckTime === false)) { //if post 0 is not a weekly bonus check post 1
														var gtaCheckDate2 = new Date(getgtaParse.data.posts.results[1].created_formatted).toString().substring(0, 3);
														var gtaCheckTime2 = new Date(getgtaParse.data.posts.results[0].created).toString().includes("10:00");						
														if ((gtaCheckDate2 !== "Thu") || (gtaCheckTime === false)) { //if post 1 is not a weekly bonus check post 2
															var gtaCheckDate3 = new Date(getgtaParse.data.posts.results[2].created_formatted).toString().substring(0, 3);
															var gtaCheckTime3 = new Date(getgtaParse.data.posts.results[0].created).toString().includes("10:00");							
															if ((gtaCheckDate3 !== "Thu") || (gtaCheckTime === false)) { //if post 2 is not a weekly bonus return post 3
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

                        var gtaImage = getgtaParse.data.posts.results[latestBonus()].preview_images_parsed.newswire_block.d16x9;
                        //console.log(`gtaImage: ${gtaImage}`);									

                        var gtaURLHash = getgtaParse.data.posts.results[latestBonus()].id;
                        var gtaURLFull = `https://www.rockstargames.com${langFunction()}${getgtaParse.data.posts.results[latestBonus()].url}`;
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
                        	//var gtaBlurb = gtaParse.data.post.tina.variables.keys.meta.blurb;
                        var gtaDate = gtaParse.data.post.created_formatted;
                        //console.log(`gtaTitle: ${gtaTitle}\ngtaSubTitle: ${gtaSubTitle}\ngtaDate: ${gtaDate}`);
                        var thisBonus = Math.round((thisBonus01) / 1000) + 21600; // plus 6 hours
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

								        //START Populating gtaPost
												var misplacedBonus = "";
												var noBonusArray = ["1.5X", "1.5x", "1,5X", "1,5x", "2X", "2x", "2.5X", "2.5x", "2,5X", "2,5x", "3X", "3x", "4X", "4x", "40%", "40 %", "50%", "50 %", "Double", "Doble", "RDO$", "Вдвое", "GTA$", "Gains"];	
												var noBonus = [];
								        for (var k = 2; k <= gtaBonus.length - 2; k++) { //first bonus is the subtitle and blurb, last bonus is the gun van inventory discounts
															//console.log(`${k}: \n${JSON.stringify(gtaBonus[k])}`);
														if ((gtaBonus[k].badge !== undefined) && (gtaBonus[k].badge !== null)) {
															var joinTitle = gtaBonus[k].badge.split(" ")[0]; //first word of badge
															if (noBonusArray.indexOf(joinTitle) >= 0) {
																noBonus.push(k+1);
															}
														}
														if ((gtaBonus[k].text !== undefined) && (gtaPlusCount !== 1)){ //gta+ top
																gtaPlusBonus += `\n**${gtaBonus[k].text}**\n`;
																gtaPlusCount++;
																gtaPlusInsert = gtaPost.length;
																gtaPlusBottom = k + 1;
														}
														if (gtaBonus[k].title !== undefined) {
															gtaPost += `\n**${gtaBonus[k].title}**\n`; 
															var joinTitle = gtaBonus[k].title.split(" ")[0]; //first word of title
															if (noBonusArray.indexOf(joinTitle) >= 0) {
																noBonus.push(k+1);
															}							
														}
														if (gtaBonus[k].description !== undefined) {
																gtaPost += `• ${gtaBonus[k].description}\n`;
														}
														if ((gtaBonus[k].content !== undefined) && (noBonus.indexOf(k) < 0)) { //adds description if not a 2x, 3x, etc bonus
																gtaPost += `• ${gtaBonus[k].content}\n`;
														}
														if (gtaBonus[k].title_and_description !== undefined) { //DISCOUNTS
																if (gtaBonus[k].title_and_description.title !== undefined) {
																	gtaPost += `\n**${gtaBonus[k].title_and_description.title}**\n`;
																}
																if (gtaBonus[k].title_and_description.description !== undefined) {
																	gtaPost += `• ${gtaBonus[k].title_and_description.description}\n`;
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


                        var channelIDArray = channelIDs.split('  - ');
                        //console.log(`channelIDArray length: ${channelIDArray.length}`);
                        //console.log(`channelIDArray: ${channelIDArray}`);
                        for (c = 0; c <= channelIDArray.length - 2; c++) { //last element will always be blank
                            //console.log(`channelIDArray at ${c}: ${channelIDArray[c]}`);
                            if (channelIDArray[c].startsWith("undefined")) { return }

                            function permission() {
                                if (!(interaction.guild.members.me).permissionsIn(channelIDArray[c]).has(PermissionsBitField.Flags.ViewChannel)) { // missing all permissions - can't send messages or embed links without view permission
                                    if (lang === "") {
                                        return `View Channel, Send Messages, and Embed Links`;
                                    }
                                    if (lang === "es") {
                                        return `Ver canal y Enviar mensajes y Insertar enlaces`;
                                    }
                                    if (lang === "br") {
                                        return `Ver canal e Enviar mensagens e Inserir links`;
                                    }
                                    if (lang === "ru") {
                                        return `Посмотреть каналa и Отправить сообщения и Вставить ссылки`
                                    }
                                    if (lang === "de") {
                                        return `Kanal anzeigen-Berechtigung und Nachrichten senden-Berechtigung und Links einbetten-Berechtigung`;
                                    }
                                    else if (lang === "pl") {
                                        return `Wyswietlanie kanalu, Wysykanie wiadomosci i Wyswietlanie podgladu linku`;
                                    }
                                    else if (lang === "fr") {
                                        return `Voir le salon, Envoyer des messages et intégrer des liens`;
                                    }
                                    else if (lang === "it") {
                                        return `Visualizzare il canale, Inviare i messaggi e Incorporare i link`;
                                    }
																		else if (lang === "zh") {
                                        return `查看频道、发送消息、嵌入链接`;
                                    }
                                    else if (lang === "tw") {
                                        return `查看頻道、發送消息、嵌入鏈接`;
                                    }
                                    else if (lang === "jp") {
                                        return `チャンネルを見る、メッセージを送信、埋め込みリンク`;
                                    }
                                    else if (lang === "kr") {
                                        return `채널 보기、 메시지 보내기、 링크 첨부`;
                                    }
                                    else {
                                        return `View Channel, Send Messages, and Embed Links`;
                                    }
                                }
                                else if (!((interaction.guild.members.me).permissionsIn(channelIDArray[c]).has(PermissionsBitField.Flags.EmbedLinks))) {
                                    if (lang === "") {
                                        return `Embed Links`;
                                    }
                                    if (lang === "br") {
                                        return `Inserir links`;
                                    }
                                    if (lang === "es") {
                                        return `Insertar enlaces`;
                                    }
                                    if (lang === "ru") {
                                        return `Вставить ссылки`
                                    }
                                    if (lang === "de") {
                                        return `Links einbetten-Berechtigung`;
                                    }
                                    else if (lang === "pl") {
                                        return `Wyswietlanie podgladu linku`;
                                    }
                                    else if (lang === "fr") {
                                        return `Intégrer des liens`;
                                    }
                                    else if (lang === "it") {
                                        return `Incorporare i link`;
                                    }
																		else if (lang === "zh") {
                                        return `嵌入链接`;
                                    }
                                    else if (lang === "tw") {
                                        return `嵌入鏈接`;
                                    }
                                    else if (lang === "jp") {
                                        return `埋め込みリンク`;
                                    }
                                    else if (lang === "kr") {
                                        return `링크 첨부`;
                                    }
                                    else {
                                        return `Embed Links`;
                                    }
                                }
                                else if (!(interaction.guild.members.me).permissionsIn(channelIDArray[c]).has(PermissionsBitField.Flags.SendMessages)) { //missing send messages also prevents embedding links
                                    if (lang === "") {
                                        return `Send Messages and Embed Links`;
                                    }
                                    if (lang === "es") {
                                        return `Enviar mensajes y Insertar enlaces`;
                                    }
                                    if (lang === "br") {
                                        return `Enviar mensagens e Inserir links`;
                                    }
                                    if (lang === "ru") {
                                        return `Отправить сообщения и Вставить ссылки`
                                    }
                                    if (lang === "de") {
                                        return `Nachrichten senden-Berechtigung und Links einbetten-Berechtigung`;
                                    }
                                    else if (lang === "pl") {
                                        return `Wysykanie wiadomosci i Wyswietlanie podgladu linku`;
                                    }
                                    else if (lang === "fr") {
                                        return `Envoyer des messages et intégrer des liens`;
                                    }
                                    else if (lang === "it") {
                                        return `Inviare i messaggi e Incorporare i link`;
                                    }
																		else if (lang === "zh") {
                                        return `发送消息 和 嵌入链接`;
                                    }
                                    else if (lang === "tw") {
                                        return `發送消息 和 嵌入鏈接`;
                                    }
                                    else if (lang === "jp") {
                                        return `メッセージを送信 と 埋め込みリンク`;
                                    }
                                    else if (lang === "kr") {
                                        return `메시지 보내기 그리고 링크 첨부`;
                                    }
                                    else {
                                        return `Send Messages and Embed Links`;
                                    }
                                }

                            }	//end permission() function	

                            function sentPostDesc() {
                                if (permission() === undefined) {
                                    if (lang === "") {
                                        return `• A post has been sent to <#${channelIDArray[c]}>!\n`;
                                    }
                                    else if (lang === "es") {
                                        return `• El mensaje ha sido enviado a <#${channelIDArray[c]}>.\n`;
                                    }
                                    else if (lang === "br") {
                                        return `• Uma mensagem foi enviada para <#${channelIDArray[c]}>.\n`;
                                    }
                                    else if (lang === "ru") {
                                        return `• Cообщение было отправлено на <#${channelIDArray[c]}>.\n`;
                                    }
                                    else if (lang === "de") {
                                        return `• Eine Nachricht wurde an <#${channelIDArray[c]}> gesendet.\n`;
                                    }
                                    else if (lang === "pl") {
                                        return `• Wiadomość została wysłana do <#${channelIDArray[c]}>.`;
                                    }
                                    else if (lang === "fr") {
                                        return `• Un message a été envoyé à <#${channelIDArray[c]}>.`;
                                    }
                                    else if (lang === "it") {
                                        return `• Un messaggio è stato inviato a <#${channelIDArray[c]}>.`;
                                    }
																		else if (lang === "zh") {
                                        return `• 消息已发送至<#${channelIDArray[c]}>。`;
                                    }
                                    else if (lang === "tw") {
                                        return `• 消息已發送至<#${channelIDArray[c]}>。`;
                                    }
                                    else if (lang === "jp") {
                                        return `• メッセージが <#${channelIDArray[c]}> チャネルに送信されました。`;
                                    }
                                    else if (lang === "kr") {
                                        return `• 메시지가 <#${channelIDArray[c]}>로 전송되었습니다.`;
                                    }
                                    else {
                                        return `• A post has been sent to <#${channelIDArray[c]}>!\n`;
                                    }
                                } else {
                                    if (lang === "") {
                                        return `• The bot is missing the ${permission()} permission in <#${channelIDArray[c]}>.\n`;
                                    }
                                    else if (lang === "es") {
                                        return `• Al bot le falta el permiso ${permission()} en <#${channelIDArray[c]}>.\n`;
                                    }
                                    else if (lang === "br") {
                                        return `• O bot está sem a permissão ${permission()} em <#${channelIDArray[c]}>.\n`;
                                    }
                                    else if (lang === "ru") {
                                        return `• У бота нет разрешения на ${permission()} в <#${channelIDArray[c]}>.\n`;
                                    }
                                    else if (lang === "de") {
                                        return `• Dem Bot fehlt die ${permission()} in <#${channelIDArray[c]}>.\n`;
                                    }
                                    else if (lang === "pl") {
                                        return `• Bot nie ma uprawnień ${permission()} w <#${channelIDArray[c]}>.\n`;
                                    }
                                    else if (lang === "fr") {
                                        return `• Le bot n'a pas l'autorisation ${permission()} dans <#${channelIDArray[c]}>.\n`;
                                    }
                                    else if (lang === "it") {
                                        return `• Al bot manca l'autorizzazione ${permission()} in <#${channelIDArray[c]}>.\n`;
                                    }
																		else if (lang === "zh") {
                                        return `• 机器人缺少 <#${channelIDArray[c]}> 中的 ${permission()} 权限.\n`;
                                    }
                                    else if (lang === "tw") {
                                        return `• 機器人缺少 <#${channelIDArray[c]}> 中的 ${permission()} 權限.\n`;
                                    }
                                    else if (lang === "jp") {
                                        return `• ボットに <#${channelIDArray[c]}> の ${permission()} 権限がありません.\n`;
                                    }
                                    else if (lang === "kr") {
                                        return `• 봇에 <#${channelIDArray[c]}>의 ${permission()} 권한이 없습니다.\n`;
                                    }
                                    else {
                                        return `• The bot is missing the ${permission()} permission in <#${channelIDArray[c]}>.\n`;
                                    }
                                }
                            }
                            //console.log(`sentPostDesc() at c${c}: ${sentPostDesc()}`);
                            sentPostDescString += `${sentPostDesc()}`;

                            if ((interaction.guild.members.me).permissionsIn(channelIDArray[c]).has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.EmbedLinks])) {	//If the bot has all permissions
                                if (gtaFinalString.length < (4000 - constChars)) {
                                    interaction.guild.channels.fetch(channelIDArray[c]).then(channel => channel.send(({ embeds: [gtaImageEmbed, gtaEmbed] }))).catch(err => console.log(`GTA Test Min Error: ${err.stack}`));
                                } else {
                                    interaction.guild.channels.fetch(channelIDArray[c]).then(channel => channel.send({ embeds: [gtaImageEmbed, gtaEmbed, gtaEmbed2] })).catch(err => console.log(`GTA Test Max Error: ${err.stack}`));
                                }
                            }


                        } //end c loop




                        //Begin ephemeral testEmbed
                        var gtaChannelIds = [];
                        let successCount = 0;
                        interaction.guild.channels.cache.forEach(channel => {
                            if (data.includes(channel.id)) {
                                gtaChannelIds.push(channel.id);
                                if ((interaction.guild.members.me).permissionsIn(channel.id).has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.EmbedLinks])) {
                                    successCount++;
                                }
                            }
                        });
                        //console.log(`gtaChannelIds: ${gtaChannelIds}`);		

                        var rdoChannelIds = [];
                        let rdoSuccessCount = 0;
                        interaction.guild.channels.cache.forEach(channel => {
                            if (data.includes(channel.id)) {
                                rdoChannelIds.push(channel.id);
                                if ((interaction.guild.members.me).permissionsIn(channel.id).has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.EmbedLinks])) {
                                    rdoSuccessCount++;
                                }
                            }
                        });
                        //console.log(`rdoChannelIds: ${rdoChannelIds}`);						

                        function success() {
                            if (successCount === gtaChannelIds.length) {
															if (lang === "") {
																	return `Success`;
															}
															else if (lang === "es") {
																	return `Éxito`;
															}
															else if (lang === "br") {
																	return `Éxito`;
															}
															else if (lang === "ru") {
																	return `Успех`;
															}
															else if (lang === "de") {
																	return `Erfolg`;
															}
															else if (lang === "pl") {
																	return `Powodzenie`;
															}
															else if (lang === "fr") {
																	return `Succès`;
															}
															else if (lang === "it") {
																	return `Successo`;
															}
															else if (lang === "zh") {
																	return `成功`;
															}
															else if (lang === "tw") {
																	return `成功`;
															}
															else if (lang === "jp") {
																	return `成功`;
															}
															else if (lang === "kr") {
																	return `성공`;
															}
															else {
																	return `Success`;
															}
                            } //end if (successCount === gtaChannelIds.length)
                            else {
                                if (lang === "") {
                                    return `Missing Permisions`;
                                }
                                else if (lang === "es") {
                                    return `Permisos Faltantes`;
                                }
                                else if (lang === "ru") {
                                    return `Отсутствующие Pазрешения`;
                                }
                                else if (lang === "de") {
                                    return `Fehlende Berechtigungen`;
                                }
                                else if (lang === "pl") {
                                    return `Brak Uprawnień`;
                                }
                                else if (lang === "fr") {
                                    return `Autorisations Manquantes`;
                                }
                                else if (lang === "it") {
                                    return `Autorizzazioni Mancanti`;
                                }
																else if (lang === "zh") {
                                    return `缺少权限`;
                                }
                                else if (lang === "tw") {
                                    return `缺少權限`;
                                }
                                else if (lang === "jp") {
                                    return `権限がありません`;
                                }
                                else if (lang === "kr") {
                                    return `権限がありません`;
                                }
                                else {
                                    return `Missing Permisions`;
                                }
                            }
                        }

                        function testColor() {
                            if (successCount === gtaChannelIds.length) {
                                return "#00CD06"; //Green
                            }
                            else if (successCount >= 1) {
                                return "#FFAE00"; //Orange
                            }
                            else if (successCount <= 0) {
                                return "#FF0000"; //Red
                            }
                        }

                        const testEmbed = new EmbedBuilder()
                            .setColor(`${testColor()}`)
                            .setTitle(`${success()}`)
                            .setDescription(`${sentPostDescString}`);

                        await interaction.followUp({ embeds: [testEmbed], components: [], ephemeral: true }).catch(err => console.log(`testEmbed Error: ${err.stack}`));



                        //----------------------------------END GTA TEST POST----------------------------------//
                    }	//end gtaTest()

                    //--BEGIN TRANSLATIONS--//		

                    function notYourButtonString() {
                        if (lang === "") {
                            return `These buttons are not for you.`;
                        }
                        else if (lang === "es") {
                            return `Estos botones no son para ti.`;
                        }
                        else if (lang === "br") {
                            return `Esses botões não são para você.`;
                        }
                        else if (lang === "ru") {
                            return `Эти кнопки не для вас.`;
                        }
                        else if (lang === "de") {
                            return `Diese Schaltflächen sind nicht für Sie.`;
                        }
                        else if (lang === "pl") {
                            return `Te przyciski nie są dla ciebie.`;
                        }
                        else if (lang === "fr") {
                            return `Ces boutons ne sont pas pour vous.`;
                        }
                        else if (lang === "it") {
                            return `Questi pulsanti non fanno per te.`;
                        }
												else if (lang === "zh") {
                            return `这些按钮不适合您。`;
                        }
                        else if (lang === "tw") {
                            return `這些按鈕不適合您。`;
                        }
                        else if (lang === "jp") {
                            return `これらのボタンはあなたのためではありません。`;
                        }
                        else if (lang === "kr") {
                            return `이 버튼은 당신을 위한 것이 아닙니다.`;
                        }
                        else {
                            return `These buttons are not for you.`;
                        }
                    }

                    function missingPermissions() {
                        if (lang === "") {
                            return `You do not have the required permissions to do that.`;
                        }
                        else if (LANG === "es") {
                            return `No tienes permiso para hacer eso.`;
                        }
                        else if (LANG === "br") {
                            return `Você não tem permissão para fazer isso.`;
                        }
                        else if (LANG === "ru") {
                            return `У вас нет разрешения на это.`;
                        }
                        else if (LANG === "de") {
                            return `Sie haben keine Erlaubnis dazu.`;
                        }
                        else if (LANG === "pl") {
                            return `Nie masz wymaganych uprawnień.`;
                        }
                        else if (LANG === "fr") {
                            return `Vous ne disposez pas des autorisations requises.`;
                        }
                        else if (LANG === "it") {
                            return `Non hai le autorizzazioni necessarie.`;
                        }
												else if (LANG === "zh") {
                            return `您没有所需的权限。`;
                        }
                        else if (LANG === "tw") {
                            return `您沒有所需的權限。`;
                        }
                        else if (LANG === "jp") {
                            return `必要な権限がありません。`;
                        }
                        else if (LANG === "kr") {
                            return `필요한 권한이 없습니다.`;
                        }
                        else {
                            return `You do not have the required permissions to do that.`;
                        }
                    }

                    function noSubscriptions() {
                        if (lang === "") {
                            return `There are no channels subscribed to GTA Online.\n`;
                        }
                        else if (lang === "es") {
                            return `No hay canales suscritos a GTA Online.\n`;
                        }
                        else if (lang === "br") {
                            return `Não há canais inscritos no GTA Online.\n`;
                        }
                        else if (lang === "ru") {
                            return `Нет каналов, подписанных на GTA Online.\n`;
                        }
                        else if (lang === "de") {
                            return `Es sind keine Kanäle bei GTA Online abonniert.\n`;
                        }
                        else if (lang === "pl") {
                            return `Brak kanałów subskrybowanych w GTA Online.\n`;
                        }
                        else if (lang === "fr") {
                            return `Il n'y a aucune chaîne abonnée à GTA Online.\n`;
                        }
                        else if (lang === "it") {
                            return `Non ci sono canali abbonati a GTA Online.\n`;
                        }
												else if (lang === "zh") {
                            return `没有订阅 GTA 在线模式的频道。\n`;
                        }
                        else if (lang === "tw") {
                            return `沒有訂閱 GTA 在線模式的頻道。\n`;
                        }
                        else if (lang === "jp") {
                            return `GTA Online に登録しているチャンネルはありません。\n`;
                        }
                        else if (lang === "kr") {
                            return `GTA 온라인을 구독하는 채널이 없습니다.\n`;
                        }
                        else {
                            return `There are no channels subscribed to GTA Online.\n`;
                        }
                    }

                    //--END TRANSLATIONS--//		



                    //begin checking for permissions

                    var gtaChannelIds = [];
                    interaction.guild.channels.cache.forEach(channel => {
                        if (data.includes(channel.id)) {
                            gtaChannelIds.push(channel.id);
                        }
                    });
                    //console.log(`gtaChannelIds: ${gtaChannelIds}`);	

                    var rdoChannelIds = [];
                    fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
                        if (err) { console.log(`Error: ${err}`) }
                        else {
                            interaction.guild.channels.cache.forEach(channel => {
                                if (data.includes(channel.id)) {
                                    rdoChannelIds.push(channel.id);
                                }
                            });
                            //console.log(`rdoChannelIds: ${rdoChannelIds}`);

                            rdoDisabled = false;
                            if (rdoChannelIds[0] === undefined) {
                                rdoDisabled = true;
                            }

                            const confirmButtons = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`gtaTest - ${buttonUserID}`)
                                        .setLabel(`${testGTAButtonString()}`)
                                        .setStyle(ButtonStyle.Success),
                                    new ButtonBuilder()
                                        .setCustomId(`rdoTest - ${buttonUserID}`)
                                        .setLabel(`${testRDOButtonString()}`)
                                        .setStyle(ButtonStyle.Danger)
                                        .setDisabled(rdoDisabled),
                                    new ButtonBuilder()
                                        .setCustomId(`confirmback - ${buttonUserID}`)
                                        .setLabel(`${goBack()}`)
                                        .setStyle(ButtonStyle.Secondary),
                                );

                            const confirmButtonsMissingPermission = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`gtaTest - ${buttonUserID}`)
                                        .setLabel(`${testGTAButtonString()}`)
                                        .setStyle(ButtonStyle.Success)
                                        .setDisabled(true),
                                    new ButtonBuilder()
                                        .setCustomId(`rdoTest - ${buttonUserID}`)
                                        .setLabel(`${testRDOButtonString()}`)
                                        .setStyle(ButtonStyle.Danger)
                                        .setDisabled(true),
                                    new ButtonBuilder()
                                        .setCustomId(`confirmback - ${buttonUserID}`)
                                        .setLabel(`${goBack()}`)
                                        .setStyle(ButtonStyle.Secondary),
                                );

                            if ((interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID)) {
                                await gtaTest();
                                await interaction.editReply({ components: [confirmButtons], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));
                            }
                            else if (interaction.user.id !== buttonUserID) {
                                await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
                                await interaction.editReply({ components: [confirmButtons], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));
                            }
                            else if (gtaChannelIds.length <= 0) {
                                await interaction.followUp({ content: `${noSubscriptions()}`, ephemeral: true });
                                await interaction.editReply({ components: [confirmButtonsMissingPermission], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));
                            }
                            else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                                await interaction.followUp({ content: `${missingPermissions()}`, ephemeral: true })
                                await interaction.editReply({ components: [confirmButtonsMissingPermission], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));
                            }
                            else {
                                await interaction.followUp({ content: `There was an error executing this button.`, ephemeral: true });
                                await interaction.editReply({ components: [confirmButtonsMissingPermission], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));
                            } //end checking for permissions	

                        }
                    });//end fs.readFile for RDODataBase
                }
            }); //end fs.readFile for GTADataBase.txt

            function expiredDesc() {
                if (lang === "") {
                    return `This interaction expired`;
                }
                if (lang === "es") {
                    return `Esta interacción expiró`;
                }
                if (lang === "br") {
                    return `Esta interação expirou`;
                }
                if (lang === "ru") {
                    return `Срок действия этого взаимодействия истек`;
                }
                if (lang === "de") {
                    return `Diese Interaktion ist abgelaufen`;
                }
                if (lang === "pl") {
                    return `Ta interakcja wygasła`;
                }
                if (lang === "fr") {
                    return `Cette interaction a expiré`;
                }
                if (lang === "it") {
                    return `Questa interazione è scaduta`;
                }
								if (lang === "zh") {
                    return `此互动已过期`;
                }
                if (lang === "tw") {
                    return `此互動已過期`;
                }
                if (lang === "jp") {
                    return `このインタラクションの有効期限が切れました`;
                }
                if (lang === "kr") {
                    return `이 상호 작용이 만료되었습니다`;
                }
                else {
                    return `This interaction expired`;
                }
            }

            const expiredButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`expired`)
                        .setLabel(`${expiredDesc()}`)
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji(':RSWeekly:1025248227248848940')
                        .setDisabled(true),
                );

            setTimeout(() => {
                interaction.editReply({ components: [expiredButton] });
            }, (60000 * 15))

        }
    },

}