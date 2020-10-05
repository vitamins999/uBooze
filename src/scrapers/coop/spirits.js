const coopScraper = require('../utils/coopScraper');
const fs = require('fs');
const removeDuplicates = require('../utils/removeDuplicates');

// Spirits URLs

// Gin
const spiritsGinURL = 'https://shop.coop.co.uk/category/49';

// Whisky
const spiritsWhiskyURL = 'https://shop.coop.co.uk/category/50';

// Vodka
const spiritsVodkaURL = 'https://shop.coop.co.uk/category/51';

// Other
const spiritsOtherURL = 'https://shop.coop.co.uk/category/52';

const coopScrapeSpirits = async () => {
  // Gin
  const spiritsGin = await coopScraper(spiritsGinURL, 'spirits', 'gin', 2);

  // Whisky
  const spiritsWhisky = await coopScraper(
    spiritsWhiskyURL,
    'spirits',
    'whisky',
    2
  );

  // Vodka
  const spiritsVodka = await coopScraper(spiritsVodkaURL, 'spirits', 'vodka');

  // Other
  const spiritsOther = await coopScraper(spiritsOtherURL, 'spirits', 'other');

  let spirits = [
    ...spiritsGin,
    ...spiritsWhisky,
    ...spiritsVodka,
    ...spiritsOther,
  ];

  spirits = removeDuplicates(spirits);

  console.log('Spirits Data Scraped!');

  const spiritsJSON = JSON.stringify(spirits);
  fs.writeFileSync('src/output/coop-spirits.json', spiritsJSON);

  return spirits;
};

module.exports = coopScrapeSpirits;
