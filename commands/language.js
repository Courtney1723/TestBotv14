const { Client, GatewayIntentBits, Partials,  SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, PermissionsBitField } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const { exec } = require('node:child_process');
const LANG = require('../events/LANG.js');

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
		.setNameLocalizations({
			"es-ES": 'idioma',
			ru: 'язык',
			de: 'sprache',
			"pt-BR": 'idioma',
			pl: 'język',
			fr: 'langue',
			it: 'lingua',
			"zh-CN": '語言',
			"zh-TW": '語言',
			ja: '言語',
			ko: '언어',	
		})
		.setDescription('Language | Idioma | Язык | Sprache | Język | Langue | Lingua | 語言 | 言語 | 언어')
		.setDMPermission(false),
	async execute(interaction) {

		var lang = await LANG.LANG(interaction);
		//console.log(`LANG:${await LANG.LANG(interaction)}`);	

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
				else if (lang === "pl") {
					return `Ustawienia języka`;
				}
				else if (lang === "fr") {
					return `Paramètres de langue`;
				}	
				else if (lang === "it") {
					return `Impostazioni della lingua`;
				}	
				else if (lang === "zh") {
					return `語言設定`;
				}		
				else if (lang === "ja") {
					return `言語設定`;
				}			
				else if (lang === "ko") {
					return `언어 설정`;
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
				else if (lang === "pl") {
					return `Twój obecny język to polski.`;
				}		
				else if (lang === "fr") {
					return `Votre langue actuelle est le français.`;
				}	
				else if (lang === "it") {
					return `La tua lingua attuale è l'italiano.`;
				}	
				else if (lang === "zh") {
					return `您當前的語言是中文`;
				}	
				else if (lang === "ja") {
					return `あなたの現在の言語は日本語です。`;
				}	
				else if (lang === "ko") {
					return `현재 언어는 한국어입니다.`;
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
				.setColor(0xF98800) //Orange
				.setTitle(`${langSettingsTitle()}`)
				.setDescription(`${currentLanguage()}\n${languagesDesc()}`)
				.setFooter({text: `${footerText()}`, iconURL: process.env.logo_link })		

			const languageButtons = new ActionRowBuilder()
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

					interaction.reply({ embeds: [languageEmbed], components:[languageButtons] });		

		setTimeout(() => {
			interaction.editReply({components: [expiredButton]}).catch(err => {console.log(`language command expiredButton Error: ${err.stack}`)});
		}, (60000 * 5))

	},
}