const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, optionstyle } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isStringSelectMenu()) { return };
        if (interaction.customId.startsWith(`gtaStopMenu -`)) {
            //console.log(`begin gtaStopMenu: '${interaction.customId}'`);		

            let menuUserID02 = (interaction.customId).split("gtaStopMenu - u:");
            let menuUserID01 = menuUserID02[1].split(" - ");
            let menuUserID = menuUserID01[0];
            //console.log(`gtaStopMenu menuUserID: ${menuUserID}`);
            //console.log(`gtaStopMenu interaction.user.id === menuUserID?: ${interaction.user.id === menuUserID}`)	

            let menuChannelID01 = (interaction.values).toString().split(`c:`);
            let menuChannelID = menuChannelID01[1];
            //console.log(`gtaStopMenu menuChannelID: ${menuChannelID}`)

            var lang = await LANG.LANG(interaction);
            //console.log(`LANG:${await LANG.LANG(interaction)}`);	

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

            if (menuChannelID.includes(`undefinedchannel`)) { //user selected an invalid response

                const gtaDuplicateEmbed = new EmbedBuilder()
                    .setColor(0xFFAE00) //Orange 
                    .setTitle(`${duplicateTitle()}`)
                    .setDescription(`${invalidResponse()} || (= ФェФ=) ||`)

                await interaction.deferUpdate();
                if (interaction.user.id === menuUserID) {
                    await interaction.followUp({ embeds: [gtaDuplicateEmbed], components: [], ephemeral: true })
                        .catch(err => console.log(`gtaDuplicateEmbed Error: ${err}`));
                } else {
                    interaction.followUp({ content: `These options aren't for you!`, ephemeral: true });
                }

            }
            else { //remove a channel from GTADataBase.txt	

                //-----BEGIN TRANSLATIONS----//			

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

                await interaction.deferUpdate();
                if (interaction.user.id === menuUserID) {

                    fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
                        if (err) { console.log(`Error: ${err}`) } //If an error, console.log

                        // console.log(`interaction.guild.id: ${interaction.guild.id}`)
                        // console.log(`menuChannelID: ${menuChannelID}`)
                        // console.log(`data.replace: ${data.replace(`\nguild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:gtaStartMenu - `, "")}`);
                        fs.writeFile('./GTADataBase.txt', `${data.replace(`\nguild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:gtaStartMenu - `, "")}`, async function (err) {
                            if (err) {
                                throw err;
                            }
                            else {

                                function success() {
                                    if (lang === "") {
                                        return `Success`;
                                    }
                                    else if (lang === "es") {
                                        return `Éxito`;
                                    }
                                    else if (lang === "br") {
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
                                    else if (lang === "tw") {
                                        return `成功`;
                                    }
                                    else if (lang === "jp") {
                                        return `成功`;
                                    }
                                    else if (lang === "kr") {
                                        return `성공`;
                                    }
                                    else {
                                        return `Success`;
                                    }
                                }

                                function gtaRemoveDesc() {
                                    if (lang === "") {
                                        return `You will now no longer get GTA auto posts in the <#${menuChannelID}> channel.`;
                                    }
                                    else if (lang === "es") {
                                        return `Ahora ya no obtendrá publicaciones automáticas de GTA en el canal <#${menuChannelID}>.`;
                                    }
                                    else if (lang === "br") {
                                        return `Agora você não receberá mais postagens automáticas do GTA no canal <#${menuChannelID}>.`;
                                    }
                                    else if (lang === "ru") {
                                        return `Теперь вы больше не будете получать автоматические сообщения GTA в канале <#${menuChannelID}>.`;
                                    }
                                    else if (lang === "de") {
                                        return `Sie erhalten jetzt keine automatischen GTA-Beiträge mehr im <#${menuChannelID}>-Kanal.`;
                                    }
                                    else if (lang === "pl") {
                                        return `Nie będziesz już otrzymywać automatycznych wiadomości GTA Online na kanale <#${menuChannelID}>.`;
                                    }
                                    else if (lang === "fr") {
                                        return `Vous ne recevrez plus les messages automatisés de GTA Online dans le canal <#${menuChannelID}>.`;
                                    }
                                    else if (lang === "it") {
                                        return `Non riceverai più messaggi automatici di GTA Online nel canale <#${menuChannelID}>.`;
                                    }
																		else if (lang === "zh") {
                                        return `您将不会再在 <#${menuChannelID}> 频道中收到 GTA 在线模式的自动消息。`;
                                    }
                                    else if (lang === "tw") {
                                        return `您將不會再在 <#${menuChannelID}> 頻道中收到 GTA 在線模式的自動消息。`;
                                    }
                                    else if (lang === "jp") {
                                        return `<#${menuChannelID}> チャンネルで GTA Online の自動メッセージが表示されなくなります。`;
                                    }
                                    else if (lang === "kr") {
                                        return `더 이상 <#${menuChannelID}> 채널에서 GTA 온라인 자동 메시지를 받지 않습니다.`;
                                    }
                                    else {
                                        return `You will now no longer get GTA auto posts in the <#${menuChannelID}> channel.`;
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

                                //-----END TRANSLATIONS-----//											

                                const gtaConfirmEmbed = new EmbedBuilder()
                                    .setColor(0x00FF00) //Green 
                                    .setTitle(`${success()}`)
                                    .setDescription(`${gtaRemoveDesc()}`)

                                const confirmSettingsButton = new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setCustomId(`initialback - ${interaction.user.id}`)
                                            .setLabel(`${confirmSettingsString()}`)
                                            .setStyle(ButtonStyle.Secondary),
                                    );

                                await interaction.editReply({ embeds: [gtaConfirmEmbed], components: [confirmSettingsButton] })
                                    .catch(err => { console.log(`gtaConfirmEmbed Error: ${err}`); process.kill(1); });

                                if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_1)) {
                                    console.log(`You removed ${menuChannelID} from receiving GTA auto posts in ${interaction.guild.id}.`);
                                }
                                else {
                                    console.log(`A user removed ${menuChannelID} from receiving GTA auto posts in ${interaction.guild.id}.`);
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

                            }
                        }); //end fs:writeFile to remove channel from autoposts
                    }); //end fs:readFile GTADataBase.txt						

                }
                else {
                    await interaction.followUp({ content: `${notYourOption()}`, ephemeral: true });
                }

            } //end if button is gtaRemove - not undefinedchannel

        }// end if interaction.customId === 'gtaStopMenu'


    },
};