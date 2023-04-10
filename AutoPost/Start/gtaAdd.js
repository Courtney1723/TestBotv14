const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, optionstyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

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

		let guildRoleIds = [];
		fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
		    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
		
					interaction.guild.roles.cache.forEach(role => {
							if (data.includes(role.id)) {
								guildRoleIds.push(role.id);
							}
					});
			guildRoleIds.shift(1); //removes the @everyone role
				//console.log(`guildRoleIds: ${guildRoleIds}`);

			function AdminRequired() {
				let AdminRequiredBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
				if (AdminRequiredBoolean[1].includes(`yes`)) {
					return "AdminRequiredYes";
				}
				else {
					return "AdminRequiredNo";
				}
			}		

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
			return `Ahora recibirás publicaciones automáticas de GTA Online en el canal <#${menuChannelID}> \n** todos los jueves a las 14:00 EST**.`;
		}	
		if (lang === "ru") {
			return `Теперь вы будете получать автоматические сообщения GTA Online на <#${menuChannelID}> канале \n**каждый четверг в 14:00 EST**.`;
		}		
		if (lang === "de") {
			return `Sie erhalten jetzt GTA Online Auto-Posts auf dem <#${menuChannelID}>-Kanal \n**jeden Donnerstag um 14:00 EST**.`;
		}		
		if (lang === "pt") {
			return `Agora você receberá postagens automáticas de GTA Online no canal <#${menuChannelID}> \n**todas as quintas-feiras às 14:00 EST**.`;
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

//-----END TRASLATIONS-----//					

					if (interaction.user.id != menuUserID) {
						interaction.reply({ content: `${notYourOption()}`, ephemeral: true });
					}
					else if (menuChannelID.includes(`undefinedchannel`)) { 

						const gtaDuplicateEmbed = new EmbedBuilder()
								.setColor(0xFFAE00) //orange 
								.setTitle(`Please Try Again`)
								.setDescription(`You selected an invalid response "No Channel Selected".\nPlease Try again. || (◕ᴥ◕ʋ) ||`)	
						
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
										console.log(`A user added ${menuChannelID} for GTA Online auto posts.`);
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
					interaction.editReply({components: [expiredButton]}).catch(err => {console.log(`GtaAddEmbed expiredButton Error: ${err.stack}`)});
				}, (60000 * 5))					

				}}); //end fs.readFileLANGDataBase
		});//end fs:readFileRolesDataBase	
			
		}// end if interaction.customId === 'gtaStartMenu'
		

	},
};




	