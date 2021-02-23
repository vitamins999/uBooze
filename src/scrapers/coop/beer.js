const coopScraper = require('../utils/coopScraper');
const removeDuplicates = require('../utils/removeDuplicates');
const fs = require('fs');

// Beer URL
const beerURL = 'https://shop.coop.co.uk/category/47';

const coopScrapeBeer = async () => {
  let beer = await coopScraper(beerURL, 'beer', '', 10);

  beer = removeDuplicates(beer);

  console.log('Beer Data Scraped!');

  return beer;
};

const mainScrape = async () => {
  const beer = await coopScrapeBeer();
  const beerJSON = JSON.stringify(beer);
  fs.writeFileSync('src/output/coop-beer-final.json', beerJSON);
};

mainScrape();

module.exports = coopScrapeBeer;
