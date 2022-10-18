const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, optionstyle, SelectMenuBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (!interaction.isSelectMenu()) {return};
		if (interaction.customId.startsWith(`gtaStartMenu`)) {
			//console.log(`begin gtaStartMenu: '${interaction.customId}'`);	

		let startMenu2 = "";
			if (interaction.customId.startsWith(`gtaStartMenu2`)) {
				startMenu2 += "2";
			}

		let menuUserID02 = (interaction.customId).split(`gtaStartMenu${startMenu2} - u:`);
		let menuUserID01 = menuUserID02[1].split(" - ");
		let menuUserID = menuUserID01[0];
			//console.log(`gtaStartMenu menuUserID: ${menuUserID}`);
			//console.log(`gtaStartMenu interaction.user.id === menuUserID?: ${interaction.user.id === menuUserID}`)	

		let menuChannelID01 = (interaction.values).toString().split(`c:`);
		let menuChannelID = menuChannelID01[1];
				//console.log(`gtaStartMenu menuChannelID: ${menuChannelID}`)

		let guildRoleIds = [];
		fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
		    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
		
					interaction.guild.roles.cache.forEach(role => {
							if (data.includes(role.id)) {
								guildRoleIds.push(role.id);
							}
					});
			guildRoleIds.shift(1); //removes the @everyone role
				//console.log(`guildRoleIds: ${guildRoleIds}`);

			function AdminRequired() {
				let AdminRequiredBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
				if (AdminRequiredBoolean[1].includes(`yes`)) {
					return "AdminRequiredYes";
				}
				else {
					return "AdminRequiredNo";
				}
			}		

					if (menuChannelID.includes(`undefinedchannel`)) { //interaction.values === `undefinedchannel` does not work?

						const gtaDuplicateEmbed = new EmbedBuilder()
								.setColor(`Orange`) 
								.setTitle(`Please Try Again`)
								.setDescription(`You selected an invalid response "No Channel Selected".\nPlease Try again. || (◕ᴥ◕ʋ) ||`)	
						
						await interaction.deferUpdate();
						if (interaction.user.id === menuUserID) {
								await interaction.followUp({ embeds: [gtaDuplicateEmbed], components: [], ephemeral: true })
								.catch(err => console.log(`gtaDuplicateEmbed Error: ${err}`));
						} else {
								interaction.followUp({ content: `These options aren't for you!`, ephemeral: true });
						}
						
					} 
					else { //add new channel to GTADataBase.txt

						const gtaConfirmEmbed = new EmbedBuilder()
								.setColor(`Green`) 
								.setTitle(`Success!`)
								.setDescription(`You will now get Grand Theft Auto V Auto Posts to the <#${menuChannelID}> channel \n**every Thursday at 2:00 PM EST**.`)	
						
						await interaction.deferUpdate();
						if (interaction.user.id === menuUserID) {
								await interaction.editReply({ embeds: [gtaConfirmEmbed], components: [] })
								.catch(err => console.log(`gtaConfirmEmbed Error: ${err}`));

						//Appends the GTADataBase.txt file with guildID, Channel ID, and choice of rdo of gta
						fs.appendFile(`./GTADataBase.txt`,`guild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:gtaStartMenu - \n`, err => {
							 if (err) {
								 console.error(err)
								 return
									 }		
							console.log(`A user added a channel for GTA auto posts.`);
						}); // end fs:appendFile to add a channel for gta autop posts	
							
						} 
						else {
								interaction.followUp({ content: `These options aren't for you!`, ephemeral: true });
						}

						
					} //end add new channel

		});//end fs:readFile

		setTimeout(() => {
			interaction.editReply({components: []})
		}, (60000 * 2))
			
		}// end if interaction.customId === 'gtaStartMenu'
		

	},
};




	