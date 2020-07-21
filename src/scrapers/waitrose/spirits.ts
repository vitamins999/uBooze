import { waitroseScraper } from '../utils/waitroseScraper';
import fs from 'fs';
import { removeDuplicates } from '../utils/removeDuplicates';
import { SupermarketProduct } from '../utils/types';

// Spirits URLs

// Whisky
const spiritsWhiskyURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/whisky';

// Gin
const spiritsGinURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/gin';

// Vodka
const spiritsVodkaURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/vodka';

// Brandy
const spiritsBrandyURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/brandy';

// Cognac
const spiritsCognacURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/cognac';

// Rum
const spiritsRumURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/rum';

// Tequila
const spiritsTequilaURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/tequila';

// Pimms & Summer Drinks
const spiritsPimmsSummerURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/pimms_and_summer_drinks';

// Liqueurs & Aperitifs
const spiritsLiqueursURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/liqueurs_and_aperitifs';

// Premix
const spiritsPremixURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/pre_mixed_spirits';

// Low alcohol
const spiritsLowAlcoholURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/low_and_no_alcohol_spirits';

export const waitroseScrapeSpirits = async (): Promise<void> => {
  // Gin
  const spiritsGin: SupermarketProduct[] = await waitroseScraper(
    spiritsGinURL,
    'spirits',
    'gin'
  );

  // Whisky
  const spiritsWhisky: SupermarketProduct[] = await waitroseScraper(
    spiritsWhiskyURL,
    'spirits',
    'whisky',
    3
  );

  // Vodka
  const spiritsVodka: SupermarketProduct[] = await waitroseScraper(
    spiritsVodkaURL,
    'spirits',
    'vodka'
  );

  // Brandy and Cognac
  const spiritsBrandy: SupermarketProduct[] = await waitroseScraper(
    spiritsBrandyURL,
    'spirits',
    'brandy and cognac'
  );
  const spiritsCognac: SupermarketProduct[] = await waitroseScraper(
    spiritsCognacURL,
    'spirits',
    'brandy and cognac'
  );

  const spiritsBrandyCognac: SupermarketProduct[] = [
    ...spiritsBrandy,
    ...spiritsCognac,
  ];

  // Rum
  const spiritsRum: SupermarketProduct[] = await waitroseScraper(
    spiritsRumURL,
    'spirits',
    'rum'
  );

  // Tequila, Liqueurs and Aperitifs
  const spiritsTequila: SupermarketProduct[] = await waitroseScraper(
    spiritsTequilaURL,
    'spirits',
    'tequila and liqueurs'
  );
  const spiritsLiqueurs: SupermarketProduct[] = await waitroseScraper(
    spiritsLiqueursURL,
    'spirits',
    'tequila and liqueurs'
  );
  const spiritsPimmsSummer: SupermarketProduct[] = await waitroseScraper(
    spiritsPimmsSummerURL,
    'spirits',
    'tequila and liqueurs'
  );

  const spiritsTequilaLiqueurs: SupermarketProduct[] = [
    ...spiritsTequila,
    ...spiritsLiqueurs,
    ...spiritsPimmsSummer,
  ];

  // Premix
  const spiritsPremix: SupermarketProduct[] = await waitroseScraper(
    spiritsPremixURL,
    'spirits',
    'premix'
  );

  // Low alcohol
  const spiritsLowAlcohol: SupermarketProduct[] = await waitroseScraper(
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
  fs.writeFileSync('src/output/waitrose-spirits.json', spiritsJSON);
};
