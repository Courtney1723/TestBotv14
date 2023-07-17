const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const phantom = require('phantom'); //https://github.com/amir20/phantomjs-node
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const lang = require('../events/LANG.js');
const NEXT_BONUS = require('../events/nextBonus.js');
let errorEmbed = new EmbedBuilder()
    .setColor('Red')
    .setTitle(`Uh Oh!`)
    .setDescription(`There was an error while executing this command!\nThe error has been sent to the developer and will be fixed as soon as possible.\nPlease try again in a few minutes.\n\nIf the problem persists you can try [re-inviting the bot](<${process.env.invite_link}>) or \nYou can report it in the [Rockstar Weekly Support Server](<${process.env.support_link}>)`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gta')
        .setDescription('Latest GTA Online Bonuses')
        .setDescriptionLocalizations({
            "es-ES": 'Bonificaciones de GTA Online',
            "pt-BR": 'Bônus no GTA Online',
            ru: 'Бонусы GTA Online',
            de: 'Boni in GTA Online',
            pl: 'Premie GTA Online',
            fr: 'Bonus dans GTA Online',
            it: 'Bonus di GTA Online',
            "zh-CN": 'GTA 線上模式獎勵',
            ja: '「GTAオンライン」ボーナス',
            ko: 'GTA 온라인 보너스',
        })
        .setDMPermission(true),
    async execute(interaction) {
        await interaction.deferReply().catch(console.error);

        //var lang = await LANG.LANG(interaction);
        //console.log(`LANG:${await LANG.LANG(interaction)}`);

        var LANG02 = interaction.locale.toString().split("-");
        var lang = LANG02[0];
        //console.log(`lang:${lang}`);		

				var nextBONUSGTA = await NEXT_BONUS.nextBonus("gta");
				//console.log(`gta: ${nextBONUSGTA}`);

        let gtaURL = process.env.SOCIAL_URL_GTA2;

        //await interaction.editReply(`Console Logged 👍`).catch(console.error);

        const instance = await phantom.create();
        const page = await instance.createPage();

        await page.property('viewportSize', { width: 1024, height: 600 });
        const status = await page.open(gtaURL);
        //console.log(`Page opened with status [${status}].`);
        if (status === `success`) { //checks if Rockstar Social Club website is down
            const content = await page.property('content'); // Gets the latest gta updates
            //console.log(content); 

						let gtaImage01 = content.split("imgUrl\":\"");
						//console.log(`gtaImage01: ${gtaImage01[1]}`);
						let gtaImage = gtaImage01[1].split("\",");
						//console.log(`gtaImage: ${gtaImage[0]}`); 

            let baseURL = "https://socialclub.rockstargames.com";

            let urlHash02 = content.split("urlHash\":\"");
            let urlHash01 = urlHash02[1].split("\"");
            let urlHash = urlHash01[0];
            //console.log(`urlHash: ${urlHash}`);

            let urlSlug02 = content.split("slug\":\"");
            let urlSlug01 = urlSlug02[1].split("\"");
            let urlSlug = urlSlug01[0];
            //console.log(`urlSlug: ${urlSlug}`);

            let urlLink02 = content.split("linkToUrl\":");
            let urlLink01 = urlLink02[1].split("\"");

            function urlLink() {
                //return `/events/e9Lot6x3/gta-online-bonuses/1`; //test for finalstring <= 4000 
                //return `events/B3RJmhuX/gta-online-bonuses/1`; //test for finalstring >= 4000 && <= 6000
                //return `events/tgHCnzSZ/gta-online-bonuses/1`; //test for finalString >= 6000				
                if (urlLink01[1].includes(`\?`)) {
                    let urlLinkFix = urlLink01[1].split(`\?`);
                    let urlLink = urlLinkFix[0];
                    return urlLink;
                }
                else {
                    let urlLink = urlLink01[1];
                    return urlLink;
                }
            }
            //console.log(`urlLink: ${urlLink()}`);

            function isPast() {
                let isPast003 = content.split("isPast\":");
                let isPast002 = isPast003[2].split(",\"");

                return isPast002[0];
            }
            //console.log(`isPast: ${isPast()}`);

            let langBase = `/?lang=`;
            let langURL = `${langBase}${lang}`;

            //let url = `${baseURL}${urlHash}/${urlSlug}${langURL}`;
            let url = `${baseURL}/${urlLink()}${langURL}`;
            //console.log(`url: ${url}`);

            const gtaStatus = await page.open(url);
            if (gtaStatus === `success`) {

                const gtaContent = await page.property('content'); // Gets the latest gta updates
                //console.log(content); 
                let gtaString001 = gtaContent.toString(); //converts HTML to string (necessary? not sure.);
                //console.log(`gtaString001: ${gtaString001}`);	
                let gtaString01 = gtaString001.split("cm-content\">"); //splits the header from the body
                let gtaHeader = gtaString01[0];
                //console.log(`gtaHeader: ${gtaHeader}`);

                let gtaDate02 = gtaHeader.split("class=\"date\">"); //gets the event date
                let gtaDate01 = gtaDate02[1].split("<"); //cuts off the end of the date
                let gtaDate = gtaDate01[0].replace(/&nbsp;/g, " ");
                //console.log(`Date: ${gtaDate}\n`);	

                let gtaTitleOG01 = gtaHeader.split("h1");
                let gtaTitleOG02 = gtaTitleOG01[1].split(">");
                let gtaTitleOG03 = gtaTitleOG02[1].split("<");
                let gtaTitleOG = gtaTitleOG03[0];
                //console.log(`gtaTitleOG:${gtaTitleOG}`);

                let gtaString002 = gtaString01[1]; //Splits the header from the body
                //console.log(`gtaString: ${gtaString002}`)
                let gtaString02 = gtaString002.split("</div>"); //splits the footer from the body
                //console.log(`gtaString02: ${gtaString02[0]}`);
                let gtaStringOG = `${gtaString02[0]}<p><b>`; //the entire string before any editing w/o footer or header
                //console.log(`gtaStringOG: ${gtaStringOG}`);

                //Replaces or removes HTML formatting that can interfere with split functions or is constant
                let gtaString = gtaStringOG.replace(/<li>/g, "• ")
                    .replace(/<\/li>/g, "")
                    .replace(/<\/ul>/g, "")
                    .replace(/&amp;/g, "&")
                    .replace(/&nbsp;/g, " ") //Non breaking space
                    .replace(/\n<ul style=\"line-height:1.5;\">/g, "")
                    .replace(/<ul style="line-height:1.5;">/g, "")
                    .replace(/\n<p>/g, "<p>") //Removes spaces after a bonus
                    .replace(/<p>Only/g, "<p><b>Only")
                    .replace(/<\/span>/, "")								

                    //--BEGIN FOREIGN LANGUAGE FORMATTING-----//
                    //--RUSSIAN--//
                    .replace(/=\"\"/g, "")
                    .replace(/<liЗаработайте/g, "")
                    .replace(/<\/liЗаработайте>/g, "")
                    .replace(/< li>/g, "")
                    .replace(/<\/>/g, "")
                    .replace(/<\/strong>/g, "")
                    .replace(/<strong>/g, "")
                    .replace(/<br>/g, "")

                    //--Spanish--//
                    .replace(/<mq:rxt><\/mq:rxt>/g, "")

                    //German
                    .replace(/\" draggable=\"false/g, "")
                    .replace(/<p><\/p>/, "") //removes an empty paragraph in the introParas

                //-----END FOREIGN LANGUAGE FORMATTING-----//

                //console.log(`gtaString: ${gtaString}`);

                //--------------------BEGIN formatting for links--------------------//
                let gtaLinks001 = gtaString.split("<a href=\"");
                let gtaLinks = "";
                let gtaLinkTitles = "";
                for (j = 1; j <= gtaLinks001.length - 1; j++) {
                    let gtaLinks01 = gtaLinks001[j].split("\" target");
                    //console.log(`gtaLinks01 at ${j}: ${gtaLinks01[0]}`);
                    let gtaLinks02 = gtaLinks01[0].split("\">");
                    //console.log(`gtaLinks02 at ${j}: ${gtaLinks02[0]}`);
                    gtaLinks += `${gtaLinks02[0]},`;

                    let gtaLinkTitles01 = gtaLinks001[j].split("\">");
                    let gtaLinkTitles02 = gtaLinkTitles01[1].split("</a>");

                    gtaLinkTitles += `${gtaLinkTitles02[0]},`;
                }
                // console.log(`gtaLinks: ${gtaLinks}`);
                // console.log(`gtaLinkTitles: ${gtaLinkTitles}`);

                let gtaLinks002 = gtaLinks.split(",");
                //console.log(`gtaLinks002: ${gtaLinks002}`);
                let gtaLinkTitles002 = gtaLinkTitles.split(",");
                //console.log(`gtaLinkTitles002: ${gtaLinkTitles002}`);

                let gtaLinkFormatted = gtaString;
                for (m = 0; m <= gtaLinks002.length - 2; m++) { // keep - 2; the last element will always be blank
                    gtaLinkFormatted = gtaLinkFormatted.replace(/<a.*?a>/, `[${gtaLinkTitles002[m]}](${gtaLinks002[m]})`); //replaces each link with proper discord formatted link									
                    //console.log(`gtaLinkFormatted at ${m}: ${gtaLinkFormatted}`);
                }
                //console.log(`gtaLinkFormatted: ${gtaLinkFormatted}`);

                //--------------------END formatting for links--------------------//

                //--------------------BEGIN checking for words that are bold at the beginning of a paragraph-------------------//

                function notATitleIndex() {
                    let gtaTitles001 = gtaLinkFormatted.split("<p><b>");

                    let notATitleIndex001 = "";
                    for (i = 0; i <= gtaTitles001.length - 1; i++) {
                        if (gtaTitles001[i].charAt(1) != gtaTitles001[i].charAt(1).toUpperCase()) {
                            notATitleIndex001 += `${i}`;
                        }
                    }
                    return `${notATitleIndex001}`;
                }
                //console.log(`notATitleIndex: ${notATitleIndex()}`);
                let notATitleIndex01 = notATitleIndex();
                //console.log(`notATitleIndex01: ${notATitleIndex01}`);

                function notATitleBonus() {
                    let gtaTitles001 = gtaLinkFormatted.split("<p><b>");

                    let notATitleBonus = "";
                    for (i = 0; i <= gtaTitles001.length - 1; i++) {
                        if (gtaTitles001[i].charAt(1) != gtaTitles001[i].charAt(1).toUpperCase()) {
                            notATitleBonus += `${gtaTitles001[i]}`;
                        }
                    }
                    return `${notATitleBonus}`;
                }
                //console.log(`notATitleBonus: ${notATitleBonus()}`);
                let notATitleBonus01 = notATitleBonus();
                let notATitleBonusFirstWord = notATitleBonus01.split(" ");
                //console.log(`notATitleBonusFirstWord[0]: ${notATitleBonusFirstWord[0]}`);

                function gtaBoldFormatted() {
                    if (notATitleIndex01 != "") {
                        return gtaLinkFormatted.replace(new RegExp(`<p><b>${notATitleBonusFirstWord[0]}`, "g"), `<p>${notATitleBonusFirstWord[0]}`); //replaces any words that are bold at the beginning of a paragraph with non-bold
                    }
                    else {
                        return gtaLinkFormatted;
                    }
                }

                //console.log(`gtaBoldFormatted(): ${gtaBoldFormatted()}`);

                //--------------------END checking for words that are bold at the beginning of a paragraph-------------------//


                //--------------------BEGIN checking for titles that include the bonus-------------------//

                function notATitle() { //</b></p> //<p><b>
                    let gtaTitles001 = gtaBoldFormatted().split("<p><b>");

                    let notATitle01 = `_ _</b></p>${gtaTitles001[0]}<p><b>`; //creates an empty title at the beginning so the intro paragraph is a bonus

                    for (i = 1; i <= gtaTitles001.length - 1; i++) {
                        let gta_titles01 = gtaTitles001[i].split("</b></p>");
                        let gta_titles = `${gta_titles01[0]}</b></p>`;
                        let gta_bonuses = `${gta_titles01[1]}<p><b>`;
                        if (gta_titles.includes("\n")) {
                            let gta_titles_01 = gta_titles.split("<");
                            let gta_bonuses_01 = gta_titles.split("\n");

                            gta_titles = `${gta_titles_01[0]}</b></p>`;
                            gta_bonuses = `${gta_bonuses_01[1]}<p><b>`;

                        }
                        notATitle01 += `${gta_titles}`;
                        notATitle01 += `${gta_bonuses}`;
                        //console.log(`i:${i} - gta_titles:${gta_titles}\ngta_bonuses:${gta_bonuses}\ni:${i}`);						
                    }
                    return notATitle01;
                }
                //console.log(`notATitle:${notATitle()}`);

                //--------------------END checking for titles that include the bonus-------------------//

                let GTABonuses01 = notATitle().split("<p><b>");
                //console.log(`GTABonuses01: ${GTABonuses01}`)
                let gtaFinalString01 = "";	//gtaFinalString before HTML formatting

                //-----BEGIN for loop-----//		

                //console.log(`GTABonuses01 length: ${GTABonuses01.length}`);
                for (i = 0; i <= GTABonuses01.length - 3; i++) { //final element will always be blank
                    //console.log(`GTABonuses01 at ${i}: ${GTABonuses01}`);
                    let GTABonuses = GTABonuses01[i].split("</b></p>");
                    //console.log(`GTATitles at ${i}: ${GTABonuses[0]}\nGTABonuses at ${i}: ${GTABonuses[1]}`);

										let GTA_Title = `${GTABonuses[0]} `;
                    let GTA_Bonus = GTABonuses[1];
                    //console.log(`GTA_Title at ${i}: ${GTA_Title} `);		
                    // console.log(`GTA_Bonus at ${i}: ${GTA_Bonus}`);	
                    //--------------------END capitalization Function-----------------//		

                    //----------BEGIN populating gtaFinalString01 ----------//
                    if ((GTA_Bonus != null) && (!GTA_Title.includes("undefined")) && (!GTA_Bonus.includes("undefined"))) {
                        let gtaParas = GTA_Bonus.split("<p>");
                        if (
                            (GTA_Title.toLowerCase().includes("gta+ ")) ||
                            (GTA_Title.toLowerCase().includes("discounts ")) ||
														(GTA_Title.toLowerCase().includes("and more... ")) ||
                            (GTA_Title.toLowerCase().includes("descuentos ")) ||
                            (GTA_Title.includes("СКИДКИ")) ||
														(GTA_Title.includes("折扣優惠")) ||
														(GTA_Title.includes("割引")) ||
														(GTA_Title.includes("할인")) ||
                            (GTA_Title.toLowerCase().includes("rabatte")) ||
														(GTA_Title.toLowerCase().includes("zniżki")) ||
                            (GTA_Title.toLowerCase().includes("descontos")) ||
														(GTA_Title.toLowerCase().includes("promotions")) ||
														(GTA_Title.toLowerCase().includes("sconti"))
                        ) {
                            // console.log(`1 - discount`);
                            gtaFinalString01 += `**${GTA_Title}**\n`;
                            var k = 0;
                            while (gtaParas[k] !== undefined) {
                                if (gtaParas[k].includes("•")) {
                                    // console.log(`1 - discount includes •`);
                                    gtaFinalString01 += `${gtaParas[k]}`;
                                }
                                else {
                                    // console.log(`1 - discount does not include •`);
                                    gtaFinalString01 += `• ${gtaParas[k]}`;
                                }
                                k++;
                            }
                            gtaFinalString01 += "\n";
                        }
                        else if ( //reformats "Only on PlayStation" bonus
                            (GTA_Title.toLowerCase().includes("hsw")) ||
                            (GTA_Title.toLowerCase().includes("premium test ride")) ||
                            (GTA_Title.toLowerCase().includes("vehículo de prueba premium")) ||
                            (GTA_Title.includes("Премиум-класса")) ||
                            (GTA_Title.includes("Тестовый транспорт")) ||
                            (GTA_Title.toLowerCase().includes("premium-testfahrzeug")) ||
                            (GTA_Title.toLowerCase().includes("veículo de teste premium"))
                        ) {
                            // console.log(`2 - only on playstation`);
                            gtaFinalString01 += `• ${GTA_Title}\n`;
                            if (GTA_Title.toLowerCase().includes("hsw")) {
                                gtaFinalString01 += "\n"
                            }
                        }
                        else if ( //Adds only the title if the paragraph is unecessary
                            (GTA_Title.toLowerCase().includes("1.5x")) ||
                            (GTA_Title.toLowerCase().includes("1,5x")) ||
                            (GTA_Title.toLowerCase().includes("2x")) ||
                            (GTA_Title.toLowerCase().includes("2.5x")) ||
                            (GTA_Title.toLowerCase().includes("2,5x")) ||
                            (GTA_Title.toLowerCase().includes("3x")) ||
                            (GTA_Title.toLowerCase().includes("4x")) ||
                            (GTA_Title.toLowerCase().includes("40%")) ||
                            (GTA_Title.toLowerCase().includes("40 %")) ||
                            (GTA_Title.toLowerCase().includes("50%")) ||
                            (GTA_Title.toLowerCase().includes("50 %")) ||
                            (GTA_Title.toLowerCase().includes("double")) ||
                            (GTA_Title.toLowerCase().includes("doble")) ||
														(GTA_Title.toLowerCase().includes("doublés")) ||
														(GTA_Title.toLowerCase().includes("doppi")) ||
                            (GTA_Title.toLowerCase().includes("preisfahrzeug")) ||
                            (GTA_Title.toLowerCase().includes("veículo-prêmio")) ||
                            (GTA_Title.toLowerCase().includes("diamond casino")) ||
                            (GTA_Title.toLowerCase().includes("cassino diamond")) ||
                            (GTA_Title.includes("ПРИЗОВОЙ ТРАНСПОРТ")) ||
														(GTA_Title.includes("ВДВОЕ БОЛЬШЕ")) ||
														(GTA_Title.includes("ВТРОЕ БОЛЬШЕ"))
                        ) {
                            // console.log(`3 - only title`);
                            gtaFinalString01 += `**${GTA_Title}**\n\n`;
                        }
                        else { // only post the first paragraph
                            // console.log(`4 - else`);
                            if ((gtaParas[1] !== undefined) && (gtaParas[1] !== "")) {
                                // console.log(`4 - title + bonus - bonus length:${gtaParas[1].length}`);
                                if (gtaParas[1].length <= 510) {
                                    gtaFinalString01 += `**${GTA_Title}**\n• ${gtaParas[1]}\n\n`;
                                }
                                else {
                                    gtaFinalString01 += `**${GTA_Title}**\n\n`;
                                }
                            }
                            else if ((GTA_Title !== undefined) && (GTA_Title !== "")) {
                                // console.log(`4 - title only`);
                                gtaFinalString01 += `**${GTA_Title}**\n\n`;
                            }
                        }
                    }
                    else if ((GTA_Title != null) && (!GTA_Title.includes("undefined")) && (GTA_Title != "")) { //if the bonus is in the title
                        // console.log(`5 - bonusintitle`);
                        var bonusInTitle = GTA_Title.split("<");
                        var bonusInTitleBonus = bonusInTitle[1].split(">");
                        gtaFinalString01 += `**${bonusInTitle[0]}**\n`;
                        gtaFinalString01 += `• ${bonusInTitleBonus[1]}\n\n`;
                    }

                }//end looping through bonuses - i loop

                //-----------END for loop----------//			
                //console.log(`gtaFinalString01: ${gtaFinalString01}`); //gtaFinalString before HTML formatting
                let gtaFinalString = gtaFinalString01
                    .replace(/<p>/g, "")
                    .replace(/<\/p>/g, "\n")
                    .replace(/<\/b>/g, "")
                    .replace(/<b>/g, "")
                    .replace(/\n\n• /g, "\n• ") //removes spaces before a list
                    .replace(/\n \n• /g, "\n• ") //removes spaces before a list
                    .replace(/• \n/g, "• ") //removes spaces after a list
                    .replace(/•  \n/g, "• ") //removes spaces after a list
                    .replace(/• •/g, "•") //removes double bullet points
                    .replace(/.\n\*\*/g, ".\n\n**") //fixes missing space before new title
                    .replace(/        /, "")//removes trailing spaces 
                    .replace(/\n\n\n/g, "\n")//removes extra spaces
										.replace(/ \n\*\*/g, " \n\n**") //adds a space before titles if missing
                //console.log(`gtaFinalString: ${gtaFinalString}`); //gtaFinalString after HTML formatting
                //console.log(`gtaFinalString.length: ${gtaFinalString.length}`);

                var constChars = (gtaDate.length + 2) + (gtaTitleOG.length);
                function ellipsisFunction() {
                    if (gtaFinalString.length >= (4000 - constChars)) {
                        return "...";
                    } else {
                        return "";
                    }
                }
                function ellipsisFunction2() {
                    if (gtaFinalString.length >= (6000 - constChars - gtaImage[0].length)) {
                        return "...\n";
                    } else {
                        return "";
                    }
                }
                function gtaFooter() {
									if (lang === "en") {
											return `More details`;
									}
									else if (lang === "es") {
											return `Más detalles`;
									}
									else if (lang === "pt") {
											return `Mais detalhes`;
									}													
									else if (lang === "ru") {
											return `Подробнее`;
									}
									else if (lang === "de") {
											return `Mehr Details`;
									}
									else if (lang === "pl") {
											return `Więcej szczegółów`;
									}
									else if (lang === "fr") {
											return `Plus de détails`;
									}
									else if (lang === "it") {
											return `Più dettagli`;
									}
									else if (lang === "zh") {
											return `更多細節`;
									}
									else if (lang === "ja") {
											return `詳細`;
									}
									else if (lang === "ko") {
											return `자세한 내용은`;
									}													
									else {
											return `More Details`;
									}
                }						

                constChars += ellipsisFunction().length;
                var gtaNewlines = gtaFinalString.substr(0, (4000 - constChars)).split("\n\n");
                var tempString = gtaNewlines[gtaNewlines.length - 1];
                function bestBreak() {
                    if (gtaFinalString.length <= (4000 - constChars)) {
                        return (gtaFinalString.length);
                    }
                    return (4000 - constChars - tempString.length);
                }
                //console.log(`bestBreak: ${bestBreak()}`);

                var constChars1 = (ellipsisFunction().length) + (ellipsisFunction2().length) + gtaImage[0].length;
                var gtaNewlines1 = gtaFinalString.substr(bestBreak(), (6000 - constChars - constChars1 - bestBreak())).split("\n");
                var tempString1 = gtaNewlines1[gtaNewlines1.length - 1];
                function bestEndBreak() {
                    if (gtaFinalString.length <= (6000 - constChars - constChars1)) {
                        return gtaFinalString.length;
                    }
                    return (6000 - bestBreak() - constChars - constChars1 - tempString1.length); //removes the last bonus if over 6000 chars
                }
                //console.log(`bestEndBreak:${bestEndBreak()}`);

                function gtaPost() {
                    return gtaFinalString.slice(0, (bestBreak()));
                }
                //console.log(`gtaPost().length:${gtaPost().length || 0}`);
                function gtaPost2() {
                    if (gtaPost().length < gtaFinalString.length) {
                        let post02 = gtaFinalString.substr((bestBreak()), (bestEndBreak()));
                        return post02;
                    } else {
                        return "";
                    }
                }
                //console.log(`gtaPost2().length:${gtaPost2().length || 0}`);

                let gtaEmbed = new EmbedBuilder()
                    .setColor(0x00CD06) //Green
                    .setTitle(`${gtaTitleOG}`)
                    .setDescription(`${gtaDate}\n${gtaPost()}${ellipsisFunction()}`)
                let gtaEmbed2 = new EmbedBuilder()
                    .setColor(0x00CD06) //Green
                    .setDescription(`${ellipsisFunction()} \n${gtaPost2()} ${ellipsisFunction2()}`)					
                let gtaImageEmbed = new EmbedBuilder()
                    .setColor(0x00CD06) //Green
                    .setImage(`${gtaImage[0]}`);

		            const moreButton = new ActionRowBuilder()
		                .addComponents(
		                    new ButtonBuilder()
		                        .setEmoji(`<:RStar_Kofi_Donate:1130584945815994539>`)
														.setURL(`https://ko-fi.com/courtney1723`)
		                        .setStyle(ButtonStyle.Link),											
		                    new ButtonBuilder()
		                        .setEmoji(`<:RockstarLogo:1130583450710188032>`)
														.setLabel(`${gtaFooter()}`)
														.setURL(`${url}`)									
		                        .setStyle(ButtonStyle.Link)
		                );

                // console.log(`gtaEmbed length: ${gtaEmbed.length}`); //no more than 4000 (line 199)
                // console.log(`gtaEmbed2 length: ${gtaEmbed2.length}`); //no more than 6000 - gtaEmbed.length (line 204)

                if (gtaPost2() === "") {
                    await interaction.editReply({ embeds: [gtaImageEmbed, gtaEmbed], components: [moreButton] }).catch(err =>
                        interaction.editReply({ embeds: [errorEmbed], ephemeral: true }).then(
                            console.log(`There was an error! \nUser:${interaction.user.tag} - ${interaction} \nError: ${err.stack}`))
                    );									
                } else {
                    await interaction.editReply({ embeds: [gtaImageEmbed, gtaEmbed, gtaEmbed2], components: [moreButton]  }).catch(err =>
                        interaction.editReply({ embeds: [errorEmbed], ephemeral: true }).then(
                            console.log(`There was an error! \nUser:${interaction.user.tag} - ${interaction} \nError: ${err.stack}`))
                    );
                }

                //BEGIN expiredEmbed	

                function gtaExpiredEmbedString() {
                    if (lang === "en") {
                        return `These bonuses are expired.`;
                    }
                    else if (lang === "es") {
                        return `Estos bonos pueden estar vencidos.`;
                    }
                    else if (lang === "pt") {
                        return `Esses bônus expiraram.`;
                    }											
                    else if (lang === "ru") {
                        return `Срок действия этих бонусов истек.`;
                    }
                    else if (lang === "de") {
                        return `Diese Boni sind möglicherweise abgelaufen.`;
                    }
                    else if (lang === "pl") {
                        return `Te bonusy wygasły.`;
                    }												
                    else if (lang === "fr") {
                        return `Ces bonus ont expiré.`;
                    }
                    else if (lang === "it") {
                        return `Questi bonus sono scaduti.`;
                    }		
                    else if (lang === "zh") {
                        return `此獎金已過期。`;
                    }	
                    else if (lang === "ja") {
                        return `このボーナスは期限切れです。`;
                    }	
                    else if (lang === "ko") {
                        return `이 보너스는 만료되었습니다.`;
                    }												
                    else {
                        return `These bonuses are expired.`;
                    }
                }


                function nextUpdate() {
                    if (lang === "en") {
                        return "Next Update";
                    }
                    else if (lang === "es") {
                        return "Próxima actualización";
                    }
                    else if (lang === "pt") {
                        return "Próxima atualização";
                    }											
                    else if (lang === "ru") {
                        return "Следующее обновление";
                    }
                    else if (lang === "de") {
                        return "Nächstes Update";
                    }
                    if (lang === "pl") {
                        return "Następna aktualizacja";
                    }		
                    if (lang === "fr") {
                        return "Prochaine mise à jour ";
                    }	
                    if (lang === "it") {
                        return "Prossimo aggiornamento";
                    }	
                    if (lang === "zh") {
                        return "下次更新";
                    }	
                    if (lang === "ja") {
                        return "次回の更新";
                    }		
                    if (lang === "ko") {
                        return "다음 업데이트";
                    }												
                    else {
                        return "Next Update";
                    }
                }

                const aDate = new Date();
                const aDay = aDate.getDay(); //Day of the Week
                //console.log(`aDay: ${aDay}`);
                const aHour = aDate.getHours(); //Time of Day UTC (+6 MST; +4 EST)
                //console.log(`aHour: ${aHour}`);		

                var estDate = aDate.toLocaleString("en-US", {
                    timeZone: "America/New_York"
                });
                var estTime = estDate.split(", ");
                var estHourMinute = estTime[1].split(":");

                var estMinute = estHourMinute[1];

                var amPM01 = estHourMinute[2].split(" ");

                function hourCheck() {
                    var estHour = Number(`${estHourMinute[0]}`);
                    if (!((lang === "") || (lang === "en")) && (amPM01[1] === "PM")) { //foreign language
                        estHour += 12;
                    }
                    return `${estHour}`;
                }
                function amPMCheck() {
                    var amPM = "";
                    if ((lang === "") || (lang === "en")) { //foreign language
                        amPM += ` ${amPM01[1]}`;
                    }
                    return amPM;
                }

                //console.log(`${estHour}:${estMinute} ${amPM}`);

                let gtaExpiredEmbed = new EmbedBuilder()
                    .setColor(0x00CD06) //Green
                    .setDescription(`${gtaExpiredEmbedString()}\n${nextUpdate()}: <t:${Math.round(nextBONUSGTA / 1000)}:F>.`)

                //console.log(`isPast: ${isPast()}`);
                if (isPast() === "true") {
                    await interaction.followUp({ embeds: [gtaExpiredEmbed], ephemeral: true }).catch(err => console.log(`gtaExpiredEmbed Error: ${err.stack}`));
                }

                //interaction.editReply(`Console logged! 👍`);


            }
            else {
                let RStarDownEmbed = new EmbedBuilder()
                    .setColor(0xFF0000) //RED
                    .setDescription(`The Rockstar Social Club website is down. \nPlease try again later. \nSorry for the inconvenience.`)
                interaction.editReply({ embeds: [RStarDownEmbed], ephemeral: true });
                console.log(`The Rockstar Social Club website is down.`);
            }

        }
        else {
            let RStarDownEmbed = new EmbedBuilder()
                .setColor(0xFF0000) //RED
                .setDescription(`The Rockstar Social Club website is down. \nPlease try again later. \nSorry for the inconvenience.`)
            interaction.editReply({ embeds: [RStarDownEmbed], ephemeral: true });
            console.log(`The Rockstar Social Club website is down.`);
        }




    },
};