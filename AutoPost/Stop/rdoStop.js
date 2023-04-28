const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

			if (!interaction.isButton()) {return};
			if (interaction.customId.includes(`rdostop -`)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("stop - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin rdostop - ${interaction.customId}`);

//-----BEGIN TRANSLATIONS-----//			

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


	function rdoStopTitle() {
		if (lang === "en") {
			return `Stop auto posting Red Dead Online Bonuses`;
		}
		else if (lang === "es") {
			return `Detener la publicación automática de bonificaciones Red Dead Online`;
		}
		else if (lang === "ru") {
			return `Прекратить автоматическую отправку бонусов Red Dead Online`;
		}
		else if (lang === "de") {
			return `Stoppen Sie die automatische Buchung von Red Dead Online-Boni`; //FIXME - double check translation
		}
		else if (lang === "pt") {
			return `Parar de lançar automaticamente bônus Red Dead Online`;
		}
		else {
			return `Stop auto posting Red Dead Online Bonuses`;
		}		
	}

	function rdoStopDesc() {
		if (lang === "en") {
			return `Click **the dropdown menu** to confirm the channel you want to stop sending Red Dead Online auto posts to.`;
		}
		else if (lang === "es") {
			return `Haga clic en **el menú desplegable** para confirmar el canal al que desea dejar de enviar publicaciones automáticas de Red Dead Online.`;
		}
		else if (lang === "ru") {
			return `Щелчок **раскрывающееся меню**, чтобы подтвердить канал, на который вы хотите прекратить отправку автоматических сообщений Red Dead Online.`;
		}
		else if (lang === "de") {
			return `Klicken **Das Dropdown-Menü** um den Kanal zu bestätigen, an den Sie keine automatischen Red Dead Online-Beiträge mehr senden möchten.`; //FIXME - double check translation 
		}
		else if (lang === "pt") {
			return `Clique **o menu suspenso** para confirmar o canal para o qual você deseja parar de enviar postagens automáticas do Red Dead Online.`;
		}
		else {
			return `Click **the dropdown menu** to confirm the channel you want to stop sending Red Dead Online auto posts to.`;
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
	
	function noSubscriptions() {
		if (lang === "en") {
			return `There are no channels in this server subscribed to Red Dead Online auto posts.`;
		}
		else if (lang === "es") {
			return `No hay canales en este servidor suscritos a publicaciones automáticas Red Dead Online.`;
		}
		else if (lang === "ru") {
			return `На этом сервере нет каналов, подписанных на автоматические посты Red Dead Online.`;
		}
		else if (lang === "de") {
			return `Es gibt keine Kanäle auf diesem Server, die Red Dead Online-Auto-Posts abonniert haben.`;
		}
		else if (lang === "pt") {
			return `Não há canais neste servidor inscritos para Red Dead Online auto posts.`;
		}
		else {
			return `There are no channels in this server subscribed to Red Dead Online auto posts.`;
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
			
			const rdoStopEmbed = new EmbedBuilder()
				.setColor(0xFF0000) //Red 
				.setTitle(`${rdoStopTitle()}`)
				.setDescription(`${rdoStopDesc()}`)		

			fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
    	if (err) {console.log(`Error: ${err}`)} //If an error, console.log

			let rdoStopMenu = new ActionRowBuilder()
			    .addComponents(
			        new StringSelectMenuBuilder()
			        .setCustomId(`rdoStopMenu - u:${interaction.user.id} - c:undefinedchannel`)
			        .setPlaceholder(`${selectChannel()}`)
			        .addOptions([{
			            label: `${noChannel()}`,
			            description: `${noChannel()}`,
			            value: `rdoStopMenu - u:${interaction.user.id} - c:undefinedchannel`,
			        }])
			    )
			interaction.guild.channels.cache.forEach(channel => {
			    if (((channel.type === 0) || (channel.type === 5)) && (data.includes(channel.id))) {
			        rdoStopMenu.components[0].addOptions([{
			            label: `${channel.name}`,
			            description: `${channel.name}`,
			            value: `rdoStopMenu - u:${interaction.user.id} - c:${channel.id}`,
			        }]);
			    }
			})		

			const backButton = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`rdostopback - ${interaction.user.id}`)
			        .setLabel(`${goBack()}`)
			        .setStyle(ButtonStyle.Secondary),	
				);


		let rdoChannelIds = [];
		interaction.guild.channels.cache.forEach(channel => {
			if (data.includes(channel.id)) {
				rdoChannelIds.push(channel.id);
			}
		});
		//console.log(`rdoChannelIds: ${rdoChannelIds}`);						

		if (interaction.user.id === buttonUserID) { 
			if (rdoChannelIds.length <= 0) {
				interaction.followUp({ content: `${noSubscriptions()}`, ephemeral: true });				
			} 
			else {
				await interaction.editReply({ embeds: [rdoStopEmbed], components: [rdoStopMenu, backButton] })
        .catch(err => {console.log(`rdoStopEmbed+Menu Error: ${err.stack}`); process.kill(1);});
			}				
		}
    else {
			await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });	
  	}


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

				
		} // end if rdostop button

		})}; //end fs.readFile for LANGDataBase.txt
				
	},
};
