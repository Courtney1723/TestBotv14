const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

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

//-----BEGIN TRANSLATIONS-----//				

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

	function startTitle() {
		if (lang === "en") {
			return 	`Start auto posting GTA Online bonuses`;
		}
		if (lang === "es") {
			return `Comience a publicar automáticamente los bonos de GTA Online`;
		}
		if (lang === "ru") {
			return `Начать автоматическую публикацию GTA Online Онлайн бонусы`;
		}
		if (lang === "de") {
			return `Starten Sie die automatische Veröffentlichung für GTA Online-Boni`;
		}
		if (lang === "pt") {
			return `Comece a postar automaticamente bônus GTA Online`;
		}
		else {
			return `Start auto posting GTA Online bonuses`;
		}		
	}			

	function startDesc() {
		if (lang === "en") {
			return `Click **the dropdown menu** to confirm the channel you want to send GTA Online auto posts to \n**every Thursday at 2:00 PM EST**.`;
		}
		if (lang === "es") {
			return `Hage clic en **el menú desplegable** para confirmar el canal al que desea enviar publicaciones automáticas de GTA Online \n** todos los jueves a las 14:00 EST**.`;
		}
		if (lang === "ru") {
			return `Щелчок **раскрывающееся меню** для подтверждения канала, вы хотите отправлять автопосты GTA Online на \n**каждый четверг в 14:00 EST**.`;
		}
		if (lang === "de") {
			return `Klicken **Das Dropdown-Menü** um den Kanal zu bestätigen, an den Sie GTA Online automatische Beiträge senden möchten \n**jeden Donnerstag um 14:00 EST**.`;
		}
		if (lang === "pt") {
			return `Clique **o menu suspenso** para confirmar o canal que você deseja enviar GTA Online auto posts para \n**todas as quintas-feiras às 14:00 EST**.`;
		}
		else {
			return `Click **the dropdown menu** to confirm the channel you want to send GTA Online auto posts to \n**every Thursday at 2:00 PM EST**.`;
		}		
	}

	function startFooter() {
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

//-----END TRANSLATIONS-----//				

			const gtaStartEmbed = new EmbedBuilder()
				.setColor(`Green`) 
				.setTitle(`${startTitle()}`)
				.setDescription(`${startDesc()}`)	
				.setFooter({ text: `${startFooter()}`, iconURL: process.env.logo_link });			

			const backButton = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`gtastartback - ${interaction.user.id}`)
			        .setLabel(`${goBack()}`)
			        .setStyle(ButtonStyle.Secondary),	
				);					

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
						await interaction.editReply({ embeds: [gtaStartEmbed], components: [gtaStartMenu, gtaStartMenu2, backButton] })
		        .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
					}
					else if (lang === "es") {
					  await interaction.editReply({ embeds: [gtaStartEmbedEs], components: [gtaStartMenu, gtaStartMenu2, backButtonEs] })
		        .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
		    } else {
						await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });	
				}				
				
			} //end if gtaChannelCount >24
			else if (gtaChannelCount <= 23) { //if there are 23 channels or fewer
				

		if (interaction.user.id === buttonUserID) { 
			await interaction.editReply({ embeds: [gtaStartEmbed], components: [gtaStartMenu, gtaStartMenu2, backButton] })
			.catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
    } else {
			await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });	
    }
				
		} //end if there are fewer than 23 channels

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

					}); //end fs.readFile for GTADataBase.txt
					}}); //end fs.readfile LANGDataBase
		
		} // end if gtastart button
		
		}); //end fs:readFile

		
	},
};




	