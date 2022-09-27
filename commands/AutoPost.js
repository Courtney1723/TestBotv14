const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, PermissionsBitField } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const { exec } = require('node:child_process');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('autopost')
		.setDescription('Configure and Confirm Auto Post Settings')
		.setDMPermission(false),
	async execute(interaction, member) {

		const initialEmbed = new EmbedBuilder()
			.setColor(`0xFF008B`) //Pink
			.setTitle(`Auto Post Settings`)
			.setDescription(`Click **\'Start\'** to set up an auto post.
Click **\'Stop\'** to remove an auto post.
Click **\'Confirm\'** to view channels in this guild with auto posts set up.
Click **\'Configure\'** to add a role that can configure auto post settings.`)
			.setFooter({text: `note: only Admins can start, stop, or configure autoposts by default.`})

		const initialButtons = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('start')
					.setLabel('Start')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId('stop')
					.setLabel('Stop')
					.setStyle(ButtonStyle.Danger),				
				new ButtonBuilder()
					.setCustomId('confirm')
					.setLabel('Confirm')
					.setStyle(ButtonStyle.Secondary),		
				new ButtonBuilder()
					.setCustomId('configure')
					.setLabel('Configure')
					.setStyle(ButtonStyle.Primary),					
			);

//Initial Embed + Buttons (start, stop, confirm, configure)
		await interaction.reply({embeds: [initialEmbed], components: [initialButtons]});


		
//------------------------------BEGIN START BUTTON------------------------------//		
const startEmbed = new EmbedBuilder()
.setColor(`Green`) 
.setTitle(`Start Auto Posting`)
.setDescription(`Click **\'GTA\'** to set up Grand Theft Auto V Online Auto Posts for every Thursday at 2:00 PM EST.

Click **\'RDO\'** to set up Red Dead Redemption II Auto Posts for the first Tuesday of every month at 2:00 PM EST.`)		

const startButtons = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
        .setCustomId('gtastart')
        .setLabel('GTA')
        .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
        .setCustomId('rdostart')
        .setLabel('RDO')
        .setStyle(ButtonStyle.Danger),								
);	

//Initial Start embed + Buttons (gtastart + rdostart)	
const startFilter = i => i.customId === 'start'; 
const startCollector = interaction.channel.createMessageComponentCollector({ startFilter, time: 30000 });
startCollector.on('collect', async i => {
if (i.customId === 'start') {
    await i.deferUpdate();
    if (i.user.id === interaction.user.id) {
        await i.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`Login Error: ${err}`));
    } else {
        i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
    }


//BEGIN GTA START//
fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
const gtaStartEmbed = new EmbedBuilder()
.setColor(`Green`) 
.setTitle(`Start Auto Posting GTAV Online Bonuses & Discounts`)
.setDescription(`Click **the dropdown menu** to confirm the channel you want to send Grand Theft Auto V Auto Posts to every Thursday at 2:00 PM EST`)	

let gtaStartMenu = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
        .setCustomId('gtaStartMenu')
        .setPlaceholder('Select a Channel')
        .addOptions([{
            label: `No Channel Selected`,
            description: 'No Channel Selected',
            value: 'undefinedchannel',
        }])
    )
interaction.guild.channels.cache.forEach(channel => {
    if ((channel.type === 0) && (!data.includes(channel.id))) {
        gtaStartMenu.components[0].addOptions([{
            label: `${channel.name}`,
            description: `${channel.name}`,
            value: `${channel.id}`,
        }]);
    }
})

