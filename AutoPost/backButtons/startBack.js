const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');


module.exports = {
	name: 'interactionCreate',
	async execute(interaction, user) {

		if (!interaction.isButton()) {return};
		if ( (interaction.customId.startsWith(`rdostartback -`)) || (interaction.customId.startsWith(`gtastartback -`)) ) {

			let rdo_gta = "";
			if (interaction.customId.startsWith(`rdostartback -`)) {
				rdo_gta += 'rdo';
			} else {
				rdo_gta += 'gta';
			} 

		let buttonUserID01 = (interaction.customId).split(`${rdo_gta}startback - `);
		let buttonUserID = buttonUserID01[1];
			//console.log(`startBack buttonUserID: ${buttonUserID}`);
			//console.log(`startBack interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`);
			//console.log(`startBack interaction.user.id: ${interaction.user.id} && buttonUserID: ${buttonUserID}`);

//--BEGIN TRANSLATIONS--//

		var lang = await LANG.LANG(interaction);
		//console.log(`LANG:${await LANG.LANG(interaction)}`);	

		function startTitle() {
			if (lang === "en") {
				return `Start Auto Posting`;
			}
			if (lang === "es") {
				return `Iniciar publicación automática`;
			}			
			if (lang === "ru") {
				return `Начать автоматические публикации`;
			}		
			if (lang === "de") {
				return `Automatische Beiträge starten`;
			}		
			if (lang === "pt") {
				return `Iniciar publicações automáticas`;
			}			
			else {
				return `Start Auto Posting`;
			}
		}

		function startDesc() {
			if (lang === "en") {
				return `Click **\'GTA\'** to set up GTA Online Auto Posts for **every Thursday at 2:00 PM EST**.

Click **\'RDO\'** to set up Red Dead Online Auto Posts for **the first Tuesday of every month at 2:00 PM EST**.`;
			}
			if (lang === "es") {
				return `Haga clic en **\'GTA\'** para comenzar a publicar publicaciones automáticas en línea de GTA Online para **todos los jueves a las 2:00 PM EST**.

Haga clic en **\'RDO\'** para comenzar a publicar publicaciones automáticas de Red Dead Online para **el primer martes de cada mes a las 2:00 PM EST**.`;
			}
			if (lang === "ru") {
				return `Щелчок **\'GTA\'** чтобы начать автоматическую публикацию GTA Online Auto Posts для **каждый четверг в 14:00 EST**.

Щелчок **\'RDO\'** чтобы начать автоматическую публикацию Red Dead Online для **первого вторника каждого месяца в 14:00 EST**.`;
			}
			if (lang === "de") {
				return `Klicken Sie auf **\'GTA\'**, GTA Online Auto-Beiträge für jeden Donnerstag um **14:00 EST** zu starten.

Klicken Sie auf **\'RDO\'**, Red Dead Online Auto-Beiträge für **den ersten Dienstag um jedes Monats 14:00 EST** zu starten.`;
			}		
			if (lang === "pt") {
				return `Clique **\'GTA\'** para iniciar GTA Online auto posts para **todas as quintas-feiras às 14:00 EST**.

Clique **\'RDO\'** para iniciar Red Dead Online auto posts para **a primeira terça-feira de cada mês às 14:00 EST **.`;
			}
			else {
				return `Click **\'GTA\'** to set up GTA Online Auto Posts for **every Thursday at 2:00 PM EST**.

Click **\'RDO\'** to set up Red Dead Online Auto Posts for **the first Tuesday of every month at 2:00 PM EST**.`;				
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

//--END TRANSLATIONS--//

		const startEmbed = new EmbedBuilder()
			.setColor(0x00FF00) //Green
			.setTitle(`${startTitle()}`)
			.setDescription(`${startDesc()}`)	
			
		const startButtons = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtastart - ${interaction.user.id}`)
			        .setLabel('GTA')
			        .setStyle(ButtonStyle.Success),
			    new ButtonBuilder()
			        .setCustomId(`rdostart - ${interaction.user.id}`)
			        .setLabel('RDO')
			        .setStyle(ButtonStyle.Danger),		
					new ButtonBuilder()
			        .setCustomId(`startback - ${interaction.user.id}`)
			        .setLabel(`${goBack()}`)
			        .setStyle(ButtonStyle.Secondary),	
			);				

//begin checking for permissions
		await interaction.deferUpdate();
		if (!interaction.user.id === buttonUserID) {
			await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
		}	
		else if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) {
				await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startEmbed Error: ${err}`));	
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
				
	
	} //end if start
	},
}