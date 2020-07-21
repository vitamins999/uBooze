import { waitroseScraper } from '../utils/waitroseScraper';
import fs from 'fs';
import { removeDuplicates } from '../utils/removeDuplicates';
import { SupermarketProduct } from '../utils/types';

// Beer URLs

// Ale
const beerAleLightURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/ale/light_ale';
const beerAleAmberURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/ale/amber_ale';
const beerAleDarkURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/ale/dark_ale';

// Lager
const beerLagerURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/lager';

// Cider
const beerCiderTraditionalURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/cider/traditional_ciders';
const beerCiderFlavouredURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/cider/flavoured_ciders';

// Low and Alcohol Free
const beerLowAlcoholURL: string =
  'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/low_and_alcohol_free_beer';

export const waitroseScrapeBeer = async (): Promise<void> => {
  // Ale
  const beerAleLight: SupermarketProduct[] = await waitroseScraper(
    beerAleLightURL,
    'beer',
    'ale',
    3
  );
  const beerAleAmber: SupermarketProduct[] = await waitroseScraper(
    beerAleAmberURL,
    'beer',
    'ale'
  );
  const beerAleDark: SupermarketProduct[] = await waitroseScraper(
    beerAleDarkURL,
    'beer',
    'ale'
  );

  const beerAle: SupermarketProduct[] = [
    ...beerAleLight,
    ...beerAleAmber,
    ...beerAleDark,
  ];

  // Lager
  const beerLager: SupermarketProduct[] = await waitroseScraper(
    beerLagerURL,
    'beer',
    'lager',
    2
  );

  // Cider
  const beerCiderTraditional: SupermarketProduct[] = await waitroseScraper(
    beerCiderTraditionalURL,
    'beer',
    'cider'
  );
  const beerCiderFlavoured: SupermarketProduct[] = await waitroseScraper(
    beerCiderFlavouredURL,
    'beer',
    'cider'
  );

  const beerCider: SupermarketProduct[] = [
    ...beerCiderTraditional,
    ...beerCiderFlavoured,
  ];

  // Low and Alcohol Free
  const beerLowAlcohol: SupermarketProduct[] = await waitroseScraper(
    beerLowAlcoholURL,
    'beer',
    'low alcohol'
  );

  let beer: SupermarketProduct[] = [
    ...beerAle,
    ...beerLager,
    ...beerCider,
    ...beerLowAlcohol,
  ];

  beer = removeDuplicates(beer);

  const beerJSON: string = JSON.stringify(beer);
  fs.writeFileSync('src/output/waitrose-beer.json', beerJSON);
};