//Confirmation gtaStart embed + Menu (ch1 + ch2 + ch3...)	
const gtaFilter = i => i.customId === 'gtastart';
const gtaCollector = interaction.channel.createMessageComponentCollector({ gtaFilter, time: 30000 });
gtaCollector.on('collect', async i => {
if (i.customId === 'gtastart') {
    await i.deferUpdate();
    if (i.user.id === interaction.user.id) {
        await i.editReply({ embeds: [gtaStartEmbed], components: [gtaStartMenu] })
        .catch(err => console.log(`gtaStartEmbed+Menu Error: ${err}`));
    } else {
        i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
    }

const gtaValueFilter = i => i.customId === 'gtaStartMenu';
        const gtaValueCollector = interaction.channel.createMessageComponentCollector({ gtaValueFilter, time: 30000, max: 1 });
        gtaValueCollector.on('collect', async i => {
					//console.log(`i.values: ${i.values}`)
					if (i.customId === 'gtaStartMenu') {
					if (i.values.includes(`undefinedchannel`)) { //i.values === `undefinedchannel` does not work?

						const gtaDuplicateEmbed = new EmbedBuilder()
								.setColor(`Red`) 
								.setTitle(`Please Try Again`)
								.setDescription(`You have selected an invalid response "No channel selected".
\nTry the /autopost command again and click \'Confirm\' to see what channel(s) are subscribed.
\nIf you believe this is an error you can report it in the [Rockstar Weekly Support Server](${process.env.support_link}).`)	
						
						await i.deferUpdate();
						if (i.user.id === interaction.user.id) {
								await i.editReply({ embeds: [gtaDuplicateEmbed], components: [] })
								.catch(err => console.log(`Login Error: ${err}`));
						} else {
								i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
						}
						
					} 
					else { //add new channel to GTADataBase.txt

						const gtaConfirmEmbed = new EmbedBuilder()
								.setColor(`Green`) 
								.setTitle(`Success!`)
								.setDescription(`You will now get Grand Theft Auto V Auto Posts to the <#${i.values}> channel every Thursday at 2:00 PM EST.`)	
								.setFooter({ text: 'It can take up to 30 seconds for changes to take effect.' });
						
						await i.deferUpdate();
						if (i.user.id === interaction.user.id) {
								await i.editReply({ embeds: [gtaConfirmEmbed], components: [] })
								.catch(err => console.log(`Login Error: ${err}`));
						} else {
								i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
						}

					//Appends the GTADataBase.txt file with guildID, Channel ID, and choice of rdo of gta
					fs.appendFile(`GTADataBase.txt`,`guild:${interaction.guild.id} - channel:${i.values} - rdo_gta:${i.customId} - \n`, err => {
						 if (err) {
							 console.error(err)
							 return
								 }					
					}); // end fs:appendFile to add a channel for gta autop posts	
						
					} //end add new channel
					}// end if i.customId === 'gtaStartMenu'

});//end gtaValueCollector
gtaValueCollector.on('end', collected => {
//console.log(`Collected ${collected.size} items`);
});	
					
} //end if customId == gtastart
}); //end gtaCollector
gtaCollector.on('end', collected => {
//console.log(`Collected ${collected.size} items`);
});

});//end fs:readFile for gta channel matching

//END GTA START//


	
//BEGIN RDO START//
fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
const rdoStartEmbed = new EmbedBuilder()
.setColor(`Green`) 
.setTitle(`Start Auto Posting RDR2 Online Bonuses & Discounts`)
.setDescription(`Click **the dropdown menu** to confirm the channel you want to send Red Dead Redemption II Auto Posts to every Thursday at 2:00 PM EST`)	

let rdoStartMenu = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
        .setCustomId('rdoStartMenu')
        .setPlaceholder('Select a Channel')
        .addOptions([{
            label: `No Channel Selected`,
            description: 'No Channel Selected',
            value: 'undefinedchannel',
        }])
    )
interaction.guild.channels.cache.forEach(channel => {
    if ((channel.type === 0) && (!data.includes(channel.id))) {
        rdoStartMenu.components[0].addOptions([{
            label: `${channel.name}`,
            description: `${channel.name}`,
            value: `${channel.id}`,
        }]);
    }
})

//Confirmation rdoStart embed + Menu (ch1 + ch2 + ch3...)	
const rdoFilter = i => i.customId === 'rdostart';
const rdoCollector = interaction.channel.createMessageComponentCollector({ rdoFilter, time: 30000 });
rdoCollector.on('collect', async i => {
if (i.customId === 'rdostart') {
    await i.deferUpdate();
    if (i.user.id === interaction.user.id) {
        await i.editReply({ embeds: [rdoStartEmbed], components: [rdoStartMenu] })
        .catch(err => console.log(`rdoStartEmbed+Menu Error: ${err}`));
    } else {
        i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
    }

const rdoValueFilter = i => i.customId === 'rdoStartMenu';
        const rdoValueCollector = interaction.channel.createMessageComponentCollector({ rdoValueFilter, time: 30000, max: 1 });
        rdoValueCollector.on('collect', async i => {
					//console.log(`i.values: ${i.values}`)
					if (i.customId === 'rdoStartMenu') {
					if (i.values.includes(`undefinedchannel`)) { //i.values === `undefinedchannel` does not work?

						const rdoDuplicateEmbed = new EmbedBuilder()
								.setColor(`Red`) 
								.setTitle(`Please Try Again`)
								.setDescription(`You have selected an invalid response "No channel selected".
\nTry the /autopost command again and click \'Confirm\' to see what channel(s) are subscribed.
\nIf you believe this is an error you can report it in the [Rockstar Weekly Support Server](${process.env.support_link}).`)	
						
						await i.deferUpdate();
						if (i.user.id === interaction.user.id) {
								await i.editReply({ embeds: [rdoDuplicateEmbed], components: [] })
								.catch(err => console.log(`Login Error: ${err}`));
						} else {
								i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
						}
						
					} 
					else { //add new channel to RDODataBase.txt

						const rdoConfirmEmbed = new EmbedBuilder()
								.setColor(`Green`) 
								.setTitle(`Success!`)
								.setDescription(`You will now get Red Dead Redemption II Auto Posts to the <#${i.values}> channel the first Tuesday of every month at 2:00 PM EST.`)	
								.setFooter({ text: 'It can take up to 30 seconds for changes to take effect.' });
						
						await i.deferUpdate();
						if (i.user.id === interaction.user.id) {
								await i.editReply({ embeds: [rdoConfirmEmbed], components: [] })
								.catch(err => console.log(`Login Error: ${err}`));
						} else {
								i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
						}

					//Appends the RDODataBase.txt file with guildID, Channel ID, and choice of rdo or gta
					fs.appendFile(`RDODataBase.txt`,`guild:${interaction.guild.id} - channel:${i.values} - rdo_gta:${i.customId} - \n`, err => {
						 if (err) {
							 console.error(err)
							 return
								 }					
					}); // end fs:appendFile to add a channel for rdo autoposts	
						
					} //end add new channel
					}// end if i.customId === 'rdoStartMenu'


});//end rdoValueCollector
rdoValueCollector.on('end', collected => {
//console.log(`Collected ${collected.size} items`);
});	
					
} //end if customId == rdostart
}); //end rdoCollector
rdoCollector.on('end', collected => {
//console.log(`Collected ${collected.size} items`);
});

});//end fs:readFile for rdo channel matching

