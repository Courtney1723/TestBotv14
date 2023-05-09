const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG01 = require('../../events/LANG.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

			if (!interaction.isButton()) {return};
			if (interaction.customId.startsWith(`yes - `)) {
				await interaction.deferUpdate();				

		//stored language
		var lang = await LANG01.LANG(interaction);
		//console.log(`LANG:${await LANG.LANG(interaction)}`);		

		//user language
		var LANG02 = interaction.locale.toString().split("-");
		var LANG = LANG02[0];
		//console.log(`lang:${lang}`);	

		let menuChannelID01 = interaction.customId.split(`c:`);
		let menuChannelID = menuChannelID01[1];
				//console.log(`rdoStartMenu menuChannelID: ${menuChannelID}`)


	//BEGIN TRANSLATIONS

		function success() {
			if (LANG === "en") {
				return `Success`;
			}
			else if (LANG === "es") {
				return `Éxito`;
			}
			else if (LANG === "pt") {
				return `Éxito`;
			}				
			else if (LANG === "ru") {
				return `Успех`;
			}
			else if (LANG === "de") {
				return `Erfolg`;
			}
			else if (LANG === "pl") {
				return `Powodzenie`;
			}		
			else if (LANG === "fr") {
				return `Succès`;
			}		
			else if (LANG === "it") {
				return `Successo`;
			}		
			else if (LANG === "zh") {
				return `成功`;
			}			
			else if (LANG === "ja") {
				return `成功`;
			}	
			else if (LANG === "ko") {
				return `성공`;
			}				
			else {
				return `Success`;
			}		
		}

		function languageChangeDesc() {
			if (LANG === "en") {
				return `The language for this server has been changed to English.`;
			}
			if (LANG === "es") {
				return `El idioma de este servidor se ha cambiado al español.`;
			}
			if (LANG === "pt") {
				return `O idioma deste servidor foi alterado para português.`;
			}		
			if (LANG === "ru") {
				return `Язык для этого сервера изменен на русский.`;
			}
			if (LANG === "de") {
				return `Die Sprache für diesen Server wurde auf Deutsch umgestellt.`;
			}
			if (LANG === "pl") {
				return `Język tego serwera został zmieniony na polski.`;	
			}
			if (LANG === "fr") {
				return `La langue de ce serveur a été changée en français.`;
			}
			if (LANG === "it") {
				return `La lingua per questo server è stata modificata in francese.`;
			}
			if (LANG === "zh") {
				return `此服務器的語言已更改為中文（繁體）。`;
			}
			if (LANG === "ja") {
				return `このサーバーの言語は日本語に変更されました。`;
			}
			if (LANG === "ko") {
				return `이 서버의 언어가 한국어로 변경되었습니다.`;
			}
			else {
				return `The language for this server has been changed to English.`;
			}
		}

		function missingInfo() {
			if (LANG === "en") {
				return "_ _";
			}
			if (LANG === "es") {
				return `El idioma predeterminado es el inglés. Es posible que falte alguna información o que esté mal traducida.`;
			}
			if (LANG === "pt") {
			    return `O idioma padrão para este bot é o inglês. Algumas informações podem estar faltando ou mal traduzidas.`;
			}
			if (LANG === "ru") {
			    return `Язык по умолчанию для этого бота — английский. Некоторая информация может отсутствовать или быть неправильно переведена.`;
			}
			if (LANG === "de") {
			    return `Die Standardsprache für diesen Bot ist Englisch. Einige Informationen können fehlen oder falsch übersetzt werden.`;
			}
			if (LANG === "pl") {
			    return `Domyślnym językiem tego bota jest angielski. Niektórych informacji może brakować lub mogą być błędnie przetłumaczone.`;
			}
			if (LANG === "fr") {
			    return `La langue par défaut pour ce bot est l'anglais. Certaines informations peuvent être manquantes ou mal traduites.`;
			}
			if (LANG === "it") {
			    return `La lingua predefinita per questo bot è l'inglese. Alcune informazioni potrebbero essere mancanti o tradotte male.`;
			}
			if (LANG === "zh") {
			    return `此機器人的默認語言是英語。某些信息可能丟失或翻譯錯誤。`;
			}
			if (LANG === "ja") {
			    return `このボットのデフォルト言語は英語です。一部の情報が欠落しているか、誤訳されている可能性があります。`;
			}
			if (LANG === "ko") {
			    return `이 봇의 기본 언어는 영어입니다. 일부 정보가 누락되었거나 잘못 번역되었을 수 있습니다.`;
			}
			else {
				return "_ _";
			}
		}
			
		const languageEmbed = new EmbedBuilder()
			.setColor(0x0FFF00) //Green
			.setTitle(`${success()}`)
			.setDescription(`${languageChangeDesc()}`)
			.setFooter({ text: `${missingInfo()}`, iconURL: process.env.logo_link });

		const languageEmbedEn = new EmbedBuilder()
			.setColor(0x0FFF00) //Green
			.setTitle(`Success!`)
			.setDescription(`${languageChangeDesc()}`)

			if (lang === "") {
				fs.appendFile(`./LANGDataBase.txt`,`guild:${interaction.guild.id} - lang:${LANG} - \n`, err => {
					 if (err) {
						 console.error(err);
						 throw err;
						}	
					 else {
						client.channels.fetch(menuChannelID).then(channel => channel.send({ embeds: [languageEmbed] }))
						.catch(err => console.log(`languageEmbed Error: ${err.stack}`));							 
						 if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
							 console.log(`You added ${LANG} as the server language in ${interaction.guild.id}.`);
						 }
						 else {
							 console.log(`A user added ${LANG} as the server language in ${interaction.guild.id}.`);
						 }
					 }	
				}); // end fs:appendFile to add server language to spanish				
			}
			else if (LANG !== "en") {
				fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
					if (err) {console.log(`Error: ${err}`)} 
					else {
					fs.writeFile('./LANGDataBase.txt', `${data.replace(`guild:${interaction.guild.id} - lang:${lang} - `, `guild:${interaction.guild.id} - lang:${LANG} - `)}`, function (err) {
						if (err) throw err;
						client.channels.fetch(menuChannelID).then(channel => channel.send({ embeds: [languageEmbed] }))
						.catch(err => console.log(`languageEmbed Error: ${err.stack}`));							
						 if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
							 console.log(`You changed the server language to ${LANG}.`);
						 }
						 else {
							 console.log(`A user changed the server language to ${LANG}.`);
						 } 						
					}); //end fs:writeFile to change server language to spanish	
				}}); //end fs.readFile for LANGDataBase.txt				
			}
			else if (LANG === "en") { //remove language if English
				fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
					if (err) {console.log(`Error: ${err}`)} 
					else {
					fs.writeFile('./LANGDataBase.txt', `${data.replace(`guild:${interaction.guild.id} - lang:${lang} - \n`, "")}`, function (err) {
						if (err) throw err;
							client.channels.fetch(menuChannelID).then(channel => channel.send({ embeds: [languageEmbedEn] }))
							.catch(err => console.log(`languageEmbed Error: ${err.stack}`));							
						 if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
							 console.log(`You changed the server language to ${LANG} in ${interaction.guild.id}.`);
						 }
						 else {
							console.log(`A user changed the server language to ${LANG} in ${interaction.guild.id}.`);							 
						 } 						
					}); //end fs:writeFile to change server language to spanish	
				}}); //end fs.readFile for LANGDataBase.txt						
			}
		
		} // end if yes button
		
		
	},
};




	