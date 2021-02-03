const tescoScraper = require('../utils/tescoScraper');
const removeDuplicates = require('../utils/removeDuplicates');
const fs = require('fs');

// Beer URLs

// Lager
const beerLagerURL1 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-lager?page=1&count=48';
const beerLagerURL2 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-lager?page=2&count=48';
const beerLagerURL3 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-lager?page=3&count=48';

// const beerLagerWorldURL1 =
//   'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-world-lager?page=1&count=48';
// const beerLagerWorldURL2 =
//   'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-world-lager?page=2&count=48';

// Ale & Bitter
const beerAleURL1 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-real-ale-and-bitter?page=1&count=48';
const beerAleURL2 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-real-ale-and-bitter?page=2&count=48';

// Craft & Specialist
const beerCraftURL1 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/craft-beer?page=1&count=48';
const beerCraftURL2 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/craft-beer?page=2&count=48';
const beerCraftURL3 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/craft-beer?page=3&count=48';

// Cider
const beerCiderURL1 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/cider?page=1&count=48';
const beerCiderURL2 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/cider?page=2&count=48';

// Stout & Porter
const beerStoutURL =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/stout-and-porter';

// Gluten Free
const beerGlutenFreeURL =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/gluten-free-beer';

// Low alcohol
const beerLowAlcoholURL =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/alcohol-free-and-low-alcohol-beer-and-cider';

const tescoScrapeBeer = async () => {
  // Lager
  const beerLager1 = await tescoScraper(beerLagerURL1, 'beer', 'lager');
  const beerLager2 = await tescoScraper(beerLagerURL2, 'beer', 'lager');
  const beerLager3 = await tescoScraper(beerLagerURL3, 'beer', 'lager');

  const beerLagerRegular = [...beerLager1, ...beerLager2, ...beerLager3];

  // const beerLagerWorld1 = await tescoScraper(
  //   beerLagerWorldURL1,
  //   'beer',
  //   'lager'
  // );
  // const beerLagerWorld2 = await tescoScraper(
  //   beerLagerWorldURL2,
  //   'beer',
  //   'lager'
  // );

  // const beerLagerWorld = [...beerLagerWorld1, ...beerLagerWorld2];

  const beerLager = [...beerLagerRegular];

  // Ale and Bitter
  const beerAle1 = await tescoScraper(beerAleURL1, 'beer', 'ale');
  const beerAle2 = await tescoScraper(beerAleURL2, 'beer', 'ale');

  const beerAle = [...beerAle1, ...beerAle2];

  // Craft & Specialist
  const beerCraft1 = await tescoScraper(beerCraftURL1, 'beer', 'craft');
  const beerCraft2 = await tescoScraper(beerCraftURL2, 'beer', 'craft');
  const beerCraft3 = await tescoScraper(beerCraftURL3, 'beer', 'craft');

  const beerCraft = [...beerCraft1, ...beerCraft2, ...beerCraft3];

  // Cider
  const beerCider1 = await tescoScraper(beerCiderURL1, 'beer', 'cider');
  const beerCider2 = await tescoScraper(beerCiderURL2, 'beer', 'cider');

  const beerCider = [...beerCider1, ...beerCider2];

  // Stout
  const beerStout = await tescoScraper(beerStoutURL, 'beer', 'stout');

  // Gluten Free
  const beerGlutenFree = await tescoScraper(
    beerGlutenFreeURL,
    'beer',
    'gluten free'
  );

  // Low alcohol
  const beerLowAlcohol = await tescoScraper(
    beerLowAlcoholURL,
    'beer',
    'low alcohol'
  );

  let beer = [
    ...beerLager,
    ...beerAle,
    ...beerCraft,
    ...beerCider,
    ...beerStout,
    ...beerGlutenFree,
    ...beerLowAlcohol,
  ];

  beer = removeDuplicates(beer);

  console.log('Beer Data Scraped!');

  return beer;
};

// const main = async () => {
//   const beer = await tescoScrapeBeer();
//   const beerJSON = JSON.stringify(beer);
//   fs.writeFileSync('src/output/tesco-beer-final.json', beerJSON);
// };

// main();

module.exports = tescoScrapeBeer;

// TODO: Add a conditional to all Tesco pages whereby if it's a 404, it ignores it and
// moves on to the next page, since that must mean the page has dynamically changed to where
// it doesn't exist anymore because there aren't enough items to make it. Use beer URL to test.
