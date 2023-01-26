const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
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
			if (interaction.customId.includes(`gtastop - `)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("stop - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin gtastop - ${interaction.customId}`);

//-----BEGIN TRANSLATIONS------//			

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

	function gtaStopTitle() {
		if (lang === "en") {
			return `Stop Auto Posting GTA Online Bonuses`;
		}
		else if (lang === "es") {
			return `Detener la publicación automática de bonos de GTA Online`;
		}
		else if (lang === "ru") {
			return `Прекратите автоматическую публикацию бонусов GTA Online`;
		}
		else if (lang === "de") {
			return `Stoppen Sie die automatische Veröffentlichung von GTA Online-Boni`;
		}
		else if (lang === "pt") {
			return `Pare de auto postar bônus GTA Online`;
		}
		else {
			return `Stop Auto Posting GTA Online Bonuses`;
		}		
	}

	function gtaStopDesc() {
		if (lang === "en") {
			return `Click **the dropdown menu** to confirm the channel you want to stop sending GTA Online auto posts to.`;
		}
		else if (lang === "es") {
			return `Haga clic en **o menu suspenso** para confirmar o canal que você deseja parar de enviar GTA Online auto posts para.`;
		}
		else if (lang === "ru") {
			return `Щелчок **раскрывающееся меню** чтобы подтвердить канал, на который вы хотите прекратить отправку автоматических сообщений GTA Online.`;
		}
		else if (lang === "de") {
			return `Klicken **Das Dropdown-Menü** um den Kanal zu bestätigen, an den Sie keine automatischen GTA Online-Beiträge mehr senden möchten.`;
		}
		else if (lang === "pt") {
			return `Clique **o menu suspenso** para confirmar o canal que você deseja parar de enviar GTA Online auto posts para.`;
		}
		else {
			return `Click **the dropdown menu** to confirm the channel you want to stop sending GTA Online auto posts to.`;
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
			return `There are no channels in this server subscribed to GTA Online auto posts.`;
		}
		else if (lang === "es") {
			return `No hay canales en este servidor suscritos a publicaciones automáticas GTA Online.`;
		}
		else if (lang === "ru") {
			return `На этом сервере нет каналов, подписанных на автоматические посты GTA Online.`;
		}
		else if (lang === "de") {
			return `Es gibt keine Kanäle auf diesem Server, die GTA Online-Auto-Posts abonniert haben.`;
		}
		else if (lang === "pt") {
			return `Não há canais neste servidor inscritos para GTA Online auto posts.`;
		}
		else {
			return `There are no channels in this server subscribed to GTA Online auto posts.`;
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

		const gtaStopEmbed = new EmbedBuilder()
			.setColor(`Red`) 
			.setTitle(`${gtaStopTitle()}`)
			.setDescription(`${gtaStopDesc()}`)
			

		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
    	if (err) {console.log(`Error: ${err}`)} //If an error, console.log
				
			let gtaStopMenu = new ActionRowBuilder()
			    .addComponents(
			        new StringSelectMenuBuilder()
			        .setCustomId(`gtaStopMenu - u:${interaction.user.id} - c:undefinedchannel`)
			        .setPlaceholder('Select a Channel')
			        .addOptions([{
			            label: `No Channel Selected`,
			            description: 'No Channel Selected',
			            value: `gtaStopMenu - u:${interaction.user.id} - c:undefinedchannel`,
			        }])
			    )
			interaction.guild.channels.cache.forEach(channel => {
			    if (((channel.type === 0) || (channel.type === 5)) && (data.includes(channel.id))) {
			        gtaStopMenu.components[0].addOptions([{
			            label: `${channel.name}`,
			            description: `${channel.name}`,
			            value: `gtaStopMenu - u:${interaction.user.id} - c:${channel.id}`,
			        }]);
			    }
			})	

			const backButton = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`gtastopback - ${interaction.user.id}`)
			        .setLabel(`${goBack()}`)
			        .setStyle(ButtonStyle.Secondary),	
				);				

		let gtaChannelIds = [];
		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
		    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
		
					interaction.guild.channels.cache.forEach(channel => {
							if (data.includes(channel.id)) {
								gtaChannelIds.push(channel.id);
							}
					});
			//console.log(`gtaChannelIds: ${gtaChannelIds}`);				

		if (interaction.user.id === buttonUserID) {
			if (gtaChannelIds.length <= 0) {
					interaction.followUp({ content: `${noSubscriptions()}`, ephemeral: true });				
			} 
			else {
				await interaction.editReply({ embeds: [gtaStopEmbed], components: [gtaStopMenu, backButton] })
        .catch(err => {console.log(`gtaStopEmbed+Menu Error: ${err.stack}`); process.kill(1)});			
			}
		} 
		else {
			await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });	
		}

			}); //end checking if there are not gta channels subscribed

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
		} // end if gtastop button
		}); //end fs:readFile

			}}); //end fs.readFile for LANGDataBase.txt

		
	},
};