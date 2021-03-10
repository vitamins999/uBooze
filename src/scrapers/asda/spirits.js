const asdaScraper = require('../utils/asdaScraper');
const removeDuplicates = require('../utils/removeDuplicates');
const fs = require('fs');

// Spirits URLs

// Gin
const spiritsGinURL1 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/spirits/gin/1896568675';
const spiritsGinURL2 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/spirits/gin/1896568675?page=2';
const spiritsGinURL3 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/spirits/gin/1896568675?page=3';

// Whisky
const spiritsWhiskyURL1 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/spirits/whisky/3819661917';
const spiritsWhiskyURL2 =
  'https://groceries.asda.com/aisle/beer-wine-spirits/spirits/whisky/3819661917?page=2';

// Vodka
const spiritsVodkaURL =
  'https://groceries.asda.com/aisle/beer-wine-spirits/spirits/vodka/4245424163';

// Rum
const spiritsRumURL =
  'https://groceries.asda.com/aisle/beer-wine-spirits/spirits/rum/3132217782';

// Brandy & Cognac
const spiritsBrandyCognacURL =
  'https://groceries.asda.com/aisle/beer-wine-spirits/spirits/brandy-cognac/1595761255';

// Tequila and Liqueurs
const spiritsLiqueurURL =
  'https://groceries.asda.com/aisle/beer-wine-spirits/spirits/liqueurs/919633231';
const spiritsTequilaURL =
  'https://groceries.asda.com/aisle/beer-wine-spirits/spirits/tequila/4061684168';

const asdaScrapeSpirits = async () => {
  // Gin
  const spiritsGin1 = await asdaScraper(spiritsGinURL1, 'spirits', 'gin');
  const spiritsGin2 = await asdaScraper(spiritsGinURL2, 'spirits', 'gin');
  const spiritsGin3 = await asdaScraper(spiritsGinURL3, 'spirits', 'gin');

  const spiritsGin = [...spiritsGin1, ...spiritsGin2, ...spiritsGin3];

  // Whisky
  const spiritsWhisky1 = await asdaScraper(
    spiritsWhiskyURL1,
    'spirits',
    'whisky'
  );
  const spiritsWhisky2 = await asdaScraper(
    spiritsWhiskyURL2,
    'spirits',
    'whisky'
  );

  const spiritsWhisky = [...spiritsWhisky1, ...spiritsWhisky2];

  // Vodka
  const spiritsVodka = await asdaScraper(spiritsVodkaURL, 'spirits', 'vodka');

  // Rum
  const spiritsRum = await asdaScraper(spiritsRumURL, 'spirits', 'rum');

  // Brandy & Cognac
  const spiritsBrandyCognac = await asdaScraper(
    spiritsBrandyCognacURL,
    'spirits',
    'brandy and cognac'
  );

  // Liqueurs and Tequila
  const spiritsLiqueur = await asdaScraper(
    spiritsLiqueurURL,
    'spirits',
    'tequila and liqueurs'
  );
  const spiritsTequila = await asdaScraper(
    spiritsTequilaURL,
    'spirits',
    'tequila and liqueurs'
  );

  const spiritsTequilaLiqueur = [...spiritsTequila, ...spiritsLiqueur];

  let spirits = [
    ...spiritsGin,
    ...spiritsWhisky,
    ...spiritsVodka,
    ...spiritsRum,
    ...spiritsBrandyCognac,
    ...spiritsTequilaLiqueur,
  ];

  spirits = removeDuplicates(spirits);

  console.log('Spirits scraped!');

  return spirits;
};

const mainScrape = async () => {
  const spirits = await asdaScrapeSpirits();
  const spiritsJSON = JSON.stringify(spirits);
  fs.writeFileSync('src/output/asda-spirits-final.json', spiritsJSON);
};

mainScrape();

module.exports = asdaScrapeSpirits;
