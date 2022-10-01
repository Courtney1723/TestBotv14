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
			if (interaction.customId.includes(`gtastop - `)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("stop - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin gtastop - ${interaction.customId}`);
			
			const gtaStopEmbed = new EmbedBuilder()
			.setColor(`Red`) 
			.setTitle(`Stop Auto Posting GTAV Online Bonuses & Discounts`)
			.setDescription(`Click **the dropdown menu** to confirm the channel you want to stop sending Grand Theft Auto V Auto Posts to.`)	

			let gtaStopMenu = new ActionRowBuilder()
			    .addComponents(
			        new SelectMenuBuilder()
			        .setCustomId(`gtaStopMenu - u:${interaction.user.id} - c:undefinedchannel`)
			        .setPlaceholder('Select a Channel')
			        .addOptions([{
			            label: `No Channel Selected`,
			            description: 'No Channel Selected',
			            value: `gtaStopMenu - u:${interaction.user.id} - c:undefinedchannel`,
			        }])
			    )
			interaction.guild.channels.cache.forEach(channel => {
			    if ((channel.type === 0) && (data.includes(channel.id))) {
			        gtaStopMenu.components[0].addOptions([{
			            label: `${channel.name}`,
			            description: `${channel.name}`,
			            value: `gtaStopMenu - u:${interaction.user.id} - c:${channel.id}`,
			        }]);
			    }
			})	

		const backButton = new ActionRowBuilder()
			.addComponents(
					new ButtonBuilder()
			        .setCustomId(`gtastopback - ${interaction.user.id}`)
			        .setLabel('Go Back')
			        .setStyle(ButtonStyle.Secondary),	
			);					

		if (interaction.user.id === buttonUserID) { 
        await interaction.editReply({ embeds: [gtaStopEmbed], components: [gtaStopMenu, backButton] })
        .catch(err => console.log(`gtaStopEmbed+Menu Error: ${err.stack}`));
    } else {
       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
    }

		
		} // end if gtastop button
		
		}); //end fs:readFile

		
	},
};




	