const waitroseScraper = require('../utils/waitroseScraper');
const removeDuplicates = require('../utils/removeDuplicates');
const fs = require('fs');

// Spirits URLs

// Whisky
const spiritsWhiskyURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/whisky';

// Gin
const spiritsGinURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/gin';

// Vodka
const spiritsVodkaURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/vodka';

// Brandy
const spiritsBrandyURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/brandy';

// Cognac
const spiritsCognacURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/cognac';

// Rum
const spiritsRumURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/rum';

// Tequila
const spiritsTequilaURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/tequila';

// Pimms & Summer Drinks
const spiritsPimmsSummerURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/pimms_and_summer_drinks';

// Liqueurs & Aperitifs
const spiritsLiqueursURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/liqueurs_and_aperitifs';

// Premix
const spiritsPremixURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/pre_mixed_spirits';

// Low alcohol
const spiritsLowAlcoholURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/low_and_no_alcohol_spirits';

const waitroseScrapeSpirits = async () => {
  // Gin
  const spiritsGin = await waitroseScraper(spiritsGinURL, 'spirits', 'gin');

  // Whisky
  const spiritsWhisky = await waitroseScraper(
    spiritsWhiskyURL,
    'spirits',
    'whisky',
    3
  );

  // Vodka
  const spiritsVodka = await waitroseScraper(
    spiritsVodkaURL,
    'spirits',
    'vodka'
  );

  // Brandy and Cognac
  const spiritsBrandy = await waitroseScraper(
    spiritsBrandyURL,
    'spirits',
    'brandy and cognac'
  );
  const spiritsCognac = await waitroseScraper(
    spiritsCognacURL,
    'spirits',
    'brandy and cognac'
  );

  const spiritsBrandyCognac = [...spiritsBrandy, ...spiritsCognac];

  // Rum
  const spiritsRum = await waitroseScraper(spiritsRumURL, 'spirits', 'rum');

  // Tequila, Liqueurs and Aperitifs
  const spiritsTequila = await waitroseScraper(
    spiritsTequilaURL,
    'spirits',
    'tequila and liqueurs'
  );
  const spiritsLiqueurs = await waitroseScraper(
    spiritsLiqueursURL,
    'spirits',
    'tequila and liqueurs'
  );
  const spiritsPimmsSummer = await waitroseScraper(
    spiritsPimmsSummerURL,
    'spirits',
    'tequila and liqueurs'
  );

  const spiritsTequilaLiqueurs = [
    ...spiritsTequila,
    ...spiritsLiqueurs,
    ...spiritsPimmsSummer,
  ];

  // Premix
  const spiritsPremix = await waitroseScraper(
    spiritsPremixURL,
    'spirits',
    'premix'
  );

  // Low alcohol
  const spiritsLowAlcohol = await waitroseScraper(
    spiritsLowAlcoholURL,
    'spirits',
    'low alcohol'
  );

  let spirits = [
    ...spiritsGin,
    ...spiritsWhisky,
    ...spiritsVodka,
    ...spiritsRum,
    ...spiritsBrandyCognac,
    ...spiritsTequilaLiqueurs,
    ...spiritsPremix,
    ...spiritsLowAlcohol,
  ];

  spirits = removeDuplicates(spirits);

  console.log('Spirits scraped!');
  return spirits;
};

const main = async () => {
  const spirits = await waitroseScrapeSpirits();
  const spiritsJSON = JSON.stringify(spirits);
  fs.writeFileSync('src/output/waitrose-spirits-final.json', spiritsJSON);
};

main();

module.exports = waitroseScrapeSpirits;