//END RDO START//

	
} //end if customId === start
});	//end startCollector
startCollector.on('end', collected => {
//console.log(`Collected ${collected.size} items`);
});
    
//------------------------------END START BUTTON------------------------------//


		
//------------------------------BEGIN STOP BUTTON------------------------------//
let channelIDArray = [];
interaction.guild.channels.cache.forEach(channel => {
    if (channel.type === 0) {
        channelIDArray.push(`${channel.id}`);
    }
});
//console.log(`channelIDArray: ${channelIDArray}`);

const stopEmbed = new EmbedBuilder()
.setColor(`Red`) 
.setTitle(`Stop Auto Posting`)
.setDescription(`Select \'GTA\' to unsubscribe from Grand Theft Auto V Online auto posts.
Select \'RDO\' to unsubscribe from Red Dead Redemption II Online auto posts.`)

const stopButtons = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
        .setCustomId('gtastop')
        .setLabel('GTA')
        .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
        .setCustomId('rdostop')
        .setLabel('RDO')
        .setStyle(ButtonStyle.Danger),								
);	

//Initial Stop embed + Buttons (gtastop + rdostop)	
		const stopFilter = i => i.customId === 'stop'; 
		const stopCollector = interaction.channel.createMessageComponentCollector({ stopFilter, time: 30000 });
		stopCollector.on('collect', async i => {
			if (i.customId === 'stop') {
				await i.deferUpdate();
				if (i.user.id === interaction.user.id) {
					await i.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => console.log(`Login Error: ${err}`));
				} else {
					i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
				}
			}
		});	

//BEGIN GTA STOP//
const gtaStopEmbed = new EmbedBuilder()
    .setColor(`Red`) 
    .setTitle(`Stop Auto Posting GTAV`)
    .setDescription(`Select any channel(s) from the dropdown menu to unsubscribe.`)        
		
let gtaStopMenu = new ActionRowBuilder()
.addComponents(
    new SelectMenuBuilder()
    .setCustomId('gtaStopMenu')
    .setPlaceholder('Select a Channel')
    .addOptions([{
        label: `No Channel Selected`,
        description: 'No Channel Selected',
        value: 'undefinedchannel',
    }])
)

fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
    else {
        interaction.guild.channels.cache.forEach(channel => {
            if ( (channel.type === 0) && (data.includes(`${channel.id}`)) ) {
                            gtaStopMenu.components[0].addOptions([{
                                label: `${channel.name}`,
                                description: `${channel.name}`,
                                value: `${channel.id}`,
                            }]);
                        }
                    })

                    //console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
                    //console.log(`GTAStopString at ${i}: ${GTAStopString}`);	
    } 

		//Confirmation gtaStop embed + Menu (ch1 + ch2 + ch3...)	
		const gtaFilter = i => i.customId === 'gtastop';
		const gtaCollector = interaction.channel.createMessageComponentCollector({ gtaFilter, time: 30000 });
		gtaCollector.on('collect', async i => {
			if (i.customId === 'gtastop') {
				await i.deferUpdate();
				if (i.user.id === interaction.user.id) {
					await i.editReply({ embeds: [gtaStopEmbed], components: [gtaStopMenu] }).catch(err => console.log(`gtaStopEmbed Error: ${err}`));
				} else {
					i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
				}

				const gtaValueFilter = i => i.customId === 'gtaStopMenu';
					const gtaValueCollector = interaction.channel.createMessageComponentCollector({ gtaValueFilter, time: 30000 });
					gtaValueCollector.on('collect', async i => {	

						fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
							if (err) {console.log(`Error: ${err}`)} //If an error, console.log
							else {
								if (!i.values.includes(`undefinedchannel`)) {
								console.log(`data.replace: ${data.replace(`guild:${interaction.guild.id} - channel:${i.values} - rdo_gta:gtaStartMenu -`, "")}`);

								
								fs.writeFile('./GTADataBase.txt', `${data.replace(`guild:${interaction.guild.id} - channel:${i.values} - rdo_gta:gtaStartMenu -`, "")}`, function (err) {
									  if (err) throw err;
									  console.log('A user unsubscribed from GTAV auto posts.');
									}); //end fs:writeFile to remove channel from autoposts

							const gtaStopConfirmEmbed = new EmbedBuilder()
								.setColor(`Green`) 
								.setTitle(`Success!`)
								.setDescription(`You have successfully unsubscribed <#${i.values}> from recieving GTAV online auto posts.`)
								.setFooter({ text: 'It can take up to 30 seconds for changes to take effect.' })
								
								await i.deferUpdate();
								if (i.user.id === interaction.user.id) {
									await i.editReply({ embeds: [gtaStopConfirmEmbed], components: [] }).catch(err => console.log(`Login Error: ${err}`));
								} else {
									i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
								}
						
							}// end remove channel
							else {
								console.log(`error`);
							}
							}
						})

					}); //end collecting for gtaStopMenu Values
					gtaCollector.on('end', collected => {
						//console.log(`Collected ${collected.size} items`);
					});

			} // end collecting for gtastop

		});
		gtaCollector.on('end', collected => {
			//console.log(`Collected ${collected.size} items`);
		});
	})
	//END GTA STOP//


//BEGIN RDO STOP//
const rdoStopEmbed = new EmbedBuilder()
    .setColor(`Red`) 
    .setTitle(`Stop Auto Posting RDR2`)
    .setDescription(`Select any channel(s) from the dropdown menu to unsubscribe.`)        
		
let rdoStopMenu = new ActionRowBuilder()
.addComponents(
    new SelectMenuBuilder()
    .setCustomId('rdoStopMenu')
    .setPlaceholder('Select a Channel')
    .addOptions([{
        label: `No Channel Selected`,
        description: 'No Channel Selected',
        value: 'undefinedchannel',
    }])
)

fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
    else {
        interaction.guild.channels.cache.forEach(channel => {
            if ( (channel.type === 0) && (data.includes(`${channel.id}`)) ) {
                            rdoStopMenu.components[0].addOptions([{
                                label: `${channel.name}`,
                                description: `${channel.name}`,
                                value: `${channel.id}`,
                            }]);
                        }
                    })

                    //console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
                    //console.log(`RDOStopString at ${i}: ${RDOStopString}`);	
    } 

		//Confirmation rdoStop embed + Menu (ch1 + ch2 + ch3...)	
		const rdoFilter = i => i.customId === 'rdostop';
		const rdoCollector = interaction.channel.createMessageComponentCollector({ rdoFilter, time: 30000 });
		rdoCollector.on('collect', async i => {
			if (i.customId === 'rdostop') {
				await i.deferUpdate();
				if (i.user.id === interaction.user.id) {
					await i.editReply({ embeds: [rdoStopEmbed], components: [rdoStopMenu] }).catch(err => console.log(`rdoStopEmbed Error: ${err}`));
				} else {
					i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
				}

				const rdoValueFilter = i => i.customId === 'rdoStopMenu';
					const rdoValueCollector = interaction.channel.createMessageComponentCollector({ rdoValueFilter, time: 30000 });
					rdoValueCollector.on('collect', async i => {	

						fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
							if (err) {console.log(`Error: ${err}`)} //If an error, console.log
							else {
								if (!i.values.includes(`undefinedchannel`)) {
								console.log(`i.values: ${i.values}`)
								console.log(`data.replace: ${data.replace(`guild:${interaction.guild.id} - channel:${i.values} - rdo_gta:rdoStartMenu -`, "")}`);

								
								fs.writeFile('./RDODataBase.txt', `${data.replace(`guild:${interaction.guild.id} - channel:${i.values} - rdo_gta:rdoStartMenu -`, "")}`, function (err) {
									  if (err) throw err;
									  console.log('A user unsubscribed from RDR2 auto posts.');
									}); //end fs:writeFile to remove channel from autoposts

							const rdoStopConfirmEmbed = new EmbedBuilder()
								.setColor(`Green`) 
								.setTitle(`Success!`)
								.setDescription(`You have successfully unsubscribed <#${i.values}> from recieving RDR2 online auto posts.`)
								.setFooter({ text: 'It can take up to 30 seconds for changes to take effect.' })
								
								await i.deferUpdate();
								if (i.user.id === interaction.user.id) {
									await i.editReply({ embeds: [rdoStopConfirmEmbed], components: [] }).catch(err => console.log(`Login Error: ${err}`));
								} else {
									i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
								}
						
							}// end remove channel
							else {
								console.log(`error`);
							}
							}
						})

					}); //end collecting for rdoStopMenu Values
					rdoCollector.on('end', collected => {
						//console.log(`Collected ${collected.size} items`);
					});

			} // end collecting for rdostop

		});
		rdoCollector.on('end', collected => {
			//console.log(`Collected ${collected.size} items`);
		});
	})
	//END RDO STOP//
		
		
