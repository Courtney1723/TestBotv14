const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');


module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isButton()) {return};
		if ( (interaction.customId.startsWith(`startback -`)) || (interaction.customId.startsWith(`stopback -`)) || (interaction.customId.startsWith(`confirmback -`)) ) {

		let start_stop_confirm = "";
			if (interaction.customId.startsWith(`startback -`)) {
				start_stop_confirm += 'start';
			} 
			else if (interaction.customId.startsWith(`stopback -`)) {
				start_stop_confirm += 'stop';
			}	
			else if (interaction.customId.startsWith(`confirmback -`)) {
				start_stop_confirm += 'confirm';
			}			

		let buttonUserID01 = (interaction.customId).split(`${start_stop_confirm}back - `);
		let buttonUserID = buttonUserID01[1];
			//console.log(`startBack buttonUserID: ${buttonUserID}`);
			//console.log(`startBack interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`);
			//console.log(`startBack interaction.user.id: ${interaction.user.id} && buttonUserID: ${buttonUserID}`);			

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
				return `Detener`;
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

		function confirm() {
			if (lang === "en") {
				return `Confirm`;
			}
			else if (lang === "es") {
				return `Confirmar`;
			}
			else if (lang === "ru") {
				return `подтвержда́ю`;
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

		function notYourButtonString() {
			if (lang === "en") {
				return `These buttons are not for you.`;
			}
			else if (lang === "es") {
				return `Estos botones no son para ti.`;
			}
			else if (lang === "ru") {
				return `Эти кнопки не для вас.`;
			}
			else if (lang === "de") {
				return `Diese Schaltflächen sind nicht für Sie.`;
			}
			else if (lang === "pt") {
				return `Esses botões não são para você.`;
			}
			else {
				return `These buttons are not for you.`;
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
					
					await interaction.deferUpdate().catch(err => {console.log(`initialBackEmbed deferUpdate Error: ${err.stack}`);interaction.followUp({content:`${expiredDesc()}`, ephemeral:true})});
					if (buttonUserID === interaction.user.id) {
							//Initial Embed + Buttons (start, stop, confirm)
							await interaction.editReply({ embeds: [initialEmbed], components:[initialButtons] });
					}
					else {
						await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
					}

				

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
							
		} //end if interaction starts with startback - stopback - confirmback

	},
}