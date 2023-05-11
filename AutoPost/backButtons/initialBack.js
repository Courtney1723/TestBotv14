const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG01 = require('../../events/LANG.js');


module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isButton()) { return };
        if ((interaction.customId.startsWith(`startback -`)) || (interaction.customId.startsWith(`stopback -`)) || (interaction.customId.startsWith(`confirmback -`))) {
            await interaction.deferUpdate();

            let start_stop_confirm = "";
            if (interaction.customId.startsWith(`startback -`)) {
                start_stop_confirm += 'start';
            }
            else if (interaction.customId.startsWith(`stopback -`)) {
                start_stop_confirm += 'stop';
            }
            else if (interaction.customId.startsWith(`confirmback -`)) {
                start_stop_confirm += 'confirm';
            }

            let buttonUserID01 = (interaction.customId).split(`${start_stop_confirm}back - `);
            let buttonUserID = buttonUserID01[1];
            // console.log(`startBack buttonUserID: ${buttonUserID}`);
            // console.log(`startBack interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`);
            // console.log(`startBack interaction.user.id: ${interaction.user.id} && buttonUserID: ${buttonUserID}`);	

            //--BEGIN TRANSLATIONS--//

            //stored language
            var lang = await LANG01.LANG(interaction);
            //console.log(`LANG:${await LANG.LANG(interaction)}`);		

            //user language
            var LANG02 = interaction.locale.toString().split("-");
            var LANG = LANG02[0];
            //console.log(`lang:${lang}`);	

            function autoPostTitle() {
                if (lang === "en") {
                    return `Auto Post Settings`;
                }
                else if (lang === "es") {
                    return `Configuración automática de publicaciones`;
                }
                else if (lang === "pt") {
                    return `Configurações de mensagens automáticas`;
                }
                else if (lang === "ru") {
                    return `автоматические настройки сообщений`;
                }
                else if (lang === "de") {
                    return `Automatische Nachrichteneinstellungen`;
                }
                else if (lang === "pl") {
                    return `Automatyczne ustawienia wiadomości`;
                }
                else if (lang === "fr") {
                    return `Paramètres des messages automatisés`;
                }
                else if (lang === "it") {
                    return `Impostazioni dei messaggi automatici`;
                }
                else if (lang === "zh") {
                    return `自動消息設置`;
                }
                else if (lang === "ja") {
                    return `自動メッセージ設定`;
                }
                else if (lang === "ko") {
                    return `자동 메시지 설정`;
                }
                else {
                    return `Auto Post Settings`;
                }
            }

            function autoPostDesc() {
                if (lang === "en") {
                    return `Click **${start()}** to add an auto post channel.
Click **${stop()}** to remove an auto post channel.
Click **${confirm()}** to view and test current settings.`;
                }
                else if (lang === "es") {
                    return `Haga clic en **${start()}** para agregar un canal.
Haga clic en **${stop()}** para quitar un canal.
Haga clic en **${confirm()}** para ver y probar la configuración.`;
                }
                else if (lang === "pt") {
                    return `Clique em **${start()}** para adicionar um canal.
Clique em **${stop()}** para remover um canal.
Clique em **${confirm()}** para exibir e testar as configurações atuais.`;
                }
                else if (lang === "ru") {
                    return `Нажмите **${start()}**, чтобы добавить канал.
Нажмите **${stop()}**, чтобы исключить канал из автоматической публикации.
Нажмите **${confirm()}**, для просмотра и подтверждения настроек.`;
                }
                else if (lang === "de") {
                    return `Klicken Sie auf **${start()}** so fügen Sie einen Kanal hinzu.
Klicken Sie auf **${stop()}** so entfernen Sie einen Kanal.
Klicken Sie auf **${confirm()}** um die aktuellen Einstellungen anzuzeigen und zu testen.`;
                }
                if (lang === "pl") {
                    return `Kliknij **${start()}**, aby dodać automatyczny kanał wiadomości.
Kliknij **${stop()}**, aby usunąć automatyczny kanał wiadomości.
Kliknij **${confirm()}**, aby wyświetlić i przetestować ustawienia.`;
                }
                if (lang === "fr") {
                    return `Cliquez sur **${start()}** pour ajouter un canal de messagerie automatique.
Cliquez sur **${stop()}** pour supprimer un canal de messagerie automatique.
Cliquez sur **${confirm()}** pour afficher et tester les paramètres.`;
                }
                if (lang === "it") {
                    return `Fai clic su **${start()}** per aggiungere un canale di messaggio automatico.
Fai clic su **${stop()}** per rimuovere un canale di messaggio automatico.
Fai clic su **${confirm()}** per visualizzare e testare le impostazioni.`;
                }
                if (lang === "zh") {
                    return `單擊 **${start()}** 添加自動消息通道。
單擊 **${stop()}** 刪除自動消息通道。
單擊 **${confirm()}** 查看和測試設置。`;
                }
                if (lang === "ja") {
                    return `**${start()}** をクリックして、自動メッセージ チャネルを追加します。
**${stop()}** をクリックして、自動メッセージ チャネルを削除します。
**${confirm()}** をクリックして、設定を確認してテストします。`;
                }
                if (lang === "ko") {
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

            function changeLang() {
                if ((lang !== LANG) && (supportedLanguages.indexOf(LANG) !== -1) && (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))) {
                    if (LANG === "en") {
                        return `Click **${language()}** to change the language to ${longLang()}`;
                    }
                    if (LANG === "es") {
                        return `Haga clic en **${language()}** para cambiar el idioma a ${longLang()}.`;
                    }
                    if (LANG === "pt") {
                        return `Clique em **${language()}** para alterar o idioma para ${longLang()}.`;
                    }
                    if (LANG === "ru") {
                        return `Нажмите **${language()}**, чтобы изменить язык на ${longLang()}.`;
                    }
                    if (LANG === "de") {
                        return `Klicken Sie auf **${language()}**, um die Sprache auf ${longLang()} zu ändern.`;
                    }
                    if (LANG === "pl") {
                        return `Kliknij **${language()}**, aby zmienić język na ${longLang()}.`;
                    }
                    if (LANG === "fr") {
                        return `Cliquez sur **${language()}** pour changer la langue en ${longLang()}.`;
                    }
                    if (LANG === "it") {
                        return `Fare clic su **${language()}** per cambiare la lingua in ${longLang()}.`;
                    }
                    if (LANG === "zh") {
                        return `單擊 **${language()}** 將語言更改為 ${longLang()}。`;
                    }
                    if (LANG === "ja") {
                        return `**${language()}** をクリックして、言語を ${language()} に変更します。`;
                    }
                    if (LANG === "ko") {
                        return `**${language()}**을(를) 클릭하여 언어를 ${language()}로 변경합니다.`;
                    }
                    else {
                        return `Click ${language()} to change the language to ${language()}`;
                    }
                }
                else {
                    return "";
                }
            }

            function footerText() {
                if (lang === "en") {
                    return `Only Administrators can start or stop auto posts.`;
                }
                else if (lang === "es") {
                    return `Solo los administradores pueden iniciar o detener publicaciones automáticas.`;
                }
                else if (lang === "pt") {
                    return `Somente Administradores podem iniciar ou interromper postagens automáticas.`;
                }
                else if (lang === "ru") {
                    return `Только администраторы могут запускать или останавливать автоматические публикации.`;
                }
                else if (lang === "de") {
                    return `Nur Administratoren können automatische Beiträge starten oder stoppen.`;
                }
                if (lang === "pl") {
                    return `Tylko administratorzy mogą uruchamiać i zatrzymywać wiadomości automatyczne.`;
                }
                if (lang === "fr") {
                    return `Seuls les administrateurs peuvent démarrer ou arrêter les messages automatiques.`;
                }
                if (lang === "it") {
                    return `Solo gli amministratori possono avviare o interrompere i messaggi automatici.`;
                }
                if (lang === "zh") {
                    return `只有管​​理員可以啟動或停止自動消息.`;
                }
                if (lang === "ja") {
                    return `管理者のみが自動メッセージを開始または停止できます.`;
                }
                if (lang === "ko") {
                    return `관리자만 자동 메시지를 시작하거나 중지할 수 있습니다.`;
                }
                else {
                    return `Only Administrators can start or stop auto posts.`;
                }
            }

            function start() {
                if (lang === "en") {
                    return `Start`;
                }
                else if (lang === "es") {
                    return `Empezar`;
                }
                else if (lang === "pt") {
                    return `Começar`;
                }
                else if (lang === "ru") {
                    return `Старт`;
                }
                else if (lang === "de") {
                    return `Anfangen`;
                }
                if (lang === "pl") {
                    return `Początek`;
                }
                if (lang === "fr") {
                    return `Commencer`;
                }
                if (lang === "it") {
                    return `Inizio`;
                }
                if (lang === "zh") {
                    return `開始`;
                }
                if (lang === "ja") {
                    return `始める`;
                }
                if (lang === "ko") {
                    return `시작`;
                }
                else {
                    return `Start`;
                }
            }

            function stop() {
                if (lang === "en") {
                    return `Stop`;
                }
                else if (lang === "es") {
                    return `Detener`;
                }
                else if (lang === "pt") {
                    return `Parar`;
                }
                else if (lang === "ru") {
                    return `Стоп`;
                }
                else if (lang === "de") {
                    return `Aufhören`;
                }
                if (lang === "pl") {
                    return `Usunąć`;
                }
                if (lang === "fr") {
                    return `Arrêt`;
                }
                if (lang === "it") {
                    return `Fermare`;
                }
                if (lang === "zh") {
                    return `停止`;
                }
                if (lang === "ja") {
                    return `ストップ`;
                }
                if (lang === "ko") {
                    return `멈추다`;
                }
                else {
                    return `Stop`;
                }
            }

            function confirm() { //fixme - add translations
                if (lang === "en") {
                    return `Confirm`;
                }
                else if (lang === "es") {
                    return `Confirmar`;
                }
                else if (lang === "pt") {
                    return `Confirmar`;
                }
                else if (lang === "ru") {
                    return `Подтвердить`;
                }
                else if (lang === "de") {
                    return `Bestätigen`;
                }
                if (lang === "pl") {
                    return `Potwierdzać`;
                }
                if (lang === "fr") {
                    return `Confirmer`;
                }
                if (lang === "it") {
                    return `Confermare`;
                }
                if (lang === "zh") {
                    return `確認`;
                }
                if (lang === "ja") {
                    return `確認`;
                }
                if (lang === "ko") {
                    return `확인하다`;
                }
                else {
                    return `Confirm`;
                }
            }

            function language() {
                if (LANG === "en") {
                    return `Language`;
                }
                if (LANG === "es") {
                    return `Idioma`
                }
                if (LANG === "pt") {
                    return `Idioma`
                }
                if (LANG === "ru") {
                    return `Язык`;
                }
                if (LANG === "de") {
                    return `Sprache`;
                }
                if (LANG === "pl") {
                    return `Język`;
                }
                if (LANG === "fr") {
                    return `Langue`;
                }
                if (LANG === "it") {
                    return `Lingua`;
                }
                if (LANG === "zh") {
                    return `語言`;
                }
                if (LANG === "ja") {
                    return `言語`;
                }
                if (LANG === "ko") {
                    return `언어`;
                }
                else {
                    return `Language`;
                }
            }

            function longLang() {
                if (LANG === "en") {
                    return "English";
                }
                if (LANG === "es") {
                    return "español";
                }
                if (LANG === "pt") {
                    return "português";
                }
                if (LANG === "ru") {
                    return "русский";
                }
                if (LANG === "de") {
                    return "Deutsch";
                }
                if (LANG === "pl") {
                    return "polski";
                }
                if (LANG === "fr") {
                    return "français";
                }
                if (LANG === "it") {
                    return "italiano";
                }
                if (LANG === "zh") {
                    return "中國人";
                }
                if (LANG === "ja") {
                    return "日本";
                }
                if (LANG === "ko") {
                    return "한국인";
                }
                else {
                    return "English";
                }
            }

            function langDuplicateTitle() {
                if (LANG === "en") {
                    return `Change the server langage to English?`;
                }
                if (LANG === "es") {
                    return `¿Cambiar el idioma del servidor a español?`;
                }
                if (LANG === "pt") {
                    return `Alterar o idioma do servidor para português?`;
                }
                if (LANG === "ru") {
                    return `Сменить язык сервера на русский?`;
                }
                if (LANG === "de") {
                    return `Die Serversprache auf Deutsch ändern?`;
                }
                if (LANG === "pl") {
                    return `Zmienić język serwera na polski?`;
                }
                if (LANG === "fr") {
                    return `Changer la langue du serveur en français ?`;
                }
                if (LANG === "it") {
                    return `Cambiare la lingua del server in italiano?`;
                }
                if (LANG === "zh") {
                    return `把服務器語言改成中文？`;
                }
                if (LANG === "ja") {
                    return `サーバーの言語を日本語に変更しますか?`;
                }
                if (LANG === "ko") {
                    return `서버 언어를 한국어로 변경하시겠습니까?`;
                }
                else {
                    return `Change the server langage to English?`;
                }
            }

            function yes() {
                if (LANG === "en") {
                    return `Yes`;
                }
                if (LANG === "es") {
                    return `Sí`;
                }
                if (LANG === "pt") {
                    return `Sim`;
                }
                if (LANG === "ru") {
                    return `Да`;
                }
                if (LANG === "de") {
                    return `Ja`;
                }
                if (LANG === "pl") {
                    return `Tak`;
                }
                if (LANG === "fr") {
                    return `Oui`;
                }
                if (LANG === "it") {
                    return `Sì`;
                }
                if (LANG === "zh") {
                    return `是的`;
                }
                if (LANG === "ja") {
                    return `はい`;
                }
                if (LANG === "ko") {
                    return `예`;
                }
                else {
                    return `Yes`;
                }
            }

            function buttonFlag() {
                if (LANG === "en") {
                    return "\🇺🇸";
                }
                else if (LANG === "es") {
                    return "\🇲🇽";
                }
                else if (LANG === "pt") {
                    return `\🇧🇷`;
                }
                else if (LANG === "ru") {
                    return `\🇷🇺`;
                }
                else if (LANG === "de") {
                    return `\🇩🇪`;
                }
                else if (LANG === "pl") {
                    return `\🇵🇱`;
                }
                else if (LANG === "fr") {
                    return `\🇫🇷`;
                }
                else if (LANG === "it") {
                    return `\🇮🇹`;
                }
                else if (LANG === "zh") {
                    return `\🇨🇳`;
                }
                else if (LANG === "ja") {
                    return `\🇯🇵`;
                }
                else if (LANG === "ko") {
                    return `\🇰🇷`;
                }
                else {
                    return ``;
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

            //--END TRANSLATIONS--//						

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

            //Initial Embed + Buttons (start, stop, confirm, configure)
            if (interaction.user.id !== buttonUserID) {
                await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
            }
            else {
                interaction.editReply({ embeds: [initialEmbed], components: [initialButtons] });
            }

            //BEGIN ADDING A LANGAUGE
            //console.log(`lang:${lang} - LANG:${LANG} - supported?:${(supportedLanguages.indexOf(LANG) !== -1)}`);
            if ((lang !== LANG) && (supportedLanguages.indexOf(LANG) !== -1) && (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))) { //if the stored language is not the same language as the user language && user language is supported && user is an admin

                if ((lang === "") && (LANG === "en")) { return }

                const changeLangEmbed = new EmbedBuilder()
                    .setColor(0x00FFCC) //Seafoam green
                    .setTitle(`${autoPostTitle()}`)
                    .setDescription(`${autoPostDesc()}\n${changeLang()}`)
                    .setFooter({ text: `${footerText()}`, iconURL: process.env.logo_link })

                const changeLangButtons = new ActionRowBuilder()
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
                        new ButtonBuilder()
                            .setCustomId(`yes - ${LANG}`)
                            .setLabel(`${language()}`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji(buttonFlag()),
                    );

                if (interaction.user.id !== buttonUserID) {
                    await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
                }
                else {
                    interaction.editReply({ embeds: [changeLangEmbed], components: [changeLangButtons] }).catch(err => console.log(`langDupEmbed error: ${err}`));
                }

            };
            //END ADDING A LANGAUGE

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

        } //end if interaction starts with startback - stopback - confirmback

    },
}