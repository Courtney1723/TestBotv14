const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType} = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

			if (!interaction.isButton()) {return};
			if (interaction.customId.includes(`rdostart - `)) {
				await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("start - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

//-----BEGIN TRANSLATIONS-----//				

		fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
			  if (err) {console.log(`Error: ${err}`)} 
				else {
					let lang03 = data.split("lang:");

					let langArray = [];
					for (i=2; i <= lang03.length - 1; i++) { //first will always be undefined
						let lang02 = lang03[i].split(" -");
						let lang01 = lang02[0];
						langArray.push(lang01);
					}
					//console.log(`langArray: ${langArray}`);

					let guildID03 = data.split("guild:");
					let guildIDArray = [];
					for (i=2; i <= guildID03.length - 1; i++) { //first two will always be undefined
						let guildID02 = guildID03[i].split(" -");						
						let guildID01 = guildID02[0];
						guildIDArray.push(guildID01);
					}
					//console.log(`guildIDArray: ${guildIDArray}`);	

					let lang = "";
					for (i=0; i <= guildIDArray.length - 1; i++) {
						if (interaction.guild.id === guildIDArray[i]) {
							lang += `${langArray[i]}`;
						}
					}
					//console.log(`lang: ${lang}`);		

		function rdoStartTitle() {
			if (lang === "en") {
				return `Start Auto Posting Red Dead Online Bonuses`;
			}
			if (lang === "es") {
				return `Comience a publicar automáticamente bonos y descuentos de Red Dead Online`;
			}		
			if (lang === "ru") {
				return `Начните автоматическую публикацию бонусов и скидок Red Dead Online`;
			}			
			if (lang === "de") {
				return `Starten Sie die automatische Veröffentlichung von Red Dead Online-Boni`;
			}		
			if (lang === "pt") {
				return `Iniciar publicações automáticas`;
			}		
			else {
				return `Start automatically publishing Red Dead Online bonuses`;
			}			
		}					
	
		function rdoStartDesc() {
			if (lang === "en") {
				return `Click **the dropdown menu** to confirm the channel you want to send Red Dead Online Auto Posts to \n**the first Tuesday of every month at 2:00 PM EST**.`;
			}
			if (lang === "es") {
				return `Haga clic en **El menú desplegable** para confirmar el canal al que desea enviar publicaciones automáticas de RDO \n**el primer martes de cada mes a las 14:00 hora del este**.`;
			}
			if (lang === "ru") {
				return `Щелчок **раскрывающееся меню** для подтверждения канала вы хотите отправлять автоматические сообщения RDO на \n**в первый вторник каждого месяца в 14:00 по восточному времени**.`;
			}
			if (lang === "de") {
				return `Klicken **Das Dropdown-Menü** um den Kanal zu bestätigen, an den Sie automatische RDO-Beiträge senden möchten \n** am ersten Dienstag eines jeden Monats um 14:00 Uhr Ostküsten-Standardzeit (Nordamerika)**.`;
			}
			if (lang === "pt") {
				return `Clique **no menu suspenso** para confirmar o canal para o qual deseja enviar as publicações automáticas do Red Dead Online \n**na primeira terça-feira de cada mês às 14:00 Hora do Leste**.`;
			}
			else {
				return `Click **the dropdown menu** to confirm the channel you want to send Red Dead Online Auto Posts to \n**the first Tuesday of every month at 2:00 PM EST**.`;
			}		
		}			

		function rdoStartFooter() {
			if (lang === "en") {
				return `Auto posts can only be sent to text channels the bot has permission to \'Send Messages\' in.`;
			}
			if (lang === "es") {
				return `Las publicaciones automáticas solo se pueden enviar a canales de texto en los que el bot tiene permiso para \'Enviar mensajes\'.`;
			}
			if (lang === "ru") {
				return `Автоматические сообщения могут быть отправлены только на текстовые каналы, на которые бот имеет разрешение \'Отправить сообщения\'.`;
			}
			if (lang === "de") {
				return `Automatische Posts können nur an Textkanäle gesendet werden, in denen der Bot die Berechtigung zum \'Senden von Nachrichten\' hat.`;
			}
			if (lang === "pt") {
				return `Autoposts só podem ser enviados para canais de texto que o bot tenha permissão de \'Enviar mensagens\'.`;
			}
			else {
				return `Auto posts can only be sent to text channels the bot has permission to \'Send Messages\' in.`;
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

		function selectChannel() {
			if (lang === "en") {
				return `Select A Channel`;
			}
			else if (lang === "es") {
				return `Elige un canal`;
			}
			else if (lang === "ru") {
				return `Выберите канал`;
			}
			else if (lang === "de") {
				return `Wählen Sie einen Kanal aus`;
			}
			else if (lang === "pt") {
				return `Escolha um canal`;
			}
			else {
				return `Select A Channel`;
			}						
		}
	
		function noChannel() {
			if (lang === "en") {
				return `No Channel Selected`;
			}
			else if (lang === "es") {
				return `Ningún canal elegido`;
			}
			else if (lang === "ru") {
				return `Канал не выбран`;
			}
			else if (lang === "de") {
				return `Kein Kanal ausgewählt`;
			}
			else if (lang === "pt") {
				return `Nenhum canal escolhido`;
			}
			else {
				return `No Channel Selected`;
			}						
		}							

//-----END TRANSLATIONS-----//					

		const rdoStartEmbed = new EmbedBuilder()
			.setColor(0x00FF00) //Green
			.setTitle(`${rdoStartTitle()}`)
			.setDescription(`${rdoStartDesc()}`)	
			.setFooter({ text: `${rdoStartFooter()}`, iconURL: process.env.logo_link });					

		fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
    	if (err) {console.log(`Error: ${err}`)} //If an error, console.log						

			let rdoChannelCount = 0;
				interaction.guild.channels.cache.forEach(channel => {
					if ( ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) && (!data.includes(channel.id)) && (channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages)) ) { 
						rdoChannelCount += 1;
					}
				})
			var rdoChannelNames = new Array(rdoChannelCount);
			var rdoChannelIDs = new Array(rdoChannelCount);
			var rdoChannelTypes = new Array(rdoChannelCount);
			interaction.guild.channels.cache.forEach(channel => {
				if ( ((channel.type === 0) || (channel.type === 5)) && (!data.includes(channel.id)) && (channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages)) ) { 
					rdoChannelNames.splice((channel.rawPosition), 1, channel.name);   
					rdoChannelIDs.splice((channel.rawPosition), 1, channel.id); 	
					rdoChannelTypes.splice((channel.rawPosition), 1, channel.type);	
				}
			});
			//console.log(`rdoChannelCount: ${rdoChannelCount}`)
			//console.log(`rdoChannelNames[23]: ${rdoChannelNames[23]}`)

			let rdoStartMenu = new ActionRowBuilder()
			    .addComponents(
			        new StringSelectMenuBuilder()
			        .setCustomId(`rdoStartMenu - u:${interaction.user.id} - c:undefinedchannel`)
			        .setPlaceholder(`${selectChannel()}`)
			        .addOptions([{
			            label: `${noChannel()}`,
			            description: `${noChannel()}`,
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
			        .setLabel(`${goBack()}`)
			        .setStyle(ButtonStyle.Secondary),	
				);
				
			let rdoStartMenu2 = new ActionRowBuilder()
			    .addComponents(
			        new StringSelectMenuBuilder()
			        .setCustomId(`rdoStartMenu2 - u:${interaction.user.id} - c:undefinedchannel`)
			        .setPlaceholder(`${selectChannel()}`)
			        .addOptions([{
			            label: `${noChannel()}`,
			            description: `${noChannel()}`,
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
						await interaction.editReply({ embeds: [rdoStartEmbed], components: [rdoStartMenu, rdoStartMenu2, backButton] })
		        .catch(err => console.log(`rdoStartEmbed+Menu Error: ${err.stack}`));				
		    } 
				else {
						await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });	
				}
		  			
				
			} //end if rdoChannelCount >24

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
					interaction.editReply({components: [expiredButton]});
				}, (60000 * 5))		
			
				}); //end fs.readFile for RDODataBase.txt
				}}); //end fs.readFile LANGDataBase
		} // end if rdostart button
				
		
	},
};




	