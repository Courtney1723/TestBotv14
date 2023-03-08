const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log

			if (!interaction.isButton()) {return};
			if (interaction.customId.startsWith(`configureadd -`)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("configureadd - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin configureadd - ${interaction.customId}`);

			let AdminNameAdd = "";
			let AdminYesNoAdd = "";
        let adminRoleBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
        if (adminRoleBoolean[1].startsWith("yes")) { //If Admin permissions are required
                AdminNameAdd += 'No Role Selected';
                AdminYesNoAdd += 'undefinedrole';
        }		
        else { //if admin permissions are not required
            AdminNameAdd += 'Administrators';
            AdminYesNoAdd += 'yes';
        }

//--BEGIN TRANSLATIONS--//

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
				function AddARole() {
					if (lang === "en") {
							return `Add a Role`;
					}
					else if (lang === "es") {
						return `Agregar un rol`;
					}
					else if (lang === "ru") {
						return `Добавление роли`;
					}
					else if (lang === "de") {
						return `Hinzufügen einer Rolle`;
					}
					else if (lang === "pt") {
						return `Adicionar uma função`;
					}
					else {
						return `Add a Role`;
					}					
				}			

				function dropdownMenu() {
					if (lang === "en") {
						return `Click **the dropdown menu** to allow a role to configure auto posts.`;	
					}
					else if (lang === "es") {
						return `Haga clic en el menú desplegable para permitir que un rol configure publicaciones automáticas.`;
					}
					else if (lang === "ru") {
						return `щелкните раскрывающееся меню, чтобы разрешить роли настраивать автоматические публикации.`;
					}
					else if (lang === "de") {
						return `Klicken Sie auf das Dropdown-Menü, damit eine Rolle automatische Beiträge konfigurieren kann.`;
					}
					else if (lang === "pt") {
						return `Clique no menu suspenso para permitir que uma função configure postagens automáticas.`;
					}
					else {
						return `Click **the dropdown menu** to allow a role to configure auto posts.`;
					}					
				}

				function adminFooter() {
					if (lang === "en") {
						return `Administrators can always configure auto posts.`;	
					}
					else if (lang === "es") {
						return `Los administradores siempre pueden configurar publicaciones automáticas.`;
					}
					else if (lang === "ru") {
						return `Администраторы всегда могут настроить автоматические публикации.`;
					}
					else if (lang === "de") {
						return `Administratoren können automatische Beiträge jederzeit konfigurieren.`;
					}
					else if (lang === "pt") {
						return `Os administradores sempre podem configurar postagens automáticas.`;
					}
					else {
						return `Administrators can always configure auto posts.`;
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

//--END TRANSLATIONS--//				

				const configureStartEmbed = new EmbedBuilder()
				.setColor(`0x00FFFF`) //Teal
				.setTitle(`${AddARole()}`)
				.setDescription(`${dropdownMenu()}`)	
				.setFooter({text: `${adminFooter()}`, iconURL: process.env.logo_link })

		fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log					

			let userHighestRoleRawPosition = 0;
			let userRoles = "";
				interaction.member.roles.cache.forEach(role => {
						userRoles += `${role.id} - `;					
				});
					//console.log(`userRoles: ${userRoles}`)
			let configureRoleCount = 1;
				interaction.guild.roles.cache.forEach(role => {
						//console.log(`role.rawPosition && name: ${role.rawPosition} - ${role.name}`);
					if ((role.name != "@everyone") && (!data.includes(`${role.id}`)) && (role.managed === false) ) { 
						configureRoleCount += 1;
					}
					if ((userRoles.includes(role.id)) && (role.rawPosition >= userHighestRoleRawPosition) ) {
							userHighestRoleRawPosition = role.rawPosition; 
					}					
				});
				if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
						configureRoleCount += 1;
				}
					//console.log(`userHighestRoleRawPosition: ${userHighestRoleRawPosition}`);
				
			var configureRoleNames = new Array(configureRoleCount);
			var configureRoleIDs = new Array(configureRoleCount);
			interaction.guild.roles.cache.forEach(role => {
				if ((role.name != "@everyone") && (!data.includes(`${role.id}`)) && (role.managed === false) && ((role.rawPosition < userHighestRoleRawPosition) || (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) ) ) { 
					configureRoleNames.splice((role.rawPosition), 1, role.name);   //configureRoleNames.push(role.name);
					configureRoleIDs.splice((role.rawPosition), 1, role.id);   //configureRoleIDs.push(role.id);  	
				}
			});
			configureRoleNames.reverse(); //I'm not sure why the rawPositions are backwards 
			configureRoleIDs.reverse();
				//console.log(`configureRoleIDs: ${configureRoleIDs}`);
				//console.log(`configureRoleCount: ${configureRoleCount}`);
				//console.log(`configureRoleNames: ${configureRoleNames}`);				
				
				let configureStartMenu = new ActionRowBuilder()
				    .addComponents(
				        new StringSelectMenuBuilder()
				        .setCustomId(`configureStartMenu - u:${interaction.user.id}`)
				        .setPlaceholder('Select a Role')
				        .addOptions([{
				            label: AdminNameAdd,
				            description: AdminNameAdd,
				            value: `configureStartMenu - u:${interaction.user.id} - r:${AdminYesNoAdd}`,
				        }])
				    )
				for (i = 0; i <= 23; i++) { //iterates through roles #0-23
					//console.log(`configureRoleNames at ${i}: ${configureRoleNames[i]}`);
					if ( (configureRoleNames[i] != undefined) ) {
			        configureStartMenu.components[0].addOptions([{
			            label: `${configureRoleNames[i]}`,
			            description: `${configureRoleNames[i]}`,
			            value: `configureStartMenu2 - u:${interaction.user.id} - r:${configureRoleIDs[i]}`,
			        }]);
			    }
				}

			const backButton = new ActionRowBuilder()
			.addComponents(
					new ButtonBuilder()
							.setCustomId(`configurestartback - ${interaction.user.id}`)
							.setLabel(`${goBack()}`)
							.setStyle(ButtonStyle.Secondary),	
			);		

		if (configureRoleCount <= 23) { //if there are 23 roles or fewer
				

			if (interaction.user.id === buttonUserID) { 
	        await interaction.editReply({ embeds: [configureStartEmbed], components: [configureStartMenu, backButton] })
	        .catch(err => console.log(`configureStartEmbed+Menu Error: ${err.stack}`));
	    } else {
	       interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
	    }
				
		} //end if there are fewer than 23 roles
		else if (configureRoleCount >= 24) {	

			let configureStartMenu2 = new ActionRowBuilder()
			    .addComponents(
			        new StringSelectMenuBuilder()
			        .setCustomId(`configureStartMenu2 - u:${interaction.user.id} - r:${configureRoleIDs[24]}`)
			        .setPlaceholder('Select a Role')
			        .addOptions([{
			            label: `${configureRoleNames[24]}`,
			            description: `${configureRoleNames[24]}`,
			            value: `configureStartMenu - u:${interaction.user.id} - r:${configureRoleIDs[24]}`,
			        }])
			    )	
				
				for (i = 25; i <= 47; i++) { //iterates through roles #25-47
			    if ( (configureRoleNames[i] != undefined) ) {
						//console.log(`configureRoleNames2 at ${i}: ${configureRoleNames[i]}`);
						//console.log(`configureRoleIDs2 at ${i}: ${configureRoleIDs[i]}`);						
			        configureStartMenu2.components[0].addOptions([{
			            label: `${configureRoleNames[i]}`,
			            description: `${configureRoleNames[i]}`,
			            value: `configureStartMenu2 - u:${interaction.user.id} - r:${configureRoleIDs[i]}`,
			        }]);
			    }
				}

				if (interaction.user.id === buttonUserID) { 
		        await interaction.editReply({ embeds: [configureStartEmbed], components: [configureStartMenu, configureStartMenu2, backButton] })
		        .catch(err => console.log(`configureStartEmbed+Menu Error: ${err.stack}`));
		    } else {
		       interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
		    }				
				
			} //end if configureRoleCount >24				

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

				}); //end fs.redFile for rolesDataBase.txt

				}}); //end fs.readFile for LANGDataBase.txt
		
		} // end if configurestart button
		
		}); //end fs:readFile
		
	},
};




	