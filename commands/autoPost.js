const { Client, GatewayIntentBits, Partials,  SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, PermissionsBitField } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const { exec } = require('node:child_process');

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
		.setName('autopost')
		.setDescription('Configure and Confirm Auto Post Settings')
		.setDMPermission(false),
	async execute(interaction) {
		

		const initialEmbed = new EmbedBuilder()
			.setColor(`0x00FFCC`) //Seafoam green
			.setTitle(`Auto Post Settings`)
			.setDescription(`Click **\'Start\'** to add an auto post channel.
Click **\'Stop\'** to remove an auto post channel.
Click **\'Configure\'** to add or remove a role that can configure auto post settings.
Click **\'Confirm\'** to view current settings or test auto posts.`)
			.setFooter({text: `Only Administrators can start, stop, or configure auto posts by default.`, iconURL: process.env.logo_link })

		const initialButtons = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`start - ${interaction.user.id}`)
					.setLabel('Start')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId(`stop - ${interaction.user.id}`)
					.setLabel('Stop')
					.setStyle(ButtonStyle.Danger),			
				new ButtonBuilder()
					.setCustomId(`configure - ${interaction.user.id}`)
					.setLabel('Configure')
					.setStyle(ButtonStyle.Primary),						
				new ButtonBuilder()
					.setCustomId(`confirm - ${interaction.user.id}`)
					.setLabel('Confirm')
					.setStyle(ButtonStyle.Secondary),					
			);

		const initialEmbedEs = new EmbedBuilder()
			.setColor(`0x00FFCC`) //Seafoam green
			.setTitle(`Configuración de publicación automática`)
			.setDescription(`Clic **\'empezar\'** para agregar un canal.
Clic **\'sopa\'** para quitar un canal.
Clic **\'configurar\'** Para agregar o quitar un rol.
Clic **\'confirm\'** para ver la configuración.`)
			.setFooter({text: `Solo los administradores pueden iniciar, detener o configurar publicaciones automáticas de forma predeterminada.`, iconURL: process.env.logo_link })

		const initialButtonsEs = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`start - ${interaction.user.id}`)
					.setLabel('empezar')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId(`stop - ${interaction.user.id}`)
					.setLabel('sopa')
					.setStyle(ButtonStyle.Danger),			
				new ButtonBuilder()
					.setCustomId(`configure - ${interaction.user.id}`)
					.setLabel('configurar')
					.setStyle(ButtonStyle.Primary),						
				new ButtonBuilder()
					.setCustomId(`confirm - ${interaction.user.id}`)
					.setLabel('confirmar')
					.setStyle(ButtonStyle.Secondary),					
			);		

		const initialEmbedRu = new EmbedBuilder()
			.setColor(`0x00FFCC`) //Seafoam green
			.setTitle(`Автоматические настройки публикации`)
			.setDescription(`Щелчок **\'Начало\'** для того, чтобы добавить канал.
Щелчок **\'Остановка\'** для удаления канала.
Щелчок **\'Настроить\'** Чтобы добавить или удалить роль.
Щелчок **\'Подтверждать\'** для просмотра текущих настроек.`)
			.setFooter({text: `По умолчанию только администраторы могут запускать, останавливать или настраивать автоматические публикации.`, iconURL: process.env.logo_link })

		const initialButtonsRu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`start - ${interaction.user.id}`)
					.setLabel('Начало')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId(`stop - ${interaction.user.id}`)
					.setLabel('Остановка')
					.setStyle(ButtonStyle.Danger),			
				new ButtonBuilder()
					.setCustomId(`configure - ${interaction.user.id}`)
					.setLabel('Настроить')
					.setStyle(ButtonStyle.Primary),						
				new ButtonBuilder()
					.setCustomId(`confirm - ${interaction.user.id}`)
					.setLabel('Подтверждать')
					.setStyle(ButtonStyle.Secondary),					
			);		

		const initialEmbedDe = new EmbedBuilder()
			.setColor(`0x00FFCC`) //Seafoam green
			.setTitle(`Automatische Post-Einstellungen`)
			.setDescription(`Klicken **\'Anfangen\'** so fügen Sie einen Kanal hinzu.
Klicken **\'Aufhören\'** so entfernen Sie einen Kanal.
Klicken **\'Konfigurieren\'** so fügen Sie eine Rolle hinzu oder entfernen sie.
Klicken **\'Bestätigen\'** um aktuelle Einstellungen anzuzeigen.`)
			.setFooter({text: `Nur Administratoren können automatische Beiträge standardmäßig starten, stoppen oder konfigurieren.`, iconURL: process.env.logo_link })

		const initialButtonsDe = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`start - ${interaction.user.id}`)
					.setLabel('Anfangen')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId(`stop - ${interaction.user.id}`)
					.setLabel('Aufhören')
					.setStyle(ButtonStyle.Danger),			
				new ButtonBuilder()
					.setCustomId(`configure - ${interaction.user.id}`)
					.setLabel('Konfigurieren')
					.setStyle(ButtonStyle.Primary),						
				new ButtonBuilder()
					.setCustomId(`confirm - ${interaction.user.id}`)
					.setLabel('Bestätigen')
					.setStyle(ButtonStyle.Secondary),					
			);		

		const initialEmbedPt = new EmbedBuilder()
			.setColor(`0x00FFCC`) //Seafoam green
			.setTitle(`Definições de posts automáticos`)
			.setDescription(`Clique **\'Começar\'** para adicionar um canal.
Clique **\'Parar\'** para remover um canal.
Clique **\'Configure\'** para adicionar ou remover uma função.
Clique **\'Confirmar\'** para ver as definições atuais.`)
			.setFooter({text: `Apenas os administradores podem iniciar, parar ou configurar publicações automáticas por predefinição.`, iconURL: process.env.logo_link })

		const initialButtonsPt = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`start - ${interaction.user.id}`)
					.setLabel('Começar')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId(`stop - ${interaction.user.id}`)
					.setLabel('Parar')
					.setStyle(ButtonStyle.Danger),			
				new ButtonBuilder()
					.setCustomId(`configure - ${interaction.user.id}`)
					.setLabel('Configure')
					.setStyle(ButtonStyle.Primary),						
				new ButtonBuilder()
					.setCustomId(`confirm - ${interaction.user.id}`)
					.setLabel('Confirmar')
					.setStyle(ButtonStyle.Secondary),					
			);	

