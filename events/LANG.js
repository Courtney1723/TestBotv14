const { ChannelType } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
parseFile = function(file_path, callback) {
    fs.readFile(file_path.toString(), 'utf-8', callback);
}

module.exports = {
	LANG: async function(interaction) {

		if (interaction.channel.type === ChannelType.DM) {
			return "";
		}
		else {
	
			const data = fs.readFileSync('./LANGDataBase.txt','utf8');
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
			//console.log(`lang...: ${lang}`);	
			return lang;					
		}
	}
}