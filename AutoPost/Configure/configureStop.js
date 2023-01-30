const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log

			if (!interaction.isButton()) {return};
			if (interaction.customId.startsWith(`configurestop -`)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("configurestop - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin configurestop - ${interaction.customId}`);

			let AdminNameStop = "";
			let AdminYesNoStop = "";
        let adminRoleBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
        if (adminRoleBoolean[1].startsWith("yes")) { //If Admin permissions are required - opposite of configurestop
                AdminNameStop += 'Administrators';
                AdminYesNoStop += 'yes';
        }		
        else {
            AdminNameStop += 'No Role Selected';
            AdminYesNoStop += 'undefinedrole';
        }

			let userRoles = "";
				interaction.member.roles.cache.forEach(role => {
						userRoles += `${role.id} - `;					
				});
					//console.log(`userRoles: ${userRoles}`);
				
			let userHighestRoleRawPosition = 0;
				interaction.guild.roles.cache.forEach(role => {
					if ((userRoles.includes(role.id)) && (role.rawPosition >= userHighestRoleRawPosition)) {
						userHighestRoleRawPosition = role.rawPosition;
					}
				});
					//console.log(`userHighestRoleRawPosition: ${userHighestRoleRawPosition}`);


//--BEGIN TRANSLATIONS--//

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
				
				function removeARole() {
					if (lang === "en") {
						return `Remove a Role`;	
					}
					else if (lang === "es") {
						return `Quitar un rol`;
					}
					else if (lang === "ru") {
						return `Удаление роли`;
					}
					else if (lang === "de") {
						return `Entfernen einer Rolle`;
					}
					else if (lang === "pt") {
						return `Remover uma função`;
					}
					else {
						return `Remove a Role`;
					}					
				}	

				function dropdownMenu(){
					if (lang === "en") {
						return `Click **the dropdown menu** to remove a role from being able to configure auto posts.`;	
					}
					else if (lang === "es") {
						return `Haga clic en el menú desplegable para eliminar un rol de poder configurar publicaciones automáticas.`;
					}
					else if (lang === "ru") {
						return `Щелкните раскрывающееся меню, чтобы удалить роль из возможности настройки автоматических публикации.`;
					}
					else if (lang === "de") {
						return `Klicken Sie auf das Dropdown-Menü, um eine Rolle von der Konfiguration automatischer Beiträge auszuschließen.`;
					}
					else if (lang === "pt") {
						return `Clique no menu suspenso para remover uma função de ser capaz de configurar postagens automáticas.`;
					}
					else {
						return `Click **the dropdown menu** to remove a role from being able to configure auto posts.`;
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

		fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
					
				const configureStopEmbed = new EmbedBuilder()
				.setColor(`0x00FFFF`) //Teal
				.setTitle(`${removeARole()}`)
				.setDescription(`${dropdownMenu()}`)	
				.setFooter({text: `${adminFooter()}`, iconURL: process.env.logo_link })
				
				let configureStopMenu = new ActionRowBuilder()
				    .addComponents(
				        new StringSelectMenuBuilder()
				        .setCustomId(`configurestopmenu - u:${interaction.user.id}`)
				        .setPlaceholder('Select a Role')
				        .addOptions([{
				            label: AdminNameStop,
				            description: AdminNameStop,
				            value: `configureStopMenu - u:${interaction.user.id} - r:${AdminYesNoStop}`,
				        }])
				    )
				interaction.guild.roles.cache.forEach(role => {
					//console.log(`role names: ${role.name}`)				
					if ((role.name != "@everyone") && (data.includes(`${role.id}`)) && (role.rawPosition <= userHighestRoleRawPosition) ) {
							//console.log(`role.rawPosition: ${role.rawPosition}`);
						configureStopMenu.components[0].addOptions([{
								label: `${role.name}`,
								description: `${role.name}`,
								value: `configureStopMenu - u:${interaction.user.id} r:${role.id}`,
						}]);
					}
				});	

				const backButton = new ActionRowBuilder()
					.addComponents(
							new ButtonBuilder()
					        .setCustomId(`configurestopback - ${interaction.user.id}`)
					        .setLabel(`${goBack()}`)
					        .setStyle(ButtonStyle.Secondary),	
					);				

		if (interaction.user.id === buttonUserID) { 
        await interaction.editReply({ embeds: [configureStopEmbed], components: [configureStopMenu, backButton] })
        .catch(err => console.log(`configureStopEmbed+Menu Error: ${err.stack}`));
    } else {
       interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
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
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 5))		

				}) //end fs.readFile for rolesDataBase.txt

				}}); //end fs.readFile for LANGDataBase.txt
				
		} // end if configureStop button
		
		}); //end fs:readFile

		
		
	},
};




	