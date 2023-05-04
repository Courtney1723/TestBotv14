const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../events/LANG.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

			if (!interaction.isButton()) {return};
			if (interaction.customId.includes(`portuguese - `)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("portuguese - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			var lang = await LANG.LANG(interaction);
			//console.log(`LANG:${await LANG.LANG(interaction)}`);			
			
			const portugueseStartEmbed = new EmbedBuilder()
			.setColor(0x0FFF00) 
			.setTitle(`Êxito`)
			.setDescription(`O idioma deste servidor foi alterado para português.`)
			.setFooter({ text: 'O idioma padrão é o inglês. Algumas informações podem estar faltando ou mal traduzidas.', iconURL: process.env.logo_link });
				
		if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) { 
        await interaction.editReply({ embeds: [portugueseStartEmbed], components: [] })
        .catch(err => console.log(`portugueseEmbed Error: ${err.stack}`));

			if (lang === "") {
				fs.appendFile(`./LANGDataBase.txt`,`guild:${interaction.guild.id} - lang:pt - \n`, err => {
					 if (err) {
						 console.error(err);
						 throw err;
						}	
					 else {
						 if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
						console.log(`You added Portuguese as the server language.`);
						 }
						 else {
						console.log(`A user added Portuguese as the server language.`);
						 } 
					 }	
				}); // end fs:appendFile to add a channel for gta autop posts	
			}	
			else {
				fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
				  if (err) {console.log(`Error: ${err}`)} 
					else {
				fs.writeFile('./LANGDataBase.txt', `${data.replace(`guild:${interaction.guild.id} - lang:${lang} - `, `guild:${interaction.guild.id} - lang:pt - `)}`, function (err) {
					if (err) throw err;
						 if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
					console.log('You changed the server language to portuguese.');
						 }
						 else {
					console.log('A user changed the server language to portuguese.');
						 } 					
				}); //end fs:writeFile to remove a role from autoposts		
				}}); //end fs.readFile for LANGDataBase
			}
    } 
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			interaction.followUp({ content: `Somente os administradores podem alterar o idioma.`, ephemeral: true });
		}
		else if (!interaction.user.id === buttonUserID) {
       interaction.followUp({ content: `Esses botões não são para você.`, ephemeral: true });
    }					
		
		} // end if portuguese button

		
	},
};




	