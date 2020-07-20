import { waitroseScraper } from '../utils/waitroseScraper';
import fs from 'fs';
import { SupermarketProduct } from '../utils/types';
import { Spirits } from '../types';

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
  // Whisky
  const spiritsWhisky: SupermarketProduct[] = await waitroseScraper(
    spiritsWhiskyURL,
    3
  );

  // Gin
  const spiritsGin: SupermarketProduct[] = await waitroseScraper(spiritsGinURL);

  // Vodka
  const spiritsVodka: SupermarketProduct[] = await waitroseScraper(
    spiritsVodkaURL
  );

  // Brandy and Cognac
  const spiritsBrandy: SupermarketProduct[] = await waitroseScraper(
    spiritsBrandyURL
  );
  const spiritsCognac: SupermarketProduct[] = await waitroseScraper(
    spiritsCognacURL
  );

  const spiritsBrandyCognac: SupermarketProduct[] = spiritsBrandy.concat(
    spiritsCognac
  );

  // Rum
  const spiritsRum: SupermarketProduct[] = await waitroseScraper(spiritsRumURL);

  // Tequila, Liqueurs and Aperitifs
  const spiritsTequila: SupermarketProduct[] = await waitroseScraper(
    spiritsTequilaURL
  );
  const spiritsLiqueurs: SupermarketProduct[] = await waitroseScraper(
    spiritsLiqueursURL
  );
  const spiritsPimmsSummer: SupermarketProduct[] = await waitroseScraper(
    spiritsPimmsSummerURL
  );

  const spiritsTequilaLiqueurs: SupermarketProduct[] = spiritsTequila.concat(
    spiritsLiqueurs.concat(spiritsPimmsSummer)
  );

  // Premix
  const spiritsPremix: SupermarketProduct[] = await waitroseScraper(
    spiritsPremixURL
  );

  // Low alcohol
  const spiritsLowAlcohol: SupermarketProduct[] = await waitroseScraper(
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
  fs.writeFileSync('src/output/waitrose-spirits.json', spiritsJSON);
};
