const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("@replit/node-fetch");
const NEXT_BONUS = require("../events/nextBonus.js");
const THIS_BONUS = require("../events/thisBonus.js");

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
						"zh-CN": 'GTA 线上模式奖励',
            "zh-TW": 'GTA 線上模式獎勵',
            ja: '「GTAオンライン」ボーナス',
            ko: 'GTA 온라인 보너스',
        })
        .setDMPermission(true),
    async execute(interaction) {      
        var startTime = performance.now();
				await interaction.deferReply().catch(error => {console.log(`GTA Defer Reply Error: \n${error}`)});

        var LANG = interaction.locale.toString();
        	//console.log(`LANG:${LANG}`);

        var nextBonus01 = await NEXT_BONUS.nextBonus("gta");
        var thisBonus01 = await THIS_BONUS.thisBonus("gta");
            // console.log(`next Bonus: <t:${Math.round(nextBonus01 / 1000)}>`);

        var gtaFetch = await fetch(process.env.gtaGraphURL, {
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
            //console.log(getgtaJSON);

				function langFunction() {		
					if (LANG.includes("en")) {
						return "";
					}
					else if (LANG.includes("es")) {
						return "/es"
					}
					else if (LANG.includes("pt")) {
						return "/br";
					}	
					else if (LANG.includes("CN")) { //simplified Chinese (China)
						return "/zh";
					}
					else if (LANG.includes("TW")) { //traditional Chinese (Taiwan)
						return "/tw";
					}	
					else if (LANG.includes("ja")) {
						return "/jp";
					}						
					else if (LANG.includes("ko")) {
						return "/kr";
					}
				  else if (supportedLanguages.indexOf(LANG.substring(0, 2)) < 0) { //unsupported languages are treated as English
						return "";
					}
					else {
						return `/${LANG}`;
					}
				}

				function latestBonus() {
					var gtaCheckDate = new Date(getgtaParse.data.posts.results[0].created).toString().substring(0, 3);
					var gtaCheckTime = new Date(getgtaParse.data.posts.results[0].created).toString().includes("10:00");
						//console.log(`gtaCheckDate: ${gtaCheckDate} \ngtaCheckTime: ${gtaCheckTime}`);
					if ((gtaCheckDate !== "Thu") || (gtaCheckTime === false)) { //if post 0 is not a weekly bonus check post 1
						var gtaCheckDate2 = new Date(getgtaParse.data.posts.results[1].created).toString().substring(0, 3);
						var gtaCheckTime2 = new Date(getgtaParse.data.posts.results[1].created).toString().includes("10:00");	
							//console.log(`gtaCheckDate2: ${gtaCheckDate2} \ngtaCheckTime2: ${gtaCheckTime2}`);
						if ((gtaCheckDate2 !== "Thu") || (gtaCheckTime === false)) { //if post 1 is not a weekly bonus check post 2
							var gtaCheckDate3 = new Date(getgtaParse.data.posts.results[2].created).toString().substring(0, 3);
							var gtaCheckTime3 = new Date(getgtaParse.data.posts.results[2].created).toString().includes("10:00");							
							if ((gtaCheckDate3 !== "Thu") || (gtaCheckTime === false)) { //if post 2 is not a weekly bonus return post 3
								return 3
							}
							else {
								return 2;
							}
						}
						else {
							return 1;
						}
					}
					else {
						return 0;
					}
				}			

        var gtaImage = getgtaParse.data.posts.results[latestBonus()].preview_images_parsed.newswire_block.d16x9;
        	//console.log(`gtaImage: ${gtaImage}`);			
        var gtaURLHash = getgtaParse.data.posts.results[latestBonus()].id;
        var gtaURLFull = `https://www.rockstargames.com${langFunction()}${getgtaParse.data.posts.results[latestBonus()].url}`;
        var fetchGTA = await fetch(`${process.env.gtaGraphURL3}${gtaURLHash}%22%2C%22locale%22%3A%22${LANG}${process.env.gtaGraphURL4}`, {
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

        var gtaPost = "";
        var gtaJSON01 = await fetchGTA.json();
        var gtaJSON = JSON.stringify(gtaJSON01);
        var gtaParse = JSON.parse(gtaJSON);
            //console.log(`gtaJSON: \n\n${gtaJSON}\n\n`);

        var gtaMainTitle = gtaParse.data.post.title
        var gtaSubTitle = gtaParse.data.post.subtitle;
        //var gtaBlurb = gtaParse.data.post.tina.variables.keys.meta.blurb;
        //var gtaDate = gtaParse.data.post.created_formatted;
            //console.log(`gtaTitle: ${gtaTitle}\ngtaSubTitle: ${gtaSubTitle}\ngtaDate: ${gtaDate}`);
        var thisBonus = Math.round((thisBonus01) / 1000) + 21600; // plus 6 hours
        var nextBonus = Math.round((nextBonus01) / 1000) - 54060; // minus 15.016 hours
            // console.log(`thisBonus01: ${thisBonus01} - nextBonus01: ${nextBonus01}`);
            // console.log(`thisBonus: ${thisBonus} - nextBonus: ${nextBonus}`);
        gtaPost += `¶¶t:${thisBonus}:D∞∞ - ¶¶t:${nextBonus}:D∞∞\n\n• ${gtaSubTitle}\n\n`; //• ${gtaBlurb}\n\n

        var allBonuses = gtaParse.data.post.tina.variables.keys;
        var gtaBonus = Object.values(allBonuses);
        var gtaPlusBonus = "";
        var gtaPlusCount = 0;
        var gtaPlusInsert = 0;
        var gtaPlusBottom = 0;

        //START Populating gtaPost
				var misplacedBonus = "";
				var noBonusArray = ["1.5X", "1.5x", "1,5X", "1,5x", "2X", "2x", "2.5X", "2.5x", "2,5X", "2,5x", "3X", "3x", "4X", "4x", "40%", "40 %", "50%", "50 %", "Double", "Doble", "RDO$", "Вдвое", "GTA$", "Gains"];	
				var noBonus = [];
        for (var k = 2; k <= gtaBonus.length - 2; k++) { //first bonus is the subtitle and blurb, last bonus is the gun van inventory discounts
							//console.log(`${k}: \n${JSON.stringify(gtaBonus[k])}`);
						if ((gtaBonus[k].badge !== undefined) && (gtaBonus[k].badge !== null)) {
							var joinTitle = gtaBonus[k].badge.split(" ")[0]; //first word of badge
							if (noBonusArray.indexOf(joinTitle) >= 0) {
								noBonus.push(k+1);
							}
						}
						if ((gtaBonus[k].text !== undefined) && (gtaPlusCount !== 1)){ //gta+ top
								gtaPlusBonus += `\n**${gtaBonus[k].text}**\n`;
								gtaPlusCount++;
								gtaPlusInsert = gtaPost.length;
								gtaPlusBottom = k + 1;
						}
						if (gtaBonus[k].title !== undefined) {
							gtaPost += `\n**${gtaBonus[k].title}**\n`; 
							var joinTitle = gtaBonus[k].title.split(" ")[0]; //first word of title
							if (noBonusArray.indexOf(joinTitle) >= 0) {
								noBonus.push(k+1);
							}							
						}
						if (gtaBonus[k].description !== undefined) {
								gtaPost += `• ${gtaBonus[k].description}\n`;
						}
						if ((gtaBonus[k].content !== undefined) && (noBonus.indexOf(k) < 0)) { //adds description if not a 2x, 3x, etc bonus
								gtaPost += `• ${gtaBonus[k].content}\n`;
						}
						if (gtaBonus[k].title_and_description !== undefined) { //DISCOUNTS
								if (gtaBonus[k].title_and_description.title !== undefined) {
									gtaPost += `\n**${gtaBonus[k].title_and_description.title}**\n`;
								}
								if (gtaBonus[k].title_and_description.description !== undefined) {
									gtaPost += `• ${gtaBonus[k].title_and_description.description}\n`;
								}
						}					
        }
        //END for loop

        function gtaPlus() {
            gtaPlusBonus += `${gtaBonus[gtaPlusBottom].text}\n`; //adds the GTA+ bottom text
            var gtaPost1 = gtaPost.slice(0, gtaPlusInsert);
            var gtaPost2 = gtaPost.slice(gtaPlusInsert, gtaPost.length);
            gtaPost = gtaPost1 + gtaPlusBonus + gtaPost2;
        }
        gtaPlus();

				if (gtaBonus[gtaBonus.length - 1].content !== undefined) { //adds the gun van inventory discounts
						gtaPost += `${gtaBonus[gtaBonus.length - 1].content}\n`;
				}			

				function replaceLinks() {
					var gtaLinks = /<a href=\".*?<\/a>/g;
					for (const match of gtaPost.matchAll(gtaLinks)) {
						//console.log(match[0]);
						var gtaLinkURL2 = match[0].toString().split("href=\"");
						for (var j = 0; j <= gtaLinkURL2.length - 1; j++) { //iterates through all the links
							var gtaLinkURL1 = gtaLinkURL2[j].split("\">");
							if (gtaLinkURL1[1] !== undefined) {
								var gtaLinkTitle1 = gtaLinkURL1[1].split("<");
								var gtaLinkTitle = gtaLinkTitle1[0];
								var gtaLinkURL = gtaLinkURL1[0];
								//console.log(`match[0]: ${match[0]} - gtaLinkTitle: ${gtaLinkTitle} - gtaLinkURL: ${gtaLinkURL}`);
								gtaPost = gtaPost.replace(match[0], `[${gtaLinkTitle}](${gtaLinkURL})`);
							}
						}
					}
				}
				replaceLinks();

        var gtaReGex = /<.*?>/g;
        var gtaFinalString = gtaPost
						.replace(/<br><br>/g, "\n• ") //adds a bullet for additional paragraphs
            .replace(/<li>/g, "\n• ") //adds a bullet point to list items
            .replace(/<h3>/g, "\n\n**") //adds a newline for missed titles
            .replace(/<\/h3>/g, "**\n") //adds a newline for missed titles
            .replace(gtaReGex, "") //removes all remaining HTML
            .replace(/\¶\¶/g, "<") //creates timestamps for thisBonus && nextBonus
            .replace(/\∞\∞/g, ">")//creates timestamps for thisBonus && nextBonus
						.replace(/• \n/g, "") //removes extra bullet points
            .replace(/\n\n\n/g, "\n\n") //removes excess newlines

        //console.log(gtaFinalString);

        var constChars = (gtaMainTitle.length);
        function ellipsisFunction() {
            if (gtaFinalString.length >= (4000 - constChars)) {
                return "...";
            } else {
                return "";
            }
        }
        function ellipsisFunction2() {
            if (gtaFinalString.length >= (6000 - constChars - gtaImage.length)) {
                return "...\n";
            } else {
                return "";
            }
        }
				function footerText() {
					if (LANG.includes("en")) {
							return `\n** [More details](${gtaURLFull})**`;
					}
					else if (LANG.includes("es")) {
							return `\n** [Más detalles](${gtaURLFull})**`;
					}
					else if (LANG.includes("pt")) {
							return `\n** [Mais detalhes](${gtaURLFull})**`;
					}						
					else if (LANG.includes("ru")) {
							return `\n** [Подробнее](${gtaURLFull})**`;
					}
					else if (LANG.includes("de")) {
							return `\n** [Mehr Details](${gtaURLFull})**`;
					}
					else if (LANG.includes("pl")) {
							return `\n** [Więcej szczegółów](${gtaURLFull})**`;
					}
					else if (LANG.includes("fr")) {
							return `\n** [Plus de détails](${gtaURLFull})**`;
					}
					else if (LANG.includes("it")) {
							return `\n** [Più dettagli](${gtaURLFull})**`;
					}
					else if (LANG.includes("CN")) {
							return `\n** [更多细节](${gtaURLFull})**`;
					}
					else if (LANG.includes("TW")) {
							return `\n** [更多細節](${gtaURLFull})**`;
					}
					else if (LANG.includes("ja")) {
							return `\n** [さらに詳しく](${gtaURLFull})**`;
					}
					else if (LANG.includes("ko")) {
							return `\n** [자세한 내용은](${gtaURLFull})**`;
					}
					else {
							return `\n** [More Details](${gtaURLFull})**`;
					}					
				}			
        function gtaFooterMin() {
            if (gtaFinalString.length < (4000 - constChars)) {
                return footerText();
            } else {
                return "";
            }
        }
        function gtaFooterMax() {
            if (gtaFinalString.length >= (4000 - constChars)) {
                return footerText();
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

        var constChars1 = (gtaFooterMax().length) + (ellipsisFunction().length) + (ellipsisFunction2().length) + gtaImage.length;
        var gtaNewlines1 = gtaFinalString.substr(bestBreak(), (6000 - constChars - constChars1 - bestBreak())).split("\n");
        var tempString1 = gtaNewlines1[gtaNewlines1.length - 1];
        function bestEndBreak() {
            if (gtaFinalString.length <= (6000 - constChars - constChars1)) {
                return gtaFinalString.length;
            }
            return (6000 - bestBreak() - constChars - constChars1 - tempString1.length); //removes the last bonus if over 6000 chars
        }
        //console.log(`bestEndBreak:${bestEndBreak()}`);

        gtaPost = gtaFinalString.slice(0, (bestBreak()));
        //console.log(`gtaPost.length:${gtaPost.length || 0}`);
        function gtaPost2() {
            if (gtaPost.length < gtaFinalString.length) {
                let post02 = gtaFinalString.substr((bestBreak()), (bestEndBreak()));
                return post02;
            } else {
                return "";
            }
        }
        //console.log(`gtaPost2().length:${gtaPost2().length || 0}`);

        let gtaEmbed = new EmbedBuilder()
            .setColor(0x00CD06) //Green
            .setTitle(`${gtaMainTitle}`)
            .setDescription(`${gtaPost}${gtaFooterMin()}${ellipsisFunction()}`)
        let gtaEmbed2 = new EmbedBuilder()
            .setColor(0x00CD06) //Green
            .setDescription(`${ellipsisFunction()} \n${gtaPost2()} ${ellipsisFunction2()}${gtaFooterMax()}`)
        let gtaImageEmbed = new EmbedBuilder()
            .setColor(0x00CD06) //Green
            .setImage(`${gtaImage}`);               

        //console.log(`gtaFinal.l: ${gtaFinal.length}`);

        let errorEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`Uh Oh!`)
            .setDescription(`There was an error while executing this command!\nThe error has been sent to the developer and will be fixed as soon as possible.\nPlease try again in a few minutes.\n\nIf the problem persists you can try [re-inviting the bot](<${process.env.invite_link}>) or \nYou can report it in the [Rockstar Weekly Support Server](<${process.env.support_link}>)`);    

        if (gtaPost2() === "") {
            await interaction.editReply({ content: "", embeds: [gtaImageEmbed, gtaEmbed] }).catch(err =>
                interaction.editReply({ content: "", embeds: [errorEmbed], ephemeral: true }).then(
                    console.log(`There was an error! \nUser:${interaction.user.tag} - ${interaction} \nError: ${err.stack}`))
            );
        } else {
            await interaction.editReply({ content: "", embeds: [gtaImageEmbed, gtaEmbed, gtaEmbed2] }).catch(err =>
                interaction.editReply({ content: "", embeds: [errorEmbed], ephemeral: true }).then(
                    console.log(`There was an error! \nUser:${interaction.user.tag} - ${interaction} \nError: ${err.stack}`))
            );
        }

        var endTime = performance.now();
        //await interaction.editReply(`Pong! (${endTime - startTime})`);
    },
}