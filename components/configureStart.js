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
			if (interaction.customId.startsWith(`configureadd -`)) {
						await interaction.deferUpdate();	

			let buttonUserID01 = (interaction.customId).split("configureadd - ");
			let buttonUserID = buttonUserID01[1];
				//console.log(`buttonUserID: ${buttonUserID}`);
				//console.log(`interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`)						

			//console.log(`begin configureadd - ${interaction.customId}`);

			let AdminNameAdd = "";
			let AdminYesNoAdd = "";
        let adminRoleBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
        if (adminRoleBoolean[1].startsWith("yes")) { //If Admin permissions are required
                AdminNameAdd += 'No Role Selected';
                AdminYesNoAdd += 'undefinedrole';
        }		
        else {
            AdminNameAdd += 'Administrators';
            AdminYesNoAdd += 'yes';
        }

				
				const configureStartEmbed = new EmbedBuilder()
				.setColor(`0x00FFFF`) //Teal
				.setTitle(`Add a Role`)
				.setDescription(`Click **the dropdown menu** to add a role that will be able to control auto posts.`)	
				
				let configureStartMenu = new ActionRowBuilder()
				    .addComponents(
				        new SelectMenuBuilder()
				        .setCustomId(`configureaddmenu - u:${interaction.user.id}`)
				        .setPlaceholder('Select a Role')
				        .addOptions([{
				            label: AdminNameAdd,
				            description: AdminNameAdd,
				            value: `configureStartMenu - u:${AdminYesNoAdd} - r:${AdminYesNoAdd}`,
				        }])
				    )
				interaction.guild.roles.cache.forEach(role => {
					//console.log(`role names: ${role.name}`)
					if ((role.name != "@everyone") && (!data.includes(`${role.id}`)) ) {
						configureStartMenu.components[0].addOptions([{
								label: `${role.name}`,
								description: `${role.name}`,
								value: `configureStartMenu - u:${interaction.user.id} r:${role.id}`,
						}]);
					}
				});	

		if (interaction.user.id === buttonUserID) { 
        await interaction.editReply({ embeds: [configureStartEmbed], components: [configureStartMenu] })
        .catch(err => console.log(`configureStartEmbed+Menu Error: ${err.stack}`));
    } else {
       interaction.roles.followUp({ content: `These buttons aren't for you!`, ephemeral: true });
    }

			
		
		
		
		
		
		} // end if configurestart button
		
		}); //end fs:readFile
				
		
		
		
			
		
		
	},
};




	