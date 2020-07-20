import { waitroseScraper } from '../utils/waitroseScraper';
import fs from 'fs';
import { SupermarketProduct } from '../utils/types';
import { Wines } from '../types';

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
    wineRedBordeauxURL
  );
  const wineRedCabernetSauvignon: SupermarketProduct[] = await waitroseScraper(
    wineRedCabernetSauvignonURL
  );
  const wineRedGrenache: SupermarketProduct[] = await waitroseScraper(
    wineRedGrenacheURL
  );
  const wineRedMalbec: SupermarketProduct[] = await waitroseScraper(
    wineRedMalbecURL
  );
  const wineRedMerlot: SupermarketProduct[] = await waitroseScraper(
    wineRedMerlotURL
  );
  const wineRedPinotNoir: SupermarketProduct[] = await waitroseScraper(
    wineRedPinotNoirURL
  );
  const wineRedRioja: SupermarketProduct[] = await waitroseScraper(
    wineRedRiojaURL
  );
  const wineRedShirazAndSyrah: SupermarketProduct[] = await waitroseScraper(
    wineRedShirazAndSyrahURL
  );
  const wineFineRed: SupermarketProduct[] = await waitroseScraper(
    wineFineRedURL,
    2
  );

  const wineRed: SupermarketProduct[] = wineRedBordeaux.concat(
    wineRedCabernetSauvignon.concat(
      wineRedGrenache.concat(
        wineRedMalbec.concat(
          wineRedMerlot.concat(
            wineRedPinotNoir.concat(
              wineRedRioja.concat(wineRedShirazAndSyrah.concat(wineFineRed))
            )
          )
        )
      )
    )
  );

  // White Wine
  const wineWhiteChardonnay: SupermarketProduct[] = await waitroseScraper(
    wineWhiteChardonnayURL
  );
  const wineWhiteCheninBlanc: SupermarketProduct[] = await waitroseScraper(
    wineWhiteCheninBlancURL
  );
  const wineWhitePinotGrigio: SupermarketProduct[] = await waitroseScraper(
    wineWhitePinotGrigioURL
  );
  const wineWhiteRiesling: SupermarketProduct[] = await waitroseScraper(
    wineWhiteRieslingURL
  );
  const wineWhiteSauvignonBlanc: SupermarketProduct[] = await waitroseScraper(
    wineWhiteSauvignonBlancURL
  );
  const wineWhiteViognier: SupermarketProduct[] = await waitroseScraper(
    wineWhiteViognierURL
  );
  const wineFineWhite: SupermarketProduct[] = await waitroseScraper(
    wineFineWhiteURL
  );

  const wineWhite: SupermarketProduct[] = wineWhiteChardonnay.concat(
    wineWhiteCheninBlanc.concat(
      wineWhitePinotGrigio.concat(
        wineWhiteRiesling.concat(
          wineWhiteSauvignonBlanc.concat(
            wineWhiteViognier.concat(wineFineWhite)
          )
        )
      )
    )
  );

  // Rose Wine
  const wineRoseFrance: SupermarketProduct[] = await waitroseScraper(
    wineRoseFranceURL
  );
  const wineRoseItaly: SupermarketProduct[] = await waitroseScraper(
    wineRoseItalyURL
  );
  const wineRoseSpain: SupermarketProduct[] = await waitroseScraper(
    wineRoseSpainURL
  );
  const wineRoseAustralia: SupermarketProduct[] = await waitroseScraper(
    wineRoseAustraliaURL
  );
  const wineRoseUSA: SupermarketProduct[] = await waitroseScraper(
    wineRoseUSAURL
  );
  const wineRoseSparkling: SupermarketProduct[] = await waitroseScraper(
    wineRoseSparklingURL
  );
  const wineRoseRestOfWorld: SupermarketProduct[] = await waitroseScraper(
    wineRoseRestOfWorldURL
  );
  const wineRoseEngland: SupermarketProduct[] = await waitroseScraper(
    wineRoseEnglandURL
  );

  const wineRose: SupermarketProduct[] = wineRoseFrance.concat(
    wineRoseItaly.concat(
      wineRoseSpain.concat(
        wineRoseAustralia.concat(
          wineRoseUSA.concat(
            wineRoseSparkling.concat(
              wineRoseRestOfWorld.concat(wineRoseEngland)
            )
          )
        )
      )
    )
  );

  // Champagne & Sparkling
  const wineChampagneSparkling: SupermarketProduct[] = await waitroseScraper(
    wineChampagneSparklingURL,
    2
  );

  // Dessert Wine
  const wineDessert: SupermarketProduct[] = await waitroseScraper(
    wineDessertURL
  );

  // Fortified wine (Port and Sherry) and Vermouth
  const winePort: SupermarketProduct[] = await waitroseScraper(winePortURL);
  const wineSherry: SupermarketProduct[] = await waitroseScraper(wineSherryURL);
  const wineMadeira: SupermarketProduct[] = await waitroseScraper(
    wineMadeiraURL
  );
  const wineVermouth: SupermarketProduct[] = await waitroseScraper(
    wineVermouthURL
  );

  const wineFortifiedVermouth: SupermarketProduct[] = winePort.concat(
    wineSherry.concat(wineMadeira.concat(wineVermouth))
  );

  // Boxes
  const wineBoxes: SupermarketProduct[] = await waitroseScraper(wineBoxesURL);

  // Small
  const wineSmall: SupermarketProduct[] = await waitroseScraper(wineSmallURL);

  // Low Alcohol
  const wineLowAlcohol: SupermarketProduct[] = await waitroseScraper(
    wineLowAlcoholURL
  );

  const wine: Wines = {
    red: wineRed,
    white: wineWhite,
    rose: wineRose,
    champagneSparkling: wineChampagneSparkling,
    boxes: wineBoxes,
    dessert: wineDessert,
    fortifiedVermouth: wineFortifiedVermouth,
    smallBottles: wineSmall,
    lowAlcohol: wineLowAlcohol,
  };
  const wineJSON: string = JSON.stringify(wine);
  fs.writeFileSync('output/waitrose-wine.json', wineJSON);
};
