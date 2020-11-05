const icelandScraper = require('../utils/icelandScraper');
const removeDuplicates = require('../utils/removeDuplicates');

// Beer URLs

// Ale
const beerAleURL = 'https://www.iceland.co.uk/drinks/beer-cider-and-ales/ales';

// Cider
const beerCiderURL =
  'https://www.iceland.co.uk/drinks/beer-cider-and-ales/cider';

// Generic
const beerGenericURL1 =
  'https://www.iceland.co.uk/drinks/beer-cider-and-ales/beer';
const beerGenericURL2 =
  'https://www.iceland.co.uk/drinks/beer-cider-and-ales/beer?start=24';
const beerGenericURL3 =
  'https://www.iceland.co.uk/drinks/beer-cider-and-ales/beer?start=48';

const icelandScrapeBeer = async () => {
  // Ale
  const beerAle = await icelandScraper(beerAleURL, 'beer', 'ale');

  // Cider
  const beerCider = await icelandScraper(beerCiderURL, 'beer', 'cider');

  // Generic
  const beerGeneric1 = await icelandScraper(beerGenericURL1, 'beer', '');
  const beerGeneric2 = await icelandScraper(beerGenericURL2, 'beer', '');
  const beerGeneric3 = await icelandScraper(beerGenericURL3, 'beer', '');

  const beerGeneric = [...beerGeneric1, ...beerGeneric2, ...beerGeneric3];

  let beer = [...beerAle, ...beerCider, ...beerGeneric];

  beer = removeDuplicates(beer);

  console.log('Beer scraped!');

  return beer;
};

module.exports = icelandScrapeBeer;
