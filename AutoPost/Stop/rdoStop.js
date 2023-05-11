const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isButton()) { return };
        if (interaction.customId.includes(`rdostop -`)) {
            await interaction.deferUpdate();

            let buttonUserID01 = (interaction.customId).split("stop - ");
            let buttonUserID = buttonUserID01[1];
            //console.log(`buttonUserID: ${buttonUserID}`);
            //console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

            //console.log(`begin rdostop - ${interaction.customId}`);

            //-----BEGIN TRANSLATIONS-----//	

            var lang = await LANG.LANG(interaction);
            //console.log(`LANG:${await LANG.LANG(interaction)}`);	

            function rdoStopTitle() {
                if (lang === "en") {
                    return `Stop Auto Posting Red Dead Online Bonuses`;
                }
                else if (lang === "es") {
                    return `Detener la publicación automática de bonos de Red Dead Online`;
                }
                else if (lang === "pt") {
                    return `Pare de auto postar bônus Red Dead Online`;
                }
                else if (lang === "ru") {
                    return `Прекратите автоматическую публикацию бонусов Red Dead Online`;
                }
                else if (lang === "de") {
                    return `Stoppen Sie die automatische Veröffentlichung von Red Dead Online-Boni`;
                }
                else if (lang === "pl") {
                    return `Zatrzymaj automatyczne wiadomości Red Dead Online`;
                }
                else if (lang === "fr") {
                    return `Arrêtez les messages automatisés de Red Dead Online`;
                }
                else if (lang === "it") {
                    return `Interrompi i messaggi automatici di Red Dead Online`;
                }
                else if (lang === "zh") {
                    return `停止自動發送 Red Dead 在線模式消息`;
                }
                else if (lang === "ja") {
                    return `自動化された Red Dead オンライン メッセージを停止する`;
                }
                else if (lang === "ko") {
                    return `자동 Red Dead 온라인 메시지 중지`;
                }
                else {
                    return `Stop Auto Posting Red Dead Online Bonuses`;
                }
            }

            function rdoStopDesc() {
                if (lang === "en") {
                    return `Click **the dropdown menu** to confirm the channel you want to stop sending Red Dead Online auto posts to.`;
                }
                else if (lang === "es") {
                    return `Haga clic en **o menu suspenso** para confirmar o canal que você deseja parar de enviar Red Dead Online auto posts para.`;
                }
                else if (lang === "pt") {
                    return `Clique **o menu suspenso** para confirmar o canal que você deseja parar de enviar Red Dead Online auto posts para.`;
                }
                else if (lang === "ru") {
                    return `Щелчок **раскрывающееся меню** чтобы подтвердить канал, на который вы хотите прекратить отправку автоматических сообщений Red Dead Online.`;
                }
                else if (lang === "de") {
                    return `Klicken **Das Dropdown-Menü** um den Kanal zu bestätigen, an den Sie keine automatischen Red Dead Online-Beiträge mehr senden möchten.`;
                }
                else if (lang === "pl") {
                    return `Kliknij **menu rozwijane**, aby potwierdzić kanał, na który chcesz przestać wysyłać automatyczne wiadomości Red Dead Online.`;
                }
                else if (lang === "fr") {
                    return `Cliquez sur **le menu déroulant** pour confirmer la chaîne à laquelle vous souhaitez cesser d'envoyer des messages automatisés de Red Dead Online.`;
                }
                else if (lang === "it") {
                    return `Fai clic sul **menu a discesa** per confermare il canale a cui desideri interrompere l'invio di messaggi automatici di Red Dead Online.`;
                }
                else if (lang === "zh") {
                    return `單擊**下拉菜單**以確認您要停止向其發送 Red Dead 在線模式自動消息的頻道。`;
                }
                else if (lang === "ja") {
                    return `**ドロップダウン メニュー**をクリックして、Red Deadオンラインの自動メッセージの送信を停止するチャンネルを確認します。`;
                }
                else if (lang === "ko") {
                    return `**드롭다운 메뉴**를 클릭하여 Red Dead 온라인 자동 메시지 전송을 중지할 채널을 확인합니다.`;
                }
                else {
                    return `Click **the dropdown menu** to confirm the channel you want to stop sending Red Dead Online auto posts to.`;
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

            function selectChannel() {
                if (lang === "en") {
                    return `Select A Channel`;
                }
                else if (lang === "es") {
                    return `Elige un canal`;
                }
                else if (lang === "pt") {
                    return `Escolha um canal`;
                }
                else if (lang === "ru") {
                    return `Выберите канал`;
                }
                else if (lang === "de") {
                    return `Wählen Sie einen Kanal aus`;
                }
                else if (lang === "pl") {
                    return `Wybierz kanał`;
                }
                else if (lang === "fr") {
                    return `Sélectionnez une chaîne`;
                }
                else if (lang === "it") {
                    return `Seleziona un canale`;
                }
                else if (lang === "zh") {
                    return `選擇頻道`;
                }
                else if (lang === "ja") {
                    return `チャンネルを選択`;
                }
                else if (lang === "ko") {
                    return `채널 선택`;
                }
                else {
                    return `Select A Channel`;
                }
            }

            function noChannel() {
                if (lang === "en") {
                    return `No Channel Selected`;
                }
                else if (lang === "es") {
                    return `Ningún canal elegido`;
                }
                else if (lang === "pt") {
                    return `Nenhum canal escolhido`;
                }
                else if (lang === "ru") {
                    return `Канал не выбран`;
                }
                else if (lang === "de") {
                    return `Kein Kanal ausgewählt`;
                }
                else if (lang === "pl") {
                    return `bez kanału`;
                }
                else if (lang === "fr") {
                    return `pas de canal`;
                }
                else if (lang === "it") {
                    return `nessun canale`;
                }
                else if (lang === "zh") {
                    return `沒有頻道`;
                }
                else if (lang === "ja") {
                    return `チャンネルなし`;
                }
                else if (lang === "ko") {
                    return `채널 없음`;
                }
                else {
                    return `No Channel Selected`;
                }
            }

            //-----END TRANSLATIONS-----//				

            const rdoStopEmbed = new EmbedBuilder()
                .setColor(0xFF0000) //Red 
                .setTitle(`${rdoStopTitle()}`)
                .setDescription(`${rdoStopDesc()}`)

            fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
                if (err) { console.log(`Error: ${err}`) } //If an error, console.log

                let rdoStopMenu = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId(`rdoStopMenu - u:${interaction.user.id} - c:undefinedchannel`)
                            .setPlaceholder(`${selectChannel()}`)
                            .addOptions([{
                                label: `${noChannel()}`,
                                value: `rdoStopMenu - u:${interaction.user.id} - c:undefinedchannel`,
                            }])
                    )
                interaction.guild.channels.cache.forEach(channel => {
                    if (((channel.type === 0) || (channel.type === 5)) && (data.includes(channel.id))) {
                        rdoStopMenu.components[0].addOptions([{
                            label: `${channel.name}`,
                            value: `rdoStopMenu - u:${interaction.user.id} - c:${channel.id}`,
                        }]);
                    }
                })

                const backButton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`rdostopback - ${interaction.user.id}`)
                            .setLabel(`${goBack()}`)
                            .setStyle(ButtonStyle.Secondary),
                    );


                let rdoChannelIds = [];
                interaction.guild.channels.cache.forEach(channel => {
                    if (data.includes(channel.id)) {
                        rdoChannelIds.push(channel.id);
                    }
                });
                //console.log(`rdoChannelIds: ${rdoChannelIds}`);						

                if (interaction.user.id === buttonUserID) {
                    await interaction.editReply({ embeds: [rdoStopEmbed], components: [rdoStopMenu, backButton] })
                        .catch(err => { console.log(`gtaStopEmbed+Menu Error: ${err.stack}`); process.kill(1) });
                }
                else {
                    await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
                }


                function expiredDesc() {
                    if (lang === "en") {
                        return `This interaction expired`;
                    }
                    if (lang === "es") {
                        return `Esta interacción expiró.`;
                    }
                    if (lang === "ru") {
                        return `Срок действия этого взаимодействия истек.`;
                    }
                    if (lang === "de") {
                        return `Diese Interaktion ist abgelaufen`;
                    }
                    if (lang === "pt") {
                        return `Esta interação expirou.`;
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

            }); //end fs.readFile for RDODataBase.txt


        } // end if rdostop button

    },
};