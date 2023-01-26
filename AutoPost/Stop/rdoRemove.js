const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, optionstyle, StringSelectMenuBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isStringSelectMenu()) {return};
		if (interaction.customId.startsWith(`rdoStopMenu -`)) {
			//console.log(`begin rdoStopMenu: '${interaction.customId}'`);		

		let menuUserID02 = (interaction.customId).split("rdoStopMenu - u:");
		let menuUserID01 = menuUserID02[1].split(" - ");
		let menuUserID = menuUserID01[0];
			//console.log(`rdoStopMenu menuUserID: ${menuUserID}`);
			//console.log(`rdoStopMenu interaction.user.id === menuUserID?: ${interaction.user.id === menuUserID}`)	

		let menuChannelID01 = (interaction.values).toString().split(`c:`);
		let menuChannelID = menuChannelID01[1];
				//console.log(`rdoStopMenu menuChannelID: ${menuChannelID}`)

		let guildRoleIds = [];
		fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
		    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
		
					interaction.guild.roles.cache.forEach(role => {
							if ((data.includes(role.id)) && (role.name != "@everyone")) {
								guildRoleIds.push(role.id);
							}
					});
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

			if (menuChannelID.includes(`undefinedchannel`)) { //interaction.values === `undefinedchannel` does not work?

				const rdoDuplicateEmbed = new EmbedBuilder()
						.setColor(`Orange`) 
						.setTitle(`Please Try Again`)
						.setDescription(`You selected an invalid response "No Channel Selected".\nPlease Try again. || (◕ᴥ◕ʋ) ||`)	
				
				await interaction.deferUpdate();
				if (interaction.user.id === menuUserID) {
						await interaction.followUp({ embeds: [rdoDuplicateEmbed], components: [], ephemeral: true })
						.catch(err => console.log(`rdoDuplicateEmbed Error: ${err}`));
				} else {
						interaction.followUp({ content: `These options aren't for you!`, ephemeral: true });
				}
				
			} 
			else { //remove a channel from RDODataBase.txt			
				
				await interaction.deferUpdate();
				if (interaction.user.id === menuUserID) { //begin removing an rdo channel

						fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
							if (err) {console.log(`Error: ${err}`)} //If an error, console.log

								// console.log(`interaction.guild.id: ${interaction.guild.id}`)
								// console.log(`menuChannelID: ${menuChannelID}`)
								// console.log(`data.replace: ${data.replace(`\nguild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:rdoStartMenu - `, "")}`);
								fs.writeFile('./RDODataBase.txt', `${data.replace(`\nguild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:rdoStartMenu - `, "")}`, async function (err) {
										if (err) {
											throw err;
										}
										else {
//-----BEGIN TRANSLATIONS-----//											
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

		function rdoRemoveDesc() {
			if (lang === "en") {
				return `You will now no longer get RDO auto posts in the <#${menuChannelID}> channel.`;
			}
			else if (lang === "es") {
				return `Ahora ya no obtendrá publicaciones automáticas de Rd Dead Online en el canal <#${menuChannelID}>.`;
			}
			else if (lang === "ru") {
				return `Теперь вы больше не будете получать автоматические сообщения Red Dead Online в канале <#${menuChannelID}>.`;
			}
			else if (lang === "de") {
				return `Sie erhalten jetzt keine automatischen Red Dead Online-Beiträge mehr im <#${menuChannelID}>-Kanal.`; //FIXME - double check translation
			}
			else if (lang === "pt") {
				return `Agora você não receberá mais postagens automáticas do RDO no canal <#${menuChannelID}>.`;
			}
			else {
				return `You will now no longer get RDO auto posts in the <#${menuChannelID}> channel.`;
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

		const rdoConfirmEmbed = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`${success()}`)
			.setDescription(`${rdoRemoveDesc()}`)

				const confirmSettingsButton = new ActionRowBuilder()
				.addComponents(
						new ButtonBuilder()
								.setCustomId(`initialback - ${interaction.user.id}`)
								.setLabel(`${confirmSettingsString()}`)
								.setStyle(ButtonStyle.Secondary),	
				);														

					await interaction.editReply({ embeds: [rdoConfirmEmbed], components: [confirmSettingsButton] })
					.catch(err => {console.log(`rdoConfirmEmbed Error: ${err}`); process.kill(1);});											

					if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
						console.log('You unsubscribed from RDR2 auto posts.');	
					}
					else {
						console.log('A user unsubscribed from RDR2 auto posts.');	
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
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 2))												
											
					}}); //end fs.readFile for LANGDataBase
				}}); //end fs.writeFile for RDODataBase.txt
			}); //end fs:readFile RDODataBase.txt
						
					} else {
						interaction.followUp({ content: `${notYourOption()}`, ephemeral: true });			
					}

				} //end remove channel

		});//end fs:readFile			
			
		}// end if interaction.customId === 'rdoStopMenu'
		

	},
};




	