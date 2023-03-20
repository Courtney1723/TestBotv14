const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const phantom = require('phantom'); //https://github.com/amir20/phantomjs-node
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
let errorEmbed = new EmbedBuilder()
	.setColor('Red')
	.setTitle(`Uh Oh!`)
	.setDescription(`There was an error while executing this command!\nThe error has been sent to the developer and will be fixed as soon as possible.\nPlease try again in a few minutes.\n\nIf the problem persists you can try [re-inviting the bot](<${process.env.invite_link}>) or \nYou can report it in the [Rockstar Weekly Support Server](<${process.env.support_link}>)`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gta')
		.setDescription('Latest GTA Online Bonuses')
		.setDMPermission(true),
	async execute(interaction) {
		await interaction.deferReply().catch(console.error);

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
				//return `events/SeMgTsre/gta-online-bonuses/1`; //test for finalString >= 6000				
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
							let isPast002 = isPast003[1].split(",\"");

							return isPast002[0];
						}
						//console.log(`isPast: ${isPast()}`);


			fs.readFile('./LANGDataBase.txt', 'utf8', async function(err, data) {
				if (err) { console.log(`Error: ${err}`) }
				else {
					let lang03 = data.split("lang:");
					//console.log(`lang03.length: ${lang03.length}`);

					let langArray = [];
					for (i = 2; i <= lang03.length - 1; i++) { //first will always be undefined
						let lang02 = lang03[i].split(" -");
						//console.log(`lang02 at ${i}: ${lang02}`);

						let lang01 = lang02[0];
						//console.log(`lang01 at ${i}: ${lang01}`);

						langArray.push(lang01);
					}

					//console.log(`langArray: ${langArray}`);

					let guildID03 = data.split("guild:");
					//console.log(`guildID03.length: ${guildID03.length}`);
					let guildIDArray = [];
					for (i = 2; i <= guildID03.length - 1; i++) { //first two will always be undefined
						let guildID02 = guildID03[i].split(" -");
						//console.log(`lang02 at ${i}: ${lang02}`);

						let guildID01 = guildID02[0];
						//console.log(`lang01 at ${i}: ${lang01}`);

						guildIDArray.push(guildID01);
					}

					//console.log(`guildIDArray: ${guildIDArray}`);	

					let lang = "";
					for (i = 0; i <= guildIDArray.length - 1; i++) {
						//console.log(`guildIDArray at ${i}: ${guildIDArray[i]}`);
						//console.log(`langArray at ${i}: ${langArray[i]}`);
						//console.log(`interaction.guildID at ${i}: ${interaction.guild.id}`);

						if ((interaction.channel.type === 0) || (interaction.channel.type === 5)) {
							if (interaction.guild.id === guildIDArray[i]) {
								lang += `${langArray[i]}`;
							}
						}
					}

					//console.log(`lang: ${lang}`);


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

						let gtaDate01 = gtaHeader.split("class=\"date\">"); //gets the event date
						//console.log(`${gtaDate01[1]}`);
						let gtaDate = gtaDate01[1].split("<"); //cuts off the end of the date
						//console.log(`Date: ${gtaDate[0]}\n`);	

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

							//--Spanish--//
							.replace(/<mq:rxt><\/mq:rxt>/g, "")					

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

						let GTABonuses01 = gtaBoldFormatted().split("<p><b>");
						//console.log(`GTABonuses01: ${GTABonuses01}`)
						let gtaFinalString01 = "";	//gtaFinalString before HTML formatting
						let nextGenIndex1 = "";
						let nextGenIndex2 = "";

						//-----BEGIN for loop-----//		

						//console.log(`GTABonuses01 length: ${GTABonuses01.length}`);
						for (i = 0; i <= GTABonuses01.length - 2; i++) { //final element will always be blank
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
							//console.log(`GTA_Title at ${i}: ${GTA_Title}`);		
							//--------------------END capitalization Function-----------------//		

							//-----BEGIN get the index of "Only on PlayStation..." title-----//

							function onlyOnIndex1() { //returns the index of the title: Only on Playstation...
								if (GTA_Bonus != null) {
									if ((GTA_Title.toLowerCase().includes("only on playstation")) || (GTA_Bonus.toLowerCase().includes("only on playstation"))) {
										return i + 1;
									}
								} else {
									return -1;
								}
							}
							//console.log(`onlyOnIndex1() at ${i}: ${onlyOnIndex1()}`);

							function onlyOnIndex2() { //returns the index of the title: Only on Playstation...
								if (GTA_Bonus != null) {
									if ((GTA_Title.toLowerCase().includes("only on playstation")) || (GTA_Bonus.toLowerCase().includes("only on playstation"))) {
										return i + 2;
									}
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


							//-----BEGIN populating gtaFinalString01 -----//
							if ((i.toString() === nextGenIndex1) || (i.toString() === nextGenIndex2)) {
								if (!GTA_Bonus === undefined) {
									let gtaParas = GTA_Bonus.split("<p>");
									//gtaFinalString01 += `**Only on PlayStation 5 and Xbox Series X|S:**\n`;
									if (!GTA_Title.toLowerCase().includes("motorsport showroom")) {
										gtaFinalString01 += `• ${GTA_Title}\n`;
									}
									else {
										gtaFinalString01 += `**${GTA_Title}**\n• ${gtaParas[1]}\n`;
									}
								}
							}
							else if (i === 0) { //if the bonus is an intro paragraph.
								let introParas = GTA_Title.split("<p>")
								//gtaFinalString01 += `• ${introParas[1]}\n`; //usual intro paragraph
								gtaFinalString01 += `• ${introParas[1].charAt(0).toUpperCase()}${introParas[1].substr(1)}\n`; //not sure why the first word is lowercase?
								if (introParas[2] != undefined) {
									gtaFinalString01 += `• ${introParas[2].charAt(0).toUpperCase()}${introParas[2].substr(1)}\n`; //not sure why the first word is lowercase?
								}
							}
							else if (GTA_Bonus != null) { //if the bonus is not an intro paraghraph
								let gtaParas = GTA_Bonus.split("<p>");
								//console.log(`gtaParas at ${i}: ${gtaParas}`);
								//console.log(`gtaParas length at ${i}: ${gtaParas.length}`);	
								if (GTA_Title.toLowerCase().includes("only on playstation")) { //fail safe for if the NextGenIndex does not work properly
									//gtaFinalString01 += `**Only on PlayStation 5 or Xbox Series X|S:**\n`;
								}
								else if (GTA_Bonus.toLowerCase().includes("premium test ride")) { //fail safe for if the NextGenIndex does not work properly
									gtaFinalString01 += `• ${gtaParas[1]}\n`;
								}
								else if (GTA_Title.toLowerCase().includes("hsw time trial")) { //fail safe for if the NextGenIndex does not work properly
									gtaFinalString01 += `• ${GTA_Title}\n`;
								}
								else if (GTA_Bonus.toLowerCase().includes("luxury autos")) {
									gtaFinalString01 += `**${GTA_Title}**\n• ${gtaParas[1]}\n`;
								}
								else if (GTA_Title.toLowerCase().includes("new community series")) {
									gtaFinalString01 += `**${GTA_Title}**\n• ${gtaParas[1]}\n`;
								}
								else if (GTA_Title.toLowerCase().includes("series updates")) {
									gtaFinalString01 += `**${GTA_Title}**\n• ${gtaParas[1]}\n• ${gtaParas[2]}\n`;
								}
								else if (GTA_Title.toLowerCase().includes("motorsport showroom")) {
									gtaFinalString01 += `**${GTA_Title}**\n• ${gtaParas[1]}\n`;
								}
								else if (GTA_Title.toLowerCase().includes("simeon's showroom")) {
									gtaFinalString01 += `**${GTA_Title}**\n• ${gtaParas[1]}\n`;
								}
								else if (GTA_Title.toLowerCase().includes("2.5x")) {
									gtaFinalString01 += `**${GTA_Title}** \n`;
								}
								else if (GTA_Title.toLowerCase().includes("3x")) {
									gtaFinalString01 += `**${GTA_Title}** \n`;
								}
								else if (GTA_Title.toLowerCase().includes("gta+")) {
									gtaFinalString01 += `**${GTA_Title}**\n• ${gtaParas[1]}\n${gtaParas[2]})\n`;
								}
								else if ((GTA_Title.toLowerCase().includes("discount")) || (GTA_Title.toLowerCase().includes("descuento")) || (GTA_Title.includes("Скидки")) || (GTA_Title.toLowerCase().includes("rabatte")) || (GTA_Title.toLowerCase().includes("desconto"))) {
									gtaFinalString01 += `**${GTA_Title}**\n• ${GTA_Bonus}:\n`;
								}
								else if (GTA_Bonus.includes("• ")) { //if the bonus includes lists
									if (gtaParas[0] != null) {
										if ((gtaParas[1] != null) && (gtaParas[1] != `undefined`)) {
											let gtaListBonus = gtaParas[1].split("\n\n•");
											if (gtaParas[2] != null) { //if the bonus has a paragraph after the list
												gtaFinalString01 += `**${GTA_Title}**\n${gtaParas[1]}\n• ${gtaParas[2]}\n`;
											}
											else { //if the bonus does not have a paragraph after the list
												gtaFinalString01 += `**${GTA_Title}**\n• ${gtaListBonus[2]}\n`;
											}
										}
									}
									else {
										gtaFinalString01 += `**${GTA_Title}**\n\n`;
									}
								}
								else if (i === GTABonuses01.length - 2) { //if the bonus is the last bonus
									gtaFinalString01 += `**${GTA_Title}**\n• ${gtaParas[1]}\n• ${gtaParas[2]}\n• ${gtaParas[3]}`;
								}
								else if (gtaParas.length > 2) { // if the bonus has two or more paragraphs include only 1st and 2nd
									gtaFinalString01 += `**${GTA_Title}**\n• ${gtaParas[1]}\n`;
								}
								else { //if the bonus only has 1 paragraph only post the title
									gtaFinalString01 += `\n**${GTA_Title}**\n\n`;
								}
							}
							else { //if the bonus only has 1 paragraph only post the title
								gtaFinalString01 += `\n**${GTA_Title}**\n\n`;
							}

						}

						//-----------END for loop----------//			
						//console.log(`gtaFinalString01: ${gtaFinalString01}`); //gtaFinalString before HTML formatting
						let gtaFinalString = gtaFinalString01.replace(/<p>/g, "")
							.replace(/<\/p>/g, "")
							.replace(/<\/b>/g, "")
							.replace(/<b>/g, "")
							.replace(/\n\n• /g, "\n• ") //removes spaces before a list item
							.replace(/.\n\*\*/g, "\n\n**")
							.replace(/\n\n\n/g, "\n\n")
							.replace(/\n\n\n/g, "\n\n")
							.replace(/• undefined/g, "• ")
							.replace(/\n• undefine/g, "")
							.replace(/• \n\n/g, "")

						//console.log(`gtaFinalString01.length: ${gtaFinalString01.length}`);
						//console.log(`gtaFinalString.length: ${gtaFinalString.length}`);
						function bestBreak() {
							var gtaSpaces = gtaFinalString.split(`\n\n`); //counts the newlines
							var charCount = 0;//( (gtaTitleString().length) + (gtaDate[0].length) + (gtaFooterMin().length) + (ellipsisFunction().length) ); 
							//console.log(`( T${(gtaTitleString().length)} + D${(gtaDate[0].length)} + F${(gtaFooterMin().length)} + E${(ellipsisFunction().length)} )`);
							
							var finalZ = 0;
							var countZ = 0;
							for (z = 0; charCount <= 3950; z++) {
								if (gtaFinalString.length <= 4100) {
									charCount = 3950;
									finalZ = gtaFinalString.length;
								}
								if (gtaSpaces[z] !== undefined) {
									//console.log(`gtaSpaces at ${z}: ${gtaSpaces[z]}`);
										charCount += gtaSpaces[z].length;
										//console.log(`charCount at ${z}: ${charCount}`);
									var finalZ = gtaSpaces[z].length;
									countZ++;		
								}
							}
								//console.log(`finalZ: ${finalZ}`);
							  //console.log(`charCount: ${charCount}`);
								return (charCount - finalZ) + (countZ * 2) - 3;
							// ( (gtaTitleString().length) + (gtaDate[0].length) + (gtaFooterMin().length) + (ellipsisFunction().length) )
						}
						//console.log(`bestBreak: ${bestBreak()}`);

						var constChars = (gtaFooterMax().length) + (gtaImage[0].length) + (gtaTitleString().length);
						var gtaNewlines = gtaFinalString.substr(bestBreak(), (6000 - bestBreak() - constChars)).split("\n");
						var tempString = gtaNewlines[gtaNewlines.length - 1];
						function bestEndBreak() {
							return (6000 - bestBreak() - constChars - tempString.length);
						}
						//console.log(`bestEndBreak:${bestEndBreak()}`);

						//console.log(`gtaFinalString: ${gtaFinalString}`);
						function gtaPost() {
							return gtaFinalString.slice(0, (bestBreak())); //FIXME: adjust this for the best break - up to 4000
						}
						//console.log(`gtaFinalString length: ${gtaFinalString.length}\n`) 
						function gtaPost2() {
							if (gtaFinalString.length > 4000) {
								let post02 = gtaFinalString.substr((bestBreak()), (bestEndBreak())); //FIXME: adjust this for the best break - up to 4000 (a, b) a+b !> 5890
								return post02;
							} else {
								return "";
							}
						}
						function ellipsisFunction() {
							if (gtaFinalString.length > 4000) {
								return "...";
							} else {
								return "";
							}
						}
						function ellipsisFunction2() {
							if (gtaFinalString.length >= (6000 - constChars)) {
								return "...";
							} else {
								return "";
							}
						}						
						function gtaFooterMax() {
							if (gtaFinalString.length > 4000) {
								if (lang === "en") {
									return `\n** [Click here](${url}) for more details**`;
								}
								else if (lang === "es") {
									return `\n** [Haga clic aquí](${url}) para más detalles**`;
								}
								else if (lang === "ru") {
									return `\n** [Hажмите здесь](${url}) для получения более подробной информации**`;
								}
								else if (lang === "de") {
									return `\n** [Klicken Sie hier](${url}) für weitere Details**`;
								}
								else if (lang === "pt") {
									return `\n** [Clique aqui](${url}) para mais detalhes**`;
								}
								else {
									return `\n** [Click here](${url}) for more details**`;
								}
							} else {
								return "";
							}
						}
						function gtaFooterMin() {
							if (gtaFinalString.length <= 4000) {
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
									return `** [Click here](${url}) clique aqui para mais detalhes**`;
								}
							} else {
								return "";
							}
						}

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
						//console.log(`gtaTitleString: ${gtaTitleString()}`);

						let gtaEmbed = new EmbedBuilder()
							.setColor('0x00CD06') //Green
							.setTitle(`${gtaTitleString()}`)
							.setDescription(`${gtaDate[0]}\n\n${gtaPost()} \n${gtaFooterMin()} ${ellipsisFunction()}`)
						let gtaEmbed2 = new EmbedBuilder()
							.setColor('0x00CD06') //Green
							.setDescription(`${ellipsisFunction()} \n${gtaPost2()} ${ellipsisFunction2()}${gtaFooterMax()}`)
						let gtaImageEmbed = new EmbedBuilder()
							.setColor('0x00CD06') //Green
							.setImage(`${gtaImage[0]}`);

						// console.log(`gtaEmbed length: ${gtaEmbed.length}`); //no more than 4096 (line 199)
						// console.log(`gtaEmbed2 length: ${gtaEmbed2.length}`); //no more than 6000 - gtaEmbed.length (line 204)

						if (gtaFinalString.length <= 4000) {
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

						var estHour = estHourMinute[0];
						var estMinute = estHourMinute[1];

						var amPM01 = estHourMinute[2].split(" ");
						var amPM = amPM01[1];

						//console.log(`${estHour}:${estMinute} ${amPM}`);

						let gtaExpiredEmbed = new EmbedBuilder()
							.setColor('0x00CD06') //Green
							.setDescription(`These bonuses & discounts may be expired. \nRockstar typically releases the latest weekly bonuses & discounts every \nThursday after 1:00 PM EST.`)
							.setFooter({ text: `It is ${estHour}:${estMinute} ${amPM} EST now.`, iconURL: process.env.logo_link })

						//console.log(`isPast: ${isPast()}`);
						if (isPast() === "true") {
							await interaction.followUp({ embeds: [gtaExpiredEmbed], ephemeral: true }).catch(err => console.log(`gtaExpiredEmbed Error: ${err.stack}`));							
						}

						//interaction.editReply(`Console logged! 👍`);


					}
					else {
						let RStarDownEmbed = new EmbedBuilder()
							.setColor('0xFF0000') //RED
							.setDescription(`The Rockstar Social Club website is down. \nPlease try again later. \nSorry for the inconvenience.`)
						interaction.editReply({ embeds: [RStarDownEmbed], ephemeral: true });
						console.log(`The Rockstar Social Club website is down.`);
					}
				}
			}); //end fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {}
		}
		else {
			let RStarDownEmbed = new EmbedBuilder()
				.setColor('0xFF0000') //RED
				.setDescription(`The Rockstar Social Club website is down. \nPlease try again later. \nSorry for the inconvenience.`)
			interaction.editReply({ embeds: [RStarDownEmbed], ephemeral: true });
			console.log(`The Rockstar Social Club website is down.`);
		}




	},
};

