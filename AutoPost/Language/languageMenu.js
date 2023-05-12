const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG01 = require('../../events/LANG.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isStringSelectMenu()) { return };
        if (interaction.customId.startsWith(`languageMenu -`)) {
            await interaction.deferUpdate();

            //stored language
            var lang = await LANG01.LANG(interaction);
            //console.log(`LANG:${await LANG.LANG(interaction)}`);		

            //user language
            var LANG02 = interaction.locale.toString().split("-");
            var LANG = LANG02[0];
            //console.log(`lang:${lang}`);	

            //chosen language
            var chosenLang01 = (interaction.values).toString().split("lang:");
            var chosenLang = chosenLang01[1];
            //console.log(`chosenLang: ${chosenLang}`);

            let menuUserID02 = interaction.customId.split(`u:`);
            let menuUserID01 = menuUserID02[1].split(" -");
            let menuUserID = menuUserID01[0];
            //console.log(`languageMenu menuUserID: ${menuUserID}`);					

            function duplicateTitle() {
                if (LANG === "en") {
                    return `Please Try Again`;
                }
                else if (LANG === "es") {
                    return `Por favor, inténtalo de nuevo`;
                }
                else if (LANG === "pt") {
                    return `Por favor, tente novamente`;
                }
                else if (LANG === "ru") {
                    return `Пожалуйста, попробуйте еще раз`;
                }
                else if (LANG === "de") {
                    return `Inténtalo de nuevo`;
                }
                else if (LANG === "pl") {
                    return `Proszę spróbuj ponownie`;
                }
                else if (LANG === "fr") {
                    return `Veuillez réessayer`;
                }
                else if (LANG === "it") {
                    return `Per favore riprova`;
                }
                else if (LANG === "zh") {
                    return `請再試一次`;
                }
                else if (LANG === "ja") {
                    return `もう一度お試しください`;
                }
                else if (LANG === "ko") {
                    return `다시 시도해 주세요`;
                }
                else {
                    return `Please Try Again`;
                }
            }					

            function invalidResponse() {
                if (LANG === "en") {
                    return `You selected an invalid response.`;
                }
                else if (LANG === "es") {
                    return `Seleccionó una respuesta no válida.`;
                }
                else if (LANG === "pt") {
                    return `Você selecionou uma resposta inválida.`;
                }
                else if (LANG === "ru") {
                    return `Вы выбрали неправильный ответ.`;
                }
                else if (LANG === "de") {
                    return `Sie haben eine ungültige Antwort ausgewählt.`;
                }
                else if (LANG === "pl") {
                    return `Wybrałeś nieprawidłową odpowiedź.`;
                }
                else if (LANG === "fr") {
                    return `Vous avez sélectionné une réponse invalide.`;
                }
                else if (LANG === "it") {
                    return `Hai selezionato una risposta non valida.`;
                }
                else if (LANG === "zh") {
                    return `您選擇了無效的回复。`;
                }
                else if (LANG === "ja") {
                    return `無効な応答を選択しました。`;
                }
                else if (LANG === "ko") {
                    return `잘못된 응답을 선택했습니다.`;
                }
                else {
                    return `You selected an invalid response.`;
                }
            }					

            function notYourOption() {
                if (LANG === "en") {
                    return `These options aren't for you.`;
                }
                else if (LANG === "es") {
                    return `Estas opciones no son para ti.`;
                }
                else if (LANG === "pt") {
                    return `Essas opções não são para você.`;
                }
                else if (LANG === "ru") {
                    return `Эти варианты не для вас.`;
                }
                else if (LANG === "de") {
                    return `Diese Optionen sind nichts für Sie.`;
                }
                else if (LANG === "pl") {
                    return `Te opcje nie są dla Ciebie.`;
                }
                else if (LANG === "fr") {
                    return `Ces options ne sont pas pour vous.`;
                }
                else if (LANG === "it") {
                    return `Queste opzioni non fanno per te.`;
                }
                else if (LANG === "zh") {
                    return `這些選項不適合您。`;
                }
                else if (LANG === "ja") {
                    return `これらのオプションはあなたのためではありません。`;
                }
                else if (LANG === "ko") {
                    return `이러한 옵션은 귀하를 위한 것이 아닙니다.`;
                }
                else {
                    return `These options aren't for you.`;
                }
            }					

            if (chosenLang.includes(`undefined`)) { 

                const langDuplicateEmbed = new EmbedBuilder()
                    .setColor(0xFFAE00) //Orange 
                    .setTitle(`${duplicateTitle()}`)
                    .setDescription(`${invalidResponse()} || ʕっ•ᴥ•ʔっ ||`)

                if (interaction.user.id === menuUserID) {
                    await interaction.followUp({ embeds: [langDuplicateEmbed], components: [], ephemeral: true })
                        .catch(err => console.log(`langDuplicateEmbed Error: ${err}`));
                } else {
                    interaction.followUp({ content: `${notYourOption()}`, ephemeral: true });
                }

            }		
						else {

            function success() {
                if (chosenLang === "en") {
                    return `Success`;
                }
                else if (chosenLang === "es") {
                    return `Éxito`;
                }
                else if (chosenLang === "pt") {
                    return `Éxito`;
                }
                else if (chosenLang === "ru") {
                    return `Успех`;
                }
                else if (chosenLang === "de") {
                    return `Erfolg`;
                }
                else if (chosenLang === "pl") {
                    return `Powodzenie`;
                }
                else if (chosenLang === "fr") {
                    return `Succès`;
                }
                else if (chosenLang === "it") {
                    return `Successo`;
                }
                else if (chosenLang === "zh") {
                    return `成功`;
                }
                else if (chosenLang === "ja") {
                    return `成功`;
                }
                else if (chosenLang === "ko") {
                    return `성공`;
                }
                else {
                    return `Success`;
                }
            }

            function languageChangeDesc() {
                if (chosenLang === "en") {
                    return `The language for this server has been changed to English.`;
                }
                if (chosenLang === "es") {
                    return `El idioma de este servidor se ha cambiado al español.`;
                }
                if (chosenLang === "pt") {
                    return `O idioma deste servidor foi alterado para português.`;
                }
                if (chosenLang === "ru") {
                    return `Язык для этого сервера изменен на русский.`;
                }
                if (chosenLang === "de") {
                    return `Die Sprache für diesen Server wurde auf Deutsch umgestellt.`;
                }
                if (chosenLang === "pl") {
                    return `Język tego serwera został zmieniony na polski.`;
                }
                if (chosenLang === "fr") {
                    return `La langue de ce serveur a été changée en français.`;
                }
                if (chosenLang === "it") {
                    return `La lingua per questo server è stata modificata in francese.`;
                }
                if (chosenLang === "zh") {
                    return `此服務器的語言已更改為中文（繁體）。`;
                }
                if (chosenLang === "ja") {
                    return `このサーバーの言語は日本語に変更されました。`;
                }
                if (chosenLang === "ko") {
                    return `이 서버의 언어가 한국어로 변경되었습니다.`;
                }
                else {
                    return `The language for this server has been changed to English.`;
                }
            }

            function missingInfo() {
                if (chosenLang === "en") {
                    return "_ _";
                }
                if (chosenLang === "es") {
                    return `El idioma predeterminado es el inglés. Es posible que falte alguna información o que esté mal traducida.`;
                }
                if (chosenLang === "pt") {
                    return `O idioma padrão para este bot é o inglês. Algumas informações podem estar faltando ou mal traduzidas.`;
                }
                if (chosenLang === "ru") {
                    return `Язык по умолчанию для этого бота — английский. Некоторая информация может отсутствовать или быть неправильно переведена.`;
                }
                if (chosenLang === "de") {
                    return `Die Standardsprache für diesen Bot ist Englisch. Einige Informationen können fehlen oder falsch übersetzt werden.`;
                }
                if (chosenLang === "pl") {
                    return `Domyślnym językiem tego bota jest angielski. Niektórych informacji może brakować lub mogą być błędnie przetłumaczone.`;
                }
                if (chosenLang === "fr") {
                    return `La langue par défaut pour ce bot est l'anglais. Certaines informations peuvent être manquantes ou mal traduites.`;
                }
                if (chosenLang === "it") {
                    return `La lingua predefinita per questo bot è l'inglese. Alcune informazioni potrebbero essere mancanti o tradotte male.`;
                }
                if (chosenLang === "zh") {
                    return `此機器人的默認語言是英語。某些信息可能丟失或翻譯錯誤。`;
                }
                if (chosenLang === "ja") {
                    return `このボットのデフォルト言語は英語です。一部の情報が欠落しているか、誤訳されている可能性があります。`;
                }
                if (chosenLang === "ko") {
                    return `이 봇의 기본 언어는 영어입니다. 일부 정보가 누락되었거나 잘못 번역되었을 수 있습니다.`;
                }
                else {
                    return "_ _";
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


            //END TRANSLATIONS				

            if (interaction.user.id !== menuUserID) {
                await interaction.followUp({ content: `${notYourOption()}`, ephemeral: true });
                return;
            }
            else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                await interaction.followUp({ content: `${missingPermissions()}`, ephemeral: true });
                return;
            }

            const languageEmbed = new EmbedBuilder()
                .setColor(0x0FFF00) //Green
                .setTitle(`${success()}`)
                .setDescription(`${languageChangeDesc()}`)
                .setFooter({ text: `${missingInfo()}`, iconURL: process.env.logo_link });

            const languageEmbedEn = new EmbedBuilder()
                .setColor(0x0FFF00) //Green
                .setTitle(`Success!`)
                .setDescription(`${languageChangeDesc()}`)

            if (lang === "") {
                fs.appendFile(`./LANGDataBase.txt`, `guild:${interaction.guild.id} - lang:${chosenLang} - \n`, err => {
                    if (err) {
                        console.error(err);
                        throw err;
                    }
                    else {
                        interaction.editReply({ embeds: [languageEmbed], components: [] })
                            .catch(err => console.log(`languageMenuEmbed Error: ${err.stack}`));
                        if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
                            console.log(`You added ${chosenLang} as the server language in ${interaction.guild.id}.`);
                        }
                        else {
                            console.log(`A user added ${chosenLang} as the server language in ${interaction.guild.id}.`);
                        }
                    }
                }); // end fs:appendFile to add server language to spanish				
            }
            else if (chosenLang !== "en") {
                fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
                    if (err) { console.log(`Error: ${err}`) }
                    else {
                        fs.writeFile('./LANGDataBase.txt', `${data.replace(`guild:${interaction.guild.id} - lang:${lang} - `, `guild:${interaction.guild.id} - lang:${chosenLang} - `)}`, function (err) {
                            if (err) throw err;
                            interaction.editReply({ embeds: [languageEmbed], components: [] })
                                .catch(err => console.log(`languageMenuEmbed Error: ${err.stack}`));
                            if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
                                console.log(`You changed the server language to ${chosenLang}.`);
                            }
                            else {
                                console.log(`A user changed the server language to ${chosenLang}.`);
                            }
                        }); //end fs:writeFile to change server language to spanish	
                    }
                }); //end fs.readFile for LANGDataBase.txt				
            }
            else if (chosenLang === "en") { //remove language if English
                fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
                    if (err) { console.log(`Error: ${err}`) }
                    else {
                        fs.writeFile('./LANGDataBase.txt', `${data.replace(`guild:${interaction.guild.id} - lang:${lang} - \n`, "")}`, function (err) {
                            if (err) throw err;
                            interaction.editReply({ embeds: [languageEmbedEn], components: [] })
                                .catch(err => console.log(`languageMenuEmbed Error: ${err.stack}`));
                            if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
                                console.log(`You changed the server language to English in ${interaction.guild.id}.`);
                            }
                            else {
                                console.log(`A user changed the server language to English in ${interaction.guild.id}.`);
                            }
                        }); //end fs:writeFile to change server language to spanish	
                    }
                }); //end fs.readFile for LANGDataBase.txt						
            }

				}

        } // end if languageMenu button


    },
};