const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG01 = require('../events/LANG.js');
const { exec } = require('node:child_process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autopost')
        .setNameLocalizations({
            "es-ES": 'publicaciones-automáticas',
            "pt-BR": 'postagens-automáticas',
            ru: 'автопубликации',
            de: 'automatische-veröffentlichung',
            pl: 'zautomatyzowane-wiadomości',
            fr: 'messages-automatisés',
            it: 'messaggi-automatici',
            "zh-CN": '自动消息',
            "zh-TW": '自動消息',
            ja: '自動メッセージ',
            ko: '자동화된-메시지',
        })
        .setDescription('Configure and Confirm Auto Post Settings')
        .setDescriptionLocalizations({
            "es-ES": 'Configuración de publicación automática',
            "pt-BR": 'Configurações de Publicação Automática',
            ru: 'Настройка и подтверждение изменений автопубликации',
            de: 'Einstellungen für die automatische Veröffentlichung',
            pl: 'Automatyczne ustawienia wiadomości',
            fr: 'Paramètres des messages automatisés',
            it: 'Impostazioni dei messaggi automatici',
						"zh-CN": '自动消息设置',
            "zh-TW": '自動消息設置',
            ja: '自動メッセージ設定',
            ko: '자동 메시지 설정',
        })
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply().catch(console.error);

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
            if ((lang !== LANG) && (supportedLanguages.indexOf(formattedLANG()) !== -1) && (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))) {
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
                    return `**${language()}** をクリックして、言語を ${language()} に変更します。`;
                }
                if (LANG.includes("ko")) {
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
            if (LANG.includes("ja")) {
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
                return "English";
            }
            if (LANG.includes("es")) {
                return "español";
            }
            if (LANG.includes("pt")) {
                return "português";
            }
            if (LANG.includes("ru")) {
                return "русский";
            }
            if (LANG.includes("de")) {
                return "Deutsch";
            }
            if (LANG.includes("pl")) {
                return "polski";
            }
            if (LANG.includes("fr")) {
                return "français";
            }
            if (LANG.includes("it")) {
                return "italiano";
            }
						if (LANG.includes("CN")) {
								return `中国人 （简体）`;
						}
						if (LANG.includes("TW")) {
								return `中國人 （傳統的）`;
						}
            if (LANG.includes("ja")) {
                return "日本";
            }
            if (LANG.includes("ko")) {
                return "한국인";
            }
            else {
                return "English";
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
        interaction.editReply({ embeds: [initialEmbed], components: [initialButtons] });

        //BEGIN ADDING A LANGAUGE
        //console.log(`lang: ${lang} - LANG: ${LANG} - formatted LANG: ${formattedLANG()} - supported?: ${(supportedLanguages.indexOf(formattedLANG()) !== -1)}`);
				if ( (lang === "") && (LANG.includes("en")) ) {
					interaction.editReply({ embeds: [initialEmbed], components: [initialButtons] });
				}				
        else if ((lang !== LANG) && (supportedLanguages.indexOf(formattedLANG()) !== -1) && (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))) { //if the stored language is not the same language as the user language && user language is supported && user is an admin

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

            await interaction.editReply({ embeds: [changeLangEmbed], components: [changeLangButtons] }).catch(err => console.log(`changeLangEmbed error: ${err}`));

        }
				else {
					interaction.editReply({ embeds: [initialEmbed], components: [initialButtons] });				
				}
        //END ADDING A LANGAUGE


    }
}