const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, optionstyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isStringSelectMenu()) {return};
		if (interaction.customId.startsWith(`gtaStopMenu -`)) {
			//console.log(`begin gtaStopMenu: '${interaction.customId}'`);		

		let menuUserID02 = (interaction.customId).split("gtaStopMenu - u:");
		let menuUserID01 = menuUserID02[1].split(" - ");
		let menuUserID = menuUserID01[0];
			//console.log(`gtaStopMenu menuUserID: ${menuUserID}`);
			//console.log(`gtaStopMenu interaction.user.id === menuUserID?: ${interaction.user.id === menuUserID}`)	

		let menuChannelID01 = (interaction.values).toString().split(`c:`);
		let menuChannelID = menuChannelID01[1];
				//console.log(`gtaStopMenu menuChannelID: ${menuChannelID}`)

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

			function duplicateTitle() {
				if (lang === "en") {
					return `Please Try Again`;
				}
				else if (lang === "es") {
					return `Por favor, inténtalo de nuevo`;
				}
				else if (lang === "ru") {
					return `Пожалуйста, попробуйте еще раз`;
				}
				else if (lang === "de") {
					return `Inténtalo de nuevo`;
				}
				else if (lang === "pt") {
					return `Por favor, tente novamente`;
				}
				else {
					return `Please Try Again`;
				}			
			}
		
			function invalidResponse() {
				if (lang === "en") {
					return `You selected an invalid response.`;
				}
				else if (lang === "es") {
					return `Seleccionó una respuesta no válida.`;
				}
				else if (lang === "ru") {
					return `Вы выбрали неправильный ответ.`;
				}
				else if (lang === "de") {
					return `Sie haben eine ungültige Antwort ausgewählt.`;
				}
				else if (lang === "pt") {
					return `Você selecionou uma resposta inválida.`;
				}
				else {
					return `You selected an invalid response.`;
				}			
			}						

			if (menuChannelID.includes(`undefinedchannel`)) { //user selected an invalid response

				const gtaDuplicateEmbed = new EmbedBuilder()
						.setColor(0xFFAE00) //Orange 
						.setTitle(`${duplicateTitle()}`)
						.setDescription(`${invalidResponse()} || (= ФェФ=) ||`)	
				
				await interaction.deferUpdate();
				if (interaction.user.id === menuUserID) {
						await interaction.followUp({ embeds: [gtaDuplicateEmbed], components: [], ephemeral: true })
						.catch(err => console.log(`gtaDuplicateEmbed Error: ${err}`));
				} else {
						interaction.followUp({ content: `These options aren't for you!`, ephemeral: true });
				}
				
			} 
			else { //remove a channel from GTADataBase.txt

//-----BEGIN TRANSLATIONS----//				

				fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
					if (err) {console.log(`Error: ${err}`)} //If an error, console.log

						// console.log(`interaction.guild.id: ${interaction.guild.id}`)
						// console.log(`menuChannelID: ${menuChannelID}`)
						// console.log(`data.replace: ${data.replace(`\nguild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:gtaStartMenu - `, "")}`);
						fs.writeFile('./GTADataBase.txt', `${data.replace(`\nguild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:gtaStartMenu - `, "")}`, async function (err) {
								if (err) {
									throw err;
								}
								else {

				function success() {
					if (lang === "en") {
						return `Success`;
					}
					else if (lang === "es") {
						return `Éxito`;
					}
					else if (lang === "ru") {
						return `Успех`;
					}
					else if (lang === "de") {
						return `Erfolg`;
					}
					else if (lang === "pt") {
						return `Éxito`;
					}
					else {
						return `Success`;
					}		
				}	
				
				function gtaRemoveDesc() {
					if (lang === "en") {
						return `You will now no longer get GTA auto posts in the <#${menuChannelID}> channel.`;
					}
					else if (lang === "es") {
						return `Ahora ya no obtendrá publicaciones automáticas de GTA en el canal <#${menuChannelID}>.`;
					}
					else if (lang === "ru") {
						return `Теперь вы больше не будете получать автоматические сообщения GTA в канале <#${menuChannelID}>.`;
					}
					else if (lang === "de") {
						return `Sie erhalten jetzt keine automatischen GTA-Beiträge mehr im <#${menuChannelID}>-Kanal.`;
					}
					else if (lang === "pt") {
						return `Agora você não receberá mais postagens automáticas do GTA no canal <#${menuChannelID}>.`;
					}
					else {
						return `You will now no longer get GTA auto posts in the <#${menuChannelID}> channel.`;
					}		
				}
			
				function notYourOption() {
					if (lang === "en") {
						return `These options aren't for you.`;
					}
					else if (lang === "es") {
						return `Estas opciones no son para ti.`;
					}
					else if (lang === "ru") {
						return `Эти варианты не для вас.`;
					}
					else if (lang === "de") {
						return `Diese Optionen sind nichts für Sie.`;
					}
					else if (lang === "pt") {
						return `Essas opções não são para você.`;
					}
					else {
						return `These options aren't for you.`;
					}		
				}		
			
				function confirmSettingsString() {
					if (lang === "en") {
							return `Confirm Settings`;
					}
					else if (lang === "es") {
						return `Confirmar la configuración`;
					}
					else if (lang === "ru") {
						return `Подтвердить настройки`;
					}
					else if (lang === "de") {
						return `Einstellungen bestätigen`;
					}
					else if (lang === "pt") {
						return `Confirmar configurações`;
					}
					else {
						return `Confirm Settings`;
					}					
				}												
											
//-----END TRANSLATIONS-----//											

				const gtaConfirmEmbed = new EmbedBuilder()
						.setColor(`Green`) 
						.setTitle(`${success()}`)
						.setDescription(`${gtaRemoveDesc()}`)		

				const confirmSettingsButton = new ActionRowBuilder()
				.addComponents(
						new ButtonBuilder()
								.setCustomId(`initialback - ${interaction.user.id}`)
								.setLabel(`${confirmSettingsString()}`)
								.setStyle(ButtonStyle.Secondary),	
				);											
				
				await interaction.deferUpdate();
				if (interaction.user.id === menuUserID) { //begin removing an gta channel
						await interaction.editReply({ embeds: [gtaConfirmEmbed], components: [confirmSettingsButton] })
						.catch(err => {console.log(`gtaConfirmEmbed Error: ${err}`); process.kill(1);});	

						if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_1)) {
							console.log(`You removed ${menuChannelID} from receiving GTA autop posts.`);
						}
					else {
						console.log(`A user removed ${menuChannelID} from receiving GTA autop posts.`);
					}
				}
				else {
					interaction.followUp({ content: `${notYourOption()}`, ephemeral: true });		
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

		}}); //end fs:writeFile to remove channel from autoposts
	}); //end fs:readFile GTADataBase.txt	

	} //end if button is gtaRemove - not undefinedchannel

	}}); //end fs.readFile for LANGDataBase.txt
			
		}// end if interaction.customId === 'gtaStopMenu'
		
	
	},
};
