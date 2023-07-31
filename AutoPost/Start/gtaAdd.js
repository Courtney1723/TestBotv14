const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');
const NEXT_BONUS = require('../../events/nextBonus.js');
const THIS_BONUS = require('../../events/thisBonus.js');

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

						var thisBONUSGTA = await THIS_BONUS.thisBonus("gta");
						var nextBONUSGTA = await NEXT_BONUS.nextBonus("gta");

						var nowDay = new Date();
						var GTADayOf = thisBONUSGTA.setHours(21, 00, 00); //sets the time to 3:00 PM MTN
						var checkDayOfGTA = GTADayOf - nowDay;
						
						// console.log(`nextBonus: \ngta: ${nextBONUSGTA}`);
						// console.log(`thisBonus: \ngta: ${thisBONUSGTA}`);
						// console.log(`checkDayOfGTA ${checkDayOfGTA}`);

						function thisGtaOrNext() {
							if (checkDayOfGTA > 0) {
								return GTADayOf;
							}
							else {
								return nextBONUSGTA;
							}
						}				

            function notYourOption() {
                if (lang === "") {
                    return `These options aren't for you.`;
                }
                else if (lang === "es") {
                    return `Estas opciones no son para ti.`;
                }
                else if (lang === "br") {
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
                    return `这些选项不适合您。`;
                }
                else if (lang === "tw") {
                    return `這些選項不適合您。`;
                }
                else if (lang === "jp") {
                    return `これらのオプションはあなたのためではありません。`;
                }
                else if (lang === "kr") {
                    return `이러한 옵션은 귀하를 위한 것이 아닙니다.`;
                }
                else {
                    return `These options aren't for you.`;
                }
            }

            function success() {
                if (lang === "") {
                    return `Success`;
                }
                if (lang === "es") {
                    return `Éxito`;
                }
                if (lang === "pt") {
                    return `Éxito`;
                }
                if (lang === "ru") {
                    return `Успех`;
                }
                if (lang === "de") {
                    return `Erfolg`;
                }
                if (lang === "pl") {
                    return `Powodzenie`;
                }
                if (lang === "fr") {
                    return `Succès`;
                }
                if (lang === "it") {
                    return `Successo`;
                }
								if (lang === "zh") {
                    return `成功`;
                }
                if (lang === "tw") {
                    return `成功`;
                }
                if (lang === "ja") {
                    return `成功`;
                }
                if (lang === "kr") {
                    return `성공`;
                }
                else {
                    return `Success`;
                }
            }

            function gtaAddDesc() {
                if (lang === "") {
                    return `You will now get GTA Online auto posts to the <#${menuChannelID}> channel every week. \nNext Update: <t:${Math.round(thisGtaOrNext() / 1000)}:F>.`;
                }
                else if (lang === "es") {
                    return `Ahora recibirá actualizaciones automáticas de GTA Online en el canal <#${menuChannelID}> todas las semanas.\nPróxima actualización: <t:${Math.round(thisGtaOrNext() / 1000)}:F>.`;
                }
                else if (lang === "br") {
                    return `Agora você receberá atualizações automáticas do GTA Online no canal <#${menuChannelID}> toda semana.\n Próxima atualização: <t:${Math.round(thisGtaOrNext() / 1000)}:F>.`;
                }
                else if (lang === "ru") {
                    return `Теперь вы будете получать автоматические обновления GTA Online на канале <#${menuChannelID}> каждую неделю.\nСледующее обновление: <t:${Math.round(thisGtaOrNext() / 1000)}:F>.`;
                }
                else if (lang === "de") {
                    return `Sie erhalten jetzt jede Woche automatische GTA Online-Updates für den <#${menuChannelID}>-Kanal.\nNächstes Update: <t:${Math.round(thisGtaOrNext() / 1000)}:F>.`;
                }
                else if (lang === "pl") {
                    return `Będziesz teraz otrzymywać co tydzień automatyczne aktualizacje GTA Online na kanale <#${menuChannelID}>.\nNastępna aktualizacja: <t:${Math.round(thisGtaOrNext() / 1000)}:F>.`;
                }
                else if (lang === "fr") {
                    return `Vous recevrez désormais des mises à jour automatiques de GTA Online pour la chaîne <#${menuChannelID}> chaque semaine.\nProchaine mise à jour : <t:${Math.round(thisGtaOrNext() / 1000)}:F>.`;
                }
                else if (lang === "it") {
                    return `Ora riceverai aggiornamenti automatici di GTA Online per il canale <#${menuChannelID}> ogni settimana.\n Prossimo aggiornamento: <t:${Math.round(thisGtaOrNext() / 1000)}:F>.`;
                }
								else if (lang === "zh") {
                    return `现在，您每周都会获得 <#${menuChannelID}> 频道的 GTA 在线模式自动更新。 \n下次更新： <t:${Math.round(thisGtaOrNext() / 1000)}:F>`;
                }
                else if (lang === "tw") {
                    return `現在，您每週都會獲得 <#${menuChannelID}> 頻道的 GTA 在線模式自動更新。\n下次更新： <t:${Math.round(thisGtaOrNext() / 1000)}:F>`;
                }
                else if (lang === "jp") {
                    return `「GTA オンライン」では毎週 <#${menuChannelID}> チャンネルの自動アップデートを受け取ることができます。\n次回の更新: <t:${Math.round(thisGtaOrNext() / 1000)}:F>`;
                }
                else if (lang === "kr") {
                    return `이제 매주 <#${menuChannelID}> 채널에 대한 GTA 온라인 자동 업데이트를 받게 됩니다.\n다음 업데이트: <t:${Math.round(thisGtaOrNext() / 1000)}:F>`;
                }
                else {
                    return `You will now get GTA Online auto posts to the <#${menuChannelID}> channel every week.\nNext Update: <t:${Math.round(thisGtaOrNext() / 1000)}:F>.`;
                }
            }

            function confirmSettingsString() {
                if (lang === "") {
                    return `Confirm Settings`;
                }
                else if (lang === "es") {
                    return `Confirmar la configuración`;
                }
                else if (lang === "br") {
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
                    return `确认设置`;
                }
                else if (lang === "tw") {
                    return `確認設置`;
                }
                else if (lang === "jp") {
                    return `設定を確認する`;
                }
                else if (lang === "kr") {
                    return `설정 확인`;
                }
                else {
                    return `Confirm Settings`;
                }
            }

            function notYourOption() {
                if (lang === "") {
                    return `These options aren't for you.`;
                }
                else if (lang === "es") {
                    return `Estas opciones no son para ti.`;
                }
                else if (lang === "br") {
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
                    return `这些选项不适合您。`;
                }
                else if (lang === "tw") {
                    return `這些選項不適合您。`;
                }
                else if (lang === "jp") {
                    return `これらのオプションはあなたのためではありません。`;
                }
                else if (lang === "kr") {
                    return `이러한 옵션은 귀하를 위한 것이 아닙니다.`;
                }
                else {
                    return `These options aren't for you.`;
                }
            }

            function duplicateTitle() {
                if (lang === "") {
                    return `Please Try Again`;
                }
                else if (lang === "es") {
                    return `Por favor, inténtalo de nuevo`;
                }
                else if (lang === "br") {
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
                    return `请再试一次`;
                }
                else if (lang === "tw") {
                    return `請再試一次`;
                }
                else if (lang === "jp") {
                    return `もう一度お試しください`;
                }
                else if (lang === "kr") {
                    return `다시 시도해 주세요`;
                }
                else {
                    return `Please Try Again`;
                }
            }

            function invalidResponse() {
                if (lang === "") {
                    return `You selected an invalid response.`;
                }
                else if (lang === "es") {
                    return `Seleccionó una respuesta no válida.`;
                }
                else if (lang === "br") {
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
                    return `您选择了无效的回复。`;
                }
                else if (lang === "tw") {
                    return `您選擇了無效的回复。`;
                }
                else if (lang === "jp") {
                    return `無効な応答を選択しました。`;
                }
                else if (lang === "kr") {
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


        }// end if interaction.customId === 'gtaStartMenu'


    },
};