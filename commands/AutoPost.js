const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const { exec } = require('node:child_process');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('autopost')
		.setDescription('Configure and Confirm Auto Post Settings')
		.setDMPermission(false),
	async execute(interaction) {

		const initialEmbed = new EmbedBuilder()
			.setColor(`0xFF008B`) //Pink
			.setTitle(`Auto Post Settings`)
			.setDescription(`Click **\'Start\'** to set up an Auto Post.
Click **\'Stop\'** to remove an Auto Post
Click **\'Confirm\'** to view channels in this guild with Auto Posts set up
Click **\'Configure\'** to add a role that can configure Auto Post Settings.
note: only Admins can start or stop auto posts by default.`)

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

Click **\'RDO\'** to set up Red Dead Redemption II Auto Posts for every first Tuesday of the month at 2:00 PM EST`)		

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
				await i.editReply({ embeds: [startEmbed], components: [startButtons] });
			}
		});	

		//BEGIN GTA START//
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
			    if (channel.type === 0) {
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
				await i.editReply({ embeds: [gtaStartEmbed], components: [gtaStartMenu] });

					const gtaValueFilter = i => i.values;
					const gtaValueCollector = interaction.channel.createMessageComponentCollector({ gtaValueFilter, time: 30000 });
					gtaValueCollector.on('collect', async i => {							

						    let guildIdDB = `${interaction.guild.id}`;
								let channelIdDB = `${i.values}`;
								let rdo_gta_DB = `${i.customId}`;

								fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
								  if (err) {console.log(`Error: ${err}`)} //If an error, console.log
									else if (data.includes(`${channelIdDB}`)) { 
											const gtaDuplicateEmbed = new EmbedBuilder()
												.setColor(`Red`) 
												.setTitle(`Please Try Again`)
												.setDescription(`The <#${i.values}> channel is already set up to get Grand Theft Auto V Auto Posts.
\nTry the /autopost command again and click \'Confirm\' to see what channel(s) are subscribed.
\nIf you believe this is an error you can report it in the [Rockstar Weekly Support Server](${process.env.support_link}).`)	
											
											await i.deferUpdate();
												await i.editReply({ embeds: [gtaDuplicateEmbed], components: [] });	
									} 
									else {

											const gtaConfirmEmbed = new EmbedBuilder()
												.setColor(`Green`) 
												.setTitle(`Success!`)
												.setDescription(`You will now get Grand Theft Auto V Auto Posts to the <#${i.values}> channel every Thursday at 2:00 PM EST.`)	
											
											await i.deferUpdate();
												await i.editReply({ embeds: [gtaConfirmEmbed], components: [] });	

										//Appends the GTADataBase.txt file with guildID, Channel ID, and choice of rdo of gta
							       fs.appendFile(`GTADataBase.txt`,`guild:${guildIdDB} - channel:${channelIdDB} - rdo_gta:${rdo_gta_DB} - \n`, err => {
							         if (err) {
							           console.error(err)
							           return
							         	}					
											})											
										}
			
		})
					});

				
			}
		});	


//BEGIN RDO START//
const rdoStartEmbed = new EmbedBuilder()
    .setColor(`Green`) 
    .setTitle(`Start Auto Posting RDOV Online Bonuses & Discounts`)
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
        if (channel.type === 0) {
            rdoStartMenu.components[0].addOptions([{
                label: `${channel.name}`,
                description: `${channel.name}`,
                value: `${channel.id}`,
            }]);
        }
    });
        
