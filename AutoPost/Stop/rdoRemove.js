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
		if (interaction.customId.startsWith(`rdoStopMenu -`)) {
			//console.log(`begin rdoStopMenu: '${interaction.customId}'`);		

		let menuUserID02 = (interaction.customId).split("rdoStopMenu - u:");
		let menuUserID01 = menuUserID02[1].split(" - ");
		let menuUserID = menuUserID01[0];
			//console.log(`rdoStopMenu menuUserID: ${menuUserID}`);
			//console.log(`rdoStopMenu interaction.user.id === menuUserID?: ${interaction.user.id === menuUserID}`)	

		let menuChannelID01 = (interaction.values).toString().split(`c:`);
		let menuChannelID = menuChannelID01[1];
				//console.log(`rdoStopMenu menuChannelID: ${menuChannelID}`)

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
								.setDescription(`You will now no longer get Red Dead Redemption II auto posts in the <#${menuChannelID}> channel.`)	
						
						await interaction.deferUpdate();
						if (interaction.user.id === menuUserID) { //begin removing an rdo channel
								await interaction.editReply({ embeds: [rdoConfirmEmbed], components: [] })
								.catch(err => console.log(`rdoConfirmEmbed Error: ${err}`));
								console.log('A user unsubscribed from RDR2 auto posts.');

								fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
									if (err) {console.log(`Error: ${err}`)} //If an error, console.log
		
										// console.log(`interaction.guild.id: ${interaction.guild.id}`)
										// console.log(`menuChannelID: ${menuChannelID}`)
										// console.log(`data.replace: ${data.replace(`\nguild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:rdoStartMenu - `, "")}`);
		
		
										fs.writeFile('./RDODataBase.txt', `${data.replace(`\nguild:${interaction.guild.id} - channel:${menuChannelID} - rdo_gta:rdoStartMenu - `, "")}`, function (err) {
											  if (err) throw err;
											}); //end fs:writeFile to remove channel from autoposts
		
									}); //end fs:readFile RDODataBase.txt
							
						} else {
								interaction.followUp({ content: `These options aren't for you!`, ephemeral: true });
						}

						
					} //end remove channel

		});//end fs:readFile	

		setTimeout(() => {
			interaction.editReply({components: []})
		}, (60000 * 2))			
			
		}// end if interaction.customId === 'rdoStopMenu'
		

	},
};




	