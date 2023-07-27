const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG01 = require('../../events/LANG.js');


module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isButton()) { return };
        if ((interaction.customId.startsWith(`startback -`)) || (interaction.customId.startsWith(`stopback -`)) || (interaction.customId.startsWith(`confirmback -`)) || (interaction.customId.startsWith(`langback -`))) {
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
            else if (interaction.customId.startsWith(`langback -`)) {
                start_stop_confirm += 'lang';
            }					

            let buttonUserID01 = (interaction.customId).split(`${start_stop_confirm}back - `);
            let buttonUserID = buttonUserID01[1];
            // console.log(`startBack buttonUserID: ${buttonUserID}`);
            // console.log(`startBack interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`);
            // console.log(`startBack interaction.user.id: ${interaction.user.id} && buttonUserID: ${buttonUserID}`);	

            //--BEGIN TRANSLATIONS--//

           //stored language
		       var lang = await LANG01.LANG(interaction);
		         //console.log(`server lang: ${await LANG01.LANG(interaction)}`);
		
		      //user language
		      var LANG = interaction.locale.toString();
		         //console.log(`user LANG:${LANG}`);

		        function formattedLANG() {
		            if (LANG.includes("en")) {
		                return "en";
		            }
		            if (LANG.includes("es")) {
		                return "es";
		            }
		            if (LANG.includes("pt")) {
		                return "br";
		            }
		            if (LANG.includes("CN")) {
		                return "zh";
		            }
		            if (LANG.includes("TW")) {
		                return "tw";
		            }
		            if (LANG.includes("ja")) {
		                return "jp";
		            }
		            if (LANG.includes("ko")) {
		                return "kr";
		            }
		            else { //ru, de, pl, fr, it
		                return `${LANG}`;
		            }
		        }						

            function autoPostTitle() {
                if (lang === "") {
                    return `Auto Post Settings`;
                }
                else if (lang === "es") {
                    return `Configuración automática de publicaciones`;
                }
                else if (lang === "br") {
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
		                return `自动消息设置`;
		            }
		            else if (lang === "tw") {
		                return `自動消息設置`;
		            }
                else if (lang === "jp") {
                    return `自動メッセージ設定`;
                }
                else if (lang === "kr") {
                    return `자동 메시지 설정`;
                }
                else {
                    return `Auto Post Settings`;
                }
            }

            function autoPostDesc() {
                if (lang === "") {
                    return `Click **${start()}** to add an auto post channel.
Click **${stop()}** to remove an auto post channel.
Click **${confirm()}** to view and test current settings.`;
                }
                else if (lang === "es") {
                    return `Haga clic en **${start()}** para agregar un canal.
Haga clic en **${stop()}** para quitar un canal.
Haga clic en **${confirm()}** para ver y probar la configuración.`;
                }
                else if (lang === "br") {
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
		                return `单击 **${start()}** 添加自动消息通道。
		单击 **${stop()}** 删除自动消息通道。
		单击 **${confirm()}** 查看和测试设置。`;
		            }
		            if (lang === "tw") {
		                return `單擊 **${start()}** 添加自動消息通道。
		單擊 **${stop()}** 刪除自動消息通道。
		單擊 **${confirm()}** 查看和測試設置。`;
		            }
                if (lang === "jp") {
                    return `**${start()}** をクリックして、自動メッセージ チャネルを追加します。
**${stop()}** をクリックして、自動メッセージ チャネルを削除します。
**${confirm()}** をクリックして、設定を確認してテストします。`;
                }
                if (lang === "kr") {
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
                if ((lang !== formattedLANG()) && (supportedLanguages.indexOf(formattedLANG()) !== -1) && (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))) {
                    if (LANG.includes("en")) {
                        return `Click **${language()}** to change the language to ${longLang()}`;
                    }
                    if (LANG.includes("es")) {
                        return `Haga clic en **${language()}** para cambiar el idioma a ${longLang()}.`;
                    }
                    if (LANG.includes("pt")) {
                        return `Clique em **${language()}** para alterar o idioma para ${longLang()}.`;
                    }
                    if (LANG.includes("ru")) {
                        return `Нажмите **${language()}**, чтобы изменить язык на ${longLang()}.`;
                    }
                    if (LANG.includes("de")) {
                        return `Klicken Sie auf **${language()}**, um die Sprache auf ${longLang()} zu ändern.`;
                    }
                    if (LANG.includes("pl")) {
                        return `Kliknij **${language()}**, aby zmienić język na ${longLang()}.`;
                    }
                    if (LANG.includes("fr")) {
                        return `Cliquez sur **${language()}** pour changer la langue en ${longLang()}.`;
                    }
                    if (LANG.includes("it")) {
                        return `Fare clic su **${language()}** per cambiare la lingua in ${longLang()}.`;
                    }
		                if (LANG.includes("CN")) {
		                    return `单击 **${language()}** 将语言更改为 ${longLang()}。`;
		                }
		                if (LANG.includes("TW")) {
		                    return `單擊 **${language()}** 將語言更改為 ${longLang()}。`;
		                }
                    if (LANG.includes("ja")) {
                        return `**${language()}** をクリックして、言語を ${longLang()} に変更します。`;
                    }
                    if (LANG.includes("ko")) {
                        return `**${language()}**을(를) 클릭하여 언어를 ${longLang()}로 변경합니다.`;
                    }
                    else {
                        return `Click ${language()} to change the language to ${longLang()}`;
                    }
                }
                else {
                    return "";
                }
            }

            function footerText() {
                if (lang === "") {
                    return `Only Administrators can start or stop auto posts.`;
                }
                else if (lang === "es") {
                    return `Solo los administradores pueden iniciar o detener publicaciones automáticas.`;
                }
                else if (lang === "br") {
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
		                return `只有管理员可以启动或停止自动消息。`;
		            }
		            if (lang === "tw") {
		                return `只有管理員可以啟動或停止自動消息。`;
		            }
                if (lang === "jp") {
                    return `管理者のみが自動メッセージを開始または停止できます.`;
                }
                if (lang === "kr") {
                    return `관리자만 자동 메시지를 시작하거나 중지할 수 있습니다.`;
                }
                else {
                    return `Only Administrators can start or stop auto posts.`;
                }
            }

            function start() {
                if (lang === "") {
                    return `Start`;
                }
                else if (lang === "es") {
                    return `Empezar`;
                }
                else if (lang === "br") {
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
		            if (lang === "tw") {
		                return `开始`;
		            }
                if (lang === "jp") {
                    return `始める`;
                }
                if (lang === "kr") {
                    return `시작`;
                }
                else {
                    return `Start`;
                }
            }

            function stop() {
                if (lang === "") {
                    return `Stop`;
                }
                else if (lang === "es") {
                    return `Detener`;
                }
                else if (lang === "br") {
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
		            if (lang === "tw") {
		                return `停止`;
		            }
                if (lang === "jp") {
                    return `ストップ`;
                }
                if (lang === "kr") {
                    return `멈추다`;
                }
                else {
                    return `Stop`;
                }
            }

            function confirm() { //fixme - add translations
                if (lang === "") {
                    return `Confirm`;
                }
                else if (lang === "es") {
                    return `Confirmar`;
                }
                else if (lang === "br") {
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
		                return `确认`;
		            }
		            if (lang === "tw") {
		                return `確認`;
		            }
                if (lang === "jp") {
                    return `確認`;
                }
                if (lang === "kr") {
                    return `확인하다`;
                }
                else {
                    return `Confirm`;
                }
            }

            function language() {
                if (LANG.includes("en")) {
                    return `Language`;
                }
                if (LANG.includes("es")) {
                    return `Idioma`
                }
                if (LANG.includes("pt")) {
                    return `Idioma`
                }
                if (LANG.includes("ru")) {
                    return `Язык`;
                }
                if (LANG.includes("de")) {
                    return `Sprache`;
                }
                if (LANG.includes("pl")) {
                    return `Język`;
                }
                if (LANG.includes("fr")) {
                    return `Langue`;
                }
                if (LANG.includes("it")) {
                    return `Lingua`;
                }
                if (LANG.includes("CN")) {
		                return `语言`;
		            }
		            if (LANG.includes("TW")) {
		                return `語言`;
		            }
								if (LANG.includes("jp")) {
                    return `言語`;
                }
                if (LANG.includes("ko")) {
                    return `언어`;
                }
                else {
                    return `Language`;
                }
            }

		        function longLang() {
		            if (LANG.includes("en")) {
		                return `English`;
		            }
		            if (LANG.includes("es")) {
		                return `Español`;
		            }
		            if (LANG.includes("pt")) {
		                return `Português`;
		            }
		            if (LANG.includes("ru")) {
		                return `Русский`;
		            }
		            if (LANG.includes("de")) {
		                return `Deutsch`;
		            }
		            if (LANG.includes("pl")) {
		                return `Polski`;
		            }
		            if (LANG.includes("fr")) {
		                return `Français`;
		            }
		            if (LANG.includes("it")) {
		                return `Italiano`;
		            }
		            if (LANG.includes("CN")) {
		                return `中国人 （简体）`;
		            }
		            if (LANG.includes("TW")) {
		                return `中國人 （傳統的）`;
		            }					
		            if (LANG.includes("ja")) {
		                return `日本`;
		            }
		            if (LANG.includes("ko")) {
		                return `한국인`;
		            }
		            else {
		                return `English`;
		            }
		        }

            function langDuplicateTitle() {
                if (LANG.includes("en")) {
                    return `Change the server langage to English?`;
                }
                if (LANG.includes("es")) {
                    return `¿Cambiar el idioma del servidor a español?`;
                }
                if (LANG.includes("pt")) {
                    return `Alterar o idioma do servidor para português?`;
                }
                if (LANG.includes("ru")) {
                    return `Сменить язык сервера на русский?`;
                }
                if (LANG.includes("de")) {
                    return `Die Serversprache auf Deutsch ändern?`;
                }
                if (LANG.includes("pl")) {
                    return `Zmienić język serwera na polski?`;
                }
                if (LANG.includes("fr")) {
                    return `Changer la langue du serveur en français ?`;
                }
                if (LANG.includes("it")) {
                    return `Cambiare la lingua del server in italiano?`;
                }
		            if (LANG.includes("CN")) {
		                return `把服务器语言改成中文？`;
		            }
		            if (LANG.includes("TW")) {
		                return `把服務器語言改成中文？`;
		            }
                if (LANG.includes("ja")) {
                    return `サーバーの言語を日本語に変更しますか?`;
                }
                if (LANG.includes("ko")) {
                    return `서버 언어를 한국어로 변경하시겠습니까?`;
                }
                else {
                    return `Change the server langage to English?`;
                }
            }

            function yes() {
                if (LANG.includes("en")) {
                    return `Yes`;
                }
                if (LANG.includes("es")) {
                    return `Sí`;
                }
                if (LANG.includes("pt")) {
                    return `Sim`;
                }
                if (LANG.includes("ru")) {
                    return `Да`;
                }
                if (LANG.includes("de")) {
                    return `Ja`;
                }
                if (LANG.includes("pl")) {
                    return `Tak`;
                }
                if (LANG.includes("fr")) {
                    return `Oui`;
                }
                if (LANG.includes("it")) {
                    return `Sì`;
                }
		            if (LANG.includes("CN")) {
		                return `是的`;
		            }
		            if (LANG.includes("TW")) {
		                return `是的`;
		            }
                if (LANG.includes("ja")) {
                    return `はい`;
                }
                if (LANG.includes("ko")) {
                    return `예`;
                }
                else {
                    return `Yes`;
                }
            }

            function buttonFlag() {
                if (LANG.includes("en")) {
                    return "\🇺🇸";
                }
                else if (LANG.includes("es")) {
                    return "\🇲🇽";
                }
                else if (LANG.includes("pt")) {
                    return `\🇧🇷`;
                }
                else if (LANG.includes("ru")) {
                    return `\🇷🇺`;
                }
                else if (LANG.includes("de")) {
                    return `\🇩🇪`;
                }
                else if (LANG.includes("pl")) {
                    return `\🇵🇱`;
                }
                else if (LANG.includes("fr")) {
                    return `\🇫🇷`;
                }
                else if (LANG.includes("it")) {
                    return `\🇮🇹`;
                }
								else if (LANG.includes("CN")) {
                    return `\🇨🇳`;
                }
                else if (LANG.includes("TW")) {
                    return `\🇹🇼`;
                }
                else if (LANG.includes("ja")) {
                    return `\🇯🇵`;
                }
                else if (LANG.includes("ko")) {
                    return `\🇰🇷`;
                }
                else {
                    return ``;
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

            //BEGIN ADDING A LANGAUGE
            	//console.log(`lang: ${lang} - LANG: ${LANG} - formattedLANG: ${formattedLANG()} - supported?: ${(supportedLanguages.indexOf(formattedLANG()) !== -1)} `);
						if ( (lang === "") && (LANG.includes("en")) ) {
							if (interaction.user.id !== buttonUserID) {
									await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
							}
							else {
								if (start_stop_confirm === "lang") {
									interaction.followUp({ embeds: [initialEmbed], components: [initialButtons] });
								}
								else {
									interaction.editReply({ embeds: [initialEmbed], components: [initialButtons] });
								}
							}	
						}					
            else if ((lang !== formattedLANG()) && (supportedLanguages.indexOf(formattedLANG()) !== -1) && (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))) { //if the stored language is not the same language as the user language && user language is supported && user is an admin

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
                            .setCustomId(`yes - ${formattedLANG()}`)
                            .setLabel(`${language()}`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji(buttonFlag()),
                    );

                if (interaction.user.id !== buttonUserID) {
                    await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
                }
                else {
									if (start_stop_confirm === "lang") {
										interaction.followUp({ embeds: [changeLangEmbed], components: [changeLangButtons] }).catch(err => console.log(`changeLangEmbed error: ${err}`));
									}
									else {
										interaction.editReply({ embeds: [changeLangEmbed], components: [changeLangButtons] }).catch(err => console.log(`changeLangEmbed error: ${err}`));
									}
                }

            }
						else { //If the user language is the same as the server language
	            //Initial Embed + Buttons (start, stop, confirm)
	            if (interaction.user.id !== buttonUserID) {
	                await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
	            }
	            else {
								if (start_stop_confirm === "lang") {
									interaction.followUp({ embeds: [initialEmbed], components: [initialButtons] });
								}
								else {
									interaction.editReply({ embeds: [initialEmbed], components: [initialButtons] });
								}
	            }							
						}
            //END ADDING A LANGAUGE

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
            }, (60000 * 5))					


        } //end if interaction starts with startback - stopback - confirmback

    },
}