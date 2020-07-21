import { tescoScraper } from '../utils/tescoScraper';
import fs from 'fs';
import { removeDuplicates } from '../utils/removeDuplicates';
import { SupermarketProduct } from '../utils/types';

// Spirits URLS

// Gin
const spiritsGinURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/gin?page=1&count=48';
const spiritsGinURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/gin?page=2&count=48';
const spiritsGinURL3: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/gin?page=3&count=48';

// Whisky
const spiritsWhiskyURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/whisky?page=1&count=48';
const spiritsWhiskyURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/whisky?page=2&count=48';
const spiritsWhiskyURL3: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/whisky?page=3&count=48';

// Vodka
const spiritsVodkaURL: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/vodka';

// Rum
const spiritsRumURL: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/rum';

// Brandy & Cognac
const spiritsBrandyCognacURL: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/brandy-and-cognac';

// Tequila, Liqueurs & Aperitifs
const spiritsTequilaLiqueursURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/tequila-liqueurs-and-aperitifs?page=1&count=48';
const spiritsTequilaLiqueursURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/tequila-liqueurs-and-aperitifs?page=2&count=48';

// Premix
const spiritsPremixURL1: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/premix-spirits?page=1&count=48';
const spiritsPremixURL2: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/premix-spirits?page=2&count=48';
const spiritsPremixURL3: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/premix-spirits?page=3&count=48';

// Low alcohol
const spiritsLowAlcoholURL: string =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/low-and-no-alcohol/low-and-no-alcohol-spirits';

export const tescoScrapeSpirits = async (): Promise<void> => {
  // Gin
  const spiritsGin1: SupermarketProduct[] = await tescoScraper(
    spiritsGinURL1,
    'spirits',
    'gin'
  );
  const spiritsGin2: SupermarketProduct[] = await tescoScraper(
    spiritsGinURL2,
    'spirits',
    'gin'
  );
  const spiritsGin3: SupermarketProduct[] = await tescoScraper(
    spiritsGinURL3,
    'spirits',
    'gin'
  );

  const spiritsGin: SupermarketProduct[] = [
    ...spiritsGin1,
    ...spiritsGin2,
    ...spiritsGin3,
  ];

  // Whisky
  const spiritsWhisky1: SupermarketProduct[] = await tescoScraper(
    spiritsWhiskyURL1,
    'spirits',
    'whisky'
  );
  const spiritsWhisky2: SupermarketProduct[] = await tescoScraper(
    spiritsWhiskyURL2,
    'spirits',
    'whisky'
  );
  const spiritsWhisky3: SupermarketProduct[] = await tescoScraper(
    spiritsWhiskyURL3,
    'spirits',
    'whisky'
  );

  const spiritsWhisky: SupermarketProduct[] = [
    ...spiritsWhisky1,
    ...spiritsWhisky2,
    ...spiritsWhisky3,
  ];

  // Vodka
  const spiritsVodka: SupermarketProduct[] = await tescoScraper(
    spiritsVodkaURL,
    'spirits',
    'vodka'
  );

  // Rum
  const spiritsRum: SupermarketProduct[] = await tescoScraper(
    spiritsRumURL,
    'spirits',
    'rum'
  );

  // Brandy & Cognac
  const spiritsBrandyCognac: SupermarketProduct[] = await tescoScraper(
    spiritsBrandyCognacURL,
    'spirits',
    'brandy and cognac'
  );

  // Tequila, Liqueurs & Aperitifs
  const spiritsTequilaLiqueurs1: SupermarketProduct[] = await tescoScraper(
    spiritsTequilaLiqueursURL1,
    'spirits',
    'tequila and liqueurs'
  );
  const spiritsTequilaLiqueurs2: SupermarketProduct[] = await tescoScraper(
    spiritsTequilaLiqueursURL2,
    'spirits',
    'tequila and liqueurs'
  );

  const spiritsTequilaLiqueurs: SupermarketProduct[] = [
    ...spiritsTequilaLiqueurs1,
    ...spiritsTequilaLiqueurs2,
  ];

  // Premix
  const spiritsPremix1: SupermarketProduct[] = await tescoScraper(
    spiritsPremixURL1,
    'spirits',
    'premix'
  );
  const spiritsPremix2: SupermarketProduct[] = await tescoScraper(
    spiritsPremixURL2,
    'spirits',
    'premix'
  );
  const spiritsPremix3: SupermarketProduct[] = await tescoScraper(
    spiritsPremixURL3,
    'spirits',
    'premix'
  );

  const spiritsPremix: SupermarketProduct[] = [
    ...spiritsPremix1,
    ...spiritsPremix2,
    ...spiritsPremix3,
  ];

  // Low alcohol
  const spiritsLowAlcohol: SupermarketProduct[] = await tescoScraper(
    spiritsLowAlcoholURL,
    'spirits',
    'low alcohol'
  );

  let spirits: SupermarketProduct[] = [
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

  const spiritsJSON: string = JSON.stringify(spirits);
  fs.writeFileSync('src/output/tesco-spirits.json', spiritsJSON);
};
