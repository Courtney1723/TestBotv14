const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

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
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isButton()) {return};
		if (interaction.customId.startsWith(`stop - `)) {
			//console.log(`begin stop: '${interaction.customId}'`);		

		let buttonUserID01 = (interaction.customId).split("stop - ");
		let buttonUserID = buttonUserID01[1];
			//console.log(`buttonUserID: ${buttonUserID}`);
			//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)

		let guildRoleIds = [];
		fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
		    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
		
					interaction.guild.roles.cache.forEach(role => {
							if (data.includes(role.id)) {
								guildRoleIds.push(role.id);
							}
					});
			guildRoleIds.splice(guildRoleIds.length - 1); //.splice(guildRoleIds.length - 1) removes the @everyone role
				//console.log(`guildRoleIds: ${guildRoleIds}`);

			function AdminRequired() {
				let AdminRequiredBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
				if (AdminRequiredBoolean[1] === undefined) {
					 	fs.appendFile(`./rolesDataBase.txt`,`guild:${interaction.guild.id} - admin:yes - role:undefined - \n`, err => {
 							if (err) {
 								console.error(err)
 								return
 							}					
 						}); //end fs.appendFile	
				}
				else if (AdminRequiredBoolean[1].startsWith(`yes`)) {
					return "AdminRequiredYes";
				}
				else {
					return "AdminRequiredNo";
				}
			}		
				//console.log(`AdminRequired(): ${AdminRequired()}`);

		const stopEmbed = new EmbedBuilder()
			.setColor(`Red`) 
			.setTitle(`Stop Auto Posting`)
			.setDescription(`Click **\'GTA\'** to remove a channel from receiving Grand Theft Auto V Online Auto Posts.
\nClick **\'RDO\'** to remove a channel from receiving Red Dead Redemption II Online Auto Posts.`)		

		const stopButtons = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtastop - ${interaction.user.id}`)
			        .setLabel('GTA')
			        .setStyle(ButtonStyle.Success),
			    new ButtonBuilder()
			        .setCustomId(`rdostop - ${interaction.user.id}`)
			        .setLabel('RDO')
			        .setStyle(ButtonStyle.Danger),			
					new ButtonBuilder()
			        .setCustomId(`stopback - ${interaction.user.id}`)
			        .setLabel('Go Back')
			        .setStyle(ButtonStyle.Secondary),			
			);	

		const stopEmbedEs = new EmbedBuilder()
			.setColor(`Red`) 
			.setTitle(`Detener publicaciones automáticas`)
			.setDescription(`Clic **\'GTA\'** para quitar un canal de GTA.
\nClic **\'RDO\'** para quitar un canal RDO.`)		

		const stopButtonsEs = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtastop - ${interaction.user.id}`)
			        .setLabel('GTA')
			        .setStyle(ButtonStyle.Success),
			    new ButtonBuilder()
			        .setCustomId(`rdostop - ${interaction.user.id}`)
			        .setLabel('RDO')
			        .setStyle(ButtonStyle.Danger),			
					new ButtonBuilder()
			        .setCustomId(`stopback - ${interaction.user.id}`)
			        .setLabel('Volver')
			        .setStyle(ButtonStyle.Secondary),			
			);	

		const stopEmbedRu = new EmbedBuilder()
			.setColor(`Red`) 
			.setTitle(`Остановка автоматических сообщений`)
			.setDescription(`Щелчок **\'GTA\'** удалить канал GTA.
\nЩелчок **\'RDO\'** Удаление канала RDO.`)		

		const stopButtonsRu = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtastop - ${interaction.user.id}`)
			        .setLabel('GTA')
			        .setStyle(ButtonStyle.Success),
			    new ButtonBuilder()
			        .setCustomId(`rdostop - ${interaction.user.id}`)
			        .setLabel('RDO')
			        .setStyle(ButtonStyle.Danger),			
					new ButtonBuilder()
			        .setCustomId(`stopback - ${interaction.user.id}`)
			        .setLabel('Вернуться')
			        .setStyle(ButtonStyle.Secondary),			
			);	

		const stopEmbedDe = new EmbedBuilder()
			.setColor(`Red`) 
			.setTitle(`Automatische Beiträge stoppen`)
			.setDescription(`Klicken **\'GTA\'** So entfernen Sie einen GTA-Kanal.
\nKlicken **\'RDO\'** So entfernen Sie einen Kanal-RDO.`)		

		const stopButtonsDe = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtastop - ${interaction.user.id}`)
			        .setLabel('GTA')
			        .setStyle(ButtonStyle.Success),
			    new ButtonBuilder()
			        .setCustomId(`rdostop - ${interaction.user.id}`)
			        .setLabel('RDO')
			        .setStyle(ButtonStyle.Danger),			
					new ButtonBuilder()
			        .setCustomId(`stopback - ${interaction.user.id}`)
			        .setLabel('Zurück')
			        .setStyle(ButtonStyle.Secondary),			
			);			

		const stopEmbedPt = new EmbedBuilder()
			.setColor(`Red`) 
			.setTitle(`Parar postagens automáticas`)
			.setDescription(`Clique **\'GTA\'** para remover um canal GTA.
\nClique **\'RDO\'** para remover um canal RDO.`)		

		const stopButtonsPt = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtastop - ${interaction.user.id}`)
			        .setLabel('GTA')
			        .setStyle(ButtonStyle.Success),
			    new ButtonBuilder()
			        .setCustomId(`rdostop - ${interaction.user.id}`)
			        .setLabel('RDO')
			        .setStyle(ButtonStyle.Danger),			
					new ButtonBuilder()
			        .setCustomId(`stopback - ${interaction.user.id}`)
			        .setLabel('Voltar')
			        .setStyle(ButtonStyle.Secondary),			
			);	

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

//begin checking for permissions
					await interaction.deferUpdate();
		//console.log(`AdminRequired(): ${AdminRequired()}`)
		if (interaction.user.id != buttonUserID) {
			if (lang === "en") {
				await interaction.followUp({ content: `These buttons are not for you.`, ephemeral: true });
			}
			else if (lang === "es") {
				await interaction.followUp({ content: `Estos botones no son para ti.`, ephemeral: true });
			}
			else if (lang === "ru") {
				await interaction.followUp({ content: `Эти кнопки не для вас.`, ephemeral: true });
			}
			else if (lang === "de") {
				await interaction.followUp({ content: `Diese Schaltflächen sind nicht für Sie.`, ephemeral: true });
			}
			else if (lang === "pt") {
				await interaction.followUp({ content: `Esses botões não são para você.`, ephemeral: true });
			}
			else {
				await interaction.followUp({ content: `These buttons are not for you.`, ephemeral: true });
			}
		}		
		else if (AdminRequired() === undefined) {
			if (lang === "en") {
				await interaction.followUp({ content: `It looks like this is your first time using this command. Please try the start button again.`, ephemeral: true });
			}
			else if (lang === "es") {
				await interaction.followUp({ content: `Esta es la primera vez que usas este comando. Vuelva a intentar el botón Detener.`, ephemeral: true });
			}
			else if (lang === "ru") {
				await interaction.followUp({ content: `Эта команда используется впервые. Попробуйте нажать кнопку Стоп еще раз.`, ephemeral: true });
			}
			else if (lang === "de") {
				await interaction.followUp({ content: `Dies ist das erste Mal, dass Sie diesen Befehl verwenden. Wiederholen Sie die Schaltfläche Stopp.`, ephemeral: true });
			}
			else if (lang === "pt") {
				await interaction.followUp({ content: `Esta é a primeira vez que você usa este comando. Tente o botão Parar novamente.`, ephemeral: true });
			}
			else {
				await interaction.followUp({ content: `It looks like this is your first time using this command. Please try the start button again.`, ephemeral: true });
			}
		}
		else if (AdminRequired() === "AdminRequiredYes") { //if admin permissions are required			
			if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) {
				if (lang === "en") {
					await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => console.log(`stopEmbed Error: ${err}`));	
				}
				else if (lang === "es") {
					await interaction.editReply({ embeds: [stopEmbedEs], components: [stopButtonsEs] }).catch(err => console.log(`stopEmbed Error: ${err}`));
				}
				else if (lang === "ru") {
					await interaction.editReply({ embeds: [stopEmbedRu], components: [stopButtonsRu] }).catch(err => console.log(`stopEmbed Error: ${err}`));
				}
				else if (lang === "de") {
					await interaction.editReply({ embeds: [stopEmbedDe], components: [stopButtonsDe] }).catch(err => console.log(`stopEmbed Error: ${err}`));	
				}
				else if (lang === "pt") {
					await interaction.editReply({ embeds: [stopEmbedPt], components: [stopButtonsPt] }).catch(err => console.log(`stopEmbed Error: ${err}`));
				}
				else {
					await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => console.log(`stopEmbed Error: ${err}`));
				}				
			} 
				
			else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) { //if the user is not an admin
				if (lang === "en") {
					await interaction.followUp({content: `You do not have the required permissions to do that.`, ephemeral: true});
				}
				else if (lang === "es") {
				  await interaction.followUp({content: `No tienes permiso para hacer eso.`, ephemeral: true});
				}
				else if (lang === "ru") {
				  await interaction.followUp({content: `У вас нет разрешения на это.`, ephemeral: true});
				}
				else if (lang === "de") {
				  await interaction.followUp({content: `Sie haben keine Erlaubnis dazu.`, ephemeral: true});
				}
				else if (lang === "pt") {
				  await interaction.followUp({content: `Você não tem permissão para fazer isso.`, ephemeral: true});
				}
				else {
				  await interaction.followUp({content: `You do not have the required permissions to do that.`, ephemeral: true});
				}
			}
				
			else if (!interaction.user.id === buttonUserID)  { //if the user did not trigger /autopost
				if (lang === "en") {
					await interaction.followUp({ content: `These buttons are not for you.`, ephemeral: true });	
				}
				else if (lang === "es") {
				  await interaction.followUp({ content: `Estos botones no son para ti.`, ephemeral: true });
				}
				else if (lang === "ru") {
				  await interaction.followUp({ content: `Эти кнопки не для вас.`, ephemeral: true });
				}
				else if (lang === "de") {
				  await interaction.followUp({ content: `Diese Schaltflächen sind nicht für Sie.`, ephemeral: true });
				}
				else if (lang === "pt") {
				  await interaction.followUp({ content: `Esses botões não são para você.`, ephemeral: true });
				}
				else {
				  await interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
				}
			}
		}
			
		else if (AdminRequired() === "AdminRequiredNo") { //if admin permissions are NOT required
			if ((interaction.user.id === buttonUserID) ) { 

				//console.log(`guildRoleIds.length: ${guildRoleIds.length}`)
				let hasARole = 0;
				for (a=0;a<=guildRoleIds.length - 1;a++) { //iterates through each role
					//console.log(`guildRoleIds at ${i}: ${guildRoleIds[i]}`);
					if (interaction.member.roles.cache.has(guildRoleIds[a])) {
						hasARole += 1;
					}
				} //end loop to check for hasARole
				//console.log(`hasARole: ${hasARole} && required roles:${guildRoleIds.length}`)
				
				if (guildRoleIds.length === 0) { //no role required
					if (lang === "en") {
						await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => console.log(`stopEmbed Error: ${err}`));	
					}
					else if (lang === "es") {
						await interaction.editReply({ embeds: [stopEmbedEs], components: [stopButtonsEs] }).catch(err => console.log(`stopEmbed Error: ${err}`));
					}
					else if (lang === "ru") {
						await interaction.editReply({ embeds: [stopEmbedRu], components: [stopButtonsRu] }).catch(err => console.log(`stopEmbed Error: ${err}`));
					}
					else if (lang === "de") {
						await interaction.editReply({ embeds: [stopEmbedDe], components: [stopButtonsDe] }).catch(err => console.log(`stopEmbed Error: ${err}`));	
					}
					else if (lang === "pt") {
						await interaction.editReply({ embeds: [stopEmbedPt], components: [stopButtonsPt] }).catch(err => console.log(`stopEmbed Error: ${err}`));
					}
					else {
						await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => console.log(`stopEmbed Error: ${err}`));
					}	
				}
					
				else if (hasARole >= 1) { //if the user has at least one role listed
					if (lang === "en") {
						await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => console.log(`stopEmbed Error: ${err}`));	
					}
					else if (lang === "es") {
						await interaction.editReply({ embeds: [stopEmbedEs], components: [stopButtonsEs] }).catch(err => console.log(`stopEmbed Error: ${err}`));
					}
					else if (lang === "ru") {
						await interaction.editReply({ embeds: [stopEmbedRu], components: [stopButtonsRu] }).catch(err => console.log(`stopEmbed Error: ${err}`));
					}
					else if (lang === "de") {
						await interaction.editReply({ embeds: [stopEmbedDe], components: [stopButtonsDe] }).catch(err => console.log(`stopEmbed Error: ${err}`));	
					}
					else if (lang === "pt") {
						await interaction.editReply({ embeds: [stopEmbedPt], components: [stopButtonsPt] }).catch(err => console.log(`stopEmbed Error: ${err}`));
					}
					else {
						await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => console.log(`stopEmbed Error: ${err}`));
					}	
				}
					
				else if ((interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID)) { //if the user is an admin
					if (lang === "en") {
						await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => console.log(`stopEmbed Error: ${err}`));	
					}
					else if (lang === "es") {
						await interaction.editReply({ embeds: [stopEmbedEs], components: [stopButtonsEs] }).catch(err => console.log(`stopEmbed Error: ${err}`));
					}
					else if (lang === "ru") {
						await interaction.editReply({ embeds: [stopEmbedRu], components: [stopButtonsRu] }).catch(err => console.log(`stopEmbed Error: ${err}`));
					}
					else if (lang === "de") {
						await interaction.editReply({ embeds: [stopEmbedDe], components: [stopButtonsDe] }).catch(err => console.log(`stopEmbed Error: ${err}`));	
					}
					else if (lang === "pt") {
						await interaction.editReply({ embeds: [stopEmbedPt], components: [stopButtonsPt] }).catch(err => console.log(`stopEmbed Error: ${err}`));
					}
					else {
						if (lang === "en") {
							await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => console.log(`stopEmbed Error: ${err}`));	
						}
						else if (lang === "es") {
							await interaction.editReply({ embeds: [stopEmbedEs], components: [stopButtonsEs] }).catch(err => console.log(`stopEmbed Error: ${err}`));
						}
						else if (lang === "ru") {
							await interaction.editReply({ embeds: [stopEmbedRu], components: [stopButtonsRu] }).catch(err => console.log(`stopEmbed Error: ${err}`));
						}
						else if (lang === "de") {
							await interaction.editReply({ embeds: [stopEmbedDe], components: [stopButtonsDe] }).catch(err => console.log(`stopEmbed Error: ${err}`));	
						}
						else if (lang === "pt") {
							await interaction.editReply({ embeds: [stopEmbedPt], components: [stopButtonsPt] }).catch(err => console.log(`stopEmbed Error: ${err}`));
						}
						else {
							await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => console.log(`stopEmbed Error: ${err}`));
						}	
					}	
				}		
					
				else {
					if (lang === "en") {
						await interaction.followUp({content: `You do not have the required permissions to do that.`, ephemeral: true});
					}
					else if (lang === "es") {
					  await interaction.followUp({content: `No tienes permiso para hacer eso.`, ephemeral: true});
					}
					else if (lang === "ru") {
					  await interaction.followUp({content: `У вас нет разрешения на это.`, ephemeral: true});
					}
					else if (lang === "de") {
					  await interaction.followUp({content: `Sie haben keine Erlaubnis dazu.`, ephemeral: true});
					}
					else if (lang === "pt") {
					  await interaction.followUp({content: `Você não tem permissão para fazer isso.`, ephemeral: true});
					}
					else {
					  await interaction.followUp({content: `You do not have the required permissions to do that.`, ephemeral: true});
					}
				}
				
			} 
			else  {
				if (lang === "en") {
					await interaction.followUp({ content: `These buttons are not for you.`, ephemeral: true });	
				}
				else if (lang === "es") {
				  await interaction.followUp({ content: `Estos botones no son para ti.`, ephemeral: true });
				}
				else if (lang === "ru") {
				  await interaction.followUp({ content: `Эти кнопки не для вас.`, ephemeral: true });
				}
				else if (lang === "de") {
				  await interaction.followUp({ content: `Diese Schaltflächen sind nicht für Sie.`, ephemeral: true });
				}
				else if (lang === "pt") {
				  await interaction.followUp({ content: `Esses botões não são para você.`, ephemeral: true });
				}
				else {
				  await interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
				}
			}
		}
			
		else {
			if (lang === "en") {
				await interaction.followUp({ content: `There was an error executing this button.`, ephemeral: true });
			}
			else if (lang === "es") {
				await interaction.followUp({ content: `Se ha producido un error.`, ephemeral: true });
			}
			else if (lang === "ru") {
				await interaction.followUp({ content: `Произошла ошибка.`, ephemeral: true });
			}
			else if (lang === "de") {
				await interaction.followUp({ content: `Es ist ein Fehler aufgetreten.`, ephemeral: true });
			}
			else if (lang === "pt") {
				await interaction.followUp({ content: `Ocorreu um erro.`, ephemeral: true });
			}
			else {
				await interaction.followUp({ content: `There was an error executing this button.`, ephemeral: true });
			}
		} //end checking for permissions		

				}}); //end fs.readFile for LANGData.txt
		}); //end fs:readFile			


				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 5))				
	
	} //end if stop

		
	},
};




	