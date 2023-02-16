const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('All the Rockstar Weekly interactions'),
	async execute(interaction) {
		await interaction.deferReply().catch(console.error);

fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
			  if (err) {console.log(`Error: ${err}`)} 
				else {
					let lang03 = data.split("lang:");
					//console.log(`lang03.length: ${lang03.length}`);

					let langArray = [];
					for (i=1; i <= lang03.length - 1; i++) { //first will always be undefined
						let lang02 = lang03[i].split(" -");
						//console.log(`lang02 at ${i}: ${lang02}`);
						
						let lang01 = lang02[0];
						//console.log(`lang01 at ${i}: ${lang01}`);

						langArray.push(lang01);
					}

					//console.log(`langArray: ${langArray}`);

					let guildID03 = data.split("guild:");
					//console.log(`guildID03.length: ${guildID03.length}`);
					let guildIDArray = [];
					for (i=2; i <= guildID03.length - 1; i++) { //first two will always be undefined
						let guildID02 = guildID03[i].split(" -");
						//console.log(`lang02 at ${i}: ${lang02}`);
						
						let guildID01 = guildID02[0];
						//console.log(`lang01 at ${i}: ${lang01}`);

						guildIDArray.push(guildID01);
					}

					//console.log(`guildIDArray: ${guildIDArray}`);	

					let lang = "";
					for (i=0; i <= guildIDArray.length - 1; i++) {
						//console.log(`guildIDArray at ${i}: ${guildIDArray[i]}`);
						//console.log(`langArray at ${i}: ${langArray[i]}`);
						//console.log(`interaction.guildID at ${i}: ${interaction.guild.id}`);

						if (interaction.guild.id === guildIDArray[i]) {
							lang += `${langArray[i]}`;
						}
					}

					//console.log(`lang: ${lang}`);			

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
				return `**/help**\n> A list of commands\n**/gta**\n> Get Get the latest GTA Online bonuses\n**/rdo**\n> Get the latest Red Dead Online bonuses\n**/ping**\n> The bot responds with "pong" when online\n**/autopost**\n> Start, Stop, Configure, Confirm, or test auto post settings.\n**/language**\n> Change the language for the current server.\n\nDo you have questions, comments, or concerns? Join the support server: [Click Here](${process.env.support_link}) \n\nDo you want to add the Rockstar Weekly Bot to another server? [Click Here](${process.env.invite_link})\n\n[RockstarWeeklyBot.com](https://shortest.link/RStarWeekly)`;
			}
			else if (lang === "es") {
				return `**/help**\n> Una lista de comandos\n**/gta**\n> Obtén los últimos bonos de GTA Online\n**/rdo**\n> Obtén los últimos bonos de Red Dead Online\n**/ping**\n> El bot responde con "pong" cuando está en línea\n**/autopost**\n> Iniciar, detener, configurar, confirmar o probar la configuración de publicación automática.\n**/language**\n> Cambia el idioma.\n\n¿Preguntas, comentarios o inquietudes? Únase al servidor de soporte: [Haga clic aquí](${process.env.support_link}) \n\n¿Desea agregar el bot semanal de Rockstar a otro servidor? [Haga clic aquí](${process.env.invite_link})\n\n[RockstarWeeklyBot.com](https://shortest.link/RStarWeekly)`;
			}
			else if (lang === "ru") {
				return `**/help**\n> Список команд\n**/gta**\n> Получите последние бонусы GTA Online\n**/rdo**\n> Получите последние бонусы Red Dead Online\n**/ping**\n> Бот отвечает «pong», когда онлайн\n**/autopost**\n> Настройка и подтверждение изменений автопубликации.\n**/language**\n> Измените язык.\n\nУ вас есть вопросы, комментарии или проблемы? Подключитесь к серверу поддержки: [Нажмите здесь](${process.env.support_link}) \n\nВы хотите добавить еженедельного бота Rockstar на другой сервер? [Нажмите здесь](${process.env.invite_link})\n\n[RockstarWeeklyBot.com](https://shortest.link/RStarWeekly)`;
			}
			else if (lang === "de") {
				return `**/help**\n> Eine Liste von Befehlen\n**/gta**\n> Holen Sie sich die neuesten GTA Online-Boni\n**/rdo**\n> Hol dir die neuesten Red Dead Online Boni\n**/ping**\n> Der Bot antwortet mit "pong", wenn er online ist\n**/autopost**\n> Starten, Beenden, Konfigurieren, Bestätigen oder Testen automatischer Veröffentlichungseinstellungen.\n**/language**\n> Ändere die Sprache.\n\nHaben Sie Fragen, Kommentare oder Bedenken? Treten Sie dem Support-Server bei: [Klicken Sie hier](${process.env.support_link}) \n\nMöchten Sie den Rockstar Weekly Bot zu einem anderen Server hinzufügen? [Klicken Sie hier](${process.env.invite_link})\n\n[RockstarWeeklyBot.com](https://shortest.link/RStarWeekly)`; 
			}
			else if (lang === "pt") {
				return `**/help**\n> Uma lista de comandos\n**/gta**\n> Obtenha os mais recentes bônus do GTA Online\n**/rdo**\n> Receba os mais recentes bónus Red Dead Online\n**/ping**\n> O bot responde com "pong" quando online\n**/autopost**\n> Iniciar, parar, configurar, confirmar ou testar configurações de publicação automática.\n**/language**\n> Alterar o idioma.\n\nVocê tem perguntas, comentários ou preocupações? Ingresse no servidor de suporte: [Clique aqui](${process.env.support_link}) \n\nDeseja adicionar o Rockstar Weekly Bot a outro servidor? [Clique aqui](${process.env.invite_link})\n\n[RockstarWeeklyBot.com](https://shortest.link/RStarWeekly)`;
			}
			else {
				return `**/help**\n> A list of commands\n**/gta**\n> Get the latest GTA Online bonuses\n**/rdo**\n> Get the latest Red Dead Online bonuses\n**/ping**\n> The bot responds with "pong" when online\n**/autopost**\n> Start, stop, configure, confirm, or test auto post settings.\n**/language**\n> Change the language for the current server.\n\nDo you have questions, comments, or concerns? Join the support server: [Click Here](${process.env.support_link}) \n\nDo you want to add the Rockstar Weekly Bot to another server? [Click Here](${process.env.invite_link})\n\n[RockstarWeeklyBot.com](https://shortest.link/RStarWeekly)`;
			}			
		}

      let helpEmbed = new EmbedBuilder()
      .setColor('0x00FFFF') //Teal
      .setTitle(`${helpTitle()}`)
      .setDescription(`${helpDesc()}`);

		await interaction.editReply({ embeds: [helpEmbed] }).catch(console.error.stack);

				}}); 
	},
};