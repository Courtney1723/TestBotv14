const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require('discord.js');
const fs = require('node:fs');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('autopost')
		.setDescription('Configure and Confirm Auto Post Settings')
		.setDMPermission(false),
	async execute(interaction) {
		await interaction.deferReply();

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
		await interaction.editReply({embeds: [initialEmbed], components: [initialButtons]});

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
									else if (data.includes(`${guildIdDB}`)) { 
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
												.setDescription(`You will now get Grand Theft Auto V Auto Posts to the <#${i.values}> channel every Thursday at 2:00 PM EST
								note: if the above channel is not a link (e.g. <#${interaction.channel.id}> ) please try again.`)	
											
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
                            else if (data.includes(`${guildIdDB}`)) { 
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
                                        .setDescription(`You will now get Red Dead Redemption II Auto Posts to the <#${i.values}> channel every Thursday at 2:00 PM EST
                        note: if the above channel is not a link (e.g. <#${interaction.channel.id}> ) please try again.`)	
                                    
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

//FIXME
		
//------------------------------END STOP BUTTON------------------------------//

		
//------------------------------BEGIN CONFIRM BUTTON------------------------------//
		let channelIDArray = [];
		interaction.guild.channels.cache.forEach(channel => {
			if (channel.type === 0) {
				channelIDArray.push(`${channel.id}`);
			}
		});
		console.log(`channelIDArray: ${channelIDArray}`);

		let GTAConfirmString = "";
		fs.readFile('./GTADataBase.txt', 'utf8', async function (err, data) {
			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
			else {
					console.log(`data: ${data}`);
					for (i = 0; i <= channelIDArray.length - 1; i++) {
						if (data.includes(`${channelIDArray[i]}`)) { //If the GTADataBase.txt contains a channel in the interaction guild
							GTAConfirmString += `• <#${channelIDArray[i]}>\n`;
							console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
							console.log(`GTAConfirmString at ${i}: ${GTAConfirmString}`);	
						} 
					}
				}
			console.log(`GTAConfirmString: ${GTAConfirmString}`);	
			if (!GTAConfirmString.includes('• ')) {
				GTAConfirmString += `• There are no channels in this guild subscribed to GTAV auto posts.\n`;
			}

		
		
		let RDOConfirmString = "";
		fs.readFile('./RDODataBase.txt', 'utf8', async function (err, data) {
			if (err) {console.log(`Error: ${err}`)} //If an error, console.log
			else {
					console.log(`data: ${data}`);
					for (i = 0; i <= channelIDArray.length - 1; i++) {
						if (data.includes(`${channelIDArray[i]}`)) { //If the GTADataBase.txt contains a channel in the interaction guild
							RDOConfirmString += `• <#${channelIDArray[i]}>\n`;
							console.log(`channelIDArray at ${i}: ${channelIDArray[i]}`);
							console.log(`RDOConfirmString at ${i}: ${RDOConfirmString}`);	
						} 
					}
				}
			console.log(`RDOConfirmString: ${RDOConfirmString}`);	
			if (!RDOConfirmString.includes('• ')) {
				RDOConfirmString += `• There are no channels in this guild subscribed to RDR2 auto posts.\n`;
			}
			

		const confirmEmbed = new EmbedBuilder()
			.setColor(`Green`) 
			.setTitle(`Confirm Your Current Auto Post Channels`)
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