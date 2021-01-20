// This function scrapes Waitrose in order to get the majority of the base data
// needed for the products table in the DB.  It's then saved in a json file.

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down');
const fs = require('fs');
const removeDuplicates = require('../removeDuplicates');

const linkTableScraper = async (
  url,
  drinkType,
  drinkSubtype,
  scrollNum = 1
) => {
  try {
    const products = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1300, height: 1000 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Clicks the 'accept cookies' popup
    await page.focus('[data-test="accept-all"]');
    await page.click('[data-test="accept-all"]');

    // Scroll to very top of page
    await page.evaluate((_) => {
      window.scrollTo(0, 0);
    });

    // Scroll to the bottom of the page with puppeteer autoscroll down
    await scrollPageToBottom(page, 250, 300);

    for (let i = 1; i < scrollNum; i++) {
      await page.focus('.button___2UT_5');
      await page.click('.button___2UT_5');
      await scrollPageToBottom(page, 250, 300);
    }

    const html = await page.content();

    const $ = cheerio.load(html);

    $('article').each((i, el) => {
      const productName = $(el).data('product-name');

      if (!productName) {
        return;
      }

      const volume = $(el).find('.size___2HSwr').first().text();

      products.push({
        productID: 0,
        productName,
        displayName: productName,
        volume,
        drinkType,
        drinkSubtype,
      });
    });

    await browser.close();

    return products;
  } catch (error) {
    throw new Error(`*** An error occured with linkTableScraper: ${error} ***`);
  }
};

// Beer URLs

// Ale
const beerAleLightURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/ale/light_ale';
const beerAleAmberURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/ale/amber_ale';
const beerAleDarkURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/ale/dark_ale';

// Lager
const beerLagerURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/lager';

// Cider
const beerCiderTraditionalURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/cider/traditional_ciders';
const beerCiderFlavouredURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/cider/flavoured_ciders';

// Low and Alcohol Free
const beerLowAlcoholURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/low_and_alcohol_free_beer';

const linkTableScrapeBeer = async () => {
  // Ale
  const beerAleLight = await linkTableScraper(
    beerAleLightURL,
    'beer',
    'ale',
    3
  );
  const beerAleAmber = await linkTableScraper(beerAleAmberURL, 'beer', 'ale');
  const beerAleDark = await linkTableScraper(beerAleDarkURL, 'beer', 'ale');

  const beerAle = [...beerAleLight, ...beerAleAmber, ...beerAleDark];

  // Lager
  const beerLager = await linkTableScraper(beerLagerURL, 'beer', 'lager', 2);

  // Cider
  const beerCiderTraditional = await linkTableScraper(
    beerCiderTraditionalURL,
    'beer',
    'cider'
  );
  const beerCiderFlavoured = await linkTableScraper(
    beerCiderFlavouredURL,
    'beer',
    'cider'
  );

  const beerCider = [...beerCiderTraditional, ...beerCiderFlavoured];

  // Low and Alcohol Free
  const beerLowAlcohol = await linkTableScraper(
    beerLowAlcoholURL,
    'beer',
    'low alcohol'
  );

  let beer = [...beerAle, ...beerLager, ...beerCider, ...beerLowAlcohol];

  beer = removeDuplicates(beer);

  console.log('Beer successfully scraped!');

  return beer;
};

// Spirits URLs

// Whisky
const spiritsWhiskyURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/whisky';

// Gin
const spiritsGinURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/gin';

// Vodka
const spiritsVodkaURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/vodka';

// Brandy
const spiritsBrandyURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/brandy';

// Cognac
const spiritsCognacURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/cognac';

// Rum
const spiritsRumURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/rum';

// Tequila
const spiritsTequilaURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/tequila';

// Pimms & Summer Drinks
const spiritsPimmsSummerURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/pimms_and_summer_drinks';

// Liqueurs & Aperitifs
const spiritsLiqueursURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/liqueurs_and_aperitifs';

// Premix
const spiritsPremixURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/pre_mixed_spirits';

// Low alcohol
const spiritsLowAlcoholURL =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/low_and_no_alcohol_spirits';

const linkTableScrapeSpirits = async () => {
  // Gin
  const spiritsGin = await linkTableScraper(spiritsGinURL, 'spirits', 'gin');

  // Whisky
  const spiritsWhisky = await linkTableScraper(
    spiritsWhiskyURL,
    'spirits',
    'whisky',
    3
  );

  // Vodka
  const spiritsVodka = await linkTableScraper(
    spiritsVodkaURL,
    'spirits',
    'vodka'
  );

  // Brandy and Cognac
  const spiritsBrandy = await linkTableScraper(
    spiritsBrandyURL,
    'spirits',
    'brandy and cognac'
  );
  const spiritsCognac = await linkTableScraper(
    spiritsCognacURL,
    'spirits',
    'brandy and cognac'
  );

  const spiritsBrandyCognac = [...spiritsBrandy, ...spiritsCognac];

  // Rum
  const spiritsRum = await linkTableScraper(spiritsRumURL, 'spirits', 'rum');

  // Tequila, Liqueurs and Aperitifs
  const spiritsTequila = await linkTableScraper(
    spiritsTequilaURL,
    'spirits',
    'tequila and liqueurs'
  );
  const spiritsLiqueurs = await linkTableScraper(
    spiritsLiqueursURL,
    'spirits',
    'tequila and liqueurs'
  );
  const spiritsPimmsSummer = await linkTableScraper(
    spiritsPimmsSummerURL,
    'spirits',
    'tequila and liqueurs'
  );

  const spiritsTequilaLiqueurs = [
    ...spiritsTequila,
    ...spiritsLiqueurs,
    ...spiritsPimmsSummer,
  ];

  // Premix
  const spiritsPremix = await linkTableScraper(
    spiritsPremixURL,
    'spirits',
    'premix'
  );

  // Low alcohol
  const spiritsLowAlcohol = await linkTableScraper(
    spiritsLowAlcoholURL,
    'spirits',
    'low alcohol'
  );

  let spirits = [
    ...spiritsGin,
    ...spiritsWhisky,
    ...spiritsVodka,
    ...spiritsRum,
    ...spiritsBrandyCognac,
    ...spiritsTequilaLiqueurs,
    ...spiritsPremix,
    ...spiritsLowAlcohol,
  ];

  spirits = removeDuplicates(spirits);

  console.log('Spirits scraped!');
  return spirits;
};

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

