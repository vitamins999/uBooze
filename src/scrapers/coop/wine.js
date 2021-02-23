const coopScraper = require('../utils/coopScraper');
const removeDuplicates = require('../utils/removeDuplicates');
const fs = require('fs');

// Wine URLs

// Red
const wineRedURL = 'https://shop.coop.co.uk/category/44';

// White
const wineWhiteURL = 'https://shop.coop.co.uk/category/45';

// Rose
const wineRoseURL = 'https://shop.coop.co.uk/category/46';

// Sparkling
const wineSparklingURL = 'https://shop.coop.co.uk/category/48';

const coopScrapeWine = async () => {
  // Red
  const wineRed = await coopScraper(wineRedURL, 'wine', 'red', 3);

  // White
  const wineWhite = await coopScraper(wineWhiteURL, 'wine', 'white', 3);

  // Rose
  const wineRose = await coopScraper(wineRoseURL, 'wine', 'rose');

  // Sparkling
  const wineSparkling = await coopScraper(
    wineSparklingURL,
    'wine',
    'sparkling'
  );

  let wine = [...wineRed, ...wineWhite, ...wineRose, ...wineSparkling];

  wine = removeDuplicates(wine);

  console.log('Wine Data Scraped!');

  return wine;
};

const mainScrape = async () => {
  const wine = await coopScrapeWine();
  const wineJSON = JSON.stringify(wine);
  fs.writeFileSync('src/output/coop-wine-final.json', wineJSON);
};

mainScrape();

module.exports = coopScrapeWine;