//------------------------------END STOP BUTTON------------------------------//

		
//------------------------------BEGIN CONFIRM BUTTON------------------------------//

		let GTAConfirmString = "";
		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
			else {
					//console.log(`data: ${data}`);
					for (i = 0; i <= channelIDArray.length - 1; i++) {
						if (data.includes(`${channelIDArray[i]}`)) { //If the GTADataBase.txt contains a channel in the interaction guild
							GTAConfirmString += `• <#${channelIDArray[i]}>\n`;
							//console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
							//console.log(`GTAConfirmString at ${i}: ${GTAConfirmString}`);	
						} 
					}
				}
			//console.log(`GTAConfirmString: ${GTAConfirmString}`);	
			if (!GTAConfirmString.includes('• ')) {
				GTAConfirmString += `• There are no channels in this guild subscribed to GTAV auto posts.\n`;
			}
		
		let RDOConfirmString = "";
		fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
			else {
					//console.log(`data: ${data}`);
					for (i = 0; i <= channelIDArray.length - 1; i++) {
						if (data.includes(`${channelIDArray[i]}`)) { //If the GTADataBase.txt contains a channel in the interaction guild
							RDOConfirmString += `• <#${channelIDArray[i]}>\n`;
							//console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
							//console.log(`RDOConfirmString at ${i}: ${RDOConfirmString}`);	
						} 
					}
				}
			//console.log(`RDOConfirmString: ${RDOConfirmString}`);	
			if (!RDOConfirmString.includes('• ')) {
				RDOConfirmString += `• There are no channels in this guild subscribed to RDR2 auto posts.\n`;
			}

			let roleIDArray = [];
			interaction.guild.roles.cache.forEach(role => {
			    roleIDArray.push(`${role.id}`);
			});
			roleIDArray.shift(); //removes the @everyone role
			//console.log(`roleIDArray[]: ${roleIDArray}`);
			
			let ConfigureConfirmString = "";
			fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
			    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
			    else {
            //console.log(`data: ${data}`);
						if (data.includes(`guild:${interaction.guild.id} - admin:yes`)) {
							ConfigureConfirmString += `• Administrators\n`;
						}
            for (i = 0; i <= roleIDArray.length - 1; i++) {
                if (data.includes(`${roleIDArray[i]}`)) { //If the GTADataBase.txt contains a channel in the interaction guild
                    ConfigureConfirmString += `• <@&${roleIDArray[i]}>\n`;
                    //console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
                    //console.log(`ConfigureConfirmString at ${i}: ${ConfigureConfirmString}`);	
                } 
            }
        }
    //console.log(`ConfigureConfirmString: ${ConfigureConfirmString}`);	
    if (!ConfigureConfirmString.includes('• ')) {
        ConfigureConfirmString += `• There are no roles in this guild that are allowed to configure auto posts.\n`;
    }	
			
			

		const confirmEmbed = new EmbedBuilder()
			.setColor(`Blue`) 
			.setTitle(`Your Current Auto Post Channels:`)
			.setDescription(`
**Grand Theft Auto V:**
${GTAConfirmString}
**Red Dead Redemption II:**
${RDOConfirmString}
**Roles Allowed to Configure Auto Posts**
${ConfigureConfirmString}`)	
			.setFooter({ text: 'It can take up to 30 seconds for changes to take effect.' });
			
		const confirmFilter = i => i.customId === 'confirm'; 
		const confirmCollector = interaction.channel.createMessageComponentCollector({ confirmFilter, time: 30000 });
		confirmCollector.on('collect', async i => {
			if (i.customId === 'confirm') {
				await i.deferUpdate();
				if (i.user.id === interaction.user.id) {
					await i.editReply({ embeds: [confirmEmbed], components: [] }).catch(err => console.log(`confirmEmbed [] Error: ${err}`));
				} else {
					i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
				}
			}
		});
		confirmCollector.on('end', collected => {
			//console.log(`Collected ${collected.size} items`);
		});
	});
	}); //end fs.readFile rolesDataBase
	})
				

