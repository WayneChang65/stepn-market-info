'use strict';
const mkt_crawler = require('../index.js');

(async () => {
	// *** Initialize ***
	await mkt_crawler.initialize();

	// *** GetShoesQuantity ***
	let aryHits = [];
	for (let i = 1; i < 5; i++) {
		aryHits.push(await mkt_crawler.getShoesQuantity({ shoeType: i }));
	}

	console.log(
		'Common: ', aryHits[0],
		'\nUncommon: ', aryHits[1],
		'\nRare: ', aryHits[2],
		'\nEpic: ', aryHits[3]
	);
	//console.log(JSON.stringify(aryHits, null, 4));

	// *** GetRunnersQuantity ***
	console.log('\nTotal runners: ' + (await mkt_crawler.getRunnersQuantity()));

	// *** Close      ***
	await mkt_crawler.close();
})();
