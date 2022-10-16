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
		`common: ${aryHits[0]}, uncommon: ${aryHits[1]}, rare: ${aryHits[2]}, epic: ${aryHits[3]}`
	);

	// *** GetRunnersQuantity ***
	console.log('\nTotal runners: ' + await mkt_crawler.getRunnersQuantity());
	
	// *** Close      ***
	await mkt_crawler.close();
})();
