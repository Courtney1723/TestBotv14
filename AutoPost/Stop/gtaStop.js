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
			
		const gtaStopEmbed = new EmbedBuilder()
			.setColor(`Red`) 
			.setTitle(`Stop Auto Posting GTA Online Bonuses`)
			.setDescription(`Click **the dropdown menu** to confirm the channel you want to stop sending GTA Online auto posts to.`)	

		const gtaStopEmbedEs = new EmbedBuilder()
			.setColor(`Red`) 
			.setTitle(`Detener la publicación automática de bonos de GTA Online`)
			.setDescription(`Clic **o menu suspenso** para confirmar o canal que você deseja parar de enviar GTA Online auto posts para.`)	
				
		const gtaStopEmbedRu = new EmbedBuilder()
			.setColor(`Red`) 
			.setTitle(`Прекратите автоматическую публикацию бонусов GTA Online`)
			.setDescription(`Щелчок **раскрывающееся меню** чтобы подтвердить канал, на который вы хотите прекратить отправку автоматических сообщений GTA Online.`)	

		const gtaStopEmbedDe = new EmbedBuilder()
			.setColor(`Red`) 
			.setTitle(`Stoppen Sie die automatische Veröffentlichung von GTA Online-Boni`)
			.setDescription(`Klicken **Das Dropdown-Menü** um den Kanal zu bestätigen, an den Sie keine automatischen GTA Online-Beiträge mehr senden möchten.`)	

		const gtaStopEmbedPt = new EmbedBuilder()
			.setColor(`Red`) 
			.setTitle(`Pare de auto postar bônus GTA Online`)
			.setDescription(`Clique **o menu suspenso** para confirmar o canal que você deseja parar de enviar GTA Online auto posts para.`)	

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
			        .setLabel('Go Back')
			        .setStyle(ButtonStyle.Secondary),	
				);
			const backButtonEs = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`gtastopback - ${interaction.user.id}`)
			        .setLabel('Volver')
			        .setStyle(ButtonStyle.Secondary),	
				);
			const backButtonRu = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`gtastopback - ${interaction.user.id}`)
			        .setLabel('Вернуться')
			        .setStyle(ButtonStyle.Secondary),	
				);
			const backButtonDe = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`gtastopback - ${interaction.user.id}`)
			        .setLabel('Zurück')
			        .setStyle(ButtonStyle.Secondary),	
				);
			const backButtonPt = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`gtastopback - ${interaction.user.id}`)
			        .setLabel('Voltar')
			        .setStyle(ButtonStyle.Secondary),	
				);

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
				if (lang === "en") {
					interaction.followUp({ content: `There are no channels in this server subscribed to GTA Online auto posts.`, ephemeral: true });
				}
				else if (lang === "es") {
					interaction.followUp({ content: `No hay canales en este servidor suscritos a publicaciones automáticas GTA Online.`, ephemeral: true });
				}
				else if (lang === "ru") {
					interaction.followUp({ content: `На этом сервере нет каналов, подписанных на автоматические посты GTA Online.`, ephemeral: true });
				}
				else if (lang === "de") {
					interaction.followUp({ content: `Es gibt keine Kanäle auf diesem Server, die GTA Online-Auto-Posts abonniert haben.`, ephemeral: true });
				}
				else if (lang === "pt") {
					interaction.followUp({ content: `Não há canais neste servidor inscritos para GTA Online auto posts.`, ephemeral: true });
				}
				else {
					interaction.followUp({ content: `There are no channels in this server subscribed to GTA Online auto posts.`, ephemeral: true });
				}				
			} 
			else {
				if (lang === "en") {
				  await interaction.editReply({ embeds: [gtaStopEmbed], components: [gtaStopMenu, backButton] })
        .catch(err => console.log(`gtaStopEmbed+Menu Error: ${err.stack}`));
				}
				else if (lang === "es") {
					await interaction.editReply({ embeds: [gtaStopEmbedEs], components: [gtaStopMenu, backButtonEs] })
        .catch(err => console.log(`gtaStopEmbed+Menu Error: ${err.stack}`));
				}
				else if (lang === "ru") {
					await interaction.editReply({ embeds: [gtaStopEmbedRu], components: [gtaStopMenu, backButtonRu] })
        .catch(err => console.log(`gtaStopEmbed+Menu Error: ${err.stack}`));
				}
				else if (lang === "de") {
					await interaction.editReply({ embeds: [gtaStopEmbedDe], components: [gtaStopMenu, backButtonDe] })
        .catch(err => console.log(`gtaStopEmbed+Menu Error: ${err.stack}`));
				}
				else if (lang === "pt") {
					await interaction.editReply({ embeds: [gtaStopEmbedPt], components: [gtaStopMenu, backButtonPt] })
        .catch(err => console.log(`gtaStopEmbed+Menu Error: ${err.stack}`));
				}
				else {
					await interaction.editReply({ embeds: [gtaStopEmbed], components: [gtaStopMenu, backButton] })
        .catch(err => console.log(`gtaStopEmbed+Menu Error: ${err.stack}`));
				}				
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

					}); //end checking if there are not gta channels subscribed

				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 5))			
		
		} // end if gtastop button	
			
		}); //end fs.readFile for GTADataBase.txt
		}); //end fs:readFile

			}}); //end fs.readFile for LANGDataBase.txt

		
	},
};




	