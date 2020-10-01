const asdaScraper = require('../utils/asdaScraper');
const fs = require('fs');
const removeDupicates = require('../utils/removeDuplicates');

// Beer URLs

// Lager
const beerLagerURL1 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/lager/2056949458?facets=aisle%3A2056949458%3A0000&nutrition=&sortBy=&page=0';
const beerLagerURL2 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/lager/2056949458?facets=aisle%3A2056949458%3A0000&nutrition=&sortBy=&page=60';
const beerLagerURL3 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/lager/2056949458?facets=aisle%3A2056949458%3A0000&nutrition=&sortBy=&page=120';

// Ale
const beerAleURL1 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/ale-bitter/2104174534?facets=aisle%3A2104174534%3A0000&nutrition=&sortBy=&page=0';
const beerAleURL2 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/ale-bitter/2104174534?facets=aisle%3A2104174534%3A0000&nutrition=&sortBy=&page=60';

// Stout
const beerStoutURL =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/stout/2623841075';

// Craft
const beerCraftURL1 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/craft-beer/1085905974';
const beerCraftURL2 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/craft-beer/1085905974?facets=aisle%3A1085905974%3A0000&nutrition=&sortBy=&page=60';

// Low Alcohol
const beerLowAlcoholURL =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/no-low-alcohol-beer/2810823362';

// Cider
const beerCiderAppleURL =
  'https://groceries.asda.com/aisle/beer-wine-spirits/cider/apple-cider/859073432';
const beerCiderFruitURL =
  'https://groceries.asda.com/aisle/beer-wine-spirits/cider/fruit-flavoured-cider/1112557458';

const asdaScrapeBeer = async () => {
  // Lager
  const beerLager1 = await asdaScraper(beerLagerURL1, 'beer', 'lager');
  const beerLager2 = await asdaScraper(beerLagerURL2, 'beer', 'lager');
  const beerLager3 = await asdaScraper(beerLagerURL3, 'beer', 'lager');

  const beerLager = [...beerLager1, ...beerLager2, ...beerLager3];

  // Ale
  const beerAle1 = await asdaScraper(beerAleURL1, 'beer', 'ale');
  const beerAle2 = await asdaScraper(beerAleURL2, 'beer', 'ale');

  const beerAle = [...beerAle1, ...beerAle2];

  // Stout
  const beerStout = await asdaScraper(beerStoutURL, 'beer', 'stout');

  // Craft
  const beerCraft1 = await asdaScraper(beerCraftURL1, 'beer', 'craft');
  const beerCraft2 = await asdaScraper(beerCraftURL2, 'beer', 'craft');

  const beerCraft = [...beerCraft1, ...beerCraft2];

  // Cider
  const beerCiderApple = await asdaScraper(beerCiderAppleURL, 'beer', 'cider');
  const beerCiderFruit = await asdaScraper(beerCiderFruitURL, 'beer', 'cider');

  const beerCider = [...beerCiderApple, ...beerCiderFruit];

  // Low Alcohol
  const beerLowAlcohol = await asdaScraper(
    beerLowAlcoholURL,
    'beer',
    'low alcohol'
  );

  let beer = [
    ...beerLager,
    ...beerAle,
    ...beerCider,
    ...beerStout,
    ...beerCraft,
    ...beerLowAlcohol,
  ];

  beer = removeDupicates(beer);

  console.log('Beer scraped!');

  const beerJSON = JSON.stringify(beer);
  fs.writeFileSync('src/output/asda-beer.json', beerJSON);

  return beer;
};

module.exports = asdaScrapeBeer;
