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
		if (interaction.customId.startsWith(`configurestopmenu -`)) {
			//console.log(`begin configureStartMenu: '${interaction.customId}'`);		

		let menuUserID02 = (interaction.customId).split("configurestopmenu - u:");
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
						return `You selected an invalid response. || ❄❄❄ ||`;
				}
				else if (lang === "es") {
					return `Seleccionó una respuesta no válida. || ❄❄❄ ||`;
				}
				else if (lang === "ru") {
					return `Вы выбрали недопустимый ответ. || ❄❄❄ ||`;
				}
				else if (lang === "de") {
					return `Sie haben eine ungültige Antwort ausgewählt. || ❄❄❄ ||`;
				}
				else if (lang === "pt") {
					return `Você selecionou uma resposta inválida. || ❄❄❄ ||`;
				}
				else {
					return `You selected an invalid response. || ❄❄❄ ||`;
				}				
			}				

		function everyoneWarn() {
			if (lang === "en") {
					return `\n• <@&${interaction.guild.id}> can configure auto posts now.\n• Try the **/autopost** command again and click **Configure**. to add a role.`;	
			}
			else if (lang === "es") {
			    return `\n• <@&${interaction.guild.id}> puede configurar publicaciones automáticas ahora.\n• Vuelva a probar el comando **/autopost** y haga clic en **configurar** para agregar un rol.`;
			}
			else if (lang === "ru") {
				return `\n• <@&${interaction.guild.id}> теперь можно настроить автоматические сообщения.\n• Попробуйте команду **/autopost** еще раз и нажмите кнопку **Роли**, чтобы добавить роль.`;
			}
			else if (lang === "de") {
				return `\n• <@&${interaction.guild.id}>  kann jetzt automatische Beiträge konfigurieren.\n• Wiederholen Sie den Befehl **/autopost**, und klicken Sie auf **Konfigurieren**, um eine Rolle hinzuzufügen.`;
			}
			else if (lang === "pt") {
				return `\n• <@&${interaction.guild.id}> pode configurar postagens automáticas agora.\n• Tente o comando **/autopost** novamente e clique em **Configurar** para adicionar uma função.`;
			}
			else {
				return `\n• <@&${interaction.guild.id}> can configure auto posts now.\n• Try the **/autopost** command again and click **Configure**. to add a role.`;
			}			
		}

		function adminNotRequired() {
			if (lang === "en") {
				return `Administrator privileges are no longer required to configure auto posts.`;
			}
			else if (lang === "es") {
			  return `Ya no se requieren privilegios de administrador para configurar publicaciones automáticas.`;
			}
			else if (lang === "ru") {
				return `Права администратора больше не требуются для настройки автоматических записей.`;
			}
			else if (lang === "de") {
				return `Zum Konfigurieren automatischer Beiträge sind keine Administratorrechte mehr erforderlich.`;
			}
			else if (lang === "pt") {
				return `Os privilégios de administrador não são mais necessários para configurar postagens automáticas.`;
			}
			else {
				return `Administrator privileges are no longer required to configure auto posts.`;
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

			function removeRoleDesc() {
				if (lang === "en") {
					return `The <@&${menuRoleID}> role is now no longer allowed to configure auto posts.`;
				}
				else if (lang === "es") {
				  return `El rol <@&${menuRoleID}> ya no puede configurar publicaciones automáticas.`;
				}
				else if (lang === "ru") {
					return `Роль <@&${menuRoleID}> больше не разрешается настраивать автоматические записи.`;
				}
				else if (lang === "de") {
					return `Die <@&${menuRoleID}>-Rolle darf nun keine automatischen Beiträge mehr konfigurieren.`;
				}
				else if (lang === "pt") {
					return `A função <@&${menuRoleID}> agora não tem mais permissão para configurar postagens automáticas.`;
				}
				else {
					return `The <@&${menuRoleID}> role is now no longer allowed to configure auto posts.`;
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


//--END TRANSLATIONS--//		
					
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
  else if (menuRoleID.includes('yes')) { //Make the Admin permission not required
		//console.log(`adding admin role for ${guildIdDB}`);

			let roleIDArray = [];
			interaction.guild.roles.cache.forEach(role => {
				if (data.includes(`${role.id}`)) {
					roleIDArray.push(`${role.id}`);
				}
			});
			roleIDArray.shift(); //removes the @everyone role
			//console.log(`roleIDArray[]: ${roleIDArray}`);

			let everyoneCheck = "";
			if (roleIDArray.length <= 0) {
					everyoneCheck += `${everyoneWarn()}`;
				
			}
			console.log(`roleIDArray length: ${roleIDArray.length}`);
		
    const configureConfirmAddEmbed = new EmbedBuilder()
        .setColor(`Green`) 
        .setTitle(`${success()}`)
        .setDescription(`${adminNotRequired()}\n${everyoneCheck}`)	

		const confirmSettingsButton = new ActionRowBuilder()
		.addComponents(
				new ButtonBuilder()
						.setCustomId(`initialback - ${interaction.user.id}`)
						.setLabel(`${confirmSettingsString()}`)
						.setStyle(ButtonStyle.Secondary),	
		);		

    await interaction.deferUpdate();
		
    if (interaction.user.id === menuUserID) { //begin removing admin permissions
        await interaction.editReply({ embeds: [configureConfirmAddEmbed], components: [confirmSettingsButton] })
        .catch(err => console.log(`configureConfirmAddEmbed Error: ${err}`));

				let guildIdDB = `${interaction.guild.id}`;
				guildCount = data.split(`guild:${guildIdDB}`).length - 1;
					//console.log(`guildCount: ${guildCount}`);
		
				const find = `${guildIdDB} - admin:yes`;
				const replace = `${guildIdDB} - admin:no`;
				let newData = data;
					for (i=0;i<=guildCount-1;i++) { //iterates through every instance of required roles by guild
						newData = newData.replace(new RegExp(find, 'g'), replace);
					}
				//console.log(`newData: ${newData}`);
		                                        
		    //Replaces the rolesDataBase.txt file with removed Admin permission for the guild
		    fs.writeFile(`./rolesDataBase.txt`,`${newData}`, err => {
		        if (err) {
		            console.error(err)
		            return
		            }					
		        }); //end fs.writeFile to change the admin privileges	
					
		    } else {
		       interaction.followUp({ content: `${notForYou()}`, ephemeral: true });
		    }
		
		    }    // end removing Admins as a required permission 
				else { //start removing a role
		
					let roleIDArray = [];
					interaction.guild.roles.cache.forEach(role => {
						if (data.includes(`${role.id}`)) {
							roleIDArray.push(`${role.id}`);
						}
					});
					roleIDArray.shift(); //removes the @everyone role
					//console.log(`roleIDArray[]: ${roleIDArray}`);
		
					let everyoneCheck = "";
					if (roleIDArray.length <= 1) {
						if (AdminRequired() === `AdminRequiredNo`) {
							everyoneCheck += `${everyoneWarn()}`;
						}
						
					}
		
					const configureAddEmbed = new EmbedBuilder()
						.setColor(`Green`) 
						.setTitle(`${success()}`)
						.setDescription(`${removeRoleDesc()}\n${everyoneCheck}`)	

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
		        if (adminRoleBoolean[1].startsWith("yes")) { //If Admin permissions are required - ooposite of configureadd
		                AdminNameAdd += 'Administrators';
		                AdminYesNoAdd += 'yes';
		        }		
		        else {
		            AdminNameAdd += 'No Role Selected';
		            AdminYesNoAdd += 'undefinedrole';
		        }
					function AdminYesNo() {
						if (AdminYesNoAdd === 'undefinedrole') {
							return 'no';
						}
						else {
							return 'yes';
						}
					}
		
					// console.log(`role:${menuRoleID}`);
					// console.log(`AdminYesNo:${AdminYesNo()}`);
					// console.log(`data.replace: ${data.replace(`\nguild:${interaction.guild.id} - admin:${AdminYesNo()} - role:${menuRoleID} - `, "")}`)
		
					fs.writeFile('./rolesDataBase.txt', `${data.replace(`\nguild:${interaction.guild.id} - admin:${AdminYesNo()} - role:${menuRoleID} - `, "")}`, function (err) {
						if (err) throw err;
						console.log('A user removed a role from auto posts.');
					}); //end fs:writeFile to remove a role from autoposts

				
	    } else {
	       interaction.followUp({ content: `${notForYou()}`, ephemeral: true });
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




	