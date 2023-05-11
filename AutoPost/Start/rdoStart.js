const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isButton()) { return };
        if (interaction.customId.includes(`rdostart - `)) {
            await interaction.deferUpdate();

            let buttonUserID01 = (interaction.customId).split("start - ");
            let buttonUserID = buttonUserID01[1];
            //console.log(`buttonUserID: ${buttonUserID}`);
            //console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

            //-----BEGIN TRANSLATIONS-----//				

            var lang = await LANG.LANG(interaction);
            //console.log(`LANG:${await LANG.LANG(interaction)}`);	

            function rdoStartTitle() {
                if (lang === "en") {
                    return `Start Auto Posting Red Dead Online Bonuses`;
                }
                else if (lang === "es") {
                    return `Comience a publicar automáticamente bonos y descuentos de Red Dead Online`;
                }
                else if (lang === "pt") {
                    return `Iniciar publicações automáticas`;
                }
                else if (lang === "ru") {
                    return `Начните автоматическую публикацию бонусов и скидок Red Dead Online`;
                }
                else if (lang === "de") {
                    return `Starten Sie die automatische Veröffentlichung von Red Dead Online-Boni`;
                }
                else if (lang === "pl") {
                    return `Zacznij automatycznie wysyłać bonusy Red Dead Online`;
                }
                else if (lang === "fr") {
                    return `Commencez à envoyer automatiquement des bonus Red Dead Online`;
                }
                else if (lang === "it") {
                    return `Inizia a inviare automaticamente i bonus di Red Dead Online`;
                }
                else if (lang === "zh") {
                    return `開始自動發送 Red Dead 在線模式獎勵`;
                }
                else if (lang === "ja") {
                    return `Red Dead Online ボーナスの自動送信を開始する`;
                }
                else if (lang === "ko") {
                    return `Red Dead 온라인 보너스 자동 전송 시작`;
                }
                else {
                    return `Start automatically publishing Red Dead Online bonuses`;
                }
            }

            function rdoStartDesc() {
                if (lang === "en") {
                    return `Click **the dropdown menu** to confirm the channel you want to send Red Dead Online Auto Posts to \n**the first Tuesday of every month at 2:00 PM EST**.`;
                }
                if (lang === "es") {
                    return `Haga clic en **El menú desplegable** para confirmar el canal al que desea enviar publicaciones automáticas de RDO \n**el primer martes de cada mes a las 14:00 hora del este**.`;
                }
                if (lang === "pt") {
                    return `Clique **no menu suspenso** para confirmar o canal para o qual deseja enviar as publicações automáticas do Red Dead Online \n**na primeira terça-feira de cada mês às 14:00 Hora do Leste**.`;
                }
                if (lang === "ru") {
                    return `Щелчок **раскрывающееся меню** для подтверждения канала вы хотите отправлять автоматические сообщения RDO на \n**в первый вторник каждого месяца в 14:00 по восточному времени**.`;
                }
                if (lang === "de") {
                    return `Klicken **Das Dropdown-Menü** um den Kanal zu bestätigen, an den Sie automatische RDO-Beiträge senden möchten \n** am ersten Dienstag eines jeden Monats um 14:00 Uhr Ostküsten-Standardzeit (Nordamerika)**.`;
                }
                else if (lang === "pl") {
                    return `Kliknij **menu**, aby potwierdzić kanał, na który chcesz wysyłać automatyczne wiadomości Red Dead Online \n**w pierwszy wtorek każdego miesiąca o godzinie 14:00 czasu wschodniego**.`;
                }
                else if (lang === "fr") {
                    return `Cliquez sur **le menu déroulant** pour confirmer la chaîne à laquelle vous souhaitez envoyer des messages automatiques de Red Dead Online \n**le premier mardi de chaque mois à 14h00, heure de l'Est**.`;
                }
                else if (lang === "it") {
                    return `Fai clic sul **menu a discesa** per confermare il canale a cui vuoi inviare i messaggi automatici di Red Dead Online \n**il primo martedì di ogni mese alle 14:00 ora di New York**.`;
                }
                else if (lang === "zh") {
                    return `單擊下拉菜單以確認您要將 Red Dead 在線模式自動消息發送到東部時間每個第一個星期二 14:00 的頻道。`;
                }
                else if (lang === "ja") {
                    return `**ドロップダウン メニュー**をクリックして、Red Dead Online の自動メッセージを\n**毎月第 1 火曜日の東部時間 14:00** に送信するチャンネルを確認します。`;
                }
                else if (lang === "ko") {
                    return `**드롭다운 메뉴**를 클릭하여 Red Dead 온라인 자동 메시지를 \n**매월 첫 번째 화요일 14:00 동부 표준시**에 보낼 채널을 확인하세요.`;
                }
                else {
                    return `Click **the dropdown menu** to confirm the channel you want to send Red Dead Online Auto Posts to \n**the first Tuesday of every month at 2:00 PM EST**.`;
                }
            }

            function rdoStartFooter() {
                if (lang === "en") {
                    return `Auto posts can only be sent to text channels the bot has permission to \'Send Messages\' in.`;
                }
                if (lang === "es") {
                    return `Las publicaciones automáticas solo se pueden enviar a canales de texto en los que el bot tiene permiso para \'Enviar mensajes\'.`;
                }
                if (lang === "pt") {
                    return `Autoposts só podem ser enviados para canais de texto que o bot tenha permissão de \'Enviar mensagens\'.`;
                }
                if (lang === "ru") {
                    return `Автоматические сообщения могут быть отправлены только на текстовые каналы, на которые бот имеет разрешение \'Отправить сообщения\'.`;
                }
                if (lang === "de") {
                    return `Automatische Posts können nur an Textkanäle gesendet werden, in denen der Bot die Berechtigung zum \'Senden von Nachrichten\' hat.`;
                }
                else if (lang === "pl") {
                    return `Automatyczne wiadomości mogą być wysyłane tylko do kanałów tekstowych, w których bot ma uprawnienia do wysyłania wiadomości.`;
                }
                else if (lang === "fr") {
                    return `Les messages automatiques ne peuvent être envoyés qu'aux canaux de texte où le bot est autorisé à envoyer des messages.`;
                }
                else if (lang === "it") {
                    return `I messaggi automatici possono essere inviati solo ai canali di testo in cui il bot ha il permesso di inviare messaggi.`;
                }
                else if (lang === "zh") {
                    return `自動消息只能發送到機器人有權發送消息的文本通道。`;
                }
                else if (lang === "ja") {
                    return `自動メッセージは、ボットがメッセージを送信する権限を持つテキスト チャネルにのみ送信できます。`;
                }
                else if (lang === "ko") {
                    return `자동 메시지는 봇이 메시지를 보낼 수 있는 권한이 있는 텍스트 채널로만 보낼 수 있습니다.`;
                }
                else {
                    return `Auto posts can only be sent to text channels the bot has permission to \'Send Messages\' in.`;
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

            const rdoStartEmbed = new EmbedBuilder()
                .setColor(0x00FF00) //Green
                .setTitle(`${rdoStartTitle()}`)
                .setDescription(`${rdoStartDesc()}`)
                .setFooter({ text: `${rdoStartFooter()}`, iconURL: process.env.logo_link });

            fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
                if (err) { console.log(`Error: ${err}`) } //If an error, console.log						

                let rdoChannelCount = 0;
                interaction.guild.channels.cache.forEach(channel => {
                    if (((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) && (!data.includes(channel.id)) && (channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages))) {
                        rdoChannelCount += 1;
                    }
                })
                var rdoChannelNames = new Array(rdoChannelCount);
                var rdoChannelIDs = new Array(rdoChannelCount);
                var rdoChannelTypes = new Array(rdoChannelCount);
                interaction.guild.channels.cache.forEach(channel => {
                    if (((channel.type === 0) || (channel.type === 5)) && (!data.includes(channel.id)) && (channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages))) {
                        rdoChannelNames.splice((channel.rawPosition), 1, channel.name);
                        rdoChannelIDs.splice((channel.rawPosition), 1, channel.id);
                        rdoChannelTypes.splice((channel.rawPosition), 1, channel.type);
                    }
                });
                //console.log(`rdoChannelCount: ${rdoChannelCount}`)
                //console.log(`rdoChannelNames[23]: ${rdoChannelNames[23]}`)

                let rdoStartMenu = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId(`rdoStartMenu - u:${interaction.user.id} - c:undefinedchannel`)
                            .setPlaceholder(`${selectChannel()}`)
                            .addOptions([{
                                label: `${noChannel()}`,
                                value: `rdoStartMenu - u:${interaction.user.id} - c:undefinedchannel`,
                            }])
                    )
                for (i = 0; i <= 23; i++) {
                    if ((rdoChannelNames[i] != undefined)) {
                        //console.log(`rdoChannelNames at ${i}: ${rdoChannelNames[i]}`);
                        rdoStartMenu.components[0].addOptions([{
                            label: `${rdoChannelNames[i]}`,
                            value: `rdoStartMenu2 - u:${interaction.user.id} - c:${rdoChannelIDs[i]}`,
                        }]);
                    }
                }
                const backButton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`rdostartback - ${interaction.user.id}`)
                            .setLabel(`${goBack()}`)
                            .setStyle(ButtonStyle.Secondary),
                    );

                let rdoStartMenu2 = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId(`rdoStartMenu2 - u:${interaction.user.id} - c:undefinedchannel`)
                            .setPlaceholder(`${selectChannel()}`)
                            .addOptions([{
                                label: `${noChannel()}`,
                                value: `rdoStartMenu - u:${interaction.user.id} - c:undefinedchannel`,
                            }])
                    )

                if (rdoChannelCount <= 23) { //if there are 23 channels or fewer


                    if (interaction.user.id === buttonUserID) {
                        await interaction.editReply({ embeds: [rdoStartEmbed], components: [rdoStartMenu, backButton] })
                            .catch(err => console.log(`rdoStartEmbed+Menu Error: ${err.stack}`));
                    } else {
                        interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
                    }

                } //end if there are fewer than 23 channels
                else if (rdoChannelCount >= 24) {

                    for (i = 24; i <= 47; i++) {
                        if ((rdoChannelNames[i] != undefined)) {
                            //console.log(`rdoChannelNames at ${i}: ${rdoChannelNames[i]}`);
                            rdoStartMenu2.components[0].addOptions([{
                                label: `${rdoChannelNames[i]}`,
                                description: `${rdoChannelNames[i]}`,
                                value: `rdoStartMenu2 - u:${interaction.user.id} - c:${rdoChannelIDs[i]}`,
                            }]);
                        }
                    }

                    if (interaction.user.id === buttonUserID) {
                        await interaction.editReply({ embeds: [rdoStartEmbed], components: [rdoStartMenu, rdoStartMenu2, backButton] })
                            .catch(err => console.log(`rdoStartEmbed+Menu Error: ${err.stack}`));
                    }
                    else {
                        await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
                    }


                } //end if rdoChannelCount >24

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

            }); //end fs.readFile for RDODataBase.txt
        } // end if rdostart button


    },
};