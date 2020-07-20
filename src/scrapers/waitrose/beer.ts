import { waitroseScraper } from '../utils/waitroseScraper';
import fs from 'fs';
import { SupermarketProduct } from '../utils/types';
import { Beers } from '../types';

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
    3
  );
  const beerAleAmber: SupermarketProduct[] = await waitroseScraper(
    beerAleAmberURL
  );
  const beerAleDark: SupermarketProduct[] = await waitroseScraper(
    beerAleDarkURL
  );

  const beerAle: SupermarketProduct[] = beerAleLight.concat(
    beerAleAmber.concat(beerAleDark)
  );

  // Lager
  const beerLager: SupermarketProduct[] = await waitroseScraper(
    beerLagerURL,
    2
  );

  // Cider
  const beerCiderTraditional: SupermarketProduct[] = await waitroseScraper(
    beerCiderTraditionalURL
  );
  const beerCiderFlavoured: SupermarketProduct[] = await waitroseScraper(
    beerCiderFlavouredURL
  );

  const beerCider: SupermarketProduct[] = beerCiderTraditional.concat(
    beerCiderFlavoured
  );

  // Low and Alcohol Free
  const beerLowAlcohol: SupermarketProduct[] = await waitroseScraper(
    beerLowAlcoholURL
  );

  const beer: Beers = {
    ale: beerAle,
    lager: beerLager,
    cider: beerCider,
    lowAlcohol: beerLowAlcohol,
  };

  const beerJSON: string = JSON.stringify(beer);
  fs.writeFileSync('output/waitrose-beer.json', beerJSON);
};
