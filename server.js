'use strict';
const { JsonDB, Config } = require('node-json-db');
const fmlog = require('@waynechang65/fml-consolelog').log;
const basic_f = require('./lib/basic_f.js');
const mkt_crawler = require('./index.js');

let db;

async function init() {
	await mkt_crawler.initialize().then(() => {
		fmlog('sys_msg', ['INIT', 'mkt_crawler initialized.']);
	});
	db = new JsonDB(new Config('./db/stepnDB.json', true, false, '/'));
}

async function timerGetData() {
	// Debug的時候，縮短週期時間的一個除數(正常時候是 1, 測試的時候可以設 3，加速)
	let debug_shortenDurationMultiplier = 1;
	try {
		setInterval(async () => {
			let intRunners = await mkt_crawler.getRunnersQuantity();
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

			let timeNow = Date.now();
			await db.push(
				'/stepn/',
				[{ time: timeNow, runners: intRunners, shoes: aryShoes }],
				false
			);
		}, (1000 * 60 * 5) / debug_shortenDurationMultiplier); // 5分鐘
	} catch (err) {
		console.error(err);
		await mkt_crawler.close();
	}
}

(async () => {
	await init();
	await timerGetData();
})();