//--BEGIN TRANSLATIONS--//		

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

		function autoPostTitle() {
			if (lang === "en") {
				return `Auto Post Settings`;
			}
			else if (lang === "es") {
				return `Configuración de publicación automática`;
			}
			else if (lang === "ru") {
				return `Автоматические настройки публикации`;
			}
			else if (lang === "de") {
				return `Automatische Post-Einstellungen`;
			}
			else if (lang === "pt") {
				return `Configurações de lançamento automático`;
			}
			else {
				return `Auto Post Settings`;
			}			
		}	

		function autoPostDesc() {
			if (lang === "en") {
				return `Click **\'Start\'** to add an auto post channel.
Click **\'Stop\'** to remove an auto post channel.
Click **\'Configure\'** to add or remove a role that can configure auto post settings.
Click **\'Confirm\'** to view current settings or test auto posts.`;
			}
			else if (lang === "es") {
				return `Clic **\'empezar\'** para agregar un canal.
Clic **\'sopa\'** para quitar un canal.
Clic **\'configurar\'** Para agregar o quitar un rol.
Clic **\'confirm\'** para ver la configuración.`;
			}
			else if (lang === "ru") {
				return `Щелчок **\'Начало\'** для того, чтобы добавить канал.
Щелчок **\'Остановка\'** для удаления канала.
Щелчок **\'Настроить\'** Чтобы добавить или удалить роль.
Щелчок **\'Подтверждать\'** для просмотра текущих настроек.`;
			}
			else if (lang === "de") {
				return `Klicken **\'Anfangen\'** so fügen Sie einen Kanal hinzu.
Klicken **\'Aufhören\'** so entfernen Sie einen Kanal.
Klicken **\'Konfigurieren\'** so fügen Sie eine Rolle hinzu oder entfernen sie.
Klicken **\'Bestätigen\'** um aktuelle Einstellungen anzuzeigen.`;
			}
			else if (lang === "pt") {
				return `Clique **\'Começar\'** para adicionar um canal.
Clique **\'Parar\'** para remover um canal.
Clique **\'Configurar\'** para adicionar ou remover uma função.
Clique **\'Confirmar\'** para ver as definições atuais.`;
			}
			else {
				return `Click **\'Start\'** to add an auto post channel.
Click **\'Stop\'** to remove an auto post channel.
Click **\'Configure\'** to add or remove a role that can configure auto post settings.
Click **\'Confirm\'** to view current settings or test auto posts.`;
			}			
		}

		function footerText() {
			if (lang === "en") {
				return `Only Administrators can start, stop, or configure auto posts by default.`;
			}
			else if (lang === "es") {
				return `Solo los administradores pueden iniciar, detener o configurar publicaciones automáticas de forma predeterminada.`;
			}
			else if (lang === "ru") {
				return `По умолчанию только администраторы могут запускать, останавливать или настраивать автоматические публикации.`;
			}
			else if (lang === "de") {
				return `Nur Administratoren können automatische Beiträge standardmäßig starten, stoppen oder konfigurieren.`;
			}
			else if (lang === "pt") {
				return `Apenas os administradores podem iniciar, parar ou configurar publicações automáticas por predefinição.`;
			}
			else {
				return `Only Administrators can start, stop, or configure auto posts by default.`;
			}			
		}

		function start() {
			if (lang === "en") {
				return `Start`;
			}
			else if (lang === "es") {
				return `empezar`;
			}
			else if (lang === "ru") {
				return `Начало`;
			}
			else if (lang === "de") {
				return `Anfangen`;
			}
			else if (lang === "pt") {
				return `Começar`;
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
				return `sopa`;
			}
			else if (lang === "ru") {
				return `Остановка`;
			}
			else if (lang === "de") {
				return `Aufhören`;
			}
			else if (lang === "pt") {
				return `Parar`;
			}
			else {
				return `Stop`;
			}
		}

		function configure() {
			if (lang === "en") {
				return `Configure`;
			}
			else if (lang === "es") {
				return `configurar`;
			}
			else if (lang === "ru") {
				return `Настроить`;
			}
			else if (lang === "de") {
				return `Konfigurieren`;
			}
			else if (lang === "pt") {
				return `Configurar`;
			}
			else {
				return `Configure`;
			}			
		}	

		function confirm() {
			if (lang === "en") {
				return `Confirm`;
			}
			else if (lang === "es") {
				return `confirmar`;
			}
			else if (lang === "ru") {
				return `Подтверждать`;
			}
			else if (lang === "de") {
				return `Bestätigen`;
			}
			else if (lang === "pt") {
				return `Confirmar`;
			}
			else {
				return `Confirm`;
			}			
		}			

		const initialEmbed = new EmbedBuilder()
			.setColor(`0x00FFCC`) //Seafoam green
			.setTitle(`${autoPostTitle()}`)
			.setDescription(`${autoPostDesc()}`)
			.setFooter({text: `${footerText()}`, iconURL: process.env.logo_link })

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
					.setCustomId(`configure - ${interaction.user.id}`)
					.setLabel(`${configure()}`)
					.setStyle(ButtonStyle.Primary),						
				new ButtonBuilder()
					.setCustomId(`confirm - ${interaction.user.id}`)
					.setLabel(`${confirm()}`)
					.setStyle(ButtonStyle.Secondary),					
			);					

//--END TRANSLATIONS--//					

						//Initial Embed + Buttons (start, stop, confirm, configure)
						interaction.reply({ embeds: [initialEmbed], components:[initialButtons] });

				}
			}); //end fs.readFile LANGDataVase.txt


		setTimeout(() => {
			interaction.editReply({components: [expiredButton]})
		}, (60000 * 5))
		

}}
