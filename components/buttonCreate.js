const { Client, GatewayIntentBits, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		//console.log(`interaction.channel.type: ${interaction.channel.type}`);
		if (interaction.isButton()) {
			
		if (interaction.channel.type === 0) { 
			if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
				console.log(`You clicked the '${interaction.customId}' button in a guild`);
			} 
			else {
				console.log(`A user clicked the '${interaction.customId}' button in a guild`);
			}
		}
		else if (interaction.channel.type === 1) {
			if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
				console.log(`You clicked the ${interaction.customId} button in a DM`);
			} 
			else {
				console.log(`A user clicked the ${interaction.customId} button in a DM`);
			}
		}
		else if (interaction.channel.type === 2) {
			if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
				console.log(`You clicked the ${interaction.customId} button in a GuildVoice channel`);
			} 
			else {
				console.log(`A user clicked the ${interaction.customId} button in a GuildVoice channel`);
			}
		}		
		else if (interaction.channel.type === 3) {
			if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
				console.log(`You clicked the ${interaction.customId} button in a GroupDM`);
			} 
			else {
				console.log(`A user clicked the ${interaction.customId} button in a GroupDM`);
			}
		}		
			//type 4 is a guild category and does not have direct interactions
		else if (interaction.channel.type === 5) {
			if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
				console.log(`You clicked the ${interaction.customId} button in an Announcement channel`);
			} 
			else {
				console.log(`A user clicked the ${interaction.customId} button in an Announcement channel`);
			}
		}		
		else if (interaction.channel.type === 6) {
			if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
				console.log(`You clicked the ${interaction.customId} button in an Announcement channel`);
			} 
			else {
				console.log(`A user clikced the ${interaction.customId} button in an Announcement channel`);
			}
		}	
		else {
			console.log(`A user clicked the ${interaction.customId} button ...somewhere?`);
		}
		}
			
	},
};