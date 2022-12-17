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

		fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log

			if (!interaction.isButton()) {return};
			if (interaction.customId.includes(`rdostart - `)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("start - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin rdostart - ${interaction.customId}`);
			
			const rdoStartEmbed = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`Start Auto Posting RDR2 Online Bonuses & Discounts`)
			.setDescription(`Click **the dropdown menu** to confirm the channel you want to send Red Dead Redemption II Auto Posts to \n**the first Tuesday of every month at 2:00 PM EST**.`)	
			.setFooter({ text: 'Auto posts can only be sent to text channels the bot has permission to \'Send Messages\' in.', iconURL: process.env.logo_link });

			const rdoStartEmbedEs = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`Comience a publicar automáticamente bonos y descuentos de RDRO`)
			.setDescription(`Clic **El menú desplegable** para confirmar el canal al que desea enviar publicaciones automáticas de RDO \n**el primer martes de cada mes a las 2:00 PM EST**.`)	
			.setFooter({ text: 'Las publicaciones automáticas solo se pueden enviar a canales de texto en los que el bot tiene permiso para \'Enviar mensajes\'.', iconURL: process.env.logo_link });	

			const rdoStartEmbedRu = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`Начните автоматическую публикацию бонусов и скидок RDO`)
			.setDescription(`Щелчок **раскрывающееся меню** для подтверждения канала вы хотите отправлять автоматические сообщения RDO на \n**в первый вторник каждого месяца в 14:00 EST**.`)	
			.setFooter({ text: 'Автоматические сообщения могут быть отправлены только на текстовые каналы, на которые бот имеет разрешение \'Отправить сообщения\'.', iconURL: process.env.logo_link });	

			const rdoStartEmbedDe = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`Starten Sie die automatische Buchung von RDO-Boni und Rabatten`)
			.setDescription(`Klicken **Das Dropdown-Menü** um den Kanal zu bestätigen, an den Sie automatische RDO-Beiträge senden möchten \n** am ersten Dienstag eines jeden Monats um 14:00 Uhr EST**.`)	
			.setFooter({ text: 'Automatische Beiträge können nur an Textkanäle gesendet werden, in denen der Bot die Berechtigung zum Senden von Nachrichten hat.', iconURL: process.env.logo_link });		
				
			const rdoStartEmbedPt = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`Comece a Publicar Automaticamente Bônus e Descontos Online RDR2`)
			.setDescription(`Clique **o menu suspenso** para confirmar o canal que você deseja enviar Red Dead Redemption II Auto Posts para \n**a primeira terça-feira de cada mês às 14:00 EST**.`)	
			.setFooter({ text: 'Auto posts só pode ser enviado para canais de texto o bot tem permissão para \'Enviar mensagens\' em.', iconURL: process.env.logo_link });

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
				

			let rdoChannelCount = 0;
				interaction.guild.channels.cache.forEach(channel => {
					if ( ((channel.type === 0) || (channel.type === 5)) && (!data.includes(channel.id)) && (channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages)) ) { 
						rdoChannelCount += 1;
					}
				})
			var rdoChannelNames = new Array(rdoChannelCount);
			var rdoChannelIDs = new Array(rdoChannelCount);
			var rdoChannelTypes = new Array(rdoChannelCount);
			interaction.guild.channels.cache.forEach(channel => {
				if ( ((channel.type === 0) || (channel.type === 5)) && (!data.includes(channel.id)) && (channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages)) ) { 
					rdoChannelNames.splice((channel.rawPosition), 1, channel.name);   //rdoChannelNames.push(channel.name); 
					rdoChannelIDs.splice((channel.rawPosition), 1, channel.id); 	//rdoChannelIDs.push(channel.id);
					rdoChannelTypes.splice((channel.rawPosition), 1, channel.type);	//rdoChannelTypes.push(channel.type);
				}
			});
			//console.log(`rdoChannelCount: ${rdoChannelCount}`)
			//console.log(`rdoChannelNames[23]: ${rdoChannelNames[23]}`)

			let rdoStartMenu = new ActionRowBuilder()
			    .addComponents(
			        new StringSelectMenuBuilder()
			        .setCustomId(`rdoStartMenu - u:${interaction.user.id} - c:undefinedchannel`)
			        .setPlaceholder('Select a Channel')
			        .addOptions([{
			            label: `No Channel Selected`,
			            description: 'No Channel Selected',
			            value: `rdoStartMenu - u:${interaction.user.id} - c:undefinedchannel`,
			        }])
			    )
				for (i = 0; i <= 23; i++) {
			    if ( (rdoChannelNames[i] != undefined) ) {
						//console.log(`rdoChannelNames at ${i}: ${rdoChannelNames[i]}`);
			        rdoStartMenu.components[0].addOptions([{
			            label: `${rdoChannelNames[i]}`,
			            description: `${rdoChannelNames[i]}`,
			            value: `rdoStartMenu2 - u:${interaction.user.id} - c:${rdoChannelIDs[i]}`,
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
			        .setLabel('Вернуться')
			        .setStyle(ButtonStyle.Secondary),	
				);
			const backButtonDe = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`rdostartback - ${interaction.user.id}`)
			        .setLabel('Zurück')
			        .setStyle(ButtonStyle.Secondary),	
				);
			const backButtonPt = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`rdostartback - ${interaction.user.id}`)
			        .setLabel('Voltar')
			        .setStyle(ButtonStyle.Secondary),	
				);
				
			let rdoStartMenu2 = new ActionRowBuilder()
			    .addComponents(
			        new StringSelectMenuBuilder()
			        .setCustomId(`rdoStartMenu2 - u:${interaction.user.id} - c:undefinedchannel`)
			        .setPlaceholder('Select a Channel')
			        .addOptions([{
			            label: `No Channel Selected`,
			            description: 'No Channel Selected',
			            value: `rdoStartMenu - u:${interaction.user.id} - c:undefinedchannel`,
			        }])
			    )	

		if (rdoChannelCount <= 23) { //if there are 23 channels or fewer
				

		if (interaction.user.id === buttonUserID) { 
        await interaction.editReply({ embeds: [rdoStartEmbed], components: [rdoStartMenu, backButton] })
        .catch(err => console.log(`rdoStartEmbed+Menu Error: ${err.stack}`));
    } else {
       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
    }
				
		} //end if there are fewer than 23 channels
			else if (rdoChannelCount >= 24) {	
				
				for (i = 24; i <= 47; i++) {
			    if ( (rdoChannelNames[i] != undefined) ) {
						//console.log(`rdoChannelNames at ${i}: ${rdoChannelNames[i]}`);
			        rdoStartMenu2.components[0].addOptions([{
			            label: `${rdoChannelNames[i]}`,
			            description: `${rdoChannelNames[i]}`,
			            value: `rdoStartMenu2 - u:${interaction.user.id} - c:${rdoChannelIDs[i]}`,
			        }]);
			    }
				}

				if (interaction.user.id === buttonUserID) { 
					if (lang === "en") {
						await interaction.editReply({ embeds: [rdoStartEmbed], components: [rdoStartMenu, rdoStartMenu2, backButton] })
		        .catch(err => console.log(`rdoStartEmbed+Menu Error: ${err.stack}`));
					}
					else if (lang === "es") {
					  await interaction.editReply({ embeds: [rdoStartEmbedEs], components: [rdoStartMenu, rdoStartMenu2, backButtonEs] })
		        .catch(err => console.log(`rdoStartEmbed+Menu Error: ${err.stack}`));
					}
					else if (lang === "ru") {
					  await interaction.editReply({ embeds: [rdoStartEmbedRu], components: [rdoStartMenu, rdoStartMenu2, backButtonRu] })
		        .catch(err => console.log(`rdoStartEmbed+Menu Error: ${err.stack}`));
					}
					else if (lang === "de") {
					  await interaction.editReply({ embeds: [rdoStartEmbedDe], components: [rdoStartMenu, rdoStartMenu2, backButtonDe] })
		        .catch(err => console.log(`rdoStartEmbed+Menu Error: ${err.stack}`));
					}
					else if (lang === "pt") {
					  await interaction.editReply({ embeds: [rdoStartEmbedPt], components: [rdoStartMenu, rdoStartMenu2, backButtonPt] })
		        .catch(err => console.log(`rdoStartEmbed+Menu Error: ${err.stack}`));
					}
					else {
					  await interaction.editReply({ embeds: [rdoStartEmbed], components: [rdoStartMenu, rdoStartMenu2, backButton] })
		        .catch(err => console.log(`rdoStartEmbed+Menu Error: ${err.stack}`)); 
					}					
		    } else {
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
				
			} //end if rdoChannelCount >24

				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 2))					

				}}); //end fs.readFile LANGDataBase
		} // end if rdostart button

			
		}); //end fs:readFile
				
		
	},
};




	