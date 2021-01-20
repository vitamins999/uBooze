const waitroseScraper = require('../utils/waitroseScraper');
const removeDuplicates = require('../utils/removeDuplicates');
const fs = require('fs');

// Wine URLs

// Red
const wineRedBordeauxURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/bordeaux';
const wineRedCabernetSauvignonURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/cabernet_sauvignon';
const wineRedGrenacheURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/grenache';
const wineRedMalbecURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/malbec';
const wineRedMerlotURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/merlot';
const wineRedPinotNoirURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/pinot_noir';
const wineRedRiojaURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/rioja_tempranillo';
const wineRedShirazAndSyrahURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/shiraz_and_syrah';

// White
const wineWhiteChardonnayURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/chardonnay';
const wineWhiteCheninBlancURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/chenin_blanc';
const wineWhitePinotGrigioURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/pinot_grigio';
const wineWhiteRieslingURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/riesling';
const wineWhiteSauvignonBlancURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/sauvignon_blanc';
const wineWhiteViognierURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/viognier';

// Rose
const wineRoseFranceURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/france';
const wineRoseItalyURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/italy';
const wineRoseSpainURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/spain';
const wineRoseAustraliaURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/australia';
const wineRoseUSAURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/usa';
const wineRoseSparklingURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/sparkling_rose_wine';
const wineRoseRestOfWorldURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/rest_of_world';
const wineRoseEnglandURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/england';

// Fine Wine
const wineFineRedURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/fine_wine/fine_red_wine';
const wineFineWhiteURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/fine_wine/fine_white_wine';

// Champagne and Sparkling Wine
const wineChampagneSparklingURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/champagne_and_sparkling_wine';

// Dessert Wine
const wineDessertURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/dessert_wine';

// Port
const winePortURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/port_sherry_and_madeira/port';

// Sherry
const wineSherryURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/port_sherry_and_madeira/sherry';

// Madeira Wine
const wineMadeiraURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/port_sherry_and_madeira/madeira';

// Vermouth
const wineVermouthURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/vermouth';

// Wine Boxes
const wineBoxesURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/wine_boxes';

// Small bottles
const wineSmallURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/mini_wine_bottles';

// Low Alcohol
const wineLowAlcoholURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/low_alcohol_wine';

