const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const fetch = require("@replit/node-fetch");
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const NEXT_BONUS = require("../events/nextBonus.js");
const THIS_BONUS = require("../events/thisBonus.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rdo')
        .setDescription('Latest RDO Online Bonuses')
        .setDescriptionLocalizations({
            "es-ES": 'Bonificaciones de Red Dead Online',
            "pt-BR": 'Bônus no Red Dead Online',
            ru: 'Бонусы Red Dead Online',
            de: 'Boni in Red Dead Online',
            pl: 'Premie Red Dead Online',					
            fr: 'Bonus dans Red Dead Online',
            it: 'Bonus di Red Dead Online',
            "zh-CN": 'Red Dead 線上模式獎勵',
						"zh-TW": 'Red Dead 線上模式',
            ja: '「レッド・デッド・オンライン」ボーナス',
            ko: 'Red Dead 온라인 보너스',
        })
        .setDMPermission(true),
    async execute(interaction) {      
        var startTime = performance.now();
				await interaction.deferReply().catch(error => {console.log(`RDO Defer Reply Error: \n${error}`)});

        var LANG = interaction.locale.toString();
        	//console.log(`LANG: ${LANG}`);

        var nextBonus01 = await NEXT_BONUS.nextBonus("rdo");
        var thisBonus01 = await THIS_BONUS.thisBonus("rdo");
            // console.log(`next Bonus: <t:${Math.round(nextBonus01 / 1000)}>`);

        var rdoFetch = await fetch(`${process.env.rdoGraphURL1}${LANG}${process.env.rdoGraphURL2}`, {
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

        var getrdoJSON01 = await rdoFetch.json();
        var getrdoJSON = JSON.stringify(getrdoJSON01);
        var getrdoParse = JSON.parse(getrdoJSON);
            //console.log(getrdoJSON);

				function langFunction() {	
					if (LANG.includes("en")) {
						return "";
					}
					if (LANG.includes("es")) {
						return "es";
					}
					if (LANG.includes("pt")) {
						return "/br";
					}	
					if (LANG.includes("CN")) { //simplified Chinese (China)
						return "/zh";
					}
					if (LANG.includes("TW")) { //traditional Chinese (Taiwan)
						return "/tw";
					}	
					if (LANG.includes("ja")) {
						return "/jp";
					}					
					if (LANG.includes("ko")) {
						return "/kr";
					}
					if (supportedLanguages.indexOf(LANG.substring(0, 2)) < 0) { //unsupported languages are treated as English
						return "";
					}	
					else { //ru, de, pl, fr, it
						return `/${LANG}`;
					}
				}
				function gold() {
					if (LANG.includes("en")) {
						return "Gold Bars";
					}
					if (LANG.includes("es")) {
						return "lingotes de oro";
					}
					if (LANG.includes("pt")) {
						return "Barras de Ouro";
					}
					if (LANG.includes("ru")) {
						return "золотых слитков";
					}	
					if (LANG.includes("de")) {
						return "Goldbarren";
					}	
					if (LANG.includes("pl")) {
						return "sztabek złota";
					}			
					if (LANG.includes("fr")) {
						return "lingots d'or";
					}	
					if (LANG.includes("it")) {
						return "Lingotti d'Oro";
					}	
					if (LANG.includes("CN")) {
						return "金条";
					}					
					if (LANG.includes("TW")) {
						return "金條";
					}	
					if (LANG.includes("ja")) {
						return "格のゴールド バー";
					}	
					if (LANG.includes("ko")) {
						return "금괴";
					}
					else {
						return "Gold Bars";
					}
				}
				function discounts() {
					if (LANG.includes("en")) {
						return "Discounts";
					}
					if (LANG.includes("es")) {
						return "Descuentos";
					}
					if (LANG.includes("pt")) {
						return "Descontos";
					}
					if (LANG.includes("ru")) {
						return "Скидки";
					}	
					if (LANG.includes("de")) {
						return "Rabatte";
					}	
					if (LANG.includes("pl")) {
						return "Zniżki";
					}			
					if (LANG.includes("fr")) {
						return "Promotions";
					}	
					if (LANG.includes("it")) {
						return "Sconti";
					}	
					if (LANG.includes("CN")) {
						return "折扣优惠";
					}
					if (LANG.includes("TW")) {
						return "折扣優惠";
					}	
					if (LANG.includes("ja")) {
						return "割引";
					}	
					if (LANG.includes("ko")) {
						return "할인";
					}
					else {
						return "Discounts";
					}
				}

        var rdoImage = getrdoParse.data.posts.results[0].preview_images_parsed.newswire_block.d16x9;
        	//console.log(`rdoImage: ${rdoImage}`);			
        var rdoURLHash = getrdoParse.data.posts.results[0].id;
        var rdoURLFull = `https://www.rockstargames.com${langFunction()}${getrdoParse.data.posts.results[0].url}`;
        var fetchRDO = await fetch(`${process.env.rdoGraphURL3}${rdoURLHash}%22%2C%22locale%22%3A%22${LANG}${process.env.rdoGraphURL4}`, {
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

        var rdoPost = "";
        var rdoJSON01 = await fetchRDO.json();
        var rdoJSON = JSON.stringify(rdoJSON01);
        var rdoParse = JSON.parse(rdoJSON);
            //console.log(`rdoJSON: \n\n${rdoJSON}\n\n`);

        var rdoMainTitle = rdoParse.data.post.title
        var rdoSubTitle = rdoParse.data.post.subtitle;
        var rdoDate = rdoParse.data.post.created_formatted;
            //console.log(`rdoTitle: ${rdoTitle}\nrdoSubTitle: ${rdoSubTitle}\nrdoDate: ${rdoDate}`);
        var thisBonus = Math.round((thisBonus01) / 1000) + 21600; // plus 6 hours
        var nextBonus = Math.round((nextBonus01) / 1000) - 54060; // minus 15.016 hours
            // console.log(`thisBonus01: ${thisBonus01} - nextBonus01: ${nextBonus01}`);
            // console.log(`thisBonus: ${thisBonus} - nextBonus: ${nextBonus}`);
        rdoPost += `¶¶t:${thisBonus}:D∞∞ - ¶¶t:${nextBonus}:D∞∞\n\n• ${rdoSubTitle}\n\n`;

        var allBonuses = rdoParse.data.post.tina.variables.keys;
        var rdoBonus = Object.values(allBonuses);

				var rdoDiscountPercent = [`-10 ${gold()}`, "-30%", "-30%", "-40%", "-35%", "-40%", "-30%", "-40%", "-40%", "-30%"]; //FIXME next month
				var discountElementCount = 0;

        //START Populating rdoPost
        for (var i = 2; i <= rdoBonus.length - 1; i++) { //first bonus is the subtitle
					    //console.log(`${JSON.stringify(rdoBonus[k])}\n\n`);
						var noBonusArray = ["1.5X", "1.5x", "1,5X", "1,5x", "2X", "2x", "2.5X", "2.5x", "2,5X", "2,5x", "3X", "3x", "4X", "4x", "40%", "40 %", "50%", "50 %", "Double", "Doble", "RDO$"];
						if (rdoBonus[i].text !== undefined) {
								rdoPost += `\n**${rdoBonus[i].text}**\n`;
						}
						if (rdoBonus[i].content !== undefined) {
								rdoPost += `• ${rdoBonus[i].content}\n`;
						}
						if ((rdoBonus[i].title !== undefined) && ((rdoBonus[i].description !== undefined) || (rdoBonus[i].subtitle !== undefined))) { //adds a title if not a discount
								rdoPost += `\n**${rdoBonus[i].title}**\n`;
						}
						if ((rdoBonus[i].title !== undefined) && ((rdoBonus[i].description === undefined) && (rdoBonus[i].subtitle === undefined))) {		
								if (discountElementCount === 0) {
									rdoPost += `\n**${discounts()}**\n`;
								}
								rdoPost += `${rdoDiscountPercent[discountElementCount]}: ${rdoBonus[i].title}\n`;
								discountElementCount++;
						}
						if (rdoBonus[i].description !== undefined) {
								if (rdoBonus[i].title !== undefined) { //do not add the description if 2x, 3x, 4x, etc... bonus
									var joinTitle = rdoBonus[i].title.split(" ")[0]; //first word of title
									if (noBonusArray.indexOf(joinTitle) >= 0) {
										i++;
									}
									else {
										rdoPost += `• ${rdoBonus[i].description}\n`;
									}
								} 
								else {
									rdoPost += `• ${rdoBonus[i].description}\n`;
								}
						}
        }
        //END for loop

        function replaceLinks() {
            var rdoLinks = /<a href=\".*?<\/a>/g;
            for (const match of rdoPost.matchAll(rdoLinks)) {
                //console.log(match[0]);
                var rdoLinkURL2 = match[0].toString().split("href=\"");
								for (var j = 0; j <= rdoLinkURL2.length - 1; j++) { //iterates through all the links
									var rdoLinkURL1 = rdoLinkURL2[j].split("\">");
									if (rdoLinkURL1[1] !== undefined) {
										var rdoLinkTitle1 = rdoLinkURL1[1].split("<");
										var rdoLinkTitle = rdoLinkTitle1[0];
										var rdoLinkURL = rdoLinkURL1[0];
											//console.log(`match[0]: ${match[0]} - rdoLinkTitle: ${rdoLinkTitle} - rdoLinkURL: ${rdoLinkURL}`);
											rdoPost = rdoPost.replace(match[0], `[${rdoLinkTitle}](${rdoLinkURL})`);
									}
								}
            }
        }
				replaceLinks();

        var rdoReGex = /<.*?>/g;
        var rdoFinalString = rdoPost
						.replace(/<br><br>/g, "\n• ") //adds a bullet for additional paragraphs
            .replace(/<li>/g, "\n• ") //adds a bullet point to list items
            .replace(/<h3>/g, "\n\n**") //adds a newline for missed titles
            .replace(/<\/h3>/g, "**\n• ") //adds a newline for missed titles
            .replace(rdoReGex, "") //removes all remaining HTML
            .replace(/\¶\¶/g, "<") //creates timestamps for thisBonus && nextBonus
            .replace(/\∞\∞/g, ">")//creates timestamps for thisBonus && nextBonus
						.replace(/• \n/g, "") //removes extra bullet points
            .replace(/\n\n\n/g, "\n\n") //removes excess newlines

        //console.log(rdoFinalString);

        var constChars = (rdoMainTitle.length);
        function ellipsisFunction() {
            if (rdoFinalString.length >= (4000 - constChars)) {
                return "...";
            } else {
                return "";
            }
        }
        function ellipsisFunction2() {
            if (rdoFinalString.length >= (6000 - constChars - rdoImage.length)) {
                return "...\n";
            } else {
                return "";
            }
        }
				function footerText() {
					if (LANG.includes("en")) {
							return `\n** [More details](${rdoURLFull})**`;
					}
					else if (LANG.includes("es")) {
							return `\n** [Más detalles](${rdoURLFull})**`;
					}
					else if (LANG.includes("pt")) {
							return `\n** [Mais detalhes](${rdoURLFull})**`;
					}						
					else if (LANG.includes("ru")) {
							return `\n** [Подробнее](${rdoURLFull})**`;
					}
					else if (LANG.includes("de")) {
							return `\n** [Mehr Details](${rdoURLFull})**`;
					}
					else if (LANG.includes("pl")) {
							return `\n** [Więcej szczegółów](${rdoURLFull})**`;
					}
					else if (LANG.includes("fr")) {
							return `\n** [Plus de détails](${rdoURLFull})**`;
					}
					else if (LANG.includes("it")) {
							return `\n** [Più dettagli](${rdoURLFull})**`;
					}
					else if (LANG.includes("CN")) {
							return `\n** [更多细节](${rdoURLFull})**`;
					}
					else if (LANG.includes("TW")) {
							return `\n** [更多細節](${rdoURLFull})**`;
					}
					else if (LANG.includes("ja")) {
							return `\n** [자세한 내용은](${rdoURLFull})**`;
					}
					else if (LANG.includes("ko")) {
							return `\n** [詳細](${rdoURLFull})**`;
					}
					else {
							return `\n** [More Details](${rdoURLFull})**`;
					}					
				}			
        function rdoFooterMin() {
            if (rdoFinalString.length < (4000 - constChars)) {
                return footerText();
            } else {
                return "";
            }
        }
        function rdoFooterMax() {
            if (rdoFinalString.length >= (4000 - constChars)) {
                return footerText();
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

        var constChars1 = (rdoFooterMax().length) + (ellipsisFunction().length) + (ellipsisFunction2().length) + rdoImage.length;
        var rdoNewlines1 = rdoFinalString.substr(bestBreak(), (6000 - constChars - constChars1 - bestBreak())).split("\n");
        var tempString1 = rdoNewlines1[rdoNewlines1.length - 1];
        function bestEndBreak() {
            if (rdoFinalString.length <= (6000 - constChars - constChars1)) {
                return rdoFinalString.length;
            }
            return (6000 - bestBreak() - constChars - constChars1 - tempString1.length); //removes the last bonus if over 6000 chars
        }
        //console.log(`bestEndBreak:${bestEndBreak()}`);

        rdoPost = rdoFinalString.slice(0, (bestBreak()));
        //console.log(`rdoPost.length:${rdoPost.length || 0}`);
        function rdoPost2() {
            if (rdoPost.length < rdoFinalString.length) {
                let post02 = rdoFinalString.substr((bestBreak()), (bestEndBreak()));
                return post02;
            } else {
                return "";
            }
        }
        //console.log(`rdoPost2().length:${rdoPost2().length || 0}`);

        let rdoEmbed = new EmbedBuilder()
            .setColor(0xC10000) //Red
            .setTitle(`${rdoMainTitle}`)
            .setDescription(`${rdoPost}${rdoFooterMin()}${ellipsisFunction()}`)
        let rdoEmbed2 = new EmbedBuilder()
            .setColor(0xC10000) //Red
            .setDescription(`${ellipsisFunction()} \n${rdoPost2()} ${ellipsisFunction2()}${rdoFooterMax()}`)
        let rdoImageEmbed = new EmbedBuilder()
            .setColor(0xC10000) //Red
            .setImage(`${rdoImage}`);

        //console.log(`rdoFinal.l: ${rdoFinal.length}`);

        let errorEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`Uh Oh!`)
            .setDescription(`There was an error while executing this command!\nThe error has been sent to the developer and will be fixed as soon as possible.\nPlease try again in a few minutes.\n\nIf the problem persists you can try [re-inviting the bot](<${process.env.invite_link}>) or \nYou can report it in the [Rockstar Weekly Support Server](<${process.env.support_link}>)`);    

        if (rdoPost2() === "") {
            await interaction.editReply({ embeds: [rdoImageEmbed, rdoEmbed] }).catch(err =>
                interaction.editReply({ embeds: [errorEmbed], ephemeral: true }).then(
                    console.log(`There was an error! \nUser:${interaction.user.tag} - ${interaction} \nError: ${err.stack}`))
            );
        } else {
            await interaction.editReply({ embeds: [rdoImageEmbed, rdoEmbed, rdoEmbed2] }).catch(err =>
                interaction.editReply({ embeds: [errorEmbed], ephemeral: true }).then(
                    console.log(`There was an error! \nUser:${interaction.user.tag} - ${interaction} \nError: ${err.stack}`))
            );
        }

        var endTime = performance.now();
        //await interaction.editReply(`Pong! (${endTime - startTime})`);
    },
}