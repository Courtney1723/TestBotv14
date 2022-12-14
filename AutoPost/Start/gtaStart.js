const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
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

		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log

			if (!interaction.isButton()) {return};
			if (interaction.customId.includes(`gtastart - `)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("start - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin gtastart - ${interaction.customId}`);

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
			
			const gtaStartEmbed = new EmbedBuilder()
				.setColor(`Green`) 
				.setTitle(`Start auto posting GTAV Online bonuses & Discounts`)
				.setDescription(`Click **the dropdown menu** to confirm the channel you want to send Grand Theft Auto V auto posts to \n**every Thursday at 2:00 PM EST**.`)	
				.setFooter({ text: 'Auto posts can only be sent to text channels the bot has permission to \'Send Messages\' in.', iconURL: process.env.logo_link });

			const gtaStartEmbedEs = new EmbedBuilder()
				.setColor(`Green`) 
				.setTitle(`Comience a publicar autom??ticamente los bonos de GTAV Online`)
				.setDescription(`Clic **el men?? desplegable** para confirmar el canal al que desea enviar publicaciones autom??ticas de Grand Theft Auto V \n** todos los jueves a las 2:00 PM EST**.`)	
				.setFooter({ text: 'Las publicaciones autom??ticas solo se pueden enviar a canales de texto en los que el bot tiene permiso para \'Enviar mensajes\'.', iconURL: process.env.logo_link });	

			const gtaStartEmbedRu = new EmbedBuilder()
				.setColor(`Green`) 
				.setTitle(`???????????? ???????????????????????????? ???????????????????? GTAV ???????????? ????????????`)
				.setDescription(`???????????? **???????????????????????????? ????????** ?????? ?????????????????????????? ????????????, ???? ???????????? ???????????????????? ?????????????????? GTA Online ???? \n**???????????? ?????????????? ?? 14:00 EST**.`)	
				.setFooter({ text: '???????????????????????????? ?????????????????? ?????????? ???????? ???????????????????? ???????????? ???? ?????????????????? ????????????, ???? ?????????????? ?????? ?????????? ???????????????????? \'?????????????????? ??????????????????\'.', iconURL: process.env.logo_link });		

			const gtaStartEmbedDe = new EmbedBuilder()
				.setColor(`Green`) 
				.setTitle(`Starten Sie die automatischen Beitr??ge von GTA Online-Boni`)
				.setDescription(`Klicken **Das Dropdown-Men??** um den Kanal zu best??tigen, an den Sie GTA Online automatische Beitr??ge senden m??chten \n**jeden Donnerstag um 14:00 Uhr EST**.`)
				.setFooter({ text: 'Automatische Beitr??ge k??nnen nur an Textkan??le gesendet werden, in denen der Bot die Berechtigung zum Senden von Nachrichten hat.', iconURL: process.env.logo_link });	

			const gtaStartEmbedPt = new EmbedBuilder()
				.setColor(`Green`) 
				.setTitle(`Comece a postar automaticamente b??nus GTA Online`)
				.setDescription(`Clique **o menu suspenso** para confirmar o canal que voc?? deseja enviar Grand Theft Auto V auto posts para \n**todas as quintas-feiras ??s 14:00 EST**.`)	
				.setFooter({ text: 'Auto posts s?? pode ser enviado para canais de texto o bot tem permiss??o para \'Enviar mensagens\' em.', iconURL: process.env.logo_link });	

		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log					

			let gtaChannelCount = 0;
				interaction.guild.channels.cache.forEach(channel => {
					if ( ((channel.type === 0) || (channel.type === 5)) && (!data.includes(channel.id)) && (channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages)) && (channel.permissionsFor(interaction.user.id).has(PermissionsBitField.Flags.ViewChannel)) ) { 
						gtaChannelCount += 1;
					}
				})
			var gtaChannelNames = new Array(gtaChannelCount);
			var gtaChannelIDs = new Array(gtaChannelCount);
			var gtaChannelTypes = new Array(gtaChannelCount);
			interaction.guild.channels.cache.forEach(channel => { 
				if ( ((channel.type === 0) || (channel.type === 5)) && (!data.includes(channel.id)) && (channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages)) && (channel.permissionsFor(interaction.user.id).has(PermissionsBitField.Flags.ViewChannel)) ) { 
					gtaChannelNames.splice((channel.rawPosition), 1, channel.name);   //gtaChannelNames.push(channel.name); 
					gtaChannelIDs.splice((channel.rawPosition), 1, channel.id); 	//gtaChannelIDs.push(channel.id);
					gtaChannelTypes.splice((channel.rawPosition), 1, channel.type);	//gtaChannelTypes.push(channel.type);
				}
			});
			//console.log(`gtaChannelCount: ${gtaChannelCount}`)
			//console.log(`gtaChannelNames[23]: ${gtaChannelNames[23]}`)

			let gtaStartMenu = new ActionRowBuilder()
			    .addComponents(
			        new StringSelectMenuBuilder()
			        .setCustomId(`gtaStartMenu - u:${interaction.user.id} - c:undefinedchannel`)
			        .setPlaceholder('Select a Channel')
			        .addOptions([{
			            label: `No Channel Selected`,
			            description: 'No Channel Selected',
			            value: `gtaStartMenu - u:${interaction.user.id} - c:undefinedchannel`,
			        }])
			    )
				for (i = 0; i <= 23; i++) {
			    if ( (gtaChannelNames[i] != undefined) ) {
						//console.log(`gtaChannelNames at ${i}: ${gtaChannelNames[i]}`);
			        gtaStartMenu.components[0].addOptions([{
			            label: `${gtaChannelNames[i]}`,
			            description: `${gtaChannelNames[i]}`,
			            value: `gtaStartMenu2 - u:${interaction.user.id} - c:${gtaChannelIDs[i]}`,
			        }]);
			    }
				}

			const backButton = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`rdostartback - ${interaction.user.id}`)
			        .setLabel('Go Back')
			        .setStyle(ButtonStyle.Secondary),	
				);
			const backButtonEs = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`rdostartback - ${interaction.user.id}`)
			        .setLabel('Volver')
			        .setStyle(ButtonStyle.Secondary),	
				);
			const backButtonRu = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`rdostartback - ${interaction.user.id}`)
			        .setLabel('??????????????????')
			        .setStyle(ButtonStyle.Secondary),	
				);
			const backButtonDe = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`rdostartback - ${interaction.user.id}`)
			        .setLabel('Zur??ck')
			        .setStyle(ButtonStyle.Secondary),	
				);
			const backButtonPt = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`rdostartback - ${interaction.user.id}`)
			        .setLabel('Voltar')
			        .setStyle(ButtonStyle.Secondary),	
				);
				
			let gtaStartMenu2 = new ActionRowBuilder()
			    .addComponents(
			        new StringSelectMenuBuilder()
			        .setCustomId(`gtaStartMenu2 - u:${interaction.user.id} - c:undefinedchannel`)
			        .setPlaceholder('Select a Channel')
			        .addOptions([{
			            label: `No Channel Selected`,
			            description: 'No Channel Selected',
			            value: `gtaStartMenu - u:${interaction.user.id} - c:undefinedchannel`,
			        }])
			    )	
			if (gtaChannelCount >= 24) {	
				
				for (i = 24; i <= 47; i++) {
			    if ( (gtaChannelNames[i] != undefined) ) {
						//console.log(`gtaChannelNames at ${i}: ${gtaChannelNames[i]}`);
			        gtaStartMenu2.components[0].addOptions([{
			            label: `${gtaChannelNames[i]}`,
			            description: `${gtaChannelNames[i]}`,
			            value: `gtaStartMenu2 - u:${interaction.user.id} - c:${gtaChannelIDs[i]}`,
			        }]);
			    }
				}

				if (interaction.user.id === buttonUserID) { 
		      if (lang === "en") {
						await interaction.editReply({ embeds: [gtaStartEmbed], components: [gtaStartMenu, gtaStartMenu2, backButton] })
		        .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
					}
					else if (lang === "es") {
					  await interaction.editReply({ embeds: [gtaStartEmbedEs], components: [gtaStartMenu, gtaStartMenu2, backButtonEs] })
		        .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
					}
					else if (lang === "ru") {
					  await interaction.editReply({ embeds: [gtaStartEmbedRu], components: [gtaStartMenu, gtaStartMenu2, backButtonRu] })
		        .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
					}
					else if (lang === "de") {
					  await interaction.editReply({ embeds: [gtaStartEmbedDe], components: [gtaStartMenu, gtaStartMenu2, backButtonDe] })
		        .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
					}
					else if (lang === "pt") {
					  await interaction.editReply({ embeds: [gtaStartEmbedPt], components: [gtaStartMenu, gtaStartMenu2, backButtonPt] })
		        .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
					}
					else {
					  await interaction.editReply({ embeds: [gtaStartEmbed], components: [gtaStartMenu, gtaStartMenu2, backButton] })
		        .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`)); 
					}
		    } else {
			    if (lang === "en") {
						await interaction.followUp({ content: `These buttons are not for you.`, ephemeral: true });	
					}
					else if (lang === "es") {
					  await interaction.followUp({ content: `Estos botones no son para ti.`, ephemeral: true });
					}
					else if (lang === "ru") {
					  await interaction.followUp({ content: `?????? ???????????? ???? ?????? ??????.`, ephemeral: true });
					}
					else if (lang === "de") {
					  await interaction.followUp({ content: `Diese Schaltfl??chen sind nicht f??r Sie.`, ephemeral: true });
					}
					else if (lang === "pt") {
					  await interaction.followUp({ content: `Esses bot??es n??o s??o para voc??.`, ephemeral: true });
					}
					else {
					  await interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
					}
				}				
				
			} //end if gtaChannelCount >24
			else if (gtaChannelCount <= 23) { //if there are 23 channels or fewer
				

		if (interaction.user.id === buttonUserID) { 
			if (lang === "en") {
				await interaction.editReply({ embeds: [gtaStartEmbed], components: [gtaStartMenu, gtaStartMenu2, backButton] })
				.catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
			}
			else if (lang === "es") {
				await interaction.editReply({ embeds: [gtaStartEmbedEs], components: [gtaStartMenu, gtaStartMenu2, backButtonEs] })
				.catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
			}
			else if (lang === "ru") {
				await interaction.editReply({ embeds: [gtaStartEmbedRu], components: [gtaStartMenu, gtaStartMenu2, backButtonRu] })
				.catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
			}
			else if (lang === "de") {
				await interaction.editReply({ embeds: [gtaStartEmbedDe], components: [gtaStartMenu, gtaStartMenu2, backButtonDe] })
				.catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
			}
			else if (lang === "pt") {
				await interaction.editReply({ embeds: [gtaStartEmbedPt], components: [gtaStartMenu, gtaStartMenu2, backButtonPt] })
				.catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
			}
			else {
				await interaction.editReply({ embeds: [gtaStartEmbed], components: [gtaStartMenu, gtaStartMenu2, backButton] })
				.catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`)); 
			}
    } else {
			if (lang === "en") {
				await interaction.followUp({ content: `These buttons are not for you.`, ephemeral: true });	
			}
			else if (lang === "es") {
				await interaction.followUp({ content: `Estos botones no son para ti.`, ephemeral: true });
			}
			else if (lang === "ru") {
				await interaction.followUp({ content: `?????? ???????????? ???? ?????? ??????.`, ephemeral: true });
			}
			else if (lang === "de") {
				await interaction.followUp({ content: `Diese Schaltfl??chen sind nicht f??r Sie.`, ephemeral: true });
			}
			else if (lang === "pt") {
				await interaction.followUp({ content: `Esses bot??es n??o s??o para voc??.`, ephemeral: true });
			}
			else {
				await interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
			}
    }
				
		} //end if there are fewer than 23 channels

				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 5))		

					}); //end fs.readFile for GTADataBase.txt
					}}); //end fs.readfile LANGDataBase
		
		} // end if gtastart button
		
		}); //end fs:readFile

		
	},
};




	