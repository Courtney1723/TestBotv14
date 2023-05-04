const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isButton()) {return};
		if (interaction.customId.startsWith(`stop - `)) {
			//console.log(`begin stop: '${interaction.customId}'`);		

		let buttonUserID01 = (interaction.customId).split("stop - ");
		let buttonUserID = buttonUserID01[1];
			//console.log(`buttonUserID: ${buttonUserID}`);
			//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)

//------BEGIN TRANSLATIONS-----//

	var lang = await LANG.LANG(interaction);
	//console.log(`LANG:${await LANG.LANG(interaction)}`);	

	function stopTitle() {
		if (lang === "en") {
			return `Stop Auto Posting`;
		}
		else if (lang === "es") {
			return `Detener publicaciones automáticas`;
		}
		else if (lang === "ru") {
			return `Остановка автоматических сообщений`;
		}
		else if (lang === "de") {
			return `Automatische Beiträge stoppen`;
		}
		else if (lang === "pt") {
			return `Parar postagens automáticas`;
		}
		else {
			return `Stop Auto Posting`;
		}		
	}

	function stopDesc() {
		if (lang === "en") {
			return `Click **\'GTA\'** to remove a channel from receiving GTA Online Auto Posts.
			\nClick **\'RDO\'** to remove a channel from receiving Red Dead Online Auto Posts.`;
		}
		else if (lang === "es") {
			return `Haga clic en **\'GTA\'** para quitar un canal de GTA Online.
			\nHaga clic en **\'RDO\'** para quitar un canal Red Dead Online.`;
		}
		else if (lang === "ru") {
			return `Щелчок **\'GTA\'** удалить канал GTA Online.
			\nЩелчок **\'RDO\'** удалить канал Red Dead Online.`;
		}
		else if (lang === "de") {
			return `Klicken **\'GTA\'** So entfernen Sie einen GTA Online-Kanal.
			\nKlicken **\'RDO\'** So entfernen Sie einen Kanal-Red Dead Online.`;
		}
		else if (lang === "pt") {
			return `Clique **\'GTA\'** para remover um canal GTA Online.
			\nClique **\'RDO\'** para remover um canal Red Dead Online.`;
		}
		else {
			return `Click **\'GTA\'** to remove a channel from receiving GTA Online Auto Posts.
			\nClick **\'RDO\'** to remove a channel from receiving Red Dead Online Auto Posts.`;
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

	function firstCommandString() {
		if (lang === "en") {
			return `It looks like this is your first time using this command. Please try the stop button again.`;
		}
		else if (lang === "es") {
			return `Esta es la primera vez que usas este comando. Vuelva a intentar el botón Detener.`;
		}
		else if (lang === "ru") {
			return `Эта команда используется впервые. Попробуйте нажать кнопку Стоп еще раз.`;
		}
		else if (lang === "de") {
			return `Dies ist das erste Mal, dass Sie diesen Befehl verwenden. Wiederholen Sie die Schaltfläche Stopp.`;
		}
		else if (lang === "pt") {
			return `Esta é a primeira vez que você usa este comando. Tente o botão Parar novamente.`;
		}
		else {
			return `It looks like this is your first time using this command. Please try the stop button again.`;
		}				
	}

	function missingPermissions()	{
		if (lang === "en") {
			return `You do not have the required permissions to do that.`;
		}
		else if (lang === "es") {
		  return `No tienes permiso para hacer eso.`;
		}
		else if (lang === "ru") {
		  return `У вас нет разрешения на это.`;
		}
		else if (lang === "de") {
		  return `Sie haben keine Erlaubnis dazu.`;
		}
		else if (lang === "pt") {
		  return `Você não tem permissão para fazer isso.`;
		}
		else {
		  return `You do not have the required permissions to do that.`;
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

	function errorString() {
		if (lang === "en") {
			return `There was an error executing this button.`;
		}
		if (lang === "es") {
			return `Se ha producido un error.`;
		}
		if (lang === "ru") {
			return `Произошла ошибка.`;
		}
		if (lang === "de") {
			return `Es ist ein Fehler aufgetreten.`;
		}
		if (lang === "pt") {
			return `Ocorreu um erro.`;
		}			
		else {
			return `There was an error executing this button.`;
		}			
	}	


//-----END TRANSLATIONS-----//

		var subscriptionCheckGTA = false;
			fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) { //Checks for GTA subscriptions
				if (err) {console.log(`Error: ${err}`)} //If an error, console.log
	
				if (!data.includes(interaction.guild.id)) {
					subscriptionCheckGTA = true;
				}

		var subscriptionCheckRDO = false;
			fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) { //Checks for RDO subscriptions
				if (err) {console.log(`Error: ${err}`)} //If an error, console.log
	
				if (!data.includes(interaction.guild.id)) {
					subscriptionCheckRDO = true;
				}	
						  
			const stopEmbed = new EmbedBuilder()
			.setColor(0xFF0000) //Red
			.setTitle(`${stopTitle()}`)
			.setDescription(`${stopDesc()}`)		

		const stopButtons = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`gtastop - ${interaction.user.id}`)
					.setLabel('GTA')
					.setStyle(ButtonStyle.Success)
					.setDisabled(subscriptionCheckGTA),	
				new ButtonBuilder()
					.setCustomId(`rdostop - ${interaction.user.id}`)
					.setLabel('RDO')
					.setStyle(ButtonStyle.Danger)
					.setDisabled(subscriptionCheckRDO),	
					new ButtonBuilder()
					.setCustomId(`stopback - ${interaction.user.id}`)
					.setLabel(`${goBack()}`)
					.setStyle(ButtonStyle.Secondary),			
			);						  	

//begin checking for permissions
		await interaction.deferUpdate(); 
		if (!interaction.user.id === buttonUserID) {
			await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
		}		
		else if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) {
				await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => {console.log(`stopEmbed Error: ${err.stack}`); process.kill(1)});	
		} 	
		else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) { 
			await interaction.followUp({content: `${missingPermissions()}`, ephemeral: true});
		}
		else {
			await interaction.followUp({ content: `${errorString()}`, ephemeral: true });
		} //end checking for permissions		

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

				
				}); //end fs.readFile for RDOData.txt
				}); //end fs.readFile for GTAData.txt
							
	
	} //end if stop

		
	},
};
