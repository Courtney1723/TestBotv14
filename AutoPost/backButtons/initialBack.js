const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

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
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isButton()) {return};
		if ( (interaction.customId.startsWith(`startback -`)) || (interaction.customId.startsWith(`stopback -`)) || (interaction.customId.startsWith(`configureback -`)) || (interaction.customId.startsWith(`confirmback -`)) ) {

		let start_stop_configure = "";
			if (interaction.customId.startsWith(`startback -`)) {
				start_stop_configure += 'start';
			} 
			else if (interaction.customId.startsWith(`stopback -`)) {
				start_stop_configure += 'stop';
			}	
			else if (interaction.customId.startsWith(`confirmback -`)) {
				start_stop_configure += 'confirm';
			}
			else if (interaction.customId.startsWith(`configureback -`)) {
				start_stop_configure += 'configure';
			}				

		let buttonUserID01 = (interaction.customId).split(`${start_stop_configure}back - `);
		let buttonUserID = buttonUserID01[1];
			//console.log(`startBack buttonUserID: ${buttonUserID}`);
			//console.log(`startBack interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`);
			//console.log(`startBack interaction.user.id: ${interaction.user.id} && buttonUserID: ${buttonUserID}`);			


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
					await interaction.deferUpdate();
					if (lang === "en") {
						//Initial Embed + Buttons (start, stop, confirm, configure)
						await interaction.editReply({ embeds: [initialEmbed], components:[initialButtons] });
					}
					else if (lang === "es") {
						//Initial Embed + Buttons (start, stop, confirm, configure)
						await interaction.editReply({ embeds: [initialEmbedEs], components:[initialButtonsEs] });						
					}
					else if (lang === "ru") {
						//Initial Embed + Buttons (start, stop, confirm, configure)
						await interaction.editReply({ embeds: [initialEmbedRu], components:[initialButtonsRu] });						
					}
					else if (lang === "de") {
						//Initial Embed + Buttons (start, stop, confirm, configure)
						await interaction.editReply({ embeds: [initialEmbedDe], components:[initialButtonsDe] });						
					}
					else if (lang === "pt") {
						//Initial Embed + Buttons (start, stop, confirm, configure)
						await interaction.editReply({ embeds: [initialEmbedPt], components:[initialButtonsPt] });						
					}						
					else {
						await interaction.editReply({ embeds: [initialEmbed], components:[initialButtons] });
					}

				}
			});

			
				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 2))	
			
		} //end if interaction starts with startback - stopback - configureback

	},
}