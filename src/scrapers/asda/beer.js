const asdaScraper = require('../utils/asdaScraper');
const removeDupicates = require('../utils/removeDuplicates');

// Beer URLs

// Lager
const beerLagerURL1 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/lager/2056949458';
const beerLagerURL2 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/lager/2056949458?page=2';
const beerLagerURL3 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/lager/2056949458?page=3';

// Ale
const beerAleURL1 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/ale-bitter/2104174534';
const beerAleURL2 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/ale-bitter/2104174534?page=2';

// Stout
const beerStoutURL =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/stout/2623841075';

// Craft
const beerCraftURL1 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/craft-beer/1085905974';
const beerCraftURL2 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/beer-lager-ales/craft-beer/1085905974?page=2';

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

  return beer;
};

module.exports = asdaScrapeBeer;
