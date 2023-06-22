const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../events/LANG.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setNameLocalizations({
            "es-ES": 'ayuda',
            "pt-BR": 'ajuda',
            ru: 'помощь',
            de: 'hilfe',
            pl: 'pomoc',
            fr: 'aider',
            it: 'aiuto',
            "zh-CN": '幫助',
            ja: 'ヘルプ',
            ko: '돕다',
        })
        .setDescription('Command Descriptions and Useful Links')
        .setDescriptionLocalizations({
            "es-ES": 'Descripción de comandos y enlaces útiles',
            ru: 'Описание команд и полезные ссылки',
            de: 'Befehlsbeschreibungen und nützliche Links',
            "pt-BR": 'Descrições de comandos e links úteis',
            pl: 'Lista poleceń i przydatne linki',
            fr: 'Une liste de commandes et de liens utiles',
            it: 'Un elenco di comandi e link utili',
            "zh-CN": '命令列表和有用的鏈接',
            "zh-TW": '命令列表和有用的鏈接',
            ja: 'コマンドと便利なリンクのリスト',
            ko: '명령 및 유용한 링크 목록',
        }),
    async execute(interaction) {
        await interaction.deferReply().catch(console.error);

        //var lang = await LANG.LANG(interaction);
        //console.log(`LANG:${await LANG.LANG(interaction)}`);

        var LANG02 = interaction.locale.toString().split("-");
        var lang = LANG02[0];
        //console.log(`lang:${lang}`);		

        function helpTitle() {
            if (lang === "en") {
                return `Rockstar Weekly Bot Commands`;
            }
            else if (lang === "es") {
                return `Rockstar Weekly Comandos de bot`;
            }
            else if (lang === "pt") {
                return `Comandos de bot Rockstar Weekly`;
            }
            else if (lang === "ru") {
                return `Rockstar Weekly Команды бота`;
            }
            else if (lang === "de") {
                return `Rockstar Weekly-Bot-Befehle`;
            }
            else if (lang === "pl") {
                return `Polecenia botów Rockstar Weekly`;
            }
            else if (lang === "fr") {
                return `Commandes du bot Rockstar Weekly`;
            }
            else if (lang === "it") {
                return `Comandi del bot di Rockstar Weekly`;
            }
            else if (lang === "zh") {
                return `Rockstar Weekly 機器人命令`;
            }
            else if (lang === "ja") {
                return `ロックスター・ウィークリーのボットコマンド`;
            }
            else if (lang === "ko") {
                return `Rockstar Weekly 봇 명령어`;
            }
            else {
                return `Rockstar Weekly Bot Commands`;
            }
        }

        function helpDesc() {
            if (lang === "en") {
                return `**/autopost**\n> Start, Stop, Confirm, or test auto post settings.\n**/gta**\n> Get the latest GTA Online bonuses\n**/help**\n> A list of commands\n**/language**\n> Change the language for the current server.\n**/ping**\n> The bot responds with "pong" when online\n**/rdo**\n> Get the latest Red Dead Online bonuses\n\n[Click here](${process.env.YouTubeExamplesEnglish}) to view examples of commands on YouTube.\n\nDo you have questions, comments, or concerns? Join the support server: [Click Here](${process.env.support_link}) \n\nDo you want to add the Rockstar Weekly Bot to another server? [Click Here](${process.env.invite_link})\n\n[www.RockstarWeeklyBot.com](https://www.RockstarWeeklyBot.com)`;
            }
            else if (lang === "es") {
                return `**/ayuda**\n> Una lista de comandos\n**/gta**\n> Obtén los últimos bonos de GTA Online\n**/idioma**\n> Cambia el idioma.\n**/latencia**\n> El bot responde con "pong" con tiempo de respuesta en milisegundos cuando está en línea\n**/publicaciones-automáticas**\n> Iniciar, detener, confirmar o probar la configuración de publicación automática.\n**/rdo**\n> Obtén los últimos bonos de Red Dead Online\n\n[Ejemplos de los comandos en YouTube](${process.env.YouTubeExamplesSpanish}) \n\n¿Preguntas, comentarios o inquietudes? [Únase al servidor de soporte](${process.env.support_link}) \n\n¿Desea agregar el bot semanal de Rockstar a otro servidor? [Haga clic aquí](${process.env.invite_link})\n\n[www.RockstarWeeklyBot.com](https://www.RockstarWeeklyBot.com)`;
            }
            else if (lang === "pt") {
                return `**/ajuda**\n> Uma lista de comandos\n**/gta**\n> Obtenha os mais recentes bônus do GTA Online\n**/idioma**\n> Alterar o idioma.\n**/latência**\n> O bot responde com "pong" quando online\n**/postagens-automáticas**\n> Iniciar, parar, confirmar ou testar configurações de publicação automática.\n**/rdo**\n> Receba os mais recentes bónus Red Dead Online\n\n[Ver exemplos dos comandos no YouTube](${process.env.YouTubeExamplesPortuguese}).\n\nVocê tem perguntas, comentários ou preocupações? [Ingresse no servidor de suporte](${process.env.support_link}) \n\nDeseja adicionar o Rockstar Weekly Bot a outro servidor? [Clique aqui](${process.env.invite_link})\n\n[www.RockstarWeeklyBot.com](https://www.RockstarWeeklyBot.com)`;
            }
            else if (lang === "ru") {
                return `**/автопубликации**\n> Настройка и подтверждение изменений автопубликации.\n**/задержка**\n> Бот отвечает «pong», когда онлайн\n**/помощь**\n> Список команд\n**/язык**\n> Измените язык.\n**/gta**\n> Получите последние бонусы GTA Online\n**/rdo**\n> Получите последние бонусы Red Dead Online\n\n[Посмотреть примеры команд на YouTube](${process.env.YouTubeExamplesRussian}).\n\nУ вас есть вопросы, комментарии или проблемы? [Подключитесь к серверу поддержки](${process.env.support_link}) \n\nВы хотите добавить бота Rockstar Weekly на другой сервер? [Нажмите здесь](${process.env.invite_link})\n\n[www.RockstarWeeklyBot.com](https://www.RockstarWeeklyBot.com)`;
            }
            else if (lang === "de") {
                return `**/automatische-veröffentlichung**\n> Starten, Beenden, Bestätigen oder Testen automatischer Veröffentlichungseinstellungen.\n**/gta**\n> Holen Sie sich die neuesten GTA Online-Boni\n**/hilfe**\n> Eine Liste von Befehlen\n**/latenz**\n> Der Bot antwortet mit "pong", wenn er online ist\n**/rdo**\n> Hol dir die neuesten Red Dead Online Boni\n**/sprache**\n> Ändere die Sprache.\n\n[Beispiele für die Befehle finden Sie auf YouTube](${process.env.YouTubeExamplesGerman}).\n\nHaben Sie Fragen, Kommentare oder Bedenken? [Treten Sie dem Support-Server bei](${process.env.support_link}) \n\nMöchten Sie den Rockstar Weekly Bot zu einem anderen Server hinzufügen? [Klicken Sie hier](${process.env.invite_link})\n\n[www.RockstarWeeklyBot.com](https://www.RockstarWeeklyBot.com)`;
            }
            if (lang === "pl") {
                return `**/gta**\n> Zdobądź najnowsze bonusy GTA Online\n**/język**\n> Zmień język dla bieżącego serwera.\n**/latência**\n> Bot odpowiada „pong”, gdy jest online\n**/pomoc**\n> Lista poleceń\n**/rdo**\n> Zdobądź najnowsze bonusy Red Dead Online\n**/zautomatyzowane-wiadomości**\n> Rozpocznij, Zatrzymaj, Potwierdź lub przetestuj ustawienia automatycznego publikowania.\n\n[Zobacz przykłady poleceń na YouTube](${process.env.YouTubeExamplesEnglish}).\n\nMasz pytania, uwagi lub wątpliwości? [Dołącz do serwera wsparcia](${process.env.support_link}) \n\n[Dodaj bota Rockstar Weekly na inny serwer](${process.env.invite_link})\n\n[www.RockstarWeeklyBot.com](https://www.RockstarWeeklyBot.com)`;
            }
            else if (lang === "fr") {
                return `**/aider**\n> Une liste de commandes\n**/gta**\n> Obtenez les derniers bonus de GTA Online\n**/langue**\n> Modifiez la langue du serveur actuel.\n**/latence**\n> Le bot répond par "pong" lorsqu'il est en ligne\n**/messages-automatisés**\n> Démarrer, arrêter, confirmer ou tester les paramètres de publication automatique.\n**/rdo**\n> Obtenez les derniers bonus Red Dead Online\n\n[voir des exemples de commandes sur YouTube](${process.env.YouTubeExamplesEnglish}).\n\nAvez-vous des questions, des commentaires ou des préoccupations? [Rejoignez le serveur d'assistance](${process.env.support_link}) \n\n[Ajouter le bot Rockstar Weekly à un autre serveur](${process.env.invite_link})\n\n[www.RockstarWeeklyBot.com](https://www.RockstarWeeklyBot.com)`;
            }
            else if (lang === "it") {
                return `**/aiuto**\n> Un elenco di comandi\n**/gta**\n> Ottieni gli ultimi bonus di GTA Online\n**/latenza**\n> Il bot risponde con "pong" quando è online\n**/lingua**\n> Cambia la lingua per il server corrente.\n**/messaggi-automatici**\n> Avvia, arresta, conferma o prova le impostazioni di pubblicazione automatica.\n**/rdo**\n> Ottieni gli ultimi bonus di Red Dead Online\n\n[Visualizza esempi di comandi su YouTube](${process.env.YouTubeExamplesEnglish}).\n\nHai domande, commenti o dubbi? [Unisciti al server di supporto](${process.env.support_link}) \n\n[Aggiungi il Rockstar Weekly Bot a un altro server](${process.env.invite_link})\n\n[www.RockstarWeeklyBot.com](https://www.RockstarWeeklyBot.com)`;
            }
            else if (lang === "zh") {
                return `**/幫助**\n> 命令列表\n**/乒**\n> 機器人在線時以“pong”響應\n**/語言**\n> 更改當前服務器的語言\n**/自動消息**\n> 啟動、停止、確認或測試自動發佈設置\n**/gta**\n> 獲取最新的 GTA 在線模式獎勵\n**/rdo**\n> 獲取最新的 Red Dead 在線模式獎勵\n\n[在 YouTube 上查看命令示例](${process.env.YouTubeExamplesEnglish}).\n\n您有任何問題、意見或疑慮嗎？ [加入支持服務器](${process.env.support_link}) \n\n[將 Rockstar Weekly 機器人添加到另一台服務器](${process.env.invite_link})\n\n[www.RockstarWeeklyBot.com](https://www.RockstarWeeklyBot.com)`;
            }
            else if (lang === "ja") {
                return `**/gta**\n> 最新のGTAオンラインボーナスをゲット\n**/rdo**\n> 最新の Red Dead Online ボーナスを入手する\n**/ヘルプ**\n> コマンド一覧\n**/レイテンシー**\n> オンラインの場合、ボットは「pong」で応答します。\n**/言語**\n> 現在のサーバーの言語を変更します。\n**/自動メッセージ**\n> 自動投稿設定を開始、停止、確認、またはテストします。\n\n[YouTube でコマンドの例を見る](${process.env.YouTubeExamplesEnglish}).\n\n質問、コメント、または懸念がありますか? [サポートサーバーに参加する](${process.env.support_link}) \n\n[Rockstar Weekly ボットを別のサーバーに追加する](${process.env.invite_link})\n\n[www.RockstarWeeklyBot.com](https://www.RockstarWeeklyBot.com)`;
            }
            else if (lang === "ko") {
                return `**/돕다**\n> 명령 목록\n**/언어**\n> 현재 서버의 언어를 변경합니다.\n**/자동화된-메시지**\n> 자동 게시 설정을 시작, 중지, 확인 또는 테스트합니다.\n**/지연**\n> 봇은 온라인 상태일 때 "pong"으로 응답합니다.\n**/gta**\n> 최신 GTA 온라인 보너스 받기\n**/rdo**\n> 최신 Red Dead 온라인 보너스 받기\n\n[YouTube에서 명령 예 보기](${process.env.YouTubeExamplesEnglish}).\n\n질문, 의견 또는 우려 사항이 있습니까? [지원 서버에 가입](${process.env.support_link}) \n\n[다른 서버에 Rockstar Weekly 봇 추가](${process.env.invite_link})\n\n[www.RockstarWeeklyBot.com](https://www.RockstarWeeklyBot.com)`;
            }
            else {
                return `**/autopost**\n> Start, Stop, Confirm, or test auto post settings.\n**/gta**\n> Get the latest GTA Online bonuses\n**/help**\n> A list of commands\n**/language**\n> Change the language for the current server.\n**/ping**\n> The bot responds with "pong" when online\n**/rdo**\n> Get the latest Red Dead Online bonuses\n\n[Click here](${process.env.YouTubeExamplesEnglish}) to view examples of commands on YouTube.\n\nDo you have questions, comments, or concerns? Join the support server: [Click Here](${process.env.support_link}) \n\nDo you want to add the Rockstar Weekly Bot to another server? [Click Here](${process.env.invite_link})\n\n[www.RockstarWeeklyBot.com](https://www.RockstarWeeklyBot.com)`;
            }
        }

        let helpEmbed = new EmbedBuilder()
            .setColor(0x00FFFF) //Teal
            .setTitle(`${helpTitle()}`)
            .setDescription(`${helpDesc()}`);

        await interaction.editReply({ embeds: [helpEmbed] }).catch(console.error.stack);

    },
};