//------------------------------END CONFIRM BUTTON------------------------------//


//------------------------------BEGIN CONFIGURE BUTTON------------------------------//

const configureEmbed = new EmbedBuilder()
.setColor(`0x00FFFF`) //Teal
.setTitle(`Add or Remove a Role`)
.setDescription(`Click **\'Add\'** to add a role that can start and stop auto posts.

Click **\'Remove\'** to remove a role that can start and stop auto posts.`)		

const configureButtons = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
        .setCustomId('configureadd')
        .setLabel('Add')
        .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
        .setCustomId('configurestop')
        .setLabel('Remove')
        .setStyle(ButtonStyle.Danger),								
);	

//Initial Configure embed + Buttons (Add + Remove)	
    const configureFilter = i => i.customId === 'configure'; 
    const configureCollector = interaction.channel.createMessageComponentCollector({ configureFilter, time: 30000 });
    configureCollector.on('collect', async i => {
        if (i.customId === 'configure') {
            await i.deferUpdate();
            if ( (i.user.id === interaction.user.id) && (interaction.member.permissions.has(PermissionsBitField.Flags.ADMINISTRATOR)) ) {
                await i.editReply({ embeds: [configureEmbed], components: [configureButtons] }).catch(err => console.log(`ConfigureEmbed Error: ${err}`));
            } else {
                i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
            }
        }

//BEGIN CONFIGURE ADD//

let AdminNameAdd = "";
let AdminYesNoAdd = "";
fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
        //console.log(`data: ${data}`);
        let adminRoleBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
        if (adminRoleBoolean[1].startsWith("yes")) { //If Admin permissions are required
                AdminNameAdd += 'No Role Selected';
                AdminYesNoAdd += 'undefinedrole';
        }		
        else {
            AdminNameAdd += 'Administrators';
            AdminYesNoAdd += 'yes';
        }

const configureAddEmbed = new EmbedBuilder()
.setColor(`0x00FFFF`) //Teal
.setTitle(`Add a Role`)
.setDescription(`Click **the dropdown menu** to add a role that will be able to control auto posts.`)	

let configureAddMenu = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
        .setCustomId('configuremaddmenu')
        .setPlaceholder('Select a Role')
        .addOptions([{
            label: AdminNameAdd,
            description: AdminNameAdd,
            value: AdminYesNoAdd,
        }])
    )
interaction.guild.roles.cache.forEach(role => {
	//console.log(`role names: ${role.name}`)
	if ((role.name != "@everyone") && (!data.includes(`${role.id}`)) ) {
		configureAddMenu.components[0].addOptions([{
				label: `${role.name}`,
				description: `${role.name}`,
				value: `${role.id}`,
		}]);
	}
});

//Configure Role embed + Menu (role1 + rol2 + role3...)	
const configureAddFilter = i => i.customId === 'configureadd';
const configureAddCollector = interaction.channel.createMessageComponentCollector({ configureAddFilter, time: 30000 });
configureAddCollector.on('collect', async i => {
    if (i.customId === 'configureadd') {
        await i.deferUpdate();
        if (i.user.id === interaction.user.id) {
            await i.editReply({ embeds: [configureAddEmbed], components: [configureAddMenu] })
            .catch(err => console.log(`confirmAddEmbed+Menu Error: ${err}`));
            } else {
            i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
        }
    } 

const configureStartValueFilter = i => i.customId === 'configuremaddmenu';
const configureStartValueCollector = interaction.channel.createMessageComponentCollector({ configureStartValueFilter, time: 30000, max: 1 });
configureStartValueCollector.on('collect', async i => {		

let guildIdDB = `${interaction.guild.id}`;
	if (i.customId === 'configuremaddmenu') {
  if (i.values === `undefinedrole`) { //if the Admin role is already required - error

    const configureDuplicateEmbed = new EmbedBuilder()
    .setColor(`Red`) 
    .setTitle(`Please Try Again`)
    .setDescription(`You selected an invalid response "No Role Selected".
\nTry the /autopost command again and click \'Confirm\' to see what role(s) are subscribed.
\nIf you believe this is an error you can report it in the [Rockstar Weekly Support Server](${process.env.support_link}).`)	
    
    await i.deferUpdate();
    if (i.user.id === interaction.user.id) {
        await i.editReply({ embeds: [configureDuplicateEmbed], components: [] })
        .catch(err => console.log(`configureDuplicateEmbed Error: ${err}`));
        } else {
        i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
    }

  } //end if i.values === `undefinedrole`
  else if (i.values.includes('yes')) { //Make the Admin permission required
		//console.log(`adding admin role for ${guildIdDB}`);
    const configureConfirmAddEmbed = new EmbedBuilder()
        .setColor(`Green`) 
        .setTitle(`Success!`)
        .setDescription(`Administrator privileges are now required to configure autoposts.`)	
        .setFooter({ text: 'It can take up to 30 seconds for changes to take effect.' });

    await i.deferUpdate();
    if (i.user.id === interaction.user.id) {
        await i.editReply({ embeds: [configureConfirmAddEmbed], components: [] })
        .catch(err => console.log(`configureConfirmAddEmbed Error: ${err}`));
    } else {
        i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
    }

		guildCount = data.split(`guild:${guildIdDB}`).length - 1;
			console.log(`guildCount: ${guildCount}`);

		const find = `${guildIdDB} - admin:no`;
		const replace = `${guildIdDB} - admin:yes`;
		let newData = data;
			for (i=0;i<=guildCount-1;i++) { //iterates through every instance of required roles by guild
				newData = newData.replace(new RegExp(find, 'g'), replace);
			}
		//console.log(`newData: ${newData}`);
                                        
    //Replaces the rolesDataBase.txt file with Admin permission for the guild
    fs.writeFile(`./rolesDataBase.txt`,`${newData}`, err => {
        if (err) {
            console.error(err)
            return
            }					
        }); //end fs.writeFile to change the admin priveleges	

    }    // end adding Admins as a required permission 
		else {

			const configureAddEmbed = new EmbedBuilder()
				.setColor(`Green`) 
				.setTitle(`Success!`)
				.setDescription(`The <@&${i.values}> role is now required to configure auto posts.`)	
				.setFooter({ text: 'It can take up to 30 seconds for changes to take effect.' });		

	    await i.deferUpdate();
	    if (i.user.id === interaction.user.id) {
	        await i.editReply({ embeds: [configureAddEmbed], components: [] })
	        .catch(err => console.log(`configureAddEmbed Error: ${err}`));
	    } else {
	        i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
	    }		

			function AdminYesNo() {
				if (AdminYesNoAdd === 'undefinedrole') {
					return 'yes';
				}
				else {
					return 'no';
				}
			}

			fs.appendFile(`rolesDataBase.txt`,`guild:${guildIdDB} - admin:${AdminYesNo()} - role:${i.values} - \n`, err => {
			 if (err) {
				 console.error(err)
				 return
				}					
			}); // end fs:appendFile to add a channel for gta autop posts	
		} // end adding a new role to rolesDataBase.txt

	}//end i.customId === 'configureadd'
}); //end configureStartValueCollector
configureStartValueCollector.on('end', collected => {
    //console.log(`Collected ${collected.size} items`);
}); 

}); //end configureAddCollector
configureAddCollector.on('end', collected => {
    //console.log(`Collected ${collected.size} items`);
}); 
	
}); //end fs:readFile for Admin credentials check	


