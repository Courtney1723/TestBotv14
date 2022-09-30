const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

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
				if (AdminRequiredBoolean[1].includes(`yes`)) {
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

			let GTAConfirmString = "";
		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
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
				GTAConfirmString += `• There are no channels in this guild subscribed to GTAV auto posts.\n`;
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
				RDOConfirmString += `• There are no channels in this guild subscribed to RDR2 auto posts.\n`;
			}

			
			let ConfigureConfirmString = "";
			fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
			    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
			    else {
            //console.log(`data: ${data}`);
						let roleIDArray = [];
						interaction.guild.roles.cache.forEach(role => {
							if (data.includes(`${role.id}`)) {
						    roleIDArray.push(`${role.id}`);
							}
						});
						roleIDArray.shift(); //removes the @everyone role
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
        ConfigureConfirmString += `• @everyone can configure auto posts.\n`;
    }	
			
			

		const confirmEmbed = new EmbedBuilder()
			.setColor(`Blue`) 
			.setTitle(`Your Current Auto Post Channels:`)
			.setDescription(`
**Grand Theft Auto V:**
${GTAConfirmString}
**Red Dead Redemption II:**
${RDOConfirmString}
**Roles Allowed to Configure Auto Posts**
${ConfigureConfirmString}`)	



				await interaction.deferUpdate();
				if (interaction.user.id === buttonUserID) {
					await interaction.editReply({ embeds: [confirmEmbed], components: [] }).catch(err => console.log(`confirmEmbed Error: ${err}`));
				} else {
					interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
				}
	
	}); //end fs.readFile GTADataBase
	}); //end fs.readFile RDODataBase
	}) //end fs.readFile rolesDataBase
		setTimeout(() => {
			interaction.editReply({components: []})
		}, (60000 * 2))
	
		}); //end fs:readFile for guildID and Admin check
		
		} //end if start
	},
};




	