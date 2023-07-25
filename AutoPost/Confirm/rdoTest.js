const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fetch = require("@replit/node-fetch");
const LANG = require('../../events/LANG.js');
const NEXT_BONUS = require("../../events/nextBonus.js");
const THIS_BONUS = require("../../events/thisBonus.js");
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

                        var nextBonus01 = await NEXT_BONUS.nextBonus("rdo");
                        var thisBonus01 = await THIS_BONUS.thisBonus("rdo");
                        // console.log(`next Bonus: <t:${Math.round(nextBonus01 / 1000)}>`);

                        var rdoFetch = await fetch(`${process.env.rdoGraphURL1}${lang}${process.env.rdoGraphURL2}`, {
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
                            if (supportedLanguages.indexOf(lang.substring(0, 2)) < 0) { //unsupported languages are treated as English
                                return "";
                            }
                            if (lang === "en") {
                                return "";
                            }
                            if (lang === "pt") {
                                return "/br";
                            }
                            if (lang === "zh") { //traditional Chinese (Taiwan)
                                return "/tw";
                            }
                            if (lang === "ja") {
                                return "/jp";
                            }
                            if (lang === "ko") {
                                return "/kr";
                            }
                            if (lang.length >= 3) { //languages like "es-ES" or "pt-BR" are returned as "es" or "pt"
                                return `/${lang.substring(0, 2)}`;
                            }
                            else {
                                return `/${lang}`;
                            }
                        }
                        function gold() {
                            if (lang === "en") {
                                return "Gold Bars";
                            }
                            if (lang === "es") {
                                return "lingotes de oro";
                            }
                            if (lang === "pt") {
                                return "Barras de Ouro";
                            }
                            if (lang === "ru") {
                                return "золотых слитков";
                            }
                            if (lang === "de") {
                                return "Goldbarren";
                            }
                            if (lang === "pl") {
                                return "sztabek złota";
                            }
                            if (lang === "fr") {
                                return "lingots d'or";
                            }
                            if (lang === "it") {
                                return "Lingotti d'Oro";
                            }
                            if (lang === "zh") {
                                return "金條";
                            }
                            if (lang === "ja") {
                                return "格のゴールド バー";
                            }
                            if (lang === "ko") {
                                return "금괴";
                            }
                            else {
                                return "Gold Bars";
                            }
                        }
                        function discounts() {
                            if (lang === "en") {
                                return "Discounts";
                            }
                            if (lang === "es") {
                                return "Descuentos";
                            }
                            if (lang === "pt") {
                                return "Descontos";
                            }
                            if (lang === "ru") {
                                return "Скидки";
                            }
                            if (lang === "de") {
                                return "Rabatte";
                            }
                            if (lang === "pl") {
                                return "Zniżki";
                            }
                            if (lang === "fr") {
                                return "Promotions";
                            }
                            if (lang === "it") {
                                return "Sconti";
                            }
                            if (lang === "zh") {
                                return "折扣優惠";
                            }
                            if (lang === "ja") {
                                return "割引";
                            }
                            if (lang === "ko") {
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
                        var fetchRDO = await fetch(`${process.env.rdoGraphURL3}${rdoURLHash}%22%2C%22locale%22%3A%22${lang}${process.env.rdoGraphURL4}`, {
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
                            if (lang === "en") {
                                return `\n** [More details](${rdoURLFull})**`;
                            }
                            else if (lang === "es") {
                                return `\n** [Más detalles](${rdoURLFull})**`;
                            }
                            else if (lang === "pt") {
                                return `\n** [Mais detalhes](${rdoURLFull})**`;
                            }
                            else if (lang === "ru") {
                                return `\n** [Подробнее](${rdoURLFull})**`;
                            }
                            else if (lang === "de") {
                                return `\n** [Mehr Details](${rdoURLFull})**`;
                            }
                            else if (lang === "pl") {
                                return `\n** [Więcej szczegółów](${rdoURLFull})**`;
                            }
                            else if (lang === "fr") {
                                return `\n** [Plus de détails](${rdoURLFull})**`;
                            }
                            else if (lang === "it") {
                                return `\n** [Più dettagli](${rdoURLFull})**`;
                            }
                            else if (lang === "zh") {
                                return `\n** [更多細節](${rdoURLFull})**`;
                            }
                            else if (lang === "ja") {
                                return `\n** [자세한 내용은](${rdoURLFull})**`;
                            }
                            else if (lang === "ko") {
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