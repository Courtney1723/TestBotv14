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
			if (interaction.customId.includes(`rdostop -`)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("stop - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin rdostop - ${interaction.customId}`);

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

		fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log					
			
			const rdoStopEmbed = new EmbedBuilder()
				.setColor(`Red`) 
				.setTitle(`Stop auto posting RDO Bonuses`)
				.setDescription(`Click **the dropdown menu** to confirm the channel you want to stop sending RDO auto posts to.`)	

			const rdoStopEmbedEs = new EmbedBuilder()
				.setColor(`Red`) 
				.setTitle(`Detener la publicación automática de bonificaciones RDO`)
				.setDescription(`Clic **el menú desplegable** para confirmar el canal al que desea dejar de enviar publicaciones automáticas de RDO.`)		

			const rdoStopEmbedRu = new EmbedBuilder()
				.setColor(`Red`) 
				.setTitle(`Прекратить автоматическую отправку бонусов RDO`)
				.setDescription(`Щелчок **раскрывающееся меню**, чтобы подтвердить канал, на который вы хотите прекратить отправку автоматических сообщений RDO.`)		

			const rdoStopEmbedDe = new EmbedBuilder()
				.setColor(`Red`) 
				.setTitle(`Stoppen Sie die automatische Buchung von RDO-Boni`)
				.setDescription(`Klicken **Das Dropdown-Menü** um den Kanal zu bestätigen, an den Sie keine automatischen RDO-Beiträge mehr senden möchten.`)		

			const rdoStopEmbedPt = new EmbedBuilder()
				.setColor(`Red`) 
				.setTitle(`Parar de lançar automaticamente bônus RDO`)
				.setDescription(`Clique **o menu suspenso** para confirmar o canal para o qual você deseja parar de enviar postagens automáticas do RDO.`)		

			fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
    	if (err) {console.log(`Error: ${err}`)} //If an error, console.log

			let rdoStopMenu = new ActionRowBuilder()
			    .addComponents(
			        new StringSelectMenuBuilder()
			        .setCustomId(`rdoStopMenu - u:${interaction.user.id} - c:undefinedchannel`)
			        .setPlaceholder('Select a Channel')
			        .addOptions([{
			            label: `No Channel Selected`,
			            description: 'No Channel Selected',
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

		let rdoChannelIds = [];
		fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
		    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
		
					interaction.guild.channels.cache.forEach(channel => {
							if (data.includes(channel.id)) {
								rdoChannelIds.push(channel.id);
							}
					});
			//console.log(`rdoChannelIds: ${rdoChannelIds}`);					
				

		if (interaction.user.id === buttonUserID) { 
			if (rdoChannelIds.length <= 0) {
				if (lang === "en") {
					interaction.followUp({ content: `There are no channels in this server subscribed to RDO auto posts.`, ephemeral: true });
				}
				else if (lang === "es") {
					interaction.followUp({ content: `No hay canales en este servidor suscritos a publicaciones automáticas RDO.`, ephemeral: true });
				}
				else if (lang === "ru") {
					interaction.followUp({ content: `На этом сервере нет каналов, подписанных на автоматические посты RDO.`, ephemeral: true });
				}
				else if (lang === "de") {
					interaction.followUp({ content: `Es gibt keine Kanäle auf diesem Server, die RDO-Auto-Posts abonniert haben.`, ephemeral: true });
				}
				else if (lang === "pt") {
					interaction.followUp({ content: `Não há canais neste servidor inscritos para RDO auto posts.`, ephemeral: true });
				}
				else {
					interaction.followUp({ content: `There are no channels in this server subscribed to RDO auto posts.`, ephemeral: true });
				}				
			} 
			else {
				if (lang === "en") {
				  await interaction.editReply({ embeds: [rdoStopEmbed], components: [rdoStopMenu, backButton] })
        .catch(err => console.log(`rdoStopEmbed+Menu Error: ${err.stack}`));
				}
				else if (lang === "es") {
					await interaction.editReply({ embeds: [rdoStopEmbedEs], components: [rdoStopMenu, backButtonEs] })
        .catch(err => console.log(`rdoStopEmbed+Menu Error: ${err.stack}`));
				}
				else if (lang === "ru") {
					await interaction.editReply({ embeds: [rdoStopEmbedRu], components: [rdoStopMenu, backButtonRu] })
        .catch(err => console.log(`rdoStopEmbed+Menu Error: ${err.stack}`));
				}
				else if (lang === "de") {
					await interaction.editReply({ embeds: [rdoStopEmbedDe], components: [rdoStopMenu, backButtonDe] })
        .catch(err => console.log(`rdoStopEmbed+Menu Error: ${err.stack}`));
				}
				else if (lang === "pt") {
					await interaction.editReply({ embeds: [rdoStopEmbedPt], components: [rdoStopMenu, backButtonPt] })
        .catch(err => console.log(`rdoStopEmbed+Menu Error: ${err.stack}`));
				}
				else {
					await interaction.editReply({ embeds: [rdoStopEmbed], components: [rdoStopMenu, backButton] })
        .catch(err => console.log(`rdoStopEmbed+Menu Error: ${err.stack}`));
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

				}); // end checking for if no channels are subscribed

				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 2))	

			}); //end fs.readFile for rolesDataBase.txt
			}); //end fs:readFile
				
		} // end if rdostop button

		})}; //end fs.readFile for LANGDataBase.txt
				
	},
};




	