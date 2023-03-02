const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, optionstyle, StringSelectMenuBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Role, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile


module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isStringSelectMenu()) {return};
		if ((interaction.customId.startsWith(`configureStartMenu -`)) || (interaction.customId.startsWith(`configureStartMenu2 -`))) {
			//console.log(`begin configureStartMenu: '${interaction.customId}'`);		

		let oneOrTwo = "";
			if (interaction.customId.startsWith(`configureStartMenu2 -`)) {
				oneOrTwo += "2";
			}

		let menuUserID02 = (interaction.customId).split(`configureStartMenu${oneOrTwo} - u:`);
		let menuUserID01 = menuUserID02[1].split(" - ");
		let menuUserID = menuUserID01[0];
			//console.log(`configureStartMenu menuUserID: ${menuUserID}`);
			//console.log(`configureStartMenu interaction.user.id === menuUserID?: ${interaction.user.id === menuUserID}`)	

		let menuRoleID01 = (interaction.values).toString().split(`r:`);
		let menuRoleID = menuRoleID01[1];
			//console.log(`configureStartMenu menuRoleID: ${menuRoleID}`)

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
				if (AdminRequiredBoolean[1].startsWith(`yes`)) {
					return "AdminRequiredYes";
				}
				else {
					return "AdminRequiredNo";
				}
			}		

