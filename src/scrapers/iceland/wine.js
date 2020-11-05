const icelandScraper = require('../utils/icelandScraper');
const fs = require('fs');
const removeDuplicates = require('../utils/removeDuplicates');

// Wine URLs

// Red
const wineRedURL1 =
  'https://www.iceland.co.uk/drinks/wine-and-sparkling/red-wine';
const wineRedURL2 =
  'https://www.iceland.co.uk/drinks/wine-and-sparkling/red-wine?start=24';
const wineRedURL3 =
  'https://www.iceland.co.uk/drinks/wine-and-sparkling/red-wine?start=48';

// White
const wineWhiteURL1 =
  'https://www.iceland.co.uk/drinks/wine-and-sparkling/white-wine';
const wineWhiteURL2 =
  'https://www.iceland.co.uk/drinks/wine-and-sparkling/white-wine?start=24';

// Rose
const wineRoseURL =
  'https://www.iceland.co.uk/drinks/wine-and-sparkling/rose-wine';

// Champagne and Sparkling
const wineChampagneSparklingURL =
  'https://www.iceland.co.uk/drinks/wine-and-sparkling/sparkling-wine';

const icelandScrapeWine = async () => {
  // Red
  const wineRed1 = await icelandScraper(wineRedURL1, 'wine', 'red');
  const wineRed2 = await icelandScraper(wineRedURL2, 'wine', 'red');
  const wineRed3 = await icelandScraper(wineRedURL3, 'wine', 'red');

  const wineRed = [...wineRed1, ...wineRed2, ...wineRed3];

  // White
  const wineWhite1 = await icelandScraper(wineWhiteURL1, 'wine', 'white');
  const wineWhite2 = await icelandScraper(wineWhiteURL2, 'wine', 'white');

  const wineWhite = [...wineWhite1, ...wineWhite2];

  // Rose
  const wineRose = await icelandScraper(wineRoseURL, 'wine', 'rose');

  // Champagne & Sparkling
  const wineChampagneSparkling = await icelandScraper(
    wineChampagneSparklingURL,
    'wine',
    'sparkling'
  );

  let wine = [...wineRed, ...wineWhite, ...wineRose, ...wineChampagneSparkling];

  wine = removeDuplicates(wine);

  console.log('Wine scraped!');

  return wine;
};

module.exports = icelandScrapeWine;
