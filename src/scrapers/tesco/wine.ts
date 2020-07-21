import { tescoScraper } from '../utils/tescoScraper';
import fs from 'fs';
import { removeDuplicates } from '../utils/removeDuplicates';
import { SupermarketProduct } from '../utils/types';

// Wine URLS

// Red
const wineRedURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=1&count=48';
const wineRedURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=2&count=48';
const wineRedURL3: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=3&count=48';
const wineRedURL4: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=4&count=48';
const wineRedURL5: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=5&count=48';

// White
const wineWhiteURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/white-wine?page=1&count=48';
const wineWhiteURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/white-wine?page=2&count=48';
const wineWhiteURL3: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/white-wine?page=3&count=48';
const wineWhiteURL4: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/white-wine?page=4&count=48';

// Rose
const wineRoseURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/rose-wine?page=1&count=48';
const wineRoseURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/rose-wine?page=2&count=48';

// Champagne & Sparkling
const wineChampagneSparklingURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/champagne-and-sparkling-wine?page=1&count=48';
const wineChampagneSparklingURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/champagne-and-sparkling-wine?page=2&count=48';

// Boxes
const wineBoxesURL: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/boxed-wine';

// Fruity
const wineFruityURL: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/fruity-wine';

// Dessert
const wineDessertURL: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/dessert-wine';

// Fortified Wine (Port and Sherry) and Vermouth
const wineFortifiedVermouthURL: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/fortified-wine-and-vermouth';

// Small Wine Bottles
const wineSmallURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/small-wine-bottles?page=1&count=48';
const wineSmallURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/small-wine-bottles?page=2&count=48';

// Low Alcohol
const wineLowAlcoholURL: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/low-and-no-alcohol/low-and-no-alcohol-wine';

export const tescoScrapeWine = async (): Promise<void> => {
  // Red
  const wineRed1: SupermarketProduct[] = await tescoScraper(
    wineRedURL1,
    'wine',
    'red'
  );
  const wineRed2: SupermarketProduct[] = await tescoScraper(
    wineRedURL2,
    'wine',
    'red'
  );
  const wineRed3: SupermarketProduct[] = await tescoScraper(
    wineRedURL3,
    'wine',
    'red'
  );
  const wineRed4: SupermarketProduct[] = await tescoScraper(
    wineRedURL4,
    'wine',
    'red'
  );
  const wineRed5: SupermarketProduct[] = await tescoScraper(
    wineRedURL5,
    'wine',
    'red'
  );

  const wineRed: SupermarketProduct[] = [
    ...wineRed1,
    ...wineRed2,
    ...wineRed3,
    ...wineRed4,
    ...wineRed5,
  ];

  // White
  const wineWhite1: SupermarketProduct[] = await tescoScraper(
    wineWhiteURL1,
    'wine',
    'white'
  );
  const wineWhite2: SupermarketProduct[] = await tescoScraper(
    wineWhiteURL2,
    'wine',
    'white'
  );
  const wineWhite3: SupermarketProduct[] = await tescoScraper(
    wineWhiteURL3,
    'wine',
    'white'
  );
  const wineWhite4: SupermarketProduct[] = await tescoScraper(
    wineWhiteURL4,
    'wine',
    'white'
  );

  const wineWhite: SupermarketProduct[] = [
    ...wineWhite1,
    ...wineWhite2,
    ...wineWhite3,
    ...wineWhite4,
  ];

  // Rose
  const wineRose1: SupermarketProduct[] = await tescoScraper(
    wineRoseURL1,
    'wine',
    'rose'
  );
  const wineRose2: SupermarketProduct[] = await tescoScraper(
    wineRoseURL2,
    'wine',
    'rose'
  );

  const wineRose: SupermarketProduct[] = [...wineRose1, ...wineRose2];

  // Champagne & Sparkling
  const wineChampagneSparkling1: SupermarketProduct[] = await tescoScraper(
    wineChampagneSparklingURL1,
    'wine',
    'sparkling'
  );
  const wineChampagneSparkling2: SupermarketProduct[] = await tescoScraper(
    wineChampagneSparklingURL2,
    'wine',
    'sparkling'
  );

  const wineChampagneSparkling: SupermarketProduct[] = [
    ...wineChampagneSparkling1,
    ...wineChampagneSparkling2,
  ];

  // Boxes
  const wineBoxes: SupermarketProduct[] = await tescoScraper(
    wineBoxesURL,
    'wine',
    'boxes'
  );

  // Fruity
  const wineFruity: SupermarketProduct[] = await tescoScraper(
    wineFruityURL,
    'wine',
    'fruity'
  );

  // Dessert
  const wineDessert: SupermarketProduct[] = await tescoScraper(
    wineDessertURL,
    'wine',
    'dessert'
  );

  // Fortified Wine (Port and Sherry) and Vermouth
  const wineFortifiedVermouth: SupermarketProduct[] = await tescoScraper(
    wineFortifiedVermouthURL,
    'wine',
    'fortified and vermouth'
  );

  // Small wine bottles
  const wineSmall1: SupermarketProduct[] = await tescoScraper(
    wineSmallURL1,
    'wine',
    'small'
  );
  const wineSmall2: SupermarketProduct[] = await tescoScraper(
    wineSmallURL2,
    'wine',
    'small'
  );

  const wineSmall: SupermarketProduct[] = [...wineSmall1, ...wineSmall2];

  // Low alcohol
  const wineLowAlcohol: SupermarketProduct[] = await tescoScraper(
    wineLowAlcoholURL,
    'wine',
    'low alcohol'
  );

  let wine: SupermarketProduct[] = [
    ...wineRed,
    ...wineWhite,
    ...wineRose,
    ...wineChampagneSparkling,
    ...wineBoxes,
    ...wineFruity,
    ...wineDessert,
    ...wineFortifiedVermouth,
    ...wineSmall,
    ...wineLowAlcohol,
  ];

  wine = removeDuplicates(wine);

  const wineJSON: string = JSON.stringify(wine);
  fs.writeFileSync('src/output/tesco-wine.json', wineJSON);
};
