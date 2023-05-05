const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../events/LANG.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setNameLocalizations({
			"es-ES": 'ayuda',
			ru: 'помощь',
			de: 'hilfe',
			"pt-BR": 'ajuda',
		})			
		.setDescription('Command Descriptions and Useful Links')
		.setDescriptionLocalizations({
			"es-ES": 'Descripción de comandos y enlaces útiles',
			ru: 'Описание команд и полезные ссылки',
			de: 'Befehlsbeschreibungen und nützliche Links',
			"pt-BR": 'Descrições de comandos e links úteis',
		}),
	async execute(interaction) {
		await interaction.deferReply().catch(console.error);

		var lang = await LANG.LANG(interaction);
		//console.log(`LANG:${await LANG.LANG(interaction)}`);	

		function helpTitle() {
			if (lang === "en") {
				return `Rockstar Weekly Bot Commands`;
			}
			else if (lang === "es") {
				return `Rockstar Weekly Comandos de bot`;
			}
			else if (lang === "ru") {
				return `Rockstar Weekly Команды бота`;
			}
			else if (lang === "de") {
				return `Rockstar Weekly Bot-Befehle`;
			}
			else if (lang === "pt") {
				return `Rockstar Weekly Comandos do Bot`;
			}
			else {
				return `Rockstar Weekly Bot Commands`;
			}			
		}

		function helpDesc() {
			if (lang === "en") {
				return `**/autopost**\n> Start, Stop, Confirm, or test auto post settings.\n**/gta**\n> Get the latest GTA Online bonuses\n**/help**\n> A list of commands\n**/language**\n> Change the language for the current server.\n**/ping**\n> The bot responds with "pong" when online\n**/rdo**\n> Get the latest Red Dead Online bonuses\n\n[Click here](${process.env.YouTubeExamplesEnglish}) to view examples of commands on YouTube.\n\nDo you have questions, comments, or concerns? Join the support server: [Click Here](${process.env.support_link}) \n\nDo you want to add the Rockstar Weekly Bot to another server? [Click Here](${process.env.invite_link})\n\n[RockstarWeeklyBot.com](https://shortest.link/RStarWeekly)`;
			}
			else if (lang === "es") {
				return `**/ayuda**\n> Una lista de comandos\n**/gta**\n> Obtén los últimos bonos de GTA Online\n**/idioma**\n> Cambia el idioma.\n**/ping**\n> El bot responde con "pong" cuando está en línea\n**/publicaciones-automáticas**\n> Iniciar, detener, confirmar o probar la configuración de publicación automática.\n**/rdo**\n> Obtén los últimos bonos de Red Dead Online\n\n[Haga clic aquí](${process.env.YouTubeExamplesSpanish}) para ver ejemplos de los comandos en YouTube.\n\n¿Preguntas, comentarios o inquietudes? Únase al servidor de soporte: [Haga clic aquí](${process.env.support_link}) \n\n¿Desea agregar el bot semanal de Rockstar a otro servidor? [Haga clic aquí](${process.env.invite_link})\n\n[RockstarWeeklyBot.com](https://shortest.link/RStarWeekly)`;
			}
			else if (lang === "ru") {
				return `**/автопубликации**\n> Настройка и подтверждение изменений автопубликации.\n**/помощь**\n> Список команд\n**/язык**\n> Измените язык.\n**/gta**\n> Получите последние бонусы GTA Online\n**/ping**\n> Бот отвечает «pong», когда онлайн\n**/rdo**\n> Получите последние бонусы Red Dead Online\n\n[Щелкните здесь](${process.env.YouTubeExamplesRussian}), чтобы просмотреть примеры команд на YouTube.\n\nУ вас есть вопросы, комментарии или проблемы? Подключитесь к серверу поддержки: [Нажмите здесь](${process.env.support_link}) \n\nВы хотите добавить еженедельного бота Rockstar на другой сервер? [Нажмите здесь](${process.env.invite_link})\n\n[RockstarWeeklyBot.com](https://courtney1723.github.io/Rockstar-Weekly-Website)`;
			}
			else if (lang === "de") {
				return `**/automatische-veröffentlichung**\n> Starten, Beenden, Bestätigen oder Testen automatischer Veröffentlichungseinstellungen.\n**/gta**\n> Holen Sie sich die neuesten GTA Online-Boni\n**/hilfe**\n> Eine Liste von Befehlen\n**/ping**\n> Der Bot antwortet mit "pong", wenn er online ist\n**/rdo**\n> Hol dir die neuesten Red Dead Online Boni\n**/sprache**\n> Ändere die Sprache.\n\n[Klicken Sie hier](${process.env.YouTubeExamplesGerman}), um Beispiele für die Befehle auf YouTube anzuzeigen.\n\nHaben Sie Fragen, Kommentare oder Bedenken? Treten Sie dem Support-Server bei: [Klicken Sie hier](${process.env.support_link}) \n\nMöchten Sie den Rockstar Weekly Bot zu einem anderen Server hinzufügen? [Klicken Sie hier](${process.env.invite_link})\n\n[RockstarWeeklyBot.com](https://shortest.link/RStarWeekly)`; 
			}
			else if (lang === "pt") {
				return `**/ajuda**\n> Uma lista de comandos\n**/gta**\n> Obtenha os mais recentes bônus do GTA Online\n**/idioma**\n> Alterar o idioma.\n**/ping**\n> O bot responde com "pong" quando online\n**/postagens-automáticas**\n> Iniciar, parar, confirmar ou testar configurações de publicação automática.\n**/rdo**\n> Receba os mais recentes bónus Red Dead Online\n\n[Clique aqui](${process.env.YouTubeExamplesPortuguese}) para ver exemplos dos comandos no YouTube.\n\nVocê tem perguntas, comentários ou preocupações? Ingresse no servidor de suporte: [Clique aqui](${process.env.support_link}) \n\nDeseja adicionar o Rockstar Weekly Bot a outro servidor? [Clique aqui](${process.env.invite_link})\n\n[RockstarWeeklyBot.com](https://shortest.link/RStarWeekly)`;
			}
			else {
				return `**/autopost**\n> Start, Stop, Confirm, or test auto post settings.\n**/gta**\n> Get the latest GTA Online bonuses\n**/help**\n> A list of commands\n**/language**\n> Change the language for the current server.\n**/ping**\n> The bot responds with "pong" when online\n**/rdo**\n> Get the latest Red Dead Online bonuses\n\n[Click here](${process.env.YouTubeExamplesEnglish}) to view examples of commands on YouTube.\n\nDo you have questions, comments, or concerns? Join the support server: [Click Here](${process.env.support_link}) \n\nDo you want to add the Rockstar Weekly Bot to another server? [Click Here](${process.env.invite_link})\n\n[RockstarWeeklyBot.com](https://shortest.link/RStarWeekly)`;
			}			
		}

      let helpEmbed = new EmbedBuilder()
      .setColor(0x00FFFF) //Teal
      .setTitle(`${helpTitle()}`)
      .setDescription(`${helpDesc()}`);

		await interaction.editReply({ embeds: [helpEmbed] }).catch(console.error.stack);

	},
};