const morrisonsScraper = require('../utils/morrisonsScraper');
const removeDuplicates = require('../utils/removeDuplicates');

// Wine URLs

// Red
const wineRedURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/wine-champagne-176432/red-wine-176433';

// White
const wineWhiteURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/wine-champagne-176432/white-wine-176434';

// Rose
const wineRoseURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/wine-champagne-176432/rose-wine-176435';

// Champagne & Sparkling
const wineChampagneSparklingURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/wine-champagne-176432/champagne-sparkling-wine-176436';

// Wine Boxes
const wineBoxesURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/wine-champagne-176432/boxed-wine-176442';

// Fortified & Vermouth
const wineFortifiedVermouthURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/wine-champagne-176432/fortified-wines-miscellaneous-176441';

// Small Bottles
const wineSmallURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/wine-champagne-176432/small-bottles-176444';

// Low Alcohol
const wineLowAlcoholURL =
  'https://groceries.morrisons.com/browse/beer-wines-spirits-103120/wine-champagne-176432/low-no-alcohol-176443';

const morrisonsScrapeWine = async () => {
  // Red
  const wineRed = await morrisonsScraper(wineRedURL, 'wine', 'red');

  // White
  const wineWhite = await morrisonsScraper(wineWhiteURL, 'wine', 'white');

  // Rose
  const wineRose = await morrisonsScraper(wineRoseURL, 'wine', 'rose');

  // Champagne & Sparkling
  const wineChampagneSparkling = await morrisonsScraper(
    wineChampagneSparklingURL,
    'wine',
    'sparkling'
  );

  // Wine Boxes
  const wineBoxes = await morrisonsScraper(wineBoxesURL, 'wine', 'boxes');

  // Fortified & Vermouth
  const wineFortifiedVermouth = await morrisonsScraper(
    wineFortifiedVermouthURL,
    'wine',
    'fortified and vermouth'
  );

  // Small Bottles
  const wineSmall = await morrisonsScraper(wineSmallURL, 'wine', 'small');

  // Low Alcohol
  const wineLowAlcohol = await morrisonsScraper(
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
    ...wineFortifiedVermouth,
    ...wineSmall,
    ...wineLowAlcohol,
  ];

  wine = removeDuplicates(wine);

  console.log('Wine scraped!');

  return wine;
};

module.exports = morrisonsScrapeWine;
