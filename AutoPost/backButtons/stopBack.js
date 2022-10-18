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
		if ( (interaction.customId.startsWith(`rdostopback -`)) || (interaction.customId.startsWith(`gtastopback -`)) ) {

		let rdo_gta = "";
			if (interaction.customId.startsWith(`rdostopback -`)) {
				rdo_gta += 'rdo';
			} else {
				rdo_gta += 'gta';
			}

		let buttonUserID01 = (interaction.customId).split(`${rdo_gta}stopback - `);
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


		const startEmbed = new EmbedBuilder()
			.setColor(`Red`) 
			.setTitle(`Stop Auto Posting`)
			.setDescription(`Click **\'GTA\'** to remove a channel from receiving Grand Theft Auto V Online Auto Posts.

Click **\'RDO\'** to remove a channel from receiving Red Dead Redemption II Online Auto Posts.`)		

		const startButtons = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtastop - ${interaction.user.id}`)
			        .setLabel('GTA')
			        .setStyle(ButtonStyle.Success),
			    new ButtonBuilder()
			        .setCustomId(`rdostop - ${interaction.user.id}`)
			        .setLabel('RDO')
			        .setStyle(ButtonStyle.Danger),		
					new ButtonBuilder()
			        .setCustomId(`stopback - ${interaction.user.id}`)
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
			if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) {
				await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startEmbed Error: ${err}`));
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
				if (guildRoleIds.length === 0) { //no role required
					await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
				}
				else if (hasARole >= 1) { //if the user has at least one role listed
					await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
				}
				else if ((interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID)) {
					await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startButtons Error: ${err.stack}`));
				}					
				else {
					await interaction.followUp({content: `You do not have the required permissions to do that.`, ephemeral: true})
				}
			} 
			else  {
				await interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
			}
		}
		else {
			await interaction.followUp({ content: `There was an error executing this button.`, ephemeral: true });
		} //end checking for permissions		

		}); //end fs:readFile			
			
				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 2))	
			
		} //end if interaction starts with rdostartback - gtastartback

	},
}