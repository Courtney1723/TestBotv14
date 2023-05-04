const { Client, GatewayIntentBits, Partials,  SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, PermissionsBitField } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../events/LANG.js');
const { exec } = require('node:child_process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('autopost')
		.setDescription('Configure and Confirm Auto Post Settings')
		.setDMPermission(false),
	async execute(interaction) {

//--BEGIN TRANSLATIONS--//		

		var lang = await LANG.LANG(interaction);
		//console.log(`LANG:${await LANG.LANG(interaction)}`);	

		function autoPostTitle() {
			if (lang === "en") {
				return `Auto Post Settings`;
			}
			else if (lang === "es") {
				return `Configuración de publicación automática`;
			}
			else if (lang === "ru") {
				return `Настройка и подтверждение изменений автопубликации.`;
			}
			else if (lang === "de") {
				return `Einstellungen für die automatische Veröffentlichung`;
			}
			else if (lang === "pt") {
				return `Configurações de Publicação Automática`;
			}
			else {
				return `Auto Post Settings`;
			}			
		}	

		function autoPostDesc() {
			if (lang === "en") {
				return `Click **\'Start\'** to add an auto post channel.
Click **\'Stop\'** to remove an auto post channel.
Click **\'Confirm\'** to view and test current settings.`;
			}
			else if (lang === "es") {
				return `Haga clic en **\'Empezar\'** para agregar un canal.
Haga clic en **\'Detener\'** para quitar un canal.
Haga clic en **\'Confirmar\'** para ver y probar la configuración.`;
			}
			else if (lang === "ru") {
				return `Нажмите **\'Старт\'**, чтобы добавить канал.
Нажмите **\'Стоп\'**, чтобы исключить канал из автоматической публикации.
Нажмите **\'Подтвердить\'**, для просмотра и подтверждения настроек.`;
			}
			else if (lang === "de") {
				return `Klicken Sie auf **\'Anfangen\'** so fügen Sie einen Kanal hinzu.
Klicken Sie auf **\'Aufhören\'** so entfernen Sie einen Kanal.
Klicken Sie auf **\'Bestätigen\'** um die aktuellen Einstellungen anzuzeigen und zu testen.`;
			}
			else if (lang === "pt") {
				return `Clique em **\'Começar\'** para adicionar um canal.
Clique em **\'Parar\'** para remover um canal.
Clique em **\'Confirmar\'** para exibir e testar as configurações atuais.`;
			}
			else {
				return `Click **\'Start\'** to add an auto post channel.
Click **\'Stop\'** to remove an auto post channel.
Click **\'Confirm\'** to view and test current settings.`;
			}			
		}

		function footerText() {
			if (lang === "en") {
				return `Only Administrators can start or stop auto posts.`;
			}
			else if (lang === "es") {
				return `Solo los administradores pueden iniciar o detener publicaciones automáticas.`;
			}
			else if (lang === "ru") {
				return `Только администраторы могут запускать или останавливать автоматические публикации.`;
			}
			else if (lang === "de") {
				return `Nur Administratoren können automatische Beiträge starten oder stoppen.`;
			}
			else if (lang === "pt") {
				return `Somente Administradores podem iniciar ou interromper postagens automáticas.`;
			}
			else {
				return `Only Administrators can start or stop auto posts.`;
			}			
		}

		function start() {
			if (lang === "en") {
				return `Start`;
			}
			else if (lang === "es") {
				return `Empezar`;
			}
			else if (lang === "ru") {
				return `Старт`;
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
				return `Detener`;
			}
			else if (lang === "ru") {
				return `Стоп`;
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

		function confirm() {
			if (lang === "en") {
				return `Confirm`;
			}
			else if (lang === "es") {
				return `Confirmar`;
			}
			else if (lang === "ru") {
				return `Подтвердить`;
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

//--END TRANSLATIONS--//						

		const initialEmbed = new EmbedBuilder()
			.setColor(0x00FFCC) //Seafoam green
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
					.setCustomId(`confirm - ${interaction.user.id}`)
					.setLabel(`${confirm()}`)
					.setStyle(ButtonStyle.Secondary),					
			);									

			//Initial Embed + Buttons (start, stop, confirm, configure)
			interaction.reply({ embeds: [initialEmbed], components:[initialButtons] });

			function expiredDesc() {
				if (lang === "en") {
					return `This interaction expired`;
				}
				if (lang === "es") {
					return `Esta interacción expiró.`;
				}
				if (lang === "ru") {
					return `Срок действия этого взаимодействия истек.`;
				}
				if (lang === "de") {
					return `Diese Interaktion ist abgelaufen`;
				}
				if (lang === "pt") {
					return `Esta interação expirou.`;
				}
				else {
					return `This interaction expired`;
				}						
			}

			const expiredButton = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`expired`)
						.setLabel(`${expiredDesc()}`)
						.setStyle(ButtonStyle.Secondary)
						.setEmoji(':RSWeekly:1025248227248848940')
						.setDisabled(true),			
				);		

				setTimeout(() => {
					interaction.editReply({components: [expiredButton]});
				}, (60000 * 5))
						

}}