const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

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

//--BEGIN TRANSLATIONS--//
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

		function startTitle() {
			if (lang === "en") {
				return `Start Auto Posting`;
			}
			if (lang === "es") {
				return `Iniciar publicaci??n autom??tica`;
			}			
			if (lang === "ru") {
				return `???????????? ???????????????????????????? ??????????????`;
			}		
			if (lang === "de") {
				return `Automatische Beitr??ge starten`;
			}		
			if (lang === "pt") {
				return `Iniciar postagens autom??ticas`;
			}			
			else {
				return `Start Auto Posting`;
			}
		}

		function startDesc() {
			if (lang === "en") {
				return `Click **\'GTA\'** to set up Grand Theft Auto V Online Auto Posts for **every Thursday at 2:00 PM EST**.

Click **\'RDO\'** to set up Red Dead Redemption II Auto Posts for **the first Tuesday of every month at 2:00 PM EST**.`;
			}
			if (lang === "es") {
				return `Clic **\'GTA\'** para comenzar a publicar publicaciones autom??ticas en l??nea de Grand Theft Auto V para **todos los jueves a las 2:00 PM EST**.

Clic **\'RDO\'** para comenzar a publicar publicaciones autom??ticas de Red Dead Redemption II para **el primer martes de cada mes a las 2:00 PM EST**.`;
			}
			if (lang === "ru") {
				return `???????????? **\'GTA\'** ?????? ?????????????? Grand Theft Auto V Online Auto Posts ?????? **???????????? ?????????????? ?? 14:00 EST**.

???????????? **\'RDO\'** ?????????? ???????????? ???????????????????????????? ???????????????????? Red Dead Redemption II ?????? **?????????????? ???????????????? ?????????????? ???????????? ?? 14:00 EST**.`;
			}
			if (lang === "de") {
				return `Klicken Sie auf **\'GTA\'**, um GTA Online Auto-Beitr??ge f??r jeden Donnerstag um **14:00 Uhr EST** zu starten.

Klicken Sie auf **\'RDO\'**, um Red Dead Online Auto-Posts f??r **den ersten Dienstag jedes Monats 2:00pm EST** zu starten.`;
			}		
			if (lang === "pt") {
				return `Clique **\'GTA\'** para iniciar Grand Theft Auto V Online auto posts para **todas as quintas-feiras ??s 14:00 EST**.

Clique **\'RDO\'** para iniciar Red Dead Redemption II auto posts para **a primeira ter??a-feira de cada m??s ??s 14:00 EST **.`;
			}
			else {
				return `Click **\'GTA\'** to set up Grand Theft Auto V Online Auto Posts for **every Thursday at 2:00 PM EST**.

Click **\'RDO\'** to set up Red Dead Redemption II Auto Posts for **the first Tuesday of every month at 2:00 PM EST**.`;				
			}
		}

		function goBack() {
			if (lang === "en") {
					return `Go Back`;
			}
			else if (lang === "es") {
				return `Volver`;
			}
			else if (lang === "ru") {
				return `??????????????????`;
			}
			else if (lang === "de") {
				return `Zur??ck`;
			}
			else if (lang === "pt") {
				return `Voltar`;
			}
			else {
				return `Go Back`;
			}					
		}				

				function notYourButtonString() {
					if (lang === "en") {
						return `These buttons are not for you.`;
					}
					else if (lang === "es") {
						return `Estos botones no son para ti.`;
					}
					else if (lang === "ru") {
						return `?????? ???????????? ???? ?????? ??????.`;
					}
					else if (lang === "de") {
						return `Diese Schaltfl??chen sind nicht f??r Sie.`;
					}
					else if (lang === "pt") {
						return `Esses bot??es n??o s??o para voc??.`;
					}
					else {
						return `These buttons are not for you.`;
					}				
			}	

			function firstCommandString() {
					if (lang === "en") {
						return `It looks like this is your first time using this command. Please try the start button again.`;
					}
					else if (lang === "es") {
						return `Esta es la primera vez que ha utilizado este comando. Intenta presionar el bot??n de Empezar.`;
					}
					else if (lang === "ru") {
						return `???? ?????????????? ?????????????????????? ?????? ??????????????. ?????????????????? ?????????????? ?????????????? ???????????? ????????????.`;
					}
					else if (lang === "de") {
						return `Dies ist das erste Mal, dass Sie diesen Befehl verwenden. Wiederholen Sie die Startschaltfl??che.`;
					}
					else if (lang === "pt") {
						return `Esta ?? a primeira vez que voc?? usa este comando. Tente o bot??o Come??ar novamente.`;
					}
					else {
						return `It looks like this is your first time using this command. Please try the start button again.`;
					}				
			}

			function missingPermissions()	{
				if (lang === "en") {
					return `You do not have the required permissions to do that.`;
				}
				else if (lang === "es") {
				  return `No tienes permiso para hacer eso.`;
				}
				else if (lang === "ru") {
				  return `?? ?????? ?????? ???????????????????? ???? ??????.`;
				}
				else if (lang === "de") {
				  return `Sie haben keine Erlaubnis dazu.`;
				}
				else if (lang === "pt") {
				  return `Voc?? n??o tem permiss??o para fazer isso.`;
				}
				else {
				  return `You do not have the required permissions to do that.`;
				}				
			}			

			function notYourButtonString() {
					if (lang === "en") {
						return `These buttons are not for you.`;
					}
					else if (lang === "es") {
						return `Estos botones no son para ti.`;
					}
					else if (lang === "ru") {
						return `?????? ???????????? ???? ?????? ??????.`;
					}
					else if (lang === "de") {
						return `Diese Schaltfl??chen sind nicht f??r Sie.`;
					}
					else if (lang === "pt") {
						return `Esses bot??es n??o s??o para voc??.`;
					}
					else {
						return `These buttons are not for you.`;
					}				
			}		

		function errorString() {
			if (lang === "en") {
				return `There was an error executing this button.`;
			}
			if (lang === "es") {
				return `Se ha producido un error.`;
			}
			if (lang === "ru") {
				return `?????????????????? ????????????.`;
			}
			if (lang === "de") {
				return `Es ist ein Fehler aufgetreten.`;
			}
			if (lang === "pt") {
				return `Ocorreu um erro.`;
			}			
			else {
				return `There was an error executing this button.`;
			}			
		}	

		function expiredLabel() {
			if (lang === "en") {
				return `This interaction expired.`;
			}
			if (lang === "es") {
				return `Esta interacci??n expir??.`;
			}
			if (lang === "ru") {
				return `???????? ???????????????? ?????????? ???????????????????????????? ??????????.`;
			}
			if (lang === "de") {
				return `Diese Interaktion ist abgelaufen.`;
			}
			if (lang === "pt") {
				return `Esta intera????o expirou.`;
			}
			else {
				return `This interaction expired.`;
			}			
		}			

