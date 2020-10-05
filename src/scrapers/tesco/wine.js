const tescoScraper = require('../utils/tescoScraper');
const fs = require('fs');
const removeDuplicates = require('../utils/removeDuplicates');

// Wine URLS

// Red
const wineRedURL1 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=1&count=48';
const wineRedURL2 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=2&count=48';
const wineRedURL3 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=3&count=48';
const wineRedURL4 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=4&count=48';
const wineRedURL5 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=5&count=48';

// White
const wineWhiteURL1 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/white-wine?page=1&count=48';
const wineWhiteURL2 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/white-wine?page=2&count=48';
const wineWhiteURL3 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/white-wine?page=3&count=48';
const wineWhiteURL4 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/white-wine?page=4&count=48';

// Rose
const wineRoseURL1 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/rose-wine?page=1&count=48';
const wineRoseURL2 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/rose-wine?page=2&count=48';

// Champagne & Sparkling
const wineChampagneSparklingURL1 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/champagne-and-sparkling-wine?page=1&count=48';
const wineChampagneSparklingURL2 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/champagne-and-sparkling-wine?page=2&count=48';

// Boxes
const wineBoxesURL =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/boxed-wine';

// Fruity
const wineFruityURL =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/fruity-wine';

// Dessert
const wineDessertURL =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/dessert-wine';

// Fortified Wine (Port and Sherry) and Vermouth
const wineFortifiedVermouthURL =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/fortified-wine-and-vermouth';

// Small Wine Bottles
const wineSmallURL1 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/small-wine-bottles?page=1&count=48';
// const wineSmallURL2 =
//   'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/small-wine-bottles?page=2&count=48';

// Low Alcohol
const wineLowAlcoholURL =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/low-and-no-alcohol/low-and-no-alcohol-wine';

const tescoScrapeWine = async () => {
  // Red
  const wineRed1 = await tescoScraper(wineRedURL1, 'wine', 'red');
  const wineRed2 = await tescoScraper(wineRedURL2, 'wine', 'red');
  const wineRed3 = await tescoScraper(wineRedURL3, 'wine', 'red');
  const wineRed4 = await tescoScraper(wineRedURL4, 'wine', 'red');
  const wineRed5 = await tescoScraper(wineRedURL5, 'wine', 'red');

  const wineRed = [
    ...wineRed1,
    ...wineRed2,
    ...wineRed3,
    ...wineRed4,
    ...wineRed5,
  ];

  // White
  const wineWhite1 = await tescoScraper(wineWhiteURL1, 'wine', 'white');
  const wineWhite2 = await tescoScraper(wineWhiteURL2, 'wine', 'white');
  const wineWhite3 = await tescoScraper(wineWhiteURL3, 'wine', 'white');
  const wineWhite4 = await tescoScraper(wineWhiteURL4, 'wine', 'white');

  const wineWhite = [
    ...wineWhite1,
    ...wineWhite2,
    ...wineWhite3,
    ...wineWhite4,
  ];

  // Rose
  const wineRose1 = await tescoScraper(wineRoseURL1, 'wine', 'rose');
  const wineRose2 = await tescoScraper(wineRoseURL2, 'wine', 'rose');

  const wineRose = [...wineRose1, ...wineRose2];

  // Champagne & Sparkling
  const wineChampagneSparkling1 = await tescoScraper(
    wineChampagneSparklingURL1,
    'wine',
    'sparkling'
  );
  const wineChampagneSparkling2 = await tescoScraper(
    wineChampagneSparklingURL2,
    'wine',
    'sparkling'
  );

  const wineChampagneSparkling = [
    ...wineChampagneSparkling1,
    ...wineChampagneSparkling2,
  ];

  // Boxes
  const wineBoxes = await tescoScraper(wineBoxesURL, 'wine', 'boxes');

  // Fruity
  const wineFruity = await tescoScraper(wineFruityURL, 'wine', 'fruity');

  // Dessert
  const wineDessert = await tescoScraper(wineDessertURL, 'wine', 'dessert');

  // Fortified Wine (Port and Sherry) and Vermouth
  const wineFortifiedVermouth = await tescoScraper(
    wineFortifiedVermouthURL,
    'wine',
    'fortified and vermouth'
  );

  // Small wine bottles
  const wineSmall1 = await tescoScraper(wineSmallURL1, 'wine', 'small');
  // const wineSmall2 = await tescoScraper(wineSmallURL2, 'wine', 'small');

  const wineSmall = [
    ...wineSmall1,
    // ...wineSmall2
  ];

  // Low alcohol
  const wineLowAlcohol = await tescoScraper(
    wineLowAlcoholURL,
    'wine',
    'low alcohol'
  );

  let wine = [
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

  console.log('Wine Data Scraped!');

  const wineJSON = JSON.stringify(wine);
  fs.writeFileSync('src/output/tesco-wine.json', wineJSON);

  return wine;
};

module.exports = tescoScrapeWine;
