const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const phantom = require('phantom'); //https://github.com/amir20/phantomjs-nodz
const LANG = require('../../events/LANG.js');
		let errorText = `There was an error while executing this command!\nThe error has been sent to the developer and it will be fixed as soon as possible. \nIf the error persists you can try re-inviting the Rockstar Weekly bot by [clicking here](<${process.env.invite_link}>). \nReport the error by joining the Rockstar Weekly bot support server: [click here](<${process.env.support_link}>).`;

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isButton()) {return};
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
			if (lang === "en") {
				return `Thinking...`;
			}
			else if (lang === "es") {
				return `Pensando...`;
			}
			else if (lang === "ru") {
				return `мышление...`;
			}
			else if (lang === "de") {
				return `Ich denke...`;
			}
			else if (lang === "pt") {
				return `Pensamento...`;
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
			else if (lang === "ru") {
				return `Тест GTA`;
			}
			else if (lang === "de") {
				return `GTA testen`;
			}
			else if (lang === "pt") {
				return `Testar GTA`;
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
			else if (lang === "ru") {
				return `Тест RDO`;
			}
			else if (lang === "de") {
				return `RDO testen`;
			}
			else if (lang === "pt") {
				return `Testar RDO`;
			}
			else {
				return `Test RDO`;
			}			
		}	

		function backButtonString() {
			if (lang === "en") {
				return `Go Back`;
			}
			else if (lang === "es") {
				return `Volver`;
			}
			else if (lang === "ru") {
				return `Вернуться`;
			}
			else if (lang === "de") {
				return `Zurück`;
			}
			else if (lang === "pt") {
				return `Voltar`;
			}
			else {
				return `Go Back`;
			}			
		}					

// const thinkingEmbed = new EmbedBuilder()
// 	.setColor(0x00CD06) //Green
// 	.setDescription(`${thinkingDesc()}`);		

	fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
		if (err) {console.log(`Error: ${err}`)} 
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
								.setLabel(`${backButtonString()}`)
								.setStyle(ButtonStyle.Secondary),
				);						
					
interaction.editReply({ components: [thinkingButtons], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));			

				}}); //end fs.readFile for RDODataBase.txt


