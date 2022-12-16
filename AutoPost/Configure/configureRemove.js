const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, optionstyle, StringSelectMenuBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Role, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isStringSelectMenu()) {return};
		if (interaction.customId.startsWith(`configurestopmenu -`)) {
			//console.log(`begin configureStartMenu: '${interaction.customId}'`);		

		let menuUserID02 = (interaction.customId).split("configurestopmenu - u:");
		let menuUserID01 = menuUserID02[1].split(" - ");
		let menuUserID = menuUserID01[0];
			//console.log(`configureStartMenu menuUserID: ${menuUserID}`);
			//console.log(`configureStartMenu interaction.user.id === menuUserID?: ${interaction.user.id === menuUserID}`)	

		let menuRoleID01 = (interaction.values).toString().split(`r:`);
		let menuRoleID = menuRoleID01[1];
				//console.log(`configureStartMenu menuRoleID: ${menuRoleID}`)

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
				if (AdminRequiredBoolean[1].startsWith(`yes`)) {
					return "AdminRequiredYes";
				}
				else {
					return "AdminRequiredNo";
				}
			}		


if (interaction.user.id != menuUserID) {
	interaction.reply({ content: `These options aren't for you!`, ephemeral: true });
}
else if (menuRoleID === `undefinedrole`) { //if the Admin role is already required - error

    const configureDuplicateEmbed = new EmbedBuilder()
    .setColor(`Orange`) 
    .setTitle(`Please Try Again`)
    .setDescription(`You selected an invalid response "No Role Selected".\nPlease Try again. || have a good day! ||`)	
    
    await interaction.deferUpdate();
    if (interaction.user.id === menuUserID) {
        await interaction.followUp({ embeds: [configureDuplicateEmbed], components: [], ephemeral: true })
        .catch(err => console.log(`configureDuplicateEmbed Error: ${err}`));
        } else {
       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
    }

  } //end if menuRoleID === `undefinedrole`
  else if (menuRoleID.includes('yes')) { //Make the Admin permission not required
		//console.log(`adding admin role for ${guildIdDB}`);

			let roleIDArray = [];
			interaction.guild.roles.cache.forEach(role => {
				if (data.includes(`${role.id}`)) {
					roleIDArray.push(`${role.id}`);
				}
			});
			roleIDArray.shift(); //removes the @everyone role
			//console.log(`roleIDArray[]: ${roleIDArray}`);

			let everyoneCheck = "";
			if (roleIDArray.length <= 0) {
					everyoneCheck += `\n• @everyone can configure auto posts now!\n• Try the **/autopost** command again and click **\'Configure\'** to add a role.`;
				
			}
			console.log(`roleIDArray length: ${roleIDArray.length}`);
		
    const configureConfirmAddEmbed = new EmbedBuilder()
        .setColor(`Green`) 
        .setTitle(`Success!`)
        .setDescription(`Administrator privileges are no longer required to configure auto posts.\n${everyoneCheck}`)	

    await interaction.deferUpdate();
		
    if (interaction.user.id === menuUserID) { //begin removing admin permissions
        await interaction.editReply({ embeds: [configureConfirmAddEmbed], components: [] })
        .catch(err => console.log(`configureConfirmAddEmbed Error: ${err}`));

				let guildIdDB = `${interaction.guild.id}`;
				guildCount = data.split(`guild:${guildIdDB}`).length - 1;
					//console.log(`guildCount: ${guildCount}`);
		
				const find = `${guildIdDB} - admin:yes`;
				const replace = `${guildIdDB} - admin:no`;
				let newData = data;
					for (i=0;i<=guildCount-1;i++) { //iterates through every instance of required roles by guild
						newData = newData.replace(new RegExp(find, 'g'), replace);
					}
				//console.log(`newData: ${newData}`);
		                                        
		    //Replaces the rolesDataBase.txt file with removed Admin permission for the guild
		    fs.writeFile(`./rolesDataBase.txt`,`${newData}`, err => {
		        if (err) {
		            console.error(err)
		            return
		            }					
		        }); //end fs.writeFile to change the admin privileges	
					
		    } else {
		       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
		    }
		
		    }    // end removing Admins as a required permission 
				else { //start removing a role
		
					let roleIDArray = [];
					interaction.guild.roles.cache.forEach(role => {
						if (data.includes(`${role.id}`)) {
							roleIDArray.push(`${role.id}`);
						}
					});
					roleIDArray.shift(); //removes the @everyone role
					//console.log(`roleIDArray[]: ${roleIDArray}`);
		
					let everyoneCheck = "";
					if (roleIDArray.length <= 1) {
						if (AdminRequired() === `AdminRequiredNo`) {
							everyoneCheck += `\n• @everyone can configure auto posts now!\n• Try the **/autopost** command again and click **\'Configure\'** to add a role.`;
						}
						
					}
		
					const configureAddEmbed = new EmbedBuilder()
						.setColor(`Green`) 
						.setTitle(`Success!`)
						.setDescription(`The <@&${menuRoleID}> role is now no longer allowed to configure auto posts.\n${everyoneCheck}`)	
		
			    await interaction.deferUpdate();
					if (interaction.user.id != menuUserID) {
						interaction.followUp({ content: `These options aren't for you!`, ephemeral: true });
					}					
			    else if (interaction.user.id === menuUserID) {
			        await interaction.editReply({ embeds: [configureAddEmbed], components: [] })
			        .catch(err => console.log(`configureAddEmbed Error: ${err}`));
		
					let guildIdDB = `${interaction.guild.id}`;
					let AdminNameAdd = "";
					let AdminYesNoAdd = "";
		        let adminRoleBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
		        if (adminRoleBoolean[1].startsWith("yes")) { //If Admin permissions are required - ooposite of configureadd
		                AdminNameAdd += 'Administrators';
		                AdminYesNoAdd += 'yes';
		        }		
		        else {
		            AdminNameAdd += 'No Role Selected';
		            AdminYesNoAdd += 'undefinedrole';
		        }
					function AdminYesNo() {
						if (AdminYesNoAdd === 'undefinedrole') {
							return 'no';
						}
						else {
							return 'yes';
						}
					}
		
					// console.log(`role:${menuRoleID}`);
					// console.log(`AdminYesNo:${AdminYesNo()}`);
					// console.log(`data.replace: ${data.replace(`\nguild:${interaction.guild.id} - admin:${AdminYesNo()} - role:${menuRoleID} - `, "")}`)
		
					fs.writeFile('./rolesDataBase.txt', `${data.replace(`\nguild:${interaction.guild.id} - admin:${AdminYesNo()} - role:${menuRoleID} - `, "")}`, function (err) {
						if (err) throw err;
						console.log('A user removed a role from auto posts.');
					}); //end fs:writeFile to remove a role from autoposts

				
	    } else {
	       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
	    }		


		} // end adding a new role to rolesDataBase.txt
			

		});//end fs:readFile	

		setTimeout(() => {
			interaction.editReply({components: []})
		}, (60000 * 2))
			
		}// end if interaction.customId === 'configureStartMenu'
		

	},
};




	