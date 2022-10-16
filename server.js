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
				`com: ${aryShoes[0]}, uncom: ${aryShoes[1]}, rare: ${aryShoes[2]}, epic: ${aryShoes[3]}`,
				aryShoes[0] + aryShoes[1] + aryShoes[2] + aryShoes[3],
				basic_f.getCurrentDateTime(),
			]);

			let timeNow = Date.now();
			await db.push(`/stepn/${timeNow}/shoes`, aryShoes);
			await db.push(`/stepn/${timeNow}/runners`, intRunners);

		}, (1000 * 60 * 10) / debug_shortenDurationMultiplier); // 10分鐘
	} catch (err) {
		console.error(err);
		await mkt_crawler.close();
	}
}

(async () => {
	await init();
	await timerGetData();
})();
