const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const { exec } = require('node:child_process');
const LANG01 = require('../events/LANG.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('language')
        .setNameLocalizations({
            "es-ES": 'idioma',
            "pt-BR": 'idioma',
            ru: 'язык',
            de: 'sprache',
            pl: 'język',
            fr: 'langue',
            it: 'lingua',
            "zh-CN": '语言',
            "zh-TW": '語言',	
            ja: '言語',
            ko: '언어',
        })			
        .setDescription('Language | Idioma | Язык | Sprache | Język | Langue | Lingua | 语言 | 語言 | 言語 | 언어')
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply().catch(console.error);

        //stored language
        var lang = await LANG01.LANG(interaction);
        //console.log(`LANG:${await LANG.LANG(interaction)}`);	

        //user language
        // var LANG02 = interaction.locale.toString().split("-");
        // var LANG = LANG02[0];
				var LANG = interaction.locale.toString();
        //console.log(`lang:${lang}`);	

        function langSettingsTitle() {
            if (lang === "en") {
                return `Language Settings`;
            }
            else if (lang === "es") {
                return `Configuración de idioma`;
            }
            else if (lang === "ru") {
                return `Языковые настройки`;
            }
            else if (lang === "de") {
                return `Spracheinstellungen`;
            }
            else if (lang === "br") {
                return `Configurações de idioma`;
            }
            else if (lang === "pl") {
                return `Ustawienia języka`;
            }
            else if (lang === "fr") {
                return `Paramètres de langue`;
            }
            else if (lang === "it") {
                return `Impostazioni della lingua`;
            }
            else if (lang === "zh") {
                return `语言设定`;
            }
            else if (lang === "tw") {
                return `語言設定`;
            }							
            else if (lang === "jp") {
                return `言語設定`;
            }
            else if (lang === "kr") {
                return `언어 설정`;
            }
            else {
                return `Language Settings`;
            }
        }

        function longLang() {
            if (lang === "") {
                return `English`;
            }
            if (lang === "es") {
                return `español`;
            }
            if (lang === "br") {
                return `português`;
            }
            if (lang === "ru") {
                return `русский`;
            }
            if (lang === "de") {
                return `Deutsch`;
            }
            if (lang ===  "pl") {
                return `polski`;
            }
            if (lang === "fr") {
                return `français`;
            }
            if (lang === "it") {
                return `italiano`;
            }
            if (lang === "zh") {
                return `中国人 （简体）`;
            }
            if (lang === "tw") {
                return `中國人 （傳統的）`;
            }					
            if (lang === "jp") {
                return `日本`;
            }
            if (lang === "kr") {
                return `한국인`;
            }
            else {
                return `English`;
            }
        }

        function currentLanguage() {
            if (LANG.includes("en")) {
                return `Your current language is __${longLang()}__.`;
            }
            else if (LANG.includes("es")) {
                return `Tu idioma actual es el __${longLang()}__.`;
            }
            else if (LANG.includes("ru")) {
                return `Ваш текущий язык - __${longLang()}__.`;
            }
            else if (LANG.includes("de")) {
                return `Ihre aktuelle Sprache ist __${longLang()}__.`;
            }
            else if (LANG.includes("pt")) {
                return `Seu idioma atual é o __${longLang()}__.`;
            }
            else if (LANG.includes("pl")) {
                return `Twój obecny język to __${longLang()}__.`;
            }
            else if (LANG.includes("fr")) {
                return `Votre langue actuelle est le __${longLang()}__.`;
            }
            else if (LANG.includes("it")) {
                return `La tua lingua attuale è l'__${longLang()}__.`;
            }
            else if (LANG.includes("CN")) {
                return `您当前的语言是 __${longLang()}__`;
            }							
            else if (LANG.includes("TW")) {
                return `您當前的語言是 __${longLang()}__`;
            }
            else if (LANG.includes("ja")) {
                return `あなたの現在の言語は__${longLang()}__語です。`;
            }
            else if (LANG.includes("ko")) {
                return `현재 언어는 __${longLang()}__다.`;
            }
            else {
                return `Your current language is __${longLang()}__.`;
            }
        }

        function languagesDesc() {
            if (LANG.includes("en")) {
                return `Click the **dropdown menu** to select the language for the **/autopost** command.`;
            }
            if (LANG.includes("es")) {
                return `Haz clic en el **menú desplegable** para seleccionar el idioma del comando /publicaciones-automáticas.`;
            }
            if (LANG.includes("pt")) {
                return `Clique no **menu suspenso** para selecionar o idioma para o comando /postagens-automáticas.`;
            }
            if (LANG.includes("ru")) {
                return `Щелкните **раскрывающееся меню**, чтобы выбрать язык для команды /автопубликации.`;
            }
            if (LANG.includes("de")) {
                return `Klicken Sie auf das **Dropdown-Menü**, um die Sprache für den Befehl /automatische-veröffentlichung auszuwählen.`;
            }
            if (LANG.includes("pl")) {
                return `Kliknij **menu rozwijane**, aby wybrać język dla polecenia /zautomatyzowane-wiadomości.`;
            }
            if (LANG.includes("fr")) {
                return `Cliquez sur **le menu déroulant** pour sélectionner la langue du serveur pour la commande /messages-automatisés.`;
            }
            if (LANG.includes("it")) {
                return `Fare clic sul menu a discesa per selezionare la lingua del server per il comando /messaggi-automatici.`;
            }
            if (LANG.includes("CN")) {
                return `点击下拉菜单选择 /自动消息 命令的语言。`;
            }
            if (LANG.includes("TW")) {
                return `單擊下拉菜單為 /自動消息 命令選擇服務器語言。`;
            }					
            if (LANG.includes("ja")) {
                return `ドロップダウン メニューをクリックして、/自動メッセージ コマンドのサーバー言語を選択します。`;
            }
            if (LANG.includes("ko")) {
                return `드롭다운 메뉴를 클릭하여 /자동화된-메시지 명령에 대한 서버 언어를 선택합니다.`;
            }
            else {
                return `Click the **dropdown menu** to select the language for the **/autopost** command.`;
            }
        }

        function footerText() {
            if (LANG.includes("en")) {
                return `Only Administrators can change the language.`;
            }
            else if (LANG.includes("es")) {
                return `Solo los administradores pueden cambiar de idioma.`;
            }
            else if (LANG.includes("pt")) {
                return `Somente os administradores podem alterar o idioma.`;
            }
            else if (LANG.includes("ru")) {
                return `Только администраторы могут изменять языки.`;
            }
            else if (LANG.includes("de")) {
                return `Nur Administratoren können die Sprache ändern.`;
            }
            else if (LANG.includes("pl")) {
                return `Tylko administratorzy mogą zmienić język.`;
            }
            else if (LANG.includes("fr")) {
                return `Seuls les administrateurs peuvent changer la langue.`;
            }
            else if (LANG.includes("it")) {
                return `Solo gli amministratori possono cambiare la lingua.`;
            }
            else if (LANG.includes("CN")) {
                return `只有管理员可以更改语言。`;
            }							
            else if (LANG.includes("TW")) {
                return `只有管理員可以更改語言。`;
            }
            else if (LANG.includes("ja")) {
                return `管理者のみが言語を変更できます。`;
            }
            else if (LANG.includes("ko")) {
                return `관리자만 언어를 변경할 수 있습니다.`;
            }
            else {
                return `Only Administrators can change the language.`;
            }
        }

        function selectLanguage() {
            if (LANG.includes("en")) {
                return `select a language`;
            }
            if (LANG.includes("es")) {
                return `elige un idioma`;
            }
            if (LANG.includes("pt")) {
                return `escolha um idioma`;
            }
            if (LANG.includes("ru")) {
                return `выбрать язык`;
            }
            if (LANG.includes("de")) {
                return `wählen Sie eine Sprache`;
            }
            if (LANG.includes("pl")) {
                return `wybierz język`;
            }
            if (LANG.includes("fr")) {
                return `choisir une langue`;
            }
            if (LANG.includes("it")) {
                return `scegli una lingua`;
            }
            if (LANG.includes("CN")) {
                return `选择一种语言`;
            }					
            if (LANG.includes("TW")) {
                return `選擇一種語言`;
            }
            if (LANG.includes("ja")) {
                return `言語を選択`;
            }
            if (LANG.includes("ko")) {
                return `언어를 선택하세요`;
            }
            else {
                return `select a language`;
            }
        }

        function noLanguage() {
            if (LANG.includes("en")) {
                return `no language chosen`;
            }
            if (LANG.includes("es")) {
                return `ningún idioma elegido`;
            }
            if (LANG.includes("pt")) {
                return `nenhum idioma escolhido`;
            }
            if (LANG.includes("ru")) {
                return `язык не выбран`;
            }
            if (LANG.includes("de")) {
                return `keine Sprache gewählt`;
            }
            if (LANG.includes("pl")) {
                return `nie wybrano języka`;
            }
            if (LANG.includes("fr")) {
                return `aucune langue choisie`;
            }
            if (LANG.includes("it")) {
                return `nessuna lingua scelta`;
            }
            if (LANG.includes("CN")) {
                return `沒有選擇語言`;
            }
            if (LANG.includes("TW")) {
                return `沒有選擇語言`;
            }
            if (LANG.includes("ja")) {
                return `言語が選択されていません`;
            }
            if (LANG.includes("ko")) {
                return `선택된 언어 없음`;
            }
            else {
                return `no language selected`;
            }
        }


        //END TRANSLATIONS		

        const languageEmbed = new EmbedBuilder()
            .setColor(0xF98800) //Orange
            .setTitle(`${langSettingsTitle()}`)
            .setDescription(`${currentLanguage()}\n${languagesDesc()}`)
            .setFooter({ text: `${footerText()}`, iconURL: process.env.logo_link })

        var longLangArray = ["🇺🇸 English", "🇲🇽 español", "🇧🇷 português", "🇷🇺 русский", "🇩🇪 Deutsch", "🇵🇱 polski", "🇫🇷 français", "🇮🇹 italiano", "🇨🇳 中国人（简体）", "🇹🇼 中國人 （傳統的）", "🇯🇵 日本", "🇰🇷 한국인"];
        let languageMenu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`languageMenu - u:${interaction.user.id} - lang:undefinedLang`)
                    .setPlaceholder(`${selectLanguage()}`)
                    .addOptions([{
                        label: `${noLanguage()}`,
                        value: `languageMenu - u:${interaction.user.id} - lang:undefinedLang`,
                    }])
            )
        for (i = 0; i <= 11; i++) {
            if (lang !== supportedLanguages[i]) {
                //console.log(`i:${i} - sL:${supportedLanguages[i]} - longLang:${longLangArray[i]}`);
                if ((lang === "") && (supportedLanguages[i] === "en")) {
                    //console.log(`lang:${lang} - LANG:${LANG} - sL[i]:${supportedLanguages[i]}`)
                }
                else {
                    languageMenu.components[0].addOptions([{
                        label: `${longLangArray[i]}`,
                        value: `languageMenu - u:${interaction.user.id} - lang:${supportedLanguages[i]}`,
                    }]);
                }
            }
        }

        await interaction.editReply({ embeds: [languageEmbed], components: [languageMenu] }).catch(err => { console.log(`language command Error: ${err.stack}`) });

    },
}