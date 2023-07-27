const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
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
            	//console.log(`Server lang: ${lang}`);

            //user language
            var LANG = interaction.locale.toString();
            	//console.log(`User LANG:${LANG}`);	

            //chosen language
            var chosenLang01 = (interaction.values).toString().split("lang:");
            var chosenLang = chosenLang01[1];
            //console.log(`chosenLang: ${chosenLang}`);

            let menuUserID02 = interaction.customId.split(`u:`);
            let menuUserID01 = menuUserID02[1].split(" -");
            let menuUserID = menuUserID01[0];
            //console.log(`languageMenu menuUserID: ${menuUserID}`);					

            function duplicateTitle() {
                if (LANG.includes("en")) {
                    return `Please Try Again`;
                }
                else if (LANG.includes("es")) {
                    return `Por favor, inténtalo de nuevo`;
                }
                else if (LANG.includes("pt")) {
                    return `Por favor, tente novamente`;
                }
                else if (LANG.includes("ru")) {
                    return `Пожалуйста, попробуйте еще раз`;
                }
                else if (LANG.includes("de")) {
                    return `Inténtalo de nuevo`;
                }
                else if (LANG.includes("pl")) {
                    return `Proszę spróbuj ponownie`;
                }
                else if (LANG.includes("fr")) {
                    return `Veuillez réessayer`;
                }
                else if (LANG.includes("it")) {
                    return `Per favore riprova`;
                }
                else if (LANG.includes("CN")) {
                    return `请再试一次`;
                }									
                else if (LANG.includes("TW")) {
                    return `請再試一次`;
                }
                else if (LANG.includes("ja")) {
                    return `もう一度お試しください`;
                }
                else if (LANG.includes("ko")) {
                    return `다시 시도해 주세요`;
                }
                else {
                    return `Please Try Again`;
                }
            }					

            function invalidResponse() {
                if (LANG.includes("en")) {
                    return `You selected an invalid response.`;
                }
                else if (LANG.includes("es")) {
                    return `Seleccionó una respuesta no válida.`;
                }
                else if (LANG.includes("pt")) {
                    return `Você selecionou uma resposta inválida.`;
                }
                else if (LANG.includes("ru")) {
                    return `Вы выбрали неправильный ответ.`;
                }
                else if (LANG.includes("de")) {
                    return `Sie haben eine ungültige Antwort ausgewählt.`;
                }
                else if (LANG.includes("pl")) {
                    return `Wybrałeś nieprawidłową odpowiedź.`;
                }
                else if (LANG.includes("fr")) {
                    return `Vous avez sélectionné une réponse invalide.`;
                }
                else if (LANG.includes("it")) {
                    return `Hai selezionato una risposta non valida.`;
                }
                else if (LANG.includes("CN")) {
                    return `您选择了无效的回复。`;
                }									
                else if (LANG.includes("TW")) {
                    return `您選擇了無效的回复。`;
                }
                else if (LANG.includes("ja")) {
                    return `無効な応答を選択しました。`;
                }
                else if (LANG.includes("ko")) {
                    return `잘못된 응답을 선택했습니다.`;
                }
                else {
                    return `You selected an invalid response.`;
                }
            }					

            function notYourOption() {
                if (LANG.includes("en")) {
                    return `These options aren't for you.`;
                }
                else if (LANG.includes("es")) {
                    return `Estas opciones no son para ti.`;
                }
                else if (LANG.includes("pt")) {
                    return `Essas opções não são para você.`;
                }
                else if (LANG.includes("ru")) {
                    return `Эти варианты не для вас.`;
                }
                else if (LANG.includes("de")) {
                    return `Diese Optionen sind nichts für Sie.`;
                }
                else if (LANG.includes("pl")) {
                    return `Te opcje nie są dla Ciebie.`;
                }
                else if (LANG.includes("fr")) {
                    return `Ces options ne sont pas pour vous.`;
                }
                else if (LANG.includes("it")) {
                    return `Queste opzioni non fanno per te.`;
                }
                else if (LANG.includes("CN")) {
                    return `这些选项不适合您。`;
                }									
                else if (LANG.includes("TW")) {
                    return `這些選項不適合您。`;
                }
                else if (LANG.includes("ja")) {
                    return `これらのオプションはあなたのためではありません。`;
                }
                else if (LANG.includes("ko")) {
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
                else if (chosenLang === "br") {
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
                else if (chosenLang === "tw") {
                    return `成功`;
                }
                else if (chosenLang === "jp") {
                    return `成功`;
                }
                else if (chosenLang === "kr") {
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
                if (chosenLang === "br") {
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
                    return `该服务器的语言已更改为中文（简体）。`;
                }
                if (chosenLang === "tw") {
                    return `此服務器的語言已更改為中文（繁體）。`;
                }							
                if (chosenLang === "jp") {
                    return `このサーバーの言語は日本語に変更されました。`;
                }
                if (chosenLang === "kr") {
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
                if (chosenLang === "br") {
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
                    return `此机器人的默认语言是英语。某些信息可能丢失或翻译错误。`;
                }
								if (chosenLang === "tw") {
									return `此機器人的默認語言是英語。某些信息可能丟失或翻譯錯誤。`;
								}
                if (chosenLang === "jp") {
                    return `このボットのデフォルト言語は英語です。一部の情報が欠落しているか、誤訳されている可能性があります。`;
                }
                if (chosenLang === "kr") {
                    return `이 봇의 기본 언어는 영어입니다. 일부 정보가 누락되었거나 잘못 번역되었을 수 있습니다.`;
                }
                else {
                    return "_ _";
                }
            }

            function missingPermissions() {
                if (LANG.includes("en")) {
                    return `You do not have the required permissions to do that.`;
                }
                else if (LANG.includes("es")) {
                    return `No tienes permiso para hacer eso.`;
                }
                else if (LANG.includes("pt")) {
                    return `Você não tem permissão para fazer isso.`;
                }
                else if (LANG.includes("ru")) {
                    return `У вас нет разрешения на это.`;
                }
                else if (LANG.includes("de")) {
                    return `Sie haben keine Erlaubnis dazu.`;
                }
                else if (LANG.includes("pl")) {
                    return `Nie masz wymaganych uprawnień.`;
                }
                else if (LANG.includes("fr")) {
                    return `Vous ne disposez pas des autorisations requises.`;
                }
                else if (LANG.includes("it")) {
                    return `Non hai le autorizzazioni necessarie.`;
                }
                else if (LANG.includes("CN")) {
                    return `您没有所需的权限。`;
                }
                else if (LANG.includes("TW")) {
                    return `您沒有所需的權限。`;
                }									
                else if (LANG.includes("ja")) {
                    return `必要な権限がありません。`;
                }
                else if (LANG.includes("ko")) {
                    return `필요한 권한이 없습니다.`;
                }
                else {
                    return `You do not have the required permissions to do that.`;
                }
            }

						function tryAuto() {
							if (chosenLang === "en") {
								return `/Autopost`;
							}
							if (chosenLang === "es") {
								return `/publicaciones-automáticas`;
							}
							if (chosenLang === "br") {
								return `/postagens-automáticas`;
							}	
							if (chosenLang === "ru") {
								return `/автопубликации`;
							}	
							if (chosenLang === "de") {
								return `/automatische-veröffentlichung`;
							}	
							if (chosenLang === "pl") {
								return `/zautomatyzowane-wiadomości`;
							}	
							if (chosenLang === "fr") {
								return `/messages-automatisés`;
							}	
							if (chosenLang === "it") {
								return `/messaggi-automatici`;
							}	
							if (chosenLang === "zh") {
								return `/自动消息`;
							}	
							if (chosenLang === "tw") {
								return `/自動消息`;
							}	
							if (chosenLang === "jp") {
								return `/自動メッセージ`;
							}	
							if (chosenLang === "kr") {
								return `/자동화된-메시지`;
							}	
							else {
								return `/Autopost`;
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


		        const tryAutoButton = new ActionRowBuilder()
		            .addComponents(
		                new ButtonBuilder()
		                    .setCustomId(`langback - ${interaction.user.id}`)
		                    .setLabel(`${tryAuto()}`)
		                    .setStyle(ButtonStyle.Secondary)
		            );							

            if (lang === "") {
                fs.appendFile(`./LANGDataBase.txt`, `guild:${interaction.guild.id} - lang:${chosenLang} - \n`, err => {
                    if (err) {
                        console.error(err);
                        throw err;
                    }
                    else {
                        interaction.editReply({ embeds: [languageEmbed], components: [tryAutoButton] })
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
                            interaction.editReply({ embeds: [languageEmbed], components: [tryAutoButton] })
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
                            interaction.editReply({ embeds: [languageEmbedEn], components: [tryAutoButton] })
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

            function expiredDesc() {
                if (lang === "") {
                    return `This interaction expired`;
                }
                if (lang === "es") {
                    return `Esta interacción expiró`;
                }
                if (lang === "br") {
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
                    return `此互动已过期`;
                }
                if (lang === "tw") {
                    return `此互動已過期`;
                }
                if (lang === "jp") {
                    return `このインタラクションの有効期限が切れました`;
                }
                if (lang === "kr") {
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
            }, (60000 * 15))

        } // end if languageMenu button


    },
};