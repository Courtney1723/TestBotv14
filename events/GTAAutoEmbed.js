var cron = require('node-cron'); //https://github.com/node-cron/node-cron
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const phantom = require('phantom'); //https://github.com/amir20/phantomjs-node

module.exports = {
	name: 'ready',
	async execute(client) {

		//cron.schedule('* * * * *', () => { //(second),minute,hour,date,month,weekday 
		cron.schedule('50 11 * * 4', () => { //(second),minute,hour,date,month,weekday '0 12 * * 4' = 12:00 PM on Thursday
		  console.log('sending GTA Auto Posts...');

//----------Begin Formatting GuildIds, ChannelIds, and rdo_gtaIDs-----------//	
			fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
			  if (err) {console.log(`Error: ${err}`)} 
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


						//client.channels.fetch(channelIDs03).then(channel => channel.send('<content>')) //example DO NOT UNCOMMENT

					}

					//console.log(`guildIDs: ${guildIDs}`);
					console.log(`channelIDs: ${channelIDs}`); //do not comment out - no idea why
					//console.log(`rdo_gtaIDs: ${rdo_gtaIDs}`);
//----------END Formatting GuildIds, ChannelIds, and rdo_gtaIDs-----------//	

					

//Begin GTA Formatting		

let gtaURL = process.env.SOCIAL_URL_GTA2;

		//await interaction.editReply(`Console Logged ????`).catch(console.error);
	
		const instance = await phantom.create();
		const page = await instance.createPage();

		await page.property('viewportSize', { width: 1024, height: 600 });
		const status = await page.open(gtaURL);
			//console.log(`Page opened with status [${status}].`);
	if (status === `success`) { //checks if Rockstar Social Club website is down
		const content = await page.property('content'); // Gets the latest gta updates
			//console.log(content); 

		let baseURL = "https://socialclub.rockstargames.com/events/";
		
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
		let urlLink = urlLink01[1];
			//console.log(`urlLink: ${urlLink01[1]}`);

		let url = `${baseURL}${urlHash}/${urlSlug}`;
			//console.log(`url: ${url}`);

		const gtaStatus = await page.open(url);
		if (gtaStatus === `success`) { //checks if Rockstar Social Club website is down
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
		let gtaString = gtaStringOG.replace(/<li>/g, "??? ")
			.replace(/<\/li>/g, "")
			.replace(/<\/ul>/g, "")
			.replace(/&amp;/g, "&")
			.replace(/&nbsp;/g, " ") //Non breaking space
			.replace(/\n<ul style=\"line-height:1.5;\">/g, "")
			.replace(/<ul style="line-height:1.5;">/g, "")
			.replace(/\n<p>/g, "<p>") //Removes spaces after a bonus
			.replace(/<p>Only/g, "<p><b>Only")
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
						let gtaParas = GTA_Bonus.split("<p>");
						//gtaFinalString01 += `**Only on PlayStation 5 and Xbox Series X|S:**\n`;
						if (!GTA_Title.toLowerCase().includes("motorsport showroom")) {
							gtaFinalString01 += `??? ${GTA_Title}\n`;
						}
						else {
							gtaFinalString01 += `**${GTA_Title}**\n??? ${gtaParas[1]}\n`;
						}
					}
					else if (i === 0) { //if the bonus is an intro paragraph.
						let introParas = GTA_Title.split("<p>")
						//gtaFinalString01 += `??? ${introParas[1]}\n`; //usual intro paragraph
						gtaFinalString01 += `??? ${introParas[1].charAt(0).toUpperCase()}${introParas[1].substr(1)}\n`; //not sure why the first word is lowercase?
						if (introParas[2] != undefined) {
							gtaFinalString01 += `??? ${introParas[2].charAt(0).toUpperCase()}${introParas[2].substr(1)}\n`; //not sure why the first word is lowercase?
						}						
					}
					else if (GTA_Bonus != null) { //if the bonus is not an intro paraghraph
						let gtaParas = GTA_Bonus.split("<p>");
						//console.log(`gtaParas at ${i}: ${gtaParas}`);
						//console.log(`gtaParas length at ${i}: ${gtaParas.length}`);	
						if (GTA_Title.toLowerCase().includes("only on playstation")) { //fail safe for if the NextGenIndex does not work properly
							gtaFinalString01 += `**Only on PlayStation 5 or Xbox Series X|S:**\n`;
						}
						else if (GTA_Bonus.toLowerCase().includes("premium test ride")) { //fail safe for if the NextGenIndex does not work properly
							gtaFinalString01 += `??? ${gtaParas[1]}\n`;
						}
						else if (GTA_Title.toLowerCase().includes("hsw time trial")) { //fail safe for if the NextGenIndex does not work properly
							gtaFinalString01 += `??? ${GTA_Title}\n`;
						}
						else if (GTA_Title.toLowerCase().includes("candy cane")) {
							gtaFinalString01 += `**${GTA_Title}**\n??? ${gtaParas[1]}\n`;
						}							
						else if (GTA_Title.toLowerCase().includes("new community series")) {
							gtaFinalString01 += `**${GTA_Title}**\n??? ${gtaParas[1]}\n`;
						}
						else if (GTA_Title.toLowerCase().includes("series updates")) {
							gtaFinalString01 += `**${GTA_Title}**\n??? ${gtaParas[1]}\n??? ${gtaParas[2]}\n`;
						}
						else if (GTA_Title.toLowerCase().includes("motorsport showroom")) {
							gtaFinalString01 += `**${GTA_Title}**\n??? ${gtaParas[1]}\n`;
						}
						else if (GTA_Title.toLowerCase().includes("simeon's showroom")) {
							gtaFinalString01 += `**${GTA_Title}**\n??? ${gtaParas[1]}\n`;
						}					
						else if (GTA_Title.toLowerCase().includes("festive surprises")) {
							gtaFinalString01 += `**${GTA_Title}***\n`;
						}					
						else if (GTA_Title.toLowerCase().includes("new year")) {
							gtaFinalString01 += `**${GTA_Title}**\n??? ${gtaParas[1]}\n`;
						}	
						else if (GTA_Title.toLowerCase().includes("2.5x")) {
							gtaFinalString01 += `**${GTA_Title}** \n`;
						}
						else if (GTA_Title.toLowerCase().includes("3x")) {
							gtaFinalString01 += `**${GTA_Title}** \n`;
						}
						else if (GTA_Title.toLowerCase().includes("gta+")) {
							gtaFinalString01 += `**${GTA_Title}**\n??? ${gtaParas[1]}\n${gtaParas[2]})\n`; //FIXME - remove parenthesis
						}
						else if (GTA_Title.toLowerCase().includes("discount")) {
							gtaFinalString01 += `**${GTA_Title}**\n??? ${GTA_Bonus}:\n`;
						}
						else if (GTA_Bonus.includes("??? ")) { //if the bonus includes lists
							if (gtaParas[0] != null) {
								if ((gtaParas[1] != null) && (gtaParas[1] != `undefined`)) {
									let gtaListBonus = gtaParas[1].split("\n\n???");
									if (gtaParas[2] != null) { //if the bonus has a paragraph after the list
										gtaFinalString01 += `**${GTA_Title}**\n${gtaParas[1]}\n??? ${gtaParas[2]}\n`;
									}
									else { //if the bonus does not have a paragraph after the list
										gtaFinalString01 += `**${GTA_Title}**\n??? ${gtaListBonus[2]}\n`;
									}
								}
							}
							else {
								gtaFinalString01 += `**${GTA_Title}**\n\n`;
							}
						}
						else if (GTA_Bonus.toLowerCase().includes("luxury autos")) {
							gtaFinalString01 += `**${GTA_Title}**\n??? ${gtaParas[1]}\n`;
						}
						else if (i === GTABonuses01.length - 2) { //if the bonus is the last bonus
							gtaFinalString01 += `**${GTA_Title}**\n??? ${gtaParas[1]}\n??? ${gtaParas[2]}\n??? ${gtaParas[3]}`;
						}
						else if (gtaParas.length > 2) { // if the bonus has two or more paragraphs include only 1st and 2nd
							gtaFinalString01 += `**${GTA_Title}**\n??? ${gtaParas[1]}\n`;
						}
						else { //if the bonus only has 1 paragraph only post the title
							gtaFinalString01 += `\n**${GTA_Title}**\n\n`;
						}
					}
					// else { //if the bonus only has 1 paragraph only post the title
					// 	gtaFinalString01 += `\n**${GTA_Title}**\n\n`;
					// }

				}
//-----------END for loop----------//		
	//console.log(`gtaFinalString01: ${gtaFinalString01}`); //gtaFinalString before HTML formatting
		let gtaFinalString = gtaFinalString01.replace(/<p>/g, "")
											.replace(/<\/p>/g, "")
										  .replace(/<\/b>/g, "")
										  .replace(/<b>/g, "")
											.replace(/\n\n??? /g, "\n??? ") //removes spaces before a list item
											.replace(/.\n\*\*/g, "\n\n**")
											.replace(/\n\n\n/g, "\n\n")
											.replace(/\n\n\n/g, "\n\n")
											.replace(/??? undefined/g, "??? ")
											.replace(/??? \n\n/g, "")

			//console.log(`gtaFinalString: ${gtaFinalString}`);
    function gtaPost() {
        return gtaFinalString.slice(0, 3918); //FIXME: adjust this for the best break - up to 4000
    }
    //console.log(`1: ${gtaFinalString.length}\n`) 
    function gtaPost2() {
      if (gtaFinalString.length > 4000) {
        let post02 = gtaFinalString.substr(3918, 1800); //FIXME: adjust this for the best break - up to 4000 (a, b) a+b !> 5890
        return post02;
      } else {
        return "";
      }
    }  
    function elipseFunction() {
      if (gtaFinalString.length > 4000) {
        return "...";
        } else {
        return "";
        }
    }		
    function gtaFooterMax() {
      if (gtaFinalString.length > 4000) {
        return `\n** [click here](${url}) for more details**`;
      } else {
        return "";
      }
    }
    function gtaFooterMin() { 
      if (gtaFinalString.length <= 4000) {
        return `** [click here](${url}) for more details**`;
      } else {
        return "";
      }
    } 		
		

		let gtaEmbed = new EmbedBuilder()
			.setColor('0x00CD06') //Green
			.setTitle('Grand Theft Auto V Online Weekly Bonuses & Discounts:')
			.setDescription(`${gtaDate[0]}\n\n${gtaPost()} \n${gtaFooterMin()} ${elipseFunction()}`)
		let gtaEmbed2 = new EmbedBuilder()
			.setColor('0x00CD06') //Green
			.setDescription(`${elipseFunction()} \n${gtaPost2()} ${gtaFooterMax()}`)	
		let gtaImageEmbed = new EmbedBuilder()
			.setColor('0x00CD06') //Green
			.setImage(`${gtaImage[0]}`);

		 // console.log(`gtaEmbed length: ${gtaEmbed.length}`); //no more than 4096 (line 199)
		 // console.log(`gtaEmbed2 length: ${gtaEmbed2.length}`); //no more than 6000 - gtaEmbed.length (line 204)



//-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//
//-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//		
//-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//

		
		let channelIDArray = channelIDs.split(' - ');
			//console.log(`channelIDArray length: ${channelIDArray.length}`);
			//console.log(`channelIDArray: ${channelIDArray}`);
		for (c = 0; c <= channelIDArray.length - 2; c++) { //last element will always be blank
			if (channelIDArray[c].includes("undefined")) {}
			else {
				if (gtaFinalString.length <= 4000) {
					client.channels.fetch(channelIDArray[c]).then(channel => channel.send(({embeds: [gtaImageEmbed, gtaEmbed]}))).catch(err => console.log(`Min Error: ${err}`));
				} 
				else {
					client.channels.fetch(channelIDArray[c]).then(channel => channel.send({embeds: [gtaImageEmbed, gtaEmbed, gtaEmbed2]})).catch(err => console.log(`Max Error: ${err}`));
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
	} 
	else {
			let RStarDownEmbed = new EmbedBuilder()
				.setColor('0xFF0000') //RED
				.setDescription(`The Rockstar Social Club website is down. \nPlease try again later.`)
			client.channels.fetch(process.env.logChannel2).then(channel => channel.send({embeds: [RStarDownEmbed], ephemeral: true}));
			console.log(`The Rockstar Social Club website is down.`);	
	}					
				}
			});
		}, {
   scheduled: true,
   timezone: "America/Denver"
 });

		
	}
}