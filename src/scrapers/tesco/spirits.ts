import { tescoScraper } from '../utils/tescoScraper';
import fs from 'fs';
import { SupermarketProduct } from '../utils/types';
import { Spirits } from '../types';

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
  const spiritsGin1: SupermarketProduct[] = await tescoScraper(spiritsGinURL1);
  const spiritsGin2: SupermarketProduct[] = await tescoScraper(spiritsGinURL2);
  const spiritsGin3: SupermarketProduct[] = await tescoScraper(spiritsGinURL3);

  const spiritsGin: SupermarketProduct[] = spiritsGin1.concat(
    spiritsGin2.concat(spiritsGin3)
  );

  // Whisky
  const spiritsWhisky1: SupermarketProduct[] = await tescoScraper(
    spiritsWhiskyURL1
  );
  const spiritsWhisky2: SupermarketProduct[] = await tescoScraper(
    spiritsWhiskyURL2
  );
  const spiritsWhisky3: SupermarketProduct[] = await tescoScraper(
    spiritsWhiskyURL3
  );

  const spiritsWhisky: SupermarketProduct[] = spiritsWhisky1.concat(
    spiritsWhisky2.concat(spiritsWhisky3)
  );

  // Vodka
  const spiritsVodka: SupermarketProduct[] = await tescoScraper(
    spiritsVodkaURL
  );

  // Rum
  const spiritsRum: SupermarketProduct[] = await tescoScraper(spiritsRumURL);

  // Brandy & Cognac
  const spiritsBrandyCognac: SupermarketProduct[] = await tescoScraper(
    spiritsBrandyCognacURL
  );

  // Tequila, Liqueurs & Aperitifs
  const spiritsTequilaLiqueurs1: SupermarketProduct[] = await tescoScraper(
    spiritsTequilaLiqueursURL1
  );
  const spiritsTequilaLiqueurs2: SupermarketProduct[] = await tescoScraper(
    spiritsTequilaLiqueursURL2
  );

  const spiritsTequilaLiqueurs: SupermarketProduct[] = spiritsTequilaLiqueurs1.concat(
    spiritsTequilaLiqueurs2
  );

  // Premix
  const spiritsPremix1: SupermarketProduct[] = await tescoScraper(
    spiritsPremixURL1
  );
  const spiritsPremix2: SupermarketProduct[] = await tescoScraper(
    spiritsPremixURL2
  );
  const spiritsPremix3: SupermarketProduct[] = await tescoScraper(
    spiritsPremixURL3
  );

  const spiritsPremix: SupermarketProduct[] = spiritsPremix1.concat(
    spiritsPremix2.concat(spiritsPremix3)
  );

  // Low alcohol
  const spiritsLowAlcohol: SupermarketProduct[] = await tescoScraper(
    spiritsLowAlcoholURL
  );

  const spirits: Spirits = {
    gin: spiritsGin,
    whisky: spiritsWhisky,
    vodka: spiritsVodka,
    rum: spiritsRum,
    brandyCognac: spiritsBrandyCognac,
    tequilaLiqueur: spiritsTequilaLiqueurs,
    premix: spiritsPremix,
    lowAlcohol: spiritsLowAlcohol,
  };

  const spiritsJSON: string = JSON.stringify(spirits);
  fs.writeFileSync('src/output/tesco-spirits.json', spiritsJSON);
};
