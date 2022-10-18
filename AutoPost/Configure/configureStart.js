const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require('discord.js');
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

				const configureStartEmbed = new EmbedBuilder()
				.setColor(`0x00FFFF`) //Teal
				.setTitle(`Add a Role`)
				.setDescription(`Click **the dropdown menu** to allow a role to configure auto posts.`)	
				.setFooter({text: `Administrators can always configure auto posts.`, iconURL: process.env.logo_link })

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
				        new SelectMenuBuilder()
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
							.setLabel('Go Back')
							.setStyle(ButtonStyle.Secondary),	
			);		

		if (configureRoleCount <= 23) { //if there are 23 roles or fewer
				

			if (interaction.user.id === buttonUserID) { 
	        await interaction.editReply({ embeds: [configureStartEmbed], components: [configureStartMenu, backButton] })
	        .catch(err => console.log(`configureStartEmbed+Menu Error: ${err.stack}`));
	    } else {
	       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
	    }
				
		} //end if there are fewer than 23 roles
		else if (configureRoleCount >= 24) {	

			let configureStartMenu2 = new ActionRowBuilder()
			    .addComponents(
			        new SelectMenuBuilder()
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
		       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
		    }				
				
			} //end if configureRoleCount >24				

		

				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 2))	
		
		} // end if configurestart button
		
		}); //end fs:readFile
		
	},
};




	