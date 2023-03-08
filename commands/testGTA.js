const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const phantom = require('phantom'); //https://github.com/amir20/phantomjs-node
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testgta')
		.setDescription('Latest GTA Online Bonuses')
		.setDMPermission(true),
	async execute(interaction) {
		await interaction.deferReply().catch(console.error);

		let gtaURL = "https://www.rockstargames.com/newswire?tag_id=13";

		//await interaction.editReply(`Console Logged 👍 ${gtaURL}`).catch(console.error);

		const instance = await phantom.create();
		const page = await instance.createPage();

		await page.property('viewportSize', { width: 1024, height: 600 });
		const status = await page.open(gtaURL);
		console.log(`Page opened with status [${status}].`);
		if (status === `success`) { //checks if Rockstar Social Club website is down
			const content = await page.property('content'); // Gets the latest gta updates
			console.log(content); 

			interaction.editReply(`Console logged! 👍`);


					}

	},
};

