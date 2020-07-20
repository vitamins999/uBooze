import { tescoScraper } from '../utils/tescoScraper';
import fs from 'fs';
import { SupermarketProduct } from '../utils/types';
import { Beers } from '../types';

// Beer URLs

// Lager
const beerLagerURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-lager?page=1&count=48';
const beerLagerURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-lager?page=2&count=48';
const beerLagerURL3: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-lager?page=3&count=48';

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
  const beerLager1: SupermarketProduct[] = await tescoScraper(beerLagerURL1);
  const beerLager2: SupermarketProduct[] = await tescoScraper(beerLagerURL2);
  const beerLager3: SupermarketProduct[] = await tescoScraper(beerLagerURL3);

  const beerLagerRegular: SupermarketProduct[] = beerLager1.concat(
    beerLager2.concat(beerLager3)
  );

  const beerLagerWorld1: SupermarketProduct[] = await tescoScraper(
    beerLagerWorldURL1
  );
  const beerLagerWorld2: SupermarketProduct[] = await tescoScraper(
    beerLagerWorldURL2
  );

  const beerLagerWorld: SupermarketProduct[] = beerLagerWorld1.concat(
    beerLagerWorld2
  );

  const beerLager: SupermarketProduct[] = beerLagerRegular.concat(
    beerLagerWorld
  );

  // TODO: Need to filter out duplicates and combine both Lager and World lager arrays

  // Ale and Bitter
  const beerAle1: SupermarketProduct[] = await tescoScraper(beerAleURL1);
  const beerAle2: SupermarketProduct[] = await tescoScraper(beerAleURL2);

  const beerAle: SupermarketProduct[] = beerAle1.concat(beerAle2);

  // Craft & Specialist
  const beerCraft1: SupermarketProduct[] = await tescoScraper(beerCraftURL1);
  const beerCraft2: SupermarketProduct[] = await tescoScraper(beerCraftURL2);
  const beerCraft3: SupermarketProduct[] = await tescoScraper(beerCraftURL3);

  const beerCraft: SupermarketProduct[] = beerCraft1.concat(
    beerCraft2.concat(beerCraft3)
  );

  // Cider
  const beerCider1: SupermarketProduct[] = await tescoScraper(beerCiderURL1);
  const beerCider2: SupermarketProduct[] = await tescoScraper(beerCiderURL2);

  const beerCider: SupermarketProduct[] = beerCider1.concat(beerCider2);

  // Stout
  const beerStout: SupermarketProduct[] = await tescoScraper(beerStoutURL);

  // Gluten Free
  const beerGlutenFree = await tescoScraper(beerGlutenFreeURL);

  // Low alcohol
  const beerLowAlcohol: SupermarketProduct[] = await tescoScraper(
    beerLowAlcoholURL
  );

  const beer: Beers = {
    lager: beerLager,
    ale: beerAle,
    craft: beerCraft,
    cider: beerCider,
    stout: beerStout,
    glutenFree: beerGlutenFree,
    lowAlcohol: beerLowAlcohol,
  };

  const beerJSON: string = JSON.stringify(beer);
  fs.writeFileSync('output/tesco-beer.json', beerJSON);
};
