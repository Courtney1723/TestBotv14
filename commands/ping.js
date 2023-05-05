const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.setDescriptionLocalizations({
			"es-ES": '¡Responde con Pong!',
			ru: 'Отвечает с Pong!',
			de: 'Antwort ist Pong!',
			"pt-BR": 'Responde com Pong!',
		})
		.setDMPermission(true),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};