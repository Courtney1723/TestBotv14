const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isButton()) {return};
		if (interaction.customId.startsWith(`configure - `)) {
			//console.log(`begin start: '${interaction.customId}'`);		

		let buttonUserID01 = (interaction.customId).split("configure - ");
		let buttonUserID = buttonUserID01[1];
			//console.log(`buttonUserID: ${buttonUserID}`);
			//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)

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

			let channelIDArray = [];
			interaction.guild.channels.cache.forEach(channel => {
			    if ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) {
			        channelIDArray.push(`${channel.id}`);
			    }
			});
			//console.log(`channelIDArray: ${channelIDArray}`);		
			
			
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

			function configureTitle() {
				if (lang === "en") {
					return `Add or Remove a Role`;
				}
				else if (lang === "es") {
					return `Agregar o quitar un rol`;
				}
				else if (lang === "ru") {
					return `Добавление и удаление роли`;
				}
				else if (lang === "de") {
					return `Hinzufügen oder Entfernen einer Rolle`;
				}
				else if (lang === "pt") {
					return `Adicionar ou remover uma função`;
				}
				else {
					return `Add or Remove a Role`;
				}
			}

			function configureDesc() {
				if (lang === "en") {
					return `Click **\'Add\'** to add a role that can configure auto posts.
					Click **\'Remove\'** to remove a role that can configure auto posts.`;
				}
				else if (lang === "es") {
					return `Haga clic en **\'Agregar\'** para agregar un rol que pueda configurar publicaciones automáticas.
					Haga clic en **\'Eliminar\'** para quitar un rol de tener la capacidad de configurar publicaciones automáticas.`;
				}
				else if (lang === "ru") {
					return `Щелчок **\'Добавлять\'** чтобы добавить роль, которая может настроить автоматические публикации.
					Щелчок **\'Убирать\'** чтобы удалить роль, которая может настраивать автоматические публикации.`;
				}
				else if (lang === "de") {
					return `Klicken **\'Hinzufügen\'** um eine Rolle hinzuzufügen, die automatische Beiträge konfigurieren kann.
					Klicken **\'Entfernen\'** um eine Rolle von der Möglichkeit zum Konfigurieren automatischer Beiträge zu entfernen.`;
				}
				else if (lang === "pt") {
					return `Clique **\'Adicionar\'** para adicionar uma função que possa configurar postagens automáticas.
					Clique **\'Retirar\'** para remover uma função de ter a capacidade de configurar postagens automáticas.`;
				}
				else {
					return `Click **\'Add\'** to add a role that can configure auto posts.
					Click **\'Remove\'** to remove a role that can configure auto posts.`;
				}
			}

			function configureAdd() {
				if (lang === "en") {
					return `Add`;
				}
				else if (lang === "es") {
					return `Agregar`;
				}
				else if (lang === "ru") {
					return `Добавлять`;
				}
				else if (lang === "de") {
					return `Hinzufügen`;
				}
				else if (lang === "pt") {
					return `Adicionar`;
				}
				else {
					return `Add`;
				}
			}

			function configureRemove() {
				if (lang === "en") {
					return `Remove`;
				}
				else if (lang === "es") {
					return `Eliminar`;
				}
				else if (lang === "ru") {
					return `Убирать`;
				}
				else if (lang === "de") {
					return `Entfernen`;
				}
				else if (lang === "pt") {
					return `Retirar`;
				}
				else {
					return `Remove`;
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
					return `Вернуться`;
				}
				else if (lang === "de") {
					return `Zurück`;
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
					return `Эти кнопки не для вас.`;
				}
				else if (lang === "de") {
					return `Diese Schaltflächen sind nicht für Sie.`;
				}
				else if (lang === "pt") {
					return `Esses botões não são para você.`;
				}
				else {
					return `These buttons are not for you.`;
				}				
		}			

		function firstCommandString() {
			if (lang === "en") {
				return `It looks like this is your first time using this command. Please try the configure button again.`;
			}
			else if (lang === "es") {
				return `Esta es la primera vez que ha utilizado este comando. Intenta presionar el botón de configuración.`;
			}
			else if (lang === "ru") {
				return `Вы впервые используете эту команду. Повторите попытку настройки.`;
			}
			else if (lang === "de") {
				return `Dies ist das erste Mal, dass Sie diesen Befehl verwenden. Bitte versuchen Sie es erneut mit der Schaltfläche Konfigurieren.`;
			}
			else if (lang === "pt") {
				return `Esta é a primeira vez que você usa este comando. Tente o botão configurar novamente.`;
			}
			else {
				return `It looks like this is your first time using this command. Please try the configure button again.`;
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
		  return `У вас нет разрешения на это.`;
		}
		else if (lang === "de") {
		  return `Sie haben keine Erlaubnis dazu.`;
		}
		else if (lang === "pt") {
		  return `Você não tem permissão para fazer isso.`;
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
			return `Эти кнопки не для вас.`;
		}
		else if (lang === "de") {
			return `Diese Schaltflächen sind nicht für Sie.`;
		}
		else if (lang === "pt") {
			return `Esses botões não são para você.`;
		}
		else {
			return `These buttons are not for you.`;
		}				
	}	

	function errorString() {
		if (lang === "en") {
			return `There was an error executing this button.`;
		}
		else if (lang === "es") {
			return `Se ha producido un error.`;
		}
		else if (lang === "ru") {
			return `Произошла ошибка.`;
		}
		else if (lang === "de") {
			return `Es ist ein Fehler aufgetreten.`;
		}
		else if (lang === "pt") {
			return `Ocorreu um erro.`;
		}
		else {
			return `There was an error executing this button.`;
		}
	}

	//-----END TRANSLATIONS-----//

	const configureEmbed = new EmbedBuilder()
	.setColor(0x00FFFF) //Teal
	.setTitle(`${configureTitle()}`)
	.setDescription(`${configureDesc()}`)

	const configureButtons = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId(`configureadd - ${interaction.user.id}`)
				.setLabel(`${configureAdd()}`)
				.setStyle(ButtonStyle.Success),
			new ButtonBuilder()
				.setCustomId(`configurestop - ${interaction.user.id}`)
				.setLabel(`${configureRemove()}`)
				.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId(`configureback - ${interaction.user.id}`)
					.setLabel(`${goBack()}`)
					.setStyle(ButtonStyle.Secondary),	
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
        if ((interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) {
				await interaction.editReply({ embeds: [configureEmbed], components: [configureButtons] }).catch(err => console.log(`configureEmbed Error: ${err}`));
     		} 
											
      else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
					await interaction.editReply({ embeds: [configureEmbed], components: [configureButtons] }).catch(err => {console.log(`configureEmbed Error: ${err}`); process.kill(1);});
			}
			else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
				await interaction.followUp({content: `${missingPermissions()}`, ephemeral: true});
			}
			else if (!interaction.user.id === buttonUserID)  {
					await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
			}
    }	
		else if (AdminRequired() === "AdminRequiredNo") { //if admin permissions are NOT required
			if ((interaction.user.id === buttonUserID) ) { 
	
					//console.log(`guildRoleIds.length: ${guildRoleIds.length}`)
					let hasARole = 0;
					for (a=0;a<=guildRoleIds.length - 1;a++) { //iterates through each role - 0 is @everyone
							//console.log(`guildRoleIds at ${i}: ${guildRoleIds[i]}`);
							if (interaction.member.roles.cache.has(guildRoleIds[a])) {
									hasARole += 1;
							}
					} //end loop to check for hasARole
						//console.log(`hasARole: ${hasARole} && required roles:${guildRoleIds.length}`)
				
					if (guildRoleIds.length === 0) { //no role required - @everyone allowed
							await interaction.editReply({ embeds: [configureEmbed], components: [configureButtons] }).catch(err => {console.log(`configureEmbed Error: ${err}`); process.kill(1)});
						}
					else if (hasARole >= 1) { //if the user has at least one role listed
							await interaction.editReply({ embeds: [configureEmbed], components: [configureButtons] }).catch(err => {console.log(`configureEmbed Error: ${err}`); process.kill(1)});
						}	
					else if ((interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID)) {
						await interaction.editReply({ embeds: [configureEmbed], components: [configureButtons] }).catch(err => {console.log(`configureEmbed Error: ${err}`); process.kill(1)});
					}
					else if (hasARole <= 0) {
						await interaction.followUp({content: `${missingPermissions()}`, ephemeral: true});					
					}
				} 
				else {
					await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });	
				}	
			}//end if admin permission not required
		else {
				await interaction.followUp({ content: `${errorString()}`, ephemeral: true });
		} //end checking for permissions

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
				}, (60000 * 5))					

				}}); //end fs.readFile for LANGDataBase.txt
	
		}); //end fs:readFile for guildID and Admin check			
		
		} //end if configure
	},
};
