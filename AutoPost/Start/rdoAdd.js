const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, optionstyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isStringSelectMenu()) {return};
		if ((interaction.customId.startsWith(`rdoStartMenu -`)) || (interaction.customId.startsWith(`rdoStartMenu2 -`)) ) {
			//console.log(`begin rdoStartMenu: '${interaction.customId}'`);		

			let startMenu2 = "";
			if (interaction.customId.startsWith(`rdoStartMenu2`)) {
				startMenu2 += "2";
			}	

		let menuUserID02 = (interaction.customId).split(`rdoStartMenu${startMenu2} - u:`);
		let menuUserID01 = menuUserID02[1].split(" -");
		let menuUserID = menuUserID01[0];
			//console.log(`rdoStartMenu menuUserID: ${menuUserID}`);
			//console.log(`rdoStartMenu interaction.user.id === menuUserID?: ${interaction.user.id === menuUserID}`)	

		let menuChannelID01 = (interaction.values).toString().split(`c:`);
		let menuChannelID = menuChannelID01[1];
				//console.log(`rdoStartMenu menuChannelID: ${menuChannelID}`)		

//-----BEGIN TRANSLATIONS-----//			

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

	function rdoAddDesc() {
		if (lang === "en") {
			return `You will now get Red Dead Online auto posts to the <#${menuChannelID}> channel \n**the first Tuesday of every month at 2:00 PM EST**.`;
		}
		if (lang === "es") {
			return `Ahora recibirás publicaciones automáticas de Red Dead Online en el canal <#${menuChannelID}> \n**el primer martes de cada mes a las 14:00 hora del este**.`;
		}		
		if (lang === "ru") {
			return `Теперь вы будете получать автоматические сообщения Red Dead Online на <#${menuChannelID}> канале \n**в первый вторник каждого месяца в 14:00 по восточному времени**.`;
		}		
		if (lang === "de") {
			return `Sie erhalten jetzt Red Dead Online Auto-Posts auf dem <#${menuChannelID}>-Kanal \n**am ersten Dienstag eines jeden Monats um 14:00 Uhr Ostküsten-Standardzeit (Nordamerika)**.`;
		}		
		if (lang === "pt") {
			return `Agora você receberá postagens automáticas de Red Dead Online no canal <#${menuChannelID}> \n**na primeira terça-feira de cada mês às 14:00 Hora do Leste**.`;
		}		
		else {
			return `You will now get Red Dead Online auto posts to the <#${menuChannelID}> channel \n**the first Tuesday of every month at 2:00 PM EST**.`;
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

//-----END TRANSLATIONS-----//

					if (interaction.user.id != menuUserID) {
						interaction.reply({ content: `${notYourOption()}`, ephemeral: true });
					}
					else if (menuChannelID.includes(`undefinedchannel`)) { //interaction.values === `undefinedchannel` does not work?

						const rdoDuplicateEmbed = new EmbedBuilder()
								.setColor(0xFFAE00) //Orange 
								.setTitle(`${duplicateTitle()}`)
								.setDescription(`${invalidResponse()} || ʕっ•ᴥ•ʔっ ||`)	
						
						await interaction.deferUpdate();
						if (interaction.user.id === menuUserID) {
								await interaction.followUp({ embeds: [rdoDuplicateEmbed], components: [], ephemeral: true })
								.catch(err => console.log(`rdoDuplicateEmbed Error: ${err}`));
						} else {
								interaction.followUp({ content: `${notYourOption()}`, ephemeral: true });
						}
						
					} 
					else { //add new channel to RDODataBase.txt

						const rdoConfirmEmbed = new EmbedBuilder()
								.setColor(0x00FF00) //Green
								.setTitle(`${success()}`)
								.setDescription(`${rdoAddDesc()}`)	

						const confirmSettingsButton = new ActionRowBuilder()
						.addComponents(
								new ButtonBuilder()
										.setCustomId(`initialback - ${interaction.user.id}`)
										.setLabel(`${confirmSettingsString()}`)
										.setStyle(ButtonStyle.Secondary),	
						);							
						
						await interaction.deferUpdate();
						if (interaction.user.id === menuUserID) {

								await interaction.editReply({ embeds: [rdoConfirmEmbed], components: [confirmSettingsButton] })
								.catch(err => console.log(`rdoConfirmEmbed Error: ${err}`));							

						//Appends the RDODataBase.txt file with guildID, Channel ID, and choice of rdo of rdo
						fs.appendFile(`./RDODataBase.txt`,`guild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:rdoStartMenu - \n`, err => {
							 if (err) {
								 console.error(err);
								 return
									 }		
							if ((interaction.user.ID === process.env.USER_ID_1) || (interaction.user.ID === process.env.USER_ID_2)) {
								console.log(`You added a channel for RDO auto posts.`);
							}
							else {
								if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
									console.log(`You added ${menuChannelID} channel for RDO auto posts.`);
								}
								else {
									console.log(`A user added ${menuChannelID} for RDO auto posts in ${interaction.guild.id}.`);
								}
							}
						}); // end fs:appendFile to add a channel for rdo autop posts	
							
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

				}}); //end fs.readFileLANGDataBase
		
			
		}// end if interaction.customId === 'rdoStartMenu'
		

	},
};




	