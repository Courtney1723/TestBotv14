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
			if (interaction.customId.includes(`english - `)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("english - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin gtastart - ${interaction.customId}`);

			let lang03 = data.split("lang:");
			//console.log(`lang03.length: ${lang03.length}`);

			let langArray = [];
			for (i=1; i <= lang03.length - 1; i++) { //first will always be undefined
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
			
			const englishStartEmbed = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`Success!`)
			.setDescription(`The language for this server has been changed to English.`)	
	
		if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) { 
        await interaction.editReply({ embeds: [englishStartEmbed], components: [] })
        .catch(err => console.log(`englishEmbed Error: ${err.stack}`));

					fs.writeFile('./LANGDataBase.txt', `${data.replace(`guild:${interaction.guild.id} - lang:${lang} - `, `guild:${interaction.guild.id} - lang:en - `)}`, function (err) {
						if (err) throw err;
						if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
							console.log('You changed the server language to English.');
						 }
						 else {
							console.log('A user changed the server language to English.');
						 } 		
					}); //end fs:writeFile to change server language to english
			
    } 
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			interaction.followUp({ content: `Only administrators can change the language.`, ephemeral: true });
		}
		else if (!interaction.user.id === buttonUserID) {
       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
    }				
		
		} // end if english button
		
		}); //end fs:readFile

		
	},
};




	