const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log

			if (!interaction.isButton()) {return};
			if (interaction.customId.includes(`portuguese - `)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("portuguese - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin gtastart - ${interaction.customId}`);

			let lang03 = data.split("lang:");
			//console.log(`lang03.length: ${lang03.length}`);

			let langArray = [];
			for (i=2; i <= lang03.length - 1; i++) { //first will always be undefined
				let lang02 = lang03[i].split(" -");
				//console.log(`lang02 at ${i}: ${lang02}`);
				
				let lang01 = lang02[0];
				//console.log(`lang01 at ${i}: ${lang01}`);

				langArray.push(lang01);
			}

			//console.log(`langArray: ${langArray}`);

			let guildID03 = data.split("guild:");
			//console.log(`guildID03.length: ${guildID03.length}`);
			let guildIDArray = [];
			for (i=2; i <= guildID03.length - 1; i++) { //first two will always be undefined
				let guildID02 = guildID03[i].split(" -");
				//console.log(`lang02 at ${i}: ${lang02}`);
				
				let guildID01 = guildID02[0];
				//console.log(`lang01 at ${i}: ${lang01}`);

				guildIDArray.push(guildID01);
			}

			//console.log(`guildIDArray: ${guildIDArray}`);	

			let lang = "";
			for (i=0; i <= guildIDArray.length - 1; i++) {
				//console.log(`guildIDArray at ${i}: ${guildIDArray[i]}`);
				//console.log(`langArray at ${i}: ${langArray[i]}`);
				//console.log(`interaction.guildID at ${i}: ${interaction.guild.id}`);

				if (interaction.guild.id === guildIDArray[i]) {
					lang += `${langArray[i]}`;
				}
			}

			//console.log(`lang: ${lang}`);				
			
			const portugueseStartEmbed = new EmbedBuilder()
			.setColor(`Green`) 
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
				fs.writeFile('./LANGDataBase.txt', `${data.replace(`guild:${interaction.guild.id} - lang:${lang} - `, `guild:${interaction.guild.id} - lang:pt - `)}`, function (err) {
					if (err) throw err;
						 if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
					console.log('You changed the server language to portuguese.');
						 }
						 else {
					console.log('A user changed the server language to portuguese.');
						 } 					
				}); //end fs:writeFile to remove a role from autoposts				
			}
    } 
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			interaction.followUp({ content: `Somente os administradores podem alterar o idioma.`, ephemeral: true });
		}
		else if (!interaction.user.id === buttonUserID) {
       interaction.followUp({ content: `Esses botões não são para você.`, ephemeral: true });
    }					
		
		} // end if portuguese button
		
		}); //end fs:readFile

		
	},
};




	