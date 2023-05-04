const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../events/LANG.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isButton()) {return};
		if (interaction.customId.includes(`german - `)) {
					await interaction.deferUpdate();			

		let buttonUserID01 = (interaction.customId).split("german - ");
		let buttonUserID = buttonUserID01[1];
			//console.log(`buttonUserID: ${buttonUserID}`);
			//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)	
		
		var lang = await LANG.LANG(interaction);
		//console.log(`LANG:${await LANG.LANG(interaction)}`);				
			
			const germanStartEmbed = new EmbedBuilder()
			.setColor(0x0FFF00) 
			.setTitle(`Erfolg`)
			.setDescription(`Die Sprache für diesen Server wurde auf Deutsch geändert.`)
			.setFooter({ text: 'Die Standardsprache ist Englisch. Einige Informationen fehlen möglicherweise oder sind schlecht übersetzt.', iconURL: process.env.logo_link });
				
		if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) { 
        await interaction.editReply({ embeds: [germanStartEmbed], components: [] })
        .catch(err => console.log(`germanEmbed Error: ${err.stack}`));

		if (lang === "") {
				fs.appendFile(`./LANGDataBase.txt`,`guild:${interaction.guild.id} - lang:de - \n`, err => {
					 if (err) {
						 console.error(err);
						 throw err;
						}	
					 else {
						 if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
							console.log(`You added German as the server language.`);
						 }
						 else {
							console.log(`A user added German as the server language.`);
						 } 
					 }	
				}); // end fs:appendFile to add server language to german
			}	
			else {
				fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
				  if (err) {console.log(`Error: ${err}`)} 
					else {
					fs.writeFile('./LANGDataBase.txt', `${data.replace(`guild:${interaction.guild.id} - lang:${lang} - `, `guild:${interaction.guild.id} - lang:de - `)}`, function (err) {
						if (err) throw err;
						 if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
							console.log('You changed the server language to German.');						 
						 }
						 else {
							console.log('A user changed the server language to German.');						 
						 } 						
					}); //end fs:writeFile to change server language to german
					}}); //end fs.readFile for LANGDataBase.txt
			}
			
    } 
		else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			interaction.followUp({ content: `Nur Administratoren können die Sprache ändern.`, ephemeral: true });
		}
		else if (!interaction.user.id === buttonUserID) {
       interaction.followUp({ content: `Diese Schaltflächen sind nicht für Sie.`, ephemeral: true });
    }				

		} // end if german button
		
	},
};




	