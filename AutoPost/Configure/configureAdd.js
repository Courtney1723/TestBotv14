const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, optionstyle, SelectMenuBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Role, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile


module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isSelectMenu()) {return};
		if ((interaction.customId.startsWith(`configureStartMenu -`)) || (interaction.customId.startsWith(`configureStartMenu2 -`))) {
			//console.log(`begin configureStartMenu: '${interaction.customId}'`);		

		let oneOrTwo = "";
			if (interaction.customId.startsWith(`configureStartMenu2 -`)) {
				oneOrTwo += "2";
			}

		let menuUserID02 = (interaction.customId).split(`configureStartMenu${oneOrTwo} - u:`);
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
    .setDescription(`You selected an invalid response "No Role Selected".\nPlease Try again. || ♪♬ ||`)	
    
    await interaction.deferUpdate();
    if (interaction.user.id === menuUserID) {
        await interaction.followUp({ embeds: [configureDuplicateEmbed], components: [], ephemeral: true })
        .catch(err => console.log(`configureDuplicateEmbed Error: ${err}`));
        } else {
       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
    }

  } //end if menuRoleID === `undefinedrole`
  else if (menuRoleID.includes('yes')) { //Make the Admin permission required
		//console.log(`adding admin role for ${guildIdDB}`);
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			interaction.reply({ content: `You do not have the required permissions to do that.`, ephemeral: true });
		} 
		else  if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) { 
    const configureConfirmAddEmbed = new EmbedBuilder()
        .setColor(`Green`) 
        .setTitle(`Success!`)
        .setDescription(`Administrator privileges are now **required** to configure autoposts.
				\n• Any user who does not have administrator privileges may not configure auto posts \n**even if they have a whitelisted role.**`)	

		    await interaction.deferUpdate();
		    if (interaction.user.id === menuUserID) {
		        await interaction.editReply({ embeds: [configureConfirmAddEmbed], components: [] })
		        .catch(err => console.log(`configureConfirmAddEmbed Error: ${err}`));
		
				let guildIdDB = `${interaction.guild.id}`;
				guildCount = data.split(`guild:${guildIdDB}`).length - 1;
					//console.log(`guildCount: ${guildCount}`);
		
				const find = `${guildIdDB} - admin:no`;
				const replace = `${guildIdDB} - admin:yes`;
				let newData = data;
					for (i=0;i<=guildCount-1;i++) { //iterates through every instance of required roles by guild
						newData = newData.replace(new RegExp(find, 'g'), replace);
					}
				//console.log(`newData: ${newData}`);
		                                        
		    //Replaces the rolesDataBase.txt file with Admin permission for the guild
		    fs.writeFile(`./rolesDataBase.txt`,`${newData}`, err => {
		        if (err) {
		            console.error(err)
		            return
		            }					
		        }); //end fs.writeFile to change the admin privileges				
			
    } else {
       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
    }

			} //end if user has admin privileges
    }    // end adding Admins as a required permission 
		else {

			let AdminCheck = "";
			if (AdminRequired() === `AdminRequiredYes`) {
				AdminCheck += `\n• The Administrator privilege is required! \n• Any user with the <@&${menuRoleID}> role must also have administrator privileges in order to configure auto posts.\n• Try the **/autopost** comand again and click **\'Configure\'** to remove the administrator requirement.`;
			}

			const configureAddEmbed = new EmbedBuilder()
				.setColor(`Green`) 
				.setTitle(`Success!`)
				.setDescription(`Anyone with the <@&${menuRoleID}> role can now configure auto posts.\n${AdminCheck}`)	

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
		        if (adminRoleBoolean[1].startsWith("yes")) { //If Admin permissions are required
		                AdminNameAdd += 'No Role Selected';
		                AdminYesNoAdd += 'undefinedrole';
		        }		
		        else {
		            AdminNameAdd += 'Administrators';
		            AdminYesNoAdd += 'yes';
		        }
					function AdminYesNo() {
						if (AdminYesNoAdd === 'undefinedrole') {
							return 'yes';
						}
						else {
							return 'no';
						}
					}
		
					fs.appendFile(`rolesDataBase.txt`,`guild:${guildIdDB} - admin:${AdminYesNo()} - role:${menuRoleID} - \n`, err => {
					 if (err) {
						 console.error(err)
						 return
						}					
					}); // end fs:appendFile to add a channel for gta autop posts	

				
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




	