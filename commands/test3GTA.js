const { SlashCommandBuilder, EmbedBuilder, time } = require('discord.js');
const fetch = require("@replit/node-fetch");
const NEXT_BONUS = require('../events/nextBonus.js');
const { CookieJar, Cookie } = require('tough-cookie');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test3gta')
        .setDescription('Latest GTA Online Bonuses')
        .setDescriptionLocalizations({
            "es-ES": 'Bonificaciones de GTA Online',
            "pt-BR": 'Bônus no GTA Online',
            ru: 'Бонусы GTA Online',
            de: 'Boni in GTA Online',
            pl: 'Premie GTA Online',
            fr: 'Bonus dans GTA Online',
            it: 'Bonus di GTA Online',
            "zh-CN": 'GTA 線上模式獎勵',
            ja: '「GTAオンライン」ボーナス',
            ko: 'GTA 온라인 보너스',
        })			
        .setDMPermission(true),
    async execute(interaction) {
				var startTime = performance.now();
				await interaction.deferReply().catch(error => {console.log(`GTA deferReply error: ${error}`)});

        var lang = interaction.locale.toString();
        //console.log(`lang:${lang}`);

				var nextBonus = await NEXT_BONUS.nextBonus("gta");
				//console.log(`next Bonus: <t:${Math.round(nextBonus / 1000)}>`);

				async function loginAndGetEventData(username, password) {
				  const loginUrl = 'https://signin.rockstargames.com/signin/user-form?cid=socialclub';
				  const targetUrl = 'https://socialclub.rockstargames.com/events/eventlisting?gameId=GTAV.js';
				
				  // Create a new cookie jar
				  const cookieJar = new CookieJar();

				  // get sign in tokens
				  const loginTokens = await fetch("https://www.rockstargames.com/", {
					    "cache": "default",
					    "credentials": "include",
					    "headers": {
					        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
					        "Accept-Language": "en-US,en;q=0.9",
					        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5.2 Safari/605.1.15"
					    },
					    "method": "GET",
					    "mode": "cors",
					    "redirect": "follow",
					    "referrerPolicy": "strict-origin-when-cross-origin"
					});
					console.log(`loginTokens: \n${await loginTokens.text()}`);
				
				  // Perform the login request
				  const loginResponse = await fetch(loginUrl, {
				    method: 'GET',
				    redirect: 'manual',
				    jar: cookieJar,
				  });
				
				  if (loginResponse.status === 200) {
				    const loginHTML = await loginResponse.text();
						console.log(`loginHTML: \n${loginHTML.status}`);
				    var tokenArray = loginHTML.split("nonce='");
						var tokenMatch01 = tokenArray[1].split("=");
						var tokenMatch = tokenMatch01[0];
				    if (tokenMatch && tokenMatch[1]) {
				      const token = tokenMatch[1];
				
				      // Make the login request including the token
				      const loginResponse = await fetch(loginUrl, {
				        method: 'POST',
				        headers: {
									"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
									'Content-Type': 'application/x-www-form-urlencoded',									
									"Sec-Fetch-Dest": "document",
									"Sec-Fetch-Mode": "navigate",
									"Sec-Fetch-Site": "none",
									"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5.2 Safari/605.1.15"
				        },
				        body: `__RequestVerificationToken=${encodeURIComponent(token)}&login_username=${encodeURIComponent(username)}&login_password=${encodeURIComponent(password)}`,
				        redirect: 'manual',
				        jar: cookieJar,
				      });
							console.log(`loginResponse: \n${loginResponse.status}`);

				      if (loginResponse.status === 302) {
				        // Handle the redirection
				        const redirectUrl = loginResponse.headers.get('location');
				        if (redirectUrl) {
				          const fetchOptions = {
				            method: 'GET',
				            redirect: 'follow',
				            jar: cookieJar,
				            headers: {
				              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
											"Sec-Fetch-Dest": "document",
											"Sec-Fetch-Mode": "navigate",
											"Sec-Fetch-Site": "none",
											"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5.2 Safari/605.1.15"
				            },
				          };
				
				          // Make the subsequent fetch request to the desired URL
				          const response = await fetch(targetUrl, fetchOptions);
				          return response;
				        }
				      }
				    }
				  }
				
				  return null;
				}
				
				// Usage example
				const username = process.env.SOCIAL_USERNAME;
				const password = process.env.PASSWORD;
				
				loginAndGetEventData(username, password)
				  .then(response => {
				    if (response) {
				      // Handle the response from the target URL here
				      return response.text();
				    } else {
				      console.log('Login failed');
				      return null;
				    }
				  })
				  .then(data => {
				    if (data) {
				      // Process the data from the response body here
				      console.log(data);
				    }
				  })
				  .catch(error => {
				    console.error(error);
				  });

				var endTime = performance.now();
        await interaction.editReply(`Pong! (${endTime - startTime})`);
    },
};