//Confirmation rdoStart embed + Menu (ch1 + ch2 + ch3...)	
const rdoFilter = i => i.customId === 'rdostart';
const rdoCollector = interaction.channel.createMessageComponentCollector({ rdoFilter, time: 30000 });
rdoCollector.on('collect', async i => {
	
    if (i.customId === 'rdostart') {
        await i.deferUpdate();
        	await i.editReply({ embeds: [rdoStartEmbed], components: [rdoStartMenu] });

            const rdoValueFilter = i => i.values;
            const rdoValueCollector = interaction.channel.createMessageComponentCollector({ rdoValueFilter, time: 30000 });
            rdoValueCollector.on('collect', async i => {							

                    let guildIdDB = `${interaction.guild.id}`;
                        let channelIdDB = `${i.values}`;
                        let rdo_gta_DB = `${i.customId}`;

                        fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
                          if (err) {console.log(`Error: ${err}`)} //If an error, console.log
                            else if (data.includes(`${channelIdDB}`)) { 
                                    const rdoDuplicateEmbed = new EmbedBuilder()
                                        .setColor(`Red`) 
                                        .setTitle(`Please Try Again`)
                                        .setDescription(`The <#${i.values}> channel is already set up to get Red Dead Redemption II Auto Posts.
\nTry the /autopost command again and click \'Confirm\' to see what channel(s) are subscribed.
\nIf you believe this is an error you can report it in the [Rockstar Weekly Support Server](${process.env.support_link}).`)	
                                    
                                    await i.deferUpdate();
                                    	await i.editReply({ embeds: [rdoDuplicateEmbed], components: [] });
                            } 
                            else {

                                    const rdoConfirmEmbed = new EmbedBuilder()
                                        .setColor(`Green`) 
                                        .setTitle(`Success!`)
                                        .setDescription(`You will now get Red Dead Redemption II Auto Posts to the <#${i.values}> channel every Thursday at 2:00 PM EST.`)	
                                    
                                    await i.deferUpdate();
                                    	await i.editReply({ embeds: [rdoConfirmEmbed], components: [] });	

                                //Appends the RDODataBase.txt file with guildID, Channel ID, and choice of rdo of rdo
                           fs.appendFile(`RDODataBase.txt`,`guild:${guildIdDB} - channel:${channelIdDB} - rdo_gta:${rdo_gta_DB} - \n`, err => {
                             if (err) {
                               console.error(err)
                               return
                                 }					
                                    })											
                                }
    
												});
            });
		}
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
					await i.editReply({ embeds: [stopEmbed], components: [stopButtons] });
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
				await i.editReply({ embeds: [gtaStopEmbed], components: [gtaStopMenu] });  

				const gtaValueFilter = i => i.values;
					const gtaValueCollector = interaction.channel.createMessageComponentCollector({ gtaValueFilter, time: 30000 });
					gtaValueCollector.on('collect', async i => {	

						    let guildIdDB = `${interaction.guild.id}`;		
								let channelIdDB = `${i.values}`;
								let rdo_gta_DB = `${i.customId}`;

						fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
							if (err) {console.log(`Error: ${err}`)} //If an error, console.log
							else {
								//FIXME... how to remove i.values from GTADataBase.txt ??
								console.log(`i values: ${i.values}`);
								let gtaStopChannelIDs = i.values;
								console.log(`data: ${data.replace(`guild:${guildIdDB} - channel:${i.values} - rdo_gta:gtaStartMenu -`, "")}`);

								fs.writeFile('./GTADataBase.txt', `${data.replace(`guild:${guildIdDB} - channel:${i.values} - rdo_gta:gtaStartMenu -`, "")}`, function (err) {
									  if (err) throw err;
									  console.log('A user unsubscribed from GTAV auto posts.');
									});

							const gtaStopConfirmEmbed = new EmbedBuilder()
								.setColor(`Green`) 
								.setTitle(`Success!`)
								.setDescription(`You have successfully unsubscribed <#${i.values}> from recieving GTAV online auto posts.`)
								await i.deferUpdate();
								await i.editReply({ embeds: [gtaStopConfirmEmbed], components: [] });
						
							}
						});

					}); //end collecting for gtaStopMenu Values

			} // end collecting for gtastop

	});
	});
	//EDND GTA STOP//



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
            await i.editReply({ embeds: [rdoStopEmbed], components: [rdoStopMenu] });  

            const rdoValueFilter = i => i.values;
                const rdoValueCollector = interaction.channel.createMessageComponentCollector({ rdoValueFilter, time: 30000 });
                rdoValueCollector.on('collect', async i => {	

                        let guildIdDB = `${interaction.guild.id}`;		
                            let channelIdDB = `${i.values}`;
                            let rdo_gta_DB = `${i.customId}`;

                    fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
                        if (err) {console.log(`Error: ${err}`)} //If an error, console.log
                        else {
                            //FIXME... how to remove i.values from RDODataBase.txt ??
                            console.log(`i values: ${i.values}`);
                            let rdoStopChannelIDs = i.values;
                            console.log(`data: ${data.replace(`guild:${guildIdDB} - channel:${i.values} - rdo_gta:rdoStartMenu -`, "")}`);

                            fs.writeFile('./RDODataBase.txt', `${data.replace(`guild:${guildIdDB} - channel:${i.values} - rdo_gta:rdoStartMenu -`, "")}`, function (err) {
                                  if (err) throw err;
                                  console.log('A user unsubscribed from RDR2 auto posts.');
                                });

                        const rdoStopConfirmEmbed = new EmbedBuilder()
                            .setColor(`Green`) 
                            .setTitle(`Success!`)
                            .setDescription(`You have successfully unsubscribed <#${i.values}> from recieving RDR2 online auto posts.`)
                            await i.deferUpdate();
                            await i.editReply({ embeds: [rdoStopConfirmEmbed], components: [] });
                    
                        }
                    });

                }); //end collecting for rdoStopMenu Values

        } // end collecting for rdostop

});
});
//EDND RDO STOP//
		
		
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
			

		const confirmEmbed = new EmbedBuilder()
			.setColor(`Blue`) 
			.setTitle(`Your Current Auto Post Channels:`)
			.setDescription(`
**Grand Theft Auto V:**
${GTAConfirmString}
**Red Dead Redemption II:**
${RDOConfirmString}`)			
			
		const confirmFilter = i => i.customId === 'confirm'; 
		const confirmCollector = interaction.channel.createMessageComponentCollector({ confirmFilter, time: 30000 });
		confirmCollector.on('collect', async i => {
			if (i.customId === 'confirm') {
				await i.deferUpdate();
					await i.editReply({ embeds: [confirmEmbed], components: [] });
			}
		});	
	});
	});
				

//------------------------------END CONFIRM BUTTON------------------------------//


//------------------------------BEGIN CONFIGURE BUTTON------------------------------//

//FIXME...

//------------------------------END CONFIGURE BUTTON------------------------------//
		


}}