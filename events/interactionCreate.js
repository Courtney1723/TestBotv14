const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		//console.log(`interaction.channel.type: ${interaction.channel.type}`);
		if (interaction.isCommand()) {
			if (interaction.channel.type === 0) { 
				if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
					console.log(`You triggered ${interaction.commandName} in a guild`);
				} 
				else {
					console.log(`A user triggered ${interaction.commandName} in a guild`);
				}
			}
			else if (interaction.channel.type === 1) {
				if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
					console.log(`You triggered ${interaction.commandName} in a DM`);
				} 
				else {
					console.log(`A user triggered ${interaction.commandName} in a DM`);
				}
			}
			else {
				console.log(`A user triggered ${interaction.commandName} ...somewhere?`);
			}
		}
	},
};