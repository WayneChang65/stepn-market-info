'use strict';
const puppeteer = require('puppeteer');
const os = require('os');

let browser;
let page;
let this_os = '';
let stopSelector_afterSearch = '.sortbox > div:nth-child(1)';
let stopSelector_beforeSearch = 'ul.flex-sp-block > li:nth-child(3) > a:nth-child(1)';

let userAgent =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3723.0 Safari/537.36';

async function _initialize(options) {
	this_os = os.platform();
	browser =
		this_os === 'linux'
			? await puppeteer.launch(
				Object.assign(
					{
						args: ['--no-sandbox', '--disable-setuid-sandbox'],
					},
					options
				)
			)
			: await puppeteer.launch(
				Object.assign(
					{
						headless: false,
					},
					options
				)
			);

	/***** 建立Browser上的 newPage *****/
	page = await browser.newPage();
	await page.setDefaultNavigationTimeout(180 * 1000); // 3 mins
	await page.setRequestInterception(true);
	page.on('request', (request) => {
		if (request.resourceType() === 'image') request.abort();
		else request.continue();
	});
	page.setUserAgent(userAgent);
}

async function _getShoesQuantity(options) {
	let result;
	options = options || {};
	options.shoeType = options.shoeType || 1;

	let shoeTypeSelector;
	switch (options.shoeType) {
	case 2:
		shoeTypeSelector = '#quality-2';
		break;
	case 3:
		shoeTypeSelector = '#quality-3';
		break;
	case 4:
		shoeTypeSelector = '#quality-4';
		break;
	default:
		shoeTypeSelector = '#quality-1';
		break;
	}

	const pttUrl = 'https://stepn-market.guide/';
	try {
		await page.goto(pttUrl);
		await page.waitForSelector(stopSelector_beforeSearch);
		const commonCheckBox = await page.$(shoeTypeSelector);
		if (commonCheckBox) await commonCheckBox.click();

		const searchBtn = await page.$('.btn');
		if (searchBtn) await searchBtn.click();

		await page.waitForSelector(stopSelector_afterSearch);
		// await page.waitForTimeout(10000); // for Debug
		let hits = await page.evaluate(() => {
			const hitsSelector = '.sortbox > div:nth-child(1)';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return aryHits;
		});
		result = parseInt(hits[0].split(' ')[0].replace(',', ''));
	} catch (e) {
		console.log(e);
		await browser.close();
	}
	return result;
}

async function _getRunnersQuantity() {
	let result;
	const pttUrl = 'https://stepn-market.guide/';
	try {
		await page.goto(pttUrl);
		await page.waitForSelector(stopSelector_beforeSearch);
		
		let runners = await page.evaluate(() => {
			const runnersSelector = '.livedistance > small:nth-child(1)';
			let nlRunners = document.querySelectorAll(runnersSelector);
			let aryRunners = Array.from(nlRunners).map((xxx) => xxx.innerText);
			return aryRunners;
		});
		// [ '●', 'LIVE', ':', 'Moving', 'Users', '2456' ]
		result = parseInt(runners[0].split(' ')[5]);
	} catch (e) {
		console.log(e);
		await browser.close();
	}
	return result;
}

async function _close() {
	if (browser) await browser.close();
}

module.exports = {
	initialize: _initialize,
	getShoesQuantity: _getShoesQuantity,
	getRunnersQuantity: _getRunnersQuantity,
	close: _close,
};