const waitroseScrapeWine = async () => {
  // Red Wine
  const wineRedBordeaux = await waitroseScraper(
    wineRedBordeauxURL,
    'wine',
    'red'
  );
  const wineRedCabernetSauvignon = await waitroseScraper(
    wineRedCabernetSauvignonURL,
    'wine',
    'red'
  );
  const wineRedGrenache = await waitroseScraper(
    wineRedGrenacheURL,
    'wine',
    'red'
  );
  const wineRedMalbec = await waitroseScraper(wineRedMalbecURL, 'wine', 'red');
  const wineRedMerlot = await waitroseScraper(wineRedMerlotURL, 'wine', 'red');
  const wineRedPinotNoir = await waitroseScraper(
    wineRedPinotNoirURL,
    'wine',
    'red'
  );
  const wineRedRioja = await waitroseScraper(wineRedRiojaURL, 'wine', 'red');
  const wineRedShirazAndSyrah = await waitroseScraper(
    wineRedShirazAndSyrahURL,
    'wine',
    'red'
  );
  const wineFineRed = await waitroseScraper(wineFineRedURL, 'wine', 'red', 2);

  const wineRed = [
    ...wineRedBordeaux,
    ...wineRedCabernetSauvignon,
    ...wineRedGrenache,
    ...wineRedMalbec,
    ...wineRedMerlot,
    ...wineRedPinotNoir,
    ...wineRedRioja,
    ...wineRedShirazAndSyrah,
    ...wineFineRed,
  ];

  // White Wine
  const wineWhiteChardonnay = await waitroseScraper(
    wineWhiteChardonnayURL,
    'wine',
    'white'
  );
  const wineWhiteCheninBlanc = await waitroseScraper(
    wineWhiteCheninBlancURL,
    'wine',
    'white'
  );
  const wineWhitePinotGrigio = await waitroseScraper(
    wineWhitePinotGrigioURL,
    'wine',
    'white'
  );
  const wineWhiteRiesling = await waitroseScraper(
    wineWhiteRieslingURL,
    'wine',
    'white'
  );
  const wineWhiteSauvignonBlanc = await waitroseScraper(
    wineWhiteSauvignonBlancURL,
    'wine',
    'white'
  );
  const wineWhiteViognier = await waitroseScraper(
    wineWhiteViognierURL,
    'wine',
    'white'
  );
  const wineFineWhite = await waitroseScraper(
    wineFineWhiteURL,
    'wine',
    'white'
  );

  const wineWhite = [
    ...wineWhiteChardonnay,
    ...wineWhiteCheninBlanc,
    ...wineWhitePinotGrigio,
    ...wineWhiteRiesling,
    ...wineWhiteSauvignonBlanc,
    ...wineWhiteViognier,
    ...wineFineWhite,
  ];

  // Rose Wine
  const wineRoseFrance = await waitroseScraper(
    wineRoseFranceURL,
    'wine',
    'rose'
  );
  const wineRoseItaly = await waitroseScraper(wineRoseItalyURL, 'wine', 'rose');
  const wineRoseSpain = await waitroseScraper(wineRoseSpainURL, 'wine', 'rose');
  const wineRoseAustralia = await waitroseScraper(
    wineRoseAustraliaURL,
    'wine',
    'rose'
  );
  const wineRoseUSA = await waitroseScraper(wineRoseUSAURL, 'wine', 'rose');
  const wineRoseSparkling = await waitroseScraper(
    wineRoseSparklingURL,
    'wine',
    'rose'
  );
  const wineRoseRestOfWorld = await waitroseScraper(
    wineRoseRestOfWorldURL,
    'wine',
    'rose'
  );
  const wineRoseEngland = await waitroseScraper(
    wineRoseEnglandURL,
    'wine',
    'rose'
  );

  const wineRose = [
    ...wineRoseFrance,
    ...wineRoseItaly,
    ...wineRoseSpain,
    ...wineRoseAustralia,
    ...wineRoseUSA,
    ...wineRoseSparkling,
    ...wineRoseRestOfWorld,
    ...wineRoseEngland,
  ];

  // Champagne & Sparkling
  const wineChampagneSparkling = await waitroseScraper(
    wineChampagneSparklingURL,
    'wine',
    'sparkling',
    2
  );

  // Dessert Wine
  const wineDessert = await waitroseScraper(wineDessertURL, 'wine', 'dessert');

  // Fortified wine (Port and Sherry) and Vermouth
  const winePort = await waitroseScraper(
    winePortURL,
    'wine',
    'fortified and vermouth'
  );
  const wineSherry = await waitroseScraper(
    wineSherryURL,
    'wine',
    'fortified and vermouth'
  );
  const wineMadeira = await waitroseScraper(
    wineMadeiraURL,
    'wine',
    'fortified and vermouth'
  );
  const wineVermouth = await waitroseScraper(
    wineVermouthURL,
    'wine',
    'fortified and vermouth'
  );

  const wineFortifiedVermouth = [
    ...winePort,
    ...wineSherry,
    ...wineMadeira,
    ...wineVermouth,
  ];

  // Boxes
  const wineBoxes = await waitroseScraper(wineBoxesURL, 'wine', 'boxes');

  // Small
  const wineSmall = await waitroseScraper(wineSmallURL, 'wine', 'small');

  // Low Alcohol
  const wineLowAlcohol = await waitroseScraper(
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
    ...wineDessert,
    ...wineFortifiedVermouth,
    ...wineSmall,
    ...wineLowAlcohol,
  ];

  wine = removeDuplicates(wine);

  console.log('Wine scraped!');
  return wine;
};

const main = async () => {
  const wine = await waitroseScrapeWine();
  const wineJSON = JSON.stringify(wine);
  fs.writeFileSync('src/output/waitrose-wine-final.json', wineJSON);
};

main();

module.exports = waitroseScrapeWine;
