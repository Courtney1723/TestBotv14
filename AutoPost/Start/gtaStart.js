const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');
const NEXT_BONUS = require('../../events/nextBonus.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isButton()) { return };
        if (interaction.customId.includes(`gtastart - `)) {
            await interaction.deferUpdate();

            let buttonUserID01 = (interaction.customId).split("start - ");
            let buttonUserID = buttonUserID01[1];
            //console.log(`buttonUserID: ${buttonUserID}`);
            //console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

            //console.log(`begin gtastart - ${interaction.customId}`);

            //-----BEGIN TRANSLATIONS-----//				

            var lang = await LANG.LANG(interaction);
            //console.log(`LANG:${await LANG.LANG(interaction)}`);	

						var nextBONUSGTA = await NEXT_BONUS.nextBonus("gta");
						var nextBONUSRDO = await NEXT_BONUS.nextBonus("rdo");
						//console.log(`gta: ${nextBONUSGTA} - rdo: ${nextBONUSRDO}`);					

            function startTitle() {
                if (lang === "en") {
                    return `Start auto posting GTA Online bonuses`;
                }
                if (lang === "es") {
                    return `Comience a publicar automáticamente los bonos de GTA Online`;
                }
                if (lang === "pt") {
                    return `Comece a postar automaticamente bônus GTA Online`;
                }
                if (lang === "ru") {
                    return `Начать автоматическую публикацию GTA Online Онлайн бонусы`;
                }
                if (lang === "de") {
                    return `Starten Sie die automatische Veröffentlichung für GTA Online-Boni`;
                }
                else if (lang === "pl") {
                    return `Zacznij automatycznie wysyłać bonusy GTA Online`;
                }
                else if (lang === "fr") {
                    return `Commencez à envoyer automatiquement des bonus GTA Online`;
                }
                else if (lang === "it") {
                    return `Inizia a inviare automaticamente i bonus di GTA Online`;
                }
                else if (lang === "zh") {
                    return `開始自動發送 GTA 在線模式獎勵`;
                }
                else if (lang === "ja") {
                    return `GTAオンラインボーナスの自動送信を開始`;
                }
                else if (lang === "ko") {
                    return `GTA 온라인 보너스 자동 전송 시작`;
                }
                else {
                    return `Start auto posting GTA Online bonuses`;
                }
            }

            function startDesc() {
                if (lang === "en") {
                    return `Click **the dropdown menu** to confirm the channel you want to send GTA Online auto posts to every week. \nNext Update: <t:${Math.round(nextBONUSGTA / 1000)}:F>`;
                }
                if (lang === "es") {
                    return `Hage clic en **el menú desplegable** para confirmar el canal al que desea enviar publicaciones automáticas de GTA Online todas las semanas.\n**Próxima actualización:** <t:${Math.round(nextBONUSGTA / 1000)}:F>`;
                }
                if (lang === "pt") {
                    return `Clique **o menu suspenso** para confirmar o canal que você deseja enviar GTA Online toda semana.\nPróxima atualização: <t:${Math.round(nextBONUSGTA / 1000)}:F>`;
                }
                if (lang === "ru") {
                    return `Щелкните **раскрывающееся меню**, чтобы выбрать канал, на который вы хотите автоматически публиковать обновления GTA Online каждую неделю.\nСледующее обновление: <t:${Math.round(nextBONUSGTA / 1000)}:F>`;
                }
                if (lang === "de") {
                    return `Klicken Sie auf **Das Dropdown-Menü**, um den Kanal zu bestätigen, an den Sie jede Woche automatische GTA Online-Updates senden möchten.\nNächstes Update: <t:${Math.round(nextBONUSGTA / 1000)}:F>`;
                }
                else if (lang === "pl") {
                    return `Kliknij **menu**, aby potwierdzić kanał, na który co tydzień mają być wysyłane automatyczne aktualizacje GTA Online.\nNastępna aktualizacja: <t:${Math.round(nextBONUSGTA / 1000)}:F>`;
                }
                else if (lang === "fr") {
                    return `Cliquez sur le **menu déroulant** pour confirmer la chaîne à laquelle vous souhaitez que les mises à jour automatiques de GTA Online soient envoyées chaque semaine.\nProchaine mise à jour : <t:${Math.round(nextBONUSGTA / 1000)}:F>`;
                }
                else if (lang === "it") {
                    return `Fai clic sul **menu a discesa** per confermare il canale a cui desideri che vengano inviati gli aggiornamenti automatici di GTA Online ogni settimana.\nProssimo aggiornamento: <t:${Math.round(nextBONUSGTA / 1000)}:F>`;
                }
                else if (lang === "zh") {
                    return `單擊菜單以確認您希望 GTA 在線模式每周自動發送更新的頻道\n下次更新：<t:${Math.round(nextBONUSGTA / 1000)}:F>`;
                }
                else if (lang === "ja") {
                    return `メニューをクリックして、「GTA オンライン」自動アップデートを毎週送信するチャンネルを確認します\n次回の更新: <t:${Math.round(nextBONUSGTA / 1000)}:F>`;
                }
                else if (lang === "ko") {
                    return `매주 GTA 온라인 자동 업데이트를 보낼 채널을 확인하려면 메뉴를 클릭하십시오.\n다음 업데이트: <t:${Math.round(nextBONUSGTA / 1000)}:F>`;
                }
                else {
                    return `Click **the dropdown menu** to confirm the channel you want to send GTA Online auto posts to every week. \nNext Update: <t:${Math.round(nextBONUSGTA / 1000)}:F>`;
                }
            }

            function startFooter() {
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

            const gtaStartEmbed = new EmbedBuilder()
                .setColor(0x00FF00) //Green
                .setTitle(`${startTitle()}`)
                .setDescription(`${startDesc()}`)
                .setFooter({ text: `${startFooter()}`, iconURL: process.env.logo_link });

            const backButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`gtastartback - ${interaction.user.id}`)
                        .setLabel(`${goBack()}`)
                        .setStyle(ButtonStyle.Secondary),
                );

            fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
                if (err) { console.log(`Error: ${err}`) } //If an error, console.log					

                let gtaChannelCount = 0;
                interaction.guild.channels.cache.forEach(channel => {
                    if (((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) && (!data.includes(channel.id)) && (channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages)) && (channel.permissionsFor(interaction.user.id).has(PermissionsBitField.Flags.ViewChannel))) {
                        gtaChannelCount += 1;
                    }
                })
                var gtaChannelNames = new Array(gtaChannelCount);
                var gtaChannelIDs = new Array(gtaChannelCount);
                var gtaChannelTypes = new Array(gtaChannelCount);
                interaction.guild.channels.cache.forEach(channel => {
                    if (((channel.type === 0) || (channel.type === 5)) && (!data.includes(channel.id)) && (channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages)) && (channel.permissionsFor(interaction.user.id).has(PermissionsBitField.Flags.ViewChannel))) {
                        gtaChannelNames.splice((channel.rawPosition), 1, channel.name);   //gtaChannelNames.push(channel.name); 
                        gtaChannelIDs.splice((channel.rawPosition), 1, channel.id); 	//gtaChannelIDs.push(channel.id);
                        gtaChannelTypes.splice((channel.rawPosition), 1, channel.type);	//gtaChannelTypes.push(channel.type);
                    }
                });
                //console.log(`gtaChannelCount: ${gtaChannelCount}`)
                //console.log(`gtaChannelNames[23]: ${gtaChannelNames[23]}`)

                let gtaStartMenu = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId(`gtaStartMenu - u:${interaction.user.id} - c:undefinedchannel`)
                            .setPlaceholder(`${selectChannel()}`)
                            .addOptions([{
                                label: `${noChannel()}`,
                                value: `gtaStartMenu - u:${interaction.user.id} - c:undefinedchannel`,
                            }])
                    )
                for (i = 0; i <= 23; i++) {
                    if ((gtaChannelNames[i] != undefined)) {
                        //console.log(`gtaChannelNames at ${i}: ${gtaChannelNames[i]}`);
                        gtaStartMenu.components[0].addOptions([{
                            label: `${gtaChannelNames[i]}`,
                            value: `gtaStartMenu2 - u:${interaction.user.id} - c:${gtaChannelIDs[i]}`,
                        }]);
                    }
                }

                let gtaStartMenu2 = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId(`gtaStartMenu2 - u:${interaction.user.id} - c:undefinedchannel`)
                            .setPlaceholder(`${selectChannel()}`)
                            .addOptions([{
                                label: `${noChannel()}`,
                                value: `gtaStartMenu - u:${interaction.user.id} - c:undefinedchannel`,
                            }])
                    )
                if (gtaChannelCount >= 24) {

                    for (i = 24; i <= 47; i++) {
                        if ((gtaChannelNames[i] != undefined)) {
                            //console.log(`gtaChannelNames at ${i}: ${gtaChannelNames[i]}`);
                            gtaStartMenu2.components[0].addOptions([{
                                label: `${gtaChannelNames[i]}`,
                                description: `${gtaChannelNames[i]}`,
                                value: `gtaStartMenu2 - u:${interaction.user.id} - c:${gtaChannelIDs[i]}`,
                            }]);
                        }
                    }

                    if (interaction.user.id === buttonUserID) {
                        await interaction.editReply({ embeds: [gtaStartEmbed], components: [gtaStartMenu, gtaStartMenu2, backButton] })
                            .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
                    }
                    else if (lang === "es") {
                        await interaction.editReply({ embeds: [gtaStartEmbedEs], components: [gtaStartMenu, gtaStartMenu2, backButtonEs] })
                            .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
                    } else {
                        await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
                    }

                } //end if gtaChannelCount >24
                else if (gtaChannelCount <= 23) { //if there are 23 channels or fewer


                    if (interaction.user.id === buttonUserID) {
                        await interaction.editReply({ embeds: [gtaStartEmbed], components: [gtaStartMenu, backButton] })
                            .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
                    } else {
                        await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
                    }

                } //end if there are fewer than 23 channels

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

            }); //end fs.readFile for GTADataBase.txt

        } // end if gtastart button




    },
};