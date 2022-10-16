'use strict';
const mkt_crawler = require('../index.js');

(async () => {
    // *** Initialize ***
    await mkt_crawler.initialize();

    // *** GetResult  ***
    let aryHits = [];
    for (let i = 1; i < 5; i++) {
        aryHits.push(await mkt_crawler.getResults({ shoeType: i }));
    }
    console.log(aryHits);

    // *** Close      ***
    await mkt_crawler.close();
})();
