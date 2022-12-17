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
		if (interaction.customId.startsWith(`gtaStopMenu -`)) {
			//console.log(`begin gtaStopMenu: '${interaction.customId}'`);		

		let menuUserID02 = (interaction.customId).split("gtaStopMenu - u:");
		let menuUserID01 = menuUserID02[1].split(" - ");
		let menuUserID = menuUserID01[0];
			//console.log(`gtaStopMenu menuUserID: ${menuUserID}`);
			//console.log(`gtaStopMenu interaction.user.id === menuUserID?: ${interaction.user.id === menuUserID}`)	

		let menuChannelID01 = (interaction.values).toString().split(`c:`);
		let menuChannelID = menuChannelID01[1];
				//console.log(`gtaStopMenu menuChannelID: ${menuChannelID}`)

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

				const gtaDuplicateEmbed = new EmbedBuilder()
						.setColor(`Orange`) 
						.setTitle(`Please Try Again`)
						.setDescription(`You selected an invalid response "No Channel Selected".\nPlease Try again. || (◕ᴥ◕ʋ) ||`)	
				
				await interaction.deferUpdate();
				if (interaction.user.id === menuUserID) {
						await interaction.followUp({ embeds: [gtaDuplicateEmbed], components: [], ephemeral: true })
						.catch(err => console.log(`gtaDuplicateEmbed Error: ${err}`));
				} else {
						interaction.followUp({ content: `These options aren't for you!`, ephemeral: true });
				}
				
			} 
			else { //remove a channel from GTADataBase.txt

				const gtaConfirmEmbed = new EmbedBuilder()
						.setColor(`Green`) 
						.setTitle(`Success`)
						.setDescription(`You will now no longer get GTA auto posts in the <#${menuChannelID}> channel.`)

				const gtaConfirmEmbedEs = new EmbedBuilder()
						.setColor(`Green`) 
						.setTitle(`Éxito`)
						.setDescription(`Ahora ya no obtendrá publicaciones automáticas de GTA en el canal <#${menuChannelID}>.`)		

				const gtaConfirmEmbedRu = new EmbedBuilder()
						.setColor(`Green`) 
						.setTitle(`Успех`)
						.setDescription(`Теперь вы больше не будете получать автоматические сообщения GTA в канале <#${menuChannelID}>.`)		

				const gtaConfirmEmbedDe = new EmbedBuilder()
						.setColor(`Green`) 
						.setTitle(`Erfolg`)
						.setDescription(`Sie erhalten jetzt keine automatischen GTA-Beiträge mehr im <#${menuChannelID}>-Kanal.`)		

				const gtaConfirmEmbedPt = new EmbedBuilder()
						.setColor(`Green`) 
						.setTitle(`Éxito`)
						.setDescription(`Agora você não receberá mais postagens automáticas do GTA no canal <#${menuChannelID}>.`)				
				
				await interaction.deferUpdate();
				if (interaction.user.id === menuUserID) { //begin removing an gta channel

						fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
							if (err) {console.log(`Error: ${err}`)} //If an error, console.log

								// console.log(`interaction.guild.id: ${interaction.guild.id}`)
								// console.log(`menuChannelID: ${menuChannelID}`)
								// console.log(`data.replace: ${data.replace(`\nguild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:gtaStartMenu - `, "")}`);
								fs.writeFile('./GTADataBase.txt', `${data.replace(`\nguild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:gtaStartMenu - `, "")}`, async function (err) {
										if (err) {
											throw err;
										}
										else {
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
											if (lang === "en") {
												await interaction.editReply({ embeds: [gtaConfirmEmbed], components: [] })
												.catch(err => console.log(`gtaConfirmEmbed Error: ${err}`));	
											}
											else if (lang === "es") {
												await interaction.editReply({ embeds: [gtaConfirmEmbedEs], components: [] })
												.catch(err => console.log(`gtaConfirmEmbed Error: ${err}`));
											}
											else if (lang === "ru") {
												await interaction.editReply({ embeds: [gtaConfirmEmbedRu], components: [] })
												.catch(err => console.log(`gtaConfirmEmbed Error: ${err}`));
											}
											else if (lang === "de") {
												await interaction.editReply({ embeds: [gtaConfirmEmbedDe], components: [] })
												.catch(err => console.log(`gtaConfirmEmbed Error: ${err}`));
											}
											else if (lang === "pt") {
												await interaction.editReply({ embeds: [gtaConfirmEmbedPt], components: [] })
												.catch(err => console.log(`gtaConfirmEmbed Error: ${err}`));
											}
											else {
											  await interaction.editReply({ embeds: [gtaConfirmEmbed], components: [] })
												.catch(err => console.log(`gtaConfirmEmbed Error: ${err}`));  
											}											

											if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
												console.log('You unsubscribed from GTA auto posts.');	
											}
											else {
												console.log('A user unsubscribed from GTA auto posts.');	
											}										
										}
											
									}); //end fs:writeFile to remove channel from autoposts
								}}); //end fs.readFile for LANGDataBase.txt
							}); //end fs:readFile GTADataBase.txt
						
					} else {
						if (lang === "en") {
							interaction.followUp({ content: `These options aren't for you.`, ephemeral: true });		
						}
						else if (lang === "es") {
							interaction.followUp({ content: `Estas opciones no son para ti.`, ephemeral: true });
						}
						else if (lang === "ru") {
							interaction.followUp({ content: `Эти варианты не для вас.`, ephemeral: true });
						}
						else if (lang === "de") {
							interaction.followUp({ content: `Diese Optionen sind nichts für Sie.`, ephemeral: true });
						}
						else if (lang === "pt") {
							interaction.followUp({ content: `Essas opções não são para você.`, ephemeral: true });
						}
						else {
							interaction.followUp({ content: `These options are not for you.`, ephemeral: true });
						}	
					}

				} //end remove channel

		});//end fs:readFile	

		setTimeout(() => {
			interaction.editReply({components: []})
		}, (60000 * 2))			
			
		}// end if interaction.customId === 'gtaStopMenu'
		

	},
};




	