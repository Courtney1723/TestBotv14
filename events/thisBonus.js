const fetch = require("@replit/node-fetch");

module.exports = {
    thisBonus: async function (gtaRDO) {

			if (gtaRDO === 'gta') {
				var gtaFetch = await fetch(process.env.gtaGraphURL, {
						"cache": "default",
						"credentials": "omit",
						"headers": {
								"Accept": "*/*",
								"Accept-Language": "en-US,en;q=0.9",
								"Content-Type": "application/json",
								"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15"
						},
						"method": "GET",
						"mode": "cors",
						"redirect": "follow",
						"referrer": "https://www.rockstargames.com/",
						"referrerPolicy": "strict-origin-when-cross-origin"
				});
				var getgtaJSON01 = await gtaFetch.json();
				var getgtaJSON = JSON.stringify(getgtaJSON01);
				var getgtaParse = JSON.parse(getgtaJSON);

				var date = new Date();
				var thisBonus1 = getgtaParse.data.posts.results[0].created_formatted;
				var thisBonus = new Date(`${thisBonus1} 00:00:00`);
                return thisBonus;			
			}
			else {
				var rdoFetch = await fetch(process.env.rdoGraphURL, {
						"cache": "default",
						"credentials": "omit",
						"headers": {
								"Accept": "*/*",
								"Accept-Language": "en-US,en;q=0.9",
								"Content-Type": "application/json",
								"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15"
						},
						"method": "GET",
						"mode": "cors",
						"redirect": "follow",
						"referrer": "https://www.rockstargames.com/",
						"referrerPolicy": "strict-origin-when-cross-origin"
				});
				var getrdoJSON01 = await rdoFetch.json();
				var getrdoJSON = JSON.stringify(getrdoJSON01);
				var getrdoParse = JSON.parse(getrdoJSON);
				
				var date = new Date();
				var thisRDOBonus1 = getrdoParse.data.posts.results[0].created_formatted;
				var thisRDOBonus = new Date(`${thisRDOBonus1} 00:00:00`);
                return thisRDOBonus;
			}		

    }
}