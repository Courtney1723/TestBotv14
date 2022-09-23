const express = require('express');
const server = express();
server.all('/', (req, res)=>{
    res.send(`<div style="background-color:#00A6A4; height:100vmax; width:100vmax; text-align:center">
		<p style="font-size:8vmax;">Invite the <a href="${process.env.invite_link}" target="_blank" style="text-decoration:none; color:#000"><u>Rockstar Weekly</u></a> Discord Bot to your server.</p>
	<p><img src="${process.env.logo_link}" width="280px" height="280px"></img></p>
 <p style="font-size:6vmax;">Created by Courtney1723#1521</p>
 </div>`);
});
function keepAlive(){
    server.listen(8080, ()=>{console.log("KeepAlive function is Ready!")});
}
module.exports = keepAlive;