const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const { exec } = require('node:child_process');
const LANG01 = require('../events/LANG.js');

const expiredButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(`expired`)
            .setLabel('This interaction timed out.')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji(':RSWeekly:1025248227248848940')
            .setDisabled(true),
    );

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
            "zh-CN": '語言',
            ja: '言語',
            ko: '언어',
        })
        .setDescription('Language | Idioma | Язык | Sprache | Język | Langue | Lingua | 語言 | 言語 | 언어')
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply().catch(console.error);

        //stored language
        var lang = await LANG01.LANG(interaction);
        //console.log(`LANG:${await LANG.LANG(interaction)}`);		

        //user language
        var LANG02 = interaction.locale.toString().split("-");
        var LANG = LANG02[0];
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
            else if (lang === "pt") {
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
                return `語言設定`;
            }
            else if (lang === "ja") {
                return `言語設定`;
            }
            else if (lang === "ko") {
                return `언어 설정`;
            }
            else {
                return `Language Settings`;
            }
        }

        function longLang() {
            if (lang === "en") {
                return `English`;
            }
            if (lang === "es") {
                return `español`;
            }
            if (lang === "pt") {
                return `português`;
            }
            if (lang === "ru") {
                return `русский`;
            }
            if (lang === "de") {
                return `Deutsch`;
            }
            if (lang === "pl") {
                return `polski`;
            }
            if (lang === "fr") {
                return `français`;
            }
            if (lang === "it") {
                return `italiano`;
            }
            if (lang === "zh") {
                return `中國人`;
            }
            if (lang === "ja") {
                return `日本`;
            }
            if (lang === "ko") {
                return `한국인`;
            }
            else {
                return `English`;
            }
        }

        function currentLanguage() {
            if (LANG === "en") {
                return `Your current language is ${longLang()}.`;
            }
            else if (LANG === "es") {
                return `Tu idioma actual es el ${longLang()}.`;
            }
            else if (LANG === "ru") {
                return `Ваш текущий язык - ${longLang()}.`;
            }
            else if (LANG === "de") {
                return `Ihre aktuelle Sprache ist ${longLang()}.`;
            }
            else if (LANG === "pt") {
                return `Seu idioma atual é o ${longLang()}.`;
            }
            else if (LANG === "pl") {
                return `Twój obecny język to ${longLang()}.`;
            }
            else if (LANG === "fr") {
                return `Votre langue actuelle est le ${longLang()}.`;
            }
            else if (LANG === "it") {
                return `La tua lingua attuale è l'${longLang()}.`;
            }
            else if (LANG === "zh") {
                return `您當前的語言是 ${longLang()}`;
            }
            else if (LANG === "ja") {
                return `あなたの現在の言語は${longLang()}語です。`;
            }
            else if (LANG === "ko") {
                return `현재 언어는 ${longLang()}다.`;
            }
            else {
                return `Your current language is ${longLang()}.`;
            }
        }

        function languagesDesc() {
            if (LANG === "en") {
                return `Click the **dropdown menu** to select the language for the /autopost command.`;
            }
            if (LANG === "es") {
                return `Haz clic en el **menú desplegable** para seleccionar el idioma del comando /publicaciones-automáticas.`;
            }
            if (LANG === "pt") {
                return `Clique no **menu suspenso** para selecionar o idioma para o comando /postagens-automáticas.`;
            }
            if (LANG === "ru") {
                return `Щелкните **раскрывающееся меню**, чтобы выбрать язык для команды /автопубликации.`;
            }
            if (LANG === "de") {
                return `Klicken Sie auf das **Dropdown-Menü**, um die Sprache für den Befehl /automatische-veröffentlichung auszuwählen.`;
            }
            if (LANG === "pl") {
                return `Kliknij **menu rozwijane**, aby wybrać język dla polecenia /zautomatyzowane-wiadomości.`;
            }
            if (LANG === "fr") {
                return `Cliquez sur **le menu déroulant** pour sélectionner la langue du serveur pour la commande /messages-automatisés.`;
            }
            if (LANG === "it") {
                return `Fare clic sul menu a discesa per selezionare la lingua del server per il comando /messaggi-automatici.`;
            }
            if (LANG === "zh") {
                return `單擊下拉菜單為 /自動消息 命令選擇服務器語言。`;
            }
            if (LANG === "ja") {
                return `ドロップダウン メニューをクリックして、/自動メッセージ コマンドのサーバー言語を選択します。`;
            }
            if (LANG === "ko") {
                return `드롭다운 메뉴를 클릭하여 /자동화된-메시지 명령에 대한 서버 언어를 선택합니다.`;
            }
            else {
                return `Click the **dropdown menu** to select a language.`;
            }
        }

        function footerText() {
            if (LANG === "en") {
                return `Only Administrators can change the language.`;
            }
            else if (LANG === "es") {
                return `Solo los administradores pueden cambiar de idioma.`;
            }
            else if (LANG === "pt") {
                return `Somente os administradores podem alterar o idioma.`;
            }
            else if (LANG === "ru") {
                return `Только администраторы могут изменять языки.`;
            }
            else if (LANG === "de") {
                return `Nur Administratoren können die Sprache ändern.`;
            }
            else if (LANG === "pl") {
                return `Tylko administratorzy mogą zmienić język.`;
            }
            else if (LANG === "fr") {
                return `Seuls les administrateurs peuvent changer la langue.`;
            }
            else if (LANG === "it") {
                return `Solo gli amministratori possono cambiare la lingua.`;
            }
            else if (LANG === "zh") {
                return `只有管理員可以更改語言。`;
            }
            else if (LANG === "ja") {
                return `管理者のみが言語を変更できます。`;
            }
            else if (LANG === "ko") {
                return `관리자만 언어를 변경할 수 있습니다.`;
            }
            else {
                return `Only Administrators can change language.`;
            }
        }

        function selectLanguage() {
            if (LANG === "en") {
                return `select a language`;
            }
            if (LANG === "es") {
                return `elige un idioma`;
            }
            if (LANG === "pt") {
                return `escolha um idioma`;
            }
            if (LANG === "ru") {
                return `выбрать язык`;
            }
            if (LANG === "de") {
                return `wählen Sie eine Sprache`;
            }
            if (LANG === "pl") {
                return `wybierz język`;
            }
            if (LANG === "fr") {
                return `choisir une langue`;
            }
            if (LANG === "it") {
                return `scegli una lingua`;
            }
            if (LANG === "zh") {
                return `選擇一種語言`;
            }
            if (LANG === "ja") {
                return `言語を選択`;
            }
            if (LANG === "ko") {
                return `언어를 선택하세요`;
            }
            else {
                return `select a language`;
            }
        }

        function noLanguage() {
            if (LANG === "en") {
                return `no language chosen`;
            }
            if (LANG === "es") {
                return `ningún idioma elegido`;
            }
            if (LANG === "pt") {
                return `nenhum idioma escolhido`;
            }
            if (LANG === "ru") {
                return `язык не выбран`;
            }
            if (LANG === "de") {
                return `keine Sprache gewählt`;
            }
            if (LANG === "pl") {
                return `nie wybrano języka`;
            }
            if (LANG === "fr") {
                return `aucune langue choisie`;
            }
            if (LANG === "it") {
                return `nessuna lingua scelta`;
            }
            if (LANG === "zh") {
                return `沒有選擇語言`;
            }
            if (LANG === "ja") {
                return `言語が選択されていません`;
            }
            if (LANG === "ko") {
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

        var longLangArray = ["English", "español", "português", "русский", "Deutsch", "polski", "français", "italiano", "中國人", "日本", "한국인"];
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
        for (i = 0; i <= 10; i++) {
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

        setTimeout(() => {
            interaction.editReply({ components: [expiredButton] }).catch(err => { console.log(`language command expiredButton Error: ${err.stack}`) });
        }, (60000 * 5))

    },
}