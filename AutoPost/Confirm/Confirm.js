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
		if (interaction.customId.startsWith(`confirm - `)) {
			//console.log(`begin start: '${interaction.customId}'`);		

		let buttonUserID01 = (interaction.customId).split("confirm - ");
		let buttonUserID = buttonUserID01[1];
			//console.log(`buttonUserID: ${buttonUserID}`);
			//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)

		let guildRoleIds = [];
		fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
		    if (err) {console.log(`Error: ${err}`)} //If an error, console.log			
		
					interaction.guild.roles.cache.forEach(role => {
							if (data.includes(role.id)) {
								guildRoleIds.push(role.id);
							}
					});
			guildRoleIds.shift(1); //removes the @everyone role
				//console.log(`guildRoleIds: ${guildRoleIds}`);

			function AdminRequired() {
				let AdminRequiredBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
				if (AdminRequiredBoolean[1] === undefined) { //if the autopost command has never been triggered - sets default settings
					 	fs.appendFile(`./rolesDataBase.txt`,`guild:${interaction.guild.id} - admin:yes - role:undefined - \n`, err => {
 							if (err) {
 								console.error(err)
 								return
 							}					
 						}); //end fs.appendFile	
				}
				else if (AdminRequiredBoolean[1].includes(`yes`)) {
					return "AdminRequiredYes";
				}
				else {
					return "AdminRequiredNo";
				}
			}	

			let channelIDArray = [];
			interaction.guild.channels.cache.forEach(channel => { //populates channelIDArray with the server text channels
			    if ((channel.type === 0) || (channel.type === 5)) { //if channel is a text or annoucement channel
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
			if (!GTAConfirmString.includes('• ')) {
				if (lang === "en") {
					GTAConfirmString += `• There are no channels in this server subscribed to GTAV auto posts.\n`;
				}
				else if (lang === "es") {
				  GTAConfirmString += `• No hay canales en este servidor suscritos a publicaciones automáticas GTAV.\n`;
				}
				else if (lang === "ru") {
				  GTAConfirmString += `• На этом сервере нет каналов, подписанных на автоматические посты GTAV.\n`;
				}
				else if (lang === "de") {
				  GTAConfirmString += `• Es gibt keine Kanäle auf diesem Server, die GTAV-Auto-Posts abonniert haben.\n`;
				}
				else if (lang === "pt") {
				  GTAConfirmString += `• Não há canais neste servidor inscritos para GTAV auto posts.\n`;
				}
				else {
				  GTAConfirmString += `• There are no channels in this server subscribed to GTAV auto posts.\n`;
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
			if (!RDOConfirmString.includes('• ')) {
				if (lang === "en") {
					GTAConfirmString += `• There are no channels in this server subscribed to RDR2 auto posts.\n`;
				}
				else if (lang === "es") {
				  GTAConfirmString += `• No hay canales en este servidor suscritos a publicaciones automáticas RDR2.\n`;
				}
				else if (lang === "ru") {
				  GTAConfirmString += `• На этом сервере нет каналов, подписанных на автоматические посты RDR2.\n`;
				}
				else if (lang === "de") {
				  GTAConfirmString += `• Es gibt keine Kanäle auf diesem Server, die RDR2-Auto-Posts abonniert haben.\n`;
				}
				else if (lang === "pt") {
				  GTAConfirmString += `• Não há canais neste servidor inscritos para RDR2 auto posts.\n`;
				}
				else {
				  GTAConfirmString += `• There are no channels in this server subscribed to RDR2 auto posts.\n`;
				}
			}

			
			let ConfigureConfirmString = "";
			fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
			    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
			    else {
            //console.log(`data: ${data}`);
						let roleIDArray = [];
						interaction.guild.roles.cache.forEach(role => {
							if ((data.includes(`${role.id}`)) && (role.name != "@everyone") ) {
						    roleIDArray.push(`${role.id}`);
							}
						});
							//console.log(`roleIDArray[]: ${roleIDArray}`);
						
						if (data.includes(`guild:${interaction.guild.id} - admin:yes`)) {
							ConfigureConfirmString += `• Administrators\n`
								//console.log(`roleIDArray.length: ${roleIDArray.length}`)
							if (roleIDArray.length >= 1) {
							ConfigureConfirmString += `• Anyone without the Administrator privilege will be unable to configure auto posts\n **even if they have a role listed below**\n`;
							}						
						}
            for (i = 0; i <= roleIDArray.length - 1; i++) {
							ConfigureConfirmString += `• <@&${roleIDArray[i]}>\n`;
							//console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
							//console.log(`ConfigureConfirmString at ${i}: ${ConfigureConfirmString}`);	
            }
        }
    //console.log(`ConfigureConfirmString: ${ConfigureConfirmString}`);	
    if (!ConfigureConfirmString.includes('• ')) {
			if (lang === "en") {
				ConfigureConfirmString += `• <@&${interaction.guild.id}> can configure auto posts.\n`;
			}
			else if (lang === "es") {
			  ConfigureConfirmString += `• <@&${interaction.guild.id}> el mundo puede configurar publicaciones automáticas.\n`;
			}
			else if (lang === "ru") {
			  ConfigureConfirmString += `• <@&${interaction.guild.id}> может настроить автоматические сообщения.\n`;
			}
			else if (lang === "de") {
			  ConfigureConfirmString += `• <@&${interaction.guild.id}> kann automatische Beiträge konfigurieren.\n`;
			}
			else if (lang === "pt") {
			  ConfigureConfirmString += `• <@&${interaction.guild.id}> podem configurar postagens automáticas.\n`;
			}
			else {
			  ConfigureConfirmString += `• <@&${interaction.guild.id}> can configure auto posts.\n`;
			}
    }	
			
			

		const confirmEmbed = new EmbedBuilder()
			.setColor(`Blue`) 
			.setTitle(`Your Current Auto Post Channels:`)
			.setDescription(`
**Grand Theft Auto Online:**
${GTAConfirmString}
**Red Dead Online:**
${RDOConfirmString}
**Roles Allowed to Configure Auto Posts**
${ConfigureConfirmString}
Click **\'Test GTA\'** to send a test post to your subscribed GTAV channel(s).
Click **\'Test RDO\'** to send a test post to your subscribed RDR2 channel(s).`)	
			.setFooter({ text: 'You must be an administrator or have a role listed above to test auto posts.', iconURL: process.env.logo_link });


		const confirmButtons = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtaTest - ${interaction.user.id}`)
			        .setLabel('Test GTA')
			        .setStyle(ButtonStyle.Success),	
			    new ButtonBuilder()
			        .setCustomId(`rdoTest - ${interaction.user.id}`)
			        .setLabel('Test RDO')
			        .setStyle(ButtonStyle.Danger),			
			    new ButtonBuilder()
			        .setCustomId(`confirmback - ${interaction.user.id}`)
			        .setLabel('Go Back')
			        .setStyle(ButtonStyle.Secondary),				
			);		

		const confirmEmbedEs = new EmbedBuilder()
			.setColor(`Blue`) 
			.setTitle(`Tus canales actuales de publicación automática:`)
			.setDescription(`
**Grand Theft Auto Online:**
${GTAConfirmString}
**Red Dead Online:**
${RDOConfirmString}
**Roles permitidos para configurar publicaciones automáticas**
${ConfigureConfirmString}
Clic **\'Prueba GTA\'** para enviar una publicación de prueba a tu canal(es) GTAV suscrito.
Clic **\'Prueba RDO\'** para enviar una publicación de prueba a sus canal(es) RDR2 suscritos`)	
			.setFooter({ text: 'Debe ser administrador o tener un rol mencionado anteriormente para probar publicaciones automáticas.', iconURL: process.env.logo_link });


		const confirmButtonsEs = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtaTest - ${interaction.user.id}`)
			        .setLabel('Prueba GTA')
			        .setStyle(ButtonStyle.Success),	
			    new ButtonBuilder()
			        .setCustomId(`rdoTest - ${interaction.user.id}`)
			        .setLabel('Prueba RDO')
			        .setStyle(ButtonStyle.Danger),			
			    new ButtonBuilder()
			        .setCustomId(`confirmback - ${interaction.user.id}`)
			        .setLabel('Volver')
			        .setStyle(ButtonStyle.Secondary),				
			);			

		const confirmEmbedRu = new EmbedBuilder()
			.setColor(`Blue`) 
			.setTitle(`Текущие настройки автоматической публикации:`)
			.setDescription(`
**Grand Theft Auto Online:**
${GTAConfirmString}
**Red Dead Online:**
${RDOConfirmString}
**Роли, которым разрешено настраивать автоматические записи:**
${ConfigureConfirmString}
Щелчок **\'Тест GTA\'** для того, чтобы отправить тестовое сообщение на подписанные каналы GTAV.
Щелчок **\'Тест RDO\'** для того, чтобы отправить тестовое сообщение на подписанные каналы RDR2`)	
			.setFooter({ text: 'Для тестирования автоматических публикаций необходимо быть администратором или иметь роль, указанную выше.', iconURL: process.env.logo_link });


		const confirmButtonsRu = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtaTest - ${interaction.user.id}`)
			        .setLabel('Тест GTA')
			        .setStyle(ButtonStyle.Success),	
			    new ButtonBuilder()
			        .setCustomId(`rdoTest - ${interaction.user.id}`)
			        .setLabel('Тест RDO')
			        .setStyle(ButtonStyle.Danger),			
			    new ButtonBuilder()
			        .setCustomId(`confirmback - ${interaction.user.id}`)
			        .setLabel('Вернуться')
			        .setStyle(ButtonStyle.Secondary),				
			);	

		const confirmEmbedDe = new EmbedBuilder()
			.setColor(`Blue`) 
			.setTitle(`Ihre aktuellen Auto-Post-Kanäle:`)
			.setDescription(`
**Grand Theft Auto Online:**
${GTAConfirmString}
**Red Dead Online:**
${RDOConfirmString}
**Rollen, die automatische Beiträge konfigurieren dürfen**
${ConfigureConfirmString}
Klicken **\'Test GTA\'** um einen Testbeitrag an Ihre(n) abonnierten GTAV-Kanal zu senden.
Klicken **\'Test RDO\'** um einen Testbeitrag an Ihre(n) abonnierten RDR2-Kanal zu senden.`)	
			.setFooter({ text: 'Sie müssen Administrator sein oder über eine der oben aufgeführten Rollen verfügen, um automatische Beiträge testen zu können.', iconURL: process.env.logo_link });


		const confirmButtonsDe = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtaTest - ${interaction.user.id}`)
			        .setLabel('Test GTA')
			        .setStyle(ButtonStyle.Success),	
			    new ButtonBuilder()
			        .setCustomId(`rdoTest - ${interaction.user.id}`)
			        .setLabel('Test RDO')
			        .setStyle(ButtonStyle.Danger),			
			    new ButtonBuilder()
			        .setCustomId(`confirmback - ${interaction.user.id}`)
			        .setLabel('Zurück')
			        .setStyle(ButtonStyle.Secondary),				
			);		

		const confirmEmbedPt = new EmbedBuilder()
			.setColor(`Blue`) 
			.setTitle(`Seus canais de publicação automática atuais:`)
			.setDescription(`
**Grand Theft Auto Online:**
${GTAConfirmString}
**Red Dead Online:**
${RDOConfirmString}
**Funções permitidas para configurar postagens automáticas:**
${ConfigureConfirmString}
Clique **\'Teste GTA\'** para enviar uma postagem de teste para seus canais GTA Online inscritos.
Clique **\'Teste RDO\'** para enviar uma postagem de teste para seus canais RDO inscritos.`)	
			.setFooter({ text: 'Você deve ser um administrador ou ter uma função listada acima para testar postagens automáticas.', iconURL: process.env.logo_link });


		const confirmButtonsPt = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtaTest - ${interaction.user.id}`)
			        .setLabel('Teste GTA')
			        .setStyle(ButtonStyle.Success),	
			    new ButtonBuilder()
			        .setCustomId(`rdoTest - ${interaction.user.id}`)
			        .setLabel('Teste RDO')
			        .setStyle(ButtonStyle.Danger),			
			    new ButtonBuilder()
			        .setCustomId(`confirmback - ${interaction.user.id}`)
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
				

				await interaction.deferUpdate();
				if (AdminRequired() === undefined) {
					if (lang === "en") {
						await interaction.followUp({ content: `It looks like this is your first time using this command. Please try the start button again.`, ephemeral: true });
					}
					else if (lang === "es") {
						await interaction.followUp({ content: `Esta es la primera vez que usas este comando. Vuelva a intentar el botón Inicio.`, ephemeral: true });
					}
					else if (lang === "ru") {
						await interaction.followUp({ content: `Вы впервые используете эту команду. Повторите попытку нажатия кнопки «Пуск».`, ephemeral: true });
					}
					else if (lang === "de") {
						await interaction.followUp({ content: `Dies ist das erste Mal, dass Sie diesen Befehl verwenden. Wiederholen Sie die Startschaltfläche.`, ephemeral: true });
					}
					else if (lang === "pt") {
						await interaction.followUp({ content: `Esta é a primeira vez que você usa este comando. Tente o botão Iniciar novamente.`, ephemeral: true });
					}
					else {
						await interaction.followUp({ content: `It looks like this is your first time using this command. Please try the start button again.`, ephemeral: true });
					}
				}	
					
				else if (interaction.user.id === buttonUserID) {
					if (lang === "en") {
						await interaction.editReply({ embeds: [confirmEmbed], components: [confirmButtons] }).catch(err => console.log(`confirmEmbed Error: ${err}`));	
					}
					else if (lang === "es") {
						await interaction.editReply({ embeds: [confirmEmbedEs], components: [confirmButtonsEs] }).catch(err => console.log(`confirmEmbed Error: ${err}`));
					}
					else if (lang === "ru") {
						await interaction.editReply({ embeds: [confirmEmbedRu], components: [confirmButtonsRu] }).catch(err => console.log(`confirmEmbed Error: ${err}`));
					}
					else if (lang === "de") {
						await interaction.editReply({ embeds: [confirmEmbedDe], components: [confirmButtonsDe] }).catch(err => console.log(`confirmEmbed Error: ${err}`));	
					}
					else if (lang === "pt") {
						await interaction.editReply({ embeds: [confirmEmbedPt], components: [confirmButtonsPt] }).catch(err => console.log(`confirmEmbed Error: ${err}`));
					}
					else {
						await interaction.editReply({ embeds: [confirmEmbed], components: [confirmButtons] }).catch(err => console.log(`confirmEmbed Error: ${err}`));
					}					
				} 
					
				else {
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
						await interaction.followUp({ content: `These buttons are not for you.`, ephemeral: true });
					}
				}

			}}); //end fs.eadFile LANGDataBase
	
	}); //end fs.readFile GTADataBase
	}); //end fs.readFile RDODataBase
	}) //end fs.readFile rolesDataBase			
	
		}); //end fs:readFile for guildID and Admin check

				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 2))				
		
		} //end if start
	},
};




	