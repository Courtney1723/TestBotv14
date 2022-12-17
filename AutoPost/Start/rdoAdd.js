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
		if ((interaction.customId.startsWith(`rdoStartMenu -`)) || (interaction.customId.startsWith(`rdoStartMenu2 -`)) ) {
			//console.log(`begin rdoStartMenu: '${interaction.customId}'`);		

			let startMenu2 = "";
			if (interaction.customId.startsWith(`rdoStartMenu2`)) {
				startMenu2 += "2";
			}	

		let menuUserID02 = (interaction.customId).split(`rdoStartMenu${startMenu2} - u:`);
		let menuUserID01 = menuUserID02[1].split(" -");
		let menuUserID = menuUserID01[0];
			//console.log(`rdoStartMenu menuUserID: ${menuUserID}`);
			//console.log(`rdoStartMenu interaction.user.id === menuUserID?: ${interaction.user.id === menuUserID}`)	

		let menuChannelID01 = (interaction.values).toString().split(`c:`);
		let menuChannelID = menuChannelID01[1];
				//console.log(`rdoStartMenu menuChannelID: ${menuChannelID}`)

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

					if (interaction.user.id != menuUserID) {
						interaction.reply({ content: `These options aren't for you!`, ephemeral: true });
					}
					else if (menuChannelID.includes(`undefinedchannel`)) { //interaction.values === `undefinedchannel` does not work?

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
					else { //add new channel to RDODataBase.txt

						const rdoConfirmEmbed = new EmbedBuilder()
								.setColor(`Green`) 
								.setTitle(`Success!`)
								.setDescription(`You will now get Red Dead Redemption II auto posts to the _____ channel \n**the first Tuesday of every month at 2:00 PM EST**.`)	

						const rdoConfirmEmbedEs = new EmbedBuilder()
								.setColor(`Green`) 
								.setTitle(`Éxito`)
								.setDescription(`Ahora recibirás publicaciones automáticas de Red Dead Redemption II en el canal <#${menuChannelID}> \n**el primer martes de cada mes a las 2:00 PM EST**.`)			

						const rdoConfirmEmbedRu = new EmbedBuilder()
								.setColor(`Green`) 
								.setTitle(`Успех`)
								.setDescription(`Теперь вы будете получать автоматические сообщения Red Dead Redemption II на <#${menuChannelID}> канале \n**в первый вторник каждого месяца в 14:00 EST**.`)		

						const rdoConfirmEmbedDe = new EmbedBuilder()
								.setColor(`Green`) 
								.setTitle(`Erfolg`)
								.setDescription(`Sie erhalten jetzt Red Dead Redemption II Auto-Posts auf dem <#${menuChannelID}>-Kanal \n**am ersten Dienstag eines jeden Monats um 14:00 Uhr EST**.`)	

						const rdoConfirmEmbedPt = new EmbedBuilder()
								.setColor(`Green`) 
								.setTitle(`Éxito`)
								.setDescription(`Agora você receberá postagens automáticas de Red Dead Redemption II no canal <#${menuChannelID}> \n**na primeira terça-feira de cada mês às 14:00 EST**.`)							
						
						await interaction.deferUpdate();
						if (interaction.user.id === menuUserID) {

							if (lang === "en") {
								await interaction.editReply({ embeds: [rdoConfirmEmbed], components: [] })
								.catch(err => console.log(`rdoConfirmEmbed Error: ${err}`));
							}
							else if (lang === "es") {
							  await interaction.editReply({ embeds: [rdoConfirmEmbedEs], components: [] })
								.catch(err => console.log(`rdoConfirmEmbed Error: ${err}`));
							}
							else if (lang === "ru") {
							  await interaction.editReply({ embeds: [rdoConfirmEmbedRu], components: [] })
								.catch(err => console.log(`rdoConfirmEmbed Error: ${err}`));
							}
							else if (lang === "de") {
							  await interaction.editReply({ embeds: [rdoConfirmEmbedDe], components: [] })
								.catch(err => console.log(`rdoConfirmEmbed Error: ${err}`));
							}
							else if (lang === "pt") {
							  await interaction.editReply({ embeds: [rdoConfirmEmbedPt], components: [] })
								.catch(err => console.log(`rdoConfirmEmbed Error: ${err}`));
							}
							else {
							  await interaction.editReply({ embeds: [rdoConfirmEmbed], components: [] })
								.catch(err => console.log(`rdoConfirmEmbed Error: ${err}`));
							}							

						//Appends the RDODataBase.txt file with guildID, Channel ID, and choice of rdo of rdo
						fs.appendFile(`./RDODataBase.txt`,`guild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:rdoStartMenu - \n`, err => {
							 if (err) {
								 console.error(err);
								 return
									 }		
							console.log(`A user added a channel for RDO auto posts.`);
						}); // end fs:appendFile to add a channel for rdo autop posts	
							
						} else {
							if (lang === "en") {
								await interaction.followUp({ content: `These buttons are not for you.`, ephemeral: true });
							}
							else if (lang === "es") {
								await interaction.followUp({ content: `Estas opciones no son para ti.`, ephemeral: true });
							}
							else if (lang === "ru") {
								await interaction.followUp({ content: `Эти варианты не для вас.`, ephemeral: true });
							}
							else if (lang === "de") {
								await interaction.followUp({ content: `Diese Optionen sind nichts für Sie.`, ephemeral: true });
							}
							else if (lang === "pt") {
								await interaction.followUp({ content: `Esses Opções não são para você.`, ephemeral: true });
							}
							else {
								await interaction.followUp({ content: `These buttons are not for you.`, ephemeral: true });
							}
						}
						
					} //end add new channel

				}}); //end fs.readFileLANGDataBase
		});//end fs:readFileRolesDataBase	
			
		setTimeout(() => {
			interaction.editReply({components: []})
		}, (60000 * 2))
			
		}// end if interaction.customId === 'rdoStartMenu'
		

	},
};




	