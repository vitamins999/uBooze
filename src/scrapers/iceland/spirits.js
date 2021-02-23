const icelandScraper = require('../utils/icelandScraper');
const removeDuplicates = require('../utils/removeDuplicates');
const fs = require('fs');

// Spirits URLs

// Gin
const spiritsGinURL =
  'https://www.iceland.co.uk/drinks/spirits-and-pre-mixed/gin';

// Whisky
const spiritsWhiskyURL =
  'https://www.iceland.co.uk/drinks/spirits-and-pre-mixed/whisky';

// Vodka
const spiritsVodkaURL =
  'https://www.iceland.co.uk/drinks/spirits-and-pre-mixed/vodka';

// Liqueurs
const spiritsLiqueurURL =
  'https://www.iceland.co.uk/drinks/spirits-and-pre-mixed/liqueurs';

const icelandScrapeSpirits = async () => {
  // Gin
  const spiritsGin = await icelandScraper(spiritsGinURL, 'spirits', 'gin');

  // Whisky
  const spiritsWhisky = await icelandScraper(
    spiritsWhiskyURL,
    'spirits',
    'whisky'
  );

  // Vodka
  const spiritsVodka = await icelandScraper(
    spiritsVodkaURL,
    'spirits',
    'vodka'
  );

  // Liqueur
  const spiritsLiqueur = await icelandScraper(
    spiritsLiqueurURL,
    'spirits',
    'liqueur'
  );

  let spirits = [
    ...spiritsGin,
    ...spiritsWhisky,
    ...spiritsVodka,
    ...spiritsLiqueur,
  ];

  spirits = removeDuplicates(spirits);

  console.log('Spirits scraped!');

  return spirits;
};

const mainScrape = async () => {
  const spirits = await icelandScrapeSpirits();
  const spiritsJSON = JSON.stringify(spirits);
  fs.writeFileSync('src/output/iceland-spirits-final.json', spiritsJSON);
};

mainScrape();

module.exports = icelandScrapeSpirits;
