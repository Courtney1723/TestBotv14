const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const phantom = require('phantom'); //https://github.com/amir20/phantomjs-node
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const lang = require('../events/LANG.js');
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

                let gtaImage01 = gtaHeader.split("og:image\" content=\"");
                //console.log(`gtaImage01: ${gtaImage01[1]}`);
                let gtaImage = gtaImage01[1].split("\" data-rh=");
                //console.log(`gtaImage: ${gtaImage[0]}`);

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
                //console.log(`gtaLinks: ${gtaLinks}`);
                //console.log(`gtaLinkTitles: ${gtaLinkTitles}`);

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

                    let GTA_Bonus = GTABonuses[1];
                    //console.log(`GTA_Bonus at ${i}: ${GTA_Bonus}`);

                    //------------------BEGIN capitalization Function-----------------//
                    function titleCapitalization(titles) {
                        //console.log(`Titles1: ${titles[0]}\n`); // Full Title
                        let Titles2 = titles[0].split(` `);
                        //console.log(`Titles2: ${Titles2[0]}\n`); // First word of the title
                        let titlesLength = Object.keys(Titles2).length; //counts the number of words in the title array
                        //console.log(`Titles2 size at ${i}: ${titlesLength}\n`);
                        let gtaTitleString = ""; //initial empty title, will be populated in the j loop

                        for (j = 0; j <= titlesLength; ++j) {
                            while (j <= (titlesLength)) {
                                //console.log(`I: ${i}, J: ${j}\n`); //while loop check, expected: i = title number, j = index of title words
                                if ((Titles2[j] != null) && (Titles2[j] != "")) { //ignores blank space elements
                                    //console.log(`Titles2 at J: ${j}: ${Titles2[j]}\n`); //checks for blank elements
                                    //console.log(`${Titles2[j].charAt(0)}${Titles2[j].toLowerCase().slice(1)}`); //capital first letters check 
                                    //returns first letter capitalized + rest of the word lowercase if the word is the first word in the title - unless GTA
                                    if ((Titles2[j] === Titles2[0]) && (!Titles2[j].includes("GTA")) && (Titles2[j] != "XP") && (Titles2[j] != "RP") && (Titles2[j] != "GT") && (Titles2[j] != "LD") && (Titles2[j] != "LSPD") && (Titles2[j] != "HSW")) {
                                        gtaTitleString += `${Titles2[j].charAt(0)}${Titles2[j].toLowerCase().slice(1)} `;
                                    }
                                    //returns all caps if title is GTA, GTA$, or XP							
                                    else if ((Titles2[j].includes("GTA")) || (Titles2[j] === "XP") || (Titles2[j] === "RP") || (Titles2[j] === "GT") || (Titles2[j] === "LD") || (Titles2[j] === "LSPD") || (Titles2[j] === "HSW") || (Titles2[j] === "LS") || (Titles2[j] === "X|S")) {
                                        gtaTitleString += `${Titles2[j]} `;
                                    }
                                    //returns all lowercase if not a title word					
                                    else if ((Titles2[j] === "ON") || (Titles2[j] === "OF") || (Titles2[j] === "THE") || (Titles2[j] === "AN") || (Titles2[j] === "AND") || (Titles2[j] === "FOR") || (Titles2[j] === "A") || (Titles2[j] === "AT") || (Titles2[j] === "IN")) {
                                        gtaTitleString += `${Titles2[j].toLowerCase()} `;
                                    }
                                    //else returns capital first letter and lowercase rest of the word				
                                    else {
                                        gtaTitleString += `${Titles2[j].charAt(0)}${Titles2[j].toLowerCase().slice(1)} `;
                                    }
                                }
                                ++j;
                            }
                        }
                        //return Titles2[0]; //Testbench if gtaTitleString has an error, this returns the first word of every title
                        return `${gtaTitleString}`;
                    }
                    let GTA_Title = titleCapitalization(GTABonuses);
                    // console.log(`GTA_Title at ${i}: ${GTA_Title} `);		
                    // console.log(`GTA_Bonus at ${i}: ${GTA_Bonus}`);	
                    //--------------------END capitalization Function-----------------//		


                    //----------BEGIN populating gtaFinalString01 ----------//
                    if ((GTA_Bonus != null) && (!GTA_Title.includes("undefined")) && (!GTA_Bonus.includes("undefined"))) {
                        let gtaParas = GTA_Bonus.split("<p>");
                        if (
                            (GTA_Title.toLowerCase() === "gta+ ") ||
                            (GTA_Title.toLowerCase() === "discounts ") ||
                            (GTA_Title.toLowerCase() === "descuentos ") ||
                            (GTA_Title === "cкидки ") ||
                            (GTA_Title === "Скидки ") ||
														(GTA_Title === "折扣優惠 ") ||
														(GTA_Title === "割引 ") ||
														(GTA_Title === "할인 ") ||
                            (GTA_Title.toLowerCase() === "rabatte ") ||
														(GTA_Title.toLowerCase() === "zniżki ") ||
                            (GTA_Title.toLowerCase() === "descontos ") ||
														(GTA_Title.toLowerCase() === "promotions ") ||
														(GTA_Title.toLowerCase() === "sconti ")
                        ) {
                            //console.log(`1 - discount`);
                            gtaFinalString01 += `**${GTA_Title}**\n`;
                            var k = 0;
                            while (gtaParas[k] !== undefined) {
                                if (gtaParas[k].includes("•")) {
                                    //console.log(`1 - discount includes •`);
                                    gtaFinalString01 += `${gtaParas[k]}`;
                                }
                                else {
                                    //console.log(`1 - discount does not include •`);
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
                            //console.log(`2 - only on playstation`);
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
                            (GTA_Title.includes("Премиальный Транспорт"))
                        ) {
                            //console.log(`3 - only title`);
                            gtaFinalString01 += `**${GTA_Title}**\n\n`;
                        }
                        else { // only post the first paragraph
                            //console.log(`4 - else`);
                            if ((gtaParas[1] !== undefined) && (gtaParas[1] !== "")) {
                                //console.log(`4 - title + bonus - bonus length:${gtaParas[1].length}`);
                                if (gtaParas[1].length <= 500) {
                                    gtaFinalString01 += `**${GTA_Title}**\n• ${gtaParas[1]}\n\n`;
                                }
                                else {
                                    gtaFinalString01 += `**${GTA_Title}**\n\n`;
                                }
                            }
                            else if ((GTA_Title !== undefined) && (GTA_Title !== "")) {
                                //console.log(`4 - title only`);
                                gtaFinalString01 += `**${GTA_Title}**\n\n`;
                            }
                        }
                    }
                    else if ((GTA_Title != null) && (!GTA_Title.includes("undefined")) && (GTA_Title != "")) { //if the bonus is in the title
                        //console.log(`5 - bonusintitle`);
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
                    .replace(/        /, "")//removes the trailing spaces 
                    .replace(/\n\n\n/g, "\n\n")
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
                function gtaFooterMin() {
                    if (gtaFinalString.length < (4000 - constChars)) {
                        if (lang === "en") {
                            return `** [More details](${url})**`;
                        }
                        else if (lang === "es") {
                            return `** [Más detalles](${url})**`;
                        }
                        else if (lang === "ru") {
                            return `** [Подробнее](${url})**`;
                        }
                        else if (lang === "de") {
                            return `** [Mehr Details](${url})**`;
                        }
                        else if (lang === "pt") {
                            return `** [Mais detalhes](${url})**`;
                        }
                        else if (lang === "fr") {
                            return `** [Plus de détails](${url})**`;
                        }
                        else if (lang === "it") {
                            return `** [Più dettagli](${url})**`;
                        }
                        else if (lang === "zh") {
                            return `** [更多細節](${url})**`;
                        }
                        else if (lang === "pl") {
                            return `** [Więcej szczegółów](${url})**`;
                        }
                        else if (lang === "ko") {
                            return `** [자세한 내용은](${url})**`;
                        }
                        else if (lang === "ja") {
                            return `** [詳細](${url})**`;
                        }
                        else {
                            return `** [More Details](${url})**`;
                        }
                    } else {
                        return "";
                    }
                }
                function gtaFooterMax() {
                    if (gtaFinalString.length >= (4000 - constChars)) {
                        if (lang === "en") {
                            return `** [More details](${url})**`;
                        }
                        else if (lang === "es") {
                            return `** [Más detalles](${url})**`;
                        }
                        else if (lang === "ru") {
                            return `** [Подробнее](${url})**`;
                        }
                        else if (lang === "de") {
                            return `** [Mehr Details](${url})**`;
                        }
                        else if (lang === "pt") {
                            return `** [Mais detalhes](${url})**`;
                        }
                        else if (lang === "fr") {
                            return `** [Plus de détails](${url})**`;
                        }
                        else if (lang === "it") {
                            return `** [Più dettagli](${url})**`;
                        }
                        else if (lang === "zh") {
                            return `** [更多細節](${url})**`;
                        }
                        else if (lang === "pl") {
                            return `** [Więcej szczegółów](${url})**`;
                        }
                        else if (lang === "ko") {
                            return `** [자세한 내용은](${url})**`;
                        }
                        else if (lang === "ja") {
                            return `** [詳細](${url})**`;
                        }
                        else {
                            return `** [More Details](${url})**`;
                        }
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

                var constChars1 = (gtaFooterMax().length) + (ellipsisFunction().length) + (ellipsisFunction2().length) + gtaImage[0].length;
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
                    .setDescription(`${gtaDate}\n${gtaPost()}${gtaFooterMin()}${ellipsisFunction()}`)
                let gtaEmbed2 = new EmbedBuilder()
                    .setColor(0x00CD06) //Green
                    .setDescription(`${ellipsisFunction()} \n${gtaPost2()} ${ellipsisFunction2()}${gtaFooterMax()}`)
                let gtaImageEmbed = new EmbedBuilder()
                    .setColor(0x00CD06) //Green
                    .setImage(`${gtaImage[0]}`);

                // console.log(`gtaEmbed length: ${gtaEmbed.length}`); //no more than 4000 (line 199)
                // console.log(`gtaEmbed2 length: ${gtaEmbed2.length}`); //no more than 6000 - gtaEmbed.length (line 204)

                if (gtaPost2() === "") {
                    await interaction.editReply({ embeds: [gtaImageEmbed, gtaEmbed] }).catch(err =>
                        interaction.editReply({ embeds: [errorEmbed], ephemeral: true }).then(
                            console.log(`There was an error! \nUser:${interaction.user.tag} - ${interaction} \nError: ${err.stack}`))
                    );
                } else {
                    await interaction.editReply({ embeds: [gtaImageEmbed, gtaEmbed, gtaEmbed2] }).catch(err =>
                        interaction.editReply({ embeds: [errorEmbed], ephemeral: true }).then(
                            console.log(`There was an error! \nUser:${interaction.user.tag} - ${interaction} \nError: ${err.stack}`))
                    );
                }

                //BEGIN expiredEmbed	

                function gtaExpiredEmbedString() {
                    if (lang === "en") {
                        return `These bonuses are expired. \nRockstar typically releases the latest weekly bonuses every \nThursday after 1:00 PM EST.`;
                    }
                    else if (lang === "es") {
                        return `Estos bonos pueden estar vencidos. \nRockstar suele publicar bonificaciones cada \njueves después de las 13:00 hora del este.`;
                    }
                    else if (lang === "pt") {
                        return `Esses bônus expiraram. \nA Rockstar normalmente lança os últimos bônus semanais a cada \nquinta-feira depois das 13:00 Hora do Leste.`;
                    }											
                    else if (lang === "ru") {
                        return `Срок действия этих бонусов истек. \nRockstar обычно выпускает последние еженедельные бонусы каждый \nчетверг после 13:00 по восточному поясному времени.`;
                    }
                    else if (lang === "de") {
                        return `Diese Boni sind möglicherweise abgelaufen. \nNormalerweise veröffentlicht Rockstar die Boni \nDonnerstags nach 13:00 Uhr Ostküsten-Standardzeit (Nordamerika).`;
                    }
                    else if (lang === "pl") {
                        return `Te bonusy wygasły. \nRockstar zazwyczaj udostępnia najnowsze cotygodniowe bonusy w każdy \nczwartek po godzinie 13:00 czasu wschodniego.`;
                    }												
                    else if (lang === "fr") {
                        return `Ces bonus ont expiré. \nRockstar publie généralement les derniers bonus hebdomadaires tous les \njeudis après 13h00, heure de l'Est.`;
                    }
                    else if (lang === "it") {
                        return `Questi bonus sono scaduti. \nRockstar in genere rilascia gli ultimi bonus settimanali ogni \ngiovedì dopo le 13:00, ora di New York.`;
                    }		
                    else if (lang === "zh") {
                        return `此獎金已過期。 Rockstar 通常在東部時間每週四 13:00 之後發布最新的每週獎金。`;
                    }	
                    else if (lang === "ja") {
                        return `このボーナスは期限切れです。 Rockstar は通常、毎週木曜日の東部時間 13:00 以降に新しい週次ボーナスをリリースします。`;
                    }	
                    else if (lang === "ko") {
                        return `이 보너스는 만료되었습니다. Rockstar는 일반적으로 동부 표준시로 매주 목요일 13:00 이후에 최신 주간 보너스를 출시합니다.`;
                    }												
                    else {
                        return `These bonuses are expired. \nRockstar typically releases the latest weekly bonuses every \nThursday after 1:00 PM EST.`;
                    }
                }


                function itIs() {
                    if (lang === "en") {
                        return "It is";
                    }
                    else if (lang === "es") {
                        return "Son las";
                    }
                    else if (lang === "pt") {
                        return "São";
                    }											
                    else if (lang === "ru") {
                        return "Сейчас";
                    }
                    else if (lang === "de") {
                        return "Es ist jetzt";
                    }
                    if (lang === "pl") {
                        return "Jest";
                    }		
                    if (lang === "fr") {
                        return "Il est";
                    }	
                    if (lang === "it") {
                        return "Sono le";
                    }	
                    if (lang === "zh") {
                        return "現在是東部時間";
                    }	
                    if (lang === "ja") {
                        return "東部時間";
                    }		
                    if (lang === "ko") {
                        return "동부 시간으로";
                    }												
                    else {
                        return "It is";
                    }
                }
                function now() {
                    if (lang === "en") {
                        return " EST now.";
                    }
                    else if (lang === "es") {
                        return " hora del este ahora.";
                    }
                    else if (lang === "pt") {
                        return ", horário do leste agora.";
                    }											
                    else if (lang === "ru") {
                        return " по восточному поясному времени.";
                    }
                    else if (lang === "de") {
                        return " Ostküsten-Standardzeit (Nordamerika).";
                    }
                    else if (lang === "pl") {
                        return " czasu wschodniego.";
                    }	
                    else if (lang === "fr") {
                        return ", heure de l'Est.";
                    }			
                    else if (lang === "it") {
                        return " ora di New York.";
                    }												
                    else if (lang === "zh") {
                        return "";
                    }						
                    else if (lang === "ja") {
                        return "分です。";
                    }												
                    else if (lang === "ko") {
                        return " 분입니다.";
                    }												
                    else {
                        return " EST now.";
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
                    .setDescription(`${gtaExpiredEmbedString()}`)
                    .setFooter({ text: `${itIs()} ${hourCheck()}:${estMinute}${amPMCheck()}${now()}`, iconURL: process.env.logo_link })

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