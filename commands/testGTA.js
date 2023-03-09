const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const phantom = require('phantom'); //https://github.com/amir20/phantomjs-node
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const fetch = require("@replit/node-fetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testgta')
		.setDescription('Latest GTA Online Bonuses')
		.setDMPermission(true),
	async execute(interaction) {
		await interaction.deferReply().catch(console.error);

		let gtaURL = "https://www.rockstargames.com/newswire?tag_id=13";

		await interaction.editReply(`Console Logged 👍`).catch(console.error);

		fetch(gtaURL).then(function(response) {
		  return response.text();
		}).then(function(html) {
		  //console.log(html);
		});

	async function gtaPage() {
	  const instance = await phantom.create();
	  const page = await instance.createPage();
	  await page.on('onResourceRequested', function (requestData) {
	    console.info('Requesting', requestData.url);
	  });

			const status = await page.open(gtaURL);
			const content = await page.property('content');
			console.log(content);
		  await instance.exit();			
		
	}
	gtaPage();
		
	},
};

