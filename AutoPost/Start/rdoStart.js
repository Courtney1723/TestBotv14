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

		fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log

			if (!interaction.isButton()) {return};
			if (interaction.customId.includes(`rdostart - `)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("start - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin rdostart - ${interaction.customId}`);
			
			const rdoStartEmbed = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`Start Auto Posting RDR2 Online Bonuses & Discounts`)
			.setDescription(`Click **the dropdown menu** to confirm the channel you want to send Red Dead Redemption II Auto Posts to \n**the first Tuesday of every month at 2:00 PM EST**.`)	
			.setFooter({ text: 'Auto posts can only be sent to text channels.', iconURL: process.env.logo_link });

			let rdoChannelCount = 0;
				interaction.guild.channels.cache.forEach(channel => {
					if ( (channel.type === 0) && (!data.includes(channel.id)) && (channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages)) ) { 
						rdoChannelCount += 1;
					}
				})
			var rdoChannelNames = new Array(rdoChannelCount);
			var rdoChannelIDs = new Array(rdoChannelCount);
			var rdoChannelTypes = new Array(rdoChannelCount);
			interaction.guild.channels.cache.forEach(channel => {
				if ( (channel.type === 0) && (!data.includes(channel.id)) && (channel.permissionsFor(process.env.CLIENT_ID).has(PermissionsBitField.Flags.SendMessages)) ) { 
					rdoChannelNames.splice((channel.rawPosition), 1, channel.name);   //rdoChannelNames.push(channel.name); 
					rdoChannelIDs.splice((channel.rawPosition), 1, channel.id); 	//rdoChannelIDs.push(channel.id);
					rdoChannelTypes.splice((channel.rawPosition), 1, channel.type);	//rdoChannelTypes.push(channel.type);
				}
			});
			//console.log(`rdoChannelCount: ${rdoChannelCount}`)
			//console.log(`rdoChannelNames[23]: ${rdoChannelNames[23]}`)

			let rdoStartMenu = new ActionRowBuilder()
			    .addComponents(
			        new SelectMenuBuilder()
			        .setCustomId(`rdoStartMenu - u:${interaction.user.id} - c:undefinedchannel`)
			        .setPlaceholder('Select a Channel')
			        .addOptions([{
			            label: `No Channel Selected`,
			            description: 'No Channel Selected',
			            value: `rdoStartMenu - u:${interaction.user.id} - c:undefinedchannel`,
			        }])
			    )
				for (i = 0; i <= 23; i++) {
			    if ( (rdoChannelNames[i] != undefined) ) {
						//console.log(`rdoChannelNames at ${i}: ${rdoChannelNames[i]}`);
			        rdoStartMenu.components[0].addOptions([{
			            label: `${rdoChannelNames[i]}`,
			            description: `${rdoChannelNames[i]}`,
			            value: `rdoStartMenu2 - u:${interaction.user.id} - c:${rdoChannelIDs[i]}`,
			        }]);
			    }
				}
			const backButton = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
			        .setCustomId(`rdostartback - ${interaction.user.id}`)
			        .setLabel('Go Back')
			        .setStyle(ButtonStyle.Secondary),	
			);	
			let rdoStartMenu2 = new ActionRowBuilder()
			    .addComponents(
			        new SelectMenuBuilder()
			        .setCustomId(`rdoStartMenu2 - u:${interaction.user.id} - c:undefinedchannel`)
			        .setPlaceholder('Select a Channel')
			        .addOptions([{
			            label: `No Channel Selected`,
			            description: 'No Channel Selected',
			            value: `rdoStartMenu - u:${interaction.user.id} - c:undefinedchannel`,
			        }])
			    )	

		if (rdoChannelCount <= 23) { //if there are 23 channels or fewer
				

		if (interaction.user.id === buttonUserID) { 
        await interaction.editReply({ embeds: [rdoStartEmbed], components: [rdoStartMenu, backButton] })
        .catch(err => console.log(`rdoStartEmbed+Menu Error: ${err.stack}`));
    } else {
       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
    }
				
		} //end if there are fewer than 23 channels
			else if (rdoChannelCount >= 24) {	
				
				for (i = 24; i <= 47; i++) {
			    if ( (rdoChannelNames[i] != undefined) ) {
						//console.log(`rdoChannelNames at ${i}: ${rdoChannelNames[i]}`);
			        rdoStartMenu2.components[0].addOptions([{
			            label: `${rdoChannelNames[i]}`,
			            description: `${rdoChannelNames[i]}`,
			            value: `rdoStartMenu2 - u:${interaction.user.id} - c:${rdoChannelIDs[i]}`,
			        }]);
			    }
				}

				if (interaction.user.id === buttonUserID) { 
		        await interaction.editReply({ embeds: [rdoStartEmbed], components: [rdoStartMenu, rdoStartMenu2, backButton] })
		        .catch(err => console.log(`rdoStartEmbed+Menu Error: ${err.stack}`));
		    } else {
		       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
		    }				
				
			} //end if rdoChannelCount >24

				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 2))					

				
		} // end if rdostart button

		
		}); //end fs:readFile
				
		
	},
};




	