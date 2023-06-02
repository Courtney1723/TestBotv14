const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isStringSelectMenu()) { return };
        if ((interaction.customId.startsWith(`gtaStartMenu -`)) || (interaction.customId.startsWith(`gtaStartMenu2 -`))) {
            //console.log(`begin gtaStartMenu: '${interaction.customId}'`);		

            let startMenu2 = "";
            if (interaction.customId.startsWith(`gtaStartMenu2`)) {
                startMenu2 += "2";
            }

            let menuUserID02 = (interaction.customId).split(`gtaStartMenu${startMenu2} - u:`);
            let menuUserID01 = menuUserID02[1].split(" -");
            let menuUserID = menuUserID01[0];
            //console.log(`gtaStartMenu menuUserID: ${menuUserID}`);
            //console.log(`gtaStartMenu interaction.user.id === menuUserID?: ${interaction.user.id === menuUserID}`)	

            let menuChannelID01 = (interaction.values).toString().split(`c:`);
            let menuChannelID = menuChannelID01[1];
            //console.log(`gtaStartMenu menuChannelID: ${menuChannelID}`)		

            //-----BEGIN TRANSLATIONS-----//			

            var lang = await LANG.LANG(interaction);
            //console.log(`LANG:${await LANG.LANG(interaction)}`);		

            function notYourOption() {
                if (lang === "en") {
                    return `These options aren't for you.`;
                }
                else if (lang === "es") {
                    return `Estas opciones no son para ti.`;
                }
                else if (lang === "pt") {
                    return `Essas opções não são para você.`;
                }
                else if (lang === "ru") {
                    return `Эти варианты не для вас.`;
                }
                else if (lang === "de") {
                    return `Diese Optionen sind nichts für Sie.`;
                }
                else if (lang === "pl") {
                    return `Te opcje nie są dla Ciebie.`;
                }
                else if (lang === "fr") {
                    return `Ces options ne sont pas pour vous.`;
                }
                else if (lang === "it") {
                    return `Queste opzioni non fanno per te.`;
                }
                else if (lang === "zh") {
                    return `這些選項不適合您。`;
                }
                else if (lang === "ja") {
                    return `これらのオプションはあなたのためではありません。`;
                }
                else if (lang === "ko") {
                    return `이러한 옵션은 귀하를 위한 것이 아닙니다.`;
                }
                else {
                    return `These options aren't for you.`;
                }
            }

            function success() {
                if (lang === "en") {
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

            function gtaAddDesc() {
                if (lang === "en") {
                    return `You will now get GTA Online auto posts to the <#${menuChannelID}> channel \n**every Thursday at 5:00 PM EST**.`;
                }
                else if (lang === "es") {
                    return `Ahora recibirás publicaciones automáticas de GTA Online en el canal <#${menuChannelID}> \n** todos los jueves a las 17:00 hora del este**.`;
                }
                else if (lang === "pt") {
                    return `Agora você receberá postagens automáticas de GTA Online no canal <#${menuChannelID}> \n**todas as quintas-feiras às 17:00 Hora do Leste**.`;
                }
                else if (lang === "ru") {
                    return `Теперь вы будете получать автоматические сообщения GTA Online на <#${menuChannelID}> канале \n**каждый четверг в 17:00 по восточному времени**.`;
                }
                else if (lang === "de") {
                    return `Sie erhalten jetzt GTA Online Auto-Posts auf dem <#${menuChannelID}>-Kanal \n**jeden Donnerstag um 17:00 Uhr Ostküsten-Standardzeit (Nordamerika)**.`;
                }
                else if (lang === "pl") {
                    return `Będziesz teraz otrzymywać automatyczne wiadomości GTA Online na kanale <#${menuChannelID}> \n**w każdy czwartek o 17:00 czasu wschodniego**.`;
                }
                else if (lang === "fr") {
                    return `Vous recevrez désormais des messages automatisés pour GTA Online dans le canal <#${menuChannelID}> \n**tous les jeudis à 14h00, heure de l'Est**.`;
                }
                else if (lang === "it") {
                    return `Ora riceverai messaggi automatici di GTA Online nel canale <#${menuChannelID}> \n**ogni giovedì alle 17:00 ora di New York**.`;
                }
                else if (lang === "zh") {
                    return `現在東部時間每週四 17:00，您將在 <#${menuChannelID}> 頻道收到 GTA 在線模式消息。`;
                }
                else if (lang === "ja") {
                    return `<#${menuChannelID}> チャンネルで、毎週木曜日の東部標準時の 17:00 に GTA オンライン メッセージを受け取るようになりました。`;
                }
                else if (lang === "ko") {
                    return `이제 <#${menuChannelID}> 채널에 \n**매주 목요일 17:00 동부 시간**에 GTA 온라인 자동 게시를 받게 됩니다.`;
                }
                else {
                    return `You will now get GTA Online auto posts to the <#${menuChannelID}> channel \n**every Thursday at 5:00 PM EST**.`;
                }
            }

            function confirmSettingsString() {
                if (lang === "en") {
                    return `Confirm Settings`;
                }
                else if (lang === "es") {
                    return `Confirmar la configuración`;
                }
                else if (lang === "pt") {
                    return `Confirmar configurações`;
                }
                else if (lang === "ru") {
                    return `Подтвердить настройки`;
                }
                else if (lang === "de") {
                    return `Einstellungen bestätigen`;
                }
                else if (lang === "pl") {
                    return `Potwierdź ustawienia`;
                }
                else if (lang === "fr") {
                    return `Confirmer les paramètres`;
                }
                else if (lang === "it") {
                    return `Conferma impostazioni`;
                }
                else if (lang === "zh") {
                    return `確認設置`;
                }
                else if (lang === "ja") {
                    return `設定を確認する`;
                }
                else if (lang === "ko") {
                    return `설정 확인`;
                }
                else {
                    return `Confirm Settings`;
                }
            }

            function notYourOption() {
                if (lang === "en") {
                    return `These options aren't for you.`;
                }
                else if (lang === "es") {
                    return `Estas opciones no son para ti.`;
                }
                else if (lang === "pt") {
                    return `Essas opções não são para você.`;
                }
                else if (lang === "ru") {
                    return `Эти варианты не для вас.`;
                }
                else if (lang === "de") {
                    return `Diese Optionen sind nichts für Sie.`;
                }
                else if (lang === "pl") {
                    return `Te opcje nie są dla Ciebie.`;
                }
                else if (lang === "fr") {
                    return `Ces options ne sont pas pour vous.`;
                }
                else if (lang === "it") {
                    return `Queste opzioni non fanno per te.`;
                }
                else if (lang === "zh") {
                    return `這些選項不適合您。`;
                }
                else if (lang === "ja") {
                    return `これらのオプションはあなたのためではありません。`;
                }
                else if (lang === "ko") {
                    return `이러한 옵션은 귀하를 위한 것이 아닙니다.`;
                }
                else {
                    return `These options aren't for you.`;
                }
            }

            function duplicateTitle() {
                if (lang === "en") {
                    return `Please Try Again`;
                }
                else if (lang === "es") {
                    return `Por favor, inténtalo de nuevo`;
                }
                else if (lang === "pt") {
                    return `Por favor, tente novamente`;
                }
                else if (lang === "ru") {
                    return `Пожалуйста, попробуйте еще раз`;
                }
                else if (lang === "de") {
                    return `Inténtalo de nuevo`;
                }
                else if (lang === "pl") {
                    return `Proszę spróbuj ponownie`;
                }
                else if (lang === "fr") {
                    return `Veuillez réessayer`;
                }
                else if (lang === "it") {
                    return `Per favore riprova`;
                }
                else if (lang === "zh") {
                    return `請再試一次`;
                }
                else if (lang === "ja") {
                    return `もう一度お試しください`;
                }
                else if (lang === "ko") {
                    return `다시 시도해 주세요`;
                }
                else {
                    return `Please Try Again`;
                }
            }

            function invalidResponse() {
                if (lang === "en") {
                    return `You selected an invalid response.`;
                }
                else if (lang === "es") {
                    return `Seleccionó una respuesta no válida.`;
                }
                else if (lang === "pt") {
                    return `Você selecionou uma resposta inválida.`;
                }
                else if (lang === "ru") {
                    return `Вы выбрали неправильный ответ.`;
                }
                else if (lang === "de") {
                    return `Sie haben eine ungültige Antwort ausgewählt.`;
                }
                else if (lang === "pl") {
                    return `Wybrałeś nieprawidłową odpowiedź.`;
                }
                else if (lang === "fr") {
                    return `Vous avez sélectionné une réponse invalide.`;
                }
                else if (lang === "it") {
                    return `Hai selezionato una risposta non valida.`;
                }
                else if (lang === "zh") {
                    return `您選擇了無效的回复。`;
                }
                else if (lang === "ja") {
                    return `無効な応答を選択しました。`;
                }
                else if (lang === "ko") {
                    return `잘못된 응답을 선택했습니다.`;
                }
                else {
                    return `You selected an invalid response.`;
                }
            }

            //-----END TRASLATIONS-----//					

            if (interaction.user.id != menuUserID) {
                interaction.reply({ content: `${notYourOption()}`, ephemeral: true });
            }
            else if (menuChannelID.includes(`undefinedchannel`)) {

                const gtaDuplicateEmbed = new EmbedBuilder()
                    .setColor(0xFFAE00) //orange 
                    .setTitle(`${duplicateTitle()}`)
                    .setDescription(`${invalidResponse()} || (◕ᴥ◕ʋ) ||`)

                await interaction.deferUpdate();
                if (interaction.user.id === menuUserID) {
                    await interaction.followUp({ embeds: [gtaDuplicateEmbed], components: [], ephemeral: true })
                        .catch(err => console.log(`gtaDuplicateEmbed Error: ${err}`));
                } else {
                    interaction.followUp({ content: `${notYourOption()}`, ephemeral: true });
                }

            }
            else { //add new channel to GTADataBase.txt

                const gtaConfirmEmbed = new EmbedBuilder()
                    .setColor(0x00FF00) //Green 
                    .setTitle(`${success()}`)
                    .setDescription(`${gtaAddDesc()}`)

                const confirmSettingsButton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`initialback - ${interaction.user.id}`)
                            .setLabel(`${confirmSettingsString()}`)
                            .setStyle(ButtonStyle.Secondary),
                    );

                await interaction.deferUpdate();
                if (interaction.user.id === menuUserID) {

                    //Appends the GTADataBase.txt file with guildID, Channel ID, and choice of gta of gta
                    fs.appendFile(`./GTADataBase.txt`, `guild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:gtaStartMenu - \n`, async err => {
                        if (err) {
                            console.error(err.stack);
                            return
                        }
                        else {
                            await interaction.editReply({ embeds: [gtaConfirmEmbed], components: [confirmSettingsButton] })
                                .catch(err => console.log(`gtaConfirmEmbed Error: ${err.stack}`));

                            if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
                                console.log(`You added a channel for GTA Online auto posts.`);
                            }
                            else {
                                if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
                                    console.log(`You added ${menuChannelID} for GTA Online auto posts.`)
                                } else {
                                    console.log(`A user added ${menuChannelID} for GTA Online auto posts in ${interaction.guild.id}.`);
                                }
                            }
                        }

                    }); // end fs:appendFile to add a channel for gta autop posts	

                } else {
                    await interaction.followUp({ content: `${notYourOption()}`, ephemeral: true });
                }

            } //end add new channel

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


        }// end if interaction.customId === 'gtaStartMenu'


    },
};