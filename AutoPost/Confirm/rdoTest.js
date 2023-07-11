const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const phantom = require('phantom'); //https://github.com/amir20/phantomjs-node
const LANG = require('../../events/LANG.js');
let errorText = `There was an error while executing this command!\nThe error has been sent to the developer and it will be fixed as soon as possible. \nIf the error persists you can try re-inviting the Rockstar Weekly bot by [clicking here](<${process.env.invite_link}>). \nReport the error by joining the Rockstar Weekly bot support server: [click here](<${process.env.support_link}>).`;

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isButton()) { return };
        if (interaction.customId.startsWith(`rdoTest -`)) {

            let buttonUserID01 = (interaction.customId).split("rdoTest - ");
            let buttonUserID = buttonUserID01[1];
            //console.log(`start buttonUserID: ${buttonUserID}`);
            //console.log(`start interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`);
            //console.log(`start interaction.user.id: ${interaction.user.id} && buttonUserID: ${buttonUserID}`);	

            await interaction.deferUpdate();

            var lang = await LANG.LANG(interaction);
            //console.log(`LANG:${await LANG.LANG(interaction)}`);				

            function thinking() {
                if (lang === "en") {
                    return `Thinking...`;
                }
                else if (lang === "es") {
                    return `Pensando...`;
                }
                else if (lang === "pt") {
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
                else if (lang === "ja") {
                    return `考えています...`;
                }
                else if (lang === "ko") {
                    return `나는 생각 중입니다...`;
                }
                else {
                    return `Thinking...`;
                }
            }

            function testGTAButtonString() {
                if (lang === "en") {
                    return `Test GTA`;
                }
                else if (lang === "es") {
                    return `Prueba GTA`;
                }
                else if (lang === "pt") {
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
                    return `測試 GTA`;
                }
                else if (lang === "ja") {
                    return `テストGTA`;
                }
                else if (lang === "ko") {
                    return `테스트 GTA`;
                }
                else {
                    return `Test GTA`;
                }
            }

            function testRDOButtonString() {
                if (lang === "en") {
                    return `Test RDO`;
                }
                else if (lang === "es") {
                    return `Prueba RDO`;
                }
                else if (lang === "pt") {
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
                    return `測試 RDO`;
                }
                else if (lang === "ja") {
                    return `テストRDO`;
                }
                else if (lang === "ko") {
                    return `테스트 RDO`;
                }
                else {
                    return `Test RDO`;
                }
            }

            function goBack() {
                if (lang === "en") {
                    return `Go Back`;
                }
                else if (lang === "es") {
                    return `Volver`;
                }
                else if (lang === "pt") {
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
                else if (lang === "ja") {
                    return `戻る`;
                }
                else if (lang === "ko") {
                    return `돌아가다`;
                }
                else {
                    return `Go Back`;
                }
            }

            //BEGIN THINKING BUTTONS					
            fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
                if (err) { console.log(`Error: ${err}`) }
                else {

                    var gtaChannelIds = [];
                    interaction.guild.channels.cache.forEach(channel => {
                        if (data.includes(channel.id)) {
                            gtaChannelIds.push(channel.id);
                        }
                    });
                    //console.log(`rdoChannelIds: ${rdoChannelIds}`);

                    gtaDisabled = false;
                    if (gtaChannelIds[0] === undefined) {
                        gtaDisabled = true;
                    }

                    const thinkingButtons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`gtaTest - ${buttonUserID}`)
                                .setLabel(`${testGTAButtonString()}`)
                                .setStyle(ButtonStyle.Success)
                                .setDisabled(gtaDisabled),
                            new ButtonBuilder()
                                .setCustomId(`thinking - ${buttonUserID}`)
                                .setLabel(`${thinking()}`)
                                .setStyle(ButtonStyle.Danger)
                                .setDisabled(true),
                            new ButtonBuilder()
                                .setCustomId(`confirmback - ${buttonUserID}`)
                                .setLabel(`${goBack()}`)
                                .setStyle(ButtonStyle.Secondary),
                        );

                    interaction.editReply({ components: [thinkingButtons], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));

                }
            }); //end fs.readFile for RDODataBase.txt


            //END THINKING BUTTONS											

            fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
                if (err) { console.log(`Error: ${err}`) }
                else {

                    //console.log(`data: ${data}`);
                    let guildIDs01 = data.split(`guild:${interaction.guild.id} - `);
                    //console.log(`guildIDs01[1]: ${guildIDs01[1]}\n`);
                    //console.log(`guildIDs01[2]: ${guildIDs01[2]}\n`);

                    let channelIDs01 = data.split(`guild:${interaction.guild.id} - channel:`);
                    //console.log(`channelIDs01[1]: ${channelIDs01[1]}\n`);		
                    //console.log(`channelIDs01[2]: ${channelIDs01[2]}\n`);	

                    let guildIDs = [];
                    let channelIDs = [];
                    for (i = 1; i <= guildIDs01.length - 1; i++) {
                        let guildIDs02 = guildIDs01[i].split("-");
                        let guildIDs03 = guildIDs02[0];
                        //console.log(`guildIDs at ${i}: ${guildIDs03}`);

                        guildIDs += `${guildIDs03} - `;

                        let channelIDs02 = channelIDs01[i].split("-");
                        let channelIDs03 = channelIDs02[0];
                        //console.log(`channelIDs at ${i}: ${channelIDs03}`);
                        channelIDs += `${channelIDs03} - `;
                    }

                    //console.log(`guildIDs: ${guildIDs}`);
                    //console.log(`channelIDs: ${channelIDs}`); //do not comment out - no idea why
                    //----------END Formatting GuildIds and ChannelIds-----------//	



                    var sentPostDescString = "_ _";
                    async function rdoTest() {

                        //-------------------Begin RDO TEST POST---------------------//						

                        //Begin RDO Formatting		
                        let rdoURL = process.env.SOCIAL_URL_RDO2;

                        //await interaction.editReply(`Console Logged 👍`).catch(console.error);

                        const instance = await phantom.create();
                        const page = await instance.createPage();

                        await page.property('viewportSize', { width: 1024, height: 600 });
                        const status = await page.open(rdoURL);
                        //console.log(`Page opened with status [${status}].`);
                        if (status === `success`) { //checks if Rockstar Social Club website is down
                            const content = await page.property('content'); // Gets the latest rdo updates
                            //console.log(content); 

                            let baseURL = "https://socialclub.rockstargames.com/";

                            let urlHash02 = content.split("linkToUrl\":\"");
                            let urlHash01 = urlHash02[1].split("\"");
                            let urlHash = urlHash01[0];
                            //console.log(`urlHash: ${urlHash}`);

                            let urlLink02 = content.split("linkToUrl\":");
                            let urlLink01 = urlLink02[1].split("\"");
                            //let urlLink = urlLink01[1];
                            //console.log(`urlLink: ${urlLink01[1]}`);

                            function urlLink() {
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

                            let langBase = `/?lang=`;
                            let langURL = `${langBase}${lang}`;

                            let url = `${baseURL}/${urlLink()}${langURL}`;
                            //console.log(`url: ${url}`);	

                            const rdoStatus = await page.open(url);
                            if (rdoStatus === `success`) {
                                const content = await page.property('content'); // Gets the latest rdo updates
                                //console.log(content); 
                                let rdoString001 = content.toString(); //converts HTML to string (necessary? not sure.);
                                //console.log(`rdoString001: ${rdoString001}`);	
                                let rdoString01 = rdoString001.split("cm-content\">"); //splits the header from the body
                                let rdoHeader = rdoString01[0];
                                //console.log(`rdoHeader: ${rdoHeader}`);

                                let rdoImage01 = rdoHeader.split("og:image\" content=\"");
                                //console.log(`rdoImage01: ${rdoImage01[1]}`);
                                let rdoImage = rdoImage01[1].split("\" data-rh=");
                                //console.log(`rdoImage: ${rdoImage[0]}`);

                                let rdoDate01 = rdoHeader.split("class=\"date\">"); //gets the event date
                                //console.log(`${rdoDate01[1]}`);
                                let rdoDate = rdoDate01[1].split("<"); //cuts off the end of the date
                                //console.log(`Date: ${rdoDate[0]}\n`);	

                                let rdoTitleOG01 = rdoHeader.split("h1");
                                let rdoTitleOG02 = rdoTitleOG01[1].split(">");
                                let rdoTitleOG03 = rdoTitleOG02[1].split("<");
                                let rdoTitleOG = rdoTitleOG03[0];
                                //console.log(`rdoTitleOG:${rdoTitleOG}`);		

                                let rdoString002 = rdoString01[1]; //Splits the header from the body
                                //console.log(`rdoString: ${rdoString002}`)
                                let rdoString02 = rdoString002.split("</div>"); //splits the footer from the body
                                //console.log(`rdoString02: ${rdoString02[0]}`);
                                let rdoStringOG = `${rdoString02[0]}<p><b>`; //the entire string before any editing w/o footer or header
                                //console.log(`rdoStringOG: ${rdoStringOG}`);

                                //Replaces or removes HTML formatting that can interfere with split functions or is constant
                                let rdoString = rdoStringOG.replace(/<li>/g, "• ")
                                    .replace(/<\/li>/g, "")
                                    .replace(/<\/ul>/g, "")
                                    .replace(/&amp;/g, "&")
                                    .replace(/&nbsp;/g, " ") //Non breaking space
                                    .replace(/\n\n/g, "\n")
                                    .replace(/<ul style="line-height:1.5;">/g, "\n")

																		//russian
																		.replace(/\<\/pДо>/, "")
																		.replace(/<\/span>/, "")																	

                                    //spanish
                                    .replace(/<\/strong>/g, "")
                                    .replace(/<strong>/g, "")

                                    //German
                                    .replace(/" draggable="false/g, "")

                                //console.log(`rdoString: ${rdoString}`);

                                //--------------------BEGIN formatting for links--------------------//
                                let rdoLinks001 = rdoString.split("<a href=\"");
                                let rdoLinks = "";
                                let rdoLinkTitles = "";
                                for (j = 1; j <= rdoLinks001.length - 1; j++) {
                                    let rdoLinks01 = rdoLinks001[j].split("\" target");
                                    //console.log(`rdoLinks01 at ${j}: ${rdoLinks01[0]}`);
                                    let rdoLinks02 = rdoLinks01[0].split("\">");
                                    //console.log(`rdoLinks02 at ${j}: ${rdoLinks02[0]}`);
                                    rdoLinks += `${rdoLinks02[0]}||`;

                                    let rdoLinkTitles01 = rdoLinks001[j].split("\">");
                                    let rdoLinkTitles02 = rdoLinkTitles01[1].split("</a>");

                                    rdoLinkTitles += `${rdoLinkTitles02[0]}||`;
                                }
                                //console.log(`rdoLinks: ${rdoLinks}`);
                                //console.log(`rdoLinkTitles: ${rdoLinkTitles}`);

                                let rdoLinks002 = rdoLinks.split("||");
                                //console.log(`rdoLinks002: ${rdoLinks002}`);
                                let rdoLinkTitles002 = rdoLinkTitles.split("||");
                                //console.log(`rdoLinkTitles002: ${rdoLinkTitles002}`);

                                let rdoLinkFormatted = rdoString;
                                for (m = 0; m <= rdoLinks002.length - 1; m++) { // keep - 2; the last element will always be blank
                                    rdoLinkFormatted = rdoLinkFormatted.replace(/<a.*?a>/, `[${rdoLinkTitles002[m]}](${rdoLinks002[m]})`); //replaces each link with proper discord formatted link
                                    //console.log(`rdoLinkFormatted at ${m}: ${rdoLinkFormatted}`);
                                    //console.log(`rdoLinkTitles002 at ${m}: ${rdoLinkTitles002[m]}`);
                                    //console.log(`rdoLinks002 at ${m}: ${rdoLinks002[m]}`);
                                }
                                //console.log(`rdoLinkFormatted: ${rdoLinkFormatted}`);
                                //--------------------END formatting for links--------------------//

                                //--------------------BEGIN checking for words that are bold at the beginning of a paragraph-------------------//

                                function notATitleIndex() {
                                    let rdoTitles001 = rdoLinkFormatted.split("<p><b>");

                                    let notATitleIndex001 = "";
                                    for (i = 0; i <= rdoTitles001.length - 1; i++) {
                                        if (rdoTitles001[i].charAt(1) != rdoTitles001[i].charAt(1).toUpperCase()) {
                                            notATitleIndex001 += `${i}`;
                                        }
                                    }
                                    return `${notATitleIndex001}`;
                                }
                                //console.log(`notATitleIndex: ${notATitleIndex()}`);
                                let notATitleIndex01 = notATitleIndex();
                                //console.log(`notATitleIndex01: ${notATitleIndex01}`);

                                function notATitleBonus() {
                                    let rdoTitles001 = rdoLinkFormatted.split("<p><b>");

                                    let notATitleBonus = "";
                                    for (i = 0; i <= rdoTitles001.length - 1; i++) {
                                        if (rdoTitles001[i].charAt(1) != rdoTitles001[i].charAt(1).toUpperCase()) {
                                            notATitleBonus += `${rdoTitles001[i]}`;
                                        }
                                    }
                                    return `${notATitleBonus}`;
                                }
                                //console.log(`notATitleBonus: ${notATitleBonus()}`);
                                let notATitleBonus01 = notATitleBonus();
                                let notATitleBonusFirstWord = notATitleBonus01.split(" ");
                                //console.log(`notATitleBonusFirstWord[0]: ${notATitleBonusFirstWord[0]}`);

                                function rdoBoldFormatted() {
                                    if (notATitleIndex01 != "") {
                                        return rdoLinkFormatted.replace(new RegExp(`<p><b>${notATitleBonusFirstWord[0]}`, "g"), `<p>${notATitleBonusFirstWord[0]}`); //replaces any words that are bold at the beginning of a paragraph with non-bold
                                    }
                                    else {
                                        return rdoLinkFormatted;
                                    }
                                }
                                //console.log(`rdoBoldFormatted(): ${rdoBoldFormatted()}`);

                                //--------------------END checking for words that are bold at the beginning of a paragraph-------------------//

                                let RDOBonuses01 = rdoBoldFormatted().split("<p><b>");
                                //console.log(`RDOBonuses01: ${RDOBonuses01}`)
                                let rdoFinalString01 = "";	//rdoFinalString before HTML formatting
                                let nextGenIndex1 = "";
                                let nextGenIndex2 = "";

                                //-----BEGIN for loop-----//		

                                //console.log(`RDOBonuses01 length: ${RDOBonuses01.length}`);
                                for (i = 0; i <= RDOBonuses01.length - 2; i++) { //final element will always be blank
                                    //console.log(`RDOBonuses01 at ${i}: ${RDOBonuses01}`);
                                    let RDOBonuses = RDOBonuses01[i].split("</b></p>");
                                    //console.log(`RDOTitles at ${i}: ${RDOBonuses[0]}\nRDOBonuses at ${i}: ${RDOBonuses[1]}`);

																		let RDO_Title = `${RDOBonuses[0]} `;
								                    let RDO_Bonus = RDOBonuses[1];
								                    //console.log(`RDO_Title at ${i}: ${RDO_Title} `);
								                    //console.log(`RDO_Bonus at ${i}: ${RDO_Bonus}`);	

                                    //-----BEGIN get the index of "Only on PlayStation..." title-----//

                                    function onlyOnIndex1() { //returns the index of the title: Only on Playstation...
                                        if (RDO_Title.toLowerCase().includes("only on playstation")) {
                                            return i + 1;
                                        } else {
                                            return -1;
                                        }
                                    }
                                    //console.log(`onlyOnIndex1() at ${i}: ${onlyOnIndex1()}`);

                                    function onlyOnIndex2() { //returns the index of the title: Only on Playstation...
                                        if (RDO_Title.toLowerCase().includes("only on playstation")) {
                                            return i + 2;
                                        } else {
                                            return -2;
                                        }
                                    }
                                    //console.log(`onlyOnIndex2() at ${i}: ${onlyOnIndex2()}`);		

                                    if (onlyOnIndex1() > 0) {
                                        nextGenIndex1 += onlyOnIndex1(); //populates nextGenIndex1 with the index of the title after "Only on PS5..."
                                    }
                                    //console.log(`nextGenIndex1 at ${i}: ${nextGenIndex1}`);

                                    if (onlyOnIndex2() > 0) {
                                        nextGenIndex2 += onlyOnIndex2(); //populates nextGenIndex1 with the index of the second title after "Only on PS5..."
                                    }
                                    //console.log(`nextGenIndex2 at ${i}: ${nextGenIndex2}`);								
                                    //-----END get the index of "Only on PlayStation..." title-----//			

                                    //-----BEGIN populating rdoFinalString01 -----//
                                    if (i === 0) {
                                        let rdoParas = RDO_Title.split("<p>");
                                        for (c = 1; c <= rdoParas.length - 1; c++) {

                                            rdoFinalString01 += `• ${rdoParas[c].charAt(0).toUpperCase()}${rdoParas[c].substring(1)}\n\n`;
                                        }
                                    }
																	else if (RDO_Bonus != undefined) {
					                            if ((RDO_Title.toLowerCase() === "discounts ") ||
							                            (RDO_Title.toLowerCase() === "descuentos ") ||
							                            (RDO_Title === "СКИДКИ ") ||
																					(RDO_Title === "折扣優惠 ") ||
																					(RDO_Title === "割引 ") ||
																					(RDO_Title === "할인 ") ||
							                            (RDO_Title.toLowerCase() === "rabatte ") ||
																					(RDO_Title.toLowerCase() === "zniżki ") ||
							                            (RDO_Title.toLowerCase() === "descontos ") ||
																					(RDO_Title === "PROMOTIONS ") ||
																					(RDO_Title.toLowerCase() === "sconti ") ||
					                                (RDO_Title.includes("DESCONTOS"))) {
                                            rdoFinalString01 += `**${RDO_Title}**${RDO_Bonus}\n\n`;
                                        }
					                            else if (
					                                (RDO_Title.includes("2X")) || //German, and Portuguese use numbers 
					                                (RDO_Title.includes("3X")) ||
					                                (RDO_Title.includes("4X")) ||
					                                (RDO_Title.toLowerCase().includes("double rewards")) || //English uses both.. of course 
					                                (RDO_Title.toLowerCase().includes("triple rewards")) ||
					                                (RDO_Title.toLowerCase().includes("doble de")) || //Spanish and Russian use words
					                                (RDO_Title.toLowerCase().includes("triple de")) ||
					                                (RDO_Title.toLowerCase().includes("cuádruple de")) ||
					                                (RDO_Title.includes("Вдвое Больше")) ||
					                                (RDO_Title.includes("Втрое Больше")) ||
					                                (RDO_Title.includes("Удвоенные Награды")) ||
																					(RDO_Title.includes("DOUBLÉS")) || //French
																					(RDO_Title.includes("DOPPI")) || //Italian
					                                (RDO_Title.includes("Четыре Раза"))) {
                                            rdoFinalString01 += `**${RDO_Title}**\n\n`;
                                        }
                                        else if (
                                            (RDO_Title.toLowerCase().includes("featured series")) ||
                                            (RDO_Title.includes("Calendario De Series Destacadas")) ||
                                            (RDO_Title.includes("Расписание избранных серий")) ||
                                            (RDO_Title.includes("Übersicht Über Die Präsentierten Serien")) ||
                                            (RDO_Title.includes("Calendário De Série Em Destaque"))) {
                                            rdoFinalString01 += `**${RDO_Title}**${RDO_Bonus}\n\n`;
                                        }
                                        else if (
                                            (RDO_Title.toLowerCase().includes("weekly bonuses")) ||
                                            (RDO_Title.includes("Bonificaciones Semanales")) ||
                                            (RDO_Title.includes("Еженедельные бонусы")) ||
                                            (RDO_Title.includes("Wöchentliche Boni")) ||
                                            (RDO_Title.includes("Bônus Semanais"))) {
                                            rdoFinalString01 += `**${RDO_Title}**${RDO_Bonus}\n\n`;
                                        }
                                        else if (
                                            (RDO_Title.toLowerCase().includes("monthlong rewards")) ||
                                            (RDO_Title.includes("Recompensas Durante Todo El Mes")) ||
                                            (RDO_Title.includes("Награды месяца")) ||
                                            (RDO_Title.includes("Monatsbelohnungen")) ||
                                            (RDO_Title.includes("Recompensas O Mês Inteiro"))) {
                                            rdoFinalString01 += `**${RDO_Title}**${RDO_Bonus}\n\n`;
                                        }
                                        else if (RDO_Title.toLowerCase().includes(":")) {
                                            rdoFinalString01 += `**${RDO_Title}**${RDO_Bonus}\n\n`;
                                        }
                                        else if (RDO_Bonus.includes("• ")) { // If the bonus includes a list

                                            let rdoParas = RDO_Bonus.split("<p>");
                                            //console.log(`rdoParas at ${i}: ${rdoParas}`);
                                            //console.log(`rdoParas length at ${i}: ${rdoParas.length}`);
                                            let rdoParaBonuses = "";

                                            for (c = 1; c <= rdoParas.length - 1; c++) {
                                                rdoParaBonuses += `• ${rdoParas[c]}\n`;
                                            }

                                            rdoFinalString01 += `**${RDO_Title}**\n${rdoParaBonuses}\n`;
                                        }
                                        else {
                                            let rdoParas = RDO_Bonus.split("<p>");
                                            //console.log(`rdoParas at ${i}: ${rdoParas}`);
                                            //console.log(`rdoParas length at ${i}: ${rdoParas.length}`);
                                            let rdoParaBonuses = "";
                                            for (c = 1; c <= rdoParas.length - 1; c++) {
                                                rdoParaBonuses += `• ${rdoParas[c]}\n`;
                                            }
                                            rdoFinalString01 += `**${RDO_Title}**\n${rdoParaBonuses}\n`;
                                        }

                                    }
                                }
                                //-----------END for loop----------//		
                                //console.log(`rdoFinalString01: ${rdoFinalString01}`); //rdoFinalString before HTML formatting
                                //console.log(`rdoFinalString01.length: ${rdoFinalString01.length}`);	
                                let rdoFinalString = rdoFinalString01.replace(/<p>/g, "")
                                    .replace(/<\/p>/g, "")
                                    .replace(/<\/b>/g, "")
                                    .replace(/<b>/g, "")
                                    .replace(/\n\n• /g, "• ") //removes spaces before a list item - titles already have newlines
                                    .replace(/\n\n/g, "\n")
                                    .replace(/\n\n\n/g, "\n")
                                    .replace(/\*\*\n\*\*/g, "**\n\n**")
                                    .replace(/• undefined/g, "• ")
                                    .replace(/\)• /g, ")\n• ") //adds a newline between link lists														

                                //console.log(`rdoFinalString01.length: ${rdoFinalString01.length}`);
                                //console.log(`rdoFinalString.length: ${rdoFinalString.length}`);

                                var constChars = (rdoDate.length + 2) + (rdoTitleOG.length);
                                function ellipsisFunction() {
                                    if (rdoFinalString.length >= (4000 - constChars)) {
                                        return "...";
                                    } else {
                                        return "";
                                    }
                                }
                                function ellipsisFunction2() {
                                    if (rdoFinalString.length >= (6000 - constChars - rdoImage[0].length)) {
                                        return "...\n";
                                    } else {
                                        return "";
                                    }
                                }
                                function rdoFooterMin() {
                                    if (rdoFinalString.length < (4000 - constChars)) {
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
                                function rdoFooterMax() {
                                    if (rdoFinalString.length >= (4000 - constChars)) {
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

                                var constChars1 = (rdoFooterMax().length) + (ellipsisFunction().length) + (ellipsisFunction2().length) + rdoImage[0].length;
                                var rdoNewlines1 = rdoFinalString.substr(bestBreak(), (6000 - constChars - constChars1 - bestBreak())).split("\n");
                                var tempString1 = rdoNewlines1[rdoNewlines1.length - 1];
                                function bestEndBreak() {
                                    if (rdoFinalString.length <= (6000 - constChars - constChars1)) {
                                        return rdoFinalString.length;
                                    }
                                    return (6000 - bestBreak() - constChars - constChars1 - tempString1.length); //removes the last bonus if over 6000 chars
                                }
                                //console.log(`bestEndBreak:${bestEndBreak()}`);

                                function rdoPost() {
                                    return rdoFinalString.slice(0, (bestBreak()));
                                }
                                //console.log(`rdoPost().length:${rdoPost().length || 0}`);
                                function rdoPost2() {
                                    if (rdoPost().length < rdoFinalString.length) {
                                        let post02 = rdoFinalString.substr((bestBreak()), (bestEndBreak()));
                                        return post02;
                                    } else {
                                        return "";
                                    }
                                }
                                //console.log(`rdoPost2().length:${rdoPost2().length || 0}`);


                                let rdoEmbed = new EmbedBuilder()
                                    .setColor(0xC10000) //Red
                                    .setTitle(`${rdoTitleOG}`)
                                    .setDescription(`${rdoDate[0]}\n\n${rdoPost()} \n${rdoFooterMin()} ${ellipsisFunction()}`)
                                let rdoEmbed2 = new EmbedBuilder()
                                    .setColor(0xC10000) //Red
                                    .setDescription(`${ellipsisFunction()} \n${rdoPost2()} ${rdoFooterMax()}`)
                                let rdoImageEmbed = new EmbedBuilder()
                                    .setColor(0xC10000) //Red
                                    .setImage(`${rdoImage[0]}`);

                                // console.log(`rdoEmbed length: ${rdoEmbed.length}`); //no more than 4096 (line 199)
                                // console.log(`rdoEmbed2 length: ${rdoEmbed2.length}`); //no more than 6000 - rdoEmbed.length (line 204)

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
																					if (lang === "en") {
																							return `View Channel, Send Messages, and Embed Links`;
																					}
																					if (lang === "es") {
																							return `Ver canal y Enviar mensajes y Insertar enlaces`;
																					}
																					if (lang === "pt") {
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
																					else if (lang === "ja") {
																							return `チャンネルを見る、メッセージを送信、埋め込みリンク`;
																					}
																					else if (lang === "ko") {
																							return `채널 보기、 메시지 보내기、 링크 첨부`;
																					}
																					else {
																							return `View Channel, Send Messages, and Embed Links`;
																					}
                                        }
                                        else if (!((interaction.guild.members.me).permissionsIn(channelIDArray[c]).has(PermissionsBitField.Flags.EmbedLinks))) {
																					if (lang === "en") {
																							return `Embed Links`;
																					}
																					if (lang === "pt") {
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
																					else if (lang === "ja") {
																							return `埋め込みリンク`;
																					}
																					else if (lang === "ko") {
																							return `링크 첨부`;
																					}
																					else {
																							return `Embed Links`;
																					}
                                        }
                                        else if (!(interaction.guild.members.me).permissionsIn(channelIDArray[c]).has(PermissionsBitField.Flags.SendMessages)) { //missing send messages also prevents embedding links
                                            if (lang === "en") {
                                                return `Send Messages and Embed Links`;
                                            }
                                            if (lang === "es") {
                                                return `Enviar mensajes y Insertar enlaces`;
                                            }
                                            if (lang === "pt") {
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
                                            else if (lang === "ja") {
                                                return `メッセージを送信 と 埋め込みリンク`;
                                            }
                                            else if (lang === "ko") {
                                                return `메시지 보내기 그리고 링크 첨부`;
                                            }
                                            else {
                                                return `Send Messages and Embed Links`;
                                            }
                                        }

                                    }	//end permission() function	

                                    function sentPostDesc() {
                                        if (permission() === undefined) {
                                            if (lang === "en") {
                                                return `• A post has been sent to <#${channelIDArray[c]}>!\n`;
                                            }
                                            else if (lang === "es") {
                                                return `• El mensaje ha sido enviado a <#${channelIDArray[c]}>.\n`;
                                            }
                                            else if (lang === "pt") {
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
                                                return `• 消息已發送至<#${channelIDArray[c]}>。`;
                                            }
                                            else if (lang === "ja") {
                                                return `• メッセージが <#${channelIDArray[c]}> チャネルに送信されました。`;
                                            }
                                            else if (lang === "ko") {
                                                return `• 메시지가 <#${channelIDArray[c]}>로 전송되었습니다.`;
                                            }
                                            else {
                                                return `• Posts have been sent to <#${channelIDArray[c]}>!\n`;
                                            }
                                        } else {
                                            if (lang === "en") {
                                                return `• The bot is missing the ${permission()} permission in <#${channelIDArray[c]}>.\n`;
                                            }
                                            else if (lang === "es") {
                                                return `• Al bot le falta el permiso ${permission()} en <#${channelIDArray[c]}>.\n`;
                                            }
                                            else if (lang === "pt") {
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
                                                return `• 機器人缺少 <#${channelIDArray[c]}> 中的 ${permission()} 權限.\n`;
                                            }
                                            else if (lang === "ja") {
                                                return `• ボットに <#${channelIDArray[c]}> の ${permission()} 権限がありません.\n`;
                                            }
                                            else if (lang === "ko") {
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
                                        if (rdoFinalString.length < (4000 - constChars)) {
                                            interaction.guild.channels.fetch(channelIDArray[c]).then(channel => channel.send(({ embeds: [rdoImageEmbed, rdoEmbed] }))).catch(err => console.log(`RDO Test Min Error: ${err.stack}`));
                                        } else {
                                            interaction.guild.channels.fetch(channelIDArray[c]).then(channel => channel.send({ embeds: [rdoImageEmbed, rdoEmbed, rdoEmbed2] })).catch(err => console.log(`RDO Test Max Error: ${err.stack}`));
                                        }
                                    }


                                } //end c loop

                            }
                            else {
                                let RStarDownEmbed = new EmbedBuilder()
                                    .setColor(0xFF0000) //RED
                                    .setDescription(`The Rockstar Social Club website is down. \nPlease try again later.`)
                                client.channels.fetch(process.env.logChannel2).then(channel => channel.send({ embeds: [RStarDownEmbed], ephemeral: true }));
                                console.log(`The Rockstar Social Club website is down.`);
                            }
                        } //end if (status === `success`)
                        else {
                            let RStarDownEmbed = new EmbedBuilder()
                                .setColor(0xFF0000) //RED
                                .setDescription(`The Rockstar Social Club website is down. \nPlease try again later.`)
                            interaction.followUp({ embeds: [RStarDownEmbed], ephemeral: true });
                            console.log(`The Rockstar Social Club website is down.`);
                        }



                        //Begin ephemeral testEmbed
                        let rdoChannelIds = [];
                        let successCount = 0;
                        interaction.guild.channels.cache.forEach(channel => {
                            if (data.includes(channel.id)) {
                                rdoChannelIds.push(channel.id);
                                if ((interaction.guild.members.me).permissionsIn(channel.id).has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.EmbedLinks])) {
                                    successCount++;
                                }
                            }
                        });
                        //console.log(`rdoChannelIds: ${rdoChannelIds}`);		

                        function success() {
                            if (successCount === rdoChannelIds.length) {
                                if (lang === "en") {
                                    return `Success`;
                                }
                                else if (lang === "es") {
                                    return `Éxito`;
                                }
                                else if (lang === "ru") {
                                    return `Успех`;
                                }
                                else if (lang === "en") {
                                    return `Success`;
                                }
                                else if (lang === "es") {
                                    return `Éxito`;
                                }
                                else if (lang === "pt") {
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
                                else if (lang === "ja") {
                                    return `成功`;
                                }
                                else if (lang === "ko") {
                                    return `성공`;
                                }
                                else {
                                    return `Success`;
                                }
                            }
                            else {
                                if (lang === "en") {
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
                                    return `缺少權限`;
                                }
                                else if (lang === "ja") {
                                    return `権限がありません`;
                                }
                                else if (lang === "ko") {
                                    return `権限がありません`;
                                }
                                else {
                                    return `Missing Permisions`;
                                }
                            }
                        }

                        function testColor() {
                            if (successCount === rdoChannelIds.length) {
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


                        //----------------------------------END RDO TEST POST----------------------------------//
                    }	//end rdoTest()

                    //--BEGIN TRANSLATIONS--//		


                    function notYourButtonString() {
                        if (lang === "en") {
                            return `These buttons are not for you.`;
                        }
                        else if (lang === "es") {
                            return `Estos botones no son para ti.`;
                        }
                        else if (lang === "pt") {
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
                            return `這些按鈕不適合您。`;
                        }
                        else if (lang === "ja") {
                            return `これらのボタンはあなたのためではありません。`;
                        }
                        else if (lang === "ko") {
                            return `이 버튼은 당신을 위한 것이 아닙니다.`;
                        }
                        else {
                            return `These buttons are not for you.`;
                        }
                    }

                    function missingPermissions() {
                        if (LANG === "en") {
                            return `You do not have the required permissions to do that.`;
                        }
                        else if (LANG === "es") {
                            return `No tienes permiso para hacer eso.`;
                        }
                        else if (LANG === "pt") {
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
                            return `您沒有所需的權限。`;
                        }
                        else if (LANG === "ja") {
                            return `必要な権限がありません。`;
                        }
                        else if (LANG === "ko") {
                            return `필요한 권한이 없습니다.`;
                        }
                        else {
                            return `You do not have the required permissions to do that.`;
                        }
                    }

                    function noSubscriptions() {
                        if (lang === "en") {
                            return `There are no channels subscribed to GTA Online.\n`;
                        }
                        else if (lang === "es") {
                            return `No hay canales suscritos a GTA Online.\n`;
                        }
                        else if (lang === "pt") {
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
                            return `沒有訂閱 GTA 在線模式的頻道。\n`;
                        }
                        else if (lang === "ja") {
                            return `GTA Online に登録しているチャンネルはありません。\n`;
                        }
                        else if (lang === "ko") {
                            return `GTA 온라인을 구독하는 채널이 없습니다.\n`;
                        }
                        else {
                            return `There are no channels subscribed to GTA Online.\n`;
                        }
                    }

                    //--END TRANSLATIONS--//				

                    //begin checking for permissions

                    var rdoChannelIds = [];
                    interaction.guild.channels.cache.forEach(channel => {
                        if (data.includes(channel.id)) {
                            rdoChannelIds.push(channel.id);
                        }
                    });
                    //console.log(`gtaChannelIds: ${gtaChannelIds}`);	

                    var gtaChannelIds = [];
                    fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
                        if (err) { console.log(`Error: ${err}`) }
                        else {
                            interaction.guild.channels.cache.forEach(channel => {
                                if (data.includes(channel.id)) {
                                    gtaChannelIds.push(channel.id);
                                }
                            });
                            //console.log(`rdoChannelIds: ${rdoChannelIds}`);

                            gtaDisabled = false;
                            if (gtaChannelIds[0] === undefined) {
                                gtaDisabled = true;
                            }

                            const confirmButtons = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`gtaTest - ${buttonUserID}`)
                                        .setLabel(`${testGTAButtonString()}`)
                                        .setStyle(ButtonStyle.Success)
                                        .setDisabled(gtaDisabled),
                                    new ButtonBuilder()
                                        .setCustomId(`rdoTest - ${buttonUserID}`)
                                        .setLabel(`${testRDOButtonString()}`)
                                        .setStyle(ButtonStyle.Danger),
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
                                await rdoTest();
                                await interaction.editReply({ components: [confirmButtons], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));
                            }
                            else if (interaction.user.id !== buttonUserID) {
                                await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
                                await interaction.editReply({ components: [confirmButtons], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));
                            }
                            else if (rdoChannelIds.length <= 0) {
                                await interaction.followUp({ content: `${noSubscriptions()}`, ephemeral: true });
                                await interaction.editReply({ components: [confirmButtonsMissingPermission], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));
                            }
                            else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                                await interaction.followUp({ content: `${missingPermissions()}`, ephemeral: true });
                                await interaction.editReply({ components: [confirmButtonsMissingPermission], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));
                            }
                            else {
                                await interaction.followUp({ content: `There was an error executing this button.`, ephemeral: true });
                                await interaction.editReply({ components: [confirmButtonsMissingPermission], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));
                            } //end checking for permissions				

                        }
                    }); //end fs.readFile for GTADataBase.txt
                }
            }); //end fs.readFile for RDODataBase.txt

            function expiredDesc() {
                if (lang === "en") {
                    return `This interaction expired`;
                }
                if (lang === "es") {
                    return `Esta interacción expiró`;
                }
                if (lang === "pt") {
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
                    return `此互動已過期`;
                }
                if (lang === "ja") {
                    return `このインタラクションの有効期限が切れました`;
                }
                if (lang === "ko") {
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
            }, (60000 * 5))

        }
    },

}