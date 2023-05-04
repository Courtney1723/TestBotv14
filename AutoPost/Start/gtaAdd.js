const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, optionstyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isStringSelectMenu()) {return};
		if ((interaction.customId.startsWith(`gtaStartMenu -`)) || (interaction.customId.startsWith(`gtaStartMenu2 -`)) ) {
			//console.log(`begin gtaStartMenu: '${interaction.customId}'`);		

			let startMenu2 = "";
			if (interaction.customId.startsWith(`gtaStartMenu2`)) {
				startMenu2 += "2";
			}	

		let menuUserID02 = (interaction.customId).split(`gtaStartMenu${startMenu2} - u:`);
		let menuUserID01 = menuUserID02[1].split(" -");
		let menuUserID = menuUserID01[0];
			//console.log(`gtaStartMenu menuUserID: ${menuUserID}`);
			//console.log(`gtaStartMenu interaction.user.id === menuUserID?: ${interaction.user.id === menuUserID}`)	

		let menuChannelID01 = (interaction.values).toString().split(`c:`);
		let menuChannelID = menuChannelID01[1];
				//console.log(`gtaStartMenu menuChannelID: ${menuChannelID}`)		

//-----BEGIN TRANSLATIONS-----//			

		var lang = await LANG.LANG(interaction);
		//console.log(`LANG:${await LANG.LANG(interaction)}`);		

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

	function gtaAddDesc() {
		if (lang === "en") {
			return `You will now get GTA Online auto posts to the <#${menuChannelID}> channel \n**every Thursday at 2:00 PM EST**.`;
		}
		if (lang === "es") {
			return `Ahora recibirás publicaciones automáticas de GTA Online en el canal <#${menuChannelID}> \n** todos los jueves a las 14:00 hora del este**.`;
		}	
		if (lang === "ru") {
			return `Теперь вы будете получать автоматические сообщения GTA Online на <#${menuChannelID}> канале \n**каждый четверг в 14:00 по восточному времени**.`;
		}		
		if (lang === "de") {
			return `Sie erhalten jetzt GTA Online Auto-Posts auf dem <#${menuChannelID}>-Kanal \n**jeden Donnerstag um 14:00 Uhr Ostküsten-Standardzeit (Nordamerika)**.`;
		}		
		if (lang === "pt") {
			return `Agora você receberá postagens automáticas de GTA Online no canal <#${menuChannelID}> \n**todas as quintas-feiras às 14:00 Hora do Leste**.`;
		}		
		else {
			return `You will now get GTA Online auto posts to the <#${menuChannelID}> channel \n**every Thursday at 2:00 PM EST**.`;
		}		
	}			

	function confirmSettingsString() {arguments
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

//-----END TRASLATIONS-----//					

					if (interaction.user.id != menuUserID) {
						interaction.reply({ content: `${notYourOption()}`, ephemeral: true });
					}
					else if (menuChannelID.includes(`undefinedchannel`)) { 

						const gtaDuplicateEmbed = new EmbedBuilder()
								.setColor(0xFFAE00) //orange 
								.setTitle(`${duplicateTitle()}`)
								.setDescription(`${invalidResponse()} || (◕ᴥ◕ʋ) ||`)	
						
						await interaction.deferUpdate();
						if (interaction.user.id === menuUserID) {
								await interaction.followUp({ embeds: [gtaDuplicateEmbed], components: [], ephemeral: true })
								.catch(err => console.log(`gtaDuplicateEmbed Error: ${err}`));
						} else {
								interaction.followUp({ content: `${notYourOption()}`, ephemeral: true });
						}
						
					} 
					else { //add new channel to GTADataBase.txt

						const gtaConfirmEmbed = new EmbedBuilder()
								.setColor(0x00FF00) //Green 
								.setTitle(`${success()}`)
								.setDescription(`${gtaAddDesc()}`)	

						const confirmSettingsButton = new ActionRowBuilder()
						.addComponents(
								new ButtonBuilder()
										.setCustomId(`initialback - ${interaction.user.id}`)
										.setLabel(`${confirmSettingsString()}`)
										.setStyle(ButtonStyle.Secondary),	
						);							
						
						await interaction.deferUpdate();
						if (interaction.user.id === menuUserID) {	

						//Appends the GTADataBase.txt file with guildID, Channel ID, and choice of gta of gta
					fs.appendFile(`./GTADataBase.txt`,`guild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:gtaStartMenu - \n`, async err => {
							 if (err) {
								 console.error(err.stack);
								 return
									 }		
						else {
							await interaction.editReply({ embeds: [gtaConfirmEmbed], components: [confirmSettingsButton] })
							.catch(err => console.log(`gtaConfirmEmbed Error: ${err.stack}`));

							if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
								console.log(`You added a channel for GTA Online auto posts.`);
							}
							else {
								if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
									console.log(`You added ${menuChannelID} for GTA Online auto posts.`)
								} else {
										console.log(`A user added ${menuChannelID} for GTA Online auto posts in ${interaction.guild.id}.`);
								}
							}
						}

						}); // end fs:appendFile to add a channel for gta autop posts	
							
						} else {
							await interaction.followUp({ content: `${notYourOption()}`, ephemeral: true });
						}
						
					} //end add new channel

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
		
			
		}// end if interaction.customId === 'gtaStartMenu'
		

	},
};




	