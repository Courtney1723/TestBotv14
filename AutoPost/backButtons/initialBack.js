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
		if ( (interaction.customId.startsWith(`startback -`)) || (interaction.customId.startsWith(`stopback -`)) || (interaction.customId.startsWith(`configureback -`)) || (interaction.customId.startsWith(`confirmback -`)) ) {

		let start_stop_configure = "";
			if (interaction.customId.startsWith(`startback -`)) {
				start_stop_configure += 'start';
			} 
			else if (interaction.customId.startsWith(`stopback -`)) {
				start_stop_configure += 'stop';
			}	
			else if (interaction.customId.startsWith(`confirmback -`)) {
				start_stop_configure += 'confirm';
			}
			else if (interaction.customId.startsWith(`configureback -`)) {
				start_stop_configure += 'configure';
			}				

		let buttonUserID01 = (interaction.customId).split(`${start_stop_configure}back - `);
		let buttonUserID = buttonUserID01[1];
			//console.log(`startBack buttonUserID: ${buttonUserID}`);
			//console.log(`startBack interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`);
			//console.log(`startBack interaction.user.id: ${interaction.user.id} && buttonUserID: ${buttonUserID}`);			


		const initialEmbed = new EmbedBuilder()
			.setColor(`0x00FFCC`) //Seafoam Green
			.setTitle(`Auto Post Settings`)
			.setDescription(`Click **\'Start\'** to start auto posting.
Click **\'Stop\'** to remove an auto post channel.
Click **\'Configure\'** to add or remove a role that can configure auto post settings.
Click **\'Confirm\'** to view current settings or test auto posts.`)
			.setFooter({text: `Only Administrators can start, stop, or configure auto posts by default.`, iconURL: process.env.logo_link })

		const initialButtons = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`start - ${interaction.user.id}`)
					.setLabel('Start')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId(`stop - ${interaction.user.id}`)
					.setLabel('Stop')
					.setStyle(ButtonStyle.Danger),			
				new ButtonBuilder()
					.setCustomId(`configure - ${interaction.user.id}`)
					.setLabel('Configure')
					.setStyle(ButtonStyle.Primary),						
				new ButtonBuilder()
					.setCustomId(`confirm - ${interaction.user.id}`)
					.setLabel('Confirm')
					.setStyle(ButtonStyle.Secondary),					
			);

//Initial Embed + Buttons (start, stop, confirm, configure)
	await interaction.deferUpdate();
			if (interaction.user.id === buttonUserID) {
				interaction.editReply({ embeds: [initialEmbed], components:[initialButtons] });					
				
			}
			else {
				await interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
			}
			
				setTimeout(() => {
					interaction.editReply({components: [expiredButton]})
				}, (60000 * 2))	
			
		} //end if interaction starts with startback - stopback - configureback

	},
}