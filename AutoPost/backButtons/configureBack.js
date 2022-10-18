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

		if (!interaction.isButton()) {return};
		if ( (interaction.customId.startsWith(`configurestartback -`)) ||  (interaction.customId.startsWith(`configurestopback -`)) ) {

		let start_stop = "";
		if (interaction.customId.startsWith(`configurestartback -`)) {
			start_stop += "configurestart";
		} else {
			start_stop += "configurestop";
		}
			
		let buttonUserID01 = (interaction.customId).split(`${start_stop}back - `);
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
				if (AdminRequiredBoolean[1].startsWith(`yes`)) {
					return "AdminRequiredYes";
				}
				else {
					return "AdminRequiredNo";
				}
			}	

			let channelIDArray = [];
			interaction.guild.channels.cache.forEach(channel => {
			    if (channel.type === 0) {
			        channelIDArray.push(`${channel.id}`);
			    }
			});
			//console.log(`channelIDArray: ${channelIDArray}`);			



			const configureEmbed = new EmbedBuilder()
.setColor(`0x00FFFF`) //Teal
.setTitle(`Add or Remove a Role`)
.setDescription(`Click **\'Add\'** to add a role that can configure auto posts.

Click **\'Remove\'** to remove a role that can configure auto posts.`)		

const configureButtons = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
        .setCustomId(`configureadd - ${interaction.user.id}`)
        .setLabel('Add')
        .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
        .setCustomId(`configurestop - ${interaction.user.id}`)
        .setLabel('Remove')
        .setStyle(ButtonStyle.Danger),
		new ButtonBuilder()
			.setCustomId(`configureback - ${interaction.user.id}`)
			.setLabel('Go Back')
			.setStyle(ButtonStyle.Secondary),	
);	


                //begin checking for permissions
                await interaction.deferUpdate();
                //console.log(`AdminRequired(): ${AdminRequired()}`)
			
								if (interaction.user.id != buttonUserID) {
									await interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
								}					
                else if (AdminRequired() === "AdminRequiredYes") { //if admin permissions are required
                    if ((interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) {
                        await interaction.editReply({ embeds: [configureEmbed], components: [configureButtons] }).catch(err => console.log(`configureEmbed Error: ${err}`));
                    } 
                    else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                        await interaction.followUp({content: `You do not have the required permissions to do that.`, ephemeral: true})
                    }
                    else if (!interaction.user.id === buttonUserID)  {
                        await interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
                    }
                }	
                else if (AdminRequired() === "AdminRequiredNo") { //if admin permissions are NOT required
                    if ((interaction.user.id === buttonUserID) ) { 
                
                        //console.log(`guildRoleIds.length: ${guildRoleIds.length}`)
                        let hasARole = 0;
                        for (a=0;a<=guildRoleIds.length - 1;a++) { //iterates through each role
                            //console.log(`guildRoleIds at ${i}: ${guildRoleIds[i]}`);
                            if (interaction.member.roles.cache.has(guildRoleIds[a])) {
                                hasARole += 1;
                            }
                        } //end loop to check for hasARole
                        //console.log(`hasARole: ${hasARole} && required roles:${guildRoleIds.length}`)
                        if (guildRoleIds.length === 0) { //no role required - @everyone allowed
                            await interaction.editReply({ embeds: [configureEmbed], components: [configureButtons] }).catch(err => console.log(`configureEmbed Error: ${err}`));
                        }
                        else if (hasARole >= 1) { //if the user has at least one role listed
                            await interaction.editReply({ embeds: [configureEmbed], components: [configureButtons] }).catch(err => console.log(`configureEmbed Error: ${err}`));
                        } 
												else if ((interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID)) {
													await interaction.editReply({ embeds: [configureEmbed], components: [configureButtons] }).catch(err => console.log(`configureEmbed Error: ${err}`));
												}
												else {
                            await interaction.followUp({content: `You do not have the required permissions to do that.`, ephemeral: true})
                        }
                    } //end if admin permission not required
                    else {
                        await interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
                    }
                }	
                else {
                    await interaction.followUp({ content: `There was an error executing this button.`, ephemeral: true });
                } //end checking for permissions
	
		}); //end fs:readFile for guildID and Admin check
			
				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 2))	
			
		} //end if interaction starts with startback

	},
}