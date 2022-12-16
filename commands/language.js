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

			if (lang === "en") { //English
				const initialEmbed = new EmbedBuilder()
					.setColor(`0x00FFCC`) //Seafoam green
					.setTitle(`Language Settings`)
					.setDescription(`Your current language is English.
		Clic **\'español\'** para cambiar el idioma a español.
		Щелчок **\'Pусский\'** изменить язык на русский.
		Klicken **\'Deutsch\'** um die Sprache auf Deutsch zu ändern.`)
					.setFooter({text: `Only Administrators can change languages.`, iconURL: process.env.logo_link })		


			const initialButtons = new ActionRowBuilder()
				.addComponents(				
					new ButtonBuilder()
						.setCustomId(`spanish - ${interaction.user.id}`)
						.setLabel('español')
						.setStyle(ButtonStyle.Danger),			
					new ButtonBuilder()
						.setCustomId(`russian - ${interaction.user.id}`)
						.setLabel('Pусский')
						.setStyle(ButtonStyle.Primary),						
					new ButtonBuilder()
						.setCustomId(`german - ${interaction.user.id}`)
						.setLabel('Deutsch')
						.setStyle(ButtonStyle.Secondary),		
					);	

					interaction.reply({ embeds: [initialEmbed], components:[initialButtons] });
			}
			else if (lang === "es") { //Spanish
				const initialEmbed = new EmbedBuilder()
					.setColor(`0x00FFCC`) //Seafoam green
					.setTitle(`Configuración de idioma`)
					.setDescription(`Tu idioma actual es el español.
		Click **\'English\'** to change the language to English.
		Щелчок **\'Pусский\'** изменить язык на русский.
		Klicken **\'Deutsch\'** um die Sprache auf Deutsch zu ändern.`)
					.setFooter({text: `Solo los administradores pueden cambiar de idioma.`, iconURL: process.env.logo_link })

			const initialButtons = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`english - ${interaction.user.id}`)
						.setLabel('English')
						.setStyle(ButtonStyle.Success),								
					new ButtonBuilder()
						.setCustomId(`russian - ${interaction.user.id}`)
						.setLabel('Pусский')
						.setStyle(ButtonStyle.Primary),						
					new ButtonBuilder()
						.setCustomId(`german - ${interaction.user.id}`)
						.setLabel('Deutsch')
						.setStyle(ButtonStyle.Secondary),		
					);			

					interaction.reply({ embeds: [initialEmbed], components:[initialButtons] });
				
			}
			else if (lang === "ru") { //Russian
				const initialEmbed = new EmbedBuilder()
							.setColor(`0x00FFCC`) //Seafoam green
							.setTitle(`Языковые настройки`)
							.setDescription(`Ваш текущий язык - русский.
			 	Click **\'English\'** to change the language to English.
				Clic **\'español\'** para cambiar el idioma a español.
				Klicken **\'Deutsch\'** um die Sprache auf Deutsch zu ändern.`)
							.setFooter({text: `Только администраторы могут изменять языки.`, iconURL: process.env.logo_link })

			const initialButtons = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`english - ${interaction.user.id}`)
						.setLabel('English')
						.setStyle(ButtonStyle.Success),					
					new ButtonBuilder()
						.setCustomId(`spanish - ${interaction.user.id}`)
						.setLabel('español')
						.setStyle(ButtonStyle.Danger),									
					new ButtonBuilder()
						.setCustomId(`german - ${interaction.user.id}`)
						.setLabel('Deutsch')
						.setStyle(ButtonStyle.Secondary),		
					);

					interaction.reply({ embeds: [initialEmbed], components:[initialButtons] });
					
			}
			else if (lang === "de") { //German
				const initialEmbed = new EmbedBuilder()
							.setColor(`0x00FFCC`) //Seafoam green
							.setTitle(`Spracheinstellungen`)
							.setDescription(`Ihre aktuelle Sprache ist Deutsch.
			 	Click **\'English\'** to change the language to English.
				Clic **\'español\'** para cambiar el idioma a español.
				Щелчок **\'Pусский\'** изменить язык на русский.`)
							.setFooter({text: `Nur Administratoren können die Sprache ändern.`, iconURL: process.env.logo_link })	

		const initialButtons = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`english - ${interaction.user.id}`)
					.setLabel('English')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId(`spanish - ${interaction.user.id}`)
					.setLabel('español')
					.setStyle(ButtonStyle.Danger),			
				new ButtonBuilder()
					.setCustomId(`russian - ${interaction.user.id}`)
					.setLabel('Pусский')
					.setStyle(ButtonStyle.Primary),										
			);		

					interaction.reply({ embeds: [initialEmbed], components:[initialButtons] });
				
			}
			else { //English
				const initialEmbed = new EmbedBuilder()
					.setColor(`0x00FFCC`) //Seafoam green
					.setTitle(`Language Settings`)
					.setDescription(`Your current language is English
		Click **\'español\'** para cambiar el idioma a español.
		Click **\'Pусский\'** изменить язык на русский.
		Click **\'Deutsch\'** um die Sprache auf Deutsch zu ändern.`)
					.setFooter({text: `Only Administrators can change languages.`, iconURL: process.env.logo_link })

			const initialButtons = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`spanish - ${interaction.user.id}`)
						.setLabel('español')
						.setStyle(ButtonStyle.Danger),			
					new ButtonBuilder()
						.setCustomId(`russian - ${interaction.user.id}`)
						.setLabel('Pусский')
						.setStyle(ButtonStyle.Primary),						
					new ButtonBuilder()
						.setCustomId(`german - ${interaction.user.id}`)
						.setLabel('Deutsch')
						.setStyle(ButtonStyle.Secondary),					
			);

				interaction.reply({ embeds: [initialEmbed], components:[initialButtons] });
				
			}


		setTimeout(() => {
			interaction.editReply({components: [expiredButton]})
		}, (60000 * 2))

				}
				}); //end fs.readfile
}}
