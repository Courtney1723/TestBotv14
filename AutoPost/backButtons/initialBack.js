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
				return `Configuraci??n de publicaci??n autom??tica`;
			}
			else if (lang === "ru") {
				return `???????????????????????????? ?????????????????? ????????????????????`;
			}
			else if (lang === "de") {
				return `Einstellungen f??r die automatische Ver??ffentlichung`;
			}
			else if (lang === "pt") {
				return `Configura????es de publica????o autom??tica`;
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
Click **\'Confirm\'** to view and test current settings.`;
			}
			else if (lang === "es") {
				return `Haga clic en **\'Empezar\'** para agregar un canal.
Haga clic en **\'Detener\'** para quitar un canal.
Haga clic en **\'Configurar\'** para agregar o quitar un rol.
Haga clic en **\'Confirmar\'** para ver y probar la configuraci??n.`;
			}
			else if (lang === "ru") {
				return `?????????????? **\'????????????\'** ?????? ????????, ?????????? ???????????????? ??????????.
?????????????? **\'??????????????????\'** ?????? ???????????????? ????????????.
?????????????? **\'??????????????????\'** ?????????? ???????????????? ?????? ?????????????? ????????.
?????????????? **\'????????????????????????\'** ?????????? ?????????????????????? ?? ???????????????????? ??????????????????.`;
			}
			else if (lang === "de") {
				return `Klicken Sie auf **\'Anfangen\'** so f??gen Sie einen Kanal hinzu.
Klicken Sie auf **\'Aufh??ren\'** so entfernen Sie einen Kanal.
Klicken Sie auf **\'Konfigurieren\'** so f??gen Sie eine Rolle hinzu oder entfernen sie.
Klicken Sie auf **\'Best??tigen\'** um die aktuellen Einstellungen anzuzeigen und zu testen.`;
			}
			else if (lang === "pt") {
				return `Clique em **\'Come??ar\'** para adicionar um canal.
Clique em **\'Parar\'** para remover um canal.
Clique em **\'Configurar\'** para adicionar ou remover uma fun????o.
Clique em **\'Confirmar\'** para exibir e testar as configura????es atuais.`;
			}
			else {
				return `Click **\'Start\'** to add an auto post channel.
Click **\'Stop\'** to remove an auto post channel.
Click **\'Configure\'** to add or remove a role that can configure auto post settings.
Click **\'Confirm\'** to view and test current settings.`;
			}			
		}

		function footerText() {
			if (lang === "en") {
				return `Only Administrators can start, stop, or configure auto posts by default.`;
			}
			else if (lang === "es") {
				return `Solo los administradores pueden iniciar, detener o configurar publicaciones autom??ticas de forma predeterminada.`;
			}
			else if (lang === "ru") {
				return `???? ?????????????????? ???????????? ???????????????????????????? ?????????? ??????????????????, ?????????????????????????? ?????? ?????????????????????? ???????????????????????????? ????????????????????.`;
			}
			else if (lang === "de") {
				return `Nur Administratoren k??nnen automatische Beitr??ge standardm????ig starten, stoppen oder konfigurieren.`;
			}
			else if (lang === "pt") {
				return `Apenas os administradores podem iniciar, parar ou configurar publica????es autom??ticas por predefini????o.`;
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
				return `Empezar`;
			}
			else if (lang === "ru") {
				return `????????????`;
			}
			else if (lang === "de") {
				return `Anfangen`;
			}
			else if (lang === "pt") {
				return `Come??ar`;
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
				return `??????????????????`;
			}
			else if (lang === "de") {
				return `Aufh??ren`;
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
				return `Configurar`;
			}
			else if (lang === "ru") {
				return `??????????????????`;
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
				return `Confirmar`;
			}
			else if (lang === "ru") {
				return `????????????????????????`;
			}
			else if (lang === "de") {
				return `Best??tigen`;
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

				function notYourButtonString() {
					if (lang === "en") {
						return `These buttons are not for you.`;
					}
					else if (lang === "es") {
						return `Estos botones no son para ti.`;
					}
					else if (lang === "ru") {
						return `?????? ???????????? ???? ?????? ??????.`;
					}
					else if (lang === "de") {
						return `Diese Schaltfl??chen sind nicht f??r Sie.`;
					}
					else if (lang === "pt") {
						return `Esses bot??es n??o s??o para voc??.`;
					}
					else {
						return `These buttons are not for you.`;
					}				
			}							

//--END TRANSLATIONS--//
					
					await interaction.deferUpdate();
					if (buttonUserID === interaction.user.id) {
							//Initial Embed + Buttons (start, stop, confirm, configure)
							await interaction.editReply({ embeds: [initialEmbed], components:[initialButtons] });
					}
					else {
						await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
					}

				}
			});

			
				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 2))	
			
		} //end if interaction starts with startback - stopback - configureback

	},
}