const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

	const timeoutButton = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId(`initialTimeout`)
				.setLabel('This interaction timed out.')
				.setStyle(ButtonStyle.Secondary)
				.setEmoji(':RSWeekly:1025248227248848940')
				.setDisabled(true),
			)

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isButton()) {return};
		if ( (interaction.customId.startsWith(`startback -`)) || (interaction.customId.startsWith(`stopback -`)) || (interaction.customId.startsWith(`configureback -`)) ) {

		const initialEmbed = new EmbedBuilder()
			.setColor(`0xFF008B`) //Pink
			.setTitle(`Auto Post Settings`)
			.setDescription(`Click **\'Start\'** to start auto posting.
Click **\'Stop\'** to remove an auto post channel.
Click **\'Configure\'** to add or remove a role that can configure auto post settings.
Click **\'Confirm\'** to view current settings.`)
			.setFooter({text: `note: only Admins can start, stop, or configure auto posts by default.`})

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
	interaction.editReply({ embeds: [initialEmbed], components:[initialButtons] });
		setTimeout(() => {
			interaction.editReply({components: [timeoutButton]})
		}, (60000 * 2))			
			

			
		} //end if interaction starts with startback - stopback - configureback

	},
}