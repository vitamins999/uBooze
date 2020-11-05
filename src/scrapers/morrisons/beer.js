const morrisonsScraper = require('../utils/morrisonsScraper');
const removeDuplicates = require('../utils/removeDuplicates');

// Beer URLs

// Lager
const beerLagerURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/lager-161713';

const beerAleStoutURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/ales-stouts-161710';

const beerCraftURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/beer-150066/craft-beer-161712';

const beerCiderURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/cider-150057';

const morrisonsScrapeBeer = async () => {
  // Lager
  const beerLager = await morrisonsScraper(beerLagerURL, 'beer', 'lager');

  // Ale & Stout
  const beerStout = await morrisonsScraper(
    beerAleStoutURL,
    'beer',
    'ale and stout'
  );

  // Craft
  const beerCraft = await morrisonsScraper(beerCraftURL, 'beer', 'craft');

  // Cider
  const beerCider = await morrisonsScraper(beerCiderURL, 'beer', 'cider');

  let beer = [...beerLager, ...beerStout, ...beerCraft, ...beerCider];

  beer = removeDuplicates(beer);

  console.log('Beer scraped!');

  return beer;
};

module.exports = morrisonsScrapeBeer;
