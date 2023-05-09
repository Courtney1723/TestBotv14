const { Client, GatewayIntentBits, Partials,  SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, PermissionsBitField } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG01 = require('../events/LANG.js');
const { exec } = require('node:child_process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('autopost')
		.setNameLocalizations({
			"es-ES": 'publicaciones-automáticas',
			ru: 'автопубликации',
			de: 'automatische-veröffentlichung',
			"pt-BR": 'postagens-automáticas',
		})		
		.setDescription('Configure and Confirm Auto Post Settings')
		.setDescriptionLocalizations({
			"es-ES": 'Configuración de publicación automática',
			ru: 'Настройка и подтверждение изменений автопубликации',
			de: 'Einstellungen für die automatische Veröffentlichung',
			"pt-BR": 'Configurações de Publicação Automática',
		})
		.setDMPermission(false),
	async execute(interaction) {
		await interaction.deferReply().catch(console.error);

//--BEGIN TRANSLATIONS--//		

		//stored language
		var lang = await LANG01.LANG(interaction);
		//console.log(`LANG:${await LANG.LANG(interaction)}`);		

		//user language
		var LANG02 = interaction.locale.toString().split("-");
		var LANG = LANG02[0];
		//console.log(`lang:${lang}`);	

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
				return `Click **Start** to add an auto post channel.
Click **Stop** to remove an auto post channel.
Click **Confirm** to view and test current settings.`;
			}
			else if (lang === "es") {
				return `Haga clic en **Empezar** para agregar un canal.
Haga clic en **Detener** para quitar un canal.
Haga clic en **Confirmar** para ver y probar la configuración.`;
			}
			else if (lang === "ru") {
				return `Нажмите **Старт**, чтобы добавить канал.
Нажмите **Стоп**, чтобы исключить канал из автоматической публикации.
Нажмите **Подтвердить**, для просмотра и подтверждения настроек.`;
			}
			else if (lang === "de") {
				return `Klicken Sie auf **Anfangen** so fügen Sie einen Kanal hinzu.
Klicken Sie auf **Aufhören** so entfernen Sie einen Kanal.
Klicken Sie auf **Bestätigen** um die aktuellen Einstellungen anzuzeigen und zu testen.`;
			}
			else if (lang === "pt") {
				return `Clique em **Começar** para adicionar um canal.
Clique em **Parar** para remover um canal.
Clique em **Confirmar** para exibir e testar as configurações atuais.`;
			}
			else {
				return `Click **Start** to add an auto post channel.
Click **Stop** to remove an auto post channel.
Click **Confirm** to view and test current settings.`;
			}			
		}

		function changeLang() { 
			if ( (lang !== LANG) && (supportedLanguages.indexOf(LANG) !== -1) && (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) ) {
			if (LANG === "en") {
			    return `Click **${language()}** to change the language to ${longLang()}`;
			}
			if (LANG === "es") {
			    return `Haga clic en **${language()}** para cambiar el idioma a ${longLang()}.`;
			}
			if (LANG === "pt") {
			    return `Clique em **${language()}** para alterar o idioma para ${longLang()}.`;
			}
			if (LANG === "ru") {
			    return `Нажмите **${language()}**, чтобы изменить язык на ${longLang()}.`;
			}
			if (LANG === "de") {
			    return `Klicken Sie auf **${language()}**, um die Sprache auf ${longLang()} zu ändern.`;
			}
			if (LANG === "pl") {
			    return `Kliknij **${language()}**, aby zmienić język na ${longLang()}.`;
			}
			if (LANG === "fr") {
			    return `Cliquez sur **${language()}** pour changer la langue en ${longLang()}.`;
			}
			if (LANG === "it") {
			    return `Fare clic su **${language()}** per cambiare la lingua in ${longLang()}.`;
			}
			if (LANG === "zh") {
			    return `單擊 **${language()}** 將語言更改為 ${longLang()}。`;
			}
			if (LANG === "ja") {
			    return `**${language()}** をクリックして、言語を ${language()} に変更します。`;
			}
			if (LANG === "ko") {
			    return `**${language()}**을(를) 클릭하여 언어를 ${language()}로 변경합니다.`;
			}
			else {
			    return `Click ${language()} to change the language to ${language()}`;
			}	
			}
			else {
				return "";
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

		function language() {
			if (LANG === "en") {
				return `Language`;
			}
			if (LANG === ["es", "pt"]) {
				return `Idioma`
			}
			if (LANG === "ru") {
				return `Язык`;
			}
			if (LANG === "de") {
				return `Sprache`;	
			}
			if (LANG === "pl") {
				return `Język`;
			}
			if (LANG === "fr") {
				return `Langue`;
			}
			if (LANG === "it") {
				return `Lingua`;
			}
			if (LANG === "zh") {
				retuen `語言`;
			}
			if (LANG === "ja") {
				return `言語`;
			}
			if (LANG === "ko") {
				return `언어`;
			}
			else {
				return `Language`;
			}
		}

				var longLangArray = ["English", "español", "português", "русский", "Deutsch", "polski", "français", "italiano", "中國人", "日本", "한국인"];

		function longLang() {
			if (LANG === "en") {
			    return longLangArray[0];
			}
			if (LANG === "es") {
			    return longLangArray[1];
			}
			if (LANG === "pt") {
			    return longLangArray[2];
			}
			if (LANG === "ru") {
			    return longLangArray[3];
			}
			if (LANG === "de") {
			    return longLangArray[4];
			}
			if (LANG === "pl") {
			    return longLangArray[5];
			}
			if (LANG === "fr") {
			    return longLangArray[6];
			}
			if (LANG === "it") {
			    return longLangArray[7];
			}
			if (LANG === "zh") {
			    return longLangArray[8];
			}
			if (LANG === "ja") {
			    return longLangArray[9];
			}
			if (LANG === "ko") {
			    return longLangArray[10];
			}
			else {
			    return longLangArray[0];
			}			
		}

		function confirm() { //fixme - add translations
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

	function langDuplicateTitle() {
		if (LANG === "en") {
			return `Change the server langage to English?`;
		}
		if (LANG === "es") {
			return `¿Cambiar el idioma del servidor a español?`;
		}
		if (LANG === "pt") {
			return `Alterar o idioma do servidor para português?`;
		}				
		if (LANG === "ru") {
			return `Сменить язык сервера на русский?`;
		}		
		if (LANG === "de") {
			return `Die Serversprache auf Deutsch ändern?`;
		}
		if (LANG === "pl") {
			return `Zmienić język serwera na polski?`;
		}
		if (LANG === "fr") {
			return `Changer la langue du serveur en français ?`;
		}
		if (LANG === "it") {
			return `Cambiare la lingua del server in italiano?`;
		}
		if (LANG === "zh") {
			return `把服務器語言改成中文？`;
		}
		if (LANG === "ja") {
			return `サーバーの言語を日本語に変更しますか?`;
		}
		if (LANG === "ko") {
			return `서버 언어를 한국어로 변경하시겠습니까?`;
		}
		else {
			return `Change the server langage to English?`;
		}
	}
	
	function yes() {
		if (LANG === "en") {
			return `Yes`;
		}
		if (LANG === "es") {
			return `Sí`;
		}	
		if (LANG === "pt") {
			return `Sim`;
		}
		if (LANG === "ru") {
			return `Да`;
		}
		if (LANG === "de") {
			return `Ja`;
		}
		if (LANG === "pl") {
			return `Tak`;
		}
		if (LANG === "fr") {
			return `Oui`;
		}
		if (LANG === "it") {
			return `Sì`;
		}
		if (LANG === "zh") {
			return `是的`;
		}
		if (LANG === "ja") {
			return `はい`;
		}
		if (LANG === "ko") {
			return `예`;
		}
		else {
			return `Yes`;
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
			interaction.editReply({ embeds: [initialEmbed], components:[initialButtons] });
		
	//BEGIN ADDING A LANGAUGE
				//console.log(`lang:${lang} - LANG:${LANG} - supported?:${(supportedLanguages.indexOf(LANG) !== -1)}`);
				if ( (lang !== LANG) && (supportedLanguages.indexOf(LANG) !== -1) && (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) ) { //if the stored language is not the same language as the user language && user language is supported && user is an admin

						if ((lang === "") && (LANG === "en")) {return}

					const changeLangEmbed = new EmbedBuilder()
						.setColor(0x00FFCC) //Seafoam green
						.setTitle(`${autoPostTitle()}`)
						.setDescription(`${autoPostDesc()}\n${changeLang()}`)
						.setFooter({text: `${footerText()}`, iconURL: process.env.logo_link })					

						const changeLangButtons = new ActionRowBuilder()
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
								new ButtonBuilder()
									.setCustomId(`yes - ${LANG}`)
									.setLabel(`${language()}`)
									.setStyle(ButtonStyle.Primary),		
							);	

						interaction.editReply({ embeds: [changeLangEmbed], components:[changeLangButtons] }).catch(err => console.log(`langDupEmbed error: ${err}`));
					
				}; 
	//END ADDING A LANGAUGE
						
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