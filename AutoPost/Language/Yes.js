const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG01 = require('../../events/LANG.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isButton()) { return };
        if (interaction.customId.startsWith(`yes - `)) {
            await interaction.deferUpdate();

            //stored language
            var lang = await LANG01.LANG(interaction);
            //console.log(`LANG:${await LANG.LANG(interaction)}`);		

            //user language
            var LANG02 = interaction.locale.toString().split("-");
            var LANG = LANG02[0];
            //console.log(`lang:${lang}`);	

            let menuChannelID01 = interaction.customId.split(`c:`);
            let menuChannelID = menuChannelID01[1];
            //console.log(`rdoStartMenu menuChannelID: ${menuChannelID}`)


            //BEGIN TRANSLATIONS

            function success() {
                if (LANG === "en") {
                    return `Success`;
                }
                else if (LANG === "es") {
                    return `Éxito`;
                }
                else if (LANG === "pt") {
                    return `Éxito`;
                }
                else if (LANG === "ru") {
                    return `Успех`;
                }
                else if (LANG === "de") {
                    return `Erfolg`;
                }
                else if (LANG === "pl") {
                    return `Powodzenie`;
                }
                else if (LANG === "fr") {
                    return `Succès`;
                }
                else if (LANG === "it") {
                    return `Successo`;
                }
                else if (LANG === "zh") {
                    return `成功`;
                }
                else if (LANG === "ja") {
                    return `成功`;
                }
                else if (LANG === "ko") {
                    return `성공`;
                }
                else {
                    return `Success`;
                }
            }

            function languageChangeDesc() {
                if (LANG === "en") {
                    return `The language for this server has been changed to English.`;
                }
                if (LANG === "es") {
                    return `El idioma de este servidor se ha cambiado al español.`;
                }
                if (LANG === "pt") {
                    return `O idioma deste servidor foi alterado para português.`;
                }
                if (LANG === "ru") {
                    return `Язык для этого сервера изменен на русский.`;
                }
                if (LANG === "de") {
                    return `Die Sprache für diesen Server wurde auf Deutsch umgestellt.`;
                }
                if (LANG === "pl") {
                    return `Język tego serwera został zmieniony na polski.`;
                }
                if (LANG === "fr") {
                    return `La langue de ce serveur a été changée en français.`;
                }
                if (LANG === "it") {
                    return `La lingua per questo server è stata modificata in francese.`;
                }
                if (LANG === "zh") {
                    return `此服務器的語言已更改為中文（繁體）。`;
                }
                if (LANG === "ja") {
                    return `このサーバーの言語は日本語に変更されました。`;
                }
                if (LANG === "ko") {
                    return `이 서버의 언어가 한국어로 변경되었습니다.`;
                }
                else {
                    return `The language for this server has been changed to English.`;
                }
            }

            function missingInfo() {
                if (LANG === "en") {
                    return "_ _";
                }
                if (LANG === "es") {
                    return `El idioma predeterminado es el inglés. Es posible que falte alguna información o que esté mal traducida.`;
                }
                if (LANG === "pt") {
                    return `O idioma padrão para este bot é o inglês. Algumas informações podem estar faltando ou mal traduzidas.`;
                }
                if (LANG === "ru") {
                    return `Язык по умолчанию для этого бота — английский. Некоторая информация может отсутствовать или быть неправильно переведена.`;
                }
                if (LANG === "de") {
                    return `Die Standardsprache für diesen Bot ist Englisch. Einige Informationen können fehlen oder falsch übersetzt werden.`;
                }
                if (LANG === "pl") {
                    return `Domyślnym językiem tego bota jest angielski. Niektórych informacji może brakować lub mogą być błędnie przetłumaczone.`;
                }
                if (LANG === "fr") {
                    return `La langue par défaut pour ce bot est l'anglais. Certaines informations peuvent être manquantes ou mal traduites.`;
                }
                if (LANG === "it") {
                    return `La lingua predefinita per questo bot è l'inglese. Alcune informazioni potrebbero essere mancanti o tradotte male.`;
                }
                if (LANG === "zh") {
                    return `此機器人的默認語言是英語。某些信息可能丟失或翻譯錯誤。`;
                }
                if (LANG === "ja") {
                    return `このボットのデフォルト言語は英語です。一部の情報が欠落しているか、誤訳されている可能性があります。`;
                }
                if (LANG === "ko") {
                    return `이 봇의 기본 언어는 영어입니다. 일부 정보가 누락되었거나 잘못 번역되었을 수 있습니다.`;
                }
                else {
                    return "_ _";
                }
            }

            function backButtonString() {
                if (LANG === "en") {
                    return `Go Back`;
                }
                else if (LANG === "es") {
                    return `Volver`;
                }
                else if (LANG === "pt") {
                    return `Voltar`;
                }
                else if (LANG === "ru") {
                    return `Вернуться`;
                }
                else if (LANG === "de") {
                    return `Zurück`;
                }
                else if (LANG === "pl") {
                    return `wróć`;
                }
                else if (LANG === "fr") {
                    return `Retournez`;
                }
                else if (LANG === "it") {
                    return `Torna all'ultima`;
                }
                else if (LANG === "zh") {
                    return `回去`;
                }
                else if (LANG === "ja") {
                    return `戻る`;
                }
                else if (LANG === "ko") {
                    return `돌아가다`;
                }
                else {
                    return `Go Back`;
                }
            }

            function autoPostTitle() {
                if (LANG === "en") {
                    return `Auto Post Settings`;
                }
                else if (LANG === "es") {
                    return `Configuración automática de publicaciones`;
                }
                else if (LANG === "pt") {
                    return `Configurações de mensagens automáticas`;
                }
                else if (LANG === "ru") {
                    return `автоматические настройки сообщений`;
                }
                else if (LANG === "de") {
                    return `Automatische Nachrichteneinstellungen`;
                }
                else if (LANG === "pl") {
                    return `Automatyczne ustawienia wiadomości`;
                }
                else if (LANG === "fr") {
                    return `Paramètres des messages automatisés`;
                }
                else if (LANG === "it") {
                    return `Impostazioni dei messaggi automatici`;
                }
                else if (LANG === "zh") {
                    return `自動消息設置`;
                }
                else if (LANG === "ja") {
                    return `自動メッセージ設定`;
                }
                else if (LANG === "ko") {
                    return `자동 메시지 설정`;
                }
                else {
                    return `Auto Post Settings`;
                }
            }

            function autoPostDesc() {
                if (LANG === "en") {
                    return `Click **${start()}** to add an auto post channel.
Click **${stop()}** to remove an auto post channel.
Click **${confirm()}** to view and test current settings.`;
                }
                else if (LANG === "es") {
                    return `Haga clic en **${start()}** para agregar un canal.
Haga clic en **${stop()}** para quitar un canal.
Haga clic en **${confirm()}** para ver y probar la configuración.`;
                }
                else if (LANG === "pt") {
                    return `Clique em **${start()}** para adicionar um canal.
Clique em **${stop()}** para remover um canal.
Clique em **${confirm()}** para exibir e testar as configurações atuais.`;
                }
                else if (LANG === "ru") {
                    return `Нажмите **${start()}**, чтобы добавить канал.
Нажмите **${stop()}**, чтобы исключить канал из автоматической публикации.
Нажмите **${confirm()}**, для просмотра и подтверждения настроек.`;
                }
                else if (LANG === "de") {
                    return `Klicken Sie auf **${start()}** so fügen Sie einen Kanal hinzu.
Klicken Sie auf **${stop()}** so entfernen Sie einen Kanal.
Klicken Sie auf **${confirm()}** um die aktuellen Einstellungen anzuzeigen und zu testen.`;
                }
                if (LANG === "pl") {
                    return `Kliknij **${start()}**, aby dodać automatyczny kanał wiadomości.
Kliknij **${stop()}**, aby usunąć automatyczny kanał wiadomości.
Kliknij **${confirm()}**, aby wyświetlić i przetestować ustawienia.`;
                }
                if (LANG === "fr") {
                    return `Cliquez sur **${start()}** pour ajouter un canal de messagerie automatique.
Cliquez sur **${stop()}** pour supprimer un canal de messagerie automatique.
Cliquez sur **${confirm()}** pour afficher et tester les paramètres.`;
                }
                if (LANG === "it") {
                    return `Fai clic su **${start()}** per aggiungere un canale di messaggio automatico.
Fai clic su **${stop()}** per rimuovere un canale di messaggio automatico.
Fai clic su **${confirm()}** per visualizzare e testare le impostazioni.`;
                }
                if (LANG === "zh") {
                    return `單擊 **${start()}** 添加自動消息通道。
單擊 **${stop()}** 刪除自動消息通道。
單擊 **${confirm()}** 查看和測試設置。`;
                }
                if (LANG === "ja") {
                    return `**${start()}** をクリックして、自動メッセージ チャネルを追加します。
**${stop()}** をクリックして、自動メッセージ チャネルを削除します。
**${confirm()}** をクリックして、設定を確認してテストします。`;
                }
                if (LANG === "ko") {
                    return `자동 메시지 채널을 추가하려면 **${start()}**을(를) 클릭하십시오.
자동 메시지 채널을 제거하려면 **${stop()}**을(를) 클릭하십시오.
설정을 검토하고 테스트하려면 **${confirm()}**을(를) 클릭하십시오.`;
                }
                else {
                    return `Click **Start** to add an auto post channel.
Click **Stop** to remove an auto post channel.
Click **Confirm** to view and test current settings.`;
                }
            }

            function footerText() {
                if (LANG === "en") {
                    return `Only Administrators can start or stop auto posts.`;
                }
                else if (LANG === "es") {
                    return `Solo los administradores pueden iniciar o detener publicaciones automáticas.`;
                }
                else if (LANG === "pt") {
                    return `Somente Administradores podem iniciar ou interromper postagens automáticas.`;
                }
                else if (LANG === "ru") {
                    return `Только администраторы могут запускать или останавливать автоматические публикации.`;
                }
                else if (LANG === "de") {
                    return `Nur Administratoren können automatische Beiträge starten oder stoppen.`;
                }
                if (LANG === "pl") {
                    return `Tylko administratorzy mogą uruchamiać i zatrzymywać wiadomości automatyczne.`;
                }
                if (LANG === "fr") {
                    return `Seuls les administrateurs peuvent démarrer ou arrêter les messages automatiques.`;
                }
                if (LANG === "it") {
                    return `Solo gli amministratori possono avviare o interrompere i messaggi automatici.`;
                }
                if (LANG === "zh") {
                    return `只有管​​理員可以啟動或停止自動消息.`;
                }
                if (LANG === "ja") {
                    return `管理者のみが自動メッセージを開始または停止できます.`;
                }
                if (LANG === "ko") {
                    return `관리자만 자동 메시지를 시작하거나 중지할 수 있습니다.`;
                }
                else {
                    return `Only Administrators can start or stop auto posts.`;
                }
            }

            function start() {
                if (LANG === "en") {
                    return `Start`;
                }
                else if (LANG === "es") {
                    return `Empezar`;
                }
                else if (LANG === "pt") {
                    return `Começar`;
                }
                else if (LANG === "ru") {
                    return `Старт`;
                }
                else if (LANG === "de") {
                    return `Anfangen`;
                }
                if (LANG === "pl") {
                    return `Początek`;
                }
                if (LANG === "fr") {
                    return `Commencer`;
                }
                if (LANG === "it") {
                    return `Inizio`;
                }
                if (LANG === "zh") {
                    return `開始`;
                }
                if (LANG === "ja") {
                    return `始める`;
                }
                if (LANG === "ko") {
                    return `시작`;
                }
                else {
                    return `Start`;
                }
            }

            function stop() {
                if (LANG === "en") {
                    return `Stop`;
                }
                else if (LANG === "es") {
                    return `Detener`;
                }
                else if (LANG === "pt") {
                    return `Parar`;
                }
                else if (LANG === "ru") {
                    return `Стоп`;
                }
                else if (LANG === "de") {
                    return `Aufhören`;
                }
                if (LANG === "pl") {
                    return `Usunąć`;
                }
                if (LANG === "fr") {
                    return `Arrêt`;
                }
                if (LANG === "it") {
                    return `Fermare`;
                }
                if (LANG === "zh") {
                    return `停止`;
                }
                if (LANG === "ja") {
                    return `ストップ`;
                }
                if (LANG === "ko") {
                    return `멈추다`;
                }
                else {
                    return `Stop`;
                }
            }

            function confirm() { //fixme - add translations
                if (LANG === "en") {
                    return `Confirm`;
                }
                else if (LANG === "es") {
                    return `Confirmar`;
                }
                else if (LANG === "pt") {
                    return `Confirmar`;
                }
                else if (LANG === "ru") {
                    return `Подтвердить`;
                }
                else if (LANG === "de") {
                    return `Bestätigen`;
                }
                if (LANG === "pl") {
                    return `Potwierdzać`;
                }
                if (LANG === "fr") {
                    return `Confirmer`;
                }
                if (LANG === "it") {
                    return `Confermare`;
                }
                if (LANG === "zh") {
                    return `確認`;
                }
                if (LANG === "ja") {
                    return `確認`;
                }
                if (LANG === "ko") {
                    return `확인하다`;
                }
                else {
                    return `Confirm`;
                }
            }

            //END TRANSLATIONS						

            //send language change confirmation as a followUp
            const languageEmbed = new EmbedBuilder()
                .setColor(0x0FFF00) //Green
                .setTitle(`${success()}`)
                .setDescription(`${languageChangeDesc()}`)
                .setFooter({ text: `${missingInfo()}`, iconURL: process.env.logo_link });

            const languageEmbedEn = new EmbedBuilder()
                .setColor(0x0FFF00) //Green
                .setTitle(`Success!`)
                .setDescription(`${languageChangeDesc()}`)


            //then edit OG /autopost embed with user LANG
            const initialEmbed = new EmbedBuilder()
                .setColor(0x00FFCC) //Seafoam green
                .setTitle(`${autoPostTitle()}`)
                .setDescription(`${autoPostDesc()}`)
                .setFooter({ text: `${footerText()}`, iconURL: process.env.logo_link })

            const initialButtons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`start - ${interaction.user.id}`)
                        .setLabel(`${start()}`)
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId(`stop - ${interaction.user.id}`)
                        .setLabel(`${stop()}`)
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId(`confirm - ${interaction.user.id}`)
                        .setLabel(`${confirm()}`)
                        .setStyle(ButtonStyle.Secondary),
                );

            if (LANG === "en") { //remove language if English
                fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
                    if (err) { console.log(`Error: ${err}`) }
                    else {
                        fs.writeFile('./LANGDataBase.txt', `${data.replace(`guild:${interaction.guild.id} - lang:${lang} - \n`, "")}`, function (err) {
                            if (err) throw err;
                            interaction.followUp({ embeds: [languageEmbedEn], ephemeral: true })
                                .catch(err => console.log(`languageEmbed Error: ${err.stack}`));
                            interaction.editReply({ embeds: [initialEmbed], components: [initialButtons] }).catch(err => console.log(`yes initialEmbed Error: ${err.stack}`));
                            if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
                                console.log(`You changed the server language to ${LANG} in ${interaction.guild.id}.`);
                            }
                            else {
                                console.log(`A user changed the server language to ${LANG} in ${interaction.guild.id}.`);
                            }
                        }); //end fs:writeFile to change server language to spanish	
                    }
                }); //end fs.readFile for LANGDataBase.txt						
            }
            else if (lang === "") {
                fs.appendFile(`./LANGDataBase.txt`, `guild:${interaction.guild.id} - lang:${LANG} - \n`, err => {
                    if (err) {
                        console.error(err);
                        throw err;
                    }
                    else {
                        interaction.followUp({ embeds: [languageEmbed], ephemeral: true })
                            .catch(err => console.log(`languageEmbed Error: ${err.stack}`));
                        interaction.editReply({ embeds: [initialEmbed], components: [initialButtons] }).catch(err => console.log(`yes initialEmbed Error: ${err.stack}`));
                        if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
                            console.log(`You added ${LANG} as the server language in ${interaction.guild.id}.`);
                        }
                        else {
                            console.log(`A user added ${LANG} as the server language in ${interaction.guild.id}.`);
                        }
                    }
                }); // end fs:appendFile to add server language to spanish				
            }
            else if (lang !== "en") {
                fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
                    if (err) { console.log(`Error: ${err}`) }
                    else {
                        fs.writeFile('./LANGDataBase.txt', `${data.replace(`guild:${interaction.guild.id} - lang:${lang} - `, `guild:${interaction.guild.id} - lang:${LANG} - `)}`, function (err) {
                            if (err) throw err;
                            interaction.followUp({ embeds: [languageEmbed], ephemeral: true })
                                .catch(err => console.log(`languageEmbed Error: ${err.stack}`));
                            interaction.editReply({ embeds: [initialEmbed], components: [initialButtons] }).catch(err => console.log(`yes initialEmbed Error: ${err.stack}`));
                            if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
                                console.log(`You changed the server language to ${LANG}.`);
                            }
                            else {
                                console.log(`A user changed the server language to ${LANG}.`);
                            }
                        }); //end fs:writeFile to change server language to spanish	
                    }
                }); //end fs.readFile for LANGDataBase.txt				
            }

        } // end if yes button


    },
};