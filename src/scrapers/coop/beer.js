const coopScraper = require('../utils/coopScraper');
const removeDuplicates = require('../utils/removeDuplicates');

// Beer URL
const beerURL = 'https://shop.coop.co.uk/category/47';

const coopScrapeBeer = async () => {
  let beer = await coopScraper(beerURL, 'beer', '', 5);

  beer = removeDuplicates(beer);

  console.log('Beer Data Scraped!');

  return beer;
};

module.exports = coopScrapeBeer;
