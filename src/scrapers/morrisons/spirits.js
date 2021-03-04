const morrisonsScraper = require('../utils/morrisonsScraper');
const removeDuplicates = require('../utils/removeDuplicates');
const fs = require('fs');

// Spirits URLs

// Gin
const spiritsGinURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/spirits-liqueurs-105916/gin-151526';

// Whisky
const spiritsWhiskyURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/spirits-liqueurs-105916/whisky-151509';

// Vodka
const spiritsVodkaURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/spirits-liqueurs-105916/vodka-151525';

// Rum
const spiritsRumURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/spirits-liqueurs-105916/rum-151520';

// Brandy & Cognac
const spiritsBrandyCognacURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/spirits-liqueurs-105916/brandy-151517';

// Liqueurs
const spiritsTequilaLiqueurURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/spirits-liqueurs-105916/liqueurs-151516';

// Premix
const spiritsPremixURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/spirits-liqueurs-105916/pre-mixed-drinks-cocktails-151527';

const morrisonsScrapeSpirits = async () => {
  // Gin
  const spiritsGin = await morrisonsScraper(spiritsGinURL, 'spirits', 'gin');

  // Whisky
  const spiritsWhisky = await morrisonsScraper(
    spiritsWhiskyURL,
    'spirits',
    'whisky'
  );

  // Vodka
  const spiritsVodka = await morrisonsScraper(
    spiritsVodkaURL,
    'spirits',
    'vodka'
  );

  // Rum
  const spiritsRum = await morrisonsScraper(spiritsRumURL, 'spirits', 'rum');

  // Brandy & Cognac
  const spiritsBrandyCognac = await morrisonsScraper(
    spiritsBrandyCognacURL,
    'spirits',
    'brandy and cognac'
  );

  // Tequila and Liqueurs
  const spiritsTequilaLiqueur = await morrisonsScraper(
    spiritsTequilaLiqueurURL,
    'spirits',
    'tequila and liqueurs'
  );

  // Premix
  const spiritsPremix = await morrisonsScraper(
    spiritsPremixURL,
    'spirits',
    'premix'
  );

  let spirits = [
    ...spiritsGin,
    ...spiritsWhisky,
    ...spiritsVodka,
    ...spiritsRum,
    ...spiritsBrandyCognac,
    ...spiritsTequilaLiqueur,
    ...spiritsPremix,
  ];

  spirits = removeDuplicates(spirits);

  console.log('Spirits scraped!');

  return spirits;
};

const mainScrape = async () => {
  const spirits = await morrisonsScrapeSpirits();
  const spiritsJSON = JSON.stringify(spirits);
  fs.writeFileSync('src/output/morrisons-spirits-final.json', spiritsJSON);
};

mainScrape();

module.exports = morrisonsScrapeSpirits;
