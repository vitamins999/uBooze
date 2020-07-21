import { waitroseScraper } from '../utils/waitroseScraper';
import fs from 'fs';
import { removeDuplicates } from '../utils/removeDuplicates';
import { SupermarketProduct } from '../utils/types';

// Wine URLs

// Red
const wineRedBordeauxURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/bordeaux';
const wineRedCabernetSauvignonURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/cabernet_sauvignon';
const wineRedGrenacheURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/grenache';
const wineRedMalbecURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/malbec';
const wineRedMerlotURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/merlot';
const wineRedPinotNoirURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/pinot_noir';
const wineRedRiojaURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/rioja_tempranillo';
const wineRedShirazAndSyrahURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/shiraz_and_syrah';

// White
const wineWhiteChardonnayURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/chardonnay';
const wineWhiteCheninBlancURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/chenin_blanc';
const wineWhitePinotGrigioURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/pinot_grigio';
const wineWhiteRieslingURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/riesling';
const wineWhiteSauvignonBlancURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/sauvignon_blanc';
const wineWhiteViognierURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/viognier';

// Rose
const wineRoseFranceURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/france';
const wineRoseItalyURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/italy';
const wineRoseSpainURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/spain';
const wineRoseAustraliaURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/australia';
const wineRoseUSAURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/usa';
const wineRoseSparklingURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/sparkling_rose_wine';
const wineRoseRestOfWorldURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/rest_of_world';
const wineRoseEnglandURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/england';

// Fine Wine
const wineFineRedURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/fine_wine/fine_red_wine';
const wineFineWhiteURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/fine_wine/fine_white_wine';

// Champagne and Sparkling Wine
const wineChampagneSparklingURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/champagne_and_sparkling_wine';

// Dessert Wine
const wineDessertURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/dessert_wine';

// Port
const winePortURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/port_sherry_and_madeira/port';

// Sherry
const wineSherryURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/port_sherry_and_madeira/sherry';

// Madeira Wine
const wineMadeiraURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/port_sherry_and_madeira/madeira';

// Vermouth
const wineVermouthURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/vermouth';

// Wine Boxes
const wineBoxesURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/wine_boxes';

// Small bottles
const wineSmallURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/mini_wine_bottles';

// Low Alcohol
const wineLowAlcoholURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/low_alcohol_wine';

