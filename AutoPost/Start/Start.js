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

const expiredButtonEs = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId(`expired`)
			.setLabel('Esta interacción expiró.')
			.setStyle(ButtonStyle.Secondary)
			.setEmoji(':RSWeekly:1025248227248848940')
			.setDisabled(true),			
	);

const expiredButtonRu = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId(`expired`)
			.setLabel('Срок действия этого взаимодействия истек.')
			.setStyle(ButtonStyle.Secondary)
			.setEmoji(':RSWeekly:1025248227248848940')
			.setDisabled(true),			
	);

const expiredButtonDe = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId(`expired`)
			.setLabel('Diese Interaktion ist abgelaufen.')
			.setStyle(ButtonStyle.Secondary)
			.setEmoji(':RSWeekly:1025248227248848940')
			.setDisabled(true),			
	);

const expiredButtonPt = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId(`expired`)
			.setLabel('Esta interação expirou.')
			.setStyle(ButtonStyle.Secondary)
			.setEmoji(':RSWeekly:1025248227248848940')
			.setDisabled(true),			
	);

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isButton()) {return};
		if (interaction.customId.startsWith(`start -`)) {
			//console.log(`begin start: '${interaction.customId}'`);		

		let buttonUserID01 = (interaction.customId).split("start - ");
		let buttonUserID = buttonUserID01[1];
			//console.log(`start buttonUserID: ${buttonUserID}`);
			//console.log(`start interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`);
			//console.log(`start interaction.user.id: ${interaction.user.id} && buttonUserID: ${buttonUserID}`);

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
				//console.log(`AdminRequired(): ${AdminRequired()}`)

		const startEmbed = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`Start Auto Posting`)
			.setDescription(`Click **\'GTA\'** to set up Grand Theft Auto V Online Auto Posts for **every Thursday at 2:00 PM EST**.

Click **\'RDO\'** to set up Red Dead Redemption II Auto Posts for **the first Tuesday of every month at 2:00 PM EST**.`)	
			
		const startButtons = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtastart - ${interaction.user.id}`)
			        .setLabel('GTA')
			        .setStyle(ButtonStyle.Success),
			    new ButtonBuilder()
			        .setCustomId(`rdostart - ${interaction.user.id}`)
			        .setLabel('RDO')
			        .setStyle(ButtonStyle.Danger),		
					new ButtonBuilder()
			        .setCustomId(`startback - ${interaction.user.id}`)
			        .setLabel('Go Back')
			        .setStyle(ButtonStyle.Secondary),	
			);	

		const startEmbedEs = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`Iniciar publicación automática`)
			.setDescription(`Clic **\'GTA\'** para comenzar a publicar publicaciones automáticas en línea de Grand Theft Auto V para **todos los jueves a las 2:00 PM EST**.

Clic **\'RDO\'** para comenzar a publicar publicaciones automáticas de Red Dead Redemption II para **el primer martes de cada mes a las 2:00 PM EST**.`)	
			
		const startButtonsEs = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtastart - ${interaction.user.id}`)
			        .setLabel('GTA')
			        .setStyle(ButtonStyle.Success),
			    new ButtonBuilder()
			        .setCustomId(`rdostart - ${interaction.user.id}`)
			        .setLabel('RDO')
			        .setStyle(ButtonStyle.Danger),		
					new ButtonBuilder()
			        .setCustomId(`startback - ${interaction.user.id}`)
			        .setLabel('Volver')
			        .setStyle(ButtonStyle.Secondary),	
			);			

		const startEmbedRu = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`Запуск автоматических записей`)
			.setDescription(`Щелчок **\'GTA\'** для запуска Grand Theft Auto V Online Auto Posts для **каждый четверг в 14:00 EST**.

Щелчок **\'RDO\'** чтобы начать автоматическую публикацию Red Dead Redemption II для **первого вторника каждого месяца в 14:00 EST**.`)	
			
		const startButtonsRu = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtastart - ${interaction.user.id}`)
			        .setLabel('GTA')
			        .setStyle(ButtonStyle.Success),
			    new ButtonBuilder()
			        .setCustomId(`rdostart - ${interaction.user.id}`)
			        .setLabel('RDO')
			        .setStyle(ButtonStyle.Danger),		
					new ButtonBuilder()
			        .setCustomId(`startback - ${interaction.user.id}`)
			        .setLabel('Вернуться')
			        .setStyle(ButtonStyle.Secondary),	
			);	

		const startEmbedDe = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`Automatische Beiträge starten`)
			.setDescription(`Klicken **\'GTA\'** um Grand Theft Auto V Online Auto Posts für **jeden Donnerstag um 14:00 Uhr EST** zu starten.

Klicken **\'RDO\'** um Red Dead Redemption II Auto Posts für **den ersten Dienstag eines jeden Monats um 14:00 Uhr EST** zu starten.`)	
			
		const startButtonsDe = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtastart - ${interaction.user.id}`)
			        .setLabel('GTA')
			        .setStyle(ButtonStyle.Success),
			    new ButtonBuilder()
			        .setCustomId(`rdostart - ${interaction.user.id}`)
			        .setLabel('RDO')
			        .setStyle(ButtonStyle.Danger),		
					new ButtonBuilder()
			        .setCustomId(`startback - ${interaction.user.id}`)
			        .setLabel('Zurück')
			        .setStyle(ButtonStyle.Secondary),	
			);

		const startEmbedPt = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`Iniciar postagens automáticas`)
			.setDescription(`Clique **\'GTA\'** para iniciar Grand Theft Auto V Online auto posts para **todas as quintas-feiras às 14:00 EST**.

