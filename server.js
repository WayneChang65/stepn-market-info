'use strict';
const { JsonDB, Config } = require('node-json-db');
const fmlog = require('@waynechang65/fml-consolelog').log;
const basic_f = require('./lib/basic_f.js');
const mkt_crawler = require('./index.js');
const fp_crawler = require('./lib/fp_crawler.js');

let db1;
let db2;

async function init() {
	await fp_crawler.initialize().then(() => {
		fmlog('sys_msg', ['INIT', 'fp_crawler initialized.']);
	});

	await mkt_crawler.initialize().then(() => {
		fmlog('sys_msg', ['INIT', 'mkt_crawler initialized.']);
	});
	
	db1 = new JsonDB(new Config('./db/stepnDB1.json', true, false, '/'));
	db2 = new JsonDB(new Config('./db/stepnDB2.json', true, false, '/'));
}

async function timerGetData() {
	// Debug的時候，縮短週期時間的一個除數(正常時候是 1, 測試的時候可以設 3，加速)
	let debug_shortenDurationMultiplier = 1;
	try {
		setInterval(async () => {
			let intRunners = await mkt_crawler.getRunnersQuantity();
			let fpFloor = await fp_crawler.getFloor();
			
			let aryShoes = [];
			for (let i = 1; i < 5; i++) {
				aryShoes.push(
					await mkt_crawler.getShoesQuantity({ shoeType: i })
				);
			}

			fmlog('crawler_msg', [
				'Refresh',
				`Runners: ${intRunners}`,
				`com: ${aryShoes[0].quality}-${aryShoes[0].floor}, uncom: ${aryShoes[1].quality}-${aryShoes[1].floor}, rare: ${aryShoes[2].quality}-${aryShoes[2].floor}, epic: ${aryShoes[3].quality}-${aryShoes[3].floor}`,
				aryShoes[0].quality +
					aryShoes[1].quality +
					aryShoes[2].quality +
					aryShoes[3].quality,
				basic_f.getCurrentDateTime(),
			]);

			fmlog('crawler_msg', [
				'Refresh',
				'FP',
				`shoes_com: ${fpFloor.shoes.com}, scrolls_com: ${fpFloor.scrolls.com}, rb1: ${fpFloor.gems.rb1}, e1: ${fpFloor.gems.e1}`,
				'',
				basic_f.getCurrentDateTime(),
			]);

			let timeNow = Date.now();
			await db1.push(
				'/stepn/',
				[{ time: timeNow, runners: intRunners, shoes: aryShoes }],
				false
			);

			await db2.push(
				'/stepn/',
				[{ time: timeNow, floor: fpFloor }],
				false
			);

		}, (1000 * 60 * 10) / debug_shortenDurationMultiplier); // 10分鐘
	} catch (err) {
		console.error(err);
		await mkt_crawler.close();
		await fp_crawler.close();
	}
}

(async () => {
	await init();
	await timerGetData();
})();
