const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isButton()) {return};
		if (interaction.customId.startsWith(`confirm - `)) {
			//console.log(`begin start: '${interaction.customId}'`);		

		let buttonUserID01 = (interaction.customId).split("confirm - ");
		let buttonUserID = buttonUserID01[1];
			//console.log(`buttonUserID: ${buttonUserID}`);
			//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)		

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

			let channelIDArray = [];
			interaction.guild.channels.cache.forEach(channel => { //populates channelIDArray with the server text channels
			    if ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) { //if channel is a text or annoucement channel
			        channelIDArray.push(`${channel.id}`);
			    }
			});
			//console.log(`channelIDArray: ${channelIDArray}`);			

		let GTAConfirmString = "";
		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) { //Starts Populating subscribed GTA channels
			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
			else {
					//console.log(`data: ${data}`);
					for (i = 0; i <= channelIDArray.length - 1; i++) {
						if (data.includes(`${channelIDArray[i]}`)) { //If the GTADataBase.txt contains a channel in the interaction guild
							GTAConfirmString += `• <#${channelIDArray[i]}>\n`;
							//console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
							//console.log(`GTAConfirmString at ${i}: ${GTAConfirmString}`);	
						} 
					}
				}
			//console.log(`GTAConfirmString: ${GTAConfirmString}`);	
			var subscriptionCheckGTA = false;
			if (!GTAConfirmString.includes('• ')) {
				var subscriptionCheckGTA = true;
				if (lang === "en") {
					GTAConfirmString += `• There are no channels in this server subscribed to GTA Online auto posts.\n`;
				}
				else if (lang === "es") {
				  GTAConfirmString += `• No hay canales en este servidor suscritos a publicaciones automáticas GTA Online.\n`;
				}
				else if (lang === "ru") {
				  GTAConfirmString += `• На этом сервере нет каналов, подписанных на автоматические посты GTA Online.\n`;
				}
				else if (lang === "de") {
				  GTAConfirmString += `• Es gibt keine Kanäle auf diesem Server, die GTA Online-Auto-Posts abonniert haben.\n`;
				}
				else if (lang === "pt") {
				  GTAConfirmString += `• Não há canais neste servidor inscritos para GTA Online auto posts.\n`;
				}
				else {
				  GTAConfirmString += `• There are no channels in this server subscribed to GTA Online auto posts.\n`;
				}
			}
		
		let RDOConfirmString = "";
		fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
			else {
					//console.log(`data: ${data}`);
					for (i = 0; i <= channelIDArray.length - 1; i++) {
						if (data.includes(`${channelIDArray[i]}`)) { //If the GTADataBase.txt contains a channel in the interaction guild
							RDOConfirmString += `• <#${channelIDArray[i]}>\n`;
							//console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
							//console.log(`RDOConfirmString at ${i}: ${RDOConfirmString}`);	
						} 
					}
				}
			//console.log(`RDOConfirmString: ${RDOConfirmString}`);	
			var subscriptionCheckRDO = false;
			if (!RDOConfirmString.includes('• ')) {
				subscriptionCheckRDO = true;
				if (lang === "en") {
					RDOConfirmString += `• There are no channels in this server subscribed to RDO auto posts.\n`;
				}
				else if (lang === "es") {
				  RDOConfirmString += `• No hay canales en este servidor suscritos a publicaciones automáticas RDO.\n`;
				}
				else if (lang === "ru") {
				  RDOConfirmString += `• На этом сервере нет каналов, подписанных на автоматические посты RDO.\n`;
				}
				else if (lang === "de") {
				  RDOConfirmString += `• Es gibt keine Kanäle auf diesem Server, die RDO-Auto-Posts abonniert haben.\n`;
				}
				else if (lang === "pt") {
				  RDOConfirmString += `• Não há canais neste servidor inscritos para RDO auto posts.\n`;
				}
				else {
				  RDOConfirmString += `• There are no channels in this server subscribed to RDO auto posts.\n`;
				}
			}

		function confirmTitleString() {
			if (lang === "en") {
				return `Auto Post Channels`;
			}
			else if (lang === "es") {
				return `Canales de publicación automática`;
			}
			else if (lang === "ru") {
				return `Текущие настройки автоматической публикации`;
			}
			else if (lang === "de") {
				return `Automatische Veröffentlichungskanäle`;
			}
			else if (lang === "pt") {
				return `Canais de publicação automática`;
			}
			else {
			  return `Auto Post Channels`;
			}			
		}

		function everyThursday() {
			if (subscriptionCheckGTA === false) {
				if (lang === "en") {
					return `\nEvery Thursday at 2:00 PM EST`;
				}
				else if (lang === "es") {
					return `\nTodos los jueves a las 14:00 hora del este`;
				}
				else if (lang === "ru") {
					return `\nКаждый четверг в 14:00 по восточному времени`;
				}
				else if (lang === "de") {
					return `\nJeden Donnerstag um 14:00 Uhr Ostküsten-Standardzeit (Nordamerika)`;
				}
				else if (lang === "pt") {
					return `\nTodas as quintas-feiras às 14:00 Hora do Leste`;
				}
				else {
				  return `\nEvery Thursday at 2:00 PM EST`;
				}	
			}
			else {
				return "";
			}
		} 

		function firstTuesday() {
			if (subscriptionCheckRDO === false) {
				if (lang === "en") {
					return `\nThe first Tuesday of every month at 2:00 PM EST`;
				}
				else if (lang === "es") {
					return `\nEl primer martes de cada mes a las 14:00 hora del este`;
				}
				else if (lang === "ru") {
					return `\nB первый вторник каждого месяца в 14:00 по восточному времени`;
				}
				else if (lang === "de") {
					return `\nJeden ersten Dienstag im Monat um 14:00 Uhr Ostküsten-Standardzeit (Nordamerika)`;
				}
				else if (lang === "pt") {
					return `\nA primeira terça-feira de cada mês às 14:00 Hora do Leste`;
				}
				else {
				  return `\nThe first Tuesday of every month at 2:00 PM EST`;
				}		
			}
			else {
				return "";
			}
		}		

		function testTitleString() {
			if (lang === "en") {
				return `Test Auto Posts`;
			}
			else if (lang === "es") {
				return `Probar publicaciones automáticas`;
			}
			else if (lang === "ru") {
				return `Протестируйте автоматические публикации`;
			}
			else if (lang === "de") {
				return `Testen Sie automatische Veröffentlichungen`;
			}
			else if (lang === "pt") {
				return `Testar publicações automáticas`;
			}
			else {
			  return `Test Auto Posts`;
		}						
	}

		function testGTAString() {
			if (lang === "en") {
					return `Click **\'Test GTA\'** to send a test post to your subscribed GTA Online channel(s).`;
			}
			else if (lang === "es") {
				return `Haga clic en **\'Prueba GTA\'** para enviar una publicación de prueba a sus canal(es) GTA Online suscritos.`;
			}
			else if (lang === "ru") {
				return `Щелчок **\'Тест GTA\'** для того, чтобы отправить тестовое сообщение на подписанные каналы GTA Online.`;
			}
			else if (lang === "de") {
				return `Klicken Sie auf **\'GTA testen'**, um einen Testbeitrag an Ihre abonnierten GTA-Kanäle zu senden.`;
			}
			else if (lang === "pt") {
				return `Clique em **\'Testar GTA\'** para enviar uma postagem de teste para seus canais GTA inscritos.`;
			}
			else {
			  return `Click **\'Test GTA\'** to send a test post to your subscribed GTA Online channel(s).`;
			}			
		}

		function testRDOString() {
			if (lang === "en") {
					return `Click **\'Test RDO\'** to send a test post to your subscribed RDO channel(s).`;
			}
			else if (lang === "es") {
				return `Haga clic en **\'Prueba RDO\'** para enviar una publicación de prueba a sus canal(es) RDO suscritos.`;
			}
			else if (lang === "ru") {
				return `Щелчок **\'Тест RDO\'** для того, чтобы отправить тестовое сообщение на подписанные каналы RDO.`;
			}
			else if (lang === "de") {
				return `Klicken Sie auf **\'RDO testen\'**, um einen Testbeitrag an Ihre abonnierten RDO-Kanäle zu senden.`;
			}
			else if (lang === "pt") {
				return `Clique em **\'Testar RDO\'** para enviar uma postagem de teste para seus canais RDO inscritos.`;
			}
			else {
			  return `Click **\'Test RDO\'** to send a test post to your subscribed RDO channel(s).`;
			}			
		}			

		function footerString() {
			if (lang === "en") {
					return `Only administrators can test auto posts.`;
			}
			else if (lang === "es") {
				return `Debe ser administrador para probar las publicaciones automáticas.`;
			}
			else if (lang === "ru") {
				return `Вы должны быть администратором, чтобы тестировать автоматические публикации.`;
			}
			else if (lang === "de") {
				return `Sie müssen Administrator sein, um automatische Veröffentlichungen testen zu können.`;
			}
			else if (lang === "pt") {
				return `Você deve ser um administrador para testar as publicações automáticas.`;
			}
			else {
				return `You must be an administrator to test auto posts.`;
			}
		}

		function testGTAButtonString() {
			if (lang === "en") {
				return `Test GTA`;
			}
			else if (lang === "es") {
				return `Prueba GTA`;
			}
			else if (lang === "ru") {
				return `Тест GTA`;
			}
			else if (lang === "de") {
				return `GTA testen`;
			}
			else if (lang === "pt") {
				return `Testar GTA`;
			}
			else {
				return `Test GTA`;
			}			
		}

		function testRDOButtonString() {
			if (lang === "en") {
				return `Test RDO`;
			}
			else if (lang === "es") {
				return `Prueba RDO`;
			}
			else if (lang === "ru") {
				return `Тест RDO`;
			}
			else if (lang === "de") {
				return `RDO testen`;
			}
			else if (lang === "pt") {
				return `Testar RDO`;
			}
			else {
				return `Test RDO`;
			}			
		}	

		function backButtonString() {
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

		const confirmEmbed = new EmbedBuilder()
			.setColor(0x00B9FF) 
			.setTitle(`${confirmTitleString()}`)
			.setDescription(`
**__GTA Online__**${everyThursday()}
${GTAConfirmString}
**__Red Dead Online__**${firstTuesday()}
${RDOConfirmString}
**__${testTitleString()}__**
• ${testGTAString()}
• ${testRDOString()}`)	
			.setFooter({ text: `${footerString()}`, iconURL: process.env.logo_link });		
			
		const confirmButtons = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtaTest - ${interaction.user.id}`)
			        .setLabel(`${testGTAButtonString()}`)
			        .setStyle(ButtonStyle.Success)
							.setDisabled(subscriptionCheckGTA),	
			    new ButtonBuilder()
			        .setCustomId(`rdoTest - ${interaction.user.id}`)
			        .setLabel(`${testRDOButtonString()}`)
			        .setStyle(ButtonStyle.Danger)
							.setDisabled(subscriptionCheckRDO),
			    new ButtonBuilder()
			        .setCustomId(`confirmback - ${interaction.user.id}`)
			        .setLabel(`${backButtonString()}`)
			        .setStyle(ButtonStyle.Secondary),
			);			

				await interaction.deferUpdate();
				if (interaction.user.id === buttonUserID) {
					await interaction.editReply({ embeds: [confirmEmbed], components: [confirmButtons] }).catch(err => {console.log(`confirmEmbed Error: ${err}`); process.kill(1);});						
				} 	
				else {
					await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
				}

	
	
	}); //end fs.readFile RDODataBase
	}); //end fs.readFile GTADataBase	

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

	}}); //end fs.readFile LANGDataBase
	
		} //end if start
	},
};