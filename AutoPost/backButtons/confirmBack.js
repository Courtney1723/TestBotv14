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
		if (interaction.customId.startsWith(`initialback -`)) {			


		let buttonUserID01 = (interaction.customId).split("initialback - ");
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
			guildRoleIds.shift(1); //removes the @everyone role
				//console.log(`guildRoleIds: ${guildRoleIds}`);

			function AdminRequired() {
				let AdminRequiredBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
				if (AdminRequiredBoolean[1] === undefined) { //if the autopost command has never been triggered - sets default settings
					 	fs.appendFile(`./rolesDataBase.txt`,`guild:${interaction.guild.id} - admin:yes - role:undefined - \n`, err => {
 							if (err) {
 								console.error(err)
 								return
 							}					
 						}); //end fs.appendFile	
				}
				else if (AdminRequiredBoolean[1].includes(`yes`)) {
					return "AdminRequiredYes";
				}
				else {
					return "AdminRequiredNo";
				}
			}	

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

			let channelIDArray = [];
			interaction.guild.channels.cache.forEach(channel => { //populates channelIDArray with the server text channels
			    if ((channel.type === 0) || (channel.type === 5)) { //if channel is a text or annoucement channel
			        channelIDArray.push(`${channel.id}`);
			    }
			});
			//console.log(`channelIDArray: ${channelIDArray}`);			

		let GTAConfirmString = "";
		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) { //Starts Populating subscribed GTA channels
			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
			else {
					//console.log(`data: ${data}`);
					for (i = 0; i <= channelIDArray.length - 1; i++) {
						if (data.includes(`${channelIDArray[i]}`)) { //If the GTADataBase.txt contains a channel in the interaction guild
							GTAConfirmString += `• <#${channelIDArray[i]}>\n`;
							//console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
							//console.log(`GTAConfirmString at ${i}: ${GTAConfirmString}`);	
						} 
					}
				}
			//console.log(`GTAConfirmString: ${GTAConfirmString}`);	
			if (!GTAConfirmString.includes('• ')) {
				if (lang === "en") {
					GTAConfirmString += `• There are no channels in this server subscribed to GTA Online auto posts.\n`;
				}
				else if (lang === "es") {
				  GTAConfirmString += `• No hay canales en este servidor suscritos a publicaciones automáticas GTA Online.\n`;
				}
				else if (lang === "ru") {
				  GTAConfirmString += `• На этом сервере нет каналов, подписанных на автоматические посты GTA Online.\n`;
				}
				else if (lang === "de") {
				  GTAConfirmString += `• Es gibt keine Kanäle auf diesem Server, die GTA Online-Auto-Posts abonniert haben.\n`;
				}
				else if (lang === "pt") {
				  GTAConfirmString += `• Não há canais neste servidor inscritos para GTA Online auto posts.\n`;
				}
				else {
				  GTAConfirmString += `• There are no channels in this server subscribed to GTA Online auto posts.\n`;
				}
			}
		
		let RDOConfirmString = "";
		fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
			else {
					//console.log(`data: ${data}`);
					for (i = 0; i <= channelIDArray.length - 1; i++) {
						if (data.includes(`${channelIDArray[i]}`)) { //If the GTADataBase.txt contains a channel in the interaction guild
							RDOConfirmString += `• <#${channelIDArray[i]}>\n`;
							//console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
							//console.log(`RDOConfirmString at ${i}: ${RDOConfirmString}`);	
						} 
					}
				}
			//console.log(`RDOConfirmString: ${RDOConfirmString}`);	
			if (!RDOConfirmString.includes('• ')) {
				if (lang === "en") {
					RDOConfirmString += `• There are no channels in this server subscribed to RDO auto posts.\n`;
				}
				else if (lang === "es") {
				  RDOConfirmString += `• No hay canales en este servidor suscritos a publicaciones automáticas RDO.\n`;
				}
				else if (lang === "ru") {
				  RDOConfirmString += `• На этом сервере нет каналов, подписанных на автоматические посты RDO.\n`;
				}
				else if (lang === "de") {
				  RDOConfirmString += `• Es gibt keine Kanäle auf diesem Server, die RDO-Auto-Posts abonniert haben.\n`;
				}
				else if (lang === "pt") {
				  RDOConfirmString += `• Não há canais neste servidor inscritos para RDO auto posts.\n`;
				}
				else {
				  RDOConfirmString += `• There are no channels in this server subscribed to RDO auto posts.\n`;
				}
			}

			
			let ConfigureConfirmString = "";
			fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
			    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
			    else {
            //console.log(`data: ${data}`);
						let roleIDArray = [];
						interaction.guild.roles.cache.forEach(role => {
							if ((data.includes(`${role.id}`)) && (role.name != "@everyone") ) {
						    roleIDArray.push(`${role.id}`);
							}
						});
							//console.log(`roleIDArray[]: ${roleIDArray}`);
						
						if (data.includes(`guild:${interaction.guild.id} - admin:yes`)) { //FIXME - add language support
							if (lang === "en") {
								ConfigureConfirmString += `• Administrators\n`		
							}
							else if (lang === "es") {
								ConfigureConfirmString += `• Administradores\n`
							}
							else if (lang === "ru") {
								ConfigureConfirmString += `• Администраторы\n`
							}
							else if (lang === "de") {
								ConfigureConfirmString += `• Administratoren\n`
							}
							else if (lang === "pt") {
								ConfigureConfirmString += `• Administradores\n`
							}
							else {
								ConfigureConfirmString += `• Administrators\n`
							}							
								//console.log(`roleIDArray.length: ${roleIDArray.length}`)
							if (roleIDArray.length >= 1) {
								if (lang === "en") {
									ConfigureConfirmString += `• Anyone without the Administrator privilege will be unable to configure auto posts\n **even if they have a role listed below**\n`;		
								}
								else if (lang === "es") {
									ConfigureConfirmString += `• Cualquier persona sin el administrador de privilegios no podrá configurar publicaciones automáticas, \n**incluso si tiene un rol que se enumera a continuación**\n`;
								}
								else if (lang === "ru") {
									ConfigureConfirmString += `• Любой пользователь без прав администратора не сможет настроить автоматические публикации, \n**даже если у них есть роль, указанная ниже**\n`;
								}
								else if (lang === "de") {
									ConfigureConfirmString += `• Personen ohne Administratorrechte können keine automatischen Beiträge konfigurieren, \n**selbst wenn sie über eine der unten aufgeführten Rollen verfügen**\n`;
								}
								else if (lang === "pt") {
									ConfigureConfirmString += `• Qualquer pessoa sem o administrador de privilégios não poderá configurar postagens automáticas, \n**mesmo que tenha uma função listada abaixo**\n`;
								}
								else {
								    ConfigureConfirmString += `• Anyone without the Administrator privilege will be unable to configure auto posts\n **even if they have a role listed below**\n`;
								}								 
							}						
						}
            for (i = 0; i <= roleIDArray.length - 1; i++) {
							ConfigureConfirmString += `• <@&${roleIDArray[i]}>\n`;
							//console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
							//console.log(`ConfigureConfirmString at ${i}: ${ConfigureConfirmString}`);	
            }
        }
    //console.log(`ConfigureConfirmString: ${ConfigureConfirmString}`);	
    if (!ConfigureConfirmString.includes('• ')) {
			if (lang === "en") {
				ConfigureConfirmString += `• <@&${interaction.guild.id}> can configure auto posts.\n`;
			}
			else if (lang === "es") {
			  ConfigureConfirmString += `• <@&${interaction.guild.id}> el mundo puede configurar publicaciones automáticas.\n`;
			}
			else if (lang === "ru") {
			  ConfigureConfirmString += `• <@&${interaction.guild.id}> может настроить автоматические сообщения.\n`;
			}
			else if (lang === "de") {
			  ConfigureConfirmString += `• <@&${interaction.guild.id}> kann automatische Beiträge konfigurieren.\n`;
			}
			else if (lang === "pt") {
			  ConfigureConfirmString += `• <@&${interaction.guild.id}> podem configurar postagens automáticas.\n`;
			}
			else {
			  ConfigureConfirmString += `• <@&${interaction.guild.id}> can configure auto posts.\n`;
			}
    }	

		function confirmTitleString() {
			if (lang === "en") {
				return `Your Current Auto Post Channels:`;
			}
			else if (lang === "es") {
				return `Tus canales actuales de publicación automática:`;
			}
			else if (lang === "ru") {
				return `Текущие настройки автоматической публикации:`;
			}
			else if (lang === "de") {
				return `Ihre aktuellen Auto-Post-Kanäle:`;
			}
			else if (lang === "pt") {
				return `Seus canais de publicação automática atuais:`;
			}
			else {
			  return `Your Current Auto Post Channels:`;
			}			
		}

		function rolesAllowedTitleString() {
			if (lang === "en") {
					return `Roles Allowed to Configure Auto Posts:`;	
			}
			else if (lang === "es") {
				return `Roles permitidos para configurar publicaciones automáticas`;	
			}
			else if (lang === "ru") {
				return `Роли, которым разрешено настраивать автоматические публикации:`;	
			}
			else if (lang === "de") {
				return `Rollen, die automatische Beiträge konfigurieren dürfen:`;	
			}
			else if (lang === "pt") {
				return `Posições que têm permissão para configurar postagens automáticas:`;	
			}
			else {
				return `Roles Allowed to Configure Auto Posts`;	
			}			
		}

		function testGTAString() {
			if (lang === "en") {
					return `Click **\'Test GTA\'** to send a test post to your subscribed GTA Online channel(s).`;
			}
			else if (lang === "es") {
				return `Haga clic en **\'Prueba GTA\'** para enviar una publicación de prueba a sus canal(es) GTA Online suscritos.`;
			}
			else if (lang === "ru") {
				return `Щелчок **\'Тест GTA\'** для того, чтобы отправить тестовое сообщение на подписанные каналы GTA Online.`;
			}
			else if (lang === "de") {
				return `Klicken Sie auf **\'GTA testen'**, um einen Testbeitrag an Ihre abonnierten GTA-Kanäle zu senden.`;
			}
			else if (lang === "pt") {
				return `Clique em **\'Testar GTA\'** para enviar uma postagem de teste para seus canais GTA inscritos.`;
			}
			else {
			  return `Click **\'Test GTA\'** to send a test post to your subscribed GTA Online channel(s).`;
			}			
		}

		function testRDOString() {
			if (lang === "en") {
					return `Click **\'Test RDO\'** to send a test post to your subscribed Red Dead Online channel(s).`;
			}
			else if (lang === "es") {
				return `Haga clic en **\'Prueba RDO\'** para enviar una publicación de prueba a sus canal(es) Red Dead Online suscritos.`;
			}
			else if (lang === "ru") {
				return `Щелчок **\'Тест RDO\'** для того, чтобы отправить тестовое сообщение на подписанные каналы Red Dead Online.`;
			}
			else if (lang === "de") {
				return `Klicken Sie auf **\'RDO testen\'**, um einen Testbeitrag an Ihre abonnierten Red Dead Online-Kanäle zu senden.`;
			}
			else if (lang === "pt") {
				return `Clique em **\'Testar RDO\'** para enviar uma postagem de teste para seus canais Red Dead Online inscritos.`;
			}
			else {
			  return `Click **\'Test RDO\'** to send a test post to your subscribed Red Dead Online channel(s).`;
			}			
		}			

		function footerString() {
			if (lang === "en") {
					return `You must be an administrator or have a role listed above to test auto posts.`;
			}
			else if (lang === "es") {
				return `Debe ser administrador o tener un rol mencionado anteriormente para probar publicaciones automáticas.`;
			}
			else if (lang === "ru") {
				return `Для тестирования автоматических публикаций необходимо быть администратором или иметь роль, указанную выше.`;
			}
			else if (lang === "de") {
				return `Sie müssen Administrator sein oder über eine der oben aufgeführten Rollen verfügen, um automatische Beiträge testen zu können.`;
			}
			else if (lang === "pt") {
				return `Você deve ser um administrador ou ter uma função listada acima para testar postagens automáticas.`;
			}
			else {
				return `You must be an administrator or have a role listed above to test auto posts.`;
			}
		}

		function testGTAButtonString() {
			if (lang === "en") {
				return `Test GTA`;
			}
			else if (lang === "es") {
				return `Prueba GTA`;
			}
			else if (lang === "ru") {
				return `Тест GTA`;
			}
			else if (lang === "de") {
				return `GTA testen`;
			}
			else if (lang === "pt") {
				return `Testar GTA`;
			}
			else {
				return `Test GTA`;
			}			
		}

		function testRDOButtonString() {
			if (lang === "en") {
				return `Test RDO`;
			}
			else if (lang === "es") {
				return `Prueba RDO`;
			}
			else if (lang === "ru") {
				return `Тест RDO`;
			}
			else if (lang === "de") {
				return `RDO testen`;
			}
			else if (lang === "pt") {
				return `Testar RDO`;
			}
			else {
				return `Test RDO`;
			}			
		}	

		function backButtonString() {
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
			
			

		const confirmEmbed = new EmbedBuilder()
			.setColor(`Blue`) 
			.setTitle(`${confirmTitleString()}`)
			.setDescription(`
**GTA Online:**
${GTAConfirmString}
**Red Dead Online:**
${RDOConfirmString}
**${rolesAllowedTitleString()}**
${ConfigureConfirmString}
${testGTAString()}
${testRDOString()}`)	
			.setFooter({ text: `${footerString()}`, iconURL: process.env.logo_link });


		const confirmButtons = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtaTest - ${interaction.user.id}`)
			        .setLabel(`${testGTAButtonString()}`)
			        .setStyle(ButtonStyle.Success),	
			    new ButtonBuilder()
			        .setCustomId(`rdoTest - ${interaction.user.id}`)
			        .setLabel(`${testRDOButtonString()}`)
			        .setStyle(ButtonStyle.Danger),			
			    new ButtonBuilder()
			        .setCustomId(`confirmback - ${interaction.user.id}`)
			        .setLabel(`${backButtonString()}`)
			        .setStyle(ButtonStyle.Secondary),				
			);			

			function firstCommandString() {
					if (lang === "en") {
						return `It looks like this is your first time using this command. Please try the Confirm button again.`;
					}
					else if (lang === "es") {
						return `Parece que esta es la primera vez que usa este comando. Vuelva a intentarlo con el botón de confirmación.`; 
					}
					else if (lang === "ru") {
						return `Вы впервые используете эту команду. Попробуйте нажать кнопку подтверждения еще раз.`;
					}
					else if (lang === "de") {
						return `Dies ist das erste Mal, dass Sie diesen Befehl verwenden. Versuchen Sie erneut, die Bestätigungstaste zu drücken.`;
					}
					else if (lang === "pt") {
						return `Esta é a primeira vez que você usa este comando. Tente pressionar o botão de confirmação novamente.`;
					}
					else {
						return `It looks like this is your first time using this command. Please try the Confirm button again.`;
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

				await interaction.deferUpdate();
				if (AdminRequired() === undefined) {
					await interaction.followUp({ content: `${firstCommandString()}`, ephemeral: true });
				}	
				else if (interaction.user.id === buttonUserID) {
					await interaction.followUp({ embeds: [confirmEmbed], components: [confirmButtons] }).catch(err => {console.log(`confirmBackEmbed Error: ${err}`); process.kill(1);});	
				} 	
				else {
					await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
				}

	
	}); //end fs.readFile GTADataBase
	}); //end fs.readFile RDODataBase
	}) //end fs.readFile rolesDataBase		

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

	}}); //end fs.readFile LANGDataBase
	
		}); //end fs:readFile for guildID and Admin check
			
		} //end if interaction starts with startback - stopback - configureback

	},
}