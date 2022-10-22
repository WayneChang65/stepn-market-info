'use strict';
const mkt_crawler = require('../index.js');
const fp_crawler = require('../lib/fp_crawler.js');

(async () => {
	// *** Initialize ***
	await mkt_crawler.initialize();
	await fp_crawler.initialize();

	// *** FP GetFloor ***
	let fp = await fp_crawler.getFloor();
	console.log(fp);

	// *** MKT GetShoesQuantity ***
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

	// *** MKT GetRunnersQuantity ***
	console.log('\nTotal runners: ' + (await mkt_crawler.getRunnersQuantity()));

	// *** Close ***
	await mkt_crawler.close();
	await fp_crawler.close();
})();
