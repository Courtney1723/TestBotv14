const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log

			if (!interaction.isButton()) {return};
			if (interaction.customId.includes(`gtastart - `)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("start - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin gtastart - ${interaction.customId}`);
			
			const gtaStartEmbed = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`Start Auto Posting GTAV Online Bonuses & Discounts`)
			.setDescription(`Click **the dropdown menu** to confirm the channel you want to send Grand Theft Auto V Auto Posts to \n**every Thursday at 2:00 PM EST**.`)	

			let gtaStartMenu = new ActionRowBuilder()
			    .addComponents(
			        new SelectMenuBuilder()
			        .setCustomId(`gtaStartMenu - u:${interaction.user.id} - c:undefinedchannel`)
			        .setPlaceholder('Select a Channel')
			        .addOptions([{
			            label: `No Channel Selected`,
			            description: 'No Channel Selected',
			            value: `gtaStartMenu - u:${interaction.user.id} - c:undefinedchannel`,
			        }])
			    )
			interaction.guild.channels.cache.first(24).forEach(channel => {
			    if ((channel.type === 0) && (!data.includes(channel.id))) {
			        gtaStartMenu.components[0].addOptions([{
			            label: `${channel.name}`,
			            description: `${channel.name}`,
			            value: `gtaStartMenu - u:${interaction.user.id} - c:${channel.id}`,
			        }]);
			    }
			})	
			const backButton = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`gtastartback - ${interaction.user.id}`)
			        .setLabel('Go Back')
			        .setStyle(ButtonStyle.Secondary),	
			);	
							

			let channelCount = "";
			let channelNames = [];
			let channelIDs = [];
			let channelTypes = [];
			interaction.guild.channels.cache.forEach(channel => {
				if ((channel.type === 0) && (!data.includes(channel.id))) {
					channelCount += 1;
					channelNames.push(channel.name);
					channelIDs.push(channel.id);
					channelTypes.push(channel.type)
				}
			});

			let gtaStartMenu2 = new ActionRowBuilder()
			    .addComponents(
			        new SelectMenuBuilder()
			        .setCustomId(`gtaStartMenu2 - u:${interaction.user.id} - c:undefinedchannel`)
			        .setPlaceholder('Select a Channel')
			        .addOptions([{
			            label: `No Channel Selected`,
			            description: 'No Channel Selected',
			            value: `gtaStartMenu - u:${interaction.user.id} - c:undefinedchannel`,
			        }])
			    )	
			if (channelCount >= 24) {	
				
				for (i = 21; i <= 44; i++) {
			    if ( (channelNames[i] != undefined) ) {
						//console.log(`channelNames at ${i}: ${channelNames[i]}`);
			        gtaStartMenu2.components[0].addOptions([{
			            label: `${channelNames[i]}`,
			            description: `${channelNames[i]}`,
			            value: `gtaStartMenu2 - u:${interaction.user.id} - c:${channelIDs[i]}`,
			        }]);
			    }
				}

				if (interaction.user.id === buttonUserID) { 
		        await interaction.editReply({ embeds: [gtaStartEmbed], components: [gtaStartMenu, gtaStartMenu2, backButton] })
		        .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
		    } else {
		       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
		    }				
				
			} //end if channelCount >24
			else { //if there are 24 channels or fewer
				

		if (interaction.user.id === buttonUserID) { 
        await interaction.editReply({ embeds: [gtaStartEmbed], components: [gtaStartMenu, backButton] })
        .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
    } else {
       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
    }
				
		} //end if there are fewer than 25 channels
		
		} // end if gtastart button
		
		}); //end fs:readFile

		
	},
};




	