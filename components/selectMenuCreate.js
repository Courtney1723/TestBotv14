const { Client, GatewayIntentBits, Collection, Partials, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		//console.log(`interaction.channel.type: ${interaction.channel.type}`);
		if (interaction.isStringSelectMenu()) {
			
		if (interaction.channel.type === ChannelType.GuildText) { 
			if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
				console.log(`You clicked the '${interaction.customId}' option in a guild`);
			} 
			else {
				console.log(`A user clicked the '${interaction.customId}' option in a guild`);
			}
		}
		else if (interaction.channel.type === ChannelType.DM) {
			if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
				console.log(`You clicked the ${interaction.customId} option in a DM`);
			} 
			else {
				console.log(`A user clicked the ${interaction.customId} option in a DM`);
			}
		}
		else if (interaction.channel.type === ChannelType.GuildAnnouncement) {
			if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
				console.log(`You clicked the ${interaction.customId} option in a DM`);
			} 
			else {
				console.log(`A user clicked the ${interaction.customId} option in a DM`);
			}
		}			
		else {
			console.log(`A user clicked the ${interaction.customId} option ...somewhere?`);
		}
		}
			
	},
};