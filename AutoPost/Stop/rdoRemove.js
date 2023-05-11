const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isStringSelectMenu()) { return };
        if (interaction.customId.startsWith(`rdoStopMenu -`)) {
            //console.log(`begin rdoStopMenu: '${interaction.customId}'`);		

            let menuUserID02 = (interaction.customId).split("rdoStopMenu - u:");
            let menuUserID01 = menuUserID02[1].split(" - ");
            let menuUserID = menuUserID01[0];
            //console.log(`rdoStopMenu menuUserID: ${menuUserID}`);
            //console.log(`rdoStopMenu interaction.user.id === menuUserID?: ${interaction.user.id === menuUserID}`)	

            let menuChannelID01 = (interaction.values).toString().split(`c:`);
            let menuChannelID = menuChannelID01[1];
            //console.log(`rdoStopMenu menuChannelID: ${menuChannelID}`)	

            var lang = await LANG.LANG(interaction);
            //console.log(`LANG:${await LANG.LANG(interaction)}`);	

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

            if (menuChannelID.includes(`undefinedchannel`)) { //User delected an invalid response

                const rdoDuplicateEmbed = new EmbedBuilder()
                    .setColor(0xFFAE00) //Orange 
                    .setTitle(`${duplicateTitle()}`)
                    .setDescription(`${invalidResponse()} || (⌐■_■) ||`)

                await interaction.deferUpdate();
                if (interaction.user.id === menuUserID) {
                    await interaction.followUp({ embeds: [rdoDuplicateEmbed], components: [], ephemeral: true })
                        .catch(err => console.log(`rdoDuplicateEmbed Error: ${err}`));
                } else {
                    interaction.followUp({ content: `These options aren't for you!`, ephemeral: true });
                }

            }
            else { //remove a channel from RDODataBase.txt		

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

                await interaction.deferUpdate();
                if (interaction.user.id === menuUserID) {

                    fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
                        if (err) { console.log(`Error: ${err}`) } //If an error, console.log

                        // console.log(`interaction.guild.id: ${interaction.guild.id}`)
                        // console.log(`menuChannelID: ${menuChannelID}`)
                        // console.log(`data.replace: ${data.replace(`\nguild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:rdoStartMenu - `, "")}`);
                        fs.writeFile('./RDODataBase.txt', `${data.replace(`\nguild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:rdoStartMenu - `, "")}`, async function (err) {
                            if (err) {
                                throw err;
                            }
                            else {

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

                                function rdoRemoveDesc() {
                                    if (lang === "en") {
                                        return `You will now no longer get Red Dead Online auto posts in the <#${menuChannelID}> channel.`;
                                    }
                                    else if (lang === "es") {
                                        return `Ahora ya no obtendrá publicaciones automáticas de Red Dead en el canal <#${menuChannelID}>.`;
                                    }
                                    else if (lang === "pt") {
                                        return `Agora você não receberá mais postagens automáticas do Red Dead no canal <#${menuChannelID}>.`;
                                    }
                                    else if (lang === "ru") {
                                        return `Теперь вы больше не будете получать автоматические сообщения Red Dead в канале <#${menuChannelID}>.`;
                                    }
                                    else if (lang === "de") {
                                        return `Sie erhalten keine automatischen Beiträge zu Red Dead Online mehr im Kanal <#${menuChannelID}>.`;
                                    }
                                    else if (lang === "pl") {
                                        return `Nie będziesz już otrzymywać automatycznych wiadomości Red Dead Online na kanale <#${menuChannelID}>.`;
                                    }
                                    else if (lang === "fr") {
                                        return `Vous ne recevrez plus les messages automatisés de Red Dead Online dans le canal <#${menuChannelID}>.`;
                                    }
                                    else if (lang === "it") {
                                        return `Non riceverai più messaggi automatici di Red Dead Online nel canale <#${menuChannelID}>.`;
                                    }
                                    else if (lang === "zh") {
                                        return `您將不會再在 <#${menuChannelID}> 頻道中收到 Red Dead 在線模式的自動消息。`;
                                    }
                                    else if (lang === "ja") {
                                        return `<#${menuChannelID}> チャンネルで Red Dead Online の自動メッセージが表示されなくなります。`;
                                    }
                                    else if (lang === "ko") {
                                        return `더 이상 <#${menuChannelID}> 채널에서 Red Dead 온라인 자동 메시지를 받지 않습니다.`;
                                    }
                                    else {
                                        return `You will now no longer get Red Dead auto posts in the <#${menuChannelID}> channel.`;
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


                                //-----END TRANSLATIONS-----//	

                                const rdoConfirmEmbed = new EmbedBuilder()
                                    .setColor(0x00FF00) //Green
                                    .setTitle(`${success()}`)
                                    .setDescription(`${rdoRemoveDesc()}`)

                                const confirmSettingsButton = new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setCustomId(`initialback - ${interaction.user.id}`)
                                            .setLabel(`${confirmSettingsString()}`)
                                            .setStyle(ButtonStyle.Secondary),
                                    );

                                await interaction.editReply({ embeds: [rdoConfirmEmbed], components: [confirmSettingsButton] })
                                    .catch(err => { console.log(`gtaConfirmEmbed Error: ${err}`); process.kill(1); });

                                if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_1)) {
                                    console.log(`You removed ${menuChannelID} from receiving GTA autop posts in ${interaction.guild.id}.`);
                                }
                                else {
                                    console.log(`A user removed ${menuChannelID} from receiving GTA autop posts in ${interaction.guild.id}.`);
                                }

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
                        }); //end fs.writeFile for RDODataBase.txt
                    }); //end fs:readFile RDODataBase.txt	

                } else {
                    interaction.followUp({ content: `${notYourOption()}`, ephemeral: true });
                }

            } //end remove channel

        }// end if interaction.customId === 'rdoStopMenu'


    },
};