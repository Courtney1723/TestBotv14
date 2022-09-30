const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile


module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log

			if (!interaction.isButton()) {return};
			if (interaction.customId.startsWith(`configurestop -`)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("configurestop - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin configurestop - ${interaction.customId}`);

			let AdminNameStop = "";
			let AdminYesNoStop = "";
        let adminRoleBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
        if (adminRoleBoolean[1].startsWith("yes")) { //If Admin permissions are required - opposite of configurestop
                AdminNameStop += 'Administrators';
                AdminYesNoStop += 'yes';
        }		
        else {
            AdminNameStop += 'No Role Selected';
            AdminYesNoStop += 'undefinedrole';
        }

				
				const configureStopEmbed = new EmbedBuilder()
				.setColor(`0x00FFFF`) //Teal
				.setTitle(`Remove a Role`)
				.setDescription(`Click **the dropdown menu** to remove a role that from being able to control auto posts.`)	
				
				let configureStopMenu = new ActionRowBuilder()
				    .addComponents(
				        new SelectMenuBuilder()
				        .setCustomId(`configurestopmenu - u:${interaction.user.id}`)
				        .setPlaceholder('Select a Role')
				        .addOptions([{
				            label: AdminNameStop,
				            description: AdminNameStop,
				            value: `configureStopMenu - u:${interaction.user.id} - r:${AdminYesNoStop}`,
				        }])
				    )
				interaction.guild.roles.cache.forEach(role => {
					//console.log(`role names: ${role.name}`)
					if ((role.name != "@everyone") && (data.includes(`${role.id}`)) ) {
						configureStopMenu.components[0].addOptions([{
								label: `${role.name}`,
								description: `${role.name}`,
								value: `configureStopMenu - u:${interaction.user.id} r:${role.id}`,
						}]);
					}
				});	

		if (interaction.user.id === buttonUserID) { 
        await interaction.editReply({ embeds: [configureStopEmbed], components: [configureStopMenu] })
        .catch(err => console.log(`configureStopEmbed+Menu Error: ${err.stack}`));
    } else {
       interaction.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
    }

				
		} // end if configureStop button
		
		}); //end fs:readFile

		
		
	},
};




	