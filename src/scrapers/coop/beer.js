const coopScraper = require('../utils/coopScraper');
const fs = require('fs');
const removeDuplicates = require('../utils/removeDuplicates');

// Beer URL
const beerURL = 'https://shop.coop.co.uk/category/47';

const coopScrapeBeer = async () => {
  let beer = await coopScraper(beerURL, 'beer', '', 5);

  beer = removeDuplicates(beer);

  console.log('Beer Data Scraped!');

  const beerJSON = JSON.stringify(beer);
  fs.writeFileSync('src/output/coop-beer.json', beerJSON);

  return beer;
};

module.exports = coopScrapeBeer;
