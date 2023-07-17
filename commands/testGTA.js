const { SlashCommandBuilder, EmbedBuilder, time } = require('discord.js');
const fetch = require("@replit/node-fetch");
const NEXT_BONUS = require('../events/nextBonus.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testgta')
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
				var startTime = performance.now();
				interaction.reply('<a:RStar_Loading:1129814509381501008>').catch(error => {console.log(`GTA reply error: ${error}`)});
				//await interaction.deferReply().catch(error => {console.log(`GTA deferReply error: ${error}`)});

        var lang = interaction.locale.toString();
        //console.log(`lang:${lang}`);

				var nextBonus = await NEXT_BONUS.nextBonus("gta");
				//console.log(`next Bonus: <t:${Math.round(nextBonus / 1000)}>`);

				var gtaFetch = await fetch(`${process.env.gtaGraphURL1}${lang}${process.env.gtaGraphURL2}`, {
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

				//console.log(gtaText);

				var gtaURLHash = getgtaParse.data.posts.results[0].id;
				var fetchGTA = await fetch(`${process.env.gtaGraphURL3}${gtaURLHash}%22%2C%22locale%22%3A%22${lang}${process.env.gtaGraphURL4}`, {
				    "cache": "default",
				    "credentials": "omit",
				    "headers": {
				        "Accept": "*/*",
				        "Accept-Language": "ru-RU,ru;q=0.9",
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

				var gtaMainTitle = gtaParse.data.post.title
				var gtaSubTitle = gtaParse.data.post.subtitle;
				var gtaDate = gtaParse.data.post.created_formatted;
					//console.log(`gtaTitle: ${gtaTitle}\ngtaSubTitle: ${gtaSubTitle}\ngtaDate: ${gtaDate}`);
				gtaPost += `**${gtaDate}**\n${gtaSubTitle}\n`;

					var allBonuses = gtaParse.data.post.tina.variables.keys;

					var gtaBonus = Object.values(allBonuses);

					var badge1 = "";
					var badge1Bonus = "";
					var badgeLocation = 0;
					var badge2 = "";
					var badge2Bonus = "";
					var badge3 = "";
					var badge3Bonus = "";
					for(var k = 1; k <= gtaBonus.length; k++) {
						if (gtaBonus[k] === undefined) {
							continue;
						}
						if (gtaBonus[k].badge !== undefined) {
							if (badge1 === "") {
								badge1 += gtaBonus[k].badge;
								badgeLocation = gtaPost.length;
							}
							else if ((gtaBonus[k].badge !== badge1) && (badge2 === "")) {
								badge2 += gtaBonus[k].badge;
							}
							else if ((gtaBonus[k].badge !== badge1) && (gtaBonus[k].badge !== badge2) && (badge3 === "")) {
								badge3 += gtaBonus[k].badge;
							}
						}
						else if (gtaBonus[k - 1].badge !== undefined) {
							var linkedBonus = Object.values(gtaBonus[k]);
							if (gtaBonus[k - 1].badge === badge1) {
								if (badge1.toLowerCase().includes("2x")) {
									if (linkedBonus[0].length <= 50) {
										badge1Bonus += `\n**${linkedBonus[0]}**\n`;
									}
									else {
										badge1Bonus += `• ${linkedBonus[0]}\n`;
									}
								}
								else {
									for (var m = 0; m <= linkedBonus.length - 1; m++) {
										badge1Bonus += `• ${linkedBonus[0]}\n`;
									}									
								}
							}
							else if (gtaBonus[k - 1].badge === badge2) {
								if (badge2.toLowerCase().includes("2x")) {
									if (linkedBonus[0].length <= 50) {
										badge2Bonus += `\n**${linkedBonus[0]}**\n`;
									}
									else {
										badge2Bonus += `• ${linkedBonus[0]}\n`;
									}
								}
								else {
									for (var m = 0; m <= linkedBonus.length - 1; m++) {
										badge2Bonus += `• ${linkedBonus[0]}\n`;
									}									
								}
							}		
							else if (gtaBonus[k - 1].badge === badge3) {
								if (badge3.toLowerCase().includes("2x")) {
									if (linkedBonus[0].length <= 50) {
										badge3Bonus += `\n**${linkedBonus[0]}**\n`;
									}
									else {
										badge3Bonus += `• ${linkedBonus[0]}\n`;
									}
								}
								else {
									for (var m = 0; m <= linkedBonus.length - 1; m++) {
										badge3Bonus += `• ${linkedBonus[0]}\n`;
									}									
								}
							}								
						}
						else if (gtaBonus[k - 1].badge === undefined) {
							if (gtaBonus[k].content !== undefined) {
								gtaPost += `${gtaBonus[k].content}\n`;
							}		
							if (gtaBonus[k].title !== undefined) {
								gtaPost += `\n**${gtaBonus[k].title}**\n`;
							}				
							if (gtaBonus[k].description !== undefined) {
								gtaPost += `${gtaBonus[k].description}\n`;
							}		
							if (gtaBonus[k].text !== undefined) { //gta+ top&bottom FIXME 
								gtaPost += `${gtaBonus[k].text}\n`;
							}			
							if (gtaBonus[k].title_and_description !== undefined) { //DISCOUNTS
								gtaPost += `\n**${gtaBonus[k].title_and_description.title}**\n${gtaBonus[k].title_and_description.description}`;
							}
						}
					}

					var constChars = 0;
					function badges() {
						
						var noBonusWords = [`1.5`, `1,5`, `2x`, `2X`, `2.5`, `2,5`, `50%`, `50 %`, `double`, `doble`, `doublés`, `doppi`, `veículo-prêmio`, `diamond`, `3x`, `3X`, `4x`, `4X`, `ПРИЗОВОЙ`, `ВДВОЕ`, `ВТРОЕ`];
						if (badge1Bonus !== "") {
							var post1 = gtaPost.slice(0, badgeLocation);
							var post2 = gtaPost.slice(badgeLocation, gtaPost.length - 1);
							var badgeSplit = badge1.toString().split(" ");
							var bonusWord1 = false;
							badgeSplit.forEach(element => { //checks for noBonusWords in badge1
								if (noBonusWords.indexOf(element) >= 0) {
									bonusWord1 = true;
								}
							});
							if (bonusWord1 === true) {
								gtaPost = `${post1}\n\n${badge1Bonus}\n${post2}`;
								constChars += badge1Bonus.length + 3;
							}
							else {
								gtaPost = `${post1}**${badge1.toUpperCase()}**\n${badge1Bonus}\n${post2}`;
								constChars += badge1.length + badge1Bonus.length + 6;
							}
						}
						if (badge2Bonus !== "") {
							var post1 = gtaPost.slice(0, (badgeLocation + constChars));
							var post2 = gtaPost.slice((badgeLocation + constChars), gtaPost.length - 1);
							var badgeSplit = badge2.toString().split(" ");
							var bonusWord2 = false;
							badgeSplit.forEach(element => { //checks for noBonusWords in badge2
								if (noBonusWords.indexOf(element) >= 0) {
									bonusWord2 = true;
								}
							});
							if (bonusWord2 === true)  {
								gtaPost = `${post1}\n\n${badge2Bonus}\n${post2}`;
								constChars += badge2Bonus.length + 3;
							}
							else {
								gtaPost = `${post1}**${badge2.toUpperCase()}**\n${badge2Bonus}\n${post2}`;
								constChars += badge2.length + badge2Bonus.length + 6;
							}
						}
						if (badge3Bonus !== "") {
							var post1 = gtaPost.slice(0, (badgeLocation + constChars));
							var post2 = gtaPost.slice((badgeLocation + constChars), gtaPost.length - 1);
							var badgeSplit = badge3.toString().split(" ");
							var bonusWord3 = false;
							badgeSplit.forEach(element => { //checks for noBonusWords in badge2
								//console.log(`element: ${element} - T/F: ${(noBonusWords.indexOf(element) >= 0)}`)
								if (noBonusWords.indexOf(element) >= 0) {
									bonusWord3 = true;
								}
							});
							if (bonusWord3 === true)  {
								gtaPost = `${post1}\n\n${badge3Bonus}\n${post2}`;
								constChars += badge3Bonus.length + 3;
							}
							else {
								gtaPost = `${post1}**${badge3.toUpperCase()}**\n${badge3Bonus}\n${post2}`;
								constChars += badge3.length + badge3Bonus.length + 6;
							}
						}							
					}
					badges();

					function replaceLinks() {
						var gtaLinks = /<a href=\".*?<\/a>/g;
						for (const match of gtaPost.matchAll(gtaLinks)) {
						  //console.log(match[0]);
							var gtaLinkURL2 = match[0].toString().split("href=\"");
							var gtaLinkURL1 = gtaLinkURL2[1].split("\">");
							var gtaLinkURL = gtaLinkURL1[0];

							var gtaLinkTitle1 = gtaLinkURL1[1].split("<");
							var gtaLinkTitle = gtaLinkTitle1[0];

							gtaPost = gtaPost.replace(gtaLinks, `[${gtaLinkTitle}](${gtaLinkURL})`);
							
						}
					}
					replaceLinks();
					gtaPost += ">"; //the last > gets dropped?? why?

					var gtaReGex = /<.*?>/g;
					var gtaFinal = gtaPost
						.replace(/<br><br>/g, "\n") //adds a newline
						.replace(/<li>/g, "\n• ") //adds a bullet point to list items
						.replace(/<h3>/g, "\n\n**") //adds a newline for missed titles
						.replace(/<\/h3>/g, "**\n") //adds a newline for missed titles
						.replace(gtaReGex, "") //removes all remaining HTML
						.replace(/\n\n\n/g, "\n\n") //removes excess newlines

					//console.log(gtaFinal);

					let gtaEmbed = new EmbedBuilder()
							.setColor(0x00CD06) //Green
							.setTitle(`${gtaMainTitle}`)
							.setDescription(`${gtaFinal}`)

					console.log(`gtaFinal.l: ${gtaFinal.length}`);

				await interaction.editReply({ content: "", embeds: [gtaEmbed] }).catch(err =>
						interaction.editReply({ content: "", embeds: [errorEmbed], ephemeral: true }).then(
								console.log(`There was an error! \nUser:${interaction.user.tag} - ${interaction} \nError: ${err.stack}`))
				);			

				var endTime = performance.now();
        //await interaction.editReply(`Pong! (${endTime - startTime})`);
    },
};