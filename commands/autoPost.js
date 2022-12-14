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
				return `Configura????es de lan??amento autom??tico`;
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

						//Initial Embed + Buttons (start, stop, confirm, configure)
						interaction.reply({ embeds: [initialEmbed], components:[initialButtons] });

				}
			}); //end fs.readFile LANGDataBase.txt


		setTimeout(() => {
			interaction.editReply({components: [expiredButton]})
		}, (60000 * 5))
		

}}