//--END TRANSLATIONS--//

		const startEmbed = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`${startTitle()}`)
			.setDescription(`${startDesc()}`)	
			
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
			        .setLabel(`${goBack()}`)
			        .setStyle(ButtonStyle.Secondary),	
			);		

			const expiredButton = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`expired`)
						.setLabel(`${expiredLabel()}`)
						.setStyle(ButtonStyle.Secondary)
						.setEmoji(':RSWeekly:1025248227248848940')
						.setDisabled(true),			
			);					

			

//begin checking for permissions
		await interaction.deferUpdate();
		//console.log(`AdminRequired(): ${AdminRequired()}`)
		if (interaction.user.id != buttonUserID) {
			await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
		}	
		else if (AdminRequired() === undefined) {
				await interaction.followUp({ content: `${firstCommandString()}`, ephemeral: true });
		}
		else if (AdminRequired() === "AdminRequiredYes") { //if admin permissions are required
			if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) {
					await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startEmbed Error: ${err}`));	
			} 
			else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
					await interaction.followUp({content: `${missingPermissions()}`, ephemeral: true});
			}
				
			else if (!interaction.user.id === buttonUserID)  {
					await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });	
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
					await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
				}
					
				else if ( (hasARole >= 1) && (interaction.user.id === buttonUserID) ) { //if the user has at least one role listed
						await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
				}
					
				else if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) { //If the user is an administrator
						await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
				}		
				else if (hasARole <= 0) { //if the user does not have a listed role and is not an administrator
					await interaction.followUp({content: `${missingPermissions()}`, ephemeral: true});
				}											
		}
			
		else {
				await interaction.followUp({ content: `${errorString()}`, ephemeral: true });
		} //end checking for permissions		

				}});// end fs:readFile for LANGData.txt
		}); //end fs:readFile		

				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 5))		
	
	} //end if start
	},
};




	