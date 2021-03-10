const asdaScraper = require('../utils/asdaScraper');
const removeDuplicates = require('../utils/removeDuplicates');
const fs = require('fs');

// Wine URLs

// Red
const wineRedPinotNoirURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/red-wine-by-grape/pinot-noir/723908947';
const wineRedMalbecURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/red-wine-by-grape/malbec/2978208221';
const wineRedCabernetSauvignonURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/red-wine-by-grape/cabernet-sauvignon/468655264';
const wineRedRiojaURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/red-wine-by-grape/rioja/4184691459';
const wineRedShirazURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/red-wine-by-grape/shiraz/960752695';
const wineRedMerlotURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/red-wine-by-grape/merlot/396470166';
const wineRedOtherURL1 =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/red-wine-by-grape/all-other-grapes/1821513990';
const wineRedOtherURL2 =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/red-wine-by-grape/all-other-grapes/1821513990?page=2';

// White
const wineWhitePinotGrigioURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/white-wine-by-grape/pinot-grigio/2394761614';
const wineWhiteSauvignonBlancURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/white-wine-by-grape/sauvignon-blanc/2337749207';
const wineWhiteChardonnayURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/white-wine-by-grape/chardonnay/2107719690';
const wineWhiteCheninBlancURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/white-wine-by-grape/chenin-blanc/382271622';
const wineWhiteOtherURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/white-wine-by-grape/all-other-grapes/1495835241';

// Rose
const wineRoseURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/rose-wine/rose-wine/375123009';

// Sparkling
const wineSparklingURL1 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/prosecco-champagne-sparkling-wine/view-all-fizz/2105356077';
const wineSparklingURL2 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/prosecco-champagne-sparkling-wine/view-all-fizz/2105356077?page=2';

// Wine Boxes
const wineBoxesWhiteURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/boxed-wine/boxed-white-wine/2021264892';
const wineBoxesRedURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/boxed-wine/boxed-red-wine/126587530';
const wineBoxesRoseURL =
  'https://groceries.asda.com/shelf/beer-wine-spirits/wine/boxed-wine/boxed-rose-wine/2471649940';

// Fortified wine (Sherry and Port) and Vermouth
const wineFortifiedVermouthURL =
  'https://groceries.asda.com/aisle/beer-wine-spirits/wine/port-sherry-vermouth/124623377';

// Fruity
const wineFruityURL =
  'https://groceries.asda.com/aisle/beer-wine-spirits/wine/fruit-flavoured-wine/3256698944';

// Small Bottles
const wineSmallURL =
  'https://groceries.asda.com/aisle/beer-wine-spirits/wine/small-wine-bottles/1452781333';

// Low alcohol
const wineLowAlcoholURL =
  'https://groceries.asda.com/aisle/beer-wine-spirits/wine/no-low-alcohol-wine/925486019';

const asdaScrapeWine = async () => {
  // Red
  const wineRedPinotNoir = await asdaScraper(
    wineRedPinotNoirURL,
    'wine',
    'red'
  );
  const wineRedMalbec = await asdaScraper(wineRedMalbecURL, 'wine', 'red');
  const wineRedCabernetSauvignon = await asdaScraper(
    wineRedCabernetSauvignonURL,
    'wine',
    'red'
  );
  const wineRedRioja = await asdaScraper(wineRedRiojaURL, 'wine', 'red');
  const wineRedShiraz = await asdaScraper(wineRedShirazURL, 'wine', 'red');
  const wineRedMerlot = await asdaScraper(wineRedMerlotURL, 'wine', 'red');
  const wineRedOther1 = await asdaScraper(wineRedOtherURL1, 'wine', 'red');
  const wineRedOther2 = await asdaScraper(wineRedOtherURL2, 'wine', 'red');

  const wineRed = [
    ...wineRedPinotNoir,
    ...wineRedMalbec,
    ...wineRedCabernetSauvignon,
    ...wineRedRioja,
    ...wineRedShiraz,
    ...wineRedMerlot,
    ...wineRedOther1,
    ...wineRedOther2,
  ];

  // White
  const wineWhitePinotGrigio = await asdaScraper(
    wineWhitePinotGrigioURL,
    'wine',
    'white'
  );

  const wineWhiteSauvignonBlanc = await asdaScraper(
    wineWhiteSauvignonBlancURL,
    'wine',
    'white'
  );

  const wineWhiteChardonnay = await asdaScraper(
    wineWhiteChardonnayURL,
    'wine',
    'white'
  );

  const wineWhiteCheninBlanc = await asdaScraper(
    wineWhiteCheninBlancURL,
    'wine',
    'white'
  );

  const wineWhiteOther = await asdaScraper(wineWhiteOtherURL, 'wine', 'white');

  const wineWhite = [
    ...wineWhitePinotGrigio,
    ...wineWhiteSauvignonBlanc,
    ...wineWhiteChardonnay,
    ...wineWhiteCheninBlanc,
    ...wineWhiteOther,
  ];

  // Rose
  const wineRose = await asdaScraper(wineRoseURL, 'wine', 'rose');

  // Sparkling
  const wineSparkling1 = await asdaScraper(
    wineSparklingURL1,
    'wine',
    'sparkling'
  );
  const wineSparkling2 = await asdaScraper(
    wineSparklingURL2,
    'wine',
    'sparkling'
  );

  const wineSparkling = [...wineSparkling1, ...wineSparkling2];

  // Wine Boxes
  const wineBoxesWhite = await asdaScraper(wineBoxesWhiteURL, 'wine', 'boxes');
  const wineBoxesRed = await asdaScraper(wineBoxesRedURL, 'wine', 'boxes');
  const wineBoxesRose = await asdaScraper(wineBoxesRoseURL, 'wine', 'boxes');

  const wineBoxes = [...wineBoxesWhite, ...wineBoxesRed, ...wineBoxesRose];

  // Fortified & Vermouth
  const wineFortifiedVermouth = await asdaScraper(
    wineFortifiedVermouthURL,
    'wine',
    'fortified'
  );

  // Fruity
  const wineFruity = await asdaScraper(wineFruityURL, 'wine', 'fruity');

  // Small Bottles
  const wineSmall = await asdaScraper(wineSmallURL, 'wine', 'small');

  // Low Alcohol
  const wineLowAlcohol = await asdaScraper(
    wineLowAlcoholURL,
    'wine',
    'low alcohol'
  );

  let wine = [
    ...wineRed,
    ...wineWhite,
    ...wineRose,
    ...wineSparkling,
    ...wineBoxes,
    ...wineFortifiedVermouth,
    ...wineFruity,
    ...wineSmall,
    ...wineLowAlcohol,
  ];

  wine = removeDuplicates(wine);

  console.log('Wine Scraped!');

  return wine;
};

const mainScrape = async () => {
  const wine = await asdaScrapeWine();
  const wineJSON = JSON.stringify(wine);
  fs.writeFileSync('src/output/asda-wine-final.json', wineJSON);
};

mainScrape();

module.exports = asdaScrapeWine;
