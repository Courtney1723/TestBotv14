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
		if (interaction.customId.startsWith(`confirm - `)) {
			//console.log(`begin start: '${interaction.customId}'`);		

		let buttonUserID01 = (interaction.customId).split("confirm - ");
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
							GTAConfirmString += `??? <#${channelIDArray[i]}>\n`;
							//console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
							//console.log(`GTAConfirmString at ${i}: ${GTAConfirmString}`);	
						} 
					}
				}
			//console.log(`GTAConfirmString: ${GTAConfirmString}`);	
			if (!GTAConfirmString.includes('??? ')) {
				if (lang === "en") {
					GTAConfirmString += `??? There are no channels in this server subscribed to GTA Online auto posts.\n`;
				}
				else if (lang === "es") {
				  GTAConfirmString += `??? No hay canales en este servidor suscritos a publicaciones autom??ticas GTA Online.\n`;
				}
				else if (lang === "ru") {
				  GTAConfirmString += `??? ???? ???????? ?????????????? ?????? ??????????????, ?????????????????????? ???? ???????????????????????????? ?????????? GTA Online.\n`;
				}
				else if (lang === "de") {
				  GTAConfirmString += `??? Es gibt keine Kan??le auf diesem Server, die GTA Online-Auto-Posts abonniert haben.\n`;
				}
				else if (lang === "pt") {
				  GTAConfirmString += `??? N??o h?? canais neste servidor inscritos para GTA Online auto posts.\n`;
				}
				else {
				  GTAConfirmString += `??? There are no channels in this server subscribed to GTA Online auto posts.\n`;
				}
			}
		
		let RDOConfirmString = "";
		fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
			else {
					//console.log(`data: ${data}`);
					for (i = 0; i <= channelIDArray.length - 1; i++) {
						if (data.includes(`${channelIDArray[i]}`)) { //If the GTADataBase.txt contains a channel in the interaction guild
							RDOConfirmString += `??? <#${channelIDArray[i]}>\n`;
							//console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
							//console.log(`RDOConfirmString at ${i}: ${RDOConfirmString}`);	
						} 
					}
				}
			//console.log(`RDOConfirmString: ${RDOConfirmString}`);	
			if (!RDOConfirmString.includes('??? ')) {
				if (lang === "en") {
					GTAConfirmString += `??? There are no channels in this server subscribed to RDO auto posts.\n`;
				}
				else if (lang === "es") {
				  GTAConfirmString += `??? No hay canales en este servidor suscritos a publicaciones autom??ticas RDO.\n`;
				}
				else if (lang === "ru") {
				  GTAConfirmString += `??? ???? ???????? ?????????????? ?????? ??????????????, ?????????????????????? ???? ???????????????????????????? ?????????? RDO.\n`;
				}
				else if (lang === "de") {
				  GTAConfirmString += `??? Es gibt keine Kan??le auf diesem Server, die RDO-Auto-Posts abonniert haben.\n`;
				}
				else if (lang === "pt") {
				  GTAConfirmString += `??? N??o h?? canais neste servidor inscritos para RDO auto posts.\n`;
				}
				else {
				  GTAConfirmString += `??? There are no channels in this server subscribed to RDO auto posts.\n`;
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
								ConfigureConfirmString += `??? Administrators\n`		
							}
							else if (lang === "es") {
								ConfigureConfirmString += `??? Administradores\n`
							}
							else if (lang === "ru") {
								ConfigureConfirmString += `??? ????????????????????????????\n`
							}
							else if (lang === "de") {
								ConfigureConfirmString += `??? Administratoren\n`
							}
							else if (lang === "pt") {
								ConfigureConfirmString += `??? Administradores\n`
							}
							else {
								ConfigureConfirmString += `??? Administrators\n`
							}							
								//console.log(`roleIDArray.length: ${roleIDArray.length}`)
							if (roleIDArray.length >= 1) {
								if (lang === "en") {
									ConfigureConfirmString += `??? Anyone without the Administrator privilege will be unable to configure auto posts\n **even if they have a role listed below**\n`;		
								}
								else if (lang === "es") {
									ConfigureConfirmString += `??? Cualquier persona sin el administrador de privilegios no podr?? configurar publicaciones autom??ticas, \n**incluso si tiene un rol que se enumera a continuaci??n**\n`;
								}
								else if (lang === "ru") {
									ConfigureConfirmString += `??? ?????????? ???????????????????????? ?????? ???????? ???????????????????????????? ???? ???????????? ?????????????????? ???????????????????????????? ????????????????????, \n**???????? ???????? ?? ?????? ???????? ????????, ?????????????????? ????????**\n`;
								}
								else if (lang === "de") {
									ConfigureConfirmString += `??? Personen ohne Administratorrechte k??nnen keine automatischen Beitr??ge konfigurieren, \n**selbst wenn sie ??ber eine der unten aufgef??hrten Rollen verf??gen**\n`;
								}
								else if (lang === "pt") {
									ConfigureConfirmString += `??? Qualquer pessoa sem o administrador de privil??gios n??o poder?? configurar postagens autom??ticas, \n**mesmo que tenha uma fun????o listada abaixo**\n`;
								}
								else {
								    ConfigureConfirmString += `??? Anyone without the Administrator privilege will be unable to configure auto posts\n **even if they have a role listed below**\n`;
								}								 
							}						
						}
            for (i = 0; i <= roleIDArray.length - 1; i++) {
							ConfigureConfirmString += `??? <@&${roleIDArray[i]}>\n`;
							//console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
							//console.log(`ConfigureConfirmString at ${i}: ${ConfigureConfirmString}`);	
            }
        }
    //console.log(`ConfigureConfirmString: ${ConfigureConfirmString}`);	
    if (!ConfigureConfirmString.includes('??? ')) {
			if (lang === "en") {
				ConfigureConfirmString += `??? <@&${interaction.guild.id}> can configure auto posts.\n`;
			}
			else if (lang === "es") {
			  ConfigureConfirmString += `??? <@&${interaction.guild.id}> el mundo puede configurar publicaciones autom??ticas.\n`;
			}
			else if (lang === "ru") {
			  ConfigureConfirmString += `??? <@&${interaction.guild.id}> ?????????? ?????????????????? ???????????????????????????? ??????????????????.\n`;
			}
			else if (lang === "de") {
			  ConfigureConfirmString += `??? <@&${interaction.guild.id}> kann automatische Beitr??ge konfigurieren.\n`;
			}
			else if (lang === "pt") {
			  ConfigureConfirmString += `??? <@&${interaction.guild.id}> podem configurar postagens autom??ticas.\n`;
			}
			else {
			  ConfigureConfirmString += `??? <@&${interaction.guild.id}> can configure auto posts.\n`;
			}
    }	

		function confirmTitleString() {
			if (lang === "en") {
				return `Your Current Auto Post Channels:`;
			}
			else if (lang === "es") {
				return `Tus canales actuales de publicaci??n autom??tica:`;
			}
			else if (lang === "ru") {
				return `?????????????? ?????????????????? ???????????????????????????? ????????????????????:`;
			}
			else if (lang === "de") {
				return `Ihre aktuellen Auto-Post-Kan??le:`;
			}
			else if (lang === "pt") {
				return `Seus canais de publica????o autom??tica atuais:`;
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
				return `Roles permitidos para configurar publicaciones autom??ticas`;	
			}
			else if (lang === "ru") {
				return `????????, ?????????????? ?????????????????? ?????????????????????? ???????????????????????????? ????????????????????:`;	
			}
			else if (lang === "de") {
				return `Rollen, die automatische Beitr??ge konfigurieren d??rfen:`;	
			}
			else if (lang === "pt") {
				return `Posi????es que t??m permiss??o para configurar postagens autom??ticas:`;	
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
				return `Clic **\'Prueba GTA\'** para enviar una publicaci??n de prueba a sus canal(es) GTA Online suscritos.`;
			}
			else if (lang === "ru") {
				return `???????????? **\'???????? GTA\'** ?????? ????????, ?????????? ?????????????????? ???????????????? ?????????????????? ???? ?????????????????????? ???????????? GTA Online.`;
			}
			else if (lang === "de") {
				return `Klicken Sie auf **\'GTA testen'**, um einen Testbeitrag an Ihre abonnierten GTA-Kan??le zu senden.`;
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
					return `Click **\'Test RDO\'** to send a test post to your subscribed GTA Online channel(s).`;
			}
			else if (lang === "es") {
				return `Clic **\'Prueba RDO\'** para enviar una publicaci??n de prueba a sus canal(es) RDO suscritos.`;
			}
			else if (lang === "ru") {
				return `???????????? **\'???????? RDO\'** ?????? ????????, ?????????? ?????????????????? ???????????????? ?????????????????? ???? ?????????????????????? ???????????? RDO.`;
			}
			else if (lang === "de") {
				return `Klicken Sie auf **\'RDO testen\'**, um einen Testbeitrag an Ihre abonnierten RDO-Kan??le zu senden.`;
			}
			else if (lang === "pt") {
				return `Clique em **\'Testar RDO\'** para enviar uma postagem de teste para seus canais RDO inscritos.`;
			}
			else {
			  return `Click **\'Test RDO\'** to send a test post to your subscribed GTA Online channel(s).`;
			}			
		}			

		function footerString() {
			if (lang === "en") {
					return `You must be an administrator or have a role listed above to test auto posts.`;
			}
			else if (lang === "es") {
				return `Debe ser administrador o tener un rol mencionado anteriormente para probar publicaciones autom??ticas.`;
			}
			else if (lang === "ru") {
				return `?????? ???????????????????????? ???????????????????????????? ???????????????????? ???????????????????? ???????? ?????????????????????????????? ?????? ?????????? ????????, ?????????????????? ????????.`;
			}
			else if (lang === "de") {
				return `Sie m??ssen Administrator sein oder ??ber eine der oben aufgef??hrten Rollen verf??gen, um automatische Beitr??ge testen zu k??nnen.`;
			}
			else if (lang === "pt") {
				return `Voc?? deve ser um administrador ou ter uma fun????o listada acima para testar postagens autom??ticas.`;
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
				return `???????? GTA`;
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
				return `???????? RDO`;
			}
			else if (lang === "de") {
				return `RDO testen`;
			}
			else if (lang === "pt") {
				return `Testar RDO`;
			}
			else {
				return `Test GTA`;
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
						return `Parece que esta es la primera vez que usa este comando. Vuelva a intentarlo con el bot??n de confirmaci??n.`; 
					}
					else if (lang === "ru") {
						return `???? ?????????????? ?????????????????????? ?????? ??????????????. ???????????????????? ???????????? ???????????? ?????????????????????????? ?????? ??????.`;
					}
					else if (lang === "de") {
						return `Dies ist das erste Mal, dass Sie diesen Befehl verwenden. Versuchen Sie erneut, die Best??tigungstaste zu dr??cken.`;
					}
					else if (lang === "pt") {
						return `Esta ?? a primeira vez que voc?? usa este comando. Tente pressionar o bot??o de confirma????o novamente.`;
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

				await interaction.deferUpdate();
				if (AdminRequired() === undefined) {
					await interaction.followUp({ content: `${firstCommandString()}`, ephemeral: true });
				}	
				else if (interaction.user.id === buttonUserID) {
					await interaction.editReply({ embeds: [confirmEmbed], components: [confirmButtons] }).catch(err => console.log(`confirmEmbed Error: ${err}`));						
				} 	
				else {
					await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
				}

	
	}); //end fs.readFile GTADataBase
	}); //end fs.readFile RDODataBase
	}) //end fs.readFile rolesDataBase			

	}}); //end fs.readFile LANGDataBase
	
		}); //end fs:readFile for guildID and Admin check

				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 5))				
		
		} //end if start
	},
};




	