export const waitroseScrapeWine = async (): Promise<void> => {
  // Red Wine
  const wineRedBordeaux: SupermarketProduct[] = await waitroseScraper(
    wineRedBordeauxURL,
    'wine',
    'red'
  );
  const wineRedCabernetSauvignon: SupermarketProduct[] = await waitroseScraper(
    wineRedCabernetSauvignonURL,
    'wine',
    'red'
  );
  const wineRedGrenache: SupermarketProduct[] = await waitroseScraper(
    wineRedGrenacheURL,
    'wine',
    'red'
  );
  const wineRedMalbec: SupermarketProduct[] = await waitroseScraper(
    wineRedMalbecURL,
    'wine',
    'red'
  );
  const wineRedMerlot: SupermarketProduct[] = await waitroseScraper(
    wineRedMerlotURL,
    'wine',
    'red'
  );
  const wineRedPinotNoir: SupermarketProduct[] = await waitroseScraper(
    wineRedPinotNoirURL,
    'wine',
    'red'
  );
  const wineRedRioja: SupermarketProduct[] = await waitroseScraper(
    wineRedRiojaURL,
    'wine',
    'red'
  );
  const wineRedShirazAndSyrah: SupermarketProduct[] = await waitroseScraper(
    wineRedShirazAndSyrahURL,
    'wine',
    'red'
  );
  const wineFineRed: SupermarketProduct[] = await waitroseScraper(
    wineFineRedURL,
    'wine',
    'red',
    2
  );

  const wineRed: SupermarketProduct[] = [
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
  const wineWhiteChardonnay: SupermarketProduct[] = await waitroseScraper(
    wineWhiteChardonnayURL,
    'wine',
    'white'
  );
  const wineWhiteCheninBlanc: SupermarketProduct[] = await waitroseScraper(
    wineWhiteCheninBlancURL,
    'wine',
    'white'
  );
  const wineWhitePinotGrigio: SupermarketProduct[] = await waitroseScraper(
    wineWhitePinotGrigioURL,
    'wine',
    'white'
  );
  const wineWhiteRiesling: SupermarketProduct[] = await waitroseScraper(
    wineWhiteRieslingURL,
    'wine',
    'white'
  );
  const wineWhiteSauvignonBlanc: SupermarketProduct[] = await waitroseScraper(
    wineWhiteSauvignonBlancURL,
    'wine',
    'white'
  );
  const wineWhiteViognier: SupermarketProduct[] = await waitroseScraper(
    wineWhiteViognierURL,
    'wine',
    'white'
  );
  const wineFineWhite: SupermarketProduct[] = await waitroseScraper(
    wineFineWhiteURL,
    'wine',
    'white'
  );

  const wineWhite: SupermarketProduct[] = [
    ...wineWhiteChardonnay,
    ...wineWhiteCheninBlanc,
    ...wineWhitePinotGrigio,
    ...wineWhiteRiesling,
    ...wineWhiteSauvignonBlanc,
    ...wineWhiteViognier,
    ...wineFineWhite,
  ];

  // Rose Wine
  const wineRoseFrance: SupermarketProduct[] = await waitroseScraper(
    wineRoseFranceURL,
    'wine',
    'rose'
  );
  const wineRoseItaly: SupermarketProduct[] = await waitroseScraper(
    wineRoseItalyURL,
    'wine',
    'rose'
  );
  const wineRoseSpain: SupermarketProduct[] = await waitroseScraper(
    wineRoseSpainURL,
    'wine',
    'rose'
  );
  const wineRoseAustralia: SupermarketProduct[] = await waitroseScraper(
    wineRoseAustraliaURL,
    'wine',
    'rose'
  );
  const wineRoseUSA: SupermarketProduct[] = await waitroseScraper(
    wineRoseUSAURL,
    'wine',
    'rose'
  );
  const wineRoseSparkling: SupermarketProduct[] = await waitroseScraper(
    wineRoseSparklingURL,
    'wine',
    'rose'
  );
  const wineRoseRestOfWorld: SupermarketProduct[] = await waitroseScraper(
    wineRoseRestOfWorldURL,
    'wine',
    'rose'
  );
  const wineRoseEngland: SupermarketProduct[] = await waitroseScraper(
    wineRoseEnglandURL,
    'wine',
    'rose'
  );

  const wineRose: SupermarketProduct[] = [
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
  const wineChampagneSparkling: SupermarketProduct[] = await waitroseScraper(
    wineChampagneSparklingURL,
    'wine',
    'sparkling',
    2
  );

  // Dessert Wine
  const wineDessert: SupermarketProduct[] = await waitroseScraper(
    wineDessertURL,
    'wine',
    'dessert'
  );

  // Fortified wine (Port and Sherry) and Vermouth
  const winePort: SupermarketProduct[] = await waitroseScraper(
    winePortURL,
    'wine',
    'fortified and vermouth'
  );
  const wineSherry: SupermarketProduct[] = await waitroseScraper(
    wineSherryURL,
    'wine',
    'fortified and vermouth'
  );
  const wineMadeira: SupermarketProduct[] = await waitroseScraper(
    wineMadeiraURL,
    'wine',
    'fortified and vermouth'
  );
  const wineVermouth: SupermarketProduct[] = await waitroseScraper(
    wineVermouthURL,
    'wine',
    'fortified and vermouth'
  );

  const wineFortifiedVermouth: SupermarketProduct[] = [
    ...winePort,
    ...wineSherry,
    ...wineMadeira,
    ...wineVermouth,
  ];

  // Boxes
  const wineBoxes: SupermarketProduct[] = await waitroseScraper(
    wineBoxesURL,
    'wine',
    'boxes'
  );

  // Small
  const wineSmall: SupermarketProduct[] = await waitroseScraper(
    wineSmallURL,
    'wine',
    'small'
  );

  // Low Alcohol
  const wineLowAlcohol: SupermarketProduct[] = await waitroseScraper(
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
    ...wineDessert,
    ...wineFortifiedVermouth,
    ...wineSmall,
    ...wineLowAlcohol,
  ];

  wine = removeDuplicates(wine);

  const wineJSON: string = JSON.stringify(wine);
  fs.writeFileSync('src/output/waitrose-wine.json', wineJSON);
};
