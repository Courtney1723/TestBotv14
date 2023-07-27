const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
//const LANG = require('../events/LANG.js');

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
			"zh-CN": '帮助',
			"zh-TW": '幫助',			
			ja: 'ヘルプ',
			ko: '돕다',
		})
		.setDescription('Command Descriptions and Useful Links')
		.setDescriptionLocalizations({
			"es-ES": 'Descripción de comandos y enlaces útiles',
			"pt-BR": 'Descrições de comandos e links úteis',			
			ru: 'Описание команд и полезные ссылки',
			de: 'Befehlsbeschreibungen und nützliche Links',
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

		var LANG = interaction.locale.toString();
		//console.log(`LANG: ${LANG}`);		

		function helpTitle() {
			if (LANG.includes("en")) {
				return `Rockstar Weekly Bot Commands`;
			}
			else if (LANG.includes("es")) {
				return `Rockstar Weekly Comandos de bot`;
			}
			else if (LANG.includes("pt")) {
				return `Comandos de bot Rockstar Weekly`;
			}
			else if (LANG.includes("ru")) {
				return `Rockstar Weekly Команды бота`;
			}
			else if (LANG.includes("de")) {
				return `Rockstar Weekly-Bot-Befehle`;
			}
			else if (LANG.includes("pl")) {
				return `Polecenia botów Rockstar Weekly`;
			}
			else if (LANG.includes("fr")) {
				return `Commandes du bot Rockstar Weekly`;
			}
			else if (LANG.includes("it")) {
				return `Comandi del bot di Rockstar Weekly`;
			}
			else if (LANG.includes("CN")) {
				return `Rockstar Weekly 机器人命令`;
			}
			else if (LANG.includes("TW")) {
				return `Rockstar Weekly 機器人命令`;
			}
			else if (LANG.includes("ja")) {
				return `ロックスター・ウィークリーのボットコマンド`;
			}
			else if (LANG.includes("ko")) {
				return `Rockstar Weekly 봇 명령어`;
			}
			else {
				return `Rockstar Weekly Bot Commands`;
			}
		}

		function helpDesc() {
			if (LANG.includes("en")) {
				return `**/autopost**\n> Start, Stop, Confirm, or test auto post settings.\n**/gta**\n> Get the latest GTA Online bonuses\n**/help**\n> A list of commands\n**/language**\n> Change the language for the current server.\n**/ping**\n> The bot responds with "pong" when online\n**/rdo**\n> Get the latest Red Dead Online bonuses`;
			}
			else if (LANG.includes("es")) {
				return `**/ayuda**\n> Una lista de comandos\n**/gta**\n> Obtén los últimos bonos de GTA Online\n**/idioma**\n> Cambia el idioma.\n**/latencia**\n> El bot responde con "pong" con tiempo de respuesta en milisegundos cuando está en línea\n**/publicaciones-automáticas**\n> Iniciar, detener, confirmar o probar la configuración de publicación automática.\n**/rdo**\n> Obtén los últimos bonos de Red Dead Online`;
			}
			else if (LANG.includes("pt")) {
				return `**/ajuda**\n> Uma lista de comandos\n**/gta**\n> Obtenha os mais recentes bônus do GTA Online\n**/idioma**\n> Alterar o idioma.\n**/latência**\n> O bot responde com "pong" quando online\n**/postagens-automáticas**\n> Iniciar, parar, confirmar ou testar configurações de publicação automática.\n**/rdo**\n> Receba os mais recentes bónus Red Dead Online`;
			}
			else if (LANG.includes("ru")) {
				return `**/автопубликации**\n> Настройка и подтверждение изменений автопубликации.\n**/задержка**\n> Бот отвечает «pong», когда онлайн\n**/помощь**\n> Список команд\n**/язык**\n> Измените язык.\n**/gta**\n> Получите последние бонусы GTA Online\n**/rdo**\n> Получите последние бонусы Red Dead Online`;
			}
			else if (LANG.includes("de")) {
				return `**/automatische-veröffentlichung**\n> Starten, Beenden, Bestätigen oder Testen automatischer Veröffentlichungseinstellungen.\n**/gta**\n> Holen Sie sich die neuesten GTA Online-Boni\n**/hilfe**\n> Eine Liste von Befehlen\n**/latenz**\n> Der Bot antwortet mit "pong", wenn er online ist\n**/rdo**\n> Hol dir die neuesten Red Dead Online Boni\n**/sprache**\n> Ändere die Sprache.`;
			}
			if (LANG.includes("pl")) {
				return `**/gta**\n> Zdobądź najnowsze bonusy GTA Online\n**/język**\n> Zmień język dla bieżącego serwera.\n**/latência**\n> Bot odpowiada „pong”, gdy jest online\n**/pomoc**\n> Lista poleceń\n**/rdo**\n> Zdobądź najnowsze bonusy Red Dead Online\n**/zautomatyzowane-wiadomości**\n> Rozpocznij, Zatrzymaj, Potwierdź lub przetestuj ustawienia automatycznego publikowania.`;
			}
			else if (LANG.includes("fr")) {
				return `**/aider**\n> Une liste de commandes\n**/gta**\n> Obtenez les derniers bonus de GTA Online\n**/langue**\n> Modifiez la langue du serveur actuel.\n**/latence**\n> Le bot répond par "pong" lorsqu'il est en ligne\n**/messages-automatisés**\n> Démarrer, arrêter, confirmer ou tester les paramètres de publication automatique.\n**/rdo**\n> Obtenez les derniers bonus Red Dead Online`;
			}
			else if (LANG.includes("it")) {
				return `**/aiuto**\n> Un elenco di comandi\n**/gta**\n> Ottieni gli ultimi bonus di GTA Online\n**/latenza**\n> Il bot risponde con "pong" quando è online\n**/lingua**\n> Cambia la lingua per il server corrente.\n**/messaggi-automatici**\n> Avvia, arresta, conferma o prova le impostazioni di pubblicazione automatica.\n**/rdo**\n> Ottieni gli ultimi bonus di Red Dead Online`;
			}
			else if (LANG.includes("CN")) {
				return `**/帮助**\n> 命令列表\n**/乒**\n> 机器人在线时以“pong”响应\n**/语言**\n> 更改当前服务器的语言\n**/自动消息**\n> 启动、停止、确认或测试自动发布设置\n**/gta**\n> 获取最新的 GTA 在线模式奖励\n**/rdo**\n> 获取最新的 Red Dead 在线模式奖励`;
			}				
			else if (LANG.includes("TW")) {
				return `**/幫助**\n> 命令列表\n**/乒**\n> 機器人在線時以“pong”響應\n**/語言**\n> 更改當前服務器的語言\n**/自動消息**\n> 啟動、停止、確認或測試自動發佈設置\n**/gta**\n> 獲取最新的 GTA 在線模式獎勵\n**/rdo**\n> 獲取最新的 Red Dead 在線模式獎勵`;
			}
			else if (LANG.includes("ja")) {
				return `**/gta**\n> 最新のGTAオンラインボーナスをゲット\n**/rdo**\n> 最新の Red Dead Online ボーナスを入手する\n**/ヘルプ**\n> コマンド一覧\n**/レイテンシー**\n> オンラインの場合、ボットは「pong」で応答します。\n**/言語**\n> 現在のサーバーの言語を変更します。\n**/自動メッセージ**\n> 自動投稿設定を開始、停止、確認、またはテストします。`;
			}
			else if (LANG.includes("ko")) {
				return `**/돕다**\n> 명령 목록\n**/언어**\n> 현재 서버의 언어를 변경합니다.\n**/자동화된-메시지**\n> 자동 게시 설정을 시작, 중지, 확인 또는 테스트합니다.\n**/지연**\n> 봇은 온라인 상태일 때 "pong"으로 응답합니다.\n**/gta**\n> 최신 GTA 온라인 보너스 받기\n**/rdo**\n> 최신 Red Dead 온라인 보너스 받기`;
			}
			else {
				return `**/autopost**\n> Start, Stop, Confirm, or test auto post settings.\n**/gta**\n> Get the latest GTA Online bonuses\n**/help**\n> A list of commands\n**/language**\n> Change the language for the current server.\n**/ping**\n> The bot responds with "pong" when online\n**/rdo**\n> Get the latest Red Dead Online bonuses`;
			}
		}

		function YouTube() {
			if (LANG.includes("en")) {
				return `Examples`;
			}
			else if (LANG.includes("es")) {
				return `Sitio web`;
			}
			else if (LANG.includes("pt")) {
				return `Exemplos`;
			}
			else if (LANG.includes("ru")) {
				return `Примеры`;
			}
			else if (LANG.includes("de")) {
				return `Beispiele`;
			}
			else if (LANG.includes("pl")) {
				return `Witryna internetowa`;
			}
			else if (LANG.includes("fr")) {
				return `Exemples`;
			}
			else if (LANG.includes("it")) {
				return `Esempi`;
			}
			else if (LANG.includes("CN")) {
				return `例子`;
			}
			else if (LANG.includes("TW")) {
				return `例子`;
			}
			else if (LANG.includes("ja")) {
				return `例`;
			}
			else if (LANG.includes("ko")) {
				return `예`;
			}
			else {
				return `Examples`;
			}
		}
		function YouTubeLink() {
			if (LANG.includes("en")) {
				return process.env.YouTubeExamplesEnglish;
			}
			else if (LANG.includes("es")) {
				return process.env.YouTubeExamplesSpanish;
			}
			else if (LANG.includes("pt")) {
				return process.env.YouTubeExamplesPortuguese;
			}
			else if (LANG.includes("ru")) {
				return process.env.YouTubeExamplesRussian;
			}
			else if (LANG.includes("de")) {
				return process.env.YouTubeExamplesGerman;
			}
			else {
				return process.env.YouTubeExamplesEnglish;
			}
		}
		function Donate() {
			if (LANG.includes("en")) {
				return `Donations`;
			}
			else if (LANG.includes("es")) {
				return `Donaciones`;
			}
			else if (LANG.includes("pt")) {
				return `Doações`;
			}
			else if (LANG.includes("ru")) {
				return `Пожертвования`;
			}
			else if (LANG.includes("de")) {
				return `Spenden`;
			}
			else if (LANG.includes("pl")) {
				return `Doações`;
			}
			else if (LANG.includes("fr")) {
				return `Des dons`;
			}
			else if (LANG.includes("it")) {
				return `donazioni`;
			}
			else if (LANG.includes("CN")) {
				return `捐款`;
			}
			else if (LANG.includes("TW")) {
				return `捐款`;
			}
			else if (LANG.includes("ja")) {
				return `寄付`;
			}
			else if (LANG.includes("ko")) {
				return `기부를`;
			}
			else {
				return `Donations`;
			}
		}
		function Support() {
			if (LANG.includes("en")) {
				return `Support Server`;
			}
			else if (LANG.includes("es")) {
				return `Servidor de soporte`;
			}
			else if (LANG.includes("pt")) {
				return `servidor de suporte`;
			}
			else if (LANG.includes("ru")) {
				return `Сервер поддержки`;
			}
			else if (LANG.includes("de")) {
				return `Support-Server`;
			}
			else if (LANG.includes("pl")) {
				return `Serwer wsparcia`;
			}
			else if (LANG.includes("fr")) {
				return `Serveur d'assistance`;
			}
			else if (LANG.includes("it")) {
				return `Server di supporto`;
			}
			else if (LANG.includes("CN")) {
				return `支持服务器`;
			}
			else if (LANG.includes("TW")) {
				return `支持服務器`;
			}
			else if (LANG.includes("ja")) {
				return `サポートサーバー`;
			}
			else if (LANG.includes("ko")) {
				return `지원 서버`;
			}
			else {
				return `Support Server`;
			}
		}
		function Website() {
			if (LANG.includes("en")) {
				return `Website`;
			}
			else if (LANG.includes("es")) {
				return `Apoyo`;
			}
			else if (LANG.includes("pt")) {
				return `Site`;
			}
			else if (LANG.includes("ru")) {
				return `Сайт`;
			}
			else if (LANG.includes("de")) {
				return `Website`;
			}
			else if (LANG.includes("pl")) {
				return `Witryna internetowa`;
			}
			else if (LANG.includes("fr")) {
				return `Site Web`;
			}
			else if (LANG.includes("it")) {
				return `Sito web`;
			}
			else if (LANG.includes("CN")) {
				return `网站`;
			}
			else if (LANG.includes("TW")) {
				return `網站`;
			}
			else if (LANG.includes("ja")) {
				return `ウェブサイト`;
			}
			else if (LANG.includes("ko")) {
				return `웹사이트`;
			}
			else {
				return `Website`;
			}
		}

		let helpEmbed = new EmbedBuilder()
			.setColor(0x00FFFF) //Teal
			.setTitle(`${helpTitle()}`)
			.setDescription(`${helpDesc()}`);

		const linkButtons = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji(`<:RStar_YouTube_Logo:1130595237245485086>`)
					.setLabel(`${YouTube()}`)
					.setURL(`${YouTubeLink()}`)
					.setStyle(ButtonStyle.Link),
				new ButtonBuilder()
					.setEmoji(`<:RSWeekly:1025248227248848940>`)
					.setLabel(`${Website()}`)
					.setURL(`https://www.RockstarWeeklyBot.com`)
					.setStyle(ButtonStyle.Link)				
			);
		const linkButtons2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji(`<:RStar_Kofi_Donate:1130584945815994539>`)
					.setLabel(`${Donate()}`)
					.setURL(`https://ko-fi.com/courtney1723`)
					.setStyle(ButtonStyle.Link),
				new ButtonBuilder()
					.setEmoji(`<:RStar_Patreon_Donate:1133200999008456764>`)
					.setLabel(`${Donate()}`)
					.setURL(`https://www.patreon.com/Courtney1723`)
					.setStyle(ButtonStyle.Link)				
			);		
		const linkButtons3 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji(`<:RStar_Support:1130593247908085860>`)
					.setLabel(`${Support()}`)
					.setURL(`${process.env.support_link}`)
					.setStyle(ButtonStyle.Link)
			);

		await interaction.editReply({ embeds: [helpEmbed], components: [linkButtons, linkButtons2, linkButtons3] }).catch(console.error.stack);

	},
};