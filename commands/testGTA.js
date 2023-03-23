const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const phantom = require('phantom'); //https://github.com/amir20/phantomjs-node
		let errorText = `There was an error while executing this command!\nThe error has been sent to the developer and it will be fixed as soon as possible. \nIf the error persists you can try re-inviting the Rockstar Weekly bot by [clicking here](<${process.env.invite_link}>). \nReport the error by joining the Rockstar Weekly bot support server: [click here](<${process.env.support_link}>).`;

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isButton()) {return};
		if (interaction.customId.startsWith(`gtaTest -`)) {

			fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
			  if (err) {console.log(`Error: ${err}`)} 
				else {
					let lang03 = data.split("lang:");
					//console.log(`lang03.length: ${lang03.length}`);

					let langArray = [];
					for (i=2; i <= lang03.length - 1; i++) { //first will always be undefined
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
					for (i=2; i <= guildID03.length - 1; i++) { //first two will always be undefined
						let guildID02 = guildID03[i].split(" -");
						//console.log(`lang02 at ${i}: ${lang02}`);
						
						let guildID01 = guildID02[0];
						//console.log(`lang01 at ${i}: ${lang01}`);

						guildIDArray.push(guildID01);
					}

					//console.log(`guildIDArray: ${guildIDArray}`);	

					let lang = "";
					for (i=0; i <= guildIDArray.length - 1; i++) {
						//console.log(`guildIDArray at ${i}: ${guildIDArray[i]}`);
						//console.log(`langArray at ${i}: ${langArray[i]}`);
						//console.log(`interaction.guildID at ${i}: ${interaction.guild.id}`);

						if (interaction.guild.id === guildIDArray[i]) {
							lang += `${langArray[i]}`;
						}
					}

					//console.log(`lang: ${lang}`);

			
function gtaTest() {

	
//-------------------Begin GTA TEST POST---------------------//	
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
			if ( gtaTitles001[i].charAt(1) != gtaTitles001[i].charAt(1).toUpperCase() ) {
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
			if ( gtaTitles001[i].charAt(1) != gtaTitles001[i].charAt(1).toUpperCase() ) {
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
					if ( (Titles2[j] != null) && (Titles2[j] != "") ) { //ignores blank space elements
						//console.log(`Titles2 at J: ${j}: ${Titles2[j]}\n`); //checks for blank elements
						//console.log(`${Titles2[j].charAt(0)}${Titles2[j].toLowerCase().slice(1)}`); //capital first letters check 
	//returns first letter capitalized + rest of the word lowercase if the word is the first word in the title - unless GTA
					if ( (Titles2[j] === Titles2[0]) && (!Titles2[j].includes("GTA")) && (Titles2[j] != "XP") && (Titles2[j] != "RP") && (Titles2[j] != "GT") && (Titles2[j] != "LD") && (Titles2[j] != "LSPD") && (Titles2[j] != "HSW") ) { 
						gtaTitleString += `${Titles2[j].charAt(0)}${Titles2[j].toLowerCase().slice(1)} `; 
					}
	//returns all caps if title is GTA, GTA$, or XP							
					else if ( (Titles2[j].includes("GTA")) || (Titles2[j] === "XP") || (Titles2[j] === "RP") || (Titles2[j] === "GT")  || (Titles2[j] === "LD") || (Titles2[j] === "LSPD") || (Titles2[j] === "HSW") ||  (Titles2[j] === "LS") || (Titles2[j] === "X|S") ) { 
							gtaTitleString += `${Titles2[j]} `;
					}
	//returns all lowercase if not a title word					
					else if ( (Titles2[j] === "ON")  || (Titles2[j] === "OF") || (Titles2[j] === "THE") || (Titles2[j] === "AN") || (Titles2[j] === "AND") || (Titles2[j] === "FOR") || (Titles2[j] === "A") || (Titles2[j] === "AT") || (Titles2[j] === "IN") ) { 
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
				if ( (GTA_Title.toLowerCase().includes("only on playstation")) || (GTA_Bonus.toLowerCase().includes("only on playstation")) ) {
					return i + 1;
				} } else {
					return -1;
					}
			}
				//console.log(`onlyOnIndex1() at ${i}: ${onlyOnIndex1()}`);
	
			function onlyOnIndex2() { //returns the index of the title: Only on Playstation...
				if (GTA_Bonus != null) {
				if ( (GTA_Title.toLowerCase().includes("only on playstation")) || (GTA_Bonus.toLowerCase().includes("only on playstation")) ) {
					return i + 2;
				} } else {
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
							gtaFinalString01 += `**${GTA_Title}**\n• ${gtaParas[1]}\n${gtaParas[2]}\n`;
						}
						else if ((GTA_Title.toLowerCase().includes("discount")) || (GTA_Title.toLowerCase().includes("descuento")) || (GTA_Title.toLowerCase().includes("cкидки")) || (GTA_Title.toLowerCase().includes("rabatte")) || (GTA_Title.toLowerCase().includes("desconto"))) {
							gtaFinalString01 += `**${GTA_Title}**\n• ${GTA_Bonus}\n`;
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
						else if (GTA_Bonus.toLowerCase().includes("luxury autos")) {
							gtaFinalString01 += `**${GTA_Title}**\n• ${gtaParas[1]}\n`;
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
						function bestBreak() {
							var gtaSpaces = gtaFinalString.split(`\n\n`); //counts the newlines
							var charCount = 0;//( (gtaTitleString().length) + (gtaDate[0].length) + (gtaFooterMin().length) + (ellipsisFunction().length) ); 
							//console.log(`( T${(gtaTitleString().length)} + D${(gtaDate[0].length)} + F${(gtaFooterMin().length)} + E${(ellipsisFunction().length)} )`);
							
							var finalZ = 0;
							var countZ = 0;
							for (z = 0; charCount <= 3790; z++) {
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
        return gtaFinalString.slice(0, bestBreak()); //FIXME: adjust this for the best break - up to 4000
    }
    //console.log(`1: ${gtaFinalString.length}\n`) 
    function gtaPost2() {
      if (gtaFinalString.length > 4000) {
        let post02 = gtaFinalString.substr(bestBreak(), bestEndBreak()); //FIXME: adjust this for the best break - up to 4000 (a, b) a+b !> 5890
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
							return `\n** [click here](${url}) for more details**`;
						}
						else if (lang === "es" ) {
							return `\n** [haga clic aquí](${url}) para más detalles**`;
						}
						else if (lang === "ru" ) {
							return `\n** [нажмите здесь](${url}) для получения более подробной информации**`;
						}				
						else if (lang === "de" ) {
							return `\n** [Klicken Sie hier](${url}) für weitere Details**`;
						}		
						else if (lang === "pt" ) {
							return `\n** [clique aqui](${url}) para mais detalhes**`;
						}								
						else {
							return `\n** [click here](${url}) for more details**`;
						}			
					} else {
						return "";
					}
				}
				function gtaFooterMin() {
					if (gtaFinalString.length <= 4000) {
						if (lang === "en") {
							return `** [click here](${url}) for more details**`;
						}
						else if (lang === "es" ) {
							return `** [haga clic aquí](${url}) para más detalles**`;
						}
						else if (lang === "ru" ) {
							return `** [нажмите здесь](${url}) для получения более подробной информации**`;
						}				
						else if (lang === "de" ) {
							return `** [Klicken Sie hier](${url}) für weitere Details**`;
						}		
						else if (lang === "pt" ) {
							return `** [clique aqui](${url}) para mais detalhes**`;
						}									
						else {
							return `** [click here](${url}) for more details**`;
						}			
					} else {
						return "";
					}
				}

				function gtaTitleString() {
					if (lang === "en") {
						return "GTA Online Bonuses:";
					}
					else if (lang === "es" ) {
						return "Bonificaciones de GTA Online:";				
					}
					else if (lang === "ru" ) {
						return "Бонусы GTA Online:";					
					}				
					else if (lang === "de" ) {
						return "Boni in GTA Online:";	
					}		
					else if (lang === "pt" ) {
						return "Bônus no GTA Online:";	
					}							
					else {
						return "GTA Online Bonuses:";
					}		
				}
				//console.log(`gtaTitleString: ${gtaTitleString()}`);

				let gtaEmbed = new EmbedBuilder()
					.setColor('0x00CD06') //Green
					.setDescription(`**${gtaTitleString()}** \n${gtaDate[0]}\n\n${gtaPost()} \n${gtaFooterMin()} ${ellipsisFunction()}`)			
				let gtaEmbed2 = new EmbedBuilder()
					.setColor('0x00CD06') //Green
					.setDescription(`${ellipsisFunction()} \n${gtaPost2()} ${ellipsisFunction2()}${gtaFooterMax()}`)
				let gtaImageEmbed = new EmbedBuilder()
					.setColor('0x00CD06') //Green
					.setImage(`${gtaImage[0]}`);

		 // console.log(`gtaEmbed length: ${gtaEmbed.length}`); //no more than 4096 (line 199)
		 // console.log(`gtaEmbed2 length: ${gtaEmbed2.length}`); //no more than 6000 - gtaEmbed.length (line 204)



//-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//
//-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//		
//-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//

		
		let channelIDArray = channelIDs.split('  - ');
			//console.log(`channelIDArray length: ${channelIDArray.length}`);
			//console.log(`channelIDArray: ${channelIDArray}`);
		for (c = 0; c <= channelIDArray.length - 2; c++) { //last element will always be blank
				//console.log(`channelIDArray at ${c}: ${channelIDArray[c]}`);
			if (channelIDArray[c].startsWith("undefined")) {return}
			else if (!channelIDArray[c].startsWith("undefined")) {			

			function success() {
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

		function sentPostDesc() {
			if (lang === "en") {
				return `• Posts have been sent to <#${channelIDArray[c]}>!`;
			}
			else if (lang === "es") {
				return `• El mensaje ha sido enviado a <#${channelIDArray[c]}>.`;
			}
			else if (lang === "ru") {
				return `• Cообщение было отправлено на <#${channelIDArray[c]}>.`;
			}
			else if (lang === "de") {
				return `• Eine Nachricht wurde an <#${channelIDArray[c]}> gesendet.`;
			}
			else if (lang === "pt") {
				return `• Uma mensagem foi enviada para <#${channelIDArray[c]}>.`;
			}
			else {
				return `• Posts have been sent to <#${channelIDArray[c]}>!`;
			}			
		}		

		function missingPermissionsDesc() {
			if (lang === "en") {
				return `The bot is missing the ${permission()} permission in <#${channelIDArray[c]}>.`;
			}
			else if (lang === "es") {
				return `Al bot le falta el permiso ${permission()} en <#${channelIDArray[c]}>.`;
			}
			else if (lang === "ru") {
				return `У бота нет разрешения на ${permission()} в <#${channelIDArray[c]}>.`;
			}				
			else if (lang === "de") {
				return `Dem Bot fehlt die ${permission()} in <#${channelIDArray[c]}>.`;
			}		
			else if (lang === "pt") {
				return `O bot está sem a permissão ${permission()} em <#${channelIDArray[c]}>.`;
			}				
			else {
				return `The bot is missing the ${permission()} permission in <#${channelIDArray[c]}>.`;
			}
		}

		const testEmbed = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`${success()}`)
			.setDescription(`${sentPostDesc()}`)

					function permission() {
										if ( !( (interaction.guild.members.me).permissionsIn(channelIDArray[c]).has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.EmbedLinks])) )
 { // missing all permissions
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
										else if ( !( (interaction.guild.members.me).permissionsIn(channelIDArray[c]).has([PermissionsBitField.Flags.SendMessages,  PermissionsBitField.Flags.EmbedLinks])) )
 { 
	 if (lang === "en") {
		 return `View Channel and Send Messages`;
	 }
	 if (lang === "es") {
		 return `Ver canal y Enviar mensajes`;
	 }
	 if (lang === "ru") {
		 return `Посмотреть каналa и Отправить сообщения`
	 }	
	 if (lang === "de") {
		 return `Kanal anzeigen-Berechtigung und Nachrichten senden-Berechtigung`;
	 }	
	 if (lang === "pt") {
		 return `Ver canal e Enviar mensagens`;
	 }		 
	 else {
		 return `View Channel and Send Messages`;
	 } 
 }		
										else if ( !( (interaction.guild.members.me).permissionsIn(channelIDArray[c]).has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks])) )
 {
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
										else if ( !( (interaction.guild.members.me).permissionsIn(channelIDArray[c]).has([PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.EmbedLinks])) )
 { 
	 if (lang === "en") {
		 return `View Channel and Embed Links`;
	 }
	 if (lang === "es") {
		 return `Ver canal y Insertar enlaces`;
	 }
	 if (lang === "ru") {
		 return `Посмотреть каналa и Вставить ссылки`
	 }	
	 if (lang === "de") {
		 return `Kanal anzeigen-Berechtigung und Links einbetten-Berechtigung`;
	 }	
	 if (lang === "pt") {
		 return `Ver canal e Inserir links`;
	 }		 
	 else {
		 return `View Channel and Embed Links`;
	 }
 }							
						else if (!((interaction.guild.members.me).permissionsIn(channelIDArray[c]).has(PermissionsBitField.Flags.SendMessages))) {
	 if (lang === "en") {
		 return `Send Messages`;
	 }
	 if (lang === "es") {
		 return `Enviar mensajes`;
	 }
	 if (lang === "ru") {
		 return `Отправить сообщения`
	 }	
	 if (lang === "de") {
		 return `Nachrichten senden-Berechtigung`;
	 }	
	 if (lang === "pt") {
		 return `Enviar mensagens`;
	 }		 
	 else {
		 return `Send Messages`;
	 }
						}
						else if (!((interaction.guild.members.me).permissionsIn(channelIDArray[c]).has(PermissionsBitField.Flags.ViewChannel))) {
	 if (lang === "en") {
		 return `View Channel`;
	 }
	 if (lang === "es") {
		 return `Ver canal`;
	 }
	 if (lang === "ru") {
		 return `Посмотреть каналa`;
	 }	
	 if (lang === "de") {
		 return `Kanal anzeigen-Berechtigung`; 
	 }	
	 if (lang === "pt") {
		 return `Ver canal`;
	 }		 
	 else {
		 return `View Channel`;
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
					}						

			let missingPermissionsEmbed = new EmbedBuilder()
				.setColor('0xFF0000') //RED
				.setDescription(`${missingPermissionsDesc()}`)

				if ( ((interaction.guild.members.me).permissionsIn(channelIDArray[c]).has(PermissionsBitField.Flags.SendMessages)) && ((interaction.guild.members.me).permissionsIn(channelIDArray[c]).has(PermissionsBitField.Flags.ViewChannel)) && ((interaction.guild.members.me).permissionsIn(channelIDArray[c]).has(PermissionsBitField.Flags.EmbedLinks)))
 {	//If the bot has all permissions
	 			if (gtaFinalString.length <= 4000) {
				interaction.guild.channels.fetch(channelIDArray[c]).then(channel => channel.send(({embeds: [gtaImageEmbed, gtaEmbed]}))).catch(err => console.log(`GTA Test Min Error: ${err.stack}`));
			} else {
				interaction.guild.channels.fetch(channelIDArray[c]).then(channel => channel.send({embeds: [gtaImageEmbed, gtaEmbed, gtaEmbed2]})).catch(err => console.log(`GTA Test Max Error: ${err.stack}`));
			}	
	 				await interaction.followUp({ embeds: [testEmbed], components: [], ephemeral: true }).catch(err => console.log(` Error: ${err.stack}`));
				}
				else {	
					interaction.followUp({embeds: [missingPermissionsEmbed], components: [], ephemeral: true});
				}						
				
			} //end if not undefined channel
		} //end c loop

	} 
	else {
			let RStarDownEmbed = new EmbedBuilder()
				.setColor('0xFF0000') //RED
				.setDescription(`The Rockstar Social Club website is down. \nPlease try again later.`)
			client.channels.fetch(process.env.logChannel2).then(channel => channel.send({embeds: [RStarDownEmbed], ephemeral: true}));
			console.log(`The Rockstar Social Club website is down.`);	
	}	
	} //end if (status === `success`)
	else {
			let RStarDownEmbed = new EmbedBuilder()
				.setColor('0xFF0000') //RED
				.setDescription(`The Rockstar Social Club website is down. \nPlease try again later. \nSorry for the inconvenience.`)
			interaction.editReply({embeds: [RStarDownEmbed], ephemeral: true});
			console.log(`The Rockstar Social Club website is down.`);	
	}		
				}
			});


	
//----------------------------------END GTA TEST POST----------------------------------//
		}		

		let buttonUserID01 = (interaction.customId).split("gtaTest - ");
		let buttonUserID = buttonUserID01[1];
			//console.log(`start buttonUserID: ${buttonUserID}`);
			//console.log(`start interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`);
			//console.log(`start interaction.user.id: ${interaction.user.id} && buttonUserID: ${buttonUserID}`);

		let guildRoleIds = [];
		fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
		    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
		
					interaction.guild.roles.cache.forEach(role => {
							if (data.includes(role.id)) {
								guildRoleIds.push(role.id);
							}
					});
			guildRoleIds.splice(guildRoleIds.length - 1); //.splice(guildRoleIds.length - 1) removes the @everyone role
				//console.log(`guildRoleIds: ${guildRoleIds}`);


		let gtaChannelIds = [];
		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
		    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
		
					interaction.guild.channels.cache.forEach(channel => {
							if (data.includes(channel.id)) {
								gtaChannelIds.push(channel.id);
							}
					});
			});
			//console.log(`gtaChannelIds: ${gtaChannelIds}`);					

			function AdminRequired() {
				let AdminRequiredBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
				if (AdminRequiredBoolean[1] === undefined) {
					 	fs.appendFile(`./rolesDataBase.txt`,`guild:${interaction.guild.id} - admin:yes - role:undefined - \n`, err => {
 							if (err) {
 								console.error(err)
 								return
 							}					
 						}); //end fs.appendFile	
				}
				else if (AdminRequiredBoolean[1].startsWith(`yes`)) {
					return "AdminRequiredYes";
				}
				else {
					return "AdminRequiredNo";
				}
			}		
				//console.log(`AdminRequired(): ${AdminRequired()}`)		

//--BEGIN TRANSLATIONS--//

	function firstTime() {
		if (lang === "en") {
			return `It looks like this is your first time using this command. Please try the test button again.`;
		}
		else if (lang === "es") {
			return `Parece que es la primera vez que usas este comando. Vuelva a intentar el botón de prueba.`;
		}
		else if (lang === "ru") {
			return `Похоже, вы впервые используете эту команду. Повторите попытку нажатия кнопки теста.`;
		}
		else if (lang === "de") {
			return `Es sieht so aus, als ob Sie diesen Befehl zum ersten Mal verwenden. Bitte versuchen Sie es erneut mit dem Test-Button.`;
		}
		else if (lang === "pt") {
			return `Parece que esta é a primeira vez que você usa esse comando. Tente o botão de teste novamente.`;
		}
		else {
			return `It looks like this is your first time using this command. Please try the test button again.`;
		}		
	}			

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
					await interaction.deferUpdate();
		//console.log(`AdminRequired(): ${AdminRequired()}`)
				if (interaction.user.id != buttonUserID) {
					await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
				}	
		else if (gtaChannelIds.length <= 0) {
			await interaction.followUp({ content: `${noSubscriptions()}`, ephemeral: true });
		}			
		else if (AdminRequired() === undefined) { //uncessary because confirm already checked? 
			await interaction.followUp({ content: `${firstTime()}`, ephemeral: true });
		}
		else if (AdminRequired() === "AdminRequiredYes") { //if admin permissions are required
			if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) {
				gtaTest();
			} 
			else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
				await interaction.followUp({content: `${missingPermissions()}`, ephemeral: true})
			}
			else if (!interaction.user.id === buttonUserID)  {
				await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
			}
		}
		else if (AdminRequired() === "AdminRequiredNo") { //if admin permissions are NOT required

				//console.log(`guildRoleIds.length: ${guildRoleIds.length}`)
				let hasARole = 0;
				for (a=0;a<=guildRoleIds.length - 1;a++) { //iterates through each role - 0 is @everyone
					//console.log(`guildRoleIds at ${a}: ${guildRoleIds[a]}`);
					//console.log(`hasARole at ${a}? ${interaction.member.roles.cache.has(guildRoleIds[a])}`);
					if (interaction.member.roles.cache.has(guildRoleIds[a])) {
						hasARole += 1;
					}
				} //end loop to check for hasARole
					//console.log(`hasARole: ${hasARole} && required roles:${guildRoleIds.length}`)
				if ( (guildRoleIds.length === 0) && (interaction.user.id === buttonUserID) ) { //no role required
					gtaTest();
				}
				else if ( (hasARole >= 1) && (interaction.user.id === buttonUserID) ) { //if the user has at least one role listed
					gtaTest();
				}
				else if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) { //user is an admin
					gtaTest();
				}		
				else if (hasARole <= 0) {
					await interaction.followUp({content: `${missingPermissions()}`, ephemeral: true})
				}											
		}
		else {
			await interaction.followUp({ content: `There was an error executing this button.`, ephemeral: true });
		} //end checking for permissions	
		});
					}}); //end fs.readFile for LANGDataBase.txt
		}
},

}