const linkTableScrapeWine = async () => {
  // Red Wine
  const wineRedBordeaux = await linkTableScraper(
    wineRedBordeauxURL,
    'wine',
    'red'
  );
  const wineRedCabernetSauvignon = await linkTableScraper(
    wineRedCabernetSauvignonURL,
    'wine',
    'red'
  );
  const wineRedGrenache = await linkTableScraper(
    wineRedGrenacheURL,
    'wine',
    'red'
  );
  const wineRedMalbec = await linkTableScraper(wineRedMalbecURL, 'wine', 'red');
  const wineRedMerlot = await linkTableScraper(wineRedMerlotURL, 'wine', 'red');
  const wineRedPinotNoir = await linkTableScraper(
    wineRedPinotNoirURL,
    'wine',
    'red'
  );
  const wineRedRioja = await linkTableScraper(wineRedRiojaURL, 'wine', 'red');
  const wineRedShirazAndSyrah = await linkTableScraper(
    wineRedShirazAndSyrahURL,
    'wine',
    'red'
  );
  const wineFineRed = await linkTableScraper(wineFineRedURL, 'wine', 'red', 2);

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
  const wineWhiteChardonnay = await linkTableScraper(
    wineWhiteChardonnayURL,
    'wine',
    'white'
  );
  const wineWhiteCheninBlanc = await linkTableScraper(
    wineWhiteCheninBlancURL,
    'wine',
    'white'
  );
  const wineWhitePinotGrigio = await linkTableScraper(
    wineWhitePinotGrigioURL,
    'wine',
    'white'
  );
  const wineWhiteRiesling = await linkTableScraper(
    wineWhiteRieslingURL,
    'wine',
    'white'
  );
  const wineWhiteSauvignonBlanc = await linkTableScraper(
    wineWhiteSauvignonBlancURL,
    'wine',
    'white'
  );
  const wineWhiteViognier = await linkTableScraper(
    wineWhiteViognierURL,
    'wine',
    'white'
  );
  const wineFineWhite = await linkTableScraper(
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
  const wineRoseFrance = await linkTableScraper(
    wineRoseFranceURL,
    'wine',
    'rose'
  );
  const wineRoseItaly = await linkTableScraper(
    wineRoseItalyURL,
    'wine',
    'rose'
  );
  const wineRoseSpain = await linkTableScraper(
    wineRoseSpainURL,
    'wine',
    'rose'
  );
  const wineRoseAustralia = await linkTableScraper(
    wineRoseAustraliaURL,
    'wine',
    'rose'
  );
  const wineRoseUSA = await linkTableScraper(wineRoseUSAURL, 'wine', 'rose');
  const wineRoseSparkling = await linkTableScraper(
    wineRoseSparklingURL,
    'wine',
    'rose'
  );
  const wineRoseRestOfWorld = await linkTableScraper(
    wineRoseRestOfWorldURL,
    'wine',
    'rose'
  );
  const wineRoseEngland = await linkTableScraper(
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
  const wineChampagneSparkling = await linkTableScraper(
    wineChampagneSparklingURL,
    'wine',
    'sparkling',
    2
  );

  // Dessert Wine
  const wineDessert = await linkTableScraper(wineDessertURL, 'wine', 'dessert');

  // Fortified wine (Port and Sherry) and Vermouth
  const winePort = await linkTableScraper(
    winePortURL,
    'wine',
    'fortified and vermouth'
  );
  const wineSherry = await linkTableScraper(
    wineSherryURL,
    'wine',
    'fortified and vermouth'
  );
  const wineMadeira = await linkTableScraper(
    wineMadeiraURL,
    'wine',
    'fortified and vermouth'
  );
  const wineVermouth = await linkTableScraper(
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
  const wineBoxes = await linkTableScraper(wineBoxesURL, 'wine', 'boxes');

  // Small
  const wineSmall = await linkTableScraper(wineSmallURL, 'wine', 'small');

  // Low Alcohol
  const wineLowAlcohol = await linkTableScraper(
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
  const beer = await linkTableScrapeBeer();
  const beerJSON = JSON.stringify(beer);
  fs.writeFileSync('src/output/seed-beer.json', beerJSON);

  const wine = await linkTableScrapeWine();
  const wineJSON = JSON.stringify(wine);
  fs.writeFileSync('src/output/seed-wine.json', wineJSON);

  const spirits = await linkTableScrapeSpirits();
  const spiritsJSON = JSON.stringify(spirits);
  fs.writeFileSync('src/output/seed-spirits.json', spiritsJSON);

  console.log('Finished!');
};

main();