Clique **\'RDO\'** para iniciar Red Dead Redemption II auto posts para **a primeira terça-feira de cada mês às 14:00 EST **.`)	
			
		const startButtonsPt = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtastart - ${interaction.user.id}`)
			        .setLabel('GTA')
			        .setStyle(ButtonStyle.Success),
			    new ButtonBuilder()
			        .setCustomId(`rdostart - ${interaction.user.id}`)
			        .setLabel('RDO')
			        .setStyle(ButtonStyle.Danger),		
					new ButtonBuilder()
			        .setCustomId(`startback - ${interaction.user.id}`)
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
				await interaction.followUp({ content: `Esta es la primera vez que usas este comando. Vuelva a intentar el botón Inicio.`, ephemeral: true });
			}
			else if (lang === "ru") {
				await interaction.followUp({ content: `Вы впервые используете эту команду. Повторите попытку нажатия кнопки «Пуск».`, ephemeral: true });
			}
			else if (lang === "de") {
				await interaction.followUp({ content: `Dies ist das erste Mal, dass Sie diesen Befehl verwenden. Wiederholen Sie die Startschaltfläche.`, ephemeral: true });
			}
			else if (lang === "pt") {
				await interaction.followUp({ content: `Esta é a primeira vez que você usa este comando. Tente o botão Iniciar novamente.`, ephemeral: true });
			}
			else {
				await interaction.followUp({ content: `It looks like this is your first time using this command. Please try the start button again.`, ephemeral: true });
			}
		}
			
		else if (AdminRequired() === "AdminRequiredYes") { //if admin permissions are required
			if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) {
				if (lang === "en") {
					await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startEmbed Error: ${err}`));	
				}
				else if (lang === "es") {
					await interaction.editReply({ embeds: [startEmbedEs], components: [startButtonsEs] }).catch(err => console.log(`startEmbed Error: ${err}`));
				}
				else if (lang === "ru") {
					await interaction.editReply({ embeds: [startEmbedRu], components: [startButtonsRu] }).catch(err => console.log(`startEmbed Error: ${err}`));
				}
				else if (lang === "de") {
					await interaction.editReply({ embeds: [startEmbedDe], components: [startButtonsDe] }).catch(err => console.log(`startEmbed Error: ${err}`));	
				}
				else if (lang === "pt") {
					await interaction.editReply({ embeds: [startEmbedPt], components: [startButtonsPt] }).catch(err => console.log(`startEmbed Error: ${err}`));
				}
				else {
					await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startEmbed Error: ${err}`));
				}
			} 
			else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
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
				
			else if (!interaction.user.id === buttonUserID)  {
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

				//console.log(`guildRoleIds.length: ${guildRoleIds.length}`)
				let hasARole = 0;
				for (a=0;a<=guildRoleIds.length - 1;a++) { //iterates through each role
					//console.log(`guildRoleIds at ${i}: ${guildRoleIds[i]}`);
					if (interaction.member.roles.cache.has(guildRoleIds[a])) {
						hasARole += 1;
					}
				} //end loop to check for hasARole
					//console.log(`hasARole: ${hasARole} && required roles:${guildRoleIds.length}`)
				if ( (guildRoleIds.length === 0) && (interaction.user.id === buttonUserID) ) { //no role required
					if (lang === "en") {
						await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
					}
					else if (lang === "es") {
					  await interaction.editReply({ embeds: [startEmbedEs], components: [startButtonsEs] }).catch(err => console.log(`startButtonsEs Error: ${err.stack}`));
					}
					else if (lang === "ru") {
					  await interaction.editReply({ embeds: [startEmbedRu], components: [startButtonsRu] }).catch(err => console.log(`startButtonsRu Error: ${err.stack}`));
					}
					else if (lang === "de") {
					  await interaction.editReply({ embeds: [startEmbedDe], components: [startButtonsDe] }).catch(err => console.log(`startButtonsDe Error: ${err.stack}`));
					}
					else if (lang === "pt") {
					  await interaction.editReply({ embeds: [startEmbedPt], components: [startButtonsPt] }).catch(err => console.log(`startButtonsPt Error: ${err.stack}`));
					}
					else {
					  await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
					}
				}
					
				else if ( (hasARole >= 1) && (interaction.user.id === buttonUserID) ) { //if the user has at least one role listed
					if (lang === "en") {
						await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
					}
					else if (lang === "es") {
					  await interaction.editReply({ embeds: [startEmbedEs], components: [startButtonsEs] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
					}
					else if (lang === "ru") {
					  await interaction.editReply({ embeds: [startEmbedRu], components: [startButtonsRu] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
					}
					else if (lang === "de") {
					  await interaction.editReply({ embeds: [startEmbedDe], components: [startButtonsDe] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
					}
					else if (lang === "pt") {
					  await interaction.editReply({ embeds: [startEmbedPt], components: [startButtonsPt] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
					}
					else {
					  await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
					}
				}
					
				else if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) { //If the user is an administrator
					if (lang === "en") {
						await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
					}
					else if (lang === "es") {
						await interaction.editReply({ embeds: [startEmbedEs], components: [startButtonsEs] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
					}
					else if (lang === "ru") {
						await interaction.editReply({ embeds: [startEmbedRu], components: [startButtonsRu] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
					}
					else if (lang === "de") {
						await interaction.editReply({ embeds: [startEmbedDe], components: [startButtonsDe] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
					}
					else if (lang === "pt") {
						await interaction.editReply({ embeds: [startEmbedPt], components: [startButtonsPt] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
					}
					else {
						await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
					}
				}		
					
				else if (hasARole <= 0) { //if the user does not have a listed role and is not an administrator
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

				}});// end fs:readFile for LANGData.txt
		}); //end fs:readFile		

				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 5))		
	
	} //end if start
	},
};




	