//--BEGIN TRANSLATIONS--//

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

				function notForYou() {
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
						return `These options are not for you.`;
					}						
				}	

			function tryAgain() {
				if (lang === "en") {
					return `Please Try Again`;
				}
				else if (lang === "es") {
					return `Inténtalo de nuevo`;
				}
				else if (lang === "ru") {
					return `Повторите попытку`;
				}
				else if (lang === "de") {
					return `Bitte versuchen Sie es erneut.`;
				}
				else if (lang === "pt") {
					return `Tente novamente`;
				}
				else {
					return `Please Try Again`;
				}				
			}		

			function tryAgainDesc() {
				if (lang === "en") {
						return `You selected an invalid response. || ♪♬ ||`;
				}
				else if (lang === "es") {
					return `Seleccionó una respuesta no válida. || ♪♬ ||`;
				}
				else if (lang === "ru") {
					return `Вы выбрали недопустимый ответ. || ♪♬ ||`;
				}
				else if (lang === "de") {
					return `Sie haben eine ungültige Antwort ausgewählt. || ♪♬ ||`;
				}
				else if (lang === "pt") {
					return `Você selecionou uma resposta inválida. || ♪♬ ||`;
				}
				else {
					return `You selected an invalid response. || ♪♬ ||`;
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
					return `Êxito`;
				}
				else {
					return `Success`;
				}				
			}	

		function adminNowRequired() {
			if (lang === "en") {
					return `Administrator privileges are now **required** to configure autoposts.`;
			}
			else if (lang === "es") {
				return `Ahora se requieren privilegios de administrador para configurar publicaciones automáticas.`;
			}
			else if (lang === "ru") {
				return `Для настройки автоматических сообщений теперь требуются права администратора.`;
			}
			else if (lang === "de") {
				return `Zum Konfigurieren automatischer Beiträge sind jetzt Administratorrechte erforderlich.`;
			}
			else if (lang === "pt") {
				return `Os privilégios de administrador agora são necessários para configurar postagens automáticas.`;
			}
			else {
				return `Administrator privileges are now **required** to configure autoposts.`;
			}			
		}

		function adminWhitelist() {
			if (lang === "en") {
				return `Any user who does not have administrator privileges may not configure auto posts \n**even if they have a whitelisted role.**`;	
			}
			else if (lang === "es") {
				return `Cualquier usuario que no tenga privilegios de administrador no puede configurar publicaciones automáticas, incluso si tiene un rol en la lista blanca.`;
			}
			else if (lang === "ru") {
				return `Любой пользователь, не имеющий прав администратора, может не настраивать автоматические публикации, даже если у него есть роль в белом списке.`;
			}
			else if (lang === "de") {
				return `Benutzer, die nicht über Administratorrechte verfügen, können automatische Beiträge nicht konfigurieren, selbst wenn sie über eine Whitelist-Rolle verfügen.`;
			}
			else if (lang === "pt") {
				return `Qualquer usuário que não tenha privilégios de administrador não pode configurar postagens automáticas, \n**mesmo que tenha uma função na lista de permissões.**`;
			}
			else {
				return `Any user who does not have administrator privileges may not configure auto posts \n**even if they have a whitelisted role.**`;
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


//--END TRANSLATIONS --//					

fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
		    if (err) {console.log(`Error: ${err}`)} //If an error, console.log	

if (interaction.user.id != menuUserID) {
	interaction.reply({ content: `${notForYou()}`, ephemeral: true });
}
else if (menuRoleID === `undefinedrole`) { //if the Admin role is already required - error

    const configureDuplicateEmbed = new EmbedBuilder()
    .setColor(`Orange`) 
    .setTitle(`${tryAgain()}`)
    .setDescription(`${tryAgainDesc()}`)	
    
    await interaction.deferUpdate();
    if (interaction.user.id === menuUserID) {
        await interaction.followUp({ embeds: [configureDuplicateEmbed], components: [], ephemeral: true })
        .catch(err => console.log(`configureDuplicateEmbed Error: ${err}`));
        } else {
       interaction.followUp({ content: `${notForYou()}`, ephemeral: true });
    }

  } //end if menuRoleID === `undefinedrole`
  else if (menuRoleID.includes('yes')) { //Make the Admin permission required
		//console.log(`adding admin role for ${guildIdDB}`);
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			interaction.reply({ content: `${missingPermissions()}`, ephemeral: true });
		} 
		else  if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) { 
    const configureConfirmAddEmbed = new EmbedBuilder()
        .setColor(`Green`) 
        .setTitle(`${success()}`)
        .setDescription(`${adminNowRequired()}
				\n• ${adminWhitelist()}`)	

		const confirmSettingsButton = new ActionRowBuilder()
		.addComponents(
				new ButtonBuilder()
						.setCustomId(`initialback - ${interaction.user.id}`)
						.setLabel(`${confirmSettingsString()}`)
						.setStyle(ButtonStyle.Secondary),	
		);				

		    await interaction.deferUpdate();
		    if (interaction.user.id === menuUserID) {
		        await interaction.editReply({ embeds: [configureConfirmAddEmbed], components: [confirmSettingsButton] })
		        .catch(err => console.log(`configureConfirmAddEmbed Error: ${err}`));					
		
				let guildIdDB = `${interaction.guild.id}`;
				guildCount = data.split(`guild:${guildIdDB}`).length - 1;
					//console.log(`guildCount: ${guildCount}`);
		
				const find = `${guildIdDB} - admin:no`;
				const replace = `${guildIdDB} - admin:yes`;
				let newData = data;
					for (i=0;i<=guildCount-1;i++) { //iterates through every instance of required roles by guild
						newData = newData.replace(new RegExp(find, 'g'), replace);
					}
				// console.log(`newData: ${newData}`);
		                                        
		    //Replaces the rolesDataBase.txt file with Admin permission for the guild
		    fs.writeFile(`./rolesDataBase.txt`,`${newData}`, err => {
		        if (err) {
		            console.error(err)
		            return
		            }					
		        }); //end fs.writeFile to change the admin privileges		
			
    } else {
       interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
    }

			} //end if user has admin privileges
    }    // end adding Admins as a required permission 
		else {

			function AdminCheckDesc() {
				if (lang === "en") {
					return `\n• The Administrator privilege is required! \n• Any user with the <@&${menuRoleID}> role must also have administrator privileges in order to configure auto posts.\n• Try the **_____** comand again and click **\'_____\'** to remove the administrator requirement.`
				}
				if (lang === "es") {
					return `\n• The Administrator privilege is required! \n• Any user with the <@&${menuRoleID}> role must also have administrator privileges in order to configure auto posts.\n• Try the **/autopost** comand again and click **\'Configure\'** to remove the administrator requirement.`
				}		
				if (lang === "ru") {
					return `\n• Требуются права администратора! \n• Любой пользователь с ролью <@&${menuRoleID}> также должен иметь права администратора, чтобы настраивать автоматические сообщения.\n• Повторите команду **/autopost** и нажмите **\'Роли\'* * для удаления требования администратора.`
				}			
				if (lang === "de") {
					return `\n• The Administrator privilege is required! \n• Any user with the <@&${menuRoleID}> role must also have administrator privileges in order to configure auto posts.\n• Try the **/autopost** comand again and click **\'Configure\'** to remove the administrator requirement.`
				}				
				if (lang === "pt") {
					return `\n• The Administrator privilege is required! \n• Any user with the <@&${menuRoleID}> role must also have administrator privileges in order to configure auto posts.\n• Try the **/autopost** comand again and click **\'Configure\'** to remove the administrator requirement.`
				}	
				else {
					return `\n• The Administrator privilege is required! \n• Any user with the <@&${menuRoleID}> role must also have administrator privileges in order to configure auto posts.\n• Try the **/autopost** comand again and click **\'Configure\'** to remove the administrator requirement.`
				}				
			}

			let AdminCheck = "";
			if (AdminRequired() === `AdminRequiredYes`) {
				AdminCheck += `\n• The Administrator privilege is required! \n• Any user with the <@&${menuRoleID}> role must also have administrator privileges in order to configure auto posts.\n• Try the **/autopost** comand again and click **\'Configure\'** to remove the administrator requirement.`;
			}

		function 	configureAddDesc() {
			if (lang === "en") {
				return `Anyone with the <@&${menuRoleID}> role can now configure auto posts.\n${AdminCheck}`;
			}
			if (lang === "es") {
				return `Cualquier persona con el rol <@&${menuRoleID}> ahora puede configurar publicaciones automáticas.\n${AdminCheck}`;
			}		
			if (lang === "ru") {
				return `Теперь любой пользователь с ролью <@&${menuRoleID}> может настраивать автоматические сообщения.\n${AdminCheck}`;
			}		
			if (lang === "de") {
				return `Jeder mit der Rolle <@&${menuRoleID}> kann jetzt automatische Beiträge konfigurieren.\n${AdminCheck}`;
			}		
			if (lang === "pt") {
				return `Qualquer pessoa com a função <@&${menuRoleID}> agora pode configurar publicações automáticas.\n${AdminCheck}`;
			}		
			else {
				return `Anyone with the <@&${menuRoleID}> role can now configure auto posts.\n${AdminCheck}`;
			}	
		}			

			const configureAddEmbed = new EmbedBuilder()
				.setColor(`Green`) 
				.setTitle(`${success()}`)
				.setDescription(`${configureAddDesc()}`)	

		const confirmSettingsButton = new ActionRowBuilder()
		.addComponents(
				new ButtonBuilder()
						.setCustomId(`initialback - ${interaction.user.id}`)
						.setLabel(`${confirmSettingsString()}`)
						.setStyle(ButtonStyle.Secondary),	
		);			

	    await interaction.deferUpdate();
			if (interaction.user.id != menuUserID) {
				interaction.followUp({ content: `These options aren't for you!`, ephemeral: true });
			}
	    else if (interaction.user.id === menuUserID) {
	        await interaction.editReply({ embeds: [configureAddEmbed], components: [confirmSettingsButton] })
	        .catch(err => console.log(`configureAddEmbed Error: ${err}`));

					let guildIdDB = `${interaction.guild.id}`;
					let AdminNameAdd = "";
					let AdminYesNoAdd = "";
		        let adminRoleBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
		        if (adminRoleBoolean[1].startsWith("yes")) { //If Admin permissions are required
		                AdminNameAdd += 'No Role Selected';
		                AdminYesNoAdd += 'undefinedrole';
		        }		
		        else {
		            AdminNameAdd += 'Administrators';
		            AdminYesNoAdd += 'yes';
		        }
					function AdminYesNo() {
						if (AdminYesNoAdd === 'undefinedrole') {
							return 'yes';
						}
						else {
							return 'no';
						}
					}
		
					fs.appendFile(`rolesDataBase.txt`,`guild:${guildIdDB} - admin:${AdminYesNo()} - role:${menuRoleID} - \n`, err => {
					 if (err) {
						 console.error(err)
						 return
						}					
					}); // end fs:appendFile to add a channel for gta autop posts	

				
	    } else {
	       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
	    }		


		} // end adding a new role to rolesDataBase.txt

				}); //end fs.readFile for rolesDataBase.txt

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
			
		});//end fs:readFile	
			
		}// end if interaction.customId === 'configureStartMenu'
		
	},
};




	