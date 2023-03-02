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
		.setName('language')
		.setDescription('Change Language')
		.setDMPermission(false),
	async execute(interaction) {

	fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
		if (err) {console.log(`Error: ${err}`)} 
		else {
			let lang03 = data.split("lang:");
			//console.log(`lang03.length: ${lang03.length}`);

			let langArray = [];
			for (i=2; i <= lang03.length - 1; i++) { //first will always be undefined
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

			function langSettingsTitle() {
				if (lang === "en") {
					return `Language Settings`;
				}
				else if (lang === "es") {
				  return `Configuración de idioma`; 
				}
				else if (lang === "ru") {
					return `Языковые настройки`;
				}
				else if (lang === "de") {
					return `Spracheinstellungen`;
				}
				else if (lang === "pt") {
					return `Configurações de idioma`;
				}
				else {
					return `Language Settings`;
				}				
			}

			function currentLanguage() {
				if (lang === "en") {
					return `Your current language is English.`;
				}
				else if (lang === "es") {
					return `Tu idioma actual es el español.`;
				}
				else if (lang === "ru") {
					return `Ваш текущий язык - русский.`;
				}
				else if (lang === "de") {
					return `Ihre aktuelle Sprache ist Deutsch.`;
				}
				else if (lang === "pt") {
					return `Seu idioma atual é o português.`;
				}
				else {
					return `Your current language is English.`;
				}				
			}

			function languagesDesc() {
				if (lang === "en") {
					return `Haga clic en **\'español\'** para cambiar el idioma a español.
		Нажмите **\'Pусский\'**, чтобы изменить язык на русский.
		Klicken **\'Deutsch\'** um die Sprache auf Deutsch zu ändern.
		Clique **\'português\'** para alterar o idioma para português.`;
				}
				else if (lang === "es") {
					return `Click **\'English\'** to change the language to English.
		Нажмите **\'Pусский\'**, чтобы изменить язык на русский.
		Klicken **\'Deutsch\'** um die Sprache auf Deutsch zu ändern.
		Clique **\'português\'** para alterar o idioma para português.`;
				}
				else if (lang === "ru") {
					return `Click **\'English\'** to change the language to English.
				Haga clic en **\'español\'** para cambiar el idioma a español.
				Klicken **\'Deutsch\'** um die Sprache auf Deutsch zu ändern.
				Clique **\'português\'** para alterar o idioma para português.`;
				}
				else if (lang === "de") {
					return `Click **\'English\'** to change the language to English.
				Haga clic en **\'español\'** para cambiar el idioma a español.
				Нажмите **\'Pусский\'**, чтобы изменить язык на русский.
				Clique **\'português\'** para alterar o idioma para português.`;
				}
				else if (lang === "pt") {
					return `Click **\'English\'** to change the language to English.
				Haga clic en **\'español\'** para cambiar el idioma a español.
				Нажмите **\'Pусский\'**, чтобы изменить язык на русский.
				Klicken **\'Deutsch\'** um die Sprache auf Deutsch zu ändern.`;
				}
				else {
					return `Haga clic en **\'español\'** para cambiar el idioma a español.
		Нажмите **\'Pусский\'**, чтобы изменить язык на русский.
		Klicken **\'Deutsch\'** um die Sprache auf Deutsch zu ändern.
		Clique **\'português\'** para alterar o idioma para português.`;
				}				
			}

			function footerText() {
				if (lang === "en") {
					return `Only Administrators can change languages.`;
				}
				else if (lang === "es") {
					return `Solo los administradores pueden cambiar de idioma.`;
				}
				else if (lang === "ru") {
					return `Только администраторы могут изменять языки.`;
				}
				else if (lang === "de") {
					return `Nur Administratoren können die Sprache ändern.`;
				}
				else if (lang === "pt") {
					return `Somente os administradores podem alterar o idioma.`;
				}
				else {
					return `Only Administrators can change languages.`;
				}				
			}

			function languageNames01() {
				if (lang === "en") {
					return `español`;
				}
				else if (lang === "es") {
					return `English`;
				}
				else if (lang === "ru") {
					return `English`;
				}
				else if (lang === "de") {
					return `English`;
				}	
				else if (lang === "pt") {
					return `English`;
				}
				else {
					return `español`;
				}				
			}

			function languageNames01ID() {
				if (lang === "en") {
					return `spanish`;
				}
				else if (lang === "es") {
					return `english`;
				}
				else if (lang === "ru") {
					return `english`;
				}
				else if (lang === "de") {
					return `english`;
				}
				else if (lang === "pt") {
					return `english`;
				}
				else {
					return `spanish`;
				}				
			}

			function languageNames02() {
				if (lang === "en") {
					return `Pусский`;
				}
				else if (lang === "es") {
					return `Pусский`;
				}
				else if (lang === "ru") {
					return `español`;
				}
				else if (lang === "de") {
					return `español`;
				}	
				else if (lang === "pt") {
					return `español`;
				}
				else {
					return `Pусский`;
				}				
			}	

			function languageNames02ID() {
				if (lang === "en") {
					return `russian`;
				}
				else if (lang === "es") {
					return `russian`;
				}
				else if (lang === "ru") {
					return `spanish`;
				}
				else if (lang === "de") {
					return `spanish`;
				}
				else if (lang === "pt") {
					return `spanish`;
				}
				else {
					return `russian`;
				}				
			}			

			function languageNames03() {
				if (lang === "en") {
					return `Deutsch`;
				}
				else if (lang === "es") {
					return `Deutsch`;
				}
				else if (lang === "ru") {
					return `Deutsch`;
				}
				else if (lang === "de") {
					return `Pусский`;
				}	
				else if (lang === "pt") {
					return `Pусский`;
				}
				else {
					return `Deutsch`;
				}				
			}		

			function languageNames03ID() {
				if (lang === "en") {
					return `german`;
				}
				else if (lang === "es") {
					return `german`;
				}
				else if (lang === "ru") {
					return `german`;
				}
				else if (lang === "de") {
					return `russian`;
				}
				else if (lang === "pt") {
					return `russian`;
				}
				else {
					return `german`;
				}				
			}					

			function languageNames04() {
				if (lang === "en") {
					return `português`;
				}
				else if (lang === "es") {
					return `português`;
				}
				else if (lang === "ru") {
					return `português`;
				}
				else if (lang === "de") {
					return `português`;
				}	
				else if (lang === "pt") {
					return `Deutsch`;
				}
				else {
					return `português`;
				}				
			}	

			function languageNames04ID() {
				if (lang === "en") {
					return `portuguese`;
				}
				else if (lang === "es") {
					return `portuguese`;
				}
				else if (lang === "ru") {
					return `portuguese`;
				}
				else if (lang === "de") {
					return `portuguese`;
				}
				else if (lang === "pt") {
					return `german`;
				}
				else {
					return `portuguese`;
				}				
			}					
			
			const initialEmbed = new EmbedBuilder()
				.setColor(`F98800`) //Orange
				.setTitle(`${langSettingsTitle()}`)
				.setDescription(`${currentLanguage()}\n${languagesDesc()}`)
				.setFooter({text: `${footerText()}`, iconURL: process.env.logo_link })		

			const initialButtons = new ActionRowBuilder()
				.addComponents(				
					new ButtonBuilder()
						.setCustomId(`${languageNames01ID()} - ${interaction.user.id}`)
						.setLabel(`${languageNames01()}`)
						.setStyle(ButtonStyle.Danger),			
					new ButtonBuilder()
						.setCustomId(`${languageNames02ID()} - ${interaction.user.id}`)
						.setLabel(`${languageNames02()}`)
						.setStyle(ButtonStyle.Primary),						
					new ButtonBuilder()
						.setCustomId(`${languageNames03ID()} - ${interaction.user.id}`)
						.setLabel(`${languageNames03()}`)
						.setStyle(ButtonStyle.Secondary),		
					new ButtonBuilder()
						.setCustomId(`${languageNames04ID()} - ${interaction.user.id}`)
						.setLabel(`${languageNames04()}`)
						.setStyle(ButtonStyle.Success),						
					);	

					interaction.reply({ embeds: [initialEmbed], components:[initialButtons] });		

		setTimeout(() => {
			interaction.editReply({components: [expiredButton]})
		}, (60000 * 5))

				}
				}); //end fs.readfile
}}
