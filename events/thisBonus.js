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

				function latestBonus() {
					var gtaCheckDate = new Date(getgtaParse.data.posts.results[0].created_formatted).toString().substring(0, 3);
					var gtaCheckTime = new Date(getgtaParse.data.posts.results[0].created).toString().includes("12:00");
					if ((gtaCheckDate !== "Thu") || (gtaCheckTime === false)) { //if post 0 is not a weekly bonus check post 1
						var gtaCheckDate2 = new Date(getgtaParse.data.posts.results[1].created_formatted).toString().substring(0, 3);
						var gtaCheckTime2 = new Date(getgtaParse.data.posts.results[0].created).toString().includes("12:00");						
						if ((gtaCheckDate2 !== "Thu") || (gtaCheckTime === false)) { //if post 1 is not a weekly bonus check post 2
							var gtaCheckDate3 = new Date(getgtaParse.data.posts.results[2].created_formatted).toString().substring(0, 3);
							var gtaCheckTime3 = new Date(getgtaParse.data.posts.results[0].created).toString().includes("12:00");							
							if ((gtaCheckDate3 !== "Thu") || (gtaCheckTime === false)) { //if post 2 is not a weekly bonus return post 3
								return 3
							}
							else {
								return 2;
							}
						}
						else {
							return 1;
						}
					}
					else {
						return 0;
					}
				}				

				var date = new Date();
				var thisBonus1 = getgtaParse.data.posts.results[latestBonus()].created_formatted;
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

				function latestBonus() {
					var rdoCheckDate = new Date(getrdoParse.data.posts.results[0].created_formatted).toString().substring(0, 3);
					var rdoCheckTime = new Date(getrdoParse.data.posts.results[0].created).toString().includes("10:00");
					if ((rdoCheckDate !== "Tue") || (rdoCheckTime === false)) { //if post 0 is not a weekly bonus check post 1
						var rdoCheckDate2 = new Date(getrdoParse.data.posts.results[1].created_formatted).toString().substring(0, 3);
						var rdoCheckTime2 = new Date(getrdoParse.data.posts.results[0].created).toString().includes("10:00");						
						if ((rdoCheckDate2 !== "Tue") || (rdoCheckTime === false)) { //if post 1 is not a weekly bonus check post 2
							var rdoCheckDate3 = new Date(getrdoParse.data.posts.results[2].created_formatted).toString().substring(0, 3);
							var rdoCheckTime3 = new Date(getrdoParse.data.posts.results[0].created).toString().includes("10:00");							
							if ((rdoCheckDate3 !== "Tue") || (rdoCheckTime === false)) { //if post 2 is not a weekly bonus return post 3
								return 3
							}
							else {
								return 2;
							}
						}
						else {
							return 1;
						}
					}
					else {
						return 0;
					}
				}
				
				var date = new Date();
				var thisRDOBonus1 = getrdoParse.data.posts.results[latestBonus()].created_formatted;
				var thisRDOBonus = new Date(`${thisRDOBonus1} 00:00:00`);
                return thisRDOBonus;
			}		

    }
}