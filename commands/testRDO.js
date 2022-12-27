const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const phantom = require('phantom'); //https://github.com/amir20/phantomjs-node
      let errorEmbed = new EmbedBuilder()
      .setColor('Red') 
      .setTitle(`Uh Oh!`)
      .setDescription(`There was an error while executing this command!\nThe error has been sent to the developer and will be fixed as soon as possible.\nPlease try again in a few minutes.\n\nIf the problem persists you can try [re-inviting the bot](<${process.env.invite_link}>) or \nYou can report it in the [Rockstar Weekly Support Server](<${process.env.support_link}>)`);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('testrdo')
		.setDescription('Latest RDR2 online bonuses and discounts')
		.setDMPermission(true),
	async execute(interaction) {
		await interaction.deferReply().catch(console.error);



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

			let langBase = `/?lang=`;
			let langURL = `${langBase}${lang}`;

		let url = `${baseURL}${urlHash}${langURL}`;
			//console.log(`url: ${url}`);

		const rdoStatus = await page.open(url);
		if (rdoStatus === `success`) {
		
		const instance = await phantom.create();
		const page = await instance.createPage();

		await page.property('viewportSize', { width: 1024, height: 600 });
		const status = await page.open(url);
			//console.log(`Page opened with status [${status}].`);
	if (status === `success`) { //checks if Rockstar Social Club website is down
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
		let rdoString = rdoStringOG.replace(/<li>/g, "• ")
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
			
			rdoFinalString01 += `• ${rdoParas[c].charAt(0).toUpperCase()}${rdoParas[c].substring(1)}\n`;
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
		let rdoFinalString = rdoFinalString01.replace(/<p>/g, "")
											.replace(/<\/p>/g, "")
										  .replace(/<\/b>/g, "")
										  .replace(/<b>/g, "")
											.replace(/\n\n• /g, "\n• ") //removes spaces before a list item
											.replace(/\n\n/g, "\n")
											.replace(/\*\*\n\*\*/g, "**\n\n**")
											.replace(/• undefined/g, "• ")
											.replace(/\)• /g, ")\n• ") //adds a newline between link lists

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
    function rdoFooterMin() { 
      if (rdoFinalString.length <= 4000) {
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

		function rdoTitleFunction() {
					
			if (lang === "en") {
				return `Red Dead Online Bonuses:`;
			}
			else if (lang === "es") {
				return `Bonificaciones de Red Dead Online:`;
			}
			else if (lang === "ru") {
				return `Бонусы Red Dead Online:`;
			}
			else if (lang === "de") {
				return `Boni in Red Dead Online:`;
			}
			else if (lang === "pt") {
				return `Bônus no Red Dead Online:`;
			}
			else {
    		return `Red Dead Online Bonuses & Discounts:`;
			}		
		}
		//console.log(`rdoTitleFunction: ${rdoTitleFunction()}`);
		

		let rdoEmbed = new EmbedBuilder()
			.setColor('0xC10000') //Red
			.setTitle(`${rdoTitleFunction()}`) //Red Dead Redemption II Online Bonuses & Discounts:
			.setDescription(`${rdoDate[0]}\n\n${rdoPost()} \n${rdoFooterMin()} ${elipseFunction()}`)
		let rdoEmbed2 = new EmbedBuilder()
			.setColor('0xC10000') //Red
			.setDescription(`${elipseFunction()} \n${rdoPost2()} ${rdoFooterMax()}`)	
		let rdoImageEmbed = new EmbedBuilder()
			.setColor('0xC10000') //Red
			.setImage(`${rdoImage[0]}`);	

		 // console.log(`rdoEmbed length: ${rdoEmbed.length}`); //no more than 4096 (line 199)
		 // console.log(`rdoEmbed2 length: ${rdoEmbed2.length}`); //no more than 6000 - rdoEmbed.length (line 204)

		if (rdoFinalString.length <= 4000) {
			await interaction.editReply({embeds: [rdoImageEmbed, rdoEmbed]}).catch(err => 
				interaction.editReply({embeds: [errorEmbed], ephemeral: true }).then( 
				console.log(`There was an error! \nUser:${interaction.user.tag} - ${interaction} \nError: ${err.stack}`))
				);
		} else {
			await interaction.editReply({embeds: [rdoImageEmbed, rdoEmbed, rdoEmbed2]}).catch(err => 
				interaction.editReply({embeds: [errorEmbed], ephemeral: true }).then( 
				console.log(`There was an error! \nUser:${interaction.user.tag} - ${interaction} \nError: ${err.stack}`) )
				);
		}

		const aDate = new Date();
		const aDay = aDate.getDay(); //Day of the Week
		    //console.log(`aDay: ${aDay}`);
		const aHour = aDate.getHours(); //Time of Day UTC (+6 MST; +4 EST)
		    //console.log(`aHour: ${aHour}`);
		const aDigit = aDate.getDate(); //Day of the month
				//console.log(`aDigit: ${aDigit}`);
		
		 let rdoExpiredEmbed = new EmbedBuilder()
		    .setColor('0xC10000') //Red
		    .setDescription(`These bonuses & discounts may be expired. \nRockstar typically releases the latest bonuses & discounts the first \nTuesday of every month after 1:00 PM EST.`)

    //if ( (aDay === 3) ) { //Test for today 0 = Sunday, 1 = Monday ... 6 = Saturday
		if ( (aDay === 2) && (aHour < 17) && (aDigit <= 7) ) { //If it's Tuesday(2) before 1:00PM EST (17) and the first week of the month
			await interaction.followUp({embeds: [rdoExpiredEmbed], ephemeral:true}).catch(err => console.log(`rdoExpiredEmbed Error: ${err.stack}`));
		}			

			//interaction.editReply(`Console logged! 👍`);
	} else {
			let RStarDownEmbed = new EmbedBuilder()
				.setColor('0xFF0000') //RED 
				.setDescription(`The Rockstar Social Club website is down. \nPlease try again later. \nSorry for the inconvenience.`)
			interaction.editReply({embeds: [RStarDownEmbed], ephemeral: true});
			console.log(`The Rockstar Social Club website is down.`);	
	}
}
					}}); //end fs.readFile for LANGDataBase.txt
	}
	}
}