//END CONFIGURE ADD//




//BEGIN CONFIGURE STOP//

let AdminNameStop = "";
let AdminYesNoStop = "";
fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
        //console.log(`data: ${data}`);
        let adminRoleBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
        if (adminRoleBoolean[1].startsWith("yes")) { //If Admin permissions are required //opposite of confirm add
                AdminNameStop += 'Administrators';
                AdminYesNoStop += 'yes';
        }		
        else {
            AdminNameStop += 'No Role Selected';
            AdminYesNoStop += 'undefinedrole';
        }

const configureStopEmbed = new EmbedBuilder()
.setColor(`0x00FFFF`) //Teal
.setTitle(`Stop a Role`)
.setDescription(`Click **the dropdown menu** to remove a role from being able to configure auto posts.`)	

let configureStopMenu = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
        .setCustomId('configuremstopmenu')
        .setPlaceholder('Select a Role')
        .addOptions([{
            label: AdminNameStop,
            description: AdminNameStop,
            value: AdminYesNoStop,
        }])
    )
interaction.guild.roles.cache.forEach(role => {
	//console.log(`role names: ${role.name}`)
	if ((role.name != "@everyone") && (data.includes(`${role.id}`)) ) {
		configureStopMenu.components[0].addOptions([{
				label: `${role.name}`,
				description: `${role.name}`,
				value: `${role.id}`,
		}]);
	}
});

