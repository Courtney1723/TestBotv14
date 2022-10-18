const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('code')
		.setDescription('The source code of the Rockstar Weekly bot')
		.setDMPermission(true),
	async execute(interaction) {
		await interaction.deferReply().catch(console.error);
    await interaction.editReply(`Rockstar Weekly source code: [Github Link](<https://github.com/Courtney1723/Rockstar-Weekly>)`).catch(err => {console.log(err)});
	},
};
