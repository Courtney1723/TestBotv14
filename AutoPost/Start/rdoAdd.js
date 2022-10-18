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
		if ((interaction.customId.startsWith(`rdoStartMenu -`)) || (interaction.customId.startsWith(`rdoStartMenu2 -`)) ) {
			//console.log(`begin rdoStartMenu: '${interaction.customId}'`);		

			let startMenu2 = "";
			if (interaction.customId.startsWith(`rdoStartMenu2`)) {
				startMenu2 += "2";
			}	

		let menuUserID02 = (interaction.customId).split(`rdoStartMenu${startMenu2} - u:`);
		let menuUserID01 = menuUserID02[1].split(" -");
		let menuUserID = menuUserID01[0];
			//console.log(`rdoStartMenu menuUserID: ${menuUserID}`);
			//console.log(`rdoStartMenu interaction.user.id === menuUserID?: ${interaction.user.id === menuUserID}`)	

		let menuChannelID01 = (interaction.values).toString().split(`c:`);
		let menuChannelID = menuChannelID01[1];
				//console.log(`rdoStartMenu menuChannelID: ${menuChannelID}`)

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


					if (interaction.user.id != menuUserID) {
						interaction.reply({ content: `These options aren't for you!`, ephemeral: true });
					}
					else if (menuChannelID.includes(`undefinedchannel`)) { //interaction.values === `undefinedchannel` does not work?

						const rdoDuplicateEmbed = new EmbedBuilder()
								.setColor(`Orange`) 
								.setTitle(`Please Try Again`)
								.setDescription(`You selected an invalid response "No Channel Selected".\nPlease Try again. || (◕ᴥ◕ʋ) ||`)	
						
						await interaction.deferUpdate();
						if (interaction.user.id === menuUserID) {
								await interaction.followUp({ embeds: [rdoDuplicateEmbed], components: [], ephemeral: true })
								.catch(err => console.log(`rdoDuplicateEmbed Error: ${err}`));
						} else {
								interaction.followUp({ content: `These options aren't for you!`, ephemeral: true });
						}
						
					} 
					else { //add new channel to RDODataBase.txt

						const rdoConfirmEmbed = new EmbedBuilder()
								.setColor(`Green`) 
								.setTitle(`Success!`)
								.setDescription(`You will now get Red Dead Redemption II Auto Posts to the <#${menuChannelID}> channel \n**the first Tuesday of every month at 2:00 PM EST**.`)	
						
						await interaction.deferUpdate();
						if (interaction.user.id === menuUserID) {
								await interaction.editReply({ embeds: [rdoConfirmEmbed], components: [] })
								.catch(err => console.log(`rdoConfirmEmbed Error: ${err}`));

						//Appends the RDODataBase.txt file with guildID, Channel ID, and choice of rdo of rdo
						fs.appendFile(`./RDODataBase.txt`,`guild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:rdoStartMenu - \n`, err => {
							 if (err) {
								 console.error(err)
								 return
									 }		
							console.log(`A user added a channel for RDO auto posts.`)
						}); // end fs:appendFile to add a channel for rdo autop posts	
							
						} else {
								interaction.followUp({ content: `These options aren't for you!`, ephemeral: true });
						}
						
					} //end add new channel

		});//end fs:readFile	
			
		setTimeout(() => {
			interaction.editReply({components: []})
		}, (60000 * 2))
			
		}// end if interaction.customId === 'rdoStartMenu'
		

	},
};




	