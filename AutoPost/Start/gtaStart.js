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
			.setFooter({ text: 'Auto posts can only be sent to text channels.', iconURL: process.env.logo_link });

			let gtaChannelCount = 0;
				interaction.guild.channels.cache.forEach(channel => {
					if ( (channel.type === 0) && (!data.includes(channel.id)) && (channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages)) && (channel.permissionsFor(interaction.user.id).has(PermissionsBitField.Flags.ViewChannel)) ) { 
						gtaChannelCount += 1;
					}
				})
			var gtaChannelNames = new Array(gtaChannelCount);
			var gtaChannelIDs = new Array(gtaChannelCount);
			var gtaChannelTypes = new Array(gtaChannelCount);
			interaction.guild.channels.cache.forEach(channel => {
				if ( (channel.type === 0) && (!data.includes(channel.id)) && (channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages)) && (channel.permissionsFor(interaction.user.id).has(PermissionsBitField.Flags.ViewChannel)) ) { 
					gtaChannelNames.splice((channel.rawPosition), 1, channel.name);   //gtaChannelNames.push(channel.name); 
					gtaChannelIDs.splice((channel.rawPosition), 1, channel.id); 	//gtaChannelIDs.push(channel.id);
					gtaChannelTypes.splice((channel.rawPosition), 1, channel.type);	//gtaChannelTypes.push(channel.type);
				}
			});
			//console.log(`gtaChannelCount: ${gtaChannelCount}`)
			//console.log(`gtaChannelNames[23]: ${gtaChannelNames[23]}`)

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
				for (i = 0; i <= 23; i++) {
			    if ( (gtaChannelNames[i] != undefined) ) {
						//console.log(`gtaChannelNames at ${i}: ${gtaChannelNames[i]}`);
			        gtaStartMenu.components[0].addOptions([{
			            label: `${gtaChannelNames[i]}`,
			            description: `${gtaChannelNames[i]}`,
			            value: `gtaStartMenu2 - u:${interaction.user.id} - c:${gtaChannelIDs[i]}`,
			        }]);
			    }
				}
			const backButton = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`gtastartback - ${interaction.user.id}`)
			        .setLabel('Go Back')
			        .setStyle(ButtonStyle.Secondary),	
			);	
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
			if (gtaChannelCount >= 24) {	
				
				for (i = 24; i <= 47; i++) {
			    if ( (gtaChannelNames[i] != undefined) ) {
						//console.log(`gtaChannelNames at ${i}: ${gtaChannelNames[i]}`);
			        gtaStartMenu2.components[0].addOptions([{
			            label: `${gtaChannelNames[i]}`,
			            description: `${gtaChannelNames[i]}`,
			            value: `gtaStartMenu2 - u:${interaction.user.id} - c:${gtaChannelIDs[i]}`,
			        }]);
			    }
				}

				if (interaction.user.id === buttonUserID) { 
		        await interaction.editReply({ embeds: [gtaStartEmbed], components: [gtaStartMenu, gtaStartMenu2, backButton] })
		        .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
		    } else {
		       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
		    }				
				
			} //end if gtaChannelCount >24
			else if (gtaChannelCount <= 23) { //if there are 23 channels or fewer
				

		if (interaction.user.id === buttonUserID) { 
        await interaction.editReply({ embeds: [gtaStartEmbed], components: [gtaStartMenu, backButton] })
        .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err.stack}`));
    } else {
       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
    }
				
		} //end if there are fewer than 23 channels

				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 2))					
		
		} // end if gtastart button
		
		}); //end fs:readFile

		
	},
};




	