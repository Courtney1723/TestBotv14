const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
            if (err) { console.log(`Error: ${err}`) } //If an error, console.log

            if (!interaction.isButton()) { return };
            if (interaction.customId.includes(`gtastop - `)) {
                await interaction.deferUpdate();

                let buttonUserID01 = (interaction.customId).split("stop - ");
                let buttonUserID = buttonUserID01[1];
                //console.log(`buttonUserID: ${buttonUserID}`);
                //console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

                //console.log(`begin gtastop - ${interaction.customId}`);

                //-----BEGIN TRANSLATIONS------//			

                var lang = await LANG.LANG(interaction);
                //console.log(`LANG:${await LANG.LANG(interaction)}`);	

                function gtaStopTitle() {
                    if (lang === "") {
                        return `Stop Auto Posting GTA Online Bonuses`;
                    }
                    else if (lang === "es") {
                        return `Detener la publicación automática de bonos de GTA Online`;
                    }
                    else if (lang === "br") {
                        return `Pare de auto postar bônus GTA Online`;
                    }
                    else if (lang === "ru") {
                        return `Прекратите автоматическую публикацию бонусов GTA Online`;
                    }
                    else if (lang === "de") {
                        return `Stoppen Sie die automatische Veröffentlichung von GTA Online-Boni`;
                    }
                    else if (lang === "pl") {
                        return `Zatrzymaj automatyczne wiadomości GTA Online`;
                    }
                    else if (lang === "fr") {
                        return `Arrêtez les messages automatisés de GTA Online`;
                    }
                    else if (lang === "it") {
                        return `Interrompi i messaggi automatici di GTA Online`;
                    }
										else if (lang === "zh") {
                        return `停止自动发送 GTA 在线模式消息`;
                    }
                    else if (lang === "tw") {
                        return `停止自動發送 GTA 在線模式消息`;
                    }
                    else if (lang === "jp") {
                        return `自動化された GTA オンライン メッセージを停止する`;
                    }
                    else if (lang === "kr") {
                        return `자동 GTA 온라인 메시지 중지`;
                    }
                    else {
                        return `Stop Auto Posting GTA Online Bonuses`;
                    }
                }

                function gtaStopDesc() {
                    if (lang === "") {
                        return `Click **the dropdown menu** to confirm the channel you want to stop sending GTA Online auto posts to.`;
                    }
                    else if (lang === "es") {
                        return `Haga clic en **o menu suspenso** para confirmar o canal que você deseja parar de enviar GTA Online auto posts para.`;
                    }
                    else if (lang === "br") {
                        return `Clique **o menu suspenso** para confirmar o canal que você deseja parar de enviar GTA Online auto posts para.`;
                    }
                    else if (lang === "ru") {
                        return `Щелчок **раскрывающееся меню** чтобы подтвердить канал, на который вы хотите прекратить отправку автоматических сообщений GTA Online.`;
                    }
                    else if (lang === "de") {
                        return `Klicken **Das Dropdown-Menü** um den Kanal zu bestätigen, an den Sie keine automatischen GTA Online-Beiträge mehr senden möchten.`;
                    }
                    else if (lang === "pl") {
                        return `Kliknij **menu rozwijane**, aby potwierdzić kanał, na który chcesz przestać wysyłać automatyczne wiadomości GTA Online.`;
                    }
                    else if (lang === "fr") {
                        return `Cliquez sur **le menu déroulant** pour confirmer la chaîne à laquelle vous souhaitez cesser d'envoyer des messages automatisés de GTA Online.`;
                    }
                    else if (lang === "it") {
                        return `Fai clic sul **menu a discesa** per confermare il canale a cui desideri interrompere l'invio di messaggi automatici di GTA Online.`;
                    }
										else if (lang === "zh") {
                        return `单击**下拉菜单**以确认您要停止向其发送 GTA 在线模式自动消息的频道。`;
                    }
                    else if (lang === "tw") {
                        return `單擊**下拉菜單**以確認您要停止向其發送 GTA 在線模式自動消息的頻道。`;
                    }
                    else if (lang === "jp") {
                        return `**ドロップダウン メニュー**をクリックして、GTAオンラインの自動メッセージの送信を停止するチャンネルを確認します。`;
                    }
                    else if (lang === "kr") {
                        return `**드롭다운 메뉴**를 클릭하여 GTA 온라인 자동 메시지 전송을 중지할 채널을 확인합니다.`;
                    }
                    else {
                        return `Click **the dropdown menu** to confirm the channel you want to stop sending GTA Online auto posts to.`;
                    }
                }

                function goBack() {
                    if (lang === "") {
                        return `Go Back`;
                    }
                    else if (lang === "es") {
                        return `Volver`;
                    }
                    else if (lang === "br") {
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
                    else if (lang === "tw") {
                        return `回去`;
                    }
                    else if (lang === "jp") {
                        return `戻る`;
                    }
                    else if (lang === "kr") {
                        return `돌아가다`;
                    }
                    else {
                        return `Go Back`;
                    }
                }

                function notYourButtonString() {
                    if (lang === "") {
                        return `These buttons are not for you.`;
                    }
                    else if (lang === "es") {
                        return `Estos botones no son para ti.`;
                    }
                    else if (lang === "br") {
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
                        return `这些按钮不适合您。`;
                    }
                    else if (lang === "tw") {
                        return `這些按鈕不適合您。`;
                    }
                    else if (lang === "jp") {
                        return `これらのボタンはあなたのためではありません。`;
                    }
                    else if (lang === "kr") {
                        return `이 버튼은 당신을 위한 것이 아닙니다.`;
                    }
                    else {
                        return `These buttons are not for you.`;
                    }
                }

                function selectChannel() {
                    if (lang === "") {
                        return `Select A Channel`;
                    }
                    else if (lang === "es") {
                        return `Elige un canal`;
                    }
                    else if (lang === "br") {
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
                        return `选择频道`;
                    }
                    else if (lang === "tw") {
                        return `選擇頻道`;
                    }
                    else if (lang === "jp") {
                        return `チャンネルを選択`;
                    }
                    else if (lang === "kr") {
                        return `채널 선택`;
                    }
                    else {
                        return `Select A Channel`;
                    }
                }

                function noChannel() {
                    if (lang === "") {
                        return `No Channel Selected`;
                    }
                    else if (lang === "es") {
                        return `Ningún canal elegido`;
                    }
                    else if (lang === "br") {
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
                        return `没有频道`;
                    }
                    else if (lang === "tw") {
                        return `沒有頻道`;
                    }
                    else if (lang === "jp") {
                        return `チャンネルなし`;
                    }
                    else if (lang === "kr") {
                        return `채널 없음`;
                    }
                    else {
                        return `No Channel Selected`;
                    }
                }

                //-----END TRANSLATIONS-----//		

                const gtaStopEmbed = new EmbedBuilder()
                    .setColor(0xFF0000) //Red 
                    .setTitle(`${gtaStopTitle()}`)
                    .setDescription(`${gtaStopDesc()}`)


                fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
                    if (err) { console.log(`Error: ${err}`) } //If an error, console.log

                    let gtaStopMenu = new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId(`gtaStopMenu - u:${interaction.user.id} - c:undefinedchannel`)
                                .setPlaceholder(`${selectChannel()}`)
                                .addOptions([{
                                    label: `${noChannel()}`,
                                    value: `gtaStopMenu - u:${interaction.user.id} - c:undefinedchannel`,
                                }])
                        )
                    interaction.guild.channels.cache.forEach(channel => {
                        if (((channel.type === 0) || (channel.type === 5)) && (data.includes(channel.id))) {
                            gtaStopMenu.components[0].addOptions([{
                                label: `${channel.name}`,
                                value: `gtaStopMenu - u:${interaction.user.id} - c:${channel.id}`,
                            }]);
                        }
                    })

                    const backButton = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`gtastopback - ${interaction.user.id}`)
                                .setLabel(`${goBack()}`)
                                .setStyle(ButtonStyle.Secondary),
                        );

                    let gtaChannelIds = [];
                    fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
                        if (err) { console.log(`Error: ${err}`) } //If an error, console.log

                        interaction.guild.channels.cache.forEach(channel => {
                            if (data.includes(channel.id)) {
                                gtaChannelIds.push(channel.id);
                            }
                        });
                        //console.log(`gtaChannelIds: ${gtaChannelIds}`);				

                        if (interaction.user.id === buttonUserID) {
                            await interaction.editReply({ embeds: [gtaStopEmbed], components: [gtaStopMenu, backButton] })
                                .catch(err => { console.log(`gtaStopEmbed+Menu Error: ${err.stack}`); process.kill(1) });
                        }
                        else {
                            await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
                        }

                    }); //end checking if there are not gta channels subscribed

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


                }); //end fs.readFile for GTADataBase.txt
            } // end if gtastop button
        }); //end fs:readFile

    },
};