//END THINKING BUTTONS					

			fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
			  if (err) {console.log(`Error: ${err}`)} 
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
		
		//let urlLink = urlLink01[1];
			//console.log(`urlLink: ${urlLink01[1]}`);

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

			let langBase = `/?lang=`;
			let langURL = `${langBase}${lang}`;
			
			let url = `${baseURL}/${urlLink()}${langURL}`;
			//console.log(`url: ${url}`);		

		const gtaStatus = await page.open(url);
		if (gtaStatus === `success`) {
		const content = await page.property('content'); // Gets the latest gta updates
			//console.log(content); 
		let gtaString001 = content.toString(); //converts HTML to string (necessary? not sure.);
			//console.log(`gtaString001: ${gtaString001}`);	
		let gtaString01 = gtaString001.split("cm-content\">"); //splits the header from the body
		let gtaHeader = gtaString01[0];
			//console.log(`gtaHeader: ${gtaHeader}`);
		
		let gtaImage01 = gtaHeader.split("og:image\" content=\"");
			//console.log(`gtaImage01: ${gtaImage01[1]}`);
		let gtaImage = gtaImage01[1].split("\" data-rh=");
			//console.log(`gtaImage: ${gtaImage[0]}`);
		
		let gtaDate02 = gtaHeader.split("class=\"date\">"); //gets the event date
		//console.log(`${gtaDate01[1]}`);
		let gtaDate01 = gtaDate02[1].split("<"); //cuts off the end of the date
		let gtaDate = gtaDate01[0].replace(/&nbsp;/g, " ");
		//console.log(`Date: ${gtaDate}\n`);	
		
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
							.replace(/<span style=\"font-weight: 700;\">/g, "") //FIXME- remove next week										

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
									(GTA_Title  === "cкидки ") || 
									(GTA_Title  === "Скидки ") || 
									(GTA_Title.toLowerCase() === "rabatte ") || 
									(GTA_Title.toLowerCase() === "descontos ")
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
								else if ( 
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
						

						function gtaTitleString() {
							if (lang === "en") {
								return "GTA Online Bonuses:";
							}
							else if (lang === "es") {
								return "Bonificaciones de GTA Online:";
							}
							else if (lang === "ru") {
								return "Бонусы GTA Online:";
							}
							else if (lang === "de") {
								return "Boni in GTA Online:";
							}
							else if (lang === "pt") {
								return "Bônus no GTA Online:";
							}
							else {
								return "GTA Online Bonuses:";
							}
						}

						var constChars = (gtaDate.length + 2) + (gtaTitleString().length);
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
									return `** [Click here](${url}) for more details**`;
								}
								else if (lang === "es") {
									return `** [Haga clic aquí](${url}) para más detalles**`;
								}
								else if (lang === "ru") {
									return `** [нажмите здесь](${url}) для получения более подробной информации**`;
								}
								else if (lang === "de") {
									return `** [Klicken Sie hier](${url}) für weitere Details**`;
								}
								else if (lang === "pt") {
									return `** [Clique aqui](${url}) para mais detalhes**`;
								}
								else {
									return `** [Click here](${url}) for more details**`;
								}
							} else {
								return "";
							}
						}	
						function gtaFooterMax() {
							if (gtaFinalString.length >= (4000 - constChars)) {
								if (lang === "en") {
									return `** [Click here](${url}) for more details**`;
								}
								else if (lang === "es") {
									return `** [Haga clic aquí](${url}) para más detalles**`;
								}
								else if (lang === "ru") {
									return `** [Hажмите здесь](${url}) для получения более подробной информации**`;
								}
								else if (lang === "de") {
									return `** [Klicken Sie hier](${url}) für weitere Details**`;
								}
								else if (lang === "pt") {
									return `** [Clique aqui](${url}) para mais detalhes**`;
								}
								else {
									return `** [Click here](${url}) for more details**`;
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
							.setTitle(`${gtaTitleString()}`)
							.setDescription(`${gtaDate}\n${gtaPost()}${gtaFooterMin()}${ellipsisFunction()}`)
						let gtaEmbed2 = new EmbedBuilder()
							.setColor(0x00CD06) //Green
							.setDescription(`${ellipsisFunction()} \n${gtaPost2()} ${ellipsisFunction2()}${gtaFooterMax()}`)
						let gtaImageEmbed = new EmbedBuilder()
							.setColor(0x00CD06) //Green
							.setImage(`${gtaImage[0]}`);

		 // console.log(`gtaEmbed length: ${gtaEmbed.length}`); //no more than 4096 (line 199)
		 // console.log(`gtaEmbed2 length: ${gtaEmbed2.length}`); //no more than 6000 - gtaEmbed.length (line 204)



//-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//
//-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//		
//-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//

		
		var channelIDArray = channelIDs.split('  - ');
			//console.log(`channelIDArray length: ${channelIDArray.length}`);
			//console.log(`channelIDArray: ${channelIDArray}`);
		for (c = 0; c <= channelIDArray.length - 2; c++) { //last element will always be blank
				//console.log(`channelIDArray at ${c}: ${channelIDArray[c]}`);
			if (channelIDArray[c].startsWith("undefined")) {return}		

function permission() {
	if ( !(interaction.guild.members.me).permissionsIn(channelIDArray[c]).has(PermissionsBitField.Flags.ViewChannel) ) { // missing all permissions - can't send messages or embed links without view permission
		 if (lang === "en") {
			 return `View Channel, Send Messages, and Embed Links`;
		 }
		 if (lang === "es") {
			 return `Ver canal y Enviar mensajes y Insertar enlaces`;
		 }
		 if (lang === "ru") {
			 return `Посмотреть каналa и Отправить сообщения и Вставить ссылки`
		 }	
		 if (lang === "de") {
			 return `Kanal anzeigen-Berechtigung und Nachrichten senden-Berechtigung und Links einbetten-Berechtigung`;
		 }	
		 if (lang === "pt") {
			 return `Ver canal e Enviar mensagens e Inserir links`;
		 }		 
		 else {
			 return `View Channel, Send Messages, and Embed Links`;
		 }
	}	
	else if (!((interaction.guild.members.me).permissionsIn(channelIDArray[c]).has(PermissionsBitField.Flags.EmbedLinks))) {
		 if (lang === "en") {
			 return `Embed Links`;
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
		 if (lang === "pt") {
			 return `Inserir links`;
		 }		 
		 else {
			 return `Embed Links`;
		 }
	}			
	else if ( !(interaction.guild.members.me).permissionsIn(channelIDArray[c]).has(PermissionsBitField.Flags.SendMessages) ) { //missing send messages also prevents embedding links
		 if (lang === "en") {
			 return `Send Messages and Embed Links`;
		 }
		 if (lang === "es") {
			 return `Enviar mensajes y Insertar enlaces`;
		 }
		 if (lang === "ru") {
			 return `Отправить сообщения и Вставить ссылки`
		 }	
		 if (lang === "de") {
			 return `Nachrichten senden-Berechtigung und Links einbetten-Berechtigung`;
		 }	
		 if (lang === "pt") {
			 return `Enviar mensagens e Inserir links`;
		 }		 
		 else {
			 return `Send Messages and Embed Links`;
		 }
	 }	
						
}	//end permission() function	

		function sentPostDesc() {
			if (permission() === undefined) {
				if (lang === "en") {
					return `• Posts have been sent to <#${channelIDArray[c]}>!\n`;
				}
				else if (lang === "es") {
					return `• El mensaje ha sido enviado a <#${channelIDArray[c]}>.\n`;
				}
				else if (lang === "ru") {
					return `• Cообщение было отправлено на <#${channelIDArray[c]}>.\n`;
				}
				else if (lang === "de") {
					return `• Eine Nachricht wurde an <#${channelIDArray[c]}> gesendet.\n`;
				}
				else if (lang === "pt") {
					return `• Uma mensagem foi enviada para <#${channelIDArray[c]}>.\n`;
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
				else if (lang === "ru") {
					return `• У бота нет разрешения на ${permission()} в <#${channelIDArray[c]}>.\n`;
				}				
				else if (lang === "de") {
					return `• Dem Bot fehlt die ${permission()} in <#${channelIDArray[c]}>.\n`;
				}		
				else if (lang === "pt") {
					return `• O bot está sem a permissão ${permission()} em <#${channelIDArray[c]}>.\n`;
				}				
				else {
					return `• The bot is missing the ${permission()} permission in <#${channelIDArray[c]}>.\n`;
				}
			}
		}		
		//console.log(`sentPostDesc() at c${c}: ${sentPostDesc()}`);
		sentPostDescString += `${sentPostDesc()}`;

			if ( (interaction.guild.members.me).permissionsIn(channelIDArray[c]).has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.EmbedLinks]) ) {	//If the bot has all permissions
	 			if (gtaFinalString.length < (4000 - constChars)) {
				interaction.guild.channels.fetch(channelIDArray[c]).then(channel => channel.send(({embeds: [gtaImageEmbed, gtaEmbed]}))).catch(err => console.log(`GTA Test Min Error: ${err.stack}`));
				} else {
					interaction.guild.channels.fetch(channelIDArray[c]).then(channel => channel.send({embeds: [gtaImageEmbed, gtaEmbed, gtaEmbed2]})).catch(err => console.log(`GTA Test Max Error: ${err.stack}`));
				}	
			}						
				
			
		} //end c loop

	} 
	else {
			let RStarDownEmbed = new EmbedBuilder()
				.setColor(0xFF0000) //RED
				.setDescription(`The Rockstar Social Club website is down. \nPlease try again later.`)
			client.channels.fetch(process.env.logChannel2).then(channel => channel.send({embeds: [RStarDownEmbed], ephemeral: true}));
			console.log(`The Rockstar Social Club website is down.`);	
	}	
	} //end if (status === `success`)
	else {
			let RStarDownEmbed = new EmbedBuilder()
				.setColor(0xFF0000) //RED
				.setDescription(`The Rockstar Social Club website is down. \nPlease try again later.`)
			interaction.followUp({embeds: [RStarDownEmbed], ephemeral: true});
			console.log(`The Rockstar Social Club website is down.`);	
	}		



//Begin ephemeral testEmbed
			var gtaChannelIds = [];
			let successCount = 0;
			interaction.guild.channels.cache.forEach(channel => {
				if (data.includes(channel.id)) {
					gtaChannelIds.push(channel.id);
					if ( (interaction.guild.members.me).permissionsIn(channel.id).has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.EmbedLinks]) ) {
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
					if ( (interaction.guild.members.me).permissionsIn(channel.id).has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.EmbedLinks]) ) {
						rdoSuccessCount++;
					}
				}
			});
			//console.log(`rdoChannelIds: ${rdoChannelIds}`);						
		
			function success() {
				if (successCount === gtaChannelIds.length) {
					if (lang === "en") {
							return `Success`;
					}
					else if (lang === "es") {
						return `Éxito`;
					}
					else if (lang === "ru") {
						return `Успех`;
					}
					else if (lang === "de") {
						return `Erfolg`;
					}
					else if (lang === "pt") {
						return `Êxito`;
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
					else if (lang === "pt") {
						return `Permissões Ausentes`;
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
				if (lang === "en") {
					return `These buttons are not for you.`;
				}
				else if (lang === "es") {
					return `Estos botones no son para ti.`;
				}
				else if (lang === "ru") {
					return `Эти кнопки не для вас.`;
				}
				else if (lang === "de") {
					return `Diese Schaltflächen sind nicht für Sie.`;
				}
				else if (lang === "pt") {
					return `Esses botões não são para você.`;
				}
				else {
					return `These buttons are not for you.`;
				}				
			}			

			function missingPermissions()	{
				if (lang === "en") {
					return `You do not have the required permissions to do that.`;
				}
				else if (lang === "es") {
				  return `No tienes permiso para hacer eso.`;
				}
				else if (lang === "ru") {
				  return `У вас нет разрешения на это.`;
				}
				else if (lang === "de") {
				  return `Sie haben keine Erlaubnis dazu.`;
				}
				else if (lang === "pt") {
				  return `Você não tem permissão para fazer isso.`;
				}
				else {
				  return `You do not have the required permissions to do that.`;
				}				
			}	

			function noSubscriptions() {
				if (lang === "en") {
					return `You do not have any channels subscribed to GTA Online auto posts.`;
				}
			 	else if (lang === "es") {
					return `No tienes ningún canal suscrito a las publicaciones automáticas de GTA Online.`;
				}
				else if (lang === "ru") {
					return `У вас нет каналов, подписанных на автопосты GTA Online.`;
				}
				else if (lang === "de") {
					return `Du hast keine Kanäle, die automatische Beiträge von GTA Online abonniert haben.`;
				}
				else if (lang === "pt") {
					return `Você não tem nenhum canal inscrito nas postagens automáticas do GTA Online.`;
				}
				else {
					return `You do not have any channels subscribed to GTA Online auto posts.`;
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
			if (err) {console.log(`Error: ${err}`)} 
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
			        .setLabel(`${backButtonString()}`)
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
			        .setLabel(`${backButtonString()}`)
			        .setStyle(ButtonStyle.Secondary),
			);					
					
		if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) {
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
			await interaction.followUp({content: `${missingPermissions()}`, ephemeral: true})
			await interaction.editReply({ components: [confirmButtonsMissingPermission], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));			
		}
		else {
			await interaction.followUp({ content: `There was an error executing this button.`, ephemeral: true });
			await interaction.editReply({ components: [confirmButtonsMissingPermission], ephemeral: true }).catch(err => console.log(`thinkingButtons Error: ${err.stack}`));			
		} //end checking for permissions	

		}});//end fs.readFile for RDODataBase
		}}); //end fs.readFile for GTADataBase.txt

			function expiredDesc() {
				if (lang === "en") {
					return `This interaction expired`;
				}
				if (lang === "es") {
					return `Esta interacción expiró.`;
				}
				if (lang === "ru") {
					return `Срок действия этого взаимодействия истек.`;
				}
				if (lang === "de") {
					return `Diese Interaktion ist abgelaufen`;
				}
				if (lang === "pt") {
					return `Esta interação expirou.`;
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
			interaction.editReply({components: [expiredButton]});
		}, (60000 * 5))	
					
	}
},

}