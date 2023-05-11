const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isButton()) { return };
        if (interaction.customId.startsWith(`stop - `)) {
            //console.log(`begin stop: '${interaction.customId}'`);		

            let buttonUserID01 = (interaction.customId).split("stop - ");
            let buttonUserID = buttonUserID01[1];
            //console.log(`buttonUserID: ${buttonUserID}`);
            //console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)

            //------BEGIN TRANSLATIONS-----//

            var lang = await LANG.LANG(interaction);
            //console.log(`LANG:${await LANG.LANG(interaction)}`);	

            function stopTitle() {
                if (lang === "en") {
                    return `Stop Auto Posting`;
                }
                else if (lang === "es") {
                    return `Detener publicaciones automáticas`;
                }
                else if (lang === "pt") {
                    return `Parar postagens automáticas`;
                }
                else if (lang === "ru") {
                    return `Остановка автоматических сообщений`;
                }
                else if (lang === "de") {
                    return `Automatische Beiträge stoppen`;
                }
                else if (lang === "pl") {
                    return `Zatrzymaj automatyczne wiadomości`;
                }
                else if (lang === "fr") {
                    return `Arrêter les messages automatisés`;
                }
                else if (lang === "it") {
                    return `Ferma i messaggi automatici`;
                }
                else if (lang === "zh") {
                    return `停止自動消息`;
                }
                else if (lang === "ja") {
                    return `自動メッセージを停止する`;
                }
                else if (lang === "ko") {
                    return `자동화된 메시지 중지`;
                }
                else {
                    return `Stop Auto Posting`;
                }
            }

            function stopDesc() {
                if (lang === "en") {
                    return `Click **\'GTA\'** to remove a channel from receiving GTA Online Auto Posts.
			\nClick **\'RDO\'** to remove a channel from receiving Red Dead Online Auto Posts.`;
                }
                else if (lang === "es") {
                    return `Haga clic en **\'GTA\'** para quitar un canal de GTA Online.
			\nHaga clic en **\'RDO\'** para quitar un canal Red Dead Online.`;
                }
                else if (lang === "pt") {
                    return `Clique **\'GTA\'** para remover um canal GTA Online.
			\nClique **\'RDO\'** para remover um canal Red Dead Online.`;
                }
                else if (lang === "ru") {
                    return `Щелчок **\'GTA\'** удалить канал GTA Online.
			\nЩелчок **\'RDO\'** удалить канал Red Dead Online.`;
                }
                else if (lang === "de") {
                    return `Klicken **\'GTA\'** So entfernen Sie einen GTA Online-Kanal.
			\nKlicken **\'RDO\'** So entfernen Sie einen Kanal-Red Dead Online.`;
                }
                else if (lang === "pl") {
                    return `Kliknij **GTA**, aby usunąć kanał z otrzymywania automatycznych wiadomości GTA Online.
			\nKliknij **RDO**, aby usunąć kanał z otrzymywania automatycznych wiadomości Red Dead Online.`;
                }
                else if (lang === "fr") {
                    return `Cliquez sur **GTA** pour empêcher une chaîne de recevoir les messages automatisés de GTA Online.
			\nCliquez sur **RDO** pour empêcher une chaîne de recevoir les messages automatisés de Red Dead Online.`;
                }
                else if (lang === "it") {
                    return `Fai clic su **GTA** per impedire a un canale di ricevere messaggi automatici di GTA Online.
			\nFai clic su **RDO** per impedire a un canale di ricevere messaggi automatici di Red Dead Online.`;
                }
                else if (lang === "zh") {
                    return `單擊 **GTA** 以從接收 GTA 在線模式自動消息中刪除頻道。
			\n單擊 **RDO** 以刪除頻道接收 Red Dead 在線模式自動消息。`;
                }
                else if (lang === "ja") {
                    return `**GTA** をクリックして、GTA Online の自動メッセージの受信からチャンネルを削除します。
			\n**RDO** をクリックして、チャンネルがレッド・デッド・オンラインの自動メッセージを受信しないようにします。`;
                }
                else if (lang === "ko") {
                    return `GTA 온라인 자동 메시지 수신에서 채널을 제거하려면 **GTA**을(를) 클릭하십시오.
			\nRed Dead 온라인 자동 메시지 수신에서 채널을 제거하려면 **RDO**을(를) 클릭하십시오.`;
                }
                else {
                    return `Click **\'GTA\'** to remove a channel from receiving GTA Online Auto Posts.
			\nClick **\'RDO\'** to remove a channel from receiving Red Dead Online Auto Posts.`;
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

            function errorString() {
                if (lang === "en") {
                    return `There was an error! Please try again.`;
                }
                if (lang === "es") {
                    return `Se ha producido un error. Inténtalo de nuevo.`;
                }
                if (lang === "pt") {
                    return `Ocorreu um erro. Por favor, tente novamente.`;
                }
                if (lang === "ru") {
                    return `Произошла ошибка. Пожалуйста, попробуйте еще раз.`;
                }
                if (lang === "de") {
                    return `Ein Fehler ist aufgetreten. Bitte versuche es erneut.`;
                }
                if (lang === "pl") {
                    return `Wystąpił błąd. Proszę spróbuj ponownie.`;
                }
                if (lang === "fr") {
                    return `Une erreur est survenue. Veuillez réessayer.`;
                }
                if (lang === "it") {
                    return `C'è stato un errore. Per favore riprova.`;
                }
                if (lang === "zh") {
                    return `發生了錯誤。請再試一次。`;
                }
                if (lang === "ja") {
                    return `エラーが発生しました。もう一度やり直してください。`;
                }
                if (lang === "ko") {
                    return `오류가 발생했습니다. 다시 시도해 주세요.`;
                }
                else {
                    return `There was an error! Please try again.`;
                }
            }


            //-----END TRANSLATIONS-----//

            var subscriptionCheckGTA = false;
            fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) { //Checks for GTA subscriptions
                if (err) { console.log(`Error: ${err}`) } //If an error, console.log

                if (!data.includes(interaction.guild.id)) {
                    subscriptionCheckGTA = true;
                }

                var subscriptionCheckRDO = false;
                fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) { //Checks for RDO subscriptions
                    if (err) { console.log(`Error: ${err}`) } //If an error, console.log

                    if (!data.includes(interaction.guild.id)) {
                        subscriptionCheckRDO = true;
                    }

                    const stopEmbed = new EmbedBuilder()
                        .setColor(0xFF0000) //Red
                        .setTitle(`${stopTitle()}`)
                        .setDescription(`${stopDesc()}`)

                    const stopButtons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`gtastop - ${interaction.user.id}`)
                                .setLabel('GTA')
                                .setStyle(ButtonStyle.Success)
                                .setDisabled(subscriptionCheckGTA),
                            new ButtonBuilder()
                                .setCustomId(`rdostop - ${interaction.user.id}`)
                                .setLabel('RDO')
                                .setStyle(ButtonStyle.Danger)
                                .setDisabled(subscriptionCheckRDO),
                            new ButtonBuilder()
                                .setCustomId(`stopback - ${interaction.user.id}`)
                                .setLabel(`${goBack()}`)
                                .setStyle(ButtonStyle.Secondary),
                        );

                    //begin checking for permissions
                    await interaction.deferUpdate();
                    if (interaction.user.id !== buttonUserID) {
                        await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
                    }
                    else if ((interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID)) {
                        await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => { console.log(`stopEmbed Error: ${err.stack}`); process.kill(1) });
                    }
                    else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                        await interaction.followUp({ content: `${missingPermissions()}`, ephemeral: true });
                    }
                    else {
                        await interaction.followUp({ content: `${errorString()}`, ephemeral: true });
                    } //end checking for permissions		

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


                }); //end fs.readFile for RDOData.txt
            }); //end fs.readFile for GTAData.txt


        } //end if stop


    },
};