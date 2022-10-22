'use strict';
const puppeteer = require('puppeteer');
const os = require('os');

let browser;
let page;
let this_os = '';
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

async function _getFloor() {
	let result;
	const pttUrl = 'https://stepnfp.com/';
	try {
		await page.goto(pttUrl, {
			waitUntil: 'networkidle0',
		});

		// ****** Shoes Floor *******
		let shoesFloor_com = await page.evaluate(() => {
			const hitsSelector = '#Sneakers_Co_Used';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let shoesFloor_uncom = await page.evaluate(() => {
			const hitsSelector = '#Sneakers_UnCo_Used';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		// ****** Scrolls Floor *******
		let scrollFloor_com = await page.evaluate(() => {
			const hitsSelector = '#Scrolls_Common';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let scrollFloor_uncom = await page.evaluate(() => {
			const hitsSelector = '#Scrolls_Uncommon';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let scrollFloor_rare = await page.evaluate(() => {
			const hitsSelector = '#Scrolls_Rare';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let scrollFloor_epic = await page.evaluate(() => {
			const hitsSelector = '#Scrolls_Epic';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		// ****** Gems Floor *******
		let gemsFloor_rb1 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Rainbow1';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_rb2 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Rainbow2';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_rb3 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Rainbow3';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_e1 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Eff1';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_e2 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Eff2';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_e3 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Eff3';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_e4 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Eff4';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_c1 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Comf1';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_c2 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Comf2';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_c3 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Comf3';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_c4 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Comf4';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_l1 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Luck1';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_l2 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Luck2';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_l3 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Luck3';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_l4 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Luck4';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_r1 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Resil1';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_r2 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Resil2';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_r3 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Resil3';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		let gemsFloor_r4 = await page.evaluate(() => {
			const hitsSelector = '#Gems_Resil4';
			let nlHits = document.querySelectorAll(hitsSelector);
			let aryHits = Array.from(nlHits).map((xxx) => xxx.innerText);
			return parseFloat(aryHits[0]);
		});

		result = {
			shoes: {
				com: shoesFloor_com,
				ucom: shoesFloor_uncom,
			},
			scrolls: {
				com: scrollFloor_com,
				ucom: scrollFloor_uncom,
				rare: scrollFloor_rare,
				epic: scrollFloor_epic,
			},
			gems: {
				rb1: gemsFloor_rb1,
				rb2: gemsFloor_rb2,
				rb3: gemsFloor_rb3,
				e1: gemsFloor_e1,
				e2: gemsFloor_e2,
				e3: gemsFloor_e3,
				e4: gemsFloor_e4,
				c1: gemsFloor_c1,
				c2: gemsFloor_c2,
				c3: gemsFloor_c3,
				c4: gemsFloor_c4,
				l1: gemsFloor_l1,
				l2: gemsFloor_l2,
				l3: gemsFloor_l3,
				l4: gemsFloor_l4,
				r1: gemsFloor_r1,
				r2: gemsFloor_r2,
				r3: gemsFloor_r3,
				r4: gemsFloor_r4,
			},
		};
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
	getFloor: _getFloor,
	close: _close,
};
