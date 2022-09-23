const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const phantom = require('phantom'); //https://github.com/amir20/phantomjs-node
		let errorText = `There was an error while executing this command!\nThe error has been sent to the developer and it will be fixed as soon as possible. \nIf the error persists you can try re-inviting the Rockstar Weekly bot by [clicking here](<${process.env.invite_link}>). \nReport the error by joining the Rockstar Weekly bot support server: [click here](<${process.env.support_link}>).`;

const axios = require('axios');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('gtatest')
		.setDescription('Latest GTA V online bonuses and discounts')
		.setDMPermission(true),
	async execute(interaction) {
		await interaction.deferReply().catch(console.error);
		
		let gtaURL = process.env.SOCIAL_URL_GTA2;
		        console.log(getGTA());

		await interaction.editReply(`Console Logged 👍`).catch(console.error);

		function getGTA(){
		    axios.get(gtaURL)
		    .then ((res) => {
		        var data = res.data[0].url 
		        console.log('res: ', data)
		        return data               
		})
		    .catch((err) => {console.error('err: ', err)})
		}		
    },
};