//Configure Role embed + Menu (role1 + rol2 + role3...)	
const configureStopFilter = i => i.customId === 'configurestop';
const configureStopCollector = interaction.channel.createMessageComponentCollector({ configureStopFilter, time: 30000 });
configureStopCollector.on('collect', async i => {
    if (i.customId === 'configurestop') {
        await i.deferUpdate();
        if (i.user.id === interaction.user.id) {
            await i.editReply({ embeds: [configureStopEmbed], components: [configureStopMenu] })
            .catch(err => console.log(`confirmStopEmbed+Menu Error: ${err}`));
            } else {
            i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
        }
    } 

const configureStopValueFilter = i => i.customId === 'configuremstopmenu';
const configureStopValueCollector = interaction.channel.createMessageComponentCollector({ configureStopValueFilter, time: 30000, max: 1 });
configureStopValueCollector.on('collect', async i => {		

let guildIdDB = `${interaction.guild.id}`;
	if (i.customId === 'configuremstopmenu') {
  if (i.values === `undefinedrole`) { //if the Admin role is already required - error

    const configureDuplicateEmbed = new EmbedBuilder()
    .setColor(`Red`) 
    .setTitle(`Please Try Again`)
    .setDescription(`You selected an invalid response "No Role Selected".
\nTry the /autopost command again and click \'Confirm\' to see what role(s) are subscribed.
\nIf you believe this is an error you can report it in the [Rockstar Weekly Support Server](${process.env.support_link}).`)	
    
    await i.deferUpdate();
    if (i.user.id === interaction.user.id) {
        await i.editReply({ embeds: [configureDuplicateEmbed], components: [] })
        .catch(err => console.log(`configureDuplicateEmbed Error: ${err}`));
        } else {
        i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
    }

  } //end if i.values === `undefinedrole`
  else if (i.values.includes('yes')) { //Make the Admin permission required
		//console.log(`stopping admin role for ${guildIdDB}`);
    const configureConfirmStopEmbed = new EmbedBuilder()
        .setColor(`Green`) 
        .setTitle(`Success!`)
        .setDescription(`Administrator privileges are now required to configure autoposts.`)	
        .setFooter({ text: 'It can take up to 30 seconds for changes to take effect.' });

    await i.deferUpdate();
    if (i.user.id === interaction.user.id) {
        await i.editReply({ embeds: [configureConfirmStopEmbed], components: [] })
        .catch(err => console.log(`configureConfirmStopEmbed Error: ${err}`));
    } else {
        i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
    }

		guildCount = data.split(`guild:${guildIdDB}`).length - 1;
			console.log(`guildCount: ${guildCount}`);

		const find = `${guildIdDB} - admin:no`;
		const replace = `${guildIdDB} - admin:yes`;
		let newData = data;
			for (i=0;i<=guildCount-1;i++) { //iterates through every instance of required roles by guild
				newData = newData.replace(new RegExp(find, 'g'), replace);
			}
		//console.log(`newData: ${newData}`);
                                        
    //Replaces the rolesDataBase.txt file with Admin permission for the guild
    fs.writeFile(`./rolesDataBase.txt`,`${newData}`, err => {
        if (err) {
            console.error(err)
            return
            }					
        }); //end fs.writeFile to change the admin priveleges	

    }    // end stopping Admins as a required permission 
		else {

			const configureStopEmbed = new EmbedBuilder()
				.setColor(`Green`) 
				.setTitle(`Success!`)
				.setDescription(`The <@&${i.values}> role is no longer required to configure auto posts.`)	
				.setFooter({ text: 'It can take up to 30 seconds for changes to take effect.' });		

	    await i.deferUpdate();
	    if (i.user.id === interaction.user.id) {
	        await i.editReply({ embeds: [configureStopEmbed], components: [] })
	        .catch(err => console.log(`configureStopEmbed Error: ${err}`));
	    } else {
	        i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
	    }		

			function AdminYesNo() { //opposite of confirm add
				if (AdminYesNoStop === 'undefinedrole') {
					return 'no';
				}
				else {
					return 'yes';
				}
			}
			console.log(`role:${i.values}`);
			console.log(`AdminYesNo(): ${AdminYesNo()}`);
			console.log(`data.replace: ${data.replace(`guild:${interaction.guild.id} - admin:${AdminYesNo()} - role:${i.values} -`, "")}`)

			fs.writeFile('./rolesDataBase.txt', `${data.replace(`guild:${interaction.guild.id} - admin:${AdminYesNo()} - role:${i.values} -`, "")}`, function (err) {
				if (err) throw err;
				console.log('A user removed a role from auto posts.');
			}); //end fs:writeFile to remove a role from autoposts
		} // end stopping a new role to rolesDataBase.txt

	}//end i.customId === 'configurestop'
}); //end configureStopValueCollector
configureStopValueCollector.on('end', collected => {
    //console.log(`Collected ${collected.size} items`);
}); 

}); //end configureStopCollector
configureStopCollector.on('end', collected => {
    //console.log(`Collected ${collected.size} items`);
}); 
	
}); //end fs:readFile for Admin credentials check	 


//END CONFIGURE STOP//
			
}); // end configureCollector	
configureCollector.on('end', collected => {
		//console.log(`Collected ${collected.size} items`);
}); 

//------------------------------END CONFIGURE BUTTON------------------------------//
		


}}
