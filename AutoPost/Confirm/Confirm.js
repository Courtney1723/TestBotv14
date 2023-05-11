const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isButton()) { return };
        if (interaction.customId.startsWith(`confirm - `)) {
            //console.log(`begin start: '${interaction.customId}'`);

            let buttonUserID01 = (interaction.customId).split("confirm - ");
            let buttonUserID = buttonUserID01[1];
            //console.log(`buttonUserID: ${buttonUserID}`);
            //console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)

            var lang = await LANG.LANG(interaction);
            //console.log(`LANG:${await LANG.LANG(interaction)}`);	

            let channelIDArray = [];
            interaction.guild.channels.cache.forEach(channel => { //populates channelIDArray with the server text channels
                if ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) { //if channel is a text or annoucement channel
                    channelIDArray.push(`${channel.id}`);
                }
            });
            //console.log(`channelIDArray: ${channelIDArray}`);			

            let GTAConfirmString = "";
            fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) { //Starts Populating subscribed GTA channels
                if (err) { console.log(`Error: ${err}`) } //If an error, console.log
                else {
                    //console.log(`data: ${data}`);
                    for (i = 0; i <= channelIDArray.length - 1; i++) {
                        if (data.includes(`${channelIDArray[i]}`)) { //If the GTADataBase.txt contains a channel in the interaction guild
                            GTAConfirmString += `• <#${channelIDArray[i]}>\n`;
                            //console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
                            //console.log(`GTAConfirmString at ${i}: ${GTAConfirmString}`);	
                        }
                    }
                }
                //console.log(`GTAConfirmString: ${GTAConfirmString}`);	
                var subscriptionCheckGTA = false;
                if (!GTAConfirmString.includes('• ')) {
                    var subscriptionCheckGTA = true;
                    if (lang === "en") {
                        GTAConfirmString += `• There are no channels subscribed to GTA Online.\n`;
                    }
                    else if (lang === "es") {
                        GTAConfirmString += `• No hay canales suscritos a GTA Online.\n`;
                    }
                    else if (lang === "pt") {
                        GTAConfirmString += `• Não há canais inscritos no GTA Online.\n`;
                    }
                    else if (lang === "ru") {
                        GTAConfirmString += `• Нет каналов, подписанных на GTA Online.\n`;
                    }
                    else if (lang === "de") {
                        GTAConfirmString += `• Es sind keine Kanäle bei GTA Online abonniert.\n`;
                    }
                    else if (lang === "pl") {
                        GTAConfirmString += `• Brak kanałów subskrybowanych w GTA Online.\n`;
                    }
                    else if (lang === "fr") {
                        GTAConfirmString += `• Il n'y a aucune chaîne abonnée à GTA Online.\n`;
                    }
                    else if (lang === "it") {
                        GTAConfirmString += `• Non ci sono canali abbonati a GTA Online.\n`;
                    }
                    else if (lang === "zh") {
                        GTAConfirmString += `• 沒有訂閱 GTA 在線模式的頻道。\n`;
                    }
                    else if (lang === "ja") {
                        GTAConfirmString += `• GTA Online を購読しているチャンネルはありません。\n`;
                    }
                    else if (lang === "ko") {
                        GTAConfirmString += `• GTA 온라인을 구독하는 채널이 없습니다.\n`;
                    }
                    else {
                        GTAConfirmString += `• There are no channels subscribed to GTA Online.\n`;
                    }
                }

                let RDOConfirmString = "";
                fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
                    if (err) { console.log(`Error: ${err}`) } //If an error, console.log
                    else {
                        //console.log(`data: ${data}`);
                        for (i = 0; i <= channelIDArray.length - 1; i++) {
                            if (data.includes(`${channelIDArray[i]}`)) { //If the GTADataBase.txt contains a channel in the interaction guild
                                RDOConfirmString += `• <#${channelIDArray[i]}>\n`;
                                //console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
                                //console.log(`RDOConfirmString at ${i}: ${RDOConfirmString}`);	
                            }
                        }
                    }
                    //console.log(`RDOConfirmString: ${RDOConfirmString}`);	
                    var subscriptionCheckRDO = false;
                    if (!RDOConfirmString.includes('• ')) {
                        var subscriptionCheckRDO = true;
                        if (lang === "en") {
                            RDOConfirmString += `• There are no channels in this server subscribed to Red Dead Online.\n`;
                        }
                        else if (lang === "es") {
                            RDOConfirmString += `• No hay canales suscritos a Red Dead Online.\n`;
                        }
                        else if (lang === "pt") {
                            RDOConfirmString += `• Não há canais inscritos no Red Dead Online.\n`;
                        }
                        else if (lang === "ru") {
                            RDOConfirmString += `• Нет каналов, подписанных на Red Dead Online.\n`;
                        }
                        else if (lang === "de") {
                            RDOConfirmString += `• Es gibt keine Kanäle, die Red Dead Online abonniert haben.\n`;
                        }
                        else if (lang === "pl") {
                            RDOConfirmString += `• Brak kanałów subskrybowanych w Red Dead Online.\n`;
                        }
                        else if (lang === "fr") {
                            RDOConfirmString += `• Il n'y a aucune chaîne abonnée à Red Dead Online.\n`;
                        }
                        else if (lang === "it") {
                            RDOConfirmString += `• Non ci sono canali abbonati a Red Dead Online.\n`;
                        }
                        else if (lang === "zh") {
                            RDOConfirmString += `• 沒有訂閱 Red Dead 在線模式的頻道。\n`;
                        }
                        else if (lang === "ja") {
                            RDOConfirmString += `• Red Dead Online を購読しているチャンネルはありません。\n`;
                        }
                        else if (lang === "ko") {
                            RDOConfirmString += `• Red Dead 온라인을 구독하는 채널이 없습니다.\n`;
                        }
                        else {
                            RDOConfirmString += `• There are no channels in this server subscribed to Red Dead Online.\n`;
                        }
                    }

                    function confirmTitleString() {
                        if (lang === "en") {
                            return `Auto Posts`;
                        }
                        else if (lang === "es") {
                            return `Automática de publicaciones`;
                        }
                        else if (lang === "pt") {
                            return `Mensagens Automatizadas`;
                        }
                        else if (lang === "ru") {
                            return `Автоматические сообщения`;
                        }
                        else if (lang === "de") {
                            return `Automatisierte Nachrichten`;
                        }
                        else if (lang === "pl") {
                            return `Zautomatyzowane wiadomości`;
                        }
                        else if (lang === "fr") {
                            return `Messages automatisés`;
                        }
                        else if (lang === "it") {
                            return `Messaggi automatici`;
                        }
                        else if (lang === "zh") {
                            return `自動消息`;
                        }
                        else if (lang === "ja") {
                            return `自動メッセージ`;
                        }
                        else if (lang === "ko") {
                            return `자동화된 메시지`;
                        }
                        else {
                            return `Auto Posts`;
                        }
                    }

                    function everyThursday() {
                        if (subscriptionCheckGTA === false) {
                            if (lang === "en") {
                                return `\nEvery Thursday at 2:00 PM EST`;
                            }
                            else if (lang === "es") {
                                return `\nTodos los jueves a las 14:00 hora del este`;
                            }
                            else if (lang === "pt") {
                                return `\nTodas as quintas-feiras às 14:00 Hora do Leste`;
                            }
                            else if (lang === "ru") {
                                return `\nКаждый четверг в 14:00 по восточному времени`;
                            }
                            else if (lang === "de") {
                                return `\nJeden Donnerstag um 14:00 Uhr Ostküsten-Standardzeit (Nordamerika)`;
                            }
                            else if (lang === "pl") {
                                return `\nW każdy czwartek o godzinie 14:00 czasu wschodnioamerykańskiego`;
                            }
                            else if (lang === "fr") {
                                return `\nTous les jeudis à 14h00, heure normale de l'Est`;
                            }
                            else if (lang === "it") {
                                return `\nOgni giovedì alle 14:00 ora standard orientale`;
                            }
                            else if (lang === "zh") {
                                return `\n東部時間每週四 14:00`;
                            }
                            else if (lang === "ja") {
                                return `\n毎週木曜日 14:00 東部標準時`;
                            }
                            else if (lang === "ko") {
                                return `\n매주 목요일 동부 표준시 14:00`;
                            }
                            else {
                                return `\nEvery Thursday at 2:00 PM EST`;
                            }
                        }
                        else {
                            return "";
                        }
                    }

                    function firstTuesday() {
                        if (subscriptionCheckRDO === false) {
                            if (lang === "en") {
                                return `\nThe first Tuesday of every month at 2:00 PM EST`;
                            }
                            else if (lang === "es") {
                                return `\nEl primer martes de cada mes a las 14:00 hora del este`;
                            }
                            else if (lang === "pt") {
                                return `\nA primeira terça-feira de cada mês às 14:00 Hora do Leste`;
                            }
                            else if (lang === "ru") {
                                return `\nB первый вторник каждого месяца в 14:00 по восточному времени`;
                            }
                            else if (lang === "de") {
                                return `\nJeden ersten Dienstag im Monat um 14:00 Uhr Ostküsten-Standardzeit (Nordamerika)`;
                            }
                            else if (lang === "pl") {
                                return `\nPierwszy wtorek każdego miesiąca o godzinie 14:00 czasu wschodniego`;
                            }
                            else if (lang === "fr") {
                                return `\nLe premier mardi de chaque mois à 14h00 heure de l'Est`;
                            }
                            else if (lang === "it") {
                                return `\nIl primo martedì di ogni mese alle 14:00 ora orientale`;
                            }
                            else if (lang === "zh") {
                                return `\n每個月的第一個星期二東部標準時間 14:00`;
                            }
                            else if (lang === "ja") {
                                return `\n毎月第 1 火曜日の東部時間 14:00`;
                            }
                            else if (lang === "ko") {
                                return `\n매월 첫 번째 화요일 14:00 동부 표준시`;
                            }
                            else {
                                return `\nThe first Tuesday of every month at 2:00 PM EST`;
                            }
                        }
                        else {
                            return "";
                        }
                    }

                    function testTitleString() {
                        if (lang === "en") {
                            return `Test Auto Posts`;
                        }
                        else if (lang === "es") {
                            return `Probar publicaciones automáticas`;
                        }
                        else if (lang === "pt") {
                            return `Testar publicações automáticas`;
                        }
                        else if (lang === "ru") {
                            return `Протестируйте автоматические публикации`;
                        }
                        else if (lang === "de") {
                            return `Testen Sie automatische Beiträge`;
                        }
                        else if (lang === "pl") {
                            return `Testuj zautomatyzowane wiadomości`;
                        }
                        else if (lang === "fr") {
                            return `Tester les publications automatiques`;
                        }
                        else if (lang === "it") {
                            return `Prova i post automatici`;
                        }
                        else if (lang === "zh") {
                            return `測試自動發布`;
                        }
                        else if (lang === "ja") {
                            return `自動メッセージのテスト`;
                        }
                        else if (lang === "ko") {
                            return `자동 게시 테스트`;
                        }
                        else {
                            return `Test Auto Posts`;
                        }
                    }

                    function testGTAString() {
                        if (lang === "en") {
                            return `Click **Test GTA** to send a test post to your subscribed GTA Online channels.`;
                        }
                        else if (lang === "es") {
                            return `Haga clic en **Preuba GTA** para enviar una publicación de prueba a sus canales de GTA Online suscritos.`;
                        }
                        else if (lang === "pt") {
                            return `Clique em **Testar GTA** para enviar uma postagem de teste para seus canais GTA inscritos.`;
                        }
                        else if (lang === "ru") {
                            return `Щелчок **Тест GTA** для того, чтобы отправить тестовое сообщение на подписанные каналы GTA Online.`;
                        }
                        else if (lang === "de") {
                            return `Klicken Sie auf **GTA testen**, um einen Testbeitrag an Ihre abonnierten GTA-Kanäle zu senden.`;
                        }
                        else if (lang === "pl") {
                            return `Kliknij **Testuj GTA**, aby wysłać post testowy do subskrybowanych kanałów GTA Online.`;
                        }
                        else if (lang === "fr") {
                            return `Cliquez sur **Tester GTA** pour envoyer une publication test aux chaînes GTA Online auxquelles vous êtes abonné.`;
                        }
                        else if (lang === "it") {
                            return `Fai clic su **Prova GTA** per inviare un post di prova ai canali di GTA Online a cui sei iscritto.`;
                        }
                        else if (lang === "zh") {
                            return `單擊 **測試 GTA** 將測試帖子發送到您訂閱的 GTA 在線模式頻道。`;
                        }
                        else if (lang === "ja") {
                            return `[テストGTA] をクリックして、サブスクライブしている GTA オンライン チャンネルにテスト投稿を送信します。`;
                        }
                        else if (lang === "ko") {
                            return `구독한 GTA 온라인 채널에 테스트 게시물을 보내려면 **테스트 GTA**을(를) 클릭하십시오.`;
                        }
                        else {
                            return `Click **Test GTA** to send a test post to your subscribed GTA Online channel(s).`;
                        }
                    }

                    function testRDOString() {
                        if (lang === "en") {
                            return `Click **Test RDO** to send a test post to your subscribed Red Dead Online channels.`;
                        }
                        else if (lang === "es") {
                            return `Haga clic en **Prueba RDO** para enviar una publicación de prueba a sus canal(es) RDO suscritos.`;
                        }
                        else if (lang === "pt") {
                            return `Clique em **Testar RDO** para enviar uma postagem de teste para seus canais RDO inscritos.`;
                        }
                        else if (lang === "ru") {
                            return `Щелчок **Тест RDO** для того, чтобы отправить тестовое сообщение на подписанные каналы RDO.`;
                        }
                        else if (lang === "de") {
                            return `Klicken Sie auf **RDO testen**, um einen Testbeitrag an Ihre abonnierten RDO-Kanäle zu senden.`;
                        }
                        else if (lang === "pl") {
                            return `Kliknij **Testuj RDO**, aby wysłać post testowy do subskrybowanych kanałów Red Dead Online.`;
                        }
                        else if (lang === "fr") {
                            return `Cliquez sur **Tester RDO** pour envoyer une publication test aux chaînes Red Dead Online auxquelles vous êtes abonné.`;
                        }
                        else if (lang === "it") {
                            return `Fai clic su **Prova RDO** per inviare un post di prova ai canali di Red Dead Online a cui sei iscritto.`;
                        }
                        else if (lang === "zh") {
                            return `單擊 **測試 RDO** 將測試帖子發送到您訂閱的 Red Dead 在線模式頻道。`;
                        }
                        else if (lang === "ja") {
                            return `[テストRDO] をクリックして、サブスクライブしている Red Dead オンライン チャンネルにテスト投稿を送信します。`;
                        }
                        else if (lang === "ko") {
                            return `구독한 Red Dead 온라인 채널에 테스트 게시물을 보내려면 **테스트 RDO**을(를) 클릭하세요.`;
                        }
                        else {
                            return `Click **Test RDO** to send a test post to your subscribed Red Dead Online channels.`;
                        }
                    }

                    function footerString() {
                        if (lang === "en") {
                            return `Only administrators can test auto posts.`;
                        }
                        else if (lang === "es") {
                            return `Debes ser administrador para probar las publicaciones automatizadas.`;
                        }
                        else if (lang === "pt") {
                            return `Você deve ser um administrador para testar postagens automatizadas.`;
                        }
                        else if (lang === "ru") {
                            return `Вы должны быть администратором, чтобы тестировать автоматические сообщения.`;
                        }
                        else if (lang === "de") {
                            return `Sie müssen ein Administrator sein, um automatisierte Posts zu testen`;
                        }
                        else if (lang === "pl") {
                            return `Aby przetestować wiadomości automatyczne, musisz być administratorem.`;
                        }
                        else if (lang === "fr") {
                            return `Vous devez être administrateur pour tester les messages automatisés.`;
                        }
                        else if (lang === "it") {
                            return `Devi essere un amministratore per testare i messaggi automatici.`;
                        }
                        else if (lang === "zh") {
                            return `只有管理員可以測試自動消息`;
                        }
                        else if (lang === "ja") {
                            return `管理者のみが自動メッセージをテストできます`;
                        }
                        else if (lang === "ko") {
                            return `관리자만 자동 게시물을 테스트할 수 있습니다.`;
                        }
                        else {
                            return `You must be an administrator to test auto posts.`;
                        }
                    }

                    function testGTAButtonString() {
                        if (lang === "en") {
                            return `Test GTA`;
                        }
                        else if (lang === "es") {
                            return `Prueba GTA`;
                        }
                        else if (lang === "pt") {
                            return `Testar GTA`;
                        }
                        else if (lang === "ru") {
                            return `Тест GTA`;
                        }
                        else if (lang === "de") {
                            return `GTA testen`;
                        }
                        else if (lang === "pl") {
                            return `Testuj GTA`;
                        }
                        else if (lang === "fr") {
                            return `Tester GTA`;
                        }
                        else if (lang === "it") {
                            return `Prova GTA`;
                        }
                        else if (lang === "zh") {
                            return `測試 GTA`;
                        }
                        else if (lang === "ja") {
                            return `テストGTA`;
                        }
                        else if (lang === "ko") {
                            return `테스트 GTA`;
                        }
                        else {
                            return `Test GTA`;
                        }
                    }

                    function testRDOButtonString() {
                        if (lang === "en") {
                            return `Test RDO`;
                        }
                        else if (lang === "es") {
                            return `Prueba RDO`;
                        }
                        else if (lang === "pt") {
                            return `Testar RDO`;
                        }
                        else if (lang === "ru") {
                            return `Тест RDO`;
                        }
                        else if (lang === "de") {
                            return `RDO testen`;
                        }
                        else if (lang === "pl") {
                            return `Testuj RDO`;
                        }
                        else if (lang === "fr") {
                            return `Tester RDO`;
                        }
                        else if (lang === "it") {
                            return `Prova RDO`;
                        }
                        else if (lang === "zh") {
                            return `測試 RDO`;
                        }
                        else if (lang === "ja") {
                            return `テストRDO`;
                        }
                        else if (lang === "ko") {
                            return `테스트 RDO`;
                        }
                        else {
                            return `Test RDO`;
                        }
                    }

                    function backButtonString() {
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



                    const confirmEmbed = new EmbedBuilder()
                        .setColor(0x00B9FF)
                        .setTitle(`${confirmTitleString()}`)
                        .setDescription(`
**__GTA Online__**${everyThursday()}
${GTAConfirmString}
**__Red Dead Online__**${firstTuesday()}
${RDOConfirmString}
**__${testTitleString()}__**
• ${testGTAString()}
• ${testRDOString()}`)
                        .setFooter({ text: `${footerString()}`, iconURL: process.env.logo_link });


                    const confirmButtons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`gtaTest - ${interaction.user.id}`)
                                .setLabel(`${testGTAButtonString()}`)
                                .setStyle(ButtonStyle.Success)
                                .setDisabled(subscriptionCheckGTA),
                            new ButtonBuilder()
                                .setCustomId(`rdoTest - ${interaction.user.id}`)
                                .setLabel(`${testRDOButtonString()}`)
                                .setStyle(ButtonStyle.Danger)
                                .setDisabled(subscriptionCheckRDO),
                            new ButtonBuilder()
                                .setCustomId(`confirmback - ${interaction.user.id}`)
                                .setLabel(`${backButtonString()}`)
                                .setStyle(ButtonStyle.Secondary),
                        );

                    await interaction.deferUpdate();
                    if (interaction.user.id === buttonUserID) {
                        await interaction.editReply({ embeds: [confirmEmbed], components: [confirmButtons] }).catch(err => { console.log(`confirmEmbed Error: ${err}`) });
                    }
                    else {
                        await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
                    }


                }); //end fs.readFile RDODataBase
            }); //end fs.readFile GTADataBase	

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

        } //end if start
    },
};