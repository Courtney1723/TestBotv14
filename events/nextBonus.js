const fetch = require("@replit/node-fetch");

module.exports = {
    nextBonus: async function (gtaRDO) {

			if (gtaRDO === 'gta') {
				var gtaFetch = await fetch(`${process.env.gtaGraphURL}`, {
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
				var nextBonus1 = getgtaParse.data.posts.results[0].created_formatted;
				var nextBonus = new Date(`${nextBonus1} 21:00:00`);

				var nextBonusPlus = (nextBonus.setDate(nextBonus.getDate()+7));
				var nextBonus = new Date(nextBonusPlus);
				return nextBonus;				
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
				var nextRDOBonus1 = getrdoParse.data.posts.results[0].created_formatted;
				var nextRDOBonus = new Date(`${nextRDOBonus1} 21:00:00`);
				var checkRDOUpcoming = nextRDOBonus - date;
				
				if (checkRDOUpcoming >= 0) {
					var nextRDOBonus = new Date(`${nextRDOBonus1} 21:00:00`); //returns the current bonus if same day before 3:00
					return nextRDOBonus;
				}
				else {
					var nextRDOBonus01 = new Date(`${nextRDOBonus1} 21:00:00`);
					var nextRDOBonusPlus = (nextRDOBonus01.setDate(nextRDOBonus01.getDate()+21)); //adds three weeks to last bonus - FIXME - change next month
					var nextRDOBonus = new Date(nextRDOBonus01);
					return nextRDOBonus;
				}					
				
			}		

    }
}