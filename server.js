const express = require('express');
const server = express();
server.all('/', (req, res)=>{
    res.send(`
		<div style="background-color:#00A6A4; height:fit-content; width:100vw; text-align:center">
			<p style="font-size:4vmax;">
	 			Invite the 
		 		<a href="${process.env.invite_link}" target="_blank" style="text-decoration:none; color:#000">
		 			<u>Rockstar Weekly</u>
				</a> 
				Discord Bot to your server.
		 	</p>
			<p>
		 			<img src="${process.env.logo_link}" width="200px" height="200px" /img>
			</p>
	 		<p style="font-size:3vmax;">
				Created by Courtney1723#1521
		 	</p>
 		</div>`
		);
});
function keepAlive(){
    server.listen(8081, ()=>{console.log("KeepAlive function is Ready!")});
}
module.exports = keepAlive;