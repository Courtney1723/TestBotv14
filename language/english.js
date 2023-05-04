const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../events/LANG.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isButton()) {return};
		if (interaction.customId.includes(`english - `)) {
					await interaction.deferUpdate();			

		let buttonUserID01 = (interaction.customId).split("english - ");
		let buttonUserID = buttonUserID01[1];
			//console.log(`buttonUserID: ${buttonUserID}`);
			//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)		

		var lang = await LANG.LANG(interaction);
		//console.log(`LANG:${await LANG.LANG(interaction)}`);			
			
			const englishStartEmbed = new EmbedBuilder()
			.setColor(0x0FFF00) 
			.setTitle(`Success!`)
			.setDescription(`The language for this server has been changed to English.`)	
	
		if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) { 
        await interaction.editReply({ embeds: [englishStartEmbed], components: [] })
        .catch(err => console.log(`englishEmbed Error: ${err.stack}`));

				fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
				  if (err) {console.log(`Error: ${err}`)} 
					else {

					fs.writeFile('./LANGDataBase.txt', `${data.replace(`guild:${interaction.guild.id} - lang:${lang} - \n`, "")}`, function (err) {
						if (err) throw err;
						if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
							console.log('You changed the server language to English.');
						 }
						 else {
							console.log('A user changed the server language to English.');
						 } 		
					}); //end fs:writeFile to change server language to english
					}}); //end fs.readFile for LANGDataBase.txt
			
    } 
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			interaction.followUp({ content: `Only administrators can change the language.`, ephemeral: true });
		}
		else if (!interaction.user.id === buttonUserID) {
       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
    }				

			} // end if english button
		
	},
};