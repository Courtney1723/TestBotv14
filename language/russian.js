const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../events/LANG.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

			if (!interaction.isButton()) {return};
			if (interaction.customId.includes(`russian - `)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("russian - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin gtastart - ${interaction.customId}`);

			var lang = await LANG.LANG(interaction);
			//console.log(`LANG:${await LANG.LANG(interaction)}`);			
			
			const russianStartEmbed = new EmbedBuilder()
			.setColor(0x0FFF00) 
			.setTitle(`Успех`)
			.setDescription(`Язык этого сервера был изменен на русский.`)	
			.setFooter({ text: 'Языком по умолчанию является английский. Некоторая информация может отсутствовать или плохо переведена.', iconURL: process.env.logo_link });

				
		if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) { 
        await interaction.editReply({ embeds: [russianStartEmbed], components: [] })
        .catch(err => console.log(`russianEmbed Error: ${err.stack}`));

			if (lang === "") {
				fs.appendFile(`./LANGDataBase.txt`,`guild:${interaction.guild.id} - lang:ru - \n`, err => {
					 if (err) {
						 console.error(err);
						 throw err;
						}	
					 else {
						 if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
							 console.log(`You added Russian as the server language.`);
						 }
						 else {
							 console.log(`A user added Russian as the server language.`);
						 }						 
					 }	
				}); // end fs:appendFile to add server language to russian
			}	
			else {
				fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
				  if (err) {console.log(`Error: ${err}`)} 
					else {
				fs.writeFile('./LANGDataBase.txt', `${data.replace(`guild:${interaction.guild.id} - lang:${lang} - `, `guild:${interaction.guild.id} - lang:ru - `)}`, function (err) {
					if (err) throw err;
						 if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
							 console.log('You changed the server language to russian.');
						 }
						 else {
							 console.log('A user changed the server language to russian.');
						 } 
				}); //end fs:writeFile to change server language to russian		
				}}); //end fs.readFile for LANGDataBase.txt
			}
    } 
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			interaction.followUp({ content: `Только администраторы могут изменять язык.`, ephemeral: true });
		}
		else if (!interaction.user.id === buttonUserID) {
       interaction.followUp({ content: `Эти кнопки не для вас.`, ephemeral: true });
    }				
		
		} // end if russian button

		
	},
};




	