const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');
const NEXT_BONUS = require('../../events/nextBonus.js');

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
						var nextBONUSRDO = await NEXT_BONUS.nextBonus("rdo");
						//console.log(`rdo: ${nextBONUSRDO}`);						

            function rdoStartTitle() {
                if (lang === "") {
                    return `Start Auto Posting Red Dead Online Bonuses`;
                }
                else if (lang === "es") {
                    return `Comience a publicar automáticamente bonos y descuentos de Red Dead Online`;
                }
                else if (lang === "br") {
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
                    return `开始自动发送 Red Dead 在线模式奖励`;
                }
                else if (lang === "tw") {
                    return `開始自動發送 Red Dead 在線模式獎勵`;
                }
                else if (lang === "jp") {
                    return `Red Dead Online ボーナスの自動送信を開始する`;
                }
                else if (lang === "kr") {
                    return `Red Dead 온라인 보너스 자동 전송 시작`;
                }
                else {
                    return `Start automatically publishing Red Dead Online bonuses`;
                }
            }

            function rdoStartDesc() {
                if (lang === "") {
                    return `Click **the dropdown menu** to confirm the channel you want to send Red Dead Online Auto Posts to every month.\nNext Update: <t:${Math.round(nextBONUSRDO / 1000)}:F>`;
                }
                if (lang === "es") {
                    return `Haga clic en el menú desplegable para confirmar el canal al que desea enviar actualizaciones automáticas de Red Dead Online cada mes.\nPróxima actualización: <t:${Math.round(nextBONUSRDO / 1000)}:F>`;
                }
                if (lang === "br") {
                    return `Clique no menu suspenso para confirmar o canal para o qual você deseja enviar atualizações automáticas do Red Dead Online a cada mês.\nPróxima atualização: <t:${Math.round(nextBONUSRDO / 1000)}:F>`;
                }
                if (lang === "ru") {
                    return `Щелкните раскрывающееся меню, чтобы подтвердить канал, на который вы хотите ежемесячно отправлять автоматические обновления Red Dead Online.\nСледующее обновление: <t:${Math.round(nextBONUSRDO / 1000)}:F>`;
                }
                if (lang === "de") {
                    return `Klicken Sie auf das Dropdown-Menü, um den Kanal zu bestätigen, an den Sie jeden Monat automatische Red Dead Online-Updates senden möchten.\nNächstes Update: <t:${Math.round(nextBONUSRDO / 1000)}:F>`;
                }
                else if (lang === "pl") {
                    return `Kliknij menu rozwijane, aby potwierdzić kanał, na który chcesz co miesiąc wysyłać automatyczne aktualizacje Red Dead Online.\nNastępna aktualizacja: <t:${Math.round(nextBONUSRDO / 1000)}:F>`;
                }
                else if (lang === "fr") {
                    return `Cliquez sur le menu déroulant pour confirmer la chaîne à laquelle vous souhaitez envoyer des mises à jour automatiques de Red Dead Online chaque mois.\nProchaine mise à jour : <t:${Math.round(nextBONUSRDO / 1000)}:F>`;
                }
                else if (lang === "it") {
                    return `Fai clic sul menu a discesa per confermare il canale a cui desideri inviare gli aggiornamenti automatici di Red Dead Online ogni mese.\nProssimo aggiornamento: <t:${Math.round(nextBONUSRDO / 1000)}:F>`;
                }
								else if (lang === "zh") {
                    return `单击下拉菜单确认您想要每月自动发送 Red Dead 在线模式更新的频道。\n下次更新：<t:${Math.round(nextBONUSRDO / 1000)}:F>`;
                }
                else if (lang === "tw") {
                    return `單擊下拉菜單確認您想要每月自動發送 Red Dead 在線模式更新的頻道。\n下次更新：<t:${Math.round(nextBONUSRDO / 1000)}:F>`;
                }
                else if (lang === "jp") {
                    return `ドロップダウン メニューをクリックして、レッド デッド オンラインの自動アップデートを毎月送信するチャネルを確認します。\n次回の更新: <t:${Math.round(nextBONUSRDO / 1000)}:F>`;
                }
                else if (lang === "kr") {
                    return `드롭다운 메뉴를 클릭하여 매달 자동 Red Dead 온라인 업데이트를 보낼 채널을 확인하세요.\n다음 업데이트: <t:${Math.round(nextBONUSRDO / 1000)}:F>`;
                }
                else {
                    return `Click **the dropdown menu** to confirm the channel you want to send Red Dead Online Auto Posts to every month.\nNext Update: <t:${Math.round(nextBONUSRDO / 1000)}:F>`;
                }
            }

            function rdoStartFooter() {
                if (lang === "") {
                    return `Auto posts can only be sent to text channels.`;
                }
                if (lang === "es") {
                    return `Los mensajes automatizados solo se pueden enviar a canales de texto.`;
                }
                if (lang === "br") {
                    return `As mensagens automáticas só podem ser enviadas para canais de texto.`;
                }
                if (lang === "ru") {
                    return `Автоматические сообщения можно отправлять только в текстовые каналы.`;
                }
                if (lang === "de") {
                    return `Automatisierte Nachrichten können nur an Textkanäle gesendet werden.`;
                }
                else if (lang === "pl") {
                    return `Automatyczne wiadomości mogą być wysyłane tylko do kanałów tekstowych.`;
                }
                else if (lang === "fr") {
                    return `Les messages automatisés ne peuvent être envoyés qu'aux canaux de texte.`;
                }
                else if (lang === "it") {
                    return `I messaggi automatici possono essere inviati solo ai canali di testo.`;
                }
								else if (lang === "zh") {
                    return `自动消息只能发送到文本渠道。`;
                }
                else if (lang === "tw") {
                    return `自動消息只能發送到文本渠道。`;
                }
                else if (lang === "jp") {
                    return `Automated messages can only be sent to text channels.`;
                }
                else if (lang === "kr") {
                    return `자동 메시지는 텍스트 채널로만 보낼 수 있습니다.`;
                }
                else {
                    return `Auto posts can only be sent to text channels.`;
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

            const rdoStartEmbed = new EmbedBuilder()
                .setColor(0x00FF00) //Green
                .setTitle(`${rdoStartTitle()}`)
                .setDescription(`${rdoStartDesc()}`)
                .setFooter({ text: `${rdoStartFooter()}`, iconURL: process.env.logo_link });

            fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
                if (err) { console.log(`Error: ${err}`) } //If an error, console.log						

                let rdoChannelCount = 0;
                interaction.guild.channels.cache.forEach(channel => {
                    if ( ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) && (!data.includes(channel.id)) ) {
                        rdoChannelCount += 1;
                    }
                })
                var rdoChannelNames = new Array(rdoChannelCount);
                var rdoChannelIDs = new Array(rdoChannelCount);
                var rdoChannelTypes = new Array(rdoChannelCount);
                interaction.guild.channels.cache.forEach(channel => {
                    if ( ((channel.type === 0) || (channel.type === 5)) && (!data.includes(channel.id)) ) {
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

            }); //end fs.readFile for RDODataBase.txt
        } // end if rdostart button


    },
};