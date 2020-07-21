import { tescoScraper } from '../utils/tescoScraper';
import fs from 'fs';
import { removeDuplicates } from '../utils/removeDuplicates';
import { SupermarketProduct } from '../utils/types';

// Beer URLs

// Lager
const beerLagerURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-lager?page=1&count=48';
const beerLagerURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-lager?page=2&count=48';
// const beerLagerURL3: string =
//   'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-lager?page=3&count=48';

const beerLagerWorldURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-world-lager?page=1&count=48';
const beerLagerWorldURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-world-lager?page=2&count=48';

// Ale & Bitter
const beerAleURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-ale-and-bitter?page=1&count=48';
const beerAleURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-ale-and-bitter?page=2&count=48';

// Craft & Specialist
const beerCraftURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-craft-and-specialist?page=1&count=48';
const beerCraftURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-craft-and-specialist?page=2&count=48';
const beerCraftURL3: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-craft-and-specialist?page=3&count=48';

// Cider
const beerCiderURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/cider?page=1&count=48';
const beerCiderURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/cider?page=2&count=48';

// Stout & Porter
const beerStoutURL: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/stout-and-porter';

// Gluten Free
const beerGlutenFreeURL: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/gluten-free-beer';

// Low alcohol
const beerLowAlcoholURL: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/low-and-no-alcohol/low-and-no-alcohol-beer-and-cider';

export const tescoScrapeBeer = async (): Promise<void> => {
  // Lager
  const beerLager1: SupermarketProduct[] = await tescoScraper(
    beerLagerURL1,
    'beer',
    'lager'
  );
  const beerLager2: SupermarketProduct[] = await tescoScraper(
    beerLagerURL2,
    'beer',
    'lager'
  );
  // const beerLager3: SupermarketProduct[] = await tescoScraper(beerLagerURL3);

  const beerLagerRegular: SupermarketProduct[] = [...beerLager1, ...beerLager2];

  const beerLagerWorld1: SupermarketProduct[] = await tescoScraper(
    beerLagerWorldURL1,
    'beer',
    'lager'
  );
  const beerLagerWorld2: SupermarketProduct[] = await tescoScraper(
    beerLagerWorldURL2,
    'beer',
    'lager'
  );

  const beerLagerWorld: SupermarketProduct[] = [
    ...beerLagerWorld1,
    ...beerLagerWorld2,
  ];

  const beerLager: SupermarketProduct[] = [
    ...beerLagerRegular,
    ...beerLagerWorld,
  ];

  // Ale and Bitter
  const beerAle1: SupermarketProduct[] = await tescoScraper(
    beerAleURL1,
    'beer',
    'ale'
  );
  const beerAle2: SupermarketProduct[] = await tescoScraper(
    beerAleURL2,
    'beer',
    'ale'
  );

  const beerAle: SupermarketProduct[] = [...beerAle1, ...beerAle2];

  // Craft & Specialist
  const beerCraft1: SupermarketProduct[] = await tescoScraper(
    beerCraftURL1,
    'beer',
    'craft'
  );
  const beerCraft2: SupermarketProduct[] = await tescoScraper(
    beerCraftURL2,
    'beer',
    'craft'
  );
  const beerCraft3: SupermarketProduct[] = await tescoScraper(
    beerCraftURL3,
    'beer',
    'craft'
  );

  const beerCraft: SupermarketProduct[] = [
    ...beerCraft1,
    ...beerCraft2,
    ...beerCraft3,
  ];

  // Cider
  const beerCider1: SupermarketProduct[] = await tescoScraper(
    beerCiderURL1,
    'beer',
    'cider'
  );
  const beerCider2: SupermarketProduct[] = await tescoScraper(
    beerCiderURL2,
    'beer',
    'cider'
  );

  const beerCider: SupermarketProduct[] = [...beerCider1, ...beerCider2];

  // Stout
  const beerStout: SupermarketProduct[] = await tescoScraper(
    beerStoutURL,
    'beer',
    'stout'
  );

  // Gluten Free
  const beerGlutenFree = await tescoScraper(
    beerGlutenFreeURL,
    'beer',
    'gluten free'
  );

  // Low alcohol
  const beerLowAlcohol: SupermarketProduct[] = await tescoScraper(
    beerLowAlcoholURL,
    'beer',
    'low alcohol'
  );

  let beer: SupermarketProduct[] = [
    ...beerLager,
    ...beerAle,
    ...beerCraft,
    ...beerCider,
    ...beerStout,
    ...beerGlutenFree,
    ...beerLowAlcohol,
  ];

  beer = removeDuplicates(beer);

  const beerJSON: string = JSON.stringify(beer);
  fs.writeFileSync('src/output/tesco-beer.json', beerJSON);
};

// TODO: Add a conditional to all Tesco pages whereby if it's a 404, it ignores it and
// moves on to the next page, since that must mean the page has dynamically changed to where
// it doesn't exist anymore because there aren't enough items to make it. Use beer URL to test.
