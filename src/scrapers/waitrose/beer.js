const waitroseScraper = require('../utils/waitroseScraper');
const removeDuplicates = require('../utils/removeDuplicates');
const fs = require('fs');

// Beer URLs

// Ale
const beerAleLightURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/ale/light_ale';
const beerAleAmberURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/ale/amber_ale';
const beerAleDarkURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/ale/dark_ale';

// Lager
const beerLagerURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/lager';

// Cider
const beerCiderTraditionalURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/cider/traditional_ciders';
const beerCiderFlavouredURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/cider/flavoured_ciders';

// Low and Alcohol Free
const beerLowAlcoholURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/low_and_alcohol_free_beer';

const waitroseScrapeBeer = async () => {
  // Ale
  const beerAleLight = await waitroseScraper(beerAleLightURL, 'beer', 'ale', 3);
  const beerAleAmber = await waitroseScraper(beerAleAmberURL, 'beer', 'ale');
  const beerAleDark = await waitroseScraper(beerAleDarkURL, 'beer', 'ale');

  const beerAle = [...beerAleLight, ...beerAleAmber, ...beerAleDark];

  // Lager
  const beerLager = await waitroseScraper(beerLagerURL, 'beer', 'lager', 2);

  // Cider
  const beerCiderTraditional = await waitroseScraper(
    beerCiderTraditionalURL,
    'beer',
    'cider'
  );
  const beerCiderFlavoured = await waitroseScraper(
    beerCiderFlavouredURL,
    'beer',
    'cider'
  );

  const beerCider = [...beerCiderTraditional, ...beerCiderFlavoured];

  // Low and Alcohol Free
  const beerLowAlcohol = await waitroseScraper(
    beerLowAlcoholURL,
    'beer',
    'low alcohol'
  );

  let beer = [...beerAle, ...beerLager, ...beerCider, ...beerLowAlcohol];

  beer = removeDuplicates(beer);

  console.log('Beer successfully scraped!');

  return beer;
};

// const main = async () => {
//   const beer = await waitroseScrapeBeer();
//   const beerJSON = JSON.stringify(beer);
//   fs.writeFileSync('src/output/waitrose-beer-final.json', beerJSON);
// };

// main();

module.exports = waitroseScrapeBeer;
