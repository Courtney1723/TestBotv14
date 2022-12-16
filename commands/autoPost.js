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

					console.log(`lang: ${lang}`);

					if (lang === "en") {
						//Initial Embed + Buttons (start, stop, confirm, configure)
						interaction.reply({ embeds: [initialEmbed], components:[initialButtons] });
					}
					else if (lang === "es") {
						//Initial Embed + Buttons (start, stop, confirm, configure)
						interaction.reply({ embeds: [initialEmbedEs], components:[initialButtonsEs] });						
					}
					else if (lang === "ru") {
						//Initial Embed + Buttons (start, stop, confirm, configure)
						interaction.reply({ embeds: [initialEmbedRu], components:[initialButtonsRu] });						
					}
					else if (lang === "de") {
						//Initial Embed + Buttons (start, stop, confirm, configure)
						interaction.reply({ embeds: [initialEmbedDe], components:[initialButtonsDe] });						
					}

				}
			});


		setTimeout(() => {
			interaction.editReply({components: [expiredButton]})
		}, (60000 * 2))
		

}}
