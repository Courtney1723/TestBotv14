const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
const phantom = require('phantom'); //https://github.com/amir20/phantomjs-node
		let errorText = `There was an error while executing this command!\nThe error has been sent to the developer and it will be fixed as soon as possible. \nIf the error persists you can try re-inviting the Rockstar Weekly bot by [clicking here](<${process.env.invite_link}>). \nReport the error by joining the Rockstar Weekly bot support server: [click here](<${process.env.support_link}>).`;

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isButton()) {return};
		if (interaction.customId.startsWith(`rdoTest -`)) {

		fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
			  if (err) {console.log(`Error: ${err}`)} 
				else {
					let lang03 = data.split("lang:");
					//console.log(`lang03.length: ${lang03.length}`);

					let langArray = [];
					for (i=1; i <= lang03.length - 1; i++) { //first will always be undefined
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

					if ((interaction.channel.type === 0) || (interaction.channel.type === 5)) {
						if (interaction.guild.id === guildIDArray[i]) {
								lang += `${langArray[i]}`;
							}
						}
					}
					//console.log(`lang: ${lang}`);	

	function rdoTest() {

//----------------------------------BEGIN RDO TEST POST----------------------------------//	
			fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
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

					

//Begin RDO Formatting		
	let rdoURL = process.env.SOCIAL_URL_RDO2;

		//await interaction.editReply(`Console Logged ????`).catch(console.error);
	
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

			let langBase = `/?lang=`;
			let langURL = `${langBase}${lang}`;

		let url = `${baseURL}${urlHash}${langURL}`;
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
		
		let rdoString002 = rdoString01[1]; //Splits the header from the body
			//console.log(`rdoString: ${rdoString002}`)
		let rdoString02 = rdoString002.split("</div>"); //splits the footer from the body
			//console.log(`rdoString02: ${rdoString02[0]}`);
		let rdoStringOG = `${rdoString02[0]}<p><b>`; //the entire string before any editing w/o footer or header
			//console.log(`rdoStringOG: ${rdoStringOG}`);

		//Replaces or removes HTML formatting that can interfere with split functions or is constant
		let rdoString = rdoStringOG.replace(/<li>/g, "??? ")
			.replace(/<\/li>/g, "")
			.replace(/<\/ul>/g, "")
			.replace(/&amp;/g, "&")
			.replace(/&nbsp;/g, " ") //Non breaking space
			.replace(/\n\n/g, "\n")			
			.replace(/<ul style="line-height:1.5;">/g, "\n")
			//.replace(/\n<p>/g, "<p>") //Removes spaces after a bonus
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
		}
		//console.log(`rdoLinkFormatted: ${rdoLinkFormatted}`);
//--------------------END formatting for links--------------------//

//--------------------BEGIN checking for words that are bold at the beginning of a paragraph-------------------//

	function notATitleIndex() {
		let rdoTitles001 = rdoLinkFormatted.split("<p><b>");

		let notATitleIndex001 = "";
		for (i = 0; i <= rdoTitles001.length - 1; i++) {
			if ( rdoTitles001[i].charAt(1) != rdoTitles001[i].charAt(1).toUpperCase() ) {
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
			if ( rdoTitles001[i].charAt(1) != rdoTitles001[i].charAt(1).toUpperCase() ) {
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
	
//------------------BEGIN capitalization Function-----------------//
		function titleCapitalization(titles) {
				//console.log(`Titles1: ${titles[0]}\n`); // Full Title
				let Titles2 = titles[0].split(` `);
					//console.log(`Titles2: ${Titles2[0]}\n`); // First word of the title
				let titlesLength = Object.keys(Titles2).length; //counts the number of words in the title array
					//console.log(`Titles2 size at ${i}: ${titlesLength}\n`);
				let rdoTitleString = ""; //initial empty title, will be populated in the j loop
				
			for (j = 0; j <= titlesLength; ++j) {
				while (j <= (titlesLength)) { 
					//console.log(`I: ${i}, J: ${j}\n`); //while loop check, expected: i = title number, j = index of title words
					if ( (Titles2[j] != null) && (Titles2[j] != "") ) { //ignores blank space elements
						//console.log(`Titles2 at J: ${j}: ${Titles2[j]}\n`); //checks for blank elements
						//console.log(`${Titles2[j].charAt(0)}${Titles2[j].toLowerCase().slice(1)}`); //capital first letters check 
	//returns first letter capitalized + rest of the word lowercase if the word is the first word in the title - unless RDO
					if ( (Titles2[j] === Titles2[0]) && (!Titles2[j].includes("RDO")) && (Titles2[j] != "XP") && (Titles2[j] != "RP") && (Titles2[j] != "GT") && (Titles2[j] != "LD") && (Titles2[j] != "LSPD") && (Titles2[j] != "HSW") ) { 
						rdoTitleString += `${Titles2[j].charAt(0)}${Titles2[j].toLowerCase().slice(1)} `; 
					}
	//returns all caps if title is RDO, RDO$, or XP							
					else if ( (Titles2[j].includes("RDO")) || (Titles2[j] === "XP") || (Titles2[j] === "RP") || (Titles2[j] === "GT")  || (Titles2[j] === "LD") || (Titles2[j] === "LSPD") || (Titles2[j] === "HSW") ) { 
							rdoTitleString += `${Titles2[j]} `;
					}
	//returns all lowercase if not a title word					
					else if ( (Titles2[j] === "ON")  || (Titles2[j] === "OF") || (Titles2[j] === "THE") || (Titles2[j] === "AN") || (Titles2[j] === "AND") || (Titles2[j] === "FOR") || (Titles2[j] === "A") || (Titles2[j] === "AT") || (Titles2[j] === "IN") ) { 
						rdoTitleString += `${Titles2[j].toLowerCase()} `;
					} 
	//else returns capital first letter and lowercase rest of the word				
					else {
						rdoTitleString += `${Titles2[j].charAt(0)}${Titles2[j].toLowerCase().slice(1)} `; 
						}
					}
					++j;
				}
			}
			//return Titles2[0]; //Testbench if rdoTitleString has an error, this returns the first word of every title
			return `${rdoTitleString}`;
			}
		let RDO_Title = titleCapitalization(RDOBonuses);
		//console.log(`RDO_Title at ${i}: ${RDO_Title}`);		
//--------------------END capitalization Function-----------------//		

		//-----BEGIN get the index of "Only on PlayStation..." title-----//
	
			function onlyOnIndex1() { //returns the index of the title: Only on Playstation...
				if ( RDO_Title.toLowerCase().includes("only on playstation") ) {
					return i + 1;
				} else {
					return -1;
					}
			}
				//console.log(`onlyOnIndex1() at ${i}: ${onlyOnIndex1()}`);
	
			function onlyOnIndex2() { //returns the index of the title: Only on Playstation...
				if ( RDO_Title.toLowerCase().includes("only on playstation") ) {
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
	
	let RDO_Bonus = RDOBonuses[1];
		//console.log(`RDO_Bonus at ${i}: ${RDO_Bonus}`);
//-----BEGIN populating rdoFinalString01 -----//
	if (i === 0) {
		let rdoParas = RDO_Title.split("<p>");
		for (c = 1; c <= rdoParas.length - 1; c++) {
			
			rdoFinalString01 += `??? ${rdoParas[c].charAt(0).toUpperCase()}${rdoParas[c].substring(1)}\n`;
		}
	}
if (RDO_Bonus != undefined) {
	if (RDO_Title.toLowerCase().includes("discounts")) {
			rdoFinalString01 += `\n**${RDO_Title}**${RDO_Bonus}\n`;
	}	
	else if (RDO_Title.toLowerCase().includes("triple rewards")) {
		rdoFinalString01 += `**${RDO_Title}**\n\n`;
	}
	else if (RDO_Title.toLowerCase().includes("featured series")) {
		rdoFinalString01 += `**${RDO_Title}**${RDO_Bonus}\n\n`;
	}		
	else if (RDO_Title.toLowerCase().includes(":")) {
		rdoFinalString01 += `**${RDO_Title}**${RDO_Bonus}\n\n`;
	}			
	else if (RDO_Bonus.includes("??? ")) { // If the bonus includes a list

			let rdoParas = RDO_Bonus.split("<p>");
			//console.log(`rdoParas at ${i}: ${rdoParas}`);
			//console.log(`rdoParas length at ${i}: ${rdoParas.length}`);
			let rdoParaBonuses = "";
		
		for (c = 1; c <= rdoParas.length - 1; c++) {
			rdoParaBonuses += `??? ${rdoParas[c]}\n`;
		}			
		
		rdoFinalString01 += `**${RDO_Title}**\n${rdoParaBonuses}\n`;
	}			
	else {
			let rdoParas = RDO_Bonus.split("<p>");
			//console.log(`rdoParas at ${i}: ${rdoParas}`);
			//console.log(`rdoParas length at ${i}: ${rdoParas.length}`);
			let rdoParaBonuses = "";		
		for (c = 1; c <= rdoParas.length - 1; c++) {
			rdoParaBonuses += `??? ${rdoParas[c]}\n`;
		}			
		rdoFinalString01 += `**${RDO_Title}**\n${rdoParaBonuses}\n`;
	}
	
	}
}
//-----------END for loop----------//		
	//console.log(`rdoFinalString01: ${rdoFinalString01}`); //rdoFinalString before HTML formatting
		let rdoFinalString = rdoFinalString01.replace(/<p>/g, "")
											.replace(/<\/p>/g, "")
										  .replace(/<\/b>/g, "")
										  .replace(/<b>/g, "")
											.replace(/\n\n??? /g, "\n??? ") //removes spaces before a list item
											.replace(/\n\n/g, "\n")
											.replace(/\*\*\n\*\*/g, "**\n\n**")
											.replace(/??? undefined/g, "??? ")
											.replace(/\)??? /g, ")\n??? ") //adds a newline between link lists

			//console.log(`rdoFinalString: ${rdoFinalString}`);
    function rdoPost() {
        return rdoFinalString.slice(0, 3909); //FIXME: adjust this for the best break - up to 4000
    }
    //console.log(`1: ${rdoFinalString.length}\n`) 
    function rdoPost2() {
      if (rdoFinalString.length > 4000) {
        let post02 = rdoFinalString.substr(3909, 2000); //FIXME: adjust this for the best break - up to 4000 (a, b) a+b !> 5890
        return post02;
      } else {
        return "";
      }
    }  
    function elipseFunction() {
      if (rdoFinalString.length > 4000) {
        return "...";
        } else {
        return "";
        }
    }		
    function rdoFooterMax() {
      if (rdoFinalString.length > 4000) {
				if (lang === "en") {
					return `\n** [click here](${url}) for more details**`;
				}
				else if (lang === "es" ) {
					return `\n** [haga clic aqu??](${url}) para m??s detalles**`;
				}
				else if (lang === "ru" ) {
					return `\n** [?????????????? ??????????](${url}) ?????? ?????????????????? ?????????? ?????????????????? ????????????????????**`;
				}				
				else if (lang === "de" ) {
					return `\n** [Klicken Sie hier](${url}) f??r weitere Details**`;
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
    function rdoFooterMin() { 
      if (rdoFinalString.length <= 4000) {
				if (lang === "en") {
					return `\n** [click here](${url}) for more details**`;
				}
				else if (lang === "es" ) {
					return `\n** [haga clic aqu??](${url}) para m??s detalles**`;
				}
				else if (lang === "ru" ) {
					return `\n** [?????????????? ??????????](${url}) ?????? ?????????????????? ?????????? ?????????????????? ????????????????????**`;
				}				
				else if (lang === "de" ) {
					return `\n** [Klicken Sie hier](${url}) f??r weitere Details**`;
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

//--BEGIN TRANSLATIONS--//

function rdoTitleFunction() {
					
			if (lang === "en") {
				return `Red Dead Online Bonuses:`;
			}
			else if (lang === "es") {
				return `Bonificaciones de Red Dead Online:`;
			}
			else if (lang === "ru") {
				return `???????????? Red Dead Online:`;
			}
			else if (lang === "de") {
				return `Boni in Red Dead Online:`;
			}
			else if (lang === "pt") {
				return `B??nus no Red Dead Online:`;
			}
			else {
    		return `Red Dead Online Bonuses & Discounts:`;
			}		
		}
		//console.log(`rdoTitleFunction: ${rdoTitleFunction()}`);

//--END TRANSLATIONS--//
		

		let rdoEmbed = new EmbedBuilder()
			.setColor('0xC10000') //Red
			.setTitle(`${rdoTitleFunction()}`)
			.setDescription(`${rdoDate[0]}\n\n${rdoPost()} \n${rdoFooterMin()} ${elipseFunction()}`)
		let rdoEmbed2 = new EmbedBuilder()
			.setColor('0xC10000') //Red
			.setDescription(`${elipseFunction()} \n${rdoPost2()} ${rdoFooterMax()}`)	
		let rdoImageEmbed = new EmbedBuilder()
			.setColor('0xC10000') //Red
			.setImage(`${rdoImage[0]}`);

		 // console.log(`rdoEmbed length: ${rdoEmbed.length}`); //no more than 4096 (line 199)
		 // console.log(`rdoEmbed2 length: ${rdoEmbed2.length}`); //no more than 6000 - rdoEmbed.length (line 204)


		
//-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//
//-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//		
//-------------------------------------DO NOT CHANGE ANYTHING BELOW THIS-------------------------------------//

		
		let channelIDArray = channelIDs.split(' - ');
			//console.log(`channelIDArray length: ${channelIDArray.length}`);
			//console.log(`channelIDArray: ${channelIDArray}`);
		for (c = 0; c <= channelIDArray.length - 2; c++) { //last element will always be blank
			//console.log(`channelIDArray at ${c}: ${channelIDArray[c]}`);
			if (channelIDArray[c].startsWith("undefined")) {return}
			else if (!channelIDArray[c].startsWith("undefined")) {			
				if (rdoFinalString.length <= 4000) {
					interaction.guild.channels.fetch(channelIDArray[c]).then(channel => channel.send(({embeds: [rdoImageEmbed, rdoEmbed]}))).catch(err => console.log(`Test Min RDO Error: ${err}`));
				} else {
					//console.log(`channelIDArray at ${c}: ${channelIDArray[c]}`)
					interaction.guild.channels.fetch(channelIDArray[c]).then(channel => channel.send({embeds: [rdoImageEmbed, rdoEmbed, rdoEmbed2]})).catch(err => console.log(`Test Max RDO Error: ${err}`));
				}
			}
		} //end c loop

	} else {
			let RStarDownEmbed = new EmbedBuilder()
				.setColor('0xFF0000') //RED
				.setDescription(`The Rockstar Social Club website is down. \nPlease try again later. \nSorry for the inconvenience.`)
			client.channels.fetch(process.env.logChannel).then(channel => channel.send({embeds: [RStarDownEmbed], ephemeral: true}));
			console.log(`The Rockstar Social Club website is down.`);	
	}	
				}
				}
			});

			
//----------------------------------END RDO TEST FUNCTION----------------------------------//	
	}



			

		let buttonUserID01 = (interaction.customId).split("rdoTest - ");
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

		let rdoChannelIds = [];
		fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
		    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
		
					interaction.guild.channels.cache.forEach(channel => {
							if (data.includes(channel.id)) {
								rdoChannelIds.push(channel.id);
							}
					});
			});	
			//console.log(`rdoChannelIds length: ${rdoChannelIds.length}`);					

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

		function success() {
			if (lang === "en") {
				return `Success`;
			}
			else if (lang === "es") {
				return `??xito`;
			}
			else if (lang === "ru") {
				return `??????????`;
			}
			else if (lang === "de") {
				return `Erfolg`;
			}
			else if (lang === "pt") {
				return `??xito`;
			}	
			else {
				return `Success`;
			}				
		}

		function sentPostDesc() {
			if (lang === "en") {
				return `??? Posts have been sent to your subscribed channels!\n??? If a channel you are subscribed to did not get a test post check to make sure the bot has the **\'View Channel\'**, **\'Send Messages\'**, and **\'Embed Links\'** permissions.`;
			}
			else if (lang === "es") {
				return `??? Se han enviado publicaciones a tus canales suscritos.\n??? Si un canal al que est?? suscrito no obtuvo una comprobaci??n posterior de prueba para asegurarse de que el bot tiene permiso para ver el canal, enviar mensajes e insertar v??nculos.`;
			}
			else if (lang === "ru") {
				return `??? ?????????????????? ???????? ???????????????????? ???? ???????? ???????????? ?? ??????????????????.\n??? ???????? ??????????, ???? ?????????????? ???? ??????????????????, ???? ?????????????? ???????????????? ????????????, ?????????? ??????????????????, ?????? ?????? ?????????? ???????????????????? ???? ???????????????? ????????????, ???????????????? ?????????????????? ?? ?????????????????????? ????????????.`;
			}
			else if (lang === "de") {
				return `??? Beitr??ge wurden an Ihre abonnierten Kan??le gesendet.\n??? Wenn ein Kanal, den Sie abonniert haben, keine Testbeitrags??berpr??fung erhalten hat, um sicherzustellen, dass der Bot ??ber die Berechtigung zum Anzeigen des Kanals, zum Senden von Nachrichten und zum Einbetten von Links verf??gt.`;
			}
			else if (lang === "pt") {
				return `??? Se han enviado publicaciones a sus canales suscritos.\n??? Se um canal no qual voc?? est?? inscrito n??o recebeu uma verifica????o de postagem de teste para garantir que o bot tenha permiss??o para visualizar o canal, enviar mensagens e incorporar links.`;
			}
			else {
				return `??? Posts have been sent to your subscribed channels!\n??? If a channel you are subscribed to did not get a test post check to make sure the bot has the **\'View Channel\'**, **\'Send Messages\'**, and **\'Embed Links\'** permissions.`;
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
						return `?????? ???????????? ???? ?????? ??????.`;
					}
					else if (lang === "de") {
						return `Diese Schaltfl??chen sind nicht f??r Sie.`;
					}
					else if (lang === "pt") {
						return `Esses bot??es n??o s??o para voc??.`;
					}
					else {
						return `These buttons are not for you.`;
					}				
			}	

	function noSubscriptions() {
		if (lang === "en") {
			return `You do not have any channels subscribed to Red Dead Online auto posts.`;
		}
		else if (lang === "es") {
			return `No tienes ning??n canal suscrito a las publicaciones autom??ticas de Red Dead Online.`;
		}
		else if (lang === "ru") {
			return `?? ?????? ?????? ??????????????, ?????????????????????? ???? ???????????????????????????? ?????????? Red Dead Online.`;
		}
		else if (lang === "de") {
			return `Sie haben keine Kan??le, die Red Dead Online-Autobeitr??ge abonniert haben.`;
		}
		else if (lang === "pt") {
			return `Voc?? n??o tem nenhum canal inscrito nas postagens autom??ticas do Red Dead Online.`;
		}
		else {
			return `You do not have any channels subscribed to Red Dead Online auto posts.`;
		}		
	}

	function firstTime() {
		if (lang === "en") {
			return `It looks like this is your first time using this command. Please try the test button again.`;
		}
		else if (lang === "es") {
			return `Parece que es la primera vez que usas este comando. Vuelva a intentar el bot??n de prueba.`;
		}
		else if (lang === "ru") {
			return `????????????, ???? ?????????????? ?????????????????????? ?????? ??????????????. ?????????????????? ?????????????? ?????????????? ???????????? ??????????.`;
		}
		else if (lang === "de") {
			return `Es sieht so aus, als ob Sie diesen Befehl zum ersten Mal verwenden. Bitte versuchen Sie es erneut mit dem Test-Button.`;
		}
		else if (lang === "pt") {
			return `Parece que esta ?? a primeira vez que voc?? usa esse comando. Tente o bot??o de teste novamente.`;
		}
		else {
			return `It looks like this is your first time using this command. Please try the test button again.`;
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
				  return `?? ?????? ?????? ???????????????????? ???? ??????.`;
				}
				else if (lang === "de") {
				  return `Sie haben keine Erlaubnis dazu.`;
				}
				else if (lang === "pt") {
				  return `Voc?? n??o tem permiss??o para fazer isso.`;
				}
				else {
				  return `You do not have the required permissions to do that.`;
				}				
			}				

//--END TRANSLATIONS--//

		const testEmbed = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`${success()}`)
			.setDescription(`${sentPostDesc()}`)


//begin checking for permissions
					await interaction.deferUpdate();
		//console.log(`AdminRequired(): ${AdminRequired()}`)
				if (interaction.user.id != buttonUserID) {
					await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
				}	
		else if (rdoChannelIds.length <= 0) { 
			await interaction.followUp({ content: `${noSubscriptions()}`, ephemeral: true });
		}						
		else if (AdminRequired() === undefined) { //uncessary because confirm already checked? 
			await interaction.followUp({ content: `${firstTime()}`, ephemeral: true });
		}
		else if (AdminRequired() === "AdminRequiredYes") { //if admin permissions are required
			if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) {
				rdoTest();
				await interaction.followUp({ embeds: [testEmbed], components: [], ephemeral: true }).catch(err => console.log(`testEmbed Error: ${err}`));
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
					//console.log(`guildRoleIds at ${i}: ${guildRoleIds[i]}`);
					if (interaction.member.roles.cache.has(guildRoleIds[a])) {
						hasARole += 1;
					}
				} //end loop to check for hasARole
					//console.log(`hasARole: ${hasARole} && required roles:${guildRoleIds.length}`)
				if ( (guildRoleIds.length === 0) && (interaction.user.id === buttonUserID) ) { //no role required
					rdoTest();
					await interaction.followUp({ embeds: [testEmbed], components: [], ephemeral: true }).catch(err => console.log(` Error: ${err.stack}`));
				}
				else if ( (hasARole >= 1) && (interaction.user.id === buttonUserID) ) { //if the user has at least one role listed
					rdoTest();
					await interaction.followUp({ embeds: [testEmbed], components: [], ephemeral: true }).catch(err => console.log(` Error: ${err.stack}`));
				}
				else if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) { //if user is an admin
					rdoTest();
					await interaction.followUp({ embeds: [testEmbed], components: [], ephemeral: true }).catch(err => console.log(` Error: ${err.stack}`));
				}		
				else if (hasARole <= 0) {
					await interaction.followUp({content: `${missingPermissions()}`, ephemeral: true})
				}											
		}
		else {
			await interaction.followUp({ content: `There was an error executing this button. Please try again in a few minutes.`, ephemeral: true });
			console.log(`rdoTest error: ${error.stack}`);
		} //end checking for permissions	

			

		});

		}}); //end fs.readFile for LANGDataBase.txt
		}
	

},

}